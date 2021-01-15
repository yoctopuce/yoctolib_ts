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
/// <reference types="node" />
export * from "./yocto_api.js";
import { YUnhandledPromiseRejectionCallback, _YY_UrlInfo, YSystemEnv, YGenericHub, YGenericSSDPManager, YAPIContext } from "./yocto_api.js";
import 'process';
import * as dgram from 'dgram';
import * as http from 'http';
import WebSocket from 'ws';
/**
 * System environment definition, for use with Node.js libraries
 */
export declare class YSystemEnvNodeJs extends YSystemEnv {
    isNodeJS: boolean;
    hasSSDP: boolean;
    hookUnhandledRejection(handler: YUnhandledPromiseRejectionCallback): void;
    getWebSocketHub(obj_yapi: YAPIContext, urlInfo: _YY_UrlInfo): YGenericHub | null;
    getHttpHub(obj_yapi: YAPIContext, urlInfo: _YY_UrlInfo): YGenericHub | null;
    getWebSocketCallbackHub(obj_yapi: YAPIContext, urlInfo: _YY_UrlInfo, ws: WebSocket): YGenericHub | null;
    getHttpCallbackHub(obj_yapi: YAPIContext, urlInfo: _YY_UrlInfo, incomingMessage: http.IncomingMessage, serverResponse: http.ServerResponse): YGenericHub | null;
    getSSDPManager(obj_yapi: YAPIContext): YGenericSSDPManager | null;
    loadfile(file: string | Blob): Promise<Uint8Array>;
    downloadfile(url: string): Promise<Uint8Array>;
}
interface _YY_SSDPSockets {
    [iface: string]: dgram.Socket;
}
export declare class YNodeSSDPManager extends YGenericSSDPManager {
    _request_sock: _YY_SSDPSockets;
    _notify_sock: _YY_SSDPSockets;
    ySSDPOpenSockets(): Promise<void>;
    ySSDPCloseSockets(): Promise<void>;
    ySSDPSendPacket(msg: string, port: number, ipaddr: string): Promise<void>;
}
