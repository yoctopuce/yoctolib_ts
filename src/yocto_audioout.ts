/*********************************************************************
 *
 *  $Id: svn_id $
 *
 *  Implements the high-level API for AudioOut functions
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

//--- (YAudioOut definitions)
export const enum Y_Mute {
    FALSE = 0,
    TRUE = 1,
    INVALID = -1
}
export interface YAudioOutValueCallback { (func: YAudioOut, value: string): void }
//--- (end of YAudioOut definitions)

//--- (YAudioOut class start)
/**
 * YAudioOut Class: audio output control interface
 *
 * The YAudioOut class allows you to configure the volume of an audio output.
 */
//--- (end of YAudioOut class start)

export class YAudioOut extends YFunction
{
    //--- (YAudioOut attributes declaration)
    _className: string;
    _volume: number = YAudioOut.VOLUME_INVALID;
    _mute: Y_Mute = YAudioOut.MUTE_INVALID;
    _volumeRange: string = YAudioOut.VOLUMERANGE_INVALID;
    _signal: number = YAudioOut.SIGNAL_INVALID;
    _noSignalFor: number = YAudioOut.NOSIGNALFOR_INVALID;
    _valueCallbackAudioOut: YAudioOutValueCallback | null = null;

    // API symbols as object properties
    public readonly VOLUME_INVALID: number = YAPI.INVALID_UINT;
    public readonly MUTE_FALSE: Y_Mute = Y_Mute.FALSE;
    public readonly MUTE_TRUE: Y_Mute = Y_Mute.TRUE;
    public readonly MUTE_INVALID: Y_Mute = Y_Mute.INVALID;
    public readonly VOLUMERANGE_INVALID: string = YAPI.INVALID_STRING;
    public readonly SIGNAL_INVALID: number = YAPI.INVALID_INT;
    public readonly NOSIGNALFOR_INVALID: number = YAPI.INVALID_INT;

    // API symbols as static members
    public static readonly VOLUME_INVALID: number = YAPI.INVALID_UINT;
    public static readonly MUTE_FALSE: Y_Mute = Y_Mute.FALSE;
    public static readonly MUTE_TRUE: Y_Mute = Y_Mute.TRUE;
    public static readonly MUTE_INVALID: Y_Mute = Y_Mute.INVALID;
    public static readonly VOLUMERANGE_INVALID: string = YAPI.INVALID_STRING;
    public static readonly SIGNAL_INVALID: number = YAPI.INVALID_INT;
    public static readonly NOSIGNALFOR_INVALID: number = YAPI.INVALID_INT;
    //--- (end of YAudioOut attributes declaration)

//--- (YAudioOut return codes)
//--- (end of YAudioOut return codes)

    constructor(yapi: YAPIContext, func: string)
    {
        //--- (YAudioOut constructor)
        super(yapi, func);
        this._className                  = 'AudioOut';
        //--- (end of YAudioOut constructor)
    }

    //--- (YAudioOut implementation)

    imm_parseAttr(name: string, val: any)
    {
        switch(name) {
        case 'volume':
            this._volume = <number> <number> val;
            return 1;
        case 'mute':
            this._mute = <Y_Mute> <number> val;
            return 1;
        case 'volumeRange':
            this._volumeRange = <string> <string> val;
            return 1;
        case 'signal':
            this._signal = <number> <number> val;
            return 1;
        case 'noSignalFor':
            this._noSignalFor = <number> <number> val;
            return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Returns audio output volume, in per cents.
     *
     * @return an integer corresponding to audio output volume, in per cents
     *
     * On failure, throws an exception or returns Y_VOLUME_INVALID.
     */
    async get_volume(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YAudioOut.VOLUME_INVALID;
            }
        }
        res = this._volume;
        return res;
    }

