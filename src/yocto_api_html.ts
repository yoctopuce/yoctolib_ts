/*********************************************************************
 *
 * $Id: yocto_api_html.ts 51971 2022-11-30 16:39:09Z mvuilleu $
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
    _YY_WebSocket,
    YConditionalResult,
    YHTTPBody,
    YHTTPRequest,
    YErrorMsg,
    YSystemEnv,
    YGenericHub,
    YWebSocketHub,
    YGenericSSDPManager,
    YAPIContext,
    YAPI, YAPI_SUCCESS
} from "./yocto_api.js";

/**
 * System environment definition, for use in a browser
 */
export class YSystemEnvHtml extends YSystemEnv
{
    isNodeJS: boolean = false;
    hasSSDP: boolean = false;

    hookUnhandledRejection(handler: YUnhandledPromiseRejectionCallback)
    {
        window.addEventListener('onunhandledrejection', (event: Event) => {
            let promiseRejectionEvent = <PromiseRejectionEvent>event;
            handler(promiseRejectionEvent.reason, promiseRejectionEvent.promise);
        });
    }

    getWebSocketHub(obj_yapi: YAPIContext, urlInfo: _YY_UrlInfo): YGenericHub | null
    {
        return new YWebSocketHtmlHub(obj_yapi, urlInfo);
    }

    getHttpHub(obj_yapi: YAPIContext, urlInfo: _YY_UrlInfo): YGenericHub | null
    {
        return new YHttpHtmlHub(obj_yapi, urlInfo);
    }

    getWebSocketCallbackHub(obj_yapi: YAPIContext, urlInfo: _YY_UrlInfo, ws: any): YGenericHub | null
    {
        return obj_yapi._throw(YAPI.NOT_SUPPORTED, 'WebSocket Callback mode is not available in this environment', null);
    }

    getHttpCallbackHub(obj_yapi: YAPIContext, urlInfo: _YY_UrlInfo, incomingMessage: any, serverResponse: any): YGenericHub | null
    {
        return obj_yapi._throw(YAPI.NOT_SUPPORTED, 'HTTP Callback mode is not available in this environment', null);
    }

    getSSDPManager(obj_yapi: YAPIContext): YGenericSSDPManager | null
    {
        return obj_yapi._throw(YAPI.NOT_SUPPORTED, 'Hub discovery is not available in this environment', null);
    }

    loadfile(file: string | Blob): Promise<Uint8Array>
    {
        return new Promise((resolve: Function, reject: Function) => {
            let reader = new FileReader();
            reader.onerror = function (evt) {
                // @ts-ignore
                reject(evt.target.error);
            };
            reader.onload = function (evt) {
                // @ts-ignore
                resolve(new Uint8Array(evt.target.result));
            };
            reader.readAsArrayBuffer(<Blob>file);
        });
    }

    downloadfile(url: string): Promise<Uint8Array>
    {
        return new Promise((resolve, reject) => {
            let httpRequest = new XMLHttpRequest();
            httpRequest.open('GET', url, true);
            httpRequest.overrideMimeType('text/plain; charset=x-user-defined');
            httpRequest.onreadystatechange = (() => {
                if (httpRequest.readyState == 4) {
                    if(httpRequest.status != 200 && httpRequest.status != 304) {
                        if(httpRequest.status) {
                            reject(new Error('HTTP error ' + httpRequest.status));
                        } else {
                            reject(new Error('Unable to complete HTTP request, network down?'))
                        }
                    } else {
                        resolve(YAPI.imm_str2bin(httpRequest.responseText));
                    }
                }
            });
            httpRequest.send('');
        });
    }
}

const _HtmlSystemEnv: YSystemEnvHtml = new YSystemEnvHtml();

YAPI.imm_setSystemEnv(_HtmlSystemEnv);

class YHttpHtmlHub extends YGenericHub
{
    notbynRequest: XMLHttpRequest | null                  = null;
    notbynOpenPromise: Promise<YConditionalResult> | null = null;
    notbynOpenTimeoutObj: any = null;   /* actually a number | NodeJS.Timeout */
    infoJson: any = null;
    realm: string = '';
    nonce: string = '';
    nonceCount: number = 0;

    constructor(yapi: YAPIContext, urlInfo: _YY_UrlInfo)
    {
        super(yapi, urlInfo);
    }

