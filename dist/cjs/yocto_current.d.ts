/*********************************************************************
 *
 *  $Id: svn_id $
 *
 *  Implements the high-level API for Current functions
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
 * YCurrent Class: current sensor control interface, available for instance in the Yocto-Amp, the
 * Yocto-Motor-DC or the Yocto-Watt
 *
 * The YCurrent class allows you to read and configure Yoctopuce current sensors.
 * It inherits from YSensor class the core functions to read measures,
 * to register callback functions, and to access the autonomous datalogger.
 */
export declare class YCurrent extends YSensor {
    _className: string;
    _enabled: YCurrent.ENABLED;
    _valueCallbackCurrent: YCurrent.ValueCallback | null;
    _timedReportCallbackCurrent: YCurrent.TimedReportCallback | null;
    readonly ENABLED_FALSE: YCurrent.ENABLED;
    readonly ENABLED_TRUE: YCurrent.ENABLED;
    readonly ENABLED_INVALID: YCurrent.ENABLED;
    static readonly ENABLED_FALSE: YCurrent.ENABLED;
    static readonly ENABLED_TRUE: YCurrent.ENABLED;
    static readonly ENABLED_INVALID: YCurrent.ENABLED;
    constructor(yapi: YAPIContext, func: string);
    imm_parseAttr(name: string, val: any): number;
    /**
     * Returns the activation state of this input.
     *
     * @return either YCurrent.ENABLED_FALSE or YCurrent.ENABLED_TRUE, according to the activation state of this input
     *
     * On failure, throws an exception or returns YCurrent.ENABLED_INVALID.
     */
    get_enabled(): Promise<YCurrent.ENABLED>;
    /**
     * Changes the activation state of this voltage input. When AC measures are disabled,
     * the device will always assume a DC signal, and vice-versa. When both AC and DC measures
     * are active, the device switches between AC and DC mode based on the relative amplitude
     * of variations compared to the average value.
     * Remember to call the saveToFlash()
     * method of the module if the modification must be kept.
     *
     * @param newval : either YCurrent.ENABLED_FALSE or YCurrent.ENABLED_TRUE, according to the activation
     * state of this voltage input
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_enabled(newval: YCurrent.ENABLED): Promise<number>;
    /**
     * Retrieves a current sensor for a given identifier.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the current sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YCurrent.isOnline() to test if the current sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a current sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the current sensor, for instance
     *         YAMPMK01.current1.
     *
     * @return a YCurrent object allowing you to drive the current sensor.
     */
    static FindCurrent(func: string): YCurrent;
    /**
     * Retrieves a current sensor for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the current sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YCurrent.isOnline() to test if the current sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a current sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx : a YAPI context
     * @param func : a string that uniquely characterizes the current sensor, for instance
     *         YAMPMK01.current1.
     *
     * @return a YCurrent object allowing you to drive the current sensor.
     */
    static FindCurrentInContext(yctx: YAPIContext, func: string): YCurrent;
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
    registerValueCallback(callback: YCurrent.ValueCallback | null): Promise<number>;
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
    registerTimedReportCallback(callback: YCurrent.TimedReportCallback | null): Promise<number>;
    _invokeTimedReportCallback(value: YMeasure): Promise<number>;
    /**
     * Continues the enumeration of current sensors started using yFirstCurrent().
     * Caution: You can't make any assumption about the returned current sensors order.
     * If you want to find a specific a current sensor, use Current.findCurrent()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YCurrent object, corresponding to
     *         a current sensor currently online, or a null pointer
     *         if there are no more current sensors to enumerate.
     */
    nextCurrent(): YCurrent | null;
    /**
     * Starts the enumeration of current sensors currently accessible.
     * Use the method YCurrent.nextCurrent() to iterate on
     * next current sensors.
     *
     * @return a pointer to a YCurrent object, corresponding to
     *         the first current sensor currently online, or a null pointer
     *         if there are none.
     */
    static FirstCurrent(): YCurrent | null;
    /**
     * Starts the enumeration of current sensors currently accessible.
     * Use the method YCurrent.nextCurrent() to iterate on
     * next current sensors.
     *
     * @param yctx : a YAPI context.
     *
     * @return a pointer to a YCurrent object, corresponding to
     *         the first current sensor currently online, or a null pointer
     *         if there are none.
     */
    static FirstCurrentInContext(yctx: YAPIContext): YCurrent | null;
}
export declare namespace YCurrent {
    const enum ENABLED {
        FALSE = 0,
        TRUE = 1,
        INVALID = -1
    }
    interface ValueCallback {
        (func: YCurrent, value: string): void;
    }
    interface TimedReportCallback {
        (func: YCurrent, measure: YMeasure): void;
    }
}
