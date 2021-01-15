"use strict";
/*********************************************************************
 *
 *  $Id: svn_id $
 *
 *  Implements the high-level API for AudioIn functions
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
exports.YAudioIn = void 0;
const yocto_api_js_1 = require("./yocto_api.js");
//--- (end of YAudioIn definitions)
//--- (YAudioIn class start)
/**
 * YAudioIn Class: audio input control interface
 *
 * The YAudioIn class allows you to configure the volume of an audio input.
 */
//--- (end of YAudioIn class start)
class YAudioIn extends yocto_api_js_1.YFunction {
    //--- (end of YAudioIn attributes declaration)
    //--- (YAudioIn return codes)
    //--- (end of YAudioIn return codes)
    constructor(yapi, func) {
        //--- (YAudioIn constructor)
        super(yapi, func);
        this._volume = YAudioIn.VOLUME_INVALID;
        this._mute = YAudioIn.MUTE_INVALID;
        this._volumeRange = YAudioIn.VOLUMERANGE_INVALID;
        this._signal = YAudioIn.SIGNAL_INVALID;
        this._noSignalFor = YAudioIn.NOSIGNALFOR_INVALID;
        this._valueCallbackAudioIn = null;
        // API symbols as object properties
        this.VOLUME_INVALID = yocto_api_js_1.YAPI.INVALID_UINT;
        this.MUTE_FALSE = 0 /* FALSE */;
        this.MUTE_TRUE = 1 /* TRUE */;
        this.MUTE_INVALID = -1 /* INVALID */;
        this.VOLUMERANGE_INVALID = yocto_api_js_1.YAPI.INVALID_STRING;
        this.SIGNAL_INVALID = yocto_api_js_1.YAPI.INVALID_INT;
        this.NOSIGNALFOR_INVALID = yocto_api_js_1.YAPI.INVALID_INT;
        this._className = 'AudioIn';
        //--- (end of YAudioIn constructor)
    }
    //--- (YAudioIn implementation)
    imm_parseAttr(name, val) {
        switch (name) {
            case 'volume':
                this._volume = val;
                return 1;
            case 'mute':
                this._mute = val;
                return 1;
            case 'volumeRange':
                this._volumeRange = val;
                return 1;
            case 'signal':
                this._signal = val;
                return 1;
            case 'noSignalFor':
                this._noSignalFor = val;
                return 1;
        }
        return super.imm_parseAttr(name, val);
    }
    /**
     * Returns audio input gain, in per cents.
     *
     * @return an integer corresponding to audio input gain, in per cents
     *
     * On failure, throws an exception or returns Y_VOLUME_INVALID.
     */
    async get_volume() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YAudioIn.VOLUME_INVALID;
            }
        }
        res = this._volume;
        return res;
    }
    /**
     * Changes audio input gain, in per cents.
     * Remember to call the saveToFlash()
     * method of the module if the modification must be kept.
     *
     * @param newval : an integer corresponding to audio input gain, in per cents
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_volume(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('volume', rest_val);
    }
    /**
     * Returns the state of the mute function.
     *
     * @return either Y_MUTE_FALSE or Y_MUTE_TRUE, according to the state of the mute function
     *
     * On failure, throws an exception or returns Y_MUTE_INVALID.
     */
    async get_mute() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YAudioIn.MUTE_INVALID;
            }
        }
        res = this._mute;
        return res;
    }
    /**
     * Changes the state of the mute function. Remember to call the matching module
     * saveToFlash() method to save the setting permanently.
     *
     * @param newval : either Y_MUTE_FALSE or Y_MUTE_TRUE, according to the state of the mute function
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_mute(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('mute', rest_val);
    }
    /**
     * Returns the supported volume range. The low value of the
     * range corresponds to the minimal audible value. To
     * completely mute the sound, use set_mute()
     * instead of the set_volume().
     *
     * @return a string corresponding to the supported volume range
     *
     * On failure, throws an exception or returns Y_VOLUMERANGE_INVALID.
     */
    async get_volumeRange() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YAudioIn.VOLUMERANGE_INVALID;
            }
        }
        res = this._volumeRange;
        return res;
    }
    /**
     * Returns the detected input signal level.
     *
     * @return an integer corresponding to the detected input signal level
     *
     * On failure, throws an exception or returns Y_SIGNAL_INVALID.
     */
    async get_signal() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YAudioIn.SIGNAL_INVALID;
            }
        }
        res = this._signal;
        return res;
    }
    /**
     * Returns the number of seconds elapsed without detecting a signal.
     *
     * @return an integer corresponding to the number of seconds elapsed without detecting a signal
     *
     * On failure, throws an exception or returns Y_NOSIGNALFOR_INVALID.
     */
    async get_noSignalFor() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YAudioIn.NOSIGNALFOR_INVALID;
            }
        }
        res = this._noSignalFor;
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
     * Use the method YAudioIn.isOnline() to test if $THEFUNCTION$ is
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
     * @return a YAudioIn object allowing you to drive $THEFUNCTION$.
     */
    static FindAudioIn(func) {
        let obj;
        obj = yocto_api_js_1.YFunction._FindFromCache('AudioIn', func);
        if (obj == null) {
            obj = new YAudioIn(yocto_api_js_1.YAPI, func);
            yocto_api_js_1.YFunction._AddToCache('AudioIn', func, obj);
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
     * Use the method YAudioIn.isOnline() to test if $THEFUNCTION$ is
     * indeed online at a given time. In case of ambiguity when looking for
     * $AFUNCTION$ by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx : a YAPI context
     * @param func : a string that uniquely characterizes $THEFUNCTION$, for instance
     *         $FULLHARDWAREID$.
     *
     * @return a YAudioIn object allowing you to drive $THEFUNCTION$.
     */
    static FindAudioInInContext(yctx, func) {
        let obj;
        obj = yocto_api_js_1.YFunction._FindFromCacheInContext(yctx, 'AudioIn', func);
        if (obj == null) {
            obj = new YAudioIn(yctx, func);
            yocto_api_js_1.YFunction._AddToCache('AudioIn', func, obj);
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
        this._valueCallbackAudioIn = callback;
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
        if (this._valueCallbackAudioIn != null) {
            try {
                await this._valueCallbackAudioIn(this, value);
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
     * Returns the next AudioIn
     *
     * @returns {YAudioIn}
     */
    nextAudioIn() {
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != yocto_api_js_1.YAPI.SUCCESS)
            return null;
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if (next_hwid == null)
            return null;
        return YAudioIn.FindAudioInInContext(this._yapi, next_hwid);
    }
    /**
     * Retrieves the first AudioIn in a YAPI context
     *
     * @returns {YAudioIn}
     */
    static FirstAudioIn() {
        let next_hwid = yocto_api_js_1.YAPI.imm_getFirstHardwareId('AudioIn');
        if (next_hwid == null)
            return null;
        return YAudioIn.FindAudioIn(next_hwid);
    }
    /**
     * Retrieves the first AudioIn in a given context
     *
     * @param yctx {YAPIContext}
     *
     * @returns {YAudioIn}
     */
    static FirstAudioInInContext(yctx) {
        let next_hwid = yctx.imm_getFirstHardwareId('AudioIn');
        if (next_hwid == null)
            return null;
        return YAudioIn.FindAudioInInContext(yctx, next_hwid);
    }
}
exports.YAudioIn = YAudioIn;
// API symbols as static members
YAudioIn.VOLUME_INVALID = yocto_api_js_1.YAPI.INVALID_UINT;
YAudioIn.MUTE_FALSE = 0 /* FALSE */;
YAudioIn.MUTE_TRUE = 1 /* TRUE */;
YAudioIn.MUTE_INVALID = -1 /* INVALID */;
YAudioIn.VOLUMERANGE_INVALID = yocto_api_js_1.YAPI.INVALID_STRING;
YAudioIn.SIGNAL_INVALID = yocto_api_js_1.YAPI.INVALID_INT;
YAudioIn.NOSIGNALFOR_INVALID = yocto_api_js_1.YAPI.INVALID_INT;
//# sourceMappingURL=yocto_audioin.js.map