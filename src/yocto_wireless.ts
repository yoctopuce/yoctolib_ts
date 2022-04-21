/*********************************************************************
 *
 *  $Id: yocto_wireless.ts 48520 2022-02-03 10:51:20Z seb $
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

import { YAPI, YAPIContext, YErrorMsg, YFunction, YModule, YSensor, YDataLogger, YMeasure } from './yocto_api.js';

//--- (generated code: YWlanRecord class start)
/**
 * YWlanRecord Class: Wireless network description, returned by wireless.get_detectedWlans method
 *
 * YWlanRecord objects are used to describe a wireless network.
 * These objects are  used in particular in conjunction with the
 * YWireless class.
 */
//--- (end of generated code: YWlanRecord class start)

export class YWlanRecord
{
    //--- (generated code: YWlanRecord attributes declaration)
    _ssid: string = '';
    _channel: number = 0;
    _sec: string = '';
    _rssi: number = 0;

    // API symbols as static members
    //--- (end of generated code: YWlanRecord attributes declaration)

    constructor(str_json: string)
    {
        //--- (generated code: YWlanRecord constructor)
        //--- (end of generated code: YWlanRecord constructor)
        var loadval = JSON.parse(str_json);
        this._ssid    = loadval.ssid;
        this._channel = loadval.channel;
        this._sec     = loadval.sec;
        this._rssi    = loadval.rssi;
    }

    //--- (generated code: YWlanRecord implementation)

    /**
     * Returns the name of the wireless network (SSID).
     *
     * @return a string with the name of the wireless network (SSID).
     */
    get_ssid(): string
    {
        return this._ssid;
    }

    /**
     * Returns the 802.11 b/g/n channel number used by this network.
     *
     * @return an integer corresponding to the channel.
     */
    get_channel(): number
    {
        return this._channel;
    }

    /**
     * Returns the security algorithm used by the wireless network.
     * If the network implements to security, the value is "OPEN".
     *
     * @return a string with the security algorithm.
     */
    get_security(): string
    {
        return this._sec;
    }

    /**
     * Returns the quality of the wireless network link, in per cents.
     *
     * @return an integer between 0 and 100 corresponding to the signal quality.
     */
    get_linkQuality(): number
    {
        return this._rssi;
    }

    //--- (end of generated code: YWlanRecord implementation)
}

export namespace YWlanRecord {
//--- (generated code: YWlanRecord definitions)
//--- (end of generated code: YWlanRecord definitions)
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
export class YWireless extends YFunction
{
    //--- (generated code: YWireless attributes declaration)
    _className: string;
    _linkQuality: number = YWireless.LINKQUALITY_INVALID;
    _ssid: string = YWireless.SSID_INVALID;
    _channel: number = YWireless.CHANNEL_INVALID;
    _security: YWireless.SECURITY = YWireless.SECURITY_INVALID;
    _message: string = YWireless.MESSAGE_INVALID;
    _wlanConfig: string = YWireless.WLANCONFIG_INVALID;
    _wlanState: YWireless.WLANSTATE = YWireless.WLANSTATE_INVALID;
    _valueCallbackWireless: YWireless.ValueCallback | null = null;

    // API symbols as object properties
    public readonly LINKQUALITY_INVALID: number = YAPI.INVALID_UINT;
    public readonly SSID_INVALID: string = YAPI.INVALID_STRING;
    public readonly CHANNEL_INVALID: number = YAPI.INVALID_UINT;
    public readonly SECURITY_UNKNOWN: YWireless.SECURITY = 0;
    public readonly SECURITY_OPEN: YWireless.SECURITY = 1;
    public readonly SECURITY_WEP: YWireless.SECURITY = 2;
    public readonly SECURITY_WPA: YWireless.SECURITY = 3;
    public readonly SECURITY_WPA2: YWireless.SECURITY = 4;
    public readonly SECURITY_INVALID: YWireless.SECURITY = -1;
    public readonly MESSAGE_INVALID: string = YAPI.INVALID_STRING;
    public readonly WLANCONFIG_INVALID: string = YAPI.INVALID_STRING;
    public readonly WLANSTATE_DOWN: YWireless.WLANSTATE = 0;
    public readonly WLANSTATE_SCANNING: YWireless.WLANSTATE = 1;
    public readonly WLANSTATE_CONNECTED: YWireless.WLANSTATE = 2;
    public readonly WLANSTATE_REJECTED: YWireless.WLANSTATE = 3;
    public readonly WLANSTATE_INVALID: YWireless.WLANSTATE = -1;

    // API symbols as static members
    public static readonly LINKQUALITY_INVALID: number = YAPI.INVALID_UINT;
    public static readonly SSID_INVALID: string = YAPI.INVALID_STRING;
    public static readonly CHANNEL_INVALID: number = YAPI.INVALID_UINT;
    public static readonly SECURITY_UNKNOWN: YWireless.SECURITY = 0;
    public static readonly SECURITY_OPEN: YWireless.SECURITY = 1;
    public static readonly SECURITY_WEP: YWireless.SECURITY = 2;
    public static readonly SECURITY_WPA: YWireless.SECURITY = 3;
    public static readonly SECURITY_WPA2: YWireless.SECURITY = 4;
    public static readonly SECURITY_INVALID: YWireless.SECURITY = -1;
    public static readonly MESSAGE_INVALID: string = YAPI.INVALID_STRING;
    public static readonly WLANCONFIG_INVALID: string = YAPI.INVALID_STRING;
    public static readonly WLANSTATE_DOWN: YWireless.WLANSTATE = 0;
    public static readonly WLANSTATE_SCANNING: YWireless.WLANSTATE = 1;
    public static readonly WLANSTATE_CONNECTED: YWireless.WLANSTATE = 2;
    public static readonly WLANSTATE_REJECTED: YWireless.WLANSTATE = 3;
    public static readonly WLANSTATE_INVALID: YWireless.WLANSTATE = -1;
    //--- (end of generated code: YWireless attributes declaration)