    /**
     * Changes audio output volume, in per cents.
     * Remember to call the saveToFlash()
     * method of the module if the modification must be kept.
     *
     * @param newval : an integer corresponding to audio output volume, in per cents
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_volume(newval: number): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('volume',rest_val);
    }

    /**
     * Returns the state of the mute function.
     *
     * @return either Y_MUTE_FALSE or Y_MUTE_TRUE, according to the state of the mute function
     *
     * On failure, throws an exception or returns Y_MUTE_INVALID.
     */
    async get_mute(): Promise<Y_Mute>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YAudioOut.MUTE_INVALID;
            }
        }
        res = this._mute;
        return res;
    }

    /**
     * Changes the state of the mute function. Remember to call the matching module
     * saveToFlash() method to save the setting permanently.
     *
     * @param newval : either Y_MUTE_FALSE or Y_MUTE_TRUE, according to the state of the mute function
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_mute(newval: Y_Mute): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('mute',rest_val);
    }

    /**
     * Returns the supported volume range. The low value of the
     * range corresponds to the minimal audible value. To
     * completely mute the sound, use set_mute()
     * instead of the set_volume().
     *
     * @return a string corresponding to the supported volume range
     *
     * On failure, throws an exception or returns Y_VOLUMERANGE_INVALID.
     */
    async get_volumeRange(): Promise<string>
    {
        let res: string;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YAudioOut.VOLUMERANGE_INVALID;
            }
        }
        res = this._volumeRange;
        return res;
    }

    /**
     * Returns the detected output current level.
     *
     * @return an integer corresponding to the detected output current level
     *
     * On failure, throws an exception or returns Y_SIGNAL_INVALID.
     */
    async get_signal(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YAudioOut.SIGNAL_INVALID;
            }
        }
        res = this._signal;
        return res;
    }

    /**
     * Returns the number of seconds elapsed without detecting a signal.
     *
     * @return an integer corresponding to the number of seconds elapsed without detecting a signal
     *
     * On failure, throws an exception or returns Y_NOSIGNALFOR_INVALID.
     */
    async get_noSignalFor(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YAudioOut.NOSIGNALFOR_INVALID;
            }
        }
        res = this._noSignalFor;
        return res;
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
     * Use the method YAudioOut.isOnline() to test if $THEFUNCTION$ is
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
     * @return a YAudioOut object allowing you to drive $THEFUNCTION$.
     */
    static FindAudioOut(func: string): YAudioOut
    {
        let obj: YAudioOut;
        obj = <YAudioOut> YFunction._FindFromCache('AudioOut', func);
        if (obj == null) {
            obj = new YAudioOut(YAPI, func);
            YFunction._AddToCache('AudioOut',  func, obj);
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
     * Use the method YAudioOut.isOnline() to test if $THEFUNCTION$ is
     * indeed online at a given time. In case of ambiguity when looking for
     * $AFUNCTION$ by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx : a YAPI context
     * @param func : a string that uniquely characterizes $THEFUNCTION$, for instance
     *         $FULLHARDWAREID$.
     *
     * @return a YAudioOut object allowing you to drive $THEFUNCTION$.
     */
    static FindAudioOutInContext(yctx: YAPIContext, func: string): YAudioOut
    {
        let obj: YAudioOut;
        obj = <YAudioOut> YFunction._FindFromCacheInContext(yctx,  'AudioOut', func);
        if (obj == null) {
            obj = new YAudioOut(yctx, func);
            YFunction._AddToCache('AudioOut',  func, obj);
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
    async registerValueCallback(callback: YAudioOutValueCallback | null): Promise<number>
    {
        let val: string;
        if (callback != null) {
            await YFunction._UpdateValueCallbackList(this, true);
        } else {
            await YFunction._UpdateValueCallbackList(this, false);
        }
        this._valueCallbackAudioOut = callback;
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
        if (this._valueCallbackAudioOut != null) {
            try {
                await this._valueCallbackAudioOut(this, value);
            } catch (e) {
                this._yapi.imm_log('Exception in valueCallback:', e);
            }
        } else {
            super._invokeValueCallback(value);
        }
        return 0;
    }

    /**
     * Returns the next AudioOut
     *
     * @returns {YAudioOut}
     */
    nextAudioOut(): YAudioOut | null
    {
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI.SUCCESS) return null;
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, <string> resolve.result);
        if(next_hwid == null) return null;
        return YAudioOut.FindAudioOutInContext(this._yapi, next_hwid);
    }

    /**
     * Retrieves the first AudioOut in a YAPI context
     *
     * @returns {YAudioOut}
     */
    static FirstAudioOut(): YAudioOut | null
    {
        let next_hwid = YAPI.imm_getFirstHardwareId('AudioOut');
        if(next_hwid == null) return null;
        return YAudioOut.FindAudioOut(next_hwid);
    }

    /**
     * Retrieves the first AudioOut in a given context
     *
     * @param yctx {YAPIContext}
     *
     * @returns {YAudioOut}
     */
    static FirstAudioOutInContext(yctx: YAPIContext): YAudioOut | null
    {
        let next_hwid = yctx.imm_getFirstHardwareId('AudioOut');
        if(next_hwid == null) return null;
        return YAudioOut.FindAudioOutInContext(yctx, next_hwid);
    }

    //--- (end of YAudioOut implementation)
}

