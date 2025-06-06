/*********************************************************************
 *
 *  $Id: svn_id $
 *
 *  Implements the high-level API for LightSensor functions
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
//--- (YLightSensor class start)
/**
 * YLightSensor Class: light sensor control interface, available for instance in the Yocto-Light-V4,
 * the Yocto-Proximity or the Yocto-RangeFinder
 *
 * The YLightSensor class allows you to read and configure Yoctopuce light sensors.
 * It inherits from YSensor class the core functions to read measures,
 * to register callback functions, and to access the autonomous datalogger.
 * This class adds the ability to easily perform a one-point linear calibration
 * to compensate the effect of a glass or filter placed in front of the sensor.
 * For some light sensors with several working modes, this class can select the
 * desired working mode.
 */
//--- (end of YLightSensor class start)
export class YLightSensor extends YSensor {
    //--- (end of YLightSensor attributes declaration)
    constructor(yapi, func) {
        //--- (YLightSensor constructor)
        super(yapi, func);
        this._measureType = YLightSensor.MEASURETYPE_INVALID;
        this._valueCallbackLightSensor = null;
        this._timedReportCallbackLightSensor = null;
        // API symbols as object properties
        this.MEASURETYPE_HUMAN_EYE = 0;
        this.MEASURETYPE_WIDE_SPECTRUM = 1;
        this.MEASURETYPE_INFRARED = 2;
        this.MEASURETYPE_HIGH_RATE = 3;
        this.MEASURETYPE_HIGH_ENERGY = 4;
        this.MEASURETYPE_HIGH_RESOLUTION = 5;
        this.MEASURETYPE_INVALID = -1;
        this._className = 'LightSensor';
        //--- (end of YLightSensor constructor)
    }
    //--- (YLightSensor implementation)
    imm_parseAttr(name, val) {
        switch (name) {
            case 'measureType':
                this._measureType = val;
                return 1;
        }
        return super.imm_parseAttr(name, val);
    }
    async set_currentValue(newval) {
        let rest_val;
        rest_val = String(Math.round(newval * 65536.0));
        return await this._setAttr('currentValue', rest_val);
    }
    /**
     * Changes the sensor-specific calibration parameter so that the current value
     * matches a desired target (linear scaling).
     *
     * @param calibratedVal : the desired target value.
     *
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async calibrate(calibratedVal) {
        let rest_val;
        rest_val = String(Math.round(calibratedVal * 65536.0));
        return await this._setAttr('currentValue', rest_val);
    }
    /**
     * Returns the type of light measure.
     *
     * @return a value among YLightSensor.MEASURETYPE_HUMAN_EYE, YLightSensor.MEASURETYPE_WIDE_SPECTRUM,
     * YLightSensor.MEASURETYPE_INFRARED, YLightSensor.MEASURETYPE_HIGH_RATE,
     * YLightSensor.MEASURETYPE_HIGH_ENERGY and YLightSensor.MEASURETYPE_HIGH_RESOLUTION corresponding to
     * the type of light measure
     *
     * On failure, throws an exception or returns YLightSensor.MEASURETYPE_INVALID.
     */
    async get_measureType() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YLightSensor.MEASURETYPE_INVALID;
            }
        }
        res = this._measureType;
        return res;
    }
    /**
     * Changes the light sensor type used in the device. The measure can either
     * approximate the response of the human eye, focus on a specific light
     * spectrum, depending on the capabilities of the light-sensitive cell.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : a value among YLightSensor.MEASURETYPE_HUMAN_EYE,
     * YLightSensor.MEASURETYPE_WIDE_SPECTRUM, YLightSensor.MEASURETYPE_INFRARED,
     * YLightSensor.MEASURETYPE_HIGH_RATE, YLightSensor.MEASURETYPE_HIGH_ENERGY and
     * YLightSensor.MEASURETYPE_HIGH_RESOLUTION corresponding to the light sensor type used in the device
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_measureType(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('measureType', rest_val);
    }
    /**
     * Retrieves a light sensor for a given identifier.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the light sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YLightSensor.isOnline() to test if the light sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a light sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the light sensor, for instance
     *         LIGHTMK4.lightSensor.
     *
     * @return a YLightSensor object allowing you to drive the light sensor.
     */
    static FindLightSensor(func) {
        let obj;
        obj = YFunction._FindFromCache('LightSensor', func);
        if (obj == null) {
            obj = new YLightSensor(YAPI, func);
            YFunction._AddToCache('LightSensor', func, obj);
        }
        return obj;
    }
    /**
     * Retrieves a light sensor for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the light sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YLightSensor.isOnline() to test if the light sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a light sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx : a YAPI context
     * @param func : a string that uniquely characterizes the light sensor, for instance
     *         LIGHTMK4.lightSensor.
     *
     * @return a YLightSensor object allowing you to drive the light sensor.
     */
    static FindLightSensorInContext(yctx, func) {
        let obj;
        obj = YFunction._FindFromCacheInContext(yctx, 'LightSensor', func);
        if (obj == null) {
            obj = new YLightSensor(yctx, func);
            YFunction._AddToCache('LightSensor', func, obj);
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
            await YFunction._UpdateValueCallbackList(this, true);
        }
        else {
            await YFunction._UpdateValueCallbackList(this, false);
        }
        this._valueCallbackLightSensor = callback;
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
        if (this._valueCallbackLightSensor != null) {
            try {
                await this._valueCallbackLightSensor(this, value);
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
        this._timedReportCallbackLightSensor = callback;
        return 0;
    }
    async _invokeTimedReportCallback(value) {
        if (this._timedReportCallbackLightSensor != null) {
            try {
                await this._timedReportCallbackLightSensor(this, value);
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
     * Continues the enumeration of light sensors started using yFirstLightSensor().
     * Caution: You can't make any assumption about the returned light sensors order.
     * If you want to find a specific a light sensor, use LightSensor.findLightSensor()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YLightSensor object, corresponding to
     *         a light sensor currently online, or a null pointer
     *         if there are no more light sensors to enumerate.
     */
    nextLightSensor() {
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != YAPI.SUCCESS)
            return null;
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if (next_hwid == null)
            return null;
        return YLightSensor.FindLightSensorInContext(this._yapi, next_hwid);
    }
    /**
     * Starts the enumeration of light sensors currently accessible.
     * Use the method YLightSensor.nextLightSensor() to iterate on
     * next light sensors.
     *
     * @return a pointer to a YLightSensor object, corresponding to
     *         the first light sensor currently online, or a null pointer
     *         if there are none.
     */
    static FirstLightSensor() {
        let next_hwid = YAPI.imm_getFirstHardwareId('LightSensor');
        if (next_hwid == null)
            return null;
        return YLightSensor.FindLightSensor(next_hwid);
    }
    /**
     * Starts the enumeration of light sensors currently accessible.
     * Use the method YLightSensor.nextLightSensor() to iterate on
     * next light sensors.
     *
     * @param yctx : a YAPI context.
     *
     * @return a pointer to a YLightSensor object, corresponding to
     *         the first light sensor currently online, or a null pointer
     *         if there are none.
     */
    static FirstLightSensorInContext(yctx) {
        let next_hwid = yctx.imm_getFirstHardwareId('LightSensor');
        if (next_hwid == null)
            return null;
        return YLightSensor.FindLightSensorInContext(yctx, next_hwid);
    }
}
// API symbols as static members
YLightSensor.MEASURETYPE_HUMAN_EYE = 0;
YLightSensor.MEASURETYPE_WIDE_SPECTRUM = 1;
YLightSensor.MEASURETYPE_INFRARED = 2;
YLightSensor.MEASURETYPE_HIGH_RATE = 3;
YLightSensor.MEASURETYPE_HIGH_ENERGY = 4;
YLightSensor.MEASURETYPE_HIGH_RESOLUTION = 5;
YLightSensor.MEASURETYPE_INVALID = -1;
//# sourceMappingURL=yocto_lightsensor.js.map