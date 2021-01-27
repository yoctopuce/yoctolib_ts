/*********************************************************************
 *
 *  $Id: yocto_oscontrol.ts 43483 2021-01-21 15:47:50Z mvuilleu $
 *
 *  Implements the high-level API for OsControl functions
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

//--- (YOsControl definitions)
export interface YOsControlValueCallback { (func: YOsControl, value: string): void }
//--- (end of YOsControl definitions)

//--- (YOsControl class start)
/**
 * YOsControl Class: Operating system control interface via the VirtualHub application
 *
 * The YOScontrol class provides some control over the operating system running a VirtualHub.
 * YOsControl is available on VirtualHub software only. This feature must be activated at the VirtualHub
 * start up with -o option.
 */
//--- (end of YOsControl class start)

export class YOsControl extends YFunction
{
    //--- (YOsControl attributes declaration)
    _className: string;
    _shutdownCountdown: number = YOsControl.SHUTDOWNCOUNTDOWN_INVALID;
    _valueCallbackOsControl: YOsControlValueCallback | null = null;

    // API symbols as object properties
    public readonly SHUTDOWNCOUNTDOWN_INVALID: number = YAPI.INVALID_UINT;

    // API symbols as static members
    public static readonly SHUTDOWNCOUNTDOWN_INVALID: number = YAPI.INVALID_UINT;
    //--- (end of YOsControl attributes declaration)

//--- (YOsControl return codes)
//--- (end of YOsControl return codes)

    constructor(yapi: YAPIContext, func: string)
    {
        //--- (YOsControl constructor)
        super(yapi, func);
        this._className                  = 'OsControl';
        //--- (end of YOsControl constructor)
    }

    //--- (YOsControl implementation)

    imm_parseAttr(name: string, val: any)
    {
        switch(name) {
        case 'shutdownCountdown':
            this._shutdownCountdown = <number> <number> val;
            return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Returns the remaining number of seconds before the OS shutdown, or zero when no
     * shutdown has been scheduled.
     *
     * @return an integer corresponding to the remaining number of seconds before the OS shutdown, or zero when no
     *         shutdown has been scheduled
     *
     * On failure, throws an exception or returns YOsControl.SHUTDOWNCOUNTDOWN_INVALID.
     */
    async get_shutdownCountdown(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YOsControl.SHUTDOWNCOUNTDOWN_INVALID;
            }
        }
        res = this._shutdownCountdown;
        return res;
    }

    async set_shutdownCountdown(newval: number): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('shutdownCountdown',rest_val);
    }

    /**
     * Retrieves OS control for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the OS control is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YOsControl.isOnline() to test if the OS control is
     * indeed online at a given time. In case of ambiguity when looking for
     * OS control by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the OS control, for instance
     *         MyDevice.osControl.
     *
     * @return a YOsControl object allowing you to drive the OS control.
     */
    static FindOsControl(func: string): YOsControl
    {
        let obj: YOsControl;
        obj = <YOsControl> YFunction._FindFromCache('OsControl', func);
        if (obj == null) {
            obj = new YOsControl(YAPI, func);
            YFunction._AddToCache('OsControl',  func, obj);
        }
        return obj;
    }

    /**
     * Retrieves OS control for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the OS control is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YOsControl.isOnline() to test if the OS control is
     * indeed online at a given time. In case of ambiguity when looking for
     * OS control by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx : a YAPI context
     * @param func : a string that uniquely characterizes the OS control, for instance
     *         MyDevice.osControl.
     *
     * @return a YOsControl object allowing you to drive the OS control.
     */
    static FindOsControlInContext(yctx: YAPIContext, func: string): YOsControl
    {
        let obj: YOsControl;
        obj = <YOsControl> YFunction._FindFromCacheInContext(yctx,  'OsControl', func);
        if (obj == null) {
            obj = new YOsControl(yctx, func);
            YFunction._AddToCache('OsControl',  func, obj);
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
    async registerValueCallback(callback: YOsControlValueCallback | null): Promise<number>
    {
        let val: string;
        if (callback != null) {
            await YFunction._UpdateValueCallbackList(this, true);
        } else {
            await YFunction._UpdateValueCallbackList(this, false);
        }
        this._valueCallbackOsControl = callback;
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
        if (this._valueCallbackOsControl != null) {
            try {
                await this._valueCallbackOsControl(this, value);
            } catch (e) {
                this._yapi.imm_log('Exception in valueCallback:', e);
            }
        } else {
            super._invokeValueCallback(value);
        }
        return 0;
    }

    /**
     * Schedules an OS shutdown after a given number of seconds.
     *
     * @param secBeforeShutDown : number of seconds before shutdown
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async shutdown(secBeforeShutDown: number): Promise<number>
    {
        return await this.set_shutdownCountdown(secBeforeShutDown);
    }

    /**
     * Continues the enumeration of OS control started using yFirstOsControl().
     * Caution: You can't make any assumption about the returned OS control order.
     * If you want to find a specific OS control, use OsControl.findOsControl()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YOsControl object, corresponding to
     *         OS control currently online, or a null pointer
     *         if there are no more OS control to enumerate.
     */
    nextOsControl(): YOsControl | null
    {
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI.SUCCESS) return null;
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, <string> resolve.result);
        if(next_hwid == null) return null;
        return YOsControl.FindOsControlInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of OS control currently accessible.
     * Use the method YOsControl.nextOsControl() to iterate on
     * next OS control.
     *
     * @return a pointer to a YOsControl object, corresponding to
     *         the first OS control currently online, or a null pointer
     *         if there are none.
     */
    static FirstOsControl(): YOsControl | null
    {
        let next_hwid = YAPI.imm_getFirstHardwareId('OsControl');
        if(next_hwid == null) return null;
        return YOsControl.FindOsControl(next_hwid);
    }

    /**
     * Starts the enumeration of OS control currently accessible.
     * Use the method YOsControl.nextOsControl() to iterate on
     * next OS control.
     *
     * @param yctx : a YAPI context.
     *
     * @return a pointer to a YOsControl object, corresponding to
     *         the first OS control currently online, or a null pointer
     *         if there are none.
     */
    static FirstOsControlInContext(yctx: YAPIContext): YOsControl | null
    {
        let next_hwid = yctx.imm_getFirstHardwareId('OsControl');
        if(next_hwid == null) return null;
        return YOsControl.FindOsControlInContext(yctx, next_hwid);
    }

    //--- (end of YOsControl implementation)
}

