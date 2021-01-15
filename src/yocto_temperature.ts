/*********************************************************************
 *
 *  $Id: svn_id $
 *
 *  Implements the high-level API for Temperature functions
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

//--- (YTemperature definitions)
export const enum Y_SensorType {
    DIGITAL = 0,
    TYPE_K = 1,
    TYPE_E = 2,
    TYPE_J = 3,
    TYPE_N = 4,
    TYPE_R = 5,
    TYPE_S = 6,
    TYPE_T = 7,
    PT100_4WIRES = 8,
    PT100_3WIRES = 9,
    PT100_2WIRES = 10,
    RES_OHM = 11,
    RES_NTC = 12,
    RES_LINEAR = 13,
    RES_INTERNAL = 14,
    IR = 15,
    RES_PT1000 = 16,
    CHANNEL_OFF = 17,
    INVALID = -1
}
export interface YTemperatureValueCallback { (func: YTemperature, value: string): void }
export interface YTemperatureTimedReportCallback { (func: YTemperature, measure: YMeasure): void }
//--- (end of YTemperature definitions)

//--- (YTemperature class start)
/**
 * YTemperature Class: temperature sensor control interface, available for instance in the
 * Yocto-Meteo-V2, the Yocto-PT100, the Yocto-Temperature or the Yocto-Thermocouple
 *
 * The YTemperature class allows you to read and configure Yoctopuce temperature sensors.
 * It inherits from YSensor class the core functions to read measurements,
 * to register callback functions, and to access the autonomous datalogger.
 * This class adds the ability to configure some specific parameters
 * for some sensors (connection type, temperature mapping table).
 */
//--- (end of YTemperature class start)

export class YTemperature extends YSensor
{
    //--- (YTemperature attributes declaration)
    _className: string;
    _sensorType: Y_SensorType = YTemperature.SENSORTYPE_INVALID;
    _signalValue: number = YTemperature.SIGNALVALUE_INVALID;
    _signalUnit: string = YTemperature.SIGNALUNIT_INVALID;
    _command: string = YTemperature.COMMAND_INVALID;
    _valueCallbackTemperature: YTemperatureValueCallback | null = null;
    _timedReportCallbackTemperature: YTemperatureTimedReportCallback | null = null;

    // API symbols as object properties
    public readonly SENSORTYPE_DIGITAL: Y_SensorType = Y_SensorType.DIGITAL;
    public readonly SENSORTYPE_TYPE_K: Y_SensorType = Y_SensorType.TYPE_K;
    public readonly SENSORTYPE_TYPE_E: Y_SensorType = Y_SensorType.TYPE_E;
    public readonly SENSORTYPE_TYPE_J: Y_SensorType = Y_SensorType.TYPE_J;
    public readonly SENSORTYPE_TYPE_N: Y_SensorType = Y_SensorType.TYPE_N;
    public readonly SENSORTYPE_TYPE_R: Y_SensorType = Y_SensorType.TYPE_R;
    public readonly SENSORTYPE_TYPE_S: Y_SensorType = Y_SensorType.TYPE_S;
    public readonly SENSORTYPE_TYPE_T: Y_SensorType = Y_SensorType.TYPE_T;
    public readonly SENSORTYPE_PT100_4WIRES: Y_SensorType = Y_SensorType.PT100_4WIRES;
    public readonly SENSORTYPE_PT100_3WIRES: Y_SensorType = Y_SensorType.PT100_3WIRES;
    public readonly SENSORTYPE_PT100_2WIRES: Y_SensorType = Y_SensorType.PT100_2WIRES;
    public readonly SENSORTYPE_RES_OHM: Y_SensorType = Y_SensorType.RES_OHM;
    public readonly SENSORTYPE_RES_NTC: Y_SensorType = Y_SensorType.RES_NTC;
    public readonly SENSORTYPE_RES_LINEAR: Y_SensorType = Y_SensorType.RES_LINEAR;
    public readonly SENSORTYPE_RES_INTERNAL: Y_SensorType = Y_SensorType.RES_INTERNAL;
    public readonly SENSORTYPE_IR: Y_SensorType = Y_SensorType.IR;
    public readonly SENSORTYPE_RES_PT1000: Y_SensorType = Y_SensorType.RES_PT1000;
    public readonly SENSORTYPE_CHANNEL_OFF: Y_SensorType = Y_SensorType.CHANNEL_OFF;
    public readonly SENSORTYPE_INVALID: Y_SensorType = Y_SensorType.INVALID;
    public readonly SIGNALVALUE_INVALID: number = YAPI.INVALID_DOUBLE;
    public readonly SIGNALUNIT_INVALID: string = YAPI.INVALID_STRING;
    public readonly COMMAND_INVALID: string = YAPI.INVALID_STRING;

