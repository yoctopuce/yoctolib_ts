/*********************************************************************
 *
 *  $Id: svn_id $
 *
 *  Implements the high-level API for DualPower functions
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
 * YDualPower Class: dual power switch control interface, available for instance in the Yocto-Servo
 *
 * The YDualPower class allows you to control
 * the power source to use for module functions that require high current.
 * The module can also automatically disconnect the external power
 * when a voltage drop is observed on the external power source
 * (external battery running out of power).
 */
export declare class YDualPower extends YFunction {
    _className: string;
    _powerState: YDualPower.POWERSTATE;
    _powerControl: YDualPower.POWERCONTROL;
    _extVoltage: number;
    _valueCallbackDualPower: YDualPower.ValueCallback | null;
    readonly POWERSTATE_OFF: YDualPower.POWERSTATE;
    readonly POWERSTATE_FROM_USB: YDualPower.POWERSTATE;
    readonly POWERSTATE_FROM_EXT: YDualPower.POWERSTATE;
    readonly POWERSTATE_INVALID: YDualPower.POWERSTATE;
    readonly POWERCONTROL_AUTO: YDualPower.POWERCONTROL;
    readonly POWERCONTROL_FROM_USB: YDualPower.POWERCONTROL;
    readonly POWERCONTROL_FROM_EXT: YDualPower.POWERCONTROL;
    readonly POWERCONTROL_OFF: YDualPower.POWERCONTROL;
    readonly POWERCONTROL_INVALID: YDualPower.POWERCONTROL;
    readonly EXTVOLTAGE_INVALID: number;
    static readonly POWERSTATE_OFF: YDualPower.POWERSTATE;
    static readonly POWERSTATE_FROM_USB: YDualPower.POWERSTATE;
    static readonly POWERSTATE_FROM_EXT: YDualPower.POWERSTATE;
    static readonly POWERSTATE_INVALID: YDualPower.POWERSTATE;
    static readonly POWERCONTROL_AUTO: YDualPower.POWERCONTROL;
    static readonly POWERCONTROL_FROM_USB: YDualPower.POWERCONTROL;
    static readonly POWERCONTROL_FROM_EXT: YDualPower.POWERCONTROL;
    static readonly POWERCONTROL_OFF: YDualPower.POWERCONTROL;
    static readonly POWERCONTROL_INVALID: YDualPower.POWERCONTROL;
    static readonly EXTVOLTAGE_INVALID: number;
    constructor(yapi: YAPIContext, func: string);
    imm_parseAttr(name: string, val: any): number;
    /**
     * Returns the current power source for module functions that require lots of current.
     *
     * @return a value among YDualPower.POWERSTATE_OFF, YDualPower.POWERSTATE_FROM_USB and
     * YDualPower.POWERSTATE_FROM_EXT corresponding to the current power source for module functions that
     * require lots of current
     *
     * On failure, throws an exception or returns YDualPower.POWERSTATE_INVALID.
     */
    get_powerState(): Promise<YDualPower.POWERSTATE>;
    /**
     * Returns the selected power source for module functions that require lots of current.
     *
     * @return a value among YDualPower.POWERCONTROL_AUTO, YDualPower.POWERCONTROL_FROM_USB,
     * YDualPower.POWERCONTROL_FROM_EXT and YDualPower.POWERCONTROL_OFF corresponding to the selected
     * power source for module functions that require lots of current
     *
     * On failure, throws an exception or returns YDualPower.POWERCONTROL_INVALID.
     */
    get_powerControl(): Promise<YDualPower.POWERCONTROL>;
    /**
     * Changes the selected power source for module functions that require lots of current.
     * Remember to call the saveToFlash() method of the module if the modification must be kept.
     *
     * @param newval : a value among YDualPower.POWERCONTROL_AUTO, YDualPower.POWERCONTROL_FROM_USB,
     * YDualPower.POWERCONTROL_FROM_EXT and YDualPower.POWERCONTROL_OFF corresponding to the selected
     * power source for module functions that require lots of current
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_powerControl(newval: YDualPower.POWERCONTROL): Promise<number>;
    /**
     * Returns the measured voltage on the external power source, in millivolts.
     *
     * @return an integer corresponding to the measured voltage on the external power source, in millivolts
     *
     * On failure, throws an exception or returns YDualPower.EXTVOLTAGE_INVALID.
     */
    get_extVoltage(): Promise<number>;
    /**
     * Retrieves a dual power switch for a given identifier.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the dual power switch is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YDualPower.isOnline() to test if the dual power switch is
     * indeed online at a given time. In case of ambiguity when looking for
     * a dual power switch by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the dual power switch, for instance
     *         SERVORC1.dualPower.
     *
     * @return a YDualPower object allowing you to drive the dual power switch.
     */
    static FindDualPower(func: string): YDualPower;
    /**
     * Retrieves a dual power switch for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the dual power switch is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YDualPower.isOnline() to test if the dual power switch is
     * indeed online at a given time. In case of ambiguity when looking for
     * a dual power switch by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx : a YAPI context
     * @param func : a string that uniquely characterizes the dual power switch, for instance
     *         SERVORC1.dualPower.
     *
     * @return a YDualPower object allowing you to drive the dual power switch.
     */
    static FindDualPowerInContext(yctx: YAPIContext, func: string): YDualPower;
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
    registerValueCallback(callback: YDualPower.ValueCallback | null): Promise<number>;
    _invokeValueCallback(value: string): Promise<number>;
    /**
     * Continues the enumeration of dual power switches started using yFirstDualPower().
     * Caution: You can't make any assumption about the returned dual power switches order.
     * If you want to find a specific a dual power switch, use DualPower.findDualPower()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YDualPower object, corresponding to
     *         a dual power switch currently online, or a null pointer
     *         if there are no more dual power switches to enumerate.
     */
    nextDualPower(): YDualPower | null;
    /**
     * Starts the enumeration of dual power switches currently accessible.
     * Use the method YDualPower.nextDualPower() to iterate on
     * next dual power switches.
     *
     * @return a pointer to a YDualPower object, corresponding to
     *         the first dual power switch currently online, or a null pointer
     *         if there are none.
     */
    static FirstDualPower(): YDualPower | null;
    /**
     * Starts the enumeration of dual power switches currently accessible.
     * Use the method YDualPower.nextDualPower() to iterate on
     * next dual power switches.
     *
     * @param yctx : a YAPI context.
     *
     * @return a pointer to a YDualPower object, corresponding to
     *         the first dual power switch currently online, or a null pointer
     *         if there are none.
     */
    static FirstDualPowerInContext(yctx: YAPIContext): YDualPower | null;
}
export declare namespace YDualPower {
    const enum POWERSTATE {
        OFF = 0,
        FROM_USB = 1,
        FROM_EXT = 2,
        INVALID = -1
    }
    const enum POWERCONTROL {
        AUTO = 0,
        FROM_USB = 1,
        FROM_EXT = 2,
        OFF = 3,
        INVALID = -1
    }
    interface ValueCallback {
        (func: YDualPower, value: string): void;
    }
}
