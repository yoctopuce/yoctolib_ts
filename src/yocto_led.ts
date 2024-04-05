/*********************************************************************
 *
 *  $Id: yocto_led.ts 59977 2024-03-18 15:02:32Z mvuilleu $
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
    _power: YLed.POWER = YLed.POWER_INVALID;
    _luminosity: number = YLed.LUMINOSITY_INVALID;
    _blinking: YLed.BLINKING = YLed.BLINKING_INVALID;
    _valueCallbackLed: YLed.ValueCallback | null = null;

    // API symbols as object properties
    public readonly POWER_OFF: YLed.POWER = 0;
    public readonly POWER_ON: YLed.POWER = 1;
    public readonly POWER_INVALID: YLed.POWER = -1;
    public readonly LUMINOSITY_INVALID: number = YAPI.INVALID_UINT;
    public readonly BLINKING_STILL: YLed.BLINKING = 0;
    public readonly BLINKING_RELAX: YLed.BLINKING = 1;
    public readonly BLINKING_AWARE: YLed.BLINKING = 2;
    public readonly BLINKING_RUN: YLed.BLINKING = 3;
    public readonly BLINKING_CALL: YLed.BLINKING = 4;
    public readonly BLINKING_PANIC: YLed.BLINKING = 5;
    public readonly BLINKING_INVALID: YLed.BLINKING = -1;

    // API symbols as static members
    public static readonly POWER_OFF: YLed.POWER = 0;
    public static readonly POWER_ON: YLed.POWER = 1;
    public static readonly POWER_INVALID: YLed.POWER = -1;
    public static readonly LUMINOSITY_INVALID: number = YAPI.INVALID_UINT;
    public static readonly BLINKING_STILL: YLed.BLINKING = 0;
    public static readonly BLINKING_RELAX: YLed.BLINKING = 1;
    public static readonly BLINKING_AWARE: YLed.BLINKING = 2;
    public static readonly BLINKING_RUN: YLed.BLINKING = 3;
    public static readonly BLINKING_CALL: YLed.BLINKING = 4;
    public static readonly BLINKING_PANIC: YLed.BLINKING = 5;
    public static readonly BLINKING_INVALID: YLed.BLINKING = -1;
    //--- (end of YLed attributes declaration)

    constructor(yapi: YAPIContext, func: string)
    {
        //--- (YLed constructor)
        super(yapi, func);
        this._className                  = 'Led';
        //--- (end of YLed constructor)
    }

    //--- (YLed implementation)

    imm_parseAttr(name: string, val: any): number
    {
        switch (name) {
        case 'power':
            this._power = <YLed.POWER> <number> val;
            return 1;
        case 'luminosity':
            this._luminosity = <number> <number> val;
            return 1;
        case 'blinking':
            this._blinking = <YLed.BLINKING> <number> val;
            return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Returns the current LED state.
     *
     * @return either YLed.POWER_OFF or YLed.POWER_ON, according to the current LED state
     *
     * On failure, throws an exception or returns YLed.POWER_INVALID.
     */
    async get_power(): Promise<YLed.POWER>
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
     * @param newval : either YLed.POWER_OFF or YLed.POWER_ON, according to the state of the LED
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_power(newval: YLed.POWER): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('power', rest_val);
    }

    /**
     * Returns the current LED intensity (in per cent).
     *
     * @return an integer corresponding to the current LED intensity (in per cent)
     *
     * On failure, throws an exception or returns YLed.LUMINOSITY_INVALID.
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
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_luminosity(newval: number): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('luminosity', rest_val);
    }

    /**
     * Returns the current LED signaling mode.
     *
     * @return a value among YLed.BLINKING_STILL, YLed.BLINKING_RELAX, YLed.BLINKING_AWARE,
     * YLed.BLINKING_RUN, YLed.BLINKING_CALL and YLed.BLINKING_PANIC corresponding to the current LED signaling mode
     *
     * On failure, throws an exception or returns YLed.BLINKING_INVALID.
     */
    async get_blinking(): Promise<YLed.BLINKING>
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
     * @param newval : a value among YLed.BLINKING_STILL, YLed.BLINKING_RELAX, YLed.BLINKING_AWARE,
     * YLed.BLINKING_RUN, YLed.BLINKING_CALL and YLed.BLINKING_PANIC corresponding to the current LED signaling mode
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_blinking(newval: YLed.BLINKING): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('blinking', rest_val);
    }

    /**
     * Retrieves a monochrome LED for a given identifier.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the monochrome LED is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YLed.isOnline() to test if the monochrome LED is
     * indeed online at a given time. In case of ambiguity when looking for
     * a monochrome LED by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the monochrome LED, for instance
     *         YBUZZER2.led1.
     *
     * @return a YLed object allowing you to drive the monochrome LED.
     */
    static FindLed(func: string): YLed
    {
        let obj: YLed | null;
        obj = <YLed> YFunction._FindFromCache('Led', func);
        if (obj == null) {
            obj = new YLed(YAPI, func);
            YFunction._AddToCache('Led',  func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a monochrome LED for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the monochrome LED is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YLed.isOnline() to test if the monochrome LED is
     * indeed online at a given time. In case of ambiguity when looking for
     * a monochrome LED by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx : a YAPI context
     * @param func : a string that uniquely characterizes the monochrome LED, for instance
     *         YBUZZER2.led1.
     *
     * @return a YLed object allowing you to drive the monochrome LED.
     */
    static FindLedInContext(yctx: YAPIContext, func: string): YLed
    {
        let obj: YLed | null;
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
    async registerValueCallback(callback: YLed.ValueCallback | null): Promise<number>
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
            await super._invokeValueCallback(value);
        }
        return 0;
    }

    /**
     * Continues the enumeration of monochrome LEDs started using yFirstLed().
     * Caution: You can't make any assumption about the returned monochrome LEDs order.
     * If you want to find a specific a monochrome LED, use Led.findLed()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YLed object, corresponding to
     *         a monochrome LED currently online, or a null pointer
     *         if there are no more monochrome LEDs to enumerate.
     */
    nextLed(): YLed | null
    {
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != YAPI.SUCCESS) return null;
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, <string> resolve.result);
        if (next_hwid == null) return null;
        return YLed.FindLedInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of monochrome LEDs currently accessible.
     * Use the method YLed.nextLed() to iterate on
     * next monochrome LEDs.
     *
     * @return a pointer to a YLed object, corresponding to
     *         the first monochrome LED currently online, or a null pointer
     *         if there are none.
     */
    static FirstLed(): YLed | null
    {
        let next_hwid = YAPI.imm_getFirstHardwareId('Led');
        if (next_hwid == null) return null;
        return YLed.FindLed(next_hwid);
    }

    /**
     * Starts the enumeration of monochrome LEDs currently accessible.
     * Use the method YLed.nextLed() to iterate on
     * next monochrome LEDs.
     *
     * @param yctx : a YAPI context.
     *
     * @return a pointer to a YLed object, corresponding to
     *         the first monochrome LED currently online, or a null pointer
     *         if there are none.
     */
    static FirstLedInContext(yctx: YAPIContext): YLed | null
    {
        let next_hwid = yctx.imm_getFirstHardwareId('Led');
        if (next_hwid == null) return null;
        return YLed.FindLedInContext(yctx, next_hwid);
    }

    //--- (end of YLed implementation)
}

export namespace YLed {
    //--- (YLed definitions)
    export const enum POWER
    {
        OFF = 0,
        ON = 1,
        INVALID = -1
    }

    export const enum BLINKING
    {
        STILL = 0,
        RELAX = 1,
        AWARE = 2,
        RUN = 3,
        CALL = 4,
        PANIC = 5,
        INVALID = -1
    }

    export interface ValueCallback {(func: YLed, value: string): void}

    //--- (end of YLed definitions)
}

