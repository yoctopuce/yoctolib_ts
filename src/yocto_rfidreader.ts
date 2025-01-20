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

import { YAPI, YAPIContext, YErrorMsg, YFunction, YModule, YSensor, YDataLogger, YMeasure } from './yocto_api.js';

//--- (generated code: YRfidTagInfo class start)
/**
 * YRfidTagInfo Class: RFID tag description, used by class YRfidReader
 *
 * YRfidTagInfo objects are used to describe RFID tag attributes,
 * such as the tag type and its storage size. These objects are returned by
 * method get_tagInfo() of class YRfidReader.
 */
//--- (end of generated code: YRfidTagInfo class start)

export class YRfidTagInfo
{
    //--- (generated code: YRfidTagInfo attributes declaration)
    _tagId: string = '';
    _tagType: number = 0;
    _typeStr: string = '';
    _size: number = 0;
    _usable: number = 0;
    _blksize: number = 0;
    _fblk: number = 0;
    _lblk: number = 0;

    // API symbols as object properties
    public readonly IEC_15693: number = 1;
    public readonly IEC_14443: number = 2;
    public readonly IEC_14443_MIFARE_ULTRALIGHT: number = 3;
    public readonly IEC_14443_MIFARE_CLASSIC1K: number = 4;
    public readonly IEC_14443_MIFARE_CLASSIC4K: number = 5;
    public readonly IEC_14443_MIFARE_DESFIRE: number = 6;
    public readonly IEC_14443_NTAG_213: number = 7;
    public readonly IEC_14443_NTAG_215: number = 8;
    public readonly IEC_14443_NTAG_216: number = 9;
    public readonly IEC_14443_NTAG_424_DNA: number = 10;

    // API symbols as static members
    public static readonly IEC_15693: number = 1;
    public static readonly IEC_14443: number = 2;
    public static readonly IEC_14443_MIFARE_ULTRALIGHT: number = 3;
    public static readonly IEC_14443_MIFARE_CLASSIC1K: number = 4;
    public static readonly IEC_14443_MIFARE_CLASSIC4K: number = 5;
    public static readonly IEC_14443_MIFARE_DESFIRE: number = 6;
    public static readonly IEC_14443_NTAG_213: number = 7;
    public static readonly IEC_14443_NTAG_215: number = 8;
    public static readonly IEC_14443_NTAG_216: number = 9;
    public static readonly IEC_14443_NTAG_424_DNA: number = 10;
    //--- (end of generated code: YRfidTagInfo attributes declaration)

    constructor()
    {
        //--- (generated code: YRfidTagInfo constructor)
        //--- (end of generated code: YRfidTagInfo constructor)
    }

    //--- (generated code: YRfidTagInfo implementation)

    /**
     * Returns the RFID tag identifier.
     *
     * @return a string with the RFID tag identifier.
     */
    get_tagId(): string
    {
        return this._tagId;
    }

    /**
     * Returns the type of the RFID tag, as a numeric constant.
     * (IEC_14443_MIFARE_CLASSIC1K, ...).
     *
     * @return an integer corresponding to the RFID tag type
     */
    get_tagType(): number
    {
        return this._tagType;
    }

    /**
     * Returns the type of the RFID tag, as a string.
     *
     * @return a string corresponding to the RFID tag type
     */
    get_tagTypeStr(): string
    {
        return this._typeStr;
    }

    /**
     * Returns the total memory size of the RFID tag, in bytes.
     *
     * @return the total memory size of the RFID tag
     */
    get_tagMemorySize(): number
    {
        return this._size;
    }

    /**
     * Returns the usable storage size of the RFID tag, in bytes.
     *
     * @return the usable storage size of the RFID tag
     */
    get_tagUsableSize(): number
    {
        return this._usable;
    }

    /**
     * Returns the block size of the RFID tag, in bytes.
     *
     * @return the block size of the RFID tag
     */
    get_tagBlockSize(): number
    {
        return this._blksize;
    }

    /**
     * Returns the index of the block available for data storage on the RFID tag.
     * Some tags have special block used to configure the tag behavior, these
     * blocks must be handled with precaution. However, the  block return by
     * get_tagFirstBlock() can be locked, use get_tagLockState()
     * to find out  which block are locked.
     *
     * @return the index of the first usable storage block on the RFID tag
     */
    get_tagFirstBlock(): number
    {
        return this._fblk;
    }

    /**
     * Returns the index of the last last black available for data storage on the RFID tag,
     * However, this block can be locked, use get_tagLockState() to find out
     * which block are locked.
     *
     * @return the index of the last usable storage block on the RFID tag
     */
    get_tagLastBlock(): number
    {
        return this._lblk;
    }

    imm_init(tagId: string, tagType: number, size: number, usable: number, blksize: number, fblk: number, lblk: number): void
    {
        let typeStr: string;
        typeStr = 'unknown';
        if (tagType == YRfidTagInfo.IEC_15693) {
            typeStr = 'IEC 15693';
        }
        if (tagType == YRfidTagInfo.IEC_14443) {
            typeStr = 'IEC 14443';
        }
        if (tagType == YRfidTagInfo.IEC_14443_MIFARE_ULTRALIGHT) {
            typeStr = 'MIFARE Ultralight';
        }
        if (tagType == YRfidTagInfo.IEC_14443_MIFARE_CLASSIC1K) {
            typeStr = 'MIFARE Classic 1K';
        }
        if (tagType == YRfidTagInfo.IEC_14443_MIFARE_CLASSIC4K) {
            typeStr = 'MIFARE Classic 4K';
        }
        if (tagType == YRfidTagInfo.IEC_14443_MIFARE_DESFIRE) {
            typeStr = 'MIFARE DESFire';
        }
        if (tagType == YRfidTagInfo.IEC_14443_NTAG_213) {
            typeStr = 'NTAG 213';
        }
        if (tagType == YRfidTagInfo.IEC_14443_NTAG_215) {
            typeStr = 'NTAG 215';
        }
        if (tagType == YRfidTagInfo.IEC_14443_NTAG_216) {
            typeStr = 'NTAG 216';
        }
        if (tagType == YRfidTagInfo.IEC_14443_NTAG_424_DNA) {
            typeStr = 'NTAG 424 DNA';
        }
        this._tagId = tagId;
        this._tagType = tagType;
        this._typeStr = typeStr;
        this._size = size;
        this._usable = usable;
        this._blksize = blksize;
        this._fblk = fblk;
        this._lblk = lblk;
    }

    //--- (end of generated code: YRfidTagInfo implementation)
}


//--- (generated code: YRfidStatus class start)
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
//--- (end of generated code: YRfidStatus class start)

export class YRfidStatus
{
    //--- (generated code: YRfidStatus attributes declaration)
    _tagId: string = '';
    _errCode: number = 0;
    _errBlk: number = 0;
    _errMsg: string = '';
    _yapierr: number = 0;
    _fab: number = 0;
    _lab: number = 0;

