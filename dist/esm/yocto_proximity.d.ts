/*********************************************************************
 *
 *  $Id: yocto_proximity.ts 43483 2021-01-21 15:47:50Z mvuilleu $
 *
 *  Implements the high-level API for Proximity functions
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
export declare const enum YProximity_IsPresent {
    FALSE = 0,
    TRUE = 1,
    INVALID = -1
}
export declare const enum YProximity_ProximityReportMode {
    NUMERIC = 0,
    PRESENCE = 1,
    PULSECOUNT = 2,
    INVALID = -1
}
export interface YProximityValueCallback {
    (func: YProximity, value: string): void;
}
export interface YProximityTimedReportCallback {
    (func: YProximity, measure: YMeasure): void;
}
/**
 * YProximity Class: proximity sensor control interface, available for instance in the Yocto-Proximity
 *
 * The YProximity class allows you to read and configure Yoctopuce proximity sensors.
 * It inherits from YSensor class the core functions to read measurements,
 * to register callback functions, and to access the autonomous datalogger.
 * This class adds the ability to setup a detection threshold and to count the
 * number of detected state changes.
 */
export declare class YProximity extends YSensor {
    _className: string;
    _signalValue: number;
    _detectionThreshold: number;
    _detectionHysteresis: number;
    _presenceMinTime: number;
    _removalMinTime: number;
    _isPresent: YProximity_IsPresent;
    _lastTimeApproached: number;
    _lastTimeRemoved: number;
    _pulseCounter: number;
    _pulseTimer: number;
    _proximityReportMode: YProximity_ProximityReportMode;
    _valueCallbackProximity: YProximityValueCallback | null;
    _timedReportCallbackProximity: YProximityTimedReportCallback | null;
    readonly SIGNALVALUE_INVALID: number;
    readonly DETECTIONTHRESHOLD_INVALID: number;
    readonly DETECTIONHYSTERESIS_INVALID: number;
    readonly PRESENCEMINTIME_INVALID: number;
    readonly REMOVALMINTIME_INVALID: number;
    readonly ISPRESENT_FALSE: YProximity_IsPresent;
    readonly ISPRESENT_TRUE: YProximity_IsPresent;
    readonly ISPRESENT_INVALID: YProximity_IsPresent;
    readonly LASTTIMEAPPROACHED_INVALID: number;
    readonly LASTTIMEREMOVED_INVALID: number;
    readonly PULSECOUNTER_INVALID: number;
    readonly PULSETIMER_INVALID: number;
    readonly PROXIMITYREPORTMODE_NUMERIC: YProximity_ProximityReportMode;
    readonly PROXIMITYREPORTMODE_PRESENCE: YProximity_ProximityReportMode;
    readonly PROXIMITYREPORTMODE_PULSECOUNT: YProximity_ProximityReportMode;
    readonly PROXIMITYREPORTMODE_INVALID: YProximity_ProximityReportMode;
    static readonly SIGNALVALUE_INVALID: number;
    static readonly DETECTIONTHRESHOLD_INVALID: number;
    static readonly DETECTIONHYSTERESIS_INVALID: number;
    static readonly PRESENCEMINTIME_INVALID: number;
    static readonly REMOVALMINTIME_INVALID: number;
    static readonly ISPRESENT_FALSE: YProximity_IsPresent;
    static readonly ISPRESENT_TRUE: YProximity_IsPresent;
    static readonly ISPRESENT_INVALID: YProximity_IsPresent;
    static readonly LASTTIMEAPPROACHED_INVALID: number;
    static readonly LASTTIMEREMOVED_INVALID: number;
    static readonly PULSECOUNTER_INVALID: number;
    static readonly PULSETIMER_INVALID: number;
    static readonly PROXIMITYREPORTMODE_NUMERIC: YProximity_ProximityReportMode;
    static readonly PROXIMITYREPORTMODE_PRESENCE: YProximity_ProximityReportMode;
    static readonly PROXIMITYREPORTMODE_PULSECOUNT: YProximity_ProximityReportMode;
    static readonly PROXIMITYREPORTMODE_INVALID: YProximity_ProximityReportMode;
    constructor(yapi: YAPIContext, func: string);
    imm_parseAttr(name: string, val: any): 0 | 1;
    /**
     * Returns the current value of signal measured by the proximity sensor.
     *
     * @return a floating point number corresponding to the current value of signal measured by the proximity sensor
     *
     * On failure, throws an exception or returns YProximity.SIGNALVALUE_INVALID.
     */
    get_signalValue(): Promise<number>;
    /**
     * Returns the threshold used to determine the logical state of the proximity sensor, when considered
     * as a binary input (on/off).
     *
     * @return an integer corresponding to the threshold used to determine the logical state of the
     * proximity sensor, when considered
     *         as a binary input (on/off)
     *
     * On failure, throws an exception or returns YProximity.DETECTIONTHRESHOLD_INVALID.
     */
    get_detectionThreshold(): Promise<number>;
    /**
     * Changes the threshold used to determine the logical state of the proximity sensor, when considered
     * as a binary input (on/off).
     * Remember to call the saveToFlash() method of the module if the modification must be kept.
     *
     * @param newval : an integer corresponding to the threshold used to determine the logical state of
     * the proximity sensor, when considered
     *         as a binary input (on/off)
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_detectionThreshold(newval: number): Promise<number>;
    /**
     * Returns the hysteresis used to determine the logical state of the proximity sensor, when considered
     * as a binary input (on/off).
     *
     * @return an integer corresponding to the hysteresis used to determine the logical state of the
     * proximity sensor, when considered
     *         as a binary input (on/off)
     *
     * On failure, throws an exception or returns YProximity.DETECTIONHYSTERESIS_INVALID.
     */
    get_detectionHysteresis(): Promise<number>;
    /**
     * Changes the hysteresis used to determine the logical state of the proximity sensor, when considered
     * as a binary input (on/off).
     * Remember to call the saveToFlash() method of the module if the modification must be kept.
     *
     * @param newval : an integer corresponding to the hysteresis used to determine the logical state of
     * the proximity sensor, when considered
     *         as a binary input (on/off)
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_detectionHysteresis(newval: number): Promise<number>;
    /**
     * Returns the minimal detection duration before signalling a presence event. Any shorter detection is
     * considered as noise or bounce (false positive) and filtered out.
     *
     * @return an integer corresponding to the minimal detection duration before signalling a presence event
     *
     * On failure, throws an exception or returns YProximity.PRESENCEMINTIME_INVALID.
     */
    get_presenceMinTime(): Promise<number>;
    /**
     * Changes the minimal detection duration before signalling a presence event. Any shorter detection is
     * considered as noise or bounce (false positive) and filtered out.
     * Remember to call the saveToFlash() method of the module if the modification must be kept.
     *
     * @param newval : an integer corresponding to the minimal detection duration before signalling a presence event
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_presenceMinTime(newval: number): Promise<number>;
    /**
     * Returns the minimal detection duration before signalling a removal event. Any shorter detection is
     * considered as noise or bounce (false positive) and filtered out.
     *
     * @return an integer corresponding to the minimal detection duration before signalling a removal event
     *
     * On failure, throws an exception or returns YProximity.REMOVALMINTIME_INVALID.
     */
    get_removalMinTime(): Promise<number>;
    /**
     * Changes the minimal detection duration before signalling a removal event. Any shorter detection is
     * considered as noise or bounce (false positive) and filtered out.
     * Remember to call the saveToFlash() method of the module if the modification must be kept.
     *
     * @param newval : an integer corresponding to the minimal detection duration before signalling a removal event
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_removalMinTime(newval: number): Promise<number>;
    /**
     * Returns true if the input (considered as binary) is active (detection value is smaller than the
     * specified threshold), and false otherwise.
     *
     * @return either YProximity.ISPRESENT_FALSE or YProximity.ISPRESENT_TRUE, according to true if the
     * input (considered as binary) is active (detection value is smaller than the specified threshold),
     * and false otherwise
     *
     * On failure, throws an exception or returns YProximity.ISPRESENT_INVALID.
     */
    get_isPresent(): Promise<YProximity_IsPresent>;
    /**
     * Returns the number of elapsed milliseconds between the module power on and the last observed
     * detection (the input contact transitioned from absent to present).
     *
     * @return an integer corresponding to the number of elapsed milliseconds between the module power on
     * and the last observed
     *         detection (the input contact transitioned from absent to present)
     *
     * On failure, throws an exception or returns YProximity.LASTTIMEAPPROACHED_INVALID.
     */
    get_lastTimeApproached(): Promise<number>;
    /**
     * Returns the number of elapsed milliseconds between the module power on and the last observed
     * detection (the input contact transitioned from present to absent).
     *
     * @return an integer corresponding to the number of elapsed milliseconds between the module power on
     * and the last observed
     *         detection (the input contact transitioned from present to absent)
     *
     * On failure, throws an exception or returns YProximity.LASTTIMEREMOVED_INVALID.
     */
    get_lastTimeRemoved(): Promise<number>;
    /**
     * Returns the pulse counter value. The value is a 32 bit integer. In case
     * of overflow (>=2^32), the counter will wrap. To reset the counter, just
     * call the resetCounter() method.
     *
     * @return an integer corresponding to the pulse counter value
     *
     * On failure, throws an exception or returns YProximity.PULSECOUNTER_INVALID.
     */
    get_pulseCounter(): Promise<number>;
    set_pulseCounter(newval: number): Promise<number>;
    /**
     * Returns the timer of the pulse counter (ms).
     *
     * @return an integer corresponding to the timer of the pulse counter (ms)
     *
     * On failure, throws an exception or returns YProximity.PULSETIMER_INVALID.
     */
    get_pulseTimer(): Promise<number>;
    /**
     * Returns the parameter (sensor value, presence or pulse count) returned by the get_currentValue
     * function and callbacks.
     *
     * @return a value among YProximity.PROXIMITYREPORTMODE_NUMERIC,
     * YProximity.PROXIMITYREPORTMODE_PRESENCE and YProximity.PROXIMITYREPORTMODE_PULSECOUNT corresponding
     * to the parameter (sensor value, presence or pulse count) returned by the get_currentValue function and callbacks
     *
     * On failure, throws an exception or returns YProximity.PROXIMITYREPORTMODE_INVALID.
     */
    get_proximityReportMode(): Promise<YProximity_ProximityReportMode>;
    /**
     * Changes the  parameter  type (sensor value, presence or pulse count) returned by the
     * get_currentValue function and callbacks.
     * The edge count value is limited to the 6 lowest digits. For values greater than one million, use
     * get_pulseCounter().
     * Remember to call the saveToFlash() method of the module if the modification must be kept.
     *
     * @param newval : a value among YProximity.PROXIMITYREPORTMODE_NUMERIC,
     * YProximity.PROXIMITYREPORTMODE_PRESENCE and YProximity.PROXIMITYREPORTMODE_PULSECOUNT corresponding
     * to the  parameter  type (sensor value, presence or pulse count) returned by the get_currentValue
     * function and callbacks
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_proximityReportMode(newval: YProximity_ProximityReportMode): Promise<number>;
    /**
     * Retrieves a proximity sensor for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the proximity sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YProximity.isOnline() to test if the proximity sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a proximity sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the proximity sensor, for instance
     *         YPROXIM1.proximity1.
     *
     * @return a YProximity object allowing you to drive the proximity sensor.
     */
    static FindProximity(func: string): YProximity;
    /**
     * Retrieves a proximity sensor for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the proximity sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YProximity.isOnline() to test if the proximity sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a proximity sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx : a YAPI context
     * @param func : a string that uniquely characterizes the proximity sensor, for instance
     *         YPROXIM1.proximity1.
     *
     * @return a YProximity object allowing you to drive the proximity sensor.
     */
    static FindProximityInContext(yctx: YAPIContext, func: string): YProximity;
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
    registerValueCallback(callback: YProximityValueCallback | null): Promise<number>;
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
    registerTimedReportCallback(callback: YProximityTimedReportCallback | null): Promise<number>;
    _invokeTimedReportCallback(value: YMeasure): Promise<number>;
    /**
     * Resets the pulse counter value as well as its timer.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    resetCounter(): Promise<number>;
    /**
     * Continues the enumeration of proximity sensors started using yFirstProximity().
     * Caution: You can't make any assumption about the returned proximity sensors order.
     * If you want to find a specific a proximity sensor, use Proximity.findProximity()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YProximity object, corresponding to
     *         a proximity sensor currently online, or a null pointer
     *         if there are no more proximity sensors to enumerate.
     */
    nextProximity(): YProximity | null;
    /**
     * Starts the enumeration of proximity sensors currently accessible.
     * Use the method YProximity.nextProximity() to iterate on
     * next proximity sensors.
     *
     * @return a pointer to a YProximity object, corresponding to
     *         the first proximity sensor currently online, or a null pointer
     *         if there are none.
     */
    static FirstProximity(): YProximity | null;
    /**
     * Starts the enumeration of proximity sensors currently accessible.
     * Use the method YProximity.nextProximity() to iterate on
     * next proximity sensors.
     *
     * @param yctx : a YAPI context.
     *
     * @return a pointer to a YProximity object, corresponding to
     *         the first proximity sensor currently online, or a null pointer
     *         if there are none.
     */
    static FirstProximityInContext(yctx: YAPIContext): YProximity | null;
}
