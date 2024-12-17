/*********************************************************************
 *
 *  $Id: svn_id $
 *
 *  Implements the high-level API for SpectralChannel functions
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

//--- (YSpectralChannel class start)
/**
 * YSpectralChannel Class: spectral analysis channel control interface
 *
 * The YSpectralChannel class allows you to read and configure Yoctopuce spectral analysis channels.
 * It inherits from YSensor class the core functions to read measurements,
 * to register callback functions, and to access the autonomous datalogger.
 */
//--- (end of YSpectralChannel class start)

export class YSpectralChannel extends YSensor
{
    //--- (YSpectralChannel attributes declaration)
    _className: string;
    _rawCount: number = YSpectralChannel.RAWCOUNT_INVALID;
    _valueCallbackSpectralChannel: YSpectralChannel.ValueCallback | null = null;
    _timedReportCallbackSpectralChannel: YSpectralChannel.TimedReportCallback | null = null;

    // API symbols as object properties
    public readonly RAWCOUNT_INVALID: number = YAPI.INVALID_INT;

    // API symbols as static members
    public static readonly RAWCOUNT_INVALID: number = YAPI.INVALID_INT;
    //--- (end of YSpectralChannel attributes declaration)

    constructor(yapi: YAPIContext, func: string)
    {
        //--- (YSpectralChannel constructor)
        super(yapi, func);
        this._className                  = 'SpectralChannel';
        //--- (end of YSpectralChannel constructor)
    }

    //--- (YSpectralChannel implementation)

    imm_parseAttr(name: string, val: any): number
    {
        switch (name) {
        case 'rawCount':
            this._rawCount = <number> <number> val;
            return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Retrieves the raw count of data samples.
     * This method returns the current value of rawCount, representing the total number of samples collected
     * by the sensor.
     *
     * @return an integer
     *
     * On failure, throws an exception or returns YSpectralChannel.RAWCOUNT_INVALID.
     */
    async get_rawCount(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YSpectralChannel.RAWCOUNT_INVALID;
            }
        }
        res = this._rawCount;
        return res;
    }

