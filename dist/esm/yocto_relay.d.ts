/*********************************************************************
 *
 *  $Id: yocto_relay.ts 63327 2024-11-13 09:35:03Z seb $
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
    _state: YRelay.STATE;
    _stateAtPowerOn: YRelay.STATEATPOWERON;
    _maxTimeOnStateA: number;
    _maxTimeOnStateB: number;
    _output: YRelay.OUTPUT;
    _pulseTimer: number;
    _delayedPulseTimer: YRelay.DelayedPulse;
    _countdown: number;
    _valueCallbackRelay: YRelay.ValueCallback | null;
    _firm: number;
    readonly STATE_A: YRelay.STATE;
    readonly STATE_B: YRelay.STATE;
    readonly STATE_INVALID: YRelay.STATE;
    readonly STATEATPOWERON_UNCHANGED: YRelay.STATEATPOWERON;
    readonly STATEATPOWERON_A: YRelay.STATEATPOWERON;
    readonly STATEATPOWERON_B: YRelay.STATEATPOWERON;
    readonly STATEATPOWERON_INVALID: YRelay.STATEATPOWERON;
    readonly MAXTIMEONSTATEA_INVALID: number;
    readonly MAXTIMEONSTATEB_INVALID: number;
    readonly OUTPUT_OFF: YRelay.OUTPUT;
    readonly OUTPUT_ON: YRelay.OUTPUT;
    readonly OUTPUT_INVALID: YRelay.OUTPUT;
    readonly PULSETIMER_INVALID: number;
    readonly COUNTDOWN_INVALID: number;
    static readonly DELAYEDPULSETIMER_INVALID: YRelay.DelayedPulse;
    static readonly STATE_A: YRelay.STATE;
    static readonly STATE_B: YRelay.STATE;
    static readonly STATE_INVALID: YRelay.STATE;
    static readonly STATEATPOWERON_UNCHANGED: YRelay.STATEATPOWERON;
    static readonly STATEATPOWERON_A: YRelay.STATEATPOWERON;
    static readonly STATEATPOWERON_B: YRelay.STATEATPOWERON;
    static readonly STATEATPOWERON_INVALID: YRelay.STATEATPOWERON;
    static readonly MAXTIMEONSTATEA_INVALID: number;
    static readonly MAXTIMEONSTATEB_INVALID: number;
    static readonly OUTPUT_OFF: YRelay.OUTPUT;
    static readonly OUTPUT_ON: YRelay.OUTPUT;
    static readonly OUTPUT_INVALID: YRelay.OUTPUT;
    static readonly PULSETIMER_INVALID: number;
    static readonly COUNTDOWN_INVALID: number;
    constructor(yapi: YAPIContext, func: string);
    imm_parseAttr(name: string, val: any): number;
    /**
     * Returns the state of the relays (A for the idle position, B for the active position).
     *
     * @return either YRelay.STATE_A or YRelay.STATE_B, according to the state of the relays (A for the
     * idle position, B for the active position)
     *
     * On failure, throws an exception or returns YRelay.STATE_INVALID.
     */
    get_state(): Promise<YRelay.STATE>;
    /**
     * Changes the state of the relays (A for the idle position, B for the active position).
     *
     * @param newval : either YRelay.STATE_A or YRelay.STATE_B, according to the state of the relays (A
     * for the idle position, B for the active position)
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_state(newval: YRelay.STATE): Promise<number>;
    /**
     * Returns the state of the relays at device startup (A for the idle position,
     * B for the active position, UNCHANGED to leave the relay state as is).
     *
     * @return a value among YRelay.STATEATPOWERON_UNCHANGED, YRelay.STATEATPOWERON_A and
     * YRelay.STATEATPOWERON_B corresponding to the state of the relays at device startup (A for the idle position,
     *         B for the active position, UNCHANGED to leave the relay state as is)
     *
     * On failure, throws an exception or returns YRelay.STATEATPOWERON_INVALID.
     */
    get_stateAtPowerOn(): Promise<YRelay.STATEATPOWERON>;
    /**
     * Changes the state of the relays at device startup (A for the idle position,
     * B for the active position, UNCHANGED to leave the relay state as is).
     * Remember to call the matching module saveToFlash()
     * method, otherwise this call will have no effect.
     *
     * @param newval : a value among YRelay.STATEATPOWERON_UNCHANGED, YRelay.STATEATPOWERON_A and
     * YRelay.STATEATPOWERON_B corresponding to the state of the relays at device startup (A for the idle position,
     *         B for the active position, UNCHANGED to leave the relay state as is)
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_stateAtPowerOn(newval: YRelay.STATEATPOWERON): Promise<number>;
    /**
     * Returns the maximum time (ms) allowed for the relay to stay in state
     * A before automatically switching back in to B state. Zero means no time limit.
     *
     * @return an integer corresponding to the maximum time (ms) allowed for the relay to stay in state
     *         A before automatically switching back in to B state
     *
     * On failure, throws an exception or returns YRelay.MAXTIMEONSTATEA_INVALID.
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
     * @return YAPI.SUCCESS if the call succeeds.
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
     * On failure, throws an exception or returns YRelay.MAXTIMEONSTATEB_INVALID.
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
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_maxTimeOnStateB(newval: number): Promise<number>;
    /**
     * Returns the output state of the relays, when used as a simple switch (single throw).
     *
     * @return either YRelay.OUTPUT_OFF or YRelay.OUTPUT_ON, according to the output state of the relays,
     * when used as a simple switch (single throw)
     *
     * On failure, throws an exception or returns YRelay.OUTPUT_INVALID.
     */
    get_output(): Promise<YRelay.OUTPUT>;
    /**
     * Changes the output state of the relays, when used as a simple switch (single throw).
     *
     * @param newval : either YRelay.OUTPUT_OFF or YRelay.OUTPUT_ON, according to the output state of the
     * relays, when used as a simple switch (single throw)
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_output(newval: YRelay.OUTPUT): Promise<number>;
    /**
     * Returns the number of milliseconds remaining before the relays is returned to idle position
     * (state A), during a measured pulse generation. When there is no ongoing pulse, returns zero.
     *
     * @return an integer corresponding to the number of milliseconds remaining before the relays is
     * returned to idle position
     *         (state A), during a measured pulse generation
     *
     * On failure, throws an exception or returns YRelay.PULSETIMER_INVALID.
     */
    get_pulseTimer(): Promise<number>;
    set_pulseTimer(newval: number): Promise<number>;
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
    pulse(ms_duration: number): Promise<number>;
    get_delayedPulseTimer(): Promise<YRelay.DelayedPulse>;
    set_delayedPulseTimer(newval: YRelay.DelayedPulse): Promise<number>;
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
    delayedPulse(ms_delay: number, ms_duration: number): Promise<number>;
    /**
     * Returns the number of milliseconds remaining before a pulse (delayedPulse() call)
     * When there is no scheduled pulse, returns zero.
     *
     * @return an integer corresponding to the number of milliseconds remaining before a pulse (delayedPulse() call)
     *         When there is no scheduled pulse, returns zero
     *
     * On failure, throws an exception or returns YRelay.COUNTDOWN_INVALID.
     */
    get_countdown(): Promise<number>;
    /**
     * Retrieves a relay for a given identifier.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the relay is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YRelay.isOnline() to test if the relay is
     * indeed online at a given time. In case of ambiguity when looking for
     * a relay by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the relay, for instance
     *         YLTCHRL1.relay1.
     *
     * @return a YRelay object allowing you to drive the relay.
     */
    static FindRelay(func: string): YRelay;
    /**
     * Retrieves a relay for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the relay is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YRelay.isOnline() to test if the relay is
     * indeed online at a given time. In case of ambiguity when looking for
     * a relay by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx : a YAPI context
     * @param func : a string that uniquely characterizes the relay, for instance
     *         YLTCHRL1.relay1.
     *
     * @return a YRelay object allowing you to drive the relay.
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
    registerValueCallback(callback: YRelay.ValueCallback | null): Promise<number>;
    _invokeValueCallback(value: string): Promise<number>;
    /**
     * Switch the relay to the opposite state.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    toggle(): Promise<number>;
    /**
     * Continues the enumeration of relays started using yFirstRelay().
     * Caution: You can't make any assumption about the returned relays order.
     * If you want to find a specific a relay, use Relay.findRelay()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YRelay object, corresponding to
     *         a relay currently online, or a null pointer
     *         if there are no more relays to enumerate.
     */
    nextRelay(): YRelay | null;
    /**
     * Starts the enumeration of relays currently accessible.
     * Use the method YRelay.nextRelay() to iterate on
     * next relays.
     *
     * @return a pointer to a YRelay object, corresponding to
     *         the first relay currently online, or a null pointer
     *         if there are none.
     */
    static FirstRelay(): YRelay | null;
    /**
     * Starts the enumeration of relays currently accessible.
     * Use the method YRelay.nextRelay() to iterate on
     * next relays.
     *
     * @param yctx : a YAPI context.
     *
     * @return a pointer to a YRelay object, corresponding to
     *         the first relay currently online, or a null pointer
     *         if there are none.
     */
    static FirstRelayInContext(yctx: YAPIContext): YRelay | null;
}
export declare namespace YRelay {
    const enum STATE {
        A = 0,
        B = 1,
        INVALID = -1
    }
    const enum STATEATPOWERON {
        UNCHANGED = 0,
        A = 1,
        B = 2,
        INVALID = -1
    }
    const enum OUTPUT {
        OFF = 0,
        ON = 1,
        INVALID = -1
    }
    interface DelayedPulse {
        target?: number;
        ms?: number;
        moving?: number;
    }
    interface ValueCallback {
        (func: YRelay, value: string): void;
    }
}
