"use strict";
/*********************************************************************
 *
 *  $Id: yocto_watchdog.ts 59977 2024-03-18 15:02:32Z mvuilleu $
 *
 *  Implements the high-level API for Watchdog functions
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.YWatchdog = void 0;
const yocto_api_js_1 = require("./yocto_api.js");
//--- (YWatchdog class start)
/**
 * YWatchdog Class: watchdog control interface, available for instance in the Yocto-WatchdogDC
 *
 * The YWatchdog class allows you to drive a Yoctopuce watchdog.
 * A watchdog works like a relay, with an extra timer that can automatically
 * trigger a brief power cycle to an appliance after a preset delay, to force this
 * appliance to reset if a problem occurs. During normal use, the watchdog timer
 * is reset periodically by the application to prevent the automated power cycle.
 * Whenever the application dies, the watchdog will automatically trigger the power cycle.
 * The watchdog can also be driven directly with pulse and delayedPulse
 * methods to switch off an appliance for a given duration.
 */
//--- (end of YWatchdog class start)
class YWatchdog extends yocto_api_js_1.YFunction {
    //--- (end of YWatchdog attributes declaration)
    constructor(yapi, func) {
        //--- (YWatchdog constructor)
        super(yapi, func);
        this._state = YWatchdog.STATE_INVALID;
        this._stateAtPowerOn = YWatchdog.STATEATPOWERON_INVALID;
        this._maxTimeOnStateA = YWatchdog.MAXTIMEONSTATEA_INVALID;
        this._maxTimeOnStateB = YWatchdog.MAXTIMEONSTATEB_INVALID;
        this._output = YWatchdog.OUTPUT_INVALID;
        this._pulseTimer = YWatchdog.PULSETIMER_INVALID;
        this._delayedPulseTimer = {};
        this._countdown = YWatchdog.COUNTDOWN_INVALID;
        this._autoStart = YWatchdog.AUTOSTART_INVALID;
        this._running = YWatchdog.RUNNING_INVALID;
        this._triggerDelay = YWatchdog.TRIGGERDELAY_INVALID;
        this._triggerDuration = YWatchdog.TRIGGERDURATION_INVALID;
        this._lastTrigger = YWatchdog.LASTTRIGGER_INVALID;
        this._valueCallbackWatchdog = null;
        this._firm = 0;
        // API symbols as object properties
        this.STATE_A = 0;
        this.STATE_B = 1;
        this.STATE_INVALID = -1;
        this.STATEATPOWERON_UNCHANGED = 0;
        this.STATEATPOWERON_A = 1;
        this.STATEATPOWERON_B = 2;
        this.STATEATPOWERON_INVALID = -1;
        this.MAXTIMEONSTATEA_INVALID = yocto_api_js_1.YAPI.INVALID_LONG;
        this.MAXTIMEONSTATEB_INVALID = yocto_api_js_1.YAPI.INVALID_LONG;
        this.OUTPUT_OFF = 0;
        this.OUTPUT_ON = 1;
        this.OUTPUT_INVALID = -1;
        this.PULSETIMER_INVALID = yocto_api_js_1.YAPI.INVALID_LONG;
        this.COUNTDOWN_INVALID = yocto_api_js_1.YAPI.INVALID_LONG;
        this.AUTOSTART_OFF = 0;
        this.AUTOSTART_ON = 1;
        this.AUTOSTART_INVALID = -1;
        this.RUNNING_OFF = 0;
        this.RUNNING_ON = 1;
        this.RUNNING_INVALID = -1;
        this.TRIGGERDELAY_INVALID = yocto_api_js_1.YAPI.INVALID_LONG;
        this.TRIGGERDURATION_INVALID = yocto_api_js_1.YAPI.INVALID_LONG;
        this.LASTTRIGGER_INVALID = yocto_api_js_1.YAPI.INVALID_UINT;
        this._className = 'Watchdog';
        //--- (end of YWatchdog constructor)
    }
    //--- (YWatchdog implementation)
    imm_parseAttr(name, val) {
        switch (name) {
            case 'state':
                this._state = val;
                return 1;
            case 'stateAtPowerOn':
                this._stateAtPowerOn = val;
                return 1;
            case 'maxTimeOnStateA':
                this._maxTimeOnStateA = val;
                return 1;
            case 'maxTimeOnStateB':
                this._maxTimeOnStateB = val;
                return 1;
            case 'output':
                this._output = val;
                return 1;
            case 'pulseTimer':
                this._pulseTimer = val;
                return 1;
            case 'delayedPulseTimer':
                this._delayedPulseTimer = val;
                return 1;
            case 'countdown':
                this._countdown = val;
                return 1;
            case 'autoStart':
                this._autoStart = val;
                return 1;
            case 'running':
                this._running = val;
                return 1;
            case 'triggerDelay':
                this._triggerDelay = val;
                return 1;
            case 'triggerDuration':
                this._triggerDuration = val;
                return 1;
            case 'lastTrigger':
                this._lastTrigger = val;
                return 1;
        }
        return super.imm_parseAttr(name, val);
    }
    /**
     * Returns the state of the watchdog (A for the idle position, B for the active position).
     *
     * @return either YWatchdog.STATE_A or YWatchdog.STATE_B, according to the state of the watchdog (A
     * for the idle position, B for the active position)
     *
     * On failure, throws an exception or returns YWatchdog.STATE_INVALID.
     */
    async get_state() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YWatchdog.STATE_INVALID;
            }
        }
        res = this._state;
        return res;
    }
    /**
     * Changes the state of the watchdog (A for the idle position, B for the active position).
     *
     * @param newval : either YWatchdog.STATE_A or YWatchdog.STATE_B, according to the state of the
     * watchdog (A for the idle position, B for the active position)
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_state(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('state', rest_val);
    }
    /**
     * Returns the state of the watchdog at device startup (A for the idle position,
     * B for the active position, UNCHANGED to leave the relay state as is).
     *
     * @return a value among YWatchdog.STATEATPOWERON_UNCHANGED, YWatchdog.STATEATPOWERON_A and
     * YWatchdog.STATEATPOWERON_B corresponding to the state of the watchdog at device startup (A for the
     * idle position,
     *         B for the active position, UNCHANGED to leave the relay state as is)
     *
     * On failure, throws an exception or returns YWatchdog.STATEATPOWERON_INVALID.
     */
    async get_stateAtPowerOn() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YWatchdog.STATEATPOWERON_INVALID;
            }
        }
        res = this._stateAtPowerOn;
        return res;
    }
    /**
     * Changes the state of the watchdog at device startup (A for the idle position,
     * B for the active position, UNCHANGED to leave the relay state as is).
     * Remember to call the matching module saveToFlash()
     * method, otherwise this call will have no effect.
     *
     * @param newval : a value among YWatchdog.STATEATPOWERON_UNCHANGED, YWatchdog.STATEATPOWERON_A and
     * YWatchdog.STATEATPOWERON_B corresponding to the state of the watchdog at device startup (A for the
     * idle position,
     *         B for the active position, UNCHANGED to leave the relay state as is)
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_stateAtPowerOn(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('stateAtPowerOn', rest_val);
    }
    /**
     * Returns the maximum time (ms) allowed for the watchdog to stay in state
     * A before automatically switching back in to B state. Zero means no time limit.
     *
     * @return an integer corresponding to the maximum time (ms) allowed for the watchdog to stay in state
     *         A before automatically switching back in to B state
     *
     * On failure, throws an exception or returns YWatchdog.MAXTIMEONSTATEA_INVALID.
     */
    async get_maxTimeOnStateA() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YWatchdog.MAXTIMEONSTATEA_INVALID;
            }
        }
        res = this._maxTimeOnStateA;
        return res;
    }
    /**
     * Changes the maximum time (ms) allowed for the watchdog to stay in state A
     * before automatically switching back in to B state. Use zero for no time limit.
     * Remember to call the saveToFlash()
     * method of the module if the modification must be kept.
     *
     * @param newval : an integer corresponding to the maximum time (ms) allowed for the watchdog to stay in state A
     *         before automatically switching back in to B state
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_maxTimeOnStateA(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('maxTimeOnStateA', rest_val);
    }
    /**
     * Retourne the maximum time (ms) allowed for the watchdog to stay in state B
     * before automatically switching back in to A state. Zero means no time limit.
     *
     * @return an integer
     *
     * On failure, throws an exception or returns YWatchdog.MAXTIMEONSTATEB_INVALID.
     */
    async get_maxTimeOnStateB() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YWatchdog.MAXTIMEONSTATEB_INVALID;
            }
        }
        res = this._maxTimeOnStateB;
        return res;
    }
    /**
     * Changes the maximum time (ms) allowed for the watchdog to stay in state B before
     * automatically switching back in to A state. Use zero for no time limit.
     * Remember to call the saveToFlash()
     * method of the module if the modification must be kept.
     *
     * @param newval : an integer corresponding to the maximum time (ms) allowed for the watchdog to stay
     * in state B before
     *         automatically switching back in to A state
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_maxTimeOnStateB(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('maxTimeOnStateB', rest_val);
    }
    /**
     * Returns the output state of the watchdog, when used as a simple switch (single throw).
     *
     * @return either YWatchdog.OUTPUT_OFF or YWatchdog.OUTPUT_ON, according to the output state of the
     * watchdog, when used as a simple switch (single throw)
     *
     * On failure, throws an exception or returns YWatchdog.OUTPUT_INVALID.
     */
    async get_output() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YWatchdog.OUTPUT_INVALID;
            }
        }
        res = this._output;
        return res;
    }
    /**
     * Changes the output state of the watchdog, when used as a simple switch (single throw).
     *
     * @param newval : either YWatchdog.OUTPUT_OFF or YWatchdog.OUTPUT_ON, according to the output state
     * of the watchdog, when used as a simple switch (single throw)
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_output(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('output', rest_val);
    }
    /**
     * Returns the number of milliseconds remaining before the watchdog is returned to idle position
     * (state A), during a measured pulse generation. When there is no ongoing pulse, returns zero.
     *
     * @return an integer corresponding to the number of milliseconds remaining before the watchdog is
     * returned to idle position
     *         (state A), during a measured pulse generation
     *
     * On failure, throws an exception or returns YWatchdog.PULSETIMER_INVALID.
     */
    async get_pulseTimer() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YWatchdog.PULSETIMER_INVALID;
            }
        }
        res = this._pulseTimer;
        return res;
    }
    async set_pulseTimer(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('pulseTimer', rest_val);
    }
    /**
     * Sets the relay to output B (active) for a specified duration, then brings it
     * automatically back to output A (idle state).
     *
     * @param ms_duration : pulse duration, in milliseconds
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async pulse(ms_duration) {
        let rest_val;
        rest_val = String(ms_duration);
        return await this._setAttr('pulseTimer', rest_val);
    }
    async get_delayedPulseTimer() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YWatchdog.DELAYEDPULSETIMER_INVALID;
            }
        }
        res = this._delayedPulseTimer;
        return res;
    }
    async set_delayedPulseTimer(newval) {
        let rest_val;
        rest_val = String(newval.target) + ':' + String(newval.ms);
        return await this._setAttr('delayedPulseTimer', rest_val);
    }
    /**
     * Schedules a pulse.
     *
     * @param ms_delay : waiting time before the pulse, in milliseconds
     * @param ms_duration : pulse duration, in milliseconds
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async delayedPulse(ms_delay, ms_duration) {
        let rest_val;
        rest_val = String(ms_delay) + ':' + String(ms_duration);
        return await this._setAttr('delayedPulseTimer', rest_val);
    }
    /**
     * Returns the number of milliseconds remaining before a pulse (delayedPulse() call)
     * When there is no scheduled pulse, returns zero.
     *
     * @return an integer corresponding to the number of milliseconds remaining before a pulse (delayedPulse() call)
     *         When there is no scheduled pulse, returns zero
     *
     * On failure, throws an exception or returns YWatchdog.COUNTDOWN_INVALID.
     */
    async get_countdown() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YWatchdog.COUNTDOWN_INVALID;
            }
        }
        res = this._countdown;
        return res;
    }
    /**
     * Returns the watchdog running state at module power on.
     *
     * @return either YWatchdog.AUTOSTART_OFF or YWatchdog.AUTOSTART_ON, according to the watchdog running
     * state at module power on
     *
     * On failure, throws an exception or returns YWatchdog.AUTOSTART_INVALID.
     */
    async get_autoStart() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YWatchdog.AUTOSTART_INVALID;
            }
        }
        res = this._autoStart;
        return res;
    }
    /**
     * Changes the watchdog running state at module power on. Remember to call the
     * saveToFlash() method and then to reboot the module to apply this setting.
     *
     * @param newval : either YWatchdog.AUTOSTART_OFF or YWatchdog.AUTOSTART_ON, according to the watchdog
     * running state at module power on
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_autoStart(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('autoStart', rest_val);
    }
    /**
     * Returns the watchdog running state.
     *
     * @return either YWatchdog.RUNNING_OFF or YWatchdog.RUNNING_ON, according to the watchdog running state
     *
     * On failure, throws an exception or returns YWatchdog.RUNNING_INVALID.
     */
    async get_running() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YWatchdog.RUNNING_INVALID;
            }
        }
        res = this._running;
        return res;
    }
    /**
     * Changes the running state of the watchdog.
     *
     * @param newval : either YWatchdog.RUNNING_OFF or YWatchdog.RUNNING_ON, according to the running
     * state of the watchdog
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_running(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('running', rest_val);
    }
    /**
     * Resets the watchdog. When the watchdog is running, this function
     * must be called on a regular basis to prevent the watchdog to
     * trigger
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async resetWatchdog() {
        let rest_val;
        rest_val = '1';
        return await this._setAttr('running', rest_val);
    }
    /**
     * Returns  the waiting duration before a reset is automatically triggered by the watchdog, in milliseconds.
     *
     * @return an integer corresponding to  the waiting duration before a reset is automatically triggered
     * by the watchdog, in milliseconds
     *
     * On failure, throws an exception or returns YWatchdog.TRIGGERDELAY_INVALID.
     */
    async get_triggerDelay() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YWatchdog.TRIGGERDELAY_INVALID;
            }
        }
        res = this._triggerDelay;
        return res;
    }
    /**
     * Changes the waiting delay before a reset is triggered by the watchdog,
     * in milliseconds. Remember to call the saveToFlash()
     * method of the module if the modification must be kept.
     *
     * @param newval : an integer corresponding to the waiting delay before a reset is triggered by the watchdog,
     *         in milliseconds
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_triggerDelay(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('triggerDelay', rest_val);
    }
    /**
     * Returns the duration of resets caused by the watchdog, in milliseconds.
     *
     * @return an integer corresponding to the duration of resets caused by the watchdog, in milliseconds
     *
     * On failure, throws an exception or returns YWatchdog.TRIGGERDURATION_INVALID.
     */
    async get_triggerDuration() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YWatchdog.TRIGGERDURATION_INVALID;
            }
        }
        res = this._triggerDuration;
        return res;
    }
    /**
     * Changes the duration of resets caused by the watchdog, in milliseconds.
     * Remember to call the saveToFlash()
     * method of the module if the modification must be kept.
     *
     * @param newval : an integer corresponding to the duration of resets caused by the watchdog, in milliseconds
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_triggerDuration(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('triggerDuration', rest_val);
    }
    /**
     * Returns the number of seconds spent since the last output power-up event.
     *
     * @return an integer corresponding to the number of seconds spent since the last output power-up event
     *
     * On failure, throws an exception or returns YWatchdog.LASTTRIGGER_INVALID.
     */
    async get_lastTrigger() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YWatchdog.LASTTRIGGER_INVALID;
            }
        }
        res = this._lastTrigger;
        return res;
    }
    /**
     * Retrieves a watchdog for a given identifier.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the watchdog is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YWatchdog.isOnline() to test if the watchdog is
     * indeed online at a given time. In case of ambiguity when looking for
     * a watchdog by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the watchdog, for instance
     *         WDOGDC01.watchdog1.
     *
     * @return a YWatchdog object allowing you to drive the watchdog.
     */
    static FindWatchdog(func) {
        let obj;
        obj = yocto_api_js_1.YFunction._FindFromCache('Watchdog', func);
        if (obj == null) {
            obj = new YWatchdog(yocto_api_js_1.YAPI, func);
            yocto_api_js_1.YFunction._AddToCache('Watchdog', func, obj);
        }
        return obj;
    }
    /**
     * Retrieves a watchdog for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the watchdog is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YWatchdog.isOnline() to test if the watchdog is
     * indeed online at a given time. In case of ambiguity when looking for
     * a watchdog by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx : a YAPI context
     * @param func : a string that uniquely characterizes the watchdog, for instance
     *         WDOGDC01.watchdog1.
     *
     * @return a YWatchdog object allowing you to drive the watchdog.
     */
    static FindWatchdogInContext(yctx, func) {
        let obj;
        obj = yocto_api_js_1.YFunction._FindFromCacheInContext(yctx, 'Watchdog', func);
        if (obj == null) {
            obj = new YWatchdog(yctx, func);
            yocto_api_js_1.YFunction._AddToCache('Watchdog', func, obj);
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
            await yocto_api_js_1.YFunction._UpdateValueCallbackList(this, true);
        }
        else {
            await yocto_api_js_1.YFunction._UpdateValueCallbackList(this, false);
        }
        this._valueCallbackWatchdog = callback;
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
        if (this._valueCallbackWatchdog != null) {
            try {
                await this._valueCallbackWatchdog(this, value);
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
     * Switch the relay to the opposite state.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async toggle() {
        let sta;
        let fw;
        let mo;
        if (this._firm == 0) {
            mo = await this.get_module();
            fw = await mo.get_firmwareRelease();
            if (fw == yocto_api_js_1.YModule.FIRMWARERELEASE_INVALID) {
                return YWatchdog.STATE_INVALID;
            }
            this._firm = yocto_api_js_1.YAPIContext.imm_atoi(fw);
        }
        if (this._firm < 34921) {
            sta = await this.get_state();
            if (sta == YWatchdog.STATE_INVALID) {
                return YWatchdog.STATE_INVALID;
            }
            if (sta == YWatchdog.STATE_B) {
                await this.set_state(YWatchdog.STATE_A);
            }
            else {
                await this.set_state(YWatchdog.STATE_B);
            }
            return this._yapi.SUCCESS;
        }
        else {
            return await this._setAttr('state', 'X');
        }
    }
    /**
     * Continues the enumeration of watchdog started using yFirstWatchdog().
     * Caution: You can't make any assumption about the returned watchdog order.
     * If you want to find a specific a watchdog, use Watchdog.findWatchdog()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YWatchdog object, corresponding to
     *         a watchdog currently online, or a null pointer
     *         if there are no more watchdog to enumerate.
     */
    nextWatchdog() {
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != yocto_api_js_1.YAPI.SUCCESS)
            return null;
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if (next_hwid == null)
            return null;
        return YWatchdog.FindWatchdogInContext(this._yapi, next_hwid);
    }
    /**
     * Starts the enumeration of watchdog currently accessible.
     * Use the method YWatchdog.nextWatchdog() to iterate on
     * next watchdog.
     *
     * @return a pointer to a YWatchdog object, corresponding to
     *         the first watchdog currently online, or a null pointer
     *         if there are none.
     */
    static FirstWatchdog() {
        let next_hwid = yocto_api_js_1.YAPI.imm_getFirstHardwareId('Watchdog');
        if (next_hwid == null)
            return null;
        return YWatchdog.FindWatchdog(next_hwid);
    }
    /**
     * Starts the enumeration of watchdog currently accessible.
     * Use the method YWatchdog.nextWatchdog() to iterate on
     * next watchdog.
     *
     * @param yctx : a YAPI context.
     *
     * @return a pointer to a YWatchdog object, corresponding to
     *         the first watchdog currently online, or a null pointer
     *         if there are none.
     */
    static FirstWatchdogInContext(yctx) {
        let next_hwid = yctx.imm_getFirstHardwareId('Watchdog');
        if (next_hwid == null)
            return null;
        return YWatchdog.FindWatchdogInContext(yctx, next_hwid);
    }
}
exports.YWatchdog = YWatchdog;
// API symbols as static members
YWatchdog.DELAYEDPULSETIMER_INVALID = {};
YWatchdog.STATE_A = 0;
YWatchdog.STATE_B = 1;
YWatchdog.STATE_INVALID = -1;
YWatchdog.STATEATPOWERON_UNCHANGED = 0;
YWatchdog.STATEATPOWERON_A = 1;
YWatchdog.STATEATPOWERON_B = 2;
YWatchdog.STATEATPOWERON_INVALID = -1;
YWatchdog.MAXTIMEONSTATEA_INVALID = yocto_api_js_1.YAPI.INVALID_LONG;
YWatchdog.MAXTIMEONSTATEB_INVALID = yocto_api_js_1.YAPI.INVALID_LONG;
YWatchdog.OUTPUT_OFF = 0;
YWatchdog.OUTPUT_ON = 1;
YWatchdog.OUTPUT_INVALID = -1;
YWatchdog.PULSETIMER_INVALID = yocto_api_js_1.YAPI.INVALID_LONG;
YWatchdog.COUNTDOWN_INVALID = yocto_api_js_1.YAPI.INVALID_LONG;
YWatchdog.AUTOSTART_OFF = 0;
YWatchdog.AUTOSTART_ON = 1;
YWatchdog.AUTOSTART_INVALID = -1;
YWatchdog.RUNNING_OFF = 0;
YWatchdog.RUNNING_ON = 1;
YWatchdog.RUNNING_INVALID = -1;
YWatchdog.TRIGGERDELAY_INVALID = yocto_api_js_1.YAPI.INVALID_LONG;
YWatchdog.TRIGGERDURATION_INVALID = yocto_api_js_1.YAPI.INVALID_LONG;
YWatchdog.LASTTRIGGER_INVALID = yocto_api_js_1.YAPI.INVALID_UINT;
//# sourceMappingURL=yocto_watchdog.js.map