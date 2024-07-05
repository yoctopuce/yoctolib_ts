/*********************************************************************
 *
 *  $Id: svn_id $
 *
 *  Implements the high-level API for RfidReader functions
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
 * YRfidTagInfo Class: RFID tag description, used by class YRfidReader
 *
 * YRfidTagInfo objects are used to describe RFID tag attributes,
 * such as the tag type and its storage size. These objects are returned by
 * method get_tagInfo() of class YRfidReader.
 */
export declare class YRfidTagInfo {
    _tagId: string;
    _tagType: number;
    _typeStr: string;
    _size: number;
    _usable: number;
    _blksize: number;
    _fblk: number;
    _lblk: number;
    readonly IEC_15693: number;
    readonly IEC_14443: number;
    readonly IEC_14443_MIFARE_ULTRALIGHT: number;
    readonly IEC_14443_MIFARE_CLASSIC1K: number;
    readonly IEC_14443_MIFARE_CLASSIC4K: number;
    readonly IEC_14443_MIFARE_DESFIRE: number;
    readonly IEC_14443_NTAG_213: number;
    readonly IEC_14443_NTAG_215: number;
    readonly IEC_14443_NTAG_216: number;
    readonly IEC_14443_NTAG_424_DNA: number;
    static readonly IEC_15693: number;
    static readonly IEC_14443: number;
    static readonly IEC_14443_MIFARE_ULTRALIGHT: number;
    static readonly IEC_14443_MIFARE_CLASSIC1K: number;
    static readonly IEC_14443_MIFARE_CLASSIC4K: number;
    static readonly IEC_14443_MIFARE_DESFIRE: number;
    static readonly IEC_14443_NTAG_213: number;
    static readonly IEC_14443_NTAG_215: number;
    static readonly IEC_14443_NTAG_216: number;
    static readonly IEC_14443_NTAG_424_DNA: number;
    constructor();
    /**
     * Returns the RFID tag identifier.
     *
     * @return a string with the RFID tag identifier.
     */
    get_tagId(): string;
    /**
     * Returns the type of the RFID tag, as a numeric constant.
     * (IEC_14443_MIFARE_CLASSIC1K, ...).
     *
     * @return an integer corresponding to the RFID tag type
     */
    get_tagType(): number;
    /**
     * Returns the type of the RFID tag, as a string.
     *
     * @return a string corresponding to the RFID tag type
     */
    get_tagTypeStr(): string;
    /**
     * Returns the total memory size of the RFID tag, in bytes.
     *
     * @return the total memory size of the RFID tag
     */
    get_tagMemorySize(): number;
    /**
     * Returns the usable storage size of the RFID tag, in bytes.
     *
     * @return the usable storage size of the RFID tag
     */
    get_tagUsableSize(): number;
    /**
     * Returns the block size of the RFID tag, in bytes.
     *
     * @return the block size of the RFID tag
     */
    get_tagBlockSize(): number;
    /**
     * Returns the index of the block available for data storage on the RFID tag.
     * Some tags have special block used to configure the tag behavior, these
     * blocks must be handled with precaution. However, the  block return by
     * get_tagFirstBlock() can be locked, use get_tagLockState()
     * to find out  which block are locked.
     *
     * @return the index of the first usable storage block on the RFID tag
     */
    get_tagFirstBlock(): number;
    /**
     * Returns the index of the last last black available for data storage on the RFID tag,
     * However, this block can be locked, use get_tagLockState() to find out
     * which block are locked.
     *
     * @return the index of the last usable storage block on the RFID tag
     */
    get_tagLastBlock(): number;
    imm_init(tagId: string, tagType: number, size: number, usable: number, blksize: number, fblk: number, lblk: number): void;
}
/**
 * YRfidStatus Class: Detailled information about the result of RFID tag operations, allowing to find
 * out what happened exactly after a tag operation failure.
 *
 * YRfidStatus objects provide additional information about
 * operations on RFID tags, including the range of blocks affected
 * by read/write operations and possible errors when communicating
 * with RFID tags.
 * This makes it possible, for example, to distinguish communication
 * errors that can be recovered by an additional attempt, from
 * security or other errors on the tag.
 * Combined with the EnableDryRun option in RfidOptions,
 * this structure can be used to predict which blocks will be affected
 * by a write operation.
 */
