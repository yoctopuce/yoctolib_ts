/*********************************************************************
 *
 *  $Id: svn_id $
 *
 *  Implements the high-level API for SegmentedDisplay functions
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
export declare const enum Y_DisplayMode {
    DISCONNECTED = 0,
    MANUAL = 1,
    AUTO1 = 2,
    AUTO60 = 3,
    INVALID = -1
}
export interface YSegmentedDisplayValueCallback {
    (func: YSegmentedDisplay, value: string): void;
}
/**
 * YSegmentedDisplay Class: segmented display control interface
 *
 * The SegmentedDisplay class allows you to drive segmented displays.
 */
export declare class YSegmentedDisplay extends YFunction {
    _className: string;
    _displayedText: string;
    _displayMode: Y_DisplayMode;
    _valueCallbackSegmentedDisplay: YSegmentedDisplayValueCallback | null;
    readonly DISPLAYEDTEXT_INVALID: string;
    readonly DISPLAYMODE_DISCONNECTED: Y_DisplayMode;
    readonly DISPLAYMODE_MANUAL: Y_DisplayMode;
    readonly DISPLAYMODE_AUTO1: Y_DisplayMode;
    readonly DISPLAYMODE_AUTO60: Y_DisplayMode;
    readonly DISPLAYMODE_INVALID: Y_DisplayMode;
    static readonly DISPLAYEDTEXT_INVALID: string;
    static readonly DISPLAYMODE_DISCONNECTED: Y_DisplayMode;
    static readonly DISPLAYMODE_MANUAL: Y_DisplayMode;
    static readonly DISPLAYMODE_AUTO1: Y_DisplayMode;
    static readonly DISPLAYMODE_AUTO60: Y_DisplayMode;
    static readonly DISPLAYMODE_INVALID: Y_DisplayMode;
    constructor(yapi: YAPIContext, func: string);
    imm_parseAttr(name: string, val: any): 0 | 1;
    /**
     * Returns the text currently displayed on the screen.
     *
     * @return a string corresponding to the text currently displayed on the screen
     *
     * On failure, throws an exception or returns Y_DISPLAYEDTEXT_INVALID.
     */
    get_displayedText(): Promise<string>;
    /**
     * Changes the text currently displayed on the screen.
     *
     * @param newval : a string corresponding to the text currently displayed on the screen
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_displayedText(newval: string): Promise<number>;
    get_displayMode(): Promise<Y_DisplayMode>;
    set_displayMode(newval: Y_DisplayMode): Promise<number>;
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
     * Use the method YSegmentedDisplay.isOnline() to test if $THEFUNCTION$ is
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
     * @return a YSegmentedDisplay object allowing you to drive $THEFUNCTION$.
     */
    static FindSegmentedDisplay(func: string): YSegmentedDisplay;
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
     * Use the method YSegmentedDisplay.isOnline() to test if $THEFUNCTION$ is
     * indeed online at a given time. In case of ambiguity when looking for
     * $AFUNCTION$ by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx : a YAPI context
     * @param func : a string that uniquely characterizes $THEFUNCTION$, for instance
     *         $FULLHARDWAREID$.
     *
     * @return a YSegmentedDisplay object allowing you to drive $THEFUNCTION$.
     */
    static FindSegmentedDisplayInContext(yctx: YAPIContext, func: string): YSegmentedDisplay;
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
    registerValueCallback(callback: YSegmentedDisplayValueCallback | null): Promise<number>;
    _invokeValueCallback(value: string): Promise<number>;
    /**
     * Returns the next SegmentedDisplay
     *
     * @returns {YSegmentedDisplay}
     */
    nextSegmentedDisplay(): YSegmentedDisplay | null;
    /**
     * Retrieves the first SegmentedDisplay in a YAPI context
     *
     * @returns {YSegmentedDisplay}
     */
    static FirstSegmentedDisplay(): YSegmentedDisplay | null;
    /**
     * Retrieves the first SegmentedDisplay in a given context
     *
     * @param yctx {YAPIContext}
     *
     * @returns {YSegmentedDisplay}
     */
    static FirstSegmentedDisplayInContext(yctx: YAPIContext): YSegmentedDisplay | null;
}
