/*********************************************************************
 *
 *  $Id: yocto_servo.ts 48520 2022-02-03 10:51:20Z seb $
 *
 *  Implements the high-level API for Servo functions
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
 * YServo Class: RC servo motor control interface, available for instance in the Yocto-Servo
 *
 * The YServo class is designed to drive remote-control servo motors
 * outputs. This class allows you not only to move
 * a servo to a given position, but also to specify the time interval
 * in which the move should be performed. This makes it possible to
 * synchronize two servos involved in a same move.
 */
export declare class YServo extends YFunction {
    _className: string;
    _position: number;
    _enabled: YServo.ENABLED;
    _range: number;
    _neutral: number;
    _move: YServo.Move;
    _positionAtPowerOn: number;
    _enabledAtPowerOn: YServo.ENABLEDATPOWERON;
    _valueCallbackServo: YServo.ValueCallback | null;
    readonly POSITION_INVALID: number;
    readonly ENABLED_FALSE: YServo.ENABLED;
    readonly ENABLED_TRUE: YServo.ENABLED;
    readonly ENABLED_INVALID: YServo.ENABLED;
    readonly RANGE_INVALID: number;
    readonly NEUTRAL_INVALID: number;
    readonly POSITIONATPOWERON_INVALID: number;
    readonly ENABLEDATPOWERON_FALSE: YServo.ENABLEDATPOWERON;
    readonly ENABLEDATPOWERON_TRUE: YServo.ENABLEDATPOWERON;
    readonly ENABLEDATPOWERON_INVALID: YServo.ENABLEDATPOWERON;
    static readonly MOVE_INVALID: YServo.Move;
    static readonly POSITION_INVALID: number;
    static readonly ENABLED_FALSE: YServo.ENABLED;
    static readonly ENABLED_TRUE: YServo.ENABLED;
    static readonly ENABLED_INVALID: YServo.ENABLED;
    static readonly RANGE_INVALID: number;
    static readonly NEUTRAL_INVALID: number;
    static readonly POSITIONATPOWERON_INVALID: number;
    static readonly ENABLEDATPOWERON_FALSE: YServo.ENABLEDATPOWERON;
    static readonly ENABLEDATPOWERON_TRUE: YServo.ENABLEDATPOWERON;
    static readonly ENABLEDATPOWERON_INVALID: YServo.ENABLEDATPOWERON;
    constructor(yapi: YAPIContext, func: string);
    imm_parseAttr(name: string, val: any): 0 | 1;
    /**
     * Returns the current servo position.
     *
     * @return an integer corresponding to the current servo position
     *
     * On failure, throws an exception or returns YServo.POSITION_INVALID.
     */
    get_position(): Promise<number>;
    /**
     * Changes immediately the servo driving position.
     *
     * @param newval : an integer corresponding to immediately the servo driving position
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_position(newval: number): Promise<number>;
    /**
     * Returns the state of the RC servo motors.
     *
     * @return either YServo.ENABLED_FALSE or YServo.ENABLED_TRUE, according to the state of the RC servo motors
     *
     * On failure, throws an exception or returns YServo.ENABLED_INVALID.
     */
    get_enabled(): Promise<YServo.ENABLED>;
    /**
     * Stops or starts the RC servo motor.
     *
     * @param newval : either YServo.ENABLED_FALSE or YServo.ENABLED_TRUE
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_enabled(newval: YServo.ENABLED): Promise<number>;
    /**
     * Returns the current range of use of the servo.
     *
     * @return an integer corresponding to the current range of use of the servo
     *
     * On failure, throws an exception or returns YServo.RANGE_INVALID.
     */
    get_range(): Promise<number>;
    /**
     * Changes the range of use of the servo, specified in per cents.
     * A range of 100% corresponds to a standard control signal, that varies
     * from 1 [ms] to 2 [ms], When using a servo that supports a double range,
     * from 0.5 [ms] to 2.5 [ms], you can select a range of 200%.
     * Be aware that using a range higher than what is supported by the servo
     * is likely to damage the servo. Remember to call the matching module
     * saveToFlash() method, otherwise this call will have no effect.
     *
     * @param newval : an integer corresponding to the range of use of the servo, specified in per cents
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_range(newval: number): Promise<number>;
    /**
     * Returns the duration in microseconds of a neutral pulse for the servo.
     *
     * @return an integer corresponding to the duration in microseconds of a neutral pulse for the servo
     *
     * On failure, throws an exception or returns YServo.NEUTRAL_INVALID.
     */
    get_neutral(): Promise<number>;
    /**
     * Changes the duration of the pulse corresponding to the neutral position of the servo.
     * The duration is specified in microseconds, and the standard value is 1500 [us].
     * This setting makes it possible to shift the range of use of the servo.
     * Be aware that using a range higher than what is supported by the servo is
     * likely to damage the servo. Remember to call the matching module
     * saveToFlash() method, otherwise this call will have no effect.
     *
     * @param newval : an integer corresponding to the duration of the pulse corresponding to the neutral
     * position of the servo
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_neutral(newval: number): Promise<number>;
    get_move(): Promise<YServo.Move>;
    set_move(newval: YServo.Move): Promise<number>;
    /**
     * Performs a smooth move at constant speed toward a given position.
     *
     * @param target      : new position at the end of the move
     * @param ms_duration : total duration of the move, in milliseconds
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    move(target: number, ms_duration: number): Promise<number>;
    /**
     * Returns the servo position at device power up.
     *
     * @return an integer corresponding to the servo position at device power up
     *
     * On failure, throws an exception or returns YServo.POSITIONATPOWERON_INVALID.
     */
    get_positionAtPowerOn(): Promise<number>;
    /**
     * Configure the servo position at device power up. Remember to call the matching
     * module saveToFlash() method, otherwise this call will have no effect.
     *
     * @param newval : an integer
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_positionAtPowerOn(newval: number): Promise<number>;
    /**
     * Returns the servo signal generator state at power up.
     *
     * @return either YServo.ENABLEDATPOWERON_FALSE or YServo.ENABLEDATPOWERON_TRUE, according to the
     * servo signal generator state at power up
     *
     * On failure, throws an exception or returns YServo.ENABLEDATPOWERON_INVALID.
     */
    get_enabledAtPowerOn(): Promise<YServo.ENABLEDATPOWERON>;
    /**
     * Configure the servo signal generator state at power up. Remember to call the matching module saveToFlash()
     * method, otherwise this call will have no effect.
     *
     * @param newval : either YServo.ENABLEDATPOWERON_FALSE or YServo.ENABLEDATPOWERON_TRUE
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_enabledAtPowerOn(newval: YServo.ENABLEDATPOWERON): Promise<number>;
    /**
     * Retrieves a RC servo motor for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the RC servo motor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YServo.isOnline() to test if the RC servo motor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a RC servo motor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the RC servo motor, for instance
     *         SERVORC1.servo1.
     *
     * @return a YServo object allowing you to drive the RC servo motor.
     */
    static FindServo(func: string): YServo;
    /**
     * Retrieves a RC servo motor for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the RC servo motor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YServo.isOnline() to test if the RC servo motor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a RC servo motor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx : a YAPI context
     * @param func : a string that uniquely characterizes the RC servo motor, for instance
     *         SERVORC1.servo1.
     *
     * @return a YServo object allowing you to drive the RC servo motor.
     */
    static FindServoInContext(yctx: YAPIContext, func: string): YServo;
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
    registerValueCallback(callback: YServo.ValueCallback | null): Promise<number>;
    _invokeValueCallback(value: string): Promise<number>;
    /**
     * Continues the enumeration of RC servo motors started using yFirstServo().
     * Caution: You can't make any assumption about the returned RC servo motors order.
     * If you want to find a specific a RC servo motor, use Servo.findServo()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YServo object, corresponding to
     *         a RC servo motor currently online, or a null pointer
     *         if there are no more RC servo motors to enumerate.
     */
    nextServo(): YServo | null;
    /**
     * Starts the enumeration of RC servo motors currently accessible.
     * Use the method YServo.nextServo() to iterate on
     * next RC servo motors.
     *
     * @return a pointer to a YServo object, corresponding to
     *         the first RC servo motor currently online, or a null pointer
     *         if there are none.
     */
    static FirstServo(): YServo | null;
    /**
     * Starts the enumeration of RC servo motors currently accessible.
     * Use the method YServo.nextServo() to iterate on
     * next RC servo motors.
     *
     * @param yctx : a YAPI context.
     *
     * @return a pointer to a YServo object, corresponding to
     *         the first RC servo motor currently online, or a null pointer
     *         if there are none.
     */
    static FirstServoInContext(yctx: YAPIContext): YServo | null;
}
export declare namespace YServo {
    const enum ENABLED {
        FALSE = 0,
        TRUE = 1,
        INVALID = -1
    }
    interface Move {
        target?: number;
        ms?: number;
        moving?: number;
    }
    const enum ENABLEDATPOWERON {
        FALSE = 0,
        TRUE = 1,
        INVALID = -1
    }
    interface ValueCallback {
        (func: YServo, value: string): void;
    }
}
