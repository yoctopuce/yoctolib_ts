/*********************************************************************
 *
 * $Id: yocto_api_html.ts 55358 2023-06-28 09:00:27Z seb $
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
    _YY_UrlInfo,
    _YY_WebSocket,
    Y_YHubConnType,
    YAPI,
    YAPI_IO_ERROR,
    YAPI_SUCCESS,
    YAPI_UNAUTHORIZED,
    YAPIContext,
    YConditionalResult,
    YGenericHub, YHttpHub, YWebSocketHub,
    YGenericSSDPManager,
    YHTTPBody,
    YHTTPRequest,
    YSystemEnv,
    YUnhandledPromiseRejectionCallback
} from "./yocto_api.js";

/**
 * System environment definition, for use in a browser
 */
export class YSystemEnvHtml extends YSystemEnv
{
    isNodeJS: boolean = false;
    hasSSDP: boolean = false;

    hookUnhandledRejection(handler: YUnhandledPromiseRejectionCallback):void
    {
        window.addEventListener('onunhandledrejection', (event: Event):void => {
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
        return new Promise((resolve: Function, reject: Function):void => {
            let reader = new FileReader();
            reader.onerror = function (evt):void {
                // @ts-ignore
                reject(evt.target.error);
            };
            reader.onload = function (evt):void {
                // @ts-ignore
                resolve(new Uint8Array(evt.target.result));
            };
            reader.readAsArrayBuffer(<Blob>file);
        });
    }

    downloadfile(url: string): Promise<Uint8Array>
    {
        return new Promise((resolve, reject):void => {
            let httpRequest = new XMLHttpRequest();
            httpRequest.open('GET', url, true);
            httpRequest.overrideMimeType('text/plain; charset=x-user-defined');
            httpRequest.onreadystatechange = (():void => {
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

class YHttpHtmlHub extends YHttpHub
{
    constructor(yapi: YAPIContext, urlInfo: _YY_UrlInfo)
    {
        super(yapi, urlInfo);
    }

    // Low-level function to create an HTTP client request (abstraction layer)
    imm_makeRequest(method: string, relUrl: string, contentType: string, body: string | Uint8Array | null,
                    onProgress: null | ((moreText: string) => void),
                    onSuccess: null | ((responseText: string) => void),
                    onError: (errorType: number, errorMsg: string) => any): XMLHttpRequest
    {
        let xhr: XMLHttpRequest = new XMLHttpRequest();
        let currPos: number = 0;
        xhr.open(method, this.urlInfo.authUrl + relUrl, true, '', '');
        // Send the request using text/plain POST, to avoid CORS checks
        xhr.setRequestHeader('Content-Type', contentType);
        xhr.overrideMimeType('text/plain; charset=x-user-defined');
        xhr.onreadystatechange = ():void => {
            if(xhr.readyState >= 3) {
                let httpStatus: number = xhr.status >> 0;
                if(xhr.readyState == 4 && httpStatus != 200 && httpStatus != 304) {
                    if(httpStatus == 401 || httpStatus == 204) {
                        // Authentication failure (204 == x-yauth)
                        this.infoJson.stamp = 0; // force to reload nonce/domain
                        onError(YAPI.UNAUTHORIZED, 'Unauthorized access ('+xhr.status+')');
                    } else if(httpStatus == 404) {
                        // No such file
                        onError(YAPI.FILE_NOT_FOUND, 'HTTP request return status 404 (not found)');
                    } else if(this.imm_isDisconnecting()) {
                        onError(YAPI.IO_ERROR, 'Hub is disconnecting');
                    } else {
                        onError(YAPI.IO_ERROR, 'HTTP request failed with status '+xhr.status);
                    }
                    return;
                }
                if (this.imm_isDisconnecting()) {
                    if(this._yapi._logLevel >= 4) {
                        this._yapi.imm_log('Dropping request '+relUrl+' because hub is disconnecting');
                    }
                    return;
                }
                if (onProgress && xhr.responseText) {
                    let newlen = xhr.responseText.length;
                    if(newlen > currPos) {
                        onProgress(xhr.responseText.slice(currPos, newlen))
                        currPos = newlen
                    }
                }
                if (onSuccess && xhr.readyState == 4) {
                    onSuccess(xhr.responseText);
                }
            }
        }
        xhr.onerror = ():void => {
            onError(YAPI.IO_ERROR, 'HTTP request failed without status');
        };
        xhr.send(body);
        return xhr;
    }

    // abort communication channel immediately
    imm_abortRequest(clientRequest: any): void
    {
        (<XMLHttpRequest> clientRequest).abort();
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