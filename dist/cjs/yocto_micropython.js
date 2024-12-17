"use strict";
/*********************************************************************
 *
 *  $Id: svn_id $
 *
 *  Implements the high-level API for MicroPython functions
 *
 *  - - - - - - - - - License information: - - - - - - - - -
 *
 *  Copyright (C) 2011 and beyond by Yoctopuce Sarl, Switzerland.
 *
 *  Yoctopuce Sarl (hereafter Licensor) grants to you a perpetual
 *  non-exclusive license to use, modify, copy and integrate this
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
 *  THE SOFTWARE AND DOCUMENTATION ARE PROVIDED 'AS IS' WITHOUT
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.YMicroPython = void 0;
const yocto_api_js_1 = require("./yocto_api.js");
//--- (YMicroPython class start)
/**
 * YMicroPython Class: MicroPython interpreter control interface
 *
 * The YMicroPython class provides control of the MicroPython interpreter
 * that can be found on some Yoctopuce devices.
 */
//--- (end of YMicroPython class start)
class YMicroPython extends yocto_api_js_1.YFunction {
    //--- (end of YMicroPython attributes declaration)
    constructor(yapi, func) {
        //--- (YMicroPython constructor)
        super(yapi, func);
        this._lastMsg = YMicroPython.LASTMSG_INVALID;
        this._heapUsage = YMicroPython.HEAPUSAGE_INVALID;
        this._xheapUsage = YMicroPython.XHEAPUSAGE_INVALID;
        this._currentScript = YMicroPython.CURRENTSCRIPT_INVALID;
        this._startupScript = YMicroPython.STARTUPSCRIPT_INVALID;
        this._debugMode = YMicroPython.DEBUGMODE_INVALID;
        this._command = YMicroPython.COMMAND_INVALID;
        this._valueCallbackMicroPython = null;
        this._logCallback = null;
        this._isFirstCb = false;
        this._prevCbPos = 0;
        this._logPos = 0;
        this._prevPartialLog = '';
        // API symbols as object properties
        this.LASTMSG_INVALID = yocto_api_js_1.YAPI.INVALID_STRING;
        this.HEAPUSAGE_INVALID = yocto_api_js_1.YAPI.INVALID_UINT;
        this.XHEAPUSAGE_INVALID = yocto_api_js_1.YAPI.INVALID_UINT;
        this.CURRENTSCRIPT_INVALID = yocto_api_js_1.YAPI.INVALID_STRING;
        this.STARTUPSCRIPT_INVALID = yocto_api_js_1.YAPI.INVALID_STRING;
        this.DEBUGMODE_OFF = 0;
        this.DEBUGMODE_ON = 1;
        this.DEBUGMODE_INVALID = -1;
        this.COMMAND_INVALID = yocto_api_js_1.YAPI.INVALID_STRING;
        this._className = 'MicroPython';
        //--- (end of YMicroPython constructor)
    }
    //--- (YMicroPython implementation)
    imm_parseAttr(name, val) {
        switch (name) {
            case 'lastMsg':
                this._lastMsg = val;
                return 1;
            case 'heapUsage':
                this._heapUsage = val;
                return 1;
            case 'xheapUsage':
                this._xheapUsage = val;
                return 1;
            case 'currentScript':
                this._currentScript = val;
                return 1;
            case 'startupScript':
                this._startupScript = val;
                return 1;
            case 'debugMode':
                this._debugMode = val;
                return 1;
            case 'command':
                this._command = val;
                return 1;
        }
        return super.imm_parseAttr(name, val);
    }
    async _internalEventCallback(YMicroPython_obj, str_value) {
        await YMicroPython_obj._internalEventHandler(str_value);
    }
    /**
     * Returns the last message produced by a python script.
     *
     * @return a string corresponding to the last message produced by a python script
     *
     * On failure, throws an exception or returns YMicroPython.LASTMSG_INVALID.
     */
    async get_lastMsg() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YMicroPython.LASTMSG_INVALID;
            }
        }
        res = this._lastMsg;
        return res;
    }
    /**
     * Returns the percentage of micropython main memory in use,
     * as observed at the end of the last garbage collection.
     *
     * @return an integer corresponding to the percentage of micropython main memory in use,
     *         as observed at the end of the last garbage collection
     *
     * On failure, throws an exception or returns YMicroPython.HEAPUSAGE_INVALID.
     */
    async get_heapUsage() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YMicroPython.HEAPUSAGE_INVALID;
            }
        }
        res = this._heapUsage;
        return res;
    }
    /**
     * Returns the percentage of micropython external memory in use,
     * as observed at the end of the last garbage collection.
     *
     * @return an integer corresponding to the percentage of micropython external memory in use,
     *         as observed at the end of the last garbage collection
     *
     * On failure, throws an exception or returns YMicroPython.XHEAPUSAGE_INVALID.
     */
    async get_xheapUsage() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YMicroPython.XHEAPUSAGE_INVALID;
            }
        }
        res = this._xheapUsage;
        return res;
    }
    /**
     * Returns the name of currently active script, if any.
     *
     * @return a string corresponding to the name of currently active script, if any
     *
     * On failure, throws an exception or returns YMicroPython.CURRENTSCRIPT_INVALID.
     */
    async get_currentScript() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YMicroPython.CURRENTSCRIPT_INVALID;
            }
        }
        res = this._currentScript;
        return res;
    }
    /**
     * Stops current running script, and/or selects a script to run immediately in a
     * fresh new environment. If the MicroPython interpreter is busy running a script,
     * this function will abort it immediately and reset the execution environment.
     * If a non-empty string is given as argument, the new script will be started.
     *
     * @param newval : a string
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_currentScript(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('currentScript', rest_val);
    }
    /**
     * Returns the name of the script to run when the device is powered on.
     *
     * @return a string corresponding to the name of the script to run when the device is powered on
     *
     * On failure, throws an exception or returns YMicroPython.STARTUPSCRIPT_INVALID.
     */
    async get_startupScript() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YMicroPython.STARTUPSCRIPT_INVALID;
            }
        }
        res = this._startupScript;
        return res;
    }
    /**
     * Changes the script to run when the device is powered on.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : a string corresponding to the script to run when the device is powered on
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_startupScript(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('startupScript', rest_val);
    }
    /**
     * Returns the activation state of micropython debugging interface.
     *
     * @return either YMicroPython.DEBUGMODE_OFF or YMicroPython.DEBUGMODE_ON, according to the activation
     * state of micropython debugging interface
     *
     * On failure, throws an exception or returns YMicroPython.DEBUGMODE_INVALID.
     */
    async get_debugMode() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YMicroPython.DEBUGMODE_INVALID;
            }
        }
        res = this._debugMode;
        return res;
    }
    /**
     * Changes the activation state of micropython debugging interface.
     *
     * @param newval : either YMicroPython.DEBUGMODE_OFF or YMicroPython.DEBUGMODE_ON, according to the
     * activation state of micropython debugging interface
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_debugMode(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('debugMode', rest_val);
    }
    async get_command() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YMicroPython.COMMAND_INVALID;
            }
        }
        res = this._command;
        return res;
    }
    async set_command(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('command', rest_val);
    }
    /**
     * Retrieves a MicroPython interpreter for a given identifier.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the MicroPython interpreter is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YMicroPython.isOnline() to test if the MicroPython interpreter is
     * indeed online at a given time. In case of ambiguity when looking for
     * a MicroPython interpreter by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the MicroPython interpreter, for instance
     *         MyDevice.microPython.
     *
     * @return a YMicroPython object allowing you to drive the MicroPython interpreter.
     */
    static FindMicroPython(func) {
        let obj;
        obj = yocto_api_js_1.YFunction._FindFromCache('MicroPython', func);
        if (obj == null) {
            obj = new YMicroPython(yocto_api_js_1.YAPI, func);
            yocto_api_js_1.YFunction._AddToCache('MicroPython', func, obj);
        }
        return obj;
    }
    /**
     * Retrieves a MicroPython interpreter for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the MicroPython interpreter is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YMicroPython.isOnline() to test if the MicroPython interpreter is
     * indeed online at a given time. In case of ambiguity when looking for
     * a MicroPython interpreter by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx : a YAPI context
     * @param func : a string that uniquely characterizes the MicroPython interpreter, for instance
     *         MyDevice.microPython.
     *
     * @return a YMicroPython object allowing you to drive the MicroPython interpreter.
     */
    static FindMicroPythonInContext(yctx, func) {
        let obj;
        obj = yocto_api_js_1.YFunction._FindFromCacheInContext(yctx, 'MicroPython', func);
        if (obj == null) {
            obj = new YMicroPython(yctx, func);
            yocto_api_js_1.YFunction._AddToCache('MicroPython', func, obj);
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
    async registerValueCallback(callback) {
        let val;
        if (callback != null) {
            await yocto_api_js_1.YFunction._UpdateValueCallbackList(this, true);
        }
        else {
            await yocto_api_js_1.YFunction._UpdateValueCallbackList(this, false);
        }
        this._valueCallbackMicroPython = callback;
        // Immediately invoke value callback with current value
        if (callback != null && await this.isOnline()) {
            val = this._advertisedValue;
            if (!(val == '')) {
                await this._invokeValueCallback(val);
            }
        }
        return 0;
    }
    async _invokeValueCallback(value) {
        if (this._valueCallbackMicroPython != null) {
            try {
                await this._valueCallbackMicroPython(this, value);
            }
            catch (e) {
                this._yapi.imm_log('Exception in valueCallback:', e);
            }
        }
        else {
            await super._invokeValueCallback(value);
        }
        return 0;
    }
    /**
     * Submit MicroPython code for execution in the interpreter.
     * If the MicroPython interpreter is busy, this function will
     * block until it becomes available. The code is then uploaded,
     * compiled and executed on the fly, without beeing stored on the device filesystem.
     *
     * There is no implicit reset of the MicroPython interpreter with
     * this function. Use method reset() if you need to start
     * from a fresh environment to run your code.
     *
     * Note that although MicroPython is mostly compatible with recent Python 3.x
     * interpreters, the limited ressources on the device impose some restrictions,
     * in particular regarding the libraries that can be used. Please refer to
     * the documentation for more details.
     *
     * @param codeName : name of the code file (used for error reporting only)
     * @param mpyCode : MicroPython code to compile and execute
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async eval(codeName, mpyCode) {
        let fullname;
        let res;
        fullname = 'mpy:' + codeName;
        res = await this._upload(fullname, this._yapi.imm_str2bin(mpyCode));
        return res;
    }
    /**
     * Stops current execution, and reset the MicroPython interpreter to initial state.
     * All global variables are cleared, and all imports are forgotten.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async reset() {
        let res;
        let state;
        res = await this.set_command('Z');
        if (!(res == this._yapi.SUCCESS)) {
            return this._throw(this._yapi.IO_ERROR, 'unable to trigger MicroPython reset', this._yapi.IO_ERROR);
        }
        // Wait until the reset is effective
        state = (await this.get_advertisedValue()).substr(0, 1);
        while (!(state == 'z')) {
            await yocto_api_js_1.YAPI.Sleep(50);
            state = (await this.get_advertisedValue()).substr(0, 1);
        }
        return this._yapi.SUCCESS;
    }
    /**
     * Returns a string with last logs of the MicroPython interpreter.
     * This method return only logs that are still in the module.
     *
     * @return a string with last MicroPython logs.
     *         On failure, throws an exception or returns  YAPI.INVALID_STRING.
     */
    async get_lastLogs() {
        let buff;
        let bufflen;
        let res;
        buff = await this._download('mpy.txt');
        bufflen = (buff).length - 1;
        while ((bufflen > 0) && (buff[bufflen] != 64)) {
            bufflen = bufflen - 1;
        }
        res = (this._yapi.imm_bin2str(buff)).substr(0, bufflen);
        return res;
    }
    /**
     * Registers a device log callback function. This callback will be called each time
     * microPython sends a new log message.
     *
     * @param callback : the callback function to invoke, or a null pointer.
     *         The callback function should take two arguments:
     *         the module object that emitted the log message,
     *         and the character string containing the log.
     *         On failure, throws an exception or returns a negative error code.
     */
    async registerLogCallback(callback) {
        let serial;
        serial = await this.get_serialNumber();
        if (serial == this._yapi.INVALID_STRING) {
            return this._yapi.DEVICE_NOT_FOUND;
        }
        this._logCallback = callback;
        this._isFirstCb = true;
        if (callback != null) {
            await this.registerValueCallback(this._internalEventCallback);
        }
        else {
            await this.registerValueCallback(null);
        }
        return 0;
    }
    async get_logCallback() {
        return this._logCallback;
    }
    async _internalEventHandler(cbVal) {
        let cbPos;
        let cbDPos;
        let url;
        let content;
        let endPos;
        let contentStr;
        let msgArr = [];
        let arrLen;
        let lenStr;
        let arrPos;
        let logMsg;
        // detect possible power cycle of the reader to clear event pointer
        cbPos = parseInt(cbVal.substr(1, (cbVal).length - 1), 16);
        cbDPos = ((cbPos - this._prevCbPos) & 0xfffff);
        this._prevCbPos = cbPos;
        if (cbDPos > 65536) {
            this._logPos = 0;
        }
        if (!(this._logCallback != null)) {
            return this._yapi.SUCCESS;
        }
        if (this._isFirstCb) {
            // use first emulated value callback caused by registerValueCallback:
            // to retrieve current logs position
            this._logPos = 0;
            this._prevPartialLog = '';
            url = 'mpy.txt';
        }
        else {
            // load all messages since previous call
            url = 'mpy.txt?pos=' + String(Math.round(this._logPos));
        }
        content = await this._download(url);
        contentStr = this._yapi.imm_bin2str(content);
        // look for new position indicator at end of logs
        endPos = (content).length - 1;
        while ((endPos >= 0) && (content[endPos] != 64)) {
            endPos = endPos - 1;
        }
        if (!(endPos > 0)) {
            return this._throw(this._yapi.IO_ERROR, 'fail to download micropython logs', this._yapi.IO_ERROR);
        }
        lenStr = contentStr.substr(endPos + 1, (contentStr).length - (endPos + 1));
        // update processed event position pointer
        this._logPos = yocto_api_js_1.YAPIContext.imm_atoi(lenStr);
        if (this._isFirstCb) {
            // don't generate callbacks log messages before call to registerLogCallback
            this._isFirstCb = false;
            return this._yapi.SUCCESS;
        }
        // now generate callbacks for each complete log line
        endPos = endPos - 1;
        if (!(content[endPos] == 10)) {
            return this._throw(this._yapi.IO_ERROR, 'fail to download micropython logs', this._yapi.IO_ERROR);
        }
        contentStr = contentStr.substr(0, endPos);
        msgArr = (contentStr).split('\n');
        arrLen = msgArr.length - 1;
        if (arrLen > 0) {
            logMsg = this._prevPartialLog + '' + msgArr[0];
            if (this._logCallback != null) {
                try {
                    await this._logCallback(this, logMsg);
                }
                catch (e) {
                    this._yapi.imm_log('Exception in logCallback:', e);
                }
            }
            this._prevPartialLog = '';
            arrPos = 1;
            while (arrPos < arrLen) {
                logMsg = msgArr[arrPos];
                if (this._logCallback != null) {
                    try {
                        await this._logCallback(this, logMsg);
                    }
                    catch (e) {
                        this._yapi.imm_log('Exception in logCallback:', e);
                    }
                }
                arrPos = arrPos + 1;
            }
        }
        this._prevPartialLog = this._prevPartialLog + '' + msgArr[arrLen];
        return this._yapi.SUCCESS;
    }
    /**
     * Continues the enumeration of MicroPython interpreters started using yFirstMicroPython().
     * Caution: You can't make any assumption about the returned MicroPython interpreters order.
     * If you want to find a specific a MicroPython interpreter, use MicroPython.findMicroPython()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YMicroPython object, corresponding to
     *         a MicroPython interpreter currently online, or a null pointer
     *         if there are no more MicroPython interpreters to enumerate.
     */
    nextMicroPython() {
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != yocto_api_js_1.YAPI.SUCCESS)
            return null;
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if (next_hwid == null)
            return null;
        return YMicroPython.FindMicroPythonInContext(this._yapi, next_hwid);
    }
    /**
     * Starts the enumeration of MicroPython interpreters currently accessible.
     * Use the method YMicroPython.nextMicroPython() to iterate on
     * next MicroPython interpreters.
     *
     * @return a pointer to a YMicroPython object, corresponding to
     *         the first MicroPython interpreter currently online, or a null pointer
     *         if there are none.
     */
    static FirstMicroPython() {
        let next_hwid = yocto_api_js_1.YAPI.imm_getFirstHardwareId('MicroPython');
        if (next_hwid == null)
            return null;
        return YMicroPython.FindMicroPython(next_hwid);
    }
    /**
     * Starts the enumeration of MicroPython interpreters currently accessible.
     * Use the method YMicroPython.nextMicroPython() to iterate on
     * next MicroPython interpreters.
     *
     * @param yctx : a YAPI context.
     *
     * @return a pointer to a YMicroPython object, corresponding to
     *         the first MicroPython interpreter currently online, or a null pointer
     *         if there are none.
     */
    static FirstMicroPythonInContext(yctx) {
        let next_hwid = yctx.imm_getFirstHardwareId('MicroPython');
        if (next_hwid == null)
            return null;
        return YMicroPython.FindMicroPythonInContext(yctx, next_hwid);
    }
}
exports.YMicroPython = YMicroPython;
// API symbols as static members
YMicroPython.LASTMSG_INVALID = yocto_api_js_1.YAPI.INVALID_STRING;
YMicroPython.HEAPUSAGE_INVALID = yocto_api_js_1.YAPI.INVALID_UINT;
YMicroPython.XHEAPUSAGE_INVALID = yocto_api_js_1.YAPI.INVALID_UINT;
YMicroPython.CURRENTSCRIPT_INVALID = yocto_api_js_1.YAPI.INVALID_STRING;
YMicroPython.STARTUPSCRIPT_INVALID = yocto_api_js_1.YAPI.INVALID_STRING;
YMicroPython.DEBUGMODE_OFF = 0;
YMicroPython.DEBUGMODE_ON = 1;
YMicroPython.DEBUGMODE_INVALID = -1;
YMicroPython.COMMAND_INVALID = yocto_api_js_1.YAPI.INVALID_STRING;
//# sourceMappingURL=yocto_micropython.js.map