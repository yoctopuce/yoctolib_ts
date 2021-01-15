"use strict";
/*********************************************************************
 *
 *  $Id: svn_id $
 *
 *  Implements the high-level API for Relay functions
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
exports.YRelay = void 0;
const yocto_api_js_1 = require("./yocto_api.js");
class YRelayDelayedPulse {
    constructor() {
        this.target = yocto_api_js_1.YAPI.INVALID_INT;
        this.ms = yocto_api_js_1.YAPI.INVALID_INT;
        this.moving = yocto_api_js_1.YAPI.INVALID_UINT;
    }
}
//--- (end of YRelay definitions)
//--- (YRelay class start)
/**
 * YRelay Class: relay control interface, available for instance in the Yocto-LatchedRelay, the
 * Yocto-MaxiPowerRelay, the Yocto-PowerRelay-V3 or the Yocto-Relay
 *
 * The YRelay class allows you to drive a Yoctopuce relay or optocoupled output.
 * It can be used to simply switch the output on or off, but also to automatically generate short
 * pulses of determined duration.
 * On devices with two output for each relay (double throw), the two outputs are named A and B,
 * with output A corresponding to the idle position (normally closed) and the output B corresponding to the
 * active state (normally open).
 */
//--- (end of YRelay class start)
class YRelay extends yocto_api_js_1.YFunction {
    //--- (end of YRelay attributes declaration)
    //--- (YRelay return codes)
    //--- (end of YRelay return codes)
    constructor(yapi, func) {
        //--- (YRelay constructor)
        super(yapi, func);
        this._state = YRelay.STATE_INVALID;
        this._stateAtPowerOn = YRelay.STATEATPOWERON_INVALID;
        this._maxTimeOnStateA = YRelay.MAXTIMEONSTATEA_INVALID;
        this._maxTimeOnStateB = YRelay.MAXTIMEONSTATEB_INVALID;
        this._output = YRelay.OUTPUT_INVALID;
        this._pulseTimer = YRelay.PULSETIMER_INVALID;
        this._delayedPulseTimer = new YRelayDelayedPulse();
        this._countdown = YRelay.COUNTDOWN_INVALID;
        this._valueCallbackRelay = null;
        this._firm = 0;
        // API symbols as object properties
        this.STATE_A = 0 /* A */;
        this.STATE_B = 1 /* B */;
        this.STATE_INVALID = -1 /* INVALID */;
        this.STATEATPOWERON_UNCHANGED = 0 /* UNCHANGED */;
        this.STATEATPOWERON_A = 1 /* A */;
        this.STATEATPOWERON_B = 2 /* B */;
        this.STATEATPOWERON_INVALID = -1 /* INVALID */;
        this.MAXTIMEONSTATEA_INVALID = yocto_api_js_1.YAPI.INVALID_LONG;
        this.MAXTIMEONSTATEB_INVALID = yocto_api_js_1.YAPI.INVALID_LONG;
        this.OUTPUT_OFF = 0 /* OFF */;
        this.OUTPUT_ON = 1 /* ON */;
        this.OUTPUT_INVALID = -1 /* INVALID */;
        this.PULSETIMER_INVALID = yocto_api_js_1.YAPI.INVALID_LONG;
        this.COUNTDOWN_INVALID = yocto_api_js_1.YAPI.INVALID_LONG;
        this._className = 'Relay';
        //--- (end of YRelay constructor)
    }
    //--- (YRelay implementation)
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
        }
        return super.imm_parseAttr(name, val);
    }
    /**
     * Returns the state of the relays (A for the idle position, B for the active position).
     *
     * @return either Y_STATE_A or Y_STATE_B, according to the state of the relays (A for the idle
     * position, B for the active position)
     *
     * On failure, throws an exception or returns Y_STATE_INVALID.
     */
    async get_state() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YRelay.STATE_INVALID;
            }
        }
        res = this._state;
        return res;
    }
    /**
     * Changes the state of the relays (A for the idle position, B for the active position).
     *
     * @param newval : either Y_STATE_A or Y_STATE_B, according to the state of the relays (A for the idle
     * position, B for the active position)
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_state(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('state', rest_val);
    }
    /**
     * Returns the state of the relays at device startup (A for the idle position,
     * B for the active position, UNCHANGED to leave the relay state as is).
     *
     * @return a value among Y_STATEATPOWERON_UNCHANGED, Y_STATEATPOWERON_A and Y_STATEATPOWERON_B
     * corresponding to the state of the relays at device startup (A for the idle position,
     *         B for the active position, UNCHANGED to leave the relay state as is)
     *
     * On failure, throws an exception or returns Y_STATEATPOWERON_INVALID.
     */
    async get_stateAtPowerOn() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YRelay.STATEATPOWERON_INVALID;
            }
        }
        res = this._stateAtPowerOn;
        return res;
    }
    /**
     * Changes the state of the relays at device startup (A for the idle position,
     * B for the active position, UNCHANGED to leave the relay state as is).
     * Remember to call the matching module saveToFlash()
     * method, otherwise this call will have no effect.
     *
     * @param newval : a value among Y_STATEATPOWERON_UNCHANGED, Y_STATEATPOWERON_A and Y_STATEATPOWERON_B
     * corresponding to the state of the relays at device startup (A for the idle position,
     *         B for the active position, UNCHANGED to leave the relay state as is)
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_stateAtPowerOn(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('stateAtPowerOn', rest_val);
    }
    /**
     * Returns the maximum time (ms) allowed for the relay to stay in state
     * A before automatically switching back in to B state. Zero means no time limit.
     *
     * @return an integer corresponding to the maximum time (ms) allowed for the relay to stay in state
     *         A before automatically switching back in to B state
     *
     * On failure, throws an exception or returns Y_MAXTIMEONSTATEA_INVALID.
     */
    async get_maxTimeOnStateA() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YRelay.MAXTIMEONSTATEA_INVALID;
            }
        }
        res = this._maxTimeOnStateA;
        return res;
    }
    /**
     * Changes the maximum time (ms) allowed for the relay to stay in state A
     * before automatically switching back in to B state. Use zero for no time limit.
     * Remember to call the saveToFlash()
     * method of the module if the modification must be kept.
     *
     * @param newval : an integer corresponding to the maximum time (ms) allowed for the relay to stay in state A
     *         before automatically switching back in to B state
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_maxTimeOnStateA(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('maxTimeOnStateA', rest_val);
    }
    /**
     * Retourne the maximum time (ms) allowed for the relay to stay in state B
     * before automatically switching back in to A state. Zero means no time limit.
     *
     * @return an integer
     *
     * On failure, throws an exception or returns Y_MAXTIMEONSTATEB_INVALID.
     */
    async get_maxTimeOnStateB() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YRelay.MAXTIMEONSTATEB_INVALID;
            }
        }
        res = this._maxTimeOnStateB;
        return res;
    }
    /**
     * Changes the maximum time (ms) allowed for the relay to stay in state B before
     * automatically switching back in to A state. Use zero for no time limit.
     * Remember to call the saveToFlash()
     * method of the module if the modification must be kept.
     *
     * @param newval : an integer corresponding to the maximum time (ms) allowed for the relay to stay in
     * state B before
     *         automatically switching back in to A state
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_maxTimeOnStateB(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('maxTimeOnStateB', rest_val);
    }
    /**
     * Returns the output state of the relays, when used as a simple switch (single throw).
     *
     * @return either Y_OUTPUT_OFF or Y_OUTPUT_ON, according to the output state of the relays, when used
     * as a simple switch (single throw)
     *
     * On failure, throws an exception or returns Y_OUTPUT_INVALID.
     */
    async get_output() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YRelay.OUTPUT_INVALID;
            }
        }
        res = this._output;
        return res;
    }
    /**
     * Changes the output state of the relays, when used as a simple switch (single throw).
     *
     * @param newval : either Y_OUTPUT_OFF or Y_OUTPUT_ON, according to the output state of the relays,
     * when used as a simple switch (single throw)
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_output(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('output', rest_val);
    }
    /**
     * Returns the number of milliseconds remaining before the relays is returned to idle position
     * (state A), during a measured pulse generation. When there is no ongoing pulse, returns zero.
     *
     * @return an integer corresponding to the number of milliseconds remaining before the relays is
     * returned to idle position
     *         (state A), during a measured pulse generation
     *
     * On failure, throws an exception or returns Y_PULSETIMER_INVALID.
     */
    async get_pulseTimer() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YRelay.PULSETIMER_INVALID;
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
     * @return YAPI_SUCCESS if the call succeeds.
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
                return YRelay.DELAYEDPULSETIMER_INVALID;
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
     * @return YAPI_SUCCESS if the call succeeds.
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
     * On failure, throws an exception or returns Y_COUNTDOWN_INVALID.
     */
    async get_countdown() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YRelay.COUNTDOWN_INVALID;
            }
        }
        res = this._countdown;
        return res;
    }
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
     * Use the method YRelay.isOnline() to test if $THEFUNCTION$ is
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
     * @return a YRelay object allowing you to drive $THEFUNCTION$.
     */
    static FindRelay(func) {
        let obj;
        obj = yocto_api_js_1.YFunction._FindFromCache('Relay', func);
        if (obj == null) {
            obj = new YRelay(yocto_api_js_1.YAPI, func);
            yocto_api_js_1.YFunction._AddToCache('Relay', func, obj);
        }
        return obj;
    }
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
     * Use the method YRelay.isOnline() to test if $THEFUNCTION$ is
     * indeed online at a given time. In case of ambiguity when looking for
     * $AFUNCTION$ by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx : a YAPI context
     * @param func : a string that uniquely characterizes $THEFUNCTION$, for instance
     *         $FULLHARDWAREID$.
     *
     * @return a YRelay object allowing you to drive $THEFUNCTION$.
     */
    static FindRelayInContext(yctx, func) {
        let obj;
        obj = yocto_api_js_1.YFunction._FindFromCacheInContext(yctx, 'Relay', func);
        if (obj == null) {
            obj = new YRelay(yctx, func);
            yocto_api_js_1.YFunction._AddToCache('Relay', func, obj);
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
        this._valueCallbackRelay = callback;
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
        if (this._valueCallbackRelay != null) {
            try {
                await this._valueCallbackRelay(this, value);
            }
            catch (e) {
                this._yapi.imm_log('Exception in valueCallback:', e);
            }
        }
        else {
            super._invokeValueCallback(value);
        }
        return 0;
    }
    /**
     * Switch the relay to the opposite state.
     *
     * @return YAPI_SUCCESS if the call succeeds.
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
                return YRelay.STATE_INVALID;
            }
            this._firm = this._yapi.imm_atoi(fw);
        }
        if (this._firm < 34921) {
            sta = await this.get_state();
            if (sta == YRelay.STATE_INVALID) {
                return YRelay.STATE_INVALID;
            }
            if (sta == YRelay.STATE_B) {
                await this.set_state(YRelay.STATE_A);
            }
            else {
                await this.set_state(YRelay.STATE_B);
            }
            return this._yapi.SUCCESS;
        }
        else {
            return await this._setAttr('state', 'X');
        }
    }
    /**
     * Returns the next Relay
     *
     * @returns {YRelay}
     */
    nextRelay() {
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != yocto_api_js_1.YAPI.SUCCESS)
            return null;
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if (next_hwid == null)
            return null;
        return YRelay.FindRelayInContext(this._yapi, next_hwid);
    }
    /**
     * Retrieves the first Relay in a YAPI context
     *
     * @returns {YRelay}
     */
    static FirstRelay() {
        let next_hwid = yocto_api_js_1.YAPI.imm_getFirstHardwareId('Relay');
        if (next_hwid == null)
            return null;
        return YRelay.FindRelay(next_hwid);
    }
    /**
     * Retrieves the first Relay in a given context
     *
     * @param yctx {YAPIContext}
     *
     * @returns {YRelay}
     */
    static FirstRelayInContext(yctx) {
        let next_hwid = yctx.imm_getFirstHardwareId('Relay');
        if (next_hwid == null)
            return null;
        return YRelay.FindRelayInContext(yctx, next_hwid);
    }
}
exports.YRelay = YRelay;
// API symbols as static members
YRelay.DELAYEDPULSETIMER_INVALID = new YRelayDelayedPulse();
YRelay.STATE_A = 0 /* A */;
YRelay.STATE_B = 1 /* B */;
YRelay.STATE_INVALID = -1 /* INVALID */;
YRelay.STATEATPOWERON_UNCHANGED = 0 /* UNCHANGED */;
YRelay.STATEATPOWERON_A = 1 /* A */;
YRelay.STATEATPOWERON_B = 2 /* B */;
YRelay.STATEATPOWERON_INVALID = -1 /* INVALID */;
YRelay.MAXTIMEONSTATEA_INVALID = yocto_api_js_1.YAPI.INVALID_LONG;
YRelay.MAXTIMEONSTATEB_INVALID = yocto_api_js_1.YAPI.INVALID_LONG;
YRelay.OUTPUT_OFF = 0 /* OFF */;
YRelay.OUTPUT_ON = 1 /* ON */;
YRelay.OUTPUT_INVALID = -1 /* INVALID */;
YRelay.PULSETIMER_INVALID = yocto_api_js_1.YAPI.INVALID_LONG;
YRelay.COUNTDOWN_INVALID = yocto_api_js_1.YAPI.INVALID_LONG;
//# sourceMappingURL=yocto_relay.js.map