/*********************************************************************
 *
 *  $Id: yocto_spiport.ts 58903 2024-01-11 16:44:48Z mvuilleu $
 *
 *  Implements the high-level API for SpiSnoopingRecord functions
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

//--- (generated code: YSpiSnoopingRecord class start)
/**
 * YSpiSnoopingRecord Class: Intercepted SPI message description, returned by spiPort.snoopMessages method
 *
 *
 */
//--- (end of generated code: YSpiSnoopingRecord class start)

export class YSpiSnoopingRecord
{
    //--- (generated code: YSpiSnoopingRecord attributes declaration)
    _tim: number = 0;
    _pos: number = 0;
    _dir: number = 0;
    _msg: string = '';

    // API symbols as static members
    //--- (end of generated code: YSpiSnoopingRecord attributes declaration)

    constructor(str_json: string)
    {
        //--- (generated code: YSpiSnoopingRecord constructor)
        //--- (end of generated code: YSpiSnoopingRecord constructor)
        const loadval = JSON.parse(str_json);
        this._tim = loadval.t;
        this._pos = loadval.p;
        this._dir = (loadval.m[0] == '<' ? 1 : 0);
        this._msg = loadval.m.slice(1);
    }

    //--- (generated code: YSpiSnoopingRecord implementation)

    /**
     * Returns the elapsed time, in ms, since the beginning of the preceding message.
     *
     * @return the elapsed time, in ms, since the beginning of the preceding message.
     */
    get_time(): number
    {
        return this._tim;
    }

    /**
     * Returns the absolute position of the message end.
     *
     * @return the absolute position of the message end.
     */
    get_pos(): number
    {
        return this._pos;
    }

    /**
     * Returns the message direction (RX=0, TX=1).
     *
     * @return the message direction (RX=0, TX=1).
     */
    get_direction(): number
    {
        return this._dir;
    }

    /**
     * Returns the message content.
     *
     * @return the message content.
     */
    get_message(): string
    {
        return this._msg;
    }

    //--- (end of generated code: YSpiSnoopingRecord implementation)
}

export namespace YSpiSnoopingRecord {
//--- (generated code: YSpiSnoopingRecord definitions)
//--- (end of generated code: YSpiSnoopingRecord definitions)
}

//--- (generated code: YSpiPort class start)
/**
 * YSpiPort Class: SPI port control interface, available for instance in the Yocto-SPI
 *
 * The YSpiPort class allows you to fully drive a Yoctopuce SPI port.
 * It can be used to send and receive data, and to configure communication
 * parameters (baud rate, bit count, parity, flow control and protocol).
 * Note that Yoctopuce SPI ports are not exposed as virtual COM ports.
 * They are meant to be used in the same way as all Yoctopuce devices.
 */
//--- (end of generated code: YSpiPort class start)
/** @extends {YFunction} **/
export class YSpiPort extends YFunction
{
    //--- (generated code: YSpiPort attributes declaration)
    _className: string;
    _rxCount: number = YSpiPort.RXCOUNT_INVALID;
    _txCount: number = YSpiPort.TXCOUNT_INVALID;
    _errCount: number = YSpiPort.ERRCOUNT_INVALID;
    _rxMsgCount: number = YSpiPort.RXMSGCOUNT_INVALID;
    _txMsgCount: number = YSpiPort.TXMSGCOUNT_INVALID;
    _lastMsg: string = YSpiPort.LASTMSG_INVALID;
    _currentJob: string = YSpiPort.CURRENTJOB_INVALID;
    _startupJob: string = YSpiPort.STARTUPJOB_INVALID;
    _jobMaxTask: number = YSpiPort.JOBMAXTASK_INVALID;
    _jobMaxSize: number = YSpiPort.JOBMAXSIZE_INVALID;
    _command: string = YSpiPort.COMMAND_INVALID;
    _protocol: string = YSpiPort.PROTOCOL_INVALID;
    _voltageLevel: YSpiPort.VOLTAGELEVEL = YSpiPort.VOLTAGELEVEL_INVALID;
    _spiMode: string = YSpiPort.SPIMODE_INVALID;
    _ssPolarity: YSpiPort.SSPOLARITY = YSpiPort.SSPOLARITY_INVALID;
    _shiftSampling: YSpiPort.SHIFTSAMPLING = YSpiPort.SHIFTSAMPLING_INVALID;
    _valueCallbackSpiPort: YSpiPort.ValueCallback | null = null;
    _rxptr: number = 0;
    _rxbuff: Uint8Array = new Uint8Array(0);
    _rxbuffptr: number = 0;
    _eventPos: number = 0;

    // API symbols as object properties
    public readonly RXCOUNT_INVALID: number = YAPI.INVALID_UINT;
    public readonly TXCOUNT_INVALID: number = YAPI.INVALID_UINT;
    public readonly ERRCOUNT_INVALID: number = YAPI.INVALID_UINT;
    public readonly RXMSGCOUNT_INVALID: number = YAPI.INVALID_UINT;
    public readonly TXMSGCOUNT_INVALID: number = YAPI.INVALID_UINT;
    public readonly LASTMSG_INVALID: string = YAPI.INVALID_STRING;
    public readonly CURRENTJOB_INVALID: string = YAPI.INVALID_STRING;
    public readonly STARTUPJOB_INVALID: string = YAPI.INVALID_STRING;
    public readonly JOBMAXTASK_INVALID: number = YAPI.INVALID_UINT;
    public readonly JOBMAXSIZE_INVALID: number = YAPI.INVALID_UINT;
    public readonly COMMAND_INVALID: string = YAPI.INVALID_STRING;
    public readonly PROTOCOL_INVALID: string = YAPI.INVALID_STRING;
    public readonly VOLTAGELEVEL_OFF: YSpiPort.VOLTAGELEVEL = 0;
    public readonly VOLTAGELEVEL_TTL3V: YSpiPort.VOLTAGELEVEL = 1;
    public readonly VOLTAGELEVEL_TTL3VR: YSpiPort.VOLTAGELEVEL = 2;
    public readonly VOLTAGELEVEL_TTL5V: YSpiPort.VOLTAGELEVEL = 3;
    public readonly VOLTAGELEVEL_TTL5VR: YSpiPort.VOLTAGELEVEL = 4;
    public readonly VOLTAGELEVEL_RS232: YSpiPort.VOLTAGELEVEL = 5;
    public readonly VOLTAGELEVEL_RS485: YSpiPort.VOLTAGELEVEL = 6;
    public readonly VOLTAGELEVEL_TTL1V8: YSpiPort.VOLTAGELEVEL = 7;
    public readonly VOLTAGELEVEL_SDI12: YSpiPort.VOLTAGELEVEL = 8;
    public readonly VOLTAGELEVEL_INVALID: YSpiPort.VOLTAGELEVEL = -1;
    public readonly SPIMODE_INVALID: string = YAPI.INVALID_STRING;
    public readonly SSPOLARITY_ACTIVE_LOW: YSpiPort.SSPOLARITY = 0;
    public readonly SSPOLARITY_ACTIVE_HIGH: YSpiPort.SSPOLARITY = 1;
    public readonly SSPOLARITY_INVALID: YSpiPort.SSPOLARITY = -1;
    public readonly SHIFTSAMPLING_OFF: YSpiPort.SHIFTSAMPLING = 0;
    public readonly SHIFTSAMPLING_ON: YSpiPort.SHIFTSAMPLING = 1;
    public readonly SHIFTSAMPLING_INVALID: YSpiPort.SHIFTSAMPLING = -1;

