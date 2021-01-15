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

import { YAPI, YAPIContext, YErrorMsg, YFunction, YModule, YSensor, YDataLogger, YMeasure } from './yocto_api.js';

//--- (YDigitalIO definitions)
export const enum Y_OutputVoltage {
    USB_5V = 0,
    USB_3V = 1,
    EXT_V = 2,
    INVALID = -1
}
export interface YDigitalIOValueCallback { (func: YDigitalIO, value: string): void }
//--- (end of YDigitalIO definitions)

//--- (YDigitalIO class start)
/**
 * YDigitalIO Class: digital IO port control interface, available for instance in the Yocto-IO or the
 * Yocto-Maxi-IO-V2
 *
 * The YDigitalIO class allows you drive a Yoctopuce digital input/output port.
 * It can be used to setup the direction of each channel, to read the state of each channel
 * and to switch the state of each channel configures as an output.
 * You can work on all channels at once, or one by one. Most functions
 * use a binary representation for channels where bit 0 matches channel #0 , bit 1 matches channel
 * #1 and so on. If you are not familiar with numbers binary representation, you will find more
 * information here: https://en.wikipedia.org/wiki/Binary_number#Representation. It is also possible
 * to automatically generate short pulses of a determined duration. Electrical behavior
 * of each I/O can be modified (open drain and reverse polarity).
 */
//--- (end of YDigitalIO class start)

export class YDigitalIO extends YFunction
{
    //--- (YDigitalIO attributes declaration)
    _className: string;
    _portState: number = YDigitalIO.PORTSTATE_INVALID;
    _portDirection: number = YDigitalIO.PORTDIRECTION_INVALID;
    _portOpenDrain: number = YDigitalIO.PORTOPENDRAIN_INVALID;
    _portPolarity: number = YDigitalIO.PORTPOLARITY_INVALID;
    _portDiags: number = YDigitalIO.PORTDIAGS_INVALID;
    _portSize: number = YDigitalIO.PORTSIZE_INVALID;
    _outputVoltage: Y_OutputVoltage = YDigitalIO.OUTPUTVOLTAGE_INVALID;
    _command: string = YDigitalIO.COMMAND_INVALID;
    _valueCallbackDigitalIO: YDigitalIOValueCallback | null = null;

    // API symbols as object properties
    public readonly PORTSTATE_INVALID: number = YAPI.INVALID_UINT;
    public readonly PORTDIRECTION_INVALID: number = YAPI.INVALID_UINT;
    public readonly PORTOPENDRAIN_INVALID: number = YAPI.INVALID_UINT;
    public readonly PORTPOLARITY_INVALID: number = YAPI.INVALID_UINT;
    public readonly PORTDIAGS_INVALID: number = YAPI.INVALID_UINT;
    public readonly PORTSIZE_INVALID: number = YAPI.INVALID_UINT;
    public readonly OUTPUTVOLTAGE_USB_5V: Y_OutputVoltage = Y_OutputVoltage.USB_5V;
    public readonly OUTPUTVOLTAGE_USB_3V: Y_OutputVoltage = Y_OutputVoltage.USB_3V;
    public readonly OUTPUTVOLTAGE_EXT_V: Y_OutputVoltage = Y_OutputVoltage.EXT_V;
    public readonly OUTPUTVOLTAGE_INVALID: Y_OutputVoltage = Y_OutputVoltage.INVALID;
    public readonly COMMAND_INVALID: string = YAPI.INVALID_STRING;

    // API symbols as static members
    public static readonly PORTSTATE_INVALID: number = YAPI.INVALID_UINT;
    public static readonly PORTDIRECTION_INVALID: number = YAPI.INVALID_UINT;
    public static readonly PORTOPENDRAIN_INVALID: number = YAPI.INVALID_UINT;
    public static readonly PORTPOLARITY_INVALID: number = YAPI.INVALID_UINT;
    public static readonly PORTDIAGS_INVALID: number = YAPI.INVALID_UINT;
    public static readonly PORTSIZE_INVALID: number = YAPI.INVALID_UINT;
    public static readonly OUTPUTVOLTAGE_USB_5V: Y_OutputVoltage = Y_OutputVoltage.USB_5V;
    public static readonly OUTPUTVOLTAGE_USB_3V: Y_OutputVoltage = Y_OutputVoltage.USB_3V;
    public static readonly OUTPUTVOLTAGE_EXT_V: Y_OutputVoltage = Y_OutputVoltage.EXT_V;
    public static readonly OUTPUTVOLTAGE_INVALID: Y_OutputVoltage = Y_OutputVoltage.INVALID;
    public static readonly COMMAND_INVALID: string = YAPI.INVALID_STRING;
    //--- (end of YDigitalIO attributes declaration)

//--- (YDigitalIO return codes)
//--- (end of YDigitalIO return codes)

