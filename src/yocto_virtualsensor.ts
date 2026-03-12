/*********************************************************************
 *
 *  $Id: svn_id $
 *
 *  Implements the high-level API for VirtualSensor functions
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

//--- (YVirtualSensor class start)
/**
 * YVirtualSensor Class: virtual sensor control interface
 *
 * The YVirtualSensor class allows you to use Yoctopuce virtual sensors.
 * These sensors make it possible to show external data collected by the user
 * as a Yoctopuce Sensor. This class inherits from YSensor class the core
 * functions to read measurements, to register callback functions, and to access
 * the autonomous datalogger. It adds the ability to change the sensor value as
 * needed, or to mark current value as invalid.
 */
//--- (end of YVirtualSensor class start)

export class YVirtualSensor extends YSensor
{
    //--- (YVirtualSensor attributes declaration)
    _className: string;
    _invalidValue: number = YVirtualSensor.INVALIDVALUE_INVALID;
    _valueCallbackVirtualSensor: YVirtualSensor.ValueCallback | null = null;
    _timedReportCallbackVirtualSensor: YVirtualSensor.TimedReportCallback | null = null;

    // API symbols as object properties
    public readonly INVALIDVALUE_INVALID: number = YAPI.INVALID_DOUBLE;

    // API symbols as static members
    public static readonly INVALIDVALUE_INVALID: number = YAPI.INVALID_DOUBLE;
    //--- (end of YVirtualSensor attributes declaration)

    constructor(yapi: YAPIContext, func: string)
    {
        //--- (YVirtualSensor constructor)
        super(yapi, func);
        this._className                  = 'VirtualSensor';
        //--- (end of YVirtualSensor constructor)
    }

    //--- (YVirtualSensor implementation)

