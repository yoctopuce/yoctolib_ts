/*********************************************************************
 *
 *  $Id: svn_id $
 *
 *  Implements the high-level API for Led functions
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

//--- (YLed definitions)
export const enum Y_Power {
    OFF = 0,
    ON = 1,
    INVALID = -1
}
export const enum Y_Blinking {
    STILL = 0,
    RELAX = 1,
    AWARE = 2,
    RUN = 3,
    CALL = 4,
    PANIC = 5,
    INVALID = -1
}
export interface YLedValueCallback { (func: YLed, value: string): void }
//--- (end of YLed definitions)

//--- (YLed class start)
/**
 * YLed Class: monochrome LED control interface, available for instance in the Yocto-Buzzer, the
 * YoctoBox-Short-Thin-Black-Prox, the YoctoBox-Short-Thin-Transp or the YoctoBox-Short-Thin-Transp-Prox
 *
 * The YLed class allows you to drive a monocolor LED.
 * You can not only to drive the intensity of the LED, but also to
 * have it blink at various preset frequencies.
 */
//--- (end of YLed class start)

export class YLed extends YFunction
{
    //--- (YLed attributes declaration)
    _className: string;
    _power: Y_Power = YLed.POWER_INVALID;
    _luminosity: number = YLed.LUMINOSITY_INVALID;
    _blinking: Y_Blinking = YLed.BLINKING_INVALID;
    _valueCallbackLed: YLedValueCallback | null = null;

    // API symbols as object properties
    public readonly POWER_OFF: Y_Power = Y_Power.OFF;
    public readonly POWER_ON: Y_Power = Y_Power.ON;
    public readonly POWER_INVALID: Y_Power = Y_Power.INVALID;
    public readonly LUMINOSITY_INVALID: number = YAPI.INVALID_UINT;
    public readonly BLINKING_STILL: Y_Blinking = Y_Blinking.STILL;
    public readonly BLINKING_RELAX: Y_Blinking = Y_Blinking.RELAX;
    public readonly BLINKING_AWARE: Y_Blinking = Y_Blinking.AWARE;
    public readonly BLINKING_RUN: Y_Blinking = Y_Blinking.RUN;
    public readonly BLINKING_CALL: Y_Blinking = Y_Blinking.CALL;
    public readonly BLINKING_PANIC: Y_Blinking = Y_Blinking.PANIC;
    public readonly BLINKING_INVALID: Y_Blinking = Y_Blinking.INVALID;

    // API symbols as static members
    public static readonly POWER_OFF: Y_Power = Y_Power.OFF;
    public static readonly POWER_ON: Y_Power = Y_Power.ON;
    public static readonly POWER_INVALID: Y_Power = Y_Power.INVALID;
    public static readonly LUMINOSITY_INVALID: number = YAPI.INVALID_UINT;
    public static readonly BLINKING_STILL: Y_Blinking = Y_Blinking.STILL;
    public static readonly BLINKING_RELAX: Y_Blinking = Y_Blinking.RELAX;
    public static readonly BLINKING_AWARE: Y_Blinking = Y_Blinking.AWARE;
    public static readonly BLINKING_RUN: Y_Blinking = Y_Blinking.RUN;
    public static readonly BLINKING_CALL: Y_Blinking = Y_Blinking.CALL;
    public static readonly BLINKING_PANIC: Y_Blinking = Y_Blinking.PANIC;
    public static readonly BLINKING_INVALID: Y_Blinking = Y_Blinking.INVALID;
    //--- (end of YLed attributes declaration)

//--- (YLed return codes)
//--- (end of YLed return codes)

    constructor(yapi: YAPIContext, func: string)
    {
        //--- (YLed constructor)
        super(yapi, func);
        this._className                  = 'Led';
        //--- (end of YLed constructor)
    }

    //--- (YLed implementation)

