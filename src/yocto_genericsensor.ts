/*********************************************************************
 *
 *  $Id: yocto_genericsensor.ts 54279 2023-04-28 10:11:03Z seb $
 *
 *  Implements the high-level API for GenericSensor functions
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

//--- (YGenericSensor class start)
/**
 * YGenericSensor Class: GenericSensor control interface, available for instance in the
 * Yocto-0-10V-Rx, the Yocto-4-20mA-Rx, the Yocto-Bridge or the Yocto-milliVolt-Rx
 *
 * The YGenericSensor class allows you to read and configure Yoctopuce signal
 * transducers. It inherits from YSensor class the core functions to read measurements,
 * to register callback functions, to access the autonomous datalogger.
 * This class adds the ability to configure the automatic conversion between the
 * measured signal and the corresponding engineering unit.
 */
//--- (end of YGenericSensor class start)

export class YGenericSensor extends YSensor
{
    //--- (YGenericSensor attributes declaration)
    _className: string;
    _signalValue: number = YGenericSensor.SIGNALVALUE_INVALID;
    _signalUnit: string = YGenericSensor.SIGNALUNIT_INVALID;
    _signalRange: string = YGenericSensor.SIGNALRANGE_INVALID;
    _valueRange: string = YGenericSensor.VALUERANGE_INVALID;
    _signalBias: number = YGenericSensor.SIGNALBIAS_INVALID;
    _signalSampling: YGenericSensor.SIGNALSAMPLING = YGenericSensor.SIGNALSAMPLING_INVALID;
    _enabled: YGenericSensor.ENABLED = YGenericSensor.ENABLED_INVALID;
    _valueCallbackGenericSensor: YGenericSensor.ValueCallback | null = null;
    _timedReportCallbackGenericSensor: YGenericSensor.TimedReportCallback | null = null;

    // API symbols as object properties
    public readonly SIGNALVALUE_INVALID: number = YAPI.INVALID_DOUBLE;
    public readonly SIGNALUNIT_INVALID: string = YAPI.INVALID_STRING;
    public readonly SIGNALRANGE_INVALID: string = YAPI.INVALID_STRING;
    public readonly VALUERANGE_INVALID: string = YAPI.INVALID_STRING;
    public readonly SIGNALBIAS_INVALID: number = YAPI.INVALID_DOUBLE;
    public readonly SIGNALSAMPLING_HIGH_RATE: YGenericSensor.SIGNALSAMPLING = 0;
    public readonly SIGNALSAMPLING_HIGH_RATE_FILTERED: YGenericSensor.SIGNALSAMPLING = 1;
    public readonly SIGNALSAMPLING_LOW_NOISE: YGenericSensor.SIGNALSAMPLING = 2;
    public readonly SIGNALSAMPLING_LOW_NOISE_FILTERED: YGenericSensor.SIGNALSAMPLING = 3;
    public readonly SIGNALSAMPLING_HIGHEST_RATE: YGenericSensor.SIGNALSAMPLING = 4;
    public readonly SIGNALSAMPLING_AC: YGenericSensor.SIGNALSAMPLING = 5;
    public readonly SIGNALSAMPLING_INVALID: YGenericSensor.SIGNALSAMPLING = -1;
    public readonly ENABLED_FALSE: YGenericSensor.ENABLED = 0;
    public readonly ENABLED_TRUE: YGenericSensor.ENABLED = 1;
    public readonly ENABLED_INVALID: YGenericSensor.ENABLED = -1;

