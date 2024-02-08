/*********************************************************************
 *
 *  $Id: yocto_steppermotor.ts 55359 2023-06-28 09:25:04Z seb $
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

import { YAPI, YAPIContext, YErrorMsg, YFunction, YModule, YSensor, YDataLogger, YMeasure } from './yocto_api.js';

//--- (YStepperMotor class start)
/**
 * YStepperMotor Class: stepper motor control interface
 *
 * The YStepperMotor class allows you to drive a stepper motor.
 */
//--- (end of YStepperMotor class start)

export class YStepperMotor extends YFunction
{
    //--- (YStepperMotor attributes declaration)
    _className: string;
    _motorState: YStepperMotor.MOTORSTATE = YStepperMotor.MOTORSTATE_INVALID;
    _diags: number = YStepperMotor.DIAGS_INVALID;
    _stepPos: number = YStepperMotor.STEPPOS_INVALID;
    _speed: number = YStepperMotor.SPEED_INVALID;
    _pullinSpeed: number = YStepperMotor.PULLINSPEED_INVALID;
    _maxAccel: number = YStepperMotor.MAXACCEL_INVALID;
    _maxSpeed: number = YStepperMotor.MAXSPEED_INVALID;
    _stepping: YStepperMotor.STEPPING = YStepperMotor.STEPPING_INVALID;
    _overcurrent: number = YStepperMotor.OVERCURRENT_INVALID;
    _tCurrStop: number = YStepperMotor.TCURRSTOP_INVALID;
    _tCurrRun: number = YStepperMotor.TCURRRUN_INVALID;
    _alertMode: string = YStepperMotor.ALERTMODE_INVALID;
    _auxMode: string = YStepperMotor.AUXMODE_INVALID;
    _auxSignal: number = YStepperMotor.AUXSIGNAL_INVALID;
    _command: string = YStepperMotor.COMMAND_INVALID;
    _valueCallbackStepperMotor: YStepperMotor.ValueCallback | null = null;

    // API symbols as object properties
    public readonly MOTORSTATE_ABSENT: YStepperMotor.MOTORSTATE = 0;
    public readonly MOTORSTATE_ALERT: YStepperMotor.MOTORSTATE = 1;
    public readonly MOTORSTATE_HI_Z: YStepperMotor.MOTORSTATE = 2;
    public readonly MOTORSTATE_STOP: YStepperMotor.MOTORSTATE = 3;
    public readonly MOTORSTATE_RUN: YStepperMotor.MOTORSTATE = 4;
    public readonly MOTORSTATE_BATCH: YStepperMotor.MOTORSTATE = 5;
    public readonly MOTORSTATE_INVALID: YStepperMotor.MOTORSTATE = -1;
    public readonly DIAGS_INVALID: number = YAPI.INVALID_UINT;
    public readonly STEPPOS_INVALID: number = YAPI.INVALID_DOUBLE;
    public readonly SPEED_INVALID: number = YAPI.INVALID_DOUBLE;
    public readonly PULLINSPEED_INVALID: number = YAPI.INVALID_DOUBLE;
    public readonly MAXACCEL_INVALID: number = YAPI.INVALID_DOUBLE;
    public readonly MAXSPEED_INVALID: number = YAPI.INVALID_DOUBLE;
    public readonly STEPPING_MICROSTEP16: YStepperMotor.STEPPING = 0;
    public readonly STEPPING_MICROSTEP8: YStepperMotor.STEPPING = 1;
    public readonly STEPPING_MICROSTEP4: YStepperMotor.STEPPING = 2;
    public readonly STEPPING_HALFSTEP: YStepperMotor.STEPPING = 3;
    public readonly STEPPING_FULLSTEP: YStepperMotor.STEPPING = 4;
    public readonly STEPPING_INVALID: YStepperMotor.STEPPING = -1;
    public readonly OVERCURRENT_INVALID: number = YAPI.INVALID_UINT;
    public readonly TCURRSTOP_INVALID: number = YAPI.INVALID_UINT;
    public readonly TCURRRUN_INVALID: number = YAPI.INVALID_UINT;
    public readonly ALERTMODE_INVALID: string = YAPI.INVALID_STRING;
    public readonly AUXMODE_INVALID: string = YAPI.INVALID_STRING;
    public readonly AUXSIGNAL_INVALID: number = YAPI.INVALID_INT;
    public readonly COMMAND_INVALID: string = YAPI.INVALID_STRING;

