/*********************************************************************
 *
 *  $Id: svn_id $
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
import { YAPI, YFunction, YSensor } from './yocto_api.js';
//--- (YPwmInput class start)
/**
 * YPwmInput Class: PWM input control interface, available for instance in the Yocto-PWM-Rx
 *
 * The YPwmInput class allows you to read and configure Yoctopuce PWM inputs.
 * It inherits from YSensor class the core functions to read measures,
 * to register callback functions, and to access the autonomous datalogger.
 * This class adds the ability to configure the signal parameter used to transmit
 * information: the duty cycle, the frequency or the pulse width.
 */
//--- (end of YPwmInput class start)
export class YPwmInput extends YSensor {
    //--- (end of YPwmInput attributes declaration)
    constructor(yapi, func) {
        //--- (YPwmInput constructor)
        super(yapi, func);
        this._dutyCycle = YPwmInput.DUTYCYCLE_INVALID;
        this._pulseDuration = YPwmInput.PULSEDURATION_INVALID;
        this._frequency = YPwmInput.FREQUENCY_INVALID;
        this._period = YPwmInput.PERIOD_INVALID;
        this._pulseCounter = YPwmInput.PULSECOUNTER_INVALID;
        this._pulseTimer = YPwmInput.PULSETIMER_INVALID;
        this._pwmReportMode = YPwmInput.PWMREPORTMODE_INVALID;
        this._debouncePeriod = YPwmInput.DEBOUNCEPERIOD_INVALID;
        this._minFrequency = YPwmInput.MINFREQUENCY_INVALID;
        this._bandwidth = YPwmInput.BANDWIDTH_INVALID;
        this._edgesPerPeriod = YPwmInput.EDGESPERPERIOD_INVALID;
        this._valueCallbackPwmInput = null;
        this._timedReportCallbackPwmInput = null;
        // API symbols as object properties
        this.DUTYCYCLE_INVALID = YAPI.INVALID_DOUBLE;
        this.PULSEDURATION_INVALID = YAPI.INVALID_DOUBLE;
        this.FREQUENCY_INVALID = YAPI.INVALID_DOUBLE;
        this.PERIOD_INVALID = YAPI.INVALID_DOUBLE;
        this.PULSECOUNTER_INVALID = YAPI.INVALID_LONG;
        this.PULSETIMER_INVALID = YAPI.INVALID_LONG;
        this.PWMREPORTMODE_PWM_DUTYCYCLE = 0;
        this.PWMREPORTMODE_PWM_FREQUENCY = 1;
        this.PWMREPORTMODE_PWM_PULSEDURATION = 2;
        this.PWMREPORTMODE_PWM_EDGECOUNT = 3;
        this.PWMREPORTMODE_PWM_PULSECOUNT = 4;
        this.PWMREPORTMODE_PWM_CPS = 5;
        this.PWMREPORTMODE_PWM_CPM = 6;
        this.PWMREPORTMODE_PWM_STATE = 7;
        this.PWMREPORTMODE_PWM_FREQ_CPS = 8;
        this.PWMREPORTMODE_PWM_FREQ_CPM = 9;
        this.PWMREPORTMODE_PWM_PERIODCOUNT = 10;
        this.PWMREPORTMODE_INVALID = -1;
        this.DEBOUNCEPERIOD_INVALID = YAPI.INVALID_UINT;
        this.MINFREQUENCY_INVALID = YAPI.INVALID_DOUBLE;
        this.BANDWIDTH_INVALID = YAPI.INVALID_UINT;
        this.EDGESPERPERIOD_INVALID = YAPI.INVALID_UINT;
        this._className = 'PwmInput';
        //--- (end of YPwmInput constructor)
    }
    //--- (YPwmInput implementation)
    imm_parseAttr(name, val) {
        switch (name) {
            case 'dutyCycle':
                this._dutyCycle = Math.round(val / 65.536) / 1000.0;
                return 1;
            case 'pulseDuration':
                this._pulseDuration = Math.round(val / 65.536) / 1000.0;
                return 1;
            case 'frequency':
                this._frequency = Math.round(val / 65.536) / 1000.0;
                return 1;
            case 'period':
                this._period = Math.round(val / 65.536) / 1000.0;
                return 1;
            case 'pulseCounter':
                this._pulseCounter = val;
                return 1;
            case 'pulseTimer':
                this._pulseTimer = val;
                return 1;
            case 'pwmReportMode':
                this._pwmReportMode = val;
                return 1;
            case 'debouncePeriod':
                this._debouncePeriod = val;
                return 1;
            case 'minFrequency':
                this._minFrequency = Math.round(val / 65.536) / 1000.0;
                return 1;
            case 'bandwidth':
                this._bandwidth = val;
                return 1;
            case 'edgesPerPeriod':
                this._edgesPerPeriod = val;
                return 1;
        }
        return super.imm_parseAttr(name, val);
    }
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
    async set_unit(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('unit', rest_val);
    }
    /**
     * Returns the PWM duty cycle, in per cents.
     *
     * @return a floating point number corresponding to the PWM duty cycle, in per cents
     *
     * On failure, throws an exception or returns YPwmInput.DUTYCYCLE_INVALID.
     */
    async get_dutyCycle() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YPwmInput.DUTYCYCLE_INVALID;
            }
        }
        res = this._dutyCycle;
        return res;
    }
    /**
     * Returns the PWM pulse length in milliseconds, as a floating point number.
     *
     * @return a floating point number corresponding to the PWM pulse length in milliseconds, as a
     * floating point number
     *
     * On failure, throws an exception or returns YPwmInput.PULSEDURATION_INVALID.
     */
    async get_pulseDuration() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YPwmInput.PULSEDURATION_INVALID;
            }
        }
        res = this._pulseDuration;
        return res;
    }
    /**
     * Returns the PWM frequency in Hz.
     *
     * @return a floating point number corresponding to the PWM frequency in Hz
     *
     * On failure, throws an exception or returns YPwmInput.FREQUENCY_INVALID.
     */
    async get_frequency() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YPwmInput.FREQUENCY_INVALID;
            }
        }
        res = this._frequency;
        return res;
    }
    /**
     * Returns the PWM period in milliseconds.
     *
     * @return a floating point number corresponding to the PWM period in milliseconds
     *
     * On failure, throws an exception or returns YPwmInput.PERIOD_INVALID.
     */
    async get_period() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YPwmInput.PERIOD_INVALID;
            }
        }
        res = this._period;
        return res;
    }
    /**
     * Returns the pulse counter value. Actually that
     * counter is incremented twice per period. That counter is
     * limited  to 1 billion.
     *
     * @return an integer corresponding to the pulse counter value
     *
     * On failure, throws an exception or returns YPwmInput.PULSECOUNTER_INVALID.
     */
    async get_pulseCounter() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YPwmInput.PULSECOUNTER_INVALID;
            }
        }
        res = this._pulseCounter;
        return res;
    }
    async set_pulseCounter(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('pulseCounter', rest_val);
    }
    /**
     * Returns the timer of the pulses counter (ms).
     *
     * @return an integer corresponding to the timer of the pulses counter (ms)
     *
     * On failure, throws an exception or returns YPwmInput.PULSETIMER_INVALID.
     */
    async get_pulseTimer() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YPwmInput.PULSETIMER_INVALID;
            }
        }
        res = this._pulseTimer;
        return res;
    }
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
    async get_pwmReportMode() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YPwmInput.PWMREPORTMODE_INVALID;
            }
        }
        res = this._pwmReportMode;
        return res;
    }
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
    async set_pwmReportMode(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('pwmReportMode', rest_val);
    }
    /**
     * Returns the shortest expected pulse duration, in ms. Any shorter pulse will be automatically ignored (debounce).
     *
     * @return an integer corresponding to the shortest expected pulse duration, in ms
     *
     * On failure, throws an exception or returns YPwmInput.DEBOUNCEPERIOD_INVALID.
     */
    async get_debouncePeriod() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YPwmInput.DEBOUNCEPERIOD_INVALID;
            }
        }
        res = this._debouncePeriod;
        return res;
    }
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
    async set_debouncePeriod(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('debouncePeriod', rest_val);
    }
    /**
     * Changes the minimum detected frequency, in Hz. Slower signals will be consider as zero frequency.
     * Remember to call the saveToFlash() method of the module if the modification must be kept.
     *
     * @param newval : a floating point number corresponding to the minimum detected frequency, in Hz
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_minFrequency(newval) {
        let rest_val;
        rest_val = String(Math.round(newval * 65536.0));
        return await this._setAttr('minFrequency', rest_val);
    }
    /**
     * Returns the minimum detected frequency, in Hz. Slower signals will be consider as zero frequency.
     *
     * @return a floating point number corresponding to the minimum detected frequency, in Hz
     *
     * On failure, throws an exception or returns YPwmInput.MINFREQUENCY_INVALID.
     */
    async get_minFrequency() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YPwmInput.MINFREQUENCY_INVALID;
            }
        }
        res = this._minFrequency;
        return res;
    }
    /**
     * Returns the input signal sampling rate, in kHz.
     *
     * @return an integer corresponding to the input signal sampling rate, in kHz
     *
     * On failure, throws an exception or returns YPwmInput.BANDWIDTH_INVALID.
     */
    async get_bandwidth() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YPwmInput.BANDWIDTH_INVALID;
            }
        }
        res = this._bandwidth;
        return res;
    }
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
    async set_bandwidth(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('bandwidth', rest_val);
    }
    /**
     * Returns the number of edges detected per preiod. For a clean PWM signal, this should be exactly two,
     * but in cas the signal is created by a mechanical contact with bounces, it can get higher.
     *
     * @return an integer corresponding to the number of edges detected per preiod
     *
     * On failure, throws an exception or returns YPwmInput.EDGESPERPERIOD_INVALID.
     */
    async get_edgesPerPeriod() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YPwmInput.EDGESPERPERIOD_INVALID;
            }
        }
        res = this._edgesPerPeriod;
        return res;
    }
    /**
     * Retrieves a PWM input for a given identifier.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
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
    static FindPwmInput(func) {
        let obj;
        obj = YFunction._FindFromCache('PwmInput', func);
        if (obj == null) {
            obj = new YPwmInput(YAPI, func);
            YFunction._AddToCache('PwmInput', func, obj);
        }
        return obj;
    }
    /**
     * Retrieves a PWM input for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
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
    static FindPwmInputInContext(yctx, func) {
        let obj;
        obj = YFunction._FindFromCacheInContext(yctx, 'PwmInput', func);
        if (obj == null) {
            obj = new YPwmInput(yctx, func);
            YFunction._AddToCache('PwmInput', func, obj);
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
    async registerValueCallback(callback) {
        let val;
        if (callback != null) {
            await YFunction._UpdateValueCallbackList(this, true);
        }
        else {
            await YFunction._UpdateValueCallbackList(this, false);
        }
        this._valueCallbackPwmInput = callback;
        // Immediately invoke value callback with current value
        if (callback != null && await this.isOnline()) {
            val = this._advertisedValue;
            if (!(val == '')) {
                await this._invokeValueCallback(val);
            }
        }
        return 0;
    }
    async _invokeValueCallback(value) {
        if (this._valueCallbackPwmInput != null) {
            try {
                await this._valueCallbackPwmInput(this, value);
            }
            catch (e) {
                this._yapi.imm_log('Exception in valueCallback:', e);
            }
        }
        else {
            await super._invokeValueCallback(value);
        }
        return 0;
    }
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
    async registerTimedReportCallback(callback) {
        let sensor;
        sensor = this;
        if (callback != null) {
            await YFunction._UpdateTimedReportCallbackList(sensor, true);
        }
        else {
            await YFunction._UpdateTimedReportCallbackList(sensor, false);
        }
        this._timedReportCallbackPwmInput = callback;
        return 0;
    }
    async _invokeTimedReportCallback(value) {
        if (this._timedReportCallbackPwmInput != null) {
            try {
                await this._timedReportCallbackPwmInput(this, value);
            }
            catch (e) {
                this._yapi.imm_log('Exception in timedReportCallback:', e);
            }
        }
        else {
            await super._invokeTimedReportCallback(value);
        }
        return 0;
    }
    /**
     * Resets the periodicity detection algorithm.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async resetPeriodDetection() {
        return await this.set_bandwidth(await this.get_bandwidth());
    }
    /**
     * Resets the pulse counter value as well as its timer.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async resetCounter() {
        return await this.set_pulseCounter(0);
    }
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
    nextPwmInput() {
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != YAPI.SUCCESS)
            return null;
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if (next_hwid == null)
            return null;
        return YPwmInput.FindPwmInputInContext(this._yapi, next_hwid);
    }
    /**
     * Starts the enumeration of PWM inputs currently accessible.
     * Use the method YPwmInput.nextPwmInput() to iterate on
     * next PWM inputs.
     *
     * @return a pointer to a YPwmInput object, corresponding to
     *         the first PWM input currently online, or a null pointer
     *         if there are none.
     */
    static FirstPwmInput() {
        let next_hwid = YAPI.imm_getFirstHardwareId('PwmInput');
        if (next_hwid == null)
            return null;
        return YPwmInput.FindPwmInput(next_hwid);
    }
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
    static FirstPwmInputInContext(yctx) {
        let next_hwid = yctx.imm_getFirstHardwareId('PwmInput');
        if (next_hwid == null)
            return null;
        return YPwmInput.FindPwmInputInContext(yctx, next_hwid);
    }
}
// API symbols as static members
YPwmInput.DUTYCYCLE_INVALID = YAPI.INVALID_DOUBLE;
YPwmInput.PULSEDURATION_INVALID = YAPI.INVALID_DOUBLE;
YPwmInput.FREQUENCY_INVALID = YAPI.INVALID_DOUBLE;
YPwmInput.PERIOD_INVALID = YAPI.INVALID_DOUBLE;
YPwmInput.PULSECOUNTER_INVALID = YAPI.INVALID_LONG;
YPwmInput.PULSETIMER_INVALID = YAPI.INVALID_LONG;
YPwmInput.PWMREPORTMODE_PWM_DUTYCYCLE = 0;
YPwmInput.PWMREPORTMODE_PWM_FREQUENCY = 1;
YPwmInput.PWMREPORTMODE_PWM_PULSEDURATION = 2;
YPwmInput.PWMREPORTMODE_PWM_EDGECOUNT = 3;
YPwmInput.PWMREPORTMODE_PWM_PULSECOUNT = 4;
YPwmInput.PWMREPORTMODE_PWM_CPS = 5;
YPwmInput.PWMREPORTMODE_PWM_CPM = 6;
YPwmInput.PWMREPORTMODE_PWM_STATE = 7;
YPwmInput.PWMREPORTMODE_PWM_FREQ_CPS = 8;
YPwmInput.PWMREPORTMODE_PWM_FREQ_CPM = 9;
YPwmInput.PWMREPORTMODE_PWM_PERIODCOUNT = 10;
YPwmInput.PWMREPORTMODE_INVALID = -1;
YPwmInput.DEBOUNCEPERIOD_INVALID = YAPI.INVALID_UINT;
YPwmInput.MINFREQUENCY_INVALID = YAPI.INVALID_DOUBLE;
YPwmInput.BANDWIDTH_INVALID = YAPI.INVALID_UINT;
YPwmInput.EDGESPERPERIOD_INVALID = YAPI.INVALID_UINT;
//# sourceMappingURL=yocto_pwminput.js.map