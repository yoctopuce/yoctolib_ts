/*********************************************************************
 *
 *  $Id: yocto_spiport.ts 48520 2022-02-03 10:51:20Z seb $
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
import { YAPIContext, YFunction } from './yocto_api.js';
/**
 * YSpiSnoopingRecord Class: Intercepted SPI message description, returned by spiPort.snoopMessages method
 *
 *
 */
export declare class YSpiSnoopingRecord {
    _tim: number;
    _dir: number;
    _msg: string;
    constructor(str_json: string);
    /**
     * Returns the elapsed time, in ms, since the beginning of the preceding message.
     *
     * @return the elapsed time, in ms, since the beginning of the preceding message.
     */
    get_time(): Promise<number>;
    /**
     * Returns the message direction (RX=0, TX=1).
     *
     * @return the message direction (RX=0, TX=1).
     */
    get_direction(): Promise<number>;
    /**
     * Returns the message content.
     *
     * @return the message content.
     */
    get_message(): Promise<string>;
}
export declare namespace YSpiSnoopingRecord {
}
/**
 * YSpiPort Class: SPI port control interface, available for instance in the Yocto-SPI
 *
 * The YSpiPort class allows you to fully drive a Yoctopuce SPI port.
 * It can be used to send and receive data, and to configure communication
 * parameters (baud rate, bit count, parity, flow control and protocol).
 * Note that Yoctopuce SPI ports are not exposed as virtual COM ports.
 * They are meant to be used in the same way as all Yoctopuce devices.
 */
