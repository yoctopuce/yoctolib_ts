/*********************************************************************
 *
 *  $Id: svn_id $
 *
 *  Implements the high-level API for Magnetometer functions
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

import { YAPI, YAPIContext, YErrorMsg, YFunction, YModule, YSensor, YDataLogger, YMeasure } from './yocto_api.js';

//--- (YMagnetometer class start)
/**
 * YMagnetometer Class: magnetometer control interface, available for instance in the Yocto-3D-V2
 *
 * The YSensor class is the parent class for all Yoctopuce sensor types. It can be
 * used to read the current value and unit of any sensor, read the min/max
 * value, configure autonomous recording frequency and access recorded data.
 * It also provides a function to register a callback invoked each time the
 * observed value changes, or at a predefined interval. Using this class rather
 * than a specific subclass makes it possible to create generic applications
 * that work with any Yoctopuce sensor, even those that do not yet exist.
 * Note: The YAnButton class is the only analog input which does not inherit
 * from YSensor.
 */
//--- (end of YMagnetometer class start)

export class YMagnetometer extends YSensor
{
    //--- (YMagnetometer attributes declaration)
    _className: string;
    _bandwidth: number = YMagnetometer.BANDWIDTH_INVALID;
    _xValue: number = YMagnetometer.XVALUE_INVALID;
    _yValue: number = YMagnetometer.YVALUE_INVALID;
    _zValue: number = YMagnetometer.ZVALUE_INVALID;
    _valueCallbackMagnetometer: YMagnetometer.ValueCallback | null = null;
    _timedReportCallbackMagnetometer: YMagnetometer.TimedReportCallback | null = null;

    // API symbols as object properties
    public readonly BANDWIDTH_INVALID: number = YAPI.INVALID_UINT;
    public readonly XVALUE_INVALID: number = YAPI.INVALID_DOUBLE;
    public readonly YVALUE_INVALID: number = YAPI.INVALID_DOUBLE;
    public readonly ZVALUE_INVALID: number = YAPI.INVALID_DOUBLE;

    // API symbols as static members
    public static readonly BANDWIDTH_INVALID: number = YAPI.INVALID_UINT;
    public static readonly XVALUE_INVALID: number = YAPI.INVALID_DOUBLE;
    public static readonly YVALUE_INVALID: number = YAPI.INVALID_DOUBLE;
    public static readonly ZVALUE_INVALID: number = YAPI.INVALID_DOUBLE;
    //--- (end of YMagnetometer attributes declaration)

    constructor(yapi: YAPIContext, func: string)
    {
        //--- (YMagnetometer constructor)
        super(yapi, func);
        this._className                  = 'Magnetometer';
        //--- (end of YMagnetometer constructor)
    }

    //--- (YMagnetometer implementation)

    imm_parseAttr(name: string, val: any): number
    {
        switch (name) {
        case 'bandwidth':
            this._bandwidth = <number> <number> val;
            return 1;
        case 'xValue':
            this._xValue = <number> Math.round(<number>val / 65.536) / 1000.0;
            return 1;
        case 'yValue':
            this._yValue = <number> Math.round(<number>val / 65.536) / 1000.0;
            return 1;
        case 'zValue':
            this._zValue = <number> Math.round(<number>val / 65.536) / 1000.0;
            return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Returns the measure update frequency, measured in Hz.
     *
     * @return an integer corresponding to the measure update frequency, measured in Hz
     *
     * On failure, throws an exception or returns YMagnetometer.BANDWIDTH_INVALID.
     */
    async get_bandwidth(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YMagnetometer.BANDWIDTH_INVALID;
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
    async set_bandwidth(newval: number): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('bandwidth', rest_val);
    }

    /**
     * Returns the X component of the magnetic field, as a floating point number.
     *
     * @return a floating point number corresponding to the X component of the magnetic field, as a
     * floating point number
     *
     * On failure, throws an exception or returns YMagnetometer.XVALUE_INVALID.
     */
    async get_xValue(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YMagnetometer.XVALUE_INVALID;
            }
        }
        res = this._xValue;
        return res;
    }

