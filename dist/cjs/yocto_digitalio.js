"use strict";
/*********************************************************************
 *
 *  $Id: svn_id $
 *
 *  Implements the high-level API for DigitalIO functions
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
exports.YDigitalIO = void 0;
const yocto_api_js_1 = require("./yocto_api.js");
//--- (YDigitalIO class start)
/**
 * YDigitalIO Class: digital IO port control interface, available for instance in the Yocto-IO or the
 * Yocto-Maxi-IO-V2
 *
 * The YDigitalIO class allows you drive a Yoctopuce digital input/output port.
 * It can be used to set up the direction of each channel, to read the state of each channel
 * and to switch the state of each channel configures as an output.
 * You can work on all channels at once, or one by one. Most functions
 * use a binary representation for channels where bit 0 matches channel #0 , bit 1 matches channel
 * #1 and so on. If you are not familiar with numbers binary representation, you will find more
 * information here: https://en.wikipedia.org/wiki/Binary_number#Representation. It is also possible
 * to automatically generate short pulses of a determined duration. Electrical behavior
 * of each I/O can be modified (open drain and reverse polarity).
 */
//--- (end of YDigitalIO class start)
class YDigitalIO extends yocto_api_js_1.YFunction {
    //--- (end of YDigitalIO attributes declaration)
    constructor(yapi, func) {
        //--- (YDigitalIO constructor)
        super(yapi, func);
        this._portState = YDigitalIO.PORTSTATE_INVALID;
        this._portDirection = YDigitalIO.PORTDIRECTION_INVALID;
        this._portOpenDrain = YDigitalIO.PORTOPENDRAIN_INVALID;
        this._portPolarity = YDigitalIO.PORTPOLARITY_INVALID;
        this._portDiags = YDigitalIO.PORTDIAGS_INVALID;
        this._portSize = YDigitalIO.PORTSIZE_INVALID;
        this._outputVoltage = YDigitalIO.OUTPUTVOLTAGE_INVALID;
        this._command = YDigitalIO.COMMAND_INVALID;
        this._valueCallbackDigitalIO = null;
        // API symbols as object properties
        this.PORTSTATE_INVALID = yocto_api_js_1.YAPI.INVALID_UINT;
        this.PORTDIRECTION_INVALID = yocto_api_js_1.YAPI.INVALID_UINT;
        this.PORTOPENDRAIN_INVALID = yocto_api_js_1.YAPI.INVALID_UINT;
        this.PORTPOLARITY_INVALID = yocto_api_js_1.YAPI.INVALID_UINT;
        this.PORTDIAGS_INVALID = yocto_api_js_1.YAPI.INVALID_UINT;
        this.PORTSIZE_INVALID = yocto_api_js_1.YAPI.INVALID_UINT;
        this.OUTPUTVOLTAGE_USB_5V = 0;
        this.OUTPUTVOLTAGE_USB_3V = 1;
        this.OUTPUTVOLTAGE_EXT_V = 2;
        this.OUTPUTVOLTAGE_INVALID = -1;
        this.COMMAND_INVALID = yocto_api_js_1.YAPI.INVALID_STRING;
        this._className = 'DigitalIO';
        //--- (end of YDigitalIO constructor)
    }
    //--- (YDigitalIO implementation)
    imm_parseAttr(name, val) {
        switch (name) {
            case 'portState':
                this._portState = val;
                return 1;
            case 'portDirection':
                this._portDirection = val;
                return 1;
            case 'portOpenDrain':
                this._portOpenDrain = val;
                return 1;
            case 'portPolarity':
                this._portPolarity = val;
                return 1;
            case 'portDiags':
                this._portDiags = val;
                return 1;
            case 'portSize':
                this._portSize = val;
                return 1;
            case 'outputVoltage':
                this._outputVoltage = val;
                return 1;
            case 'command':
                this._command = val;
                return 1;
        }
        return super.imm_parseAttr(name, val);
    }
    /**
     * Returns the digital IO port state as an integer with each bit
     * representing a channel.
     * value 0 = 0b00000000 -> all channels are OFF
     * value 1 = 0b00000001 -> channel #0 is ON
     * value 2 = 0b00000010 -> channel #1 is ON
     * value 3 = 0b00000011 -> channels #0 and #1 are ON
     * value 4 = 0b00000100 -> channel #2 is ON
     * and so on...
     *
     * @return an integer corresponding to the digital IO port state as an integer with each bit
     *         representing a channel
     *
     * On failure, throws an exception or returns YDigitalIO.PORTSTATE_INVALID.
     */
    async get_portState() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YDigitalIO.PORTSTATE_INVALID;
            }
        }
        res = this._portState;
        return res;
    }
    /**
     * Changes the state of all digital IO port's channels at once: the parameter
     * is an integer where each bit represents a channel, with bit 0 matching channel #0.
     * To set all channels to  0 -> 0b00000000 -> parameter = 0
     * To set channel #0 to 1 -> 0b00000001 -> parameter =  1
     * To set channel #1 to  1 -> 0b00000010 -> parameter = 2
     * To set channel #0 and #1 -> 0b00000011 -> parameter =  3
     * To set channel #2 to 1 -> 0b00000100 -> parameter =  4
     * an so on....
     * Only channels configured as outputs will be affecter, according to the value
     * configured using set_portDirection.
     *
     * @param newval : an integer corresponding to the state of all digital IO port's channels at once: the parameter
     *         is an integer where each bit represents a channel, with bit 0 matching channel #0
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_portState(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('portState', rest_val);
    }
    /**
     * Returns the I/O direction of all channels of the port (bitmap): 0 makes a bit an input, 1 makes it an output.
     *
     * @return an integer corresponding to the I/O direction of all channels of the port (bitmap): 0 makes
     * a bit an input, 1 makes it an output
     *
     * On failure, throws an exception or returns YDigitalIO.PORTDIRECTION_INVALID.
     */
    async get_portDirection() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YDigitalIO.PORTDIRECTION_INVALID;
            }
        }
        res = this._portDirection;
        return res;
    }
    /**
     * Changes the I/O direction of all channels of the port (bitmap): 0 makes a bit an input, 1 makes it an output.
     * Remember to call the saveToFlash() method  to make sure the setting is kept after a reboot.
     *
     * @param newval : an integer corresponding to the I/O direction of all channels of the port (bitmap):
     * 0 makes a bit an input, 1 makes it an output
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_portDirection(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('portDirection', rest_val);
    }
    /**
     * Returns the electrical interface for each bit of the port. For each bit set to 0  the matching I/O
     * works in the regular,
     * intuitive way, for each bit set to 1, the I/O works in reverse mode.
     *
     * @return an integer corresponding to the electrical interface for each bit of the port
     *
     * On failure, throws an exception or returns YDigitalIO.PORTOPENDRAIN_INVALID.
     */
    async get_portOpenDrain() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YDigitalIO.PORTOPENDRAIN_INVALID;
            }
        }
        res = this._portOpenDrain;
        return res;
    }
    /**
     * Changes the electrical interface for each bit of the port. 0 makes a bit a regular input/output, 1 makes
     * it an open-drain (open-collector) input/output. Remember to call the
     * saveToFlash() method  to make sure the setting is kept after a reboot.
     *
     * @param newval : an integer corresponding to the electrical interface for each bit of the port
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_portOpenDrain(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('portOpenDrain', rest_val);
    }
    /**
     * Returns the polarity of all the bits of the port.  For each bit set to 0, the matching I/O works the regular,
     * intuitive way; for each bit set to 1, the I/O works in reverse mode.
     *
     * @return an integer corresponding to the polarity of all the bits of the port
     *
     * On failure, throws an exception or returns YDigitalIO.PORTPOLARITY_INVALID.
     */
    async get_portPolarity() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YDigitalIO.PORTPOLARITY_INVALID;
            }
        }
        res = this._portPolarity;
        return res;
    }
    /**
     * Changes the polarity of all the bits of the port: For each bit set to 0, the matching I/O works the regular,
     * intuitive way; for each bit set to 1, the I/O works in reverse mode.
     * Remember to call the saveToFlash() method  to make sure the setting will be kept after a reboot.
     *
     * @param newval : an integer corresponding to the polarity of all the bits of the port: For each bit
     * set to 0, the matching I/O works the regular,
     *         intuitive way; for each bit set to 1, the I/O works in reverse mode
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_portPolarity(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('portPolarity', rest_val);
    }
    /**
     * Returns the port state diagnostics. Bit 0 indicates a shortcut on output 0, etc.
     * Bit 8 indicates a power failure, and bit 9 signals overheating (overcurrent).
     * During normal use, all diagnostic bits should stay clear.
     *
     * @return an integer corresponding to the port state diagnostics
     *
     * On failure, throws an exception or returns YDigitalIO.PORTDIAGS_INVALID.
     */
    async get_portDiags() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YDigitalIO.PORTDIAGS_INVALID;
            }
        }
        res = this._portDiags;
        return res;
    }
    /**
     * Returns the number of bits (i.e. channels)implemented in the I/O port.
     *
     * @return an integer corresponding to the number of bits (i.e
     *
     * On failure, throws an exception or returns YDigitalIO.PORTSIZE_INVALID.
     */
    async get_portSize() {
        let res;
        if (this._cacheExpiration == 0) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YDigitalIO.PORTSIZE_INVALID;
            }
        }
        res = this._portSize;
        return res;
    }
    /**
     * Returns the voltage source used to drive output bits.
     *
     * @return a value among YDigitalIO.OUTPUTVOLTAGE_USB_5V, YDigitalIO.OUTPUTVOLTAGE_USB_3V and
     * YDigitalIO.OUTPUTVOLTAGE_EXT_V corresponding to the voltage source used to drive output bits
     *
     * On failure, throws an exception or returns YDigitalIO.OUTPUTVOLTAGE_INVALID.
     */
    async get_outputVoltage() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YDigitalIO.OUTPUTVOLTAGE_INVALID;
            }
        }
        res = this._outputVoltage;
        return res;
    }
    /**
     * Changes the voltage source used to drive output bits.
     * Remember to call the saveToFlash() method  to make sure the setting is kept after a reboot.
     *
     * @param newval : a value among YDigitalIO.OUTPUTVOLTAGE_USB_5V, YDigitalIO.OUTPUTVOLTAGE_USB_3V and
     * YDigitalIO.OUTPUTVOLTAGE_EXT_V corresponding to the voltage source used to drive output bits
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_outputVoltage(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('outputVoltage', rest_val);
    }
    async get_command() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YDigitalIO.COMMAND_INVALID;
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
     * Retrieves a digital IO port for a given identifier.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the digital IO port is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YDigitalIO.isOnline() to test if the digital IO port is
     * indeed online at a given time. In case of ambiguity when looking for
     * a digital IO port by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the digital IO port, for instance
     *         YMINIIO0.digitalIO.
     *
     * @return a YDigitalIO object allowing you to drive the digital IO port.
     */
    static FindDigitalIO(func) {
        let obj;
        obj = yocto_api_js_1.YFunction._FindFromCache('DigitalIO', func);
        if (obj == null) {
            obj = new YDigitalIO(yocto_api_js_1.YAPI, func);
            yocto_api_js_1.YFunction._AddToCache('DigitalIO', func, obj);
        }
        return obj;
    }
    /**
     * Retrieves a digital IO port for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the digital IO port is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YDigitalIO.isOnline() to test if the digital IO port is
     * indeed online at a given time. In case of ambiguity when looking for
     * a digital IO port by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx : a YAPI context
     * @param func : a string that uniquely characterizes the digital IO port, for instance
     *         YMINIIO0.digitalIO.
     *
     * @return a YDigitalIO object allowing you to drive the digital IO port.
     */
    static FindDigitalIOInContext(yctx, func) {
        let obj;
        obj = yocto_api_js_1.YFunction._FindFromCacheInContext(yctx, 'DigitalIO', func);
        if (obj == null) {
            obj = new YDigitalIO(yctx, func);
            yocto_api_js_1.YFunction._AddToCache('DigitalIO', func, obj);
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
        this._valueCallbackDigitalIO = callback;
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
        if (this._valueCallbackDigitalIO != null) {
            try {
                await this._valueCallbackDigitalIO(this, value);
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
    /**
     * Sets a single bit (i.e. channel) of the I/O port.
     *
     * @param bitno : the bit number; lowest bit has index 0
     * @param bitstate : the state of the bit (1 or 0)
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_bitState(bitno, bitstate) {
        if (!(bitstate >= 0)) {
            return this._throw(this._yapi.INVALID_ARGUMENT, 'invalid bit state', this._yapi.INVALID_ARGUMENT);
        }
        if (!(bitstate <= 1)) {
            return this._throw(this._yapi.INVALID_ARGUMENT, 'invalid bit state', this._yapi.INVALID_ARGUMENT);
        }
        return await this.set_command(String.fromCharCode(82 + bitstate) + '' + String(Math.round(bitno)));
    }
    /**
     * Returns the state of a single bit (i.e. channel)  of the I/O port.
     *
     * @param bitno : the bit number; lowest bit has index 0
     *
     * @return the bit state (0 or 1)
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async get_bitState(bitno) {
        let portVal;
        portVal = await this.get_portState();
        return ((portVal >> bitno) & 1);
    }
    /**
     * Reverts a single bit (i.e. channel) of the I/O port.
     *
     * @param bitno : the bit number; lowest bit has index 0
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async toggle_bitState(bitno) {
        return await this.set_command('T' + String(Math.round(bitno)));
    }
    /**
     * Changes  the direction of a single bit (i.e. channel) from the I/O port.
     *
     * @param bitno : the bit number; lowest bit has index 0
     * @param bitdirection : direction to set, 0 makes the bit an input, 1 makes it an output.
     *         Remember to call the   saveToFlash() method to make sure the setting is kept after a reboot.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_bitDirection(bitno, bitdirection) {
        if (!(bitdirection >= 0)) {
            return this._throw(this._yapi.INVALID_ARGUMENT, 'invalid direction', this._yapi.INVALID_ARGUMENT);
        }
        if (!(bitdirection <= 1)) {
            return this._throw(this._yapi.INVALID_ARGUMENT, 'invalid direction', this._yapi.INVALID_ARGUMENT);
        }
        return await this.set_command(String.fromCharCode(73 + 6 * bitdirection) + '' + String(Math.round(bitno)));
    }
    /**
     * Returns the direction of a single bit (i.e. channel) from the I/O port (0 means the bit is an
     * input, 1  an output).
     *
     * @param bitno : the bit number; lowest bit has index 0
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async get_bitDirection(bitno) {
        let portDir;
        portDir = await this.get_portDirection();
        return ((portDir >> bitno) & 1);
    }
    /**
     * Changes the polarity of a single bit from the I/O port.
     *
     * @param bitno : the bit number; lowest bit has index 0.
     * @param bitpolarity : polarity to set, 0 makes the I/O work in regular mode, 1 makes the I/O  works
     * in reverse mode.
     *         Remember to call the   saveToFlash() method to make sure the setting is kept after a reboot.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_bitPolarity(bitno, bitpolarity) {
        if (!(bitpolarity >= 0)) {
            return this._throw(this._yapi.INVALID_ARGUMENT, 'invalid bit polarity', this._yapi.INVALID_ARGUMENT);
        }
        if (!(bitpolarity <= 1)) {
            return this._throw(this._yapi.INVALID_ARGUMENT, 'invalid bit polarity', this._yapi.INVALID_ARGUMENT);
        }
        return await this.set_command(String.fromCharCode(110 + 4 * bitpolarity) + '' + String(Math.round(bitno)));
    }
    /**
     * Returns the polarity of a single bit from the I/O port (0 means the I/O works in regular mode, 1
     * means the I/O  works in reverse mode).
     *
     * @param bitno : the bit number; lowest bit has index 0
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async get_bitPolarity(bitno) {
        let portPol;
        portPol = await this.get_portPolarity();
        return ((portPol >> bitno) & 1);
    }
    /**
     * Changes  the electrical interface of a single bit from the I/O port.
     *
     * @param bitno : the bit number; lowest bit has index 0
     * @param opendrain : 0 makes a bit a regular input/output, 1 makes
     *         it an open-drain (open-collector) input/output. Remember to call the
     *         saveToFlash() method to make sure the setting is kept after a reboot.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_bitOpenDrain(bitno, opendrain) {
        if (!(opendrain >= 0)) {
            return this._throw(this._yapi.INVALID_ARGUMENT, 'invalid state', this._yapi.INVALID_ARGUMENT);
        }
        if (!(opendrain <= 1)) {
            return this._throw(this._yapi.INVALID_ARGUMENT, 'invalid state', this._yapi.INVALID_ARGUMENT);
        }
        return await this.set_command(String.fromCharCode(100 - 32 * opendrain) + '' + String(Math.round(bitno)));
    }
    /**
     * Returns the type of electrical interface of a single bit from the I/O port. (0 means the bit is an
     * input, 1  an output).
     *
     * @param bitno : the bit number; lowest bit has index 0
     *
     * @return   0 means the a bit is a regular input/output, 1 means the bit is an open-drain
     *         (open-collector) input/output.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async get_bitOpenDrain(bitno) {
        let portOpenDrain;
        portOpenDrain = await this.get_portOpenDrain();
        return ((portOpenDrain >> bitno) & 1);
    }
    /**
     * Triggers a pulse on a single bit for a specified duration. The specified bit
     * will be turned to 1, and then back to 0 after the given duration.
     *
     * @param bitno : the bit number; lowest bit has index 0
     * @param ms_duration : desired pulse duration in milliseconds. Be aware that the device time
     *         resolution is not guaranteed up to the millisecond.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async pulse(bitno, ms_duration) {
        return await this.set_command('Z' + String(Math.round(bitno)) + ',0,' + String(Math.round(ms_duration)));
    }
    /**
     * Schedules a pulse on a single bit for a specified duration. The specified bit
     * will be turned to 1, and then back to 0 after the given duration.
     *
     * @param bitno : the bit number; lowest bit has index 0
     * @param ms_delay : waiting time before the pulse, in milliseconds
     * @param ms_duration : desired pulse duration in milliseconds. Be aware that the device time
     *         resolution is not guaranteed up to the millisecond.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async delayedPulse(bitno, ms_delay, ms_duration) {
        return await this.set_command('Z' + String(Math.round(bitno)) + ',' + String(Math.round(ms_delay)) + ',' + String(Math.round(ms_duration)));
    }
    /**
     * Continues the enumeration of digital IO ports started using yFirstDigitalIO().
     * Caution: You can't make any assumption about the returned digital IO ports order.
     * If you want to find a specific a digital IO port, use DigitalIO.findDigitalIO()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YDigitalIO object, corresponding to
     *         a digital IO port currently online, or a null pointer
     *         if there are no more digital IO ports to enumerate.
     */
    nextDigitalIO() {
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != yocto_api_js_1.YAPI.SUCCESS)
            return null;
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if (next_hwid == null)
            return null;
        return YDigitalIO.FindDigitalIOInContext(this._yapi, next_hwid);
    }
    /**
     * Starts the enumeration of digital IO ports currently accessible.
     * Use the method YDigitalIO.nextDigitalIO() to iterate on
     * next digital IO ports.
     *
     * @return a pointer to a YDigitalIO object, corresponding to
     *         the first digital IO port currently online, or a null pointer
     *         if there are none.
     */
    static FirstDigitalIO() {
        let next_hwid = yocto_api_js_1.YAPI.imm_getFirstHardwareId('DigitalIO');
        if (next_hwid == null)
            return null;
        return YDigitalIO.FindDigitalIO(next_hwid);
    }
    /**
     * Starts the enumeration of digital IO ports currently accessible.
     * Use the method YDigitalIO.nextDigitalIO() to iterate on
     * next digital IO ports.
     *
     * @param yctx : a YAPI context.
     *
     * @return a pointer to a YDigitalIO object, corresponding to
     *         the first digital IO port currently online, or a null pointer
     *         if there are none.
     */
    static FirstDigitalIOInContext(yctx) {
        let next_hwid = yctx.imm_getFirstHardwareId('DigitalIO');
        if (next_hwid == null)
            return null;
        return YDigitalIO.FindDigitalIOInContext(yctx, next_hwid);
    }
}
exports.YDigitalIO = YDigitalIO;
// API symbols as static members
YDigitalIO.PORTSTATE_INVALID = yocto_api_js_1.YAPI.INVALID_UINT;
YDigitalIO.PORTDIRECTION_INVALID = yocto_api_js_1.YAPI.INVALID_UINT;
YDigitalIO.PORTOPENDRAIN_INVALID = yocto_api_js_1.YAPI.INVALID_UINT;
YDigitalIO.PORTPOLARITY_INVALID = yocto_api_js_1.YAPI.INVALID_UINT;
YDigitalIO.PORTDIAGS_INVALID = yocto_api_js_1.YAPI.INVALID_UINT;
YDigitalIO.PORTSIZE_INVALID = yocto_api_js_1.YAPI.INVALID_UINT;
YDigitalIO.OUTPUTVOLTAGE_USB_5V = 0;
YDigitalIO.OUTPUTVOLTAGE_USB_3V = 1;
YDigitalIO.OUTPUTVOLTAGE_EXT_V = 2;
YDigitalIO.OUTPUTVOLTAGE_INVALID = -1;
YDigitalIO.COMMAND_INVALID = yocto_api_js_1.YAPI.INVALID_STRING;
//# sourceMappingURL=yocto_digitalio.js.map