    // API symbols as static members
    public static readonly SIGNALVALUE_INVALID: number = YAPI.INVALID_DOUBLE;
    public static readonly SIGNALUNIT_INVALID: string = YAPI.INVALID_STRING;
    public static readonly SIGNALRANGE_INVALID: string = YAPI.INVALID_STRING;
    public static readonly VALUERANGE_INVALID: string = YAPI.INVALID_STRING;
    public static readonly SIGNALBIAS_INVALID: number = YAPI.INVALID_DOUBLE;
    public static readonly SIGNALSAMPLING_HIGH_RATE: YGenericSensor.SIGNALSAMPLING = 0;
    public static readonly SIGNALSAMPLING_HIGH_RATE_FILTERED: YGenericSensor.SIGNALSAMPLING = 1;
    public static readonly SIGNALSAMPLING_LOW_NOISE: YGenericSensor.SIGNALSAMPLING = 2;
    public static readonly SIGNALSAMPLING_LOW_NOISE_FILTERED: YGenericSensor.SIGNALSAMPLING = 3;
    public static readonly SIGNALSAMPLING_HIGHEST_RATE: YGenericSensor.SIGNALSAMPLING = 4;
    public static readonly SIGNALSAMPLING_AC: YGenericSensor.SIGNALSAMPLING = 5;
    public static readonly SIGNALSAMPLING_INVALID: YGenericSensor.SIGNALSAMPLING = -1;
    public static readonly ENABLED_FALSE: YGenericSensor.ENABLED = 0;
    public static readonly ENABLED_TRUE: YGenericSensor.ENABLED = 1;
    public static readonly ENABLED_INVALID: YGenericSensor.ENABLED = -1;
    //--- (end of YGenericSensor attributes declaration)

    constructor(yapi: YAPIContext, func: string)
    {
        //--- (YGenericSensor constructor)
        super(yapi, func);
        this._className                  = 'GenericSensor';
        //--- (end of YGenericSensor constructor)
    }

    //--- (YGenericSensor implementation)

    imm_parseAttr(name: string, val: any)
    {
        switch (name) {
        case 'signalValue':
            this._signalValue = <number> Math.round(<number>val / 65.536) / 1000.0;
            return 1;
        case 'signalUnit':
            this._signalUnit = <string> <string> val;
            return 1;
        case 'signalRange':
            this._signalRange = <string> <string> val;
            return 1;
        case 'valueRange':
            this._valueRange = <string> <string> val;
            return 1;
        case 'signalBias':
            this._signalBias = <number> Math.round(<number>val / 65.536) / 1000.0;
            return 1;
        case 'signalSampling':
            this._signalSampling = <YGenericSensor.SIGNALSAMPLING> <number> val;
            return 1;
        case 'enabled':
            this._enabled = <YGenericSensor.ENABLED> <number> val;
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
     * Returns the current value of the electrical signal measured by the sensor.
     *
     * @return a floating point number corresponding to the current value of the electrical signal
     * measured by the sensor
     *
     * On failure, throws an exception or returns YGenericSensor.SIGNALVALUE_INVALID.
     */
    async get_signalValue(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YGenericSensor.SIGNALVALUE_INVALID;
            }
        }
        res = Math.round(this._signalValue * 1000) / 1000;
        return res;
    }

