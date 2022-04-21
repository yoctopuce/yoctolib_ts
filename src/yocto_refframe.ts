/*********************************************************************
 *
 *  $Id: yocto_refframe.ts 48520 2022-02-03 10:51:20Z seb $
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

import { YAPI, YAPIContext, YErrorMsg, YFunction, YModule, YSensor, YDataLogger, YMeasure } from './yocto_api.js';

//--- (YRefFrame class start)
/**
 * YRefFrame Class: 3D reference frame configuration interface, available for instance in the
 * Yocto-3D-V2 or the Yocto-Inclinometer
 *
 * The YRefFrame class is used to setup the base orientation of the Yoctopuce inertial
 * sensors. Thanks to this, orientation functions relative to the earth surface plane
 * can use the proper reference frame. For some devices, the class also implements a
 * tridimensional sensor calibration process, which can compensate for local variations
 * of standard gravity and improve the precision of the tilt sensors.
 */
//--- (end of YRefFrame class start)

export class YRefFrame extends YFunction
{
    //--- (YRefFrame attributes declaration)
    _className: string;
    _mountPos: number = YRefFrame.MOUNTPOS_INVALID;
    _bearing: number = YRefFrame.BEARING_INVALID;
    _calibrationParam: string = YRefFrame.CALIBRATIONPARAM_INVALID;
    _fusionMode: YRefFrame.FUSIONMODE = YRefFrame.FUSIONMODE_INVALID;
    _valueCallbackRefFrame: YRefFrame.ValueCallback | null = null;
    _calibV2: boolean = false;
    _calibStage: number = 0;
    _calibStageHint: string = '';
    _calibStageProgress: number = 0;
    _calibProgress: number = 0;
    _calibLogMsg: string = '';
    _calibSavedParams: string = '';
    _calibCount: number = 0;
    _calibInternalPos: number = 0;
    _calibPrevTick: number = 0;
    _calibOrient: number[] = [];
    _calibDataAccX: number[] = [];
    _calibDataAccY: number[] = [];
    _calibDataAccZ: number[] = [];
    _calibDataAcc: number[] = [];
    _calibAccXOfs: number = 0;
    _calibAccYOfs: number = 0;
    _calibAccZOfs: number = 0;
    _calibAccXScale: number = 0;
    _calibAccYScale: number = 0;
    _calibAccZScale: number = 0;

    // API symbols as object properties
    public readonly MOUNTPOS_INVALID: number = YAPI.INVALID_UINT;
    public readonly BEARING_INVALID: number = YAPI.INVALID_DOUBLE;
    public readonly CALIBRATIONPARAM_INVALID: string = YAPI.INVALID_STRING;
    public readonly FUSIONMODE_NDOF: YRefFrame.FUSIONMODE = 0;
    public readonly FUSIONMODE_NDOF_FMC_OFF: YRefFrame.FUSIONMODE = 1;
    public readonly FUSIONMODE_M4G: YRefFrame.FUSIONMODE = 2;
    public readonly FUSIONMODE_COMPASS: YRefFrame.FUSIONMODE = 3;
    public readonly FUSIONMODE_IMU: YRefFrame.FUSIONMODE = 4;
    public readonly FUSIONMODE_INCLIN_90DEG_1G8: YRefFrame.FUSIONMODE = 5;
    public readonly FUSIONMODE_INCLIN_90DEG_3G6: YRefFrame.FUSIONMODE = 6;
    public readonly FUSIONMODE_INCLIN_10DEG: YRefFrame.FUSIONMODE = 7;
    public readonly FUSIONMODE_INVALID: YRefFrame.FUSIONMODE = -1;
    public readonly MOUNTPOSITION_BOTTOM: YRefFrame.MOUNTPOSITION = 0;
    public readonly MOUNTPOSITION_TOP: YRefFrame.MOUNTPOSITION = 1;
    public readonly MOUNTPOSITION_FRONT: YRefFrame.MOUNTPOSITION = 2;
    public readonly MOUNTPOSITION_REAR: YRefFrame.MOUNTPOSITION = 3;
    public readonly MOUNTPOSITION_RIGHT: YRefFrame.MOUNTPOSITION = 4;
    public readonly MOUNTPOSITION_LEFT: YRefFrame.MOUNTPOSITION = 5;
    public readonly MOUNTPOSITION_INVALID: YRefFrame.MOUNTPOSITION = 6;
    public readonly MOUNTORIENTATION_TWELVE: YRefFrame.MOUNTORIENTATION = 0;
    public readonly MOUNTORIENTATION_THREE: YRefFrame.MOUNTORIENTATION = 1;
    public readonly MOUNTORIENTATION_SIX: YRefFrame.MOUNTORIENTATION = 2;
    public readonly MOUNTORIENTATION_NINE: YRefFrame.MOUNTORIENTATION = 3;
    public readonly MOUNTORIENTATION_INVALID: YRefFrame.MOUNTORIENTATION = 4;

