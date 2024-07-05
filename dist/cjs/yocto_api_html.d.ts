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
import { _YY_UrlInfo, YAPIContext, YGenericHub, YGenericSSDPManager, YSystemEnv, YUnhandledPromiseRejectionCallback, YHubEngine } from "./yocto_api.js";
/**
 * System environment definition, for use in a browser
 */
export declare class YSystemEnvHtml extends YSystemEnv {
    isNodeJS: boolean;
    hasSSDP: boolean;
    hookUnhandledRejection(handler: YUnhandledPromiseRejectionCallback): void;
    getWebSocketEngine(hub: YGenericHub, runtime_urlInfo: _YY_UrlInfo): YHubEngine | null;
    getHttpEngine(hub: YGenericHub, runtime_urlInfo: _YY_UrlInfo): YHubEngine | null;
    getWebSocketCallbackHub(hub: YGenericHub, ws: any): YHubEngine | null;
    getHttpCallbackHub(hub: YGenericHub, incomingMessage: any, serverResponse: any): YHubEngine | null;
    getSSDPManager(obj_yapi: YAPIContext): YGenericSSDPManager | null;
    loadfile(file: string | Blob): Promise<Uint8Array>;
    downloadfile(url: string, yapi: YAPIContext): Promise<Uint8Array>;
    downloadRemoteCertificate(urlinfo: _YY_UrlInfo): Promise<string>;
}