    // Initiate an XmlHttpRequest with proper authentication settings and mime type
    // Handle header-based client authentication (to prevent browser pop-ups)
    //
    imm_sendXHR(xmlHttpRequest: XMLHttpRequest, method: string, uri: string, obj_body: YHTTPBody | null,
                readyStateChangeHandler: (ev: Event) => any,
                errorHandler: (ev: Event) => any)
    {
        let body: FormData | string = '';
        if(this.infoJson && this.infoJson.realm && this.infoJson.nonce) {
            // Use X-YAuth JSON encoding
            if(this.realm != this.infoJson.realm || this.nonce != this.infoJson.nonce) {
                this.realm = this.infoJson.realm;
                this.nonce = this.infoJson.nonce;
                this.nonceCount = 0;
            }
            let shorturi: string = uri;
            let parseURI: RegExpMatchArray|null = uri.match(/([A-Za-z]+:\/\/)([^\/@]+@)?([^\/]+)(\/.*)/);
            if(parseURI) {
                uri = parseURI[1] + parseURI[3] + parseURI[4];
                shorturi = parseURI[4];
            }
            let jsonBody: any = {
                'x-yauth': {
                    method: method,
                    uri: shorturi
                }
            };
            if(this.urlInfo.user || this.urlInfo.pass) {
                let cnonce: string = Math.floor(Math.random() * 2147483647).toString(16).toLowerCase();
                let nc: string = (++this.nonceCount).toString(16).toLowerCase();
                let ha1_str: string = this.urlInfo.user + ':' + this.realm + ':' + this.urlInfo.pass;
                let ha2_str: string = method + ':' + shorturi;
                let A1: string = this._yapi.imm_bin2hexstr(this._yapi.imm_yMD5(ha1_str)).toLowerCase();
                let A2: string = this._yapi.imm_bin2hexstr(this._yapi.imm_ySHA1(ha2_str)).toLowerCase();
                let signature: string = A1 + ':' + this.nonce + ':' + nc + ':' + cnonce + ':auth:' + A2;
                let response: string = this._yapi.imm_bin2hexstr(this._yapi.imm_ySHA1(signature)).toLowerCase();
                jsonBody['x-yauth']['username'] = this.urlInfo.user;
                jsonBody['x-yauth']['cnonce'] = cnonce;
                jsonBody['x-yauth']['nonce'] = this.nonce;
                jsonBody['x-yauth']['nc'] = nc;
                jsonBody['x-yauth']['qop'] = 'auth';
                jsonBody['x-yauth']['response'] = response;
            }
            if(obj_body) {
                let binstr: string = this._yapi.imm_bin2str(obj_body.data);
                jsonBody['body'] = {
                    filename: obj_body.fname,
                    b64content: btoa(binstr)
                };
            }
            body = JSON.stringify(jsonBody);
            // Remove GET parameters from the URL, as the server will use the x-yauth value
            let qpos: number = uri.indexOf('?');
            if(qpos > 0) {
                uri = uri.slice(0,qpos);
            }
            // Send the request using text/plain POST, to avoid CORS checks
            xmlHttpRequest.open('POST', uri, true, '', '');
            xmlHttpRequest.setRequestHeader('Content-Type', 'text/plain; charset=x-user-defined');
        } else {
            if(obj_body) {
                let blob: Blob = new Blob([obj_body.data], {type: 'application/octet-binary'});
                body = new FormData();
                body.append(obj_body.fname, blob);
            }
            xmlHttpRequest.open(method, uri, true, '', '');
        }
        xmlHttpRequest.overrideMimeType('text/plain; charset=x-user-defined');
        xmlHttpRequest.onreadystatechange = readyStateChangeHandler;
        xmlHttpRequest.onerror = errorHandler;
        xmlHttpRequest.send(body);
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

        if(!this.infoJson) {
            if(!await new Promise<boolean>((resolve, reject) => {
                // Try to download info.json first to check if x-yauth is available
                let xhr: XMLHttpRequest = new XMLHttpRequest();
                this.imm_sendXHR(xhr, 'GET', this.urlInfo.url + 'info.json', null,
                    () => {
                        if (xhr.readyState == 4) {
                            if(xhr.status == 200) {
                                this.infoJson = JSON.parse(xhr.responseText);
                                resolve(true);
                            }
                            resolve(false);
                        }
                    }, ()=>{ resolve(false); });
            })) {
                // could not download info.json
                this.infoJson = {};
            }
        if(this.infoJson.serialNumber) {
            // make sure we don't already have a hub with the same serial number
            let knownHubs: YGenericHub[] = this._yapi._hubs;
            for (let i: number = 0; i < knownHubs.length; i++) {
                let hubSerials: string[] = knownHubs[i].serialByYdx;
                if (hubSerials && hubSerials[0] == this.infoJson.serialNumber) {
                    if(errmsg) {
                        errmsg.msg = "Hub "+this.infoJson.serialNumber+" is already registered";
                    }
                    return YAPI.INVALID_ARGUMENT;
                    }
                }
            }
        }

        let args = '?len=' + this.notiflen.toString();
        if (this.notifPos >= 0) {
            args += '&abs=' + this.notifPos.toString();
        } else {
            this._firstArrivalCallback = true;
        }
        if(!this.notbynOpenPromise) {
            this.notbynOpenTimeout = (mstimeout ? this._yapi.GetTickCount() + mstimeout : null);
            this.notbynOpenPromise = new Promise(
                (resolve, reject) => {
                    if (mstimeout) {
                        this.notbynOpenTimeoutObj = setTimeout(() => {
                            resolve({errorType: YAPI.TIMEOUT, errorMsg: "Timeout on HTTP connection"});
                            this.disconnect();
                        }, mstimeout);
                    }
                    this.notbynTryOpen = () => {
                        let xmlHttpRequest: XMLHttpRequest = new XMLHttpRequest();
                        this.notbynRequest = xmlHttpRequest;
                        this.imm_sendXHR(xmlHttpRequest,
                            'GET', this.urlInfo.url+'not.byn'+args,
                            null,
                            () => {
                                if (this.disconnecting) {
                                    return;
                                }
                                if (xmlHttpRequest.readyState >= 3) {
                                    let httpStatus: number = xmlHttpRequest.status >> 0;
                                    if (xmlHttpRequest.readyState == 4 && httpStatus != 200 && httpStatus != 304) {
                                        // connection error
                                        if (httpStatus == 401 || httpStatus == 204) {
                                            // Authentication failure
                                            resolve({ errorType: YAPI.UNAUTHORIZED, errorMsg: "Unauthorized access" });
                                            return;
                                        }
                                        if(!this.imm_testHubAgainLater()) {
                                            resolve({ errorType: YAPI.IO_ERROR, errorMsg: "I/O error" });
                                            return;
                                        }
                                    } else {
                                        // receiving data properly
                                        if(!this._hubAdded) {
                                            // registration is now complete
                                            if (this.notbynOpenTimeoutObj) {
                                                clearTimeout(this.notbynOpenTimeoutObj);
                                                this.notbynOpenTimeoutObj = null;
                                            }
                                            this.signalHubConnected().then(() => {
                                                resolve({ errorType: YAPI_SUCCESS, errorMsg: "" });
                                            });
                                        }
                                        if (xmlHttpRequest.readyState == 3) {
                                            // when using reconnection mode, ignore state 3
                                            if (this.notiflen == 1) return;
                                        }
                                        let newlen = xmlHttpRequest.responseText.length;
                                        if (newlen > this.currPos) {
                                            this._yapi.parseEvents(this, xmlHttpRequest.responseText.slice(this.currPos, newlen));
                                        }
                                        // trigger immediately a new connection if closed in success
                                        if (xmlHttpRequest.readyState == 4 && (xmlHttpRequest.status >> 0) != 0) {
                                            this.notbynOpenPromise = null;
                                            this.currPos = 0;
                                            this.testHub(0, errmsg);
                                        }
                                    }
                                }
                            },
                            () => {
                                // connection aborted, need to reconnect ASAP
                                if (!this.imm_testHubAgainLater()) {
                                    resolve({ errorType: YAPI.IO_ERROR, errorMsg: "I/O error" });
                                }
                            });
                    };
                    this.notbynTryOpen();
                }
            );
        }
        let res_struct = await this.notbynOpenPromise;
        if (errmsg) {
            errmsg.msg = res_struct.errorMsg;
        }
        this.notbynOpenPromise = null;
        return res_struct.errorType;
    }

