/*********************************************************************
 *
 *  $Id: svn_id $
 *
 *  Implements the high-level API for Orientation functions
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

//--- (YOrientation class start)
/**
 * YOrientation Class: orientation sensor control interface
 *
 * The YOrientation class allows you to read and configure Yoctopuce orientation sensors.
 * It inherits from YSensor class the core functions to read measurements,
 * to register callback functions, and to access the autonomous datalogger.
 */
//--- (end of YOrientation class start)

export class YOrientation extends YSensor
{
    //--- (YOrientation attributes declaration)
    _className: string;
    _counterClockwise: YOrientation.COUNTERCLOCKWISE = YOrientation.COUNTERCLOCKWISE_INVALID;
    _command: string = YOrientation.COMMAND_INVALID;
    _zeroOffset: number = YOrientation.ZEROOFFSET_INVALID;
    _valueCallbackOrientation: YOrientation.ValueCallback | null = null;
    _timedReportCallbackOrientation: YOrientation.TimedReportCallback | null = null;

    // API symbols as object properties
    public readonly COUNTERCLOCKWISE_FALSE: YOrientation.COUNTERCLOCKWISE = 0;
    public readonly COUNTERCLOCKWISE_TRUE: YOrientation.COUNTERCLOCKWISE = 1;
    public readonly COUNTERCLOCKWISE_INVALID: YOrientation.COUNTERCLOCKWISE = -1;
    public readonly COMMAND_INVALID: string = YAPI.INVALID_STRING;
    public readonly ZEROOFFSET_INVALID: number = YAPI.INVALID_DOUBLE;

    // API symbols as static members
    public static readonly COUNTERCLOCKWISE_FALSE: YOrientation.COUNTERCLOCKWISE = 0;
    public static readonly COUNTERCLOCKWISE_TRUE: YOrientation.COUNTERCLOCKWISE = 1;
    public static readonly COUNTERCLOCKWISE_INVALID: YOrientation.COUNTERCLOCKWISE = -1;
    public static readonly COMMAND_INVALID: string = YAPI.INVALID_STRING;
    public static readonly ZEROOFFSET_INVALID: number = YAPI.INVALID_DOUBLE;
    //--- (end of YOrientation attributes declaration)

    constructor(yapi: YAPIContext, func: string)
    {
        //--- (YOrientation constructor)
        super(yapi, func);
        this._className                  = 'Orientation';
        //--- (end of YOrientation constructor)
    }

    //--- (YOrientation implementation)

