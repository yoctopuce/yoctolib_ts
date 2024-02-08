"use strict";
/*********************************************************************
 *
 *  $Id: yocto_daisychain.ts 55359 2023-06-28 09:25:04Z seb $
 *
 *  Implements the high-level API for DaisyChain functions
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
exports.YDaisyChain = void 0;
const yocto_api_js_1 = require("./yocto_api.js");
//--- (YDaisyChain class start)
/**
 * YDaisyChain Class: Module chain configuration interface
 *
 * The YDaisyChain class can be used to verify that devices that
 * are daisy-chained directly from device to device, without a hub,
 * are detected properly.
 */
//--- (end of YDaisyChain class start)
class YDaisyChain extends yocto_api_js_1.YFunction {
    //--- (end of YDaisyChain attributes declaration)
    constructor(yapi, func) {
        //--- (YDaisyChain constructor)
        super(yapi, func);
        this._daisyState = YDaisyChain.DAISYSTATE_INVALID;
        this._childCount = YDaisyChain.CHILDCOUNT_INVALID;
        this._requiredChildCount = YDaisyChain.REQUIREDCHILDCOUNT_INVALID;
        this._valueCallbackDaisyChain = null;
        // API symbols as object properties
        this.DAISYSTATE_READY = 0;
        this.DAISYSTATE_IS_CHILD = 1;
        this.DAISYSTATE_FIRMWARE_MISMATCH = 2;
        this.DAISYSTATE_CHILD_MISSING = 3;
        this.DAISYSTATE_CHILD_LOST = 4;
        this.DAISYSTATE_INVALID = -1;
        this.CHILDCOUNT_INVALID = yocto_api_js_1.YAPI.INVALID_UINT;
        this.REQUIREDCHILDCOUNT_INVALID = yocto_api_js_1.YAPI.INVALID_UINT;
        this._className = 'DaisyChain';
        //--- (end of YDaisyChain constructor)
    }
    //--- (YDaisyChain implementation)
    imm_parseAttr(name, val) {
        switch (name) {
            case 'daisyState':
                this._daisyState = val;
                return 1;
            case 'childCount':
                this._childCount = val;
                return 1;
            case 'requiredChildCount':
                this._requiredChildCount = val;
                return 1;
        }
        return super.imm_parseAttr(name, val);
    }
    /**
     * Returns the state of the daisy-link between modules.
     *
     * @return a value among YDaisyChain.DAISYSTATE_READY, YDaisyChain.DAISYSTATE_IS_CHILD,
     * YDaisyChain.DAISYSTATE_FIRMWARE_MISMATCH, YDaisyChain.DAISYSTATE_CHILD_MISSING and
     * YDaisyChain.DAISYSTATE_CHILD_LOST corresponding to the state of the daisy-link between modules
     *
     * On failure, throws an exception or returns YDaisyChain.DAISYSTATE_INVALID.
     */
    async get_daisyState() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YDaisyChain.DAISYSTATE_INVALID;
            }
        }
        res = this._daisyState;
        return res;
    }
    /**
     * Returns the number of child nodes currently detected.
     *
     * @return an integer corresponding to the number of child nodes currently detected
     *
     * On failure, throws an exception or returns YDaisyChain.CHILDCOUNT_INVALID.
     */
    async get_childCount() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YDaisyChain.CHILDCOUNT_INVALID;
            }
        }
        res = this._childCount;
        return res;
    }
    /**
     * Returns the number of child nodes expected in normal conditions.
     *
     * @return an integer corresponding to the number of child nodes expected in normal conditions
     *
     * On failure, throws an exception or returns YDaisyChain.REQUIREDCHILDCOUNT_INVALID.
     */
    async get_requiredChildCount() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YDaisyChain.REQUIREDCHILDCOUNT_INVALID;
            }
        }
        res = this._requiredChildCount;
        return res;
    }
    /**
     * Changes the number of child nodes expected in normal conditions.
     * If the value is zero, no check is performed. If it is non-zero, the number
     * child nodes is checked on startup and the status will change to error if
     * the count does not match. Remember to call the saveToFlash()
     * method of the module if the modification must be kept.
     *
     * @param newval : an integer corresponding to the number of child nodes expected in normal conditions
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_requiredChildCount(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('requiredChildCount', rest_val);
    }
    /**
     * Retrieves a module chain for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the module chain is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YDaisyChain.isOnline() to test if the module chain is
     * indeed online at a given time. In case of ambiguity when looking for
     * a module chain by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the module chain, for instance
     *         MyDevice.daisyChain.
     *
     * @return a YDaisyChain object allowing you to drive the module chain.
     */
    static FindDaisyChain(func) {
        let obj;
        obj = yocto_api_js_1.YFunction._FindFromCache('DaisyChain', func);
        if (obj == null) {
            obj = new YDaisyChain(yocto_api_js_1.YAPI, func);
            yocto_api_js_1.YFunction._AddToCache('DaisyChain', func, obj);
        }
        return obj;
    }
    /**
     * Retrieves a module chain for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the module chain is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YDaisyChain.isOnline() to test if the module chain is
     * indeed online at a given time. In case of ambiguity when looking for
     * a module chain by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx : a YAPI context
     * @param func : a string that uniquely characterizes the module chain, for instance
     *         MyDevice.daisyChain.
     *
     * @return a YDaisyChain object allowing you to drive the module chain.
     */
    static FindDaisyChainInContext(yctx, func) {
        let obj;
        obj = yocto_api_js_1.YFunction._FindFromCacheInContext(yctx, 'DaisyChain', func);
        if (obj == null) {
            obj = new YDaisyChain(yctx, func);
            yocto_api_js_1.YFunction._AddToCache('DaisyChain', func, obj);
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
        this._valueCallbackDaisyChain = callback;
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
        if (this._valueCallbackDaisyChain != null) {
            try {
                await this._valueCallbackDaisyChain(this, value);
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
     * Continues the enumeration of module chains started using yFirstDaisyChain().
     * Caution: You can't make any assumption about the returned module chains order.
     * If you want to find a specific a module chain, use DaisyChain.findDaisyChain()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YDaisyChain object, corresponding to
     *         a module chain currently online, or a null pointer
     *         if there are no more module chains to enumerate.
     */
    nextDaisyChain() {
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != yocto_api_js_1.YAPI.SUCCESS)
            return null;
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if (next_hwid == null)
            return null;
        return YDaisyChain.FindDaisyChainInContext(this._yapi, next_hwid);
    }
    /**
     * Starts the enumeration of module chains currently accessible.
     * Use the method YDaisyChain.nextDaisyChain() to iterate on
     * next module chains.
     *
     * @return a pointer to a YDaisyChain object, corresponding to
     *         the first module chain currently online, or a null pointer
     *         if there are none.
     */
    static FirstDaisyChain() {
        let next_hwid = yocto_api_js_1.YAPI.imm_getFirstHardwareId('DaisyChain');
        if (next_hwid == null)
            return null;
        return YDaisyChain.FindDaisyChain(next_hwid);
    }
    /**
     * Starts the enumeration of module chains currently accessible.
     * Use the method YDaisyChain.nextDaisyChain() to iterate on
     * next module chains.
     *
     * @param yctx : a YAPI context.
     *
     * @return a pointer to a YDaisyChain object, corresponding to
     *         the first module chain currently online, or a null pointer
     *         if there are none.
     */
    static FirstDaisyChainInContext(yctx) {
        let next_hwid = yctx.imm_getFirstHardwareId('DaisyChain');
        if (next_hwid == null)
            return null;
        return YDaisyChain.FindDaisyChainInContext(yctx, next_hwid);
    }
}
exports.YDaisyChain = YDaisyChain;
// API symbols as static members
YDaisyChain.DAISYSTATE_READY = 0;
YDaisyChain.DAISYSTATE_IS_CHILD = 1;
YDaisyChain.DAISYSTATE_FIRMWARE_MISMATCH = 2;
YDaisyChain.DAISYSTATE_CHILD_MISSING = 3;
YDaisyChain.DAISYSTATE_CHILD_LOST = 4;
YDaisyChain.DAISYSTATE_INVALID = -1;
YDaisyChain.CHILDCOUNT_INVALID = yocto_api_js_1.YAPI.INVALID_UINT;
YDaisyChain.REQUIREDCHILDCOUNT_INVALID = yocto_api_js_1.YAPI.INVALID_UINT;
//# sourceMappingURL=yocto_daisychain.js.map