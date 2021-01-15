/*********************************************************************
 *
 *  $Id: svn_id $
 *
 *  Implements the high-level API for CurrentLoopOutput functions
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
//--- (end of YCurrentLoopOutput definitions)
//--- (YCurrentLoopOutput class start)
/**
 * YCurrentLoopOutput Class: 4-20mA output control interface, available for instance in the Yocto-4-20mA-Tx
 *
 * The YCurrentLoopOutput class allows you to drive a 4-20mA output
 * by regulating the current flowing through the current loop.
 * It can also provide information about the power state of the current loop.
 */
//--- (end of YCurrentLoopOutput class start)
export class YCurrentLoopOutput extends YFunction {
    //--- (end of YCurrentLoopOutput attributes declaration)
    //--- (YCurrentLoopOutput return codes)
    //--- (end of YCurrentLoopOutput return codes)
    constructor(yapi, func) {
        //--- (YCurrentLoopOutput constructor)
        super(yapi, func);
        this._current = YCurrentLoopOutput.CURRENT_INVALID;
        this._currentTransition = YCurrentLoopOutput.CURRENTTRANSITION_INVALID;
        this._currentAtStartUp = YCurrentLoopOutput.CURRENTATSTARTUP_INVALID;
        this._loopPower = YCurrentLoopOutput.LOOPPOWER_INVALID;
        this._valueCallbackCurrentLoopOutput = null;
        // API symbols as object properties
        this.CURRENT_INVALID = YAPI.INVALID_DOUBLE;
        this.CURRENTTRANSITION_INVALID = YAPI.INVALID_STRING;
        this.CURRENTATSTARTUP_INVALID = YAPI.INVALID_DOUBLE;
        this.LOOPPOWER_NOPWR = 0 /* NOPWR */;
        this.LOOPPOWER_LOWPWR = 1 /* LOWPWR */;
        this.LOOPPOWER_POWEROK = 2 /* POWEROK */;
        this.LOOPPOWER_INVALID = -1 /* INVALID */;
        this._className = 'CurrentLoopOutput';
        //--- (end of YCurrentLoopOutput constructor)
    }
    //--- (YCurrentLoopOutput implementation)
    imm_parseAttr(name, val) {
        switch (name) {
            case 'current':
                this._current = Math.round(val * 1000.0 / 65536.0) / 1000.0;
                return 1;
            case 'currentTransition':
                this._currentTransition = val;
                return 1;
            case 'currentAtStartUp':
                this._currentAtStartUp = Math.round(val * 1000.0 / 65536.0) / 1000.0;
                return 1;
            case 'loopPower':
                this._loopPower = val;
                return 1;
        }
        return super.imm_parseAttr(name, val);
    }
    /**
     * Changes the current loop, the valid range is from 3 to 21mA. If the loop is
     * not properly powered, the  target current is not reached and
     * loopPower is set to LOWPWR.
     *
     * @param newval : a floating point number corresponding to the current loop, the valid range is from 3 to 21mA
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_current(newval) {
        let rest_val;
        rest_val = String(Math.round(newval * 65536.0));
        return await this._setAttr('current', rest_val);
    }
    /**
     * Returns the loop current set point in mA.
     *
     * @return a floating point number corresponding to the loop current set point in mA
     *
     * On failure, throws an exception or returns Y_CURRENT_INVALID.
     */
    async get_current() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YCurrentLoopOutput.CURRENT_INVALID;
            }
        }
        res = this._current;
        return res;
    }
    async get_currentTransition() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YCurrentLoopOutput.CURRENTTRANSITION_INVALID;
            }
        }
        res = this._currentTransition;
        return res;
    }
    async set_currentTransition(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('currentTransition', rest_val);
    }
    /**
     * Changes the loop current at device start up. Remember to call the matching
     * module saveToFlash() method, otherwise this call has no effect.
     *
     * @param newval : a floating point number corresponding to the loop current at device start up
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_currentAtStartUp(newval) {
        let rest_val;
        rest_val = String(Math.round(newval * 65536.0));
        return await this._setAttr('currentAtStartUp', rest_val);
    }
    /**
     * Returns the current in the loop at device startup, in mA.
     *
     * @return a floating point number corresponding to the current in the loop at device startup, in mA
     *
     * On failure, throws an exception or returns Y_CURRENTATSTARTUP_INVALID.
     */
    async get_currentAtStartUp() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YCurrentLoopOutput.CURRENTATSTARTUP_INVALID;
            }
        }
        res = this._currentAtStartUp;
        return res;
    }
    /**
     * Returns the loop powerstate.  POWEROK: the loop
     * is powered. NOPWR: the loop in not powered. LOWPWR: the loop is not
     * powered enough to maintain the current required (insufficient voltage).
     *
     * @return a value among Y_LOOPPOWER_NOPWR, Y_LOOPPOWER_LOWPWR and Y_LOOPPOWER_POWEROK corresponding
     * to the loop powerstate
     *
     * On failure, throws an exception or returns Y_LOOPPOWER_INVALID.
     */
    async get_loopPower() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YCurrentLoopOutput.LOOPPOWER_INVALID;
            }
        }
        res = this._loopPower;
        return res;
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
     * Use the method YCurrentLoopOutput.isOnline() to test if $THEFUNCTION$ is
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
     * @return a YCurrentLoopOutput object allowing you to drive $THEFUNCTION$.
     */
    static FindCurrentLoopOutput(func) {
        let obj;
        obj = YFunction._FindFromCache('CurrentLoopOutput', func);
        if (obj == null) {
            obj = new YCurrentLoopOutput(YAPI, func);
            YFunction._AddToCache('CurrentLoopOutput', func, obj);
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
     * Use the method YCurrentLoopOutput.isOnline() to test if $THEFUNCTION$ is
     * indeed online at a given time. In case of ambiguity when looking for
     * $AFUNCTION$ by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx : a YAPI context
     * @param func : a string that uniquely characterizes $THEFUNCTION$, for instance
     *         $FULLHARDWAREID$.
     *
     * @return a YCurrentLoopOutput object allowing you to drive $THEFUNCTION$.
     */
    static FindCurrentLoopOutputInContext(yctx, func) {
        let obj;
        obj = YFunction._FindFromCacheInContext(yctx, 'CurrentLoopOutput', func);
        if (obj == null) {
            obj = new YCurrentLoopOutput(yctx, func);
            YFunction._AddToCache('CurrentLoopOutput', func, obj);
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
        this._valueCallbackCurrentLoopOutput = callback;
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
        if (this._valueCallbackCurrentLoopOutput != null) {
            try {
                await this._valueCallbackCurrentLoopOutput(this, value);
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
     * Performs a smooth transition of current flowing in the loop. Any current explicit
     * change cancels any ongoing transition process.
     *
     * @param mA_target   : new current value at the end of the transition
     *         (floating-point number, representing the end current in mA)
     * @param ms_duration : total duration of the transition, in milliseconds
     *
     * @return YAPI_SUCCESS when the call succeeds.
     */
    async currentMove(mA_target, ms_duration) {
        let newval;
        if (mA_target < 3.0) {
            mA_target = 3.0;
        }
        if (mA_target > 21.0) {
            mA_target = 21.0;
        }
        newval = String(Math.round(Math.round(mA_target * 65536))) + ':' + String(Math.round(ms_duration));
        return await this.set_currentTransition(newval);
    }
    /**
     * Returns the next CurrentLoopOutput
     *
     * @returns {YCurrentLoopOutput}
     */
    nextCurrentLoopOutput() {
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != YAPI.SUCCESS)
            return null;
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if (next_hwid == null)
            return null;
        return YCurrentLoopOutput.FindCurrentLoopOutputInContext(this._yapi, next_hwid);
    }
    /**
     * Retrieves the first CurrentLoopOutput in a YAPI context
     *
     * @returns {YCurrentLoopOutput}
     */
    static FirstCurrentLoopOutput() {
        let next_hwid = YAPI.imm_getFirstHardwareId('CurrentLoopOutput');
        if (next_hwid == null)
            return null;
        return YCurrentLoopOutput.FindCurrentLoopOutput(next_hwid);
    }
    /**
     * Retrieves the first CurrentLoopOutput in a given context
     *
     * @param yctx {YAPIContext}
     *
     * @returns {YCurrentLoopOutput}
     */
    static FirstCurrentLoopOutputInContext(yctx) {
        let next_hwid = yctx.imm_getFirstHardwareId('CurrentLoopOutput');
        if (next_hwid == null)
            return null;
        return YCurrentLoopOutput.FindCurrentLoopOutputInContext(yctx, next_hwid);
    }
}
// API symbols as static members
YCurrentLoopOutput.CURRENT_INVALID = YAPI.INVALID_DOUBLE;
YCurrentLoopOutput.CURRENTTRANSITION_INVALID = YAPI.INVALID_STRING;
YCurrentLoopOutput.CURRENTATSTARTUP_INVALID = YAPI.INVALID_DOUBLE;
YCurrentLoopOutput.LOOPPOWER_NOPWR = 0 /* NOPWR */;
YCurrentLoopOutput.LOOPPOWER_LOWPWR = 1 /* LOWPWR */;
YCurrentLoopOutput.LOOPPOWER_POWEROK = 2 /* POWEROK */;
YCurrentLoopOutput.LOOPPOWER_INVALID = -1 /* INVALID */;
//# sourceMappingURL=yocto_currentloopoutput.js.map