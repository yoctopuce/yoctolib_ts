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
import { YAPIContext, YSensor, YMeasure } from './yocto_api.js';
/**
 * YOrientation Class: orientation sensor control interface
 *
 * The YOrientation class allows you to read and configure Yoctopuce orientation sensors.
 * It inherits from YSensor class the core functions to read measurements,
 * to register callback functions, and to access the autonomous datalogger.
 */
export declare class YOrientation extends YSensor {
    _className: string;
    _command: string;
    _zeroOffset: number;
    _valueCallbackOrientation: YOrientation.ValueCallback | null;
    _timedReportCallbackOrientation: YOrientation.TimedReportCallback | null;
    readonly COMMAND_INVALID: string;
    readonly ZEROOFFSET_INVALID: number;
    static readonly COMMAND_INVALID: string;
    static readonly ZEROOFFSET_INVALID: number;
    constructor(yapi: YAPIContext, func: string);
    imm_parseAttr(name: string, val: any): number;
    get_command(): Promise<string>;
    set_command(newval: string): Promise<number>;
    /**
     * Sets an offset between the orientation reported by the sensor and the actual orientation. This
     * can typically be used  to compensate for mechanical offset. This offset can also be set
     * automatically using the zero() method.
     * Remember to call the saveToFlash() method of the module if the modification must be kept.
     * On failure, throws an exception or returns a negative error code.
     *
     * @param newval : a floating point number
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_zeroOffset(newval: number): Promise<number>;
    /**
     * Returns the Offset between the orientation reported by the sensor and the actual orientation.
     *
     * @return a floating point number corresponding to the Offset between the orientation reported by the
     * sensor and the actual orientation
     *
     * On failure, throws an exception or returns YOrientation.ZEROOFFSET_INVALID.
     */
    get_zeroOffset(): Promise<number>;
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
    static FindOrientation(func: string): YOrientation;
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
    static FindOrientationInContext(yctx: YAPIContext, func: string): YOrientation;
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
    registerValueCallback(callback: YOrientation.ValueCallback | null): Promise<number>;
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
    registerTimedReportCallback(callback: YOrientation.TimedReportCallback | null): Promise<number>;
    _invokeTimedReportCallback(value: YMeasure): Promise<number>;
    sendCommand(command: string): Promise<number>;
    /**
     * Reset the sensor's zero to current position by automatically setting a new offset.
     * Remember to call the saveToFlash() method of the module if the modification must be kept.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    zero(): Promise<number>;
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
    set_calibration(offsetValues: number[]): Promise<number>;
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
    get_Calibration(offsetValues: number[]): Promise<number>;
    /**
     * Cancels any calibration set with set_calibration. This function
     * is equivalent to calling set_calibration with only zeros.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    clearCalibration(): Promise<number>;
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
    nextOrientation(): YOrientation | null;
    /**
     * Starts the enumeration of orientation sensors currently accessible.
     * Use the method YOrientation.nextOrientation() to iterate on
     * next orientation sensors.
     *
     * @return a pointer to a YOrientation object, corresponding to
     *         the first orientation sensor currently online, or a null pointer
     *         if there are none.
     */
    static FirstOrientation(): YOrientation | null;
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
    static FirstOrientationInContext(yctx: YAPIContext): YOrientation | null;
}
export declare namespace YOrientation {
    interface ValueCallback {
        (func: YOrientation, value: string): void;
    }
    interface TimedReportCallback {
        (func: YOrientation, measure: YMeasure): void;
    }
}
