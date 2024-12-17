/*********************************************************************
 *
 *  $Id: yocto_audioout.ts 63327 2024-11-13 09:35:03Z seb $
 *
 *  Implements the high-level API for AudioOut functions
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
 * YAudioOut Class: audio output control interface
 *
 * The YAudioOut class allows you to configure the volume of an audio output.
 */
export declare class YAudioOut extends YFunction {
    _className: string;
    _volume: number;
    _mute: YAudioOut.MUTE;
    _volumeRange: string;
    _signal: number;
    _noSignalFor: number;
    _valueCallbackAudioOut: YAudioOut.ValueCallback | null;
    readonly VOLUME_INVALID: number;
    readonly MUTE_FALSE: YAudioOut.MUTE;
    readonly MUTE_TRUE: YAudioOut.MUTE;
    readonly MUTE_INVALID: YAudioOut.MUTE;
    readonly VOLUMERANGE_INVALID: string;
    readonly SIGNAL_INVALID: number;
    readonly NOSIGNALFOR_INVALID: number;
    static readonly VOLUME_INVALID: number;
    static readonly MUTE_FALSE: YAudioOut.MUTE;
    static readonly MUTE_TRUE: YAudioOut.MUTE;
    static readonly MUTE_INVALID: YAudioOut.MUTE;
    static readonly VOLUMERANGE_INVALID: string;
    static readonly SIGNAL_INVALID: number;
    static readonly NOSIGNALFOR_INVALID: number;
    constructor(yapi: YAPIContext, func: string);
    imm_parseAttr(name: string, val: any): number;
    /**
     * Returns audio output volume, in per cents.
     *
     * @return an integer corresponding to audio output volume, in per cents
     *
     * On failure, throws an exception or returns YAudioOut.VOLUME_INVALID.
     */
    get_volume(): Promise<number>;
    /**
     * Changes audio output volume, in per cents.
     * Remember to call the saveToFlash()
     * method of the module if the modification must be kept.
     *
     * @param newval : an integer corresponding to audio output volume, in per cents
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_volume(newval: number): Promise<number>;
    /**
     * Returns the state of the mute function.
     *
     * @return either YAudioOut.MUTE_FALSE or YAudioOut.MUTE_TRUE, according to the state of the mute function
     *
     * On failure, throws an exception or returns YAudioOut.MUTE_INVALID.
     */
    get_mute(): Promise<YAudioOut.MUTE>;
    /**
     * Changes the state of the mute function. Remember to call the matching module
     * saveToFlash() method to save the setting permanently.
     *
     * @param newval : either YAudioOut.MUTE_FALSE or YAudioOut.MUTE_TRUE, according to the state of the mute function
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_mute(newval: YAudioOut.MUTE): Promise<number>;
    /**
     * Returns the supported volume range. The low value of the
     * range corresponds to the minimal audible value. To
     * completely mute the sound, use set_mute()
     * instead of the set_volume().
     *
     * @return a string corresponding to the supported volume range
     *
     * On failure, throws an exception or returns YAudioOut.VOLUMERANGE_INVALID.
     */
    get_volumeRange(): Promise<string>;
    /**
     * Returns the detected output current level.
     *
     * @return an integer corresponding to the detected output current level
     *
     * On failure, throws an exception or returns YAudioOut.SIGNAL_INVALID.
     */
    get_signal(): Promise<number>;
    /**
     * Returns the number of seconds elapsed without detecting a signal.
     *
     * @return an integer corresponding to the number of seconds elapsed without detecting a signal
     *
     * On failure, throws an exception or returns YAudioOut.NOSIGNALFOR_INVALID.
     */
    get_noSignalFor(): Promise<number>;
    /**
     * Retrieves an audio output for a given identifier.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the audio output is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YAudioOut.isOnline() to test if the audio output is
     * indeed online at a given time. In case of ambiguity when looking for
     * an audio output by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the audio output, for instance
     *         MyDevice.audioOut1.
     *
     * @return a YAudioOut object allowing you to drive the audio output.
     */
    static FindAudioOut(func: string): YAudioOut;
    /**
     * Retrieves an audio output for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the audio output is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YAudioOut.isOnline() to test if the audio output is
     * indeed online at a given time. In case of ambiguity when looking for
     * an audio output by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx : a YAPI context
     * @param func : a string that uniquely characterizes the audio output, for instance
     *         MyDevice.audioOut1.
     *
     * @return a YAudioOut object allowing you to drive the audio output.
     */
    static FindAudioOutInContext(yctx: YAPIContext, func: string): YAudioOut;
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
    registerValueCallback(callback: YAudioOut.ValueCallback | null): Promise<number>;
    _invokeValueCallback(value: string): Promise<number>;
    /**
     * Continues the enumeration of audio outputs started using yFirstAudioOut().
     * Caution: You can't make any assumption about the returned audio outputs order.
     * If you want to find a specific an audio output, use AudioOut.findAudioOut()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YAudioOut object, corresponding to
     *         an audio output currently online, or a null pointer
     *         if there are no more audio outputs to enumerate.
     */
    nextAudioOut(): YAudioOut | null;
    /**
     * Starts the enumeration of audio outputs currently accessible.
     * Use the method YAudioOut.nextAudioOut() to iterate on
     * next audio outputs.
     *
     * @return a pointer to a YAudioOut object, corresponding to
     *         the first audio output currently online, or a null pointer
     *         if there are none.
     */
    static FirstAudioOut(): YAudioOut | null;
    /**
     * Starts the enumeration of audio outputs currently accessible.
     * Use the method YAudioOut.nextAudioOut() to iterate on
     * next audio outputs.
     *
     * @param yctx : a YAPI context.
     *
     * @return a pointer to a YAudioOut object, corresponding to
     *         the first audio output currently online, or a null pointer
     *         if there are none.
     */
    static FirstAudioOutInContext(yctx: YAPIContext): YAudioOut | null;
}
export declare namespace YAudioOut {
    const enum MUTE {
        FALSE = 0,
        TRUE = 1,
        INVALID = -1
    }
    interface ValueCallback {
        (func: YAudioOut, value: string): void;
    }
}
