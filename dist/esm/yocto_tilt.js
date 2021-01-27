/*********************************************************************
 *
 *  $Id: yocto_tilt.ts 43483 2021-01-21 15:47:50Z mvuilleu $
 *
 *  Implements the high-level API for Tilt functions
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
//--- (end of YTilt definitions)
//--- (YTilt class start)
/**
 * YTilt Class: tilt sensor control interface, available for instance in the Yocto-3D-V2 or the Yocto-Inclinometer
 *
 * The YSensor class is the parent class for all Yoctopuce sensor types. It can be
 * used to read the current value and unit of any sensor, read the min/max
 * value, configure autonomous recording frequency and access recorded data.
 * It also provide a function to register a callback invoked each time the
 * observed value changes, or at a predefined interval. Using this class rather
 * than a specific subclass makes it possible to create generic applications
 * that work with any Yoctopuce sensor, even those that do not yet exist.
 * Note: The YAnButton class is the only analog input which does not inherit
 * from YSensor.
 */
//--- (end of YTilt class start)
export class YTilt extends YSensor {
    //--- (end of YTilt attributes declaration)
    //--- (YTilt return codes)
    //--- (end of YTilt return codes)
    constructor(yapi, func) {
        //--- (YTilt constructor)
        super(yapi, func);
        this._bandwidth = YTilt.BANDWIDTH_INVALID;
        this._axis = YTilt.AXIS_INVALID;
        this._valueCallbackTilt = null;
        this._timedReportCallbackTilt = null;
        // API symbols as object properties
        this.BANDWIDTH_INVALID = YAPI.INVALID_UINT;
        this.AXIS_X = 0 /* X */;
        this.AXIS_Y = 1 /* Y */;
        this.AXIS_Z = 2 /* Z */;
        this.AXIS_INVALID = -1 /* INVALID */;
        this._className = 'Tilt';
        //--- (end of YTilt constructor)
    }
    //--- (YTilt implementation)
    imm_parseAttr(name, val) {
        switch (name) {
            case 'bandwidth':
                this._bandwidth = val;
                return 1;
            case 'axis':
                this._axis = val;
                return 1;
        }
        return super.imm_parseAttr(name, val);
    }
    /**
     * Returns the measure update frequency, measured in Hz.
     *
     * @return an integer corresponding to the measure update frequency, measured in Hz
     *
     * On failure, throws an exception or returns YTilt.BANDWIDTH_INVALID.
     */
    async get_bandwidth() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YTilt.BANDWIDTH_INVALID;
            }
        }
        res = this._bandwidth;
        return res;
    }
    /**
     * Changes the measure update frequency, measured in Hz. When the
     * frequency is lower, the device performs averaging.
     * Remember to call the saveToFlash()
     * method of the module if the modification must be kept.
     *
     * @param newval : an integer corresponding to the measure update frequency, measured in Hz
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_bandwidth(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('bandwidth', rest_val);
    }
    async get_axis() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YTilt.AXIS_INVALID;
            }
        }
        res = this._axis;
        return res;
    }
    /**
     * Retrieves a tilt sensor for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the tilt sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YTilt.isOnline() to test if the tilt sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a tilt sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the tilt sensor, for instance
     *         Y3DMK002.tilt1.
     *
     * @return a YTilt object allowing you to drive the tilt sensor.
     */
    static FindTilt(func) {
        let obj;
        obj = YFunction._FindFromCache('Tilt', func);
        if (obj == null) {
            obj = new YTilt(YAPI, func);
            YFunction._AddToCache('Tilt', func, obj);
        }
        return obj;
    }
    /**
     * Retrieves a tilt sensor for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the tilt sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YTilt.isOnline() to test if the tilt sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a tilt sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx : a YAPI context
     * @param func : a string that uniquely characterizes the tilt sensor, for instance
     *         Y3DMK002.tilt1.
     *
     * @return a YTilt object allowing you to drive the tilt sensor.
     */
    static FindTiltInContext(yctx, func) {
        let obj;
        obj = YFunction._FindFromCacheInContext(yctx, 'Tilt', func);
        if (obj == null) {
            obj = new YTilt(yctx, func);
            YFunction._AddToCache('Tilt', func, obj);
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
        this._valueCallbackTilt = callback;
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
        if (this._valueCallbackTilt != null) {
            try {
                await this._valueCallbackTilt(this, value);
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
            await YFunction._UpdateTimedReportCallbackList(sensor, true);
        }
        else {
            await YFunction._UpdateTimedReportCallbackList(sensor, false);
        }
        this._timedReportCallbackTilt = callback;
        return 0;
    }
    async _invokeTimedReportCallback(value) {
        if (this._timedReportCallbackTilt != null) {
            try {
                await this._timedReportCallbackTilt(this, value);
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
     * Performs a zero calibration for the tilt measurement (Yocto-Inclinometer only).
     * When this method is invoked, a simple shift (translation)
     * is applied so that the current position is reported as a zero angle.
     * Be aware that this shift will also affect the measurement boundaries.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async calibrateToZero() {
        let currentRawVal;
        let rawVals = [];
        let refVals = [];
        currentRawVal = await this.get_currentRawValue();
        rawVals.length = 0;
        refVals.length = 0;
        rawVals.push(currentRawVal);
        refVals.push(0.0);
        return await this.calibrateFromPoints(rawVals, refVals);
    }
    /**
     * Cancels any previous zero calibration for the tilt measurement (Yocto-Inclinometer only).
     * This function restores the factory zero calibration.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async restoreZeroCalibration() {
        return await this._setAttr('calibrationParam', '0');
    }
    /**
     * Continues the enumeration of tilt sensors started using yFirstTilt().
     * Caution: You can't make any assumption about the returned tilt sensors order.
     * If you want to find a specific a tilt sensor, use Tilt.findTilt()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YTilt object, corresponding to
     *         a tilt sensor currently online, or a null pointer
     *         if there are no more tilt sensors to enumerate.
     */
    nextTilt() {
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != YAPI.SUCCESS)
            return null;
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if (next_hwid == null)
            return null;
        return YTilt.FindTiltInContext(this._yapi, next_hwid);
    }
    /**
     * Starts the enumeration of tilt sensors currently accessible.
     * Use the method YTilt.nextTilt() to iterate on
     * next tilt sensors.
     *
     * @return a pointer to a YTilt object, corresponding to
     *         the first tilt sensor currently online, or a null pointer
     *         if there are none.
     */
    static FirstTilt() {
        let next_hwid = YAPI.imm_getFirstHardwareId('Tilt');
        if (next_hwid == null)
            return null;
        return YTilt.FindTilt(next_hwid);
    }
    /**
     * Starts the enumeration of tilt sensors currently accessible.
     * Use the method YTilt.nextTilt() to iterate on
     * next tilt sensors.
     *
     * @param yctx : a YAPI context.
     *
     * @return a pointer to a YTilt object, corresponding to
     *         the first tilt sensor currently online, or a null pointer
     *         if there are none.
     */
    static FirstTiltInContext(yctx) {
        let next_hwid = yctx.imm_getFirstHardwareId('Tilt');
        if (next_hwid == null)
            return null;
        return YTilt.FindTiltInContext(yctx, next_hwid);
    }
}
// API symbols as static members
YTilt.BANDWIDTH_INVALID = YAPI.INVALID_UINT;
YTilt.AXIS_X = 0 /* X */;
YTilt.AXIS_Y = 1 /* Y */;
YTilt.AXIS_Z = 2 /* Z */;
YTilt.AXIS_INVALID = -1 /* INVALID */;
//# sourceMappingURL=yocto_tilt.js.map