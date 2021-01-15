/*********************************************************************
 *
 *  $Id: svn_id $
 *
 *  Implements the high-level API for QuadratureDecoder functions
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

//--- (YQuadratureDecoder definitions)
export const enum Y_Decoding {
    OFF = 0,
    ON = 1,
    INVALID = -1
}
export interface YQuadratureDecoderValueCallback { (func: YQuadratureDecoder, value: string): void }
export interface YQuadratureDecoderTimedReportCallback { (func: YQuadratureDecoder, measure: YMeasure): void }
//--- (end of YQuadratureDecoder definitions)

//--- (YQuadratureDecoder class start)
/**
 * YQuadratureDecoder Class: quadrature decoder control interface, available for instance in the Yocto-PWM-Rx
 *
 * The YQuadratureDecoder class allows you to read and configure Yoctopuce quadrature decoders.
 * It inherits from YSensor class the core functions to read measurements,
 * to register callback functions, and to access the autonomous datalogger.
 */
//--- (end of YQuadratureDecoder class start)

export class YQuadratureDecoder extends YSensor
{
    //--- (YQuadratureDecoder attributes declaration)
    _className: string;
    _speed: number = YQuadratureDecoder.SPEED_INVALID;
    _decoding: Y_Decoding = YQuadratureDecoder.DECODING_INVALID;
    _valueCallbackQuadratureDecoder: YQuadratureDecoderValueCallback | null = null;
    _timedReportCallbackQuadratureDecoder: YQuadratureDecoderTimedReportCallback | null = null;

    // API symbols as object properties
    public readonly SPEED_INVALID: number = YAPI.INVALID_DOUBLE;
    public readonly DECODING_OFF: Y_Decoding = Y_Decoding.OFF;
    public readonly DECODING_ON: Y_Decoding = Y_Decoding.ON;
    public readonly DECODING_INVALID: Y_Decoding = Y_Decoding.INVALID;

    // API symbols as static members
    public static readonly SPEED_INVALID: number = YAPI.INVALID_DOUBLE;
    public static readonly DECODING_OFF: Y_Decoding = Y_Decoding.OFF;
    public static readonly DECODING_ON: Y_Decoding = Y_Decoding.ON;
    public static readonly DECODING_INVALID: Y_Decoding = Y_Decoding.INVALID;
    //--- (end of YQuadratureDecoder attributes declaration)

//--- (YQuadratureDecoder return codes)
//--- (end of YQuadratureDecoder return codes)

    constructor(yapi: YAPIContext, func: string)
    {
        //--- (YQuadratureDecoder constructor)
        super(yapi, func);
        this._className                  = 'QuadratureDecoder';
        //--- (end of YQuadratureDecoder constructor)
    }

    //--- (YQuadratureDecoder implementation)

    imm_parseAttr(name: string, val: any)
    {
        switch(name) {
        case 'speed':
            this._speed = <number> Math.round(<number>val * 1000.0 / 65536.0) / 1000.0;
            return 1;
        case 'decoding':
            this._decoding = <Y_Decoding> <number> val;
            return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Changes the current expected position of the quadrature decoder.
     * Invoking this function implicitly activates the quadrature decoder.
     *
     * @param newval : a floating point number corresponding to the current expected position of the quadrature decoder
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_currentValue(newval: number): Promise<number>
    {
        let rest_val: string;
        rest_val = String(Math.round(newval * 65536.0));
        return await this._setAttr('currentValue',rest_val);
    }

    /**
     * Returns the increments frequency, in Hz.
     *
     * @return a floating point number corresponding to the increments frequency, in Hz
     *
     * On failure, throws an exception or returns Y_SPEED_INVALID.
     */
    async get_speed(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YQuadratureDecoder.SPEED_INVALID;
            }
        }
        res = this._speed;
        return res;
    }

