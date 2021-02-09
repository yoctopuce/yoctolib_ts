/*********************************************************************
 *
 *  $Id: yocto_currentloopoutput.ts 43760 2021-02-08 14:33:45Z mvuilleu $
 *
 *  Implements the high-level API for CurrentLoopOutput functions
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

//--- (YCurrentLoopOutput class start)
/**
 * YCurrentLoopOutput Class: 4-20mA output control interface, available for instance in the Yocto-4-20mA-Tx
 *
 * The YCurrentLoopOutput class allows you to drive a 4-20mA output
 * by regulating the current flowing through the current loop.
 * It can also provide information about the power state of the current loop.
 */
//--- (end of YCurrentLoopOutput class start)

export class YCurrentLoopOutput extends YFunction
{
    //--- (YCurrentLoopOutput attributes declaration)
    _className: string;
    _current: number = YCurrentLoopOutput.CURRENT_INVALID;
    _currentTransition: string = YCurrentLoopOutput.CURRENTTRANSITION_INVALID;
    _currentAtStartUp: number = YCurrentLoopOutput.CURRENTATSTARTUP_INVALID;
    _loopPower: YCurrentLoopOutput.LOOPPOWER = YCurrentLoopOutput.LOOPPOWER_INVALID;
    _valueCallbackCurrentLoopOutput: YCurrentLoopOutput.ValueCallback | null = null;

    // API symbols as object properties
    public readonly CURRENT_INVALID: number = YAPI.INVALID_DOUBLE;
    public readonly CURRENTTRANSITION_INVALID: string = YAPI.INVALID_STRING;
    public readonly CURRENTATSTARTUP_INVALID: number = YAPI.INVALID_DOUBLE;
    public readonly LOOPPOWER_NOPWR: YCurrentLoopOutput.LOOPPOWER = 0;
    public readonly LOOPPOWER_LOWPWR: YCurrentLoopOutput.LOOPPOWER = 1;
    public readonly LOOPPOWER_POWEROK: YCurrentLoopOutput.LOOPPOWER = 2;
    public readonly LOOPPOWER_INVALID: YCurrentLoopOutput.LOOPPOWER = -1;

    // API symbols as static members
    public static readonly CURRENT_INVALID: number = YAPI.INVALID_DOUBLE;
    public static readonly CURRENTTRANSITION_INVALID: string = YAPI.INVALID_STRING;
    public static readonly CURRENTATSTARTUP_INVALID: number = YAPI.INVALID_DOUBLE;
    public static readonly LOOPPOWER_NOPWR: YCurrentLoopOutput.LOOPPOWER = 0;
    public static readonly LOOPPOWER_LOWPWR: YCurrentLoopOutput.LOOPPOWER = 1;
    public static readonly LOOPPOWER_POWEROK: YCurrentLoopOutput.LOOPPOWER = 2;
    public static readonly LOOPPOWER_INVALID: YCurrentLoopOutput.LOOPPOWER = -1;
    //--- (end of YCurrentLoopOutput attributes declaration)

    constructor(yapi: YAPIContext, func: string)
    {
        //--- (YCurrentLoopOutput constructor)
        super(yapi, func);
        this._className                  = 'CurrentLoopOutput';
        //--- (end of YCurrentLoopOutput constructor)
    }

    //--- (YCurrentLoopOutput implementation)

    imm_parseAttr(name: string, val: any)
    {
        switch(name) {
        case 'current':
            this._current = <number> Math.round(<number>val * 1000.0 / 65536.0) / 1000.0;
            return 1;
        case 'currentTransition':
            this._currentTransition = <string> <string> val;
            return 1;
        case 'currentAtStartUp':
            this._currentAtStartUp = <number> Math.round(<number>val * 1000.0 / 65536.0) / 1000.0;
            return 1;
        case 'loopPower':
            this._loopPower = <YCurrentLoopOutput.LOOPPOWER> <number> val;
            return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Changes the current loop, the valid range is from 3 to 21mA. If the loop is
     * not properly powered, the  target current is not reached and
     * loopPower is set to LOWPWR.
     *
     * @param newval : a floating point number corresponding to the current loop, the valid range is from 3 to 21mA
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_current(newval: number): Promise<number>
    {
        let rest_val: string;
        rest_val = String(Math.round(newval * 65536.0));
        return await this._setAttr('current',rest_val);
    }

    /**
     * Returns the loop current set point in mA.
     *
     * @return a floating point number corresponding to the loop current set point in mA
     *
     * On failure, throws an exception or returns YCurrentLoopOutput.CURRENT_INVALID.
     */
    async get_current(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YCurrentLoopOutput.CURRENT_INVALID;
            }
        }
        res = this._current;
        return res;
    }

