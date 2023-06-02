/*********************************************************************
 *
 *  $Id: yocto_gyro.ts 54279 2023-04-28 10:11:03Z seb $
 *
 *  Implements the high-level API for Qt functions
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

//--- (generated code: YQt class start)
/**
 * YQt Class: Base interface to access quaternion components, available for instance in the Yocto-3D-V2
 *
 * The YQt class provides direct access to the 3D attitude estimation
 * provided by Yoctopuce inertial sensors. The four instances of YQt
 * provide direct access to the individual quaternion components representing the
 * orientation. It is usually not needed to use the YQt class
 * directly, as the YGyro class provides a more convenient higher-level
 * interface.
 */
//--- (end of generated code: YQt class start)

export class YQt extends YSensor
{
    //--- (generated code: YQt attributes declaration)
    _className: string;
    _valueCallbackQt: YQt.ValueCallback | null = null;
    _timedReportCallbackQt: YQt.TimedReportCallback | null = null;

    // API symbols as static members
    //--- (end of generated code: YQt attributes declaration)

//--- (generated code: YQt return codes)
//--- (end of generated code: YQt return codes)

    constructor(yapi: YAPIContext, func: string)
    {
        //--- (generated code: YQt constructor)
        super(yapi, func);
        this._className                  = 'Qt';
        //--- (end of generated code: YQt constructor)
    }

    //--- (generated code: YQt implementation)

