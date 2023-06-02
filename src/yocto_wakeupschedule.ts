/*********************************************************************
 *
 *  $Id: yocto_wakeupschedule.ts 54279 2023-04-28 10:11:03Z seb $
 *
 *  Implements the high-level API for WakeUpSchedule functions
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

//--- (YWakeUpSchedule class start)
/**
 * YWakeUpSchedule Class: wake up schedule control interface, available for instance in the
 * YoctoHub-GSM-4G, the YoctoHub-Wireless-SR, the YoctoHub-Wireless-g or the YoctoHub-Wireless-n
 *
 * The YWakeUpSchedule class implements a wake up condition. The wake up time is
 * specified as a set of months and/or days and/or hours and/or minutes when the
 * wake up should happen.
 */
//--- (end of YWakeUpSchedule class start)

export class YWakeUpSchedule extends YFunction
{
    //--- (YWakeUpSchedule attributes declaration)
    _className: string;
    _minutesA: number = YWakeUpSchedule.MINUTESA_INVALID;
    _minutesB: number = YWakeUpSchedule.MINUTESB_INVALID;
    _hours: number = YWakeUpSchedule.HOURS_INVALID;
    _weekDays: number = YWakeUpSchedule.WEEKDAYS_INVALID;
    _monthDays: number = YWakeUpSchedule.MONTHDAYS_INVALID;
    _months: number = YWakeUpSchedule.MONTHS_INVALID;
    _nextOccurence: number = YWakeUpSchedule.NEXTOCCURENCE_INVALID;
    _valueCallbackWakeUpSchedule: YWakeUpSchedule.ValueCallback | null = null;

    // API symbols as object properties
    public readonly MINUTESA_INVALID: number = YAPI.INVALID_UINT;
    public readonly MINUTESB_INVALID: number = YAPI.INVALID_UINT;
    public readonly HOURS_INVALID: number = YAPI.INVALID_UINT;
    public readonly WEEKDAYS_INVALID: number = YAPI.INVALID_UINT;
    public readonly MONTHDAYS_INVALID: number = YAPI.INVALID_UINT;
    public readonly MONTHS_INVALID: number = YAPI.INVALID_UINT;
    public readonly NEXTOCCURENCE_INVALID: number = YAPI.INVALID_LONG;

    // API symbols as static members
    public static readonly MINUTESA_INVALID: number = YAPI.INVALID_UINT;
    public static readonly MINUTESB_INVALID: number = YAPI.INVALID_UINT;
    public static readonly HOURS_INVALID: number = YAPI.INVALID_UINT;
    public static readonly WEEKDAYS_INVALID: number = YAPI.INVALID_UINT;
    public static readonly MONTHDAYS_INVALID: number = YAPI.INVALID_UINT;
    public static readonly MONTHS_INVALID: number = YAPI.INVALID_UINT;
    public static readonly NEXTOCCURENCE_INVALID: number = YAPI.INVALID_LONG;
    //--- (end of YWakeUpSchedule attributes declaration)

    constructor(yapi: YAPIContext, func: string)
    {
        //--- (YWakeUpSchedule constructor)
        super(yapi, func);
        this._className                  = 'WakeUpSchedule';
        //--- (end of YWakeUpSchedule constructor)
    }

    //--- (YWakeUpSchedule implementation)

    imm_parseAttr(name: string, val: any)
    {
        switch (name) {
        case 'minutesA':
            this._minutesA = <number> <number> val;
            return 1;
        case 'minutesB':
            this._minutesB = <number> <number> val;
            return 1;
        case 'hours':
            this._hours = <number> <number> val;
            return 1;
        case 'weekDays':
            this._weekDays = <number> <number> val;
            return 1;
        case 'monthDays':
            this._monthDays = <number> <number> val;
            return 1;
        case 'months':
            this._months = <number> <number> val;
            return 1;
        case 'nextOccurence':
            this._nextOccurence = <number> <number> val;
            return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Returns the minutes in the 00-29 interval of each hour scheduled for wake up.
     *
     * @return an integer corresponding to the minutes in the 00-29 interval of each hour scheduled for wake up
     *
     * On failure, throws an exception or returns YWakeUpSchedule.MINUTESA_INVALID.
     */
    async get_minutesA(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YWakeUpSchedule.MINUTESA_INVALID;
            }
        }
        res = this._minutesA;
        return res;
    }

