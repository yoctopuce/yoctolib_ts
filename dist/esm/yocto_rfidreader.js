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
import { YAPI, YAPIContext, YFunction } from './yocto_api.js';
//--- (generated code: YRfidTagInfo class start)
/**
 * YRfidTagInfo Class: RFID tag description, used by class YRfidReader
 *
 * YRfidTagInfo objects are used to describe RFID tag attributes,
 * such as the tag type and its storage size. These objects are returned by
 * method get_tagInfo() of class YRfidReader.
 */
//--- (end of generated code: YRfidTagInfo class start)
export class YRfidTagInfo {
    //--- (end of generated code: YRfidTagInfo attributes declaration)
    constructor() {
        //--- (generated code: YRfidTagInfo attributes declaration)
        this._tagId = '';
        this._tagType = 0;
        this._typeStr = '';
        this._size = 0;
        this._usable = 0;
        this._blksize = 0;
        this._fblk = 0;
        this._lblk = 0;
        // API symbols as object properties
        this.IEC_15693 = 1;
        this.IEC_14443 = 2;
        this.IEC_14443_MIFARE_ULTRALIGHT = 3;
        this.IEC_14443_MIFARE_CLASSIC1K = 4;
        this.IEC_14443_MIFARE_CLASSIC4K = 5;
        this.IEC_14443_MIFARE_DESFIRE = 6;
        this.IEC_14443_NTAG_213 = 7;
        this.IEC_14443_NTAG_215 = 8;
        this.IEC_14443_NTAG_216 = 9;
        this.IEC_14443_NTAG_424_DNA = 10;
        //--- (generated code: YRfidTagInfo constructor)
        //--- (end of generated code: YRfidTagInfo constructor)
    }
    //--- (generated code: YRfidTagInfo implementation)
    /**
     * Returns the RFID tag identifier.
     *
     * @return a string with the RFID tag identifier.
     */
    get_tagId() {
        return this._tagId;
    }
    /**
     * Returns the type of the RFID tag, as a numeric constant.
     * (IEC_14443_MIFARE_CLASSIC1K, ...).
     *
     * @return an integer corresponding to the RFID tag type
     */
    get_tagType() {
        return this._tagType;
    }
    /**
     * Returns the type of the RFID tag, as a string.
     *
     * @return a string corresponding to the RFID tag type
     */
    get_tagTypeStr() {
        return this._typeStr;
    }
    /**
     * Returns the total memory size of the RFID tag, in bytes.
     *
     * @return the total memory size of the RFID tag
     */
    get_tagMemorySize() {
        return this._size;
    }
    /**
     * Returns the usable storage size of the RFID tag, in bytes.
     *
     * @return the usable storage size of the RFID tag
     */
    get_tagUsableSize() {
        return this._usable;
    }
    /**
     * Returns the block size of the RFID tag, in bytes.
     *
     * @return the block size of the RFID tag
     */
    get_tagBlockSize() {
        return this._blksize;
    }
    /**
     * Returns the index of the first usable storage block on the RFID tag.
     *
     * @return the index of the first usable storage block on the RFID tag
     */
    get_tagFirstBlock() {
        return this._fblk;
    }
    /**
     * Returns the index of the last usable storage block on the RFID tag.
     *
     * @return the index of the last usable storage block on the RFID tag
     */
    get_tagLastBlock() {
        return this._lblk;
    }
    imm_init(tagId, tagType, size, usable, blksize, fblk, lblk) {
        let typeStr;
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
}
// API symbols as static members
YRfidTagInfo.IEC_15693 = 1;
YRfidTagInfo.IEC_14443 = 2;
YRfidTagInfo.IEC_14443_MIFARE_ULTRALIGHT = 3;
YRfidTagInfo.IEC_14443_MIFARE_CLASSIC1K = 4;
YRfidTagInfo.IEC_14443_MIFARE_CLASSIC4K = 5;
YRfidTagInfo.IEC_14443_MIFARE_DESFIRE = 6;
YRfidTagInfo.IEC_14443_NTAG_213 = 7;
YRfidTagInfo.IEC_14443_NTAG_215 = 8;
YRfidTagInfo.IEC_14443_NTAG_216 = 9;
YRfidTagInfo.IEC_14443_NTAG_424_DNA = 10;
//--- (generated code: YRfidStatus class start)
/**
 * YRfidStatus Class: Detailled information about the result of RFID tag operations
 *
 * YRfidStatus objects provide additional information about
 * operations on RFID tags, including the range of blocks affected
 * by read/write operations and possible errors when communicating
 * with RFID tags.
 * This makes it possible, for example, to distinguish communication
 * errors that can be recovered by an additional attempt, from
 * security or other errors on the tag.
 */
//--- (end of generated code: YRfidStatus class start)
export class YRfidStatus {
    //--- (end of generated code: YRfidStatus attributes declaration)
    constructor() {
        //--- (generated code: YRfidStatus attributes declaration)
        this._tagId = '';
        this._errCode = 0;
        this._errBlk = 0;
        this._errMsg = '';
        this._yapierr = 0;
        this._fab = 0;
        this._lab = 0;
        // API symbols as object properties
        this.SUCCESS = 0;
        this.COMMAND_NOT_SUPPORTED = 1;
        this.COMMAND_NOT_RECOGNIZED = 2;
        this.COMMAND_OPTION_NOT_RECOGNIZED = 3;
        this.COMMAND_CANNOT_BE_PROCESSED_IN_TIME = 4;
        this.UNDOCUMENTED_ERROR = 15;
        this.BLOCK_NOT_AVAILABLE = 16;
        this.BLOCK_ALREADY_LOCKED = 17;
        this.BLOCK_LOCKED = 18;
        this.BLOCK_NOT_SUCESSFULLY_PROGRAMMED = 19;
        this.BLOCK_NOT_SUCESSFULLY_LOCKED = 20;
        this.BLOCK_IS_PROTECTED = 21;
        this.CRYPTOGRAPHIC_ERROR = 64;
        this.READER_BUSY = 1000;
        this.TAG_NOTFOUND = 1001;
        this.TAG_LEFT = 1002;
        this.TAG_JUSTLEFT = 1003;
        this.TAG_COMMUNICATION_ERROR = 1004;
        this.TAG_NOT_RESPONDING = 1005;
        this.TIMEOUT_ERROR = 1006;
        this.COLLISION_DETECTED = 1007;
        this.INVALID_CMD_ARGUMENTS = -66;
        this.UNKNOWN_CAPABILITIES = -67;
        this.MEMORY_NOT_SUPPORTED = -68;
        this.INVALID_BLOCK_INDEX = -69;
        this.MEM_SPACE_UNVERRUN_ATTEMPT = -70;
        this.BROWNOUT_DETECTED = -71;
        this.BUFFER_OVERFLOW = -72;
        this.CRC_ERROR = -73;
        this.COMMAND_RECEIVE_TIMEOUT = -75;
        this.DID_NOT_SLEEP = -76;
        this.ERROR_DECIMAL_EXPECTED = -77;
        this.HARDWARE_FAILURE = -78;
        this.ERROR_HEX_EXPECTED = -79;
        this.FIFO_LENGTH_ERROR = -80;
        this.FRAMING_ERROR = -81;
        this.NOT_IN_CNR_MODE = -82;
        this.NUMBER_OU_OF_RANGE = -83;
        this.NOT_SUPPORTED = -84;
        this.NO_RF_FIELD_ACTIVE = -85;
        this.READ_DATA_LENGTH_ERROR = -86;
        this.WATCHDOG_RESET = -87;
        this.UNKNOW_COMMAND = -91;
        this.UNKNOW_ERROR = -92;
        this.UNKNOW_PARAMETER = -93;
        this.UART_RECEIVE_ERROR = -94;
        this.WRONG_DATA_LENGTH = -95;
        this.WRONG_MODE = -96;
        this.UNKNOWN_DWARFxx_ERROR_CODE = -97;
        this.RESPONSE_SHORT = -98;
        this.UNEXPECTED_TAG_ID_IN_RESPONSE = -99;
        this.UNEXPECTED_TAG_INDEX = -100;
        this.READ_EOF = -101;
        this.READ_OK_SOFAR = -102;
        this.WRITE_DATA_MISSING = -103;
        this.WRITE_TOO_MUCH_DATA = -104;
        this.TRANSFER_CLOSED = -105;
        this.COULD_NOT_BUILD_REQUEST = -106;
        this.INVALID_OPTIONS = -107;
        this.UNEXPECTED_RESPONSE = -108;
        this.AFI_NOT_AVAILABLE = -109;
        this.DSFID_NOT_AVAILABLE = -110;
        this.TAG_RESPONSE_TOO_SHORT = -111;
        this.DEC_EXPECTED = -112;
        this.HEX_EXPECTED = -113;
        this.NOT_SAME_SECOR = -114;
        this.MIFARE_AUTHENTICATED = -115;
        this.NO_DATABLOCK = -116;
        this.KEYB_IS_READABLE = -117;
        this.OPERATION_NOT_EXECUTED = -118;
        this.BLOK_MODE_ERROR = -119;
        this.BLOCK_NOT_WRITABLE = -120;
        this.BLOCK_ACCESS_ERROR = -121;
        this.BLOCK_NOT_AUTHENTICATED = -122;
        this.ACCESS_KEY_BIT_NOT_WRITABLE = -123;
        this.USE_KEYA_FOR_AUTH = -124;
        this.USE_KEYB_FOR_AUTH = -125;
        this.KEY_NOT_CHANGEABLE = -126;
        this.BLOCK_TOO_HIGH = -127;
        this.AUTH_ERR = -128;
        this.NOKEY_SELECT = -129;
        this.CARD_NOT_SELECTED = -130;
        this.BLOCK_TO_READ_NONE = -131;
        this.NO_TAG = -132;
        this.TOO_MUCH_DATA = -133;
        this.CON_NOT_SATISFIED = -134;
        this.BLOCK_IS_SPECIAL = -135;
        this.READ_BEYOND_ANNOUNCED_SIZE = -136;
        this.BLOCK_ZERO_IS_RESERVED = -137;
        this.VALUE_BLOCK_BAD_FORMAT = -138;
        this.ISO15693_ONLY_FEATURE = -139;
        this.ISO14443_ONLY_FEATURE = -140;
        this.MIFARE_CLASSIC_ONLY_FEATURE = -141;
        this.BLOCK_MIGHT_BE_PROTECTED = -142;
        this.NO_SUCH_BLOCK = -143;
        this.COUNT_TOO_BIG = -144;
        this.UNKNOWN_MEM_SIZE = -145;
        this.MORE_THAN_2BLOCKS_MIGHT_NOT_WORK = -146;
        this.READWRITE_NOT_SUPPORTED = -147;
        this.UNEXPECTED_VICC_ID_IN_RESPONSE = -148;
        this.LOCKBLOCK_NOT_SUPPORTED = -150;
        this.INTERNAL_ERROR_SHOULD_NEVER_HAPPEN = -151;
        this.INVLD_BLOCK_MODE_COMBINATION = -152;
        this.INVLD_ACCESS_MODE_COMBINATION = -153;
        this.INVALID_SIZE = -154;
        this.BAD_PASSWORD_FORMAT = -155;
        //--- (generated code: YRfidStatus constructor)
        //--- (end of generated code: YRfidStatus constructor)
    }
    //--- (generated code: YRfidStatus implementation)
    /**
     * Returns RFID tag identifier related to the status.
     *
     * @return a string with the RFID tag identifier.
     */
    get_tagId() {
        return this._tagId;
    }
    /**
     * Returns the detailled error code, or 0 if no error happened.
     *
     * @return a numeric error code
     */
    get_errorCode() {
        return this._errCode;
    }
    /**
     * Returns the RFID tag memory block number where the error was encountered, or -1 if the
     * error is not specific to a memory block.
     *
     * @return an RFID tag block number
     */
    get_errorBlock() {
        return this._errBlk;
    }
    /**
     * Returns a string describing precisely the RFID commande result.
     *
     * @return an error message string
     */
    get_errorMessage() {
        return this._errMsg;
    }
    get_yapiError() {
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
    get_firstAffectedBlock() {
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
    get_lastAffectedBlock() {
        return this._lab;
    }
    imm_init(tagId, errCode, errBlk, fab, lab) {
        let errMsg;
        if (errCode == 0) {
            this._yapierr = YAPI.SUCCESS;
            errMsg = 'Success (no error)';
        }
        else {
            if (errCode < 0) {
                if (errCode > -50) {
                    this._yapierr = errCode;
                    errMsg = 'YoctoLib error ' + String(Math.round(errCode));
                }
                else {
                    this._yapierr = YAPI.RFID_HARD_ERROR;
                    errMsg = 'Non-recoverable RFID error ' + String(Math.round(errCode));
                }
            }
            else {
                if (errCode > 1000) {
                    this._yapierr = YAPI.RFID_SOFT_ERROR;
                    errMsg = 'Recoverable RFID error ' + String(Math.round(errCode));
                }
                else {
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
                errMsg = 'Block is already locked and thus cannot be locked again.';
            }
            if (errCode == YRfidStatus.BLOCK_LOCKED) {
                errMsg = 'Block is locked and its content cannot be changed';
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
}
// API symbols as static members
YRfidStatus.SUCCESS = 0;
YRfidStatus.COMMAND_NOT_SUPPORTED = 1;
YRfidStatus.COMMAND_NOT_RECOGNIZED = 2;
YRfidStatus.COMMAND_OPTION_NOT_RECOGNIZED = 3;
YRfidStatus.COMMAND_CANNOT_BE_PROCESSED_IN_TIME = 4;
YRfidStatus.UNDOCUMENTED_ERROR = 15;
YRfidStatus.BLOCK_NOT_AVAILABLE = 16;
YRfidStatus.BLOCK_ALREADY_LOCKED = 17;
YRfidStatus.BLOCK_LOCKED = 18;
YRfidStatus.BLOCK_NOT_SUCESSFULLY_PROGRAMMED = 19;
YRfidStatus.BLOCK_NOT_SUCESSFULLY_LOCKED = 20;
YRfidStatus.BLOCK_IS_PROTECTED = 21;
YRfidStatus.CRYPTOGRAPHIC_ERROR = 64;
YRfidStatus.READER_BUSY = 1000;
YRfidStatus.TAG_NOTFOUND = 1001;
YRfidStatus.TAG_LEFT = 1002;
YRfidStatus.TAG_JUSTLEFT = 1003;
YRfidStatus.TAG_COMMUNICATION_ERROR = 1004;
YRfidStatus.TAG_NOT_RESPONDING = 1005;
YRfidStatus.TIMEOUT_ERROR = 1006;
YRfidStatus.COLLISION_DETECTED = 1007;
YRfidStatus.INVALID_CMD_ARGUMENTS = -66;
YRfidStatus.UNKNOWN_CAPABILITIES = -67;
YRfidStatus.MEMORY_NOT_SUPPORTED = -68;
YRfidStatus.INVALID_BLOCK_INDEX = -69;
YRfidStatus.MEM_SPACE_UNVERRUN_ATTEMPT = -70;
YRfidStatus.BROWNOUT_DETECTED = -71;
YRfidStatus.BUFFER_OVERFLOW = -72;
YRfidStatus.CRC_ERROR = -73;
YRfidStatus.COMMAND_RECEIVE_TIMEOUT = -75;
YRfidStatus.DID_NOT_SLEEP = -76;
YRfidStatus.ERROR_DECIMAL_EXPECTED = -77;
YRfidStatus.HARDWARE_FAILURE = -78;
YRfidStatus.ERROR_HEX_EXPECTED = -79;
YRfidStatus.FIFO_LENGTH_ERROR = -80;
YRfidStatus.FRAMING_ERROR = -81;
YRfidStatus.NOT_IN_CNR_MODE = -82;
YRfidStatus.NUMBER_OU_OF_RANGE = -83;
YRfidStatus.NOT_SUPPORTED = -84;
YRfidStatus.NO_RF_FIELD_ACTIVE = -85;
YRfidStatus.READ_DATA_LENGTH_ERROR = -86;
YRfidStatus.WATCHDOG_RESET = -87;
YRfidStatus.UNKNOW_COMMAND = -91;
YRfidStatus.UNKNOW_ERROR = -92;
YRfidStatus.UNKNOW_PARAMETER = -93;
YRfidStatus.UART_RECEIVE_ERROR = -94;
YRfidStatus.WRONG_DATA_LENGTH = -95;
YRfidStatus.WRONG_MODE = -96;
YRfidStatus.UNKNOWN_DWARFxx_ERROR_CODE = -97;
YRfidStatus.RESPONSE_SHORT = -98;
YRfidStatus.UNEXPECTED_TAG_ID_IN_RESPONSE = -99;
YRfidStatus.UNEXPECTED_TAG_INDEX = -100;
YRfidStatus.READ_EOF = -101;
YRfidStatus.READ_OK_SOFAR = -102;
YRfidStatus.WRITE_DATA_MISSING = -103;
YRfidStatus.WRITE_TOO_MUCH_DATA = -104;
YRfidStatus.TRANSFER_CLOSED = -105;
YRfidStatus.COULD_NOT_BUILD_REQUEST = -106;
YRfidStatus.INVALID_OPTIONS = -107;
YRfidStatus.UNEXPECTED_RESPONSE = -108;
YRfidStatus.AFI_NOT_AVAILABLE = -109;
YRfidStatus.DSFID_NOT_AVAILABLE = -110;
YRfidStatus.TAG_RESPONSE_TOO_SHORT = -111;
YRfidStatus.DEC_EXPECTED = -112;
YRfidStatus.HEX_EXPECTED = -113;
YRfidStatus.NOT_SAME_SECOR = -114;
YRfidStatus.MIFARE_AUTHENTICATED = -115;
YRfidStatus.NO_DATABLOCK = -116;
YRfidStatus.KEYB_IS_READABLE = -117;
YRfidStatus.OPERATION_NOT_EXECUTED = -118;
YRfidStatus.BLOK_MODE_ERROR = -119;
YRfidStatus.BLOCK_NOT_WRITABLE = -120;
YRfidStatus.BLOCK_ACCESS_ERROR = -121;
YRfidStatus.BLOCK_NOT_AUTHENTICATED = -122;
YRfidStatus.ACCESS_KEY_BIT_NOT_WRITABLE = -123;
YRfidStatus.USE_KEYA_FOR_AUTH = -124;
YRfidStatus.USE_KEYB_FOR_AUTH = -125;
YRfidStatus.KEY_NOT_CHANGEABLE = -126;
YRfidStatus.BLOCK_TOO_HIGH = -127;
YRfidStatus.AUTH_ERR = -128;
YRfidStatus.NOKEY_SELECT = -129;
YRfidStatus.CARD_NOT_SELECTED = -130;
YRfidStatus.BLOCK_TO_READ_NONE = -131;
YRfidStatus.NO_TAG = -132;
YRfidStatus.TOO_MUCH_DATA = -133;
YRfidStatus.CON_NOT_SATISFIED = -134;
YRfidStatus.BLOCK_IS_SPECIAL = -135;
YRfidStatus.READ_BEYOND_ANNOUNCED_SIZE = -136;
YRfidStatus.BLOCK_ZERO_IS_RESERVED = -137;
YRfidStatus.VALUE_BLOCK_BAD_FORMAT = -138;
YRfidStatus.ISO15693_ONLY_FEATURE = -139;
YRfidStatus.ISO14443_ONLY_FEATURE = -140;
YRfidStatus.MIFARE_CLASSIC_ONLY_FEATURE = -141;
YRfidStatus.BLOCK_MIGHT_BE_PROTECTED = -142;
YRfidStatus.NO_SUCH_BLOCK = -143;
YRfidStatus.COUNT_TOO_BIG = -144;
YRfidStatus.UNKNOWN_MEM_SIZE = -145;
YRfidStatus.MORE_THAN_2BLOCKS_MIGHT_NOT_WORK = -146;
YRfidStatus.READWRITE_NOT_SUPPORTED = -147;
YRfidStatus.UNEXPECTED_VICC_ID_IN_RESPONSE = -148;
YRfidStatus.LOCKBLOCK_NOT_SUPPORTED = -150;
YRfidStatus.INTERNAL_ERROR_SHOULD_NEVER_HAPPEN = -151;
YRfidStatus.INVLD_BLOCK_MODE_COMBINATION = -152;
YRfidStatus.INVLD_ACCESS_MODE_COMBINATION = -153;
YRfidStatus.INVALID_SIZE = -154;
YRfidStatus.BAD_PASSWORD_FORMAT = -155;
//--- (generated code: YRfidOptions class start)
/**
 * YRfidOptions Class: Extra parameters for performing RFID tag operations
 *
 * YRfidOptions objects are used to provide optional
 * parameters to RFID commands that interact with tags, and in
 * particular to provide security keys when required.
 */
//--- (end of generated code: YRfidOptions class start)
export class YRfidOptions {
    //--- (end of generated code: YRfidOptions attributes declaration)
    constructor() {
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
        this.KeyType = 0;
        /**
         * Security key to be used to access the RFID tag, as an
         * hexadecimal string. The key will only be used if you
         * also specify which type of key it is, using property
         * KeyType.
         */
        this.HexKey = '';
        /**
         * Force the use of single-block commands to access RFID tag memory blocks.
         * By default, the Yoctopuce library uses the most efficient access strategy
         * generally available for each tag type, but you can force the use of
         * single-block commands if the RFID tags you are using do not support
         * multi-block commands. If opération speed is not a priority, choose
         * single-block mode as it will work with any mode.
         */
        this.ForceSingleBlockAccess = false;
        /**
         * Force the use of multi-block commands to access RFID tag memory blocks.
         * By default, the Yoctopuce library uses the most efficient access strategy
         * generally available for each tag type, but you can force the use of
         * multi-block commands if you know for sure that the RFID tags you are using
         * do support multi-block commands. Be  aware that even if a tag allows multi-block
         * operations, the maximum number of blocks that can be written or read at the same
         * time can be (very) limited. If the tag does not support multi-block mode
         * for the wanted opération, the option will be ignored.
         */
        this.ForceMultiBlockAccess = false;
        /**
         * Enable direct access to RFID tag control blocks.
         * By default, Yoctopuce library read and write functions only work
         * on data blocks and automatically skip special blocks, as specific functions are provided
         * to configure security parameters found in control blocks.
         * If you need to access control blocks in your own way using
         * read/write functions, enable this option.  Use this option wisely,
         * as overwriting a special block migth very well irreversibly alter your
         * tag behavior.
         */
        this.EnableRawAccess = false;
        /**
         * Disables the tag memory overflow test. By default, the Yoctopuce
         * library's read/write functions detect overruns and do not run
         * commands that are likely to fail. If you nevertheless wish to
         * access more memory than the tag announces, you can try to use
         * this option.
         */
        this.DisableBoundaryChecks = false;
        /**
         * Enable simulation mode to check the affected block range as well
         * as access rights. When this option is active, the operation is
         * not fully applied to the RFID tag but the affected block range
         * is determined and the optional access key is tested on these blocks.
         * The access key rights are not tested though. This option applies to
         * write / configure operations only, it is ignored for read operations.
         */
        this.EnableDryRun = false;
        // API symbols as object properties
        this.NO_RFID_KEY = 0;
        this.MIFARE_KEY_A = 1;
        this.MIFARE_KEY_B = 2;
        //--- (generated code: YRfidOptions constructor)
        //--- (end of generated code: YRfidOptions constructor)
    }
    //--- (generated code: YRfidOptions implementation)
    imm_getParams() {
        let opt;
        let res;
        if (this.ForceSingleBlockAccess) {
            opt = 1;
        }
        else {
            opt = 0;
        }
        if (this.ForceMultiBlockAccess) {
            opt = ((opt) | (2));
        }
        if (this.EnableRawAccess) {
            opt = ((opt) | (4));
        }
        if (this.DisableBoundaryChecks) {
            opt = ((opt) | (8));
        }
        if (this.EnableDryRun) {
            opt = ((opt) | (16));
        }
        res = '&o=' + String(Math.round(opt));
        if (this.KeyType != 0) {
            res = res + '&k=' + ('00' + (this.KeyType).toString(16)).slice(-2).toLowerCase() + ':' + this.HexKey;
        }
        return res;
    }
}
// API symbols as static members
YRfidOptions.NO_RFID_KEY = 0;
YRfidOptions.MIFARE_KEY_A = 1;
YRfidOptions.MIFARE_KEY_B = 2;
//--- (generated code: YRfidReader class start)
/**
 * YRfidReader Class: RfidReader function interface
 *
 * The RfidReader class provides access detect,
 * read and write RFID tags.
 */
//--- (end of generated code: YRfidReader class start)
export class YRfidReader extends YFunction {
    //--- (end of generated code: YRfidReader attributes declaration)
    constructor(yapi, func) {
        //--- (generated code: YRfidReader constructor)
        super(yapi, func);
        this._nTags = YRfidReader.NTAGS_INVALID;
        this._refreshRate = YRfidReader.REFRESHRATE_INVALID;
        this._valueCallbackRfidReader = null;
        this._eventCallback = null;
        this._isFirstCb = false;
        this._prevCbPos = 0;
        this._eventPos = 0;
        this._eventStamp = 0;
        // API symbols as object properties
        this.NTAGS_INVALID = YAPI.INVALID_UINT;
        this.REFRESHRATE_INVALID = YAPI.INVALID_UINT;
        this._className = 'RfidReader';
        //--- (end of generated code: YRfidReader constructor)
    }
    //--- (generated code: YRfidReader implementation)
    imm_parseAttr(name, val) {
        switch (name) {
            case 'nTags':
                this._nTags = val;
                return 1;
            case 'refreshRate':
                this._refreshRate = val;
                return 1;
        }
        return super.imm_parseAttr(name, val);
    }
    async _internalEventCallback(YRfidReader_obj, str_value) {
        await YRfidReader_obj._internalEventHandler(str_value);
    }
    /**
     * Returns the number of RFID tags currently detected.
     *
     * @return an integer corresponding to the number of RFID tags currently detected
     *
     * On failure, throws an exception or returns YRfidReader.NTAGS_INVALID.
     */
    async get_nTags() {
        let res;
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
    async get_refreshRate() {
        let res;
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
     * but in real life it will be difficult to do better than 50Hz.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : an integer corresponding to the present tag list refresh rate, measured in Hz
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_refreshRate(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('refreshRate', rest_val);
    }
    /**
     * Retrieves a RFID reader for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
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
    static FindRfidReader(func) {
        let obj;
        obj = YFunction._FindFromCache('RfidReader', func);
        if (obj == null) {
            obj = new YRfidReader(YAPI, func);
            YFunction._AddToCache('RfidReader', func, obj);
        }
        return obj;
    }
    /**
     * Retrieves a RFID reader for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
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
    static FindRfidReaderInContext(yctx, func) {
        let obj;
        obj = YFunction._FindFromCacheInContext(yctx, 'RfidReader', func);
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
    async registerValueCallback(callback) {
        let val;
        if (callback != null) {
            await YFunction._UpdateValueCallbackList(this, true);
        }
        else {
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
    async _invokeValueCallback(value) {
        if (this._valueCallbackRfidReader != null) {
            try {
                await this._valueCallbackRfidReader(this, value);
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
    async _chkerror(tagId, json, status) {
        let jsonStr;
        let errCode;
        let errBlk;
        let fab;
        let lab;
        let retcode;
        if ((json).length == 0) {
            errCode = await this.get_errorType();
            errBlk = -1;
            fab = -1;
            lab = -1;
        }
        else {
            jsonStr = this._yapi.imm_bin2str(json);
            errCode = YAPIContext.imm_atoi(this.imm_json_get_key(json, 'err'));
            errBlk = YAPIContext.imm_atoi(this.imm_json_get_key(json, 'errBlk')) - 1;
            if ((jsonStr).indexOf('"fab":') >= 0) {
                fab = YAPIContext.imm_atoi(this.imm_json_get_key(json, 'fab')) - 1;
                lab = YAPIContext.imm_atoi(this.imm_json_get_key(json, 'lab')) - 1;
            }
            else {
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
    async reset() {
        let json;
        let status;
        status = new YRfidStatus();
        json = await this._download('rfid.json?a=reset');
        return await this._chkerror('', json, status);
    }
    /**
     * Returns the list of RFID tags currently detected by the reader.
     *
     * @return a list of strings, corresponding to each tag identifier.
     *
     * On failure, throws an exception or returns an empty list.
     */
    async get_tagIdList() {
        let json;
        let jsonList = [];
        let taglist = [];
        json = await this._download('rfid.json?a=list');
        taglist.length = 0;
        if ((json).length > 3) {
            jsonList = this.imm_json_get_array(json);
            for (let ii in jsonList) {
                taglist.push(this.imm_json_get_string(this._yapi.imm_str2bin(jsonList[ii])));
            }
        }
        return taglist;
    }
    /**
     * Retourne la description des propriétés d'un tag RFID présent.
     * Cette fonction peut causer des communications avec le tag.
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
    async get_tagInfo(tagId, status) {
        let url;
        let json;
        let tagType;
        let size;
        let usable;
        let blksize;
        let fblk;
        let lblk;
        let res;
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
     * Change an RFID tag configuration to prevents any further write to
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
    async tagLockBlocks(tagId, firstBlock, nBlocks, options, status) {
        let optstr;
        let url;
        let json;
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
    async get_tagLockState(tagId, firstBlock, nBlocks, options, status) {
        let optstr;
        let url;
        let json;
        let binRes;
        let res = [];
        let idx;
        let val;
        let isLocked;
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
            val = binRes[((idx) >> (3))];
            isLocked = (((val) & (((1) << (((idx) & (7)))))) != 0);
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
    async get_tagSpecialBlocks(tagId, firstBlock, nBlocks, options, status) {
        let optstr;
        let url;
        let json;
        let binRes;
        let res = [];
        let idx;
        let val;
        let isLocked;
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
            val = binRes[((idx) >> (3))];
            isLocked = (((val) & (((1) << (((idx) & (7)))))) != 0);
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
     * If you rather want to read special blocks, use EnableRawAccess option.
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
    async tagReadHex(tagId, firstBlock, nBytes, options, status) {
        let optstr;
        let url;
        let json;
        let hexbuf;
        optstr = options.imm_getParams();
        url = 'rfid.json?a=read&t=' + tagId + '&b=' + String(Math.round(firstBlock)) + '&n=' + String(Math.round(nBytes)) + '' + optstr;
        json = await this._download(url);
        await this._chkerror(tagId, json, status);
        if (await status.get_yapiError() == this._yapi.SUCCESS) {
            hexbuf = this.imm_json_get_key(json, 'res');
        }
        else {
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
     * If you rather want to read special blocks, use EnableRawAccess option.
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
    async tagReadBin(tagId, firstBlock, nBytes, options, status) {
        return this._yapi.imm_hexstr2bin(await this.tagReadHex(tagId, firstBlock, nBytes, options, status));
    }
    /**
     * Reads data from an RFID tag memory, as a byte list. The read operation
     * may span accross multiple blocks if the requested number of bytes
     * is larger than the RFID tag block size.  By default
     * firstBlock cannot be a special block, and any special block encountered
     * in the middle of the read operation will be skipped automatically.
     * If you rather want to read special blocks, use EnableRawAccess option.
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
    async tagReadArray(tagId, firstBlock, nBytes, options, status) {
        let blk;
        let idx;
        let endidx;
        let res = [];
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
     * If you rather want to read special blocks, use EnableRawAccess option.
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
    async tagReadStr(tagId, firstBlock, nChars, options, status) {
        return this._yapi.imm_bin2str(await this.tagReadBin(tagId, firstBlock, nChars, options, status));
    }
    /**
     * Writes data provided as a binary buffer to an RFID tag memory.
     * The write operation may span accross multiple blocks if the
     * number of bytes to write is larger than the RFID tag block size.
     * By default firstBlock cannot be a special block, and any special block
     * encountered in the middle of the write operation will be skipped
     * automatically. If you rather want to rewrite special blocks as well,
     * use EnableRawAccess option.
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
    async tagWriteBin(tagId, firstBlock, buff, options, status) {
        let optstr;
        let hexstr;
        let buflen;
        let fname;
        let json;
        buflen = (buff).length;
        if (buflen <= 16) {
            // short data, use an URL-based command
            hexstr = this._yapi.imm_bin2hexstr(buff);
            return await this.tagWriteHex(tagId, firstBlock, hexstr, options, status);
        }
        else {
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
     * automatically. If you rather want to rewrite special blocks as well,
     * use EnableRawAccess option.
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
    async tagWriteArray(tagId, firstBlock, byteList, options, status) {
        let bufflen;
        let buff;
        let idx;
        let hexb;
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
     * automatically. If you rather want to rewrite special blocks as well,
     * use EnableRawAccess option.
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
    async tagWriteHex(tagId, firstBlock, hexString, options, status) {
        let bufflen;
        let optstr;
        let url;
        let json;
        let buff;
        let idx;
        let hexb;
        bufflen = (hexString).length;
        bufflen = ((bufflen) >> (1));
        if (bufflen <= 16) {
            // short data, use an URL-based command
            optstr = options.imm_getParams();
            url = 'rfid.json?a=writ&t=' + tagId + '&b=' + String(Math.round(firstBlock)) + '&w=' + hexString + '' + optstr;
            json = await this._download(url);
            return await this._chkerror(tagId, json, status);
        }
        else {
            // long data, use an upload command
            buff = new Uint8Array(bufflen);
            idx = 0;
            while (idx < bufflen) {
                hexb = parseInt((hexString).substr(2 * idx, 2), 16);
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
     * By default firstBlock cannot be a special block, and any special block
     * encountered in the middle of the write operation will be skipped
     * automatically. If you rather want to rewrite special blocks as well,
     * use EnableRawAccess option.
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
    async tagWriteStr(tagId, firstBlock, text, options, status) {
        let buff;
        buff = this._yapi.imm_str2bin(text);
        return await this.tagWriteBin(tagId, firstBlock, buff, options, status);
    }
    /**
     * Returns a string with last tag arrival/removal events observed.
     * This method return only events that are still buffered in the device memory.
     *
     * @return a string with last events observed (one per line).
     *
     * On failure, throws an exception or returns  YAPI.INVALID_STRING.
     */
    async get_lastEvents() {
        let content;
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
    async registerEventCallback(callback) {
        this._eventCallback = callback;
        this._isFirstCb = true;
        if (callback != null) {
            await this.registerValueCallback(this._internalEventCallback);
        }
        else {
            await this.registerValueCallback(null);
        }
        return 0;
    }
    async _internalEventHandler(cbVal) {
        let cbPos;
        let cbDPos;
        let url;
        let content;
        let contentStr;
        let eventArr = [];
        let arrLen;
        let lenStr;
        let arrPos;
        let eventStr;
        let eventLen;
        let hexStamp;
        let typePos;
        let dataPos;
        let intStamp;
        let binMStamp;
        let msStamp;
        let evtStamp;
        let evtType;
        let evtData;
        // detect possible power cycle of the reader to clear event pointer
        cbPos = YAPIContext.imm_atoi(cbVal);
        cbPos = (((cbPos) / (1000)) >> 0);
        cbDPos = ((cbPos - this._prevCbPos) & (0x7ffff));
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
            lenStr = (lenStr).substr(1, (lenStr).length - 1);
            // update processed event position pointer
            this._eventPos = YAPIContext.imm_atoi(lenStr);
        }
        else {
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
            lenStr = (lenStr).substr(1, (lenStr).length - 1);
            // update processed event position pointer
            this._eventPos = YAPIContext.imm_atoi(lenStr);
        }
        // now generate callbacks for each real event
        while (arrPos < arrLen) {
            eventStr = eventArr[arrPos];
            eventLen = (eventStr).length;
            typePos = (eventStr).indexOf(':') + 1;
            if ((eventLen >= 14) && (typePos > 10)) {
                hexStamp = (eventStr).substr(0, 8);
                intStamp = parseInt(hexStamp, 16);
                if (intStamp >= this._eventStamp) {
                    this._eventStamp = intStamp;
                    binMStamp = this._yapi.imm_str2bin((eventStr).substr(8, 2));
                    msStamp = (binMStamp[0] - 64) * 32 + binMStamp[1];
                    evtStamp = intStamp + (0.001 * msStamp);
                    dataPos = (eventStr).indexOf('=') + 1;
                    evtType = (eventStr).substr(typePos, 1);
                    evtData = '';
                    if (dataPos > 10) {
                        evtData = (eventStr).substr(dataPos, eventLen - dataPos);
                    }
                    if (this._eventCallback != null) {
                        try {
                            await this._eventCallback(this, evtStamp, evtType, evtData);
                        }
                        catch (e) {
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
    nextRfidReader() {
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != YAPI.SUCCESS)
            return null;
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if (next_hwid == null)
            return null;
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
    static FirstRfidReader() {
        let next_hwid = YAPI.imm_getFirstHardwareId('RfidReader');
        if (next_hwid == null)
            return null;
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
    static FirstRfidReaderInContext(yctx) {
        let next_hwid = yctx.imm_getFirstHardwareId('RfidReader');
        if (next_hwid == null)
            return null;
        return YRfidReader.FindRfidReaderInContext(yctx, next_hwid);
    }
}
// API symbols as static members
YRfidReader.NTAGS_INVALID = YAPI.INVALID_UINT;
YRfidReader.REFRESHRATE_INVALID = YAPI.INVALID_UINT;
//# sourceMappingURL=yocto_rfidreader.js.map