/*********************************************************************
 *
 *  $Id: svn_id $
 *
 *  Implements the high-level API for RefFrame functions
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
export declare const enum Y_FusionMode {
    NDOF = 0,
    NDOF_FMC_OFF = 1,
    M4G = 2,
    COMPASS = 3,
    IMU = 4,
    INCLIN_90DEG_1G8 = 5,
    INCLIN_90DEG_3G6 = 6,
    INCLIN_10DEG = 7,
    INVALID = -1
}
export declare const enum Y_MountPosition {
    BOTTOM = 0,
    TOP = 1,
    FRONT = 2,
    REAR = 3,
    RIGHT = 4,
    LEFT = 5,
    INVALID = 6
}
export declare const enum Y_MountOrientation {
    TWELVE = 0,
    THREE = 1,
    SIX = 2,
    NINE = 3,
    INVALID = 4
}
export interface YRefFrameValueCallback {
    (func: YRefFrame, value: string): void;
}
/**
 * YRefFrame Class: 3D reference frame configuration interface, available for instance in the Yocto-3D-V2
 *
 * The YRefFrame class is used to setup the base orientation of the Yoctopuce inertial
 * sensors. Thanks to this, orientation functions relative to the earth surface plane
 * can use the proper reference frame. For some devices, the class also implements a
 * tridimensional sensor calibration process, which can compensate for local variations
 * of standard gravity and improve the precision of the tilt sensors.
 */
