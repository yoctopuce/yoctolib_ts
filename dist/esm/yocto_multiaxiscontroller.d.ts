/*********************************************************************
 *
 *  $Id: yocto_multiaxiscontroller.ts 63327 2024-11-13 09:35:03Z seb $
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
import { YAPIContext, YFunction } from './yocto_api.js';
/**
 * YMultiAxisController Class: MultiAxisController function interface
 *
 * The YMultiAxisController class allows you to drive multiple stepper motors
 * synchronously.
 */
export declare class YMultiAxisController extends YFunction {
    _className: string;
    _nAxis: number;
    _globalState: YMultiAxisController.GLOBALSTATE;
    _command: string;
    _valueCallbackMultiAxisController: YMultiAxisController.ValueCallback | null;
    readonly NAXIS_INVALID: number;
    readonly GLOBALSTATE_ABSENT: YMultiAxisController.GLOBALSTATE;
    readonly GLOBALSTATE_ALERT: YMultiAxisController.GLOBALSTATE;
    readonly GLOBALSTATE_HI_Z: YMultiAxisController.GLOBALSTATE;
    readonly GLOBALSTATE_STOP: YMultiAxisController.GLOBALSTATE;
    readonly GLOBALSTATE_RUN: YMultiAxisController.GLOBALSTATE;
    readonly GLOBALSTATE_BATCH: YMultiAxisController.GLOBALSTATE;
    readonly GLOBALSTATE_INVALID: YMultiAxisController.GLOBALSTATE;
    readonly COMMAND_INVALID: string;
    static readonly NAXIS_INVALID: number;
    static readonly GLOBALSTATE_ABSENT: YMultiAxisController.GLOBALSTATE;
    static readonly GLOBALSTATE_ALERT: YMultiAxisController.GLOBALSTATE;
    static readonly GLOBALSTATE_HI_Z: YMultiAxisController.GLOBALSTATE;
    static readonly GLOBALSTATE_STOP: YMultiAxisController.GLOBALSTATE;
    static readonly GLOBALSTATE_RUN: YMultiAxisController.GLOBALSTATE;
    static readonly GLOBALSTATE_BATCH: YMultiAxisController.GLOBALSTATE;
    static readonly GLOBALSTATE_INVALID: YMultiAxisController.GLOBALSTATE;
    static readonly COMMAND_INVALID: string;
    constructor(yapi: YAPIContext, func: string);
    imm_parseAttr(name: string, val: any): number;
    /**
     * Returns the number of synchronized controllers.
     *
     * @return an integer corresponding to the number of synchronized controllers
     *
     * On failure, throws an exception or returns YMultiAxisController.NAXIS_INVALID.
     */
    get_nAxis(): Promise<number>;
    /**
     * Changes the number of synchronized controllers.
     *
     * @param newval : an integer corresponding to the number of synchronized controllers
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_nAxis(newval: number): Promise<number>;
    /**
     * Returns the stepper motor set overall state.
     *
     * @return a value among YMultiAxisController.GLOBALSTATE_ABSENT,
     * YMultiAxisController.GLOBALSTATE_ALERT, YMultiAxisController.GLOBALSTATE_HI_Z,
     * YMultiAxisController.GLOBALSTATE_STOP, YMultiAxisController.GLOBALSTATE_RUN and
     * YMultiAxisController.GLOBALSTATE_BATCH corresponding to the stepper motor set overall state
     *
     * On failure, throws an exception or returns YMultiAxisController.GLOBALSTATE_INVALID.
     */
    get_globalState(): Promise<YMultiAxisController.GLOBALSTATE>;
    get_command(): Promise<string>;
    set_command(newval: string): Promise<number>;
    /**
     * Retrieves a multi-axis controller for a given identifier.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the multi-axis controller is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YMultiAxisController.isOnline() to test if the multi-axis controller is
     * indeed online at a given time. In case of ambiguity when looking for
     * a multi-axis controller by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the multi-axis controller, for instance
     *         MyDevice.multiAxisController.
     *
     * @return a YMultiAxisController object allowing you to drive the multi-axis controller.
     */
    static FindMultiAxisController(func: string): YMultiAxisController;
    /**
     * Retrieves a multi-axis controller for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the multi-axis controller is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YMultiAxisController.isOnline() to test if the multi-axis controller is
     * indeed online at a given time. In case of ambiguity when looking for
     * a multi-axis controller by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx : a YAPI context
     * @param func : a string that uniquely characterizes the multi-axis controller, for instance
     *         MyDevice.multiAxisController.
     *
     * @return a YMultiAxisController object allowing you to drive the multi-axis controller.
     */
    static FindMultiAxisControllerInContext(yctx: YAPIContext, func: string): YMultiAxisController;
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
    registerValueCallback(callback: YMultiAxisController.ValueCallback | null): Promise<number>;
    _invokeValueCallback(value: string): Promise<number>;
    sendCommand(command: string): Promise<number>;
    /**
     * Reinitialize all controllers and clear all alert flags.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    reset(): Promise<number>;
    /**
     * Starts all motors backward at the specified speeds, to search for the motor home position.
     *
     * @param speed : desired speed for all axis, in steps per second.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    findHomePosition(speed: number[]): Promise<number>;
    /**
     * Starts all motors synchronously to reach a given absolute position.
     * The time needed to reach the requested position will depend on the lowest
     * acceleration and max speed parameters configured for all motors.
     * The final position will be reached on all axis at the same time.
     *
     * @param absPos : absolute position, measured in steps from each origin.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    moveTo(absPos: number[]): Promise<number>;
    /**
     * Starts all motors synchronously to reach a given relative position.
     * The time needed to reach the requested position will depend on the lowest
     * acceleration and max speed parameters configured for all motors.
     * The final position will be reached on all axis at the same time.
     *
     * @param relPos : relative position, measured in steps from the current position.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    moveRel(relPos: number[]): Promise<number>;
    /**
     * Keep the motor in the same state for the specified amount of time, before processing next command.
     *
     * @param waitMs : wait time, specified in milliseconds.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    pause(waitMs: number): Promise<number>;
    /**
     * Stops the motor with an emergency alert, without taking any additional precaution.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    emergencyStop(): Promise<number>;
    /**
     * Stops the motor smoothly as soon as possible, without waiting for ongoing move completion.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    abortAndBrake(): Promise<number>;
    /**
     * Turn the controller into Hi-Z mode immediately, without waiting for ongoing move completion.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    abortAndHiZ(): Promise<number>;
    /**
     * Continues the enumeration of multi-axis controllers started using yFirstMultiAxisController().
     * Caution: You can't make any assumption about the returned multi-axis controllers order.
     * If you want to find a specific a multi-axis controller, use MultiAxisController.findMultiAxisController()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YMultiAxisController object, corresponding to
     *         a multi-axis controller currently online, or a null pointer
     *         if there are no more multi-axis controllers to enumerate.
     */
    nextMultiAxisController(): YMultiAxisController | null;
    /**
     * Starts the enumeration of multi-axis controllers currently accessible.
     * Use the method YMultiAxisController.nextMultiAxisController() to iterate on
     * next multi-axis controllers.
     *
     * @return a pointer to a YMultiAxisController object, corresponding to
     *         the first multi-axis controller currently online, or a null pointer
     *         if there are none.
     */
    static FirstMultiAxisController(): YMultiAxisController | null;
    /**
     * Starts the enumeration of multi-axis controllers currently accessible.
     * Use the method YMultiAxisController.nextMultiAxisController() to iterate on
     * next multi-axis controllers.
     *
     * @param yctx : a YAPI context.
     *
     * @return a pointer to a YMultiAxisController object, corresponding to
     *         the first multi-axis controller currently online, or a null pointer
     *         if there are none.
     */
    static FirstMultiAxisControllerInContext(yctx: YAPIContext): YMultiAxisController | null;
}
export declare namespace YMultiAxisController {
    const enum GLOBALSTATE {
        ABSENT = 0,
        ALERT = 1,
        HI_Z = 2,
        STOP = 3,
        RUN = 4,
        BATCH = 5,
        INVALID = -1
    }
    interface ValueCallback {
        (func: YMultiAxisController, value: string): void;
    }
}
