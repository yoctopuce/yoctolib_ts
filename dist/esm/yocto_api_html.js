/*********************************************************************
 *
 * $Id: yocto_api_html.ts 61542 2024-06-19 09:08:23Z seb $
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
import { YAPI, YHttpEngine, YWebSocketEngine, YSystemEnv } from "./yocto_api.js";
/**
 * System environment definition, for use in a browser
 */
export class YSystemEnvHtml extends YSystemEnv {
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
    getWebSocketEngine(hub, runtime_urlInfo) {
        return new YWebSocketHtmlEngine(hub, runtime_urlInfo);
    }
    getHttpEngine(hub, runtime_urlInfo) {
        return new YHttpHtmlEngine(hub, runtime_urlInfo);
    }
    getWebSocketCallbackHub(hub, ws) {
        return hub._yapi._throw(YAPI.NOT_SUPPORTED, 'WebSocket Callback mode is not available in this environment', null);
    }
    getHttpCallbackHub(hub, incomingMessage, serverResponse) {
        return hub._yapi._throw(YAPI.NOT_SUPPORTED, 'HTTP Callback mode is not available in this environment', null);
    }
    getSSDPManager(obj_yapi) {
        return obj_yapi._throw(YAPI.NOT_SUPPORTED, 'Hub discovery is not available in this environment', null);
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
    downloadfile(url, yapi) {
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
                        resolve(YAPI.imm_str2bin(httpRequest.responseText));
                    }
                }
            });
            httpRequest.send('');
        });
    }
    async downloadRemoteCertificate(urlinfo) {
        return "error: Not supported in browser";
    }
}
const _HtmlSystemEnv = new YSystemEnvHtml();
YAPI.imm_setSystemEnv(_HtmlSystemEnv);
class YHttpHtmlEngine extends YHttpEngine {
    constructor(hub, runtime_urlInfo) {
        super(hub, runtime_urlInfo);
    }
    // Low-level function to create an HTTP client request (abstraction layer)
    imm_makeRequest(method, relUrl, contentType, body, onProgress, onSuccess, onError) {
        let xhr = new XMLHttpRequest();
        let currPos = 0;
        xhr.open(method, this._runtime_urlInfo.imm_getUrl(true, true, true) + relUrl, true, '', '');
        // Send the request using text/plain POST, to avoid CORS checks
        xhr.setRequestHeader('Content-Type', contentType);
        xhr.overrideMimeType('text/plain; charset=x-user-defined');
        xhr.onreadystatechange = () => {
            if (xhr.readyState >= 3) {
                let httpStatus = xhr.status >> 0;
                if (xhr.readyState == 4 && httpStatus != 200 && httpStatus != 304) {
                    if (httpStatus == 401 || httpStatus == 204) {
                        // Authentication failure (204 == x-yauth)
                        this.infoJson.stamp = 0; // force to reload nonce/domain
                        onError(YAPI.UNAUTHORIZED, 'Unauthorized access (' + xhr.status + ')', false);
                    }
                    else if (httpStatus == 404) {
                        // No such file
                        onError(YAPI.FILE_NOT_FOUND, 'HTTP request return status 404 (not found)', false);
                    }
                    else if (this._hub.imm_isDisconnecting()) {
                        onError(YAPI.IO_ERROR, 'Hub is disconnecting', false);
                    }
                    else {
                        onError(YAPI.IO_ERROR, 'HTTP request failed with status ' + xhr.status, false);
                    }
                    return;
                }
                if (this._hub.imm_isDisconnecting()) {
                    if (this._hub._yapi._logLevel >= 4) {
                        this._hub._yapi.imm_log('Dropping request ' + relUrl + ' because hub is disconnecting');
                    }
                    return;
                }
                if (onProgress && xhr.responseText) {
                    let newlen = xhr.responseText.length;
                    if (newlen > currPos) {
                        onProgress(xhr.responseText.slice(currPos, newlen));
                        currPos = newlen;
                    }
                }
                if (onSuccess && xhr.readyState == 4) {
                    onSuccess(xhr.responseText);
                }
            }
        };
        xhr.onerror = () => {
            onError(YAPI.IO_ERROR, 'HTTP request failed without status', false);
        };
        xhr.send(body);
        return xhr;
    }
    // abort communication channel immediately
    imm_abortRequest(clientRequest) {
        clientRequest.abort();
    }
}
class YWebSocketHtmlEngine extends YWebSocketEngine {
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