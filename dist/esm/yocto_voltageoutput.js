/*********************************************************************
 *
 *  $Id: yocto_voltageoutput.ts 54279 2023-04-28 10:11:03Z seb $
 *
 *  Implements the high-level API for VoltageOutput functions
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
import { YAPI, YFunction } from './yocto_api.js';
//--- (YVoltageOutput class start)
/**
 * YVoltageOutput Class: voltage output control interface, available for instance in the Yocto-0-10V-Tx
 *
 * The YVoltageOutput class allows you to drive a voltage output.
 */
//--- (end of YVoltageOutput class start)
export class YVoltageOutput extends YFunction {
    //--- (end of YVoltageOutput attributes declaration)
    constructor(yapi, func) {
        //--- (YVoltageOutput constructor)
        super(yapi, func);
        this._currentVoltage = YVoltageOutput.CURRENTVOLTAGE_INVALID;
        this._voltageTransition = YVoltageOutput.VOLTAGETRANSITION_INVALID;
        this._voltageAtStartUp = YVoltageOutput.VOLTAGEATSTARTUP_INVALID;
        this._valueCallbackVoltageOutput = null;
        // API symbols as object properties
        this.CURRENTVOLTAGE_INVALID = YAPI.INVALID_DOUBLE;
        this.VOLTAGETRANSITION_INVALID = YAPI.INVALID_STRING;
        this.VOLTAGEATSTARTUP_INVALID = YAPI.INVALID_DOUBLE;
        this._className = 'VoltageOutput';
        //--- (end of YVoltageOutput constructor)
    }
    //--- (YVoltageOutput implementation)
    imm_parseAttr(name, val) {
        switch (name) {
            case 'currentVoltage':
                this._currentVoltage = Math.round(val / 65.536) / 1000.0;
                return 1;
            case 'voltageTransition':
                this._voltageTransition = val;
                return 1;
            case 'voltageAtStartUp':
                this._voltageAtStartUp = Math.round(val / 65.536) / 1000.0;
                return 1;
        }
        return super.imm_parseAttr(name, val);
    }
    /**
     * Changes the output voltage, in V. Valid range is from 0 to 10V.
     *
     * @param newval : a floating point number corresponding to the output voltage, in V
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_currentVoltage(newval) {
        let rest_val;
        rest_val = String(Math.round(newval * 65536.0));
        return await this._setAttr('currentVoltage', rest_val);
    }
    /**
     * Returns the output voltage set point, in V.
     *
     * @return a floating point number corresponding to the output voltage set point, in V
     *
     * On failure, throws an exception or returns YVoltageOutput.CURRENTVOLTAGE_INVALID.
     */
    async get_currentVoltage() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YVoltageOutput.CURRENTVOLTAGE_INVALID;
            }
        }
        res = this._currentVoltage;
        return res;
    }
    async get_voltageTransition() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YVoltageOutput.VOLTAGETRANSITION_INVALID;
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
     * Changes the output voltage at device start up. Remember to call the matching
     * module saveToFlash() method, otherwise this call has no effect.
     *
     * @param newval : a floating point number corresponding to the output voltage at device start up
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
     * Returns the selected voltage output at device startup, in V.
     *
     * @return a floating point number corresponding to the selected voltage output at device startup, in V
     *
     * On failure, throws an exception or returns YVoltageOutput.VOLTAGEATSTARTUP_INVALID.
     */
    async get_voltageAtStartUp() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YVoltageOutput.VOLTAGEATSTARTUP_INVALID;
            }
        }
        res = this._voltageAtStartUp;
        return res;
    }
    /**
     * Retrieves a voltage output for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the voltage output is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YVoltageOutput.isOnline() to test if the voltage output is
     * indeed online at a given time. In case of ambiguity when looking for
     * a voltage output by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the voltage output, for instance
     *         TX010V01.voltageOutput1.
     *
     * @return a YVoltageOutput object allowing you to drive the voltage output.
     */
    static FindVoltageOutput(func) {
        let obj;
        obj = YFunction._FindFromCache('VoltageOutput', func);
        if (obj == null) {
            obj = new YVoltageOutput(YAPI, func);
            YFunction._AddToCache('VoltageOutput', func, obj);
        }
        return obj;
    }
    /**
     * Retrieves a voltage output for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the voltage output is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YVoltageOutput.isOnline() to test if the voltage output is
     * indeed online at a given time. In case of ambiguity when looking for
     * a voltage output by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx : a YAPI context
     * @param func : a string that uniquely characterizes the voltage output, for instance
     *         TX010V01.voltageOutput1.
     *
     * @return a YVoltageOutput object allowing you to drive the voltage output.
     */
    static FindVoltageOutputInContext(yctx, func) {
        let obj;
        obj = YFunction._FindFromCacheInContext(yctx, 'VoltageOutput', func);
        if (obj == null) {
            obj = new YVoltageOutput(yctx, func);
            YFunction._AddToCache('VoltageOutput', func, obj);
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
        this._valueCallbackVoltageOutput = callback;
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
        if (this._valueCallbackVoltageOutput != null) {
            try {
                await this._valueCallbackVoltageOutput(this, value);
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
        if (V_target > 10.0) {
            V_target = 10.0;
        }
        newval = String(Math.round(Math.round(V_target * 65536))) + ':' + String(Math.round(ms_duration));
        return await this.set_voltageTransition(newval);
    }
    /**
     * Continues the enumeration of voltage outputs started using yFirstVoltageOutput().
     * Caution: You can't make any assumption about the returned voltage outputs order.
     * If you want to find a specific a voltage output, use VoltageOutput.findVoltageOutput()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YVoltageOutput object, corresponding to
     *         a voltage output currently online, or a null pointer
     *         if there are no more voltage outputs to enumerate.
     */
    nextVoltageOutput() {
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != YAPI.SUCCESS)
            return null;
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if (next_hwid == null)
            return null;
        return YVoltageOutput.FindVoltageOutputInContext(this._yapi, next_hwid);
    }
    /**
     * Starts the enumeration of voltage outputs currently accessible.
     * Use the method YVoltageOutput.nextVoltageOutput() to iterate on
     * next voltage outputs.
     *
     * @return a pointer to a YVoltageOutput object, corresponding to
     *         the first voltage output currently online, or a null pointer
     *         if there are none.
     */
    static FirstVoltageOutput() {
        let next_hwid = YAPI.imm_getFirstHardwareId('VoltageOutput');
        if (next_hwid == null)
            return null;
        return YVoltageOutput.FindVoltageOutput(next_hwid);
    }
    /**
     * Starts the enumeration of voltage outputs currently accessible.
     * Use the method YVoltageOutput.nextVoltageOutput() to iterate on
     * next voltage outputs.
     *
     * @param yctx : a YAPI context.
     *
     * @return a pointer to a YVoltageOutput object, corresponding to
     *         the first voltage output currently online, or a null pointer
     *         if there are none.
     */
    static FirstVoltageOutputInContext(yctx) {
        let next_hwid = yctx.imm_getFirstHardwareId('VoltageOutput');
        if (next_hwid == null)
            return null;
        return YVoltageOutput.FindVoltageOutputInContext(yctx, next_hwid);
    }
}
// API symbols as static members
YVoltageOutput.CURRENTVOLTAGE_INVALID = YAPI.INVALID_DOUBLE;
YVoltageOutput.VOLTAGETRANSITION_INVALID = YAPI.INVALID_STRING;
YVoltageOutput.VOLTAGEATSTARTUP_INVALID = YAPI.INVALID_DOUBLE;
//# sourceMappingURL=yocto_voltageoutput.js.map