/*********************************************************************
 *
 *  $Id: yocto_arithmeticsensor.ts 63327 2024-11-13 09:35:03Z seb $
 *
 *  Implements the high-level API for ArithmeticSensor functions
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
import { YAPI, YAPIContext, YFunction, YSensor } from './yocto_api.js';
//--- (YArithmeticSensor class start)
/**
 * YArithmeticSensor Class: arithmetic sensor control interface, available for instance in the
 * Yocto-MaxiMicroVolt-Rx
 *
 * The YArithmeticSensor class allows some Yoctopuce devices to compute in real-time
 * values based on an arithmetic formula involving one or more measured signals as
 * well as the temperature. As for any physical sensor, the computed values can be
 * read by callback and stored in the built-in datalogger.
 */
//--- (end of YArithmeticSensor class start)
export class YArithmeticSensor extends YSensor {
    //--- (end of YArithmeticSensor attributes declaration)
    constructor(yapi, func) {
        //--- (YArithmeticSensor constructor)
        super(yapi, func);
        this._description = YArithmeticSensor.DESCRIPTION_INVALID;
        this._command = YArithmeticSensor.COMMAND_INVALID;
        this._valueCallbackArithmeticSensor = null;
        this._timedReportCallbackArithmeticSensor = null;
        // API symbols as object properties
        this.DESCRIPTION_INVALID = YAPI.INVALID_STRING;
        this.COMMAND_INVALID = YAPI.INVALID_STRING;
        this._className = 'ArithmeticSensor';
        //--- (end of YArithmeticSensor constructor)
    }
    //--- (YArithmeticSensor implementation)
    imm_parseAttr(name, val) {
        switch (name) {
            case 'description':
                this._description = val;
                return 1;
            case 'command':
                this._command = val;
                return 1;
        }
        return super.imm_parseAttr(name, val);
    }
    /**
     * Changes the measuring unit for the arithmetic sensor.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : a string corresponding to the measuring unit for the arithmetic sensor
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
     * Returns a short informative description of the formula.
     *
     * @return a string corresponding to a short informative description of the formula
     *
     * On failure, throws an exception or returns YArithmeticSensor.DESCRIPTION_INVALID.
     */
    async get_description() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YArithmeticSensor.DESCRIPTION_INVALID;
            }
        }
        res = this._description;
        return res;
    }
    async get_command() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YArithmeticSensor.COMMAND_INVALID;
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
     * Retrieves an arithmetic sensor for a given identifier.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the arithmetic sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YArithmeticSensor.isOnline() to test if the arithmetic sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * an arithmetic sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the arithmetic sensor, for instance
     *         RXUVOLT1.arithmeticSensor1.
     *
     * @return a YArithmeticSensor object allowing you to drive the arithmetic sensor.
     */
    static FindArithmeticSensor(func) {
        let obj;
        obj = YFunction._FindFromCache('ArithmeticSensor', func);
        if (obj == null) {
            obj = new YArithmeticSensor(YAPI, func);
            YFunction._AddToCache('ArithmeticSensor', func, obj);
        }
        return obj;
    }
    /**
     * Retrieves an arithmetic sensor for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the arithmetic sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YArithmeticSensor.isOnline() to test if the arithmetic sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * an arithmetic sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx : a YAPI context
     * @param func : a string that uniquely characterizes the arithmetic sensor, for instance
     *         RXUVOLT1.arithmeticSensor1.
     *
     * @return a YArithmeticSensor object allowing you to drive the arithmetic sensor.
     */
    static FindArithmeticSensorInContext(yctx, func) {
        let obj;
        obj = YFunction._FindFromCacheInContext(yctx, 'ArithmeticSensor', func);
        if (obj == null) {
            obj = new YArithmeticSensor(yctx, func);
            YFunction._AddToCache('ArithmeticSensor', func, obj);
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
        this._valueCallbackArithmeticSensor = callback;
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
        if (this._valueCallbackArithmeticSensor != null) {
            try {
                await this._valueCallbackArithmeticSensor(this, value);
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
        this._timedReportCallbackArithmeticSensor = callback;
        return 0;
    }
    async _invokeTimedReportCallback(value) {
        if (this._timedReportCallbackArithmeticSensor != null) {
            try {
                await this._timedReportCallbackArithmeticSensor(this, value);
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
     * Defines the arithmetic function by means of an algebraic expression. The expression
     * may include references to device sensors, by their physical or logical name, to
     * usual math functions and to auxiliary functions defined separately.
     *
     * @param expr : the algebraic expression defining the function.
     * @param descr : short informative description of the expression.
     *
     * @return the current expression value if the call succeeds.
     *
     * On failure, throws an exception or returns YAPI.INVALID_DOUBLE.
     */
    async defineExpression(expr, descr) {
        let id;
        let fname;
        let content;
        let data;
        let diags;
        let resval;
        id = await this.get_functionId();
        id = id.substr(16, (id).length - 16);
        fname = 'arithmExpr' + id + '.txt';
        content = '// ' + descr + '\n' + expr;
        data = await this._uploadEx(fname, this._yapi.imm_str2bin(content));
        diags = this._yapi.imm_bin2str(data);
        if (!(diags.substr(0, 8) == 'Result: ')) {
            return this._throw(this._yapi.INVALID_ARGUMENT, diags, this._yapi.INVALID_DOUBLE);
        }
        resval = YAPIContext.imm_atof(diags.substr(8, (diags).length - 8));
        return resval;
    }
    /**
     * Retrieves the algebraic expression defining the arithmetic function, as previously
     * configured using the defineExpression function.
     *
     * @return a string containing the mathematical expression.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async loadExpression() {
        let id;
        let fname;
        let content;
        let idx;
        id = await this.get_functionId();
        id = id.substr(16, (id).length - 16);
        fname = 'arithmExpr' + id + '.txt';
        content = this._yapi.imm_bin2str(await this._download(fname));
        idx = (content).indexOf('\n');
        if (idx > 0) {
            content = content.substr(idx + 1, (content).length - (idx + 1));
        }
        return content;
    }
    /**
     * Defines a auxiliary function by means of a table of reference points. Intermediate values
     * will be interpolated between specified reference points. The reference points are given
     * as pairs of floating point numbers.
     * The auxiliary function will be available for use by all ArithmeticSensor objects of the
     * device. Up to nine auxiliary function can be defined in a device, each containing up to
     * 96 reference points.
     *
     * @param name : auxiliary function name, up to 16 characters.
     * @param inputValues : array of floating point numbers, corresponding to the function input value.
     * @param outputValues : array of floating point numbers, corresponding to the output value
     *         desired for each of the input value, index by index.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async defineAuxiliaryFunction(name, inputValues, outputValues) {
        let siz;
        let defstr;
        let idx;
        let inputVal;
        let outputVal;
        let fname;
        siz = inputValues.length;
        if (!(siz > 1)) {
            return this._throw(this._yapi.INVALID_ARGUMENT, 'auxiliary function must be defined by at least two points', this._yapi.INVALID_ARGUMENT);
        }
        if (!(siz == outputValues.length)) {
            return this._throw(this._yapi.INVALID_ARGUMENT, 'table sizes mismatch', this._yapi.INVALID_ARGUMENT);
        }
        defstr = '';
        idx = 0;
        while (idx < siz) {
            inputVal = inputValues[idx];
            outputVal = outputValues[idx];
            defstr = defstr + '' + String(Math.round(inputVal * 1000) / 1000) + ':' + String(Math.round(outputVal * 1000) / 1000) + '\n';
            idx = idx + 1;
        }
        fname = 'userMap' + name + '.txt';
        return await this._upload(fname, this._yapi.imm_str2bin(defstr));
    }
    /**
     * Retrieves the reference points table defining an auxiliary function previously
     * configured using the defineAuxiliaryFunction function.
     *
     * @param name : auxiliary function name, up to 16 characters.
     * @param inputValues : array of floating point numbers, that is filled by the function
     *         with all the function reference input value.
     * @param outputValues : array of floating point numbers, that is filled by the function
     *         output value for each of the input value, index by index.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async loadAuxiliaryFunction(name, inputValues, outputValues) {
        let fname;
        let defbin;
        let siz;
        fname = 'userMap' + name + '.txt';
        defbin = await this._download(fname);
        siz = (defbin).length;
        if (!(siz > 0)) {
            return this._throw(this._yapi.INVALID_ARGUMENT, 'auxiliary function does not exist', this._yapi.INVALID_ARGUMENT);
        }
        inputValues.length = 0;
        outputValues.length = 0;
        // FIXME: decode line by line
        return this._yapi.SUCCESS;
    }
    /**
     * Continues the enumeration of arithmetic sensors started using yFirstArithmeticSensor().
     * Caution: You can't make any assumption about the returned arithmetic sensors order.
     * If you want to find a specific an arithmetic sensor, use ArithmeticSensor.findArithmeticSensor()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YArithmeticSensor object, corresponding to
     *         an arithmetic sensor currently online, or a null pointer
     *         if there are no more arithmetic sensors to enumerate.
     */
    nextArithmeticSensor() {
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != YAPI.SUCCESS)
            return null;
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if (next_hwid == null)
            return null;
        return YArithmeticSensor.FindArithmeticSensorInContext(this._yapi, next_hwid);
    }
    /**
     * Starts the enumeration of arithmetic sensors currently accessible.
     * Use the method YArithmeticSensor.nextArithmeticSensor() to iterate on
     * next arithmetic sensors.
     *
     * @return a pointer to a YArithmeticSensor object, corresponding to
     *         the first arithmetic sensor currently online, or a null pointer
     *         if there are none.
     */
    static FirstArithmeticSensor() {
        let next_hwid = YAPI.imm_getFirstHardwareId('ArithmeticSensor');
        if (next_hwid == null)
            return null;
        return YArithmeticSensor.FindArithmeticSensor(next_hwid);
    }
    /**
     * Starts the enumeration of arithmetic sensors currently accessible.
     * Use the method YArithmeticSensor.nextArithmeticSensor() to iterate on
     * next arithmetic sensors.
     *
     * @param yctx : a YAPI context.
     *
     * @return a pointer to a YArithmeticSensor object, corresponding to
     *         the first arithmetic sensor currently online, or a null pointer
     *         if there are none.
     */
    static FirstArithmeticSensorInContext(yctx) {
        let next_hwid = yctx.imm_getFirstHardwareId('ArithmeticSensor');
        if (next_hwid == null)
            return null;
        return YArithmeticSensor.FindArithmeticSensorInContext(yctx, next_hwid);
    }
}
// API symbols as static members
YArithmeticSensor.DESCRIPTION_INVALID = YAPI.INVALID_STRING;
YArithmeticSensor.COMMAND_INVALID = YAPI.INVALID_STRING;
//# sourceMappingURL=yocto_arithmeticsensor.js.map