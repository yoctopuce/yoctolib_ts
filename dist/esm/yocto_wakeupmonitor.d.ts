/*********************************************************************
 *
 *  $Id: svn_id $
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
import { YAPIContext, YFunction } from './yocto_api.js';
/**
 * YWakeUpMonitor Class: wake-up monitor control interface, available for instance in the
 * YoctoHub-GSM-4G, the YoctoHub-Wireless-SR, the YoctoHub-Wireless-g or the YoctoHub-Wireless-n
 *
 * The YWakeUpMonitor class handles globally all wake-up sources, as well
 * as automated sleep mode.
 */
export declare class YWakeUpMonitor extends YFunction {
    _className: string;
    _powerDuration: number;
    _sleepCountdown: number;
    _nextWakeUp: number;
    _wakeUpReason: YWakeUpMonitor.WAKEUPREASON;
    _wakeUpState: YWakeUpMonitor.WAKEUPSTATE;
    _rtcTime: number;
    _endOfTime: number;
    _valueCallbackWakeUpMonitor: YWakeUpMonitor.ValueCallback | null;
    readonly POWERDURATION_INVALID: number;
    readonly SLEEPCOUNTDOWN_INVALID: number;
    readonly NEXTWAKEUP_INVALID: number;
    readonly WAKEUPREASON_USBPOWER: YWakeUpMonitor.WAKEUPREASON;
    readonly WAKEUPREASON_EXTPOWER: YWakeUpMonitor.WAKEUPREASON;
    readonly WAKEUPREASON_ENDOFSLEEP: YWakeUpMonitor.WAKEUPREASON;
    readonly WAKEUPREASON_EXTSIG1: YWakeUpMonitor.WAKEUPREASON;
    readonly WAKEUPREASON_SCHEDULE1: YWakeUpMonitor.WAKEUPREASON;
    readonly WAKEUPREASON_SCHEDULE2: YWakeUpMonitor.WAKEUPREASON;
    readonly WAKEUPREASON_SCHEDULE3: YWakeUpMonitor.WAKEUPREASON;
    readonly WAKEUPREASON_INVALID: YWakeUpMonitor.WAKEUPREASON;
    readonly WAKEUPSTATE_SLEEPING: YWakeUpMonitor.WAKEUPSTATE;
    readonly WAKEUPSTATE_AWAKE: YWakeUpMonitor.WAKEUPSTATE;
    readonly WAKEUPSTATE_INVALID: YWakeUpMonitor.WAKEUPSTATE;
    readonly RTCTIME_INVALID: number;
    static readonly POWERDURATION_INVALID: number;
    static readonly SLEEPCOUNTDOWN_INVALID: number;
    static readonly NEXTWAKEUP_INVALID: number;
    static readonly WAKEUPREASON_USBPOWER: YWakeUpMonitor.WAKEUPREASON;
    static readonly WAKEUPREASON_EXTPOWER: YWakeUpMonitor.WAKEUPREASON;
    static readonly WAKEUPREASON_ENDOFSLEEP: YWakeUpMonitor.WAKEUPREASON;
    static readonly WAKEUPREASON_EXTSIG1: YWakeUpMonitor.WAKEUPREASON;
    static readonly WAKEUPREASON_SCHEDULE1: YWakeUpMonitor.WAKEUPREASON;
    static readonly WAKEUPREASON_SCHEDULE2: YWakeUpMonitor.WAKEUPREASON;
    static readonly WAKEUPREASON_SCHEDULE3: YWakeUpMonitor.WAKEUPREASON;
    static readonly WAKEUPREASON_INVALID: YWakeUpMonitor.WAKEUPREASON;
    static readonly WAKEUPSTATE_SLEEPING: YWakeUpMonitor.WAKEUPSTATE;
    static readonly WAKEUPSTATE_AWAKE: YWakeUpMonitor.WAKEUPSTATE;
    static readonly WAKEUPSTATE_INVALID: YWakeUpMonitor.WAKEUPSTATE;
    static readonly RTCTIME_INVALID: number;
    constructor(yapi: YAPIContext, func: string);
    imm_parseAttr(name: string, val: any): number;
    /**
     * Returns the maximal wake up time (in seconds) before automatically going to sleep.
     *
     * @return an integer corresponding to the maximal wake up time (in seconds) before automatically going to sleep
     *
     * On failure, throws an exception or returns YWakeUpMonitor.POWERDURATION_INVALID.
     */
    get_powerDuration(): Promise<number>;
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
    set_powerDuration(newval: number): Promise<number>;
    /**
     * Returns the delay before the  next sleep period.
     *
     * @return an integer corresponding to the delay before the  next sleep period
     *
     * On failure, throws an exception or returns YWakeUpMonitor.SLEEPCOUNTDOWN_INVALID.
     */
    get_sleepCountdown(): Promise<number>;
    /**
     * Changes the delay before the next sleep period.
     *
     * @param newval : an integer corresponding to the delay before the next sleep period
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_sleepCountdown(newval: number): Promise<number>;
    /**
     * Returns the next scheduled wake up date/time (UNIX format).
     *
     * @return an integer corresponding to the next scheduled wake up date/time (UNIX format)
     *
     * On failure, throws an exception or returns YWakeUpMonitor.NEXTWAKEUP_INVALID.
     */
    get_nextWakeUp(): Promise<number>;
    /**
     * Changes the days of the week when a wake up must take place.
     *
     * @param newval : an integer corresponding to the days of the week when a wake up must take place
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_nextWakeUp(newval: number): Promise<number>;
    /**
     * Returns the latest wake up reason.
     *
     * @return a value among YWakeUpMonitor.WAKEUPREASON_USBPOWER, YWakeUpMonitor.WAKEUPREASON_EXTPOWER,
     * YWakeUpMonitor.WAKEUPREASON_ENDOFSLEEP, YWakeUpMonitor.WAKEUPREASON_EXTSIG1,
     * YWakeUpMonitor.WAKEUPREASON_SCHEDULE1, YWakeUpMonitor.WAKEUPREASON_SCHEDULE2 and
     * YWakeUpMonitor.WAKEUPREASON_SCHEDULE3 corresponding to the latest wake up reason
     *
     * On failure, throws an exception or returns YWakeUpMonitor.WAKEUPREASON_INVALID.
     */
    get_wakeUpReason(): Promise<YWakeUpMonitor.WAKEUPREASON>;
    /**
     * Returns  the current state of the monitor.
     *
     * @return either YWakeUpMonitor.WAKEUPSTATE_SLEEPING or YWakeUpMonitor.WAKEUPSTATE_AWAKE, according
     * to  the current state of the monitor
     *
     * On failure, throws an exception or returns YWakeUpMonitor.WAKEUPSTATE_INVALID.
     */
    get_wakeUpState(): Promise<YWakeUpMonitor.WAKEUPSTATE>;
    set_wakeUpState(newval: YWakeUpMonitor.WAKEUPSTATE): Promise<number>;
    get_rtcTime(): Promise<number>;
    /**
     * Retrieves a wake-up monitor for a given identifier.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
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
     *         YHUBGSM5.wakeUpMonitor.
     *
     * @return a YWakeUpMonitor object allowing you to drive the wake-up monitor.
     */
    static FindWakeUpMonitor(func: string): YWakeUpMonitor;
    /**
     * Retrieves a wake-up monitor for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
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
     *         YHUBGSM5.wakeUpMonitor.
     *
     * @return a YWakeUpMonitor object allowing you to drive the wake-up monitor.
     */
    static FindWakeUpMonitorInContext(yctx: YAPIContext, func: string): YWakeUpMonitor;
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
    registerValueCallback(callback: YWakeUpMonitor.ValueCallback | null): Promise<number>;
    _invokeValueCallback(value: string): Promise<number>;
    /**
     * Forces a wake up.
     */
    wakeUp(): Promise<number>;
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
    sleep(secBeforeSleep: number): Promise<number>;
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
    sleepFor(secUntilWakeUp: number, secBeforeSleep: number): Promise<number>;
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
    sleepUntil(wakeUpTime: number, secBeforeSleep: number): Promise<number>;
    /**
     * Resets the sleep countdown.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    resetSleepCountDown(): Promise<number>;
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
    nextWakeUpMonitor(): YWakeUpMonitor | null;
    /**
     * Starts the enumeration of wake-up monitors currently accessible.
     * Use the method YWakeUpMonitor.nextWakeUpMonitor() to iterate on
     * next wake-up monitors.
     *
     * @return a pointer to a YWakeUpMonitor object, corresponding to
     *         the first wake-up monitor currently online, or a null pointer
     *         if there are none.
     */
    static FirstWakeUpMonitor(): YWakeUpMonitor | null;
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
    static FirstWakeUpMonitorInContext(yctx: YAPIContext): YWakeUpMonitor | null;
}
export declare namespace YWakeUpMonitor {
    const enum WAKEUPREASON {
        USBPOWER = 0,
        EXTPOWER = 1,
        ENDOFSLEEP = 2,
        EXTSIG1 = 3,
        SCHEDULE1 = 4,
        SCHEDULE2 = 5,
        SCHEDULE3 = 6,
        INVALID = -1
    }
    const enum WAKEUPSTATE {
        SLEEPING = 0,
        AWAKE = 1,
        INVALID = -1
    }
    interface ValueCallback {
        (func: YWakeUpMonitor, value: string): void;
    }
}
