/*********************************************************************
 *
 *  $Id: yocto_carbondioxide.ts 44175 2021-03-11 11:27:12Z mvuilleu $
 *
 *  Implements the high-level API for CarbonDioxide functions
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

//--- (YCarbonDioxide class start)
/**
 * YCarbonDioxide Class: CO2 sensor control interface, available for instance in the Yocto-CO2-V2
 *
 * The YCarbonDioxide class allows you to read and configure Yoctopuce CO2 sensors.
 * It inherits from YSensor class the core functions to read measurements,
 * to register callback functions, and to access the autonomous datalogger.
 * This class adds the ability to perform manual calibration if required.
 */
//--- (end of YCarbonDioxide class start)

export class YCarbonDioxide extends YSensor
{
    //--- (YCarbonDioxide attributes declaration)
    _className: string;
    _abcPeriod: number = YCarbonDioxide.ABCPERIOD_INVALID;
    _command: string = YCarbonDioxide.COMMAND_INVALID;
    _valueCallbackCarbonDioxide: YCarbonDioxide.ValueCallback | null = null;
    _timedReportCallbackCarbonDioxide: YCarbonDioxide.TimedReportCallback | null = null;

    // API symbols as object properties
    public readonly ABCPERIOD_INVALID: number = YAPI.INVALID_UINT;
    public readonly COMMAND_INVALID: string = YAPI.INVALID_STRING;

    // API symbols as static members
    public static readonly ABCPERIOD_INVALID: number = YAPI.INVALID_UINT;
    public static readonly COMMAND_INVALID: string = YAPI.INVALID_STRING;
    //--- (end of YCarbonDioxide attributes declaration)

    constructor(yapi: YAPIContext, func: string)
    {
        //--- (YCarbonDioxide constructor)
        super(yapi, func);
        this._className                  = 'CarbonDioxide';
        //--- (end of YCarbonDioxide constructor)
    }

    //--- (YCarbonDioxide implementation)

    imm_parseAttr(name: string, val: any)
    {
        switch(name) {
        case 'abcPeriod':
            this._abcPeriod = <number> <number> val;
            return 1;
        case 'command':
            this._command = <string> <string> val;
            return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Returns the Automatic Baseline Calibration period, in hours. A negative value
     * means that automatic baseline calibration is disabled.
     *
     * @return an integer corresponding to the Automatic Baseline Calibration period, in hours
     *
     * On failure, throws an exception or returns YCarbonDioxide.ABCPERIOD_INVALID.
     */
    async get_abcPeriod(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YCarbonDioxide.ABCPERIOD_INVALID;
            }
        }
        res = this._abcPeriod;
        return res;
    }

