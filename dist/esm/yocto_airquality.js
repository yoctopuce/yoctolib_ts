/*********************************************************************
 *
 *  $Id: svn_id $
 *
 *  Implements the high-level API for AirQuality functions
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
//--- (YAirQuality class start)
/**
 * YAirQuality Class: air quality sensor control interface
 *
 * The YAirQuality class allows you to read and configure Yoctopuce air quality sensors.
 * It inherits from YSensor class the core functions to read measurements,
 * to register callback functions, and to access the autonomous datalogger.
 */
//--- (end of YAirQuality class start)
export class YAirQuality extends YSensor {
    //--- (end of YAirQuality attributes declaration)
    constructor(yapi, func) {
        //--- (YAirQuality constructor)
        super(yapi, func);
        this._ubaIndex = YAirQuality.UBAINDEX_INVALID;
        this._relativeIndex = YAirQuality.RELATIVEINDEX_INVALID;
        this._aqiMode = YAirQuality.AQIMODE_INVALID;
        this._valueCallbackAirQuality = null;
        this._timedReportCallbackAirQuality = null;
        // API symbols as object properties
        this.UBAINDEX_INVALID = YAPI.INVALID_DOUBLE;
        this.RELATIVEINDEX_INVALID = YAPI.INVALID_DOUBLE;
        this.AQIMODE_RELATIVE = 0;
        this.AQIMODE_UBA = 1;
        this.AQIMODE_INVALID = -1;
        this._className = 'AirQuality';
        //--- (end of YAirQuality constructor)
    }
    //--- (YAirQuality implementation)
    imm_parseAttr(name, val) {
        switch (name) {
            case 'ubaIndex':
                this._ubaIndex = Math.round(val / 65.536) / 1000.0;
                return 1;
            case 'relativeIndex':
                this._relativeIndex = Math.round(val / 65.536) / 1000.0;
                return 1;
            case 'aqiMode':
                this._aqiMode = val;
                return 1;
        }
        return super.imm_parseAttr(name, val);
    }
    /**
     * Returns the current air quality index, according to UBA (from 1 to 5).
     *
     * @return a floating point number corresponding to the current air quality index, according to UBA (from 1 to 5)
     *
     * On failure, throws an exception or returns YAirQuality.UBAINDEX_INVALID.
     */
    async get_ubaIndex() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YAirQuality.UBAINDEX_INVALID;
            }
        }
        res = this._ubaIndex;
        return res;
    }
    /**
     * Returns the relative air quality index, according to ScioSense (from 0 to 500).
     * A value below 100 indicates better-than-average air quality compared to the past 24 hours,
     * while a value above 100 indicates poorer-than-average air quality compared to the past 24 hours.
     *
     * @return a floating point number corresponding to the relative air quality index, according to
     * ScioSense (from 0 to 500)
     *
     * On failure, throws an exception or returns YAirQuality.RELATIVEINDEX_INVALID.
     */
    async get_relativeIndex() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YAirQuality.RELATIVEINDEX_INVALID;
            }
        }
        res = this._relativeIndex;
        return res;
    }
    /**
     * Returns the type of index reported by the get_currentValue function and callbacks (UBA index or relative index).
     *
     * @return either YAirQuality.AQIMODE_RELATIVE or YAirQuality.AQIMODE_UBA, according to the type of
     * index reported by the get_currentValue function and callbacks (UBA index or relative index)
     *
     * On failure, throws an exception or returns YAirQuality.AQIMODE_INVALID.
     */
    async get_aqiMode() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YAirQuality.AQIMODE_INVALID;
            }
        }
        res = this._aqiMode;
        return res;
    }
    /**
     * Changes the the type of index reported by the get_currentValue function and callbacks (UBA index or
     * relative index).
     * Remember to call the saveToFlash() method of the module if the modification must be kept.
     *
     * @param newval : either YAirQuality.AQIMODE_RELATIVE or YAirQuality.AQIMODE_UBA, according to the
     * the type of index reported by the get_currentValue function and callbacks (UBA index or relative index)
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_aqiMode(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('aqiMode', rest_val);
    }
    /**
     * Retrieves a air quality sensor for a given identifier.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the air quality sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YAirQuality.isOnline() to test if the air quality sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a air quality sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the air quality sensor, for instance
     *         MyDevice.airQuality.
     *
     * @return a YAirQuality object allowing you to drive the air quality sensor.
     */
    static FindAirQuality(func) {
        let obj;
        obj = YFunction._FindFromCache('AirQuality', func);
        if (obj == null) {
            obj = new YAirQuality(YAPI, func);
            YFunction._AddToCache('AirQuality', func, obj);
        }
        return obj;
    }
    /**
     * Retrieves a air quality sensor for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the air quality sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YAirQuality.isOnline() to test if the air quality sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a air quality sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx : a YAPI context
     * @param func : a string that uniquely characterizes the air quality sensor, for instance
     *         MyDevice.airQuality.
     *
     * @return a YAirQuality object allowing you to drive the air quality sensor.
     */
    static FindAirQualityInContext(yctx, func) {
        let obj;
        obj = YFunction._FindFromCacheInContext(yctx, 'AirQuality', func);
        if (obj == null) {
            obj = new YAirQuality(yctx, func);
            YFunction._AddToCache('AirQuality', func, obj);
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
        this._valueCallbackAirQuality = callback;
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
        if (this._valueCallbackAirQuality != null) {
            try {
                await this._valueCallbackAirQuality(this, value);
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
        this._timedReportCallbackAirQuality = callback;
        return 0;
    }
    async _invokeTimedReportCallback(value) {
        if (this._timedReportCallbackAirQuality != null) {
            try {
                await this._timedReportCallbackAirQuality(this, value);
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
     * Continues the enumeration of air quality sensors started using yFirstAirQuality().
     * Caution: You can't make any assumption about the returned air quality sensors order.
     * If you want to find a specific a air quality sensor, use AirQuality.findAirQuality()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YAirQuality object, corresponding to
     *         a air quality sensor currently online, or a null pointer
     *         if there are no more air quality sensors to enumerate.
     */
    nextAirQuality() {
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != YAPI.SUCCESS)
            return null;
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if (next_hwid == null)
            return null;
        return YAirQuality.FindAirQualityInContext(this._yapi, next_hwid);
    }
    /**
     * Starts the enumeration of air quality sensors currently accessible.
     * Use the method YAirQuality.nextAirQuality() to iterate on
     * next air quality sensors.
     *
     * @return a pointer to a YAirQuality object, corresponding to
     *         the first air quality sensor currently online, or a null pointer
     *         if there are none.
     */
    static FirstAirQuality() {
        let next_hwid = YAPI.imm_getFirstHardwareId('AirQuality');
        if (next_hwid == null)
            return null;
        return YAirQuality.FindAirQuality(next_hwid);
    }
    /**
     * Starts the enumeration of air quality sensors currently accessible.
     * Use the method YAirQuality.nextAirQuality() to iterate on
     * next air quality sensors.
     *
     * @param yctx : a YAPI context.
     *
     * @return a pointer to a YAirQuality object, corresponding to
     *         the first air quality sensor currently online, or a null pointer
     *         if there are none.
     */
    static FirstAirQualityInContext(yctx) {
        let next_hwid = yctx.imm_getFirstHardwareId('AirQuality');
        if (next_hwid == null)
            return null;
        return YAirQuality.FindAirQualityInContext(yctx, next_hwid);
    }
}
// API symbols as static members
YAirQuality.UBAINDEX_INVALID = YAPI.INVALID_DOUBLE;
YAirQuality.RELATIVEINDEX_INVALID = YAPI.INVALID_DOUBLE;
YAirQuality.AQIMODE_RELATIVE = 0;
YAirQuality.AQIMODE_UBA = 1;
YAirQuality.AQIMODE_INVALID = -1;
//# sourceMappingURL=yocto_airquality.js.map