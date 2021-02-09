/*********************************************************************
 *
 *  $Id: yocto_powersupply.ts 43760 2021-02-08 14:33:45Z mvuilleu $
 *
 *  Implements the high-level API for PowerSupply functions
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
import { YAPIContext, YFunction } from './yocto_api.js';
/**
 * YPowerSupply Class: regulated power supply control interface
 *
 * The YPowerSupply class allows you to drive a Yoctopuce power supply.
 * It can be use to change the voltage set point,
 * the current limit and the enable/disable the output.
 */
export declare class YPowerSupply extends YFunction {
    _className: string;
    _voltageSetPoint: number;
    _currentLimit: number;
    _powerOutput: YPowerSupply.POWEROUTPUT;
    _voltageSense: YPowerSupply.VOLTAGESENSE;
    _measuredVoltage: number;
    _measuredCurrent: number;
    _inputVoltage: number;
    _vInt: number;
    _ldoTemperature: number;
    _voltageTransition: string;
    _voltageAtStartUp: number;
    _currentAtStartUp: number;
    _command: string;
    _valueCallbackPowerSupply: YPowerSupply.ValueCallback | null;
    readonly VOLTAGESETPOINT_INVALID: number;
    readonly CURRENTLIMIT_INVALID: number;
    readonly POWEROUTPUT_OFF: YPowerSupply.POWEROUTPUT;
    readonly POWEROUTPUT_ON: YPowerSupply.POWEROUTPUT;
    readonly POWEROUTPUT_INVALID: YPowerSupply.POWEROUTPUT;
    readonly VOLTAGESENSE_INT: YPowerSupply.VOLTAGESENSE;
    readonly VOLTAGESENSE_EXT: YPowerSupply.VOLTAGESENSE;
    readonly VOLTAGESENSE_INVALID: YPowerSupply.VOLTAGESENSE;
    readonly MEASUREDVOLTAGE_INVALID: number;
    readonly MEASUREDCURRENT_INVALID: number;
    readonly INPUTVOLTAGE_INVALID: number;
    readonly VINT_INVALID: number;
    readonly LDOTEMPERATURE_INVALID: number;
    readonly VOLTAGETRANSITION_INVALID: string;
    readonly VOLTAGEATSTARTUP_INVALID: number;
    readonly CURRENTATSTARTUP_INVALID: number;
    readonly COMMAND_INVALID: string;
    static readonly VOLTAGESETPOINT_INVALID: number;
    static readonly CURRENTLIMIT_INVALID: number;
    static readonly POWEROUTPUT_OFF: YPowerSupply.POWEROUTPUT;
    static readonly POWEROUTPUT_ON: YPowerSupply.POWEROUTPUT;
    static readonly POWEROUTPUT_INVALID: YPowerSupply.POWEROUTPUT;
    static readonly VOLTAGESENSE_INT: YPowerSupply.VOLTAGESENSE;
    static readonly VOLTAGESENSE_EXT: YPowerSupply.VOLTAGESENSE;
    static readonly VOLTAGESENSE_INVALID: YPowerSupply.VOLTAGESENSE;
    static readonly MEASUREDVOLTAGE_INVALID: number;
    static readonly MEASUREDCURRENT_INVALID: number;
    static readonly INPUTVOLTAGE_INVALID: number;
    static readonly VINT_INVALID: number;
    static readonly LDOTEMPERATURE_INVALID: number;
    static readonly VOLTAGETRANSITION_INVALID: string;
    static readonly VOLTAGEATSTARTUP_INVALID: number;
    static readonly CURRENTATSTARTUP_INVALID: number;
    static readonly COMMAND_INVALID: string;
    constructor(yapi: YAPIContext, func: string);
    imm_parseAttr(name: string, val: any): 0 | 1;
    /**
     * Changes the voltage set point, in V.
     *
     * @param newval : a floating point number corresponding to the voltage set point, in V
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_voltageSetPoint(newval: number): Promise<number>;
    /**
     * Returns the voltage set point, in V.
     *
     * @return a floating point number corresponding to the voltage set point, in V
     *
     * On failure, throws an exception or returns YPowerSupply.VOLTAGESETPOINT_INVALID.
     */
    get_voltageSetPoint(): Promise<number>;
    /**
     * Changes the current limit, in mA.
     *
     * @param newval : a floating point number corresponding to the current limit, in mA
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_currentLimit(newval: number): Promise<number>;
    /**
     * Returns the current limit, in mA.
     *
     * @return a floating point number corresponding to the current limit, in mA
     *
     * On failure, throws an exception or returns YPowerSupply.CURRENTLIMIT_INVALID.
     */
    get_currentLimit(): Promise<number>;
    /**
     * Returns the power supply output switch state.
     *
     * @return either YPowerSupply.POWEROUTPUT_OFF or YPowerSupply.POWEROUTPUT_ON, according to the power
     * supply output switch state
     *
     * On failure, throws an exception or returns YPowerSupply.POWEROUTPUT_INVALID.
     */
    get_powerOutput(): Promise<YPowerSupply.POWEROUTPUT>;
    /**
     * Changes the power supply output switch state.
     *
     * @param newval : either YPowerSupply.POWEROUTPUT_OFF or YPowerSupply.POWEROUTPUT_ON, according to
     * the power supply output switch state
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_powerOutput(newval: YPowerSupply.POWEROUTPUT): Promise<number>;
    /**
     * Returns the output voltage control point.
     *
     * @return either YPowerSupply.VOLTAGESENSE_INT or YPowerSupply.VOLTAGESENSE_EXT, according to the
     * output voltage control point
     *
     * On failure, throws an exception or returns YPowerSupply.VOLTAGESENSE_INVALID.
     */
    get_voltageSense(): Promise<YPowerSupply.VOLTAGESENSE>;
    /**
     * Changes the voltage control point.
     *
     * @param newval : either YPowerSupply.VOLTAGESENSE_INT or YPowerSupply.VOLTAGESENSE_EXT, according to
     * the voltage control point
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_voltageSense(newval: YPowerSupply.VOLTAGESENSE): Promise<number>;
    /**
     * Returns the measured output voltage, in V.
     *
     * @return a floating point number corresponding to the measured output voltage, in V
     *
     * On failure, throws an exception or returns YPowerSupply.MEASUREDVOLTAGE_INVALID.
     */
    get_measuredVoltage(): Promise<number>;
    /**
     * Returns the measured output current, in mA.
     *
     * @return a floating point number corresponding to the measured output current, in mA
     *
     * On failure, throws an exception or returns YPowerSupply.MEASUREDCURRENT_INVALID.
     */
    get_measuredCurrent(): Promise<number>;
    /**
     * Returns the measured input voltage, in V.
     *
     * @return a floating point number corresponding to the measured input voltage, in V
     *
     * On failure, throws an exception or returns YPowerSupply.INPUTVOLTAGE_INVALID.
     */
    get_inputVoltage(): Promise<number>;
    /**
     * Returns the internal voltage, in V.
     *
     * @return a floating point number corresponding to the internal voltage, in V
     *
     * On failure, throws an exception or returns YPowerSupply.VINT_INVALID.
     */
    get_vInt(): Promise<number>;
    /**
     * Returns the LDO temperature, in Celsius.
     *
     * @return a floating point number corresponding to the LDO temperature, in Celsius
     *
     * On failure, throws an exception or returns YPowerSupply.LDOTEMPERATURE_INVALID.
     */
    get_ldoTemperature(): Promise<number>;
    get_voltageTransition(): Promise<string>;
    set_voltageTransition(newval: string): Promise<number>;
    /**
     * Changes the voltage set point at device start up. Remember to call the matching
     * module saveToFlash() method, otherwise this call has no effect.
     *
     * @param newval : a floating point number corresponding to the voltage set point at device start up
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_voltageAtStartUp(newval: number): Promise<number>;
    /**
     * Returns the selected voltage set point at device startup, in V.
     *
     * @return a floating point number corresponding to the selected voltage set point at device startup, in V
     *
     * On failure, throws an exception or returns YPowerSupply.VOLTAGEATSTARTUP_INVALID.
     */
    get_voltageAtStartUp(): Promise<number>;
    /**
     * Changes the current limit at device start up. Remember to call the matching
     * module saveToFlash() method, otherwise this call has no effect.
     *
     * @param newval : a floating point number corresponding to the current limit at device start up
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_currentAtStartUp(newval: number): Promise<number>;
    /**
     * Returns the selected current limit at device startup, in mA.
     *
     * @return a floating point number corresponding to the selected current limit at device startup, in mA
     *
     * On failure, throws an exception or returns YPowerSupply.CURRENTATSTARTUP_INVALID.
     */
    get_currentAtStartUp(): Promise<number>;
    get_command(): Promise<string>;
    set_command(newval: string): Promise<number>;
    /**
     * Retrieves a regulated power supply for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the regulated power supply is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YPowerSupply.isOnline() to test if the regulated power supply is
     * indeed online at a given time. In case of ambiguity when looking for
     * a regulated power supply by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the regulated power supply, for instance
     *         MyDevice.powerSupply.
     *
     * @return a YPowerSupply object allowing you to drive the regulated power supply.
     */
    static FindPowerSupply(func: string): YPowerSupply;
    /**
     * Retrieves a regulated power supply for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the regulated power supply is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YPowerSupply.isOnline() to test if the regulated power supply is
     * indeed online at a given time. In case of ambiguity when looking for
     * a regulated power supply by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx : a YAPI context
     * @param func : a string that uniquely characterizes the regulated power supply, for instance
     *         MyDevice.powerSupply.
     *
     * @return a YPowerSupply object allowing you to drive the regulated power supply.
     */
    static FindPowerSupplyInContext(yctx: YAPIContext, func: string): YPowerSupply;
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
    registerValueCallback(callback: YPowerSupply.ValueCallback | null): Promise<number>;
    _invokeValueCallback(value: string): Promise<number>;
    /**
     * Performs a smooth transition of output voltage. Any explicit voltage
     * change cancels any ongoing transition process.
     *
     * @param V_target   : new output voltage value at the end of the transition
     *         (floating-point number, representing the end voltage in V)
     * @param ms_duration : total duration of the transition, in milliseconds
     *
     * @return YAPI.SUCCESS when the call succeeds.
     */
    voltageMove(V_target: number, ms_duration: number): Promise<number>;
    /**
     * Continues the enumeration of regulated power supplies started using yFirstPowerSupply().
     * Caution: You can't make any assumption about the returned regulated power supplies order.
     * If you want to find a specific a regulated power supply, use PowerSupply.findPowerSupply()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YPowerSupply object, corresponding to
     *         a regulated power supply currently online, or a null pointer
     *         if there are no more regulated power supplies to enumerate.
     */
    nextPowerSupply(): YPowerSupply | null;
    /**
     * Starts the enumeration of regulated power supplies currently accessible.
     * Use the method YPowerSupply.nextPowerSupply() to iterate on
     * next regulated power supplies.
     *
     * @return a pointer to a YPowerSupply object, corresponding to
     *         the first regulated power supply currently online, or a null pointer
     *         if there are none.
     */
    static FirstPowerSupply(): YPowerSupply | null;
    /**
     * Starts the enumeration of regulated power supplies currently accessible.
     * Use the method YPowerSupply.nextPowerSupply() to iterate on
     * next regulated power supplies.
     *
     * @param yctx : a YAPI context.
     *
     * @return a pointer to a YPowerSupply object, corresponding to
     *         the first regulated power supply currently online, or a null pointer
     *         if there are none.
     */
    static FirstPowerSupplyInContext(yctx: YAPIContext): YPowerSupply | null;
}
export declare namespace YPowerSupply {
    const enum POWEROUTPUT {
        OFF = 0,
        ON = 1,
        INVALID = -1
    }
    const enum VOLTAGESENSE {
        INT = 0,
        EXT = 1,
        INVALID = -1
    }
    interface ValueCallback {
        (func: YPowerSupply, value: string): void;
    }
}
