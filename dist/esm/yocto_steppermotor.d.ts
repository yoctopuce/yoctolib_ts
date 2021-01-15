/*********************************************************************
 *
 *  $Id: svn_id $
 *
 *  Implements the high-level API for StepperMotor functions
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
export declare const enum Y_MotorState {
    ABSENT = 0,
    ALERT = 1,
    HI_Z = 2,
    STOP = 3,
    RUN = 4,
    BATCH = 5,
    INVALID = -1
}
export declare const enum Y_Stepping {
    MICROSTEP16 = 0,
    MICROSTEP8 = 1,
    MICROSTEP4 = 2,
    HALFSTEP = 3,
    FULLSTEP = 4,
    INVALID = -1
}
export interface YStepperMotorValueCallback {
    (func: YStepperMotor, value: string): void;
}
/**
 * YStepperMotor Class: stepper motor control interface
 *
 * The YStepperMotor class allows you to drive a stepper motor.
 */
export declare class YStepperMotor extends YFunction {
    _className: string;
    _motorState: Y_MotorState;
    _diags: number;
    _stepPos: number;
    _speed: number;
    _pullinSpeed: number;
    _maxAccel: number;
    _maxSpeed: number;
    _stepping: Y_Stepping;
    _overcurrent: number;
    _tCurrStop: number;
    _tCurrRun: number;
    _alertMode: string;
    _auxMode: string;
    _auxSignal: number;
    _command: string;
    _valueCallbackStepperMotor: YStepperMotorValueCallback | null;
    readonly MOTORSTATE_ABSENT: Y_MotorState;
    readonly MOTORSTATE_ALERT: Y_MotorState;
    readonly MOTORSTATE_HI_Z: Y_MotorState;
    readonly MOTORSTATE_STOP: Y_MotorState;
    readonly MOTORSTATE_RUN: Y_MotorState;
    readonly MOTORSTATE_BATCH: Y_MotorState;
    readonly MOTORSTATE_INVALID: Y_MotorState;
    readonly DIAGS_INVALID: number;
    readonly STEPPOS_INVALID: number;
    readonly SPEED_INVALID: number;
    readonly PULLINSPEED_INVALID: number;
    readonly MAXACCEL_INVALID: number;
    readonly MAXSPEED_INVALID: number;
    readonly STEPPING_MICROSTEP16: Y_Stepping;
    readonly STEPPING_MICROSTEP8: Y_Stepping;
    readonly STEPPING_MICROSTEP4: Y_Stepping;
    readonly STEPPING_HALFSTEP: Y_Stepping;
    readonly STEPPING_FULLSTEP: Y_Stepping;
    readonly STEPPING_INVALID: Y_Stepping;
    readonly OVERCURRENT_INVALID: number;
    readonly TCURRSTOP_INVALID: number;
    readonly TCURRRUN_INVALID: number;
    readonly ALERTMODE_INVALID: string;
    readonly AUXMODE_INVALID: string;
    readonly AUXSIGNAL_INVALID: number;
    readonly COMMAND_INVALID: string;
    static readonly MOTORSTATE_ABSENT: Y_MotorState;
    static readonly MOTORSTATE_ALERT: Y_MotorState;
    static readonly MOTORSTATE_HI_Z: Y_MotorState;
    static readonly MOTORSTATE_STOP: Y_MotorState;
    static readonly MOTORSTATE_RUN: Y_MotorState;
    static readonly MOTORSTATE_BATCH: Y_MotorState;
    static readonly MOTORSTATE_INVALID: Y_MotorState;
    static readonly DIAGS_INVALID: number;
    static readonly STEPPOS_INVALID: number;
    static readonly SPEED_INVALID: number;
    static readonly PULLINSPEED_INVALID: number;
    static readonly MAXACCEL_INVALID: number;
    static readonly MAXSPEED_INVALID: number;
    static readonly STEPPING_MICROSTEP16: Y_Stepping;
    static readonly STEPPING_MICROSTEP8: Y_Stepping;
    static readonly STEPPING_MICROSTEP4: Y_Stepping;
    static readonly STEPPING_HALFSTEP: Y_Stepping;
    static readonly STEPPING_FULLSTEP: Y_Stepping;
    static readonly STEPPING_INVALID: Y_Stepping;
    static readonly OVERCURRENT_INVALID: number;
    static readonly TCURRSTOP_INVALID: number;
    static readonly TCURRRUN_INVALID: number;
    static readonly ALERTMODE_INVALID: string;
    static readonly AUXMODE_INVALID: string;
    static readonly AUXSIGNAL_INVALID: number;
    static readonly COMMAND_INVALID: string;
    constructor(yapi: YAPIContext, func: string);
    imm_parseAttr(name: string, val: any): 0 | 1;
    /**
     * Returns the motor working state.
     *
     * @return a value among Y_MOTORSTATE_ABSENT, Y_MOTORSTATE_ALERT, Y_MOTORSTATE_HI_Z,
     * Y_MOTORSTATE_STOP, Y_MOTORSTATE_RUN and Y_MOTORSTATE_BATCH corresponding to the motor working state
     *
     * On failure, throws an exception or returns Y_MOTORSTATE_INVALID.
     */
    get_motorState(): Promise<Y_MotorState>;
    /**
     * Returns the stepper motor controller diagnostics, as a bitmap.
     *
     * @return an integer corresponding to the stepper motor controller diagnostics, as a bitmap
     *
     * On failure, throws an exception or returns Y_DIAGS_INVALID.
     */
    get_diags(): Promise<number>;
    /**
     * Changes the current logical motor position, measured in steps.
     * This command does not cause any motor move, as its purpose is only to setup
     * the origin of the position counter. The fractional part of the position,
     * that corresponds to the physical position of the rotor, is not changed.
     * To trigger a motor move, use methods moveTo() or moveRel()
     * instead.
     *
     * @param newval : a floating point number corresponding to the current logical motor position, measured in steps
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_stepPos(newval: number): Promise<number>;
    /**
     * Returns current motor speed, measured in steps per second.
     * To change speed, use method changeSpeed().
     *
     * @return a floating point number corresponding to current motor speed, measured in steps per second
     *
     * On failure, throws an exception or returns Y_SPEED_INVALID.
     */
    get_speed(): Promise<number>;
    /**
     * Changes the motor speed immediately reachable from stop state, measured in steps per second.
     *
     * @param newval : a floating point number corresponding to the motor speed immediately reachable from
     * stop state, measured in steps per second
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_pullinSpeed(newval: number): Promise<number>;
    /**
     * Returns the motor speed immediately reachable from stop state, measured in steps per second.
     *
     * @return a floating point number corresponding to the motor speed immediately reachable from stop
     * state, measured in steps per second
     *
     * On failure, throws an exception or returns Y_PULLINSPEED_INVALID.
     */
    get_pullinSpeed(): Promise<number>;
    /**
     * Changes the maximal motor acceleration, measured in steps per second^2.
     *
     * @param newval : a floating point number corresponding to the maximal motor acceleration, measured
     * in steps per second^2
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_maxAccel(newval: number): Promise<number>;
    /**
     * Returns the maximal motor acceleration, measured in steps per second^2.
     *
     * @return a floating point number corresponding to the maximal motor acceleration, measured in steps per second^2
     *
     * On failure, throws an exception or returns Y_MAXACCEL_INVALID.
     */
    get_maxAccel(): Promise<number>;
    /**
     * Changes the maximal motor speed, measured in steps per second.
     *
     * @param newval : a floating point number corresponding to the maximal motor speed, measured in steps per second
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_maxSpeed(newval: number): Promise<number>;
    /**
     * Returns the maximal motor speed, measured in steps per second.
     *
     * @return a floating point number corresponding to the maximal motor speed, measured in steps per second
     *
     * On failure, throws an exception or returns Y_MAXSPEED_INVALID.
     */
    get_maxSpeed(): Promise<number>;
    /**
     * Returns the stepping mode used to drive the motor.
     *
     * @return a value among Y_STEPPING_MICROSTEP16, Y_STEPPING_MICROSTEP8, Y_STEPPING_MICROSTEP4,
     * Y_STEPPING_HALFSTEP and Y_STEPPING_FULLSTEP corresponding to the stepping mode used to drive the motor
     *
     * On failure, throws an exception or returns Y_STEPPING_INVALID.
     */
    get_stepping(): Promise<Y_Stepping>;
    /**
     * Changes the stepping mode used to drive the motor.
     *
     * @param newval : a value among Y_STEPPING_MICROSTEP16, Y_STEPPING_MICROSTEP8, Y_STEPPING_MICROSTEP4,
     * Y_STEPPING_HALFSTEP and Y_STEPPING_FULLSTEP corresponding to the stepping mode used to drive the motor
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_stepping(newval: Y_Stepping): Promise<number>;
    /**
     * Returns the overcurrent alert and emergency stop threshold, measured in mA.
     *
     * @return an integer corresponding to the overcurrent alert and emergency stop threshold, measured in mA
     *
     * On failure, throws an exception or returns Y_OVERCURRENT_INVALID.
     */
    get_overcurrent(): Promise<number>;
    /**
     * Changes the overcurrent alert and emergency stop threshold, measured in mA.
     *
     * @param newval : an integer corresponding to the overcurrent alert and emergency stop threshold, measured in mA
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_overcurrent(newval: number): Promise<number>;
    /**
     * Returns the torque regulation current when the motor is stopped, measured in mA.
     *
     * @return an integer corresponding to the torque regulation current when the motor is stopped, measured in mA
     *
     * On failure, throws an exception or returns Y_TCURRSTOP_INVALID.
     */
    get_tCurrStop(): Promise<number>;
    /**
     * Changes the torque regulation current when the motor is stopped, measured in mA.
     *
     * @param newval : an integer corresponding to the torque regulation current when the motor is
     * stopped, measured in mA
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_tCurrStop(newval: number): Promise<number>;
    /**
     * Returns the torque regulation current when the motor is running, measured in mA.
     *
     * @return an integer corresponding to the torque regulation current when the motor is running, measured in mA
     *
     * On failure, throws an exception or returns Y_TCURRRUN_INVALID.
     */
    get_tCurrRun(): Promise<number>;
    /**
     * Changes the torque regulation current when the motor is running, measured in mA.
     *
     * @param newval : an integer corresponding to the torque regulation current when the motor is
     * running, measured in mA
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_tCurrRun(newval: number): Promise<number>;
    get_alertMode(): Promise<string>;
    set_alertMode(newval: string): Promise<number>;
    get_auxMode(): Promise<string>;
    set_auxMode(newval: string): Promise<number>;
    /**
     * Returns the current value of the signal generated on the auxiliary output.
     *
     * @return an integer corresponding to the current value of the signal generated on the auxiliary output
     *
     * On failure, throws an exception or returns Y_AUXSIGNAL_INVALID.
     */
    get_auxSignal(): Promise<number>;
    /**
     * Changes the value of the signal generated on the auxiliary output.
     * Acceptable values depend on the auxiliary output signal type configured.
     *
     * @param newval : an integer corresponding to the value of the signal generated on the auxiliary output
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_auxSignal(newval: number): Promise<number>;
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
     * Use the method YStepperMotor.isOnline() to test if $THEFUNCTION$ is
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
     * @return a YStepperMotor object allowing you to drive $THEFUNCTION$.
     */
    static FindStepperMotor(func: string): YStepperMotor;
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
     * Use the method YStepperMotor.isOnline() to test if $THEFUNCTION$ is
     * indeed online at a given time. In case of ambiguity when looking for
     * $AFUNCTION$ by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx : a YAPI context
     * @param func : a string that uniquely characterizes $THEFUNCTION$, for instance
     *         $FULLHARDWAREID$.
     *
     * @return a YStepperMotor object allowing you to drive $THEFUNCTION$.
     */
    static FindStepperMotorInContext(yctx: YAPIContext, func: string): YStepperMotor;
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
    registerValueCallback(callback: YStepperMotorValueCallback | null): Promise<number>;
    _invokeValueCallback(value: string): Promise<number>;
    sendCommand(command: string): Promise<number>;
    /**
     * Reinitialize the controller and clear all alert flags.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    reset(): Promise<number>;
    /**
     * Starts the motor backward at the specified speed, to search for the motor home position.
     *
     * @param speed : desired speed, in steps per second.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    findHomePosition(speed: number): Promise<number>;
    /**
     * Starts the motor at a given speed. The time needed to reach the requested speed
     * will depend on the acceleration parameters configured for the motor.
     *
     * @param speed : desired speed, in steps per second. The minimal non-zero speed
     *         is 0.001 pulse per second.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    changeSpeed(speed: number): Promise<number>;
    /**
     * Starts the motor to reach a given absolute position. The time needed to reach the requested
     * position will depend on the acceleration and max speed parameters configured for
     * the motor.
     *
     * @param absPos : absolute position, measured in steps from the origin.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    moveTo(absPos: number): Promise<number>;
    /**
     * Starts the motor to reach a given relative position. The time needed to reach the requested
     * position will depend on the acceleration and max speed parameters configured for
     * the motor.
     *
     * @param relPos : relative position, measured in steps from the current position.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    moveRel(relPos: number): Promise<number>;
    /**
     * Starts the motor to reach a given relative position, keeping the speed under the
     * specified limit. The time needed to reach the requested position will depend on
     * the acceleration parameters configured for the motor.
     *
     * @param relPos : relative position, measured in steps from the current position.
     * @param maxSpeed : limit speed, in steps per second.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    moveRelSlow(relPos: number, maxSpeed: number): Promise<number>;
    /**
     * Keep the motor in the same state for the specified amount of time, before processing next command.
     *
     * @param waitMs : wait time, specified in milliseconds.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    pause(waitMs: number): Promise<number>;
    /**
     * Stops the motor with an emergency alert, without taking any additional precaution.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    emergencyStop(): Promise<number>;
    /**
     * Move one step in the direction opposite the direction set when the most recent alert was raised.
     * The move occurs even if the system is still in alert mode (end switch depressed). Caution.
     * use this function with great care as it may cause mechanical damages !
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    alertStepOut(): Promise<number>;
    /**
     * Move one single step in the selected direction without regards to end switches.
     * The move occurs even if the system is still in alert mode (end switch depressed). Caution.
     * use this function with great care as it may cause mechanical damages !
     *
     * @param dir : Value +1 or -1, according to the desired direction of the move
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    alertStepDir(dir: number): Promise<number>;
    /**
     * Stops the motor smoothly as soon as possible, without waiting for ongoing move completion.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    abortAndBrake(): Promise<number>;
    /**
     * Turn the controller into Hi-Z mode immediately, without waiting for ongoing move completion.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    abortAndHiZ(): Promise<number>;
    /**
     * Returns the next StepperMotor
     *
     * @returns {YStepperMotor}
     */
    nextStepperMotor(): YStepperMotor | null;
    /**
     * Retrieves the first StepperMotor in a YAPI context
     *
     * @returns {YStepperMotor}
     */
    static FirstStepperMotor(): YStepperMotor | null;
    /**
     * Retrieves the first StepperMotor in a given context
     *
     * @param yctx {YAPIContext}
     *
     * @returns {YStepperMotor}
     */
    static FirstStepperMotorInContext(yctx: YAPIContext): YStepperMotor | null;
}
