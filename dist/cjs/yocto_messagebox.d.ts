/*********************************************************************
 *
 *  $Id: yocto_messagebox.ts 43483 2021-01-21 15:47:50Z mvuilleu $
 *
 *  Implements the high-level API for Sms functions
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
 * YSms Class: SMS message sent or received, returned by messageBox.get_messages or messageBox.newMessage
 *
 * YSms objects are used to describe an SMS message, received or to be sent.
 * These objects are used in particular in conjunction with the YMessageBox class.
 */
export declare class YSms {
    _yapi: YAPIContext;
    _mbox: YMessageBox;
    _slot: number;
    _deliv: boolean;
    _smsc: string;
    _mref: number;
    _orig: string;
    _dest: string;
    _pid: number;
    _alphab: number;
    _mclass: number;
    _stamp: string;
    _udh: Uint8Array;
    _udata: Uint8Array;
    _npdu: number;
    _pdu: Uint8Array;
    _parts: YSms[];
    _aggSig: string;
    _aggIdx: number;
    _aggCnt: number;
    constructor(obj_mbox: YMessageBox);
    get_slot(): Promise<number>;
    get_smsc(): Promise<string>;
    get_msgRef(): Promise<number>;
    get_sender(): Promise<string>;
    get_recipient(): Promise<string>;
    get_protocolId(): Promise<number>;
    isReceived(): Promise<boolean>;
    get_alphabet(): Promise<number>;
    get_msgClass(): Promise<number>;
    get_dcs(): Promise<number>;
    get_timestamp(): Promise<string>;
    get_userDataHeader(): Promise<Uint8Array>;
    get_userData(): Promise<Uint8Array>;
    /**
     * Returns the content of the message.
     *
     * @return  a string with the content of the message.
     */
    get_textData(): Promise<string>;
    get_unicodeData(): Promise<number[]>;
    get_partCount(): Promise<number>;
    get_pdu(): Promise<Uint8Array>;
    get_parts(): Promise<YSms[]>;
    get_concatSignature(): Promise<string>;
    get_concatIndex(): Promise<number>;
    get_concatCount(): Promise<number>;
    set_slot(val: number): Promise<number>;
    set_received(val: boolean): Promise<number>;
    set_smsc(val: string): Promise<number>;
    set_msgRef(val: number): Promise<number>;
    set_sender(val: string): Promise<number>;
    set_recipient(val: string): Promise<number>;
    set_protocolId(val: number): Promise<number>;
    set_alphabet(val: number): Promise<number>;
    set_msgClass(val: number): Promise<number>;
    set_dcs(val: number): Promise<number>;
    set_timestamp(val: string): Promise<number>;
    set_userDataHeader(val: Uint8Array): Promise<number>;
    set_userData(val: Uint8Array): Promise<number>;
    convertToUnicode(): Promise<number>;
    /**
     * Add a regular text to the SMS. This function support messages
     * of more than 160 characters. ISO-latin accented characters
     * are supported. For messages with special unicode characters such as asian
     * characters and emoticons, use the  addUnicodeData method.
     *
     * @param val : the text to be sent in the message
     *
     * @return YAPI.SUCCESS when the call succeeds.
     */
    addText(val: string): Promise<number>;
    /**
     * Add a unicode text to the SMS. This function support messages
     * of more than 160 characters, using SMS concatenation.
     *
     * @param val : an array of special unicode characters
     *
     * @return YAPI.SUCCESS when the call succeeds.
     */
    addUnicodeData(val: number[]): Promise<number>;
    set_pdu(pdu: Uint8Array): Promise<number>;
    set_parts(parts: YSms[]): Promise<number>;
    encodeAddress(addr: string): Promise<Uint8Array>;
    decodeAddress(addr: Uint8Array, ofs: number, siz: number): Promise<string>;
    encodeTimeStamp(exp: string): Promise<Uint8Array>;
    decodeTimeStamp(exp: Uint8Array, ofs: number, siz: number): Promise<string>;
    udataSize(): Promise<number>;
    encodeUserData(): Promise<Uint8Array>;
    generateParts(): Promise<number>;
    generatePdu(): Promise<number>;
    parseUserDataHeader(): Promise<number>;
    parsePdu(pdu: Uint8Array): Promise<number>;
    /**
     * Sends the SMS to the recipient. Messages of more than 160 characters are supported
     * using SMS concatenation.
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    send(): Promise<number>;
    deleteFromSIM(): Promise<number>;
}
export interface YMessageBoxValueCallback {
    (func: YMessageBox, value: string): void;
}
/**
 * YMessageBox Class: SMS message box interface control interface, available for instance in the
 * YoctoHub-GSM-2G, the YoctoHub-GSM-3G-EU, the YoctoHub-GSM-3G-NA or the YoctoHub-GSM-4G
 *
 * The YMessageBox class provides SMS sending and receiving capability for
 * GSM-enabled Yoctopuce devices.
 */
/** @extends {YFunction} **/
export declare class YMessageBox extends YFunction {
    _className: string;
    _slotsInUse: number;
    _slotsCount: number;
    _slotsBitmap: string;
    _pduSent: number;
    _pduReceived: number;
    _command: string;
    _valueCallbackMessageBox: YMessageBoxValueCallback | null;
    _nextMsgRef: number;
    _prevBitmapStr: string;
    _pdus: YSms[];
    _messages: YSms[];
    _gsm2unicodeReady: boolean;
    _gsm2unicode: number[];
    _iso2gsm: Uint8Array;
    readonly SLOTSINUSE_INVALID: number;
    readonly SLOTSCOUNT_INVALID: number;
    readonly SLOTSBITMAP_INVALID: string;
    readonly PDUSENT_INVALID: number;
    readonly PDURECEIVED_INVALID: number;
    readonly COMMAND_INVALID: string;
    static readonly SLOTSINUSE_INVALID: number;
    static readonly SLOTSCOUNT_INVALID: number;
    static readonly SLOTSBITMAP_INVALID: string;
    static readonly PDUSENT_INVALID: number;
    static readonly PDURECEIVED_INVALID: number;
    static readonly COMMAND_INVALID: string;
    constructor(yapi: YAPIContext, func: string);
    imm_parseAttr(name: string, val: any): 0 | 1;
    /**
     * Returns the number of message storage slots currently in use.
     *
     * @return an integer corresponding to the number of message storage slots currently in use
     *
     * On failure, throws an exception or returns YMessageBox.SLOTSINUSE_INVALID.
     */
    get_slotsInUse(): Promise<number>;
    /**
     * Returns the total number of message storage slots on the SIM card.
     *
     * @return an integer corresponding to the total number of message storage slots on the SIM card
     *
     * On failure, throws an exception or returns YMessageBox.SLOTSCOUNT_INVALID.
     */
    get_slotsCount(): Promise<number>;
    get_slotsBitmap(): Promise<string>;
    /**
     * Returns the number of SMS units sent so far.
     *
     * @return an integer corresponding to the number of SMS units sent so far
     *
     * On failure, throws an exception or returns YMessageBox.PDUSENT_INVALID.
     */
    get_pduSent(): Promise<number>;
    /**
     * Changes the value of the outgoing SMS units counter.
     *
     * @param newval : an integer corresponding to the value of the outgoing SMS units counter
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_pduSent(newval: number): Promise<number>;
    /**
     * Returns the number of SMS units received so far.
     *
     * @return an integer corresponding to the number of SMS units received so far
     *
     * On failure, throws an exception or returns YMessageBox.PDURECEIVED_INVALID.
     */
    get_pduReceived(): Promise<number>;
    /**
     * Changes the value of the incoming SMS units counter.
     *
     * @param newval : an integer corresponding to the value of the incoming SMS units counter
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_pduReceived(newval: number): Promise<number>;
    get_command(): Promise<string>;
    set_command(newval: string): Promise<number>;
    /**
     * Retrieves a SMS message box interface for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the SMS message box interface is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YMessageBox.isOnline() to test if the SMS message box interface is
     * indeed online at a given time. In case of ambiguity when looking for
     * a SMS message box interface by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the SMS message box interface, for instance
     *         YHUBGSM1.messageBox.
     *
     * @return a YMessageBox object allowing you to drive the SMS message box interface.
     */
    static FindMessageBox(func: string): YMessageBox;
    /**
     * Retrieves a SMS message box interface for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the SMS message box interface is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YMessageBox.isOnline() to test if the SMS message box interface is
     * indeed online at a given time. In case of ambiguity when looking for
     * a SMS message box interface by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx : a YAPI context
     * @param func : a string that uniquely characterizes the SMS message box interface, for instance
     *         YHUBGSM1.messageBox.
     *
     * @return a YMessageBox object allowing you to drive the SMS message box interface.
     */
    static FindMessageBoxInContext(yctx: YAPIContext, func: string): YMessageBox;
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
    registerValueCallback(callback: YMessageBoxValueCallback | null): Promise<number>;
    _invokeValueCallback(value: string): Promise<number>;
    nextMsgRef(): Promise<number>;
    clearSIMSlot(slot: number): Promise<number>;
    fetchPdu(slot: number): Promise<YSms>;
    initGsm2Unicode(): Promise<number>;
    gsm2unicode(gsm: Uint8Array): Promise<number[]>;
    gsm2str(gsm: Uint8Array): Promise<string>;
    str2gsm(msg: string): Promise<Uint8Array>;
    checkNewMessages(): Promise<number>;
    get_pdus(): Promise<YSms[]>;
    /**
     * Clear the SMS units counters.
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    clearPduCounters(): Promise<number>;
    /**
     * Sends a regular text SMS, with standard parameters. This function can send messages
     * of more than 160 characters, using SMS concatenation. ISO-latin accented characters
     * are supported. For sending messages with special unicode characters such as asian
     * characters and emoticons, use newMessage to create a new message and define
     * the content of using methods addText and addUnicodeData.
     *
     * @param recipient : a text string with the recipient phone number, either as a
     *         national number, or in international format starting with a plus sign
     * @param message : the text to be sent in the message
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    sendTextMessage(recipient: string, message: string): Promise<number>;
    /**
     * Sends a Flash SMS (class 0 message). Flash messages are displayed on the handset
     * immediately and are usually not saved on the SIM card. This function can send messages
     * of more than 160 characters, using SMS concatenation. ISO-latin accented characters
     * are supported. For sending messages with special unicode characters such as asian
     * characters and emoticons, use newMessage to create a new message and define
     * the content of using methods addText et addUnicodeData.
     *
     * @param recipient : a text string with the recipient phone number, either as a
     *         national number, or in international format starting with a plus sign
     * @param message : the text to be sent in the message
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    sendFlashMessage(recipient: string, message: string): Promise<number>;
    /**
     * Creates a new empty SMS message, to be configured and sent later on.
     *
     * @param recipient : a text string with the recipient phone number, either as a
     *         national number, or in international format starting with a plus sign
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    newMessage(recipient: string): Promise<YSms>;
    /**
     * Returns the list of messages received and not deleted. This function
     * will automatically decode concatenated SMS.
     *
     * @return an YSms object list.
     *
     * On failure, throws an exception or returns an empty list.
     */
    get_messages(): Promise<YSms[]>;
    /**
     * Continues the enumeration of SMS message box interfaces started using yFirstMessageBox().
     * Caution: You can't make any assumption about the returned SMS message box interfaces order.
     * If you want to find a specific a SMS message box interface, use MessageBox.findMessageBox()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YMessageBox object, corresponding to
     *         a SMS message box interface currently online, or a null pointer
     *         if there are no more SMS message box interfaces to enumerate.
     */
    nextMessageBox(): YMessageBox | null;
    /**
     * Starts the enumeration of SMS message box interfaces currently accessible.
     * Use the method YMessageBox.nextMessageBox() to iterate on
     * next SMS message box interfaces.
     *
     * @return a pointer to a YMessageBox object, corresponding to
     *         the first SMS message box interface currently online, or a null pointer
     *         if there are none.
     */
    static FirstMessageBox(): YMessageBox | null;
    /**
     * Starts the enumeration of SMS message box interfaces currently accessible.
     * Use the method YMessageBox.nextMessageBox() to iterate on
     * next SMS message box interfaces.
     *
     * @param yctx : a YAPI context.
     *
     * @return a pointer to a YMessageBox object, corresponding to
     *         the first SMS message box interface currently online, or a null pointer
     *         if there are none.
     */
    static FirstMessageBoxInContext(yctx: YAPIContext): YMessageBox | null;
}