    // API symbols as static members
    public static readonly MOTORSTATE_ABSENT: YStepperMotor.MOTORSTATE = 0;
    public static readonly MOTORSTATE_ALERT: YStepperMotor.MOTORSTATE = 1;
    public static readonly MOTORSTATE_HI_Z: YStepperMotor.MOTORSTATE = 2;
    public static readonly MOTORSTATE_STOP: YStepperMotor.MOTORSTATE = 3;
    public static readonly MOTORSTATE_RUN: YStepperMotor.MOTORSTATE = 4;
    public static readonly MOTORSTATE_BATCH: YStepperMotor.MOTORSTATE = 5;
    public static readonly MOTORSTATE_INVALID: YStepperMotor.MOTORSTATE = -1;
    public static readonly DIAGS_INVALID: number = YAPI.INVALID_UINT;
    public static readonly STEPPOS_INVALID: number = YAPI.INVALID_DOUBLE;
    public static readonly SPEED_INVALID: number = YAPI.INVALID_DOUBLE;
    public static readonly PULLINSPEED_INVALID: number = YAPI.INVALID_DOUBLE;
    public static readonly MAXACCEL_INVALID: number = YAPI.INVALID_DOUBLE;
    public static readonly MAXSPEED_INVALID: number = YAPI.INVALID_DOUBLE;
    public static readonly STEPPING_MICROSTEP16: YStepperMotor.STEPPING = 0;
    public static readonly STEPPING_MICROSTEP8: YStepperMotor.STEPPING = 1;
    public static readonly STEPPING_MICROSTEP4: YStepperMotor.STEPPING = 2;
    public static readonly STEPPING_HALFSTEP: YStepperMotor.STEPPING = 3;
    public static readonly STEPPING_FULLSTEP: YStepperMotor.STEPPING = 4;
    public static readonly STEPPING_INVALID: YStepperMotor.STEPPING = -1;
    public static readonly OVERCURRENT_INVALID: number = YAPI.INVALID_UINT;
    public static readonly TCURRSTOP_INVALID: number = YAPI.INVALID_UINT;
    public static readonly TCURRRUN_INVALID: number = YAPI.INVALID_UINT;
    public static readonly ALERTMODE_INVALID: string = YAPI.INVALID_STRING;
    public static readonly AUXMODE_INVALID: string = YAPI.INVALID_STRING;
    public static readonly AUXSIGNAL_INVALID: number = YAPI.INVALID_INT;
    public static readonly COMMAND_INVALID: string = YAPI.INVALID_STRING;
    //--- (end of YStepperMotor attributes declaration)

    constructor(yapi: YAPIContext, func: string)
    {
        //--- (YStepperMotor constructor)
        super(yapi, func);
        this._className                  = 'StepperMotor';
        //--- (end of YStepperMotor constructor)
    }

    //--- (YStepperMotor implementation)

