/*********************************************************************
 *
 *  $Id: yocto_colorled.ts 48520 2022-02-03 10:51:20Z seb $
 *
 *  Implements the high-level API for ColorLed functions
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
/**
 * YColorLed Class: RGB LED control interface, available for instance in the Yocto-Color-V2, the
 * Yocto-MaxiBuzzer or the Yocto-PowerColor
 *
 * The ColorLed class allows you to drive a color LED.
 * The color can be specified using RGB coordinates as well as HSL coordinates.
 * The module performs all conversions form RGB to HSL automatically. It is then
 * self-evident to turn on a LED with a given hue and to progressively vary its
 * saturation or lightness. If needed, you can find more information on the
 * difference between RGB and HSL in the section following this one.
 */
export declare class YColorLed extends YFunction {
    _className: string;
    _rgbColor: number;
    _hslColor: number;
    _rgbMove: YColorLed.Move;
    _hslMove: YColorLed.Move;
    _rgbColorAtPowerOn: number;
    _blinkSeqSize: number;
    _blinkSeqMaxSize: number;
    _blinkSeqSignature: number;
    _command: string;
    _valueCallbackColorLed: YColorLed.ValueCallback | null;
    readonly RGBCOLOR_INVALID: number;
    readonly HSLCOLOR_INVALID: number;
    readonly RGBCOLORATPOWERON_INVALID: number;
    readonly BLINKSEQSIZE_INVALID: number;
    readonly BLINKSEQMAXSIZE_INVALID: number;
    readonly BLINKSEQSIGNATURE_INVALID: number;
    readonly COMMAND_INVALID: string;
    static readonly RGBMOVE_INVALID: YColorLed.Move;
    static readonly HSLMOVE_INVALID: YColorLed.Move;
    static readonly RGBCOLOR_INVALID: number;
    static readonly HSLCOLOR_INVALID: number;
    static readonly RGBCOLORATPOWERON_INVALID: number;
    static readonly BLINKSEQSIZE_INVALID: number;
    static readonly BLINKSEQMAXSIZE_INVALID: number;
    static readonly BLINKSEQSIGNATURE_INVALID: number;
    static readonly COMMAND_INVALID: string;
    constructor(yapi: YAPIContext, func: string);
    imm_parseAttr(name: string, val: any): 0 | 1;
    /**
     * Returns the current RGB color of the LED.
     *
     * @return an integer corresponding to the current RGB color of the LED
     *
     * On failure, throws an exception or returns YColorLed.RGBCOLOR_INVALID.
     */
    get_rgbColor(): Promise<number>;
    /**
     * Changes the current color of the LED, using an RGB color. Encoding is done as follows: 0xRRGGBB.
     *
     * @param newval : an integer corresponding to the current color of the LED, using an RGB color
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_rgbColor(newval: number): Promise<number>;
    /**
     * Returns the current HSL color of the LED.
     *
     * @return an integer corresponding to the current HSL color of the LED
     *
     * On failure, throws an exception or returns YColorLed.HSLCOLOR_INVALID.
     */
    get_hslColor(): Promise<number>;
    /**
     * Changes the current color of the LED, using a color HSL. Encoding is done as follows: 0xHHSSLL.
     *
     * @param newval : an integer corresponding to the current color of the LED, using a color HSL
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_hslColor(newval: number): Promise<number>;
    get_rgbMove(): Promise<YColorLed.Move>;
    set_rgbMove(newval: YColorLed.Move): Promise<number>;
    /**
     * Performs a smooth transition in the RGB color space between the current color and a target color.
     *
     * @param rgb_target  : desired RGB color at the end of the transition
     * @param ms_duration : duration of the transition, in millisecond
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    rgbMove(rgb_target: number, ms_duration: number): Promise<number>;
    get_hslMove(): Promise<YColorLed.Move>;
    set_hslMove(newval: YColorLed.Move): Promise<number>;
    /**
     * Performs a smooth transition in the HSL color space between the current color and a target color.
     *
     * @param hsl_target  : desired HSL color at the end of the transition
     * @param ms_duration : duration of the transition, in millisecond
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    hslMove(hsl_target: number, ms_duration: number): Promise<number>;
    /**
     * Returns the configured color to be displayed when the module is turned on.
     *
     * @return an integer corresponding to the configured color to be displayed when the module is turned on
     *
     * On failure, throws an exception or returns YColorLed.RGBCOLORATPOWERON_INVALID.
     */
    get_rgbColorAtPowerOn(): Promise<number>;
    /**
     * Changes the color that the LED displays by default when the module is turned on.
     * Remember to call the saveToFlash()
     * method of the module if the modification must be kept.
     *
     * @param newval : an integer corresponding to the color that the LED displays by default when the
     * module is turned on
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_rgbColorAtPowerOn(newval: number): Promise<number>;
    /**
     * Returns the current length of the blinking sequence.
     *
     * @return an integer corresponding to the current length of the blinking sequence
     *
     * On failure, throws an exception or returns YColorLed.BLINKSEQSIZE_INVALID.
     */
    get_blinkSeqSize(): Promise<number>;
    /**
     * Returns the maximum length of the blinking sequence.
     *
     * @return an integer corresponding to the maximum length of the blinking sequence
     *
     * On failure, throws an exception or returns YColorLed.BLINKSEQMAXSIZE_INVALID.
     */
    get_blinkSeqMaxSize(): Promise<number>;
    /**
     * Return the blinking sequence signature. Since blinking
     * sequences cannot be read from the device, this can be used
     * to detect if a specific blinking sequence is already
     * programmed.
     *
     * @return an integer
     *
     * On failure, throws an exception or returns YColorLed.BLINKSEQSIGNATURE_INVALID.
     */
    get_blinkSeqSignature(): Promise<number>;
    get_command(): Promise<string>;
    set_command(newval: string): Promise<number>;
    /**
     * Retrieves an RGB LED for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the RGB LED is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YColorLed.isOnline() to test if the RGB LED is
     * indeed online at a given time. In case of ambiguity when looking for
     * an RGB LED by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the RGB LED, for instance
     *         YRGBLED2.colorLed1.
     *
     * @return a YColorLed object allowing you to drive the RGB LED.
     */
    static FindColorLed(func: string): YColorLed;
    /**
     * Retrieves an RGB LED for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the RGB LED is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YColorLed.isOnline() to test if the RGB LED is
     * indeed online at a given time. In case of ambiguity when looking for
     * an RGB LED by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx : a YAPI context
     * @param func : a string that uniquely characterizes the RGB LED, for instance
     *         YRGBLED2.colorLed1.
     *
     * @return a YColorLed object allowing you to drive the RGB LED.
     */
    static FindColorLedInContext(yctx: YAPIContext, func: string): YColorLed;
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
    registerValueCallback(callback: YColorLed.ValueCallback | null): Promise<number>;
    _invokeValueCallback(value: string): Promise<number>;
    sendCommand(command: string): Promise<number>;
    /**
     * Add a new transition to the blinking sequence, the move will
     * be performed in the HSL space.
     *
     * @param HSLcolor : desired HSL color when the transition is completed
     * @param msDelay : duration of the color transition, in milliseconds.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    addHslMoveToBlinkSeq(HSLcolor: number, msDelay: number): Promise<number>;
    /**
     * Adds a new transition to the blinking sequence, the move is
     * performed in the RGB space.
     *
     * @param RGBcolor : desired RGB color when the transition is completed
     * @param msDelay : duration of the color transition, in milliseconds.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    addRgbMoveToBlinkSeq(RGBcolor: number, msDelay: number): Promise<number>;
    /**
     * Starts the preprogrammed blinking sequence. The sequence is
     * run in a loop until it is stopped by stopBlinkSeq or an explicit
     * change.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    startBlinkSeq(): Promise<number>;
    /**
     * Stops the preprogrammed blinking sequence.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    stopBlinkSeq(): Promise<number>;
    /**
     * Resets the preprogrammed blinking sequence.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    resetBlinkSeq(): Promise<number>;
    /**
     * Continues the enumeration of RGB LEDs started using yFirstColorLed().
     * Caution: You can't make any assumption about the returned RGB LEDs order.
     * If you want to find a specific an RGB LED, use ColorLed.findColorLed()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YColorLed object, corresponding to
     *         an RGB LED currently online, or a null pointer
     *         if there are no more RGB LEDs to enumerate.
     */
    nextColorLed(): YColorLed | null;
    /**
     * Starts the enumeration of RGB LEDs currently accessible.
     * Use the method YColorLed.nextColorLed() to iterate on
     * next RGB LEDs.
     *
     * @return a pointer to a YColorLed object, corresponding to
     *         the first RGB LED currently online, or a null pointer
     *         if there are none.
     */
    static FirstColorLed(): YColorLed | null;
    /**
     * Starts the enumeration of RGB LEDs currently accessible.
     * Use the method YColorLed.nextColorLed() to iterate on
     * next RGB LEDs.
     *
     * @param yctx : a YAPI context.
     *
     * @return a pointer to a YColorLed object, corresponding to
     *         the first RGB LED currently online, or a null pointer
     *         if there are none.
     */
    static FirstColorLedInContext(yctx: YAPIContext): YColorLed | null;
}
export declare namespace YColorLed {
    interface Move {
        target?: number;
        ms?: number;
        moving?: number;
    }
    interface ValueCallback {
        (func: YColorLed, value: string): void;
    }
}
