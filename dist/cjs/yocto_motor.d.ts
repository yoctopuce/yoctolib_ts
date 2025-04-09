/*********************************************************************
 *
 *  $Id: svn_id $
 *
 *  Implements the high-level API for Motor functions
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
 * YMotor Class: motor control interface, available for instance in the Yocto-Motor-DC
 *
 * The YMotor class allows you to drive a DC motor. It can be used to configure the
 * power sent to the motor to make it turn both ways, but also to drive accelerations
 * and decelerations. The motor will then accelerate automatically: you will not
 * have to monitor it. The API also allows to slow down the motor by shortening
 * its terminals: the motor will then act as an electromagnetic brake.
 */
export declare class YMotor extends YFunction {
    _className: string;
    _motorStatus: YMotor.MOTORSTATUS;
    _drivingForce: number;
    _brakingForce: number;
    _cutOffVoltage: number;
    _overCurrentLimit: number;
    _frequency: number;
    _starterTime: number;
    _failSafeTimeout: number;
    _command: string;
    _valueCallbackMotor: YMotor.ValueCallback | null;
    readonly MOTORSTATUS_IDLE: YMotor.MOTORSTATUS;
    readonly MOTORSTATUS_BRAKE: YMotor.MOTORSTATUS;
    readonly MOTORSTATUS_FORWD: YMotor.MOTORSTATUS;
    readonly MOTORSTATUS_BACKWD: YMotor.MOTORSTATUS;
    readonly MOTORSTATUS_LOVOLT: YMotor.MOTORSTATUS;
    readonly MOTORSTATUS_HICURR: YMotor.MOTORSTATUS;
    readonly MOTORSTATUS_HIHEAT: YMotor.MOTORSTATUS;
    readonly MOTORSTATUS_FAILSF: YMotor.MOTORSTATUS;
    readonly MOTORSTATUS_INVALID: YMotor.MOTORSTATUS;
    readonly DRIVINGFORCE_INVALID: number;
    readonly BRAKINGFORCE_INVALID: number;
    readonly CUTOFFVOLTAGE_INVALID: number;
    readonly OVERCURRENTLIMIT_INVALID: number;
    readonly FREQUENCY_INVALID: number;
    readonly STARTERTIME_INVALID: number;
    readonly FAILSAFETIMEOUT_INVALID: number;
    readonly COMMAND_INVALID: string;
    static readonly MOTORSTATUS_IDLE: YMotor.MOTORSTATUS;
    static readonly MOTORSTATUS_BRAKE: YMotor.MOTORSTATUS;
    static readonly MOTORSTATUS_FORWD: YMotor.MOTORSTATUS;
    static readonly MOTORSTATUS_BACKWD: YMotor.MOTORSTATUS;
    static readonly MOTORSTATUS_LOVOLT: YMotor.MOTORSTATUS;
    static readonly MOTORSTATUS_HICURR: YMotor.MOTORSTATUS;
    static readonly MOTORSTATUS_HIHEAT: YMotor.MOTORSTATUS;
    static readonly MOTORSTATUS_FAILSF: YMotor.MOTORSTATUS;
    static readonly MOTORSTATUS_INVALID: YMotor.MOTORSTATUS;
    static readonly DRIVINGFORCE_INVALID: number;
    static readonly BRAKINGFORCE_INVALID: number;
    static readonly CUTOFFVOLTAGE_INVALID: number;
    static readonly OVERCURRENTLIMIT_INVALID: number;
    static readonly FREQUENCY_INVALID: number;
    static readonly STARTERTIME_INVALID: number;
    static readonly FAILSAFETIMEOUT_INVALID: number;
    static readonly COMMAND_INVALID: string;
    constructor(yapi: YAPIContext, func: string);
    imm_parseAttr(name: string, val: any): number;
    /**
     * Return the controller state. Possible states are:
     * IDLE   when the motor is stopped/in free wheel, ready to start;
     * FORWD  when the controller is driving the motor forward;
     * BACKWD when the controller is driving the motor backward;
     * BRAKE  when the controller is braking;
     * LOVOLT when the controller has detected a low voltage condition;
     * HICURR when the controller has detected an over current condition;
     * HIHEAT when the controller has detected an overheat condition;
     * FAILSF when the controller switched on the failsafe security.
     *
     * When an error condition occurred (LOVOLT, HICURR, HIHEAT, FAILSF), the controller
     * status must be explicitly reset using the resetStatus function.
     *
     * @return a value among YMotor.MOTORSTATUS_IDLE, YMotor.MOTORSTATUS_BRAKE, YMotor.MOTORSTATUS_FORWD,
     * YMotor.MOTORSTATUS_BACKWD, YMotor.MOTORSTATUS_LOVOLT, YMotor.MOTORSTATUS_HICURR,
     * YMotor.MOTORSTATUS_HIHEAT and YMotor.MOTORSTATUS_FAILSF
     *
     * On failure, throws an exception or returns YMotor.MOTORSTATUS_INVALID.
     */
    get_motorStatus(): Promise<YMotor.MOTORSTATUS>;
    set_motorStatus(newval: YMotor.MOTORSTATUS): Promise<number>;
    /**
     * Changes immediately the power sent to the motor. The value is a percentage between -100%
     * to 100%. If you want go easy on your mechanics and avoid excessive current consumption,
     * try to avoid brutal power changes. For example, immediate transition from forward full power
     * to reverse full power is a very bad idea. Each time the driving power is modified, the
     * braking power is set to zero.
     *
     * @param newval : a floating point number corresponding to immediately the power sent to the motor
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_drivingForce(newval: number): Promise<number>;
    /**
     * Returns the power sent to the motor, as a percentage between -100% and +100%.
     *
     * @return a floating point number corresponding to the power sent to the motor, as a percentage
     * between -100% and +100%
     *
     * On failure, throws an exception or returns YMotor.DRIVINGFORCE_INVALID.
     */
    get_drivingForce(): Promise<number>;
    /**
     * Changes immediately the braking force applied to the motor (in percents).
     * The value 0 corresponds to no braking (free wheel). When the braking force
     * is changed, the driving power is set to zero. The value is a percentage.
     *
     * @param newval : a floating point number corresponding to immediately the braking force applied to
     * the motor (in percents)
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_brakingForce(newval: number): Promise<number>;
    /**
     * Returns the braking force applied to the motor, as a percentage.
     * The value 0 corresponds to no braking (free wheel).
     *
     * @return a floating point number corresponding to the braking force applied to the motor, as a percentage
     *
     * On failure, throws an exception or returns YMotor.BRAKINGFORCE_INVALID.
     */
    get_brakingForce(): Promise<number>;
    /**
     * Changes the threshold voltage under which the controller automatically switches to error state
     * and prevents further current draw. This setting prevent damage to a battery that can
     * occur when drawing current from an "empty" battery.
     * Note that whatever the cutoff threshold, the controller switches to undervoltage
     * error state if the power supply goes under 3V, even for a very brief time.
     * Remember to call the saveToFlash()
     * method of the module if the modification must be kept.
     *
     * @param newval : a floating point number corresponding to the threshold voltage under which the
     * controller automatically switches to error state
     *         and prevents further current draw
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_cutOffVoltage(newval: number): Promise<number>;
    /**
     * Returns the threshold voltage under which the controller automatically switches to error state
     * and prevents further current draw. This setting prevents damage to a battery that can
     * occur when drawing current from an "empty" battery.
     *
     * @return a floating point number corresponding to the threshold voltage under which the controller
     * automatically switches to error state
     *         and prevents further current draw
     *
     * On failure, throws an exception or returns YMotor.CUTOFFVOLTAGE_INVALID.
     */
    get_cutOffVoltage(): Promise<number>;
    /**
     * Returns the current threshold (in mA) above which the controller automatically
     * switches to error state. A zero value means that there is no limit.
     *
     * @return an integer corresponding to the current threshold (in mA) above which the controller automatically
     *         switches to error state
     *
     * On failure, throws an exception or returns YMotor.OVERCURRENTLIMIT_INVALID.
     */
    get_overCurrentLimit(): Promise<number>;
    /**
     * Changes the current threshold (in mA) above which the controller automatically
     * switches to error state. A zero value means that there is no limit. Note that whatever the
     * current limit is, the controller switches to OVERCURRENT status if the current
     * goes above 32A, even for a very brief time. Remember to call the saveToFlash()
     * method of the module if the modification must be kept.
     *
     * @param newval : an integer corresponding to the current threshold (in mA) above which the
     * controller automatically
     *         switches to error state
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_overCurrentLimit(newval: number): Promise<number>;
    /**
     * Changes the PWM frequency used to control the motor. Low frequency is usually
     * more efficient and may help the motor to start, but an audible noise might be
     * generated. A higher frequency reduces the noise, but more energy is converted
     * into heat. Remember to call the saveToFlash()
     * method of the module if the modification must be kept.
     *
     * @param newval : a floating point number corresponding to the PWM frequency used to control the motor
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_frequency(newval: number): Promise<number>;
    /**
     * Returns the PWM frequency used to control the motor.
     *
     * @return a floating point number corresponding to the PWM frequency used to control the motor
     *
     * On failure, throws an exception or returns YMotor.FREQUENCY_INVALID.
     */
    get_frequency(): Promise<number>;
    /**
     * Returns the duration (in ms) during which the motor is driven at low frequency to help
     * it start up.
     *
     * @return an integer corresponding to the duration (in ms) during which the motor is driven at low
     * frequency to help
     *         it start up
     *
     * On failure, throws an exception or returns YMotor.STARTERTIME_INVALID.
     */
    get_starterTime(): Promise<number>;
    /**
     * Changes the duration (in ms) during which the motor is driven at low frequency to help
     * it start up. Remember to call the saveToFlash()
     * method of the module if the modification must be kept.
     *
     * @param newval : an integer corresponding to the duration (in ms) during which the motor is driven
     * at low frequency to help
     *         it start up
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_starterTime(newval: number): Promise<number>;
    /**
     * Returns the delay in milliseconds allowed for the controller to run autonomously without
     * receiving any instruction from the control process. When this delay has elapsed,
     * the controller automatically stops the motor and switches to FAILSAFE error.
     * Failsafe security is disabled when the value is zero.
     *
     * @return an integer corresponding to the delay in milliseconds allowed for the controller to run
     * autonomously without
     *         receiving any instruction from the control process
     *
     * On failure, throws an exception or returns YMotor.FAILSAFETIMEOUT_INVALID.
     */
    get_failSafeTimeout(): Promise<number>;
    /**
     * Changes the delay in milliseconds allowed for the controller to run autonomously without
     * receiving any instruction from the control process. When this delay has elapsed,
     * the controller automatically stops the motor and switches to FAILSAFE error.
     * Failsafe security is disabled when the value is zero.
     * Remember to call the saveToFlash()
     * method of the module if the modification must be kept.
     *
     * @param newval : an integer corresponding to the delay in milliseconds allowed for the controller to
     * run autonomously without
     *         receiving any instruction from the control process
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_failSafeTimeout(newval: number): Promise<number>;
    get_command(): Promise<string>;
    set_command(newval: string): Promise<number>;
    /**
     * Retrieves a motor for a given identifier.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the motor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YMotor.isOnline() to test if the motor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a motor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the motor, for instance
     *         MOTORCTL.motor.
     *
     * @return a YMotor object allowing you to drive the motor.
     */
    static FindMotor(func: string): YMotor;
    /**
     * Retrieves a motor for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the motor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YMotor.isOnline() to test if the motor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a motor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx : a YAPI context
     * @param func : a string that uniquely characterizes the motor, for instance
     *         MOTORCTL.motor.
     *
     * @return a YMotor object allowing you to drive the motor.
     */
    static FindMotorInContext(yctx: YAPIContext, func: string): YMotor;
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
    registerValueCallback(callback: YMotor.ValueCallback | null): Promise<number>;
    _invokeValueCallback(value: string): Promise<number>;
    /**
     * Rearms the controller failsafe timer. When the motor is running and the failsafe feature
     * is active, this function should be called periodically to prove that the control process
     * is running properly. Otherwise, the motor is automatically stopped after the specified
     * timeout. Calling a motor <i>set</i> function implicitly rearms the failsafe timer.
     */
    keepALive(): Promise<number>;
    /**
     * Reset the controller state to IDLE. This function must be invoked explicitly
     * after any error condition is signaled.
     */
    resetStatus(): Promise<number>;
    /**
     * Changes progressively the power sent to the motor for a specific duration.
     *
     * @param targetPower : desired motor power, in percents (between -100% and +100%)
     * @param delay : duration (in ms) of the transition
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    drivingForceMove(targetPower: number, delay: number): Promise<number>;
    /**
     * Changes progressively the braking force applied to the motor for a specific duration.
     *
     * @param targetPower : desired braking force, in percents
     * @param delay : duration (in ms) of the transition
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    brakingForceMove(targetPower: number, delay: number): Promise<number>;
    /**
     * Continues the enumeration of motors started using yFirstMotor().
     * Caution: You can't make any assumption about the returned motors order.
     * If you want to find a specific a motor, use Motor.findMotor()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YMotor object, corresponding to
     *         a motor currently online, or a null pointer
     *         if there are no more motors to enumerate.
     */
    nextMotor(): YMotor | null;
    /**
     * Starts the enumeration of motors currently accessible.
     * Use the method YMotor.nextMotor() to iterate on
     * next motors.
     *
     * @return a pointer to a YMotor object, corresponding to
     *         the first motor currently online, or a null pointer
     *         if there are none.
     */
    static FirstMotor(): YMotor | null;
    /**
     * Starts the enumeration of motors currently accessible.
     * Use the method YMotor.nextMotor() to iterate on
     * next motors.
     *
     * @param yctx : a YAPI context.
     *
     * @return a pointer to a YMotor object, corresponding to
     *         the first motor currently online, or a null pointer
     *         if there are none.
     */
    static FirstMotorInContext(yctx: YAPIContext): YMotor | null;
}
export declare namespace YMotor {
    const enum MOTORSTATUS {
        IDLE = 0,
        BRAKE = 1,
        FORWD = 2,
        BACKWD = 3,
        LOVOLT = 4,
        HICURR = 5,
        HIHEAT = 6,
        FAILSF = 7,
        INVALID = -1
    }
    interface ValueCallback {
        (func: YMotor, value: string): void;
    }
}
