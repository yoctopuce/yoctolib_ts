/*********************************************************************
 *
 *  $Id: svn_id $
 *
 *  Implements the high-level API for AirQuality functions
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
 * YAirQuality Class: air quality sensor control interface
 *
 * The YAirQuality class allows you to read and configure Yoctopuce air quality sensors.
 * It inherits from YSensor class the core functions to read measurements,
 * to register callback functions, and to access the autonomous datalogger.
 */
export declare class YAirQuality extends YSensor {
    _className: string;
    _ubaIndex: number;
    _relativeIndex: number;
    _aqiMode: YAirQuality.AQIMODE;
    _valueCallbackAirQuality: YAirQuality.ValueCallback | null;
    _timedReportCallbackAirQuality: YAirQuality.TimedReportCallback | null;
    readonly UBAINDEX_INVALID: number;
    readonly RELATIVEINDEX_INVALID: number;
    readonly AQIMODE_RELATIVE: YAirQuality.AQIMODE;
    readonly AQIMODE_UBA: YAirQuality.AQIMODE;
    readonly AQIMODE_INVALID: YAirQuality.AQIMODE;
    static readonly UBAINDEX_INVALID: number;
    static readonly RELATIVEINDEX_INVALID: number;
    static readonly AQIMODE_RELATIVE: YAirQuality.AQIMODE;
    static readonly AQIMODE_UBA: YAirQuality.AQIMODE;
    static readonly AQIMODE_INVALID: YAirQuality.AQIMODE;
    constructor(yapi: YAPIContext, func: string);
    imm_parseAttr(name: string, val: any): number;
    /**
     * Returns the current air quality index, according to UBA (from 1 to 5).
     *
     * @return a floating point number corresponding to the current air quality index, according to UBA (from 1 to 5)
     *
     * On failure, throws an exception or returns YAirQuality.UBAINDEX_INVALID.
     */
    get_ubaIndex(): Promise<number>;
    /**
     * Returns the relative air quality index, according to ScioSense (from 0 to 500).
     * A value below 100 indicates better-than-average air quality compared to the past 24 hours,
     * while a value above 100 indicates poorer-than-average air quality compared to the past 24 hours.
     *
     * @return a floating point number corresponding to the relative air quality index, according to
     * ScioSense (from 0 to 500)
     *
     * On failure, throws an exception or returns YAirQuality.RELATIVEINDEX_INVALID.
     */
    get_relativeIndex(): Promise<number>;
    /**
     * Returns the type of index reported by the get_currentValue function and callbacks (UBA index or relative index).
     *
     * @return either YAirQuality.AQIMODE_RELATIVE or YAirQuality.AQIMODE_UBA, according to the type of
     * index reported by the get_currentValue function and callbacks (UBA index or relative index)
     *
     * On failure, throws an exception or returns YAirQuality.AQIMODE_INVALID.
     */
    get_aqiMode(): Promise<YAirQuality.AQIMODE>;
    /**
     * Changes the the type of index reported by the get_currentValue function and callbacks (UBA index or
     * relative index).
     * Remember to call the saveToFlash() method of the module if the modification must be kept.
     *
     * @param newval : either YAirQuality.AQIMODE_RELATIVE or YAirQuality.AQIMODE_UBA, according to the
     * the type of index reported by the get_currentValue function and callbacks (UBA index or relative index)
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_aqiMode(newval: YAirQuality.AQIMODE): Promise<number>;
    /**
     * Retrieves a air quality sensor for a given identifier.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the air quality sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YAirQuality.isOnline() to test if the air quality sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a air quality sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the air quality sensor, for instance
     *         MyDevice.airQuality.
     *
     * @return a YAirQuality object allowing you to drive the air quality sensor.
     */
    static FindAirQuality(func: string): YAirQuality;
    /**
     * Retrieves a air quality sensor for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the air quality sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YAirQuality.isOnline() to test if the air quality sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a air quality sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx : a YAPI context
     * @param func : a string that uniquely characterizes the air quality sensor, for instance
     *         MyDevice.airQuality.
     *
     * @return a YAirQuality object allowing you to drive the air quality sensor.
     */
    static FindAirQualityInContext(yctx: YAPIContext, func: string): YAirQuality;
    /**
     * Registers the callback function that is invoked on every change of advertised value.
     * The callback is then invoked only during the execution of ySleep or yHandleEvents.
     * This provides control over the time when the callback is triggered. For good responsiveness,
     * remember to call one of these two functions periodically. The callback is called once juste after beeing
     * registered, passing the current advertised value  of the function, provided that it is not an empty string.
     * To unregister a callback, pass a null pointer as argument.
     *
     * @param callback : the callback function to call, or a null pointer. The callback function should take two
     *         arguments: the function object of which the value has changed, and the character string describing
     *         the new advertised value.
     * @noreturn
     */
    registerValueCallback(callback: YAirQuality.ValueCallback | null): Promise<number>;
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
    registerTimedReportCallback(callback: YAirQuality.TimedReportCallback | null): Promise<number>;
    _invokeTimedReportCallback(value: YMeasure): Promise<number>;
    /**
     * Continues the enumeration of air quality sensors started using yFirstAirQuality().
     * Caution: You can't make any assumption about the returned air quality sensors order.
     * If you want to find a specific a air quality sensor, use AirQuality.findAirQuality()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YAirQuality object, corresponding to
     *         a air quality sensor currently online, or a null pointer
     *         if there are no more air quality sensors to enumerate.
     */
    nextAirQuality(): YAirQuality | null;
    /**
     * Starts the enumeration of air quality sensors currently accessible.
     * Use the method YAirQuality.nextAirQuality() to iterate on
     * next air quality sensors.
     *
     * @return a pointer to a YAirQuality object, corresponding to
     *         the first air quality sensor currently online, or a null pointer
     *         if there are none.
     */
    static FirstAirQuality(): YAirQuality | null;
    /**
     * Starts the enumeration of air quality sensors currently accessible.
     * Use the method YAirQuality.nextAirQuality() to iterate on
     * next air quality sensors.
     *
     * @param yctx : a YAPI context.
     *
     * @return a pointer to a YAirQuality object, corresponding to
     *         the first air quality sensor currently online, or a null pointer
     *         if there are none.
     */
    static FirstAirQualityInContext(yctx: YAPIContext): YAirQuality | null;
}
export declare namespace YAirQuality {
    const enum AQIMODE {
        RELATIVE = 0,
        UBA = 1,
        INVALID = -1
    }
    interface ValueCallback {
        (func: YAirQuality, value: string): void;
    }
    interface TimedReportCallback {
        (func: YAirQuality, measure: YMeasure): void;
    }
}