    // API symbols as object properties
    public readonly SUCCESS: number = 0;
    public readonly COMMAND_NOT_SUPPORTED: number = 1;
    public readonly COMMAND_NOT_RECOGNIZED: number = 2;
    public readonly COMMAND_OPTION_NOT_RECOGNIZED: number = 3;
    public readonly COMMAND_CANNOT_BE_PROCESSED_IN_TIME: number = 4;
    public readonly UNDOCUMENTED_ERROR: number = 15;
    public readonly BLOCK_NOT_AVAILABLE: number = 16;
    public readonly BLOCK_ALREADY_LOCKED: number = 17;
    public readonly BLOCK_LOCKED: number = 18;
    public readonly BLOCK_NOT_SUCESSFULLY_PROGRAMMED: number = 19;
    public readonly BLOCK_NOT_SUCESSFULLY_LOCKED: number = 20;
    public readonly BLOCK_IS_PROTECTED: number = 21;
    public readonly CRYPTOGRAPHIC_ERROR: number = 64;
    public readonly READER_BUSY: number = 1000;
    public readonly TAG_NOTFOUND: number = 1001;
    public readonly TAG_LEFT: number = 1002;
    public readonly TAG_JUSTLEFT: number = 1003;
    public readonly TAG_COMMUNICATION_ERROR: number = 1004;
    public readonly TAG_NOT_RESPONDING: number = 1005;
    public readonly TIMEOUT_ERROR: number = 1006;
    public readonly COLLISION_DETECTED: number = 1007;
    public readonly INVALID_CMD_ARGUMENTS: number = -66;
    public readonly UNKNOWN_CAPABILITIES: number = -67;
    public readonly MEMORY_NOT_SUPPORTED: number = -68;
    public readonly INVALID_BLOCK_INDEX: number = -69;
    public readonly MEM_SPACE_UNVERRUN_ATTEMPT: number = -70;
    public readonly BROWNOUT_DETECTED: number = -71     ;
    public readonly BUFFER_OVERFLOW: number = -72;
    public readonly CRC_ERROR: number = -73;
    public readonly COMMAND_RECEIVE_TIMEOUT: number = -75;
    public readonly DID_NOT_SLEEP: number = -76;
    public readonly ERROR_DECIMAL_EXPECTED: number = -77;
    public readonly HARDWARE_FAILURE: number = -78;
    public readonly ERROR_HEX_EXPECTED: number = -79;
    public readonly FIFO_LENGTH_ERROR: number = -80;
    public readonly FRAMING_ERROR: number = -81;
    public readonly NOT_IN_CNR_MODE: number = -82;
    public readonly NUMBER_OU_OF_RANGE: number = -83;
    public readonly NOT_SUPPORTED: number = -84;
    public readonly NO_RF_FIELD_ACTIVE: number = -85;
    public readonly READ_DATA_LENGTH_ERROR: number = -86;
    public readonly WATCHDOG_RESET: number = -87;
    public readonly UNKNOW_COMMAND: number = -91;
    public readonly UNKNOW_ERROR: number = -92;
    public readonly UNKNOW_PARAMETER: number = -93;
    public readonly UART_RECEIVE_ERROR: number = -94;
    public readonly WRONG_DATA_LENGTH: number = -95;
    public readonly WRONG_MODE: number = -96;
    public readonly UNKNOWN_DWARFxx_ERROR_CODE: number = -97;
    public readonly RESPONSE_SHORT: number = -98;
    public readonly UNEXPECTED_TAG_ID_IN_RESPONSE: number = -99;
    public readonly UNEXPECTED_TAG_INDEX: number = -100;
    public readonly READ_EOF: number = -101;
    public readonly READ_OK_SOFAR: number = -102;
    public readonly WRITE_DATA_MISSING: number = -103;
    public readonly WRITE_TOO_MUCH_DATA: number = -104;
    public readonly TRANSFER_CLOSED: number = -105;
    public readonly COULD_NOT_BUILD_REQUEST: number = -106;
    public readonly INVALID_OPTIONS: number = -107;
    public readonly UNEXPECTED_RESPONSE: number = -108;
    public readonly AFI_NOT_AVAILABLE: number = -109;
    public readonly DSFID_NOT_AVAILABLE: number = -110;
    public readonly TAG_RESPONSE_TOO_SHORT: number = -111;
    public readonly DEC_EXPECTED: number = -112 ;
    public readonly HEX_EXPECTED: number = -113;
    public readonly NOT_SAME_SECOR: number = -114;
    public readonly MIFARE_AUTHENTICATED: number = -115;
    public readonly NO_DATABLOCK: number = -116;
    public readonly KEYB_IS_READABLE: number = -117;
    public readonly OPERATION_NOT_EXECUTED: number = -118;
    public readonly BLOK_MODE_ERROR: number = -119;
    public readonly BLOCK_NOT_WRITABLE: number = -120;
    public readonly BLOCK_ACCESS_ERROR: number = -121;
    public readonly BLOCK_NOT_AUTHENTICATED: number = -122;
    public readonly ACCESS_KEY_BIT_NOT_WRITABLE: number = -123;
    public readonly USE_KEYA_FOR_AUTH: number = -124;
    public readonly USE_KEYB_FOR_AUTH: number = -125;
    public readonly KEY_NOT_CHANGEABLE: number = -126;
    public readonly BLOCK_TOO_HIGH: number = -127;
    public readonly AUTH_ERR: number = -128;
    public readonly NOKEY_SELECT: number = -129;
    public readonly CARD_NOT_SELECTED: number = -130;
    public readonly BLOCK_TO_READ_NONE: number = -131;
    public readonly NO_TAG: number = -132;
    public readonly TOO_MUCH_DATA: number = -133;
    public readonly CON_NOT_SATISFIED: number = -134;
    public readonly BLOCK_IS_SPECIAL: number = -135;
    public readonly READ_BEYOND_ANNOUNCED_SIZE: number = -136;
    public readonly BLOCK_ZERO_IS_RESERVED: number = -137;
    public readonly VALUE_BLOCK_BAD_FORMAT: number = -138;
    public readonly ISO15693_ONLY_FEATURE: number = -139;
    public readonly ISO14443_ONLY_FEATURE: number = -140;
    public readonly MIFARE_CLASSIC_ONLY_FEATURE: number = -141;
    public readonly BLOCK_MIGHT_BE_PROTECTED: number = -142;
    public readonly NO_SUCH_BLOCK: number = -143;
    public readonly COUNT_TOO_BIG: number = -144;
    public readonly UNKNOWN_MEM_SIZE: number = -145;
    public readonly MORE_THAN_2BLOCKS_MIGHT_NOT_WORK: number = -146;
    public readonly READWRITE_NOT_SUPPORTED: number = -147;
    public readonly UNEXPECTED_VICC_ID_IN_RESPONSE: number = -148;
    public readonly LOCKBLOCK_NOT_SUPPORTED: number = -150;
    public readonly INTERNAL_ERROR_SHOULD_NEVER_HAPPEN: number = -151;
    public readonly INVLD_BLOCK_MODE_COMBINATION: number = -152;
    public readonly INVLD_ACCESS_MODE_COMBINATION: number = -153;
    public readonly INVALID_SIZE: number = -154;
    public readonly BAD_PASSWORD_FORMAT: number = -155;
    public readonly RADIO_IS_OFF: number = -156;