    /**
     * Returns the current activation state of the quadrature decoder.
     *
     * @return either Y_DECODING_OFF or Y_DECODING_ON, according to the current activation state of the
     * quadrature decoder
     *
     * On failure, throws an exception or returns Y_DECODING_INVALID.
     */
    async get_decoding(): Promise<Y_Decoding>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YQuadratureDecoder.DECODING_INVALID;
            }
        }
        res = this._decoding;
        return res;
    }

    /**
     * Changes the activation state of the quadrature decoder.
     * Remember to call the saveToFlash()
     * method of the module if the modification must be kept.
     *
     * @param newval : either Y_DECODING_OFF or Y_DECODING_ON, according to the activation state of the
     * quadrature decoder
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_decoding(newval: Y_Decoding): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('decoding',rest_val);
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
     * Use the method YQuadratureDecoder.isOnline() to test if $THEFUNCTION$ is
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
     * @return a YQuadratureDecoder object allowing you to drive $THEFUNCTION$.
     */
    static FindQuadratureDecoder(func: string): YQuadratureDecoder
    {
        let obj: YQuadratureDecoder;
        obj = <YQuadratureDecoder> YFunction._FindFromCache('QuadratureDecoder', func);
        if (obj == null) {
            obj = new YQuadratureDecoder(YAPI, func);
            YFunction._AddToCache('QuadratureDecoder',  func, obj);
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
     * Use the method YQuadratureDecoder.isOnline() to test if $THEFUNCTION$ is
     * indeed online at a given time. In case of ambiguity when looking for
     * $AFUNCTION$ by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx : a YAPI context
     * @param func : a string that uniquely characterizes $THEFUNCTION$, for instance
     *         $FULLHARDWAREID$.
     *
     * @return a YQuadratureDecoder object allowing you to drive $THEFUNCTION$.
     */
    static FindQuadratureDecoderInContext(yctx: YAPIContext, func: string): YQuadratureDecoder
    {
        let obj: YQuadratureDecoder;
        obj = <YQuadratureDecoder> YFunction._FindFromCacheInContext(yctx,  'QuadratureDecoder', func);
        if (obj == null) {
            obj = new YQuadratureDecoder(yctx, func);
            YFunction._AddToCache('QuadratureDecoder',  func, obj);
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
    async registerValueCallback(callback: YQuadratureDecoderValueCallback | null): Promise<number>
    {
        let val: string;
        if (callback != null) {
            await YFunction._UpdateValueCallbackList(this, true);
        } else {
            await YFunction._UpdateValueCallbackList(this, false);
        }
        this._valueCallbackQuadratureDecoder = callback;
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
        if (this._valueCallbackQuadratureDecoder != null) {
            try {
                await this._valueCallbackQuadratureDecoder(this, value);
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
    async registerTimedReportCallback(callback: YQuadratureDecoderTimedReportCallback | null): Promise<number>
    {
        let sensor: YSensor;
        sensor = this;
        if (callback != null) {
            await YFunction._UpdateTimedReportCallbackList(sensor, true);
        } else {
            await YFunction._UpdateTimedReportCallbackList(sensor, false);
        }
        this._timedReportCallbackQuadratureDecoder = callback;
        return 0;
    }

    async _invokeTimedReportCallback(value: YMeasure): Promise<number>
    {
        if (this._timedReportCallbackQuadratureDecoder != null) {
            try {
                await this._timedReportCallbackQuadratureDecoder(this, value);
            } catch (e) {
                this._yapi.imm_log('Exception in timedReportCallback:', e);
            }
        } else {
            super._invokeTimedReportCallback(value);
        }
        return 0;
    }

    /**
     * Returns the next QuadratureDecoder
     *
     * @returns {YQuadratureDecoder}
     */
    nextQuadratureDecoder(): YQuadratureDecoder | null
    {
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI.SUCCESS) return null;
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, <string> resolve.result);
        if(next_hwid == null) return null;
        return YQuadratureDecoder.FindQuadratureDecoderInContext(this._yapi, next_hwid);
    }

    /**
     * Retrieves the first QuadratureDecoder in a YAPI context
     *
     * @returns {YQuadratureDecoder}
     */
    static FirstQuadratureDecoder(): YQuadratureDecoder | null
    {
        let next_hwid = YAPI.imm_getFirstHardwareId('QuadratureDecoder');
        if(next_hwid == null) return null;
        return YQuadratureDecoder.FindQuadratureDecoder(next_hwid);
    }

    /**
     * Retrieves the first QuadratureDecoder in a given context
     *
     * @param yctx {YAPIContext}
     *
     * @returns {YQuadratureDecoder}
     */
    static FirstQuadratureDecoderInContext(yctx: YAPIContext): YQuadratureDecoder | null
    {
        let next_hwid = yctx.imm_getFirstHardwareId('QuadratureDecoder');
        if(next_hwid == null) return null;
        return YQuadratureDecoder.FindQuadratureDecoderInContext(yctx, next_hwid);
    }

    //--- (end of YQuadratureDecoder implementation)
}

