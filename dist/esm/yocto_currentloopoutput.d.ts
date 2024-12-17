/*********************************************************************
 *
 *  $Id: yocto_currentloopoutput.ts 63327 2024-11-13 09:35:03Z seb $
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
import { YAPIContext, YFunction } from './yocto_api.js';
/**
 * YCurrentLoopOutput Class: 4-20mA output control interface, available for instance in the Yocto-4-20mA-Tx
 *
 * The YCurrentLoopOutput class allows you to drive a 4-20mA output
 * by regulating the current flowing through the current loop.
 * It can also provide information about the power state of the current loop.
 */
export declare class YCurrentLoopOutput extends YFunction {
    _className: string;
    _current: number;
    _currentTransition: string;
    _currentAtStartUp: number;
    _loopPower: YCurrentLoopOutput.LOOPPOWER;
    _valueCallbackCurrentLoopOutput: YCurrentLoopOutput.ValueCallback | null;
    readonly CURRENT_INVALID: number;
    readonly CURRENTTRANSITION_INVALID: string;
    readonly CURRENTATSTARTUP_INVALID: number;
    readonly LOOPPOWER_NOPWR: YCurrentLoopOutput.LOOPPOWER;
    readonly LOOPPOWER_LOWPWR: YCurrentLoopOutput.LOOPPOWER;
    readonly LOOPPOWER_POWEROK: YCurrentLoopOutput.LOOPPOWER;
    readonly LOOPPOWER_INVALID: YCurrentLoopOutput.LOOPPOWER;
    static readonly CURRENT_INVALID: number;
    static readonly CURRENTTRANSITION_INVALID: string;
    static readonly CURRENTATSTARTUP_INVALID: number;
    static readonly LOOPPOWER_NOPWR: YCurrentLoopOutput.LOOPPOWER;
    static readonly LOOPPOWER_LOWPWR: YCurrentLoopOutput.LOOPPOWER;
    static readonly LOOPPOWER_POWEROK: YCurrentLoopOutput.LOOPPOWER;
    static readonly LOOPPOWER_INVALID: YCurrentLoopOutput.LOOPPOWER;
    constructor(yapi: YAPIContext, func: string);
    imm_parseAttr(name: string, val: any): number;
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
    set_current(newval: number): Promise<number>;
    /**
     * Returns the loop current set point in mA.
     *
     * @return a floating point number corresponding to the loop current set point in mA
     *
     * On failure, throws an exception or returns YCurrentLoopOutput.CURRENT_INVALID.
     */
    get_current(): Promise<number>;
    get_currentTransition(): Promise<string>;
    set_currentTransition(newval: string): Promise<number>;
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
    set_currentAtStartUp(newval: number): Promise<number>;
    /**
     * Returns the current in the loop at device startup, in mA.
     *
     * @return a floating point number corresponding to the current in the loop at device startup, in mA
     *
     * On failure, throws an exception or returns YCurrentLoopOutput.CURRENTATSTARTUP_INVALID.
     */
    get_currentAtStartUp(): Promise<number>;
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
    get_loopPower(): Promise<YCurrentLoopOutput.LOOPPOWER>;
    /**
     * Retrieves a 4-20mA output for a given identifier.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
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
    static FindCurrentLoopOutput(func: string): YCurrentLoopOutput;
    /**
     * Retrieves a 4-20mA output for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
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
    static FindCurrentLoopOutputInContext(yctx: YAPIContext, func: string): YCurrentLoopOutput;
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
    registerValueCallback(callback: YCurrentLoopOutput.ValueCallback | null): Promise<number>;
    _invokeValueCallback(value: string): Promise<number>;
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
    currentMove(mA_target: number, ms_duration: number): Promise<number>;
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
    nextCurrentLoopOutput(): YCurrentLoopOutput | null;
    /**
     * Starts the enumeration of 4-20mA outputs currently accessible.
     * Use the method YCurrentLoopOutput.nextCurrentLoopOutput() to iterate on
     * next 4-20mA outputs.
     *
     * @return a pointer to a YCurrentLoopOutput object, corresponding to
     *         the first 4-20mA output currently online, or a null pointer
     *         if there are none.
     */
    static FirstCurrentLoopOutput(): YCurrentLoopOutput | null;
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
    static FirstCurrentLoopOutputInContext(yctx: YAPIContext): YCurrentLoopOutput | null;
}
export declare namespace YCurrentLoopOutput {
    const enum LOOPPOWER {
        NOPWR = 0,
        LOWPWR = 1,
        POWEROK = 2,
        INVALID = -1
    }
    interface ValueCallback {
        (func: YCurrentLoopOutput, value: string): void;
    }
}
