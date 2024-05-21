"use strict";
/*********************************************************************
 *
 *  $Id: yocto_weighscale.ts 60419 2024-04-08 09:53:37Z seb $
 *
 *  Implements the high-level API for WeighScale functions
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
exports.YWeighScale = void 0;
const yocto_api_js_1 = require("./yocto_api.js");
//--- (YWeighScale class start)
/**
 * YWeighScale Class: weighing scale sensor control interface, available for instance in the
 * Yocto-Bridge or the Yocto-MaxiBridge
 *
 * The YWeighScale class provides a weight measurement from a ratiometric sensor.
 * It can be used to control the bridge excitation parameters, in order to avoid
 * measure shifts caused by temperature variation in the electronics, and can also
 * automatically apply an additional correction factor based on temperature to
 * compensate for offsets in the load cell itself.
 */
//--- (end of YWeighScale class start)
class YWeighScale extends yocto_api_js_1.YSensor {
    //--- (end of YWeighScale attributes declaration)
    constructor(yapi, func) {
        //--- (YWeighScale constructor)
        super(yapi, func);
        this._excitation = YWeighScale.EXCITATION_INVALID;
        this._tempAvgAdaptRatio = YWeighScale.TEMPAVGADAPTRATIO_INVALID;
        this._tempChgAdaptRatio = YWeighScale.TEMPCHGADAPTRATIO_INVALID;
        this._compTempAvg = YWeighScale.COMPTEMPAVG_INVALID;
        this._compTempChg = YWeighScale.COMPTEMPCHG_INVALID;
        this._compensation = YWeighScale.COMPENSATION_INVALID;
        this._zeroTracking = YWeighScale.ZEROTRACKING_INVALID;
        this._command = YWeighScale.COMMAND_INVALID;
        this._valueCallbackWeighScale = null;
        this._timedReportCallbackWeighScale = null;
        // API symbols as object properties
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
        this._className = 'WeighScale';
        //--- (end of YWeighScale constructor)
    }
    //--- (YWeighScale implementation)
    imm_parseAttr(name, val) {
        switch (name) {
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
     * Returns the current load cell bridge excitation method.
     *
     * @return a value among YWeighScale.EXCITATION_OFF, YWeighScale.EXCITATION_DC and
     * YWeighScale.EXCITATION_AC corresponding to the current load cell bridge excitation method
     *
     * On failure, throws an exception or returns YWeighScale.EXCITATION_INVALID.
     */
    async get_excitation() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YWeighScale.EXCITATION_INVALID;
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
     * @param newval : a value among YWeighScale.EXCITATION_OFF, YWeighScale.EXCITATION_DC and
     * YWeighScale.EXCITATION_AC corresponding to the current load cell bridge excitation method
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
     * On failure, throws an exception or returns YWeighScale.TEMPAVGADAPTRATIO_INVALID.
     */
    async get_tempAvgAdaptRatio() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YWeighScale.TEMPAVGADAPTRATIO_INVALID;
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
     * On failure, throws an exception or returns YWeighScale.TEMPCHGADAPTRATIO_INVALID.
     */
    async get_tempChgAdaptRatio() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YWeighScale.TEMPCHGADAPTRATIO_INVALID;
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
     * On failure, throws an exception or returns YWeighScale.COMPTEMPAVG_INVALID.
     */
    async get_compTempAvg() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YWeighScale.COMPTEMPAVG_INVALID;
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
     * On failure, throws an exception or returns YWeighScale.COMPTEMPCHG_INVALID.
     */
    async get_compTempChg() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YWeighScale.COMPTEMPCHG_INVALID;
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
     * On failure, throws an exception or returns YWeighScale.COMPENSATION_INVALID.
     */
    async get_compensation() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YWeighScale.COMPENSATION_INVALID;
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
     * On failure, throws an exception or returns YWeighScale.ZEROTRACKING_INVALID.
     */
    async get_zeroTracking() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YWeighScale.ZEROTRACKING_INVALID;
            }
        }
        res = this._zeroTracking;
        return res;
    }
    async get_command() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YWeighScale.COMMAND_INVALID;
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
     * Retrieves a weighing scale sensor for a given identifier.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the weighing scale sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YWeighScale.isOnline() to test if the weighing scale sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a weighing scale sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the weighing scale sensor, for instance
     *         YWBRIDG1.weighScale1.
     *
     * @return a YWeighScale object allowing you to drive the weighing scale sensor.
     */
    static FindWeighScale(func) {
        let obj;
        obj = yocto_api_js_1.YFunction._FindFromCache('WeighScale', func);
        if (obj == null) {
            obj = new YWeighScale(yocto_api_js_1.YAPI, func);
            yocto_api_js_1.YFunction._AddToCache('WeighScale', func, obj);
        }
        return obj;
    }
    /**
     * Retrieves a weighing scale sensor for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the weighing scale sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YWeighScale.isOnline() to test if the weighing scale sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a weighing scale sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx : a YAPI context
     * @param func : a string that uniquely characterizes the weighing scale sensor, for instance
     *         YWBRIDG1.weighScale1.
     *
     * @return a YWeighScale object allowing you to drive the weighing scale sensor.
     */
    static FindWeighScaleInContext(yctx, func) {
        let obj;
        obj = yocto_api_js_1.YFunction._FindFromCacheInContext(yctx, 'WeighScale', func);
        if (obj == null) {
            obj = new YWeighScale(yctx, func);
            yocto_api_js_1.YFunction._AddToCache('WeighScale', func, obj);
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
        this._valueCallbackWeighScale = callback;
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
        if (this._valueCallbackWeighScale != null) {
            try {
                await this._valueCallbackWeighScale(this, value);
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
        this._timedReportCallbackWeighScale = callback;
        return 0;
    }
    async _invokeTimedReportCallback(value) {
        if (this._timedReportCallbackWeighScale != null) {
            try {
                await this._timedReportCallbackWeighScale(this, value);
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
     * Configures the load cell span parameters (stored in the corresponding genericSensor)
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
    async setCompensationTable(tableIndex, tempValues, compValues) {
        let siz;
        let res;
        let idx;
        let found;
        let prev;
        let curr;
        let currComp;
        let idxTemp;
        siz = tempValues.length;
        if (!(siz != 1)) {
            return this._throw(this._yapi.INVALID_ARGUMENT, 'thermal compensation table must have at least two points', this._yapi.INVALID_ARGUMENT);
        }
        if (!(siz == compValues.length)) {
            return this._throw(this._yapi.INVALID_ARGUMENT, 'table sizes mismatch', this._yapi.INVALID_ARGUMENT);
        }
        res = await this.set_command(String(Math.round(tableIndex)) + 'Z');
        if (!(res == this._yapi.SUCCESS)) {
            return this._throw(this._yapi.IO_ERROR, 'unable to reset thermal compensation table', this._yapi.IO_ERROR);
        }
        // add records in growing temperature value
        found = 1;
        prev = -999999.0;
        while (found > 0) {
            found = 0;
            curr = 99999999.0;
            currComp = -999999.0;
            idx = 0;
            while (idx < siz) {
                idxTemp = tempValues[idx];
                if ((idxTemp > prev) && (idxTemp < curr)) {
                    curr = idxTemp;
                    currComp = compValues[idx];
                    found = 1;
                }
                idx = idx + 1;
            }
            if (found > 0) {
                res = await this.set_command(String(Math.round(tableIndex)) + 'm' + String(Math.round(Math.round(1000 * curr))) + ':' + String(Math.round(Math.round(1000 * currComp))));
                if (!(res == this._yapi.SUCCESS)) {
                    return this._throw(this._yapi.IO_ERROR, 'unable to set thermal compensation table', this._yapi.IO_ERROR);
                }
                prev = curr;
            }
        }
        return this._yapi.SUCCESS;
    }
    async loadCompensationTable(tableIndex, tempValues, compValues) {
        let id;
        let bin_json;
        let paramlist = [];
        let siz;
        let idx;
        let temp;
        let comp;
        id = await this.get_functionId();
        id = (id).substr(10, (id).length - 10);
        bin_json = await this._download('extra.json?page=' + String(Math.round((4 * yocto_api_js_1.YAPIContext.imm_atoi(id)) + tableIndex)));
        paramlist = this.imm_json_get_array(bin_json);
        // convert all values to float and append records
        siz = ((paramlist.length) >> (1));
        tempValues.length = 0;
        compValues.length = 0;
        idx = 0;
        while (idx < siz) {
            temp = yocto_api_js_1.YAPIContext.imm_atof(paramlist[2 * idx]) / 1000.0;
            comp = yocto_api_js_1.YAPIContext.imm_atof(paramlist[2 * idx + 1]) / 1000.0;
            tempValues.push(temp);
            compValues.push(comp);
            idx = idx + 1;
        }
        return this._yapi.SUCCESS;
    }
    /**
     * Records a weight offset thermal compensation table, in order to automatically correct the
     * measured weight based on the averaged compensation temperature.
     * The weight correction will be applied by linear interpolation between specified points.
     *
     * @param tempValues : array of floating point numbers, corresponding to all averaged
     *         temperatures for which an offset correction is specified.
     * @param compValues : array of floating point numbers, corresponding to the offset correction
     *         to apply for each of the temperature included in the first
     *         argument, index by index.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_offsetAvgCompensationTable(tempValues, compValues) {
        return await this.setCompensationTable(0, tempValues, compValues);
    }
    /**
     * Retrieves the weight offset thermal compensation table previously configured using the
     * set_offsetAvgCompensationTable function.
     * The weight correction is applied by linear interpolation between specified points.
     *
     * @param tempValues : array of floating point numbers, that is filled by the function
     *         with all averaged temperatures for which an offset correction is specified.
     * @param compValues : array of floating point numbers, that is filled by the function
     *         with the offset correction applied for each of the temperature
     *         included in the first argument, index by index.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async loadOffsetAvgCompensationTable(tempValues, compValues) {
        return await this.loadCompensationTable(0, tempValues, compValues);
    }
    /**
     * Records a weight offset thermal compensation table, in order to automatically correct the
     * measured weight based on the variation of temperature.
     * The weight correction will be applied by linear interpolation between specified points.
     *
     * @param tempValues : array of floating point numbers, corresponding to temperature
     *         variations for which an offset correction is specified.
     * @param compValues : array of floating point numbers, corresponding to the offset correction
     *         to apply for each of the temperature variation included in the first
     *         argument, index by index.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_offsetChgCompensationTable(tempValues, compValues) {
        return await this.setCompensationTable(1, tempValues, compValues);
    }
    /**
     * Retrieves the weight offset thermal compensation table previously configured using the
     * set_offsetChgCompensationTable function.
     * The weight correction is applied by linear interpolation between specified points.
     *
     * @param tempValues : array of floating point numbers, that is filled by the function
     *         with all temperature variations for which an offset correction is specified.
     * @param compValues : array of floating point numbers, that is filled by the function
     *         with the offset correction applied for each of the temperature
     *         variation included in the first argument, index by index.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async loadOffsetChgCompensationTable(tempValues, compValues) {
        return await this.loadCompensationTable(1, tempValues, compValues);
    }
    /**
     * Records a weight span thermal compensation table, in order to automatically correct the
     * measured weight based on the compensation temperature.
     * The weight correction will be applied by linear interpolation between specified points.
     *
     * @param tempValues : array of floating point numbers, corresponding to all averaged
     *         temperatures for which a span correction is specified.
     * @param compValues : array of floating point numbers, corresponding to the span correction
     *         (in percents) to apply for each of the temperature included in the first
     *         argument, index by index.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_spanAvgCompensationTable(tempValues, compValues) {
        return await this.setCompensationTable(2, tempValues, compValues);
    }
    /**
     * Retrieves the weight span thermal compensation table previously configured using the
     * set_spanAvgCompensationTable function.
     * The weight correction is applied by linear interpolation between specified points.
     *
     * @param tempValues : array of floating point numbers, that is filled by the function
     *         with all averaged temperatures for which an span correction is specified.
     * @param compValues : array of floating point numbers, that is filled by the function
     *         with the span correction applied for each of the temperature
     *         included in the first argument, index by index.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async loadSpanAvgCompensationTable(tempValues, compValues) {
        return await this.loadCompensationTable(2, tempValues, compValues);
    }
    /**
     * Records a weight span thermal compensation table, in order to automatically correct the
     * measured weight based on the variation of temperature.
     * The weight correction will be applied by linear interpolation between specified points.
     *
     * @param tempValues : array of floating point numbers, corresponding to all variations of
     *         temperatures for which a span correction is specified.
     * @param compValues : array of floating point numbers, corresponding to the span correction
     *         (in percents) to apply for each of the temperature variation included
     *         in the first argument, index by index.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_spanChgCompensationTable(tempValues, compValues) {
        return await this.setCompensationTable(3, tempValues, compValues);
    }
    /**
     * Retrieves the weight span thermal compensation table previously configured using the
     * set_spanChgCompensationTable function.
     * The weight correction is applied by linear interpolation between specified points.
     *
     * @param tempValues : array of floating point numbers, that is filled by the function
     *         with all variation of temperature for which an span correction is specified.
     * @param compValues : array of floating point numbers, that is filled by the function
     *         with the span correction applied for each of variation of temperature
     *         included in the first argument, index by index.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async loadSpanChgCompensationTable(tempValues, compValues) {
        return await this.loadCompensationTable(3, tempValues, compValues);
    }
    /**
     * Continues the enumeration of weighing scale sensors started using yFirstWeighScale().
     * Caution: You can't make any assumption about the returned weighing scale sensors order.
     * If you want to find a specific a weighing scale sensor, use WeighScale.findWeighScale()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YWeighScale object, corresponding to
     *         a weighing scale sensor currently online, or a null pointer
     *         if there are no more weighing scale sensors to enumerate.
     */
    nextWeighScale() {
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != yocto_api_js_1.YAPI.SUCCESS)
            return null;
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if (next_hwid == null)
            return null;
        return YWeighScale.FindWeighScaleInContext(this._yapi, next_hwid);
    }
    /**
     * Starts the enumeration of weighing scale sensors currently accessible.
     * Use the method YWeighScale.nextWeighScale() to iterate on
     * next weighing scale sensors.
     *
     * @return a pointer to a YWeighScale object, corresponding to
     *         the first weighing scale sensor currently online, or a null pointer
     *         if there are none.
     */
    static FirstWeighScale() {
        let next_hwid = yocto_api_js_1.YAPI.imm_getFirstHardwareId('WeighScale');
        if (next_hwid == null)
            return null;
        return YWeighScale.FindWeighScale(next_hwid);
    }
    /**
     * Starts the enumeration of weighing scale sensors currently accessible.
     * Use the method YWeighScale.nextWeighScale() to iterate on
     * next weighing scale sensors.
     *
     * @param yctx : a YAPI context.
     *
     * @return a pointer to a YWeighScale object, corresponding to
     *         the first weighing scale sensor currently online, or a null pointer
     *         if there are none.
     */
    static FirstWeighScaleInContext(yctx) {
        let next_hwid = yctx.imm_getFirstHardwareId('WeighScale');
        if (next_hwid == null)
            return null;
        return YWeighScale.FindWeighScaleInContext(yctx, next_hwid);
    }
}
exports.YWeighScale = YWeighScale;
// API symbols as static members
YWeighScale.EXCITATION_OFF = 0;
YWeighScale.EXCITATION_DC = 1;
YWeighScale.EXCITATION_AC = 2;
YWeighScale.EXCITATION_INVALID = -1;
YWeighScale.TEMPAVGADAPTRATIO_INVALID = yocto_api_js_1.YAPI.INVALID_DOUBLE;
YWeighScale.TEMPCHGADAPTRATIO_INVALID = yocto_api_js_1.YAPI.INVALID_DOUBLE;
YWeighScale.COMPTEMPAVG_INVALID = yocto_api_js_1.YAPI.INVALID_DOUBLE;
YWeighScale.COMPTEMPCHG_INVALID = yocto_api_js_1.YAPI.INVALID_DOUBLE;
YWeighScale.COMPENSATION_INVALID = yocto_api_js_1.YAPI.INVALID_DOUBLE;
YWeighScale.ZEROTRACKING_INVALID = yocto_api_js_1.YAPI.INVALID_DOUBLE;
YWeighScale.COMMAND_INVALID = yocto_api_js_1.YAPI.INVALID_STRING;
//# sourceMappingURL=yocto_weighscale.js.map