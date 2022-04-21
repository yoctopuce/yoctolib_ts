/*********************************************************************
 *
 *  $Id: yocto_voltageoutput.ts 48520 2022-02-03 10:51:20Z seb $
 *
 *  Implements the high-level API for VoltageOutput functions
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
 * YVoltageOutput Class: voltage output control interface, available for instance in the Yocto-0-10V-Tx
 *
 * The YVoltageOutput class allows you to drive a voltage output.
 */
export declare class YVoltageOutput extends YFunction {
    _className: string;
    _currentVoltage: number;
    _voltageTransition: string;
    _voltageAtStartUp: number;
    _valueCallbackVoltageOutput: YVoltageOutput.ValueCallback | null;
    readonly CURRENTVOLTAGE_INVALID: number;
    readonly VOLTAGETRANSITION_INVALID: string;
    readonly VOLTAGEATSTARTUP_INVALID: number;
    static readonly CURRENTVOLTAGE_INVALID: number;
    static readonly VOLTAGETRANSITION_INVALID: string;
    static readonly VOLTAGEATSTARTUP_INVALID: number;
    constructor(yapi: YAPIContext, func: string);
    imm_parseAttr(name: string, val: any): 0 | 1;
    /**
     * Changes the output voltage, in V. Valid range is from 0 to 10V.
     *
     * @param newval : a floating point number corresponding to the output voltage, in V
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_currentVoltage(newval: number): Promise<number>;
    /**
     * Returns the output voltage set point, in V.
     *
     * @return a floating point number corresponding to the output voltage set point, in V
     *
     * On failure, throws an exception or returns YVoltageOutput.CURRENTVOLTAGE_INVALID.
     */
    get_currentVoltage(): Promise<number>;
    get_voltageTransition(): Promise<string>;
    set_voltageTransition(newval: string): Promise<number>;
    /**
     * Changes the output voltage at device start up. Remember to call the matching
     * module saveToFlash() method, otherwise this call has no effect.
     *
     * @param newval : a floating point number corresponding to the output voltage at device start up
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_voltageAtStartUp(newval: number): Promise<number>;
    /**
     * Returns the selected voltage output at device startup, in V.
     *
     * @return a floating point number corresponding to the selected voltage output at device startup, in V
     *
     * On failure, throws an exception or returns YVoltageOutput.VOLTAGEATSTARTUP_INVALID.
     */
    get_voltageAtStartUp(): Promise<number>;
    /**
     * Retrieves a voltage output for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the voltage output is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YVoltageOutput.isOnline() to test if the voltage output is
     * indeed online at a given time. In case of ambiguity when looking for
     * a voltage output by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the voltage output, for instance
     *         TX010V01.voltageOutput1.
     *
     * @return a YVoltageOutput object allowing you to drive the voltage output.
     */
    static FindVoltageOutput(func: string): YVoltageOutput;
    /**
     * Retrieves a voltage output for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the voltage output is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YVoltageOutput.isOnline() to test if the voltage output is
     * indeed online at a given time. In case of ambiguity when looking for
     * a voltage output by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx : a YAPI context
     * @param func : a string that uniquely characterizes the voltage output, for instance
     *         TX010V01.voltageOutput1.
     *
     * @return a YVoltageOutput object allowing you to drive the voltage output.
     */
    static FindVoltageOutputInContext(yctx: YAPIContext, func: string): YVoltageOutput;
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
    registerValueCallback(callback: YVoltageOutput.ValueCallback | null): Promise<number>;
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
     * Continues the enumeration of voltage outputs started using yFirstVoltageOutput().
     * Caution: You can't make any assumption about the returned voltage outputs order.
     * If you want to find a specific a voltage output, use VoltageOutput.findVoltageOutput()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YVoltageOutput object, corresponding to
     *         a voltage output currently online, or a null pointer
     *         if there are no more voltage outputs to enumerate.
     */
    nextVoltageOutput(): YVoltageOutput | null;
    /**
     * Starts the enumeration of voltage outputs currently accessible.
     * Use the method YVoltageOutput.nextVoltageOutput() to iterate on
     * next voltage outputs.
     *
     * @return a pointer to a YVoltageOutput object, corresponding to
     *         the first voltage output currently online, or a null pointer
     *         if there are none.
     */
    static FirstVoltageOutput(): YVoltageOutput | null;
    /**
     * Starts the enumeration of voltage outputs currently accessible.
     * Use the method YVoltageOutput.nextVoltageOutput() to iterate on
     * next voltage outputs.
     *
     * @param yctx : a YAPI context.
     *
     * @return a pointer to a YVoltageOutput object, corresponding to
     *         the first voltage output currently online, or a null pointer
     *         if there are none.
     */
    static FirstVoltageOutputInContext(yctx: YAPIContext): YVoltageOutput | null;
}
export declare namespace YVoltageOutput {
    interface ValueCallback {
        (func: YVoltageOutput, value: string): void;
    }
}
