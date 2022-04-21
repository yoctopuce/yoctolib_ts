/*********************************************************************
 *
 *  $Id: yocto_temperature.ts 48520 2022-02-03 10:51:20Z seb $
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
import { YAPI, YFunction, YSensor } from './yocto_api.js';
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
export class YTemperature extends YSensor {
    //--- (end of YTemperature attributes declaration)
    constructor(yapi, func) {
        //--- (YTemperature constructor)
        super(yapi, func);
        this._sensorType = YTemperature.SENSORTYPE_INVALID;
        this._signalValue = YTemperature.SIGNALVALUE_INVALID;
        this._signalUnit = YTemperature.SIGNALUNIT_INVALID;
        this._command = YTemperature.COMMAND_INVALID;
        this._valueCallbackTemperature = null;
        this._timedReportCallbackTemperature = null;
        // API symbols as object properties
        this.SENSORTYPE_DIGITAL = 0;
        this.SENSORTYPE_TYPE_K = 1;
        this.SENSORTYPE_TYPE_E = 2;
        this.SENSORTYPE_TYPE_J = 3;
        this.SENSORTYPE_TYPE_N = 4;
        this.SENSORTYPE_TYPE_R = 5;
        this.SENSORTYPE_TYPE_S = 6;
        this.SENSORTYPE_TYPE_T = 7;
        this.SENSORTYPE_PT100_4WIRES = 8;
        this.SENSORTYPE_PT100_3WIRES = 9;
        this.SENSORTYPE_PT100_2WIRES = 10;
        this.SENSORTYPE_RES_OHM = 11;
        this.SENSORTYPE_RES_NTC = 12;
        this.SENSORTYPE_RES_LINEAR = 13;
        this.SENSORTYPE_RES_INTERNAL = 14;
        this.SENSORTYPE_IR = 15;
        this.SENSORTYPE_RES_PT1000 = 16;
        this.SENSORTYPE_CHANNEL_OFF = 17;
        this.SENSORTYPE_INVALID = -1;
        this.SIGNALVALUE_INVALID = YAPI.INVALID_DOUBLE;
        this.SIGNALUNIT_INVALID = YAPI.INVALID_STRING;
        this.COMMAND_INVALID = YAPI.INVALID_STRING;
        this._className = 'Temperature';
        //--- (end of YTemperature constructor)
    }
    //--- (YTemperature implementation)
    imm_parseAttr(name, val) {
        switch (name) {
            case 'sensorType':
                this._sensorType = val;
                return 1;
            case 'signalValue':
                this._signalValue = Math.round(val * 1000.0 / 65536.0) / 1000.0;
                return 1;
            case 'signalUnit':
                this._signalUnit = val;
                return 1;
            case 'command':
                this._command = val;
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
     * Returns the temperature sensor type.
     *
     * @return a value among YTemperature.SENSORTYPE_DIGITAL, YTemperature.SENSORTYPE_TYPE_K,
     * YTemperature.SENSORTYPE_TYPE_E, YTemperature.SENSORTYPE_TYPE_J, YTemperature.SENSORTYPE_TYPE_N,
     * YTemperature.SENSORTYPE_TYPE_R, YTemperature.SENSORTYPE_TYPE_S, YTemperature.SENSORTYPE_TYPE_T,
     * YTemperature.SENSORTYPE_PT100_4WIRES, YTemperature.SENSORTYPE_PT100_3WIRES,
     * YTemperature.SENSORTYPE_PT100_2WIRES, YTemperature.SENSORTYPE_RES_OHM,
     * YTemperature.SENSORTYPE_RES_NTC, YTemperature.SENSORTYPE_RES_LINEAR,
     * YTemperature.SENSORTYPE_RES_INTERNAL, YTemperature.SENSORTYPE_IR,
     * YTemperature.SENSORTYPE_RES_PT1000 and YTemperature.SENSORTYPE_CHANNEL_OFF corresponding to the
     * temperature sensor type
     *
     * On failure, throws an exception or returns YTemperature.SENSORTYPE_INVALID.
     */
    async get_sensorType() {
        let res;
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
     * @param newval : a value among YTemperature.SENSORTYPE_DIGITAL, YTemperature.SENSORTYPE_TYPE_K,
     * YTemperature.SENSORTYPE_TYPE_E, YTemperature.SENSORTYPE_TYPE_J, YTemperature.SENSORTYPE_TYPE_N,
     * YTemperature.SENSORTYPE_TYPE_R, YTemperature.SENSORTYPE_TYPE_S, YTemperature.SENSORTYPE_TYPE_T,
     * YTemperature.SENSORTYPE_PT100_4WIRES, YTemperature.SENSORTYPE_PT100_3WIRES,
     * YTemperature.SENSORTYPE_PT100_2WIRES, YTemperature.SENSORTYPE_RES_OHM,
     * YTemperature.SENSORTYPE_RES_NTC, YTemperature.SENSORTYPE_RES_LINEAR,
     * YTemperature.SENSORTYPE_RES_INTERNAL, YTemperature.SENSORTYPE_IR,
     * YTemperature.SENSORTYPE_RES_PT1000 and YTemperature.SENSORTYPE_CHANNEL_OFF corresponding to the
     * temperature sensor type
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_sensorType(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('sensorType', rest_val);
    }
    /**
     * Returns the current value of the electrical signal measured by the sensor.
     *
     * @return a floating point number corresponding to the current value of the electrical signal
     * measured by the sensor
     *
     * On failure, throws an exception or returns YTemperature.SIGNALVALUE_INVALID.
     */
    async get_signalValue() {
        let res;
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
     * On failure, throws an exception or returns YTemperature.SIGNALUNIT_INVALID.
     */
    async get_signalUnit() {
        let res;
        if (this._cacheExpiration == 0) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YTemperature.SIGNALUNIT_INVALID;
            }
        }
        res = this._signalUnit;
        return res;
    }
    async get_command() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YTemperature.COMMAND_INVALID;
            }
        }
        res = this._command;
        return res;
    }
    async set_command(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('command', rest_val);
    }
    /**
     * Retrieves a temperature sensor for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the temperature sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YTemperature.isOnline() to test if the temperature sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a temperature sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the temperature sensor, for instance
     *         METEOMK2.temperature.
     *
     * @return a YTemperature object allowing you to drive the temperature sensor.
     */
    static FindTemperature(func) {
        let obj;
        obj = YFunction._FindFromCache('Temperature', func);
        if (obj == null) {
            obj = new YTemperature(YAPI, func);
            YFunction._AddToCache('Temperature', func, obj);
        }
        return obj;
    }
    /**
     * Retrieves a temperature sensor for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the temperature sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YTemperature.isOnline() to test if the temperature sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a temperature sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx : a YAPI context
     * @param func : a string that uniquely characterizes the temperature sensor, for instance
     *         METEOMK2.temperature.
     *
     * @return a YTemperature object allowing you to drive the temperature sensor.
     */
    static FindTemperatureInContext(yctx, func) {
        let obj;
        obj = YFunction._FindFromCacheInContext(yctx, 'Temperature', func);
        if (obj == null) {
            obj = new YTemperature(yctx, func);
            YFunction._AddToCache('Temperature', func, obj);
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
    async _invokeValueCallback(value) {
        if (this._valueCallbackTemperature != null) {
            try {
                await this._valueCallbackTemperature(this, value);
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
        this._timedReportCallbackTemperature = callback;
        return 0;
    }
    async _invokeTimedReportCallback(value) {
        if (this._timedReportCallbackTemperature != null) {
            try {
                await this._timedReportCallbackTemperature(this, value);
            }
            catch (e) {
                this._yapi.imm_log('Exception in timedReportCallback:', e);
            }
        }
        else {
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
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_ntcParameters(res25, beta) {
        let t0;
        let t1;
        let res100;
        let tempValues = [];
        let resValues = [];
        t0 = 25.0 + 273.15;
        t1 = 100.0 + 273.15;
        res100 = res25 * Math.exp(beta * (1.0 / t1 - 1.0 / t0));
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
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_thermistorResponseTable(tempValues, resValues) {
        let siz;
        let res;
        let idx;
        let found;
        let prev;
        let curr;
        let currTemp;
        let idxres;
        siz = tempValues.length;
        if (!(siz >= 2)) {
            return this._throw(this._yapi.INVALID_ARGUMENT, 'thermistor response table must have at least two points', this._yapi.INVALID_ARGUMENT);
        }
        if (!(siz == resValues.length)) {
            return this._throw(this._yapi.INVALID_ARGUMENT, 'table sizes mismatch', this._yapi.INVALID_ARGUMENT);
        }
        res = await this.set_command('Z');
        if (!(res == this._yapi.SUCCESS)) {
            return this._throw(this._yapi.IO_ERROR, 'unable to reset thermistor parameters', this._yapi.IO_ERROR);
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
                res = await this.set_command('m' + String(Math.round(Math.round(1000 * curr))) + ':' + String(Math.round(Math.round(1000 * currTemp))));
                if (!(res == this._yapi.SUCCESS)) {
                    return this._throw(this._yapi.IO_ERROR, 'unable to reset thermistor parameters', this._yapi.IO_ERROR);
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
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async loadThermistorResponseTable(tempValues, resValues) {
        let id;
        let bin_json;
        let paramlist = [];
        let templist = [];
        let siz;
        let idx;
        let temp;
        let found;
        let prev;
        let curr;
        let currRes;
        tempValues.length = 0;
        resValues.length = 0;
        id = await this.get_functionId();
        id = (id).substr(11, (id).length - 11);
        if (id == '') {
            id = '1';
        }
        bin_json = await this._download('extra.json?page=' + id);
        paramlist = this.imm_json_get_array(bin_json);
        // first convert all temperatures to float
        siz = ((paramlist.length) >> (1));
        templist.length = 0;
        idx = 0;
        while (idx < siz) {
            temp = parseFloat(paramlist[2 * idx + 1]) / 1000.0;
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
                    currRes = parseFloat(paramlist[2 * idx]) / 1000.0;
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
     * Continues the enumeration of temperature sensors started using yFirstTemperature().
     * Caution: You can't make any assumption about the returned temperature sensors order.
     * If you want to find a specific a temperature sensor, use Temperature.findTemperature()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YTemperature object, corresponding to
     *         a temperature sensor currently online, or a null pointer
     *         if there are no more temperature sensors to enumerate.
     */
    nextTemperature() {
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != YAPI.SUCCESS)
            return null;
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if (next_hwid == null)
            return null;
        return YTemperature.FindTemperatureInContext(this._yapi, next_hwid);
    }
    /**
     * Starts the enumeration of temperature sensors currently accessible.
     * Use the method YTemperature.nextTemperature() to iterate on
     * next temperature sensors.
     *
     * @return a pointer to a YTemperature object, corresponding to
     *         the first temperature sensor currently online, or a null pointer
     *         if there are none.
     */
    static FirstTemperature() {
        let next_hwid = YAPI.imm_getFirstHardwareId('Temperature');
        if (next_hwid == null)
            return null;
        return YTemperature.FindTemperature(next_hwid);
    }
    /**
     * Starts the enumeration of temperature sensors currently accessible.
     * Use the method YTemperature.nextTemperature() to iterate on
     * next temperature sensors.
     *
     * @param yctx : a YAPI context.
     *
     * @return a pointer to a YTemperature object, corresponding to
     *         the first temperature sensor currently online, or a null pointer
     *         if there are none.
     */
    static FirstTemperatureInContext(yctx) {
        let next_hwid = yctx.imm_getFirstHardwareId('Temperature');
        if (next_hwid == null)
            return null;
        return YTemperature.FindTemperatureInContext(yctx, next_hwid);
    }
}
// API symbols as static members
YTemperature.SENSORTYPE_DIGITAL = 0;
YTemperature.SENSORTYPE_TYPE_K = 1;
YTemperature.SENSORTYPE_TYPE_E = 2;
YTemperature.SENSORTYPE_TYPE_J = 3;
YTemperature.SENSORTYPE_TYPE_N = 4;
YTemperature.SENSORTYPE_TYPE_R = 5;
YTemperature.SENSORTYPE_TYPE_S = 6;
YTemperature.SENSORTYPE_TYPE_T = 7;
YTemperature.SENSORTYPE_PT100_4WIRES = 8;
YTemperature.SENSORTYPE_PT100_3WIRES = 9;
YTemperature.SENSORTYPE_PT100_2WIRES = 10;
YTemperature.SENSORTYPE_RES_OHM = 11;
YTemperature.SENSORTYPE_RES_NTC = 12;
YTemperature.SENSORTYPE_RES_LINEAR = 13;
YTemperature.SENSORTYPE_RES_INTERNAL = 14;
YTemperature.SENSORTYPE_IR = 15;
YTemperature.SENSORTYPE_RES_PT1000 = 16;
YTemperature.SENSORTYPE_CHANNEL_OFF = 17;
YTemperature.SENSORTYPE_INVALID = -1;
YTemperature.SIGNALVALUE_INVALID = YAPI.INVALID_DOUBLE;
YTemperature.SIGNALUNIT_INVALID = YAPI.INVALID_STRING;
YTemperature.COMMAND_INVALID = YAPI.INVALID_STRING;
//# sourceMappingURL=yocto_temperature.js.map