    /**
     * Changes Automatic Baseline Calibration period, in hours. If you need
     * to disable automatic baseline calibration (for instance when using the
     * sensor in an environment that is constantly above 400 ppm CO2), set the
     * period to -1. For the Yocto-CO2-V2, the only possible values are 24 and -1.
     * Remember to call the saveToFlash() method of the
     * module if the modification must be kept.
     *
     * @param newval : an integer corresponding to Automatic Baseline Calibration period, in hours
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_abcPeriod(newval: number): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('abcPeriod',rest_val);
    }

    async get_command(): Promise<string>
    {
        let res: string;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YCarbonDioxide.COMMAND_INVALID;
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
     * Retrieves a CO2 sensor for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the CO2 sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YCarbonDioxide.isOnline() to test if the CO2 sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a CO2 sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the CO2 sensor, for instance
     *         YCO2MK02.carbonDioxide.
     *
     * @return a YCarbonDioxide object allowing you to drive the CO2 sensor.
     */
    static FindCarbonDioxide(func: string): YCarbonDioxide
    {
        let obj: YCarbonDioxide;
        obj = <YCarbonDioxide> YFunction._FindFromCache('CarbonDioxide', func);
        if (obj == null) {
            obj = new YCarbonDioxide(YAPI, func);
            YFunction._AddToCache('CarbonDioxide',  func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a CO2 sensor for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the CO2 sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YCarbonDioxide.isOnline() to test if the CO2 sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a CO2 sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx : a YAPI context
     * @param func : a string that uniquely characterizes the CO2 sensor, for instance
     *         YCO2MK02.carbonDioxide.
     *
     * @return a YCarbonDioxide object allowing you to drive the CO2 sensor.
     */
    static FindCarbonDioxideInContext(yctx: YAPIContext, func: string): YCarbonDioxide
    {
        let obj: YCarbonDioxide;
        obj = <YCarbonDioxide> YFunction._FindFromCacheInContext(yctx,  'CarbonDioxide', func);
        if (obj == null) {
            obj = new YCarbonDioxide(yctx, func);
            YFunction._AddToCache('CarbonDioxide',  func, obj);
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
    async registerValueCallback(callback: YCarbonDioxide.ValueCallback | null): Promise<number>
    {
        let val: string;
        if (callback != null) {
            await YFunction._UpdateValueCallbackList(this, true);
        } else {
            await YFunction._UpdateValueCallbackList(this, false);
        }
        this._valueCallbackCarbonDioxide = callback;
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
        if (this._valueCallbackCarbonDioxide != null) {
            try {
                await this._valueCallbackCarbonDioxide(this, value);
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
    async registerTimedReportCallback(callback: YCarbonDioxide.TimedReportCallback | null): Promise<number>
    {
        let sensor: YSensor;
        sensor = this;
        if (callback != null) {
            await YFunction._UpdateTimedReportCallbackList(sensor, true);
        } else {
            await YFunction._UpdateTimedReportCallbackList(sensor, false);
        }
        this._timedReportCallbackCarbonDioxide = callback;
        return 0;
    }

    async _invokeTimedReportCallback(value: YMeasure): Promise<number>
    {
        if (this._timedReportCallbackCarbonDioxide != null) {
            try {
                await this._timedReportCallbackCarbonDioxide(this, value);
            } catch (e) {
                this._yapi.imm_log('Exception in timedReportCallback:', e);
            }
        } else {
            super._invokeTimedReportCallback(value);
        }
        return 0;
    }

    /**
     * Triggers a forced calibration of the sensor at a given CO2 level, specified
     * between 400ppm and 2000ppm. Before invoking this command, the sensor must
     * have been maintained within the specified CO2 density during at least two
     * minutes.
     *
     * @param refVal : reference CO2 density for the calibration
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async triggerForcedCalibration(refVal: number): Promise<number>
    {
        return await this.set_command('F'+String(Math.round(<number> Math.round(1000*refVal)))+'C');
    }

    /**
     * Triggers a baseline calibration at standard CO2 ambiant level (400ppm).
     * It is normally not necessary to manually calibrate the sensor, because
     * the built-in automatic baseline calibration procedure will automatically
     * fix any long-term drift based on the lowest level of CO2 observed over the
     * automatic calibration period. However, if automatic baseline calibration
     * is disabled, you may want to manually trigger a calibration from time to
     * time. Before starting a baseline calibration, make sure to put the sensor
     * in a standard environment (e.g. outside in fresh air) at around 400 ppm
     * for at least two minutes.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async triggerBaselineCalibration(): Promise<number>
    {
        return await this.set_command('BC');
    }

    async triggetBaselineCalibration(): Promise<number>
    {
        return await this.triggerBaselineCalibration();
    }

    /**
     * Triggers a zero calibration of the sensor on carbon dioxide-free air -
     * for use with first generation Yocto-CO2 only.
     * It is normally not necessary to manually calibrate the sensor, because
     * the built-in automatic baseline calibration procedure will automatically
     * fix any long-term drift based on the lowest level of CO2 observed over the
     * automatic calibration period. However, if you disable automatic baseline
     * calibration, you may want to manually trigger a calibration from time to
     * time. Before starting a zero calibration, you should circulate carbon
     * dioxide-free air within the sensor for a minute or two, using a small pipe
     * connected to the sensor. Please contact support@yoctopuce.com for more details
     * on the zero calibration procedure.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async triggerZeroCalibration(): Promise<number>
    {
        return await this.set_command('ZC');
    }

    async triggetZeroCalibration(): Promise<number>
    {
        return await this.triggerZeroCalibration();
    }

    /**
     * Continues the enumeration of CO2 sensors started using yFirstCarbonDioxide().
     * Caution: You can't make any assumption about the returned CO2 sensors order.
     * If you want to find a specific a CO2 sensor, use CarbonDioxide.findCarbonDioxide()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YCarbonDioxide object, corresponding to
     *         a CO2 sensor currently online, or a null pointer
     *         if there are no more CO2 sensors to enumerate.
     */
    nextCarbonDioxide(): YCarbonDioxide | null
    {
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI.SUCCESS) return null;
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, <string> resolve.result);
        if(next_hwid == null) return null;
        return YCarbonDioxide.FindCarbonDioxideInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of CO2 sensors currently accessible.
     * Use the method YCarbonDioxide.nextCarbonDioxide() to iterate on
     * next CO2 sensors.
     *
     * @return a pointer to a YCarbonDioxide object, corresponding to
     *         the first CO2 sensor currently online, or a null pointer
     *         if there are none.
     */
    static FirstCarbonDioxide(): YCarbonDioxide | null
    {
        let next_hwid = YAPI.imm_getFirstHardwareId('CarbonDioxide');
        if(next_hwid == null) return null;
        return YCarbonDioxide.FindCarbonDioxide(next_hwid);
    }

    /**
     * Starts the enumeration of CO2 sensors currently accessible.
     * Use the method YCarbonDioxide.nextCarbonDioxide() to iterate on
     * next CO2 sensors.
     *
     * @param yctx : a YAPI context.
     *
     * @return a pointer to a YCarbonDioxide object, corresponding to
     *         the first CO2 sensor currently online, or a null pointer
     *         if there are none.
     */
    static FirstCarbonDioxideInContext(yctx: YAPIContext): YCarbonDioxide | null
    {
        let next_hwid = yctx.imm_getFirstHardwareId('CarbonDioxide');
        if(next_hwid == null) return null;
        return YCarbonDioxide.FindCarbonDioxideInContext(yctx, next_hwid);
    }

    //--- (end of YCarbonDioxide implementation)
}

export namespace YCarbonDioxide {
    //--- (YCarbonDioxide definitions)
    export interface ValueCallback { (func: YCarbonDioxide, value: string): void }    export interface TimedReportCallback { (func: YCarbonDioxide, measure: YMeasure): void }
    //--- (end of YCarbonDioxide definitions)
}