    async get_currentTransition(): Promise<string>
    {
        let res: string;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YCurrentLoopOutput.CURRENTTRANSITION_INVALID;
            }
        }
        res = this._currentTransition;
        return res;
    }

    async set_currentTransition(newval: string): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('currentTransition',rest_val);
    }

    /**
     * Changes the loop current at device start up. Remember to call the matching
     * module saveToFlash() method, otherwise this call has no effect.
     *
     * @param newval : a floating point number corresponding to the loop current at device start up
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_currentAtStartUp(newval: number): Promise<number>
    {
        let rest_val: string;
        rest_val = String(Math.round(newval * 65536.0));
        return await this._setAttr('currentAtStartUp',rest_val);
    }

    /**
     * Returns the current in the loop at device startup, in mA.
     *
     * @return a floating point number corresponding to the current in the loop at device startup, in mA
     *
     * On failure, throws an exception or returns YCurrentLoopOutput.CURRENTATSTARTUP_INVALID.
     */
    async get_currentAtStartUp(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YCurrentLoopOutput.CURRENTATSTARTUP_INVALID;
            }
        }
        res = this._currentAtStartUp;
        return res;
    }

    /**
     * Returns the loop powerstate.  POWEROK: the loop
     * is powered. NOPWR: the loop in not powered. LOWPWR: the loop is not
     * powered enough to maintain the current required (insufficient voltage).
     *
     * @return a value among YCurrentLoopOutput.LOOPPOWER_NOPWR, YCurrentLoopOutput.LOOPPOWER_LOWPWR and
     * YCurrentLoopOutput.LOOPPOWER_POWEROK corresponding to the loop powerstate
     *
     * On failure, throws an exception or returns YCurrentLoopOutput.LOOPPOWER_INVALID.
     */
    async get_loopPower(): Promise<YCurrentLoopOutput.LOOPPOWER>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YCurrentLoopOutput.LOOPPOWER_INVALID;
            }
        }
        res = this._loopPower;
        return res;
    }

    /**
     * Retrieves a 4-20mA output for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the 4-20mA output is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YCurrentLoopOutput.isOnline() to test if the 4-20mA output is
     * indeed online at a given time. In case of ambiguity when looking for
     * a 4-20mA output by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the 4-20mA output, for instance
     *         TX420MA1.currentLoopOutput.
     *
     * @return a YCurrentLoopOutput object allowing you to drive the 4-20mA output.
     */
    static FindCurrentLoopOutput(func: string): YCurrentLoopOutput
    {
        let obj: YCurrentLoopOutput;
        obj = <YCurrentLoopOutput> YFunction._FindFromCache('CurrentLoopOutput', func);
        if (obj == null) {
            obj = new YCurrentLoopOutput(YAPI, func);
            YFunction._AddToCache('CurrentLoopOutput',  func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a 4-20mA output for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the 4-20mA output is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YCurrentLoopOutput.isOnline() to test if the 4-20mA output is
     * indeed online at a given time. In case of ambiguity when looking for
     * a 4-20mA output by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx : a YAPI context
     * @param func : a string that uniquely characterizes the 4-20mA output, for instance
     *         TX420MA1.currentLoopOutput.
     *
     * @return a YCurrentLoopOutput object allowing you to drive the 4-20mA output.
     */
    static FindCurrentLoopOutputInContext(yctx: YAPIContext, func: string): YCurrentLoopOutput
    {
        let obj: YCurrentLoopOutput;
        obj = <YCurrentLoopOutput> YFunction._FindFromCacheInContext(yctx,  'CurrentLoopOutput', func);
        if (obj == null) {
            obj = new YCurrentLoopOutput(yctx, func);
            YFunction._AddToCache('CurrentLoopOutput',  func, obj);
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
    async registerValueCallback(callback: YCurrentLoopOutput.ValueCallback | null): Promise<number>
    {
        let val: string;
        if (callback != null) {
            await YFunction._UpdateValueCallbackList(this, true);
        } else {
            await YFunction._UpdateValueCallbackList(this, false);
        }
        this._valueCallbackCurrentLoopOutput = callback;
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
        if (this._valueCallbackCurrentLoopOutput != null) {
            try {
                await this._valueCallbackCurrentLoopOutput(this, value);
            } catch (e) {
                this._yapi.imm_log('Exception in valueCallback:', e);
            }
        } else {
            super._invokeValueCallback(value);
        }
        return 0;
    }

    /**
     * Performs a smooth transition of current flowing in the loop. Any current explicit
     * change cancels any ongoing transition process.
     *
     * @param mA_target   : new current value at the end of the transition
     *         (floating-point number, representing the end current in mA)
     * @param ms_duration : total duration of the transition, in milliseconds
     *
     * @return YAPI.SUCCESS when the call succeeds.
     */
    async currentMove(mA_target: number, ms_duration: number): Promise<number>
    {
        let newval: string;
        if (mA_target < 3.0) {
            mA_target  = 3.0;
        }
        if (mA_target > 21.0) {
            mA_target = 21.0;
        }
        newval = String(Math.round(<number> Math.round(mA_target*65536)))+':'+String(Math.round(ms_duration));

        return await this.set_currentTransition(newval);
    }

    /**
     * Continues the enumeration of 4-20mA outputs started using yFirstCurrentLoopOutput().
     * Caution: You can't make any assumption about the returned 4-20mA outputs order.
     * If you want to find a specific a 4-20mA output, use CurrentLoopOutput.findCurrentLoopOutput()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YCurrentLoopOutput object, corresponding to
     *         a 4-20mA output currently online, or a null pointer
     *         if there are no more 4-20mA outputs to enumerate.
     */
    nextCurrentLoopOutput(): YCurrentLoopOutput | null
    {
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI.SUCCESS) return null;
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, <string> resolve.result);
        if(next_hwid == null) return null;
        return YCurrentLoopOutput.FindCurrentLoopOutputInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of 4-20mA outputs currently accessible.
     * Use the method YCurrentLoopOutput.nextCurrentLoopOutput() to iterate on
     * next 4-20mA outputs.
     *
     * @return a pointer to a YCurrentLoopOutput object, corresponding to
     *         the first 4-20mA output currently online, or a null pointer
     *         if there are none.
     */
    static FirstCurrentLoopOutput(): YCurrentLoopOutput | null
    {
        let next_hwid = YAPI.imm_getFirstHardwareId('CurrentLoopOutput');
        if(next_hwid == null) return null;
        return YCurrentLoopOutput.FindCurrentLoopOutput(next_hwid);
    }

    /**
     * Starts the enumeration of 4-20mA outputs currently accessible.
     * Use the method YCurrentLoopOutput.nextCurrentLoopOutput() to iterate on
     * next 4-20mA outputs.
     *
     * @param yctx : a YAPI context.
     *
     * @return a pointer to a YCurrentLoopOutput object, corresponding to
     *         the first 4-20mA output currently online, or a null pointer
     *         if there are none.
     */
    static FirstCurrentLoopOutputInContext(yctx: YAPIContext): YCurrentLoopOutput | null
    {
        let next_hwid = yctx.imm_getFirstHardwareId('CurrentLoopOutput');
        if(next_hwid == null) return null;
        return YCurrentLoopOutput.FindCurrentLoopOutputInContext(yctx, next_hwid);
    }

    //--- (end of YCurrentLoopOutput implementation)
}

export namespace YCurrentLoopOutput {
    //--- (YCurrentLoopOutput definitions)
    export const enum LOOPPOWER {
        NOPWR = 0,
        LOWPWR = 1,
        POWEROK = 2,
        INVALID = -1
    }
    export interface ValueCallback { (func: YCurrentLoopOutput, value: string): void }
    //--- (end of YCurrentLoopOutput definitions)
}

