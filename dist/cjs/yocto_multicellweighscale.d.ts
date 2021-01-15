/*********************************************************************
 *
 *  $Id: svn_id $
 *
 *  Implements the high-level API for MultiCellWeighScale functions
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
import { YAPIContext, YSensor, YMeasure } from './yocto_api.js';
export declare const enum Y_ExternalSense {
    FALSE = 0,
    TRUE = 1,
    INVALID = -1
}
export declare const enum Y_Excitation {
    OFF = 0,
    DC = 1,
    AC = 2,
    INVALID = -1
}
export interface YMultiCellWeighScaleValueCallback {
    (func: YMultiCellWeighScale, value: string): void;
}
export interface YMultiCellWeighScaleTimedReportCallback {
    (func: YMultiCellWeighScale, measure: YMeasure): void;
}
/**
 * YMultiCellWeighScale Class: multi-cell weighing scale sensor control interface, available for
 * instance in the Yocto-MaxiBridge
 *
 * The YMultiCellWeighScale class provides a weight measurement from a set of ratiometric
 * sensors. It can be used to control the bridge excitation parameters, in order to avoid
 * measure shifts caused by temperature variation in the electronics, and can also
 * automatically apply an additional correction factor based on temperature to
 * compensate for offsets in the load cells themselves.
 */
