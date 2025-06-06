/*********************************************************************
 *
 *  $Id: yocto_wireless.ts 63482 2024-11-26 09:29:16Z seb $
 *
 *  Implements the high-level API for WlanRecord functions
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
//--- (generated code: YWlanRecord class start)
/**
 * YWlanRecord Class: Wireless network description, returned by wireless.get_detectedWlans method
 *
 * YWlanRecord objects are used to describe a wireless network.
 * These objects are  used in particular in conjunction with the
 * YWireless class.
 */
//--- (end of generated code: YWlanRecord class start)
export class YWlanRecord {
    // API symbols as static members
    //--- (end of generated code: YWlanRecord attributes declaration)
    constructor(str_json) {
        //--- (generated code: YWlanRecord attributes declaration)
        this._ssid = '';
        this._channel = 0;
        this._sec = '';
        this._rssi = 0;
        //--- (generated code: YWlanRecord constructor)
        //--- (end of generated code: YWlanRecord constructor)
        const loadval = JSON.parse(str_json);
        this._ssid = loadval.ssid;
        this._channel = loadval.channel;
        this._sec = loadval.sec;
        this._rssi = loadval.rssi;
    }
    //--- (generated code: YWlanRecord implementation)
    /**
     * Returns the name of the wireless network (SSID).
     *
     * @return a string with the name of the wireless network (SSID).
     */
    get_ssid() {
        return this._ssid;
    }
    /**
     * Returns the 802.11 b/g/n channel number used by this network.
     *
     * @return an integer corresponding to the channel.
     */
    get_channel() {
        return this._channel;
    }
    /**
     * Returns the security algorithm used by the wireless network.
     * If the network implements to security, the value is "OPEN".
     *
     * @return a string with the security algorithm.
     */
    get_security() {
        return this._sec;
    }
    /**
     * Returns the quality of the wireless network link, in per cents.
     *
     * @return an integer between 0 and 100 corresponding to the signal quality.
     */
    get_linkQuality() {
        return this._rssi;
    }
}
//--- (generated code: YWireless class start)
/**
 * YWireless Class: wireless LAN interface control interface, available for instance in the
 * YoctoHub-Wireless, the YoctoHub-Wireless-SR, the YoctoHub-Wireless-g or the YoctoHub-Wireless-n
 *
 * The YWireless class provides control over wireless network parameters
 * and status for devices that are wireless-enabled.
 * Note that TCP/IP parameters are configured separately, using class YNetwork.
 */
