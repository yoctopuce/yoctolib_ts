/*********************************************************************
 *
 *  $Id: yocto_voc.ts 59977 2024-03-18 15:02:32Z mvuilleu $
 *
 *  Implements the high-level API for Voc functions
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

//--- (YVoc class start)
/**
 * YVoc Class: Volatile Organic Compound sensor control interface, available for instance in the Yocto-VOC-V3
 *
 * The YVoc class allows you to read and configure Yoctopuce Volatile Organic Compound sensors.
 * It inherits from YSensor class the core functions to read measurements,
 * to register callback functions, and to access the autonomous datalogger.
 */
//--- (end of YVoc class start)

export class YVoc extends YSensor
{
    //--- (YVoc attributes declaration)
    _className: string;
    _valueCallbackVoc: YVoc.ValueCallback | null = null;
    _timedReportCallbackVoc: YVoc.TimedReportCallback | null = null;

    // API symbols as static members
    //--- (end of YVoc attributes declaration)

    constructor(yapi: YAPIContext, func: string)
    {
        //--- (YVoc constructor)
        super(yapi, func);
        this._className                  = 'Voc';
        //--- (end of YVoc constructor)
    }

    //--- (YVoc implementation)

    /**
     * Retrieves a Volatile Organic Compound sensor for a given identifier.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the Volatile Organic Compound sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YVoc.isOnline() to test if the Volatile Organic Compound sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a Volatile Organic Compound sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the Volatile Organic Compound sensor, for instance
     *         YVOCMK03.voc.
     *
     * @return a YVoc object allowing you to drive the Volatile Organic Compound sensor.
     */
    static FindVoc(func: string): YVoc
    {
        let obj: YVoc | null;
        obj = <YVoc> YFunction._FindFromCache('Voc', func);
        if (obj == null) {
            obj = new YVoc(YAPI, func);
            YFunction._AddToCache('Voc',  func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a Volatile Organic Compound sensor for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the Volatile Organic Compound sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YVoc.isOnline() to test if the Volatile Organic Compound sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a Volatile Organic Compound sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx : a YAPI context
     * @param func : a string that uniquely characterizes the Volatile Organic Compound sensor, for instance
     *         YVOCMK03.voc.
     *
     * @return a YVoc object allowing you to drive the Volatile Organic Compound sensor.
     */
    static FindVocInContext(yctx: YAPIContext, func: string): YVoc
    {
        let obj: YVoc | null;
        obj = <YVoc> YFunction._FindFromCacheInContext(yctx,  'Voc', func);
        if (obj == null) {
            obj = new YVoc(yctx, func);
            YFunction._AddToCache('Voc',  func, obj);
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
    async registerValueCallback(callback: YVoc.ValueCallback | null): Promise<number>
    {
        let val: string;
        if (callback != null) {
            await YFunction._UpdateValueCallbackList(this, true);
        } else {
            await YFunction._UpdateValueCallbackList(this, false);
        }
        this._valueCallbackVoc = callback;
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
        if (this._valueCallbackVoc != null) {
            try {
                await this._valueCallbackVoc(this, value);
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
    async registerTimedReportCallback(callback: YVoc.TimedReportCallback | null): Promise<number>
    {
        let sensor: YSensor | null;
        sensor = this;
        if (callback != null) {
            await YFunction._UpdateTimedReportCallbackList(sensor, true);
        } else {
            await YFunction._UpdateTimedReportCallbackList(sensor, false);
        }
        this._timedReportCallbackVoc = callback;
        return 0;
    }

    async _invokeTimedReportCallback(value: YMeasure): Promise<number>
    {
        if (this._timedReportCallbackVoc != null) {
            try {
                await this._timedReportCallbackVoc(this, value);
            } catch (e) {
                this._yapi.imm_log('Exception in timedReportCallback:', e);
            }
        } else {
            await super._invokeTimedReportCallback(value);
        }
        return 0;
    }

    /**
     * Continues the enumeration of Volatile Organic Compound sensors started using yFirstVoc().
     * Caution: You can't make any assumption about the returned Volatile Organic Compound sensors order.
     * If you want to find a specific a Volatile Organic Compound sensor, use Voc.findVoc()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YVoc object, corresponding to
     *         a Volatile Organic Compound sensor currently online, or a null pointer
     *         if there are no more Volatile Organic Compound sensors to enumerate.
     */
    nextVoc(): YVoc | null
    {
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != YAPI.SUCCESS) return null;
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, <string> resolve.result);
        if (next_hwid == null) return null;
        return YVoc.FindVocInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of Volatile Organic Compound sensors currently accessible.
     * Use the method YVoc.nextVoc() to iterate on
     * next Volatile Organic Compound sensors.
     *
     * @return a pointer to a YVoc object, corresponding to
     *         the first Volatile Organic Compound sensor currently online, or a null pointer
     *         if there are none.
     */
    static FirstVoc(): YVoc | null
    {
        let next_hwid = YAPI.imm_getFirstHardwareId('Voc');
        if (next_hwid == null) return null;
        return YVoc.FindVoc(next_hwid);
    }

    /**
     * Starts the enumeration of Volatile Organic Compound sensors currently accessible.
     * Use the method YVoc.nextVoc() to iterate on
     * next Volatile Organic Compound sensors.
     *
     * @param yctx : a YAPI context.
     *
     * @return a pointer to a YVoc object, corresponding to
     *         the first Volatile Organic Compound sensor currently online, or a null pointer
     *         if there are none.
     */
    static FirstVocInContext(yctx: YAPIContext): YVoc | null
    {
        let next_hwid = yctx.imm_getFirstHardwareId('Voc');
        if (next_hwid == null) return null;
        return YVoc.FindVocInContext(yctx, next_hwid);
    }

    //--- (end of YVoc implementation)
}

export namespace YVoc {
    //--- (YVoc definitions)
    export interface ValueCallback {(func: YVoc, value: string): void}

    export interface TimedReportCallback {(func: YVoc, measure: YMeasure): void}

    //--- (end of YVoc definitions)
}