    /**
     * Returns the measuring unit of the electrical signal used by the sensor.
     *
     * @return a string corresponding to the measuring unit of the electrical signal used by the sensor
     *
     * On failure, throws an exception or returns YGenericSensor.SIGNALUNIT_INVALID.
     */
    async get_signalUnit(): Promise<string>
    {
        let res: string;
        if (this._cacheExpiration == 0) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YGenericSensor.SIGNALUNIT_INVALID;
            }
        }
        res = this._signalUnit;
        return res;
    }

    /**
     * Returns the input signal range used by the sensor.
     *
     * @return a string corresponding to the input signal range used by the sensor
     *
     * On failure, throws an exception or returns YGenericSensor.SIGNALRANGE_INVALID.
     */
    async get_signalRange(): Promise<string>
    {
        let res: string;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YGenericSensor.SIGNALRANGE_INVALID;
            }
        }
        res = this._signalRange;
        return res;
    }

    /**
     * Changes the input signal range used by the sensor.
     * When the input signal gets out of the planned range, the output value
     * will be set to an arbitrary large value, whose sign indicates the direction
     * of the range overrun.
     *
     * For a 4-20mA sensor, the default input signal range is "4...20".
     * For a 0-10V sensor, the default input signal range is "0.1...10".
     * For numeric communication interfaces, the default input signal range is
     * "-999999.999...999999.999".
     *
     * Remember to call the saveToFlash()
     * method of the module if the modification must be kept.
     *
     * @param newval : a string corresponding to the input signal range used by the sensor
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_signalRange(newval: string): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('signalRange', rest_val);
    }

    /**
     * Returns the physical value range measured by the sensor.
     *
     * @return a string corresponding to the physical value range measured by the sensor
     *
     * On failure, throws an exception or returns YGenericSensor.VALUERANGE_INVALID.
     */
    async get_valueRange(): Promise<string>
    {
        let res: string;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YGenericSensor.VALUERANGE_INVALID;
            }
        }
        res = this._valueRange;
        return res;
    }

    /**
     * Changes the output value range, corresponding to the physical value measured
     * by the sensor. The default output value range is the same as the input signal
     * range (1:1 mapping), but you can change it so that the function automatically
     * computes the physical value encoded by the input signal. Be aware that, as a
     * side effect, the range modification may automatically modify the display resolution.
     *
     * Remember to call the saveToFlash()
     * method of the module if the modification must be kept.
     *
     * @param newval : a string corresponding to the output value range, corresponding to the physical value measured
     *         by the sensor
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_valueRange(newval: string): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('valueRange', rest_val);
    }

    /**
     * Changes the electric signal bias for zero shift adjustment.
     * If your electric signal reads positive when it should be zero, setup
     * a positive signalBias of the same value to fix the zero shift.
     * Remember to call the saveToFlash()
     * method of the module if the modification must be kept.
     *
     * @param newval : a floating point number corresponding to the electric signal bias for zero shift adjustment
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_signalBias(newval: number): Promise<number>
    {
        let rest_val: string;
        rest_val = String(Math.round(newval * 65536.0));
        return await this._setAttr('signalBias', rest_val);
    }

    /**
     * Returns the electric signal bias for zero shift adjustment.
     * A positive bias means that the signal is over-reporting the measure,
     * while a negative bias means that the signal is under-reporting the measure.
     *
     * @return a floating point number corresponding to the electric signal bias for zero shift adjustment
     *
     * On failure, throws an exception or returns YGenericSensor.SIGNALBIAS_INVALID.
     */
    async get_signalBias(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YGenericSensor.SIGNALBIAS_INVALID;
            }
        }
        res = this._signalBias;
        return res;
    }

    /**
     * Returns the electric signal sampling method to use.
     * The HIGH_RATE method uses the highest sampling frequency, without any filtering.
     * The HIGH_RATE_FILTERED method adds a windowed 7-sample median filter.
     * The LOW_NOISE method uses a reduced acquisition frequency to reduce noise.
     * The LOW_NOISE_FILTERED method combines a reduced frequency with the median filter
     * to get measures as stable as possible when working on a noisy signal.
     *
     * @return a value among YGenericSensor.SIGNALSAMPLING_HIGH_RATE,
     * YGenericSensor.SIGNALSAMPLING_HIGH_RATE_FILTERED, YGenericSensor.SIGNALSAMPLING_LOW_NOISE,
     * YGenericSensor.SIGNALSAMPLING_LOW_NOISE_FILTERED, YGenericSensor.SIGNALSAMPLING_HIGHEST_RATE and
     * YGenericSensor.SIGNALSAMPLING_AC corresponding to the electric signal sampling method to use
     *
     * On failure, throws an exception or returns YGenericSensor.SIGNALSAMPLING_INVALID.
     */
    async get_signalSampling(): Promise<YGenericSensor.SIGNALSAMPLING>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YGenericSensor.SIGNALSAMPLING_INVALID;
            }
        }
        res = this._signalSampling;
        return res;
    }

    /**
     * Changes the electric signal sampling method to use.
     * The HIGH_RATE method uses the highest sampling frequency, without any filtering.
     * The HIGH_RATE_FILTERED method adds a windowed 7-sample median filter.
     * The LOW_NOISE method uses a reduced acquisition frequency to reduce noise.
     * The LOW_NOISE_FILTERED method combines a reduced frequency with the median filter
     * to get measures as stable as possible when working on a noisy signal.
     * Remember to call the saveToFlash()
     * method of the module if the modification must be kept.
     *
     * @param newval : a value among YGenericSensor.SIGNALSAMPLING_HIGH_RATE,
     * YGenericSensor.SIGNALSAMPLING_HIGH_RATE_FILTERED, YGenericSensor.SIGNALSAMPLING_LOW_NOISE,
     * YGenericSensor.SIGNALSAMPLING_LOW_NOISE_FILTERED, YGenericSensor.SIGNALSAMPLING_HIGHEST_RATE and
     * YGenericSensor.SIGNALSAMPLING_AC corresponding to the electric signal sampling method to use
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_signalSampling(newval: YGenericSensor.SIGNALSAMPLING): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('signalSampling', rest_val);
    }

    /**
     * Returns the activation state of this input.
     *
     * @return either YGenericSensor.ENABLED_FALSE or YGenericSensor.ENABLED_TRUE, according to the
     * activation state of this input
     *
     * On failure, throws an exception or returns YGenericSensor.ENABLED_INVALID.
     */
    async get_enabled(): Promise<YGenericSensor.ENABLED>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YGenericSensor.ENABLED_INVALID;
            }
        }
        res = this._enabled;
        return res;
    }

    /**
     * Changes the activation state of this input. When an input is disabled,
     * its value is no more updated. On some devices, disabling an input can
     * improve the refresh rate of the other active inputs.
     * Remember to call the saveToFlash()
     * method of the module if the modification must be kept.
     *
     * @param newval : either YGenericSensor.ENABLED_FALSE or YGenericSensor.ENABLED_TRUE, according to
     * the activation state of this input
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_enabled(newval: YGenericSensor.ENABLED): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('enabled', rest_val);
    }

    /**
     * Retrieves a generic sensor for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the generic sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YGenericSensor.isOnline() to test if the generic sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a generic sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the generic sensor, for instance
     *         RX010V01.genericSensor1.
     *
     * @return a YGenericSensor object allowing you to drive the generic sensor.
     */
    static FindGenericSensor(func: string): YGenericSensor
    {
        let obj: YGenericSensor | null;
        obj = <YGenericSensor> YFunction._FindFromCache('GenericSensor', func);
        if (obj == null) {
            obj = new YGenericSensor(YAPI, func);
            YFunction._AddToCache('GenericSensor',  func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a generic sensor for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the generic sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YGenericSensor.isOnline() to test if the generic sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a generic sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx : a YAPI context
     * @param func : a string that uniquely characterizes the generic sensor, for instance
     *         RX010V01.genericSensor1.
     *
     * @return a YGenericSensor object allowing you to drive the generic sensor.
     */
    static FindGenericSensorInContext(yctx: YAPIContext, func: string): YGenericSensor
    {
        let obj: YGenericSensor | null;
        obj = <YGenericSensor> YFunction._FindFromCacheInContext(yctx,  'GenericSensor', func);
        if (obj == null) {
            obj = new YGenericSensor(yctx, func);
            YFunction._AddToCache('GenericSensor',  func, obj);
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
    async registerValueCallback(callback: YGenericSensor.ValueCallback | null): Promise<number>
    {
        let val: string;
        if (callback != null) {
            await YFunction._UpdateValueCallbackList(this, true);
        } else {
            await YFunction._UpdateValueCallbackList(this, false);
        }
        this._valueCallbackGenericSensor = callback;
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
        if (this._valueCallbackGenericSensor != null) {
            try {
                await this._valueCallbackGenericSensor(this, value);
            } catch (e) {
                this._yapi.imm_log('Exception in valueCallback:', e);
            }
        } else {
            super._invokeValueCallback(value);
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
    async registerTimedReportCallback(callback: YGenericSensor.TimedReportCallback | null): Promise<number>
    {
        let sensor: YSensor | null;
        sensor = this;
        if (callback != null) {
            await YFunction._UpdateTimedReportCallbackList(sensor, true);
        } else {
            await YFunction._UpdateTimedReportCallbackList(sensor, false);
        }
        this._timedReportCallbackGenericSensor = callback;
        return 0;
    }

    async _invokeTimedReportCallback(value: YMeasure): Promise<number>
    {
        if (this._timedReportCallbackGenericSensor != null) {
            try {
                await this._timedReportCallbackGenericSensor(this, value);
            } catch (e) {
                this._yapi.imm_log('Exception in timedReportCallback:', e);
            }
        } else {
            super._invokeTimedReportCallback(value);
        }
        return 0;
    }

    /**
     * Adjusts the signal bias so that the current signal value is need
     * precisely as zero. Remember to call the saveToFlash()
     * method of the module if the modification must be kept.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async zeroAdjust(): Promise<number>
    {
        let currSignal: number;
        let currBias: number;
        currSignal = await this.get_signalValue();
        currBias = await this.get_signalBias();
        return await this.set_signalBias(currSignal + currBias);
    }

    /**
     * Continues the enumeration of generic sensors started using yFirstGenericSensor().
     * Caution: You can't make any assumption about the returned generic sensors order.
     * If you want to find a specific a generic sensor, use GenericSensor.findGenericSensor()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YGenericSensor object, corresponding to
     *         a generic sensor currently online, or a null pointer
     *         if there are no more generic sensors to enumerate.
     */
    nextGenericSensor(): YGenericSensor | null
    {
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != YAPI.SUCCESS) return null;
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, <string> resolve.result);
        if (next_hwid == null) return null;
        return YGenericSensor.FindGenericSensorInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of generic sensors currently accessible.
     * Use the method YGenericSensor.nextGenericSensor() to iterate on
     * next generic sensors.
     *
     * @return a pointer to a YGenericSensor object, corresponding to
     *         the first generic sensor currently online, or a null pointer
     *         if there are none.
     */
    static FirstGenericSensor(): YGenericSensor | null
    {
        let next_hwid = YAPI.imm_getFirstHardwareId('GenericSensor');
        if (next_hwid == null) return null;
        return YGenericSensor.FindGenericSensor(next_hwid);
    }

    /**
     * Starts the enumeration of generic sensors currently accessible.
     * Use the method YGenericSensor.nextGenericSensor() to iterate on
     * next generic sensors.
     *
     * @param yctx : a YAPI context.
     *
     * @return a pointer to a YGenericSensor object, corresponding to
     *         the first generic sensor currently online, or a null pointer
     *         if there are none.
     */
    static FirstGenericSensorInContext(yctx: YAPIContext): YGenericSensor | null
    {
        let next_hwid = yctx.imm_getFirstHardwareId('GenericSensor');
        if (next_hwid == null) return null;
        return YGenericSensor.FindGenericSensorInContext(yctx, next_hwid);
    }

    //--- (end of YGenericSensor implementation)
}

export namespace YGenericSensor {
    //--- (YGenericSensor definitions)
    export const enum SIGNALSAMPLING
    {
        HIGH_RATE = 0,
        HIGH_RATE_FILTERED = 1,
        LOW_NOISE = 2,
        LOW_NOISE_FILTERED = 3,
        HIGHEST_RATE = 4,
        AC = 5,
        INVALID = -1
    }

    export const enum ENABLED
    {
        FALSE = 0,
        TRUE = 1,
        INVALID = -1
    }

    export interface ValueCallback {(func: YGenericSensor, value: string): void}

    export interface TimedReportCallback {(func: YGenericSensor, measure: YMeasure): void}

    //--- (end of YGenericSensor definitions)
}

