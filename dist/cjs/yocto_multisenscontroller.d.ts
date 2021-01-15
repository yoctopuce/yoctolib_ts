/*********************************************************************
 *
 *  $Id: svn_id $
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
import { YAPIContext, YFunction } from './yocto_api.js';
export declare const enum Y_MaintenanceMode {
    FALSE = 0,
    TRUE = 1,
    INVALID = -1
}
export interface YMultiSensControllerValueCallback {
    (func: YMultiSensController, value: string): void;
}
/**
 * YMultiSensController Class: Sensor chain configuration interface, available for instance in the
 * Yocto-Temperature-IR
 *
 * The YMultiSensController class allows you to setup a customized
 * sensor chain on devices featuring that functionality.
 */
export declare class YMultiSensController extends YFunction {
    _className: string;
    _nSensors: number;
    _maxSensors: number;
    _maintenanceMode: Y_MaintenanceMode;
    _command: string;
    _valueCallbackMultiSensController: YMultiSensControllerValueCallback | null;
    readonly NSENSORS_INVALID: number;
    readonly MAXSENSORS_INVALID: number;
    readonly MAINTENANCEMODE_FALSE: Y_MaintenanceMode;
    readonly MAINTENANCEMODE_TRUE: Y_MaintenanceMode;
    readonly MAINTENANCEMODE_INVALID: Y_MaintenanceMode;
    readonly COMMAND_INVALID: string;
    static readonly NSENSORS_INVALID: number;
    static readonly MAXSENSORS_INVALID: number;
    static readonly MAINTENANCEMODE_FALSE: Y_MaintenanceMode;
    static readonly MAINTENANCEMODE_TRUE: Y_MaintenanceMode;
    static readonly MAINTENANCEMODE_INVALID: Y_MaintenanceMode;
    static readonly COMMAND_INVALID: string;
    constructor(yapi: YAPIContext, func: string);
    imm_parseAttr(name: string, val: any): 0 | 1;
    /**
     * Returns the number of sensors to poll.
     *
     * @return an integer corresponding to the number of sensors to poll
     *
     * On failure, throws an exception or returns Y_NSENSORS_INVALID.
     */
    get_nSensors(): Promise<number>;
    /**
     * Changes the number of sensors to poll. Remember to call the
     * saveToFlash() method of the module if the
     * modification must be kept. It is recommended to restart the
     * device with  module->reboot() after modifying
     * (and saving) this settings
     *
     * @param newval : an integer corresponding to the number of sensors to poll
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_nSensors(newval: number): Promise<number>;
    /**
     * Returns the maximum configurable sensor count allowed on this device.
     *
     * @return an integer corresponding to the maximum configurable sensor count allowed on this device
     *
     * On failure, throws an exception or returns Y_MAXSENSORS_INVALID.
     */
    get_maxSensors(): Promise<number>;
    /**
     * Returns true when the device is in maintenance mode.
     *
     * @return either Y_MAINTENANCEMODE_FALSE or Y_MAINTENANCEMODE_TRUE, according to true when the device
     * is in maintenance mode
     *
     * On failure, throws an exception or returns Y_MAINTENANCEMODE_INVALID.
     */
    get_maintenanceMode(): Promise<Y_MaintenanceMode>;
    /**
     * Changes the device mode to enable maintenance and to stop sensor polling.
     * This way, the device does not automatically restart when it cannot
     * communicate with one of the sensors.
     *
     * @param newval : either Y_MAINTENANCEMODE_FALSE or Y_MAINTENANCEMODE_TRUE, according to the device
     * mode to enable maintenance and to stop sensor polling
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_maintenanceMode(newval: Y_MaintenanceMode): Promise<number>;
    get_command(): Promise<string>;
    set_command(newval: string): Promise<number>;
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
     * Use the method YMultiSensController.isOnline() to test if $THEFUNCTION$ is
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
     * @return a YMultiSensController object allowing you to drive $THEFUNCTION$.
     */
    static FindMultiSensController(func: string): YMultiSensController;
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
     * Use the method YMultiSensController.isOnline() to test if $THEFUNCTION$ is
     * indeed online at a given time. In case of ambiguity when looking for
     * $AFUNCTION$ by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx : a YAPI context
     * @param func : a string that uniquely characterizes $THEFUNCTION$, for instance
     *         $FULLHARDWAREID$.
     *
     * @return a YMultiSensController object allowing you to drive $THEFUNCTION$.
     */
    static FindMultiSensControllerInContext(yctx: YAPIContext, func: string): YMultiSensController;
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
    registerValueCallback(callback: YMultiSensControllerValueCallback | null): Promise<number>;
    _invokeValueCallback(value: string): Promise<number>;
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
     * @return YAPI_SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    setupAddress(addr: number): Promise<number>;
    /**
     * Returns the next MultiSensController
     *
     * @returns {YMultiSensController}
     */
    nextMultiSensController(): YMultiSensController | null;
    /**
     * Retrieves the first MultiSensController in a YAPI context
     *
     * @returns {YMultiSensController}
     */
    static FirstMultiSensController(): YMultiSensController | null;
    /**
     * Retrieves the first MultiSensController in a given context
     *
     * @param yctx {YAPIContext}
     *
     * @returns {YMultiSensController}
     */
    static FirstMultiSensControllerInContext(yctx: YAPIContext): YMultiSensController | null;
}
