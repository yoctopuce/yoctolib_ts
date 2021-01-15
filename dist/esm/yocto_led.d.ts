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
import { YAPIContext, YFunction } from './yocto_api.js';
export declare const enum Y_Power {
    OFF = 0,
    ON = 1,
    INVALID = -1
}
export declare const enum Y_Blinking {
    STILL = 0,
    RELAX = 1,
    AWARE = 2,
    RUN = 3,
    CALL = 4,
    PANIC = 5,
    INVALID = -1
}
export interface YLedValueCallback {
    (func: YLed, value: string): void;
}
/**
 * YLed Class: monochrome LED control interface, available for instance in the Yocto-Buzzer, the
 * YoctoBox-Short-Thin-Black-Prox, the YoctoBox-Short-Thin-Transp or the YoctoBox-Short-Thin-Transp-Prox
 *
 * The YLed class allows you to drive a monocolor LED.
 * You can not only to drive the intensity of the LED, but also to
 * have it blink at various preset frequencies.
 */
export declare class YLed extends YFunction {
    _className: string;
    _power: Y_Power;
    _luminosity: number;
    _blinking: Y_Blinking;
    _valueCallbackLed: YLedValueCallback | null;
    readonly POWER_OFF: Y_Power;
    readonly POWER_ON: Y_Power;
    readonly POWER_INVALID: Y_Power;
    readonly LUMINOSITY_INVALID: number;
    readonly BLINKING_STILL: Y_Blinking;
    readonly BLINKING_RELAX: Y_Blinking;
    readonly BLINKING_AWARE: Y_Blinking;
    readonly BLINKING_RUN: Y_Blinking;
    readonly BLINKING_CALL: Y_Blinking;
    readonly BLINKING_PANIC: Y_Blinking;
    readonly BLINKING_INVALID: Y_Blinking;
    static readonly POWER_OFF: Y_Power;
    static readonly POWER_ON: Y_Power;
    static readonly POWER_INVALID: Y_Power;
    static readonly LUMINOSITY_INVALID: number;
    static readonly BLINKING_STILL: Y_Blinking;
    static readonly BLINKING_RELAX: Y_Blinking;
    static readonly BLINKING_AWARE: Y_Blinking;
    static readonly BLINKING_RUN: Y_Blinking;
    static readonly BLINKING_CALL: Y_Blinking;
    static readonly BLINKING_PANIC: Y_Blinking;
    static readonly BLINKING_INVALID: Y_Blinking;
    constructor(yapi: YAPIContext, func: string);
    imm_parseAttr(name: string, val: any): 0 | 1;
    /**
     * Returns the current LED state.
     *
     * @return either Y_POWER_OFF or Y_POWER_ON, according to the current LED state
     *
     * On failure, throws an exception or returns Y_POWER_INVALID.
     */
    get_power(): Promise<Y_Power>;
    /**
     * Changes the state of the LED.
     *
     * @param newval : either Y_POWER_OFF or Y_POWER_ON, according to the state of the LED
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_power(newval: Y_Power): Promise<number>;
    /**
     * Returns the current LED intensity (in per cent).
     *
     * @return an integer corresponding to the current LED intensity (in per cent)
     *
     * On failure, throws an exception or returns Y_LUMINOSITY_INVALID.
     */
    get_luminosity(): Promise<number>;
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
    set_luminosity(newval: number): Promise<number>;
    /**
     * Returns the current LED signaling mode.
     *
     * @return a value among Y_BLINKING_STILL, Y_BLINKING_RELAX, Y_BLINKING_AWARE, Y_BLINKING_RUN,
     * Y_BLINKING_CALL and Y_BLINKING_PANIC corresponding to the current LED signaling mode
     *
     * On failure, throws an exception or returns Y_BLINKING_INVALID.
     */
    get_blinking(): Promise<Y_Blinking>;
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
    set_blinking(newval: Y_Blinking): Promise<number>;
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
    static FindLed(func: string): YLed;
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
    static FindLedInContext(yctx: YAPIContext, func: string): YLed;
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
    registerValueCallback(callback: YLedValueCallback | null): Promise<number>;
    _invokeValueCallback(value: string): Promise<number>;
    /**
     * Returns the next Led
     *
     * @returns {YLed}
     */
    nextLed(): YLed | null;
    /**
     * Retrieves the first Led in a YAPI context
     *
     * @returns {YLed}
     */
    static FirstLed(): YLed | null;
    /**
     * Retrieves the first Led in a given context
     *
     * @param yctx {YAPIContext}
     *
     * @returns {YLed}
     */
    static FirstLedInContext(yctx: YAPIContext): YLed | null;
}
