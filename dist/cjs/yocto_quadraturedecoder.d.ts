/*********************************************************************
 *
 *  $Id: yocto_quadraturedecoder.ts 63327 2024-11-13 09:35:03Z seb $
 *
 *  Implements the high-level API for QuadratureDecoder functions
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
 * YQuadratureDecoder Class: quadrature decoder control interface, available for instance in the
 * Yocto-MaxiKnob or the Yocto-PWM-Rx
 *
 * The YQuadratureDecoder class allows you to read and configure Yoctopuce quadrature decoders.
 * It inherits from YSensor class the core functions to read measurements,
 * to register callback functions, and to access the autonomous datalogger.
 */
export declare class YQuadratureDecoder extends YSensor {
    _className: string;
    _speed: number;
    _decoding: YQuadratureDecoder.DECODING;
    _edgesPerCycle: number;
    _valueCallbackQuadratureDecoder: YQuadratureDecoder.ValueCallback | null;
    _timedReportCallbackQuadratureDecoder: YQuadratureDecoder.TimedReportCallback | null;
    readonly SPEED_INVALID: number;
    readonly DECODING_OFF: YQuadratureDecoder.DECODING;
    readonly DECODING_ON: YQuadratureDecoder.DECODING;
    readonly DECODING_INVALID: YQuadratureDecoder.DECODING;
    readonly EDGESPERCYCLE_INVALID: number;
    static readonly SPEED_INVALID: number;
    static readonly DECODING_OFF: YQuadratureDecoder.DECODING;
    static readonly DECODING_ON: YQuadratureDecoder.DECODING;
    static readonly DECODING_INVALID: YQuadratureDecoder.DECODING;
    static readonly EDGESPERCYCLE_INVALID: number;
    constructor(yapi: YAPIContext, func: string);
    imm_parseAttr(name: string, val: any): number;
    /**
     * Changes the current expected position of the quadrature decoder.
     * Invoking this function implicitly activates the quadrature decoder.
     *
     * @param newval : a floating point number corresponding to the current expected position of the quadrature decoder
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_currentValue(newval: number): Promise<number>;
    /**
     * Returns the cycle frequency, in Hz.
     *
     * @return a floating point number corresponding to the cycle frequency, in Hz
     *
     * On failure, throws an exception or returns YQuadratureDecoder.SPEED_INVALID.
     */
    get_speed(): Promise<number>;
    /**
     * Returns the current activation state of the quadrature decoder.
     *
     * @return either YQuadratureDecoder.DECODING_OFF or YQuadratureDecoder.DECODING_ON, according to the
     * current activation state of the quadrature decoder
     *
     * On failure, throws an exception or returns YQuadratureDecoder.DECODING_INVALID.
     */
    get_decoding(): Promise<YQuadratureDecoder.DECODING>;
    /**
     * Changes the activation state of the quadrature decoder.
     * Remember to call the saveToFlash()
     * method of the module if the modification must be kept.
     *
     * @param newval : either YQuadratureDecoder.DECODING_OFF or YQuadratureDecoder.DECODING_ON, according
     * to the activation state of the quadrature decoder
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_decoding(newval: YQuadratureDecoder.DECODING): Promise<number>;
    /**
     * Returns the edge count per full cycle configuration setting.
     *
     * @return an integer corresponding to the edge count per full cycle configuration setting
     *
     * On failure, throws an exception or returns YQuadratureDecoder.EDGESPERCYCLE_INVALID.
     */
    get_edgesPerCycle(): Promise<number>;
    /**
     * Changes the edge count per full cycle configuration setting.
     * Remember to call the saveToFlash()
     * method of the module if the modification must be kept.
     *
     * @param newval : an integer corresponding to the edge count per full cycle configuration setting
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_edgesPerCycle(newval: number): Promise<number>;
    /**
     * Retrieves a quadrature decoder for a given identifier.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the quadrature decoder is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YQuadratureDecoder.isOnline() to test if the quadrature decoder is
     * indeed online at a given time. In case of ambiguity when looking for
     * a quadrature decoder by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the quadrature decoder, for instance
     *         YMXBTN01.quadratureDecoder1.
     *
     * @return a YQuadratureDecoder object allowing you to drive the quadrature decoder.
     */
    static FindQuadratureDecoder(func: string): YQuadratureDecoder;
    /**
     * Retrieves a quadrature decoder for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the quadrature decoder is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YQuadratureDecoder.isOnline() to test if the quadrature decoder is
     * indeed online at a given time. In case of ambiguity when looking for
     * a quadrature decoder by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx : a YAPI context
     * @param func : a string that uniquely characterizes the quadrature decoder, for instance
     *         YMXBTN01.quadratureDecoder1.
     *
     * @return a YQuadratureDecoder object allowing you to drive the quadrature decoder.
     */
    static FindQuadratureDecoderInContext(yctx: YAPIContext, func: string): YQuadratureDecoder;
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
    registerValueCallback(callback: YQuadratureDecoder.ValueCallback | null): Promise<number>;
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
    registerTimedReportCallback(callback: YQuadratureDecoder.TimedReportCallback | null): Promise<number>;
    _invokeTimedReportCallback(value: YMeasure): Promise<number>;
    /**
     * Continues the enumeration of quadrature decoders started using yFirstQuadratureDecoder().
     * Caution: You can't make any assumption about the returned quadrature decoders order.
     * If you want to find a specific a quadrature decoder, use QuadratureDecoder.findQuadratureDecoder()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YQuadratureDecoder object, corresponding to
     *         a quadrature decoder currently online, or a null pointer
     *         if there are no more quadrature decoders to enumerate.
     */
    nextQuadratureDecoder(): YQuadratureDecoder | null;
    /**
     * Starts the enumeration of quadrature decoders currently accessible.
     * Use the method YQuadratureDecoder.nextQuadratureDecoder() to iterate on
     * next quadrature decoders.
     *
     * @return a pointer to a YQuadratureDecoder object, corresponding to
     *         the first quadrature decoder currently online, or a null pointer
     *         if there are none.
     */
    static FirstQuadratureDecoder(): YQuadratureDecoder | null;
    /**
     * Starts the enumeration of quadrature decoders currently accessible.
     * Use the method YQuadratureDecoder.nextQuadratureDecoder() to iterate on
     * next quadrature decoders.
     *
     * @param yctx : a YAPI context.
     *
     * @return a pointer to a YQuadratureDecoder object, corresponding to
     *         the first quadrature decoder currently online, or a null pointer
     *         if there are none.
     */
    static FirstQuadratureDecoderInContext(yctx: YAPIContext): YQuadratureDecoder | null;
}
export declare namespace YQuadratureDecoder {
    const enum DECODING {
        OFF = 0,
        ON = 1,
        INVALID = -1
    }
    interface ValueCallback {
        (func: YQuadratureDecoder, value: string): void;
    }
    interface TimedReportCallback {
        (func: YQuadratureDecoder, measure: YMeasure): void;
    }
}
