/*********************************************************************
 *
 *  $Id: yocto_watchdog.ts 63327 2024-11-13 09:35:03Z seb $
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

import { YAPI, YAPIContext, YErrorMsg, YFunction, YModule, YSensor, YDataLogger, YMeasure } from './yocto_api.js';

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

export class YWatchdog extends YFunction
{
    //--- (YWatchdog attributes declaration)
    _className: string;
    _state: YWatchdog.STATE = YWatchdog.STATE_INVALID;
    _stateAtPowerOn: YWatchdog.STATEATPOWERON = YWatchdog.STATEATPOWERON_INVALID;
    _maxTimeOnStateA: number = YWatchdog.MAXTIMEONSTATEA_INVALID;
    _maxTimeOnStateB: number = YWatchdog.MAXTIMEONSTATEB_INVALID;
    _output: YWatchdog.OUTPUT = YWatchdog.OUTPUT_INVALID;
    _pulseTimer: number = YWatchdog.PULSETIMER_INVALID;
    _delayedPulseTimer: YWatchdog.DelayedPulse = {};
    _countdown: number = YWatchdog.COUNTDOWN_INVALID;
    _autoStart: YWatchdog.AUTOSTART = YWatchdog.AUTOSTART_INVALID;
    _running: YWatchdog.RUNNING = YWatchdog.RUNNING_INVALID;
    _triggerDelay: number = YWatchdog.TRIGGERDELAY_INVALID;
    _triggerDuration: number = YWatchdog.TRIGGERDURATION_INVALID;
    _lastTrigger: number = YWatchdog.LASTTRIGGER_INVALID;
    _valueCallbackWatchdog: YWatchdog.ValueCallback | null = null;
    _firm: number = 0;

    // API symbols as object properties
    public readonly STATE_A: YWatchdog.STATE = 0;
    public readonly STATE_B: YWatchdog.STATE = 1;
    public readonly STATE_INVALID: YWatchdog.STATE = -1;
    public readonly STATEATPOWERON_UNCHANGED: YWatchdog.STATEATPOWERON = 0;
    public readonly STATEATPOWERON_A: YWatchdog.STATEATPOWERON = 1;
    public readonly STATEATPOWERON_B: YWatchdog.STATEATPOWERON = 2;
    public readonly STATEATPOWERON_INVALID: YWatchdog.STATEATPOWERON = -1;
    public readonly MAXTIMEONSTATEA_INVALID: number = YAPI.INVALID_LONG;
    public readonly MAXTIMEONSTATEB_INVALID: number = YAPI.INVALID_LONG;
    public readonly OUTPUT_OFF: YWatchdog.OUTPUT = 0;
    public readonly OUTPUT_ON: YWatchdog.OUTPUT = 1;
    public readonly OUTPUT_INVALID: YWatchdog.OUTPUT = -1;
    public readonly PULSETIMER_INVALID: number = YAPI.INVALID_LONG;
    public readonly COUNTDOWN_INVALID: number = YAPI.INVALID_LONG;
    public readonly AUTOSTART_OFF: YWatchdog.AUTOSTART = 0;
    public readonly AUTOSTART_ON: YWatchdog.AUTOSTART = 1;
    public readonly AUTOSTART_INVALID: YWatchdog.AUTOSTART = -1;
    public readonly RUNNING_OFF: YWatchdog.RUNNING = 0;
    public readonly RUNNING_ON: YWatchdog.RUNNING = 1;
    public readonly RUNNING_INVALID: YWatchdog.RUNNING = -1;
    public readonly TRIGGERDELAY_INVALID: number = YAPI.INVALID_LONG;
    public readonly TRIGGERDURATION_INVALID: number = YAPI.INVALID_LONG;
    public readonly LASTTRIGGER_INVALID: number = YAPI.INVALID_UINT;

    // API symbols as static members
    public static readonly DELAYEDPULSETIMER_INVALID: YWatchdog.DelayedPulse = {};
    public static readonly STATE_A: YWatchdog.STATE = 0;
    public static readonly STATE_B: YWatchdog.STATE = 1;
    public static readonly STATE_INVALID: YWatchdog.STATE = -1;
    public static readonly STATEATPOWERON_UNCHANGED: YWatchdog.STATEATPOWERON = 0;
    public static readonly STATEATPOWERON_A: YWatchdog.STATEATPOWERON = 1;
    public static readonly STATEATPOWERON_B: YWatchdog.STATEATPOWERON = 2;
    public static readonly STATEATPOWERON_INVALID: YWatchdog.STATEATPOWERON = -1;
    public static readonly MAXTIMEONSTATEA_INVALID: number = YAPI.INVALID_LONG;
    public static readonly MAXTIMEONSTATEB_INVALID: number = YAPI.INVALID_LONG;
    public static readonly OUTPUT_OFF: YWatchdog.OUTPUT = 0;
    public static readonly OUTPUT_ON: YWatchdog.OUTPUT = 1;
    public static readonly OUTPUT_INVALID: YWatchdog.OUTPUT = -1;
    public static readonly PULSETIMER_INVALID: number = YAPI.INVALID_LONG;
    public static readonly COUNTDOWN_INVALID: number = YAPI.INVALID_LONG;
    public static readonly AUTOSTART_OFF: YWatchdog.AUTOSTART = 0;
    public static readonly AUTOSTART_ON: YWatchdog.AUTOSTART = 1;
    public static readonly AUTOSTART_INVALID: YWatchdog.AUTOSTART = -1;
    public static readonly RUNNING_OFF: YWatchdog.RUNNING = 0;
    public static readonly RUNNING_ON: YWatchdog.RUNNING = 1;
    public static readonly RUNNING_INVALID: YWatchdog.RUNNING = -1;
    public static readonly TRIGGERDELAY_INVALID: number = YAPI.INVALID_LONG;
    public static readonly TRIGGERDURATION_INVALID: number = YAPI.INVALID_LONG;
    public static readonly LASTTRIGGER_INVALID: number = YAPI.INVALID_UINT;
    //--- (end of YWatchdog attributes declaration)

    constructor(yapi: YAPIContext, func: string)
    {
        //--- (YWatchdog constructor)
        super(yapi, func);
        this._className                  = 'Watchdog';
        //--- (end of YWatchdog constructor)
    }

    //--- (YWatchdog implementation)

    imm_parseAttr(name: string, val: any): number
    {
        switch (name) {
        case 'state':
            this._state = <YWatchdog.STATE> <number> val;
            return 1;
        case 'stateAtPowerOn':
            this._stateAtPowerOn = <YWatchdog.STATEATPOWERON> <number> val;
            return 1;
        case 'maxTimeOnStateA':
            this._maxTimeOnStateA = <number> <number> val;
            return 1;
        case 'maxTimeOnStateB':
            this._maxTimeOnStateB = <number> <number> val;
            return 1;
        case 'output':
            this._output = <YWatchdog.OUTPUT> <number> val;
            return 1;
        case 'pulseTimer':
            this._pulseTimer = <number> <number> val;
            return 1;
        case 'delayedPulseTimer':
            this._delayedPulseTimer = <YWatchdog.DelayedPulse> val;
            return 1;
        case 'countdown':
            this._countdown = <number> <number> val;
            return 1;
        case 'autoStart':
            this._autoStart = <YWatchdog.AUTOSTART> <number> val;
            return 1;
        case 'running':
            this._running = <YWatchdog.RUNNING> <number> val;
            return 1;
        case 'triggerDelay':
            this._triggerDelay = <number> <number> val;
            return 1;
        case 'triggerDuration':
            this._triggerDuration = <number> <number> val;
            return 1;
        case 'lastTrigger':
            this._lastTrigger = <number> <number> val;
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
    async get_state(): Promise<YWatchdog.STATE>
    {
        let res: number;
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
    async set_state(newval: YWatchdog.STATE): Promise<number>
    {
        let rest_val: string;
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
    async get_stateAtPowerOn(): Promise<YWatchdog.STATEATPOWERON>
    {
        let res: number;
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
    async set_stateAtPowerOn(newval: YWatchdog.STATEATPOWERON): Promise<number>
    {
        let rest_val: string;
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
    async get_maxTimeOnStateA(): Promise<number>
    {
        let res: number;
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
    async set_maxTimeOnStateA(newval: number): Promise<number>
    {
        let rest_val: string;
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
    async get_maxTimeOnStateB(): Promise<number>
    {
        let res: number;
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
    async set_maxTimeOnStateB(newval: number): Promise<number>
    {
        let rest_val: string;
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
    async get_output(): Promise<YWatchdog.OUTPUT>
    {
        let res: number;
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
    async set_output(newval: YWatchdog.OUTPUT): Promise<number>
    {
        let rest_val: string;
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
    async get_pulseTimer(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YWatchdog.PULSETIMER_INVALID;
            }
        }
        res = this._pulseTimer;
        return res;
    }

    async set_pulseTimer(newval: number): Promise<number>
    {
        let rest_val: string;
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
    async pulse(ms_duration: number): Promise<number>
    {
        let rest_val: string;
        rest_val = String(ms_duration);
        return await this._setAttr('pulseTimer',rest_val);
    }

    async get_delayedPulseTimer(): Promise<YWatchdog.DelayedPulse>
    {
        let res: YWatchdog.DelayedPulse | null;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YWatchdog.DELAYEDPULSETIMER_INVALID;
            }
        }
        res = this._delayedPulseTimer;
        return res;
    }

    async set_delayedPulseTimer(newval: YWatchdog.DelayedPulse): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval.target)+':'+String(newval.ms);
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
    async delayedPulse(ms_delay: number,ms_duration: number): Promise<number>
    {
        let rest_val: string;
        rest_val = String(ms_delay)+':'+String(ms_duration);
        return await this._setAttr('delayedPulseTimer',rest_val);
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
    async get_countdown(): Promise<number>
    {
        let res: number;
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
    async get_autoStart(): Promise<YWatchdog.AUTOSTART>
    {
        let res: number;
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
    async set_autoStart(newval: YWatchdog.AUTOSTART): Promise<number>
    {
        let rest_val: string;
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
    async get_running(): Promise<YWatchdog.RUNNING>
    {
        let res: number;
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
    async set_running(newval: YWatchdog.RUNNING): Promise<number>
    {
        let rest_val: string;
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
    async resetWatchdog(): Promise<number>
    {
        let rest_val: string;
        rest_val = '1';
        return await this._setAttr('running',rest_val);
    }

    /**
     * Returns  the waiting duration before a reset is automatically triggered by the watchdog, in milliseconds.
     *
     * @return an integer corresponding to  the waiting duration before a reset is automatically triggered
     * by the watchdog, in milliseconds
     *
     * On failure, throws an exception or returns YWatchdog.TRIGGERDELAY_INVALID.
     */
    async get_triggerDelay(): Promise<number>
    {
        let res: number;
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
    async set_triggerDelay(newval: number): Promise<number>
    {
        let rest_val: string;
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
    async get_triggerDuration(): Promise<number>
    {
        let res: number;
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
    async set_triggerDuration(newval: number): Promise<number>
    {
        let rest_val: string;
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
    async get_lastTrigger(): Promise<number>
    {
        let res: number;
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
    static FindWatchdog(func: string): YWatchdog
    {
        let obj: YWatchdog | null;
        obj = <YWatchdog> YFunction._FindFromCache('Watchdog', func);
        if (obj == null) {
            obj = new YWatchdog(YAPI, func);
            YFunction._AddToCache('Watchdog', func, obj);
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
    static FindWatchdogInContext(yctx: YAPIContext, func: string): YWatchdog
    {
        let obj: YWatchdog | null;
        obj = <YWatchdog> YFunction._FindFromCacheInContext(yctx, 'Watchdog', func);
        if (obj == null) {
            obj = new YWatchdog(yctx, func);
            YFunction._AddToCache('Watchdog', func, obj);
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
    async registerValueCallback(callback: YWatchdog.ValueCallback | null): Promise<number>
    {
        let val: string;
        if (callback != null) {
            await YFunction._UpdateValueCallbackList(this, true);
        } else {
            await YFunction._UpdateValueCallbackList(this, false);
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

    async _invokeValueCallback(value: string): Promise<number>
    {
        if (this._valueCallbackWatchdog != null) {
            try {
                await this._valueCallbackWatchdog(this, value);
            } catch (e) {
                this._yapi.imm_log('Exception in valueCallback:', e);
            }
        } else {
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
    async toggle(): Promise<number>
    {
        let sta: number;
        let fw: string;
        let mo: YModule | null;
        if (this._firm == 0) {
            mo = await this.get_module();
            fw = await mo.get_firmwareRelease();
            if (fw == YModule.FIRMWARERELEASE_INVALID) {
                return YWatchdog.STATE_INVALID;
            }
            this._firm = YAPIContext.imm_atoi(fw);
        }
        if (this._firm < 34921) {
            sta = await this.get_state();
            if (sta == YWatchdog.STATE_INVALID) {
                return YWatchdog.STATE_INVALID;
            }
            if (sta == YWatchdog.STATE_B) {
                await this.set_state(YWatchdog.STATE_A);
            } else {
                await this.set_state(YWatchdog.STATE_B);
            }
            return this._yapi.SUCCESS;
        } else {
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
    nextWatchdog(): YWatchdog | null
    {
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != YAPI.SUCCESS) return null;
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, <string> resolve.result);
        if (next_hwid == null) return null;
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
    static FirstWatchdog(): YWatchdog | null
    {
        let next_hwid = YAPI.imm_getFirstHardwareId('Watchdog');
        if (next_hwid == null) return null;
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
    static FirstWatchdogInContext(yctx: YAPIContext): YWatchdog | null
    {
        let next_hwid = yctx.imm_getFirstHardwareId('Watchdog');
        if (next_hwid == null) return null;
        return YWatchdog.FindWatchdogInContext(yctx, next_hwid);
    }

    //--- (end of YWatchdog implementation)
}

export namespace YWatchdog {
    //--- (YWatchdog definitions)
    export const enum STATE
    {
        A = 0,
        B = 1,
        INVALID = -1
    }

    export const enum STATEATPOWERON
    {
        UNCHANGED = 0,
        A = 1,
        B = 2,
        INVALID = -1
    }

    export const enum OUTPUT
    {
        OFF = 0,
        ON = 1,
        INVALID = -1
    }

    export interface DelayedPulse { target?: number; ms?: number; moving?: number;}

    export const enum AUTOSTART
    {
        OFF = 0,
        ON = 1,
        INVALID = -1
    }

    export const enum RUNNING
    {
        OFF = 0,
        ON = 1,
        INVALID = -1
    }

    export interface ValueCallback {(func: YWatchdog, value: string): void}

    //--- (end of YWatchdog definitions)
}