    // API symbols as static members
    public static readonly MOUNTPOS_INVALID: number = YAPI.INVALID_UINT;
    public static readonly BEARING_INVALID: number = YAPI.INVALID_DOUBLE;
    public static readonly CALIBRATIONPARAM_INVALID: string = YAPI.INVALID_STRING;
    public static readonly FUSIONMODE_NDOF: YRefFrame.FUSIONMODE = 0;
    public static readonly FUSIONMODE_NDOF_FMC_OFF: YRefFrame.FUSIONMODE = 1;
    public static readonly FUSIONMODE_M4G: YRefFrame.FUSIONMODE = 2;
    public static readonly FUSIONMODE_COMPASS: YRefFrame.FUSIONMODE = 3;
    public static readonly FUSIONMODE_IMU: YRefFrame.FUSIONMODE = 4;
    public static readonly FUSIONMODE_INCLIN_90DEG_1G8: YRefFrame.FUSIONMODE = 5;
    public static readonly FUSIONMODE_INCLIN_90DEG_3G6: YRefFrame.FUSIONMODE = 6;
    public static readonly FUSIONMODE_INCLIN_10DEG: YRefFrame.FUSIONMODE = 7;
    public static readonly FUSIONMODE_INVALID: YRefFrame.FUSIONMODE = -1;
    public static readonly MOUNTPOSITION_BOTTOM: YRefFrame.MOUNTPOSITION = 0;
    public static readonly MOUNTPOSITION_TOP: YRefFrame.MOUNTPOSITION = 1;
    public static readonly MOUNTPOSITION_FRONT: YRefFrame.MOUNTPOSITION = 2;
    public static readonly MOUNTPOSITION_REAR: YRefFrame.MOUNTPOSITION = 3;
    public static readonly MOUNTPOSITION_RIGHT: YRefFrame.MOUNTPOSITION = 4;
    public static readonly MOUNTPOSITION_LEFT: YRefFrame.MOUNTPOSITION = 5;
    public static readonly MOUNTPOSITION_INVALID: YRefFrame.MOUNTPOSITION = 6;
    public static readonly MOUNTORIENTATION_TWELVE: YRefFrame.MOUNTORIENTATION = 0;
    public static readonly MOUNTORIENTATION_THREE: YRefFrame.MOUNTORIENTATION = 1;
    public static readonly MOUNTORIENTATION_SIX: YRefFrame.MOUNTORIENTATION = 2;
    public static readonly MOUNTORIENTATION_NINE: YRefFrame.MOUNTORIENTATION = 3;
    public static readonly MOUNTORIENTATION_INVALID: YRefFrame.MOUNTORIENTATION = 4;
    //--- (end of YRefFrame attributes declaration)

    constructor(yapi: YAPIContext, func: string)
    {
        //--- (YRefFrame constructor)
        super(yapi, func);
        this._className                  = 'RefFrame';
        //--- (end of YRefFrame constructor)
    }

    //--- (YRefFrame implementation)

    imm_parseAttr(name: string, val: any)
    {
        switch(name) {
        case 'mountPos':
            this._mountPos = <number> <number> val;
            return 1;
        case 'bearing':
            this._bearing = <number> Math.round(<number>val * 1000.0 / 65536.0) / 1000.0;
            return 1;
        case 'calibrationParam':
            this._calibrationParam = <string> <string> val;
            return 1;
        case 'fusionMode':
            this._fusionMode = <YRefFrame.FUSIONMODE> <number> val;
            return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    async get_mountPos(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YRefFrame.MOUNTPOS_INVALID;
            }
        }
        res = this._mountPos;
        return res;
    }