    /**
     * Returns the Y component of the magnetic field, as a floating point number.
     *
     * @return a floating point number corresponding to the Y component of the magnetic field, as a
     * floating point number
     *
     * On failure, throws an exception or returns YMagnetometer.YVALUE_INVALID.
     */
    async get_yValue(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YMagnetometer.YVALUE_INVALID;
            }
        }
        res = this._yValue;
        return res;
    }

    /**
     * Returns the Z component of the magnetic field, as a floating point number.
     *
     * @return a floating point number corresponding to the Z component of the magnetic field, as a
     * floating point number
     *
     * On failure, throws an exception or returns YMagnetometer.ZVALUE_INVALID.
     */
    async get_zValue(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YMagnetometer.ZVALUE_INVALID;
            }
        }
        res = this._zValue;
        return res;
    }

    /**
     * Retrieves a magnetometer for a given identifier.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the magnetometer is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YMagnetometer.isOnline() to test if the magnetometer is
     * indeed online at a given time. In case of ambiguity when looking for
     * a magnetometer by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the magnetometer, for instance
     *         Y3DMK002.magnetometer.
     *
     * @return a YMagnetometer object allowing you to drive the magnetometer.
     */
    static FindMagnetometer(func: string): YMagnetometer
    {
        let obj: YMagnetometer | null;
        obj = <YMagnetometer> YFunction._FindFromCache('Magnetometer', func);
        if (obj == null) {
            obj = new YMagnetometer(YAPI, func);
            YFunction._AddToCache('Magnetometer', func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a magnetometer for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the magnetometer is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YMagnetometer.isOnline() to test if the magnetometer is
     * indeed online at a given time. In case of ambiguity when looking for
     * a magnetometer by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx : a YAPI context
     * @param func : a string that uniquely characterizes the magnetometer, for instance
     *         Y3DMK002.magnetometer.
     *
     * @return a YMagnetometer object allowing you to drive the magnetometer.
     */
    static FindMagnetometerInContext(yctx: YAPIContext, func: string): YMagnetometer
    {
        let obj: YMagnetometer | null;
        obj = <YMagnetometer> YFunction._FindFromCacheInContext(yctx, 'Magnetometer', func);
        if (obj == null) {
            obj = new YMagnetometer(yctx, func);
            YFunction._AddToCache('Magnetometer', func, obj);
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
    async registerValueCallback(callback: YMagnetometer.ValueCallback | null): Promise<number>
    {
        let val: string;
        if (callback != null) {
            await YFunction._UpdateValueCallbackList(this, true);
        } else {
            await YFunction._UpdateValueCallbackList(this, false);
        }
        this._valueCallbackMagnetometer = callback;
        // Immediately invoke value callback with current value
        if (callback != null && await this.isOnline()) {
            val = this._advertisedValue;
            if (!(val == '')) {
                await this._invokeValueCallback(val);
            }
        }
        return 0;
    }

    async _invokeValueCallback(value: string): Promise<number>
    {
        if (this._valueCallbackMagnetometer != null) {
            try {
                await this._valueCallbackMagnetometer(this, value);
            } catch (e) {
                this._yapi.imm_log('Exception in valueCallback:', e);
            }
        } else {
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
    async registerTimedReportCallback(callback: YMagnetometer.TimedReportCallback | null): Promise<number>
    {
        let sensor: YSensor | null;
        sensor = this;
        if (callback != null) {
            await YFunction._UpdateTimedReportCallbackList(sensor, true);
        } else {
            await YFunction._UpdateTimedReportCallbackList(sensor, false);
        }
        this._timedReportCallbackMagnetometer = callback;
        return 0;
    }

    async _invokeTimedReportCallback(value: YMeasure): Promise<number>
    {
        if (this._timedReportCallbackMagnetometer != null) {
            try {
                await this._timedReportCallbackMagnetometer(this, value);
            } catch (e) {
                this._yapi.imm_log('Exception in timedReportCallback:', e);
            }
        } else {
            await super._invokeTimedReportCallback(value);
        }
        return 0;
    }

    /**
     * Continues the enumeration of magnetometers started using yFirstMagnetometer().
     * Caution: You can't make any assumption about the returned magnetometers order.
     * If you want to find a specific a magnetometer, use Magnetometer.findMagnetometer()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YMagnetometer object, corresponding to
     *         a magnetometer currently online, or a null pointer
     *         if there are no more magnetometers to enumerate.
     */
    nextMagnetometer(): YMagnetometer | null
    {
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != YAPI.SUCCESS) return null;
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, <string> resolve.result);
        if (next_hwid == null) return null;
        return YMagnetometer.FindMagnetometerInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of magnetometers currently accessible.
     * Use the method YMagnetometer.nextMagnetometer() to iterate on
     * next magnetometers.
     *
     * @return a pointer to a YMagnetometer object, corresponding to
     *         the first magnetometer currently online, or a null pointer
     *         if there are none.
     */
    static FirstMagnetometer(): YMagnetometer | null
    {
        let next_hwid = YAPI.imm_getFirstHardwareId('Magnetometer');
        if (next_hwid == null) return null;
        return YMagnetometer.FindMagnetometer(next_hwid);
    }

    /**
     * Starts the enumeration of magnetometers currently accessible.
     * Use the method YMagnetometer.nextMagnetometer() to iterate on
     * next magnetometers.
     *
     * @param yctx : a YAPI context.
     *
     * @return a pointer to a YMagnetometer object, corresponding to
     *         the first magnetometer currently online, or a null pointer
     *         if there are none.
     */
    static FirstMagnetometerInContext(yctx: YAPIContext): YMagnetometer | null
    {
        let next_hwid = yctx.imm_getFirstHardwareId('Magnetometer');
        if (next_hwid == null) return null;
        return YMagnetometer.FindMagnetometerInContext(yctx, next_hwid);
    }

    //--- (end of YMagnetometer implementation)
}

export namespace YMagnetometer {
    //--- (YMagnetometer definitions)
    export interface ValueCallback {(func: YMagnetometer, value: string): void}

    export interface TimedReportCallback {(func: YMagnetometer, measure: YMeasure): void}

    //--- (end of YMagnetometer definitions)
}

