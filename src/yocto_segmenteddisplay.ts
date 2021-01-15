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

import { YAPI, YAPIContext, YErrorMsg, YFunction, YModule, YSensor, YDataLogger, YMeasure } from './yocto_api.js';

//--- (YSegmentedDisplay definitions)
export const enum Y_DisplayMode {
    DISCONNECTED = 0,
    MANUAL = 1,
    AUTO1 = 2,
    AUTO60 = 3,
    INVALID = -1
}
export interface YSegmentedDisplayValueCallback { (func: YSegmentedDisplay, value: string): void }
//--- (end of YSegmentedDisplay definitions)

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
    _displayMode: Y_DisplayMode = YSegmentedDisplay.DISPLAYMODE_INVALID;
    _valueCallbackSegmentedDisplay: YSegmentedDisplayValueCallback | null = null;

    // API symbols as object properties
    public readonly DISPLAYEDTEXT_INVALID: string = YAPI.INVALID_STRING;
    public readonly DISPLAYMODE_DISCONNECTED: Y_DisplayMode = Y_DisplayMode.DISCONNECTED;
    public readonly DISPLAYMODE_MANUAL: Y_DisplayMode = Y_DisplayMode.MANUAL;
    public readonly DISPLAYMODE_AUTO1: Y_DisplayMode = Y_DisplayMode.AUTO1;
    public readonly DISPLAYMODE_AUTO60: Y_DisplayMode = Y_DisplayMode.AUTO60;
    public readonly DISPLAYMODE_INVALID: Y_DisplayMode = Y_DisplayMode.INVALID;

    // API symbols as static members
    public static readonly DISPLAYEDTEXT_INVALID: string = YAPI.INVALID_STRING;
    public static readonly DISPLAYMODE_DISCONNECTED: Y_DisplayMode = Y_DisplayMode.DISCONNECTED;
    public static readonly DISPLAYMODE_MANUAL: Y_DisplayMode = Y_DisplayMode.MANUAL;
    public static readonly DISPLAYMODE_AUTO1: Y_DisplayMode = Y_DisplayMode.AUTO1;
    public static readonly DISPLAYMODE_AUTO60: Y_DisplayMode = Y_DisplayMode.AUTO60;
    public static readonly DISPLAYMODE_INVALID: Y_DisplayMode = Y_DisplayMode.INVALID;
    //--- (end of YSegmentedDisplay attributes declaration)

//--- (YSegmentedDisplay return codes)
//--- (end of YSegmentedDisplay return codes)

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
            this._displayMode = <Y_DisplayMode> <number> val;
            return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Returns the text currently displayed on the screen.
     *
     * @return a string corresponding to the text currently displayed on the screen
     *
     * On failure, throws an exception or returns Y_DISPLAYEDTEXT_INVALID.
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
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_displayedText(newval: string): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('displayedText',rest_val);
    }

    async get_displayMode(): Promise<Y_DisplayMode>
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

    async set_displayMode(newval: Y_DisplayMode): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('displayMode',rest_val);
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
    static FindSegmentedDisplay(func: string): YSegmentedDisplay
    {
        let obj: YSegmentedDisplay;
        obj = <YSegmentedDisplay> YFunction._FindFromCache('SegmentedDisplay', func);
        if (obj == null) {
            obj = new YSegmentedDisplay(YAPI, func);
            YFunction._AddToCache('SegmentedDisplay',  func, obj);
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
    static FindSegmentedDisplayInContext(yctx: YAPIContext, func: string): YSegmentedDisplay
    {
        let obj: YSegmentedDisplay;
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
    async registerValueCallback(callback: YSegmentedDisplayValueCallback | null): Promise<number>
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
     * Returns the next SegmentedDisplay
     *
     * @returns {YSegmentedDisplay}
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
     * Retrieves the first SegmentedDisplay in a YAPI context
     *
     * @returns {YSegmentedDisplay}
     */
    static FirstSegmentedDisplay(): YSegmentedDisplay | null
    {
        let next_hwid = YAPI.imm_getFirstHardwareId('SegmentedDisplay');
        if(next_hwid == null) return null;
        return YSegmentedDisplay.FindSegmentedDisplay(next_hwid);
    }

    /**
     * Retrieves the first SegmentedDisplay in a given context
     *
     * @param yctx {YAPIContext}
     *
     * @returns {YSegmentedDisplay}
     */
    static FirstSegmentedDisplayInContext(yctx: YAPIContext): YSegmentedDisplay | null
    {
        let next_hwid = yctx.imm_getFirstHardwareId('SegmentedDisplay');
        if(next_hwid == null) return null;
        return YSegmentedDisplay.FindSegmentedDisplayInContext(yctx, next_hwid);
    }

    //--- (end of YSegmentedDisplay implementation)
}

