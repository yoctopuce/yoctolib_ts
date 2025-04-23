/*********************************************************************
 *
 *  $Id: svn_id $
 *
 *  Implements the high-level API for GenericSensor functions
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
 * YGenericSensor Class: GenericSensor control interface, available for instance in the
 * Yocto-0-10V-Rx, the Yocto-4-20mA-Rx, the Yocto-Bridge or the Yocto-milliVolt-Rx
 *
 * The YGenericSensor class allows you to read and configure Yoctopuce signal
 * transducers. It inherits from YSensor class the core functions to read measures,
 * to register callback functions, to access the autonomous datalogger.
 * This class adds the ability to configure the automatic conversion between the
 * measured signal and the corresponding engineering unit.
 */
export declare class YGenericSensor extends YSensor {
    _className: string;
    _signalValue: number;
    _signalUnit: string;
    _signalRange: string;
    _valueRange: string;
    _signalBias: number;
    _signalSampling: YGenericSensor.SIGNALSAMPLING;
    _enabled: YGenericSensor.ENABLED;
    _valueCallbackGenericSensor: YGenericSensor.ValueCallback | null;
    _timedReportCallbackGenericSensor: YGenericSensor.TimedReportCallback | null;
    readonly SIGNALVALUE_INVALID: number;
    readonly SIGNALUNIT_INVALID: string;
    readonly SIGNALRANGE_INVALID: string;
    readonly VALUERANGE_INVALID: string;
    readonly SIGNALBIAS_INVALID: number;
    readonly SIGNALSAMPLING_HIGH_RATE: YGenericSensor.SIGNALSAMPLING;
    readonly SIGNALSAMPLING_HIGH_RATE_FILTERED: YGenericSensor.SIGNALSAMPLING;
    readonly SIGNALSAMPLING_LOW_NOISE: YGenericSensor.SIGNALSAMPLING;
    readonly SIGNALSAMPLING_LOW_NOISE_FILTERED: YGenericSensor.SIGNALSAMPLING;
    readonly SIGNALSAMPLING_HIGHEST_RATE: YGenericSensor.SIGNALSAMPLING;
    readonly SIGNALSAMPLING_AC: YGenericSensor.SIGNALSAMPLING;
    readonly SIGNALSAMPLING_INVALID: YGenericSensor.SIGNALSAMPLING;
    readonly ENABLED_FALSE: YGenericSensor.ENABLED;
    readonly ENABLED_TRUE: YGenericSensor.ENABLED;
    readonly ENABLED_INVALID: YGenericSensor.ENABLED;
    static readonly SIGNALVALUE_INVALID: number;
    static readonly SIGNALUNIT_INVALID: string;
    static readonly SIGNALRANGE_INVALID: string;
    static readonly VALUERANGE_INVALID: string;
    static readonly SIGNALBIAS_INVALID: number;
    static readonly SIGNALSAMPLING_HIGH_RATE: YGenericSensor.SIGNALSAMPLING;
    static readonly SIGNALSAMPLING_HIGH_RATE_FILTERED: YGenericSensor.SIGNALSAMPLING;
    static readonly SIGNALSAMPLING_LOW_NOISE: YGenericSensor.SIGNALSAMPLING;
    static readonly SIGNALSAMPLING_LOW_NOISE_FILTERED: YGenericSensor.SIGNALSAMPLING;
    static readonly SIGNALSAMPLING_HIGHEST_RATE: YGenericSensor.SIGNALSAMPLING;
    static readonly SIGNALSAMPLING_AC: YGenericSensor.SIGNALSAMPLING;
    static readonly SIGNALSAMPLING_INVALID: YGenericSensor.SIGNALSAMPLING;
    static readonly ENABLED_FALSE: YGenericSensor.ENABLED;
    static readonly ENABLED_TRUE: YGenericSensor.ENABLED;
    static readonly ENABLED_INVALID: YGenericSensor.ENABLED;
    constructor(yapi: YAPIContext, func: string);
    imm_parseAttr(name: string, val: any): number;
    /**
     * Changes the measuring unit for the measured value.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : a string corresponding to the measuring unit for the measured value
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_unit(newval: string): Promise<number>;
    /**
     * Returns the current value of the electrical signal measured by the sensor.
     *
     * @return a floating point number corresponding to the current value of the electrical signal
     * measured by the sensor
     *
     * On failure, throws an exception or returns YGenericSensor.SIGNALVALUE_INVALID.
     */
    get_signalValue(): Promise<number>;
    /**
     * Returns the measuring unit of the electrical signal used by the sensor.
     *
     * @return a string corresponding to the measuring unit of the electrical signal used by the sensor
     *
     * On failure, throws an exception or returns YGenericSensor.SIGNALUNIT_INVALID.
     */
    get_signalUnit(): Promise<string>;
    /**
     * Returns the input signal range used by the sensor.
     *
     * @return a string corresponding to the input signal range used by the sensor
     *
     * On failure, throws an exception or returns YGenericSensor.SIGNALRANGE_INVALID.
     */
    get_signalRange(): Promise<string>;
    /**
     * Changes the input signal range used by the sensor.
     * When the input signal gets out of the planned range, the output value
     * will be set to an arbitrary large value, whose sign indicates the direction
     * of the range overrun.
     *
     * For a 4-20mA sensor, the default input signal range is "4...20".
     * For a 0-10V sensor, the default input signal range is "0.1...10".
     * For numeric communication interfaces, the default input signal range is
     * "-999999.999...999999.999".
     *
     * Remember to call the saveToFlash()
     * method of the module if the modification must be kept.
     *
     * @param newval : a string corresponding to the input signal range used by the sensor
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_signalRange(newval: string): Promise<number>;
    /**
     * Returns the physical value range measured by the sensor.
     *
     * @return a string corresponding to the physical value range measured by the sensor
     *
     * On failure, throws an exception or returns YGenericSensor.VALUERANGE_INVALID.
     */
    get_valueRange(): Promise<string>;
    /**
     * Changes the output value range, corresponding to the physical value measured
     * by the sensor. The default output value range is the same as the input signal
     * range (1:1 mapping), but you can change it so that the function automatically
     * computes the physical value encoded by the input signal. Be aware that, as a
     * side effect, the range modification may automatically modify the display resolution.
     *
     * Remember to call the saveToFlash()
     * method of the module if the modification must be kept.
     *
     * @param newval : a string corresponding to the output value range, corresponding to the physical value measured
     *         by the sensor
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_valueRange(newval: string): Promise<number>;
    /**
     * Changes the electric signal bias for zero shift adjustment.
     * If your electric signal reads positive when it should be zero, set up
     * a positive signalBias of the same value to fix the zero shift.
     * Remember to call the saveToFlash()
     * method of the module if the modification must be kept.
     *
     * @param newval : a floating point number corresponding to the electric signal bias for zero shift adjustment
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_signalBias(newval: number): Promise<number>;
    /**
     * Returns the electric signal bias for zero shift adjustment.
     * A positive bias means that the signal is over-reporting the measure,
     * while a negative bias means that the signal is under-reporting the measure.
     *
     * @return a floating point number corresponding to the electric signal bias for zero shift adjustment
     *
     * On failure, throws an exception or returns YGenericSensor.SIGNALBIAS_INVALID.
     */
    get_signalBias(): Promise<number>;
    /**
     * Returns the electric signal sampling method to use.
     * The HIGH_RATE method uses the highest sampling frequency, without any filtering.
     * The HIGH_RATE_FILTERED method adds a windowed 7-sample median filter.
     * The LOW_NOISE method uses a reduced acquisition frequency to reduce noise.
     * The LOW_NOISE_FILTERED method combines a reduced frequency with the median filter
     * to get measures as stable as possible when working on a noisy signal.
     *
     * @return a value among YGenericSensor.SIGNALSAMPLING_HIGH_RATE,
     * YGenericSensor.SIGNALSAMPLING_HIGH_RATE_FILTERED, YGenericSensor.SIGNALSAMPLING_LOW_NOISE,
     * YGenericSensor.SIGNALSAMPLING_LOW_NOISE_FILTERED, YGenericSensor.SIGNALSAMPLING_HIGHEST_RATE and
     * YGenericSensor.SIGNALSAMPLING_AC corresponding to the electric signal sampling method to use
     *
     * On failure, throws an exception or returns YGenericSensor.SIGNALSAMPLING_INVALID.
     */
    get_signalSampling(): Promise<YGenericSensor.SIGNALSAMPLING>;
    /**
     * Changes the electric signal sampling method to use.
     * The HIGH_RATE method uses the highest sampling frequency, without any filtering.
     * The HIGH_RATE_FILTERED method adds a windowed 7-sample median filter.
     * The LOW_NOISE method uses a reduced acquisition frequency to reduce noise.
     * The LOW_NOISE_FILTERED method combines a reduced frequency with the median filter
     * to get measures as stable as possible when working on a noisy signal.
     * Remember to call the saveToFlash()
     * method of the module if the modification must be kept.
     *
     * @param newval : a value among YGenericSensor.SIGNALSAMPLING_HIGH_RATE,
     * YGenericSensor.SIGNALSAMPLING_HIGH_RATE_FILTERED, YGenericSensor.SIGNALSAMPLING_LOW_NOISE,
     * YGenericSensor.SIGNALSAMPLING_LOW_NOISE_FILTERED, YGenericSensor.SIGNALSAMPLING_HIGHEST_RATE and
     * YGenericSensor.SIGNALSAMPLING_AC corresponding to the electric signal sampling method to use
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_signalSampling(newval: YGenericSensor.SIGNALSAMPLING): Promise<number>;
    /**
     * Returns the activation state of this input.
     *
     * @return either YGenericSensor.ENABLED_FALSE or YGenericSensor.ENABLED_TRUE, according to the
     * activation state of this input
     *
     * On failure, throws an exception or returns YGenericSensor.ENABLED_INVALID.
     */
    get_enabled(): Promise<YGenericSensor.ENABLED>;
    /**
     * Changes the activation state of this input. When an input is disabled,
     * its value is no more updated. On some devices, disabling an input can
     * improve the refresh rate of the other active inputs.
     * Remember to call the saveToFlash()
     * method of the module if the modification must be kept.
     *
     * @param newval : either YGenericSensor.ENABLED_FALSE or YGenericSensor.ENABLED_TRUE, according to
     * the activation state of this input
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_enabled(newval: YGenericSensor.ENABLED): Promise<number>;
    /**
     * Retrieves a generic sensor for a given identifier.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the generic sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YGenericSensor.isOnline() to test if the generic sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a generic sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the generic sensor, for instance
     *         RX010V01.genericSensor1.
     *
     * @return a YGenericSensor object allowing you to drive the generic sensor.
     */
    static FindGenericSensor(func: string): YGenericSensor;
    /**
     * Retrieves a generic sensor for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the generic sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YGenericSensor.isOnline() to test if the generic sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a generic sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx : a YAPI context
     * @param func : a string that uniquely characterizes the generic sensor, for instance
     *         RX010V01.genericSensor1.
     *
     * @return a YGenericSensor object allowing you to drive the generic sensor.
     */
    static FindGenericSensorInContext(yctx: YAPIContext, func: string): YGenericSensor;
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
    registerValueCallback(callback: YGenericSensor.ValueCallback | null): Promise<number>;
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
    registerTimedReportCallback(callback: YGenericSensor.TimedReportCallback | null): Promise<number>;
    _invokeTimedReportCallback(value: YMeasure): Promise<number>;
    /**
     * Adjusts the signal bias so that the current signal value is need
     * precisely as zero. Remember to call the saveToFlash()
     * method of the module if the modification must be kept.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    zeroAdjust(): Promise<number>;
    /**
     * Continues the enumeration of generic sensors started using yFirstGenericSensor().
     * Caution: You can't make any assumption about the returned generic sensors order.
     * If you want to find a specific a generic sensor, use GenericSensor.findGenericSensor()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YGenericSensor object, corresponding to
     *         a generic sensor currently online, or a null pointer
     *         if there are no more generic sensors to enumerate.
     */
    nextGenericSensor(): YGenericSensor | null;
    /**
     * Starts the enumeration of generic sensors currently accessible.
     * Use the method YGenericSensor.nextGenericSensor() to iterate on
     * next generic sensors.
     *
     * @return a pointer to a YGenericSensor object, corresponding to
     *         the first generic sensor currently online, or a null pointer
     *         if there are none.
     */
    static FirstGenericSensor(): YGenericSensor | null;
    /**
     * Starts the enumeration of generic sensors currently accessible.
     * Use the method YGenericSensor.nextGenericSensor() to iterate on
     * next generic sensors.
     *
     * @param yctx : a YAPI context.
     *
     * @return a pointer to a YGenericSensor object, corresponding to
     *         the first generic sensor currently online, or a null pointer
     *         if there are none.
     */
    static FirstGenericSensorInContext(yctx: YAPIContext): YGenericSensor | null;
}
export declare namespace YGenericSensor {
    const enum SIGNALSAMPLING {
        HIGH_RATE = 0,
        HIGH_RATE_FILTERED = 1,
        LOW_NOISE = 2,
        LOW_NOISE_FILTERED = 3,
        HIGHEST_RATE = 4,
        AC = 5,
        INVALID = -1
    }
    const enum ENABLED {
        FALSE = 0,
        TRUE = 1,
        INVALID = -1
    }
    interface ValueCallback {
        (func: YGenericSensor, value: string): void;
    }
    interface TimedReportCallback {
        (func: YGenericSensor, measure: YMeasure): void;
    }
}
