/*********************************************************************
 *
 *  $Id: svn_id $
 *
 *  Implements the high-level API for Proximity functions
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
import { YAPI, YFunction, YSensor } from './yocto_api.js';
//--- (YProximity class start)
/**
 * YProximity Class: proximity sensor control interface, available for instance in the Yocto-Proximity
 *
 * The YProximity class allows you to read and configure Yoctopuce proximity sensors.
 * It inherits from YSensor class the core functions to read measures,
 * to register callback functions, and to access the autonomous datalogger.
 * This class adds the ability to set up a detection threshold and to count the
 * number of detected state changes.
 */
//--- (end of YProximity class start)
export class YProximity extends YSensor {
    //--- (end of YProximity attributes declaration)
    constructor(yapi, func) {
        //--- (YProximity constructor)
        super(yapi, func);
        this._signalValue = YProximity.SIGNALVALUE_INVALID;
        this._detectionThreshold = YProximity.DETECTIONTHRESHOLD_INVALID;
        this._detectionHysteresis = YProximity.DETECTIONHYSTERESIS_INVALID;
        this._presenceMinTime = YProximity.PRESENCEMINTIME_INVALID;
        this._removalMinTime = YProximity.REMOVALMINTIME_INVALID;
        this._isPresent = YProximity.ISPRESENT_INVALID;
        this._lastTimeApproached = YProximity.LASTTIMEAPPROACHED_INVALID;
        this._lastTimeRemoved = YProximity.LASTTIMEREMOVED_INVALID;
        this._pulseCounter = YProximity.PULSECOUNTER_INVALID;
        this._pulseTimer = YProximity.PULSETIMER_INVALID;
        this._proximityReportMode = YProximity.PROXIMITYREPORTMODE_INVALID;
        this._valueCallbackProximity = null;
        this._timedReportCallbackProximity = null;
        // API symbols as object properties
        this.SIGNALVALUE_INVALID = YAPI.INVALID_DOUBLE;
        this.DETECTIONTHRESHOLD_INVALID = YAPI.INVALID_UINT;
        this.DETECTIONHYSTERESIS_INVALID = YAPI.INVALID_UINT;
        this.PRESENCEMINTIME_INVALID = YAPI.INVALID_UINT;
        this.REMOVALMINTIME_INVALID = YAPI.INVALID_UINT;
        this.ISPRESENT_FALSE = 0;
        this.ISPRESENT_TRUE = 1;
        this.ISPRESENT_INVALID = -1;
        this.LASTTIMEAPPROACHED_INVALID = YAPI.INVALID_LONG;
        this.LASTTIMEREMOVED_INVALID = YAPI.INVALID_LONG;
        this.PULSECOUNTER_INVALID = YAPI.INVALID_LONG;
        this.PULSETIMER_INVALID = YAPI.INVALID_LONG;
        this.PROXIMITYREPORTMODE_NUMERIC = 0;
        this.PROXIMITYREPORTMODE_PRESENCE = 1;
        this.PROXIMITYREPORTMODE_PULSECOUNT = 2;
        this.PROXIMITYREPORTMODE_INVALID = -1;
        this._className = 'Proximity';
        //--- (end of YProximity constructor)
    }
    //--- (YProximity implementation)
    imm_parseAttr(name, val) {
        switch (name) {
            case 'signalValue':
                this._signalValue = Math.round(val / 65.536) / 1000.0;
                return 1;
            case 'detectionThreshold':
                this._detectionThreshold = val;
                return 1;
            case 'detectionHysteresis':
                this._detectionHysteresis = val;
                return 1;
            case 'presenceMinTime':
                this._presenceMinTime = val;
                return 1;
            case 'removalMinTime':
                this._removalMinTime = val;
                return 1;
            case 'isPresent':
                this._isPresent = val;
                return 1;
            case 'lastTimeApproached':
                this._lastTimeApproached = val;
                return 1;
            case 'lastTimeRemoved':
                this._lastTimeRemoved = val;
                return 1;
            case 'pulseCounter':
                this._pulseCounter = val;
                return 1;
            case 'pulseTimer':
                this._pulseTimer = val;
                return 1;
            case 'proximityReportMode':
                this._proximityReportMode = val;
                return 1;
        }
        return super.imm_parseAttr(name, val);
    }
    /**
     * Returns the current value of signal measured by the proximity sensor.
     *
     * @return a floating point number corresponding to the current value of signal measured by the proximity sensor
     *
     * On failure, throws an exception or returns YProximity.SIGNALVALUE_INVALID.
     */
    async get_signalValue() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YProximity.SIGNALVALUE_INVALID;
            }
        }
        res = Math.round(this._signalValue * 1000) / 1000;
        return res;
    }
    /**
     * Returns the threshold used to determine the logical state of the proximity sensor, when considered
     * as a binary input (on/off).
     *
     * @return an integer corresponding to the threshold used to determine the logical state of the
     * proximity sensor, when considered
     *         as a binary input (on/off)
     *
     * On failure, throws an exception or returns YProximity.DETECTIONTHRESHOLD_INVALID.
     */
    async get_detectionThreshold() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YProximity.DETECTIONTHRESHOLD_INVALID;
            }
        }
        res = this._detectionThreshold;
        return res;
    }
    /**
     * Changes the threshold used to determine the logical state of the proximity sensor, when considered
     * as a binary input (on/off).
     * Remember to call the saveToFlash() method of the module if the modification must be kept.
     *
     * @param newval : an integer corresponding to the threshold used to determine the logical state of
     * the proximity sensor, when considered
     *         as a binary input (on/off)
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_detectionThreshold(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('detectionThreshold', rest_val);
    }
    /**
     * Returns the hysteresis used to determine the logical state of the proximity sensor, when considered
     * as a binary input (on/off).
     *
     * @return an integer corresponding to the hysteresis used to determine the logical state of the
     * proximity sensor, when considered
     *         as a binary input (on/off)
     *
     * On failure, throws an exception or returns YProximity.DETECTIONHYSTERESIS_INVALID.
     */
    async get_detectionHysteresis() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YProximity.DETECTIONHYSTERESIS_INVALID;
            }
        }
        res = this._detectionHysteresis;
        return res;
    }
    /**
     * Changes the hysteresis used to determine the logical state of the proximity sensor, when considered
     * as a binary input (on/off).
     * Remember to call the saveToFlash() method of the module if the modification must be kept.
     *
     * @param newval : an integer corresponding to the hysteresis used to determine the logical state of
     * the proximity sensor, when considered
     *         as a binary input (on/off)
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_detectionHysteresis(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('detectionHysteresis', rest_val);
    }
    /**
     * Returns the minimal detection duration before signalling a presence event. Any shorter detection is
     * considered as noise or bounce (false positive) and filtered out.
     *
     * @return an integer corresponding to the minimal detection duration before signalling a presence event
     *
     * On failure, throws an exception or returns YProximity.PRESENCEMINTIME_INVALID.
     */
    async get_presenceMinTime() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YProximity.PRESENCEMINTIME_INVALID;
            }
        }
        res = this._presenceMinTime;
        return res;
    }
    /**
     * Changes the minimal detection duration before signalling a presence event. Any shorter detection is
     * considered as noise or bounce (false positive) and filtered out.
     * Remember to call the saveToFlash() method of the module if the modification must be kept.
     *
     * @param newval : an integer corresponding to the minimal detection duration before signalling a presence event
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_presenceMinTime(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('presenceMinTime', rest_val);
    }
    /**
     * Returns the minimal detection duration before signalling a removal event. Any shorter detection is
     * considered as noise or bounce (false positive) and filtered out.
     *
     * @return an integer corresponding to the minimal detection duration before signalling a removal event
     *
     * On failure, throws an exception or returns YProximity.REMOVALMINTIME_INVALID.
     */
    async get_removalMinTime() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YProximity.REMOVALMINTIME_INVALID;
            }
        }
        res = this._removalMinTime;
        return res;
    }
    /**
     * Changes the minimal detection duration before signalling a removal event. Any shorter detection is
     * considered as noise or bounce (false positive) and filtered out.
     * Remember to call the saveToFlash() method of the module if the modification must be kept.
     *
     * @param newval : an integer corresponding to the minimal detection duration before signalling a removal event
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_removalMinTime(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('removalMinTime', rest_val);
    }
    /**
     * Returns true if the input (considered as binary) is active (detection value is smaller than the
     * specified threshold), and false otherwise.
     *
     * @return either YProximity.ISPRESENT_FALSE or YProximity.ISPRESENT_TRUE, according to true if the
     * input (considered as binary) is active (detection value is smaller than the specified threshold),
     * and false otherwise
     *
     * On failure, throws an exception or returns YProximity.ISPRESENT_INVALID.
     */
    async get_isPresent() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YProximity.ISPRESENT_INVALID;
            }
        }
        res = this._isPresent;
        return res;
    }
    /**
     * Returns the number of elapsed milliseconds between the module power on and the last observed
     * detection (the input contact transitioned from absent to present).
     *
     * @return an integer corresponding to the number of elapsed milliseconds between the module power on
     * and the last observed
     *         detection (the input contact transitioned from absent to present)
     *
     * On failure, throws an exception or returns YProximity.LASTTIMEAPPROACHED_INVALID.
     */
    async get_lastTimeApproached() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YProximity.LASTTIMEAPPROACHED_INVALID;
            }
        }
        res = this._lastTimeApproached;
        return res;
    }
    /**
     * Returns the number of elapsed milliseconds between the module power on and the last observed
     * detection (the input contact transitioned from present to absent).
     *
     * @return an integer corresponding to the number of elapsed milliseconds between the module power on
     * and the last observed
     *         detection (the input contact transitioned from present to absent)
     *
     * On failure, throws an exception or returns YProximity.LASTTIMEREMOVED_INVALID.
     */
    async get_lastTimeRemoved() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YProximity.LASTTIMEREMOVED_INVALID;
            }
        }
        res = this._lastTimeRemoved;
        return res;
    }
    /**
     * Returns the pulse counter value. The value is a 32 bit integer. In case
     * of overflow (>=2^32), the counter will wrap. To reset the counter, just
     * call the resetCounter() method.
     *
     * @return an integer corresponding to the pulse counter value
     *
     * On failure, throws an exception or returns YProximity.PULSECOUNTER_INVALID.
     */
    async get_pulseCounter() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YProximity.PULSECOUNTER_INVALID;
            }
        }
        res = this._pulseCounter;
        return res;
    }
    async set_pulseCounter(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('pulseCounter', rest_val);
    }
    /**
     * Returns the timer of the pulse counter (ms).
     *
     * @return an integer corresponding to the timer of the pulse counter (ms)
     *
     * On failure, throws an exception or returns YProximity.PULSETIMER_INVALID.
     */
    async get_pulseTimer() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YProximity.PULSETIMER_INVALID;
            }
        }
        res = this._pulseTimer;
        return res;
    }
    /**
     * Returns the parameter (sensor value, presence or pulse count) returned by the get_currentValue
     * function and callbacks.
     *
     * @return a value among YProximity.PROXIMITYREPORTMODE_NUMERIC,
     * YProximity.PROXIMITYREPORTMODE_PRESENCE and YProximity.PROXIMITYREPORTMODE_PULSECOUNT corresponding
     * to the parameter (sensor value, presence or pulse count) returned by the get_currentValue function and callbacks
     *
     * On failure, throws an exception or returns YProximity.PROXIMITYREPORTMODE_INVALID.
     */
    async get_proximityReportMode() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YProximity.PROXIMITYREPORTMODE_INVALID;
            }
        }
        res = this._proximityReportMode;
        return res;
    }
    /**
     * Changes the  parameter  type (sensor value, presence or pulse count) returned by the
     * get_currentValue function and callbacks.
     * The edge count value is limited to the 6 lowest digits. For values greater than one million, use
     * get_pulseCounter().
     * Remember to call the saveToFlash() method of the module if the modification must be kept.
     *
     * @param newval : a value among YProximity.PROXIMITYREPORTMODE_NUMERIC,
     * YProximity.PROXIMITYREPORTMODE_PRESENCE and YProximity.PROXIMITYREPORTMODE_PULSECOUNT corresponding
     * to the  parameter  type (sensor value, presence or pulse count) returned by the get_currentValue
     * function and callbacks
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_proximityReportMode(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('proximityReportMode', rest_val);
    }
    /**
     * Retrieves a proximity sensor for a given identifier.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the proximity sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YProximity.isOnline() to test if the proximity sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a proximity sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the proximity sensor, for instance
     *         YPROXIM1.proximity1.
     *
     * @return a YProximity object allowing you to drive the proximity sensor.
     */
    static FindProximity(func) {
        let obj;
        obj = YFunction._FindFromCache('Proximity', func);
        if (obj == null) {
            obj = new YProximity(YAPI, func);
            YFunction._AddToCache('Proximity', func, obj);
        }
        return obj;
    }
    /**
     * Retrieves a proximity sensor for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the proximity sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YProximity.isOnline() to test if the proximity sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a proximity sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx : a YAPI context
     * @param func : a string that uniquely characterizes the proximity sensor, for instance
     *         YPROXIM1.proximity1.
     *
     * @return a YProximity object allowing you to drive the proximity sensor.
     */
    static FindProximityInContext(yctx, func) {
        let obj;
        obj = YFunction._FindFromCacheInContext(yctx, 'Proximity', func);
        if (obj == null) {
            obj = new YProximity(yctx, func);
            YFunction._AddToCache('Proximity', func, obj);
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
        this._valueCallbackProximity = callback;
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
        if (this._valueCallbackProximity != null) {
            try {
                await this._valueCallbackProximity(this, value);
            }
            catch (e) {
                this._yapi.imm_log('Exception in valueCallback:', e);
            }
        }
        else {
            await super._invokeValueCallback(value);
        }
        return 0;
    }
    /**
     * Registers the callback function that is invoked on every periodic timed notification.
     * The callback is invoked only during the execution of ySleep or yHandleEvents.
     * This provides control over the time when the callback is triggered. For good responsiveness, remember to call
     * one of these two functions periodically. To unregister a callback, pass a null pointer as argument.
     *
     * @param callback : the callback function to call, or a null pointer. The callback function should take two
     *         arguments: the function object of which the value has changed, and an YMeasure object describing
     *         the new advertised value.
     * @noreturn
     */
    async registerTimedReportCallback(callback) {
        let sensor;
        sensor = this;
        if (callback != null) {
            await YFunction._UpdateTimedReportCallbackList(sensor, true);
        }
        else {
            await YFunction._UpdateTimedReportCallbackList(sensor, false);
        }
        this._timedReportCallbackProximity = callback;
        return 0;
    }
    async _invokeTimedReportCallback(value) {
        if (this._timedReportCallbackProximity != null) {
            try {
                await this._timedReportCallbackProximity(this, value);
            }
            catch (e) {
                this._yapi.imm_log('Exception in timedReportCallback:', e);
            }
        }
        else {
            await super._invokeTimedReportCallback(value);
        }
        return 0;
    }
    /**
     * Resets the pulse counter value as well as its timer.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async resetCounter() {
        return await this.set_pulseCounter(0);
    }
    /**
     * Continues the enumeration of proximity sensors started using yFirstProximity().
     * Caution: You can't make any assumption about the returned proximity sensors order.
     * If you want to find a specific a proximity sensor, use Proximity.findProximity()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YProximity object, corresponding to
     *         a proximity sensor currently online, or a null pointer
     *         if there are no more proximity sensors to enumerate.
     */
    nextProximity() {
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != YAPI.SUCCESS)
            return null;
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if (next_hwid == null)
            return null;
        return YProximity.FindProximityInContext(this._yapi, next_hwid);
    }
    /**
     * Starts the enumeration of proximity sensors currently accessible.
     * Use the method YProximity.nextProximity() to iterate on
     * next proximity sensors.
     *
     * @return a pointer to a YProximity object, corresponding to
     *         the first proximity sensor currently online, or a null pointer
     *         if there are none.
     */
    static FirstProximity() {
        let next_hwid = YAPI.imm_getFirstHardwareId('Proximity');
        if (next_hwid == null)
            return null;
        return YProximity.FindProximity(next_hwid);
    }
    /**
     * Starts the enumeration of proximity sensors currently accessible.
     * Use the method YProximity.nextProximity() to iterate on
     * next proximity sensors.
     *
     * @param yctx : a YAPI context.
     *
     * @return a pointer to a YProximity object, corresponding to
     *         the first proximity sensor currently online, or a null pointer
     *         if there are none.
     */
    static FirstProximityInContext(yctx) {
        let next_hwid = yctx.imm_getFirstHardwareId('Proximity');
        if (next_hwid == null)
            return null;
        return YProximity.FindProximityInContext(yctx, next_hwid);
    }
}
// API symbols as static members
YProximity.SIGNALVALUE_INVALID = YAPI.INVALID_DOUBLE;
YProximity.DETECTIONTHRESHOLD_INVALID = YAPI.INVALID_UINT;
YProximity.DETECTIONHYSTERESIS_INVALID = YAPI.INVALID_UINT;
YProximity.PRESENCEMINTIME_INVALID = YAPI.INVALID_UINT;
YProximity.REMOVALMINTIME_INVALID = YAPI.INVALID_UINT;
YProximity.ISPRESENT_FALSE = 0;
YProximity.ISPRESENT_TRUE = 1;
YProximity.ISPRESENT_INVALID = -1;
YProximity.LASTTIMEAPPROACHED_INVALID = YAPI.INVALID_LONG;
YProximity.LASTTIMEREMOVED_INVALID = YAPI.INVALID_LONG;
YProximity.PULSECOUNTER_INVALID = YAPI.INVALID_LONG;
YProximity.PULSETIMER_INVALID = YAPI.INVALID_LONG;
YProximity.PROXIMITYREPORTMODE_NUMERIC = 0;
YProximity.PROXIMITYREPORTMODE_PRESENCE = 1;
YProximity.PROXIMITYREPORTMODE_PULSECOUNT = 2;
YProximity.PROXIMITYREPORTMODE_INVALID = -1;
//# sourceMappingURL=yocto_proximity.js.map