/*********************************************************************
 *
 *  $Id: yocto_realtimeclock.ts 50595 2022-07-28 07:54:15Z mvuilleu $
 *
 *  Implements the high-level API for RealTimeClock functions
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
 * YRealTimeClock Class: real-time clock control interface, available for instance in the
 * YoctoHub-GSM-4G, the YoctoHub-Wireless-SR, the YoctoHub-Wireless-g or the YoctoHub-Wireless-n
 *
 * The YRealTimeClock class provide access to the embedded real-time clock available on some Yoctopuce
 * devices. It can provide current date and time, even after a power outage
 * lasting several days. It is the base for automated wake-up functions provided by the WakeUpScheduler.
 * The current time may represent a local time as well as an UTC time, but no automatic time change
 * will occur to account for daylight saving time.
 */
export declare class YRealTimeClock extends YFunction {
    _className: string;
    _unixTime: number;
    _dateTime: string;
    _utcOffset: number;
    _timeSet: YRealTimeClock.TIMESET;
    _disableHostSync: YRealTimeClock.DISABLEHOSTSYNC;
    _valueCallbackRealTimeClock: YRealTimeClock.ValueCallback | null;
    readonly UNIXTIME_INVALID: number;
    readonly DATETIME_INVALID: string;
    readonly UTCOFFSET_INVALID: number;
    readonly TIMESET_FALSE: YRealTimeClock.TIMESET;
    readonly TIMESET_TRUE: YRealTimeClock.TIMESET;
    readonly TIMESET_INVALID: YRealTimeClock.TIMESET;
    readonly DISABLEHOSTSYNC_FALSE: YRealTimeClock.DISABLEHOSTSYNC;
    readonly DISABLEHOSTSYNC_TRUE: YRealTimeClock.DISABLEHOSTSYNC;
    readonly DISABLEHOSTSYNC_INVALID: YRealTimeClock.DISABLEHOSTSYNC;
    static readonly UNIXTIME_INVALID: number;
    static readonly DATETIME_INVALID: string;
    static readonly UTCOFFSET_INVALID: number;
    static readonly TIMESET_FALSE: YRealTimeClock.TIMESET;
    static readonly TIMESET_TRUE: YRealTimeClock.TIMESET;
    static readonly TIMESET_INVALID: YRealTimeClock.TIMESET;
    static readonly DISABLEHOSTSYNC_FALSE: YRealTimeClock.DISABLEHOSTSYNC;
    static readonly DISABLEHOSTSYNC_TRUE: YRealTimeClock.DISABLEHOSTSYNC;
    static readonly DISABLEHOSTSYNC_INVALID: YRealTimeClock.DISABLEHOSTSYNC;
    constructor(yapi: YAPIContext, func: string);
    imm_parseAttr(name: string, val: any): 0 | 1;
    /**
     * Returns the current time in Unix format (number of elapsed seconds since Jan 1st, 1970).
     *
     * @return an integer corresponding to the current time in Unix format (number of elapsed seconds
     * since Jan 1st, 1970)
     *
     * On failure, throws an exception or returns YRealTimeClock.UNIXTIME_INVALID.
     */
    get_unixTime(): Promise<number>;
    /**
     * Changes the current time. Time is specifid in Unix format (number of elapsed seconds since Jan 1st, 1970).
     *
     * @param newval : an integer corresponding to the current time
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_unixTime(newval: number): Promise<number>;
    /**
     * Returns the current time in the form "YYYY/MM/DD hh:mm:ss".
     *
     * @return a string corresponding to the current time in the form "YYYY/MM/DD hh:mm:ss"
     *
     * On failure, throws an exception or returns YRealTimeClock.DATETIME_INVALID.
     */
    get_dateTime(): Promise<string>;
    /**
     * Returns the number of seconds between current time and UTC time (time zone).
     *
     * @return an integer corresponding to the number of seconds between current time and UTC time (time zone)
     *
     * On failure, throws an exception or returns YRealTimeClock.UTCOFFSET_INVALID.
     */
    get_utcOffset(): Promise<number>;
    /**
     * Changes the number of seconds between current time and UTC time (time zone).
     * The timezone is automatically rounded to the nearest multiple of 15 minutes.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : an integer corresponding to the number of seconds between current time and UTC time (time zone)
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_utcOffset(newval: number): Promise<number>;
    /**
     * Returns true if the clock has been set, and false otherwise.
     *
     * @return either YRealTimeClock.TIMESET_FALSE or YRealTimeClock.TIMESET_TRUE, according to true if
     * the clock has been set, and false otherwise
     *
     * On failure, throws an exception or returns YRealTimeClock.TIMESET_INVALID.
     */
    get_timeSet(): Promise<YRealTimeClock.TIMESET>;
    /**
     * Returns true if the automatic clock synchronization with host has been disabled,
     * and false otherwise.
     *
     * @return either YRealTimeClock.DISABLEHOSTSYNC_FALSE or YRealTimeClock.DISABLEHOSTSYNC_TRUE,
     * according to true if the automatic clock synchronization with host has been disabled,
     *         and false otherwise
     *
     * On failure, throws an exception or returns YRealTimeClock.DISABLEHOSTSYNC_INVALID.
     */
    get_disableHostSync(): Promise<YRealTimeClock.DISABLEHOSTSYNC>;
    /**
     * Changes the automatic clock synchronization with host working state.
     * To disable automatic synchronization, set the value to true.
     * To enable automatic synchronization (default), set the value to false.
     *
     * @param newval : either YRealTimeClock.DISABLEHOSTSYNC_FALSE or YRealTimeClock.DISABLEHOSTSYNC_TRUE,
     * according to the automatic clock synchronization with host working state
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_disableHostSync(newval: YRealTimeClock.DISABLEHOSTSYNC): Promise<number>;
    /**
     * Retrieves a real-time clock for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the real-time clock is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YRealTimeClock.isOnline() to test if the real-time clock is
     * indeed online at a given time. In case of ambiguity when looking for
     * a real-time clock by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the real-time clock, for instance
     *         YHUBGSM5.realTimeClock.
     *
     * @return a YRealTimeClock object allowing you to drive the real-time clock.
     */
    static FindRealTimeClock(func: string): YRealTimeClock;
    /**
     * Retrieves a real-time clock for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the real-time clock is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YRealTimeClock.isOnline() to test if the real-time clock is
     * indeed online at a given time. In case of ambiguity when looking for
     * a real-time clock by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx : a YAPI context
     * @param func : a string that uniquely characterizes the real-time clock, for instance
     *         YHUBGSM5.realTimeClock.
     *
     * @return a YRealTimeClock object allowing you to drive the real-time clock.
     */
    static FindRealTimeClockInContext(yctx: YAPIContext, func: string): YRealTimeClock;
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
    registerValueCallback(callback: YRealTimeClock.ValueCallback | null): Promise<number>;
    _invokeValueCallback(value: string): Promise<number>;
    /**
     * Continues the enumeration of real-time clocks started using yFirstRealTimeClock().
     * Caution: You can't make any assumption about the returned real-time clocks order.
     * If you want to find a specific a real-time clock, use RealTimeClock.findRealTimeClock()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YRealTimeClock object, corresponding to
     *         a real-time clock currently online, or a null pointer
     *         if there are no more real-time clocks to enumerate.
     */
    nextRealTimeClock(): YRealTimeClock | null;
    /**
     * Starts the enumeration of real-time clocks currently accessible.
     * Use the method YRealTimeClock.nextRealTimeClock() to iterate on
     * next real-time clocks.
     *
     * @return a pointer to a YRealTimeClock object, corresponding to
     *         the first real-time clock currently online, or a null pointer
     *         if there are none.
     */
    static FirstRealTimeClock(): YRealTimeClock | null;
    /**
     * Starts the enumeration of real-time clocks currently accessible.
     * Use the method YRealTimeClock.nextRealTimeClock() to iterate on
     * next real-time clocks.
     *
     * @param yctx : a YAPI context.
     *
     * @return a pointer to a YRealTimeClock object, corresponding to
     *         the first real-time clock currently online, or a null pointer
     *         if there are none.
     */
    static FirstRealTimeClockInContext(yctx: YAPIContext): YRealTimeClock | null;
}
export declare namespace YRealTimeClock {
    const enum TIMESET {
        FALSE = 0,
        TRUE = 1,
        INVALID = -1
    }
    const enum DISABLEHOSTSYNC {
        FALSE = 0,
        TRUE = 1,
        INVALID = -1
    }
    interface ValueCallback {
        (func: YRealTimeClock, value: string): void;
    }
}