    // API symbols as static members
    public static readonly SUCCESS: number = 0;
    public static readonly COMMAND_NOT_SUPPORTED: number = 1;
    public static readonly COMMAND_NOT_RECOGNIZED: number = 2;
    public static readonly COMMAND_OPTION_NOT_RECOGNIZED: number = 3;
    public static readonly COMMAND_CANNOT_BE_PROCESSED_IN_TIME: number = 4;
    public static readonly UNDOCUMENTED_ERROR: number = 15;
    public static readonly BLOCK_NOT_AVAILABLE: number = 16;
    public static readonly BLOCK_ALREADY_LOCKED: number = 17;
    public static readonly BLOCK_LOCKED: number = 18;
    public static readonly BLOCK_NOT_SUCESSFULLY_PROGRAMMED: number = 19;
    public static readonly BLOCK_NOT_SUCESSFULLY_LOCKED: number = 20;
    public static readonly BLOCK_IS_PROTECTED: number = 21;
    public static readonly CRYPTOGRAPHIC_ERROR: number = 64;
    public static readonly READER_BUSY: number = 1000;
    public static readonly TAG_NOTFOUND: number = 1001;
    public static readonly TAG_LEFT: number = 1002;
    public static readonly TAG_JUSTLEFT: number = 1003;
    public static readonly TAG_COMMUNICATION_ERROR: number = 1004;
    public static readonly TAG_NOT_RESPONDING: number = 1005;
    public static readonly TIMEOUT_ERROR: number = 1006;
    public static readonly COLLISION_DETECTED: number = 1007;
    public static readonly INVALID_CMD_ARGUMENTS: number = -66;
    public static readonly UNKNOWN_CAPABILITIES: number = -67;
    public static readonly MEMORY_NOT_SUPPORTED: number = -68;
    public static readonly INVALID_BLOCK_INDEX: number = -69;
    public static readonly MEM_SPACE_UNVERRUN_ATTEMPT: number = -70;
    public static readonly BROWNOUT_DETECTED: number = -71     ;
    public static readonly BUFFER_OVERFLOW: number = -72;
    public static readonly CRC_ERROR: number = -73;
    public static readonly COMMAND_RECEIVE_TIMEOUT: number = -75;
    public static readonly DID_NOT_SLEEP: number = -76;
    public static readonly ERROR_DECIMAL_EXPECTED: number = -77;
    public static readonly HARDWARE_FAILURE: number = -78;
    public static readonly ERROR_HEX_EXPECTED: number = -79;
    public static readonly FIFO_LENGTH_ERROR: number = -80;
    public static readonly FRAMING_ERROR: number = -81;
    public static readonly NOT_IN_CNR_MODE: number = -82;
    public static readonly NUMBER_OU_OF_RANGE: number = -83;
    public static readonly NOT_SUPPORTED: number = -84;
    public static readonly NO_RF_FIELD_ACTIVE: number = -85;
    public static readonly READ_DATA_LENGTH_ERROR: number = -86;
    public static readonly WATCHDOG_RESET: number = -87;
    public static readonly UNKNOW_COMMAND: number = -91;
    public static readonly UNKNOW_ERROR: number = -92;
    public static readonly UNKNOW_PARAMETER: number = -93;
    public static readonly UART_RECEIVE_ERROR: number = -94;
    public static readonly WRONG_DATA_LENGTH: number = -95;
    public static readonly WRONG_MODE: number = -96;
    public static readonly UNKNOWN_DWARFxx_ERROR_CODE: number = -97;
    public static readonly RESPONSE_SHORT: number = -98;
    public static readonly UNEXPECTED_TAG_ID_IN_RESPONSE: number = -99;
    public static readonly UNEXPECTED_TAG_INDEX: number = -100;
    public static readonly READ_EOF: number = -101;
    public static readonly READ_OK_SOFAR: number = -102;
    public static readonly WRITE_DATA_MISSING: number = -103;
    public static readonly WRITE_TOO_MUCH_DATA: number = -104;
    public static readonly TRANSFER_CLOSED: number = -105;
    public static readonly COULD_NOT_BUILD_REQUEST: number = -106;
    public static readonly INVALID_OPTIONS: number = -107;
    public static readonly UNEXPECTED_RESPONSE: number = -108;
    public static readonly AFI_NOT_AVAILABLE: number = -109;
    public static readonly DSFID_NOT_AVAILABLE: number = -110;
    public static readonly TAG_RESPONSE_TOO_SHORT: number = -111;
    public static readonly DEC_EXPECTED: number = -112 ;
    public static readonly HEX_EXPECTED: number = -113;
    public static readonly NOT_SAME_SECOR: number = -114;
    public static readonly MIFARE_AUTHENTICATED: number = -115;
    public static readonly NO_DATABLOCK: number = -116;
    public static readonly KEYB_IS_READABLE: number = -117;
    public static readonly OPERATION_NOT_EXECUTED: number = -118;
    public static readonly BLOK_MODE_ERROR: number = -119;
    public static readonly BLOCK_NOT_WRITABLE: number = -120;
    public static readonly BLOCK_ACCESS_ERROR: number = -121;
    public static readonly BLOCK_NOT_AUTHENTICATED: number = -122;
    public static readonly ACCESS_KEY_BIT_NOT_WRITABLE: number = -123;
    public static readonly USE_KEYA_FOR_AUTH: number = -124;
    public static readonly USE_KEYB_FOR_AUTH: number = -125;
    public static readonly KEY_NOT_CHANGEABLE: number = -126;
    public static readonly BLOCK_TOO_HIGH: number = -127;
    public static readonly AUTH_ERR: number = -128;
    public static readonly NOKEY_SELECT: number = -129;
    public static readonly CARD_NOT_SELECTED: number = -130;
    public static readonly BLOCK_TO_READ_NONE: number = -131;
    public static readonly NO_TAG: number = -132;
    public static readonly TOO_MUCH_DATA: number = -133;
    public static readonly CON_NOT_SATISFIED: number = -134;
    public static readonly BLOCK_IS_SPECIAL: number = -135;
    public static readonly READ_BEYOND_ANNOUNCED_SIZE: number = -136;
    public static readonly BLOCK_ZERO_IS_RESERVED: number = -137;
    public static readonly VALUE_BLOCK_BAD_FORMAT: number = -138;
    public static readonly ISO15693_ONLY_FEATURE: number = -139;
    public static readonly ISO14443_ONLY_FEATURE: number = -140;
    public static readonly MIFARE_CLASSIC_ONLY_FEATURE: number = -141;
    public static readonly BLOCK_MIGHT_BE_PROTECTED: number = -142;
    public static readonly NO_SUCH_BLOCK: number = -143;
    public static readonly COUNT_TOO_BIG: number = -144;
    public static readonly UNKNOWN_MEM_SIZE: number = -145;
    public static readonly MORE_THAN_2BLOCKS_MIGHT_NOT_WORK: number = -146;
    public static readonly READWRITE_NOT_SUPPORTED: number = -147;
    public static readonly UNEXPECTED_VICC_ID_IN_RESPONSE: number = -148;
    public static readonly LOCKBLOCK_NOT_SUPPORTED: number = -150;
    public static readonly INTERNAL_ERROR_SHOULD_NEVER_HAPPEN: number = -151;
    public static readonly INVLD_BLOCK_MODE_COMBINATION: number = -152;
    public static readonly INVLD_ACCESS_MODE_COMBINATION: number = -153;
    public static readonly INVALID_SIZE: number = -154;
    public static readonly BAD_PASSWORD_FORMAT: number = -155;
    public static readonly RADIO_IS_OFF: number = -156;
    //--- (end of generated code: YRfidStatus attributes declaration)

    constructor()
    {
        //--- (generated code: YRfidStatus constructor)
        //--- (end of generated code: YRfidStatus constructor)
    }

    //--- (generated code: YRfidStatus implementation)

    /**
     * Returns RFID tag identifier related to the status.
     *
     * @return a string with the RFID tag identifier.
     */
    get_tagId(): string
    {
        return this._tagId;
    }

    /**
     * Returns the detailled error code, or 0 if no error happened.
     *
     * @return a numeric error code
     */
    get_errorCode(): number
    {
        return this._errCode;
    }

    /**
     * Returns the RFID tag memory block number where the error was encountered, or -1 if the
     * error is not specific to a memory block.
     *
     * @return an RFID tag block number
     */
    get_errorBlock(): number
    {
        return this._errBlk;
    }

    /**
     * Returns a string describing precisely the RFID commande result.
     *
     * @return an error message string
     */
    get_errorMessage(): string
    {
        return this._errMsg;
    }

    get_yapiError(): number
    {
        return this._yapierr;
    }

    /**
     * Returns the block number of the first RFID tag memory block affected
     * by the operation. Depending on the type of operation and on the tag
     * memory granularity, this number may be smaller than the requested
     * memory block index.
     *
     * @return an RFID tag block number
     */
    get_firstAffectedBlock(): number
    {
        return this._fab;
    }

    /**
     * Returns the block number of the last RFID tag memory block affected
     * by the operation. Depending on the type of operation and on the tag
     * memory granularity, this number may be bigger than the requested
     * memory block index.
     *
     * @return an RFID tag block number
     */
    get_lastAffectedBlock(): number
    {
        return this._lab;
    }

