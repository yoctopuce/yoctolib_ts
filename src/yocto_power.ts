/*********************************************************************
 *
 *  $Id: yocto_power.ts 63327 2024-11-13 09:35:03Z seb $
 *
 *  Implements the high-level API for Power functions
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

//--- (YPower class start)
/**
 * YPower Class: electrical power sensor control interface, available for instance in the Yocto-Watt
 *
 * The YPower class allows you to read and configure Yoctopuce electrical power sensors.
 * It inherits from YSensor class the core functions to read measurements,
 * to register callback functions, and to access the autonomous datalogger.
 * This class adds the ability to access the energy counter and the power factor.
 */
//--- (end of YPower class start)

export class YPower extends YSensor
{
    //--- (YPower attributes declaration)
    _className: string;
    _powerFactor: number = YPower.POWERFACTOR_INVALID;
    _cosPhi: number = YPower.COSPHI_INVALID;
    _meter: number = YPower.METER_INVALID;
    _deliveredEnergyMeter: number = YPower.DELIVEREDENERGYMETER_INVALID;
    _receivedEnergyMeter: number = YPower.RECEIVEDENERGYMETER_INVALID;
    _meterTimer: number = YPower.METERTIMER_INVALID;
    _valueCallbackPower: YPower.ValueCallback | null = null;
    _timedReportCallbackPower: YPower.TimedReportCallback | null = null;

    // API symbols as object properties
    public readonly POWERFACTOR_INVALID: number = YAPI.INVALID_DOUBLE;
    public readonly COSPHI_INVALID: number = YAPI.INVALID_DOUBLE;
    public readonly METER_INVALID: number = YAPI.INVALID_DOUBLE;
    public readonly DELIVEREDENERGYMETER_INVALID: number = YAPI.INVALID_DOUBLE;
    public readonly RECEIVEDENERGYMETER_INVALID: number = YAPI.INVALID_DOUBLE;
    public readonly METERTIMER_INVALID: number = YAPI.INVALID_UINT;

    // API symbols as static members
    public static readonly POWERFACTOR_INVALID: number = YAPI.INVALID_DOUBLE;
    public static readonly COSPHI_INVALID: number = YAPI.INVALID_DOUBLE;
    public static readonly METER_INVALID: number = YAPI.INVALID_DOUBLE;
    public static readonly DELIVEREDENERGYMETER_INVALID: number = YAPI.INVALID_DOUBLE;
    public static readonly RECEIVEDENERGYMETER_INVALID: number = YAPI.INVALID_DOUBLE;
    public static readonly METERTIMER_INVALID: number = YAPI.INVALID_UINT;
    //--- (end of YPower attributes declaration)

    constructor(yapi: YAPIContext, func: string)
    {
        //--- (YPower constructor)
        super(yapi, func);
        this._className                  = 'Power';
        //--- (end of YPower constructor)
    }

    //--- (YPower implementation)

    imm_parseAttr(name: string, val: any): number
    {
        switch (name) {
        case 'powerFactor':
            this._powerFactor = <number> Math.round(<number>val / 65.536) / 1000.0;
            return 1;
        case 'cosPhi':
            this._cosPhi = <number> Math.round(<number>val / 65.536) / 1000.0;
            return 1;
        case 'meter':
            this._meter = <number> Math.round(<number>val / 65.536) / 1000.0;
            return 1;
        case 'deliveredEnergyMeter':
            this._deliveredEnergyMeter = <number> Math.round(<number>val / 65.536) / 1000.0;
            return 1;
        case 'receivedEnergyMeter':
            this._receivedEnergyMeter = <number> Math.round(<number>val / 65.536) / 1000.0;
            return 1;
        case 'meterTimer':
            this._meterTimer = <number> <number> val;
            return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Returns the power factor (PF), i.e. ratio between the active power consumed (in W)
     * and the apparent power provided (VA).
     *
     * @return a floating point number corresponding to the power factor (PF), i.e
     *
     * On failure, throws an exception or returns YPower.POWERFACTOR_INVALID.
     */
    async get_powerFactor(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YPower.POWERFACTOR_INVALID;
            }
        }
        res = this._powerFactor;
        if (res == YPower.POWERFACTOR_INVALID) {
            res = this._cosPhi;
        }
        res = Math.round(res * 1000) / 1000;
        return res;
    }

