/*********************************************************************
 *
 *  $Id: yocto_rangefinder.ts 43483 2021-01-21 15:47:50Z mvuilleu $
 *
 *  Implements the high-level API for RangeFinder functions
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

//--- (YRangeFinder definitions)
export const enum YRangeFinder_RangeFinderMode {
    DEFAULT = 0,
    LONG_RANGE = 1,
    HIGH_ACCURACY = 2,
    HIGH_SPEED = 3,
    INVALID = -1
}
export interface YRangeFinderValueCallback { (func: YRangeFinder, value: string): void }
export interface YRangeFinderTimedReportCallback { (func: YRangeFinder, measure: YMeasure): void }
//--- (end of YRangeFinder definitions)

//--- (YRangeFinder class start)
/**
 * YRangeFinder Class: range finder control interface, available for instance in the Yocto-RangeFinder
 *
 * The YRangeFinder class allows you to read and configure Yoctopuce range finders.
 * It inherits from YSensor class the core functions to read measurements,
 * to register callback functions, and to access the autonomous datalogger.
 * This class adds the ability to easily perform a one-point linear calibration
 * to compensate the effect of a glass or filter placed in front of the sensor.
 */
//--- (end of YRangeFinder class start)

export class YRangeFinder extends YSensor
{
    //--- (YRangeFinder attributes declaration)
    _className: string;
    _rangeFinderMode: YRangeFinder_RangeFinderMode = YRangeFinder.RANGEFINDERMODE_INVALID;
    _timeFrame: number = YRangeFinder.TIMEFRAME_INVALID;
    _quality: number = YRangeFinder.QUALITY_INVALID;
    _hardwareCalibration: string = YRangeFinder.HARDWARECALIBRATION_INVALID;
    _currentTemperature: number = YRangeFinder.CURRENTTEMPERATURE_INVALID;
    _command: string = YRangeFinder.COMMAND_INVALID;
    _valueCallbackRangeFinder: YRangeFinderValueCallback | null = null;
    _timedReportCallbackRangeFinder: YRangeFinderTimedReportCallback | null = null;

    // API symbols as object properties
    public readonly RANGEFINDERMODE_DEFAULT: YRangeFinder_RangeFinderMode = YRangeFinder_RangeFinderMode.DEFAULT;
    public readonly RANGEFINDERMODE_LONG_RANGE: YRangeFinder_RangeFinderMode = YRangeFinder_RangeFinderMode.LONG_RANGE;
    public readonly RANGEFINDERMODE_HIGH_ACCURACY: YRangeFinder_RangeFinderMode = YRangeFinder_RangeFinderMode.HIGH_ACCURACY;
    public readonly RANGEFINDERMODE_HIGH_SPEED: YRangeFinder_RangeFinderMode = YRangeFinder_RangeFinderMode.HIGH_SPEED;
    public readonly RANGEFINDERMODE_INVALID: YRangeFinder_RangeFinderMode = YRangeFinder_RangeFinderMode.INVALID;
    public readonly TIMEFRAME_INVALID: number = YAPI.INVALID_LONG;
    public readonly QUALITY_INVALID: number = YAPI.INVALID_UINT;
    public readonly HARDWARECALIBRATION_INVALID: string = YAPI.INVALID_STRING;
    public readonly CURRENTTEMPERATURE_INVALID: number = YAPI.INVALID_DOUBLE;
    public readonly COMMAND_INVALID: string = YAPI.INVALID_STRING;

    // API symbols as static members
    public static readonly RANGEFINDERMODE_DEFAULT: YRangeFinder_RangeFinderMode = YRangeFinder_RangeFinderMode.DEFAULT;
    public static readonly RANGEFINDERMODE_LONG_RANGE: YRangeFinder_RangeFinderMode = YRangeFinder_RangeFinderMode.LONG_RANGE;
    public static readonly RANGEFINDERMODE_HIGH_ACCURACY: YRangeFinder_RangeFinderMode = YRangeFinder_RangeFinderMode.HIGH_ACCURACY;
    public static readonly RANGEFINDERMODE_HIGH_SPEED: YRangeFinder_RangeFinderMode = YRangeFinder_RangeFinderMode.HIGH_SPEED;
    public static readonly RANGEFINDERMODE_INVALID: YRangeFinder_RangeFinderMode = YRangeFinder_RangeFinderMode.INVALID;
    public static readonly TIMEFRAME_INVALID: number = YAPI.INVALID_LONG;
    public static readonly QUALITY_INVALID: number = YAPI.INVALID_UINT;
    public static readonly HARDWARECALIBRATION_INVALID: string = YAPI.INVALID_STRING;
    public static readonly CURRENTTEMPERATURE_INVALID: number = YAPI.INVALID_DOUBLE;
    public static readonly COMMAND_INVALID: string = YAPI.INVALID_STRING;
    //--- (end of YRangeFinder attributes declaration)

//--- (YRangeFinder return codes)
//--- (end of YRangeFinder return codes)

