"use strict";
/*********************************************************************
 *
 *  $Id: yocto_poweroutput.ts 48520 2022-02-03 10:51:20Z seb $
 *
 *  Implements the high-level API for PowerOutput functions
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
exports.YPowerOutput = void 0;
const yocto_api_js_1 = require("./yocto_api.js");
//--- (YPowerOutput class start)
/**
 * YPowerOutput Class: power output control interface, available for instance in the Yocto-I2C, the
 * Yocto-MaxiMicroVolt-Rx, the Yocto-SPI or the Yocto-Serial
 *
 * The YPowerOutput class allows you to control
 * the power output featured on some Yoctopuce devices.
 */
//--- (end of YPowerOutput class start)
class YPowerOutput extends yocto_api_js_1.YFunction {
    //--- (end of YPowerOutput attributes declaration)
    constructor(yapi, func) {
        //--- (YPowerOutput constructor)
        super(yapi, func);
        this._voltage = YPowerOutput.VOLTAGE_INVALID;
        this._valueCallbackPowerOutput = null;
        // API symbols as object properties
        this.VOLTAGE_OFF = 0;
        this.VOLTAGE_OUT3V3 = 1;
        this.VOLTAGE_OUT5V = 2;
        this.VOLTAGE_OUT4V7 = 3;
        this.VOLTAGE_OUT1V8 = 4;
        this.VOLTAGE_INVALID = -1;
        this._className = 'PowerOutput';
        //--- (end of YPowerOutput constructor)
    }
    //--- (YPowerOutput implementation)
    imm_parseAttr(name, val) {
        switch (name) {
            case 'voltage':
                this._voltage = val;
                return 1;
        }
        return super.imm_parseAttr(name, val);
    }
    /**
     * Returns the voltage on the power output featured by the module.
     *
     * @return a value among YPowerOutput.VOLTAGE_OFF, YPowerOutput.VOLTAGE_OUT3V3,
     * YPowerOutput.VOLTAGE_OUT5V, YPowerOutput.VOLTAGE_OUT4V7 and YPowerOutput.VOLTAGE_OUT1V8
     * corresponding to the voltage on the power output featured by the module
     *
     * On failure, throws an exception or returns YPowerOutput.VOLTAGE_INVALID.
     */
    async get_voltage() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YPowerOutput.VOLTAGE_INVALID;
            }
        }
        res = this._voltage;
        return res;
    }
    /**
     * Changes the voltage on the power output provided by the
     * module. Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : a value among YPowerOutput.VOLTAGE_OFF, YPowerOutput.VOLTAGE_OUT3V3,
     * YPowerOutput.VOLTAGE_OUT5V, YPowerOutput.VOLTAGE_OUT4V7 and YPowerOutput.VOLTAGE_OUT1V8
     * corresponding to the voltage on the power output provided by the
     *         module
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_voltage(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('voltage', rest_val);
    }
    /**
     * Retrieves a power output for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the power output is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YPowerOutput.isOnline() to test if the power output is
     * indeed online at a given time. In case of ambiguity when looking for
     * a power output by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the power output, for instance
     *         YI2CMK01.powerOutput.
     *
     * @return a YPowerOutput object allowing you to drive the power output.
     */
    static FindPowerOutput(func) {
        let obj;
        obj = yocto_api_js_1.YFunction._FindFromCache('PowerOutput', func);
        if (obj == null) {
            obj = new YPowerOutput(yocto_api_js_1.YAPI, func);
            yocto_api_js_1.YFunction._AddToCache('PowerOutput', func, obj);
        }
        return obj;
    }
    /**
     * Retrieves a power output for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the power output is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YPowerOutput.isOnline() to test if the power output is
     * indeed online at a given time. In case of ambiguity when looking for
     * a power output by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx : a YAPI context
     * @param func : a string that uniquely characterizes the power output, for instance
     *         YI2CMK01.powerOutput.
     *
     * @return a YPowerOutput object allowing you to drive the power output.
     */
    static FindPowerOutputInContext(yctx, func) {
        let obj;
        obj = yocto_api_js_1.YFunction._FindFromCacheInContext(yctx, 'PowerOutput', func);
        if (obj == null) {
            obj = new YPowerOutput(yctx, func);
            yocto_api_js_1.YFunction._AddToCache('PowerOutput', func, obj);
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
        this._valueCallbackPowerOutput = callback;
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
        if (this._valueCallbackPowerOutput != null) {
            try {
                await this._valueCallbackPowerOutput(this, value);
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
     * Continues the enumeration of power output started using yFirstPowerOutput().
     * Caution: You can't make any assumption about the returned power output order.
     * If you want to find a specific a power output, use PowerOutput.findPowerOutput()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YPowerOutput object, corresponding to
     *         a power output currently online, or a null pointer
     *         if there are no more power output to enumerate.
     */
    nextPowerOutput() {
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != yocto_api_js_1.YAPI.SUCCESS)
            return null;
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if (next_hwid == null)
            return null;
        return YPowerOutput.FindPowerOutputInContext(this._yapi, next_hwid);
    }
    /**
     * Starts the enumeration of power output currently accessible.
     * Use the method YPowerOutput.nextPowerOutput() to iterate on
     * next power output.
     *
     * @return a pointer to a YPowerOutput object, corresponding to
     *         the first power output currently online, or a null pointer
     *         if there are none.
     */
    static FirstPowerOutput() {
        let next_hwid = yocto_api_js_1.YAPI.imm_getFirstHardwareId('PowerOutput');
        if (next_hwid == null)
            return null;
        return YPowerOutput.FindPowerOutput(next_hwid);
    }
    /**
     * Starts the enumeration of power output currently accessible.
     * Use the method YPowerOutput.nextPowerOutput() to iterate on
     * next power output.
     *
     * @param yctx : a YAPI context.
     *
     * @return a pointer to a YPowerOutput object, corresponding to
     *         the first power output currently online, or a null pointer
     *         if there are none.
     */
    static FirstPowerOutputInContext(yctx) {
        let next_hwid = yctx.imm_getFirstHardwareId('PowerOutput');
        if (next_hwid == null)
            return null;
        return YPowerOutput.FindPowerOutputInContext(yctx, next_hwid);
    }
}
exports.YPowerOutput = YPowerOutput;
// API symbols as static members
YPowerOutput.VOLTAGE_OFF = 0;
YPowerOutput.VOLTAGE_OUT3V3 = 1;
YPowerOutput.VOLTAGE_OUT5V = 2;
YPowerOutput.VOLTAGE_OUT4V7 = 3;
YPowerOutput.VOLTAGE_OUT1V8 = 4;
YPowerOutput.VOLTAGE_INVALID = -1;
//# sourceMappingURL=yocto_poweroutput.js.map