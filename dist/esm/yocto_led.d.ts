/*********************************************************************
 *
 *  $Id: yocto_led.ts 43483 2021-01-21 15:47:50Z mvuilleu $
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
export declare const enum YLed_Power {
    OFF = 0,
    ON = 1,
    INVALID = -1
}
export declare const enum YLed_Blinking {
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
    _power: YLed_Power;
    _luminosity: number;
    _blinking: YLed_Blinking;
    _valueCallbackLed: YLedValueCallback | null;
    readonly POWER_OFF: YLed_Power;
    readonly POWER_ON: YLed_Power;
    readonly POWER_INVALID: YLed_Power;
    readonly LUMINOSITY_INVALID: number;
    readonly BLINKING_STILL: YLed_Blinking;
    readonly BLINKING_RELAX: YLed_Blinking;
    readonly BLINKING_AWARE: YLed_Blinking;
    readonly BLINKING_RUN: YLed_Blinking;
    readonly BLINKING_CALL: YLed_Blinking;
    readonly BLINKING_PANIC: YLed_Blinking;
    readonly BLINKING_INVALID: YLed_Blinking;
    static readonly POWER_OFF: YLed_Power;
    static readonly POWER_ON: YLed_Power;
    static readonly POWER_INVALID: YLed_Power;
    static readonly LUMINOSITY_INVALID: number;
    static readonly BLINKING_STILL: YLed_Blinking;
    static readonly BLINKING_RELAX: YLed_Blinking;
    static readonly BLINKING_AWARE: YLed_Blinking;
    static readonly BLINKING_RUN: YLed_Blinking;
    static readonly BLINKING_CALL: YLed_Blinking;
    static readonly BLINKING_PANIC: YLed_Blinking;
    static readonly BLINKING_INVALID: YLed_Blinking;
    constructor(yapi: YAPIContext, func: string);
    imm_parseAttr(name: string, val: any): 0 | 1;
    /**
     * Returns the current LED state.
     *
     * @return either YLed.POWER_OFF or YLed.POWER_ON, according to the current LED state
     *
     * On failure, throws an exception or returns YLed.POWER_INVALID.
     */
    get_power(): Promise<YLed_Power>;
    /**
     * Changes the state of the LED.
     *
     * @param newval : either YLed.POWER_OFF or YLed.POWER_ON, according to the state of the LED
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_power(newval: YLed_Power): Promise<number>;
    /**
     * Returns the current LED intensity (in per cent).
     *
     * @return an integer corresponding to the current LED intensity (in per cent)
     *
     * On failure, throws an exception or returns YLed.LUMINOSITY_INVALID.
     */
    get_luminosity(): Promise<number>;
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
    set_luminosity(newval: number): Promise<number>;
    /**
     * Returns the current LED signaling mode.
     *
     * @return a value among YLed.BLINKING_STILL, YLed.BLINKING_RELAX, YLed.BLINKING_AWARE,
     * YLed.BLINKING_RUN, YLed.BLINKING_CALL and YLed.BLINKING_PANIC corresponding to the current LED signaling mode
     *
     * On failure, throws an exception or returns YLed.BLINKING_INVALID.
     */
    get_blinking(): Promise<YLed_Blinking>;
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
    set_blinking(newval: YLed_Blinking): Promise<number>;
    /**
     * Retrieves a monochrome LED for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
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
    static FindLed(func: string): YLed;
    /**
     * Retrieves a monochrome LED for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
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
     * Continues the enumeration of monochrome LEDs started using yFirstLed().
     * Caution: You can't make any assumption about the returned monochrome LEDs order.
     * If you want to find a specific a monochrome LED, use Led.findLed()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YLed object, corresponding to
     *         a monochrome LED currently online, or a null pointer
     *         if there are no more monochrome LEDs to enumerate.
     */
    nextLed(): YLed | null;
    /**
     * Starts the enumeration of monochrome LEDs currently accessible.
     * Use the method YLed.nextLed() to iterate on
     * next monochrome LEDs.
     *
     * @return a pointer to a YLed object, corresponding to
     *         the first monochrome LED currently online, or a null pointer
     *         if there are none.
     */
    static FirstLed(): YLed | null;
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
    static FirstLedInContext(yctx: YAPIContext): YLed | null;
}
