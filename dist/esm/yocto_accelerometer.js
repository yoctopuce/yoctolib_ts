/*********************************************************************
 *
 *  $Id: yocto_accelerometer.ts 54279 2023-04-28 10:11:03Z seb $
 *
 *  Implements the high-level API for Accelerometer functions
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
//--- (YAccelerometer class start)
/**
 * YAccelerometer Class: accelerometer control interface, available for instance in the Yocto-3D-V2 or
 * the Yocto-Inclinometer
 *
 * The YAccelerometer class allows you to read and configure Yoctopuce accelerometers.
 * It inherits from YSensor class the core functions to read measurements,
 * to register callback functions, and to access the autonomous datalogger.
 * This class adds the possibility to access x, y and z components of the acceleration
 * vector separately.
 */
//--- (end of YAccelerometer class start)
export class YAccelerometer extends YSensor {
    //--- (end of YAccelerometer attributes declaration)
    constructor(yapi, func) {
        //--- (YAccelerometer constructor)
        super(yapi, func);
        this._bandwidth = YAccelerometer.BANDWIDTH_INVALID;
        this._xValue = YAccelerometer.XVALUE_INVALID;
        this._yValue = YAccelerometer.YVALUE_INVALID;
        this._zValue = YAccelerometer.ZVALUE_INVALID;
        this._gravityCancellation = YAccelerometer.GRAVITYCANCELLATION_INVALID;
        this._valueCallbackAccelerometer = null;
        this._timedReportCallbackAccelerometer = null;
        // API symbols as object properties
        this.BANDWIDTH_INVALID = YAPI.INVALID_UINT;
        this.XVALUE_INVALID = YAPI.INVALID_DOUBLE;
        this.YVALUE_INVALID = YAPI.INVALID_DOUBLE;
        this.ZVALUE_INVALID = YAPI.INVALID_DOUBLE;
        this.GRAVITYCANCELLATION_OFF = 0;
        this.GRAVITYCANCELLATION_ON = 1;
        this.GRAVITYCANCELLATION_INVALID = -1;
        this._className = 'Accelerometer';
        //--- (end of YAccelerometer constructor)
    }
    //--- (YAccelerometer implementation)
    imm_parseAttr(name, val) {
        switch (name) {
            case 'bandwidth':
                this._bandwidth = val;
                return 1;
            case 'xValue':
                this._xValue = Math.round(val / 65.536) / 1000.0;
                return 1;
            case 'yValue':
                this._yValue = Math.round(val / 65.536) / 1000.0;
                return 1;
            case 'zValue':
                this._zValue = Math.round(val / 65.536) / 1000.0;
                return 1;
            case 'gravityCancellation':
                this._gravityCancellation = val;
                return 1;
        }
        return super.imm_parseAttr(name, val);
    }
    /**
     * Returns the measure update frequency, measured in Hz.
     *
     * @return an integer corresponding to the measure update frequency, measured in Hz
     *
     * On failure, throws an exception or returns YAccelerometer.BANDWIDTH_INVALID.
     */
    async get_bandwidth() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YAccelerometer.BANDWIDTH_INVALID;
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
    /**
     * Returns the X component of the acceleration, as a floating point number.
     *
     * @return a floating point number corresponding to the X component of the acceleration, as a floating point number
     *
     * On failure, throws an exception or returns YAccelerometer.XVALUE_INVALID.
     */
    async get_xValue() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YAccelerometer.XVALUE_INVALID;
            }
        }
        res = this._xValue;
        return res;
    }
    /**
     * Returns the Y component of the acceleration, as a floating point number.
     *
     * @return a floating point number corresponding to the Y component of the acceleration, as a floating point number
     *
     * On failure, throws an exception or returns YAccelerometer.YVALUE_INVALID.
     */
    async get_yValue() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YAccelerometer.YVALUE_INVALID;
            }
        }
        res = this._yValue;
        return res;
    }
    /**
     * Returns the Z component of the acceleration, as a floating point number.
     *
     * @return a floating point number corresponding to the Z component of the acceleration, as a floating point number
     *
     * On failure, throws an exception or returns YAccelerometer.ZVALUE_INVALID.
     */
    async get_zValue() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YAccelerometer.ZVALUE_INVALID;
            }
        }
        res = this._zValue;
        return res;
    }
    async get_gravityCancellation() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YAccelerometer.GRAVITYCANCELLATION_INVALID;
            }
        }
        res = this._gravityCancellation;
        return res;
    }
    async set_gravityCancellation(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('gravityCancellation', rest_val);
    }
    /**
     * Retrieves an accelerometer for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the accelerometer is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YAccelerometer.isOnline() to test if the accelerometer is
     * indeed online at a given time. In case of ambiguity when looking for
     * an accelerometer by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the accelerometer, for instance
     *         Y3DMK002.accelerometer.
     *
     * @return a YAccelerometer object allowing you to drive the accelerometer.
     */
    static FindAccelerometer(func) {
        let obj;
        obj = YFunction._FindFromCache('Accelerometer', func);
        if (obj == null) {
            obj = new YAccelerometer(YAPI, func);
            YFunction._AddToCache('Accelerometer', func, obj);
        }
        return obj;
    }
    /**
     * Retrieves an accelerometer for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the accelerometer is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YAccelerometer.isOnline() to test if the accelerometer is
     * indeed online at a given time. In case of ambiguity when looking for
     * an accelerometer by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx : a YAPI context
     * @param func : a string that uniquely characterizes the accelerometer, for instance
     *         Y3DMK002.accelerometer.
     *
     * @return a YAccelerometer object allowing you to drive the accelerometer.
     */
    static FindAccelerometerInContext(yctx, func) {
        let obj;
        obj = YFunction._FindFromCacheInContext(yctx, 'Accelerometer', func);
        if (obj == null) {
            obj = new YAccelerometer(yctx, func);
            YFunction._AddToCache('Accelerometer', func, obj);
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
        this._valueCallbackAccelerometer = callback;
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
        if (this._valueCallbackAccelerometer != null) {
            try {
                await this._valueCallbackAccelerometer(this, value);
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
        this._timedReportCallbackAccelerometer = callback;
        return 0;
    }
    async _invokeTimedReportCallback(value) {
        if (this._timedReportCallbackAccelerometer != null) {
            try {
                await this._timedReportCallbackAccelerometer(this, value);
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
     * Continues the enumeration of accelerometers started using yFirstAccelerometer().
     * Caution: You can't make any assumption about the returned accelerometers order.
     * If you want to find a specific an accelerometer, use Accelerometer.findAccelerometer()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YAccelerometer object, corresponding to
     *         an accelerometer currently online, or a null pointer
     *         if there are no more accelerometers to enumerate.
     */
    nextAccelerometer() {
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != YAPI.SUCCESS)
            return null;
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if (next_hwid == null)
            return null;
        return YAccelerometer.FindAccelerometerInContext(this._yapi, next_hwid);
    }
    /**
     * Starts the enumeration of accelerometers currently accessible.
     * Use the method YAccelerometer.nextAccelerometer() to iterate on
     * next accelerometers.
     *
     * @return a pointer to a YAccelerometer object, corresponding to
     *         the first accelerometer currently online, or a null pointer
     *         if there are none.
     */
    static FirstAccelerometer() {
        let next_hwid = YAPI.imm_getFirstHardwareId('Accelerometer');
        if (next_hwid == null)
            return null;
        return YAccelerometer.FindAccelerometer(next_hwid);
    }
    /**
     * Starts the enumeration of accelerometers currently accessible.
     * Use the method YAccelerometer.nextAccelerometer() to iterate on
     * next accelerometers.
     *
     * @param yctx : a YAPI context.
     *
     * @return a pointer to a YAccelerometer object, corresponding to
     *         the first accelerometer currently online, or a null pointer
     *         if there are none.
     */
    static FirstAccelerometerInContext(yctx) {
        let next_hwid = yctx.imm_getFirstHardwareId('Accelerometer');
        if (next_hwid == null)
            return null;
        return YAccelerometer.FindAccelerometerInContext(yctx, next_hwid);
    }
}
// API symbols as static members
YAccelerometer.BANDWIDTH_INVALID = YAPI.INVALID_UINT;
YAccelerometer.XVALUE_INVALID = YAPI.INVALID_DOUBLE;
YAccelerometer.YVALUE_INVALID = YAPI.INVALID_DOUBLE;
YAccelerometer.ZVALUE_INVALID = YAPI.INVALID_DOUBLE;
YAccelerometer.GRAVITYCANCELLATION_OFF = 0;
YAccelerometer.GRAVITYCANCELLATION_ON = 1;
YAccelerometer.GRAVITYCANCELLATION_INVALID = -1;
//# sourceMappingURL=yocto_accelerometer.js.map