    constructor(yapi: YAPIContext, func: string)
    {
        //--- (YDigitalIO constructor)
        super(yapi, func);
        this._className                  = 'DigitalIO';
        //--- (end of YDigitalIO constructor)
    }

    //--- (YDigitalIO implementation)

    imm_parseAttr(name: string, val: any)
    {
        switch(name) {
        case 'portState':
            this._portState = <number> <number> val;
            return 1;
        case 'portDirection':
            this._portDirection = <number> <number> val;
            return 1;
        case 'portOpenDrain':
            this._portOpenDrain = <number> <number> val;
            return 1;
        case 'portPolarity':
            this._portPolarity = <number> <number> val;
            return 1;
        case 'portDiags':
            this._portDiags = <number> <number> val;
            return 1;
        case 'portSize':
            this._portSize = <number> <number> val;
            return 1;
        case 'outputVoltage':
            this._outputVoltage = <Y_OutputVoltage> <number> val;
            return 1;
        case 'command':
            this._command = <string> <string> val;
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
     * On failure, throws an exception or returns Y_PORTSTATE_INVALID.
     */
    async get_portState(): Promise<number>
    {
        let res: number;
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
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_portState(newval: number): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('portState',rest_val);
    }

    /**
     * Returns the I/O direction of all channels of the port (bitmap): 0 makes a bit an input, 1 makes it an output.
     *
     * @return an integer corresponding to the I/O direction of all channels of the port (bitmap): 0 makes
     * a bit an input, 1 makes it an output
     *
     * On failure, throws an exception or returns Y_PORTDIRECTION_INVALID.
     */
    async get_portDirection(): Promise<number>
    {
        let res: number;
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
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_portDirection(newval: number): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('portDirection',rest_val);
    }

    /**
     * Returns the electrical interface for each bit of the port. For each bit set to 0  the matching I/O
     * works in the regular,
     * intuitive way, for each bit set to 1, the I/O works in reverse mode.
     *
     * @return an integer corresponding to the electrical interface for each bit of the port
     *
     * On failure, throws an exception or returns Y_PORTOPENDRAIN_INVALID.
     */
    async get_portOpenDrain(): Promise<number>
    {
        let res: number;
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
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_portOpenDrain(newval: number): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('portOpenDrain',rest_val);
    }

    /**
     * Returns the polarity of all the bits of the port.  For each bit set to 0, the matching I/O works the regular,
     * intuitive way; for each bit set to 1, the I/O works in reverse mode.
     *
     * @return an integer corresponding to the polarity of all the bits of the port
     *
     * On failure, throws an exception or returns Y_PORTPOLARITY_INVALID.
     */
    async get_portPolarity(): Promise<number>
    {
        let res: number;
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
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_portPolarity(newval: number): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('portPolarity',rest_val);
    }

    /**
     * Returns the port state diagnostics (Yocto-IO and Yocto-MaxiIO-V2 only). Bit 0 indicates a shortcut on
     * output 0, etc. Bit 8 indicates a power failure, and bit 9 signals overheating (overcurrent).
     * During normal use, all diagnostic bits should stay clear.
     *
     * @return an integer corresponding to the port state diagnostics (Yocto-IO and Yocto-MaxiIO-V2 only)
     *
     * On failure, throws an exception or returns Y_PORTDIAGS_INVALID.
     */
    async get_portDiags(): Promise<number>
    {
        let res: number;
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
     * On failure, throws an exception or returns Y_PORTSIZE_INVALID.
     */
    async get_portSize(): Promise<number>
    {
        let res: number;
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
     * @return a value among Y_OUTPUTVOLTAGE_USB_5V, Y_OUTPUTVOLTAGE_USB_3V and Y_OUTPUTVOLTAGE_EXT_V
     * corresponding to the voltage source used to drive output bits
     *
     * On failure, throws an exception or returns Y_OUTPUTVOLTAGE_INVALID.
     */
    async get_outputVoltage(): Promise<Y_OutputVoltage>
    {
        let res: number;
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
     * @param newval : a value among Y_OUTPUTVOLTAGE_USB_5V, Y_OUTPUTVOLTAGE_USB_3V and
     * Y_OUTPUTVOLTAGE_EXT_V corresponding to the voltage source used to drive output bits
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_outputVoltage(newval: Y_OutputVoltage): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('outputVoltage',rest_val);
    }

    async get_command(): Promise<string>
    {
        let res: string;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YDigitalIO.COMMAND_INVALID;
            }
        }
        res = this._command;
        return res;
    }

    async set_command(newval: string): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('command',rest_val);
    }

    /**
     * Retrieves $AFUNCTION$ for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that $THEFUNCTION$ is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YDigitalIO.isOnline() to test if $THEFUNCTION$ is
     * indeed online at a given time. In case of ambiguity when looking for
     * $AFUNCTION$ by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes $THEFUNCTION$, for instance
     *         $FULLHARDWAREID$.
     *
     * @return a YDigitalIO object allowing you to drive $THEFUNCTION$.
     */
    static FindDigitalIO(func: string): YDigitalIO
    {
        let obj: YDigitalIO;
        obj = <YDigitalIO> YFunction._FindFromCache('DigitalIO', func);
        if (obj == null) {
            obj = new YDigitalIO(YAPI, func);
            YFunction._AddToCache('DigitalIO',  func, obj);
        }
        return obj;
    }

    /**
     * Retrieves $AFUNCTION$ for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that $THEFUNCTION$ is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YDigitalIO.isOnline() to test if $THEFUNCTION$ is
     * indeed online at a given time. In case of ambiguity when looking for
     * $AFUNCTION$ by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx : a YAPI context
     * @param func : a string that uniquely characterizes $THEFUNCTION$, for instance
     *         $FULLHARDWAREID$.
     *
     * @return a YDigitalIO object allowing you to drive $THEFUNCTION$.
     */
    static FindDigitalIOInContext(yctx: YAPIContext, func: string): YDigitalIO
    {
        let obj: YDigitalIO;
        obj = <YDigitalIO> YFunction._FindFromCacheInContext(yctx,  'DigitalIO', func);
        if (obj == null) {
            obj = new YDigitalIO(yctx, func);
            YFunction._AddToCache('DigitalIO',  func, obj);
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
    async registerValueCallback(callback: YDigitalIOValueCallback | null): Promise<number>
    {
        let val: string;
        if (callback != null) {
            await YFunction._UpdateValueCallbackList(this, true);
        } else {
            await YFunction._UpdateValueCallbackList(this, false);
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

    async _invokeValueCallback(value: string): Promise<number>
    {
        if (this._valueCallbackDigitalIO != null) {
            try {
                await this._valueCallbackDigitalIO(this, value);
            } catch (e) {
                this._yapi.imm_log('Exception in valueCallback:', e);
            }
        } else {
            super._invokeValueCallback(value);
        }
        return 0;
    }

    /**
     * Sets a single bit (i.e. channel) of the I/O port.
     *
     * @param bitno : the bit number; lowest bit has index 0
     * @param bitstate : the state of the bit (1 or 0)
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_bitState(bitno: number, bitstate: number): Promise<number>
    {
        if (!(bitstate >= 0)) {
            return this._throw(this._yapi.INVALID_ARGUMENT,'invalid bit state',this._yapi.INVALID_ARGUMENT);
        }
        if (!(bitstate <= 1)) {
            return this._throw(this._yapi.INVALID_ARGUMENT,'invalid bit state',this._yapi.INVALID_ARGUMENT);
        }
        return await this.set_command(String.fromCharCode(82+bitstate)+''+String(Math.round(bitno)));
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
    async get_bitState(bitno: number): Promise<number>
    {
        let portVal: number;
        portVal = await this.get_portState();
        return ((((portVal) >> (bitno))) & (1));
    }

    /**
     * Reverts a single bit (i.e. channel) of the I/O port.
     *
     * @param bitno : the bit number; lowest bit has index 0
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async toggle_bitState(bitno: number): Promise<number>
    {
        return await this.set_command('T'+String(Math.round(bitno)));
    }

    /**
     * Changes  the direction of a single bit (i.e. channel) from the I/O port.
     *
     * @param bitno : the bit number; lowest bit has index 0
     * @param bitdirection : direction to set, 0 makes the bit an input, 1 makes it an output.
     *         Remember to call the   saveToFlash() method to make sure the setting is kept after a reboot.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_bitDirection(bitno: number, bitdirection: number): Promise<number>
    {
        if (!(bitdirection >= 0)) {
            return this._throw(this._yapi.INVALID_ARGUMENT,'invalid direction',this._yapi.INVALID_ARGUMENT);
        }
        if (!(bitdirection <= 1)) {
            return this._throw(this._yapi.INVALID_ARGUMENT,'invalid direction',this._yapi.INVALID_ARGUMENT);
        }
        return await this.set_command(String.fromCharCode(73+6*bitdirection)+''+String(Math.round(bitno)));
    }

    /**
     * Returns the direction of a single bit (i.e. channel) from the I/O port (0 means the bit is an
     * input, 1  an output).
     *
     * @param bitno : the bit number; lowest bit has index 0
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async get_bitDirection(bitno: number): Promise<number>
    {
        let portDir: number;
        portDir = await this.get_portDirection();
        return ((((portDir) >> (bitno))) & (1));
    }

    /**
     * Changes the polarity of a single bit from the I/O port.
     *
     * @param bitno : the bit number; lowest bit has index 0.
     * @param bitpolarity : polarity to set, 0 makes the I/O work in regular mode, 1 makes the I/O  works
     * in reverse mode.
     *         Remember to call the   saveToFlash() method to make sure the setting is kept after a reboot.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_bitPolarity(bitno: number, bitpolarity: number): Promise<number>
    {
        if (!(bitpolarity >= 0)) {
            return this._throw(this._yapi.INVALID_ARGUMENT,'invalid bit polarity',this._yapi.INVALID_ARGUMENT);
        }
        if (!(bitpolarity <= 1)) {
            return this._throw(this._yapi.INVALID_ARGUMENT,'invalid bit polarity',this._yapi.INVALID_ARGUMENT);
        }
        return await this.set_command(String.fromCharCode(110+4*bitpolarity)+''+String(Math.round(bitno)));
    }

    /**
     * Returns the polarity of a single bit from the I/O port (0 means the I/O works in regular mode, 1
     * means the I/O  works in reverse mode).
     *
     * @param bitno : the bit number; lowest bit has index 0
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async get_bitPolarity(bitno: number): Promise<number>
    {
        let portPol: number;
        portPol = await this.get_portPolarity();
        return ((((portPol) >> (bitno))) & (1));
    }

    /**
     * Changes  the electrical interface of a single bit from the I/O port.
     *
     * @param bitno : the bit number; lowest bit has index 0
     * @param opendrain : 0 makes a bit a regular input/output, 1 makes
     *         it an open-drain (open-collector) input/output. Remember to call the
     *         saveToFlash() method to make sure the setting is kept after a reboot.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_bitOpenDrain(bitno: number, opendrain: number): Promise<number>
    {
        if (!(opendrain >= 0)) {
            return this._throw(this._yapi.INVALID_ARGUMENT,'invalid state',this._yapi.INVALID_ARGUMENT);
        }
        if (!(opendrain <= 1)) {
            return this._throw(this._yapi.INVALID_ARGUMENT,'invalid state',this._yapi.INVALID_ARGUMENT);
        }
        return await this.set_command(String.fromCharCode(100-32*opendrain)+''+String(Math.round(bitno)));
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
    async get_bitOpenDrain(bitno: number): Promise<number>
    {
        let portOpenDrain: number;
        portOpenDrain = await this.get_portOpenDrain();
        return ((((portOpenDrain) >> (bitno))) & (1));
    }

    /**
     * Triggers a pulse on a single bit for a specified duration. The specified bit
     * will be turned to 1, and then back to 0 after the given duration.
     *
     * @param bitno : the bit number; lowest bit has index 0
     * @param ms_duration : desired pulse duration in milliseconds. Be aware that the device time
     *         resolution is not guaranteed up to the millisecond.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async pulse(bitno: number, ms_duration: number): Promise<number>
    {
        return await this.set_command('Z'+String(Math.round(bitno))+',0,'+String(Math.round(ms_duration)));
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
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async delayedPulse(bitno: number, ms_delay: number, ms_duration: number): Promise<number>
    {
        return await this.set_command('Z'+String(Math.round(bitno))+','+String(Math.round(ms_delay))+','+String(Math.round(ms_duration)));
    }

    /**
     * Returns the next DigitalIO
     *
     * @returns {YDigitalIO}
     */
    nextDigitalIO(): YDigitalIO | null
    {
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI.SUCCESS) return null;
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, <string> resolve.result);
        if(next_hwid == null) return null;
        return YDigitalIO.FindDigitalIOInContext(this._yapi, next_hwid);
    }

    /**
     * Retrieves the first DigitalIO in a YAPI context
     *
     * @returns {YDigitalIO}
     */
    static FirstDigitalIO(): YDigitalIO | null
    {
        let next_hwid = YAPI.imm_getFirstHardwareId('DigitalIO');
        if(next_hwid == null) return null;
        return YDigitalIO.FindDigitalIO(next_hwid);
    }

    /**
     * Retrieves the first DigitalIO in a given context
     *
     * @param yctx {YAPIContext}
     *
     * @returns {YDigitalIO}
     */
    static FirstDigitalIOInContext(yctx: YAPIContext): YDigitalIO | null
    {
        let next_hwid = yctx.imm_getFirstHardwareId('DigitalIO');
        if(next_hwid == null) return null;
        return YDigitalIO.FindDigitalIOInContext(yctx, next_hwid);
    }

    //--- (end of YDigitalIO implementation)
}

