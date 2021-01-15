/*********************************************************************
 *
 *  $Id: svn_id $
 *
 *  Implements the high-level API for Voltage functions
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
export declare const enum Y_Enabled {
    FALSE = 0,
    TRUE = 1,
    INVALID = -1
}
export interface YVoltageValueCallback {
    (func: YVoltage, value: string): void;
}
export interface YVoltageTimedReportCallback {
    (func: YVoltage, measure: YMeasure): void;
}
/**
 * YVoltage Class: voltage sensor control interface, available for instance in the Yocto-Motor-DC, the
 * Yocto-Volt or the Yocto-Watt
 *
 * The YVoltage class allows you to read and configure Yoctopuce voltage sensors.
 * It inherits from YSensor class the core functions to read measurements,
 * to register callback functions, and to access the autonomous datalogger.
 */
export declare class YVoltage extends YSensor {
    _className: string;
    _enabled: Y_Enabled;
    _valueCallbackVoltage: YVoltageValueCallback | null;
    _timedReportCallbackVoltage: YVoltageTimedReportCallback | null;
    readonly ENABLED_FALSE: Y_Enabled;
    readonly ENABLED_TRUE: Y_Enabled;
    readonly ENABLED_INVALID: Y_Enabled;
    static readonly ENABLED_FALSE: Y_Enabled;
    static readonly ENABLED_TRUE: Y_Enabled;
    static readonly ENABLED_INVALID: Y_Enabled;
    constructor(yapi: YAPIContext, func: string);
    imm_parseAttr(name: string, val: any): 0 | 1;
    /**
     * Returns the activation state of this input.
     *
     * @return either Y_ENABLED_FALSE or Y_ENABLED_TRUE, according to the activation state of this input
     *
     * On failure, throws an exception or returns Y_ENABLED_INVALID.
     */
    get_enabled(): Promise<Y_Enabled>;
    /**
     * Changes the activation state of this voltage input. When AC measurements are disabled,
     * the device will always assume a DC signal, and vice-versa. When both AC and DC measurements
     * are active, the device switches between AC and DC mode based on the relative amplitude
     * of variations compared to the average value.
     * Remember to call the saveToFlash()
     * method of the module if the modification must be kept.
     *
     * @param newval : either Y_ENABLED_FALSE or Y_ENABLED_TRUE, according to the activation state of this
     * voltage input
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_enabled(newval: Y_Enabled): Promise<number>;
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
     * Use the method YVoltage.isOnline() to test if $THEFUNCTION$ is
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
     * @return a YVoltage object allowing you to drive $THEFUNCTION$.
     */
    static FindVoltage(func: string): YVoltage;
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
     * Use the method YVoltage.isOnline() to test if $THEFUNCTION$ is
     * indeed online at a given time. In case of ambiguity when looking for
     * $AFUNCTION$ by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx : a YAPI context
     * @param func : a string that uniquely characterizes $THEFUNCTION$, for instance
     *         $FULLHARDWAREID$.
     *
     * @return a YVoltage object allowing you to drive $THEFUNCTION$.
     */
    static FindVoltageInContext(yctx: YAPIContext, func: string): YVoltage;
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
    registerValueCallback(callback: YVoltageValueCallback | null): Promise<number>;
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
    registerTimedReportCallback(callback: YVoltageTimedReportCallback | null): Promise<number>;
    _invokeTimedReportCallback(value: YMeasure): Promise<number>;
    /**
     * Returns the next Voltage
     *
     * @returns {YVoltage}
     */
    nextVoltage(): YVoltage | null;
    /**
     * Retrieves the first Voltage in a YAPI context
     *
     * @returns {YVoltage}
     */
    static FirstVoltage(): YVoltage | null;
    /**
     * Retrieves the first Voltage in a given context
     *
     * @param yctx {YAPIContext}
     *
     * @returns {YVoltage}
     */
    static FirstVoltageInContext(yctx: YAPIContext): YVoltage | null;
}