    /** Perform an HTTP query on the hub
     *
     * @param method {string}
     * @param devUrl {string}
     * @param obj_body {YHTTPBody|null}
     * @param tcpchan {number}
     * @returns {YHTTPRequest}
     */
    async request(method: string, devUrl: string, obj_body: YHTTPBody | null, tcpchan: number): Promise<YHTTPRequest>
    {
        return new Promise<YHTTPRequest>(
            (resolve, reject) => {
                let prefix = this.urlInfo.url.slice(0,-1);
                let httpRequest = new XMLHttpRequest();
                this.imm_sendXHR(httpRequest,
                    method, prefix + devUrl,
                    obj_body,
                    () => {
                        if (httpRequest.readyState == 4) {
                            let httpStatus: number = httpRequest.status;
                            let yreq = new YHTTPRequest(null);
                            if(httpStatus != 200 && httpStatus != 304) {
                                yreq.errorType = ((httpStatus == 401 || httpStatus == 204) ? YAPI.UNAUTHORIZED : YAPI.NOT_SUPPORTED);
                                yreq.errorMsg = 'HTTP Error '+httpRequest.status+' on '+prefix+devUrl;
                            } else {
                                yreq.bin_result = this._yapi.imm_str2bin(httpRequest.responseText);
                            }
                            resolve(yreq);
                        }
                    },
                    () => {
                        let yreq = new YHTTPRequest(null);
                        yreq.errorType = YAPI.IO_ERROR;
                        yreq.errorMsg = 'I/O Error on '+prefix+devUrl;
                        resolve(yreq);
                    });
            }
        );
    }

    async disconnect()
    {
        this.imm_commonDisconnect();
        if(this.notbynRequest) {
            (<XMLHttpRequest> this.notbynRequest).abort();
        }
    }
}

class YWebSocketHtmlHub extends YWebSocketHub
{
    /** Open an outgoing websocket
     *
     * @param str_url {string}
     **/
    imm_webSocketOpen(str_url: string): void
    {
        let websock = new WebSocket(str_url);
        websock.binaryType = 'arraybuffer';
        this.websocket = websock as _YY_WebSocket;
    }

    /** Fills a buffer with random numbers
     *
     * @param arr {Uint8Array}
     **/
    imm_getRandomValues(arr: Uint8Array): Uint8Array
    {
        return <Uint8Array>window.crypto.getRandomValues(arr);
    }
}