    /**
     * Retrieves a spectral analysis channel for a given identifier.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the spectral analysis channel is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YSpectralChannel.isOnline() to test if the spectral analysis channel is
     * indeed online at a given time. In case of ambiguity when looking for
     * a spectral analysis channel by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the spectral analysis channel, for instance
     *         MyDevice.spectralChannel1.
     *
     * @return a YSpectralChannel object allowing you to drive the spectral analysis channel.
     */
    static FindSpectralChannel(func: string): YSpectralChannel
    {
        let obj: YSpectralChannel | null;
        obj = <YSpectralChannel> YFunction._FindFromCache('SpectralChannel', func);
        if (obj == null) {
            obj = new YSpectralChannel(YAPI, func);
            YFunction._AddToCache('SpectralChannel', func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a spectral analysis channel for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the spectral analysis channel is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YSpectralChannel.isOnline() to test if the spectral analysis channel is
     * indeed online at a given time. In case of ambiguity when looking for
     * a spectral analysis channel by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx : a YAPI context
     * @param func : a string that uniquely characterizes the spectral analysis channel, for instance
     *         MyDevice.spectralChannel1.
     *
     * @return a YSpectralChannel object allowing you to drive the spectral analysis channel.
     */
    static FindSpectralChannelInContext(yctx: YAPIContext, func: string): YSpectralChannel
    {
        let obj: YSpectralChannel | null;
        obj = <YSpectralChannel> YFunction._FindFromCacheInContext(yctx, 'SpectralChannel', func);
        if (obj == null) {
            obj = new YSpectralChannel(yctx, func);
            YFunction._AddToCache('SpectralChannel', func, obj);
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
    async registerValueCallback(callback: YSpectralChannel.ValueCallback | null): Promise<number>
    {
        let val: string;
        if (callback != null) {
            await YFunction._UpdateValueCallbackList(this, true);
        } else {
            await YFunction._UpdateValueCallbackList(this, false);
        }
        this._valueCallbackSpectralChannel = callback;
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
        if (this._valueCallbackSpectralChannel != null) {
            try {
                await this._valueCallbackSpectralChannel(this, value);
            } catch (e) {
                this._yapi.imm_log('Exception in valueCallback:', e);
            }
        } else {
            await super._invokeValueCallback(value);
        }
        return 0;
    }

    /**
     * Registers the callback function that is invoked on every periodic timed notification.
     * The callback is invoked only during the execution of ySleep or yHandleEvents.
     * This provides control over the time when the callback is triggered. For good responsiveness, remember to call
     * one of these two functions periodically. To unregister a callback, pass a null pointer as argument.
     *
     * @param callback : the callback function to call, or a null pointer. The callback function should take two
     *         arguments: the function object of which the value has changed, and an YMeasure object describing
     *         the new advertised value.
     * @noreturn
     */
    async registerTimedReportCallback(callback: YSpectralChannel.TimedReportCallback | null): Promise<number>
    {
        let sensor: YSensor | null;
        sensor = this;
        if (callback != null) {
            await YFunction._UpdateTimedReportCallbackList(sensor, true);
        } else {
            await YFunction._UpdateTimedReportCallbackList(sensor, false);
        }
        this._timedReportCallbackSpectralChannel = callback;
        return 0;
    }

    async _invokeTimedReportCallback(value: YMeasure): Promise<number>
    {
        if (this._timedReportCallbackSpectralChannel != null) {
            try {
                await this._timedReportCallbackSpectralChannel(this, value);
            } catch (e) {
                this._yapi.imm_log('Exception in timedReportCallback:', e);
            }
        } else {
            await super._invokeTimedReportCallback(value);
        }
        return 0;
    }

    /**
     * Continues the enumeration of spectral analysis channels started using yFirstSpectralChannel().
     * Caution: You can't make any assumption about the returned spectral analysis channels order.
     * If you want to find a specific a spectral analysis channel, use SpectralChannel.findSpectralChannel()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YSpectralChannel object, corresponding to
     *         a spectral analysis channel currently online, or a null pointer
     *         if there are no more spectral analysis channels to enumerate.
     */
    nextSpectralChannel(): YSpectralChannel | null
    {
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != YAPI.SUCCESS) return null;
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, <string> resolve.result);
        if (next_hwid == null) return null;
        return YSpectralChannel.FindSpectralChannelInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of spectral analysis channels currently accessible.
     * Use the method YSpectralChannel.nextSpectralChannel() to iterate on
     * next spectral analysis channels.
     *
     * @return a pointer to a YSpectralChannel object, corresponding to
     *         the first spectral analysis channel currently online, or a null pointer
     *         if there are none.
     */
    static FirstSpectralChannel(): YSpectralChannel | null
    {
        let next_hwid = YAPI.imm_getFirstHardwareId('SpectralChannel');
        if (next_hwid == null) return null;
        return YSpectralChannel.FindSpectralChannel(next_hwid);
    }

    /**
     * Starts the enumeration of spectral analysis channels currently accessible.
     * Use the method YSpectralChannel.nextSpectralChannel() to iterate on
     * next spectral analysis channels.
     *
     * @param yctx : a YAPI context.
     *
     * @return a pointer to a YSpectralChannel object, corresponding to
     *         the first spectral analysis channel currently online, or a null pointer
     *         if there are none.
     */
    static FirstSpectralChannelInContext(yctx: YAPIContext): YSpectralChannel | null
    {
        let next_hwid = yctx.imm_getFirstHardwareId('SpectralChannel');
        if (next_hwid == null) return null;
        return YSpectralChannel.FindSpectralChannelInContext(yctx, next_hwid);
    }

    //--- (end of YSpectralChannel implementation)
}

export namespace YSpectralChannel {
    //--- (YSpectralChannel definitions)
    export interface ValueCallback {(func: YSpectralChannel, value: string): void}

    export interface TimedReportCallback {(func: YSpectralChannel, measure: YMeasure): void}

    //--- (end of YSpectralChannel definitions)
}

