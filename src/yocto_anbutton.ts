/*********************************************************************
 *
 *  $Id: svn_id $
 *
 *  Implements the high-level API for AnButton functions
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

//--- (YAnButton class start)
/**
 * YAnButton Class: analog input control interface, available for instance in the Yocto-Buzzer, the
 * Yocto-Knob, the Yocto-MaxiBuzzer or the Yocto-MaxiDisplay
 *
 * The YAnButton class provide access to basic resistive inputs.
 * Such inputs can be used to measure the state
 * of a simple button as well as to read an analog potentiometer (variable resistance).
 * This can be use for instance with a continuous rotating knob, a throttle grip
 * or a joystick. The module is capable to calibrate itself on min and max values,
 * in order to compute a calibrated value that varies proportionally with the
 * potentiometer position, regardless of its total resistance.
 */
//--- (end of YAnButton class start)

export class YAnButton extends YFunction
{
    //--- (YAnButton attributes declaration)
    _className: string;
    _calibratedValue: number = YAnButton.CALIBRATEDVALUE_INVALID;
    _rawValue: number = YAnButton.RAWVALUE_INVALID;
    _analogCalibration: YAnButton.ANALOGCALIBRATION = YAnButton.ANALOGCALIBRATION_INVALID;
    _calibrationMax: number = YAnButton.CALIBRATIONMAX_INVALID;
    _calibrationMin: number = YAnButton.CALIBRATIONMIN_INVALID;
    _sensitivity: number = YAnButton.SENSITIVITY_INVALID;
    _isPressed: YAnButton.ISPRESSED = YAnButton.ISPRESSED_INVALID;
    _lastTimePressed: number = YAnButton.LASTTIMEPRESSED_INVALID;
    _lastTimeReleased: number = YAnButton.LASTTIMERELEASED_INVALID;
    _pulseCounter: number = YAnButton.PULSECOUNTER_INVALID;
    _pulseTimer: number = YAnButton.PULSETIMER_INVALID;
    _inputType: YAnButton.INPUTTYPE = YAnButton.INPUTTYPE_INVALID;
    _valueCallbackAnButton: YAnButton.ValueCallback | null = null;

    // API symbols as object properties
    public readonly CALIBRATEDVALUE_INVALID: number = YAPI.INVALID_UINT;
    public readonly RAWVALUE_INVALID: number = YAPI.INVALID_UINT;
    public readonly ANALOGCALIBRATION_OFF: YAnButton.ANALOGCALIBRATION = 0;
    public readonly ANALOGCALIBRATION_ON: YAnButton.ANALOGCALIBRATION = 1;
    public readonly ANALOGCALIBRATION_INVALID: YAnButton.ANALOGCALIBRATION = -1;
    public readonly CALIBRATIONMAX_INVALID: number = YAPI.INVALID_UINT;
    public readonly CALIBRATIONMIN_INVALID: number = YAPI.INVALID_UINT;
    public readonly SENSITIVITY_INVALID: number = YAPI.INVALID_UINT;
    public readonly ISPRESSED_FALSE: YAnButton.ISPRESSED = 0;
    public readonly ISPRESSED_TRUE: YAnButton.ISPRESSED = 1;
    public readonly ISPRESSED_INVALID: YAnButton.ISPRESSED = -1;
    public readonly LASTTIMEPRESSED_INVALID: number = YAPI.INVALID_LONG;
    public readonly LASTTIMERELEASED_INVALID: number = YAPI.INVALID_LONG;
    public readonly PULSECOUNTER_INVALID: number = YAPI.INVALID_LONG;
    public readonly PULSETIMER_INVALID: number = YAPI.INVALID_LONG;
    public readonly INPUTTYPE_ANALOG_FAST: YAnButton.INPUTTYPE = 0;
    public readonly INPUTTYPE_DIGITAL4: YAnButton.INPUTTYPE = 1;
    public readonly INPUTTYPE_ANALOG_SMOOTH: YAnButton.INPUTTYPE = 2;
    public readonly INPUTTYPE_DIGITAL_FAST: YAnButton.INPUTTYPE = 3;
    public readonly INPUTTYPE_INVALID: YAnButton.INPUTTYPE = -1;