//--- (end of generated code: YWireless class start)
/** @extends {YFunction} **/
export class YWireless extends YFunction {
    //--- (end of generated code: YWireless attributes declaration)
    constructor(yapi, func) {
        //--- (generated code: YWireless constructor)
        super(yapi, func);
        this._linkQuality = YWireless.LINKQUALITY_INVALID;
        this._ssid = YWireless.SSID_INVALID;
        this._channel = YWireless.CHANNEL_INVALID;
        this._security = YWireless.SECURITY_INVALID;
        this._message = YWireless.MESSAGE_INVALID;
        this._wlanConfig = YWireless.WLANCONFIG_INVALID;
        this._wlanState = YWireless.WLANSTATE_INVALID;
        this._valueCallbackWireless = null;
        // API symbols as object properties
        this.LINKQUALITY_INVALID = YAPI.INVALID_UINT;
        this.SSID_INVALID = YAPI.INVALID_STRING;
        this.CHANNEL_INVALID = YAPI.INVALID_UINT;
        this.SECURITY_UNKNOWN = 0;
        this.SECURITY_OPEN = 1;
        this.SECURITY_WEP = 2;
        this.SECURITY_WPA = 3;
        this.SECURITY_WPA2 = 4;
        this.SECURITY_INVALID = -1;
        this.MESSAGE_INVALID = YAPI.INVALID_STRING;
        this.WLANCONFIG_INVALID = YAPI.INVALID_STRING;
        this.WLANSTATE_DOWN = 0;
        this.WLANSTATE_SCANNING = 1;
        this.WLANSTATE_CONNECTED = 2;
        this.WLANSTATE_REJECTED = 3;
        this.WLANSTATE_INVALID = -1;
        this._className = 'Wireless';
        //--- (end of generated code: YWireless constructor)
    }
    //--- (generated code: YWireless implementation)
    imm_parseAttr(name, val) {
        switch (name) {
            case 'linkQuality':
                this._linkQuality = val;
                return 1;
            case 'ssid':
                this._ssid = val;
                return 1;
            case 'channel':
                this._channel = val;
                return 1;
            case 'security':
                this._security = val;
                return 1;
            case 'message':
                this._message = val;
                return 1;
            case 'wlanConfig':
                this._wlanConfig = val;
                return 1;
            case 'wlanState':
                this._wlanState = val;
                return 1;
        }
        return super.imm_parseAttr(name, val);
    }
    /**
     * Returns the link quality, expressed in percent.
     *
     * @return an integer corresponding to the link quality, expressed in percent
     *
     * On failure, throws an exception or returns YWireless.LINKQUALITY_INVALID.
     */
    async get_linkQuality() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YWireless.LINKQUALITY_INVALID;
            }
        }
        res = this._linkQuality;
        return res;
    }
    /**
     * Returns the wireless network name (SSID).
     *
     * @return a string corresponding to the wireless network name (SSID)
     *
     * On failure, throws an exception or returns YWireless.SSID_INVALID.
     */
    async get_ssid() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YWireless.SSID_INVALID;
            }
        }
        res = this._ssid;
        return res;
    }
    /**
     * Returns the 802.11 channel currently used, or 0 when the selected network has not been found.
     *
     * @return an integer corresponding to the 802.11 channel currently used, or 0 when the selected
     * network has not been found
     *
     * On failure, throws an exception or returns YWireless.CHANNEL_INVALID.
     */
    async get_channel() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YWireless.CHANNEL_INVALID;
            }
        }
        res = this._channel;
        return res;
    }
    /**
     * Returns the security algorithm used by the selected wireless network.
     *
     * @return a value among YWireless.SECURITY_UNKNOWN, YWireless.SECURITY_OPEN, YWireless.SECURITY_WEP,
     * YWireless.SECURITY_WPA and YWireless.SECURITY_WPA2 corresponding to the security algorithm used by
     * the selected wireless network
     *
     * On failure, throws an exception or returns YWireless.SECURITY_INVALID.
     */
    async get_security() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YWireless.SECURITY_INVALID;
            }
        }
        res = this._security;
        return res;
    }
    /**
     * Returns the latest status message from the wireless interface.
     *
     * @return a string corresponding to the latest status message from the wireless interface
     *
     * On failure, throws an exception or returns YWireless.MESSAGE_INVALID.
     */
    async get_message() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YWireless.MESSAGE_INVALID;
            }
        }
        res = this._message;
        return res;
    }
    async get_wlanConfig() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YWireless.WLANCONFIG_INVALID;
            }
        }
        res = this._wlanConfig;
        return res;
    }
    async set_wlanConfig(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('wlanConfig', rest_val);
    }
    /**
     * Returns the current state of the wireless interface. The state YWireless.WLANSTATE_DOWN means that
     * the network interface is
     * not connected to a network. The state YWireless.WLANSTATE_SCANNING means that the network interface
     * is scanning available
     * frequencies. During this stage, the device is not reachable, and the network settings are not yet
     * applied. The state
     * YWireless.WLANSTATE_CONNECTED means that the network settings have been successfully applied ant
     * that the device is reachable
     * from the wireless network. If the device is configured to use ad-hoc or Soft AP mode, it means that
     * the wireless network
     * is up and that other devices can join the network. The state YWireless.WLANSTATE_REJECTED means
     * that the network interface has
     * not been able to join the requested network. The description of the error can be obtain with the
     * get_message() method.
     *
     * @return a value among YWireless.WLANSTATE_DOWN, YWireless.WLANSTATE_SCANNING,
     * YWireless.WLANSTATE_CONNECTED and YWireless.WLANSTATE_REJECTED corresponding to the current state
     * of the wireless interface
     *
     * On failure, throws an exception or returns YWireless.WLANSTATE_INVALID.
     */
    async get_wlanState() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YWireless.WLANSTATE_INVALID;
            }
        }
        res = this._wlanState;
        return res;
    }
    /**
     * Retrieves a wireless LAN interface for a given identifier.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the wireless LAN interface is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YWireless.isOnline() to test if the wireless LAN interface is
     * indeed online at a given time. In case of ambiguity when looking for
     * a wireless LAN interface by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the wireless LAN interface, for instance
     *         YHUBWLN1.wireless.
     *
     * @return a YWireless object allowing you to drive the wireless LAN interface.
     */
    static FindWireless(func) {
        let obj;
        obj = YFunction._FindFromCache('Wireless', func);
        if (obj == null) {
            obj = new YWireless(YAPI, func);
            YFunction._AddToCache('Wireless', func, obj);
        }
        return obj;
    }
    /**
     * Retrieves a wireless LAN interface for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the wireless LAN interface is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YWireless.isOnline() to test if the wireless LAN interface is
     * indeed online at a given time. In case of ambiguity when looking for
     * a wireless LAN interface by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx : a YAPI context
     * @param func : a string that uniquely characterizes the wireless LAN interface, for instance
     *         YHUBWLN1.wireless.
     *
     * @return a YWireless object allowing you to drive the wireless LAN interface.
     */
    static FindWirelessInContext(yctx, func) {
        let obj;
        obj = YFunction._FindFromCacheInContext(yctx, 'Wireless', func);
        if (obj == null) {
            obj = new YWireless(yctx, func);
            YFunction._AddToCache('Wireless', func, obj);
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
        this._valueCallbackWireless = callback;
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
        if (this._valueCallbackWireless != null) {
            try {
                await this._valueCallbackWireless(this, value);
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
     * Triggers a scan of the wireless frequency and builds the list of available networks.
     * The scan forces a disconnection from the current network. At then end of the process, the
     * the network interface attempts to reconnect to the previous network. During the scan, the wlanState
     * switches to YWireless.WLANSTATE_DOWN, then to YWireless.WLANSTATE_SCANNING. When the scan is completed,
     * get_wlanState() returns either YWireless.WLANSTATE_DOWN or YWireless.WLANSTATE_SCANNING. At this
     * point, the list of detected network can be retrieved with the get_detectedWlans() method.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async startWlanScan() {
        let config;
        config = await this.get_wlanConfig();
        // a full scan is triggered when a config is applied
        return await this.set_wlanConfig(config);
    }
    /**
     * Changes the configuration of the wireless lan interface to connect to an existing
     * access point (infrastructure mode).
     * Remember to call the saveToFlash() method and then to reboot the module to apply this setting.
     *
     * @param ssid : the name of the network to connect to
     * @param securityKey : the network key, as a character string
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async joinNetwork(ssid, securityKey) {
        return await this.set_wlanConfig('INFRA:' + ssid + '\\' + securityKey);
    }
    /**
     * Changes the configuration of the wireless lan interface to create an ad-hoc
     * wireless network, without using an access point. On the YoctoHub-Wireless-g
     * and YoctoHub-Wireless-n,
     * you should use softAPNetwork() instead, which emulates an access point
     * (Soft AP) which is more efficient and more widely supported than ad-hoc networks.
     *
     * When a security key is specified for an ad-hoc network, the network is protected
     * by a WEP40 key (5 characters or 10 hexadecimal digits) or WEP128 key (13 characters
     * or 26 hexadecimal digits). It is recommended to use a well-randomized WEP128 key
     * using 26 hexadecimal digits to maximize security.
     * Remember to call the saveToFlash() method and then to reboot the module
     * to apply this setting.
     *
     * @param ssid : the name of the network to connect to
     * @param securityKey : the network key, as a character string
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async adhocNetwork(ssid, securityKey) {
        return await this.set_wlanConfig('ADHOC:' + ssid + '\\' + securityKey);
    }
    /**
     * Changes the configuration of the wireless lan interface to create a new wireless
     * network by emulating a WiFi access point (Soft AP). This function can only be
     * used with the YoctoHub-Wireless-g and the YoctoHub-Wireless-n.
     *
     * On the YoctoHub-Wireless-g, when a security key is specified for a SoftAP network,
     * the network is protected by a WEP40 key (5 characters or 10 hexadecimal digits) or
     * WEP128 key (13 characters or 26 hexadecimal digits). It is recommended to use a
     * well-randomized WEP128 key using 26 hexadecimal digits to maximize security.
     *
     * On the YoctoHub-Wireless-n, when a security key is specified for a SoftAP network,
     * the network will be protected by WPA2.
     *
     * Remember to call the saveToFlash() method and then to reboot the module to apply this setting.
     *
     * @param ssid : the name of the network to connect to
     * @param securityKey : the network key, as a character string
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async softAPNetwork(ssid, securityKey) {
        return await this.set_wlanConfig('SOFTAP:' + ssid + '\\' + securityKey);
    }
    /**
     * Returns a list of YWlanRecord objects that describe detected Wireless networks.
     * This list is not updated when the module is already connected to an access point (infrastructure mode).
     * To force an update of this list, startWlanScan() must be called.
     * Note that an languages without garbage collections, the returned list must be freed by the caller.
     *
     * @return a list of YWlanRecord objects, containing the SSID, channel,
     *         link quality and the type of security of the wireless network.
     *
     * On failure, throws an exception or returns an empty list.
     */
    async get_detectedWlans() {
        let json;
        let wlanlist = [];
        let res = [];
        json = await this._download('wlan.json?by=name');
        wlanlist = this.imm_json_get_array(json);
        res.length = 0;
        for (let ii in wlanlist) {
            res.push(new YWlanRecord(this._yapi.imm_bin2str(wlanlist[ii])));
        }
        return res;
    }
    /**
     * Continues the enumeration of wireless LAN interfaces started using yFirstWireless().
     * Caution: You can't make any assumption about the returned wireless LAN interfaces order.
     * If you want to find a specific a wireless LAN interface, use Wireless.findWireless()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YWireless object, corresponding to
     *         a wireless LAN interface currently online, or a null pointer
     *         if there are no more wireless LAN interfaces to enumerate.
     */
    nextWireless() {
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != YAPI.SUCCESS)
            return null;
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if (next_hwid == null)
            return null;
        return YWireless.FindWirelessInContext(this._yapi, next_hwid);
    }
    /**
     * Starts the enumeration of wireless LAN interfaces currently accessible.
     * Use the method YWireless.nextWireless() to iterate on
     * next wireless LAN interfaces.
     *
     * @return a pointer to a YWireless object, corresponding to
     *         the first wireless LAN interface currently online, or a null pointer
     *         if there are none.
     */
    static FirstWireless() {
        let next_hwid = YAPI.imm_getFirstHardwareId('Wireless');
        if (next_hwid == null)
            return null;
        return YWireless.FindWireless(next_hwid);
    }
    /**
     * Starts the enumeration of wireless LAN interfaces currently accessible.
     * Use the method YWireless.nextWireless() to iterate on
     * next wireless LAN interfaces.
     *
     * @param yctx : a YAPI context.
     *
     * @return a pointer to a YWireless object, corresponding to
     *         the first wireless LAN interface currently online, or a null pointer
     *         if there are none.
     */
    static FirstWirelessInContext(yctx) {
        let next_hwid = yctx.imm_getFirstHardwareId('Wireless');
        if (next_hwid == null)
            return null;
        return YWireless.FindWirelessInContext(yctx, next_hwid);
    }
}
// API symbols as static members
YWireless.LINKQUALITY_INVALID = YAPI.INVALID_UINT;
YWireless.SSID_INVALID = YAPI.INVALID_STRING;
YWireless.CHANNEL_INVALID = YAPI.INVALID_UINT;
YWireless.SECURITY_UNKNOWN = 0;
YWireless.SECURITY_OPEN = 1;
YWireless.SECURITY_WEP = 2;
YWireless.SECURITY_WPA = 3;
YWireless.SECURITY_WPA2 = 4;
YWireless.SECURITY_INVALID = -1;
YWireless.MESSAGE_INVALID = YAPI.INVALID_STRING;
YWireless.WLANCONFIG_INVALID = YAPI.INVALID_STRING;
YWireless.WLANSTATE_DOWN = 0;
YWireless.WLANSTATE_SCANNING = 1;
YWireless.WLANSTATE_CONNECTED = 2;
YWireless.WLANSTATE_REJECTED = 3;
YWireless.WLANSTATE_INVALID = -1;
//# sourceMappingURL=yocto_wireless.js.map