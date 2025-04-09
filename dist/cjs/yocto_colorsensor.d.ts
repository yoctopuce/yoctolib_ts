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
import { YAPIContext, YFunction } from './yocto_api.js';
/**
 * YColorSensor Class: color sensor control interface
 *
 * The YColorSensor class allows you to read and configure Yoctopuce color sensors.
 * It inherits from YSensor class the core functions to read measurements,
 * to register callback functions, and to access the autonomous datalogger.
 */
export declare class YColorSensor extends YFunction {
    _className: string;
    _estimationModel: YColorSensor.ESTIMATIONMODEL;
    _workingMode: YColorSensor.WORKINGMODE;
    _saturation: number;
    _ledCurrent: number;
    _ledCalibration: number;
    _integrationTime: number;
    _gain: number;
    _estimatedRGB: number;
    _estimatedHSL: number;
    _estimatedXYZ: string;
    _estimatedOkLab: string;
    _nearRAL1: string;
    _nearRAL2: string;
    _nearRAL3: string;
    _nearHTMLColor: string;
    _nearSimpleColor: string;
    _nearSimpleColorIndex: YColorSensor.NEARSIMPLECOLORINDEX;
    _valueCallbackColorSensor: YColorSensor.ValueCallback | null;
    readonly ESTIMATIONMODEL_REFLECTION: YColorSensor.ESTIMATIONMODEL;
    readonly ESTIMATIONMODEL_EMISSION: YColorSensor.ESTIMATIONMODEL;
    readonly ESTIMATIONMODEL_INVALID: YColorSensor.ESTIMATIONMODEL;
    readonly WORKINGMODE_AUTO: YColorSensor.WORKINGMODE;
    readonly WORKINGMODE_EXPERT: YColorSensor.WORKINGMODE;
    readonly WORKINGMODE_INVALID: YColorSensor.WORKINGMODE;
    readonly SATURATION_INVALID: number;
    readonly LEDCURRENT_INVALID: number;
    readonly LEDCALIBRATION_INVALID: number;
    readonly INTEGRATIONTIME_INVALID: number;
    readonly GAIN_INVALID: number;
    readonly ESTIMATEDRGB_INVALID: number;
    readonly ESTIMATEDHSL_INVALID: number;
    readonly ESTIMATEDXYZ_INVALID: string;
    readonly ESTIMATEDOKLAB_INVALID: string;
    readonly NEARRAL1_INVALID: string;
    readonly NEARRAL2_INVALID: string;
    readonly NEARRAL3_INVALID: string;
    readonly NEARHTMLCOLOR_INVALID: string;
    readonly NEARSIMPLECOLOR_INVALID: string;
    readonly NEARSIMPLECOLORINDEX_BROWN: YColorSensor.NEARSIMPLECOLORINDEX;
    readonly NEARSIMPLECOLORINDEX_RED: YColorSensor.NEARSIMPLECOLORINDEX;
    readonly NEARSIMPLECOLORINDEX_ORANGE: YColorSensor.NEARSIMPLECOLORINDEX;
    readonly NEARSIMPLECOLORINDEX_YELLOW: YColorSensor.NEARSIMPLECOLORINDEX;
    readonly NEARSIMPLECOLORINDEX_WHITE: YColorSensor.NEARSIMPLECOLORINDEX;
    readonly NEARSIMPLECOLORINDEX_GRAY: YColorSensor.NEARSIMPLECOLORINDEX;
    readonly NEARSIMPLECOLORINDEX_BLACK: YColorSensor.NEARSIMPLECOLORINDEX;
    readonly NEARSIMPLECOLORINDEX_GREEN: YColorSensor.NEARSIMPLECOLORINDEX;
    readonly NEARSIMPLECOLORINDEX_BLUE: YColorSensor.NEARSIMPLECOLORINDEX;
    readonly NEARSIMPLECOLORINDEX_PURPLE: YColorSensor.NEARSIMPLECOLORINDEX;
    readonly NEARSIMPLECOLORINDEX_PINK: YColorSensor.NEARSIMPLECOLORINDEX;
    readonly NEARSIMPLECOLORINDEX_INVALID: YColorSensor.NEARSIMPLECOLORINDEX;
    static readonly ESTIMATIONMODEL_REFLECTION: YColorSensor.ESTIMATIONMODEL;
    static readonly ESTIMATIONMODEL_EMISSION: YColorSensor.ESTIMATIONMODEL;
    static readonly ESTIMATIONMODEL_INVALID: YColorSensor.ESTIMATIONMODEL;
    static readonly WORKINGMODE_AUTO: YColorSensor.WORKINGMODE;
    static readonly WORKINGMODE_EXPERT: YColorSensor.WORKINGMODE;
    static readonly WORKINGMODE_INVALID: YColorSensor.WORKINGMODE;
    static readonly SATURATION_INVALID: number;
    static readonly LEDCURRENT_INVALID: number;
    static readonly LEDCALIBRATION_INVALID: number;
    static readonly INTEGRATIONTIME_INVALID: number;
    static readonly GAIN_INVALID: number;
    static readonly ESTIMATEDRGB_INVALID: number;
    static readonly ESTIMATEDHSL_INVALID: number;
    static readonly ESTIMATEDXYZ_INVALID: string;
    static readonly ESTIMATEDOKLAB_INVALID: string;
    static readonly NEARRAL1_INVALID: string;
    static readonly NEARRAL2_INVALID: string;
    static readonly NEARRAL3_INVALID: string;
    static readonly NEARHTMLCOLOR_INVALID: string;
    static readonly NEARSIMPLECOLOR_INVALID: string;
    static readonly NEARSIMPLECOLORINDEX_BROWN: YColorSensor.NEARSIMPLECOLORINDEX;
    static readonly NEARSIMPLECOLORINDEX_RED: YColorSensor.NEARSIMPLECOLORINDEX;
    static readonly NEARSIMPLECOLORINDEX_ORANGE: YColorSensor.NEARSIMPLECOLORINDEX;
    static readonly NEARSIMPLECOLORINDEX_YELLOW: YColorSensor.NEARSIMPLECOLORINDEX;
    static readonly NEARSIMPLECOLORINDEX_WHITE: YColorSensor.NEARSIMPLECOLORINDEX;
    static readonly NEARSIMPLECOLORINDEX_GRAY: YColorSensor.NEARSIMPLECOLORINDEX;
    static readonly NEARSIMPLECOLORINDEX_BLACK: YColorSensor.NEARSIMPLECOLORINDEX;
    static readonly NEARSIMPLECOLORINDEX_GREEN: YColorSensor.NEARSIMPLECOLORINDEX;
    static readonly NEARSIMPLECOLORINDEX_BLUE: YColorSensor.NEARSIMPLECOLORINDEX;
    static readonly NEARSIMPLECOLORINDEX_PURPLE: YColorSensor.NEARSIMPLECOLORINDEX;
    static readonly NEARSIMPLECOLORINDEX_PINK: YColorSensor.NEARSIMPLECOLORINDEX;
    static readonly NEARSIMPLECOLORINDEX_INVALID: YColorSensor.NEARSIMPLECOLORINDEX;
    constructor(yapi: YAPIContext, func: string);
    imm_parseAttr(name: string, val: any): number;
    /**
     * Returns the model for color estimation.
     *
     * @return either YColorSensor.ESTIMATIONMODEL_REFLECTION or YColorSensor.ESTIMATIONMODEL_EMISSION,
     * according to the model for color estimation
     *
     * On failure, throws an exception or returns YColorSensor.ESTIMATIONMODEL_INVALID.
     */
    get_estimationModel(): Promise<YColorSensor.ESTIMATIONMODEL>;
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
    set_estimationModel(newval: YColorSensor.ESTIMATIONMODEL): Promise<number>;
    /**
     * Returns the active working mode.
     *
     * @return either YColorSensor.WORKINGMODE_AUTO or YColorSensor.WORKINGMODE_EXPERT, according to the
     * active working mode
     *
     * On failure, throws an exception or returns YColorSensor.WORKINGMODE_INVALID.
     */
    get_workingMode(): Promise<YColorSensor.WORKINGMODE>;
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
    set_workingMode(newval: YColorSensor.WORKINGMODE): Promise<number>;
    /**
     * Returns the current saturation of the sensor.
     * This function updates the sensor's saturation value.
     *
     * @return an integer corresponding to the current saturation of the sensor
     *
     * On failure, throws an exception or returns YColorSensor.SATURATION_INVALID.
     */
    get_saturation(): Promise<number>;
    /**
     * Returns the current value of the LED.
     *
     * @return an integer corresponding to the current value of the LED
     *
     * On failure, throws an exception or returns YColorSensor.LEDCURRENT_INVALID.
     */
    get_ledCurrent(): Promise<number>;
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
    set_ledCurrent(newval: number): Promise<number>;
    /**
     * Returns the LED current at calibration.
     *
     * @return an integer corresponding to the LED current at calibration
     *
     * On failure, throws an exception or returns YColorSensor.LEDCALIBRATION_INVALID.
     */
    get_ledCalibration(): Promise<number>;
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
    set_ledCalibration(newval: number): Promise<number>;
    /**
     * Returns the current integration time.
     * This method retrieves the integration time value
     * used for data processing and returns it as an integer or an object.
     *
     * @return an integer corresponding to the current integration time
     *
     * On failure, throws an exception or returns YColorSensor.INTEGRATIONTIME_INVALID.
     */
    get_integrationTime(): Promise<number>;
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
    set_integrationTime(newval: number): Promise<number>;
    /**
     * Returns the current gain.
     * This method updates the gain value.
     *
     * @return an integer corresponding to the current gain
     *
     * On failure, throws an exception or returns YColorSensor.GAIN_INVALID.
     */
    get_gain(): Promise<number>;
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
    set_gain(newval: number): Promise<number>;
    /**
     * Returns the estimated color in RGB format (0xRRGGBB).
     *
     * @return an integer corresponding to the estimated color in RGB format (0xRRGGBB)
     *
     * On failure, throws an exception or returns YColorSensor.ESTIMATEDRGB_INVALID.
     */
    get_estimatedRGB(): Promise<number>;
    /**
     * Returns the estimated color in HSL (Hue, Saturation, Lightness) format.
     *
     * @return an integer corresponding to the estimated color in HSL (Hue, Saturation, Lightness) format
     *
     * On failure, throws an exception or returns YColorSensor.ESTIMATEDHSL_INVALID.
     */
    get_estimatedHSL(): Promise<number>;
    /**
     * Returns the estimated color in XYZ format.
     *
     * @return a string corresponding to the estimated color in XYZ format
     *
     * On failure, throws an exception or returns YColorSensor.ESTIMATEDXYZ_INVALID.
     */
    get_estimatedXYZ(): Promise<string>;
    /**
     * Returns the estimated color in OkLab format.
     *
     * @return a string corresponding to the estimated color in OkLab format
     *
     * On failure, throws an exception or returns YColorSensor.ESTIMATEDOKLAB_INVALID.
     */
    get_estimatedOkLab(): Promise<string>;
    /**
     * Returns the estimated color in RAL format.
     *
     * @return a string corresponding to the estimated color in RAL format
     *
     * On failure, throws an exception or returns YColorSensor.NEARRAL1_INVALID.
     */
    get_nearRAL1(): Promise<string>;
    /**
     * Returns the estimated color in RAL format.
     *
     * @return a string corresponding to the estimated color in RAL format
     *
     * On failure, throws an exception or returns YColorSensor.NEARRAL2_INVALID.
     */
    get_nearRAL2(): Promise<string>;
    /**
     * Returns the estimated color in RAL format.
     *
     * @return a string corresponding to the estimated color in RAL format
     *
     * On failure, throws an exception or returns YColorSensor.NEARRAL3_INVALID.
     */
    get_nearRAL3(): Promise<string>;
    /**
     * Returns the estimated HTML color .
     *
     * @return a string corresponding to the estimated HTML color
     *
     * On failure, throws an exception or returns YColorSensor.NEARHTMLCOLOR_INVALID.
     */
    get_nearHTMLColor(): Promise<string>;
    /**
     * Returns the estimated color .
     *
     * @return a string corresponding to the estimated color
     *
     * On failure, throws an exception or returns YColorSensor.NEARSIMPLECOLOR_INVALID.
     */
    get_nearSimpleColor(): Promise<string>;
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
    get_nearSimpleColorIndex(): Promise<YColorSensor.NEARSIMPLECOLORINDEX>;
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
    static FindColorSensor(func: string): YColorSensor;
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
    static FindColorSensorInContext(yctx: YAPIContext, func: string): YColorSensor;
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
    registerValueCallback(callback: YColorSensor.ValueCallback | null): Promise<number>;
    _invokeValueCallback(value: string): Promise<number>;
    /**
     * Turns on the LEDs at the current used during calibration.
     * On failure, throws an exception or returns YColorSensor.DATA_INVALID.
     */
    turnLedOn(): Promise<number>;
    /**
     * Turns off the LEDs.
     * On failure, throws an exception or returns YColorSensor.DATA_INVALID.
     */
    turnLedOff(): Promise<number>;
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
    nextColorSensor(): YColorSensor | null;
    /**
     * Starts the enumeration of color sensors currently accessible.
     * Use the method YColorSensor.nextColorSensor() to iterate on
     * next color sensors.
     *
     * @return a pointer to a YColorSensor object, corresponding to
     *         the first color sensor currently online, or a null pointer
     *         if there are none.
     */
    static FirstColorSensor(): YColorSensor | null;
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
    static FirstColorSensorInContext(yctx: YAPIContext): YColorSensor | null;
}
export declare namespace YColorSensor {
    const enum ESTIMATIONMODEL {
        REFLECTION = 0,
        EMISSION = 1,
        INVALID = -1
    }
    const enum WORKINGMODE {
        AUTO = 0,
        EXPERT = 1,
        INVALID = -1
    }
    const enum NEARSIMPLECOLORINDEX {
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
    interface ValueCallback {
        (func: YColorSensor, value: string): void;
    }
}
