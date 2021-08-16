/*********************************************************************
 *
 *  $Id: yocto_wakeupmonitor.ts 45843 2021-08-04 07:51:59Z mvuilleu $
 *
 *  Implements the high-level API for WakeUpMonitor functions
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

//--- (YWakeUpMonitor class start)
/**
 * YWakeUpMonitor Class: wake-up monitor control interface, available for instance in the
 * YoctoHub-GSM-2G, the YoctoHub-GSM-3G-EU, the YoctoHub-GSM-4G or the YoctoHub-Wireless-n
 *
 * The YWakeUpMonitor class handles globally all wake-up sources, as well
 * as automated sleep mode.
 */
//--- (end of YWakeUpMonitor class start)

export class YWakeUpMonitor extends YFunction
{
    //--- (YWakeUpMonitor attributes declaration)
    _className: string;
    _powerDuration: number = YWakeUpMonitor.POWERDURATION_INVALID;
    _sleepCountdown: number = YWakeUpMonitor.SLEEPCOUNTDOWN_INVALID;
    _nextWakeUp: number = YWakeUpMonitor.NEXTWAKEUP_INVALID;
    _wakeUpReason: YWakeUpMonitor.WAKEUPREASON = YWakeUpMonitor.WAKEUPREASON_INVALID;
    _wakeUpState: YWakeUpMonitor.WAKEUPSTATE = YWakeUpMonitor.WAKEUPSTATE_INVALID;
    _rtcTime: number = YWakeUpMonitor.RTCTIME_INVALID;
    _endOfTime: number = 2145960000;
    _valueCallbackWakeUpMonitor: YWakeUpMonitor.ValueCallback | null = null;

    // API symbols as object properties
    public readonly POWERDURATION_INVALID: number = YAPI.INVALID_UINT;
    public readonly SLEEPCOUNTDOWN_INVALID: number = YAPI.INVALID_UINT;
    public readonly NEXTWAKEUP_INVALID: number = YAPI.INVALID_LONG;
    public readonly WAKEUPREASON_USBPOWER: YWakeUpMonitor.WAKEUPREASON = 0;
    public readonly WAKEUPREASON_EXTPOWER: YWakeUpMonitor.WAKEUPREASON = 1;
    public readonly WAKEUPREASON_ENDOFSLEEP: YWakeUpMonitor.WAKEUPREASON = 2;
    public readonly WAKEUPREASON_EXTSIG1: YWakeUpMonitor.WAKEUPREASON = 3;
    public readonly WAKEUPREASON_SCHEDULE1: YWakeUpMonitor.WAKEUPREASON = 4;
    public readonly WAKEUPREASON_SCHEDULE2: YWakeUpMonitor.WAKEUPREASON = 5;
    public readonly WAKEUPREASON_INVALID: YWakeUpMonitor.WAKEUPREASON = -1;
    public readonly WAKEUPSTATE_SLEEPING: YWakeUpMonitor.WAKEUPSTATE = 0;
    public readonly WAKEUPSTATE_AWAKE: YWakeUpMonitor.WAKEUPSTATE = 1;
    public readonly WAKEUPSTATE_INVALID: YWakeUpMonitor.WAKEUPSTATE = -1;
    public readonly RTCTIME_INVALID: number = YAPI.INVALID_LONG;

    // API symbols as static members
    public static readonly POWERDURATION_INVALID: number = YAPI.INVALID_UINT;
    public static readonly SLEEPCOUNTDOWN_INVALID: number = YAPI.INVALID_UINT;
    public static readonly NEXTWAKEUP_INVALID: number = YAPI.INVALID_LONG;
    public static readonly WAKEUPREASON_USBPOWER: YWakeUpMonitor.WAKEUPREASON = 0;
    public static readonly WAKEUPREASON_EXTPOWER: YWakeUpMonitor.WAKEUPREASON = 1;
    public static readonly WAKEUPREASON_ENDOFSLEEP: YWakeUpMonitor.WAKEUPREASON = 2;
    public static readonly WAKEUPREASON_EXTSIG1: YWakeUpMonitor.WAKEUPREASON = 3;
    public static readonly WAKEUPREASON_SCHEDULE1: YWakeUpMonitor.WAKEUPREASON = 4;
    public static readonly WAKEUPREASON_SCHEDULE2: YWakeUpMonitor.WAKEUPREASON = 5;
    public static readonly WAKEUPREASON_INVALID: YWakeUpMonitor.WAKEUPREASON = -1;
    public static readonly WAKEUPSTATE_SLEEPING: YWakeUpMonitor.WAKEUPSTATE = 0;
    public static readonly WAKEUPSTATE_AWAKE: YWakeUpMonitor.WAKEUPSTATE = 1;
    public static readonly WAKEUPSTATE_INVALID: YWakeUpMonitor.WAKEUPSTATE = -1;
    public static readonly RTCTIME_INVALID: number = YAPI.INVALID_LONG;
    //--- (end of YWakeUpMonitor attributes declaration)

