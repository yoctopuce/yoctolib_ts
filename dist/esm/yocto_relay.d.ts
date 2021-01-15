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
import { YAPIContext, YFunction } from './yocto_api.js';
export declare const enum Y_State {
    A = 0,
    B = 1,
    INVALID = -1
}
export declare const enum Y_StateAtPowerOn {
    UNCHANGED = 0,
    A = 1,
    B = 2,
    INVALID = -1
}
export declare const enum Y_Output {
    OFF = 0,
    ON = 1,
    INVALID = -1
}
declare class YRelayDelayedPulse {
    target: number;
    ms: number;
    moving: number;
}
export interface YRelayValueCallback {
    (func: YRelay, value: string): void;
}
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
export declare class YRelay extends YFunction {
    _className: string;
    _state: Y_State;
    _stateAtPowerOn: Y_StateAtPowerOn;
    _maxTimeOnStateA: number;
    _maxTimeOnStateB: number;
    _output: Y_Output;
    _pulseTimer: number;
    _delayedPulseTimer: YRelayDelayedPulse;
    _countdown: number;
    _valueCallbackRelay: YRelayValueCallback | null;
    _firm: number;
    readonly STATE_A: Y_State;
    readonly STATE_B: Y_State;
    readonly STATE_INVALID: Y_State;
    readonly STATEATPOWERON_UNCHANGED: Y_StateAtPowerOn;
    readonly STATEATPOWERON_A: Y_StateAtPowerOn;
    readonly STATEATPOWERON_B: Y_StateAtPowerOn;
    readonly STATEATPOWERON_INVALID: Y_StateAtPowerOn;
    readonly MAXTIMEONSTATEA_INVALID: number;
    readonly MAXTIMEONSTATEB_INVALID: number;
    readonly OUTPUT_OFF: Y_Output;
    readonly OUTPUT_ON: Y_Output;
    readonly OUTPUT_INVALID: Y_Output;
    readonly PULSETIMER_INVALID: number;
    readonly COUNTDOWN_INVALID: number;
    static readonly DELAYEDPULSETIMER_INVALID: YRelayDelayedPulse;
    static readonly STATE_A: Y_State;
    static readonly STATE_B: Y_State;
    static readonly STATE_INVALID: Y_State;
    static readonly STATEATPOWERON_UNCHANGED: Y_StateAtPowerOn;
    static readonly STATEATPOWERON_A: Y_StateAtPowerOn;
    static readonly STATEATPOWERON_B: Y_StateAtPowerOn;
    static readonly STATEATPOWERON_INVALID: Y_StateAtPowerOn;
    static readonly MAXTIMEONSTATEA_INVALID: number;
    static readonly MAXTIMEONSTATEB_INVALID: number;
    static readonly OUTPUT_OFF: Y_Output;
    static readonly OUTPUT_ON: Y_Output;
    static readonly OUTPUT_INVALID: Y_Output;
    static readonly PULSETIMER_INVALID: number;
    static readonly COUNTDOWN_INVALID: number;
    constructor(yapi: YAPIContext, func: string);
    imm_parseAttr(name: string, val: any): 0 | 1;
    /**
     * Returns the state of the relays (A for the idle position, B for the active position).
     *
     * @return either Y_STATE_A or Y_STATE_B, according to the state of the relays (A for the idle
     * position, B for the active position)
     *
     * On failure, throws an exception or returns Y_STATE_INVALID.
     */
    get_state(): Promise<Y_State>;
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
    set_state(newval: Y_State): Promise<number>;
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
    get_stateAtPowerOn(): Promise<Y_StateAtPowerOn>;
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
    set_stateAtPowerOn(newval: Y_StateAtPowerOn): Promise<number>;
    /**
     * Returns the maximum time (ms) allowed for the relay to stay in state
     * A before automatically switching back in to B state. Zero means no time limit.
     *
     * @return an integer corresponding to the maximum time (ms) allowed for the relay to stay in state
     *         A before automatically switching back in to B state
     *
     * On failure, throws an exception or returns Y_MAXTIMEONSTATEA_INVALID.
     */
    get_maxTimeOnStateA(): Promise<number>;
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
    set_maxTimeOnStateA(newval: number): Promise<number>;
    /**
     * Retourne the maximum time (ms) allowed for the relay to stay in state B
     * before automatically switching back in to A state. Zero means no time limit.
     *
     * @return an integer
     *
     * On failure, throws an exception or returns Y_MAXTIMEONSTATEB_INVALID.
     */
    get_maxTimeOnStateB(): Promise<number>;
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
    set_maxTimeOnStateB(newval: number): Promise<number>;
    /**
     * Returns the output state of the relays, when used as a simple switch (single throw).
     *
     * @return either Y_OUTPUT_OFF or Y_OUTPUT_ON, according to the output state of the relays, when used
     * as a simple switch (single throw)
     *
     * On failure, throws an exception or returns Y_OUTPUT_INVALID.
     */
    get_output(): Promise<Y_Output>;
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
    set_output(newval: Y_Output): Promise<number>;
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
    get_pulseTimer(): Promise<number>;
    set_pulseTimer(newval: number): Promise<number>;
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
    pulse(ms_duration: number): Promise<number>;
    get_delayedPulseTimer(): Promise<YRelayDelayedPulse>;
    set_delayedPulseTimer(newval: YRelayDelayedPulse): Promise<number>;
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
    delayedPulse(ms_delay: number, ms_duration: number): Promise<number>;
    /**
     * Returns the number of milliseconds remaining before a pulse (delayedPulse() call)
     * When there is no scheduled pulse, returns zero.
     *
     * @return an integer corresponding to the number of milliseconds remaining before a pulse (delayedPulse() call)
     *         When there is no scheduled pulse, returns zero
     *
     * On failure, throws an exception or returns Y_COUNTDOWN_INVALID.
     */
    get_countdown(): Promise<number>;
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
    static FindRelay(func: string): YRelay;
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
    static FindRelayInContext(yctx: YAPIContext, func: string): YRelay;
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
    registerValueCallback(callback: YRelayValueCallback | null): Promise<number>;
    _invokeValueCallback(value: string): Promise<number>;
    /**
     * Switch the relay to the opposite state.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    toggle(): Promise<number>;
    /**
     * Returns the next Relay
     *
     * @returns {YRelay}
     */
    nextRelay(): YRelay | null;
    /**
     * Retrieves the first Relay in a YAPI context
     *
     * @returns {YRelay}
     */
    static FirstRelay(): YRelay | null;
    /**
     * Retrieves the first Relay in a given context
     *
     * @param yctx {YAPIContext}
     *
     * @returns {YRelay}
     */
    static FirstRelayInContext(yctx: YAPIContext): YRelay | null;
}
export {};
