/*********************************************************************
 *
 *  $Id: svn_id $
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

import { YAPI, YAPIContext, YErrorMsg, YFunction, YModule, YSensor, YDataLogger, YMeasure } from './yocto_api.js';

//--- (YAccelerometer definitions)
export const enum Y_GravityCancellation {
    OFF = 0,
    ON = 1,
    INVALID = -1
}
export interface YAccelerometerValueCallback { (func: YAccelerometer, value: string): void }
export interface YAccelerometerTimedReportCallback { (func: YAccelerometer, measure: YMeasure): void }
//--- (end of YAccelerometer definitions)

//--- (YAccelerometer class start)
/**
 * YAccelerometer Class: accelerometer control interface, available for instance in the Yocto-3D-V2
 *
 * The YAccelerometer class allows you to read and configure Yoctopuce accelerometers.
 * It inherits from YSensor class the core functions to read measurements,
 * to register callback functions, and to access the autonomous datalogger.
 * This class adds the possibility to access x, y and z components of the acceleration
 * vector separately.
 */
//--- (end of YAccelerometer class start)

export class YAccelerometer extends YSensor
{
    //--- (YAccelerometer attributes declaration)
    _className: string;
    _bandwidth: number = YAccelerometer.BANDWIDTH_INVALID;
    _xValue: number = YAccelerometer.XVALUE_INVALID;
    _yValue: number = YAccelerometer.YVALUE_INVALID;
    _zValue: number = YAccelerometer.ZVALUE_INVALID;
    _gravityCancellation: Y_GravityCancellation = YAccelerometer.GRAVITYCANCELLATION_INVALID;
    _valueCallbackAccelerometer: YAccelerometerValueCallback | null = null;
    _timedReportCallbackAccelerometer: YAccelerometerTimedReportCallback | null = null;

    // API symbols as object properties
    public readonly BANDWIDTH_INVALID: number = YAPI.INVALID_UINT;
    public readonly XVALUE_INVALID: number = YAPI.INVALID_DOUBLE;
    public readonly YVALUE_INVALID: number = YAPI.INVALID_DOUBLE;
    public readonly ZVALUE_INVALID: number = YAPI.INVALID_DOUBLE;
    public readonly GRAVITYCANCELLATION_OFF: Y_GravityCancellation = Y_GravityCancellation.OFF;
    public readonly GRAVITYCANCELLATION_ON: Y_GravityCancellation = Y_GravityCancellation.ON;
    public readonly GRAVITYCANCELLATION_INVALID: Y_GravityCancellation = Y_GravityCancellation.INVALID;

    // API symbols as static members
    public static readonly BANDWIDTH_INVALID: number = YAPI.INVALID_UINT;
    public static readonly XVALUE_INVALID: number = YAPI.INVALID_DOUBLE;
    public static readonly YVALUE_INVALID: number = YAPI.INVALID_DOUBLE;
    public static readonly ZVALUE_INVALID: number = YAPI.INVALID_DOUBLE;
    public static readonly GRAVITYCANCELLATION_OFF: Y_GravityCancellation = Y_GravityCancellation.OFF;
    public static readonly GRAVITYCANCELLATION_ON: Y_GravityCancellation = Y_GravityCancellation.ON;
    public static readonly GRAVITYCANCELLATION_INVALID: Y_GravityCancellation = Y_GravityCancellation.INVALID;
    //--- (end of YAccelerometer attributes declaration)

//--- (YAccelerometer return codes)
//--- (end of YAccelerometer return codes)

    constructor(yapi: YAPIContext, func: string)
    {
        //--- (YAccelerometer constructor)
        super(yapi, func);
        this._className                  = 'Accelerometer';
        //--- (end of YAccelerometer constructor)
    }

    //--- (YAccelerometer implementation)

