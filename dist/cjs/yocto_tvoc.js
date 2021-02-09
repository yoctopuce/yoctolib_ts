"use strict";
/*********************************************************************
 *
 *  $Id: yocto_tvoc.ts 43760 2021-02-08 14:33:45Z mvuilleu $
 *
 *  Implements the high-level API for Tvoc functions
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
exports.YTvoc = void 0;
const yocto_api_js_1 = require("./yocto_api.js");
//--- (YTvoc class start)
/**
 * YTvoc Class: Total Volatile Organic Compound sensor control interface, available for instance in
 * the Yocto-VOC-V3
 *
 * The YTvoc class allows you to read and configure Yoctopuce Total Volatile Organic Compound sensors.
 * It inherits from YSensor class the core functions to read measurements,
 * to register callback functions, and to access the autonomous datalogger.
 */
//--- (end of YTvoc class start)
class YTvoc extends yocto_api_js_1.YSensor {
    // API symbols as static members
    //--- (end of YTvoc attributes declaration)
    constructor(yapi, func) {
        //--- (YTvoc constructor)
        super(yapi, func);
        this._valueCallbackTvoc = null;
        this._timedReportCallbackTvoc = null;
        this._className = 'Tvoc';
        //--- (end of YTvoc constructor)
    }
    //--- (YTvoc implementation)
    /**
     * Retrieves a Total  Volatile Organic Compound sensor for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the Total  Volatile Organic Compound sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YTvoc.isOnline() to test if the Total  Volatile Organic Compound sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a Total  Volatile Organic Compound sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the Total  Volatile Organic Compound sensor, for instance
     *         YVOCMK03.tvoc.
     *
     * @return a YTvoc object allowing you to drive the Total  Volatile Organic Compound sensor.
     */
    static FindTvoc(func) {
        let obj;
        obj = yocto_api_js_1.YFunction._FindFromCache('Tvoc', func);
        if (obj == null) {
            obj = new YTvoc(yocto_api_js_1.YAPI, func);
            yocto_api_js_1.YFunction._AddToCache('Tvoc', func, obj);
        }
        return obj;
    }
    /**
     * Retrieves a Total  Volatile Organic Compound sensor for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the Total  Volatile Organic Compound sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YTvoc.isOnline() to test if the Total  Volatile Organic Compound sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a Total  Volatile Organic Compound sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx : a YAPI context
     * @param func : a string that uniquely characterizes the Total  Volatile Organic Compound sensor, for instance
     *         YVOCMK03.tvoc.
     *
     * @return a YTvoc object allowing you to drive the Total  Volatile Organic Compound sensor.
     */
    static FindTvocInContext(yctx, func) {
        let obj;
        obj = yocto_api_js_1.YFunction._FindFromCacheInContext(yctx, 'Tvoc', func);
        if (obj == null) {
            obj = new YTvoc(yctx, func);
            yocto_api_js_1.YFunction._AddToCache('Tvoc', func, obj);
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
        this._valueCallbackTvoc = callback;
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
        if (this._valueCallbackTvoc != null) {
            try {
                await this._valueCallbackTvoc(this, value);
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
        this._timedReportCallbackTvoc = callback;
        return 0;
    }
    async _invokeTimedReportCallback(value) {
        if (this._timedReportCallbackTvoc != null) {
            try {
                await this._timedReportCallbackTvoc(this, value);
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
     * Continues the enumeration of Total Volatile Organic Compound sensors started using yFirstTvoc().
     * Caution: You can't make any assumption about the returned Total Volatile Organic Compound sensors order.
     * If you want to find a specific a Total  Volatile Organic Compound sensor, use Tvoc.findTvoc()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YTvoc object, corresponding to
     *         a Total  Volatile Organic Compound sensor currently online, or a null pointer
     *         if there are no more Total Volatile Organic Compound sensors to enumerate.
     */
    nextTvoc() {
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != yocto_api_js_1.YAPI.SUCCESS)
            return null;
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if (next_hwid == null)
            return null;
        return YTvoc.FindTvocInContext(this._yapi, next_hwid);
    }
    /**
     * Starts the enumeration of Total Volatile Organic Compound sensors currently accessible.
     * Use the method YTvoc.nextTvoc() to iterate on
     * next Total Volatile Organic Compound sensors.
     *
     * @return a pointer to a YTvoc object, corresponding to
     *         the first Total Volatile Organic Compound sensor currently online, or a null pointer
     *         if there are none.
     */
    static FirstTvoc() {
        let next_hwid = yocto_api_js_1.YAPI.imm_getFirstHardwareId('Tvoc');
        if (next_hwid == null)
            return null;
        return YTvoc.FindTvoc(next_hwid);
    }
    /**
     * Starts the enumeration of Total Volatile Organic Compound sensors currently accessible.
     * Use the method YTvoc.nextTvoc() to iterate on
     * next Total Volatile Organic Compound sensors.
     *
     * @param yctx : a YAPI context.
     *
     * @return a pointer to a YTvoc object, corresponding to
     *         the first Total Volatile Organic Compound sensor currently online, or a null pointer
     *         if there are none.
     */
    static FirstTvocInContext(yctx) {
        let next_hwid = yctx.imm_getFirstHardwareId('Tvoc');
        if (next_hwid == null)
            return null;
        return YTvoc.FindTvocInContext(yctx, next_hwid);
    }
}
exports.YTvoc = YTvoc;
//# sourceMappingURL=yocto_tvoc.js.map