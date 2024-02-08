"use strict";
/*********************************************************************
 *
 *  $Id: yocto_colorledcluster.ts 55359 2023-06-28 09:25:04Z seb $
 *
 *  Implements the high-level API for ColorLedCluster functions
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.YColorLedCluster = void 0;
const yocto_api_js_1 = require("./yocto_api.js");
//--- (YColorLedCluster class start)
/**
 * YColorLedCluster Class: RGB LED cluster control interface, available for instance in the
 * Yocto-Color-V2, the Yocto-MaxiBuzzer or the Yocto-MaxiKnob
 *
 * The YColorLedCluster class allows you to drive a
 * color LED cluster. Unlike the ColorLed class, the YColorLedCluster
 * class allows to handle several LEDs at once. Color changes can be done using RGB
 * coordinates as well as HSL coordinates.
 * The module performs all conversions form RGB to HSL automatically. It is then
 * self-evident to turn on a LED with a given hue and to progressively vary its
 * saturation or lightness. If needed, you can find more information on the
 * difference between RGB and HSL in the section following this one.
 */
//--- (end of YColorLedCluster class start)
class YColorLedCluster extends yocto_api_js_1.YFunction {
    //--- (end of YColorLedCluster attributes declaration)
    constructor(yapi, func) {
        //--- (YColorLedCluster constructor)
        super(yapi, func);
        this._activeLedCount = YColorLedCluster.ACTIVELEDCOUNT_INVALID;
        this._ledType = YColorLedCluster.LEDTYPE_INVALID;
        this._maxLedCount = YColorLedCluster.MAXLEDCOUNT_INVALID;
        this._dynamicLedCount = YColorLedCluster.DYNAMICLEDCOUNT_INVALID;
        this._blinkSeqMaxCount = YColorLedCluster.BLINKSEQMAXCOUNT_INVALID;
        this._blinkSeqMaxSize = YColorLedCluster.BLINKSEQMAXSIZE_INVALID;
        this._command = YColorLedCluster.COMMAND_INVALID;
        this._valueCallbackColorLedCluster = null;
        // API symbols as object properties
        this.ACTIVELEDCOUNT_INVALID = yocto_api_js_1.YAPI.INVALID_UINT;
        this.LEDTYPE_RGB = 0;
        this.LEDTYPE_RGBW = 1;
        this.LEDTYPE_WS2811 = 2;
        this.LEDTYPE_INVALID = -1;
        this.MAXLEDCOUNT_INVALID = yocto_api_js_1.YAPI.INVALID_UINT;
        this.DYNAMICLEDCOUNT_INVALID = yocto_api_js_1.YAPI.INVALID_UINT;
        this.BLINKSEQMAXCOUNT_INVALID = yocto_api_js_1.YAPI.INVALID_UINT;
        this.BLINKSEQMAXSIZE_INVALID = yocto_api_js_1.YAPI.INVALID_UINT;
        this.COMMAND_INVALID = yocto_api_js_1.YAPI.INVALID_STRING;
        this._className = 'ColorLedCluster';
        //--- (end of YColorLedCluster constructor)
    }
    //--- (YColorLedCluster implementation)
    imm_parseAttr(name, val) {
        switch (name) {
            case 'activeLedCount':
                this._activeLedCount = val;
                return 1;
            case 'ledType':
                this._ledType = val;
                return 1;
            case 'maxLedCount':
                this._maxLedCount = val;
                return 1;
            case 'dynamicLedCount':
                this._dynamicLedCount = val;
                return 1;
            case 'blinkSeqMaxCount':
                this._blinkSeqMaxCount = val;
                return 1;
            case 'blinkSeqMaxSize':
                this._blinkSeqMaxSize = val;
                return 1;
            case 'command':
                this._command = val;
                return 1;
        }
        return super.imm_parseAttr(name, val);
    }
    /**
     * Returns the number of LEDs currently handled by the device.
     *
     * @return an integer corresponding to the number of LEDs currently handled by the device
     *
     * On failure, throws an exception or returns YColorLedCluster.ACTIVELEDCOUNT_INVALID.
     */
    async get_activeLedCount() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YColorLedCluster.ACTIVELEDCOUNT_INVALID;
            }
        }
        res = this._activeLedCount;
        return res;
    }
    /**
     * Changes the number of LEDs currently handled by the device.
     * Remember to call the matching module
     * saveToFlash() method to save the setting permanently.
     *
     * @param newval : an integer corresponding to the number of LEDs currently handled by the device
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_activeLedCount(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('activeLedCount', rest_val);
    }
    /**
     * Returns the RGB LED type currently handled by the device.
     *
     * @return a value among YColorLedCluster.LEDTYPE_RGB, YColorLedCluster.LEDTYPE_RGBW and
     * YColorLedCluster.LEDTYPE_WS2811 corresponding to the RGB LED type currently handled by the device
     *
     * On failure, throws an exception or returns YColorLedCluster.LEDTYPE_INVALID.
     */
    async get_ledType() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YColorLedCluster.LEDTYPE_INVALID;
            }
        }
        res = this._ledType;
        return res;
    }
    /**
     * Changes the RGB LED type currently handled by the device.
     * Remember to call the matching module
     * saveToFlash() method to save the setting permanently.
     *
     * @param newval : a value among YColorLedCluster.LEDTYPE_RGB, YColorLedCluster.LEDTYPE_RGBW and
     * YColorLedCluster.LEDTYPE_WS2811 corresponding to the RGB LED type currently handled by the device
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_ledType(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('ledType', rest_val);
    }
    /**
     * Returns the maximum number of LEDs that the device can handle.
     *
     * @return an integer corresponding to the maximum number of LEDs that the device can handle
     *
     * On failure, throws an exception or returns YColorLedCluster.MAXLEDCOUNT_INVALID.
     */
    async get_maxLedCount() {
        let res;
        if (this._cacheExpiration == 0) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YColorLedCluster.MAXLEDCOUNT_INVALID;
            }
        }
        res = this._maxLedCount;
        return res;
    }
    /**
     * Returns the maximum number of LEDs that can perform autonomous transitions and sequences.
     *
     * @return an integer corresponding to the maximum number of LEDs that can perform autonomous
     * transitions and sequences
     *
     * On failure, throws an exception or returns YColorLedCluster.DYNAMICLEDCOUNT_INVALID.
     */
    async get_dynamicLedCount() {
        let res;
        if (this._cacheExpiration == 0) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YColorLedCluster.DYNAMICLEDCOUNT_INVALID;
            }
        }
        res = this._dynamicLedCount;
        return res;
    }
    /**
     * Returns the maximum number of sequences that the device can handle.
     *
     * @return an integer corresponding to the maximum number of sequences that the device can handle
     *
     * On failure, throws an exception or returns YColorLedCluster.BLINKSEQMAXCOUNT_INVALID.
     */
    async get_blinkSeqMaxCount() {
        let res;
        if (this._cacheExpiration == 0) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YColorLedCluster.BLINKSEQMAXCOUNT_INVALID;
            }
        }
        res = this._blinkSeqMaxCount;
        return res;
    }
    /**
     * Returns the maximum length of sequences.
     *
     * @return an integer corresponding to the maximum length of sequences
     *
     * On failure, throws an exception or returns YColorLedCluster.BLINKSEQMAXSIZE_INVALID.
     */
    async get_blinkSeqMaxSize() {
        let res;
        if (this._cacheExpiration == 0) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YColorLedCluster.BLINKSEQMAXSIZE_INVALID;
            }
        }
        res = this._blinkSeqMaxSize;
        return res;
    }
    async get_command() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YColorLedCluster.COMMAND_INVALID;
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
     * Retrieves a RGB LED cluster for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the RGB LED cluster is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YColorLedCluster.isOnline() to test if the RGB LED cluster is
     * indeed online at a given time. In case of ambiguity when looking for
     * a RGB LED cluster by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the RGB LED cluster, for instance
     *         YRGBLED2.colorLedCluster.
     *
     * @return a YColorLedCluster object allowing you to drive the RGB LED cluster.
     */
    static FindColorLedCluster(func) {
        let obj;
        obj = yocto_api_js_1.YFunction._FindFromCache('ColorLedCluster', func);
        if (obj == null) {
            obj = new YColorLedCluster(yocto_api_js_1.YAPI, func);
            yocto_api_js_1.YFunction._AddToCache('ColorLedCluster', func, obj);
        }
        return obj;
    }
    /**
     * Retrieves a RGB LED cluster for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the RGB LED cluster is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YColorLedCluster.isOnline() to test if the RGB LED cluster is
     * indeed online at a given time. In case of ambiguity when looking for
     * a RGB LED cluster by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx : a YAPI context
     * @param func : a string that uniquely characterizes the RGB LED cluster, for instance
     *         YRGBLED2.colorLedCluster.
     *
     * @return a YColorLedCluster object allowing you to drive the RGB LED cluster.
     */
    static FindColorLedClusterInContext(yctx, func) {
        let obj;
        obj = yocto_api_js_1.YFunction._FindFromCacheInContext(yctx, 'ColorLedCluster', func);
        if (obj == null) {
            obj = new YColorLedCluster(yctx, func);
            yocto_api_js_1.YFunction._AddToCache('ColorLedCluster', func, obj);
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
            await yocto_api_js_1.YFunction._UpdateValueCallbackList(this, true);
        }
        else {
            await yocto_api_js_1.YFunction._UpdateValueCallbackList(this, false);
        }
        this._valueCallbackColorLedCluster = callback;
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
        if (this._valueCallbackColorLedCluster != null) {
            try {
                await this._valueCallbackColorLedCluster(this, value);
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
     * Changes the current color of consecutive LEDs in the cluster, using a RGB color. Encoding is done
     * as follows: 0xRRGGBB.
     *
     * @param ledIndex :  index of the first affected LED.
     * @param count    :  affected LED count.
     * @param rgbValue :  new color.
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_rgbColor(ledIndex, count, rgbValue) {
        return await this.sendCommand('SR' + String(Math.round(ledIndex)) + ',' + String(Math.round(count)) + ',' + (rgbValue).toString(16).toLowerCase());
    }
    /**
     * Changes the  color at device startup of consecutive LEDs in the cluster, using a RGB color.
     * Encoding is done as follows: 0xRRGGBB. Don't forget to call saveLedsConfigAtPowerOn()
     * to make sure the modification is saved in the device flash memory.
     *
     * @param ledIndex :  index of the first affected LED.
     * @param count    :  affected LED count.
     * @param rgbValue :  new color.
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_rgbColorAtPowerOn(ledIndex, count, rgbValue) {
        return await this.sendCommand('SC' + String(Math.round(ledIndex)) + ',' + String(Math.round(count)) + ',' + (rgbValue).toString(16).toLowerCase());
    }
    /**
     * Changes the  color at device startup of consecutive LEDs in the cluster, using a HSL color.
     * Encoding is done as follows: 0xHHSSLL. Don't forget to call saveLedsConfigAtPowerOn()
     * to make sure the modification is saved in the device flash memory.
     *
     * @param ledIndex :  index of the first affected LED.
     * @param count    :  affected LED count.
     * @param hslValue :  new color.
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_hslColorAtPowerOn(ledIndex, count, hslValue) {
        let rgbValue;
        rgbValue = await this.hsl2rgb(hslValue);
        return await this.sendCommand('SC' + String(Math.round(ledIndex)) + ',' + String(Math.round(count)) + ',' + (rgbValue).toString(16).toLowerCase());
    }
    /**
     * Changes the current color of consecutive LEDs in the cluster, using a HSL color. Encoding is done
     * as follows: 0xHHSSLL.
     *
     * @param ledIndex :  index of the first affected LED.
     * @param count    :  affected LED count.
     * @param hslValue :  new color.
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_hslColor(ledIndex, count, hslValue) {
        return await this.sendCommand('SH' + String(Math.round(ledIndex)) + ',' + String(Math.round(count)) + ',' + (hslValue).toString(16).toLowerCase());
    }
    /**
     * Allows you to modify the current color of a group of adjacent LEDs to another color, in a seamless and
     * autonomous manner. The transition is performed in the RGB space.
     *
     * @param ledIndex :  index of the first affected LED.
     * @param count    :  affected LED count.
     * @param rgbValue :  new color (0xRRGGBB).
     * @param delay    :  transition duration in ms
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async rgb_move(ledIndex, count, rgbValue, delay) {
        return await this.sendCommand('MR' + String(Math.round(ledIndex)) + ',' + String(Math.round(count)) + ',' + (rgbValue).toString(16).toLowerCase() + ',' + String(Math.round(delay)));
    }
    /**
     * Allows you to modify the current color of a group of adjacent LEDs  to another color, in a seamless and
     * autonomous manner. The transition is performed in the HSL space. In HSL, hue is a circular
     * value (0..360°). There are always two paths to perform the transition: by increasing
     * or by decreasing the hue. The module selects the shortest transition.
     * If the difference is exactly 180°, the module selects the transition which increases
     * the hue.
     *
     * @param ledIndex :  index of the first affected LED.
     * @param count    :  affected LED count.
     * @param hslValue :  new color (0xHHSSLL).
     * @param delay    :  transition duration in ms
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async hsl_move(ledIndex, count, hslValue, delay) {
        return await this.sendCommand('MH' + String(Math.round(ledIndex)) + ',' + String(Math.round(count)) + ',' + (hslValue).toString(16).toLowerCase() + ',' + String(Math.round(delay)));
    }
    /**
     * Adds an RGB transition to a sequence. A sequence is a transition list, which can
     * be executed in loop by a group of LEDs.  Sequences are persistent and are saved
     * in the device flash memory as soon as the saveBlinkSeq() method is called.
     *
     * @param seqIndex :  sequence index.
     * @param rgbValue :  target color (0xRRGGBB)
     * @param delay    :  transition duration in ms
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async addRgbMoveToBlinkSeq(seqIndex, rgbValue, delay) {
        return await this.sendCommand('AR' + String(Math.round(seqIndex)) + ',' + (rgbValue).toString(16).toLowerCase() + ',' + String(Math.round(delay)));
    }
    /**
     * Adds an HSL transition to a sequence. A sequence is a transition list, which can
     * be executed in loop by an group of LEDs.  Sequences are persistent and are saved
     * in the device flash memory as soon as the saveBlinkSeq() method is called.
     *
     * @param seqIndex : sequence index.
     * @param hslValue : target color (0xHHSSLL)
     * @param delay    : transition duration in ms
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async addHslMoveToBlinkSeq(seqIndex, hslValue, delay) {
        return await this.sendCommand('AH' + String(Math.round(seqIndex)) + ',' + (hslValue).toString(16).toLowerCase() + ',' + String(Math.round(delay)));
    }
    /**
     * Adds a mirror ending to a sequence. When the sequence will reach the end of the last
     * transition, its running speed will automatically be reversed so that the sequence plays
     * in the reverse direction, like in a mirror. After the first transition of the sequence
     * is played at the end of the reverse execution, the sequence starts again in
     * the initial direction.
     *
     * @param seqIndex : sequence index.
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async addMirrorToBlinkSeq(seqIndex) {
        return await this.sendCommand('AC' + String(Math.round(seqIndex)) + ',0,0');
    }
    /**
     * Adds to a sequence a jump to another sequence. When a pixel will reach this jump,
     * it will be automatically relinked to the new sequence, and will run it starting
     * from the beginning.
     *
     * @param seqIndex : sequence index.
     * @param linkSeqIndex : index of the sequence to chain.
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async addJumpToBlinkSeq(seqIndex, linkSeqIndex) {
        return await this.sendCommand('AC' + String(Math.round(seqIndex)) + ',100,' + String(Math.round(linkSeqIndex)) + ',1000');
    }
    /**
     * Adds a to a sequence a hard stop code. When a pixel will reach this stop code,
     * instead of restarting the sequence in a loop it will automatically be unlinked
     * from the sequence.
     *
     * @param seqIndex : sequence index.
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async addUnlinkToBlinkSeq(seqIndex) {
        return await this.sendCommand('AC' + String(Math.round(seqIndex)) + ',100,-1,1000');
    }
    /**
     * Links adjacent LEDs to a specific sequence. These LEDs start to execute
     * the sequence as soon as  startBlinkSeq is called. It is possible to add an offset
     * in the execution: that way we  can have several groups of LED executing the same
     * sequence, with a  temporal offset. A LED cannot be linked to more than one sequence.
     *
     * @param ledIndex :  index of the first affected LED.
     * @param count    :  affected LED count.
     * @param seqIndex :  sequence index.
     * @param offset   :  execution offset in ms.
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async linkLedToBlinkSeq(ledIndex, count, seqIndex, offset) {
        return await this.sendCommand('LS' + String(Math.round(ledIndex)) + ',' + String(Math.round(count)) + ',' + String(Math.round(seqIndex)) + ',' + String(Math.round(offset)));
    }
    /**
     * Links adjacent LEDs to a specific sequence at device power-on. Don't forget to configure
     * the sequence auto start flag as well and call saveLedsConfigAtPowerOn(). It is possible to add an offset
     * in the execution: that way we  can have several groups of LEDs executing the same
     * sequence, with a  temporal offset. A LED cannot be linked to more than one sequence.
     *
     * @param ledIndex :  index of the first affected LED.
     * @param count    :  affected LED count.
     * @param seqIndex :  sequence index.
     * @param offset   :  execution offset in ms.
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async linkLedToBlinkSeqAtPowerOn(ledIndex, count, seqIndex, offset) {
        return await this.sendCommand('LO' + String(Math.round(ledIndex)) + ',' + String(Math.round(count)) + ',' + String(Math.round(seqIndex)) + ',' + String(Math.round(offset)));
    }
    /**
     * Links adjacent LEDs to a specific sequence. These LED start to execute
     * the sequence as soon as  startBlinkSeq is called. This function automatically
     * introduces a shift between LEDs so that the specified number of sequence periods
     * appears on the group of LEDs (wave effect).
     *
     * @param ledIndex :  index of the first affected LED.
     * @param count    :  affected LED count.
     * @param seqIndex :  sequence index.
     * @param periods  :  number of periods to show on LEDs.
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async linkLedToPeriodicBlinkSeq(ledIndex, count, seqIndex, periods) {
        return await this.sendCommand('LP' + String(Math.round(ledIndex)) + ',' + String(Math.round(count)) + ',' + String(Math.round(seqIndex)) + ',' + String(Math.round(periods)));
    }
    /**
     * Unlinks adjacent LEDs from a  sequence.
     *
     * @param ledIndex  :  index of the first affected LED.
     * @param count     :  affected LED count.
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async unlinkLedFromBlinkSeq(ledIndex, count) {
        return await this.sendCommand('US' + String(Math.round(ledIndex)) + ',' + String(Math.round(count)));
    }
    /**
     * Starts a sequence execution: every LED linked to that sequence starts to
     * run it in a loop. Note that a sequence with a zero duration can't be started.
     *
     * @param seqIndex :  index of the sequence to start.
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async startBlinkSeq(seqIndex) {
        return await this.sendCommand('SS' + String(Math.round(seqIndex)));
    }
    /**
     * Stops a sequence execution. If started again, the execution
     * restarts from the beginning.
     *
     * @param seqIndex :  index of the sequence to stop.
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async stopBlinkSeq(seqIndex) {
        return await this.sendCommand('XS' + String(Math.round(seqIndex)));
    }
    /**
     * Stops a sequence execution and resets its contents. LEDs linked to this
     * sequence are not automatically updated anymore.
     *
     * @param seqIndex :  index of the sequence to reset
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async resetBlinkSeq(seqIndex) {
        return await this.sendCommand('ZS' + String(Math.round(seqIndex)));
    }
    /**
     * Configures a sequence to make it start automatically at device
     * startup. Note that a sequence with a zero duration can't be started.
     * Don't forget to call saveBlinkSeq() to make sure the
     * modification is saved in the device flash memory.
     *
     * @param seqIndex :  index of the sequence to reset.
     * @param autostart : 0 to keep the sequence turned off and 1 to start it automatically.
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_blinkSeqStateAtPowerOn(seqIndex, autostart) {
        return await this.sendCommand('AS' + String(Math.round(seqIndex)) + ',' + String(Math.round(autostart)));
    }
    /**
     * Changes the execution speed of a sequence. The natural execution speed is 1000 per
     * thousand. If you configure a slower speed, you can play the sequence in slow-motion.
     * If you set a negative speed, you can play the sequence in reverse direction.
     *
     * @param seqIndex :  index of the sequence to start.
     * @param speed :     sequence running speed (-1000...1000).
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_blinkSeqSpeed(seqIndex, speed) {
        return await this.sendCommand('CS' + String(Math.round(seqIndex)) + ',' + String(Math.round(speed)));
    }
    /**
     * Saves the LEDs power-on configuration. This includes the start-up color or
     * sequence binding for all LEDs. Warning: if some LEDs are linked to a sequence, the
     * method saveBlinkSeq() must also be called to save the sequence definition.
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async saveLedsConfigAtPowerOn() {
        return await this.sendCommand('WL');
    }
    async saveLedsState() {
        return await this.sendCommand('WL');
    }
    /**
     * Saves the definition of a sequence. Warning: only sequence steps and flags are saved.
     * to save the LEDs startup bindings, the method saveLedsConfigAtPowerOn()
     * must be called.
     *
     * @param seqIndex :  index of the sequence to start.
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async saveBlinkSeq(seqIndex) {
        return await this.sendCommand('WS' + String(Math.round(seqIndex)));
    }
    /**
     * Sends a binary buffer to the LED RGB buffer, as is.
     * First three bytes are RGB components for LED specified as parameter, the
     * next three bytes for the next LED, etc.
     *
     * @param ledIndex : index of the first LED which should be updated
     * @param buff : the binary buffer to send
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_rgbColorBuffer(ledIndex, buff) {
        return await this._upload('rgb:0:' + String(Math.round(ledIndex)), buff);
    }
    /**
     * Sends 24bit RGB colors (provided as a list of integers) to the LED RGB buffer, as is.
     * The first number represents the RGB value of the LED specified as parameter, the second
     * number represents the RGB value of the next LED, etc.
     *
     * @param ledIndex : index of the first LED which should be updated
     * @param rgbList : a list of 24bit RGB codes, in the form 0xRRGGBB
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_rgbColorArray(ledIndex, rgbList) {
        let listlen;
        let buff;
        let idx;
        let rgb;
        let res;
        listlen = rgbList.length;
        buff = new Uint8Array(3 * listlen);
        idx = 0;
        while (idx < listlen) {
            rgb = rgbList[idx];
            buff.set([((((rgb) >> (16))) & (255))], 3 * idx);
            buff.set([((((rgb) >> (8))) & (255))], 3 * idx + 1);
            buff.set([((rgb) & (255))], 3 * idx + 2);
            idx = idx + 1;
        }
        res = await this._upload('rgb:0:' + String(Math.round(ledIndex)), buff);
        return res;
    }
    /**
     * Sets up a smooth RGB color transition to the specified pixel-by-pixel list of RGB
     * color codes. The first color code represents the target RGB value of the first LED,
     * the next color code represents the target value of the next LED, etc.
     *
     * @param ledIndex : index of the first LED which should be updated
     * @param rgbList : a list of target 24bit RGB codes, in the form 0xRRGGBB
     * @param delay   : transition duration in ms
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async rgbArrayOfs_move(ledIndex, rgbList, delay) {
        let listlen;
        let buff;
        let idx;
        let rgb;
        let res;
        listlen = rgbList.length;
        buff = new Uint8Array(3 * listlen);
        idx = 0;
        while (idx < listlen) {
            rgb = rgbList[idx];
            buff.set([((((rgb) >> (16))) & (255))], 3 * idx);
            buff.set([((((rgb) >> (8))) & (255))], 3 * idx + 1);
            buff.set([((rgb) & (255))], 3 * idx + 2);
            idx = idx + 1;
        }
        res = await this._upload('rgb:' + String(Math.round(delay)) + ':' + String(Math.round(ledIndex)), buff);
        return res;
    }
    /**
     * Sets up a smooth RGB color transition to the specified pixel-by-pixel list of RGB
     * color codes. The first color code represents the target RGB value of the first LED,
     * the next color code represents the target value of the next LED, etc.
     *
     * @param rgbList : a list of target 24bit RGB codes, in the form 0xRRGGBB
     * @param delay   : transition duration in ms
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async rgbArray_move(rgbList, delay) {
        let res;
        res = await this.rgbArrayOfs_move(0, rgbList, delay);
        return res;
    }
    /**
     * Sends a binary buffer to the LED HSL buffer, as is.
     * First three bytes are HSL components for the LED specified as parameter, the
     * next three bytes for the second LED, etc.
     *
     * @param ledIndex : index of the first LED which should be updated
     * @param buff : the binary buffer to send
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_hslColorBuffer(ledIndex, buff) {
        return await this._upload('hsl:0:' + String(Math.round(ledIndex)), buff);
    }
    /**
     * Sends 24bit HSL colors (provided as a list of integers) to the LED HSL buffer, as is.
     * The first number represents the HSL value of the LED specified as parameter, the second number represents
     * the HSL value of the second LED, etc.
     *
     * @param ledIndex : index of the first LED which should be updated
     * @param hslList : a list of 24bit HSL codes, in the form 0xHHSSLL
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_hslColorArray(ledIndex, hslList) {
        let listlen;
        let buff;
        let idx;
        let hsl;
        let res;
        listlen = hslList.length;
        buff = new Uint8Array(3 * listlen);
        idx = 0;
        while (idx < listlen) {
            hsl = hslList[idx];
            buff.set([((((hsl) >> (16))) & (255))], 3 * idx);
            buff.set([((((hsl) >> (8))) & (255))], 3 * idx + 1);
            buff.set([((hsl) & (255))], 3 * idx + 2);
            idx = idx + 1;
        }
        res = await this._upload('hsl:0:' + String(Math.round(ledIndex)), buff);
        return res;
    }
    /**
     * Sets up a smooth HSL color transition to the specified pixel-by-pixel list of HSL
     * color codes. The first color code represents the target HSL value of the first LED,
     * the second color code represents the target value of the second LED, etc.
     *
     * @param hslList : a list of target 24bit HSL codes, in the form 0xHHSSLL
     * @param delay   : transition duration in ms
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async hslArray_move(hslList, delay) {
        let res;
        res = await this.hslArrayOfs_move(0, hslList, delay);
        return res;
    }
    /**
     * Sets up a smooth HSL color transition to the specified pixel-by-pixel list of HSL
     * color codes. The first color code represents the target HSL value of the first LED,
     * the second color code represents the target value of the second LED, etc.
     *
     * @param ledIndex : index of the first LED which should be updated
     * @param hslList : a list of target 24bit HSL codes, in the form 0xHHSSLL
     * @param delay   : transition duration in ms
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async hslArrayOfs_move(ledIndex, hslList, delay) {
        let listlen;
        let buff;
        let idx;
        let hsl;
        let res;
        listlen = hslList.length;
        buff = new Uint8Array(3 * listlen);
        idx = 0;
        while (idx < listlen) {
            hsl = hslList[idx];
            buff.set([((((hsl) >> (16))) & (255))], 3 * idx);
            buff.set([((((hsl) >> (8))) & (255))], 3 * idx + 1);
            buff.set([((hsl) & (255))], 3 * idx + 2);
            idx = idx + 1;
        }
        res = await this._upload('hsl:' + String(Math.round(delay)) + ':' + String(Math.round(ledIndex)), buff);
        return res;
    }
    /**
     * Returns a binary buffer with content from the LED RGB buffer, as is.
     * First three bytes are RGB components for the first LED in the interval,
     * the next three bytes for the second LED in the interval, etc.
     *
     * @param ledIndex : index of the first LED which should be returned
     * @param count    : number of LEDs which should be returned
     *
     * @return a binary buffer with RGB components of selected LEDs.
     *
     * On failure, throws an exception or returns an empty binary buffer.
     */
    async get_rgbColorBuffer(ledIndex, count) {
        return await this._download('rgb.bin?typ=0&pos=' + String(Math.round(3 * ledIndex)) + '&len=' + String(Math.round(3 * count)));
    }
    /**
     * Returns a list on 24bit RGB color values with the current colors displayed on
     * the RGB LEDs. The first number represents the RGB value of the first LED,
     * the second number represents the RGB value of the second LED, etc.
     *
     * @param ledIndex : index of the first LED which should be returned
     * @param count    : number of LEDs which should be returned
     *
     * @return a list of 24bit color codes with RGB components of selected LEDs, as 0xRRGGBB.
     *
     * On failure, throws an exception or returns an empty array.
     */
    async get_rgbColorArray(ledIndex, count) {
        let buff;
        let res = [];
        let idx;
        let r;
        let g;
        let b;
        buff = await this._download('rgb.bin?typ=0&pos=' + String(Math.round(3 * ledIndex)) + '&len=' + String(Math.round(3 * count)));
        res.length = 0;
        idx = 0;
        while (idx < count) {
            r = buff[3 * idx];
            g = buff[3 * idx + 1];
            b = buff[3 * idx + 2];
            res.push(r * 65536 + g * 256 + b);
            idx = idx + 1;
        }
        return res;
    }
    /**
     * Returns a list on 24bit RGB color values with the RGB LEDs startup colors.
     * The first number represents the startup RGB value of the first LED,
     * the second number represents the RGB value of the second LED, etc.
     *
     * @param ledIndex : index of the first LED  which should be returned
     * @param count    : number of LEDs which should be returned
     *
     * @return a list of 24bit color codes with RGB components of selected LEDs, as 0xRRGGBB.
     *
     * On failure, throws an exception or returns an empty array.
     */
    async get_rgbColorArrayAtPowerOn(ledIndex, count) {
        let buff;
        let res = [];
        let idx;
        let r;
        let g;
        let b;
        buff = await this._download('rgb.bin?typ=4&pos=' + String(Math.round(3 * ledIndex)) + '&len=' + String(Math.round(3 * count)));
        res.length = 0;
        idx = 0;
        while (idx < count) {
            r = buff[3 * idx];
            g = buff[3 * idx + 1];
            b = buff[3 * idx + 2];
            res.push(r * 65536 + g * 256 + b);
            idx = idx + 1;
        }
        return res;
    }
    /**
     * Returns a list on sequence index for each RGB LED. The first number represents the
     * sequence index for the the first LED, the second number represents the sequence
     * index for the second LED, etc.
     *
     * @param ledIndex : index of the first LED which should be returned
     * @param count    : number of LEDs which should be returned
     *
     * @return a list of integers with sequence index
     *
     * On failure, throws an exception or returns an empty array.
     */
    async get_linkedSeqArray(ledIndex, count) {
        let buff;
        let res = [];
        let idx;
        let seq;
        buff = await this._download('rgb.bin?typ=1&pos=' + String(Math.round(ledIndex)) + '&len=' + String(Math.round(count)));
        res.length = 0;
        idx = 0;
        while (idx < count) {
            seq = buff[idx];
            res.push(seq);
            idx = idx + 1;
        }
        return res;
    }
    /**
     * Returns a list on 32 bit signatures for specified blinking sequences.
     * Since blinking sequences cannot be read from the device, this can be used
     * to detect if a specific blinking sequence is already programmed.
     *
     * @param seqIndex : index of the first blinking sequence which should be returned
     * @param count    : number of blinking sequences which should be returned
     *
     * @return a list of 32 bit integer signatures
     *
     * On failure, throws an exception or returns an empty array.
     */
    async get_blinkSeqSignatures(seqIndex, count) {
        let buff;
        let res = [];
        let idx;
        let hh;
        let hl;
        let lh;
        let ll;
        buff = await this._download('rgb.bin?typ=2&pos=' + String(Math.round(4 * seqIndex)) + '&len=' + String(Math.round(4 * count)));
        res.length = 0;
        idx = 0;
        while (idx < count) {
            hh = buff[4 * idx];
            hl = buff[4 * idx + 1];
            lh = buff[4 * idx + 2];
            ll = buff[4 * idx + 3];
            res.push(((hh) << (24)) + ((hl) << (16)) + ((lh) << (8)) + ll);
            idx = idx + 1;
        }
        return res;
    }
    /**
     * Returns a list of integers with the current speed for specified blinking sequences.
     *
     * @param seqIndex : index of the first sequence speed which should be returned
     * @param count    : number of sequence speeds which should be returned
     *
     * @return a list of integers, 0 for sequences turned off and 1 for sequences running
     *
     * On failure, throws an exception or returns an empty array.
     */
    async get_blinkSeqStateSpeed(seqIndex, count) {
        let buff;
        let res = [];
        let idx;
        let lh;
        let ll;
        buff = await this._download('rgb.bin?typ=6&pos=' + String(Math.round(seqIndex)) + '&len=' + String(Math.round(count)));
        res.length = 0;
        idx = 0;
        while (idx < count) {
            lh = buff[2 * idx];
            ll = buff[2 * idx + 1];
            res.push(((lh) << (8)) + ll);
            idx = idx + 1;
        }
        return res;
    }
    /**
     * Returns a list of integers with the "auto-start at power on" flag state for specified blinking sequences.
     *
     * @param seqIndex : index of the first blinking sequence which should be returned
     * @param count    : number of blinking sequences which should be returned
     *
     * @return a list of integers, 0 for sequences turned off and 1 for sequences running
     *
     * On failure, throws an exception or returns an empty array.
     */
    async get_blinkSeqStateAtPowerOn(seqIndex, count) {
        let buff;
        let res = [];
        let idx;
        let started;
        buff = await this._download('rgb.bin?typ=5&pos=' + String(Math.round(seqIndex)) + '&len=' + String(Math.round(count)));
        res.length = 0;
        idx = 0;
        while (idx < count) {
            started = buff[idx];
            res.push(started);
            idx = idx + 1;
        }
        return res;
    }
    /**
     * Returns a list of integers with the started state for specified blinking sequences.
     *
     * @param seqIndex : index of the first blinking sequence which should be returned
     * @param count    : number of blinking sequences which should be returned
     *
     * @return a list of integers, 0 for sequences turned off and 1 for sequences running
     *
     * On failure, throws an exception or returns an empty array.
     */
    async get_blinkSeqState(seqIndex, count) {
        let buff;
        let res = [];
        let idx;
        let started;
        buff = await this._download('rgb.bin?typ=3&pos=' + String(Math.round(seqIndex)) + '&len=' + String(Math.round(count)));
        res.length = 0;
        idx = 0;
        while (idx < count) {
            started = buff[idx];
            res.push(started);
            idx = idx + 1;
        }
        return res;
    }
    async hsl2rgbInt(temp1, temp2, temp3) {
        if (temp3 >= 170) {
            return ((((temp1 + 127)) / (255)) >> 0);
        }
        if (temp3 > 42) {
            if (temp3 <= 127) {
                return ((((temp2 + 127)) / (255)) >> 0);
            }
            temp3 = 170 - temp3;
        }
        return ((((temp1 * 255 + (temp2 - temp1) * (6 * temp3) + 32512)) / (65025)) >> 0);
    }
    async hsl2rgb(hslValue) {
        let R;
        let G;
        let B;
        let H;
        let S;
        let L;
        let temp1;
        let temp2;
        let temp3;
        let res;
        L = ((hslValue) & (0xff));
        S = ((((hslValue) >> (8))) & (0xff));
        H = ((((hslValue) >> (16))) & (0xff));
        if (S == 0) {
            res = ((L) << (16)) + ((L) << (8)) + L;
            return res;
        }
        if (L <= 127) {
            temp2 = L * (255 + S);
        }
        else {
            temp2 = (L + S) * 255 - L * S;
        }
        temp1 = 510 * L - temp2;
        // R
        temp3 = (H + 85);
        if (temp3 > 255) {
            temp3 = temp3 - 255;
        }
        R = await this.hsl2rgbInt(temp1, temp2, temp3);
        // G
        temp3 = H;
        if (temp3 > 255) {
            temp3 = temp3 - 255;
        }
        G = await this.hsl2rgbInt(temp1, temp2, temp3);
        // B
        if (H >= 85) {
            temp3 = H - 85;
        }
        else {
            temp3 = H + 170;
        }
        B = await this.hsl2rgbInt(temp1, temp2, temp3);
        // just in case
        if (R > 255) {
            R = 255;
        }
        if (G > 255) {
            G = 255;
        }
        if (B > 255) {
            B = 255;
        }
        res = ((R) << (16)) + ((G) << (8)) + B;
        return res;
    }
    /**
     * Continues the enumeration of RGB LED clusters started using yFirstColorLedCluster().
     * Caution: You can't make any assumption about the returned RGB LED clusters order.
     * If you want to find a specific a RGB LED cluster, use ColorLedCluster.findColorLedCluster()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YColorLedCluster object, corresponding to
     *         a RGB LED cluster currently online, or a null pointer
     *         if there are no more RGB LED clusters to enumerate.
     */
    nextColorLedCluster() {
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != yocto_api_js_1.YAPI.SUCCESS)
            return null;
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if (next_hwid == null)
            return null;
        return YColorLedCluster.FindColorLedClusterInContext(this._yapi, next_hwid);
    }
    /**
     * Starts the enumeration of RGB LED clusters currently accessible.
     * Use the method YColorLedCluster.nextColorLedCluster() to iterate on
     * next RGB LED clusters.
     *
     * @return a pointer to a YColorLedCluster object, corresponding to
     *         the first RGB LED cluster currently online, or a null pointer
     *         if there are none.
     */
    static FirstColorLedCluster() {
        let next_hwid = yocto_api_js_1.YAPI.imm_getFirstHardwareId('ColorLedCluster');
        if (next_hwid == null)
            return null;
        return YColorLedCluster.FindColorLedCluster(next_hwid);
    }
    /**
     * Starts the enumeration of RGB LED clusters currently accessible.
     * Use the method YColorLedCluster.nextColorLedCluster() to iterate on
     * next RGB LED clusters.
     *
     * @param yctx : a YAPI context.
     *
     * @return a pointer to a YColorLedCluster object, corresponding to
     *         the first RGB LED cluster currently online, or a null pointer
     *         if there are none.
     */
    static FirstColorLedClusterInContext(yctx) {
        let next_hwid = yctx.imm_getFirstHardwareId('ColorLedCluster');
        if (next_hwid == null)
            return null;
        return YColorLedCluster.FindColorLedClusterInContext(yctx, next_hwid);
    }
}
exports.YColorLedCluster = YColorLedCluster;
// API symbols as static members
YColorLedCluster.ACTIVELEDCOUNT_INVALID = yocto_api_js_1.YAPI.INVALID_UINT;
YColorLedCluster.LEDTYPE_RGB = 0;
YColorLedCluster.LEDTYPE_RGBW = 1;
YColorLedCluster.LEDTYPE_WS2811 = 2;
YColorLedCluster.LEDTYPE_INVALID = -1;
YColorLedCluster.MAXLEDCOUNT_INVALID = yocto_api_js_1.YAPI.INVALID_UINT;
YColorLedCluster.DYNAMICLEDCOUNT_INVALID = yocto_api_js_1.YAPI.INVALID_UINT;
YColorLedCluster.BLINKSEQMAXCOUNT_INVALID = yocto_api_js_1.YAPI.INVALID_UINT;
YColorLedCluster.BLINKSEQMAXSIZE_INVALID = yocto_api_js_1.YAPI.INVALID_UINT;
YColorLedCluster.COMMAND_INVALID = yocto_api_js_1.YAPI.INVALID_STRING;
//# sourceMappingURL=yocto_colorledcluster.js.map