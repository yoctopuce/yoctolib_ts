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
import { YAPIContext, YFunction } from './yocto_api.js';
/**
 * YSpectralSensor Class: spectral sensor control interface
 *
 * The YSpectralSensor class allows you to read and configure Yoctopuce spectral sensors.
 * It inherits from YSensor class the core functions to read measurements,
 * to register callback functions, and to access the autonomous datalogger.
 */
export declare class YSpectralSensor extends YFunction {
    _className: string;
    _ledCurrent: number;
    _resolution: number;
    _integrationTime: number;
    _gain: number;
    _estimationModel: YSpectralSensor.ESTIMATIONMODEL;
    _saturation: number;
    _estimatedRGB: number;
    _estimatedHSL: number;
    _estimatedXYZ: string;
    _estimatedOkLab: string;
    _nearRAL1: string;
    _nearRAL2: string;
    _nearRAL3: string;
    _nearHTMLColor: string;
    _ledCurrentAtPowerOn: number;
    _integrationTimeAtPowerOn: number;
    _gainAtPowerOn: number;
    _valueCallbackSpectralSensor: YSpectralSensor.ValueCallback | null;
    readonly LEDCURRENT_INVALID: number;
    readonly RESOLUTION_INVALID: number;
    readonly INTEGRATIONTIME_INVALID: number;
    readonly GAIN_INVALID: number;
    readonly ESTIMATIONMODEL_REFLECTION: YSpectralSensor.ESTIMATIONMODEL;
    readonly ESTIMATIONMODEL_EMISSION: YSpectralSensor.ESTIMATIONMODEL;
    readonly ESTIMATIONMODEL_INVALID: YSpectralSensor.ESTIMATIONMODEL;
    readonly SATURATION_INVALID: number;
    readonly ESTIMATEDRGB_INVALID: number;
    readonly ESTIMATEDHSL_INVALID: number;
    readonly ESTIMATEDXYZ_INVALID: string;
    readonly ESTIMATEDOKLAB_INVALID: string;
    readonly NEARRAL1_INVALID: string;
    readonly NEARRAL2_INVALID: string;
    readonly NEARRAL3_INVALID: string;
    readonly NEARHTMLCOLOR_INVALID: string;
    readonly LEDCURRENTATPOWERON_INVALID: number;
    readonly INTEGRATIONTIMEATPOWERON_INVALID: number;
    readonly GAINATPOWERON_INVALID: number;
    static readonly LEDCURRENT_INVALID: number;
    static readonly RESOLUTION_INVALID: number;
    static readonly INTEGRATIONTIME_INVALID: number;
    static readonly GAIN_INVALID: number;
    static readonly ESTIMATIONMODEL_REFLECTION: YSpectralSensor.ESTIMATIONMODEL;
    static readonly ESTIMATIONMODEL_EMISSION: YSpectralSensor.ESTIMATIONMODEL;
    static readonly ESTIMATIONMODEL_INVALID: YSpectralSensor.ESTIMATIONMODEL;
    static readonly SATURATION_INVALID: number;
    static readonly ESTIMATEDRGB_INVALID: number;
    static readonly ESTIMATEDHSL_INVALID: number;
    static readonly ESTIMATEDXYZ_INVALID: string;
    static readonly ESTIMATEDOKLAB_INVALID: string;
    static readonly NEARRAL1_INVALID: string;
    static readonly NEARRAL2_INVALID: string;
    static readonly NEARRAL3_INVALID: string;
    static readonly NEARHTMLCOLOR_INVALID: string;
    static readonly LEDCURRENTATPOWERON_INVALID: number;
    static readonly INTEGRATIONTIMEATPOWERON_INVALID: number;
    static readonly GAINATPOWERON_INVALID: number;
    constructor(yapi: YAPIContext, func: string);
    imm_parseAttr(name: string, val: any): number;
    /**
     * Returns the current value of the LED.
     * This method retrieves the current flowing through the LED
     * and returns it as an integer or an object.
     *
     * @return an integer corresponding to the current value of the LED
     *
     * On failure, throws an exception or returns YSpectralSensor.LEDCURRENT_INVALID.
     */
    get_ledCurrent(): Promise<number>;
    /**
     * Changes the luminosity of the module leds. The parameter is a
     * value between 0 and 100.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : an integer corresponding to the luminosity of the module leds
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_ledCurrent(newval: number): Promise<number>;
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
    set_resolution(newval: number): Promise<number>;
    /**
     * Returns the resolution of the measured values. The resolution corresponds to the numerical precision
     * of the measures, which is not always the same as the actual precision of the sensor.
     * Remember to call the saveToFlash() method of the module if the modification must be kept.
     *
     * @return a floating point number corresponding to the resolution of the measured values
     *
     * On failure, throws an exception or returns YSpectralSensor.RESOLUTION_INVALID.
     */
    get_resolution(): Promise<number>;
    /**
     * Returns the current integration time.
     * This method retrieves the integration time value
     * used for data processing and returns it as an integer or an object.
     *
     * @return an integer corresponding to the current integration time
     *
     * On failure, throws an exception or returns YSpectralSensor.INTEGRATIONTIME_INVALID.
     */
    get_integrationTime(): Promise<number>;
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
    set_integrationTime(newval: number): Promise<number>;
    /**
     * Retrieves the current gain.
     * This method updates the gain value.
     *
     * @return an integer
     *
     * On failure, throws an exception or returns YSpectralSensor.GAIN_INVALID.
     */
    get_gain(): Promise<number>;
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
    set_gain(newval: number): Promise<number>;
    /**
     * Return the model for the estimation colors.
     *
     * @return either YSpectralSensor.ESTIMATIONMODEL_REFLECTION or YSpectralSensor.ESTIMATIONMODEL_EMISSION
     *
     * On failure, throws an exception or returns YSpectralSensor.ESTIMATIONMODEL_INVALID.
     */
    get_estimationModel(): Promise<YSpectralSensor.ESTIMATIONMODEL>;
    /**
     * Change the model for the estimation colors.
     *
     * @param newval : either YSpectralSensor.ESTIMATIONMODEL_REFLECTION or YSpectralSensor.ESTIMATIONMODEL_EMISSION
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_estimationModel(newval: YSpectralSensor.ESTIMATIONMODEL): Promise<number>;
    /**
     * Returns the current saturation of the sensor.
     * This function updates the sensor's saturation value.
     *
     * @return an integer corresponding to the current saturation of the sensor
     *
     * On failure, throws an exception or returns YSpectralSensor.SATURATION_INVALID.
     */
    get_saturation(): Promise<number>;
    /**
     * Returns the estimated color in RGB format.
     * This method retrieves the estimated color values
     * and returns them as an RGB object or structure.
     *
     * @return an integer corresponding to the estimated color in RGB format
     *
     * On failure, throws an exception or returns YSpectralSensor.ESTIMATEDRGB_INVALID.
     */
    get_estimatedRGB(): Promise<number>;
    /**
     * Returns the estimated color in HSL format.
     * This method retrieves the estimated color values
     * and returns them as an HSL object or structure.
     *
     * @return an integer corresponding to the estimated color in HSL format
     *
     * On failure, throws an exception or returns YSpectralSensor.ESTIMATEDHSL_INVALID.
     */
    get_estimatedHSL(): Promise<number>;
    /**
     * Returns the estimated color in XYZ format.
     * This method retrieves the estimated color values
     * and returns them as an XYZ object or structure.
     *
     * @return a string corresponding to the estimated color in XYZ format
     *
     * On failure, throws an exception or returns YSpectralSensor.ESTIMATEDXYZ_INVALID.
     */
    get_estimatedXYZ(): Promise<string>;
    /**
     * Returns the estimated color in OkLab format.
     * This method retrieves the estimated color values
     * and returns them as an OkLab object or structure.
     *
     * @return a string corresponding to the estimated color in OkLab format
     *
     * On failure, throws an exception or returns YSpectralSensor.ESTIMATEDOKLAB_INVALID.
     */
    get_estimatedOkLab(): Promise<string>;
    get_nearRAL1(): Promise<string>;
    get_nearRAL2(): Promise<string>;
    get_nearRAL3(): Promise<string>;
    get_nearHTMLColor(): Promise<string>;
    get_ledCurrentAtPowerOn(): Promise<number>;
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
    set_ledCurrentAtPowerOn(newval: number): Promise<number>;
    /**
     * Retrieves the integration time at power-on.
     * This method updates the power-on integration time value.
     *
     * @return an integer
     *
     * On failure, throws an exception or returns YSpectralSensor.INTEGRATIONTIMEATPOWERON_INVALID.
     */
    get_integrationTimeAtPowerOn(): Promise<number>;
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
    set_integrationTimeAtPowerOn(newval: number): Promise<number>;
    get_gainAtPowerOn(): Promise<number>;
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
    set_gainAtPowerOn(newval: number): Promise<number>;
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
    static FindSpectralSensor(func: string): YSpectralSensor;
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
    static FindSpectralSensorInContext(yctx: YAPIContext, func: string): YSpectralSensor;
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
    registerValueCallback(callback: YSpectralSensor.ValueCallback | null): Promise<number>;
    _invokeValueCallback(value: string): Promise<number>;
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
    nextSpectralSensor(): YSpectralSensor | null;
    /**
     * Starts the enumeration of spectral sensors currently accessible.
     * Use the method YSpectralSensor.nextSpectralSensor() to iterate on
     * next spectral sensors.
     *
     * @return a pointer to a YSpectralSensor object, corresponding to
     *         the first spectral sensor currently online, or a null pointer
     *         if there are none.
     */
    static FirstSpectralSensor(): YSpectralSensor | null;
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
    static FirstSpectralSensorInContext(yctx: YAPIContext): YSpectralSensor | null;
}
export declare namespace YSpectralSensor {
    const enum ESTIMATIONMODEL {
        REFLECTION = 0,
        EMISSION = 1,
        INVALID = -1
    }
    interface ValueCallback {
        (func: YSpectralSensor, value: string): void;
    }
}
