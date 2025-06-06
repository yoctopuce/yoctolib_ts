/*********************************************************************
 *
 *  $Id: yocto_cellular.ts 64863 2025-03-05 14:06:40Z mvuilleu $
 *
 *  Implements the high-level API for CellRecord functions
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
 * YCellRecord Class: Cellular antenna description, returned by cellular.quickCellSurvey method
 *
 * YCellRecord objects are used to describe a wireless network.
 * These objects are used in particular in conjunction with the
 * YCellular class.
 */
export declare class YCellRecord {
    _oper: string;
    _mcc: number;
    _mnc: number;
    _lac: number;
    _cid: number;
    _dbm: number;
    _tad: number;
    constructor(int_mcc: number, int_mnc: number, int_lac: number, int_cellId: number, int_dbm: number, int_tad: number, str_oper: string);
    /**
     * Returns the name of the the cell operator, as received from the network.
     *
     * @return a string with the name of the the cell operator.
     */
    get_cellOperator(): string;
    /**
     * Returns the Mobile Country Code (MCC). The MCC is a unique identifier for each country.
     *
     * @return an integer corresponding to the Mobile Country Code (MCC).
     */
    get_mobileCountryCode(): number;
    /**
     * Returns the Mobile Network Code (MNC). The MNC is a unique identifier for each phone
     * operator within a country.
     *
     * @return an integer corresponding to the Mobile Network Code (MNC).
     */
    get_mobileNetworkCode(): number;
    /**
     * Returns the Location Area Code (LAC). The LAC is a unique identifier for each
     * place within a country.
     *
     * @return an integer corresponding to the Location Area Code (LAC).
     */
    get_locationAreaCode(): number;
    /**
     * Returns the Cell ID. The Cell ID is a unique identifier for each
     * base transmission station within a LAC.
     *
     * @return an integer corresponding to the Cell Id.
     */
    get_cellId(): number;
    /**
     * Returns the signal strength, measured in dBm.
     *
     * @return an integer corresponding to the signal strength.
     */
    get_signalStrength(): number;
    /**
     * Returns the Timing Advance (TA). The TA corresponds to the time necessary
     * for the signal to reach the base station from the device.
     * Each increment corresponds about to 550m of distance.
     *
     * @return an integer corresponding to the Timing Advance (TA).
     */
    get_timingAdvance(): number;
}
export declare namespace YCellRecord {
}
/**
 * YCellular Class: cellular interface control interface, available for instance in the
 * YoctoHub-GSM-2G, the YoctoHub-GSM-3G-EU, the YoctoHub-GSM-3G-NA or the YoctoHub-GSM-4G
 *
 * The YCellular class provides control over cellular network parameters
 * and status for devices that are GSM-enabled.
 * Note that TCP/IP parameters are configured separately, using class YNetwork.
 */
