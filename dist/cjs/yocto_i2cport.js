"use strict";
/*********************************************************************
 *
 *  $Id: yocto_i2cport.ts 58903 2024-01-11 16:44:48Z mvuilleu $
 *
 *  Implements the high-level API for I2cSnoopingRecord functions
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
exports.YI2cPort = exports.YI2cSnoopingRecord = void 0;
const yocto_api_js_1 = require("./yocto_api.js");
//--- (generated code: YI2cSnoopingRecord class start)
/**
 * YI2cSnoopingRecord Class: Intercepted I2C message description, returned by i2cPort.snoopMessages method
 *
 *
 */
//--- (end of generated code: YI2cSnoopingRecord class start)
class YI2cSnoopingRecord {
    // API symbols as static members
    //--- (end of generated code: YI2cSnoopingRecord attributes declaration)
    constructor(str_json) {
        //--- (generated code: YI2cSnoopingRecord attributes declaration)
        this._tim = 0;
        this._pos = 0;
        this._dir = 0;
        this._msg = '';
        //--- (generated code: YI2cSnoopingRecord constructor)
        //--- (end of generated code: YI2cSnoopingRecord constructor)
        const loadval = JSON.parse(str_json);
        this._tim = loadval.t;
        this._pos = loadval.p;
        this._dir = (loadval.m[0] == '<' ? 1 : 0);
        this._msg = loadval.m.slice(1);
    }
    //--- (generated code: YI2cSnoopingRecord implementation)
    /**
     * Returns the elapsed time, in ms, since the beginning of the preceding message.
     *
     * @return the elapsed time, in ms, since the beginning of the preceding message.
     */
    get_time() {
        return this._tim;
    }
    /**
     * Returns the absolute position of the message end.
     *
     * @return the absolute position of the message end.
     */
    get_pos() {
        return this._pos;
    }
    /**
     * Returns the message direction (RX=0, TX=1).
     *
     * @return the message direction (RX=0, TX=1).
     */
    get_direction() {
        return this._dir;
    }
    /**
     * Returns the message content.
     *
     * @return the message content.
     */
    get_message() {
        return this._msg;
    }
}
exports.YI2cSnoopingRecord = YI2cSnoopingRecord;
//--- (generated code: YI2cPort class start)
/**
 * YI2cPort Class: I2C port control interface, available for instance in the Yocto-I2C
 *
 * The YI2cPort classe allows you to fully drive a Yoctopuce I2C port.
 * It can be used to send and receive data, and to configure communication
 * parameters (baud rate, etc).
 * Note that Yoctopuce I2C ports are not exposed as virtual COM ports.
 * They are meant to be used in the same way as all Yoctopuce devices.
 */
