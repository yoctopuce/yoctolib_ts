/*********************************************************************
 *
 *  $Id: svn_id $
 *
 *  Implements the high-level API for RangeFinder functions
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
 * YRangeFinder Class: range finder control interface, available for instance in the Yocto-RangeFinder
 *
 * The YRangeFinder class allows you to read and configure Yoctopuce range finders.
 * It inherits from YSensor class the core functions to read measurements,
 * to register callback functions, and to access the autonomous datalogger.
 * This class adds the ability to easily perform a one-point linear calibration
 * to compensate the effect of a glass or filter placed in front of the sensor.
 */
export declare class YRangeFinder extends YSensor {
    _className: string;
    _rangeFinderMode: YRangeFinder.RANGEFINDERMODE;
    _timeFrame: number;
    _quality: number;
    _hardwareCalibration: string;
    _currentTemperature: number;
    _command: string;
    _valueCallbackRangeFinder: YRangeFinder.ValueCallback | null;
    _timedReportCallbackRangeFinder: YRangeFinder.TimedReportCallback | null;
    readonly RANGEFINDERMODE_DEFAULT: YRangeFinder.RANGEFINDERMODE;
    readonly RANGEFINDERMODE_LONG_RANGE: YRangeFinder.RANGEFINDERMODE;
    readonly RANGEFINDERMODE_HIGH_ACCURACY: YRangeFinder.RANGEFINDERMODE;
    readonly RANGEFINDERMODE_HIGH_SPEED: YRangeFinder.RANGEFINDERMODE;
    readonly RANGEFINDERMODE_INVALID: YRangeFinder.RANGEFINDERMODE;
    readonly TIMEFRAME_INVALID: number;
    readonly QUALITY_INVALID: number;
    readonly HARDWARECALIBRATION_INVALID: string;
    readonly CURRENTTEMPERATURE_INVALID: number;
    readonly COMMAND_INVALID: string;
    static readonly RANGEFINDERMODE_DEFAULT: YRangeFinder.RANGEFINDERMODE;
    static readonly RANGEFINDERMODE_LONG_RANGE: YRangeFinder.RANGEFINDERMODE;
    static readonly RANGEFINDERMODE_HIGH_ACCURACY: YRangeFinder.RANGEFINDERMODE;
    static readonly RANGEFINDERMODE_HIGH_SPEED: YRangeFinder.RANGEFINDERMODE;
    static readonly RANGEFINDERMODE_INVALID: YRangeFinder.RANGEFINDERMODE;
    static readonly TIMEFRAME_INVALID: number;
    static readonly QUALITY_INVALID: number;
    static readonly HARDWARECALIBRATION_INVALID: string;
    static readonly CURRENTTEMPERATURE_INVALID: number;
    static readonly COMMAND_INVALID: string;
    constructor(yapi: YAPIContext, func: string);
    imm_parseAttr(name: string, val: any): number;
    /**
     * Changes the measuring unit for the measured range. That unit is a string.
     * String value can be " or mm. Any other value is ignored.
     * Remember to call the saveToFlash() method of the module if the modification must be kept.
     * WARNING: if a specific calibration is defined for the rangeFinder function, a
     * unit system change will probably break it.
     *
     * @param newval : a string corresponding to the measuring unit for the measured range
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_unit(newval: string): Promise<number>;
    /**
     * Returns the range finder running mode. The rangefinder running mode
     * allows you to put priority on precision, speed or maximum range.
     *
     * @return a value among YRangeFinder.RANGEFINDERMODE_DEFAULT,
     * YRangeFinder.RANGEFINDERMODE_LONG_RANGE, YRangeFinder.RANGEFINDERMODE_HIGH_ACCURACY and
     * YRangeFinder.RANGEFINDERMODE_HIGH_SPEED corresponding to the range finder running mode
     *
     * On failure, throws an exception or returns YRangeFinder.RANGEFINDERMODE_INVALID.
     */
    get_rangeFinderMode(): Promise<YRangeFinder.RANGEFINDERMODE>;
    /**
     * Changes the rangefinder running mode, allowing you to put priority on
     * precision, speed or maximum range.
     * Remember to call the saveToFlash() method of the module if the modification must be kept.
     *
     * @param newval : a value among YRangeFinder.RANGEFINDERMODE_DEFAULT,
     * YRangeFinder.RANGEFINDERMODE_LONG_RANGE, YRangeFinder.RANGEFINDERMODE_HIGH_ACCURACY and
     * YRangeFinder.RANGEFINDERMODE_HIGH_SPEED corresponding to the rangefinder running mode, allowing you
     * to put priority on
     *         precision, speed or maximum range
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_rangeFinderMode(newval: YRangeFinder.RANGEFINDERMODE): Promise<number>;
    /**
     * Returns the time frame used to measure the distance and estimate the measure
     * reliability. The time frame is expressed in milliseconds.
     *
     * @return an integer corresponding to the time frame used to measure the distance and estimate the measure
     *         reliability
     *
     * On failure, throws an exception or returns YRangeFinder.TIMEFRAME_INVALID.
     */
    get_timeFrame(): Promise<number>;
    /**
     * Changes the time frame used to measure the distance and estimate the measure
     * reliability. The time frame is expressed in milliseconds. A larger timeframe
     * improves stability and reliability, at the cost of higher latency, but prevents
     * the detection of events shorter than the time frame.
     * Remember to call the saveToFlash() method of the module if the modification must be kept.
     *
     * @param newval : an integer corresponding to the time frame used to measure the distance and estimate the measure
     *         reliability
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_timeFrame(newval: number): Promise<number>;
    /**
     * Returns a measure quality estimate, based on measured dispersion.
     *
     * @return an integer corresponding to a measure quality estimate, based on measured dispersion
     *
     * On failure, throws an exception or returns YRangeFinder.QUALITY_INVALID.
     */
    get_quality(): Promise<number>;
    get_hardwareCalibration(): Promise<string>;
    set_hardwareCalibration(newval: string): Promise<number>;
    /**
     * Returns the current sensor temperature, as a floating point number.
     *
     * @return a floating point number corresponding to the current sensor temperature, as a floating point number
     *
     * On failure, throws an exception or returns YRangeFinder.CURRENTTEMPERATURE_INVALID.
     */
    get_currentTemperature(): Promise<number>;
    get_command(): Promise<string>;
    set_command(newval: string): Promise<number>;
    /**
     * Retrieves a range finder for a given identifier.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the range finder is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YRangeFinder.isOnline() to test if the range finder is
     * indeed online at a given time. In case of ambiguity when looking for
     * a range finder by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the range finder, for instance
     *         YRNGFND1.rangeFinder1.
     *
     * @return a YRangeFinder object allowing you to drive the range finder.
     */
    static FindRangeFinder(func: string): YRangeFinder;
    /**
     * Retrieves a range finder for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the range finder is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YRangeFinder.isOnline() to test if the range finder is
     * indeed online at a given time. In case of ambiguity when looking for
     * a range finder by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx : a YAPI context
     * @param func : a string that uniquely characterizes the range finder, for instance
     *         YRNGFND1.rangeFinder1.
     *
     * @return a YRangeFinder object allowing you to drive the range finder.
     */
    static FindRangeFinderInContext(yctx: YAPIContext, func: string): YRangeFinder;
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
    registerValueCallback(callback: YRangeFinder.ValueCallback | null): Promise<number>;
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
    registerTimedReportCallback(callback: YRangeFinder.TimedReportCallback | null): Promise<number>;
    _invokeTimedReportCallback(value: YMeasure): Promise<number>;
    /**
     * Returns the temperature at the time when the latest calibration was performed.
     * This function can be used to determine if a new calibration for ambient temperature
     * is required.
     *
     * @return a temperature, as a floating point number.
     *         On failure, throws an exception or return YAPI.INVALID_DOUBLE.
     */
    get_hardwareCalibrationTemperature(): Promise<number>;
    /**
     * Triggers a sensor calibration according to the current ambient temperature. That
     * calibration process needs no physical interaction with the sensor. It is performed
     * automatically at device startup, but it is recommended to start it again when the
     * temperature delta since the latest calibration exceeds 8 degrees Celsius.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    triggerTemperatureCalibration(): Promise<number>;
    /**
     * Triggers the photon detector hardware calibration.
     * This function is part of the calibration procedure to compensate for the effect
     * of a cover glass. Make sure to read the chapter about hardware calibration for details
     * on the calibration procedure for proper results.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    triggerSpadCalibration(): Promise<number>;
    /**
     * Triggers the hardware offset calibration of the distance sensor.
     * This function is part of the calibration procedure to compensate for the the effect
     * of a cover glass. Make sure to read the chapter about hardware calibration for details
     * on the calibration procedure for proper results.
     *
     * @param targetDist : true distance of the calibration target, in mm or inches, depending
     *         on the unit selected in the device
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    triggerOffsetCalibration(targetDist: number): Promise<number>;
    /**
     * Triggers the hardware cross-talk calibration of the distance sensor.
     * This function is part of the calibration procedure to compensate for the effect
     * of a cover glass. Make sure to read the chapter about hardware calibration for details
     * on the calibration procedure for proper results.
     *
     * @param targetDist : true distance of the calibration target, in mm or inches, depending
     *         on the unit selected in the device
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    triggerXTalkCalibration(targetDist: number): Promise<number>;
    /**
     * Cancels the effect of previous hardware calibration procedures to compensate
     * for cover glass, and restores factory settings.
     * Remember to call the saveToFlash() method of the module if the modification must be kept.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    cancelCoverGlassCalibrations(): Promise<number>;
    /**
     * Continues the enumeration of range finders started using yFirstRangeFinder().
     * Caution: You can't make any assumption about the returned range finders order.
     * If you want to find a specific a range finder, use RangeFinder.findRangeFinder()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YRangeFinder object, corresponding to
     *         a range finder currently online, or a null pointer
     *         if there are no more range finders to enumerate.
     */
    nextRangeFinder(): YRangeFinder | null;
    /**
     * Starts the enumeration of range finders currently accessible.
     * Use the method YRangeFinder.nextRangeFinder() to iterate on
     * next range finders.
     *
     * @return a pointer to a YRangeFinder object, corresponding to
     *         the first range finder currently online, or a null pointer
     *         if there are none.
     */
    static FirstRangeFinder(): YRangeFinder | null;
    /**
     * Starts the enumeration of range finders currently accessible.
     * Use the method YRangeFinder.nextRangeFinder() to iterate on
     * next range finders.
     *
     * @param yctx : a YAPI context.
     *
     * @return a pointer to a YRangeFinder object, corresponding to
     *         the first range finder currently online, or a null pointer
     *         if there are none.
     */
    static FirstRangeFinderInContext(yctx: YAPIContext): YRangeFinder | null;
}
export declare namespace YRangeFinder {
    const enum RANGEFINDERMODE {
        DEFAULT = 0,
        LONG_RANGE = 1,
        HIGH_ACCURACY = 2,
        HIGH_SPEED = 3,
        INVALID = -1
    }
    interface ValueCallback {
        (func: YRangeFinder, value: string): void;
    }
    interface TimedReportCallback {
        (func: YRangeFinder, measure: YMeasure): void;
    }
}