    // API symbols as static members
    public static readonly CALIBRATEDVALUE_INVALID: number = YAPI.INVALID_UINT;
    public static readonly RAWVALUE_INVALID: number = YAPI.INVALID_UINT;
    public static readonly ANALOGCALIBRATION_OFF: YAnButton.ANALOGCALIBRATION = 0;
    public static readonly ANALOGCALIBRATION_ON: YAnButton.ANALOGCALIBRATION = 1;
    public static readonly ANALOGCALIBRATION_INVALID: YAnButton.ANALOGCALIBRATION = -1;
    public static readonly CALIBRATIONMAX_INVALID: number = YAPI.INVALID_UINT;
    public static readonly CALIBRATIONMIN_INVALID: number = YAPI.INVALID_UINT;
    public static readonly SENSITIVITY_INVALID: number = YAPI.INVALID_UINT;
    public static readonly ISPRESSED_FALSE: YAnButton.ISPRESSED = 0;
    public static readonly ISPRESSED_TRUE: YAnButton.ISPRESSED = 1;
    public static readonly ISPRESSED_INVALID: YAnButton.ISPRESSED = -1;
    public static readonly LASTTIMEPRESSED_INVALID: number = YAPI.INVALID_LONG;
    public static readonly LASTTIMERELEASED_INVALID: number = YAPI.INVALID_LONG;
    public static readonly PULSECOUNTER_INVALID: number = YAPI.INVALID_LONG;
    public static readonly PULSETIMER_INVALID: number = YAPI.INVALID_LONG;
    public static readonly INPUTTYPE_ANALOG_FAST: YAnButton.INPUTTYPE = 0;
    public static readonly INPUTTYPE_DIGITAL4: YAnButton.INPUTTYPE = 1;
    public static readonly INPUTTYPE_ANALOG_SMOOTH: YAnButton.INPUTTYPE = 2;
    public static readonly INPUTTYPE_DIGITAL_FAST: YAnButton.INPUTTYPE = 3;
    public static readonly INPUTTYPE_INVALID: YAnButton.INPUTTYPE = -1;
    //--- (end of YAnButton attributes declaration)

    constructor(yapi: YAPIContext, func: string)
    {
        //--- (YAnButton constructor)
        super(yapi, func);
        this._className                  = 'AnButton';
        //--- (end of YAnButton constructor)
    }

    //--- (YAnButton implementation)

    imm_parseAttr(name: string, val: any): number
    {
        switch (name) {
        case 'calibratedValue':
            this._calibratedValue = <number> <number> val;
            return 1;
        case 'rawValue':
            this._rawValue = <number> <number> val;
            return 1;
        case 'analogCalibration':
            this._analogCalibration = <YAnButton.ANALOGCALIBRATION> <number> val;
            return 1;
        case 'calibrationMax':
            this._calibrationMax = <number> <number> val;
            return 1;
        case 'calibrationMin':
            this._calibrationMin = <number> <number> val;
            return 1;
        case 'sensitivity':
            this._sensitivity = <number> <number> val;
            return 1;
        case 'isPressed':
            this._isPressed = <YAnButton.ISPRESSED> <number> val;
            return 1;
        case 'lastTimePressed':
            this._lastTimePressed = <number> <number> val;
            return 1;
        case 'lastTimeReleased':
            this._lastTimeReleased = <number> <number> val;
            return 1;
        case 'pulseCounter':
            this._pulseCounter = <number> <number> val;
            return 1;
        case 'pulseTimer':
            this._pulseTimer = <number> <number> val;
            return 1;
        case 'inputType':
            this._inputType = <YAnButton.INPUTTYPE> <number> val;
            return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Returns the current calibrated input value (between 0 and 1000, included).
     *
     * @return an integer corresponding to the current calibrated input value (between 0 and 1000, included)
     *
     * On failure, throws an exception or returns YAnButton.CALIBRATEDVALUE_INVALID.
     */
    async get_calibratedValue(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YAnButton.CALIBRATEDVALUE_INVALID;
            }
        }
        res = this._calibratedValue;
        return res;
    }

