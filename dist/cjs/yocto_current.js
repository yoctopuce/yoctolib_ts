"use strict";
/*********************************************************************
 *
 *  $Id: svn_id $
 *
 *  Implements the high-level API for Current functions
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
exports.YCurrent = void 0;
const yocto_api_js_1 = require("./yocto_api.js");
//--- (YCurrent class start)
/**
 * YCurrent Class: current sensor control interface, available for instance in the Yocto-Amp, the
 * Yocto-Motor-DC or the Yocto-Watt
 *
 * The YCurrent class allows you to read and configure Yoctopuce current sensors.
 * It inherits from YSensor class the core functions to read measures,
 * to register callback functions, and to access the autonomous datalogger.
 */
//--- (end of YCurrent class start)
class YCurrent extends yocto_api_js_1.YSensor {
    //--- (end of YCurrent attributes declaration)
    constructor(yapi, func) {
        //--- (YCurrent constructor)
        super(yapi, func);
        this._enabled = YCurrent.ENABLED_INVALID;
        this._valueCallbackCurrent = null;
        this._timedReportCallbackCurrent = null;
        // API symbols as object properties
        this.ENABLED_FALSE = 0;
        this.ENABLED_TRUE = 1;
        this.ENABLED_INVALID = -1;
        this._className = 'Current';
        //--- (end of YCurrent constructor)
    }
    //--- (YCurrent implementation)
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
     * @return either YCurrent.ENABLED_FALSE or YCurrent.ENABLED_TRUE, according to the activation state of this input
     *
     * On failure, throws an exception or returns YCurrent.ENABLED_INVALID.
     */
    async get_enabled() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YCurrent.ENABLED_INVALID;
            }
        }
        res = this._enabled;
        return res;
    }
    /**
     * Changes the activation state of this voltage input. When AC measures are disabled,
     * the device will always assume a DC signal, and vice-versa. When both AC and DC measures
     * are active, the device switches between AC and DC mode based on the relative amplitude
     * of variations compared to the average value.
     * Remember to call the saveToFlash()
     * method of the module if the modification must be kept.
     *
     * @param newval : either YCurrent.ENABLED_FALSE or YCurrent.ENABLED_TRUE, according to the activation
     * state of this voltage input
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_enabled(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('enabled', rest_val);
    }
    /**
     * Retrieves a current sensor for a given identifier.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the current sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YCurrent.isOnline() to test if the current sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a current sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the current sensor, for instance
     *         YAMPMK01.current1.
     *
     * @return a YCurrent object allowing you to drive the current sensor.
     */
    static FindCurrent(func) {
        let obj;
        obj = yocto_api_js_1.YFunction._FindFromCache('Current', func);
        if (obj == null) {
            obj = new YCurrent(yocto_api_js_1.YAPI, func);
            yocto_api_js_1.YFunction._AddToCache('Current', func, obj);
        }
        return obj;
    }
    /**
     * Retrieves a current sensor for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the current sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YCurrent.isOnline() to test if the current sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a current sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx : a YAPI context
     * @param func : a string that uniquely characterizes the current sensor, for instance
     *         YAMPMK01.current1.
     *
     * @return a YCurrent object allowing you to drive the current sensor.
     */
    static FindCurrentInContext(yctx, func) {
        let obj;
        obj = yocto_api_js_1.YFunction._FindFromCacheInContext(yctx, 'Current', func);
        if (obj == null) {
            obj = new YCurrent(yctx, func);
            yocto_api_js_1.YFunction._AddToCache('Current', func, obj);
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
        this._valueCallbackCurrent = callback;
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
        if (this._valueCallbackCurrent != null) {
            try {
                await this._valueCallbackCurrent(this, value);
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
            await yocto_api_js_1.YFunction._UpdateTimedReportCallbackList(sensor, true);
        }
        else {
            await yocto_api_js_1.YFunction._UpdateTimedReportCallbackList(sensor, false);
        }
        this._timedReportCallbackCurrent = callback;
        return 0;
    }
    async _invokeTimedReportCallback(value) {
        if (this._timedReportCallbackCurrent != null) {
            try {
                await this._timedReportCallbackCurrent(this, value);
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
    /**
     * Continues the enumeration of current sensors started using yFirstCurrent().
     * Caution: You can't make any assumption about the returned current sensors order.
     * If you want to find a specific a current sensor, use Current.findCurrent()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YCurrent object, corresponding to
     *         a current sensor currently online, or a null pointer
     *         if there are no more current sensors to enumerate.
     */
    nextCurrent() {
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != yocto_api_js_1.YAPI.SUCCESS)
            return null;
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if (next_hwid == null)
            return null;
        return YCurrent.FindCurrentInContext(this._yapi, next_hwid);
    }
    /**
     * Starts the enumeration of current sensors currently accessible.
     * Use the method YCurrent.nextCurrent() to iterate on
     * next current sensors.
     *
     * @return a pointer to a YCurrent object, corresponding to
     *         the first current sensor currently online, or a null pointer
     *         if there are none.
     */
    static FirstCurrent() {
        let next_hwid = yocto_api_js_1.YAPI.imm_getFirstHardwareId('Current');
        if (next_hwid == null)
            return null;
        return YCurrent.FindCurrent(next_hwid);
    }
    /**
     * Starts the enumeration of current sensors currently accessible.
     * Use the method YCurrent.nextCurrent() to iterate on
     * next current sensors.
     *
     * @param yctx : a YAPI context.
     *
     * @return a pointer to a YCurrent object, corresponding to
     *         the first current sensor currently online, or a null pointer
     *         if there are none.
     */
    static FirstCurrentInContext(yctx) {
        let next_hwid = yctx.imm_getFirstHardwareId('Current');
        if (next_hwid == null)
            return null;
        return YCurrent.FindCurrentInContext(yctx, next_hwid);
    }
}
exports.YCurrent = YCurrent;
// API symbols as static members
YCurrent.ENABLED_FALSE = 0;
YCurrent.ENABLED_TRUE = 1;
YCurrent.ENABLED_INVALID = -1;
//# sourceMappingURL=yocto_current.js.map