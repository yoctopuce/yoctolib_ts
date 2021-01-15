"use strict";
/*********************************************************************
 *
 * $Id: yocto_api_html.ts 41769 2020-09-03 17:34:23Z mvuilleu $
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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.YSystemEnvHtml = void 0;
__exportStar(require("./yocto_api.js"), exports);
const yocto_api_js_1 = require("./yocto_api.js");
/**
 * System environment definition, for use in a browser
 */
class YSystemEnvHtml extends yocto_api_js_1.YSystemEnv {
    constructor() {
        super(...arguments);
        this.isNodeJS = false;
        this.hasSSDP = false;
    }
    hookUnhandledRejection(handler) {
        window.addEventListener('onunhandledrejection', (event) => {
            let promiseRejectionEvent = event;
            handler(promiseRejectionEvent.reason, promiseRejectionEvent.promise);
        });
    }
    getWebSocketHub(obj_yapi, urlInfo) {
        return new YWebSocketHtmlHub(obj_yapi, urlInfo);
    }
    getHttpHub(obj_yapi, urlInfo) {
        return new YHttpHtmlHub(obj_yapi, urlInfo);
    }
    getWebSocketCallbackHub(obj_yapi, urlInfo, ws) {
        return obj_yapi._throw(yocto_api_js_1.YAPI.NOT_SUPPORTED, 'WebSocket Callback mode is not available in this environment', null);
    }
    getHttpCallbackHub(obj_yapi, urlInfo, incomingMessage, serverResponse) {
        return obj_yapi._throw(yocto_api_js_1.YAPI.NOT_SUPPORTED, 'HTTP Callback mode is not available in this environment', null);
    }
    getSSDPManager(obj_yapi) {
        return obj_yapi._throw(yocto_api_js_1.YAPI.NOT_SUPPORTED, 'Hub discovery is not available in this environment', null);
    }
    loadfile(file) {
        return new Promise((resolve, reject) => {
            let reader = new FileReader();
            reader.onerror = function (evt) {
                // @ts-ignore
                reject(evt.target.error);
            };
            reader.onload = function (evt) {
                // @ts-ignore
                resolve(new Uint8Array(evt.target.result));
            };
            reader.readAsArrayBuffer(file);
        });
    }
    downloadfile(url) {
        return new Promise((resolve, reject) => {
            let httpRequest = new XMLHttpRequest();
            httpRequest.open('GET', url, true);
            httpRequest.overrideMimeType('text/plain; charset=x-user-defined');
            httpRequest.onreadystatechange = (() => {
                if (httpRequest.readyState == 4) {
                    if (httpRequest.status != 200 && httpRequest.status != 304) {
                        if (httpRequest.status) {
                            reject(new Error('HTTP error ' + httpRequest.status));
                        }
                        else {
                            reject(new Error('Unable to complete HTTP request, network down?'));
                        }
                    }
                    else {
                        resolve(yocto_api_js_1.YAPI.imm_str2bin(httpRequest.responseText));
                    }
                }
            });
            httpRequest.send('');
        });
    }
}
exports.YSystemEnvHtml = YSystemEnvHtml;
const _HtmlSystemEnv = new YSystemEnvHtml();
yocto_api_js_1.YAPI.imm_setSystemEnv(_HtmlSystemEnv);
class YHttpHtmlHub extends yocto_api_js_1.YGenericHub {
    constructor(yapi, urlInfo) {
        super(yapi, urlInfo);
        this.notbynRequest = null;
        this.notbynOpenPromise = null;
        this.notbynRequest = null;
        this.notbynOpenPromise = null;
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
        let args = '?len=' + this.notiflen.toString();
        if (this.notifPos > 0) {
            args += '&abs=' + this.notifPos.toString();
        }
        this._hubAdded = false;
        if (!this.notbynOpenPromise) {
            this.notbynOpenTimeout = (mstimeout ? this._yapi.GetTickCount() + mstimeout : null);
            this.notbynOpenPromise = new Promise((resolve, reject) => {
                this.notbynTryOpen = () => {
                    let xmlHttpRequest = new XMLHttpRequest();
                    this._firstArrivalCallback = true;
                    this.notbynRequest = xmlHttpRequest;
                    xmlHttpRequest.open('GET', this.urlInfo.url + 'not.byn' + args, true, '', '');
                    xmlHttpRequest.overrideMimeType('text/plain; charset=x-user-defined');
                    xmlHttpRequest.onreadystatechange = (() => {
                        if (this.disconnecting) {
                            return;
                        }
                        if (xmlHttpRequest.readyState >= 3) {
                            resolve({ errorType: yocto_api_js_1.YAPI.SUCCESS, errorMsg: "" });
                            if (xmlHttpRequest.readyState == 4 &&
                                (xmlHttpRequest.status >> 0) != 200 &&
                                (xmlHttpRequest.status >> 0) != 304) {
                                // connection error
                                if (!this.imm_testHubAgainLater()) {
                                    resolve({ errorType: yocto_api_js_1.YAPI.IO_ERROR, errorMsg: "I/O error" });
                                }
                            }
                            else {
                                // receiving data properly
                                if (xmlHttpRequest.readyState == 3) {
                                    // when using reconnection mode, ignore state 3
                                    if (this.notiflen == 1)
                                        return;
                                }
                                let newlen = xmlHttpRequest.responseText.length;
                                if (newlen > this.currPos) {
                                    this._yapi.parseEvents(this, xmlHttpRequest.responseText.substr(this.currPos, newlen - this.currPos));
                                }
                                // trigger immediately a new connection if closed in success
                                if (xmlHttpRequest.readyState == 4 && (xmlHttpRequest.status >> 0) != 0) {
                                    this.notbynOpenPromise = null;
                                    this.currPos = 0;
                                    this.testHub(0, errmsg);
                                }
                            }
                        }
                    });
                    this.notbynRequest.send('');
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
     * @param method {string}
     * @param devUrl {string}
     * @param obj_body {YHTTPBody|null}
     * @param tcpchan {number}
     * @returns {YHTTPRequest}
     */
    async request(method, devUrl, obj_body, tcpchan) {
        return new Promise((resolve, reject) => {
            let prefix = this.urlInfo.url.slice(0, -1);
            let httpRequest = new XMLHttpRequest();
            httpRequest.open(method, prefix + devUrl, true, this.urlInfo.user, this.urlInfo.pass);
            httpRequest.onreadystatechange = (() => {
                if (httpRequest.readyState == 4) {
                    let yreq = new yocto_api_js_1.YHTTPRequest(null);
                    if (httpRequest.status != 200 && httpRequest.status != 304) {
                        yreq.errorType = (httpRequest.status == 401 ? yocto_api_js_1.YAPI.UNAUTHORIZED : yocto_api_js_1.YAPI.NOT_SUPPORTED);
                        yreq.errorMsg = 'HTTP Error ' + httpRequest.status + ' on ' + prefix + devUrl;
                    }
                    else {
                        yreq.bin_result = this._yapi.imm_str2bin(httpRequest.responseText);
                    }
                    resolve(yreq);
                }
            });
            let body = '';
            if (obj_body) {
                let blob = new Blob([obj_body.data], { type: 'application/octet-binary' });
                body = new FormData();
                body.append(obj_body.fname, blob);
            }
            httpRequest.send(body || '');
        });
    }
    async disconnect() {
        this.imm_commonDisconnect();
        if (this.notbynRequest) {
            this.notbynRequest.abort();
        }
    }
}
class YWebSocketHtmlHub extends yocto_api_js_1.YWebSocketHub {
    /** Open an outgoing websocket
     *
     * @param str_url {string}
     **/
    imm_webSocketOpen(str_url) {
        let websock = new WebSocket(str_url);
        websock.binaryType = 'arraybuffer';
        this.websocket = websock;
    }
    /** Fills a buffer with random numbers
     *
     * @param arr {Uint8Array}
     **/
    imm_getRandomValues(arr) {
        return window.crypto.getRandomValues(arr);
    }
}
//# sourceMappingURL=yocto_api_html.js.map