    // API symbols as static members
    public static readonly RXCOUNT_INVALID: number = YAPI.INVALID_UINT;
    public static readonly TXCOUNT_INVALID: number = YAPI.INVALID_UINT;
    public static readonly ERRCOUNT_INVALID: number = YAPI.INVALID_UINT;
    public static readonly RXMSGCOUNT_INVALID: number = YAPI.INVALID_UINT;
    public static readonly TXMSGCOUNT_INVALID: number = YAPI.INVALID_UINT;
    public static readonly LASTMSG_INVALID: string = YAPI.INVALID_STRING;
    public static readonly CURRENTJOB_INVALID: string = YAPI.INVALID_STRING;
    public static readonly STARTUPJOB_INVALID: string = YAPI.INVALID_STRING;
    public static readonly JOBMAXTASK_INVALID: number = YAPI.INVALID_UINT;
    public static readonly JOBMAXSIZE_INVALID: number = YAPI.INVALID_UINT;
    public static readonly COMMAND_INVALID: string = YAPI.INVALID_STRING;
    public static readonly PROTOCOL_INVALID: string = YAPI.INVALID_STRING;
    public static readonly VOLTAGELEVEL_OFF: YSpiPort.VOLTAGELEVEL = 0;
    public static readonly VOLTAGELEVEL_TTL3V: YSpiPort.VOLTAGELEVEL = 1;
    public static readonly VOLTAGELEVEL_TTL3VR: YSpiPort.VOLTAGELEVEL = 2;
    public static readonly VOLTAGELEVEL_TTL5V: YSpiPort.VOLTAGELEVEL = 3;
    public static readonly VOLTAGELEVEL_TTL5VR: YSpiPort.VOLTAGELEVEL = 4;
    public static readonly VOLTAGELEVEL_RS232: YSpiPort.VOLTAGELEVEL = 5;
    public static readonly VOLTAGELEVEL_RS485: YSpiPort.VOLTAGELEVEL = 6;
    public static readonly VOLTAGELEVEL_TTL1V8: YSpiPort.VOLTAGELEVEL = 7;
    public static readonly VOLTAGELEVEL_SDI12: YSpiPort.VOLTAGELEVEL = 8;
    public static readonly VOLTAGELEVEL_INVALID: YSpiPort.VOLTAGELEVEL = -1;
    public static readonly SPIMODE_INVALID: string = YAPI.INVALID_STRING;
    public static readonly SSPOLARITY_ACTIVE_LOW: YSpiPort.SSPOLARITY = 0;
    public static readonly SSPOLARITY_ACTIVE_HIGH: YSpiPort.SSPOLARITY = 1;
    public static readonly SSPOLARITY_INVALID: YSpiPort.SSPOLARITY = -1;
    public static readonly SHIFTSAMPLING_OFF: YSpiPort.SHIFTSAMPLING = 0;
    public static readonly SHIFTSAMPLING_ON: YSpiPort.SHIFTSAMPLING = 1;
    public static readonly SHIFTSAMPLING_INVALID: YSpiPort.SHIFTSAMPLING = -1;
    //--- (end of generated code: YSpiPort attributes declaration)

    constructor(yapi: YAPIContext, func: string)
    {
        //--- (generated code: YSpiPort constructor)
        super(yapi, func);
        this._className                  = 'SpiPort';
        //--- (end of generated code: YSpiPort constructor)
    }

    //--- (generated code: YSpiPort implementation)

    imm_parseAttr(name: string, val: any): number
    {
        switch (name) {
        case 'rxCount':
            this._rxCount = <number> <number> val;
            return 1;
        case 'txCount':
            this._txCount = <number> <number> val;
            return 1;
        case 'errCount':
            this._errCount = <number> <number> val;
            return 1;
        case 'rxMsgCount':
            this._rxMsgCount = <number> <number> val;
            return 1;
        case 'txMsgCount':
            this._txMsgCount = <number> <number> val;
            return 1;
        case 'lastMsg':
            this._lastMsg = <string> <string> val;
            return 1;
        case 'currentJob':
            this._currentJob = <string> <string> val;
            return 1;
        case 'startupJob':
            this._startupJob = <string> <string> val;
            return 1;
        case 'jobMaxTask':
            this._jobMaxTask = <number> <number> val;
            return 1;
        case 'jobMaxSize':
            this._jobMaxSize = <number> <number> val;
            return 1;
        case 'command':
            this._command = <string> <string> val;
            return 1;
        case 'protocol':
            this._protocol = <string> <string> val;
            return 1;
        case 'voltageLevel':
            this._voltageLevel = <YSpiPort.VOLTAGELEVEL> <number> val;
            return 1;
        case 'spiMode':
            this._spiMode = <string> <string> val;
            return 1;
        case 'ssPolarity':
            this._ssPolarity = <YSpiPort.SSPOLARITY> <number> val;
            return 1;
        case 'shiftSampling':
            this._shiftSampling = <YSpiPort.SHIFTSAMPLING> <number> val;
            return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Returns the total number of bytes received since last reset.
     *
     * @return an integer corresponding to the total number of bytes received since last reset
     *
     * On failure, throws an exception or returns YSpiPort.RXCOUNT_INVALID.
     */
    async get_rxCount(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YSpiPort.RXCOUNT_INVALID;
            }
        }
        res = this._rxCount;
        return res;
    }

