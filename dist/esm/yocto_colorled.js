/*********************************************************************
 *
 *  $Id: yocto_colorled.ts 43760 2021-02-08 14:33:45Z mvuilleu $
 *
 *  Implements the high-level API for ColorLed functions
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
//--- (YColorLed class start)
/**
 * YColorLed Class: RGB LED control interface, available for instance in the Yocto-Color-V2, the
 * Yocto-MaxiBuzzer or the Yocto-PowerColor
 *
 * The ColorLed class allows you to drive a color LED.
 * The color can be specified using RGB coordinates as well as HSL coordinates.
 * The module performs all conversions form RGB to HSL automatically. It is then
 * self-evident to turn on a LED with a given hue and to progressively vary its
 * saturation or lightness. If needed, you can find more information on the
 * difference between RGB and HSL in the section following this one.
 */
//--- (end of YColorLed class start)
export class YColorLed extends YFunction {
    //--- (end of YColorLed attributes declaration)
    constructor(yapi, func) {
        //--- (YColorLed constructor)
        super(yapi, func);
        this._rgbColor = YColorLed.RGBCOLOR_INVALID;
        this._hslColor = YColorLed.HSLCOLOR_INVALID;
        this._rgbMove = {};
        this._hslMove = {};
        this._rgbColorAtPowerOn = YColorLed.RGBCOLORATPOWERON_INVALID;
        this._blinkSeqSize = YColorLed.BLINKSEQSIZE_INVALID;
        this._blinkSeqMaxSize = YColorLed.BLINKSEQMAXSIZE_INVALID;
        this._blinkSeqSignature = YColorLed.BLINKSEQSIGNATURE_INVALID;
        this._command = YColorLed.COMMAND_INVALID;
        this._valueCallbackColorLed = null;
        // API symbols as object properties
        this.RGBCOLOR_INVALID = YAPI.INVALID_UINT;
        this.HSLCOLOR_INVALID = YAPI.INVALID_UINT;
        this.RGBCOLORATPOWERON_INVALID = YAPI.INVALID_UINT;
        this.BLINKSEQSIZE_INVALID = YAPI.INVALID_UINT;
        this.BLINKSEQMAXSIZE_INVALID = YAPI.INVALID_UINT;
        this.BLINKSEQSIGNATURE_INVALID = YAPI.INVALID_UINT;
        this.COMMAND_INVALID = YAPI.INVALID_STRING;
        this._className = 'ColorLed';
        //--- (end of YColorLed constructor)
    }
    //--- (YColorLed implementation)
    imm_parseAttr(name, val) {
        switch (name) {
            case 'rgbColor':
                this._rgbColor = val;
                return 1;
            case 'hslColor':
                this._hslColor = val;
                return 1;
            case 'rgbMove':
                this._rgbMove = val;
                return 1;
            case 'hslMove':
                this._hslMove = val;
                return 1;
            case 'rgbColorAtPowerOn':
                this._rgbColorAtPowerOn = val;
                return 1;
            case 'blinkSeqSize':
                this._blinkSeqSize = val;
                return 1;
            case 'blinkSeqMaxSize':
                this._blinkSeqMaxSize = val;
                return 1;
            case 'blinkSeqSignature':
                this._blinkSeqSignature = val;
                return 1;
            case 'command':
                this._command = val;
                return 1;
        }
        return super.imm_parseAttr(name, val);
    }
    /**
     * Returns the current RGB color of the LED.
     *
     * @return an integer corresponding to the current RGB color of the LED
     *
     * On failure, throws an exception or returns YColorLed.RGBCOLOR_INVALID.
     */
    async get_rgbColor() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YColorLed.RGBCOLOR_INVALID;
            }
        }
        res = this._rgbColor;
        return res;
    }
    /**
     * Changes the current color of the LED, using an RGB color. Encoding is done as follows: 0xRRGGBB.
     *
     * @param newval : an integer corresponding to the current color of the LED, using an RGB color
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_rgbColor(newval) {
        let rest_val;
        rest_val = '0x' + newval.toString(16);
        return await this._setAttr('rgbColor', rest_val);
    }
    /**
     * Returns the current HSL color of the LED.
     *
     * @return an integer corresponding to the current HSL color of the LED
     *
     * On failure, throws an exception or returns YColorLed.HSLCOLOR_INVALID.
     */
    async get_hslColor() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YColorLed.HSLCOLOR_INVALID;
            }
        }
        res = this._hslColor;
        return res;
    }
    /**
     * Changes the current color of the LED, using a color HSL. Encoding is done as follows: 0xHHSSLL.
     *
     * @param newval : an integer corresponding to the current color of the LED, using a color HSL
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_hslColor(newval) {
        let rest_val;
        rest_val = '0x' + newval.toString(16);
        return await this._setAttr('hslColor', rest_val);
    }
    async get_rgbMove() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YColorLed.RGBMOVE_INVALID;
            }
        }
        res = this._rgbMove;
        return res;
    }
    async set_rgbMove(newval) {
        let rest_val;
        rest_val = String(newval.target) + ':' + String(newval.ms);
        return await this._setAttr('rgbMove', rest_val);
    }
    /**
     * Performs a smooth transition in the RGB color space between the current color and a target color.
     *
     * @param rgb_target  : desired RGB color at the end of the transition
     * @param ms_duration : duration of the transition, in millisecond
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async rgbMove(rgb_target, ms_duration) {
        let rest_val;
        rest_val = String(rgb_target) + ':' + String(ms_duration);
        return await this._setAttr('rgbMove', rest_val);
    }
    async get_hslMove() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YColorLed.HSLMOVE_INVALID;
            }
        }
        res = this._hslMove;
        return res;
    }
    async set_hslMove(newval) {
        let rest_val;
        rest_val = String(newval.target) + ':' + String(newval.ms);
        return await this._setAttr('hslMove', rest_val);
    }
    /**
     * Performs a smooth transition in the HSL color space between the current color and a target color.
     *
     * @param hsl_target  : desired HSL color at the end of the transition
     * @param ms_duration : duration of the transition, in millisecond
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async hslMove(hsl_target, ms_duration) {
        let rest_val;
        rest_val = String(hsl_target) + ':' + String(ms_duration);
        return await this._setAttr('hslMove', rest_val);
    }
    /**
     * Returns the configured color to be displayed when the module is turned on.
     *
     * @return an integer corresponding to the configured color to be displayed when the module is turned on
     *
     * On failure, throws an exception or returns YColorLed.RGBCOLORATPOWERON_INVALID.
     */
    async get_rgbColorAtPowerOn() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YColorLed.RGBCOLORATPOWERON_INVALID;
            }
        }
        res = this._rgbColorAtPowerOn;
        return res;
    }
    /**
     * Changes the color that the LED displays by default when the module is turned on.
     * Remember to call the saveToFlash()
     * method of the module if the modification must be kept.
     *
     * @param newval : an integer corresponding to the color that the LED displays by default when the
     * module is turned on
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_rgbColorAtPowerOn(newval) {
        let rest_val;
        rest_val = '0x' + newval.toString(16);
        return await this._setAttr('rgbColorAtPowerOn', rest_val);
    }
    /**
     * Returns the current length of the blinking sequence.
     *
     * @return an integer corresponding to the current length of the blinking sequence
     *
     * On failure, throws an exception or returns YColorLed.BLINKSEQSIZE_INVALID.
     */
    async get_blinkSeqSize() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YColorLed.BLINKSEQSIZE_INVALID;
            }
        }
        res = this._blinkSeqSize;
        return res;
    }
    /**
     * Returns the maximum length of the blinking sequence.
     *
     * @return an integer corresponding to the maximum length of the blinking sequence
     *
     * On failure, throws an exception or returns YColorLed.BLINKSEQMAXSIZE_INVALID.
     */
    async get_blinkSeqMaxSize() {
        let res;
        if (this._cacheExpiration == 0) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YColorLed.BLINKSEQMAXSIZE_INVALID;
            }
        }
        res = this._blinkSeqMaxSize;
        return res;
    }
    /**
     * Return the blinking sequence signature. Since blinking
     * sequences cannot be read from the device, this can be used
     * to detect if a specific blinking sequence is already
     * programmed.
     *
     * @return an integer
     *
     * On failure, throws an exception or returns YColorLed.BLINKSEQSIGNATURE_INVALID.
     */
    async get_blinkSeqSignature() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YColorLed.BLINKSEQSIGNATURE_INVALID;
            }
        }
        res = this._blinkSeqSignature;
        return res;
    }
    async get_command() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YColorLed.COMMAND_INVALID;
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
     * Retrieves an RGB LED for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the RGB LED is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YColorLed.isOnline() to test if the RGB LED is
     * indeed online at a given time. In case of ambiguity when looking for
     * an RGB LED by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the RGB LED, for instance
     *         YRGBLED2.colorLed1.
     *
     * @return a YColorLed object allowing you to drive the RGB LED.
     */
    static FindColorLed(func) {
        let obj;
        obj = YFunction._FindFromCache('ColorLed', func);
        if (obj == null) {
            obj = new YColorLed(YAPI, func);
            YFunction._AddToCache('ColorLed', func, obj);
        }
        return obj;
    }
    /**
     * Retrieves an RGB LED for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the RGB LED is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YColorLed.isOnline() to test if the RGB LED is
     * indeed online at a given time. In case of ambiguity when looking for
     * an RGB LED by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx : a YAPI context
     * @param func : a string that uniquely characterizes the RGB LED, for instance
     *         YRGBLED2.colorLed1.
     *
     * @return a YColorLed object allowing you to drive the RGB LED.
     */
    static FindColorLedInContext(yctx, func) {
        let obj;
        obj = YFunction._FindFromCacheInContext(yctx, 'ColorLed', func);
        if (obj == null) {
            obj = new YColorLed(yctx, func);
            YFunction._AddToCache('ColorLed', func, obj);
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
        this._valueCallbackColorLed = callback;
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
        if (this._valueCallbackColorLed != null) {
            try {
                await this._valueCallbackColorLed(this, value);
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
    async sendCommand(command) {
        return await this.set_command(command);
    }
    /**
     * Add a new transition to the blinking sequence, the move will
     * be performed in the HSL space.
     *
     * @param HSLcolor : desired HSL color when the transition is completed
     * @param msDelay : duration of the color transition, in milliseconds.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    async addHslMoveToBlinkSeq(HSLcolor, msDelay) {
        return await this.sendCommand('H' + String(Math.round(HSLcolor)) + ',' + String(Math.round(msDelay)));
    }
    /**
     * Adds a new transition to the blinking sequence, the move is
     * performed in the RGB space.
     *
     * @param RGBcolor : desired RGB color when the transition is completed
     * @param msDelay : duration of the color transition, in milliseconds.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    async addRgbMoveToBlinkSeq(RGBcolor, msDelay) {
        return await this.sendCommand('R' + String(Math.round(RGBcolor)) + ',' + String(Math.round(msDelay)));
    }
    /**
     * Starts the preprogrammed blinking sequence. The sequence is
     * run in a loop until it is stopped by stopBlinkSeq or an explicit
     * change.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    async startBlinkSeq() {
        return await this.sendCommand('S');
    }
    /**
     * Stops the preprogrammed blinking sequence.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    async stopBlinkSeq() {
        return await this.sendCommand('X');
    }
    /**
     * Resets the preprogrammed blinking sequence.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    async resetBlinkSeq() {
        return await this.sendCommand('Z');
    }
    /**
     * Continues the enumeration of RGB LEDs started using yFirstColorLed().
     * Caution: You can't make any assumption about the returned RGB LEDs order.
     * If you want to find a specific an RGB LED, use ColorLed.findColorLed()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YColorLed object, corresponding to
     *         an RGB LED currently online, or a null pointer
     *         if there are no more RGB LEDs to enumerate.
     */
    nextColorLed() {
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != YAPI.SUCCESS)
            return null;
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if (next_hwid == null)
            return null;
        return YColorLed.FindColorLedInContext(this._yapi, next_hwid);
    }
    /**
     * Starts the enumeration of RGB LEDs currently accessible.
     * Use the method YColorLed.nextColorLed() to iterate on
     * next RGB LEDs.
     *
     * @return a pointer to a YColorLed object, corresponding to
     *         the first RGB LED currently online, or a null pointer
     *         if there are none.
     */
    static FirstColorLed() {
        let next_hwid = YAPI.imm_getFirstHardwareId('ColorLed');
        if (next_hwid == null)
            return null;
        return YColorLed.FindColorLed(next_hwid);
    }
    /**
     * Starts the enumeration of RGB LEDs currently accessible.
     * Use the method YColorLed.nextColorLed() to iterate on
     * next RGB LEDs.
     *
     * @param yctx : a YAPI context.
     *
     * @return a pointer to a YColorLed object, corresponding to
     *         the first RGB LED currently online, or a null pointer
     *         if there are none.
     */
    static FirstColorLedInContext(yctx) {
        let next_hwid = yctx.imm_getFirstHardwareId('ColorLed');
        if (next_hwid == null)
            return null;
        return YColorLed.FindColorLedInContext(yctx, next_hwid);
    }
}
// API symbols as static members
YColorLed.RGBMOVE_INVALID = {};
YColorLed.HSLMOVE_INVALID = {};
YColorLed.RGBCOLOR_INVALID = YAPI.INVALID_UINT;
YColorLed.HSLCOLOR_INVALID = YAPI.INVALID_UINT;
YColorLed.RGBCOLORATPOWERON_INVALID = YAPI.INVALID_UINT;
YColorLed.BLINKSEQSIZE_INVALID = YAPI.INVALID_UINT;
YColorLed.BLINKSEQMAXSIZE_INVALID = YAPI.INVALID_UINT;
YColorLed.BLINKSEQSIGNATURE_INVALID = YAPI.INVALID_UINT;
YColorLed.COMMAND_INVALID = YAPI.INVALID_STRING;
//# sourceMappingURL=yocto_colorled.js.map