    async set_mountPos(newval: number): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('mountPos',rest_val);
    }

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
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_bearing(newval: number): Promise<number>
    {
        let rest_val: string;
        rest_val = String(Math.round(newval * 65536.0));
        return await this._setAttr('bearing',rest_val);
    }

    /**
     * Returns the reference bearing used by the compass. The relative bearing
     * indicated by the compass is the difference between the measured magnetic
     * heading and the reference bearing indicated here.
     *
     * @return a floating point number corresponding to the reference bearing used by the compass
     *
     * On failure, throws an exception or returns YRefFrame.BEARING_INVALID.
     */
    async get_bearing(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YRefFrame.BEARING_INVALID;
            }
        }
        res = this._bearing;
        return res;
    }

    async get_calibrationParam(): Promise<string>
    {
        let res: string;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YRefFrame.CALIBRATIONPARAM_INVALID;
            }
        }
        res = this._calibrationParam;
        return res;
    }

    async set_calibrationParam(newval: string): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('calibrationParam',rest_val);
    }

    /**
     * Returns the sensor fusion mode. Note that available sensor fusion modes depend on the sensor type.
     *
     * @return a value among YRefFrame.FUSIONMODE_NDOF, YRefFrame.FUSIONMODE_NDOF_FMC_OFF,
     * YRefFrame.FUSIONMODE_M4G, YRefFrame.FUSIONMODE_COMPASS, YRefFrame.FUSIONMODE_IMU,
     * YRefFrame.FUSIONMODE_INCLIN_90DEG_1G8, YRefFrame.FUSIONMODE_INCLIN_90DEG_3G6 and
     * YRefFrame.FUSIONMODE_INCLIN_10DEG corresponding to the sensor fusion mode
     *
     * On failure, throws an exception or returns YRefFrame.FUSIONMODE_INVALID.
     */
    async get_fusionMode(): Promise<YRefFrame.FUSIONMODE>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YRefFrame.FUSIONMODE_INVALID;
            }
        }
        res = this._fusionMode;
        return res;
    }

    /**
     * Change the sensor fusion mode. Note that available sensor fusion modes depend on the sensor type.
     * Remember to call the matching module saveToFlash() method to save the setting permanently.
     *
     * @param newval : a value among YRefFrame.FUSIONMODE_NDOF, YRefFrame.FUSIONMODE_NDOF_FMC_OFF,
     * YRefFrame.FUSIONMODE_M4G, YRefFrame.FUSIONMODE_COMPASS, YRefFrame.FUSIONMODE_IMU,
     * YRefFrame.FUSIONMODE_INCLIN_90DEG_1G8, YRefFrame.FUSIONMODE_INCLIN_90DEG_3G6 and
     * YRefFrame.FUSIONMODE_INCLIN_10DEG
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_fusionMode(newval: YRefFrame.FUSIONMODE): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('fusionMode',rest_val);
    }

    /**
     * Retrieves a reference frame for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the reference frame is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YRefFrame.isOnline() to test if the reference frame is
     * indeed online at a given time. In case of ambiguity when looking for
     * a reference frame by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the reference frame, for instance
     *         Y3DMK002.refFrame.
     *
     * @return a YRefFrame object allowing you to drive the reference frame.
     */
    static FindRefFrame(func: string): YRefFrame
    {
        let obj: YRefFrame | null;
        obj = <YRefFrame> YFunction._FindFromCache('RefFrame', func);
        if (obj == null) {
            obj = new YRefFrame(YAPI, func);
            YFunction._AddToCache('RefFrame',  func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a reference frame for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the reference frame is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YRefFrame.isOnline() to test if the reference frame is
     * indeed online at a given time. In case of ambiguity when looking for
     * a reference frame by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx : a YAPI context
     * @param func : a string that uniquely characterizes the reference frame, for instance
     *         Y3DMK002.refFrame.
     *
     * @return a YRefFrame object allowing you to drive the reference frame.
     */
    static FindRefFrameInContext(yctx: YAPIContext, func: string): YRefFrame
    {
        let obj: YRefFrame | null;
        obj = <YRefFrame> YFunction._FindFromCacheInContext(yctx,  'RefFrame', func);
        if (obj == null) {
            obj = new YRefFrame(yctx, func);
            YFunction._AddToCache('RefFrame',  func, obj);
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
    async registerValueCallback(callback: YRefFrame.ValueCallback | null): Promise<number>
    {
        let val: string;
        if (callback != null) {
            await YFunction._UpdateValueCallbackList(this, true);
        } else {
            await YFunction._UpdateValueCallbackList(this, false);
        }
        this._valueCallbackRefFrame = callback;
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
        if (this._valueCallbackRefFrame != null) {
            try {
                await this._valueCallbackRefFrame(this, value);
            } catch (e) {
                this._yapi.imm_log('Exception in valueCallback:', e);
            }
        } else {
            super._invokeValueCallback(value);
        }
        return 0;
    }

    /**
     * Returns the installation position of the device, as configured
     * in order to define the reference frame for the compass and the
     * pitch/roll tilt sensors.
     *
     * @return a value among the YRefFrame.MOUNTPOSITION enumeration
     *         (YRefFrame.MOUNTPOSITION_BOTTOM,  YRefFrame.MOUNTPOSITION_TOP,
     *         YRefFrame.MOUNTPOSITION_FRONT,    YRefFrame.MOUNTPOSITION_RIGHT,
     *         YRefFrame.MOUNTPOSITION_REAR,     YRefFrame.MOUNTPOSITION_LEFT),
     *         corresponding to the installation in a box, on one of the six faces.
     *
     * On failure, throws an exception or returns YRefFrame.MOUNTPOSITION_INVALID.
     */
    async get_mountPosition(): Promise<YRefFrame.MOUNTPOSITION>
    {
        let position: number;
        position = await this.get_mountPos();
        if (position < 0) {
            return YRefFrame.MOUNTPOSITION_INVALID;
        }
        return <YRefFrame.MOUNTPOSITION> ((position) >> (2));
    }

    /**
     * Returns the installation orientation of the device, as configured
     * in order to define the reference frame for the compass and the
     * pitch/roll tilt sensors.
     *
     * @return a value among the enumeration YRefFrame.MOUNTORIENTATION
     *         (YRefFrame.MOUNTORIENTATION_TWELVE, YRefFrame.MOUNTORIENTATION_THREE,
     *         YRefFrame.MOUNTORIENTATION_SIX,     YRefFrame.MOUNTORIENTATION_NINE)
     *         corresponding to the orientation of the "X" arrow on the device,
     *         as on a clock dial seen from an observer in the center of the box.
     *         On the bottom face, the 12H orientation points to the front, while
     *         on the top face, the 12H orientation points to the rear.
     *
     * On failure, throws an exception or returns YRefFrame.MOUNTORIENTATION_INVALID.
     */
    async get_mountOrientation(): Promise<YRefFrame.MOUNTORIENTATION>
    {
        let position: number;
        position = await this.get_mountPos();
        if (position < 0) {
            return YRefFrame.MOUNTORIENTATION_INVALID;
        }
        return <YRefFrame.MOUNTORIENTATION> ((position) & (3));
    }

    /**
     * Changes the compass and tilt sensor frame of reference. The magnetic compass
     * and the tilt sensors (pitch and roll) naturally work in the plane
     * parallel to the earth surface. In case the device is not installed upright
     * and horizontally, you must select its reference orientation (parallel to
     * the earth surface) so that the measures are made relative to this position.
     *
     * @param position : a value among the YRefFrame.MOUNTPOSITION enumeration
     *         (YRefFrame.MOUNTPOSITION_BOTTOM,  YRefFrame.MOUNTPOSITION_TOP,
     *         YRefFrame.MOUNTPOSITION_FRONT,    YRefFrame.MOUNTPOSITION_RIGHT,
     *         YRefFrame.MOUNTPOSITION_REAR,     YRefFrame.MOUNTPOSITION_LEFT),
     *         corresponding to the installation in a box, on one of the six faces.
     * @param orientation : a value among the enumeration YRefFrame.MOUNTORIENTATION
     *         (YRefFrame.MOUNTORIENTATION_TWELVE, YRefFrame.MOUNTORIENTATION_THREE,
     *         YRefFrame.MOUNTORIENTATION_SIX,     YRefFrame.MOUNTORIENTATION_NINE)
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
    async set_mountPosition(position: YRefFrame.MOUNTPOSITION, orientation: YRefFrame.MOUNTORIENTATION): Promise<number>
    {
        let mixedPos: number;
        mixedPos = ((position) << (2)) + orientation;
        return await this.set_mountPos(mixedPos);
    }

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
    async get_calibrationState(): Promise<number>
    {
        let calibParam: string;
        let iCalib: number[] = [];
        let caltyp: number;
        let res: number;

        calibParam = await this.get_calibrationParam();
        iCalib = this._yapi.imm_decodeFloats(calibParam);
        caltyp = (((iCalib[0]) / (1000)) >> 0);
        if (caltyp != 33) {
            return this._yapi.NOT_SUPPORTED;
        }
        res = (((iCalib[1]) / (1000)) >> 0);
        return res;
    }

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
    async get_measureQuality(): Promise<number>
    {
        let calibParam: string;
        let iCalib: number[] = [];
        let caltyp: number;
        let res: number;

        calibParam = await this.get_calibrationParam();
        iCalib = this._yapi.imm_decodeFloats(calibParam);
        caltyp = (((iCalib[0]) / (1000)) >> 0);
        if (caltyp != 33) {
            return this._yapi.NOT_SUPPORTED;
        }
        res = (((iCalib[2]) / (1000)) >> 0);
        return res;
    }

    async _calibSort(start: number, stopidx: number): Promise<number>
    {
        let idx: number;
        let changed: number;
        let a: number;
        let b: number;
        let xa: number;
        let xb: number;
        // bubble sort is good since we will re-sort again after offset adjustment
        changed = 1;
        while (changed > 0) {
            changed = 0;
            a = this._calibDataAcc[start];
            idx = start + 1;
            while (idx < stopidx) {
                b = this._calibDataAcc[idx];
                if (a > b) {
                    this._calibDataAcc[idx-1] = b;
                    this._calibDataAcc[idx] = a;
                    xa = this._calibDataAccX[idx-1];
                    xb = this._calibDataAccX[idx];
                    this._calibDataAccX[idx-1] = xb;
                    this._calibDataAccX[idx] = xa;
                    xa = this._calibDataAccY[idx-1];
                    xb = this._calibDataAccY[idx];
                    this._calibDataAccY[idx-1] = xb;
                    this._calibDataAccY[idx] = xa;
                    xa = this._calibDataAccZ[idx-1];
                    xb = this._calibDataAccZ[idx];
                    this._calibDataAccZ[idx-1] = xb;
                    this._calibDataAccZ[idx] = xa;
                    changed = changed + 1;
                } else {
                    a = b;
                }
                idx = idx + 1;
            }
        }
        return 0;
    }

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
    async start3DCalibration(): Promise<number>
    {
        if (!(await this.isOnline())) {
            return this._yapi.DEVICE_NOT_FOUND;
        }
        if (this._calibStage != 0) {
            await this.cancel3DCalibration();
        }
        this._calibSavedParams = await this.get_calibrationParam();
        this._calibV2 = (this._yapi.imm_atoi(this._calibSavedParams) == 33);
        await this.set_calibrationParam('0');
        this._calibCount = 50;
        this._calibStage = 1;
        this._calibStageHint = 'Set down the device on a steady horizontal surface';
        this._calibStageProgress = 0;
        this._calibProgress = 1;
        this._calibInternalPos = 0;
        this._calibPrevTick = <number> ((this._yapi.GetTickCount()) & (0x7FFFFFFF));
        this._calibOrient.length = 0;
        this._calibDataAccX.length = 0;
        this._calibDataAccY.length = 0;
        this._calibDataAccZ.length = 0;
        this._calibDataAcc.length = 0;
        return this._yapi.SUCCESS;
    }

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
    async more3DCalibration(): Promise<number>
    {
        if (this._calibV2) {
            return await this.more3DCalibrationV2();
        }
        return await this.more3DCalibrationV1();
    }

    async more3DCalibrationV1(): Promise<number>
    {
        let currTick: number;
        let jsonData: Uint8Array;
        let xVal: number;
        let yVal: number;
        let zVal: number;
        let xSq: number;
        let ySq: number;
        let zSq: number;
        let norm: number;
        let orient: number;
        let idx: number;
        let intpos: number;
        let err: number;
        // make sure calibration has been started
        if (this._calibStage == 0) {
            return this._yapi.INVALID_ARGUMENT;
        }
        if (this._calibProgress == 100) {
            return this._yapi.SUCCESS;
        }
        // make sure we leave at least 160 ms between samples
        currTick =  <number> ((this._yapi.GetTickCount()) & (0x7FFFFFFF));
        if (((currTick - this._calibPrevTick) & (0x7FFFFFFF)) < 160) {
            return this._yapi.SUCCESS;
        }
        // load current accelerometer values, make sure we are on a straight angle
        // (default timeout to 0,5 sec without reading measure when out of range)
        this._calibStageHint = 'Set down the device on a steady horizontal surface';
        this._calibPrevTick = ((currTick + 500) & (0x7FFFFFFF));
        jsonData = await this._download('api/accelerometer.json');
        xVal = this._yapi.imm_atoi(this.imm_json_get_key(jsonData, 'xValue')) / 65536.0;
        yVal = this._yapi.imm_atoi(this.imm_json_get_key(jsonData, 'yValue')) / 65536.0;
        zVal = this._yapi.imm_atoi(this.imm_json_get_key(jsonData, 'zValue')) / 65536.0;
        xSq = xVal * xVal;
        if (xSq >= 0.04 && xSq < 0.64) {
            return this._yapi.SUCCESS;
        }
        if (xSq >= 1.44) {
            return this._yapi.SUCCESS;
        }
        ySq = yVal * yVal;
        if (ySq >= 0.04 && ySq < 0.64) {
            return this._yapi.SUCCESS;
        }
        if (ySq >= 1.44) {
            return this._yapi.SUCCESS;
        }
        zSq = zVal * zVal;
        if (zSq >= 0.04 && zSq < 0.64) {
            return this._yapi.SUCCESS;
        }
        if (zSq >= 1.44) {
            return this._yapi.SUCCESS;
        }
        norm = Math.sqrt(xSq + ySq + zSq);
        if (norm < 0.8 || norm > 1.2) {
            return this._yapi.SUCCESS;
        }
        this._calibPrevTick = currTick;
        // Determine the device orientation index
        orient = 0;
        if (zSq > 0.5) {
            if (zVal > 0) {
                orient = 0;
            } else {
                orient = 1;
            }
        }
        if (xSq > 0.5) {
            if (xVal > 0) {
                orient = 2;
            } else {
                orient = 3;
            }
        }
        if (ySq > 0.5) {
            if (yVal > 0) {
                orient = 4;
            } else {
                orient = 5;
            }
        }
        // Discard measures that are not in the proper orientation
        if (this._calibStageProgress == 0) {
            // New stage, check that this orientation is not yet done
            idx = 0;
            err = 0;
            while (idx + 1 < this._calibStage) {
                if (this._calibOrient[idx] == orient) {
                    err = 1;
                }
                idx = idx + 1;
            }
            if (err != 0) {
                this._calibStageHint = 'Turn the device on another face';
                return this._yapi.SUCCESS;
            }
            this._calibOrient.push(orient);
        } else {
            // Make sure device is not turned before stage is completed
            if (orient != this._calibOrient[this._calibStage-1]) {
                this._calibStageHint = 'Not yet done, please move back to the previous face';
                return this._yapi.SUCCESS;
            }
        }
        // Save measure
        this._calibStageHint = 'calibrating..';
        this._calibDataAccX.push(xVal);
        this._calibDataAccY.push(yVal);
        this._calibDataAccZ.push(zVal);
        this._calibDataAcc.push(norm);
        this._calibInternalPos = this._calibInternalPos + 1;
        this._calibProgress = 1 + 16 * (this._calibStage - 1) + (((16 * this._calibInternalPos) / (this._calibCount)) >> 0);
        if (this._calibInternalPos < this._calibCount) {
            this._calibStageProgress = 1 + (((99 * this._calibInternalPos) / (this._calibCount)) >> 0);
            return this._yapi.SUCCESS;
        }
        // Stage done, compute preliminary result
        intpos = (this._calibStage - 1) * this._calibCount;
        await this._calibSort(intpos, intpos + this._calibCount);
        intpos = intpos + (((this._calibCount) / (2)) >> 0);
        this._calibLogMsg = 'Stage '+String(Math.round(this._calibStage))+': median is '+String(Math.round(<number> Math.round(1000*this._calibDataAccX[intpos])))+','+String(Math.round(<number> Math.round(1000*this._calibDataAccY[intpos])))+','+String(Math.round(<number> Math.round(1000*this._calibDataAccZ[intpos])));
        // move to next stage
        this._calibStage = this._calibStage + 1;
        if (this._calibStage < 7) {
            this._calibStageHint = 'Turn the device on another face';
            this._calibPrevTick = ((currTick + 500) & (0x7FFFFFFF));
            this._calibStageProgress = 0;
            this._calibInternalPos = 0;
            return this._yapi.SUCCESS;
        }
        // Data collection completed, compute accelerometer shift
        xVal = 0;
        yVal = 0;
        zVal = 0;
        idx = 0;
        while (idx < 6) {
            intpos = idx * this._calibCount + (((this._calibCount) / (2)) >> 0);
            orient = this._calibOrient[idx];
            if (orient == 0 || orient == 1) {
                zVal = zVal + this._calibDataAccZ[intpos];
            }
            if (orient == 2 || orient == 3) {
                xVal = xVal + this._calibDataAccX[intpos];
            }
            if (orient == 4 || orient == 5) {
                yVal = yVal + this._calibDataAccY[intpos];
            }
            idx = idx + 1;
        }
        this._calibAccXOfs = xVal / 2.0;
        this._calibAccYOfs = yVal / 2.0;
        this._calibAccZOfs = zVal / 2.0;
        // Recompute all norms, taking into account the computed shift, and re-sort
        intpos = 0;
        while (intpos < this._calibDataAcc.length) {
            xVal = this._calibDataAccX[intpos] - this._calibAccXOfs;
            yVal = this._calibDataAccY[intpos] - this._calibAccYOfs;
            zVal = this._calibDataAccZ[intpos] - this._calibAccZOfs;
            norm = Math.sqrt(xVal * xVal + yVal * yVal + zVal * zVal);
            this._calibDataAcc[intpos] = norm;
            intpos = intpos + 1;
        }
        idx = 0;
        while (idx < 6) {
            intpos = idx * this._calibCount;
            await this._calibSort(intpos, intpos + this._calibCount);
            idx = idx + 1;
        }
        // Compute the scaling factor for each axis
        xVal = 0;
        yVal = 0;
        zVal = 0;
        idx = 0;
        while (idx < 6) {
            intpos = idx * this._calibCount + (((this._calibCount) / (2)) >> 0);
            orient = this._calibOrient[idx];
            if (orient == 0 || orient == 1) {
                zVal = zVal + this._calibDataAcc[intpos];
            }
            if (orient == 2 || orient == 3) {
                xVal = xVal + this._calibDataAcc[intpos];
            }
            if (orient == 4 || orient == 5) {
                yVal = yVal + this._calibDataAcc[intpos];
            }
            idx = idx + 1;
        }
        this._calibAccXScale = xVal / 2.0;
        this._calibAccYScale = yVal / 2.0;
        this._calibAccZScale = zVal / 2.0;
        // Report completion
        this._calibProgress = 100;
        this._calibStageHint = 'Calibration data ready for saving';
        return this._yapi.SUCCESS;
    }

    async more3DCalibrationV2(): Promise<number>
    {
        let currTick: number;
        let calibParam: Uint8Array;
        let iCalib: number[] = [];
        let cal3: number;
        let calAcc: number;
        let calMag: number;
        let calGyr: number;
        // make sure calibration has been started
        if (this._calibStage == 0) {
            return this._yapi.INVALID_ARGUMENT;
        }
        if (this._calibProgress == 100) {
            return this._yapi.SUCCESS;
        }
        // make sure we don't start before previous calibration is cleared
        if (this._calibStage == 1) {
            currTick = <number> ((this._yapi.GetTickCount()) & (0x7FFFFFFF));
            currTick = ((currTick - this._calibPrevTick) & (0x7FFFFFFF));
            if (currTick < 1600) {
                this._calibStageHint = 'Set down the device on a steady horizontal surface';
                this._calibStageProgress = (((currTick) / (40)) >> 0);
                this._calibProgress = 1;
                return this._yapi.SUCCESS;
            }
        }

        calibParam = await this._download('api/refFrame/calibrationParam.txt');
        iCalib = this._yapi.imm_decodeFloats(this._yapi.imm_bin2str(calibParam));
        cal3 = (((iCalib[1]) / (1000)) >> 0);
        calAcc = (((cal3) / (100)) >> 0);
        calMag = (((cal3) / (10)) >> 0) - 10*calAcc;
        calGyr = ((cal3) % (10));
        if (calGyr < 3) {
            this._calibStageHint = 'Set down the device on a steady horizontal surface';
            this._calibStageProgress = 40 + calGyr*20;
            this._calibProgress = 4 + calGyr*2;
        } else {
            this._calibStage = 2;
            if (calMag < 3) {
                this._calibStageHint = 'Slowly draw \'8\' shapes along the 3 axis';
                this._calibStageProgress = 1 + calMag*33;
                this._calibProgress = 10 + calMag*5;
            } else {
                this._calibStage = 3;
                if (calAcc < 3) {
                    this._calibStageHint = 'Slowly turn the device, stopping at each 90 degrees';
                    this._calibStageProgress = 1 + calAcc*33;
                    this._calibProgress = 25 + calAcc*25;
                } else {
                    this._calibStageProgress = 99;
                    this._calibProgress = 100;
                }
            }
        }
        return this._yapi.SUCCESS;
    }

    /**
     * Returns instructions to proceed to the tridimensional calibration initiated with
     * method start3DCalibration.
     *
     * @return a character string.
     */
    async get_3DCalibrationHint(): Promise<string>
    {
        return this._calibStageHint;
    }

    /**
     * Returns the global process indicator for the tridimensional calibration
     * initiated with method start3DCalibration.
     *
     * @return an integer between 0 (not started) and 100 (stage completed).
     */
    async get_3DCalibrationProgress(): Promise<number>
    {
        return this._calibProgress;
    }

    /**
     * Returns index of the current stage of the calibration
     * initiated with method start3DCalibration.
     *
     * @return an integer, growing each time a calibration stage is completed.
     */
    async get_3DCalibrationStage(): Promise<number>
    {
        return this._calibStage;
    }

    /**
     * Returns the process indicator for the current stage of the calibration
     * initiated with method start3DCalibration.
     *
     * @return an integer between 0 (not started) and 100 (stage completed).
     */
    async get_3DCalibrationStageProgress(): Promise<number>
    {
        return this._calibStageProgress;
    }

    /**
     * Returns the latest log message from the calibration process.
     * When no new message is available, returns an empty string.
     *
     * @return a character string.
     */
    async get_3DCalibrationLogMsg(): Promise<string>
    {
        let msg: string;
        msg = this._calibLogMsg;
        this._calibLogMsg = '';
        return msg;
    }

    /**
     * Applies the sensors tridimensional calibration parameters that have just been computed.
     * Remember to call the saveToFlash()  method of the module if the changes
     * must be kept when the device is restarted.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async save3DCalibration(): Promise<number>
    {
        if (this._calibV2) {
            return await this.save3DCalibrationV2();
        }
        return await this.save3DCalibrationV1();
    }

    async save3DCalibrationV1(): Promise<number>
    {
        let shiftX: number;
        let shiftY: number;
        let shiftZ: number;
        let scaleExp: number;
        let scaleX: number;
        let scaleY: number;
        let scaleZ: number;
        let scaleLo: number;
        let scaleHi: number;
        let newcalib: string;
        if (this._calibProgress != 100) {
            return this._yapi.INVALID_ARGUMENT;
        }
        // Compute integer values (correction unit is 732ug/count)
        shiftX = -<number> Math.round(this._calibAccXOfs / 0.000732);
        if (shiftX < 0) {
            shiftX = shiftX + 65536;
        }
        shiftY = -<number> Math.round(this._calibAccYOfs / 0.000732);
        if (shiftY < 0) {
            shiftY = shiftY + 65536;
        }
        shiftZ = -<number> Math.round(this._calibAccZOfs / 0.000732);
        if (shiftZ < 0) {
            shiftZ = shiftZ + 65536;
        }
        scaleX = <number> Math.round(2048.0 / this._calibAccXScale) - 2048;
        scaleY = <number> Math.round(2048.0 / this._calibAccYScale) - 2048;
        scaleZ = <number> Math.round(2048.0 / this._calibAccZScale) - 2048;
        if (scaleX < -2048 || scaleX >= 2048 || scaleY < -2048 || scaleY >= 2048 || scaleZ < -2048 || scaleZ >= 2048) {
            scaleExp = 3;
        } else {
            if (scaleX < -1024 || scaleX >= 1024 || scaleY < -1024 || scaleY >= 1024 || scaleZ < -1024 || scaleZ >= 1024) {
                scaleExp = 2;
            } else {
                if (scaleX < -512 || scaleX >= 512 || scaleY < -512 || scaleY >= 512 || scaleZ < -512 || scaleZ >= 512) {
                    scaleExp = 1;
                } else {
                    scaleExp = 0;
                }
            }
        }
        if (scaleExp > 0) {
            scaleX = ((scaleX) >> (scaleExp));
            scaleY = ((scaleY) >> (scaleExp));
            scaleZ = ((scaleZ) >> (scaleExp));
        }
        if (scaleX < 0) {
            scaleX = scaleX + 1024;
        }
        if (scaleY < 0) {
            scaleY = scaleY + 1024;
        }
        if (scaleZ < 0) {
            scaleZ = scaleZ + 1024;
        }
        scaleLo = ((((scaleY) & (15))) << (12)) + ((scaleX) << (2)) + scaleExp;
        scaleHi = ((scaleZ) << (6)) + ((scaleY) >> (4));
        // Save calibration parameters
        newcalib = '5,'+String(Math.round(shiftX))+','+String(Math.round(shiftY))+','+String(Math.round(shiftZ))+','+String(Math.round(scaleLo))+','+String(Math.round(scaleHi));
        this._calibStage = 0;
        return await this.set_calibrationParam(newcalib);
    }

    async save3DCalibrationV2(): Promise<number>
    {
        return await this.set_calibrationParam('5,5,5,5,5,5');
    }

    /**
     * Aborts the sensors tridimensional calibration process et restores normal settings.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async cancel3DCalibration(): Promise<number>
    {
        if (this._calibStage == 0) {
            return this._yapi.SUCCESS;
        }

        this._calibStage = 0;
        return await this.set_calibrationParam(this._calibSavedParams);
    }

    /**
     * Continues the enumeration of reference frames started using yFirstRefFrame().
     * Caution: You can't make any assumption about the returned reference frames order.
     * If you want to find a specific a reference frame, use RefFrame.findRefFrame()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YRefFrame object, corresponding to
     *         a reference frame currently online, or a null pointer
     *         if there are no more reference frames to enumerate.
     */
    nextRefFrame(): YRefFrame | null
    {
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI.SUCCESS) return null;
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, <string> resolve.result);
        if(next_hwid == null) return null;
        return YRefFrame.FindRefFrameInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of reference frames currently accessible.
     * Use the method YRefFrame.nextRefFrame() to iterate on
     * next reference frames.
     *
     * @return a pointer to a YRefFrame object, corresponding to
     *         the first reference frame currently online, or a null pointer
     *         if there are none.
     */
    static FirstRefFrame(): YRefFrame | null
    {
        let next_hwid = YAPI.imm_getFirstHardwareId('RefFrame');
        if(next_hwid == null) return null;
        return YRefFrame.FindRefFrame(next_hwid);
    }

    /**
     * Starts the enumeration of reference frames currently accessible.
     * Use the method YRefFrame.nextRefFrame() to iterate on
     * next reference frames.
     *
     * @param yctx : a YAPI context.
     *
     * @return a pointer to a YRefFrame object, corresponding to
     *         the first reference frame currently online, or a null pointer
     *         if there are none.
     */
    static FirstRefFrameInContext(yctx: YAPIContext): YRefFrame | null
    {
        let next_hwid = yctx.imm_getFirstHardwareId('RefFrame');
        if(next_hwid == null) return null;
        return YRefFrame.FindRefFrameInContext(yctx, next_hwid);
    }

    //--- (end of YRefFrame implementation)
}

export namespace YRefFrame {
    //--- (YRefFrame definitions)
    export const enum FUSIONMODE {
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
    export const enum MOUNTPOSITION {
        BOTTOM = 0,
        TOP = 1,
        FRONT = 2,
        REAR = 3,
        RIGHT = 4,
        LEFT = 5,
        INVALID = 6
    }
    export const enum MOUNTORIENTATION {
        TWELVE = 0,
        THREE = 1,
        SIX = 2,
        NINE = 3,
        INVALID = 4
    }
    export interface ValueCallback { (func: YRefFrame, value: string): void }
    //--- (end of YRefFrame definitions)
}

