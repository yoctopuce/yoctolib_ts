/*********************************************************************
 *
 *  $Id: yocto_segmenteddisplay.ts 54279 2023-04-28 10:11:03Z seb $
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
/**
 * YSegmentedDisplay Class: segmented display control interface
 *
 * The SegmentedDisplay class allows you to drive segmented displays.
 */
export declare class YSegmentedDisplay extends YFunction {
    _className: string;
    _displayedText: string;
    _displayMode: YSegmentedDisplay.DISPLAYMODE;
    _valueCallbackSegmentedDisplay: YSegmentedDisplay.ValueCallback | null;
    readonly DISPLAYEDTEXT_INVALID: string;
    readonly DISPLAYMODE_DISCONNECTED: YSegmentedDisplay.DISPLAYMODE;
    readonly DISPLAYMODE_MANUAL: YSegmentedDisplay.DISPLAYMODE;
    readonly DISPLAYMODE_AUTO1: YSegmentedDisplay.DISPLAYMODE;
    readonly DISPLAYMODE_AUTO60: YSegmentedDisplay.DISPLAYMODE;
    readonly DISPLAYMODE_INVALID: YSegmentedDisplay.DISPLAYMODE;
    static readonly DISPLAYEDTEXT_INVALID: string;
    static readonly DISPLAYMODE_DISCONNECTED: YSegmentedDisplay.DISPLAYMODE;
    static readonly DISPLAYMODE_MANUAL: YSegmentedDisplay.DISPLAYMODE;
    static readonly DISPLAYMODE_AUTO1: YSegmentedDisplay.DISPLAYMODE;
    static readonly DISPLAYMODE_AUTO60: YSegmentedDisplay.DISPLAYMODE;
    static readonly DISPLAYMODE_INVALID: YSegmentedDisplay.DISPLAYMODE;
    constructor(yapi: YAPIContext, func: string);
    imm_parseAttr(name: string, val: any): 0 | 1;
    /**
     * Returns the text currently displayed on the screen.
     *
     * @return a string corresponding to the text currently displayed on the screen
     *
     * On failure, throws an exception or returns YSegmentedDisplay.DISPLAYEDTEXT_INVALID.
     */
    get_displayedText(): Promise<string>;
    /**
     * Changes the text currently displayed on the screen.
     *
     * @param newval : a string corresponding to the text currently displayed on the screen
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_displayedText(newval: string): Promise<number>;
    get_displayMode(): Promise<YSegmentedDisplay.DISPLAYMODE>;
    set_displayMode(newval: YSegmentedDisplay.DISPLAYMODE): Promise<number>;
    /**
     * Retrieves a segmented display for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the segmented display is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YSegmentedDisplay.isOnline() to test if the segmented display is
     * indeed online at a given time. In case of ambiguity when looking for
     * a segmented display by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the segmented display, for instance
     *         MyDevice.segmentedDisplay.
     *
     * @return a YSegmentedDisplay object allowing you to drive the segmented display.
     */
    static FindSegmentedDisplay(func: string): YSegmentedDisplay;
    /**
     * Retrieves a segmented display for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the segmented display is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YSegmentedDisplay.isOnline() to test if the segmented display is
     * indeed online at a given time. In case of ambiguity when looking for
     * a segmented display by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx : a YAPI context
     * @param func : a string that uniquely characterizes the segmented display, for instance
     *         MyDevice.segmentedDisplay.
     *
     * @return a YSegmentedDisplay object allowing you to drive the segmented display.
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
    registerValueCallback(callback: YSegmentedDisplay.ValueCallback | null): Promise<number>;
    _invokeValueCallback(value: string): Promise<number>;
    /**
     * Continues the enumeration of segmented displays started using yFirstSegmentedDisplay().
     * Caution: You can't make any assumption about the returned segmented displays order.
     * If you want to find a specific a segmented display, use SegmentedDisplay.findSegmentedDisplay()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YSegmentedDisplay object, corresponding to
     *         a segmented display currently online, or a null pointer
     *         if there are no more segmented displays to enumerate.
     */
    nextSegmentedDisplay(): YSegmentedDisplay | null;
    /**
     * Starts the enumeration of segmented displays currently accessible.
     * Use the method YSegmentedDisplay.nextSegmentedDisplay() to iterate on
     * next segmented displays.
     *
     * @return a pointer to a YSegmentedDisplay object, corresponding to
     *         the first segmented display currently online, or a null pointer
     *         if there are none.
     */
    static FirstSegmentedDisplay(): YSegmentedDisplay | null;
    /**
     * Starts the enumeration of segmented displays currently accessible.
     * Use the method YSegmentedDisplay.nextSegmentedDisplay() to iterate on
     * next segmented displays.
     *
     * @param yctx : a YAPI context.
     *
     * @return a pointer to a YSegmentedDisplay object, corresponding to
     *         the first segmented display currently online, or a null pointer
     *         if there are none.
     */
    static FirstSegmentedDisplayInContext(yctx: YAPIContext): YSegmentedDisplay | null;
}
export declare namespace YSegmentedDisplay {
    const enum DISPLAYMODE {
        DISCONNECTED = 0,
        MANUAL = 1,
        AUTO1 = 2,
        AUTO60 = 3,
        INVALID = -1
    }
    interface ValueCallback {
        (func: YSegmentedDisplay, value: string): void;
    }
}
