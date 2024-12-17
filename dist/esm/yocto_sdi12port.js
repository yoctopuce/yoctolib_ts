/*********************************************************************
 *
 *  $Id: yocto_sdi12port.ts 54279 2023-04-28 10:11:03Z seb $
 *
 *  Implements the high-level API for Sdi12SnoopingRecord functions
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
import { YAPI, YAPIContext, YFunction } from './yocto_api.js';
//--- (generated code: YSdi12SnoopingRecord class start)
/**
 * YSdi12SnoopingRecord Class: Intercepted SDI12 message description, returned by sdi12Port.snoopMessages method
 *
 *
 */
//--- (end of generated code: YSdi12SnoopingRecord class start)
export class YSdi12SnoopingRecord {
    // API symbols as static members
    //--- (end of generated code: YSdi12SnoopingRecord attributes declaration)
    constructor(str_json) {
        //--- (generated code: YSdi12SnoopingRecord attributes declaration)
        this._tim = 0;
        this._pos = 0;
        this._dir = 0;
        this._msg = '';
        //--- (generated code: YSdi12SnoopingRecord constructor)
        //--- (end of generated code: YSdi12SnoopingRecord constructor)
        let loadval = JSON.parse(str_json);
        this._tim = loadval.t;
        this._pos = loadval.p;
        this._dir = (loadval.m[0] == '<' ? 1 : 0);
        this._msg = loadval.m.slice(1);
    }
    //--- (generated code: YSdi12SnoopingRecord implementation)
    /**
     * Returns the elapsed time, in ms, since the beginning of the preceding message.
     *
     * @return the elapsed time, in ms, since the beginning of the preceding message.
     */
    get_time() {
        return this._tim;
    }
    /**
     * Returns the absolute position of the message end.
     *
     * @return the absolute position of the message end.
     */
    get_pos() {
        return this._pos;
    }
    /**
     * Returns the message direction (RX=0, TX=1).
     *
     * @return the message direction (RX=0, TX=1).
     */
    get_direction() {
        return this._dir;
    }
    /**
     * Returns the message content.
     *
     * @return the message content.
     */
    get_message() {
        return this._msg;
    }
}
//--- (generated code: YSdi12Port class start)
/**
 * YSdi12Port Class: SDI12 port control interface
 *
 * The YSdi12Port class allows you to fully drive a Yoctopuce SDI12 port.
 * It can be used to send and receive data, and to configure communication
 * parameters (baud rate, bit count, parity, flow control and protocol).
 * Note that Yoctopuce SDI12 ports are not exposed as virtual COM ports.
 * They are meant to be used in the same way as all Yoctopuce devices.
 */
