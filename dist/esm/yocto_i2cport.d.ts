/*********************************************************************
 *
 *  $Id: yocto_i2cport.ts 63482 2024-11-26 09:29:16Z seb $
 *
 *  Implements the high-level API for I2cSnoopingRecord functions
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
 * YI2cSnoopingRecord Class: Intercepted I2C message description, returned by i2cPort.snoopMessages method
 *
 *
 */
export declare class YI2cSnoopingRecord {
    _tim: number;
    _pos: number;
    _dir: number;
    _msg: string;
    constructor(str_json: string);
    /**
     * Returns the elapsed time, in ms, since the beginning of the preceding message.
     *
     * @return the elapsed time, in ms, since the beginning of the preceding message.
     */
    get_time(): number;
    /**
     * Returns the absolute position of the message end.
     *
     * @return the absolute position of the message end.
     */
    get_pos(): number;
    /**
     * Returns the message direction (RX=0, TX=1).
     *
     * @return the message direction (RX=0, TX=1).
     */
    get_direction(): number;
    /**
     * Returns the message content.
     *
     * @return the message content.
     */
    get_message(): string;
}
export declare namespace YI2cSnoopingRecord {
}
/**
 * YI2cPort Class: I2C port control interface, available for instance in the Yocto-I2C
 *
 * The YI2cPort classe allows you to fully drive a Yoctopuce I2C port.
 * It can be used to send and receive data, and to configure communication
 * parameters (baud rate, etc).
 * Note that Yoctopuce I2C ports are not exposed as virtual COM ports.
 * They are meant to be used in the same way as all Yoctopuce devices.
 */