export declare class YRfidStatus {
    _tagId: string;
    _errCode: number;
    _errBlk: number;
    _errMsg: string;
    _yapierr: number;
    _fab: number;
    _lab: number;
    readonly SUCCESS: number;
    readonly COMMAND_NOT_SUPPORTED: number;
    readonly COMMAND_NOT_RECOGNIZED: number;
    readonly COMMAND_OPTION_NOT_RECOGNIZED: number;
    readonly COMMAND_CANNOT_BE_PROCESSED_IN_TIME: number;
    readonly UNDOCUMENTED_ERROR: number;
    readonly BLOCK_NOT_AVAILABLE: number;
    readonly BLOCK_ALREADY_LOCKED: number;
    readonly BLOCK_LOCKED: number;
    readonly BLOCK_NOT_SUCESSFULLY_PROGRAMMED: number;
    readonly BLOCK_NOT_SUCESSFULLY_LOCKED: number;
    readonly BLOCK_IS_PROTECTED: number;
    readonly CRYPTOGRAPHIC_ERROR: number;
    readonly READER_BUSY: number;
    readonly TAG_NOTFOUND: number;
    readonly TAG_LEFT: number;
    readonly TAG_JUSTLEFT: number;
    readonly TAG_COMMUNICATION_ERROR: number;
    readonly TAG_NOT_RESPONDING: number;
    readonly TIMEOUT_ERROR: number;
    readonly COLLISION_DETECTED: number;
    readonly INVALID_CMD_ARGUMENTS: number;
    readonly UNKNOWN_CAPABILITIES: number;
    readonly MEMORY_NOT_SUPPORTED: number;
    readonly INVALID_BLOCK_INDEX: number;
    readonly MEM_SPACE_UNVERRUN_ATTEMPT: number;
    readonly BROWNOUT_DETECTED: number;
    readonly BUFFER_OVERFLOW: number;
    readonly CRC_ERROR: number;
    readonly COMMAND_RECEIVE_TIMEOUT: number;
    readonly DID_NOT_SLEEP: number;
    readonly ERROR_DECIMAL_EXPECTED: number;
    readonly HARDWARE_FAILURE: number;
    readonly ERROR_HEX_EXPECTED: number;
    readonly FIFO_LENGTH_ERROR: number;
    readonly FRAMING_ERROR: number;
    readonly NOT_IN_CNR_MODE: number;
    readonly NUMBER_OU_OF_RANGE: number;
    readonly NOT_SUPPORTED: number;
    readonly NO_RF_FIELD_ACTIVE: number;
    readonly READ_DATA_LENGTH_ERROR: number;
    readonly WATCHDOG_RESET: number;
    readonly UNKNOW_COMMAND: number;
    readonly UNKNOW_ERROR: number;
    readonly UNKNOW_PARAMETER: number;
    readonly UART_RECEIVE_ERROR: number;
    readonly WRONG_DATA_LENGTH: number;
    readonly WRONG_MODE: number;
    readonly UNKNOWN_DWARFxx_ERROR_CODE: number;
    readonly RESPONSE_SHORT: number;
    readonly UNEXPECTED_TAG_ID_IN_RESPONSE: number;
    readonly UNEXPECTED_TAG_INDEX: number;
    readonly READ_EOF: number;
    readonly READ_OK_SOFAR: number;
    readonly WRITE_DATA_MISSING: number;
    readonly WRITE_TOO_MUCH_DATA: number;
    readonly TRANSFER_CLOSED: number;
    readonly COULD_NOT_BUILD_REQUEST: number;
    readonly INVALID_OPTIONS: number;
    readonly UNEXPECTED_RESPONSE: number;
    readonly AFI_NOT_AVAILABLE: number;
    readonly DSFID_NOT_AVAILABLE: number;
    readonly TAG_RESPONSE_TOO_SHORT: number;
    readonly DEC_EXPECTED: number;
    readonly HEX_EXPECTED: number;
    readonly NOT_SAME_SECOR: number;
    readonly MIFARE_AUTHENTICATED: number;
    readonly NO_DATABLOCK: number;
    readonly KEYB_IS_READABLE: number;
    readonly OPERATION_NOT_EXECUTED: number;
    readonly BLOK_MODE_ERROR: number;
    readonly BLOCK_NOT_WRITABLE: number;
    readonly BLOCK_ACCESS_ERROR: number;
    readonly BLOCK_NOT_AUTHENTICATED: number;
    readonly ACCESS_KEY_BIT_NOT_WRITABLE: number;
    readonly USE_KEYA_FOR_AUTH: number;
    readonly USE_KEYB_FOR_AUTH: number;
    readonly KEY_NOT_CHANGEABLE: number;
    readonly BLOCK_TOO_HIGH: number;
    readonly AUTH_ERR: number;
    readonly NOKEY_SELECT: number;
    readonly CARD_NOT_SELECTED: number;
    readonly BLOCK_TO_READ_NONE: number;
    readonly NO_TAG: number;
    readonly TOO_MUCH_DATA: number;
    readonly CON_NOT_SATISFIED: number;
    readonly BLOCK_IS_SPECIAL: number;
    readonly READ_BEYOND_ANNOUNCED_SIZE: number;
    readonly BLOCK_ZERO_IS_RESERVED: number;
    readonly VALUE_BLOCK_BAD_FORMAT: number;
    readonly ISO15693_ONLY_FEATURE: number;
    readonly ISO14443_ONLY_FEATURE: number;
    readonly MIFARE_CLASSIC_ONLY_FEATURE: number;
    readonly BLOCK_MIGHT_BE_PROTECTED: number;
    readonly NO_SUCH_BLOCK: number;
    readonly COUNT_TOO_BIG: number;
    readonly UNKNOWN_MEM_SIZE: number;
    readonly MORE_THAN_2BLOCKS_MIGHT_NOT_WORK: number;
    readonly READWRITE_NOT_SUPPORTED: number;
    readonly UNEXPECTED_VICC_ID_IN_RESPONSE: number;
    readonly LOCKBLOCK_NOT_SUPPORTED: number;
    readonly INTERNAL_ERROR_SHOULD_NEVER_HAPPEN: number;
    readonly INVLD_BLOCK_MODE_COMBINATION: number;
    readonly INVLD_ACCESS_MODE_COMBINATION: number;
    readonly INVALID_SIZE: number;
    readonly BAD_PASSWORD_FORMAT: number;
    readonly RADIO_IS_OFF: number;
    static readonly SUCCESS: number;
    static readonly COMMAND_NOT_SUPPORTED: number;
    static readonly COMMAND_NOT_RECOGNIZED: number;
    static readonly COMMAND_OPTION_NOT_RECOGNIZED: number;
    static readonly COMMAND_CANNOT_BE_PROCESSED_IN_TIME: number;
    static readonly UNDOCUMENTED_ERROR: number;
    static readonly BLOCK_NOT_AVAILABLE: number;
    static readonly BLOCK_ALREADY_LOCKED: number;
    static readonly BLOCK_LOCKED: number;
    static readonly BLOCK_NOT_SUCESSFULLY_PROGRAMMED: number;
    static readonly BLOCK_NOT_SUCESSFULLY_LOCKED: number;
    static readonly BLOCK_IS_PROTECTED: number;
    static readonly CRYPTOGRAPHIC_ERROR: number;
    static readonly READER_BUSY: number;
    static readonly TAG_NOTFOUND: number;
    static readonly TAG_LEFT: number;
    static readonly TAG_JUSTLEFT: number;
    static readonly TAG_COMMUNICATION_ERROR: number;
    static readonly TAG_NOT_RESPONDING: number;
    static readonly TIMEOUT_ERROR: number;
    static readonly COLLISION_DETECTED: number;
    static readonly INVALID_CMD_ARGUMENTS: number;
    static readonly UNKNOWN_CAPABILITIES: number;
    static readonly MEMORY_NOT_SUPPORTED: number;
    static readonly INVALID_BLOCK_INDEX: number;
    static readonly MEM_SPACE_UNVERRUN_ATTEMPT: number;
    static readonly BROWNOUT_DETECTED: number;
    static readonly BUFFER_OVERFLOW: number;
    static readonly CRC_ERROR: number;
    static readonly COMMAND_RECEIVE_TIMEOUT: number;
    static readonly DID_NOT_SLEEP: number;
    static readonly ERROR_DECIMAL_EXPECTED: number;
    static readonly HARDWARE_FAILURE: number;
    static readonly ERROR_HEX_EXPECTED: number;
    static readonly FIFO_LENGTH_ERROR: number;
    static readonly FRAMING_ERROR: number;
    static readonly NOT_IN_CNR_MODE: number;
    static readonly NUMBER_OU_OF_RANGE: number;
    static readonly NOT_SUPPORTED: number;
    static readonly NO_RF_FIELD_ACTIVE: number;
    static readonly READ_DATA_LENGTH_ERROR: number;
    static readonly WATCHDOG_RESET: number;
    static readonly UNKNOW_COMMAND: number;
    static readonly UNKNOW_ERROR: number;
    static readonly UNKNOW_PARAMETER: number;
    static readonly UART_RECEIVE_ERROR: number;
    static readonly WRONG_DATA_LENGTH: number;
    static readonly WRONG_MODE: number;
    static readonly UNKNOWN_DWARFxx_ERROR_CODE: number;
    static readonly RESPONSE_SHORT: number;
    static readonly UNEXPECTED_TAG_ID_IN_RESPONSE: number;
    static readonly UNEXPECTED_TAG_INDEX: number;
    static readonly READ_EOF: number;
    static readonly READ_OK_SOFAR: number;
    static readonly WRITE_DATA_MISSING: number;
    static readonly WRITE_TOO_MUCH_DATA: number;
    static readonly TRANSFER_CLOSED: number;
    static readonly COULD_NOT_BUILD_REQUEST: number;
    static readonly INVALID_OPTIONS: number;
    static readonly UNEXPECTED_RESPONSE: number;
    static readonly AFI_NOT_AVAILABLE: number;
    static readonly DSFID_NOT_AVAILABLE: number;
    static readonly TAG_RESPONSE_TOO_SHORT: number;
    static readonly DEC_EXPECTED: number;
    static readonly HEX_EXPECTED: number;
    static readonly NOT_SAME_SECOR: number;
    static readonly MIFARE_AUTHENTICATED: number;
    static readonly NO_DATABLOCK: number;
    static readonly KEYB_IS_READABLE: number;
    static readonly OPERATION_NOT_EXECUTED: number;
    static readonly BLOK_MODE_ERROR: number;
    static readonly BLOCK_NOT_WRITABLE: number;
    static readonly BLOCK_ACCESS_ERROR: number;
    static readonly BLOCK_NOT_AUTHENTICATED: number;
    static readonly ACCESS_KEY_BIT_NOT_WRITABLE: number;
    static readonly USE_KEYA_FOR_AUTH: number;
    static readonly USE_KEYB_FOR_AUTH: number;
    static readonly KEY_NOT_CHANGEABLE: number;
    static readonly BLOCK_TOO_HIGH: number;
    static readonly AUTH_ERR: number;
    static readonly NOKEY_SELECT: number;
    static readonly CARD_NOT_SELECTED: number;
    static readonly BLOCK_TO_READ_NONE: number;
    static readonly NO_TAG: number;
    static readonly TOO_MUCH_DATA: number;
    static readonly CON_NOT_SATISFIED: number;
    static readonly BLOCK_IS_SPECIAL: number;
    static readonly READ_BEYOND_ANNOUNCED_SIZE: number;
    static readonly BLOCK_ZERO_IS_RESERVED: number;
    static readonly VALUE_BLOCK_BAD_FORMAT: number;
    static readonly ISO15693_ONLY_FEATURE: number;
    static readonly ISO14443_ONLY_FEATURE: number;
    static readonly MIFARE_CLASSIC_ONLY_FEATURE: number;
    static readonly BLOCK_MIGHT_BE_PROTECTED: number;
    static readonly NO_SUCH_BLOCK: number;
    static readonly COUNT_TOO_BIG: number;
    static readonly UNKNOWN_MEM_SIZE: number;
    static readonly MORE_THAN_2BLOCKS_MIGHT_NOT_WORK: number;
    static readonly READWRITE_NOT_SUPPORTED: number;
    static readonly UNEXPECTED_VICC_ID_IN_RESPONSE: number;
    static readonly LOCKBLOCK_NOT_SUPPORTED: number;
    static readonly INTERNAL_ERROR_SHOULD_NEVER_HAPPEN: number;
    static readonly INVLD_BLOCK_MODE_COMBINATION: number;
    static readonly INVLD_ACCESS_MODE_COMBINATION: number;
    static readonly INVALID_SIZE: number;
    static readonly BAD_PASSWORD_FORMAT: number;
    static readonly RADIO_IS_OFF: number;
    constructor();
    /**
     * Returns RFID tag identifier related to the status.
     *
     * @return a string with the RFID tag identifier.
     */
    get_tagId(): string;
    /**
     * Returns the detailled error code, or 0 if no error happened.
     *
     * @return a numeric error code
     */
    get_errorCode(): number;
    /**
     * Returns the RFID tag memory block number where the error was encountered, or -1 if the
     * error is not specific to a memory block.
     *
     * @return an RFID tag block number
     */
    get_errorBlock(): number;
    /**
     * Returns a string describing precisely the RFID commande result.
     *
     * @return an error message string
     */
    get_errorMessage(): string;
    get_yapiError(): number;
    /**
     * Returns the block number of the first RFID tag memory block affected
     * by the operation. Depending on the type of operation and on the tag
     * memory granularity, this number may be smaller than the requested
     * memory block index.
     *
     * @return an RFID tag block number
     */
    get_firstAffectedBlock(): number;
    /**
     * Returns the block number of the last RFID tag memory block affected
     * by the operation. Depending on the type of operation and on the tag
     * memory granularity, this number may be bigger than the requested
     * memory block index.
     *
     * @return an RFID tag block number
     */
    get_lastAffectedBlock(): number;
    imm_init(tagId: string, errCode: number, errBlk: number, fab: number, lab: number): void;
}
/**
 * YRfidOptions Class: Additional parameters for operations on RFID tags.
 *
 * The YRfidOptions objects are used to specify additional
 * optional parameters to RFID commands that interact with tags,
 * including security keys. When instantiated,the parameters of
 * this object are pre-initialized to a value  which corresponds
 * to the most common usage.
 */