//--- (end of generated code: YSdi12Port class start)
/** @extends {YFunction} **/
export class YSdi12SensorInfo {
    // API symbols as static members
    //--- (end of generated code: YSdi12SensorInfo attributes declaration)
    constructor(sdi12Port, str_json) {
        this._isValid = false;
        this._addr = '';
        this._proto = '';
        this._mfg = '';
        this._model = '';
        this._ver = '';
        this._sn = '';
        this._valuesDesc = [];
        //--- (generated code: YSdi12SensorInfo constructor)
        //--- (end of generated code: YSdi12SensorInfo constructor)
        this._sdi12Port = sdi12Port;
        this.imm_parseInfoStr(str_json);
    }
    _throw(errcode, msg, retVal) {
        return this._sdi12Port._throw(errcode, msg, retVal);
    }
    //--- (generated code: YSdi12SensorInfo implementation)
    /**
     * Returns the sensor state.
     *
     * @return the sensor state.
     */
    async isValid() {
        return this._isValid;
    }
    /**
     * Returns the sensor address.
     *
     * @return the sensor address.
     */
    async get_sensorAddress() {
        return this._addr;
    }
    /**
     * Returns the compatible SDI-12 version of the sensor.
     *
     * @return the compatible SDI-12 version of the sensor.
     */
    async get_sensorProtocol() {
        return this._proto;
    }
    /**
     * Returns the sensor vendor identification.
     *
     * @return the sensor vendor identification.
     */
    async get_sensorVendor() {
        return this._mfg;
    }
    /**
     * Returns the sensor model number.
     *
     * @return the sensor model number.
     */
    async get_sensorModel() {
        return this._model;
    }
    /**
     * Returns the sensor version.
     *
     * @return the sensor version.
     */
    async get_sensorVersion() {
        return this._ver;
    }
    /**
     * Returns the sensor serial number.
     *
     * @return the sensor serial number.
     */
    async get_sensorSerial() {
        return this._sn;
    }
    /**
     * Returns the number of sensor measurements.
     * This function only works if the sensor is in version 1.4 SDI-12
     * and supports metadata commands.
     *
     * @return the number of sensor measurements.
     */
    async get_measureCount() {
        return this._valuesDesc.length;
    }
    /**
     * Returns the sensor measurement command.
     * This function only works if the sensor is in version 1.4 SDI-12
     * and supports metadata commands.
     *
     * @param measureIndex : measurement index
     *
     * @return the sensor measurement command.
     *         On failure, throws an exception or returns an empty string.
     */
    async get_measureCommand(measureIndex) {
        if (!(measureIndex < this._valuesDesc.length)) {
            return this._throw(YAPI.INVALID_ARGUMENT, 'Invalid measure index', '');
        }
        return this._valuesDesc[measureIndex][0];
    }
    /**
     * Returns sensor measurement position.
     * This function only works if the sensor is in version 1.4 SDI-12
     * and supports metadata commands.
     *
     * @param measureIndex : measurement index
     *
     * @return the sensor measurement command.
     *         On failure, throws an exception or returns 0.
     */
    async get_measurePosition(measureIndex) {
        if (!(measureIndex < this._valuesDesc.length)) {
            return this._throw(YAPI.INVALID_ARGUMENT, 'Invalid measure index', 0);
        }
        return YAPIContext.imm_atoi(this._valuesDesc[measureIndex][2]);
    }
    /**
     * Returns the measured value symbol.
     * This function only works if the sensor is in version 1.4 SDI-12
     * and supports metadata commands.
     *
     * @param measureIndex : measurement index
     *
     * @return the sensor measurement command.
     *         On failure, throws an exception or returns an empty string.
     */
    async get_measureSymbol(measureIndex) {
        if (!(measureIndex < this._valuesDesc.length)) {
            return this._throw(YAPI.INVALID_ARGUMENT, 'Invalid measure index', '');
        }
        return this._valuesDesc[measureIndex][3];
    }
    /**
     * Returns the unit of the measured value.
     * This function only works if the sensor is in version 1.4 SDI-12
     * and supports metadata commands.
     *
     * @param measureIndex : measurement index
     *
     * @return the sensor measurement command.
     *         On failure, throws an exception or returns an empty string.
     */
    async get_measureUnit(measureIndex) {
        if (!(measureIndex < this._valuesDesc.length)) {
            return this._throw(YAPI.INVALID_ARGUMENT, 'Invalid measure index', '');
        }
        return this._valuesDesc[measureIndex][4];
    }
    /**
     * Returns the description of the measured value.
     * This function only works if the sensor is in version 1.4 SDI-12
     * and supports metadata commands.
     *
     * @param measureIndex : measurement index
     *
     * @return the sensor measurement command.
     *         On failure, throws an exception or returns an empty string.
     */
    async get_measureDescription(measureIndex) {
        if (!(measureIndex < this._valuesDesc.length)) {
            return this._throw(YAPI.INVALID_ARGUMENT, 'Invalid measure index', '');
        }
        return this._valuesDesc[measureIndex][5];
    }
    async get_typeMeasure() {
        return this._valuesDesc;
    }
    imm_parseInfoStr(infoStr) {
        let errmsg;
        if ((infoStr).length > 1) {
            if (infoStr.substr(0, 2) == 'ER') {
                errmsg = infoStr.substr(2, (infoStr).length - 2);
                this._addr = errmsg;
                this._proto = errmsg;
                this._mfg = errmsg;
                this._model = errmsg;
                this._ver = errmsg;
                this._sn = errmsg;
                this._isValid = false;
            }
            else {
                this._addr = infoStr.substr(0, 1);
                this._proto = infoStr.substr(1, 2);
                this._mfg = infoStr.substr(3, 8);
                this._model = infoStr.substr(11, 6);
                this._ver = infoStr.substr(17, 3);
                this._sn = infoStr.substr(20, (infoStr).length - 20);
                this._isValid = true;
            }
        }
    }
    async _queryValueInfo() {
        let val = [];
        let data = [];
        let infoNbVal;
        let cmd;
        let infoVal;
        let value;
        let nbVal;
        let k;
        let i;
        let j;
        let listVal = [];
        let size;
        k = 0;
        size = 4;
        while (k < 10) {
            infoNbVal = await this._sdi12Port.querySdi12(this._addr, 'IM' + String(Math.round(k)), 5000);
            if ((infoNbVal).length > 1) {
                value = infoNbVal.substr(4, (infoNbVal).length - 4);
                nbVal = YAPIContext.imm_atoi(value);
                if (nbVal != 0) {
                    val.length = 0;
                    i = 0;
                    while (i < nbVal) {
                        cmd = 'IM' + String(Math.round(k)) + '_00' + String(Math.round(i + 1));
                        infoVal = await this._sdi12Port.querySdi12(this._addr, cmd, 5000);
                        data = (infoVal).split(';');
                        data = (data[0]).split(',');
                        listVal.length = 0;
                        listVal.push('M' + String(Math.round(k)));
                        listVal.push((i + 1).toString());
                        j = 0;
                        while (data.length < size) {
                            data.push('');
                        }
                        while (j < data.length) {
                            listVal.push(data[j]);
                            j = j + 1;
                        }
                        val.push(listVal.slice());
                        i = i + 1;
                    }
                }
            }
            k = k + 1;
        }
        this._valuesDesc = val;
    }
}
//--- (generated code: YSdi12Port class start)
/**
 * YSdi12Port Class: SDI12 port control interface
 *
 * The YSdi12Port class allows you to fully drive a Yoctopuce SDI12 port.
 * It can be used to send and receive data, and to configure communication
 * parameters (baud rate, bit count, parity, flow control and protocol).
 * Note that Yoctopuce SDI12 ports are not exposed as virtual COM ports.
 * They are meant to be used in the same way as all Yoctopuce devices.
 */
