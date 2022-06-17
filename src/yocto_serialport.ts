/*********************************************************************
 *
 *  $Id: yocto_serialport.ts 49904 2022-05-25 14:18:55Z mvuilleu $
 *
 *  Implements the high-level API for SnoopingRecord functions
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

//--- (generated code: YSnoopingRecord class start)
/**
 * YSnoopingRecord Class: Intercepted serial message description, returned by serialPort.snoopMessages method
 *
 *
 */
//--- (end of generated code: YSnoopingRecord class start)

export class YSnoopingRecord
{
    //--- (generated code: YSnoopingRecord attributes declaration)
    _tim: number = 0;
    _dir: number = 0;
    _msg: string = '';

    // API symbols as static members
    //--- (end of generated code: YSnoopingRecord attributes declaration)

    constructor(str_json: string)
    {
        //--- (generated code: YSnoopingRecord constructor)
        //--- (end of generated code: YSnoopingRecord constructor)
        var loadval = JSON.parse(str_json);
        this._tim = loadval.t;
        this._dir = (loadval.m[0] == '<' ? 1 : 0);
        this._msg = loadval.m.slice(1);
    }

    //--- (generated code: YSnoopingRecord implementation)

    /**
     * Returns the elapsed time, in ms, since the beginning of the preceding message.
     *
     * @return the elapsed time, in ms, since the beginning of the preceding message.
     */
    async get_time(): Promise<number>
    {
        return this._tim;
    }

    /**
     * Returns the message direction (RX=0, TX=1).
     *
     * @return the message direction (RX=0, TX=1).
     */
    async get_direction(): Promise<number>
    {
        return this._dir;
    }

    /**
     * Returns the message content.
     *
     * @return the message content.
     */
    async get_message(): Promise<string>
    {
        return this._msg;
    }

    //--- (end of generated code: YSnoopingRecord implementation)
}

export namespace YSnoopingRecord {
//--- (generated code: YSnoopingRecord definitions)
//--- (end of generated code: YSnoopingRecord definitions)
}

//--- (generated code: YSerialPort class start)
/**
 * YSerialPort Class: serial port control interface, available for instance in the Yocto-RS232, the
 * Yocto-RS485-V2 or the Yocto-Serial
 *
 * The YSerialPort class allows you to fully drive a Yoctopuce serial port.
 * It can be used to send and receive data, and to configure communication
 * parameters (baud rate, bit count, parity, flow control and protocol).
 * Note that Yoctopuce serial ports are not exposed as virtual COM ports.
 * They are meant to be used in the same way as all Yoctopuce devices.
 */
//--- (end of generated code: YSerialPort class start)
/** @extends {YFunction} **/
export class YSerialPort extends YFunction
{
    //--- (generated code: YSerialPort attributes declaration)
    _className: string;
    _rxCount: number = YSerialPort.RXCOUNT_INVALID;
    _txCount: number = YSerialPort.TXCOUNT_INVALID;
    _errCount: number = YSerialPort.ERRCOUNT_INVALID;
    _rxMsgCount: number = YSerialPort.RXMSGCOUNT_INVALID;
    _txMsgCount: number = YSerialPort.TXMSGCOUNT_INVALID;
    _lastMsg: string = YSerialPort.LASTMSG_INVALID;
    _currentJob: string = YSerialPort.CURRENTJOB_INVALID;
    _startupJob: string = YSerialPort.STARTUPJOB_INVALID;
    _jobMaxTask: number = YSerialPort.JOBMAXTASK_INVALID;
    _jobMaxSize: number = YSerialPort.JOBMAXSIZE_INVALID;
    _command: string = YSerialPort.COMMAND_INVALID;
    _protocol: string = YSerialPort.PROTOCOL_INVALID;
    _voltageLevel: YSerialPort.VOLTAGELEVEL = YSerialPort.VOLTAGELEVEL_INVALID;
    _serialMode: string = YSerialPort.SERIALMODE_INVALID;
    _valueCallbackSerialPort: YSerialPort.ValueCallback | null = null;
    _rxptr: number = 0;
    _rxbuff: Uint8Array = new Uint8Array(0);
    _rxbuffptr: number = 0;
    _eventPos: number = 0;
    _eventCallback: YSerialPort.SnoopingCallback | null = null;

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
    public readonly VOLTAGELEVEL_OFF: YSerialPort.VOLTAGELEVEL = 0;
    public readonly VOLTAGELEVEL_TTL3V: YSerialPort.VOLTAGELEVEL = 1;
    public readonly VOLTAGELEVEL_TTL3VR: YSerialPort.VOLTAGELEVEL = 2;
    public readonly VOLTAGELEVEL_TTL5V: YSerialPort.VOLTAGELEVEL = 3;
    public readonly VOLTAGELEVEL_TTL5VR: YSerialPort.VOLTAGELEVEL = 4;
    public readonly VOLTAGELEVEL_RS232: YSerialPort.VOLTAGELEVEL = 5;
    public readonly VOLTAGELEVEL_RS485: YSerialPort.VOLTAGELEVEL = 6;
    public readonly VOLTAGELEVEL_TTL1V8: YSerialPort.VOLTAGELEVEL = 7;
    public readonly VOLTAGELEVEL_SDI12: YSerialPort.VOLTAGELEVEL = 8;
    public readonly VOLTAGELEVEL_INVALID: YSerialPort.VOLTAGELEVEL = -1;
    public readonly SERIALMODE_INVALID: string = YAPI.INVALID_STRING;

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
    public static readonly VOLTAGELEVEL_OFF: YSerialPort.VOLTAGELEVEL = 0;
    public static readonly VOLTAGELEVEL_TTL3V: YSerialPort.VOLTAGELEVEL = 1;
    public static readonly VOLTAGELEVEL_TTL3VR: YSerialPort.VOLTAGELEVEL = 2;
    public static readonly VOLTAGELEVEL_TTL5V: YSerialPort.VOLTAGELEVEL = 3;
    public static readonly VOLTAGELEVEL_TTL5VR: YSerialPort.VOLTAGELEVEL = 4;
    public static readonly VOLTAGELEVEL_RS232: YSerialPort.VOLTAGELEVEL = 5;
    public static readonly VOLTAGELEVEL_RS485: YSerialPort.VOLTAGELEVEL = 6;
    public static readonly VOLTAGELEVEL_TTL1V8: YSerialPort.VOLTAGELEVEL = 7;
    public static readonly VOLTAGELEVEL_SDI12: YSerialPort.VOLTAGELEVEL = 8;
    public static readonly VOLTAGELEVEL_INVALID: YSerialPort.VOLTAGELEVEL = -1;
    public static readonly SERIALMODE_INVALID: string = YAPI.INVALID_STRING;
    //--- (end of generated code: YSerialPort attributes declaration)

