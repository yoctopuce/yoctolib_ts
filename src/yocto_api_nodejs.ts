/*********************************************************************
 *
 * $Id: yocto_api_nodejs.ts 41769 2020-09-03 17:34:23Z mvuilleu $
 *
 * High-level programming interface, common to all modules
 *
 * - - - - - - - - - License information: - - - - - - - - -
 *
 *  Copyright (C) 2011 and beyond by Yoctopuce Sarl, Switzerland.
 *
 *  Yoctopuce Sarl (hereafter Licensor) grants to you a perpetual
 *  non-exclusive license to use, modify, copy and integrate http
 *  file into your software for the sole purpose of interfacing
 *  with Yoctopuce products.
 *
 *  You may reproduce and distribute copies of this file in
 *  source or object form, as long as the sole purpose of this
 *  code is to interface with Yoctopuce products. You must retain
 *  this notice in the distributed source file.
 *
 *  You should refer to Yoctopuce General Terms and Conditions
 *  for additional information regarding your rights and
 *  obligations.
 *
 *  THE SOFTWARE AND DOCUMENTATION ARE PROVIDED "AS IS" WITHOUT
 *  WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING
 *  WITHOUT LIMITATION, ANY WARRANTY OF MERCHANTABILITY, FITNESS
 *  FOR A PARTICULAR PURPOSE, TITLE AND NON-INFRINGEMENT. IN NO
 *  EVENT SHALL LICENSOR BE LIABLE FOR ANY INCIDENTAL, SPECIAL,
 *  INDIRECT OR CONSEQUENTIAL DAMAGES, LOST PROFITS OR LOST DATA,
 *  COST OF PROCUREMENT OF SUBSTITUTE GOODS, TECHNOLOGY OR
 *  SERVICES, ANY CLAIMS BY THIRD PARTIES (INCLUDING BUT NOT
 *  LIMITED TO ANY DEFENSE THEREOF), ANY CLAIMS FOR INDEMNITY OR
 *  CONTRIBUTION, OR OTHER SIMILAR COSTS, WHETHER ASSERTED ON THE
 *  BASIS OF CONTRACT, TORT (INCLUDING NEGLIGENCE), BREACH OF
 *  WARRANTY, OR OTHERWISE.
 *
 *********************************************************************/

export * from "./yocto_api.js";

import {
    YUnhandledPromiseRejectionCallback,
    _YY_UrlInfo,
    YConditionalResult,
    YHTTPBody,
    YHTTPRequest,
    YErrorMsg,
    YSystemEnv,
    YGenericHub,
    YWebSocketHub,
    YGenericSSDPManager,
    YAPIContext,
    YAPI
} from "./yocto_api.js";

import 'process';
import * as os from 'os';
import * as fs from 'fs';
import * as dgram from 'dgram';
import * as crypto from 'crypto';
import * as http from 'http';
import WebSocket from 'ws';

/**
 * System environment definition, for use with Node.js libraries
 */
export class YSystemEnvNodeJs extends YSystemEnv
{
    isNodeJS: boolean = true;
    hasSSDP: boolean = true;

    hookUnhandledRejection(handler: YUnhandledPromiseRejectionCallback)
    {
        process.on('unhandledRejection', (reason: object, promise: Promise<void>) => {
            handler(reason, promise);
        });
    }

    getWebSocketHub(obj_yapi: YAPIContext, urlInfo: _YY_UrlInfo): YGenericHub | null
    {
        return new YWebSocketNodeHub(obj_yapi, urlInfo);
    }

    getHttpHub(obj_yapi: YAPIContext, urlInfo: _YY_UrlInfo): YGenericHub | null
    {
        return new YHttpNodeHub(obj_yapi, urlInfo);
    }

    getWebSocketCallbackHub(obj_yapi: YAPIContext, urlInfo: _YY_UrlInfo, ws: WebSocket): YGenericHub | null
    {
        return new YWebSocketCallbackHub(obj_yapi, urlInfo, ws);
    }

    getHttpCallbackHub(obj_yapi: YAPIContext, urlInfo: _YY_UrlInfo, incomingMessage: http.IncomingMessage, serverResponse: http.ServerResponse): YGenericHub | null
    {
        return new YHttpCallbackHub(obj_yapi, urlInfo, incomingMessage, serverResponse);
    }