    /**
     * Retrieves a quaternion component for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the quaternion component is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YQt.isOnline() to test if the quaternion component is
     * indeed online at a given time. In case of ambiguity when looking for
     * a quaternion component by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the quaternion component, for instance
     *         Y3DMK002.qt1.
     *
     * @return a YQt object allowing you to drive the quaternion component.
     */
    static FindQt(func: string): YQt
    {
        let obj: YQt | null;
        obj = <YQt> YFunction._FindFromCache('Qt', func);
        if (obj == null) {
            obj = new YQt(YAPI, func);
            YFunction._AddToCache('Qt',  func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a quaternion component for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the quaternion component is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YQt.isOnline() to test if the quaternion component is
     * indeed online at a given time. In case of ambiguity when looking for
     * a quaternion component by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx : a YAPI context
     * @param func : a string that uniquely characterizes the quaternion component, for instance
     *         Y3DMK002.qt1.
     *
     * @return a YQt object allowing you to drive the quaternion component.
     */
    static FindQtInContext(yctx: YAPIContext, func: string): YQt
    {
        let obj: YQt | null;
        obj = <YQt> YFunction._FindFromCacheInContext(yctx,  'Qt', func);
        if (obj == null) {
            obj = new YQt(yctx, func);
            YFunction._AddToCache('Qt',  func, obj);
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
    async registerValueCallback(callback: YQt.ValueCallback | null): Promise<number>
    {
        let val: string;
        if (callback != null) {
            await YFunction._UpdateValueCallbackList(this, true);
        } else {
            await YFunction._UpdateValueCallbackList(this, false);
        }
        this._valueCallbackQt = callback;
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
        if (this._valueCallbackQt != null) {
            try {
                await this._valueCallbackQt(this, value);
            } catch (e) {
                this._yapi.imm_log('Exception in valueCallback:', e);
            }
        } else {
            super._invokeValueCallback(value);
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
    async registerTimedReportCallback(callback: YQt.TimedReportCallback | null): Promise<number>
    {
        let sensor: YSensor | null;
        sensor = this;
        if (callback != null) {
            await YFunction._UpdateTimedReportCallbackList(sensor, true);
        } else {
            await YFunction._UpdateTimedReportCallbackList(sensor, false);
        }
        this._timedReportCallbackQt = callback;
        return 0;
    }

    async _invokeTimedReportCallback(value: YMeasure): Promise<number>
    {
        if (this._timedReportCallbackQt != null) {
            try {
                await this._timedReportCallbackQt(this, value);
            } catch (e) {
                this._yapi.imm_log('Exception in timedReportCallback:', e);
            }
        } else {
            super._invokeTimedReportCallback(value);
        }
        return 0;
    }

    /**
     * Continues the enumeration of quaternion components started using yFirstQt().
     * Caution: You can't make any assumption about the returned quaternion components order.
     * If you want to find a specific a quaternion component, use Qt.findQt()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YQt object, corresponding to
     *         a quaternion component currently online, or a null pointer
     *         if there are no more quaternion components to enumerate.
     */
    nextQt(): YQt | null
    {
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != YAPI.SUCCESS) return null;
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, <string> resolve.result);
        if (next_hwid == null) return null;
        return YQt.FindQtInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of quaternion components currently accessible.
     * Use the method YQt.nextQt() to iterate on
     * next quaternion components.
     *
     * @return a pointer to a YQt object, corresponding to
     *         the first quaternion component currently online, or a null pointer
     *         if there are none.
     */
    static FirstQt(): YQt | null
    {
        let next_hwid = YAPI.imm_getFirstHardwareId('Qt');
        if (next_hwid == null) return null;
        return YQt.FindQt(next_hwid);
    }

    /**
     * Starts the enumeration of quaternion components currently accessible.
     * Use the method YQt.nextQt() to iterate on
     * next quaternion components.
     *
     * @param yctx : a YAPI context.
     *
     * @return a pointer to a YQt object, corresponding to
     *         the first quaternion component currently online, or a null pointer
     *         if there are none.
     */
    static FirstQtInContext(yctx: YAPIContext): YQt | null
    {
        let next_hwid = yctx.imm_getFirstHardwareId('Qt');
        if (next_hwid == null) return null;
        return YQt.FindQtInContext(yctx, next_hwid);
    }

    //--- (end of generated code: YQt implementation)
}

async function yInternalGyroCallback(YQt_obj: YQt, str_value: string)
{
    var gyro: YGyro = <YGyro>await YQt_obj.get_userData();
    if(!gyro) return;
    var idx = parseInt(YQt_obj.imm_get_functionId().slice(2));
    gyro._invokeGyroCallbacks(idx, parseInt(str_value));
}

export namespace YQt
{
    //--- (generated code: YQt definitions)
    export interface ValueCallback {(func: YQt, value: string): void}

    export interface TimedReportCallback {(func: YQt, measure: YMeasure): void}

    //--- (end of generated code: YQt definitions)
}

//--- (generated code: YGyro class start)
/**
 * YGyro Class: gyroscope control interface, available for instance in the Yocto-3D-V2
 *
 * The YGyro class allows you to read and configure Yoctopuce gyroscopes.
 * It inherits from YSensor class the core functions to read measurements,
 * to register callback functions, and to access the autonomous datalogger.
 * This class adds the possibility to access x, y and z components of the rotation
 * vector separately, as well as the possibility to deal with quaternion-based
 * orientation estimates.
 */
//--- (end of generated code: YGyro class start)

/** @extends {YFunction} **/
export class YGyro extends YSensor
{
    //--- (generated code: YGyro attributes declaration)
    _className: string;
    _bandwidth: number = YGyro.BANDWIDTH_INVALID;
    _xValue: number = YGyro.XVALUE_INVALID;
    _yValue: number = YGyro.YVALUE_INVALID;
    _zValue: number = YGyro.ZVALUE_INVALID;
    _valueCallbackGyro: YGyro.ValueCallback | null = null;
    _timedReportCallbackGyro: YGyro.TimedReportCallback | null = null;
    _qt_stamp: number = 0;
    _qt_w: YQt;
    _qt_x: YQt;
    _qt_y: YQt;
    _qt_z: YQt;
    _w: number = 0;
    _x: number = 0;
    _y: number = 0;
    _z: number = 0;
    _angles_stamp: number = 0;
    _head: number = 0;
    _pitch: number = 0;
    _roll: number = 0;
    _quatCallback: YGyro.YQuatCallback | null = null;
    _anglesCallback: YGyro.YAnglesCallback | null = null;

    // API symbols as object properties
    public readonly BANDWIDTH_INVALID: number = YAPI.INVALID_UINT;
    public readonly XVALUE_INVALID: number = YAPI.INVALID_DOUBLE;
    public readonly YVALUE_INVALID: number = YAPI.INVALID_DOUBLE;
    public readonly ZVALUE_INVALID: number = YAPI.INVALID_DOUBLE;

    // API symbols as static members
    public static readonly BANDWIDTH_INVALID: number = YAPI.INVALID_UINT;
    public static readonly XVALUE_INVALID: number = YAPI.INVALID_DOUBLE;
    public static readonly YVALUE_INVALID: number = YAPI.INVALID_DOUBLE;
    public static readonly ZVALUE_INVALID: number = YAPI.INVALID_DOUBLE;
    //--- (end of generated code: YGyro attributes declaration)

    constructor(yapi: YAPIContext, func: string)
    {
        //--- (generated code: YGyro constructor)
        super(yapi, func);
        this._className                  = 'Gyro';
        //--- (end of generated code: YGyro constructor)
        this._qt_w = YQt.FindQtInContext(this._yapi, this._serial+'.qt1');
        this._qt_x = YQt.FindQtInContext(this._yapi, this._serial+'.qt2');
        this._qt_y = YQt.FindQtInContext(this._yapi, this._serial+'.qt3');
        this._qt_z = YQt.FindQtInContext(this._yapi, this._serial+'.qt4');
    }

    //--- (generated code: YGyro implementation)

    imm_parseAttr(name: string, val: any)
    {
        switch (name) {
        case 'bandwidth':
            this._bandwidth = <number> <number> val;
            return 1;
        case 'xValue':
            this._xValue = <number> Math.round(<number>val / 65.536) / 1000.0;
            return 1;
        case 'yValue':
            this._yValue = <number> Math.round(<number>val / 65.536) / 1000.0;
            return 1;
        case 'zValue':
            this._zValue = <number> Math.round(<number>val / 65.536) / 1000.0;
            return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Returns the measure update frequency, measured in Hz.
     *
     * @return an integer corresponding to the measure update frequency, measured in Hz
     *
     * On failure, throws an exception or returns YGyro.BANDWIDTH_INVALID.
     */
    async get_bandwidth(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YGyro.BANDWIDTH_INVALID;
            }
        }
        res = this._bandwidth;
        return res;
    }

    /**
     * Changes the measure update frequency, measured in Hz. When the
     * frequency is lower, the device performs averaging.
     * Remember to call the saveToFlash()
     * method of the module if the modification must be kept.
     *
     * @param newval : an integer corresponding to the measure update frequency, measured in Hz
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_bandwidth(newval: number): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('bandwidth', rest_val);
    }

    /**
     * Returns the angular velocity around the X axis of the device, as a floating point number.
     *
     * @return a floating point number corresponding to the angular velocity around the X axis of the
     * device, as a floating point number
     *
     * On failure, throws an exception or returns YGyro.XVALUE_INVALID.
     */
    async get_xValue(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YGyro.XVALUE_INVALID;
            }
        }
        res = this._xValue;
        return res;
    }

    /**
     * Returns the angular velocity around the Y axis of the device, as a floating point number.
     *
     * @return a floating point number corresponding to the angular velocity around the Y axis of the
     * device, as a floating point number
     *
     * On failure, throws an exception or returns YGyro.YVALUE_INVALID.
     */
    async get_yValue(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YGyro.YVALUE_INVALID;
            }
        }
        res = this._yValue;
        return res;
    }

    /**
     * Returns the angular velocity around the Z axis of the device, as a floating point number.
     *
     * @return a floating point number corresponding to the angular velocity around the Z axis of the
     * device, as a floating point number
     *
     * On failure, throws an exception or returns YGyro.ZVALUE_INVALID.
     */
    async get_zValue(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YGyro.ZVALUE_INVALID;
            }
        }
        res = this._zValue;
        return res;
    }

