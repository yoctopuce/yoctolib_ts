"use strict";
/*********************************************************************
 *
 *  $Id: yocto_powersupply.ts 43760 2021-02-08 14:33:45Z mvuilleu $
 *
 *  Implements the high-level API for PowerSupply functions
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.YPowerSupply = void 0;
const yocto_api_js_1 = require("./yocto_api.js");
//--- (YPowerSupply class start)
/**
 * YPowerSupply Class: regulated power supply control interface
 *
 * The YPowerSupply class allows you to drive a Yoctopuce power supply.
 * It can be use to change the voltage set point,
 * the current limit and the enable/disable the output.
 */
//--- (end of YPowerSupply class start)
class YPowerSupply extends yocto_api_js_1.YFunction {
    //--- (end of YPowerSupply attributes declaration)
    constructor(yapi, func) {
        //--- (YPowerSupply constructor)
        super(yapi, func);
        this._voltageSetPoint = YPowerSupply.VOLTAGESETPOINT_INVALID;
        this._currentLimit = YPowerSupply.CURRENTLIMIT_INVALID;
        this._powerOutput = YPowerSupply.POWEROUTPUT_INVALID;
        this._voltageSense = YPowerSupply.VOLTAGESENSE_INVALID;
        this._measuredVoltage = YPowerSupply.MEASUREDVOLTAGE_INVALID;
        this._measuredCurrent = YPowerSupply.MEASUREDCURRENT_INVALID;
        this._inputVoltage = YPowerSupply.INPUTVOLTAGE_INVALID;
        this._vInt = YPowerSupply.VINT_INVALID;
        this._ldoTemperature = YPowerSupply.LDOTEMPERATURE_INVALID;
        this._voltageTransition = YPowerSupply.VOLTAGETRANSITION_INVALID;
        this._voltageAtStartUp = YPowerSupply.VOLTAGEATSTARTUP_INVALID;
        this._currentAtStartUp = YPowerSupply.CURRENTATSTARTUP_INVALID;
        this._command = YPowerSupply.COMMAND_INVALID;
        this._valueCallbackPowerSupply = null;
        // API symbols as object properties
        this.VOLTAGESETPOINT_INVALID = yocto_api_js_1.YAPI.INVALID_DOUBLE;
        this.CURRENTLIMIT_INVALID = yocto_api_js_1.YAPI.INVALID_DOUBLE;
        this.POWEROUTPUT_OFF = 0;
        this.POWEROUTPUT_ON = 1;
        this.POWEROUTPUT_INVALID = -1;
        this.VOLTAGESENSE_INT = 0;
        this.VOLTAGESENSE_EXT = 1;
        this.VOLTAGESENSE_INVALID = -1;
        this.MEASUREDVOLTAGE_INVALID = yocto_api_js_1.YAPI.INVALID_DOUBLE;
        this.MEASUREDCURRENT_INVALID = yocto_api_js_1.YAPI.INVALID_DOUBLE;
        this.INPUTVOLTAGE_INVALID = yocto_api_js_1.YAPI.INVALID_DOUBLE;
        this.VINT_INVALID = yocto_api_js_1.YAPI.INVALID_DOUBLE;
        this.LDOTEMPERATURE_INVALID = yocto_api_js_1.YAPI.INVALID_DOUBLE;
        this.VOLTAGETRANSITION_INVALID = yocto_api_js_1.YAPI.INVALID_STRING;
        this.VOLTAGEATSTARTUP_INVALID = yocto_api_js_1.YAPI.INVALID_DOUBLE;
        this.CURRENTATSTARTUP_INVALID = yocto_api_js_1.YAPI.INVALID_DOUBLE;
        this.COMMAND_INVALID = yocto_api_js_1.YAPI.INVALID_STRING;
        this._className = 'PowerSupply';
        //--- (end of YPowerSupply constructor)
    }
    //--- (YPowerSupply implementation)
    imm_parseAttr(name, val) {
        switch (name) {
            case 'voltageSetPoint':
                this._voltageSetPoint = Math.round(val * 1000.0 / 65536.0) / 1000.0;
                return 1;
            case 'currentLimit':
                this._currentLimit = Math.round(val * 1000.0 / 65536.0) / 1000.0;
                return 1;
            case 'powerOutput':
                this._powerOutput = val;
                return 1;
            case 'voltageSense':
                this._voltageSense = val;
                return 1;
            case 'measuredVoltage':
                this._measuredVoltage = Math.round(val * 1000.0 / 65536.0) / 1000.0;
                return 1;
            case 'measuredCurrent':
                this._measuredCurrent = Math.round(val * 1000.0 / 65536.0) / 1000.0;
                return 1;
            case 'inputVoltage':
                this._inputVoltage = Math.round(val * 1000.0 / 65536.0) / 1000.0;
                return 1;
            case 'vInt':
                this._vInt = Math.round(val * 1000.0 / 65536.0) / 1000.0;
                return 1;
            case 'ldoTemperature':
                this._ldoTemperature = Math.round(val * 1000.0 / 65536.0) / 1000.0;
                return 1;
            case 'voltageTransition':
                this._voltageTransition = val;
                return 1;
            case 'voltageAtStartUp':
                this._voltageAtStartUp = Math.round(val * 1000.0 / 65536.0) / 1000.0;
                return 1;
            case 'currentAtStartUp':
                this._currentAtStartUp = Math.round(val * 1000.0 / 65536.0) / 1000.0;
                return 1;
            case 'command':
                this._command = val;
                return 1;
        }
        return super.imm_parseAttr(name, val);
    }
    /**
     * Changes the voltage set point, in V.
     *
     * @param newval : a floating point number corresponding to the voltage set point, in V
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_voltageSetPoint(newval) {
        let rest_val;
        rest_val = String(Math.round(newval * 65536.0));
        return await this._setAttr('voltageSetPoint', rest_val);
    }
    /**
     * Returns the voltage set point, in V.
     *
     * @return a floating point number corresponding to the voltage set point, in V
     *
     * On failure, throws an exception or returns YPowerSupply.VOLTAGESETPOINT_INVALID.
     */
    async get_voltageSetPoint() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YPowerSupply.VOLTAGESETPOINT_INVALID;
            }
        }
        res = this._voltageSetPoint;
        return res;
    }
    /**
     * Changes the current limit, in mA.
     *
     * @param newval : a floating point number corresponding to the current limit, in mA
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_currentLimit(newval) {
        let rest_val;
        rest_val = String(Math.round(newval * 65536.0));
        return await this._setAttr('currentLimit', rest_val);
    }
    /**
     * Returns the current limit, in mA.
     *
     * @return a floating point number corresponding to the current limit, in mA
     *
     * On failure, throws an exception or returns YPowerSupply.CURRENTLIMIT_INVALID.
     */
    async get_currentLimit() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YPowerSupply.CURRENTLIMIT_INVALID;
            }
        }
        res = this._currentLimit;
        return res;
    }
    /**
     * Returns the power supply output switch state.
     *
     * @return either YPowerSupply.POWEROUTPUT_OFF or YPowerSupply.POWEROUTPUT_ON, according to the power
     * supply output switch state
     *
     * On failure, throws an exception or returns YPowerSupply.POWEROUTPUT_INVALID.
     */
    async get_powerOutput() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YPowerSupply.POWEROUTPUT_INVALID;
            }
        }
        res = this._powerOutput;
        return res;
    }
    /**
     * Changes the power supply output switch state.
     *
     * @param newval : either YPowerSupply.POWEROUTPUT_OFF or YPowerSupply.POWEROUTPUT_ON, according to
     * the power supply output switch state
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_powerOutput(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('powerOutput', rest_val);
    }
    /**
     * Returns the output voltage control point.
     *
     * @return either YPowerSupply.VOLTAGESENSE_INT or YPowerSupply.VOLTAGESENSE_EXT, according to the
     * output voltage control point
     *
     * On failure, throws an exception or returns YPowerSupply.VOLTAGESENSE_INVALID.
     */
    async get_voltageSense() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YPowerSupply.VOLTAGESENSE_INVALID;
            }
        }
        res = this._voltageSense;
        return res;
    }
    /**
     * Changes the voltage control point.
     *
     * @param newval : either YPowerSupply.VOLTAGESENSE_INT or YPowerSupply.VOLTAGESENSE_EXT, according to
     * the voltage control point
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_voltageSense(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('voltageSense', rest_val);
    }
    /**
     * Returns the measured output voltage, in V.
     *
     * @return a floating point number corresponding to the measured output voltage, in V
     *
     * On failure, throws an exception or returns YPowerSupply.MEASUREDVOLTAGE_INVALID.
     */
    async get_measuredVoltage() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YPowerSupply.MEASUREDVOLTAGE_INVALID;
            }
        }
        res = this._measuredVoltage;
        return res;
    }
    /**
     * Returns the measured output current, in mA.
     *
     * @return a floating point number corresponding to the measured output current, in mA
     *
     * On failure, throws an exception or returns YPowerSupply.MEASUREDCURRENT_INVALID.
     */
    async get_measuredCurrent() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YPowerSupply.MEASUREDCURRENT_INVALID;
            }
        }
        res = this._measuredCurrent;
        return res;
    }
    /**
     * Returns the measured input voltage, in V.
     *
     * @return a floating point number corresponding to the measured input voltage, in V
     *
     * On failure, throws an exception or returns YPowerSupply.INPUTVOLTAGE_INVALID.
     */
    async get_inputVoltage() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YPowerSupply.INPUTVOLTAGE_INVALID;
            }
        }
        res = this._inputVoltage;
        return res;
    }
    /**
     * Returns the internal voltage, in V.
     *
     * @return a floating point number corresponding to the internal voltage, in V
     *
     * On failure, throws an exception or returns YPowerSupply.VINT_INVALID.
     */
    async get_vInt() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YPowerSupply.VINT_INVALID;
            }
        }
        res = this._vInt;
        return res;
    }
    /**
     * Returns the LDO temperature, in Celsius.
     *
     * @return a floating point number corresponding to the LDO temperature, in Celsius
     *
     * On failure, throws an exception or returns YPowerSupply.LDOTEMPERATURE_INVALID.
     */
    async get_ldoTemperature() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YPowerSupply.LDOTEMPERATURE_INVALID;
            }
        }
        res = this._ldoTemperature;
        return res;
    }
    async get_voltageTransition() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YPowerSupply.VOLTAGETRANSITION_INVALID;
            }
        }
        res = this._voltageTransition;
        return res;
    }
    async set_voltageTransition(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('voltageTransition', rest_val);
    }
    /**
     * Changes the voltage set point at device start up. Remember to call the matching
     * module saveToFlash() method, otherwise this call has no effect.
     *
     * @param newval : a floating point number corresponding to the voltage set point at device start up
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_voltageAtStartUp(newval) {
        let rest_val;
        rest_val = String(Math.round(newval * 65536.0));
        return await this._setAttr('voltageAtStartUp', rest_val);
    }
    /**
     * Returns the selected voltage set point at device startup, in V.
     *
     * @return a floating point number corresponding to the selected voltage set point at device startup, in V
     *
     * On failure, throws an exception or returns YPowerSupply.VOLTAGEATSTARTUP_INVALID.
     */
    async get_voltageAtStartUp() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YPowerSupply.VOLTAGEATSTARTUP_INVALID;
            }
        }
        res = this._voltageAtStartUp;
        return res;
    }
    /**
     * Changes the current limit at device start up. Remember to call the matching
     * module saveToFlash() method, otherwise this call has no effect.
     *
     * @param newval : a floating point number corresponding to the current limit at device start up
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_currentAtStartUp(newval) {
        let rest_val;
        rest_val = String(Math.round(newval * 65536.0));
        return await this._setAttr('currentAtStartUp', rest_val);
    }
    /**
     * Returns the selected current limit at device startup, in mA.
     *
     * @return a floating point number corresponding to the selected current limit at device startup, in mA
     *
     * On failure, throws an exception or returns YPowerSupply.CURRENTATSTARTUP_INVALID.
     */
    async get_currentAtStartUp() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YPowerSupply.CURRENTATSTARTUP_INVALID;
            }
        }
        res = this._currentAtStartUp;
        return res;
    }
    async get_command() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YPowerSupply.COMMAND_INVALID;
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
     * Retrieves a regulated power supply for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the regulated power supply is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YPowerSupply.isOnline() to test if the regulated power supply is
     * indeed online at a given time. In case of ambiguity when looking for
     * a regulated power supply by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the regulated power supply, for instance
     *         MyDevice.powerSupply.
     *
     * @return a YPowerSupply object allowing you to drive the regulated power supply.
     */
    static FindPowerSupply(func) {
        let obj;
        obj = yocto_api_js_1.YFunction._FindFromCache('PowerSupply', func);
        if (obj == null) {
            obj = new YPowerSupply(yocto_api_js_1.YAPI, func);
            yocto_api_js_1.YFunction._AddToCache('PowerSupply', func, obj);
        }
        return obj;
    }
    /**
     * Retrieves a regulated power supply for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the regulated power supply is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YPowerSupply.isOnline() to test if the regulated power supply is
     * indeed online at a given time. In case of ambiguity when looking for
     * a regulated power supply by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx : a YAPI context
     * @param func : a string that uniquely characterizes the regulated power supply, for instance
     *         MyDevice.powerSupply.
     *
     * @return a YPowerSupply object allowing you to drive the regulated power supply.
     */
    static FindPowerSupplyInContext(yctx, func) {
        let obj;
        obj = yocto_api_js_1.YFunction._FindFromCacheInContext(yctx, 'PowerSupply', func);
        if (obj == null) {
            obj = new YPowerSupply(yctx, func);
            yocto_api_js_1.YFunction._AddToCache('PowerSupply', func, obj);
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
            await yocto_api_js_1.YFunction._UpdateValueCallbackList(this, true);
        }
        else {
            await yocto_api_js_1.YFunction._UpdateValueCallbackList(this, false);
        }
        this._valueCallbackPowerSupply = callback;
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
        if (this._valueCallbackPowerSupply != null) {
            try {
                await this._valueCallbackPowerSupply(this, value);
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
     * Performs a smooth transition of output voltage. Any explicit voltage
     * change cancels any ongoing transition process.
     *
     * @param V_target   : new output voltage value at the end of the transition
     *         (floating-point number, representing the end voltage in V)
     * @param ms_duration : total duration of the transition, in milliseconds
     *
     * @return YAPI.SUCCESS when the call succeeds.
     */
    async voltageMove(V_target, ms_duration) {
        let newval;
        if (V_target < 0.0) {
            V_target = 0.0;
        }
        newval = String(Math.round(Math.round(V_target * 65536))) + ':' + String(Math.round(ms_duration));
        return await this.set_voltageTransition(newval);
    }
    /**
     * Continues the enumeration of regulated power supplies started using yFirstPowerSupply().
     * Caution: You can't make any assumption about the returned regulated power supplies order.
     * If you want to find a specific a regulated power supply, use PowerSupply.findPowerSupply()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YPowerSupply object, corresponding to
     *         a regulated power supply currently online, or a null pointer
     *         if there are no more regulated power supplies to enumerate.
     */
    nextPowerSupply() {
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != yocto_api_js_1.YAPI.SUCCESS)
            return null;
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if (next_hwid == null)
            return null;
        return YPowerSupply.FindPowerSupplyInContext(this._yapi, next_hwid);
    }
    /**
     * Starts the enumeration of regulated power supplies currently accessible.
     * Use the method YPowerSupply.nextPowerSupply() to iterate on
     * next regulated power supplies.
     *
     * @return a pointer to a YPowerSupply object, corresponding to
     *         the first regulated power supply currently online, or a null pointer
     *         if there are none.
     */
    static FirstPowerSupply() {
        let next_hwid = yocto_api_js_1.YAPI.imm_getFirstHardwareId('PowerSupply');
        if (next_hwid == null)
            return null;
        return YPowerSupply.FindPowerSupply(next_hwid);
    }
    /**
     * Starts the enumeration of regulated power supplies currently accessible.
     * Use the method YPowerSupply.nextPowerSupply() to iterate on
     * next regulated power supplies.
     *
     * @param yctx : a YAPI context.
     *
     * @return a pointer to a YPowerSupply object, corresponding to
     *         the first regulated power supply currently online, or a null pointer
     *         if there are none.
     */
    static FirstPowerSupplyInContext(yctx) {
        let next_hwid = yctx.imm_getFirstHardwareId('PowerSupply');
        if (next_hwid == null)
            return null;
        return YPowerSupply.FindPowerSupplyInContext(yctx, next_hwid);
    }
}
exports.YPowerSupply = YPowerSupply;
// API symbols as static members
YPowerSupply.VOLTAGESETPOINT_INVALID = yocto_api_js_1.YAPI.INVALID_DOUBLE;
YPowerSupply.CURRENTLIMIT_INVALID = yocto_api_js_1.YAPI.INVALID_DOUBLE;
YPowerSupply.POWEROUTPUT_OFF = 0;
YPowerSupply.POWEROUTPUT_ON = 1;
YPowerSupply.POWEROUTPUT_INVALID = -1;
YPowerSupply.VOLTAGESENSE_INT = 0;
YPowerSupply.VOLTAGESENSE_EXT = 1;
YPowerSupply.VOLTAGESENSE_INVALID = -1;
YPowerSupply.MEASUREDVOLTAGE_INVALID = yocto_api_js_1.YAPI.INVALID_DOUBLE;
YPowerSupply.MEASUREDCURRENT_INVALID = yocto_api_js_1.YAPI.INVALID_DOUBLE;
YPowerSupply.INPUTVOLTAGE_INVALID = yocto_api_js_1.YAPI.INVALID_DOUBLE;
YPowerSupply.VINT_INVALID = yocto_api_js_1.YAPI.INVALID_DOUBLE;
YPowerSupply.LDOTEMPERATURE_INVALID = yocto_api_js_1.YAPI.INVALID_DOUBLE;
YPowerSupply.VOLTAGETRANSITION_INVALID = yocto_api_js_1.YAPI.INVALID_STRING;
YPowerSupply.VOLTAGEATSTARTUP_INVALID = yocto_api_js_1.YAPI.INVALID_DOUBLE;
YPowerSupply.CURRENTATSTARTUP_INVALID = yocto_api_js_1.YAPI.INVALID_DOUBLE;
YPowerSupply.COMMAND_INVALID = yocto_api_js_1.YAPI.INVALID_STRING;
//# sourceMappingURL=yocto_powersupply.js.map