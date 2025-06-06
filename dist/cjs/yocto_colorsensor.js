"use strict";
/*********************************************************************
 *
 *  $Id: svn_id $
 *
 *  Implements the high-level API for ColorSensor functions
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
exports.YColorSensor = void 0;
const yocto_api_js_1 = require("./yocto_api.js");
//--- (YColorSensor class start)
/**
 * YColorSensor Class: color sensor control interface
 *
 * The YColorSensor class allows you to read and configure Yoctopuce color sensors.
 */
//--- (end of YColorSensor class start)
class YColorSensor extends yocto_api_js_1.YFunction {
    //--- (end of YColorSensor attributes declaration)
    constructor(yapi, func) {
        //--- (YColorSensor constructor)
        super(yapi, func);
        this._estimationModel = YColorSensor.ESTIMATIONMODEL_INVALID;
        this._workingMode = YColorSensor.WORKINGMODE_INVALID;
        this._ledCurrent = YColorSensor.LEDCURRENT_INVALID;
        this._ledCalibration = YColorSensor.LEDCALIBRATION_INVALID;
        this._integrationTime = YColorSensor.INTEGRATIONTIME_INVALID;
        this._gain = YColorSensor.GAIN_INVALID;
        this._saturation = YColorSensor.SATURATION_INVALID;
        this._estimatedRGB = YColorSensor.ESTIMATEDRGB_INVALID;
        this._estimatedHSL = YColorSensor.ESTIMATEDHSL_INVALID;
        this._estimatedXYZ = YColorSensor.ESTIMATEDXYZ_INVALID;
        this._estimatedOkLab = YColorSensor.ESTIMATEDOKLAB_INVALID;
        this._nearRAL1 = YColorSensor.NEARRAL1_INVALID;
        this._nearRAL2 = YColorSensor.NEARRAL2_INVALID;
        this._nearRAL3 = YColorSensor.NEARRAL3_INVALID;
        this._nearHTMLColor = YColorSensor.NEARHTMLCOLOR_INVALID;
        this._nearSimpleColorIndex = YColorSensor.NEARSIMPLECOLORINDEX_INVALID;
        this._nearSimpleColor = YColorSensor.NEARSIMPLECOLOR_INVALID;
        this._valueCallbackColorSensor = null;
        // API symbols as object properties
        this.ESTIMATIONMODEL_REFLECTION = 0;
        this.ESTIMATIONMODEL_EMISSION = 1;
        this.ESTIMATIONMODEL_INVALID = -1;
        this.WORKINGMODE_AUTO = 0;
        this.WORKINGMODE_EXPERT = 1;
        this.WORKINGMODE_INVALID = -1;
        this.LEDCURRENT_INVALID = yocto_api_js_1.YAPI.INVALID_UINT;
        this.LEDCALIBRATION_INVALID = yocto_api_js_1.YAPI.INVALID_UINT;
        this.INTEGRATIONTIME_INVALID = yocto_api_js_1.YAPI.INVALID_UINT;
        this.GAIN_INVALID = yocto_api_js_1.YAPI.INVALID_UINT;
        this.SATURATION_INVALID = yocto_api_js_1.YAPI.INVALID_UINT;
        this.ESTIMATEDRGB_INVALID = yocto_api_js_1.YAPI.INVALID_UINT;
        this.ESTIMATEDHSL_INVALID = yocto_api_js_1.YAPI.INVALID_UINT;
        this.ESTIMATEDXYZ_INVALID = yocto_api_js_1.YAPI.INVALID_STRING;
        this.ESTIMATEDOKLAB_INVALID = yocto_api_js_1.YAPI.INVALID_STRING;
        this.NEARRAL1_INVALID = yocto_api_js_1.YAPI.INVALID_STRING;
        this.NEARRAL2_INVALID = yocto_api_js_1.YAPI.INVALID_STRING;
        this.NEARRAL3_INVALID = yocto_api_js_1.YAPI.INVALID_STRING;
        this.NEARHTMLCOLOR_INVALID = yocto_api_js_1.YAPI.INVALID_STRING;
        this.NEARSIMPLECOLORINDEX_BROWN = 0;
        this.NEARSIMPLECOLORINDEX_RED = 1;
        this.NEARSIMPLECOLORINDEX_ORANGE = 2;
        this.NEARSIMPLECOLORINDEX_YELLOW = 3;
        this.NEARSIMPLECOLORINDEX_WHITE = 4;
        this.NEARSIMPLECOLORINDEX_GRAY = 5;
        this.NEARSIMPLECOLORINDEX_BLACK = 6;
        this.NEARSIMPLECOLORINDEX_GREEN = 7;
        this.NEARSIMPLECOLORINDEX_BLUE = 8;
        this.NEARSIMPLECOLORINDEX_PURPLE = 9;
        this.NEARSIMPLECOLORINDEX_PINK = 10;
        this.NEARSIMPLECOLORINDEX_INVALID = -1;
        this.NEARSIMPLECOLOR_INVALID = yocto_api_js_1.YAPI.INVALID_STRING;
        this._className = 'ColorSensor';
        //--- (end of YColorSensor constructor)
    }
    //--- (YColorSensor implementation)
    imm_parseAttr(name, val) {
        switch (name) {
            case 'estimationModel':
                this._estimationModel = val;
                return 1;
            case 'workingMode':
                this._workingMode = val;
                return 1;
            case 'ledCurrent':
                this._ledCurrent = val;
                return 1;
            case 'ledCalibration':
                this._ledCalibration = val;
                return 1;
            case 'integrationTime':
                this._integrationTime = val;
                return 1;
            case 'gain':
                this._gain = val;
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
            case 'nearSimpleColorIndex':
                this._nearSimpleColorIndex = val;
                return 1;
            case 'nearSimpleColor':
                this._nearSimpleColor = val;
                return 1;
        }
        return super.imm_parseAttr(name, val);
    }
    /**
     * Returns the predictive model used for color estimation (reflective or emissive).
     *
     * @return either YColorSensor.ESTIMATIONMODEL_REFLECTION or YColorSensor.ESTIMATIONMODEL_EMISSION,
     * according to the predictive model used for color estimation (reflective or emissive)
     *
     * On failure, throws an exception or returns YColorSensor.ESTIMATIONMODEL_INVALID.
     */
    async get_estimationModel() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YColorSensor.ESTIMATIONMODEL_INVALID;
            }
        }
        res = this._estimationModel;
        return res;
    }
    /**
     * Changes the predictive model to be used for color estimation (reflective or emissive).
     * Remember to call the saveToFlash() method of the module if the modification must be kept.
     *
     * @param newval : either YColorSensor.ESTIMATIONMODEL_REFLECTION or
     * YColorSensor.ESTIMATIONMODEL_EMISSION, according to the predictive model to be used for color
     * estimation (reflective or emissive)
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
     * Returns the sensor working mode.
     * In Auto mode, sensor parameters are automatically set based on the selected estimation model.
     * In Expert mode, sensor parameters such as gain and integration time are configured manually.
     *
     * @return either YColorSensor.WORKINGMODE_AUTO or YColorSensor.WORKINGMODE_EXPERT, according to the
     * sensor working mode
     *
     * On failure, throws an exception or returns YColorSensor.WORKINGMODE_INVALID.
     */
    async get_workingMode() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YColorSensor.WORKINGMODE_INVALID;
            }
        }
        res = this._workingMode;
        return res;
    }
    /**
     * Changes the sensor working mode.
     * In Auto mode, sensor parameters are automatically set based on the selected estimation model.
     * In Expert mode, sensor parameters such as gain and integration time are configured manually.
     * Remember to call the saveToFlash() method of the module if the modification must be kept.
     *
     * @param newval : either YColorSensor.WORKINGMODE_AUTO or YColorSensor.WORKINGMODE_EXPERT, according
     * to the sensor working mode
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_workingMode(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('workingMode', rest_val);
    }
    /**
     * Returns the amount of current sent to the illumination LEDs, for reflection measures.
     * The value is an integer ranging from 0 (LEDs off) to 254 (LEDs at maximum intensity).
     *
     * @return an integer corresponding to the amount of current sent to the illumination LEDs, for reflection measures
     *
     * On failure, throws an exception or returns YColorSensor.LEDCURRENT_INVALID.
     */
    async get_ledCurrent() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YColorSensor.LEDCURRENT_INVALID;
            }
        }
        res = this._ledCurrent;
        return res;
    }
    /**
     * Changes the amount of current sent to the illumination LEDs, for reflection measures.
     * The value is an integer ranging from 0 (LEDs off) to 254 (LEDs at maximum intensity).
     *
     * @param newval : an integer corresponding to the amount of current sent to the illumination LEDs,
     * for reflection measures
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
     * Returns the current sent to the illumination LEDs during the latest calibration.
     *
     * @return an integer corresponding to the current sent to the illumination LEDs during the latest calibration
     *
     * On failure, throws an exception or returns YColorSensor.LEDCALIBRATION_INVALID.
     */
    async get_ledCalibration() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YColorSensor.LEDCALIBRATION_INVALID;
            }
        }
        res = this._ledCalibration;
        return res;
    }
    /**
     * Remember the LED current sent to the illumination LEDs during a calibration.
     * Thanks to this, the device is able to use the same current when taking measures.
     * Remember to call the saveToFlash() method of the module if the modification must be kept.
     *
     * @param newval : an integer
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_ledCalibration(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('ledCalibration', rest_val);
    }
    /**
     * Returns the current integration time for spectral measure, in milliseconds.
     * A longer integration time increase the sensitivity for low light conditions,
     * but reduces the measure taking rate and may lead to saturation for lighter colors.
     *
     * @return an integer corresponding to the current integration time for spectral measure, in milliseconds
     *
     * On failure, throws an exception or returns YColorSensor.INTEGRATIONTIME_INVALID.
     */
    async get_integrationTime() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YColorSensor.INTEGRATIONTIME_INVALID;
            }
        }
        res = this._integrationTime;
        return res;
    }
    /**
     * Changes the integration time for spectral measure, in milliseconds.
     * A longer integration time increase the sensitivity for low light conditions,
     * but reduces the measure taking rate and may lead to saturation for lighter colors.
     * This method can only be used when the sensor is configured in expert mode;
     * when running in auto mode, the change is ignored.
     * Remember to call the saveToFlash() method of the module if the modification must be kept.
     *
     * @param newval : an integer corresponding to the integration time for spectral measure, in milliseconds
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
     * Returns the current spectral channel detector gain exponent.
     * For a value n ranging from 0 to 12, the applied gain is 2^(n-1).
     * 0 corresponds to a gain of 0.5, and 12 corresponds to a gain of 2048.
     *
     * @return an integer corresponding to the current spectral channel detector gain exponent
     *
     * On failure, throws an exception or returns YColorSensor.GAIN_INVALID.
     */
    async get_gain() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YColorSensor.GAIN_INVALID;
            }
        }
        res = this._gain;
        return res;
    }
    /**
     * Changes the spectral channel detector gain exponent.
     * For a value n ranging from 0 to 12, the applied gain is 2^(n-1).
     * 0 corresponds to a gain of 0.5, and 12 corresponds to a gain of 2048.
     * This method can only be used when the sensor is configured in expert mode;
     * when running in auto mode, the change is ignored.
     * Remember to call the saveToFlash() method of the module if the modification must be kept.
     *
     * @param newval : an integer corresponding to the spectral channel detector gain exponent
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
     * Returns the current saturation state of the sensor, as an integer.
     * Bit 0 indicates saturation of the analog sensor, which can only
     * be corrected by reducing the gain parameters or the luminosity.
     * Bit 1 indicates saturation of the digital interface, which can
     * be corrected by reducing the integration time or the gain.
     *
     * @return an integer corresponding to the current saturation state of the sensor, as an integer
     *
     * On failure, throws an exception or returns YColorSensor.SATURATION_INVALID.
     */
    async get_saturation() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YColorSensor.SATURATION_INVALID;
            }
        }
        res = this._saturation;
        return res;
    }
    /**
     * Returns the estimated color in RGB color model (0xRRGGBB).
     * The RGB color model describes each color using a combination of 3 components:
     * - Red (R): the intensity of red, in the 0...255 range
     * - Green (G): the intensity of green, in the 0...255 range
     * - Blue (B): the intensity of blue, in the 0...255 range
     *
     * @return an integer corresponding to the estimated color in RGB color model (0xRRGGBB)
     *
     * On failure, throws an exception or returns YColorSensor.ESTIMATEDRGB_INVALID.
     */
    async get_estimatedRGB() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YColorSensor.ESTIMATEDRGB_INVALID;
            }
        }
        res = this._estimatedRGB;
        return res;
    }
    /**
     * Returns the estimated color in HSL color model (0xHHSSLL).
     * The HSL color model describes each color using a combination of 3 components:
     * - Hue (H): the angle on the color wheel (0-360 degrees), mapped to 0...255
     * - Saturation (S): the intensity of the color (0-100%), mapped to 0...255
     * - Lightness (L): the brightness of the color (0-100%), mapped to 0...255
     *
     * @return an integer corresponding to the estimated color in HSL color model (0xHHSSLL)
     *
     * On failure, throws an exception or returns YColorSensor.ESTIMATEDHSL_INVALID.
     */
    async get_estimatedHSL() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YColorSensor.ESTIMATEDHSL_INVALID;
            }
        }
        res = this._estimatedHSL;
        return res;
    }
    /**
     * Returns the estimated color according to the CIE XYZ color model.
     * This color model is based on human vision and light perception, with three components
     * represented by real numbers between 0 and 1:
     * - X: corresponds to a component mixing sensitivity to red and green
     * - Y: represents luminance (perceived brightness)
     * - Z: corresponds to sensitivity to blue
     *
     * @return a string corresponding to the estimated color according to the CIE XYZ color model
     *
     * On failure, throws an exception or returns YColorSensor.ESTIMATEDXYZ_INVALID.
     */
    async get_estimatedXYZ() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YColorSensor.ESTIMATEDXYZ_INVALID;
            }
        }
        res = this._estimatedXYZ;
        return res;
    }
    /**
     * Returns the estimated color according to the OkLab color model.
     * OkLab is a perceptual color model that aims to align human color perception with numerical
     * values, so that colors that are visually near are also numerically near. Colors are represented
     * using three components:
     * - L: lightness, a real number between 0 and 1
     * - a: color variations between green and red, between -0.5 and 0.5
     * - b: color variations between blue and yellow, between -0.5 and 0.5.
     *
     * @return a string corresponding to the estimated color according to the OkLab color model
     *
     * On failure, throws an exception or returns YColorSensor.ESTIMATEDOKLAB_INVALID.
     */
    async get_estimatedOkLab() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YColorSensor.ESTIMATEDOKLAB_INVALID;
            }
        }
        res = this._estimatedOkLab;
        return res;
    }
    /**
     * Returns the RAL Classic color closest to the estimated color, with a similarity ratio.
     *
     * @return a string corresponding to the RAL Classic color closest to the estimated color, with a similarity ratio
     *
     * On failure, throws an exception or returns YColorSensor.NEARRAL1_INVALID.
     */
    async get_nearRAL1() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YColorSensor.NEARRAL1_INVALID;
            }
        }
        res = this._nearRAL1;
        return res;
    }
    /**
     * Returns the second closest RAL Classic color to the estimated color, with a similarity ratio.
     *
     * @return a string corresponding to the second closest RAL Classic color to the estimated color, with
     * a similarity ratio
     *
     * On failure, throws an exception or returns YColorSensor.NEARRAL2_INVALID.
     */
    async get_nearRAL2() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YColorSensor.NEARRAL2_INVALID;
            }
        }
        res = this._nearRAL2;
        return res;
    }
    /**
     * Returns the third closest RAL Classic color to the estimated color, with a similarity ratio.
     *
     * @return a string corresponding to the third closest RAL Classic color to the estimated color, with
     * a similarity ratio
     *
     * On failure, throws an exception or returns YColorSensor.NEARRAL3_INVALID.
     */
    async get_nearRAL3() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YColorSensor.NEARRAL3_INVALID;
            }
        }
        res = this._nearRAL3;
        return res;
    }
    /**
     * Returns the name of the HTML color closest to the estimated color.
     *
     * @return a string corresponding to the name of the HTML color closest to the estimated color
     *
     * On failure, throws an exception or returns YColorSensor.NEARHTMLCOLOR_INVALID.
     */
    async get_nearHTMLColor() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YColorSensor.NEARHTMLCOLOR_INVALID;
            }
        }
        res = this._nearHTMLColor;
        return res;
    }
    /**
     * Returns the index of the basic color typically used to refer to the estimated color (enumerated value).
     * The list of basic colors recognized is:
     * - 0 - Brown
     * - 1 - Red
     * - 2 - Orange
     * - 3 - Yellow
     * - 4 - White
     * - 5 - Gray
     * - 6 - Black
     * - 7 - Green
     * - 8 - Blue
     * - 9 - Purple
     * - 10 - Pink
     *
     * @return a value among YColorSensor.NEARSIMPLECOLORINDEX_BROWN,
     * YColorSensor.NEARSIMPLECOLORINDEX_RED, YColorSensor.NEARSIMPLECOLORINDEX_ORANGE,
     * YColorSensor.NEARSIMPLECOLORINDEX_YELLOW, YColorSensor.NEARSIMPLECOLORINDEX_WHITE,
     * YColorSensor.NEARSIMPLECOLORINDEX_GRAY, YColorSensor.NEARSIMPLECOLORINDEX_BLACK,
     * YColorSensor.NEARSIMPLECOLORINDEX_GREEN, YColorSensor.NEARSIMPLECOLORINDEX_BLUE,
     * YColorSensor.NEARSIMPLECOLORINDEX_PURPLE and YColorSensor.NEARSIMPLECOLORINDEX_PINK corresponding
     * to the index of the basic color typically used to refer to the estimated color (enumerated value)
     *
     * On failure, throws an exception or returns YColorSensor.NEARSIMPLECOLORINDEX_INVALID.
     */
    async get_nearSimpleColorIndex() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YColorSensor.NEARSIMPLECOLORINDEX_INVALID;
            }
        }
        res = this._nearSimpleColorIndex;
        return res;
    }
    /**
     * Returns the name of the basic color typically used to refer to the estimated color.
     *
     * @return a string corresponding to the name of the basic color typically used to refer to the estimated color
     *
     * On failure, throws an exception or returns YColorSensor.NEARSIMPLECOLOR_INVALID.
     */
    async get_nearSimpleColor() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YColorSensor.NEARSIMPLECOLOR_INVALID;
            }
        }
        res = this._nearSimpleColor;
        return res;
    }
    /**
     * Retrieves a color sensor for a given identifier.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the color sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YColorSensor.isOnline() to test if the color sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a color sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the color sensor, for instance
     *         MyDevice.colorSensor.
     *
     * @return a YColorSensor object allowing you to drive the color sensor.
     */
    static FindColorSensor(func) {
        let obj;
        obj = yocto_api_js_1.YFunction._FindFromCache('ColorSensor', func);
        if (obj == null) {
            obj = new YColorSensor(yocto_api_js_1.YAPI, func);
            yocto_api_js_1.YFunction._AddToCache('ColorSensor', func, obj);
        }
        return obj;
    }
    /**
     * Retrieves a color sensor for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the color sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YColorSensor.isOnline() to test if the color sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a color sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx : a YAPI context
     * @param func : a string that uniquely characterizes the color sensor, for instance
     *         MyDevice.colorSensor.
     *
     * @return a YColorSensor object allowing you to drive the color sensor.
     */
    static FindColorSensorInContext(yctx, func) {
        let obj;
        obj = yocto_api_js_1.YFunction._FindFromCacheInContext(yctx, 'ColorSensor', func);
        if (obj == null) {
            obj = new YColorSensor(yctx, func);
            yocto_api_js_1.YFunction._AddToCache('ColorSensor', func, obj);
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
        this._valueCallbackColorSensor = callback;
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
        if (this._valueCallbackColorSensor != null) {
            try {
                await this._valueCallbackColorSensor(this, value);
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
     * Turns on the built-in illumination LEDs using the same current as used during the latest calibration.
     * On failure, throws an exception or returns a negative error code.
     */
    async turnLedOn() {
        return await this.set_ledCurrent(await this.get_ledCalibration());
    }
    /**
     * Turns off the built-in illumination LEDs.
     * On failure, throws an exception or returns a negative error code.
     */
    async turnLedOff() {
        return await this.set_ledCurrent(0);
    }
    /**
     * Continues the enumeration of color sensors started using yFirstColorSensor().
     * Caution: You can't make any assumption about the returned color sensors order.
     * If you want to find a specific a color sensor, use ColorSensor.findColorSensor()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YColorSensor object, corresponding to
     *         a color sensor currently online, or a null pointer
     *         if there are no more color sensors to enumerate.
     */
    nextColorSensor() {
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != yocto_api_js_1.YAPI.SUCCESS)
            return null;
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if (next_hwid == null)
            return null;
        return YColorSensor.FindColorSensorInContext(this._yapi, next_hwid);
    }
    /**
     * Starts the enumeration of color sensors currently accessible.
     * Use the method YColorSensor.nextColorSensor() to iterate on
     * next color sensors.
     *
     * @return a pointer to a YColorSensor object, corresponding to
     *         the first color sensor currently online, or a null pointer
     *         if there are none.
     */
    static FirstColorSensor() {
        let next_hwid = yocto_api_js_1.YAPI.imm_getFirstHardwareId('ColorSensor');
        if (next_hwid == null)
            return null;
        return YColorSensor.FindColorSensor(next_hwid);
    }
    /**
     * Starts the enumeration of color sensors currently accessible.
     * Use the method YColorSensor.nextColorSensor() to iterate on
     * next color sensors.
     *
     * @param yctx : a YAPI context.
     *
     * @return a pointer to a YColorSensor object, corresponding to
     *         the first color sensor currently online, or a null pointer
     *         if there are none.
     */
    static FirstColorSensorInContext(yctx) {
        let next_hwid = yctx.imm_getFirstHardwareId('ColorSensor');
        if (next_hwid == null)
            return null;
        return YColorSensor.FindColorSensorInContext(yctx, next_hwid);
    }
}
exports.YColorSensor = YColorSensor;
// API symbols as static members
YColorSensor.ESTIMATIONMODEL_REFLECTION = 0;
YColorSensor.ESTIMATIONMODEL_EMISSION = 1;
YColorSensor.ESTIMATIONMODEL_INVALID = -1;
YColorSensor.WORKINGMODE_AUTO = 0;
YColorSensor.WORKINGMODE_EXPERT = 1;
YColorSensor.WORKINGMODE_INVALID = -1;
YColorSensor.LEDCURRENT_INVALID = yocto_api_js_1.YAPI.INVALID_UINT;
YColorSensor.LEDCALIBRATION_INVALID = yocto_api_js_1.YAPI.INVALID_UINT;
YColorSensor.INTEGRATIONTIME_INVALID = yocto_api_js_1.YAPI.INVALID_UINT;
YColorSensor.GAIN_INVALID = yocto_api_js_1.YAPI.INVALID_UINT;
YColorSensor.SATURATION_INVALID = yocto_api_js_1.YAPI.INVALID_UINT;
YColorSensor.ESTIMATEDRGB_INVALID = yocto_api_js_1.YAPI.INVALID_UINT;
YColorSensor.ESTIMATEDHSL_INVALID = yocto_api_js_1.YAPI.INVALID_UINT;
YColorSensor.ESTIMATEDXYZ_INVALID = yocto_api_js_1.YAPI.INVALID_STRING;
YColorSensor.ESTIMATEDOKLAB_INVALID = yocto_api_js_1.YAPI.INVALID_STRING;
YColorSensor.NEARRAL1_INVALID = yocto_api_js_1.YAPI.INVALID_STRING;
YColorSensor.NEARRAL2_INVALID = yocto_api_js_1.YAPI.INVALID_STRING;
YColorSensor.NEARRAL3_INVALID = yocto_api_js_1.YAPI.INVALID_STRING;
YColorSensor.NEARHTMLCOLOR_INVALID = yocto_api_js_1.YAPI.INVALID_STRING;
YColorSensor.NEARSIMPLECOLORINDEX_BROWN = 0;
YColorSensor.NEARSIMPLECOLORINDEX_RED = 1;
YColorSensor.NEARSIMPLECOLORINDEX_ORANGE = 2;
YColorSensor.NEARSIMPLECOLORINDEX_YELLOW = 3;
YColorSensor.NEARSIMPLECOLORINDEX_WHITE = 4;
YColorSensor.NEARSIMPLECOLORINDEX_GRAY = 5;
YColorSensor.NEARSIMPLECOLORINDEX_BLACK = 6;
YColorSensor.NEARSIMPLECOLORINDEX_GREEN = 7;
YColorSensor.NEARSIMPLECOLORINDEX_BLUE = 8;
YColorSensor.NEARSIMPLECOLORINDEX_PURPLE = 9;
YColorSensor.NEARSIMPLECOLORINDEX_PINK = 10;
YColorSensor.NEARSIMPLECOLORINDEX_INVALID = -1;
YColorSensor.NEARSIMPLECOLOR_INVALID = yocto_api_js_1.YAPI.INVALID_STRING;
//# sourceMappingURL=yocto_colorsensor.js.map