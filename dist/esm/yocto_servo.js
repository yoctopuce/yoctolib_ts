/*********************************************************************
 *
 *  $Id: svn_id $
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
import { YAPI, YFunction } from './yocto_api.js';
class YServoMove {
    constructor() {
        this.target = YAPI.INVALID_INT;
        this.ms = YAPI.INVALID_INT;
        this.moving = YAPI.INVALID_UINT;
    }
}
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
export class YServo extends YFunction {
    //--- (end of YServo attributes declaration)
    //--- (YServo return codes)
    //--- (end of YServo return codes)
    constructor(yapi, func) {
        //--- (YServo constructor)
        super(yapi, func);
        this._position = YServo.POSITION_INVALID;
        this._enabled = YServo.ENABLED_INVALID;
        this._range = YServo.RANGE_INVALID;
        this._neutral = YServo.NEUTRAL_INVALID;
        this._move = new YServoMove();
        this._positionAtPowerOn = YServo.POSITIONATPOWERON_INVALID;
        this._enabledAtPowerOn = YServo.ENABLEDATPOWERON_INVALID;
        this._valueCallbackServo = null;
        // API symbols as object properties
        this.POSITION_INVALID = YAPI.INVALID_INT;
        this.ENABLED_FALSE = 0 /* FALSE */;
        this.ENABLED_TRUE = 1 /* TRUE */;
        this.ENABLED_INVALID = -1 /* INVALID */;
        this.RANGE_INVALID = YAPI.INVALID_UINT;
        this.NEUTRAL_INVALID = YAPI.INVALID_UINT;
        this.POSITIONATPOWERON_INVALID = YAPI.INVALID_INT;
        this.ENABLEDATPOWERON_FALSE = 0 /* FALSE */;
        this.ENABLEDATPOWERON_TRUE = 1 /* TRUE */;
        this.ENABLEDATPOWERON_INVALID = -1 /* INVALID */;
        this._className = 'Servo';
        //--- (end of YServo constructor)
    }
    //--- (YServo implementation)
    imm_parseAttr(name, val) {
        switch (name) {
            case 'position':
                this._position = val;
                return 1;
            case 'enabled':
                this._enabled = val;
                return 1;
            case 'range':
                this._range = val;
                return 1;
            case 'neutral':
                this._neutral = val;
                return 1;
            case 'move':
                this._move = val;
                return 1;
            case 'positionAtPowerOn':
                this._positionAtPowerOn = val;
                return 1;
            case 'enabledAtPowerOn':
                this._enabledAtPowerOn = val;
                return 1;
        }
        return super.imm_parseAttr(name, val);
    }
    /**
     * Returns the current servo position.
     *
     * @return an integer corresponding to the current servo position
     *
     * On failure, throws an exception or returns Y_POSITION_INVALID.
     */
    async get_position() {
        let res;
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
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_position(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('position', rest_val);
    }
    /**
     * Returns the state of the RC servo motors.
     *
     * @return either Y_ENABLED_FALSE or Y_ENABLED_TRUE, according to the state of the RC servo motors
     *
     * On failure, throws an exception or returns Y_ENABLED_INVALID.
     */
    async get_enabled() {
        let res;
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
     * @param newval : either Y_ENABLED_FALSE or Y_ENABLED_TRUE
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_enabled(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('enabled', rest_val);
    }
    /**
     * Returns the current range of use of the servo.
     *
     * @return an integer corresponding to the current range of use of the servo
     *
     * On failure, throws an exception or returns Y_RANGE_INVALID.
     */
    async get_range() {
        let res;
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
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_range(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('range', rest_val);
    }
    /**
     * Returns the duration in microseconds of a neutral pulse for the servo.
     *
     * @return an integer corresponding to the duration in microseconds of a neutral pulse for the servo
     *
     * On failure, throws an exception or returns Y_NEUTRAL_INVALID.
     */
    async get_neutral() {
        let res;
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
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_neutral(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('neutral', rest_val);
    }
    async get_move() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YServo.MOVE_INVALID;
            }
        }
        res = this._move;
        return res;
    }
    async set_move(newval) {
        let rest_val;
        rest_val = String(newval.target) + ':' + String(newval.ms);
        return await this._setAttr('move', rest_val);
    }
    /**
     * Performs a smooth move at constant speed toward a given position.
     *
     * @param target      : new position at the end of the move
     * @param ms_duration : total duration of the move, in milliseconds
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async move(target, ms_duration) {
        let rest_val;
        rest_val = String(target) + ':' + String(ms_duration);
        return await this._setAttr('move', rest_val);
    }
    /**
     * Returns the servo position at device power up.
     *
     * @return an integer corresponding to the servo position at device power up
     *
     * On failure, throws an exception or returns Y_POSITIONATPOWERON_INVALID.
     */
    async get_positionAtPowerOn() {
        let res;
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
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_positionAtPowerOn(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('positionAtPowerOn', rest_val);
    }
    /**
     * Returns the servo signal generator state at power up.
     *
     * @return either Y_ENABLEDATPOWERON_FALSE or Y_ENABLEDATPOWERON_TRUE, according to the servo signal
     * generator state at power up
     *
     * On failure, throws an exception or returns Y_ENABLEDATPOWERON_INVALID.
     */
    async get_enabledAtPowerOn() {
        let res;
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
     * @param newval : either Y_ENABLEDATPOWERON_FALSE or Y_ENABLEDATPOWERON_TRUE
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_enabledAtPowerOn(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('enabledAtPowerOn', rest_val);
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
     * Use the method YServo.isOnline() to test if $THEFUNCTION$ is
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
     * @return a YServo object allowing you to drive $THEFUNCTION$.
     */
    static FindServo(func) {
        let obj;
        obj = YFunction._FindFromCache('Servo', func);
        if (obj == null) {
            obj = new YServo(YAPI, func);
            YFunction._AddToCache('Servo', func, obj);
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
     * Use the method YServo.isOnline() to test if $THEFUNCTION$ is
     * indeed online at a given time. In case of ambiguity when looking for
     * $AFUNCTION$ by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx : a YAPI context
     * @param func : a string that uniquely characterizes $THEFUNCTION$, for instance
     *         $FULLHARDWAREID$.
     *
     * @return a YServo object allowing you to drive $THEFUNCTION$.
     */
    static FindServoInContext(yctx, func) {
        let obj;
        obj = YFunction._FindFromCacheInContext(yctx, 'Servo', func);
        if (obj == null) {
            obj = new YServo(yctx, func);
            YFunction._AddToCache('Servo', func, obj);
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
    async registerValueCallback(callback) {
        let val;
        if (callback != null) {
            await YFunction._UpdateValueCallbackList(this, true);
        }
        else {
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
    async _invokeValueCallback(value) {
        if (this._valueCallbackServo != null) {
            try {
                await this._valueCallbackServo(this, value);
            }
            catch (e) {
                this._yapi.imm_log('Exception in valueCallback:', e);
            }
        }
        else {
            super._invokeValueCallback(value);
        }
        return 0;
    }
    /**
     * Returns the next Servo
     *
     * @returns {YServo}
     */
    nextServo() {
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != YAPI.SUCCESS)
            return null;
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if (next_hwid == null)
            return null;
        return YServo.FindServoInContext(this._yapi, next_hwid);
    }
    /**
     * Retrieves the first Servo in a YAPI context
     *
     * @returns {YServo}
     */
    static FirstServo() {
        let next_hwid = YAPI.imm_getFirstHardwareId('Servo');
        if (next_hwid == null)
            return null;
        return YServo.FindServo(next_hwid);
    }
    /**
     * Retrieves the first Servo in a given context
     *
     * @param yctx {YAPIContext}
     *
     * @returns {YServo}
     */
    static FirstServoInContext(yctx) {
        let next_hwid = yctx.imm_getFirstHardwareId('Servo');
        if (next_hwid == null)
            return null;
        return YServo.FindServoInContext(yctx, next_hwid);
    }
}
// API symbols as static members
YServo.MOVE_INVALID = new YServoMove();
YServo.POSITION_INVALID = YAPI.INVALID_INT;
YServo.ENABLED_FALSE = 0 /* FALSE */;
YServo.ENABLED_TRUE = 1 /* TRUE */;
YServo.ENABLED_INVALID = -1 /* INVALID */;
YServo.RANGE_INVALID = YAPI.INVALID_UINT;
YServo.NEUTRAL_INVALID = YAPI.INVALID_UINT;
YServo.POSITIONATPOWERON_INVALID = YAPI.INVALID_INT;
YServo.ENABLEDATPOWERON_FALSE = 0 /* FALSE */;
YServo.ENABLEDATPOWERON_TRUE = 1 /* TRUE */;
YServo.ENABLEDATPOWERON_INVALID = -1 /* INVALID */;
//# sourceMappingURL=yocto_servo.js.map