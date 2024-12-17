/*********************************************************************
 *
 *  $Id: yocto_powersupply.ts 63327 2024-11-13 09:35:03Z seb $
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

import { YAPI, YAPIContext, YErrorMsg, YFunction, YModule, YSensor, YDataLogger, YMeasure } from './yocto_api.js';

//--- (YPowerSupply class start)
/**
 * YPowerSupply Class: regulated power supply control interface
 *
 * The YPowerSupply class allows you to drive a Yoctopuce power supply.
 * It can be use to change the voltage and current limits, and to enable/disable
 * the output.
 */
//--- (end of YPowerSupply class start)

export class YPowerSupply extends YFunction
{
    //--- (YPowerSupply attributes declaration)
    _className: string;
    _voltageLimit: number = YPowerSupply.VOLTAGELIMIT_INVALID;
    _currentLimit: number = YPowerSupply.CURRENTLIMIT_INVALID;
    _powerOutput: YPowerSupply.POWEROUTPUT = YPowerSupply.POWEROUTPUT_INVALID;
    _measuredVoltage: number = YPowerSupply.MEASUREDVOLTAGE_INVALID;
    _measuredCurrent: number = YPowerSupply.MEASUREDCURRENT_INVALID;
    _inputVoltage: number = YPowerSupply.INPUTVOLTAGE_INVALID;
    _voltageTransition: string = YPowerSupply.VOLTAGETRANSITION_INVALID;
    _voltageLimitAtStartUp: number = YPowerSupply.VOLTAGELIMITATSTARTUP_INVALID;
    _currentLimitAtStartUp: number = YPowerSupply.CURRENTLIMITATSTARTUP_INVALID;
    _powerOutputAtStartUp: YPowerSupply.POWEROUTPUTATSTARTUP = YPowerSupply.POWEROUTPUTATSTARTUP_INVALID;
    _command: string = YPowerSupply.COMMAND_INVALID;
    _valueCallbackPowerSupply: YPowerSupply.ValueCallback | null = null;

    // API symbols as object properties
    public readonly VOLTAGELIMIT_INVALID: number = YAPI.INVALID_DOUBLE;
    public readonly CURRENTLIMIT_INVALID: number = YAPI.INVALID_DOUBLE;
    public readonly POWEROUTPUT_OFF: YPowerSupply.POWEROUTPUT = 0;
    public readonly POWEROUTPUT_ON: YPowerSupply.POWEROUTPUT = 1;
    public readonly POWEROUTPUT_INVALID: YPowerSupply.POWEROUTPUT = -1;
    public readonly MEASUREDVOLTAGE_INVALID: number = YAPI.INVALID_DOUBLE;
    public readonly MEASUREDCURRENT_INVALID: number = YAPI.INVALID_DOUBLE;
    public readonly INPUTVOLTAGE_INVALID: number = YAPI.INVALID_DOUBLE;
    public readonly VOLTAGETRANSITION_INVALID: string = YAPI.INVALID_STRING;
    public readonly VOLTAGELIMITATSTARTUP_INVALID: number = YAPI.INVALID_DOUBLE;
    public readonly CURRENTLIMITATSTARTUP_INVALID: number = YAPI.INVALID_DOUBLE;
    public readonly POWEROUTPUTATSTARTUP_OFF: YPowerSupply.POWEROUTPUTATSTARTUP = 0;
    public readonly POWEROUTPUTATSTARTUP_ON: YPowerSupply.POWEROUTPUTATSTARTUP = 1;
    public readonly POWEROUTPUTATSTARTUP_INVALID: YPowerSupply.POWEROUTPUTATSTARTUP = -1;
    public readonly COMMAND_INVALID: string = YAPI.INVALID_STRING;

    // API symbols as static members
    public static readonly VOLTAGELIMIT_INVALID: number = YAPI.INVALID_DOUBLE;
    public static readonly CURRENTLIMIT_INVALID: number = YAPI.INVALID_DOUBLE;
    public static readonly POWEROUTPUT_OFF: YPowerSupply.POWEROUTPUT = 0;
    public static readonly POWEROUTPUT_ON: YPowerSupply.POWEROUTPUT = 1;
    public static readonly POWEROUTPUT_INVALID: YPowerSupply.POWEROUTPUT = -1;
    public static readonly MEASUREDVOLTAGE_INVALID: number = YAPI.INVALID_DOUBLE;
    public static readonly MEASUREDCURRENT_INVALID: number = YAPI.INVALID_DOUBLE;
    public static readonly INPUTVOLTAGE_INVALID: number = YAPI.INVALID_DOUBLE;
    public static readonly VOLTAGETRANSITION_INVALID: string = YAPI.INVALID_STRING;
    public static readonly VOLTAGELIMITATSTARTUP_INVALID: number = YAPI.INVALID_DOUBLE;
    public static readonly CURRENTLIMITATSTARTUP_INVALID: number = YAPI.INVALID_DOUBLE;
    public static readonly POWEROUTPUTATSTARTUP_OFF: YPowerSupply.POWEROUTPUTATSTARTUP = 0;
    public static readonly POWEROUTPUTATSTARTUP_ON: YPowerSupply.POWEROUTPUTATSTARTUP = 1;
    public static readonly POWEROUTPUTATSTARTUP_INVALID: YPowerSupply.POWEROUTPUTATSTARTUP = -1;
    public static readonly COMMAND_INVALID: string = YAPI.INVALID_STRING;
    //--- (end of YPowerSupply attributes declaration)

