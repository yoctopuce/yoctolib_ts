"use strict";
/*********************************************************************
 *
 * $Id: yocto_api_nodejs.ts 60569 2024-04-15 14:50:06Z seb $
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
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
const https = __importStar(require("https"));
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
     */
    async reconnect(tryOpenID) {
        await this.httpCallbackPromise;
        if (this._incomingMessage.method != 'POST') {
            this.imm_commonDisconnect(tryOpenID, yocto_api_js_1.YAPI.INVALID_ARGUMENT, 'HTTP POST expected');
            return;
        }
        if (this._callbackData.length == 0) {
            this.imm_commonDisconnect(tryOpenID, yocto_api_js_1.YAPI.NO_MORE_DATA, 'Empty POST body');
            return;
        }
        if (this.urlInfo.pass != '') {
            // callback data signed, verify signature
            if (!this._callbackCache.sign) {
                this.imm_commonDisconnect(tryOpenID, yocto_api_js_1.YAPI.NO_MORE_DATA, 'missing signature from incoming YoctoHub (callback password required)');
                this._callbackCache = { sign: '' };
                return;
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
                this.imm_commonDisconnect(tryOpenID, yocto_api_js_1.YAPI.UNAUTHORIZED, 'invalid signature from incoming YoctoHub (invalid callback password)');
                this._callbackCache = { sign: '' };
                return;
            }
        }
        if (this._currentState < 0 /* Y_YHubConnType.HUB_CONNECTED */) {
            if (this._callbackCache.serial) {
                this.hubSerial = this._callbackCache.serial;
            }
            else {
                this.hubSerial = this._callbackCache['/api.json']['module']['serialNumber'];
            }
            await this.signalHubConnected(tryOpenID, this.hubSerial);
        }
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
class YHttpNodeHub extends yocto_api_js_1.YHttpHub {
    constructor(yapi, urlInfo) {
        super(yapi, urlInfo);
        this.agent = new http.Agent({ keepAlive: true });
        this.agenthttps = new https.Agent({ keepAlive: true });
    }
    // Low-level function to create an HTTP client request (abstraction layer)
    imm_makeRequest(method, relUrl, contentType, body, onProgress, onSuccess, onError) {
        let agentObj;
        let requestObj;
        if (this.urlInfo.proto == 'https://') {
            agentObj = this.agenthttps;
            requestObj = https;
        }
        else {
            agentObj = this.agent;
            requestObj = http;
        }
        let options = {
            agent: agentObj,
            method: method,
            hostname: this.urlInfo.host,
            port: this.urlInfo.port,
            path: '/' + this.urlInfo.domain + relUrl,
            headers: { 'Content-Type': contentType }
        };
        let bodyBuff = null;
        if (body !== null) {
            bodyBuff = Buffer.from(body);
            if (options.headers) {
                options.headers['Content-Length'] = bodyBuff.length;
            }
        }
        // FIXME: should implement digest authentication for basic HTTP
        let response = Buffer.alloc(0);
        let endReceived = false;
        let closeWithoutEndTimeout = null;
        let httpRequest = requestObj.request(options, (res) => {
            if (this.imm_isDisconnecting()) {
                return;
            }
            if (res.statusCode == 200 || res.statusCode == 304) {
                res.on('data', (chunk) => {
                    if (this.imm_isDisconnecting()) {
                        return;
                    }
                    // receiving data properly
                    if (onProgress) {
                        onProgress(chunk.toString());
                    }
                    if (onSuccess) {
                        response = Buffer.concat([response, chunk]);
                    }
                });
                res.on('end', () => {
                    endReceived = true;
                    if (closeWithoutEndTimeout) {
                        clearTimeout(closeWithoutEndTimeout);
                        closeWithoutEndTimeout = null;
                    }
                    if (this.imm_isDisconnecting()) {
                        return;
                    }
                    if (onSuccess) {
                        onSuccess(response.toString('latin1'));
                    }
                });
            }
            else if (res.statusCode == 401 || res.statusCode == 204) {
                // Authentication failure (204 == x-yauth)
                this.infoJson.stamp = 0; // force to reload nonce/domain
                onError(yocto_api_js_1.YAPI.UNAUTHORIZED, 'Unauthorized access (' + res.statusCode + ')');
            }
            else if (res.statusCode == 404) {
                // No such file
                onError(yocto_api_js_1.YAPI.FILE_NOT_FOUND, 'HTTP request return status 404 (not found)');
            }
            else {
                onError(yocto_api_js_1.YAPI.IO_ERROR, 'HTTP request failed with status ' + res.statusCode);
            }
        });
        httpRequest.on('close', () => {
            if (!endReceived) {
                if (httpRequest.destroyed) {
                    onError(yocto_api_js_1.YAPI.IO_ERROR, 'HTTP request aborted');
                }
                else {
                    // Allow 100ms to receive a proper 'end' event, or declare the request as aborted
                    // This should normally not be needed, but better safe than sorry
                    closeWithoutEndTimeout = setTimeout(() => {
                        onError(yocto_api_js_1.YAPI.IO_ERROR, 'HTTP request closed unexpectedly');
                    }, 100);
                }
            }
        });
        httpRequest.on('error', (err) => {
            onError(yocto_api_js_1.YAPI.IO_ERROR, 'HTTP request failed: ' + err.message);
        });
        if (bodyBuff !== null) {
            httpRequest.write(bodyBuff);
        }
        httpRequest.end();
        return httpRequest;
    }
    // abort communication channel immediately
    imm_abortRequest(clientRequest) {
        clientRequest.destroy();
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