export declare class YRefFrame extends YFunction {
    _className: string;
    _mountPos: number;
    _bearing: number;
    _calibrationParam: string;
    _fusionMode: Y_FusionMode;
    _valueCallbackRefFrame: YRefFrameValueCallback | null;
    _calibV2: boolean;
    _calibStage: number;
    _calibStageHint: string;
    _calibStageProgress: number;
    _calibProgress: number;
    _calibLogMsg: string;
    _calibSavedParams: string;
    _calibCount: number;
    _calibInternalPos: number;
    _calibPrevTick: number;
    _calibOrient: number[];
    _calibDataAccX: number[];
    _calibDataAccY: number[];
    _calibDataAccZ: number[];
    _calibDataAcc: number[];
    _calibAccXOfs: number;
    _calibAccYOfs: number;
    _calibAccZOfs: number;
    _calibAccXScale: number;
    _calibAccYScale: number;
    _calibAccZScale: number;
    readonly MOUNTPOS_INVALID: number;
    readonly BEARING_INVALID: number;
    readonly CALIBRATIONPARAM_INVALID: string;
    readonly FUSIONMODE_NDOF: Y_FusionMode;
    readonly FUSIONMODE_NDOF_FMC_OFF: Y_FusionMode;
    readonly FUSIONMODE_M4G: Y_FusionMode;
    readonly FUSIONMODE_COMPASS: Y_FusionMode;
    readonly FUSIONMODE_IMU: Y_FusionMode;
    readonly FUSIONMODE_INCLIN_90DEG_1G8: Y_FusionMode;
    readonly FUSIONMODE_INCLIN_90DEG_3G6: Y_FusionMode;
    readonly FUSIONMODE_INCLIN_10DEG: Y_FusionMode;
    readonly FUSIONMODE_INVALID: Y_FusionMode;
    static readonly MOUNTPOS_INVALID: number;
    static readonly BEARING_INVALID: number;
    static readonly CALIBRATIONPARAM_INVALID: string;
    static readonly FUSIONMODE_NDOF: Y_FusionMode;
    static readonly FUSIONMODE_NDOF_FMC_OFF: Y_FusionMode;
    static readonly FUSIONMODE_M4G: Y_FusionMode;
    static readonly FUSIONMODE_COMPASS: Y_FusionMode;
    static readonly FUSIONMODE_IMU: Y_FusionMode;
    static readonly FUSIONMODE_INCLIN_90DEG_1G8: Y_FusionMode;
    static readonly FUSIONMODE_INCLIN_90DEG_3G6: Y_FusionMode;
    static readonly FUSIONMODE_INCLIN_10DEG: Y_FusionMode;
    static readonly FUSIONMODE_INVALID: Y_FusionMode;
    constructor(yapi: YAPIContext, func: string);
    imm_parseAttr(name: string, val: any): 0 | 1;
    get_mountPos(): Promise<number>;
    set_mountPos(newval: number): Promise<number>;
    /**
     * Changes the reference bearing used by the compass. The relative bearing
     * indicated by the compass is the difference between the measured magnetic
     * heading and the reference bearing indicated here.
     *
     * For instance, if you setup as reference bearing the value of the earth
     * magnetic declination, the compass will provide the orientation relative
     * to the geographic North.
     *
     * Similarly, when the sensor is not mounted along the standard directions
     * because it has an additional yaw angle, you can set this angle in the reference
     * bearing so that the compass provides the expected natural direction.
     *
     * Remember to call the saveToFlash()
     * method of the module if the modification must be kept.
     *
     * @param newval : a floating point number corresponding to the reference bearing used by the compass
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_bearing(newval: number): Promise<number>;
    /**
     * Returns the reference bearing used by the compass. The relative bearing
     * indicated by the compass is the difference between the measured magnetic
     * heading and the reference bearing indicated here.
     *
     * @return a floating point number corresponding to the reference bearing used by the compass
     *
     * On failure, throws an exception or returns Y_BEARING_INVALID.
     */
    get_bearing(): Promise<number>;
    get_calibrationParam(): Promise<string>;
    set_calibrationParam(newval: string): Promise<number>;
    /**
     * Returns the sensor fusion mode. Note that available sensor fusion modes depend on the sensor type.
     *
     * @return a value among Y_FUSIONMODE_NDOF, Y_FUSIONMODE_NDOF_FMC_OFF, Y_FUSIONMODE_M4G,
     * Y_FUSIONMODE_COMPASS, Y_FUSIONMODE_IMU, Y_FUSIONMODE_INCLIN_90DEG_1G8,
     * Y_FUSIONMODE_INCLIN_90DEG_3G6 and Y_FUSIONMODE_INCLIN_10DEG corresponding to the sensor fusion mode
     *
     * On failure, throws an exception or returns Y_FUSIONMODE_INVALID.
     */
    get_fusionMode(): Promise<Y_FusionMode>;
    /**
     * Change the sensor fusion mode. Note that available sensor fusion modes depend on the sensor type.
     * Remember to call the matching module saveToFlash() method to save the setting permanently.
     *
     * @param newval : a value among Y_FUSIONMODE_NDOF, Y_FUSIONMODE_NDOF_FMC_OFF, Y_FUSIONMODE_M4G,
     * Y_FUSIONMODE_COMPASS, Y_FUSIONMODE_IMU, Y_FUSIONMODE_INCLIN_90DEG_1G8,
     * Y_FUSIONMODE_INCLIN_90DEG_3G6 and Y_FUSIONMODE_INCLIN_10DEG
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_fusionMode(newval: Y_FusionMode): Promise<number>;
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
     * Use the method YRefFrame.isOnline() to test if $THEFUNCTION$ is
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
     * @return a YRefFrame object allowing you to drive $THEFUNCTION$.
     */
    static FindRefFrame(func: string): YRefFrame;
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
     * Use the method YRefFrame.isOnline() to test if $THEFUNCTION$ is
     * indeed online at a given time. In case of ambiguity when looking for
     * $AFUNCTION$ by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx : a YAPI context
     * @param func : a string that uniquely characterizes $THEFUNCTION$, for instance
     *         $FULLHARDWAREID$.
     *
     * @return a YRefFrame object allowing you to drive $THEFUNCTION$.
     */
    static FindRefFrameInContext(yctx: YAPIContext, func: string): YRefFrame;
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
    registerValueCallback(callback: YRefFrameValueCallback | null): Promise<number>;
    _invokeValueCallback(value: string): Promise<number>;
    /**
     * Returns the installation position of the device, as configured
     * in order to define the reference frame for the compass and the
     * pitch/roll tilt sensors.
     *
     * @return a value among the Y_MOUNTPOSITION enumeration
     *         (Y_MOUNTPOSITION_BOTTOM,   Y_MOUNTPOSITION_TOP,
     *         Y_MOUNTPOSITION_FRONT,    Y_MOUNTPOSITION_RIGHT,
     *         Y_MOUNTPOSITION_REAR,     Y_MOUNTPOSITION_LEFT),
     *         corresponding to the installation in a box, on one of the six faces.
     *
     * On failure, throws an exception or returns Y_MOUNTPOSITION_INVALID.
     */
    get_mountPosition(): Promise<Y_MountPosition>;
    /**
     * Returns the installation orientation of the device, as configured
     * in order to define the reference frame for the compass and the
     * pitch/roll tilt sensors.
     *
     * @return a value among the enumeration Y_MOUNTORIENTATION
     *         (Y_MOUNTORIENTATION_TWELVE, Y_MOUNTORIENTATION_THREE,
     *         Y_MOUNTORIENTATION_SIX,     Y_MOUNTORIENTATION_NINE)
     *         corresponding to the orientation of the "X" arrow on the device,
     *         as on a clock dial seen from an observer in the center of the box.
     *         On the bottom face, the 12H orientation points to the front, while
     *         on the top face, the 12H orientation points to the rear.
     *
     * On failure, throws an exception or returns Y_MOUNTORIENTATION_INVALID.
     */
    get_mountOrientation(): Promise<Y_MountOrientation>;
    /**
     * Changes the compass and tilt sensor frame of reference. The magnetic compass
     * and the tilt sensors (pitch and roll) naturally work in the plane
     * parallel to the earth surface. In case the device is not installed upright
     * and horizontally, you must select its reference orientation (parallel to
     * the earth surface) so that the measures are made relative to this position.
     *
     * @param position : a value among the Y_MOUNTPOSITION enumeration
     *         (Y_MOUNTPOSITION_BOTTOM,   Y_MOUNTPOSITION_TOP,
     *         Y_MOUNTPOSITION_FRONT,    Y_MOUNTPOSITION_RIGHT,
     *         Y_MOUNTPOSITION_REAR,     Y_MOUNTPOSITION_LEFT),
     *         corresponding to the installation in a box, on one of the six faces.
     * @param orientation : a value among the enumeration Y_MOUNTORIENTATION
     *         (Y_MOUNTORIENTATION_TWELVE, Y_MOUNTORIENTATION_THREE,
     *         Y_MOUNTORIENTATION_SIX,     Y_MOUNTORIENTATION_NINE)
     *         corresponding to the orientation of the "X" arrow on the device,
     *         as on a clock dial seen from an observer in the center of the box.
     *         On the bottom face, the 12H orientation points to the front, while
     *         on the top face, the 12H orientation points to the rear.
     *
     * Remember to call the saveToFlash()
     * method of the module if the modification must be kept.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_mountPosition(position: Y_MountPosition, orientation: Y_MountOrientation): Promise<number>;
    /**
     * Returns the 3D sensor calibration state (Yocto-3D-V2 only). This function returns
     * an integer representing the calibration state of the 3 inertial sensors of
     * the BNO055 chip, found in the Yocto-3D-V2. Hundredths show the calibration state
     * of the accelerometer, tenths show the calibration state of the magnetometer while
     * units show the calibration state of the gyroscope. For each sensor, the value 0
     * means no calibration and the value 3 means full calibration.
     *
     * @return an integer representing the calibration state of Yocto-3D-V2:
     *         333 when fully calibrated, 0 when not calibrated at all.
     *
     * On failure, throws an exception or returns a negative error code.
     * For the Yocto-3D (V1), this function always return -3 (unsupported function).
     */
    get_calibrationState(): Promise<number>;
    /**
     * Returns estimated quality of the orientation (Yocto-3D-V2 only). This function returns
     * an integer between 0 and 3 representing the degree of confidence of the position
     * estimate. When the value is 3, the estimation is reliable. Below 3, one should
     * expect sudden corrections, in particular for heading (compass function).
     * The most frequent causes for values below 3 are magnetic interferences, and
     * accelerations or rotations beyond the sensor range.
     *
     * @return an integer between 0 and 3 (3 when the measure is reliable)
     *
     * On failure, throws an exception or returns a negative error code.
     * For the Yocto-3D (V1), this function always return -3 (unsupported function).
     */
    get_measureQuality(): Promise<number>;
    _calibSort(start: number, stopidx: number): Promise<number>;
    /**
     * Initiates the sensors tridimensional calibration process.
     * This calibration is used at low level for inertial position estimation
     * and to enhance the precision of the tilt sensors.
     *
     * After calling this method, the device should be moved according to the
     * instructions provided by method get_3DCalibrationHint,
     * and more3DCalibration should be invoked about 5 times per second.
     * The calibration procedure is completed when the method
     * get_3DCalibrationProgress returns 100. At this point,
     * the computed calibration parameters can be applied using method
     * save3DCalibration. The calibration process can be cancelled
     * at any time using method cancel3DCalibration.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    start3DCalibration(): Promise<number>;
    /**
     * Continues the sensors tridimensional calibration process previously
     * initiated using method start3DCalibration.
     * This method should be called approximately 5 times per second, while
     * positioning the device according to the instructions provided by method
     * get_3DCalibrationHint. Note that the instructions change during
     * the calibration process.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    more3DCalibration(): Promise<number>;
    more3DCalibrationV1(): Promise<number>;
    more3DCalibrationV2(): Promise<number>;
    /**
     * Returns instructions to proceed to the tridimensional calibration initiated with
     * method start3DCalibration.
     *
     * @return a character string.
     */
    get_3DCalibrationHint(): Promise<string>;
    /**
     * Returns the global process indicator for the tridimensional calibration
     * initiated with method start3DCalibration.
     *
     * @return an integer between 0 (not started) and 100 (stage completed).
     */
    get_3DCalibrationProgress(): Promise<number>;
    /**
     * Returns index of the current stage of the calibration
     * initiated with method start3DCalibration.
     *
     * @return an integer, growing each time a calibration stage is completed.
     */
    get_3DCalibrationStage(): Promise<number>;
    /**
     * Returns the process indicator for the current stage of the calibration
     * initiated with method start3DCalibration.
     *
     * @return an integer between 0 (not started) and 100 (stage completed).
     */
    get_3DCalibrationStageProgress(): Promise<number>;
    /**
     * Returns the latest log message from the calibration process.
     * When no new message is available, returns an empty string.
     *
     * @return a character string.
     */
    get_3DCalibrationLogMsg(): Promise<string>;
    /**
     * Applies the sensors tridimensional calibration parameters that have just been computed.
     * Remember to call the saveToFlash()  method of the module if the changes
     * must be kept when the device is restarted.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    save3DCalibration(): Promise<number>;
    save3DCalibrationV1(): Promise<number>;
    save3DCalibrationV2(): Promise<number>;
    /**
     * Aborts the sensors tridimensional calibration process et restores normal settings.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    cancel3DCalibration(): Promise<number>;
    /**
     * Returns the next RefFrame
     *
     * @returns {YRefFrame}
     */
    nextRefFrame(): YRefFrame | null;
    /**
     * Retrieves the first RefFrame in a YAPI context
     *
     * @returns {YRefFrame}
     */
    static FirstRefFrame(): YRefFrame | null;
    /**
     * Retrieves the first RefFrame in a given context
     *
     * @param yctx {YAPIContext}
     *
     * @returns {YRefFrame}
     */
    static FirstRefFrameInContext(yctx: YAPIContext): YRefFrame | null;
}
