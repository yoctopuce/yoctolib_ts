"use strict";
/*********************************************************************
 *
 *  $Id: svn_id $
 *
 *  Implements the high-level API for SpectralSensor functions
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
exports.YSpectralSensor = void 0;
const yocto_api_js_1 = require("./yocto_api.js");
//--- (YSpectralSensor class start)
/**
 * YSpectralSensor Class: spectral sensor control interface
 *
 * The YSpectralSensor class allows you to read and configure Yoctopuce spectral sensors.
 * It inherits from YSensor class the core functions to read measurements,
 * to register callback functions, and to access the autonomous datalogger.
 */
//--- (end of YSpectralSensor class start)
class YSpectralSensor extends yocto_api_js_1.YFunction {
    //--- (end of YSpectralSensor attributes declaration)
    constructor(yapi, func) {
        //--- (YSpectralSensor constructor)
        super(yapi, func);
        this._ledCurrent = YSpectralSensor.LEDCURRENT_INVALID;
        this._resolution = YSpectralSensor.RESOLUTION_INVALID;
        this._integrationTime = YSpectralSensor.INTEGRATIONTIME_INVALID;
        this._gain = YSpectralSensor.GAIN_INVALID;
        this._estimationModel = YSpectralSensor.ESTIMATIONMODEL_INVALID;
        this._saturation = YSpectralSensor.SATURATION_INVALID;
        this._estimatedRGB = YSpectralSensor.ESTIMATEDRGB_INVALID;
        this._estimatedHSL = YSpectralSensor.ESTIMATEDHSL_INVALID;
        this._estimatedXYZ = YSpectralSensor.ESTIMATEDXYZ_INVALID;
        this._estimatedOkLab = YSpectralSensor.ESTIMATEDOKLAB_INVALID;
        this._nearRAL1 = YSpectralSensor.NEARRAL1_INVALID;
        this._nearRAL2 = YSpectralSensor.NEARRAL2_INVALID;
        this._nearRAL3 = YSpectralSensor.NEARRAL3_INVALID;
        this._nearHTMLColor = YSpectralSensor.NEARHTMLCOLOR_INVALID;
        this._nearSimpleColor = YSpectralSensor.NEARSIMPLECOLOR_INVALID;
        this._ledCurrentAtPowerOn = YSpectralSensor.LEDCURRENTATPOWERON_INVALID;
        this._integrationTimeAtPowerOn = YSpectralSensor.INTEGRATIONTIMEATPOWERON_INVALID;
        this._gainAtPowerOn = YSpectralSensor.GAINATPOWERON_INVALID;
        this._valueCallbackSpectralSensor = null;
        // API symbols as object properties
        this.LEDCURRENT_INVALID = yocto_api_js_1.YAPI.INVALID_INT;
        this.RESOLUTION_INVALID = yocto_api_js_1.YAPI.INVALID_DOUBLE;
        this.INTEGRATIONTIME_INVALID = yocto_api_js_1.YAPI.INVALID_INT;
        this.GAIN_INVALID = yocto_api_js_1.YAPI.INVALID_INT;
        this.ESTIMATIONMODEL_REFLECTION = 0;
        this.ESTIMATIONMODEL_EMISSION = 1;
        this.ESTIMATIONMODEL_INVALID = -1;
        this.SATURATION_INVALID = yocto_api_js_1.YAPI.INVALID_UINT;
        this.ESTIMATEDRGB_INVALID = yocto_api_js_1.YAPI.INVALID_UINT;
        this.ESTIMATEDHSL_INVALID = yocto_api_js_1.YAPI.INVALID_UINT;
        this.ESTIMATEDXYZ_INVALID = yocto_api_js_1.YAPI.INVALID_STRING;
        this.ESTIMATEDOKLAB_INVALID = yocto_api_js_1.YAPI.INVALID_STRING;
        this.NEARRAL1_INVALID = yocto_api_js_1.YAPI.INVALID_STRING;
        this.NEARRAL2_INVALID = yocto_api_js_1.YAPI.INVALID_STRING;
        this.NEARRAL3_INVALID = yocto_api_js_1.YAPI.INVALID_STRING;
        this.NEARHTMLCOLOR_INVALID = yocto_api_js_1.YAPI.INVALID_STRING;
        this.NEARSIMPLECOLOR_INVALID = yocto_api_js_1.YAPI.INVALID_STRING;
        this.LEDCURRENTATPOWERON_INVALID = yocto_api_js_1.YAPI.INVALID_INT;
        this.INTEGRATIONTIMEATPOWERON_INVALID = yocto_api_js_1.YAPI.INVALID_INT;
        this.GAINATPOWERON_INVALID = yocto_api_js_1.YAPI.INVALID_INT;
        this._className = 'SpectralSensor';
        //--- (end of YSpectralSensor constructor)
    }
    //--- (YSpectralSensor implementation)
    imm_parseAttr(name, val) {
        switch (name) {
            case 'ledCurrent':
                this._ledCurrent = val;
                return 1;
            case 'resolution':
                this._resolution = Math.round(val / 65.536) / 1000.0;
                return 1;
            case 'integrationTime':
                this._integrationTime = val;
                return 1;
            case 'gain':
                this._gain = val;
                return 1;
            case 'estimationModel':
                this._estimationModel = val;
                return 1;
            case 'saturation':
                this._saturation = val;
                return 1;
            case 'estimatedRGB':
                this._estimatedRGB = val;
                return 1;
            case 'estimatedHSL':
                this._estimatedHSL = val;
                return 1;
            case 'estimatedXYZ':
                this._estimatedXYZ = val;
                return 1;
            case 'estimatedOkLab':
                this._estimatedOkLab = val;
                return 1;
            case 'nearRAL1':
                this._nearRAL1 = val;
                return 1;
            case 'nearRAL2':
                this._nearRAL2 = val;
                return 1;
            case 'nearRAL3':
                this._nearRAL3 = val;
                return 1;
            case 'nearHTMLColor':
                this._nearHTMLColor = val;
                return 1;
            case 'nearSimpleColor':
                this._nearSimpleColor = val;
                return 1;
            case 'ledCurrentAtPowerOn':
                this._ledCurrentAtPowerOn = val;
                return 1;
            case 'integrationTimeAtPowerOn':
                this._integrationTimeAtPowerOn = val;
                return 1;
            case 'gainAtPowerOn':
                this._gainAtPowerOn = val;
                return 1;
        }
        return super.imm_parseAttr(name, val);
    }
    /**
     * Returns the current value of the LED.
     * This method retrieves the current flowing through the LED
     * and returns it as an integer or an object.
     *
     * @return an integer corresponding to the current value of the LED
     *
     * On failure, throws an exception or returns YSpectralSensor.LEDCURRENT_INVALID.
     */
    async get_ledCurrent() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YSpectralSensor.LEDCURRENT_INVALID;
            }
        }
        res = this._ledCurrent;
        return res;
    }
    /**
     * Changes the luminosity of the module leds. The parameter is a
     * value between 0 and 254.
     *
     * @param newval : an integer corresponding to the luminosity of the module leds
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_ledCurrent(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('ledCurrent', rest_val);
    }
    /**
     * Changes the resolution of the measured physical values. The resolution corresponds to the numerical precision
     * when displaying value. It does not change the precision of the measure itself.
     * Remember to call the saveToFlash() method of the module if the modification must be kept.
     *
     * @param newval : a floating point number corresponding to the resolution of the measured physical values
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_resolution(newval) {
        let rest_val;
        rest_val = String(Math.round(newval * 65536.0));
        return await this._setAttr('resolution', rest_val);
    }
    /**
     * Returns the resolution of the measured values. The resolution corresponds to the numerical precision
     * of the measures, which is not always the same as the actual precision of the sensor.
     *
     * @return a floating point number corresponding to the resolution of the measured values
     *
     * On failure, throws an exception or returns YSpectralSensor.RESOLUTION_INVALID.
     */
    async get_resolution() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YSpectralSensor.RESOLUTION_INVALID;
            }
        }
        res = this._resolution;
        return res;
    }
    /**
     * Returns the current integration time.
     * This method retrieves the integration time value
     * used for data processing and returns it as an integer or an object.
     *
     * @return an integer corresponding to the current integration time
     *
     * On failure, throws an exception or returns YSpectralSensor.INTEGRATIONTIME_INVALID.
     */
    async get_integrationTime() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YSpectralSensor.INTEGRATIONTIME_INVALID;
            }
        }
        res = this._integrationTime;
        return res;
    }
    /**
     * Sets the integration time for data processing.
     * This method takes a parameter `val` and assigns it
     * as the new integration time. This affects the duration
     * for which data is integrated before being processed.
     *
     * @param newval : an integer
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_integrationTime(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('integrationTime', rest_val);
    }
    /**
     * Retrieves the current gain.
     * This method updates the gain value.
     *
     * @return an integer
     *
     * On failure, throws an exception or returns YSpectralSensor.GAIN_INVALID.
     */
    async get_gain() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YSpectralSensor.GAIN_INVALID;
            }
        }
        res = this._gain;
        return res;
    }
    /**
     * Sets the gain for signal processing.
     * This method takes a parameter `val` and assigns it
     * as the new gain. This affects the sensitivity and
     * intensity of the processed signal.
     *
     * @param newval : an integer
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_gain(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('gain', rest_val);
    }
    /**
     * Returns the model for color estimation.
     *
     * @return either YSpectralSensor.ESTIMATIONMODEL_REFLECTION or
     * YSpectralSensor.ESTIMATIONMODEL_EMISSION, according to the model for color estimation
     *
     * On failure, throws an exception or returns YSpectralSensor.ESTIMATIONMODEL_INVALID.
     */
    async get_estimationModel() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YSpectralSensor.ESTIMATIONMODEL_INVALID;
            }
        }
        res = this._estimationModel;
        return res;
    }
    /**
     * Changes the model for color estimation.
     * Remember to call the saveToFlash() method of the module if the modification must be kept.
     *
     * @param newval : either YSpectralSensor.ESTIMATIONMODEL_REFLECTION or
     * YSpectralSensor.ESTIMATIONMODEL_EMISSION, according to the model for color estimation
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_estimationModel(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('estimationModel', rest_val);
    }
    /**
     * Returns the current saturation of the sensor.
     * This function updates the sensor's saturation value.
     *
     * @return an integer corresponding to the current saturation of the sensor
     *
     * On failure, throws an exception or returns YSpectralSensor.SATURATION_INVALID.
     */
    async get_saturation() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YSpectralSensor.SATURATION_INVALID;
            }
        }
        res = this._saturation;
        return res;
    }
    /**
     * Returns the estimated color in RGB format (0xRRGGBB).
     * This method retrieves the estimated color values
     * and returns them as an RGB object or structure.
     *
     * @return an integer corresponding to the estimated color in RGB format (0xRRGGBB)
     *
     * On failure, throws an exception or returns YSpectralSensor.ESTIMATEDRGB_INVALID.
     */
    async get_estimatedRGB() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YSpectralSensor.ESTIMATEDRGB_INVALID;
            }
        }
        res = this._estimatedRGB;
        return res;
    }
    /**
     * Returns the estimated color in HSL (Hue, Saturation, Lightness) format.
     * This method retrieves the estimated color values
     * and returns them as an HSL object or structure.
     *
     * @return an integer corresponding to the estimated color in HSL (Hue, Saturation, Lightness) format
     *
     * On failure, throws an exception or returns YSpectralSensor.ESTIMATEDHSL_INVALID.
     */
    async get_estimatedHSL() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YSpectralSensor.ESTIMATEDHSL_INVALID;
            }
        }
        res = this._estimatedHSL;
        return res;
    }
    /**
     * Returns the estimated color in XYZ format.
     * This method retrieves the estimated color values
     * and returns them as an XYZ object or structure.
     *
     * @return a string corresponding to the estimated color in XYZ format
     *
     * On failure, throws an exception or returns YSpectralSensor.ESTIMATEDXYZ_INVALID.
     */
    async get_estimatedXYZ() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YSpectralSensor.ESTIMATEDXYZ_INVALID;
            }
        }
        res = this._estimatedXYZ;
        return res;
    }
    /**
     * Returns the estimated color in OkLab format.
     * This method retrieves the estimated color values
     * and returns them as an OkLab object or structure.
     *
     * @return a string corresponding to the estimated color in OkLab format
     *
     * On failure, throws an exception or returns YSpectralSensor.ESTIMATEDOKLAB_INVALID.
     */
    async get_estimatedOkLab() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YSpectralSensor.ESTIMATEDOKLAB_INVALID;
            }
        }
        res = this._estimatedOkLab;
        return res;
    }
    async get_nearRAL1() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YSpectralSensor.NEARRAL1_INVALID;
            }
        }
        res = this._nearRAL1;
        return res;
    }
    async get_nearRAL2() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YSpectralSensor.NEARRAL2_INVALID;
            }
        }
        res = this._nearRAL2;
        return res;
    }
    async get_nearRAL3() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YSpectralSensor.NEARRAL3_INVALID;
            }
        }
        res = this._nearRAL3;
        return res;
    }
    async get_nearHTMLColor() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YSpectralSensor.NEARHTMLCOLOR_INVALID;
            }
        }
        res = this._nearHTMLColor;
        return res;
    }
    /**
     * Returns the estimated color.
     * This method retrieves the estimated color values
     * and returns them as the color name.
     *
     * @return a string corresponding to the estimated color
     *
     * On failure, throws an exception or returns YSpectralSensor.NEARSIMPLECOLOR_INVALID.
     */
    async get_nearSimpleColor() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YSpectralSensor.NEARSIMPLECOLOR_INVALID;
            }
        }
        res = this._nearSimpleColor;
        return res;
    }
    async get_ledCurrentAtPowerOn() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YSpectralSensor.LEDCURRENTATPOWERON_INVALID;
            }
        }
        res = this._ledCurrentAtPowerOn;
        return res;
    }
    /**
     * Sets the LED current at power-on.
     * This method takes a parameter `val` and assigns it to startupLumin, representing the LED current defined
     * at startup.
     * Remember to call the saveToFlash() method of the module if the modification must be kept.
     *
     * @param newval : an integer
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_ledCurrentAtPowerOn(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('ledCurrentAtPowerOn', rest_val);
    }
    async get_integrationTimeAtPowerOn() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YSpectralSensor.INTEGRATIONTIMEATPOWERON_INVALID;
            }
        }
        res = this._integrationTimeAtPowerOn;
        return res;
    }
    /**
     * Sets the integration time at power-on.
     * This method takes a parameter `val` and assigns it to startupIntegTime, representing the integration time
     * defined at startup.
     * Remember to call the saveToFlash() method of the module if the modification must be kept.
     *
     * @param newval : an integer
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_integrationTimeAtPowerOn(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('integrationTimeAtPowerOn', rest_val);
    }
    async get_gainAtPowerOn() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YSpectralSensor.GAINATPOWERON_INVALID;
            }
        }
        res = this._gainAtPowerOn;
        return res;
    }
    /**
     * Sets the gain at power-on.
     * This method takes a parameter `val` and assigns it to startupGain, representing the gain defined at startup.
     * Remember to call the saveToFlash() method of the module if the modification must be kept.
     *
     * @param newval : an integer
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_gainAtPowerOn(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('gainAtPowerOn', rest_val);
    }
    /**
     * Retrieves a spectral sensor for a given identifier.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the spectral sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YSpectralSensor.isOnline() to test if the spectral sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a spectral sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the spectral sensor, for instance
     *         MyDevice.spectralSensor.
     *
     * @return a YSpectralSensor object allowing you to drive the spectral sensor.
     */
    static FindSpectralSensor(func) {
        let obj;
        obj = yocto_api_js_1.YFunction._FindFromCache('SpectralSensor', func);
        if (obj == null) {
            obj = new YSpectralSensor(yocto_api_js_1.YAPI, func);
            yocto_api_js_1.YFunction._AddToCache('SpectralSensor', func, obj);
        }
        return obj;
    }
    /**
     * Retrieves a spectral sensor for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the spectral sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YSpectralSensor.isOnline() to test if the spectral sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a spectral sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx : a YAPI context
     * @param func : a string that uniquely characterizes the spectral sensor, for instance
     *         MyDevice.spectralSensor.
     *
     * @return a YSpectralSensor object allowing you to drive the spectral sensor.
     */
    static FindSpectralSensorInContext(yctx, func) {
        let obj;
        obj = yocto_api_js_1.YFunction._FindFromCacheInContext(yctx, 'SpectralSensor', func);
        if (obj == null) {
            obj = new YSpectralSensor(yctx, func);
            yocto_api_js_1.YFunction._AddToCache('SpectralSensor', func, obj);
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
        this._valueCallbackSpectralSensor = callback;
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
        if (this._valueCallbackSpectralSensor != null) {
            try {
                await this._valueCallbackSpectralSensor(this, value);
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
     * Continues the enumeration of spectral sensors started using yFirstSpectralSensor().
     * Caution: You can't make any assumption about the returned spectral sensors order.
     * If you want to find a specific a spectral sensor, use SpectralSensor.findSpectralSensor()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YSpectralSensor object, corresponding to
     *         a spectral sensor currently online, or a null pointer
     *         if there are no more spectral sensors to enumerate.
     */
    nextSpectralSensor() {
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != yocto_api_js_1.YAPI.SUCCESS)
            return null;
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if (next_hwid == null)
            return null;
        return YSpectralSensor.FindSpectralSensorInContext(this._yapi, next_hwid);
    }
    /**
     * Starts the enumeration of spectral sensors currently accessible.
     * Use the method YSpectralSensor.nextSpectralSensor() to iterate on
     * next spectral sensors.
     *
     * @return a pointer to a YSpectralSensor object, corresponding to
     *         the first spectral sensor currently online, or a null pointer
     *         if there are none.
     */
    static FirstSpectralSensor() {
        let next_hwid = yocto_api_js_1.YAPI.imm_getFirstHardwareId('SpectralSensor');
        if (next_hwid == null)
            return null;
        return YSpectralSensor.FindSpectralSensor(next_hwid);
    }
    /**
     * Starts the enumeration of spectral sensors currently accessible.
     * Use the method YSpectralSensor.nextSpectralSensor() to iterate on
     * next spectral sensors.
     *
     * @param yctx : a YAPI context.
     *
     * @return a pointer to a YSpectralSensor object, corresponding to
     *         the first spectral sensor currently online, or a null pointer
     *         if there are none.
     */
    static FirstSpectralSensorInContext(yctx) {
        let next_hwid = yctx.imm_getFirstHardwareId('SpectralSensor');
        if (next_hwid == null)
            return null;
        return YSpectralSensor.FindSpectralSensorInContext(yctx, next_hwid);
    }
}
exports.YSpectralSensor = YSpectralSensor;
// API symbols as static members
YSpectralSensor.LEDCURRENT_INVALID = yocto_api_js_1.YAPI.INVALID_INT;
YSpectralSensor.RESOLUTION_INVALID = yocto_api_js_1.YAPI.INVALID_DOUBLE;
YSpectralSensor.INTEGRATIONTIME_INVALID = yocto_api_js_1.YAPI.INVALID_INT;
YSpectralSensor.GAIN_INVALID = yocto_api_js_1.YAPI.INVALID_INT;
YSpectralSensor.ESTIMATIONMODEL_REFLECTION = 0;
YSpectralSensor.ESTIMATIONMODEL_EMISSION = 1;
YSpectralSensor.ESTIMATIONMODEL_INVALID = -1;
YSpectralSensor.SATURATION_INVALID = yocto_api_js_1.YAPI.INVALID_UINT;
YSpectralSensor.ESTIMATEDRGB_INVALID = yocto_api_js_1.YAPI.INVALID_UINT;
YSpectralSensor.ESTIMATEDHSL_INVALID = yocto_api_js_1.YAPI.INVALID_UINT;
YSpectralSensor.ESTIMATEDXYZ_INVALID = yocto_api_js_1.YAPI.INVALID_STRING;
YSpectralSensor.ESTIMATEDOKLAB_INVALID = yocto_api_js_1.YAPI.INVALID_STRING;
YSpectralSensor.NEARRAL1_INVALID = yocto_api_js_1.YAPI.INVALID_STRING;
YSpectralSensor.NEARRAL2_INVALID = yocto_api_js_1.YAPI.INVALID_STRING;
YSpectralSensor.NEARRAL3_INVALID = yocto_api_js_1.YAPI.INVALID_STRING;
YSpectralSensor.NEARHTMLCOLOR_INVALID = yocto_api_js_1.YAPI.INVALID_STRING;
YSpectralSensor.NEARSIMPLECOLOR_INVALID = yocto_api_js_1.YAPI.INVALID_STRING;
YSpectralSensor.LEDCURRENTATPOWERON_INVALID = yocto_api_js_1.YAPI.INVALID_INT;
YSpectralSensor.INTEGRATIONTIMEATPOWERON_INVALID = yocto_api_js_1.YAPI.INVALID_INT;
YSpectralSensor.GAINATPOWERON_INVALID = yocto_api_js_1.YAPI.INVALID_INT;
//# sourceMappingURL=yocto_spectralsensor.js.map