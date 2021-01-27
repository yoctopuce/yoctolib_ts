/*********************************************************************
 *
 *  $Id: yocto_magnetometer.ts 43483 2021-01-21 15:47:50Z mvuilleu $
 *
 *  Implements the high-level API for Magnetometer functions
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
export interface YMagnetometerValueCallback {
    (func: YMagnetometer, value: string): void;
}
export interface YMagnetometerTimedReportCallback {
    (func: YMagnetometer, measure: YMeasure): void;
}
/**
 * YMagnetometer Class: magnetometer control interface, available for instance in the Yocto-3D-V2
 *
 * The YSensor class is the parent class for all Yoctopuce sensor types. It can be
 * used to read the current value and unit of any sensor, read the min/max
 * value, configure autonomous recording frequency and access recorded data.
 * It also provide a function to register a callback invoked each time the
 * observed value changes, or at a predefined interval. Using this class rather
 * than a specific subclass makes it possible to create generic applications
 * that work with any Yoctopuce sensor, even those that do not yet exist.
 * Note: The YAnButton class is the only analog input which does not inherit
 * from YSensor.
 */
export declare class YMagnetometer extends YSensor {
    _className: string;
    _bandwidth: number;
    _xValue: number;
    _yValue: number;
    _zValue: number;
    _valueCallbackMagnetometer: YMagnetometerValueCallback | null;
    _timedReportCallbackMagnetometer: YMagnetometerTimedReportCallback | null;
    readonly BANDWIDTH_INVALID: number;
    readonly XVALUE_INVALID: number;
    readonly YVALUE_INVALID: number;
    readonly ZVALUE_INVALID: number;
    static readonly BANDWIDTH_INVALID: number;
    static readonly XVALUE_INVALID: number;
    static readonly YVALUE_INVALID: number;
    static readonly ZVALUE_INVALID: number;
    constructor(yapi: YAPIContext, func: string);
    imm_parseAttr(name: string, val: any): 0 | 1;
    /**
     * Returns the measure update frequency, measured in Hz.
     *
     * @return an integer corresponding to the measure update frequency, measured in Hz
     *
     * On failure, throws an exception or returns YMagnetometer.BANDWIDTH_INVALID.
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
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_bandwidth(newval: number): Promise<number>;
    /**
     * Returns the X component of the magnetic field, as a floating point number.
     *
     * @return a floating point number corresponding to the X component of the magnetic field, as a
     * floating point number
     *
     * On failure, throws an exception or returns YMagnetometer.XVALUE_INVALID.
     */
    get_xValue(): Promise<number>;
    /**
     * Returns the Y component of the magnetic field, as a floating point number.
     *
     * @return a floating point number corresponding to the Y component of the magnetic field, as a
     * floating point number
     *
     * On failure, throws an exception or returns YMagnetometer.YVALUE_INVALID.
     */
    get_yValue(): Promise<number>;
    /**
     * Returns the Z component of the magnetic field, as a floating point number.
     *
     * @return a floating point number corresponding to the Z component of the magnetic field, as a
     * floating point number
     *
     * On failure, throws an exception or returns YMagnetometer.ZVALUE_INVALID.
     */
    get_zValue(): Promise<number>;
    /**
     * Retrieves a magnetometer for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the magnetometer is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YMagnetometer.isOnline() to test if the magnetometer is
     * indeed online at a given time. In case of ambiguity when looking for
     * a magnetometer by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the magnetometer, for instance
     *         Y3DMK002.magnetometer.
     *
     * @return a YMagnetometer object allowing you to drive the magnetometer.
     */
    static FindMagnetometer(func: string): YMagnetometer;
    /**
     * Retrieves a magnetometer for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the magnetometer is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YMagnetometer.isOnline() to test if the magnetometer is
     * indeed online at a given time. In case of ambiguity when looking for
     * a magnetometer by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx : a YAPI context
     * @param func : a string that uniquely characterizes the magnetometer, for instance
     *         Y3DMK002.magnetometer.
     *
     * @return a YMagnetometer object allowing you to drive the magnetometer.
     */
    static FindMagnetometerInContext(yctx: YAPIContext, func: string): YMagnetometer;
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
    registerValueCallback(callback: YMagnetometerValueCallback | null): Promise<number>;
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
    registerTimedReportCallback(callback: YMagnetometerTimedReportCallback | null): Promise<number>;
    _invokeTimedReportCallback(value: YMeasure): Promise<number>;
    /**
     * Continues the enumeration of magnetometers started using yFirstMagnetometer().
     * Caution: You can't make any assumption about the returned magnetometers order.
     * If you want to find a specific a magnetometer, use Magnetometer.findMagnetometer()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YMagnetometer object, corresponding to
     *         a magnetometer currently online, or a null pointer
     *         if there are no more magnetometers to enumerate.
     */
    nextMagnetometer(): YMagnetometer | null;
    /**
     * Starts the enumeration of magnetometers currently accessible.
     * Use the method YMagnetometer.nextMagnetometer() to iterate on
     * next magnetometers.
     *
     * @return a pointer to a YMagnetometer object, corresponding to
     *         the first magnetometer currently online, or a null pointer
     *         if there are none.
     */
    static FirstMagnetometer(): YMagnetometer | null;
    /**
     * Starts the enumeration of magnetometers currently accessible.
     * Use the method YMagnetometer.nextMagnetometer() to iterate on
     * next magnetometers.
     *
     * @param yctx : a YAPI context.
     *
     * @return a pointer to a YMagnetometer object, corresponding to
     *         the first magnetometer currently online, or a null pointer
     *         if there are none.
     */
    static FirstMagnetometerInContext(yctx: YAPIContext): YMagnetometer | null;
}
