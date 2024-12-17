/*********************************************************************
 *
 *  $Id: yocto_dualpower.ts 63327 2024-11-13 09:35:03Z seb $
 *
 *  Implements the high-level API for DualPower functions
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
//--- (YDualPower class start)
/**
 * YDualPower Class: dual power switch control interface, available for instance in the Yocto-Servo
 *
 * The YDualPower class allows you to control
 * the power source to use for module functions that require high current.
 * The module can also automatically disconnect the external power
 * when a voltage drop is observed on the external power source
 * (external battery running out of power).
 */
//--- (end of YDualPower class start)
export class YDualPower extends YFunction {
    //--- (end of YDualPower attributes declaration)
    constructor(yapi, func) {
        //--- (YDualPower constructor)
        super(yapi, func);
        this._powerState = YDualPower.POWERSTATE_INVALID;
        this._powerControl = YDualPower.POWERCONTROL_INVALID;
        this._extVoltage = YDualPower.EXTVOLTAGE_INVALID;
        this._valueCallbackDualPower = null;
        // API symbols as object properties
        this.POWERSTATE_OFF = 0;
        this.POWERSTATE_FROM_USB = 1;
        this.POWERSTATE_FROM_EXT = 2;
        this.POWERSTATE_INVALID = -1;
        this.POWERCONTROL_AUTO = 0;
        this.POWERCONTROL_FROM_USB = 1;
        this.POWERCONTROL_FROM_EXT = 2;
        this.POWERCONTROL_OFF = 3;
        this.POWERCONTROL_INVALID = -1;
        this.EXTVOLTAGE_INVALID = YAPI.INVALID_UINT;
        this._className = 'DualPower';
        //--- (end of YDualPower constructor)
    }
    //--- (YDualPower implementation)
    imm_parseAttr(name, val) {
        switch (name) {
            case 'powerState':
                this._powerState = val;
                return 1;
            case 'powerControl':
                this._powerControl = val;
                return 1;
            case 'extVoltage':
                this._extVoltage = val;
                return 1;
        }
        return super.imm_parseAttr(name, val);
    }
    /**
     * Returns the current power source for module functions that require lots of current.
     *
     * @return a value among YDualPower.POWERSTATE_OFF, YDualPower.POWERSTATE_FROM_USB and
     * YDualPower.POWERSTATE_FROM_EXT corresponding to the current power source for module functions that
     * require lots of current
     *
     * On failure, throws an exception or returns YDualPower.POWERSTATE_INVALID.
     */
    async get_powerState() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YDualPower.POWERSTATE_INVALID;
            }
        }
        res = this._powerState;
        return res;
    }
    /**
     * Returns the selected power source for module functions that require lots of current.
     *
     * @return a value among YDualPower.POWERCONTROL_AUTO, YDualPower.POWERCONTROL_FROM_USB,
     * YDualPower.POWERCONTROL_FROM_EXT and YDualPower.POWERCONTROL_OFF corresponding to the selected
     * power source for module functions that require lots of current
     *
     * On failure, throws an exception or returns YDualPower.POWERCONTROL_INVALID.
     */
    async get_powerControl() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YDualPower.POWERCONTROL_INVALID;
            }
        }
        res = this._powerControl;
        return res;
    }
    /**
     * Changes the selected power source for module functions that require lots of current.
     * Remember to call the saveToFlash() method of the module if the modification must be kept.
     *
     * @param newval : a value among YDualPower.POWERCONTROL_AUTO, YDualPower.POWERCONTROL_FROM_USB,
     * YDualPower.POWERCONTROL_FROM_EXT and YDualPower.POWERCONTROL_OFF corresponding to the selected
     * power source for module functions that require lots of current
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_powerControl(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('powerControl', rest_val);
    }
    /**
     * Returns the measured voltage on the external power source, in millivolts.
     *
     * @return an integer corresponding to the measured voltage on the external power source, in millivolts
     *
     * On failure, throws an exception or returns YDualPower.EXTVOLTAGE_INVALID.
     */
    async get_extVoltage() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YDualPower.EXTVOLTAGE_INVALID;
            }
        }
        res = this._extVoltage;
        return res;
    }
    /**
     * Retrieves a dual power switch for a given identifier.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the dual power switch is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YDualPower.isOnline() to test if the dual power switch is
     * indeed online at a given time. In case of ambiguity when looking for
     * a dual power switch by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the dual power switch, for instance
     *         SERVORC1.dualPower.
     *
     * @return a YDualPower object allowing you to drive the dual power switch.
     */
    static FindDualPower(func) {
        let obj;
        obj = YFunction._FindFromCache('DualPower', func);
        if (obj == null) {
            obj = new YDualPower(YAPI, func);
            YFunction._AddToCache('DualPower', func, obj);
        }
        return obj;
    }
    /**
     * Retrieves a dual power switch for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the dual power switch is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YDualPower.isOnline() to test if the dual power switch is
     * indeed online at a given time. In case of ambiguity when looking for
     * a dual power switch by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx : a YAPI context
     * @param func : a string that uniquely characterizes the dual power switch, for instance
     *         SERVORC1.dualPower.
     *
     * @return a YDualPower object allowing you to drive the dual power switch.
     */
    static FindDualPowerInContext(yctx, func) {
        let obj;
        obj = YFunction._FindFromCacheInContext(yctx, 'DualPower', func);
        if (obj == null) {
            obj = new YDualPower(yctx, func);
            YFunction._AddToCache('DualPower', func, obj);
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
        this._valueCallbackDualPower = callback;
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
        if (this._valueCallbackDualPower != null) {
            try {
                await this._valueCallbackDualPower(this, value);
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
     * Continues the enumeration of dual power switches started using yFirstDualPower().
     * Caution: You can't make any assumption about the returned dual power switches order.
     * If you want to find a specific a dual power switch, use DualPower.findDualPower()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YDualPower object, corresponding to
     *         a dual power switch currently online, or a null pointer
     *         if there are no more dual power switches to enumerate.
     */
    nextDualPower() {
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != YAPI.SUCCESS)
            return null;
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if (next_hwid == null)
            return null;
        return YDualPower.FindDualPowerInContext(this._yapi, next_hwid);
    }
    /**
     * Starts the enumeration of dual power switches currently accessible.
     * Use the method YDualPower.nextDualPower() to iterate on
     * next dual power switches.
     *
     * @return a pointer to a YDualPower object, corresponding to
     *         the first dual power switch currently online, or a null pointer
     *         if there are none.
     */
    static FirstDualPower() {
        let next_hwid = YAPI.imm_getFirstHardwareId('DualPower');
        if (next_hwid == null)
            return null;
        return YDualPower.FindDualPower(next_hwid);
    }
    /**
     * Starts the enumeration of dual power switches currently accessible.
     * Use the method YDualPower.nextDualPower() to iterate on
     * next dual power switches.
     *
     * @param yctx : a YAPI context.
     *
     * @return a pointer to a YDualPower object, corresponding to
     *         the first dual power switch currently online, or a null pointer
     *         if there are none.
     */
    static FirstDualPowerInContext(yctx) {
        let next_hwid = yctx.imm_getFirstHardwareId('DualPower');
        if (next_hwid == null)
            return null;
        return YDualPower.FindDualPowerInContext(yctx, next_hwid);
    }
}
// API symbols as static members
YDualPower.POWERSTATE_OFF = 0;
YDualPower.POWERSTATE_FROM_USB = 1;
YDualPower.POWERSTATE_FROM_EXT = 2;
YDualPower.POWERSTATE_INVALID = -1;
YDualPower.POWERCONTROL_AUTO = 0;
YDualPower.POWERCONTROL_FROM_USB = 1;
YDualPower.POWERCONTROL_FROM_EXT = 2;
YDualPower.POWERCONTROL_OFF = 3;
YDualPower.POWERCONTROL_INVALID = -1;
YDualPower.EXTVOLTAGE_INVALID = YAPI.INVALID_UINT;
//# sourceMappingURL=yocto_dualpower.js.map