//--- (end of generated code: YI2cPort class start)
/** @extends {YFunction} **/
class YI2cPort extends yocto_api_js_1.YFunction {
    //--- (end of generated code: YI2cPort attributes declaration)
    constructor(yapi, func) {
        //--- (generated code: YI2cPort constructor)
        super(yapi, func);
        this._rxCount = YI2cPort.RXCOUNT_INVALID;
        this._txCount = YI2cPort.TXCOUNT_INVALID;
        this._errCount = YI2cPort.ERRCOUNT_INVALID;
        this._rxMsgCount = YI2cPort.RXMSGCOUNT_INVALID;
        this._txMsgCount = YI2cPort.TXMSGCOUNT_INVALID;
        this._lastMsg = YI2cPort.LASTMSG_INVALID;
        this._currentJob = YI2cPort.CURRENTJOB_INVALID;
        this._startupJob = YI2cPort.STARTUPJOB_INVALID;
        this._jobMaxTask = YI2cPort.JOBMAXTASK_INVALID;
        this._jobMaxSize = YI2cPort.JOBMAXSIZE_INVALID;
        this._command = YI2cPort.COMMAND_INVALID;
        this._protocol = YI2cPort.PROTOCOL_INVALID;
        this._i2cVoltageLevel = YI2cPort.I2CVOLTAGELEVEL_INVALID;
        this._i2cMode = YI2cPort.I2CMODE_INVALID;
        this._valueCallbackI2cPort = null;
        this._rxptr = 0;
        this._rxbuff = new Uint8Array(0);
        this._rxbuffptr = 0;
        // API symbols as object properties
        this.RXCOUNT_INVALID = yocto_api_js_1.YAPI.INVALID_UINT;
        this.TXCOUNT_INVALID = yocto_api_js_1.YAPI.INVALID_UINT;
        this.ERRCOUNT_INVALID = yocto_api_js_1.YAPI.INVALID_UINT;
        this.RXMSGCOUNT_INVALID = yocto_api_js_1.YAPI.INVALID_UINT;
        this.TXMSGCOUNT_INVALID = yocto_api_js_1.YAPI.INVALID_UINT;
        this.LASTMSG_INVALID = yocto_api_js_1.YAPI.INVALID_STRING;
        this.CURRENTJOB_INVALID = yocto_api_js_1.YAPI.INVALID_STRING;
        this.STARTUPJOB_INVALID = yocto_api_js_1.YAPI.INVALID_STRING;
        this.JOBMAXTASK_INVALID = yocto_api_js_1.YAPI.INVALID_UINT;
        this.JOBMAXSIZE_INVALID = yocto_api_js_1.YAPI.INVALID_UINT;
        this.COMMAND_INVALID = yocto_api_js_1.YAPI.INVALID_STRING;
        this.PROTOCOL_INVALID = yocto_api_js_1.YAPI.INVALID_STRING;
        this.I2CVOLTAGELEVEL_OFF = 0;
        this.I2CVOLTAGELEVEL_3V3 = 1;
        this.I2CVOLTAGELEVEL_1V8 = 2;
        this.I2CVOLTAGELEVEL_INVALID = -1;
        this.I2CMODE_INVALID = yocto_api_js_1.YAPI.INVALID_STRING;
        this._className = 'I2cPort';
        //--- (end of generated code: YI2cPort constructor)
    }
    //--- (generated code: YI2cPort implementation)
    imm_parseAttr(name, val) {
        switch (name) {
            case 'rxCount':
                this._rxCount = val;
                return 1;
            case 'txCount':
                this._txCount = val;
                return 1;
            case 'errCount':
                this._errCount = val;
                return 1;
            case 'rxMsgCount':
                this._rxMsgCount = val;
                return 1;
            case 'txMsgCount':
                this._txMsgCount = val;
                return 1;
            case 'lastMsg':
                this._lastMsg = val;
                return 1;
            case 'currentJob':
                this._currentJob = val;
                return 1;
            case 'startupJob':
                this._startupJob = val;
                return 1;
            case 'jobMaxTask':
                this._jobMaxTask = val;
                return 1;
            case 'jobMaxSize':
                this._jobMaxSize = val;
                return 1;
            case 'command':
                this._command = val;
                return 1;
            case 'protocol':
                this._protocol = val;
                return 1;
            case 'i2cVoltageLevel':
                this._i2cVoltageLevel = val;
                return 1;
            case 'i2cMode':
                this._i2cMode = val;
                return 1;
        }
        return super.imm_parseAttr(name, val);
    }
    /**
     * Returns the total number of bytes received since last reset.
     *
     * @return an integer corresponding to the total number of bytes received since last reset
     *
     * On failure, throws an exception or returns YI2cPort.RXCOUNT_INVALID.
     */
    async get_rxCount() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YI2cPort.RXCOUNT_INVALID;
            }
        }
        res = this._rxCount;
        return res;
    }
    /**
     * Returns the total number of bytes transmitted since last reset.
     *
     * @return an integer corresponding to the total number of bytes transmitted since last reset
     *
     * On failure, throws an exception or returns YI2cPort.TXCOUNT_INVALID.
     */
    async get_txCount() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YI2cPort.TXCOUNT_INVALID;
            }
        }
        res = this._txCount;
        return res;
    }
    /**
     * Returns the total number of communication errors detected since last reset.
     *
     * @return an integer corresponding to the total number of communication errors detected since last reset
     *
     * On failure, throws an exception or returns YI2cPort.ERRCOUNT_INVALID.
     */
    async get_errCount() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YI2cPort.ERRCOUNT_INVALID;
            }
        }
        res = this._errCount;
        return res;
    }
    /**
     * Returns the total number of messages received since last reset.
     *
     * @return an integer corresponding to the total number of messages received since last reset
     *
     * On failure, throws an exception or returns YI2cPort.RXMSGCOUNT_INVALID.
     */
    async get_rxMsgCount() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YI2cPort.RXMSGCOUNT_INVALID;
            }
        }
        res = this._rxMsgCount;
        return res;
    }
    /**
     * Returns the total number of messages send since last reset.
     *
     * @return an integer corresponding to the total number of messages send since last reset
     *
     * On failure, throws an exception or returns YI2cPort.TXMSGCOUNT_INVALID.
     */
    async get_txMsgCount() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YI2cPort.TXMSGCOUNT_INVALID;
            }
        }
        res = this._txMsgCount;
        return res;
    }
    /**
     * Returns the latest message fully received (for Line and Frame protocols).
     *
     * @return a string corresponding to the latest message fully received (for Line and Frame protocols)
     *
     * On failure, throws an exception or returns YI2cPort.LASTMSG_INVALID.
     */
    async get_lastMsg() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YI2cPort.LASTMSG_INVALID;
            }
        }
        res = this._lastMsg;
        return res;
    }
    /**
     * Returns the name of the job file currently in use.
     *
     * @return a string corresponding to the name of the job file currently in use
     *
     * On failure, throws an exception or returns YI2cPort.CURRENTJOB_INVALID.
     */
    async get_currentJob() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YI2cPort.CURRENTJOB_INVALID;
            }
        }
        res = this._currentJob;
        return res;
    }
    /**
     * Selects a job file to run immediately. If an empty string is
     * given as argument, stops running current job file.
     *
     * @param newval : a string
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_currentJob(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('currentJob', rest_val);
    }
    /**
     * Returns the job file to use when the device is powered on.
     *
     * @return a string corresponding to the job file to use when the device is powered on
     *
     * On failure, throws an exception or returns YI2cPort.STARTUPJOB_INVALID.
     */
    async get_startupJob() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YI2cPort.STARTUPJOB_INVALID;
            }
        }
        res = this._startupJob;
        return res;
    }
    /**
     * Changes the job to use when the device is powered on.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : a string corresponding to the job to use when the device is powered on
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_startupJob(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('startupJob', rest_val);
    }
    /**
     * Returns the maximum number of tasks in a job that the device can handle.
     *
     * @return an integer corresponding to the maximum number of tasks in a job that the device can handle
     *
     * On failure, throws an exception or returns YI2cPort.JOBMAXTASK_INVALID.
     */
    async get_jobMaxTask() {
        let res;
        if (this._cacheExpiration == 0) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YI2cPort.JOBMAXTASK_INVALID;
            }
        }
        res = this._jobMaxTask;
        return res;
    }
    /**
     * Returns maximum size allowed for job files.
     *
     * @return an integer corresponding to maximum size allowed for job files
     *
     * On failure, throws an exception or returns YI2cPort.JOBMAXSIZE_INVALID.
     */
    async get_jobMaxSize() {
        let res;
        if (this._cacheExpiration == 0) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YI2cPort.JOBMAXSIZE_INVALID;
            }
        }
        res = this._jobMaxSize;
        return res;
    }
    async get_command() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YI2cPort.COMMAND_INVALID;
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
     * Returns the type of protocol used to send I2C messages, as a string.
     * Possible values are
     * "Line" for messages separated by LF or
     * "Char" for continuous stream of codes.
     *
     * @return a string corresponding to the type of protocol used to send I2C messages, as a string
     *
     * On failure, throws an exception or returns YI2cPort.PROTOCOL_INVALID.
     */
    async get_protocol() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YI2cPort.PROTOCOL_INVALID;
            }
        }
        res = this._protocol;
        return res;
    }
    /**
     * Changes the type of protocol used to send I2C messages.
     * Possible values are
     * "Line" for messages separated by LF or
     * "Char" for continuous stream of codes.
     * The suffix "/[wait]ms" can be added to reduce the transmit rate so that there
     * is always at lest the specified number of milliseconds between each message sent.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : a string corresponding to the type of protocol used to send I2C messages
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_protocol(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('protocol', rest_val);
    }
    /**
     * Returns the voltage level used on the I2C bus.
     *
     * @return a value among YI2cPort.I2CVOLTAGELEVEL_OFF, YI2cPort.I2CVOLTAGELEVEL_3V3 and
     * YI2cPort.I2CVOLTAGELEVEL_1V8 corresponding to the voltage level used on the I2C bus
     *
     * On failure, throws an exception or returns YI2cPort.I2CVOLTAGELEVEL_INVALID.
     */
    async get_i2cVoltageLevel() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YI2cPort.I2CVOLTAGELEVEL_INVALID;
            }
        }
        res = this._i2cVoltageLevel;
        return res;
    }
    /**
     * Changes the voltage level used on the I2C bus.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : a value among YI2cPort.I2CVOLTAGELEVEL_OFF, YI2cPort.I2CVOLTAGELEVEL_3V3 and
     * YI2cPort.I2CVOLTAGELEVEL_1V8 corresponding to the voltage level used on the I2C bus
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_i2cVoltageLevel(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('i2cVoltageLevel', rest_val);
    }
    /**
     * Returns the I2C port communication parameters, as a string such as
     * "400kbps,2000ms,NoRestart". The string includes the baud rate, the
     * recovery delay after communications errors, and if needed the option
     * NoRestart to use a Stop/Start sequence instead of the
     * Restart state when performing read on the I2C bus.
     *
     * @return a string corresponding to the I2C port communication parameters, as a string such as
     *         "400kbps,2000ms,NoRestart"
     *
     * On failure, throws an exception or returns YI2cPort.I2CMODE_INVALID.
     */
    async get_i2cMode() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YI2cPort.I2CMODE_INVALID;
            }
        }
        res = this._i2cMode;
        return res;
    }
    /**
     * Changes the I2C port communication parameters, with a string such as
     * "400kbps,2000ms". The string includes the baud rate, the
     * recovery delay after communications errors, and if needed the option
     * NoRestart to use a Stop/Start sequence instead of the
     * Restart state when performing read on the I2C bus.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : a string corresponding to the I2C port communication parameters, with a string such as
     *         "400kbps,2000ms"
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_i2cMode(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('i2cMode', rest_val);
    }
    /**
     * Retrieves an I2C port for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the I2C port is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YI2cPort.isOnline() to test if the I2C port is
     * indeed online at a given time. In case of ambiguity when looking for
     * an I2C port by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the I2C port, for instance
     *         YI2CMK01.i2cPort.
     *
     * @return a YI2cPort object allowing you to drive the I2C port.
     */
    static FindI2cPort(func) {
        let obj;
        obj = yocto_api_js_1.YFunction._FindFromCache('I2cPort', func);
        if (obj == null) {
            obj = new YI2cPort(yocto_api_js_1.YAPI, func);
            yocto_api_js_1.YFunction._AddToCache('I2cPort', func, obj);
        }
        return obj;
    }
    /**
     * Retrieves an I2C port for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the I2C port is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YI2cPort.isOnline() to test if the I2C port is
     * indeed online at a given time. In case of ambiguity when looking for
     * an I2C port by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx : a YAPI context
     * @param func : a string that uniquely characterizes the I2C port, for instance
     *         YI2CMK01.i2cPort.
     *
     * @return a YI2cPort object allowing you to drive the I2C port.
     */
    static FindI2cPortInContext(yctx, func) {
        let obj;
        obj = yocto_api_js_1.YFunction._FindFromCacheInContext(yctx, 'I2cPort', func);
        if (obj == null) {
            obj = new YI2cPort(yctx, func);
            yocto_api_js_1.YFunction._AddToCache('I2cPort', func, obj);
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
        this._valueCallbackI2cPort = callback;
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
        if (this._valueCallbackI2cPort != null) {
            try {
                await this._valueCallbackI2cPort(this, value);
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
    async sendCommand(text) {
        return await this.set_command(text);
    }
    /**
     * Reads a single line (or message) from the receive buffer, starting at current stream position.
     * This function is intended to be used when the serial port is configured for a message protocol,
     * such as 'Line' mode or frame protocols.
     *
     * If data at current stream position is not available anymore in the receive buffer,
     * the function returns the oldest available line and moves the stream position just after.
     * If no new full line is received, the function returns an empty line.
     *
     * @return a string with a single line of text
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async readLine() {
        let url;
        let msgbin;
        let msgarr = [];
        let msglen;
        let res;
        url = 'rxmsg.json?pos=' + String(Math.round(this._rxptr)) + '&len=1&maxw=1';
        msgbin = await this._download(url);
        msgarr = this.imm_json_get_array(msgbin);
        msglen = msgarr.length;
        if (msglen == 0) {
            return '';
        }
        // last element of array is the new position
        msglen = msglen - 1;
        this._rxptr = yocto_api_js_1.YAPIContext.imm_atoi(msgarr[msglen]);
        if (msglen == 0) {
            return '';
        }
        res = this.imm_json_get_string(this._yapi.imm_str2bin(msgarr[0]));
        return res;
    }
    /**
     * Searches for incoming messages in the serial port receive buffer matching a given pattern,
     * starting at current position. This function will only compare and return printable characters
     * in the message strings. Binary protocols are handled as hexadecimal strings.
     *
     * The search returns all messages matching the expression provided as argument in the buffer.
     * If no matching message is found, the search waits for one up to the specified maximum timeout
     * (in milliseconds).
     *
     * @param pattern : a limited regular expression describing the expected message format,
     *         or an empty string if all messages should be returned (no filtering).
     *         When using binary protocols, the format applies to the hexadecimal
     *         representation of the message.
     * @param maxWait : the maximum number of milliseconds to wait for a message if none is found
     *         in the receive buffer.
     *
     * @return an array of strings containing the messages found, if any.
     *         Binary messages are converted to hexadecimal representation.
     *
     * On failure, throws an exception or returns an empty array.
     */
    async readMessages(pattern, maxWait) {
        let url;
        let msgbin;
        let msgarr = [];
        let msglen;
        let res = [];
        let idx;
        url = 'rxmsg.json?pos=' + String(Math.round(this._rxptr)) + '&maxw=' + String(Math.round(maxWait)) + '&pat=' + pattern;
        msgbin = await this._download(url);
        msgarr = this.imm_json_get_array(msgbin);
        msglen = msgarr.length;
        if (msglen == 0) {
            return res;
        }
        // last element of array is the new position
        msglen = msglen - 1;
        this._rxptr = yocto_api_js_1.YAPIContext.imm_atoi(msgarr[msglen]);
        idx = 0;
        while (idx < msglen) {
            res.push(this.imm_json_get_string(this._yapi.imm_str2bin(msgarr[idx])));
            idx = idx + 1;
        }
        return res;
    }
    /**
     * Changes the current internal stream position to the specified value. This function
     * does not affect the device, it only changes the value stored in the API object
     * for the next read operations.
     *
     * @param absPos : the absolute position index for next read operations.
     *
     * @return nothing.
     */
    async read_seek(absPos) {
        this._rxptr = absPos;
        return this._yapi.SUCCESS;
    }
    /**
     * Returns the current absolute stream position pointer of the API object.
     *
     * @return the absolute position index for next read operations.
     */
    async read_tell() {
        return this._rxptr;
    }
    /**
     * Returns the number of bytes available to read in the input buffer starting from the
     * current absolute stream position pointer of the API object.
     *
     * @return the number of bytes available to read
     */
    async read_avail() {
        let availPosStr;
        let atPos;
        let res;
        let databin;
        databin = await this._download('rxcnt.bin?pos=' + String(Math.round(this._rxptr)));
        availPosStr = this._yapi.imm_bin2str(databin);
        atPos = (availPosStr).indexOf('@');
        res = yocto_api_js_1.YAPIContext.imm_atoi((availPosStr).substr(0, atPos));
        return res;
    }
    async end_tell() {
        let availPosStr;
        let atPos;
        let res;
        let databin;
        databin = await this._download('rxcnt.bin?pos=' + String(Math.round(this._rxptr)));
        availPosStr = this._yapi.imm_bin2str(databin);
        atPos = (availPosStr).indexOf('@');
        res = yocto_api_js_1.YAPIContext.imm_atoi((availPosStr).substr(atPos + 1, (availPosStr).length - atPos - 1));
        return res;
    }
    /**
     * Sends a text line query to the serial port, and reads the reply, if any.
     * This function is intended to be used when the serial port is configured for 'Line' protocol.
     *
     * @param query : the line query to send (without CR/LF)
     * @param maxWait : the maximum number of milliseconds to wait for a reply.
     *
     * @return the next text line received after sending the text query, as a string.
     *         Additional lines can be obtained by calling readLine or readMessages.
     *
     * On failure, throws an exception or returns an empty string.
     */
    async queryLine(query, maxWait) {
        let prevpos;
        let url;
        let msgbin;
        let msgarr = [];
        let msglen;
        let res;
        if ((query).length <= 80) {
            // fast query
            url = 'rxmsg.json?len=1&maxw=' + String(Math.round(maxWait)) + '&cmd=!' + this.imm_escapeAttr(query);
        }
        else {
            // long query
            prevpos = await this.end_tell();
            await this._upload('txdata', this._yapi.imm_str2bin(query + '\r\n'));
            url = 'rxmsg.json?len=1&maxw=' + String(Math.round(maxWait)) + '&pos=' + String(Math.round(prevpos));
        }
        msgbin = await this._download(url);
        msgarr = this.imm_json_get_array(msgbin);
        msglen = msgarr.length;
        if (msglen == 0) {
            return '';
        }
        // last element of array is the new position
        msglen = msglen - 1;
        this._rxptr = yocto_api_js_1.YAPIContext.imm_atoi(msgarr[msglen]);
        if (msglen == 0) {
            return '';
        }
        res = this.imm_json_get_string(this._yapi.imm_str2bin(msgarr[0]));
        return res;
    }
    /**
     * Sends a binary message to the serial port, and reads the reply, if any.
     * This function is intended to be used when the serial port is configured for
     * Frame-based protocol.
     *
     * @param hexString : the message to send, coded in hexadecimal
     * @param maxWait : the maximum number of milliseconds to wait for a reply.
     *
     * @return the next frame received after sending the message, as a hex string.
     *         Additional frames can be obtained by calling readHex or readMessages.
     *
     * On failure, throws an exception or returns an empty string.
     */
    async queryHex(hexString, maxWait) {
        let prevpos;
        let url;
        let msgbin;
        let msgarr = [];
        let msglen;
        let res;
        if ((hexString).length <= 80) {
            // fast query
            url = 'rxmsg.json?len=1&maxw=' + String(Math.round(maxWait)) + '&cmd=$' + hexString;
        }
        else {
            // long query
            prevpos = await this.end_tell();
            await this._upload('txdata', this._yapi.imm_hexstr2bin(hexString));
            url = 'rxmsg.json?len=1&maxw=' + String(Math.round(maxWait)) + '&pos=' + String(Math.round(prevpos));
        }
        msgbin = await this._download(url);
        msgarr = this.imm_json_get_array(msgbin);
        msglen = msgarr.length;
        if (msglen == 0) {
            return '';
        }
        // last element of array is the new position
        msglen = msglen - 1;
        this._rxptr = yocto_api_js_1.YAPIContext.imm_atoi(msgarr[msglen]);
        if (msglen == 0) {
            return '';
        }
        res = this.imm_json_get_string(this._yapi.imm_str2bin(msgarr[0]));
        return res;
    }
    /**
     * Saves the job definition string (JSON data) into a job file.
     * The job file can be later enabled using selectJob().
     *
     * @param jobfile : name of the job file to save on the device filesystem
     * @param jsonDef : a string containing a JSON definition of the job
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async uploadJob(jobfile, jsonDef) {
        await this._upload(jobfile, this._yapi.imm_str2bin(jsonDef));
        return this._yapi.SUCCESS;
    }
    /**
     * Load and start processing the specified job file. The file must have
     * been previously created using the user interface or uploaded on the
     * device filesystem using the uploadJob() function.
     *
     * @param jobfile : name of the job file (on the device filesystem)
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async selectJob(jobfile) {
        return await this.set_currentJob(jobfile);
    }
    /**
     * Clears the serial port buffer and resets counters to zero.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async reset() {
        this._rxptr = 0;
        this._rxbuffptr = 0;
        this._rxbuff = new Uint8Array(0);
        return await this.sendCommand('Z');
    }
    /**
     * Sends a one-way message (provided as a a binary buffer) to a device on the I2C bus.
     * This function checks and reports communication errors on the I2C bus.
     *
     * @param slaveAddr : the 7-bit address of the slave device (without the direction bit)
     * @param buff : the binary buffer to be sent
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async i2cSendBin(slaveAddr, buff) {
        let nBytes;
        let idx;
        let val;
        let msg;
        let reply;
        msg = '@' + ('00' + (slaveAddr).toString(16)).slice(-2).toLowerCase() + ':';
        nBytes = (buff).length;
        idx = 0;
        while (idx < nBytes) {
            val = buff[idx];
            msg = msg + '' + ('00' + (val).toString(16)).slice(-2).toLowerCase();
            idx = idx + 1;
        }
        reply = await this.queryLine(msg, 1000);
        if (!((reply).length > 0)) {
            return this._throw(this._yapi.IO_ERROR, 'No response from I2C device', this._yapi.IO_ERROR);
        }
        idx = (reply).indexOf('[N]!');
        if (!(idx < 0)) {
            return this._throw(this._yapi.IO_ERROR, 'No I2C ACK received', this._yapi.IO_ERROR);
        }
        idx = (reply).indexOf('!');
        if (!(idx < 0)) {
            return this._throw(this._yapi.IO_ERROR, 'I2C protocol error', this._yapi.IO_ERROR);
        }
        return this._yapi.SUCCESS;
    }
    /**
     * Sends a one-way message (provided as a list of integer) to a device on the I2C bus.
     * This function checks and reports communication errors on the I2C bus.
     *
     * @param slaveAddr : the 7-bit address of the slave device (without the direction bit)
     * @param values : a list of data bytes to be sent
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async i2cSendArray(slaveAddr, values) {
        let nBytes;
        let idx;
        let val;
        let msg;
        let reply;
        msg = '@' + ('00' + (slaveAddr).toString(16)).slice(-2).toLowerCase() + ':';
        nBytes = values.length;
        idx = 0;
        while (idx < nBytes) {
            val = values[idx];
            msg = msg + '' + ('00' + (val).toString(16)).slice(-2).toLowerCase();
            idx = idx + 1;
        }
        reply = await this.queryLine(msg, 1000);
        if (!((reply).length > 0)) {
            return this._throw(this._yapi.IO_ERROR, 'No response from I2C device', this._yapi.IO_ERROR);
        }
        idx = (reply).indexOf('[N]!');
        if (!(idx < 0)) {
            return this._throw(this._yapi.IO_ERROR, 'No I2C ACK received', this._yapi.IO_ERROR);
        }
        idx = (reply).indexOf('!');
        if (!(idx < 0)) {
            return this._throw(this._yapi.IO_ERROR, 'I2C protocol error', this._yapi.IO_ERROR);
        }
        return this._yapi.SUCCESS;
    }
    /**
     * Sends a one-way message (provided as a a binary buffer) to a device on the I2C bus,
     * then read back the specified number of bytes from device.
     * This function checks and reports communication errors on the I2C bus.
     *
     * @param slaveAddr : the 7-bit address of the slave device (without the direction bit)
     * @param buff : the binary buffer to be sent
     * @param rcvCount : the number of bytes to receive once the data bytes are sent
     *
     * @return a list of bytes with the data received from slave device.
     *
     * On failure, throws an exception or returns an empty binary buffer.
     */
    async i2cSendAndReceiveBin(slaveAddr, buff, rcvCount) {
        let nBytes;
        let idx;
        let val;
        let msg;
        let reply;
        let rcvbytes;
        rcvbytes = new Uint8Array(0);
        if (!(rcvCount <= 512)) {
            return this._throw(this._yapi.INVALID_ARGUMENT, 'Cannot read more than 512 bytes', rcvbytes);
        }
        msg = '@' + ('00' + (slaveAddr).toString(16)).slice(-2).toLowerCase() + ':';
        nBytes = (buff).length;
        idx = 0;
        while (idx < nBytes) {
            val = buff[idx];
            msg = msg + '' + ('00' + (val).toString(16)).slice(-2).toLowerCase();
            idx = idx + 1;
        }
        idx = 0;
        if (rcvCount > 54) {
            while (rcvCount - idx > 255) {
                msg = msg + 'xx*FF';
                idx = idx + 255;
            }
            if (rcvCount - idx > 2) {
                msg = msg + 'xx*' + ('00' + ((rcvCount - idx)).toString(16)).slice(-2).toUpperCase();
                idx = rcvCount;
            }
        }
        while (idx < rcvCount) {
            msg = msg + 'xx';
            idx = idx + 1;
        }
        reply = await this.queryLine(msg, 1000);
        if (!((reply).length > 0)) {
            return this._throw(this._yapi.IO_ERROR, 'No response from I2C device', rcvbytes);
        }
        idx = (reply).indexOf('[N]!');
        if (!(idx < 0)) {
            return this._throw(this._yapi.IO_ERROR, 'No I2C ACK received', rcvbytes);
        }
        idx = (reply).indexOf('!');
        if (!(idx < 0)) {
            return this._throw(this._yapi.IO_ERROR, 'I2C protocol error', rcvbytes);
        }
        reply = (reply).substr((reply).length - 2 * rcvCount, 2 * rcvCount);
        rcvbytes = this._yapi.imm_hexstr2bin(reply);
        return rcvbytes;
    }
    /**
     * Sends a one-way message (provided as a list of integer) to a device on the I2C bus,
     * then read back the specified number of bytes from device.
     * This function checks and reports communication errors on the I2C bus.
     *
     * @param slaveAddr : the 7-bit address of the slave device (without the direction bit)
     * @param values : a list of data bytes to be sent
     * @param rcvCount : the number of bytes to receive once the data bytes are sent
     *
     * @return a list of bytes with the data received from slave device.
     *
     * On failure, throws an exception or returns an empty array.
     */
    async i2cSendAndReceiveArray(slaveAddr, values, rcvCount) {
        let nBytes;
        let idx;
        let val;
        let msg;
        let reply;
        let rcvbytes;
        let res = [];
        res.length = 0;
        if (!(rcvCount <= 512)) {
            return this._throw(this._yapi.INVALID_ARGUMENT, 'Cannot read more than 512 bytes', res);
        }
        msg = '@' + ('00' + (slaveAddr).toString(16)).slice(-2).toLowerCase() + ':';
        nBytes = values.length;
        idx = 0;
        while (idx < nBytes) {
            val = values[idx];
            msg = msg + '' + ('00' + (val).toString(16)).slice(-2).toLowerCase();
            idx = idx + 1;
        }
        idx = 0;
        if (rcvCount > 54) {
            while (rcvCount - idx > 255) {
                msg = msg + 'xx*FF';
                idx = idx + 255;
            }
            if (rcvCount - idx > 2) {
                msg = msg + 'xx*' + ('00' + ((rcvCount - idx)).toString(16)).slice(-2).toUpperCase();
                idx = rcvCount;
            }
        }
        while (idx < rcvCount) {
            msg = msg + 'xx';
            idx = idx + 1;
        }
        reply = await this.queryLine(msg, 1000);
        if (!((reply).length > 0)) {
            return this._throw(this._yapi.IO_ERROR, 'No response from I2C device', res);
        }
        idx = (reply).indexOf('[N]!');
        if (!(idx < 0)) {
            return this._throw(this._yapi.IO_ERROR, 'No I2C ACK received', res);
        }
        idx = (reply).indexOf('!');
        if (!(idx < 0)) {
            return this._throw(this._yapi.IO_ERROR, 'I2C protocol error', res);
        }
        reply = (reply).substr((reply).length - 2 * rcvCount, 2 * rcvCount);
        rcvbytes = this._yapi.imm_hexstr2bin(reply);
        res.length = 0;
        idx = 0;
        while (idx < rcvCount) {
            val = rcvbytes[idx];
            res.push(val);
            idx = idx + 1;
        }
        return res;
    }
    /**
     * Sends a text-encoded I2C code stream to the I2C bus, as is.
     * An I2C code stream is a string made of hexadecimal data bytes,
     * but that may also include the I2C state transitions code:
     * "{S}" to emit a start condition,
     * "{R}" for a repeated start condition,
     * "{P}" for a stop condition,
     * "xx" for receiving a data byte,
     * "{A}" to ack a data byte received and
     * "{N}" to nack a data byte received.
     * If a newline ("\n") is included in the stream, the message
     * will be terminated and a newline will also be added to the
     * receive stream.
     *
     * @param codes : the code stream to send
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async writeStr(codes) {
        let bufflen;
        let buff;
        let idx;
        let ch;
        buff = this._yapi.imm_str2bin(codes);
        bufflen = (buff).length;
        if (bufflen < 100) {
            // if string is pure text, we can send it as a simple command (faster)
            ch = 0x20;
            idx = 0;
            while ((idx < bufflen) && (ch != 0)) {
                ch = buff[idx];
                if ((ch >= 0x20) && (ch < 0x7f)) {
                    idx = idx + 1;
                }
                else {
                    ch = 0;
                }
            }
            if (idx >= bufflen) {
                return await this.sendCommand('+' + codes);
            }
        }
        // send string using file upload
        return await this._upload('txdata', buff);
    }
    /**
     * Sends a text-encoded I2C code stream to the I2C bus, and terminate
     * the message en relâchant le bus.
     * An I2C code stream is a string made of hexadecimal data bytes,
     * but that may also include the I2C state transitions code:
     * "{S}" to emit a start condition,
     * "{R}" for a repeated start condition,
     * "{P}" for a stop condition,
     * "xx" for receiving a data byte,
     * "{A}" to ack a data byte received and
     * "{N}" to nack a data byte received.
     * At the end of the stream, a stop condition is added if missing
     * and a newline is added to the receive buffer as well.
     *
     * @param codes : the code stream to send
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async writeLine(codes) {
        let bufflen;
        let buff;
        bufflen = (codes).length;
        if (bufflen < 100) {
            return await this.sendCommand('!' + codes);
        }
        // send string using file upload
        buff = this._yapi.imm_str2bin(codes + '\n');
        return await this._upload('txdata', buff);
    }
    /**
     * Sends a single byte to the I2C bus. Depending on the I2C bus state, the byte
     * will be interpreted as an address byte or a data byte.
     *
     * @param code : the byte to send
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async writeByte(code) {
        return await this.sendCommand('+' + ('00' + (code).toString(16)).slice(-2).toUpperCase());
    }
    /**
     * Sends a byte sequence (provided as a hexadecimal string) to the I2C bus.
     * Depending on the I2C bus state, the first byte will be interpreted as an
     * address byte or a data byte.
     *
     * @param hexString : a string of hexadecimal byte codes
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async writeHex(hexString) {
        let bufflen;
        let buff;
        bufflen = (hexString).length;
        if (bufflen < 100) {
            return await this.sendCommand('+' + hexString);
        }
        buff = this._yapi.imm_str2bin(hexString);
        return await this._upload('txdata', buff);
    }
    /**
     * Sends a binary buffer to the I2C bus, as is.
     * Depending on the I2C bus state, the first byte will be interpreted
     * as an address byte or a data byte.
     *
     * @param buff : the binary buffer to send
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async writeBin(buff) {
        let nBytes;
        let idx;
        let val;
        let msg;
        msg = '';
        nBytes = (buff).length;
        idx = 0;
        while (idx < nBytes) {
            val = buff[idx];
            msg = msg + '' + ('00' + (val).toString(16)).slice(-2).toLowerCase();
            idx = idx + 1;
        }
        return await this.writeHex(msg);
    }
    /**
     * Sends a byte sequence (provided as a list of bytes) to the I2C bus.
     * Depending on the I2C bus state, the first byte will be interpreted as an
     * address byte or a data byte.
     *
     * @param byteList : a list of byte codes
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async writeArray(byteList) {
        let nBytes;
        let idx;
        let val;
        let msg;
        msg = '';
        nBytes = byteList.length;
        idx = 0;
        while (idx < nBytes) {
            val = byteList[idx];
            msg = msg + '' + ('00' + (val).toString(16)).slice(-2).toLowerCase();
            idx = idx + 1;
        }
        return await this.writeHex(msg);
    }
    /**
     * Retrieves messages (both direction) in the I2C port buffer, starting at current position.
     *
     * If no message is found, the search waits for one up to the specified maximum timeout
     * (in milliseconds).
     *
     * @param maxWait : the maximum number of milliseconds to wait for a message if none is found
     *         in the receive buffer.
     *
     * @return an array of YI2cSnoopingRecord objects containing the messages found, if any.
     *
     * On failure, throws an exception or returns an empty array.
     */
    async snoopMessages(maxWait) {
        let url;
        let msgbin;
        let msgarr = [];
        let msglen;
        let res = [];
        let idx;
        url = 'rxmsg.json?pos=' + String(Math.round(this._rxptr)) + '&maxw=' + String(Math.round(maxWait)) + '&t=0';
        msgbin = await this._download(url);
        msgarr = this.imm_json_get_array(msgbin);
        msglen = msgarr.length;
        if (msglen == 0) {
            return res;
        }
        // last element of array is the new position
        msglen = msglen - 1;
        this._rxptr = yocto_api_js_1.YAPIContext.imm_atoi(msgarr[msglen]);
        idx = 0;
        while (idx < msglen) {
            res.push(new YI2cSnoopingRecord(msgarr[idx]));
            idx = idx + 1;
        }
        return res;
    }
    /**
     * Continues the enumeration of I2C ports started using yFirstI2cPort().
     * Caution: You can't make any assumption about the returned I2C ports order.
     * If you want to find a specific an I2C port, use I2cPort.findI2cPort()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YI2cPort object, corresponding to
     *         an I2C port currently online, or a null pointer
     *         if there are no more I2C ports to enumerate.
     */
    nextI2cPort() {
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != yocto_api_js_1.YAPI.SUCCESS)
            return null;
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if (next_hwid == null)
            return null;
        return YI2cPort.FindI2cPortInContext(this._yapi, next_hwid);
    }
    /**
     * Starts the enumeration of I2C ports currently accessible.
     * Use the method YI2cPort.nextI2cPort() to iterate on
     * next I2C ports.
     *
     * @return a pointer to a YI2cPort object, corresponding to
     *         the first I2C port currently online, or a null pointer
     *         if there are none.
     */
    static FirstI2cPort() {
        let next_hwid = yocto_api_js_1.YAPI.imm_getFirstHardwareId('I2cPort');
        if (next_hwid == null)
            return null;
        return YI2cPort.FindI2cPort(next_hwid);
    }
    /**
     * Starts the enumeration of I2C ports currently accessible.
     * Use the method YI2cPort.nextI2cPort() to iterate on
     * next I2C ports.
     *
     * @param yctx : a YAPI context.
     *
     * @return a pointer to a YI2cPort object, corresponding to
     *         the first I2C port currently online, or a null pointer
     *         if there are none.
     */
    static FirstI2cPortInContext(yctx) {
        let next_hwid = yctx.imm_getFirstHardwareId('I2cPort');
        if (next_hwid == null)
            return null;
        return YI2cPort.FindI2cPortInContext(yctx, next_hwid);
    }
}
exports.YI2cPort = YI2cPort;
// API symbols as static members
YI2cPort.RXCOUNT_INVALID = yocto_api_js_1.YAPI.INVALID_UINT;
YI2cPort.TXCOUNT_INVALID = yocto_api_js_1.YAPI.INVALID_UINT;
YI2cPort.ERRCOUNT_INVALID = yocto_api_js_1.YAPI.INVALID_UINT;
YI2cPort.RXMSGCOUNT_INVALID = yocto_api_js_1.YAPI.INVALID_UINT;
YI2cPort.TXMSGCOUNT_INVALID = yocto_api_js_1.YAPI.INVALID_UINT;
YI2cPort.LASTMSG_INVALID = yocto_api_js_1.YAPI.INVALID_STRING;
YI2cPort.CURRENTJOB_INVALID = yocto_api_js_1.YAPI.INVALID_STRING;
YI2cPort.STARTUPJOB_INVALID = yocto_api_js_1.YAPI.INVALID_STRING;
YI2cPort.JOBMAXTASK_INVALID = yocto_api_js_1.YAPI.INVALID_UINT;
YI2cPort.JOBMAXSIZE_INVALID = yocto_api_js_1.YAPI.INVALID_UINT;
YI2cPort.COMMAND_INVALID = yocto_api_js_1.YAPI.INVALID_STRING;
YI2cPort.PROTOCOL_INVALID = yocto_api_js_1.YAPI.INVALID_STRING;
YI2cPort.I2CVOLTAGELEVEL_OFF = 0;
YI2cPort.I2CVOLTAGELEVEL_3V3 = 1;
YI2cPort.I2CVOLTAGELEVEL_1V8 = 2;
YI2cPort.I2CVOLTAGELEVEL_INVALID = -1;
YI2cPort.I2CMODE_INVALID = yocto_api_js_1.YAPI.INVALID_STRING;
//# sourceMappingURL=yocto_i2cport.js.map