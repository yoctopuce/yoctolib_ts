/*********************************************************************
 *
 *  $Id: yocto_servo.ts 43533 2021-01-25 16:33:41Z mvuilleu $
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

import { YAPI, YAPIContext, YErrorMsg, YFunction, YModule, YSensor, YDataLogger, YMeasure } from './yocto_api.js';

//--- (YServo definitions)
export const enum YServo_Enabled {
    FALSE = 0,
    TRUE = 1,
    INVALID = -1
}
export const enum YServo_EnabledAtPowerOn {
    FALSE = 0,
    TRUE = 1,
    INVALID = -1
}

class YServoMove
{
    public target: number = YAPI.INVALID_INT;
    public ms: number = YAPI.INVALID_INT;
    public moving: number = YAPI.INVALID_UINT;
}
export interface YServoValueCallback { (func: YServo, value: string): void }
//--- (end of YServo definitions)

//--- (YServo class start)
/**
 * YServo Class: RC servo motor control interface, available for instance in the Yocto-Servo
 *
 * The YServo class is designed to drive remote-control servo motors
 * outputs. This class allows you not only to move
 * a servo to a given position, but also to specify the time interval
 * in which the move should be performed. This makes it possible to
 * synchronize two servos involved in a same move.
 */
//--- (end of YServo class start)

export class YServo extends YFunction
{
    //--- (YServo attributes declaration)
    _className: string;
    _position: number = YServo.POSITION_INVALID;
    _enabled: YServo_Enabled = YServo.ENABLED_INVALID;
    _range: number = YServo.RANGE_INVALID;
    _neutral: number = YServo.NEUTRAL_INVALID;
    _move: YServoMove = new YServoMove();
    _positionAtPowerOn: number = YServo.POSITIONATPOWERON_INVALID;
    _enabledAtPowerOn: YServo_EnabledAtPowerOn = YServo.ENABLEDATPOWERON_INVALID;
    _valueCallbackServo: YServoValueCallback | null = null;

    // API symbols as object properties
    public readonly POSITION_INVALID: number = YAPI.INVALID_INT;
    public readonly ENABLED_FALSE: YServo_Enabled = YServo_Enabled.FALSE;
    public readonly ENABLED_TRUE: YServo_Enabled = YServo_Enabled.TRUE;
    public readonly ENABLED_INVALID: YServo_Enabled = YServo_Enabled.INVALID;
    public readonly RANGE_INVALID: number = YAPI.INVALID_UINT;
    public readonly NEUTRAL_INVALID: number = YAPI.INVALID_UINT;
    public readonly POSITIONATPOWERON_INVALID: number = YAPI.INVALID_INT;
    public readonly ENABLEDATPOWERON_FALSE: YServo_EnabledAtPowerOn = YServo_EnabledAtPowerOn.FALSE;
    public readonly ENABLEDATPOWERON_TRUE: YServo_EnabledAtPowerOn = YServo_EnabledAtPowerOn.TRUE;
    public readonly ENABLEDATPOWERON_INVALID: YServo_EnabledAtPowerOn = YServo_EnabledAtPowerOn.INVALID;

    // API symbols as static members
    public static readonly MOVE_INVALID: YServoMove = new YServoMove();
    public static readonly POSITION_INVALID: number = YAPI.INVALID_INT;
    public static readonly ENABLED_FALSE: YServo_Enabled = YServo_Enabled.FALSE;
    public static readonly ENABLED_TRUE: YServo_Enabled = YServo_Enabled.TRUE;
    public static readonly ENABLED_INVALID: YServo_Enabled = YServo_Enabled.INVALID;
    public static readonly RANGE_INVALID: number = YAPI.INVALID_UINT;
    public static readonly NEUTRAL_INVALID: number = YAPI.INVALID_UINT;
    public static readonly POSITIONATPOWERON_INVALID: number = YAPI.INVALID_INT;
    public static readonly ENABLEDATPOWERON_FALSE: YServo_EnabledAtPowerOn = YServo_EnabledAtPowerOn.FALSE;
    public static readonly ENABLEDATPOWERON_TRUE: YServo_EnabledAtPowerOn = YServo_EnabledAtPowerOn.TRUE;
    public static readonly ENABLEDATPOWERON_INVALID: YServo_EnabledAtPowerOn = YServo_EnabledAtPowerOn.INVALID;
    //--- (end of YServo attributes declaration)

//--- (YServo return codes)
//--- (end of YServo return codes)

    constructor(yapi: YAPIContext, func: string)
    {
        //--- (YServo constructor)
        super(yapi, func);
        this._className                  = 'Servo';
        //--- (end of YServo constructor)
    }

    //--- (YServo implementation)

    imm_parseAttr(name: string, val: any)
    {
        switch(name) {
        case 'position':
            this._position = <number> <number> val;
            return 1;
        case 'enabled':
            this._enabled = <YServo_Enabled> <number> val;
            return 1;
        case 'range':
            this._range = <number> <number> val;
            return 1;
        case 'neutral':
            this._neutral = <number> <number> val;
            return 1;
        case 'move':
            this._move = <YServoMove> val;
            return 1;
        case 'positionAtPowerOn':
            this._positionAtPowerOn = <number> <number> val;
            return 1;
        case 'enabledAtPowerOn':
            this._enabledAtPowerOn = <YServo_EnabledAtPowerOn> <number> val;
            return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Returns the current servo position.
     *
     * @return an integer corresponding to the current servo position
     *
     * On failure, throws an exception or returns YServo.POSITION_INVALID.
     */
    async get_position(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YServo.POSITION_INVALID;
            }
        }
        res = this._position;
        return res;
    }

