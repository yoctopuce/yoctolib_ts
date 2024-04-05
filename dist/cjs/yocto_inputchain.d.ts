/*********************************************************************
 *
 *  $Id: svn_id $
 *
 *  Implements the high-level API for InputChain functions
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
 * YInputChain Class: InputChain function interface
 *
 * The YInputChain class provides access to separate
 * digital inputs connected in a chain.
 */
export declare class YInputChain extends YFunction {
    _className: string;
    _expectedNodes: number;
    _detectedNodes: number;
    _loopbackTest: YInputChain.LOOPBACKTEST;
    _refreshRate: number;
    _bitChain1: string;
    _bitChain2: string;
    _bitChain3: string;
    _bitChain4: string;
    _bitChain5: string;
    _bitChain6: string;
    _bitChain7: string;
    _watchdogPeriod: number;
    _chainDiags: number;
    _valueCallbackInputChain: YInputChain.ValueCallback | null;
    _stateChangeCallback: YInputChain.YStateChangeCallback | null;
    _prevPos: number;
    _eventPos: number;
    _eventStamp: number;
    _eventChains: string[];
    readonly EXPECTEDNODES_INVALID: number;
    readonly DETECTEDNODES_INVALID: number;
    readonly LOOPBACKTEST_OFF: YInputChain.LOOPBACKTEST;
    readonly LOOPBACKTEST_ON: YInputChain.LOOPBACKTEST;
    readonly LOOPBACKTEST_INVALID: YInputChain.LOOPBACKTEST;
    readonly REFRESHRATE_INVALID: number;
    readonly BITCHAIN1_INVALID: string;
    readonly BITCHAIN2_INVALID: string;
    readonly BITCHAIN3_INVALID: string;
    readonly BITCHAIN4_INVALID: string;
    readonly BITCHAIN5_INVALID: string;
    readonly BITCHAIN6_INVALID: string;
    readonly BITCHAIN7_INVALID: string;
    readonly WATCHDOGPERIOD_INVALID: number;
    readonly CHAINDIAGS_INVALID: number;
    static readonly EXPECTEDNODES_INVALID: number;
    static readonly DETECTEDNODES_INVALID: number;
    static readonly LOOPBACKTEST_OFF: YInputChain.LOOPBACKTEST;
    static readonly LOOPBACKTEST_ON: YInputChain.LOOPBACKTEST;
    static readonly LOOPBACKTEST_INVALID: YInputChain.LOOPBACKTEST;
    static readonly REFRESHRATE_INVALID: number;
    static readonly BITCHAIN1_INVALID: string;
    static readonly BITCHAIN2_INVALID: string;
    static readonly BITCHAIN3_INVALID: string;
    static readonly BITCHAIN4_INVALID: string;
    static readonly BITCHAIN5_INVALID: string;
    static readonly BITCHAIN6_INVALID: string;
    static readonly BITCHAIN7_INVALID: string;
    static readonly WATCHDOGPERIOD_INVALID: number;
    static readonly CHAINDIAGS_INVALID: number;
    constructor(yapi: YAPIContext, func: string);
    imm_parseAttr(name: string, val: any): number;
    _internalEventCallback(YInputChain_obj: YInputChain, str_value: string): Promise<void>;
    /**
     * Returns the number of nodes expected in the chain.
     *
     * @return an integer corresponding to the number of nodes expected in the chain
     *
     * On failure, throws an exception or returns YInputChain.EXPECTEDNODES_INVALID.
     */
    get_expectedNodes(): Promise<number>;
    /**
     * Changes the number of nodes expected in the chain.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : an integer corresponding to the number of nodes expected in the chain
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_expectedNodes(newval: number): Promise<number>;
    /**
     * Returns the number of nodes detected in the chain.
     *
     * @return an integer corresponding to the number of nodes detected in the chain
     *
     * On failure, throws an exception or returns YInputChain.DETECTEDNODES_INVALID.
     */
    get_detectedNodes(): Promise<number>;
    /**
     * Returns the activation state of the exhaustive chain connectivity test.
     * The connectivity test requires a cable connecting the end of the chain
     * to the loopback test connector.
     *
     * @return either YInputChain.LOOPBACKTEST_OFF or YInputChain.LOOPBACKTEST_ON, according to the
     * activation state of the exhaustive chain connectivity test
     *
     * On failure, throws an exception or returns YInputChain.LOOPBACKTEST_INVALID.
     */
    get_loopbackTest(): Promise<YInputChain.LOOPBACKTEST>;
    /**
     * Changes the activation state of the exhaustive chain connectivity test.
     * The connectivity test requires a cable connecting the end of the chain
     * to the loopback test connector.
     *
     * If you want the change to be kept after a device reboot,
     * make sure  to call the matching module saveToFlash().
     *
     * @param newval : either YInputChain.LOOPBACKTEST_OFF or YInputChain.LOOPBACKTEST_ON, according to
     * the activation state of the exhaustive chain connectivity test
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_loopbackTest(newval: YInputChain.LOOPBACKTEST): Promise<number>;
    /**
     * Returns the desired refresh rate, measured in Hz.
     * The higher the refresh rate is set, the higher the
     * communication speed on the chain will be.
     *
     * @return an integer corresponding to the desired refresh rate, measured in Hz
     *
     * On failure, throws an exception or returns YInputChain.REFRESHRATE_INVALID.
     */
    get_refreshRate(): Promise<number>;
    /**
     * Changes the desired refresh rate, measured in Hz.
     * The higher the refresh rate is set, the higher the
     * communication speed on the chain will be.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : an integer corresponding to the desired refresh rate, measured in Hz
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_refreshRate(newval: number): Promise<number>;
    /**
     * Returns the state of input 1 for all nodes of the input chain,
     * as a hexadecimal string. The node nearest to the controller
     * is the lowest bit of the result.
     *
     * @return a string corresponding to the state of input 1 for all nodes of the input chain,
     *         as a hexadecimal string
     *
     * On failure, throws an exception or returns YInputChain.BITCHAIN1_INVALID.
     */
    get_bitChain1(): Promise<string>;
    /**
     * Returns the state of input 2 for all nodes of the input chain,
     * as a hexadecimal string. The node nearest to the controller
     * is the lowest bit of the result.
     *
     * @return a string corresponding to the state of input 2 for all nodes of the input chain,
     *         as a hexadecimal string
     *
     * On failure, throws an exception or returns YInputChain.BITCHAIN2_INVALID.
     */
    get_bitChain2(): Promise<string>;
    /**
     * Returns the state of input 3 for all nodes of the input chain,
     * as a hexadecimal string. The node nearest to the controller
     * is the lowest bit of the result.
     *
     * @return a string corresponding to the state of input 3 for all nodes of the input chain,
     *         as a hexadecimal string
     *
     * On failure, throws an exception or returns YInputChain.BITCHAIN3_INVALID.
     */
    get_bitChain3(): Promise<string>;
    /**
     * Returns the state of input 4 for all nodes of the input chain,
     * as a hexadecimal string. The node nearest to the controller
     * is the lowest bit of the result.
     *
     * @return a string corresponding to the state of input 4 for all nodes of the input chain,
     *         as a hexadecimal string
     *
     * On failure, throws an exception or returns YInputChain.BITCHAIN4_INVALID.
     */
    get_bitChain4(): Promise<string>;
    /**
     * Returns the state of input 5 for all nodes of the input chain,
     * as a hexadecimal string. The node nearest to the controller
     * is the lowest bit of the result.
     *
     * @return a string corresponding to the state of input 5 for all nodes of the input chain,
     *         as a hexadecimal string
     *
     * On failure, throws an exception or returns YInputChain.BITCHAIN5_INVALID.
     */
    get_bitChain5(): Promise<string>;
    /**
     * Returns the state of input 6 for all nodes of the input chain,
     * as a hexadecimal string. The node nearest to the controller
     * is the lowest bit of the result.
     *
     * @return a string corresponding to the state of input 6 for all nodes of the input chain,
     *         as a hexadecimal string
     *
     * On failure, throws an exception or returns YInputChain.BITCHAIN6_INVALID.
     */
    get_bitChain6(): Promise<string>;
    /**
     * Returns the state of input 7 for all nodes of the input chain,
     * as a hexadecimal string. The node nearest to the controller
     * is the lowest bit of the result.
     *
     * @return a string corresponding to the state of input 7 for all nodes of the input chain,
     *         as a hexadecimal string
     *
     * On failure, throws an exception or returns YInputChain.BITCHAIN7_INVALID.
     */
    get_bitChain7(): Promise<string>;
    /**
     * Returns the wait time in seconds before triggering an inactivity
     * timeout error.
     *
     * @return an integer corresponding to the wait time in seconds before triggering an inactivity
     *         timeout error
     *
     * On failure, throws an exception or returns YInputChain.WATCHDOGPERIOD_INVALID.
     */
    get_watchdogPeriod(): Promise<number>;
    /**
     * Changes the wait time in seconds before triggering an inactivity
     * timeout error. Remember to call the saveToFlash() method
     * of the module if the modification must be kept.
     *
     * @param newval : an integer corresponding to the wait time in seconds before triggering an inactivity
     *         timeout error
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_watchdogPeriod(newval: number): Promise<number>;
    /**
     * Returns the controller state diagnostics. Bit 0 indicates a chain length
     * error, bit 1 indicates an inactivity timeout and bit 2 indicates
     * a loopback test failure.
     *
     * @return an integer corresponding to the controller state diagnostics
     *
     * On failure, throws an exception or returns YInputChain.CHAINDIAGS_INVALID.
     */
    get_chainDiags(): Promise<number>;
    /**
     * Retrieves a digital input chain for a given identifier.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the digital input chain is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YInputChain.isOnline() to test if the digital input chain is
     * indeed online at a given time. In case of ambiguity when looking for
     * a digital input chain by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the digital input chain, for instance
     *         MyDevice.inputChain.
     *
     * @return a YInputChain object allowing you to drive the digital input chain.
     */
    static FindInputChain(func: string): YInputChain;
    /**
     * Retrieves a digital input chain for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the digital input chain is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YInputChain.isOnline() to test if the digital input chain is
     * indeed online at a given time. In case of ambiguity when looking for
     * a digital input chain by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx : a YAPI context
     * @param func : a string that uniquely characterizes the digital input chain, for instance
     *         MyDevice.inputChain.
     *
     * @return a YInputChain object allowing you to drive the digital input chain.
     */
    static FindInputChainInContext(yctx: YAPIContext, func: string): YInputChain;
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
    registerValueCallback(callback: YInputChain.ValueCallback | null): Promise<number>;
    _invokeValueCallback(value: string): Promise<number>;
    /**
     * Resets the application watchdog countdown.
     * If you have setup a non-zero watchdogPeriod, you should
     * call this function on a regular basis to prevent the application
     * inactivity error to be triggered.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    resetWatchdog(): Promise<number>;
    /**
     * Returns a string with last events observed on the digital input chain.
     * This method return only events that are still buffered in the device memory.
     *
     * @return a string with last events observed (one per line).
     *
     * On failure, throws an exception or returns  YAPI.INVALID_STRING.
     */
    get_lastEvents(): Promise<string>;
    /**
     * Registers a callback function to be called each time that an event is detected on the
     * input chain.The callback is invoked only during the execution of
     * ySleep or yHandleEvents. This provides control over the time when
     * the callback is triggered. For good responsiveness, remember to call one of these
     * two functions periodically. To unregister a callback, pass a null pointer as argument.
     *
     * @param callback : the callback function to call, or a null pointer.
     *         The callback function should take four arguments:
     *         the YInputChain object that emitted the event, the
     *         UTC timestamp of the event, a character string describing
     *         the type of event and a character string with the event data.
     *         On failure, throws an exception or returns a negative error code.
     */
    registerStateChangeCallback(callback: YInputChain.YStateChangeCallback | null): Promise<number>;
    _internalEventHandler(cbpos: string): Promise<number>;
    _strXor(a: string, b: string): Promise<string>;
    hex2array(hexstr: string): Promise<number[]>;
    /**
     * Continues the enumeration of digital input chains started using yFirstInputChain().
     * Caution: You can't make any assumption about the returned digital input chains order.
     * If you want to find a specific a digital input chain, use InputChain.findInputChain()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YInputChain object, corresponding to
     *         a digital input chain currently online, or a null pointer
     *         if there are no more digital input chains to enumerate.
     */
    nextInputChain(): YInputChain | null;
    /**
     * Starts the enumeration of digital input chains currently accessible.
     * Use the method YInputChain.nextInputChain() to iterate on
     * next digital input chains.
     *
     * @return a pointer to a YInputChain object, corresponding to
     *         the first digital input chain currently online, or a null pointer
     *         if there are none.
     */
    static FirstInputChain(): YInputChain | null;
    /**
     * Starts the enumeration of digital input chains currently accessible.
     * Use the method YInputChain.nextInputChain() to iterate on
     * next digital input chains.
     *
     * @param yctx : a YAPI context.
     *
     * @return a pointer to a YInputChain object, corresponding to
     *         the first digital input chain currently online, or a null pointer
     *         if there are none.
     */
    static FirstInputChainInContext(yctx: YAPIContext): YInputChain | null;
}
export declare namespace YInputChain {
    const enum LOOPBACKTEST {
        OFF = 0,
        ON = 1,
        INVALID = -1
    }
    interface ValueCallback {
        (func: YInputChain, value: string): void;
    }
    interface YStateChangeCallback {
        (func: YInputChain, timestampr: number, evtType: string, eventData: string, eventChange: string): void;
    }
}