    constructor(yapi: YAPIContext, func: string)
    {
        //--- (YWakeUpMonitor constructor)
        super(yapi, func);
        this._className                  = 'WakeUpMonitor';
        //--- (end of YWakeUpMonitor constructor)
    }

    //--- (YWakeUpMonitor implementation)

    imm_parseAttr(name: string, val: any)
    {
        switch(name) {
        case 'powerDuration':
            this._powerDuration = <number> <number> val;
            return 1;
        case 'sleepCountdown':
            this._sleepCountdown = <number> <number> val;
            return 1;
        case 'nextWakeUp':
            this._nextWakeUp = <number> <number> val;
            return 1;
        case 'wakeUpReason':
            this._wakeUpReason = <YWakeUpMonitor.WAKEUPREASON> <number> val;
            return 1;
        case 'wakeUpState':
            this._wakeUpState = <YWakeUpMonitor.WAKEUPSTATE> <number> val;
            return 1;
        case 'rtcTime':
            this._rtcTime = <number> <number> val;
            return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Returns the maximal wake up time (in seconds) before automatically going to sleep.
     *
     * @return an integer corresponding to the maximal wake up time (in seconds) before automatically going to sleep
     *
     * On failure, throws an exception or returns YWakeUpMonitor.POWERDURATION_INVALID.
     */
    async get_powerDuration(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YWakeUpMonitor.POWERDURATION_INVALID;
            }
        }
        res = this._powerDuration;
        return res;
    }

