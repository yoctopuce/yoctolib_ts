/*********************************************************************
 *
 *  $Id: yocto_pwmoutput.ts 54279 2023-04-28 10:11:03Z seb $
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

import { YAPI, YAPIContext, YErrorMsg, YFunction, YModule, YSensor, YDataLogger, YMeasure } from './yocto_api.js';

//--- (YPwmOutput class start)
/**
 * YPwmOutput Class: PWM generator control interface, available for instance in the Yocto-PWM-Tx
 *
 * The YPwmOutput class allows you to drive a pulse-width modulated output (PWM).
 * You can configure the frequency as well as the duty cycle, and setup progressive
 * transitions.
 */
//--- (end of YPwmOutput class start)

export class YPwmOutput extends YFunction
{
    //--- (YPwmOutput attributes declaration)
    _className: string;
    _enabled: YPwmOutput.ENABLED = YPwmOutput.ENABLED_INVALID;
    _frequency: number = YPwmOutput.FREQUENCY_INVALID;
    _period: number = YPwmOutput.PERIOD_INVALID;
    _dutyCycle: number = YPwmOutput.DUTYCYCLE_INVALID;
    _pulseDuration: number = YPwmOutput.PULSEDURATION_INVALID;
    _pwmTransition: string = YPwmOutput.PWMTRANSITION_INVALID;
    _enabledAtPowerOn: YPwmOutput.ENABLEDATPOWERON = YPwmOutput.ENABLEDATPOWERON_INVALID;
    _dutyCycleAtPowerOn: number = YPwmOutput.DUTYCYCLEATPOWERON_INVALID;
    _valueCallbackPwmOutput: YPwmOutput.ValueCallback | null = null;

    // API symbols as object properties
    public readonly ENABLED_FALSE: YPwmOutput.ENABLED = 0;
    public readonly ENABLED_TRUE: YPwmOutput.ENABLED = 1;
    public readonly ENABLED_INVALID: YPwmOutput.ENABLED = -1;
    public readonly FREQUENCY_INVALID: number = YAPI.INVALID_DOUBLE;
    public readonly PERIOD_INVALID: number = YAPI.INVALID_DOUBLE;
    public readonly DUTYCYCLE_INVALID: number = YAPI.INVALID_DOUBLE;
    public readonly PULSEDURATION_INVALID: number = YAPI.INVALID_DOUBLE;
    public readonly PWMTRANSITION_INVALID: string = YAPI.INVALID_STRING;
    public readonly ENABLEDATPOWERON_FALSE: YPwmOutput.ENABLEDATPOWERON = 0;
    public readonly ENABLEDATPOWERON_TRUE: YPwmOutput.ENABLEDATPOWERON = 1;
    public readonly ENABLEDATPOWERON_INVALID: YPwmOutput.ENABLEDATPOWERON = -1;
    public readonly DUTYCYCLEATPOWERON_INVALID: number = YAPI.INVALID_DOUBLE;

    // API symbols as static members
    public static readonly ENABLED_FALSE: YPwmOutput.ENABLED = 0;
    public static readonly ENABLED_TRUE: YPwmOutput.ENABLED = 1;
    public static readonly ENABLED_INVALID: YPwmOutput.ENABLED = -1;
    public static readonly FREQUENCY_INVALID: number = YAPI.INVALID_DOUBLE;
    public static readonly PERIOD_INVALID: number = YAPI.INVALID_DOUBLE;
    public static readonly DUTYCYCLE_INVALID: number = YAPI.INVALID_DOUBLE;
    public static readonly PULSEDURATION_INVALID: number = YAPI.INVALID_DOUBLE;
    public static readonly PWMTRANSITION_INVALID: string = YAPI.INVALID_STRING;
    public static readonly ENABLEDATPOWERON_FALSE: YPwmOutput.ENABLEDATPOWERON = 0;
    public static readonly ENABLEDATPOWERON_TRUE: YPwmOutput.ENABLEDATPOWERON = 1;
    public static readonly ENABLEDATPOWERON_INVALID: YPwmOutput.ENABLEDATPOWERON = -1;
    public static readonly DUTYCYCLEATPOWERON_INVALID: number = YAPI.INVALID_DOUBLE;
    //--- (end of YPwmOutput attributes declaration)

