/*********************************************************************
 *
 * $Id: yocto_api.ts 61714 2024-06-28 09:43:23Z seb $
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

//--- (generated code: YFunction return codes)
// Yoctopuce error codes, also used by default as function return value
export const YAPI_SUCCESS                   : number = 0;       // everything worked all right
export const YAPI_NOT_INITIALIZED           : number = -1;      // call yInitAPI() first !
export const YAPI_INVALID_ARGUMENT          : number = -2;      // one of the arguments passed to the function is invalid
export const YAPI_NOT_SUPPORTED             : number = -3;      // the operation attempted is (currently) not supported
export const YAPI_DEVICE_NOT_FOUND          : number = -4;      // the requested device is not reachable
export const YAPI_VERSION_MISMATCH          : number = -5;      // the device firmware is incompatible with this API version
export const YAPI_DEVICE_BUSY               : number = -6;      // the device is busy with another task and cannot answer
export const YAPI_TIMEOUT                   : number = -7;      // the device took too long to provide an answer
export const YAPI_IO_ERROR                  : number = -8;      // there was an I/O problem while talking to the device
export const YAPI_NO_MORE_DATA              : number = -9;      // there is no more data to read from
export const YAPI_EXHAUSTED                 : number = -10;     // you have run out of a limited resource, check the documentation
export const YAPI_DOUBLE_ACCES              : number = -11;     // you have two process that try to access to the same device
export const YAPI_UNAUTHORIZED              : number = -12;     // unauthorized access to password-protected device
export const YAPI_RTC_NOT_READY             : number = -13;     // real-time clock has not been initialized (or time was lost)
export const YAPI_FILE_NOT_FOUND            : number = -14;     // the file is not found
export const YAPI_SSL_ERROR                 : number = -15;     // Error reported by mbedSSL
export const YAPI_RFID_SOFT_ERROR           : number = -16;     // Recoverable error with RFID tag (eg. tag out of reach), check YRfidStatus for details
export const YAPI_RFID_HARD_ERROR           : number = -17;     // Serious RFID error (eg. write-protected, out-of-boundary), check YRfidStatus for details
export const YAPI_BUFFER_TOO_SMALL          : number = -18;     // The buffer provided is too small
export const YAPI_DNS_ERROR                 : number = -19;     // Error during name resolutions (invalid hostname or dns communication error)
export const YAPI_SSL_UNK_CERT              : number = -20;     // The certificate is not correctly signed by the trusted CA
export const YAPI_INVALID_INT               : number = 0x7fffffff;
export const YAPI_INVALID_UINT              : number = -1;
export const YAPI_INVALID_LONG              : number = 0x7fffffffffffffff;
export const YAPI_INVALID_DOUBLE            : number = -Number.MAX_VALUE;
export const YAPI_INVALID_STRING            : string = '!INVALID!';
    // TLS / SSL definitions
export const YAPI_NO_TRUSTED_CA_CHECK       : number = 1;       // Disables certificate checking
export const YAPI_NO_EXPIRATION_CHECK       : number = 2;       // Disables certificate expiration date checking
export const YAPI_NO_HOSTNAME_CHECK         : number = 4;       // Disable hostname checking
export const YAPI_LEGACY                    : number = 8;       // Allow non secure connection (similar to v1.10)
//--- (end of generated code: YFunction return codes)
export const YAPI_MIN_DOUBLE: number = -Number.MAX_VALUE;
export const YAPI_MAX_DOUBLE: number = Number.MAX_VALUE;
export const Y_FUNCTIONDESCRIPTOR_INVALID: string = YAPI_INVALID_STRING;

// yInitAPI constants (not really useful in Javascript, but defined for code portability)
export const Y_DETECT_NONE: number = 0;
export const Y_DETECT_USB: number = 1;
export const Y_DETECT_NET: number = 2;
export const Y_DETECT_ALL: number = (Y_DETECT_USB | Y_DETECT_NET);

const DEFAULT_DEVICE_LIST_VALIDITY_MS: number = 10000;
const DEFAULT_NETWORK_TIMEOUT_MS: number = 20000;

// calibration types
const YOCTO_CALIB_TYPE_OFS: number = 30;

const NOTIFY_NETPKT_NAME = '0';
const NOTIFY_NETPKT_CHILD = '2';
const NOTIFY_NETPKT_FUNCNAME = '4';
const NOTIFY_NETPKT_FUNCVAL = '5';
const NOTIFY_NETPKT_LOG = '7';
const NOTIFY_NETPKT_FUNCNAMEYDX = '8';
const NOTIFY_NETPKT_CONFCHGYDX = 's';
const NOTIFY_NETPKT_FLUSHV2YDX = 't';
const NOTIFY_NETPKT_FUNCV2YDX = 'u';
const NOTIFY_NETPKT_TIMEV2YDX = 'v';
const NOTIFY_NETPKT_DEVLOGYDX = 'w';
const NOTIFY_NETPKT_TIMEVALYDX = 'x';
const NOTIFY_NETPKT_FUNCVALYDX = 'y';
const NOTIFY_NETPKT_TIMEAVGYDX = 'z';
const NOTIFY_NETPKT_NOT_SYNC = '@';
const NOTIFY_NETPKT_STOP = 10;      // =\n

const NOTIFY_V2_LEGACY = 0;         // unused (reserved for compatibility with legacy notifications)
const NOTIFY_V2_6RAWBYTES = 1;      // largest type: data is always 6 bytes
const NOTIFY_V2_TYPEDDATA = 2;      // other types: first data byte holds the decoding format
const NOTIFY_V2_FLUSHGROUP = 3;     // no data associated

const PUBVAL_LEGACY = 0;            // 0-6 ASCII characters (normally sent as YSTREAM_NOTICE)
const PUBVAL_1RAWBYTE = 1;          // 1 raw byte  (=2 characters)
const PUBVAL_2RAWBYTES = 2;         // 2 raw bytes (=4 characters)
const PUBVAL_3RAWBYTES = 3;         // 3 raw bytes (=6 characters)
const PUBVAL_4RAWBYTES = 4;         // 4 raw bytes (=8 characters)
const PUBVAL_5RAWBYTES = 5;         // 5 raw bytes (=10 characters)
const PUBVAL_6RAWBYTES = 6;         // 6 hex bytes (=12 characters) (sent as V2_6RAWBYTES)
const PUBVAL_C_LONG = 7;            // 32-bit C signed integer
const PUBVAL_C_FLOAT = 8;           // 32-bit C float
const PUBVAL_YOCTO_FLOAT_E3 = 9;    // 32-bit Yocto fixed-point format (e-3)
const PUBVAL_YOCTO_FLOAT_E6 = 10;   // 32-bit Yocto fixed-point format (e-6)

const YOCTO_PUBVAL_LEN = 16;
const YOCTO_PUBVAL_SIZE = 6;
const YOCTO_HASH_BUF_SIZE = 28;

const YOCTO_BASETYPE_FUNCTION = 0;
const YOCTO_BASETYPE_SENSOR = 1;

const Y_BASETYPES: YIntDict = {
    Function: YOCTO_BASETYPE_FUNCTION,
    Sensor: YOCTO_BASETYPE_SENSOR
};

export class YErrorMsg
{
    msg: string;

    constructor(msg: string = '')
    {
        this.msg = msg;
    }
}

export class YoctoError extends Error
{
    errorType?: number;
    errorMsg?: string;

    constructor(...params: any[])
    {
        // Pass remaining arguments (including vendor specific ones) to parent constructor
        super(...params);
        this.errorMsg = this.name;
        this.name = 'YoctoError';

        // Maintains proper stack trace for where our error was thrown (only available on V8)
        if ('captureStackTrace' in Error) {
            // @ts-ignore
            Error.captureStackTrace(this, YoctoError)
        }
    }
}

export interface YLogCallback {(msg: string): void}

export interface YProgressCallback {(progress: number, msg: string): void}

export interface yCalibrationHandler {(rawValue: number, calibType: number, parameters: number[], rawValues: number[], refValues: number[]): number}

export interface YHubDiscoveryCallback {(serial: string, urlToRegister: string | null, urlToUnregister: string | null): void}

export interface YDeviceUpdateCallback {(module: YModule): void}

export interface YUnhandledPromiseRejectionCallback {(reason: object, promise: PromiseLike<any>): void}

export type PortInfo = {
    proto: string;
    port: number;
}

export class _YY_UrlInfo
{
    private proto: string;
    private user: string;
    private pass: string;
    private host: string;
    private port: number;
    private domain: string;  // this is the subdirectory, not the DNS domain!
    private orgUrl: string;  // the original URL that create this object

    constructor(str_url: string)
    {
        this.orgUrl = str_url
        let proto: string = 'auto';
        let user: string = '';
        let pass: string = '';
        let port: number = 4444;
        let host: string;
        let dom: string = '';

        if (str_url.slice(0, 7) == 'http://') {
            proto = 'http';
            str_url = str_url.slice(7);
        } else if (str_url.slice(0, 5) == 'ws://') {
            proto = 'ws';
            str_url = str_url.slice(5);
        } else if (str_url.slice(0, 8) == 'https://') {
            proto = 'https';
            port = 4443;
            str_url = str_url.slice(8);
        } else if (str_url.slice(0, 6) == 'wss://') {
            proto = 'wss';
            port = 4443;
            str_url = str_url.slice(6);
        } else if (str_url.slice(0, 7) == 'auto://') {
            str_url = str_url.slice(7);
        } else if (str_url.slice(0, 9) == 'secure://') {
            str_url = str_url.slice(9);
            port = 4443;
            proto = 'secure';
        }
        str_url = str_url.replace('/not.byn', '');
        if (str_url[str_url.length - 1] == '/') {
            str_url = str_url.slice(0, str_url.length - 1);
        }
        let pos = str_url.indexOf('/');
        if (pos > 0) {
            dom = str_url.slice(pos);
            str_url = str_url.slice(0, pos);
        }
        let authpos = str_url.indexOf('@');
        if (authpos >= 0) {
            let auth = str_url.slice(0, authpos);
            let passpos = auth.indexOf(':');
            if (passpos >= 0) {
                user = auth.slice(0, passpos);
                pass = auth.slice(passpos + 1);
            } else {
                user = auth;
            }
            str_url = str_url.slice(authpos + 1);
        }

        let endv6: number = str_url.indexOf(']');
        pos = str_url.indexOf(':');
        if (pos > 0 && endv6 > 0 && pos < endv6) {
            // ipv6 URL
            pos = str_url.indexOf(':', endv6);
        }

        if (pos < 0) {
            host = str_url;
            if (dom != '') {
                if (proto == 'http') {
                    port = 80;
                } else if (proto == 'https') {
                    port = 443;
                }
            }
        } else {
            host = str_url.slice(0, pos);
            port = YAPIContext.imm_atoi(str_url.slice(pos + 1));
        }
        if (host == 'callback') {
            port = 4444;
        }
        this.proto = proto;
        this.user = user;
        this.pass = pass;
        this.host = host;
        this.port = port;
        this.domain = dom;
    }

    imm_getHost(): string
    {
        return this.host;
    }

    imm_getPass(): string
    {
        return this.pass;
    }

    imm_getPort(): number
    {
        return this.port;
    }

    imm_getUser(): string
    {
        return this.user;
    }

    imm_getUrl(withProto: boolean = false, withUserPass: boolean = true, withEndSlash: boolean = false): string
    {
        if (this.proto == "usb") {
            return "usb";
        }
        let url: string = "";
        if (withProto) {
            url += this.proto + "://";
        }
        if (withUserPass && this.user != "") {
            url += this.user;
            if (this.pass != "") {
                url += ":";
                url += this.pass;
            }
            url += "@";
        }
        url += this.host;
        url += ":";
        url += this.port;
        url += this.domain;
        if (withEndSlash && url[url.length - 1] != '/') {
            url += '/';
        }
        return url;
    }

    imm_getRootUrl(): string
    {
        return this.imm_getUrl(true, false, true);
    }

    imm_getProto(): string
    {
        return this.proto;
    }

    imm_useWebSocket(): boolean
    {
        return this.proto.startsWith("ws") || this.proto == "auto" || this.proto == "secure";
    }

    /**
     * @return subdomain (starting with a /)
     */
    imm_getSubDomain(): string
    {
        let dom: string = this.domain;
        return dom;
    }

    imm_hasAuthParam(): boolean
    {
        return this.user != "";
    }

    imm_useSecureSocket(): boolean
    {
        return "wss" == this.proto || "https" == this.proto || "secure" == this.proto;
    }

    imm_testInfoJson(): boolean
    {
        return this.proto == "auto" || this.proto == "secure" || this.proto == "http" || this.proto == "https";
    }

    imm_updateBestProto(proto: string, port: number): void
    {
        this.port = port;
        if (this.proto != "http" && this.proto != "https") {
            this.proto = proto;
        }
    }

    imm_updateForRedirect(host: string, port: number, is_secure: boolean): void
    {
        this.host = host;
        this.port = port;
        if (this.imm_useWebSocket()) {
            this.proto = is_secure ? "wss" : "ws";
        } else {
            this.proto = is_secure ? "https" : "http";
        }
    }

    imm_updatePortInfo(proto: string, port: number): void
    {
        this.proto = proto;
        this.port = port;
    }

    imm_getOriginalURL(): string
    {
        return this.orgUrl;
    }
    imm_updateFrom(urlInfo: _YY_UrlInfo): void
    {
        this.proto = urlInfo.proto;
        this.user = urlInfo.user;
        this.pass = urlInfo.pass;
        this.host = urlInfo.host;
        this.port = urlInfo.port;
        this.domain = urlInfo.domain;
        this.orgUrl = urlInfo.orgUrl;
    }
}

export interface YConditionalResult
{
    errorType: number,
    errorMsg: string,
    result?: string
}

export interface YConditionalResultResolver
{
    (result: YConditionalResult): void
}

export interface WebSocketCredential
{
    user: string;
    pass: string;
}

interface YStringDict
{
    [ident: string]: string;
}

interface YBoolDict
{
    [ident: string]: boolean;
}

interface YIntDict
{
    [ident: string]: number;
}

interface YObjectDict
{
    [ident: string]: object;
}

interface YDeviceDict
{
    [ident: string]: YDevice;
}

interface YGenericHubDict
{
    [ident: string]: YGenericHub;
}

interface YHubDict
{
    [ident: string]: YHub;
}

interface YFunctionTypeDict
{
    [ident: string]: YFunctionType;
}

interface YFunctionDict
{
    [ident: string]: YFunction;
}

interface YDataStreamDict
{
    [ident: string]: YDataStream;
}

interface YUrlInfoDict
{
    [ident: string]: _YY_UrlInfo;
}

/**
 * MD5 hash computation code
 *
 * This code is derived from the MD5 implementation from Sergey Lyubka, author of SHTTPD.
 * Any other implementation would do as well, but we chose to translate this one to JS.
 * This code has been published by Sergey under his "THE BEER-WARE LICENSE" (Revision 42):
 *
 *   Sergey Lyubka wrote this software. As long as you retain this notice you
 *   can do whatever you want with this stuff. If we meet some day, and you think
 *   this stuff is worth it, you can buy me a beer in return.
 *
 */
class Y_MD5Ctx
{
    buf: Uint32Array;
    bits: Uint32Array;
    inBuf: ArrayBuffer;
    in8: Uint8Array;
    in32: Uint32Array;
    bigEndian: boolean;

    constructor()
    {
        this.buf = new Uint32Array(4);
        this.bits = new Uint32Array(2);
        this.inBuf = new ArrayBuffer(64);
        this.in8 = new Uint8Array(this.inBuf);
        this.in32 = new Uint32Array(this.inBuf);
        this.in32[0] = 1;
        this.bigEndian = (this.in8[0] != 1);

        this.buf[0] = 0x67452301 >>> 0;
        this.buf[1] = 0xefcdab89 >>> 0;
        this.buf[2] = 0x98badcfe >>> 0;
        this.buf[3] = 0x10325476 >>> 0;
        this.bits[0] = 0;
        this.bits[1] = 0;
    }

    _byteReverseIn(): void
    {
        for (let i = 0; i < 16; i++) {
            let a = this.in32[i];
            this.in32[i] = ((a >>> 24) | ((a & 0xff) << 24) | ((a & 0xff0000) >>> 8) | ((a & 0xff00) << 8)) >>> 0;
        }
    }

    _transform(): void
    {
        let F1 = ((x: number, y: number, z: number): number => ((z ^ (x & (y ^ z)))) >>> 0);
        let F2 = ((x: number, y: number, z: number): number => F1(z, x, y));
        let F3 = ((x: number, y: number, z: number): number => ((x ^ y ^ z)) >>> 0);
        let F4 = ((x: number, y: number, z: number): number => ((y ^ (x | ~z))) >>> 0);
        let MD5STEP = ((f: Function, w: number, x: number, y: number, z: number, data: number, s: number): number => {
            w = (w + f(x, y, z) + (data >>> 0)) >>> 0;
            w = (((w << s) >>> 0) | (w >>> (32 - s))) >>> 0;
            return (w + x) >>> 0;
        });
        let a = this.buf[0];
        let b = this.buf[1];
        let c = this.buf[2];
        let d = this.buf[3];
        let dataIn = this.in32;

        a = MD5STEP(F1, a, b, c, d, dataIn[0] + 0xd76aa478, 7);
        d = MD5STEP(F1, d, a, b, c, dataIn[1] + 0xe8c7b756, 12);
        c = MD5STEP(F1, c, d, a, b, dataIn[2] + 0x242070db, 17);
        b = MD5STEP(F1, b, c, d, a, dataIn[3] + 0xc1bdceee, 22);
        a = MD5STEP(F1, a, b, c, d, dataIn[4] + 0xf57c0faf, 7);
        d = MD5STEP(F1, d, a, b, c, dataIn[5] + 0x4787c62a, 12);
        c = MD5STEP(F1, c, d, a, b, dataIn[6] + 0xa8304613, 17);
        b = MD5STEP(F1, b, c, d, a, dataIn[7] + 0xfd469501, 22);
        a = MD5STEP(F1, a, b, c, d, dataIn[8] + 0x698098d8, 7);
        d = MD5STEP(F1, d, a, b, c, dataIn[9] + 0x8b44f7af, 12);
        c = MD5STEP(F1, c, d, a, b, dataIn[10] + 0xffff5bb1, 17);
        b = MD5STEP(F1, b, c, d, a, dataIn[11] + 0x895cd7be, 22);
        a = MD5STEP(F1, a, b, c, d, dataIn[12] + 0x6b901122, 7);
        d = MD5STEP(F1, d, a, b, c, dataIn[13] + 0xfd987193, 12);
        c = MD5STEP(F1, c, d, a, b, dataIn[14] + 0xa679438e, 17);
        b = MD5STEP(F1, b, c, d, a, dataIn[15] + 0x49b40821, 22);

        a = MD5STEP(F2, a, b, c, d, dataIn[1] + 0xf61e2562, 5);
        d = MD5STEP(F2, d, a, b, c, dataIn[6] + 0xc040b340, 9);
        c = MD5STEP(F2, c, d, a, b, dataIn[11] + 0x265e5a51, 14);
        b = MD5STEP(F2, b, c, d, a, dataIn[0] + 0xe9b6c7aa, 20);
        a = MD5STEP(F2, a, b, c, d, dataIn[5] + 0xd62f105d, 5);
        d = MD5STEP(F2, d, a, b, c, dataIn[10] + 0x02441453, 9);
        c = MD5STEP(F2, c, d, a, b, dataIn[15] + 0xd8a1e681, 14);
        b = MD5STEP(F2, b, c, d, a, dataIn[4] + 0xe7d3fbc8, 20);
        a = MD5STEP(F2, a, b, c, d, dataIn[9] + 0x21e1cde6, 5);
        d = MD5STEP(F2, d, a, b, c, dataIn[14] + 0xc33707d6, 9);
        c = MD5STEP(F2, c, d, a, b, dataIn[3] + 0xf4d50d87, 14);
        b = MD5STEP(F2, b, c, d, a, dataIn[8] + 0x455a14ed, 20);
        a = MD5STEP(F2, a, b, c, d, dataIn[13] + 0xa9e3e905, 5);
        d = MD5STEP(F2, d, a, b, c, dataIn[2] + 0xfcefa3f8, 9);
        c = MD5STEP(F2, c, d, a, b, dataIn[7] + 0x676f02d9, 14);
        b = MD5STEP(F2, b, c, d, a, dataIn[12] + 0x8d2a4c8a, 20);

        a = MD5STEP(F3, a, b, c, d, dataIn[5] + 0xfffa3942, 4);
        d = MD5STEP(F3, d, a, b, c, dataIn[8] + 0x8771f681, 11);
        c = MD5STEP(F3, c, d, a, b, dataIn[11] + 0x6d9d6122, 16);
        b = MD5STEP(F3, b, c, d, a, dataIn[14] + 0xfde5380c, 23);
        a = MD5STEP(F3, a, b, c, d, dataIn[1] + 0xa4beea44, 4);
        d = MD5STEP(F3, d, a, b, c, dataIn[4] + 0x4bdecfa9, 11);
        c = MD5STEP(F3, c, d, a, b, dataIn[7] + 0xf6bb4b60, 16);
        b = MD5STEP(F3, b, c, d, a, dataIn[10] + 0xbebfbc70, 23);
        a = MD5STEP(F3, a, b, c, d, dataIn[13] + 0x289b7ec6, 4);
        d = MD5STEP(F3, d, a, b, c, dataIn[0] + 0xeaa127fa, 11);
        c = MD5STEP(F3, c, d, a, b, dataIn[3] + 0xd4ef3085, 16);
        b = MD5STEP(F3, b, c, d, a, dataIn[6] + 0x04881d05, 23);
        a = MD5STEP(F3, a, b, c, d, dataIn[9] + 0xd9d4d039, 4);
        d = MD5STEP(F3, d, a, b, c, dataIn[12] + 0xe6db99e5, 11);
        c = MD5STEP(F3, c, d, a, b, dataIn[15] + 0x1fa27cf8, 16);
        b = MD5STEP(F3, b, c, d, a, dataIn[2] + 0xc4ac5665, 23);

        a = MD5STEP(F4, a, b, c, d, dataIn[0] + 0xf4292244, 6);
        d = MD5STEP(F4, d, a, b, c, dataIn[7] + 0x432aff97, 10);
        c = MD5STEP(F4, c, d, a, b, dataIn[14] + 0xab9423a7, 15);
        b = MD5STEP(F4, b, c, d, a, dataIn[5] + 0xfc93a039, 21);
        a = MD5STEP(F4, a, b, c, d, dataIn[12] + 0x655b59c3, 6);
        d = MD5STEP(F4, d, a, b, c, dataIn[3] + 0x8f0ccc92, 10);
        c = MD5STEP(F4, c, d, a, b, dataIn[10] + 0xffeff47d, 15);
        b = MD5STEP(F4, b, c, d, a, dataIn[1] + 0x85845dd1, 21);
        a = MD5STEP(F4, a, b, c, d, dataIn[8] + 0x6fa87e4f, 6);
        d = MD5STEP(F4, d, a, b, c, dataIn[15] + 0xfe2ce6e0, 10);
        c = MD5STEP(F4, c, d, a, b, dataIn[6] + 0xa3014314, 15);
        b = MD5STEP(F4, b, c, d, a, dataIn[13] + 0x4e0811a1, 21);
        a = MD5STEP(F4, a, b, c, d, dataIn[4] + 0xf7537e82, 6);
        d = MD5STEP(F4, d, a, b, c, dataIn[11] + 0xbd3af235, 10);
        c = MD5STEP(F4, c, d, a, b, dataIn[2] + 0x2ad7d2bb, 15);
        b = MD5STEP(F4, b, c, d, a, dataIn[9] + 0xeb86d391, 21);

        this.buf[0] = ((this.buf[0] + a) & 0xffffffff) >>> 0;
        this.buf[1] = ((this.buf[1] + b) & 0xffffffff) >>> 0;
        this.buf[2] = ((this.buf[2] + c) & 0xffffffff) >>> 0;
        this.buf[3] = ((this.buf[3] + d) & 0xffffffff) >>> 0;
    }

    addData(buf: Uint8Array): void
    {
        let len = buf.length;
        let pos = 0;
        let t = this.bits[0];
        this.bits[0] = (t + (len << 3)) >>> 0;
        if (this.bits[0] < t) {
            this.bits[1]++;
        }
        this.bits[1] += len >>> 29;
        t = (t >>> 3) & 0x3f;
        while (pos < len) {
            while (pos < len && t < 64) {
                this.in8[t++] = buf[pos++];
            }
            if (t < 64) return;
            if (this.bigEndian) this._byteReverseIn();
            this._transform();
            t = 0;
        }
    }

    calculate(): Uint8Array
    {
        let t = (this.bits[0] >>> 3) & 0x3f;
        this.in8[t++] = 0x80;
        if (t > 56) {
            while (t < 64) {
                this.in8[t++] = 0;
            }
            if (this.bigEndian) this._byteReverseIn();
            this._transform();
            for (t = 0; t < 14; t++) {
                this.in32[t] = 0;
            }
        } else {
            while (t < 56) {
                this.in8[t++] = 0;
            }
            if (this.bigEndian) this._byteReverseIn();
        }
        this.in32[14] = this.bits[0];
        this.in32[15] = this.bits[1];
        this._transform();
        let res = new Uint8Array(16);
        for (t = 0; t < 16; t++) {
            res[t] = (this.buf[t >>> 2] >>> (8 * (t & 3))) & 0xff;
        }
        return res;
    }
}

//
// YFunctionType Class (used internally)
//
// Instances of this class stores everything we know about a given type of function:
// Mapping between function logical names and Hardware ID as discovered on hubs,
// and existing instances of YFunction (either already connected or simply requested).
// To keep it simple, this implementation separates completely the name resolution
// mechanism, implemented using the yellow pages, and the storage and retrieval of
// existing YFunction instances.
//
class YFunctionType
{
    private _yapi: YAPIContext
    private _className: string;
    private _connectedFns: YFunctionDict;   // functions requested and available, by Hardware Id
    private _requestedFns: YFunctionDict;   // functions requested but not yet known, by any type of name
    private _hwIdByName: YStringDict;       // hash table of function Hardware Id by logical name
    private _nameByHwId: YStringDict;       // hash table of function logical name by Hardware Id
    private _valueByHwId: YStringDict;      // hash table of function advertised value by logical name
    private _baseType: number;              // default to no abstract base type (generic YFunction)

    constructor(yapi: YAPIContext, classname: string)
    {
        this._yapi = yapi;
        this._className = classname;
        this._connectedFns = {};           // functions requested and available, by Hardware Id
        this._requestedFns = {};           // functions requested but not yet known, by any type of name
        this._hwIdByName = {};           // hash table of function Hardware Id by logical name
        this._nameByHwId = {};           // hash table of function logical name by Hardware Id
        this._valueByHwId = {};           // hash table of function advertised value by logical name
        this._baseType = 0;            // default to no abstract base type (generic YFunction)
    }

    /** Index a single function given by HardwareId and logical name; store any advertised value
     *
     * @param {string} str_hwid
     * @param {string} str_name
     * @param {string|null} str_val
     * @param {number|null} int_basetype
     * @returns {boolean} true iff there was a logical name discrepancy
     */
    imm_reindexFunction(str_hwid: string, str_name: string, str_val: string | null, int_basetype: number | null): boolean
    {
        let currname = this._nameByHwId[str_hwid];
        let res = false;
        if (currname == undefined || currname == '') {
            if (str_name != '') {
                this._nameByHwId[str_hwid] = str_name;
                res = true;
            }
        } else if (currname != str_name) {
            if (this._hwIdByName[currname] == str_hwid) {
                delete this._hwIdByName[currname];
            }
            if (str_name != '') {
                this._nameByHwId[str_hwid] = str_name;
            } else {
                delete this._nameByHwId[str_hwid];
            }
            res = true;
        }
        if (str_name != '') {
            this._hwIdByName[str_name] = str_hwid;
        }
        if (str_val) {
            this._valueByHwId[str_hwid] = str_val;
        } else {
            if (this._valueByHwId[str_hwid] == undefined) {
                this._valueByHwId[str_hwid] = '';
            }
        }
        if (int_basetype) {
            if (this._baseType == 0) {
                this._baseType = int_basetype;
            }
        }
        return res;
    }

    /** Forget a disconnected function given by HardwareId
     *
     * @param {string} str_hwid
     */
    imm_forgetFunction(str_hwid: string): void
    {
        let currname = this._nameByHwId[str_hwid];
        if (currname != undefined) {
            if (currname != '' && this._hwIdByName[currname] == str_hwid) {
                delete this._hwIdByName[currname];
            }
            delete this._nameByHwId[str_hwid];
        }
        if (this._valueByHwId[str_hwid] != undefined) {
            delete this._valueByHwId[str_hwid];
        }
        // Move the function object to the disconnected list
        let con_fn = this._connectedFns[str_hwid];
        if (con_fn) {
            this._requestedFns[str_hwid] = con_fn;
            delete this._connectedFns[str_hwid];
        }
    }

    /** Find the exact Hardware Id of the specified function, if currently connected
     * If device is not known as connected, return a clean error
     * This function will not cause any network access
     *
     * @param {string} str_func
     * @return {object}
     */
    imm_resolve(str_func: string): YConditionalResult
    {
        let res: string;
        let dotpos = str_func.indexOf('.');
        if (dotpos < 0) {
            // First case: str_func is the logicalname of a function
            res = this._hwIdByName[str_func];
            if (res != undefined) {
                return {
                    errorType: YAPI_SUCCESS,
                    errorMsg: 'no error',
                    result: String(res)
                };
            }

            // fallback to assuming that str_func is a logicalname or serial number of a module
            // with an implicit function name (like serial.module for instance)
            dotpos = str_func.length;
            str_func += '.' + this._className.substr(0, 1).toLowerCase() + this._className.substr(1);
        }

        // Second case: str_func is in the form: device_id.function_id

        // quick lookup for a known pure hardware id
        if (this._valueByHwId[str_func] != undefined) {
            return {
                errorType: YAPI_SUCCESS,
                errorMsg: 'no error',
                result: String(str_func)
            };
        }
        let serial: string = '';
        let funcid: string;
        if (dotpos > 0) {
            // either the device id is a logical name, or the function is unknown
            let devid = str_func.substr(0, dotpos);
            funcid = str_func.substr(dotpos + 1);
            let dev = this._yapi.imm_getDevice(devid);
            if (!dev) {
                return {
                    errorType: YAPI_DEVICE_NOT_FOUND,
                    errorMsg: 'Device [' + devid + '] not online',
                    result: ''
                };
            }
            serial = dev.imm_getSerialNumber();
            res = serial + '.' + funcid;
            if (this._valueByHwId[res] != undefined) {
                return {
                    errorType: YAPI_SUCCESS,
                    errorMsg: 'no error',
                    result: String(res)
                };
            }

            // not found neither, may be funcid is a function logicalname
            let i, nfun = dev.imm_functionCount();
            for (i = 0; i < nfun; i++) {
                res = serial + '.' + dev.imm_functionId(i);
                let name = this._nameByHwId[res];
                if (name != undefined && name == funcid) {
                    return {
                        errorType: YAPI_SUCCESS,
                        errorMsg: 'no error',
                        result: String(res)
                    };
                }
            }
        } else {
            funcid = str_func.substr(1);
            for (let hwid_str in this._connectedFns) {
                let pos = hwid_str.indexOf('.');
                let str_function = hwid_str.substr(pos + 1);
                if (str_function == funcid) {
                    return {
                        errorType: YAPI_SUCCESS,
                        errorMsg: 'no error',
                        result: String(hwid_str)
                    };
                }
            }
        }
        return {
            errorType: YAPI_DEVICE_NOT_FOUND,
            errorMsg: 'No function [' + funcid + '] found on device [' + serial + ']',
            result: ''
        };
    }

    /** Find the friendly name (use logical name if available) of the specified function, if currently connected
     * If device is not known as connected, return a clean error
     * This function will not cause any network access
     *
     * @param {string} str_func
     * @return {object}
     */
    imm_getFriendlyName(str_func: string): YConditionalResult
    {
        let resolved = this.imm_resolve(str_func);
        let name: string;
        if (resolved.errorType != YAPI_SUCCESS) {
            return resolved;
        }
        let hwId = <string>resolved.result;
        if (this._className == 'Module') {
            let friend = hwId;
            name = this._nameByHwId[friend];
            if (name != undefined && name != '') {
                friend = this._nameByHwId[friend];
            }
            return {
                errorType: YAPI_SUCCESS,
                errorMsg: 'no error',
                result: String(friend)
            };
        } else {
            let pos = hwId.indexOf('.');
            let str_serialMod = hwId.substr(0, pos);
            let str_friendModFull = <string>this._yapi.imm_getFriendlyNameFunction('Module', str_serialMod).result;
            let int_friendModDot = str_friendModFull.indexOf('.');
            let str_friendMod = (int_friendModDot > 0 ? str_friendModFull.substr(0, int_friendModDot) : str_friendModFull);
            let str_friendFunc = hwId.substr(pos + 1);
            name = this._nameByHwId[hwId];
            if (name != undefined && name != '') {
                str_friendFunc = name;
            }
            return {
                errorType: YAPI_SUCCESS,
                errorMsg: 'no error',
                result: String(str_friendMod + '.' + str_friendFunc)
            };
        }
    }

    /** Associates a given function object to a function id
     *
     * @param {string} str_func
     * @param {YFunction} obj_func
     */
    imm_setFunction(str_func: string, obj_func: YFunction): void
    {
        let funres = this.imm_resolve(str_func);
        if (funres.result) {
            // the function has been located on a device
            this._connectedFns[funres.result] = obj_func;
        } else {
            // the function is still abstract
            this._requestedFns[str_func] = obj_func;
        }
    }

    /** Retrieve a function object by hardware id, updating the indexes on the fly if needed
     *
     * @param {string} str_func
     * @return {YFunction}
     */
    imm_getFunction(str_func: string): YFunction
    {
        let funres = this.imm_resolve(str_func);
        if (funres.errorType == YAPI_SUCCESS) {
            // the function has been located on a device
            let conn_fn = this._connectedFns[<string>funres.result];
            if (conn_fn != undefined) {
                return conn_fn;
            }
            let req_fn = this._requestedFns[str_func];
            if (req_fn != undefined) {
                this._connectedFns[<string>funres.result] = req_fn;
                delete this._requestedFns[str_func];
            }
            return req_fn;
        } else {
            // the function is still abstract
            return this._requestedFns[str_func];
        }
    }

    /** Stores a function advertised value by hardware id, and tell if an event should be queued for it
     *
     * @param {string} str_hwid
     * @param {string} str_pubval
     * @return {boolean}
     */
    imm_setFunctionValue(str_hwid: string, str_pubval: string): boolean
    {
        let currval = this._valueByHwId[str_hwid];
        if (!(currval == undefined) && currval == str_pubval) {
            return false;
        }
        this._valueByHwId[str_hwid] = str_pubval;
        return true;
    }

    /** Retrieve a function advertised value by hardware id
     *
     * @param {string} str_hwid
     * @return {string}
     */
    imm_getFunctionValue(str_hwid: string): string
    {
        return this._valueByHwId[str_hwid];
    }

    /** Return the basetype of this function class
     *
     * @return {number}
     */
    imm_getBaseType(): number
    {
        return this._baseType;
    }

    /** Test if function type is compatible with basetype
     *
     * @return {boolean}
     */
    imm_matchBaseType(baseclass: number): boolean
    {
        return baseclass == YOCTO_BASETYPE_FUNCTION || baseclass == this._baseType;
    }

    /** Find the hardwareId of the first instance of a given function class
     *
     * @return {string|null}
     */
    imm_getFirstHardwareId(): string | null
    {
        let res = null;
        //noinspection LoopStatementThatDoesntLoopJS
        for (res in this._valueByHwId) {
            break;
        }
        return res;
    }

    /** Find the hardwareId for the next instance of a given function class
     *
     * @param {string} str_hwid
     * @return {string|null}
     */
    imm_getNextHardwareId(str_hwid: string): string | null
    {
        for (let iter_hwid in this._valueByHwId) {
            if (str_hwid == '!') {
                return iter_hwid;
            }
            if (str_hwid == iter_hwid) {
                str_hwid = '!';
            }
        }
        return null; // no more instance found
    }
}

export interface YDownloadProgressCallback {(curr: number, total: number): void}

export class YHTTPBody
{
    fname: string;
    data: Uint8Array;
    progressCb: YDownloadProgressCallback | null;

    /** Object storing a file to upload
     *
     * @param str_fname {string}
     * @param bin_data {Uint8Array}
     * @param fun_progressCb {YDownloadProgressCallback}
     */
    constructor(str_fname: string, bin_data: Uint8Array, fun_progressCb: YDownloadProgressCallback | null)
    {
        this.fname = str_fname;
        this.data = bin_data;
        this.progressCb = fun_progressCb;
    }
}

export class YHTTPRequest
{
    devUrl: string | null = null;
    errorType: number;
    errorMsg: string;
    bin_result: Uint8Array | null;
    obj_result: any = null;
    asyncId: number = 0;
    acceptor: Function | null = null;
    toBeSent: Uint8Array | null = null;
    sendPos: number = 0;
    progressCb: YDownloadProgressCallback | null = null;
    timeoutId: any = null;      /* actually a number | NodeJS.Timeout */
    sendTimeoutId: any = null;  /* actually a number | NodeJS.Timeout */
    next: YHTTPRequest | null = null;
    _creat: string = '';
    _sent: string = '';

    /** Object storing the result of any HTTP Query, with status code and error message
     *
     * @param bin_res {Uint8Array}
     * @param int_errType {number}
     * @param str_errMsg {string}
     */
    constructor(bin_res: Uint8Array | null, int_errType: number = YAPI_SUCCESS, str_errMsg: string = 'no error')
    {
        this.bin_result = bin_res;
        this.errorType = int_errType;
        this.errorMsg = str_errMsg;
    }
}

interface _YY_DeviceCache
{
    _expiration: number,
    _json: Uint8Array,
    _precooked: object
    [funcAttr: string]: object | number | string;
}

interface _YY_FuncCache
{
    _expiration: number;
    [funcAttr: string]: object | number | string;
}

interface _YY_FuncReq extends _YY_FuncCache
{
    device: YDevice;
    deviceid: string;
    functionid: string;
    hwid: string;
}

class YFuncRequest
{
    obj_result: _YY_FuncReq | null;
    errorType: number;
    errorMsg: string;

    /* Object storing the result of a function request, with status code and error message */
    constructor(obj_res: _YY_FuncReq | null, int_errType: number = YAPI_SUCCESS, str_errMsg: string = 'no error')
    {
        this.errorType = int_errType;
        this.errorMsg = str_errMsg;
        this.obj_result = obj_res;
    }
}

interface _YY_Module
{
    serialNumber: string;
    logicalName: string;
    productName: string;
    productId: number;
    firmwareRelease: string;
    beacon: number;
}

interface _YY_WhitePage
{
    serialNumber: string,
    logicalName: string,
    productName: string,
    productId: number,
    networkUrl: string,
    beacon: number,
    index: number
}

interface _YY_YellowPage
{
    baseType: number,
    hardwareId: string,
    logicalName: string,
    advertisedValue: string,
    index: number
}

interface _YY_YellowPages
{
    [classname: string]: _YY_YellowPage[];
}

interface _YY_Services
{
    whitePages: _YY_WhitePage[],
    yellowPages: _YY_YellowPages
}

interface _YY_HubApi
{
    module: _YY_Module,
    services: _YY_Services
}

interface _YY_LoggerApi
{
    id: string;
    calib: string;
    unit: string;
    cal: string;
    bulk?: string;
    streams: string[];
}

//--- (generated code: YDataStream definitions)
//--- (end of generated code: YDataStream definitions)

//--- (generated code: YDataStream class start)
/**
 * YDataStream Class: Unformatted data sequence
 *
 * DataStream objects represent bare recorded measure sequences,
 * exactly as found within the data logger present on Yoctopuce
 * sensors.
 *
 * In most cases, it is not necessary to use DataStream objects
 * directly, as the DataSet objects (returned by the
 * get_recordedData() method from sensors and the
 * get_dataSets() method from the data logger) provide
 * a more convenient interface.
 */
//--- (end of generated code: YDataStream class start)
export class YDataStream
{
    static DATA_INVALID: number = YAPI_INVALID_DOUBLE;
    static DURATION_INVALID: number = YAPI_INVALID_DOUBLE;
    DATA_INVALID: number;
    DURATION_INVALID: number;

    _yapi: YAPIContext;
    imm_calhdl: Function | null;
    //--- (generated code: YDataStream attributes declaration)
    _parent: YFunction;
    _runNo: number = 0;
    _utcStamp: number = 0;
    _nCols: number = 0;
    _nRows: number = 0;
    _startTime: number = 0;
    _duration: number = 0;
    _dataSamplesInterval: number = 0;
    _firstMeasureDuration: number = 0;
    _columnNames: string[] = [];
    _functionId: string = '';
    _isClosed: boolean = false;
    _isAvg: boolean = false;
    _minVal: number = 0;
    _avgVal: number = 0;
    _maxVal: number = 0;
    _caltyp: number = 0;
    _calpar: number[] = [];
    _calraw: number[] = [];
    _calref: number[] = [];
    _values: number[][] = [];
    _isLoaded: boolean = false;

    // API symbols as static members
    //--- (end of generated code: YDataStream attributes declaration)

    constructor(obj_parent: YFunction, obj_dataset: YDataSet, encoded: number[])
    {
        //--- (generated code: YDataStream constructor)
        //--- (end of generated code: YDataStream constructor)

        this.DATA_INVALID = YAPI_INVALID_DOUBLE;
        this.DURATION_INVALID = YAPI_INVALID_DOUBLE;

        this._parent = obj_parent;
        this._yapi = this._parent._yapi;
        this.imm_calhdl = null;
        if (typeof obj_dataset != 'undefined') {
            this.imm_initFromDataSet(obj_dataset, encoded);
        }
    }

    //--- (generated code: YDataStream implementation)

    imm_initFromDataSet(dataset: YDataSet, encoded: number[]): number
    {
        let val: number;
        let i: number;
        let maxpos: number;
        let ms_offset: number;
        let samplesPerHour: number;
        let fRaw: number;
        let fRef: number;
        let iCalib: number[] = [];
        // decode sequence header to extract data
        this._runNo = encoded[0] + (((encoded[1]) << (16)));
        this._utcStamp = encoded[2] + (((encoded[3]) << (16)));
        val = encoded[4];
        this._isAvg = (((val) & (0x100)) == 0);
        samplesPerHour = ((val) & (0xff));
        if (((val) & (0x100)) != 0) {
            samplesPerHour = samplesPerHour * 3600;
        } else {
            if (((val) & (0x200)) != 0) {
                samplesPerHour = samplesPerHour * 60;
            }
        }
        this._dataSamplesInterval = 3600.0 / samplesPerHour;
        ms_offset = encoded[6];
        if (ms_offset < 1000) {
            // new encoding -> add the ms to the UTC timestamp
            this._startTime = this._utcStamp + (ms_offset / 1000.0);
        } else {
            // legacy encoding subtract the measure interval form the UTC timestamp
            this._startTime = this._utcStamp - this._dataSamplesInterval;
        }
        this._firstMeasureDuration = encoded[5];
        if (!(this._isAvg)) {
            this._firstMeasureDuration = this._firstMeasureDuration / 1000.0;
        }
        val = encoded[7];
        this._isClosed = (val != 0xffff);
        if (val == 0xffff) {
            val = 0;
        }
        this._nRows = val;
        if (this._nRows > 0) {
            if (this._firstMeasureDuration > 0) {
                this._duration = this._firstMeasureDuration + (this._nRows - 1) * this._dataSamplesInterval;
            } else {
                this._duration = this._nRows * this._dataSamplesInterval;
            }
        } else {
            this._duration = 0;
        }
        // precompute decoding parameters
        iCalib = dataset.imm_get_calibration();
        this._caltyp = iCalib[0];
        if (this._caltyp != 0) {
            this.imm_calhdl = this._yapi.imm_getCalibrationHandler(this._caltyp);
            maxpos = iCalib.length;
            this._calpar.length = 0;
            this._calraw.length = 0;
            this._calref.length = 0;
            i = 1;
            while (i < maxpos) {
                this._calpar.push(iCalib[i]);
                i = i + 1;
            }
            i = 1;
            while (i + 1 < maxpos) {
                fRaw = iCalib[i];
                fRaw = fRaw / 1000.0;
                fRef = iCalib[i + 1];
                fRef = fRef / 1000.0;
                this._calraw.push(fRaw);
                this._calref.push(fRef);
                i = i + 2;
            }
        }
        // preload column names for backward-compatibility
        this._functionId = dataset.imm_get_functionId();
        if (this._isAvg) {
            this._columnNames.length = 0;
            this._columnNames.push(this._functionId + '_min');
            this._columnNames.push(this._functionId + '_avg');
            this._columnNames.push(this._functionId + '_max');
            this._nCols = 3;
        } else {
            this._columnNames.length = 0;
            this._columnNames.push(this._functionId);
            this._nCols = 1;
        }
        // decode min/avg/max values for the sequence
        if (this._nRows > 0) {
            this._avgVal = this.imm_decodeAvg(encoded[8] + (((((encoded[9]) ^ (0x8000))) << (16))), 1);
            this._minVal = this.imm_decodeVal(encoded[10] + (((encoded[11]) << (16))));
            this._maxVal = this.imm_decodeVal(encoded[12] + (((encoded[13]) << (16))));
        }
        return 0;
    }

    imm_parseStream(sdata: Uint8Array): number
    {
        let idx: number;
        let udat: number[] = [];
        let dat: number[] = [];
        if (this._isLoaded && !(this._isClosed)) {
            return YAPI_SUCCESS;
        }
        if ((sdata).length == 0) {
            this._nRows = 0;
            return YAPI_SUCCESS;
        }

        udat = this._yapi.imm_decodeWords(this._parent.imm_json_get_string(sdata));
        this._values.length = 0;
        idx = 0;
        if (this._isAvg) {
            while (idx + 3 < udat.length) {
                dat.length = 0;
                if ((udat[idx] == 65535) && (udat[idx + 1] == 65535)) {
                    dat.push(NaN);
                    dat.push(NaN);
                    dat.push(NaN);
                } else {
                    dat.push(this.imm_decodeVal(udat[idx + 2] + (((udat[idx + 3]) << (16)))));
                    dat.push(this.imm_decodeAvg(udat[idx] + (((((udat[idx + 1]) ^ (0x8000))) << (16))), 1));
                    dat.push(this.imm_decodeVal(udat[idx + 4] + (((udat[idx + 5]) << (16)))));
                }
                idx = idx + 6;
                this._values.push(dat.slice());
            }
        } else {
            while (idx + 1 < udat.length) {
                dat.length = 0;
                if ((udat[idx] == 65535) && (udat[idx + 1] == 65535)) {
                    dat.push(NaN);
                } else {
                    dat.push(this.imm_decodeAvg(udat[idx] + (((((udat[idx + 1]) ^ (0x8000))) << (16))), 1));
                }
                this._values.push(dat.slice());
                idx = idx + 2;
            }
        }

        this._nRows = this._values.length;
        this._isLoaded = true;
        return YAPI_SUCCESS;
    }

    imm_wasLoaded(): boolean
    {
        return this._isLoaded;
    }

    imm_get_url(): string
    {
        let url: string;
        url = 'logger.json?id=' + this._functionId + '&run=' + String(Math.round(this._runNo)) + '&utc=' + String(Math.round(this._utcStamp));
        return url;
    }

    imm_get_baseurl(): string
    {
        let url: string;
        url = 'logger.json?id=' + this._functionId + '&run=' + String(Math.round(this._runNo)) + '&utc=';
        return url;
    }

    imm_get_urlsuffix(): string
    {
        let url: string;
        url = String(Math.round(this._utcStamp));
        return url;
    }

    async loadStream(): Promise<number>
    {
        return this.imm_parseStream(await this._parent._download(this.imm_get_url()));
    }

    imm_decodeVal(w: number): number
    {
        let val: number;
        val = w;
        val = val / 1000.0;
        if (this._caltyp != 0) {
            if (this.imm_calhdl != null) {
                val = this.imm_calhdl(val, this._caltyp, this._calpar, this._calraw, this._calref);
            }
        }
        return val;
    }

    imm_decodeAvg(dw: number, count: number): number
    {
        let val: number;
        val = dw;
        val = val / 1000.0;
        if (this._caltyp != 0) {
            if (this.imm_calhdl != null) {
                val = this.imm_calhdl(val, this._caltyp, this._calpar, this._calraw, this._calref);
            }
        }
        return val;
    }

    async isClosed(): Promise<boolean>
    {
        return this._isClosed;
    }

    /**
     * Returns the run index of the data stream. A run can be made of
     * multiple datastreams, for different time intervals.
     *
     * @return an unsigned number corresponding to the run index.
     */
    async get_runIndex(): Promise<number>
    {
        return this._runNo;
    }

    /**
     * Returns the relative start time of the data stream, measured in seconds.
     * For recent firmwares, the value is relative to the present time,
     * which means the value is always negative.
     * If the device uses a firmware older than version 13000, value is
     * relative to the start of the time the device was powered on, and
     * is always positive.
     * If you need an absolute UTC timestamp, use get_realStartTimeUTC().
     *
     * <b>DEPRECATED</b>: This method has been replaced by get_realStartTimeUTC().
     *
     * @return an unsigned number corresponding to the number of seconds
     *         between the start of the run and the beginning of this data
     *         stream.
     */
    async get_startTime(): Promise<number>
    {
        return this._utcStamp - ((Date.now() / 1000) >> 0);
    }

    /**
     * Returns the start time of the data stream, relative to the Jan 1, 1970.
     * If the UTC time was not set in the datalogger at the time of the recording
     * of this data stream, this method returns 0.
     *
     * <b>DEPRECATED</b>: This method has been replaced by get_realStartTimeUTC().
     *
     * @return an unsigned number corresponding to the number of seconds
     *         between the Jan 1, 1970 and the beginning of this data
     *         stream (i.e. Unix time representation of the absolute time).
     */
    async get_startTimeUTC(): Promise<number>
    {
        return <number> Math.round(this._startTime);
    }

    /**
     * Returns the start time of the data stream, relative to the Jan 1, 1970.
     * If the UTC time was not set in the datalogger at the time of the recording
     * of this data stream, this method returns 0.
     *
     * @return a floating-point number  corresponding to the number of seconds
     *         between the Jan 1, 1970 and the beginning of this data
     *         stream (i.e. Unix time representation of the absolute time).
     */
    async get_realStartTimeUTC(): Promise<number>
    {
        return this._startTime;
    }

    /**
     * Returns the number of milliseconds between two consecutive
     * rows of this data stream. By default, the data logger records one row
     * per second, but the recording frequency can be changed for
     * each device function
     *
     * @return an unsigned number corresponding to a number of milliseconds.
     */
    async get_dataSamplesIntervalMs(): Promise<number>
    {
        return <number> Math.round(this._dataSamplesInterval*1000);
    }

    async get_dataSamplesInterval(): Promise<number>
    {
        return this._dataSamplesInterval;
    }

    async get_firstDataSamplesInterval(): Promise<number>
    {
        return this._firstMeasureDuration;
    }

    /**
     * Returns the number of data rows present in this stream.
     *
     * If the device uses a firmware older than version 13000,
     * this method fetches the whole data stream from the device
     * if not yet done, which can cause a little delay.
     *
     * @return an unsigned number corresponding to the number of rows.
     *
     * On failure, throws an exception or returns zero.
     */
    async get_rowCount(): Promise<number>
    {
        if ((this._nRows != 0) && this._isClosed) {
            return this._nRows;
        }
        await this.loadStream();
        return this._nRows;
    }

    /**
     * Returns the number of data columns present in this stream.
     * The meaning of the values present in each column can be obtained
     * using the method get_columnNames().
     *
     * If the device uses a firmware older than version 13000,
     * this method fetches the whole data stream from the device
     * if not yet done, which can cause a little delay.
     *
     * @return an unsigned number corresponding to the number of columns.
     *
     * On failure, throws an exception or returns zero.
     */
    async get_columnCount(): Promise<number>
    {
        if (this._nCols != 0) {
            return this._nCols;
        }
        await this.loadStream();
        return this._nCols;
    }

    /**
     * Returns the title (or meaning) of each data column present in this stream.
     * In most case, the title of the data column is the hardware identifier
     * of the sensor that produced the data. For streams recorded at a lower
     * recording rate, the dataLogger stores the min, average and max value
     * during each measure interval into three columns with suffixes _min,
     * _avg and _max respectively.
     *
     * If the device uses a firmware older than version 13000,
     * this method fetches the whole data stream from the device
     * if not yet done, which can cause a little delay.
     *
     * @return a list containing as many strings as there are columns in the
     *         data stream.
     *
     * On failure, throws an exception or returns an empty array.
     */
    async get_columnNames(): Promise<string[]>
    {
        if (this._columnNames.length != 0) {
            return this._columnNames;
        }
        await this.loadStream();
        return this._columnNames;
    }

    /**
     * Returns the smallest measure observed within this stream.
     * If the device uses a firmware older than version 13000,
     * this method will always return YDataStream.DATA_INVALID.
     *
     * @return a floating-point number corresponding to the smallest value,
     *         or YDataStream.DATA_INVALID if the stream is not yet complete (still recording).
     *
     * On failure, throws an exception or returns YDataStream.DATA_INVALID.
     */
    async get_minValue(): Promise<number>
    {
        return this._minVal;
    }

    /**
     * Returns the average of all measures observed within this stream.
     * If the device uses a firmware older than version 13000,
     * this method will always return YDataStream.DATA_INVALID.
     *
     * @return a floating-point number corresponding to the average value,
     *         or YDataStream.DATA_INVALID if the stream is not yet complete (still recording).
     *
     * On failure, throws an exception or returns YDataStream.DATA_INVALID.
     */
    async get_averageValue(): Promise<number>
    {
        return this._avgVal;
    }

    /**
     * Returns the largest measure observed within this stream.
     * If the device uses a firmware older than version 13000,
     * this method will always return YDataStream.DATA_INVALID.
     *
     * @return a floating-point number corresponding to the largest value,
     *         or YDataStream.DATA_INVALID if the stream is not yet complete (still recording).
     *
     * On failure, throws an exception or returns YDataStream.DATA_INVALID.
     */
    async get_maxValue(): Promise<number>
    {
        return this._maxVal;
    }

    async get_realDuration(): Promise<number>
    {
        if (this._isClosed) {
            return this._duration;
        }
        return <number> ((Date.now() / 1000) >> 0) - this._utcStamp;
    }

    /**
     * Returns the whole data set contained in the stream, as a bidimensional
     * table of numbers.
     * The meaning of the values present in each column can be obtained
     * using the method get_columnNames().
     *
     * This method fetches the whole data stream from the device,
     * if not yet done.
     *
     * @return a list containing as many elements as there are rows in the
     *         data stream. Each row itself is a list of floating-point
     *         numbers.
     *
     * On failure, throws an exception or returns an empty array.
     */
    async get_dataRows(): Promise<number[][]>
    {
        if ((this._values.length == 0) || !(this._isClosed)) {
            await this.loadStream();
        }
        return this._values;
    }

    /**
     * Returns a single measure from the data stream, specified by its
     * row and column index.
     * The meaning of the values present in each column can be obtained
     * using the method get_columnNames().
     *
     * This method fetches the whole data stream from the device,
     * if not yet done.
     *
     * @param row : row index
     * @param col : column index
     *
     * @return a floating-point number
     *
     * On failure, throws an exception or returns YDataStream.DATA_INVALID.
     */
    async get_data(row: number, col: number): Promise<number>
    {
        if ((this._values.length == 0) || !(this._isClosed)) {
            await this.loadStream();
        }
        if (row >= this._values.length) {
            return YDataStream.DATA_INVALID;
        }
        if (col >= this._values[row].length) {
            return YDataStream.DATA_INVALID;
        }
        return this._values[row][col];
    }

    //--- (end of generated code: YDataStream implementation)
}

//--- (generated code: YDataSet definitions)
//--- (end of generated code: YDataSet definitions)

//--- (generated code: YDataSet class start)
/**
 * YDataSet Class: Recorded data sequence, as returned by sensor.get_recordedData()
 *
 * YDataSet objects make it possible to retrieve a set of recorded measures
 * for a given sensor and a specified time interval. They can be used
 * to load data points with a progress report. When the YDataSet object is
 * instantiated by the sensor.get_recordedData()  function, no data is
 * yet loaded from the module. It is only when the loadMore()
 * method is called over and over than data will be effectively loaded
 * from the dataLogger.
 *
 * A preview of available measures is available using the function
 * get_preview() as soon as loadMore() has been called
 * once. Measures themselves are available using function get_measures()
 * when loaded by subsequent calls to loadMore().
 *
 * This class can only be used on devices that use a relatively recent firmware,
 * as YDataSet objects are not supported by firmwares older than version 13000.
 */
//--- (end of generated code: YDataSet class start)
export class YDataSet
{
    static DATA_INVALID: number = YAPI_INVALID_DOUBLE;
    static DURATION_INVALID: number = YAPI_INVALID_DOUBLE;
    static HARDWAREID_INVALID: string = YAPI_INVALID_STRING;
    static FUNCTIONID_INVALID: string = YAPI_INVALID_STRING;
    static UNIT_INVALID: string = YAPI_INVALID_STRING;
    DATA_INVALID: number;
    DURATION_INVALID: number;
    HARDWAREID_INVALID: string;
    FUNCTIONID_INVALID: string;
    UNIT_INVALID: string;

    _yapi: YAPIContext;
    //--- (generated code: YDataSet attributes declaration)
    _parent: YFunction;
    _hardwareId: string = '';
    _functionId: string = '';
    _unit: string = '';
    _bulkLoad: number = 0;
    _startTimeMs: number = 0;
    _endTimeMs: number = 0;
    _progress: number = 0;
    _calib: number[] = [];
    _streams: YDataStream[] = [];
    _summary: YMeasure;
    _preview: YMeasure[] = [];
    _measures: YMeasure[] = [];
    _summaryMinVal: number = 0;
    _summaryMaxVal: number = 0;
    _summaryTotalAvg: number = 0;
    _summaryTotalTime: number = 0;

    // API symbols as static members
    //--- (end of generated code: YDataSet attributes declaration)

    constructor(obj_parent: YFunction, str_functionId: string = '', str_unit: string = '', double_startTime: number = 0, double_endTime: number = 0)
    {
        //--- (generated code: YDataSet constructor)
        //--- (end of generated code: YDataSet constructor)

        this.DATA_INVALID = YAPI_INVALID_DOUBLE;
        this.DURATION_INVALID = YAPI_INVALID_DOUBLE;
        this.HARDWAREID_INVALID = YAPI_INVALID_STRING;
        this.FUNCTIONID_INVALID = YAPI_INVALID_STRING;
        this.UNIT_INVALID = YAPI_INVALID_STRING;

        // init _summary with dummy value
        this._summary = new YMeasure(0, 0, 0, 0, 0);
        if (str_functionId == '') {
            // 1st version of constructor, called from YDataLogger
            /** @member {YFunction} **/
            this._parent = obj_parent;
            /** @member {YAPIContext} **/
            this._yapi = obj_parent._yapi;
            this._startTimeMs = 0;
            this._endTimeMs = 0;
            // caller must call method async parse() just afterwards
        } else {
            // 2nd version of constructor, called from YFunction
            /** @member {YFunction} **/
            this._parent = obj_parent;
            /** @member {YAPIContext} **/
            this._yapi = obj_parent._yapi;
            this._functionId = str_functionId;
            this._unit = str_unit;
            this._startTimeMs = double_startTime * 1000;
            this._endTimeMs = double_endTime * 1000;
            this._progress = -1;
        }
    }

    imm_get_functionId(): string
    {
        return this._functionId;
    }

    //--- (generated code: YDataSet implementation)

    imm_get_calibration(): number[]
    {
        return this._calib;
    }

    async loadSummary(data: Uint8Array): Promise<number>
    {
        let dataRows: number[][] = [];
        let tim: number;
        let mitv: number;
        let itv: number;
        let fitv: number;
        let end_: number;
        let nCols: number;
        let minCol: number;
        let avgCol: number;
        let maxCol: number;
        let res: number;
        let m_pos: number;
        let previewTotalTime: number;
        let previewTotalAvg: number;
        let previewMinVal: number;
        let previewMaxVal: number;
        let previewAvgVal: number;
        let previewStartMs: number;
        let previewStopMs: number;
        let previewDuration: number;
        let streamStartTimeMs: number;
        let streamDuration: number;
        let streamEndTimeMs: number;
        let minVal: number;
        let avgVal: number;
        let maxVal: number;
        let summaryStartMs: number;
        let summaryStopMs: number;
        let summaryTotalTime: number;
        let summaryTotalAvg: number;
        let summaryMinVal: number;
        let summaryMaxVal: number;
        let url: string;
        let strdata: string;
        let measure_data: number[] = [];

        if (this._progress < 0) {
            strdata = this._yapi.imm_bin2str(data);
            if (strdata == '{}') {
                this._parent._throw(YAPI_VERSION_MISMATCH, 'device firmware is too old');
                return YAPI_VERSION_MISMATCH;
            }
            res = await this._parse(strdata);
            if (res < 0) {
                return res;
            }
        }
        summaryTotalTime = 0;
        summaryTotalAvg = 0;
        summaryMinVal = YAPI_MAX_DOUBLE;
        summaryMaxVal = YAPI_MIN_DOUBLE;
        summaryStartMs = YAPI_MAX_DOUBLE;
        summaryStopMs = YAPI_MIN_DOUBLE;

        // Parse complete streams
        for (let ii in this._streams) {
            streamStartTimeMs = Math.round(await this._streams[ii].get_realStartTimeUTC() * 1000);
            streamDuration = await this._streams[ii].get_realDuration();
            streamEndTimeMs = streamStartTimeMs + Math.round(streamDuration * 1000);
            if ((streamStartTimeMs >= this._startTimeMs) && ((this._endTimeMs == 0) || (streamEndTimeMs <= this._endTimeMs))) {
                // stream that are completely inside the dataset
                previewMinVal = await this._streams[ii].get_minValue();
                previewAvgVal = await this._streams[ii].get_averageValue();
                previewMaxVal = await this._streams[ii].get_maxValue();
                previewStartMs = streamStartTimeMs;
                previewStopMs = streamEndTimeMs;
                previewDuration = streamDuration;
            } else {
                // stream that are partially in the dataset
                // we need to parse data to filter value outside the dataset
                if (!(this._streams[ii].imm_wasLoaded())) {
                    url = this._streams[ii].imm_get_url();
                    data = await this._parent._download(url);
                    this._streams[ii].imm_parseStream(data);
                }
                dataRows = await this._streams[ii].get_dataRows();
                if (dataRows.length == 0) {
                    return await this.get_progress();
                }
                tim = streamStartTimeMs;
                fitv = Math.round(await this._streams[ii].get_firstDataSamplesInterval() * 1000);
                itv = Math.round(await this._streams[ii].get_dataSamplesInterval() * 1000);
                nCols = dataRows[0].length;
                minCol = 0;
                if (nCols > 2) {
                    avgCol = 1;
                } else {
                    avgCol = 0;
                }
                if (nCols > 2) {
                    maxCol = 2;
                } else {
                    maxCol = 0;
                }
                previewTotalTime = 0;
                previewTotalAvg = 0;
                previewStartMs = streamEndTimeMs;
                previewStopMs = streamStartTimeMs;
                previewMinVal = YAPI_MAX_DOUBLE;
                previewMaxVal = YAPI_MIN_DOUBLE;
                m_pos = 0;
                while (m_pos < dataRows.length) {
                    measure_data = dataRows[m_pos];
                    if (m_pos == 0) {
                        mitv = fitv;
                    } else {
                        mitv = itv;
                    }
                    end_ = tim + mitv;
                    if ((end_ > this._startTimeMs) && ((this._endTimeMs == 0) || (tim < this._endTimeMs))) {
                        minVal = measure_data[minCol];
                        avgVal = measure_data[avgCol];
                        maxVal = measure_data[maxCol];
                        if (previewStartMs > tim) {
                            previewStartMs = tim;
                        }
                        if (previewStopMs < end_) {
                            previewStopMs = end_;
                        }
                        if (previewMinVal > minVal) {
                            previewMinVal = minVal;
                        }
                        if (previewMaxVal < maxVal) {
                            previewMaxVal = maxVal;
                        }
                        if (!(isNaN(avgVal))) {
                            previewTotalAvg = previewTotalAvg + (avgVal * mitv);
                            previewTotalTime = previewTotalTime + mitv;
                        }
                    }
                    tim = end_;
                    m_pos = m_pos + 1;
                }
                if (previewTotalTime > 0) {
                    previewAvgVal = previewTotalAvg / previewTotalTime;
                    previewDuration = (previewStopMs - previewStartMs) / 1000.0;
                } else {
                    previewAvgVal = 0.0;
                    previewDuration = 0.0;
                }
            }
            this._preview.push(new YMeasure(previewStartMs / 1000.0, previewStopMs / 1000.0, previewMinVal, previewAvgVal, previewMaxVal));
            if (summaryMinVal > previewMinVal) {
                summaryMinVal = previewMinVal;
            }
            if (summaryMaxVal < previewMaxVal) {
                summaryMaxVal = previewMaxVal;
            }
            if (summaryStartMs > previewStartMs) {
                summaryStartMs = previewStartMs;
            }
            if (summaryStopMs < previewStopMs) {
                summaryStopMs = previewStopMs;
            }
            summaryTotalAvg = summaryTotalAvg + (previewAvgVal * previewDuration);
            summaryTotalTime = summaryTotalTime + previewDuration;
        }
        if ((this._startTimeMs == 0) || (this._startTimeMs > summaryStartMs)) {
            this._startTimeMs = summaryStartMs;
        }
        if ((this._endTimeMs == 0) || (this._endTimeMs < summaryStopMs)) {
            this._endTimeMs = summaryStopMs;
        }
        if (summaryTotalTime > 0) {
            this._summary = new YMeasure(summaryStartMs / 1000.0, summaryStopMs / 1000.0, summaryMinVal, summaryTotalAvg / summaryTotalTime, summaryMaxVal);
        } else {
            this._summary = new YMeasure(0.0, 0.0, YAPI_INVALID_DOUBLE, YAPI_INVALID_DOUBLE, YAPI_INVALID_DOUBLE);
        }
        return await this.get_progress();
    }

    async processMore(progress: number, data: Uint8Array): Promise<number>
    {
        let stream: YDataStream | null;
        let dataRows: number[][] = [];
        let tim: number;
        let itv: number;
        let fitv: number;
        let avgv: number;
        let end_: number;
        let nCols: number;
        let minCol: number;
        let avgCol: number;
        let maxCol: number;
        let firstMeasure: boolean;
        let baseurl: string;
        let url: string;
        let suffix: string;
        let suffixes: string[] = [];
        let idx: number;
        let bulkFile: Uint8Array;
        let streamStr: string[] = [];
        let urlIdx: number;
        let streamBin: Uint8Array;

        if (progress != this._progress) {
            return this._progress;
        }
        if (this._progress < 0) {
            return await this.loadSummary(data);
        }
        stream = this._streams[this._progress];
        if (!(stream.imm_wasLoaded())) {
            stream.imm_parseStream(data);
        }
        dataRows = await stream.get_dataRows();
        this._progress = this._progress + 1;
        if (dataRows.length == 0) {
            return await this.get_progress();
        }
        tim = Math.round(await stream.get_realStartTimeUTC() * 1000);
        fitv = Math.round(await stream.get_firstDataSamplesInterval() * 1000);
        itv = Math.round(await stream.get_dataSamplesInterval() * 1000);
        if (fitv == 0) {
            fitv = itv;
        }
        if (tim < itv) {
            tim = itv;
        }
        nCols = dataRows[0].length;
        minCol = 0;
        if (nCols > 2) {
            avgCol = 1;
        } else {
            avgCol = 0;
        }
        if (nCols > 2) {
            maxCol = 2;
        } else {
            maxCol = 0;
        }

        firstMeasure = true;
        for (let ii in dataRows) {
            if (firstMeasure) {
                end_ = tim + fitv;
                firstMeasure = false;
            } else {
                end_ = tim + itv;
            }
            avgv = dataRows[ii][avgCol];
            if ((end_ > this._startTimeMs) && ((this._endTimeMs == 0) || (tim < this._endTimeMs)) && !(isNaN(avgv))) {
                this._measures.push(new YMeasure(tim / 1000, end_ / 1000, dataRows[ii][minCol], avgv, dataRows[ii][maxCol]));
            }
            tim = end_;
        }
        // Perform bulk preload to speed-up network transfer
        if ((this._bulkLoad > 0) && (this._progress < this._streams.length)) {
            stream = this._streams[this._progress];
            if (stream.imm_wasLoaded()) {
                return await this.get_progress();
            }
            baseurl = stream.imm_get_baseurl();
            url = stream.imm_get_url();
            suffix = stream.imm_get_urlsuffix();
            suffixes.push(suffix);
            idx = this._progress + 1;
            while ((idx < this._streams.length) && (suffixes.length < this._bulkLoad)) {
                stream = this._streams[idx];
                if (!(stream.imm_wasLoaded()) && (stream.imm_get_baseurl() == baseurl)) {
                    suffix = stream.imm_get_urlsuffix();
                    suffixes.push(suffix);
                    url = url + ',' + suffix;
                }
                idx = idx + 1;
            }
            bulkFile = await this._parent._download(url);
            streamStr = this._parent.imm_json_get_array(bulkFile);
            urlIdx = 0;
            idx = this._progress;
            while ((idx < this._streams.length) && (urlIdx < suffixes.length) && (urlIdx < streamStr.length)) {
                stream = this._streams[idx];
                if ((stream.imm_get_baseurl() == baseurl) && (stream.imm_get_urlsuffix() == suffixes[urlIdx])) {
                    streamBin = this._yapi.imm_str2bin(streamStr[urlIdx]);
                    stream.imm_parseStream(streamBin);
                    urlIdx = urlIdx + 1;
                }
                idx = idx + 1;
            }
        }
        return await this.get_progress();
    }

    async get_privateDataStreams(): Promise<YDataStream[]>
    {
        return this._streams;
    }

    /**
     * Returns the unique hardware identifier of the function who performed the measures,
     * in the form SERIAL.FUNCTIONID. The unique hardware identifier is composed of the
     * device serial number and of the hardware identifier of the function
     * (for example THRMCPL1-123456.temperature1)
     *
     * @return a string that uniquely identifies the function (ex: THRMCPL1-123456.temperature1)
     *
     * On failure, throws an exception or returns  YDataSet.HARDWAREID_INVALID.
     */
    async get_hardwareId(): Promise<string>
    {
        let mo: YModule | null;
        if (!(this._hardwareId == '')) {
            return this._hardwareId;
        }
        mo = await this._parent.get_module();
        this._hardwareId = await mo.get_serialNumber() + '.' + await this.get_functionId();
        return this._hardwareId;
    }

    /**
     * Returns the hardware identifier of the function that performed the measure,
     * without reference to the module. For example temperature1.
     *
     * @return a string that identifies the function (ex: temperature1)
     */
    async get_functionId(): Promise<string>
    {
        return this._functionId;
    }

    /**
     * Returns the measuring unit for the measured value.
     *
     * @return a string that represents a physical unit.
     *
     * On failure, throws an exception or returns  YDataSet.UNIT_INVALID.
     */
    async get_unit(): Promise<string>
    {
        return this._unit;
    }

    /**
     * Returns the start time of the dataset, relative to the Jan 1, 1970.
     * When the YDataSet object is created, the start time is the value passed
     * in parameter to the get_dataSet() function. After the
     * very first call to loadMore(), the start time is updated
     * to reflect the timestamp of the first measure actually found in the
     * dataLogger within the specified range.
     *
     * <b>DEPRECATED</b>: This method has been replaced by get_summary()
     * which contain more precise informations.
     *
     * @return an unsigned number corresponding to the number of seconds
     *         between the Jan 1, 1970 and the beginning of this data
     *         set (i.e. Unix time representation of the absolute time).
     */
    async get_startTimeUTC(): Promise<number>
    {
        return this.imm_get_startTimeUTC();
    }

    imm_get_startTimeUTC(): number
    {
        return <number> (this._startTimeMs / 1000.0);
    }

    /**
     * Returns the end time of the dataset, relative to the Jan 1, 1970.
     * When the YDataSet object is created, the end time is the value passed
     * in parameter to the get_dataSet() function. After the
     * very first call to loadMore(), the end time is updated
     * to reflect the timestamp of the last measure actually found in the
     * dataLogger within the specified range.
     *
     * <b>DEPRECATED</b>: This method has been replaced by get_summary()
     * which contain more precise informations.
     *
     * @return an unsigned number corresponding to the number of seconds
     *         between the Jan 1, 1970 and the end of this data
     *         set (i.e. Unix time representation of the absolute time).
     */
    async get_endTimeUTC(): Promise<number>
    {
        return this.imm_get_endTimeUTC();
    }

    imm_get_endTimeUTC(): number
    {
        return <number> Math.round(this._endTimeMs / 1000.0);
    }

    /**
     * Returns the progress of the downloads of the measures from the data logger,
     * on a scale from 0 to 100. When the object is instantiated by get_dataSet,
     * the progress is zero. Each time loadMore() is invoked, the progress
     * is updated, to reach the value 100 only once all measures have been loaded.
     *
     * @return an integer in the range 0 to 100 (percentage of completion).
     */
    async get_progress(): Promise<number>
    {
        if (this._progress < 0) {
            return 0;
        }
        // index not yet loaded
        if (this._progress >= this._streams.length) {
            return 100;
        }
        return (((1 + (1 + this._progress) * 98 ) / ((1 + this._streams.length))) >> 0);
    }

    /**
     * Loads the next block of measures from the dataLogger, and updates
     * the progress indicator.
     *
     * @return an integer in the range 0 to 100 (percentage of completion),
     *         or a negative error code in case of failure.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async loadMore(): Promise<number>
    {
        let url: string;
        let stream: YDataStream | null;
        if (this._progress < 0) {
            url = 'logger.json?id=' + this._functionId;
            if (this._startTimeMs != 0) {
                url = url + '&from=' + String(Math.round(this.imm_get_startTimeUTC()));
            }
            if (this._endTimeMs != 0) {
                url = url + '&to=' + String(Math.round(this.imm_get_endTimeUTC() + 1));
            }
        } else {
            if (this._progress >= this._streams.length) {
                return 100;
            } else {
                stream = this._streams[this._progress];
                if (stream.imm_wasLoaded()) {
                    // Do not reload stream if it was already loaded
                    return await this.processMore(this._progress, this._yapi.imm_str2bin(''));
                }
                url = stream.imm_get_url();
            }
        }
        try {
            return await this.processMore(this._progress, await this._parent._download(url));
        } catch (e) {
            return await this.processMore(this._progress, await this._parent._download(url));
        }
    }

    /**
     * Returns an YMeasure object which summarizes the whole
     * YDataSet. In includes the following information:
     * - the start of a time interval
     * - the end of a time interval
     * - the minimal value observed during the time interval
     * - the average value observed during the time interval
     * - the maximal value observed during the time interval
     *
     * This summary is available as soon as loadMore() has
     * been called for the first time.
     *
     * @return an YMeasure object
     */
    async get_summary(): Promise<YMeasure>
    {
        return this._summary;
    }

    /**
     * Returns a condensed version of the measures that can
     * retrieved in this YDataSet, as a list of YMeasure
     * objects. Each item includes:
     * - the start of a time interval
     * - the end of a time interval
     * - the minimal value observed during the time interval
     * - the average value observed during the time interval
     * - the maximal value observed during the time interval
     *
     * This preview is available as soon as loadMore() has
     * been called for the first time.
     *
     * @return a table of records, where each record depicts the
     *         measured values during a time interval
     *
     * On failure, throws an exception or returns an empty array.
     */
    async get_preview(): Promise<YMeasure[]>
    {
        return this._preview;
    }

    /**
     * Returns the detailed set of measures for the time interval corresponding
     * to a given condensed measures previously returned by get_preview().
     * The result is provided as a list of YMeasure objects.
     *
     * @param measure : condensed measure from the list previously returned by
     *         get_preview().
     *
     * @return a table of records, where each record depicts the
     *         measured values during a time interval
     *
     * On failure, throws an exception or returns an empty array.
     */
    async get_measuresAt(measure: YMeasure): Promise<YMeasure[]>
    {
        let startUtcMs: number;
        let stream: YDataStream | null;
        let dataRows: number[][] = [];
        let measures: YMeasure[] = [];
        let tim: number;
        let itv: number;
        let end_: number;
        let nCols: number;
        let minCol: number;
        let avgCol: number;
        let maxCol: number;

        startUtcMs = measure.get_startTimeUTC() * 1000;
        stream = null;
        for (let ii in this._streams) {
            if (Math.round(await this._streams[ii].get_realStartTimeUTC() *1000) == startUtcMs) {
                stream = this._streams[ii];
            }
        }
        if (stream == null) {
            return measures;
        }
        dataRows = await stream.get_dataRows();
        if (dataRows.length == 0) {
            return measures;
        }
        tim = Math.round(await stream.get_realStartTimeUTC() * 1000);
        itv = Math.round(await stream.get_dataSamplesInterval() * 1000);
        if (tim < itv) {
            tim = itv;
        }
        nCols = dataRows[0].length;
        minCol = 0;
        if (nCols > 2) {
            avgCol = 1;
        } else {
            avgCol = 0;
        }
        if (nCols > 2) {
            maxCol = 2;
        } else {
            maxCol = 0;
        }

        for (let ii in dataRows) {
            end_ = tim + itv;
            if ((end_ > this._startTimeMs) && ((this._endTimeMs == 0) || (tim < this._endTimeMs))) {
                measures.push(new YMeasure(tim / 1000.0, end_ / 1000.0, dataRows[ii][minCol], dataRows[ii][avgCol], dataRows[ii][maxCol]));
            }
            tim = end_;
        }
        return measures;
    }

    /**
     * Returns all measured values currently available for this DataSet,
     * as a list of YMeasure objects. Each item includes:
     * - the start of the measure time interval
     * - the end of the measure time interval
     * - the minimal value observed during the time interval
     * - the average value observed during the time interval
     * - the maximal value observed during the time interval
     *
     * Before calling this method, you should call loadMore()
     * to load data from the device. You may have to call loadMore()
     * several time until all rows are loaded, but you can start
     * looking at available data rows before the load is complete.
     *
     * The oldest measures are always loaded first, and the most
     * recent measures will be loaded last. As a result, timestamps
     * are normally sorted in ascending order within the measure table,
     * unless there was an unexpected adjustment of the datalogger UTC
     * clock.
     *
     * @return a table of records, where each record depicts the
     *         measured value for a given time interval
     *
     * On failure, throws an exception or returns an empty array.
     */
    async get_measures(): Promise<YMeasure[]>
    {
        return this._measures;
    }

    //--- (end of generated code: YDataSet implementation)

    // YDataSet parser for stream list
    async _parse(str_json: string): Promise<number>
    {
        let loadval: _YY_LoggerApi | null = null;
        try { loadval = JSON.parse(str_json); } catch (err) {}
        if (!loadval) {
            // no data available
            this._progress = 0;
            return await this.get_progress();
        }

        this._functionId = loadval.id;
        this._unit = loadval.unit;
        this._bulkLoad = (loadval.bulk ? parseInt(loadval.bulk) : 0);
        if (loadval.calib) {
            this._calib = this._yapi.imm_decodeFloats(loadval.calib);
            this._calib[0] = (this._calib[0] / 1000) >> 0;
        } else {
            this._calib = this._yapi.imm_decodeWords(loadval.cal);
        }
        this._summary = new YMeasure(0, 0, 0, 0, 0);
        this._streams = [];
        this._preview = [];
        this._measures = [];
        for (let i = 0; i < loadval.streams.length; i++) {
            let stream = this._parent.imm_findDataStream(this, loadval.streams[i]);
            if (!stream) continue;
            let streamStartTime = await stream.get_realStartTimeUTC() * 1000;
            let streamEndTime = streamStartTime + await stream.get_realDuration() * 1000;
            if (this._startTimeMs > 0 && streamEndTime <= this._startTimeMs) {
                // this stream is too early, drop it
            } else if (this._endTimeMs > 0 && streamStartTime >= this._endTimeMs) {
                // this stream is too late, drop it
            } else {
                this._streams.push(stream);
            }
        }
        this._progress = 0;
        return this.get_progress();
    }

}

YDataSet.DATA_INVALID = YAPI_INVALID_DOUBLE;
YDataSet.DURATION_INVALID = YAPI_INVALID_DOUBLE;
YDataSet.HARDWAREID_INVALID = YAPI_INVALID_STRING;
YDataSet.FUNCTIONID_INVALID = YAPI_INVALID_STRING;
YDataSet.UNIT_INVALID = YAPI_INVALID_STRING;

//--- (generated code: YConsolidatedDataSet definitions)
//--- (end of generated code: YConsolidatedDataSet definitions)

//--- (generated code: YConsolidatedDataSet class start)
/**
 * YConsolidatedDataSet Class: Cross-sensor consolidated data sequence.
 *
 * YConsolidatedDataSet objects make it possible to retrieve a set of
 * recorded measures from multiple sensors, for a specified time interval.
 * They can be used to load data points progressively, and to receive
 * data records by timestamp, one by one..
 */
//--- (end of generated code: YConsolidatedDataSet class start)
export class YConsolidatedDataSet
{
    //--- (generated code: YConsolidatedDataSet attributes declaration)
    _start: number = 0;
    _end: number = 0;
    _nsensors: number = 0;
    _sensors: YSensor[] = [];
    _datasets: YDataSet[] = [];
    _progresss: number[] = [];
    _nextidx: number[] = [];
    _nexttim: number[] = [];

    // API symbols as static members
    //--- (end of generated code: YConsolidatedDataSet attributes declaration)

    constructor(double_startTime: number, double_endTime: number, obj_sensorList: YSensor[])
    {
        //--- (generated code: YConsolidatedDataSet constructor)
        //--- (end of generated code: YConsolidatedDataSet constructor)
        this.imm_init(double_startTime, double_endTime, obj_sensorList);
    }

    //--- (generated code: YConsolidatedDataSet implementation)

    imm_init(startt: number, endt: number, sensorList: YSensor[]): number
    {
        this._start = startt;
        this._end = endt;
        this._sensors = sensorList;
        this._nsensors = -1;
        return YAPI_SUCCESS;
    }

    /**
     * Returns an object holding historical data for multiple
     * sensors, for a specified time interval.
     * The measures will be retrieved from the data logger, which must have been turned
     * on at the desired time. The resulting object makes it possible to load progressively
     * a large set of measures from multiple sensors, consolidating data on the fly
     * to align records based on measurement timestamps.
     *
     * @param sensorNames : array of logical names or hardware identifiers of the sensors
     *         for which data must be loaded from their data logger.
     * @param startTime : the start of the desired measure time interval,
     *         as a Unix timestamp, i.e. the number of seconds since
     *         January 1, 1970 UTC. The special value 0 can be used
     *         to include any measure, without initial limit.
     * @param endTime : the end of the desired measure time interval,
     *         as a Unix timestamp, i.e. the number of seconds since
     *         January 1, 1970 UTC. The special value 0 can be used
     *         to include any measure, without ending limit.
     *
     * @return an instance of YConsolidatedDataSet, providing access to
     *         consolidated historical data. Records can be loaded progressively
     *         using the YConsolidatedDataSet.nextRecord() method.
     */
    static Init(sensorNames: string[], startTime: number, endTime: number): YConsolidatedDataSet
    {
        let nSensors: number;
        let sensorList: YSensor[] = [];
        let idx: number;
        let sensorName: string;
        let s: YSensor | null;
        let obj: YConsolidatedDataSet | null;
        nSensors = sensorNames.length;
        sensorList.length = 0;
        idx = 0;
        while (idx < nSensors) {
            sensorName = sensorNames[idx];
            s = YSensor.FindSensor(sensorName);
            sensorList.push(s);
            idx = idx + 1;
        }
        obj = new YConsolidatedDataSet(startTime, endTime, sensorList);
        return obj;
    }

    /**
     * Extracts the next data record from the data logger of all sensors linked to this
     * object.
     *
     * @param datarec : array of floating point numbers, that will be filled by the
     *         function with the timestamp of the measure in first position,
     *         followed by the measured value in next positions.
     *
     * @return an integer in the range 0 to 100 (percentage of completion),
     *         or a negative error code in case of failure.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async nextRecord(datarec: number[]): Promise<number>
    {
        let s: number;
        let idx: number;
        let sensor: YSensor | null;
        let newdataset: YDataSet | null;
        let globprogress: number;
        let currprogress: number;
        let currnexttim: number;
        let newvalue: number;
        let measures: YMeasure[] = [];
        let nexttime: number;
        //
        // Ensure the dataset have been retrieved
        //
        if (this._nsensors == -1) {
            this._nsensors = this._sensors.length;
            this._datasets.length = 0;
            this._progresss.length = 0;
            this._nextidx.length = 0;
            this._nexttim.length = 0;
            s = 0;
            while (s < this._nsensors) {
                sensor = this._sensors[s];
                newdataset = await sensor.get_recordedData(this._start, this._end);
                this._datasets.push(newdataset);
                this._progresss.push(0);
                this._nextidx.push(0);
                this._nexttim.push(0.0);
                s = s + 1;
            }
        }
        datarec.length = 0;
        //
        // Find next timestamp to process
        //
        nexttime = 0;
        s = 0;
        while (s < this._nsensors) {
            currnexttim = this._nexttim[s];
            if (currnexttim == 0) {
                idx = this._nextidx[s];
                measures = await this._datasets[s].get_measures();
                currprogress = this._progresss[s];
                while ((idx >= measures.length) && (currprogress < 100)) {
                    currprogress = await this._datasets[s].loadMore();
                    if (currprogress < 0) {
                        currprogress = 100;
                    }
                    this._progresss[s] = currprogress;
                    measures = await this._datasets[s].get_measures();
                }
                if (idx < measures.length) {
                    currnexttim = await measures[idx].get_endTimeUTC();
                    this._nexttim[s] = currnexttim;
                }
            }
            if (currnexttim > 0) {
                if ((nexttime == 0) || (nexttime > currnexttim)) {
                    nexttime = currnexttim;
                }
            }
            s = s + 1;
        }
        if (nexttime == 0) {
            return 100;
        }
        //
        // Extract data for this timestamp
        //
        datarec.length = 0;
        datarec.push(nexttime);
        globprogress = 0;
        s = 0;
        while (s < this._nsensors) {
            if (this._nexttim[s] == nexttime) {
                idx = this._nextidx[s];
                measures = await this._datasets[s].get_measures();
                newvalue = await measures[idx].get_averageValue();
                datarec.push(newvalue);
                this._nexttim[s] = 0.0;
                this._nextidx[s] = idx + 1;
            } else {
                datarec.push(NaN);
            }
            currprogress = this._progresss[s];
            globprogress = globprogress + currprogress;
            s = s + 1;
        }
        if (globprogress > 0) {
            globprogress = (((globprogress) / (this._nsensors)) >> 0);
            if (globprogress > 99) {
                globprogress = 99;
            }
        }
        return globprogress;
    }

    //--- (end of generated code: YConsolidatedDataSet implementation)
}

//
// YDevice Class (used internally)
//
// This class is used to store everything we know about connected Yocto-Devices.
// Instances are created when devices are discovered in the white pages
// (or registered manually, for root hubs) and then used to keep track of
// device naming changes. When a device or a function is renamed, this
// object forces the local indexes to be immediately updated, even if not
// yet fully propagated through the yellow pages of the device hub.
//
// In order to regroup multiple function queries on the same physical device,
// this class implements a device-wide API string cache (agnostic of API content).
// This is in addition to the function-specific cache implemented in YFunction.
//
class YDevice
{
    _yapi: YAPIContext;
    _rootUrl: string;
    _serialNumber: string;
    _logicalName: string;
    _productName: string;
    _productId: number;
    _beacon: number;
    _devYdx: number;
    _lastErrorType: number;
    _lastErrorMsg: string;
    _pendingQueries: Promise<void>;
    private _cache: _YY_DeviceCache;
    private _functions: string[][];
    private _busy: number;
    private _lastTimeRef: number;
    private _lastDuration: number;
    private _logCallback: YModule.LogCallback | null;
    private _logIsPulling: boolean;
    private _logpos: number;

    // Device constructor. Automatically call the YAPI functin to reindex device
    constructor(obj_yapi: YAPIContext, str_rooturl: string, obj_wpRec: _YY_WhitePage | null, obj_ypRecs: _YY_YellowPages | null)
    {
        // private attributes
        this._yapi = obj_yapi;
        this._rootUrl = str_rooturl;
        this._serialNumber = '';
        this._logicalName = '';
        this._productName = '';
        this._productId = 0;
        this._beacon = 0;
        this._devYdx = -1;
        this._lastErrorType = YAPI_SUCCESS;
        this._lastErrorMsg = 'no error';
        this._cache = {_expiration: 0, _json: new Uint8Array(0), _precooked: {}};
        this._functions = [];
        this._busy = 0;
        this._pendingQueries = Promise.resolve();
        this._lastTimeRef = 0;
        this._lastDuration = 0;
        this._logCallback = null;
        this._logIsPulling = false;
        this._logpos = 0;
        if (obj_wpRec && obj_ypRecs) {
            // preload values from white pages, if provided
            this._serialNumber = obj_wpRec.serialNumber;
            this._logicalName = obj_wpRec.logicalName;
            this._productName = obj_wpRec.productName;
            this._productId = obj_wpRec.productId;
            this._beacon = obj_wpRec.beacon;
            this._devYdx = (obj_wpRec.index == undefined ? -1 : obj_wpRec.index);
            this.imm_updateFromYP(obj_ypRecs);
            this._yapi.imm_reindexDevice(this);
        }
        // when obj_wpRec is not provided, caller MUST
        // call async method refresh()
    }

    _throw(int_errType: number, str_errMsg: string, obj_retVal?: any): any
    {
        this._lastErrorType = int_errType;
        this._lastErrorMsg = str_errMsg;
        return this._yapi._throw(int_errType, str_errMsg, obj_retVal);
    }

    /** Return the root URL used to access a device (including the trailing slash)
     *
     * @returns {string}
     */
    imm_getRootUrl(): string
    {
        return this._rootUrl;
    }

    /** Return the serial number of the device, as found during discovery
     *
     * @returns {string}
     */
    imm_getSerialNumber(): string
    {
        return this._serialNumber;
    }

    /** Return the logical name of the device, as found during discovery
     *
     * @returns {string}
     */
    imm_getLogicalName(): string
    {
        return this._logicalName;
    }

    async getLogicalName(): Promise<string>
    {
        if (this._cache._expiration == 0) {
            await this.refresh();
        }
        return this._logicalName;
    }

    /** Return the product name of the device, as found during discovery
     *
     * @returns {string}
     */
    imm_getProductName(): string
    {
        return this._productName;
    }

    /** Return the product Id of the device, as found during discovery
     *
     * @returns {number}
     */
    imm_getProductId(): number
    {
        return this._productId;
    }

    /** Return the beacon state of the device, as found during discovery
     *
     * @returns {number}
     */
    imm_getBeacon(): number
    {
        return this._beacon;
    }

    /** Return the beacon state of the device, as found during discovery
     *
     * @returns {number}
     */
    async getBeacon(): Promise<number>
    {
        if (this._cache._expiration == 0) {
            await this.refresh();
        }
        return this._beacon;
    }

    // Return the value of the last timestamp sent by the device, if any
    imm_getLastTimeRef(): number
    {
        return this._lastTimeRef;
    }

    // Return the value of the last duration sent by the device, if any
    imm_getLastDuration(): number
    {
        return this._lastDuration;
    }

    imm_triggerLogPull(): void
    {
        if (this._logCallback == null || this._logIsPulling) {
            return;
        }
        this._logIsPulling = true;
        let request = "GET logs.txt?pos=" + this._logpos;
        let prom = this._yapi.devRequest(this._rootUrl, request, null, 0);
        prom.then(async (yreq): Promise<void> => {
            if (yreq.errorType != YAPI_SUCCESS) {
                this._logIsPulling = false;
                return;
            }
            if (this._logCallback == null) {
                this._logIsPulling = false;
                return;
            }
            let resultStr = YAPI.imm_bin2str(<Uint8Array>yreq.bin_result);
            let pos = resultStr.lastIndexOf("\n@");
            if (pos < 0) {
                this._logIsPulling = false;
                return;
            }
            let logs = resultStr.substring(0, pos);
            let posStr = resultStr.substring(pos + 2);
            this._logpos = parseInt(posStr);
            let module = YModule.FindModuleInContext(this._yapi, this._serialNumber);
            let lines = logs.trim().split("\n");
            try {
                for (let i = 0; i < lines.length; i++) {
                    await this._logCallback(module, lines[i]);
                }
            } catch (e) {
                this._yapi.imm_log('Exception in device log callback:', e);
            }
            this._logIsPulling = false;
        });
    }

    imm_registerLogCallback(callback: YModule.LogCallback | null): void
    {
        this._logCallback = callback;
        if (callback != null) {
            this.imm_triggerLogPull();
        } else {
            this._logpos = 0;
            this._logIsPulling = false;
        }
    }

    /** Return the value of the last timestamp sent by the device, if any
     *
     * @param float_timestamp {number}
     * @param float_duration {number}
     */
    imm_setTimeRef(float_timestamp: number, float_duration: number): void
    {
        this._lastTimeRef = float_timestamp;
        this._lastDuration = float_duration;
    }

    /** Return the hub-specific devYdx of the device, as found during discovery
     *
     * @returns {number}
     */
    imm_getDevYdx(): number
    {
        return this._devYdx;
    }

    /** Return a string that describes the device (serial number, logical name or root URL)
     *
     * @returns {string}
     */
    imm_describe(): string
    {
        let res = this._rootUrl;
        if (this._serialNumber != '') {
            res = this._serialNumber;
            if (this._logicalName != '') {
                res = res + ' (' + this._logicalName + ')';
            }
        }
        return this._productName + ' ' + res;
    }

    /** Update device cache and YAPI function lists from yp records
     *
     * @param obj_ypRecs {object}
     */
    imm_updateFromYP(obj_ypRecs: _YY_YellowPages): void
    {
        let funidx = 0;
        for (let categ in obj_ypRecs) {
            for (let key in obj_ypRecs[categ]) {
                // @ts-ignore
                let rec = obj_ypRecs[categ][key];
                let hwid = rec['hardwareId'];
                let dotpos = hwid.indexOf('.');
                if (hwid.substr(0, dotpos) == this._serialNumber) {
                    let funydx = rec['index'];
                    if (funydx == undefined) funydx = funidx;
                    this._functions[funydx] = [hwid.substr(dotpos + 1), rec['logicalName']];
                    funidx++;
                }
            }
        }
    }

    /** Update device cache and YAPI function lists accordingly
     *
     * @param yreq {YHTTPRequest}
     * @param loadval {object}
     */
    async updateFromReq(yreq: YHTTPRequest, loadval: _YY_HubApi): Promise<void>
    {
        this._cache._expiration = this._yapi.GetTickCount() + this._yapi.defaultCacheValidity;
        this._cache._json = <Uint8Array>yreq.bin_result;

        let func;
        let reindex = false;
        if (this._productName == '') {
            // parse module and function names for the first time
            for (func in loadval) {
                if (func == 'module') {
                    this._serialNumber = loadval.module.serialNumber;
                    this._logicalName = loadval.module.logicalName;
                    this._productName = loadval.module.productName;
                    this._productId = loadval.module.productId;
                    this._beacon = loadval.module.beacon;
                } else if (func == 'services') {
                    this.imm_updateFromYP(loadval.services.yellowPages);
                }
            }
            reindex = true;
        } else {
            // parse module and refresh names if needed
            let renamed = false;
            for (func in loadval) {
                if (func == 'module') {
                    if (this._logicalName != loadval.module.logicalName) {
                        this._logicalName = loadval.module.logicalName;
                        reindex = true;
                    }
                    this._beacon = loadval.module.beacon;
                } else if (func != 'services') {
                    // @ts-ignore
                    let name = loadval[func]['logicalName'];
                    if (name == undefined) name = loadval.module.logicalName;
                    // @ts-ignore
                    let pubval = loadval[func]['advertisedValue'];
                    if (pubval != undefined) {
                        await this._yapi.setFunctionValue(loadval.module.serialNumber + '.' + func, pubval);
                    }
                    let funydx;
                    for (funydx in this._functions) {
                        if (this._functions[funydx][0] == func) {
                            if (this._functions[funydx][1] != name) {
                                this._functions[funydx][1] = name;
                                reindex = true;
                            }
                            break;
                        }
                    }
                }
            }
        }
        if (reindex) {
            this._yapi.imm_reindexDevice(this);
        }
    }

    // Force the REST API string in cache to expire immediately
    imm_dropCache(): void
    {
        this._cache._expiration = 0;
        this._cache._precooked = {};
    }

    /** Retrieve the number of functions (beside "module") in the device
     *
     * @returns {number}
     */
    imm_functionCount(): number
    {
        let funcPos = 0;
        for (let key in this._functions) {
            funcPos++;
        }
        return funcPos;
    }

    /** Retrieve the Id of the nth function (beside "module") in the device
     *
     * @param int_idx {number}
     * @returns {string}
     */
    imm_functionId(int_idx: number): string
    {
        let funcPos = 0;
        for (let key in this._functions) {
            if (int_idx === funcPos) {
                return this._functions[key][0];
            }
            funcPos++;
        }
        return '';
    }

    /** Retrieve the base type of the nth function (beside "module") in the device
     *
     * @param int_idx {number}
     * @returns {string}
     */
    imm_functionBaseType(int_idx: number): string
    {
        let funid = this.imm_functionId(int_idx);
        if (funid !== '') {
            let ftype = this._yapi.imm_getFunctionBaseType(this._serialNumber + '.' + funid);
            for (let baseType in Y_BASETYPES) {
                // @ts-ignore
                if (Y_BASETYPES[baseType] === ftype) {
                    return baseType;
                }
            }
        }
        return 'Function';
    }

    /** Retrieve the type of the nth function (beside 'module') in the device
     *
     * @param int_idx {number}
     * @returns {string}
     */
    imm_functionType(int_idx: number): string
    {
        let funid = this.imm_functionId(int_idx);
        if (funid !== '') {
            let i;
            for (i = funid.length; i > 0; i--) {
                if (funid[i - 1] > '9') {
                    break;
                }
            }
            let functionType = funid[0].toUpperCase() + funid.substr(1, i - 1);
            return functionType;
        }
        return '';
    }

    /** Retrieve the logical name of the nth function (beside "module") in the device
     *
     * @param int_idx {number}
     * @returns {string}
     */
    imm_functionName(int_idx: number): string
    {
        let funcPos = 0;
        for (let key in this._functions) {
            if (int_idx === funcPos) {
                return this._functions[key][1];
            }
            funcPos++;
        }
        return '';
    }

    /** Retrieve the advertised value of the nth function (beside "module") in the device
     *
     * @param int_idx {number}
     * @returns {string}
     */
    imm_functionValue(int_idx: number): string
    {
        let funid = this.imm_functionId(int_idx);
        if (funid !== '') {
            return this._yapi.imm_getFunctionValue(this._serialNumber + '.' + funid);
        }
        return '';
    }

    /** Retrieve the Id of a function given its funydx (internal function identifier index)
     *
     * @param int_funydx {number}
     * @returns {string}
     */
    imm_functionIdByFunYdx(int_funydx: number): string
    {
        if (this._functions[int_funydx]) {
            return this._functions[int_funydx][0];
        }
        return '';
    }

    /** Map an optimized JZON reply to a previously known JSON structure
     *
     * @param jzon {object}
     * @param json {object}
     * @returns {object}
     */
    imm_jzon2json(jzon: object, json: object): object
    {
        if (Array.isArray(jzon)) {
            let sz = jzon.length;
            if (Array.isArray(json)) {
                // Array in both sides
                let defval = (json.length > 0 ? json[0] : null);
                let res = [];
                for (let idx = 0; idx < sz; idx++) {
                    res[idx] = this.imm_jzon2json(jzon[idx], defval);
                }
                return res;
            } else if (typeof json === "object") {
                // Typical optimization case: array in jzon, struct in json
                let idx = 0;
                let res = {};
                for (let key in json) {
                    if (json.hasOwnProperty(key)) {
                        // @ts-ignore
                        res[key] = this.imm_jzon2json(jzon[idx], json[key]);
                        idx++;
                    }
                }
                return res;
            } else {
                return jzon;
            }
        } else if (typeof jzon === "object") {
            if (Array.isArray(json)) {
                return jzon;
            } else if (typeof json === "object") {
                let defval = null;
                for (let key in json) {
                    if (json.hasOwnProperty(key)) {
                        // @ts-ignore
                        defval = json[key];
                        break;
                    }
                }
                let res = {};
                for (let key in jzon) {
                    if (jzon.hasOwnProperty(key)) {
                        // @ts-ignore
                        if (json.hasOwnProperty(key) && (!Array.isArray(json[key]) || json[key].length > 0)) {
                            // @ts-ignore
                            res[key] = this.imm_jzon2json(jzon[key], json[key]);
                        } else {
                            // @ts-ignore
                            res[key] = this.imm_jzon2json(jzon[key], defval);
                        }
                    }
                }
                return res;
            } else {
                return jzon;
            }
        }
        // Keep atomic JZON value as is
        return jzon;
    }

    /** Get the whole REST API string for a device, from cache if possible
     *
     * @param int_msValidity {number}
     * @returns {YHTTPRequest}
     */
    async requestAPI(int_msValidity: number): Promise<YHTTPRequest>
    {
        if (this._cache._expiration > this._yapi.GetTickCount()) {
            let res = new YHTTPRequest(this._cache._json);
            res.obj_result = JSON.parse(JSON.stringify(this._cache._precooked));
            return res;
        }
        /** @type {YHTTPRequest} **/
        let req = 'GET /api.json';
        let precooked = this._cache._precooked;
        // @ts-ignore
        if (precooked.module && precooked.module.firmwareRelease) {
            // @ts-ignore
            req += '?fw=' + encodeURIComponent(precooked.module.firmwareRelease);
        }
        let yreq = await this._yapi.devRequest(this._rootUrl, req, null, 0);
        if (yreq.errorType != YAPI_SUCCESS) return yreq;
        if (!int_msValidity) {
            int_msValidity = this._yapi.defaultCacheValidity;
        }
        this._cache._json = <Uint8Array>yreq.bin_result;
        try {
            yreq.obj_result = JSON.parse(this._yapi.imm_bin2str(<Uint8Array>yreq.bin_result));
            if (Array.isArray(yreq.obj_result)) {
                // @ts-ignore
                if (precooked.module) {
                    let objres = <_YY_HubApi>this.imm_jzon2json(yreq.obj_result, precooked);
                    yreq.obj_result = objres;
                    if (objres.module &&
                        objres.module.serialNumber === objres.module.serialNumber &&
                        objres.module.firmwareRelease === objres.module.firmwareRelease) {
                        // Update text form for backward-compatibility (incl. save settings)
                        let jsonstr = JSON.stringify(yreq.obj_result);
                        this._cache._json = yreq.bin_result = this._yapi.imm_str2bin(jsonstr);
                        // Update precooked version in cache with a deep copy of the result
                        this._cache._precooked = JSON.parse(jsonstr);
                    } else {
                        // parse mismatch
                        this.imm_dropCache();
                        yreq.errorType = YAPI_IO_ERROR;
                        yreq.errorMsg = 'Request failed, could not parse API JZON result for ' + this._rootUrl;
                    }
                } else {
                    yreq.errorType = YAPI_IO_ERROR;
                    yreq.errorMsg = 'Request failed, could not parse API array result for ' + this._rootUrl;
                }
            } else if ((<_YY_HubApi>yreq.obj_result).module && (<_YY_HubApi>yreq.obj_result).module.firmwareRelease) {
                // Store current structure in cache (deep copy)
                this._cache._precooked = JSON.parse(JSON.stringify(yreq.obj_result));
            }
            // refresh cache
            this._cache._expiration = this._yapi.GetTickCount() + int_msValidity;
            this._logicalName = (<_YY_HubApi>yreq.obj_result).module.logicalName;
            this._beacon = (<_YY_HubApi>yreq.obj_result).module.beacon;

        } catch (err) {
            yreq.errorType = YAPI_IO_ERROR;
            yreq.errorMsg = 'Request failed, could not parse API JSON result for ' + this._rootUrl;
        }
        return yreq;
    }

    /** Reload a device API (store in cache), and update YAPI function lists accordingly
     *
     * @returns {number}
     */
    async refresh(): Promise<number>
    {
        /** @type {YHTTPRequest} **/
        let yreq = await this.requestAPI(this._yapi.defaultCacheValidity);
        if (yreq.errorType != YAPI_SUCCESS) {
            return this._throw(yreq.errorType, yreq.errorMsg, yreq.errorType);
        }
        await this.updateFromReq(yreq, <_YY_HubApi>yreq.obj_result);
        return YAPI_SUCCESS;
    }
    async waitPendingQueries(): Promise<void>
    {
        let newPromise = this._pendingQueries;
        if (newPromise != null) {
            try {
                await newPromise;
            } catch (e) {
                console.log(e)
            }
        }
    }
}

/**
 * YFirmwareFile Class: Object describing a loaded firmware file
 */
export class YFirmwareFile
{
    private _path: string;
    private _serial: string;
    private _pictype: string;
    private _product: string;
    private _firmware: string;
    private _prog_version: string;
    private _ROM_nb_zone: number;
    private _FLA_nb_zone: number;
    private _ROM_total_size: number;
    private _FLA_total_size: number;
    private _data: Uint8Array;
    private _zone_ofs: number;

    constructor(path: string, serial: string, pictype: string, product: string, firmware: string, prog_version: string,
                ROM_nb_zone: number, FLA_nb_zone: number, ROM_total_size: number, FLA_total_size: number, data: Uint8Array, zone_ofs: number)
    {
        this._path = path;
        this._serial = serial;
        this._pictype = pictype;
        this._product = product;
        this._firmware = firmware;
        this._prog_version = prog_version;
        this._ROM_nb_zone = ROM_nb_zone;
        this._FLA_nb_zone = FLA_nb_zone;
        this._ROM_total_size = ROM_total_size;
        this._FLA_total_size = FLA_total_size;
        this._data = data;
        this._zone_ofs = zone_ofs;
    }

    /**
     * Parse the binary buffer provided as input and initialize a new object
     * returns null if the file is not a valid firmware
     *
     * @param path {string}
     * @param data {Uint8Array}
     * @param force {boolean}
     * @return {YFirmwareFile|null}
     */
    static imm_Parse(path: string, data: Uint8Array, force: boolean): YFirmwareFile | null
    {
        const BYN_REV_V4 = 4;
        const BYN_REV_V5 = 5;
        const BYN_REV_V6 = 6;
        const MAX_ROM_ZONES_PER_FILES = 16;
        const MAX_FLASH_ZONES_PER_FILES = 4;
        const BYN_HEAD_SIZE_V4 = (96 + 8);
        const BYN_HEAD_SIZE_V5 = (96 + 32);
        const BYN_HEAD_SIZE_V6 = (96 + 48);
        const BYN_MD5_OFS_V6 = (96 + 16);
        let pos = 0;

        let getShort = ((): number => {
            let res: number = data[pos] + (data[pos + 1] << 8);
            pos += 2;
            return res;
        });
        let getInt = ((): number => {
            let res: number = data[pos] + (data[pos + 1] << 8) + (data[pos + 2] << 16) + (data[pos + 3] << 24);
            pos += 4;
            return res;
        });
        let getString = ((maxlen: number): string => {
            let end: number = pos + maxlen;
            while (end > pos && data[end - 1] == 0) {
                end--;
            }
            let res = YAPI.imm_bin2str(data.subarray(pos, end));
            pos += maxlen;
            return res;
        });

        let sign = getString(4);
        if (sign != 'BYN') return null;
        let rev = getShort();
        let serial = getString(20);
        let pictype = getString(20);
        let product = getString(28);
        let firmware = getString(22);
        if (serial.length >= 20) return null;
        if (product.length >= 28) return null;
        if (firmware.length >= 22) return null;

        let ROM_nb_zone = 0;
        let FLA_nb_zone = 0;
        let ROM_total_size = 0;
        let FLA_total_size = 0;
        let prog_buf;
        let prog_version = "";
        let zone_ofs;
        let datasize;
        switch (rev) {
        case BYN_REV_V4:
            zone_ofs = BYN_HEAD_SIZE_V4;
            ROM_nb_zone = getInt();
            datasize = getInt();
            if (ROM_nb_zone > MAX_ROM_ZONES_PER_FILES) return null;
            if (datasize != data.length - BYN_HEAD_SIZE_V4) return null;
            break;
        case BYN_REV_V5:
            zone_ofs = BYN_HEAD_SIZE_V5;
            prog_version = getString(22);
            if (!force && !YFirmwareFile.imm_progCompatible(prog_version)) return null;
            getShort(); //skip pad
            ROM_nb_zone = getInt();
            datasize = getInt();
            if (ROM_nb_zone > MAX_ROM_ZONES_PER_FILES) return null;
            if (datasize != data.length - BYN_HEAD_SIZE_V5) return null;
            break;
        case BYN_REV_V6:
            zone_ofs = BYN_HEAD_SIZE_V6;
            let md5hdr = data.subarray(pos, pos + 16);
            pos += 16;
            let md5hdrstr = YAPI.imm_bin2hexstr(md5hdr);
            let md5ctx = new Y_MD5Ctx();
            md5ctx.addData(data.subarray(BYN_MD5_OFS_V6));
            let md5bynstr = YAPI.imm_bin2hexstr(md5ctx.calculate());
            if (md5hdrstr != md5bynstr) {
                YAPI.imm_log('Invalid firmware image signature, file is corrupt');
                if (YAPI._logLevel >= 2) {
                    YAPI.imm_log('hdr MD5: ' + md5hdrstr);
                    YAPI.imm_log('byn MD5: ' + md5bynstr);
                    YAPI.imm_log('byn size: ' + data.length);
                }
                return null;
            }
            prog_version = getString(22);
            if (!force && !YFirmwareFile.imm_progCompatible(prog_version)) return null;
            ROM_nb_zone = data[pos++];
            FLA_nb_zone = data[pos++];
            ROM_total_size = getInt();
            FLA_total_size = getInt();
            if (ROM_nb_zone > MAX_ROM_ZONES_PER_FILES) return null;
            if (FLA_nb_zone > MAX_FLASH_ZONES_PER_FILES) return null;
            break;
        default:
            return null;
        }
        return new YFirmwareFile(path, serial, pictype, product, firmware, prog_version,
            ROM_nb_zone, FLA_nb_zone, ROM_total_size, FLA_total_size, data, zone_ofs);
    }

    static imm_progCompatible(prog_version: string): boolean
    {
        if (prog_version == '') return true;

        let apiVer = YAPI.imm_GetAPIVersion();
        let dashpos = apiVer.indexOf('-');
        if (dashpos > 0) {
            apiVer = apiVer.slice(0, dashpos);
        }
        apiVer = apiVer.slice(apiVer.lastIndexOf('.') + 1);
        if (parseInt(prog_version) > parseInt(apiVer)) {
            YAPI.imm_log('checkProgField: byn=' + prog_version + ' api=' + apiVer);
            return false;
        }
        return true;
    }

    imm_getSerial(): string
    {
        return this._serial;
    }

    imm_getPictype(): string
    {
        return this._pictype;
    }

    imm_getProduct(): string
    {
        return this._product;
    }

    imm_getFirmwareRelease(): string
    {
        return this._firmware;
    }

    imm_getFirmwareReleaseAsInt(): number
    {
        return parseInt(this._firmware);
    }

    imm_getProg_version(): string
    {
        return this._prog_version;
    }

    imm_getROM_nb_zone(): number
    {
        return this._ROM_nb_zone;
    }

    imm_getFLA_nb_zone(): number
    {
        return this._FLA_nb_zone;
    }

    imm_getROM_total_size(): number
    {
        return this._ROM_total_size;
    }

    imm_getFLA_total_size(): number
    {
        return this._FLA_total_size;
    }

    imm_getData(): Uint8Array
    {
        return this._data;
    }

    imm_getPath(): string
    {
        return this._path;
    }
}

//--- (generated code: YFirmwareUpdate definitions)
//--- (end of generated code: YFirmwareUpdate definitions)

//--- (generated code: YFirmwareUpdate class start)
/**
 * YFirmwareUpdate Class: Firmware update process control interface, returned by module.updateFirmware method.
 *
 * The YFirmwareUpdate class let you control the firmware update of a Yoctopuce
 * module. This class should not be instantiate directly, but instances should be retrieved
 * using the YModule method module.updateFirmware.
 */
//--- (end of generated code: YFirmwareUpdate class start)
export class YFirmwareUpdate
{
    _yapi: YAPIContext;
    //--- (generated code: YFirmwareUpdate attributes declaration)
    _serial: string = '';
    _settings: Uint8Array = new Uint8Array(0);
    _firmwarepath: string = '';
    _progress_msg: string = '';
    _progress_c: number = 0;
    _progress: number = 0;
    _restore_step: number = 0;
    _force: boolean = false;

    // API symbols as static members
    //--- (end of generated code: YFirmwareUpdate attributes declaration)

    constructor(obj_yapi: YAPIContext, str_serial: string, str_path: string, bin_settings: Uint8Array, bool_force: boolean)
    {
        /** @member {YAPIContext} **/
        this._yapi = obj_yapi;
        //--- (generated code: YFirmwareUpdate constructor)
        //--- (end of generated code: YFirmwareUpdate constructor)
        /** @member {string} **/
        this._serial = str_serial;
        /** @member {string} **/
        this._firmwarepath = str_path;
        /** @member {Uint8Array} **/
        this._settings = bin_settings;
        /** @member {boolean} **/
        this._force = bool_force;
    }

    imm_progress(progress: number, msg: string): void
    {
        this._progress = progress;
        this._progress_msg = msg;
    }

    async _processMore_internal(newupdate: number): Promise<number>
    {
        if (!newupdate) return YAPI_SUCCESS;

        /** @type {Uint8Array} **/
        let bytes;

        this.imm_progress(0, 'Firmware update started');
        if (typeof this._firmwarepath == 'string' && this._firmwarepath.indexOf('yoctopuce.com') >= 0) {
            this.imm_progress(1, 'Downloading firmware');
            bytes = await this._yapi.system_env.downloadfile(this._firmwarepath, this._yapi);
        } else {
            this.imm_progress(1, 'Loading firmware');
            bytes = await this._yapi.system_env.loadfile(this._firmwarepath);
        }
        /** @type {YFirmwareFile} **/
        let firmware = YFirmwareFile.imm_Parse(this._firmwarepath, bytes, this._force);
        if (!firmware) {
            return this._yapi._throw(YAPI_DEVICE_NOT_FOUND, 'Device ' + this._serial + ' is not detected', YAPI_DEVICE_NOT_FOUND);
        }

        //5% -> 10%
        this.imm_progress(5, 'Check if module is already in bootloader');
        /** @type {YGenericHub} **/
        let hub = null;
        /** @type {YModule} **/
        let module = YModule.FindModuleInContext(this._yapi, this._serial + '.module');
        if (await module.isOnline()) {
            let dev = <YDevice>this._yapi.imm_getDevice(this._serial);
            let baseUrl = dev.imm_getRootUrl();
            let byPos = baseUrl.indexOf('/bySerial/');
            if (byPos >= 0) {
                baseUrl = baseUrl.slice(0, byPos + 1);
            } else if (baseUrl.slice(-1) != '/') baseUrl = baseUrl + '/';
            let urlInfo: _YY_UrlInfo = new _YY_UrlInfo(baseUrl);
            hub = this._yapi.imm_getHub(urlInfo);
        } else {
            // test if already in bootloader
            let hubs = this._yapi._connectedHubs;
            for (let i = 0; i < hubs.length; i++) {
                let ldrs = await hubs[i].getBootloaders();
                if (ldrs.indexOf(this._serial) >= 0) {
                    hub = hubs[i];
                    break;
                }
            }
        }
        if (hub == null) {
            this.imm_progress(-1, 'Device ' + this._serial + ' is not detected');
            return this._yapi._throw(YAPI_DEVICE_NOT_FOUND, 'Device ' + this._serial + ' is not detected', YAPI_DEVICE_NOT_FOUND);
        }

        try {
            await hub.firmwareUpdate(this._serial, firmware, this._settings, (percent: number, msg: string): void => {
                this.imm_progress(5 + ((percent * 80 + 50) / 100) >> 0, msg);
            });
        } catch (e) {
            this.imm_progress(-1, (e as Error).message);
            return this._yapi._throw(YAPI_IO_ERROR, (e as Error).message, YAPI_IO_ERROR);
        }
        if (module._cache.parentHub) {
            // this device is hosted on VirtualHub for Web
            this.imm_progress(100, 'Firmware update scheduled successfully');
        } else {
            this.imm_progress(80, 'Wait for the device to restart');
            let timeout = this._yapi.GetTickCount() + 60000;
            await module.clearCache();
            while (!(await module.isOnline()) && timeout > this._yapi.GetTickCount()) {
                await this._yapi.Sleep(500);
                await this._yapi.UpdateDeviceList();
            }
            if (await module.isOnline()) {
                if (this._settings != null) {
                    this.imm_progress(95, 'Restoring device settings');
                    await module.set_allSettingsAndFiles(this._settings);
                    await module.saveToFlash();
                }
                let real_fw = await module.get_firmwareRelease();
                if (real_fw == firmware.imm_getFirmwareRelease()) {
                    this.imm_progress(100, 'Success');
                } else {
                    this.imm_progress(-1, 'Unable to update firmware');
                }
            } else {
                this.imm_progress(-1, 'Device did not reboot correctly');
            }
        }
        return YAPI_SUCCESS;
    }

    static async checkFirmware_r(file: string, serial_base: string, force: boolean): Promise<YFirmwareFile | null>
    {
        /***
         * FIXME: move recursion to yocto_api_nodejs
         ***
         if(YAPI.system_env.isNodeJS) {
         // Node.js can recurse into directory
         let stats = fs.statSync(file);
         if(stats.isDirectory()) {
         let dirPromise = new Promise<YFirmwareFile|null>((resolve, reject) => {
         let join = YAPI._nodeRequire('path').join;
         let dir = file;
         fs.readdir(dir, (err: string, files: string[]) => {
         if(err) resolve(null);
         let tasks = files.map((fname) => {
         // intentionally return a promise here!
         return YFirmwareUpdate.checkFirmware_r(join(dir, fname), serial_base, force)
         });
         Promise.all(tasks).then((results) => {
         let bestFirmware: YFirmwareFile | null = null;
         results.forEach((firmware) => {
         if (!firmware) return;
         if (!bestFirmware || bestFirmware.imm_getFirmwareReleaseAsInt() < firmware.imm_getFirmwareReleaseAsInt()) {
         bestFirmware = firmware;
         }
         });
         resolve(bestFirmware);
         });
         });
         });
         return dirPromise;
         } else if(!stats.isFile()) {
         return null;
         }
         }
         ***/
        // common version: load from a single file
        if (file.substr(-4).toLowerCase() != '.byn') return null;
        let bynfile = await YAPI.system_env.loadfile(file);
        let firmware = YFirmwareFile.imm_Parse(file, bynfile, force);
        if (!firmware) return null;
        if (firmware.imm_getSerial().slice(0, serial_base.length) != serial_base) return null;
        return firmware;
    }

    /**
     * Test if the byn file is valid for this module. It is possible to pass a directory instead of a file.
     * In that case, this method returns the path of the most recent appropriate byn file. This method will
     * ignore any firmware older than minrelease.
     *
     * @param serial {string} : the serial number of the module to update
     * @param path {string} : the path of a byn file or a directory that contains byn files
     * @param minrelease {number} : a positive integer
     * @param force {boolean} : true to force an update even if the API is below expected revision
     *
     * @return {string} : the path of the byn file to use, or an empty string if no byn files matches the requirement
     *
     * On failure, returns a string that starts with "error:".
     */
    static async CheckFirmwareEx(serial: string, path: string, minrelease: number, force: boolean): Promise<string>
    {
        let link = '';
        let best_rev = 0;
        let current_rev;

        if (typeof path == 'string' && path.indexOf('yoctopuce.com') >= 0) {
            try {
                let data = await YAPI.system_env.downloadfile('http://www.yoctopuce.com/FR/common/getLastFirmwareLink.php?serial=' + serial, YAPI);
                let obj = JSON.parse(YAPI.imm_bin2str(data));
                link = obj['link'];
                best_rev = obj['version'];
            } catch (e) {
                YAPI.imm_log('failed to retrieve firmware information from www.yoctopuce.com', e);
                YAPI._throw(YAPI_IO_ERROR, 'failed to retrieve firmware information from www.yoctopuce.com', '');
                return '';
            }
        } else {
            /** @type {YFirmwareFile} **/
            let firmware = await YFirmwareUpdate.checkFirmware_r(path, serial.substring(0, 8), force);
            if (firmware != null) {
                best_rev = firmware.imm_getFirmwareReleaseAsInt();
                link = firmware.imm_getPath();
            }
        }
        if (minrelease != 0) {
            if (minrelease < best_rev) {
                return link;
            } else {
                return '';
            }
        }
        return link;
    }

    static async CheckFirmware_internal(serial: string, path: string, minrelease: number): Promise<string>
    {
        return YFirmwareUpdate.CheckFirmwareEx(serial, path, minrelease, false);
    }

    static async GetAllBootLoadersInContext_internal(yctx: YAPIContext): Promise<string[]>
    {
        let hubs = yctx._connectedHubs;
        let res = [];

        for (let i = 0; i < hubs.length; i++) {
            let ldrs = await hubs[i].getBootloaders();
            for (let j = 0; j < ldrs.length; j++) {
                res.push(ldrs[j]);
            }
        }
        return res;
    }

    static async GetAllBootLoaders_internal(): Promise<string[]>
    {
        return YFirmwareUpdate.GetAllBootLoadersInContext(YAPI);
    }

    //--- (generated code: YFirmwareUpdate implementation)

    async _processMore(newupdate: number): Promise<number>
    {
        return await this._processMore_internal(newupdate);
    }

    /**
     * Returns a list of all the modules in "firmware update" mode.
     *
     * @return an array of strings containing the serial numbers of devices in "firmware update" mode.
     */
    static async GetAllBootLoaders(): Promise<string[]>
    {
        return await this.GetAllBootLoaders_internal();
    }

    /**
     * Returns a list of all the modules in "firmware update" mode.
     *
     * @param yctx : a YAPI context.
     *
     * @return an array of strings containing the serial numbers of devices in "firmware update" mode.
     */
    static async GetAllBootLoadersInContext(yctx: YAPIContext): Promise<string[]>
    {
        return await this.GetAllBootLoadersInContext_internal(yctx);
    }

    /**
     * Test if the byn file is valid for this module. It is possible to pass a directory instead of a file.
     * In that case, this method returns the path of the most recent appropriate byn file. This method will
     * ignore any firmware older than minrelease.
     *
     * @param serial : the serial number of the module to update
     * @param path : the path of a byn file or a directory that contains byn files
     * @param minrelease : a positive integer
     *
     * @return : the path of the byn file to use, or an empty string if no byn files matches the requirement
     *
     * On failure, returns a string that starts with "error:".
     */
    static async CheckFirmware(serial: string, path: string, minrelease: number): Promise<string>
    {
        return await this.CheckFirmware_internal(serial, path, minrelease);
    }

    /**
     * Returns the progress of the firmware update, on a scale from 0 to 100. When the object is
     * instantiated, the progress is zero. The value is updated during the firmware update process until
     * the value of 100 is reached. The 100 value means that the firmware update was completed
     * successfully. If an error occurs during the firmware update, a negative value is returned, and the
     * error message can be retrieved with get_progressMessage.
     *
     * @return an integer in the range 0 to 100 (percentage of completion)
     *         or a negative error code in case of failure.
     */
    async get_progress(): Promise<number>
    {
        if (this._progress >= 0) {
            await this._processMore(0);
        }
        return this._progress;
    }

    /**
     * Returns the last progress message of the firmware update process. If an error occurs during the
     * firmware update process, the error message is returned
     *
     * @return a string  with the latest progress message, or the error message.
     */
    async get_progressMessage(): Promise<string>
    {
        return this._progress_msg;
    }

    /**
     * Starts the firmware update process. This method starts the firmware update process in background. This method
     * returns immediately. You can monitor the progress of the firmware update with the get_progress()
     * and get_progressMessage() methods.
     *
     * @return an integer in the range 0 to 100 (percentage of completion),
     *         or a negative error code in case of failure.
     *
     * On failure returns a negative error code.
     */
    async startUpdate(): Promise<number>
    {
        let err: string;
        let leng: number;
        err = this._yapi.imm_bin2str(this._settings);
        leng = (err).length;
        if ((leng >= 6) && ('error:' == (err).substr(0, 6))) {
            this._progress = -1;
            this._progress_msg = (err).substr(6, leng - 6);
        } else {
            this._progress = 0;
            this._progress_c = 0;
            await this._processMore(1);
        }
        return this._progress;
    }

    //--- (end of generated code: YFirmwareUpdate implementation)
}

//--- (generated code: YFunction class start)
/**
 * YFunction Class: Common function interface
 *
 * This is the parent class for all public objects representing device functions documented in
 * the high-level programming API. This abstract class does all the real job, but without
 * knowledge of the specific function attributes.
 *
 * Instantiating a child class of YFunction does not cause any communication.
 * The instance simply keeps track of its function identifier, and will dynamically bind
 * to a matching device at the time it is really being used to read or set an attribute.
 * In order to allow true hot-plug replacement of one device by another, the binding stay
 * dynamic through the life of the object.
 *
 * The YFunction class implements a generic high-level cache for the attribute values of
 * the specified function, pre-parsed from the REST API string.
 */
//--- (end of generated code: YFunction class start)
export class YFunction
{
    _yapi: YAPIContext;
    _className: string;
    _func: string;
    _lastErrorType: number;
    _lastErrorMsg: string;
    _userData: any;
    _cache: _YY_FuncCache;
    _dataStreams: YDataStreamDict;
    //--- (generated code: YFunction attributes declaration)
    _logicalName: string = YFunction.LOGICALNAME_INVALID;
    _advertisedValue: string = YFunction.ADVERTISEDVALUE_INVALID;
    _valueCallbackFunction: YFunction.ValueCallback | null = null;
    _cacheExpiration: number = 0;
    _serial: string = '';
    _funId: string = '';
    _hwId: string = '';

    // API symbols as object properties
    public readonly LOGICALNAME_INVALID: string = YAPI_INVALID_STRING;
    public readonly ADVERTISEDVALUE_INVALID: string = YAPI_INVALID_STRING;

    // API symbols as static members
    public static readonly LOGICALNAME_INVALID: string = YAPI_INVALID_STRING;
    public static readonly ADVERTISEDVALUE_INVALID: string = YAPI_INVALID_STRING;
    //--- (end of generated code: YFunction attributes declaration)

    constructor(obj_yapi: YAPIContext, str_func: string)
    {
        this._yapi = obj_yapi;
        this._className = 'Function';
        this._func = str_func;
        this._lastErrorType = YAPI_SUCCESS;
        this._lastErrorMsg = 'no error';
        this._dataStreams = {};
        this._userData = null;
        this._cache = {_expiration: -1, functionid: '', hwid: ''};
        this._valueCallbackFunction = null;
        //--- (generated code: YFunction constructor)
        //--- (end of generated code: YFunction constructor)
    }

    _throw(int_errType: number, str_errMsg: string, obj_retVal?: any): any
    {
        this._lastErrorType = int_errType;
        this._lastErrorMsg = str_errMsg;
        return this._yapi._throw(int_errType, str_errMsg, obj_retVal);
    }

    async isReadOnly_internal(): Promise<boolean>
    {
        try {
            let serial = await this.get_serialNumber();
            return this._yapi.isReadOnly(serial);
        } catch (e) {
            return true;
        }
    }

    //--- (generated code: YFunction implementation)

    imm_parseAttr(name: string, val: any): number
    {
        switch (name) {
        case '_expiration':
            this._cacheExpiration = <number> val;
            return 1;
        case 'logicalName':
            this._logicalName = <string> <string> val;
            return 1;
        case 'advertisedValue':
            this._advertisedValue = <string> <string> val;
            return 1;
        }
        return 0;
    }

    /**
     * Returns the logical name of the function.
     *
     * @return a string corresponding to the logical name of the function
     *
     * On failure, throws an exception or returns YFunction.LOGICALNAME_INVALID.
     */
    async get_logicalName(): Promise<string>
    {
        let res: string;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != YAPI_SUCCESS) {
                return YFunction.LOGICALNAME_INVALID;
            }
        }
        res = this._logicalName;
        return res;
    }

    /**
     * Changes the logical name of the function. You can use yCheckLogicalName()
     * prior to this call to make sure that your parameter is valid.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : a string corresponding to the logical name of the function
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_logicalName(newval: string): Promise<number>
    {
        let rest_val: string;
        if (!await YAPI.CheckLogicalName(newval)) {
            return this._throw(YAPI.INVALID_ARGUMENT, 'Invalid name :' + newval, YAPI.INVALID_ARGUMENT);
        }
        rest_val = String(newval);
        return await this._setAttr('logicalName', rest_val);
    }

    /**
     * Returns a short string representing the current state of the function.
     *
     * @return a string corresponding to a short string representing the current state of the function
     *
     * On failure, throws an exception or returns YFunction.ADVERTISEDVALUE_INVALID.
     */
    async get_advertisedValue(): Promise<string>
    {
        let res: string;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != YAPI_SUCCESS) {
                return YFunction.ADVERTISEDVALUE_INVALID;
            }
        }
        res = this._advertisedValue;
        return res;
    }

    async set_advertisedValue(newval: string): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('advertisedValue', rest_val);
    }

    /**
     * Retrieves a function for a given identifier.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the function is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YFunction.isOnline() to test if the function is
     * indeed online at a given time. In case of ambiguity when looking for
     * a function by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the function, for instance
     *         MyDevice..
     *
     * @return a YFunction object allowing you to drive the function.
     */
    static FindFunction(func: string): YFunction
    {
        let obj: YFunction | null;
        obj = <YFunction> YFunction._FindFromCache('Function', func);
        if (obj == null) {
            obj = new YFunction(YAPI, func);
            YFunction._AddToCache('Function',  func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a function for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the function is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YFunction.isOnline() to test if the function is
     * indeed online at a given time. In case of ambiguity when looking for
     * a function by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx : a YAPI context
     * @param func : a string that uniquely characterizes the function, for instance
     *         MyDevice..
     *
     * @return a YFunction object allowing you to drive the function.
     */
    static FindFunctionInContext(yctx: YAPIContext, func: string): YFunction
    {
        let obj: YFunction | null;
        obj = <YFunction> YFunction._FindFromCacheInContext(yctx,  'Function', func);
        if (obj == null) {
            obj = new YFunction(yctx, func);
            YFunction._AddToCache('Function',  func, obj);
        }
        return obj;
    }

    /**
     * Registers the callback function that is invoked on every change of advertised value.
     * The callback is invoked only during the execution of ySleep or yHandleEvents.
     * This provides control over the time when the callback is triggered. For good responsiveness, remember to call
     * one of these two functions periodically. To unregister a callback, pass a null pointer as argument.
     *
     * @param callback : the callback function to call, or a null pointer. The callback function should take two
     *         arguments: the function object of which the value has changed, and the character string describing
     *         the new advertised value.
     * @noreturn
     */
    async registerValueCallback(callback: YFunction.ValueCallback | null): Promise<number>
    {
        let val: string;
        if (callback != null) {
            await YFunction._UpdateValueCallbackList(this, true);
        } else {
            await YFunction._UpdateValueCallbackList(this, false);
        }
        this._valueCallbackFunction = callback;
        // Immediately invoke value callback with current value
        if (callback != null && await this.isOnline()) {
            val = this._advertisedValue;
            if (!(val == '')) {
                await this._invokeValueCallback(val);
            }
        }
        return 0;
    }

    async _invokeValueCallback(value: string): Promise<number>
    {
        if (this._valueCallbackFunction != null) {
            try {
                await this._valueCallbackFunction(this, value);
            } catch (e) {
                this._yapi.imm_log('Exception in valueCallback:', e);
            }
        } else {
        }
        return 0;
    }

    /**
     * Disables the propagation of every new advertised value to the parent hub.
     * You can use this function to save bandwidth and CPU on computers with limited
     * resources, or to prevent unwanted invocations of the HTTP callback.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async muteValueCallbacks(): Promise<number>
    {
        return await this.set_advertisedValue('SILENT');
    }

    /**
     * Re-enables the propagation of every new advertised value to the parent hub.
     * This function reverts the effect of a previous call to muteValueCallbacks().
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async unmuteValueCallbacks(): Promise<number>
    {
        return await this.set_advertisedValue('');
    }

    /**
     * Returns the current value of a single function attribute, as a text string, as quickly as
     * possible but without using the cached value.
     *
     * @param attrName : the name of the requested attribute
     *
     * @return a string with the value of the the attribute
     *
     * On failure, throws an exception or returns an empty string.
     */
    async loadAttribute(attrName: string): Promise<string>
    {
        let url: string;
        let attrVal: Uint8Array;
        url = 'api/' + await this.get_functionId() + '/' + attrName;
        attrVal = await this._download(url);
        return this._yapi.imm_bin2str(attrVal);
    }

    /**
     * Indicates whether changes to the function are prohibited or allowed.
     * Returns true if the function is blocked by an admin password
     * or if the function is not available.
     *
     * @return true if the function is write-protected or not online.
     */
    async isReadOnly(): Promise<boolean>
    {
        return await this.isReadOnly_internal();
    }

    /**
     * Returns the serial number of the module, as set by the factory.
     *
     * @return a string corresponding to the serial number of the module, as set by the factory.
     *
     * On failure, throws an exception or returns YFunction.SERIALNUMBER_INVALID.
     */
    async get_serialNumber(): Promise<string>
    {
        let m: YModule | null;
        m = await this.get_module();
        return await m.get_serialNumber();
    }

    async _parserHelper(): Promise<number>
    {
        return 0;
    }

    /**
     * Returns the next Function
     *
     * @returns {YFunction}
     */
    nextFunction(): YFunction | null
    {
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != YAPI.SUCCESS) return null;
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, <string> resolve.result);
        if (next_hwid == null) return null;
        return YFunction.FindFunctionInContext(this._yapi, next_hwid);
    }

    /**
     * Retrieves the first Function in a YAPI context
     *
     * @returns {YFunction}
     */
    static FirstFunction(): YFunction | null
    {
        let next_hwid = YAPI.imm_getFirstHardwareId('Function');
        if (next_hwid == null) return null;
        return YFunction.FindFunction(next_hwid);
    }

    /**
     * Retrieves the first Function in a given context
     *
     * @param yctx {YAPIContext}
     *
     * @returns {YFunction}
     */
    static FirstFunctionInContext(yctx: YAPIContext): YFunction | null
    {
        let next_hwid = yctx.imm_getFirstHardwareId('Function');
        if (next_hwid == null) return null;
        return YFunction.FindFunctionInContext(yctx, next_hwid);
    }

    //--- (end of generated code: YFunction implementation)

    /** Retrieve a function instance from cache
     *
     * @param yctx {YAPIContext}
     * @param className {string}
     * @param func {string}
     * @returns {YFunction}
     */
    static _FindFromCacheInContext(yctx: YAPIContext, className: string, func: string): YFunction
    {
        return yctx.imm_getFunction(className, func);
    }

    /** Retrieve a function instance from cache
     *
     * @param className {string}
     * @param func {string}
     * @returns {YFunction}
     */
    static _FindFromCache(className: string, func: string): YFunction
    {
        return YAPI.imm_getFunction(className, func);
    }

    /** Add a function instance to cache
     *
     * @param className {string}
     * @param func {string}
     * @param obj {YFunction}
     */
    static _AddToCache(className: string, func: string, obj: YFunction): void
    {
        obj._yapi.imm_setFunction(className, func, obj);
    }

    /** Clear the function instance cache
     *
     * @param obj_yapi {YAPIContext}
     */
    static _ClearCache(obj_yapi: YAPIContext | null = null): void
    {
        if (!obj_yapi) obj_yapi = YAPI;
        obj_yapi.imm_ResetToDefaults();
    }

    /** Add or remove a value change callback
     *
     * @param obj_func {YFunction}
     * @param bool_add {Boolean}
     */
    static async _UpdateValueCallbackList(obj_func: YFunction, bool_add: boolean): Promise<void>
    {
        await obj_func._yapi._UpdateValueCallbackList(obj_func, bool_add);
    }

    /** Add or remove a timed report callback
     *
     * @param obj_func {YSensor}
     * @param bool_add {Boolean}
     */
    static async _UpdateTimedReportCallbackList(obj_func: YFunction, bool_add: boolean): Promise<void>
    {
        await obj_func._yapi._UpdateTimedReportCallbackList(obj_func, bool_add);
    }

    /**
     * Returns a short text that describes unambiguously the instance of the function in the form
     * TYPE(NAME)=SERIAL&#46;FUNCTIONID.
     * More precisely,
     * TYPE       is the type of the function,
     * NAME       it the name used for the first access to the function,
     * SERIAL     is the serial number of the module if the module is connected or "unresolved", and
     * FUNCTIONID is  the hardware identifier of the function if the module is connected.
     * For example, this method returns Relay(MyCustomName.relay1)=RELAYLO1-123456.relay1 if the
     * module is already connected or Relay(BadCustomeName.relay1)=unresolved if the module has
     * not yet been connected. This method does not trigger any USB or TCP transaction and can therefore be used in
     * a debugger.
     *
     * @return a string that describes the function
     *         (ex: Relay(MyCustomName.relay1)=RELAYLO1-123456.relay1)
     */
    async describe(): Promise<string>
    {
        if (this._hwId != '') {
            return this._className + '(' + this._func + ')=' + this._hwId;
        }
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != YAPI_SUCCESS && resolve.result != this._func) {
            return this._className + '(' + this._func + ')=unresolved';
        }
        return this._className + '(' + this._func + ')=' + resolve.result;
    }

    /**
     * Returns the unique hardware identifier of the function in the form SERIAL.FUNCTIONID.
     * The unique hardware identifier is composed of the device serial
     * number and of the hardware identifier of the function (for example RELAYLO1-123456.relay1).
     *
     * @return a string that uniquely identifies the function (ex: RELAYLO1-123456.relay1)
     *
     * On failure, throws an exception or returns  YFunction.HARDWAREID_INVALID.
     */
    async get_hardwareId(): Promise<string>
    {
        if (this._hwId != '') {
            return this._hwId;
        }
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != YAPI_SUCCESS) {
            await this.isOnline();
            resolve = this._yapi.imm_resolveFunction(this._className, this._func);
            if (resolve.errorType != YAPI_SUCCESS) {
                return this._throw(resolve.errorType, resolve.errorMsg, YFunction.HARDWAREID_INVALID);
            }
        }
        return <string>resolve.result;
    }

    /**
     * Returns the hardware identifier of the function, without reference to the module. For example
     * relay1
     *
     * @return a string that identifies the function (ex: relay1)
     *
     * On failure, throws an exception or returns  YFunction.FUNCTIONID_INVALID.
     */
    async get_functionId(): Promise<string>
    {
        if (this._funId != '') {
            return this._funId;
        }
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != YAPI_SUCCESS) {
            await this.isOnline();
            resolve = this._yapi.imm_resolveFunction(this._className, this._func);
            if (resolve.errorType != YAPI_SUCCESS) {
                return this._throw(resolve.errorType, resolve.errorMsg, YFunction.FUNCTIONID_INVALID);
            }
        }
        let hardwareId = <string>resolve.result;
        let pos = hardwareId.indexOf('.');
        return hardwareId.substr(pos + 1);
    }

    imm_get_functionId(): string
    {
        if (this._funId != '') {
            return this._funId;
        }
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != YAPI_SUCCESS) {
            return this._throw(resolve.errorType, resolve.errorMsg, YFunction.FUNCTIONID_INVALID);
        }
        let hardwareId = <string>resolve.result;
        let pos = hardwareId.indexOf('.');
        return hardwareId.substr(pos + 1);
    }

    /**
     * Returns a global identifier of the function in the format MODULE_NAME&#46;FUNCTION_NAME.
     * The returned string uses the logical names of the module and of the function if they are defined,
     * otherwise the serial number of the module and the hardware identifier of the function
     * (for example: MyCustomName.relay1)
     *
     * @return a string that uniquely identifies the function using logical names
     *         (ex: MyCustomName.relay1)
     *
     * On failure, throws an exception or returns  YFunction.FRIENDLYNAME_INVALID.
     */
    async get_friendlyName(): Promise<string>
    {
        let resolve = this._yapi.imm_getFriendlyNameFunction(this._className, this._func);
        if (resolve.errorType != YAPI_SUCCESS) {
            await this.isOnline();
            resolve = this._yapi.imm_getFriendlyNameFunction(this._className, this._func);
            if (resolve.errorType != YAPI_SUCCESS) {
                return this._throw(resolve.errorType, resolve.errorMsg, YFunction.FRIENDLYNAME_INVALID);
            }
        }
        return <string>resolve.result;
    }

    /** Store and parse a an API request for current function
     *
     * @param {YFuncRequest} yreq
     * @param {number} msValidity
     */
    async _parse(yreq: YFuncRequest, msValidity: number): Promise<void>
    {
        if (!yreq.obj_result) return;

        // update expiration based on requested validity
        yreq.obj_result._expiration = this._yapi.GetTickCount() + msValidity;
        this._cache = yreq.obj_result;
        this._serial = yreq.obj_result.deviceid;
        this._funId = yreq.obj_result.functionid;
        this._hwId = yreq.obj_result.hwid;
        // process each attribute in turn for class-oriented processing
        for (let key in yreq.obj_result) {
            this.imm_parseAttr(key, yreq.obj_result[key]);
        }
        await this._parserHelper();
    }

    /**
     ** Helpers for built-in classes
     **

     // Helper for initializing standard attributes (used in particular by built-in classes)
     async _i(): Promise<void>
     {
     let arr_attrNames: string[] = this.constructor._attrList;
     this._className = this.constructor.name.slice(1);
     for(let i = 0; i < arr_attrNames.length; i++) {
     this['_'+arr_attrNames[i]] = this.constructor[arr_attrNames[i].toUpperCase()+'_INVALID'];
     }
     }

     // Helper for simple accessors (used in particular by built-in classes)
     async _g(str_attr): Promise<object>
     {
     if (this._cacheExpiration <= this._yapi.GetTickCount()) {
     if (await this.load(this._yapi.defaultCacheValidity) != YAPI_SUCCESS) {
     return this.constructor[str_attr.toLocaleUpperCase()+'_INVALID'];
     }
     }
     return this['_'+str_attr];
     }

     // Helper for simple accessors (used in particular by built-in classes)
     async _s(str_attr, obj_val): Promise<number>
     {
     return this._setAttr(str_attr, String(obj_val));
     }

     // Helper for completing and exporting the class; used by built-in classes
     static _E(arr_attrlist)
     {
     let className = this.name.slice(1);
     this._attrList = arr_attrlist;
     for(let i = 0; i < arr_attrlist.length; i++) {
     let attrname = arr_attrlist[i];
     let getMethod = 'get_'+attrname;
     this.prototype[getMethod] = async function(): Promise<object> { return this._g(attrname); };
     }
     this['Find'+className] = function(func) {
     let str_classname = this.name.slice(1);
     let obj: YFunction;
     obj = YFunction._FindFromCache(str_classname, func);
     if (obj == null) {
     obj = new this(YAPI, func);
     YFunction._AddToCache(str_classname, func, obj);
     }
     return obj;
     };
     this['First'+className] = function() {
     let str_classname = this.name.slice(1);
     let next_hwid = YAPI.imm_getFirstHardwareId(str_classname);
     if(next_hwid == null) return null;
     return this['Find'+className](next_hwid);
     };
     this.prototype['next'+className] = function() {
     let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
     if(resolve.errorType != YAPI.SUCCESS) return null;
     let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
     if(next_hwid == null) return null;
     return this.constructor['Find'+className](next_hwid);
     };
     this.imm_Init();
     }

     ********/

    // Backward-compatibility helper
    isOnline_async(func: Function, ctx: object): void
    {
        this.isOnline()
            .then((res: boolean): void => { func(ctx, this, res); })
            .catch((e): void => { func(ctx, this, false); });
    }

    // Backward-compatibility helper
    load_async(ms_validiy: number, func: Function, ctx: object): void
    {
        this.load(ms_validiy)
            .then((res): void => { func(ctx, this, YAPI_SUCCESS); })
            .catch((e): void => { func(ctx, this, this.get_errorType()); });
    }

    /** Return the value of an attribute from function cache, after reloading it from device if needed
     * Note: the function cache is a typed (parsed) cache, contrarily to the agnostic device cache
     *
     * @param {string} str_attr
     * @return {string|null}
     */
    async _getAttr(str_attr: string): Promise<string | null>
    {
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            // no valid cached value, reload from device
            if (await this.load(this._yapi.defaultCacheValidity) != YAPI_SUCCESS) return null;
        }
        if (typeof this._cache[str_attr] == 'undefined') {
            this._throw(YAPI_VERSION_MISMATCH, 'No such attribute ' + str_attr + ' in function', null);
        }
        return <string>this._cache[str_attr];
    }

    /** Return the value of an attribute from function cache, after reloading it from device if needed
     * Note: the function cache is a typed (parsed) cache, contrarily to the agnostic device cache
     *
     * @param {string} str_attr
     * @return {string|null}
     */
    async _getFixedAttr(str_attr: string): Promise<string | null>
    {
        if (this._cacheExpiration == 0) {
            // no cached value, load from device
            if (await this.load(this._yapi.defaultCacheValidity) != YAPI_SUCCESS) return null;
        }
        if (typeof this._cache[str_attr] == 'undefined') {
            this._throw(YAPI_VERSION_MISMATCH, 'No such attribute ' + str_attr + ' in function', null);
        }
        return <string>this._cache[str_attr];
    }

    /** Escape a string for posting it as an URL
     *
     * @param {string} str_newval
     * @return {string}
     */
    imm_escapeAttr(str_newval: string): string
    {
        // We intentionally use escape here, because we want to encode non-ASCII
        // characters using single-byte ISO characters (not multi-byte UTF-8)

        //noinspection JSDeprecatedSymbols
        return escape(str_newval).replace(/[+]/g, '%2B')
            .replace(/%20/g, '+').replace(/%21/g, '!')
            .replace(/%24/g, '$')
            .replace(/%27/g, '\'').replace(/%28/g, '(').replace(/%29/g, ')')
            .replace(/%2[cC]/g, ',').replace(/%2[fF]/g, '/')
            .replace(/%3[aA]/g, ':').replace(/%3[bB]/g, ';').replace(/%3[fF]/g, '?')
            .replace(/%5[bB]/g, '[').replace(/%5[dD]/g, ']');
    }

    /** Change the value of an attribute on a device, and invalidate the cache
     *
     * @param {string} str_attr
     * @param {string} str_newval
     * @return {number}
     */
    async _setAttr(str_attr: string, str_newval: string): Promise<number>
    {
        if (str_newval == undefined) {
            return this._throw(YAPI_INVALID_ARGUMENT, 'Undefined value to set for attribute ' + str_attr, null);
        }
        let attrname = encodeURIComponent(str_attr);
        let attrval = this.imm_escapeAttr(str_newval);
        let extra = '/' + attrname + '?' + attrname + '=' + attrval + '&.';
        if (this._cacheExpiration != 0) {
            this._cacheExpiration = this._yapi.GetTickCount();
            this._cache._expiration = this._cacheExpiration;
        }
        let yreq = await this._yapi.funcRequest(this._className, this._func, extra);
        if (yreq.errorType != YAPI_SUCCESS) {
            return this._throw(yreq.errorType, yreq.errorMsg, yreq.errorType);
        }
        return YAPI_SUCCESS;
    }

    /** Execute an arbitrary HTTP GET request on the device and return the binary content
     *
     * @param {string} str_path
     * @return {Uint8Array}
     */
    async _download(str_path: string): Promise<Uint8Array>
    {
        // get the device serial number
        let devid: string = this._serial;
        if (devid == '') {
            devid = await (await this.module()).get_serialNumber();
        }
        if (devid == YAPI_INVALID_STRING) {
            return new Uint8Array(0);
        }
        let yreq = await this._yapi.devRequest(devid, 'GET /' + str_path, null, 0);
        if (yreq.errorType != YAPI_SUCCESS) {
            return this._throw(yreq.errorType, yreq.errorMsg, '');
        }
        return <Uint8Array>yreq.bin_result;
    }

    /** Execute an out-of-band HTTP GET request on the device and return the binary content.
     * The request may execute in parallel to regular requests currently in progress.
     *
     * @param {string} str_path
     * @return {Uint8Array}
     */
    async _downloadOutOfBand(str_path: string): Promise<Uint8Array>
    {
        // get the device serial number
        /** @type {string} **/
        let devid = this._serial;
        if (devid == '') {
            devid = await (await this.module()).get_serialNumber();
        }
        if (devid == YAPI_INVALID_STRING) {
            return new Uint8Array(0);
        }
        /** @type {YHTTPRequest} **/
        let yreq = await this._yapi.devRequest(devid, 'GET /' + str_path, null, 1);
        if (yreq.errorType != YAPI_SUCCESS) {
            return this._throw(yreq.errorType, yreq.errorMsg, '');
        }
        return <Uint8Array>yreq.bin_result;
    }

    /** Upload a file to the filesystem, to the specified full path name.
     * If a file already exists with the same path name, its content is overwritten.
     * The progress callback function is called with two parameters: the number of
     * bytes uploaded so far and the total size to be uploaded.
     *
     * @param {string} str_path
     * @param {Uint8Array|string|number[]} bin_content
     * @param {YDownloadProgressCallback} fun_progressCb
     * @return {object}
     */
    async _uploadWithProgress(str_path: string, bin_content: Uint8Array | string | number[], fun_progressCb: YDownloadProgressCallback | null): Promise<YHTTPRequest>
    {
        // get the device serial number
        let devid = this._serial;
        if (devid == '') {
            devid = await (await this.module()).get_serialNumber();
        }
        if (devid == YAPI_INVALID_STRING) {
            let res = new YHTTPRequest(null);
            res.errorType = this.get_errorType();
            res.errorMsg = this.get_errorMessage();
            return res;
        }
        let httpreq = 'POST /upload.html';
        let len = bin_content.length;
        // convert to Uint8Array if needed
        if (typeof bin_content == 'string' || bin_content instanceof String) {
            bin_content = this._yapi.imm_str2bin(<string>bin_content);
        } else if (bin_content instanceof Array) {
            bin_content = new Uint8Array(bin_content);
        }
        return this._yapi.devRequest(devid, httpreq, new YHTTPBody(str_path, bin_content, fun_progressCb), 0);
    }

    /** Upload a file to the filesystem, to the specified full path name.
     * If a file already exists with the same path name, its content is overwritten.
     * The progress callback function is called with two parameters: the number of
     * bytes uploaded so far and the total size to be uploaded.
     *
     * @param {string} str_path
     * @param {Uint8Array|string|number[]} bin_content
     * @return {object}
     */
    async _uploadEx(str_path: string, bin_content: Uint8Array | string | number[]): Promise<Uint8Array>
    {
        let yreq = await this._uploadWithProgress(str_path, bin_content, null)
        if (yreq.errorType != YAPI_SUCCESS) {
            return this._throw(yreq.errorType, yreq.errorMsg, null);
        }
        return <Uint8Array>yreq.bin_result;
    }

    /** Upload a file to the filesystem, to the specified full path name.
     * If a file already exists with the same path name, its content is overwritten.
     *
     * @param {string} str_path
     * @param {Uint8Array|string|number[]} bin_content
     * @return {object}
     */
    async _upload(str_path: string, bin_content: Uint8Array | string | number[]): Promise<number>
    {
        let yreq = await this._uploadWithProgress(str_path, bin_content, null);
        if (yreq.errorType != YAPI_SUCCESS) {
            return this._throw(yreq.errorType, yreq.errorMsg, null);
        }
        return yreq.errorType;
    }

    /**
     * Waits for all pending asynchronous commands on the module to complete, and invoke
     * the user-provided callback function. The callback function can therefore freely
     * issue synchronous or asynchronous commands, without risking to block the
     * JavaScript VM.
     *
     * @param callback : callback function that is invoked when all pending commands on
     *         the module are completed.
     *         The callback function receives two arguments: the caller-specific
     *         context object and the receiving function object.
     * @param context : caller-specific object that is passed as-is to the callback function
     *
     * @return nothing.
     */
    wait_async(callback: Function, context: object): number
    {
        // get the device serial number
        let devid = this._serial;
        if (devid == '') {
            // serial not yet known, get it then call wait_async again
            this.module().then((module): any =>
                module.get_serialNumber().then((): number =>
                    this.wait_async(callback, context)));
            return YAPI_SUCCESS;
        }
        if (devid == YAPI_INVALID_STRING) {
            callback(context, this);
            return YAPI_SUCCESS;
        }
        let lockdev = <YDevice>this._yapi.imm_getDevice(devid);

        // queue the call to user callback function in the pending queries promise chain
        let delayedCode = ((): void => { callback(context, this); });
        lockdev._pendingQueries = lockdev._pendingQueries.then(delayedCode, delayedCode);
        return YAPI_SUCCESS;
    }

    /** Get a value from a JSON buffer
     *
     * @param bin_jsonbuff {Uint8Array}
     * @param str_key {string}
     * @return {string}
     **/
    imm_json_get_key(bin_jsonbuff: Uint8Array, str_key: string): string
    {
        let loadval: YStringDict = JSON.parse(this._yapi.imm_bin2str(bin_jsonbuff));
        if (typeof loadval[str_key] != 'undefined') {
            return loadval[str_key];
        }
        return '';
    }

    /** Get a string from a JSON buffer
     *
     * @param bin_jsonbuff {Uint8Array}
     * @return {string}
     **/
    imm_json_get_string(bin_jsonbuff: Uint8Array): string
    {
        return JSON.parse(this._yapi.imm_bin2str(bin_jsonbuff));
    }

    /** Get an array of strings from a JSON buffer
     *
     * @param bin_jsonbuff {Uint8Array}
     * @return {string[]}
     **/
    imm_json_get_array(bin_jsonbuff: Uint8Array): string[]
    {
        let loadval = JSON.parse(this._yapi.imm_bin2str(bin_jsonbuff));
        let res = [];
        for (let idx in loadval) {
            res.push(JSON.stringify(loadval[idx]));
        }
        return res;
    }

    /** Get an array of strings from a JSON buffer
     *
     * @param str_json {string}
     * @param str_path {string}
     * @return {string}
     **/
    imm_get_json_path(str_json: string, str_path: string): string
    {
        let json = JSON.parse(str_json);
        let paths = str_path.split('|');
        for (let i = 0; i < paths.length; i++) {
            let tmp = paths[i];
            json = json[tmp];
            if (json == undefined) {
                return '';
            }
        }
        return JSON.stringify(json);
    }

    /** Get a string from a JSON string
     *
     * @param str_json {string}
     * @return {string}
     **/
    imm_decode_json_string(str_json: string): string
    {
        if (str_json === "") {
            return '';
        }
        return JSON.parse(str_json);
    }

    // Method used to cache DataStream objects (new DataLogger)
    //
    /** Method used to cache DataStream objects (new DataLogger)
     *
     * @param obj_dataset {YDataSet}
     * @param str_def {string}
     * @return {YDataStream}
     **/
    imm_findDataStream(obj_dataset: YDataSet, str_def: string): YDataStream | null
    {
        /** @type {string} **/
        let key = obj_dataset.imm_get_functionId() + ':' + str_def;
        if (this._dataStreams[key]) {
            return this._dataStreams[key];
        }

        let words = this._yapi.imm_decodeWords(str_def);
        if (words.length < 14) {
            this._throw(YAPI.VERSION_MISMATCH, "device firwmare is too old", null);
            return null;
        }
        /** @type {YDataStream} **/
        let newDataStream = new YDataStream(this, obj_dataset, words);
        this._dataStreams[key] = newDataStream;
        return newDataStream;
    }

    // Method used to clear cache of DataStream object (undocumented)
    async clearDataStreamCache(): Promise<void>
    {
        this._dataStreams = {};
    }

    /**
     * Checks if the function is currently reachable, without raising any error.
     * If there is a cached value for the function in cache, that has not yet
     * expired, the device is considered reachable.
     * No exception is raised if there is an error while trying to contact the
     * device hosting the function.
     *
     * @return true if the function can be reached, and false otherwise
     */
    async isOnline(): Promise<boolean>
    {
        // A valid value in cache means that the device is online
        if (this._cacheExpiration > this._yapi.GetTickCount()) return true;

        // Check that the function is available without throwing exceptions
        /** @type {YFuncRequest} **/
        let yreq = await this._yapi.funcRequest(this._className, this._func, '', this._yapi.defaultCacheValidity);
        if (yreq.errorType != YAPI_SUCCESS) {
            return (yreq.errorType == YAPI_DEVICE_BUSY);
        }
        // save result in cache anyway
        await this._parse(yreq, this._yapi.defaultCacheValidity);

        return true;
    }

    /**
     * Returns the numerical error code of the latest error with the function.
     * This method is mostly useful when using the Yoctopuce library with
     * exceptions disabled.
     *
     * @return a number corresponding to the code of the latest error that occurred while
     *         using the function object
     */
    get_errorType(): number
    {
        return this._lastErrorType;
    }

    /**
     * Returns the error message of the latest error with the function.
     * This method is mostly useful when using the Yoctopuce library with
     * exceptions disabled.
     *
     * @return a string corresponding to the latest error message that occured while
     *         using the function object
     */
    get_errorMessage(): string
    {
        return this._lastErrorMsg;
    }

    /**
     * Preloads the function cache with a specified validity duration.
     * By default, whenever accessing a device, all function attributes
     * are kept in cache for the standard duration (5 ms). This method can be
     * used to temporarily mark the cache as valid for a longer period, in order
     * to reduce network traffic for instance.
     *
     * @param msValidity : an integer corresponding to the validity attributed to the
     *         loaded function parameters, in milliseconds
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async load(msValidity: number): Promise<number>
    {
        /** @type {YFuncRequest} **/
        let yreq = await this._yapi.funcRequest(this._className, this._func, '', msValidity);
        if (yreq.errorType != YAPI_SUCCESS) {
            return this._throw(yreq.errorType, yreq.errorMsg, yreq.errorType);
        }
        await this._parse(yreq, msValidity);

        return YAPI_SUCCESS;
    }

    /**
     * Invalidates the cache. Invalidates the cache of the function attributes. Forces the
     * next call to get_xxx() or loadxxx() to use values that come from the device.
     *
     * @noreturn
     */
    async clearCache(): Promise<void>
    {
        let devreq = await this._yapi._funcDev(this._className, this._func);
        if (devreq.errorType != YAPI_SUCCESS) {
            return;
        }
        (<_YY_FuncReq>devreq.obj_result).device.imm_dropCache();
        if (this._cacheExpiration > 0) {
            this._cacheExpiration = this._yapi.GetTickCount();
        }
    }

    /**
     * Gets the YModule object for the device on which the function is located.
     * If the function cannot be located on any module, the returned instance of
     * YModule is not shown as on-line.
     *
     * @return {YModule} an instance of YModule
     */
    async module(): Promise<YModule>
    {
        // try to resolve the function name to a device id without query
        if (this._serial != '') {
            return YModule.FindModuleInContext(this._yapi, this._serial + '.module');
        }
        let hwid = this._func;
        let resolve;
        if (hwid.indexOf('.') < 0) {
            resolve = this._yapi.imm_resolveFunction(this._className, this._func);
            if (resolve.errorType == YAPI_SUCCESS) hwid = <string>resolve.result;
        }
        let dotidx = hwid.indexOf('.');
        if (dotidx >= 0) {
            // resolution worked
            return YModule.FindModuleInContext(this._yapi, hwid.substr(0, dotidx) + '.module');
        }

        // device not resolved for now, force a communication for a last chance resolution
        if (await this.load(this._yapi.defaultCacheValidity) == YAPI_SUCCESS) {
            resolve = this._yapi.imm_resolveFunction(this._className, this._func);
            if (resolve.result) hwid = <string>resolve.result;
        }
        dotidx = hwid.indexOf('.');
        if (dotidx >= 0) {
            // resolution worked
            return YModule.FindModuleInContext(this._yapi, hwid.substr(0, dotidx) + '.module');
        }
        // return a true yFindModule object even if it is not a module valid for communicating
        return YModule.FindModuleInContext(this._yapi, 'module_of_' + this._className + '_' + this._func);
    }

    /**
     * Gets the YModule object for the device on which the function is located.
     * If the function cannot be located on any module, the returned instance of
     * YModule is not shown as on-line.
     *
     * @return an instance of YModule
     */
    async get_module(): Promise<YModule>
    {
        return this.module();
    }

    /**
     * Returns a unique identifier of type YFUN_DESCR corresponding to the function.
     * This identifier can be used to test if two instances of YFunction reference the same
     * physical function on the same physical device.
     *
     * @return an identifier of type YFUN_DESCR.
     *
     * If the function has never been contacted, the returned value is Y$CLASSNAME$.FUNCTIONDESCRIPTOR_INVALID.
     */
    async get_functionDescriptor(): Promise<string>
    {
        // try to resolve the function name to a device id without query
        if (this._hwId != '') {
            return this._hwId;
        }
        let hwid = this._func;
        if (hwid.indexOf('.') < 0) {
            let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
            if (resolve.errorType != YAPI_SUCCESS) hwid = <string>resolve.result;
        }
        let dotidx = hwid.indexOf('.');
        if (dotidx >= 0) {
            return hwid;
        }
        return Y_FUNCTIONDESCRIPTOR_INVALID;
    }

    /**
     * Returns the value of the userData attribute, as previously stored using method
     * set_userData.
     * This attribute is never touched directly by the API, and is at disposal of the caller to
     * store a context.
     *
     * @return the object stored previously by the caller.
     */
    async get_userData(): Promise<any>
    {
        return this._userData;
    }

    /**
     * Stores a user context provided as argument in the userData attribute of the function.
     * This attribute is never touched by the API, and is at disposal of the caller to store a context.
     *
     * @param data : any kind of object to be stored
     * @noreturn
     */
    async set_userData(data: any): Promise<void>
    {
        this._userData = data;
    }

}

export namespace YFunction
{
    //--- (generated code: YFunction definitions)
    export const FUNCTIONDESCRIPTOR_INVALID     : string = YAPI_INVALID_STRING;
    export const HARDWAREID_INVALID             : string = YAPI_INVALID_STRING;
    export const FUNCTIONID_INVALID             : string = YAPI_INVALID_STRING;
    export const FRIENDLYNAME_INVALID           : string = YAPI_INVALID_STRING;
    export interface ValueCallback {(func: YFunction, value: string): void}

    //--- (end of generated code: YFunction definitions)
}

//--- (generated code: YModule class start)
/**
 * YModule Class: Global parameters control interface for all Yoctopuce devices
 *
 * The YModule class can be used with all Yoctopuce USB devices.
 * It can be used to control the module global parameters, and
 * to enumerate the functions provided by each module.
 */
//--- (end of generated code: YModule class start)
export class YModule extends YFunction
{
    //--- (generated code: YModule attributes declaration)
    _className: string;
    _productName: string = YModule.PRODUCTNAME_INVALID;
    _serialNumber: string = YModule.SERIALNUMBER_INVALID;
    _productId: number = YModule.PRODUCTID_INVALID;
    _productRelease: number = YModule.PRODUCTRELEASE_INVALID;
    _firmwareRelease: string = YModule.FIRMWARERELEASE_INVALID;
    _persistentSettings: YModule.PERSISTENTSETTINGS = YModule.PERSISTENTSETTINGS_INVALID;
    _luminosity: number = YModule.LUMINOSITY_INVALID;
    _beacon: YModule.BEACON = YModule.BEACON_INVALID;
    _upTime: number = YModule.UPTIME_INVALID;
    _usbCurrent: number = YModule.USBCURRENT_INVALID;
    _rebootCountdown: number = YModule.REBOOTCOUNTDOWN_INVALID;
    _userVar: number = YModule.USERVAR_INVALID;
    _valueCallbackModule: YModule.ValueCallback | null = null;
    _logCallback: YModule.LogCallback | null = null;
    _confChangeCallback: YModule.ConfigChangeCallback | null = null;
    _beaconCallback: YModule.BeaconCallback | null = null;

    // API symbols as object properties
    public readonly PRODUCTNAME_INVALID: string = YAPI_INVALID_STRING;
    public readonly SERIALNUMBER_INVALID: string = YAPI_INVALID_STRING;
    public readonly PRODUCTID_INVALID: number = YAPI_INVALID_UINT;
    public readonly PRODUCTRELEASE_INVALID: number = YAPI_INVALID_UINT;
    public readonly FIRMWARERELEASE_INVALID: string = YAPI_INVALID_STRING;
    public readonly PERSISTENTSETTINGS_LOADED: YModule.PERSISTENTSETTINGS = 0;
    public readonly PERSISTENTSETTINGS_SAVED: YModule.PERSISTENTSETTINGS = 1;
    public readonly PERSISTENTSETTINGS_MODIFIED: YModule.PERSISTENTSETTINGS = 2;
    public readonly PERSISTENTSETTINGS_INVALID: YModule.PERSISTENTSETTINGS = -1;
    public readonly LUMINOSITY_INVALID: number = YAPI_INVALID_UINT;
    public readonly BEACON_OFF: YModule.BEACON = 0;
    public readonly BEACON_ON: YModule.BEACON = 1;
    public readonly BEACON_INVALID: YModule.BEACON = -1;
    public readonly UPTIME_INVALID: number = YAPI_INVALID_LONG;
    public readonly USBCURRENT_INVALID: number = YAPI_INVALID_UINT;
    public readonly REBOOTCOUNTDOWN_INVALID: number = YAPI_INVALID_INT;
    public readonly USERVAR_INVALID: number = YAPI_INVALID_INT;

    // API symbols as static members
    public static readonly PRODUCTNAME_INVALID: string = YAPI_INVALID_STRING;
    public static readonly SERIALNUMBER_INVALID: string = YAPI_INVALID_STRING;
    public static readonly PRODUCTID_INVALID: number = YAPI_INVALID_UINT;
    public static readonly PRODUCTRELEASE_INVALID: number = YAPI_INVALID_UINT;
    public static readonly FIRMWARERELEASE_INVALID: string = YAPI_INVALID_STRING;
    public static readonly PERSISTENTSETTINGS_LOADED: YModule.PERSISTENTSETTINGS = 0;
    public static readonly PERSISTENTSETTINGS_SAVED: YModule.PERSISTENTSETTINGS = 1;
    public static readonly PERSISTENTSETTINGS_MODIFIED: YModule.PERSISTENTSETTINGS = 2;
    public static readonly PERSISTENTSETTINGS_INVALID: YModule.PERSISTENTSETTINGS = -1;
    public static readonly LUMINOSITY_INVALID: number = YAPI_INVALID_UINT;
    public static readonly BEACON_OFF: YModule.BEACON = 0;
    public static readonly BEACON_ON: YModule.BEACON = 1;
    public static readonly BEACON_INVALID: YModule.BEACON = -1;
    public static readonly UPTIME_INVALID: number = YAPI_INVALID_LONG;
    public static readonly USBCURRENT_INVALID: number = YAPI_INVALID_UINT;
    public static readonly REBOOTCOUNTDOWN_INVALID: number = YAPI_INVALID_INT;
    public static readonly USERVAR_INVALID: number = YAPI_INVALID_INT;
    //--- (end of generated code: YModule attributes declaration)

    constructor(yapi: YAPIContext, func: string)
    {
        //--- (generated code: YModule constructor)
        super(yapi, func);
        this._className                  = 'Module';
        //--- (end of generated code: YModule constructor)

        // automatically fill in hardware properties if they can be resolved
        // without any network access (getDevice does not cause network access)
        let devid = this._func;
        let dotidx = devid.indexOf('.');
        if (dotidx > 0) devid = devid.substr(0, dotidx);
        let dev = this._yapi.imm_getDevice(devid);
        if (dev) {
            this._serial = dev.imm_getSerialNumber();
            this._funId = 'module';
            this._hwId = this._serial + '.module';
        }
    }

    _throw(int_errType: number, str_errMsg: string, obj_retVal?: any): any
    {
        this._lastErrorType = int_errType;
        this._lastErrorMsg = str_errMsg;
        return this._yapi._throw(int_errType, str_errMsg, obj_retVal);
    }

    static async _updateModuleCallbackList(YModule_module: YModule, bool_add: boolean): Promise<void>
    {
        /* FIXME: Not implemented? */
    }

    /** Return the internal device object hosting the function
     *
     * @return {YDevice}
     *
     * Raise an error if not found
     */
    imm_getDev(): YDevice
    {
        /** @type {string} **/
        let devid = this._func;
        /** @type {number} **/
        let dotidx = devid.indexOf('.');
        if (dotidx > 0) devid = devid.substr(0, dotidx);
        /** @type {YDevice} **/
        let dev = this._yapi.imm_getDevice(devid);
        if (!dev) {
            this._throw(YAPI_DEVICE_NOT_FOUND, 'Device [' + devid + '] is not online', null);
        }
        return <YDevice>dev;
    }

    /**
     * Forces a full redetection of the device, in case the functions changed
     *
     * @noreturn
     */
    async forceDeviceRefresh(): Promise<void>
    {
        /** @type {YDevice} **/
        let dev = this.imm_getDev();
        if (!dev || !this._serial) return;
        await this._yapi.ForceDeviceRefresh(this._serial);
        if (this._cacheExpiration > 0) {
            this._cacheExpiration = this._yapi.GetTickCount();
        }
    }

    /**
     * Returns the number of functions (beside the "module" interface) available on the module.
     *
     * @return the number of functions on the module
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async functionCount(): Promise<number>
    {
        /** @type {YDevice} **/
        let dev = this.imm_getDev();
        if (!dev) return YAPI_DEVICE_NOT_FOUND;
        return dev.imm_functionCount();
    }

    /**
     * Retrieves the hardware identifier of the <i>n</i>th function on the module.
     *
     * @param functionIndex : the index of the function for which the information is desired, starting at
     * 0 for the first function.
     *
     * @return a string corresponding to the unambiguous hardware identifier of the requested module function
     *
     * On failure, throws an exception or returns an empty string.
     */
    async functionId(functionIndex: number): Promise<string>
    {
        /** @type {YDevice} **/
        let dev = this.imm_getDev();
        if (!dev) return '';
        return dev.imm_functionId(functionIndex);
    }

    /**
     * Retrieves the type of the <i>n</i>th function on the module. Yoctopuce functions type names match
     * their class names without the <i>Y</i> prefix, for instance <i>Relay</i>, <i>Temperature</i> etc..
     *
     * @param functionIndex : the index of the function for which the information is desired, starting at
     * 0 for the first function.
     *
     * @return a string corresponding to the type of the function.
     *
     * On failure, throws an exception or returns an empty string.
     */
    async functionType(functionIndex: number): Promise<string>
    {
        /** @type {YDevice} **/
        let dev = this.imm_getDev();
        if (!dev) return '';
        return dev.imm_functionType(functionIndex);
    }

    /**
     * Retrieves the base type of the <i>n</i>th function on the module.
     * For instance, the base type of all measuring functions is "Sensor".
     *
     * @param functionIndex : the index of the function for which the information is desired, starting at
     * 0 for the first function.
     *
     * @return a string corresponding to the base type of the function
     *
     * On failure, throws an exception or returns an empty string.
     */
    async functionBaseType(functionIndex: number): Promise<string>
    {
        /** @type {YDevice} **/
        let dev = this.imm_getDev();
        if (!dev) return '';
        return dev.imm_functionBaseType(functionIndex);
    }

    /**
     * Retrieves the logical name of the <i>n</i>th function on the module.
     *
     * @param functionIndex : the index of the function for which the information is desired, starting at
     * 0 for the first function.
     *
     * @return a string corresponding to the logical name of the requested module function
     *
     * On failure, throws an exception or returns an empty string.
     */
    async functionName(functionIndex: number): Promise<string>
    {
        /** @type {YDevice} **/
        let dev = this.imm_getDev();
        if (!dev) return '';
        return dev.imm_functionName(functionIndex);
    }

    /**
     * Retrieves the advertised value of the <i>n</i>th function on the module.
     *
     * @param functionIndex : the index of the function for which the information is desired, starting at
     * 0 for the first function.
     *
     * @return a short string (up to 6 characters) corresponding to the advertised value of the requested
     * module function
     *
     * On failure, throws an exception or returns an empty string.
     */
    async functionValue(functionIndex: number): Promise<string>
    {
        /** @type {YDevice} **/
        let dev = this.imm_getDev();
        if (!dev) return '';
        return dev.imm_functionValue(functionIndex);
    }

    /**
     * Returns the logical name of the module.
     *
     * @return a string corresponding to the logical name of the module
     *
     * On failure, throws an exception or returns YModule.LOGICALNAME_INVALID.
     */
    async get_logicalName(): Promise<string>
    {
        /** @type {YDevice} **/
        let dev = this.imm_getDev();
        if (dev != null && this._cache._expiration <= this._yapi.GetTickCount()) {
            return dev.getLogicalName();
        }
        /** @type {string|null} **/
        let json_val = await this._getAttr('logicalName');
        return (json_val == null ? YModule.LOGICALNAME_INVALID : json_val);
    }

    async set_logicalName(newval: string): Promise<number>
    {
        let res = await super.set_logicalName(newval);
        let dev = this.imm_getDev();
        if (dev != null) {
            dev.imm_dropCache();
        }
        return res;
    }

    imm_flattenJsonStruct_internal(jsoncomplex: Uint8Array): Uint8Array
    {
        let decoded = JSON.parse(this._yapi.imm_bin2str(jsoncomplex));
        let attrs = [];
        for (let function_name in decoded) {
            if (function_name == 'services') {
                continue;
            }
            let function_attrs = decoded[function_name];
            for (let attr_name in function_attrs) {
                let attr_value = function_attrs[attr_name];
                if (attr_value === null || typeof attr_value === 'object') {
                    continue;
                }
                let flat = function_name + '/' + attr_name + '=' + attr_value;
                attrs.push(flat);
            }
        }
        return this._yapi.imm_str2bin(JSON.stringify(attrs));
    }

    async get_subDevices_internal(): Promise<string[]>
    {
        let baseUrl: string = await this.get_url_internal();
        if (!baseUrl) {
            return [];
        }
        let hub: YGenericHub | null = null;
        let hubUrl: string = '';
        for (let i: number = 0; i < this._yapi._connectedHubs.length; i++) {
            hubUrl = this._yapi._connectedHubs[i].imm_getRootUrl();
            if (baseUrl.slice(0, hubUrl.length) == hubUrl) {
                hub = this._yapi._connectedHubs[i];
                break;
            }
        }
        if (!hub || !hubUrl) {
            return [];
        }
        let hubSerial: string = hub.serialByYdx[0];
        if (hubSerial != this._serial) {
            return [];
        }
        let res: string[] = [];
        for (let serial in this._yapi._devs) {
            let rooturl: string = this._yapi._devs[serial].imm_getRootUrl();
            if (rooturl.substr(0, hubUrl.length) == hubUrl && serial != hubSerial) {
                res.push(serial);
            }
        }
        return res;
    }

    async get_parentHub_internal(): Promise<string>
    {
        let baseUrl: string = await this.get_url_internal();
        if (!baseUrl) {
            return '';
        }
        let hub: YGenericHub | null = null;
        for (let i: number = 0; i < this._yapi._connectedHubs.length; i++) {
            let hubUrl: string = this._yapi._connectedHubs[i].imm_getRootUrl();
            if (baseUrl.slice(0, hubUrl.length) == hubUrl) {
                hub = this._yapi._connectedHubs[i];
                break;
            }
        }
        if (!hub) {
            return '';
        }
        let hubSerial: string = hub.serialByYdx[0];
        if (hubSerial == this._serial) {
            return '';
        }
        return hubSerial;
    }

    async get_url_internal(): Promise<string>
    {
        /** @type {string} **/
        let devid: string = this._serial;
        if (devid == '') {
            devid = await this.get_serialNumber();
        }
        if (devid == YAPI_INVALID_STRING) {
            return '';
        }
        let lockdev: YDevice | null = this._yapi.imm_getDevice(devid);
        if (!lockdev) {
            return '';
        }
        return lockdev.imm_getRootUrl();
    }

    async _startStopDevLog_internal(str_serial: string, bool_start: boolean): Promise<void>
    {
        let dev = this.imm_getDev();
        if (dev != null) {
            return dev.imm_registerLogCallback(this._logCallback);
        }
    }

    //--- (generated code: YModule implementation)

    imm_parseAttr(name: string, val: any): number
    {
        switch (name) {
        case 'productName':
            this._productName = <string> <string> val;
            return 1;
        case 'serialNumber':
            this._serialNumber = <string> <string> val;
            return 1;
        case 'productId':
            this._productId = <number> <number> val;
            return 1;
        case 'productRelease':
            this._productRelease = <number> <number> val;
            return 1;
        case 'firmwareRelease':
            this._firmwareRelease = <string> <string> val;
            return 1;
        case 'persistentSettings':
            this._persistentSettings = <YModule.PERSISTENTSETTINGS> <number> val;
            return 1;
        case 'luminosity':
            this._luminosity = <number> <number> val;
            return 1;
        case 'beacon':
            this._beacon = <YModule.BEACON> <number> val;
            return 1;
        case 'upTime':
            this._upTime = <number> <number> val;
            return 1;
        case 'usbCurrent':
            this._usbCurrent = <number> <number> val;
            return 1;
        case 'rebootCountdown':
            this._rebootCountdown = <number> <number> val;
            return 1;
        case 'userVar':
            this._userVar = <number> <number> val;
            return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Returns the commercial name of the module, as set by the factory.
     *
     * @return a string corresponding to the commercial name of the module, as set by the factory
     *
     * On failure, throws an exception or returns YModule.PRODUCTNAME_INVALID.
     */
    async get_productName(): Promise<string>
    {
        let res: string;
        let dev: YDevice | null;
        if (this._cacheExpiration == 0) {
            dev = this.imm_getDev();
            if (!(dev == null)) {
                return dev.imm_getProductName();
            }
            if (await this.load(this._yapi.defaultCacheValidity) != YAPI_SUCCESS) {
                return YModule.PRODUCTNAME_INVALID;
            }
        }
        res = this._productName;
        return res;
    }

    /**
     * Returns the serial number of the module, as set by the factory.
     *
     * @return a string corresponding to the serial number of the module, as set by the factory
     *
     * On failure, throws an exception or returns YModule.SERIALNUMBER_INVALID.
     */
    async get_serialNumber(): Promise<string>
    {
        let res: string;
        let dev: YDevice | null;
        if (this._cacheExpiration == 0) {
            dev = this.imm_getDev();
            if (!(dev == null)) {
                return dev.imm_getSerialNumber();
            }
            if (await this.load(this._yapi.defaultCacheValidity) != YAPI_SUCCESS) {
                return YModule.SERIALNUMBER_INVALID;
            }
        }
        res = this._serialNumber;
        return res;
    }

    /**
     * Returns the USB device identifier of the module.
     *
     * @return an integer corresponding to the USB device identifier of the module
     *
     * On failure, throws an exception or returns YModule.PRODUCTID_INVALID.
     */
    async get_productId(): Promise<number>
    {
        let res: number;
        let dev: YDevice | null;
        if (this._cacheExpiration == 0) {
            dev = this.imm_getDev();
            if (!(dev == null)) {
                return dev.imm_getProductId();
            }
            if (await this.load(this._yapi.defaultCacheValidity) != YAPI_SUCCESS) {
                return YModule.PRODUCTID_INVALID;
            }
        }
        res = this._productId;
        return res;
    }

    /**
     * Returns the release number of the module hardware, preprogrammed at the factory.
     * The original hardware release returns value 1, revision B returns value 2, etc.
     *
     * @return an integer corresponding to the release number of the module hardware, preprogrammed at the factory
     *
     * On failure, throws an exception or returns YModule.PRODUCTRELEASE_INVALID.
     */
    async get_productRelease(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration == 0) {
            if (await this.load(this._yapi.defaultCacheValidity) != YAPI_SUCCESS) {
                return YModule.PRODUCTRELEASE_INVALID;
            }
        }
        res = this._productRelease;
        return res;
    }

    /**
     * Returns the version of the firmware embedded in the module.
     *
     * @return a string corresponding to the version of the firmware embedded in the module
     *
     * On failure, throws an exception or returns YModule.FIRMWARERELEASE_INVALID.
     */
    async get_firmwareRelease(): Promise<string>
    {
        let res: string;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != YAPI_SUCCESS) {
                return YModule.FIRMWARERELEASE_INVALID;
            }
        }
        res = this._firmwareRelease;
        return res;
    }

    /**
     * Returns the current state of persistent module settings.
     *
     * @return a value among YModule.PERSISTENTSETTINGS_LOADED, YModule.PERSISTENTSETTINGS_SAVED and
     * YModule.PERSISTENTSETTINGS_MODIFIED corresponding to the current state of persistent module settings
     *
     * On failure, throws an exception or returns YModule.PERSISTENTSETTINGS_INVALID.
     */
    async get_persistentSettings(): Promise<YModule.PERSISTENTSETTINGS>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != YAPI_SUCCESS) {
                return YModule.PERSISTENTSETTINGS_INVALID;
            }
        }
        res = this._persistentSettings;
        return res;
    }

    async set_persistentSettings(newval: YModule.PERSISTENTSETTINGS): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('persistentSettings', rest_val);
    }

    /**
     * Returns the luminosity of the  module informative LEDs (from 0 to 100).
     *
     * @return an integer corresponding to the luminosity of the  module informative LEDs (from 0 to 100)
     *
     * On failure, throws an exception or returns YModule.LUMINOSITY_INVALID.
     */
    async get_luminosity(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != YAPI_SUCCESS) {
                return YModule.LUMINOSITY_INVALID;
            }
        }
        res = this._luminosity;
        return res;
    }

    /**
     * Changes the luminosity of the module informative leds. The parameter is a
     * value between 0 and 100.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : an integer corresponding to the luminosity of the module informative leds
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_luminosity(newval: number): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('luminosity', rest_val);
    }

    /**
     * Returns the state of the localization beacon.
     *
     * @return either YModule.BEACON_OFF or YModule.BEACON_ON, according to the state of the localization beacon
     *
     * On failure, throws an exception or returns YModule.BEACON_INVALID.
     */
    async get_beacon(): Promise<YModule.BEACON>
    {
        let res: number;
        let dev: YDevice | null;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            dev = this.imm_getDev();
            if (!(dev == null)) {
                return dev.imm_getBeacon();
            }
            if (await this.load(this._yapi.defaultCacheValidity) != YAPI_SUCCESS) {
                return YModule.BEACON_INVALID;
            }
        }
        res = this._beacon;
        return res;
    }

    /**
     * Turns on or off the module localization beacon.
     *
     * @param newval : either YModule.BEACON_OFF or YModule.BEACON_ON
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_beacon(newval: YModule.BEACON): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('beacon', rest_val);
    }

    /**
     * Returns the number of milliseconds spent since the module was powered on.
     *
     * @return an integer corresponding to the number of milliseconds spent since the module was powered on
     *
     * On failure, throws an exception or returns YModule.UPTIME_INVALID.
     */
    async get_upTime(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != YAPI_SUCCESS) {
                return YModule.UPTIME_INVALID;
            }
        }
        res = this._upTime;
        return res;
    }

    /**
     * Returns the current consumed by the module on the USB bus, in milli-amps.
     *
     * @return an integer corresponding to the current consumed by the module on the USB bus, in milli-amps
     *
     * On failure, throws an exception or returns YModule.USBCURRENT_INVALID.
     */
    async get_usbCurrent(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != YAPI_SUCCESS) {
                return YModule.USBCURRENT_INVALID;
            }
        }
        res = this._usbCurrent;
        return res;
    }

    /**
     * Returns the remaining number of seconds before the module restarts, or zero when no
     * reboot has been scheduled.
     *
     * @return an integer corresponding to the remaining number of seconds before the module restarts, or zero when no
     *         reboot has been scheduled
     *
     * On failure, throws an exception or returns YModule.REBOOTCOUNTDOWN_INVALID.
     */
    async get_rebootCountdown(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != YAPI_SUCCESS) {
                return YModule.REBOOTCOUNTDOWN_INVALID;
            }
        }
        res = this._rebootCountdown;
        return res;
    }

    async set_rebootCountdown(newval: number): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('rebootCountdown', rest_val);
    }

    /**
     * Returns the value previously stored in this attribute.
     * On startup and after a device reboot, the value is always reset to zero.
     *
     * @return an integer corresponding to the value previously stored in this attribute
     *
     * On failure, throws an exception or returns YModule.USERVAR_INVALID.
     */
    async get_userVar(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != YAPI_SUCCESS) {
                return YModule.USERVAR_INVALID;
            }
        }
        res = this._userVar;
        return res;
    }

    /**
     * Stores a 32 bit value in the device RAM. This attribute is at programmer disposal,
     * should he need to store a state variable.
     * On startup and after a device reboot, the value is always reset to zero.
     *
     * @param newval : an integer
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_userVar(newval: number): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('userVar', rest_val);
    }

    /**
     * Allows you to find a module from its serial number or from its logical name.
     *
     * This function does not require that the module is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YModule.isOnline() to test if the module is
     * indeed online at a given time. In case of ambiguity when looking for
     * a module by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string containing either the serial number or
     *         the logical name of the desired module
     *
     * @return a YModule object allowing you to drive the module
     *         or get additional information on the module.
     */
    static FindModule(func: string): YModule
    {
        let obj: YModule | null;
        let cleanHwId: string;
        let modpos: number;
        cleanHwId = func;
        modpos = (func).indexOf('.module');
        if (modpos != ((func).length - 7)) {
            cleanHwId = func + '.module';
        }
        obj = <YModule> YFunction._FindFromCache('Module', cleanHwId);
        if (obj == null) {
            obj = new YModule(YAPI, cleanHwId);
            YFunction._AddToCache('Module',  cleanHwId, obj);
        }
        return obj;
    }

    /**
     * Retrieves a module for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the module is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YModule.isOnline() to test if the module is
     * indeed online at a given time. In case of ambiguity when looking for
     * a module by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx : a YAPI context
     * @param func : a string that uniquely characterizes the module, for instance
     *         MyDevice.module.
     *
     * @return a YModule object allowing you to drive the module.
     */
    static FindModuleInContext(yctx: YAPIContext, func: string): YModule
    {
        let obj: YModule | null;
        let cleanHwId: string;
        let modpos: number;
        cleanHwId = func;
        modpos = (func).indexOf('.module');
        if (modpos != ((func).length - 7)) {
            cleanHwId = func + '.module';
        }
        obj = <YModule> YFunction._FindFromCacheInContext(yctx,  'Module', cleanHwId);
        if (obj == null) {
            obj = new YModule(yctx, cleanHwId);
            YFunction._AddToCache('Module',  cleanHwId, obj);
        }
        return obj;
    }

    /**
     * Registers the callback function that is invoked on every change of advertised value.
     * The callback is invoked only during the execution of ySleep or yHandleEvents.
     * This provides control over the time when the callback is triggered. For good responsiveness, remember to call
     * one of these two functions periodically. To unregister a callback, pass a null pointer as argument.
     *
     * @param callback : the callback function to call, or a null pointer. The callback function should take two
     *         arguments: the function object of which the value has changed, and the character string describing
     *         the new advertised value.
     * @noreturn
     */
    async registerValueCallback(callback: YModule.ValueCallback | null): Promise<number>
    {
        let val: string;
        if (callback != null) {
            await YFunction._UpdateValueCallbackList(this, true);
        } else {
            await YFunction._UpdateValueCallbackList(this, false);
        }
        this._valueCallbackModule = callback;
        // Immediately invoke value callback with current value
        if (callback != null && await this.isOnline()) {
            val = this._advertisedValue;
            if (!(val == '')) {
                await this._invokeValueCallback(val);
            }
        }
        return 0;
    }

    async _invokeValueCallback(value: string): Promise<number>
    {
        if (this._valueCallbackModule != null) {
            try {
                await this._valueCallbackModule(this, value);
            } catch (e) {
                this._yapi.imm_log('Exception in valueCallback:', e);
            }
        } else {
            await super._invokeValueCallback(value);
        }
        return 0;
    }

    async get_productNameAndRevision(): Promise<string>
    {
        let prodname: string;
        let prodrel: number;
        let fullname: string;

        prodname = await this.get_productName();
        prodrel = await this.get_productRelease();
        if (prodrel > 1) {
            fullname = prodname + ' rev. ' + String.fromCharCode(64 + prodrel);
        } else {
            fullname = prodname;
        }
        return fullname;
    }

    /**
     * Saves current settings in the nonvolatile memory of the module.
     * Warning: the number of allowed save operations during a module life is
     * limited (about 100000 cycles). Do not call this function within a loop.
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async saveToFlash(): Promise<number>
    {
        return await this.set_persistentSettings(YModule.PERSISTENTSETTINGS.SAVED);
    }

    /**
     * Reloads the settings stored in the nonvolatile memory, as
     * when the module is powered on.
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async revertFromFlash(): Promise<number>
    {
        return await this.set_persistentSettings(YModule.PERSISTENTSETTINGS.LOADED);
    }

    /**
     * Schedules a simple module reboot after the given number of seconds.
     *
     * @param secBeforeReboot : number of seconds before rebooting
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async reboot(secBeforeReboot: number): Promise<number>
    {
        return await this.set_rebootCountdown(secBeforeReboot);
    }

    /**
     * Schedules a module reboot into special firmware update mode.
     *
     * @param secBeforeReboot : number of seconds before rebooting
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async triggerFirmwareUpdate(secBeforeReboot: number): Promise<number>
    {
        return await this.set_rebootCountdown(-secBeforeReboot);
    }

    async _startStopDevLog(serial: string, start: boolean): Promise<void>
    {
        return await this._startStopDevLog_internal(serial, start);
    }

    /**
     * Registers a device log callback function. This callback will be called each time
     * that a module sends a new log message. Mostly useful to debug a Yoctopuce module.
     *
     * @param callback : the callback function to call, or a null pointer.
     *         The callback function should take two
     *         arguments: the module object that emitted the log message,
     *         and the character string containing the log.
     *         On failure, throws an exception or returns a negative error code.
     */
    async registerLogCallback(callback: YModule.LogCallback | null): Promise<number>
    {
        let serial: string;

        serial = await this.get_serialNumber();
        if (serial == YAPI_INVALID_STRING) {
            return YAPI_DEVICE_NOT_FOUND;
        }
        this._logCallback = callback;
        await this._startStopDevLog(serial, callback != null);
        return 0;
    }

    async get_logCallback(): Promise<YModule.LogCallback | null>
    {
        return this._logCallback;
    }

    /**
     * Register a callback function, to be called when a persistent settings in
     * a device configuration has been changed (e.g. change of unit, etc).
     *
     * @param callback : a procedure taking a YModule parameter, or null
     *         to unregister a previously registered  callback.
     */
    async registerConfigChangeCallback(callback: YModule.ConfigChangeCallback | null): Promise<number>
    {
        if (callback != null) {
            await YModule._updateModuleCallbackList(this, true);
        } else {
            await YModule._updateModuleCallbackList(this, false);
        }
        this._confChangeCallback = callback;
        return 0;
    }

    async _invokeConfigChangeCallback(): Promise<number>
    {
        if (this._confChangeCallback != null) {
            try {
                await this._confChangeCallback(this);
            } catch (e) {
                this._yapi.imm_log('Exception in configChangeCallback:', e);
            }
        }
        return 0;
    }

    /**
     * Register a callback function, to be called when the localization beacon of the module
     * has been changed. The callback function should take two arguments: the YModule object of
     * which the beacon has changed, and an integer describing the new beacon state.
     *
     * @param callback : The callback function to call, or null to unregister a
     *         previously registered callback.
     */
    async registerBeaconCallback(callback: YModule.BeaconCallback | null): Promise<number>
    {
        if (callback != null) {
            await YModule._updateModuleCallbackList(this, true);
        } else {
            await YModule._updateModuleCallbackList(this, false);
        }
        this._beaconCallback = callback;
        return 0;
    }

    async _invokeBeaconCallback(beaconState: number): Promise<number>
    {
        if (this._beaconCallback != null) {
            try {
                await this._beaconCallback(this, beaconState);
            } catch (e) {
                this._yapi.imm_log('Exception in beaconCallback:', e);
            }
        }
        return 0;
    }

    /**
     * Triggers a configuration change callback, to check if they are supported or not.
     */
    async triggerConfigChangeCallback(): Promise<number>
    {
        await this._setAttr('persistentSettings', '2');
        return 0;
    }

    /**
     * Tests whether the byn file is valid for this module. This method is useful to test if the module
     * needs to be updated.
     * It is possible to pass a directory as argument instead of a file. In this case, this method returns
     * the path of the most recent
     * appropriate .byn file. If the parameter onlynew is true, the function discards firmwares that are older or
     * equal to the installed firmware.
     *
     * @param path : the path of a byn file or a directory that contains byn files
     * @param onlynew : returns only files that are strictly newer
     *
     * @return the path of the byn file to use or a empty string if no byn files matches the requirement
     *
     * On failure, throws an exception or returns a string that start with "error:".
     */
    async checkFirmware(path: string, onlynew: boolean): Promise<string>
    {
        let serial: string;
        let release: number;
        let tmp_res: string;
        if (onlynew) {
            release = YAPIContext.imm_atoi(await this.get_firmwareRelease());
        } else {
            release = 0;
        }
        //may throw an exception
        serial = await this.get_serialNumber();
        tmp_res = await YFirmwareUpdate.CheckFirmware(serial,  path, release);
        if ((tmp_res).indexOf('error:') == 0) {
            this._throw(YAPI_INVALID_ARGUMENT, tmp_res);
        }
        return tmp_res;
    }

    /**
     * Prepares a firmware update of the module. This method returns a YFirmwareUpdate object which
     * handles the firmware update process.
     *
     * @param path : the path of the .byn file to use.
     * @param force : true to force the firmware update even if some prerequisites appear not to be met
     *
     * @return a YFirmwareUpdate object or NULL on error.
     */
    async updateFirmwareEx(path: string, force: boolean): Promise<YFirmwareUpdate>
    {
        let serial: string;
        let settings: Uint8Array;

        serial = await this.get_serialNumber();
        settings = await this.get_allSettings();
        if ((settings).length == 0) {
            this._throw(YAPI_IO_ERROR, 'Unable to get device settings');
            settings = this._yapi.imm_str2bin('error:Unable to get device settings');
        }
        return new YFirmwareUpdate(this._yapi, serial, path, settings, force);
    }

    /**
     * Prepares a firmware update of the module. This method returns a YFirmwareUpdate object which
     * handles the firmware update process.
     *
     * @param path : the path of the .byn file to use.
     *
     * @return a YFirmwareUpdate object or NULL on error.
     */
    async updateFirmware(path: string): Promise<YFirmwareUpdate>
    {
        return await this.updateFirmwareEx(path, false);
    }

    /**
     * Returns all the settings and uploaded files of the module. Useful to backup all the
     * logical names, calibrations parameters, and uploaded files of a device.
     *
     * @return a binary buffer with all the settings.
     *
     * On failure, throws an exception or returns an binary object of size 0.
     */
    async get_allSettings(): Promise<Uint8Array>
    {
        let settings: Uint8Array;
        let json: Uint8Array;
        let res: Uint8Array;
        let sep: string;
        let name: string;
        let item: string;
        let t_type: string;
        let id: string;
        let url: string;
        let file_data: string;
        let file_data_bin: Uint8Array;
        let temp_data_bin: Uint8Array;
        let ext_settings: string;
        let filelist: string[] = [];
        let templist: string[] = [];

        settings = await this._download('api.json');
        if ((settings).length == 0) {
            return settings;
        }
        ext_settings = ', "extras":[';
        templist = await this.get_functionIds('Temperature');
        sep = '';
        for (let ii in templist) {
            if (YAPIContext.imm_atoi(await this.get_firmwareRelease()) > 9000) {
                url = 'api/' + templist[ii] + '/sensorType';
                t_type = this._yapi.imm_bin2str(await this._download(url));
                if (t_type == 'RES_NTC' || t_type == 'RES_LINEAR') {
                    id = (templist[ii]).substr(11, (templist[ii]).length - 11);
                    if (id == '') {
                        id = '1';
                    }
                    temp_data_bin = await this._download('extra.json?page=' + id);
                    if ((temp_data_bin).length > 0) {
                        item = sep + '{"fid":"' + templist[ii] + '", "json":' + this._yapi.imm_bin2str(temp_data_bin) + '}\n';
                        ext_settings = ext_settings + item;
                        sep = ',';
                    }
                }
            }
        }
        ext_settings = ext_settings + '],\n"files":[';
        if (await this.hasFunction('files')) {
            json = await this._download('files.json?a=dir&f=');
            if ((json).length == 0) {
                return json;
            }
            filelist = this.imm_json_get_array(json);
            sep = '';
            for (let ii in filelist) {
                name = this.imm_json_get_key(this._yapi.imm_str2bin(filelist[ii]), 'name');
                if (((name).length > 0) && !(name == 'startupConf.json')) {
                    file_data_bin = await this._download(this.imm_escapeAttr(name));
                    file_data = this._yapi.imm_bin2hexstr(file_data_bin);
                    item = sep + '{"name":"' + name + '", "data":"' + file_data + '"}\n';
                    ext_settings = ext_settings + item;
                    sep = ',';
                }
            }
        }
        res = this._yapi.imm_str2bin('{ "api":' + this._yapi.imm_bin2str(settings) + ext_settings + ']}');
        return res;
    }

    async loadThermistorExtra(funcId: string, jsonExtra: string): Promise<number>
    {
        let values: string[] = [];
        let url: string;
        let curr: string;
        let currTemp: string;
        let ofs: number;
        let size: number;
        url = 'api/' + funcId + '.json?command=Z';

        await this._download(url);
        // add records in growing resistance value
        values = this.imm_json_get_array(this._yapi.imm_str2bin(jsonExtra));
        ofs = 0;
        size = values.length;
        while (ofs + 1 < size) {
            curr = values[ofs];
            currTemp = values[ofs + 1];
            url = 'api/' + funcId + '.json?command=m' + curr + ':' + currTemp;
            await this._download(url);
            ofs = ofs + 2;
        }
        return YAPI_SUCCESS;
    }

    async set_extraSettings(jsonExtra: string): Promise<number>
    {
        let extras: string[] = [];
        let functionId: string;
        let data: string;
        extras = this.imm_json_get_array(this._yapi.imm_str2bin(jsonExtra));
        for (let ii in extras) {
            functionId = this.imm_get_json_path(extras[ii], 'fid');
            functionId = this.imm_decode_json_string(functionId);
            data = this.imm_get_json_path(extras[ii], 'json');
            if (await this.hasFunction(functionId)) {
                await this.loadThermistorExtra(functionId, data);
            }
        }
        return YAPI_SUCCESS;
    }

    /**
     * Restores all the settings and uploaded files to the module.
     * This method is useful to restore all the logical names and calibrations parameters,
     * uploaded files etc. of a device from a backup.
     * Remember to call the saveToFlash() method of the module if the
     * modifications must be kept.
     *
     * @param settings : a binary buffer with all the settings.
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_allSettingsAndFiles(settings: Uint8Array): Promise<number>
    {
        let down: Uint8Array;
        let json: string;
        let json_api: string;
        let json_files: string;
        let json_extra: string;
        let fuperror: number;
        let globalres: number;
        fuperror = 0;
        json = this._yapi.imm_bin2str(settings);
        json_api = this.imm_get_json_path(json, 'api');
        if (json_api == '') {
            return await this.set_allSettings(settings);
        }
        json_extra = this.imm_get_json_path(json, 'extras');
        if (!(json_extra == '')) {
            await this.set_extraSettings(json_extra);
        }
        await this.set_allSettings(this._yapi.imm_str2bin(json_api));
        if (await this.hasFunction('files')) {
            let files: string[] = [];
            let res: string;
            let name: string;
            let data: string;
            down = await this._download('files.json?a=format');
            res = this.imm_get_json_path(this._yapi.imm_bin2str(down), 'res');
            res = this.imm_decode_json_string(res);
            if (!(res == 'ok')) {
                return this._throw(YAPI_IO_ERROR, 'format failed', YAPI_IO_ERROR);
            }
            json_files = this.imm_get_json_path(json, 'files');
            files = this.imm_json_get_array(this._yapi.imm_str2bin(json_files));
            for (let ii in files) {
                name = this.imm_get_json_path(files[ii], 'name');
                name = this.imm_decode_json_string(name);
                data = this.imm_get_json_path(files[ii], 'data');
                data = this.imm_decode_json_string(data);
                if (name == '') {
                    fuperror = fuperror + 1;
                } else {
                    await this._upload(name, this._yapi.imm_hexstr2bin(data));
                }
            }
        }
        // Apply settings a second time for file-dependent settings and dynamic sensor nodes
        globalres = await this.set_allSettings(this._yapi.imm_str2bin(json_api));
        if (!(fuperror == 0)) {
            return this._throw(YAPI_IO_ERROR, 'Error during file upload', YAPI_IO_ERROR);
        }
        return globalres;
    }

    /**
     * Tests if the device includes a specific function. This method takes a function identifier
     * and returns a boolean.
     *
     * @param funcId : the requested function identifier
     *
     * @return true if the device has the function identifier
     */
    async hasFunction(funcId: string): Promise<boolean>
    {
        let count: number;
        let i: number;
        let fid: string;

        count = await this.functionCount();
        i = 0;
        while (i < count) {
            fid = await this.functionId(i);
            if (fid == funcId) {
                return true;
            }
            i = i + 1;
        }
        return false;
    }

    /**
     * Retrieve all hardware identifier that match the type passed in argument.
     *
     * @param funType : The type of function (Relay, LightSensor, Voltage,...)
     *
     * @return an array of strings.
     */
    async get_functionIds(funType: string): Promise<string[]>
    {
        let count: number;
        let i: number;
        let ftype: string;
        let res: string[] = [];

        count = await this.functionCount();
        i = 0;
        while (i < count) {
            ftype = await this.functionType(i);
            if (ftype == funType) {
                res.push(await this.functionId(i));
            } else {
                ftype = await this.functionBaseType(i);
                if (ftype == funType) {
                    res.push(await this.functionId(i));
                }
            }
            i = i + 1;
        }
        return res;
    }

    imm_flattenJsonStruct(jsoncomplex: Uint8Array): Uint8Array
    {
        return this.imm_flattenJsonStruct_internal(jsoncomplex);
    }

    async calibVersion(cparams: string): Promise<number>
    {
        if (cparams == '0,') {
            return 3;
        }
        if ((cparams).indexOf(',') >= 0) {
            if ((cparams).indexOf(' ') > 0) {
                return 3;
            } else {
                return 1;
            }
        }
        if (cparams == '' || cparams == '0') {
            return 1;
        }
        if (((cparams).length < 2) || ((cparams).indexOf('.') >= 0)) {
            return 0;
        } else {
            return 2;
        }
    }

    async calibScale(unit_name: string, sensorType: string): Promise<number>
    {
        if (unit_name == 'g' || unit_name == 'gauss' || unit_name == 'W') {
            return 1000;
        }
        if (unit_name == 'C') {
            if (sensorType == '') {
                return 16;
            }
            if (YAPIContext.imm_atoi(sensorType) < 8) {
                return 16;
            } else {
                return 100;
            }
        }
        if (unit_name == 'm' || unit_name == 'deg') {
            return 10;
        }
        return 1;
    }

    async calibOffset(unit_name: string): Promise<number>
    {
        if (unit_name == '% RH' || unit_name == 'mbar' || unit_name == 'lx') {
            return 0;
        }
        return 32767;
    }

    async calibConvert(param: string, currentFuncValue: string, unit_name: string, sensorType: string): Promise<string>
    {
        let paramVer: number;
        let funVer: number;
        let funScale: number;
        let funOffset: number;
        let paramScale: number;
        let paramOffset: number;
        let words: number[] = [];
        let words_str: string[] = [];
        let calibData: number[] = [];
        let iCalib: number[] = [];
        let calibType: number;
        let i: number;
        let maxSize: number;
        let ratio: number;
        let nPoints: number;
        let wordVal: number;
        // Initial guess for parameter encoding
        paramVer = await this.calibVersion(param);
        funVer = await this.calibVersion(currentFuncValue);
        funScale = await this.calibScale(unit_name, sensorType);
        funOffset = await this.calibOffset(unit_name);
        paramScale = funScale;
        paramOffset = funOffset;
        if (funVer < 3) {
            // Read the effective device scale if available
            if (funVer == 2) {
                words = this._yapi.imm_decodeWords(currentFuncValue);
                if ((words[0] == 1366) && (words[1] == 12500)) {
                    // Yocto-3D RefFrame used a special encoding
                    funScale = 1;
                    funOffset = 0;
                } else {
                    funScale = words[1];
                    funOffset = words[0];
                }
            } else {
                if (funVer == 1) {
                    if (currentFuncValue == '' || (YAPIContext.imm_atoi(currentFuncValue) > 10)) {
                        funScale = 0;
                    }
                }
            }
        }
        calibData.length = 0;
        calibType = 0;
        if (paramVer < 3) {
            // Handle old 16 bit parameters formats
            if (paramVer == 2) {
                words = this._yapi.imm_decodeWords(param);
                if ((words[0] == 1366) && (words[1] == 12500)) {
                    // Yocto-3D RefFrame used a special encoding
                    paramScale = 1;
                    paramOffset = 0;
                } else {
                    paramScale = words[1];
                    paramOffset = words[0];
                }
                if ((words.length >= 3) && (words[2] > 0)) {
                    maxSize = 3 + 2 * ((words[2]) % (10));
                    if (maxSize > words.length) {
                        maxSize = words.length;
                    }
                    i = 3;
                    while (i < maxSize) {
                        calibData.push(<number> words[i]);
                        i = i + 1;
                    }
                }
            } else {
                if (paramVer == 1) {
                    words_str = (param).split(',');
                    for (let ii in words_str) {
                        words.push(YAPIContext.imm_atoi(words_str[ii]));
                    }
                    if (param == '' || (words[0] > 10)) {
                        paramScale = 0;
                    }
                    if ((words.length > 0) && (words[0] > 0)) {
                        maxSize = 1 + 2 * ((words[0]) % (10));
                        if (maxSize > words.length) {
                            maxSize = words.length;
                        }
                        i = 1;
                        while (i < maxSize) {
                            calibData.push(<number> words[i]);
                            i = i + 1;
                        }
                    }
                } else {
                    if (paramVer == 0) {
                        ratio = YAPIContext.imm_atof(param);
                        if (ratio > 0) {
                            calibData.push(0.0);
                            calibData.push(0.0);
                            calibData.push(Math.round(65535 / ratio));
                            calibData.push(65535.0);
                        }
                    }
                }
            }
            i = 0;
            while (i < calibData.length) {
                if (paramScale > 0) {
                    // scalar decoding
                    calibData[i] = (calibData[i] - paramOffset) / paramScale;
                } else {
                    // floating-point decoding
                    calibData[i] = this._yapi.imm_decimalToDouble(<number> Math.round(calibData[i]));
                }
                i = i + 1;
            }
        } else {
            // Handle latest 32bit parameter format
            iCalib = this._yapi.imm_decodeFloats(param);
            calibType = <number> Math.round(iCalib[0] / 1000.0);
            if (calibType >= 30) {
                calibType = calibType - 30;
            }
            i = 1;
            while (i < iCalib.length) {
                calibData.push(iCalib[i] / 1000.0);
                i = i + 1;
            }
        }
        if (funVer >= 3) {
            // Encode parameters in new format
            if (calibData.length == 0) {
                param = '0,';
            } else {
                param = (30 + calibType).toString();
                i = 0;
                while (i < calibData.length) {
                    if (((i) & (1)) > 0) {
                        param = param + ':';
                    } else {
                        param = param + ' ';
                    }
                    param = param + (<number> Math.round(calibData[i] * 1000.0 / 1000.0)).toString();
                    i = i + 1;
                }
                param = param + ',';
            }
        } else {
            if (funVer >= 1) {
                // Encode parameters for older devices
                nPoints = (((calibData.length) / (2)) >> 0);
                param = (nPoints).toString();
                i = 0;
                while (i < 2 * nPoints) {
                    if (funScale == 0) {
                        wordVal = this._yapi.imm_doubleToDecimal(<number> Math.round(calibData[i]));
                    } else {
                        wordVal = calibData[i] * funScale + funOffset;
                    }
                    param = param + ',' + (Math.round(wordVal)).toString();
                    i = i + 1;
                }
            } else {
                // Initial V0 encoding used for old Yocto-Light
                if (calibData.length == 4) {
                    param = (Math.round(1000 * (calibData[3] - calibData[1]) / calibData[2] - calibData[0])).toString();
                }
            }
        }
        return param;
    }

    async _tryExec(url: string): Promise<number>
    {
        let res: number;
        let done: number;
        res = YAPI_SUCCESS;
        done = 1;
        try {
            await this._download(url);
        } catch (e) {
            done = 0;
        }
        if (done == 0) {
            // retry silently after a short wait
            try {
                await YAPI.Sleep(500);
                await this._download(url);
            } catch (e) {
                // second failure, return error code
                res = await this.get_errorType();
            }
        }
        return res;
    }

    /**
     * Restores all the settings of the device. Useful to restore all the logical names and calibrations parameters
     * of a module from a backup.Remember to call the saveToFlash() method of the module if the
     * modifications must be kept.
     *
     * @param settings : a binary buffer with all the settings.
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_allSettings(settings: Uint8Array): Promise<number>
    {
        let restoreLast: string[] = [];
        let old_json_flat: Uint8Array;
        let old_dslist: string[] = [];
        let old_jpath: string[] = [];
        let old_jpath_len: number[] = [];
        let old_val_arr: string[] = [];
        let actualSettings: Uint8Array;
        let new_dslist: string[] = [];
        let new_jpath: string[] = [];
        let new_jpath_len: number[] = [];
        let new_val_arr: string[] = [];
        let cpos: number;
        let eqpos: number;
        let leng: number;
        let i: number;
        let j: number;
        let subres: number;
        let res: number;
        let njpath: string;
        let jpath: string;
        let fun: string;
        let attr: string;
        let value: string;
        let url: string;
        let tmp: string;
        let new_calib: string;
        let sensorType: string;
        let unit_name: string;
        let newval: string;
        let oldval: string;
        let old_calib: string;
        let each_str: string;
        let do_update: boolean;
        let found: boolean;
        res = YAPI_SUCCESS;
        tmp = this._yapi.imm_bin2str(settings);
        tmp = this.imm_get_json_path(tmp, 'api');
        if (!(tmp == '')) {
            settings = this._yapi.imm_str2bin(tmp);
        }
        oldval = '';
        newval = '';
        old_json_flat = this.imm_flattenJsonStruct(settings);
        old_dslist = this.imm_json_get_array(old_json_flat);
        for (let ii in old_dslist) {
            each_str = this.imm_json_get_string(this._yapi.imm_str2bin(old_dslist[ii]));
            // split json path and attr
            leng = (each_str).length;
            eqpos = (each_str).indexOf('=');
            if ((eqpos < 0) || (leng == 0)) {
                this._throw(YAPI_INVALID_ARGUMENT, 'Invalid settings');
                return YAPI_INVALID_ARGUMENT;
            }
            jpath = (each_str).substr(0, eqpos);
            eqpos = eqpos + 1;
            value = (each_str).substr(eqpos, leng - eqpos);
            old_jpath.push(jpath);
            old_jpath_len.push((jpath).length);
            old_val_arr.push(value);
        }

        try {
            actualSettings = await this._download('api.json');
        } catch (e) {
            // retry silently after a short wait
            await YAPI.Sleep(500);
            actualSettings = await this._download('api.json');
        }
        actualSettings = this.imm_flattenJsonStruct(actualSettings);
        new_dslist = this.imm_json_get_array(actualSettings);
        for (let ii in new_dslist) {
            // remove quotes
            each_str = this.imm_json_get_string(this._yapi.imm_str2bin(new_dslist[ii]));
            // split json path and attr
            leng = (each_str).length;
            eqpos = (each_str).indexOf('=');
            if ((eqpos < 0) || (leng == 0)) {
                this._throw(YAPI_INVALID_ARGUMENT, 'Invalid settings');
                return YAPI_INVALID_ARGUMENT;
            }
            jpath = (each_str).substr(0, eqpos);
            eqpos = eqpos + 1;
            value = (each_str).substr(eqpos, leng - eqpos);
            new_jpath.push(jpath);
            new_jpath_len.push((jpath).length);
            new_val_arr.push(value);
        }
        i = 0;
        while (i < new_jpath.length) {
            njpath = new_jpath[i];
            leng = (njpath).length;
            cpos = (njpath).indexOf('/');
            if ((cpos < 0) || (leng == 0)) {
                continue;
            }
            fun = (njpath).substr(0, cpos);
            cpos = cpos + 1;
            attr = (njpath).substr(cpos, leng - cpos);
            do_update = true;
            if (fun == 'services') {
                do_update = false;
            }
            if ((do_update) && (attr == 'firmwareRelease')) {
                do_update = false;
            }
            if ((do_update) && (attr == 'usbCurrent')) {
                do_update = false;
            }
            if ((do_update) && (attr == 'upTime')) {
                do_update = false;
            }
            if ((do_update) && (attr == 'persistentSettings')) {
                do_update = false;
            }
            if ((do_update) && (attr == 'adminPassword')) {
                do_update = false;
            }
            if ((do_update) && (attr == 'userPassword')) {
                do_update = false;
            }
            if ((do_update) && (attr == 'rebootCountdown')) {
                do_update = false;
            }
            if ((do_update) && (attr == 'advertisedValue')) {
                do_update = false;
            }
            if ((do_update) && (attr == 'poeCurrent')) {
                do_update = false;
            }
            if ((do_update) && (attr == 'readiness')) {
                do_update = false;
            }
            if ((do_update) && (attr == 'ipAddress')) {
                do_update = false;
            }
            if ((do_update) && (attr == 'subnetMask')) {
                do_update = false;
            }
            if ((do_update) && (attr == 'router')) {
                do_update = false;
            }
            if ((do_update) && (attr == 'linkQuality')) {
                do_update = false;
            }
            if ((do_update) && (attr == 'ssid')) {
                do_update = false;
            }
            if ((do_update) && (attr == 'channel')) {
                do_update = false;
            }
            if ((do_update) && (attr == 'security')) {
                do_update = false;
            }
            if ((do_update) && (attr == 'message')) {
                do_update = false;
            }
            if ((do_update) && (attr == 'signalValue')) {
                do_update = false;
            }
            if ((do_update) && (attr == 'currentValue')) {
                do_update = false;
            }
            if ((do_update) && (attr == 'currentRawValue')) {
                do_update = false;
            }
            if ((do_update) && (attr == 'currentRunIndex')) {
                do_update = false;
            }
            if ((do_update) && (attr == 'pulseTimer')) {
                do_update = false;
            }
            if ((do_update) && (attr == 'lastTimePressed')) {
                do_update = false;
            }
            if ((do_update) && (attr == 'lastTimeReleased')) {
                do_update = false;
            }
            if ((do_update) && (attr == 'filesCount')) {
                do_update = false;
            }
            if ((do_update) && (attr == 'freeSpace')) {
                do_update = false;
            }
            if ((do_update) && (attr == 'timeUTC')) {
                do_update = false;
            }
            if ((do_update) && (attr == 'rtcTime')) {
                do_update = false;
            }
            if ((do_update) && (attr == 'unixTime')) {
                do_update = false;
            }
            if ((do_update) && (attr == 'dateTime')) {
                do_update = false;
            }
            if ((do_update) && (attr == 'rawValue')) {
                do_update = false;
            }
            if ((do_update) && (attr == 'lastMsg')) {
                do_update = false;
            }
            if ((do_update) && (attr == 'delayedPulseTimer')) {
                do_update = false;
            }
            if ((do_update) && (attr == 'rxCount')) {
                do_update = false;
            }
            if ((do_update) && (attr == 'txCount')) {
                do_update = false;
            }
            if ((do_update) && (attr == 'msgCount')) {
                do_update = false;
            }
            if ((do_update) && (attr == 'rxMsgCount')) {
                do_update = false;
            }
            if ((do_update) && (attr == 'txMsgCount')) {
                do_update = false;
            }
            if (do_update) {
                do_update = false;
                newval = new_val_arr[i];
                j = 0;
                found = false;
                while ((j < old_jpath.length) && !(found)) {
                    if ((new_jpath_len[i] == old_jpath_len[j]) && (new_jpath[i] == old_jpath[j])) {
                        found = true;
                        oldval = old_val_arr[j];
                        if (!(newval == oldval)) {
                            do_update = true;
                        }
                    }
                    j = j + 1;
                }
            }
            if (do_update) {
                if (attr == 'calibrationParam') {
                    old_calib = '';
                    unit_name = '';
                    sensorType = '';
                    new_calib = newval;
                    j = 0;
                    found = false;
                    while ((j < old_jpath.length) && !(found)) {
                        if ((new_jpath_len[i] == old_jpath_len[j]) && (new_jpath[i] == old_jpath[j])) {
                            found = true;
                            old_calib = old_val_arr[j];
                        }
                        j = j + 1;
                    }
                    tmp = fun + '/unit';
                    j = 0;
                    found = false;
                    while ((j < new_jpath.length) && !(found)) {
                        if (tmp == new_jpath[j]) {
                            found = true;
                            unit_name = new_val_arr[j];
                        }
                        j = j + 1;
                    }
                    tmp = fun + '/sensorType';
                    j = 0;
                    found = false;
                    while ((j < new_jpath.length) && !(found)) {
                        if (tmp == new_jpath[j]) {
                            found = true;
                            sensorType = new_val_arr[j];
                        }
                        j = j + 1;
                    }
                    newval = await this.calibConvert(old_calib,  new_val_arr[i],  unit_name, sensorType);
                    url = 'api/' + fun + '.json?' + attr + '=' + this.imm_escapeAttr(newval);
                    subres = await this._tryExec(url);
                    if ((res == YAPI_SUCCESS) && (subres != YAPI_SUCCESS)) {
                        res = subres;
                    }
                } else {
                    url = 'api/' + fun + '.json?' + attr + '=' + this.imm_escapeAttr(oldval);
                    if (attr == 'resolution') {
                        restoreLast.push(url);
                    } else {
                        subres = await this._tryExec(url);
                        if ((res == YAPI_SUCCESS) && (subres != YAPI_SUCCESS)) {
                            res = subres;
                        }
                    }
                }
            }
            i = i + 1;
        }
        for (let ii in restoreLast) {
            subres = await this._tryExec(restoreLast[ii]);
            if ((res == YAPI_SUCCESS) && (subres != YAPI_SUCCESS)) {
                res = subres;
            }
        }
        await this.clearCache();
        return res;
    }

    /**
     * Adds a file to the uploaded data at the next HTTP callback.
     * This function only affects the next HTTP callback and only works in
     * HTTP callback mode.
     *
     * @param filename : the name of the file to upload at the next HTTP callback
     *
     * @return nothing.
     */
    async addFileToHTTPCallback(filename: string): Promise<number>
    {
        let content: Uint8Array;

        content = await this._download('@YCB+' + filename);
        if ((content).length == 0) {
            return YAPI_NOT_SUPPORTED;
        }
        return YAPI_SUCCESS;
    }

    /**
     * Returns the unique hardware identifier of the module.
     * The unique hardware identifier is made of the device serial
     * number followed by string ".module".
     *
     * @return a string that uniquely identifies the module
     */
    async get_hardwareId(): Promise<string>
    {
        let serial: string;

        serial = await this.get_serialNumber();
        return serial + '.module';
    }

    /**
     * Downloads the specified built-in file and returns a binary buffer with its content.
     *
     * @param pathname : name of the new file to load
     *
     * @return a binary buffer with the file content
     *
     * On failure, throws an exception or returns  YAPI.INVALID_STRING.
     */
    async download(pathname: string): Promise<Uint8Array>
    {
        return await this._download(pathname);
    }

    /**
     * Returns the icon of the module. The icon is a PNG image and does not
     * exceeds 1536 bytes.
     *
     * @return a binary buffer with module icon, in png format.
     *         On failure, throws an exception or returns  YAPI.INVALID_STRING.
     */
    async get_icon2d(): Promise<Uint8Array>
    {
        return await this._download('icon2d.png');
    }

    /**
     * Returns a string with last logs of the module. This method return only
     * logs that are still in the module.
     *
     * @return a string with last logs of the module.
     *         On failure, throws an exception or returns  YAPI.INVALID_STRING.
     */
    async get_lastLogs(): Promise<string>
    {
        let content: Uint8Array;

        content = await this._download('logs.txt');
        return this._yapi.imm_bin2str(content);
    }

    /**
     * Adds a text message to the device logs. This function is useful in
     * particular to trace the execution of HTTP callbacks. If a newline
     * is desired after the message, it must be included in the string.
     *
     * @param text : the string to append to the logs.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async log(text: string): Promise<number>
    {
        return await this._upload('logs.txt', this._yapi.imm_str2bin(text));
    }

    /**
     * Returns a list of all the modules that are plugged into the current module.
     * This method only makes sense when called for a YoctoHub/VirtualHub.
     * Otherwise, an empty array will be returned.
     *
     * @return an array of strings containing the sub modules.
     */
    async get_subDevices(): Promise<string[]>
    {
        return await this.get_subDevices_internal();
    }

    /**
     * Returns the serial number of the YoctoHub on which this module is connected.
     * If the module is connected by USB, or if the module is the root YoctoHub, an
     * empty string is returned.
     *
     * @return a string with the serial number of the YoctoHub or an empty string
     */
    async get_parentHub(): Promise<string>
    {
        return await this.get_parentHub_internal();
    }

    /**
     * Returns the URL used to access the module. If the module is connected by USB, the
     * string 'usb' is returned.
     *
     * @return a string with the URL of the module.
     */
    async get_url(): Promise<string>
    {
        return await this.get_url_internal();
    }

    /**
     * Continues the module enumeration started using yFirstModule().
     * Caution: You can't make any assumption about the returned modules order.
     * If you want to find a specific module, use Module.findModule()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YModule object, corresponding to
     *         the next module found, or a null pointer
     *         if there are no more modules to enumerate.
     */
    nextModule(): YModule | null
    {
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != YAPI.SUCCESS) return null;
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, <string> resolve.result);
        if (next_hwid == null) return null;
        return YModule.FindModuleInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of modules currently accessible.
     * Use the method YModule.nextModule() to iterate on the
     * next modules.
     *
     * @return a pointer to a YModule object, corresponding to
     *         the first module currently online, or a null pointer
     *         if there are none.
     */
    static FirstModule(): YModule | null
    {
        let next_hwid = YAPI.imm_getFirstHardwareId('Module');
        if (next_hwid == null) return null;
        return YModule.FindModule(next_hwid);
    }

    /**
     * Retrieves the first Module in a given context
     *
     * @param yctx {YAPIContext}
     *
     * @returns {YModule}
     */
    static FirstModuleInContext(yctx: YAPIContext): YModule | null
    {
        let next_hwid = yctx.imm_getFirstHardwareId('Module');
        if (next_hwid == null) return null;
        return YModule.FindModuleInContext(yctx, next_hwid);
    }

    //--- (end of generated code: YModule implementation)
}

export namespace YModule
{
    export interface LogCallback {(module: YModule, msg: string): void}

    export interface ConfigChangeCallback {(module: YModule): void}

    export interface BeaconCallback {(module: YModule, beacon: number): void}

    //--- (generated code: YModule definitions)
    export const enum PERSISTENTSETTINGS
    {
        LOADED = 0,
        SAVED = 1,
        MODIFIED = 2,
        INVALID = -1
    }

    export const enum BEACON
    {
        OFF = 0,
        ON = 1,
        INVALID = -1
    }

    export interface ValueCallback {(func: YModule, value: string): void}

    //--- (end of generated code: YModule definitions)
}

//--- (generated code: YSensor class start)
/**
 * YSensor Class: Sensor function interface.
 *
 * The YSensor class is the parent class for all Yoctopuce sensor types. It can be
 * used to read the current value and unit of any sensor, read the min/max
 * value, configure autonomous recording frequency and access recorded data.
 * It also provide a function to register a callback invoked each time the
 * observed value changes, or at a predefined interval. Using this class rather
 * than a specific subclass makes it possible to create generic applications
 * that work with any Yoctopuce sensor, even those that do not yet exist.
 * Note: The YAnButton class is the only analog input which does not inherit
 * from YSensor.
 */
//--- (end of generated code: YSensor class start)
export class YSensor extends YFunction
{
    //--- (generated code: YSensor attributes declaration)
    _className: string;
    _unit: string = YSensor.UNIT_INVALID;
    _currentValue: number = YSensor.CURRENTVALUE_INVALID;
    _lowestValue: number = YSensor.LOWESTVALUE_INVALID;
    _highestValue: number = YSensor.HIGHESTVALUE_INVALID;
    _currentRawValue: number = YSensor.CURRENTRAWVALUE_INVALID;
    _logFrequency: string = YSensor.LOGFREQUENCY_INVALID;
    _reportFrequency: string = YSensor.REPORTFREQUENCY_INVALID;
    _advMode: YSensor.ADVMODE = YSensor.ADVMODE_INVALID;
    _calibrationParam: string = YSensor.CALIBRATIONPARAM_INVALID;
    _resolution: number = YSensor.RESOLUTION_INVALID;
    _sensorState: number = YSensor.SENSORSTATE_INVALID;
    _valueCallbackSensor: YSensor.ValueCallback | null = null;
    _timedReportCallbackSensor: YSensor.TimedReportCallback | null = null;
    _prevTimedReport: number = 0;
    _iresol: number = 0;
    _offset: number = 0;
    _scale: number = 0;
    _decexp: number = 0;
    _caltyp: number = 0;
    _calpar: number[] = [];
    _calraw: number[] = [];
    _calref: number[] = [];
    imm_calhdl: yCalibrationHandler | null = null;

    // API symbols as object properties
    public readonly UNIT_INVALID: string = YAPI_INVALID_STRING;
    public readonly CURRENTVALUE_INVALID: number = YAPI_INVALID_DOUBLE;
    public readonly LOWESTVALUE_INVALID: number = YAPI_INVALID_DOUBLE;
    public readonly HIGHESTVALUE_INVALID: number = YAPI_INVALID_DOUBLE;
    public readonly CURRENTRAWVALUE_INVALID: number = YAPI_INVALID_DOUBLE;
    public readonly LOGFREQUENCY_INVALID: string = YAPI_INVALID_STRING;
    public readonly REPORTFREQUENCY_INVALID: string = YAPI_INVALID_STRING;
    public readonly ADVMODE_IMMEDIATE: YSensor.ADVMODE = 0;
    public readonly ADVMODE_PERIOD_AVG: YSensor.ADVMODE = 1;
    public readonly ADVMODE_PERIOD_MIN: YSensor.ADVMODE = 2;
    public readonly ADVMODE_PERIOD_MAX: YSensor.ADVMODE = 3;
    public readonly ADVMODE_INVALID: YSensor.ADVMODE = -1;
    public readonly CALIBRATIONPARAM_INVALID: string = YAPI_INVALID_STRING;
    public readonly RESOLUTION_INVALID: number = YAPI_INVALID_DOUBLE;
    public readonly SENSORSTATE_INVALID: number = YAPI_INVALID_INT;

    // API symbols as static members
    public static readonly UNIT_INVALID: string = YAPI_INVALID_STRING;
    public static readonly CURRENTVALUE_INVALID: number = YAPI_INVALID_DOUBLE;
    public static readonly LOWESTVALUE_INVALID: number = YAPI_INVALID_DOUBLE;
    public static readonly HIGHESTVALUE_INVALID: number = YAPI_INVALID_DOUBLE;
    public static readonly CURRENTRAWVALUE_INVALID: number = YAPI_INVALID_DOUBLE;
    public static readonly LOGFREQUENCY_INVALID: string = YAPI_INVALID_STRING;
    public static readonly REPORTFREQUENCY_INVALID: string = YAPI_INVALID_STRING;
    public static readonly ADVMODE_IMMEDIATE: YSensor.ADVMODE = 0;
    public static readonly ADVMODE_PERIOD_AVG: YSensor.ADVMODE = 1;
    public static readonly ADVMODE_PERIOD_MIN: YSensor.ADVMODE = 2;
    public static readonly ADVMODE_PERIOD_MAX: YSensor.ADVMODE = 3;
    public static readonly ADVMODE_INVALID: YSensor.ADVMODE = -1;
    public static readonly CALIBRATIONPARAM_INVALID: string = YAPI_INVALID_STRING;
    public static readonly RESOLUTION_INVALID: number = YAPI_INVALID_DOUBLE;
    public static readonly SENSORSTATE_INVALID: number = YAPI_INVALID_INT;
    //--- (end of generated code: YSensor attributes declaration)

    constructor(yapi: YAPIContext, func: string)
    {
        //--- (generated code: YSensor constructor)
        super(yapi, func);
        this._className                  = 'Sensor';
        //--- (end of generated code: YSensor constructor)
    }

    //--- (generated code: YSensor implementation)

    imm_parseAttr(name: string, val: any): number
    {
        switch (name) {
        case 'unit':
            this._unit = <string> <string> val;
            return 1;
        case 'currentValue':
            this._currentValue = <number> Math.round(<number>val / 65.536) / 1000.0;
            return 1;
        case 'lowestValue':
            this._lowestValue = <number> Math.round(<number>val / 65.536) / 1000.0;
            return 1;
        case 'highestValue':
            this._highestValue = <number> Math.round(<number>val / 65.536) / 1000.0;
            return 1;
        case 'currentRawValue':
            this._currentRawValue = <number> Math.round(<number>val / 65.536) / 1000.0;
            return 1;
        case 'logFrequency':
            this._logFrequency = <string> <string> val;
            return 1;
        case 'reportFrequency':
            this._reportFrequency = <string> <string> val;
            return 1;
        case 'advMode':
            this._advMode = <YSensor.ADVMODE> <number> val;
            return 1;
        case 'calibrationParam':
            this._calibrationParam = <string> <string> val;
            return 1;
        case 'resolution':
            this._resolution = <number> Math.round(<number>val / 65.536) / 1000.0;
            return 1;
        case 'sensorState':
            this._sensorState = <number> <number> val;
            return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Returns the measuring unit for the measure.
     *
     * @return a string corresponding to the measuring unit for the measure
     *
     * On failure, throws an exception or returns YSensor.UNIT_INVALID.
     */
    async get_unit(): Promise<string>
    {
        let res: string;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != YAPI_SUCCESS) {
                return YSensor.UNIT_INVALID;
            }
        }
        res = this._unit;
        return res;
    }

    /**
     * Returns the current value of the measure, in the specified unit, as a floating point number.
     * Note that a get_currentValue() call will *not* start a measure in the device, it
     * will just return the last measure that occurred in the device. Indeed, internally, each Yoctopuce
     * devices is continuously making measurements at a hardware specific frequency.
     *
     * If continuously calling  get_currentValue() leads you to performances issues, then
     * you might consider to switch to callback programming model. Check the "advanced
     * programming" chapter in in your device user manual for more information.
     *
     * @return a floating point number corresponding to the current value of the measure, in the specified
     * unit, as a floating point number
     *
     * On failure, throws an exception or returns YSensor.CURRENTVALUE_INVALID.
     */
    async get_currentValue(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != YAPI_SUCCESS) {
                return YSensor.CURRENTVALUE_INVALID;
            }
        }
        res = await this._applyCalibration(this._currentRawValue);
        if (res == YSensor.CURRENTVALUE_INVALID) {
            res = this._currentValue;
        }
        res = res * this._iresol;
        res = Math.round(res) / this._iresol;
        return res;
    }

    /**
     * Changes the recorded minimal value observed. Can be used to reset the value returned
     * by get_lowestValue().
     *
     * @param newval : a floating point number corresponding to the recorded minimal value observed
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_lowestValue(newval: number): Promise<number>
    {
        let rest_val: string;
        rest_val = String(Math.round(newval * 65536.0));
        return await this._setAttr('lowestValue', rest_val);
    }

    /**
     * Returns the minimal value observed for the measure since the device was started.
     * Can be reset to an arbitrary value thanks to set_lowestValue().
     *
     * @return a floating point number corresponding to the minimal value observed for the measure since
     * the device was started
     *
     * On failure, throws an exception or returns YSensor.LOWESTVALUE_INVALID.
     */
    async get_lowestValue(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != YAPI_SUCCESS) {
                return YSensor.LOWESTVALUE_INVALID;
            }
        }
        res = this._lowestValue * this._iresol;
        res = Math.round(res) / this._iresol;
        return res;
    }

    /**
     * Changes the recorded maximal value observed. Can be used to reset the value returned
     * by get_lowestValue().
     *
     * @param newval : a floating point number corresponding to the recorded maximal value observed
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_highestValue(newval: number): Promise<number>
    {
        let rest_val: string;
        rest_val = String(Math.round(newval * 65536.0));
        return await this._setAttr('highestValue', rest_val);
    }

    /**
     * Returns the maximal value observed for the measure since the device was started.
     * Can be reset to an arbitrary value thanks to set_highestValue().
     *
     * @return a floating point number corresponding to the maximal value observed for the measure since
     * the device was started
     *
     * On failure, throws an exception or returns YSensor.HIGHESTVALUE_INVALID.
     */
    async get_highestValue(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != YAPI_SUCCESS) {
                return YSensor.HIGHESTVALUE_INVALID;
            }
        }
        res = this._highestValue * this._iresol;
        res = Math.round(res) / this._iresol;
        return res;
    }

    /**
     * Returns the uncalibrated, unrounded raw value returned by the
     * sensor, in the specified unit, as a floating point number.
     *
     * @return a floating point number corresponding to the uncalibrated, unrounded raw value returned by the
     *         sensor, in the specified unit, as a floating point number
     *
     * On failure, throws an exception or returns YSensor.CURRENTRAWVALUE_INVALID.
     */
    async get_currentRawValue(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != YAPI_SUCCESS) {
                return YSensor.CURRENTRAWVALUE_INVALID;
            }
        }
        res = this._currentRawValue;
        return res;
    }

    /**
     * Returns the datalogger recording frequency for this function, or "OFF"
     * when measures are not stored in the data logger flash memory.
     *
     * @return a string corresponding to the datalogger recording frequency for this function, or "OFF"
     *         when measures are not stored in the data logger flash memory
     *
     * On failure, throws an exception or returns YSensor.LOGFREQUENCY_INVALID.
     */
    async get_logFrequency(): Promise<string>
    {
        let res: string;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != YAPI_SUCCESS) {
                return YSensor.LOGFREQUENCY_INVALID;
            }
        }
        res = this._logFrequency;
        return res;
    }

    /**
     * Changes the datalogger recording frequency for this function.
     * The frequency can be specified as samples per second,
     * as sample per minute (for instance "15/m") or in samples per
     * hour (eg. "4/h"). To disable recording for this function, use
     * the value "OFF". Note that setting the  datalogger recording frequency
     * to a greater value than the sensor native sampling frequency is useless,
     * and even counterproductive: those two frequencies are not related.
     * Remember to call the saveToFlash() method of the module if the modification must be kept.
     *
     * @param newval : a string corresponding to the datalogger recording frequency for this function
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_logFrequency(newval: string): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('logFrequency', rest_val);
    }

    /**
     * Returns the timed value notification frequency, or "OFF" if timed
     * value notifications are disabled for this function.
     *
     * @return a string corresponding to the timed value notification frequency, or "OFF" if timed
     *         value notifications are disabled for this function
     *
     * On failure, throws an exception or returns YSensor.REPORTFREQUENCY_INVALID.
     */
    async get_reportFrequency(): Promise<string>
    {
        let res: string;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != YAPI_SUCCESS) {
                return YSensor.REPORTFREQUENCY_INVALID;
            }
        }
        res = this._reportFrequency;
        return res;
    }

    /**
     * Changes the timed value notification frequency for this function.
     * The frequency can be specified as samples per second,
     * as sample per minute (for instance "15/m") or in samples per
     * hour (e.g. "4/h"). To disable timed value notifications for this
     * function, use the value "OFF". Note that setting the  timed value
     * notification frequency to a greater value than the sensor native
     * sampling frequency is unless, and even counterproductive: those two
     * frequencies are not related.
     * Remember to call the saveToFlash() method of the module if the modification must be kept.
     *
     * @param newval : a string corresponding to the timed value notification frequency for this function
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_reportFrequency(newval: string): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('reportFrequency', rest_val);
    }

    /**
     * Returns the measuring mode used for the advertised value pushed to the parent hub.
     *
     * @return a value among YSensor.ADVMODE_IMMEDIATE, YSensor.ADVMODE_PERIOD_AVG,
     * YSensor.ADVMODE_PERIOD_MIN and YSensor.ADVMODE_PERIOD_MAX corresponding to the measuring mode used
     * for the advertised value pushed to the parent hub
     *
     * On failure, throws an exception or returns YSensor.ADVMODE_INVALID.
     */
    async get_advMode(): Promise<YSensor.ADVMODE>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != YAPI_SUCCESS) {
                return YSensor.ADVMODE_INVALID;
            }
        }
        res = this._advMode;
        return res;
    }

    /**
     * Changes the measuring mode used for the advertised value pushed to the parent hub.
     * Remember to call the saveToFlash() method of the module if the modification must be kept.
     *
     * @param newval : a value among YSensor.ADVMODE_IMMEDIATE, YSensor.ADVMODE_PERIOD_AVG,
     * YSensor.ADVMODE_PERIOD_MIN and YSensor.ADVMODE_PERIOD_MAX corresponding to the measuring mode used
     * for the advertised value pushed to the parent hub
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_advMode(newval: YSensor.ADVMODE): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('advMode', rest_val);
    }

    async get_calibrationParam(): Promise<string>
    {
        let res: string;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != YAPI_SUCCESS) {
                return YSensor.CALIBRATIONPARAM_INVALID;
            }
        }
        res = this._calibrationParam;
        return res;
    }

    async set_calibrationParam(newval: string): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('calibrationParam', rest_val);
    }

    /**
     * Changes the resolution of the measured physical values. The resolution corresponds to the numerical precision
     * when displaying value. It does not change the precision of the measure itself.
     * Remember to call the saveToFlash() method of the module if the modification must be kept.
     *
     * @param newval : a floating point number corresponding to the resolution of the measured physical values
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_resolution(newval: number): Promise<number>
    {
        let rest_val: string;
        rest_val = String(Math.round(newval * 65536.0));
        return await this._setAttr('resolution', rest_val);
    }

    /**
     * Returns the resolution of the measured values. The resolution corresponds to the numerical precision
     * of the measures, which is not always the same as the actual precision of the sensor.
     * Remember to call the saveToFlash() method of the module if the modification must be kept.
     *
     * @return a floating point number corresponding to the resolution of the measured values
     *
     * On failure, throws an exception or returns YSensor.RESOLUTION_INVALID.
     */
    async get_resolution(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != YAPI_SUCCESS) {
                return YSensor.RESOLUTION_INVALID;
            }
        }
        res = this._resolution;
        return res;
    }

    /**
     * Returns the sensor state code, which is zero when there is an up-to-date measure
     * available or a positive code if the sensor is not able to provide a measure right now.
     *
     * @return an integer corresponding to the sensor state code, which is zero when there is an up-to-date measure
     *         available or a positive code if the sensor is not able to provide a measure right now
     *
     * On failure, throws an exception or returns YSensor.SENSORSTATE_INVALID.
     */
    async get_sensorState(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != YAPI_SUCCESS) {
                return YSensor.SENSORSTATE_INVALID;
            }
        }
        res = this._sensorState;
        return res;
    }

    /**
     * Retrieves a sensor for a given identifier.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YSensor.isOnline() to test if the sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the sensor, for instance
     *         MyDevice..
     *
     * @return a YSensor object allowing you to drive the sensor.
     */
    static FindSensor(func: string): YSensor
    {
        let obj: YSensor | null;
        obj = <YSensor> YFunction._FindFromCache('Sensor', func);
        if (obj == null) {
            obj = new YSensor(YAPI, func);
            YFunction._AddToCache('Sensor',  func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a sensor for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YSensor.isOnline() to test if the sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx : a YAPI context
     * @param func : a string that uniquely characterizes the sensor, for instance
     *         MyDevice..
     *
     * @return a YSensor object allowing you to drive the sensor.
     */
    static FindSensorInContext(yctx: YAPIContext, func: string): YSensor
    {
        let obj: YSensor | null;
        obj = <YSensor> YFunction._FindFromCacheInContext(yctx,  'Sensor', func);
        if (obj == null) {
            obj = new YSensor(yctx, func);
            YFunction._AddToCache('Sensor',  func, obj);
        }
        return obj;
    }

    /**
     * Registers the callback function that is invoked on every change of advertised value.
     * The callback is invoked only during the execution of ySleep or yHandleEvents.
     * This provides control over the time when the callback is triggered. For good responsiveness, remember to call
     * one of these two functions periodically. To unregister a callback, pass a null pointer as argument.
     *
     * @param callback : the callback function to call, or a null pointer. The callback function should take two
     *         arguments: the function object of which the value has changed, and the character string describing
     *         the new advertised value.
     * @noreturn
     */
    async registerValueCallback(callback: YSensor.ValueCallback | null): Promise<number>
    {
        let val: string;
        if (callback != null) {
            await YFunction._UpdateValueCallbackList(this, true);
        } else {
            await YFunction._UpdateValueCallbackList(this, false);
        }
        this._valueCallbackSensor = callback;
        // Immediately invoke value callback with current value
        if (callback != null && await this.isOnline()) {
            val = this._advertisedValue;
            if (!(val == '')) {
                await this._invokeValueCallback(val);
            }
        }
        return 0;
    }

    async _invokeValueCallback(value: string): Promise<number>
    {
        if (this._valueCallbackSensor != null) {
            try {
                await this._valueCallbackSensor(this, value);
            } catch (e) {
                this._yapi.imm_log('Exception in valueCallback:', e);
            }
        } else {
            await super._invokeValueCallback(value);
        }
        return 0;
    }

    async _parserHelper(): Promise<number>
    {
        let position: number;
        let maxpos: number;
        let iCalib: number[] = [];
        let iRaw: number;
        let iRef: number;
        let fRaw: number;
        let fRef: number;
        this._caltyp = -1;
        this._scale = -1;
        this._calpar.length = 0;
        this._calraw.length = 0;
        this._calref.length = 0;
        // Store inverted resolution, to provide better rounding
        if (this._resolution > 0) {
            this._iresol = Math.round(1.0 / this._resolution);
        } else {
            this._iresol = 10000;
            this._resolution = 0.0001;
        }
        // Old format: supported when there is no calibration
        if (this._calibrationParam == '' || this._calibrationParam == '0') {
            this._caltyp = 0;
            return 0;
        }
        if ((this._calibrationParam).indexOf(',') >= 0) {
            // Plain text format
            iCalib = this._yapi.imm_decodeFloats(this._calibrationParam);
            this._caltyp = (((iCalib[0]) / (1000)) >> 0);
            if (this._caltyp > 0) {
                if (this._caltyp < YOCTO_CALIB_TYPE_OFS) {
                    // Unknown calibration type: calibrated value will be provided by the device
                    this._caltyp = -1;
                    return 0;
                }
                this.imm_calhdl = this._yapi.imm_getCalibrationHandler(this._caltyp);
                if (!(this.imm_calhdl != null)) {
                    // Unknown calibration type: calibrated value will be provided by the device
                    this._caltyp = -1;
                    return 0;
                }
            }
            // New 32 bits text format
            this._offset = 0;
            this._scale = 1000;
            maxpos = iCalib.length;
            this._calpar.length = 0;
            position = 1;
            while (position < maxpos) {
                this._calpar.push(iCalib[position]);
                position = position + 1;
            }
            this._calraw.length = 0;
            this._calref.length = 0;
            position = 1;
            while (position + 1 < maxpos) {
                fRaw = iCalib[position];
                fRaw = fRaw / 1000.0;
                fRef = iCalib[position + 1];
                fRef = fRef / 1000.0;
                this._calraw.push(fRaw);
                this._calref.push(fRef);
                position = position + 2;
            }
        } else {
            // Recorder-encoded format, including encoding
            iCalib = this._yapi.imm_decodeWords(this._calibrationParam);
            // In case of unknown format, calibrated value will be provided by the device
            if (iCalib.length < 2) {
                this._caltyp = -1;
                return 0;
            }
            // Save variable format (scale for scalar, or decimal exponent)
            this._offset = 0;
            this._scale = 1;
            this._decexp = 1.0;
            position = iCalib[0];
            while (position > 0) {
                this._decexp = this._decexp * 10;
                position = position - 1;
            }
            // Shortcut when there is no calibration parameter
            if (iCalib.length == 2) {
                this._caltyp = 0;
                return 0;
            }
            this._caltyp = iCalib[2];
            this.imm_calhdl = this._yapi.imm_getCalibrationHandler(this._caltyp);
            // parse calibration points
            if (this._caltyp <= 10) {
                maxpos = this._caltyp;
            } else {
                if (this._caltyp <= 20) {
                    maxpos = this._caltyp - 10;
                } else {
                    maxpos = 5;
                }
            }
            maxpos = 3 + 2 * maxpos;
            if (maxpos > iCalib.length) {
                maxpos = iCalib.length;
            }
            this._calpar.length = 0;
            this._calraw.length = 0;
            this._calref.length = 0;
            position = 3;
            while (position + 1 < maxpos) {
                iRaw = iCalib[position];
                iRef = iCalib[position + 1];
                this._calpar.push(iRaw);
                this._calpar.push(iRef);
                this._calraw.push(this._yapi.imm_decimalToDouble(iRaw));
                this._calref.push(this._yapi.imm_decimalToDouble(iRef));
                position = position + 2;
            }
        }
        return 0;
    }

    /**
     * Checks if the sensor is currently able to provide an up-to-date measure.
     * Returns false if the device is unreachable, or if the sensor does not have
     * a current measure to transmit. No exception is raised if there is an error
     * while trying to contact the device hosting $THEFUNCTION$.
     *
     * @return true if the sensor can provide an up-to-date measure, and false otherwise
     */
    async isSensorReady(): Promise<boolean>
    {
        if (!(await this.isOnline())) {
            return false;
        }
        if (!(this._sensorState == 0)) {
            return false;
        }
        return true;
    }

    /**
     * Returns the YDatalogger object of the device hosting the sensor. This method returns an object
     * that can control global parameters of the data logger. The returned object
     * should not be freed.
     *
     * @return an YDatalogger object, or null on error.
     */
    async get_dataLogger(): Promise<YDataLogger | null>
    {
        let logger: YDataLogger | null;
        let modu: YModule | null;
        let serial: string;
        let hwid: string;

        modu = await this.get_module();
        serial = await modu.get_serialNumber();
        if (serial == YAPI_INVALID_STRING) {
            return null;
        }
        hwid = serial + '.dataLogger';
        logger = YDataLogger.FindDataLogger(hwid);
        return logger;
    }

    /**
     * Starts the data logger on the device. Note that the data logger
     * will only save the measures on this sensor if the logFrequency
     * is not set to "OFF".
     *
     * @return YAPI.SUCCESS if the call succeeds.
     */
    async startDataLogger(): Promise<number>
    {
        let res: Uint8Array;

        res = await this._download('api/dataLogger/recording?recording=1');
        if (!((res).length > 0)) {
            return this._throw(YAPI_IO_ERROR, 'unable to start datalogger', YAPI_IO_ERROR);
        }
        return YAPI_SUCCESS;
    }

    /**
     * Stops the datalogger on the device.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     */
    async stopDataLogger(): Promise<number>
    {
        let res: Uint8Array;

        res = await this._download('api/dataLogger/recording?recording=0');
        if (!((res).length > 0)) {
            return this._throw(YAPI_IO_ERROR, 'unable to stop datalogger', YAPI_IO_ERROR);
        }
        return YAPI_SUCCESS;
    }

    /**
     * Retrieves a YDataSet object holding historical data for this
     * sensor, for a specified time interval. The measures will be
     * retrieved from the data logger, which must have been turned
     * on at the desired time. See the documentation of the YDataSet
     * class for information on how to get an overview of the
     * recorded data, and how to load progressively a large set
     * of measures from the data logger.
     *
     * This function only works if the device uses a recent firmware,
     * as YDataSet objects are not supported by firmwares older than
     * version 13000.
     *
     * @param startTime : the start of the desired measure time interval,
     *         as a Unix timestamp, i.e. the number of seconds since
     *         January 1, 1970 UTC. The special value 0 can be used
     *         to include any measure, without initial limit.
     * @param endTime : the end of the desired measure time interval,
     *         as a Unix timestamp, i.e. the number of seconds since
     *         January 1, 1970 UTC. The special value 0 can be used
     *         to include any measure, without ending limit.
     *
     * @return an instance of YDataSet, providing access to historical
     *         data. Past measures can be loaded progressively
     *         using methods from the YDataSet object.
     */
    async get_recordedData(startTime: number, endTime: number): Promise<YDataSet>
    {
        let funcid: string;
        let funit: string;

        funcid = await this.get_functionId();
        funit = await this.get_unit();
        return new YDataSet(this, funcid, funit, startTime, endTime);
    }

    /**
     * Registers the callback function that is invoked on every periodic timed notification.
     * The callback is invoked only during the execution of ySleep or yHandleEvents.
     * This provides control over the time when the callback is triggered. For good responsiveness, remember to call
     * one of these two functions periodically. To unregister a callback, pass a null pointer as argument.
     *
     * @param callback : the callback function to call, or a null pointer. The callback function should take two
     *         arguments: the function object of which the value has changed, and an YMeasure object describing
     *         the new advertised value.
     * @noreturn
     */
    async registerTimedReportCallback(callback: YSensor.TimedReportCallback | null): Promise<number>
    {
        let sensor: YSensor | null;
        sensor = this;
        if (callback != null) {
            await YFunction._UpdateTimedReportCallbackList(sensor, true);
        } else {
            await YFunction._UpdateTimedReportCallbackList(sensor, false);
        }
        this._timedReportCallbackSensor = callback;
        return 0;
    }

    async _invokeTimedReportCallback(value: YMeasure): Promise<number>
    {
        if (this._timedReportCallbackSensor != null) {
            try {
                await this._timedReportCallbackSensor(this, value);
            } catch (e) {
                this._yapi.imm_log('Exception in timedReportCallback:', e);
            }
        } else {
        }
        return 0;
    }

    /**
     * Configures error correction data points, in particular to compensate for
     * a possible perturbation of the measure caused by an enclosure. It is possible
     * to configure up to five correction points. Correction points must be provided
     * in ascending order, and be in the range of the sensor. The device will automatically
     * perform a linear interpolation of the error correction between specified
     * points. Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * For more information on advanced capabilities to refine the calibration of
     * sensors, please contact support@yoctopuce.com.
     *
     * @param rawValues : array of floating point numbers, corresponding to the raw
     *         values returned by the sensor for the correction points.
     * @param refValues : array of floating point numbers, corresponding to the corrected
     *         values for the correction points.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async calibrateFromPoints(rawValues: number[], refValues: number[]): Promise<number>
    {
        let rest_val: string;
        let res: number;

        rest_val = await this._encodeCalibrationPoints(rawValues, refValues);
        res = await this._setAttr('calibrationParam', rest_val);
        return res;
    }

    /**
     * Retrieves error correction data points previously entered using the method
     * calibrateFromPoints.
     *
     * @param rawValues : array of floating point numbers, that will be filled by the
     *         function with the raw sensor values for the correction points.
     * @param refValues : array of floating point numbers, that will be filled by the
     *         function with the desired values for the correction points.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async loadCalibrationPoints(rawValues: number[], refValues: number[]): Promise<number>
    {
        rawValues.length = 0;
        refValues.length = 0;
        // Load function parameters if not yet loaded
        if ((this._scale == 0) || (this._cacheExpiration <= this._yapi.GetTickCount())) {
            if (await this.load(this._yapi.defaultCacheValidity) != YAPI_SUCCESS) {
                return YAPI_DEVICE_NOT_FOUND;
            }
        }
        if (this._caltyp < 0) {
            this._throw(YAPI_NOT_SUPPORTED, 'Calibration parameters format mismatch. Please upgrade your library or firmware.');
            return YAPI_NOT_SUPPORTED;
        }
        rawValues.length = 0;
        refValues.length = 0;
        for (let ii in this._calraw) {
            rawValues.push(this._calraw[ii]);
        }
        for (let ii in this._calref) {
            refValues.push(this._calref[ii]);
        }
        return YAPI_SUCCESS;
    }

    async _encodeCalibrationPoints(rawValues: number[], refValues: number[]): Promise<string>
    {
        let res: string;
        let npt: number;
        let idx: number;
        npt = rawValues.length;
        if (npt != refValues.length) {
            this._throw(YAPI_INVALID_ARGUMENT, 'Invalid calibration parameters (size mismatch)');
            return YAPI_INVALID_STRING;
        }
        // Shortcut when building empty calibration parameters
        if (npt == 0) {
            return '0';
        }
        // Load function parameters if not yet loaded
        if (this._scale == 0) {
            if (await this.load(this._yapi.defaultCacheValidity) != YAPI_SUCCESS) {
                return YAPI_INVALID_STRING;
            }
        }
        // Detect old firmware
        if ((this._caltyp < 0) || (this._scale < 0)) {
            this._throw(YAPI_NOT_SUPPORTED, 'Calibration parameters format mismatch. Please upgrade your library or firmware.');
            return '0';
        }
        // 32-bit fixed-point encoding
        res = String(Math.round(YOCTO_CALIB_TYPE_OFS));
        idx = 0;
        while (idx < npt) {
            res = res + ',' + String(Math.round(rawValues[idx] * 1000) / 1000) + ',' + String(Math.round(refValues[idx] * 1000) / 1000);
            idx = idx + 1;
        }
        return res;
    }

    async _applyCalibration(rawValue: number): Promise<number>
    {
        if (rawValue == YSensor.CURRENTVALUE_INVALID) {
            return YSensor.CURRENTVALUE_INVALID;
        }
        if (this._caltyp == 0) {
            return rawValue;
        }
        if (this._caltyp < 0) {
            return YSensor.CURRENTVALUE_INVALID;
        }
        if (!(this.imm_calhdl != null)) {
            return YSensor.CURRENTVALUE_INVALID;
        }
        return this.imm_calhdl(rawValue, this._caltyp, this._calpar, this._calraw, this._calref);
    }

    async _decodeTimedReport(timestamp: number, duration: number, report: number[]): Promise<YMeasure>
    {
        let i: number;
        let byteVal: number;
        let poww: number;
        let minRaw: number;
        let avgRaw: number;
        let maxRaw: number;
        let sublen: number;
        let difRaw: number;
        let startTime: number;
        let endTime: number;
        let minVal: number;
        let avgVal: number;
        let maxVal: number;
        if (duration > 0) {
            startTime = timestamp - duration;
        } else {
            startTime = this._prevTimedReport;
        }
        endTime = timestamp;
        this._prevTimedReport = endTime;
        if (startTime == 0) {
            startTime = endTime;
        }
        // 32 bits timed report format
        if (report.length <= 5) {
            // sub-second report, 1-4 bytes
            poww = 1;
            avgRaw = 0;
            byteVal = 0;
            i = 1;
            while (i < report.length) {
                byteVal = report[i];
                avgRaw = avgRaw + poww * byteVal;
                poww = poww * 0x100;
                i = i + 1;
            }
            if (((byteVal) & (0x80)) != 0) {
                avgRaw = avgRaw - poww;
            }
            avgVal = avgRaw / 1000.0;
            if (this._caltyp != 0) {
                if (this.imm_calhdl != null) {
                    avgVal = this.imm_calhdl(avgVal, this._caltyp, this._calpar, this._calraw, this._calref);
                }
            }
            minVal = avgVal;
            maxVal = avgVal;
        } else {
            // averaged report: avg,avg-min,max-avg
            sublen = 1 + ((report[1]) & (3));
            poww = 1;
            avgRaw = 0;
            byteVal = 0;
            i = 2;
            while ((sublen > 0) && (i < report.length)) {
                byteVal = report[i];
                avgRaw = avgRaw + poww * byteVal;
                poww = poww * 0x100;
                i = i + 1;
                sublen = sublen - 1;
            }
            if (((byteVal) & (0x80)) != 0) {
                avgRaw = avgRaw - poww;
            }
            sublen = 1 + ((((report[1]) >> (2))) & (3));
            poww = 1;
            difRaw = 0;
            while ((sublen > 0) && (i < report.length)) {
                byteVal = report[i];
                difRaw = difRaw + poww * byteVal;
                poww = poww * 0x100;
                i = i + 1;
                sublen = sublen - 1;
            }
            minRaw = avgRaw - difRaw;
            sublen = 1 + ((((report[1]) >> (4))) & (3));
            poww = 1;
            difRaw = 0;
            while ((sublen > 0) && (i < report.length)) {
                byteVal = report[i];
                difRaw = difRaw + poww * byteVal;
                poww = poww * 0x100;
                i = i + 1;
                sublen = sublen - 1;
            }
            maxRaw = avgRaw + difRaw;
            avgVal = avgRaw / 1000.0;
            minVal = minRaw / 1000.0;
            maxVal = maxRaw / 1000.0;
            if (this._caltyp != 0) {
                if (this.imm_calhdl != null) {
                    avgVal = this.imm_calhdl(avgVal, this._caltyp, this._calpar, this._calraw, this._calref);
                    minVal = this.imm_calhdl(minVal, this._caltyp, this._calpar, this._calraw, this._calref);
                    maxVal = this.imm_calhdl(maxVal, this._caltyp, this._calpar, this._calraw, this._calref);
                }
            }
        }
        return new YMeasure(startTime, endTime, minVal, avgVal, maxVal);
    }

    imm_decodeVal(w: number): number
    {
        let val: number;
        val = w;
        if (this._caltyp != 0) {
            if (this.imm_calhdl != null) {
                val = this.imm_calhdl(val, this._caltyp, this._calpar, this._calraw, this._calref);
            }
        }
        return val;
    }

    imm_decodeAvg(dw: number): number
    {
        let val: number;
        val = dw;
        if (this._caltyp != 0) {
            if (this.imm_calhdl != null) {
                val = this.imm_calhdl(val, this._caltyp, this._calpar, this._calraw, this._calref);
            }
        }
        return val;
    }

    /**
     * Continues the enumeration of sensors started using yFirstSensor().
     * Caution: You can't make any assumption about the returned sensors order.
     * If you want to find a specific a sensor, use Sensor.findSensor()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YSensor object, corresponding to
     *         a sensor currently online, or a null pointer
     *         if there are no more sensors to enumerate.
     */
    nextSensor(): YSensor | null
    {
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != YAPI.SUCCESS) return null;
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, <string> resolve.result);
        if (next_hwid == null) return null;
        return YSensor.FindSensorInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of sensors currently accessible.
     * Use the method YSensor.nextSensor() to iterate on
     * next sensors.
     *
     * @return a pointer to a YSensor object, corresponding to
     *         the first sensor currently online, or a null pointer
     *         if there are none.
     */
    static FirstSensor(): YSensor | null
    {
        let next_hwid = YAPI.imm_getFirstHardwareId('Sensor');
        if (next_hwid == null) return null;
        return YSensor.FindSensor(next_hwid);
    }

    /**
     * Starts the enumeration of sensors currently accessible.
     * Use the method YSensor.nextSensor() to iterate on
     * next sensors.
     *
     * @param yctx : a YAPI context.
     *
     * @return a pointer to a YSensor object, corresponding to
     *         the first sensor currently online, or a null pointer
     *         if there are none.
     */
    static FirstSensorInContext(yctx: YAPIContext): YSensor | null
    {
        let next_hwid = yctx.imm_getFirstHardwareId('Sensor');
        if (next_hwid == null) return null;
        return YSensor.FindSensorInContext(yctx, next_hwid);
    }

    //--- (end of generated code: YSensor implementation)
}

export namespace YSensor
{
    //--- (generated code: YSensor definitions)
    export const enum ADVMODE
    {
        IMMEDIATE = 0,
        PERIOD_AVG = 1,
        PERIOD_MIN = 2,
        PERIOD_MAX = 3,
        INVALID = -1
    }

    export interface ValueCallback {(func: YSensor, value: string): void}

    export interface TimedReportCallback {(func: YSensor, measure: YMeasure): void}

    //--- (end of generated code: YSensor definitions)
}

//--- (generated code: YMeasure class start)
/**
 * YMeasure Class: Measured value, returned in particular by the methods of the YDataSet class.
 *
 * YMeasure objects are used within the API to represent
 * a value measured at a specified time. These objects are
 * used in particular in conjunction with the YDataSet class,
 * but also for sensors periodic timed reports
 * (see sensor.registerTimedReportCallback).
 */
//--- (end of generated code: YMeasure class start)
export class YMeasure
{
    //--- (generated code: YMeasure attributes declaration)
    _start: number = 0;
    _end: number = 0;
    _minVal: number = 0;
    _avgVal: number = 0;
    _maxVal: number = 0;

    // API symbols as static members
    //--- (end of generated code: YMeasure attributes declaration)

    constructor(float_start: number, float_end: number, float_minVal: number, float_avgVal: number, float_maxVal: number)
    {
        //--- (generated code: YMeasure constructor)
        //--- (end of generated code: YMeasure constructor)
        this._start = float_start;
        this._end = float_end;
        this._minVal = float_minVal;
        this._avgVal = float_avgVal;
        this._maxVal = float_maxVal;
    }
    //--- (generated code: YMeasure implementation)

    /**
     * Returns the start time of the measure, relative to the Jan 1, 1970 UTC
     * (Unix timestamp). When the recording rate is higher then 1 sample
     * per second, the timestamp may have a fractional part.
     *
     * @return a floating point number corresponding to the number of seconds
     *         between the Jan 1, 1970 UTC and the beginning of this measure.
     */
    get_startTimeUTC(): number
    {
        return this._start;
    }

    /**
     * Returns the end time of the measure, relative to the Jan 1, 1970 UTC
     * (Unix timestamp). When the recording rate is higher than 1 sample
     * per second, the timestamp may have a fractional part.
     *
     * @return a floating point number corresponding to the number of seconds
     *         between the Jan 1, 1970 UTC and the end of this measure.
     */
    get_endTimeUTC(): number
    {
        return this._end;
    }

    /**
     * Returns the smallest value observed during the time interval
     * covered by this measure.
     *
     * @return a floating-point number corresponding to the smallest value observed.
     */
    get_minValue(): number
    {
        return this._minVal;
    }

    /**
     * Returns the average value observed during the time interval
     * covered by this measure.
     *
     * @return a floating-point number corresponding to the average value observed.
     */
    get_averageValue(): number
    {
        return this._avgVal;
    }

    /**
     * Returns the largest value observed during the time interval
     * covered by this measure.
     *
     * @return a floating-point number corresponding to the largest value observed.
     */
    get_maxValue(): number
    {
        return this._maxVal;
    }

    //--- (end of generated code: YMeasure implementation)

    /**
     * Returns the start date of the measure.
     *
     * @return {Date} a Date object corresponding to the beginning of this measure
     */
    get_startTimeUTC_asDate(): Date
    {
        return new Date(Math.round(this._start * 1000));
    }

    /**
     * Returns the start date of the measure.
     *
     * @return {Date} a Date object corresponding to the end of this measure
     */
    get_endTimeUTC_asDate(): Date
    {
        return new Date(Math.round(this._end * 1000));
    }
}

export namespace YMeasure
{
    //--- (generated code: YMeasure definitions)
    //--- (end of generated code: YMeasure definitions)
}

//--- (generated code: YDataLogger class start)
/**
 * YDataLogger Class: DataLogger control interface, available on most Yoctopuce sensors.
 *
 * A non-volatile memory for storing ongoing measured data is available on most Yoctopuce
 * sensors. Recording can happen automatically, without requiring a permanent
 * connection to a computer.
 * The YDataLogger class controls the global parameters of the internal data
 * logger. Recording control (start/stop) as well as data retrieval is done at
 * sensor objects level.
 */
//--- (end of generated code: YDataLogger class start)
export class YDataLogger extends YFunction
{
    //--- (generated code: YDataLogger attributes declaration)
    _className: string;
    _currentRunIndex: number = YDataLogger.CURRENTRUNINDEX_INVALID;
    _timeUTC: number = YDataLogger.TIMEUTC_INVALID;
    _recording: YDataLogger.RECORDING = YDataLogger.RECORDING_INVALID;
    _autoStart: YDataLogger.AUTOSTART = YDataLogger.AUTOSTART_INVALID;
    _beaconDriven: YDataLogger.BEACONDRIVEN = YDataLogger.BEACONDRIVEN_INVALID;
    _usage: number = YDataLogger.USAGE_INVALID;
    _clearHistory: YDataLogger.CLEARHISTORY = YDataLogger.CLEARHISTORY_INVALID;
    _valueCallbackDataLogger: YDataLogger.ValueCallback | null = null;

    // API symbols as object properties
    public readonly CURRENTRUNINDEX_INVALID: number = YAPI_INVALID_UINT;
    public readonly TIMEUTC_INVALID: number = YAPI_INVALID_LONG;
    public readonly RECORDING_OFF: YDataLogger.RECORDING = 0;
    public readonly RECORDING_ON: YDataLogger.RECORDING = 1;
    public readonly RECORDING_PENDING: YDataLogger.RECORDING = 2;
    public readonly RECORDING_INVALID: YDataLogger.RECORDING = -1;
    public readonly AUTOSTART_OFF: YDataLogger.AUTOSTART = 0;
    public readonly AUTOSTART_ON: YDataLogger.AUTOSTART = 1;
    public readonly AUTOSTART_INVALID: YDataLogger.AUTOSTART = -1;
    public readonly BEACONDRIVEN_OFF: YDataLogger.BEACONDRIVEN = 0;
    public readonly BEACONDRIVEN_ON: YDataLogger.BEACONDRIVEN = 1;
    public readonly BEACONDRIVEN_INVALID: YDataLogger.BEACONDRIVEN = -1;
    public readonly USAGE_INVALID: number = YAPI_INVALID_UINT;
    public readonly CLEARHISTORY_FALSE: YDataLogger.CLEARHISTORY = 0;
    public readonly CLEARHISTORY_TRUE: YDataLogger.CLEARHISTORY = 1;
    public readonly CLEARHISTORY_INVALID: YDataLogger.CLEARHISTORY = -1;

    // API symbols as static members
    public static readonly CURRENTRUNINDEX_INVALID: number = YAPI_INVALID_UINT;
    public static readonly TIMEUTC_INVALID: number = YAPI_INVALID_LONG;
    public static readonly RECORDING_OFF: YDataLogger.RECORDING = 0;
    public static readonly RECORDING_ON: YDataLogger.RECORDING = 1;
    public static readonly RECORDING_PENDING: YDataLogger.RECORDING = 2;
    public static readonly RECORDING_INVALID: YDataLogger.RECORDING = -1;
    public static readonly AUTOSTART_OFF: YDataLogger.AUTOSTART = 0;
    public static readonly AUTOSTART_ON: YDataLogger.AUTOSTART = 1;
    public static readonly AUTOSTART_INVALID: YDataLogger.AUTOSTART = -1;
    public static readonly BEACONDRIVEN_OFF: YDataLogger.BEACONDRIVEN = 0;
    public static readonly BEACONDRIVEN_ON: YDataLogger.BEACONDRIVEN = 1;
    public static readonly BEACONDRIVEN_INVALID: YDataLogger.BEACONDRIVEN = -1;
    public static readonly USAGE_INVALID: number = YAPI_INVALID_UINT;
    public static readonly CLEARHISTORY_FALSE: YDataLogger.CLEARHISTORY = 0;
    public static readonly CLEARHISTORY_TRUE: YDataLogger.CLEARHISTORY = 1;
    public static readonly CLEARHISTORY_INVALID: YDataLogger.CLEARHISTORY = -1;
    //--- (end of generated code: YDataLogger attributes declaration)

    constructor(yapi: YAPIContext, func: string)
    {
        //--- (generated code: YDataLogger constructor)
        super(yapi, func);
        this._className                  = 'DataLogger';
        //--- (end of generated code: YDataLogger constructor)
    }

    //--- (generated code: YDataLogger implementation)

    imm_parseAttr(name: string, val: any): number
    {
        switch (name) {
        case 'currentRunIndex':
            this._currentRunIndex = <number> <number> val;
            return 1;
        case 'timeUTC':
            this._timeUTC = <number> <number> val;
            return 1;
        case 'recording':
            this._recording = <YDataLogger.RECORDING> <number> val;
            return 1;
        case 'autoStart':
            this._autoStart = <YDataLogger.AUTOSTART> <number> val;
            return 1;
        case 'beaconDriven':
            this._beaconDriven = <YDataLogger.BEACONDRIVEN> <number> val;
            return 1;
        case 'usage':
            this._usage = <number> <number> val;
            return 1;
        case 'clearHistory':
            this._clearHistory = <YDataLogger.CLEARHISTORY> <number> val;
            return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Returns the current run number, corresponding to the number of times the module was
     * powered on with the dataLogger enabled at some point.
     *
     * @return an integer corresponding to the current run number, corresponding to the number of times the module was
     *         powered on with the dataLogger enabled at some point
     *
     * On failure, throws an exception or returns YDataLogger.CURRENTRUNINDEX_INVALID.
     */
    async get_currentRunIndex(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != YAPI_SUCCESS) {
                return YDataLogger.CURRENTRUNINDEX_INVALID;
            }
        }
        res = this._currentRunIndex;
        return res;
    }

    /**
     * Returns the Unix timestamp for current UTC time, if known.
     *
     * @return an integer corresponding to the Unix timestamp for current UTC time, if known
     *
     * On failure, throws an exception or returns YDataLogger.TIMEUTC_INVALID.
     */
    async get_timeUTC(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != YAPI_SUCCESS) {
                return YDataLogger.TIMEUTC_INVALID;
            }
        }
        res = this._timeUTC;
        return res;
    }

    /**
     * Changes the current UTC time reference used for recorded data.
     *
     * @param newval : an integer corresponding to the current UTC time reference used for recorded data
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_timeUTC(newval: number): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('timeUTC', rest_val);
    }

    /**
     * Returns the current activation state of the data logger.
     *
     * @return a value among YDataLogger.RECORDING_OFF, YDataLogger.RECORDING_ON and
     * YDataLogger.RECORDING_PENDING corresponding to the current activation state of the data logger
     *
     * On failure, throws an exception or returns YDataLogger.RECORDING_INVALID.
     */
    async get_recording(): Promise<YDataLogger.RECORDING>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != YAPI_SUCCESS) {
                return YDataLogger.RECORDING_INVALID;
            }
        }
        res = this._recording;
        return res;
    }

    /**
     * Changes the activation state of the data logger to start/stop recording data.
     *
     * @param newval : a value among YDataLogger.RECORDING_OFF, YDataLogger.RECORDING_ON and
     * YDataLogger.RECORDING_PENDING corresponding to the activation state of the data logger to
     * start/stop recording data
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_recording(newval: YDataLogger.RECORDING): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('recording', rest_val);
    }

    /**
     * Returns the default activation state of the data logger on power up.
     *
     * @return either YDataLogger.AUTOSTART_OFF or YDataLogger.AUTOSTART_ON, according to the default
     * activation state of the data logger on power up
     *
     * On failure, throws an exception or returns YDataLogger.AUTOSTART_INVALID.
     */
    async get_autoStart(): Promise<YDataLogger.AUTOSTART>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != YAPI_SUCCESS) {
                return YDataLogger.AUTOSTART_INVALID;
            }
        }
        res = this._autoStart;
        return res;
    }

    /**
     * Changes the default activation state of the data logger on power up.
     * Do not forget to call the saveToFlash() method of the module to save the
     * configuration change.  Note: if the device doesn't have any time source at his disposal when
     * starting up, it will wait for ~8 seconds before automatically starting to record  with
     * an arbitrary timestamp
     *
     * @param newval : either YDataLogger.AUTOSTART_OFF or YDataLogger.AUTOSTART_ON, according to the
     * default activation state of the data logger on power up
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_autoStart(newval: YDataLogger.AUTOSTART): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('autoStart', rest_val);
    }

    /**
     * Returns true if the data logger is synchronised with the localization beacon.
     *
     * @return either YDataLogger.BEACONDRIVEN_OFF or YDataLogger.BEACONDRIVEN_ON, according to true if
     * the data logger is synchronised with the localization beacon
     *
     * On failure, throws an exception or returns YDataLogger.BEACONDRIVEN_INVALID.
     */
    async get_beaconDriven(): Promise<YDataLogger.BEACONDRIVEN>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != YAPI_SUCCESS) {
                return YDataLogger.BEACONDRIVEN_INVALID;
            }
        }
        res = this._beaconDriven;
        return res;
    }

    /**
     * Changes the type of synchronisation of the data logger.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : either YDataLogger.BEACONDRIVEN_OFF or YDataLogger.BEACONDRIVEN_ON, according to
     * the type of synchronisation of the data logger
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_beaconDriven(newval: YDataLogger.BEACONDRIVEN): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('beaconDriven', rest_val);
    }

    /**
     * Returns the percentage of datalogger memory in use.
     *
     * @return an integer corresponding to the percentage of datalogger memory in use
     *
     * On failure, throws an exception or returns YDataLogger.USAGE_INVALID.
     */
    async get_usage(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != YAPI_SUCCESS) {
                return YDataLogger.USAGE_INVALID;
            }
        }
        res = this._usage;
        return res;
    }

    async get_clearHistory(): Promise<YDataLogger.CLEARHISTORY>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != YAPI_SUCCESS) {
                return YDataLogger.CLEARHISTORY_INVALID;
            }
        }
        res = this._clearHistory;
        return res;
    }

    async set_clearHistory(newval: YDataLogger.CLEARHISTORY): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('clearHistory', rest_val);
    }

    /**
     * Retrieves a data logger for a given identifier.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the data logger is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YDataLogger.isOnline() to test if the data logger is
     * indeed online at a given time. In case of ambiguity when looking for
     * a data logger by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the data logger, for instance
     *         LIGHTMK4.dataLogger.
     *
     * @return a YDataLogger object allowing you to drive the data logger.
     */
    static FindDataLogger(func: string): YDataLogger
    {
        let obj: YDataLogger | null;
        obj = <YDataLogger> YFunction._FindFromCache('DataLogger', func);
        if (obj == null) {
            obj = new YDataLogger(YAPI, func);
            YFunction._AddToCache('DataLogger',  func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a data logger for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the data logger is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YDataLogger.isOnline() to test if the data logger is
     * indeed online at a given time. In case of ambiguity when looking for
     * a data logger by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx : a YAPI context
     * @param func : a string that uniquely characterizes the data logger, for instance
     *         LIGHTMK4.dataLogger.
     *
     * @return a YDataLogger object allowing you to drive the data logger.
     */
    static FindDataLoggerInContext(yctx: YAPIContext, func: string): YDataLogger
    {
        let obj: YDataLogger | null;
        obj = <YDataLogger> YFunction._FindFromCacheInContext(yctx,  'DataLogger', func);
        if (obj == null) {
            obj = new YDataLogger(yctx, func);
            YFunction._AddToCache('DataLogger',  func, obj);
        }
        return obj;
    }

    /**
     * Registers the callback function that is invoked on every change of advertised value.
     * The callback is invoked only during the execution of ySleep or yHandleEvents.
     * This provides control over the time when the callback is triggered. For good responsiveness, remember to call
     * one of these two functions periodically. To unregister a callback, pass a null pointer as argument.
     *
     * @param callback : the callback function to call, or a null pointer. The callback function should take two
     *         arguments: the function object of which the value has changed, and the character string describing
     *         the new advertised value.
     * @noreturn
     */
    async registerValueCallback(callback: YDataLogger.ValueCallback | null): Promise<number>
    {
        let val: string;
        if (callback != null) {
            await YFunction._UpdateValueCallbackList(this, true);
        } else {
            await YFunction._UpdateValueCallbackList(this, false);
        }
        this._valueCallbackDataLogger = callback;
        // Immediately invoke value callback with current value
        if (callback != null && await this.isOnline()) {
            val = this._advertisedValue;
            if (!(val == '')) {
                await this._invokeValueCallback(val);
            }
        }
        return 0;
    }

    async _invokeValueCallback(value: string): Promise<number>
    {
        if (this._valueCallbackDataLogger != null) {
            try {
                await this._valueCallbackDataLogger(this, value);
            } catch (e) {
                this._yapi.imm_log('Exception in valueCallback:', e);
            }
        } else {
            await super._invokeValueCallback(value);
        }
        return 0;
    }

    /**
     * Clears the data logger memory and discards all recorded data streams.
     * This method also resets the current run index to zero.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async forgetAllDataStreams(): Promise<number>
    {
        return await this.set_clearHistory(YDataLogger.CLEARHISTORY.TRUE);
    }

    /**
     * Returns a list of YDataSet objects that can be used to retrieve
     * all measures stored by the data logger.
     *
     * This function only works if the device uses a recent firmware,
     * as YDataSet objects are not supported by firmwares older than
     * version 13000.
     *
     * @return a list of YDataSet object.
     *
     * On failure, throws an exception or returns an empty list.
     */
    async get_dataSets(): Promise<YDataSet[]>
    {
        return await this.parse_dataSets(await this._download('logger.json'));
    }

    async parse_dataSets(json: Uint8Array): Promise<YDataSet[]>
    {
        let dslist: string[] = [];
        let dataset: YDataSet | null;
        let res: YDataSet[] = [];

        dslist = this.imm_json_get_array(json);
        res.length = 0;
        for (let ii in dslist) {
            dataset = new YDataSet(this);
            await dataset._parse(dslist[ii]);
            res.push(dataset);
        }
        return res;
    }

    /**
     * Continues the enumeration of data loggers started using yFirstDataLogger().
     * Caution: You can't make any assumption about the returned data loggers order.
     * If you want to find a specific a data logger, use DataLogger.findDataLogger()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YDataLogger object, corresponding to
     *         a data logger currently online, or a null pointer
     *         if there are no more data loggers to enumerate.
     */
    nextDataLogger(): YDataLogger | null
    {
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != YAPI.SUCCESS) return null;
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, <string> resolve.result);
        if (next_hwid == null) return null;
        return YDataLogger.FindDataLoggerInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of data loggers currently accessible.
     * Use the method YDataLogger.nextDataLogger() to iterate on
     * next data loggers.
     *
     * @return a pointer to a YDataLogger object, corresponding to
     *         the first data logger currently online, or a null pointer
     *         if there are none.
     */
    static FirstDataLogger(): YDataLogger | null
    {
        let next_hwid = YAPI.imm_getFirstHardwareId('DataLogger');
        if (next_hwid == null) return null;
        return YDataLogger.FindDataLogger(next_hwid);
    }

    /**
     * Starts the enumeration of data loggers currently accessible.
     * Use the method YDataLogger.nextDataLogger() to iterate on
     * next data loggers.
     *
     * @param yctx : a YAPI context.
     *
     * @return a pointer to a YDataLogger object, corresponding to
     *         the first data logger currently online, or a null pointer
     *         if there are none.
     */
    static FirstDataLoggerInContext(yctx: YAPIContext): YDataLogger | null
    {
        let next_hwid = yctx.imm_getFirstHardwareId('DataLogger');
        if (next_hwid == null) return null;
        return YDataLogger.FindDataLoggerInContext(yctx, next_hwid);
    }

    //--- (end of generated code: YDataLogger implementation)
}

export namespace YDataLogger
{
    //--- (generated code: YDataLogger definitions)
    export const enum RECORDING
    {
        OFF = 0,
        ON = 1,
        PENDING = 2,
        INVALID = -1
    }

    export const enum AUTOSTART
    {
        OFF = 0,
        ON = 1,
        INVALID = -1
    }

    export const enum BEACONDRIVEN
    {
        OFF = 0,
        ON = 1,
        INVALID = -1
    }

    export const enum CLEARHISTORY
    {
        FALSE = 0,
        TRUE = 1,
        INVALID = -1
    }

    export interface ValueCallback {(func: YDataLogger, value: string): void}

    //--- (end of generated code: YDataLogger definitions)
}

//
// YSystemEnv
//
export class YSystemEnv
{
    isNodeJS: boolean = false;
    hasSSDP: boolean = false;

    unknownSystemEnvError(): YoctoError
    {
        return new YoctoError('Unspecified runtime environment, your project should include at least once either yocto_api_nodejs or yocto_api_html');
    }

    hookUnhandledRejection(handler: YUnhandledPromiseRejectionCallback): void
    {
        throw this.unknownSystemEnvError();
    }

    getWebSocketEngine(hub: YGenericHub, runtime_urlInfo: _YY_UrlInfo): YHubEngine | null
    {
        throw this.unknownSystemEnvError();
    }

    getHttpEngine(hub: YGenericHub, runtime_urlInfo: _YY_UrlInfo): YHubEngine | null
    {
        throw this.unknownSystemEnvError();
    }

    getWebSocketCallbackEngine(hub: YGenericHub, runtime_urlInfo: _YY_UrlInfo, ws: _YY_WebSocket): YHubEngine | null
    {
        throw this.unknownSystemEnvError();
    }

    getHttpCallbackEngine(hub: YGenericHub, runtime_urlInfo: _YY_UrlInfo, incomingMessage: any, serverResponse: any): YHubEngine | null
    {
        throw this.unknownSystemEnvError();
    }

    getSSDPManager(obj_yapi: YAPIContext): YGenericSSDPManager | null
    {
        throw this.unknownSystemEnvError();
    }

    async loadfile(file: string | Blob): Promise<Uint8Array>
    {
        throw this.unknownSystemEnvError();
    }

    async downloadfile(url: string, yapi: YAPIContext): Promise<Uint8Array>
    {
        throw this.unknownSystemEnvError();
    }

    async downloadRemoteCertificate(urlinfo: _YY_UrlInfo): Promise<string>
    {
        throw this.unknownSystemEnvError();
    }
}

const _UnspecifiedSystemEnv: YSystemEnv = new YSystemEnv();

export const enum Y_YHubConnType
{
    HUB_UNKNOWN = -6,       // hub was never connected in any way
    HUB_DETACHED = -5,      // hub has been connected, but is no more trying to reconnect
    HUB_DETACHING = -4,     // about to return to detached state
    HUB_DISCONNECTED = -3,  // currently disconnected but waiting to reconnect
    HUB_DISCONNECTING = -2, // about to return to disconnected state
    HUB_CONNECTING = -1,    // actively reconnecting to hub
    HUB_CONNECTED = 0,      // successfully connected (target state for TestHub, before disconnecting again)
    HUB_PREREGISTERED = 1,  // preregistered hub
    HUB_REGISTERED = 2,     // registered hub (trigger exceptions on failed updates)
    HUB_CALLBACK = 3        // http or websocket callback hub, triggers exceptions on failed updates
}

export abstract class YHubEngine
{
    protected readonly _hub: YGenericHub;
    protected readonly _runtime_urlInfo: _YY_UrlInfo;            // same structure but updated after info.json. This is the one to use from HubEngine
    protected lastPingStamp: number = 0;              // timestamp of last notification received

    constructor(hub: YGenericHub, runtime_urlInfo: _YY_UrlInfo)
    {
        this._hub = hub;
        this._runtime_urlInfo = runtime_urlInfo
    }

    /** Attempt to establish a connection to the hub asynchronously.
     *
     * On success, this method should call this.signalHubConnected()
     * On temporary failure, this method should call this.imm_signalHubDisconnected()
     * On fatal failure, this method should call this.imm_commonDisconnect()
     *
     * This method is supposed to be redefined by subclasses
     */
    async reconnectEngine(tryOpenID: string): Promise<void>
    {
        // This method must be redefined by subclasses
    }

    imm_disconnectEngineNow(connID: string = ''): void
    {
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
        // must be overridden by subclasses
        let res = new YHTTPRequest(null);
        res.errorType = YAPI_NOT_SUPPORTED;
        res.errorMsg = 'GenericHub subclass expected';
        return res;
    }

    // default implementation of function that reports a fatal error to the HTTP callback party
    async reportFailure(message: string): Promise<void>
    {
        // nothing to do
    }

    imm_updateLastPinfStamp(): void
    {
        this.lastPingStamp = Date.now();
    }

    imm_isConnected(): boolean
    {
        return (Date.now() - this.lastPingStamp) < this._hub.imm_getNetworkTimeout();
    }

    imm_isForwarded(): boolean
    {
        return false;
    }

    async waitForPendingQueries(ms_duration: number): Promise<void>
    {
        // nothing to do
    }
}

enum HubMode
{
    LEGACY,
    MIXED,
    SECURE,
    PROTO_UNKNOWN
}

//
// YGenericHub
//
export class YGenericHub
{

    private static globalHubRefCounter: number = 0;
    private _hubRef: number;
    private _hubEngine: YHubEngine | null;
    _yapi: YAPIContext;
    private _lastErrorType: number = YAPI_IO_ERROR;
    private _lastErrorMsg: string = 'Hub attachment has not been triggered';
    // key hub state variables
    readonly urlInfo: _YY_UrlInfo;    // structure that describe the root URL of the hub
    private hubSerial: string = '';           // the hub true serial number, as obtained from the hub itself
    serialByYdx: string[] = [];               // serials by hub-specific devYdx // fixme move to private
    // state variables to establish connection
    private _currentState: Y_YHubConnType = Y_YHubConnType.HUB_UNKNOWN;
    private _targetState: Y_YHubConnType = Y_YHubConnType.HUB_DETACHED;
    private currentConnID: string = '';             // ConnID of the current/next connection attempt
    private connResolvers: YConditionalResultResolver[] = [];    // callbacks to notify permanent state changes
    private disconnResolvers: YConditionalResultResolver[] = []; // callbacks to notify disconnects
    retryDelay: number = 15;                // delay before reconnecting in case of error: initially 15ms
    private _reconnectionTimer: any = null;         // actually a number | NodeJS.Timeout
    private _rwAccess: boolean | null = null;       // null until hub has been tested for rw-access
    // variables for special "TestHub trying" state
    private keepTryingExpiration: number = 0;       // timestamp of end of all TestHub requests and return to detached
    private keepTryingTimeoutId: any = null;        // actually a number | NodeJs.Timeout: timeout for detaching after test
    // state variables to handle connected state
    private stalledTimeoutMs: number;               // hub-specific timeout for detecting stalled connections
    timeoutId: any = null;                  // actually a number | NodeJs.Timeout: timeout for declaring stalled hub
    isNotifWorking: boolean = false;        // true if we are receiving valid notification
    devListExpires: number = 0;            // timestamp of next useful updateDeviceList
    notifPos: number = -1;                  // current absolute position in hub notification stream
    notifCarryOver: string = '';            // last incomplete notification message
    private _firstArrivalCallback: boolean = true;  // indicates that this is the first time we see this device
    _missing: YBoolDict = {};               // hash table by serial number, used during UpdateDeviceList
    private _knownUrls: string[] = [];               // the list of url that can be use for this hub
    private _hubMode: HubMode;
    private _portInfo: PortInfo[] = [];
    private _usePureHTTP: boolean = false;

    constructor(yapi: YAPIContext, urlInfo: _YY_UrlInfo)
    {
        this._yapi = yapi;
        this.urlInfo = urlInfo;
        this.stalledTimeoutMs = yapi._networkTimeoutMs;
        this._hubRef = YGenericHub.globalHubRefCounter++;
        this._hubEngine = null;
        this._hubMode = HubMode.SECURE;
    }

    _throw(int_errType: number, str_errMsg: string, obj_retVal?: any): any
    {
        this._lastErrorType = int_errType;
        this._lastErrorMsg = str_errMsg;
        return this._yapi._throw(int_errType, str_errMsg, obj_retVal);
    }

    imm_isFirstArrivalCallback(): boolean
    {
        return this._firstArrivalCallback;
    }

    imm_setFirstArrivalCallback(isfirst: boolean): void
    {
        this._firstArrivalCallback = isfirst;
    }

    imm_getNotifyPos(): number
    {
        return this.notifPos;
    }

    imm_getcurrentState(): Y_YHubConnType
    {
        return this._currentState;
    }

    imm_getCurrentConnID(): string
    {
        return this.currentConnID;
    }
    imm_setCurrentConnID(id: string): void
    {
        this.currentConnID = id;
    }

    /**
     * Returns the numerical error code of the latest error with the function.
     * This method is mostly useful when using the Yoctopuce library with
     * exceptions disabled.
     *
     * @return a number corresponding to the code of the latest error that occurred while
     *         using the function object
     */
    get_errorType(): number
    {
        return this._lastErrorType;
    }

    /**
     * Returns the error message of the latest error with the function.
     * This method is mostly useful when using the Yoctopuce library with
     * exceptions disabled.
     *
     * @return a string corresponding to the latest error message that occured while
     *         using the function object
     */
    get_errorMessage(): string
    {
        return this._lastErrorMsg;
    }

    imm_forceUpdate(): void
    {
        this.devListExpires = this._yapi.GetTickCount();
    }

    imm_logrequest(method: string, devUrl: string, obj_body: YHTTPBody | null): void
    {
        let msg = 'Request: ' + method + ' ' + devUrl;
        if (obj_body) {
            msg += ' (file=' + obj_body.fname + ')';
        }
        this._yapi.imm_log(msg);
    }

    imm_setState(newState: Y_YHubConnType): void
    {
        this._currentState = newState;
    }

    imm_setTargetState(newState: Y_YHubConnType): void
    {
        this._targetState = newState;
    }

    imm_isDisconnecting(): boolean
    {
        return this._targetState <= Y_YHubConnType.HUB_DETACHED;
    }

    imm_isDisconnected(): boolean
    {
        return this._targetState <= Y_YHubConnType.HUB_DETACHED && this._currentState <= Y_YHubConnType.HUB_DETACHED;
    }

    imm_isPreOrRegistered(): boolean
    {
        return this._targetState >= Y_YHubConnType.HUB_PREREGISTERED;
    }

    // default implementation of isOnline
    imm_isOnline(): boolean
    {
        if (this._hubEngine) {
            return this._hubEngine.imm_isConnected();
        }
        return false;
    }

    // default implementation of function that says if a hub is currently forwarded and handled remotely
    imm_isForwarded(): boolean
    {
        if (this._hubEngine) {
            return this._hubEngine.imm_isForwarded();
        }
        return false;
    }

    imm_addKnownUrl(urlInfo: _YY_UrlInfo): void
    {
        if (!this._knownUrls.includes(urlInfo.imm_getOriginalURL())) {
            this._knownUrls.push(urlInfo.imm_getOriginalURL());
        }
    }

    imm_updateUrl(urlInfo: _YY_UrlInfo): void
    {
        if (!this._knownUrls.includes(urlInfo.imm_getOriginalURL())) {
            this._knownUrls.push(urlInfo.imm_getOriginalURL());
        }
        if (this.urlInfo.imm_getUrl(false, true, true) == urlInfo.imm_getUrl(false, true, true)) {
            this.urlInfo.imm_updateFrom(urlInfo);
            return;
        }
        this.urlInfo.imm_updateFrom(urlInfo);
        if (this._currentState < Y_YHubConnType.HUB_CONNECTING) {
            if (this._yapi._logLevel >= 4) {
                this._yapi.imm_log("Updating auth credentials for " + this.urlInfo.imm_getRootUrl());
            }
        }
    }

    imm_updateForRedirect(url: string): void
    {

        let ofs = url.indexOf('://');
        if (ofs > 0) {
            ofs = url.indexOf('/', ofs + 3);
            if (ofs > 0) {
                url = url.substring(0, ofs);
            }
        }
        let new_url: _YY_UrlInfo = new _YY_UrlInfo(url);
        this.urlInfo.imm_updateForRedirect(new_url.imm_getHost(), new_url.imm_getPort(), new_url.imm_useSecureSocket());
        //this._yapi._knownHubsByUrl[new_url.rootUrl] = this;
        if (this._yapi._logLevel >= 4) {
            this._yapi.imm_log("Updating URL after HTTP redirection : " + this.urlInfo.imm_getRootUrl());
        }
        let primaryHub = this._yapi._knownHubsByUrl[new_url.imm_getRootUrl()];
        if (primaryHub && primaryHub !== this) {
            if (primaryHub.urlInfo.imm_useSecureSocket()) {
                // allow merge only of secure hub
                if (primaryHub._currentState >= this._currentState) {
                    // Existing hub is already "better" connected, keep it as primary hub
                    // Remember alias URL and update target state if needed
                    primaryHub.imm_inheritFrom(this);
                    return;
                }
            }
            // Existing hub is not actively connected, set the new hub as primary

            this._yapi._knownHubsByUrl[this.urlInfo.imm_getRootUrl()] = this;
            this.imm_inheritFrom(primaryHub);
        } else {

            this._yapi._knownHubsByUrl[new_url.imm_getRootUrl()] = this;
        }
    }

    imm_inheritFrom(otherHub: YGenericHub): void
    {
        // keep the strongest targetState
        if (this._targetState < otherHub._targetState) {
            this.imm_setTargetState(otherHub._targetState);
        }
        // inherit known devYdx, just in case
        for (let j = 0; j < otherHub.serialByYdx.length; j++) {
            let serial = otherHub.serialByYdx[j];
            if (serial && !this.serialByYdx[j]) {
                this.serialByYdx[j] = serial;
            }
        }
        // merge pending resolvers (either resolve or transfer)
        if (this._currentState >= Y_YHubConnType.HUB_CONNECTED && otherHub._currentState < Y_YHubConnType.HUB_CONNECTED) {
            // Forward the result to all pending promises
            let res_struct = {errorType: YAPI_SUCCESS, errorMsg: 'Hub ' + this.hubSerial + ' already connected'};
            let resolvers = otherHub.connResolvers;
            for (let resolveOne of resolvers) {
                resolveOne(res_struct);
            }
        } else {
            // inherit connection resolvers
            for (let resolver of otherHub.connResolvers) {
                this.connResolvers.push(resolver);
            }
        }
        otherHub.connResolvers = [];
        // shut down otherHub connection
        if (this._yapi._logLevel >= 3) {
            this._yapi.imm_log('Hub ' + this.hubSerial + ' is connected as ' + this.urlInfo.imm_getRootUrl() + ', dropping connection to ' + otherHub.urlInfo.imm_getRootUrl());
        }
        otherHub.imm_commonDisconnect('inherit', YAPI_SUCCESS, 'Hub ' + this.hubSerial + ' is already connected via ' + this.urlInfo.imm_getRootUrl());
        otherHub.imm_disconnectNow();
        for (const url of otherHub.get_knownUrls()) {
            if (!this._knownUrls.includes(url)) {
                this._knownUrls.push(url);
            }
        }
    }

    imm_getNewConnID(): string
    {
        let time = new Date();
        return (time.getHours() + 'h' + time.getMinutes() + 'm' + (time.getTime() % 60000) / 1000).toString() + '_0';
    }

    imm_tryTestConnectFor(mstimeout: number): void
    {
        let minimalExpiration = Date.now() + mstimeout;
        if (this.keepTryingExpiration < minimalExpiration) {
            this.keepTryingExpiration = minimalExpiration;
            if (this.keepTryingTimeoutId) {
                clearTimeout(this.keepTryingTimeoutId);
            }
            this.keepTryingTimeoutId = setTimeout((): void => {
                // Timeout for TestHub connection, detach if no more needed
                this.keepTryingTimeoutId = null;
                if (this._targetState == Y_YHubConnType.HUB_CONNECTED) {
                    if (this._yapi._logLevel >= 4) {
                        this._yapi.imm_log('TestHub timeout reached, disconnecting');
                    }
                    this.detach(YAPI.IO_ERROR, 'TestHub timeout reached');
                }
            }, mstimeout);
        }
    }

    /** Trigger the setup of a connection to the target hub, and return.
     * This method uses a connection helper that is overridden by each type of hub.
     *
     * @param targetConnType {Y_YHubConnType}
     */
    async attach(targetConnType: Y_YHubConnType): Promise<void>
    {
        // Keep the latest connection settings requested for this hub
        if (this._targetState <= Y_YHubConnType.HUB_CONNECTED || targetConnType > Y_YHubConnType.HUB_CONNECTED) {
            // Upgrade target state
            this.imm_setTargetState(targetConnType);
            if (this._currentState == Y_YHubConnType.HUB_CONNECTED && targetConnType > Y_YHubConnType.HUB_CONNECTED) {
                // Hub must be kept attached
                try {
                    // This will cause an API load - which may still cause a disconnect
                    // in case of communication failure
                    await this._yapi._ensureUpdateDeviceListNotRunning();
                    await this._yapi._addConnectedHub(this);
                    this.imm_setState(targetConnType);
                } catch (e) {
                    // Communication failure, must retry connecting
                    this.imm_disconnectNow();
                }
            }
            // Special handling for TestHub
            if (targetConnType == Y_YHubConnType.HUB_CONNECTED) {
                // This is a TestHub attachment: stay connected at least for 100ms,
                // unless configured for more in next call to waitForConnection
                this.imm_tryTestConnectFor(100);
            }
        }
        if (this._currentState <= Y_YHubConnType.HUB_DETACHED) {
            // Hub is not yet connecting, trigger connection
            if (this._yapi._logLevel >= 4) {
                this._yapi.imm_log('New hub is detached connecting...');
            }
            this._hubEngine = null;// clean old hub engine to force reload of info.json
            this.stalledTimeoutMs = this._yapi._networkTimeoutMs;
            this.imm_setState(Y_YHubConnType.HUB_CONNECTING);
            // noinspection ES6MissingAwait
            this.reconnect(this.imm_getNewConnID());
        } else if (this._currentState == Y_YHubConnType.HUB_DISCONNECTED) {
            // Currently waiting to reconnect, trigger immediate retry
            if (this._reconnectionTimer) {
                if (this._yapi._logLevel >= 4) {
                    this._yapi.imm_log('New hub connection requested, retry now (drop [' + this.currentConnID + '])');
                }
                clearTimeout(this._reconnectionTimer);
                this._reconnectionTimer = null;
                this.currentConnID = '';
            } else {
                if (this._yapi._logLevel >= 4) {
                    this._yapi.imm_log('New hub connection requested, retry now (no pending reconnection ?!?)');
                }
            }
            // noinspection ES6MissingAwait
            this.reconnect(this.imm_getNewConnID());
        } else if (this._currentState == Y_YHubConnType.HUB_DETACHING || this._currentState == Y_YHubConnType.HUB_DISCONNECTING) {
            if (this._yapi._logLevel >= 4) {
                this._yapi.imm_log('Hub is currently disconnecting, reconnection will be triggered soon [' + this.currentConnID + ']');
                this._yapi.imm_log('Current state: ' + this._currentState);
                this._yapi.imm_log('Target state: ' + this._targetState + ' (' + targetConnType + ')');
            }
        }
    }

    /** Wait until the connection to the hub is established
     *
     * @param mstimeout {number}
     * @param errmsg {YErrorMsg}
     * @returns {number}
     */
    async waitForConnection(mstimeout: number, errmsg: YErrorMsg): Promise<number>
    {
        // First handle cases where no waiting is needed
        if (this._targetState < Y_YHubConnType.HUB_CONNECTED) {
            // Attachment may have already been cancelled (by error or other)
            errmsg.msg = this._lastErrorMsg;
            return this._lastErrorType;
        }
        if (this._currentState >= Y_YHubConnType.HUB_CONNECTED) {
            // Connection already established
            return YAPI_SUCCESS;
        }
        if (mstimeout <= 1) {
            // Not connected, and immediate reply requested
            errmsg.msg = 'Hub not connected';
            return YAPI_TIMEOUT;
        }
        if (this._targetState == Y_YHubConnType.HUB_CONNECTED) {
            // This is a TestHub connection: keep trying for the specified period of time
            this.imm_tryTestConnectFor(mstimeout);
        }

        // We will need to wait, so we need to setup a request-specific promise and timeout
        let connOpenPromise: Promise<YConditionalResult> | null = null;
        let connOpenTimeoutObj: any = null;         // actually a number | NodeJS.Timeout
        // Create a separate promise to know when our resolver is in the list,
        // to handle race conditions between this flow and the connecting flow
        let addResolverPromise: Promise<YConditionalResultResolver>;
        addResolverPromise = new Promise<YConditionalResultResolver>((resolverReady, noResolver): void => {
            connOpenPromise = new Promise<YConditionalResult>((resolve, reject): void => {
                // connResolvers will be invoked by this.signalHubConnected()
                // and by this.imm_commonDisconnect() in case of fatal failure,
                // then cleared from the list
                this.connResolvers.push(resolve);
                resolverReady(resolve);
                connOpenTimeoutObj = setTimeout((): void => {
                    if (this._yapi._logLevel >= 4) {
                        this._yapi.imm_log('Timeout waiting for hub connection');
                    }
                    resolve({errorType: YAPI_TIMEOUT, errorMsg: "Timeout waiting for hub connection"});
                }, mstimeout);
            });
        });
        // wait for our resolver to be added in the list
        let resolver: YConditionalResultResolver = await addResolverPromise;

        // Handle race conditions with the connecting flow (connection possibly
        // established before adding the resolver into the list)
        if (this._targetState < Y_YHubConnType.HUB_CONNECTED) {
            // Attachment has already failed
            clearTimeout(connOpenTimeoutObj);
            errmsg.msg = this._lastErrorMsg;
            return this._lastErrorType;
        }
        if (this._currentState >= Y_YHubConnType.HUB_CONNECTED) {
            // Connection established
            clearTimeout(connOpenTimeoutObj);
            return YAPI_SUCCESS;
        }

        // wait for the connection to come up, or for the timeout to expire
        let openRes: YConditionalResult = await connOpenPromise as any;

        // Clear timeout
        clearTimeout(connOpenTimeoutObj);

        // Return result
        if (openRes.errorType != YAPI_SUCCESS) {
            if (errmsg) {
                errmsg.msg = openRes.errorMsg;
            }
        }
        return openRes.errorType;
    }

    /** Attempt to establish a connection to the hub asynchronously.
     *
     * On success, this method should call this.signalHubConnected()
     * On temporary failure, this method should call this.imm_signalHubDisconnected()
     * On fatal failure, this method should call this.imm_commonDisconnect()
     *
     * This method is supposed to be redefined by subclasses
     */
    async reconnect(tryOpenID: string): Promise<void>
    {
        if (!this._hubEngine) {
            if (this._yapi._logLevel >= 4) {
                this._yapi.imm_log('look for suitable Hub engine [' + tryOpenID + ']');
            }
            this._usePureHTTP = false;
            this._portInfo = [];
            if (this.urlInfo.imm_testInfoJson()) {
                let https_req: boolean = this.urlInfo.imm_useSecureSocket();
                if (this.urlInfo.imm_getPort() == YAPI.YOCTO_DEFAULT_HTTPS_PORT) {
                    https_req = true;
                }
                let url: string = (https_req ? "https://" : "http://") + this.urlInfo.imm_getUrl(false, false, true) + "info.json";
                if (this._yapi._logLevel >= 4) {
                    this._yapi.imm_log('look for info.json at ' + url + ' [' + tryOpenID + ']');
                }
                try {
                    let data: Uint8Array = await this._yapi.system_env.downloadfile(url, this._yapi);
                    let infoJson: any = JSON.parse(YAPI.imm_bin2str(data));
                    if (infoJson) {
                        if (infoJson.serialNumber) {
                            this.imm_setSerialNumber(infoJson.serialNumber);
                        }

                        if (infoJson.protocol && infoJson.protocol == "HTTP/1.1") {
                            this._usePureHTTP = true;
                        }
                        if (infoJson.port) {
                            let i: number = 0;
                            while (i < infoJson.port.length) {
                                let proto_port: string = infoJson.port[i++];
                                let split: string[] = proto_port.split(":");
                                let proto: string = split[0];
                                let port: number = YAPIContext.imm_atoi(split[1]);
                                if (port == 0) {
                                    break;
                                }
                                this._portInfo.push({proto, port});
                            }
                        }
                    }
                    if (this._yapi._logLevel >= 4) {
                        this._yapi.imm_log('info.json successfully parsed ' + url + ' [' + tryOpenID + ']');
                    }
                } catch (e) {
                    if ((e as YoctoError).errorType == YAPI.SSL_UNK_CERT) {
                        this.imm_commonDisconnect(tryOpenID, YAPI.SSL_UNK_CERT, (e as YoctoError).message);
                        this.imm_disconnectNow();
                        return;
                    } else {
                        if (this._yapi._logLevel >= 4) {
                            this._yapi.imm_log('Unable to get info.json from ' + url + ' [' + tryOpenID + ']');
                        }
                        // Old firmware without support for info.json, get at least the serial number
                        let serialurl: string = (https_req ? "https://" : "http://") + this.urlInfo.imm_getUrl(false, false, false) + "/api/module/serialNumber";
                        try {
                            let data: Uint8Array = await this._yapi.system_env.downloadfile(serialurl, this._yapi);
                            this.imm_setSerialNumber(YAPI.imm_bin2str(data));
                        } catch (e) {
                            this.imm_commonDisconnect(tryOpenID, YAPI.IO_ERROR, (e as Error).message);
                            return;
                        }
                    }
                }
            }
            const runtimeUrl = this.imm_UseBestProto();
            if (runtimeUrl.imm_useWebSocket()) {
                if (this._yapi._logLevel >= 4) {
                    this._yapi.imm_log('Use WebSocket hub engine [' + tryOpenID + ']');
                }
                this._hubEngine = this._yapi.system_env.getWebSocketEngine(this, runtimeUrl);
            } else {
                if (this._yapi._logLevel >= 4) {
                    this._yapi.imm_log('Use HTTP hub engine [' + tryOpenID + ']');
                }
                this._hubEngine = this._yapi.system_env.getHttpEngine(this, runtimeUrl);
            }
            if (!this._hubEngine) {
                this.imm_commonDisconnect(tryOpenID, YAPI_NOT_SUPPORTED, 'Unsupported hub protocol: ' + runtimeUrl.imm_getProto());
                return;
            }
        }
        await this._hubEngine.reconnectEngine(tryOpenID);
    }

    /** Invoked by this.reconnect() to handle successful hub connection
     */
    async signalHubConnected(tryOpenID: string, hubSerial: string): Promise<void>
    {
        this.imm_setState(Y_YHubConnType.HUB_CONNECTED);
        this.hubSerial = hubSerial;
        if (this._yapi._logLevel >= 4) {
            this._yapi.imm_log('Hub ' + hubSerial + ' connected [' + tryOpenID + ']');
        }

        let primaryHub: YGenericHub | null = this._yapi.imm_getPrimaryHub(this);
        // If another hub connection was active for the same hub, they may have been merged.
        // So from that point, we continue the work on "primaryHub" rather than "this"
        if (primaryHub._targetState >= Y_YHubConnType.HUB_PREREGISTERED) {
            if (primaryHub._currentState < Y_YHubConnType.HUB_PREREGISTERED) {
                // Hub must be kept attached
                try {
                    // This will cause an API load - which may still cause a disconnect
                    // in case of communication failure
                    await primaryHub._yapi._ensureUpdateDeviceListNotRunning();
                    await primaryHub._yapi._addConnectedHub(primaryHub);
                } catch (e) {
                    // Communication failure, must retry connecting
                    primaryHub.imm_disconnectNow();
                    return;
                }
            }
            if (primaryHub._currentState < primaryHub._targetState) {
                primaryHub.imm_setState(primaryHub._targetState);
            }
        } else {
            // This is a TestHub connection: keep the connection up for 100ms
            // to allow an immediate RegisterHub to piggy back on connection,
            // then disconnect.
            primaryHub.keepTryingExpiration = 0;
            primaryHub.imm_tryTestConnectFor(100);
        }
        // Forward the result to all pending promises
        let res_struct = {errorType: YAPI_SUCCESS, errorMsg: 'Hub ' + hubSerial + ' connected'};
        let resolvers = primaryHub.connResolvers;
        primaryHub.connResolvers = [];
        primaryHub._lastErrorType = res_struct.errorType;
        primaryHub._lastErrorMsg = res_struct.errorMsg;
        for (let resolveOne of resolvers) {
            resolveOne(res_struct);
        }
    }

    /** Invoked by the network handler to signal hub disconnection
     *
     * Returns true if a reconnection has been scheduled
     *     or false if the target state is "detached"
     */
    imm_signalHubDisconnected(tryOpenID: string): boolean
    {

        if (this._yapi._logLevel >= 4) {
            this._yapi.imm_log('imm_signalHubDisconnected  ' + this.urlInfo.imm_getRootUrl());
        }

        if (this._currentState > Y_YHubConnType.HUB_DISCONNECTED) {
            this.imm_setState(Y_YHubConnType.HUB_DISCONNECTED);
        }

        this.isNotifWorking = false;
        this.devListExpires = 0;
        this._yapi.imm_dropConnectedHub(this);
        // make sure any future reconnection triggers firstArrivalCallback
        this._firstArrivalCallback = true;
        // notify any pending task that hub is now fully disconnected
        let resolvers = this.disconnResolvers;
        this.disconnResolvers = [];
        for (let resolveOne of resolvers) {
            resolveOne({errorType: YAPI_SUCCESS, errorMsg: 'Hub disconnect completed'});
        }
        // test the current target state to determine of a reconnection is desired
        if (this.imm_isDisconnecting()) {
            // no reconnection is desired
            this.imm_setState(Y_YHubConnType.HUB_DETACHED);
            if (this._yapi._logLevel >= 4) {
                this._yapi.imm_log('Hub ' + this.urlInfo.imm_getRootUrl() + ' detached');
            }
            return false;
        }
        if (this._reconnectionTimer) {
            // reconnection already scheduled
            if (this._yapi._logLevel >= 4) {
                this._yapi.imm_log('Hub disconnected, reconnection is already scheduled [' + this.currentConnID + ']');
            }
            return true;
        }
        // need to schedule next retry
        let openIDwords = tryOpenID.split('_');
        let nextOpenID = openIDwords[0] + '_' + (parseInt(openIDwords[1]) + 1).toString();
        if (this.retryDelay < 5000) this.retryDelay *= 2;
        if (this._yapi._logLevel >= 4) {
            this._yapi.imm_log('Hub reconnection scheduled in ' + (this.retryDelay / 1000) + 's [' + nextOpenID + ']');
        }
        this.currentConnID = nextOpenID;
        this._reconnectionTimer = setTimeout((): void => {
            this._reconnectionTimer = null;
            this.currentConnID = '';
            if (this.imm_isDisconnecting()) {
                // reconnection cancelled
                return;
            }
            if (this._yapi._logLevel >= 4) {
                this._yapi.imm_log('Retry hub connection now [' + nextOpenID + ']');
            }
            this.reconnect(nextOpenID);
        }, this.retryDelay);
        return true;
    }

    // Cancel current connection and report the fatal connection failure to the initiator.
    // This function may be called with YAPI_SUCCESS in case of desired disconnection
    //
    // This function should be called FIRST by any implementors of async detach()
    // in order to prevent automatic reconnect
    imm_commonDisconnect(tryOpenID: string, errType: number, errMsg: string): void
    {
        this._lastErrorType = errType;
        this._lastErrorMsg = errMsg;
        if (this._currentState >= Y_YHubConnType.HUB_DISCONNECTING) {
            this.imm_setState(Y_YHubConnType.HUB_DETACHING);
        } else if (this._currentState == Y_YHubConnType.HUB_DISCONNECTED) {
            this.imm_setState(Y_YHubConnType.HUB_DETACHED);
        }
        this.imm_setTargetState(Y_YHubConnType.HUB_DETACHED);
        if (this._reconnectionTimer) {
            clearTimeout(this._reconnectionTimer);
            this._reconnectionTimer = null;
        }
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
            this.timeoutId = null;
        }
        if (errType != YAPI_SUCCESS && this._yapi._logLevel >= 4 && tryOpenID != 'detach') {
            this._yapi.imm_log('Hub connection failed: ' + errMsg + ' [' + tryOpenID + ']');
        }
        // make sure any future reconnection triggers firstArrivalCallback
        this._firstArrivalCallback = true;
        let res_struct = {errorType: errType, errorMsg: errMsg};
        let resolvers = this.connResolvers;
        this.connResolvers = [];
        for (let resolveOne of resolvers) {
            resolveOne(res_struct);
        }
    }

    // Implementation of function to abort communication channel immediately
    //
    // If a connectionID is passed as argument, only abort the
    // communication channel if the ID matched current connection
    //
    // Return true if the connection os getting aborted
    //
    // Subclasses are expected to invoke imm_signalHubDisconnected() after cleaning
    // up current communication, to bring back the link again later
    imm_disconnectNow(connID: string = ''): boolean
    {
        if (connID && connID != this.currentConnID) {
            return false;
        }
        if (this._currentState > Y_YHubConnType.HUB_DISCONNECTING) {
            this.imm_setState(Y_YHubConnType.HUB_DISCONNECTING);
        }
        if (this.timeoutId) {
            clearTimeout(this.timeoutId)
            this.timeoutId = null;
        }
        if (this._hubEngine) {
            this._hubEngine.imm_disconnectEngineNow(connID);
        } else {
            this.imm_signalHubDisconnected(connID);
        }
        return true;
    }

    /** Invoked by UnregisterHub
     *
     * Free ressources allocated by the hub, close requests,
     * call this.imm_commonDisconnect() and bring the link down.
     *
     * This method may be redefined by subclasses to do additional
     * cleanup before invoking this.imm_commonDisconnect() to bring
     * communication down, to prevent automatic reconnect.
     */
    async detach(errType: number = YAPI.IO_ERROR, errMsg: string = 'Hub has been forcibly detached'): Promise<void>
    {
        this.imm_commonDisconnect('detach', errType, errMsg);
        this.imm_disconnectNow();
        this.stalledTimeoutMs = this._yapi._networkTimeoutMs;
        this._hubEngine = null;
    }

    /** Wait until the hub is fully disconnected
     *
     * @param mstimeout {number}
     * @returns {number}
     */
    async waitForDisconnection(mstimeout: number): Promise<void>
    {
        let disconnPromise: Promise<YConditionalResult> | null = null;
        let disconnTimeoutObj: any = null;         // actually a number | NodeJS.Timeout
        disconnPromise = new Promise<YConditionalResult>((resolve, reject): void => {
            this.disconnResolvers.push(resolve);
            disconnTimeoutObj = setTimeout((): void => {
                if (this._yapi._logLevel >= 4) {
                    this._yapi.imm_log('Timeout waiting for hub disconnection');
                }
                resolve({errorType: YAPI_TIMEOUT, errorMsg: "Timeout waiting for hub connection"});
            }, mstimeout);
        });

        // wait for the connection to come down, or for the timeout to expire
        await disconnPromise as any;

        // Clear timeout
        clearTimeout(disconnTimeoutObj);
    }

    // Return the number of NEW devices discovered, or a negative error code
    async hubUpdateDeviceList(): Promise<number>
    {
        // load hub API, process white pages and yellow pages
        let hubDev: YDevice = <YDevice>this._yapi.imm_getDevice(this.urlInfo.imm_getRootUrl());
        try {
            hubDev.imm_dropCache();
            let retcode = await hubDev.refresh();
            if (retcode != YAPI_SUCCESS) {
                if (this._currentState >= Y_YHubConnType.HUB_PREREGISTERED) {
                    await this._yapi.updateDeviceList_process(this, hubDev, [], {});
                }
                this.imm_disconnectNow();
                return this._throw(retcode, hubDev._lastErrorMsg, retcode);
            }
            /** @type {YHTTPRequest} **/
            let yreq = await hubDev.requestAPI(this._yapi.defaultCacheValidity);
            if (yreq.errorType != YAPI_SUCCESS) {
                if (this._currentState >= Y_YHubConnType.HUB_PREREGISTERED) {
                    await this._yapi.updateDeviceList_process(this, hubDev, [], {});
                }
                this.imm_disconnectNow();
                return yreq.errorType;
            }
            let whitePages = (<_YY_HubApi>yreq.obj_result).services.whitePages;
            let yellowPages = (<_YY_HubApi>yreq.obj_result).services.yellowPages;
            if (!whitePages) {
                this.imm_disconnectNow();
                return this._throw(YAPI_IO_ERROR, 'Device ' + hubDev.imm_describe() + ' is not a hub',
                    YAPI_IO_ERROR);
            }
            // updateDeviceList_process returns the number of new devices
            retcode = await this._yapi.updateDeviceList_process(this, hubDev, whitePages, yellowPages);
            if (retcode < 0) {
                this.imm_disconnectNow();
                return this._throw(this._yapi._lastErrorType, this._yapi._lastErrorMsg, this._yapi._lastErrorType);
            }

            // reset device list cache timeout for this hub
            if (this.isNotifWorking) {
                this.devListExpires = this._yapi.GetTickCount() + this._yapi._deviceListValidityMs;
            } else {
                this.devListExpires = this._yapi.GetTickCount() + 500;
            }
            return retcode;
        } catch (e) {
            if (this._yapi._logLevel >= 3) {
                this._yapi.imm_log('Exception during device enumeration: ', e);
            }
            if (this._currentState >= Y_YHubConnType.HUB_PREREGISTERED) {
                try {
                    await this._yapi.updateDeviceList_process(this, hubDev, [], {});
                } catch (e) { }
            }
            this.imm_disconnectNow();
            return YAPI_IO_ERROR;
        }
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
        if (!this._hubEngine) {
            // must be overridden by subclasses
            let res = new YHTTPRequest(null);
            res.errorType = YAPI_IO_ERROR;
            res.errorMsg = 'HubEngine is not initialised';
            return res;
        }
        return await this._hubEngine.request(method, devUrl, obj_body, tcpchan);
    }

    /** Create a new random boundary for form-encoding
     *
     * @returns {string}
     */
    imm_getBoundary(): string
    {
        return 'Zz' + Math.floor(Math.random() * 0xffffff).toString(16) + 'zZ';
    }

    /** Form-encode a body object into an raw Uint8Array to send
     *
     * @param obj_body {YHTTPBody}
     * @param str_boundary {string}
     * @returns {Uint8Array}
     */
    imm_formEncodeBody(obj_body: YHTTPBody, str_boundary: string): Uint8Array
    {
        let hdr = this._yapi.imm_str2bin(
            'Content-Disposition: form-data; name="' + obj_body.fname + '"; filename="api"\r\n' +
            'Content-Type: application/octet-stream\r\n' +
            'Content-Transfer-Encoding: binary\r\n\r\n');
        let boundary = this._yapi.imm_str2bin(str_boundary);
        let dash = this._yapi.imm_str2bin('--');
        let crlf = this._yapi.imm_str2bin('\r\n');
        let parts = [dash, boundary, crlf, hdr, obj_body.data, crlf, dash, boundary, dash, crlf];
        let i, len = 0;
        for (i = 0; i < parts.length; i++) {
            len += parts[i].length;
        }
        let res = new Uint8Array(len);
        len = 0;
        for (i = 0; i < parts.length; i++) {
            res.set(parts[i], len);
            len += parts[i].length;
        }
        return res;
    }

    /** Return an array of serial numbers
     *
     * @returns {string[]}
     */
    async getBootloaders(): Promise<string[]>
    {
        let yreq = await this.request('GET', '/flash.json?a=list', null, 1);
        if (yreq.errorType != YAPI_SUCCESS) {
            return this._throw(yreq.errorType, yreq.errorMsg, []);
        }
        let flashState = JSON.parse(YAPI.imm_bin2str(<Uint8Array>yreq.bin_result));
        return flashState['list'];
    }

    /** Perform a firmware update
     *
     * @param serial {string}
     * @param firmware {YFirmwareFile}
     * @param settings {Uint8Array}
     * @param progress {YProgressCallback}
     * @returns {string[] | null}
     */
    async firmwareUpdate(serial: string, firmware: YFirmwareFile, settings: Uint8Array, progress: YProgressCallback): Promise<string[] | null>
    {
        let use_self_flash = false;
        let baseUrl = '';
        let need_reboot = true;
        let _throw = ((msg: string): any => { return this._throw(YAPI.IO_ERROR, msg, [msg]); });

        progress(5, 'Check bootloader type');
        // Get the hub own serial number
        let yreq = await this.request('GET', '/api/module.json', null, 0);
        if (yreq.errorType != YAPI_SUCCESS) {
            return _throw('Hub is not responding');
        }
        let json = JSON.parse(this._yapi.imm_bin2str(<Uint8Array>yreq.bin_result));
        let ownSerial = json.serialNumber;
        if (ownSerial.slice(0, 7) == 'VIRTHUB') {
            use_self_flash = false;
        } else if (serial == ownSerial) {
            use_self_flash = true;
        } else {
            // check if subdevice support self flashing
            yreq = await this.request('GET', '/bySerial/' + serial + '/flash.json?a=state', null, 0);
            if (yreq.errorType == YAPI_SUCCESS && (<Uint8Array>yreq.bin_result).length > 0) {
                use_self_flash = true;
                baseUrl = '/bySerial/' + serial;
            }
        }
        let bootloaders = await this.getBootloaders();
        let is_shield = (serial.slice(0, 7) == 'YHUBSHL');
        let i;
        for (i = 0; i < bootloaders.length; i++) {
            let bl = bootloaders[i];
            if (bl == serial) {
                need_reboot = false;
            } else if (is_shield) {
                if (bl.slice(0, 7) == 'YHUBSHL') {
                    return _throw('Only one YoctoHub-Shield is allowed in update mode');
                }
            }
        }
        if (!use_self_flash && need_reboot) {
            // ensure we don't reboot a device when there are already 4 or more
            if (bootloaders.length >= 4) {
                return _throw('Too many devices in update mode');
            }
        }
        // ensure flash engine is not busy
        yreq = await this.request('GET', baseUrl + '/flash.json?a=state', null, 0);
        if (yreq.errorType != YAPI_SUCCESS) {
            return _throw('Cannot check state of firmware upload');
        }
        json = JSON.parse(this._yapi.imm_bin2str(<Uint8Array>yreq.bin_result));
        if (json['state'] == 'uploading' || json['state'] == 'flashing') {
            return _throw('Cannot start firmware update: busy (' + json['state'] + ')');
        }
        // start firmware upload
        progress(10, 'Send firmware file');
        let progressCb: YDownloadProgressCallback = function (curr: number, total: number): void {
            curr >>= 10;
            total >>= 10;
            progress(10 + ((28 * curr / total) >> 0), 'Send firmware file: ' + curr + 'KB / ' + total + 'KB');
        };
        yreq = await this.request('POST', baseUrl + '/upload.html', new YHTTPBody('firmware', firmware.imm_getData(), progressCb), 0);
        if (yreq.errorType != YAPI_SUCCESS) {
            return _throw('Firmware upload failed: ' + yreq.errorMsg);
        }
        yreq = await this.request('GET', baseUrl + '/flash.json?a=state', null, 0);
        if (yreq.errorType != YAPI_SUCCESS) {
            return _throw('Cannot check state of firmware upload');
        }
        json = JSON.parse(this._yapi.imm_bin2str(<Uint8Array>yreq.bin_result));
        if (json['state'] != 'valid') {
            return _throw('Upload of firmware failed: invalid firmware(' + json['state'] + ')');
        }
        if (json['progress'] != '100') {
            return _throw('Upload of firmware failed: incomplete upload');
        }
        if (use_self_flash) {
            let settingsStr = this._yapi.imm_bin2str(settings);
            let settingsAndFiles = JSON.parse(settingsStr);
            let settingsOnly = settingsAndFiles['api'];
            let startupApi: YObjectDict = {};
            for (let key in settingsOnly) {
                if (key != 'services') {
                    startupApi[key] = settingsOnly[key];
                }
            }
            let startupConf = this._yapi.imm_str2bin(JSON.stringify(startupApi));
            progress(38, 'Save current settings');
            yreq = await this.request('POST', baseUrl + '/upload.html', new YHTTPBody('startupConf.json', startupConf, null), 0);
            if (yreq.errorType != YAPI_SUCCESS) {
                return _throw('Failed to save settings on hub');
            }
            progress(39, 'Save current settings');
            yreq = await this.request('POST', baseUrl + '/upload.html', new YHTTPBody('firmwareConf', startupConf, null), 0);
            if (yreq.errorType != YAPI_SUCCESS) {
                return _throw('Failed to save settings on hub');
            }
        }

        //40%-> 80%
        if (use_self_flash) {
            progress(40, 'Flash firmware');
            // the hub itself -> reboot in autoflash mode
            await this.request('GET', baseUrl + '/api/module/rebootCountdown?rebootCountdown=-1003', null, 0);
            await this._yapi.Sleep(7000);
        } else {
            // reboot device to bootloader if needed
            if (need_reboot) {
                // reboot subdevice
                await this.request('GET', '/bySerial/' + serial + '/api/module/rebootCountdown?rebootCountdown=-2', null, 0);
            }
            // verify that the device is in bootloader
            let timeout = YAPI.GetTickCount() + 20000;
            let res;
            let found = false;
            progress(40, 'Wait for device to be in bootloader');
            do {
                bootloaders = await this.getBootloaders();
                for (i = 0; i < bootloaders.length; i++) {
                    let bl = bootloaders[i];
                    if (bl == serial) {
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    await this._yapi.Sleep(500);
                }
            } while (!found && YAPI.GetTickCount() < timeout);
            //start flash
            progress(45, 'Flash firmware');
            let fwsize = (firmware.imm_getData().length + 512) >> 10;
            let checkTimer;
            let checkFlash = ((): void => {
                this.request('GET', baseUrl + '/flash.json?a=state', null, 1).then((flashReq): void => {
                    if (flashReq.errorType == YAPI_SUCCESS) {
                        let jsonState = YAPI.imm_bin2str(<Uint8Array>flashReq.bin_result);
                        let res = JSON.parse(jsonState);
                        if (res.state == 'flashing') {
                            if (res.progress < 20) {
                                progress(45 + ((res.progress / 3) >> 0), 'Erasing previous firmware: ' + ((fwsize * (res.progress - 3) / 18) >> 0) + 'KB / ' + fwsize + 'KB');
                            } else {
                                progress(45 + ((res.progress / 3) >> 0), 'Flashing new firmware: ' + ((fwsize * (res.progress - 20) / 76) >> 0) + 'KB / ' + fwsize + 'KB');
                            }
                        }
                    }
                    checkTimer = setTimeout(checkFlash, 500);
                }).catch((e): void => {
                    this._yapi.imm_log('Exception during firmware flash: ', e);
                    checkTimer = setTimeout(checkFlash, 500);
                });
            });
            checkTimer = setTimeout(checkFlash, 1000);
            yreq = await this.request('GET', '/flash.json?a=flash&s=' + serial, null, 0);
            clearTimeout(checkTimer);
            if (yreq.errorType != YAPI_SUCCESS) {
                return _throw('Cannot check state of firmware flash');
            }
            return JSON.parse(this._yapi.imm_bin2str(<Uint8Array>yreq.bin_result));
        }
        return null;
    }

    async reportFailure(message: string): Promise<void>
    {
        if (this._hubEngine) {
            await this._hubEngine.reportFailure(message);
        }
    }

    // check if a hub connection provides read-write access to the devices
    async hasRwAccess(): Promise<boolean>
    {
        if (this._rwAccess == null) {
            let yreq: YHTTPRequest = await this.request('GET', '/api/module/serialNumber.json?serialNumber=rwTest', null, 0);
            this._rwAccess = (yreq.errorType == YAPI_SUCCESS);
        }
        return this._rwAccess;
    }
    imm_isRwAccess(): boolean
    {
        if (this._rwAccess == null) {
            return false;
        }
        return this._rwAccess;
    }

    imm_setRwAccess(rwAccess: boolean): void
    {
        this._rwAccess = rwAccess;
    }

    getHubRef(): number
    {
        return this._hubRef;
    }
    get_knownUrls(): string[]
    {
        let res: string[] = this._knownUrls.slice();
        return res;
    }

    imm_forgetUrls(): void
    {
        this._knownUrls = [];

    }
    imm_getOriginalURL(): string
    {
        return this.urlInfo.imm_getOriginalURL();
    }

    imm_getRootUrl(): string
    {
        return this.urlInfo.imm_getRootUrl();
    }
    imm_getSerialNumber(): string
    {
        return this.hubSerial;
    }
    imm_setSerialNumber(serial: string): void
    {
        this.hubSerial = serial;
    }
    imm_getNetworkTimeout(): number
    {
        return this.stalledTimeoutMs;
    }
    imm_setNetworkTimeout(mstimeout: number): void
    {
        this.stalledTimeoutMs = mstimeout;
    }
    imm_setHubEngine(engine: YHubEngine): void
    {
        this._hubEngine = engine;
    }
    imm_setRetryDelay(value: number): void
    {
        this.retryDelay = value
    }
    imm_SetErr(errorType: number, errorMsg: string): void
    {
        this._lastErrorType = errorType;
        this._lastErrorMsg = errorMsg
    }

    async WebSocketJoin(ws: _YY_WebSocket, arr_credentials: WebSocketCredential[], closeCallback: Function): Promise<boolean>
    {
        return (<YWebSocketEngine>this._hubEngine).websocketJoin(ws, arr_credentials, closeCallback);
    }
    imm_UseBestProto(): _YY_UrlInfo
    {
        let cur_proto: string = this.urlInfo.imm_getProto();
        let runtime_urlInfo: _YY_UrlInfo = this.urlInfo;
        this._hubMode = HubMode.SECURE;
        if (this._portInfo.length > 0) {
            if (this._usePureHTTP) {
                // For VirtualHub-4web we use the first entry available regardless of the protocol and the port set
                // by the user. In this scenario info.json has the most accurate value. Note: redirection from http to
                // https has already done by the http redirect mechanism during the download of info.json
                // Note 2 : Websocket are not supported by VirtualHub-4web
                if (cur_proto == "ws" || cur_proto == "wss") {
                    this._yapi._throw(YAPI.NOT_SUPPORTED, "Websocket protocol is not supported by VirtualHub-4web.");
                }
                for (let i: number = 0; i < this._portInfo.length; i++) {
                    let portInfo: PortInfo = this._portInfo[i];
                    if (portInfo.proto.startsWith("http")) {
                        // handle http and https
                        if (this._yapi._logLevel >= 3) {
                            this._yapi.imm_log("Hub " + this.urlInfo.imm_getHost() + " will use " + portInfo.proto + " proto on port " + portInfo.port);
                        }
                        runtime_urlInfo = this.urlInfo;
                        runtime_urlInfo.imm_updateBestProto(portInfo.proto, portInfo.port);
                        break;
                    }
                }
            } else {
                let best_port: number = 0;
                let best_proto: string = "ws";
                if (this._portInfo[0].proto == "http" || this._portInfo[0].proto == "ws") {
                    this._hubMode = HubMode.LEGACY;
                }

                for (let i: number = 0; i < this._portInfo.length; i++) {
                    let portInfo: PortInfo = this._portInfo[i];
                    if (this._hubMode == HubMode.SECURE && (portInfo.proto == "http" || portInfo.proto == "ws")) {
                        if (this._yapi._logLevel >= 3) {
                            this._yapi.imm_log("Hub " + this.urlInfo.imm_getHost() + " use mixed or legacy mode");
                        }
                        this._hubMode = HubMode.MIXED;
                    }
                    if (cur_proto == "auto" && best_port == 0) {
                        if (portInfo.proto.startsWith("http") || portInfo.proto.startsWith("ws")) {
                            // handle http, https, ws and wss proto
                            best_proto = portInfo.proto;
                            best_port = portInfo.port;
                        }
                    }
                    if (cur_proto == "secure" && best_port == 0) {
                        if (portInfo.proto == "https" || portInfo.proto == "wss") {
                            // handle http, https, ws and wss proto
                            best_proto = portInfo.proto;
                            best_port = portInfo.port;
                        }
                    }
                }
                if (best_port != 0) {
                    if (this._yapi._logLevel >= 3) {
                        this._yapi.imm_log("Hub " + this.urlInfo.imm_getHost() + " will use " + best_proto + " proto on port " + best_port);
                    }
                    runtime_urlInfo = this.urlInfo;
                    runtime_urlInfo.imm_updateBestProto(best_proto, best_port);
                }
            }
        }
        return runtime_urlInfo;
    }

    imm_useMixedMode(): boolean
    {
        return this._hubMode == HubMode.MIXED || this._hubMode == HubMode.LEGACY;
    }

    async waitForPendingQueries(ms_timeout: number): Promise<void>
    {
        if (this._hubEngine) {
            await this._hubEngine.waitForPendingQueries(ms_timeout);
        }
    }
}

/*
 * HTTP interface, compatible with browser XMLHTTPRequest and Node.js ClientRequest
 */

export class YHttpEngine extends YHubEngine
{
    // Hub identification and authentication support
    infoJson: any = null;
    ha1: string = '';
    realm: string = '';
    nonce: string = '';
    opaque: string = '';
    nonceCount: number = 0;
    // Notification stream handling
    notbynRequest: any = null;

    constructor(hub: YGenericHub, runtime_urlInfo: _YY_UrlInfo)
    {
        super(hub, runtime_urlInfo);
    }

    // Low-level function to create an HTTP client request (abstraction layer)
    imm_makeRequest(method: string, relUrl: string, contentType: string, body: string | Uint8Array | null,
                    onProgress: null | ((moreText: string) => void),
                    onSuccess: null | ((responseText: string) => void),
                    onError: (errorType: number, errorMsg: string, can_be_retry: boolean) => any): any
    {
        // to be overriden by subclasses
    }

    // abort an HTTP client request immediately (abstraction layer)
    imm_abortRequest(clientRequest: any): void
    {
        // to be overriden by subclasses
    }

    // Initiate an HTTP client request with proper authentication settings and mime type
    // Handle header-based client authentication (to prevent browser pop-ups)
    imm_sendRequest(method: string, relUrl: string, obj_body: YHTTPBody | null,
                    onProgress: null | ((moreText: string) => void),
                    onSuccess: null | ((responseText: string) => void),
                    onError: (errorType: number, errorMsg: string, can_be_retry: boolean) => void): any
    {
        let body: string | Uint8Array | null = null;
        // default content-type choosen to bypass CORS checks
        let contentType: string = 'text/plain; charset=x-user-defined';

        if (this.infoJson && this.infoJson.realm && this.infoJson.nonce) {
            // Use X-YAuth JSON encoding
            if (this.realm != this.infoJson.realm || this.nonce != this.infoJson.nonce) {
                this.realm = this.infoJson.realm;
                this.nonce = this.infoJson.nonce;
                this.nonceCount = 0;
            }
            let shorturi: string = this._runtime_urlInfo.imm_getSubDomain() + relUrl;
            let jsonBody: any = {
                'x-yauth': {
                    method: method,
                    uri: shorturi
                }
            };
            if (this._runtime_urlInfo.imm_hasAuthParam()) {
                let cnonce: string = Math.floor(Math.random() * 2147483647).toString(16).toLowerCase();
                let nc: string = (++this.nonceCount).toString(16).toLowerCase();
                let ha1_str: string = this._runtime_urlInfo.imm_getUser() + ':' + this.realm + ':' + this._runtime_urlInfo.imm_getPass();
                let ha2_str: string = method + ':' + shorturi;
                let A1: string = this._hub._yapi.imm_bin2hexstr(this._hub._yapi.imm_yMD5(ha1_str)).toLowerCase();
                let A2: string = this._hub._yapi.imm_bin2hexstr(this._hub._yapi.imm_ySHA1(ha2_str)).toLowerCase();
                let signature: string = A1 + ':' + this.nonce + ':' + nc + ':' + cnonce + ':auth:' + A2;
                let response: string = this._hub._yapi.imm_bin2hexstr(this._hub._yapi.imm_ySHA1(signature)).toLowerCase();
                jsonBody['x-yauth']['username'] = this._runtime_urlInfo.imm_getUser();
                jsonBody['x-yauth']['cnonce'] = cnonce;
                jsonBody['x-yauth']['nonce'] = this.nonce;
                jsonBody['x-yauth']['nc'] = nc;
                jsonBody['x-yauth']['qop'] = 'auth';
                jsonBody['x-yauth']['response'] = response;
            }
            if (obj_body) {
                let binstr: string = this._hub._yapi.imm_bin2str(obj_body.data);
                jsonBody['body'] = {
                    filename: obj_body.fname,
                    b64content: btoa(binstr)
                };
            }
            method = 'POST';
            body = JSON.stringify(jsonBody);
            // Remove GET parameters from the URL, as the server will use the x-yauth value
            let qpos: number = relUrl.indexOf('?');
            if (qpos > 0) {
                relUrl = relUrl.slice(0, qpos);
            }
        } else if (obj_body != null) {
            let boundary = this._hub.imm_getBoundary();
            if (this.infoJson && this.infoJson.nonce) {
                // VirtualHub-4web: do not use multipart/form-data in order
                //                  to avoid PHP processing of uploads
                contentType = 'x-upload; boundary=' + boundary;
            } else {
                // YoctoHubs: use multipart/form-data to avoid CORS preflight requests
                contentType = 'multipart/form-data; boundary=' + boundary;
            }
            body = this._hub.imm_formEncodeBody(obj_body, boundary);
        }
        return this.imm_makeRequest(method, relUrl, contentType, body, onProgress, onSuccess, onError);
    }

    // Internal method to perform a simple HTTP GET using a hub-relative URL
    async tryFetch(relUrl: string): Promise<YConditionalResult>
    {
        return new Promise<YConditionalResult>((resolve, reject): void => {
            this.imm_sendRequest('GET', relUrl, null, null,
                (responseText: string): void => {
                    resolve({errorType: YAPI_SUCCESS, errorMsg: '', result: responseText});
                },
                (errorType: number, errorMsg: string, can_be_retry: boolean): void => {
                    if (can_be_retry) {
                        this.imm_sendRequest('GET', relUrl, null, null,
                            (responseText2: string): void => {
                                resolve({errorType: YAPI_SUCCESS, errorMsg: '', result: responseText2});
                            },
                            (errorType2: number, errorMsg2: string, can_be_retry2: boolean): void => {
                                resolve({errorType: errorType2, errorMsg: errorMsg2});
                            });
                    } else {
                        resolve({errorType: errorType, errorMsg: errorMsg});
                    }
                });
        });
    }

    /** Handle HTTP-based event-monitoring work on a registered hub
     */
    async reconnectEngine(tryOpenID: string): Promise<void>
    {
        // Try to fetch info.json if not yet done or if possibly expired
        this._hub.imm_setCurrentConnID(tryOpenID);
        // Check if this hub is a duplicate connection
        let primaryHub: YGenericHub | null = this._hub._yapi.imm_getPrimaryHub(this._hub);
        if (primaryHub !== this._hub) {
            this._hub.imm_commonDisconnect(tryOpenID, YAPI_SUCCESS, 'Hub ' + this._hub.imm_getSerialNumber() + ' is already connected');
            this._hub.imm_setCurrentConnID('');
            this._hub.imm_signalHubDisconnected(tryOpenID);
            return;
        }

        // Then issue an HTTP request to open the notification channel
        let args = '';
        if (this._hub.imm_getNotifyPos() >= 0) {
            args = '?abs=' + this._hub.imm_getNotifyPos().toString();
        } else {
            this._hub.imm_setFirstArrivalCallback(true);
        }
        if (this._hub._yapi._logLevel >= 4) {
            this._hub._yapi.imm_log('Opening http connection to hub (' + args + ') [' + tryOpenID + ']');
        }
        this.notbynRequest = this.imm_sendRequest('GET', '/not.byn' + args, null,
            (moreText: string): void => {
                // make sure data comes for current connection
                if (tryOpenID != this._hub.imm_getCurrentConnID()) {
                    if (this._hub._yapi._logLevel >= 3) {
                        this._hub._yapi.imm_log('Previous request still sending data [' + tryOpenID + ']');
                    }
                    return;
                }
                // receiving data properly
                if (this.infoJson) {
                    this.infoJson.stamp = YAPI.GetTickCount();
                }
                if (this._hub.imm_getcurrentState() < Y_YHubConnType.HUB_CONNECTED) {
                    this._hub.signalHubConnected(tryOpenID, this._hub.imm_getSerialNumber());
                }
                this.imm_updateLastPinfStamp();
                this._hub._yapi.parseEvents(this._hub, moreText);
            },
            (resultText: string): void => {
                if (tryOpenID != this._hub.imm_getCurrentConnID()) {
                    if (this._hub._yapi._logLevel >= 3) {
                        this._hub._yapi.imm_log('Previous request completed [' + tryOpenID + ']');
                    }
                    return;
                }
                this.reconnectEngine(tryOpenID);
            },
            (errorType: number, errorMsg: string, can_be_retry: boolean): void => {
                if (tryOpenID != this._hub.imm_getCurrentConnID()) {
                    if (this._hub._yapi._logLevel >= 3) {
                        this._hub._yapi.imm_log('Previous not.byn request says: ' + errorMsg + ' [' + tryOpenID + ']');
                    }
                    return;
                }
                if (!this._hub.imm_isDisconnecting()) {
                    if (this._hub._yapi._logLevel >= 3) {
                        this._hub._yapi.imm_log('Failed to load not.byn (' + args + '): ' + errorMsg + ' [' + tryOpenID + ']');
                    }
                }
                this._hub.imm_SetErr(errorType, errorMsg);
                if ((errorType == YAPI_UNAUTHORIZED || errorType == YAPI_SSL_UNK_CERT) && !can_be_retry) {
                    // this is a fatal failure, no need to retry
                    this._hub.imm_commonDisconnect(tryOpenID, errorType, errorMsg);
                }
                this._hub.imm_disconnectNow();
            }
        );
    }

    // abort communication channel immediately
    //
    // If a connectionID is passed as argument, only abort the
    // communication channel if the ID matched current connection
    //
    // Return true if the connection os getting aborted
    //
    imm_disconnectEngineNow(connID: string = ''): void
    {
        if (this._hub._yapi._logLevel >= 4) {
            this._hub._yapi.imm_log("YHTTPEngine.imm_disconnectEngineNow " + connID);
        }
        if (!this.notbynRequest) {
            return;
        }
        let closeConnID = (connID ? connID : this._hub.imm_getCurrentConnID());
        this.imm_abortRequest(this.notbynRequest);
        this.notbynRequest = null;
        this._hub.imm_setCurrentConnID('');
        this._hub.imm_signalHubDisconnected(closeConnID);

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
        if (this._hub._yapi._logLevel >= 3) {
            this._hub.imm_logrequest(method, devUrl, obj_body);
        }
        if (this._hub.imm_getcurrentState() < Y_YHubConnType.HUB_CONNECTED) {
            return new YHTTPRequest(null, YAPI.IO_ERROR, 'Hub is currently unavailable');
        }
        return new Promise<YHTTPRequest>(
            (resolve, reject): void => {
                this.imm_sendRequest(
                    method, devUrl,
                    obj_body, null,
                    (responseText: string): void => {
                        if (this._hub.imm_getcurrentState() < Y_YHubConnType.HUB_CONNECTED) {
                            // avoid race condition between hub inventory and not.byn disconnect
                            resolve(new YHTTPRequest(null, YAPI.IO_ERROR, 'Hub is currently unavailable'));
                        } else {
                            if (this._hub._yapi._logLevel >= 4) {
                                this._hub._yapi.imm_log(method + ' ' + devUrl + ' succeeded');
                            }
                            resolve(new YHTTPRequest(this._hub._yapi.imm_str2bin(responseText)));
                        }
                    },
                    (errorType: number, errorMsg: string, can_be_retry: boolean): void => {
                        if (this._hub._yapi._logLevel >= 4) {
                            this._hub._yapi.imm_log(method + ' ' + devUrl + ' failed (' + errorMsg + ')');
                        }
                        resolve(new YHTTPRequest(null, errorType, errorMsg));
                    });
            }
        );
    }
}

/*
 * WebSocket interface, compatible with HTML5 native WebSocket and Node.js 'ws' package
 */

export interface _YY_WebSocketSendOptions
{
    binary: boolean;
    mask: boolean;
}

interface _YY_WebSocketErrorEvent extends Event
{
    error: any; /* only available in Node.js */
    message: string; /* only available in Node.js */
    type: string; /* only available in Node.js */
    target: any; /* only available in Node.js */
}

interface _YY_WebSocketCloseEvent extends Event
{
    wasClean: boolean;
    code: number;
    reason: string;
    target: any; /* only available in Node.js */
}

interface _YY_WebSocketMessageEvent extends Event
{
    data: Uint8Array;
    origin: any; /* only available in HTML5 */
    lastEventId: any; /* only available in HTML5 */
    source: any; /* only available in HTML5 */
    ports: any; /* only available in HTML5 */
    type: string; /* only available in Node.js */
    target: any; /* only available in Node.js */
}

export interface _YY_WebSocket
{
    binaryType: string;
    protocol: string;
    readyState: number;
    url: string;

    onerror: ((event: _YY_WebSocketErrorEvent) => any) | null;
    onclose: ((event: _YY_WebSocketCloseEvent) => any) | null;
    onmessage: ((event: _YY_WebSocketMessageEvent) => any) | null;

    close(code?: number, data?: string): void;
    send(data: any, cb?: (err?: Error) => void): void;
    send(data: any, options: { mask?: boolean; binary?: boolean; compress?: boolean; fin?: boolean }, cb?: (err?: Error) => void): void;
    ping?: (data?: any, mask?: boolean, cb?: (err: Error) => void) => void;
    pong?: (data?: any, mask?: boolean, cb?: (err: Error) => void) => void;
    terminate?: () => void;
}

// websocket protocol encoding constants
const enum YSTREAM
{
    TCP = 1,
    TCP_CLOSE = 2,
    META = 5,
    TCP_NOTIF = 8,
    TCP_ASYNCCLOSE = 9
}

const enum USB_META
{
    UTCTIME = 1,
    DLFLUSH = 2,
    ACK_D2H_PACKET = 3,
    WS_ANNOUNCE = 4,
    WS_AUTHENTICATION = 5,
    WS_ERROR = 6,
    ACK_UPLOAD = 7
}

const enum WSConnState
{
    DEAD = 0,
    DISCONNECTED = 1,
    CONNECTING = 2,
    AUTHENTICATING = 3,
    READY = 4,
    CONNECTED = 5
}

export abstract class YWebSocketEngine extends YHubEngine
{
    // default transport layer parameters
    _DEFAULT_TCP_ROUND_TRIP_TIME = 30;
    _DEFAULT_TCP_MAX_WINDOW_SIZE = 4 * 65536;

    // websocket protocol parameters
    _YIO_DEFAULT_TCP_TIMEOUT = 20000;
    _YIO_1_MINUTE_TCP_TIMEOUT = 60000;
    _YIO_10_MINUTES_TCP_TIMEOUT = 600000;

    _USB_META_UTCTIME_SIZE = 5;
    _USB_META_DLFLUSH_SIZE = 1;
    _USB_META_ACK_D2H_PACKET_SIZE = 2;
    _USB_META_WS_ANNOUNCE_SIZE = 8 + 20;
    _USB_META_WS_AUTHENTICATION_SIZE = 28;
    _USB_META_WS_ERROR_SIZE = 6;
    _USB_META_ACK_UPLOAD_SIZE = 6;

    _USB_META_WS_VALID_SHA1 = 1;
    _USB_META_WS_RW = 2;

    // connection state members
    websocket: _YY_WebSocket | null = null;
    tcpChan: (YHTTPRequest | null)[] = [];
    nextAsyncId: number = 48;
    _connectionTime: number = 0;
    _connectionState: WSConnState;
    _remoteVersion: number = 0;
    _remoteSerial: string = '';
    _remoteNonce: number = -1;
    _nonce: number = -1;
    _session_error: string | null = null;
    _session_errno: number | null = null;
    _tcpRoundTripTime: number;
    _tcpMaxWindowSize: number;
    _lastUploadAckBytes: number[] = [0];
    _lastUploadAckTime: number[] = [0];
    _lastUploadRateBytes: number[] = [0];
    _lastUploadRateTime: number[] = [0];
    _uploadRate: number[] = [0];

    // websocket forwarding support
    fwd_nonce: number = -1;
    fwd_websocket: _YY_WebSocket | null = null;
    fwd_credentials: WebSocketCredential[] = [];
    fwd_connectionState: number;
    fwd_closeCallback: Function | null = null;

    constructor(hub: YGenericHub, runtime_urlInfo: _YY_UrlInfo)
    {
        super(hub, runtime_urlInfo);
        // setup defaults states
        this._connectionState = WSConnState.CONNECTING;
        this._tcpRoundTripTime = this._DEFAULT_TCP_ROUND_TRIP_TIME;
        this._tcpMaxWindowSize = this._DEFAULT_TCP_MAX_WINDOW_SIZE;
        this.fwd_connectionState = WSConnState.DISCONNECTED;
    }

    /** Open an outgoing websocket
     *
     * @param str_url {string}
     **/
    abstract imm_webSocketOpen(str_url: string): void;

    /** Fills a buffer with random numbers
     *
     * @param arr {Uint8Array}
     **/
    abstract imm_getRandomValues(arr: Uint8Array): Uint8Array;

    /** Report a low-level asynchronous websocket error
     **/
    imm_asyncWebSocketError(errorType: number, message: string): void
    {
        if (this._hub._yapi._logLevel >= 3) {
            // Note: throwing an exception here would typically kill the node.js process
            this._hub._yapi.imm_log('WS: ' + message + ' on ' + this._runtime_urlInfo.imm_getRootUrl());
        }
    }

    /** Handle websocket-based event-monitoring work on a registered hub
     */
    async reconnectEngine(tryOpenID: string): Promise<void>
    {
        this._connectionState = WSConnState.CONNECTING;
        if (this._hub._yapi._logLevel >= 4) {
            this._hub._yapi.imm_log('Opening websocket connection [' + tryOpenID + ']');
        }
        this._hub.imm_setCurrentConnID(tryOpenID);
        let url = (this._runtime_urlInfo.imm_useSecureSocket() ? "wss://" : "ws://") + this._runtime_urlInfo.imm_getUrl(false, true, true);
        this.imm_webSocketOpen(url + 'not.byn');
        this._hub.imm_setFirstArrivalCallback(true)
        if (!this.websocket) {
            // failure to create the websocket only occurs in case of unsupported protocol
            this._hub.imm_commonDisconnect(tryOpenID, YAPI_IO_ERROR, 'Failed to create WebSocket');
            return;
        }
        this.websocket.onmessage = ((evt: _YY_WebSocketMessageEvent): void => {
            if (this._hub.imm_getCurrentConnID() != tryOpenID) {
                if (this._hub._yapi._logLevel >= 4) {
                    this._hub._yapi.imm_log('Incoming WebSocket data for previous connection [' + tryOpenID + ']');
                }
                return;
            }
            this._webSocketMsg(new Uint8Array(evt.data));
            if (this._connectionState == WSConnState.READY) {
                // registration is now complete
                this._connectionState = WSConnState.CONNECTED;
                this._hub.signalHubConnected(tryOpenID, this._remoteSerial);
            } else if (this._connectionState == WSConnState.DEAD) {
                let errMsg = (this._session_error ? 'WebSocket error: ' + this._session_error : 'Websocket I/O error');
                if (this._session_errno == 401) {
                    this._hub.imm_commonDisconnect(tryOpenID, YAPI_UNAUTHORIZED, errMsg);
                } else {
                    this._hub.imm_SetErr(YAPI_IO_ERROR, errMsg);
                }
                this._hub.imm_disconnectNow();
            }
        });
        this.websocket.onclose = ((evt: _YY_WebSocketCloseEvent): void => {
            if (this._hub.imm_getCurrentConnID() != tryOpenID) {
                if (this._hub._yapi._logLevel >= 4) {
                    this._hub._yapi.imm_log('WebSocket close received for previous connection [' + tryOpenID + '], now using [' + this._hub.imm_getCurrentConnID() + ']');
                }
                return;
            }
            if (this._hub._yapi._logLevel >= 4) {
                this._hub._yapi.imm_log('WebSocket connection closed [' + tryOpenID + ']');
            }
            this._connectionState = WSConnState.DISCONNECTED;
            this.websocket = null;
            if (this._hub.retryDelay < 0) {
                // this happens typically for websocket callback
                this._hub.imm_commonDisconnect(tryOpenID, YAPI_IO_ERROR, 'Websocket callback connection closed');
            }
            this.imm_dropAllPendingConnection();
            // connection error, will retry automatically if needed
            this._hub.imm_signalHubDisconnected(tryOpenID);
        });
        this.websocket.onerror = ((evt: _YY_WebSocketErrorEvent): void => {
            if (this._hub.imm_getCurrentConnID() != tryOpenID) {
                if (this._hub._yapi._logLevel >= 4) {
                    this._hub._yapi.imm_log('WebSocket error received for previous connection [' + tryOpenID + ']');
                }
                return;
            }
            if (evt.message && (!/ ETIMEDOUT /.test(evt.message) || this._hub._yapi._logLevel >= 4)) {
                if (this._hub._yapi._logLevel >= 3) {
                    this._hub._yapi.imm_log('WebSocket error [' + tryOpenID + ']: ', evt);
                }
                if ((evt.error as any).code == "DEPTH_ZERO_SELF_SIGNED_CERT") {
                    // this is a fatal failure, no need to retry
                    this._hub.imm_commonDisconnect(tryOpenID, YAPI_SSL_UNK_CERT, evt.message);
                } else {
                    this._hub.imm_SetErr(YAPI_IO_ERROR, evt.message);
                }
            }
            if (this._hub.retryDelay < 0) {
                // this happens typically for websocket callback
                this._hub.imm_commonDisconnect(tryOpenID, YAPI_IO_ERROR, 'Websocket callback connection closed');
            }
            this._hub.imm_disconnectNow();
            // connection error, will retry automatically
            this._hub.imm_signalHubDisconnected(tryOpenID);
        });
        if (this._hub.timeoutId) {
            clearTimeout(this._hub.timeoutId);
        }
        this._hub.timeoutId = setTimeout((): void => {
            if (!this.imm_isForwarded()) {
                // abort communication channel, this will trigger a reconnect
                if (this._hub._yapi._logLevel >= 3) {
                    this._hub._yapi.imm_log('WS: connection stalled during open [' + tryOpenID + ']');
                }
                this._hub.imm_disconnectNow();
            }
        }, this._hub.imm_getNetworkTimeout());  // initial timeout to start receiving notifications
    }

    /** Compute websocket authentication sha1 key
     *
     * @param user {string}
     * @param pass {string}
     * @param serial {string}
     * @param nonce
     * @return {Uint8Array}
     */
    imm_computeAuth(user: string, pass: string, serial: string, nonce: number): Uint8Array
    {
        let ha1_str = user + ':' + serial + ':' + pass;
        let ha1 = this._hub._yapi.imm_bin2hexstr(this._hub._yapi.imm_yMD5(ha1_str)).toLowerCase();
        let nonce8 = new Uint8Array([(nonce & 0xff) >>> 0, (nonce & 0xff00) >>> 8, (nonce & 0xff0000) >>> 16, nonce >>> 24]);
        let sha1_raw = ha1 + this._hub._yapi.imm_bin2hexstr(nonce8).toLowerCase();
        return this._hub._yapi.imm_ySHA1(sha1_raw.toLowerCase());
    }

    /** Tell if a websocket hub is currently forwarded and handled remotely
     *
     * @return {boolean}
     */
    imm_isForwarded(): boolean
    {
        return (this.fwd_connectionState == WSConnState.CONNECTED) && (this.fwd_websocket !== null);
    }

    /** Handle an incoming packet
     *
     * @param arr_bytes {Uint8Array}
     **/
    async _webSocketMsg(arr_bytes: Uint8Array): Promise<void>
    {
        try {
            if (this.imm_isForwarded()) {
                this.imm_updateLastPinfStamp();
                (<_YY_WebSocket>this.fwd_websocket).send(arr_bytes);
                return;
            }

            let reltime = (this._hub._yapi.GetTickCount() - this._connectionTime) / 1000.0;
            let ystream = arr_bytes[0] >>> 3;
            let text = '';
            if (ystream == YSTREAM.TCP_NOTIF) {
                //this._yapi.imm_log(reltime+': TCP_NOTIF len='+arr_bytes.length);
                for (let i = 1; i < arr_bytes.length; i++) {
                    text += String.fromCharCode(arr_bytes[i]);
                }
                this.imm_updateLastPinfStamp();
                await this._hub._yapi.parseEvents(this._hub, text);
                return;
            }
            // Other types of messages
            let ws = this.websocket;
            let tcpchan = arr_bytes[0] & 7;
            if (ystream == YSTREAM.TCP || ystream == YSTREAM.TCP_CLOSE || ystream == YSTREAM.TCP_ASYNCCLOSE) {
                if (tcpchan > 3) {
                    this.imm_asyncWebSocketError(YAPI_IO_ERROR, 'Unexpected frame for tcpChan ' + tcpchan + ' (' + ystream + ')');
                    return;
                }
                let tcp_end = arr_bytes.length;
                let yreq = this.tcpChan[tcpchan];
                //this._yapi.imm_log(reltime+': TCP ystream='+ystream+' len='+arr_bytes.length);
                if (!yreq) {
                    this.imm_asyncWebSocketError(YAPI_IO_ERROR, 'Drop frame for closed tcpChan ' + tcpchan + ' (' + ystream + ')');
                    return;
                }
                if (ystream == YSTREAM.TCP_ASYNCCLOSE) {
                    // async close packet, check async signature byte
                    tcp_end--;
                    let rcvId = arr_bytes[tcp_end];
                    if (this._hub._yapi._logLevel >= 5) {
                        this._hub._yapi.imm_log('async-' + rcvId + ' close received');
                    }
                    if (yreq.asyncId == 0) {
                        if (this._hub._yapi._logLevel >= 4) {
                            this._hub._yapi.imm_log('async-' + rcvId + ' close received while req @' + yreq._creat + ' was pending');
                        }
                        this.imm_asyncWebSocketError(YAPI_IO_ERROR, 'Asynchronous close received, sync reply request');
                        return;
                    } else if (yreq.asyncId != rcvId) {
                        if (this._hub._yapi._logLevel >= 4) {
                            this._hub._yapi.imm_log('async-' + rcvId + ' close received instead of async-' + yreq.asyncId + ' close');
                        }
                        this.imm_asyncWebSocketError(YAPI_IO_ERROR, 'Incorrect async-close signature on tcpChan ' + tcpchan);
                        return;
                    }
                }
                let oldArr = <Uint8Array>yreq.bin_result;
                let newArr = new Uint8Array(oldArr.length + tcp_end - 1);
                newArr.set(oldArr, 0);
                newArr.set(arr_bytes.subarray(1, tcp_end), oldArr.length);
                yreq.bin_result = newArr;

                // when the request is closed, post result to caller
                if (ystream == YSTREAM.TCP_CLOSE || ystream == YSTREAM.TCP_ASYNCCLOSE) {
                    // Pop request from tcp channel
                    this.tcpChan[tcpchan] = yreq.next;

                    // Handle synchronous close
                    if (ystream == YSTREAM.TCP_CLOSE) {
                        // synchronous close
                        if (yreq.asyncId != 0) {
                            if (this._hub._yapi._logLevel >= 4) {
                                this._hub._yapi.imm_log('Synchronous close received instead of async-' + yreq.asyncId + ' close');
                            }
                            // no need to ack that close packet, we have sent the ack when aborting
                            // the request if the request was indeed coming from us
                            this.imm_asyncWebSocketError(YAPI_IO_ERROR, 'Synchronous close received, async ack expected');
                            return;
                        } else if (this.websocket) {
                            if (yreq.toBeSent && <number>yreq.sendPos < yreq.toBeSent.length) {
                                // close before completely sent
                                // force a websocket disconnection to resynchronize
                                if (this._hub._yapi._logLevel >= 3) {
                                    this._hub._yapi.imm_log('WS: tcpclose at ' + yreq.sendPos + ' < ' + yreq.toBeSent.length);
                                }
                                this._hub.imm_disconnectNow();
                                if (yreq.timeoutId) {
                                    clearTimeout(yreq.timeoutId);
                                }
                                if (yreq.asyncId == 0) {
                                    yreq.errorType = YAPI_IO_ERROR;
                                    yreq.errorMsg = 'TCP closed during upload';
                                    if (yreq.acceptor) {
                                        try { yreq.acceptor(yreq); } catch (e) {}
                                    }
                                }
                                return;
                            }
                            if (yreq.timeoutId) {
                                // request was not aborted, ack synchronous close by sending YSTREAM_TCP_CLOSE
                                let frame = new Uint8Array(1);
                                frame[0] = (YSTREAM.TCP_CLOSE << 3) + tcpchan;
                                this.websocket.send(frame);
                            }
                        }
                    }

                    // Clear timeout for this request
                    if (yreq.timeoutId) {
                        clearTimeout(yreq.timeoutId);
                        yreq.timeoutId = 0;
                    }

                    // process incoming reply
                    let pos = yreq.bin_result.indexOf(13);
                    if (pos < 0) {
                        yreq.errorType = YAPI_IO_ERROR;
                        yreq.errorMsg = 'Bad response header';
                    } else {
                        let header = this._hub._yapi.imm_bin2str(yreq.bin_result.subarray(0, pos));
                        let words = header.split(' ');
                        if (words[0] == 'OK') {
                            yreq.errorType = YAPI_SUCCESS;
                            let nextpos = yreq.bin_result.indexOf(13, pos + 2);
                            while (nextpos > pos + 2) {
                                pos = nextpos;
                                nextpos = yreq.bin_result.indexOf(13, pos + 2);
                            }
                            if (nextpos < 0) {
                                // just in case, but this should not happen normally
                                nextpos = pos;
                            }
                            yreq.bin_result = yreq.bin_result.subarray(nextpos + 2);
                        } else if (words[0] == '0K') {
                            yreq.errorType = YAPI_IO_ERROR;
                            yreq.errorMsg = 'Unexpected persistent connection';
                        } else {
                            let status = parseInt(words[1]);
                            yreq.errorType = (status == 401 ? YAPI_UNAUTHORIZED : YAPI_IO_ERROR);
                            yreq.errorMsg = 'HTTP error ' + header.slice(words[0].length + 1) + ' on ' + yreq.devUrl;
                        }
                    }
                    if (yreq.asyncId == 0) {
                        if (this._hub._yapi._logLevel >= 5) {
                            this._hub._yapi.imm_log('request @' + yreq._creat + ' done, status=' + yreq.errorType);
                        }
                        this.imm_sendPendingRequest(tcpchan);
                        if (yreq.acceptor) {
                            yreq.acceptor(yreq);
                        }
                    } else {
                        // asynchronous request: log errors, but nothing else to be done
                        if (yreq.errorType != YAPI_SUCCESS) {
                            this.imm_asyncWebSocketError(YAPI_IO_ERROR, 'Async request error: ' + yreq.errorMsg);
                        }
                    }
                }
                return;
            }
            if (!this.websocket) {
                return;
            }
            if (ystream == YSTREAM.META) {
                let metatype = arr_bytes[1];
                //this._yapi.imm_log(reltime+': META type='+metatype+' len='+arr_bytes.length);
                switch (metatype) {
                case USB_META.WS_ANNOUNCE:
                    if (arr_bytes.length < 1 + this._USB_META_WS_ANNOUNCE_SIZE) {
                        return;
                    }
                    this._remoteVersion = arr_bytes[2];
                    if (this._remoteVersion < 1) {
                        return;
                    }
                    let maxtcpws = (arr_bytes[3] << 4) + (arr_bytes[4] << 12);
                    if (maxtcpws > 0) {
                        this._tcpMaxWindowSize = maxtcpws;
                    }
                    this._remoteNonce = arr_bytes[5] + (arr_bytes[6] << 8) + (arr_bytes[7] << 16) + (arr_bytes[8] << 24);
                    for (let i = 9; i < 9 + 20; i++) {
                        if (arr_bytes[i] == 0) {
                            this._remoteSerial = this._hub._yapi.imm_bin2str(arr_bytes.subarray(9, i));
                            break;
                        }
                    }
                    let nonce = new Uint8Array(4);
                    this.imm_getRandomValues(nonce);
                    this._nonce = nonce[0] + (nonce[1] << 8) + (nonce[2] << 16) + (nonce[3] << 24);
                    this._connectionTime = this._hub._yapi.GetTickCount();
                    this._connectionState = WSConnState.AUTHENTICATING;
                    // send our authentication packet
                    let frame = new Uint8Array(1 + this._USB_META_WS_AUTHENTICATION_SIZE);
                    let version = (this._remoteVersion < 2 ? this._remoteVersion : 2);
                    let flags = 0;
                    frame[0] = (YSTREAM.META << 3);
                    frame[1] = USB_META.WS_AUTHENTICATION;
                    frame[2] = version;
                    if (this._runtime_urlInfo.imm_getPass() != '') {
                        flags = this._USB_META_WS_VALID_SHA1;
                        let sha1 = this.imm_computeAuth(this._runtime_urlInfo.imm_getUser(), this._runtime_urlInfo.imm_getPass(), this._remoteSerial, this._remoteNonce);
                        for (let i = 0; i < sha1.length; i++) {
                            frame[9 + i] = sha1[i];
                        }
                    }
                    frame[3] = flags & 0xff;
                    frame[4] = flags >>> 8;
                    frame[5] = this._nonce & 0xff;
                    frame[6] = (this._nonce >>> 8) & 0xff;
                    frame[7] = (this._nonce >>> 16) & 0xff;
                    frame[8] = (this._nonce >>> 24) & 0xff;
                    this.websocket.send(frame);
                    break;
                case USB_META.WS_AUTHENTICATION:
                    if (this._connectionState != WSConnState.AUTHENTICATING) {
                        return;
                    }
                    if (arr_bytes.length < 1 + this._USB_META_WS_AUTHENTICATION_SIZE) {
                        return;
                    }
                    this._tcpRoundTripTime = this._hub._yapi.GetTickCount() - this._connectionTime + 1;
                    if (this._tcpMaxWindowSize < 2048 && this._tcpRoundTripTime < 7) {
                        // Fix overly optimistic round-trip on YoctoHubs
                        this._tcpRoundTripTime = 7;
                    }
                    let uploadRate = (this._tcpMaxWindowSize * 1000 / this._tcpRoundTripTime) >> 0;
                    if (this._hub._yapi._logLevel >= 4) {
                        this._hub._yapi.imm_log('RTT=' + this._tcpRoundTripTime + 'ms, WS=' + this._tcpMaxWindowSize + ', uploadRate=' + (uploadRate / 1000) + ' KB/s');
                    }
                    this._remoteVersion = arr_bytes[2];
                    if (this._remoteVersion < 1) {
                        return;
                    }
                    let inflags = arr_bytes[3] + (arr_bytes[4] << 8);
                    if ((inflags & this._USB_META_WS_RW) != 0) {
                        this._hub.imm_setRwAccess(true);
                    } else {
                        this._hub.imm_setRwAccess(false)
                    }
                    if ((inflags & this._USB_META_WS_VALID_SHA1) != 0) {
                        let remote_sha1 = arr_bytes.subarray(9, 29);
                        let sha1 = this.imm_computeAuth(this._runtime_urlInfo.imm_getUser(), this._runtime_urlInfo.imm_getPass(), this._remoteSerial, this._nonce);
                        for (let i = 0; i < sha1.length; i++) {
                            if (sha1[i] != remote_sha1[i]) {
                                // bad signature
                                this._session_errno = 401;
                                this._session_error = 'Authentication failed';
                                this._connectionState = WSConnState.DEAD;
                                return;
                            }
                        }
                        // Password verified OK
                        this._connectionState = WSConnState.READY;
                    } else {
                        if (this._runtime_urlInfo.imm_getPass() == '') {
                            // No password required, connection OK
                            this._connectionState = WSConnState.READY;
                        } else {
                            // Hub did not sign password, unauthorized
                            this._session_errno = 401;
                            if (this._runtime_urlInfo.imm_getUser() == 'admin' && !this._hub.imm_isRwAccess()) {
                                this._session_error = 'Authentication as admin failed';
                            } else {
                                this._session_error = 'Password not set on remote hub';
                            }
                            this._connectionState = WSConnState.DEAD;
                            return;
                        }
                    }
                    break;
                case USB_META.WS_ERROR:
                    this._session_errno = arr_bytes[3] + (arr_bytes[4] << 8);
                    if (this._session_errno == 401) {
                        this._session_error = 'Authentication failed';
                    } else {
                        this._session_error = 'Remote hub closed connection with error ' + this._session_errno;
                    }
                    this._connectionState = WSConnState.DEAD;
                    break;
                case USB_META.ACK_UPLOAD:
                    tcpchan = arr_bytes[2];
                    if (this.tcpChan[tcpchan]) {
                        let yreq = <YHTTPRequest>this.tcpChan[tcpchan];
                        let ackBytes = arr_bytes[3] + (arr_bytes[4] << 8) + (arr_bytes[5] << 16) + (arr_bytes[6] << 24);
                        let ackTime = this._hub._yapi.GetTickCount();
                        if (this._lastUploadAckTime[tcpchan] != 0 && ackBytes > this._lastUploadAckBytes[tcpchan]) {
                            this._lastUploadAckBytes[tcpchan] = ackBytes;
                            this._lastUploadAckTime[tcpchan] = ackTime;
                            let deltaBytes = ackBytes - this._lastUploadRateBytes[tcpchan];
                            let deltaTime = ackTime - this._lastUploadRateTime[tcpchan];
                            if (deltaTime < 500) break; // wait more
                            if (deltaTime < 1000 && deltaBytes < 65536) break; // wait more
                            this._lastUploadRateBytes[tcpchan] = ackBytes;
                            this._lastUploadRateTime[tcpchan] = ackTime;
                            if (yreq.progressCb && yreq.toBeSent) {
                                yreq.progressCb(ackBytes, yreq.toBeSent.length);
                            }
                            let newRate = deltaBytes * 1000 / deltaTime;
                            this._uploadRate[tcpchan] = (0.8 * this._uploadRate[tcpchan] + 0.3 * newRate) >> 0;// +10% intentionally
                            if (this._hub._yapi._logLevel >= 5) {
                                this._hub._yapi.imm_log("New rate: " + (this._uploadRate[tcpchan] / 1000) + " KB/s (last " + ((deltaBytes / 1000) >> 0) + "KB sent at " + ((newRate >> 0) / 1000) + " KB/s)");
                            }
                        } else {
                            //this._yapi.imm_log("First Ack received");
                            this._lastUploadAckBytes[tcpchan] = ackBytes;
                            this._lastUploadAckTime[tcpchan] = ackTime;
                            this._lastUploadRateBytes[tcpchan] = ackBytes;
                            this._lastUploadRateTime[tcpchan] = ackTime;
                            if (yreq.progressCb && yreq.toBeSent) {
                                yreq.progressCb(ackBytes, yreq.toBeSent.length);
                            }
                            // Make sure upload resumes as soon as the first packet is confirmed
                            this.imm_sendPendingRequest(tcpchan);
                        }
                    }
                    break;
                }
                return;
            }
            this.imm_asyncWebSocketError(YAPI_IO_ERROR, 'Unsupported message: ' + this._hub._yapi.imm_bin2hexstr(arr_bytes));
        } catch (e) {
            this._hub._yapi.imm_log('Unhandled exception in _webSocketMsg:', e);
        }
    }

    /** Send an outgoing packet
     *
     * @param arr_bytes {Uint8Array}
     **/
    imm_webSocketSend(arr_bytes: Uint8Array): void
    {
        if (this.websocket) {
            this.websocket.send(arr_bytes);
        }
    }

    imm_hasPendingRequest(): boolean
    {
        for (let tcpchan = 0; tcpchan < 4; tcpchan++) {
            let queue = this.tcpChan[tcpchan];
            if (queue) {
                return true;
            }
        }
        return false;
    }

    async waitForPendingQueries(ms_duration: number): Promise<void>
    {
        let end: number = this._hub._yapi.GetTickCount() + ms_duration;
        let remaining: number = ms_duration;
        while (this.imm_hasPendingRequest() && remaining > 0) {
            let waitTime: number = Math.min(remaining, 25);
            await new Promise<void>((resolve, reject): void => { setTimeout(resolve, waitTime); });
            remaining = end - this._hub._yapi.GetTickCount();
        }
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
        if (this._hub._yapi._logLevel >= 3) {
            this._hub.imm_logrequest(method, devUrl, obj_body);
        }
        //noinspection UnnecessaryLocalVariableJS
        let httpPromise = new Promise<YHTTPRequest>(
            (resolve, reject): void => {
                let subReq = method + ' ' + devUrl + ' \r\n\r\n';
                let ws = this.websocket;
                let isAsync = (this._remoteVersion > 0 && devUrl.slice(-2) == '&.');
                let yreq = new YHTTPRequest(new Uint8Array(0));

                if (this._hub._yapi._logLevel >= 5) {
                    yreq._creat = (Date.now() % 600000).toString();
                    this._hub._yapi.imm_log('request @' + yreq._creat + ': ' + method + ' ' + devUrl);
                }
                yreq.acceptor = resolve;
                yreq.devUrl = devUrl;
                yreq.sendPos = 0;
                if (obj_body) {
                    let boundary = this._hub.imm_getBoundary();
                    let body = this._hub.imm_formEncodeBody(obj_body, boundary);
                    subReq = subReq.slice(0, -2) +
                        'Content-Type: x-upload, boundary=' + boundary + '\r\n\r\n';
                    yreq.toBeSent = new Uint8Array(subReq.length + body.length);
                    yreq.toBeSent.set(body, subReq.length);
                    yreq.progressCb = obj_body.progressCb;
                } else {
                    yreq.toBeSent = new Uint8Array(subReq.length);
                }
                for (let i = 0; i < subReq.length; i++) {
                    yreq.toBeSent[i] = subReq.charCodeAt(i);
                }
                if (tcpchan > 3) {
                    yreq.errorType = YAPI_IO_ERROR;
                    yreq.errorMsg = 'Unsupported tcpChan ' + tcpchan;
                    try { yreq.acceptor(yreq); } catch (e) {}
                    return;
                }
                if (!ws || this._hub.imm_isDisconnecting() || this._connectionState != WSConnState.CONNECTED) {
                    if (this._hub._yapi._logLevel >= 4) {
                        let wsState: string = (ws ? ' websocket=NULL' : '');
                        let dsState: string = (this._hub.imm_isDisconnecting() ? ' disconnecting' : '');
                        let cnState: string = (this._connectionState != WSConnState.CONNECTED ? ' connState=' + this._connectionState : '');
                        this._hub._yapi.imm_log('request @' + yreq._creat + ' failed, websocket is down:' + wsState + dsState + cnState);
                    }
                    yreq.errorType = YAPI_IO_ERROR;
                    yreq.errorMsg = 'WebSocket not connected';
                    try { yreq.acceptor(yreq); } catch (e) {}
                    return;
                }

                if (isAsync) {
                    yreq.asyncId = this.nextAsyncId++;
                    if (this.nextAsyncId >= 127) {
                        this.nextAsyncId = 48;
                    }
                }

                // Queue all requests on tcpChan 0 for now, to preserve request order
                let queue = this.tcpChan[tcpchan];
                if (queue) {
                    while (queue.next) {
                        queue = queue.next;
                    }
                    queue.next = yreq;
                } else {
                    this.tcpChan[tcpchan] = yreq;
                }

                // Send request if possible
                this.imm_sendPendingRequest(tcpchan);
            }
        );
        //noinspection JSValidateTypes
        return httpPromise;
    }

    /** Send all possible pending requests on specified tcpchan
     *
     * @param tcpchan {number}
     */
    imm_sendPendingRequest(tcpchan: number): void
    {
        let yreq = this.tcpChan[tcpchan];

        while (yreq) {
            if (!this.websocket || this._hub.imm_isDisconnecting() || this._connectionState != WSConnState.CONNECTED) {
                if (this._hub._yapi._logLevel >= 4) {
                    this._hub._yapi.imm_log('request @' + yreq._creat + ' failed, websocket is down');
                }
                yreq.errorType = YAPI_IO_ERROR;
                yreq.errorMsg = 'WebSocket not connected';
                if (yreq.acceptor) {
                    try { yreq.acceptor(yreq); } catch (e) {}
                }
                yreq = yreq.next;
                continue;
            }

            // synchronous request pending, cannot do more for now
            let pendingCount = 1;
            for (let yr = yreq; yr.next; yr = yr.next) {
                pendingCount++;
            }

            if (!yreq.toBeSent) {
                // request already sent
                if (yreq.asyncId == 0) {
                    if (this._hub._yapi._logLevel >= 5) {
                        this._hub._yapi.imm_log(pendingCount.toString() + ' req pending, @' + yreq._creat + ' not completed');
                    }
                    return;
                }
                yreq = yreq.next;
                continue;
            }

            // Send request
            let isAsync = (yreq.asyncId != 0);
            let asyncCloseSet = false;
            let pos = yreq.sendPos;
            let end = yreq.toBeSent.length;
            let i, frame;
            if (end > 2108 && this._remoteVersion >= 2 && tcpchan == 0) {
                // Perform throttling on large uploads
                if (pos == 0) {
                    // First chunk is always first multiple of full window (124 bytes) above 2KB
                    end = 2108;
                    // Prepare to compute effective transfer rate
                    this._lastUploadAckBytes[tcpchan] = 0;
                    this._lastUploadAckTime[tcpchan] = 0;
                    // Start with initial RTT based estimate
                    this._uploadRate[tcpchan] = (this._tcpMaxWindowSize * 1000 / this._tcpRoundTripTime) >> 0;
                } else if (this._lastUploadAckTime[tcpchan] == 0) {
                    // first block not yet acked, wait more
                    if (yreq.sendTimeoutId) clearTimeout(yreq.sendTimeoutId);
                    yreq.sendTimeoutId = setTimeout((): void => { this.imm_sendPendingRequest(tcpchan); }, this._tcpRoundTripTime);
                    return;
                } else {
                    // adapt window frame to available bandwidth
                    let bytesOnTheAir = pos - this._lastUploadAckBytes[tcpchan];
                    let uploadRate = this._uploadRate[tcpchan];
                    let timeOnTheAir = this._hub._yapi.GetTickCount() - this._lastUploadAckTime[tcpchan];
                    let toBeSent = (2 * uploadRate + 1024 - bytesOnTheAir + (uploadRate * timeOnTheAir / 1000)) >> 0;
                    if (toBeSent + bytesOnTheAir > this._DEFAULT_TCP_MAX_WINDOW_SIZE) {
                        toBeSent = this._DEFAULT_TCP_MAX_WINDOW_SIZE - bytesOnTheAir;
                    }
                    if (toBeSent < 64) {
                        let waitTime = (1000 * (128 - toBeSent) / uploadRate) >> 0;
                        if (waitTime < 2) waitTime = 2;
                        //this._yapi.imm_log(bytesOnTheAir + " sent " + timeOnTheAir + "ms ago, waiting " + waitTime + "ms...");
                        if (yreq.sendTimeoutId) clearTimeout(yreq.sendTimeoutId);
                        yreq.sendTimeoutId = setTimeout((): void => { this.imm_sendPendingRequest(tcpchan); }, waitTime);
                        return;
                    }
                    if (end > pos + toBeSent) {
                        // when sending partial content, round up to full frames
                        if (toBeSent > 124) {
                            toBeSent = ((toBeSent / 124) >> 0) * 124;
                        }
                        end = pos + toBeSent;
                    }
                }
            }
            //this._yapi.imm_log("Upload data from "+pos+" to "+end);
            while (pos < end) {
                let framelen = 1 + end - pos;
                if (framelen > 125) framelen = 125;
                let datalen = framelen - 1;
                if (pos + datalen < 180 && pos + datalen >= 192) {
                    // on a YoctoHub, the input FIFO is limited to 192, and we can only
                    // accept a frame if it fits entirely in the input FIFO. So make sure
                    // the beginning of the request gets delivered entirely
                    datalen = 191 - pos;
                    framelen = datalen + 1;
                }

                if (isAsync && pos + datalen == yreq.toBeSent.length && framelen < 125) {
                    frame = new Uint8Array(framelen + 1);
                    frame[0] = 8 * YSTREAM.TCP_ASYNCCLOSE + tcpchan;
                    frame[framelen] = yreq.asyncId;
                    asyncCloseSet = true;
                } else {
                    frame = new Uint8Array(framelen);
                    frame[0] = 8 * YSTREAM.TCP + tcpchan;
                }
                frame.set(yreq.toBeSent.subarray(pos, pos + datalen), 1);
                pos += datalen;
                this.imm_webSocketSend(frame);
            }
            let sent = pos - yreq.sendPos;
            yreq.sendPos = pos;
            if (yreq.sendPos < yreq.toBeSent.length) {
                // not completely sent, cannot do more for now
                let waitTime = (1000 * sent / this._uploadRate[tcpchan]) >> 0;
                if (waitTime < 2) waitTime = 2;
                //this._yapi.imm_log("Sent " + sent + " bytes, waiting " + waitTime + "ms...");
                if (yreq.sendTimeoutId) clearTimeout(yreq.sendTimeoutId);
                yreq.sendTimeoutId = setTimeout((): void => { this.imm_sendPendingRequest(tcpchan); }, waitTime);
                return;
            }

            if (isAsync && !asyncCloseSet) {
                frame = new Uint8Array(2);
                frame[0] = 8 * YSTREAM.TCP_ASYNCCLOSE + tcpchan;
                frame[1] = yreq.asyncId;
                this.imm_webSocketSend(frame);
            }

            // Mark request as sent
            yreq.toBeSent = null;

            if (isAsync && yreq.acceptor) {
                // Accept asynchronous queries immediately
                try {
                    yreq.acceptor(yreq);
                } catch (e) {
                    // discard exception
                    this._hub._yapi.imm_log('WS: async acceptor exception: ', e);
                }
            }

            // Setup timeout counter
            let mstimeout = this._hub._yapi._networkTimeoutMs;
            if (yreq.devUrl) {
                if (yreq.devUrl.indexOf('/testcb.txt') >= 0) {
                    mstimeout = this._YIO_1_MINUTE_TCP_TIMEOUT;
                } else if (yreq.devUrl.indexOf('/logger.json') >= 0) {
                    mstimeout = this._YIO_1_MINUTE_TCP_TIMEOUT;
                } else if (yreq.devUrl.indexOf('/rxmsg.json') >= 0) {
                    mstimeout = this._YIO_1_MINUTE_TCP_TIMEOUT;
                } else if (yreq.devUrl.indexOf('/rxdata.bin') >= 0) {
                    mstimeout = this._YIO_1_MINUTE_TCP_TIMEOUT;
                } else if (yreq.devUrl.indexOf('/at.txt') >= 0) {
                    mstimeout = this._YIO_1_MINUTE_TCP_TIMEOUT;
                } else if (yreq.devUrl.indexOf('/files.json') >= 0) {
                    mstimeout = this._YIO_1_MINUTE_TCP_TIMEOUT;
                } else if (yreq.devUrl.indexOf('/upload.html') >= 0) {
                    mstimeout = this._YIO_10_MINUTES_TCP_TIMEOUT;
                } else if (yreq.devUrl.indexOf('/flash.json') >= 0) {
                    mstimeout = this._YIO_10_MINUTES_TCP_TIMEOUT;
                } else if (yreq.devUrl.indexOf('/Yvw4I.js') >= 0) {
                    mstimeout = this._YIO_10_MINUTES_TCP_TIMEOUT;
                }
            }
            yreq.timeoutId = setTimeout((chan, yr): void => { this.imm_abortRequest(chan, yr); }, mstimeout, tcpchan, yreq);
            yreq._sent = (Date.now() % 600000).toString();

            // Wait for request completion in case this is a sync request
            if (this._hub._yapi._logLevel >= 5) {
                this._hub._yapi.imm_log('req @' + yreq._creat + ' sent (1/' + pendingCount.toString() + ')' +
                    (isAsync ? ' async-' + yreq.asyncId + ', continue' : ', waiting for reply'));
            }

            if (!isAsync) {
                return;
            }

            // Try to send next pending request, if possible
            yreq = yreq.next;
        }
    }

    // Abort a request and send close packet to peer
    //
    imm_abortRequest(tcpchan: number, yreq: YHTTPRequest): void
    {
        // make sure the request has not been completed in between
        if (!yreq.timeoutId) return;
        yreq.timeoutId = null;

        if (yreq.asyncId == 0) {
            // send a close to abort synchronous request
            let frame = new Uint8Array(1);
            frame[0] = 8 * YSTREAM.TCP_CLOSE + tcpchan;
            this.imm_webSocketSend(frame);

            if (this._hub._yapi._logLevel >= 4) {
                let pendingCount = 1;
                for (let yr = yreq; yr.next; yr = yr.next) {
                    pendingCount++;
                }
                this._hub._yapi.imm_log(pendingCount.toString() + ' req pending, @' + yreq._creat + ' is in timeout');
            }

            // device is still expected to send a close to remove request from queue
            // but if that does not happen, remove the request from queue after 5 seconds
            setTimeout((chan: number, yr: YHTTPRequest): void => {
                this._hub._yapi.imm_log('Dropping synchronous request after timeout: ' + yr.devUrl);
                this.imm_forgetRequest(chan, yr);
            }, 5000, tcpchan, yreq);
        }

        // log error
        this.imm_asyncWebSocketError(YAPI_IO_ERROR, 'Timeout on ' + yreq.devUrl + ' (tcpchan ' + tcpchan + ')');
    }

    // Drop a request from queue in case of timeout after abort
    //
    imm_forgetRequest(tcpchan: number, yreq: YHTTPRequest): void
    {
        let queue = this.tcpChan[tcpchan];
        if (queue == yreq) {
            // pop blocking request and resume processing
            this.tcpChan[tcpchan] = yreq.next;

            // mark request as failed
            if (yreq.asyncId == 0) {
                yreq.errorType = YAPI_IO_ERROR;
                yreq.errorMsg = 'Timeout on ' + yreq.devUrl + ' (tcpchan ' + tcpchan + ')';
                if (yreq.acceptor) {
                    try { yreq.acceptor(yreq); } catch (e) {}
                }
            }

            this.imm_sendPendingRequest(tcpchan);
        }
    }

    // Drop all pending requests from queues, as well as forwarded connection, when a hub connection is dropped
    //
    imm_dropAllPendingConnection(): void
    {
        if (this.fwd_connectionState != WSConnState.DISCONNECTED && this.fwd_websocket) {
            this.fwd_connectionState = WSConnState.DISCONNECTED;
            this.fwd_websocket.close();
            this.fwd_websocket = null;
        }
        for (let tcpchan = 0; tcpchan < this.tcpChan.length; tcpchan++) {
            for (let yreq = this.tcpChan[tcpchan]; yreq; yreq = yreq.next) {
                // Remove request from queue
                this.tcpChan[tcpchan] = yreq.next;

                // Clear timeout for this request
                if (yreq.timeoutId) {
                    clearTimeout(yreq.timeoutId);
                    yreq.timeoutId = 0;
                }

                // mark request as failed
                if (yreq.asyncId == 0) {
                    if (this._hub._yapi._logLevel >= 4) {
                        this._hub._yapi.imm_log('drop @' + yreq._creat + ' (websocket down)');
                    }
                    yreq.errorType = YAPI_IO_ERROR;
                    yreq.errorMsg = 'Request ' + yreq.devUrl + ' dropped (websocket down)';
                    if (yreq.acceptor) {
                        try { yreq.acceptor(yreq); } catch (e) {}
                    }
                }
            }
        }
    }

    async websocketJoin(ws: _YY_WebSocket, arr_credentials: WebSocketCredential[], close_callback: Function): Promise<boolean>
    {
        if (this._connectionState != WSConnState.CONNECTED) {
            this.imm_asyncWebSocketError(YAPI_IO_ERROR, 'Hub is disconnected, cannot join');
            return false;
        }

        // Store websocket interface
        this.fwd_websocket = ws;
        this.fwd_credentials = arr_credentials;
        this.fwd_closeCallback = close_callback;
        this.fwd_connectionState = WSConnState.CONNECTING;
        ws.onmessage = ((evt: _YY_WebSocketMessageEvent): void => {
            if (this.fwd_connectionState == WSConnState.CONNECTED) {
                // forward to remote hub
                if (this._connectionState == WSConnState.CONNECTED) {
                    this.imm_webSocketSend(evt.data);
                } else {
                    // drop unexpected frame in disconnected state
                    this._hub._yapi.imm_log('WS: drop packet from fwd API (state=' + this._connectionState + ')');
                }
            } else if (this.fwd_connectionState == WSConnState.AUTHENTICATING) {
                // handle authentication packet
                this.imm_handleAPIAuthPkt(evt.data);
            } else {
                // drop unexpected frame in disconnected state
                this._hub._yapi.imm_log('WS: drop packet from fwd API (fwd_state=' + this.fwd_connectionState + ')');
            }
        });
        ws.onclose = ((evt: _YY_WebSocketCloseEvent): void => {
            this.fwd_connectionState = WSConnState.DISCONNECTED;
            this.fwd_websocket = null;
            if (this.fwd_closeCallback) {
                this.fwd_closeCallback();
            }
        });

        return this.imm_sendAPIAnnouncePkt();
    }

    imm_sendAPIAnnouncePkt(): boolean
    {
        if (!this.fwd_websocket) {
            return false;
        }
        let frame = new Uint8Array(1 + this._USB_META_WS_ANNOUNCE_SIZE);
        let nonce = new Uint8Array(4);
        this.imm_getRandomValues(nonce);
        frame[0] = (YSTREAM.META << 3);
        frame[1] = USB_META.WS_ANNOUNCE;
        frame[2] = 2;       // protocol version
        frame[3] = (this._tcpMaxWindowSize >> 4) & 0xff;  // TCP window size, in para
        frame[4] = (this._tcpMaxWindowSize >> 12) & 0xff;
        for (let i = 0; i < 4; i++) {
            frame[5 + i] = nonce[i];
        }
        for (let i = 0; i < this._remoteSerial.length && i < 20; i++) {
            frame[9 + i] = this._remoteSerial.charCodeAt(i);
        }
        this.fwd_nonce = frame[5] + (frame[6] << 8) + (frame[7] << 16) + (frame[8] << 24);
        this.fwd_connectionState = WSConnState.AUTHENTICATING;
        this.fwd_websocket.send(frame);

        return true;
    }

    imm_handleAPIAuthPkt(msg: Uint8Array): void
    {
        if (msg.length < 1 + this._USB_META_WS_AUTHENTICATION_SIZE || msg[0] != (YSTREAM.META << 3)) {
            if (this._hub._yapi._logLevel >= 3) {
                this._hub._yapi.imm_log("bad-apiauth1\n");
            }
            this.fwd_connectionState = WSConnState.DEAD;
            return;
        }
        if (msg[1] != USB_META.WS_AUTHENTICATION || msg[2] > 2) {
            if (this._hub._yapi._logLevel >= 3) {
                this._hub._yapi.imm_log("bad-apiauth2\n");
            }
            this.fwd_connectionState = WSConnState.DEAD;
            return;
        }
        this._remoteVersion = msg[2];

        // Only accepts authenticated requests
        let flags = msg[3] + (msg[4] << 8);
        if ((flags & this._USB_META_WS_VALID_SHA1) == 0) {
            if (this._hub._yapi._logLevel >= 3) {
                this._hub._yapi.imm_log("bad-apiauth3\n");
            }
            this.fwd_connectionState = WSConnState.DEAD;
            return;
        }
        if (!this.fwd_websocket) {
            if (this._hub._yapi._logLevel >= 3) {
                this._hub._yapi.imm_log("no-fwd-ws\n");
            }
            this.fwd_connectionState = WSConnState.DEAD;
            return;
        }

        let credIdx, remote_sha1 = msg.subarray(9, 29);
        let credentials = this.fwd_credentials;
        for (credIdx = 0; credIdx < credentials.length; credIdx++) {
            let j, sha1 = this.imm_computeAuth(credentials[credIdx].user, credentials[credIdx].pass, this._remoteSerial, this.fwd_nonce);
            for (j = 0; j < sha1.length; j++) {
                if (sha1[j] != remote_sha1[j]) break;
            }
            if (j >= sha1.length) break;
        }
        if (credIdx >= credentials.length) {
            // bad signature, return unsigned frame to signal invalid password
            if (this._hub._yapi._logLevel >= 3) {
                this._hub._yapi.imm_log("bad-apiauth4\n");
            }
            msg.fill(0, 3);
            this.fwd_websocket.send(msg);
            this.fwd_connectionState = WSConnState.DEAD;
            return;
        }

        // Return auth packet with new nonce and new signature to confirm connection
        msg[3] |= this._USB_META_WS_RW;
        this.fwd_nonce = msg[5] + (msg[6] << 8) + (msg[7] << 16) + (msg[8] << 24);
        let sha1 = this.imm_computeAuth(credentials[credIdx].user, credentials[credIdx].pass, this._remoteSerial, this.fwd_nonce);
        for (let i = 0; i < sha1.length; i++) {
            msg[9 + i] = sha1[i];
        }
        this.fwd_websocket.send(msg);
        this.fwd_connectionState = WSConnState.CONNECTED;
    }

    async detach(errType: number = YAPI.IO_ERROR, errMsg: string = 'Hub has been forcibly detached'): Promise<void>
    {
        let tcpchan_busy;
        let timeout = this._hub._yapi.GetTickCount() + 3000;
        do {
            tcpchan_busy = false;
            for (let tcpchan = 0; tcpchan < 4; tcpchan++) {
                if (this.tcpChan[tcpchan] != null) {
                    tcpchan_busy = true;
                    break;
                }
            }
            if (tcpchan_busy) {
                await this._hub._yapi._microSleep_internal();
            }
        } while (tcpchan_busy && timeout > this._hub._yapi.GetTickCount());

        this._hub.imm_commonDisconnect('detach', errType, errMsg);
        this._hub.imm_disconnectNow();
    }

    // abort communication channel immediately
    //
    // If a connectionID is passed as argument, only abort the
    // communication channel if the ID matched current connection
    //
    imm_disconnectEngineNow(connID: string = ''): void
    {
        if (!this.websocket) {
            return;
        }
        this._connectionState = WSConnState.DISCONNECTED;
        let prevOpenID = (connID ? connID : this._hub.imm_getCurrentConnID());
        let websocket = this.websocket;
        this._hub.imm_setCurrentConnID('');
        this.websocket = null;
        websocket.onclose = null;
        websocket.onerror = null;
        try {
            // soft close
            websocket.close();
        } catch (e) {}
        if (websocket.terminate) {
            // schedule a socket hard close after 0.9s
            setTimeout((): void => {
                try {
                    if (websocket.terminate) {
                        websocket.terminate();
                    }
                } catch (e) {}
            }, 900);
        }
        this.imm_dropAllPendingConnection();
        this._hub.imm_signalHubDisconnected(prevOpenID);
    }

    imm_isConnected(): boolean
    {
        if (this._connectionState != WSConnState.CONNECTED) {
            return false;
        }
        return super.imm_isConnected();
    }
}

interface _YY_SSDPCacheEntry
{
    serial: string;
    url: string;
    detectedTime: number;
    maxAge: number;
}

interface _YY_SSDPCache
{
    [uuid: string]: _YY_SSDPCacheEntry;
}

interface _YY_SSDPValues
{
    [ident: string]: string;
}

/*
 * SSDP-based hub discovery, available on Node.JS only (requires UDP sockets)
 */
export abstract class YGenericSSDPManager
{
    _yapi: YAPIContext;
    _started: boolean = false;
    _callback: Function | null = null;
    _SSDPCache: _YY_SSDPCache = {};
    _thread: any = null;        /* actually a NodeJS.Timeout */

    YSSDP_PORT: number = 1900;
    YSSDP_MCAST_ADDR_STR: string = '239.255.255.250';
    YSSDP_URN_YOCTOPUCE: string = "urn:yoctopuce-com:device:hub:1";
    YSSDP_DISCOVERY_MSG: string = "M-SEARCH * HTTP/1.1\r\n" +
        "HOST:" + this.YSSDP_MCAST_ADDR_STR + ":" + this.YSSDP_PORT + "\r\n" +
        "MAN:\"ssdp:discover\"\r\n" +
        "MX:5\r\n" +
        "ST:" + this.YSSDP_URN_YOCTOPUCE + "\r\n" +
        "\r\n";

    constructor(obj_yapi: YAPIContext)
    {
        this._yapi = obj_yapi;
    }

    abstract ySSDPOpenSockets(): Promise<void>;
    abstract ySSDPCloseSockets(): Promise<void>;
    abstract ySSDPSendPacket(msg: string, port: number, ipaddr: string): Promise<void>;

    async _invokeCallback(str_serial: string, str_addUrl: string | null, str_removeUrl: string | null): Promise<void>
    {
        if (this._callback) {
            try {
                await this._callback(str_serial, str_addUrl, str_removeUrl);
            } catch (e) {
                this._yapi.imm_log('Exception in hub discovery callback:', e);
            }
        }
    }

    imm_uuidToSerial(str_uuid: string): string | null
    {
        let s = '', pad = '';
        let i = 0, u = 0;

        for (; i < 4; i++, u += 2) {
            s += String.fromCharCode(parseInt(str_uuid.substr(u, 2), 16));
        }
        u++;
        for (; i < 6; i++, u += 2) {
            s += String.fromCharCode(parseInt(str_uuid.substr(u, 2), 16));
        }
        u++;
        for (; i < 8; i++, u += 2) {
            s += String.fromCharCode(parseInt(str_uuid.substr(u, 2), 16));
        }
        s += '-';
        u = str_uuid.indexOf("-COFF-EE");
        if (u < 0) {
            return null;
        }
        u += 8;
        while (str_uuid.charAt(u) === '0') {
            u++;
        }
        if (s.substr(0, 8) === "VIRTHUB0") {
            pad = '0000000000';
        } else {
            pad = '00000';
        }
        s += pad.substr(str_uuid.length - u);
        s += str_uuid.substr(u);
        return s;
    }

    async ySSDPUpdateCache(str_uuid: string, str_url: string, int_cacheValidity: number): Promise<void>
    {
        if (int_cacheValidity <= 0) {
            int_cacheValidity = 1800;
        }
        int_cacheValidity *= 1000;

        let now = this._yapi.GetTickCount();
        let p = this._SSDPCache[str_uuid];
        if (p) {
            p.detectedTime = now;
            p.maxAge = int_cacheValidity;
            if (str_url !== p.url) {
                await this._invokeCallback(p.serial, str_url, p.url);
                p.url = str_url;
            } else {
                await this._invokeCallback(p.serial, str_url, null);
            }
        } else {
            let serial = this.imm_uuidToSerial(str_uuid);
            if (serial) {
                this._SSDPCache[str_uuid] = {
                    "serial": serial,
                    "url": str_url,
                    "detectedTime": now,
                    "maxAge": int_cacheValidity
                };
                await this._invokeCallback(serial, str_url, null);
            }
        }
    }

    async ySSDPParseMessage(str_msg: string): Promise<void>
    {
        let SSDP_HTTP = "HTTP/1.1 200 OK";
        let SSDP_NOTIFY = "NOTIFY * HTTP/1.1";
        let lines: string[] = str_msg.split('\r\n');
        let values: _YY_SSDPValues = {};
        if (lines[0] === SSDP_HTTP || lines[0] === SSDP_NOTIFY) {
            for (let i = 1; i < lines.length; i++) {
                let parts = lines[i].split(': ');
                if (parts.length === 2) {
                    values[parts[0].trim()] = parts[1].trim();
                }
            }
            if (values['LOCATION'] && values['USN'] && values['CACHE-CONTROL'] &&
                values['USN'].indexOf(this.YSSDP_URN_YOCTOPUCE) > 0) {
                let uuid = values['USN'].split(':')[1];
                let location = values['LOCATION'].split('/')[2];
                let cacheVal = parseInt(values['CACHE-CONTROL']);
                await this.ySSDPUpdateCache(uuid, location, cacheVal);
            }
        }
    }

    async ySSDPCheckExpiration(): Promise<void>
    {
        let now = this._yapi.GetTickCount();
        if (this._thread) {
            clearTimeout(this._thread);
            this._thread = null;
        }
        for (let uuid in this._SSDPCache) {
            let p = this._SSDPCache[uuid];
            if (!p) continue;
            if (now - p.detectedTime > p.maxAge) {
                p.maxAge = 0;
                await this._invokeCallback(p.serial, null, p.url);
            }
        }
        this._thread = setTimeout((): void => { this.ySSDPCheckExpiration(); }, 3000);
    }

    async ySSDPStart(func_callback: Function): Promise<number>
    {
        if (this._started) {
            return YAPI.SUCCESS;
        }
        this._callback = func_callback;
        await this.ySSDPOpenSockets();

        // send initial discovery packets when interface is bound
        this.ySSDPDiscover();

        this._started = true;
        await this.ySSDPCheckExpiration();
        return YAPI.SUCCESS;
    }

    async ySSDPStop(): Promise<void>
    {
        if (this._thread) {
            clearTimeout(this._thread);
            this._thread = null;
        }
        await this.ySSDPCloseSockets();
        for (let uuid in this._SSDPCache) {
            let p = this._SSDPCache[uuid];
            if (!p) continue;
            if (p.maxAge) {
                await this._yapi.UnregisterHub(p.url);
                p.maxAge = 0;
                await this._invokeCallback(p.serial, null, p.url);
            }
        }
        this._SSDPCache = {};
        this._started = false;
    }

    async ySSDPDiscover(): Promise<void>
    {
        for (let rep = 0; rep < 3; rep++) {
            await YAPI.Sleep(10 << rep);
            await this.ySSDPSendPacket(this.YSSDP_DISCOVERY_MSG, this.YSSDP_PORT, this.YSSDP_MCAST_ADDR_STR);
        }
    }
}

//--- (generated code: YHub definitions)
//--- (end of generated code: YHub definitions)

//--- (generated code: YHub class start)
/**
 * YHub Class: Hub Interface
 *
 *
 */
//--- (end of generated code: YHub class start)

export class YHub
{

    //--- (generated code: YHub attributes declaration)
    _ctx: YAPIContext;
    _hubref: number = 0;
    _userData: any;

    // API symbols as static members
    //--- (end of generated code: YHub attributes declaration)

    constructor(obj_yapi: YAPIContext, hubref: number)
    {
        //--- (generated code: YHub constructor)
        //--- (end of generated code: YHub constructor)
        this._ctx = obj_yapi;
        this._hubref = hubref;
    }

    private async _getStrAttr_internal(attrName: string): Promise<string>
    {

        let hub: YGenericHub | null = this._ctx.getGenHub(this._hubref);
        if (hub == null) {
            return "";
        }
        switch (attrName) {
        case "registeredUrl":
            return hub.imm_getOriginalURL();
        case "connectionUrl":
            return hub.imm_getRootUrl();
        case "serialNumber":
            return hub.imm_getSerialNumber();
        case "errorMessage":
            return hub.get_errorMessage()
        default:
            return "";
        }
    }
    private async _getIntAttr_internal(attrName: string): Promise<number>
    {
        let hub: YGenericHub | null = this._ctx.getGenHub(this._hubref);
        if (attrName == "isInUse") {
            return hub != null ? 1 : 0;
        }
        if (hub == null) {
            return -1;
        }
        switch (attrName) {
        case "isOnline":
            return hub.imm_isOnline() ? 1 : 0;
        case "isReadOnly":
            return await hub.hasRwAccess() ? 0 : 1;
        case "networkTimeout":
            return hub.imm_getNetworkTimeout();
        case "errorType":
            return hub.get_errorType();
        default:
            return -1;
        }
    }
    private async _setIntAttr_internal(attrName: string, value: number): Promise<void>
    {
        let hub: YGenericHub | null = this._ctx.getGenHub(this._hubref);
        if (hub != null && attrName == "networkTimeout") {
            hub.imm_setNetworkTimeout(value);
        }
    }

    get_knownUrls_internal(): string[]
    {
        let hub: YGenericHub | null = this._ctx.getGenHub(this._hubref);
        if (hub != null) {
            return hub.get_knownUrls();
        }
        return [];
    }

    //--- (generated code: YHub implementation)

    async _getStrAttr(attrName: string): Promise<string>
    {
        return await this._getStrAttr_internal(attrName);
    }

    async _getIntAttr(attrName: string): Promise<number>
    {
        return await this._getIntAttr_internal(attrName);
    }

    async _setIntAttr(attrName: string, value: number): Promise<void>
    {
        return await this._setIntAttr_internal(attrName, value);
    }

    /**
     * Returns the URL that has been used first to register this hub.
     */
    async get_registeredUrl(): Promise<string>
    {
        return await this._getStrAttr('registeredUrl');
    }

    /**
     * Returns all known URLs that have been used to register this hub.
     * URLs are pointing to the same hub when the devices connected
     * are sharing the same serial number.
     */
    async get_knownUrls(): Promise<string[]>
    {
        return await this.get_knownUrls_internal();
    }

    /**
     * Returns the URL currently in use to communicate with this hub.
     */
    async get_connectionUrl(): Promise<string>
    {
        return await this._getStrAttr('connectionUrl');
    }

    /**
     * Returns the hub serial number, if the hub was already connected once.
     */
    async get_serialNumber(): Promise<string>
    {
        return await this._getStrAttr('serialNumber');
    }

    /**
     * Tells if this hub is still registered within the API.
     *
     * @return true if the hub has not been unregistered.
     */
    async isInUse(): Promise<boolean>
    {
        return await this._getIntAttr('isInUse') > 0;
    }

    /**
     * Tells if there is an active communication channel with this hub.
     *
     * @return true if the hub is currently connected.
     */
    async isOnline(): Promise<boolean>
    {
        return await this._getIntAttr('isOnline') > 0;
    }

    /**
     * Tells if write access on this hub is blocked. Return true if it
     * is not possible to change attributes on this hub
     *
     * @return true if it is not possible to change attributes on this hub.
     */
    async isReadOnly(): Promise<boolean>
    {
        return await this._getIntAttr('isReadOnly') > 0;
    }

    /**
     * Modifies tthe network connection delay for this hub.
     * The default value is inherited from ySetNetworkTimeout
     * at the time when the hub is registered, but it can be updated
     * afterwards for each specific hub if necessary.
     *
     * @param networkMsTimeout : the network connection delay in milliseconds.
     * @noreturn
     */
    async set_networkTimeout(networkMsTimeout: number): Promise<void>
    {
        await this._setIntAttr('networkTimeout', networkMsTimeout);
    }

    /**
     * Returns the network connection delay for this hub.
     * The default value is inherited from ySetNetworkTimeout
     * at the time when the hub is registered, but it can be updated
     * afterwards for each specific hub if necessary.
     *
     * @return the network connection delay in milliseconds.
     */
    async get_networkTimeout(): Promise<number>
    {
        return await this._getIntAttr('networkTimeout');
    }

    /**
     * Returns the numerical error code of the latest error with the hub.
     * This method is mostly useful when using the Yoctopuce library with
     * exceptions disabled.
     *
     * @return a number corresponding to the code of the latest error that occurred while
     *         using the hub object
     */
    async get_errorType(): Promise<number>
    {
        return await this._getIntAttr('errorType');
    }

    /**
     * Returns the error message of the latest error with the hub.
     * This method is mostly useful when using the Yoctopuce library with
     * exceptions disabled.
     *
     * @return a string corresponding to the latest error message that occured while
     *         using the hub object
     */
    async get_errorMessage(): Promise<string>
    {
        return await this._getStrAttr('errorMessage');
    }

    /**
     * Returns the value of the userData attribute, as previously stored
     * using method set_userData.
     * This attribute is never touched directly by the API, and is at
     * disposal of the caller to store a context.
     *
     * @return the object stored previously by the caller.
     */
    async get_userData(): Promise<any>
    {
        return this._userData;
    }

    /**
     * Stores a user context provided as argument in the userData
     * attribute of the function.
     * This attribute is never touched by the API, and is at
     * disposal of the caller to store a context.
     *
     * @param data : any kind of object to be stored
     * @noreturn
     */
    async set_userData(data: any): Promise<void>
    {
        this._userData = data;
    }

    /**
     * Starts the enumeration of hubs currently in use by the API.
     * Use the method YHub.nextHubInUse() to iterate on the
     * next hubs.
     *
     * @return a pointer to a YHub object, corresponding to
     *         the first hub currently in use by the API, or a
     *         null pointer if none has been registered.
     */
    static FirstHubInUse(): YHub | null
    {
        return YAPI.nextHubInUseInternal(-1);
    }

    /**
     * Starts the enumeration of hubs currently in use by the API
     * in a given YAPI context.
     * Use the method YHub.nextHubInUse() to iterate on the
     * next hubs.
     *
     * @param yctx : a YAPI context
     *
     * @return a pointer to a YHub object, corresponding to
     *         the first hub currently in use by the API, or a
     *         null pointer if none has been registered.
     */
    static FirstHubInUseInContext(yctx: YAPIContext): YHub | null
    {
        return yctx.nextHubInUseInternal(-1);
    }

    /**
     * Continues the module enumeration started using YHub.FirstHubInUse().
     * Caution: You can't make any assumption about the order of returned hubs.
     *
     * @return a pointer to a YHub object, corresponding to
     *         the next hub currenlty in use, or a null pointer
     *         if there are no more hubs to enumerate.
     */
    nextHubInUse(): YHub | null
    {
        return this._ctx.nextHubInUseInternal(this._hubref);
    }

    //--- (end of generated code: YHub implementation)

}

//--- (generated code: YAPIContext yapiwrapper)
//--- (end of generated code: YAPIContext yapiwrapper)
//--- (generated code: YAPIContext definitions)
//--- (end of generated code: YAPIContext definitions)

interface DeviceUpdateEvent
{
    event: string;
    serial: string;
    module: YModule;
}

//--- (generated code: YAPIContext class start)
/**
 * YAPIContext Class: Yoctopuce I/O context configuration.
 *
 *
 */
//--- (end of generated code: YAPIContext class start)
export class YAPIContext
{
    system_env: YSystemEnv;
    _uniqueID: string;
    _detectType: number = Y_DETECT_NONE;
    _knownHubsBySerial: YGenericHubDict = {};       // hash table by serial number
    _knownHubsByUrl: YGenericHubDict = {};          // hash table by connection URL
    _connectedHubs: YGenericHub[] = [];
    _trustedCertificate: string[] = [];
    _networkSecurityOptions: number = 0;
    _yhub_cache: YHubDict = {};
    _ssdpManager: YGenericSSDPManager | null = null;
    _devs: YDeviceDict = {};                        // hash table of known devices, by serial number
    _snByUrl: YStringDict = {};                     // serial number for each known device, by URL
    _snByName: YStringDict = {};                    // serial number for each known device, by name
    _fnByType: YFunctionTypeDict = {};              // functions by type
    _lastErrorType: number = YAPI_SUCCESS;
    _lastErrorMsg: string = 'no error';
    _updateDevListStarted: number = 0;
    _pendingCallbacks: DeviceUpdateEvent[] = [];
    _logLevel: number = 4;                          // default to logging warnings and errors only
    _logCallback: YLogCallback | null = null;
    _arrivalCallback: YDeviceUpdateCallback | null = null;
    _namechgCallback: YDeviceUpdateCallback | null = null;
    _removalCallback: YDeviceUpdateCallback | null = null;
    _hubDiscoveryCallback: YHubDiscoveryCallback | null = null;
    _forwardValues: number = 0;
    _calibHandlers: yCalibrationHandler[] = [];
    _ValueCallbackList: YFunction[] = [];
    _TimedReportCallbackList: YFunction[] = [];
    _beacons: YIntDict = {};
    _isNodeJS: boolean = false;
    _networkTimeoutMs: number = DEFAULT_NETWORK_TIMEOUT_MS;
    _deviceListValidityMs: number = DEFAULT_DEVICE_LIST_VALIDITY_MS;
    defaultEncoding: string = 'binary';             // Default string encoding used in the library
    exceptionsDisabled: boolean = false;
    /* make sure to add code to reset any new property in imm_ResetToDefaults() */
    //--- (generated code: YAPIContext attributes declaration)
    public readonly SUCCESS: number = 0;
    public readonly NOT_INITIALIZED: number = -1;
    public readonly INVALID_ARGUMENT: number = -2;
    public readonly NOT_SUPPORTED: number = -3;
    public readonly DEVICE_NOT_FOUND: number = -4;
    public readonly VERSION_MISMATCH: number = -5;
    public readonly DEVICE_BUSY: number = -6;
    public readonly TIMEOUT: number = -7;
    public readonly IO_ERROR: number = -8;
    public readonly NO_MORE_DATA: number = -9;
    public readonly EXHAUSTED: number = -10;
    public readonly DOUBLE_ACCES: number = -11;
    public readonly UNAUTHORIZED: number = -12;
    public readonly RTC_NOT_READY: number = -13;
    public readonly FILE_NOT_FOUND: number = -14;
    public readonly SSL_ERROR: number = -15;
    public readonly RFID_SOFT_ERROR: number = -16;
    public readonly RFID_HARD_ERROR: number = -17;
    public readonly BUFFER_TOO_SMALL: number = -18;
    public readonly DNS_ERROR: number = -19;
    public readonly SSL_UNK_CERT: number = -20;
    public readonly NO_TRUSTED_CA_CHECK: number = 1;
    public readonly NO_EXPIRATION_CHECK: number = 2;
    public readonly NO_HOSTNAME_CHECK: number = 4;
    public readonly LEGACY: number = 8;
    defaultCacheValidity: number = 5;

    // API symbols as static members
    public static readonly SUCCESS: number = 0;
    public static readonly NOT_INITIALIZED: number = -1;
    public static readonly INVALID_ARGUMENT: number = -2;
    public static readonly NOT_SUPPORTED: number = -3;
    public static readonly DEVICE_NOT_FOUND: number = -4;
    public static readonly VERSION_MISMATCH: number = -5;
    public static readonly DEVICE_BUSY: number = -6;
    public static readonly TIMEOUT: number = -7;
    public static readonly IO_ERROR: number = -8;
    public static readonly NO_MORE_DATA: number = -9;
    public static readonly EXHAUSTED: number = -10;
    public static readonly DOUBLE_ACCES: number = -11;
    public static readonly UNAUTHORIZED: number = -12;
    public static readonly RTC_NOT_READY: number = -13;
    public static readonly FILE_NOT_FOUND: number = -14;
    public static readonly SSL_ERROR: number = -15;
    public static readonly RFID_SOFT_ERROR: number = -16;
    public static readonly RFID_HARD_ERROR: number = -17;
    public static readonly BUFFER_TOO_SMALL: number = -18;
    public static readonly DNS_ERROR: number = -19;
    public static readonly SSL_UNK_CERT: number = -20;
    public static readonly NO_TRUSTED_CA_CHECK: number = 1;
    public static readonly NO_EXPIRATION_CHECK: number = 2;
    public static readonly NO_HOSTNAME_CHECK: number = 4;
    public static readonly LEGACY: number = 8;
    //--- (end of generated code: YAPIContext attributes declaration)

    // API symbols
    public readonly INVALID_INT: number = YAPI_INVALID_INT;
    public readonly INVALID_UINT: number = YAPI_INVALID_UINT;
    public readonly INVALID_LONG: number = YAPI_INVALID_LONG;
    public readonly INVALID_DOUBLE: number = YAPI_INVALID_DOUBLE;
    public readonly MIN_DOUBLE: number = YAPI_MIN_DOUBLE;
    public readonly MAX_DOUBLE: number = YAPI_MAX_DOUBLE;
    public readonly INVALID_STRING: string = YAPI_INVALID_STRING;
    public readonly HASH_BUF_SIZE: number = YOCTO_HASH_BUF_SIZE;
    // yInitAPI constants
    public readonly DETECT_NONE: number = Y_DETECT_NONE;
    public readonly DETECT_USB: number = Y_DETECT_USB;
    public readonly DETECT_NET: number = Y_DETECT_NET;
    public readonly DETECT_ALL: number = Y_DETECT_ALL;

    public readonly YOCTO_DEFAULT_HTTP_PORT: number = 4444;
    public readonly YOCTO_DEFAULT_HTTPS_PORT: number = 4443;

    constructor(system_env?: YSystemEnv)
    {
        //--- (generated code: YAPIContext constructor)
        //--- (end of generated code: YAPIContext constructor)
        this.system_env = system_env || (YAPI && YAPI.system_env) || _UnspecifiedSystemEnv;
        this._isNodeJS = this.system_env.isNodeJS;
        this._uniqueID = String.fromCharCode(Math.random() * 79 + 48, Math.random() * 79 + 48, Math.random() * 79 + 48);
        this.imm_ResetToDefaults();
    }

    imm_ResetToDefaults(): void
    {
        this._detectType = this.DETECT_NONE;
        this._knownHubsBySerial = {};
        this._knownHubsByUrl = {};
        this._connectedHubs = [];
        this._trustedCertificate = [];
        this._networkSecurityOptions = 0;
        this._devs = {}; // hash table of known devices, by serial number
        this._snByUrl = {}; // serial number for each known device, by URL
        this._snByName = {}; // serial number for each known device, by name
        this._fnByType = {}; // functions by type
        this._fnByType.Module = new YFunctionType(this, 'Module');
        this._lastErrorType = YAPI_SUCCESS;
        this._lastErrorMsg = 'no error';
        this._updateDevListStarted = 0;
        this._pendingCallbacks = [];
        this._logLevel = 2;   // default to logging warnings and errors only
        this._logCallback = null;
        this._arrivalCallback = null;
        this._namechgCallback = null;
        this._removalCallback = null;
        this._hubDiscoveryCallback = null;
        this._forwardValues = 0;
        this._ValueCallbackList = [];
        this._TimedReportCallbackList = [];
        this._beacons = {};
        this._calibHandlers = [];
        for (let i = 1; i <= 20; i++) {
            this.RegisterCalibrationHandler(i, this.LinearCalibrationHandler);
        }
        this.RegisterCalibrationHandler(YOCTO_CALIB_TYPE_OFS, this.LinearCalibrationHandler);
        this.exceptionsDisabled = false;
    }

    _throw(int_errType: number, str_errMsg: string, obj_retVal?: any): any
    {
        this._lastErrorType = int_errType;
        this._lastErrorMsg = str_errMsg;

        if (!this.exceptionsDisabled) {
            let exc = new YoctoError(str_errMsg);
            exc.errorType = int_errType;
            throw exc;
        }
        return obj_retVal;
    }

    imm_setErr(errmsg: YErrorMsg | null, int_errType: number, str_errMsg: string, obj_retVal?: any): any
    {
        if (errmsg) {
            errmsg.msg = str_errMsg;
        }
        this._lastErrorType = int_errType;
        this._lastErrorMsg = str_errMsg;
        return obj_retVal;
    }

    imm_setSystemEnv(env: YSystemEnv): void
    {
        this.system_env = env;
        this._isNodeJS = env.isNodeJS;
    }

    // Log a message, either to the user defined function or to the console if none is defined
    imm_log(msg: string, ...moreArgs: any[]): void
    {
        let now = new Date();
        let day = now.getFullYear().toString() + '-' + ('0' + (now.getMonth() + 1)).slice(-2) + '-' + ('0' + now.getDate()).slice(-2);
        let time = ('0' + now.getHours().toString()).slice(-2) + ':' + ('0' + now.getMinutes()).slice(-2) + ':' + ('0' + now.getSeconds()).slice(-2);
        let prefix = day + ' ' + time + ' [' + this._uniqueID + '] ';
        let isError = false;
        if (moreArgs.length > 0) {
            if (moreArgs[0].constructor && /Error/i.test(moreArgs[0].constructor.name)) {
                isError = true;
            }
        }
        if (this._logCallback) {
            try {
                if (moreArgs.length > 0) {
                    if (moreArgs[0].message) {
                        msg += moreArgs[0].message;
                    } else {
                        msg += moreArgs[0].toString();
                    }
                }
                this._logCallback(prefix + msg)
            } catch (e) {
                console.error(prefix + 'Exception in custom log callback: ', e);
                console.log('... while trying to log:');
                if (isError) {
                    console.error(prefix + msg, ...moreArgs);
                } else {
                    console.log(prefix + msg, ...moreArgs);
                }
            }
        } else {
            if (isError) {
                console.error(prefix + msg, ...moreArgs);
            } else {
                console.log(prefix + msg, ...moreArgs);
            }
        }
    }

    /**
     * Registers a log callback function. This callback will be called each time
     * the API have something to say. Quite useful to debug the API.
     *
     * @param logfun : a procedure taking a string parameter, or null
     *         to unregister a previously registered  callback.
     */
    async RegisterLogFunction(logfun: YLogCallback): Promise<number>
    {
        this._logCallback = logfun;
        return YAPI_SUCCESS;
    }

    // Search for an existing a hub object for a given URL
    imm_getHub(obj_urlInfo: _YY_UrlInfo): YGenericHub | null
    {
        let hub = this._knownHubsByUrl[obj_urlInfo.imm_getRootUrl()];
        if (!hub) {
            // iterate on all hubs to look if we have an hub that match the original url
            for (const url in this._knownHubsByUrl) {
                if (this._knownHubsByUrl[url].imm_getOriginalURL() == obj_urlInfo.imm_getOriginalURL()) {
                    return this._knownHubsByUrl[url];
                }
            }
        }
        return hub;
    }

    // Check if a given connected YGenericHub should be used as the primary hub object
    // Update the internal list of hubs on the fly
    //
    // This function chooses between equivalent hubs based connection state and precedence.
    // A disconnected hub is NEVER returned in place of a connected hub
    //
    imm_getPrimaryHub(hub: YGenericHub): YGenericHub
    {
        let primaryHub = this._knownHubsBySerial[hub.imm_getSerialNumber()];
        if (!primaryHub || primaryHub === hub) {
            // First known hub with this serial number, or no change
            this._knownHubsBySerial[hub.imm_getSerialNumber()] = hub;
            this._knownHubsByUrl[hub.imm_getRootUrl()] = hub;
            return hub;
        }
        if (!hub.urlInfo.imm_useSecureSocket() || (hub.urlInfo.imm_useSecureSocket() && primaryHub.urlInfo.imm_useSecureSocket())) {
            //can be merged to primary
            if (primaryHub.imm_getcurrentState() >= hub.imm_getcurrentState()) {
                // Existing hub is already "better" connected, keep it as primary hub
                // Remember alias URL and update target state if needed
                primaryHub.imm_inheritFrom(hub);
                return primaryHub;
            }
        }
        // Existing hub is not actively connected, set the new hub as primary
        this._knownHubsBySerial[hub.imm_getSerialNumber()] = hub;
        hub.imm_inheritFrom(primaryHub);
        return hub;
    }

    // Add a hub object to the list of actively attached hub
    async _addConnectedHub(newhub: YGenericHub): Promise<void>
    {
        // If hub is not yet known, create a device object
        let serial: string = this._snByUrl[newhub.imm_getRootUrl()];
        if (!serial) {
            let newdev: YDevice = new YDevice(this, newhub.imm_getRootUrl(), null, null);
            // make sure to index device before adding it officially in the _hubs list,
            // to avoid crazy course conditions within updateDeviceList
            await newdev.refresh();
        }

        // Add hub to active list if needed
        let hubFound = false;
        for (let i = 0; i < this._connectedHubs.length; i++) {
            let url = this._connectedHubs[i].imm_getRootUrl();
            if (newhub.imm_getRootUrl() == url) {
                hubFound = true;
                break;
            }
        }
        if (!hubFound) {
            this._connectedHubs.push(newhub);
        }
    }

    // Tell if a hub with a given serial number is already registered actively
    imm_isActiveHub(hubSerial: string): boolean
    {
        for (let i: number = 0; i < this._connectedHubs.length; i++) {
            let hubSerials: string[] = this._connectedHubs[i].serialByYdx;
            if (hubSerials && hubSerials[0] == hubSerial) {
                return true;
            }
        }
        return false;
    }

    imm_dropConnectedHub(hub: YGenericHub): void
    {
        let idx = this._connectedHubs.indexOf(hub);
        if (idx < 0) {
            // hub was not considered as connected
            return;
        }
        for (let j = 0; j < hub.serialByYdx.length; j++) {
            let serial = hub.serialByYdx[j];
            if (serial && this._devs[serial]) {

                if (this._removalCallback) {
                    let module = YModule.FindModuleInContext(this, serial + '.module');
                    this._pendingCallbacks.push({event: '-', serial: serial, module: module});
                }
                try {
                    this.imm_forgetDevice(this._devs[serial]);
                } catch (e) {}
            }
        }
        // make sure index has not changed in between
        idx = this._connectedHubs.indexOf(hub);
        if (idx >= 0) {
            this._connectedHubs.splice(idx, 1);
        }
    }

    // Wait until updateDeviceList is completed to avoid course conditions
    async _ensureUpdateDeviceListNotRunning(): Promise<void>
    {
        while (this._updateDevListStarted && this.GetTickCount() - this._updateDevListStarted < 30 * 1000) {
            await this.Sleep(25);
        }
    }

    // Trigger an update of connected devices by querying all hubs
    async _updateDeviceList_internal(bool_forceupdate: boolean, bool_invokecallbacks: boolean): Promise<YConditionalResult>
    {
        if (this._updateDevListStarted && this.GetTickCount() - this._updateDevListStarted < 30 * 1000) {
            return {
                errorType: YAPI_SUCCESS,
                errorMsg: 'no error'
            };
        }
        for (let i: number = 0; i < this._connectedHubs.length; i++) {
            if (this._connectedHubs[i].imm_isFirstArrivalCallback() && bool_invokecallbacks && this._arrivalCallback) {
                bool_forceupdate = true;
                break;
            }
        }
        if (bool_forceupdate) {
            for (let i: number = 0; i < this._connectedHubs.length; i++) {
                this._connectedHubs[i].imm_forceUpdate();
            }
        }

        try {
            // mark updateDeviceList in progress to avoid concurrent asynchronous runs
            this._updateDevListStarted = this.GetTickCount();

            // collect list of hubs which should be checked
            let hubs: YGenericHub[] = [];
            for (let i: number = 0; i < this._connectedHubs.length; i++) {
                let hub: YGenericHub = this._connectedHubs[i];
                let rootUrl: string = hub.imm_getRootUrl();
                let hubDev = this.imm_getDevice(rootUrl);
                if (!hubDev) {
                    // this is a newly added hub, for which we did not yet load all attributes
                    // skip it for now
                    continue;
                }
                if (hub.imm_getcurrentState() < Y_YHubConnType.HUB_PREREGISTERED) {
                    // this hub is not ready to be scanned, skip it for now
                    if (this._logLevel >= 4) {
                        this.imm_log('Skip updateDeviceList for hub ' + hub.urlInfo.imm_getHost() + ', currently offline');
                    }
                    continue;
                }
                if (hub.devListExpires <= this.GetTickCount()) {
                    hub._missing = {};
                    hubs.push(hub);
                }
            }

            // assume all device are unplugged, unless proved wrong
            for (let serial in this._devs) {
                let rooturl: string = this._devs[serial].imm_getRootUrl();
                for (let i: number = 0; i < hubs.length; i++) {
                    let huburl = hubs[i].imm_getRootUrl();
                    if (rooturl.substr(0, huburl.length) == huburl) {
                        hubs[i]._missing[serial] = true;
                    }
                }
            }

            // Rescan all hubs and update list of online devices
            let update_promises: Promise<number>[] = [];
            for (let i: number = 0; i < hubs.length; i++) {
                let prom: Promise<number> = hubs[i].hubUpdateDeviceList();
                update_promises.push(prom);
            }
            let newDeviceCounts: number[] = await Promise.all(update_promises);
            let newDeviceArrived: boolean = false;
            for (let res of newDeviceCounts) {
                newDeviceArrived = newDeviceArrived || (res > 0);
            }

            // after processing all hubs, invoke pending callbacks if required
            if (bool_invokecallbacks) {
                let nbEvents: number = this._pendingCallbacks.length;
                for (let i: number = 0; i < nbEvents; i++) {
                    let evt: DeviceUpdateEvent = this._pendingCallbacks[i];
                    switch (evt.event) {
                    case '+':
                        if (this._logLevel >= 3) {
                            this.imm_log('Device ' + evt.serial + ' plugged');
                        }
                        if (this._arrivalCallback) {
                            try {
                                // force (re)loading the module object with up-to-date information
                                // this will also ensure we have a valid serialNumber in cache on unplug
                                await evt.module.load(this.defaultCacheValidity);
                                await this._arrivalCallback(evt.module);
                            } catch (e) {
                                this.imm_log('Exception in device arrival callback:', e);
                            }
                        }
                        break;
                    case '/':
                        if (this._namechgCallback) {
                            try {
                                await this._namechgCallback(evt.module);
                            } catch (e) {
                                this.imm_log('Exception in device change callback:', e);
                            }
                        }
                        break;
                    case '-':
                        if (this._logLevel >= 3) {
                            this.imm_log('Device ' + evt.serial + ' unplugged');
                        }
                        if (this._removalCallback) {
                            try {
                                await this._removalCallback(evt.module);
                            } catch (e) {
                                this.imm_log('Exception in device removal callback:', e);
                            }
                        }
                        break;
                    }
                }
                this._pendingCallbacks = this._pendingCallbacks.slice(nbEvents);
            }
            if (newDeviceArrived) {
                // if any arrival was detected, force resolution of any unresolved functions
                // with value callbacks or timed report callbacks
                for (let fun of this._ValueCallbackList) {
                    if (!fun._hwId) {
                        fun.isOnline();
                    }
                }
                for (let fun of this._TimedReportCallbackList) {
                    if (!fun._hwId) {
                        fun.isOnline();
                    }
                }
            }
        } finally {
            this._updateDevListStarted = 0;
        }

        return {
            errorType: YAPI_SUCCESS,
            errorMsg: 'no error'
        };
    }

    // process a hub white-pages/yellow-pages records to update the device data
    // return the number of NEW devices discovered, or a negative error code
    async updateDeviceList_process(hub: YGenericHub, hubDev: YDevice, whitePages: _YY_WhitePage[], yellowPages: _YY_YellowPages): Promise<number>
    {
        // Reindex all functions from yellow pages
        let newDevices: number = 0;
        let refresh: YBoolDict = {};
        let serial = null;
        for (let classname in yellowPages) {
            let obj_yprecs = yellowPages[classname];
            let ftype = this._fnByType[classname];
            if (ftype == undefined) {
                ftype = new YFunctionType(this, classname);
                this._fnByType[classname] = ftype;
            }
            for (let i = 0; i < obj_yprecs.length; i++) {
                let yprec = obj_yprecs[i];
                let hwid = yprec.hardwareId;
                let basetype = yprec.baseType;
                if (ftype.imm_reindexFunction(hwid, yprec['logicalName'], yprec['advertisedValue'], basetype)) {
                    // logical name discrepency detected, force a refresh from device
                    serial = hwid.substr(0, hwid.indexOf('.'));
                    refresh[serial] = true;
                }
            }
        }
        // Reindex all devices from white pages
        for (let i = 0; i < whitePages.length; i++) {
            let devinfo = whitePages[i];
            serial = devinfo.serialNumber;
            let devydx = devinfo.index;
            let rooturl = devinfo.networkUrl.slice(0, -3);
            if (rooturl.charAt(0) == '/') rooturl = hubDev.imm_getRootUrl() + rooturl.substr(1);
            let currdev = this._devs[serial];
            if (this._logLevel >= 5) {
                this.imm_log('Device ' + serial + ' present, currdev ' + (currdev ? '' : 'NOT ') + 'set' + (hub.imm_isFirstArrivalCallback() ? ', firstArrival' : ''));
            }
            if (currdev && hub.imm_isFirstArrivalCallback()) {
                newDevices++;
                if (this._arrivalCallback) {
                    let module = YModule.FindModuleInContext(this, serial + '.module');
                    this._pendingCallbacks.push({event: '+', serial: serial, module: module});
                }
            }
            hub.serialByYdx[devydx] = serial;
            if (!currdev) {
                // Add new device
                //noinspection ObjectAllocationIgnored
                new YDevice(this, rooturl, devinfo, yellowPages);
                newDevices++;
                if (this._arrivalCallback) {
                    let module = YModule.FindModuleInContext(this, serial + '.module');
                    this._pendingCallbacks.push({event: '+', serial: serial, module: module});
                }
            } else if (currdev.imm_getLogicalName() != devinfo['logicalName']) {
                // Reindex device from its own data
                await currdev.refresh();
                if (this._namechgCallback) {
                    let module = YModule.FindModuleInContext(this, serial + '.module');
                    this._pendingCallbacks.push({event: '/', serial: serial, module: module});
                }
            } else if (refresh[serial] || currdev.imm_getRootUrl() != rooturl ||
                currdev.imm_getBeacon() != devinfo['beacon']) {
                // Reindex device from its own data in case of discrepency
                await currdev.refresh();
            }
            hub._missing[serial] = false;
        }

        if (this._arrivalCallback && hub.imm_isFirstArrivalCallback()) {
            hub.imm_setFirstArrivalCallback(false);
        }

        // Keep track of all unplugged devices on this hub
        for (serial in hub._missing) {
            if (hub._missing[serial] && this._devs[serial]) {
                if (this._removalCallback) {
                    let module = YModule.FindModuleInContext(this, serial + '.module');
                    this._pendingCallbacks.push({event: '-', serial: serial, module: module});
                }
                this.imm_forgetDevice(this._devs[serial]);
            }
        }

        return newDevices;
    }

    /** process event data produced by a hub
     *
     * @param hub {YGenericHub}
     * @param str_lines {string}
     */
    async parseEvents(hub: YGenericHub, str_lines: string): Promise<void>
    {
        if (hub.imm_isDisconnecting()) {
            // drop events for disconnecting hubs
            return;
        }
        // Use events to detect stalled connections
        hub.isNotifWorking = true;
        if (hub.timeoutId) {
            clearTimeout(hub.timeoutId);
        }
        hub.timeoutId = setTimeout((): void => {
            if (!hub.imm_isForwarded()) {
                this.imm_log('Closing stalled connection after ' + (hub.imm_getNetworkTimeout() / 1000) + 's');
                // abort communication channel immediately, this will trigger a reconnect
                hub.imm_disconnectNow();
            }
        }, hub.imm_getNetworkTimeout());

        let rows = (hub.notifCarryOver + str_lines).split('\n');
        let nrows = rows.length;
        let value;
        // in continuous mode, last line is either empty or a partial event
        if (str_lines.substr(-1) != '\n') {
            // last line might be incomplete, keep it for later
            hub.notifCarryOver = rows[--nrows];
        } else {
            // last line is empty, drop it
            nrows--;
            hub.notifCarryOver = '';
        }
        for (let idx = 0; idx < nrows; idx++) {
            let ev = rows[idx];
            if (ev.length == 0) continue;
            let firstCode = ev.charAt(0);
            if (ev.length >= 3 && firstCode >= NOTIFY_NETPKT_CONFCHGYDX && firstCode <= NOTIFY_NETPKT_TIMEAVGYDX) {
                hub.retryDelay = 15;
                if (hub.notifPos >= 0) hub.notifPos += ev.length + 1;
                let devydx = ev.charCodeAt(1) - 65; // from 'A'
                let funydx = ev.charCodeAt(2) - 48; // from '0'
                if (funydx >= 64) { // high bit of devydx is on second character
                    funydx -= 64;
                    devydx += 128;
                }
                let serial = hub.serialByYdx[devydx];
                if (serial && this._devs[serial]) {
                    let funcid = (funydx == 0xf ? 'time' : this._devs[serial].imm_functionIdByFunYdx(funydx));
                    if (funcid != '') {
                        let dev;
                        value = ev.slice(3);
                        switch (firstCode) {
                        case NOTIFY_NETPKT_FUNCVALYDX:
                            if (value != '') value = value.split('\0')[0];
                            // function value ydx (tiny notification)
                            await this.setFunctionValue(serial + '.' + funcid, value);
                            break;
                        case NOTIFY_NETPKT_DEVLOGYDX:
                            // log notification
                            dev = this._devs[serial];
                            if (dev != null) {
                                dev.imm_triggerLogPull();
                            }
                            break;
                        case NOTIFY_NETPKT_CONFCHGYDX:
                            // configuration change notification
                            await this.setConfChange(serial);
                            break;
                        case NOTIFY_NETPKT_TIMEVALYDX:
                        case NOTIFY_NETPKT_TIMEAVGYDX:
                        case NOTIFY_NETPKT_TIMEV2YDX:
                            // timed value report
                            let pos, arr = [(firstCode == 'x' ? 0 : (firstCode == 'z' ? 1 : 2))];
                            for (pos = 0; pos < value.length; pos += 2) {
                                arr.push(parseInt(value.substr(pos, 2), 16));
                            }
                            dev = this._devs[serial];
                            if (funcid == 'time') {
                                let time = arr[1] + 0x100 * arr[2] + 0x10000 * arr[3] + 0x1000000 * arr[4];
                                let ms = arr[5] * 4;
                                let duration;
                                if (arr.length >= 7) {
                                    ms += arr[6] >> 6;
                                    let duration_ms = arr[7];
                                    duration_ms += (arr[6] & 0xf) * 0x100;
                                    if (arr[6] & 0x10) {
                                        duration = duration_ms;
                                    } else {
                                        duration = duration_ms / 1000.0;
                                    }
                                } else {
                                    duration = 0.0;
                                }
                                dev.imm_setTimeRef(time + ms / 1000.0, duration);
                            } else {
                                await this.setTimedReport(serial + '.' + funcid, dev.imm_getLastTimeRef(), dev.imm_getLastDuration(), arr);
                            }
                            break;
                        case NOTIFY_NETPKT_FUNCV2YDX:
                            let rawval = this.imm_decodeNetFuncValV2(value);
                            if (rawval != null) {
                                let decodedval = this.imm_decodePubVal(rawval[0], rawval, 1, 6);
                                await this.setFunctionValue(serial + '.' + funcid, decodedval);
                            }
                            break;
                        case NOTIFY_NETPKT_FLUSHV2YDX:
                            // To be implemented later
                        default:
                            break;
                        }
                    }
                }
            } else if (ev.length > 5 && ev.substr(0, 4) == 'YN01') {
                hub.retryDelay = 15;
                if (hub.notifPos >= 0) hub.notifPos += ev.length + 1;
                let notype = ev.substr(4, 1);
                let parts;
                if (notype == '@') {
                    hub.notifPos = parseInt(ev.slice(5));
                } else {
                    // noinspection FallThroughInSwitchStatementJS
                    switch (parseInt(notype)) {
                    case 0: // device name change, or arrival
                        parts = ev.slice(5).split(',');
                        if (parts.length > 2) {
                            let int_beacon = parseInt(parts[2]);
                            await this.setBeaconChange(parts[0], int_beacon);
                        }
                        // no break on purpose
                    case 2: // device plug/unplug
                    case 4: // function name change
                    case 8: // function name change (ydx)
                        hub.devListExpires = 0;
                        break;
                    case 5: // function value (long notification)
                        parts = ev.slice(5).split(',');
                        if (parts.length > 2) {
                            value = parts[2].split('\0');
                            await this.setFunctionValue(parts[0] + '.' + parts[1], value[0]);
                        }
                        break;
                    }
                }
            } else {
                // oops, bad notification ? be safe until a good one comes
                hub.devListExpires = 0;
                this.imm_log('Bad event on received from server:', ev);
                hub.notifPos = -1;
            }
        }
        if (this._forwardValues > 0) {
            await this.HandleEvents(new YErrorMsg());
        }
    }

    /** Network notification format: 7x7bit (mapped to 7 chars in range 32..159)
     *                               used to represent 1 flag (RAW6BYTES) + 6 bytes
     * INPUT:  [R765432][1076543][2107654][3210765][4321076][5432107][6543210]
     * OUTPUT: 7 bytes array (1 byte for the funcint_TypeV2 and 6 bytes of USB like data
     *                     funcTypeV2 + [R][-byte 0][-byte 1-][-byte 2-][-byte 3-][-byte 4-][-byte 5-]
     *
     * @return {number[]}
     */
    imm_decodeNetFuncValV2(p: string): number[] | null
    {
        let p_ofs = 0;
        let ch = p.charCodeAt(p_ofs) & 0xff;
        let len = 0;
        let funcVal = [0, 0, 0, 0, 0, 0, 0];

        if (ch < 32 || ch > 32 + 127) {
            return null;
        }
        // get the 7 first bits
        ch -= 32;
        funcVal[0] = ((ch & 0x40) != 0 ? NOTIFY_V2_6RAWBYTES : NOTIFY_V2_TYPEDDATA);
        // clear flag
        ch &= 0x3f;
        while (len < YOCTO_PUBVAL_SIZE) {
            p_ofs++;
            if (p_ofs >= p.length) {
                break;
            }
            let newCh = p.charCodeAt(p_ofs) & 0xff;
            if (newCh == NOTIFY_NETPKT_STOP) {
                break;
            }
            if (newCh < 32 || newCh > 32 + 127) {
                return null;
            }
            newCh -= 32;
            ch = (ch << 7) + newCh;
            funcVal[len + 1] = (ch >>> (5 - len)) & 0xff;
            len++;
        }
        return funcVal;
    }

    /** Decode an enhanced notification (V2) buffer
     *
     * @param int_typeV2 {number}
     * @param arr_funcval {number[]}
     * @param int_ofs {number}
     * @param int_funcvalen {number}
     * @returns {string}
     */
    imm_decodePubVal(int_typeV2: number, arr_funcval: number[], int_ofs: number, int_funcvalen: number): string
    {
        let buffer = '';
        let endp;
        if (int_typeV2 == NOTIFY_V2_6RAWBYTES || int_typeV2 == NOTIFY_V2_TYPEDDATA) {
            let funcValType;
            if (int_typeV2 == NOTIFY_V2_6RAWBYTES) {
                funcValType = PUBVAL_6RAWBYTES;
            } else {
                funcValType = arr_funcval[int_ofs++];
            }
            switch (funcValType) {
            case PUBVAL_LEGACY:
                // fallback to legacy handling, just in case
                break;
            case PUBVAL_1RAWBYTE:
            case PUBVAL_2RAWBYTES:
            case PUBVAL_3RAWBYTES:
            case PUBVAL_4RAWBYTES:
            case PUBVAL_5RAWBYTES:
            case PUBVAL_6RAWBYTES:
                // 1..5 hex bytes
                for (let i = 0; i < funcValType; i++) {
                    let c = arr_funcval[int_ofs++];
                    let b = c >>> 4;
                    buffer += b.toString(16);
                    b = c & 0xf;
                    buffer += b.toString(16);
                }
                return buffer;
            case PUBVAL_C_LONG:
            case PUBVAL_YOCTO_FLOAT_E3:
                // 32bit integer in little endian format or Yoctopuce 10-3 format
                let numVal = arr_funcval[int_ofs++];
                numVal += arr_funcval[int_ofs++] << 8;
                numVal += arr_funcval[int_ofs++] << 16;
                numVal += arr_funcval[int_ofs++] << 24;
                if (funcValType == PUBVAL_C_LONG) {
                    return String(Math.round(numVal));
                } else {
                    buffer = String(Math.round(numVal * 1000) / 1000000.0);
                    endp = buffer.length;
                    while (endp > 0 && buffer[endp - 1] == '0') {
                        --endp;
                    }
                    if (endp > 0 && buffer[endp - 1] == '.') {
                        --endp;
                        buffer = buffer.substr(0, endp);
                    }
                    return buffer;
                }
            case PUBVAL_C_FLOAT:
                // 32bit (short) float
                let v = arr_funcval[int_ofs++];
                v += arr_funcval[int_ofs++] << 8;
                v += arr_funcval[int_ofs++] << 16;
                v += arr_funcval[int_ofs++] << 24;
                let fraction = (v & ((1 << 23) - 1)) + (1 << 23) * (v >>> 31 | 1);
                let exp = (v >>> 23 & 0xFF) - 127;
                let floatVal = fraction * Math.pow(2, exp - 23);
                buffer = String(Math.round(floatVal * 1000000) / 1000000);
                endp = buffer.length;
                while (endp > 0 && buffer[endp - 1] == '0') {
                    --endp;
                }
                if (endp > 0 && buffer[endp - 1] == '.') {
                    --endp;
                    buffer = buffer.substr(0, endp);
                }
                return buffer;
            default:
                return '?';
            }

            // Legacy handling: just pad with NUL up to 7 chars
            let len = 0;
            buffer = '';
            while (len < YOCTO_PUBVAL_SIZE && len < int_funcvalen) {
                if (arr_funcval[len] == 0) {
                    break;
                }
                buffer += String.fromCharCode(arr_funcval[len]);
                len++;
            }
        }
        return buffer;
    }

    imm_decExp(int_pow: number): number
    {
        const arr = [1.0e-6, 1.0e-5, 1.0e-4, 1.0e-3, 1.0e-2, 1.0e-1, 1.0,
            1.0e1, 1.0e2, 1.0e3, 1.0e4, 1.0e5, 1.0e6, 1.0e7, 1.0e8, 1.0e9
        ];
        return arr[int_pow];
    }

    // Convert Yoctopuce 16-bit decimal floats to standard double-precision floats
    //
    imm_decimalToDouble(val: number): number
    {
        let negate = false;
        let res;
        let mantis = val & 2047;
        if (mantis == 0) return 0.0;
        if (val > 32767) {
            negate = true;
            val = 65536 - val;
        } else if (val < 0) {
            negate = true;
            val = -val;
        }
        let decexp = this.imm_decExp(val >>> 11);
        if (decexp >= 1.0) {
            res = (mantis) * decexp;
        } else { // fix rounding issue
            res = (mantis) / Math.round(1 / decexp);
        }

        return (negate ? -res : res);
    }

    // Convert standard double-precision floats to Yoctopuce 16-bit decimal floats
    //
    imm_doubleToDecimal(val: number): number
    {
        let negate = false;
        let comp, mant;
        let decpow;
        let res;

        if (val == 0.0) {
            return 0;
        }
        if (val < 0) {
            negate = true;
            val = -val;
        }
        comp = val / 1999.0;
        decpow = 0;
        while (comp > this.imm_decExp(decpow) && decpow < 15) {
            decpow++;
        }
        mant = val / this.imm_decExp(decpow);
        if (decpow == 15 && mant > 2047.0) {
            res = (15 << 11) + 2047; // overflow
        } else {
            res = (decpow << 11) + Math.round(mant);
        }
        return (negate ? -res : res);
    }

    imm_getCalibrationHandler(calibType: number): yCalibrationHandler
    {
        return this._calibHandlers[calibType];
    }

    // Parse an array of u16 encoded in a base64-like string with memory-based compression
    imm_decodeWords(data: string): number[]
    {
        let udata = [];
        for (let i = 0; i < data.length;) {
            let c = data[i];
            let val = 0;
            if (c == '*') {
                i++;
            } else if (c == 'X') {
                val = 0xffff;
                i++;
            } else if (c == 'Y') {
                val = 0x7fff;
                i++;
            } else if (c >= 'a') {
                let srcpos = udata.length - 1 - (data.charCodeAt(i++) - 97);
                if (srcpos >= 0) {
                    val = udata[srcpos];
                }
            } else {
                if (i + 3 > data.length) {
                    return udata;
                }
                val = (data.charCodeAt(i++) - 48);
                val += (data.charCodeAt(i++) - 48) << 5;
                let lastcode = data.charCodeAt(i++);
                if (lastcode == 122) lastcode = 92;
                val += (lastcode - 48) << 10;
            }
            udata.push(val);
        }
        return udata;
    }

    // Parse an array of u16 encoded in a base64-like string with memory-based compresssion
    imm_decodeFloats(data: string): number[]
    {
        let idata = [];
        let p = 0;
        let datalen = data.length;
        while (p < datalen) {
            let val = 0;
            let sign = 1;
            let dec = 0;
            let decInc = 0;
            let c = data[p++];
            while (c != '-' && (c < '0' || c > '9')) {
                if (p >= datalen) {
                    return idata;
                }
                c = data[p++];
            }
            if (c == '-') {
                if (p >= datalen) {
                    return idata;
                }
                sign = -sign;
                c = data[p++];
            }
            while ((c >= '0' && c <= '9') || c == '.') {
                if (c == '.') {
                    decInc = 1;
                } else if (dec < 3) {
                    val = val * 10 + (c.charCodeAt(0) - 48);
                    dec += decInc;
                }
                if (p < datalen) {
                    c = data[p++];
                } else {
                    c = '\0';
                }
            }
            if (dec < 3) {
                if (dec == 0) {
                    val *= 1000;
                } else if (dec == 1) {
                    val *= 100;
                } else {
                    val *= 10;
                }
            }
            idata.push(sign * val);
        }
        return idata;
    }

    /** Convert a numeric string to an integer
     *
     * @param str_data {string}
     * @return {number}
     */
    static imm_atoi(str_data: string): number
    {
        let num = parseInt(str_data);
        if (isNaN(num)) {
            return 0;
        }
        return Math.floor(num);
    }

    /** Convert a numeric string to an float
     *
     * @param str_data {string}
     * @return {number}
     */
    static imm_atof(str_data: string): number
    {
        let num = parseFloat(str_data);
        if (isNaN(num)) {
            return 0.0;
        }
        return num;
    }

    /** Convert a binary object to string
     *
     * @param bin_data {Uint8Array}
     * @return {string}
     */
    imm_bin2str(bin_data: Uint8Array): string
    {
        /** @type {number} **/
        let len = bin_data.length;
        /** @type {string} **/
        let res = '';
        for (let i = 0; i < len; i += 20) {
            let subdata = bin_data.subarray(i, Math.min(i + 20, len));
            res += String.fromCharCode.apply(null, Array.from(subdata));
        }
        return res;
    }

    /** Convert a string to binary object
     *
     * @param str_data {string}
     * @return {Uint8Array}
     */
    imm_str2bin(str_data: string): Uint8Array
    {
        /** @type {number} **/
        let len = str_data.length;
        /** @type {Uint8Array} **/
        let res = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
            res[i] = str_data.charCodeAt(i);
        }
        return res;
    }

    /** Convert a binary object to hex string
     *
     * @param bin_data {Uint8Array}
     * @return {string}
     */
    imm_bin2hexstr(bin_data: Uint8Array): string
    {
        /** @type {number} **/
        let len = bin_data.length;
        /** @type {string} **/
        let res = '';
        for (let i = 0; i < len; i++) {
            let n = bin_data[i].toString(16);
            res += n.length < 2 ? '0' + n : n;
        }
        return res.toUpperCase();
    }

    /** Convert a hex string to binary object
     *
     * @param str_data {string}
     * @return {Uint8Array}
     */
    imm_hexstr2bin(str_data: string): Uint8Array
    {
        /** @type {number} **/
        let len = (str_data.length >>> 1);
        /** @type {Uint8Array} **/
        let res = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
            res[i] = parseInt(str_data.substr(2 * i, 2), 16);
        }
        return res;
    }

    /** Return a Device object for a specified URL, serial number or logical device name
     *
     * @param str_device {string}
     * @return {YDevice}
     *
     * This function will not cause any network access (not async !)
     */
    imm_getDevice(str_device: string): YDevice | null
    {
        let dev = null;
        let serial;

        if (str_device.substr(0, 7) == 'http://' ||
            str_device.substr(0, 5) == 'ws://' ||
            str_device.substr(0, 8) == 'https://' ||
            str_device.substr(0, 6) == 'wss://') {
            // lookup by url
            serial = this._snByUrl[str_device];
            if (serial != undefined) dev = this._devs[serial];
        } else {
            // lookup by serial
            if (this._devs[str_device]) {
                dev = this._devs[str_device];
            } else {
                // fallback to lookup by logical name
                serial = this._snByName[str_device];
                if (serial) {
                    dev = this._devs[serial];
                }
            }
        }
        return dev;
    }

    /** Add or remove a value change callback
     *
     * @param obj_func {YFunction}
     * @param bool_add {Boolean}
     */
    async _UpdateValueCallbackList(obj_func: YFunction, bool_add: boolean): Promise<void>
    {
        let index: number = this._ValueCallbackList.indexOf(obj_func);
        if (bool_add) {
            await obj_func.isOnline();
            if (index < 0) {
                this._ValueCallbackList.push(obj_func);
            }
        } else if (index >= 0) {
            this._ValueCallbackList.splice(index, 1);
        }
    }

    /** Add or remove a timed report callback
     *
     * @param obj_func {YFunction}
     * @param bool_add {Boolean}
     */
    async _UpdateTimedReportCallbackList(obj_func: YFunction, bool_add: boolean): Promise<void>
    {
        let index: number = this._TimedReportCallbackList.indexOf(obj_func);
        if (bool_add) {
            await obj_func.isOnline();
            if (index < 0) {
                this._TimedReportCallbackList.push(obj_func);
            }
        } else if (index >= 0) {
            this._TimedReportCallbackList.splice(index, 1);
        }
    }

    // Return the class name for a given function ID or full Hardware Id
    // Also make sure that the function type is registered in the API
    imm_functionClass(str_funcid: string): string
    {
        let dotpos = str_funcid.indexOf('.');
        if (dotpos >= 0) str_funcid = str_funcid.substr(dotpos + 1);
        let classlen = str_funcid.length;
        while (str_funcid.substr(classlen - 1, 1) <= '9') {
            classlen--;
        }
        let classname = str_funcid.substr(0, 1).toUpperCase() + str_funcid.substr(1, classlen - 1);
        if (this._fnByType[classname] == undefined) {
            this._fnByType[classname] = new YFunctionType(this, classname);
        }

        return classname;
    }

    // Reindex a device in YAPI after a name change detected by device refresh
    imm_reindexDevice(obj_dev: YDevice): void
    {
        let rootUrl = obj_dev.imm_getRootUrl();
        let serial = obj_dev.imm_getSerialNumber();
        let lname = obj_dev.imm_getLogicalName();
        this._devs[serial] = obj_dev;
        this._snByUrl[rootUrl] = serial;
        if (lname != '') this._snByName[lname] = serial;
        this._fnByType['Module'].imm_reindexFunction(serial + '.module', lname, null, null);
        let i, count = obj_dev.imm_functionCount();
        for (i = 0; i < count; i++) {
            let funcid = obj_dev.imm_functionId(i);
            if (funcid != '') {
                let funcname = obj_dev.imm_functionName(i);
                let classname = this.imm_functionClass(funcid);
                this._fnByType[classname].imm_reindexFunction(serial + '.' + funcid, funcname, null, null);
            }
        }
    }

    // Remove a device from YAPI after an unplug detected by device refresh
    imm_forgetDevice(obj_dev: YDevice): void
    {
        let rootUrl = obj_dev.imm_getRootUrl();
        let serial = obj_dev.imm_getSerialNumber();
        let lname = obj_dev.imm_getLogicalName();
        delete this._devs[serial];
        delete this._snByUrl[rootUrl];
        if (this._snByName[lname] == serial) {
            delete this._snByName[lname];
        }
        this._fnByType['Module'].imm_forgetFunction(serial + '.module');
        let i, count = obj_dev.imm_functionCount();
        for (i = 0; i < count; i++) {
            let funcid = obj_dev.imm_functionId(i);
            if (funcid != '') {
                let classname = this.imm_functionClass(funcid);
                this._fnByType[classname].imm_forgetFunction(serial + '.' + funcid);
            }
        }
    }

    // Find the best known identifier (hardware Id) for a given function
    imm_resolveFunction(str_className: string, str_func: string): YConditionalResult
    {
        if (Y_BASETYPES[str_className] == undefined) {
            // using a regular function type
            if (this._fnByType[str_className] == undefined) {
                this._fnByType[str_className] = new YFunctionType(this, str_className);
            }
            return this._fnByType[str_className].imm_resolve(str_func);
        }
        // using an abstract baseType
        let baseType = Y_BASETYPES[str_className];
        let res;
        for (str_className in this._fnByType) {
            if (this._fnByType[str_className].imm_matchBaseType(baseType)) {
                res = this._fnByType[str_className].imm_resolve(str_func);
                if (res.errorType == YAPI_SUCCESS) return res;
            }
        }
        return {
            errorType: YAPI_DEVICE_NOT_FOUND,
            errorMsg: 'No ' + str_className + ' [' + str_func + '] found (old firmware?)'
        };
    }

    // Find the best known identifier (hardware Id) for a given function
    imm_getFriendlyNameFunction(str_className: string, str_func: string): YConditionalResult
    {
        if (Y_BASETYPES[str_className] == undefined) {
            // using a regular function type
            if (this._fnByType[str_className] == undefined) {
                this._fnByType[str_className] = new YFunctionType(this, str_className);
            }
            return this._fnByType[str_className].imm_getFriendlyName(str_func);
        }
        // using an abstract baseType
        let baseType = Y_BASETYPES[str_className];
        let res;
        for (str_className in this._fnByType) {
            if (this._fnByType[str_className].imm_matchBaseType(baseType)) {
                res = this._fnByType[str_className].imm_getFriendlyName(str_func);
                if (res.errorType == YAPI_SUCCESS) return res;
            }
        }
        return {
            errorType: YAPI_DEVICE_NOT_FOUND,
            errorMsg: 'No ' + str_className + ' [' + str_func + '] found (old firmware?)'
        };
    }

    // Retrieve a function object by hardware id, updating the indexes on the fly if needed
    imm_setFunction(str_className: string, str_func: string, obj_func: YFunction): void
    {
        if (this._fnByType[str_className] == undefined) {
            this._fnByType[str_className] = new YFunctionType(this, str_className);
        }
        this._fnByType[str_className].imm_setFunction(str_func, obj_func);
    }

    // Retrieve a function object by hardware id, updating the indexes on the fly if needed
    imm_getFunction(str_className: string, str_func: string): YFunction
    {
        if (this._fnByType[str_className] == undefined) {
            this._fnByType[str_className] = new YFunctionType(this, str_className);
        }
        return this._fnByType[str_className].imm_getFunction(str_func);
    }

    // Set a function advertised value by hardware id
    async setFunctionValue(str_hwid: string, str_pubval: string): Promise<void>
    {
        let classname = this.imm_functionClass(str_hwid);
        if (this._fnByType[classname].imm_setFunctionValue(str_hwid, str_pubval)) {
            let receivers = this._ValueCallbackList;
            for (let i = 0; i < receivers.length; i++) {
                let fun = receivers[i];
                if (!fun._hwId) continue;
                if (fun._hwId == str_hwid) {
                    await fun._invokeValueCallback(str_pubval);
                }
            }
        }
    }

    // Set a timed value report for a function
    async setTimedReport(str_hwid: string, float_timestamp: number, float_duration: number, arr_report: number[]): Promise<void>
    {
        let classname = this.imm_functionClass(str_hwid);
        let receivers = this._TimedReportCallbackList;
        for (let i = 0; i < receivers.length; i++) {
            let fun = receivers[i];
            if (!fun._hwId) continue;
            if (fun._hwId == str_hwid) {
                let dev = this.imm_getDevice(fun._serial);
                if (dev) {
                    let sensor = <YSensor>fun;
                    let report = await sensor._decodeTimedReport(float_timestamp, float_duration, arr_report);
                    await sensor._invokeTimedReportCallback(report);
                }
            }
        }
    }

    // Publish a configuration change event
    async setConfChange(str_serial: string): Promise<void>
    {
        let module = YModule.FindModuleInContext(this, str_serial + ".module");
        await module._invokeConfigChangeCallback();
    }

    // Publish a beacon change event
    async setBeaconChange(str_serial: string, int_beacon: number): Promise<void>
    {
        if (this._beacons[str_serial] === undefined || this._beacons[str_serial] != int_beacon) {
            this._beacons[str_serial] = int_beacon;
            let dev = this.imm_getDevice(str_serial);
            if (dev) {
                dev._beacon = int_beacon;
            }
            let module = YModule.FindModuleInContext(this, str_serial + ".module");
            await module._invokeBeaconCallback(int_beacon);
        }
    }

    // Retrieve a function advertised value by hardware id
    imm_getFunctionValue(str_hwid: string): string
    {
        let classname = this.imm_functionClass(str_hwid);
        return this._fnByType[classname].imm_getFunctionValue(str_hwid);
    }

    // Retrieve a function advertised value by hardware id
    imm_getFunctionBaseType(str_hwid: string): number
    {
        let classname = this.imm_functionClass(str_hwid);
        return this._fnByType[classname].imm_getBaseType();
    }

    // Find the hardwareId for the first instance of a given function class
    imm_getFirstHardwareId(str_className: string): string | null
    {
        if (Y_BASETYPES[str_className] == undefined) {
            // enumeration of a regular function type
            if (this._fnByType[str_className] == undefined) {
                this._fnByType[str_className] = new YFunctionType(this, str_className);
            }
            return this._fnByType[str_className].imm_getFirstHardwareId();
        }
        // enumeration of an abstract class
        let baseType = Y_BASETYPES[str_className];
        let res;
        for (str_className in this._fnByType) {
            if (this._fnByType[str_className].imm_matchBaseType(baseType)) {
                res = this._fnByType[str_className].imm_getFirstHardwareId();
                if (res) return res;
            }
        }
        return null;
    }

    // Find the hardwareId for the next instance of a given function class
    imm_getNextHardwareId(str_className: string, str_hwid: string): string | null
    {
        if (Y_BASETYPES[str_className] == undefined) {
            // enumeration of a regular function type
            return this._fnByType[str_className].imm_getNextHardwareId(str_hwid);
        }
        // enumeration of an abstract class
        let baseType = Y_BASETYPES[str_className];
        let prevclass = this.imm_functionClass(str_hwid);
        let res = this._fnByType[prevclass].imm_getNextHardwareId(str_hwid);
        if (res) return res;
        for (str_className in this._fnByType) {
            if (prevclass != '') {
                if (str_className != prevclass) continue;
                prevclass = '';
                continue;
            }
            if (this._fnByType[str_className].imm_matchBaseType(baseType)) {
                res = this._fnByType[str_className].imm_getFirstHardwareId();
                if (res) return res;
            }
        }
        return null;
    }

    /** Perform an HTTP request on a device, by URL or identifier.
     * When loading the REST API from a device by identifier, the device cache will be used.
     *
     * @param str_device {string}
     * @param str_request {string}
     * @param obj_body {YHTTPBody|null}
     * @param int_tcpchan {number}
     * @returns {YHTTPRequest}
     */
    async devRequest(str_device: string, str_request: string, obj_body: YHTTPBody | null = null, int_tcpchan: number = 0): Promise<YHTTPRequest>
    {
        let lines: string[] = str_request.split('\n');
        let res: YHTTPRequest = new YHTTPRequest(null);
        let lockdev: YDevice | null = null;
        let baseUrl: string;
        if (str_device.substr(0, 7) == 'http://' ||
            str_device.substr(0, 5) == 'ws://' ||
            str_device.substr(0, 8) == 'https://' ||
            str_device.substr(0, 6) == 'wss://' ||
            str_device.substr(0, 9) == 'secure://' ||
            str_device.substr(0, 7) == 'auto://') {
            baseUrl = str_device;
            if (baseUrl.slice(-1) != '/') baseUrl = baseUrl + '/';
            if (lines[0].substr(0, 12) != 'GET /not.byn') {
                /** @type {string} **/
                let serial = this._snByUrl[baseUrl];
                if (serial) {
                    lockdev = this._devs[serial];
                }
            }
        } else {
            lockdev = this.imm_getDevice(str_device);
            if (!lockdev) {
                res.errorType = YAPI_DEVICE_NOT_FOUND;
                res.errorMsg = 'Device [' + str_device + '] not online';
                return res;
            }
            // use the device cache when loading the whole API
            if (lines[0] == 'GET /api.json') {
                return lockdev.requestAPI(this.defaultCacheValidity);
            }
            baseUrl = lockdev.imm_getRootUrl();
        }
        // map str_device to a URL
        let words: string[] = lines[0].split(' ');
        if (words.length < 2) {
            res.errorType = YAPI_INVALID_ARGUMENT;
            res.errorMsg = 'Invalid request, not enough words; expected a method name and a URL';
            return res;
        } else if (words.length > 2) {
            res.errorType = YAPI_INVALID_ARGUMENT;
            res.errorMsg = 'Invalid request, too many words; make sure the URL is URI-encoded';
            return res;
        }
        let hub: YGenericHub | null = null;
        for (let i = 0; i < this._connectedHubs.length; i++) {
            let hubUrl = this._connectedHubs[i].imm_getRootUrl();
            if (baseUrl.slice(0, hubUrl.length) == hubUrl) {
                hub = this._connectedHubs[i];
                break;
            }
        }
        if (!hub && this._knownHubsByUrl[str_device]) {
            // special case to handle initial load of hub API before
            // hub is added to the "online hub" list
            hub = this._knownHubsByUrl[str_device];
        }
        if (!hub) {
            res.errorType = YAPI_DEVICE_NOT_FOUND;
            res.errorMsg = 'No hub found for URL ' + baseUrl;
            return res;
        }
        let method: string = words[0];
        let devUrl: string = words[1];
        if (devUrl.substr(0, 1) == '/') devUrl = devUrl.substr(1);
        // create an absolute hub-relative URL in devUrl
        if (baseUrl.substr(0, hub.imm_getRootUrl().length) == hub.imm_getRootUrl()) {
            devUrl = baseUrl.substr(hub.imm_getRootUrl().length - 1) + devUrl;
        } else {
            let pos = baseUrl.indexOf('//');
            pos = baseUrl.indexOf('/', pos + 3);
            devUrl = baseUrl.slice(pos) + devUrl;
        }

        // make sure we are allowed to execute this query
        if (devUrl.slice(-2) == '&.' && !await hub.hasRwAccess()) {
            res.errorType = YAPI_UNAUTHORIZED;
            res.errorMsg = 'Access denied: admin credentials required';
            return res;
        }

        // queue the call to user callback function in the pending queries promise chain
        let delayedCode = function delayedRequest(): Promise<YHTTPRequest> {
            return (<YGenericHub>hub).request(method, devUrl, obj_body, int_tcpchan).catch((e): YHTTPRequest => {
                //this.imm_log('request '+method+' '+devUrl+' failed', callStack);
                let res = new YHTTPRequest(null);
                res.errorType = YAPI_IO_ERROR;
                res.errorMsg = e.message;
                return res;
            });
        };
        if (lockdev && int_tcpchan == 0) {
            let newPromise = lockdev._pendingQueries.then(delayedCode, delayedCode);
            lockdev._pendingQueries = <Promise<void>><unknown>newPromise;
            res = await newPromise;
        } else {
            res = await delayedCode();
        }
        return res;
    }

    async isReadOnly(str_device: string): Promise<boolean>
    {
        let lockdev = this.imm_getDevice(str_device);
        if (!lockdev) {
            return true;
        }
        let baseUrl = lockdev.imm_getRootUrl();
        let hub = null;
        for (let i = 0; i < this._connectedHubs.length; i++) {
            let hubUrl = this._connectedHubs[i].imm_getRootUrl();
            if (baseUrl.slice(0, hubUrl.length) == hubUrl) {
                hub = this._connectedHubs[i];
                break;
            }
        }
        if (!hub || !await hub.hasRwAccess()) {
            return true;
        }

        return false;
    }

    /** Locate the device to access a specified function, without causing any I/O
     *
     * @param str_className {string}
     * @param str_func {string}
     * @returns {YFuncRequest}
     */
    imm_funcDev_internal(str_className: string, str_func: string): YFuncRequest
    {
        let res = new YFuncRequest(null);
        let resolve = this.imm_resolveFunction(str_className, str_func);
        if (resolve.errorType != YAPI_SUCCESS) {
            res.errorType = resolve.errorType;
            res.errorMsg = resolve.errorMsg;
        } else {
            str_func = <string>resolve.result;
            let dotpos = str_func.indexOf('.');
            let devid = str_func.substr(0, dotpos);
            let funcid = str_func.substr(dotpos + 1);
            let dev = this.imm_getDevice(devid);
            if (dev == null) {
                res.errorType = YAPI_DEVICE_NOT_FOUND;
                res.errorMsg = 'Device [' + devid + '] not found';
            } else {
                res.obj_result = {_expiration: -1, device: dev, deviceid: devid, functionid: funcid, hwid: str_func};
            }
        }
        return res;
    }

    /** Locate the device to access a specified function. May cause device list update if needed
     *
     * @param str_className {string}
     * @param str_func {string}
     * @returns {YFuncRequest}
     */
    async _funcDev(str_className: string, str_func: string): Promise<YFuncRequest>
    {
        let res = this.imm_funcDev_internal(str_className, str_func);
        if (res.errorType == YAPI_SUCCESS) {
            return res;
        } else if (res.errorType == YAPI_DEVICE_NOT_FOUND && this._connectedHubs.length == 0) {
            // when USB is supported, check if no USB device is connected before outputing this message
            res.errorMsg = 'Impossible to contact any device because no hub has been registered';
            return res;
        }
        let updRes = await this._updateDeviceList_internal(true, false);
        if (updRes.errorType != YAPI_SUCCESS) {
            res.errorType = updRes.errorType;
            res.errorMsg = updRes.errorMsg;
            return res;
        }
        return this.imm_funcDev_internal(str_className, str_func);
    }

    /** Load and parse the REST API for a function given by class name and identifier, possibly applying changes
     * Device cache will be preloaded when loading function 'module' and leveraged for other modules
     *
     * @param str_className {string}
     * @param str_func {string}
     * @param str_extra {string}
     * @param int_msValidity {number}
     * @returns {YFuncRequest}
     */
    async funcRequest(str_className: string, str_func: string, str_extra: string, int_msValidity: number = 0): Promise<YFuncRequest>
    {
        /** @type {YFuncRequest} **/
        let funcreq = this.imm_funcDev_internal(str_className, str_func);
        if (funcreq.errorType != YAPI_SUCCESS) {
            funcreq = await this._funcDev(str_className, str_func);
            if (funcreq.errorType != YAPI_SUCCESS) {
                return funcreq;
            }
        }
        let devreq = <_YY_FuncReq>funcreq.obj_result;
        let loadval: any = null;
        if (str_extra == '') {
            // use a cached API string (reload if needed)
            let yreq: YHTTPRequest = await devreq.device.requestAPI(int_msValidity);
            if (yreq != null) {
                if (yreq.errorType != YAPI_SUCCESS || !yreq.obj_result) {
                    let res = new YFuncRequest(null);
                    res.errorType = yreq.errorType;
                    res.errorMsg = yreq.errorMsg;
                    return res;
                }
                loadval = yreq.obj_result[devreq.functionid];
            }
        } else {
            devreq.device.imm_dropCache();
        }
        if (!loadval) {
            // request specified function only to minimize traffic
            if (str_extra == '') str_extra = '.json';
            let httpreq = 'GET /api/' + devreq.functionid + str_extra;
            let yreq: YHTTPRequest = await this.devRequest(devreq.deviceid, httpreq, null, 0);
            if (yreq.errorType != YAPI_SUCCESS) return yreq;
            let replyBuff = <Uint8Array>yreq.bin_result;
            if (replyBuff.length == 0 && httpreq.indexOf('?') >= 0) {
                funcreq.obj_result = null;
                return funcreq;
            }
            try {
                loadval = JSON.parse(this.imm_bin2str(replyBuff));
            } catch (err) {
                //this.imm_log('RequestAPI parse error: ', err);
            }
        }
        if (!loadval) {
            funcreq.errorType = YAPI_IO_ERROR;
            funcreq.errorMsg = 'Request failed, could not parse API value for function ' + devreq.hwid;
        } else {
            for (let key in devreq) {
                loadval[key] = devreq[key];
            }
            funcreq.obj_result = loadval;
        }
        return funcreq;
    }

    /** Perform an HTTP request on a device and return the result string
     *
     * @param str_device {string}
     * @param str_request {string}
     * @returns {Promise<Uint8Array|null>}
     */
    async HTTPRequest(str_device: string, str_request: string): Promise<Uint8Array | null>
    {
        /** @type {YHTTPRequest} **/
        let yreq = await this.devRequest(str_device, str_request, null, 0);
        if (yreq.errorType != YAPI_SUCCESS) {
            return this._throw(yreq.errorType, yreq.errorMsg, null);
        }
        return yreq.bin_result;
    }

    async ForceDeviceRefresh(str_device: string): Promise<number>
    {
        let dev = this.imm_getDevice(str_device);
        if (!dev) return YAPI_DEVICE_NOT_FOUND;
        let rootUrl = dev.imm_getRootUrl();
        for (let i = 0; i < this._connectedHubs.length; i++) {
            let hub = this._connectedHubs[i];
            let hubUrl = hub.urlInfo.imm_getRootUrl();
            if (rootUrl.substr(0, hubUrl.length) === hubUrl) {
                /** @type {YDevice} **/
                let hubDev = <YDevice>this.imm_getDevice(hubUrl);
                hubDev.imm_dropCache();
                /** @type {number} **/
                let retcode = await hubDev.refresh();
                if (retcode != YAPI_SUCCESS) {
                    return this._throw(retcode, hubDev._lastErrorMsg, retcode);
                }
                /** @type {YHTTPRequest} **/
                let yreq = await hubDev.requestAPI(this.defaultCacheValidity);
                if (yreq.errorType != YAPI_SUCCESS) {
                    return yreq.errorType;
                }
                let yellowPages = yreq.obj_result['services']['yellowPages'];
                dev.imm_updateFromYP(yellowPages);
            }
        }
        dev.imm_dropCache();
        return YAPI_SUCCESS;
    }

    async SetDeviceListValidity_internal(deviceListValidity: number): Promise<void>
    {
        this._deviceListValidityMs = deviceListValidity * 1000;
    }

    async GetDeviceListValidity_internal(): Promise<number>
    {
        return (this._deviceListValidityMs / 1000) >> 0;
    }

    async SetNetworkTimeout_internal(networkMsTimeout: number): Promise<void>
    {
        this._networkTimeoutMs = networkMsTimeout;
    }

    async GetNetworkTimeout_internal(): Promise<number>
    {
        return this._networkTimeoutMs;
    }

    async AddUdevRule_internal(force: boolean): Promise<string>
    {
        return "error: Not supported in TypeScript";
    }

    async DownloadHostCertificate_internal(url: string, mstimeout: number): Promise<string>
    {
        return await this.system_env.downloadRemoteCertificate(new _YY_UrlInfo(url));
    }

    async SetTrustedCertificatesList_internal(certificatePath: string): Promise<string>
    {
        return "error: Not supported in TypeScript";
    }

    async SetNetworkSecurityOptions_internal(opts: number): Promise<string>
    {
        this._networkSecurityOptions = opts
        return "";
    }

    async AddTrustedCertificates_internal(certificate: string): Promise<string>
    {
        this._trustedCertificate.push(certificate);
        return "";
    }

    //--- (generated code: YAPIContext implementation)

    /**
     * Modifies the delay between each forced enumeration of the used YoctoHubs.
     * By default, the library performs a full enumeration every 10 seconds.
     * To reduce network traffic, you can increase this delay.
     * It's particularly useful when a YoctoHub is connected to the GSM network
     * where traffic is billed. This parameter doesn't impact modules connected by USB,
     * nor the working of module arrival/removal callbacks.
     * Note: you must call this function after yInitAPI.
     *
     * @param deviceListValidity : nubmer of seconds between each enumeration.
     * @noreturn
     */
    async SetDeviceListValidity(deviceListValidity: number): Promise<void>
    {
        return await this.SetDeviceListValidity_internal(deviceListValidity);
    }

    /**
     * Returns the delay between each forced enumeration of the used YoctoHubs.
     * Note: you must call this function after yInitAPI.
     *
     * @return the number of seconds between each enumeration.
     */
    async GetDeviceListValidity(): Promise<number>
    {
        return await this.GetDeviceListValidity_internal();
    }

    /**
     * Adds a UDEV rule which authorizes all users to access Yoctopuce modules
     * connected to the USB ports. This function works only under Linux. The process that
     * calls this method must have root privileges because this method changes the Linux configuration.
     *
     * @param force : if true, overwrites any existing rule.
     *
     * @return an empty string if the rule has been added.
     *
     * On failure, returns a string that starts with "error:".
     */
    async AddUdevRule(force: boolean): Promise<string>
    {
        return await this.AddUdevRule_internal(force);
    }

    /**
     * Download the TLS/SSL certificate from the hub. This function allows to download a TLS/SSL certificate to add it
     * to the list of trusted certificates using the AddTrustedCertificates method.
     *
     * @param url : the root URL of the VirtualHub V2 or HTTP server.
     * @param mstimeout : the number of milliseconds available to download the certificate.
     *
     * @return a string containing the certificate. In case of error, returns a string starting with "error:".
     */
    async DownloadHostCertificate(url: string, mstimeout: number): Promise<string>
    {
        return await this.DownloadHostCertificate_internal(url, mstimeout);
    }

    /**
     * Adds a TLS/SSL certificate to the list of trusted certificates. By default, the library
     * library will reject TLS/SSL connections to servers whose certificate is not known. This function
     * function allows to add a list of known certificates. It is also possible to disable the verification
     * using the SetNetworkSecurityOptions method.
     *
     * @param certificate : a string containing one or more certificates.
     *
     * @return an empty string if the certificate has been added correctly.
     *         In case of error, returns a string starting with "error:".
     */
    async AddTrustedCertificates(certificate: string): Promise<string>
    {
        return await this.AddTrustedCertificates_internal(certificate);
    }

    /**
     * Set the path of Certificate Authority file on local filesystem. This method takes as a parameter
     * the path of a file containing all certificates in PEM format.
     * For technical reasons, only one file can be specified. So if you need to connect to several Hubs
     * instances with self-signed certificates, you'll need to use
     * a single file containing all the certificates end-to-end. Passing a empty string will restore the
     * default settings. This option is only supported by PHP library.
     *
     * @param certificatePath : the path of the file containing all certificates in PEM format.
     *
     * @return an empty string if the certificate has been added correctly.
     *         In case of error, returns a string starting with "error:".
     */
    async SetTrustedCertificatesList(certificatePath: string): Promise<string>
    {
        return await this.SetTrustedCertificatesList_internal(certificatePath);
    }

    /**
     * Enables or disables certain TLS/SSL certificate checks.
     *
     * @param opts : The options are YAPI.NO_TRUSTED_CA_CHECK,
     *         YAPI.NO_EXPIRATION_CHECK, YAPI.NO_HOSTNAME_CHECK.
     *
     * @return an empty string if the options are taken into account.
     *         On error, returns a string beginning with "error:".
     */
    async SetNetworkSecurityOptions(opts: number): Promise<string>
    {
        return await this.SetNetworkSecurityOptions_internal(opts);
    }

    /**
     * Modifies the network connection delay for yRegisterHub() and yUpdateDeviceList().
     * This delay impacts only the YoctoHubs and VirtualHub
     * which are accessible through the network. By default, this delay is of 20000 milliseconds,
     * but depending or you network you may want to change this delay,
     * gor example if your network infrastructure is based on a GSM connection.
     *
     * @param networkMsTimeout : the network connection delay in milliseconds.
     * @noreturn
     */
    async SetNetworkTimeout(networkMsTimeout: number): Promise<void>
    {
        return await this.SetNetworkTimeout_internal(networkMsTimeout);
    }

    /**
     * Returns the network connection delay for yRegisterHub() and yUpdateDeviceList().
     * This delay impacts only the YoctoHubs and VirtualHub
     * which are accessible through the network. By default, this delay is of 20000 milliseconds,
     * but depending or you network you may want to change this delay,
     * for example if your network infrastructure is based on a GSM connection.
     *
     * @return the network connection delay in milliseconds.
     */
    async GetNetworkTimeout(): Promise<number>
    {
        return await this.GetNetworkTimeout_internal();
    }

    /**
     * Change the validity period of the data loaded by the library.
     * By default, when accessing a module, all the attributes of the
     * module functions are automatically kept in cache for the standard
     * duration (5 ms). This method can be used to change this standard duration,
     * for example in order to reduce network or USB traffic. This parameter
     * does not affect value change callbacks
     * Note: This function must be called after yInitAPI.
     *
     * @param cacheValidityMs : an integer corresponding to the validity attributed to the
     *         loaded function parameters, in milliseconds.
     * @noreturn
     */
    async SetCacheValidity(cacheValidityMs: number): Promise<void>
    {
        this.defaultCacheValidity = cacheValidityMs;
    }

    /**
     * Returns the validity period of the data loaded by the library.
     * This method returns the cache validity of all attributes
     * module functions.
     * Note: This function must be called after yInitAPI .
     *
     * @return an integer corresponding to the validity attributed to the
     *         loaded function parameters, in milliseconds
     */
    async GetCacheValidity(): Promise<number>
    {
        return this.defaultCacheValidity;
    }

    nextHubInUseInternal(hubref: number): YHub | null
    {
        return this.nextHubInUseInternal_internal(hubref);
    }

    getYHubObj(hubref: number): YHub
    {
        let obj: YHub | null;
        obj = this._findYHubFromCache(hubref);
        if (obj == null) {
            obj = new YHub(this, hubref);
            this._addYHubToCache(hubref, obj);
        }
        return obj;
    }

    //--- (end of generated code: YAPIContext implementation)

    /**
     * Returns the version identifier for the Yoctopuce library in use.
     * The version is a string in the form "Major.Minor.Build",
     * for instance "1.01.5535". For languages using an external
     * DLL (for instance C#, VisualBasic or Delphi), the character string
     * includes as well the DLL version, for instance
     * "1.01.5535 (1.01.5439)".
     *
     * If you want to verify in your code that the library version is
     * compatible with the version that you have used during development,
     * verify that the major number is strictly equal and that the minor
     * number is greater or equal. The build number is not relevant
     * with respect to the library compatibility.
     *
     * @return a character string describing the library version.
     */
    async GetAPIVersion(): Promise<string>
    {
        return this.imm_GetAPIVersion();
    }

    imm_GetAPIVersion(): string
    {
        return /* version number patched automatically */'2.0.61858';
    }

    /**
     * Initializes the Yoctopuce programming library explicitly.
     * It is not strictly needed to call yInitAPI(), as the library is
     * automatically  initialized when calling yRegisterHub() for the
     * first time.
     *
     * When YAPI.DETECT_NONE is used as detection mode,
     * you must explicitly use yRegisterHub() to point the API to the
     * VirtualHub on which your devices are connected before trying to access them.
     *
     * @param mode : an integer corresponding to the type of automatic
     *         device detection to use. Possible values are
     *         YAPI.DETECT_NONE, YAPI.DETECT_USB, YAPI.DETECT_NET,
     *         and YAPI.DETECT_ALL.
     * @param errmsg : a string passed by reference to receive any error message.
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure returns a negative error code.
     */
    async InitAPI(mode: number, errmsg: YErrorMsg): Promise<number>
    {
        this._detectType = mode;
        if (this.system_env.hasSSDP) {
            if ((mode & this.DETECT_NET) !== 0) {
                await this.TriggerHubDiscovery();
            }
        } else {
            // for backward-compatibility, don't throw an exception
            // whatever argument is provided
        }
        return YAPI_SUCCESS;
    }

    /**
     * Waits for all pending communications with Yoctopuce devices to be
     * completed then frees dynamically allocated resources used by
     * the Yoctopuce library.
     *
     * From an operating system standpoint, it is generally not required to call
     * this function since the OS will automatically free allocated resources
     * once your program is completed. However there are two situations when
     * you may really want to use that function:
     *
     * - Free all dynamically allocated memory blocks in order to
     * track a memory leak.
     *
     * - Send commands to devices right before the end
     * of the program. Since commands are sent in an asynchronous way
     * the program could exit before all commands are effectively sent.
     *
     * You should not call any other library function after calling
     * yFreeAPI(), or your program will crash.
     */
    async FreeAPI(): Promise<void>
    {
        // Wait for all requests to complete
        for (let serial in this._devs) {
            await this._devs[serial].waitPendingQueries();
        }
        // Close all hubs, restart the API
        await this.KillAPI();
    }

    /**
     * Abort any ongoing API activity immediately by closing all open hubs. Then
     * frees dynamically allocated memory blocks used by the Yoctopuce library.
     * You should not call any other library function after calling
     * yDropAPI(), or your program will crash.
     */
    async KillAPI(): Promise<void>
    {
        // stop SSDP manager, if started
        if (this._ssdpManager) {
            await this._ssdpManager.ySSDPStop();
            this._ssdpManager = null;
        }
        // discard all connected hubs
        for (let hub of this._connectedHubs) {
            this.imm_dropConnectedHub(hub);
        }
        // disconnect all hubs (including callback)
        for (let serial in this._knownHubsBySerial) {
            let hub = this._knownHubsBySerial[serial];
            if (hub.imm_getcurrentState() > Y_YHubConnType.HUB_DETACHED) {
                await hub.detach(YAPI.IO_ERROR, 'Connection closed by FreeAPI');
            }
        }
        // clear all caches
        this.imm_ResetToDefaults();
    }

    /**
     * Disables the use of exceptions to report runtime errors.
     * When exceptions are disabled, every function returns a specific
     * error value which depends on its type and which is documented in
     * this reference manual.
     */
    async DisableExceptions(): Promise<void>
    {
        this.exceptionsDisabled = true;
    }

    /**
     * Re-enables the use of exceptions for runtime error handling.
     * Be aware than when exceptions are enabled, every function that fails
     * triggers an exception. If the exception is not caught by the user code,
     * it either fires the debugger or aborts (i.e. crash) the program.
     */
    async EnableExceptions(): Promise<void>
    {
        this.exceptionsDisabled = false;
    }

    /**
     * Enable logging to the console for unhandled promise rejections,
     * such as exceptions in async functions without a try/catch.
     * This is not really a Yoctopuce thing, but since it is not obvious
     * to find out and since the code differs depending on the environment,
     * we provide it here for convenience.
     */
    async LogUnhandledPromiseRejections(): Promise<void>
    {
        this.system_env.hookUnhandledRejection((reason: object, promise: PromiseLike<any>): void => {
            this.imm_log("Unhandled Rejection at: Promise ", promise, " reason: ", reason);
        })
    }

    /**
     * Setup the Yoctopuce library to use modules connected on a given machine. Idealy this
     * call will be made once at the begining of your application.  The
     * parameter will determine how the API will work. Use the following values:
     *
     * <b>usb</b>: When the usb keyword is used, the API will work with
     * devices connected directly to the USB bus. Some programming languages such a JavaScript,
     * PHP, and Java don't provide direct access to USB hardware, so usb will
     * not work with these. In this case, use a VirtualHub or a networked YoctoHub (see below).
     *
     * <b><i>x.x.x.x</i></b> or <b><i>hostname</i></b>: The API will use the devices connected to the
     * host with the given IP address or hostname. That host can be a regular computer
     * running a <i>native VirtualHub</i>, a <i>VirtualHub for web</i> hosted on a server,
     * or a networked YoctoHub such as YoctoHub-Ethernet or
     * YoctoHub-Wireless. If you want to use the VirtualHub running on you local
     * computer, use the IP address 127.0.0.1. If the given IP is unresponsive, yRegisterHub
     * will not return until a time-out defined by ySetNetworkTimeout has elapsed.
     * However, it is possible to preventively test a connection  with yTestHub.
     * If you cannot afford a network time-out, you can use the non blocking yPregisterHub
     * function that will establish the connection as soon as it is available.
     *
     *
     * <b>callback</b>: that keyword make the API run in "<i>HTTP Callback</i>" mode.
     * This a special mode allowing to take control of Yoctopuce devices
     * through a NAT filter when using a VirtualHub or a networked YoctoHub. You only
     * need to configure your hub to call your server script on a regular basis.
     * This mode is currently available for PHP and Node.JS only.
     *
     * Be aware that only one application can use direct USB access at a
     * given time on a machine. Multiple access would cause conflicts
     * while trying to access the USB modules. In particular, this means
     * that you must stop the VirtualHub software before starting
     * an application that uses direct USB access. The workaround
     * for this limitation is to setup the library to use the VirtualHub
     * rather than direct USB access.
     *
     * If access control has been activated on the hub, virtual or not, you want to
     * reach, the URL parameter should look like:
     *
     * http://username:password@address:port
     *
     * You can call <i>RegisterHub</i> several times to connect to several machines. On
     * the other hand, it is useless and even counterproductive to call <i>RegisterHub</i>
     * with to same address multiple times during the life of the application.
     *
     * @param url : a string containing either "usb","callback" or the
     *         root URL of the hub to monitor
     * @param errmsg : a string passed by reference to receive any error message.
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure returns a negative error code.
     */
    async RegisterHub(url: string, errmsg: YErrorMsg): Promise<number>
    {
        if (this._logLevel >= 4) {
            this.imm_log('Registering  hub: ' + url);
        }

        if (url === "net") {
            if (this.system_env.hasSSDP) {
                this._detectType |= this.DETECT_NET;
                return this.TriggerHubDiscovery();
            } else {
                return this.imm_setErr(errmsg, YAPI_NOT_SUPPORTED, 'Network discovery is not possible in a browser', YAPI_NOT_SUPPORTED);
            }
        }
        if (url === "usb") {
            return this.imm_setErr(errmsg, YAPI_NOT_SUPPORTED, 'Use the VirtualHub on 127.0.0.1 to access USB devices', YAPI_NOT_SUPPORTED);
        }
        let urlInfo: _YY_UrlInfo = new _YY_UrlInfo(url);
        let hub: YGenericHub | null = this.imm_getHub(urlInfo);
        if (!hub) {
            if (this._logLevel >= 3) {
                this.imm_log('Registering new hub: ' + urlInfo.imm_getRootUrl());
            }
            hub = new YGenericHub(this, urlInfo);
            hub.imm_addKnownUrl(urlInfo);
            // add original url to the _knownHubsByUrl array
            this._knownHubsByUrl[urlInfo.imm_getRootUrl()] = hub;
        } else {
            if (this._logLevel >= 3) {
                this.imm_log('Registering existing hub: ' + urlInfo.imm_getRootUrl() + " old=" + hub.imm_getRootUrl());
            }
            hub.imm_updateUrl(urlInfo);
        }
        await hub.attach(Y_YHubConnType.HUB_REGISTERED);
        let sub_errmsg = new YErrorMsg();
        let retcode: number = await hub.waitForConnection(this._networkTimeoutMs, sub_errmsg);
        if (retcode != YAPI_SUCCESS) {
            this.imm_dropConnectedHub(hub);
            await hub.detach(retcode, sub_errmsg.msg);
            hub.imm_forgetUrls();
            return this.imm_setErr(errmsg, retcode, sub_errmsg.msg, retcode);
        }

        // Update known device list immediately after connection
        let yreq = await this._updateDeviceList_internal(true, false);
        if (yreq.errorType != YAPI_SUCCESS) {
            if (this._logLevel >= 3) {
                this.imm_log('Registering failed with' + yreq.errorType + " (" + yreq.errorMsg + ")");
            }
            this.imm_dropConnectedHub(hub);
            await hub.detach(yreq.errorType, yreq.errorMsg);
            hub.imm_forgetUrls();
            return this.imm_setErr(errmsg, yreq.errorType, yreq.errorMsg, yreq.errorType);
        }
        return YAPI_SUCCESS;
    }

    /**
     * Fault-tolerant alternative to yRegisterHub(). This function has the same
     * purpose and same arguments as yRegisterHub(), but does not trigger
     * an error when the selected hub is not available at the time of the function call.
     * If the connexion cannot be established immediately, a background task will automatically
     * perform periodic retries. This makes it possible to register a network hub independently of the current
     * connectivity, and to try to contact it only when a device is actively needed.
     *
     * @param url : a string containing either "usb","callback" or the
     *         root URL of the hub to monitor
     * @param errmsg : a string passed by reference to receive any error message.
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure returns a negative error code.
     */
    async PreregisterHub(url: string, errmsg: YErrorMsg): Promise<number>
    {
        let urlInfo: _YY_UrlInfo = new _YY_UrlInfo(url);
        let hub: YGenericHub | null = this.imm_getHub(urlInfo);
        if (!hub) {
            if (this._logLevel >= 3) {
                this.imm_log('Preregistering new hub: ' + urlInfo.imm_getRootUrl());
            }
            hub = new YGenericHub(this, urlInfo);
            if (!hub) {
                return this.imm_setErr(errmsg, YAPI_NOT_SUPPORTED, 'Unsupported hub protocol: ' + urlInfo.imm_getProto(), YAPI_NOT_SUPPORTED);
            }
            hub.imm_addKnownUrl(urlInfo);
            // add original url to the _knownHubsByUrl array
            this._knownHubsByUrl[urlInfo.imm_getRootUrl()] = hub;
        } else {
            if (this._logLevel >= 3) {
                this.imm_log('Preregistering existing hub: ' + urlInfo.imm_getRootUrl());
            }
            hub.imm_updateUrl(urlInfo);
        }
        await hub.attach(Y_YHubConnType.HUB_PREREGISTERED);

        return YAPI_SUCCESS;
    }

    /**
     * Setup the Yoctopuce library to use modules connected on a remote hub
     * performing an incoming connection to an HTTP server.
     *
     * @param incomingMessage {IncomingMessage} : node http incomingMessage object.
     * @param serverResponse  {ServerResponse} : node http serverResponse object.
     * @param errmsg {YErrorMsg} : a string passed by reference to receive any error message.
     *
     * @return {number} YAPI_SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async RegisterHubHttpCallback(incomingMessage: any, serverResponse: any, errmsg: YErrorMsg): Promise<number>
    {
        let url: string = 'http://callback:4444';
        let urlInfo: _YY_UrlInfo = new _YY_UrlInfo(url);
        let hub: YGenericHub | null = this.imm_getHub(urlInfo);
        if (!hub) {
            hub = new YGenericHub(this, urlInfo);
            let engine = this.system_env.getHttpCallbackEngine(hub, urlInfo, incomingMessage, serverResponse);
            if (!engine) {
                return this.imm_setErr(errmsg, YAPI_NOT_SUPPORTED, 'HTTP Callback mode is not available in this environment', YAPI_NOT_SUPPORTED);
            }
            hub.imm_setHubEngine(engine);
        }
        await hub.attach(Y_YHubConnType.HUB_CALLBACK);
        let sub_errmsg = new YErrorMsg();
        let retcode: number = await hub.waitForConnection(this._networkTimeoutMs, sub_errmsg);
        if (retcode != YAPI_SUCCESS) {
            this.imm_dropConnectedHub(hub);
            await hub.detach(retcode, sub_errmsg.msg);
            return this.imm_setErr(errmsg, retcode, sub_errmsg.msg, retcode);
        }

        // Update known device list
        let yreq = await this._updateDeviceList_internal(true, false);
        if (yreq.errorType != YAPI_SUCCESS) {
            await hub.reportFailure(yreq.errorMsg);
            return this.imm_setErr(errmsg, yreq.errorType, yreq.errorMsg, yreq.errorType);
        }
        return YAPI_SUCCESS;
    }

    /**
     * Setup the Yoctopuce library to use modules connected on a remote hub
     * performing an incoming connection to a websocket server.
     *
     * @param ws {WebSocket} : node WebSocket object for the incoming websocket callback connection.
     * @param errmsg {YErrorMsg} : a string passed by reference to receive any error message.
     * @param authpwd {string} : an optional authentication password
     *
     * @return {number} YAPI_SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async RegisterHubWebSocketCallback(ws: _YY_WebSocket, errmsg: YErrorMsg, authpwd: string): Promise<number>
    {
        let authstr = (authpwd ? 'ws:' + authpwd + '@' : '');
        let url: string = 'http://' + authstr + 'callback:4444';
        let urlInfo: _YY_UrlInfo = new _YY_UrlInfo(url);
        let hub: YGenericHub | null = this.imm_getHub(urlInfo);
        if (!hub) {
            hub = new YGenericHub(this, urlInfo);
            let engine: YHubEngine | null = this.system_env.getWebSocketCallbackEngine(hub, urlInfo, ws);
            if (!engine) {
                return this.imm_setErr(errmsg, YAPI_NOT_SUPPORTED, 'WebSocket Callback mode is not available in this environment', YAPI_NOT_SUPPORTED);
            }
            hub.imm_setHubEngine(engine);
        }
        await hub.attach(Y_YHubConnType.HUB_CALLBACK);
        let sub_errmsg = new YErrorMsg();
        let retcode: number = await hub.waitForConnection(this._networkTimeoutMs, sub_errmsg);
        if (retcode != YAPI_SUCCESS) {
            this.imm_dropConnectedHub(hub);
            await hub.detach(retcode, sub_errmsg.msg);
            return this.imm_setErr(errmsg, retcode, sub_errmsg.msg, retcode);
        }

        // Update known device list
        let yreq = await this._updateDeviceList_internal(true, false);
        if (yreq.errorType != YAPI_SUCCESS) {
            this.imm_dropConnectedHub(hub);
            await hub.detach(yreq.errorType, yreq.errorMsg);
            return this.imm_setErr(errmsg, yreq.errorType, yreq.errorMsg, yreq.errorType);
        }
        return YAPI_SUCCESS;
    }

    async WebSocketJoin(ws: _YY_WebSocket, arr_credentials: WebSocketCredential[], closeCallback: Function): Promise<boolean>
    {
        if (this._connectedHubs.length == 0) {
            return false;
        }
        let hub: YGenericHub = this._connectedHubs[0];
        return await hub.WebSocketJoin(ws, arr_credentials, closeCallback);
    }

    /**
     * Setup the Yoctopuce library to no more use modules connected on a previously
     * registered machine with RegisterHub.
     *
     * @param url : a string containing either "usb" or the
     *         root URL of the hub to monitor
     */
    async UnregisterHub(url: string): Promise<void>
    {
        let urlInfo: _YY_UrlInfo = new _YY_UrlInfo(url);
        let hub: YGenericHub | null = this.imm_getHub(urlInfo);
        if (hub) {
            // first ensure all set request are done
            for (let serial in this._devs) {
                await this._devs[serial].waitPendingQueries();
            }
            await hub.waitForPendingQueries(200)

            let serialNumber: string = hub.imm_getSerialNumber();
            if (serialNumber) {
                // Make sure to work on the latest active "alias" hub
                let activeHub: YGenericHub | null = this._knownHubsBySerial[serialNumber]
                if (activeHub) {
                    hub.imm_forgetUrls();
                    hub = activeHub;
                    urlInfo = hub.urlInfo;
                }
            }
            if (this._logLevel >= 3) {
                this.imm_log('Unregistering hub ' + url + ' (' + urlInfo.imm_getRootUrl() + ')');
            }
            this.imm_dropConnectedHub(hub);
            if (hub.imm_isDisconnected()) {
                if (this._logLevel >= 3) {
                    this.imm_log('Hub ' + urlInfo.imm_getRootUrl() + ' is already disconnected');
                }
                return;
            }
            let before = this.GetTickCount();
            let disconnected: Promise<void> = hub.waitForDisconnection(500);
            if (hub.imm_isDisconnecting()) {
                if (this._logLevel >= 3) {
                    this.imm_log('Hub ' + urlInfo.imm_getRootUrl() + ' is already disconnecting');
                }
            } else {
                await hub.detach(YAPI.IO_ERROR, 'Hub has been unregistered');
            }
            await disconnected;
            hub.imm_forgetUrls();
            if (this._logLevel >= 4) {
                this.imm_log("Disconnected after " + (this.GetTickCount() - before) + " ms");
            }
        } else {
            if (this._logLevel >= 4) {
                this.imm_log('No hub to Unregister with ' + url + ' (' + urlInfo.imm_getRootUrl() + ')');
            }
        }
    }

    /**
     * Test if the hub is reachable. This method do not register the hub, it only test if the
     * hub is usable. The url parameter follow the same convention as the yRegisterHub
     * method. This method is useful to verify the authentication parameters for a hub. It
     * is possible to force this method to return after mstimeout milliseconds.
     *
     * @param url : a string containing either "usb","callback" or the
     *         root URL of the hub to monitor
     * @param mstimeout : the number of millisecond available to test the connection.
     * @param errmsg : a string passed by reference to receive any error message.
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure returns a negative error code.
     */
    async TestHub(url: string, mstimeout: number, errmsg: YErrorMsg): Promise<number>
    {
        let urlInfo: _YY_UrlInfo = new _YY_UrlInfo(url);
        let hub: YGenericHub | null = this.imm_getHub(urlInfo);
        if (!hub) {
            if (this._logLevel >= 4) {
                this.imm_log('Testing new hub: ' + urlInfo.imm_getRootUrl());
            }
            hub = new YGenericHub(this, urlInfo);
            if (!hub) {
                return this.imm_setErr(errmsg, YAPI_NOT_SUPPORTED, 'Unsupported hub protocol: ' + urlInfo.imm_getProto(), YAPI_NOT_SUPPORTED);
            }
        } else {
            if (this._logLevel >= 4) {
                this.imm_log('Testing existing hub: ' + hub.imm_getRootUrl());
            }
        }
        await hub.attach(Y_YHubConnType.HUB_CONNECTED);
        let sub_errmsg = new YErrorMsg();
        let retcode = await hub.waitForConnection(mstimeout, sub_errmsg);
        if (retcode != YAPI_SUCCESS) {
            return this.imm_setErr(errmsg, retcode, sub_errmsg.msg, retcode);
        }
        return YAPI_SUCCESS;
    }

    /**
     * Triggers a (re)detection of connected Yoctopuce modules.
     * The library searches the machines or USB ports previously registered using
     * yRegisterHub(), and invokes any user-defined callback function
     * in case a change in the list of connected devices is detected.
     *
     * This function can be called as frequently as desired to refresh the device list
     * and to make the application aware of hot-plug events. However, since device
     * detection is quite a heavy process, UpdateDeviceList shouldn't be called more
     * than once every two seconds.
     *
     * @param errmsg : a string passed by reference to receive any error message.
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure returns a negative error code.
     */
    async UpdateDeviceList(errmsg: YErrorMsg | null = null): Promise<number>
    {
        let yreq = await this._updateDeviceList_internal(false, true);
        if (yreq.errorType !== YAPI_SUCCESS) {
            return this.imm_setErr(errmsg, yreq.errorType, yreq.errorMsg, yreq.errorType);
        }
        return YAPI_SUCCESS;
    }

    async _hubDiscoveryCallback_internal(serial: string, urlToRegister: string | null, urlToUnregister: string | null): Promise<void>
    {
        if (this._hubDiscoveryCallback && urlToRegister) {
            try {
                await this._hubDiscoveryCallback(serial, urlToRegister, urlToUnregister);
            } catch (e) {
                this.imm_log('Exception in hub discovery callback:', e);
            }
        }
        if ((this._detectType & Y_DETECT_NET) !== 0) {
            if (urlToRegister) {
                if (urlToUnregister) {
                    await this.UnregisterHub(urlToUnregister);
                }
                await this.PreregisterHub(urlToRegister, new YErrorMsg());
            }
        }
    }

    /**
     * Force a hub discovery, if a callback as been registered with yRegisterHubDiscoveryCallback it
     * will be called for each net work hub that will respond to the discovery.
     *
     * @param errmsg : a string passed by reference to receive any error message.
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *         On failure returns a negative error code.
     */
    async TriggerHubDiscovery(errmsg: YErrorMsg | null = null): Promise<number>
    {
        if (!this._ssdpManager) {
            this._ssdpManager = this.system_env.getSSDPManager(this);
            if (!this._ssdpManager) return this._lastErrorType;
            await this._ssdpManager.ySSDPStart((serial: string, newUrl: string | null, oldUrl: string | null): void => {
                this._hubDiscoveryCallback_internal(serial, newUrl, oldUrl);
            });
        } else {
            await this._ssdpManager.ySSDPDiscover();
        }
        return YAPI_SUCCESS;
    }

    /**
     * Maintains the device-to-library communication channel.
     * If your program includes significant loops, you may want to include
     * a call to this function to make sure that the library takes care of
     * the information pushed by the modules on the communication channels.
     * This is not strictly necessary, but it may improve the reactivity
     * of the library for the following commands.
     *
     * This function may signal an error in case there is a communication problem
     * while contacting a module.
     *
     * @param errmsg : a string passed by reference to receive any error message.
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure returns a negative error code.
     */
    async HandleEvents(errmsg: YErrorMsg | null = null): Promise<number>
    {
        // In Typescript, value change callbacks and timed reports don't need HandleEvents
        // (the impact of queuing on performance was too big, and delayed processing could
        //  cause severe issues when a browser window is "inactive")
        return YAPI_SUCCESS;
    }

    /**
     * Pauses the execution flow for a specified duration.
     * This function implements a passive waiting loop, meaning that it does not
     * consume CPU cycles significantly. The processor is left available for
     * other threads and processes. During the pause, the library nevertheless
     * reads from time to time information from the Yoctopuce modules by
     * calling yHandleEvents(), in order to stay up-to-date.
     *
     * This function may signal an error in case there is a communication problem
     * while contacting a module.
     *
     * @param ms_duration : an integer corresponding to the duration of the pause,
     *         in milliseconds.
     * @param errmsg : a string passed by reference to receive any error message.
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure returns a negative error code.
     */
    async Sleep(ms_duration: number, errmsg: YErrorMsg | null = null): Promise<number>
    {
        // In Typescript, value change callbacks and timed reports don't need HandleEvents
        // (the impact of queuing on performance was too big, and delayed processing could
        //  cause severe issues when a browser window is "inactive")
        let end: number = this.GetTickCount() + ms_duration;
        let remaining: number = ms_duration;
        while (remaining > 0) {
            let waitTime: number = Math.min(remaining, 25);
            await new Promise<void>((resolve, reject): void => { setTimeout(resolve, waitTime); });
            remaining = end - this.GetTickCount();
        }
        return YAPI_SUCCESS;
    }

    // internal async function to wait for a very short period
    _microSleep_internal(): Promise<void>
    {
        return new Promise<void>(function (resolve, reject): void {
            //noinspection DynamicallyGeneratedCodeJS
            setTimeout(resolve, 3);
        });
    }

    /**
     * Invoke the specified callback function after a given timeout.
     * This function behaves more or less like Javascript setTimeout,
     * but during the waiting time, it will call yHandleEvents
     * and yUpdateDeviceList periodically, in order to
     * keep the API up-to-date with current devices.
     *
     * @param callback : the function to call after the timeout occurs.
     *         On Microsoft Internet Explorer, the callback must
     *         be provided as a string to be evaluated.
     * @param ms_timeout : an integer corresponding to the duration of the
     *         timeout, in milliseconds.
     * @param args : additional arguments to be passed to the
     *         callback function can be provided, if needed
     *         (not supported on Microsoft Internet Explorer).
     *
     * @return YAPI.SUCCESS
     */
    SetTimeout(callback: Function, ms_timeout: number, args?: any): number
    {
        // - In Typescript, value change callbacks and timed reports don't need HandleEvents
        //   (the impact of queuing on performance was too big, and delayed processing could
        //    cause severe issues when a browser window is "inactive")
        // - The use of the true setTimeout function cause less stacking of async contexts
        //   than nesting setTimeout_internal calls directly as done before
        let endtime: number = this.GetTickCount() + ms_timeout;
        let setTimeout_internal = async (): Promise<void> => {
            let delay = endtime - this.GetTickCount();
            if (delay < 40) {
                // very short wait, use a single setTimeout call if needed
                if (delay > 3) {
                    await new Promise<void>((resolve, reject): void => { setTimeout(resolve, delay); });
                }
                // then invoke callback immediately
                callback.apply(null, args);
            } else {
                if (delay >= 150) {
                    // 150ms or more, call updateDeviceList with ~100ms interval
                    await this.UpdateDeviceList();
                    delay = Math.min(endtime - YAPI.GetTickCount(), 110);
                }
                await this.Sleep(delay - 20);
                setTimeout_internal();
            }
        };
        setTimeout_internal();
        return YAPI_SUCCESS;
    }

    /**
     * Returns the current value of a monotone millisecond-based time counter.
     * This counter can be used to compute delays in relation with
     * Yoctopuce devices, which also uses the millisecond as timebase.
     *
     * @return a long integer corresponding to the millisecond counter.
     */
    GetTickCount(): number
    {
        return Date.now();
    }

    imm_CheckLogicalName(name: string): boolean
    {
        if (name == '') return true;
        if (!name) return false;
        if (name.length > 19) return false;
        return /^[A-Za-z0-9_\-]*$/.test(name);
    }

    /**
     * Checks if a given string is valid as logical name for a module or a function.
     * A valid logical name has a maximum of 19 characters, all among
     * A..Z, a..z, 0..9, _, and -.
     * If you try to configure a logical name with an incorrect string,
     * the invalid characters are ignored.
     *
     * @param name : a string containing the name to check.
     *
     * @return true if the name is valid, false otherwise.
     */
    async CheckLogicalName(name: string): Promise<boolean>

    {
        return this.imm_CheckLogicalName(name);
    }

    /**
     * Register a callback function, to be called each time
     * a device is plugged. This callback will be invoked while yUpdateDeviceList
     * is running. You will have to call this function on a regular basis.
     *
     * @param arrivalCallback : a procedure taking a YModule parameter, or null
     *         to unregister a previously registered  callback.
     */
    async RegisterDeviceArrivalCallback(arrivalCallback: YDeviceUpdateCallback | null): Promise<void>
    {
        this._arrivalCallback = arrivalCallback;
    }

    async RegisterDeviceChangeCallback(changeCallback: YDeviceUpdateCallback | null): Promise<void>
    {
        this._namechgCallback = changeCallback;
    }

    /**
     * Register a callback function, to be called each time
     * a device is unplugged. This callback will be invoked while yUpdateDeviceList
     * is running. You will have to call this function on a regular basis.
     *
     * @param removalCallback : a procedure taking a YModule parameter, or null
     *         to unregister a previously registered  callback.
     */
    async RegisterDeviceRemovalCallback(removalCallback: YDeviceUpdateCallback | null): Promise<void>
    {
        this._removalCallback = removalCallback;
    }

    /**
     * Register a callback function, to be called each time an Network Hub send
     * an SSDP message. The callback has two string parameter, the first one
     * contain the serial number of the hub and the second contain the URL of the
     * network hub (this URL can be passed to RegisterHub). This callback will be invoked
     * while yUpdateDeviceList is running. You will have to call this function on a regular basis.
     *
     * @param hubDiscoveryCallback : a procedure taking two string parameter, the serial
     *         number and the hub URL. Use null to unregister a previously registered  callback.
     */
    async RegisterHubDiscoveryCallback(hubDiscoveryCallback: YHubDiscoveryCallback): Promise<number>
    {
        if (!this.system_env.hasSSDP) {
            return this._throw(YAPI_NOT_SUPPORTED, 'Hub discovery is not supported in this environment', YAPI_NOT_SUPPORTED);
        }
        this._hubDiscoveryCallback = hubDiscoveryCallback;
        return this.TriggerHubDiscovery();
    }

    // Register a new value calibration handler for a given calibration type
    //
    async RegisterCalibrationHandler(calibrationType: number, calibrationHandler: yCalibrationHandler): Promise<void>
    {
        this._calibHandlers[calibrationType] = calibrationHandler;
    }

    // Standard value calibration handler (n-point linear error correction)
    //
    LinearCalibrationHandler(float_rawValue: number, int_calibType: number, arr_calibParams: number[], arr_calibRawValues: number[], arr_calibRefValues: number[]): number
    {
        // calibration types n=1..10 and 11..20 are meant for linear calibration using n points
        let npt;
        let x = arr_calibRawValues[0];
        let adj = arr_calibRefValues[0] - x;
        let i = 0;

        if (int_calibType < YOCTO_CALIB_TYPE_OFS) {
            npt = Math.min(int_calibType % 10, arr_calibRawValues.length, arr_calibRefValues.length);
        } else {
            npt = arr_calibRefValues.length;
        }
        while (float_rawValue > arr_calibRawValues[i] && ++i < npt) {
            let x2 = x;
            let adj2 = adj;

            x = arr_calibRawValues[i];
            adj = arr_calibRefValues[i] - x;

            if (float_rawValue < x && x > x2) {
                adj = adj2 + (adj - adj2) * (float_rawValue - x2) / (x - x2);
            }
        }
        return float_rawValue + adj;
    }

    /**
     * Compute the MD5 digest for a given ASCII string
     *
     * @param text {string} : the ASCII string to hash
     *
     * @return {Uint8Array} the 16-bytes MD5 hash key
     */
    imm_yMD5(text: string): Uint8Array
    {
        let ctx = new Y_MD5Ctx();
        ctx.addData(this.imm_str2bin(text));
        return ctx.calculate();
    }

    // SHA1 and WPA preshared-key computation
    //
    imm_initshaw(str_s: string, int_ofs: number, int_pad: number, int_xinit: number, _shaw: Uint32Array): void
    {
        let ii: number;
        let j: number = -1;
        let k: number = 0;
        let n: number = str_s.length;

        for (ii = 0; ii < 64; ii++) {
            let i = int_ofs + ii;
            let c = 0;
            if (i < n) {
                c = str_s.charCodeAt(i);
            } else if (int_pad != 0) {
                if ((int_pad & 0x80) != 0) {
                    if (i == n) c = int_pad;
                } else {
                    if (i == n + 3) {
                        c = int_pad;
                    } else if (i == n + 4) c = 0x80;
                }
            }
            if (k == 0) {
                j++;
                _shaw[j] = 0;
                k = 32;
            }
            k -= 8;
            _shaw[j] |= (c << k);
        }
        if (int_pad != 0) {
            if (int_pad == 0x80) {
                if (n <= int_ofs + 55) {
                    _shaw[15] = 8 * n;
                }
            } else {
                _shaw[15] = 8 * (64 + n + 4);
            }
        }
        if (int_xinit != 0) {
            let xdw = (int_xinit << 16) | int_xinit;
            for (j = 0; j < 16; j++) {
                _shaw[j] ^= xdw;
            }
        }
    }

    imm_itershaw(s: number[], _shaw: Uint32Array): void
    {
        let a, b, c, d, e, t, k;

        a = s[0];
        b = s[1];
        c = s[2];
        d = s[3];
        e = s[4];
        for (k = 16; k < 80; k++) {
            t = _shaw[k - 3] ^ _shaw[k - 8] ^ _shaw[k - 14] ^ _shaw[k - 16];
            _shaw[k] = (t << 1) | (t >>> 31);
        }
        for (k = 0; k < 20; k++) {
            t = ((a << 5) | (a >>> 27)) + e + _shaw[k] + 0x5A827999 + ((b & c) | ((~b) & d));
            e = d;
            d = c;
            c = (b << 30) | (b >>> 2);
            b = a;
            a = t & 0xffffffff;
        }
        for (k = 20; k < 40; k++) {
            t = ((a << 5) | (a >>> 27)) + e + _shaw[k] + 0x6ED9EBA1 + (b ^ c ^ d);
            e = d;
            d = c;
            c = (b << 30) | (b >>> 2);
            b = a;
            a = t & 0xffffffff;
        }
        for (k = 40; k < 60; k++) {
            t = ((a << 5) | (a >>> 27)) + e + _shaw[k] + 0x8F1BBCDC + ((b & c) | (b & d) | (c & d));
            e = d;
            d = c;
            c = (b << 30) | (b >>> 2);
            b = a;
            a = t & 0xffffffff;
        }
        for (k = 60; k < 80; k++) {
            t = ((a << 5) | (a >>> 27)) + e + _shaw[k] + 0xCA62C1D6 + (b ^ c ^ d);
            e = d;
            d = c;
            c = (b << 30) | (b >>> 2);
            b = a;
            a = t & 0xffffffff;
        }
        _shaw[0] = (s[0] + a) & 0xffffffff;
        _shaw[1] = (s[1] + b) & 0xffffffff;
        _shaw[2] = (s[2] + c) & 0xffffffff;
        _shaw[3] = (s[3] + d) & 0xffffffff;
        _shaw[4] = (s[4] + e) & 0xffffffff;
    }

    /**
     * Compute the SHA1 digest for a given ASCII string
     *
     * @param text {string} : the ASCII string to hash
     *
     * @return {Uint8Array} the 20-bytes SHA1 hash key
     */
    imm_ySHA1(text: string): Uint8Array
    {
        let shau: number[] = [0x67452301, 0xEFCDAB89, 0x98BADCFE, 0x10325476, 0xC3D2E1F0];
        let i, ofs = 0;
        let n = text.length;

        let _shaw = new Uint32Array(80);
        do {
            this.imm_initshaw(text, ofs, 0x80, 0, _shaw);
            this.imm_itershaw(shau, _shaw);
            for (i = 0; i < 5; i++) {
                shau[i] = _shaw[i];
            }
            ofs += 64;
        } while (n > ofs - 9);
        let res = new Uint8Array(20);
        for (i = 0; i < 20; i++) {
            res[i] = (shau[i >>> 2] >>> (24 - 8 * (i & 3))) & 0xff;
        }
        return res;
    }

    /**
     * Compute the WPA Preshared key for a given SSID and passphrase
     *
     * @param ssid {string} : the access point SSID
     * @param pass {string} : the access point WPA/WPA2 passphrase
     *
     * @return {string} an hexadecimal string for the preshared key
     */
    async ComputePSK(ssid: string, pass: string): Promise<string>
    {
        let sha1_init = [0x67452301, 0xEFCDAB89, 0x98BADCFE, 0x10325476, 0xC3D2E1F0];
        let inner = [], outer = [], shau = [], res = [];
        let iter, pos, k, _shaw;

        // precompute part of sha used in the loops
        _shaw = new Uint32Array(80);
        this.imm_initshaw(pass, 0, 0, 0x3636, _shaw);
        this.imm_itershaw(sha1_init, _shaw);
        for (k = 0; k < 5; k++) {
            inner[k] = _shaw[k];
        }
        _shaw = new Uint32Array(80);
        this.imm_initshaw(pass, 0, 0, 0x5c5c, _shaw);
        this.imm_itershaw(sha1_init, _shaw);
        for (k = 0; k < 5; k++) {
            outer[k] = _shaw[k];
        }

        // prepare to compute first 20 bytes
        pos = 0;
        for (k = 0; k < 5; k++) {
            shau[k] = 0;
        }
        _shaw = new Uint32Array(80);
        this.imm_initshaw(ssid, 0, 1, 0, _shaw);

        for (iter = 0; iter < 8192;) {
            this.imm_itershaw(inner, _shaw);
            _shaw[5] = 0x80000000;
            for (k = 6; k < 15; k++) {
                _shaw[k] = 0;
            }
            _shaw[15] = 8 * (64 + 20);
            this.imm_itershaw(outer, _shaw);
            shau[0] ^= _shaw[0];
            shau[1] ^= _shaw[1];
            shau[2] ^= _shaw[2];
            shau[3] ^= _shaw[3];
            shau[4] ^= _shaw[4];
            iter++;
            // after 4096 loops, move to 2nd half of sha1
            if ((iter & 4095) == 0) {
                for (k = 0; k < 5 && pos < 32; k++) {
                    res[pos++] = (shau[k] >>> 24) & 0xff;
                    res[pos++] = (shau[k] >>> 16) & 0xff;
                    res[pos++] = (shau[k] >>> 8) & 0xff;
                    res[pos++] = shau[k] & 0xff;
                }
                if (iter == 4096) {
                    for (k = 0; k < 5; k++) {
                        shau[k] = 0;
                    }
                    _shaw = new Uint32Array(80);
                    this.imm_initshaw(ssid, 0, 2, 0, _shaw);
                }
            }
        }
        let hex = '';
        for (k = 0; k < 32; k++) {
            hex += ('0' + Number(res[k]).toString(16)).slice(-2);
        }
        return hex;
    }

    private nextHubInUseInternal_internal(hubref: number): YHub | null
    {
        let nextref: number = hubref < 0 ? 0 : hubref + 1;
        let restart: boolean;
        let has_higher_hubref: boolean;
        do {
            has_higher_hubref = false;
            restart = false;
            for (let url in this._knownHubsByUrl) {
                let hub = this._knownHubsByUrl[url];
                let hubRef = hub.getHubRef();
                if (hubRef == nextref) {
                    if (hub.imm_isPreOrRegistered()) {
                        return this.getYHubObj(nextref);
                    } else {
                        has_higher_hubref = true;
                        break;
                    }
                } else if (hubRef > nextref) {
                    has_higher_hubref = true;
                }
            }
            if (has_higher_hubref) {
                nextref++;
                restart = true;
            }
        } while (restart);
        return null;
    }
    getGenHub(hubref: number): YGenericHub | null
    {
        for (let url in this._knownHubsByUrl) {
            let hub = this._knownHubsByUrl[url];
            if (hub.getHubRef() == hubref && hub.imm_isPreOrRegistered()) {
                return hub;
            }
        }
        return null;
    }

    private _findYHubFromCache(hubref: number): YHub | null
    {
        return this._yhub_cache[hubref];
    }
    private _addYHubToCache(hubref: number, obj: YHub): void
    {
        this._yhub_cache[hubref] = obj;
    }

}

// eslint-disable-next-line no-var
export var YAPI = new YAPIContext();