    getSSDPManager(obj_yapi: YAPIContext): YGenericSSDPManager | null
    {
        return new YNodeSSDPManager(obj_yapi);
    }

    loadfile(file: string | Blob): Promise<Uint8Array>
    {
        return new Promise<Uint8Array>((resolve, reject) => {
            fs.readFile(<string>file, (err: Error | null, data: Buffer) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(new Uint8Array(data));
                }
            });
        });
    }

    downloadfile(url: string): Promise<Uint8Array>
    {
        return new Promise<Uint8Array>((resolve, reject) => {
            http.get(url, (res: http.IncomingMessage) => {
                if (res.statusCode != 200 && res.statusCode != 304) {
                    if (res.statusCode) {
                        reject(new Error('HTTP error ' + res.statusCode));
                    } else {
                        reject(new Error('Unable to complete HTTP request, network down?'))
                    }
                } else {
                    let response = Buffer.alloc(0);
                    res.on('data', (chunk: Buffer) => {
                        response = Buffer.concat([response, chunk]);
                    });
                    res.on('end', () => {
                        resolve(new Uint8Array(response));
                    })
                }
            }).on('error', (e: Error) => {
                reject(new Error('HTTP error: ' + e.message));
            });
        });
    }
}

const _NodeJsSystemEnv: YSystemEnvNodeJs = new YSystemEnvNodeJs();

YAPI.imm_setSystemEnv(_NodeJsSystemEnv);


interface _YY_HTTPCallbackCache {
    sign: string;
    [ident: string]: string | _YY_HTTPCallbackCache;
}

class YHttpCallbackHub extends YGenericHub
{
    _incomingMessage: http.IncomingMessage;
    _serverResponse: http.ServerResponse;
    _callbackData: Uint8Array;
    _callbackCache: _YY_HTTPCallbackCache = { sign: '' };
    httpCallbackPromise: Promise<boolean>;

    constructor(yapi: YAPIContext, urlInfo: _YY_UrlInfo, incomingMessage: http.IncomingMessage, serverResponse: http.ServerResponse)
    {
        super(yapi, urlInfo);
        let cbhub = this;
        this._incomingMessage = incomingMessage;
        this._serverResponse = serverResponse;
        this._callbackData = Buffer.alloc(0);
        this.httpCallbackPromise = new Promise<boolean>(
            (resolve, reject) => {
                cbhub._incomingMessage.on('data', (chunk: Buffer) => {
                    cbhub._callbackData = Buffer.concat([cbhub._callbackData,chunk]);
                });
                cbhub._incomingMessage.on('end', () => {
                    cbhub._callbackData = new Uint8Array(cbhub._callbackData);
                    cbhub._callbackCache = JSON.parse(cbhub._yapi.imm_bin2str(cbhub._callbackData));
                    resolve(true);
                });
            }
        );
    }

    /** Test input data for a HTTP callback hub
     *
     * @param mstimeout {number}
     * @param errmsg {YErrorMsg}
     * @returns {number}
     */
    async testHub(mstimeout: number, errmsg: YErrorMsg): Promise<number>
    {
        await this.httpCallbackPromise;
        if(this._incomingMessage.method != 'POST') {
            errmsg.msg = 'HTTP POST expected';
            return YAPI.INVALID_ARGUMENT;
        }
        if(this._callbackData.length == 0) {
            errmsg.msg = 'Empty POST body';
            return YAPI.NO_MORE_DATA;
        }
        if (this.urlInfo.pass != '') {
            // callback data signed, verify signature
            if (!this._callbackCache.sign) {
                errmsg.msg = 'missing signature from incoming YoctoHub (callback password required)';
                this._callbackCache = { sign: '' };
                return YAPI.NO_MORE_DATA;
            }
            let sign = this._callbackCache.sign;
            let pass = this.urlInfo.pass;
            let salt;
            if (pass.length == 32) {
                salt = pass.toLowerCase();
            } else {
                salt = this._yapi.imm_bin2hexstr(this._yapi.imm_yMD5(pass)).toLowerCase();
            }
            let patched = this._yapi.imm_bin2str(this._callbackData).replace(sign, salt);
            let check = this._yapi.imm_bin2hexstr(this._yapi.imm_yMD5(patched));
            if (check.toLowerCase() != sign.toLowerCase()) {
                //this._yapi.imm_log('Computed signature: '+ check);
                //this._yapi.imm_log('Received signature: '+ sign);
                errmsg.msg = 'invalid signature from incoming YoctoHub (invalid callback password)';
                this._callbackCache = { sign: '' };
                return YAPI.UNAUTHORIZED;
            }
        }
        if (!this._hubAdded && this._connectionType != this._HUB_TESTONLY) {
            this._hubAdded = true;
            await this._yapi._addHub(this);
        }
        return YAPI.SUCCESS;
    }

