/*********************************************************************
 *
 *  $Id: yocto_segmenteddisplay.ts 48520 2022-02-03 10:51:20Z seb $
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

import { YAPI, YAPIContext, YErrorMsg, YFunction, YModule, YSensor, YDataLogger, YMeasure } from './yocto_api.js';

//--- (YSegmentedDisplay class start)
/**
 * YSegmentedDisplay Class: segmented display control interface
 *
 * The SegmentedDisplay class allows you to drive segmented displays.
 */
//--- (end of YSegmentedDisplay class start)

export class YSegmentedDisplay extends YFunction
{
    //--- (YSegmentedDisplay attributes declaration)
    _className: string;
    _displayedText: string = YSegmentedDisplay.DISPLAYEDTEXT_INVALID;
    _displayMode: YSegmentedDisplay.DISPLAYMODE = YSegmentedDisplay.DISPLAYMODE_INVALID;
    _valueCallbackSegmentedDisplay: YSegmentedDisplay.ValueCallback | null = null;

    // API symbols as object properties
    public readonly DISPLAYEDTEXT_INVALID: string = YAPI.INVALID_STRING;
    public readonly DISPLAYMODE_DISCONNECTED: YSegmentedDisplay.DISPLAYMODE = 0;
    public readonly DISPLAYMODE_MANUAL: YSegmentedDisplay.DISPLAYMODE = 1;
    public readonly DISPLAYMODE_AUTO1: YSegmentedDisplay.DISPLAYMODE = 2;
    public readonly DISPLAYMODE_AUTO60: YSegmentedDisplay.DISPLAYMODE = 3;
    public readonly DISPLAYMODE_INVALID: YSegmentedDisplay.DISPLAYMODE = -1;

    // API symbols as static members
    public static readonly DISPLAYEDTEXT_INVALID: string = YAPI.INVALID_STRING;
    public static readonly DISPLAYMODE_DISCONNECTED: YSegmentedDisplay.DISPLAYMODE = 0;
    public static readonly DISPLAYMODE_MANUAL: YSegmentedDisplay.DISPLAYMODE = 1;
    public static readonly DISPLAYMODE_AUTO1: YSegmentedDisplay.DISPLAYMODE = 2;
    public static readonly DISPLAYMODE_AUTO60: YSegmentedDisplay.DISPLAYMODE = 3;
    public static readonly DISPLAYMODE_INVALID: YSegmentedDisplay.DISPLAYMODE = -1;
    //--- (end of YSegmentedDisplay attributes declaration)

    constructor(yapi: YAPIContext, func: string)
    {
        //--- (YSegmentedDisplay constructor)
        super(yapi, func);
        this._className                  = 'SegmentedDisplay';
        //--- (end of YSegmentedDisplay constructor)
    }

    //--- (YSegmentedDisplay implementation)

    imm_parseAttr(name: string, val: any)
    {
        switch(name) {
        case 'displayedText':
            this._displayedText = <string> <string> val;
            return 1;
        case 'displayMode':
            this._displayMode = <YSegmentedDisplay.DISPLAYMODE> <number> val;
            return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Returns the text currently displayed on the screen.
     *
     * @return a string corresponding to the text currently displayed on the screen
     *
     * On failure, throws an exception or returns YSegmentedDisplay.DISPLAYEDTEXT_INVALID.
     */
    async get_displayedText(): Promise<string>
    {
        let res: string;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YSegmentedDisplay.DISPLAYEDTEXT_INVALID;
            }
        }
        res = this._displayedText;
        return res;
    }

    /**
     * Changes the text currently displayed on the screen.
     *
     * @param newval : a string corresponding to the text currently displayed on the screen
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_displayedText(newval: string): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('displayedText',rest_val);
    }

    async get_displayMode(): Promise<YSegmentedDisplay.DISPLAYMODE>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YSegmentedDisplay.DISPLAYMODE_INVALID;
            }
        }
        res = this._displayMode;
        return res;
    }

    async set_displayMode(newval: YSegmentedDisplay.DISPLAYMODE): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('displayMode',rest_val);
    }

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
    static FindSegmentedDisplay(func: string): YSegmentedDisplay
    {
        let obj: YSegmentedDisplay | null;
        obj = <YSegmentedDisplay> YFunction._FindFromCache('SegmentedDisplay', func);
        if (obj == null) {
            obj = new YSegmentedDisplay(YAPI, func);
            YFunction._AddToCache('SegmentedDisplay',  func, obj);
        }
        return obj;
    }

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
    static FindSegmentedDisplayInContext(yctx: YAPIContext, func: string): YSegmentedDisplay
    {
        let obj: YSegmentedDisplay | null;
        obj = <YSegmentedDisplay> YFunction._FindFromCacheInContext(yctx,  'SegmentedDisplay', func);
        if (obj == null) {
            obj = new YSegmentedDisplay(yctx, func);
            YFunction._AddToCache('SegmentedDisplay',  func, obj);
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
    async registerValueCallback(callback: YSegmentedDisplay.ValueCallback | null): Promise<number>
    {
        let val: string;
        if (callback != null) {
            await YFunction._UpdateValueCallbackList(this, true);
        } else {
            await YFunction._UpdateValueCallbackList(this, false);
        }
        this._valueCallbackSegmentedDisplay = callback;
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
        if (this._valueCallbackSegmentedDisplay != null) {
            try {
                await this._valueCallbackSegmentedDisplay(this, value);
            } catch (e) {
                this._yapi.imm_log('Exception in valueCallback:', e);
            }
        } else {
            super._invokeValueCallback(value);
        }
        return 0;
    }

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
    nextSegmentedDisplay(): YSegmentedDisplay | null
    {
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI.SUCCESS) return null;
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, <string> resolve.result);
        if(next_hwid == null) return null;
        return YSegmentedDisplay.FindSegmentedDisplayInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of segmented displays currently accessible.
     * Use the method YSegmentedDisplay.nextSegmentedDisplay() to iterate on
     * next segmented displays.
     *
     * @return a pointer to a YSegmentedDisplay object, corresponding to
     *         the first segmented display currently online, or a null pointer
     *         if there are none.
     */
    static FirstSegmentedDisplay(): YSegmentedDisplay | null
    {
        let next_hwid = YAPI.imm_getFirstHardwareId('SegmentedDisplay');
        if(next_hwid == null) return null;
        return YSegmentedDisplay.FindSegmentedDisplay(next_hwid);
    }

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
    static FirstSegmentedDisplayInContext(yctx: YAPIContext): YSegmentedDisplay | null
    {
        let next_hwid = yctx.imm_getFirstHardwareId('SegmentedDisplay');
        if(next_hwid == null) return null;
        return YSegmentedDisplay.FindSegmentedDisplayInContext(yctx, next_hwid);
    }

    //--- (end of YSegmentedDisplay implementation)
}

export namespace YSegmentedDisplay {
    //--- (YSegmentedDisplay definitions)
    export const enum DISPLAYMODE {
        DISCONNECTED = 0,
        MANUAL = 1,
        AUTO1 = 2,
        AUTO60 = 3,
        INVALID = -1
    }
    export interface ValueCallback { (func: YSegmentedDisplay, value: string): void }
    //--- (end of YSegmentedDisplay definitions)
}