//--- (end of generated code: YSdi12Port class start)
/** @extends {YFunction} **/
export class YSdi12Port extends YFunction {
    //--- (end of generated code: YSdi12Port attributes declaration)
    constructor(yapi, func) {
        //--- (generated code: YSdi12Port constructor)
        super(yapi, func);
        this._rxCount = YSdi12Port.RXCOUNT_INVALID;
        this._txCount = YSdi12Port.TXCOUNT_INVALID;
        this._errCount = YSdi12Port.ERRCOUNT_INVALID;
        this._rxMsgCount = YSdi12Port.RXMSGCOUNT_INVALID;
        this._txMsgCount = YSdi12Port.TXMSGCOUNT_INVALID;
        this._lastMsg = YSdi12Port.LASTMSG_INVALID;
        this._currentJob = YSdi12Port.CURRENTJOB_INVALID;
        this._startupJob = YSdi12Port.STARTUPJOB_INVALID;
        this._jobMaxTask = YSdi12Port.JOBMAXTASK_INVALID;
        this._jobMaxSize = YSdi12Port.JOBMAXSIZE_INVALID;
        this._command = YSdi12Port.COMMAND_INVALID;
        this._protocol = YSdi12Port.PROTOCOL_INVALID;
        this._voltageLevel = YSdi12Port.VOLTAGELEVEL_INVALID;
        this._serialMode = YSdi12Port.SERIALMODE_INVALID;
        this._valueCallbackSdi12Port = null;
        this._rxptr = 0;
        this._rxbuff = new Uint8Array(0);
        this._rxbuffptr = 0;
        this._eventPos = 0;
        // API symbols as object properties
        this.RXCOUNT_INVALID = YAPI.INVALID_UINT;
        this.TXCOUNT_INVALID = YAPI.INVALID_UINT;
        this.ERRCOUNT_INVALID = YAPI.INVALID_UINT;
        this.RXMSGCOUNT_INVALID = YAPI.INVALID_UINT;
        this.TXMSGCOUNT_INVALID = YAPI.INVALID_UINT;
        this.LASTMSG_INVALID = YAPI.INVALID_STRING;
        this.CURRENTJOB_INVALID = YAPI.INVALID_STRING;
        this.STARTUPJOB_INVALID = YAPI.INVALID_STRING;
        this.JOBMAXTASK_INVALID = YAPI.INVALID_UINT;
        this.JOBMAXSIZE_INVALID = YAPI.INVALID_UINT;
        this.COMMAND_INVALID = YAPI.INVALID_STRING;
        this.PROTOCOL_INVALID = YAPI.INVALID_STRING;
        this.VOLTAGELEVEL_OFF = 0;
        this.VOLTAGELEVEL_TTL3V = 1;
        this.VOLTAGELEVEL_TTL3VR = 2;
        this.VOLTAGELEVEL_TTL5V = 3;
        this.VOLTAGELEVEL_TTL5VR = 4;
        this.VOLTAGELEVEL_RS232 = 5;
        this.VOLTAGELEVEL_RS485 = 6;
        this.VOLTAGELEVEL_TTL1V8 = 7;
        this.VOLTAGELEVEL_SDI12 = 8;
        this.VOLTAGELEVEL_INVALID = -1;
        this.SERIALMODE_INVALID = YAPI.INVALID_STRING;
        this._className = 'Sdi12Port';
        //--- (end of generated code: YSdi12Port constructor)
    }
    //--- (generated code: YSdi12Port implementation)
    imm_parseAttr(name, val) {
        switch (name) {
            case 'rxCount':
                this._rxCount = val;
                return 1;
            case 'txCount':
                this._txCount = val;
                return 1;
            case 'errCount':
                this._errCount = val;
                return 1;
            case 'rxMsgCount':
                this._rxMsgCount = val;
                return 1;
            case 'txMsgCount':
                this._txMsgCount = val;
                return 1;
            case 'lastMsg':
                this._lastMsg = val;
                return 1;
            case 'currentJob':
                this._currentJob = val;
                return 1;
            case 'startupJob':
                this._startupJob = val;
                return 1;
            case 'jobMaxTask':
                this._jobMaxTask = val;
                return 1;
            case 'jobMaxSize':
                this._jobMaxSize = val;
                return 1;
            case 'command':
                this._command = val;
                return 1;
            case 'protocol':
                this._protocol = val;
                return 1;
            case 'voltageLevel':
                this._voltageLevel = val;
                return 1;
            case 'serialMode':
                this._serialMode = val;
                return 1;
        }
        return super.imm_parseAttr(name, val);
    }
    /**
     * Returns the total number of bytes received since last reset.
     *
     * @return an integer corresponding to the total number of bytes received since last reset
     *
     * On failure, throws an exception or returns YSdi12Port.RXCOUNT_INVALID.
     */
    async get_rxCount() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YSdi12Port.RXCOUNT_INVALID;
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
     * On failure, throws an exception or returns YSdi12Port.TXCOUNT_INVALID.
     */
    async get_txCount() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YSdi12Port.TXCOUNT_INVALID;
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
     * On failure, throws an exception or returns YSdi12Port.ERRCOUNT_INVALID.
     */
    async get_errCount() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YSdi12Port.ERRCOUNT_INVALID;
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
     * On failure, throws an exception or returns YSdi12Port.RXMSGCOUNT_INVALID.
     */
    async get_rxMsgCount() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YSdi12Port.RXMSGCOUNT_INVALID;
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
     * On failure, throws an exception or returns YSdi12Port.TXMSGCOUNT_INVALID.
     */
    async get_txMsgCount() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YSdi12Port.TXMSGCOUNT_INVALID;
            }
        }
        res = this._txMsgCount;
        return res;
    }
    /**
     * Returns the latest message fully received.
     *
     * @return a string corresponding to the latest message fully received
     *
     * On failure, throws an exception or returns YSdi12Port.LASTMSG_INVALID.
     */
    async get_lastMsg() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YSdi12Port.LASTMSG_INVALID;
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
     * On failure, throws an exception or returns YSdi12Port.CURRENTJOB_INVALID.
     */
    async get_currentJob() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YSdi12Port.CURRENTJOB_INVALID;
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
    async set_currentJob(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('currentJob', rest_val);
    }
    /**
     * Returns the job file to use when the device is powered on.
     *
     * @return a string corresponding to the job file to use when the device is powered on
     *
     * On failure, throws an exception or returns YSdi12Port.STARTUPJOB_INVALID.
     */
    async get_startupJob() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YSdi12Port.STARTUPJOB_INVALID;
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
    async set_startupJob(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('startupJob', rest_val);
    }
    /**
     * Returns the maximum number of tasks in a job that the device can handle.
     *
     * @return an integer corresponding to the maximum number of tasks in a job that the device can handle
     *
     * On failure, throws an exception or returns YSdi12Port.JOBMAXTASK_INVALID.
     */
    async get_jobMaxTask() {
        let res;
        if (this._cacheExpiration == 0) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YSdi12Port.JOBMAXTASK_INVALID;
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
     * On failure, throws an exception or returns YSdi12Port.JOBMAXSIZE_INVALID.
     */
    async get_jobMaxSize() {
        let res;
        if (this._cacheExpiration == 0) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YSdi12Port.JOBMAXSIZE_INVALID;
            }
        }
        res = this._jobMaxSize;
        return res;
    }
    async get_command() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YSdi12Port.COMMAND_INVALID;
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
     * Returns the type of protocol used over the serial line, as a string.
     * Possible values are "Line" for ASCII messages separated by CR and/or LF,
     * "Frame:[timeout]ms" for binary messages separated by a delay time,
     * "Char" for a continuous ASCII stream or
     * "Byte" for a continuous binary stream.
     *
     * @return a string corresponding to the type of protocol used over the serial line, as a string
     *
     * On failure, throws an exception or returns YSdi12Port.PROTOCOL_INVALID.
     */
    async get_protocol() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YSdi12Port.PROTOCOL_INVALID;
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
    async set_protocol(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('protocol', rest_val);
    }
    /**
     * Returns the voltage level used on the serial line.
     *
     * @return a value among YSdi12Port.VOLTAGELEVEL_OFF, YSdi12Port.VOLTAGELEVEL_TTL3V,
     * YSdi12Port.VOLTAGELEVEL_TTL3VR, YSdi12Port.VOLTAGELEVEL_TTL5V, YSdi12Port.VOLTAGELEVEL_TTL5VR,
     * YSdi12Port.VOLTAGELEVEL_RS232, YSdi12Port.VOLTAGELEVEL_RS485, YSdi12Port.VOLTAGELEVEL_TTL1V8 and
     * YSdi12Port.VOLTAGELEVEL_SDI12 corresponding to the voltage level used on the serial line
     *
     * On failure, throws an exception or returns YSdi12Port.VOLTAGELEVEL_INVALID.
     */
    async get_voltageLevel() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YSdi12Port.VOLTAGELEVEL_INVALID;
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
     * @param newval : a value among YSdi12Port.VOLTAGELEVEL_OFF, YSdi12Port.VOLTAGELEVEL_TTL3V,
     * YSdi12Port.VOLTAGELEVEL_TTL3VR, YSdi12Port.VOLTAGELEVEL_TTL5V, YSdi12Port.VOLTAGELEVEL_TTL5VR,
     * YSdi12Port.VOLTAGELEVEL_RS232, YSdi12Port.VOLTAGELEVEL_RS485, YSdi12Port.VOLTAGELEVEL_TTL1V8 and
     * YSdi12Port.VOLTAGELEVEL_SDI12 corresponding to the voltage type used on the serial line
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_voltageLevel(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('voltageLevel', rest_val);
    }
    /**
     * Returns the serial port communication parameters, as a string such as
     * "1200,7E1,Simplex". The string includes the baud rate, the number of data bits,
     * the parity, and the number of stop bits. The suffix "Simplex" denotes
     * the fact that transmission in both directions is multiplexed on the
     * same transmission line.
     *
     * @return a string corresponding to the serial port communication parameters, as a string such as
     *         "1200,7E1,Simplex"
     *
     * On failure, throws an exception or returns YSdi12Port.SERIALMODE_INVALID.
     */
    async get_serialMode() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YSdi12Port.SERIALMODE_INVALID;
            }
        }
        res = this._serialMode;
        return res;
    }
    /**
     * Changes the serial port communication parameters, with a string such as
     * "1200,7E1,Simplex". The string includes the baud rate, the number of data bits,
     * the parity, and the number of stop bits. The suffix "Simplex" denotes
     * the fact that transmission in both directions is multiplexed on the
     * same transmission line.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : a string corresponding to the serial port communication parameters, with a string such as
     *         "1200,7E1,Simplex"
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_serialMode(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('serialMode', rest_val);
    }
    /**
     * Retrieves an SDI12 port for a given identifier.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the SDI12 port is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YSdi12Port.isOnline() to test if the SDI12 port is
     * indeed online at a given time. In case of ambiguity when looking for
     * an SDI12 port by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the SDI12 port, for instance
     *         MyDevice.sdi12Port.
     *
     * @return a YSdi12Port object allowing you to drive the SDI12 port.
     */
    static FindSdi12Port(func) {
        let obj;
        obj = YFunction._FindFromCache('Sdi12Port', func);
        if (obj == null) {
            obj = new YSdi12Port(YAPI, func);
            YFunction._AddToCache('Sdi12Port', func, obj);
        }
        return obj;
    }
    /**
     * Retrieves an SDI12 port for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the SDI12 port is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YSdi12Port.isOnline() to test if the SDI12 port is
     * indeed online at a given time. In case of ambiguity when looking for
     * an SDI12 port by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx : a YAPI context
     * @param func : a string that uniquely characterizes the SDI12 port, for instance
     *         MyDevice.sdi12Port.
     *
     * @return a YSdi12Port object allowing you to drive the SDI12 port.
     */
    static FindSdi12PortInContext(yctx, func) {
        let obj;
        obj = YFunction._FindFromCacheInContext(yctx, 'Sdi12Port', func);
        if (obj == null) {
            obj = new YSdi12Port(yctx, func);
            YFunction._AddToCache('Sdi12Port', func, obj);
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
        this._valueCallbackSdi12Port = callback;
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
        if (this._valueCallbackSdi12Port != null) {
            try {
                await this._valueCallbackSdi12Port(this, value);
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
    async sendCommand(text) {
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
    async readLine() {
        let url;
        let msgbin;
        let msgarr = [];
        let msglen;
        let res;
        url = 'rxmsg.json?pos=' + String(Math.round(this._rxptr)) + '&len=1&maxw=1';
        msgbin = await this._download(url);
        msgarr = this.imm_json_get_array(msgbin);
        msglen = msgarr.length;
        if (msglen == 0) {
            return '';
        }
        // last element of array is the new position
        msglen = msglen - 1;
        this._rxptr = this.imm_decode_json_int(msgarr[msglen]);
        if (msglen == 0) {
            return '';
        }
        res = this.imm_json_get_string(msgarr[0]);
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
    async readMessages(pattern, maxWait) {
        let url;
        let msgbin;
        let msgarr = [];
        let msglen;
        let res = [];
        let idx;
        url = 'rxmsg.json?pos=' + String(Math.round(this._rxptr)) + '&maxw=' + String(Math.round(maxWait)) + '&pat=' + pattern;
        msgbin = await this._download(url);
        msgarr = this.imm_json_get_array(msgbin);
        msglen = msgarr.length;
        if (msglen == 0) {
            return res;
        }
        // last element of array is the new position
        msglen = msglen - 1;
        this._rxptr = this.imm_decode_json_int(msgarr[msglen]);
        idx = 0;
        while (idx < msglen) {
            res.push(this.imm_json_get_string(msgarr[idx]));
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
    async read_seek(absPos) {
        this._rxptr = absPos;
        return this._yapi.SUCCESS;
    }
    /**
     * Returns the current absolute stream position pointer of the API object.
     *
     * @return the absolute position index for next read operations.
     */
    async read_tell() {
        return this._rxptr;
    }
    /**
     * Returns the number of bytes available to read in the input buffer starting from the
     * current absolute stream position pointer of the API object.
     *
     * @return the number of bytes available to read
     */
    async read_avail() {
        let availPosStr;
        let atPos;
        let res;
        let databin;
        databin = await this._download('rxcnt.bin?pos=' + String(Math.round(this._rxptr)));
        availPosStr = this._yapi.imm_bin2str(databin);
        atPos = (availPosStr).indexOf('@');
        res = YAPIContext.imm_atoi(availPosStr.substr(0, atPos));
        return res;
    }
    async end_tell() {
        let availPosStr;
        let atPos;
        let res;
        let databin;
        databin = await this._download('rxcnt.bin?pos=' + String(Math.round(this._rxptr)));
        availPosStr = this._yapi.imm_bin2str(databin);
        atPos = (availPosStr).indexOf('@');
        res = YAPIContext.imm_atoi(availPosStr.substr(atPos + 1, (availPosStr).length - atPos - 1));
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
    async queryLine(query, maxWait) {
        let prevpos;
        let url;
        let msgbin;
        let msgarr = [];
        let msglen;
        let res;
        if ((query).length <= 80) {
            // fast query
            url = 'rxmsg.json?len=1&maxw=' + String(Math.round(maxWait)) + '&cmd=!' + this.imm_escapeAttr(query);
        }
        else {
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
        this._rxptr = this.imm_decode_json_int(msgarr[msglen]);
        if (msglen == 0) {
            return '';
        }
        res = this.imm_json_get_string(msgarr[0]);
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
    async queryHex(hexString, maxWait) {
        let prevpos;
        let url;
        let msgbin;
        let msgarr = [];
        let msglen;
        let res;
        if ((hexString).length <= 80) {
            // fast query
            url = 'rxmsg.json?len=1&maxw=' + String(Math.round(maxWait)) + '&cmd=$' + hexString;
        }
        else {
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
        this._rxptr = this.imm_decode_json_int(msgarr[msglen]);
        if (msglen == 0) {
            return '';
        }
        res = this.imm_json_get_string(msgarr[0]);
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
    async uploadJob(jobfile, jsonDef) {
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
    async selectJob(jobfile) {
        return await this.set_currentJob(jobfile);
    }
    /**
     * Clears the serial port buffer and resets counters to zero.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async reset() {
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
    async writeByte(code) {
        return await this.sendCommand('$' + ('00' + (code).toString(16)).slice(-2).toUpperCase());
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
    async writeStr(text) {
        let buff;
        let bufflen;
        let idx;
        let ch;
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
                }
                else {
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
    async writeBin(buff) {
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
    async writeArray(byteList) {
        let buff;
        let bufflen;
        let idx;
        let hexb;
        let res;
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
    async writeHex(hexString) {
        let buff;
        let bufflen;
        let idx;
        let hexb;
        let res;
        bufflen = (hexString).length;
        if (bufflen < 100) {
            return await this.sendCommand('$' + hexString);
        }
        bufflen = (bufflen >> 1);
        buff = new Uint8Array(bufflen);
        idx = 0;
        while (idx < bufflen) {
            hexb = parseInt(hexString.substr(2 * idx, 2), 16);
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
    async writeLine(text) {
        let buff;
        let bufflen;
        let idx;
        let ch;
        buff = this._yapi.imm_str2bin(text + '\r\n');
        bufflen = (buff).length - 2;
        if (bufflen < 100) {
            // if string is pure text, we can send it as a simple command (faster)
            ch = 0x20;
            idx = 0;
            while ((idx < bufflen) && (ch != 0)) {
                ch = buff[idx];
                if ((ch >= 0x20) && (ch < 0x7f)) {
                    idx = idx + 1;
                }
                else {
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
    async readByte() {
        let currpos;
        let reqlen;
        let buff;
        let bufflen;
        let mult;
        let endpos;
        let res;
        // first check if we have the requested character in the look-ahead buffer
        bufflen = (this._rxbuff).length;
        if ((this._rxptr >= this._rxbuffptr) && (this._rxptr < this._rxbuffptr + bufflen)) {
            res = this._rxbuff[this._rxptr - this._rxbuffptr];
            this._rxptr = this._rxptr + 1;
            return res;
        }
        // try to preload more than one byte to speed-up byte-per-byte access
        currpos = this._rxptr;
        reqlen = 1024;
        buff = await this.readBin(reqlen);
        bufflen = (buff).length;
        if (this._rxptr == currpos + bufflen) {
            res = buff[0];
            this._rxptr = currpos + 1;
            this._rxbuffptr = currpos;
            this._rxbuff = buff;
            return res;
        }
        // mixed bidirectional data, retry with a smaller block
        this._rxptr = currpos;
        reqlen = 16;
        buff = await this.readBin(reqlen);
        bufflen = (buff).length;
        if (this._rxptr == currpos + bufflen) {
            res = buff[0];
            this._rxptr = currpos + 1;
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
    async readStr(nChars) {
        let buff;
        let bufflen;
        let mult;
        let endpos;
        let res;
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
    async readBin(nChars) {
        let buff;
        let bufflen;
        let mult;
        let endpos;
        let idx;
        let res;
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
    async readArray(nChars) {
        let buff;
        let bufflen;
        let mult;
        let endpos;
        let idx;
        let b;
        let res = [];
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
    async readHex(nBytes) {
        let buff;
        let bufflen;
        let mult;
        let endpos;
        let ofs;
        let res;
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
            res = res + '' + ('00' + (buff[ofs]).toString(16)).slice(-2).toUpperCase() + '' + ('00' + (buff[ofs + 1]).toString(16)).slice(-2).toUpperCase() + '' + ('00' + (buff[ofs + 2]).toString(16)).slice(-2).toUpperCase() + '' + ('00' + (buff[ofs + 3]).toString(16)).slice(-2).toUpperCase();
            ofs = ofs + 4;
        }
        while (ofs < bufflen) {
            res = res + '' + ('00' + (buff[ofs]).toString(16)).slice(-2).toUpperCase();
            ofs = ofs + 1;
        }
        return res;
    }
    /**
     * Sends a SDI-12 query to the bus, and reads the sensor immediate reply.
     * This function is intended to be used when the serial port is configured for 'SDI-12' protocol.
     *
     * @param sensorAddr : the sensor address, as a string
     * @param cmd : the SDI12 query to send (without address and exclamation point)
     * @param maxWait : the maximum timeout to wait for a reply from sensor, in millisecond
     *
     * @return the reply returned by the sensor, without newline, as a string.
     *
     * On failure, throws an exception or returns an empty string.
     */
    async querySdi12(sensorAddr, cmd, maxWait) {
        let fullCmd;
        let cmdChar;
        let pattern;
        let url;
        let msgbin;
        let msgarr = [];
        let msglen;
        let res;
        cmdChar = '';
        pattern = sensorAddr;
        if ((cmd).length > 0) {
            cmdChar = cmd.substr(0, 1);
        }
        if (sensorAddr == '?') {
            pattern = '.*';
        }
        else {
            if (cmdChar == 'M' || cmdChar == 'D') {
                pattern = sensorAddr + ':.*';
            }
            else {
                pattern = sensorAddr + '.*';
            }
        }
        pattern = this.imm_escapeAttr(pattern);
        fullCmd = this.imm_escapeAttr('+' + sensorAddr + '' + cmd + '!');
        url = 'rxmsg.json?len=1&maxw=' + String(Math.round(maxWait)) + '&cmd=' + fullCmd + '&pat=' + pattern;
        msgbin = await this._download(url);
        if ((msgbin).length < 2) {
            return '';
        }
        msgarr = this.imm_json_get_array(msgbin);
        msglen = msgarr.length;
        if (msglen == 0) {
            return '';
        }
        // last element of array is the new position
        msglen = msglen - 1;
        this._rxptr = this.imm_decode_json_int(msgarr[msglen]);
        if (msglen == 0) {
            return '';
        }
        res = this.imm_json_get_string(msgarr[0]);
        return res;
    }
    /**
     * Sends a discovery command to the bus, and reads the sensor information reply.
     * This function is intended to be used when the serial port is configured for 'SDI-12' protocol.
     * This function work when only one sensor is connected.
     *
     * @return the reply returned by the sensor, as a YSdi12SensorInfo object.
     *
     * On failure, throws an exception or returns an empty string.
     */
    async discoverSingleSensor() {
        let resStr;
        resStr = await this.querySdi12('?', '', 5000);
        if (resStr == '') {
            return new YSdi12SensorInfo(this, 'ERSensor Not Found');
        }
        return await this.getSensorInformation(resStr);
    }
    /**
     * Sends a discovery command to the bus, and reads all sensors information reply.
     * This function is intended to be used when the serial port is configured for 'SDI-12' protocol.
     *
     * @return all the information from every connected sensor, as an array of YSdi12SensorInfo object.
     *
     * On failure, throws an exception or returns an empty string.
     */
    async discoverAllSensors() {
        let sensors = [];
        let idSens = [];
        let res;
        let i;
        let lettreMin;
        let lettreMaj;
        // 1. Search for sensors present
        idSens.length = 0;
        i = 0;
        while (i < 10) {
            res = await this.querySdi12((i).toString(), '!', 500);
            if ((res).length >= 1) {
                idSens.push(res);
            }
            i = i + 1;
        }
        lettreMin = 'abcdefghijklmnopqrstuvwxyz';
        lettreMaj = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        i = 0;
        while (i < 26) {
            res = await this.querySdi12(lettreMin.substr(i, 1), '!', 500);
            if ((res).length >= 1) {
                idSens.push(res);
            }
            i = i + 1;
        }
        while (i < 26) {
            res = await this.querySdi12(lettreMaj.substr(i, 1), '!', 500);
            if ((res).length >= 1) {
                idSens.push(res);
            }
            i = i + 1;
        }
        // 2. Query existing sensors information
        i = 0;
        sensors.length = 0;
        while (i < idSens.length) {
            sensors.push(await this.getSensorInformation(idSens[i]));
            i = i + 1;
        }
        return sensors;
    }
    /**
     * Sends a mesurement command to the SDI-12 bus, and reads the sensor immediate reply.
     * The supported commands are:
     * M: Measurement start control
     * M1...M9: Additional measurement start command
     * D: Measurement reading control
     * This function is intended to be used when the serial port is configured for 'SDI-12' protocol.
     *
     * @param sensorAddr : the sensor address, as a string
     * @param measCmd : the SDI12 query to send (without address and exclamation point)
     * @param maxWait : the maximum timeout to wait for a reply from sensor, in millisecond
     *
     * @return the reply returned by the sensor, without newline, as a list of float.
     *
     * On failure, throws an exception or returns an empty string.
     */
    async readSensor(sensorAddr, measCmd, maxWait) {
        let resStr;
        let res = [];
        let tab = [];
        let split = [];
        let i;
        let valdouble;
        resStr = await this.querySdi12(sensorAddr, measCmd, maxWait);
        tab = (resStr).split(',');
        split = (tab[0]).split(':');
        if (split.length < 2) {
            return res;
        }
        valdouble = YAPIContext.imm_atof(split[1]);
        res.push(valdouble);
        i = 1;
        while (i < tab.length) {
            valdouble = YAPIContext.imm_atof(tab[i]);
            res.push(valdouble);
            i = i + 1;
        }
        return res;
    }
    /**
     * Changes the address of the selected sensor, and returns the sensor information with the new address.
     * This function is intended to be used when the serial port is configured for 'SDI-12' protocol.
     *
     * @param oldAddress : Actual sensor address, as a string
     * @param newAddress : New sensor address, as a string
     *
     * @return the sensor address and information , as a YSdi12SensorInfo object.
     *
     * On failure, throws an exception or returns an empty string.
     */
    async changeAddress(oldAddress, newAddress) {
        let addr;
        await this.querySdi12(oldAddress, 'A' + newAddress, 1000);
        addr = await this.getSensorInformation(newAddress);
        return addr;
    }
    /**
     * Sends a information command to the bus, and reads sensors information selected.
     * This function is intended to be used when the serial port is configured for 'SDI-12' protocol.
     *
     * @param sensorAddr : Sensor address, as a string
     *
     * @return the reply returned by the sensor, as a YSdi12Port object.
     *
     * On failure, throws an exception or returns an empty string.
     */
    async getSensorInformation(sensorAddr) {
        let res;
        let sensor;
        res = await this.querySdi12(sensorAddr, 'I', 1000);
        if (res == '') {
            return new YSdi12SensorInfo(this, 'ERSensor Not Found');
        }
        sensor = new YSdi12SensorInfo(this, res);
        await sensor._queryValueInfo();
        return sensor;
    }
    /**
     * Sends a information command to the bus, and reads sensors information selected.
     * This function is intended to be used when the serial port is configured for 'SDI-12' protocol.
     *
     * @param sensorAddr : Sensor address, as a string
     *
     * @return the reply returned by the sensor, as a YSdi12Port object.
     *
     * On failure, throws an exception or returns an empty string.
     */
    async readConcurrentMeasurements(sensorAddr) {
        let res = [];
        res = await this.readSensor(sensorAddr, 'D', 1000);
        return res;
    }
    /**
     * Sends a information command to the bus, and reads sensors information selected.
     * This function is intended to be used when the serial port is configured for 'SDI-12' protocol.
     *
     * @param sensorAddr : Sensor address, as a string
     *
     * @return the reply returned by the sensor, as a YSdi12Port object.
     *
     * On failure, throws an exception or returns an empty string.
     */
    async requestConcurrentMeasurements(sensorAddr) {
        let timewait;
        let wait;
        wait = await this.querySdi12(sensorAddr, 'C', 1000);
        wait = wait.substr(1, 3);
        timewait = YAPIContext.imm_atoi(wait) * 1000;
        return timewait;
    }
    /**
     * Retrieves messages (both direction) in the SDI12 port buffer, starting at current position.
     *
     * If no message is found, the search waits for one up to the specified maximum timeout
     * (in milliseconds).
     *
     * @param maxWait : the maximum number of milliseconds to wait for a message if none is found
     *         in the receive buffer.
     * @param maxMsg : the maximum number of messages to be returned by the function; up to 254.
     *
     * @return an array of YSdi12SnoopingRecord objects containing the messages found, if any.
     *
     * On failure, throws an exception or returns an empty array.
     */
    async snoopMessagesEx(maxWait, maxMsg) {
        let url;
        let msgbin;
        let msgarr = [];
        let msglen;
        let res = [];
        let idx;
        url = 'rxmsg.json?pos=' + String(Math.round(this._rxptr)) + '&maxw=' + String(Math.round(maxWait)) + '&t=0&len=' + String(Math.round(maxMsg));
        msgbin = await this._download(url);
        msgarr = this.imm_json_get_array(msgbin);
        msglen = msgarr.length;
        if (msglen == 0) {
            return res;
        }
        // last element of array is the new position
        msglen = msglen - 1;
        this._rxptr = this.imm_decode_json_int(msgarr[msglen]);
        idx = 0;
        while (idx < msglen) {
            res.push(new YSdi12SnoopingRecord(this._yapi.imm_bin2str(msgarr[idx])));
            idx = idx + 1;
        }
        return res;
    }
    /**
     * Retrieves messages (both direction) in the SDI12 port buffer, starting at current position.
     *
     * If no message is found, the search waits for one up to the specified maximum timeout
     * (in milliseconds).
     *
     * @param maxWait : the maximum number of milliseconds to wait for a message if none is found
     *         in the receive buffer.
     *
     * @return an array of YSdi12SnoopingRecord objects containing the messages found, if any.
     *
     * On failure, throws an exception or returns an empty array.
     */
    async snoopMessages(maxWait) {
        return await this.snoopMessagesEx(maxWait, 255);
    }
    /**
     * Continues the enumeration of SDI12 ports started using yFirstSdi12Port().
     * Caution: You can't make any assumption about the returned SDI12 ports order.
     * If you want to find a specific an SDI12 port, use Sdi12Port.findSdi12Port()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YSdi12Port object, corresponding to
     *         an SDI12 port currently online, or a null pointer
     *         if there are no more SDI12 ports to enumerate.
     */
    nextSdi12Port() {
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != YAPI.SUCCESS)
            return null;
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if (next_hwid == null)
            return null;
        return YSdi12Port.FindSdi12PortInContext(this._yapi, next_hwid);
    }
    /**
     * Starts the enumeration of SDI12 ports currently accessible.
     * Use the method YSdi12Port.nextSdi12Port() to iterate on
     * next SDI12 ports.
     *
     * @return a pointer to a YSdi12Port object, corresponding to
     *         the first SDI12 port currently online, or a null pointer
     *         if there are none.
     */
    static FirstSdi12Port() {
        let next_hwid = YAPI.imm_getFirstHardwareId('Sdi12Port');
        if (next_hwid == null)
            return null;
        return YSdi12Port.FindSdi12Port(next_hwid);
    }
    /**
     * Starts the enumeration of SDI12 ports currently accessible.
     * Use the method YSdi12Port.nextSdi12Port() to iterate on
     * next SDI12 ports.
     *
     * @param yctx : a YAPI context.
     *
     * @return a pointer to a YSdi12Port object, corresponding to
     *         the first SDI12 port currently online, or a null pointer
     *         if there are none.
     */
    static FirstSdi12PortInContext(yctx) {
        let next_hwid = yctx.imm_getFirstHardwareId('Sdi12Port');
        if (next_hwid == null)
            return null;
        return YSdi12Port.FindSdi12PortInContext(yctx, next_hwid);
    }
}
// API symbols as static members
YSdi12Port.RXCOUNT_INVALID = YAPI.INVALID_UINT;
YSdi12Port.TXCOUNT_INVALID = YAPI.INVALID_UINT;
YSdi12Port.ERRCOUNT_INVALID = YAPI.INVALID_UINT;
YSdi12Port.RXMSGCOUNT_INVALID = YAPI.INVALID_UINT;
YSdi12Port.TXMSGCOUNT_INVALID = YAPI.INVALID_UINT;
YSdi12Port.LASTMSG_INVALID = YAPI.INVALID_STRING;
YSdi12Port.CURRENTJOB_INVALID = YAPI.INVALID_STRING;
YSdi12Port.STARTUPJOB_INVALID = YAPI.INVALID_STRING;
YSdi12Port.JOBMAXTASK_INVALID = YAPI.INVALID_UINT;
YSdi12Port.JOBMAXSIZE_INVALID = YAPI.INVALID_UINT;
YSdi12Port.COMMAND_INVALID = YAPI.INVALID_STRING;
YSdi12Port.PROTOCOL_INVALID = YAPI.INVALID_STRING;
YSdi12Port.VOLTAGELEVEL_OFF = 0;
YSdi12Port.VOLTAGELEVEL_TTL3V = 1;
YSdi12Port.VOLTAGELEVEL_TTL3VR = 2;
YSdi12Port.VOLTAGELEVEL_TTL5V = 3;
YSdi12Port.VOLTAGELEVEL_TTL5VR = 4;
YSdi12Port.VOLTAGELEVEL_RS232 = 5;
YSdi12Port.VOLTAGELEVEL_RS485 = 6;
YSdi12Port.VOLTAGELEVEL_TTL1V8 = 7;
YSdi12Port.VOLTAGELEVEL_SDI12 = 8;
YSdi12Port.VOLTAGELEVEL_INVALID = -1;
YSdi12Port.SERIALMODE_INVALID = YAPI.INVALID_STRING;
//# sourceMappingURL=yocto_sdi12port.js.map