/*********************************************************************
 *
 *  $Id: svn_id $
 *
 *  Implements the high-level API for MultiAxisController functions
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

//--- (YMultiAxisController definitions)
export const enum Y_GlobalState {
    ABSENT = 0,
    ALERT = 1,
    HI_Z = 2,
    STOP = 3,
    RUN = 4,
    BATCH = 5,
    INVALID = -1
}
export interface YMultiAxisControllerValueCallback { (func: YMultiAxisController, value: string): void }
//--- (end of YMultiAxisController definitions)

//--- (YMultiAxisController class start)
/**
 * YMultiAxisController Class: MultiAxisController function interface
 *
 * The YMultiAxisController class allows you to drive multiple stepper motors
 * synchronously.
 */
//--- (end of YMultiAxisController class start)

export class YMultiAxisController extends YFunction
{
    //--- (YMultiAxisController attributes declaration)
    _className: string;
    _nAxis: number = YMultiAxisController.NAXIS_INVALID;
    _globalState: Y_GlobalState = YMultiAxisController.GLOBALSTATE_INVALID;
    _command: string = YMultiAxisController.COMMAND_INVALID;
    _valueCallbackMultiAxisController: YMultiAxisControllerValueCallback | null = null;

    // API symbols as object properties
    public readonly NAXIS_INVALID: number = YAPI.INVALID_UINT;
    public readonly GLOBALSTATE_ABSENT: Y_GlobalState = Y_GlobalState.ABSENT;
    public readonly GLOBALSTATE_ALERT: Y_GlobalState = Y_GlobalState.ALERT;
    public readonly GLOBALSTATE_HI_Z: Y_GlobalState = Y_GlobalState.HI_Z;
    public readonly GLOBALSTATE_STOP: Y_GlobalState = Y_GlobalState.STOP;
    public readonly GLOBALSTATE_RUN: Y_GlobalState = Y_GlobalState.RUN;
    public readonly GLOBALSTATE_BATCH: Y_GlobalState = Y_GlobalState.BATCH;
    public readonly GLOBALSTATE_INVALID: Y_GlobalState = Y_GlobalState.INVALID;
    public readonly COMMAND_INVALID: string = YAPI.INVALID_STRING;

    // API symbols as static members
    public static readonly NAXIS_INVALID: number = YAPI.INVALID_UINT;
    public static readonly GLOBALSTATE_ABSENT: Y_GlobalState = Y_GlobalState.ABSENT;
    public static readonly GLOBALSTATE_ALERT: Y_GlobalState = Y_GlobalState.ALERT;
    public static readonly GLOBALSTATE_HI_Z: Y_GlobalState = Y_GlobalState.HI_Z;
    public static readonly GLOBALSTATE_STOP: Y_GlobalState = Y_GlobalState.STOP;
    public static readonly GLOBALSTATE_RUN: Y_GlobalState = Y_GlobalState.RUN;
    public static readonly GLOBALSTATE_BATCH: Y_GlobalState = Y_GlobalState.BATCH;
    public static readonly GLOBALSTATE_INVALID: Y_GlobalState = Y_GlobalState.INVALID;
    public static readonly COMMAND_INVALID: string = YAPI.INVALID_STRING;
    //--- (end of YMultiAxisController attributes declaration)

//--- (YMultiAxisController return codes)
//--- (end of YMultiAxisController return codes)

    constructor(yapi: YAPIContext, func: string)
    {
        //--- (YMultiAxisController constructor)
        super(yapi, func);
        this._className                  = 'MultiAxisController';
        //--- (end of YMultiAxisController constructor)
    }

    //--- (YMultiAxisController implementation)

    imm_parseAttr(name: string, val: any)
    {
        switch(name) {
        case 'nAxis':
            this._nAxis = <number> <number> val;
            return 1;
        case 'globalState':
            this._globalState = <Y_GlobalState> <number> val;
            return 1;
        case 'command':
            this._command = <string> <string> val;
            return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Returns the number of synchronized controllers.
     *
     * @return an integer corresponding to the number of synchronized controllers
     *
     * On failure, throws an exception or returns Y_NAXIS_INVALID.
     */
    async get_nAxis(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YMultiAxisController.NAXIS_INVALID;
            }
        }
        res = this._nAxis;
        return res;
    }

