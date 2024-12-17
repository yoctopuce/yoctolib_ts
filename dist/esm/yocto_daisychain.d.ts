/*********************************************************************
 *
 *  $Id: yocto_daisychain.ts 63327 2024-11-13 09:35:03Z seb $
 *
 *  Implements the high-level API for DaisyChain functions
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
 * YDaisyChain Class: Module chain configuration interface
 *
 * The YDaisyChain class can be used to verify that devices that
 * are daisy-chained directly from device to device, without a hub,
 * are detected properly.
 */
export declare class YDaisyChain extends YFunction {
    _className: string;
    _daisyState: YDaisyChain.DAISYSTATE;
    _childCount: number;
    _requiredChildCount: number;
    _valueCallbackDaisyChain: YDaisyChain.ValueCallback | null;
    readonly DAISYSTATE_READY: YDaisyChain.DAISYSTATE;
    readonly DAISYSTATE_IS_CHILD: YDaisyChain.DAISYSTATE;
    readonly DAISYSTATE_FIRMWARE_MISMATCH: YDaisyChain.DAISYSTATE;
    readonly DAISYSTATE_CHILD_MISSING: YDaisyChain.DAISYSTATE;
    readonly DAISYSTATE_CHILD_LOST: YDaisyChain.DAISYSTATE;
    readonly DAISYSTATE_INVALID: YDaisyChain.DAISYSTATE;
    readonly CHILDCOUNT_INVALID: number;
    readonly REQUIREDCHILDCOUNT_INVALID: number;
    static readonly DAISYSTATE_READY: YDaisyChain.DAISYSTATE;
    static readonly DAISYSTATE_IS_CHILD: YDaisyChain.DAISYSTATE;
    static readonly DAISYSTATE_FIRMWARE_MISMATCH: YDaisyChain.DAISYSTATE;
    static readonly DAISYSTATE_CHILD_MISSING: YDaisyChain.DAISYSTATE;
    static readonly DAISYSTATE_CHILD_LOST: YDaisyChain.DAISYSTATE;
    static readonly DAISYSTATE_INVALID: YDaisyChain.DAISYSTATE;
    static readonly CHILDCOUNT_INVALID: number;
    static readonly REQUIREDCHILDCOUNT_INVALID: number;
    constructor(yapi: YAPIContext, func: string);
    imm_parseAttr(name: string, val: any): number;
    /**
     * Returns the state of the daisy-link between modules.
     *
     * @return a value among YDaisyChain.DAISYSTATE_READY, YDaisyChain.DAISYSTATE_IS_CHILD,
     * YDaisyChain.DAISYSTATE_FIRMWARE_MISMATCH, YDaisyChain.DAISYSTATE_CHILD_MISSING and
     * YDaisyChain.DAISYSTATE_CHILD_LOST corresponding to the state of the daisy-link between modules
     *
     * On failure, throws an exception or returns YDaisyChain.DAISYSTATE_INVALID.
     */
    get_daisyState(): Promise<YDaisyChain.DAISYSTATE>;
    /**
     * Returns the number of child nodes currently detected.
     *
     * @return an integer corresponding to the number of child nodes currently detected
     *
     * On failure, throws an exception or returns YDaisyChain.CHILDCOUNT_INVALID.
     */
    get_childCount(): Promise<number>;
    /**
     * Returns the number of child nodes expected in normal conditions.
     *
     * @return an integer corresponding to the number of child nodes expected in normal conditions
     *
     * On failure, throws an exception or returns YDaisyChain.REQUIREDCHILDCOUNT_INVALID.
     */
    get_requiredChildCount(): Promise<number>;
    /**
     * Changes the number of child nodes expected in normal conditions.
     * If the value is zero, no check is performed. If it is non-zero, the number
     * child nodes is checked on startup and the status will change to error if
     * the count does not match. Remember to call the saveToFlash()
     * method of the module if the modification must be kept.
     *
     * @param newval : an integer corresponding to the number of child nodes expected in normal conditions
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_requiredChildCount(newval: number): Promise<number>;
    /**
     * Retrieves a module chain for a given identifier.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the module chain is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YDaisyChain.isOnline() to test if the module chain is
     * indeed online at a given time. In case of ambiguity when looking for
     * a module chain by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the module chain, for instance
     *         MyDevice.daisyChain.
     *
     * @return a YDaisyChain object allowing you to drive the module chain.
     */
    static FindDaisyChain(func: string): YDaisyChain;
    /**
     * Retrieves a module chain for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the module chain is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YDaisyChain.isOnline() to test if the module chain is
     * indeed online at a given time. In case of ambiguity when looking for
     * a module chain by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx : a YAPI context
     * @param func : a string that uniquely characterizes the module chain, for instance
     *         MyDevice.daisyChain.
     *
     * @return a YDaisyChain object allowing you to drive the module chain.
     */
    static FindDaisyChainInContext(yctx: YAPIContext, func: string): YDaisyChain;
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
    registerValueCallback(callback: YDaisyChain.ValueCallback | null): Promise<number>;
    _invokeValueCallback(value: string): Promise<number>;
    /**
     * Continues the enumeration of module chains started using yFirstDaisyChain().
     * Caution: You can't make any assumption about the returned module chains order.
     * If you want to find a specific a module chain, use DaisyChain.findDaisyChain()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YDaisyChain object, corresponding to
     *         a module chain currently online, or a null pointer
     *         if there are no more module chains to enumerate.
     */
    nextDaisyChain(): YDaisyChain | null;
    /**
     * Starts the enumeration of module chains currently accessible.
     * Use the method YDaisyChain.nextDaisyChain() to iterate on
     * next module chains.
     *
     * @return a pointer to a YDaisyChain object, corresponding to
     *         the first module chain currently online, or a null pointer
     *         if there are none.
     */
    static FirstDaisyChain(): YDaisyChain | null;
    /**
     * Starts the enumeration of module chains currently accessible.
     * Use the method YDaisyChain.nextDaisyChain() to iterate on
     * next module chains.
     *
     * @param yctx : a YAPI context.
     *
     * @return a pointer to a YDaisyChain object, corresponding to
     *         the first module chain currently online, or a null pointer
     *         if there are none.
     */
    static FirstDaisyChainInContext(yctx: YAPIContext): YDaisyChain | null;
}
export declare namespace YDaisyChain {
    const enum DAISYSTATE {
        READY = 0,
        IS_CHILD = 1,
        FIRMWARE_MISMATCH = 2,
        CHILD_MISSING = 3,
        CHILD_LOST = 4,
        INVALID = -1
    }
    interface ValueCallback {
        (func: YDaisyChain, value: string): void;
    }
}