    /**
     * Returns the Displacement Power factor (DPF), i.e. cosine of the phase shift between
     * the voltage and current fundamentals.
     * On the Yocto-Watt (V1), the value returned by this method correponds to the
     * power factor as this device is cannot estimate the true DPF.
     *
     * @return a floating point number corresponding to the Displacement Power factor (DPF), i.e
     *
     * On failure, throws an exception or returns YPower.COSPHI_INVALID.
     */
    async get_cosPhi(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YPower.COSPHI_INVALID;
            }
        }
        res = this._cosPhi;
        return res;
    }

    async set_meter(newval: number): Promise<number>
    {
        let rest_val: string;
        rest_val = String(Math.round(newval * 65536.0));
        return await this._setAttr('meter', rest_val);
    }

    /**
     * Returns the energy counter, maintained by the wattmeter by integrating the
     * power consumption over time. This is the sum of forward and backwad energy transfers,
     * if you are insterested in only one direction, use  get_receivedEnergyMeter() or
     * get_deliveredEnergyMeter(). Note that this counter is reset at each start of the device.
     *
     * @return a floating point number corresponding to the energy counter, maintained by the wattmeter by
     * integrating the
     *         power consumption over time
     *
     * On failure, throws an exception or returns YPower.METER_INVALID.
     */
    async get_meter(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YPower.METER_INVALID;
            }
        }
        res = this._meter;
        return res;
    }

    /**
     * Returns the energy counter, maintained by the wattmeter by integrating the power consumption over time,
     * but only when positive. Note that this counter is reset at each start of the device.
     *
     * @return a floating point number corresponding to the energy counter, maintained by the wattmeter by
     * integrating the power consumption over time,
     *         but only when positive
     *
     * On failure, throws an exception or returns YPower.DELIVEREDENERGYMETER_INVALID.
     */
    async get_deliveredEnergyMeter(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YPower.DELIVEREDENERGYMETER_INVALID;
            }
        }
        res = this._deliveredEnergyMeter;
        return res;
    }

    /**
     * Returns the energy counter, maintained by the wattmeter by integrating the power consumption over time,
     * but only when negative. Note that this counter is reset at each start of the device.
     *
     * @return a floating point number corresponding to the energy counter, maintained by the wattmeter by
     * integrating the power consumption over time,
     *         but only when negative
     *
     * On failure, throws an exception or returns YPower.RECEIVEDENERGYMETER_INVALID.
     */
    async get_receivedEnergyMeter(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YPower.RECEIVEDENERGYMETER_INVALID;
            }
        }
        res = this._receivedEnergyMeter;
        return res;
    }

    /**
     * Returns the elapsed time since last energy counter reset, in seconds.
     *
     * @return an integer corresponding to the elapsed time since last energy counter reset, in seconds
     *
     * On failure, throws an exception or returns YPower.METERTIMER_INVALID.
     */
    async get_meterTimer(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YPower.METERTIMER_INVALID;
            }
        }
        res = this._meterTimer;
        return res;
    }

    /**
     * Retrieves a electrical power sensor for a given identifier.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the electrical power sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YPower.isOnline() to test if the electrical power sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a electrical power sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the electrical power sensor, for instance
     *         YWATTMK1.power.
     *
     * @return a YPower object allowing you to drive the electrical power sensor.
     */
    static FindPower(func: string): YPower
    {
        let obj: YPower | null;
        obj = <YPower> YFunction._FindFromCache('Power', func);
        if (obj == null) {
            obj = new YPower(YAPI, func);
            YFunction._AddToCache('Power', func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a electrical power sensor for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the electrical power sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YPower.isOnline() to test if the electrical power sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a electrical power sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx : a YAPI context
     * @param func : a string that uniquely characterizes the electrical power sensor, for instance
     *         YWATTMK1.power.
     *
     * @return a YPower object allowing you to drive the electrical power sensor.
     */
    static FindPowerInContext(yctx: YAPIContext, func: string): YPower
    {
        let obj: YPower | null;
        obj = <YPower> YFunction._FindFromCacheInContext(yctx, 'Power', func);
        if (obj == null) {
            obj = new YPower(yctx, func);
            YFunction._AddToCache('Power', func, obj);
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
    async registerValueCallback(callback: YPower.ValueCallback | null): Promise<number>
    {
        let val: string;
        if (callback != null) {
            await YFunction._UpdateValueCallbackList(this, true);
        } else {
            await YFunction._UpdateValueCallbackList(this, false);
        }
        this._valueCallbackPower = callback;
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
        if (this._valueCallbackPower != null) {
            try {
                await this._valueCallbackPower(this, value);
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
    async registerTimedReportCallback(callback: YPower.TimedReportCallback | null): Promise<number>
    {
        let sensor: YSensor | null;
        sensor = this;
        if (callback != null) {
            await YFunction._UpdateTimedReportCallbackList(sensor, true);
        } else {
            await YFunction._UpdateTimedReportCallbackList(sensor, false);
        }
        this._timedReportCallbackPower = callback;
        return 0;
    }

    async _invokeTimedReportCallback(value: YMeasure): Promise<number>
    {
        if (this._timedReportCallbackPower != null) {
            try {
                await this._timedReportCallbackPower(this, value);
            } catch (e) {
                this._yapi.imm_log('Exception in timedReportCallback:', e);
            }
        } else {
            await super._invokeTimedReportCallback(value);
        }
        return 0;
    }

    /**
     * Resets the energy counters.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async reset(): Promise<number>
    {
        return await this.set_meter(0);
    }

    /**
     * Continues the enumeration of electrical power sensors started using yFirstPower().
     * Caution: You can't make any assumption about the returned electrical power sensors order.
     * If you want to find a specific a electrical power sensor, use Power.findPower()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YPower object, corresponding to
     *         a electrical power sensor currently online, or a null pointer
     *         if there are no more electrical power sensors to enumerate.
     */
    nextPower(): YPower | null
    {
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != YAPI.SUCCESS) return null;
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, <string> resolve.result);
        if (next_hwid == null) return null;
        return YPower.FindPowerInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of electrical power sensors currently accessible.
     * Use the method YPower.nextPower() to iterate on
     * next electrical power sensors.
     *
     * @return a pointer to a YPower object, corresponding to
     *         the first electrical power sensor currently online, or a null pointer
     *         if there are none.
     */
    static FirstPower(): YPower | null
    {
        let next_hwid = YAPI.imm_getFirstHardwareId('Power');
        if (next_hwid == null) return null;
        return YPower.FindPower(next_hwid);
    }

    /**
     * Starts the enumeration of electrical power sensors currently accessible.
     * Use the method YPower.nextPower() to iterate on
     * next electrical power sensors.
     *
     * @param yctx : a YAPI context.
     *
     * @return a pointer to a YPower object, corresponding to
     *         the first electrical power sensor currently online, or a null pointer
     *         if there are none.
     */
    static FirstPowerInContext(yctx: YAPIContext): YPower | null
    {
        let next_hwid = yctx.imm_getFirstHardwareId('Power');
        if (next_hwid == null) return null;
        return YPower.FindPowerInContext(yctx, next_hwid);
    }

    //--- (end of YPower implementation)
}

export namespace YPower {
    //--- (YPower definitions)
    export interface ValueCallback {(func: YPower, value: string): void}

    export interface TimedReportCallback {(func: YPower, measure: YMeasure): void}

    //--- (end of YPower definitions)
}

