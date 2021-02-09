/*********************************************************************
 *
 *  $Id: yocto_multisenscontroller.ts 43760 2021-02-08 14:33:45Z mvuilleu $
 *
 *  Implements the high-level API for MultiSensController functions
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

//--- (YMultiSensController class start)
/**
 * YMultiSensController Class: Sensor chain configuration interface, available for instance in the
 * Yocto-Temperature-IR
 *
 * The YMultiSensController class allows you to setup a customized
 * sensor chain on devices featuring that functionality.
 */
//--- (end of YMultiSensController class start)

export class YMultiSensController extends YFunction
{
    //--- (YMultiSensController attributes declaration)
    _className: string;
    _nSensors: number = YMultiSensController.NSENSORS_INVALID;
    _maxSensors: number = YMultiSensController.MAXSENSORS_INVALID;
    _maintenanceMode: YMultiSensController.MAINTENANCEMODE = YMultiSensController.MAINTENANCEMODE_INVALID;
    _command: string = YMultiSensController.COMMAND_INVALID;
    _valueCallbackMultiSensController: YMultiSensController.ValueCallback | null = null;

    // API symbols as object properties
    public readonly NSENSORS_INVALID: number = YAPI.INVALID_UINT;
    public readonly MAXSENSORS_INVALID: number = YAPI.INVALID_UINT;
    public readonly MAINTENANCEMODE_FALSE: YMultiSensController.MAINTENANCEMODE = 0;
    public readonly MAINTENANCEMODE_TRUE: YMultiSensController.MAINTENANCEMODE = 1;
    public readonly MAINTENANCEMODE_INVALID: YMultiSensController.MAINTENANCEMODE = -1;
    public readonly COMMAND_INVALID: string = YAPI.INVALID_STRING;

    // API symbols as static members
    public static readonly NSENSORS_INVALID: number = YAPI.INVALID_UINT;
    public static readonly MAXSENSORS_INVALID: number = YAPI.INVALID_UINT;
    public static readonly MAINTENANCEMODE_FALSE: YMultiSensController.MAINTENANCEMODE = 0;
    public static readonly MAINTENANCEMODE_TRUE: YMultiSensController.MAINTENANCEMODE = 1;
    public static readonly MAINTENANCEMODE_INVALID: YMultiSensController.MAINTENANCEMODE = -1;
    public static readonly COMMAND_INVALID: string = YAPI.INVALID_STRING;
    //--- (end of YMultiSensController attributes declaration)

    constructor(yapi: YAPIContext, func: string)
    {
        //--- (YMultiSensController constructor)
        super(yapi, func);
        this._className                  = 'MultiSensController';
        //--- (end of YMultiSensController constructor)
    }

    //--- (YMultiSensController implementation)

    imm_parseAttr(name: string, val: any)
    {
        switch(name) {
        case 'nSensors':
            this._nSensors = <number> <number> val;
            return 1;
        case 'maxSensors':
            this._maxSensors = <number> <number> val;
            return 1;
        case 'maintenanceMode':
            this._maintenanceMode = <YMultiSensController.MAINTENANCEMODE> <number> val;
            return 1;
        case 'command':
            this._command = <string> <string> val;
            return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Returns the number of sensors to poll.
     *
     * @return an integer corresponding to the number of sensors to poll
     *
     * On failure, throws an exception or returns YMultiSensController.NSENSORS_INVALID.
     */
    async get_nSensors(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YMultiSensController.NSENSORS_INVALID;
            }
        }
        res = this._nSensors;
        return res;
    }