    /** Perform an HTTP query on the hub
     *
     * @param str_method {string}
     * @param devUrl {string}
     * @param obj_body {YHTTPBody|null}
     * @param tcpchan {number}
     * @returns {YHTTPRequest}
     */
    async request(str_method: string, devUrl: string, obj_body: YHTTPBody | null, tcpchan: number): Promise<YHTTPRequest>
    {
        let yreq = new YHTTPRequest(null);
        if(str_method == 'POST' && obj_body) {
            let boundary = this.imm_getBoundary();
            let body = this.imm_formEncodeBody(obj_body, boundary);
            this._serverResponse.write('\n@YoctoAPI:'+str_method+' '+devUrl+' '+body.length+':'+boundary+'\n');
            this._serverResponse.write(Buffer.from(body));
        } else if(str_method == 'GET') {
            let jzon = devUrl.indexOf('?fw=');
            if(jzon != -1 && devUrl.indexOf('&', jzon) == -1) {
                devUrl = devUrl.slice(0, jzon);
            }
            if(devUrl.indexOf('?') == -1 ||
                devUrl.indexOf('/logs.txt') != -1 ||
                devUrl.indexOf('/logger.json') != -1 ||
                devUrl.indexOf('/ping.txt') != -1 ||
                devUrl.indexOf('/files.json?a=dir') != -1) {
                // read request, load from cache
                let subfun = /\/api\/([a-z][A-Za-z0-9]*)[.]json$/.exec(devUrl);
                if(subfun) {
                    devUrl = devUrl.slice(0,subfun.index)+'/api.json';
                }
                if(!this._callbackCache[devUrl]) {
                    this._serverResponse.write('\n!YoctoAPI:'+devUrl+' is not preloaded, adding to list');
                    this._serverResponse.write('\n@YoctoAPI:+'+devUrl+'\n');
                    yreq.errorType = YAPI.NO_MORE_DATA;
                    yreq.errorMsg = 'URL '+devUrl+' not preloaded, adding to list';
                } else {
                    let jsonres = this._callbackCache[devUrl];
                    if(subfun) {
                        // @ts-ignore
                        jsonres = jsonres[subfun[1]];
                    }
                    yreq.bin_result = this._yapi.imm_str2bin(JSON.stringify(jsonres));
                }
            } else {
                // change request, print to output stream
                this._serverResponse.write('\n@YoctoAPI:'+str_method+' '+devUrl+'\n');
                yreq.bin_result = new Uint8Array(0);
            }
        } else {
            yreq.errorType = YAPI.NOT_SUPPORTED;
            yreq.errorMsg = 'Unsupported HTTP method';
        }
        return yreq;
    }

    // reports a fatal error to the YoctoHub performing the callback
    async reportFailure(message: string): Promise<void>
    {
        this._serverResponse.write('\n!YoctoAPI:'+message+'\n');
    }
}

class YHttpNodeHub extends YGenericHub
{
    agent: http.Agent;
    notbynRequest: http.ClientRequest | null              = null;
    notbynOpenPromise: Promise<YConditionalResult> | null = null;

    constructor(yapi: YAPIContext, urlInfo: _YY_UrlInfo)
    {
        super(yapi, urlInfo);
        this.agent = new http.Agent({ keepAlive: true });
    }