    constructor(yapi: YAPIContext, func: string)
    {
        //--- (generated code: YWireless constructor)
        super(yapi, func);
        this._className                  = 'Wireless';
        //--- (end of generated code: YWireless constructor)
    }

    //--- (generated code: YWireless implementation)

    imm_parseAttr(name: string, val: any)
    {
        switch(name) {
        case 'linkQuality':
            this._linkQuality = <number> <number> val;
            return 1;
        case 'ssid':
            this._ssid = <string> <string> val;
            return 1;
        case 'channel':
            this._channel = <number> <number> val;
            return 1;
        case 'security':
            this._security = <YWireless.SECURITY> <number> val;
            return 1;
        case 'message':
            this._message = <string> <string> val;
            return 1;
        case 'wlanConfig':
            this._wlanConfig = <string> <string> val;
            return 1;
        case 'wlanState':
            this._wlanState = <YWireless.WLANSTATE> <number> val;
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
    async get_linkQuality(): Promise<number>
    {
        let res: number;
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
    async get_ssid(): Promise<string>
    {
        let res: string;
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
    async get_channel(): Promise<number>
    {
        let res: number;
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
    async get_security(): Promise<YWireless.SECURITY>
    {
        let res: number;
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
    async get_message(): Promise<string>
    {
        let res: string;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YWireless.MESSAGE_INVALID;
            }
        }
        res = this._message;
        return res;
    }

    async get_wlanConfig(): Promise<string>
    {
        let res: string;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YWireless.WLANCONFIG_INVALID;
            }
        }
        res = this._wlanConfig;
        return res;
    }

    async set_wlanConfig(newval: string): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('wlanConfig',rest_val);
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
    async get_wlanState(): Promise<YWireless.WLANSTATE>
    {
        let res: number;
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
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
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
    static FindWireless(func: string): YWireless
    {
        let obj: YWireless | null;
        obj = <YWireless> YFunction._FindFromCache('Wireless', func);
        if (obj == null) {
            obj = new YWireless(YAPI, func);
            YFunction._AddToCache('Wireless',  func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a wireless LAN interface for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
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
    static FindWirelessInContext(yctx: YAPIContext, func: string): YWireless
    {
        let obj: YWireless | null;
        obj = <YWireless> YFunction._FindFromCacheInContext(yctx,  'Wireless', func);
        if (obj == null) {
            obj = new YWireless(yctx, func);
            YFunction._AddToCache('Wireless',  func, obj);
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
    async registerValueCallback(callback: YWireless.ValueCallback | null): Promise<number>
    {
        let val: string;
        if (callback != null) {
            await YFunction._UpdateValueCallbackList(this, true);
        } else {
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

    async _invokeValueCallback(value: string): Promise<number>
    {
        if (this._valueCallbackWireless != null) {
            try {
                await this._valueCallbackWireless(this, value);
            } catch (e) {
                this._yapi.imm_log('Exception in valueCallback:', e);
            }
        } else {
            super._invokeValueCallback(value);
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
    async startWlanScan(): Promise<number>
    {
        let config: string;
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
    async joinNetwork(ssid: string, securityKey: string): Promise<number>
    {
        return await this.set_wlanConfig('INFRA:'+ssid+'\\'+securityKey);
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
    async adhocNetwork(ssid: string, securityKey: string): Promise<number>
    {
        return await this.set_wlanConfig('ADHOC:'+ssid+'\\'+securityKey);
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
    async softAPNetwork(ssid: string, securityKey: string): Promise<number>
    {
        return await this.set_wlanConfig('SOFTAP:'+ssid+'\\'+securityKey);
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
    async get_detectedWlans(): Promise<YWlanRecord[]>
    {
        let json: Uint8Array;
        let wlanlist: string[] = [];
        let res: YWlanRecord[] = [];

        json = await this._download('wlan.json?by=name');
        wlanlist = this.imm_json_get_array(json);
        res.length = 0;
        for (let ii in wlanlist) {
            res.push(new YWlanRecord(wlanlist[ii]));
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
    nextWireless(): YWireless | null
    {
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI.SUCCESS) return null;
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, <string> resolve.result);
        if(next_hwid == null) return null;
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
    static FirstWireless(): YWireless | null
    {
        let next_hwid = YAPI.imm_getFirstHardwareId('Wireless');
        if(next_hwid == null) return null;
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
    static FirstWirelessInContext(yctx: YAPIContext): YWireless | null
    {
        let next_hwid = yctx.imm_getFirstHardwareId('Wireless');
        if(next_hwid == null) return null;
        return YWireless.FindWirelessInContext(yctx, next_hwid);
    }

    //--- (end of generated code: YWireless implementation)
}

export namespace YWireless
{
    //--- (generated code: YWireless definitions)
    export const enum SECURITY {
        UNKNOWN = 0,
        OPEN = 1,
        WEP = 2,
        WPA = 3,
        WPA2 = 4,
        INVALID = -1
    }
    export const enum WLANSTATE {
        DOWN = 0,
        SCANNING = 1,
        CONNECTED = 2,
        REJECTED = 3,
        INVALID = -1
    }
    export interface ValueCallback { (func: YWireless, value: string): void }
    //--- (end of generated code: YWireless definitions)
}

