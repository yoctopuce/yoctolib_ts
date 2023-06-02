/*********************************************************************
 *
 *  $Id: yocto_watchdog.ts 54279 2023-04-28 10:11:03Z seb $
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
import { YAPIContext, YFunction } from './yocto_api.js';
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
export declare class YWatchdog extends YFunction {
    _className: string;
    _state: YWatchdog.STATE;
    _stateAtPowerOn: YWatchdog.STATEATPOWERON;
    _maxTimeOnStateA: number;
    _maxTimeOnStateB: number;
    _output: YWatchdog.OUTPUT;
    _pulseTimer: number;
    _delayedPulseTimer: YWatchdog.DelayedPulse;
    _countdown: number;
    _autoStart: YWatchdog.AUTOSTART;
    _running: YWatchdog.RUNNING;
    _triggerDelay: number;
    _triggerDuration: number;
    _lastTrigger: number;
    _valueCallbackWatchdog: YWatchdog.ValueCallback | null;
    _firm: number;
    readonly STATE_A: YWatchdog.STATE;
    readonly STATE_B: YWatchdog.STATE;
    readonly STATE_INVALID: YWatchdog.STATE;
    readonly STATEATPOWERON_UNCHANGED: YWatchdog.STATEATPOWERON;
    readonly STATEATPOWERON_A: YWatchdog.STATEATPOWERON;
    readonly STATEATPOWERON_B: YWatchdog.STATEATPOWERON;
    readonly STATEATPOWERON_INVALID: YWatchdog.STATEATPOWERON;
    readonly MAXTIMEONSTATEA_INVALID: number;
    readonly MAXTIMEONSTATEB_INVALID: number;
    readonly OUTPUT_OFF: YWatchdog.OUTPUT;
    readonly OUTPUT_ON: YWatchdog.OUTPUT;
    readonly OUTPUT_INVALID: YWatchdog.OUTPUT;
    readonly PULSETIMER_INVALID: number;
    readonly COUNTDOWN_INVALID: number;
    readonly AUTOSTART_OFF: YWatchdog.AUTOSTART;
    readonly AUTOSTART_ON: YWatchdog.AUTOSTART;
    readonly AUTOSTART_INVALID: YWatchdog.AUTOSTART;
    readonly RUNNING_OFF: YWatchdog.RUNNING;
    readonly RUNNING_ON: YWatchdog.RUNNING;
    readonly RUNNING_INVALID: YWatchdog.RUNNING;
    readonly TRIGGERDELAY_INVALID: number;
    readonly TRIGGERDURATION_INVALID: number;
    readonly LASTTRIGGER_INVALID: number;
    static readonly DELAYEDPULSETIMER_INVALID: YWatchdog.DelayedPulse;
    static readonly STATE_A: YWatchdog.STATE;
    static readonly STATE_B: YWatchdog.STATE;
    static readonly STATE_INVALID: YWatchdog.STATE;
    static readonly STATEATPOWERON_UNCHANGED: YWatchdog.STATEATPOWERON;
    static readonly STATEATPOWERON_A: YWatchdog.STATEATPOWERON;
    static readonly STATEATPOWERON_B: YWatchdog.STATEATPOWERON;
    static readonly STATEATPOWERON_INVALID: YWatchdog.STATEATPOWERON;
    static readonly MAXTIMEONSTATEA_INVALID: number;
    static readonly MAXTIMEONSTATEB_INVALID: number;
    static readonly OUTPUT_OFF: YWatchdog.OUTPUT;
    static readonly OUTPUT_ON: YWatchdog.OUTPUT;
    static readonly OUTPUT_INVALID: YWatchdog.OUTPUT;
    static readonly PULSETIMER_INVALID: number;
    static readonly COUNTDOWN_INVALID: number;
    static readonly AUTOSTART_OFF: YWatchdog.AUTOSTART;
    static readonly AUTOSTART_ON: YWatchdog.AUTOSTART;
    static readonly AUTOSTART_INVALID: YWatchdog.AUTOSTART;
    static readonly RUNNING_OFF: YWatchdog.RUNNING;
    static readonly RUNNING_ON: YWatchdog.RUNNING;
    static readonly RUNNING_INVALID: YWatchdog.RUNNING;
    static readonly TRIGGERDELAY_INVALID: number;
    static readonly TRIGGERDURATION_INVALID: number;
    static readonly LASTTRIGGER_INVALID: number;
    constructor(yapi: YAPIContext, func: string);
    imm_parseAttr(name: string, val: any): 0 | 1;
    /**
     * Returns the state of the watchdog (A for the idle position, B for the active position).
     *
     * @return either YWatchdog.STATE_A or YWatchdog.STATE_B, according to the state of the watchdog (A
     * for the idle position, B for the active position)
     *
     * On failure, throws an exception or returns YWatchdog.STATE_INVALID.
     */
    get_state(): Promise<YWatchdog.STATE>;
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
    set_state(newval: YWatchdog.STATE): Promise<number>;
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
    get_stateAtPowerOn(): Promise<YWatchdog.STATEATPOWERON>;
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
    set_stateAtPowerOn(newval: YWatchdog.STATEATPOWERON): Promise<number>;
    /**
     * Returns the maximum time (ms) allowed for the watchdog to stay in state
     * A before automatically switching back in to B state. Zero means no time limit.
     *
     * @return an integer corresponding to the maximum time (ms) allowed for the watchdog to stay in state
     *         A before automatically switching back in to B state
     *
     * On failure, throws an exception or returns YWatchdog.MAXTIMEONSTATEA_INVALID.
     */
    get_maxTimeOnStateA(): Promise<number>;
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
    set_maxTimeOnStateA(newval: number): Promise<number>;
    /**
     * Retourne the maximum time (ms) allowed for the watchdog to stay in state B
     * before automatically switching back in to A state. Zero means no time limit.
     *
     * @return an integer
     *
     * On failure, throws an exception or returns YWatchdog.MAXTIMEONSTATEB_INVALID.
     */
    get_maxTimeOnStateB(): Promise<number>;
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
    set_maxTimeOnStateB(newval: number): Promise<number>;
    /**
     * Returns the output state of the watchdog, when used as a simple switch (single throw).
     *
     * @return either YWatchdog.OUTPUT_OFF or YWatchdog.OUTPUT_ON, according to the output state of the
     * watchdog, when used as a simple switch (single throw)
     *
     * On failure, throws an exception or returns YWatchdog.OUTPUT_INVALID.
     */
    get_output(): Promise<YWatchdog.OUTPUT>;
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
    set_output(newval: YWatchdog.OUTPUT): Promise<number>;
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
    get_delayedPulseTimer(): Promise<YWatchdog.DelayedPulse>;
    set_delayedPulseTimer(newval: YWatchdog.DelayedPulse): Promise<number>;
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
     * On failure, throws an exception or returns YWatchdog.COUNTDOWN_INVALID.
     */
    get_countdown(): Promise<number>;
    /**
     * Returns the watchdog running state at module power on.
     *
     * @return either YWatchdog.AUTOSTART_OFF or YWatchdog.AUTOSTART_ON, according to the watchdog running
     * state at module power on
     *
     * On failure, throws an exception or returns YWatchdog.AUTOSTART_INVALID.
     */
    get_autoStart(): Promise<YWatchdog.AUTOSTART>;
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
    set_autoStart(newval: YWatchdog.AUTOSTART): Promise<number>;
    /**
     * Returns the watchdog running state.
     *
     * @return either YWatchdog.RUNNING_OFF or YWatchdog.RUNNING_ON, according to the watchdog running state
     *
     * On failure, throws an exception or returns YWatchdog.RUNNING_INVALID.
     */
    get_running(): Promise<YWatchdog.RUNNING>;
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
    set_running(newval: YWatchdog.RUNNING): Promise<number>;
    /**
     * Resets the watchdog. When the watchdog is running, this function
     * must be called on a regular basis to prevent the watchdog to
     * trigger
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    resetWatchdog(): Promise<number>;
    /**
     * Returns  the waiting duration before a reset is automatically triggered by the watchdog, in milliseconds.
     *
     * @return an integer corresponding to  the waiting duration before a reset is automatically triggered
     * by the watchdog, in milliseconds
     *
     * On failure, throws an exception or returns YWatchdog.TRIGGERDELAY_INVALID.
     */
    get_triggerDelay(): Promise<number>;
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
    set_triggerDelay(newval: number): Promise<number>;
    /**
     * Returns the duration of resets caused by the watchdog, in milliseconds.
     *
     * @return an integer corresponding to the duration of resets caused by the watchdog, in milliseconds
     *
     * On failure, throws an exception or returns YWatchdog.TRIGGERDURATION_INVALID.
     */
    get_triggerDuration(): Promise<number>;
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
    set_triggerDuration(newval: number): Promise<number>;
    /**
     * Returns the number of seconds spent since the last output power-up event.
     *
     * @return an integer corresponding to the number of seconds spent since the last output power-up event
     *
     * On failure, throws an exception or returns YWatchdog.LASTTRIGGER_INVALID.
     */
    get_lastTrigger(): Promise<number>;
    /**
     * Retrieves a watchdog for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
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
    static FindWatchdog(func: string): YWatchdog;
    /**
     * Retrieves a watchdog for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
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
    static FindWatchdogInContext(yctx: YAPIContext, func: string): YWatchdog;
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
    registerValueCallback(callback: YWatchdog.ValueCallback | null): Promise<number>;
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
     * Continues the enumeration of watchdog started using yFirstWatchdog().
     * Caution: You can't make any assumption about the returned watchdog order.
     * If you want to find a specific a watchdog, use Watchdog.findWatchdog()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YWatchdog object, corresponding to
     *         a watchdog currently online, or a null pointer
     *         if there are no more watchdog to enumerate.
     */
    nextWatchdog(): YWatchdog | null;
    /**
     * Starts the enumeration of watchdog currently accessible.
     * Use the method YWatchdog.nextWatchdog() to iterate on
     * next watchdog.
     *
     * @return a pointer to a YWatchdog object, corresponding to
     *         the first watchdog currently online, or a null pointer
     *         if there are none.
     */
    static FirstWatchdog(): YWatchdog | null;
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
    static FirstWatchdogInContext(yctx: YAPIContext): YWatchdog | null;
}
export declare namespace YWatchdog {
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
    const enum AUTOSTART {
        OFF = 0,
        ON = 1,
        INVALID = -1
    }
    const enum RUNNING {
        OFF = 0,
        ON = 1,
        INVALID = -1
    }
    interface ValueCallback {
        (func: YWatchdog, value: string): void;
    }
}
