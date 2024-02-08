/*********************************************************************
 *
 *  $Id: svn_id $
 *
 *  Implements the high-level API for Threshold functions
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
 * YThreshold Class: Control interface to define a threshold
 *
 * The Threshold class allows you define a threshold on a Yoctopuce sensor
 * to trigger a predefined action, on specific devices where this is implemented.
 */
export declare class YThreshold extends YFunction {
    _className: string;
    _thresholdState: YThreshold.THRESHOLDSTATE;
    _targetSensor: string;
    _alertLevel: number;
    _safeLevel: number;
    _valueCallbackThreshold: YThreshold.ValueCallback | null;
    readonly THRESHOLDSTATE_SAFE: YThreshold.THRESHOLDSTATE;
    readonly THRESHOLDSTATE_ALERT: YThreshold.THRESHOLDSTATE;
    readonly THRESHOLDSTATE_INVALID: YThreshold.THRESHOLDSTATE;
    readonly TARGETSENSOR_INVALID: string;
    readonly ALERTLEVEL_INVALID: number;
    readonly SAFELEVEL_INVALID: number;
    static readonly THRESHOLDSTATE_SAFE: YThreshold.THRESHOLDSTATE;
    static readonly THRESHOLDSTATE_ALERT: YThreshold.THRESHOLDSTATE;
    static readonly THRESHOLDSTATE_INVALID: YThreshold.THRESHOLDSTATE;
    static readonly TARGETSENSOR_INVALID: string;
    static readonly ALERTLEVEL_INVALID: number;
    static readonly SAFELEVEL_INVALID: number;
    constructor(yapi: YAPIContext, func: string);
    imm_parseAttr(name: string, val: any): number;
    /**
     * Returns current state of the threshold function.
     *
     * @return either YThreshold.THRESHOLDSTATE_SAFE or YThreshold.THRESHOLDSTATE_ALERT, according to
     * current state of the threshold function
     *
     * On failure, throws an exception or returns YThreshold.THRESHOLDSTATE_INVALID.
     */
    get_thresholdState(): Promise<YThreshold.THRESHOLDSTATE>;
    /**
     * Returns the name of the sensor monitored by the threshold function.
     *
     * @return a string corresponding to the name of the sensor monitored by the threshold function
     *
     * On failure, throws an exception or returns YThreshold.TARGETSENSOR_INVALID.
     */
    get_targetSensor(): Promise<string>;
    /**
     * Changes the sensor alert level triggering the threshold function.
     * Remember to call the matching module saveToFlash()
     * method if you want to preserve the setting after reboot.
     *
     * @param newval : a floating point number corresponding to the sensor alert level triggering the
     * threshold function
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_alertLevel(newval: number): Promise<number>;
    /**
     * Returns the sensor alert level, triggering the threshold function.
     *
     * @return a floating point number corresponding to the sensor alert level, triggering the threshold function
     *
     * On failure, throws an exception or returns YThreshold.ALERTLEVEL_INVALID.
     */
    get_alertLevel(): Promise<number>;
    /**
     * Changes the sensor acceptable level for disabling the threshold function.
     * Remember to call the matching module saveToFlash()
     * method if you want to preserve the setting after reboot.
     *
     * @param newval : a floating point number corresponding to the sensor acceptable level for disabling
     * the threshold function
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_safeLevel(newval: number): Promise<number>;
    /**
     * Returns the sensor acceptable level for disabling the threshold function.
     *
     * @return a floating point number corresponding to the sensor acceptable level for disabling the
     * threshold function
     *
     * On failure, throws an exception or returns YThreshold.SAFELEVEL_INVALID.
     */
    get_safeLevel(): Promise<number>;
    /**
     * Retrieves a threshold function for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the threshold function is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YThreshold.isOnline() to test if the threshold function is
     * indeed online at a given time. In case of ambiguity when looking for
     * a threshold function by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the threshold function, for instance
     *         MyDevice.threshold1.
     *
     * @return a YThreshold object allowing you to drive the threshold function.
     */
    static FindThreshold(func: string): YThreshold;
    /**
     * Retrieves a threshold function for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the threshold function is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YThreshold.isOnline() to test if the threshold function is
     * indeed online at a given time. In case of ambiguity when looking for
     * a threshold function by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx : a YAPI context
     * @param func : a string that uniquely characterizes the threshold function, for instance
     *         MyDevice.threshold1.
     *
     * @return a YThreshold object allowing you to drive the threshold function.
     */
    static FindThresholdInContext(yctx: YAPIContext, func: string): YThreshold;
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
    registerValueCallback(callback: YThreshold.ValueCallback | null): Promise<number>;
    _invokeValueCallback(value: string): Promise<number>;
    /**
     * Continues the enumeration of threshold functions started using yFirstThreshold().
     * Caution: You can't make any assumption about the returned threshold functions order.
     * If you want to find a specific a threshold function, use Threshold.findThreshold()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YThreshold object, corresponding to
     *         a threshold function currently online, or a null pointer
     *         if there are no more threshold functions to enumerate.
     */
    nextThreshold(): YThreshold | null;
    /**
     * Starts the enumeration of threshold functions currently accessible.
     * Use the method YThreshold.nextThreshold() to iterate on
     * next threshold functions.
     *
     * @return a pointer to a YThreshold object, corresponding to
     *         the first threshold function currently online, or a null pointer
     *         if there are none.
     */
    static FirstThreshold(): YThreshold | null;
    /**
     * Starts the enumeration of threshold functions currently accessible.
     * Use the method YThreshold.nextThreshold() to iterate on
     * next threshold functions.
     *
     * @param yctx : a YAPI context.
     *
     * @return a pointer to a YThreshold object, corresponding to
     *         the first threshold function currently online, or a null pointer
     *         if there are none.
     */
    static FirstThresholdInContext(yctx: YAPIContext): YThreshold | null;
}
export declare namespace YThreshold {
    const enum THRESHOLDSTATE {
        SAFE = 0,
        ALERT = 1,
        INVALID = -1
    }
    interface ValueCallback {
        (func: YThreshold, value: string): void;
    }
}