    imm_parseAttr(name: string, val: any): number
    {
        switch (name) {
        case 'counterClockwise':
            this._counterClockwise = <YOrientation.COUNTERCLOCKWISE> <number> val;
            return 1;
        case 'command':
            this._command = <string> <string> val;
            return 1;
        case 'zeroOffset':
            this._zeroOffset = <number> Math.round(<number>val / 65.536) / 1000.0;
            return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Returns a value indicating whether the sensor is operating in a counterclockwise direction.
     *
     * @return either YOrientation.COUNTERCLOCKWISE_FALSE or YOrientation.COUNTERCLOCKWISE_TRUE, according
     * to a value indicating whether the sensor is operating in a counterclockwise direction
     *
     * On failure, throws an exception or returns YOrientation.COUNTERCLOCKWISE_INVALID.
     */
    async get_counterClockwise(): Promise<YOrientation.COUNTERCLOCKWISE>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YOrientation.COUNTERCLOCKWISE_INVALID;
            }
        }
        res = this._counterClockwise;
        return res;
    }

    /**
     * Defines the operating direction of the sensor.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : either YOrientation.COUNTERCLOCKWISE_FALSE or YOrientation.COUNTERCLOCKWISE_TRUE
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_counterClockwise(newval: YOrientation.COUNTERCLOCKWISE): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('counterClockwise', rest_val);
    }

    async get_command(): Promise<string>
    {
        let res: string;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YOrientation.COMMAND_INVALID;
            }
        }
        res = this._command;
        return res;
    }

    async set_command(newval: string): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('command', rest_val);
    }

    /**
     * Sets an offset between the orientation reported by the sensor and the actual orientation. This
     * can typically be used  to compensate for mechanical offset. This offset can also be set
     * automatically using the zero() method.
     * Remember to call the saveToFlash() method of the module if the modification must be kept.
     *
     * @param newval : a floating point number
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_zeroOffset(newval: number): Promise<number>
    {
        let rest_val: string;
        rest_val = String(Math.round(newval * 65536.0));
        return await this._setAttr('zeroOffset', rest_val);
    }

    /**
     * Returns the Offset between the orientation reported by the sensor and the actual orientation.
     *
     * @return a floating point number corresponding to the Offset between the orientation reported by the
     * sensor and the actual orientation
     *
     * On failure, throws an exception or returns YOrientation.ZEROOFFSET_INVALID.
     */
    async get_zeroOffset(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YOrientation.ZEROOFFSET_INVALID;
            }
        }
        res = this._zeroOffset;
        return res;
    }

    /**
     * Retrieves an orientation sensor for a given identifier.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the orientation sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YOrientation.isOnline() to test if the orientation sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * an orientation sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the orientation sensor, for instance
     *         MyDevice.orientation.
     *
     * @return a YOrientation object allowing you to drive the orientation sensor.
     */
    static FindOrientation(func: string): YOrientation
    {
        let obj: YOrientation | null;
        obj = <YOrientation> YFunction._FindFromCache('Orientation', func);
        if (obj == null) {
            obj = new YOrientation(YAPI, func);
            YFunction._AddToCache('Orientation', func, obj);
        }
        return obj;
    }

    /**
     * Retrieves an orientation sensor for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the orientation sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YOrientation.isOnline() to test if the orientation sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * an orientation sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx : a YAPI context
     * @param func : a string that uniquely characterizes the orientation sensor, for instance
     *         MyDevice.orientation.
     *
     * @return a YOrientation object allowing you to drive the orientation sensor.
     */
    static FindOrientationInContext(yctx: YAPIContext, func: string): YOrientation
    {
        let obj: YOrientation | null;
        obj = <YOrientation> YFunction._FindFromCacheInContext(yctx, 'Orientation', func);
        if (obj == null) {
            obj = new YOrientation(yctx, func);
            YFunction._AddToCache('Orientation', func, obj);
        }
        return obj;
    }

    /**
     * Registers the callback function that is invoked on every change of advertised value.
     * The callback is then invoked only during the execution of ySleep or yHandleEvents.
     * This provides control over the time when the callback is triggered. For good responsiveness,
     * remember to call one of these two functions periodically. The callback is called once juste after beeing
     * registered, passing the current advertised value  of the function, provided that it is not an empty string.
     * To unregister a callback, pass a null pointer as argument.
     *
     * @param callback : the callback function to call, or a null pointer. The callback function should take two
     *         arguments: the function object of which the value has changed, and the character string describing
     *         the new advertised value.
     * @noreturn
     */
    async registerValueCallback(callback: YOrientation.ValueCallback | null): Promise<number>
    {
        let val: string;
        if (callback != null) {
            await YFunction._UpdateValueCallbackList(this, true);
        } else {
            await YFunction._UpdateValueCallbackList(this, false);
        }
        this._valueCallbackOrientation = callback;
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
        if (this._valueCallbackOrientation != null) {
            try {
                await this._valueCallbackOrientation(this, value);
            } catch (e) {
                this._yapi.imm_log('Exception in valueCallback:', e);
            }
        } else {
            await super._invokeValueCallback(value);
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
    async registerTimedReportCallback(callback: YOrientation.TimedReportCallback | null): Promise<number>
    {
        let sensor: YSensor | null;
        sensor = this;
        if (callback != null) {
            await YFunction._UpdateTimedReportCallbackList(sensor, true);
        } else {
            await YFunction._UpdateTimedReportCallbackList(sensor, false);
        }
        this._timedReportCallbackOrientation = callback;
        return 0;
    }

    async _invokeTimedReportCallback(value: YMeasure): Promise<number>
    {
        if (this._timedReportCallbackOrientation != null) {
            try {
                await this._timedReportCallbackOrientation(this, value);
            } catch (e) {
                this._yapi.imm_log('Exception in timedReportCallback:', e);
            }
        } else {
            await super._invokeTimedReportCallback(value);
        }
        return 0;
    }

    async sendCommand(command: string): Promise<number>
    {
        return await this.set_command(command);
    }

    /**
     * Reset the sensor's zero to current position by automatically setting a new offset.
     * Remember to call the saveToFlash() method of the module if the modification must be kept.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    async zero(): Promise<number>
    {
        return await this.sendCommand('Z');
    }

    /**
     * Modifies the calibration of the MA600A sensor using an array of 32
     * values representing the offset in degrees between the true values and
     * those measured regularly every 11.25 degrees starting from zero. The calibration
     * is applied immediately and is stored permanently in the MA600A sensor.
     * Before calculating the offset values, remember to clear any previous
     * calibration using the clearCalibration function and set
     * the zero offset  to 0. After a calibration change, the sensor will stop
     * measurements for about one second.
     * Do not confuse this function with the generic calibrateFromPoints function,
     * which works at the YSensor level and is not necessarily well suited to
     * a sensor returning circular values.
     *
     * @param offsetValues : array of 32 floating point values in the [-11.25..+11.25] range
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_calibration(offsetValues: number[]): Promise<number>
    {
        let res: string;
        let npt: number;
        let idx: number;
        let corr: number;
        npt = offsetValues.length;
        if (npt != 32) {
            this._throw(this._yapi.INVALID_ARGUMENT, 'Invalid calibration parameters (32 expected)');
            return this._yapi.INVALID_ARGUMENT;
        }
        res = 'C';
        idx = 0;
        while (idx < npt) {
            corr = <number> Math.round(offsetValues[idx] * 128 / 11.25);
            if ((corr < -128) || (corr > 127)) {
                this._throw(this._yapi.INVALID_ARGUMENT, 'Calibration parameter exceeds permitted range (+/-11.25)');
                return this._yapi.INVALID_ARGUMENT;
            }
            if (corr < 0) {
                corr = corr + 256;
            }
            res = res + '' + ('00'+(corr).toString(16)).slice(-2).toLowerCase();
            idx = idx + 1;
        }
        return await this.sendCommand(res);
    }

    /**
     * Retrieves offset correction data points previously entered using the method
     * set_calibration.
     *
     * @param offsetValues : array of 32 floating point numbers, that will be filled by the
     *         function with the offset values for the correction points.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async get_Calibration(offsetValues: number[]): Promise<number>
    {
        return 0;
    }

    /**
     * Cancels any calibration set with set_calibration. This function
     * is equivalent to calling set_calibration with only zeros.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async clearCalibration(): Promise<number>
    {
        return await this.sendCommand('-');
    }

    /**
     * Continues the enumeration of orientation sensors started using yFirstOrientation().
     * Caution: You can't make any assumption about the returned orientation sensors order.
     * If you want to find a specific an orientation sensor, use Orientation.findOrientation()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YOrientation object, corresponding to
     *         an orientation sensor currently online, or a null pointer
     *         if there are no more orientation sensors to enumerate.
     */
    nextOrientation(): YOrientation | null
    {
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != YAPI.SUCCESS) return null;
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, <string> resolve.result);
        if (next_hwid == null) return null;
        return YOrientation.FindOrientationInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of orientation sensors currently accessible.
     * Use the method YOrientation.nextOrientation() to iterate on
     * next orientation sensors.
     *
     * @return a pointer to a YOrientation object, corresponding to
     *         the first orientation sensor currently online, or a null pointer
     *         if there are none.
     */
    static FirstOrientation(): YOrientation | null
    {
        let next_hwid = YAPI.imm_getFirstHardwareId('Orientation');
        if (next_hwid == null) return null;
        return YOrientation.FindOrientation(next_hwid);
    }

    /**
     * Starts the enumeration of orientation sensors currently accessible.
     * Use the method YOrientation.nextOrientation() to iterate on
     * next orientation sensors.
     *
     * @param yctx : a YAPI context.
     *
     * @return a pointer to a YOrientation object, corresponding to
     *         the first orientation sensor currently online, or a null pointer
     *         if there are none.
     */
    static FirstOrientationInContext(yctx: YAPIContext): YOrientation | null
    {
        let next_hwid = yctx.imm_getFirstHardwareId('Orientation');
        if (next_hwid == null) return null;
        return YOrientation.FindOrientationInContext(yctx, next_hwid);
    }

    //--- (end of YOrientation implementation)
}

export namespace YOrientation {
    //--- (YOrientation definitions)
    export const enum COUNTERCLOCKWISE
    {
        FALSE = 0,
        TRUE = 1,
        INVALID = -1
    }

    export interface ValueCallback {(func: YOrientation, value: string): void}

    export interface TimedReportCallback {(func: YOrientation, measure: YMeasure): void}

    //--- (end of YOrientation definitions)
}