    imm_init(tagId: string, errCode: number, errBlk: number, fab: number, lab: number): void
    {
        let errMsg: string;
        if (errCode == 0) {
            this._yapierr = YAPI.SUCCESS;
            errMsg = 'Success (no error)';
        } else {
            if (errCode < 0) {
                if (errCode > -50) {
                    this._yapierr = errCode;
                    errMsg = 'YoctoLib error ' + String(Math.round(errCode));
                } else {
                    this._yapierr = YAPI.RFID_HARD_ERROR;
                    errMsg = 'Non-recoverable RFID error ' + String(Math.round(errCode));
                }
            } else {
                if (errCode > 1000) {
                    this._yapierr = YAPI.RFID_SOFT_ERROR;
                    errMsg = 'Recoverable RFID error ' + String(Math.round(errCode));
                } else {
                    this._yapierr = YAPI.RFID_HARD_ERROR;
                    errMsg = 'Non-recoverable RFID error ' + String(Math.round(errCode));
                }
            }
            if (errCode == YRfidStatus.TAG_NOTFOUND) {
                errMsg = 'Tag not found';
            }
            if (errCode == YRfidStatus.TAG_JUSTLEFT) {
                errMsg = 'Tag left during operation';
            }
            if (errCode == YRfidStatus.TAG_LEFT) {
                errMsg = 'Tag not here anymore';
            }
            if (errCode == YRfidStatus.READER_BUSY) {
                errMsg = 'Reader is busy';
            }
            if (errCode == YRfidStatus.INVALID_CMD_ARGUMENTS) {
                errMsg = 'Invalid command arguments';
            }
            if (errCode == YRfidStatus.UNKNOWN_CAPABILITIES) {
                errMsg = 'Unknown capabilities';
            }
            if (errCode == YRfidStatus.MEMORY_NOT_SUPPORTED) {
                errMsg = 'Memory no present';
            }
            if (errCode == YRfidStatus.INVALID_BLOCK_INDEX) {
                errMsg = 'Invalid block index';
            }
            if (errCode == YRfidStatus.MEM_SPACE_UNVERRUN_ATTEMPT) {
                errMsg = 'Tag memory space overrun attempt';
            }
            if (errCode == YRfidStatus.COMMAND_NOT_SUPPORTED) {
                errMsg = 'The command is not supported';
            }
            if (errCode == YRfidStatus.COMMAND_NOT_RECOGNIZED) {
                errMsg = 'The command is not recognized';
            }
            if (errCode == YRfidStatus.COMMAND_OPTION_NOT_RECOGNIZED) {
                errMsg = 'The command option is not supported.';
            }
            if (errCode == YRfidStatus.COMMAND_CANNOT_BE_PROCESSED_IN_TIME) {
                errMsg = 'The command cannot be processed in time';
            }
            if (errCode == YRfidStatus.UNDOCUMENTED_ERROR) {
                errMsg = 'Error with no information given';
            }
            if (errCode == YRfidStatus.BLOCK_NOT_AVAILABLE) {
                errMsg = 'Block is not available';
            }
            if (errCode == YRfidStatus.BLOCK_ALREADY_LOCKED) {
                errMsg = 'Block / byte is already locked and thus cannot be locked again.';
            }
            if (errCode == YRfidStatus.BLOCK_LOCKED) {
                errMsg = 'Block / byte is locked and its content cannot be changed';
            }
            if (errCode == YRfidStatus.BLOCK_NOT_SUCESSFULLY_PROGRAMMED) {
                errMsg = 'Block was not successfully programmed';
            }
            if (errCode == YRfidStatus.BLOCK_NOT_SUCESSFULLY_LOCKED) {
                errMsg = 'Block was not successfully locked';
            }
            if (errCode == YRfidStatus.BLOCK_IS_PROTECTED) {
                errMsg = 'Block is protected';
            }
            if (errCode == YRfidStatus.CRYPTOGRAPHIC_ERROR) {
                errMsg = 'Generic cryptographic error';
            }
            if (errCode == YRfidStatus.BROWNOUT_DETECTED) {
                errMsg = 'BrownOut detected (BOD)';
            }
            if (errCode == YRfidStatus.BUFFER_OVERFLOW) {
                errMsg = 'Buffer Overflow (BOF)';
            }
            if (errCode == YRfidStatus.CRC_ERROR) {
                errMsg = 'Communication CRC Error (CCE)';
            }
            if (errCode == YRfidStatus.COLLISION_DETECTED) {
                errMsg = 'Collision Detected (CLD/CDT)';
            }
            if (errCode == YRfidStatus.COMMAND_RECEIVE_TIMEOUT) {
                errMsg = 'Command Receive Timeout (CRT)';
            }
            if (errCode == YRfidStatus.DID_NOT_SLEEP) {
                errMsg = 'Did Not Sleep (DNS)';
            }
            if (errCode == YRfidStatus.ERROR_DECIMAL_EXPECTED) {
                errMsg = 'Error Decimal Expected (EDX)';
            }
            if (errCode == YRfidStatus.HARDWARE_FAILURE) {
                errMsg = 'Error Hardware Failure (EHF)';
            }
            if (errCode == YRfidStatus.ERROR_HEX_EXPECTED) {
                errMsg = 'Error Hex Expected (EHX)';
            }
            if (errCode == YRfidStatus.FIFO_LENGTH_ERROR) {
                errMsg = 'FIFO length error (FLE)';
            }
            if (errCode == YRfidStatus.FRAMING_ERROR) {
                errMsg = 'Framing error (FER)';
            }
            if (errCode == YRfidStatus.NOT_IN_CNR_MODE) {
                errMsg = 'Not in CNR Mode (NCM)';
            }
            if (errCode == YRfidStatus.NUMBER_OU_OF_RANGE) {
                errMsg = 'Number Out of Range (NOR)';
            }
            if (errCode == YRfidStatus.NOT_SUPPORTED) {
                errMsg = 'Not Supported (NOS)';
            }
            if (errCode == YRfidStatus.NO_RF_FIELD_ACTIVE) {
                errMsg = 'No RF field active (NRF)';
            }
            if (errCode == YRfidStatus.READ_DATA_LENGTH_ERROR) {
                errMsg = 'Read data length error (RDL)';
            }
            if (errCode == YRfidStatus.WATCHDOG_RESET) {
                errMsg = 'Watchdog reset (SRT)';
            }
            if (errCode == YRfidStatus.TAG_COMMUNICATION_ERROR) {
                errMsg = 'Tag Communication Error (TCE)';
            }
            if (errCode == YRfidStatus.TAG_NOT_RESPONDING) {
                errMsg = 'Tag Not Responding (TNR)';
            }
            if (errCode == YRfidStatus.TIMEOUT_ERROR) {
                errMsg = 'TimeOut Error (TOE)';
            }
            if (errCode == YRfidStatus.UNKNOW_COMMAND) {
                errMsg = 'Unknown Command (UCO)';
            }
            if (errCode == YRfidStatus.UNKNOW_ERROR) {
                errMsg = 'Unknown error (UER)';
            }
            if (errCode == YRfidStatus.UNKNOW_PARAMETER) {
                errMsg = 'Unknown Parameter (UPA)';
            }
            if (errCode == YRfidStatus.UART_RECEIVE_ERROR) {
                errMsg = 'UART Receive Error (URE)';
            }
            if (errCode == YRfidStatus.WRONG_DATA_LENGTH) {
                errMsg = 'Wrong Data Length (WDL)';
            }
            if (errCode == YRfidStatus.WRONG_MODE) {
                errMsg = 'Wrong Mode (WMO)';
            }
            if (errCode == YRfidStatus.UNKNOWN_DWARFxx_ERROR_CODE) {
                errMsg = 'Unknown DWARF15 error code';
            }
            if (errCode == YRfidStatus.UNEXPECTED_TAG_ID_IN_RESPONSE) {
                errMsg = 'Unexpected Tag id in response';
            }
            if (errCode == YRfidStatus.UNEXPECTED_TAG_INDEX) {
                errMsg = 'internal error : unexpected TAG index';
            }
            if (errCode == YRfidStatus.TRANSFER_CLOSED) {
                errMsg = 'transfer closed';
            }
            if (errCode == YRfidStatus.WRITE_DATA_MISSING) {
                errMsg = 'Missing write data';
            }
            if (errCode == YRfidStatus.WRITE_TOO_MUCH_DATA) {
                errMsg = 'Attempt to write too much data';
            }
            if (errCode == YRfidStatus.COULD_NOT_BUILD_REQUEST) {
                errMsg = 'Could not not request';
            }
            if (errCode == YRfidStatus.INVALID_OPTIONS) {
                errMsg = 'Invalid transfer options';
            }
            if (errCode == YRfidStatus.UNEXPECTED_RESPONSE) {
                errMsg = 'Unexpected Tag response';
            }
            if (errCode == YRfidStatus.AFI_NOT_AVAILABLE) {
                errMsg = 'AFI not available';
            }
            if (errCode == YRfidStatus.DSFID_NOT_AVAILABLE) {
                errMsg = 'DSFID not available';
            }
            if (errCode == YRfidStatus.TAG_RESPONSE_TOO_SHORT) {
                errMsg = 'Tag\'s response too short';
            }
            if (errCode == YRfidStatus.DEC_EXPECTED) {
                errMsg = 'Error Decimal value Expected, or is missing';
            }
            if (errCode == YRfidStatus.HEX_EXPECTED) {
                errMsg = 'Error Hexadecimal value Expected, or is missing';
            }
            if (errCode == YRfidStatus.NOT_SAME_SECOR) {
                errMsg = 'Input and Output block are not in the same Sector';
            }
            if (errCode == YRfidStatus.MIFARE_AUTHENTICATED) {
                errMsg = 'No chip with MIFARE Classic technology Authenticated';
            }
            if (errCode == YRfidStatus.NO_DATABLOCK) {
                errMsg = 'No Data Block';
            }
            if (errCode == YRfidStatus.KEYB_IS_READABLE) {
                errMsg = 'Key B is Readable';
            }
            if (errCode == YRfidStatus.OPERATION_NOT_EXECUTED) {
                errMsg = 'Operation Not Executed, would have caused an overflow';
            }
            if (errCode == YRfidStatus.BLOK_MODE_ERROR) {
                errMsg = 'Block has not been initialized as a \'value block\'';
            }
            if (errCode == YRfidStatus.BLOCK_NOT_WRITABLE) {
                errMsg = 'Block Not Writable';
            }
            if (errCode == YRfidStatus.BLOCK_ACCESS_ERROR) {
                errMsg = 'Block Access Error';
            }
            if (errCode == YRfidStatus.BLOCK_NOT_AUTHENTICATED) {
                errMsg = 'Block Not Authenticated';
            }
            if (errCode == YRfidStatus.ACCESS_KEY_BIT_NOT_WRITABLE) {
                errMsg = 'Access bits or Keys not Writable';
            }
            if (errCode == YRfidStatus.USE_KEYA_FOR_AUTH) {
                errMsg = 'Use Key B for authentication';
            }
            if (errCode == YRfidStatus.USE_KEYB_FOR_AUTH) {
                errMsg = 'Use Key A for authentication';
            }
            if (errCode == YRfidStatus.KEY_NOT_CHANGEABLE) {
                errMsg = 'Key(s) not changeable';
            }
            if (errCode == YRfidStatus.BLOCK_TOO_HIGH) {
                errMsg = 'Block index is too high';
            }
            if (errCode == YRfidStatus.AUTH_ERR) {
                errMsg = 'Authentication Error (i.e. wrong key)';
            }
            if (errCode == YRfidStatus.NOKEY_SELECT) {
                errMsg = 'No Key Select, select a temporary or a static key';
            }
            if (errCode == YRfidStatus.CARD_NOT_SELECTED) {
                errMsg = ' Card is Not Selected';
            }
            if (errCode == YRfidStatus.BLOCK_TO_READ_NONE) {
                errMsg = 'Number of Blocks to Read is 0';
            }
            if (errCode == YRfidStatus.NO_TAG) {
                errMsg = 'No Tag detected';
            }
            if (errCode == YRfidStatus.TOO_MUCH_DATA) {
                errMsg = 'Too Much Data (i.e. Uart input buffer overflow)';
            }
            if (errCode == YRfidStatus.CON_NOT_SATISFIED) {
                errMsg = 'Conditions Not Satisfied';
            }
            if (errCode == YRfidStatus.BLOCK_IS_SPECIAL) {
                errMsg = 'Bad parameter: block is a special block';
            }
            if (errCode == YRfidStatus.READ_BEYOND_ANNOUNCED_SIZE) {
                errMsg = 'Attempt to read more than announced size.';
            }
            if (errCode == YRfidStatus.BLOCK_ZERO_IS_RESERVED) {
                errMsg = 'Block 0 is reserved and cannot be used';
            }
            if (errCode == YRfidStatus.VALUE_BLOCK_BAD_FORMAT) {
                errMsg = 'One value block is not properly initialized';
            }
            if (errCode == YRfidStatus.ISO15693_ONLY_FEATURE) {
                errMsg = 'Feature available on ISO 15693 only';
            }
            if (errCode == YRfidStatus.ISO14443_ONLY_FEATURE) {
                errMsg = 'Feature available on ISO 14443 only';
            }
            if (errCode == YRfidStatus.MIFARE_CLASSIC_ONLY_FEATURE) {
                errMsg = 'Feature available on ISO 14443 MIFARE Classic only';
            }
            if (errCode == YRfidStatus.BLOCK_MIGHT_BE_PROTECTED) {
                errMsg = 'Block might be protected';
            }
            if (errCode == YRfidStatus.NO_SUCH_BLOCK) {
                errMsg = 'No such block';
            }
            if (errCode == YRfidStatus.COUNT_TOO_BIG) {
                errMsg = 'Count parameter is too large';
            }
            if (errCode == YRfidStatus.UNKNOWN_MEM_SIZE) {
                errMsg = 'Tag memory size is unknown';
            }
            if (errCode == YRfidStatus.MORE_THAN_2BLOCKS_MIGHT_NOT_WORK) {
                errMsg = 'Writing more than two blocks at once might not be supported by this tag';
            }
            if (errCode == YRfidStatus.READWRITE_NOT_SUPPORTED) {
                errMsg = 'Read/write operation not supported for this tag';
            }
            if (errCode == YRfidStatus.UNEXPECTED_VICC_ID_IN_RESPONSE) {
                errMsg = 'Unexpected VICC ID in response';
            }
            if (errCode == YRfidStatus.LOCKBLOCK_NOT_SUPPORTED) {
                errMsg = 'This tag does not support the Lock block function';
            }
            if (errCode == YRfidStatus.INTERNAL_ERROR_SHOULD_NEVER_HAPPEN) {
                errMsg = 'Yoctopuce RFID code ran into an unexpected state, please contact support';
            }
            if (errCode == YRfidStatus.INVLD_BLOCK_MODE_COMBINATION) {
                errMsg = 'Invalid combination of block mode options';
            }
            if (errCode == YRfidStatus.INVLD_ACCESS_MODE_COMBINATION) {
                errMsg = 'Invalid combination of access mode options';
            }
            if (errCode == YRfidStatus.INVALID_SIZE) {
                errMsg = 'Invalid data size parameter';
            }
            if (errCode == YRfidStatus.BAD_PASSWORD_FORMAT) {
                errMsg = 'Bad password format or type';
            }
            if (errCode == YRfidStatus.RADIO_IS_OFF) {
                errMsg = 'Radio is OFF (refreshRate=0).';
            }
            if (errBlk >= 0) {
                errMsg = errMsg + ' (block ' + String(Math.round(errBlk)) + ')';
            }
        }
        this._tagId = tagId;
        this._errCode = errCode;
        this._errBlk = errBlk;
        this._errMsg = errMsg;
        this._fab = fab;
        this._lab = lab;
    }