    imm_parseAttr(name: string, val: any)
    {
        switch(name) {
        case 'power':
            this._power = <Y_Power> <number> val;
            return 1;
        case 'luminosity':
            this._luminosity = <number> <number> val;
            return 1;
        case 'blinking':
            this._blinking = <Y_Blinking> <number> val;
            return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Returns the current LED state.
     *
     * @return either Y_POWER_OFF or Y_POWER_ON, according to the current LED state
     *
     * On failure, throws an exception or returns Y_POWER_INVALID.
     */
    async get_power(): Promise<Y_Power>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YLed.POWER_INVALID;
            }
        }
        res = this._power;
        return res;
    }

    /**
     * Changes the state of the LED.
     *
     * @param newval : either Y_POWER_OFF or Y_POWER_ON, according to the state of the LED
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_power(newval: Y_Power): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('power',rest_val);
    }

    /**
     * Returns the current LED intensity (in per cent).
     *
     * @return an integer corresponding to the current LED intensity (in per cent)
     *
     * On failure, throws an exception or returns Y_LUMINOSITY_INVALID.
     */
    async get_luminosity(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YLed.LUMINOSITY_INVALID;
            }
        }
        res = this._luminosity;
        return res;
    }

    /**
     * Changes the current LED intensity (in per cent). Remember to call the
     * saveToFlash() method of the module if the modification must be kept.
     *
     * @param newval : an integer corresponding to the current LED intensity (in per cent)
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_luminosity(newval: number): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('luminosity',rest_val);
    }

    /**
     * Returns the current LED signaling mode.
     *
     * @return a value among Y_BLINKING_STILL, Y_BLINKING_RELAX, Y_BLINKING_AWARE, Y_BLINKING_RUN,
     * Y_BLINKING_CALL and Y_BLINKING_PANIC corresponding to the current LED signaling mode
     *
     * On failure, throws an exception or returns Y_BLINKING_INVALID.
     */
    async get_blinking(): Promise<Y_Blinking>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YLed.BLINKING_INVALID;
            }
        }
        res = this._blinking;
        return res;
    }

    /**
     * Changes the current LED signaling mode.
     *
     * @param newval : a value among Y_BLINKING_STILL, Y_BLINKING_RELAX, Y_BLINKING_AWARE, Y_BLINKING_RUN,
     * Y_BLINKING_CALL and Y_BLINKING_PANIC corresponding to the current LED signaling mode
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_blinking(newval: Y_Blinking): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('blinking',rest_val);
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
     * Use the method YLed.isOnline() to test if $THEFUNCTION$ is
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
     * @return a YLed object allowing you to drive $THEFUNCTION$.
     */
    static FindLed(func: string): YLed
    {
        let obj: YLed;
        obj = <YLed> YFunction._FindFromCache('Led', func);
        if (obj == null) {
            obj = new YLed(YAPI, func);
            YFunction._AddToCache('Led',  func, obj);
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
     * Use the method YLed.isOnline() to test if $THEFUNCTION$ is
     * indeed online at a given time. In case of ambiguity when looking for
     * $AFUNCTION$ by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx : a YAPI context
     * @param func : a string that uniquely characterizes $THEFUNCTION$, for instance
     *         $FULLHARDWAREID$.
     *
     * @return a YLed object allowing you to drive $THEFUNCTION$.
     */
    static FindLedInContext(yctx: YAPIContext, func: string): YLed
    {
        let obj: YLed;
        obj = <YLed> YFunction._FindFromCacheInContext(yctx,  'Led', func);
        if (obj == null) {
            obj = new YLed(yctx, func);
            YFunction._AddToCache('Led',  func, obj);
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
    async registerValueCallback(callback: YLedValueCallback | null): Promise<number>
    {
        let val: string;
        if (callback != null) {
            await YFunction._UpdateValueCallbackList(this, true);
        } else {
            await YFunction._UpdateValueCallbackList(this, false);
        }
        this._valueCallbackLed = callback;
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
        if (this._valueCallbackLed != null) {
            try {
                await this._valueCallbackLed(this, value);
            } catch (e) {
                this._yapi.imm_log('Exception in valueCallback:', e);
            }
        } else {
            super._invokeValueCallback(value);
        }
        return 0;
    }

    /**
     * Returns the next Led
     *
     * @returns {YLed}
     */
    nextLed(): YLed | null
    {
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI.SUCCESS) return null;
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, <string> resolve.result);
        if(next_hwid == null) return null;
        return YLed.FindLedInContext(this._yapi, next_hwid);
    }

    /**
     * Retrieves the first Led in a YAPI context
     *
     * @returns {YLed}
     */
    static FirstLed(): YLed | null
    {
        let next_hwid = YAPI.imm_getFirstHardwareId('Led');
        if(next_hwid == null) return null;
        return YLed.FindLed(next_hwid);
    }

    /**
     * Retrieves the first Led in a given context
     *
     * @param yctx {YAPIContext}
     *
     * @returns {YLed}
     */
    static FirstLedInContext(yctx: YAPIContext): YLed | null
    {
        let next_hwid = yctx.imm_getFirstHardwareId('Led');
        if(next_hwid == null) return null;
        return YLed.FindLedInContext(yctx, next_hwid);
    }

    //--- (end of YLed implementation)
}