    imm_parseAttr(name: string, val: any)
    {
        switch(name) {
        case 'bandwidth':
            this._bandwidth = <number> <number> val;
            return 1;
        case 'xValue':
            this._xValue = <number> Math.round(<number>val * 1000.0 / 65536.0) / 1000.0;
            return 1;
        case 'yValue':
            this._yValue = <number> Math.round(<number>val * 1000.0 / 65536.0) / 1000.0;
            return 1;
        case 'zValue':
            this._zValue = <number> Math.round(<number>val * 1000.0 / 65536.0) / 1000.0;
            return 1;
        case 'gravityCancellation':
            this._gravityCancellation = <Y_GravityCancellation> <number> val;
            return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Returns the measure update frequency, measured in Hz.
     *
     * @return an integer corresponding to the measure update frequency, measured in Hz
     *
     * On failure, throws an exception or returns Y_BANDWIDTH_INVALID.
     */
    async get_bandwidth(): Promise<number>
    {
        let res: number;
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
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_bandwidth(newval: number): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('bandwidth',rest_val);
    }

    /**
     * Returns the X component of the acceleration, as a floating point number.
     *
     * @return a floating point number corresponding to the X component of the acceleration, as a floating point number
     *
     * On failure, throws an exception or returns Y_XVALUE_INVALID.
     */
    async get_xValue(): Promise<number>
    {
        let res: number;
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
     * On failure, throws an exception or returns Y_YVALUE_INVALID.
     */
    async get_yValue(): Promise<number>
    {
        let res: number;
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
     * On failure, throws an exception or returns Y_ZVALUE_INVALID.
     */
    async get_zValue(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YAccelerometer.ZVALUE_INVALID;
            }
        }
        res = this._zValue;
        return res;
    }

    async get_gravityCancellation(): Promise<Y_GravityCancellation>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YAccelerometer.GRAVITYCANCELLATION_INVALID;
            }
        }
        res = this._gravityCancellation;
        return res;
    }

    async set_gravityCancellation(newval: Y_GravityCancellation): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('gravityCancellation',rest_val);
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
     * Use the method YAccelerometer.isOnline() to test if $THEFUNCTION$ is
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
     * @return a YAccelerometer object allowing you to drive $THEFUNCTION$.
     */
    static FindAccelerometer(func: string): YAccelerometer
    {
        let obj: YAccelerometer;
        obj = <YAccelerometer> YFunction._FindFromCache('Accelerometer', func);
        if (obj == null) {
            obj = new YAccelerometer(YAPI, func);
            YFunction._AddToCache('Accelerometer',  func, obj);
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
     * Use the method YAccelerometer.isOnline() to test if $THEFUNCTION$ is
     * indeed online at a given time. In case of ambiguity when looking for
     * $AFUNCTION$ by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx : a YAPI context
     * @param func : a string that uniquely characterizes $THEFUNCTION$, for instance
     *         $FULLHARDWAREID$.
     *
     * @return a YAccelerometer object allowing you to drive $THEFUNCTION$.
     */
    static FindAccelerometerInContext(yctx: YAPIContext, func: string): YAccelerometer
    {
        let obj: YAccelerometer;
        obj = <YAccelerometer> YFunction._FindFromCacheInContext(yctx,  'Accelerometer', func);
        if (obj == null) {
            obj = new YAccelerometer(yctx, func);
            YFunction._AddToCache('Accelerometer',  func, obj);
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
    async registerValueCallback(callback: YAccelerometerValueCallback | null): Promise<number>
    {
        let val: string;
        if (callback != null) {
            await YFunction._UpdateValueCallbackList(this, true);
        } else {
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

    async _invokeValueCallback(value: string): Promise<number>
    {
        if (this._valueCallbackAccelerometer != null) {
            try {
                await this._valueCallbackAccelerometer(this, value);
            } catch (e) {
                this._yapi.imm_log('Exception in valueCallback:', e);
            }
        } else {
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
    async registerTimedReportCallback(callback: YAccelerometerTimedReportCallback | null): Promise<number>
    {
        let sensor: YSensor;
        sensor = this;
        if (callback != null) {
            await YFunction._UpdateTimedReportCallbackList(sensor, true);
        } else {
            await YFunction._UpdateTimedReportCallbackList(sensor, false);
        }
        this._timedReportCallbackAccelerometer = callback;
        return 0;
    }

    async _invokeTimedReportCallback(value: YMeasure): Promise<number>
    {
        if (this._timedReportCallbackAccelerometer != null) {
            try {
                await this._timedReportCallbackAccelerometer(this, value);
            } catch (e) {
                this._yapi.imm_log('Exception in timedReportCallback:', e);
            }
        } else {
            super._invokeTimedReportCallback(value);
        }
        return 0;
    }

    /**
     * Returns the next Accelerometer
     *
     * @returns {YAccelerometer}
     */
    nextAccelerometer(): YAccelerometer | null
    {
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI.SUCCESS) return null;
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, <string> resolve.result);
        if(next_hwid == null) return null;
        return YAccelerometer.FindAccelerometerInContext(this._yapi, next_hwid);
    }

    /**
     * Retrieves the first Accelerometer in a YAPI context
     *
     * @returns {YAccelerometer}
     */
    static FirstAccelerometer(): YAccelerometer | null
    {
        let next_hwid = YAPI.imm_getFirstHardwareId('Accelerometer');
        if(next_hwid == null) return null;
        return YAccelerometer.FindAccelerometer(next_hwid);
    }

    /**
     * Retrieves the first Accelerometer in a given context
     *
     * @param yctx {YAPIContext}
     *
     * @returns {YAccelerometer}
     */
    static FirstAccelerometerInContext(yctx: YAPIContext): YAccelerometer | null
    {
        let next_hwid = yctx.imm_getFirstHardwareId('Accelerometer');
        if(next_hwid == null) return null;
        return YAccelerometer.FindAccelerometerInContext(yctx, next_hwid);
    }

    //--- (end of YAccelerometer implementation)
}