    imm_parseAttr(name: string, val: any): number
    {
        switch (name) {
        case 'motorState':
            this._motorState = <YStepperMotor.MOTORSTATE> <number> val;
            return 1;
        case 'diags':
            this._diags = <number> <number> val;
            return 1;
        case 'stepPos':
            this._stepPos = <number> <number> val / 16.0;
            return 1;
        case 'speed':
            this._speed = <number> Math.round(<number>val / 65.536) / 1000.0;
            return 1;
        case 'pullinSpeed':
            this._pullinSpeed = <number> Math.round(<number>val / 65.536) / 1000.0;
            return 1;
        case 'maxAccel':
            this._maxAccel = <number> Math.round(<number>val / 65.536) / 1000.0;
            return 1;
        case 'maxSpeed':
            this._maxSpeed = <number> Math.round(<number>val / 65.536) / 1000.0;
            return 1;
        case 'stepping':
            this._stepping = <YStepperMotor.STEPPING> <number> val;
            return 1;
        case 'overcurrent':
            this._overcurrent = <number> <number> val;
            return 1;
        case 'tCurrStop':
            this._tCurrStop = <number> <number> val;
            return 1;
        case 'tCurrRun':
            this._tCurrRun = <number> <number> val;
            return 1;
        case 'alertMode':
            this._alertMode = <string> <string> val;
            return 1;
        case 'auxMode':
            this._auxMode = <string> <string> val;
            return 1;
        case 'auxSignal':
            this._auxSignal = <number> <number> val;
            return 1;
        case 'command':
            this._command = <string> <string> val;
            return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Returns the motor working state.
     *
     * @return a value among YStepperMotor.MOTORSTATE_ABSENT, YStepperMotor.MOTORSTATE_ALERT,
     * YStepperMotor.MOTORSTATE_HI_Z, YStepperMotor.MOTORSTATE_STOP, YStepperMotor.MOTORSTATE_RUN and
     * YStepperMotor.MOTORSTATE_BATCH corresponding to the motor working state
     *
     * On failure, throws an exception or returns YStepperMotor.MOTORSTATE_INVALID.
     */
    async get_motorState(): Promise<YStepperMotor.MOTORSTATE>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YStepperMotor.MOTORSTATE_INVALID;
            }
        }
        res = this._motorState;
        return res;
    }

    /**
     * Returns the stepper motor controller diagnostics, as a bitmap.
     *
     * @return an integer corresponding to the stepper motor controller diagnostics, as a bitmap
     *
     * On failure, throws an exception or returns YStepperMotor.DIAGS_INVALID.
     */
    async get_diags(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YStepperMotor.DIAGS_INVALID;
            }
        }
        res = this._diags;
        return res;
    }

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
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_stepPos(newval: number): Promise<number>
    {
        let rest_val: string;
        rest_val = String(Math.round(<number>newval * 100.0)/100.0);
        return await this._setAttr('stepPos', rest_val);
    }

    /**
     * Returns the current logical motor position, measured in steps.
     * The value may include a fractional part when micro-stepping is in use.
     *
     * @return a floating point number corresponding to the current logical motor position, measured in steps
     *
     * On failure, throws an exception or returns YStepperMotor.STEPPOS_INVALID.
     */
    async get_stepPos(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YStepperMotor.STEPPOS_INVALID;
            }
        }
        res = this._stepPos;
        return res;
    }

    /**
     * Returns current motor speed, measured in steps per second.
     * To change speed, use method changeSpeed().
     *
     * @return a floating point number corresponding to current motor speed, measured in steps per second
     *
     * On failure, throws an exception or returns YStepperMotor.SPEED_INVALID.
     */
    async get_speed(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YStepperMotor.SPEED_INVALID;
            }
        }
        res = this._speed;
        return res;
    }

    /**
     * Changes the motor speed immediately reachable from stop state, measured in steps per second.
     *
     * @param newval : a floating point number corresponding to the motor speed immediately reachable from
     * stop state, measured in steps per second
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_pullinSpeed(newval: number): Promise<number>
    {
        let rest_val: string;
        rest_val = String(Math.round(newval * 65536.0));
        return await this._setAttr('pullinSpeed', rest_val);
    }

    /**
     * Returns the motor speed immediately reachable from stop state, measured in steps per second.
     *
     * @return a floating point number corresponding to the motor speed immediately reachable from stop
     * state, measured in steps per second
     *
     * On failure, throws an exception or returns YStepperMotor.PULLINSPEED_INVALID.
     */
    async get_pullinSpeed(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YStepperMotor.PULLINSPEED_INVALID;
            }
        }
        res = this._pullinSpeed;
        return res;
    }

    /**
     * Changes the maximal motor acceleration, measured in steps per second^2.
     *
     * @param newval : a floating point number corresponding to the maximal motor acceleration, measured
     * in steps per second^2
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_maxAccel(newval: number): Promise<number>
    {
        let rest_val: string;
        rest_val = String(Math.round(newval * 65536.0));
        return await this._setAttr('maxAccel', rest_val);
    }

    /**
     * Returns the maximal motor acceleration, measured in steps per second^2.
     *
     * @return a floating point number corresponding to the maximal motor acceleration, measured in steps per second^2
     *
     * On failure, throws an exception or returns YStepperMotor.MAXACCEL_INVALID.
     */
    async get_maxAccel(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YStepperMotor.MAXACCEL_INVALID;
            }
        }
        res = this._maxAccel;
        return res;
    }

    /**
     * Changes the maximal motor speed, measured in steps per second.
     *
     * @param newval : a floating point number corresponding to the maximal motor speed, measured in steps per second
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_maxSpeed(newval: number): Promise<number>
    {
        let rest_val: string;
        rest_val = String(Math.round(newval * 65536.0));
        return await this._setAttr('maxSpeed', rest_val);
    }

    /**
     * Returns the maximal motor speed, measured in steps per second.
     *
     * @return a floating point number corresponding to the maximal motor speed, measured in steps per second
     *
     * On failure, throws an exception or returns YStepperMotor.MAXSPEED_INVALID.
     */
    async get_maxSpeed(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YStepperMotor.MAXSPEED_INVALID;
            }
        }
        res = this._maxSpeed;
        return res;
    }

    /**
     * Returns the stepping mode used to drive the motor.
     *
     * @return a value among YStepperMotor.STEPPING_MICROSTEP16, YStepperMotor.STEPPING_MICROSTEP8,
     * YStepperMotor.STEPPING_MICROSTEP4, YStepperMotor.STEPPING_HALFSTEP and
     * YStepperMotor.STEPPING_FULLSTEP corresponding to the stepping mode used to drive the motor
     *
     * On failure, throws an exception or returns YStepperMotor.STEPPING_INVALID.
     */
    async get_stepping(): Promise<YStepperMotor.STEPPING>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YStepperMotor.STEPPING_INVALID;
            }
        }
        res = this._stepping;
        return res;
    }

    /**
     * Changes the stepping mode used to drive the motor.
     *
     * @param newval : a value among YStepperMotor.STEPPING_MICROSTEP16,
     * YStepperMotor.STEPPING_MICROSTEP8, YStepperMotor.STEPPING_MICROSTEP4,
     * YStepperMotor.STEPPING_HALFSTEP and YStepperMotor.STEPPING_FULLSTEP corresponding to the stepping
     * mode used to drive the motor
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_stepping(newval: YStepperMotor.STEPPING): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('stepping', rest_val);
    }

    /**
     * Returns the overcurrent alert and emergency stop threshold, measured in mA.
     *
     * @return an integer corresponding to the overcurrent alert and emergency stop threshold, measured in mA
     *
     * On failure, throws an exception or returns YStepperMotor.OVERCURRENT_INVALID.
     */
    async get_overcurrent(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YStepperMotor.OVERCURRENT_INVALID;
            }
        }
        res = this._overcurrent;
        return res;
    }

    /**
     * Changes the overcurrent alert and emergency stop threshold, measured in mA.
     *
     * @param newval : an integer corresponding to the overcurrent alert and emergency stop threshold, measured in mA
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_overcurrent(newval: number): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('overcurrent', rest_val);
    }

    /**
     * Returns the torque regulation current when the motor is stopped, measured in mA.
     *
     * @return an integer corresponding to the torque regulation current when the motor is stopped, measured in mA
     *
     * On failure, throws an exception or returns YStepperMotor.TCURRSTOP_INVALID.
     */
    async get_tCurrStop(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YStepperMotor.TCURRSTOP_INVALID;
            }
        }
        res = this._tCurrStop;
        return res;
    }

    /**
     * Changes the torque regulation current when the motor is stopped, measured in mA.
     *
     * @param newval : an integer corresponding to the torque regulation current when the motor is
     * stopped, measured in mA
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_tCurrStop(newval: number): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('tCurrStop', rest_val);
    }

    /**
     * Returns the torque regulation current when the motor is running, measured in mA.
     *
     * @return an integer corresponding to the torque regulation current when the motor is running, measured in mA
     *
     * On failure, throws an exception or returns YStepperMotor.TCURRRUN_INVALID.
     */
    async get_tCurrRun(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YStepperMotor.TCURRRUN_INVALID;
            }
        }
        res = this._tCurrRun;
        return res;
    }

    /**
     * Changes the torque regulation current when the motor is running, measured in mA.
     *
     * @param newval : an integer corresponding to the torque regulation current when the motor is
     * running, measured in mA
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_tCurrRun(newval: number): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('tCurrRun', rest_val);
    }

    async get_alertMode(): Promise<string>
    {
        let res: string;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YStepperMotor.ALERTMODE_INVALID;
            }
        }
        res = this._alertMode;
        return res;
    }

    async set_alertMode(newval: string): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('alertMode', rest_val);
    }

    async get_auxMode(): Promise<string>
    {
        let res: string;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YStepperMotor.AUXMODE_INVALID;
            }
        }
        res = this._auxMode;
        return res;
    }

    async set_auxMode(newval: string): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('auxMode', rest_val);
    }

    /**
     * Returns the current value of the signal generated on the auxiliary output.
     *
     * @return an integer corresponding to the current value of the signal generated on the auxiliary output
     *
     * On failure, throws an exception or returns YStepperMotor.AUXSIGNAL_INVALID.
     */
    async get_auxSignal(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YStepperMotor.AUXSIGNAL_INVALID;
            }
        }
        res = this._auxSignal;
        return res;
    }

    /**
     * Changes the value of the signal generated on the auxiliary output.
     * Acceptable values depend on the auxiliary output signal type configured.
     *
     * @param newval : an integer corresponding to the value of the signal generated on the auxiliary output
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_auxSignal(newval: number): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('auxSignal', rest_val);
    }

    async get_command(): Promise<string>
    {
        let res: string;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YStepperMotor.COMMAND_INVALID;
            }
        }
        res = this._command;
        return res;
    }

    async set_command(newval: string): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('command', rest_val);
    }

    /**
     * Retrieves a stepper motor for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the stepper motor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YStepperMotor.isOnline() to test if the stepper motor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a stepper motor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the stepper motor, for instance
     *         MyDevice.stepperMotor1.
     *
     * @return a YStepperMotor object allowing you to drive the stepper motor.
     */
    static FindStepperMotor(func: string): YStepperMotor
    {
        let obj: YStepperMotor | null;
        obj = <YStepperMotor> YFunction._FindFromCache('StepperMotor', func);
        if (obj == null) {
            obj = new YStepperMotor(YAPI, func);
            YFunction._AddToCache('StepperMotor',  func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a stepper motor for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the stepper motor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YStepperMotor.isOnline() to test if the stepper motor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a stepper motor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx : a YAPI context
     * @param func : a string that uniquely characterizes the stepper motor, for instance
     *         MyDevice.stepperMotor1.
     *
     * @return a YStepperMotor object allowing you to drive the stepper motor.
     */
    static FindStepperMotorInContext(yctx: YAPIContext, func: string): YStepperMotor
    {
        let obj: YStepperMotor | null;
        obj = <YStepperMotor> YFunction._FindFromCacheInContext(yctx,  'StepperMotor', func);
        if (obj == null) {
            obj = new YStepperMotor(yctx, func);
            YFunction._AddToCache('StepperMotor',  func, obj);
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
    async registerValueCallback(callback: YStepperMotor.ValueCallback | null): Promise<number>
    {
        let val: string;
        if (callback != null) {
            await YFunction._UpdateValueCallbackList(this, true);
        } else {
            await YFunction._UpdateValueCallbackList(this, false);
        }
        this._valueCallbackStepperMotor = callback;
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
        if (this._valueCallbackStepperMotor != null) {
            try {
                await this._valueCallbackStepperMotor(this, value);
            } catch (e) {
                this._yapi.imm_log('Exception in valueCallback:', e);
            }
        } else {
            await super._invokeValueCallback(value);
        }
        return 0;
    }

    async sendCommand(command: string): Promise<number>
    {
        let id: string;
        let url: string;
        let retBin: Uint8Array;
        let res: number;
        id = await this.get_functionId();
        id = (id).substr(12, 1);
        url = 'cmd.txt?' + id + '=' + command;
        //may throw an exception
        retBin = await this._download(url);
        res = retBin[0];
        if (res < 58) {
            if (!(res == 48)) {
                return this._throw(this._yapi.DEVICE_BUSY, 'Motor command pipeline is full, try again later', this._yapi.DEVICE_BUSY);
            }
        } else {
            if (!(res == 48)) {
                return this._throw(this._yapi.IO_ERROR, 'Motor command failed permanently', this._yapi.IO_ERROR);
            }
        }
        return this._yapi.SUCCESS;
    }

    /**
     * Reinitialize the controller and clear all alert flags.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    async reset(): Promise<number>
    {
        return await this.set_command('Z');
    }

    /**
     * Starts the motor backward at the specified speed, to search for the motor home position.
     *
     * @param speed : desired speed, in steps per second.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    async findHomePosition(speed: number): Promise<number>
    {
        return await this.sendCommand('H' + String(Math.round(<number> Math.round(1000*speed))));
    }

    /**
     * Starts the motor at a given speed. The time needed to reach the requested speed
     * will depend on the acceleration parameters configured for the motor.
     *
     * @param speed : desired speed, in steps per second. The minimal non-zero speed
     *         is 0.001 pulse per second.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    async changeSpeed(speed: number): Promise<number>
    {
        return await this.sendCommand('R' + String(Math.round(<number> Math.round(1000*speed))));
    }

    /**
     * Starts the motor to reach a given absolute position. The time needed to reach the requested
     * position will depend on the acceleration and max speed parameters configured for
     * the motor.
     *
     * @param absPos : absolute position, measured in steps from the origin.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    async moveTo(absPos: number): Promise<number>
    {
        return await this.sendCommand('M' + String(Math.round(<number> Math.round(16*absPos))));
    }

    /**
     * Starts the motor to reach a given relative position. The time needed to reach the requested
     * position will depend on the acceleration and max speed parameters configured for
     * the motor.
     *
     * @param relPos : relative position, measured in steps from the current position.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    async moveRel(relPos: number): Promise<number>
    {
        return await this.sendCommand('m' + String(Math.round(<number> Math.round(16*relPos))));
    }

    /**
     * Starts the motor to reach a given relative position, keeping the speed under the
     * specified limit. The time needed to reach the requested position will depend on
     * the acceleration parameters configured for the motor.
     *
     * @param relPos : relative position, measured in steps from the current position.
     * @param maxSpeed : limit speed, in steps per second.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    async moveRelSlow(relPos: number, maxSpeed: number): Promise<number>
    {
        return await this.sendCommand('m' + String(Math.round(<number> Math.round(16*relPos))) + '@' + String(Math.round(<number> Math.round(1000*maxSpeed))));
    }

    /**
     * Keep the motor in the same state for the specified amount of time, before processing next command.
     *
     * @param waitMs : wait time, specified in milliseconds.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    async pause(waitMs: number): Promise<number>
    {
        return await this.sendCommand('_' + String(Math.round(waitMs)));
    }

    /**
     * Stops the motor with an emergency alert, without taking any additional precaution.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    async emergencyStop(): Promise<number>
    {
        return await this.set_command('!');
    }

    /**
     * Move one step in the direction opposite the direction set when the most recent alert was raised.
     * The move occurs even if the system is still in alert mode (end switch depressed). Caution.
     * use this function with great care as it may cause mechanical damages !
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    async alertStepOut(): Promise<number>
    {
        return await this.set_command('.');
    }

    /**
     * Move one single step in the selected direction without regards to end switches.
     * The move occurs even if the system is still in alert mode (end switch depressed). Caution.
     * use this function with great care as it may cause mechanical damages !
     *
     * @param dir : Value +1 or -1, according to the desired direction of the move
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    async alertStepDir(dir: number): Promise<number>
    {
        if (!(dir != 0)) {
            return this._throw(this._yapi.INVALID_ARGUMENT, 'direction must be +1 or -1', this._yapi.INVALID_ARGUMENT);
        }
        if (dir > 0) {
            return await this.set_command('.+');
        }
        return await this.set_command('.-');
    }

    /**
     * Stops the motor smoothly as soon as possible, without waiting for ongoing move completion.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    async abortAndBrake(): Promise<number>
    {
        return await this.set_command('B');
    }

    /**
     * Turn the controller into Hi-Z mode immediately, without waiting for ongoing move completion.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    async abortAndHiZ(): Promise<number>
    {
        return await this.set_command('z');
    }

    /**
     * Continues the enumeration of stepper motors started using yFirstStepperMotor().
     * Caution: You can't make any assumption about the returned stepper motors order.
     * If you want to find a specific a stepper motor, use StepperMotor.findStepperMotor()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YStepperMotor object, corresponding to
     *         a stepper motor currently online, or a null pointer
     *         if there are no more stepper motors to enumerate.
     */
    nextStepperMotor(): YStepperMotor | null
    {
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != YAPI.SUCCESS) return null;
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, <string> resolve.result);
        if (next_hwid == null) return null;
        return YStepperMotor.FindStepperMotorInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of stepper motors currently accessible.
     * Use the method YStepperMotor.nextStepperMotor() to iterate on
     * next stepper motors.
     *
     * @return a pointer to a YStepperMotor object, corresponding to
     *         the first stepper motor currently online, or a null pointer
     *         if there are none.
     */
    static FirstStepperMotor(): YStepperMotor | null
    {
        let next_hwid = YAPI.imm_getFirstHardwareId('StepperMotor');
        if (next_hwid == null) return null;
        return YStepperMotor.FindStepperMotor(next_hwid);
    }

    /**
     * Starts the enumeration of stepper motors currently accessible.
     * Use the method YStepperMotor.nextStepperMotor() to iterate on
     * next stepper motors.
     *
     * @param yctx : a YAPI context.
     *
     * @return a pointer to a YStepperMotor object, corresponding to
     *         the first stepper motor currently online, or a null pointer
     *         if there are none.
     */
    static FirstStepperMotorInContext(yctx: YAPIContext): YStepperMotor | null
    {
        let next_hwid = yctx.imm_getFirstHardwareId('StepperMotor');
        if (next_hwid == null) return null;
        return YStepperMotor.FindStepperMotorInContext(yctx, next_hwid);
    }

    //--- (end of YStepperMotor implementation)
}

export namespace YStepperMotor {
    //--- (YStepperMotor definitions)
    export const enum MOTORSTATE
    {
        ABSENT = 0,
        ALERT = 1,
        HI_Z = 2,
        STOP = 3,
        RUN = 4,
        BATCH = 5,
        INVALID = -1
    }

    export const enum STEPPING
    {
        MICROSTEP16 = 0,
        MICROSTEP8 = 1,
        MICROSTEP4 = 2,
        HALFSTEP = 3,
        FULLSTEP = 4,
        INVALID = -1
    }

    export interface ValueCallback {(func: YStepperMotor, value: string): void}

    //--- (end of YStepperMotor definitions)
}

