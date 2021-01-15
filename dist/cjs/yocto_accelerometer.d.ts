/*********************************************************************
 *
 *  $Id: svn_id $
 *
 *  Implements the high-level API for Accelerometer functions
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
export declare const enum Y_GravityCancellation {
    OFF = 0,
    ON = 1,
    INVALID = -1
}
export interface YAccelerometerValueCallback {
    (func: YAccelerometer, value: string): void;
}
export interface YAccelerometerTimedReportCallback {
    (func: YAccelerometer, measure: YMeasure): void;
}
/**
 * YAccelerometer Class: accelerometer control interface, available for instance in the Yocto-3D-V2
 *
 * The YAccelerometer class allows you to read and configure Yoctopuce accelerometers.
 * It inherits from YSensor class the core functions to read measurements,
 * to register callback functions, and to access the autonomous datalogger.
 * This class adds the possibility to access x, y and z components of the acceleration
 * vector separately.
 */
export declare class YAccelerometer extends YSensor {
    _className: string;
    _bandwidth: number;
    _xValue: number;
    _yValue: number;
    _zValue: number;
    _gravityCancellation: Y_GravityCancellation;
    _valueCallbackAccelerometer: YAccelerometerValueCallback | null;
    _timedReportCallbackAccelerometer: YAccelerometerTimedReportCallback | null;
    readonly BANDWIDTH_INVALID: number;
    readonly XVALUE_INVALID: number;
    readonly YVALUE_INVALID: number;
    readonly ZVALUE_INVALID: number;
    readonly GRAVITYCANCELLATION_OFF: Y_GravityCancellation;
    readonly GRAVITYCANCELLATION_ON: Y_GravityCancellation;
    readonly GRAVITYCANCELLATION_INVALID: Y_GravityCancellation;
    static readonly BANDWIDTH_INVALID: number;
    static readonly XVALUE_INVALID: number;
    static readonly YVALUE_INVALID: number;
    static readonly ZVALUE_INVALID: number;
    static readonly GRAVITYCANCELLATION_OFF: Y_GravityCancellation;
    static readonly GRAVITYCANCELLATION_ON: Y_GravityCancellation;
    static readonly GRAVITYCANCELLATION_INVALID: Y_GravityCancellation;
    constructor(yapi: YAPIContext, func: string);
    imm_parseAttr(name: string, val: any): 0 | 1;
    /**
     * Returns the measure update frequency, measured in Hz.
     *
     * @return an integer corresponding to the measure update frequency, measured in Hz
     *
     * On failure, throws an exception or returns Y_BANDWIDTH_INVALID.
     */
    get_bandwidth(): Promise<number>;
    /**
     * Changes the measure update frequency, measured in Hz. When the
     * frequency is lower, the device performs averaging.
     * Remember to call the saveToFlash()
     * method of the module if the modification must be kept.
     *
     * @param newval : an integer corresponding to the measure update frequency, measured in Hz
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_bandwidth(newval: number): Promise<number>;
    /**
     * Returns the X component of the acceleration, as a floating point number.
     *
     * @return a floating point number corresponding to the X component of the acceleration, as a floating point number
     *
     * On failure, throws an exception or returns Y_XVALUE_INVALID.
     */
    get_xValue(): Promise<number>;
    /**
     * Returns the Y component of the acceleration, as a floating point number.
     *
     * @return a floating point number corresponding to the Y component of the acceleration, as a floating point number
     *
     * On failure, throws an exception or returns Y_YVALUE_INVALID.
     */
    get_yValue(): Promise<number>;
    /**
     * Returns the Z component of the acceleration, as a floating point number.
     *
     * @return a floating point number corresponding to the Z component of the acceleration, as a floating point number
     *
     * On failure, throws an exception or returns Y_ZVALUE_INVALID.
     */
    get_zValue(): Promise<number>;
    get_gravityCancellation(): Promise<Y_GravityCancellation>;
    set_gravityCancellation(newval: Y_GravityCancellation): Promise<number>;
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
     * Use the method YAccelerometer.isOnline() to test if $THEFUNCTION$ is
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
     * @return a YAccelerometer object allowing you to drive $THEFUNCTION$.
     */
    static FindAccelerometer(func: string): YAccelerometer;
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
     * Use the method YAccelerometer.isOnline() to test if $THEFUNCTION$ is
     * indeed online at a given time. In case of ambiguity when looking for
     * $AFUNCTION$ by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx : a YAPI context
     * @param func : a string that uniquely characterizes $THEFUNCTION$, for instance
     *         $FULLHARDWAREID$.
     *
     * @return a YAccelerometer object allowing you to drive $THEFUNCTION$.
     */
    static FindAccelerometerInContext(yctx: YAPIContext, func: string): YAccelerometer;
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
    registerValueCallback(callback: YAccelerometerValueCallback | null): Promise<number>;
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
    registerTimedReportCallback(callback: YAccelerometerTimedReportCallback | null): Promise<number>;
    _invokeTimedReportCallback(value: YMeasure): Promise<number>;
    /**
     * Returns the next Accelerometer
     *
     * @returns {YAccelerometer}
     */
    nextAccelerometer(): YAccelerometer | null;
    /**
     * Retrieves the first Accelerometer in a YAPI context
     *
     * @returns {YAccelerometer}
     */
    static FirstAccelerometer(): YAccelerometer | null;
    /**
     * Retrieves the first Accelerometer in a given context
     *
     * @param yctx {YAPIContext}
     *
     * @returns {YAccelerometer}
     */
    static FirstAccelerometerInContext(yctx: YAPIContext): YAccelerometer | null;
}