    constructor(yapi: YAPIContext, func: string)
    {
        //--- (generated code: YSerialPort constructor)
        super(yapi, func);
        this._className                  = 'SerialPort';
        //--- (end of generated code: YSerialPort constructor)
    }

    //--- (generated code: YSerialPort implementation)

    imm_parseAttr(name: string, val: any)
    {
        switch(name) {
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
            this._voltageLevel = <YSerialPort.VOLTAGELEVEL> <number> val;
            return 1;
        case 'serialMode':
            this._serialMode = <string> <string> val;
            return 1;
        }
        return super.imm_parseAttr(name, val);
    }


    async _internalEventCallback(YSerialPort_obj: YSerialPort, str_value: string)
    {
        await YSerialPort_obj._internalEventHandler(str_value);
    }
    /**
     * Returns the total number of bytes received since last reset.
     *
     * @return an integer corresponding to the total number of bytes received since last reset
     *
     * On failure, throws an exception or returns YSerialPort.RXCOUNT_INVALID.
     */
    async get_rxCount(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YSerialPort.RXCOUNT_INVALID;
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
     * On failure, throws an exception or returns YSerialPort.TXCOUNT_INVALID.
     */
    async get_txCount(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YSerialPort.TXCOUNT_INVALID;
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
     * On failure, throws an exception or returns YSerialPort.ERRCOUNT_INVALID.
     */
    async get_errCount(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YSerialPort.ERRCOUNT_INVALID;
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
     * On failure, throws an exception or returns YSerialPort.RXMSGCOUNT_INVALID.
     */
    async get_rxMsgCount(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YSerialPort.RXMSGCOUNT_INVALID;
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
     * On failure, throws an exception or returns YSerialPort.TXMSGCOUNT_INVALID.
     */
    async get_txMsgCount(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YSerialPort.TXMSGCOUNT_INVALID;
            }
        }
        res = this._txMsgCount;
        return res;
    }

    /**
     * Returns the latest message fully received (for Line, Frame and Modbus protocols).
     *
     * @return a string corresponding to the latest message fully received (for Line, Frame and Modbus protocols)
     *
     * On failure, throws an exception or returns YSerialPort.LASTMSG_INVALID.
     */
    async get_lastMsg(): Promise<string>
    {
        let res: string;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YSerialPort.LASTMSG_INVALID;
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
     * On failure, throws an exception or returns YSerialPort.CURRENTJOB_INVALID.
     */
    async get_currentJob(): Promise<string>
    {
        let res: string;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YSerialPort.CURRENTJOB_INVALID;
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
        return await this._setAttr('currentJob',rest_val);
    }

    /**
     * Returns the job file to use when the device is powered on.
     *
     * @return a string corresponding to the job file to use when the device is powered on
     *
     * On failure, throws an exception or returns YSerialPort.STARTUPJOB_INVALID.
     */
    async get_startupJob(): Promise<string>
    {
        let res: string;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YSerialPort.STARTUPJOB_INVALID;
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
        return await this._setAttr('startupJob',rest_val);
    }

    /**
     * Returns the maximum number of tasks in a job that the device can handle.
     *
     * @return an integer corresponding to the maximum number of tasks in a job that the device can handle
     *
     * On failure, throws an exception or returns YSerialPort.JOBMAXTASK_INVALID.
     */
    async get_jobMaxTask(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration == 0) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YSerialPort.JOBMAXTASK_INVALID;
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
     * On failure, throws an exception or returns YSerialPort.JOBMAXSIZE_INVALID.
     */
    async get_jobMaxSize(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration == 0) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YSerialPort.JOBMAXSIZE_INVALID;
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
                return YSerialPort.COMMAND_INVALID;
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
     * Returns the type of protocol used over the serial line, as a string.
     * Possible values are "Line" for ASCII messages separated by CR and/or LF,
     * "StxEtx" for ASCII messages delimited by STX/ETX codes,
     * "Frame:[timeout]ms" for binary messages separated by a delay time,
     * "Modbus-ASCII" for MODBUS messages in ASCII mode,
     * "Modbus-RTU" for MODBUS messages in RTU mode,
     * "Wiegand-ASCII" for Wiegand messages in ASCII mode,
     * "Wiegand-26","Wiegand-34", etc for Wiegand messages in byte mode,
     * "Char" for a continuous ASCII stream or
     * "Byte" for a continuous binary stream.
     *
     * @return a string corresponding to the type of protocol used over the serial line, as a string
     *
     * On failure, throws an exception or returns YSerialPort.PROTOCOL_INVALID.
     */
    async get_protocol(): Promise<string>
    {
        let res: string;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YSerialPort.PROTOCOL_INVALID;
            }
        }
        res = this._protocol;
        return res;
    }

    /**
     * Changes the type of protocol used over the serial line.
     * Possible values are "Line" for ASCII messages separated by CR and/or LF,
     * "StxEtx" for ASCII messages delimited by STX/ETX codes,
     * "Frame:[timeout]ms" for binary messages separated by a delay time,
     * "Modbus-ASCII" for MODBUS messages in ASCII mode,
     * "Modbus-RTU" for MODBUS messages in RTU mode,
     * "Wiegand-ASCII" for Wiegand messages in ASCII mode,
     * "Wiegand-26","Wiegand-34", etc for Wiegand messages in byte mode,
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
        return await this._setAttr('protocol',rest_val);
    }

    /**
     * Returns the voltage level used on the serial line.
     *
     * @return a value among YSerialPort.VOLTAGELEVEL_OFF, YSerialPort.VOLTAGELEVEL_TTL3V,
     * YSerialPort.VOLTAGELEVEL_TTL3VR, YSerialPort.VOLTAGELEVEL_TTL5V, YSerialPort.VOLTAGELEVEL_TTL5VR,
     * YSerialPort.VOLTAGELEVEL_RS232, YSerialPort.VOLTAGELEVEL_RS485, YSerialPort.VOLTAGELEVEL_TTL1V8 and
     * YSerialPort.VOLTAGELEVEL_SDI12 corresponding to the voltage level used on the serial line
     *
     * On failure, throws an exception or returns YSerialPort.VOLTAGELEVEL_INVALID.
     */
    async get_voltageLevel(): Promise<YSerialPort.VOLTAGELEVEL>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YSerialPort.VOLTAGELEVEL_INVALID;
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
     * @param newval : a value among YSerialPort.VOLTAGELEVEL_OFF, YSerialPort.VOLTAGELEVEL_TTL3V,
     * YSerialPort.VOLTAGELEVEL_TTL3VR, YSerialPort.VOLTAGELEVEL_TTL5V, YSerialPort.VOLTAGELEVEL_TTL5VR,
     * YSerialPort.VOLTAGELEVEL_RS232, YSerialPort.VOLTAGELEVEL_RS485, YSerialPort.VOLTAGELEVEL_TTL1V8 and
     * YSerialPort.VOLTAGELEVEL_SDI12 corresponding to the voltage type used on the serial line
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_voltageLevel(newval: YSerialPort.VOLTAGELEVEL): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('voltageLevel',rest_val);
    }

