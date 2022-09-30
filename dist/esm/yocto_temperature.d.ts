/*********************************************************************
 *
 *  $Id: yocto_temperature.ts 50689 2022-08-17 14:37:15Z mvuilleu $
 *
 *  Implements the high-level API for Temperature functions
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
 * YTemperature Class: temperature sensor control interface, available for instance in the
 * Yocto-Meteo-V2, the Yocto-PT100, the Yocto-Temperature or the Yocto-Thermocouple
 *
 * The YTemperature class allows you to read and configure Yoctopuce temperature sensors.
 * It inherits from YSensor class the core functions to read measurements,
 * to register callback functions, and to access the autonomous datalogger.
 * This class adds the ability to configure some specific parameters
 * for some sensors (connection type, temperature mapping table).
 */
export declare class YTemperature extends YSensor {
    _className: string;
    _sensorType: YTemperature.SENSORTYPE;
    _signalValue: number;
    _signalUnit: string;
    _command: string;
    _valueCallbackTemperature: YTemperature.ValueCallback | null;
    _timedReportCallbackTemperature: YTemperature.TimedReportCallback | null;
    readonly SENSORTYPE_DIGITAL: YTemperature.SENSORTYPE;
    readonly SENSORTYPE_TYPE_K: YTemperature.SENSORTYPE;
    readonly SENSORTYPE_TYPE_E: YTemperature.SENSORTYPE;
    readonly SENSORTYPE_TYPE_J: YTemperature.SENSORTYPE;
    readonly SENSORTYPE_TYPE_N: YTemperature.SENSORTYPE;
    readonly SENSORTYPE_TYPE_R: YTemperature.SENSORTYPE;
    readonly SENSORTYPE_TYPE_S: YTemperature.SENSORTYPE;
    readonly SENSORTYPE_TYPE_T: YTemperature.SENSORTYPE;
    readonly SENSORTYPE_PT100_4WIRES: YTemperature.SENSORTYPE;
    readonly SENSORTYPE_PT100_3WIRES: YTemperature.SENSORTYPE;
    readonly SENSORTYPE_PT100_2WIRES: YTemperature.SENSORTYPE;
    readonly SENSORTYPE_RES_OHM: YTemperature.SENSORTYPE;
    readonly SENSORTYPE_RES_NTC: YTemperature.SENSORTYPE;
    readonly SENSORTYPE_RES_LINEAR: YTemperature.SENSORTYPE;
    readonly SENSORTYPE_RES_INTERNAL: YTemperature.SENSORTYPE;
    readonly SENSORTYPE_IR: YTemperature.SENSORTYPE;
    readonly SENSORTYPE_RES_PT1000: YTemperature.SENSORTYPE;
    readonly SENSORTYPE_CHANNEL_OFF: YTemperature.SENSORTYPE;
    readonly SENSORTYPE_INVALID: YTemperature.SENSORTYPE;
    readonly SIGNALVALUE_INVALID: number;
    readonly SIGNALUNIT_INVALID: string;
    readonly COMMAND_INVALID: string;
    static readonly SENSORTYPE_DIGITAL: YTemperature.SENSORTYPE;
    static readonly SENSORTYPE_TYPE_K: YTemperature.SENSORTYPE;
    static readonly SENSORTYPE_TYPE_E: YTemperature.SENSORTYPE;
    static readonly SENSORTYPE_TYPE_J: YTemperature.SENSORTYPE;
    static readonly SENSORTYPE_TYPE_N: YTemperature.SENSORTYPE;
    static readonly SENSORTYPE_TYPE_R: YTemperature.SENSORTYPE;
    static readonly SENSORTYPE_TYPE_S: YTemperature.SENSORTYPE;
    static readonly SENSORTYPE_TYPE_T: YTemperature.SENSORTYPE;
    static readonly SENSORTYPE_PT100_4WIRES: YTemperature.SENSORTYPE;
    static readonly SENSORTYPE_PT100_3WIRES: YTemperature.SENSORTYPE;
    static readonly SENSORTYPE_PT100_2WIRES: YTemperature.SENSORTYPE;
    static readonly SENSORTYPE_RES_OHM: YTemperature.SENSORTYPE;
    static readonly SENSORTYPE_RES_NTC: YTemperature.SENSORTYPE;
    static readonly SENSORTYPE_RES_LINEAR: YTemperature.SENSORTYPE;
    static readonly SENSORTYPE_RES_INTERNAL: YTemperature.SENSORTYPE;
    static readonly SENSORTYPE_IR: YTemperature.SENSORTYPE;
    static readonly SENSORTYPE_RES_PT1000: YTemperature.SENSORTYPE;
    static readonly SENSORTYPE_CHANNEL_OFF: YTemperature.SENSORTYPE;
    static readonly SENSORTYPE_INVALID: YTemperature.SENSORTYPE;
    static readonly SIGNALVALUE_INVALID: number;
    static readonly SIGNALUNIT_INVALID: string;
    static readonly COMMAND_INVALID: string;
    constructor(yapi: YAPIContext, func: string);
    imm_parseAttr(name: string, val: any): 0 | 1;
    /**
     * Changes the measuring unit for the measured temperature. That unit is a string.
     * If that strings end with the letter F all temperatures values will returned in
     * Fahrenheit degrees. If that String ends with the letter K all values will be
     * returned in Kelvin degrees. If that string ends with the letter C all values will be
     * returned in Celsius degrees.  If the string ends with any other character the
     * change will be ignored. Remember to call the
     * saveToFlash() method of the module if the modification must be kept.
     * WARNING: if a specific calibration is defined for the temperature function, a
     * unit system change will probably break it.
     *
     * @param newval : a string corresponding to the measuring unit for the measured temperature
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_unit(newval: string): Promise<number>;
    /**
     * Returns the temperature sensor type.
     *
     * @return a value among YTemperature.SENSORTYPE_DIGITAL, YTemperature.SENSORTYPE_TYPE_K,
     * YTemperature.SENSORTYPE_TYPE_E, YTemperature.SENSORTYPE_TYPE_J, YTemperature.SENSORTYPE_TYPE_N,
     * YTemperature.SENSORTYPE_TYPE_R, YTemperature.SENSORTYPE_TYPE_S, YTemperature.SENSORTYPE_TYPE_T,
     * YTemperature.SENSORTYPE_PT100_4WIRES, YTemperature.SENSORTYPE_PT100_3WIRES,
     * YTemperature.SENSORTYPE_PT100_2WIRES, YTemperature.SENSORTYPE_RES_OHM,
     * YTemperature.SENSORTYPE_RES_NTC, YTemperature.SENSORTYPE_RES_LINEAR,
     * YTemperature.SENSORTYPE_RES_INTERNAL, YTemperature.SENSORTYPE_IR,
     * YTemperature.SENSORTYPE_RES_PT1000 and YTemperature.SENSORTYPE_CHANNEL_OFF corresponding to the
     * temperature sensor type
     *
     * On failure, throws an exception or returns YTemperature.SENSORTYPE_INVALID.
     */
    get_sensorType(): Promise<YTemperature.SENSORTYPE>;
    /**
     * Changes the temperature sensor type.  This function is used
     * to define the type of thermocouple (K,E...) used with the device.
     * It has no effect if module is using a digital sensor or a thermistor.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : a value among YTemperature.SENSORTYPE_DIGITAL, YTemperature.SENSORTYPE_TYPE_K,
     * YTemperature.SENSORTYPE_TYPE_E, YTemperature.SENSORTYPE_TYPE_J, YTemperature.SENSORTYPE_TYPE_N,
     * YTemperature.SENSORTYPE_TYPE_R, YTemperature.SENSORTYPE_TYPE_S, YTemperature.SENSORTYPE_TYPE_T,
     * YTemperature.SENSORTYPE_PT100_4WIRES, YTemperature.SENSORTYPE_PT100_3WIRES,
     * YTemperature.SENSORTYPE_PT100_2WIRES, YTemperature.SENSORTYPE_RES_OHM,
     * YTemperature.SENSORTYPE_RES_NTC, YTemperature.SENSORTYPE_RES_LINEAR,
     * YTemperature.SENSORTYPE_RES_INTERNAL, YTemperature.SENSORTYPE_IR,
     * YTemperature.SENSORTYPE_RES_PT1000 and YTemperature.SENSORTYPE_CHANNEL_OFF corresponding to the
     * temperature sensor type
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_sensorType(newval: YTemperature.SENSORTYPE): Promise<number>;
    /**
     * Returns the current value of the electrical signal measured by the sensor.
     *
     * @return a floating point number corresponding to the current value of the electrical signal
     * measured by the sensor
     *
     * On failure, throws an exception or returns YTemperature.SIGNALVALUE_INVALID.
     */
    get_signalValue(): Promise<number>;
    /**
     * Returns the measuring unit of the electrical signal used by the sensor.
     *
     * @return a string corresponding to the measuring unit of the electrical signal used by the sensor
     *
     * On failure, throws an exception or returns YTemperature.SIGNALUNIT_INVALID.
     */
    get_signalUnit(): Promise<string>;
    get_command(): Promise<string>;
    set_command(newval: string): Promise<number>;
    /**
     * Retrieves a temperature sensor for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the temperature sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YTemperature.isOnline() to test if the temperature sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a temperature sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the temperature sensor, for instance
     *         METEOMK2.temperature.
     *
     * @return a YTemperature object allowing you to drive the temperature sensor.
     */
    static FindTemperature(func: string): YTemperature;
    /**
     * Retrieves a temperature sensor for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the temperature sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YTemperature.isOnline() to test if the temperature sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a temperature sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx : a YAPI context
     * @param func : a string that uniquely characterizes the temperature sensor, for instance
     *         METEOMK2.temperature.
     *
     * @return a YTemperature object allowing you to drive the temperature sensor.
     */
    static FindTemperatureInContext(yctx: YAPIContext, func: string): YTemperature;
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
    registerValueCallback(callback: YTemperature.ValueCallback | null): Promise<number>;
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
    registerTimedReportCallback(callback: YTemperature.TimedReportCallback | null): Promise<number>;
    _invokeTimedReportCallback(value: YMeasure): Promise<number>;
    /**
     * Configures NTC thermistor parameters in order to properly compute the temperature from
     * the measured resistance. For increased precision, you can enter a complete mapping
     * table using set_thermistorResponseTable. This function can only be used with a
     * temperature sensor based on thermistors.
     *
     * @param res25 : thermistor resistance at 25 degrees Celsius
     * @param beta : Beta value
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_ntcParameters(res25: number, beta: number): Promise<number>;
    /**
     * Records a thermistor response table, in order to interpolate the temperature from
     * the measured resistance. This function can only be used with a temperature
     * sensor based on thermistors.
     *
     * @param tempValues : array of floating point numbers, corresponding to all
     *         temperatures (in degrees Celsius) for which the resistance of the
     *         thermistor is specified.
     * @param resValues : array of floating point numbers, corresponding to the resistance
     *         values (in Ohms) for each of the temperature included in the first
     *         argument, index by index.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_thermistorResponseTable(tempValues: number[], resValues: number[]): Promise<number>;
    /**
     * Retrieves the thermistor response table previously configured using the
     * set_thermistorResponseTable function. This function can only be used with a
     * temperature sensor based on thermistors.
     *
     * @param tempValues : array of floating point numbers, that is filled by the function
     *         with all temperatures (in degrees Celsius) for which the resistance
     *         of the thermistor is specified.
     * @param resValues : array of floating point numbers, that is filled by the function
     *         with the value (in Ohms) for each of the temperature included in the
     *         first argument, index by index.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    loadThermistorResponseTable(tempValues: number[], resValues: number[]): Promise<number>;
    /**
     * Continues the enumeration of temperature sensors started using yFirstTemperature().
     * Caution: You can't make any assumption about the returned temperature sensors order.
     * If you want to find a specific a temperature sensor, use Temperature.findTemperature()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YTemperature object, corresponding to
     *         a temperature sensor currently online, or a null pointer
     *         if there are no more temperature sensors to enumerate.
     */
    nextTemperature(): YTemperature | null;
    /**
     * Starts the enumeration of temperature sensors currently accessible.
     * Use the method YTemperature.nextTemperature() to iterate on
     * next temperature sensors.
     *
     * @return a pointer to a YTemperature object, corresponding to
     *         the first temperature sensor currently online, or a null pointer
     *         if there are none.
     */
    static FirstTemperature(): YTemperature | null;
    /**
     * Starts the enumeration of temperature sensors currently accessible.
     * Use the method YTemperature.nextTemperature() to iterate on
     * next temperature sensors.
     *
     * @param yctx : a YAPI context.
     *
     * @return a pointer to a YTemperature object, corresponding to
     *         the first temperature sensor currently online, or a null pointer
     *         if there are none.
     */
    static FirstTemperatureInContext(yctx: YAPIContext): YTemperature | null;
}
export declare namespace YTemperature {
    const enum SENSORTYPE {
        DIGITAL = 0,
        TYPE_K = 1,
        TYPE_E = 2,
        TYPE_J = 3,
        TYPE_N = 4,
        TYPE_R = 5,
        TYPE_S = 6,
        TYPE_T = 7,
        PT100_4WIRES = 8,
        PT100_3WIRES = 9,
        PT100_2WIRES = 10,
        RES_OHM = 11,
        RES_NTC = 12,
        RES_LINEAR = 13,
        RES_INTERNAL = 14,
        IR = 15,
        RES_PT1000 = 16,
        CHANNEL_OFF = 17,
        INVALID = -1
    }
    interface ValueCallback {
        (func: YTemperature, value: string): void;
    }
    interface TimedReportCallback {
        (func: YTemperature, measure: YMeasure): void;
    }
}
