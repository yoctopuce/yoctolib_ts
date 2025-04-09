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

import { YAPI, YAPIContext, YErrorMsg, YFunction, YModule, YSensor, YDataLogger, YMeasure } from './yocto_api.js';

//--- (YColorSensor class start)
/**
 * YColorSensor Class: color sensor control interface
 *
 * The YColorSensor class allows you to read and configure Yoctopuce color sensors.
 * It inherits from YSensor class the core functions to read measurements,
 * to register callback functions, and to access the autonomous datalogger.
 */
//--- (end of YColorSensor class start)

export class YColorSensor extends YFunction
{
    //--- (YColorSensor attributes declaration)
    _className: string;
    _estimationModel: YColorSensor.ESTIMATIONMODEL = YColorSensor.ESTIMATIONMODEL_INVALID;
    _workingMode: YColorSensor.WORKINGMODE = YColorSensor.WORKINGMODE_INVALID;
    _saturation: number = YColorSensor.SATURATION_INVALID;
    _ledCurrent: number = YColorSensor.LEDCURRENT_INVALID;
    _ledCalibration: number = YColorSensor.LEDCALIBRATION_INVALID;
    _integrationTime: number = YColorSensor.INTEGRATIONTIME_INVALID;
    _gain: number = YColorSensor.GAIN_INVALID;
    _estimatedRGB: number = YColorSensor.ESTIMATEDRGB_INVALID;
    _estimatedHSL: number = YColorSensor.ESTIMATEDHSL_INVALID;
    _estimatedXYZ: string = YColorSensor.ESTIMATEDXYZ_INVALID;
    _estimatedOkLab: string = YColorSensor.ESTIMATEDOKLAB_INVALID;
    _nearRAL1: string = YColorSensor.NEARRAL1_INVALID;
    _nearRAL2: string = YColorSensor.NEARRAL2_INVALID;
    _nearRAL3: string = YColorSensor.NEARRAL3_INVALID;
    _nearHTMLColor: string = YColorSensor.NEARHTMLCOLOR_INVALID;
    _nearSimpleColor: string = YColorSensor.NEARSIMPLECOLOR_INVALID;
    _nearSimpleColorIndex: YColorSensor.NEARSIMPLECOLORINDEX = YColorSensor.NEARSIMPLECOLORINDEX_INVALID;
    _valueCallbackColorSensor: YColorSensor.ValueCallback | null = null;

