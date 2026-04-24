/*********************************************************************
 *
 *  $Id: svn_id $
 *
 *  Implements the high-level API for Counter functions
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
import { YAPI, YFunction, YSensor } from './yocto_api.js';
//--- (YCounter class start)
/**
 * YCounter Class: counter control interface
 *
 * The YCounter class allows you to read and configure Yoctopuce gcounters.
 * It inherits from YSensor class the core functions to read measurements,
 * to register callback functions, and to access the autonomous datalogger.
 */
//--- (end of YCounter class start)
export class YCounter extends YSensor {
    //--- (end of YCounter attributes declaration)
    constructor(yapi, func) {
        //--- (YCounter constructor)
        super(yapi, func);
        this._decimalMode = YCounter.DECIMALMODE_INVALID;
        this._command = YCounter.COMMAND_INVALID;
        this._valueCallbackCounter = null;
        this._timedReportCallbackCounter = null;
        // API symbols as object properties
        this.DECIMALMODE_FALSE = 0;
        this.DECIMALMODE_TRUE = 1;
        this.DECIMALMODE_INVALID = -1;
        this.COMMAND_INVALID = YAPI.INVALID_STRING;
        this._className = 'Counter';
        //--- (end of YCounter constructor)
    }
    //--- (YCounter implementation)
    imm_parseAttr(name, val) {
        switch (name) {
            case 'decimalMode':
                this._decimalMode = val;
                return 1;
            case 'command':
                this._command = val;
                return 1;
        }
        return super.imm_parseAttr(name, val);
    }
    /**
     * Returns a value indicating if the senseur compute whole or fractional values.
     *
     * @return either YCounter.DECIMALMODE_FALSE or YCounter.DECIMALMODE_TRUE, according to a value
     * indicating if the senseur compute whole or fractional values
     *
     * On failure, throws an exception or returns YCounter.DECIMALMODE_INVALID.
     */
    async get_decimalMode() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YCounter.DECIMALMODE_INVALID;
            }
        }
        res = this._decimalMode;
        return res;
    }
    /**
     * Changes the sensor's operating mode so that it computes integer or decimal values.
     * Remember to call the saveToFlash() method of the module if the modification must be kept.
     *
     * @param newval : either YCounter.DECIMALMODE_FALSE or YCounter.DECIMALMODE_TRUE, according to the
     * sensor's operating mode so that it computes integer or decimal values
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_decimalMode(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('decimalMode', rest_val);
    }
    async get_command() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YCounter.COMMAND_INVALID;
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
     * Retrieves a counter for a given identifier.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the counter is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YCounter.isOnline() to test if the counter is
     * indeed online at a given time. In case of ambiguity when looking for
     * a counter by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the counter, for instance
     *         MyDevice.counter.
     *
     * @return a YCounter object allowing you to drive the counter.
     */
    static FindCounter(func) {
        let obj;
        obj = YFunction._FindFromCache('Counter', func);
        if (obj == null) {
            obj = new YCounter(YAPI, func);
            YFunction._AddToCache('Counter', func, obj);
        }
        return obj;
    }
    /**
     * Retrieves a counter for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the counter is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YCounter.isOnline() to test if the counter is
     * indeed online at a given time. In case of ambiguity when looking for
     * a counter by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx : a YAPI context
     * @param func : a string that uniquely characterizes the counter, for instance
     *         MyDevice.counter.
     *
     * @return a YCounter object allowing you to drive the counter.
     */
    static FindCounterInContext(yctx, func) {
        let obj;
        obj = YFunction._FindFromCacheInContext(yctx, 'Counter', func);
        if (obj == null) {
            obj = new YCounter(yctx, func);
            YFunction._AddToCache('Counter', func, obj);
        }
        return obj;
    }
    /**
     * Registers the callback function that is invoked on every change of advertised value.
     * The callback is then invoked only during the execution of ySleep or yHandleEvents.
     * This provides control over the time when the callback is triggered. For good responsiveness,
     * remember to call one of these two functions periodically. The callback is called once juste after beeing
     * registered, passing the current advertised value  of the function, provided that it is not an empty string.
     * To unregister a callback, pass a null pointer as argument.
     *
     * @param callback : the callback function to call, or a null pointer. The callback function should take two
     *         arguments: the function object of which the value has changed, and the character string describing
     *         the new advertised value.
     * @noreturn
     */
    async registerValueCallback(callback) {
        let val;
        if (callback != null) {
            await YFunction._UpdateValueCallbackList(this, true);
        }
        else {
            await YFunction._UpdateValueCallbackList(this, false);
        }
        this._valueCallbackCounter = callback;
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
        if (this._valueCallbackCounter != null) {
            try {
                await this._valueCallbackCounter(this, value);
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
    async registerTimedReportCallback(callback) {
        let sensor;
        sensor = this;
        if (callback != null) {
            await YFunction._UpdateTimedReportCallbackList(sensor, true);
        }
        else {
            await YFunction._UpdateTimedReportCallbackList(sensor, false);
        }
        this._timedReportCallbackCounter = callback;
        return 0;
    }
    async _invokeTimedReportCallback(value) {
        if (this._timedReportCallbackCounter != null) {
            try {
                await this._timedReportCallbackCounter(this, value);
            }
            catch (e) {
                this._yapi.imm_log('Exception in timedReportCallback:', e);
            }
        }
        else {
            await super._invokeTimedReportCallback(value);
        }
        return 0;
    }
    async sendCommand(command) {
        return await this.set_command(command);
    }
    /**
     * Reset the counter to zero.
     *
     * @return YAPI.SUCCESS if the call succeeds. Please note that this function only resets
     *         the integer part of the counter. In CONTINUOUS mode, the decimal part is calculated
     *         from the angle measured by the sensor. To set the decimal part of the sensor to zero,
     *         the origin of the sensor must be changed with the YOrientation.zero().
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async zero() {
        return await this.sendCommand('Z');
    }
    /**
     * Continues the enumeration of gcounters started using yFirstCounter().
     * Caution: You can't make any assumption about the returned gcounters order.
     * If you want to find a specific a counter, use Counter.findCounter()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YCounter object, corresponding to
     *         a counter currently online, or a null pointer
     *         if there are no more gcounters to enumerate.
     */
    nextCounter() {
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != YAPI.SUCCESS)
            return null;
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if (next_hwid == null)
            return null;
        return YCounter.FindCounterInContext(this._yapi, next_hwid);
    }
    /**
     * Starts the enumeration of gcounters currently accessible.
     * Use the method YCounter.nextCounter() to iterate on
     * next gcounters.
     *
     * @return a pointer to a YCounter object, corresponding to
     *         the first counter currently online, or a null pointer
     *         if there are none.
     */
    static FirstCounter() {
        let next_hwid = YAPI.imm_getFirstHardwareId('Counter');
        if (next_hwid == null)
            return null;
        return YCounter.FindCounter(next_hwid);
    }
    /**
     * Starts the enumeration of gcounters currently accessible.
     * Use the method YCounter.nextCounter() to iterate on
     * next gcounters.
     *
     * @param yctx : a YAPI context.
     *
     * @return a pointer to a YCounter object, corresponding to
     *         the first counter currently online, or a null pointer
     *         if there are none.
     */
    static FirstCounterInContext(yctx) {
        let next_hwid = yctx.imm_getFirstHardwareId('Counter');
        if (next_hwid == null)
            return null;
        return YCounter.FindCounterInContext(yctx, next_hwid);
    }
}
// API symbols as static members
YCounter.DECIMALMODE_FALSE = 0;
YCounter.DECIMALMODE_TRUE = 1;
YCounter.DECIMALMODE_INVALID = -1;
YCounter.COMMAND_INVALID = YAPI.INVALID_STRING;
//# sourceMappingURL=yocto_counter.js.map