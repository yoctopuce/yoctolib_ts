"use strict";
/*********************************************************************
 *
 *  $Id: yocto_multicellweighscale.ts 50689 2022-08-17 14:37:15Z mvuilleu $
 *
 *  Implements the high-level API for MultiCellWeighScale functions
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
exports.YMultiCellWeighScale = void 0;
const yocto_api_js_1 = require("./yocto_api.js");
//--- (YMultiCellWeighScale class start)
/**
 * YMultiCellWeighScale Class: multi-cell weighing scale sensor control interface, available for
 * instance in the Yocto-MaxiBridge
 *
 * The YMultiCellWeighScale class provides a weight measurement from a set of ratiometric
 * sensors. It can be used to control the bridge excitation parameters, in order to avoid
 * measure shifts caused by temperature variation in the electronics, and can also
 * automatically apply an additional correction factor based on temperature to
 * compensate for offsets in the load cells themselves.
 */
//--- (end of YMultiCellWeighScale class start)
class YMultiCellWeighScale extends yocto_api_js_1.YSensor {
    //--- (end of YMultiCellWeighScale attributes declaration)
    constructor(yapi, func) {
        //--- (YMultiCellWeighScale constructor)
        super(yapi, func);
        this._cellCount = YMultiCellWeighScale.CELLCOUNT_INVALID;
        this._externalSense = YMultiCellWeighScale.EXTERNALSENSE_INVALID;
        this._excitation = YMultiCellWeighScale.EXCITATION_INVALID;
        this._tempAvgAdaptRatio = YMultiCellWeighScale.TEMPAVGADAPTRATIO_INVALID;
        this._tempChgAdaptRatio = YMultiCellWeighScale.TEMPCHGADAPTRATIO_INVALID;
        this._compTempAvg = YMultiCellWeighScale.COMPTEMPAVG_INVALID;
        this._compTempChg = YMultiCellWeighScale.COMPTEMPCHG_INVALID;
        this._compensation = YMultiCellWeighScale.COMPENSATION_INVALID;
        this._zeroTracking = YMultiCellWeighScale.ZEROTRACKING_INVALID;
        this._command = YMultiCellWeighScale.COMMAND_INVALID;
        this._valueCallbackMultiCellWeighScale = null;
        this._timedReportCallbackMultiCellWeighScale = null;
        // API symbols as object properties
        this.CELLCOUNT_INVALID = yocto_api_js_1.YAPI.INVALID_UINT;
        this.EXTERNALSENSE_FALSE = 0;
        this.EXTERNALSENSE_TRUE = 1;
        this.EXTERNALSENSE_INVALID = -1;
        this.EXCITATION_OFF = 0;
        this.EXCITATION_DC = 1;
        this.EXCITATION_AC = 2;
        this.EXCITATION_INVALID = -1;
        this.TEMPAVGADAPTRATIO_INVALID = yocto_api_js_1.YAPI.INVALID_DOUBLE;
        this.TEMPCHGADAPTRATIO_INVALID = yocto_api_js_1.YAPI.INVALID_DOUBLE;
        this.COMPTEMPAVG_INVALID = yocto_api_js_1.YAPI.INVALID_DOUBLE;
        this.COMPTEMPCHG_INVALID = yocto_api_js_1.YAPI.INVALID_DOUBLE;
        this.COMPENSATION_INVALID = yocto_api_js_1.YAPI.INVALID_DOUBLE;
        this.ZEROTRACKING_INVALID = yocto_api_js_1.YAPI.INVALID_DOUBLE;
        this.COMMAND_INVALID = yocto_api_js_1.YAPI.INVALID_STRING;
        this._className = 'MultiCellWeighScale';
        //--- (end of YMultiCellWeighScale constructor)
    }
    //--- (YMultiCellWeighScale implementation)
    imm_parseAttr(name, val) {
        switch (name) {
            case 'cellCount':
                this._cellCount = val;
                return 1;
            case 'externalSense':
                this._externalSense = val;
                return 1;
            case 'excitation':
                this._excitation = val;
                return 1;
            case 'tempAvgAdaptRatio':
                this._tempAvgAdaptRatio = Math.round(val / 65.536) / 1000.0;
                return 1;
            case 'tempChgAdaptRatio':
                this._tempChgAdaptRatio = Math.round(val / 65.536) / 1000.0;
                return 1;
            case 'compTempAvg':
                this._compTempAvg = Math.round(val / 65.536) / 1000.0;
                return 1;
            case 'compTempChg':
                this._compTempChg = Math.round(val / 65.536) / 1000.0;
                return 1;
            case 'compensation':
                this._compensation = Math.round(val / 65.536) / 1000.0;
                return 1;
            case 'zeroTracking':
                this._zeroTracking = Math.round(val / 65.536) / 1000.0;
                return 1;
            case 'command':
                this._command = val;
                return 1;
        }
        return super.imm_parseAttr(name, val);
    }
    /**
     * Changes the measuring unit for the weight.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : a string corresponding to the measuring unit for the weight
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_unit(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('unit', rest_val);
    }
    /**
     * Returns the number of load cells in use.
     *
     * @return an integer corresponding to the number of load cells in use
     *
     * On failure, throws an exception or returns YMultiCellWeighScale.CELLCOUNT_INVALID.
     */
    async get_cellCount() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YMultiCellWeighScale.CELLCOUNT_INVALID;
            }
        }
        res = this._cellCount;
        return res;
    }
    /**
     * Changes the number of load cells in use. Remember to call the saveToFlash()
     * method of the module if the modification must be kept.
     *
     * @param newval : an integer corresponding to the number of load cells in use
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_cellCount(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('cellCount', rest_val);
    }
    /**
     * Returns true if entry 4 is used as external sense for 6-wires load cells.
     *
     * @return either YMultiCellWeighScale.EXTERNALSENSE_FALSE or YMultiCellWeighScale.EXTERNALSENSE_TRUE,
     * according to true if entry 4 is used as external sense for 6-wires load cells
     *
     * On failure, throws an exception or returns YMultiCellWeighScale.EXTERNALSENSE_INVALID.
     */
    async get_externalSense() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YMultiCellWeighScale.EXTERNALSENSE_INVALID;
            }
        }
        res = this._externalSense;
        return res;
    }
    /**
     * Changes the configuration to tell if entry 4 is used as external sense for
     * 6-wires load cells. Remember to call the saveToFlash() method of the
     * module if the modification must be kept.
     *
     * @param newval : either YMultiCellWeighScale.EXTERNALSENSE_FALSE or
     * YMultiCellWeighScale.EXTERNALSENSE_TRUE, according to the configuration to tell if entry 4 is used
     * as external sense for
     *         6-wires load cells
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_externalSense(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('externalSense', rest_val);
    }
    /**
     * Returns the current load cell bridge excitation method.
     *
     * @return a value among YMultiCellWeighScale.EXCITATION_OFF, YMultiCellWeighScale.EXCITATION_DC and
     * YMultiCellWeighScale.EXCITATION_AC corresponding to the current load cell bridge excitation method
     *
     * On failure, throws an exception or returns YMultiCellWeighScale.EXCITATION_INVALID.
     */
    async get_excitation() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YMultiCellWeighScale.EXCITATION_INVALID;
            }
        }
        res = this._excitation;
        return res;
    }
    /**
     * Changes the current load cell bridge excitation method.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : a value among YMultiCellWeighScale.EXCITATION_OFF,
     * YMultiCellWeighScale.EXCITATION_DC and YMultiCellWeighScale.EXCITATION_AC corresponding to the
     * current load cell bridge excitation method
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_excitation(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('excitation', rest_val);
    }
    /**
     * Changes the averaged temperature update rate, in per mille.
     * The purpose of this adaptation ratio is to model the thermal inertia of the load cell.
     * The averaged temperature is updated every 10 seconds, by applying this adaptation rate
     * to the difference between the measures ambient temperature and the current compensation
     * temperature. The standard rate is 0.2 per mille, and the maximal rate is 65 per mille.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : a floating point number corresponding to the averaged temperature update rate, in per mille
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_tempAvgAdaptRatio(newval) {
        let rest_val;
        rest_val = String(Math.round(newval * 65536.0));
        return await this._setAttr('tempAvgAdaptRatio', rest_val);
    }
    /**
     * Returns the averaged temperature update rate, in per mille.
     * The purpose of this adaptation ratio is to model the thermal inertia of the load cell.
     * The averaged temperature is updated every 10 seconds, by applying this adaptation rate
     * to the difference between the measures ambient temperature and the current compensation
     * temperature. The standard rate is 0.2 per mille, and the maximal rate is 65 per mille.
     *
     * @return a floating point number corresponding to the averaged temperature update rate, in per mille
     *
     * On failure, throws an exception or returns YMultiCellWeighScale.TEMPAVGADAPTRATIO_INVALID.
     */
    async get_tempAvgAdaptRatio() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YMultiCellWeighScale.TEMPAVGADAPTRATIO_INVALID;
            }
        }
        res = this._tempAvgAdaptRatio;
        return res;
    }
    /**
     * Changes the temperature change update rate, in per mille.
     * The temperature change is updated every 10 seconds, by applying this adaptation rate
     * to the difference between the measures ambient temperature and the current temperature used for
     * change compensation. The standard rate is 0.6 per mille, and the maximal rate is 65 per mille.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : a floating point number corresponding to the temperature change update rate, in per mille
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_tempChgAdaptRatio(newval) {
        let rest_val;
        rest_val = String(Math.round(newval * 65536.0));
        return await this._setAttr('tempChgAdaptRatio', rest_val);
    }
    /**
     * Returns the temperature change update rate, in per mille.
     * The temperature change is updated every 10 seconds, by applying this adaptation rate
     * to the difference between the measures ambient temperature and the current temperature used for
     * change compensation. The standard rate is 0.6 per mille, and the maximal rate is 65 per mille.
     *
     * @return a floating point number corresponding to the temperature change update rate, in per mille
     *
     * On failure, throws an exception or returns YMultiCellWeighScale.TEMPCHGADAPTRATIO_INVALID.
     */
    async get_tempChgAdaptRatio() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YMultiCellWeighScale.TEMPCHGADAPTRATIO_INVALID;
            }
        }
        res = this._tempChgAdaptRatio;
        return res;
    }
    /**
     * Returns the current averaged temperature, used for thermal compensation.
     *
     * @return a floating point number corresponding to the current averaged temperature, used for thermal compensation
     *
     * On failure, throws an exception or returns YMultiCellWeighScale.COMPTEMPAVG_INVALID.
     */
    async get_compTempAvg() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YMultiCellWeighScale.COMPTEMPAVG_INVALID;
            }
        }
        res = this._compTempAvg;
        return res;
    }
    /**
     * Returns the current temperature variation, used for thermal compensation.
     *
     * @return a floating point number corresponding to the current temperature variation, used for
     * thermal compensation
     *
     * On failure, throws an exception or returns YMultiCellWeighScale.COMPTEMPCHG_INVALID.
     */
    async get_compTempChg() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YMultiCellWeighScale.COMPTEMPCHG_INVALID;
            }
        }
        res = this._compTempChg;
        return res;
    }
    /**
     * Returns the current current thermal compensation value.
     *
     * @return a floating point number corresponding to the current current thermal compensation value
     *
     * On failure, throws an exception or returns YMultiCellWeighScale.COMPENSATION_INVALID.
     */
    async get_compensation() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YMultiCellWeighScale.COMPENSATION_INVALID;
            }
        }
        res = this._compensation;
        return res;
    }
    /**
     * Changes the zero tracking threshold value. When this threshold is larger than
     * zero, any measure under the threshold will automatically be ignored and the
     * zero compensation will be updated.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : a floating point number corresponding to the zero tracking threshold value
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_zeroTracking(newval) {
        let rest_val;
        rest_val = String(Math.round(newval * 65536.0));
        return await this._setAttr('zeroTracking', rest_val);
    }
    /**
     * Returns the zero tracking threshold value. When this threshold is larger than
     * zero, any measure under the threshold will automatically be ignored and the
     * zero compensation will be updated.
     *
     * @return a floating point number corresponding to the zero tracking threshold value
     *
     * On failure, throws an exception or returns YMultiCellWeighScale.ZEROTRACKING_INVALID.
     */
    async get_zeroTracking() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YMultiCellWeighScale.ZEROTRACKING_INVALID;
            }
        }
        res = this._zeroTracking;
        return res;
    }
    async get_command() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YMultiCellWeighScale.COMMAND_INVALID;
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
     * Retrieves a multi-cell weighing scale sensor for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the multi-cell weighing scale sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YMultiCellWeighScale.isOnline() to test if the multi-cell weighing scale sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a multi-cell weighing scale sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the multi-cell weighing scale sensor, for instance
     *         YWMBRDG1.multiCellWeighScale.
     *
     * @return a YMultiCellWeighScale object allowing you to drive the multi-cell weighing scale sensor.
     */
    static FindMultiCellWeighScale(func) {
        let obj;
        obj = yocto_api_js_1.YFunction._FindFromCache('MultiCellWeighScale', func);
        if (obj == null) {
            obj = new YMultiCellWeighScale(yocto_api_js_1.YAPI, func);
            yocto_api_js_1.YFunction._AddToCache('MultiCellWeighScale', func, obj);
        }
        return obj;
    }
    /**
     * Retrieves a multi-cell weighing scale sensor for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the multi-cell weighing scale sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YMultiCellWeighScale.isOnline() to test if the multi-cell weighing scale sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a multi-cell weighing scale sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx : a YAPI context
     * @param func : a string that uniquely characterizes the multi-cell weighing scale sensor, for instance
     *         YWMBRDG1.multiCellWeighScale.
     *
     * @return a YMultiCellWeighScale object allowing you to drive the multi-cell weighing scale sensor.
     */
    static FindMultiCellWeighScaleInContext(yctx, func) {
        let obj;
        obj = yocto_api_js_1.YFunction._FindFromCacheInContext(yctx, 'MultiCellWeighScale', func);
        if (obj == null) {
            obj = new YMultiCellWeighScale(yctx, func);
            yocto_api_js_1.YFunction._AddToCache('MultiCellWeighScale', func, obj);
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
        this._valueCallbackMultiCellWeighScale = callback;
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
        if (this._valueCallbackMultiCellWeighScale != null) {
            try {
                await this._valueCallbackMultiCellWeighScale(this, value);
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
        this._timedReportCallbackMultiCellWeighScale = callback;
        return 0;
    }
    async _invokeTimedReportCallback(value) {
        if (this._timedReportCallbackMultiCellWeighScale != null) {
            try {
                await this._timedReportCallbackMultiCellWeighScale(this, value);
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
     * Adapts the load cell signal bias (stored in the corresponding genericSensor)
     * so that the current signal corresponds to a zero weight. Remember to call the
     * saveToFlash() method of the module if the modification must be kept.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async tare() {
        return await this.set_command('T');
    }
    /**
     * Configures the load cells span parameters (stored in the corresponding genericSensors)
     * so that the current signal corresponds to the specified reference weight.
     *
     * @param currWeight : reference weight presently on the load cell.
     * @param maxWeight : maximum weight to be expected on the load cell.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async setupSpan(currWeight, maxWeight) {
        return await this.set_command('S' + String(Math.round(Math.round(1000 * currWeight))) + ':' + String(Math.round(Math.round(1000 * maxWeight))));
    }
    /**
     * Continues the enumeration of multi-cell weighing scale sensors started using yFirstMultiCellWeighScale().
     * Caution: You can't make any assumption about the returned multi-cell weighing scale sensors order.
     * If you want to find a specific a multi-cell weighing scale sensor, use
     * MultiCellWeighScale.findMultiCellWeighScale()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YMultiCellWeighScale object, corresponding to
     *         a multi-cell weighing scale sensor currently online, or a null pointer
     *         if there are no more multi-cell weighing scale sensors to enumerate.
     */
    nextMultiCellWeighScale() {
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != yocto_api_js_1.YAPI.SUCCESS)
            return null;
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if (next_hwid == null)
            return null;
        return YMultiCellWeighScale.FindMultiCellWeighScaleInContext(this._yapi, next_hwid);
    }
    /**
     * Starts the enumeration of multi-cell weighing scale sensors currently accessible.
     * Use the method YMultiCellWeighScale.nextMultiCellWeighScale() to iterate on
     * next multi-cell weighing scale sensors.
     *
     * @return a pointer to a YMultiCellWeighScale object, corresponding to
     *         the first multi-cell weighing scale sensor currently online, or a null pointer
     *         if there are none.
     */
    static FirstMultiCellWeighScale() {
        let next_hwid = yocto_api_js_1.YAPI.imm_getFirstHardwareId('MultiCellWeighScale');
        if (next_hwid == null)
            return null;
        return YMultiCellWeighScale.FindMultiCellWeighScale(next_hwid);
    }
    /**
     * Starts the enumeration of multi-cell weighing scale sensors currently accessible.
     * Use the method YMultiCellWeighScale.nextMultiCellWeighScale() to iterate on
     * next multi-cell weighing scale sensors.
     *
     * @param yctx : a YAPI context.
     *
     * @return a pointer to a YMultiCellWeighScale object, corresponding to
     *         the first multi-cell weighing scale sensor currently online, or a null pointer
     *         if there are none.
     */
    static FirstMultiCellWeighScaleInContext(yctx) {
        let next_hwid = yctx.imm_getFirstHardwareId('MultiCellWeighScale');
        if (next_hwid == null)
            return null;
        return YMultiCellWeighScale.FindMultiCellWeighScaleInContext(yctx, next_hwid);
    }
}
exports.YMultiCellWeighScale = YMultiCellWeighScale;
// API symbols as static members
YMultiCellWeighScale.CELLCOUNT_INVALID = yocto_api_js_1.YAPI.INVALID_UINT;
YMultiCellWeighScale.EXTERNALSENSE_FALSE = 0;
YMultiCellWeighScale.EXTERNALSENSE_TRUE = 1;
YMultiCellWeighScale.EXTERNALSENSE_INVALID = -1;
YMultiCellWeighScale.EXCITATION_OFF = 0;
YMultiCellWeighScale.EXCITATION_DC = 1;
YMultiCellWeighScale.EXCITATION_AC = 2;
YMultiCellWeighScale.EXCITATION_INVALID = -1;
YMultiCellWeighScale.TEMPAVGADAPTRATIO_INVALID = yocto_api_js_1.YAPI.INVALID_DOUBLE;
YMultiCellWeighScale.TEMPCHGADAPTRATIO_INVALID = yocto_api_js_1.YAPI.INVALID_DOUBLE;
YMultiCellWeighScale.COMPTEMPAVG_INVALID = yocto_api_js_1.YAPI.INVALID_DOUBLE;
YMultiCellWeighScale.COMPTEMPCHG_INVALID = yocto_api_js_1.YAPI.INVALID_DOUBLE;
YMultiCellWeighScale.COMPENSATION_INVALID = yocto_api_js_1.YAPI.INVALID_DOUBLE;
YMultiCellWeighScale.ZEROTRACKING_INVALID = yocto_api_js_1.YAPI.INVALID_DOUBLE;
YMultiCellWeighScale.COMMAND_INVALID = yocto_api_js_1.YAPI.INVALID_STRING;
//# sourceMappingURL=yocto_multicellweighscale.js.map