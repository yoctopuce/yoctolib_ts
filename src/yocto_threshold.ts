/*********************************************************************
 *
 *  $Id: svn_id $
 *
 *  Implements the high-level API for Threshold functions
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

//--- (YThreshold class start)
/**
 * YThreshold Class: Control interface to define a threshold
 *
 * The Threshold class allows you define a threshold on a Yoctopuce sensor
 * to trigger a predefined action, on specific devices where this is implemented.
 */
//--- (end of YThreshold class start)

export class YThreshold extends YFunction
{
    //--- (YThreshold attributes declaration)
    _className: string;
    _thresholdState: YThreshold.THRESHOLDSTATE = YThreshold.THRESHOLDSTATE_INVALID;
    _targetSensor: string = YThreshold.TARGETSENSOR_INVALID;
    _alertLevel: number = YThreshold.ALERTLEVEL_INVALID;
    _safeLevel: number = YThreshold.SAFELEVEL_INVALID;
    _valueCallbackThreshold: YThreshold.ValueCallback | null = null;

    // API symbols as object properties
    public readonly THRESHOLDSTATE_SAFE: YThreshold.THRESHOLDSTATE = 0;
    public readonly THRESHOLDSTATE_ALERT: YThreshold.THRESHOLDSTATE = 1;
    public readonly THRESHOLDSTATE_INVALID: YThreshold.THRESHOLDSTATE = -1;
    public readonly TARGETSENSOR_INVALID: string = YAPI.INVALID_STRING;
    public readonly ALERTLEVEL_INVALID: number = YAPI.INVALID_DOUBLE;
    public readonly SAFELEVEL_INVALID: number = YAPI.INVALID_DOUBLE;

    // API symbols as static members
    public static readonly THRESHOLDSTATE_SAFE: YThreshold.THRESHOLDSTATE = 0;
    public static readonly THRESHOLDSTATE_ALERT: YThreshold.THRESHOLDSTATE = 1;
    public static readonly THRESHOLDSTATE_INVALID: YThreshold.THRESHOLDSTATE = -1;
    public static readonly TARGETSENSOR_INVALID: string = YAPI.INVALID_STRING;
    public static readonly ALERTLEVEL_INVALID: number = YAPI.INVALID_DOUBLE;
    public static readonly SAFELEVEL_INVALID: number = YAPI.INVALID_DOUBLE;
    //--- (end of YThreshold attributes declaration)

    constructor(yapi: YAPIContext, func: string)
    {
        //--- (YThreshold constructor)
        super(yapi, func);
        this._className                  = 'Threshold';
        //--- (end of YThreshold constructor)
    }

    //--- (YThreshold implementation)