    constructor(yapi: YAPIContext, func: string)
    {
        //--- (YPowerSupply constructor)
        super(yapi, func);
        this._className                  = 'PowerSupply';
        //--- (end of YPowerSupply constructor)
    }

    //--- (YPowerSupply implementation)

    imm_parseAttr(name: string, val: any): number
    {
        switch (name) {
        case 'voltageLimit':
            this._voltageLimit = <number> Math.round(<number>val / 65.536) / 1000.0;
            return 1;
        case 'currentLimit':
            this._currentLimit = <number> Math.round(<number>val / 65.536) / 1000.0;
            return 1;
        case 'powerOutput':
            this._powerOutput = <YPowerSupply.POWEROUTPUT> <number> val;
            return 1;
        case 'measuredVoltage':
            this._measuredVoltage = <number> Math.round(<number>val / 65.536) / 1000.0;
            return 1;
        case 'measuredCurrent':
            this._measuredCurrent = <number> Math.round(<number>val / 65.536) / 1000.0;
            return 1;
        case 'inputVoltage':
            this._inputVoltage = <number> Math.round(<number>val / 65.536) / 1000.0;
            return 1;
        case 'voltageTransition':
            this._voltageTransition = <string> <string> val;
            return 1;
        case 'voltageLimitAtStartUp':
            this._voltageLimitAtStartUp = <number> Math.round(<number>val / 65.536) / 1000.0;
            return 1;
        case 'currentLimitAtStartUp':
            this._currentLimitAtStartUp = <number> Math.round(<number>val / 65.536) / 1000.0;
            return 1;
        case 'powerOutputAtStartUp':
            this._powerOutputAtStartUp = <YPowerSupply.POWEROUTPUTATSTARTUP> <number> val;
            return 1;
        case 'command':
            this._command = <string> <string> val;
            return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Changes the voltage limit, in V.
     *
     * @param newval : a floating point number corresponding to the voltage limit, in V
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_voltageLimit(newval: number): Promise<number>
    {
        let rest_val: string;
        rest_val = String(Math.round(newval * 65536.0));
        return await this._setAttr('voltageLimit', rest_val);
    }

    /**
     * Returns the voltage limit, in V.
     *
     * @return a floating point number corresponding to the voltage limit, in V
     *
     * On failure, throws an exception or returns YPowerSupply.VOLTAGELIMIT_INVALID.
     */
    async get_voltageLimit(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YPowerSupply.VOLTAGELIMIT_INVALID;
            }
        }
        res = this._voltageLimit;
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
    async set_currentLimit(newval: number): Promise<number>
    {
        let rest_val: string;
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
    async get_currentLimit(): Promise<number>
    {
        let res: number;
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
    async get_powerOutput(): Promise<YPowerSupply.POWEROUTPUT>
    {
        let res: number;
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
    async set_powerOutput(newval: YPowerSupply.POWEROUTPUT): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('powerOutput', rest_val);
    }

    /**
     * Returns the measured output voltage, in V.
     *
     * @return a floating point number corresponding to the measured output voltage, in V
     *
     * On failure, throws an exception or returns YPowerSupply.MEASUREDVOLTAGE_INVALID.
     */
    async get_measuredVoltage(): Promise<number>
    {
        let res: number;
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
    async get_measuredCurrent(): Promise<number>
    {
        let res: number;
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
    async get_inputVoltage(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YPowerSupply.INPUTVOLTAGE_INVALID;
            }
        }
        res = this._inputVoltage;
        return res;
    }

    async get_voltageTransition(): Promise<string>
    {
        let res: string;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YPowerSupply.VOLTAGETRANSITION_INVALID;
            }
        }
        res = this._voltageTransition;
        return res;
    }

    async set_voltageTransition(newval: string): Promise<number>
    {
        let rest_val: string;
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
    async set_voltageLimitAtStartUp(newval: number): Promise<number>
    {
        let rest_val: string;
        rest_val = String(Math.round(newval * 65536.0));
        return await this._setAttr('voltageLimitAtStartUp', rest_val);
    }

    /**
     * Returns the selected voltage limit at device startup, in V.
     *
     * @return a floating point number corresponding to the selected voltage limit at device startup, in V
     *
     * On failure, throws an exception or returns YPowerSupply.VOLTAGELIMITATSTARTUP_INVALID.
     */
    async get_voltageLimitAtStartUp(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YPowerSupply.VOLTAGELIMITATSTARTUP_INVALID;
            }
        }
        res = this._voltageLimitAtStartUp;
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
    async set_currentLimitAtStartUp(newval: number): Promise<number>
    {
        let rest_val: string;
        rest_val = String(Math.round(newval * 65536.0));
        return await this._setAttr('currentLimitAtStartUp', rest_val);
    }

    /**
     * Returns the selected current limit at device startup, in mA.
     *
     * @return a floating point number corresponding to the selected current limit at device startup, in mA
     *
     * On failure, throws an exception or returns YPowerSupply.CURRENTLIMITATSTARTUP_INVALID.
     */
    async get_currentLimitAtStartUp(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YPowerSupply.CURRENTLIMITATSTARTUP_INVALID;
            }
        }
        res = this._currentLimitAtStartUp;
        return res;
    }

    /**
     * Returns the power supply output switch state.
     *
     * @return either YPowerSupply.POWEROUTPUTATSTARTUP_OFF or YPowerSupply.POWEROUTPUTATSTARTUP_ON,
     * according to the power supply output switch state
     *
     * On failure, throws an exception or returns YPowerSupply.POWEROUTPUTATSTARTUP_INVALID.
     */
    async get_powerOutputAtStartUp(): Promise<YPowerSupply.POWEROUTPUTATSTARTUP>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YPowerSupply.POWEROUTPUTATSTARTUP_INVALID;
            }
        }
        res = this._powerOutputAtStartUp;
        return res;
    }

    /**
     * Changes the power supply output switch state at device start up. Remember to call the matching
     * module saveToFlash() method, otherwise this call has no effect.
     *
     * @param newval : either YPowerSupply.POWEROUTPUTATSTARTUP_OFF or
     * YPowerSupply.POWEROUTPUTATSTARTUP_ON, according to the power supply output switch state at device start up
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_powerOutputAtStartUp(newval: YPowerSupply.POWEROUTPUTATSTARTUP): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('powerOutputAtStartUp', rest_val);
    }

    async get_command(): Promise<string>
    {
        let res: string;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YPowerSupply.COMMAND_INVALID;
            }
        }
        res = this._command;
        return res;
    }

    async set_command(newval: string): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('command', rest_val);
    }

    /**
     * Retrieves a regulated power supply for a given identifier.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
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
    static FindPowerSupply(func: string): YPowerSupply
    {
        let obj: YPowerSupply | null;
        obj = <YPowerSupply> YFunction._FindFromCache('PowerSupply', func);
        if (obj == null) {
            obj = new YPowerSupply(YAPI, func);
            YFunction._AddToCache('PowerSupply', func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a regulated power supply for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
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
    static FindPowerSupplyInContext(yctx: YAPIContext, func: string): YPowerSupply
    {
        let obj: YPowerSupply | null;
        obj = <YPowerSupply> YFunction._FindFromCacheInContext(yctx, 'PowerSupply', func);
        if (obj == null) {
            obj = new YPowerSupply(yctx, func);
            YFunction._AddToCache('PowerSupply', func, obj);
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
    async registerValueCallback(callback: YPowerSupply.ValueCallback | null): Promise<number>
    {
        let val: string;
        if (callback != null) {
            await YFunction._UpdateValueCallbackList(this, true);
        } else {
            await YFunction._UpdateValueCallbackList(this, false);
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

    async _invokeValueCallback(value: string): Promise<number>
    {
        if (this._valueCallbackPowerSupply != null) {
            try {
                await this._valueCallbackPowerSupply(this, value);
            } catch (e) {
                this._yapi.imm_log('Exception in valueCallback:', e);
            }
        } else {
            await super._invokeValueCallback(value);
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
    async voltageMove(V_target: number, ms_duration: number): Promise<number>
    {
        let newval: string;
        if (V_target < 0.0) {
            V_target  = 0.0;
        }
        newval = String(Math.round(<number> Math.round(V_target*65536))) + ':' + String(Math.round(ms_duration));

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
    nextPowerSupply(): YPowerSupply | null
    {
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != YAPI.SUCCESS) return null;
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, <string> resolve.result);
        if (next_hwid == null) return null;
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
    static FirstPowerSupply(): YPowerSupply | null
    {
        let next_hwid = YAPI.imm_getFirstHardwareId('PowerSupply');
        if (next_hwid == null) return null;
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
    static FirstPowerSupplyInContext(yctx: YAPIContext): YPowerSupply | null
    {
        let next_hwid = yctx.imm_getFirstHardwareId('PowerSupply');
        if (next_hwid == null) return null;
        return YPowerSupply.FindPowerSupplyInContext(yctx, next_hwid);
    }

    //--- (end of YPowerSupply implementation)
}

export namespace YPowerSupply {
    //--- (YPowerSupply definitions)
    export const enum POWEROUTPUT
    {
        OFF = 0,
        ON = 1,
        INVALID = -1
    }

    export const enum POWEROUTPUTATSTARTUP
    {
        OFF = 0,
        ON = 1,
        INVALID = -1
    }

    export interface ValueCallback {(func: YPowerSupply, value: string): void}

    //--- (end of YPowerSupply definitions)
}