    //--- (end of generated code: YRfidStatus implementation)
}


//--- (generated code: YRfidOptions class start)
/**
 * YRfidOptions Class: Additional parameters for operations on RFID tags.
 *
 * The YRfidOptions objects are used to specify additional
 * optional parameters to RFID commands that interact with tags,
 * including security keys. When instantiated,the parameters of
 * this object are pre-initialized to a value  which corresponds
 * to the most common usage.
 */
//--- (end of generated code: YRfidOptions class start)

export class YRfidOptions
{
    //--- (generated code: YRfidOptions attributes declaration)

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
    public KeyType: number = 0;

    /**
     * Security key to be used to access the RFID tag, as an
     * hexadecimal string. The key will only be used if you
     * also specify which type of key it is, using property
     * KeyType.
     */
    public HexKey: string = '';

    /**
     * Forces the use of single-block commands to access RFID tag memory blocks.
     * By default, the Yoctopuce library uses the most efficient access strategy
     * generally available for each tag type, but you can force the use of
     * single-block commands if the RFID tags you are using do not support
     * multi-block commands. If operation speed is not a priority, choose
     * single-block mode as it will work with any mode.
     */
    public ForceSingleBlockAccess: boolean = false;

    /**
     * Forces the use of multi-block commands to access RFID tag memory blocks.
     * By default, the Yoctopuce library uses the most efficient access strategy
     * generally available for each tag type, but you can force the use of
     * multi-block commands if you know for sure that the RFID tags you are using
     * do support multi-block commands. Be  aware that even if a tag allows multi-block
     * operations, the maximum number of blocks that can be written or read at the same
     * time can be (very) limited. If the tag does not support multi-block mode
     * for the wanted operation, the option will be ignored.
     */
    public ForceMultiBlockAccess: boolean = false;

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
    public EnableRawAccess: boolean = false;

    /**
     * Disables the tag memory overflow test. By default, the Yoctopuce
     * library's read/write functions detect overruns and do not run
     * commands that are likely to fail. If you nevertheless wish to
     * try to access more memory than the tag announces, you can try to use
     * this option.
     */
    public DisableBoundaryChecks: boolean = false;

    /**
     * Enables simulation mode to check the affected block range as well
     * as access rights. When this option is active, the operation is
     * not fully applied to the RFID tag but the affected block range
     * is determined and the optional access key is tested on these blocks.
     * The access key rights are not tested though. This option applies to
     * write / configure operations only, it is ignored for read operations.
     */
    public EnableDryRun: boolean = false;

    // API symbols as object properties
    public readonly NO_RFID_KEY: number = 0;
    public readonly MIFARE_KEY_A: number = 1;
    public readonly MIFARE_KEY_B: number = 2;

    // API symbols as static members
    public static readonly NO_RFID_KEY: number = 0;
    public static readonly MIFARE_KEY_A: number = 1;
    public static readonly MIFARE_KEY_B: number = 2;
    //--- (end of generated code: YRfidOptions attributes declaration)

