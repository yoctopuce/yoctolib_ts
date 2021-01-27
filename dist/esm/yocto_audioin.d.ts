/*********************************************************************
 *
 *  $Id: yocto_audioin.ts 43483 2021-01-21 15:47:50Z mvuilleu $
 *
 *  Implements the high-level API for AudioIn functions
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
export declare const enum YAudioIn_Mute {
    FALSE = 0,
    TRUE = 1,
    INVALID = -1
}
export interface YAudioInValueCallback {
    (func: YAudioIn, value: string): void;
}
/**
 * YAudioIn Class: audio input control interface
 *
 * The YAudioIn class allows you to configure the volume of an audio input.
 */
export declare class YAudioIn extends YFunction {
    _className: string;
    _volume: number;
    _mute: YAudioIn_Mute;
    _volumeRange: string;
    _signal: number;
    _noSignalFor: number;
    _valueCallbackAudioIn: YAudioInValueCallback | null;
    readonly VOLUME_INVALID: number;
    readonly MUTE_FALSE: YAudioIn_Mute;
    readonly MUTE_TRUE: YAudioIn_Mute;
    readonly MUTE_INVALID: YAudioIn_Mute;
    readonly VOLUMERANGE_INVALID: string;
    readonly SIGNAL_INVALID: number;
    readonly NOSIGNALFOR_INVALID: number;
    static readonly VOLUME_INVALID: number;
    static readonly MUTE_FALSE: YAudioIn_Mute;
    static readonly MUTE_TRUE: YAudioIn_Mute;
    static readonly MUTE_INVALID: YAudioIn_Mute;
    static readonly VOLUMERANGE_INVALID: string;
    static readonly SIGNAL_INVALID: number;
    static readonly NOSIGNALFOR_INVALID: number;
    constructor(yapi: YAPIContext, func: string);
    imm_parseAttr(name: string, val: any): 0 | 1;
    /**
     * Returns audio input gain, in per cents.
     *
     * @return an integer corresponding to audio input gain, in per cents
     *
     * On failure, throws an exception or returns YAudioIn.VOLUME_INVALID.
     */
    get_volume(): Promise<number>;
    /**
     * Changes audio input gain, in per cents.
     * Remember to call the saveToFlash()
     * method of the module if the modification must be kept.
     *
     * @param newval : an integer corresponding to audio input gain, in per cents
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_volume(newval: number): Promise<number>;
    /**
     * Returns the state of the mute function.
     *
     * @return either YAudioIn.MUTE_FALSE or YAudioIn.MUTE_TRUE, according to the state of the mute function
     *
     * On failure, throws an exception or returns YAudioIn.MUTE_INVALID.
     */
    get_mute(): Promise<YAudioIn_Mute>;
    /**
     * Changes the state of the mute function. Remember to call the matching module
     * saveToFlash() method to save the setting permanently.
     *
     * @param newval : either YAudioIn.MUTE_FALSE or YAudioIn.MUTE_TRUE, according to the state of the mute function
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_mute(newval: YAudioIn_Mute): Promise<number>;
    /**
     * Returns the supported volume range. The low value of the
     * range corresponds to the minimal audible value. To
     * completely mute the sound, use set_mute()
     * instead of the set_volume().
     *
     * @return a string corresponding to the supported volume range
     *
     * On failure, throws an exception or returns YAudioIn.VOLUMERANGE_INVALID.
     */
    get_volumeRange(): Promise<string>;
    /**
     * Returns the detected input signal level.
     *
     * @return an integer corresponding to the detected input signal level
     *
     * On failure, throws an exception or returns YAudioIn.SIGNAL_INVALID.
     */
    get_signal(): Promise<number>;
    /**
     * Returns the number of seconds elapsed without detecting a signal.
     *
     * @return an integer corresponding to the number of seconds elapsed without detecting a signal
     *
     * On failure, throws an exception or returns YAudioIn.NOSIGNALFOR_INVALID.
     */
    get_noSignalFor(): Promise<number>;
    /**
     * Retrieves an audio input for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the audio input is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YAudioIn.isOnline() to test if the audio input is
     * indeed online at a given time. In case of ambiguity when looking for
     * an audio input by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the audio input, for instance
     *         MyDevice.audioIn1.
     *
     * @return a YAudioIn object allowing you to drive the audio input.
     */
    static FindAudioIn(func: string): YAudioIn;
    /**
     * Retrieves an audio input for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the audio input is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YAudioIn.isOnline() to test if the audio input is
     * indeed online at a given time. In case of ambiguity when looking for
     * an audio input by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx : a YAPI context
     * @param func : a string that uniquely characterizes the audio input, for instance
     *         MyDevice.audioIn1.
     *
     * @return a YAudioIn object allowing you to drive the audio input.
     */
    static FindAudioInInContext(yctx: YAPIContext, func: string): YAudioIn;
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
    registerValueCallback(callback: YAudioInValueCallback | null): Promise<number>;
    _invokeValueCallback(value: string): Promise<number>;
    /**
     * Continues the enumeration of audio inputs started using yFirstAudioIn().
     * Caution: You can't make any assumption about the returned audio inputs order.
     * If you want to find a specific an audio input, use AudioIn.findAudioIn()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YAudioIn object, corresponding to
     *         an audio input currently online, or a null pointer
     *         if there are no more audio inputs to enumerate.
     */
    nextAudioIn(): YAudioIn | null;
    /**
     * Starts the enumeration of audio inputs currently accessible.
     * Use the method YAudioIn.nextAudioIn() to iterate on
     * next audio inputs.
     *
     * @return a pointer to a YAudioIn object, corresponding to
     *         the first audio input currently online, or a null pointer
     *         if there are none.
     */
    static FirstAudioIn(): YAudioIn | null;
    /**
     * Starts the enumeration of audio inputs currently accessible.
     * Use the method YAudioIn.nextAudioIn() to iterate on
     * next audio inputs.
     *
     * @param yctx : a YAPI context.
     *
     * @return a pointer to a YAudioIn object, corresponding to
     *         the first audio input currently online, or a null pointer
     *         if there are none.
     */
    static FirstAudioInInContext(yctx: YAPIContext): YAudioIn | null;
}