    /**
     * Changes the number of synchronized controllers.
     *
     * @param newval : an integer corresponding to the number of synchronized controllers
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_nAxis(newval: number): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('nAxis',rest_val);
    }

    /**
     * Returns the stepper motor set overall state.
     *
     * @return a value among Y_GLOBALSTATE_ABSENT, Y_GLOBALSTATE_ALERT, Y_GLOBALSTATE_HI_Z,
     * Y_GLOBALSTATE_STOP, Y_GLOBALSTATE_RUN and Y_GLOBALSTATE_BATCH corresponding to the stepper motor
     * set overall state
     *
     * On failure, throws an exception or returns Y_GLOBALSTATE_INVALID.
     */
    async get_globalState(): Promise<Y_GlobalState>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YMultiAxisController.GLOBALSTATE_INVALID;
            }
        }
        res = this._globalState;
        return res;
    }

    async get_command(): Promise<string>
    {
        let res: string;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YMultiAxisController.COMMAND_INVALID;
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
     * Retrieves $AFUNCTION$ for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that $THEFUNCTION$ is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YMultiAxisController.isOnline() to test if $THEFUNCTION$ is
     * indeed online at a given time. In case of ambiguity when looking for
     * $AFUNCTION$ by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes $THEFUNCTION$, for instance
     *         $FULLHARDWAREID$.
     *
     * @return a YMultiAxisController object allowing you to drive $THEFUNCTION$.
     */
    static FindMultiAxisController(func: string): YMultiAxisController
    {
        let obj: YMultiAxisController;
        obj = <YMultiAxisController> YFunction._FindFromCache('MultiAxisController', func);
        if (obj == null) {
            obj = new YMultiAxisController(YAPI, func);
            YFunction._AddToCache('MultiAxisController',  func, obj);
        }
        return obj;
    }

    /**
     * Retrieves $AFUNCTION$ for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that $THEFUNCTION$ is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YMultiAxisController.isOnline() to test if $THEFUNCTION$ is
     * indeed online at a given time. In case of ambiguity when looking for
     * $AFUNCTION$ by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx : a YAPI context
     * @param func : a string that uniquely characterizes $THEFUNCTION$, for instance
     *         $FULLHARDWAREID$.
     *
     * @return a YMultiAxisController object allowing you to drive $THEFUNCTION$.
     */
    static FindMultiAxisControllerInContext(yctx: YAPIContext, func: string): YMultiAxisController
    {
        let obj: YMultiAxisController;
        obj = <YMultiAxisController> YFunction._FindFromCacheInContext(yctx,  'MultiAxisController', func);
        if (obj == null) {
            obj = new YMultiAxisController(yctx, func);
            YFunction._AddToCache('MultiAxisController',  func, obj);
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
    async registerValueCallback(callback: YMultiAxisControllerValueCallback | null): Promise<number>
    {
        let val: string;
        if (callback != null) {
            await YFunction._UpdateValueCallbackList(this, true);
        } else {
            await YFunction._UpdateValueCallbackList(this, false);
        }
        this._valueCallbackMultiAxisController = callback;
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
        if (this._valueCallbackMultiAxisController != null) {
            try {
                await this._valueCallbackMultiAxisController(this, value);
            } catch (e) {
                this._yapi.imm_log('Exception in valueCallback:', e);
            }
        } else {
            super._invokeValueCallback(value);
        }
        return 0;
    }

    async sendCommand(command: string): Promise<number>
    {
        let url: string;
        let retBin: Uint8Array;
        let res: number;
        url = 'cmd.txt?X='+command;
        //may throw an exception
        retBin = await this._download(url);
        res = retBin[0];
        if (res < 58) {
            if (!(res == 48)) {
                return this._throw(this._yapi.DEVICE_BUSY,'Motor command pipeline is full, try again later',this._yapi.DEVICE_BUSY);
            }
        } else {
            if (!(res == 48)) {
                return this._throw(this._yapi.IO_ERROR,'Motor command failed permanently',this._yapi.IO_ERROR);
            }
        }
        return this._yapi.SUCCESS;
    }

    /**
     * Reinitialize all controllers and clear all alert flags.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    async reset(): Promise<number>
    {
        return await this.set_command('Z');
    }

    /**
     * Starts all motors backward at the specified speeds, to search for the motor home position.
     *
     * @param speed : desired speed for all axis, in steps per second.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    async findHomePosition(speed: number[]): Promise<number>
    {
        let cmd: string;
        let i: number;
        let ndim: number;
        ndim = speed.length;
        cmd = 'H'+String(Math.round(<number> Math.round(1000*speed[0])));
        i = 1;
        while (i < ndim) {
            cmd = cmd+','+String(Math.round(<number> Math.round(1000*speed[i])));
            i = i + 1;
        }
        return await this.sendCommand(cmd);
    }

    /**
     * Starts all motors synchronously to reach a given absolute position.
     * The time needed to reach the requested position will depend on the lowest
     * acceleration and max speed parameters configured for all motors.
     * The final position will be reached on all axis at the same time.
     *
     * @param absPos : absolute position, measured in steps from each origin.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    async moveTo(absPos: number[]): Promise<number>
    {
        let cmd: string;
        let i: number;
        let ndim: number;
        ndim = absPos.length;
        cmd = 'M'+String(Math.round(<number> Math.round(16*absPos[0])));
        i = 1;
        while (i < ndim) {
            cmd = cmd+','+String(Math.round(<number> Math.round(16*absPos[i])));
            i = i + 1;
        }
        return await this.sendCommand(cmd);
    }

    /**
     * Starts all motors synchronously to reach a given relative position.
     * The time needed to reach the requested position will depend on the lowest
     * acceleration and max speed parameters configured for all motors.
     * The final position will be reached on all axis at the same time.
     *
     * @param relPos : relative position, measured in steps from the current position.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    async moveRel(relPos: number[]): Promise<number>
    {
        let cmd: string;
        let i: number;
        let ndim: number;
        ndim = relPos.length;
        cmd = 'm'+String(Math.round(<number> Math.round(16*relPos[0])));
        i = 1;
        while (i < ndim) {
            cmd = cmd+','+String(Math.round(<number> Math.round(16*relPos[i])));
            i = i + 1;
        }
        return await this.sendCommand(cmd);
    }

    /**
     * Keep the motor in the same state for the specified amount of time, before processing next command.
     *
     * @param waitMs : wait time, specified in milliseconds.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    async pause(waitMs: number): Promise<number>
    {
        return await this.sendCommand('_'+String(Math.round(waitMs)));
    }

    /**
     * Stops the motor with an emergency alert, without taking any additional precaution.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    async emergencyStop(): Promise<number>
    {
        return await this.set_command('!');
    }

    /**
     * Stops the motor smoothly as soon as possible, without waiting for ongoing move completion.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    async abortAndBrake(): Promise<number>
    {
        return await this.set_command('B');
    }

    /**
     * Turn the controller into Hi-Z mode immediately, without waiting for ongoing move completion.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    async abortAndHiZ(): Promise<number>
    {
        return await this.set_command('z');
    }

    /**
     * Returns the next MultiAxisController
     *
     * @returns {YMultiAxisController}
     */
    nextMultiAxisController(): YMultiAxisController | null
    {
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI.SUCCESS) return null;
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, <string> resolve.result);
        if(next_hwid == null) return null;
        return YMultiAxisController.FindMultiAxisControllerInContext(this._yapi, next_hwid);
    }

    /**
     * Retrieves the first MultiAxisController in a YAPI context
     *
     * @returns {YMultiAxisController}
     */
    static FirstMultiAxisController(): YMultiAxisController | null
    {
        let next_hwid = YAPI.imm_getFirstHardwareId('MultiAxisController');
        if(next_hwid == null) return null;
        return YMultiAxisController.FindMultiAxisController(next_hwid);
    }

    /**
     * Retrieves the first MultiAxisController in a given context
     *
     * @param yctx {YAPIContext}
     *
     * @returns {YMultiAxisController}
     */
    static FirstMultiAxisControllerInContext(yctx: YAPIContext): YMultiAxisController | null
    {
        let next_hwid = yctx.imm_getFirstHardwareId('MultiAxisController');
        if(next_hwid == null) return null;
        return YMultiAxisController.FindMultiAxisControllerInContext(yctx, next_hwid);
    }

    //--- (end of YMultiAxisController implementation)
}