    imm_parseAttr(name: string, val: any): number
    {
        switch (name) {
        case 'invalidValue':
            this._invalidValue = <number> Math.round(<number>val / 65.536) / 1000.0;
            return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Changes the measuring unit for the measured value.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : a string corresponding to the measuring unit for the measured value
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_unit(newval: string): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('unit', rest_val);
    }

    /**
     * Changes the current value of the sensor (raw value, before calibration).
     *
     * @param newval : a floating point number corresponding to the current value of the sensor (raw
     * value, before calibration)
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_currentRawValue(newval: number): Promise<number>
    {
        let rest_val: string;
        rest_val = String(Math.round(newval * 65536.0));
        return await this._setAttr('currentRawValue', rest_val);
    }

    async set_sensorState(newval: number): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('sensorState', rest_val);
    }

    /**
     * Changes the invalid value of the sensor, returned if the sensor is read when in invalid state
     * (for instance before having been set). Remember to call the saveToFlash()
     * method of the module if the modification must be kept.
     *
     * @param newval : a floating point number corresponding to the invalid value of the sensor, returned
     * if the sensor is read when in invalid state
     *         (for instance before having been set)
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_invalidValue(newval: number): Promise<number>
    {
        let rest_val: string;
        rest_val = String(Math.round(newval * 65536.0));
        return await this._setAttr('invalidValue', rest_val);
    }

    /**
     * Returns the invalid value of the sensor, returned if the sensor is read when in invalid state
     * (for instance before having been set).
     *
     * @return a floating point number corresponding to the invalid value of the sensor, returned if the
     * sensor is read when in invalid state
     *         (for instance before having been set)
     *
     * On failure, throws an exception or returns YVirtualSensor.INVALIDVALUE_INVALID.
     */
    async get_invalidValue(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YVirtualSensor.INVALIDVALUE_INVALID;
            }
        }
        res = this._invalidValue;
        return res;
    }

    /**
     * Retrieves a virtual sensor for a given identifier.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the virtual sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YVirtualSensor.isOnline() to test if the virtual sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a virtual sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the virtual sensor, for instance
     *         MyDevice.virtualSensor1.
     *
     * @return a YVirtualSensor object allowing you to drive the virtual sensor.
     */
    static FindVirtualSensor(func: string): YVirtualSensor
    {
        let obj: YVirtualSensor | null;
        obj = <YVirtualSensor> YFunction._FindFromCache('VirtualSensor', func);
        if (obj == null) {
            obj = new YVirtualSensor(YAPI, func);
            YFunction._AddToCache('VirtualSensor', func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a virtual sensor for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the virtual sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YVirtualSensor.isOnline() to test if the virtual sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a virtual sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx : a YAPI context
     * @param func : a string that uniquely characterizes the virtual sensor, for instance
     *         MyDevice.virtualSensor1.
     *
     * @return a YVirtualSensor object allowing you to drive the virtual sensor.
     */
    static FindVirtualSensorInContext(yctx: YAPIContext, func: string): YVirtualSensor
    {
        let obj: YVirtualSensor | null;
        obj = <YVirtualSensor> YFunction._FindFromCacheInContext(yctx, 'VirtualSensor', func);
        if (obj == null) {
            obj = new YVirtualSensor(yctx, func);
            YFunction._AddToCache('VirtualSensor', func, obj);
        }
        return obj;
    }

    /**
     * Registers the callback function that is invoked on every change of advertised value.
     * The callback is then invoked only during the execution of ySleep or yHandleEvents.
     * This provides control over the time when the callback is triggered. For good responsiveness,
     * remember to call one of these two functions periodically. The callback is called once juste after beeing
     * registered, passing the current advertised value  of the function, provided that it is not an empty string.
     * To unregister a callback, pass a null pointer as argument.
     *
     * @param callback : the callback function to call, or a null pointer. The callback function should take two
     *         arguments: the function object of which the value has changed, and the character string describing
     *         the new advertised value.
     * @noreturn
     */
    async registerValueCallback(callback: YVirtualSensor.ValueCallback | null): Promise<number>
    {
        let val: string;
        if (callback != null) {
            await YFunction._UpdateValueCallbackList(this, true);
        } else {
            await YFunction._UpdateValueCallbackList(this, false);
        }
        this._valueCallbackVirtualSensor = callback;
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
        if (this._valueCallbackVirtualSensor != null) {
            try {
                await this._valueCallbackVirtualSensor(this, value);
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
    async registerTimedReportCallback(callback: YVirtualSensor.TimedReportCallback | null): Promise<number>
    {
        let sensor: YSensor | null;
        sensor = this;
        if (callback != null) {
            await YFunction._UpdateTimedReportCallbackList(sensor, true);
        } else {
            await YFunction._UpdateTimedReportCallbackList(sensor, false);
        }
        this._timedReportCallbackVirtualSensor = callback;
        return 0;
    }

    async _invokeTimedReportCallback(value: YMeasure): Promise<number>
    {
        if (this._timedReportCallbackVirtualSensor != null) {
            try {
                await this._timedReportCallbackVirtualSensor(this, value);
            } catch (e) {
                this._yapi.imm_log('Exception in timedReportCallback:', e);
            }
        } else {
            await super._invokeTimedReportCallback(value);
        }
        return 0;
    }

    /**
     * Changes the current sensor state to invalid (as if no value would have been ever set).
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_sensorAsInvalid(): Promise<number>
    {
        return await this.set_sensorState(1);
    }

    /**
     * Continues the enumeration of virtual sensors started using yFirstVirtualSensor().
     * Caution: You can't make any assumption about the returned virtual sensors order.
     * If you want to find a specific a virtual sensor, use VirtualSensor.findVirtualSensor()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YVirtualSensor object, corresponding to
     *         a virtual sensor currently online, or a null pointer
     *         if there are no more virtual sensors to enumerate.
     */
    nextVirtualSensor(): YVirtualSensor | null
    {
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != YAPI.SUCCESS) return null;
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, <string> resolve.result);
        if (next_hwid == null) return null;
        return YVirtualSensor.FindVirtualSensorInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of virtual sensors currently accessible.
     * Use the method YVirtualSensor.nextVirtualSensor() to iterate on
     * next virtual sensors.
     *
     * @return a pointer to a YVirtualSensor object, corresponding to
     *         the first virtual sensor currently online, or a null pointer
     *         if there are none.
     */
    static FirstVirtualSensor(): YVirtualSensor | null
    {
        let next_hwid = YAPI.imm_getFirstHardwareId('VirtualSensor');
        if (next_hwid == null) return null;
        return YVirtualSensor.FindVirtualSensor(next_hwid);
    }

    /**
     * Starts the enumeration of virtual sensors currently accessible.
     * Use the method YVirtualSensor.nextVirtualSensor() to iterate on
     * next virtual sensors.
     *
     * @param yctx : a YAPI context.
     *
     * @return a pointer to a YVirtualSensor object, corresponding to
     *         the first virtual sensor currently online, or a null pointer
     *         if there are none.
     */
    static FirstVirtualSensorInContext(yctx: YAPIContext): YVirtualSensor | null
    {
        let next_hwid = yctx.imm_getFirstHardwareId('VirtualSensor');
        if (next_hwid == null) return null;
        return YVirtualSensor.FindVirtualSensorInContext(yctx, next_hwid);
    }

    //--- (end of YVirtualSensor implementation)
}

export namespace YVirtualSensor {
    //--- (YVirtualSensor definitions)
    export interface ValueCallback {(func: YVirtualSensor, value: string): void}

    export interface TimedReportCallback {(func: YVirtualSensor, measure: YMeasure): void}

    //--- (end of YVirtualSensor definitions)
}