    /**
     * Retrieves a gyroscope for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the gyroscope is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YGyro.isOnline() to test if the gyroscope is
     * indeed online at a given time. In case of ambiguity when looking for
     * a gyroscope by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the gyroscope, for instance
     *         Y3DMK002.gyro.
     *
     * @return a YGyro object allowing you to drive the gyroscope.
     */
    static FindGyro(func: string): YGyro
    {
        let obj: YGyro | null;
        obj = <YGyro> YFunction._FindFromCache('Gyro', func);
        if (obj == null) {
            obj = new YGyro(YAPI, func);
            YFunction._AddToCache('Gyro',  func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a gyroscope for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the gyroscope is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YGyro.isOnline() to test if the gyroscope is
     * indeed online at a given time. In case of ambiguity when looking for
     * a gyroscope by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx : a YAPI context
     * @param func : a string that uniquely characterizes the gyroscope, for instance
     *         Y3DMK002.gyro.
     *
     * @return a YGyro object allowing you to drive the gyroscope.
     */
    static FindGyroInContext(yctx: YAPIContext, func: string): YGyro
    {
        let obj: YGyro | null;
        obj = <YGyro> YFunction._FindFromCacheInContext(yctx,  'Gyro', func);
        if (obj == null) {
            obj = new YGyro(yctx, func);
            YFunction._AddToCache('Gyro',  func, obj);
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
    async registerValueCallback(callback: YGyro.ValueCallback | null): Promise<number>
    {
        let val: string;
        if (callback != null) {
            await YFunction._UpdateValueCallbackList(this, true);
        } else {
            await YFunction._UpdateValueCallbackList(this, false);
        }
        this._valueCallbackGyro = callback;
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
        if (this._valueCallbackGyro != null) {
            try {
                await this._valueCallbackGyro(this, value);
            } catch (e) {
                this._yapi.imm_log('Exception in valueCallback:', e);
            }
        } else {
            super._invokeValueCallback(value);
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
    async registerTimedReportCallback(callback: YGyro.TimedReportCallback | null): Promise<number>
    {
        let sensor: YSensor | null;
        sensor = this;
        if (callback != null) {
            await YFunction._UpdateTimedReportCallbackList(sensor, true);
        } else {
            await YFunction._UpdateTimedReportCallbackList(sensor, false);
        }
        this._timedReportCallbackGyro = callback;
        return 0;
    }

    async _invokeTimedReportCallback(value: YMeasure): Promise<number>
    {
        if (this._timedReportCallbackGyro != null) {
            try {
                await this._timedReportCallbackGyro(this, value);
            } catch (e) {
                this._yapi.imm_log('Exception in timedReportCallback:', e);
            }
        } else {
            super._invokeTimedReportCallback(value);
        }
        return 0;
    }

    async _loadQuaternion(): Promise<number>
    {
        let now_stamp: number;
        let age_ms: number;
        now_stamp = <number> ((this._yapi.GetTickCount()) & (0x7FFFFFFF));
        age_ms = (((now_stamp - this._qt_stamp)) & (0x7FFFFFFF));
        if ((age_ms >= 10) || (this._qt_stamp == 0)) {
            if (await this.load(10) != this._yapi.SUCCESS) {
                return this._yapi.DEVICE_NOT_FOUND;
            }
            if (this._qt_stamp == 0) {
                this._qt_w = YQt.FindQtInContext(this._yapi, this._serial + '.qt1');
                this._qt_x = YQt.FindQtInContext(this._yapi, this._serial + '.qt2');
                this._qt_y = YQt.FindQtInContext(this._yapi, this._serial + '.qt3');
                this._qt_z = YQt.FindQtInContext(this._yapi, this._serial + '.qt4');
            }
            if (await this._qt_w.load(9) != this._yapi.SUCCESS) {
                return this._yapi.DEVICE_NOT_FOUND;
            }
            if (await this._qt_x.load(9) != this._yapi.SUCCESS) {
                return this._yapi.DEVICE_NOT_FOUND;
            }
            if (await this._qt_y.load(9) != this._yapi.SUCCESS) {
                return this._yapi.DEVICE_NOT_FOUND;
            }
            if (await this._qt_z.load(9) != this._yapi.SUCCESS) {
                return this._yapi.DEVICE_NOT_FOUND;
            }
            this._w = await this._qt_w.get_currentValue();
            this._x = await this._qt_x.get_currentValue();
            this._y = await this._qt_y.get_currentValue();
            this._z = await this._qt_z.get_currentValue();
            this._qt_stamp = now_stamp;
        }
        return this._yapi.SUCCESS;
    }

    async _loadAngles(): Promise<number>
    {
        let sqw: number;
        let sqx: number;
        let sqy: number;
        let sqz: number;
        let norm: number;
        let delta: number;

        if (await this._loadQuaternion() != this._yapi.SUCCESS) {
            return this._yapi.DEVICE_NOT_FOUND;
        }
        if (this._angles_stamp != this._qt_stamp) {
            sqw = this._w * this._w;
            sqx = this._x * this._x;
            sqy = this._y * this._y;
            sqz = this._z * this._z;
            norm = sqx + sqy + sqz + sqw;
            delta = this._y * this._w - this._x * this._z;
            if (delta > 0.499 * norm) {
                // singularity at north pole
                this._pitch = 90.0;
                this._head  = Math.round(2.0 * 1800.0/Math.PI * Math.atan2(this._x,-this._w)) / 10.0;
            } else {
                if (delta < -0.499 * norm) {
                    // singularity at south pole
                    this._pitch = -90.0;
                    this._head  = Math.round(-2.0 * 1800.0/Math.PI * Math.atan2(this._x,-this._w)) / 10.0;
                } else {
                    this._roll  = Math.round(1800.0/Math.PI * Math.atan2(2.0 * (this._w * this._x + this._y * this._z),sqw - sqx - sqy + sqz)) / 10.0;
                    this._pitch = Math.round(1800.0/Math.PI * Math.asin(2.0 * delta / norm)) / 10.0;
                    this._head  = Math.round(1800.0/Math.PI * Math.atan2(2.0 * (this._x * this._y + this._z * this._w),sqw + sqx - sqy - sqz)) / 10.0;
                }
            }
            this._angles_stamp = this._qt_stamp;
        }
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the estimated roll angle, based on the integration of
     * gyroscopic measures combined with acceleration and
     * magnetic field measurements.
     * The axis corresponding to the roll angle can be mapped to any
     * of the device X, Y or Z physical directions using methods of
     * the class YRefFrame.
     *
     * @return a floating-point number corresponding to roll angle
     *         in degrees, between -180 and +180.
     */
    async get_roll(): Promise<number>
    {
        await this._loadAngles();
        return this._roll;
    }

    /**
     * Returns the estimated pitch angle, based on the integration of
     * gyroscopic measures combined with acceleration and
     * magnetic field measurements.
     * The axis corresponding to the pitch angle can be mapped to any
     * of the device X, Y or Z physical directions using methods of
     * the class YRefFrame.
     *
     * @return a floating-point number corresponding to pitch angle
     *         in degrees, between -90 and +90.
     */
    async get_pitch(): Promise<number>
    {
        await this._loadAngles();
        return this._pitch;
    }

    /**
     * Returns the estimated heading angle, based on the integration of
     * gyroscopic measures combined with acceleration and
     * magnetic field measurements.
     * The axis corresponding to the heading can be mapped to any
     * of the device X, Y or Z physical directions using methods of
     * the class YRefFrame.
     *
     * @return a floating-point number corresponding to heading
     *         in degrees, between 0 and 360.
     */
    async get_heading(): Promise<number>
    {
        await this._loadAngles();
        return this._head;
    }

    /**
     * Returns the w component (real part) of the quaternion
     * describing the device estimated orientation, based on the
     * integration of gyroscopic measures combined with acceleration and
     * magnetic field measurements.
     *
     * @return a floating-point number corresponding to the w
     *         component of the quaternion.
     */
    async get_quaternionW(): Promise<number>
    {
        await this._loadQuaternion();
        return this._w;
    }

    /**
     * Returns the x component of the quaternion
     * describing the device estimated orientation, based on the
     * integration of gyroscopic measures combined with acceleration and
     * magnetic field measurements. The x component is
     * mostly correlated with rotations on the roll axis.
     *
     * @return a floating-point number corresponding to the x
     *         component of the quaternion.
     */
    async get_quaternionX(): Promise<number>
    {
        await this._loadQuaternion();
        return this._x;
    }

    /**
     * Returns the y component of the quaternion
     * describing the device estimated orientation, based on the
     * integration of gyroscopic measures combined with acceleration and
     * magnetic field measurements. The y component is
     * mostly correlated with rotations on the pitch axis.
     *
     * @return a floating-point number corresponding to the y
     *         component of the quaternion.
     */
    async get_quaternionY(): Promise<number>
    {
        await this._loadQuaternion();
        return this._y;
    }

    /**
     * Returns the x component of the quaternion
     * describing the device estimated orientation, based on the
     * integration of gyroscopic measures combined with acceleration and
     * magnetic field measurements. The x component is
     * mostly correlated with changes of heading.
     *
     * @return a floating-point number corresponding to the z
     *         component of the quaternion.
     */
    async get_quaternionZ(): Promise<number>
    {
        await this._loadQuaternion();
        return this._z;
    }

    /**
     * Registers a callback function that will be invoked each time that the estimated
     * device orientation has changed. The call frequency is typically around 95Hz during a move.
     * The callback is invoked only during the execution of ySleep or yHandleEvents.
     * This provides control over the time when the callback is triggered.
     * For good responsiveness, remember to call one of these two functions periodically.
     * To unregister a callback, pass a null pointer as argument.
     *
     * @param callback : the callback function to invoke, or a null pointer.
     *         The callback function should take five arguments:
     *         the YGyro object of the turning device, and the floating
     *         point values of the four components w, x, y and z
     *         (as floating-point numbers).
     * @noreturn
     */
    async registerQuaternionCallback(callback: YGyro.YQuatCallback | null): Promise<number>
    {
        this._quatCallback = callback;
        if (callback != null) {
            if (await this._loadQuaternion() != this._yapi.SUCCESS) {
                return this._yapi.DEVICE_NOT_FOUND;
            }
            await this._qt_w.set_userData(this);
            await this._qt_x.set_userData(this);
            await this._qt_y.set_userData(this);
            await this._qt_z.set_userData(this);
            await this._qt_w.registerValueCallback(yInternalGyroCallback);
            await this._qt_x.registerValueCallback(yInternalGyroCallback);
            await this._qt_y.registerValueCallback(yInternalGyroCallback);
            await this._qt_z.registerValueCallback(yInternalGyroCallback);
        } else {
            if (!(this._anglesCallback != null)) {
                await this._qt_w.registerValueCallback(<YQt.ValueCallback | null> null);
                await this._qt_x.registerValueCallback(<YQt.ValueCallback | null> null);
                await this._qt_y.registerValueCallback(<YQt.ValueCallback | null> null);
                await this._qt_z.registerValueCallback(<YQt.ValueCallback | null> null);
            }
        }
        return 0;
    }

    /**
     * Registers a callback function that will be invoked each time that the estimated
     * device orientation has changed. The call frequency is typically around 95Hz during a move.
     * The callback is invoked only during the execution of ySleep or yHandleEvents.
     * This provides control over the time when the callback is triggered.
     * For good responsiveness, remember to call one of these two functions periodically.
     * To unregister a callback, pass a null pointer as argument.
     *
     * @param callback : the callback function to invoke, or a null pointer.
     *         The callback function should take four arguments:
     *         the YGyro object of the turning device, and the floating
     *         point values of the three angles roll, pitch and heading
     *         in degrees (as floating-point numbers).
     * @noreturn
     */
    async registerAnglesCallback(callback: YGyro.YAnglesCallback | null): Promise<number>
    {
        this._anglesCallback = callback;
        if (callback != null) {
            if (await this._loadQuaternion() != this._yapi.SUCCESS) {
                return this._yapi.DEVICE_NOT_FOUND;
            }
            await this._qt_w.set_userData(this);
            await this._qt_x.set_userData(this);
            await this._qt_y.set_userData(this);
            await this._qt_z.set_userData(this);
            await this._qt_w.registerValueCallback(yInternalGyroCallback);
            await this._qt_x.registerValueCallback(yInternalGyroCallback);
            await this._qt_y.registerValueCallback(yInternalGyroCallback);
            await this._qt_z.registerValueCallback(yInternalGyroCallback);
        } else {
            if (!(this._quatCallback != null)) {
                await this._qt_w.registerValueCallback(<YQt.ValueCallback | null> null);
                await this._qt_x.registerValueCallback(<YQt.ValueCallback | null> null);
                await this._qt_y.registerValueCallback(<YQt.ValueCallback | null> null);
                await this._qt_z.registerValueCallback(<YQt.ValueCallback | null> null);
            }
        }
        return 0;
    }

    async _invokeGyroCallbacks(qtIndex: number, qtValue: number): Promise<number>
    {
        switch (qtIndex - 1) {
        case 0:
            this._w = qtValue;
            break;
        case 1:
            this._x = qtValue;
            break;
        case 2:
            this._y = qtValue;
            break;
        case 3:
            this._z = qtValue;
            break;
        }
        if (qtIndex < 4) {
            return 0;
        }
        this._qt_stamp = <number> ((this._yapi.GetTickCount()) & (0x7FFFFFFF));
        if (this._quatCallback != null) {
            try {
                await this._quatCallback(this, this._w, this._x, this._y, this._z);
            } catch (e) {
                this._yapi.imm_log('Exception in yQuaternionCallback:', e);
            }
        }
        if (this._anglesCallback != null) {
            await this._loadAngles();
            try {
                await this._anglesCallback(this, this._roll, this._pitch, this._head);
            } catch (e) {
                this._yapi.imm_log('Exception in yAnglesCallback:', e);
            }
        }
        return 0;
    }

    /**
     * Continues the enumeration of gyroscopes started using yFirstGyro().
     * Caution: You can't make any assumption about the returned gyroscopes order.
     * If you want to find a specific a gyroscope, use Gyro.findGyro()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YGyro object, corresponding to
     *         a gyroscope currently online, or a null pointer
     *         if there are no more gyroscopes to enumerate.
     */
    nextGyro(): YGyro | null
    {
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != YAPI.SUCCESS) return null;
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, <string> resolve.result);
        if (next_hwid == null) return null;
        return YGyro.FindGyroInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of gyroscopes currently accessible.
     * Use the method YGyro.nextGyro() to iterate on
     * next gyroscopes.
     *
     * @return a pointer to a YGyro object, corresponding to
     *         the first gyro currently online, or a null pointer
     *         if there are none.
     */
    static FirstGyro(): YGyro | null
    {
        let next_hwid = YAPI.imm_getFirstHardwareId('Gyro');
        if (next_hwid == null) return null;
        return YGyro.FindGyro(next_hwid);
    }

    /**
     * Starts the enumeration of gyroscopes currently accessible.
     * Use the method YGyro.nextGyro() to iterate on
     * next gyroscopes.
     *
     * @param yctx : a YAPI context.
     *
     * @return a pointer to a YGyro object, corresponding to
     *         the first gyro currently online, or a null pointer
     *         if there are none.
     */
    static FirstGyroInContext(yctx: YAPIContext): YGyro | null
    {
        let next_hwid = yctx.imm_getFirstHardwareId('Gyro');
        if (next_hwid == null) return null;
        return YGyro.FindGyroInContext(yctx, next_hwid);
    }

    //--- (end of generated code: YGyro implementation)
}

export namespace YGyro
{
    //--- (generated code: YGyro definitions)
    export interface ValueCallback {(func: YGyro, value: string): void}

    export interface TimedReportCallback {(func: YGyro, measure: YMeasure): void}

    //--- (end of generated code: YGyro definitions)
    export interface YQuatCallback{ (func: YGyro, w: number, x: number, y:number, z: number): void }
    export interface YAnglesCallback{ (func: YGyro, roll: number, pitch: number, head:number): void }
}