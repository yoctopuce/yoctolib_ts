/*********************************************************************
 *
 *  $Id: yocto_carbondioxide.ts 43483 2021-01-21 15:47:50Z mvuilleu $
 *
 *  Implements the high-level API for CarbonDioxide functions
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
export interface YCarbonDioxideValueCallback {
    (func: YCarbonDioxide, value: string): void;
}
export interface YCarbonDioxideTimedReportCallback {
    (func: YCarbonDioxide, measure: YMeasure): void;
}
/**
 * YCarbonDioxide Class: CO2 sensor control interface, available for instance in the Yocto-CO2-V2
 *
 * The YCarbonDioxide class allows you to read and configure Yoctopuce CO2 sensors.
 * It inherits from YSensor class the core functions to read measurements,
 * to register callback functions, and to access the autonomous datalogger.
 * This class adds the ability to perform manual calibration if required.
 */
export declare class YCarbonDioxide extends YSensor {
    _className: string;
    _abcPeriod: number;
    _command: string;
    _valueCallbackCarbonDioxide: YCarbonDioxideValueCallback | null;
    _timedReportCallbackCarbonDioxide: YCarbonDioxideTimedReportCallback | null;
    readonly ABCPERIOD_INVALID: number;
    readonly COMMAND_INVALID: string;
    static readonly ABCPERIOD_INVALID: number;
    static readonly COMMAND_INVALID: string;
    constructor(yapi: YAPIContext, func: string);
    imm_parseAttr(name: string, val: any): 0 | 1;
    /**
     * Returns the Automatic Baseline Calibration period, in hours. A negative value
     * means that automatic baseline calibration is disabled.
     *
     * @return an integer corresponding to the Automatic Baseline Calibration period, in hours
     *
     * On failure, throws an exception or returns YCarbonDioxide.ABCPERIOD_INVALID.
     */
    get_abcPeriod(): Promise<number>;
    /**
     * Changes Automatic Baseline Calibration period, in hours. If you need
     * to disable automatic baseline calibration (for instance when using the
     * sensor in an environment that is constantly above 400 ppm CO2), set the
     * period to -1. Remember to call the saveToFlash() method of the
     * module if the modification must be kept.
     *
     * @param newval : an integer corresponding to Automatic Baseline Calibration period, in hours
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_abcPeriod(newval: number): Promise<number>;
    get_command(): Promise<string>;
    set_command(newval: string): Promise<number>;
    /**
     * Retrieves a CO2 sensor for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the CO2 sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YCarbonDioxide.isOnline() to test if the CO2 sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a CO2 sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the CO2 sensor, for instance
     *         YCO2MK02.carbonDioxide.
     *
     * @return a YCarbonDioxide object allowing you to drive the CO2 sensor.
     */
    static FindCarbonDioxide(func: string): YCarbonDioxide;
    /**
     * Retrieves a CO2 sensor for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the CO2 sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YCarbonDioxide.isOnline() to test if the CO2 sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a CO2 sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx : a YAPI context
     * @param func : a string that uniquely characterizes the CO2 sensor, for instance
     *         YCO2MK02.carbonDioxide.
     *
     * @return a YCarbonDioxide object allowing you to drive the CO2 sensor.
     */
    static FindCarbonDioxideInContext(yctx: YAPIContext, func: string): YCarbonDioxide;
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
    registerValueCallback(callback: YCarbonDioxideValueCallback | null): Promise<number>;
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
    registerTimedReportCallback(callback: YCarbonDioxideTimedReportCallback | null): Promise<number>;
    _invokeTimedReportCallback(value: YMeasure): Promise<number>;
    /**
     * Triggers a baseline calibration at standard CO2 ambiant level (400ppm).
     * It is normally not necessary to manually calibrate the sensor, because
     * the built-in automatic baseline calibration procedure will automatically
     * fix any long-term drift based on the lowest level of CO2 observed over the
     * automatic calibration period. However, if you disable automatic baseline
     * calibration, you may want to manually trigger a calibration from time to
     * time. Before starting a baseline calibration, make sure to put the sensor
     * in a standard environment (e.g. outside in fresh air) at around 400 ppm.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    triggerBaselineCalibration(): Promise<number>;
    triggetBaselineCalibration(): Promise<number>;
    /**
     * Triggers a zero calibration of the sensor on carbon dioxide-free air.
     * It is normally not necessary to manually calibrate the sensor, because
     * the built-in automatic baseline calibration procedure will automatically
     * fix any long-term drift based on the lowest level of CO2 observed over the
     * automatic calibration period. However, if you disable automatic baseline
     * calibration, you may want to manually trigger a calibration from time to
     * time. Before starting a zero calibration, you should circulate carbon
     * dioxide-free air within the sensor for a minute or two, using a small pipe
     * connected to the sensor. Please contact support@yoctopuce.com for more details
     * on the zero calibration procedure.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    triggerZeroCalibration(): Promise<number>;
    triggetZeroCalibration(): Promise<number>;
    /**
     * Continues the enumeration of CO2 sensors started using yFirstCarbonDioxide().
     * Caution: You can't make any assumption about the returned CO2 sensors order.
     * If you want to find a specific a CO2 sensor, use CarbonDioxide.findCarbonDioxide()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YCarbonDioxide object, corresponding to
     *         a CO2 sensor currently online, or a null pointer
     *         if there are no more CO2 sensors to enumerate.
     */
    nextCarbonDioxide(): YCarbonDioxide | null;
    /**
     * Starts the enumeration of CO2 sensors currently accessible.
     * Use the method YCarbonDioxide.nextCarbonDioxide() to iterate on
     * next CO2 sensors.
     *
     * @return a pointer to a YCarbonDioxide object, corresponding to
     *         the first CO2 sensor currently online, or a null pointer
     *         if there are none.
     */
    static FirstCarbonDioxide(): YCarbonDioxide | null;
    /**
     * Starts the enumeration of CO2 sensors currently accessible.
     * Use the method YCarbonDioxide.nextCarbonDioxide() to iterate on
     * next CO2 sensors.
     *
     * @param yctx : a YAPI context.
     *
     * @return a pointer to a YCarbonDioxide object, corresponding to
     *         the first CO2 sensor currently online, or a null pointer
     *         if there are none.
     */
    static FirstCarbonDioxideInContext(yctx: YAPIContext): YCarbonDioxide | null;
}
