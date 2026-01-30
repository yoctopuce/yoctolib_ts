/*********************************************************************
 *
 *  $Id: svn_id $
 *
 *  Implements the high-level API for SoundLevel functions
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
//--- (YSoundLevel class start)
/**
 * YSoundLevel Class: sound pressure level meter control interface
 *
 * The YSoundLevel class allows you to read and configure Yoctopuce sound pressure level meters.
 * It inherits from YSensor class the core functions to read measurements,
 * to register callback functions, and to access the autonomous datalogger.
 */
//--- (end of YSoundLevel class start)
export class YSoundLevel extends YSensor {
    //--- (end of YSoundLevel attributes declaration)
    constructor(yapi, func) {
        //--- (YSoundLevel constructor)
        super(yapi, func);
        this._label = YSoundLevel.LABEL_INVALID;
        this._integrationTime = YSoundLevel.INTEGRATIONTIME_INVALID;
        this._valueCallbackSoundLevel = null;
        this._timedReportCallbackSoundLevel = null;
        // API symbols as object properties
        this.LABEL_INVALID = YAPI.INVALID_STRING;
        this.INTEGRATIONTIME_INVALID = YAPI.INVALID_UINT;
        this._className = 'SoundLevel';
        //--- (end of YSoundLevel constructor)
    }
    //--- (YSoundLevel implementation)
    imm_parseAttr(name, val) {
        switch (name) {
            case 'label':
                this._label = val;
                return 1;
            case 'integrationTime':
                this._integrationTime = val;
                return 1;
        }
        return super.imm_parseAttr(name, val);
    }
    /**
     * Changes the measuring unit for the sound pressure level (dBA, dBC or dBZ).
     * That unit will directly determine frequency weighting to be used to compute
     * the measured value. Remember to call the saveToFlash() method of the
     * module if the modification must be kept.
     *
     * @param newval : a string corresponding to the measuring unit for the sound pressure level (dBA, dBC or dBZ)
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_unit(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('unit', rest_val);
    }
    /**
     * Returns the label for the sound pressure level measurement, as per
     * IEC standard 61672-1:2013.
     *
     * @return a string corresponding to the label for the sound pressure level measurement, as per
     *         IEC standard 61672-1:2013
     *
     * On failure, throws an exception or returns YSoundLevel.LABEL_INVALID.
     */
    async get_label() {
        let res;
        if (this._cacheExpiration == 0) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YSoundLevel.LABEL_INVALID;
            }
        }
        res = this._label;
        return res;
    }
    /**
     * Returns the integration time in milliseconds for measuring the sound pressure level.
     *
     * @return an integer corresponding to the integration time in milliseconds for measuring the sound pressure level
     *
     * On failure, throws an exception or returns YSoundLevel.INTEGRATIONTIME_INVALID.
     */
    async get_integrationTime() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YSoundLevel.INTEGRATIONTIME_INVALID;
            }
        }
        res = this._integrationTime;
        return res;
    }
    /**
     * Retrieves a sound pressure level meter for a given identifier.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the sound pressure level meter is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YSoundLevel.isOnline() to test if the sound pressure level meter is
     * indeed online at a given time. In case of ambiguity when looking for
     * a sound pressure level meter by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the sound pressure level meter, for instance
     *         MyDevice.soundLevel1.
     *
     * @return a YSoundLevel object allowing you to drive the sound pressure level meter.
     */
    static FindSoundLevel(func) {
        let obj;
        obj = YFunction._FindFromCache('SoundLevel', func);
        if (obj == null) {
            obj = new YSoundLevel(YAPI, func);
            YFunction._AddToCache('SoundLevel', func, obj);
        }
        return obj;
    }
    /**
     * Retrieves a sound pressure level meter for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the sound pressure level meter is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YSoundLevel.isOnline() to test if the sound pressure level meter is
     * indeed online at a given time. In case of ambiguity when looking for
     * a sound pressure level meter by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx : a YAPI context
     * @param func : a string that uniquely characterizes the sound pressure level meter, for instance
     *         MyDevice.soundLevel1.
     *
     * @return a YSoundLevel object allowing you to drive the sound pressure level meter.
     */
    static FindSoundLevelInContext(yctx, func) {
        let obj;
        obj = YFunction._FindFromCacheInContext(yctx, 'SoundLevel', func);
        if (obj == null) {
            obj = new YSoundLevel(yctx, func);
            YFunction._AddToCache('SoundLevel', func, obj);
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
        this._valueCallbackSoundLevel = callback;
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
        if (this._valueCallbackSoundLevel != null) {
            try {
                await this._valueCallbackSoundLevel(this, value);
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
        this._timedReportCallbackSoundLevel = callback;
        return 0;
    }
    async _invokeTimedReportCallback(value) {
        if (this._timedReportCallbackSoundLevel != null) {
            try {
                await this._timedReportCallbackSoundLevel(this, value);
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
     * Continues the enumeration of sound pressure level meters started using yFirstSoundLevel().
     * Caution: You can't make any assumption about the returned sound pressure level meters order.
     * If you want to find a specific a sound pressure level meter, use SoundLevel.findSoundLevel()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YSoundLevel object, corresponding to
     *         a sound pressure level meter currently online, or a null pointer
     *         if there are no more sound pressure level meters to enumerate.
     */
    nextSoundLevel() {
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != YAPI.SUCCESS)
            return null;
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if (next_hwid == null)
            return null;
        return YSoundLevel.FindSoundLevelInContext(this._yapi, next_hwid);
    }
    /**
     * Starts the enumeration of sound pressure level meters currently accessible.
     * Use the method YSoundLevel.nextSoundLevel() to iterate on
     * next sound pressure level meters.
     *
     * @return a pointer to a YSoundLevel object, corresponding to
     *         the first sound pressure level meter currently online, or a null pointer
     *         if there are none.
     */
    static FirstSoundLevel() {
        let next_hwid = YAPI.imm_getFirstHardwareId('SoundLevel');
        if (next_hwid == null)
            return null;
        return YSoundLevel.FindSoundLevel(next_hwid);
    }
    /**
     * Starts the enumeration of sound pressure level meters currently accessible.
     * Use the method YSoundLevel.nextSoundLevel() to iterate on
     * next sound pressure level meters.
     *
     * @param yctx : a YAPI context.
     *
     * @return a pointer to a YSoundLevel object, corresponding to
     *         the first sound pressure level meter currently online, or a null pointer
     *         if there are none.
     */
    static FirstSoundLevelInContext(yctx) {
        let next_hwid = yctx.imm_getFirstHardwareId('SoundLevel');
        if (next_hwid == null)
            return null;
        return YSoundLevel.FindSoundLevelInContext(yctx, next_hwid);
    }
}
// API symbols as static members
YSoundLevel.LABEL_INVALID = YAPI.INVALID_STRING;
YSoundLevel.INTEGRATIONTIME_INVALID = YAPI.INVALID_UINT;
//# sourceMappingURL=yocto_soundlevel.js.map