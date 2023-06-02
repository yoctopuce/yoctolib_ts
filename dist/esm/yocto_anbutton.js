/*********************************************************************
 *
 *  $Id: yocto_anbutton.ts 54279 2023-04-28 10:11:03Z seb $
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
import { YAPI, YFunction } from './yocto_api.js';
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
export class YAnButton extends YFunction {
    //--- (end of YAnButton attributes declaration)
    constructor(yapi, func) {
        //--- (YAnButton constructor)
        super(yapi, func);
        this._calibratedValue = YAnButton.CALIBRATEDVALUE_INVALID;
        this._rawValue = YAnButton.RAWVALUE_INVALID;
        this._analogCalibration = YAnButton.ANALOGCALIBRATION_INVALID;
        this._calibrationMax = YAnButton.CALIBRATIONMAX_INVALID;
        this._calibrationMin = YAnButton.CALIBRATIONMIN_INVALID;
        this._sensitivity = YAnButton.SENSITIVITY_INVALID;
        this._isPressed = YAnButton.ISPRESSED_INVALID;
        this._lastTimePressed = YAnButton.LASTTIMEPRESSED_INVALID;
        this._lastTimeReleased = YAnButton.LASTTIMERELEASED_INVALID;
        this._pulseCounter = YAnButton.PULSECOUNTER_INVALID;
        this._pulseTimer = YAnButton.PULSETIMER_INVALID;
        this._inputType = YAnButton.INPUTTYPE_INVALID;
        this._valueCallbackAnButton = null;
        // API symbols as object properties
        this.CALIBRATEDVALUE_INVALID = YAPI.INVALID_UINT;
        this.RAWVALUE_INVALID = YAPI.INVALID_UINT;
        this.ANALOGCALIBRATION_OFF = 0;
        this.ANALOGCALIBRATION_ON = 1;
        this.ANALOGCALIBRATION_INVALID = -1;
        this.CALIBRATIONMAX_INVALID = YAPI.INVALID_UINT;
        this.CALIBRATIONMIN_INVALID = YAPI.INVALID_UINT;
        this.SENSITIVITY_INVALID = YAPI.INVALID_UINT;
        this.ISPRESSED_FALSE = 0;
        this.ISPRESSED_TRUE = 1;
        this.ISPRESSED_INVALID = -1;
        this.LASTTIMEPRESSED_INVALID = YAPI.INVALID_LONG;
        this.LASTTIMERELEASED_INVALID = YAPI.INVALID_LONG;
        this.PULSECOUNTER_INVALID = YAPI.INVALID_LONG;
        this.PULSETIMER_INVALID = YAPI.INVALID_LONG;
        this.INPUTTYPE_ANALOG_FAST = 0;
        this.INPUTTYPE_DIGITAL4 = 1;
        this.INPUTTYPE_ANALOG_SMOOTH = 2;
        this.INPUTTYPE_INVALID = -1;
        this._className = 'AnButton';
        //--- (end of YAnButton constructor)
    }
    //--- (YAnButton implementation)
    imm_parseAttr(name, val) {
        switch (name) {
            case 'calibratedValue':
                this._calibratedValue = val;
                return 1;
            case 'rawValue':
                this._rawValue = val;
                return 1;
            case 'analogCalibration':
                this._analogCalibration = val;
                return 1;
            case 'calibrationMax':
                this._calibrationMax = val;
                return 1;
            case 'calibrationMin':
                this._calibrationMin = val;
                return 1;
            case 'sensitivity':
                this._sensitivity = val;
                return 1;
            case 'isPressed':
                this._isPressed = val;
                return 1;
            case 'lastTimePressed':
                this._lastTimePressed = val;
                return 1;
            case 'lastTimeReleased':
                this._lastTimeReleased = val;
                return 1;
            case 'pulseCounter':
                this._pulseCounter = val;
                return 1;
            case 'pulseTimer':
                this._pulseTimer = val;
                return 1;
            case 'inputType':
                this._inputType = val;
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
    async get_calibratedValue() {
        let res;
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
    async get_rawValue() {
        let res;
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
    async get_analogCalibration() {
        let res;
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
    async set_analogCalibration(newval) {
        let rest_val;
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
    async get_calibrationMax() {
        let res;
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
    async set_calibrationMax(newval) {
        let rest_val;
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
    async get_calibrationMin() {
        let res;
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
    async set_calibrationMin(newval) {
        let rest_val;
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
    async get_sensitivity() {
        let res;
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
    async set_sensitivity(newval) {
        let rest_val;
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
    async get_isPressed() {
        let res;
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
    async get_lastTimePressed() {
        let res;
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
    async get_lastTimeReleased() {
        let res;
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
    async get_pulseCounter() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YAnButton.PULSECOUNTER_INVALID;
            }
        }
        res = this._pulseCounter;
        return res;
    }
    async set_pulseCounter(newval) {
        let rest_val;
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
    async get_pulseTimer() {
        let res;
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
     * @return a value among YAnButton.INPUTTYPE_ANALOG_FAST, YAnButton.INPUTTYPE_DIGITAL4 and
     * YAnButton.INPUTTYPE_ANALOG_SMOOTH corresponding to the decoding method applied to the input (analog
     * or multiplexed binary switches)
     *
     * On failure, throws an exception or returns YAnButton.INPUTTYPE_INVALID.
     */
    async get_inputType() {
        let res;
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
     * @param newval : a value among YAnButton.INPUTTYPE_ANALOG_FAST, YAnButton.INPUTTYPE_DIGITAL4 and
     * YAnButton.INPUTTYPE_ANALOG_SMOOTH corresponding to the decoding method applied to the input (analog
     * or multiplexed binary switches)
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_inputType(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('inputType', rest_val);
    }
    /**
     * Retrieves an analog input for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
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
    static FindAnButton(func) {
        let obj;
        obj = YFunction._FindFromCache('AnButton', func);
        if (obj == null) {
            obj = new YAnButton(YAPI, func);
            YFunction._AddToCache('AnButton', func, obj);
        }
        return obj;
    }
    /**
     * Retrieves an analog input for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
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
    static FindAnButtonInContext(yctx, func) {
        let obj;
        obj = YFunction._FindFromCacheInContext(yctx, 'AnButton', func);
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
    async registerValueCallback(callback) {
        let val;
        if (callback != null) {
            await YFunction._UpdateValueCallbackList(this, true);
        }
        else {
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
    async _invokeValueCallback(value) {
        if (this._valueCallbackAnButton != null) {
            try {
                await this._valueCallbackAnButton(this, value);
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
     * Returns the pulse counter value as well as its timer.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async resetCounter() {
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
    nextAnButton() {
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != YAPI.SUCCESS)
            return null;
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if (next_hwid == null)
            return null;
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
    static FirstAnButton() {
        let next_hwid = YAPI.imm_getFirstHardwareId('AnButton');
        if (next_hwid == null)
            return null;
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
    static FirstAnButtonInContext(yctx) {
        let next_hwid = yctx.imm_getFirstHardwareId('AnButton');
        if (next_hwid == null)
            return null;
        return YAnButton.FindAnButtonInContext(yctx, next_hwid);
    }
}
// API symbols as static members
YAnButton.CALIBRATEDVALUE_INVALID = YAPI.INVALID_UINT;
YAnButton.RAWVALUE_INVALID = YAPI.INVALID_UINT;
YAnButton.ANALOGCALIBRATION_OFF = 0;
YAnButton.ANALOGCALIBRATION_ON = 1;
YAnButton.ANALOGCALIBRATION_INVALID = -1;
YAnButton.CALIBRATIONMAX_INVALID = YAPI.INVALID_UINT;
YAnButton.CALIBRATIONMIN_INVALID = YAPI.INVALID_UINT;
YAnButton.SENSITIVITY_INVALID = YAPI.INVALID_UINT;
YAnButton.ISPRESSED_FALSE = 0;
YAnButton.ISPRESSED_TRUE = 1;
YAnButton.ISPRESSED_INVALID = -1;
YAnButton.LASTTIMEPRESSED_INVALID = YAPI.INVALID_LONG;
YAnButton.LASTTIMERELEASED_INVALID = YAPI.INVALID_LONG;
YAnButton.PULSECOUNTER_INVALID = YAPI.INVALID_LONG;
YAnButton.PULSETIMER_INVALID = YAPI.INVALID_LONG;
YAnButton.INPUTTYPE_ANALOG_FAST = 0;
YAnButton.INPUTTYPE_DIGITAL4 = 1;
YAnButton.INPUTTYPE_ANALOG_SMOOTH = 2;
YAnButton.INPUTTYPE_INVALID = -1;
//# sourceMappingURL=yocto_anbutton.js.map