/*********************************************************************
 *
 *  $Id: yocto_wireless.ts 43760 2021-02-08 14:33:45Z mvuilleu $
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
import { YAPIContext, YFunction } from './yocto_api.js';
/**
 * YWlanRecord Class: Wireless network description, returned by wireless.get_detectedWlans method
 *
 * YWlanRecord objects are used to describe a wireless network.
 * These objects are  used in particular in conjunction with the
 * YWireless class.
 */
export declare class YWlanRecord {
    _ssid: string;
    _channel: number;
    _sec: string;
    _rssi: number;
    constructor(str_json: string);
    /**
     * Returns the name of the wireless network (SSID).
     *
     * @return a string with the name of the wireless network (SSID).
     */
    get_ssid(): string;
    /**
     * Returns the 802.11 b/g/n channel number used by this network.
     *
     * @return an integer corresponding to the channel.
     */
    get_channel(): number;
    /**
     * Returns the security algorithm used by the wireless network.
     * If the network implements to security, the value is "OPEN".
     *
     * @return a string with the security algorithm.
     */
    get_security(): string;
    /**
     * Returns the quality of the wireless network link, in per cents.
     *
     * @return an integer between 0 and 100 corresponding to the signal quality.
     */
    get_linkQuality(): number;
}
export declare namespace YWlanRecord {
}
/**
 * YWireless Class: wireless LAN interface control interface, available for instance in the
 * YoctoHub-Wireless, the YoctoHub-Wireless-SR, the YoctoHub-Wireless-g or the YoctoHub-Wireless-n
 *
 * The YWireless class provides control over wireless network parameters
 * and status for devices that are wireless-enabled.
 * Note that TCP/IP parameters are configured separately, using class YNetwork.
 */
