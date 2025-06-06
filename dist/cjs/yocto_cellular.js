"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.YCellular = exports.YCellRecord = void 0;
const yocto_api_js_1 = require("./yocto_api.js");
//--- (generated code: YCellRecord class start)
/**
 * YCellRecord Class: Cellular antenna description, returned by cellular.quickCellSurvey method
 *
 * YCellRecord objects are used to describe a wireless network.
 * These objects are used in particular in conjunction with the
 * YCellular class.
 */
//--- (end of generated code: YCellRecord class start)
class YCellRecord {
    // API symbols as static members
    //--- (end of generated code: YCellRecord attributes declaration)
    constructor(int_mcc, int_mnc, int_lac, int_cellId, int_dbm, int_tad, str_oper) {
        //--- (generated code: YCellRecord attributes declaration)
        this._oper = '';
        this._mcc = 0;
        this._mnc = 0;
        this._lac = 0;
        this._cid = 0;
        this._dbm = 0;
        this._tad = 0;
        //--- (generated code: YCellRecord constructor)
        //--- (end of generated code: YCellRecord constructor)
        this._oper = str_oper;
        this._mcc = int_mcc;
        this._mnc = int_mnc;
        this._lac = int_lac;
        this._cid = int_cellId;
        this._dbm = int_dbm;
        this._tad = int_tad;
    }
    //--- (generated code: YCellRecord implementation)
    /**
     * Returns the name of the the cell operator, as received from the network.
     *
     * @return a string with the name of the the cell operator.
     */
    get_cellOperator() {
        return this._oper;
    }
    /**
     * Returns the Mobile Country Code (MCC). The MCC is a unique identifier for each country.
     *
     * @return an integer corresponding to the Mobile Country Code (MCC).
     */
    get_mobileCountryCode() {
        return this._mcc;
    }
    /**
     * Returns the Mobile Network Code (MNC). The MNC is a unique identifier for each phone
     * operator within a country.
     *
     * @return an integer corresponding to the Mobile Network Code (MNC).
     */
    get_mobileNetworkCode() {
        return this._mnc;
    }
    /**
     * Returns the Location Area Code (LAC). The LAC is a unique identifier for each
     * place within a country.
     *
     * @return an integer corresponding to the Location Area Code (LAC).
     */
    get_locationAreaCode() {
        return this._lac;
    }
    /**
     * Returns the Cell ID. The Cell ID is a unique identifier for each
     * base transmission station within a LAC.
     *
     * @return an integer corresponding to the Cell Id.
     */
    get_cellId() {
        return this._cid;
    }
    /**
     * Returns the signal strength, measured in dBm.
     *
     * @return an integer corresponding to the signal strength.
     */
    get_signalStrength() {
        return this._dbm;
    }
    /**
     * Returns the Timing Advance (TA). The TA corresponds to the time necessary
     * for the signal to reach the base station from the device.
     * Each increment corresponds about to 550m of distance.
     *
     * @return an integer corresponding to the Timing Advance (TA).
     */
    get_timingAdvance() {
        return this._tad;
    }
}
exports.YCellRecord = YCellRecord;
//--- (generated code: YCellular class start)
/**
 * YCellular Class: cellular interface control interface, available for instance in the
 * YoctoHub-GSM-2G, the YoctoHub-GSM-3G-EU, the YoctoHub-GSM-3G-NA or the YoctoHub-GSM-4G
 *
 * The YCellular class provides control over cellular network parameters
 * and status for devices that are GSM-enabled.
 * Note that TCP/IP parameters are configured separately, using class YNetwork.
 */