export declare class YMultiCellWeighScale extends YSensor {
    _className: string;
    _cellCount: number;
    _externalSense: Y_ExternalSense;
    _excitation: Y_Excitation;
    _tempAvgAdaptRatio: number;
    _tempChgAdaptRatio: number;
    _compTempAvg: number;
    _compTempChg: number;
    _compensation: number;
    _zeroTracking: number;
    _command: string;
    _valueCallbackMultiCellWeighScale: YMultiCellWeighScaleValueCallback | null;
    _timedReportCallbackMultiCellWeighScale: YMultiCellWeighScaleTimedReportCallback | null;
    readonly CELLCOUNT_INVALID: number;
    readonly EXTERNALSENSE_FALSE: Y_ExternalSense;
    readonly EXTERNALSENSE_TRUE: Y_ExternalSense;
    readonly EXTERNALSENSE_INVALID: Y_ExternalSense;
    readonly EXCITATION_OFF: Y_Excitation;
    readonly EXCITATION_DC: Y_Excitation;
    readonly EXCITATION_AC: Y_Excitation;
    readonly EXCITATION_INVALID: Y_Excitation;
    readonly TEMPAVGADAPTRATIO_INVALID: number;
    readonly TEMPCHGADAPTRATIO_INVALID: number;
    readonly COMPTEMPAVG_INVALID: number;
    readonly COMPTEMPCHG_INVALID: number;
    readonly COMPENSATION_INVALID: number;
    readonly ZEROTRACKING_INVALID: number;
    readonly COMMAND_INVALID: string;
    static readonly CELLCOUNT_INVALID: number;
    static readonly EXTERNALSENSE_FALSE: Y_ExternalSense;
    static readonly EXTERNALSENSE_TRUE: Y_ExternalSense;
    static readonly EXTERNALSENSE_INVALID: Y_ExternalSense;
    static readonly EXCITATION_OFF: Y_Excitation;
    static readonly EXCITATION_DC: Y_Excitation;
    static readonly EXCITATION_AC: Y_Excitation;
    static readonly EXCITATION_INVALID: Y_Excitation;
    static readonly TEMPAVGADAPTRATIO_INVALID: number;
    static readonly TEMPCHGADAPTRATIO_INVALID: number;
    static readonly COMPTEMPAVG_INVALID: number;
    static readonly COMPTEMPCHG_INVALID: number;
    static readonly COMPENSATION_INVALID: number;
    static readonly ZEROTRACKING_INVALID: number;
    static readonly COMMAND_INVALID: string;
    constructor(yapi: YAPIContext, func: string);
    imm_parseAttr(name: string, val: any): 0 | 1;
    /**
     * Changes the measuring unit for the weight.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : a string corresponding to the measuring unit for the weight
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_unit(newval: string): Promise<number>;
    /**
     * Returns the number of load cells in use.
     *
     * @return an integer corresponding to the number of load cells in use
     *
     * On failure, throws an exception or returns Y_CELLCOUNT_INVALID.
     */
    get_cellCount(): Promise<number>;
    /**
     * Changes the number of load cells in use. Remember to call the saveToFlash()
     * method of the module if the modification must be kept.
     *
     * @param newval : an integer corresponding to the number of load cells in use
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_cellCount(newval: number): Promise<number>;
    /**
     * Returns true if entry 4 is used as external sense for 6-wires load cells.
     *
     * @return either Y_EXTERNALSENSE_FALSE or Y_EXTERNALSENSE_TRUE, according to true if entry 4 is used
     * as external sense for 6-wires load cells
     *
     * On failure, throws an exception or returns Y_EXTERNALSENSE_INVALID.
     */
    get_externalSense(): Promise<Y_ExternalSense>;
    /**
     * Changes the configuration to tell if entry 4 is used as external sense for
     * 6-wires load cells. Remember to call the saveToFlash() method of the
     * module if the modification must be kept.
     *
     * @param newval : either Y_EXTERNALSENSE_FALSE or Y_EXTERNALSENSE_TRUE, according to the
     * configuration to tell if entry 4 is used as external sense for
     *         6-wires load cells
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_externalSense(newval: Y_ExternalSense): Promise<number>;
    /**
     * Returns the current load cell bridge excitation method.
     *
     * @return a value among Y_EXCITATION_OFF, Y_EXCITATION_DC and Y_EXCITATION_AC corresponding to the
     * current load cell bridge excitation method
     *
     * On failure, throws an exception or returns Y_EXCITATION_INVALID.
     */
    get_excitation(): Promise<Y_Excitation>;
    /**
     * Changes the current load cell bridge excitation method.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : a value among Y_EXCITATION_OFF, Y_EXCITATION_DC and Y_EXCITATION_AC corresponding
     * to the current load cell bridge excitation method
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_excitation(newval: Y_Excitation): Promise<number>;
    /**
     * Changes the averaged temperature update rate, in per mille.
     * The purpose of this adaptation ratio is to model the thermal inertia of the load cell.
     * The averaged temperature is updated every 10 seconds, by applying this adaptation rate
     * to the difference between the measures ambient temperature and the current compensation
     * temperature. The standard rate is 0.2 per mille, and the maximal rate is 65 per mille.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : a floating point number corresponding to the averaged temperature update rate, in per mille
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_tempAvgAdaptRatio(newval: number): Promise<number>;
    /**
     * Returns the averaged temperature update rate, in per mille.
     * The purpose of this adaptation ratio is to model the thermal inertia of the load cell.
     * The averaged temperature is updated every 10 seconds, by applying this adaptation rate
     * to the difference between the measures ambient temperature and the current compensation
     * temperature. The standard rate is 0.2 per mille, and the maximal rate is 65 per mille.
     *
     * @return a floating point number corresponding to the averaged temperature update rate, in per mille
     *
     * On failure, throws an exception or returns Y_TEMPAVGADAPTRATIO_INVALID.
     */
    get_tempAvgAdaptRatio(): Promise<number>;
    /**
     * Changes the temperature change update rate, in per mille.
     * The temperature change is updated every 10 seconds, by applying this adaptation rate
     * to the difference between the measures ambient temperature and the current temperature used for
     * change compensation. The standard rate is 0.6 per mille, and the maximal rate is 65 per mille.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : a floating point number corresponding to the temperature change update rate, in per mille
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_tempChgAdaptRatio(newval: number): Promise<number>;
    /**
     * Returns the temperature change update rate, in per mille.
     * The temperature change is updated every 10 seconds, by applying this adaptation rate
     * to the difference between the measures ambient temperature and the current temperature used for
     * change compensation. The standard rate is 0.6 per mille, and the maximal rate is 65 per mille.
     *
     * @return a floating point number corresponding to the temperature change update rate, in per mille
     *
     * On failure, throws an exception or returns Y_TEMPCHGADAPTRATIO_INVALID.
     */
    get_tempChgAdaptRatio(): Promise<number>;
    /**
     * Returns the current averaged temperature, used for thermal compensation.
     *
     * @return a floating point number corresponding to the current averaged temperature, used for thermal compensation
     *
     * On failure, throws an exception or returns Y_COMPTEMPAVG_INVALID.
     */
    get_compTempAvg(): Promise<number>;
    /**
     * Returns the current temperature variation, used for thermal compensation.
     *
     * @return a floating point number corresponding to the current temperature variation, used for
     * thermal compensation
     *
     * On failure, throws an exception or returns Y_COMPTEMPCHG_INVALID.
     */
    get_compTempChg(): Promise<number>;
    /**
     * Returns the current current thermal compensation value.
     *
     * @return a floating point number corresponding to the current current thermal compensation value
     *
     * On failure, throws an exception or returns Y_COMPENSATION_INVALID.
     */
    get_compensation(): Promise<number>;
    /**
     * Changes the zero tracking threshold value. When this threshold is larger than
     * zero, any measure under the threshold will automatically be ignored and the
     * zero compensation will be updated.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : a floating point number corresponding to the zero tracking threshold value
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_zeroTracking(newval: number): Promise<number>;
    /**
     * Returns the zero tracking threshold value. When this threshold is larger than
     * zero, any measure under the threshold will automatically be ignored and the
     * zero compensation will be updated.
     *
     * @return a floating point number corresponding to the zero tracking threshold value
     *
     * On failure, throws an exception or returns Y_ZEROTRACKING_INVALID.
     */
    get_zeroTracking(): Promise<number>;
    get_command(): Promise<string>;
    set_command(newval: string): Promise<number>;
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
     * Use the method YMultiCellWeighScale.isOnline() to test if $THEFUNCTION$ is
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
     * @return a YMultiCellWeighScale object allowing you to drive $THEFUNCTION$.
     */
    static FindMultiCellWeighScale(func: string): YMultiCellWeighScale;
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
     * Use the method YMultiCellWeighScale.isOnline() to test if $THEFUNCTION$ is
     * indeed online at a given time. In case of ambiguity when looking for
     * $AFUNCTION$ by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx : a YAPI context
     * @param func : a string that uniquely characterizes $THEFUNCTION$, for instance
     *         $FULLHARDWAREID$.
     *
     * @return a YMultiCellWeighScale object allowing you to drive $THEFUNCTION$.
     */
    static FindMultiCellWeighScaleInContext(yctx: YAPIContext, func: string): YMultiCellWeighScale;
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
    registerValueCallback(callback: YMultiCellWeighScaleValueCallback | null): Promise<number>;
    _invokeValueCallback(value: string): Promise<number>;
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
    registerTimedReportCallback(callback: YMultiCellWeighScaleTimedReportCallback | null): Promise<number>;
    _invokeTimedReportCallback(value: YMeasure): Promise<number>;
    /**
     * Adapts the load cell signal bias (stored in the corresponding genericSensor)
     * so that the current signal corresponds to a zero weight. Remember to call the
     * saveToFlash() method of the module if the modification must be kept.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    tare(): Promise<number>;
    /**
     * Configures the load cells span parameters (stored in the corresponding genericSensors)
     * so that the current signal corresponds to the specified reference weight.
     *
     * @param currWeight : reference weight presently on the load cell.
     * @param maxWeight : maximum weight to be expected on the load cell.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    setupSpan(currWeight: number, maxWeight: number): Promise<number>;
    /**
     * Returns the next MultiCellWeighScale
     *
     * @returns {YMultiCellWeighScale}
     */
    nextMultiCellWeighScale(): YMultiCellWeighScale | null;
    /**
     * Retrieves the first MultiCellWeighScale in a YAPI context
     *
     * @returns {YMultiCellWeighScale}
     */
    static FirstMultiCellWeighScale(): YMultiCellWeighScale | null;
    /**
     * Retrieves the first MultiCellWeighScale in a given context
     *
     * @param yctx {YAPIContext}
     *
     * @returns {YMultiCellWeighScale}
     */
    static FirstMultiCellWeighScaleInContext(yctx: YAPIContext): YMultiCellWeighScale | null;
}
