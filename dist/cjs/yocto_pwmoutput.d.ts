/*********************************************************************
 *
 *  $Id: yocto_pwmoutput.ts 43483 2021-01-21 15:47:50Z mvuilleu $
 *
 *  Implements the high-level API for PwmOutput functions
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
export declare const enum YPwmOutput_Enabled {
    FALSE = 0,
    TRUE = 1,
    INVALID = -1
}
export declare const enum YPwmOutput_EnabledAtPowerOn {
    FALSE = 0,
    TRUE = 1,
    INVALID = -1
}
export interface YPwmOutputValueCallback {
    (func: YPwmOutput, value: string): void;
}
/**
 * YPwmOutput Class: PWM generator control interface, available for instance in the Yocto-PWM-Tx
 *
 * The YPwmOutput class allows you to drive a pulse-width modulated output (PWM).
 * You can configure the frequency as well as the duty cycle, and setup progressive
 * transitions.
 */
export declare class YPwmOutput extends YFunction {
    _className: string;
    _enabled: YPwmOutput_Enabled;
    _frequency: number;
    _period: number;
    _dutyCycle: number;
    _pulseDuration: number;
    _pwmTransition: string;
    _enabledAtPowerOn: YPwmOutput_EnabledAtPowerOn;
    _dutyCycleAtPowerOn: number;
    _valueCallbackPwmOutput: YPwmOutputValueCallback | null;
    readonly ENABLED_FALSE: YPwmOutput_Enabled;
    readonly ENABLED_TRUE: YPwmOutput_Enabled;
    readonly ENABLED_INVALID: YPwmOutput_Enabled;
    readonly FREQUENCY_INVALID: number;
    readonly PERIOD_INVALID: number;
    readonly DUTYCYCLE_INVALID: number;
    readonly PULSEDURATION_INVALID: number;
    readonly PWMTRANSITION_INVALID: string;
    readonly ENABLEDATPOWERON_FALSE: YPwmOutput_EnabledAtPowerOn;
    readonly ENABLEDATPOWERON_TRUE: YPwmOutput_EnabledAtPowerOn;
    readonly ENABLEDATPOWERON_INVALID: YPwmOutput_EnabledAtPowerOn;
    readonly DUTYCYCLEATPOWERON_INVALID: number;
    static readonly ENABLED_FALSE: YPwmOutput_Enabled;
    static readonly ENABLED_TRUE: YPwmOutput_Enabled;
    static readonly ENABLED_INVALID: YPwmOutput_Enabled;
    static readonly FREQUENCY_INVALID: number;
    static readonly PERIOD_INVALID: number;
    static readonly DUTYCYCLE_INVALID: number;
    static readonly PULSEDURATION_INVALID: number;
    static readonly PWMTRANSITION_INVALID: string;
    static readonly ENABLEDATPOWERON_FALSE: YPwmOutput_EnabledAtPowerOn;
    static readonly ENABLEDATPOWERON_TRUE: YPwmOutput_EnabledAtPowerOn;
    static readonly ENABLEDATPOWERON_INVALID: YPwmOutput_EnabledAtPowerOn;
    static readonly DUTYCYCLEATPOWERON_INVALID: number;
    constructor(yapi: YAPIContext, func: string);
    imm_parseAttr(name: string, val: any): 0 | 1;
    /**
     * Returns the state of the PWM generators.
     *
     * @return either YPwmOutput.ENABLED_FALSE or YPwmOutput.ENABLED_TRUE, according to the state of the PWM generators
     *
     * On failure, throws an exception or returns YPwmOutput.ENABLED_INVALID.
     */
    get_enabled(): Promise<YPwmOutput_Enabled>;
    /**
     * Stops or starts the PWM.
     *
     * @param newval : either YPwmOutput.ENABLED_FALSE or YPwmOutput.ENABLED_TRUE
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_enabled(newval: YPwmOutput_Enabled): Promise<number>;
    /**
     * Changes the PWM frequency. The duty cycle is kept unchanged thanks to an
     * automatic pulse width change, in other words, the change will not be applied
     * before the end of the current period. This can significantly affect reaction
     * time at low frequencies. If you call the matching module saveToFlash()
     * method, the frequency will be kept after a device power cycle.
     * To stop the PWM signal, do not set the frequency to zero, use the set_enabled()
     * method instead.
     *
     * @param newval : a floating point number corresponding to the PWM frequency
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_frequency(newval: number): Promise<number>;
    /**
     * Returns the PWM frequency in Hz.
     *
     * @return a floating point number corresponding to the PWM frequency in Hz
     *
     * On failure, throws an exception or returns YPwmOutput.FREQUENCY_INVALID.
     */
    get_frequency(): Promise<number>;
    /**
     * Changes the PWM period in milliseconds. Caution: in order to avoid  random truncation of
     * the current pulse, the change will not be applied
     * before the end of the current period. This can significantly affect reaction
     * time at low frequencies. If you call the matching module saveToFlash()
     * method, the frequency will be kept after a device power cycle.
     *
     * @param newval : a floating point number corresponding to the PWM period in milliseconds
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_period(newval: number): Promise<number>;
    /**
     * Returns the PWM period in milliseconds.
     *
     * @return a floating point number corresponding to the PWM period in milliseconds
     *
     * On failure, throws an exception or returns YPwmOutput.PERIOD_INVALID.
     */
    get_period(): Promise<number>;
    /**
     * Changes the PWM duty cycle, in per cents.
     *
     * @param newval : a floating point number corresponding to the PWM duty cycle, in per cents
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_dutyCycle(newval: number): Promise<number>;
    /**
     * Returns the PWM duty cycle, in per cents.
     *
     * @return a floating point number corresponding to the PWM duty cycle, in per cents
     *
     * On failure, throws an exception or returns YPwmOutput.DUTYCYCLE_INVALID.
     */
    get_dutyCycle(): Promise<number>;
    /**
     * Changes the PWM pulse length, in milliseconds. A pulse length cannot be longer than period,
     * otherwise it is truncated.
     *
     * @param newval : a floating point number corresponding to the PWM pulse length, in milliseconds
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_pulseDuration(newval: number): Promise<number>;
    /**
     * Returns the PWM pulse length in milliseconds, as a floating point number.
     *
     * @return a floating point number corresponding to the PWM pulse length in milliseconds, as a
     * floating point number
     *
     * On failure, throws an exception or returns YPwmOutput.PULSEDURATION_INVALID.
     */
    get_pulseDuration(): Promise<number>;
    get_pwmTransition(): Promise<string>;
    set_pwmTransition(newval: string): Promise<number>;
    /**
     * Returns the state of the PWM at device power on.
     *
     * @return either YPwmOutput.ENABLEDATPOWERON_FALSE or YPwmOutput.ENABLEDATPOWERON_TRUE, according to
     * the state of the PWM at device power on
     *
     * On failure, throws an exception or returns YPwmOutput.ENABLEDATPOWERON_INVALID.
     */
    get_enabledAtPowerOn(): Promise<YPwmOutput_EnabledAtPowerOn>;
    /**
     * Changes the state of the PWM at device power on. Remember to call the matching module saveToFlash()
     * method, otherwise this call will have no effect.
     *
     * @param newval : either YPwmOutput.ENABLEDATPOWERON_FALSE or YPwmOutput.ENABLEDATPOWERON_TRUE,
     * according to the state of the PWM at device power on
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_enabledAtPowerOn(newval: YPwmOutput_EnabledAtPowerOn): Promise<number>;
    /**
     * Changes the PWM duty cycle at device power on. Remember to call the matching
     * module saveToFlash() method, otherwise this call will have no effect.
     *
     * @param newval : a floating point number corresponding to the PWM duty cycle at device power on
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_dutyCycleAtPowerOn(newval: number): Promise<number>;
    /**
     * Returns the PWM generators duty cycle at device power on as a floating point number between 0 and 100.
     *
     * @return a floating point number corresponding to the PWM generators duty cycle at device power on
     * as a floating point number between 0 and 100
     *
     * On failure, throws an exception or returns YPwmOutput.DUTYCYCLEATPOWERON_INVALID.
     */
    get_dutyCycleAtPowerOn(): Promise<number>;
    /**
     * Retrieves a PWM generator for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the PWM generator is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YPwmOutput.isOnline() to test if the PWM generator is
     * indeed online at a given time. In case of ambiguity when looking for
     * a PWM generator by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the PWM generator, for instance
     *         YPWMTX01.pwmOutput1.
     *
     * @return a YPwmOutput object allowing you to drive the PWM generator.
     */
    static FindPwmOutput(func: string): YPwmOutput;
    /**
     * Retrieves a PWM generator for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the PWM generator is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YPwmOutput.isOnline() to test if the PWM generator is
     * indeed online at a given time. In case of ambiguity when looking for
     * a PWM generator by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx : a YAPI context
     * @param func : a string that uniquely characterizes the PWM generator, for instance
     *         YPWMTX01.pwmOutput1.
     *
     * @return a YPwmOutput object allowing you to drive the PWM generator.
     */
    static FindPwmOutputInContext(yctx: YAPIContext, func: string): YPwmOutput;
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
    registerValueCallback(callback: YPwmOutputValueCallback | null): Promise<number>;
    _invokeValueCallback(value: string): Promise<number>;
    /**
     * Performs a smooth transition of the pulse duration toward a given value.
     * Any period, frequency, duty cycle or pulse width change will cancel any ongoing transition process.
     *
     * @param ms_target   : new pulse duration at the end of the transition
     *         (floating-point number, representing the pulse duration in milliseconds)
     * @param ms_duration : total duration of the transition, in milliseconds
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    pulseDurationMove(ms_target: number, ms_duration: number): Promise<number>;
    /**
     * Performs a smooth change of the duty cycle toward a given value.
     * Any period, frequency, duty cycle or pulse width change will cancel any ongoing transition process.
     *
     * @param target      : new duty cycle at the end of the transition
     *         (percentage, floating-point number between 0 and 100)
     * @param ms_duration : total duration of the transition, in milliseconds
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    dutyCycleMove(target: number, ms_duration: number): Promise<number>;
    /**
     * Performs a smooth frequency change toward a given value.
     * Any period, frequency, duty cycle or pulse width change will cancel any ongoing transition process.
     *
     * @param target      : new frequency at the end of the transition (floating-point number)
     * @param ms_duration : total duration of the transition, in milliseconds
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    frequencyMove(target: number, ms_duration: number): Promise<number>;
    /**
     * Performs a smooth transition toward a specified value of the phase shift between this channel
     * and the other channel. The phase shift is executed by slightly changing the frequency
     * temporarily during the specified duration. This function only makes sense when both channels
     * are running, either at the same frequency, or at a multiple of the channel frequency.
     * Any period, frequency, duty cycle or pulse width change will cancel any ongoing transition process.
     *
     * @param target      : phase shift at the end of the transition, in milliseconds (floating-point number)
     * @param ms_duration : total duration of the transition, in milliseconds
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    phaseMove(target: number, ms_duration: number): Promise<number>;
    /**
     * Trigger a given number of pulses of specified duration, at current frequency.
     * At the end of the pulse train, revert to the original state of the PWM generator.
     *
     * @param ms_target : desired pulse duration
     *         (floating-point number, representing the pulse duration in milliseconds)
     * @param n_pulses  : desired pulse count
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    triggerPulsesByDuration(ms_target: number, n_pulses: number): Promise<number>;
    /**
     * Trigger a given number of pulses of specified duration, at current frequency.
     * At the end of the pulse train, revert to the original state of the PWM generator.
     *
     * @param target   : desired duty cycle for the generated pulses
     *         (percentage, floating-point number between 0 and 100)
     * @param n_pulses : desired pulse count
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    triggerPulsesByDutyCycle(target: number, n_pulses: number): Promise<number>;
    /**
     * Trigger a given number of pulses at the specified frequency, using current duty cycle.
     * At the end of the pulse train, revert to the original state of the PWM generator.
     *
     * @param target   : desired frequency for the generated pulses (floating-point number)
     * @param n_pulses : desired pulse count
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    triggerPulsesByFrequency(target: number, n_pulses: number): Promise<number>;
    markForRepeat(): Promise<number>;
    repeatFromMark(): Promise<number>;
    /**
     * Continues the enumeration of PWM generators started using yFirstPwmOutput().
     * Caution: You can't make any assumption about the returned PWM generators order.
     * If you want to find a specific a PWM generator, use PwmOutput.findPwmOutput()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YPwmOutput object, corresponding to
     *         a PWM generator currently online, or a null pointer
     *         if there are no more PWM generators to enumerate.
     */
    nextPwmOutput(): YPwmOutput | null;
    /**
     * Starts the enumeration of PWM generators currently accessible.
     * Use the method YPwmOutput.nextPwmOutput() to iterate on
     * next PWM generators.
     *
     * @return a pointer to a YPwmOutput object, corresponding to
     *         the first PWM generator currently online, or a null pointer
     *         if there are none.
     */
    static FirstPwmOutput(): YPwmOutput | null;
    /**
     * Starts the enumeration of PWM generators currently accessible.
     * Use the method YPwmOutput.nextPwmOutput() to iterate on
     * next PWM generators.
     *
     * @param yctx : a YAPI context.
     *
     * @return a pointer to a YPwmOutput object, corresponding to
     *         the first PWM generator currently online, or a null pointer
     *         if there are none.
     */
    static FirstPwmOutputInContext(yctx: YAPIContext): YPwmOutput | null;
}