export declare class YRfidOptions {
    /**
     * Type of security key to be used to access the RFID tag.
     * For MIFARE Classic tags, allowed values are
     * Y_MIFARE_KEY_A or Y_MIFARE_KEY_B.
     * The default value is Y_NO_RFID_KEY, in that case
     * the reader will use the most common default key for the
     * tag type.
     * When a security key is required, it must be provided
     * using property HexKey.
     */
    KeyType: number;
    /**
     * Security key to be used to access the RFID tag, as an
     * hexadecimal string. The key will only be used if you
     * also specify which type of key it is, using property
     * KeyType.
     */
    HexKey: string;
    /**
     * Forces the use of single-block commands to access RFID tag memory blocks.
     * By default, the Yoctopuce library uses the most efficient access strategy
     * generally available for each tag type, but you can force the use of
     * single-block commands if the RFID tags you are using do not support
     * multi-block commands. If opération speed is not a priority, choose
     * single-block mode as it will work with any mode.
     */
    ForceSingleBlockAccess: boolean;
    /**
     * Forces the use of multi-block commands to access RFID tag memory blocks.
     * By default, the Yoctopuce library uses the most efficient access strategy
     * generally available for each tag type, but you can force the use of
     * multi-block commands if you know for sure that the RFID tags you are using
     * do support multi-block commands. Be  aware that even if a tag allows multi-block
     * operations, the maximum number of blocks that can be written or read at the same
     * time can be (very) limited. If the tag does not support multi-block mode
     * for the wanted opération, the option will be ignored.
     */
    ForceMultiBlockAccess: boolean;
    /**
     * Enables direct access to RFID tag control blocks.
     * By default, Yoctopuce library read and write functions only work
     * on data blocks and automatically skip special blocks, as specific functions are provided
     * to configure security parameters found in control blocks.
     * If you need to access control blocks in your own way using
     * read/write functions, enable this option.  Use this option wisely,
     * as overwriting a special block migth very well irreversibly alter your
     * tag behavior.
     */
    EnableRawAccess: boolean;
    /**
     * Disables the tag memory overflow test. By default, the Yoctopuce
     * library's read/write functions detect overruns and do not run
     * commands that are likely to fail. If you nevertheless wish to
     * try to access more memory than the tag announces, you can try to use
     * this option.
     */
    DisableBoundaryChecks: boolean;
    /**
     * Enables simulation mode to check the affected block range as well
     * as access rights. When this option is active, the operation is
     * not fully applied to the RFID tag but the affected block range
     * is determined and the optional access key is tested on these blocks.
     * The access key rights are not tested though. This option applies to
     * write / configure operations only, it is ignored for read operations.
     */
    EnableDryRun: boolean;
    readonly NO_RFID_KEY: number;
    readonly MIFARE_KEY_A: number;
    readonly MIFARE_KEY_B: number;
    static readonly NO_RFID_KEY: number;
    static readonly MIFARE_KEY_A: number;
    static readonly MIFARE_KEY_B: number;
    constructor();
    imm_getParams(): string;
}
/**
 * YRfidReader Class: RfidReader function interface
 *
 * The YRfidReader class allows you to detect RFID tags, as well as
 * read and write on these tags if the security settings allow it.
 *
 * Short reminder:
 *
 * - A tag's memory is generally organized in fixed-size blocks.
 * - At tag level, each block must be read and written in its entirety.
 * - Some blocks are special configuration blocks, and may alter the tag's behavior
 * if they are rewritten with arbitrary data.
 * - Data blocks can be set to read-only mode, but on many tags, this operation is irreversible.
 *
 *
 * By default, the RfidReader class automatically manages these blocks so that
 * arbitrary size data  can be manipulated of  without risk and without knowledge of
 * tag architecture.
 */
