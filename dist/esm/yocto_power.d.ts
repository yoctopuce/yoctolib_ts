/*********************************************************************
 *
 *  $Id: svn_id $
 *
 *  Implements the high-level API for Power functions
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
export interface YPowerValueCallback {
    (func: YPower, value: string): void;
}
export interface YPowerTimedReportCallback {
    (func: YPower, measure: YMeasure): void;
}
/**
 * YPower Class: electrical power sensor control interface, available for instance in the Yocto-Watt
 *
 * The YPower class allows you to read and configure Yoctopuce electrical power sensors.
 * It inherits from YSensor class the core functions to read measurements,
 * to register callback functions, and to access the autonomous datalogger.
 * This class adds the ability to access the energy counter and the power factor.
 */
export declare class YPower extends YSensor {
    _className: string;
    _cosPhi: number;
    _meter: number;
    _deliveredEnergyMeter: number;
    _receivedEnergyMeter: number;
    _meterTimer: number;
    _valueCallbackPower: YPowerValueCallback | null;
    _timedReportCallbackPower: YPowerTimedReportCallback | null;
    readonly COSPHI_INVALID: number;
    readonly METER_INVALID: number;
    readonly DELIVEREDENERGYMETER_INVALID: number;
    readonly RECEIVEDENERGYMETER_INVALID: number;
    readonly METERTIMER_INVALID: number;
    static readonly COSPHI_INVALID: number;
    static readonly METER_INVALID: number;
    static readonly DELIVEREDENERGYMETER_INVALID: number;
    static readonly RECEIVEDENERGYMETER_INVALID: number;
    static readonly METERTIMER_INVALID: number;
    constructor(yapi: YAPIContext, func: string);
    imm_parseAttr(name: string, val: any): 0 | 1;
    /**
     * Returns the power factor (the ratio between the real power consumed,
     * measured in W, and the apparent power provided, measured in VA).
     *
     * @return a floating point number corresponding to the power factor (the ratio between the real power consumed,
     *         measured in W, and the apparent power provided, measured in VA)
     *
     * On failure, throws an exception or returns Y_COSPHI_INVALID.
     */
    get_cosPhi(): Promise<number>;
    set_meter(newval: number): Promise<number>;
    /**
     * Returns the energy counter, maintained by the wattmeter by integrating the power consumption over time,
     * but only when positive. Note that this counter is reset at each start of the device.
     *
     * @return a floating point number corresponding to the energy counter, maintained by the wattmeter by
     * integrating the power consumption over time,
     *         but only when positive
     *
     * On failure, throws an exception or returns Y_METER_INVALID.
     */
    get_meter(): Promise<number>;
    /**
     * Returns the energy counter, maintained by the wattmeter by integrating the power consumption over time,
     * but only when positive. Note that this counter is reset at each start of the device.
     *
     * @return a floating point number corresponding to the energy counter, maintained by the wattmeter by
     * integrating the power consumption over time,
     *         but only when positive
     *
     * On failure, throws an exception or returns Y_DELIVEREDENERGYMETER_INVALID.
     */
    get_deliveredEnergyMeter(): Promise<number>;
    /**
     * Returns the energy counter, maintained by the wattmeter by integrating the power consumption over time,
     * but only when negative. Note that this counter is reset at each start of the device.
     *
     * @return a floating point number corresponding to the energy counter, maintained by the wattmeter by
     * integrating the power consumption over time,
     *         but only when negative
     *
     * On failure, throws an exception or returns Y_RECEIVEDENERGYMETER_INVALID.
     */
    get_receivedEnergyMeter(): Promise<number>;
    /**
     * Returns the elapsed time since last energy counter reset, in seconds.
     *
     * @return an integer corresponding to the elapsed time since last energy counter reset, in seconds
     *
     * On failure, throws an exception or returns Y_METERTIMER_INVALID.
     */
    get_meterTimer(): Promise<number>;
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
     * Use the method YPower.isOnline() to test if $THEFUNCTION$ is
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
     * @return a YPower object allowing you to drive $THEFUNCTION$.
     */
    static FindPower(func: string): YPower;
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
     * Use the method YPower.isOnline() to test if $THEFUNCTION$ is
     * indeed online at a given time. In case of ambiguity when looking for
     * $AFUNCTION$ by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx : a YAPI context
     * @param func : a string that uniquely characterizes $THEFUNCTION$, for instance
     *         $FULLHARDWAREID$.
     *
     * @return a YPower object allowing you to drive $THEFUNCTION$.
     */
    static FindPowerInContext(yctx: YAPIContext, func: string): YPower;
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
    registerValueCallback(callback: YPowerValueCallback | null): Promise<number>;
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
    registerTimedReportCallback(callback: YPowerTimedReportCallback | null): Promise<number>;
    _invokeTimedReportCallback(value: YMeasure): Promise<number>;
    /**
     * Resets the energy counters.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    reset(): Promise<number>;
    /**
     * Returns the next Power
     *
     * @returns {YPower}
     */
    nextPower(): YPower | null;
    /**
     * Retrieves the first Power in a YAPI context
     *
     * @returns {YPower}
     */
    static FirstPower(): YPower | null;
    /**
     * Retrieves the first Power in a given context
     *
     * @param yctx {YAPIContext}
     *
     * @returns {YPower}
     */
    static FirstPowerInContext(yctx: YAPIContext): YPower | null;
}