/** @extends {YFunction} **/
export declare class YCellular extends YFunction {
    _className: string;
    _linkQuality: number;
    _cellOperator: string;
    _cellIdentifier: string;
    _cellType: YCellular.CELLTYPE;
    _imsi: string;
    _message: string;
    _pin: string;
    _radioConfig: string;
    _lockedOperator: string;
    _airplaneMode: YCellular.AIRPLANEMODE;
    _enableData: YCellular.ENABLEDATA;
    _apn: string;
    _apnSecret: string;
    _pingInterval: number;
    _dataSent: number;
    _dataReceived: number;
    _command: string;
    _valueCallbackCellular: YCellular.ValueCallback | null;
    readonly LINKQUALITY_INVALID: number;
    readonly CELLOPERATOR_INVALID: string;
    readonly CELLIDENTIFIER_INVALID: string;
    readonly CELLTYPE_GPRS: YCellular.CELLTYPE;
    readonly CELLTYPE_EGPRS: YCellular.CELLTYPE;
    readonly CELLTYPE_WCDMA: YCellular.CELLTYPE;
    readonly CELLTYPE_HSDPA: YCellular.CELLTYPE;
    readonly CELLTYPE_NONE: YCellular.CELLTYPE;
    readonly CELLTYPE_CDMA: YCellular.CELLTYPE;
    readonly CELLTYPE_LTE_M: YCellular.CELLTYPE;
    readonly CELLTYPE_NB_IOT: YCellular.CELLTYPE;
    readonly CELLTYPE_EC_GSM_IOT: YCellular.CELLTYPE;
    readonly CELLTYPE_INVALID: YCellular.CELLTYPE;
    readonly IMSI_INVALID: string;
    readonly MESSAGE_INVALID: string;
    readonly PIN_INVALID: string;
    readonly RADIOCONFIG_INVALID: string;
    readonly LOCKEDOPERATOR_INVALID: string;
    readonly AIRPLANEMODE_OFF: YCellular.AIRPLANEMODE;
    readonly AIRPLANEMODE_ON: YCellular.AIRPLANEMODE;
    readonly AIRPLANEMODE_INVALID: YCellular.AIRPLANEMODE;
    readonly ENABLEDATA_HOMENETWORK: YCellular.ENABLEDATA;
    readonly ENABLEDATA_ROAMING: YCellular.ENABLEDATA;
    readonly ENABLEDATA_NEVER: YCellular.ENABLEDATA;
    readonly ENABLEDATA_NEUTRALITY: YCellular.ENABLEDATA;
    readonly ENABLEDATA_INVALID: YCellular.ENABLEDATA;
    readonly APN_INVALID: string;
    readonly APNSECRET_INVALID: string;
    readonly PINGINTERVAL_INVALID: number;
    readonly DATASENT_INVALID: number;
    readonly DATARECEIVED_INVALID: number;
    readonly COMMAND_INVALID: string;
    static readonly LINKQUALITY_INVALID: number;
    static readonly CELLOPERATOR_INVALID: string;
    static readonly CELLIDENTIFIER_INVALID: string;
    static readonly CELLTYPE_GPRS: YCellular.CELLTYPE;
    static readonly CELLTYPE_EGPRS: YCellular.CELLTYPE;
    static readonly CELLTYPE_WCDMA: YCellular.CELLTYPE;
    static readonly CELLTYPE_HSDPA: YCellular.CELLTYPE;
    static readonly CELLTYPE_NONE: YCellular.CELLTYPE;
    static readonly CELLTYPE_CDMA: YCellular.CELLTYPE;
    static readonly CELLTYPE_LTE_M: YCellular.CELLTYPE;
    static readonly CELLTYPE_NB_IOT: YCellular.CELLTYPE;
    static readonly CELLTYPE_EC_GSM_IOT: YCellular.CELLTYPE;
    static readonly CELLTYPE_INVALID: YCellular.CELLTYPE;
    static readonly IMSI_INVALID: string;
    static readonly MESSAGE_INVALID: string;
    static readonly PIN_INVALID: string;
    static readonly RADIOCONFIG_INVALID: string;
    static readonly LOCKEDOPERATOR_INVALID: string;
    static readonly AIRPLANEMODE_OFF: YCellular.AIRPLANEMODE;
    static readonly AIRPLANEMODE_ON: YCellular.AIRPLANEMODE;
    static readonly AIRPLANEMODE_INVALID: YCellular.AIRPLANEMODE;
    static readonly ENABLEDATA_HOMENETWORK: YCellular.ENABLEDATA;
    static readonly ENABLEDATA_ROAMING: YCellular.ENABLEDATA;
    static readonly ENABLEDATA_NEVER: YCellular.ENABLEDATA;
    static readonly ENABLEDATA_NEUTRALITY: YCellular.ENABLEDATA;
    static readonly ENABLEDATA_INVALID: YCellular.ENABLEDATA;
    static readonly APN_INVALID: string;
    static readonly APNSECRET_INVALID: string;
    static readonly PINGINTERVAL_INVALID: number;
    static readonly DATASENT_INVALID: number;
    static readonly DATARECEIVED_INVALID: number;
    static readonly COMMAND_INVALID: string;
    constructor(yapi: YAPIContext, func: string);
    imm_parseAttr(name: string, val: any): number;
    /**
     * Returns the link quality, expressed in percent.
     *
     * @return an integer corresponding to the link quality, expressed in percent
     *
     * On failure, throws an exception or returns YCellular.LINKQUALITY_INVALID.
     */
    get_linkQuality(): Promise<number>;
    /**
     * Returns the name of the cell operator currently in use.
     *
     * @return a string corresponding to the name of the cell operator currently in use
     *
     * On failure, throws an exception or returns YCellular.CELLOPERATOR_INVALID.
     */
    get_cellOperator(): Promise<string>;
    /**
     * Returns the unique identifier of the cellular antenna in use: MCC, MNC, LAC and Cell ID.
     *
     * @return a string corresponding to the unique identifier of the cellular antenna in use: MCC, MNC,
     * LAC and Cell ID
     *
     * On failure, throws an exception or returns YCellular.CELLIDENTIFIER_INVALID.
     */
    get_cellIdentifier(): Promise<string>;
    /**
     * Active cellular connection type.
     *
     * @return a value among YCellular.CELLTYPE_GPRS, YCellular.CELLTYPE_EGPRS, YCellular.CELLTYPE_WCDMA,
     * YCellular.CELLTYPE_HSDPA, YCellular.CELLTYPE_NONE, YCellular.CELLTYPE_CDMA,
     * YCellular.CELLTYPE_LTE_M, YCellular.CELLTYPE_NB_IOT and YCellular.CELLTYPE_EC_GSM_IOT
     *
     * On failure, throws an exception or returns YCellular.CELLTYPE_INVALID.
     */
    get_cellType(): Promise<YCellular.CELLTYPE>;
    /**
     * Returns the International Mobile Subscriber Identity (MSI) that uniquely identifies
     * the SIM card. The first 3 digits represent the mobile country code (MCC), which
     * is followed by the mobile network code (MNC), either 2-digit (European standard)
     * or 3-digit (North American standard)
     *
     * @return a string corresponding to the International Mobile Subscriber Identity (MSI) that uniquely identifies
     *         the SIM card
     *
     * On failure, throws an exception or returns YCellular.IMSI_INVALID.
     */
    get_imsi(): Promise<string>;
    /**
     * Returns the latest status message from the wireless interface.
     *
     * @return a string corresponding to the latest status message from the wireless interface
     *
     * On failure, throws an exception or returns YCellular.MESSAGE_INVALID.
     */
    get_message(): Promise<string>;
    /**
     * Returns an opaque string if a PIN code has been configured in the device to access
     * the SIM card, or an empty string if none has been configured or if the code provided
     * was rejected by the SIM card.
     *
     * @return a string corresponding to an opaque string if a PIN code has been configured in the device to access
     *         the SIM card, or an empty string if none has been configured or if the code provided
     *         was rejected by the SIM card
     *
     * On failure, throws an exception or returns YCellular.PIN_INVALID.
     */
    get_pin(): Promise<string>;
    /**
     * Changes the PIN code used by the module to access the SIM card.
     * This function does not change the code on the SIM card itself, but only changes
     * the parameter used by the device to try to get access to it. If the SIM code
     * does not work immediately on first try, it will be automatically forgotten
     * and the message will be set to "Enter SIM PIN". The method should then be
     * invoked again with right correct PIN code. After three failed attempts in a row,
     * the message is changed to "Enter SIM PUK" and the SIM card PUK code must be
     * provided using method sendPUK.
     *
     * Remember to call the saveToFlash() method of the module to save the
     * new value in the device flash.
     *
     * @param newval : a string corresponding to the PIN code used by the module to access the SIM card
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_pin(newval: string): Promise<number>;
    /**
     * Returns the type of protocol used over the serial line, as a string.
     * Possible values are "Line" for ASCII messages separated by CR and/or LF,
     * "Frame:[timeout]ms" for binary messages separated by a delay time,
     * "Char" for a continuous ASCII stream or
     * "Byte" for a continuous binary stream.
     *
     * @return a string corresponding to the type of protocol used over the serial line, as a string
     *
     * On failure, throws an exception or returns YCellular.RADIOCONFIG_INVALID.
     */
    get_radioConfig(): Promise<string>;
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
    set_radioConfig(newval: string): Promise<number>;
    /**
     * Returns the name of the only cell operator to use if automatic choice is disabled,
     * or an empty string if the SIM card will automatically choose among available
     * cell operators.
     *
     * @return a string corresponding to the name of the only cell operator to use if automatic choice is disabled,
     *         or an empty string if the SIM card will automatically choose among available
     *         cell operators
     *
     * On failure, throws an exception or returns YCellular.LOCKEDOPERATOR_INVALID.
     */
    get_lockedOperator(): Promise<string>;
    /**
     * Changes the name of the cell operator to be used. If the name is an empty
     * string, the choice will be made automatically based on the SIM card. Otherwise,
     * the selected operator is the only one that will be used.
     * Remember to call the saveToFlash()
     * method of the module if the modification must be kept.
     *
     * @param newval : a string corresponding to the name of the cell operator to be used
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_lockedOperator(newval: string): Promise<number>;
    /**
     * Returns true if the airplane mode is active (radio turned off).
     *
     * @return either YCellular.AIRPLANEMODE_OFF or YCellular.AIRPLANEMODE_ON, according to true if the
     * airplane mode is active (radio turned off)
     *
     * On failure, throws an exception or returns YCellular.AIRPLANEMODE_INVALID.
     */
    get_airplaneMode(): Promise<YCellular.AIRPLANEMODE>;
    /**
     * Changes the activation state of airplane mode (radio turned off).
     *
     * @param newval : either YCellular.AIRPLANEMODE_OFF or YCellular.AIRPLANEMODE_ON, according to the
     * activation state of airplane mode (radio turned off)
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_airplaneMode(newval: YCellular.AIRPLANEMODE): Promise<number>;
    /**
     * Returns the condition for enabling IP data services (GPRS).
     * When data services are disabled, SMS are the only mean of communication.
     *
     * @return a value among YCellular.ENABLEDATA_HOMENETWORK, YCellular.ENABLEDATA_ROAMING,
     * YCellular.ENABLEDATA_NEVER and YCellular.ENABLEDATA_NEUTRALITY corresponding to the condition for
     * enabling IP data services (GPRS)
     *
     * On failure, throws an exception or returns YCellular.ENABLEDATA_INVALID.
     */
    get_enableData(): Promise<YCellular.ENABLEDATA>;
    /**
     * Changes the condition for enabling IP data services (GPRS).
     * The service can be either fully deactivated, or limited to the SIM home network,
     * or enabled for all partner networks (roaming). Caution: enabling data services
     * on roaming networks may cause prohibitive communication costs !
     *
     * When data services are disabled, SMS are the only mean of communication.
     * Remember to call the saveToFlash()
     * method of the module if the modification must be kept.
     *
     * @param newval : a value among YCellular.ENABLEDATA_HOMENETWORK, YCellular.ENABLEDATA_ROAMING,
     * YCellular.ENABLEDATA_NEVER and YCellular.ENABLEDATA_NEUTRALITY corresponding to the condition for
     * enabling IP data services (GPRS)
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_enableData(newval: YCellular.ENABLEDATA): Promise<number>;
    /**
     * Returns the Access Point Name (APN) to be used, if needed.
     * When left blank, the APN suggested by the cell operator will be used.
     *
     * @return a string corresponding to the Access Point Name (APN) to be used, if needed
     *
     * On failure, throws an exception or returns YCellular.APN_INVALID.
     */
    get_apn(): Promise<string>;
    /**
     * Returns the Access Point Name (APN) to be used, if needed.
     * When left blank, the APN suggested by the cell operator will be used.
     * Remember to call the saveToFlash()
     * method of the module if the modification must be kept.
     *
     * @param newval : a string
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_apn(newval: string): Promise<number>;
    /**
     * Returns an opaque string if APN authentication parameters have been configured
     * in the device, or an empty string otherwise.
     * To configure these parameters, use set_apnAuth().
     *
     * @return a string corresponding to an opaque string if APN authentication parameters have been configured
     *         in the device, or an empty string otherwise
     *
     * On failure, throws an exception or returns YCellular.APNSECRET_INVALID.
     */
    get_apnSecret(): Promise<string>;
    set_apnSecret(newval: string): Promise<number>;
    /**
     * Returns the automated connectivity check interval, in seconds.
     *
     * @return an integer corresponding to the automated connectivity check interval, in seconds
     *
     * On failure, throws an exception or returns YCellular.PINGINTERVAL_INVALID.
     */
    get_pingInterval(): Promise<number>;
    /**
     * Changes the automated connectivity check interval, in seconds.
     * Remember to call the saveToFlash()
     * method of the module if the modification must be kept.
     *
     * @param newval : an integer corresponding to the automated connectivity check interval, in seconds
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_pingInterval(newval: number): Promise<number>;
    /**
     * Returns the number of bytes sent so far.
     *
     * @return an integer corresponding to the number of bytes sent so far
     *
     * On failure, throws an exception or returns YCellular.DATASENT_INVALID.
     */
    get_dataSent(): Promise<number>;
    /**
     * Changes the value of the outgoing data counter.
     *
     * @param newval : an integer corresponding to the value of the outgoing data counter
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_dataSent(newval: number): Promise<number>;
    /**
     * Returns the number of bytes received so far.
     *
     * @return an integer corresponding to the number of bytes received so far
     *
     * On failure, throws an exception or returns YCellular.DATARECEIVED_INVALID.
     */
    get_dataReceived(): Promise<number>;
    /**
     * Changes the value of the incoming data counter.
     *
     * @param newval : an integer corresponding to the value of the incoming data counter
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_dataReceived(newval: number): Promise<number>;
    get_command(): Promise<string>;
    set_command(newval: string): Promise<number>;
    /**
     * Retrieves a cellular interface for a given identifier.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the cellular interface is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YCellular.isOnline() to test if the cellular interface is
     * indeed online at a given time. In case of ambiguity when looking for
     * a cellular interface by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the cellular interface, for instance
     *         YHUBGSM1.cellular.
     *
     * @return a YCellular object allowing you to drive the cellular interface.
     */
    static FindCellular(func: string): YCellular;
    /**
     * Retrieves a cellular interface for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the cellular interface is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YCellular.isOnline() to test if the cellular interface is
     * indeed online at a given time. In case of ambiguity when looking for
     * a cellular interface by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx : a YAPI context
     * @param func : a string that uniquely characterizes the cellular interface, for instance
     *         YHUBGSM1.cellular.
     *
     * @return a YCellular object allowing you to drive the cellular interface.
     */
    static FindCellularInContext(yctx: YAPIContext, func: string): YCellular;
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
    registerValueCallback(callback: YCellular.ValueCallback | null): Promise<number>;
    _invokeValueCallback(value: string): Promise<number>;
    /**
     * Sends a PUK code to unlock the SIM card after three failed PIN code attempts, and
     * set up a new PIN into the SIM card. Only ten consecutive tentatives are permitted:
     * after that, the SIM card will be blocked permanently without any mean of recovery
     * to use it again. Note that after calling this method, you have usually to invoke
     * method set_pin() to tell the YoctoHub which PIN to use in the future.
     *
     * @param puk : the SIM PUK code
     * @param newPin : new PIN code to configure into the SIM card
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    sendPUK(puk: string, newPin: string): Promise<number>;
    /**
     * Configure authentication parameters to connect to the APN. Both
     * PAP and CHAP authentication are supported.
     *
     * @param username : APN username
     * @param password : APN password
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_apnAuth(username: string, password: string): Promise<number>;
    /**
     * Clear the transmitted data counters.
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    clearDataCounters(): Promise<number>;
    /**
     * Sends an AT command to the GSM module and returns the command output.
     * The command will only execute when the GSM module is in standard
     * command state, and should leave it in the exact same state.
     * Use this function with great care !
     *
     * @param cmd : the AT command to execute, like for instance: "+CCLK?".
     *
     * @return a string with the result of the commands. Empty lines are
     *         automatically removed from the output.
     */
    _AT(cmd: string): Promise<string>;
    /**
     * Returns the list detected cell operators in the neighborhood.
     * This function will typically take between 30 seconds to 1 minute to
     * return. Note that any SIM card can usually only connect to specific
     * operators. All networks returned by this function might therefore
     * not be available for connection.
     *
     * @return a list of string (cell operator names).
     */
    get_availableOperators(): Promise<string[]>;
    /**
     * Returns a list of nearby cellular antennas, as required for quick
     * geolocation of the device. The first cell listed is the serving
     * cell, and the next ones are the neighbor cells reported by the
     * serving cell.
     *
     * @return a list of YCellRecords.
     */
    quickCellSurvey(): Promise<YCellRecord[]>;
    /**
     * Returns the cell operator brand for a given MCC/MNC pair (DEPRECATED).
     *
     * @param mccmnc : a string starting with a MCC code followed by a MNC code,
     *
     * @return a string containing the corresponding cell operator brand name.
     */
    decodePLMN(mccmnc: string): Promise<string>;
    /**
     * Returns the list available radio communication profiles, as a string array
     * (YoctoHub-GSM-4G only).
     * Each string is a made of a numerical ID, followed by a colon,
     * followed by the profile description.
     *
     * @return a list of string describing available radio communication profiles.
     */
    get_communicationProfiles(): Promise<string[]>;
    /**
     * Continues the enumeration of cellular interfaces started using yFirstCellular().
     * Caution: You can't make any assumption about the returned cellular interfaces order.
     * If you want to find a specific a cellular interface, use Cellular.findCellular()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YCellular object, corresponding to
     *         a cellular interface currently online, or a null pointer
     *         if there are no more cellular interfaces to enumerate.
     */
    nextCellular(): YCellular | null;
    /**
     * Starts the enumeration of cellular interfaces currently accessible.
     * Use the method YCellular.nextCellular() to iterate on
     * next cellular interfaces.
     *
     * @return a pointer to a YCellular object, corresponding to
     *         the first cellular interface currently online, or a null pointer
     *         if there are none.
     */
    static FirstCellular(): YCellular | null;
    /**
     * Starts the enumeration of cellular interfaces currently accessible.
     * Use the method YCellular.nextCellular() to iterate on
     * next cellular interfaces.
     *
     * @param yctx : a YAPI context.
     *
     * @return a pointer to a YCellular object, corresponding to
     *         the first cellular interface currently online, or a null pointer
     *         if there are none.
     */
    static FirstCellularInContext(yctx: YAPIContext): YCellular | null;
}
export declare namespace YCellular {
    const enum CELLTYPE {
        GPRS = 0,
        EGPRS = 1,
        WCDMA = 2,
        HSDPA = 3,
        NONE = 4,
        CDMA = 5,
        LTE_M = 6,
        NB_IOT = 7,
        EC_GSM_IOT = 8,
        INVALID = -1
    }
    const enum AIRPLANEMODE {
        OFF = 0,
        ON = 1,
        INVALID = -1
    }
    const enum ENABLEDATA {
        HOMENETWORK = 0,
        ROAMING = 1,
        NEVER = 2,
        NEUTRALITY = 3,
        INVALID = -1
    }
    interface ValueCallback {
        (func: YCellular, value: string): void;
    }
}
