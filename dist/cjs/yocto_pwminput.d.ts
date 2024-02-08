/*********************************************************************
 *
 *  $Id: yocto_pwminput.ts 55359 2023-06-28 09:25:04Z seb $
 *
 *  Implements the high-level API for PwmInput functions
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
 * YPwmInput Class: PWM input control interface, available for instance in the Yocto-PWM-Rx
 *
 * The YPwmInput class allows you to read and configure Yoctopuce PWM inputs.
 * It inherits from YSensor class the core functions to read measurements,
 * to register callback functions, and to access the autonomous datalogger.
 * This class adds the ability to configure the signal parameter used to transmit
 * information: the duty cycle, the frequency or the pulse width.
 */
export declare class YPwmInput extends YSensor {
    _className: string;
    _dutyCycle: number;
    _pulseDuration: number;
    _frequency: number;
    _period: number;
    _pulseCounter: number;
    _pulseTimer: number;
    _pwmReportMode: YPwmInput.PWMREPORTMODE;
    _debouncePeriod: number;
    _bandwidth: number;
    _edgesPerPeriod: number;
    _valueCallbackPwmInput: YPwmInput.ValueCallback | null;
    _timedReportCallbackPwmInput: YPwmInput.TimedReportCallback | null;
    readonly DUTYCYCLE_INVALID: number;
    readonly PULSEDURATION_INVALID: number;
    readonly FREQUENCY_INVALID: number;
    readonly PERIOD_INVALID: number;
    readonly PULSECOUNTER_INVALID: number;
    readonly PULSETIMER_INVALID: number;
    readonly PWMREPORTMODE_PWM_DUTYCYCLE: YPwmInput.PWMREPORTMODE;
    readonly PWMREPORTMODE_PWM_FREQUENCY: YPwmInput.PWMREPORTMODE;
    readonly PWMREPORTMODE_PWM_PULSEDURATION: YPwmInput.PWMREPORTMODE;
    readonly PWMREPORTMODE_PWM_EDGECOUNT: YPwmInput.PWMREPORTMODE;
    readonly PWMREPORTMODE_PWM_PULSECOUNT: YPwmInput.PWMREPORTMODE;
    readonly PWMREPORTMODE_PWM_CPS: YPwmInput.PWMREPORTMODE;
    readonly PWMREPORTMODE_PWM_CPM: YPwmInput.PWMREPORTMODE;
    readonly PWMREPORTMODE_PWM_STATE: YPwmInput.PWMREPORTMODE;
    readonly PWMREPORTMODE_PWM_FREQ_CPS: YPwmInput.PWMREPORTMODE;
    readonly PWMREPORTMODE_PWM_FREQ_CPM: YPwmInput.PWMREPORTMODE;
    readonly PWMREPORTMODE_PWM_PERIODCOUNT: YPwmInput.PWMREPORTMODE;
    readonly PWMREPORTMODE_INVALID: YPwmInput.PWMREPORTMODE;
    readonly DEBOUNCEPERIOD_INVALID: number;
    readonly BANDWIDTH_INVALID: number;
    readonly EDGESPERPERIOD_INVALID: number;
    static readonly DUTYCYCLE_INVALID: number;
    static readonly PULSEDURATION_INVALID: number;
    static readonly FREQUENCY_INVALID: number;
    static readonly PERIOD_INVALID: number;
    static readonly PULSECOUNTER_INVALID: number;
    static readonly PULSETIMER_INVALID: number;
    static readonly PWMREPORTMODE_PWM_DUTYCYCLE: YPwmInput.PWMREPORTMODE;
    static readonly PWMREPORTMODE_PWM_FREQUENCY: YPwmInput.PWMREPORTMODE;
    static readonly PWMREPORTMODE_PWM_PULSEDURATION: YPwmInput.PWMREPORTMODE;
    static readonly PWMREPORTMODE_PWM_EDGECOUNT: YPwmInput.PWMREPORTMODE;
    static readonly PWMREPORTMODE_PWM_PULSECOUNT: YPwmInput.PWMREPORTMODE;
    static readonly PWMREPORTMODE_PWM_CPS: YPwmInput.PWMREPORTMODE;
    static readonly PWMREPORTMODE_PWM_CPM: YPwmInput.PWMREPORTMODE;
    static readonly PWMREPORTMODE_PWM_STATE: YPwmInput.PWMREPORTMODE;
    static readonly PWMREPORTMODE_PWM_FREQ_CPS: YPwmInput.PWMREPORTMODE;
    static readonly PWMREPORTMODE_PWM_FREQ_CPM: YPwmInput.PWMREPORTMODE;
    static readonly PWMREPORTMODE_PWM_PERIODCOUNT: YPwmInput.PWMREPORTMODE;
    static readonly PWMREPORTMODE_INVALID: YPwmInput.PWMREPORTMODE;
    static readonly DEBOUNCEPERIOD_INVALID: number;
    static readonly BANDWIDTH_INVALID: number;
    static readonly EDGESPERPERIOD_INVALID: number;
    constructor(yapi: YAPIContext, func: string);
    imm_parseAttr(name: string, val: any): number;
    /**
     * Changes the measuring unit for the measured quantity. That unit
     * is just a string which is automatically initialized each time
     * the measurement mode is changed. But is can be set to an
     * arbitrary value.
     * Remember to call the saveToFlash() method of the module if the modification must be kept.
     *
     * @param newval : a string corresponding to the measuring unit for the measured quantity
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_unit(newval: string): Promise<number>;
    /**
     * Returns the PWM duty cycle, in per cents.
     *
     * @return a floating point number corresponding to the PWM duty cycle, in per cents
     *
     * On failure, throws an exception or returns YPwmInput.DUTYCYCLE_INVALID.
     */
    get_dutyCycle(): Promise<number>;
    /**
     * Returns the PWM pulse length in milliseconds, as a floating point number.
     *
     * @return a floating point number corresponding to the PWM pulse length in milliseconds, as a
     * floating point number
     *
     * On failure, throws an exception or returns YPwmInput.PULSEDURATION_INVALID.
     */
    get_pulseDuration(): Promise<number>;
    /**
     * Returns the PWM frequency in Hz.
     *
     * @return a floating point number corresponding to the PWM frequency in Hz
     *
     * On failure, throws an exception or returns YPwmInput.FREQUENCY_INVALID.
     */
    get_frequency(): Promise<number>;
    /**
     * Returns the PWM period in milliseconds.
     *
     * @return a floating point number corresponding to the PWM period in milliseconds
     *
     * On failure, throws an exception or returns YPwmInput.PERIOD_INVALID.
     */
    get_period(): Promise<number>;
    /**
     * Returns the pulse counter value. Actually that
     * counter is incremented twice per period. That counter is
     * limited  to 1 billion.
     *
     * @return an integer corresponding to the pulse counter value
     *
     * On failure, throws an exception or returns YPwmInput.PULSECOUNTER_INVALID.
     */
    get_pulseCounter(): Promise<number>;
    set_pulseCounter(newval: number): Promise<number>;
    /**
     * Returns the timer of the pulses counter (ms).
     *
     * @return an integer corresponding to the timer of the pulses counter (ms)
     *
     * On failure, throws an exception or returns YPwmInput.PULSETIMER_INVALID.
     */
    get_pulseTimer(): Promise<number>;
    /**
     * Returns the parameter (frequency/duty cycle, pulse width, edges count) returned by the
     * get_currentValue function and callbacks. Attention
     *
     * @return a value among YPwmInput.PWMREPORTMODE_PWM_DUTYCYCLE, YPwmInput.PWMREPORTMODE_PWM_FREQUENCY,
     * YPwmInput.PWMREPORTMODE_PWM_PULSEDURATION, YPwmInput.PWMREPORTMODE_PWM_EDGECOUNT,
     * YPwmInput.PWMREPORTMODE_PWM_PULSECOUNT, YPwmInput.PWMREPORTMODE_PWM_CPS,
     * YPwmInput.PWMREPORTMODE_PWM_CPM, YPwmInput.PWMREPORTMODE_PWM_STATE,
     * YPwmInput.PWMREPORTMODE_PWM_FREQ_CPS, YPwmInput.PWMREPORTMODE_PWM_FREQ_CPM and
     * YPwmInput.PWMREPORTMODE_PWM_PERIODCOUNT corresponding to the parameter (frequency/duty cycle, pulse
     * width, edges count) returned by the get_currentValue function and callbacks
     *
     * On failure, throws an exception or returns YPwmInput.PWMREPORTMODE_INVALID.
     */
    get_pwmReportMode(): Promise<YPwmInput.PWMREPORTMODE>;
    /**
     * Changes the  parameter  type (frequency/duty cycle, pulse width, or edge count) returned by the
     * get_currentValue function and callbacks.
     * The edge count value is limited to the 6 lowest digits. For values greater than one million, use
     * get_pulseCounter().
     * Remember to call the saveToFlash() method of the module if the modification must be kept.
     *
     * @param newval : a value among YPwmInput.PWMREPORTMODE_PWM_DUTYCYCLE,
     * YPwmInput.PWMREPORTMODE_PWM_FREQUENCY, YPwmInput.PWMREPORTMODE_PWM_PULSEDURATION,
     * YPwmInput.PWMREPORTMODE_PWM_EDGECOUNT, YPwmInput.PWMREPORTMODE_PWM_PULSECOUNT,
     * YPwmInput.PWMREPORTMODE_PWM_CPS, YPwmInput.PWMREPORTMODE_PWM_CPM,
     * YPwmInput.PWMREPORTMODE_PWM_STATE, YPwmInput.PWMREPORTMODE_PWM_FREQ_CPS,
     * YPwmInput.PWMREPORTMODE_PWM_FREQ_CPM and YPwmInput.PWMREPORTMODE_PWM_PERIODCOUNT corresponding to
     * the  parameter  type (frequency/duty cycle, pulse width, or edge count) returned by the
     * get_currentValue function and callbacks
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_pwmReportMode(newval: YPwmInput.PWMREPORTMODE): Promise<number>;
    /**
     * Returns the shortest expected pulse duration, in ms. Any shorter pulse will be automatically ignored (debounce).
     *
     * @return an integer corresponding to the shortest expected pulse duration, in ms
     *
     * On failure, throws an exception or returns YPwmInput.DEBOUNCEPERIOD_INVALID.
     */
    get_debouncePeriod(): Promise<number>;
    /**
     * Changes the shortest expected pulse duration, in ms. Any shorter pulse will be automatically ignored (debounce).
     * Remember to call the saveToFlash() method of the module if the modification must be kept.
     *
     * @param newval : an integer corresponding to the shortest expected pulse duration, in ms
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_debouncePeriod(newval: number): Promise<number>;
    /**
     * Returns the input signal sampling rate, in kHz.
     *
     * @return an integer corresponding to the input signal sampling rate, in kHz
     *
     * On failure, throws an exception or returns YPwmInput.BANDWIDTH_INVALID.
     */
    get_bandwidth(): Promise<number>;
    /**
     * Changes the input signal sampling rate, measured in kHz.
     * A lower sampling frequency can be used to hide hide-frequency bounce effects,
     * for instance on electromechanical contacts, but limits the measure resolution.
     * Remember to call the saveToFlash()
     * method of the module if the modification must be kept.
     *
     * @param newval : an integer corresponding to the input signal sampling rate, measured in kHz
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_bandwidth(newval: number): Promise<number>;
    /**
     * Returns the number of edges detected per preiod. For a clean PWM signal, this should be exactly two,
     * but in cas the signal is created by a mechanical contact with bounces, it can get higher.
     *
     * @return an integer corresponding to the number of edges detected per preiod
     *
     * On failure, throws an exception or returns YPwmInput.EDGESPERPERIOD_INVALID.
     */
    get_edgesPerPeriod(): Promise<number>;
    /**
     * Retrieves a PWM input for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the PWM input is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YPwmInput.isOnline() to test if the PWM input is
     * indeed online at a given time. In case of ambiguity when looking for
     * a PWM input by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the PWM input, for instance
     *         YPWMRX01.pwmInput1.
     *
     * @return a YPwmInput object allowing you to drive the PWM input.
     */
    static FindPwmInput(func: string): YPwmInput;
    /**
     * Retrieves a PWM input for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the PWM input is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YPwmInput.isOnline() to test if the PWM input is
     * indeed online at a given time. In case of ambiguity when looking for
     * a PWM input by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx : a YAPI context
     * @param func : a string that uniquely characterizes the PWM input, for instance
     *         YPWMRX01.pwmInput1.
     *
     * @return a YPwmInput object allowing you to drive the PWM input.
     */
    static FindPwmInputInContext(yctx: YAPIContext, func: string): YPwmInput;
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
    registerValueCallback(callback: YPwmInput.ValueCallback | null): Promise<number>;
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
    registerTimedReportCallback(callback: YPwmInput.TimedReportCallback | null): Promise<number>;
    _invokeTimedReportCallback(value: YMeasure): Promise<number>;
    /**
     * Returns the pulse counter value as well as its timer.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    resetCounter(): Promise<number>;
    /**
     * Continues the enumeration of PWM inputs started using yFirstPwmInput().
     * Caution: You can't make any assumption about the returned PWM inputs order.
     * If you want to find a specific a PWM input, use PwmInput.findPwmInput()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YPwmInput object, corresponding to
     *         a PWM input currently online, or a null pointer
     *         if there are no more PWM inputs to enumerate.
     */
    nextPwmInput(): YPwmInput | null;
    /**
     * Starts the enumeration of PWM inputs currently accessible.
     * Use the method YPwmInput.nextPwmInput() to iterate on
     * next PWM inputs.
     *
     * @return a pointer to a YPwmInput object, corresponding to
     *         the first PWM input currently online, or a null pointer
     *         if there are none.
     */
    static FirstPwmInput(): YPwmInput | null;
    /**
     * Starts the enumeration of PWM inputs currently accessible.
     * Use the method YPwmInput.nextPwmInput() to iterate on
     * next PWM inputs.
     *
     * @param yctx : a YAPI context.
     *
     * @return a pointer to a YPwmInput object, corresponding to
     *         the first PWM input currently online, or a null pointer
     *         if there are none.
     */
    static FirstPwmInputInContext(yctx: YAPIContext): YPwmInput | null;
}
export declare namespace YPwmInput {
    const enum PWMREPORTMODE {
        PWM_DUTYCYCLE = 0,
        PWM_FREQUENCY = 1,
        PWM_PULSEDURATION = 2,
        PWM_EDGECOUNT = 3,
        PWM_PULSECOUNT = 4,
        PWM_CPS = 5,
        PWM_CPM = 6,
        PWM_STATE = 7,
        PWM_FREQ_CPS = 8,
        PWM_FREQ_CPM = 9,
        PWM_PERIODCOUNT = 10,
        INVALID = -1
    }
    interface ValueCallback {
        (func: YPwmInput, value: string): void;
    }
    interface TimedReportCallback {
        (func: YPwmInput, measure: YMeasure): void;
    }
}