    imm_parseAttr(name: string, val: any): number
    {
        switch (name) {
        case 'thresholdState':
            this._thresholdState = <YThreshold.THRESHOLDSTATE> <number> val;
            return 1;
        case 'targetSensor':
            this._targetSensor = <string> <string> val;
            return 1;
        case 'alertLevel':
            this._alertLevel = <number> Math.round(<number>val / 65.536) / 1000.0;
            return 1;
        case 'safeLevel':
            this._safeLevel = <number> Math.round(<number>val / 65.536) / 1000.0;
            return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Returns current state of the threshold function.
     *
     * @return either YThreshold.THRESHOLDSTATE_SAFE or YThreshold.THRESHOLDSTATE_ALERT, according to
     * current state of the threshold function
     *
     * On failure, throws an exception or returns YThreshold.THRESHOLDSTATE_INVALID.
     */
    async get_thresholdState(): Promise<YThreshold.THRESHOLDSTATE>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YThreshold.THRESHOLDSTATE_INVALID;
            }
        }
        res = this._thresholdState;
        return res;
    }

    /**
     * Returns the name of the sensor monitored by the threshold function.
     *
     * @return a string corresponding to the name of the sensor monitored by the threshold function
     *
     * On failure, throws an exception or returns YThreshold.TARGETSENSOR_INVALID.
     */
    async get_targetSensor(): Promise<string>
    {
        let res: string;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YThreshold.TARGETSENSOR_INVALID;
            }
        }
        res = this._targetSensor;
        return res;
    }

    /**
     * Changes the sensor alert level triggering the threshold function.
     * Remember to call the matching module saveToFlash()
     * method if you want to preserve the setting after reboot.
     *
     * @param newval : a floating point number corresponding to the sensor alert level triggering the
     * threshold function
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_alertLevel(newval: number): Promise<number>
    {
        let rest_val: string;
        rest_val = String(Math.round(newval * 65536.0));
        return await this._setAttr('alertLevel', rest_val);
    }

    /**
     * Returns the sensor alert level, triggering the threshold function.
     *
     * @return a floating point number corresponding to the sensor alert level, triggering the threshold function
     *
     * On failure, throws an exception or returns YThreshold.ALERTLEVEL_INVALID.
     */
    async get_alertLevel(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YThreshold.ALERTLEVEL_INVALID;
            }
        }
        res = this._alertLevel;
        return res;
    }

    /**
     * Changes the sensor acceptable level for disabling the threshold function.
     * Remember to call the matching module saveToFlash()
     * method if you want to preserve the setting after reboot.
     *
     * @param newval : a floating point number corresponding to the sensor acceptable level for disabling
     * the threshold function
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_safeLevel(newval: number): Promise<number>
    {
        let rest_val: string;
        rest_val = String(Math.round(newval * 65536.0));
        return await this._setAttr('safeLevel', rest_val);
    }

    /**
     * Returns the sensor acceptable level for disabling the threshold function.
     *
     * @return a floating point number corresponding to the sensor acceptable level for disabling the
     * threshold function
     *
     * On failure, throws an exception or returns YThreshold.SAFELEVEL_INVALID.
     */
    async get_safeLevel(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YThreshold.SAFELEVEL_INVALID;
            }
        }
        res = this._safeLevel;
        return res;
    }

    /**
     * Retrieves a threshold function for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the threshold function is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YThreshold.isOnline() to test if the threshold function is
     * indeed online at a given time. In case of ambiguity when looking for
     * a threshold function by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the threshold function, for instance
     *         MyDevice.threshold1.
     *
     * @return a YThreshold object allowing you to drive the threshold function.
     */
    static FindThreshold(func: string): YThreshold
    {
        let obj: YThreshold | null;
        obj = <YThreshold> YFunction._FindFromCache('Threshold', func);
        if (obj == null) {
            obj = new YThreshold(YAPI, func);
            YFunction._AddToCache('Threshold',  func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a threshold function for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the threshold function is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YThreshold.isOnline() to test if the threshold function is
     * indeed online at a given time. In case of ambiguity when looking for
     * a threshold function by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx : a YAPI context
     * @param func : a string that uniquely characterizes the threshold function, for instance
     *         MyDevice.threshold1.
     *
     * @return a YThreshold object allowing you to drive the threshold function.
     */
    static FindThresholdInContext(yctx: YAPIContext, func: string): YThreshold
    {
        let obj: YThreshold | null;
        obj = <YThreshold> YFunction._FindFromCacheInContext(yctx,  'Threshold', func);
        if (obj == null) {
            obj = new YThreshold(yctx, func);
            YFunction._AddToCache('Threshold',  func, obj);
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
    async registerValueCallback(callback: YThreshold.ValueCallback | null): Promise<number>
    {
        let val: string;
        if (callback != null) {
            await YFunction._UpdateValueCallbackList(this, true);
        } else {
            await YFunction._UpdateValueCallbackList(this, false);
        }
        this._valueCallbackThreshold = callback;
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
        if (this._valueCallbackThreshold != null) {
            try {
                await this._valueCallbackThreshold(this, value);
            } catch (e) {
                this._yapi.imm_log('Exception in valueCallback:', e);
            }
        } else {
            await super._invokeValueCallback(value);
        }
        return 0;
    }

    /**
     * Continues the enumeration of threshold functions started using yFirstThreshold().
     * Caution: You can't make any assumption about the returned threshold functions order.
     * If you want to find a specific a threshold function, use Threshold.findThreshold()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YThreshold object, corresponding to
     *         a threshold function currently online, or a null pointer
     *         if there are no more threshold functions to enumerate.
     */
    nextThreshold(): YThreshold | null
    {
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != YAPI.SUCCESS) return null;
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, <string> resolve.result);
        if (next_hwid == null) return null;
        return YThreshold.FindThresholdInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of threshold functions currently accessible.
     * Use the method YThreshold.nextThreshold() to iterate on
     * next threshold functions.
     *
     * @return a pointer to a YThreshold object, corresponding to
     *         the first threshold function currently online, or a null pointer
     *         if there are none.
     */
    static FirstThreshold(): YThreshold | null
    {
        let next_hwid = YAPI.imm_getFirstHardwareId('Threshold');
        if (next_hwid == null) return null;
        return YThreshold.FindThreshold(next_hwid);
    }

    /**
     * Starts the enumeration of threshold functions currently accessible.
     * Use the method YThreshold.nextThreshold() to iterate on
     * next threshold functions.
     *
     * @param yctx : a YAPI context.
     *
     * @return a pointer to a YThreshold object, corresponding to
     *         the first threshold function currently online, or a null pointer
     *         if there are none.
     */
    static FirstThresholdInContext(yctx: YAPIContext): YThreshold | null
    {
        let next_hwid = yctx.imm_getFirstHardwareId('Threshold');
        if (next_hwid == null) return null;
        return YThreshold.FindThresholdInContext(yctx, next_hwid);
    }

    //--- (end of YThreshold implementation)
}

export namespace YThreshold {
    //--- (YThreshold definitions)
    export const enum THRESHOLDSTATE
    {
        SAFE = 0,
        ALERT = 1,
        INVALID = -1
    }

    export interface ValueCallback {(func: YThreshold, value: string): void}

    //--- (end of YThreshold definitions)
}

