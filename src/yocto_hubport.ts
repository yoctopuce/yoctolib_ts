/*********************************************************************
 *
 *  $Id: svn_id $
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

import { YAPI, YAPIContext, YErrorMsg, YFunction, YModule, YSensor, YDataLogger, YMeasure } from './yocto_api.js';

//--- (YHubPort definitions)
export const enum Y_Enabled {
    FALSE = 0,
    TRUE = 1,
    INVALID = -1
}
export const enum Y_PortState {
    OFF = 0,
    OVRLD = 1,
    ON = 2,
    RUN = 3,
    PROG = 4,
    INVALID = -1
}
export interface YHubPortValueCallback { (func: YHubPort, value: string): void }
//--- (end of YHubPort definitions)

//--- (YHubPort class start)
/**
 * YHubPort Class: YoctoHub slave port control interface, available for instance in the
 * YoctoHub-Ethernet, the YoctoHub-GSM-3G-EU, the YoctoHub-Shield or the YoctoHub-Wireless-n
 *
 * The YHubPort class provides control over the power supply for slave ports
 * on a YoctoHub. It provide information about the device connected to it.
 * The logical name of a YHubPort is always automatically set to the
 * unique serial number of the Yoctopuce device connected to it.
 */
//--- (end of YHubPort class start)

export class YHubPort extends YFunction
{
    //--- (YHubPort attributes declaration)
    _className: string;
    _enabled: Y_Enabled = YHubPort.ENABLED_INVALID;
    _portState: Y_PortState = YHubPort.PORTSTATE_INVALID;
    _baudRate: number = YHubPort.BAUDRATE_INVALID;
    _valueCallbackHubPort: YHubPortValueCallback | null = null;

    // API symbols as object properties
    public readonly ENABLED_FALSE: Y_Enabled = Y_Enabled.FALSE;
    public readonly ENABLED_TRUE: Y_Enabled = Y_Enabled.TRUE;
    public readonly ENABLED_INVALID: Y_Enabled = Y_Enabled.INVALID;
    public readonly PORTSTATE_OFF: Y_PortState = Y_PortState.OFF;
    public readonly PORTSTATE_OVRLD: Y_PortState = Y_PortState.OVRLD;
    public readonly PORTSTATE_ON: Y_PortState = Y_PortState.ON;
    public readonly PORTSTATE_RUN: Y_PortState = Y_PortState.RUN;
    public readonly PORTSTATE_PROG: Y_PortState = Y_PortState.PROG;
    public readonly PORTSTATE_INVALID: Y_PortState = Y_PortState.INVALID;
    public readonly BAUDRATE_INVALID: number = YAPI.INVALID_UINT;

    // API symbols as static members
    public static readonly ENABLED_FALSE: Y_Enabled = Y_Enabled.FALSE;
    public static readonly ENABLED_TRUE: Y_Enabled = Y_Enabled.TRUE;
    public static readonly ENABLED_INVALID: Y_Enabled = Y_Enabled.INVALID;
    public static readonly PORTSTATE_OFF: Y_PortState = Y_PortState.OFF;
    public static readonly PORTSTATE_OVRLD: Y_PortState = Y_PortState.OVRLD;
    public static readonly PORTSTATE_ON: Y_PortState = Y_PortState.ON;
    public static readonly PORTSTATE_RUN: Y_PortState = Y_PortState.RUN;
    public static readonly PORTSTATE_PROG: Y_PortState = Y_PortState.PROG;
    public static readonly PORTSTATE_INVALID: Y_PortState = Y_PortState.INVALID;
    public static readonly BAUDRATE_INVALID: number = YAPI.INVALID_UINT;
    //--- (end of YHubPort attributes declaration)

//--- (YHubPort return codes)
//--- (end of YHubPort return codes)

    constructor(yapi: YAPIContext, func: string)
    {
        //--- (YHubPort constructor)
        super(yapi, func);
        this._className                  = 'HubPort';
        //--- (end of YHubPort constructor)
    }

    //--- (YHubPort implementation)