    // API symbols as static members
    public static readonly SENSORTYPE_DIGITAL: Y_SensorType = Y_SensorType.DIGITAL;
    public static readonly SENSORTYPE_TYPE_K: Y_SensorType = Y_SensorType.TYPE_K;
    public static readonly SENSORTYPE_TYPE_E: Y_SensorType = Y_SensorType.TYPE_E;
    public static readonly SENSORTYPE_TYPE_J: Y_SensorType = Y_SensorType.TYPE_J;
    public static readonly SENSORTYPE_TYPE_N: Y_SensorType = Y_SensorType.TYPE_N;
    public static readonly SENSORTYPE_TYPE_R: Y_SensorType = Y_SensorType.TYPE_R;
    public static readonly SENSORTYPE_TYPE_S: Y_SensorType = Y_SensorType.TYPE_S;
    public static readonly SENSORTYPE_TYPE_T: Y_SensorType = Y_SensorType.TYPE_T;
    public static readonly SENSORTYPE_PT100_4WIRES: Y_SensorType = Y_SensorType.PT100_4WIRES;
    public static readonly SENSORTYPE_PT100_3WIRES: Y_SensorType = Y_SensorType.PT100_3WIRES;
    public static readonly SENSORTYPE_PT100_2WIRES: Y_SensorType = Y_SensorType.PT100_2WIRES;
    public static readonly SENSORTYPE_RES_OHM: Y_SensorType = Y_SensorType.RES_OHM;
    public static readonly SENSORTYPE_RES_NTC: Y_SensorType = Y_SensorType.RES_NTC;
    public static readonly SENSORTYPE_RES_LINEAR: Y_SensorType = Y_SensorType.RES_LINEAR;
    public static readonly SENSORTYPE_RES_INTERNAL: Y_SensorType = Y_SensorType.RES_INTERNAL;
    public static readonly SENSORTYPE_IR: Y_SensorType = Y_SensorType.IR;
    public static readonly SENSORTYPE_RES_PT1000: Y_SensorType = Y_SensorType.RES_PT1000;
    public static readonly SENSORTYPE_CHANNEL_OFF: Y_SensorType = Y_SensorType.CHANNEL_OFF;
    public static readonly SENSORTYPE_INVALID: Y_SensorType = Y_SensorType.INVALID;
    public static readonly SIGNALVALUE_INVALID: number = YAPI.INVALID_DOUBLE;
    public static readonly SIGNALUNIT_INVALID: string = YAPI.INVALID_STRING;
    public static readonly COMMAND_INVALID: string = YAPI.INVALID_STRING;
    //--- (end of YTemperature attributes declaration)

//--- (YTemperature return codes)
//--- (end of YTemperature return codes)

    constructor(yapi: YAPIContext, func: string)
    {
        //--- (YTemperature constructor)
        super(yapi, func);
        this._className                  = 'Temperature';
        //--- (end of YTemperature constructor)
    }

    //--- (YTemperature implementation)