    /**
     * Returns the serial port communication parameters, as a string such as
     * "9600,8N1". The string includes the baud rate, the number of data bits,
     * the parity, and the number of stop bits. An optional suffix is included
     * if flow control is active: "CtsRts" for hardware handshake, "XOnXOff"
     * for logical flow control and "Simplex" for acquiring a shared bus using
     * the RTS line (as used by some RS485 adapters for instance).
     *
     * @return a string corresponding to the serial port communication parameters, as a string such as
     *         "9600,8N1"
     *
     * On failure, throws an exception or returns YSerialPort.SERIALMODE_INVALID.
     */
    async get_serialMode(): Promise<string>
    {
        let res: string;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YSerialPort.SERIALMODE_INVALID;
            }
        }
        res = this._serialMode;
        return res;
    }

    /**
     * Changes the serial port communication parameters, with a string such as
     * "9600,8N1". The string includes the baud rate, the number of data bits,
     * the parity, and the number of stop bits. An optional suffix can be added
     * to enable flow control: "CtsRts" for hardware handshake, "XOnXOff"
     * for logical flow control and "Simplex" for acquiring a shared bus using
     * the RTS line (as used by some RS485 adapters for instance).
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : a string corresponding to the serial port communication parameters, with a string such as
     *         "9600,8N1"
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_serialMode(newval: string): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('serialMode',rest_val);
    }

    /**
     * Retrieves a serial port for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the serial port is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YSerialPort.isOnline() to test if the serial port is
     * indeed online at a given time. In case of ambiguity when looking for
     * a serial port by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the serial port, for instance
     *         RS232MK1.serialPort.
     *
     * @return a YSerialPort object allowing you to drive the serial port.
     */
    static FindSerialPort(func: string): YSerialPort
    {
        let obj: YSerialPort | null;
        obj = <YSerialPort> YFunction._FindFromCache('SerialPort', func);
        if (obj == null) {
            obj = new YSerialPort(YAPI, func);
            YFunction._AddToCache('SerialPort',  func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a serial port for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the serial port is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YSerialPort.isOnline() to test if the serial port is
     * indeed online at a given time. In case of ambiguity when looking for
     * a serial port by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx : a YAPI context
     * @param func : a string that uniquely characterizes the serial port, for instance
     *         RS232MK1.serialPort.
     *
     * @return a YSerialPort object allowing you to drive the serial port.
     */
    static FindSerialPortInContext(yctx: YAPIContext, func: string): YSerialPort
    {
        let obj: YSerialPort | null;
        obj = <YSerialPort> YFunction._FindFromCacheInContext(yctx,  'SerialPort', func);
        if (obj == null) {
            obj = new YSerialPort(yctx, func);
            YFunction._AddToCache('SerialPort',  func, obj);
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
    async registerValueCallback(callback: YSerialPort.ValueCallback | null): Promise<number>
    {
        let val: string;
        if (callback != null) {
            await YFunction._UpdateValueCallbackList(this, true);
        } else {
            await YFunction._UpdateValueCallbackList(this, false);
        }
        this._valueCallbackSerialPort = callback;
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
        if (this._valueCallbackSerialPort != null) {
            try {
                await this._valueCallbackSerialPort(this, value);
            } catch (e) {
                this._yapi.imm_log('Exception in valueCallback:', e);
            }
        } else {
            super._invokeValueCallback(value);
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

        url = 'rxmsg.json?pos='+String(Math.round(this._rxptr))+'&len=1&maxw=1';
        msgbin = await this._download(url);
        msgarr = this.imm_json_get_array(msgbin);
        msglen = msgarr.length;
        if (msglen == 0) {
            return '';
        }
        // last element of array is the new position
        msglen = msglen - 1;
        this._rxptr = this._yapi.imm_atoi(msgarr[msglen]);
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

        url = 'rxmsg.json?pos='+String(Math.round(this._rxptr))+'&maxw='+String(Math.round(maxWait))+'&pat='+pattern;
        msgbin = await this._download(url);
        msgarr = this.imm_json_get_array(msgbin);
        msglen = msgarr.length;
        if (msglen == 0) {
            return res;
        }
        // last element of array is the new position
        msglen = msglen - 1;
        this._rxptr = this._yapi.imm_atoi(msgarr[msglen]);
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
        let buff: Uint8Array;
        let bufflen: number;
        let res: number;

        buff = await this._download('rxcnt.bin?pos='+String(Math.round(this._rxptr)));
        bufflen = (buff).length - 1;
        while ((bufflen > 0) && (buff[bufflen] != 64)) {
            bufflen = bufflen - 1;
        }
        res = this._yapi.imm_atoi((this._yapi.imm_bin2str(buff)).substr( 0, bufflen));
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
        let url: string;
        let msgbin: Uint8Array;
        let msgarr: string[] = [];
        let msglen: number;
        let res: string;

        url = 'rxmsg.json?len=1&maxw='+String(Math.round(maxWait))+'&cmd=!'+this.imm_escapeAttr(query);
        msgbin = await this._download(url);
        msgarr = this.imm_json_get_array(msgbin);
        msglen = msgarr.length;
        if (msglen == 0) {
            return '';
        }
        // last element of array is the new position
        msglen = msglen - 1;
        this._rxptr = this._yapi.imm_atoi(msgarr[msglen]);
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
        let url: string;
        let msgbin: Uint8Array;
        let msgarr: string[] = [];
        let msglen: number;
        let res: string;

        url = 'rxmsg.json?len=1&maxw='+String(Math.round(maxWait))+'&cmd=$'+hexString;
        msgbin = await this._download(url);
        msgarr = this.imm_json_get_array(msgbin);
        msglen = msgarr.length;
        if (msglen == 0) {
            return '';
        }
        // last element of array is the new position
        msglen = msglen - 1;
        this._rxptr = this._yapi.imm_atoi(msgarr[msglen]);
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
        return await this.sendCommand('$'+('00'+(code).toString(16)).slice(-2).toUpperCase());
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
                return await this.sendCommand('+'+text);
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
            return await this.sendCommand('$'+hexString);
        }
        bufflen = ((bufflen) >> (1));
        buff = new Uint8Array(bufflen);
        idx = 0;
        while (idx < bufflen) {
            hexb = parseInt((hexString).substr( 2 * idx, 2), 16);
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
        buff = this._yapi.imm_str2bin(text+'\r\n');
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
                return await this.sendCommand('!'+text);
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

        buff = await this._download('rxdata.bin?pos='+String(Math.round(this._rxptr))+'&len=1');
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

        buff = await this._download('rxdata.bin?pos='+String(Math.round(this._rxptr))+'&len='+String(Math.round(nChars)));
        bufflen = (buff).length - 1;
        endpos = 0;
        mult = 1;
        while ((bufflen > 0) && (buff[bufflen] != 64)) {
            endpos = endpos + mult * (buff[bufflen] - 48);
            mult = mult * 10;
            bufflen = bufflen - 1;
        }
        this._rxptr = endpos;
        res = (this._yapi.imm_bin2str(buff)).substr( 0, bufflen);
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

        buff = await this._download('rxdata.bin?pos='+String(Math.round(this._rxptr))+'&len='+String(Math.round(nChars)));
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

        buff = await this._download('rxdata.bin?pos='+String(Math.round(this._rxptr))+'&len='+String(Math.round(nChars)));
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

        buff = await this._download('rxdata.bin?pos='+String(Math.round(this._rxptr))+'&len='+String(Math.round(nBytes)));
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
            res = res+''+('00'+(buff[ofs]).toString(16)).slice(-2).toUpperCase()+''+('00'+(buff[ofs + 1]).toString(16)).slice(-2).toUpperCase()+''+('00'+(buff[ofs + 2]).toString(16)).slice(-2).toUpperCase()+''+('00'+(buff[ofs + 3]).toString(16)).slice(-2).toUpperCase();
            ofs = ofs + 4;
        }
        while (ofs < bufflen) {
            res = res+''+('00'+(buff[ofs]).toString(16)).slice(-2).toUpperCase();
            ofs = ofs + 1;
        }
        return res;
    }

    /**
     * Emits a BREAK condition on the serial interface. When the specified
     * duration is 0, the BREAK signal will be exactly one character wide.
     * When the duration is between 1 and 100, the BREAK condition will
     * be hold for the specified number of milliseconds.
     *
     * @param duration : 0 for a standard BREAK, or duration between 1 and 100 ms
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async sendBreak(duration: number): Promise<number>
    {
        return await this.sendCommand('B'+String(Math.round(duration)));
    }

    /**
     * Manually sets the state of the RTS line. This function has no effect when
     * hardware handshake is enabled, as the RTS line is driven automatically.
     *
     * @param val : 1 to turn RTS on, 0 to turn RTS off
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_RTS(val: number): Promise<number>
    {
        return await this.sendCommand('R'+String(Math.round(val)));
    }

    /**
     * Reads the level of the CTS line. The CTS line is usually driven by
     * the RTS signal of the connected serial device.
     *
     * @return 1 if the CTS line is high, 0 if the CTS line is low.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async get_CTS(): Promise<number>
    {
        let buff: Uint8Array;
        let res: number;

        buff = await this._download('cts.txt');
        if (!((buff).length == 1)) {
            return this._throw(this._yapi.IO_ERROR,'invalid CTS reply',this._yapi.IO_ERROR);
        }
        res = buff[0] - 48;
        return res;
    }

    /**
     * Retrieves messages (both direction) in the serial port buffer, starting at current position.
     * This function will only compare and return printable characters in the message strings.
     * Binary protocols are handled as hexadecimal strings.
     *
     * If no message is found, the search waits for one up to the specified maximum timeout
     * (in milliseconds).
     *
     * @param maxWait : the maximum number of milliseconds to wait for a message if none is found
     *         in the receive buffer.
     *
     * @return an array of YSnoopingRecord objects containing the messages found, if any.
     *         Binary messages are converted to hexadecimal representation.
     *
     * On failure, throws an exception or returns an empty array.
     */
    async snoopMessages(maxWait: number): Promise<YSnoopingRecord[]>
    {
        let url: string;
        let msgbin: Uint8Array;
        let msgarr: string[] = [];
        let msglen: number;
        let res: YSnoopingRecord[] = [];
        let idx: number;

        url = 'rxmsg.json?pos='+String(Math.round(this._rxptr))+'&maxw='+String(Math.round(maxWait))+'&t=0';
        msgbin = await this._download(url);
        msgarr = this.imm_json_get_array(msgbin);
        msglen = msgarr.length;
        if (msglen == 0) {
            return res;
        }
        // last element of array is the new position
        msglen = msglen - 1;
        this._rxptr = this._yapi.imm_atoi(msgarr[msglen]);
        idx = 0;
        while (idx < msglen) {
            res.push(new YSnoopingRecord(msgarr[idx]));
            idx = idx + 1;
        }
        return res;
    }

    /**
     * Registers a callback function to be called each time that a message is sent or
     * received by the serial port. The callback is invoked only during the execution of
     * ySleep or yHandleEvents. This provides control over the time when
     * the callback is triggered. For good responsiveness, remember to call one of these
     * two functions periodically. To unregister a callback, pass a null pointer as argument.
     *
     * @param callback : the callback function to call, or a null pointer.
     *         The callback function should take four arguments:
     *         the YSerialPort object that emitted the event, and
     *         the YSnoopingRecord object that describes the message
     *         sent or received.
     *         On failure, throws an exception or returns a negative error code.
     */
    async registerSnoopingCallback(callback: YSerialPort.SnoopingCallback | null): Promise<number>
    {
        if (callback != null) {
            await this.registerValueCallback(this._internalEventCallback);
        } else {
            await this.registerValueCallback(<YSerialPort.ValueCallback | null> null);
        }
        // register user callback AFTER the internal pseudo-event,
        // to make sure we start with future events only
        this._eventCallback = callback;
        return 0;
    }

    async _internalEventHandler(advstr: string): Promise<number>
    {
        let url: string;
        let msgbin: Uint8Array;
        let msgarr: string[] = [];
        let msglen: number;
        let idx: number;
        if (!(this._eventCallback != null)) {
            // first simulated event, use it only to initialize reference values
            this._eventPos = 0;
        }

        url = 'rxmsg.json?pos='+String(Math.round(this._eventPos))+'&maxw=0&t=0';
        msgbin = await this._download(url);
        msgarr = this.imm_json_get_array(msgbin);
        msglen = msgarr.length;
        if (msglen == 0) {
            return this._yapi.SUCCESS;
        }
        // last element of array is the new position
        msglen = msglen - 1;
        if (!(this._eventCallback != null)) {
            // first simulated event, use it only to initialize reference values
            this._eventPos = this._yapi.imm_atoi(msgarr[msglen]);
            return this._yapi.SUCCESS;
        }
        this._eventPos = this._yapi.imm_atoi(msgarr[msglen]);
        idx = 0;
        while (idx < msglen) {
            try {
                await this._eventCallback(this, new YSnoopingRecord(msgarr[idx]));
            } catch (e) {
                this._yapi.imm_log('Exception in snoopingCallback:', e);
            }
            idx = idx + 1;
        }
        return this._yapi.SUCCESS;
    }

    /**
     * Sends an ASCII string to the serial port, preceeded with an STX code and
     * followed by an ETX code.
     *
     * @param text : the text string to send
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async writeStxEtx(text: string): Promise<number>
    {
        let buff: Uint8Array;
        buff = this._yapi.imm_str2bin(String.fromCharCode(2)+''+text+''+String.fromCharCode(3));
        // send string using file upload
        return await this._upload('txdata', buff);
    }

    /**
     * Sends a MODBUS message (provided as a hexadecimal string) to the serial port.
     * The message must start with the slave address. The MODBUS CRC/LRC is
     * automatically added by the function. This function does not wait for a reply.
     *
     * @param hexString : a hexadecimal message string, including device address but no CRC/LRC
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async writeMODBUS(hexString: string): Promise<number>
    {
        return await this.sendCommand(':'+hexString);
    }

    /**
     * Sends a message to a specified MODBUS slave connected to the serial port, and reads the
     * reply, if any. The message is the PDU, provided as a vector of bytes.
     *
     * @param slaveNo : the address of the slave MODBUS device to query
     * @param pduBytes : the message to send (PDU), as a vector of bytes. The first byte of the
     *         PDU is the MODBUS function code.
     *
     * @return the received reply, as a vector of bytes.
     *
     * On failure, throws an exception or returns an empty array (or a MODBUS error reply).
     */
    async queryMODBUS(slaveNo: number, pduBytes: number[]): Promise<number[]>
    {
        let funCode: number;
        let nib: number;
        let i: number;
        let cmd: string;
        let url: string;
        let pat: string;
        let msgs: Uint8Array;
        let reps: string[] = [];
        let rep: string;
        let res: number[] = [];
        let replen: number;
        let hexb: number;
        funCode = pduBytes[0];
        nib = ((funCode) >> (4));
        pat = ('00'+(slaveNo).toString(16)).slice(-2).toUpperCase()+'['+(nib).toString(16).toUpperCase()+''+((nib+8)).toString(16).toUpperCase()+']'+(((funCode) & (15))).toString(16).toUpperCase()+'.*';
        cmd = ('00'+(slaveNo).toString(16)).slice(-2).toUpperCase()+''+('00'+(funCode).toString(16)).slice(-2).toUpperCase();
        i = 1;
        while (i < pduBytes.length) {
            cmd = cmd+''+('00'+(((pduBytes[i]) & (0xff))).toString(16)).slice(-2).toUpperCase();
            i = i + 1;
        }

        url = 'rxmsg.json?cmd=:'+cmd+'&pat=:'+pat;
        msgs = await this._download(url);
        reps = this.imm_json_get_array(msgs);
        if (!(reps.length > 1)) {
            return this._throw(this._yapi.IO_ERROR,'no reply from MODBUS slave',res);
        }
        if (reps.length > 1) {
            rep = this.imm_json_get_string(this._yapi.imm_str2bin(reps[0]));
            replen = (((rep).length - 3) >> (1));
            i = 0;
            while (i < replen) {
                hexb = parseInt((rep).substr(2 * i + 3, 2), 16);
                res.push(hexb);
                i = i + 1;
            }
            if (res[0] != funCode) {
                i = res[1];
                if (!(i > 1)) {
                    return this._throw(this._yapi.NOT_SUPPORTED,'MODBUS error: unsupported function code',res);
                }
                if (!(i > 2)) {
                    return this._throw(this._yapi.INVALID_ARGUMENT,'MODBUS error: illegal data address',res);
                }
                if (!(i > 3)) {
                    return this._throw(this._yapi.INVALID_ARGUMENT,'MODBUS error: illegal data value',res);
                }
                if (!(i > 4)) {
                    return this._throw(this._yapi.INVALID_ARGUMENT,'MODBUS error: failed to execute function',res);
                }
            }
        }
        return res;
    }

    /**
     * Reads one or more contiguous internal bits (or coil status) from a MODBUS serial device.
     * This method uses the MODBUS function code 0x01 (Read Coils).
     *
     * @param slaveNo : the address of the slave MODBUS device to query
     * @param pduAddr : the relative address of the first bit/coil to read (zero-based)
     * @param nBits : the number of bits/coils to read
     *
     * @return a vector of integers, each corresponding to one bit.
     *
     * On failure, throws an exception or returns an empty array.
     */
    async modbusReadBits(slaveNo: number, pduAddr: number, nBits: number): Promise<number[]>
    {
        let pdu: number[] = [];
        let reply: number[] = [];
        let res: number[] = [];
        let bitpos: number;
        let idx: number;
        let val: number;
        let mask: number;
        pdu.push(0x01);
        pdu.push(((pduAddr) >> (8)));
        pdu.push(((pduAddr) & (0xff)));
        pdu.push(((nBits) >> (8)));
        pdu.push(((nBits) & (0xff)));

        reply = await this.queryMODBUS(slaveNo, pdu);
        if (reply.length == 0) {
            return res;
        }
        if (reply[0] != pdu[0]) {
            return res;
        }
        bitpos = 0;
        idx = 2;
        val = reply[idx];
        mask = 1;
        while (bitpos < nBits) {
            if (((val) & (mask)) == 0) {
                res.push(0);
            } else {
                res.push(1);
            }
            bitpos = bitpos + 1;
            if (mask == 0x80) {
                idx = idx + 1;
                val = reply[idx];
                mask = 1;
            } else {
                mask = ((mask) << (1));
            }
        }
        return res;
    }

    /**
     * Reads one or more contiguous input bits (or discrete inputs) from a MODBUS serial device.
     * This method uses the MODBUS function code 0x02 (Read Discrete Inputs).
     *
     * @param slaveNo : the address of the slave MODBUS device to query
     * @param pduAddr : the relative address of the first bit/input to read (zero-based)
     * @param nBits : the number of bits/inputs to read
     *
     * @return a vector of integers, each corresponding to one bit.
     *
     * On failure, throws an exception or returns an empty array.
     */
    async modbusReadInputBits(slaveNo: number, pduAddr: number, nBits: number): Promise<number[]>
    {
        let pdu: number[] = [];
        let reply: number[] = [];
        let res: number[] = [];
        let bitpos: number;
        let idx: number;
        let val: number;
        let mask: number;
        pdu.push(0x02);
        pdu.push(((pduAddr) >> (8)));
        pdu.push(((pduAddr) & (0xff)));
        pdu.push(((nBits) >> (8)));
        pdu.push(((nBits) & (0xff)));

        reply = await this.queryMODBUS(slaveNo, pdu);
        if (reply.length == 0) {
            return res;
        }
        if (reply[0] != pdu[0]) {
            return res;
        }
        bitpos = 0;
        idx = 2;
        val = reply[idx];
        mask = 1;
        while (bitpos < nBits) {
            if (((val) & (mask)) == 0) {
                res.push(0);
            } else {
                res.push(1);
            }
            bitpos = bitpos + 1;
            if (mask == 0x80) {
                idx = idx + 1;
                val = reply[idx];
                mask = 1;
            } else {
                mask = ((mask) << (1));
            }
        }
        return res;
    }

    /**
     * Reads one or more contiguous internal registers (holding registers) from a MODBUS serial device.
     * This method uses the MODBUS function code 0x03 (Read Holding Registers).
     *
     * @param slaveNo : the address of the slave MODBUS device to query
     * @param pduAddr : the relative address of the first holding register to read (zero-based)
     * @param nWords : the number of holding registers to read
     *
     * @return a vector of integers, each corresponding to one 16-bit register value.
     *
     * On failure, throws an exception or returns an empty array.
     */
    async modbusReadRegisters(slaveNo: number, pduAddr: number, nWords: number): Promise<number[]>
    {
        let pdu: number[] = [];
        let reply: number[] = [];
        let res: number[] = [];
        let regpos: number;
        let idx: number;
        let val: number;
        pdu.push(0x03);
        pdu.push(((pduAddr) >> (8)));
        pdu.push(((pduAddr) & (0xff)));
        pdu.push(((nWords) >> (8)));
        pdu.push(((nWords) & (0xff)));

        reply = await this.queryMODBUS(slaveNo, pdu);
        if (reply.length == 0) {
            return res;
        }
        if (reply[0] != pdu[0]) {
            return res;
        }
        regpos = 0;
        idx = 2;
        while (regpos < nWords) {
            val = ((reply[idx]) << (8));
            idx = idx + 1;
            val = val + reply[idx];
            idx = idx + 1;
            res.push(val);
            regpos = regpos + 1;
        }
        return res;
    }

    /**
     * Reads one or more contiguous input registers (read-only registers) from a MODBUS serial device.
     * This method uses the MODBUS function code 0x04 (Read Input Registers).
     *
     * @param slaveNo : the address of the slave MODBUS device to query
     * @param pduAddr : the relative address of the first input register to read (zero-based)
     * @param nWords : the number of input registers to read
     *
     * @return a vector of integers, each corresponding to one 16-bit input value.
     *
     * On failure, throws an exception or returns an empty array.
     */
    async modbusReadInputRegisters(slaveNo: number, pduAddr: number, nWords: number): Promise<number[]>
    {
        let pdu: number[] = [];
        let reply: number[] = [];
        let res: number[] = [];
        let regpos: number;
        let idx: number;
        let val: number;
        pdu.push(0x04);
        pdu.push(((pduAddr) >> (8)));
        pdu.push(((pduAddr) & (0xff)));
        pdu.push(((nWords) >> (8)));
        pdu.push(((nWords) & (0xff)));

        reply = await this.queryMODBUS(slaveNo, pdu);
        if (reply.length == 0) {
            return res;
        }
        if (reply[0] != pdu[0]) {
            return res;
        }
        regpos = 0;
        idx = 2;
        while (regpos < nWords) {
            val = ((reply[idx]) << (8));
            idx = idx + 1;
            val = val + reply[idx];
            idx = idx + 1;
            res.push(val);
            regpos = regpos + 1;
        }
        return res;
    }

    /**
     * Sets a single internal bit (or coil) on a MODBUS serial device.
     * This method uses the MODBUS function code 0x05 (Write Single Coil).
     *
     * @param slaveNo : the address of the slave MODBUS device to drive
     * @param pduAddr : the relative address of the bit/coil to set (zero-based)
     * @param value : the value to set (0 for OFF state, non-zero for ON state)
     *
     * @return the number of bits/coils affected on the device (1)
     *
     * On failure, throws an exception or returns zero.
     */
    async modbusWriteBit(slaveNo: number, pduAddr: number, value: number): Promise<number>
    {
        let pdu: number[] = [];
        let reply: number[] = [];
        let res: number;
        res = 0;
        if (value != 0) {
            value = 0xff;
        }
        pdu.push(0x05);
        pdu.push(((pduAddr) >> (8)));
        pdu.push(((pduAddr) & (0xff)));
        pdu.push(value);
        pdu.push(0x00);

        reply = await this.queryMODBUS(slaveNo, pdu);
        if (reply.length == 0) {
            return res;
        }
        if (reply[0] != pdu[0]) {
            return res;
        }
        res = 1;
        return res;
    }

    /**
     * Sets several contiguous internal bits (or coils) on a MODBUS serial device.
     * This method uses the MODBUS function code 0x0f (Write Multiple Coils).
     *
     * @param slaveNo : the address of the slave MODBUS device to drive
     * @param pduAddr : the relative address of the first bit/coil to set (zero-based)
     * @param bits : the vector of bits to be set (one integer per bit)
     *
     * @return the number of bits/coils affected on the device
     *
     * On failure, throws an exception or returns zero.
     */
    async modbusWriteBits(slaveNo: number, pduAddr: number, bits: number[]): Promise<number>
    {
        let nBits: number;
        let nBytes: number;
        let bitpos: number;
        let val: number;
        let mask: number;
        let pdu: number[] = [];
        let reply: number[] = [];
        let res: number;
        res = 0;
        nBits = bits.length;
        nBytes = (((nBits + 7)) >> (3));
        pdu.push(0x0f);
        pdu.push(((pduAddr) >> (8)));
        pdu.push(((pduAddr) & (0xff)));
        pdu.push(((nBits) >> (8)));
        pdu.push(((nBits) & (0xff)));
        pdu.push(nBytes);
        bitpos = 0;
        val = 0;
        mask = 1;
        while (bitpos < nBits) {
            if (bits[bitpos] != 0) {
                val = ((val) | (mask));
            }
            bitpos = bitpos + 1;
            if (mask == 0x80) {
                pdu.push(val);
                val = 0;
                mask = 1;
            } else {
                mask = ((mask) << (1));
            }
        }
        if (mask != 1) {
            pdu.push(val);
        }

        reply = await this.queryMODBUS(slaveNo, pdu);
        if (reply.length == 0) {
            return res;
        }
        if (reply[0] != pdu[0]) {
            return res;
        }
        res = ((reply[3]) << (8));
        res = res + reply[4];
        return res;
    }

    /**
     * Sets a single internal register (or holding register) on a MODBUS serial device.
     * This method uses the MODBUS function code 0x06 (Write Single Register).
     *
     * @param slaveNo : the address of the slave MODBUS device to drive
     * @param pduAddr : the relative address of the register to set (zero-based)
     * @param value : the 16 bit value to set
     *
     * @return the number of registers affected on the device (1)
     *
     * On failure, throws an exception or returns zero.
     */
    async modbusWriteRegister(slaveNo: number, pduAddr: number, value: number): Promise<number>
    {
        let pdu: number[] = [];
        let reply: number[] = [];
        let res: number;
        res = 0;
        pdu.push(0x06);
        pdu.push(((pduAddr) >> (8)));
        pdu.push(((pduAddr) & (0xff)));
        pdu.push(((value) >> (8)));
        pdu.push(((value) & (0xff)));

        reply = await this.queryMODBUS(slaveNo, pdu);
        if (reply.length == 0) {
            return res;
        }
        if (reply[0] != pdu[0]) {
            return res;
        }
        res = 1;
        return res;
    }

    /**
     * Sets several contiguous internal registers (or holding registers) on a MODBUS serial device.
     * This method uses the MODBUS function code 0x10 (Write Multiple Registers).
     *
     * @param slaveNo : the address of the slave MODBUS device to drive
     * @param pduAddr : the relative address of the first internal register to set (zero-based)
     * @param values : the vector of 16 bit values to set
     *
     * @return the number of registers affected on the device
     *
     * On failure, throws an exception or returns zero.
     */
    async modbusWriteRegisters(slaveNo: number, pduAddr: number, values: number[]): Promise<number>
    {
        let nWords: number;
        let nBytes: number;
        let regpos: number;
        let val: number;
        let pdu: number[] = [];
        let reply: number[] = [];
        let res: number;
        res = 0;
        nWords = values.length;
        nBytes = 2 * nWords;
        pdu.push(0x10);
        pdu.push(((pduAddr) >> (8)));
        pdu.push(((pduAddr) & (0xff)));
        pdu.push(((nWords) >> (8)));
        pdu.push(((nWords) & (0xff)));
        pdu.push(nBytes);
        regpos = 0;
        while (regpos < nWords) {
            val = values[regpos];
            pdu.push(((val) >> (8)));
            pdu.push(((val) & (0xff)));
            regpos = regpos + 1;
        }

        reply = await this.queryMODBUS(slaveNo, pdu);
        if (reply.length == 0) {
            return res;
        }
        if (reply[0] != pdu[0]) {
            return res;
        }
        res = ((reply[3]) << (8));
        res = res + reply[4];
        return res;
    }

    /**
     * Sets several contiguous internal registers (holding registers) on a MODBUS serial device,
     * then performs a contiguous read of a set of (possibly different) internal registers.
     * This method uses the MODBUS function code 0x17 (Read/Write Multiple Registers).
     *
     * @param slaveNo : the address of the slave MODBUS device to drive
     * @param pduWriteAddr : the relative address of the first internal register to set (zero-based)
     * @param values : the vector of 16 bit values to set
     * @param pduReadAddr : the relative address of the first internal register to read (zero-based)
     * @param nReadWords : the number of 16 bit values to read
     *
     * @return a vector of integers, each corresponding to one 16-bit register value read.
     *
     * On failure, throws an exception or returns an empty array.
     */
    async modbusWriteAndReadRegisters(slaveNo: number, pduWriteAddr: number, values: number[], pduReadAddr: number, nReadWords: number): Promise<number[]>
    {
        let nWriteWords: number;
        let nBytes: number;
        let regpos: number;
        let val: number;
        let idx: number;
        let pdu: number[] = [];
        let reply: number[] = [];
        let res: number[] = [];
        nWriteWords = values.length;
        nBytes = 2 * nWriteWords;
        pdu.push(0x17);
        pdu.push(((pduReadAddr) >> (8)));
        pdu.push(((pduReadAddr) & (0xff)));
        pdu.push(((nReadWords) >> (8)));
        pdu.push(((nReadWords) & (0xff)));
        pdu.push(((pduWriteAddr) >> (8)));
        pdu.push(((pduWriteAddr) & (0xff)));
        pdu.push(((nWriteWords) >> (8)));
        pdu.push(((nWriteWords) & (0xff)));
        pdu.push(nBytes);
        regpos = 0;
        while (regpos < nWriteWords) {
            val = values[regpos];
            pdu.push(((val) >> (8)));
            pdu.push(((val) & (0xff)));
            regpos = regpos + 1;
        }

        reply = await this.queryMODBUS(slaveNo, pdu);
        if (reply.length == 0) {
            return res;
        }
        if (reply[0] != pdu[0]) {
            return res;
        }
        regpos = 0;
        idx = 2;
        while (regpos < nReadWords) {
            val = ((reply[idx]) << (8));
            idx = idx + 1;
            val = val + reply[idx];
            idx = idx + 1;
            res.push(val);
            regpos = regpos + 1;
        }
        return res;
    }

    /**
     * Continues the enumeration of serial ports started using yFirstSerialPort().
     * Caution: You can't make any assumption about the returned serial ports order.
     * If you want to find a specific a serial port, use SerialPort.findSerialPort()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YSerialPort object, corresponding to
     *         a serial port currently online, or a null pointer
     *         if there are no more serial ports to enumerate.
     */
    nextSerialPort(): YSerialPort | null
    {
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI.SUCCESS) return null;
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, <string> resolve.result);
        if(next_hwid == null) return null;
        return YSerialPort.FindSerialPortInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of serial ports currently accessible.
     * Use the method YSerialPort.nextSerialPort() to iterate on
     * next serial ports.
     *
     * @return a pointer to a YSerialPort object, corresponding to
     *         the first serial port currently online, or a null pointer
     *         if there are none.
     */
    static FirstSerialPort(): YSerialPort | null
    {
        let next_hwid = YAPI.imm_getFirstHardwareId('SerialPort');
        if(next_hwid == null) return null;
        return YSerialPort.FindSerialPort(next_hwid);
    }

    /**
     * Starts the enumeration of serial ports currently accessible.
     * Use the method YSerialPort.nextSerialPort() to iterate on
     * next serial ports.
     *
     * @param yctx : a YAPI context.
     *
     * @return a pointer to a YSerialPort object, corresponding to
     *         the first serial port currently online, or a null pointer
     *         if there are none.
     */
    static FirstSerialPortInContext(yctx: YAPIContext): YSerialPort | null
    {
        let next_hwid = yctx.imm_getFirstHardwareId('SerialPort');
        if(next_hwid == null) return null;
        return YSerialPort.FindSerialPortInContext(yctx, next_hwid);
    }

    //--- (end of generated code: YSerialPort implementation)
}

export namespace YSerialPort
{
    //--- (generated code: YSerialPort definitions)
    export const enum VOLTAGELEVEL {
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
    export interface ValueCallback { (func: YSerialPort, value: string): void }
    export interface SnoopingCallback { (func: YSerialPort, rec: YSnoopingRecord): void }
    //--- (end of generated code: YSerialPort definitions)
}