    imm_parseAttr(name: string, val: any)
    {
        switch(name) {
        case 'enabled':
            this._enabled = <Y_Enabled> <number> val;
            return 1;
        case 'portState':
            this._portState = <Y_PortState> <number> val;
            return 1;
        case 'baudRate':
            this._baudRate = <number> <number> val;
            return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Returns true if the YoctoHub port is powered, false otherwise.
     *
     * @return either Y_ENABLED_FALSE or Y_ENABLED_TRUE, according to true if the YoctoHub port is
     * powered, false otherwise
     *
     * On failure, throws an exception or returns Y_ENABLED_INVALID.
     */
    async get_enabled(): Promise<Y_Enabled>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YHubPort.ENABLED_INVALID;
            }
        }
        res = this._enabled;
        return res;
    }

    /**
     * Changes the activation of the YoctoHub port. If the port is enabled, the
     * connected module is powered. Otherwise, port power is shut down.
     *
     * @param newval : either Y_ENABLED_FALSE or Y_ENABLED_TRUE, according to the activation of the YoctoHub port
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_enabled(newval: Y_Enabled): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('enabled',rest_val);
    }

    /**
     * Returns the current state of the YoctoHub port.
     *
     * @return a value among Y_PORTSTATE_OFF, Y_PORTSTATE_OVRLD, Y_PORTSTATE_ON, Y_PORTSTATE_RUN and
     * Y_PORTSTATE_PROG corresponding to the current state of the YoctoHub port
     *
     * On failure, throws an exception or returns Y_PORTSTATE_INVALID.
     */
    async get_portState(): Promise<Y_PortState>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YHubPort.PORTSTATE_INVALID;
            }
        }
        res = this._portState;
        return res;
    }

    /**
     * Returns the current baud rate used by this YoctoHub port, in kbps.
     * The default value is 1000 kbps, but a slower rate may be used if communication
     * problems are encountered.
     *
     * @return an integer corresponding to the current baud rate used by this YoctoHub port, in kbps
     *
     * On failure, throws an exception or returns Y_BAUDRATE_INVALID.
     */
    async get_baudRate(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YHubPort.BAUDRATE_INVALID;
            }
        }
        res = this._baudRate;
        return res;
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
     * Use the method YHubPort.isOnline() to test if $THEFUNCTION$ is
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
     * @return a YHubPort object allowing you to drive $THEFUNCTION$.
     */
    static FindHubPort(func: string): YHubPort
    {
        let obj: YHubPort;
        obj = <YHubPort> YFunction._FindFromCache('HubPort', func);
        if (obj == null) {
            obj = new YHubPort(YAPI, func);
            YFunction._AddToCache('HubPort',  func, obj);
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
     * Use the method YHubPort.isOnline() to test if $THEFUNCTION$ is
     * indeed online at a given time. In case of ambiguity when looking for
     * $AFUNCTION$ by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx : a YAPI context
     * @param func : a string that uniquely characterizes $THEFUNCTION$, for instance
     *         $FULLHARDWAREID$.
     *
     * @return a YHubPort object allowing you to drive $THEFUNCTION$.
     */
    static FindHubPortInContext(yctx: YAPIContext, func: string): YHubPort
    {
        let obj: YHubPort;
        obj = <YHubPort> YFunction._FindFromCacheInContext(yctx,  'HubPort', func);
        if (obj == null) {
            obj = new YHubPort(yctx, func);
            YFunction._AddToCache('HubPort',  func, obj);
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
    async registerValueCallback(callback: YHubPortValueCallback | null): Promise<number>
    {
        let val: string;
        if (callback != null) {
            await YFunction._UpdateValueCallbackList(this, true);
        } else {
            await YFunction._UpdateValueCallbackList(this, false);
        }
        this._valueCallbackHubPort = callback;
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
        if (this._valueCallbackHubPort != null) {
            try {
                await this._valueCallbackHubPort(this, value);
            } catch (e) {
                this._yapi.imm_log('Exception in valueCallback:', e);
            }
        } else {
            super._invokeValueCallback(value);
        }
        return 0;
    }

    /**
     * Returns the next HubPort
     *
     * @returns {YHubPort}
     */
    nextHubPort(): YHubPort | null
    {
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI.SUCCESS) return null;
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, <string> resolve.result);
        if(next_hwid == null) return null;
        return YHubPort.FindHubPortInContext(this._yapi, next_hwid);
    }

    /**
     * Retrieves the first HubPort in a YAPI context
     *
     * @returns {YHubPort}
     */
    static FirstHubPort(): YHubPort | null
    {
        let next_hwid = YAPI.imm_getFirstHardwareId('HubPort');
        if(next_hwid == null) return null;
        return YHubPort.FindHubPort(next_hwid);
    }

    /**
     * Retrieves the first HubPort in a given context
     *
     * @param yctx {YAPIContext}
     *
     * @returns {YHubPort}
     */
    static FirstHubPortInContext(yctx: YAPIContext): YHubPort | null
    {
        let next_hwid = yctx.imm_getFirstHardwareId('HubPort');
        if(next_hwid == null) return null;
        return YHubPort.FindHubPortInContext(yctx, next_hwid);
    }

    //--- (end of YHubPort implementation)
}

