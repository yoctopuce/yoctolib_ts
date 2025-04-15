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
import { YAPIContext, YSensor, YMeasure } from './yocto_api.js';
/**
 * YSpectralChannel Class: spectral analysis channel control interface
 *
 * The YSpectralChannel class allows you to read and configure Yoctopuce spectral analysis channels.
 * It inherits from YSensor class the core functions to read measurements,
 * to register callback functions, and to access the autonomous datalogger.
 */
export declare class YSpectralChannel extends YSensor {
    _className: string;
    _rawCount: number;
    _valueCallbackSpectralChannel: YSpectralChannel.ValueCallback | null;
    _timedReportCallbackSpectralChannel: YSpectralChannel.TimedReportCallback | null;
    readonly RAWCOUNT_INVALID: number;
    static readonly RAWCOUNT_INVALID: number;
    constructor(yapi: YAPIContext, func: string);
    imm_parseAttr(name: string, val: any): number;
    /**
     * Retrieves the raw cspectral intensity value as measured by the sensor, without any scaling or calibration.
     *
     * @return an integer
     *
     * On failure, throws an exception or returns YSpectralChannel.RAWCOUNT_INVALID.
     */
    get_rawCount(): Promise<number>;
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
    static FindSpectralChannel(func: string): YSpectralChannel;
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
    static FindSpectralChannelInContext(yctx: YAPIContext, func: string): YSpectralChannel;
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
    registerValueCallback(callback: YSpectralChannel.ValueCallback | null): Promise<number>;
    _invokeValueCallback(value: string): Promise<number>;
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
    registerTimedReportCallback(callback: YSpectralChannel.TimedReportCallback | null): Promise<number>;
    _invokeTimedReportCallback(value: YMeasure): Promise<number>;
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
    nextSpectralChannel(): YSpectralChannel | null;
    /**
     * Starts the enumeration of spectral analysis channels currently accessible.
     * Use the method YSpectralChannel.nextSpectralChannel() to iterate on
     * next spectral analysis channels.
     *
     * @return a pointer to a YSpectralChannel object, corresponding to
     *         the first spectral analysis channel currently online, or a null pointer
     *         if there are none.
     */
    static FirstSpectralChannel(): YSpectralChannel | null;
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
    static FirstSpectralChannelInContext(yctx: YAPIContext): YSpectralChannel | null;
}
export declare namespace YSpectralChannel {
    interface ValueCallback {
        (func: YSpectralChannel, value: string): void;
    }
    interface TimedReportCallback {
        (func: YSpectralChannel, measure: YMeasure): void;
    }
}