/** @extends {YFunction} **/
export declare class YWireless extends YFunction {
    _className: string;
    _linkQuality: number;
    _ssid: string;
    _channel: number;
    _security: YWireless.SECURITY;
    _message: string;
    _wlanConfig: string;
    _wlanState: YWireless.WLANSTATE;
    _valueCallbackWireless: YWireless.ValueCallback | null;
    readonly LINKQUALITY_INVALID: number;
    readonly SSID_INVALID: string;
    readonly CHANNEL_INVALID: number;
    readonly SECURITY_UNKNOWN: YWireless.SECURITY;
    readonly SECURITY_OPEN: YWireless.SECURITY;
    readonly SECURITY_WEP: YWireless.SECURITY;
    readonly SECURITY_WPA: YWireless.SECURITY;
    readonly SECURITY_WPA2: YWireless.SECURITY;
    readonly SECURITY_INVALID: YWireless.SECURITY;
    readonly MESSAGE_INVALID: string;
    readonly WLANCONFIG_INVALID: string;
    readonly WLANSTATE_DOWN: YWireless.WLANSTATE;
    readonly WLANSTATE_SCANNING: YWireless.WLANSTATE;
    readonly WLANSTATE_CONNECTED: YWireless.WLANSTATE;
    readonly WLANSTATE_REJECTED: YWireless.WLANSTATE;
    readonly WLANSTATE_INVALID: YWireless.WLANSTATE;
    static readonly LINKQUALITY_INVALID: number;
    static readonly SSID_INVALID: string;
    static readonly CHANNEL_INVALID: number;
    static readonly SECURITY_UNKNOWN: YWireless.SECURITY;
    static readonly SECURITY_OPEN: YWireless.SECURITY;
    static readonly SECURITY_WEP: YWireless.SECURITY;
    static readonly SECURITY_WPA: YWireless.SECURITY;
    static readonly SECURITY_WPA2: YWireless.SECURITY;
    static readonly SECURITY_INVALID: YWireless.SECURITY;
    static readonly MESSAGE_INVALID: string;
    static readonly WLANCONFIG_INVALID: string;
    static readonly WLANSTATE_DOWN: YWireless.WLANSTATE;
    static readonly WLANSTATE_SCANNING: YWireless.WLANSTATE;
    static readonly WLANSTATE_CONNECTED: YWireless.WLANSTATE;
    static readonly WLANSTATE_REJECTED: YWireless.WLANSTATE;
    static readonly WLANSTATE_INVALID: YWireless.WLANSTATE;
    constructor(yapi: YAPIContext, func: string);
    imm_parseAttr(name: string, val: any): 0 | 1;
    /**
     * Returns the link quality, expressed in percent.
     *
     * @return an integer corresponding to the link quality, expressed in percent
     *
     * On failure, throws an exception or returns YWireless.LINKQUALITY_INVALID.
     */
    get_linkQuality(): Promise<number>;
    /**
     * Returns the wireless network name (SSID).
     *
     * @return a string corresponding to the wireless network name (SSID)
     *
     * On failure, throws an exception or returns YWireless.SSID_INVALID.
     */
    get_ssid(): Promise<string>;
    /**
     * Returns the 802.11 channel currently used, or 0 when the selected network has not been found.
     *
     * @return an integer corresponding to the 802.11 channel currently used, or 0 when the selected
     * network has not been found
     *
     * On failure, throws an exception or returns YWireless.CHANNEL_INVALID.
     */
    get_channel(): Promise<number>;
    /**
     * Returns the security algorithm used by the selected wireless network.
     *
     * @return a value among YWireless.SECURITY_UNKNOWN, YWireless.SECURITY_OPEN, YWireless.SECURITY_WEP,
     * YWireless.SECURITY_WPA and YWireless.SECURITY_WPA2 corresponding to the security algorithm used by
     * the selected wireless network
     *
     * On failure, throws an exception or returns YWireless.SECURITY_INVALID.
     */
    get_security(): Promise<YWireless.SECURITY>;
    /**
     * Returns the latest status message from the wireless interface.
     *
     * @return a string corresponding to the latest status message from the wireless interface
     *
     * On failure, throws an exception or returns YWireless.MESSAGE_INVALID.
     */
    get_message(): Promise<string>;
    get_wlanConfig(): Promise<string>;
    set_wlanConfig(newval: string): Promise<number>;
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
    get_wlanState(): Promise<YWireless.WLANSTATE>;
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
    static FindWireless(func: string): YWireless;
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
    static FindWirelessInContext(yctx: YAPIContext, func: string): YWireless;
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
    registerValueCallback(callback: YWireless.ValueCallback | null): Promise<number>;
    _invokeValueCallback(value: string): Promise<number>;
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
    startWlanScan(): Promise<number>;
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
    joinNetwork(ssid: string, securityKey: string): Promise<number>;
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
    adhocNetwork(ssid: string, securityKey: string): Promise<number>;
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
    softAPNetwork(ssid: string, securityKey: string): Promise<number>;
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
    get_detectedWlans(): Promise<YWlanRecord[]>;
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
    nextWireless(): YWireless | null;
    /**
     * Starts the enumeration of wireless LAN interfaces currently accessible.
     * Use the method YWireless.nextWireless() to iterate on
     * next wireless LAN interfaces.
     *
     * @return a pointer to a YWireless object, corresponding to
     *         the first wireless LAN interface currently online, or a null pointer
     *         if there are none.
     */
    static FirstWireless(): YWireless | null;
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
    static FirstWirelessInContext(yctx: YAPIContext): YWireless | null;
}
export declare namespace YWireless {
    const enum SECURITY {
        UNKNOWN = 0,
        OPEN = 1,
        WEP = 2,
        WPA = 3,
        WPA2 = 4,
        INVALID = -1
    }
    const enum WLANSTATE {
        DOWN = 0,
        SCANNING = 1,
        CONNECTED = 2,
        REJECTED = 3,
        INVALID = -1
    }
    interface ValueCallback {
        (func: YWireless, value: string): void;
    }
}