export declare class YRfidReader extends YFunction {
    _className: string;
    _nTags: number;
    _refreshRate: number;
    _valueCallbackRfidReader: YRfidReader.ValueCallback | null;
    _eventCallback: YRfidReader.EventCallback | null;
    _isFirstCb: boolean;
    _prevCbPos: number;
    _eventPos: number;
    _eventStamp: number;
    readonly NTAGS_INVALID: number;
    readonly REFRESHRATE_INVALID: number;
    static readonly NTAGS_INVALID: number;
    static readonly REFRESHRATE_INVALID: number;
    constructor(yapi: YAPIContext, func: string);
    imm_parseAttr(name: string, val: any): number;
    _internalEventCallback(YRfidReader_obj: YRfidReader, str_value: string): Promise<void>;
    /**
     * Returns the number of RFID tags currently detected.
     *
     * @return an integer corresponding to the number of RFID tags currently detected
     *
     * On failure, throws an exception or returns YRfidReader.NTAGS_INVALID.
     */
    get_nTags(): Promise<number>;
    /**
     * Returns the tag list refresh rate, measured in Hz.
     *
     * @return an integer corresponding to the tag list refresh rate, measured in Hz
     *
     * On failure, throws an exception or returns YRfidReader.REFRESHRATE_INVALID.
     */
    get_refreshRate(): Promise<number>;
    /**
     * Changes the present tag list refresh rate, measured in Hz. The reader will do
     * its best to respect it. Note that the reader cannot detect tag arrival or removal
     * while it is  communicating with a tag.  Maximum frequency is limited to 100Hz,
     * but in real life it will be difficult to do better than 50Hz.  A zero value
     * will power off the device radio.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : an integer corresponding to the present tag list refresh rate, measured in Hz
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_refreshRate(newval: number): Promise<number>;
    /**
     * Retrieves a RFID reader for a given identifier.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the RFID reader is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YRfidReader.isOnline() to test if the RFID reader is
     * indeed online at a given time. In case of ambiguity when looking for
     * a RFID reader by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the RFID reader, for instance
     *         MyDevice.rfidReader.
     *
     * @return a YRfidReader object allowing you to drive the RFID reader.
     */
    static FindRfidReader(func: string): YRfidReader;
    /**
     * Retrieves a RFID reader for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the RFID reader is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YRfidReader.isOnline() to test if the RFID reader is
     * indeed online at a given time. In case of ambiguity when looking for
     * a RFID reader by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx : a YAPI context
     * @param func : a string that uniquely characterizes the RFID reader, for instance
     *         MyDevice.rfidReader.
     *
     * @return a YRfidReader object allowing you to drive the RFID reader.
     */
    static FindRfidReaderInContext(yctx: YAPIContext, func: string): YRfidReader;
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
    registerValueCallback(callback: YRfidReader.ValueCallback | null): Promise<number>;
    _invokeValueCallback(value: string): Promise<number>;
    _chkerror(tagId: string, json: Uint8Array, status: YRfidStatus): Promise<number>;
    reset(): Promise<number>;
    /**
     * Returns the list of RFID tags currently detected by the reader.
     *
     * @return a list of strings, corresponding to each tag identifier (UID).
     *
     * On failure, throws an exception or returns an empty list.
     */
    get_tagIdList(): Promise<string[]>;
    /**
     * Returns a description of the properties of an existing RFID tag.
     * This function can cause communications with the tag.
     *
     * @param tagId : identifier of the tag to check
     * @param status : an RfidStatus object that will contain
     *         the detailled status of the operation
     *
     * @return a YRfidTagInfo object.
     *
     * On failure, throws an exception or returns an empty YRfidTagInfo objact.
     * When it happens, you can get more information from the status object.
     */
    get_tagInfo(tagId: string, status: YRfidStatus): Promise<YRfidTagInfo>;
    /**
     * Changes an RFID tag configuration to prevents any further write to
     * the selected blocks. This operation is definitive and irreversible.
     * Depending on the tag type and block index, adjascent blocks may become
     * read-only as well, based on the locking granularity.
     *
     * @param tagId : identifier of the tag to use
     * @param firstBlock : first block to lock
     * @param nBlocks : number of blocks to lock
     * @param options : an YRfidOptions object with the optional
     *         command execution parameters, such as security key
     *         if required
     * @param status : an RfidStatus object that will contain
     *         the detailled status of the operation
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code. When it
     * happens, you can get more information from the status object.
     */
    tagLockBlocks(tagId: string, firstBlock: number, nBlocks: number, options: YRfidOptions, status: YRfidStatus): Promise<number>;
    /**
     * Reads the locked state for RFID tag memory data blocks.
     * FirstBlock cannot be a special block, and any special
     * block encountered in the middle of the read operation will be
     * skipped automatically.
     *
     * @param tagId : identifier of the tag to use
     * @param firstBlock : number of the first block to check
     * @param nBlocks : number of blocks to check
     * @param options : an YRfidOptions object with the optional
     *         command execution parameters, such as security key
     *         if required
     * @param status : an RfidStatus object that will contain
     *         the detailled status of the operation
     *
     * @return a list of booleans with the lock state of selected blocks
     *
     * On failure, throws an exception or returns an empty list. When it
     * happens, you can get more information from the status object.
     */
    get_tagLockState(tagId: string, firstBlock: number, nBlocks: number, options: YRfidOptions, status: YRfidStatus): Promise<boolean[]>;
    /**
     * Tells which block of a RFID tag memory are special and cannot be used
     * to store user data. Mistakely writing a special block can lead to
     * an irreversible alteration of the tag.
     *
     * @param tagId : identifier of the tag to use
     * @param firstBlock : number of the first block to check
     * @param nBlocks : number of blocks to check
     * @param options : an YRfidOptions object with the optional
     *         command execution parameters, such as security key
     *         if required
     * @param status : an RfidStatus object that will contain
     *         the detailled status of the operation
     *
     * @return a list of booleans with the lock state of selected blocks
     *
     * On failure, throws an exception or returns an empty list. When it
     * happens, you can get more information from the status object.
     */
    get_tagSpecialBlocks(tagId: string, firstBlock: number, nBlocks: number, options: YRfidOptions, status: YRfidStatus): Promise<boolean[]>;
    /**
     * Reads data from an RFID tag memory, as an hexadecimal string.
     * The read operation may span accross multiple blocks if the requested
     * number of bytes is larger than the RFID tag block size. By default
     * firstBlock cannot be a special block, and any special block encountered
     * in the middle of the read operation will be skipped automatically.
     * If you rather want to read special blocks, use the EnableRawAccess
     * field from the options parameter.
     *
     * @param tagId : identifier of the tag to use
     * @param firstBlock : block number where read should start
     * @param nBytes : total number of bytes to read
     * @param options : an YRfidOptions object with the optional
     *         command execution parameters, such as security key
     *         if required
     * @param status : an RfidStatus object that will contain
     *         the detailled status of the operation
     *
     * @return an hexadecimal string if the call succeeds.
     *
     * On failure, throws an exception or returns an empty binary buffer. When it
     * happens, you can get more information from the status object.
     */
    tagReadHex(tagId: string, firstBlock: number, nBytes: number, options: YRfidOptions, status: YRfidStatus): Promise<string>;
    /**
     * Reads data from an RFID tag memory, as a binary buffer. The read operation
     * may span accross multiple blocks if the requested number of bytes
     * is larger than the RFID tag block size.  By default
     * firstBlock cannot be a special block, and any special block encountered
     * in the middle of the read operation will be skipped automatically.
     * If you rather want to read special blocks, use the EnableRawAccess
     * field frrm the options parameter.
     *
     * @param tagId : identifier of the tag to use
     * @param firstBlock : block number where read should start
     * @param nBytes : total number of bytes to read
     * @param options : an YRfidOptions object with the optional
     *         command execution parameters, such as security key
     *         if required
     * @param status : an RfidStatus object that will contain
     *         the detailled status of the operation
     *
     * @return a binary object with the data read if the call succeeds.
     *
     * On failure, throws an exception or returns an empty binary buffer. When it
     * happens, you can get more information from the status object.
     */
    tagReadBin(tagId: string, firstBlock: number, nBytes: number, options: YRfidOptions, status: YRfidStatus): Promise<Uint8Array>;
    /**
     * Reads data from an RFID tag memory, as a byte list. The read operation
     * may span accross multiple blocks if the requested number of bytes
     * is larger than the RFID tag block size.  By default
     * firstBlock cannot be a special block, and any special block encountered
     * in the middle of the read operation will be skipped automatically.
     * If you rather want to read special blocks, use the EnableRawAccess
     * field from the options parameter.
     *
     * @param tagId : identifier of the tag to use
     * @param firstBlock : block number where read should start
     * @param nBytes : total number of bytes to read
     * @param options : an YRfidOptions object with the optional
     *         command execution parameters, such as security key
     *         if required
     * @param status : an RfidStatus object that will contain
     *         the detailled status of the operation
     *
     * @return a byte list with the data read if the call succeeds.
     *
     * On failure, throws an exception or returns an empty list. When it
     * happens, you can get more information from the status object.
     */
    tagReadArray(tagId: string, firstBlock: number, nBytes: number, options: YRfidOptions, status: YRfidStatus): Promise<number[]>;
    /**
     * Reads data from an RFID tag memory, as a text string. The read operation
     * may span accross multiple blocks if the requested number of bytes
     * is larger than the RFID tag block size.  By default
     * firstBlock cannot be a special block, and any special block encountered
     * in the middle of the read operation will be skipped automatically.
     * If you rather want to read special blocks, use the EnableRawAccess
     * field from the options parameter.
     *
     * @param tagId : identifier of the tag to use
     * @param firstBlock : block number where read should start
     * @param nChars : total number of characters to read
     * @param options : an YRfidOptions object with the optional
     *         command execution parameters, such as security key
     *         if required
     * @param status : an RfidStatus object that will contain
     *         the detailled status of the operation
     *
     * @return a text string with the data read if the call succeeds.
     *
     * On failure, throws an exception or returns an empty string. When it
     * happens, you can get more information from the status object.
     */
    tagReadStr(tagId: string, firstBlock: number, nChars: number, options: YRfidOptions, status: YRfidStatus): Promise<string>;
    /**
     * Writes data provided as a binary buffer to an RFID tag memory.
     * The write operation may span accross multiple blocks if the
     * number of bytes to write is larger than the RFID tag block size.
     * By default firstBlock cannot be a special block, and any special block
     * encountered in the middle of the write operation will be skipped
     * automatically. The last data block affected by the operation will
     * be automatically padded with zeros if neccessary.  If you rather want
     * to rewrite special blocks as well,
     * use the EnableRawAccess field from the options parameter.
     *
     * @param tagId : identifier of the tag to use
     * @param firstBlock : block number where write should start
     * @param buff : the binary buffer to write
     * @param options : an YRfidOptions object with the optional
     *         command execution parameters, such as security key
     *         if required
     * @param status : an RfidStatus object that will contain
     *         the detailled status of the operation
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code. When it
     * happens, you can get more information from the status object.
     */
    tagWriteBin(tagId: string, firstBlock: number, buff: Uint8Array, options: YRfidOptions, status: YRfidStatus): Promise<number>;
    /**
     * Writes data provided as a list of bytes to an RFID tag memory.
     * The write operation may span accross multiple blocks if the
     * number of bytes to write is larger than the RFID tag block size.
     * By default firstBlock cannot be a special block, and any special block
     * encountered in the middle of the write operation will be skipped
     * automatically. The last data block affected by the operation will
     * be automatically padded with zeros if neccessary.
     * If you rather want to rewrite special blocks as well,
     * use the EnableRawAccess field from the options parameter.
     *
     * @param tagId : identifier of the tag to use
     * @param firstBlock : block number where write should start
     * @param byteList : a list of byte to write
     * @param options : an YRfidOptions object with the optional
     *         command execution parameters, such as security key
     *         if required
     * @param status : an RfidStatus object that will contain
     *         the detailled status of the operation
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code. When it
     * happens, you can get more information from the status object.
     */
    tagWriteArray(tagId: string, firstBlock: number, byteList: number[], options: YRfidOptions, status: YRfidStatus): Promise<number>;
    /**
     * Writes data provided as an hexadecimal string to an RFID tag memory.
     * The write operation may span accross multiple blocks if the
     * number of bytes to write is larger than the RFID tag block size.
     * By default firstBlock cannot be a special block, and any special block
     * encountered in the middle of the write operation will be skipped
     * automatically. The last data block affected by the operation will
     * be automatically padded with zeros if neccessary.
     * If you rather want to rewrite special blocks as well,
     * use the EnableRawAccess field from the options parameter.
     *
     * @param tagId : identifier of the tag to use
     * @param firstBlock : block number where write should start
     * @param hexString : a string of hexadecimal byte codes to write
     * @param options : an YRfidOptions object with the optional
     *         command execution parameters, such as security key
     *         if required
     * @param status : an RfidStatus object that will contain
     *         the detailled status of the operation
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code. When it
     * happens, you can get more information from the status object.
     */
    tagWriteHex(tagId: string, firstBlock: number, hexString: string, options: YRfidOptions, status: YRfidStatus): Promise<number>;
    /**
     * Writes data provided as an ASCII string to an RFID tag memory.
     * The write operation may span accross multiple blocks if the
     * number of bytes to write is larger than the RFID tag block size.
     * Note that only the characters présent  in  the provided string
     * will be written, there is no notion of string length. If your
     * string data have variable length, you'll have to encode the
     * string length yourself, with a terminal zero for instannce.
     *
     * This function only works with ISO-latin characters, if you wish to
     * write strings encoded with alternate character sets, you'll have to
     * use tagWriteBin() function.
     *
     * By default firstBlock cannot be a special block, and any special block
     * encountered in the middle of the write operation will be skipped
     * automatically. The last data block affected by the operation will
     * be automatically padded with zeros if neccessary.
     * If you rather want to rewrite special blocks as well,
     * use the EnableRawAccess field from the options parameter
     * (definitely not recommanded).
     *
     * @param tagId : identifier of the tag to use
     * @param firstBlock : block number where write should start
     * @param text : the text string to write
     * @param options : an YRfidOptions object with the optional
     *         command execution parameters, such as security key
     *         if required
     * @param status : an RfidStatus object that will contain
     *         the detailled status of the operation
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code. When it
     * happens, you can get more information from the status object.
     */
    tagWriteStr(tagId: string, firstBlock: number, text: string, options: YRfidOptions, status: YRfidStatus): Promise<number>;
    /**
     * Reads an RFID tag AFI byte (ISO 15693 only).
     *
     * @param tagId : identifier of the tag to use
     * @param options : an YRfidOptions object with the optional
     *         command execution parameters, such as security key
     *         if required
     * @param status : an RfidStatus object that will contain
     *         the detailled status of the operation
     *
     * @return the AFI value (0...255)
     *
     * On failure, throws an exception or returns a negative error code. When it
     * happens, you can get more information from the status object.
     */
    tagGetAFI(tagId: string, options: YRfidOptions, status: YRfidStatus): Promise<number>;
    /**
     * Changes an RFID tag AFI byte (ISO 15693 only).
     *
     * @param tagId : identifier of the tag to use
     * @param afi : the AFI value to write (0...255)
     * @param options : an YRfidOptions object with the optional
     *         command execution parameters, such as security key
     *         if required
     * @param status : an RfidStatus object that will contain
     *         the detailled status of the operation
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code. When it
     * happens, you can get more information from the status object.
     */
    tagSetAFI(tagId: string, afi: number, options: YRfidOptions, status: YRfidStatus): Promise<number>;
    /**
     * Locks the RFID tag AFI byte (ISO 15693 only).
     * This operation is definitive and irreversible.
     *
     * @param tagId : identifier of the tag to use
     * @param options : an YRfidOptions object with the optional
     *         command execution parameters, such as security key
     *         if required
     * @param status : an RfidStatus object that will contain
     *         the detailled status of the operation
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code. When it
     * happens, you can get more information from the status object.
     */
    tagLockAFI(tagId: string, options: YRfidOptions, status: YRfidStatus): Promise<number>;
    /**
     * Reads an RFID tag DSFID byte (ISO 15693 only).
     *
     * @param tagId : identifier of the tag to use
     * @param options : an YRfidOptions object with the optional
     *         command execution parameters, such as security key
     *         if required
     * @param status : an RfidStatus object that will contain
     *         the detailled status of the operation
     *
     * @return the DSFID value (0...255)
     *
     * On failure, throws an exception or returns a negative error code. When it
     * happens, you can get more information from the status object.
     */
    tagGetDSFID(tagId: string, options: YRfidOptions, status: YRfidStatus): Promise<number>;
    /**
     * Changes an RFID tag DSFID byte (ISO 15693 only).
     *
     * @param tagId : identifier of the tag to use
     * @param dsfid : the DSFID value to write (0...255)
     * @param options : an YRfidOptions object with the optional
     *         command execution parameters, such as security key
     *         if required
     * @param status : an RfidStatus object that will contain
     *         the detailled status of the operation
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code. When it
     * happens, you can get more information from the status object.
     */
    tagSetDSFID(tagId: string, dsfid: number, options: YRfidOptions, status: YRfidStatus): Promise<number>;
    /**
     * Locks the RFID tag DSFID byte (ISO 15693 only).
     * This operation is definitive and irreversible.
     *
     * @param tagId : identifier of the tag to use
     * @param options : an YRfidOptions object with the optional
     *         command execution parameters, such as security key
     *         if required
     * @param status : an RfidStatus object that will contain
     *         the detailled status of the operation
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code. When it
     * happens, you can get more information from the status object.
     */
    tagLockDSFID(tagId: string, options: YRfidOptions, status: YRfidStatus): Promise<number>;
    /**
     * Returns a string with last tag arrival/removal events observed.
     * This method return only events that are still buffered in the device memory.
     *
     * @return a string with last events observed (one per line).
     *
     * On failure, throws an exception or returns  YAPI.INVALID_STRING.
     */
    get_lastEvents(): Promise<string>;
    /**
     * Registers a callback function to be called each time that an RFID tag appears or
     * disappears. The callback is invoked only during the execution of
     * ySleep or yHandleEvents. This provides control over the time when
     * the callback is triggered. For good responsiveness, remember to call one of these
     * two functions periodically. To unregister a callback, pass a null pointer as argument.
     *
     * @param callback : the callback function to call, or a null pointer.
     *         The callback function should take four arguments:
     *         the YRfidReader object that emitted the event, the
     *         UTC timestamp of the event, a character string describing
     *         the type of event ("+" or "-") and a character string with the
     *         RFID tag identifier.
     *         On failure, throws an exception or returns a negative error code.
     */
    registerEventCallback(callback: YRfidReader.EventCallback | null): Promise<number>;
    _internalEventHandler(cbVal: string): Promise<number>;
    /**
     * Continues the enumeration of RFID readers started using yFirstRfidReader().
     * Caution: You can't make any assumption about the returned RFID readers order.
     * If you want to find a specific a RFID reader, use RfidReader.findRfidReader()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YRfidReader object, corresponding to
     *         a RFID reader currently online, or a null pointer
     *         if there are no more RFID readers to enumerate.
     */
    nextRfidReader(): YRfidReader | null;
    /**
     * Starts the enumeration of RFID readers currently accessible.
     * Use the method YRfidReader.nextRfidReader() to iterate on
     * next RFID readers.
     *
     * @return a pointer to a YRfidReader object, corresponding to
     *         the first RFID reader currently online, or a null pointer
     *         if there are none.
     */
    static FirstRfidReader(): YRfidReader | null;
    /**
     * Starts the enumeration of RFID readers currently accessible.
     * Use the method YRfidReader.nextRfidReader() to iterate on
     * next RFID readers.
     *
     * @param yctx : a YAPI context.
     *
     * @return a pointer to a YRfidReader object, corresponding to
     *         the first RFID reader currently online, or a null pointer
     *         if there are none.
     */
    static FirstRfidReaderInContext(yctx: YAPIContext): YRfidReader | null;
}
export declare namespace YRfidReader {
    interface ValueCallback {
        (func: YRfidReader, value: string): void;
    }
    interface EventCallback {
        (func: YRfidReader, timestampr: number, evtType: string, eventData: string): void;
    }
}
