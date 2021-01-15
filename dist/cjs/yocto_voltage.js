"use strict";
/*********************************************************************
 *
 *  $Id: svn_id $
 *
 *  Implements the high-level API for Voltage functions
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
exports.YVoltage = void 0;
const yocto_api_js_1 = require("./yocto_api.js");
//--- (end of YVoltage definitions)
//--- (YVoltage class start)
/**
 * YVoltage Class: voltage sensor control interface, available for instance in the Yocto-Motor-DC, the
 * Yocto-Volt or the Yocto-Watt
 *
 * The YVoltage class allows you to read and configure Yoctopuce voltage sensors.
 * It inherits from YSensor class the core functions to read measurements,
 * to register callback functions, and to access the autonomous datalogger.
 */
//--- (end of YVoltage class start)
class YVoltage extends yocto_api_js_1.YSensor {
    //--- (end of YVoltage attributes declaration)
    //--- (YVoltage return codes)
    //--- (end of YVoltage return codes)
    constructor(yapi, func) {
        //--- (YVoltage constructor)
        super(yapi, func);
        this._enabled = YVoltage.ENABLED_INVALID;
        this._valueCallbackVoltage = null;
        this._timedReportCallbackVoltage = null;
        // API symbols as object properties
        this.ENABLED_FALSE = 0 /* FALSE */;
        this.ENABLED_TRUE = 1 /* TRUE */;
        this.ENABLED_INVALID = -1 /* INVALID */;
        this._className = 'Voltage';
        //--- (end of YVoltage constructor)
    }
    //--- (YVoltage implementation)
    imm_parseAttr(name, val) {
        switch (name) {
            case 'enabled':
                this._enabled = val;
                return 1;
        }
        return super.imm_parseAttr(name, val);
    }
    /**
     * Returns the activation state of this input.
     *
     * @return either Y_ENABLED_FALSE or Y_ENABLED_TRUE, according to the activation state of this input
     *
     * On failure, throws an exception or returns Y_ENABLED_INVALID.
     */
    async get_enabled() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YVoltage.ENABLED_INVALID;
            }
        }
        res = this._enabled;
        return res;
    }
    /**
     * Changes the activation state of this voltage input. When AC measurements are disabled,
     * the device will always assume a DC signal, and vice-versa. When both AC and DC measurements
     * are active, the device switches between AC and DC mode based on the relative amplitude
     * of variations compared to the average value.
     * Remember to call the saveToFlash()
     * method of the module if the modification must be kept.
     *
     * @param newval : either Y_ENABLED_FALSE or Y_ENABLED_TRUE, according to the activation state of this
     * voltage input
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_enabled(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('enabled', rest_val);
    }
    /**
     * Retrieves $AFUNCTION$ for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that $THEFUNCTION$ is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YVoltage.isOnline() to test if $THEFUNCTION$ is
     * indeed online at a given time. In case of ambiguity when looking for
     * $AFUNCTION$ by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes $THEFUNCTION$, for instance
     *         $FULLHARDWAREID$.
     *
     * @return a YVoltage object allowing you to drive $THEFUNCTION$.
     */
    static FindVoltage(func) {
        let obj;
        obj = yocto_api_js_1.YFunction._FindFromCache('Voltage', func);
        if (obj == null) {
            obj = new YVoltage(yocto_api_js_1.YAPI, func);
            yocto_api_js_1.YFunction._AddToCache('Voltage', func, obj);
        }
        return obj;
    }
    /**
     * Retrieves $AFUNCTION$ for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that $THEFUNCTION$ is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YVoltage.isOnline() to test if $THEFUNCTION$ is
     * indeed online at a given time. In case of ambiguity when looking for
     * $AFUNCTION$ by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx : a YAPI context
     * @param func : a string that uniquely characterizes $THEFUNCTION$, for instance
     *         $FULLHARDWAREID$.
     *
     * @return a YVoltage object allowing you to drive $THEFUNCTION$.
     */
    static FindVoltageInContext(yctx, func) {
        let obj;
        obj = yocto_api_js_1.YFunction._FindFromCacheInContext(yctx, 'Voltage', func);
        if (obj == null) {
            obj = new YVoltage(yctx, func);
            yocto_api_js_1.YFunction._AddToCache('Voltage', func, obj);
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
        this._valueCallbackVoltage = callback;
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
        if (this._valueCallbackVoltage != null) {
            try {
                await this._valueCallbackVoltage(this, value);
            }
            catch (e) {
                this._yapi.imm_log('Exception in valueCallback:', e);
            }
        }
        else {
            super._invokeValueCallback(value);
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
            await yocto_api_js_1.YFunction._UpdateTimedReportCallbackList(sensor, true);
        }
        else {
            await yocto_api_js_1.YFunction._UpdateTimedReportCallbackList(sensor, false);
        }
        this._timedReportCallbackVoltage = callback;
        return 0;
    }
    async _invokeTimedReportCallback(value) {
        if (this._timedReportCallbackVoltage != null) {
            try {
                await this._timedReportCallbackVoltage(this, value);
            }
            catch (e) {
                this._yapi.imm_log('Exception in timedReportCallback:', e);
            }
        }
        else {
            super._invokeTimedReportCallback(value);
        }
        return 0;
    }
    /**
     * Returns the next Voltage
     *
     * @returns {YVoltage}
     */
    nextVoltage() {
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != yocto_api_js_1.YAPI.SUCCESS)
            return null;
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if (next_hwid == null)
            return null;
        return YVoltage.FindVoltageInContext(this._yapi, next_hwid);
    }
    /**
     * Retrieves the first Voltage in a YAPI context
     *
     * @returns {YVoltage}
     */
    static FirstVoltage() {
        let next_hwid = yocto_api_js_1.YAPI.imm_getFirstHardwareId('Voltage');
        if (next_hwid == null)
            return null;
        return YVoltage.FindVoltage(next_hwid);
    }
    /**
     * Retrieves the first Voltage in a given context
     *
     * @param yctx {YAPIContext}
     *
     * @returns {YVoltage}
     */
    static FirstVoltageInContext(yctx) {
        let next_hwid = yctx.imm_getFirstHardwareId('Voltage');
        if (next_hwid == null)
            return null;
        return YVoltage.FindVoltageInContext(yctx, next_hwid);
    }
}
exports.YVoltage = YVoltage;
// API symbols as static members
YVoltage.ENABLED_FALSE = 0 /* FALSE */;
YVoltage.ENABLED_TRUE = 1 /* TRUE */;
YVoltage.ENABLED_INVALID = -1 /* INVALID */;
//# sourceMappingURL=yocto_voltage.js.map