    // API symbols as object properties
    public readonly ESTIMATIONMODEL_REFLECTION: YColorSensor.ESTIMATIONMODEL = 0;
    public readonly ESTIMATIONMODEL_EMISSION: YColorSensor.ESTIMATIONMODEL = 1;
    public readonly ESTIMATIONMODEL_INVALID: YColorSensor.ESTIMATIONMODEL = -1;
    public readonly WORKINGMODE_AUTO: YColorSensor.WORKINGMODE = 0;
    public readonly WORKINGMODE_EXPERT: YColorSensor.WORKINGMODE = 1;
    public readonly WORKINGMODE_INVALID: YColorSensor.WORKINGMODE = -1;
    public readonly SATURATION_INVALID: number = YAPI.INVALID_UINT;
    public readonly LEDCURRENT_INVALID: number = YAPI.INVALID_UINT;
    public readonly LEDCALIBRATION_INVALID: number = YAPI.INVALID_UINT;
    public readonly INTEGRATIONTIME_INVALID: number = YAPI.INVALID_UINT;
    public readonly GAIN_INVALID: number = YAPI.INVALID_UINT;
    public readonly ESTIMATEDRGB_INVALID: number = YAPI.INVALID_UINT;
    public readonly ESTIMATEDHSL_INVALID: number = YAPI.INVALID_UINT;
    public readonly ESTIMATEDXYZ_INVALID: string = YAPI.INVALID_STRING;
    public readonly ESTIMATEDOKLAB_INVALID: string = YAPI.INVALID_STRING;
    public readonly NEARRAL1_INVALID: string = YAPI.INVALID_STRING;
    public readonly NEARRAL2_INVALID: string = YAPI.INVALID_STRING;
    public readonly NEARRAL3_INVALID: string = YAPI.INVALID_STRING;
    public readonly NEARHTMLCOLOR_INVALID: string = YAPI.INVALID_STRING;
    public readonly NEARSIMPLECOLOR_INVALID: string = YAPI.INVALID_STRING;
    public readonly NEARSIMPLECOLORINDEX_BROWN: YColorSensor.NEARSIMPLECOLORINDEX = 0;
    public readonly NEARSIMPLECOLORINDEX_RED: YColorSensor.NEARSIMPLECOLORINDEX = 1;
    public readonly NEARSIMPLECOLORINDEX_ORANGE: YColorSensor.NEARSIMPLECOLORINDEX = 2;
    public readonly NEARSIMPLECOLORINDEX_YELLOW: YColorSensor.NEARSIMPLECOLORINDEX = 3;
    public readonly NEARSIMPLECOLORINDEX_WHITE: YColorSensor.NEARSIMPLECOLORINDEX = 4;
    public readonly NEARSIMPLECOLORINDEX_GRAY: YColorSensor.NEARSIMPLECOLORINDEX = 5;
    public readonly NEARSIMPLECOLORINDEX_BLACK: YColorSensor.NEARSIMPLECOLORINDEX = 6;
    public readonly NEARSIMPLECOLORINDEX_GREEN: YColorSensor.NEARSIMPLECOLORINDEX = 7;
    public readonly NEARSIMPLECOLORINDEX_BLUE: YColorSensor.NEARSIMPLECOLORINDEX = 8;
    public readonly NEARSIMPLECOLORINDEX_PURPLE: YColorSensor.NEARSIMPLECOLORINDEX = 9;
    public readonly NEARSIMPLECOLORINDEX_PINK: YColorSensor.NEARSIMPLECOLORINDEX = 10;
    public readonly NEARSIMPLECOLORINDEX_INVALID: YColorSensor.NEARSIMPLECOLORINDEX = -1;

    // API symbols as static members
    public static readonly ESTIMATIONMODEL_REFLECTION: YColorSensor.ESTIMATIONMODEL = 0;
    public static readonly ESTIMATIONMODEL_EMISSION: YColorSensor.ESTIMATIONMODEL = 1;
    public static readonly ESTIMATIONMODEL_INVALID: YColorSensor.ESTIMATIONMODEL = -1;
    public static readonly WORKINGMODE_AUTO: YColorSensor.WORKINGMODE = 0;
    public static readonly WORKINGMODE_EXPERT: YColorSensor.WORKINGMODE = 1;
    public static readonly WORKINGMODE_INVALID: YColorSensor.WORKINGMODE = -1;
    public static readonly SATURATION_INVALID: number = YAPI.INVALID_UINT;
    public static readonly LEDCURRENT_INVALID: number = YAPI.INVALID_UINT;
    public static readonly LEDCALIBRATION_INVALID: number = YAPI.INVALID_UINT;
    public static readonly INTEGRATIONTIME_INVALID: number = YAPI.INVALID_UINT;
    public static readonly GAIN_INVALID: number = YAPI.INVALID_UINT;
    public static readonly ESTIMATEDRGB_INVALID: number = YAPI.INVALID_UINT;
    public static readonly ESTIMATEDHSL_INVALID: number = YAPI.INVALID_UINT;
    public static readonly ESTIMATEDXYZ_INVALID: string = YAPI.INVALID_STRING;
    public static readonly ESTIMATEDOKLAB_INVALID: string = YAPI.INVALID_STRING;
    public static readonly NEARRAL1_INVALID: string = YAPI.INVALID_STRING;
    public static readonly NEARRAL2_INVALID: string = YAPI.INVALID_STRING;
    public static readonly NEARRAL3_INVALID: string = YAPI.INVALID_STRING;
    public static readonly NEARHTMLCOLOR_INVALID: string = YAPI.INVALID_STRING;
    public static readonly NEARSIMPLECOLOR_INVALID: string = YAPI.INVALID_STRING;
    public static readonly NEARSIMPLECOLORINDEX_BROWN: YColorSensor.NEARSIMPLECOLORINDEX = 0;
    public static readonly NEARSIMPLECOLORINDEX_RED: YColorSensor.NEARSIMPLECOLORINDEX = 1;
    public static readonly NEARSIMPLECOLORINDEX_ORANGE: YColorSensor.NEARSIMPLECOLORINDEX = 2;
    public static readonly NEARSIMPLECOLORINDEX_YELLOW: YColorSensor.NEARSIMPLECOLORINDEX = 3;
    public static readonly NEARSIMPLECOLORINDEX_WHITE: YColorSensor.NEARSIMPLECOLORINDEX = 4;
    public static readonly NEARSIMPLECOLORINDEX_GRAY: YColorSensor.NEARSIMPLECOLORINDEX = 5;
    public static readonly NEARSIMPLECOLORINDEX_BLACK: YColorSensor.NEARSIMPLECOLORINDEX = 6;
    public static readonly NEARSIMPLECOLORINDEX_GREEN: YColorSensor.NEARSIMPLECOLORINDEX = 7;
    public static readonly NEARSIMPLECOLORINDEX_BLUE: YColorSensor.NEARSIMPLECOLORINDEX = 8;
    public static readonly NEARSIMPLECOLORINDEX_PURPLE: YColorSensor.NEARSIMPLECOLORINDEX = 9;
    public static readonly NEARSIMPLECOLORINDEX_PINK: YColorSensor.NEARSIMPLECOLORINDEX = 10;
    public static readonly NEARSIMPLECOLORINDEX_INVALID: YColorSensor.NEARSIMPLECOLORINDEX = -1;
    //--- (end of YColorSensor attributes declaration)