    /**
     * Changes the maximal wake up time (seconds) before automatically going to sleep.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : an integer corresponding to the maximal wake up time (seconds) before automatically
     * going to sleep
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_powerDuration(newval: number): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('powerDuration',rest_val);
    }

    /**
     * Returns the delay before the  next sleep period.
     *
     * @return an integer corresponding to the delay before the  next sleep period
     *
     * On failure, throws an exception or returns YWakeUpMonitor.SLEEPCOUNTDOWN_INVALID.
     */
    async get_sleepCountdown(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YWakeUpMonitor.SLEEPCOUNTDOWN_INVALID;
            }
        }
        res = this._sleepCountdown;
        return res;
    }

    /**
     * Changes the delay before the next sleep period.
     *
     * @param newval : an integer corresponding to the delay before the next sleep period
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_sleepCountdown(newval: number): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('sleepCountdown',rest_val);
    }

    /**
     * Returns the next scheduled wake up date/time (UNIX format).
     *
     * @return an integer corresponding to the next scheduled wake up date/time (UNIX format)
     *
     * On failure, throws an exception or returns YWakeUpMonitor.NEXTWAKEUP_INVALID.
     */
    async get_nextWakeUp(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YWakeUpMonitor.NEXTWAKEUP_INVALID;
            }
        }
        res = this._nextWakeUp;
        return res;
    }

    /**
     * Changes the days of the week when a wake up must take place.
     *
     * @param newval : an integer corresponding to the days of the week when a wake up must take place
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_nextWakeUp(newval: number): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('nextWakeUp',rest_val);
    }

    /**
     * Returns the latest wake up reason.
     *
     * @return a value among YWakeUpMonitor.WAKEUPREASON_USBPOWER, YWakeUpMonitor.WAKEUPREASON_EXTPOWER,
     * YWakeUpMonitor.WAKEUPREASON_ENDOFSLEEP, YWakeUpMonitor.WAKEUPREASON_EXTSIG1,
     * YWakeUpMonitor.WAKEUPREASON_SCHEDULE1 and YWakeUpMonitor.WAKEUPREASON_SCHEDULE2 corresponding to
     * the latest wake up reason
     *
     * On failure, throws an exception or returns YWakeUpMonitor.WAKEUPREASON_INVALID.
     */
    async get_wakeUpReason(): Promise<YWakeUpMonitor.WAKEUPREASON>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YWakeUpMonitor.WAKEUPREASON_INVALID;
            }
        }
        res = this._wakeUpReason;
        return res;
    }

    /**
     * Returns  the current state of the monitor.
     *
     * @return either YWakeUpMonitor.WAKEUPSTATE_SLEEPING or YWakeUpMonitor.WAKEUPSTATE_AWAKE, according
     * to  the current state of the monitor
     *
     * On failure, throws an exception or returns YWakeUpMonitor.WAKEUPSTATE_INVALID.
     */
    async get_wakeUpState(): Promise<YWakeUpMonitor.WAKEUPSTATE>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YWakeUpMonitor.WAKEUPSTATE_INVALID;
            }
        }
        res = this._wakeUpState;
        return res;
    }

    async set_wakeUpState(newval: YWakeUpMonitor.WAKEUPSTATE): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('wakeUpState',rest_val);
    }

    async get_rtcTime(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YWakeUpMonitor.RTCTIME_INVALID;
            }
        }
        res = this._rtcTime;
        return res;
    }

    /**
     * Retrieves a wake-up monitor for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the wake-up monitor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YWakeUpMonitor.isOnline() to test if the wake-up monitor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a wake-up monitor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the wake-up monitor, for instance
     *         YHUBGSM1.wakeUpMonitor.
     *
     * @return a YWakeUpMonitor object allowing you to drive the wake-up monitor.
     */
    static FindWakeUpMonitor(func: string): YWakeUpMonitor
    {
        let obj: YWakeUpMonitor;
        obj = <YWakeUpMonitor> YFunction._FindFromCache('WakeUpMonitor', func);
        if (obj == null) {
            obj = new YWakeUpMonitor(YAPI, func);
            YFunction._AddToCache('WakeUpMonitor',  func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a wake-up monitor for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the wake-up monitor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YWakeUpMonitor.isOnline() to test if the wake-up monitor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a wake-up monitor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx : a YAPI context
     * @param func : a string that uniquely characterizes the wake-up monitor, for instance
     *         YHUBGSM1.wakeUpMonitor.
     *
     * @return a YWakeUpMonitor object allowing you to drive the wake-up monitor.
     */
    static FindWakeUpMonitorInContext(yctx: YAPIContext, func: string): YWakeUpMonitor
    {
        let obj: YWakeUpMonitor;
        obj = <YWakeUpMonitor> YFunction._FindFromCacheInContext(yctx,  'WakeUpMonitor', func);
        if (obj == null) {
            obj = new YWakeUpMonitor(yctx, func);
            YFunction._AddToCache('WakeUpMonitor',  func, obj);
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
    async registerValueCallback(callback: YWakeUpMonitor.ValueCallback | null): Promise<number>
    {
        let val: string;
        if (callback != null) {
            await YFunction._UpdateValueCallbackList(this, true);
        } else {
            await YFunction._UpdateValueCallbackList(this, false);
        }
        this._valueCallbackWakeUpMonitor = callback;
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
        if (this._valueCallbackWakeUpMonitor != null) {
            try {
                await this._valueCallbackWakeUpMonitor(this, value);
            } catch (e) {
                this._yapi.imm_log('Exception in valueCallback:', e);
            }
        } else {
            super._invokeValueCallback(value);
        }
        return 0;
    }

    /**
     * Forces a wake up.
     */
    async wakeUp(): Promise<number>
    {
        return await this.set_wakeUpState(YWakeUpMonitor.WAKEUPSTATE_AWAKE);
    }

    /**
     * Goes to sleep until the next wake up condition is met,  the
     * RTC time must have been set before calling this function.
     *
     * @param secBeforeSleep : number of seconds before going into sleep mode,
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async sleep(secBeforeSleep: number): Promise<number>
    {
        let currTime: number;
        currTime = await this.get_rtcTime();
        if (!(currTime != 0)) {
            return this._throw(this._yapi.RTC_NOT_READY,'RTC time not set',this._yapi.RTC_NOT_READY);
        }
        await this.set_nextWakeUp(this._endOfTime);
        await this.set_sleepCountdown(secBeforeSleep);
        return this._yapi.SUCCESS;
    }

    /**
     * Goes to sleep for a specific duration or until the next wake up condition is met, the
     * RTC time must have been set before calling this function. The count down before sleep
     * can be canceled with resetSleepCountDown.
     *
     * @param secUntilWakeUp : number of seconds before next wake up
     * @param secBeforeSleep : number of seconds before going into sleep mode
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async sleepFor(secUntilWakeUp: number, secBeforeSleep: number): Promise<number>
    {
        let currTime: number;
        currTime = await this.get_rtcTime();
        if (!(currTime != 0)) {
            return this._throw(this._yapi.RTC_NOT_READY,'RTC time not set',this._yapi.RTC_NOT_READY);
        }
        await this.set_nextWakeUp(currTime+secUntilWakeUp);
        await this.set_sleepCountdown(secBeforeSleep);
        return this._yapi.SUCCESS;
    }

    /**
     * Go to sleep until a specific date is reached or until the next wake up condition is met, the
     * RTC time must have been set before calling this function. The count down before sleep
     * can be canceled with resetSleepCountDown.
     *
     * @param wakeUpTime : wake-up datetime (UNIX format)
     * @param secBeforeSleep : number of seconds before going into sleep mode
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async sleepUntil(wakeUpTime: number, secBeforeSleep: number): Promise<number>
    {
        let currTime: number;
        currTime = await this.get_rtcTime();
        if (!(currTime != 0)) {
            return this._throw(this._yapi.RTC_NOT_READY,'RTC time not set',this._yapi.RTC_NOT_READY);
        }
        await this.set_nextWakeUp(wakeUpTime);
        await this.set_sleepCountdown(secBeforeSleep);
        return this._yapi.SUCCESS;
    }

    /**
     * Resets the sleep countdown.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    async resetSleepCountDown(): Promise<number>
    {
        await this.set_sleepCountdown(0);
        await this.set_nextWakeUp(0);
        return this._yapi.SUCCESS;
    }

    /**
     * Continues the enumeration of wake-up monitors started using yFirstWakeUpMonitor().
     * Caution: You can't make any assumption about the returned wake-up monitors order.
     * If you want to find a specific a wake-up monitor, use WakeUpMonitor.findWakeUpMonitor()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YWakeUpMonitor object, corresponding to
     *         a wake-up monitor currently online, or a null pointer
     *         if there are no more wake-up monitors to enumerate.
     */
    nextWakeUpMonitor(): YWakeUpMonitor | null
    {
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI.SUCCESS) return null;
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, <string> resolve.result);
        if(next_hwid == null) return null;
        return YWakeUpMonitor.FindWakeUpMonitorInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of wake-up monitors currently accessible.
     * Use the method YWakeUpMonitor.nextWakeUpMonitor() to iterate on
     * next wake-up monitors.
     *
     * @return a pointer to a YWakeUpMonitor object, corresponding to
     *         the first wake-up monitor currently online, or a null pointer
     *         if there are none.
     */
    static FirstWakeUpMonitor(): YWakeUpMonitor | null
    {
        let next_hwid = YAPI.imm_getFirstHardwareId('WakeUpMonitor');
        if(next_hwid == null) return null;
        return YWakeUpMonitor.FindWakeUpMonitor(next_hwid);
    }

    /**
     * Starts the enumeration of wake-up monitors currently accessible.
     * Use the method YWakeUpMonitor.nextWakeUpMonitor() to iterate on
     * next wake-up monitors.
     *
     * @param yctx : a YAPI context.
     *
     * @return a pointer to a YWakeUpMonitor object, corresponding to
     *         the first wake-up monitor currently online, or a null pointer
     *         if there are none.
     */
    static FirstWakeUpMonitorInContext(yctx: YAPIContext): YWakeUpMonitor | null
    {
        let next_hwid = yctx.imm_getFirstHardwareId('WakeUpMonitor');
        if(next_hwid == null) return null;
        return YWakeUpMonitor.FindWakeUpMonitorInContext(yctx, next_hwid);
    }

    //--- (end of YWakeUpMonitor implementation)
}

export namespace YWakeUpMonitor {
    //--- (YWakeUpMonitor definitions)
    export const enum WAKEUPREASON {
        USBPOWER = 0,
        EXTPOWER = 1,
        ENDOFSLEEP = 2,
        EXTSIG1 = 3,
        SCHEDULE1 = 4,
        SCHEDULE2 = 5,
        INVALID = -1
    }
    export const enum WAKEUPSTATE {
        SLEEPING = 0,
        AWAKE = 1,
        INVALID = -1
    }
    export interface ValueCallback { (func: YWakeUpMonitor, value: string): void }
    //--- (end of YWakeUpMonitor definitions)
}