//--- (end of generated code: YCellular class start)
/** @extends {YFunction} **/
class YCellular extends yocto_api_js_1.YFunction {
    //--- (end of generated code: YCellular attributes declaration)
    constructor(yapi, func) {
        //--- (generated code: YCellular constructor)
        super(yapi, func);
        this._linkQuality = YCellular.LINKQUALITY_INVALID;
        this._cellOperator = YCellular.CELLOPERATOR_INVALID;
        this._cellIdentifier = YCellular.CELLIDENTIFIER_INVALID;
        this._cellType = YCellular.CELLTYPE_INVALID;
        this._imsi = YCellular.IMSI_INVALID;
        this._message = YCellular.MESSAGE_INVALID;
        this._pin = YCellular.PIN_INVALID;
        this._radioConfig = YCellular.RADIOCONFIG_INVALID;
        this._lockedOperator = YCellular.LOCKEDOPERATOR_INVALID;
        this._airplaneMode = YCellular.AIRPLANEMODE_INVALID;
        this._enableData = YCellular.ENABLEDATA_INVALID;
        this._apn = YCellular.APN_INVALID;
        this._apnSecret = YCellular.APNSECRET_INVALID;
        this._pingInterval = YCellular.PINGINTERVAL_INVALID;
        this._dataSent = YCellular.DATASENT_INVALID;
        this._dataReceived = YCellular.DATARECEIVED_INVALID;
        this._command = YCellular.COMMAND_INVALID;
        this._valueCallbackCellular = null;
        // API symbols as object properties
        this.LINKQUALITY_INVALID = yocto_api_js_1.YAPI.INVALID_UINT;
        this.CELLOPERATOR_INVALID = yocto_api_js_1.YAPI.INVALID_STRING;
        this.CELLIDENTIFIER_INVALID = yocto_api_js_1.YAPI.INVALID_STRING;
        this.CELLTYPE_GPRS = 0;
        this.CELLTYPE_EGPRS = 1;
        this.CELLTYPE_WCDMA = 2;
        this.CELLTYPE_HSDPA = 3;
        this.CELLTYPE_NONE = 4;
        this.CELLTYPE_CDMA = 5;
        this.CELLTYPE_LTE_M = 6;
        this.CELLTYPE_NB_IOT = 7;
        this.CELLTYPE_EC_GSM_IOT = 8;
        this.CELLTYPE_INVALID = -1;
        this.IMSI_INVALID = yocto_api_js_1.YAPI.INVALID_STRING;
        this.MESSAGE_INVALID = yocto_api_js_1.YAPI.INVALID_STRING;
        this.PIN_INVALID = yocto_api_js_1.YAPI.INVALID_STRING;
        this.RADIOCONFIG_INVALID = yocto_api_js_1.YAPI.INVALID_STRING;
        this.LOCKEDOPERATOR_INVALID = yocto_api_js_1.YAPI.INVALID_STRING;
        this.AIRPLANEMODE_OFF = 0;
        this.AIRPLANEMODE_ON = 1;
        this.AIRPLANEMODE_INVALID = -1;
        this.ENABLEDATA_HOMENETWORK = 0;
        this.ENABLEDATA_ROAMING = 1;
        this.ENABLEDATA_NEVER = 2;
        this.ENABLEDATA_NEUTRALITY = 3;
        this.ENABLEDATA_INVALID = -1;
        this.APN_INVALID = yocto_api_js_1.YAPI.INVALID_STRING;
        this.APNSECRET_INVALID = yocto_api_js_1.YAPI.INVALID_STRING;
        this.PINGINTERVAL_INVALID = yocto_api_js_1.YAPI.INVALID_UINT;
        this.DATASENT_INVALID = yocto_api_js_1.YAPI.INVALID_UINT;
        this.DATARECEIVED_INVALID = yocto_api_js_1.YAPI.INVALID_UINT;
        this.COMMAND_INVALID = yocto_api_js_1.YAPI.INVALID_STRING;
        this._className = 'Cellular';
        //--- (end of generated code: YCellular constructor)
    }
    //--- (generated code: YCellular implementation)
    imm_parseAttr(name, val) {
        switch (name) {
            case 'linkQuality':
                this._linkQuality = val;
                return 1;
            case 'cellOperator':
                this._cellOperator = val;
                return 1;
            case 'cellIdentifier':
                this._cellIdentifier = val;
                return 1;
            case 'cellType':
                this._cellType = val;
                return 1;
            case 'imsi':
                this._imsi = val;
                return 1;
            case 'message':
                this._message = val;
                return 1;
            case 'pin':
                this._pin = val;
                return 1;
            case 'radioConfig':
                this._radioConfig = val;
                return 1;
            case 'lockedOperator':
                this._lockedOperator = val;
                return 1;
            case 'airplaneMode':
                this._airplaneMode = val;
                return 1;
            case 'enableData':
                this._enableData = val;
                return 1;
            case 'apn':
                this._apn = val;
                return 1;
            case 'apnSecret':
                this._apnSecret = val;
                return 1;
            case 'pingInterval':
                this._pingInterval = val;
                return 1;
            case 'dataSent':
                this._dataSent = val;
                return 1;
            case 'dataReceived':
                this._dataReceived = val;
                return 1;
            case 'command':
                this._command = val;
                return 1;
        }
        return super.imm_parseAttr(name, val);
    }
    /**
     * Returns the link quality, expressed in percent.
     *
     * @return an integer corresponding to the link quality, expressed in percent
     *
     * On failure, throws an exception or returns YCellular.LINKQUALITY_INVALID.
     */
    async get_linkQuality() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YCellular.LINKQUALITY_INVALID;
            }
        }
        res = this._linkQuality;
        return res;
    }
    /**
     * Returns the name of the cell operator currently in use.
     *
     * @return a string corresponding to the name of the cell operator currently in use
     *
     * On failure, throws an exception or returns YCellular.CELLOPERATOR_INVALID.
     */
    async get_cellOperator() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YCellular.CELLOPERATOR_INVALID;
            }
        }
        res = this._cellOperator;
        return res;
    }
    /**
     * Returns the unique identifier of the cellular antenna in use: MCC, MNC, LAC and Cell ID.
     *
     * @return a string corresponding to the unique identifier of the cellular antenna in use: MCC, MNC,
     * LAC and Cell ID
     *
     * On failure, throws an exception or returns YCellular.CELLIDENTIFIER_INVALID.
     */
    async get_cellIdentifier() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YCellular.CELLIDENTIFIER_INVALID;
            }
        }
        res = this._cellIdentifier;
        return res;
    }
    /**
     * Active cellular connection type.
     *
     * @return a value among YCellular.CELLTYPE_GPRS, YCellular.CELLTYPE_EGPRS, YCellular.CELLTYPE_WCDMA,
     * YCellular.CELLTYPE_HSDPA, YCellular.CELLTYPE_NONE, YCellular.CELLTYPE_CDMA,
     * YCellular.CELLTYPE_LTE_M, YCellular.CELLTYPE_NB_IOT and YCellular.CELLTYPE_EC_GSM_IOT
     *
     * On failure, throws an exception or returns YCellular.CELLTYPE_INVALID.
     */
    async get_cellType() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YCellular.CELLTYPE_INVALID;
            }
        }
        res = this._cellType;
        return res;
    }
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
    async get_imsi() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YCellular.IMSI_INVALID;
            }
        }
        res = this._imsi;
        return res;
    }
    /**
     * Returns the latest status message from the wireless interface.
     *
     * @return a string corresponding to the latest status message from the wireless interface
     *
     * On failure, throws an exception or returns YCellular.MESSAGE_INVALID.
     */
    async get_message() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YCellular.MESSAGE_INVALID;
            }
        }
        res = this._message;
        return res;
    }
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
    async get_pin() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YCellular.PIN_INVALID;
            }
        }
        res = this._pin;
        return res;
    }
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
    async set_pin(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('pin', rest_val);
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
     * On failure, throws an exception or returns YCellular.RADIOCONFIG_INVALID.
     */
    async get_radioConfig() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YCellular.RADIOCONFIG_INVALID;
            }
        }
        res = this._radioConfig;
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
    async set_radioConfig(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('radioConfig', rest_val);
    }
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
    async get_lockedOperator() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YCellular.LOCKEDOPERATOR_INVALID;
            }
        }
        res = this._lockedOperator;
        return res;
    }
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
    async set_lockedOperator(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('lockedOperator', rest_val);
    }
    /**
     * Returns true if the airplane mode is active (radio turned off).
     *
     * @return either YCellular.AIRPLANEMODE_OFF or YCellular.AIRPLANEMODE_ON, according to true if the
     * airplane mode is active (radio turned off)
     *
     * On failure, throws an exception or returns YCellular.AIRPLANEMODE_INVALID.
     */
    async get_airplaneMode() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YCellular.AIRPLANEMODE_INVALID;
            }
        }
        res = this._airplaneMode;
        return res;
    }
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
    async set_airplaneMode(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('airplaneMode', rest_val);
    }
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
    async get_enableData() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YCellular.ENABLEDATA_INVALID;
            }
        }
        res = this._enableData;
        return res;
    }
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
    async set_enableData(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('enableData', rest_val);
    }
    /**
     * Returns the Access Point Name (APN) to be used, if needed.
     * When left blank, the APN suggested by the cell operator will be used.
     *
     * @return a string corresponding to the Access Point Name (APN) to be used, if needed
     *
     * On failure, throws an exception or returns YCellular.APN_INVALID.
     */
    async get_apn() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YCellular.APN_INVALID;
            }
        }
        res = this._apn;
        return res;
    }
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
    async set_apn(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('apn', rest_val);
    }
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
    async get_apnSecret() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YCellular.APNSECRET_INVALID;
            }
        }
        res = this._apnSecret;
        return res;
    }
    async set_apnSecret(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('apnSecret', rest_val);
    }
    /**
     * Returns the automated connectivity check interval, in seconds.
     *
     * @return an integer corresponding to the automated connectivity check interval, in seconds
     *
     * On failure, throws an exception or returns YCellular.PINGINTERVAL_INVALID.
     */
    async get_pingInterval() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YCellular.PINGINTERVAL_INVALID;
            }
        }
        res = this._pingInterval;
        return res;
    }
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
    async set_pingInterval(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('pingInterval', rest_val);
    }
    /**
     * Returns the number of bytes sent so far.
     *
     * @return an integer corresponding to the number of bytes sent so far
     *
     * On failure, throws an exception or returns YCellular.DATASENT_INVALID.
     */
    async get_dataSent() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YCellular.DATASENT_INVALID;
            }
        }
        res = this._dataSent;
        return res;
    }
    /**
     * Changes the value of the outgoing data counter.
     *
     * @param newval : an integer corresponding to the value of the outgoing data counter
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_dataSent(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('dataSent', rest_val);
    }
    /**
     * Returns the number of bytes received so far.
     *
     * @return an integer corresponding to the number of bytes received so far
     *
     * On failure, throws an exception or returns YCellular.DATARECEIVED_INVALID.
     */
    async get_dataReceived() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YCellular.DATARECEIVED_INVALID;
            }
        }
        res = this._dataReceived;
        return res;
    }
    /**
     * Changes the value of the incoming data counter.
     *
     * @param newval : an integer corresponding to the value of the incoming data counter
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_dataReceived(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('dataReceived', rest_val);
    }
    async get_command() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YCellular.COMMAND_INVALID;
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
    static FindCellular(func) {
        let obj;
        obj = yocto_api_js_1.YFunction._FindFromCache('Cellular', func);
        if (obj == null) {
            obj = new YCellular(yocto_api_js_1.YAPI, func);
            yocto_api_js_1.YFunction._AddToCache('Cellular', func, obj);
        }
        return obj;
    }
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
    static FindCellularInContext(yctx, func) {
        let obj;
        obj = yocto_api_js_1.YFunction._FindFromCacheInContext(yctx, 'Cellular', func);
        if (obj == null) {
            obj = new YCellular(yctx, func);
            yocto_api_js_1.YFunction._AddToCache('Cellular', func, obj);
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
            await yocto_api_js_1.YFunction._UpdateValueCallbackList(this, true);
        }
        else {
            await yocto_api_js_1.YFunction._UpdateValueCallbackList(this, false);
        }
        this._valueCallbackCellular = callback;
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
        if (this._valueCallbackCellular != null) {
            try {
                await this._valueCallbackCellular(this, value);
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
    async sendPUK(puk, newPin) {
        let gsmMsg;
        gsmMsg = await this.get_message();
        if (!(gsmMsg.substr(0, 13) == 'Enter SIM PUK')) {
            return this._throw(this._yapi.INVALID_ARGUMENT, 'PUK not expected at this time', this._yapi.INVALID_ARGUMENT);
        }
        if (newPin == '') {
            return await this.set_command('AT+CPIN=' + puk + ',0000;+CLCK=SC,0,0000');
        }
        return await this.set_command('AT+CPIN=' + puk + ',' + newPin);
    }
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
    async set_apnAuth(username, password) {
        return await this.set_apnSecret(username + ',' + password);
    }
    /**
     * Clear the transmitted data counters.
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async clearDataCounters() {
        let retcode;
        retcode = await this.set_dataReceived(0);
        if (retcode != this._yapi.SUCCESS) {
            return retcode;
        }
        retcode = await this.set_dataSent(0);
        return retcode;
    }
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
    async _AT(cmd) {
        let chrPos;
        let cmdLen;
        let waitMore;
        let res;
        let buff;
        let bufflen;
        let buffstr;
        let buffstrlen;
        let idx;
        let suffixlen;
        // quote dangerous characters used in AT commands
        cmdLen = (cmd).length;
        chrPos = (cmd).indexOf('#');
        while (chrPos >= 0) {
            cmd = cmd.substr(0, chrPos) + '' + String.fromCharCode(37) + '23' + cmd.substr(chrPos + 1, cmdLen - chrPos - 1);
            cmdLen = cmdLen + 2;
            chrPos = (cmd).indexOf('#');
        }
        chrPos = (cmd).indexOf('+');
        while (chrPos >= 0) {
            cmd = cmd.substr(0, chrPos) + '' + String.fromCharCode(37) + '2B' + cmd.substr(chrPos + 1, cmdLen - chrPos - 1);
            cmdLen = cmdLen + 2;
            chrPos = (cmd).indexOf('+');
        }
        chrPos = (cmd).indexOf('=');
        while (chrPos >= 0) {
            cmd = cmd.substr(0, chrPos) + '' + String.fromCharCode(37) + '3D' + cmd.substr(chrPos + 1, cmdLen - chrPos - 1);
            cmdLen = cmdLen + 2;
            chrPos = (cmd).indexOf('=');
        }
        cmd = 'at.txt?cmd=' + cmd;
        res = '';
        // max 2 minutes (each iteration may take up to 5 seconds if waiting)
        waitMore = 24;
        while (waitMore > 0) {
            buff = await this._download(cmd);
            bufflen = (buff).length;
            buffstr = this._yapi.imm_bin2str(buff);
            buffstrlen = (buffstr).length;
            idx = bufflen - 1;
            while ((idx > 0) && (buff[idx] != 64) && (buff[idx] != 10) && (buff[idx] != 13)) {
                idx = idx - 1;
            }
            if (buff[idx] == 64) {
                // continuation detected
                suffixlen = bufflen - idx;
                cmd = 'at.txt?cmd=' + buffstr.substr(buffstrlen - suffixlen, suffixlen);
                buffstr = buffstr.substr(0, buffstrlen - suffixlen);
                waitMore = waitMore - 1;
            }
            else {
                // request complete
                waitMore = 0;
            }
            res = res + '' + buffstr;
        }
        return res;
    }
    /**
     * Returns the list detected cell operators in the neighborhood.
     * This function will typically take between 30 seconds to 1 minute to
     * return. Note that any SIM card can usually only connect to specific
     * operators. All networks returned by this function might therefore
     * not be available for connection.
     *
     * @return a list of string (cell operator names).
     */
    async get_availableOperators() {
        let cops;
        let idx;
        let slen;
        let res = [];
        cops = await this._AT('+COPS=?');
        slen = (cops).length;
        res.length = 0;
        idx = (cops).indexOf('(');
        while (idx >= 0) {
            slen = slen - (idx + 1);
            cops = cops.substr(idx + 1, slen);
            idx = (cops).indexOf('"');
            if (idx > 0) {
                slen = slen - (idx + 1);
                cops = cops.substr(idx + 1, slen);
                idx = (cops).indexOf('"');
                if (idx > 0) {
                    res.push(cops.substr(0, idx));
                }
            }
            idx = (cops).indexOf('(');
        }
        return res;
    }
    /**
     * Returns a list of nearby cellular antennas, as required for quick
     * geolocation of the device. The first cell listed is the serving
     * cell, and the next ones are the neighbor cells reported by the
     * serving cell.
     *
     * @return a list of YCellRecords.
     */
    async quickCellSurvey() {
        let moni;
        let recs = [];
        let llen;
        let mccs;
        let mcc;
        let mncs;
        let mnc;
        let lac;
        let cellId;
        let dbms;
        let dbm;
        let tads;
        let tad;
        let oper;
        let res = [];
        moni = await this._AT('+CCED=0;#MONI=7;#MONI');
        mccs = moni.substr(7, 3);
        if (mccs.substr(0, 1) == '0') {
            mccs = mccs.substr(1, 2);
        }
        if (mccs.substr(0, 1) == '0') {
            mccs = mccs.substr(1, 1);
        }
        mcc = yocto_api_js_1.YAPIContext.imm_atoi(mccs);
        mncs = moni.substr(11, 3);
        if (mncs.substr(2, 1) == ',') {
            mncs = mncs.substr(0, 2);
        }
        if (mncs.substr(0, 1) == '0') {
            mncs = mncs.substr(1, (mncs).length - 1);
        }
        mnc = yocto_api_js_1.YAPIContext.imm_atoi(mncs);
        recs = (moni).split('#');
        // process each line in turn
        res.length = 0;
        for (let ii in recs) {
            llen = (recs[ii]).length - 2;
            if (llen >= 44) {
                if (recs[ii].substr(41, 3) == 'dbm') {
                    lac = parseInt(recs[ii].substr(16, 4), 16);
                    cellId = parseInt(recs[ii].substr(23, 4), 16);
                    dbms = recs[ii].substr(37, 4);
                    if (dbms.substr(0, 1) == ' ') {
                        dbms = dbms.substr(1, 3);
                    }
                    dbm = yocto_api_js_1.YAPIContext.imm_atoi(dbms);
                    if (llen > 66) {
                        tads = recs[ii].substr(54, 2);
                        if (tads.substr(0, 1) == ' ') {
                            tads = tads.substr(1, 3);
                        }
                        tad = yocto_api_js_1.YAPIContext.imm_atoi(tads);
                        oper = recs[ii].substr(66, llen - 66);
                    }
                    else {
                        tad = -1;
                        oper = '';
                    }
                    if (lac < 65535) {
                        res.push(new YCellRecord(mcc, mnc, lac, cellId, dbm, tad, oper));
                    }
                }
            }
        }
        return res;
    }
    /**
     * Returns the cell operator brand for a given MCC/MNC pair (DEPRECATED).
     *
     * @param mccmnc : a string starting with a MCC code followed by a MNC code,
     *
     * @return a string containing the corresponding cell operator brand name.
     */
    async decodePLMN(mccmnc) {
        return mccmnc;
    }
    /**
     * Returns the list available radio communication profiles, as a string array
     * (YoctoHub-GSM-4G only).
     * Each string is a made of a numerical ID, followed by a colon,
     * followed by the profile description.
     *
     * @return a list of string describing available radio communication profiles.
     */
    async get_communicationProfiles() {
        let profiles;
        let lines = [];
        let nlines;
        let idx;
        let line;
        let cpos;
        let profno;
        let res = [];
        profiles = await this._AT('+UMNOPROF=?');
        lines = (profiles).split('\n');
        nlines = lines.length;
        if (!(nlines > 0)) {
            return this._throw(this._yapi.IO_ERROR, 'fail to retrieve profile list', res);
        }
        res.length = 0;
        idx = 0;
        while (idx < nlines) {
            line = lines[idx];
            cpos = (line).indexOf(':');
            if (cpos > 0) {
                profno = yocto_api_js_1.YAPIContext.imm_atoi(line.substr(0, cpos));
                if (profno > 1) {
                    res.push(line);
                }
            }
            idx = idx + 1;
        }
        return res;
    }
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
    nextCellular() {
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != yocto_api_js_1.YAPI.SUCCESS)
            return null;
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if (next_hwid == null)
            return null;
        return YCellular.FindCellularInContext(this._yapi, next_hwid);
    }
    /**
     * Starts the enumeration of cellular interfaces currently accessible.
     * Use the method YCellular.nextCellular() to iterate on
     * next cellular interfaces.
     *
     * @return a pointer to a YCellular object, corresponding to
     *         the first cellular interface currently online, or a null pointer
     *         if there are none.
     */
    static FirstCellular() {
        let next_hwid = yocto_api_js_1.YAPI.imm_getFirstHardwareId('Cellular');
        if (next_hwid == null)
            return null;
        return YCellular.FindCellular(next_hwid);
    }
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
    static FirstCellularInContext(yctx) {
        let next_hwid = yctx.imm_getFirstHardwareId('Cellular');
        if (next_hwid == null)
            return null;
        return YCellular.FindCellularInContext(yctx, next_hwid);
    }
}
exports.YCellular = YCellular;
// API symbols as static members
YCellular.LINKQUALITY_INVALID = yocto_api_js_1.YAPI.INVALID_UINT;
YCellular.CELLOPERATOR_INVALID = yocto_api_js_1.YAPI.INVALID_STRING;
YCellular.CELLIDENTIFIER_INVALID = yocto_api_js_1.YAPI.INVALID_STRING;
YCellular.CELLTYPE_GPRS = 0;
YCellular.CELLTYPE_EGPRS = 1;
YCellular.CELLTYPE_WCDMA = 2;
YCellular.CELLTYPE_HSDPA = 3;
YCellular.CELLTYPE_NONE = 4;
YCellular.CELLTYPE_CDMA = 5;
YCellular.CELLTYPE_LTE_M = 6;
YCellular.CELLTYPE_NB_IOT = 7;
YCellular.CELLTYPE_EC_GSM_IOT = 8;
YCellular.CELLTYPE_INVALID = -1;
YCellular.IMSI_INVALID = yocto_api_js_1.YAPI.INVALID_STRING;
YCellular.MESSAGE_INVALID = yocto_api_js_1.YAPI.INVALID_STRING;
YCellular.PIN_INVALID = yocto_api_js_1.YAPI.INVALID_STRING;
YCellular.RADIOCONFIG_INVALID = yocto_api_js_1.YAPI.INVALID_STRING;
YCellular.LOCKEDOPERATOR_INVALID = yocto_api_js_1.YAPI.INVALID_STRING;
YCellular.AIRPLANEMODE_OFF = 0;
YCellular.AIRPLANEMODE_ON = 1;
YCellular.AIRPLANEMODE_INVALID = -1;
YCellular.ENABLEDATA_HOMENETWORK = 0;
YCellular.ENABLEDATA_ROAMING = 1;
YCellular.ENABLEDATA_NEVER = 2;
YCellular.ENABLEDATA_NEUTRALITY = 3;
YCellular.ENABLEDATA_INVALID = -1;
YCellular.APN_INVALID = yocto_api_js_1.YAPI.INVALID_STRING;
YCellular.APNSECRET_INVALID = yocto_api_js_1.YAPI.INVALID_STRING;
YCellular.PINGINTERVAL_INVALID = yocto_api_js_1.YAPI.INVALID_UINT;
YCellular.DATASENT_INVALID = yocto_api_js_1.YAPI.INVALID_UINT;
YCellular.DATARECEIVED_INVALID = yocto_api_js_1.YAPI.INVALID_UINT;
YCellular.COMMAND_INVALID = yocto_api_js_1.YAPI.INVALID_STRING;
//# sourceMappingURL=yocto_cellular.js.map