    /**
     * Changes the number of sensors to poll. Remember to call the
     * saveToFlash() method of the module if the
     * modification must be kept. It is recommended to restart the
     * device with  module->reboot() after modifying
     * (and saving) this settings
     *
     * @param newval : an integer corresponding to the number of sensors to poll
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_nSensors(newval: number): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('nSensors',rest_val);
    }

    /**
     * Returns the maximum configurable sensor count allowed on this device.
     *
     * @return an integer corresponding to the maximum configurable sensor count allowed on this device
     *
     * On failure, throws an exception or returns YMultiSensController.MAXSENSORS_INVALID.
     */
    async get_maxSensors(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YMultiSensController.MAXSENSORS_INVALID;
            }
        }
        res = this._maxSensors;
        return res;
    }

    /**
     * Returns true when the device is in maintenance mode.
     *
     * @return either YMultiSensController.MAINTENANCEMODE_FALSE or
     * YMultiSensController.MAINTENANCEMODE_TRUE, according to true when the device is in maintenance mode
     *
     * On failure, throws an exception or returns YMultiSensController.MAINTENANCEMODE_INVALID.
     */
    async get_maintenanceMode(): Promise<YMultiSensController.MAINTENANCEMODE>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YMultiSensController.MAINTENANCEMODE_INVALID;
            }
        }
        res = this._maintenanceMode;
        return res;
    }

    /**
     * Changes the device mode to enable maintenance and to stop sensor polling.
     * This way, the device does not automatically restart when it cannot
     * communicate with one of the sensors.
     *
     * @param newval : either YMultiSensController.MAINTENANCEMODE_FALSE or
     * YMultiSensController.MAINTENANCEMODE_TRUE, according to the device mode to enable maintenance and
     * to stop sensor polling
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_maintenanceMode(newval: YMultiSensController.MAINTENANCEMODE): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('maintenanceMode',rest_val);
    }

    async get_command(): Promise<string>
    {
        let res: string;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YMultiSensController.COMMAND_INVALID;
            }
        }
        res = this._command;
        return res;
    }

    async set_command(newval: string): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('command',rest_val);
    }

    /**
     * Retrieves a multi-sensor controller for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the multi-sensor controller is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YMultiSensController.isOnline() to test if the multi-sensor controller is
     * indeed online at a given time. In case of ambiguity when looking for
     * a multi-sensor controller by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the multi-sensor controller, for instance
     *         YTEMPIR1.multiSensController.
     *
     * @return a YMultiSensController object allowing you to drive the multi-sensor controller.
     */
    static FindMultiSensController(func: string): YMultiSensController
    {
        let obj: YMultiSensController;
        obj = <YMultiSensController> YFunction._FindFromCache('MultiSensController', func);
        if (obj == null) {
            obj = new YMultiSensController(YAPI, func);
            YFunction._AddToCache('MultiSensController',  func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a multi-sensor controller for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the multi-sensor controller is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YMultiSensController.isOnline() to test if the multi-sensor controller is
     * indeed online at a given time. In case of ambiguity when looking for
     * a multi-sensor controller by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx : a YAPI context
     * @param func : a string that uniquely characterizes the multi-sensor controller, for instance
     *         YTEMPIR1.multiSensController.
     *
     * @return a YMultiSensController object allowing you to drive the multi-sensor controller.
     */
    static FindMultiSensControllerInContext(yctx: YAPIContext, func: string): YMultiSensController
    {
        let obj: YMultiSensController;
        obj = <YMultiSensController> YFunction._FindFromCacheInContext(yctx,  'MultiSensController', func);
        if (obj == null) {
            obj = new YMultiSensController(yctx, func);
            YFunction._AddToCache('MultiSensController',  func, obj);
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
    async registerValueCallback(callback: YMultiSensController.ValueCallback | null): Promise<number>
    {
        let val: string;
        if (callback != null) {
            await YFunction._UpdateValueCallbackList(this, true);
        } else {
            await YFunction._UpdateValueCallbackList(this, false);
        }
        this._valueCallbackMultiSensController = callback;
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
        if (this._valueCallbackMultiSensController != null) {
            try {
                await this._valueCallbackMultiSensController(this, value);
            } catch (e) {
                this._yapi.imm_log('Exception in valueCallback:', e);
            }
        } else {
            super._invokeValueCallback(value);
        }
        return 0;
    }

    /**
     * Configures the I2C address of the only sensor connected to the device.
     * It is recommended to put the the device in maintenance mode before
     * changing sensor addresses.  This method is only intended to work with a single
     * sensor connected to the device, if several sensors are connected, the result
     * is unpredictable.
     * Note that the device is probably expecting to find a string of sensors with specific
     * addresses. Check the device documentation to find out which addresses should be used.
     *
     * @param addr : new address of the connected sensor
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    async setupAddress(addr: number): Promise<number>
    {
        let cmd: string;
        cmd = 'A'+String(Math.round(addr));
        return await this.set_command(cmd);
    }

    /**
     * Continues the enumeration of multi-sensor controllers started using yFirstMultiSensController().
     * Caution: You can't make any assumption about the returned multi-sensor controllers order.
     * If you want to find a specific a multi-sensor controller, use MultiSensController.findMultiSensController()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YMultiSensController object, corresponding to
     *         a multi-sensor controller currently online, or a null pointer
     *         if there are no more multi-sensor controllers to enumerate.
     */
    nextMultiSensController(): YMultiSensController | null
    {
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI.SUCCESS) return null;
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, <string> resolve.result);
        if(next_hwid == null) return null;
        return YMultiSensController.FindMultiSensControllerInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of multi-sensor controllers currently accessible.
     * Use the method YMultiSensController.nextMultiSensController() to iterate on
     * next multi-sensor controllers.
     *
     * @return a pointer to a YMultiSensController object, corresponding to
     *         the first multi-sensor controller currently online, or a null pointer
     *         if there are none.
     */
    static FirstMultiSensController(): YMultiSensController | null
    {
        let next_hwid = YAPI.imm_getFirstHardwareId('MultiSensController');
        if(next_hwid == null) return null;
        return YMultiSensController.FindMultiSensController(next_hwid);
    }

    /**
     * Starts the enumeration of multi-sensor controllers currently accessible.
     * Use the method YMultiSensController.nextMultiSensController() to iterate on
     * next multi-sensor controllers.
     *
     * @param yctx : a YAPI context.
     *
     * @return a pointer to a YMultiSensController object, corresponding to
     *         the first multi-sensor controller currently online, or a null pointer
     *         if there are none.
     */
    static FirstMultiSensControllerInContext(yctx: YAPIContext): YMultiSensController | null
    {
        let next_hwid = yctx.imm_getFirstHardwareId('MultiSensController');
        if(next_hwid == null) return null;
        return YMultiSensController.FindMultiSensControllerInContext(yctx, next_hwid);
    }

    //--- (end of YMultiSensController implementation)
}

export namespace YMultiSensController {
    //--- (YMultiSensController definitions)
    export const enum MAINTENANCEMODE {
        FALSE = 0,
        TRUE = 1,
        INVALID = -1
    }
    export interface ValueCallback { (func: YMultiSensController, value: string): void }
    //--- (end of YMultiSensController definitions)
}

