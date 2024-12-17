/*********************************************************************
 *
 *  $Id: yocto_bluetoothlink.ts 63327 2024-11-13 09:35:03Z seb $
 *
 *  Implements the high-level API for BluetoothLink functions
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
import { YAPI, YFunction } from './yocto_api.js';
//--- (YBluetoothLink class start)
/**
 * YBluetoothLink Class: Bluetooth sound controller control interface
 *
 * BluetoothLink function provides control over Bluetooth link
 * and status for devices that are Bluetooth-enabled.
 */
//--- (end of YBluetoothLink class start)
export class YBluetoothLink extends YFunction {
    //--- (end of YBluetoothLink attributes declaration)
    constructor(yapi, func) {
        //--- (YBluetoothLink constructor)
        super(yapi, func);
        this._ownAddress = YBluetoothLink.OWNADDRESS_INVALID;
        this._pairingPin = YBluetoothLink.PAIRINGPIN_INVALID;
        this._remoteAddress = YBluetoothLink.REMOTEADDRESS_INVALID;
        this._remoteName = YBluetoothLink.REMOTENAME_INVALID;
        this._mute = YBluetoothLink.MUTE_INVALID;
        this._preAmplifier = YBluetoothLink.PREAMPLIFIER_INVALID;
        this._volume = YBluetoothLink.VOLUME_INVALID;
        this._linkState = YBluetoothLink.LINKSTATE_INVALID;
        this._linkQuality = YBluetoothLink.LINKQUALITY_INVALID;
        this._command = YBluetoothLink.COMMAND_INVALID;
        this._valueCallbackBluetoothLink = null;
        // API symbols as object properties
        this.OWNADDRESS_INVALID = YAPI.INVALID_STRING;
        this.PAIRINGPIN_INVALID = YAPI.INVALID_STRING;
        this.REMOTEADDRESS_INVALID = YAPI.INVALID_STRING;
        this.REMOTENAME_INVALID = YAPI.INVALID_STRING;
        this.MUTE_FALSE = 0;
        this.MUTE_TRUE = 1;
        this.MUTE_INVALID = -1;
        this.PREAMPLIFIER_INVALID = YAPI.INVALID_UINT;
        this.VOLUME_INVALID = YAPI.INVALID_UINT;
        this.LINKSTATE_DOWN = 0;
        this.LINKSTATE_FREE = 1;
        this.LINKSTATE_SEARCH = 2;
        this.LINKSTATE_EXISTS = 3;
        this.LINKSTATE_LINKED = 4;
        this.LINKSTATE_PLAY = 5;
        this.LINKSTATE_INVALID = -1;
        this.LINKQUALITY_INVALID = YAPI.INVALID_UINT;
        this.COMMAND_INVALID = YAPI.INVALID_STRING;
        this._className = 'BluetoothLink';
        //--- (end of YBluetoothLink constructor)
    }
    //--- (YBluetoothLink implementation)
    imm_parseAttr(name, val) {
        switch (name) {
            case 'ownAddress':
                this._ownAddress = val;
                return 1;
            case 'pairingPin':
                this._pairingPin = val;
                return 1;
            case 'remoteAddress':
                this._remoteAddress = val;
                return 1;
            case 'remoteName':
                this._remoteName = val;
                return 1;
            case 'mute':
                this._mute = val;
                return 1;
            case 'preAmplifier':
                this._preAmplifier = val;
                return 1;
            case 'volume':
                this._volume = val;
                return 1;
            case 'linkState':
                this._linkState = val;
                return 1;
            case 'linkQuality':
                this._linkQuality = val;
                return 1;
            case 'command':
                this._command = val;
                return 1;
        }
        return super.imm_parseAttr(name, val);
    }
    /**
     * Returns the MAC-48 address of the bluetooth interface, which is unique on the bluetooth network.
     *
     * @return a string corresponding to the MAC-48 address of the bluetooth interface, which is unique on
     * the bluetooth network
     *
     * On failure, throws an exception or returns YBluetoothLink.OWNADDRESS_INVALID.
     */
    async get_ownAddress() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YBluetoothLink.OWNADDRESS_INVALID;
            }
        }
        res = this._ownAddress;
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
     * On failure, throws an exception or returns YBluetoothLink.PAIRINGPIN_INVALID.
     */
    async get_pairingPin() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YBluetoothLink.PAIRINGPIN_INVALID;
            }
        }
        res = this._pairingPin;
        return res;
    }
    /**
     * Changes the PIN code used by the module for bluetooth pairing.
     * Remember to call the saveToFlash() method of the module to save the
     * new value in the device flash.
     *
     * @param newval : a string corresponding to the PIN code used by the module for bluetooth pairing
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_pairingPin(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('pairingPin', rest_val);
    }
    /**
     * Returns the MAC-48 address of the remote device to connect to.
     *
     * @return a string corresponding to the MAC-48 address of the remote device to connect to
     *
     * On failure, throws an exception or returns YBluetoothLink.REMOTEADDRESS_INVALID.
     */
    async get_remoteAddress() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YBluetoothLink.REMOTEADDRESS_INVALID;
            }
        }
        res = this._remoteAddress;
        return res;
    }
    /**
     * Changes the MAC-48 address defining which remote device to connect to.
     * Remember to call the saveToFlash()
     * method of the module if the modification must be kept.
     *
     * @param newval : a string corresponding to the MAC-48 address defining which remote device to connect to
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_remoteAddress(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('remoteAddress', rest_val);
    }
    /**
     * Returns the bluetooth name the remote device, if found on the bluetooth network.
     *
     * @return a string corresponding to the bluetooth name the remote device, if found on the bluetooth network
     *
     * On failure, throws an exception or returns YBluetoothLink.REMOTENAME_INVALID.
     */
    async get_remoteName() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YBluetoothLink.REMOTENAME_INVALID;
            }
        }
        res = this._remoteName;
        return res;
    }
    /**
     * Returns the state of the mute function.
     *
     * @return either YBluetoothLink.MUTE_FALSE or YBluetoothLink.MUTE_TRUE, according to the state of the
     * mute function
     *
     * On failure, throws an exception or returns YBluetoothLink.MUTE_INVALID.
     */
    async get_mute() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YBluetoothLink.MUTE_INVALID;
            }
        }
        res = this._mute;
        return res;
    }
    /**
     * Changes the state of the mute function. Remember to call the matching module
     * saveToFlash() method to save the setting permanently.
     *
     * @param newval : either YBluetoothLink.MUTE_FALSE or YBluetoothLink.MUTE_TRUE, according to the
     * state of the mute function
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_mute(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('mute', rest_val);
    }
    /**
     * Returns the audio pre-amplifier volume, in per cents.
     *
     * @return an integer corresponding to the audio pre-amplifier volume, in per cents
     *
     * On failure, throws an exception or returns YBluetoothLink.PREAMPLIFIER_INVALID.
     */
    async get_preAmplifier() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YBluetoothLink.PREAMPLIFIER_INVALID;
            }
        }
        res = this._preAmplifier;
        return res;
    }
    /**
     * Changes the audio pre-amplifier volume, in per cents.
     * Remember to call the saveToFlash()
     * method of the module if the modification must be kept.
     *
     * @param newval : an integer corresponding to the audio pre-amplifier volume, in per cents
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_preAmplifier(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('preAmplifier', rest_val);
    }
    /**
     * Returns the connected headset volume, in per cents.
     *
     * @return an integer corresponding to the connected headset volume, in per cents
     *
     * On failure, throws an exception or returns YBluetoothLink.VOLUME_INVALID.
     */
    async get_volume() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YBluetoothLink.VOLUME_INVALID;
            }
        }
        res = this._volume;
        return res;
    }
    /**
     * Changes the connected headset volume, in per cents.
     *
     * @param newval : an integer corresponding to the connected headset volume, in per cents
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_volume(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('volume', rest_val);
    }
    /**
     * Returns the bluetooth link state.
     *
     * @return a value among YBluetoothLink.LINKSTATE_DOWN, YBluetoothLink.LINKSTATE_FREE,
     * YBluetoothLink.LINKSTATE_SEARCH, YBluetoothLink.LINKSTATE_EXISTS, YBluetoothLink.LINKSTATE_LINKED
     * and YBluetoothLink.LINKSTATE_PLAY corresponding to the bluetooth link state
     *
     * On failure, throws an exception or returns YBluetoothLink.LINKSTATE_INVALID.
     */
    async get_linkState() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YBluetoothLink.LINKSTATE_INVALID;
            }
        }
        res = this._linkState;
        return res;
    }
    /**
     * Returns the bluetooth receiver signal strength, in pourcents, or 0 if no connection is established.
     *
     * @return an integer corresponding to the bluetooth receiver signal strength, in pourcents, or 0 if
     * no connection is established
     *
     * On failure, throws an exception or returns YBluetoothLink.LINKQUALITY_INVALID.
     */
    async get_linkQuality() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YBluetoothLink.LINKQUALITY_INVALID;
            }
        }
        res = this._linkQuality;
        return res;
    }
    async get_command() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YBluetoothLink.COMMAND_INVALID;
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
     * Retrieves a Bluetooth sound controller for a given identifier.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the Bluetooth sound controller is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YBluetoothLink.isOnline() to test if the Bluetooth sound controller is
     * indeed online at a given time. In case of ambiguity when looking for
     * a Bluetooth sound controller by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the Bluetooth sound controller, for instance
     *         MyDevice.bluetoothLink1.
     *
     * @return a YBluetoothLink object allowing you to drive the Bluetooth sound controller.
     */
    static FindBluetoothLink(func) {
        let obj;
        obj = YFunction._FindFromCache('BluetoothLink', func);
        if (obj == null) {
            obj = new YBluetoothLink(YAPI, func);
            YFunction._AddToCache('BluetoothLink', func, obj);
        }
        return obj;
    }
    /**
     * Retrieves a Bluetooth sound controller for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the Bluetooth sound controller is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YBluetoothLink.isOnline() to test if the Bluetooth sound controller is
     * indeed online at a given time. In case of ambiguity when looking for
     * a Bluetooth sound controller by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx : a YAPI context
     * @param func : a string that uniquely characterizes the Bluetooth sound controller, for instance
     *         MyDevice.bluetoothLink1.
     *
     * @return a YBluetoothLink object allowing you to drive the Bluetooth sound controller.
     */
    static FindBluetoothLinkInContext(yctx, func) {
        let obj;
        obj = YFunction._FindFromCacheInContext(yctx, 'BluetoothLink', func);
        if (obj == null) {
            obj = new YBluetoothLink(yctx, func);
            YFunction._AddToCache('BluetoothLink', func, obj);
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
        this._valueCallbackBluetoothLink = callback;
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
        if (this._valueCallbackBluetoothLink != null) {
            try {
                await this._valueCallbackBluetoothLink(this, value);
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
     * Attempt to connect to the previously selected remote device.
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async connect() {
        return await this.set_command('C');
    }
    /**
     * Disconnect from the previously selected remote device.
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async disconnect() {
        return await this.set_command('D');
    }
    /**
     * Continues the enumeration of Bluetooth sound controllers started using yFirstBluetoothLink().
     * Caution: You can't make any assumption about the returned Bluetooth sound controllers order.
     * If you want to find a specific a Bluetooth sound controller, use BluetoothLink.findBluetoothLink()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YBluetoothLink object, corresponding to
     *         a Bluetooth sound controller currently online, or a null pointer
     *         if there are no more Bluetooth sound controllers to enumerate.
     */
    nextBluetoothLink() {
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != YAPI.SUCCESS)
            return null;
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if (next_hwid == null)
            return null;
        return YBluetoothLink.FindBluetoothLinkInContext(this._yapi, next_hwid);
    }
    /**
     * Starts the enumeration of Bluetooth sound controllers currently accessible.
     * Use the method YBluetoothLink.nextBluetoothLink() to iterate on
     * next Bluetooth sound controllers.
     *
     * @return a pointer to a YBluetoothLink object, corresponding to
     *         the first Bluetooth sound controller currently online, or a null pointer
     *         if there are none.
     */
    static FirstBluetoothLink() {
        let next_hwid = YAPI.imm_getFirstHardwareId('BluetoothLink');
        if (next_hwid == null)
            return null;
        return YBluetoothLink.FindBluetoothLink(next_hwid);
    }
    /**
     * Starts the enumeration of Bluetooth sound controllers currently accessible.
     * Use the method YBluetoothLink.nextBluetoothLink() to iterate on
     * next Bluetooth sound controllers.
     *
     * @param yctx : a YAPI context.
     *
     * @return a pointer to a YBluetoothLink object, corresponding to
     *         the first Bluetooth sound controller currently online, or a null pointer
     *         if there are none.
     */
    static FirstBluetoothLinkInContext(yctx) {
        let next_hwid = yctx.imm_getFirstHardwareId('BluetoothLink');
        if (next_hwid == null)
            return null;
        return YBluetoothLink.FindBluetoothLinkInContext(yctx, next_hwid);
    }
}
// API symbols as static members
YBluetoothLink.OWNADDRESS_INVALID = YAPI.INVALID_STRING;
YBluetoothLink.PAIRINGPIN_INVALID = YAPI.INVALID_STRING;
YBluetoothLink.REMOTEADDRESS_INVALID = YAPI.INVALID_STRING;
YBluetoothLink.REMOTENAME_INVALID = YAPI.INVALID_STRING;
YBluetoothLink.MUTE_FALSE = 0;
YBluetoothLink.MUTE_TRUE = 1;
YBluetoothLink.MUTE_INVALID = -1;
YBluetoothLink.PREAMPLIFIER_INVALID = YAPI.INVALID_UINT;
YBluetoothLink.VOLUME_INVALID = YAPI.INVALID_UINT;
YBluetoothLink.LINKSTATE_DOWN = 0;
YBluetoothLink.LINKSTATE_FREE = 1;
YBluetoothLink.LINKSTATE_SEARCH = 2;
YBluetoothLink.LINKSTATE_EXISTS = 3;
YBluetoothLink.LINKSTATE_LINKED = 4;
YBluetoothLink.LINKSTATE_PLAY = 5;
YBluetoothLink.LINKSTATE_INVALID = -1;
YBluetoothLink.LINKQUALITY_INVALID = YAPI.INVALID_UINT;
YBluetoothLink.COMMAND_INVALID = YAPI.INVALID_STRING;
//# sourceMappingURL=yocto_bluetoothlink.js.map