    constructor(yapi: YAPIContext, func: string)
    {
        //--- (YColorSensor constructor)
        super(yapi, func);
        this._className                  = 'ColorSensor';
        //--- (end of YColorSensor constructor)
    }

    //--- (YColorSensor implementation)

    imm_parseAttr(name: string, val: any): number
    {
        switch (name) {
        case 'estimationModel':
            this._estimationModel = <YColorSensor.ESTIMATIONMODEL> <number> val;
            return 1;
        case 'workingMode':
            this._workingMode = <YColorSensor.WORKINGMODE> <number> val;
            return 1;
        case 'saturation':
            this._saturation = <number> <number> val;
            return 1;
        case 'ledCurrent':
            this._ledCurrent = <number> <number> val;
            return 1;
        case 'ledCalibration':
            this._ledCalibration = <number> <number> val;
            return 1;
        case 'integrationTime':
            this._integrationTime = <number> <number> val;
            return 1;
        case 'gain':
            this._gain = <number> <number> val;
            return 1;
        case 'estimatedRGB':
            this._estimatedRGB = <number> <number> val;
            return 1;
        case 'estimatedHSL':
            this._estimatedHSL = <number> <number> val;
            return 1;
        case 'estimatedXYZ':
            this._estimatedXYZ = <string> <string> val;
            return 1;
        case 'estimatedOkLab':
            this._estimatedOkLab = <string> <string> val;
            return 1;
        case 'nearRAL1':
            this._nearRAL1 = <string> <string> val;
            return 1;
        case 'nearRAL2':
            this._nearRAL2 = <string> <string> val;
            return 1;
        case 'nearRAL3':
            this._nearRAL3 = <string> <string> val;
            return 1;
        case 'nearHTMLColor':
            this._nearHTMLColor = <string> <string> val;
            return 1;
        case 'nearSimpleColor':
            this._nearSimpleColor = <string> <string> val;
            return 1;
        case 'nearSimpleColorIndex':
            this._nearSimpleColorIndex = <YColorSensor.NEARSIMPLECOLORINDEX> <number> val;
            return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Returns the model for color estimation.
     *
     * @return either YColorSensor.ESTIMATIONMODEL_REFLECTION or YColorSensor.ESTIMATIONMODEL_EMISSION,
     * according to the model for color estimation
     *
     * On failure, throws an exception or returns YColorSensor.ESTIMATIONMODEL_INVALID.
     */
    async get_estimationModel(): Promise<YColorSensor.ESTIMATIONMODEL>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YColorSensor.ESTIMATIONMODEL_INVALID;
            }
        }
        res = this._estimationModel;
        return res;
    }

    /**
     * Changes the model for color estimation.
     * Remember to call the saveToFlash() method of the module if the modification must be kept.
     *
     * @param newval : either YColorSensor.ESTIMATIONMODEL_REFLECTION or
     * YColorSensor.ESTIMATIONMODEL_EMISSION, according to the model for color estimation
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_estimationModel(newval: YColorSensor.ESTIMATIONMODEL): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('estimationModel', rest_val);
    }

    /**
     * Returns the active working mode.
     *
     * @return either YColorSensor.WORKINGMODE_AUTO or YColorSensor.WORKINGMODE_EXPERT, according to the
     * active working mode
     *
     * On failure, throws an exception or returns YColorSensor.WORKINGMODE_INVALID.
     */
    async get_workingMode(): Promise<YColorSensor.WORKINGMODE>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YColorSensor.WORKINGMODE_INVALID;
            }
        }
        res = this._workingMode;
        return res;
    }

    /**
     * Changes the operating mode.
     * Remember to call the saveToFlash() method of the module if the modification must be kept.
     *
     * @param newval : either YColorSensor.WORKINGMODE_AUTO or YColorSensor.WORKINGMODE_EXPERT, according
     * to the operating mode
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_workingMode(newval: YColorSensor.WORKINGMODE): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('workingMode', rest_val);
    }

    /**
     * Returns the current saturation of the sensor.
     * This function updates the sensor's saturation value.
     *
     * @return an integer corresponding to the current saturation of the sensor
     *
     * On failure, throws an exception or returns YColorSensor.SATURATION_INVALID.
     */
    async get_saturation(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YColorSensor.SATURATION_INVALID;
            }
        }
        res = this._saturation;
        return res;
    }

    /**
     * Returns the current value of the LED.
     *
     * @return an integer corresponding to the current value of the LED
     *
     * On failure, throws an exception or returns YColorSensor.LEDCURRENT_INVALID.
     */
    async get_ledCurrent(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YColorSensor.LEDCURRENT_INVALID;
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
    async set_ledCurrent(newval: number): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('ledCurrent', rest_val);
    }

    /**
     * Returns the LED current at calibration.
     *
     * @return an integer corresponding to the LED current at calibration
     *
     * On failure, throws an exception or returns YColorSensor.LEDCALIBRATION_INVALID.
     */
    async get_ledCalibration(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YColorSensor.LEDCALIBRATION_INVALID;
            }
        }
        res = this._ledCalibration;
        return res;
    }

    /**
     * Sets the LED current for calibration.
     * Remember to call the saveToFlash() method of the module if the modification must be kept.
     *
     * @param newval : an integer
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_ledCalibration(newval: number): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('ledCalibration', rest_val);
    }

    /**
     * Returns the current integration time.
     * This method retrieves the integration time value
     * used for data processing and returns it as an integer or an object.
     *
     * @return an integer corresponding to the current integration time
     *
     * On failure, throws an exception or returns YColorSensor.INTEGRATIONTIME_INVALID.
     */
    async get_integrationTime(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YColorSensor.INTEGRATIONTIME_INVALID;
            }
        }
        res = this._integrationTime;
        return res;
    }

    /**
     * Changes the integration time for data processing.
     * This method takes a parameter and assigns it
     * as the new integration time. This affects the duration
     * for which data is integrated before being processed.
     * Remember to call the saveToFlash() method of the module if the modification must be kept.
     *
     * @param newval : an integer corresponding to the integration time for data processing
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_integrationTime(newval: number): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('integrationTime', rest_val);
    }

    /**
     * Returns the current gain.
     * This method updates the gain value.
     *
     * @return an integer corresponding to the current gain
     *
     * On failure, throws an exception or returns YColorSensor.GAIN_INVALID.
     */
    async get_gain(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YColorSensor.GAIN_INVALID;
            }
        }
        res = this._gain;
        return res;
    }

    /**
     * Changes the gain for signal processing.
     * This method takes a parameter and assigns it
     * as the new gain. This affects the sensitivity and
     * intensity of the processed signal.
     * Remember to call the saveToFlash() method of the module if the modification must be kept.
     *
     * @param newval : an integer corresponding to the gain for signal processing
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_gain(newval: number): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('gain', rest_val);
    }

    /**
     * Returns the estimated color in RGB format (0xRRGGBB).
     *
     * @return an integer corresponding to the estimated color in RGB format (0xRRGGBB)
     *
     * On failure, throws an exception or returns YColorSensor.ESTIMATEDRGB_INVALID.
     */
    async get_estimatedRGB(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YColorSensor.ESTIMATEDRGB_INVALID;
            }
        }
        res = this._estimatedRGB;
        return res;
    }

    /**
     * Returns the estimated color in HSL (Hue, Saturation, Lightness) format.
     *
     * @return an integer corresponding to the estimated color in HSL (Hue, Saturation, Lightness) format
     *
     * On failure, throws an exception or returns YColorSensor.ESTIMATEDHSL_INVALID.
     */
    async get_estimatedHSL(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YColorSensor.ESTIMATEDHSL_INVALID;
            }
        }
        res = this._estimatedHSL;
        return res;
    }

    /**
     * Returns the estimated color in XYZ format.
     *
     * @return a string corresponding to the estimated color in XYZ format
     *
     * On failure, throws an exception or returns YColorSensor.ESTIMATEDXYZ_INVALID.
     */
    async get_estimatedXYZ(): Promise<string>
    {
        let res: string;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YColorSensor.ESTIMATEDXYZ_INVALID;
            }
        }
        res = this._estimatedXYZ;
        return res;
    }

    /**
     * Returns the estimated color in OkLab format.
     *
     * @return a string corresponding to the estimated color in OkLab format
     *
     * On failure, throws an exception or returns YColorSensor.ESTIMATEDOKLAB_INVALID.
     */
    async get_estimatedOkLab(): Promise<string>
    {
        let res: string;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YColorSensor.ESTIMATEDOKLAB_INVALID;
            }
        }
        res = this._estimatedOkLab;
        return res;
    }

    /**
     * Returns the estimated color in RAL format.
     *
     * @return a string corresponding to the estimated color in RAL format
     *
     * On failure, throws an exception or returns YColorSensor.NEARRAL1_INVALID.
     */
    async get_nearRAL1(): Promise<string>
    {
        let res: string;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YColorSensor.NEARRAL1_INVALID;
            }
        }
        res = this._nearRAL1;
        return res;
    }

    /**
     * Returns the estimated color in RAL format.
     *
     * @return a string corresponding to the estimated color in RAL format
     *
     * On failure, throws an exception or returns YColorSensor.NEARRAL2_INVALID.
     */
    async get_nearRAL2(): Promise<string>
    {
        let res: string;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YColorSensor.NEARRAL2_INVALID;
            }
        }
        res = this._nearRAL2;
        return res;
    }

    /**
     * Returns the estimated color in RAL format.
     *
     * @return a string corresponding to the estimated color in RAL format
     *
     * On failure, throws an exception or returns YColorSensor.NEARRAL3_INVALID.
     */
    async get_nearRAL3(): Promise<string>
    {
        let res: string;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YColorSensor.NEARRAL3_INVALID;
            }
        }
        res = this._nearRAL3;
        return res;
    }

    /**
     * Returns the estimated HTML color .
     *
     * @return a string corresponding to the estimated HTML color
     *
     * On failure, throws an exception or returns YColorSensor.NEARHTMLCOLOR_INVALID.
     */
    async get_nearHTMLColor(): Promise<string>
    {
        let res: string;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YColorSensor.NEARHTMLCOLOR_INVALID;
            }
        }
        res = this._nearHTMLColor;
        return res;
    }

    /**
     * Returns the estimated color .
     *
     * @return a string corresponding to the estimated color
     *
     * On failure, throws an exception or returns YColorSensor.NEARSIMPLECOLOR_INVALID.
     */
    async get_nearSimpleColor(): Promise<string>
    {
        let res: string;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YColorSensor.NEARSIMPLECOLOR_INVALID;
            }
        }
        res = this._nearSimpleColor;
        return res;
    }

    /**
     * Returns the estimated color as an index.
     *
     * @return a value among YColorSensor.NEARSIMPLECOLORINDEX_BROWN,
     * YColorSensor.NEARSIMPLECOLORINDEX_RED, YColorSensor.NEARSIMPLECOLORINDEX_ORANGE,
     * YColorSensor.NEARSIMPLECOLORINDEX_YELLOW, YColorSensor.NEARSIMPLECOLORINDEX_WHITE,
     * YColorSensor.NEARSIMPLECOLORINDEX_GRAY, YColorSensor.NEARSIMPLECOLORINDEX_BLACK,
     * YColorSensor.NEARSIMPLECOLORINDEX_GREEN, YColorSensor.NEARSIMPLECOLORINDEX_BLUE,
     * YColorSensor.NEARSIMPLECOLORINDEX_PURPLE and YColorSensor.NEARSIMPLECOLORINDEX_PINK corresponding
     * to the estimated color as an index
     *
     * On failure, throws an exception or returns YColorSensor.NEARSIMPLECOLORINDEX_INVALID.
     */
    async get_nearSimpleColorIndex(): Promise<YColorSensor.NEARSIMPLECOLORINDEX>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YColorSensor.NEARSIMPLECOLORINDEX_INVALID;
            }
        }
        res = this._nearSimpleColorIndex;
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
    static FindColorSensor(func: string): YColorSensor
    {
        let obj: YColorSensor | null;
        obj = <YColorSensor> YFunction._FindFromCache('ColorSensor', func);
        if (obj == null) {
            obj = new YColorSensor(YAPI, func);
            YFunction._AddToCache('ColorSensor', func, obj);
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
    static FindColorSensorInContext(yctx: YAPIContext, func: string): YColorSensor
    {
        let obj: YColorSensor | null;
        obj = <YColorSensor> YFunction._FindFromCacheInContext(yctx, 'ColorSensor', func);
        if (obj == null) {
            obj = new YColorSensor(yctx, func);
            YFunction._AddToCache('ColorSensor', func, obj);
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
    async registerValueCallback(callback: YColorSensor.ValueCallback | null): Promise<number>
    {
        let val: string;
        if (callback != null) {
            await YFunction._UpdateValueCallbackList(this, true);
        } else {
            await YFunction._UpdateValueCallbackList(this, false);
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

    async _invokeValueCallback(value: string): Promise<number>
    {
        if (this._valueCallbackColorSensor != null) {
            try {
                await this._valueCallbackColorSensor(this, value);
            } catch (e) {
                this._yapi.imm_log('Exception in valueCallback:', e);
            }
        } else {
            await super._invokeValueCallback(value);
        }
        return 0;
    }

    /**
     * Turns on the LEDs at the current used during calibration.
     * On failure, throws an exception or returns YColorSensor.DATA_INVALID.
     */
    async turnLedOn(): Promise<number>
    {
        return await this.set_ledCurrent(await this.get_ledCalibration());
    }

    /**
     * Turns off the LEDs.
     * On failure, throws an exception or returns YColorSensor.DATA_INVALID.
     */
    async turnLedOff(): Promise<number>
    {
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
    nextColorSensor(): YColorSensor | null
    {
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != YAPI.SUCCESS) return null;
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, <string> resolve.result);
        if (next_hwid == null) return null;
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
    static FirstColorSensor(): YColorSensor | null
    {
        let next_hwid = YAPI.imm_getFirstHardwareId('ColorSensor');
        if (next_hwid == null) return null;
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
    static FirstColorSensorInContext(yctx: YAPIContext): YColorSensor | null
    {
        let next_hwid = yctx.imm_getFirstHardwareId('ColorSensor');
        if (next_hwid == null) return null;
        return YColorSensor.FindColorSensorInContext(yctx, next_hwid);
    }

    //--- (end of YColorSensor implementation)
}

export namespace YColorSensor {
    //--- (YColorSensor definitions)
    export const enum ESTIMATIONMODEL
    {
        REFLECTION = 0,
        EMISSION = 1,
        INVALID = -1
    }

    export const enum WORKINGMODE
    {
        AUTO = 0,
        EXPERT = 1,
        INVALID = -1
    }

    export const enum NEARSIMPLECOLORINDEX
    {
        BROWN = 0,
        RED = 1,
        ORANGE = 2,
        YELLOW = 3,
        WHITE = 4,
        GRAY = 5,
        BLACK = 6,
        GREEN = 7,
        BLUE = 8,
        PURPLE = 9,
        PINK = 10,
        INVALID = -1
    }

    export interface ValueCallback {(func: YColorSensor, value: string): void}

    //--- (end of YColorSensor definitions)
}