    /** Handle HTTP-based event-monitoring work on a registered hub
     *
     * @param mstimeout {number}
     * @param errmsg {YErrorMsg}
     * @returns {number}
     */
    async testHub(mstimeout: number, errmsg: YErrorMsg): Promise<number>
    {
        if (this.disconnecting) {
            if(errmsg) {
                errmsg.msg = "I/O error";
            }
            return YAPI.IO_ERROR;
        }
        let args = '';
        if (this.notifPos > 0) {
            args = '?abs=' + this.notifPos.toString();
        }
        let options = {
            method: 'GET',
            hostname: this.urlInfo.host,
            port: this.urlInfo.port,
            path: '/not.byn'+args
        };
        this._hubAdded = false;
        if(!this.notbynOpenPromise) {
            this.notbynOpenTimeout = (mstimeout ? this._yapi.GetTickCount() + mstimeout : null);
            this.notbynOpenPromise = new Promise(
                (resolve, reject) => {
                    this.notbynTryOpen = () => {
                        this.notbynRequest = http.request(options, (res: http.IncomingMessage) => {
                            this._firstArrivalCallback = true;
                            if (this.disconnecting) {
                                return;
                            }
                            if (res.statusCode == 401) {
                                resolve({ errorType: YAPI.UNAUTHORIZED, errorMsg: "Unauthorized access (use WebSocket for authentication)" });
                            }
                            if (res.statusCode != 200 && res.statusCode != 304) {
                                // connection error
                                if (!this.imm_testHubAgainLater()) {
                                    resolve({ errorType: YAPI.IO_ERROR, errorMsg: "I/O error" });
                                }
                            } else {
                                resolve({ errorType: YAPI.SUCCESS, errorMsg: "" });
                                res.on('data', (chunk: Uint8Array) => {
                                    // receiving data properly
                                    this._yapi.parseEvents(this, this._yapi.imm_bin2str(chunk));
                                });
                                res.on('end', () => {
                                    // trigger immediately a new connection if closed in success
                                    this.notbynOpenPromise = null;
                                    this.currPos = 0;
                                    this.testHub(0, errmsg);
                                });
                            }
                        });
                        this.notbynRequest.on('error', () => {
                            // connection aborted, need to reconnect ASAP
                            if (!this.imm_testHubAgainLater()) {
                                resolve({ errorType: YAPI.IO_ERROR, errorMsg: "I/O error" });
                            }
                        });
                        this.notbynRequest.end();
                    };
                    this.notbynTryOpen();
                }
            );
        }
        let res_struct = await this.notbynOpenPromise;
        if (errmsg) {
            errmsg.msg = res_struct.errorMsg;
        }
        if (res_struct.errorType == YAPI.SUCCESS && !this._hubAdded && this._connectionType != this._HUB_TESTONLY){
            this._hubAdded = true;
            await this._yapi._addHub(this);
        }
        this.notbynOpenPromise = null;
        return res_struct.errorType;
    }

    /** Perform an HTTP query on the hub
     *
     * @param str_method {string}
     * @param devUrl {string}
     * @param obj_body {YHTTPBody|null}
     * @param tcpchan {number}
     * @returns {YHTTPRequest}
     */
    async request(str_method: string, devUrl: string, obj_body: YHTTPBody|null, tcpchan: number): Promise<YHTTPRequest>
    {
        let options: http.RequestOptions = {
            agent: this.agent,
            method: str_method,
            hostname: this.urlInfo.host,
            port: this.urlInfo.port,
            path: devUrl
        };
        let boundary = '';
        if(obj_body) {
            boundary = this.imm_getBoundary();
            options.headers = {
                'Content-Type': 'multipart/form-data; boundary='+boundary,
                'Transfer-Encoding': ''
            };
        }
        let httpPromise = new Promise<YHTTPRequest>(
            (resolve, reject) => {
                let response = Buffer.alloc(0);
                let httpRequest = http.request(options, (res: http.IncomingMessage) => {
                    if(res.statusCode != 200 && res.statusCode != 304) {
                        // connection error
                        let yreq = new YHTTPRequest(null);
                        yreq.errorType = (res.statusCode == 401 ? YAPI.UNAUTHORIZED : YAPI.NOT_SUPPORTED);
                        yreq.errorMsg = 'HTTP Error '+res.statusCode+' on '+this.urlInfo.url.slice(0,-1)+devUrl;
                        resolve(yreq);
                    } else {
                        res.on('data', (chunk: Buffer) => {
                            // receiving data properly
                            response = Buffer.concat([response,chunk]);
                        });
                        res.on('end', () => {
                            resolve(new YHTTPRequest(new Uint8Array(response)));
                        })
                    }
                });
                httpRequest.on('error', (err: Error) => {
                    let yreq = new YHTTPRequest(null);
                    yreq.errorType = YAPI.IO_ERROR;
                    yreq.errorMsg = err.message;
                    resolve(yreq);
                });
                if(obj_body) {
                    httpRequest.write(Buffer.from(this.imm_formEncodeBody(obj_body, boundary)));
                }
                httpRequest.end();
            }
        );
        return httpPromise;
    }

