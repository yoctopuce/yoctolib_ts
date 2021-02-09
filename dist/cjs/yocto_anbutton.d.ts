/*********************************************************************
 *
 *  $Id: yocto_anbutton.ts 43760 2021-02-08 14:33:45Z mvuilleu $
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
import { YAPIContext, YFunction } from './yocto_api.js';
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
export declare class YAnButton extends YFunction {
    _className: string;
    _calibratedValue: number;
    _rawValue: number;
    _analogCalibration: YAnButton.ANALOGCALIBRATION;
    _calibrationMax: number;
    _calibrationMin: number;
    _sensitivity: number;
    _isPressed: YAnButton.ISPRESSED;
    _lastTimePressed: number;
    _lastTimeReleased: number;
    _pulseCounter: number;
    _pulseTimer: number;
    _inputType: YAnButton.INPUTTYPE;
    _valueCallbackAnButton: YAnButton.ValueCallback | null;
    readonly CALIBRATEDVALUE_INVALID: number;
    readonly RAWVALUE_INVALID: number;
    readonly ANALOGCALIBRATION_OFF: YAnButton.ANALOGCALIBRATION;
    readonly ANALOGCALIBRATION_ON: YAnButton.ANALOGCALIBRATION;
    readonly ANALOGCALIBRATION_INVALID: YAnButton.ANALOGCALIBRATION;
    readonly CALIBRATIONMAX_INVALID: number;
    readonly CALIBRATIONMIN_INVALID: number;
    readonly SENSITIVITY_INVALID: number;
    readonly ISPRESSED_FALSE: YAnButton.ISPRESSED;
    readonly ISPRESSED_TRUE: YAnButton.ISPRESSED;
    readonly ISPRESSED_INVALID: YAnButton.ISPRESSED;
    readonly LASTTIMEPRESSED_INVALID: number;
    readonly LASTTIMERELEASED_INVALID: number;
    readonly PULSECOUNTER_INVALID: number;
    readonly PULSETIMER_INVALID: number;
    readonly INPUTTYPE_ANALOG_FAST: YAnButton.INPUTTYPE;
    readonly INPUTTYPE_DIGITAL4: YAnButton.INPUTTYPE;
    readonly INPUTTYPE_ANALOG_SMOOTH: YAnButton.INPUTTYPE;
    readonly INPUTTYPE_INVALID: YAnButton.INPUTTYPE;
    static readonly CALIBRATEDVALUE_INVALID: number;
    static readonly RAWVALUE_INVALID: number;
    static readonly ANALOGCALIBRATION_OFF: YAnButton.ANALOGCALIBRATION;
    static readonly ANALOGCALIBRATION_ON: YAnButton.ANALOGCALIBRATION;
    static readonly ANALOGCALIBRATION_INVALID: YAnButton.ANALOGCALIBRATION;
    static readonly CALIBRATIONMAX_INVALID: number;
    static readonly CALIBRATIONMIN_INVALID: number;
    static readonly SENSITIVITY_INVALID: number;
    static readonly ISPRESSED_FALSE: YAnButton.ISPRESSED;
    static readonly ISPRESSED_TRUE: YAnButton.ISPRESSED;
    static readonly ISPRESSED_INVALID: YAnButton.ISPRESSED;
    static readonly LASTTIMEPRESSED_INVALID: number;
    static readonly LASTTIMERELEASED_INVALID: number;
    static readonly PULSECOUNTER_INVALID: number;
    static readonly PULSETIMER_INVALID: number;
    static readonly INPUTTYPE_ANALOG_FAST: YAnButton.INPUTTYPE;
    static readonly INPUTTYPE_DIGITAL4: YAnButton.INPUTTYPE;
    static readonly INPUTTYPE_ANALOG_SMOOTH: YAnButton.INPUTTYPE;
    static readonly INPUTTYPE_INVALID: YAnButton.INPUTTYPE;
    constructor(yapi: YAPIContext, func: string);
    imm_parseAttr(name: string, val: any): 0 | 1;
    /**
     * Returns the current calibrated input value (between 0 and 1000, included).
     *
     * @return an integer corresponding to the current calibrated input value (between 0 and 1000, included)
     *
     * On failure, throws an exception or returns YAnButton.CALIBRATEDVALUE_INVALID.
     */
    get_calibratedValue(): Promise<number>;
    /**
     * Returns the current measured input value as-is (between 0 and 4095, included).
     *
     * @return an integer corresponding to the current measured input value as-is (between 0 and 4095, included)
     *
     * On failure, throws an exception or returns YAnButton.RAWVALUE_INVALID.
     */
    get_rawValue(): Promise<number>;
    /**
     * Tells if a calibration process is currently ongoing.
     *
     * @return either YAnButton.ANALOGCALIBRATION_OFF or YAnButton.ANALOGCALIBRATION_ON
     *
     * On failure, throws an exception or returns YAnButton.ANALOGCALIBRATION_INVALID.
     */
    get_analogCalibration(): Promise<YAnButton.ANALOGCALIBRATION>;
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
    set_analogCalibration(newval: YAnButton.ANALOGCALIBRATION): Promise<number>;
    /**
     * Returns the maximal value measured during the calibration (between 0 and 4095, included).
     *
     * @return an integer corresponding to the maximal value measured during the calibration (between 0
     * and 4095, included)
     *
     * On failure, throws an exception or returns YAnButton.CALIBRATIONMAX_INVALID.
     */
    get_calibrationMax(): Promise<number>;
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
    set_calibrationMax(newval: number): Promise<number>;
    /**
     * Returns the minimal value measured during the calibration (between 0 and 4095, included).
     *
     * @return an integer corresponding to the minimal value measured during the calibration (between 0
     * and 4095, included)
     *
     * On failure, throws an exception or returns YAnButton.CALIBRATIONMIN_INVALID.
     */
    get_calibrationMin(): Promise<number>;
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
    set_calibrationMin(newval: number): Promise<number>;
    /**
     * Returns the sensibility for the input (between 1 and 1000) for triggering user callbacks.
     *
     * @return an integer corresponding to the sensibility for the input (between 1 and 1000) for
     * triggering user callbacks
     *
     * On failure, throws an exception or returns YAnButton.SENSITIVITY_INVALID.
     */
    get_sensitivity(): Promise<number>;
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
    set_sensitivity(newval: number): Promise<number>;
    /**
     * Returns true if the input (considered as binary) is active (closed contact), and false otherwise.
     *
     * @return either YAnButton.ISPRESSED_FALSE or YAnButton.ISPRESSED_TRUE, according to true if the
     * input (considered as binary) is active (closed contact), and false otherwise
     *
     * On failure, throws an exception or returns YAnButton.ISPRESSED_INVALID.
     */
    get_isPressed(): Promise<YAnButton.ISPRESSED>;
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
    get_lastTimePressed(): Promise<number>;
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
    get_lastTimeReleased(): Promise<number>;
    /**
     * Returns the pulse counter value. The value is a 32 bit integer. In case
     * of overflow (>=2^32), the counter will wrap. To reset the counter, just
     * call the resetCounter() method.
     *
     * @return an integer corresponding to the pulse counter value
     *
     * On failure, throws an exception or returns YAnButton.PULSECOUNTER_INVALID.
     */
    get_pulseCounter(): Promise<number>;
    set_pulseCounter(newval: number): Promise<number>;
    /**
     * Returns the timer of the pulses counter (ms).
     *
     * @return an integer corresponding to the timer of the pulses counter (ms)
     *
     * On failure, throws an exception or returns YAnButton.PULSETIMER_INVALID.
     */
    get_pulseTimer(): Promise<number>;
    /**
     * Returns the decoding method applied to the input (analog or multiplexed binary switches).
     *
     * @return a value among YAnButton.INPUTTYPE_ANALOG_FAST, YAnButton.INPUTTYPE_DIGITAL4 and
     * YAnButton.INPUTTYPE_ANALOG_SMOOTH corresponding to the decoding method applied to the input (analog
     * or multiplexed binary switches)
     *
     * On failure, throws an exception or returns YAnButton.INPUTTYPE_INVALID.
     */
    get_inputType(): Promise<YAnButton.INPUTTYPE>;
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
    set_inputType(newval: YAnButton.INPUTTYPE): Promise<number>;
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
    static FindAnButton(func: string): YAnButton;
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
    static FindAnButtonInContext(yctx: YAPIContext, func: string): YAnButton;
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
    registerValueCallback(callback: YAnButton.ValueCallback | null): Promise<number>;
    _invokeValueCallback(value: string): Promise<number>;
    /**
     * Returns the pulse counter value as well as its timer.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    resetCounter(): Promise<number>;
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
    nextAnButton(): YAnButton | null;
    /**
     * Starts the enumeration of analog inputs currently accessible.
     * Use the method YAnButton.nextAnButton() to iterate on
     * next analog inputs.
     *
     * @return a pointer to a YAnButton object, corresponding to
     *         the first analog input currently online, or a null pointer
     *         if there are none.
     */
    static FirstAnButton(): YAnButton | null;
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
    static FirstAnButtonInContext(yctx: YAPIContext): YAnButton | null;
}
export declare namespace YAnButton {
    const enum ANALOGCALIBRATION {
        OFF = 0,
        ON = 1,
        INVALID = -1
    }
    const enum ISPRESSED {
        FALSE = 0,
        TRUE = 1,
        INVALID = -1
    }
    const enum INPUTTYPE {
        ANALOG_FAST = 0,
        DIGITAL4 = 1,
        ANALOG_SMOOTH = 2,
        INVALID = -1
    }
    interface ValueCallback {
        (func: YAnButton, value: string): void;
    }
}