    /**
     * Changes the minutes in the 00-29 interval when a wake up must take place.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : an integer corresponding to the minutes in the 00-29 interval when a wake up must take place
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_minutesA(newval: number): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('minutesA', rest_val);
    }

    /**
     * Returns the minutes in the 30-59 interval of each hour scheduled for wake up.
     *
     * @return an integer corresponding to the minutes in the 30-59 interval of each hour scheduled for wake up
     *
     * On failure, throws an exception or returns YWakeUpSchedule.MINUTESB_INVALID.
     */
    async get_minutesB(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YWakeUpSchedule.MINUTESB_INVALID;
            }
        }
        res = this._minutesB;
        return res;
    }

    /**
     * Changes the minutes in the 30-59 interval when a wake up must take place.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : an integer corresponding to the minutes in the 30-59 interval when a wake up must take place
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_minutesB(newval: number): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('minutesB', rest_val);
    }

    /**
     * Returns the hours scheduled for wake up.
     *
     * @return an integer corresponding to the hours scheduled for wake up
     *
     * On failure, throws an exception or returns YWakeUpSchedule.HOURS_INVALID.
     */
    async get_hours(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YWakeUpSchedule.HOURS_INVALID;
            }
        }
        res = this._hours;
        return res;
    }

    /**
     * Changes the hours when a wake up must take place.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : an integer corresponding to the hours when a wake up must take place
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_hours(newval: number): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('hours', rest_val);
    }

    /**
     * Returns the days of the week scheduled for wake up.
     *
     * @return an integer corresponding to the days of the week scheduled for wake up
     *
     * On failure, throws an exception or returns YWakeUpSchedule.WEEKDAYS_INVALID.
     */
    async get_weekDays(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YWakeUpSchedule.WEEKDAYS_INVALID;
            }
        }
        res = this._weekDays;
        return res;
    }

    /**
     * Changes the days of the week when a wake up must take place.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : an integer corresponding to the days of the week when a wake up must take place
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_weekDays(newval: number): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('weekDays', rest_val);
    }

    /**
     * Returns the days of the month scheduled for wake up.
     *
     * @return an integer corresponding to the days of the month scheduled for wake up
     *
     * On failure, throws an exception or returns YWakeUpSchedule.MONTHDAYS_INVALID.
     */
    async get_monthDays(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YWakeUpSchedule.MONTHDAYS_INVALID;
            }
        }
        res = this._monthDays;
        return res;
    }

    /**
     * Changes the days of the month when a wake up must take place.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : an integer corresponding to the days of the month when a wake up must take place
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_monthDays(newval: number): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('monthDays', rest_val);
    }

    /**
     * Returns the months scheduled for wake up.
     *
     * @return an integer corresponding to the months scheduled for wake up
     *
     * On failure, throws an exception or returns YWakeUpSchedule.MONTHS_INVALID.
     */
    async get_months(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YWakeUpSchedule.MONTHS_INVALID;
            }
        }
        res = this._months;
        return res;
    }

    /**
     * Changes the months when a wake up must take place.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : an integer corresponding to the months when a wake up must take place
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_months(newval: number): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('months', rest_val);
    }

    /**
     * Returns the date/time (seconds) of the next wake up occurrence.
     *
     * @return an integer corresponding to the date/time (seconds) of the next wake up occurrence
     *
     * On failure, throws an exception or returns YWakeUpSchedule.NEXTOCCURENCE_INVALID.
     */
    async get_nextOccurence(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YWakeUpSchedule.NEXTOCCURENCE_INVALID;
            }
        }
        res = this._nextOccurence;
        return res;
    }

    /**
     * Retrieves a wake up schedule for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the wake up schedule is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YWakeUpSchedule.isOnline() to test if the wake up schedule is
     * indeed online at a given time. In case of ambiguity when looking for
     * a wake up schedule by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the wake up schedule, for instance
     *         YHUBGSM5.wakeUpSchedule1.
     *
     * @return a YWakeUpSchedule object allowing you to drive the wake up schedule.
     */
    static FindWakeUpSchedule(func: string): YWakeUpSchedule
    {
        let obj: YWakeUpSchedule | null;
        obj = <YWakeUpSchedule> YFunction._FindFromCache('WakeUpSchedule', func);
        if (obj == null) {
            obj = new YWakeUpSchedule(YAPI, func);
            YFunction._AddToCache('WakeUpSchedule',  func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a wake up schedule for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the wake up schedule is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YWakeUpSchedule.isOnline() to test if the wake up schedule is
     * indeed online at a given time. In case of ambiguity when looking for
     * a wake up schedule by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx : a YAPI context
     * @param func : a string that uniquely characterizes the wake up schedule, for instance
     *         YHUBGSM5.wakeUpSchedule1.
     *
     * @return a YWakeUpSchedule object allowing you to drive the wake up schedule.
     */
    static FindWakeUpScheduleInContext(yctx: YAPIContext, func: string): YWakeUpSchedule
    {
        let obj: YWakeUpSchedule | null;
        obj = <YWakeUpSchedule> YFunction._FindFromCacheInContext(yctx,  'WakeUpSchedule', func);
        if (obj == null) {
            obj = new YWakeUpSchedule(yctx, func);
            YFunction._AddToCache('WakeUpSchedule',  func, obj);
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
    async registerValueCallback(callback: YWakeUpSchedule.ValueCallback | null): Promise<number>
    {
        let val: string;
        if (callback != null) {
            await YFunction._UpdateValueCallbackList(this, true);
        } else {
            await YFunction._UpdateValueCallbackList(this, false);
        }
        this._valueCallbackWakeUpSchedule = callback;
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
        if (this._valueCallbackWakeUpSchedule != null) {
            try {
                await this._valueCallbackWakeUpSchedule(this, value);
            } catch (e) {
                this._yapi.imm_log('Exception in valueCallback:', e);
            }
        } else {
            super._invokeValueCallback(value);
        }
        return 0;
    }

    /**
     * Returns all the minutes of each hour that are scheduled for wake up.
     */
    async get_minutes(): Promise<number>
    {
        let res: number;

        res = await this.get_minutesB();
        res = ((res) << (30));
        res = res + await this.get_minutesA();
        return res;
    }

    /**
     * Changes all the minutes where a wake up must take place.
     *
     * @param bitmap : Minutes 00-59 of each hour scheduled for wake up.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_minutes(bitmap: number): Promise<number>
    {
        await this.set_minutesA(((bitmap) & (0x3fffffff)));
        bitmap = ((bitmap) >> (30));
        return await this.set_minutesB(((bitmap) & (0x3fffffff)));
    }

    /**
     * Continues the enumeration of wake up schedules started using yFirstWakeUpSchedule().
     * Caution: You can't make any assumption about the returned wake up schedules order.
     * If you want to find a specific a wake up schedule, use WakeUpSchedule.findWakeUpSchedule()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YWakeUpSchedule object, corresponding to
     *         a wake up schedule currently online, or a null pointer
     *         if there are no more wake up schedules to enumerate.
     */
    nextWakeUpSchedule(): YWakeUpSchedule | null
    {
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != YAPI.SUCCESS) return null;
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, <string> resolve.result);
        if (next_hwid == null) return null;
        return YWakeUpSchedule.FindWakeUpScheduleInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of wake up schedules currently accessible.
     * Use the method YWakeUpSchedule.nextWakeUpSchedule() to iterate on
     * next wake up schedules.
     *
     * @return a pointer to a YWakeUpSchedule object, corresponding to
     *         the first wake up schedule currently online, or a null pointer
     *         if there are none.
     */
    static FirstWakeUpSchedule(): YWakeUpSchedule | null
    {
        let next_hwid = YAPI.imm_getFirstHardwareId('WakeUpSchedule');
        if (next_hwid == null) return null;
        return YWakeUpSchedule.FindWakeUpSchedule(next_hwid);
    }

    /**
     * Starts the enumeration of wake up schedules currently accessible.
     * Use the method YWakeUpSchedule.nextWakeUpSchedule() to iterate on
     * next wake up schedules.
     *
     * @param yctx : a YAPI context.
     *
     * @return a pointer to a YWakeUpSchedule object, corresponding to
     *         the first wake up schedule currently online, or a null pointer
     *         if there are none.
     */
    static FirstWakeUpScheduleInContext(yctx: YAPIContext): YWakeUpSchedule | null
    {
        let next_hwid = yctx.imm_getFirstHardwareId('WakeUpSchedule');
        if (next_hwid == null) return null;
        return YWakeUpSchedule.FindWakeUpScheduleInContext(yctx, next_hwid);
    }

    //--- (end of YWakeUpSchedule implementation)
}

export namespace YWakeUpSchedule {
    //--- (YWakeUpSchedule definitions)
    export interface ValueCallback {(func: YWakeUpSchedule, value: string): void}

    //--- (end of YWakeUpSchedule definitions)
}