    constructor(yapi: YAPIContext, func: string)
    {
        //--- (YPwmOutput constructor)
        super(yapi, func);
        this._className                  = 'PwmOutput';
        //--- (end of YPwmOutput constructor)
    }

    //--- (YPwmOutput implementation)

    imm_parseAttr(name: string, val: any)
    {
        switch (name) {
        case 'enabled':
            this._enabled = <YPwmOutput.ENABLED> <number> val;
            return 1;
        case 'frequency':
            this._frequency = <number> Math.round(<number>val / 65.536) / 1000.0;
            return 1;
        case 'period':
            this._period = <number> Math.round(<number>val / 65.536) / 1000.0;
            return 1;
        case 'dutyCycle':
            this._dutyCycle = <number> Math.round(<number>val / 65.536) / 1000.0;
            return 1;
        case 'pulseDuration':
            this._pulseDuration = <number> Math.round(<number>val / 65.536) / 1000.0;
            return 1;
        case 'pwmTransition':
            this._pwmTransition = <string> <string> val;
            return 1;
        case 'enabledAtPowerOn':
            this._enabledAtPowerOn = <YPwmOutput.ENABLEDATPOWERON> <number> val;
            return 1;
        case 'dutyCycleAtPowerOn':
            this._dutyCycleAtPowerOn = <number> Math.round(<number>val / 65.536) / 1000.0;
            return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Returns the state of the PWM generators.
     *
     * @return either YPwmOutput.ENABLED_FALSE or YPwmOutput.ENABLED_TRUE, according to the state of the PWM generators
     *
     * On failure, throws an exception or returns YPwmOutput.ENABLED_INVALID.
     */
    async get_enabled(): Promise<YPwmOutput.ENABLED>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YPwmOutput.ENABLED_INVALID;
            }
        }
        res = this._enabled;
        return res;
    }

    /**
     * Stops or starts the PWM.
     *
     * @param newval : either YPwmOutput.ENABLED_FALSE or YPwmOutput.ENABLED_TRUE
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_enabled(newval: YPwmOutput.ENABLED): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('enabled', rest_val);
    }

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
    async set_frequency(newval: number): Promise<number>
    {
        let rest_val: string;
        rest_val = String(Math.round(newval * 65536.0));
        return await this._setAttr('frequency', rest_val);
    }

    /**
     * Returns the PWM frequency in Hz.
     *
     * @return a floating point number corresponding to the PWM frequency in Hz
     *
     * On failure, throws an exception or returns YPwmOutput.FREQUENCY_INVALID.
     */
    async get_frequency(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YPwmOutput.FREQUENCY_INVALID;
            }
        }
        res = this._frequency;
        return res;
    }

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
    async set_period(newval: number): Promise<number>
    {
        let rest_val: string;
        rest_val = String(Math.round(newval * 65536.0));
        return await this._setAttr('period', rest_val);
    }

    /**
     * Returns the PWM period in milliseconds.
     *
     * @return a floating point number corresponding to the PWM period in milliseconds
     *
     * On failure, throws an exception or returns YPwmOutput.PERIOD_INVALID.
     */
    async get_period(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YPwmOutput.PERIOD_INVALID;
            }
        }
        res = this._period;
        return res;
    }

    /**
     * Changes the PWM duty cycle, in per cents.
     *
     * @param newval : a floating point number corresponding to the PWM duty cycle, in per cents
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_dutyCycle(newval: number): Promise<number>
    {
        let rest_val: string;
        rest_val = String(Math.round(newval * 65536.0));
        return await this._setAttr('dutyCycle', rest_val);
    }

    /**
     * Returns the PWM duty cycle, in per cents.
     *
     * @return a floating point number corresponding to the PWM duty cycle, in per cents
     *
     * On failure, throws an exception or returns YPwmOutput.DUTYCYCLE_INVALID.
     */
    async get_dutyCycle(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YPwmOutput.DUTYCYCLE_INVALID;
            }
        }
        res = this._dutyCycle;
        return res;
    }

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
    async set_pulseDuration(newval: number): Promise<number>
    {
        let rest_val: string;
        rest_val = String(Math.round(newval * 65536.0));
        return await this._setAttr('pulseDuration', rest_val);
    }

    /**
     * Returns the PWM pulse length in milliseconds, as a floating point number.
     *
     * @return a floating point number corresponding to the PWM pulse length in milliseconds, as a
     * floating point number
     *
     * On failure, throws an exception or returns YPwmOutput.PULSEDURATION_INVALID.
     */
    async get_pulseDuration(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YPwmOutput.PULSEDURATION_INVALID;
            }
        }
        res = this._pulseDuration;
        return res;
    }

    async get_pwmTransition(): Promise<string>
    {
        let res: string;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YPwmOutput.PWMTRANSITION_INVALID;
            }
        }
        res = this._pwmTransition;
        return res;
    }

    async set_pwmTransition(newval: string): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('pwmTransition', rest_val);
    }

    /**
     * Returns the state of the PWM at device power on.
     *
     * @return either YPwmOutput.ENABLEDATPOWERON_FALSE or YPwmOutput.ENABLEDATPOWERON_TRUE, according to
     * the state of the PWM at device power on
     *
     * On failure, throws an exception or returns YPwmOutput.ENABLEDATPOWERON_INVALID.
     */
    async get_enabledAtPowerOn(): Promise<YPwmOutput.ENABLEDATPOWERON>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YPwmOutput.ENABLEDATPOWERON_INVALID;
            }
        }
        res = this._enabledAtPowerOn;
        return res;
    }

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
    async set_enabledAtPowerOn(newval: YPwmOutput.ENABLEDATPOWERON): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('enabledAtPowerOn', rest_val);
    }

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
    async set_dutyCycleAtPowerOn(newval: number): Promise<number>
    {
        let rest_val: string;
        rest_val = String(Math.round(newval * 65536.0));
        return await this._setAttr('dutyCycleAtPowerOn', rest_val);
    }

    /**
     * Returns the PWM generators duty cycle at device power on as a floating point number between 0 and 100.
     *
     * @return a floating point number corresponding to the PWM generators duty cycle at device power on
     * as a floating point number between 0 and 100
     *
     * On failure, throws an exception or returns YPwmOutput.DUTYCYCLEATPOWERON_INVALID.
     */
    async get_dutyCycleAtPowerOn(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YPwmOutput.DUTYCYCLEATPOWERON_INVALID;
            }
        }
        res = this._dutyCycleAtPowerOn;
        return res;
    }

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
    static FindPwmOutput(func: string): YPwmOutput
    {
        let obj: YPwmOutput | null;
        obj = <YPwmOutput> YFunction._FindFromCache('PwmOutput', func);
        if (obj == null) {
            obj = new YPwmOutput(YAPI, func);
            YFunction._AddToCache('PwmOutput',  func, obj);
        }
        return obj;
    }

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
    static FindPwmOutputInContext(yctx: YAPIContext, func: string): YPwmOutput
    {
        let obj: YPwmOutput | null;
        obj = <YPwmOutput> YFunction._FindFromCacheInContext(yctx,  'PwmOutput', func);
        if (obj == null) {
            obj = new YPwmOutput(yctx, func);
            YFunction._AddToCache('PwmOutput',  func, obj);
        }
        return obj;
    }

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
    async registerValueCallback(callback: YPwmOutput.ValueCallback | null): Promise<number>
    {
        let val: string;
        if (callback != null) {
            await YFunction._UpdateValueCallbackList(this, true);
        } else {
            await YFunction._UpdateValueCallbackList(this, false);
        }
        this._valueCallbackPwmOutput = callback;
        // Immediately invoke value callback with current value
        if (callback != null && await this.isOnline()) {
            val = this._advertisedValue;
            if (!(val == '')) {
                await this._invokeValueCallback(val);
            }
        }
        return 0;
    }

    async _invokeValueCallback(value: string): Promise<number>
    {
        if (this._valueCallbackPwmOutput != null) {
            try {
                await this._valueCallbackPwmOutput(this, value);
            } catch (e) {
                this._yapi.imm_log('Exception in valueCallback:', e);
            }
        } else {
            super._invokeValueCallback(value);
        }
        return 0;
    }

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
    async pulseDurationMove(ms_target: number, ms_duration: number): Promise<number>
    {
        let newval: string;
        if (ms_target < 0.0) {
            ms_target = 0.0;
        }
        newval = String(Math.round(<number> Math.round(ms_target*65536))) + 'ms:' + String(Math.round(ms_duration));
        return await this.set_pwmTransition(newval);
    }

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
    async dutyCycleMove(target: number, ms_duration: number): Promise<number>
    {
        let newval: string;
        if (target < 0.0) {
            target = 0.0;
        }
        if (target > 100.0) {
            target = 100.0;
        }
        newval = String(Math.round(<number> Math.round(target*65536))) + ':' + String(Math.round(ms_duration));
        return await this.set_pwmTransition(newval);
    }

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
    async frequencyMove(target: number, ms_duration: number): Promise<number>
    {
        let newval: string;
        if (target < 0.001) {
            target = 0.001;
        }
        newval = String(Math.round(target * 1000) / 1000) + 'Hz:' + String(Math.round(ms_duration));
        return await this.set_pwmTransition(newval);
    }

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
    async phaseMove(target: number, ms_duration: number): Promise<number>
    {
        let newval: string;
        newval = String(Math.round(target * 1000) / 1000) + 'ps:' + String(Math.round(ms_duration));
        return await this.set_pwmTransition(newval);
    }

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
    async triggerPulsesByDuration(ms_target: number, n_pulses: number): Promise<number>
    {
        let newval: string;
        if (ms_target < 0.0) {
            ms_target = 0.0;
        }
        newval = String(Math.round(<number> Math.round(ms_target*65536))) + 'ms*' + String(Math.round(n_pulses));
        return await this.set_pwmTransition(newval);
    }

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
    async triggerPulsesByDutyCycle(target: number, n_pulses: number): Promise<number>
    {
        let newval: string;
        if (target < 0.0) {
            target = 0.0;
        }
        if (target > 100.0) {
            target = 100.0;
        }
        newval = String(Math.round(<number> Math.round(target*65536))) + '*' + String(Math.round(n_pulses));
        return await this.set_pwmTransition(newval);
    }

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
    async triggerPulsesByFrequency(target: number, n_pulses: number): Promise<number>
    {
        let newval: string;
        if (target < 0.001) {
            target = 0.001;
        }
        newval = String(Math.round(target * 1000) / 1000) + 'Hz*' + String(Math.round(n_pulses));
        return await this.set_pwmTransition(newval);
    }

    async markForRepeat(): Promise<number>
    {
        return await this.set_pwmTransition(':');
    }

    async repeatFromMark(): Promise<number>
    {
        return await this.set_pwmTransition('R');
    }

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
    nextPwmOutput(): YPwmOutput | null
    {
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != YAPI.SUCCESS) return null;
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, <string> resolve.result);
        if (next_hwid == null) return null;
        return YPwmOutput.FindPwmOutputInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of PWM generators currently accessible.
     * Use the method YPwmOutput.nextPwmOutput() to iterate on
     * next PWM generators.
     *
     * @return a pointer to a YPwmOutput object, corresponding to
     *         the first PWM generator currently online, or a null pointer
     *         if there are none.
     */
    static FirstPwmOutput(): YPwmOutput | null
    {
        let next_hwid = YAPI.imm_getFirstHardwareId('PwmOutput');
        if (next_hwid == null) return null;
        return YPwmOutput.FindPwmOutput(next_hwid);
    }

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
    static FirstPwmOutputInContext(yctx: YAPIContext): YPwmOutput | null
    {
        let next_hwid = yctx.imm_getFirstHardwareId('PwmOutput');
        if (next_hwid == null) return null;
        return YPwmOutput.FindPwmOutputInContext(yctx, next_hwid);
    }

    //--- (end of YPwmOutput implementation)
}

export namespace YPwmOutput {
    //--- (YPwmOutput definitions)
    export const enum ENABLED
    {
        FALSE = 0,
        TRUE = 1,
        INVALID = -1
    }

    export const enum ENABLEDATPOWERON
    {
        FALSE = 0,
        TRUE = 1,
        INVALID = -1
    }

    export interface ValueCallback {(func: YPwmOutput, value: string): void}

    //--- (end of YPwmOutput definitions)
}

