/*********************************************************************
 *
 *  $Id: svn_id $
 *
 *  Implements the high-level API for Altitude functions
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

//--- (YAltitude class start)
/**
 * YAltitude Class: altimeter control interface, available for instance in the Yocto-Altimeter-V2 or
 * the Yocto-GPS-V2
 *
 * The YAltitude class allows you to read and configure Yoctopuce altimeters.
 * It inherits from YSensor class the core functions to read measures,
 * to register callback functions, and to access the autonomous datalogger.
 * This class adds the ability to configure the barometric pressure adjusted to
 * sea level (QNH) for barometric sensors.
 */
//--- (end of YAltitude class start)

export class YAltitude extends YSensor
{
    //--- (YAltitude attributes declaration)
    _className: string;
    _qnh: number = YAltitude.QNH_INVALID;
    _technology: string = YAltitude.TECHNOLOGY_INVALID;
    _valueCallbackAltitude: YAltitude.ValueCallback | null = null;
    _timedReportCallbackAltitude: YAltitude.TimedReportCallback | null = null;

    // API symbols as object properties
    public readonly QNH_INVALID: number = YAPI.INVALID_DOUBLE;
    public readonly TECHNOLOGY_INVALID: string = YAPI.INVALID_STRING;

    // API symbols as static members
    public static readonly QNH_INVALID: number = YAPI.INVALID_DOUBLE;
    public static readonly TECHNOLOGY_INVALID: string = YAPI.INVALID_STRING;
    //--- (end of YAltitude attributes declaration)

    constructor(yapi: YAPIContext, func: string)
    {
        //--- (YAltitude constructor)
        super(yapi, func);
        this._className                  = 'Altitude';
        //--- (end of YAltitude constructor)
    }

    //--- (YAltitude implementation)

    imm_parseAttr(name: string, val: any): number
    {
        switch (name) {
        case 'qnh':
            this._qnh = <number> Math.round(<number>val / 65.536) / 1000.0;
            return 1;
        case 'technology':
            this._technology = <string> <string> val;
            return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Changes the current estimated altitude. This allows one to compensate for
     * ambient pressure variations and to work in relative mode.
     * Remember to call the saveToFlash()
     * method of the module if the modification must be kept.
     *
     * @param newval : a floating point number corresponding to the current estimated altitude
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_currentValue(newval: number): Promise<number>
    {
        let rest_val: string;
        rest_val = String(Math.round(newval * 65536.0));
        return await this._setAttr('currentValue', rest_val);
    }

    /**
     * Changes the barometric pressure adjusted to sea level used to compute
     * the altitude (QNH). This enables you to compensate for atmospheric pressure
     * changes due to weather conditions. Applicable to barometric altimeters only.
     * Remember to call the saveToFlash()
     * method of the module if the modification must be kept.
     *
     * @param newval : a floating point number corresponding to the barometric pressure adjusted to sea
     * level used to compute
     *         the altitude (QNH)
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_qnh(newval: number): Promise<number>
    {
        let rest_val: string;
        rest_val = String(Math.round(newval * 65536.0));
        return await this._setAttr('qnh', rest_val);
    }

    /**
     * Returns the barometric pressure adjusted to sea level used to compute
     * the altitude (QNH). Applicable to barometric altimeters only.
     *
     * @return a floating point number corresponding to the barometric pressure adjusted to sea level used to compute
     *         the altitude (QNH)
     *
     * On failure, throws an exception or returns YAltitude.QNH_INVALID.
     */
    async get_qnh(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YAltitude.QNH_INVALID;
            }
        }
        res = this._qnh;
        return res;
    }

