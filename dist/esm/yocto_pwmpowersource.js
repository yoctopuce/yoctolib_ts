/*********************************************************************
 *
 *  $Id: yocto_pwmpowersource.ts 59977 2024-03-18 15:02:32Z mvuilleu $
 *
 *  Implements the high-level API for PwmPowerSource functions
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
//--- (YPwmPowerSource class start)
/**
 * YPwmPowerSource Class: PWM generator power source control interface, available for instance in the Yocto-PWM-Tx
 *
 * The YPwmPowerSource class allows you to configure
 * the voltage source used by all PWM outputs on the same device.
 */
//--- (end of YPwmPowerSource class start)
export class YPwmPowerSource extends YFunction {
    //--- (end of YPwmPowerSource attributes declaration)
    constructor(yapi, func) {
        //--- (YPwmPowerSource constructor)
        super(yapi, func);
        this._powerMode = YPwmPowerSource.POWERMODE_INVALID;
        this._valueCallbackPwmPowerSource = null;
        // API symbols as object properties
        this.POWERMODE_USB_5V = 0;
        this.POWERMODE_USB_3V = 1;
        this.POWERMODE_EXT_V = 2;
        this.POWERMODE_OPNDRN = 3;
        this.POWERMODE_INVALID = -1;
        this._className = 'PwmPowerSource';
        //--- (end of YPwmPowerSource constructor)
    }
    //--- (YPwmPowerSource implementation)
    imm_parseAttr(name, val) {
        switch (name) {
            case 'powerMode':
                this._powerMode = val;
                return 1;
        }
        return super.imm_parseAttr(name, val);
    }
    /**
     * Returns the selected power source for the PWM on the same device.
     *
     * @return a value among YPwmPowerSource.POWERMODE_USB_5V, YPwmPowerSource.POWERMODE_USB_3V,
     * YPwmPowerSource.POWERMODE_EXT_V and YPwmPowerSource.POWERMODE_OPNDRN corresponding to the selected
     * power source for the PWM on the same device
     *
     * On failure, throws an exception or returns YPwmPowerSource.POWERMODE_INVALID.
     */
    async get_powerMode() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YPwmPowerSource.POWERMODE_INVALID;
            }
        }
        res = this._powerMode;
        return res;
    }
    /**
     * Changes  the PWM power source. PWM can use isolated 5V from USB, isolated 3V from USB or
     * voltage from an external power source. The PWM can also work in open drain  mode. In that
     * mode, the PWM actively pulls the line down.
     * Warning: this setting is common to all PWM on the same device. If you change that parameter,
     * all PWM located on the same device are  affected.
     * If you want the change to be kept after a device reboot, make sure  to call the matching
     * module saveToFlash().
     *
     * @param newval : a value among YPwmPowerSource.POWERMODE_USB_5V, YPwmPowerSource.POWERMODE_USB_3V,
     * YPwmPowerSource.POWERMODE_EXT_V and YPwmPowerSource.POWERMODE_OPNDRN corresponding to  the PWM power source
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_powerMode(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('powerMode', rest_val);
    }
    /**
     * Retrieves a PWM generator power source for a given identifier.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the PWM generator power source is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YPwmPowerSource.isOnline() to test if the PWM generator power source is
     * indeed online at a given time. In case of ambiguity when looking for
     * a PWM generator power source by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the PWM generator power source, for instance
     *         YPWMTX01.pwmPowerSource.
     *
     * @return a YPwmPowerSource object allowing you to drive the PWM generator power source.
     */
    static FindPwmPowerSource(func) {
        let obj;
        obj = YFunction._FindFromCache('PwmPowerSource', func);
        if (obj == null) {
            obj = new YPwmPowerSource(YAPI, func);
            YFunction._AddToCache('PwmPowerSource', func, obj);
        }
        return obj;
    }
    /**
     * Retrieves a PWM generator power source for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the PWM generator power source is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YPwmPowerSource.isOnline() to test if the PWM generator power source is
     * indeed online at a given time. In case of ambiguity when looking for
     * a PWM generator power source by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx : a YAPI context
     * @param func : a string that uniquely characterizes the PWM generator power source, for instance
     *         YPWMTX01.pwmPowerSource.
     *
     * @return a YPwmPowerSource object allowing you to drive the PWM generator power source.
     */
    static FindPwmPowerSourceInContext(yctx, func) {
        let obj;
        obj = YFunction._FindFromCacheInContext(yctx, 'PwmPowerSource', func);
        if (obj == null) {
            obj = new YPwmPowerSource(yctx, func);
            YFunction._AddToCache('PwmPowerSource', func, obj);
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
        this._valueCallbackPwmPowerSource = callback;
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
        if (this._valueCallbackPwmPowerSource != null) {
            try {
                await this._valueCallbackPwmPowerSource(this, value);
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
     * Continues the enumeration of PWM generator power sources started using yFirstPwmPowerSource().
     * Caution: You can't make any assumption about the returned PWM generator power sources order.
     * If you want to find a specific a PWM generator power source, use PwmPowerSource.findPwmPowerSource()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YPwmPowerSource object, corresponding to
     *         a PWM generator power source currently online, or a null pointer
     *         if there are no more PWM generator power sources to enumerate.
     */
    nextPwmPowerSource() {
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != YAPI.SUCCESS)
            return null;
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if (next_hwid == null)
            return null;
        return YPwmPowerSource.FindPwmPowerSourceInContext(this._yapi, next_hwid);
    }
    /**
     * Starts the enumeration of PWM generator power sources currently accessible.
     * Use the method YPwmPowerSource.nextPwmPowerSource() to iterate on
     * next PWM generator power sources.
     *
     * @return a pointer to a YPwmPowerSource object, corresponding to
     *         the first PWM generator power source currently online, or a null pointer
     *         if there are none.
     */
    static FirstPwmPowerSource() {
        let next_hwid = YAPI.imm_getFirstHardwareId('PwmPowerSource');
        if (next_hwid == null)
            return null;
        return YPwmPowerSource.FindPwmPowerSource(next_hwid);
    }
    /**
     * Starts the enumeration of PWM generator power sources currently accessible.
     * Use the method YPwmPowerSource.nextPwmPowerSource() to iterate on
     * next PWM generator power sources.
     *
     * @param yctx : a YAPI context.
     *
     * @return a pointer to a YPwmPowerSource object, corresponding to
     *         the first PWM generator power source currently online, or a null pointer
     *         if there are none.
     */
    static FirstPwmPowerSourceInContext(yctx) {
        let next_hwid = yctx.imm_getFirstHardwareId('PwmPowerSource');
        if (next_hwid == null)
            return null;
        return YPwmPowerSource.FindPwmPowerSourceInContext(yctx, next_hwid);
    }
}
// API symbols as static members
YPwmPowerSource.POWERMODE_USB_5V = 0;
YPwmPowerSource.POWERMODE_USB_3V = 1;
YPwmPowerSource.POWERMODE_EXT_V = 2;
YPwmPowerSource.POWERMODE_OPNDRN = 3;
YPwmPowerSource.POWERMODE_INVALID = -1;
//# sourceMappingURL=yocto_pwmpowersource.js.map