    constructor()
    {
        //--- (generated code: YRfidOptions constructor)
        //--- (end of generated code: YRfidOptions constructor)
    }

    //--- (generated code: YRfidOptions implementation)

    imm_getParams(): string
    {
        let opt: number;
        let res: string;
        if (this.ForceSingleBlockAccess) {
            opt = 1;
        } else {
            opt = 0;
        }
        if (this.ForceMultiBlockAccess) {
            opt = (opt | 2);
        }
        if (this.EnableRawAccess) {
            opt = (opt | 4);
        }
        if (this.DisableBoundaryChecks) {
            opt = (opt | 8);
        }
        if (this.EnableDryRun) {
            opt = (opt | 16);
        }
        res = '&o=' + String(Math.round(opt));
        if (this.KeyType != 0) {
            res = res + '&k=' + ('00'+(this.KeyType).toString(16)).slice(-2).toLowerCase() + ':' + this.HexKey;
        }
        return res;
    }

    //--- (end of generated code: YRfidOptions implementation)
}


//--- (generated code: YRfidReader class start)
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
//--- (end of generated code: YRfidReader class start)

export class YRfidReader extends YFunction
{
    //--- (generated code: YRfidReader attributes declaration)
    _className: string;
    _nTags: number = YRfidReader.NTAGS_INVALID;
    _refreshRate: number = YRfidReader.REFRESHRATE_INVALID;
    _valueCallbackRfidReader: YRfidReader.ValueCallback | null = null;
    _eventCallback: YRfidReader.EventCallback | null = null;
    _isFirstCb: boolean = false;
    _prevCbPos: number = 0;
    _eventPos: number = 0;
    _eventStamp: number = 0;

    // API symbols as object properties
    public readonly NTAGS_INVALID: number = YAPI.INVALID_UINT;
    public readonly REFRESHRATE_INVALID: number = YAPI.INVALID_UINT;

    // API symbols as static members
    public static readonly NTAGS_INVALID: number = YAPI.INVALID_UINT;
    public static readonly REFRESHRATE_INVALID: number = YAPI.INVALID_UINT;
    //--- (end of generated code: YRfidReader attributes declaration)

    constructor(yapi: YAPIContext, func: string)
    {
        //--- (generated code: YRfidReader constructor)
        super(yapi, func);
        this._className                  = 'RfidReader';
        //--- (end of generated code: YRfidReader constructor)
    }

    //--- (generated code: YRfidReader implementation)

    imm_parseAttr(name: string, val: any): number
    {
        switch (name) {
        case 'nTags':
            this._nTags = <number> <number> val;
            return 1;
        case 'refreshRate':
            this._refreshRate = <number> <number> val;
            return 1;
        }
        return super.imm_parseAttr(name, val);
    }