/** @extends {YFunction} **/
export declare class YI2cPort extends YFunction {
    _className: string;
    _rxCount: number;
    _txCount: number;
    _errCount: number;
    _rxMsgCount: number;
    _txMsgCount: number;
    _lastMsg: string;
    _currentJob: string;
    _startupJob: string;
    _jobMaxTask: number;
    _jobMaxSize: number;
    _command: string;
    _protocol: string;
    _i2cVoltageLevel: YI2cPort.I2CVOLTAGELEVEL;
    _i2cMode: string;
    _valueCallbackI2cPort: YI2cPort.ValueCallback | null;
    _rxptr: number;
    _rxbuff: Uint8Array;
    _rxbuffptr: number;
    readonly RXCOUNT_INVALID: number;
    readonly TXCOUNT_INVALID: number;
    readonly ERRCOUNT_INVALID: number;
    readonly RXMSGCOUNT_INVALID: number;
    readonly TXMSGCOUNT_INVALID: number;
    readonly LASTMSG_INVALID: string;
    readonly CURRENTJOB_INVALID: string;
    readonly STARTUPJOB_INVALID: string;
    readonly JOBMAXTASK_INVALID: number;
    readonly JOBMAXSIZE_INVALID: number;
    readonly COMMAND_INVALID: string;
    readonly PROTOCOL_INVALID: string;
    readonly I2CVOLTAGELEVEL_OFF: YI2cPort.I2CVOLTAGELEVEL;
    readonly I2CVOLTAGELEVEL_3V3: YI2cPort.I2CVOLTAGELEVEL;
    readonly I2CVOLTAGELEVEL_1V8: YI2cPort.I2CVOLTAGELEVEL;
    readonly I2CVOLTAGELEVEL_INVALID: YI2cPort.I2CVOLTAGELEVEL;
    readonly I2CMODE_INVALID: string;
    static readonly RXCOUNT_INVALID: number;
    static readonly TXCOUNT_INVALID: number;
    static readonly ERRCOUNT_INVALID: number;
    static readonly RXMSGCOUNT_INVALID: number;
    static readonly TXMSGCOUNT_INVALID: number;
    static readonly LASTMSG_INVALID: string;
    static readonly CURRENTJOB_INVALID: string;
    static readonly STARTUPJOB_INVALID: string;
    static readonly JOBMAXTASK_INVALID: number;
    static readonly JOBMAXSIZE_INVALID: number;
    static readonly COMMAND_INVALID: string;
    static readonly PROTOCOL_INVALID: string;
    static readonly I2CVOLTAGELEVEL_OFF: YI2cPort.I2CVOLTAGELEVEL;
    static readonly I2CVOLTAGELEVEL_3V3: YI2cPort.I2CVOLTAGELEVEL;
    static readonly I2CVOLTAGELEVEL_1V8: YI2cPort.I2CVOLTAGELEVEL;
    static readonly I2CVOLTAGELEVEL_INVALID: YI2cPort.I2CVOLTAGELEVEL;
    static readonly I2CMODE_INVALID: string;
    constructor(yapi: YAPIContext, func: string);
    imm_parseAttr(name: string, val: any): number;
    /**
     * Returns the total number of bytes received since last reset.
     *
     * @return an integer corresponding to the total number of bytes received since last reset
     *
     * On failure, throws an exception or returns YI2cPort.RXCOUNT_INVALID.
     */
    get_rxCount(): Promise<number>;
    /**
     * Returns the total number of bytes transmitted since last reset.
     *
     * @return an integer corresponding to the total number of bytes transmitted since last reset
     *
     * On failure, throws an exception or returns YI2cPort.TXCOUNT_INVALID.
     */
    get_txCount(): Promise<number>;
    /**
     * Returns the total number of communication errors detected since last reset.
     *
     * @return an integer corresponding to the total number of communication errors detected since last reset
     *
     * On failure, throws an exception or returns YI2cPort.ERRCOUNT_INVALID.
     */
    get_errCount(): Promise<number>;
    /**
     * Returns the total number of messages received since last reset.
     *
     * @return an integer corresponding to the total number of messages received since last reset
     *
     * On failure, throws an exception or returns YI2cPort.RXMSGCOUNT_INVALID.
     */
    get_rxMsgCount(): Promise<number>;
    /**
     * Returns the total number of messages send since last reset.
     *
     * @return an integer corresponding to the total number of messages send since last reset
     *
     * On failure, throws an exception or returns YI2cPort.TXMSGCOUNT_INVALID.
     */
    get_txMsgCount(): Promise<number>;
    /**
     * Returns the latest message fully received (for Line and Frame protocols).
     *
     * @return a string corresponding to the latest message fully received (for Line and Frame protocols)
     *
     * On failure, throws an exception or returns YI2cPort.LASTMSG_INVALID.
     */
    get_lastMsg(): Promise<string>;
    /**
     * Returns the name of the job file currently in use.
     *
     * @return a string corresponding to the name of the job file currently in use
     *
     * On failure, throws an exception or returns YI2cPort.CURRENTJOB_INVALID.
     */
    get_currentJob(): Promise<string>;
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
    set_currentJob(newval: string): Promise<number>;
    /**
     * Returns the job file to use when the device is powered on.
     *
     * @return a string corresponding to the job file to use when the device is powered on
     *
     * On failure, throws an exception or returns YI2cPort.STARTUPJOB_INVALID.
     */
    get_startupJob(): Promise<string>;
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
    set_startupJob(newval: string): Promise<number>;
    /**
     * Returns the maximum number of tasks in a job that the device can handle.
     *
     * @return an integer corresponding to the maximum number of tasks in a job that the device can handle
     *
     * On failure, throws an exception or returns YI2cPort.JOBMAXTASK_INVALID.
     */
    get_jobMaxTask(): Promise<number>;
    /**
     * Returns maximum size allowed for job files.
     *
     * @return an integer corresponding to maximum size allowed for job files
     *
     * On failure, throws an exception or returns YI2cPort.JOBMAXSIZE_INVALID.
     */
    get_jobMaxSize(): Promise<number>;
    get_command(): Promise<string>;
    set_command(newval: string): Promise<number>;
    /**
     * Returns the type of protocol used to send I2C messages, as a string.
     * Possible values are
     * "Line" for messages separated by LF or
     * "Char" for continuous stream of codes.
     *
     * @return a string corresponding to the type of protocol used to send I2C messages, as a string
     *
     * On failure, throws an exception or returns YI2cPort.PROTOCOL_INVALID.
     */
    get_protocol(): Promise<string>;
    /**
     * Changes the type of protocol used to send I2C messages.
     * Possible values are
     * "Line" for messages separated by LF or
     * "Char" for continuous stream of codes.
     * The suffix "/[wait]ms" can be added to reduce the transmit rate so that there
     * is always at lest the specified number of milliseconds between each message sent.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : a string corresponding to the type of protocol used to send I2C messages
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_protocol(newval: string): Promise<number>;
    /**
     * Returns the voltage level used on the I2C bus.
     *
     * @return a value among YI2cPort.I2CVOLTAGELEVEL_OFF, YI2cPort.I2CVOLTAGELEVEL_3V3 and
     * YI2cPort.I2CVOLTAGELEVEL_1V8 corresponding to the voltage level used on the I2C bus
     *
     * On failure, throws an exception or returns YI2cPort.I2CVOLTAGELEVEL_INVALID.
     */
    get_i2cVoltageLevel(): Promise<YI2cPort.I2CVOLTAGELEVEL>;
    /**
     * Changes the voltage level used on the I2C bus.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : a value among YI2cPort.I2CVOLTAGELEVEL_OFF, YI2cPort.I2CVOLTAGELEVEL_3V3 and
     * YI2cPort.I2CVOLTAGELEVEL_1V8 corresponding to the voltage level used on the I2C bus
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_i2cVoltageLevel(newval: YI2cPort.I2CVOLTAGELEVEL): Promise<number>;
    /**
     * Returns the I2C port communication parameters, as a string such as
     * "400kbps,2000ms,NoRestart". The string includes the baud rate, the
     * recovery delay after communications errors, and if needed the option
     * NoRestart to use a Stop/Start sequence instead of the
     * Restart state when performing read on the I2C bus.
     *
     * @return a string corresponding to the I2C port communication parameters, as a string such as
     *         "400kbps,2000ms,NoRestart"
     *
     * On failure, throws an exception or returns YI2cPort.I2CMODE_INVALID.
     */
    get_i2cMode(): Promise<string>;
    /**
     * Changes the I2C port communication parameters, with a string such as
     * "400kbps,2000ms". The string includes the baud rate, the
     * recovery delay after communications errors, and if needed the option
     * NoRestart to use a Stop/Start sequence instead of the
     * Restart state when performing read on the I2C bus.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : a string corresponding to the I2C port communication parameters, with a string such as
     *         "400kbps,2000ms"
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_i2cMode(newval: string): Promise<number>;
    /**
     * Retrieves an I2C port for a given identifier.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the I2C port is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YI2cPort.isOnline() to test if the I2C port is
     * indeed online at a given time. In case of ambiguity when looking for
     * an I2C port by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the I2C port, for instance
     *         YI2CMK01.i2cPort.
     *
     * @return a YI2cPort object allowing you to drive the I2C port.
     */
    static FindI2cPort(func: string): YI2cPort;
    /**
     * Retrieves an I2C port for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the I2C port is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YI2cPort.isOnline() to test if the I2C port is
     * indeed online at a given time. In case of ambiguity when looking for
     * an I2C port by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx : a YAPI context
     * @param func : a string that uniquely characterizes the I2C port, for instance
     *         YI2CMK01.i2cPort.
     *
     * @return a YI2cPort object allowing you to drive the I2C port.
     */
    static FindI2cPortInContext(yctx: YAPIContext, func: string): YI2cPort;
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
    registerValueCallback(callback: YI2cPort.ValueCallback | null): Promise<number>;
    _invokeValueCallback(value: string): Promise<number>;
    sendCommand(text: string): Promise<number>;
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
    readLine(): Promise<string>;
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
    readMessages(pattern: string, maxWait: number): Promise<string[]>;
    /**
     * Changes the current internal stream position to the specified value. This function
     * does not affect the device, it only changes the value stored in the API object
     * for the next read operations.
     *
     * @param absPos : the absolute position index for next read operations.
     *
     * @return nothing.
     */
    read_seek(absPos: number): Promise<number>;
    /**
     * Returns the current absolute stream position pointer of the API object.
     *
     * @return the absolute position index for next read operations.
     */
    read_tell(): Promise<number>;
    /**
     * Returns the number of bytes available to read in the input buffer starting from the
     * current absolute stream position pointer of the API object.
     *
     * @return the number of bytes available to read
     */
    read_avail(): Promise<number>;
    end_tell(): Promise<number>;
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
    queryLine(query: string, maxWait: number): Promise<string>;
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
    queryHex(hexString: string, maxWait: number): Promise<string>;
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
    uploadJob(jobfile: string, jsonDef: string): Promise<number>;
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
    selectJob(jobfile: string): Promise<number>;
    /**
     * Clears the serial port buffer and resets counters to zero.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    reset(): Promise<number>;
    /**
     * Sends a one-way message (provided as a a binary buffer) to a device on the I2C bus.
     * This function checks and reports communication errors on the I2C bus.
     *
     * @param slaveAddr : the 7-bit address of the slave device (without the direction bit)
     * @param buff : the binary buffer to be sent
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    i2cSendBin(slaveAddr: number, buff: Uint8Array): Promise<number>;
    /**
     * Sends a one-way message (provided as a list of integer) to a device on the I2C bus.
     * This function checks and reports communication errors on the I2C bus.
     *
     * @param slaveAddr : the 7-bit address of the slave device (without the direction bit)
     * @param values : a list of data bytes to be sent
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    i2cSendArray(slaveAddr: number, values: number[]): Promise<number>;
    /**
     * Sends a one-way message (provided as a a binary buffer) to a device on the I2C bus,
     * then read back the specified number of bytes from device.
     * This function checks and reports communication errors on the I2C bus.
     *
     * @param slaveAddr : the 7-bit address of the slave device (without the direction bit)
     * @param buff : the binary buffer to be sent
     * @param rcvCount : the number of bytes to receive once the data bytes are sent
     *
     * @return a list of bytes with the data received from slave device.
     *
     * On failure, throws an exception or returns an empty binary buffer.
     */
    i2cSendAndReceiveBin(slaveAddr: number, buff: Uint8Array, rcvCount: number): Promise<Uint8Array>;
    /**
     * Sends a one-way message (provided as a list of integer) to a device on the I2C bus,
     * then read back the specified number of bytes from device.
     * This function checks and reports communication errors on the I2C bus.
     *
     * @param slaveAddr : the 7-bit address of the slave device (without the direction bit)
     * @param values : a list of data bytes to be sent
     * @param rcvCount : the number of bytes to receive once the data bytes are sent
     *
     * @return a list of bytes with the data received from slave device.
     *
     * On failure, throws an exception or returns an empty array.
     */
    i2cSendAndReceiveArray(slaveAddr: number, values: number[], rcvCount: number): Promise<number[]>;
    /**
     * Sends a text-encoded I2C code stream to the I2C bus, as is.
     * An I2C code stream is a string made of hexadecimal data bytes,
     * but that may also include the I2C state transitions code:
     * "{S}" to emit a start condition,
     * "{R}" for a repeated start condition,
     * "{P}" for a stop condition,
     * "xx" for receiving a data byte,
     * "{A}" to ack a data byte received and
     * "{N}" to nack a data byte received.
     * If a newline ("\n") is included in the stream, the message
     * will be terminated and a newline will also be added to the
     * receive stream.
     *
     * @param codes : the code stream to send
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    writeStr(codes: string): Promise<number>;
    /**
     * Sends a text-encoded I2C code stream to the I2C bus, and terminate
     * the message en relâchant le bus.
     * An I2C code stream is a string made of hexadecimal data bytes,
     * but that may also include the I2C state transitions code:
     * "{S}" to emit a start condition,
     * "{R}" for a repeated start condition,
     * "{P}" for a stop condition,
     * "xx" for receiving a data byte,
     * "{A}" to ack a data byte received and
     * "{N}" to nack a data byte received.
     * At the end of the stream, a stop condition is added if missing
     * and a newline is added to the receive buffer as well.
     *
     * @param codes : the code stream to send
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    writeLine(codes: string): Promise<number>;
    /**
     * Sends a single byte to the I2C bus. Depending on the I2C bus state, the byte
     * will be interpreted as an address byte or a data byte.
     *
     * @param code : the byte to send
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    writeByte(code: number): Promise<number>;
    /**
     * Sends a byte sequence (provided as a hexadecimal string) to the I2C bus.
     * Depending on the I2C bus state, the first byte will be interpreted as an
     * address byte or a data byte.
     *
     * @param hexString : a string of hexadecimal byte codes
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    writeHex(hexString: string): Promise<number>;
    /**
     * Sends a binary buffer to the I2C bus, as is.
     * Depending on the I2C bus state, the first byte will be interpreted
     * as an address byte or a data byte.
     *
     * @param buff : the binary buffer to send
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    writeBin(buff: Uint8Array): Promise<number>;
    /**
     * Sends a byte sequence (provided as a list of bytes) to the I2C bus.
     * Depending on the I2C bus state, the first byte will be interpreted as an
     * address byte or a data byte.
     *
     * @param byteList : a list of byte codes
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    writeArray(byteList: number[]): Promise<number>;
    /**
     * Retrieves messages (both direction) in the I2C port buffer, starting at current position.
     *
     * If no message is found, the search waits for one up to the specified maximum timeout
     * (in milliseconds).
     *
     * @param maxWait : the maximum number of milliseconds to wait for a message if none is found
     *         in the receive buffer.
     * @param maxMsg : the maximum number of messages to be returned by the function; up to 254.
     *
     * @return an array of YI2cSnoopingRecord objects containing the messages found, if any.
     *
     * On failure, throws an exception or returns an empty array.
     */
    snoopMessagesEx(maxWait: number, maxMsg: number): Promise<YI2cSnoopingRecord[]>;
    /**
     * Retrieves messages (both direction) in the I2C port buffer, starting at current position.
     *
     * If no message is found, the search waits for one up to the specified maximum timeout
     * (in milliseconds).
     *
     * @param maxWait : the maximum number of milliseconds to wait for a message if none is found
     *         in the receive buffer.
     *
     * @return an array of YI2cSnoopingRecord objects containing the messages found, if any.
     *
     * On failure, throws an exception or returns an empty array.
     */
    snoopMessages(maxWait: number): Promise<YI2cSnoopingRecord[]>;
    /**
     * Continues the enumeration of I2C ports started using yFirstI2cPort().
     * Caution: You can't make any assumption about the returned I2C ports order.
     * If you want to find a specific an I2C port, use I2cPort.findI2cPort()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YI2cPort object, corresponding to
     *         an I2C port currently online, or a null pointer
     *         if there are no more I2C ports to enumerate.
     */
    nextI2cPort(): YI2cPort | null;
    /**
     * Starts the enumeration of I2C ports currently accessible.
     * Use the method YI2cPort.nextI2cPort() to iterate on
     * next I2C ports.
     *
     * @return a pointer to a YI2cPort object, corresponding to
     *         the first I2C port currently online, or a null pointer
     *         if there are none.
     */
    static FirstI2cPort(): YI2cPort | null;
    /**
     * Starts the enumeration of I2C ports currently accessible.
     * Use the method YI2cPort.nextI2cPort() to iterate on
     * next I2C ports.
     *
     * @param yctx : a YAPI context.
     *
     * @return a pointer to a YI2cPort object, corresponding to
     *         the first I2C port currently online, or a null pointer
     *         if there are none.
     */
    static FirstI2cPortInContext(yctx: YAPIContext): YI2cPort | null;
}
export declare namespace YI2cPort {
    const enum I2CVOLTAGELEVEL {
        OFF = 0,
        _3V3 = 1,
        _1V8 = 2,
        INVALID = -1
    }
    interface ValueCallback {
        (func: YI2cPort, value: string): void;
    }
}