    imm_parseAttr(name: string, val: any)
    {
        switch(name) {
        case 'sensorType':
            this._sensorType = <Y_SensorType> <number> val;
            return 1;
        case 'signalValue':
            this._signalValue = <number> Math.round(<number>val * 1000.0 / 65536.0) / 1000.0;
            return 1;
        case 'signalUnit':
            this._signalUnit = <string> <string> val;
            return 1;
        case 'command':
            this._command = <string> <string> val;
            return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Changes the measuring unit for the measured temperature. That unit is a string.
     * If that strings end with the letter F all temperatures values will returned in
     * Fahrenheit degrees. If that String ends with the letter K all values will be
     * returned in Kelvin degrees. If that string ends with the letter C all values will be
     * returned in Celsius degrees.  If the string ends with any other character the
     * change will be ignored. Remember to call the
     * saveToFlash() method of the module if the modification must be kept.
     * WARNING: if a specific calibration is defined for the temperature function, a
     * unit system change will probably break it.
     *
     * @param newval : a string corresponding to the measuring unit for the measured temperature
     *
     * @return YAPI_SUCCESS if the call succeeds.
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
     * Returns the temperature sensor type.
     *
     * @return a value among Y_SENSORTYPE_DIGITAL, Y_SENSORTYPE_TYPE_K, Y_SENSORTYPE_TYPE_E,
     * Y_SENSORTYPE_TYPE_J, Y_SENSORTYPE_TYPE_N, Y_SENSORTYPE_TYPE_R, Y_SENSORTYPE_TYPE_S,
     * Y_SENSORTYPE_TYPE_T, Y_SENSORTYPE_PT100_4WIRES, Y_SENSORTYPE_PT100_3WIRES,
     * Y_SENSORTYPE_PT100_2WIRES, Y_SENSORTYPE_RES_OHM, Y_SENSORTYPE_RES_NTC, Y_SENSORTYPE_RES_LINEAR,
     * Y_SENSORTYPE_RES_INTERNAL, Y_SENSORTYPE_IR, Y_SENSORTYPE_RES_PT1000 and Y_SENSORTYPE_CHANNEL_OFF
     * corresponding to the temperature sensor type
     *
     * On failure, throws an exception or returns Y_SENSORTYPE_INVALID.
     */
    async get_sensorType(): Promise<Y_SensorType>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YTemperature.SENSORTYPE_INVALID;
            }
        }
        res = this._sensorType;
        return res;
    }

    /**
     * Changes the temperature sensor type.  This function is used
     * to define the type of thermocouple (K,E...) used with the device.
     * It has no effect if module is using a digital sensor or a thermistor.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : a value among Y_SENSORTYPE_DIGITAL, Y_SENSORTYPE_TYPE_K, Y_SENSORTYPE_TYPE_E,
     * Y_SENSORTYPE_TYPE_J, Y_SENSORTYPE_TYPE_N, Y_SENSORTYPE_TYPE_R, Y_SENSORTYPE_TYPE_S,
     * Y_SENSORTYPE_TYPE_T, Y_SENSORTYPE_PT100_4WIRES, Y_SENSORTYPE_PT100_3WIRES,
     * Y_SENSORTYPE_PT100_2WIRES, Y_SENSORTYPE_RES_OHM, Y_SENSORTYPE_RES_NTC, Y_SENSORTYPE_RES_LINEAR,
     * Y_SENSORTYPE_RES_INTERNAL, Y_SENSORTYPE_IR, Y_SENSORTYPE_RES_PT1000 and Y_SENSORTYPE_CHANNEL_OFF
     * corresponding to the temperature sensor type
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_sensorType(newval: Y_SensorType): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('sensorType',rest_val);
    }

    /**
     * Returns the current value of the electrical signal measured by the sensor.
     *
     * @return a floating point number corresponding to the current value of the electrical signal
     * measured by the sensor
     *
     * On failure, throws an exception or returns Y_SIGNALVALUE_INVALID.
     */
    async get_signalValue(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YTemperature.SIGNALVALUE_INVALID;
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
     * On failure, throws an exception or returns Y_SIGNALUNIT_INVALID.
     */
    async get_signalUnit(): Promise<string>
    {
        let res: string;
        if (this._cacheExpiration == 0) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YTemperature.SIGNALUNIT_INVALID;
            }
        }
        res = this._signalUnit;
        return res;
    }

    async get_command(): Promise<string>
    {
        let res: string;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YTemperature.COMMAND_INVALID;
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
     * Use the method YTemperature.isOnline() to test if $THEFUNCTION$ is
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
     * @return a YTemperature object allowing you to drive $THEFUNCTION$.
     */
    static FindTemperature(func: string): YTemperature
    {
        let obj: YTemperature;
        obj = <YTemperature> YFunction._FindFromCache('Temperature', func);
        if (obj == null) {
            obj = new YTemperature(YAPI, func);
            YFunction._AddToCache('Temperature',  func, obj);
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
     * Use the method YTemperature.isOnline() to test if $THEFUNCTION$ is
     * indeed online at a given time. In case of ambiguity when looking for
     * $AFUNCTION$ by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx : a YAPI context
     * @param func : a string that uniquely characterizes $THEFUNCTION$, for instance
     *         $FULLHARDWAREID$.
     *
     * @return a YTemperature object allowing you to drive $THEFUNCTION$.
     */
    static FindTemperatureInContext(yctx: YAPIContext, func: string): YTemperature
    {
        let obj: YTemperature;
        obj = <YTemperature> YFunction._FindFromCacheInContext(yctx,  'Temperature', func);
        if (obj == null) {
            obj = new YTemperature(yctx, func);
            YFunction._AddToCache('Temperature',  func, obj);
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
    async registerValueCallback(callback: YTemperatureValueCallback | null): Promise<number>
    {
        let val: string;
        if (callback != null) {
            await YFunction._UpdateValueCallbackList(this, true);
        } else {
            await YFunction._UpdateValueCallbackList(this, false);
        }
        this._valueCallbackTemperature = callback;
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
        if (this._valueCallbackTemperature != null) {
            try {
                await this._valueCallbackTemperature(this, value);
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
    async registerTimedReportCallback(callback: YTemperatureTimedReportCallback | null): Promise<number>
    {
        let sensor: YSensor;
        sensor = this;
        if (callback != null) {
            await YFunction._UpdateTimedReportCallbackList(sensor, true);
        } else {
            await YFunction._UpdateTimedReportCallbackList(sensor, false);
        }
        this._timedReportCallbackTemperature = callback;
        return 0;
    }

    async _invokeTimedReportCallback(value: YMeasure): Promise<number>
    {
        if (this._timedReportCallbackTemperature != null) {
            try {
                await this._timedReportCallbackTemperature(this, value);
            } catch (e) {
                this._yapi.imm_log('Exception in timedReportCallback:', e);
            }
        } else {
            super._invokeTimedReportCallback(value);
        }
        return 0;
    }

    /**
     * Configures NTC thermistor parameters in order to properly compute the temperature from
     * the measured resistance. For increased precision, you can enter a complete mapping
     * table using set_thermistorResponseTable. This function can only be used with a
     * temperature sensor based on thermistors.
     *
     * @param res25 : thermistor resistance at 25 degrees Celsius
     * @param beta : Beta value
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_ntcParameters(res25: number, beta: number): Promise<number>
    {
        let t0: number;
        let t1: number;
        let res100: number;
        let tempValues: number[] = [];
        let resValues: number[] = [];
        t0 = 25.0+273.15;
        t1 = 100.0+273.15;
        res100 = res25 * Math.exp(beta*(1.0/t1 - 1.0/t0));
        tempValues.length = 0;
        resValues.length = 0;
        tempValues.push(25.0);
        resValues.push(res25);
        tempValues.push(100.0);
        resValues.push(res100);
        return await this.set_thermistorResponseTable(tempValues, resValues);
    }

    /**
     * Records a thermistor response table, in order to interpolate the temperature from
     * the measured resistance. This function can only be used with a temperature
     * sensor based on thermistors.
     *
     * @param tempValues : array of floating point numbers, corresponding to all
     *         temperatures (in degrees Celsius) for which the resistance of the
     *         thermistor is specified.
     * @param resValues : array of floating point numbers, corresponding to the resistance
     *         values (in Ohms) for each of the temperature included in the first
     *         argument, index by index.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_thermistorResponseTable(tempValues: number[], resValues: number[]): Promise<number>
    {
        let siz: number;
        let res: number;
        let idx: number;
        let found: number;
        let prev: number;
        let curr: number;
        let currTemp: number;
        let idxres: number;
        siz = tempValues.length;
        if (!(siz >= 2)) {
            return this._throw(this._yapi.INVALID_ARGUMENT,'thermistor response table must have at least two points',this._yapi.INVALID_ARGUMENT);
        }
        if (!(siz == resValues.length)) {
            return this._throw(this._yapi.INVALID_ARGUMENT,'table sizes mismatch',this._yapi.INVALID_ARGUMENT);
        }

        res = await this.set_command('Z');
        if (!(res==this._yapi.SUCCESS)) {
            return this._throw(this._yapi.IO_ERROR,'unable to reset thermistor parameters',this._yapi.IO_ERROR);
        }
        // add records in growing resistance value
        found = 1;
        prev = 0.0;
        while (found > 0) {
            found = 0;
            curr = 99999999.0;
            currTemp = -999999.0;
            idx = 0;
            while (idx < siz) {
                idxres = resValues[idx];
                if ((idxres > prev) && (idxres < curr)) {
                    curr = idxres;
                    currTemp = tempValues[idx];
                    found = 1;
                }
                idx = idx + 1;
            }
            if (found > 0) {
                res = await this.set_command('m'+String(Math.round(<number> Math.round(1000*curr)))+':'+String(Math.round(<number> Math.round(1000*currTemp))));
                if (!(res==this._yapi.SUCCESS)) {
                    return this._throw(this._yapi.IO_ERROR,'unable to reset thermistor parameters',this._yapi.IO_ERROR);
                }
                prev = curr;
            }
        }
        return this._yapi.SUCCESS;
    }

    /**
     * Retrieves the thermistor response table previously configured using the
     * set_thermistorResponseTable function. This function can only be used with a
     * temperature sensor based on thermistors.
     *
     * @param tempValues : array of floating point numbers, that is filled by the function
     *         with all temperatures (in degrees Celsius) for which the resistance
     *         of the thermistor is specified.
     * @param resValues : array of floating point numbers, that is filled by the function
     *         with the value (in Ohms) for each of the temperature included in the
     *         first argument, index by index.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async loadThermistorResponseTable(tempValues: number[], resValues: number[]): Promise<number>
    {
        let id: string;
        let bin_json: Uint8Array;
        let paramlist: string[] = [];
        let templist: number[] = [];
        let siz: number;
        let idx: number;
        let temp: number;
        let found: number;
        let prev: number;
        let curr: number;
        let currRes: number;
        tempValues.length = 0;
        resValues.length = 0;

        id = await this.get_functionId();
        id = (id).substr( 11, (id).length - 11);
        if (id == '') {
            id = '1';
        }
        bin_json = await this._download('extra.json?page='+id);
        paramlist = this.imm_json_get_array(bin_json);
        // first convert all temperatures to float
        siz = ((paramlist.length) >> (1));
        templist.length = 0;
        idx = 0;
        while (idx < siz) {
            temp = parseFloat(paramlist[2*idx+1])/1000.0;
            templist.push(temp);
            idx = idx + 1;
        }
        // then add records in growing temperature value
        tempValues.length = 0;
        resValues.length = 0;
        found = 1;
        prev = -999999.0;
        while (found > 0) {
            found = 0;
            curr = 999999.0;
            currRes = -999999.0;
            idx = 0;
            while (idx < siz) {
                temp = templist[idx];
                if ((temp > prev) && (temp < curr)) {
                    curr = temp;
                    currRes = parseFloat(paramlist[2*idx])/1000.0;
                    found = 1;
                }
                idx = idx + 1;
            }
            if (found > 0) {
                tempValues.push(curr);
                resValues.push(currRes);
                prev = curr;
            }
        }
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the next Temperature
     *
     * @returns {YTemperature}
     */
    nextTemperature(): YTemperature | null
    {
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI.SUCCESS) return null;
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, <string> resolve.result);
        if(next_hwid == null) return null;
        return YTemperature.FindTemperatureInContext(this._yapi, next_hwid);
    }

    /**
     * Retrieves the first Temperature in a YAPI context
     *
     * @returns {YTemperature}
     */
    static FirstTemperature(): YTemperature | null
    {
        let next_hwid = YAPI.imm_getFirstHardwareId('Temperature');
        if(next_hwid == null) return null;
        return YTemperature.FindTemperature(next_hwid);
    }

    /**
     * Retrieves the first Temperature in a given context
     *
     * @param yctx {YAPIContext}
     *
     * @returns {YTemperature}
     */
    static FirstTemperatureInContext(yctx: YAPIContext): YTemperature | null
    {
        let next_hwid = yctx.imm_getFirstHardwareId('Temperature');
        if(next_hwid == null) return null;
        return YTemperature.FindTemperatureInContext(yctx, next_hwid);
    }

    //--- (end of YTemperature implementation)
}

