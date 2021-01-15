/*********************************************************************
 *
 *  $Id: svn_id $
 *
 *  Implements the high-level API for Compass functions
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

//--- (YCompass definitions)
export const enum Y_Axis {
    X = 0,
    Y = 1,
    Z = 2,
    INVALID = -1
}
export interface YCompassValueCallback { (func: YCompass, value: string): void }
export interface YCompassTimedReportCallback { (func: YCompass, measure: YMeasure): void }
//--- (end of YCompass definitions)

//--- (YCompass class start)
/**
 * YCompass Class: compass function control interface, available for instance in the Yocto-3D-V2
 *
 * The YCompass class allows you to read and configure Yoctopuce compass functions.
 * It inherits from YSensor class the core functions to read measurements,
 * to register callback functions, and to access the autonomous datalogger.
 */
//--- (end of YCompass class start)

export class YCompass extends YSensor
{
    //--- (YCompass attributes declaration)
    _className: string;
    _bandwidth: number = YCompass.BANDWIDTH_INVALID;
    _axis: Y_Axis = YCompass.AXIS_INVALID;
    _magneticHeading: number = YCompass.MAGNETICHEADING_INVALID;
    _valueCallbackCompass: YCompassValueCallback | null = null;
    _timedReportCallbackCompass: YCompassTimedReportCallback | null = null;

    // API symbols as object properties
    public readonly BANDWIDTH_INVALID: number = YAPI.INVALID_UINT;
    public readonly AXIS_X: Y_Axis = Y_Axis.X;
    public readonly AXIS_Y: Y_Axis = Y_Axis.Y;
    public readonly AXIS_Z: Y_Axis = Y_Axis.Z;
    public readonly AXIS_INVALID: Y_Axis = Y_Axis.INVALID;
    public readonly MAGNETICHEADING_INVALID: number = YAPI.INVALID_DOUBLE;

    // API symbols as static members
    public static readonly BANDWIDTH_INVALID: number = YAPI.INVALID_UINT;
    public static readonly AXIS_X: Y_Axis = Y_Axis.X;
    public static readonly AXIS_Y: Y_Axis = Y_Axis.Y;
    public static readonly AXIS_Z: Y_Axis = Y_Axis.Z;
    public static readonly AXIS_INVALID: Y_Axis = Y_Axis.INVALID;
    public static readonly MAGNETICHEADING_INVALID: number = YAPI.INVALID_DOUBLE;
    //--- (end of YCompass attributes declaration)

//--- (YCompass return codes)
//--- (end of YCompass return codes)

    constructor(yapi: YAPIContext, func: string)
    {
        //--- (YCompass constructor)
        super(yapi, func);
        this._className                  = 'Compass';
        //--- (end of YCompass constructor)
    }

    //--- (YCompass implementation)

    imm_parseAttr(name: string, val: any)
    {
        switch(name) {
        case 'bandwidth':
            this._bandwidth = <number> <number> val;
            return 1;
        case 'axis':
            this._axis = <Y_Axis> <number> val;
            return 1;
        case 'magneticHeading':
            this._magneticHeading = <number> Math.round(<number>val * 1000.0 / 65536.0) / 1000.0;
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
                return YCompass.BANDWIDTH_INVALID;
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

    async get_axis(): Promise<Y_Axis>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YCompass.AXIS_INVALID;
            }
        }
        res = this._axis;
        return res;
    }

    /**
     * Returns the magnetic heading, regardless of the configured bearing.
     *
     * @return a floating point number corresponding to the magnetic heading, regardless of the configured bearing
     *
     * On failure, throws an exception or returns Y_MAGNETICHEADING_INVALID.
     */
    async get_magneticHeading(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YCompass.MAGNETICHEADING_INVALID;
            }
        }
        res = this._magneticHeading;
        return res;
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
     * Use the method YCompass.isOnline() to test if $THEFUNCTION$ is
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
     * @return a YCompass object allowing you to drive $THEFUNCTION$.
     */
    static FindCompass(func: string): YCompass
    {
        let obj: YCompass;
        obj = <YCompass> YFunction._FindFromCache('Compass', func);
        if (obj == null) {
            obj = new YCompass(YAPI, func);
            YFunction._AddToCache('Compass',  func, obj);
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
     * Use the method YCompass.isOnline() to test if $THEFUNCTION$ is
     * indeed online at a given time. In case of ambiguity when looking for
     * $AFUNCTION$ by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx : a YAPI context
     * @param func : a string that uniquely characterizes $THEFUNCTION$, for instance
     *         $FULLHARDWAREID$.
     *
     * @return a YCompass object allowing you to drive $THEFUNCTION$.
     */
    static FindCompassInContext(yctx: YAPIContext, func: string): YCompass
    {
        let obj: YCompass;
        obj = <YCompass> YFunction._FindFromCacheInContext(yctx,  'Compass', func);
        if (obj == null) {
            obj = new YCompass(yctx, func);
            YFunction._AddToCache('Compass',  func, obj);
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
    async registerValueCallback(callback: YCompassValueCallback | null): Promise<number>
    {
        let val: string;
        if (callback != null) {
            await YFunction._UpdateValueCallbackList(this, true);
        } else {
            await YFunction._UpdateValueCallbackList(this, false);
        }
        this._valueCallbackCompass = callback;
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
        if (this._valueCallbackCompass != null) {
            try {
                await this._valueCallbackCompass(this, value);
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
    async registerTimedReportCallback(callback: YCompassTimedReportCallback | null): Promise<number>
    {
        let sensor: YSensor;
        sensor = this;
        if (callback != null) {
            await YFunction._UpdateTimedReportCallbackList(sensor, true);
        } else {
            await YFunction._UpdateTimedReportCallbackList(sensor, false);
        }
        this._timedReportCallbackCompass = callback;
        return 0;
    }

    async _invokeTimedReportCallback(value: YMeasure): Promise<number>
    {
        if (this._timedReportCallbackCompass != null) {
            try {
                await this._timedReportCallbackCompass(this, value);
            } catch (e) {
                this._yapi.imm_log('Exception in timedReportCallback:', e);
            }
        } else {
            super._invokeTimedReportCallback(value);
        }
        return 0;
    }

    /**
     * Returns the next Compass
     *
     * @returns {YCompass}
     */
    nextCompass(): YCompass | null
    {
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI.SUCCESS) return null;
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, <string> resolve.result);
        if(next_hwid == null) return null;
        return YCompass.FindCompassInContext(this._yapi, next_hwid);
    }

    /**
     * Retrieves the first Compass in a YAPI context
     *
     * @returns {YCompass}
     */
    static FirstCompass(): YCompass | null
    {
        let next_hwid = YAPI.imm_getFirstHardwareId('Compass');
        if(next_hwid == null) return null;
        return YCompass.FindCompass(next_hwid);
    }

    /**
     * Retrieves the first Compass in a given context
     *
     * @param yctx {YAPIContext}
     *
     * @returns {YCompass}
     */
    static FirstCompassInContext(yctx: YAPIContext): YCompass | null
    {
        let next_hwid = yctx.imm_getFirstHardwareId('Compass');
        if(next_hwid == null) return null;
        return YCompass.FindCompassInContext(yctx, next_hwid);
    }

    //--- (end of YCompass implementation)
}