    async disconnect(): Promise<void>
    {
        this.imm_commonDisconnect();
        if(this.notbynRequest) {
            this.notbynRequest.abort();
        }
    }
}

class YWebSocketNodeHub extends YWebSocketHub
{
    /** Open an outgoing websocket
     *
     * @param str_url {string}
     **/
    imm_webSocketOpen(str_url: string): void
    {
        this.websocket = new WebSocket(str_url);
    }

    /** Fills a buffer with random numbers
     *
     * @param arr {Uint8Array}
     **/
    imm_getRandomValues(arr: Uint8Array): Uint8Array
    {
        return crypto.randomFillSync(arr);
    }

    /** Send an outgoing packet
     *
     * @param arr_bytes {Uint8Array}
     **/
    imm_webSocketSend(arr_bytes: Uint8Array)
    {
        if(this.websocket) {
            this.websocket.send(arr_bytes, { binary: true, mask: false });
        }
    }
}

class YWebSocketCallbackHub extends YWebSocketNodeHub
{
    constructor(yapi: YAPIContext, urlInfo: _YY_UrlInfo, ws: WebSocket)
    {
        super(yapi, urlInfo);

        // websocket channel already open
        this.websocket = ws;

        // no retry from our side
        this.retryDelay = -1;
    }

    /** Open an outgoing websocket
     *
     * @param str_url {string}
     **/
    imm_webSocketOpen(str_url: string)
    {
        // nothing to do, the ws is already open !
    }
}

interface _YY_SSDPSockets {
    [iface: string] : dgram.Socket;
}

export class YNodeSSDPManager extends YGenericSSDPManager
{
    _request_sock: _YY_SSDPSockets = {};
    _notify_sock: _YY_SSDPSockets = {};

    async ySSDPOpenSockets(): Promise<void>
    {
        let networkInterfaces = os.networkInterfaces();
        for(let key in networkInterfaces) {
            let iface = networkInterfaces[key];
            if(!iface) continue;
            for(let idx = 0; idx < iface.length; idx++) {
                let inaddr = iface[idx];
                if(inaddr.family !== 'IPv4') continue;
                let ipaddr = inaddr.address;
                if(ipaddr === '127.0.0.1') continue;
                if(this._request_sock[ipaddr]) continue;
                let request_sock = dgram.createSocket({ type: 'udp4' });
                request_sock.on('message', (msg: Buffer, info: object) => {
                    this.ySSDPParseMessage(msg.toString());
                });
                await new Promise<void>((resolve, reject) => {
                    request_sock.bind(0, ipaddr, () => { resolve(); });
                });
                let notify_sock = dgram.createSocket({ type: 'udp4', reuseAddr: true });
                notify_sock.on('message', (msg: Buffer, info: object) => {
                    this.ySSDPParseMessage(msg.toString());
                });
                await new Promise<void>((resolve, reject) => {
                    notify_sock.bind(this.YSSDP_PORT, () => {
                        notify_sock.addMembership(this.YSSDP_MCAST_ADDR_STR, ipaddr);
                        resolve();
                    });
                });
                this._request_sock[ipaddr] = request_sock;
                this._notify_sock[ipaddr] = notify_sock;
            }
        }
    }

    async ySSDPCloseSockets(): Promise<void>
    {
        for(let iface in this._request_sock) {
            this._request_sock[iface].close();
            this._notify_sock[iface].close();
        }
        this._request_sock = {};
        this._notify_sock = {};
    }

    async ySSDPSendPacket(msg: string, port: number, ipaddr: string): Promise<void>
    {
        for(let iface in this._request_sock) {
            this._request_sock[iface].send(msg, port, ipaddr);
        }
    }
}