/** @extends {YFunction} **/
export declare class YSpiPort extends YFunction {
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
    _voltageLevel: YSpiPort.VOLTAGELEVEL;
    _spiMode: string;
    _ssPolarity: YSpiPort.SSPOLARITY;
    _shiftSampling: YSpiPort.SHIFTSAMPLING;
    _valueCallbackSpiPort: YSpiPort.ValueCallback | null;
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
    readonly VOLTAGELEVEL_OFF: YSpiPort.VOLTAGELEVEL;
    readonly VOLTAGELEVEL_TTL3V: YSpiPort.VOLTAGELEVEL;
    readonly VOLTAGELEVEL_TTL3VR: YSpiPort.VOLTAGELEVEL;
    readonly VOLTAGELEVEL_TTL5V: YSpiPort.VOLTAGELEVEL;
    readonly VOLTAGELEVEL_TTL5VR: YSpiPort.VOLTAGELEVEL;
    readonly VOLTAGELEVEL_RS232: YSpiPort.VOLTAGELEVEL;
    readonly VOLTAGELEVEL_RS485: YSpiPort.VOLTAGELEVEL;
    readonly VOLTAGELEVEL_TTL1V8: YSpiPort.VOLTAGELEVEL;
    readonly VOLTAGELEVEL_INVALID: YSpiPort.VOLTAGELEVEL;
    readonly SPIMODE_INVALID: string;
    readonly SSPOLARITY_ACTIVE_LOW: YSpiPort.SSPOLARITY;
    readonly SSPOLARITY_ACTIVE_HIGH: YSpiPort.SSPOLARITY;
    readonly SSPOLARITY_INVALID: YSpiPort.SSPOLARITY;
    readonly SHIFTSAMPLING_OFF: YSpiPort.SHIFTSAMPLING;
    readonly SHIFTSAMPLING_ON: YSpiPort.SHIFTSAMPLING;
    readonly SHIFTSAMPLING_INVALID: YSpiPort.SHIFTSAMPLING;
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
    static readonly VOLTAGELEVEL_OFF: YSpiPort.VOLTAGELEVEL;
    static readonly VOLTAGELEVEL_TTL3V: YSpiPort.VOLTAGELEVEL;
    static readonly VOLTAGELEVEL_TTL3VR: YSpiPort.VOLTAGELEVEL;
    static readonly VOLTAGELEVEL_TTL5V: YSpiPort.VOLTAGELEVEL;
    static readonly VOLTAGELEVEL_TTL5VR: YSpiPort.VOLTAGELEVEL;
    static readonly VOLTAGELEVEL_RS232: YSpiPort.VOLTAGELEVEL;
    static readonly VOLTAGELEVEL_RS485: YSpiPort.VOLTAGELEVEL;
    static readonly VOLTAGELEVEL_TTL1V8: YSpiPort.VOLTAGELEVEL;
    static readonly VOLTAGELEVEL_INVALID: YSpiPort.VOLTAGELEVEL;
    static readonly SPIMODE_INVALID: string;
    static readonly SSPOLARITY_ACTIVE_LOW: YSpiPort.SSPOLARITY;
    static readonly SSPOLARITY_ACTIVE_HIGH: YSpiPort.SSPOLARITY;
    static readonly SSPOLARITY_INVALID: YSpiPort.SSPOLARITY;
    static readonly SHIFTSAMPLING_OFF: YSpiPort.SHIFTSAMPLING;
    static readonly SHIFTSAMPLING_ON: YSpiPort.SHIFTSAMPLING;
    static readonly SHIFTSAMPLING_INVALID: YSpiPort.SHIFTSAMPLING;
    constructor(yapi: YAPIContext, func: string);
    imm_parseAttr(name: string, val: any): 0 | 1;
    /**
     * Returns the total number of bytes received since last reset.
     *
     * @return an integer corresponding to the total number of bytes received since last reset
     *
     * On failure, throws an exception or returns YSpiPort.RXCOUNT_INVALID.
     */
    get_rxCount(): Promise<number>;
    /**
     * Returns the total number of bytes transmitted since last reset.
     *
     * @return an integer corresponding to the total number of bytes transmitted since last reset
     *
     * On failure, throws an exception or returns YSpiPort.TXCOUNT_INVALID.
     */
    get_txCount(): Promise<number>;
    /**
     * Returns the total number of communication errors detected since last reset.
     *
     * @return an integer corresponding to the total number of communication errors detected since last reset
     *
     * On failure, throws an exception or returns YSpiPort.ERRCOUNT_INVALID.
     */
    get_errCount(): Promise<number>;
    /**
     * Returns the total number of messages received since last reset.
     *
     * @return an integer corresponding to the total number of messages received since last reset
     *
     * On failure, throws an exception or returns YSpiPort.RXMSGCOUNT_INVALID.
     */
    get_rxMsgCount(): Promise<number>;
    /**
     * Returns the total number of messages send since last reset.
     *
     * @return an integer corresponding to the total number of messages send since last reset
     *
     * On failure, throws an exception or returns YSpiPort.TXMSGCOUNT_INVALID.
     */
    get_txMsgCount(): Promise<number>;
    /**
     * Returns the latest message fully received (for Line and Frame protocols).
     *
     * @return a string corresponding to the latest message fully received (for Line and Frame protocols)
     *
     * On failure, throws an exception or returns YSpiPort.LASTMSG_INVALID.
     */
    get_lastMsg(): Promise<string>;
    /**
     * Returns the name of the job file currently in use.
     *
     * @return a string corresponding to the name of the job file currently in use
     *
     * On failure, throws an exception or returns YSpiPort.CURRENTJOB_INVALID.
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
     * On failure, throws an exception or returns YSpiPort.STARTUPJOB_INVALID.
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
     * On failure, throws an exception or returns YSpiPort.JOBMAXTASK_INVALID.
     */
    get_jobMaxTask(): Promise<number>;
    /**
     * Returns maximum size allowed for job files.
     *
     * @return an integer corresponding to maximum size allowed for job files
     *
     * On failure, throws an exception or returns YSpiPort.JOBMAXSIZE_INVALID.
     */
    get_jobMaxSize(): Promise<number>;
    get_command(): Promise<string>;
    set_command(newval: string): Promise<number>;
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
    get_protocol(): Promise<string>;
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
    set_protocol(newval: string): Promise<number>;
    /**
     * Returns the voltage level used on the serial line.
     *
     * @return a value among YSpiPort.VOLTAGELEVEL_OFF, YSpiPort.VOLTAGELEVEL_TTL3V,
     * YSpiPort.VOLTAGELEVEL_TTL3VR, YSpiPort.VOLTAGELEVEL_TTL5V, YSpiPort.VOLTAGELEVEL_TTL5VR,
     * YSpiPort.VOLTAGELEVEL_RS232, YSpiPort.VOLTAGELEVEL_RS485 and YSpiPort.VOLTAGELEVEL_TTL1V8
     * corresponding to the voltage level used on the serial line
     *
     * On failure, throws an exception or returns YSpiPort.VOLTAGELEVEL_INVALID.
     */
    get_voltageLevel(): Promise<YSpiPort.VOLTAGELEVEL>;
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
     * YSpiPort.VOLTAGELEVEL_RS232, YSpiPort.VOLTAGELEVEL_RS485 and YSpiPort.VOLTAGELEVEL_TTL1V8
     * corresponding to the voltage type used on the serial line
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_voltageLevel(newval: YSpiPort.VOLTAGELEVEL): Promise<number>;
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
    get_spiMode(): Promise<string>;
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
    set_spiMode(newval: string): Promise<number>;
    /**
     * Returns the SS line polarity.
     *
     * @return either YSpiPort.SSPOLARITY_ACTIVE_LOW or YSpiPort.SSPOLARITY_ACTIVE_HIGH, according to the
     * SS line polarity
     *
     * On failure, throws an exception or returns YSpiPort.SSPOLARITY_INVALID.
     */
    get_ssPolarity(): Promise<YSpiPort.SSPOLARITY>;
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
    set_ssPolarity(newval: YSpiPort.SSPOLARITY): Promise<number>;
    /**
     * Returns true when the SDI line phase is shifted with regards to the SDO line.
     *
     * @return either YSpiPort.SHIFTSAMPLING_OFF or YSpiPort.SHIFTSAMPLING_ON, according to true when the
     * SDI line phase is shifted with regards to the SDO line
     *
     * On failure, throws an exception or returns YSpiPort.SHIFTSAMPLING_INVALID.
     */
    get_shiftSampling(): Promise<YSpiPort.SHIFTSAMPLING>;
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
    set_shiftSampling(newval: YSpiPort.SHIFTSAMPLING): Promise<number>;
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
    static FindSpiPort(func: string): YSpiPort;
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
    static FindSpiPortInContext(yctx: YAPIContext, func: string): YSpiPort;
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
    registerValueCallback(callback: YSpiPort.ValueCallback | null): Promise<number>;
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
     * Sends a single byte to the serial port.
     *
     * @param code : the byte to send
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    writeByte(code: number): Promise<number>;
    /**
     * Sends an ASCII string to the serial port, as is.
     *
     * @param text : the text string to send
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    writeStr(text: string): Promise<number>;
    /**
     * Sends a binary buffer to the serial port, as is.
     *
     * @param buff : the binary buffer to send
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    writeBin(buff: Uint8Array): Promise<number>;
    /**
     * Sends a byte sequence (provided as a list of bytes) to the serial port.
     *
     * @param byteList : a list of byte codes
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    writeArray(byteList: number[]): Promise<number>;
    /**
     * Sends a byte sequence (provided as a hexadecimal string) to the serial port.
     *
     * @param hexString : a string of hexadecimal byte codes
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    writeHex(hexString: string): Promise<number>;
    /**
     * Sends an ASCII string to the serial port, followed by a line break (CR LF).
     *
     * @param text : the text string to send
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    writeLine(text: string): Promise<number>;
    /**
     * Reads one byte from the receive buffer, starting at current stream position.
     * If data at current stream position is not available anymore in the receive buffer,
     * or if there is no data available yet, the function returns YAPI.NO_MORE_DATA.
     *
     * @return the next byte
     *
     * On failure, throws an exception or returns a negative error code.
     */
    readByte(): Promise<number>;
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
    readStr(nChars: number): Promise<string>;
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
    readBin(nChars: number): Promise<Uint8Array>;
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
    readArray(nChars: number): Promise<number[]>;
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
    readHex(nBytes: number): Promise<string>;
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
    set_SS(val: number): Promise<number>;
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
    snoopMessages(maxWait: number): Promise<YSpiSnoopingRecord[]>;
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
    nextSpiPort(): YSpiPort | null;
    /**
     * Starts the enumeration of SPI ports currently accessible.
     * Use the method YSpiPort.nextSpiPort() to iterate on
     * next SPI ports.
     *
     * @return a pointer to a YSpiPort object, corresponding to
     *         the first SPI port currently online, or a null pointer
     *         if there are none.
     */
    static FirstSpiPort(): YSpiPort | null;
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
    static FirstSpiPortInContext(yctx: YAPIContext): YSpiPort | null;
}
export declare namespace YSpiPort {
    const enum VOLTAGELEVEL {
        OFF = 0,
        TTL3V = 1,
        TTL3VR = 2,
        TTL5V = 3,
        TTL5VR = 4,
        RS232 = 5,
        RS485 = 6,
        TTL1V8 = 7,
        INVALID = -1
    }
    const enum SSPOLARITY {
        ACTIVE_LOW = 0,
        ACTIVE_HIGH = 1,
        INVALID = -1
    }
    const enum SHIFTSAMPLING {
        OFF = 0,
        ON = 1,
        INVALID = -1
    }
    interface ValueCallback {
        (func: YSpiPort, value: string): void;
    }
}