    /**
     * Returns the current measured input value as-is (between 0 and 4095, included).
     *
     * @return an integer corresponding to the current measured input value as-is (between 0 and 4095, included)
     *
     * On failure, throws an exception or returns YAnButton.RAWVALUE_INVALID.
     */
    async get_rawValue(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YAnButton.RAWVALUE_INVALID;
            }
        }
        res = this._rawValue;
        return res;
    }

    /**
     * Tells if a calibration process is currently ongoing.
     *
     * @return either YAnButton.ANALOGCALIBRATION_OFF or YAnButton.ANALOGCALIBRATION_ON
     *
     * On failure, throws an exception or returns YAnButton.ANALOGCALIBRATION_INVALID.
     */
    async get_analogCalibration(): Promise<YAnButton.ANALOGCALIBRATION>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YAnButton.ANALOGCALIBRATION_INVALID;
            }
        }
        res = this._analogCalibration;
        return res;
    }

    /**
     * Starts or stops the calibration process. Remember to call the saveToFlash()
     * method of the module at the end of the calibration if the modification must be kept.
     *
     * @param newval : either YAnButton.ANALOGCALIBRATION_OFF or YAnButton.ANALOGCALIBRATION_ON
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_analogCalibration(newval: YAnButton.ANALOGCALIBRATION): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('analogCalibration', rest_val);
    }

    /**
     * Returns the maximal value measured during the calibration (between 0 and 4095, included).
     *
     * @return an integer corresponding to the maximal value measured during the calibration (between 0
     * and 4095, included)
     *
     * On failure, throws an exception or returns YAnButton.CALIBRATIONMAX_INVALID.
     */
    async get_calibrationMax(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YAnButton.CALIBRATIONMAX_INVALID;
            }
        }
        res = this._calibrationMax;
        return res;
    }

    /**
     * Changes the maximal calibration value for the input (between 0 and 4095, included), without actually
     * starting the automated calibration.  Remember to call the saveToFlash()
     * method of the module if the modification must be kept.
     *
     * @param newval : an integer corresponding to the maximal calibration value for the input (between 0
     * and 4095, included), without actually
     *         starting the automated calibration
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_calibrationMax(newval: number): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('calibrationMax', rest_val);
    }

    /**
     * Returns the minimal value measured during the calibration (between 0 and 4095, included).
     *
     * @return an integer corresponding to the minimal value measured during the calibration (between 0
     * and 4095, included)
     *
     * On failure, throws an exception or returns YAnButton.CALIBRATIONMIN_INVALID.
     */
    async get_calibrationMin(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YAnButton.CALIBRATIONMIN_INVALID;
            }
        }
        res = this._calibrationMin;
        return res;
    }

    /**
     * Changes the minimal calibration value for the input (between 0 and 4095, included), without actually
     * starting the automated calibration.  Remember to call the saveToFlash()
     * method of the module if the modification must be kept.
     *
     * @param newval : an integer corresponding to the minimal calibration value for the input (between 0
     * and 4095, included), without actually
     *         starting the automated calibration
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_calibrationMin(newval: number): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('calibrationMin', rest_val);
    }

    /**
     * Returns the sensibility for the input (between 1 and 1000) for triggering user callbacks.
     *
     * @return an integer corresponding to the sensibility for the input (between 1 and 1000) for
     * triggering user callbacks
     *
     * On failure, throws an exception or returns YAnButton.SENSITIVITY_INVALID.
     */
    async get_sensitivity(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YAnButton.SENSITIVITY_INVALID;
            }
        }
        res = this._sensitivity;
        return res;
    }

    /**
     * Changes the sensibility for the input (between 1 and 1000) for triggering user callbacks.
     * The sensibility is used to filter variations around a fixed value, but does not preclude the
     * transmission of events when the input value evolves constantly in the same direction.
     * Special case: when the value 1000 is used, the callback will only be thrown when the logical state
     * of the input switches from pressed to released and back.
     * Remember to call the saveToFlash() method of the module if the modification must be kept.
     *
     * @param newval : an integer corresponding to the sensibility for the input (between 1 and 1000) for
     * triggering user callbacks
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_sensitivity(newval: number): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('sensitivity', rest_val);
    }

    /**
     * Returns true if the input (considered as binary) is active (closed contact), and false otherwise.
     *
     * @return either YAnButton.ISPRESSED_FALSE or YAnButton.ISPRESSED_TRUE, according to true if the
     * input (considered as binary) is active (closed contact), and false otherwise
     *
     * On failure, throws an exception or returns YAnButton.ISPRESSED_INVALID.
     */
    async get_isPressed(): Promise<YAnButton.ISPRESSED>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YAnButton.ISPRESSED_INVALID;
            }
        }
        res = this._isPressed;
        return res;
    }

    /**
     * Returns the number of elapsed milliseconds between the module power on and the last time
     * the input button was pressed (the input contact transitioned from open to closed).
     *
     * @return an integer corresponding to the number of elapsed milliseconds between the module power on
     * and the last time
     *         the input button was pressed (the input contact transitioned from open to closed)
     *
     * On failure, throws an exception or returns YAnButton.LASTTIMEPRESSED_INVALID.
     */
    async get_lastTimePressed(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YAnButton.LASTTIMEPRESSED_INVALID;
            }
        }
        res = this._lastTimePressed;
        return res;
    }

    /**
     * Returns the number of elapsed milliseconds between the module power on and the last time
     * the input button was released (the input contact transitioned from closed to open).
     *
     * @return an integer corresponding to the number of elapsed milliseconds between the module power on
     * and the last time
     *         the input button was released (the input contact transitioned from closed to open)
     *
     * On failure, throws an exception or returns YAnButton.LASTTIMERELEASED_INVALID.
     */
    async get_lastTimeReleased(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YAnButton.LASTTIMERELEASED_INVALID;
            }
        }
        res = this._lastTimeReleased;
        return res;
    }

    /**
     * Returns the pulse counter value. The value is a 32 bit integer. In case
     * of overflow (>=2^32), the counter will wrap. To reset the counter, just
     * call the resetCounter() method.
     *
     * @return an integer corresponding to the pulse counter value
     *
     * On failure, throws an exception or returns YAnButton.PULSECOUNTER_INVALID.
     */
    async get_pulseCounter(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YAnButton.PULSECOUNTER_INVALID;
            }
        }
        res = this._pulseCounter;
        return res;
    }

    async set_pulseCounter(newval: number): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('pulseCounter', rest_val);
    }

    /**
     * Returns the timer of the pulses counter (ms).
     *
     * @return an integer corresponding to the timer of the pulses counter (ms)
     *
     * On failure, throws an exception or returns YAnButton.PULSETIMER_INVALID.
     */
    async get_pulseTimer(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YAnButton.PULSETIMER_INVALID;
            }
        }
        res = this._pulseTimer;
        return res;
    }

    /**
     * Returns the decoding method applied to the input (analog or multiplexed binary switches).
     *
     * @return a value among YAnButton.INPUTTYPE_ANALOG_FAST, YAnButton.INPUTTYPE_DIGITAL4,
     * YAnButton.INPUTTYPE_ANALOG_SMOOTH and YAnButton.INPUTTYPE_DIGITAL_FAST corresponding to the
     * decoding method applied to the input (analog or multiplexed binary switches)
     *
     * On failure, throws an exception or returns YAnButton.INPUTTYPE_INVALID.
     */
    async get_inputType(): Promise<YAnButton.INPUTTYPE>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YAnButton.INPUTTYPE_INVALID;
            }
        }
        res = this._inputType;
        return res;
    }

    /**
     * Changes the decoding method applied to the input (analog or multiplexed binary switches).
     * Remember to call the saveToFlash() method of the module if the modification must be kept.
     *
     * @param newval : a value among YAnButton.INPUTTYPE_ANALOG_FAST, YAnButton.INPUTTYPE_DIGITAL4,
     * YAnButton.INPUTTYPE_ANALOG_SMOOTH and YAnButton.INPUTTYPE_DIGITAL_FAST corresponding to the
     * decoding method applied to the input (analog or multiplexed binary switches)
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_inputType(newval: YAnButton.INPUTTYPE): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('inputType', rest_val);
    }

    /**
     * Retrieves an analog input for a given identifier.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the analog input is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YAnButton.isOnline() to test if the analog input is
     * indeed online at a given time. In case of ambiguity when looking for
     * an analog input by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the analog input, for instance
     *         YBUZZER2.anButton1.
     *
     * @return a YAnButton object allowing you to drive the analog input.
     */
    static FindAnButton(func: string): YAnButton
    {
        let obj: YAnButton | null;
        obj = <YAnButton> YFunction._FindFromCache('AnButton', func);
        if (obj == null) {
            obj = new YAnButton(YAPI, func);
            YFunction._AddToCache('AnButton', func, obj);
        }
        return obj;
    }

    /**
     * Retrieves an analog input for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the analog input is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YAnButton.isOnline() to test if the analog input is
     * indeed online at a given time. In case of ambiguity when looking for
     * an analog input by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx : a YAPI context
     * @param func : a string that uniquely characterizes the analog input, for instance
     *         YBUZZER2.anButton1.
     *
     * @return a YAnButton object allowing you to drive the analog input.
     */
    static FindAnButtonInContext(yctx: YAPIContext, func: string): YAnButton
    {
        let obj: YAnButton | null;
        obj = <YAnButton> YFunction._FindFromCacheInContext(yctx, 'AnButton', func);
        if (obj == null) {
            obj = new YAnButton(yctx, func);
            YFunction._AddToCache('AnButton', func, obj);
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
    async registerValueCallback(callback: YAnButton.ValueCallback | null): Promise<number>
    {
        let val: string;
        if (callback != null) {
            await YFunction._UpdateValueCallbackList(this, true);
        } else {
            await YFunction._UpdateValueCallbackList(this, false);
        }
        this._valueCallbackAnButton = callback;
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
        if (this._valueCallbackAnButton != null) {
            try {
                await this._valueCallbackAnButton(this, value);
            } catch (e) {
                this._yapi.imm_log('Exception in valueCallback:', e);
            }
        } else {
            await super._invokeValueCallback(value);
        }
        return 0;
    }

    /**
     * Returns the pulse counter value as well as its timer.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async resetCounter(): Promise<number>
    {
        return await this.set_pulseCounter(0);
    }

    /**
     * Continues the enumeration of analog inputs started using yFirstAnButton().
     * Caution: You can't make any assumption about the returned analog inputs order.
     * If you want to find a specific an analog input, use AnButton.findAnButton()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YAnButton object, corresponding to
     *         an analog input currently online, or a null pointer
     *         if there are no more analog inputs to enumerate.
     */
    nextAnButton(): YAnButton | null
    {
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != YAPI.SUCCESS) return null;
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, <string> resolve.result);
        if (next_hwid == null) return null;
        return YAnButton.FindAnButtonInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of analog inputs currently accessible.
     * Use the method YAnButton.nextAnButton() to iterate on
     * next analog inputs.
     *
     * @return a pointer to a YAnButton object, corresponding to
     *         the first analog input currently online, or a null pointer
     *         if there are none.
     */
    static FirstAnButton(): YAnButton | null
    {
        let next_hwid = YAPI.imm_getFirstHardwareId('AnButton');
        if (next_hwid == null) return null;
        return YAnButton.FindAnButton(next_hwid);
    }

    /**
     * Starts the enumeration of analog inputs currently accessible.
     * Use the method YAnButton.nextAnButton() to iterate on
     * next analog inputs.
     *
     * @param yctx : a YAPI context.
     *
     * @return a pointer to a YAnButton object, corresponding to
     *         the first analog input currently online, or a null pointer
     *         if there are none.
     */
    static FirstAnButtonInContext(yctx: YAPIContext): YAnButton | null
    {
        let next_hwid = yctx.imm_getFirstHardwareId('AnButton');
        if (next_hwid == null) return null;
        return YAnButton.FindAnButtonInContext(yctx, next_hwid);
    }

    //--- (end of YAnButton implementation)
}

export namespace YAnButton {
    //--- (YAnButton definitions)
    export const enum ANALOGCALIBRATION
    {
        OFF = 0,
        ON = 1,
        INVALID = -1
    }

    export const enum ISPRESSED
    {
        FALSE = 0,
        TRUE = 1,
        INVALID = -1
    }

    export const enum INPUTTYPE
    {
        ANALOG_FAST = 0,
        DIGITAL4 = 1,
        ANALOG_SMOOTH = 2,
        DIGITAL_FAST = 3,
        INVALID = -1
    }

    export interface ValueCallback {(func: YAnButton, value: string): void}

    //--- (end of YAnButton definitions)
}