    /**
     * Changes immediately the servo driving position.
     *
     * @param newval : an integer corresponding to immediately the servo driving position
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_position(newval: number): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('position',rest_val);
    }

    /**
     * Returns the state of the RC servo motors.
     *
     * @return either YServo.ENABLED_FALSE or YServo.ENABLED_TRUE, according to the state of the RC servo motors
     *
     * On failure, throws an exception or returns YServo.ENABLED_INVALID.
     */
    async get_enabled(): Promise<YServo_Enabled>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YServo.ENABLED_INVALID;
            }
        }
        res = this._enabled;
        return res;
    }

    /**
     * Stops or starts the RC servo motor.
     *
     * @param newval : either YServo.ENABLED_FALSE or YServo.ENABLED_TRUE
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_enabled(newval: YServo_Enabled): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('enabled',rest_val);
    }

    /**
     * Returns the current range of use of the servo.
     *
     * @return an integer corresponding to the current range of use of the servo
     *
     * On failure, throws an exception or returns YServo.RANGE_INVALID.
     */
    async get_range(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YServo.RANGE_INVALID;
            }
        }
        res = this._range;
        return res;
    }

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
    async set_range(newval: number): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('range',rest_val);
    }

    /**
     * Returns the duration in microseconds of a neutral pulse for the servo.
     *
     * @return an integer corresponding to the duration in microseconds of a neutral pulse for the servo
     *
     * On failure, throws an exception or returns YServo.NEUTRAL_INVALID.
     */
    async get_neutral(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YServo.NEUTRAL_INVALID;
            }
        }
        res = this._neutral;
        return res;
    }

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
    async set_neutral(newval: number): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('neutral',rest_val);
    }

    async get_move(): Promise<YServoMove>
    {
        let res: YServoMove;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YServo.MOVE_INVALID;
            }
        }
        res = this._move;
        return res;
    }

    async set_move(newval: YServoMove): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval.target)+':'+String(newval.ms);
        return await this._setAttr('move',rest_val);
    }

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
    async move(target: number,ms_duration: number): Promise<number>
    {
        let rest_val: string;
        rest_val = String(target)+':'+String(ms_duration);
        return await this._setAttr('move',rest_val);
    }

    /**
     * Returns the servo position at device power up.
     *
     * @return an integer corresponding to the servo position at device power up
     *
     * On failure, throws an exception or returns YServo.POSITIONATPOWERON_INVALID.
     */
    async get_positionAtPowerOn(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YServo.POSITIONATPOWERON_INVALID;
            }
        }
        res = this._positionAtPowerOn;
        return res;
    }

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
    async set_positionAtPowerOn(newval: number): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('positionAtPowerOn',rest_val);
    }

    /**
     * Returns the servo signal generator state at power up.
     *
     * @return either YServo.ENABLEDATPOWERON_FALSE or YServo.ENABLEDATPOWERON_TRUE, according to the
     * servo signal generator state at power up
     *
     * On failure, throws an exception or returns YServo.ENABLEDATPOWERON_INVALID.
     */
    async get_enabledAtPowerOn(): Promise<YServo_EnabledAtPowerOn>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YServo.ENABLEDATPOWERON_INVALID;
            }
        }
        res = this._enabledAtPowerOn;
        return res;
    }

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
    async set_enabledAtPowerOn(newval: YServo_EnabledAtPowerOn): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('enabledAtPowerOn',rest_val);
    }

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
    static FindServo(func: string): YServo
    {
        let obj: YServo;
        obj = <YServo> YFunction._FindFromCache('Servo', func);
        if (obj == null) {
            obj = new YServo(YAPI, func);
            YFunction._AddToCache('Servo',  func, obj);
        }
        return obj;
    }

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
    static FindServoInContext(yctx: YAPIContext, func: string): YServo
    {
        let obj: YServo;
        obj = <YServo> YFunction._FindFromCacheInContext(yctx,  'Servo', func);
        if (obj == null) {
            obj = new YServo(yctx, func);
            YFunction._AddToCache('Servo',  func, obj);
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
    async registerValueCallback(callback: YServoValueCallback | null): Promise<number>
    {
        let val: string;
        if (callback != null) {
            await YFunction._UpdateValueCallbackList(this, true);
        } else {
            await YFunction._UpdateValueCallbackList(this, false);
        }
        this._valueCallbackServo = callback;
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
        if (this._valueCallbackServo != null) {
            try {
                await this._valueCallbackServo(this, value);
            } catch (e) {
                this._yapi.imm_log('Exception in valueCallback:', e);
            }
        } else {
            super._invokeValueCallback(value);
        }
        return 0;
    }

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
    nextServo(): YServo | null
    {
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI.SUCCESS) return null;
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, <string> resolve.result);
        if(next_hwid == null) return null;
        return YServo.FindServoInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of RC servo motors currently accessible.
     * Use the method YServo.nextServo() to iterate on
     * next RC servo motors.
     *
     * @return a pointer to a YServo object, corresponding to
     *         the first RC servo motor currently online, or a null pointer
     *         if there are none.
     */
    static FirstServo(): YServo | null
    {
        let next_hwid = YAPI.imm_getFirstHardwareId('Servo');
        if(next_hwid == null) return null;
        return YServo.FindServo(next_hwid);
    }

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
    static FirstServoInContext(yctx: YAPIContext): YServo | null
    {
        let next_hwid = yctx.imm_getFirstHardwareId('Servo');
        if(next_hwid == null) return null;
        return YServo.FindServoInContext(yctx, next_hwid);
    }

    //--- (end of YServo implementation)
}