    /**
     * Returns the technology used by the sesnor to compute
     * altitude. Possibles values are  "barometric" and "gps"
     *
     * @return a string corresponding to the technology used by the sesnor to compute
     *         altitude
     *
     * On failure, throws an exception or returns YAltitude.TECHNOLOGY_INVALID.
     */
    async get_technology(): Promise<string>
    {
        let res: string;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YAltitude.TECHNOLOGY_INVALID;
            }
        }
        res = this._technology;
        return res;
    }

    /**
     * Retrieves an altimeter for a given identifier.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the altimeter is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YAltitude.isOnline() to test if the altimeter is
     * indeed online at a given time. In case of ambiguity when looking for
     * an altimeter by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the altimeter, for instance
     *         YALTIMK2.altitude.
     *
     * @return a YAltitude object allowing you to drive the altimeter.
     */
    static FindAltitude(func: string): YAltitude
    {
        let obj: YAltitude | null;
        obj = <YAltitude> YFunction._FindFromCache('Altitude', func);
        if (obj == null) {
            obj = new YAltitude(YAPI, func);
            YFunction._AddToCache('Altitude', func, obj);
        }
        return obj;
    }

    /**
     * Retrieves an altimeter for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the altimeter is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YAltitude.isOnline() to test if the altimeter is
     * indeed online at a given time. In case of ambiguity when looking for
     * an altimeter by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx : a YAPI context
     * @param func : a string that uniquely characterizes the altimeter, for instance
     *         YALTIMK2.altitude.
     *
     * @return a YAltitude object allowing you to drive the altimeter.
     */
    static FindAltitudeInContext(yctx: YAPIContext, func: string): YAltitude
    {
        let obj: YAltitude | null;
        obj = <YAltitude> YFunction._FindFromCacheInContext(yctx, 'Altitude', func);
        if (obj == null) {
            obj = new YAltitude(yctx, func);
            YFunction._AddToCache('Altitude', func, obj);
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
    async registerValueCallback(callback: YAltitude.ValueCallback | null): Promise<number>
    {
        let val: string;
        if (callback != null) {
            await YFunction._UpdateValueCallbackList(this, true);
        } else {
            await YFunction._UpdateValueCallbackList(this, false);
        }
        this._valueCallbackAltitude = callback;
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
        if (this._valueCallbackAltitude != null) {
            try {
                await this._valueCallbackAltitude(this, value);
            } catch (e) {
                this._yapi.imm_log('Exception in valueCallback:', e);
            }
        } else {
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
    async registerTimedReportCallback(callback: YAltitude.TimedReportCallback | null): Promise<number>
    {
        let sensor: YSensor | null;
        sensor = this;
        if (callback != null) {
            await YFunction._UpdateTimedReportCallbackList(sensor, true);
        } else {
            await YFunction._UpdateTimedReportCallbackList(sensor, false);
        }
        this._timedReportCallbackAltitude = callback;
        return 0;
    }

    async _invokeTimedReportCallback(value: YMeasure): Promise<number>
    {
        if (this._timedReportCallbackAltitude != null) {
            try {
                await this._timedReportCallbackAltitude(this, value);
            } catch (e) {
                this._yapi.imm_log('Exception in timedReportCallback:', e);
            }
        } else {
            await super._invokeTimedReportCallback(value);
        }
        return 0;
    }

    /**
     * Continues the enumeration of altimeters started using yFirstAltitude().
     * Caution: You can't make any assumption about the returned altimeters order.
     * If you want to find a specific an altimeter, use Altitude.findAltitude()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YAltitude object, corresponding to
     *         an altimeter currently online, or a null pointer
     *         if there are no more altimeters to enumerate.
     */
    nextAltitude(): YAltitude | null
    {
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != YAPI.SUCCESS) return null;
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, <string> resolve.result);
        if (next_hwid == null) return null;
        return YAltitude.FindAltitudeInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of altimeters currently accessible.
     * Use the method YAltitude.nextAltitude() to iterate on
     * next altimeters.
     *
     * @return a pointer to a YAltitude object, corresponding to
     *         the first altimeter currently online, or a null pointer
     *         if there are none.
     */
    static FirstAltitude(): YAltitude | null
    {
        let next_hwid = YAPI.imm_getFirstHardwareId('Altitude');
        if (next_hwid == null) return null;
        return YAltitude.FindAltitude(next_hwid);
    }

    /**
     * Starts the enumeration of altimeters currently accessible.
     * Use the method YAltitude.nextAltitude() to iterate on
     * next altimeters.
     *
     * @param yctx : a YAPI context.
     *
     * @return a pointer to a YAltitude object, corresponding to
     *         the first altimeter currently online, or a null pointer
     *         if there are none.
     */
    static FirstAltitudeInContext(yctx: YAPIContext): YAltitude | null
    {
        let next_hwid = yctx.imm_getFirstHardwareId('Altitude');
        if (next_hwid == null) return null;
        return YAltitude.FindAltitudeInContext(yctx, next_hwid);
    }

    //--- (end of YAltitude implementation)
}

export namespace YAltitude {
    //--- (YAltitude definitions)
    export interface ValueCallback {(func: YAltitude, value: string): void}

    export interface TimedReportCallback {(func: YAltitude, measure: YMeasure): void}

    //--- (end of YAltitude definitions)
}

