/*********************************************************************
 *
 *  $Id: yocto_hubport.ts 48520 2022-02-03 10:51:20Z seb $
 *
 *  Implements the high-level API for HubPort functions
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
 * YHubPort Class: YoctoHub slave port control interface, available for instance in the
 * YoctoHub-Ethernet, the YoctoHub-GSM-4G, the YoctoHub-Shield or the YoctoHub-Wireless-n
 *
 * The YHubPort class provides control over the power supply for slave ports
 * on a YoctoHub. It provide information about the device connected to it.
 * The logical name of a YHubPort is always automatically set to the
 * unique serial number of the Yoctopuce device connected to it.
 */
export declare class YHubPort extends YFunction {
    _className: string;
    _enabled: YHubPort.ENABLED;
    _portState: YHubPort.PORTSTATE;
    _baudRate: number;
    _valueCallbackHubPort: YHubPort.ValueCallback | null;
    readonly ENABLED_FALSE: YHubPort.ENABLED;
    readonly ENABLED_TRUE: YHubPort.ENABLED;
    readonly ENABLED_INVALID: YHubPort.ENABLED;
    readonly PORTSTATE_OFF: YHubPort.PORTSTATE;
    readonly PORTSTATE_OVRLD: YHubPort.PORTSTATE;
    readonly PORTSTATE_ON: YHubPort.PORTSTATE;
    readonly PORTSTATE_RUN: YHubPort.PORTSTATE;
    readonly PORTSTATE_PROG: YHubPort.PORTSTATE;
    readonly PORTSTATE_INVALID: YHubPort.PORTSTATE;
    readonly BAUDRATE_INVALID: number;
    static readonly ENABLED_FALSE: YHubPort.ENABLED;
    static readonly ENABLED_TRUE: YHubPort.ENABLED;
    static readonly ENABLED_INVALID: YHubPort.ENABLED;
    static readonly PORTSTATE_OFF: YHubPort.PORTSTATE;
    static readonly PORTSTATE_OVRLD: YHubPort.PORTSTATE;
    static readonly PORTSTATE_ON: YHubPort.PORTSTATE;
    static readonly PORTSTATE_RUN: YHubPort.PORTSTATE;
    static readonly PORTSTATE_PROG: YHubPort.PORTSTATE;
    static readonly PORTSTATE_INVALID: YHubPort.PORTSTATE;
    static readonly BAUDRATE_INVALID: number;
    constructor(yapi: YAPIContext, func: string);
    imm_parseAttr(name: string, val: any): 0 | 1;
    /**
     * Returns true if the YoctoHub port is powered, false otherwise.
     *
     * @return either YHubPort.ENABLED_FALSE or YHubPort.ENABLED_TRUE, according to true if the YoctoHub
     * port is powered, false otherwise
     *
     * On failure, throws an exception or returns YHubPort.ENABLED_INVALID.
     */
    get_enabled(): Promise<YHubPort.ENABLED>;
    /**
     * Changes the activation of the YoctoHub port. If the port is enabled, the
     * connected module is powered. Otherwise, port power is shut down.
     *
     * @param newval : either YHubPort.ENABLED_FALSE or YHubPort.ENABLED_TRUE, according to the activation
     * of the YoctoHub port
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_enabled(newval: YHubPort.ENABLED): Promise<number>;
    /**
     * Returns the current state of the YoctoHub port.
     *
     * @return a value among YHubPort.PORTSTATE_OFF, YHubPort.PORTSTATE_OVRLD, YHubPort.PORTSTATE_ON,
     * YHubPort.PORTSTATE_RUN and YHubPort.PORTSTATE_PROG corresponding to the current state of the YoctoHub port
     *
     * On failure, throws an exception or returns YHubPort.PORTSTATE_INVALID.
     */
    get_portState(): Promise<YHubPort.PORTSTATE>;
    /**
     * Returns the current baud rate used by this YoctoHub port, in kbps.
     * The default value is 1000 kbps, but a slower rate may be used if communication
     * problems are encountered.
     *
     * @return an integer corresponding to the current baud rate used by this YoctoHub port, in kbps
     *
     * On failure, throws an exception or returns YHubPort.BAUDRATE_INVALID.
     */
    get_baudRate(): Promise<number>;
    /**
     * Retrieves a YoctoHub slave port for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the YoctoHub slave port is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YHubPort.isOnline() to test if the YoctoHub slave port is
     * indeed online at a given time. In case of ambiguity when looking for
     * a YoctoHub slave port by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the YoctoHub slave port, for instance
     *         YHUBETH1.hubPort1.
     *
     * @return a YHubPort object allowing you to drive the YoctoHub slave port.
     */
    static FindHubPort(func: string): YHubPort;
    /**
     * Retrieves a YoctoHub slave port for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the YoctoHub slave port is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YHubPort.isOnline() to test if the YoctoHub slave port is
     * indeed online at a given time. In case of ambiguity when looking for
     * a YoctoHub slave port by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx : a YAPI context
     * @param func : a string that uniquely characterizes the YoctoHub slave port, for instance
     *         YHUBETH1.hubPort1.
     *
     * @return a YHubPort object allowing you to drive the YoctoHub slave port.
     */
    static FindHubPortInContext(yctx: YAPIContext, func: string): YHubPort;
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
    registerValueCallback(callback: YHubPort.ValueCallback | null): Promise<number>;
    _invokeValueCallback(value: string): Promise<number>;
    /**
     * Continues the enumeration of YoctoHub slave ports started using yFirstHubPort().
     * Caution: You can't make any assumption about the returned YoctoHub slave ports order.
     * If you want to find a specific a YoctoHub slave port, use HubPort.findHubPort()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YHubPort object, corresponding to
     *         a YoctoHub slave port currently online, or a null pointer
     *         if there are no more YoctoHub slave ports to enumerate.
     */
    nextHubPort(): YHubPort | null;
    /**
     * Starts the enumeration of YoctoHub slave ports currently accessible.
     * Use the method YHubPort.nextHubPort() to iterate on
     * next YoctoHub slave ports.
     *
     * @return a pointer to a YHubPort object, corresponding to
     *         the first YoctoHub slave port currently online, or a null pointer
     *         if there are none.
     */
    static FirstHubPort(): YHubPort | null;
    /**
     * Starts the enumeration of YoctoHub slave ports currently accessible.
     * Use the method YHubPort.nextHubPort() to iterate on
     * next YoctoHub slave ports.
     *
     * @param yctx : a YAPI context.
     *
     * @return a pointer to a YHubPort object, corresponding to
     *         the first YoctoHub slave port currently online, or a null pointer
     *         if there are none.
     */
    static FirstHubPortInContext(yctx: YAPIContext): YHubPort | null;
}
export declare namespace YHubPort {
    const enum ENABLED {
        FALSE = 0,
        TRUE = 1,
        INVALID = -1
    }
    const enum PORTSTATE {
        OFF = 0,
        OVRLD = 1,
        ON = 2,
        RUN = 3,
        PROG = 4,
        INVALID = -1
    }
    interface ValueCallback {
        (func: YHubPort, value: string): void;
    }
}
