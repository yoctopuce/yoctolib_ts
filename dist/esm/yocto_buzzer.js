/*********************************************************************
 *
 *  $Id: svn_id $
 *
 *  Implements the high-level API for Buzzer functions
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
//--- (YBuzzer class start)
/**
 * YBuzzer Class: buzzer control interface, available for instance in the Yocto-Buzzer, the
 * Yocto-MaxiBuzzer or the Yocto-MaxiKnob
 *
 * The YBuzzer class allows you to drive a buzzer. You can
 * choose the frequency and the volume at which the buzzer must sound.
 * You can also pre-program a play sequence.
 */
//--- (end of YBuzzer class start)
export class YBuzzer extends YFunction {
    //--- (end of YBuzzer attributes declaration)
    constructor(yapi, func) {
        //--- (YBuzzer constructor)
        super(yapi, func);
        this._frequency = YBuzzer.FREQUENCY_INVALID;
        this._volume = YBuzzer.VOLUME_INVALID;
        this._playSeqSize = YBuzzer.PLAYSEQSIZE_INVALID;
        this._playSeqMaxSize = YBuzzer.PLAYSEQMAXSIZE_INVALID;
        this._playSeqSignature = YBuzzer.PLAYSEQSIGNATURE_INVALID;
        this._command = YBuzzer.COMMAND_INVALID;
        this._valueCallbackBuzzer = null;
        // API symbols as object properties
        this.FREQUENCY_INVALID = YAPI.INVALID_DOUBLE;
        this.VOLUME_INVALID = YAPI.INVALID_UINT;
        this.PLAYSEQSIZE_INVALID = YAPI.INVALID_UINT;
        this.PLAYSEQMAXSIZE_INVALID = YAPI.INVALID_UINT;
        this.PLAYSEQSIGNATURE_INVALID = YAPI.INVALID_UINT;
        this.COMMAND_INVALID = YAPI.INVALID_STRING;
        this._className = 'Buzzer';
        //--- (end of YBuzzer constructor)
    }
    //--- (YBuzzer implementation)
    imm_parseAttr(name, val) {
        switch (name) {
            case 'frequency':
                this._frequency = Math.round(val / 65.536) / 1000.0;
                return 1;
            case 'volume':
                this._volume = val;
                return 1;
            case 'playSeqSize':
                this._playSeqSize = val;
                return 1;
            case 'playSeqMaxSize':
                this._playSeqMaxSize = val;
                return 1;
            case 'playSeqSignature':
                this._playSeqSignature = val;
                return 1;
            case 'command':
                this._command = val;
                return 1;
        }
        return super.imm_parseAttr(name, val);
    }
    /**
     * Changes the frequency of the signal sent to the buzzer. A zero value stops the buzzer.
     *
     * @param newval : a floating point number corresponding to the frequency of the signal sent to the buzzer
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_frequency(newval) {
        let rest_val;
        rest_val = String(Math.round(newval * 65536.0));
        return await this._setAttr('frequency', rest_val);
    }
    /**
     * Returns the  frequency of the signal sent to the buzzer/speaker.
     *
     * @return a floating point number corresponding to the  frequency of the signal sent to the buzzer/speaker
     *
     * On failure, throws an exception or returns YBuzzer.FREQUENCY_INVALID.
     */
    async get_frequency() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YBuzzer.FREQUENCY_INVALID;
            }
        }
        res = this._frequency;
        return res;
    }
    /**
     * Returns the volume of the signal sent to the buzzer/speaker.
     *
     * @return an integer corresponding to the volume of the signal sent to the buzzer/speaker
     *
     * On failure, throws an exception or returns YBuzzer.VOLUME_INVALID.
     */
    async get_volume() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YBuzzer.VOLUME_INVALID;
            }
        }
        res = this._volume;
        return res;
    }
    /**
     * Changes the volume of the signal sent to the buzzer/speaker. Remember to call the
     * saveToFlash() method of the module if the modification must be kept.
     *
     * @param newval : an integer corresponding to the volume of the signal sent to the buzzer/speaker
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_volume(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('volume', rest_val);
    }
    /**
     * Returns the current length of the playing sequence.
     *
     * @return an integer corresponding to the current length of the playing sequence
     *
     * On failure, throws an exception or returns YBuzzer.PLAYSEQSIZE_INVALID.
     */
    async get_playSeqSize() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YBuzzer.PLAYSEQSIZE_INVALID;
            }
        }
        res = this._playSeqSize;
        return res;
    }
    /**
     * Returns the maximum length of the playing sequence.
     *
     * @return an integer corresponding to the maximum length of the playing sequence
     *
     * On failure, throws an exception or returns YBuzzer.PLAYSEQMAXSIZE_INVALID.
     */
    async get_playSeqMaxSize() {
        let res;
        if (this._cacheExpiration == 0) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YBuzzer.PLAYSEQMAXSIZE_INVALID;
            }
        }
        res = this._playSeqMaxSize;
        return res;
    }
    /**
     * Returns the playing sequence signature. As playing
     * sequences cannot be read from the device, this can be used
     * to detect if a specific playing sequence is already
     * programmed.
     *
     * @return an integer corresponding to the playing sequence signature
     *
     * On failure, throws an exception or returns YBuzzer.PLAYSEQSIGNATURE_INVALID.
     */
    async get_playSeqSignature() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YBuzzer.PLAYSEQSIGNATURE_INVALID;
            }
        }
        res = this._playSeqSignature;
        return res;
    }
    async get_command() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YBuzzer.COMMAND_INVALID;
            }
        }
        res = this._command;
        return res;
    }
    async set_command(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('command', rest_val);
    }
    /**
     * Retrieves a buzzer for a given identifier.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the buzzer is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YBuzzer.isOnline() to test if the buzzer is
     * indeed online at a given time. In case of ambiguity when looking for
     * a buzzer by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the buzzer, for instance
     *         YBUZZER2.buzzer.
     *
     * @return a YBuzzer object allowing you to drive the buzzer.
     */
    static FindBuzzer(func) {
        let obj;
        obj = YFunction._FindFromCache('Buzzer', func);
        if (obj == null) {
            obj = new YBuzzer(YAPI, func);
            YFunction._AddToCache('Buzzer', func, obj);
        }
        return obj;
    }
    /**
     * Retrieves a buzzer for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the buzzer is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YBuzzer.isOnline() to test if the buzzer is
     * indeed online at a given time. In case of ambiguity when looking for
     * a buzzer by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx : a YAPI context
     * @param func : a string that uniquely characterizes the buzzer, for instance
     *         YBUZZER2.buzzer.
     *
     * @return a YBuzzer object allowing you to drive the buzzer.
     */
    static FindBuzzerInContext(yctx, func) {
        let obj;
        obj = YFunction._FindFromCacheInContext(yctx, 'Buzzer', func);
        if (obj == null) {
            obj = new YBuzzer(yctx, func);
            YFunction._AddToCache('Buzzer', func, obj);
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
        this._valueCallbackBuzzer = callback;
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
        if (this._valueCallbackBuzzer != null) {
            try {
                await this._valueCallbackBuzzer(this, value);
            }
            catch (e) {
                this._yapi.imm_log('Exception in valueCallback:', e);
            }
        }
        else {
            await super._invokeValueCallback(value);
        }
        return 0;
    }
    async sendCommand(command) {
        return await this.set_command(command);
    }
    /**
     * Adds a new frequency transition to the playing sequence.
     *
     * @param freq    : desired frequency when the transition is completed, in Hz
     * @param msDelay : duration of the frequency transition, in milliseconds.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    async addFreqMoveToPlaySeq(freq, msDelay) {
        return await this.sendCommand('A' + String(Math.round(freq)) + ',' + String(Math.round(msDelay)));
    }
    /**
     * Adds a pulse to the playing sequence.
     *
     * @param freq : pulse frequency, in Hz
     * @param msDuration : pulse duration, in milliseconds.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    async addPulseToPlaySeq(freq, msDuration) {
        return await this.sendCommand('B' + String(Math.round(freq)) + ',' + String(Math.round(msDuration)));
    }
    /**
     * Adds a new volume transition to the playing sequence. Frequency stays untouched:
     * if frequency is at zero, the transition has no effect.
     *
     * @param volume    : desired volume when the transition is completed, as a percentage.
     * @param msDuration : duration of the volume transition, in milliseconds.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    async addVolMoveToPlaySeq(volume, msDuration) {
        return await this.sendCommand('C' + String(Math.round(volume)) + ',' + String(Math.round(msDuration)));
    }
    /**
     * Adds notes to the playing sequence. Notes are provided as text words, separated by
     * spaces. The pitch is specified using the usual letter from A to G. The duration is
     * specified as the divisor of a whole note: 4 for a fourth, 8 for an eight note, etc.
     * Some modifiers are supported: # and b to alter a note pitch,
     * ' and , to move to the upper/lower octave, . to enlarge
     * the note duration.
     *
     * @param notes : notes to be played, as a text string.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    async addNotesToPlaySeq(notes) {
        let tempo;
        let prevPitch;
        let prevDuration;
        let prevFreq;
        let note;
        let num;
        let typ;
        let ascNotes;
        let notesLen;
        let i;
        let ch;
        let dNote;
        let pitch;
        let freq;
        let ms;
        let ms16;
        let rest;
        tempo = 100;
        prevPitch = 3;
        prevDuration = 4;
        prevFreq = 110;
        note = -99;
        num = 0;
        typ = 3;
        ascNotes = this._yapi.imm_str2bin(notes);
        notesLen = (ascNotes).length;
        i = 0;
        while (i < notesLen) {
            ch = ascNotes[i];
            // A (note))
            if (ch == 65) {
                note = 0;
            }
            // B (note)
            if (ch == 66) {
                note = 2;
            }
            // C (note)
            if (ch == 67) {
                note = 3;
            }
            // D (note)
            if (ch == 68) {
                note = 5;
            }
            // E (note)
            if (ch == 69) {
                note = 7;
            }
            // F (note)
            if (ch == 70) {
                note = 8;
            }
            // G (note)
            if (ch == 71) {
                note = 10;
            }
            // '#' (sharp modifier)
            if (ch == 35) {
                note = note + 1;
            }
            // 'b' (flat modifier)
            if (ch == 98) {
                note = note - 1;
            }
            // ' (octave up)
            if (ch == 39) {
                prevPitch = prevPitch + 12;
            }
            // , (octave down)
            if (ch == 44) {
                prevPitch = prevPitch - 12;
            }
            // R (rest)
            if (ch == 82) {
                typ = 0;
            }
            // ! (staccato modifier)
            if (ch == 33) {
                typ = 1;
            }
            // ^ (short modifier)
            if (ch == 94) {
                typ = 2;
            }
            // _ (legato modifier)
            if (ch == 95) {
                typ = 4;
            }
            // - (glissando modifier)
            if (ch == 45) {
                typ = 5;
            }
            // % (tempo change)
            if ((ch == 37) && (num > 0)) {
                tempo = num;
                num = 0;
            }
            if ((ch >= 48) && (ch <= 57)) {
                // 0-9 (number)
                num = (num * 10) + (ch - 48);
            }
            if (ch == 46) {
                // . (duration modifier)
                num = (((num * 2) / (3)) >> 0);
            }
            if (((ch == 32) || (i + 1 == notesLen)) && ((note > -99) || (typ != 3))) {
                if (num == 0) {
                    num = prevDuration;
                }
                else {
                    prevDuration = num;
                }
                ms = Math.round(320000.0 / (tempo * num));
                if (typ == 0) {
                    await this.addPulseToPlaySeq(0, ms);
                }
                else {
                    dNote = note - (((prevPitch) % (12)));
                    if (dNote > 6) {
                        dNote = dNote - 12;
                    }
                    if (dNote <= -6) {
                        dNote = dNote + 12;
                    }
                    pitch = prevPitch + dNote;
                    freq = Math.round(440 * Math.exp(pitch * 0.05776226504666));
                    ms16 = (ms >> 4);
                    rest = 0;
                    if (typ == 3) {
                        rest = 2 * ms16;
                    }
                    if (typ == 2) {
                        rest = 8 * ms16;
                    }
                    if (typ == 1) {
                        rest = 12 * ms16;
                    }
                    if (typ == 5) {
                        await this.addPulseToPlaySeq(prevFreq, ms16);
                        await this.addFreqMoveToPlaySeq(freq, 8 * ms16);
                        await this.addPulseToPlaySeq(freq, ms - 9 * ms16);
                    }
                    else {
                        await this.addPulseToPlaySeq(freq, ms - rest);
                        if (rest > 0) {
                            await this.addPulseToPlaySeq(0, rest);
                        }
                    }
                    prevFreq = freq;
                    prevPitch = pitch;
                }
                note = -99;
                num = 0;
                typ = 3;
            }
            i = i + 1;
        }
        return this._yapi.SUCCESS;
    }
    /**
     * Starts the preprogrammed playing sequence. The sequence
     * runs in loop until it is stopped by stopPlaySeq or an explicit
     * change. To play the sequence only once, use oncePlaySeq().
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    async startPlaySeq() {
        return await this.sendCommand('S');
    }
    /**
     * Stops the preprogrammed playing sequence and sets the frequency to zero.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    async stopPlaySeq() {
        return await this.sendCommand('X');
    }
    /**
     * Resets the preprogrammed playing sequence and sets the frequency to zero.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    async resetPlaySeq() {
        return await this.sendCommand('Z');
    }
    /**
     * Starts the preprogrammed playing sequence and run it once only.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    async oncePlaySeq() {
        return await this.sendCommand('s');
    }
    /**
     * Saves the preprogrammed playing sequence to flash memory.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    async savePlaySeq() {
        return await this.sendCommand('W');
    }
    /**
     * Reloads the preprogrammed playing sequence from the flash memory.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    async reloadPlaySeq() {
        return await this.sendCommand('R');
    }
    /**
     * Activates the buzzer for a short duration.
     *
     * @param frequency : pulse frequency, in hertz
     * @param duration : pulse duration in milliseconds
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async pulse(frequency, duration) {
        return await this.set_command('P' + String(Math.round(frequency)) + ',' + String(Math.round(duration)));
    }
    /**
     * Makes the buzzer frequency change over a period of time.
     *
     * @param frequency : frequency to reach, in hertz. A frequency under 25Hz stops the buzzer.
     * @param duration :  pulse duration in milliseconds
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async freqMove(frequency, duration) {
        return await this.set_command('F' + String(Math.round(frequency)) + ',' + String(Math.round(duration)));
    }
    /**
     * Makes the buzzer volume change over a period of time, frequency  stays untouched.
     *
     * @param volume : volume to reach in %
     * @param duration : change duration in milliseconds
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async volumeMove(volume, duration) {
        return await this.set_command('V' + String(Math.round(volume)) + ',' + String(Math.round(duration)));
    }
    /**
     * Immediately play a note sequence. Notes are provided as text words, separated by
     * spaces. The pitch is specified using the usual letter from A to G. The duration is
     * specified as the divisor of a whole note: 4 for a fourth, 8 for an eight note, etc.
     * Some modifiers are supported: # and b to alter a note pitch,
     * ' and , to move to the upper/lower octave, . to enlarge
     * the note duration.
     *
     * @param notes : notes to be played, as a text string.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    async playNotes(notes) {
        await this.resetPlaySeq();
        await this.addNotesToPlaySeq(notes);
        return await this.oncePlaySeq();
    }
    /**
     * Continues the enumeration of buzzers started using yFirstBuzzer().
     * Caution: You can't make any assumption about the returned buzzers order.
     * If you want to find a specific a buzzer, use Buzzer.findBuzzer()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YBuzzer object, corresponding to
     *         a buzzer currently online, or a null pointer
     *         if there are no more buzzers to enumerate.
     */
    nextBuzzer() {
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != YAPI.SUCCESS)
            return null;
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if (next_hwid == null)
            return null;
        return YBuzzer.FindBuzzerInContext(this._yapi, next_hwid);
    }
    /**
     * Starts the enumeration of buzzers currently accessible.
     * Use the method YBuzzer.nextBuzzer() to iterate on
     * next buzzers.
     *
     * @return a pointer to a YBuzzer object, corresponding to
     *         the first buzzer currently online, or a null pointer
     *         if there are none.
     */
    static FirstBuzzer() {
        let next_hwid = YAPI.imm_getFirstHardwareId('Buzzer');
        if (next_hwid == null)
            return null;
        return YBuzzer.FindBuzzer(next_hwid);
    }
    /**
     * Starts the enumeration of buzzers currently accessible.
     * Use the method YBuzzer.nextBuzzer() to iterate on
     * next buzzers.
     *
     * @param yctx : a YAPI context.
     *
     * @return a pointer to a YBuzzer object, corresponding to
     *         the first buzzer currently online, or a null pointer
     *         if there are none.
     */
    static FirstBuzzerInContext(yctx) {
        let next_hwid = yctx.imm_getFirstHardwareId('Buzzer');
        if (next_hwid == null)
            return null;
        return YBuzzer.FindBuzzerInContext(yctx, next_hwid);
    }
}
// API symbols as static members
YBuzzer.FREQUENCY_INVALID = YAPI.INVALID_DOUBLE;
YBuzzer.VOLUME_INVALID = YAPI.INVALID_UINT;
YBuzzer.PLAYSEQSIZE_INVALID = YAPI.INVALID_UINT;
YBuzzer.PLAYSEQMAXSIZE_INVALID = YAPI.INVALID_UINT;
YBuzzer.PLAYSEQSIGNATURE_INVALID = YAPI.INVALID_UINT;
YBuzzer.COMMAND_INVALID = YAPI.INVALID_STRING;
//# sourceMappingURL=yocto_buzzer.js.map