    constructor(yapi: YAPIContext, func: string)
    {
        //--- (YRangeFinder constructor)
        super(yapi, func);
        this._className                  = 'RangeFinder';
        //--- (end of YRangeFinder constructor)
    }

    //--- (YRangeFinder implementation)

    imm_parseAttr(name: string, val: any)
    {
        switch(name) {
        case 'rangeFinderMode':
            this._rangeFinderMode = <YRangeFinder_RangeFinderMode> <number> val;
            return 1;
        case 'timeFrame':
            this._timeFrame = <number> <number> val;
            return 1;
        case 'quality':
            this._quality = <number> <number> val;
            return 1;
        case 'hardwareCalibration':
            this._hardwareCalibration = <string> <string> val;
            return 1;
        case 'currentTemperature':
            this._currentTemperature = <number> Math.round(<number>val * 1000.0 / 65536.0) / 1000.0;
            return 1;
        case 'command':
            this._command = <string> <string> val;
            return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Changes the measuring unit for the measured range. That unit is a string.
     * String value can be " or mm. Any other value is ignored.
     * Remember to call the saveToFlash() method of the module if the modification must be kept.
     * WARNING: if a specific calibration is defined for the rangeFinder function, a
     * unit system change will probably break it.
     *
     * @param newval : a string corresponding to the measuring unit for the measured range
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_unit(newval: string): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('unit',rest_val);
    }

    /**
     * Returns the range finder running mode. The rangefinder running mode
     * allows you to put priority on precision, speed or maximum range.
     *
     * @return a value among YRangeFinder.RANGEFINDERMODE_DEFAULT,
     * YRangeFinder.RANGEFINDERMODE_LONG_RANGE, YRangeFinder.RANGEFINDERMODE_HIGH_ACCURACY and
     * YRangeFinder.RANGEFINDERMODE_HIGH_SPEED corresponding to the range finder running mode
     *
     * On failure, throws an exception or returns YRangeFinder.RANGEFINDERMODE_INVALID.
     */
    async get_rangeFinderMode(): Promise<YRangeFinder_RangeFinderMode>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YRangeFinder.RANGEFINDERMODE_INVALID;
            }
        }
        res = this._rangeFinderMode;
        return res;
    }

    /**
     * Changes the rangefinder running mode, allowing you to put priority on
     * precision, speed or maximum range.
     * Remember to call the saveToFlash() method of the module if the modification must be kept.
     *
     * @param newval : a value among YRangeFinder.RANGEFINDERMODE_DEFAULT,
     * YRangeFinder.RANGEFINDERMODE_LONG_RANGE, YRangeFinder.RANGEFINDERMODE_HIGH_ACCURACY and
     * YRangeFinder.RANGEFINDERMODE_HIGH_SPEED corresponding to the rangefinder running mode, allowing you
     * to put priority on
     *         precision, speed or maximum range
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_rangeFinderMode(newval: YRangeFinder_RangeFinderMode): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('rangeFinderMode',rest_val);
    }

    /**
     * Returns the time frame used to measure the distance and estimate the measure
     * reliability. The time frame is expressed in milliseconds.
     *
     * @return an integer corresponding to the time frame used to measure the distance and estimate the measure
     *         reliability
     *
     * On failure, throws an exception or returns YRangeFinder.TIMEFRAME_INVALID.
     */
    async get_timeFrame(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YRangeFinder.TIMEFRAME_INVALID;
            }
        }
        res = this._timeFrame;
        return res;
    }

    /**
     * Changes the time frame used to measure the distance and estimate the measure
     * reliability. The time frame is expressed in milliseconds. A larger timeframe
     * improves stability and reliability, at the cost of higher latency, but prevents
     * the detection of events shorter than the time frame.
     * Remember to call the saveToFlash() method of the module if the modification must be kept.
     *
     * @param newval : an integer corresponding to the time frame used to measure the distance and estimate the measure
     *         reliability
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_timeFrame(newval: number): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('timeFrame',rest_val);
    }

    /**
     * Returns a measure quality estimate, based on measured dispersion.
     *
     * @return an integer corresponding to a measure quality estimate, based on measured dispersion
     *
     * On failure, throws an exception or returns YRangeFinder.QUALITY_INVALID.
     */
    async get_quality(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YRangeFinder.QUALITY_INVALID;
            }
        }
        res = this._quality;
        return res;
    }

    async get_hardwareCalibration(): Promise<string>
    {
        let res: string;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YRangeFinder.HARDWARECALIBRATION_INVALID;
            }
        }
        res = this._hardwareCalibration;
        return res;
    }

    async set_hardwareCalibration(newval: string): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('hardwareCalibration',rest_val);
    }

    /**
     * Returns the current sensor temperature, as a floating point number.
     *
     * @return a floating point number corresponding to the current sensor temperature, as a floating point number
     *
     * On failure, throws an exception or returns YRangeFinder.CURRENTTEMPERATURE_INVALID.
     */
    async get_currentTemperature(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YRangeFinder.CURRENTTEMPERATURE_INVALID;
            }
        }
        res = this._currentTemperature;
        return res;
    }

    async get_command(): Promise<string>
    {
        let res: string;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YRangeFinder.COMMAND_INVALID;
            }
        }
        res = this._command;
        return res;
    }

    async set_command(newval: string): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('command',rest_val);
    }

    /**
     * Retrieves a range finder for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the range finder is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YRangeFinder.isOnline() to test if the range finder is
     * indeed online at a given time. In case of ambiguity when looking for
     * a range finder by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the range finder, for instance
     *         YRNGFND1.rangeFinder1.
     *
     * @return a YRangeFinder object allowing you to drive the range finder.
     */
    static FindRangeFinder(func: string): YRangeFinder
    {
        let obj: YRangeFinder;
        obj = <YRangeFinder> YFunction._FindFromCache('RangeFinder', func);
        if (obj == null) {
            obj = new YRangeFinder(YAPI, func);
            YFunction._AddToCache('RangeFinder',  func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a range finder for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the range finder is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YRangeFinder.isOnline() to test if the range finder is
     * indeed online at a given time. In case of ambiguity when looking for
     * a range finder by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx : a YAPI context
     * @param func : a string that uniquely characterizes the range finder, for instance
     *         YRNGFND1.rangeFinder1.
     *
     * @return a YRangeFinder object allowing you to drive the range finder.
     */
    static FindRangeFinderInContext(yctx: YAPIContext, func: string): YRangeFinder
    {
        let obj: YRangeFinder;
        obj = <YRangeFinder> YFunction._FindFromCacheInContext(yctx,  'RangeFinder', func);
        if (obj == null) {
            obj = new YRangeFinder(yctx, func);
            YFunction._AddToCache('RangeFinder',  func, obj);
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
    async registerValueCallback(callback: YRangeFinderValueCallback | null): Promise<number>
    {
        let val: string;
        if (callback != null) {
            await YFunction._UpdateValueCallbackList(this, true);
        } else {
            await YFunction._UpdateValueCallbackList(this, false);
        }
        this._valueCallbackRangeFinder = callback;
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
        if (this._valueCallbackRangeFinder != null) {
            try {
                await this._valueCallbackRangeFinder(this, value);
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
    async registerTimedReportCallback(callback: YRangeFinderTimedReportCallback | null): Promise<number>
    {
        let sensor: YSensor;
        sensor = this;
        if (callback != null) {
            await YFunction._UpdateTimedReportCallbackList(sensor, true);
        } else {
            await YFunction._UpdateTimedReportCallbackList(sensor, false);
        }
        this._timedReportCallbackRangeFinder = callback;
        return 0;
    }

    async _invokeTimedReportCallback(value: YMeasure): Promise<number>
    {
        if (this._timedReportCallbackRangeFinder != null) {
            try {
                await this._timedReportCallbackRangeFinder(this, value);
            } catch (e) {
                this._yapi.imm_log('Exception in timedReportCallback:', e);
            }
        } else {
            super._invokeTimedReportCallback(value);
        }
        return 0;
    }

    /**
     * Returns the temperature at the time when the latest calibration was performed.
     * This function can be used to determine if a new calibration for ambient temperature
     * is required.
     *
     * @return a temperature, as a floating point number.
     *         On failure, throws an exception or return YAPI.INVALID_DOUBLE.
     */
    async get_hardwareCalibrationTemperature(): Promise<number>
    {
        let hwcal: string;
        hwcal = await this.get_hardwareCalibration();
        if (!((hwcal).substr(0, 1) == '@')) {
            return this._yapi.INVALID_DOUBLE;
        }
        return this._yapi.imm_atoi((hwcal).substr(1, (hwcal).length));
    }

    /**
     * Triggers a sensor calibration according to the current ambient temperature. That
     * calibration process needs no physical interaction with the sensor. It is performed
     * automatically at device startup, but it is recommended to start it again when the
     * temperature delta since the latest calibration exceeds 8°C.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    async triggerTemperatureCalibration(): Promise<number>
    {
        return await this.set_command('T');
    }

    /**
     * Triggers the photon detector hardware calibration.
     * This function is part of the calibration procedure to compensate for the the effect
     * of a cover glass. Make sure to read the chapter about hardware calibration for details
     * on the calibration procedure for proper results.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    async triggerSpadCalibration(): Promise<number>
    {
        return await this.set_command('S');
    }

    /**
     * Triggers the hardware offset calibration of the distance sensor.
     * This function is part of the calibration procedure to compensate for the the effect
     * of a cover glass. Make sure to read the chapter about hardware calibration for details
     * on the calibration procedure for proper results.
     *
     * @param targetDist : true distance of the calibration target, in mm or inches, depending
     *         on the unit selected in the device
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    async triggerOffsetCalibration(targetDist: number): Promise<number>
    {
        let distmm: number;
        if (await this.get_unit() == '"') {
            distmm = <number> Math.round(targetDist * 25.4);
        } else {
            distmm = <number> Math.round(targetDist);
        }
        return await this.set_command('O'+String(Math.round(distmm)));
    }

    /**
     * Triggers the hardware cross-talk calibration of the distance sensor.
     * This function is part of the calibration procedure to compensate for the the effect
     * of a cover glass. Make sure to read the chapter about hardware calibration for details
     * on the calibration procedure for proper results.
     *
     * @param targetDist : true distance of the calibration target, in mm or inches, depending
     *         on the unit selected in the device
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    async triggerXTalkCalibration(targetDist: number): Promise<number>
    {
        let distmm: number;
        if (await this.get_unit() == '"') {
            distmm = <number> Math.round(targetDist * 25.4);
        } else {
            distmm = <number> Math.round(targetDist);
        }
        return await this.set_command('X'+String(Math.round(distmm)));
    }

    /**
     * Cancels the effect of previous hardware calibration procedures to compensate
     * for cover glass, and restores factory settings.
     * Remember to call the saveToFlash() method of the module if the modification must be kept.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    async cancelCoverGlassCalibrations(): Promise<number>
    {
        return await this.set_hardwareCalibration('');
    }

    /**
     * Continues the enumeration of range finders started using yFirstRangeFinder().
     * Caution: You can't make any assumption about the returned range finders order.
     * If you want to find a specific a range finder, use RangeFinder.findRangeFinder()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YRangeFinder object, corresponding to
     *         a range finder currently online, or a null pointer
     *         if there are no more range finders to enumerate.
     */
    nextRangeFinder(): YRangeFinder | null
    {
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI.SUCCESS) return null;
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, <string> resolve.result);
        if(next_hwid == null) return null;
        return YRangeFinder.FindRangeFinderInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of range finders currently accessible.
     * Use the method YRangeFinder.nextRangeFinder() to iterate on
     * next range finders.
     *
     * @return a pointer to a YRangeFinder object, corresponding to
     *         the first range finder currently online, or a null pointer
     *         if there are none.
     */
    static FirstRangeFinder(): YRangeFinder | null
    {
        let next_hwid = YAPI.imm_getFirstHardwareId('RangeFinder');
        if(next_hwid == null) return null;
        return YRangeFinder.FindRangeFinder(next_hwid);
    }

    /**
     * Starts the enumeration of range finders currently accessible.
     * Use the method YRangeFinder.nextRangeFinder() to iterate on
     * next range finders.
     *
     * @param yctx : a YAPI context.
     *
     * @return a pointer to a YRangeFinder object, corresponding to
     *         the first range finder currently online, or a null pointer
     *         if there are none.
     */
    static FirstRangeFinderInContext(yctx: YAPIContext): YRangeFinder | null
    {
        let next_hwid = yctx.imm_getFirstHardwareId('RangeFinder');
        if(next_hwid == null) return null;
        return YRangeFinder.FindRangeFinderInContext(yctx, next_hwid);
    }

    //--- (end of YRangeFinder implementation)
}

