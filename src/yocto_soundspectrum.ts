/*********************************************************************
 *
 *  $Id: svn_id $
 *
 *  Implements the high-level API for SoundSpectrum functions
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

//--- (YSoundSpectrum class start)
/**
 * YSoundSpectrum Class: sound spectrum analyzer control interface
 *
 * The YSoundSpectrum class allows you to read and configure Yoctopuce sound spectrum analyzers.
 * It inherits from YSensor class the core functions to read measurements,
 * to register callback functions, and to access the autonomous datalogger.
 */
//--- (end of YSoundSpectrum class start)

export class YSoundSpectrum extends YFunction
{
    //--- (YSoundSpectrum attributes declaration)
    _className: string;
    _integrationTime: number = YSoundSpectrum.INTEGRATIONTIME_INVALID;
    _spectrumData: string = YSoundSpectrum.SPECTRUMDATA_INVALID;
    _valueCallbackSoundSpectrum: YSoundSpectrum.ValueCallback | null = null;

    // API symbols as object properties
    public readonly INTEGRATIONTIME_INVALID: number = YAPI.INVALID_UINT;
    public readonly SPECTRUMDATA_INVALID: string = YAPI.INVALID_STRING;

    // API symbols as static members
    public static readonly INTEGRATIONTIME_INVALID: number = YAPI.INVALID_UINT;
    public static readonly SPECTRUMDATA_INVALID: string = YAPI.INVALID_STRING;
    //--- (end of YSoundSpectrum attributes declaration)

    constructor(yapi: YAPIContext, func: string)
    {
        //--- (YSoundSpectrum constructor)
        super(yapi, func);
        this._className                  = 'SoundSpectrum';
        //--- (end of YSoundSpectrum constructor)
    }

    //--- (YSoundSpectrum implementation)

    imm_parseAttr(name: string, val: any): number
    {
        switch (name) {
        case 'integrationTime':
            this._integrationTime = <number> <number> val;
            return 1;
        case 'spectrumData':
            this._spectrumData = <string> <string> val;
            return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Returns the integration time in milliseconds for calculating time
     * weighted spectrum data.
     *
     * @return an integer corresponding to the integration time in milliseconds for calculating time
     *         weighted spectrum data
     *
     * On failure, throws an exception or returns YSoundSpectrum.INTEGRATIONTIME_INVALID.
     */
    async get_integrationTime(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YSoundSpectrum.INTEGRATIONTIME_INVALID;
            }
        }
        res = this._integrationTime;
        return res;
    }

    /**
     * Changes the integration time in milliseconds for computing time weighted
     * spectrum data. Be aware that on some devices, changing the integration
     * time for time-weighted spectrum data may also affect the integration
     * period for one or more sound pressure level measurements.
     * Remember to call the saveToFlash() method of the
     * module if the modification must be kept.
     *
     * @param newval : an integer corresponding to the integration time in milliseconds for computing time weighted
     *         spectrum data
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_integrationTime(newval: number): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('integrationTime', rest_val);
    }

    async get_spectrumData(): Promise<string>
    {
        let res: string;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YSoundSpectrum.SPECTRUMDATA_INVALID;
            }
        }
        res = this._spectrumData;
        return res;
    }

    /**
     * Retrieves a sound spectrum analyzer for a given identifier.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the sound spectrum analyzer is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YSoundSpectrum.isOnline() to test if the sound spectrum analyzer is
     * indeed online at a given time. In case of ambiguity when looking for
     * a sound spectrum analyzer by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the sound spectrum analyzer, for instance
     *         MyDevice.soundSpectrum.
     *
     * @return a YSoundSpectrum object allowing you to drive the sound spectrum analyzer.
     */
    static FindSoundSpectrum(func: string): YSoundSpectrum
    {
        let obj: YSoundSpectrum | null;
        obj = <YSoundSpectrum> YFunction._FindFromCache('SoundSpectrum', func);
        if (obj == null) {
            obj = new YSoundSpectrum(YAPI, func);
            YFunction._AddToCache('SoundSpectrum', func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a sound spectrum analyzer for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the sound spectrum analyzer is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YSoundSpectrum.isOnline() to test if the sound spectrum analyzer is
     * indeed online at a given time. In case of ambiguity when looking for
     * a sound spectrum analyzer by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx : a YAPI context
     * @param func : a string that uniquely characterizes the sound spectrum analyzer, for instance
     *         MyDevice.soundSpectrum.
     *
     * @return a YSoundSpectrum object allowing you to drive the sound spectrum analyzer.
     */
    static FindSoundSpectrumInContext(yctx: YAPIContext, func: string): YSoundSpectrum
    {
        let obj: YSoundSpectrum | null;
        obj = <YSoundSpectrum> YFunction._FindFromCacheInContext(yctx, 'SoundSpectrum', func);
        if (obj == null) {
            obj = new YSoundSpectrum(yctx, func);
            YFunction._AddToCache('SoundSpectrum', func, obj);
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
    async registerValueCallback(callback: YSoundSpectrum.ValueCallback | null): Promise<number>
    {
        let val: string;
        if (callback != null) {
            await YFunction._UpdateValueCallbackList(this, true);
        } else {
            await YFunction._UpdateValueCallbackList(this, false);
        }
        this._valueCallbackSoundSpectrum = callback;
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
        if (this._valueCallbackSoundSpectrum != null) {
            try {
                await this._valueCallbackSoundSpectrum(this, value);
            } catch (e) {
                this._yapi.imm_log('Exception in valueCallback:', e);
            }
        } else {
            await super._invokeValueCallback(value);
        }
        return 0;
    }

    /**
     * Returns the next SoundSpectrum
     *
     * @returns {YSoundSpectrum}
     */
    nextSoundSpectrum(): YSoundSpectrum | null
    {
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != YAPI.SUCCESS) return null;
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, <string> resolve.result);
        if (next_hwid == null) return null;
        return YSoundSpectrum.FindSoundSpectrumInContext(this._yapi, next_hwid);
    }

    /**
     * Retrieves the first SoundSpectrum in a YAPI context
     *
     * @returns {YSoundSpectrum}
     */
    static FirstSoundSpectrum(): YSoundSpectrum | null
    {
        let next_hwid = YAPI.imm_getFirstHardwareId('SoundSpectrum');
        if (next_hwid == null) return null;
        return YSoundSpectrum.FindSoundSpectrum(next_hwid);
    }

    /**
     * Retrieves the first SoundSpectrum in a given context
     *
     * @param yctx {YAPIContext}
     *
     * @returns {YSoundSpectrum}
     */
    static FirstSoundSpectrumInContext(yctx: YAPIContext): YSoundSpectrum | null
    {
        let next_hwid = yctx.imm_getFirstHardwareId('SoundSpectrum');
        if (next_hwid == null) return null;
        return YSoundSpectrum.FindSoundSpectrumInContext(yctx, next_hwid);
    }

    //--- (end of YSoundSpectrum implementation)
}

export namespace YSoundSpectrum {
    //--- (YSoundSpectrum definitions)
    export interface ValueCallback {(func: YSoundSpectrum, value: string): void}

    //--- (end of YSoundSpectrum definitions)
}