    async _internalEventCallback(YRfidReader_obj: YRfidReader, str_value: string): Promise<void>
    {
        await YRfidReader_obj._internalEventHandler(str_value);
    }
    /**
     * Returns the number of RFID tags currently detected.
     *
     * @return an integer corresponding to the number of RFID tags currently detected
     *
     * On failure, throws an exception or returns YRfidReader.NTAGS_INVALID.
     */
    async get_nTags(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YRfidReader.NTAGS_INVALID;
            }
        }
        res = this._nTags;
        return res;
    }

    /**
     * Returns the tag list refresh rate, measured in Hz.
     *
     * @return an integer corresponding to the tag list refresh rate, measured in Hz
     *
     * On failure, throws an exception or returns YRfidReader.REFRESHRATE_INVALID.
     */
    async get_refreshRate(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YRfidReader.REFRESHRATE_INVALID;
            }
        }
        res = this._refreshRate;
        return res;
    }

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
    async set_refreshRate(newval: number): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('refreshRate', rest_val);
    }

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
    static FindRfidReader(func: string): YRfidReader
    {
        let obj: YRfidReader | null;
        obj = <YRfidReader> YFunction._FindFromCache('RfidReader', func);
        if (obj == null) {
            obj = new YRfidReader(YAPI, func);
            YFunction._AddToCache('RfidReader', func, obj);
        }
        return obj;
    }

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
    static FindRfidReaderInContext(yctx: YAPIContext, func: string): YRfidReader
    {
        let obj: YRfidReader | null;
        obj = <YRfidReader> YFunction._FindFromCacheInContext(yctx, 'RfidReader', func);
        if (obj == null) {
            obj = new YRfidReader(yctx, func);
            YFunction._AddToCache('RfidReader', func, obj);
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
    async registerValueCallback(callback: YRfidReader.ValueCallback | null): Promise<number>
    {
        let val: string;
        if (callback != null) {
            await YFunction._UpdateValueCallbackList(this, true);
        } else {
            await YFunction._UpdateValueCallbackList(this, false);
        }
        this._valueCallbackRfidReader = callback;
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
        if (this._valueCallbackRfidReader != null) {
            try {
                await this._valueCallbackRfidReader(this, value);
            } catch (e) {
                this._yapi.imm_log('Exception in valueCallback:', e);
            }
        } else {
            await super._invokeValueCallback(value);
        }
        return 0;
    }

    async _chkerror(tagId: string, json: Uint8Array, status: YRfidStatus): Promise<number>
    {
        let jsonStr: string;
        let errCode: number;
        let errBlk: number;
        let fab: number;
        let lab: number;
        let retcode: number;

        if ((json).length == 0) {
            errCode = await this.get_errorType();
            errBlk = -1;
            fab = -1;
            lab = -1;
        } else {
            jsonStr = this._yapi.imm_bin2str(json);
            errCode = YAPIContext.imm_atoi(this.imm_json_get_key(json, 'err'));
            errBlk = YAPIContext.imm_atoi(this.imm_json_get_key(json, 'errBlk'))-1;
            if ((jsonStr).indexOf('"fab":') >= 0) {
                fab = YAPIContext.imm_atoi(this.imm_json_get_key(json, 'fab'))-1;
                lab = YAPIContext.imm_atoi(this.imm_json_get_key(json, 'lab'))-1;
            } else {
                fab = -1;
                lab = -1;
            }
        }
        status.imm_init(tagId, errCode, errBlk, fab, lab);
        retcode = await status.get_yapiError();
        if (!(retcode == this._yapi.SUCCESS)) {
            return this._throw(retcode, await status.get_errorMessage(), retcode);
        }
        return this._yapi.SUCCESS;
    }

    async reset(): Promise<number>
    {
        let json: Uint8Array;
        let status: YRfidStatus | null;
        status = new YRfidStatus();

        json = await this._download('rfid.json?a=reset');
        return await this._chkerror('', json, status);
    }

    /**
     * Returns the list of RFID tags currently detected by the reader.
     *
     * @return a list of strings, corresponding to each tag identifier (UID).
     *
     * On failure, throws an exception or returns an empty list.
     */
    async get_tagIdList(): Promise<string[]>
    {
        let json: Uint8Array;
        let jsonList: Uint8Array[] = [];
        let taglist: string[] = [];

        json = await this._download('rfid.json?a=list');
        taglist.length = 0;
        if ((json).length > 3) {
            jsonList = this.imm_json_get_array(json);
            for (let ii in jsonList) {
                taglist.push(this.imm_json_get_string(jsonList[ii]));
            }
        }
        return taglist;
    }

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
    async get_tagInfo(tagId: string, status: YRfidStatus): Promise<YRfidTagInfo>
    {
        let url: string;
        let json: Uint8Array;
        let tagType: number;
        let size: number;
        let usable: number;
        let blksize: number;
        let fblk: number;
        let lblk: number;
        let res: YRfidTagInfo | null;
        url = 'rfid.json?a=info&t=' + tagId;

        json = await this._download(url);
        await this._chkerror(tagId, json, status);
        tagType = YAPIContext.imm_atoi(this.imm_json_get_key(json, 'type'));
        size = YAPIContext.imm_atoi(this.imm_json_get_key(json, 'size'));
        usable = YAPIContext.imm_atoi(this.imm_json_get_key(json, 'usable'));
        blksize = YAPIContext.imm_atoi(this.imm_json_get_key(json, 'blksize'));
        fblk = YAPIContext.imm_atoi(this.imm_json_get_key(json, 'fblk'));
        lblk = YAPIContext.imm_atoi(this.imm_json_get_key(json, 'lblk'));
        res = new YRfidTagInfo();
        res.imm_init(tagId, tagType, size, usable, blksize, fblk, lblk);
        return res;
    }

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
    async tagLockBlocks(tagId: string, firstBlock: number, nBlocks: number, options: YRfidOptions, status: YRfidStatus): Promise<number>
    {
        let optstr: string;
        let url: string;
        let json: Uint8Array;
        optstr = options.imm_getParams();
        url = 'rfid.json?a=lock&t=' + tagId + '&b=' + String(Math.round(firstBlock)) + '&n=' + String(Math.round(nBlocks)) + '' + optstr;

        json = await this._download(url);
        return await this._chkerror(tagId, json, status);
    }

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
    async get_tagLockState(tagId: string, firstBlock: number, nBlocks: number, options: YRfidOptions, status: YRfidStatus): Promise<boolean[]>
    {
        let optstr: string;
        let url: string;
        let json: Uint8Array;
        let binRes: Uint8Array;
        let res: boolean[] = [];
        let idx: number;
        let val: number;
        let isLocked: boolean;
        optstr = options.imm_getParams();
        url = 'rfid.json?a=chkl&t=' + tagId + '&b=' + String(Math.round(firstBlock)) + '&n=' + String(Math.round(nBlocks)) + '' + optstr;

        json = await this._download(url);
        await this._chkerror(tagId, json, status);
        if (await status.get_yapiError() != this._yapi.SUCCESS) {
            return res;
        }
        binRes = this._yapi.imm_hexstr2bin(this.imm_json_get_key(json, 'bitmap'));
        idx = 0;
        while (idx < nBlocks) {
            val = binRes[(idx >> 3)];
            isLocked = ((val & (1 << (idx & 7))) != 0);
            res.push(isLocked);
            idx = idx + 1;
        }
        return res;
    }

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
    async get_tagSpecialBlocks(tagId: string, firstBlock: number, nBlocks: number, options: YRfidOptions, status: YRfidStatus): Promise<boolean[]>
    {
        let optstr: string;
        let url: string;
        let json: Uint8Array;
        let binRes: Uint8Array;
        let res: boolean[] = [];
        let idx: number;
        let val: number;
        let isLocked: boolean;
        optstr = options.imm_getParams();
        url = 'rfid.json?a=chks&t=' + tagId + '&b=' + String(Math.round(firstBlock)) + '&n=' + String(Math.round(nBlocks)) + '' + optstr;

        json = await this._download(url);
        await this._chkerror(tagId, json, status);
        if (await status.get_yapiError() != this._yapi.SUCCESS) {
            return res;
        }
        binRes = this._yapi.imm_hexstr2bin(this.imm_json_get_key(json, 'bitmap'));
        idx = 0;
        while (idx < nBlocks) {
            val = binRes[(idx >> 3)];
            isLocked = ((val & (1 << (idx & 7))) != 0);
            res.push(isLocked);
            idx = idx + 1;
        }
        return res;
    }

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
    async tagReadHex(tagId: string, firstBlock: number, nBytes: number, options: YRfidOptions, status: YRfidStatus): Promise<string>
    {
        let optstr: string;
        let url: string;
        let json: Uint8Array;
        let hexbuf: string;
        optstr = options.imm_getParams();
        url = 'rfid.json?a=read&t=' + tagId + '&b=' + String(Math.round(firstBlock)) + '&n=' + String(Math.round(nBytes)) + '' + optstr;

        json = await this._download(url);
        await this._chkerror(tagId, json, status);
        if (await status.get_yapiError() == this._yapi.SUCCESS) {
            hexbuf = this.imm_json_get_key(json, 'res');
        } else {
            hexbuf = '';
        }
        return hexbuf;
    }

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
    async tagReadBin(tagId: string, firstBlock: number, nBytes: number, options: YRfidOptions, status: YRfidStatus): Promise<Uint8Array>
    {
        return this._yapi.imm_hexstr2bin(await this.tagReadHex(tagId, firstBlock, nBytes, options, status));
    }

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
    async tagReadArray(tagId: string, firstBlock: number, nBytes: number, options: YRfidOptions, status: YRfidStatus): Promise<number[]>
    {
        let blk: Uint8Array;
        let idx: number;
        let endidx: number;
        let res: number[] = [];
        blk = await this.tagReadBin(tagId, firstBlock, nBytes, options, status);
        endidx = (blk).length;
        idx = 0;
        while (idx < endidx) {
            res.push(blk[idx]);
            idx = idx + 1;
        }
        return res;
    }

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
    async tagReadStr(tagId: string, firstBlock: number, nChars: number, options: YRfidOptions, status: YRfidStatus): Promise<string>
    {
        return this._yapi.imm_bin2str(await this.tagReadBin(tagId, firstBlock, nChars, options, status));
    }

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
    async tagWriteBin(tagId: string, firstBlock: number, buff: Uint8Array, options: YRfidOptions, status: YRfidStatus): Promise<number>
    {
        let optstr: string;
        let hexstr: string;
        let buflen: number;
        let fname: string;
        let json: Uint8Array;
        buflen = (buff).length;
        if (buflen <= 16) {
            // short data, use an URL-based command
            hexstr = this._yapi.imm_bin2hexstr(buff);
            return await this.tagWriteHex(tagId, firstBlock, hexstr, options, status);
        } else {
            // long data, use an upload command
            optstr = options.imm_getParams();
            fname = 'Rfid:t=' + tagId + '&b=' + String(Math.round(firstBlock)) + '&n=' + String(Math.round(buflen)) + '' + optstr;
            json = await this._uploadEx(fname, buff);
            return await this._chkerror(tagId, json, status);
        }
    }

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
    async tagWriteArray(tagId: string, firstBlock: number, byteList: number[], options: YRfidOptions, status: YRfidStatus): Promise<number>
    {
        let bufflen: number;
        let buff: Uint8Array;
        let idx: number;
        let hexb: number;
        bufflen = byteList.length;
        buff = new Uint8Array(bufflen);
        idx = 0;
        while (idx < bufflen) {
            hexb = byteList[idx];
            buff.set([hexb], idx);
            idx = idx + 1;
        }

        return await this.tagWriteBin(tagId, firstBlock, buff, options, status);
    }

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
    async tagWriteHex(tagId: string, firstBlock: number, hexString: string, options: YRfidOptions, status: YRfidStatus): Promise<number>
    {
        let bufflen: number;
        let optstr: string;
        let url: string;
        let json: Uint8Array;
        let buff: Uint8Array;
        let idx: number;
        let hexb: number;
        bufflen = (hexString).length;
        bufflen = (bufflen >> 1);
        if (bufflen <= 16) {
            // short data, use an URL-based command
            optstr = options.imm_getParams();
            url = 'rfid.json?a=writ&t=' + tagId + '&b=' + String(Math.round(firstBlock)) + '&w=' + hexString + '' + optstr;
            json = await this._download(url);
            return await this._chkerror(tagId, json, status);
        } else {
            // long data, use an upload command
            buff = new Uint8Array(bufflen);
            idx = 0;
            while (idx < bufflen) {
                hexb = parseInt(hexString.substr(2 * idx, 2), 16);
                buff.set([hexb], idx);
                idx = idx + 1;
            }
            return await this.tagWriteBin(tagId, firstBlock, buff, options, status);
        }
    }

    /**
     * Writes data provided as an ASCII string to an RFID tag memory.
     * The write operation may span accross multiple blocks if the
     * number of bytes to write is larger than the RFID tag block size.
     * Note that only the characters present in the provided string
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
    async tagWriteStr(tagId: string, firstBlock: number, text: string, options: YRfidOptions, status: YRfidStatus): Promise<number>
    {
        let buff: Uint8Array;
        buff = this._yapi.imm_str2bin(text);

        return await this.tagWriteBin(tagId, firstBlock, buff, options, status);
    }

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
    async tagGetAFI(tagId: string, options: YRfidOptions, status: YRfidStatus): Promise<number>
    {
        let optstr: string;
        let url: string;
        let json: Uint8Array;
        let res: number;
        optstr = options.imm_getParams();
        url = 'rfid.json?a=rdsf&t=' + tagId + '&b=0' + optstr;

        json = await this._download(url);
        await this._chkerror(tagId, json, status);
        if (await status.get_yapiError() == this._yapi.SUCCESS) {
            res = YAPIContext.imm_atoi(this.imm_json_get_key(json, 'res'));
        } else {
            res = await status.get_yapiError();
        }
        return res;
    }

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
    async tagSetAFI(tagId: string, afi: number, options: YRfidOptions, status: YRfidStatus): Promise<number>
    {
        let optstr: string;
        let url: string;
        let json: Uint8Array;
        optstr = options.imm_getParams();
        url = 'rfid.json?a=wrsf&t=' + tagId + '&b=0&v=' + String(Math.round(afi)) + '' + optstr;

        json = await this._download(url);
        return await this._chkerror(tagId, json, status);
    }

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
    async tagLockAFI(tagId: string, options: YRfidOptions, status: YRfidStatus): Promise<number>
    {
        let optstr: string;
        let url: string;
        let json: Uint8Array;
        optstr = options.imm_getParams();
        url = 'rfid.json?a=lksf&t=' + tagId + '&b=0' + optstr;

        json = await this._download(url);
        return await this._chkerror(tagId, json, status);
    }

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
    async tagGetDSFID(tagId: string, options: YRfidOptions, status: YRfidStatus): Promise<number>
    {
        let optstr: string;
        let url: string;
        let json: Uint8Array;
        let res: number;
        optstr = options.imm_getParams();
        url = 'rfid.json?a=rdsf&t=' + tagId + '&b=1' + optstr;

        json = await this._download(url);
        await this._chkerror(tagId, json, status);
        if (await status.get_yapiError() == this._yapi.SUCCESS) {
            res = YAPIContext.imm_atoi(this.imm_json_get_key(json, 'res'));
        } else {
            res = await status.get_yapiError();
        }
        return res;
    }

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
    async tagSetDSFID(tagId: string, dsfid: number, options: YRfidOptions, status: YRfidStatus): Promise<number>
    {
        let optstr: string;
        let url: string;
        let json: Uint8Array;
        optstr = options.imm_getParams();
        url = 'rfid.json?a=wrsf&t=' + tagId + '&b=1&v=' + String(Math.round(dsfid)) + '' + optstr;

        json = await this._download(url);
        return await this._chkerror(tagId, json, status);
    }

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
    async tagLockDSFID(tagId: string, options: YRfidOptions, status: YRfidStatus): Promise<number>
    {
        let optstr: string;
        let url: string;
        let json: Uint8Array;
        optstr = options.imm_getParams();
        url = 'rfid.json?a=lksf&t=' + tagId + '&b=1' + optstr;

        json = await this._download(url);
        return await this._chkerror(tagId, json, status);
    }

    /**
     * Returns a string with last tag arrival/removal events observed.
     * This method return only events that are still buffered in the device memory.
     *
     * @return a string with last events observed (one per line).
     *
     * On failure, throws an exception or returns  YAPI.INVALID_STRING.
     */
    async get_lastEvents(): Promise<string>
    {
        let content: Uint8Array;

        content = await this._download('events.txt?pos=0');
        return this._yapi.imm_bin2str(content);
    }

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
    async registerEventCallback(callback: YRfidReader.EventCallback | null): Promise<number>
    {
        this._eventCallback = callback;
        this._isFirstCb = true;
        if (callback != null) {
            await this.registerValueCallback(this._internalEventCallback);
        } else {
            await this.registerValueCallback(<YRfidReader.ValueCallback | null> null);
        }
        return 0;
    }

    async _internalEventHandler(cbVal: string): Promise<number>
    {
        let cbPos: number;
        let cbDPos: number;
        let url: string;
        let content: Uint8Array;
        let contentStr: string;
        let eventArr: string[] = [];
        let arrLen: number;
        let lenStr: string;
        let arrPos: number;
        let eventStr: string;
        let eventLen: number;
        let hexStamp: string;
        let typePos: number;
        let dataPos: number;
        let intStamp: number;
        let binMStamp: Uint8Array;
        let msStamp: number;
        let evtStamp: number;
        let evtType: string;
        let evtData: string;
        // detect possible power cycle of the reader to clear event pointer
        cbPos = YAPIContext.imm_atoi(cbVal);
        cbPos = (((cbPos) / (1000)) >> 0);
        cbDPos = ((cbPos - this._prevCbPos) & 0x7ffff);
        this._prevCbPos = cbPos;
        if (cbDPos > 16384) {
            this._eventPos = 0;
        }
        if (!(this._eventCallback != null)) {
            return this._yapi.SUCCESS;
        }
        if (this._isFirstCb) {
            // first emulated value callback caused by registerValueCallback:
            // retrieve arrivals of all tags currently present to emulate arrival
            this._isFirstCb = false;
            this._eventStamp = 0;
            content = await this._download('events.txt');
            contentStr = this._yapi.imm_bin2str(content);
            eventArr = (contentStr).split('\n');
            arrLen = eventArr.length;
            if (!(arrLen > 0)) {
                return this._throw(this._yapi.IO_ERROR, 'fail to download events', this._yapi.IO_ERROR);
            }
            // first element of array is the new position preceeded by '@'
            arrPos = 1;
            lenStr = eventArr[0];
            lenStr = lenStr.substr(1, (lenStr).length-1);
            // update processed event position pointer
            this._eventPos = YAPIContext.imm_atoi(lenStr);
        } else {
            // load all events since previous call
            url = 'events.txt?pos=' + String(Math.round(this._eventPos));
            content = await this._download(url);
            contentStr = this._yapi.imm_bin2str(content);
            eventArr = (contentStr).split('\n');
            arrLen = eventArr.length;
            if (!(arrLen > 0)) {
                return this._throw(this._yapi.IO_ERROR, 'fail to download events', this._yapi.IO_ERROR);
            }
            // last element of array is the new position preceeded by '@'
            arrPos = 0;
            arrLen = arrLen - 1;
            lenStr = eventArr[arrLen];
            lenStr = lenStr.substr(1, (lenStr).length-1);
            // update processed event position pointer
            this._eventPos = YAPIContext.imm_atoi(lenStr);
        }
        // now generate callbacks for each real event
        while (arrPos < arrLen) {
            eventStr = eventArr[arrPos];
            eventLen = (eventStr).length;
            typePos = (eventStr).indexOf(':')+1;
            if ((eventLen >= 14) && (typePos > 10)) {
                hexStamp = eventStr.substr(0, 8);
                intStamp = parseInt(hexStamp, 16);
                if (intStamp >= this._eventStamp) {
                    this._eventStamp = intStamp;
                    binMStamp = this._yapi.imm_str2bin(eventStr.substr(8, 2));
                    msStamp = (binMStamp[0]-64) * 32 + binMStamp[1];
                    evtStamp = intStamp + (0.001 * msStamp);
                    dataPos = (eventStr).indexOf('=')+1;
                    evtType = eventStr.substr(typePos, 1);
                    evtData = '';
                    if (dataPos > 10) {
                        evtData = eventStr.substr(dataPos, eventLen-dataPos);
                    }
                    if (this._eventCallback != null) {
                        try {
                            await this._eventCallback(this, evtStamp, evtType, evtData);
                        } catch (e) {
                            this._yapi.imm_log('Exception in eventCallback:', e);
                        }
                    }
                }
            }
            arrPos = arrPos + 1;
        }
        return this._yapi.SUCCESS;
    }

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
    nextRfidReader(): YRfidReader | null
    {
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != YAPI.SUCCESS) return null;
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, <string> resolve.result);
        if (next_hwid == null) return null;
        return YRfidReader.FindRfidReaderInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of RFID readers currently accessible.
     * Use the method YRfidReader.nextRfidReader() to iterate on
     * next RFID readers.
     *
     * @return a pointer to a YRfidReader object, corresponding to
     *         the first RFID reader currently online, or a null pointer
     *         if there are none.
     */
    static FirstRfidReader(): YRfidReader | null
    {
        let next_hwid = YAPI.imm_getFirstHardwareId('RfidReader');
        if (next_hwid == null) return null;
        return YRfidReader.FindRfidReader(next_hwid);
    }

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
    static FirstRfidReaderInContext(yctx: YAPIContext): YRfidReader | null
    {
        let next_hwid = yctx.imm_getFirstHardwareId('RfidReader');
        if (next_hwid == null) return null;
        return YRfidReader.FindRfidReaderInContext(yctx, next_hwid);
    }

    //--- (end of generated code: YRfidReader implementation)
}

export namespace YRfidReader {
    //--- (generated code: YRfidReader definitions)
    export interface ValueCallback {(func: YRfidReader, value: string): void}

    export interface EventCallback {(func: YRfidReader, timestampr:number, evtType:string, eventData:string): void}

    //--- (end of generated code: YRfidReader definitions)
}