    /**
     * Returns the total number of bytes transmitted since last reset.
     *
     * @return an integer corresponding to the total number of bytes transmitted since last reset
     *
     * On failure, throws an exception or returns YSpiPort.TXCOUNT_INVALID.
     */
    async get_txCount(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YSpiPort.TXCOUNT_INVALID;
            }
        }
        res = this._txCount;
        return res;
    }

    /**
     * Returns the total number of communication errors detected since last reset.
     *
     * @return an integer corresponding to the total number of communication errors detected since last reset
     *
     * On failure, throws an exception or returns YSpiPort.ERRCOUNT_INVALID.
     */
    async get_errCount(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YSpiPort.ERRCOUNT_INVALID;
            }
        }
        res = this._errCount;
        return res;
    }

    /**
     * Returns the total number of messages received since last reset.
     *
     * @return an integer corresponding to the total number of messages received since last reset
     *
     * On failure, throws an exception or returns YSpiPort.RXMSGCOUNT_INVALID.
     */
    async get_rxMsgCount(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YSpiPort.RXMSGCOUNT_INVALID;
            }
        }
        res = this._rxMsgCount;
        return res;
    }

    /**
     * Returns the total number of messages send since last reset.
     *
     * @return an integer corresponding to the total number of messages send since last reset
     *
     * On failure, throws an exception or returns YSpiPort.TXMSGCOUNT_INVALID.
     */
    async get_txMsgCount(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YSpiPort.TXMSGCOUNT_INVALID;
            }
        }
        res = this._txMsgCount;
        return res;
    }

    /**
     * Returns the latest message fully received (for Line and Frame protocols).
     *
     * @return a string corresponding to the latest message fully received (for Line and Frame protocols)
     *
     * On failure, throws an exception or returns YSpiPort.LASTMSG_INVALID.
     */
    async get_lastMsg(): Promise<string>
    {
        let res: string;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YSpiPort.LASTMSG_INVALID;
            }
        }
        res = this._lastMsg;
        return res;
    }

    /**
     * Returns the name of the job file currently in use.
     *
     * @return a string corresponding to the name of the job file currently in use
     *
     * On failure, throws an exception or returns YSpiPort.CURRENTJOB_INVALID.
     */
    async get_currentJob(): Promise<string>
    {
        let res: string;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YSpiPort.CURRENTJOB_INVALID;
            }
        }
        res = this._currentJob;
        return res;
    }

    /**
     * Selects a job file to run immediately. If an empty string is
     * given as argument, stops running current job file.
     *
     * @param newval : a string
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_currentJob(newval: string): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('currentJob', rest_val);
    }

    /**
     * Returns the job file to use when the device is powered on.
     *
     * @return a string corresponding to the job file to use when the device is powered on
     *
     * On failure, throws an exception or returns YSpiPort.STARTUPJOB_INVALID.
     */
    async get_startupJob(): Promise<string>
    {
        let res: string;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YSpiPort.STARTUPJOB_INVALID;
            }
        }
        res = this._startupJob;
        return res;
    }

    /**
     * Changes the job to use when the device is powered on.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : a string corresponding to the job to use when the device is powered on
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_startupJob(newval: string): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('startupJob', rest_val);
    }

    /**
     * Returns the maximum number of tasks in a job that the device can handle.
     *
     * @return an integer corresponding to the maximum number of tasks in a job that the device can handle
     *
     * On failure, throws an exception or returns YSpiPort.JOBMAXTASK_INVALID.
     */
    async get_jobMaxTask(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration == 0) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YSpiPort.JOBMAXTASK_INVALID;
            }
        }
        res = this._jobMaxTask;
        return res;
    }

    /**
     * Returns maximum size allowed for job files.
     *
     * @return an integer corresponding to maximum size allowed for job files
     *
     * On failure, throws an exception or returns YSpiPort.JOBMAXSIZE_INVALID.
     */
    async get_jobMaxSize(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration == 0) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YSpiPort.JOBMAXSIZE_INVALID;
            }
        }
        res = this._jobMaxSize;
        return res;
    }

    async get_command(): Promise<string>
    {
        let res: string;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YSpiPort.COMMAND_INVALID;
            }
        }
        res = this._command;
        return res;
    }

    async set_command(newval: string): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('command', rest_val);
    }

    /**
     * Returns the type of protocol used over the serial line, as a string.
     * Possible values are "Line" for ASCII messages separated by CR and/or LF,
     * "Frame:[timeout]ms" for binary messages separated by a delay time,
     * "Char" for a continuous ASCII stream or
     * "Byte" for a continuous binary stream.
     *
     * @return a string corresponding to the type of protocol used over the serial line, as a string
     *
     * On failure, throws an exception or returns YSpiPort.PROTOCOL_INVALID.
     */
    async get_protocol(): Promise<string>
    {
        let res: string;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YSpiPort.PROTOCOL_INVALID;
            }
        }
        res = this._protocol;
        return res;
    }

    /**
     * Changes the type of protocol used over the serial line.
     * Possible values are "Line" for ASCII messages separated by CR and/or LF,
     * "Frame:[timeout]ms" for binary messages separated by a delay time,
     * "Char" for a continuous ASCII stream or
     * "Byte" for a continuous binary stream.
     * The suffix "/[wait]ms" can be added to reduce the transmit rate so that there
     * is always at lest the specified number of milliseconds between each bytes sent.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : a string corresponding to the type of protocol used over the serial line
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_protocol(newval: string): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('protocol', rest_val);
    }

    /**
     * Returns the voltage level used on the serial line.
     *
     * @return a value among YSpiPort.VOLTAGELEVEL_OFF, YSpiPort.VOLTAGELEVEL_TTL3V,
     * YSpiPort.VOLTAGELEVEL_TTL3VR, YSpiPort.VOLTAGELEVEL_TTL5V, YSpiPort.VOLTAGELEVEL_TTL5VR,
     * YSpiPort.VOLTAGELEVEL_RS232, YSpiPort.VOLTAGELEVEL_RS485, YSpiPort.VOLTAGELEVEL_TTL1V8 and
     * YSpiPort.VOLTAGELEVEL_SDI12 corresponding to the voltage level used on the serial line
     *
     * On failure, throws an exception or returns YSpiPort.VOLTAGELEVEL_INVALID.
     */
    async get_voltageLevel(): Promise<YSpiPort.VOLTAGELEVEL>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YSpiPort.VOLTAGELEVEL_INVALID;
            }
        }
        res = this._voltageLevel;
        return res;
    }

    /**
     * Changes the voltage type used on the serial line. Valid
     * values  will depend on the Yoctopuce device model featuring
     * the serial port feature.  Check your device documentation
     * to find out which values are valid for that specific model.
     * Trying to set an invalid value will have no effect.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : a value among YSpiPort.VOLTAGELEVEL_OFF, YSpiPort.VOLTAGELEVEL_TTL3V,
     * YSpiPort.VOLTAGELEVEL_TTL3VR, YSpiPort.VOLTAGELEVEL_TTL5V, YSpiPort.VOLTAGELEVEL_TTL5VR,
     * YSpiPort.VOLTAGELEVEL_RS232, YSpiPort.VOLTAGELEVEL_RS485, YSpiPort.VOLTAGELEVEL_TTL1V8 and
     * YSpiPort.VOLTAGELEVEL_SDI12 corresponding to the voltage type used on the serial line
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_voltageLevel(newval: YSpiPort.VOLTAGELEVEL): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('voltageLevel', rest_val);
    }

    /**
     * Returns the SPI port communication parameters, as a string such as
     * "125000,0,msb". The string includes the baud rate, the SPI mode (between
     * 0 and 3) and the bit order.
     *
     * @return a string corresponding to the SPI port communication parameters, as a string such as
     *         "125000,0,msb"
     *
     * On failure, throws an exception or returns YSpiPort.SPIMODE_INVALID.
     */
    async get_spiMode(): Promise<string>
    {
        let res: string;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YSpiPort.SPIMODE_INVALID;
            }
        }
        res = this._spiMode;
        return res;
    }

    /**
     * Changes the SPI port communication parameters, with a string such as
     * "125000,0,msb". The string includes the baud rate, the SPI mode (between
     * 0 and 3) and the bit order.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : a string corresponding to the SPI port communication parameters, with a string such as
     *         "125000,0,msb"
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_spiMode(newval: string): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('spiMode', rest_val);
    }

    /**
     * Returns the SS line polarity.
     *
     * @return either YSpiPort.SSPOLARITY_ACTIVE_LOW or YSpiPort.SSPOLARITY_ACTIVE_HIGH, according to the
     * SS line polarity
     *
     * On failure, throws an exception or returns YSpiPort.SSPOLARITY_INVALID.
     */
    async get_ssPolarity(): Promise<YSpiPort.SSPOLARITY>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YSpiPort.SSPOLARITY_INVALID;
            }
        }
        res = this._ssPolarity;
        return res;
    }

    /**
     * Changes the SS line polarity.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : either YSpiPort.SSPOLARITY_ACTIVE_LOW or YSpiPort.SSPOLARITY_ACTIVE_HIGH, according
     * to the SS line polarity
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_ssPolarity(newval: YSpiPort.SSPOLARITY): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('ssPolarity', rest_val);
    }

    /**
     * Returns true when the SDI line phase is shifted with regards to the SDO line.
     *
     * @return either YSpiPort.SHIFTSAMPLING_OFF or YSpiPort.SHIFTSAMPLING_ON, according to true when the
     * SDI line phase is shifted with regards to the SDO line
     *
     * On failure, throws an exception or returns YSpiPort.SHIFTSAMPLING_INVALID.
     */
    async get_shiftSampling(): Promise<YSpiPort.SHIFTSAMPLING>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YSpiPort.SHIFTSAMPLING_INVALID;
            }
        }
        res = this._shiftSampling;
        return res;
    }

    /**
     * Changes the SDI line sampling shift. When disabled, SDI line is
     * sampled in the middle of data output time. When enabled, SDI line is
     * samples at the end of data output time.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : either YSpiPort.SHIFTSAMPLING_OFF or YSpiPort.SHIFTSAMPLING_ON, according to the
     * SDI line sampling shift
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_shiftSampling(newval: YSpiPort.SHIFTSAMPLING): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('shiftSampling', rest_val);
    }

    /**
     * Retrieves a SPI port for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the SPI port is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YSpiPort.isOnline() to test if the SPI port is
     * indeed online at a given time. In case of ambiguity when looking for
     * a SPI port by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the SPI port, for instance
     *         YSPIMK01.spiPort.
     *
     * @return a YSpiPort object allowing you to drive the SPI port.
     */
    static FindSpiPort(func: string): YSpiPort
    {
        let obj: YSpiPort | null;
        obj = <YSpiPort> YFunction._FindFromCache('SpiPort', func);
        if (obj == null) {
            obj = new YSpiPort(YAPI, func);
            YFunction._AddToCache('SpiPort',  func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a SPI port for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the SPI port is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YSpiPort.isOnline() to test if the SPI port is
     * indeed online at a given time. In case of ambiguity when looking for
     * a SPI port by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx : a YAPI context
     * @param func : a string that uniquely characterizes the SPI port, for instance
     *         YSPIMK01.spiPort.
     *
     * @return a YSpiPort object allowing you to drive the SPI port.
     */
    static FindSpiPortInContext(yctx: YAPIContext, func: string): YSpiPort
    {
        let obj: YSpiPort | null;
        obj = <YSpiPort> YFunction._FindFromCacheInContext(yctx,  'SpiPort', func);
        if (obj == null) {
            obj = new YSpiPort(yctx, func);
            YFunction._AddToCache('SpiPort',  func, obj);
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
    async registerValueCallback(callback: YSpiPort.ValueCallback | null): Promise<number>
    {
        let val: string;
        if (callback != null) {
            await YFunction._UpdateValueCallbackList(this, true);
        } else {
            await YFunction._UpdateValueCallbackList(this, false);
        }
        this._valueCallbackSpiPort = callback;
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
        if (this._valueCallbackSpiPort != null) {
            try {
                await this._valueCallbackSpiPort(this, value);
            } catch (e) {
                this._yapi.imm_log('Exception in valueCallback:', e);
            }
        } else {
            await super._invokeValueCallback(value);
        }
        return 0;
    }

    async sendCommand(text: string): Promise<number>
    {
        return await this.set_command(text);
    }

    /**
     * Reads a single line (or message) from the receive buffer, starting at current stream position.
     * This function is intended to be used when the serial port is configured for a message protocol,
     * such as 'Line' mode or frame protocols.
     *
     * If data at current stream position is not available anymore in the receive buffer,
     * the function returns the oldest available line and moves the stream position just after.
     * If no new full line is received, the function returns an empty line.
     *
     * @return a string with a single line of text
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async readLine(): Promise<string>
    {
        let url: string;
        let msgbin: Uint8Array;
        let msgarr: string[] = [];
        let msglen: number;
        let res: string;

        url = 'rxmsg.json?pos=' + String(Math.round(this._rxptr)) + '&len=1&maxw=1';
        msgbin = await this._download(url);
        msgarr = this.imm_json_get_array(msgbin);
        msglen = msgarr.length;
        if (msglen == 0) {
            return '';
        }
        // last element of array is the new position
        msglen = msglen - 1;
        this._rxptr = YAPIContext.imm_atoi(msgarr[msglen]);
        if (msglen == 0) {
            return '';
        }
        res = this.imm_json_get_string(this._yapi.imm_str2bin(msgarr[0]));
        return res;
    }

    /**
     * Searches for incoming messages in the serial port receive buffer matching a given pattern,
     * starting at current position. This function will only compare and return printable characters
     * in the message strings. Binary protocols are handled as hexadecimal strings.
     *
     * The search returns all messages matching the expression provided as argument in the buffer.
     * If no matching message is found, the search waits for one up to the specified maximum timeout
     * (in milliseconds).
     *
     * @param pattern : a limited regular expression describing the expected message format,
     *         or an empty string if all messages should be returned (no filtering).
     *         When using binary protocols, the format applies to the hexadecimal
     *         representation of the message.
     * @param maxWait : the maximum number of milliseconds to wait for a message if none is found
     *         in the receive buffer.
     *
     * @return an array of strings containing the messages found, if any.
     *         Binary messages are converted to hexadecimal representation.
     *
     * On failure, throws an exception or returns an empty array.
     */
    async readMessages(pattern: string, maxWait: number): Promise<string[]>
    {
        let url: string;
        let msgbin: Uint8Array;
        let msgarr: string[] = [];
        let msglen: number;
        let res: string[] = [];
        let idx: number;

        url = 'rxmsg.json?pos=' + String(Math.round(this._rxptr)) + '&maxw=' + String(Math.round(maxWait)) + '&pat=' + pattern;
        msgbin = await this._download(url);
        msgarr = this.imm_json_get_array(msgbin);
        msglen = msgarr.length;
        if (msglen == 0) {
            return res;
        }
        // last element of array is the new position
        msglen = msglen - 1;
        this._rxptr = YAPIContext.imm_atoi(msgarr[msglen]);
        idx = 0;
        while (idx < msglen) {
            res.push(this.imm_json_get_string(this._yapi.imm_str2bin(msgarr[idx])));
            idx = idx + 1;
        }
        return res;
    }

    /**
     * Changes the current internal stream position to the specified value. This function
     * does not affect the device, it only changes the value stored in the API object
     * for the next read operations.
     *
     * @param absPos : the absolute position index for next read operations.
     *
     * @return nothing.
     */
    async read_seek(absPos: number): Promise<number>
    {
        this._rxptr = absPos;
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the current absolute stream position pointer of the API object.
     *
     * @return the absolute position index for next read operations.
     */
    async read_tell(): Promise<number>
    {
        return this._rxptr;
    }

    /**
     * Returns the number of bytes available to read in the input buffer starting from the
     * current absolute stream position pointer of the API object.
     *
     * @return the number of bytes available to read
     */
    async read_avail(): Promise<number>
    {
        let availPosStr: string;
        let atPos: number;
        let res: number;
        let databin: Uint8Array;

        databin = await this._download('rxcnt.bin?pos=' + String(Math.round(this._rxptr)));
        availPosStr = this._yapi.imm_bin2str(databin);
        atPos = (availPosStr).indexOf('@');
        res = YAPIContext.imm_atoi((availPosStr).substr(0, atPos));
        return res;
    }

    async end_tell(): Promise<number>
    {
        let availPosStr: string;
        let atPos: number;
        let res: number;
        let databin: Uint8Array;

        databin = await this._download('rxcnt.bin?pos=' + String(Math.round(this._rxptr)));
        availPosStr = this._yapi.imm_bin2str(databin);
        atPos = (availPosStr).indexOf('@');
        res = YAPIContext.imm_atoi((availPosStr).substr(atPos+1, (availPosStr).length-atPos-1));
        return res;
    }

    /**
     * Sends a text line query to the serial port, and reads the reply, if any.
     * This function is intended to be used when the serial port is configured for 'Line' protocol.
     *
     * @param query : the line query to send (without CR/LF)
     * @param maxWait : the maximum number of milliseconds to wait for a reply.
     *
     * @return the next text line received after sending the text query, as a string.
     *         Additional lines can be obtained by calling readLine or readMessages.
     *
     * On failure, throws an exception or returns an empty string.
     */
    async queryLine(query: string, maxWait: number): Promise<string>
    {
        let prevpos: number;
        let url: string;
        let msgbin: Uint8Array;
        let msgarr: string[] = [];
        let msglen: number;
        let res: string;
        if ((query).length <= 80) {
            // fast query
            url = 'rxmsg.json?len=1&maxw=' + String(Math.round(maxWait)) + '&cmd=!' + this.imm_escapeAttr(query);
        } else {
            // long query
            prevpos = await this.end_tell();
            await this._upload('txdata', this._yapi.imm_str2bin(query + '\r\n'));
            url = 'rxmsg.json?len=1&maxw=' + String(Math.round(maxWait)) + '&pos=' + String(Math.round(prevpos));
        }

        msgbin = await this._download(url);
        msgarr = this.imm_json_get_array(msgbin);
        msglen = msgarr.length;
        if (msglen == 0) {
            return '';
        }
        // last element of array is the new position
        msglen = msglen - 1;
        this._rxptr = YAPIContext.imm_atoi(msgarr[msglen]);
        if (msglen == 0) {
            return '';
        }
        res = this.imm_json_get_string(this._yapi.imm_str2bin(msgarr[0]));
        return res;
    }

    /**
     * Sends a binary message to the serial port, and reads the reply, if any.
     * This function is intended to be used when the serial port is configured for
     * Frame-based protocol.
     *
     * @param hexString : the message to send, coded in hexadecimal
     * @param maxWait : the maximum number of milliseconds to wait for a reply.
     *
     * @return the next frame received after sending the message, as a hex string.
     *         Additional frames can be obtained by calling readHex or readMessages.
     *
     * On failure, throws an exception or returns an empty string.
     */
    async queryHex(hexString: string, maxWait: number): Promise<string>
    {
        let prevpos: number;
        let url: string;
        let msgbin: Uint8Array;
        let msgarr: string[] = [];
        let msglen: number;
        let res: string;
        if ((hexString).length <= 80) {
            // fast query
            url = 'rxmsg.json?len=1&maxw=' + String(Math.round(maxWait)) + '&cmd=$' + hexString;
        } else {
            // long query
            prevpos = await this.end_tell();
            await this._upload('txdata', this._yapi.imm_hexstr2bin(hexString));
            url = 'rxmsg.json?len=1&maxw=' + String(Math.round(maxWait)) + '&pos=' + String(Math.round(prevpos));
        }

        msgbin = await this._download(url);
        msgarr = this.imm_json_get_array(msgbin);
        msglen = msgarr.length;
        if (msglen == 0) {
            return '';
        }
        // last element of array is the new position
        msglen = msglen - 1;
        this._rxptr = YAPIContext.imm_atoi(msgarr[msglen]);
        if (msglen == 0) {
            return '';
        }
        res = this.imm_json_get_string(this._yapi.imm_str2bin(msgarr[0]));
        return res;
    }

    /**
     * Saves the job definition string (JSON data) into a job file.
     * The job file can be later enabled using selectJob().
     *
     * @param jobfile : name of the job file to save on the device filesystem
     * @param jsonDef : a string containing a JSON definition of the job
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async uploadJob(jobfile: string, jsonDef: string): Promise<number>
    {
        await this._upload(jobfile, this._yapi.imm_str2bin(jsonDef));
        return this._yapi.SUCCESS;
    }

    /**
     * Load and start processing the specified job file. The file must have
     * been previously created using the user interface or uploaded on the
     * device filesystem using the uploadJob() function.
     *
     * @param jobfile : name of the job file (on the device filesystem)
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async selectJob(jobfile: string): Promise<number>
    {
        return await this.set_currentJob(jobfile);
    }

    /**
     * Clears the serial port buffer and resets counters to zero.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async reset(): Promise<number>
    {
        this._eventPos = 0;
        this._rxptr = 0;
        this._rxbuffptr = 0;
        this._rxbuff = new Uint8Array(0);

        return await this.sendCommand('Z');
    }

    /**
     * Sends a single byte to the serial port.
     *
     * @param code : the byte to send
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async writeByte(code: number): Promise<number>
    {
        return await this.sendCommand('$' + ('00'+(code).toString(16)).slice(-2).toUpperCase());
    }

    /**
     * Sends an ASCII string to the serial port, as is.
     *
     * @param text : the text string to send
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async writeStr(text: string): Promise<number>
    {
        let buff: Uint8Array;
        let bufflen: number;
        let idx: number;
        let ch: number;
        buff = this._yapi.imm_str2bin(text);
        bufflen = (buff).length;
        if (bufflen < 100) {
            // if string is pure text, we can send it as a simple command (faster)
            ch = 0x20;
            idx = 0;
            while ((idx < bufflen) && (ch != 0)) {
                ch = buff[idx];
                if ((ch >= 0x20) && (ch < 0x7f)) {
                    idx = idx + 1;
                } else {
                    ch = 0;
                }
            }
            if (idx >= bufflen) {
                return await this.sendCommand('+' + text);
            }
        }
        // send string using file upload
        return await this._upload('txdata', buff);
    }

    /**
     * Sends a binary buffer to the serial port, as is.
     *
     * @param buff : the binary buffer to send
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async writeBin(buff: Uint8Array): Promise<number>
    {
        return await this._upload('txdata', buff);
    }

    /**
     * Sends a byte sequence (provided as a list of bytes) to the serial port.
     *
     * @param byteList : a list of byte codes
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async writeArray(byteList: number[]): Promise<number>
    {
        let buff: Uint8Array;
        let bufflen: number;
        let idx: number;
        let hexb: number;
        let res: number;
        bufflen = byteList.length;
        buff = new Uint8Array(bufflen);
        idx = 0;
        while (idx < bufflen) {
            hexb = byteList[idx];
            buff.set([hexb], idx);
            idx = idx + 1;
        }

        res = await this._upload('txdata', buff);
        return res;
    }

    /**
     * Sends a byte sequence (provided as a hexadecimal string) to the serial port.
     *
     * @param hexString : a string of hexadecimal byte codes
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async writeHex(hexString: string): Promise<number>
    {
        let buff: Uint8Array;
        let bufflen: number;
        let idx: number;
        let hexb: number;
        let res: number;
        bufflen = (hexString).length;
        if (bufflen < 100) {
            return await this.sendCommand('$' + hexString);
        }
        bufflen = ((bufflen) >> (1));
        buff = new Uint8Array(bufflen);
        idx = 0;
        while (idx < bufflen) {
            hexb = parseInt((hexString).substr(2 * idx, 2), 16);
            buff.set([hexb], idx);
            idx = idx + 1;
        }

        res = await this._upload('txdata', buff);
        return res;
    }

    /**
     * Sends an ASCII string to the serial port, followed by a line break (CR LF).
     *
     * @param text : the text string to send
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async writeLine(text: string): Promise<number>
    {
        let buff: Uint8Array;
        let bufflen: number;
        let idx: number;
        let ch: number;
        buff = this._yapi.imm_str2bin(text + '\r\n');
        bufflen = (buff).length-2;
        if (bufflen < 100) {
            // if string is pure text, we can send it as a simple command (faster)
            ch = 0x20;
            idx = 0;
            while ((idx < bufflen) && (ch != 0)) {
                ch = buff[idx];
                if ((ch >= 0x20) && (ch < 0x7f)) {
                    idx = idx + 1;
                } else {
                    ch = 0;
                }
            }
            if (idx >= bufflen) {
                return await this.sendCommand('!' + text);
            }
        }
        // send string using file upload
        return await this._upload('txdata', buff);
    }

    /**
     * Reads one byte from the receive buffer, starting at current stream position.
     * If data at current stream position is not available anymore in the receive buffer,
     * or if there is no data available yet, the function returns YAPI.NO_MORE_DATA.
     *
     * @return the next byte
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async readByte(): Promise<number>
    {
        let currpos: number;
        let reqlen: number;
        let buff: Uint8Array;
        let bufflen: number;
        let mult: number;
        let endpos: number;
        let res: number;
        // first check if we have the requested character in the look-ahead buffer
        bufflen = (this._rxbuff).length;
        if ((this._rxptr >= this._rxbuffptr) && (this._rxptr < this._rxbuffptr+bufflen)) {
            res = this._rxbuff[this._rxptr-this._rxbuffptr];
            this._rxptr = this._rxptr + 1;
            return res;
        }
        // try to preload more than one byte to speed-up byte-per-byte access
        currpos = this._rxptr;
        reqlen = 1024;
        buff = await this.readBin(reqlen);
        bufflen = (buff).length;
        if (this._rxptr == currpos+bufflen) {
            res = buff[0];
            this._rxptr = currpos+1;
            this._rxbuffptr = currpos;
            this._rxbuff = buff;
            return res;
        }
        // mixed bidirectional data, retry with a smaller block
        this._rxptr = currpos;
        reqlen = 16;
        buff = await this.readBin(reqlen);
        bufflen = (buff).length;
        if (this._rxptr == currpos+bufflen) {
            res = buff[0];
            this._rxptr = currpos+1;
            this._rxbuffptr = currpos;
            this._rxbuff = buff;
            return res;
        }
        // still mixed, need to process character by character
        this._rxptr = currpos;

        buff = await this._download('rxdata.bin?pos=' + String(Math.round(this._rxptr)) + '&len=1');
        bufflen = (buff).length - 1;
        endpos = 0;
        mult = 1;
        while ((bufflen > 0) && (buff[bufflen] != 64)) {
            endpos = endpos + mult * (buff[bufflen] - 48);
            mult = mult * 10;
            bufflen = bufflen - 1;
        }
        this._rxptr = endpos;
        if (bufflen == 0) {
            return this._yapi.NO_MORE_DATA;
        }
        res = buff[0];
        return res;
    }

    /**
     * Reads data from the receive buffer as a string, starting at current stream position.
     * If data at current stream position is not available anymore in the receive buffer, the
     * function performs a short read.
     *
     * @param nChars : the maximum number of characters to read
     *
     * @return a string with receive buffer contents
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async readStr(nChars: number): Promise<string>
    {
        let buff: Uint8Array;
        let bufflen: number;
        let mult: number;
        let endpos: number;
        let res: string;
        if (nChars > 65535) {
            nChars = 65535;
        }

        buff = await this._download('rxdata.bin?pos=' + String(Math.round(this._rxptr)) + '&len=' + String(Math.round(nChars)));
        bufflen = (buff).length - 1;
        endpos = 0;
        mult = 1;
        while ((bufflen > 0) && (buff[bufflen] != 64)) {
            endpos = endpos + mult * (buff[bufflen] - 48);
            mult = mult * 10;
            bufflen = bufflen - 1;
        }
        this._rxptr = endpos;
        res = (this._yapi.imm_bin2str(buff)).substr(0, bufflen);
        return res;
    }

    /**
     * Reads data from the receive buffer as a binary buffer, starting at current stream position.
     * If data at current stream position is not available anymore in the receive buffer, the
     * function performs a short read.
     *
     * @param nChars : the maximum number of bytes to read
     *
     * @return a binary object with receive buffer contents
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async readBin(nChars: number): Promise<Uint8Array>
    {
        let buff: Uint8Array;
        let bufflen: number;
        let mult: number;
        let endpos: number;
        let idx: number;
        let res: Uint8Array;
        if (nChars > 65535) {
            nChars = 65535;
        }

        buff = await this._download('rxdata.bin?pos=' + String(Math.round(this._rxptr)) + '&len=' + String(Math.round(nChars)));
        bufflen = (buff).length - 1;
        endpos = 0;
        mult = 1;
        while ((bufflen > 0) && (buff[bufflen] != 64)) {
            endpos = endpos + mult * (buff[bufflen] - 48);
            mult = mult * 10;
            bufflen = bufflen - 1;
        }
        this._rxptr = endpos;
        res = new Uint8Array(bufflen);
        idx = 0;
        while (idx < bufflen) {
            res.set([buff[idx]], idx);
            idx = idx + 1;
        }
        return res;
    }

    /**
     * Reads data from the receive buffer as a list of bytes, starting at current stream position.
     * If data at current stream position is not available anymore in the receive buffer, the
     * function performs a short read.
     *
     * @param nChars : the maximum number of bytes to read
     *
     * @return a sequence of bytes with receive buffer contents
     *
     * On failure, throws an exception or returns an empty array.
     */
    async readArray(nChars: number): Promise<number[]>
    {
        let buff: Uint8Array;
        let bufflen: number;
        let mult: number;
        let endpos: number;
        let idx: number;
        let b: number;
        let res: number[] = [];
        if (nChars > 65535) {
            nChars = 65535;
        }

        buff = await this._download('rxdata.bin?pos=' + String(Math.round(this._rxptr)) + '&len=' + String(Math.round(nChars)));
        bufflen = (buff).length - 1;
        endpos = 0;
        mult = 1;
        while ((bufflen > 0) && (buff[bufflen] != 64)) {
            endpos = endpos + mult * (buff[bufflen] - 48);
            mult = mult * 10;
            bufflen = bufflen - 1;
        }
        this._rxptr = endpos;
        res.length = 0;
        idx = 0;
        while (idx < bufflen) {
            b = buff[idx];
            res.push(b);
            idx = idx + 1;
        }
        return res;
    }

    /**
     * Reads data from the receive buffer as a hexadecimal string, starting at current stream position.
     * If data at current stream position is not available anymore in the receive buffer, the
     * function performs a short read.
     *
     * @param nBytes : the maximum number of bytes to read
     *
     * @return a string with receive buffer contents, encoded in hexadecimal
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async readHex(nBytes: number): Promise<string>
    {
        let buff: Uint8Array;
        let bufflen: number;
        let mult: number;
        let endpos: number;
        let ofs: number;
        let res: string;
        if (nBytes > 65535) {
            nBytes = 65535;
        }

        buff = await this._download('rxdata.bin?pos=' + String(Math.round(this._rxptr)) + '&len=' + String(Math.round(nBytes)));
        bufflen = (buff).length - 1;
        endpos = 0;
        mult = 1;
        while ((bufflen > 0) && (buff[bufflen] != 64)) {
            endpos = endpos + mult * (buff[bufflen] - 48);
            mult = mult * 10;
            bufflen = bufflen - 1;
        }
        this._rxptr = endpos;
        res = '';
        ofs = 0;
        while (ofs + 3 < bufflen) {
            res = res + '' + ('00'+(buff[ofs]).toString(16)).slice(-2).toUpperCase() + '' + ('00'+(buff[ofs + 1]).toString(16)).slice(-2).toUpperCase() + '' + ('00'+(buff[ofs + 2]).toString(16)).slice(-2).toUpperCase() + '' + ('00'+(buff[ofs + 3]).toString(16)).slice(-2).toUpperCase();
            ofs = ofs + 4;
        }
        while (ofs < bufflen) {
            res = res + '' + ('00'+(buff[ofs]).toString(16)).slice(-2).toUpperCase();
            ofs = ofs + 1;
        }
        return res;
    }

    /**
     * Manually sets the state of the SS line. This function has no effect when
     * the SS line is handled automatically.
     *
     * @param val : 1 to turn SS active, 0 to release SS.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_SS(val: number): Promise<number>
    {
        return await this.sendCommand('S' + String(Math.round(val)));
    }

    /**
     * Retrieves messages (both direction) in the SPI port buffer, starting at current position.
     *
     * If no message is found, the search waits for one up to the specified maximum timeout
     * (in milliseconds).
     *
     * @param maxWait : the maximum number of milliseconds to wait for a message if none is found
     *         in the receive buffer.
     *
     * @return an array of YSpiSnoopingRecord objects containing the messages found, if any.
     *
     * On failure, throws an exception or returns an empty array.
     */
    async snoopMessages(maxWait: number): Promise<YSpiSnoopingRecord[]>
    {
        let url: string;
        let msgbin: Uint8Array;
        let msgarr: string[] = [];
        let msglen: number;
        let res: YSpiSnoopingRecord[] = [];
        let idx: number;

        url = 'rxmsg.json?pos=' + String(Math.round(this._rxptr)) + '&maxw=' + String(Math.round(maxWait)) + '&t=0';
        msgbin = await this._download(url);
        msgarr = this.imm_json_get_array(msgbin);
        msglen = msgarr.length;
        if (msglen == 0) {
            return res;
        }
        // last element of array is the new position
        msglen = msglen - 1;
        this._rxptr = YAPIContext.imm_atoi(msgarr[msglen]);
        idx = 0;
        while (idx < msglen) {
            res.push(new YSpiSnoopingRecord(msgarr[idx]));
            idx = idx + 1;
        }
        return res;
    }

    /**
     * Continues the enumeration of SPI ports started using yFirstSpiPort().
     * Caution: You can't make any assumption about the returned SPI ports order.
     * If you want to find a specific a SPI port, use SpiPort.findSpiPort()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YSpiPort object, corresponding to
     *         a SPI port currently online, or a null pointer
     *         if there are no more SPI ports to enumerate.
     */
    nextSpiPort(): YSpiPort | null
    {
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != YAPI.SUCCESS) return null;
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, <string> resolve.result);
        if (next_hwid == null) return null;
        return YSpiPort.FindSpiPortInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of SPI ports currently accessible.
     * Use the method YSpiPort.nextSpiPort() to iterate on
     * next SPI ports.
     *
     * @return a pointer to a YSpiPort object, corresponding to
     *         the first SPI port currently online, or a null pointer
     *         if there are none.
     */
    static FirstSpiPort(): YSpiPort | null
    {
        let next_hwid = YAPI.imm_getFirstHardwareId('SpiPort');
        if (next_hwid == null) return null;
        return YSpiPort.FindSpiPort(next_hwid);
    }

    /**
     * Starts the enumeration of SPI ports currently accessible.
     * Use the method YSpiPort.nextSpiPort() to iterate on
     * next SPI ports.
     *
     * @param yctx : a YAPI context.
     *
     * @return a pointer to a YSpiPort object, corresponding to
     *         the first SPI port currently online, or a null pointer
     *         if there are none.
     */
    static FirstSpiPortInContext(yctx: YAPIContext): YSpiPort | null
    {
        let next_hwid = yctx.imm_getFirstHardwareId('SpiPort');
        if (next_hwid == null) return null;
        return YSpiPort.FindSpiPortInContext(yctx, next_hwid);
    }

    //--- (end of generated code: YSpiPort implementation)
}

export namespace YSpiPort
{
    //--- (generated code: YSpiPort definitions)
    export const enum VOLTAGELEVEL
    {
        OFF = 0,
        TTL3V = 1,
        TTL3VR = 2,
        TTL5V = 3,
        TTL5VR = 4,
        RS232 = 5,
        RS485 = 6,
        TTL1V8 = 7,
        SDI12 = 8,
        INVALID = -1
    }

    export const enum SSPOLARITY
    {
        ACTIVE_LOW = 0,
        ACTIVE_HIGH = 1,
        INVALID = -1
    }

    export const enum SHIFTSAMPLING
    {
        OFF = 0,
        ON = 1,
        INVALID = -1
    }

    export interface ValueCallback {(func: YSpiPort, value: string): void}

    //--- (end of generated code: YSpiPort definitions)
}