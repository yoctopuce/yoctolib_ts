"use strict";
/*********************************************************************
 *
 *  $Id: svn_id $
 *
 *  Implements the high-level API for SpectralChannel functions
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
exports.YSpectralChannel = void 0;
const yocto_api_js_1 = require("./yocto_api.js");
//--- (YSpectralChannel class start)
/**
 * YSpectralChannel Class: spectral analysis channel control interface
 *
 * The YSpectralChannel class allows you to read and configure Yoctopuce spectral analysis channels.
 * It inherits from YSensor class the core functions to read measures,
 * to register callback functions, and to access the autonomous datalogger.
 */
//--- (end of YSpectralChannel class start)
class YSpectralChannel extends yocto_api_js_1.YSensor {
    //--- (end of YSpectralChannel attributes declaration)
    constructor(yapi, func) {
        //--- (YSpectralChannel constructor)
        super(yapi, func);
        this._rawCount = YSpectralChannel.RAWCOUNT_INVALID;
        this._channelName = YSpectralChannel.CHANNELNAME_INVALID;
        this._peakWavelength = YSpectralChannel.PEAKWAVELENGTH_INVALID;
        this._valueCallbackSpectralChannel = null;
        this._timedReportCallbackSpectralChannel = null;
        // API symbols as object properties
        this.RAWCOUNT_INVALID = yocto_api_js_1.YAPI.INVALID_INT;
        this.CHANNELNAME_INVALID = yocto_api_js_1.YAPI.INVALID_STRING;
        this.PEAKWAVELENGTH_INVALID = yocto_api_js_1.YAPI.INVALID_INT;
        this._className = 'SpectralChannel';
        //--- (end of YSpectralChannel constructor)
    }
    //--- (YSpectralChannel implementation)
    imm_parseAttr(name, val) {
        switch (name) {
            case 'rawCount':
                this._rawCount = val;
                return 1;
            case 'channelName':
                this._channelName = val;
                return 1;
            case 'peakWavelength':
                this._peakWavelength = val;
                return 1;
        }
        return super.imm_parseAttr(name, val);
    }
    /**
     * Retrieves the raw spectral intensity value as measured by the sensor, without any scaling or calibration.
     *
     * @return an integer
     *
     * On failure, throws an exception or returns YSpectralChannel.RAWCOUNT_INVALID.
     */
    async get_rawCount() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YSpectralChannel.RAWCOUNT_INVALID;
            }
        }
        res = this._rawCount;
        return res;
    }
    /**
     * Returns the target spectral band name.
     *
     * @return a string corresponding to the target spectral band name
     *
     * On failure, throws an exception or returns YSpectralChannel.CHANNELNAME_INVALID.
     */
    async get_channelName() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YSpectralChannel.CHANNELNAME_INVALID;
            }
        }
        res = this._channelName;
        return res;
    }
    /**
     * Returns the target spectral band peak wavelenght, in nm.
     *
     * @return an integer corresponding to the target spectral band peak wavelenght, in nm
     *
     * On failure, throws an exception or returns YSpectralChannel.PEAKWAVELENGTH_INVALID.
     */
    async get_peakWavelength() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YSpectralChannel.PEAKWAVELENGTH_INVALID;
            }
        }
        res = this._peakWavelength;
        return res;
    }
    /**
     * Retrieves a spectral analysis channel for a given identifier.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the spectral analysis channel is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YSpectralChannel.isOnline() to test if the spectral analysis channel is
     * indeed online at a given time. In case of ambiguity when looking for
     * a spectral analysis channel by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the spectral analysis channel, for instance
     *         MyDevice.spectralChannel1.
     *
     * @return a YSpectralChannel object allowing you to drive the spectral analysis channel.
     */
    static FindSpectralChannel(func) {
        let obj;
        obj = yocto_api_js_1.YFunction._FindFromCache('SpectralChannel', func);
        if (obj == null) {
            obj = new YSpectralChannel(yocto_api_js_1.YAPI, func);
            yocto_api_js_1.YFunction._AddToCache('SpectralChannel', func, obj);
        }
        return obj;
    }
    /**
     * Retrieves a spectral analysis channel for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the spectral analysis channel is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YSpectralChannel.isOnline() to test if the spectral analysis channel is
     * indeed online at a given time. In case of ambiguity when looking for
     * a spectral analysis channel by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx : a YAPI context
     * @param func : a string that uniquely characterizes the spectral analysis channel, for instance
     *         MyDevice.spectralChannel1.
     *
     * @return a YSpectralChannel object allowing you to drive the spectral analysis channel.
     */
    static FindSpectralChannelInContext(yctx, func) {
        let obj;
        obj = yocto_api_js_1.YFunction._FindFromCacheInContext(yctx, 'SpectralChannel', func);
        if (obj == null) {
            obj = new YSpectralChannel(yctx, func);
            yocto_api_js_1.YFunction._AddToCache('SpectralChannel', func, obj);
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
        this._valueCallbackSpectralChannel = callback;
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
        if (this._valueCallbackSpectralChannel != null) {
            try {
                await this._valueCallbackSpectralChannel(this, value);
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
            await yocto_api_js_1.YFunction._UpdateTimedReportCallbackList(sensor, true);
        }
        else {
            await yocto_api_js_1.YFunction._UpdateTimedReportCallbackList(sensor, false);
        }
        this._timedReportCallbackSpectralChannel = callback;
        return 0;
    }
    async _invokeTimedReportCallback(value) {
        if (this._timedReportCallbackSpectralChannel != null) {
            try {
                await this._timedReportCallbackSpectralChannel(this, value);
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
     * Continues the enumeration of spectral analysis channels started using yFirstSpectralChannel().
     * Caution: You can't make any assumption about the returned spectral analysis channels order.
     * If you want to find a specific a spectral analysis channel, use SpectralChannel.findSpectralChannel()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YSpectralChannel object, corresponding to
     *         a spectral analysis channel currently online, or a null pointer
     *         if there are no more spectral analysis channels to enumerate.
     */
    nextSpectralChannel() {
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != yocto_api_js_1.YAPI.SUCCESS)
            return null;
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if (next_hwid == null)
            return null;
        return YSpectralChannel.FindSpectralChannelInContext(this._yapi, next_hwid);
    }
    /**
     * Starts the enumeration of spectral analysis channels currently accessible.
     * Use the method YSpectralChannel.nextSpectralChannel() to iterate on
     * next spectral analysis channels.
     *
     * @return a pointer to a YSpectralChannel object, corresponding to
     *         the first spectral analysis channel currently online, or a null pointer
     *         if there are none.
     */
    static FirstSpectralChannel() {
        let next_hwid = yocto_api_js_1.YAPI.imm_getFirstHardwareId('SpectralChannel');
        if (next_hwid == null)
            return null;
        return YSpectralChannel.FindSpectralChannel(next_hwid);
    }
    /**
     * Starts the enumeration of spectral analysis channels currently accessible.
     * Use the method YSpectralChannel.nextSpectralChannel() to iterate on
     * next spectral analysis channels.
     *
     * @param yctx : a YAPI context.
     *
     * @return a pointer to a YSpectralChannel object, corresponding to
     *         the first spectral analysis channel currently online, or a null pointer
     *         if there are none.
     */
    static FirstSpectralChannelInContext(yctx) {
        let next_hwid = yctx.imm_getFirstHardwareId('SpectralChannel');
        if (next_hwid == null)
            return null;
        return YSpectralChannel.FindSpectralChannelInContext(yctx, next_hwid);
    }
}
exports.YSpectralChannel = YSpectralChannel;
// API symbols as static members
YSpectralChannel.RAWCOUNT_INVALID = yocto_api_js_1.YAPI.INVALID_INT;
YSpectralChannel.CHANNELNAME_INVALID = yocto_api_js_1.YAPI.INVALID_STRING;
YSpectralChannel.PEAKWAVELENGTH_INVALID = yocto_api_js_1.YAPI.INVALID_INT;
//# sourceMappingURL=yocto_spectralchannel.js.map