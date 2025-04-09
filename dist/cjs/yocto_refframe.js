"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.YRefFrame = void 0;
const yocto_api_js_1 = require("./yocto_api.js");
//--- (YRefFrame class start)
/**
 * YRefFrame Class: 3D reference frame configuration interface, available for instance in the
 * Yocto-3D-V2 or the Yocto-Inclinometer
 *
 * The YRefFrame class is used to set up the base orientation of the Yoctopuce inertial
 * sensors. Thanks to this, orientation functions relative to the earth surface plane
 * can use the proper reference frame. For some devices, the class also implements a
 * tridimensional sensor calibration process, which can compensate for local variations
 * of standard gravity and improve the precision of the tilt sensors.
 */
//--- (end of YRefFrame class start)
class YRefFrame extends yocto_api_js_1.YFunction {
    //--- (end of YRefFrame attributes declaration)
    constructor(yapi, func) {
        //--- (YRefFrame constructor)
        super(yapi, func);
        this._mountPos = YRefFrame.MOUNTPOS_INVALID;
        this._bearing = YRefFrame.BEARING_INVALID;
        this._calibrationParam = YRefFrame.CALIBRATIONPARAM_INVALID;
        this._fusionMode = YRefFrame.FUSIONMODE_INVALID;
        this._valueCallbackRefFrame = null;
        this._calibV2 = false;
        this._calibStage = 0;
        this._calibStageHint = '';
        this._calibStageProgress = 0;
        this._calibProgress = 0;
        this._calibLogMsg = '';
        this._calibSavedParams = '';
        this._calibCount = 0;
        this._calibInternalPos = 0;
        this._calibPrevTick = 0;
        this._calibOrient = [];
        this._calibDataAccX = [];
        this._calibDataAccY = [];
        this._calibDataAccZ = [];
        this._calibDataAcc = [];
        this._calibAccXOfs = 0;
        this._calibAccYOfs = 0;
        this._calibAccZOfs = 0;
        this._calibAccXScale = 0;
        this._calibAccYScale = 0;
        this._calibAccZScale = 0;
        // API symbols as object properties
        this.MOUNTPOS_INVALID = yocto_api_js_1.YAPI.INVALID_UINT;
        this.BEARING_INVALID = yocto_api_js_1.YAPI.INVALID_DOUBLE;
        this.CALIBRATIONPARAM_INVALID = yocto_api_js_1.YAPI.INVALID_STRING;
        this.FUSIONMODE_NDOF = 0;
        this.FUSIONMODE_NDOF_FMC_OFF = 1;
        this.FUSIONMODE_M4G = 2;
        this.FUSIONMODE_COMPASS = 3;
        this.FUSIONMODE_IMU = 4;
        this.FUSIONMODE_INCLIN_90DEG_1G8 = 5;
        this.FUSIONMODE_INCLIN_90DEG_3G6 = 6;
        this.FUSIONMODE_INCLIN_10DEG = 7;
        this.FUSIONMODE_INVALID = -1;
        this.MOUNTPOSITION_BOTTOM = 0;
        this.MOUNTPOSITION_TOP = 1;
        this.MOUNTPOSITION_FRONT = 2;
        this.MOUNTPOSITION_REAR = 3;
        this.MOUNTPOSITION_RIGHT = 4;
        this.MOUNTPOSITION_LEFT = 5;
        this.MOUNTPOSITION_INVALID = 6;
        this.MOUNTORIENTATION_TWELVE = 0;
        this.MOUNTORIENTATION_THREE = 1;
        this.MOUNTORIENTATION_SIX = 2;
        this.MOUNTORIENTATION_NINE = 3;
        this.MOUNTORIENTATION_INVALID = 4;
        this._className = 'RefFrame';
        //--- (end of YRefFrame constructor)
    }
    //--- (YRefFrame implementation)
    imm_parseAttr(name, val) {
        switch (name) {
            case 'mountPos':
                this._mountPos = val;
                return 1;
            case 'bearing':
                this._bearing = Math.round(val / 65.536) / 1000.0;
                return 1;
            case 'calibrationParam':
                this._calibrationParam = val;
                return 1;
            case 'fusionMode':
                this._fusionMode = val;
                return 1;
        }
        return super.imm_parseAttr(name, val);
    }
    async get_mountPos() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YRefFrame.MOUNTPOS_INVALID;
            }
        }
        res = this._mountPos;
        return res;
    }
    async set_mountPos(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('mountPos', rest_val);
    }
    /**
     * Changes the reference bearing used by the compass. The relative bearing
     * indicated by the compass is the difference between the measured magnetic
     * heading and the reference bearing indicated here.
     *
     * For instance, if you set up as reference bearing the value of the earth
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
    async set_bearing(newval) {
        let rest_val;
        rest_val = String(Math.round(newval * 65536.0));
        return await this._setAttr('bearing', rest_val);
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
    async get_bearing() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YRefFrame.BEARING_INVALID;
            }
        }
        res = this._bearing;
        return res;
    }
    async get_calibrationParam() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YRefFrame.CALIBRATIONPARAM_INVALID;
            }
        }
        res = this._calibrationParam;
        return res;
    }
    async set_calibrationParam(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('calibrationParam', rest_val);
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
    async get_fusionMode() {
        let res;
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
    async set_fusionMode(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('fusionMode', rest_val);
    }
    /**
     * Retrieves a reference frame for a given identifier.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
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
    static FindRefFrame(func) {
        let obj;
        obj = yocto_api_js_1.YFunction._FindFromCache('RefFrame', func);
        if (obj == null) {
            obj = new YRefFrame(yocto_api_js_1.YAPI, func);
            yocto_api_js_1.YFunction._AddToCache('RefFrame', func, obj);
        }
        return obj;
    }
    /**
     * Retrieves a reference frame for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
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
    static FindRefFrameInContext(yctx, func) {
        let obj;
        obj = yocto_api_js_1.YFunction._FindFromCacheInContext(yctx, 'RefFrame', func);
        if (obj == null) {
            obj = new YRefFrame(yctx, func);
            yocto_api_js_1.YFunction._AddToCache('RefFrame', func, obj);
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
    async _invokeValueCallback(value) {
        if (this._valueCallbackRefFrame != null) {
            try {
                await this._valueCallbackRefFrame(this, value);
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
    async get_mountPosition() {
        let position;
        position = await this.get_mountPos();
        if (position < 0) {
            return YRefFrame.MOUNTPOSITION_INVALID;
        }
        return (position >> 2);
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
    async get_mountOrientation() {
        let position;
        position = await this.get_mountPos();
        if (position < 0) {
            return YRefFrame.MOUNTORIENTATION_INVALID;
        }
        return (position & 3);
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
    async set_mountPosition(position, orientation) {
        let mixedPos;
        mixedPos = (position << 2) + orientation;
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
    async get_calibrationState() {
        let calibParam;
        let iCalib = [];
        let caltyp;
        let res;
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
    async get_measureQuality() {
        let calibParam;
        let iCalib = [];
        let caltyp;
        let res;
        calibParam = await this.get_calibrationParam();
        iCalib = this._yapi.imm_decodeFloats(calibParam);
        caltyp = (((iCalib[0]) / (1000)) >> 0);
        if (caltyp != 33) {
            return this._yapi.NOT_SUPPORTED;
        }
        res = (((iCalib[2]) / (1000)) >> 0);
        return res;
    }
    async _calibSort(start, stopidx) {
        let idx;
        let changed;
        let a;
        let b;
        let xa;
        let xb;
        // bubble sort is good since we will re-sort again after offset adjustment
        changed = 1;
        while (changed > 0) {
            changed = 0;
            a = this._calibDataAcc[start];
            idx = start + 1;
            while (idx < stopidx) {
                b = this._calibDataAcc[idx];
                if (a > b) {
                    this._calibDataAcc[idx - 1] = b;
                    this._calibDataAcc[idx] = a;
                    xa = this._calibDataAccX[idx - 1];
                    xb = this._calibDataAccX[idx];
                    this._calibDataAccX[idx - 1] = xb;
                    this._calibDataAccX[idx] = xa;
                    xa = this._calibDataAccY[idx - 1];
                    xb = this._calibDataAccY[idx];
                    this._calibDataAccY[idx - 1] = xb;
                    this._calibDataAccY[idx] = xa;
                    xa = this._calibDataAccZ[idx - 1];
                    xb = this._calibDataAccZ[idx];
                    this._calibDataAccZ[idx - 1] = xb;
                    this._calibDataAccZ[idx] = xa;
                    changed = changed + 1;
                }
                else {
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
    async start3DCalibration() {
        if (!(await this.isOnline())) {
            return this._yapi.DEVICE_NOT_FOUND;
        }
        if (this._calibStage != 0) {
            await this.cancel3DCalibration();
        }
        this._calibSavedParams = await this.get_calibrationParam();
        this._calibV2 = (yocto_api_js_1.YAPIContext.imm_atoi(this._calibSavedParams) == 33);
        await this.set_calibrationParam('0');
        this._calibCount = 50;
        this._calibStage = 1;
        this._calibStageHint = 'Set down the device on a steady horizontal surface';
        this._calibStageProgress = 0;
        this._calibProgress = 1;
        this._calibInternalPos = 0;
        this._calibPrevTick = ((this._yapi.GetTickCount()) & 0x7FFFFFFF);
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
    async more3DCalibration() {
        if (this._calibV2) {
            return await this.more3DCalibrationV2();
        }
        return await this.more3DCalibrationV1();
    }
    async more3DCalibrationV1() {
        let currTick;
        let jsonData;
        let xVal;
        let yVal;
        let zVal;
        let xSq;
        let ySq;
        let zSq;
        let norm;
        let orient;
        let idx;
        let intpos;
        let err;
        // make sure calibration has been started
        if (this._calibStage == 0) {
            return this._yapi.INVALID_ARGUMENT;
        }
        if (this._calibProgress == 100) {
            return this._yapi.SUCCESS;
        }
        // make sure we leave at least 160 ms between samples
        currTick = ((this._yapi.GetTickCount()) & 0x7FFFFFFF);
        if (((currTick - this._calibPrevTick) & 0x7FFFFFFF) < 160) {
            return this._yapi.SUCCESS;
        }
        // load current accelerometer values, make sure we are on a straight angle
        // (default timeout to 0,5 sec without reading measure when out of range)
        this._calibStageHint = 'Set down the device on a steady horizontal surface';
        this._calibPrevTick = ((currTick + 500) & 0x7FFFFFFF);
        jsonData = await this._download('api/accelerometer.json');
        xVal = yocto_api_js_1.YAPIContext.imm_atoi(this.imm_json_get_key(jsonData, 'xValue')) / 65536.0;
        yVal = yocto_api_js_1.YAPIContext.imm_atoi(this.imm_json_get_key(jsonData, 'yValue')) / 65536.0;
        zVal = yocto_api_js_1.YAPIContext.imm_atoi(this.imm_json_get_key(jsonData, 'zValue')) / 65536.0;
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
            }
            else {
                orient = 1;
            }
        }
        if (xSq > 0.5) {
            if (xVal > 0) {
                orient = 2;
            }
            else {
                orient = 3;
            }
        }
        if (ySq > 0.5) {
            if (yVal > 0) {
                orient = 4;
            }
            else {
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
        }
        else {
            // Make sure device is not turned before stage is completed
            if (orient != this._calibOrient[this._calibStage - 1]) {
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
        this._calibLogMsg = 'Stage ' + String(Math.round(this._calibStage)) + ': median is ' + String(Math.round(Math.round(1000 * this._calibDataAccX[intpos]))) + ',' + String(Math.round(Math.round(1000 * this._calibDataAccY[intpos]))) + ',' + String(Math.round(Math.round(1000 * this._calibDataAccZ[intpos])));
        // move to next stage
        this._calibStage = this._calibStage + 1;
        if (this._calibStage < 7) {
            this._calibStageHint = 'Turn the device on another face';
            this._calibPrevTick = ((currTick + 500) & 0x7FFFFFFF);
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
    async more3DCalibrationV2() {
        let currTick;
        let calibParam;
        let iCalib = [];
        let cal3;
        let calAcc;
        let calMag;
        let calGyr;
        // make sure calibration has been started
        if (this._calibStage == 0) {
            return this._yapi.INVALID_ARGUMENT;
        }
        if (this._calibProgress == 100) {
            return this._yapi.SUCCESS;
        }
        // make sure we don't start before previous calibration is cleared
        if (this._calibStage == 1) {
            currTick = ((this._yapi.GetTickCount()) & 0x7FFFFFFF);
            currTick = ((currTick - this._calibPrevTick) & 0x7FFFFFFF);
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
        calMag = (((cal3) / (10)) >> 0) - 10 * calAcc;
        calGyr = ((cal3) % (10));
        if (calGyr < 3) {
            this._calibStageHint = 'Set down the device on a steady horizontal surface';
            this._calibStageProgress = 40 + calGyr * 20;
            this._calibProgress = 4 + calGyr * 2;
        }
        else {
            this._calibStage = 2;
            if (calMag < 3) {
                this._calibStageHint = 'Slowly draw \'8\' shapes along the 3 axis';
                this._calibStageProgress = 1 + calMag * 33;
                this._calibProgress = 10 + calMag * 5;
            }
            else {
                this._calibStage = 3;
                if (calAcc < 3) {
                    this._calibStageHint = 'Slowly turn the device, stopping at each 90 degrees';
                    this._calibStageProgress = 1 + calAcc * 33;
                    this._calibProgress = 25 + calAcc * 25;
                }
                else {
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
    async get_3DCalibrationHint() {
        return this._calibStageHint;
    }
    /**
     * Returns the global process indicator for the tridimensional calibration
     * initiated with method start3DCalibration.
     *
     * @return an integer between 0 (not started) and 100 (stage completed).
     */
    async get_3DCalibrationProgress() {
        return this._calibProgress;
    }
    /**
     * Returns index of the current stage of the calibration
     * initiated with method start3DCalibration.
     *
     * @return an integer, growing each time a calibration stage is completed.
     */
    async get_3DCalibrationStage() {
        return this._calibStage;
    }
    /**
     * Returns the process indicator for the current stage of the calibration
     * initiated with method start3DCalibration.
     *
     * @return an integer between 0 (not started) and 100 (stage completed).
     */
    async get_3DCalibrationStageProgress() {
        return this._calibStageProgress;
    }
    /**
     * Returns the latest log message from the calibration process.
     * When no new message is available, returns an empty string.
     *
     * @return a character string.
     */
    async get_3DCalibrationLogMsg() {
        let msg;
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
    async save3DCalibration() {
        if (this._calibV2) {
            return await this.save3DCalibrationV2();
        }
        return await this.save3DCalibrationV1();
    }
    async save3DCalibrationV1() {
        let shiftX;
        let shiftY;
        let shiftZ;
        let scaleExp;
        let scaleX;
        let scaleY;
        let scaleZ;
        let scaleLo;
        let scaleHi;
        let newcalib;
        if (this._calibProgress != 100) {
            return this._yapi.INVALID_ARGUMENT;
        }
        // Compute integer values (correction unit is 732ug/count)
        shiftX = -Math.round(this._calibAccXOfs / 0.000732);
        if (shiftX < 0) {
            shiftX = shiftX + 65536;
        }
        shiftY = -Math.round(this._calibAccYOfs / 0.000732);
        if (shiftY < 0) {
            shiftY = shiftY + 65536;
        }
        shiftZ = -Math.round(this._calibAccZOfs / 0.000732);
        if (shiftZ < 0) {
            shiftZ = shiftZ + 65536;
        }
        scaleX = Math.round(2048.0 / this._calibAccXScale) - 2048;
        scaleY = Math.round(2048.0 / this._calibAccYScale) - 2048;
        scaleZ = Math.round(2048.0 / this._calibAccZScale) - 2048;
        if (scaleX < -2048 || scaleX >= 2048 || scaleY < -2048 || scaleY >= 2048 || scaleZ < -2048 || scaleZ >= 2048) {
            scaleExp = 3;
        }
        else {
            if (scaleX < -1024 || scaleX >= 1024 || scaleY < -1024 || scaleY >= 1024 || scaleZ < -1024 || scaleZ >= 1024) {
                scaleExp = 2;
            }
            else {
                if (scaleX < -512 || scaleX >= 512 || scaleY < -512 || scaleY >= 512 || scaleZ < -512 || scaleZ >= 512) {
                    scaleExp = 1;
                }
                else {
                    scaleExp = 0;
                }
            }
        }
        if (scaleExp > 0) {
            scaleX = (scaleX >> scaleExp);
            scaleY = (scaleY >> scaleExp);
            scaleZ = (scaleZ >> scaleExp);
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
        scaleLo = ((scaleY & 15) << 12) + (scaleX << 2) + scaleExp;
        scaleHi = (scaleZ << 6) + (scaleY >> 4);
        // Save calibration parameters
        newcalib = '5,' + String(Math.round(shiftX)) + ',' + String(Math.round(shiftY)) + ',' + String(Math.round(shiftZ)) + ',' + String(Math.round(scaleLo)) + ',' + String(Math.round(scaleHi));
        this._calibStage = 0;
        return await this.set_calibrationParam(newcalib);
    }
    async save3DCalibrationV2() {
        return await this.set_calibrationParam('5,5,5,5,5,5');
    }
    /**
     * Aborts the sensors tridimensional calibration process et restores normal settings.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async cancel3DCalibration() {
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
    nextRefFrame() {
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != yocto_api_js_1.YAPI.SUCCESS)
            return null;
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if (next_hwid == null)
            return null;
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
    static FirstRefFrame() {
        let next_hwid = yocto_api_js_1.YAPI.imm_getFirstHardwareId('RefFrame');
        if (next_hwid == null)
            return null;
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
    static FirstRefFrameInContext(yctx) {
        let next_hwid = yctx.imm_getFirstHardwareId('RefFrame');
        if (next_hwid == null)
            return null;
        return YRefFrame.FindRefFrameInContext(yctx, next_hwid);
    }
}
exports.YRefFrame = YRefFrame;
// API symbols as static members
YRefFrame.MOUNTPOS_INVALID = yocto_api_js_1.YAPI.INVALID_UINT;
YRefFrame.BEARING_INVALID = yocto_api_js_1.YAPI.INVALID_DOUBLE;
YRefFrame.CALIBRATIONPARAM_INVALID = yocto_api_js_1.YAPI.INVALID_STRING;
YRefFrame.FUSIONMODE_NDOF = 0;
YRefFrame.FUSIONMODE_NDOF_FMC_OFF = 1;
YRefFrame.FUSIONMODE_M4G = 2;
YRefFrame.FUSIONMODE_COMPASS = 3;
YRefFrame.FUSIONMODE_IMU = 4;
YRefFrame.FUSIONMODE_INCLIN_90DEG_1G8 = 5;
YRefFrame.FUSIONMODE_INCLIN_90DEG_3G6 = 6;
YRefFrame.FUSIONMODE_INCLIN_10DEG = 7;
YRefFrame.FUSIONMODE_INVALID = -1;
YRefFrame.MOUNTPOSITION_BOTTOM = 0;
YRefFrame.MOUNTPOSITION_TOP = 1;
YRefFrame.MOUNTPOSITION_FRONT = 2;
YRefFrame.MOUNTPOSITION_REAR = 3;
YRefFrame.MOUNTPOSITION_RIGHT = 4;
YRefFrame.MOUNTPOSITION_LEFT = 5;
YRefFrame.MOUNTPOSITION_INVALID = 6;
YRefFrame.MOUNTORIENTATION_TWELVE = 0;
YRefFrame.MOUNTORIENTATION_THREE = 1;
YRefFrame.MOUNTORIENTATION_SIX = 2;
YRefFrame.MOUNTORIENTATION_NINE = 3;
YRefFrame.MOUNTORIENTATION_INVALID = 4;
//# sourceMappingURL=yocto_refframe.js.map