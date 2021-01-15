/*********************************************************************
 *
 *  $Id: svn_id $
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
import { YAPI, YFunction } from './yocto_api.js';
//--- (end of YRealTimeClock definitions)
//--- (YRealTimeClock class start)
/**
 * YRealTimeClock Class: real-time clock control interface, available for instance in the
 * YoctoHub-GSM-3G-EU, the YoctoHub-GSM-3G-NA, the YoctoHub-Wireless-g or the YoctoHub-Wireless-n
 *
 * The YRealTimeClock class provide access to the embedded real-time clock available on some Yoctopuce
 * devices. It can provide current date and time, even after a power outage
 * lasting several days. It is the base for automated wake-up functions provided by the WakeUpScheduler.
 * The current time may represent a local time as well as an UTC time, but no automatic time change
 * will occur to account for daylight saving time.
 */
//--- (end of YRealTimeClock class start)
export class YRealTimeClock extends YFunction {
    //--- (end of YRealTimeClock attributes declaration)
    //--- (YRealTimeClock return codes)
    //--- (end of YRealTimeClock return codes)
    constructor(yapi, func) {
        //--- (YRealTimeClock constructor)
        super(yapi, func);
        this._unixTime = YRealTimeClock.UNIXTIME_INVALID;
        this._dateTime = YRealTimeClock.DATETIME_INVALID;
        this._utcOffset = YRealTimeClock.UTCOFFSET_INVALID;
        this._timeSet = YRealTimeClock.TIMESET_INVALID;
        this._valueCallbackRealTimeClock = null;
        // API symbols as object properties
        this.UNIXTIME_INVALID = YAPI.INVALID_LONG;
        this.DATETIME_INVALID = YAPI.INVALID_STRING;
        this.UTCOFFSET_INVALID = YAPI.INVALID_INT;
        this.TIMESET_FALSE = 0 /* FALSE */;
        this.TIMESET_TRUE = 1 /* TRUE */;
        this.TIMESET_INVALID = -1 /* INVALID */;
        this._className = 'RealTimeClock';
        //--- (end of YRealTimeClock constructor)
    }
    //--- (YRealTimeClock implementation)
    imm_parseAttr(name, val) {
        switch (name) {
            case 'unixTime':
                this._unixTime = val;
                return 1;
            case 'dateTime':
                this._dateTime = val;
                return 1;
            case 'utcOffset':
                this._utcOffset = val;
                return 1;
            case 'timeSet':
                this._timeSet = val;
                return 1;
        }
        return super.imm_parseAttr(name, val);
    }
    /**
     * Returns the current time in Unix format (number of elapsed seconds since Jan 1st, 1970).
     *
     * @return an integer corresponding to the current time in Unix format (number of elapsed seconds
     * since Jan 1st, 1970)
     *
     * On failure, throws an exception or returns Y_UNIXTIME_INVALID.
     */
    async get_unixTime() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YRealTimeClock.UNIXTIME_INVALID;
            }
        }
        res = this._unixTime;
        return res;
    }
    /**
     * Changes the current time. Time is specifid in Unix format (number of elapsed seconds since Jan 1st, 1970).
     *
     * @param newval : an integer corresponding to the current time
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_unixTime(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('unixTime', rest_val);
    }
    /**
     * Returns the current time in the form "YYYY/MM/DD hh:mm:ss".
     *
     * @return a string corresponding to the current time in the form "YYYY/MM/DD hh:mm:ss"
     *
     * On failure, throws an exception or returns Y_DATETIME_INVALID.
     */
    async get_dateTime() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YRealTimeClock.DATETIME_INVALID;
            }
        }
        res = this._dateTime;
        return res;
    }
    /**
     * Returns the number of seconds between current time and UTC time (time zone).
     *
     * @return an integer corresponding to the number of seconds between current time and UTC time (time zone)
     *
     * On failure, throws an exception or returns Y_UTCOFFSET_INVALID.
     */
    async get_utcOffset() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YRealTimeClock.UTCOFFSET_INVALID;
            }
        }
        res = this._utcOffset;
        return res;
    }
    /**
     * Changes the number of seconds between current time and UTC time (time zone).
     * The timezone is automatically rounded to the nearest multiple of 15 minutes.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : an integer corresponding to the number of seconds between current time and UTC time (time zone)
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_utcOffset(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('utcOffset', rest_val);
    }
    /**
     * Returns true if the clock has been set, and false otherwise.
     *
     * @return either Y_TIMESET_FALSE or Y_TIMESET_TRUE, according to true if the clock has been set, and
     * false otherwise
     *
     * On failure, throws an exception or returns Y_TIMESET_INVALID.
     */
    async get_timeSet() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YRealTimeClock.TIMESET_INVALID;
            }
        }
        res = this._timeSet;
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
     * Use the method YRealTimeClock.isOnline() to test if $THEFUNCTION$ is
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
     * @return a YRealTimeClock object allowing you to drive $THEFUNCTION$.
     */
    static FindRealTimeClock(func) {
        let obj;
        obj = YFunction._FindFromCache('RealTimeClock', func);
        if (obj == null) {
            obj = new YRealTimeClock(YAPI, func);
            YFunction._AddToCache('RealTimeClock', func, obj);
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
     * Use the method YRealTimeClock.isOnline() to test if $THEFUNCTION$ is
     * indeed online at a given time. In case of ambiguity when looking for
     * $AFUNCTION$ by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx : a YAPI context
     * @param func : a string that uniquely characterizes $THEFUNCTION$, for instance
     *         $FULLHARDWAREID$.
     *
     * @return a YRealTimeClock object allowing you to drive $THEFUNCTION$.
     */
    static FindRealTimeClockInContext(yctx, func) {
        let obj;
        obj = YFunction._FindFromCacheInContext(yctx, 'RealTimeClock', func);
        if (obj == null) {
            obj = new YRealTimeClock(yctx, func);
            YFunction._AddToCache('RealTimeClock', func, obj);
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
            await YFunction._UpdateValueCallbackList(this, true);
        }
        else {
            await YFunction._UpdateValueCallbackList(this, false);
        }
        this._valueCallbackRealTimeClock = callback;
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
        if (this._valueCallbackRealTimeClock != null) {
            try {
                await this._valueCallbackRealTimeClock(this, value);
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
     * Returns the next RealTimeClock
     *
     * @returns {YRealTimeClock}
     */
    nextRealTimeClock() {
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != YAPI.SUCCESS)
            return null;
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if (next_hwid == null)
            return null;
        return YRealTimeClock.FindRealTimeClockInContext(this._yapi, next_hwid);
    }
    /**
     * Retrieves the first RealTimeClock in a YAPI context
     *
     * @returns {YRealTimeClock}
     */
    static FirstRealTimeClock() {
        let next_hwid = YAPI.imm_getFirstHardwareId('RealTimeClock');
        if (next_hwid == null)
            return null;
        return YRealTimeClock.FindRealTimeClock(next_hwid);
    }
    /**
     * Retrieves the first RealTimeClock in a given context
     *
     * @param yctx {YAPIContext}
     *
     * @returns {YRealTimeClock}
     */
    static FirstRealTimeClockInContext(yctx) {
        let next_hwid = yctx.imm_getFirstHardwareId('RealTimeClock');
        if (next_hwid == null)
            return null;
        return YRealTimeClock.FindRealTimeClockInContext(yctx, next_hwid);
    }
}
// API symbols as static members
YRealTimeClock.UNIXTIME_INVALID = YAPI.INVALID_LONG;
YRealTimeClock.DATETIME_INVALID = YAPI.INVALID_STRING;
YRealTimeClock.UTCOFFSET_INVALID = YAPI.INVALID_INT;
YRealTimeClock.TIMESET_FALSE = 0 /* FALSE */;
YRealTimeClock.TIMESET_TRUE = 1 /* TRUE */;
YRealTimeClock.TIMESET_INVALID = -1 /* INVALID */;
//# sourceMappingURL=yocto_realtimeclock.js.map