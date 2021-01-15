"use strict";
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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.YNodeSSDPManager = exports.YSystemEnvNodeJs = void 0;
__exportStar(require("./yocto_api.js"), exports);
const yocto_api_js_1 = require("./yocto_api.js");
require("process");
const os = __importStar(require("os"));
const fs = __importStar(require("fs"));
const dgram = __importStar(require("dgram"));
const crypto = __importStar(require("crypto"));
const http = __importStar(require("http"));
const ws_1 = __importDefault(require("ws"));
/**
 * System environment definition, for use with Node.js libraries
 */
class YSystemEnvNodeJs extends yocto_api_js_1.YSystemEnv {
    constructor() {
        super(...arguments);
        this.isNodeJS = true;
        this.hasSSDP = true;
    }
    hookUnhandledRejection(handler) {
        process.on('unhandledRejection', (reason, promise) => {
            handler(reason, promise);
        });
    }
    getWebSocketHub(obj_yapi, urlInfo) {
        return new YWebSocketNodeHub(obj_yapi, urlInfo);
    }
    getHttpHub(obj_yapi, urlInfo) {
        return new YHttpNodeHub(obj_yapi, urlInfo);
    }
    getWebSocketCallbackHub(obj_yapi, urlInfo, ws) {
        return new YWebSocketCallbackHub(obj_yapi, urlInfo, ws);
    }
    getHttpCallbackHub(obj_yapi, urlInfo, incomingMessage, serverResponse) {
        return new YHttpCallbackHub(obj_yapi, urlInfo, incomingMessage, serverResponse);
    }
    getSSDPManager(obj_yapi) {
        return new YNodeSSDPManager(obj_yapi);
    }
    loadfile(file) {
        return new Promise((resolve, reject) => {
            fs.readFile(file, (err, data) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(new Uint8Array(data));
                }
            });
        });
    }
    downloadfile(url) {
        return new Promise((resolve, reject) => {
            http.get(url, (res) => {
                if (res.statusCode != 200 && res.statusCode != 304) {
                    if (res.statusCode) {
                        reject(new Error('HTTP error ' + res.statusCode));
                    }
                    else {
                        reject(new Error('Unable to complete HTTP request, network down?'));
                    }
                }
                else {
                    let response = Buffer.alloc(0);
                    res.on('data', (chunk) => {
                        response = Buffer.concat([response, chunk]);
                    });
                    res.on('end', () => {
                        resolve(new Uint8Array(response));
                    });
                }
            }).on('error', (e) => {
                reject(new Error('HTTP error: ' + e.message));
            });
        });
    }
}
exports.YSystemEnvNodeJs = YSystemEnvNodeJs;
const _NodeJsSystemEnv = new YSystemEnvNodeJs();
yocto_api_js_1.YAPI.imm_setSystemEnv(_NodeJsSystemEnv);
class YHttpCallbackHub extends yocto_api_js_1.YGenericHub {
    constructor(yapi, urlInfo, incomingMessage, serverResponse) {
        super(yapi, urlInfo);
        this._callbackCache = { sign: '' };
        let cbhub = this;
        this._incomingMessage = incomingMessage;
        this._serverResponse = serverResponse;
        this._callbackData = Buffer.alloc(0);
        this.httpCallbackPromise = new Promise((resolve, reject) => {
            cbhub._incomingMessage.on('data', (chunk) => {
                cbhub._callbackData = Buffer.concat([cbhub._callbackData, chunk]);
            });
            cbhub._incomingMessage.on('end', () => {
                cbhub._callbackData = new Uint8Array(cbhub._callbackData);
                cbhub._callbackCache = JSON.parse(cbhub._yapi.imm_bin2str(cbhub._callbackData));
                resolve(true);
            });
        });
    }
    /** Test input data for a HTTP callback hub
     *
     * @param mstimeout {number}
     * @param errmsg {YErrorMsg}
     * @returns {number}
     */
    async testHub(mstimeout, errmsg) {
        await this.httpCallbackPromise;
        if (this._incomingMessage.method != 'POST') {
            errmsg.msg = 'HTTP POST expected';
            return yocto_api_js_1.YAPI.INVALID_ARGUMENT;
        }
        if (this._callbackData.length == 0) {
            errmsg.msg = 'Empty POST body';
            return yocto_api_js_1.YAPI.NO_MORE_DATA;
        }
        if (this.urlInfo.pass != '') {
            // callback data signed, verify signature
            if (!this._callbackCache.sign) {
                errmsg.msg = 'missing signature from incoming YoctoHub (callback password required)';
                this._callbackCache = { sign: '' };
                return yocto_api_js_1.YAPI.NO_MORE_DATA;
            }
            let sign = this._callbackCache.sign;
            let pass = this.urlInfo.pass;
            let salt;
            if (pass.length == 32) {
                salt = pass.toLowerCase();
            }
            else {
                salt = this._yapi.imm_bin2hexstr(this._yapi.imm_yMD5(pass)).toLowerCase();
            }
            let patched = this._yapi.imm_bin2str(this._callbackData).replace(sign, salt);
            let check = this._yapi.imm_bin2hexstr(this._yapi.imm_yMD5(patched));
            if (check.toLowerCase() != sign.toLowerCase()) {
                //this._yapi.imm_log('Computed signature: '+ check);
                //this._yapi.imm_log('Received signature: '+ sign);
                errmsg.msg = 'invalid signature from incoming YoctoHub (invalid callback password)';
                this._callbackCache = { sign: '' };
                return yocto_api_js_1.YAPI.UNAUTHORIZED;
            }
        }
        if (!this._hubAdded && this._connectionType != this._HUB_TESTONLY) {
            this._hubAdded = true;
            await this._yapi._addHub(this);
        }
        return yocto_api_js_1.YAPI.SUCCESS;
    }
    /** Perform an HTTP query on the hub
     *
     * @param str_method {string}
     * @param devUrl {string}
     * @param obj_body {YHTTPBody|null}
     * @param tcpchan {number}
     * @returns {YHTTPRequest}
     */
    async request(str_method, devUrl, obj_body, tcpchan) {
        let yreq = new yocto_api_js_1.YHTTPRequest(null);
        if (str_method == 'POST' && obj_body) {
            let boundary = this.imm_getBoundary();
            let body = this.imm_formEncodeBody(obj_body, boundary);
            this._serverResponse.write('\n@YoctoAPI:' + str_method + ' ' + devUrl + ' ' + body.length + ':' + boundary + '\n');
            this._serverResponse.write(Buffer.from(body));
        }
        else if (str_method == 'GET') {
            let jzon = devUrl.indexOf('?fw=');
            if (jzon != -1 && devUrl.indexOf('&', jzon) == -1) {
                devUrl = devUrl.slice(0, jzon);
            }
            if (devUrl.indexOf('?') == -1 ||
                devUrl.indexOf('/logs.txt') != -1 ||
                devUrl.indexOf('/logger.json') != -1 ||
                devUrl.indexOf('/ping.txt') != -1 ||
                devUrl.indexOf('/files.json?a=dir') != -1) {
                // read request, load from cache
                let subfun = /\/api\/([a-z][A-Za-z0-9]*)[.]json$/.exec(devUrl);
                if (subfun) {
                    devUrl = devUrl.slice(0, subfun.index) + '/api.json';
                }
                if (!this._callbackCache[devUrl]) {
                    this._serverResponse.write('\n!YoctoAPI:' + devUrl + ' is not preloaded, adding to list');
                    this._serverResponse.write('\n@YoctoAPI:+' + devUrl + '\n');
                    yreq.errorType = yocto_api_js_1.YAPI.NO_MORE_DATA;
                    yreq.errorMsg = 'URL ' + devUrl + ' not preloaded, adding to list';
                }
                else {
                    let jsonres = this._callbackCache[devUrl];
                    if (subfun) {
                        // @ts-ignore
                        jsonres = jsonres[subfun[1]];
                    }
                    yreq.bin_result = this._yapi.imm_str2bin(JSON.stringify(jsonres));
                }
            }
            else {
                // change request, print to output stream
                this._serverResponse.write('\n@YoctoAPI:' + str_method + ' ' + devUrl + '\n');
                yreq.bin_result = new Uint8Array(0);
            }
        }
        else {
            yreq.errorType = yocto_api_js_1.YAPI.NOT_SUPPORTED;
            yreq.errorMsg = 'Unsupported HTTP method';
        }
        return yreq;
    }
    // reports a fatal error to the YoctoHub performing the callback
    async reportFailure(message) {
        this._serverResponse.write('\n!YoctoAPI:' + message + '\n');
    }
}
class YHttpNodeHub extends yocto_api_js_1.YGenericHub {
    constructor(yapi, urlInfo) {
        super(yapi, urlInfo);
        this.notbynRequest = null;
        this.notbynOpenPromise = null;
        this.agent = new http.Agent({ keepAlive: true });
    }
    /** Handle HTTP-based event-monitoring work on a registered hub
     *
     * @param mstimeout {number}
     * @param errmsg {YErrorMsg}
     * @returns {number}
     */
    async testHub(mstimeout, errmsg) {
        if (this.disconnecting) {
            if (errmsg) {
                errmsg.msg = "I/O error";
            }
            return yocto_api_js_1.YAPI.IO_ERROR;
        }
        let args = '';
        if (this.notifPos > 0) {
            args = '?abs=' + this.notifPos.toString();
        }
        let options = {
            method: 'GET',
            hostname: this.urlInfo.host,
            port: this.urlInfo.port,
            path: '/not.byn' + args
        };
        this._hubAdded = false;
        if (!this.notbynOpenPromise) {
            this.notbynOpenTimeout = (mstimeout ? this._yapi.GetTickCount() + mstimeout : null);
            this.notbynOpenPromise = new Promise((resolve, reject) => {
                this.notbynTryOpen = () => {
                    this.notbynRequest = http.request(options, (res) => {
                        this._firstArrivalCallback = true;
                        if (this.disconnecting) {
                            return;
                        }
                        if (res.statusCode == 401) {
                            resolve({ errorType: yocto_api_js_1.YAPI.UNAUTHORIZED, errorMsg: "Unauthorized access (use WebSocket for authentication)" });
                        }
                        if (res.statusCode != 200 && res.statusCode != 304) {
                            // connection error
                            if (!this.imm_testHubAgainLater()) {
                                resolve({ errorType: yocto_api_js_1.YAPI.IO_ERROR, errorMsg: "I/O error" });
                            }
                        }
                        else {
                            resolve({ errorType: yocto_api_js_1.YAPI.SUCCESS, errorMsg: "" });
                            res.on('data', (chunk) => {
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
                            resolve({ errorType: yocto_api_js_1.YAPI.IO_ERROR, errorMsg: "I/O error" });
                        }
                    });
                    this.notbynRequest.end();
                };
                this.notbynTryOpen();
            });
        }
        let res_struct = await this.notbynOpenPromise;
        if (errmsg) {
            errmsg.msg = res_struct.errorMsg;
        }
        if (res_struct.errorType == yocto_api_js_1.YAPI.SUCCESS && !this._hubAdded && this._connectionType != this._HUB_TESTONLY) {
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
    async request(str_method, devUrl, obj_body, tcpchan) {
        let options = {
            agent: this.agent,
            method: str_method,
            hostname: this.urlInfo.host,
            port: this.urlInfo.port,
            path: devUrl
        };
        let boundary = '';
        if (obj_body) {
            boundary = this.imm_getBoundary();
            options.headers = {
                'Content-Type': 'multipart/form-data; boundary=' + boundary,
                'Transfer-Encoding': ''
            };
        }
        let httpPromise = new Promise((resolve, reject) => {
            let response = Buffer.alloc(0);
            let httpRequest = http.request(options, (res) => {
                if (res.statusCode != 200 && res.statusCode != 304) {
                    // connection error
                    let yreq = new yocto_api_js_1.YHTTPRequest(null);
                    yreq.errorType = (res.statusCode == 401 ? yocto_api_js_1.YAPI.UNAUTHORIZED : yocto_api_js_1.YAPI.NOT_SUPPORTED);
                    yreq.errorMsg = 'HTTP Error ' + res.statusCode + ' on ' + this.urlInfo.url.slice(0, -1) + devUrl;
                    resolve(yreq);
                }
                else {
                    res.on('data', (chunk) => {
                        // receiving data properly
                        response = Buffer.concat([response, chunk]);
                    });
                    res.on('end', () => {
                        resolve(new yocto_api_js_1.YHTTPRequest(new Uint8Array(response)));
                    });
                }
            });
            httpRequest.on('error', (err) => {
                let yreq = new yocto_api_js_1.YHTTPRequest(null);
                yreq.errorType = yocto_api_js_1.YAPI.IO_ERROR;
                yreq.errorMsg = err.message;
                resolve(yreq);
            });
            if (obj_body) {
                httpRequest.write(Buffer.from(this.imm_formEncodeBody(obj_body, boundary)));
            }
            httpRequest.end();
        });
        return httpPromise;
    }
    async disconnect() {
        this.imm_commonDisconnect();
        if (this.notbynRequest) {
            this.notbynRequest.abort();
        }
    }
}
class YWebSocketNodeHub extends yocto_api_js_1.YWebSocketHub {
    /** Open an outgoing websocket
     *
     * @param str_url {string}
     **/
    imm_webSocketOpen(str_url) {
        this.websocket = new ws_1.default(str_url);
    }
    /** Fills a buffer with random numbers
     *
     * @param arr {Uint8Array}
     **/
    imm_getRandomValues(arr) {
        return crypto.randomFillSync(arr);
    }
    /** Send an outgoing packet
     *
     * @param arr_bytes {Uint8Array}
     **/
    imm_webSocketSend(arr_bytes) {
        if (this.websocket) {
            this.websocket.send(arr_bytes, { binary: true, mask: false });
        }
    }
}
class YWebSocketCallbackHub extends YWebSocketNodeHub {
    constructor(yapi, urlInfo, ws) {
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
    imm_webSocketOpen(str_url) {
        // nothing to do, the ws is already open !
    }
}
class YNodeSSDPManager extends yocto_api_js_1.YGenericSSDPManager {
    constructor() {
        super(...arguments);
        this._request_sock = {};
        this._notify_sock = {};
    }
    async ySSDPOpenSockets() {
        let networkInterfaces = os.networkInterfaces();
        for (let key in networkInterfaces) {
            let iface = networkInterfaces[key];
            if (!iface)
                continue;
            for (let idx = 0; idx < iface.length; idx++) {
                let inaddr = iface[idx];
                if (inaddr.family !== 'IPv4')
                    continue;
                let ipaddr = inaddr.address;
                if (ipaddr === '127.0.0.1')
                    continue;
                if (this._request_sock[ipaddr])
                    continue;
                let request_sock = dgram.createSocket({ type: 'udp4' });
                request_sock.on('message', (msg, info) => {
                    this.ySSDPParseMessage(msg.toString());
                });
                await new Promise((resolve, reject) => {
                    request_sock.bind(0, ipaddr, () => { resolve(); });
                });
                let notify_sock = dgram.createSocket({ type: 'udp4', reuseAddr: true });
                notify_sock.on('message', (msg, info) => {
                    this.ySSDPParseMessage(msg.toString());
                });
                await new Promise((resolve, reject) => {
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
    async ySSDPCloseSockets() {
        for (let iface in this._request_sock) {
            this._request_sock[iface].close();
            this._notify_sock[iface].close();
        }
        this._request_sock = {};
        this._notify_sock = {};
    }
    async ySSDPSendPacket(msg, port, ipaddr) {
        for (let iface in this._request_sock) {
            this._request_sock[iface].send(msg, port, ipaddr);
        }
    }
}
exports.YNodeSSDPManager = YNodeSSDPManager;
//# sourceMappingURL=yocto_api_nodejs.js.map