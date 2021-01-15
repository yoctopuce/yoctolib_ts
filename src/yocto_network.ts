/*********************************************************************
 *
 *  $Id: svn_id $
 *
 *  Implements the high-level API for Network functions
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

//--- (YNetwork definitions)
export const enum Y_Readiness {
    DOWN = 0,
    EXISTS = 1,
    LINKED = 2,
    LAN_OK = 3,
    WWW_OK = 4,
    INVALID = -1
}
export const enum Y_Discoverable {
    FALSE = 0,
    TRUE = 1,
    INVALID = -1
}
export const enum Y_CallbackMethod {
    POST = 0,
    GET = 1,
    PUT = 2,
    INVALID = -1
}
export const enum Y_CallbackEncoding {
    FORM = 0,
    JSON = 1,
    JSON_ARRAY = 2,
    CSV = 3,
    YOCTO_API = 4,
    JSON_NUM = 5,
    EMONCMS = 6,
    AZURE = 7,
    INFLUXDB = 8,
    MQTT = 9,
    YOCTO_API_JZON = 10,
    PRTG = 11,
    INFLUXDB_V2 = 12,
    INVALID = -1
}
export interface YNetworkValueCallback { (func: YNetwork, value: string): void }
//--- (end of YNetwork definitions)

//--- (YNetwork class start)
/**
 * YNetwork Class: network interface control interface, available for instance in the
 * YoctoHub-Ethernet, the YoctoHub-GSM-3G-EU, the YoctoHub-GSM-3G-NA or the YoctoHub-Wireless-n
 *
 * YNetwork objects provide access to TCP/IP parameters of Yoctopuce
 * devices that include a built-in network interface.
 */
//--- (end of YNetwork class start)

export class YNetwork extends YFunction
{
    //--- (YNetwork attributes declaration)
    _className: string;
    _readiness: Y_Readiness = YNetwork.READINESS_INVALID;
    _macAddress: string = YNetwork.MACADDRESS_INVALID;
    _ipAddress: string = YNetwork.IPADDRESS_INVALID;
    _subnetMask: string = YNetwork.SUBNETMASK_INVALID;
    _router: string = YNetwork.ROUTER_INVALID;
    _ipConfig: string = YNetwork.IPCONFIG_INVALID;
    _primaryDNS: string = YNetwork.PRIMARYDNS_INVALID;
    _secondaryDNS: string = YNetwork.SECONDARYDNS_INVALID;
    _ntpServer: string = YNetwork.NTPSERVER_INVALID;
    _userPassword: string = YNetwork.USERPASSWORD_INVALID;
    _adminPassword: string = YNetwork.ADMINPASSWORD_INVALID;
    _httpPort: number = YNetwork.HTTPPORT_INVALID;
    _defaultPage: string = YNetwork.DEFAULTPAGE_INVALID;
    _discoverable: Y_Discoverable = YNetwork.DISCOVERABLE_INVALID;
    _wwwWatchdogDelay: number = YNetwork.WWWWATCHDOGDELAY_INVALID;
    _callbackUrl: string = YNetwork.CALLBACKURL_INVALID;
    _callbackMethod: Y_CallbackMethod = YNetwork.CALLBACKMETHOD_INVALID;
    _callbackEncoding: Y_CallbackEncoding = YNetwork.CALLBACKENCODING_INVALID;
    _callbackCredentials: string = YNetwork.CALLBACKCREDENTIALS_INVALID;
    _callbackInitialDelay: number = YNetwork.CALLBACKINITIALDELAY_INVALID;
    _callbackSchedule: string = YNetwork.CALLBACKSCHEDULE_INVALID;
    _callbackMinDelay: number = YNetwork.CALLBACKMINDELAY_INVALID;
    _callbackMaxDelay: number = YNetwork.CALLBACKMAXDELAY_INVALID;
    _poeCurrent: number = YNetwork.POECURRENT_INVALID;
    _valueCallbackNetwork: YNetworkValueCallback | null = null;

    // API symbols as object properties
    public readonly READINESS_DOWN: Y_Readiness = Y_Readiness.DOWN;
    public readonly READINESS_EXISTS: Y_Readiness = Y_Readiness.EXISTS;
    public readonly READINESS_LINKED: Y_Readiness = Y_Readiness.LINKED;
    public readonly READINESS_LAN_OK: Y_Readiness = Y_Readiness.LAN_OK;
    public readonly READINESS_WWW_OK: Y_Readiness = Y_Readiness.WWW_OK;
    public readonly READINESS_INVALID: Y_Readiness = Y_Readiness.INVALID;
    public readonly MACADDRESS_INVALID: string = YAPI.INVALID_STRING;
    public readonly IPADDRESS_INVALID: string = YAPI.INVALID_STRING;
    public readonly SUBNETMASK_INVALID: string = YAPI.INVALID_STRING;
    public readonly ROUTER_INVALID: string = YAPI.INVALID_STRING;
    public readonly IPCONFIG_INVALID: string = YAPI.INVALID_STRING;
    public readonly PRIMARYDNS_INVALID: string = YAPI.INVALID_STRING;
    public readonly SECONDARYDNS_INVALID: string = YAPI.INVALID_STRING;
    public readonly NTPSERVER_INVALID: string = YAPI.INVALID_STRING;
    public readonly USERPASSWORD_INVALID: string = YAPI.INVALID_STRING;
    public readonly ADMINPASSWORD_INVALID: string = YAPI.INVALID_STRING;
    public readonly HTTPPORT_INVALID: number = YAPI.INVALID_UINT;
    public readonly DEFAULTPAGE_INVALID: string = YAPI.INVALID_STRING;
    public readonly DISCOVERABLE_FALSE: Y_Discoverable = Y_Discoverable.FALSE;
    public readonly DISCOVERABLE_TRUE: Y_Discoverable = Y_Discoverable.TRUE;
    public readonly DISCOVERABLE_INVALID: Y_Discoverable = Y_Discoverable.INVALID;
    public readonly WWWWATCHDOGDELAY_INVALID: number = YAPI.INVALID_UINT;
    public readonly CALLBACKURL_INVALID: string = YAPI.INVALID_STRING;
    public readonly CALLBACKMETHOD_POST: Y_CallbackMethod = Y_CallbackMethod.POST;
    public readonly CALLBACKMETHOD_GET: Y_CallbackMethod = Y_CallbackMethod.GET;
    public readonly CALLBACKMETHOD_PUT: Y_CallbackMethod = Y_CallbackMethod.PUT;
    public readonly CALLBACKMETHOD_INVALID: Y_CallbackMethod = Y_CallbackMethod.INVALID;
    public readonly CALLBACKENCODING_FORM: Y_CallbackEncoding = Y_CallbackEncoding.FORM;
    public readonly CALLBACKENCODING_JSON: Y_CallbackEncoding = Y_CallbackEncoding.JSON;
    public readonly CALLBACKENCODING_JSON_ARRAY: Y_CallbackEncoding = Y_CallbackEncoding.JSON_ARRAY;
    public readonly CALLBACKENCODING_CSV: Y_CallbackEncoding = Y_CallbackEncoding.CSV;
    public readonly CALLBACKENCODING_YOCTO_API: Y_CallbackEncoding = Y_CallbackEncoding.YOCTO_API;
    public readonly CALLBACKENCODING_JSON_NUM: Y_CallbackEncoding = Y_CallbackEncoding.JSON_NUM;
    public readonly CALLBACKENCODING_EMONCMS: Y_CallbackEncoding = Y_CallbackEncoding.EMONCMS;
    public readonly CALLBACKENCODING_AZURE: Y_CallbackEncoding = Y_CallbackEncoding.AZURE;
    public readonly CALLBACKENCODING_INFLUXDB: Y_CallbackEncoding = Y_CallbackEncoding.INFLUXDB;
    public readonly CALLBACKENCODING_MQTT: Y_CallbackEncoding = Y_CallbackEncoding.MQTT;
    public readonly CALLBACKENCODING_YOCTO_API_JZON: Y_CallbackEncoding = Y_CallbackEncoding.YOCTO_API_JZON;
    public readonly CALLBACKENCODING_PRTG: Y_CallbackEncoding = Y_CallbackEncoding.PRTG;
    public readonly CALLBACKENCODING_INFLUXDB_V2: Y_CallbackEncoding = Y_CallbackEncoding.INFLUXDB_V2;
    public readonly CALLBACKENCODING_INVALID: Y_CallbackEncoding = Y_CallbackEncoding.INVALID;
    public readonly CALLBACKCREDENTIALS_INVALID: string = YAPI.INVALID_STRING;
    public readonly CALLBACKINITIALDELAY_INVALID: number = YAPI.INVALID_UINT;
    public readonly CALLBACKSCHEDULE_INVALID: string = YAPI.INVALID_STRING;
    public readonly CALLBACKMINDELAY_INVALID: number = YAPI.INVALID_UINT;
    public readonly CALLBACKMAXDELAY_INVALID: number = YAPI.INVALID_UINT;
    public readonly POECURRENT_INVALID: number = YAPI.INVALID_UINT;

    // API symbols as static members
    public static readonly READINESS_DOWN: Y_Readiness = Y_Readiness.DOWN;
    public static readonly READINESS_EXISTS: Y_Readiness = Y_Readiness.EXISTS;
    public static readonly READINESS_LINKED: Y_Readiness = Y_Readiness.LINKED;
    public static readonly READINESS_LAN_OK: Y_Readiness = Y_Readiness.LAN_OK;
    public static readonly READINESS_WWW_OK: Y_Readiness = Y_Readiness.WWW_OK;
    public static readonly READINESS_INVALID: Y_Readiness = Y_Readiness.INVALID;
    public static readonly MACADDRESS_INVALID: string = YAPI.INVALID_STRING;
    public static readonly IPADDRESS_INVALID: string = YAPI.INVALID_STRING;
    public static readonly SUBNETMASK_INVALID: string = YAPI.INVALID_STRING;
    public static readonly ROUTER_INVALID: string = YAPI.INVALID_STRING;
    public static readonly IPCONFIG_INVALID: string = YAPI.INVALID_STRING;
    public static readonly PRIMARYDNS_INVALID: string = YAPI.INVALID_STRING;
    public static readonly SECONDARYDNS_INVALID: string = YAPI.INVALID_STRING;
    public static readonly NTPSERVER_INVALID: string = YAPI.INVALID_STRING;
    public static readonly USERPASSWORD_INVALID: string = YAPI.INVALID_STRING;
    public static readonly ADMINPASSWORD_INVALID: string = YAPI.INVALID_STRING;
    public static readonly HTTPPORT_INVALID: number = YAPI.INVALID_UINT;
    public static readonly DEFAULTPAGE_INVALID: string = YAPI.INVALID_STRING;
    public static readonly DISCOVERABLE_FALSE: Y_Discoverable = Y_Discoverable.FALSE;
    public static readonly DISCOVERABLE_TRUE: Y_Discoverable = Y_Discoverable.TRUE;
    public static readonly DISCOVERABLE_INVALID: Y_Discoverable = Y_Discoverable.INVALID;
    public static readonly WWWWATCHDOGDELAY_INVALID: number = YAPI.INVALID_UINT;
    public static readonly CALLBACKURL_INVALID: string = YAPI.INVALID_STRING;
    public static readonly CALLBACKMETHOD_POST: Y_CallbackMethod = Y_CallbackMethod.POST;
    public static readonly CALLBACKMETHOD_GET: Y_CallbackMethod = Y_CallbackMethod.GET;
    public static readonly CALLBACKMETHOD_PUT: Y_CallbackMethod = Y_CallbackMethod.PUT;
    public static readonly CALLBACKMETHOD_INVALID: Y_CallbackMethod = Y_CallbackMethod.INVALID;
    public static readonly CALLBACKENCODING_FORM: Y_CallbackEncoding = Y_CallbackEncoding.FORM;
    public static readonly CALLBACKENCODING_JSON: Y_CallbackEncoding = Y_CallbackEncoding.JSON;
    public static readonly CALLBACKENCODING_JSON_ARRAY: Y_CallbackEncoding = Y_CallbackEncoding.JSON_ARRAY;
    public static readonly CALLBACKENCODING_CSV: Y_CallbackEncoding = Y_CallbackEncoding.CSV;
    public static readonly CALLBACKENCODING_YOCTO_API: Y_CallbackEncoding = Y_CallbackEncoding.YOCTO_API;
    public static readonly CALLBACKENCODING_JSON_NUM: Y_CallbackEncoding = Y_CallbackEncoding.JSON_NUM;
    public static readonly CALLBACKENCODING_EMONCMS: Y_CallbackEncoding = Y_CallbackEncoding.EMONCMS;
    public static readonly CALLBACKENCODING_AZURE: Y_CallbackEncoding = Y_CallbackEncoding.AZURE;
    public static readonly CALLBACKENCODING_INFLUXDB: Y_CallbackEncoding = Y_CallbackEncoding.INFLUXDB;
    public static readonly CALLBACKENCODING_MQTT: Y_CallbackEncoding = Y_CallbackEncoding.MQTT;
    public static readonly CALLBACKENCODING_YOCTO_API_JZON: Y_CallbackEncoding = Y_CallbackEncoding.YOCTO_API_JZON;
    public static readonly CALLBACKENCODING_PRTG: Y_CallbackEncoding = Y_CallbackEncoding.PRTG;
    public static readonly CALLBACKENCODING_INFLUXDB_V2: Y_CallbackEncoding = Y_CallbackEncoding.INFLUXDB_V2;
    public static readonly CALLBACKENCODING_INVALID: Y_CallbackEncoding = Y_CallbackEncoding.INVALID;
    public static readonly CALLBACKCREDENTIALS_INVALID: string = YAPI.INVALID_STRING;
    public static readonly CALLBACKINITIALDELAY_INVALID: number = YAPI.INVALID_UINT;
    public static readonly CALLBACKSCHEDULE_INVALID: string = YAPI.INVALID_STRING;
    public static readonly CALLBACKMINDELAY_INVALID: number = YAPI.INVALID_UINT;
    public static readonly CALLBACKMAXDELAY_INVALID: number = YAPI.INVALID_UINT;
    public static readonly POECURRENT_INVALID: number = YAPI.INVALID_UINT;
    //--- (end of YNetwork attributes declaration)

//--- (YNetwork return codes)
//--- (end of YNetwork return codes)

    constructor(yapi: YAPIContext, func: string)
    {
        //--- (YNetwork constructor)
        super(yapi, func);
        this._className                  = 'Network';
        //--- (end of YNetwork constructor)
    }

    //--- (YNetwork implementation)

    imm_parseAttr(name: string, val: any)
    {
        switch(name) {
        case 'readiness':
            this._readiness = <Y_Readiness> <number> val;
            return 1;
        case 'macAddress':
            this._macAddress = <string> <string> val;
            return 1;
        case 'ipAddress':
            this._ipAddress = <string> <string> val;
            return 1;
        case 'subnetMask':
            this._subnetMask = <string> <string> val;
            return 1;
        case 'router':
            this._router = <string> <string> val;
            return 1;
        case 'ipConfig':
            this._ipConfig = <string> <string> val;
            return 1;
        case 'primaryDNS':
            this._primaryDNS = <string> <string> val;
            return 1;
        case 'secondaryDNS':
            this._secondaryDNS = <string> <string> val;
            return 1;
        case 'ntpServer':
            this._ntpServer = <string> <string> val;
            return 1;
        case 'userPassword':
            this._userPassword = <string> <string> val;
            return 1;
        case 'adminPassword':
            this._adminPassword = <string> <string> val;
            return 1;
        case 'httpPort':
            this._httpPort = <number> <number> val;
            return 1;
        case 'defaultPage':
            this._defaultPage = <string> <string> val;
            return 1;
        case 'discoverable':
            this._discoverable = <Y_Discoverable> <number> val;
            return 1;
        case 'wwwWatchdogDelay':
            this._wwwWatchdogDelay = <number> <number> val;
            return 1;
        case 'callbackUrl':
            this._callbackUrl = <string> <string> val;
            return 1;
        case 'callbackMethod':
            this._callbackMethod = <Y_CallbackMethod> <number> val;
            return 1;
        case 'callbackEncoding':
            this._callbackEncoding = <Y_CallbackEncoding> <number> val;
            return 1;
        case 'callbackCredentials':
            this._callbackCredentials = <string> <string> val;
            return 1;
        case 'callbackInitialDelay':
            this._callbackInitialDelay = <number> <number> val;
            return 1;
        case 'callbackSchedule':
            this._callbackSchedule = <string> <string> val;
            return 1;
        case 'callbackMinDelay':
            this._callbackMinDelay = <number> <number> val;
            return 1;
        case 'callbackMaxDelay':
            this._callbackMaxDelay = <number> <number> val;
            return 1;
        case 'poeCurrent':
            this._poeCurrent = <number> <number> val;
            return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Returns the current established working mode of the network interface.
     * Level zero (DOWN_0) means that no hardware link has been detected. Either there is no signal
     * on the network cable, or the selected wireless access point cannot be detected.
     * Level 1 (LIVE_1) is reached when the network is detected, but is not yet connected.
     * For a wireless network, this shows that the requested SSID is present.
     * Level 2 (LINK_2) is reached when the hardware connection is established.
     * For a wired network connection, level 2 means that the cable is attached at both ends.
     * For a connection to a wireless access point, it shows that the security parameters
     * are properly configured. For an ad-hoc wireless connection, it means that there is
     * at least one other device connected on the ad-hoc network.
     * Level 3 (DHCP_3) is reached when an IP address has been obtained using DHCP.
     * Level 4 (DNS_4) is reached when the DNS server is reachable on the network.
     * Level 5 (WWW_5) is reached when global connectivity is demonstrated by properly loading the
     * current time from an NTP server.
     *
     * @return a value among Y_READINESS_DOWN, Y_READINESS_EXISTS, Y_READINESS_LINKED, Y_READINESS_LAN_OK
     * and Y_READINESS_WWW_OK corresponding to the current established working mode of the network interface
     *
     * On failure, throws an exception or returns Y_READINESS_INVALID.
     */
    async get_readiness(): Promise<Y_Readiness>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YNetwork.READINESS_INVALID;
            }
        }
        res = this._readiness;
        return res;
    }

    /**
     * Returns the MAC address of the network interface. The MAC address is also available on a sticker
     * on the module, in both numeric and barcode forms.
     *
     * @return a string corresponding to the MAC address of the network interface
     *
     * On failure, throws an exception or returns Y_MACADDRESS_INVALID.
     */
    async get_macAddress(): Promise<string>
    {
        let res: string;
        if (this._cacheExpiration == 0) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YNetwork.MACADDRESS_INVALID;
            }
        }
        res = this._macAddress;
        return res;
    }

    /**
     * Returns the IP address currently in use by the device. The address may have been configured
     * statically, or provided by a DHCP server.
     *
     * @return a string corresponding to the IP address currently in use by the device
     *
     * On failure, throws an exception or returns Y_IPADDRESS_INVALID.
     */
    async get_ipAddress(): Promise<string>
    {
        let res: string;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YNetwork.IPADDRESS_INVALID;
            }
        }
        res = this._ipAddress;
        return res;
    }

    /**
     * Returns the subnet mask currently used by the device.
     *
     * @return a string corresponding to the subnet mask currently used by the device
     *
     * On failure, throws an exception or returns Y_SUBNETMASK_INVALID.
     */
    async get_subnetMask(): Promise<string>
    {
        let res: string;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YNetwork.SUBNETMASK_INVALID;
            }
        }
        res = this._subnetMask;
        return res;
    }

    /**
     * Returns the IP address of the router on the device subnet (default gateway).
     *
     * @return a string corresponding to the IP address of the router on the device subnet (default gateway)
     *
     * On failure, throws an exception or returns Y_ROUTER_INVALID.
     */
    async get_router(): Promise<string>
    {
        let res: string;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YNetwork.ROUTER_INVALID;
            }
        }
        res = this._router;
        return res;
    }

    /**
     * Returns the IP configuration of the network interface.
     *
     * If the network interface is setup to use a static IP address, the string starts with "STATIC:" and
     * is followed by three
     * parameters, separated by "/". The first is the device IP address, followed by the subnet mask
     * length, and finally the
     * router IP address (default gateway). For instance: "STATIC:192.168.1.14/16/192.168.1.1"
     *
     * If the network interface is configured to receive its IP from a DHCP server, the string start with
     * "DHCP:" and is followed by
     * three parameters separated by "/". The first is the fallback IP address, then the fallback subnet
     * mask length and finally the
     * fallback router IP address. These three parameters are used when no DHCP reply is received.
     *
     * @return a string corresponding to the IP configuration of the network interface
     *
     * On failure, throws an exception or returns Y_IPCONFIG_INVALID.
     */
    async get_ipConfig(): Promise<string>
    {
        let res: string;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YNetwork.IPCONFIG_INVALID;
            }
        }
        res = this._ipConfig;
        return res;
    }

    async set_ipConfig(newval: string): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('ipConfig',rest_val);
    }

    /**
     * Returns the IP address of the primary name server to be used by the module.
     *
     * @return a string corresponding to the IP address of the primary name server to be used by the module
     *
     * On failure, throws an exception or returns Y_PRIMARYDNS_INVALID.
     */
    async get_primaryDNS(): Promise<string>
    {
        let res: string;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YNetwork.PRIMARYDNS_INVALID;
            }
        }
        res = this._primaryDNS;
        return res;
    }

    /**
     * Changes the IP address of the primary name server to be used by the module.
     * When using DHCP, if a value is specified, it overrides the value received from the DHCP server.
     * Remember to call the saveToFlash() method and then to reboot the module to apply this setting.
     *
     * @param newval : a string corresponding to the IP address of the primary name server to be used by the module
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_primaryDNS(newval: string): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('primaryDNS',rest_val);
    }

    /**
     * Returns the IP address of the secondary name server to be used by the module.
     *
     * @return a string corresponding to the IP address of the secondary name server to be used by the module
     *
     * On failure, throws an exception or returns Y_SECONDARYDNS_INVALID.
     */
    async get_secondaryDNS(): Promise<string>
    {
        let res: string;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YNetwork.SECONDARYDNS_INVALID;
            }
        }
        res = this._secondaryDNS;
        return res;
    }

    /**
     * Changes the IP address of the secondary name server to be used by the module.
     * When using DHCP, if a value is specified, it overrides the value received from the DHCP server.
     * Remember to call the saveToFlash() method and then to reboot the module to apply this setting.
     *
     * @param newval : a string corresponding to the IP address of the secondary name server to be used by the module
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_secondaryDNS(newval: string): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('secondaryDNS',rest_val);
    }

    /**
     * Returns the IP address of the NTP server to be used by the device.
     *
     * @return a string corresponding to the IP address of the NTP server to be used by the device
     *
     * On failure, throws an exception or returns Y_NTPSERVER_INVALID.
     */
    async get_ntpServer(): Promise<string>
    {
        let res: string;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YNetwork.NTPSERVER_INVALID;
            }
        }
        res = this._ntpServer;
        return res;
    }

    /**
     * Changes the IP address of the NTP server to be used by the module. Use an empty
     * string to restore the factory set  address.
     * Remember to call the saveToFlash() method and then to reboot the module to apply this setting.
     *
     * @param newval : a string corresponding to the IP address of the NTP server to be used by the module
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_ntpServer(newval: string): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('ntpServer',rest_val);
    }

    /**
     * Returns a hash string if a password has been set for "user" user,
     * or an empty string otherwise.
     *
     * @return a string corresponding to a hash string if a password has been set for "user" user,
     *         or an empty string otherwise
     *
     * On failure, throws an exception or returns Y_USERPASSWORD_INVALID.
     */
    async get_userPassword(): Promise<string>
    {
        let res: string;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YNetwork.USERPASSWORD_INVALID;
            }
        }
        res = this._userPassword;
        return res;
    }

    /**
     * Changes the password for the "user" user. This password becomes instantly required
     * to perform any use of the module. If the specified value is an
     * empty string, a password is not required anymore.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : a string corresponding to the password for the "user" user
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_userPassword(newval: string): Promise<number>
    {
        let rest_val: string;
        if (newval.length > this._yapi.HASH_BUF_SIZE) {
            return this._throw(this._yapi.INVALID_ARGUMENT, 'Password too long :' + newval, this._yapi.INVALID_ARGUMENT);
        }
        rest_val = String(newval);
        return await this._setAttr('userPassword',rest_val);
    }

    /**
     * Returns a hash string if a password has been set for user "admin",
     * or an empty string otherwise.
     *
     * @return a string corresponding to a hash string if a password has been set for user "admin",
     *         or an empty string otherwise
     *
     * On failure, throws an exception or returns Y_ADMINPASSWORD_INVALID.
     */
    async get_adminPassword(): Promise<string>
    {
        let res: string;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YNetwork.ADMINPASSWORD_INVALID;
            }
        }
        res = this._adminPassword;
        return res;
    }

    /**
     * Changes the password for the "admin" user. This password becomes instantly required
     * to perform any change of the module state. If the specified value is an
     * empty string, a password is not required anymore.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : a string corresponding to the password for the "admin" user
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_adminPassword(newval: string): Promise<number>
    {
        let rest_val: string;
        if (newval.length > this._yapi.HASH_BUF_SIZE) {
            return this._throw(this._yapi.INVALID_ARGUMENT, 'Password too long :' + newval, this._yapi.INVALID_ARGUMENT);
        }
        rest_val = String(newval);
        return await this._setAttr('adminPassword',rest_val);
    }

    /**
     * Returns the TCP port used to serve the hub web UI.
     *
     * @return an integer corresponding to the TCP port used to serve the hub web UI
     *
     * On failure, throws an exception or returns Y_HTTPPORT_INVALID.
     */
    async get_httpPort(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YNetwork.HTTPPORT_INVALID;
            }
        }
        res = this._httpPort;
        return res;
    }

    /**
     * Changes the the TCP port used to serve the hub web UI. The default value is port 80,
     * which is the default for all Web servers. Regardless of the value set here,
     * the hub will always reply on port 4444, which is used by default by Yoctopuce
     * API library. When you change this parameter, remember to call the saveToFlash()
     * method of the module if the modification must be kept.
     *
     * @param newval : an integer corresponding to the the TCP port used to serve the hub web UI
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_httpPort(newval: number): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('httpPort',rest_val);
    }

    /**
     * Returns the HTML page to serve for the URL "/"" of the hub.
     *
     * @return a string corresponding to the HTML page to serve for the URL "/"" of the hub
     *
     * On failure, throws an exception or returns Y_DEFAULTPAGE_INVALID.
     */
    async get_defaultPage(): Promise<string>
    {
        let res: string;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YNetwork.DEFAULTPAGE_INVALID;
            }
        }
        res = this._defaultPage;
        return res;
    }

    /**
     * Changes the default HTML page returned by the hub. If not value are set the hub return
     * "index.html" which is the web interface of the hub. It is possible to change this page
     * for file that has been uploaded on the hub. The maximum filename size is 15 characters.
     * When you change this parameter, remember to call the saveToFlash()
     * method of the module if the modification must be kept.
     *
     * @param newval : a string corresponding to the default HTML page returned by the hub
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_defaultPage(newval: string): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('defaultPage',rest_val);
    }

    /**
     * Returns the activation state of the multicast announce protocols to allow easy
     * discovery of the module in the network neighborhood (uPnP/Bonjour protocol).
     *
     * @return either Y_DISCOVERABLE_FALSE or Y_DISCOVERABLE_TRUE, according to the activation state of
     * the multicast announce protocols to allow easy
     *         discovery of the module in the network neighborhood (uPnP/Bonjour protocol)
     *
     * On failure, throws an exception or returns Y_DISCOVERABLE_INVALID.
     */
    async get_discoverable(): Promise<Y_Discoverable>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YNetwork.DISCOVERABLE_INVALID;
            }
        }
        res = this._discoverable;
        return res;
    }

    /**
     * Changes the activation state of the multicast announce protocols to allow easy
     * discovery of the module in the network neighborhood (uPnP/Bonjour protocol).
     * Remember to call the saveToFlash()
     * method of the module if the modification must be kept.
     *
     * @param newval : either Y_DISCOVERABLE_FALSE or Y_DISCOVERABLE_TRUE, according to the activation
     * state of the multicast announce protocols to allow easy
     *         discovery of the module in the network neighborhood (uPnP/Bonjour protocol)
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_discoverable(newval: Y_Discoverable): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('discoverable',rest_val);
    }

    /**
     * Returns the allowed downtime of the WWW link (in seconds) before triggering an automated
     * reboot to try to recover Internet connectivity. A zero value disables automated reboot
     * in case of Internet connectivity loss.
     *
     * @return an integer corresponding to the allowed downtime of the WWW link (in seconds) before
     * triggering an automated
     *         reboot to try to recover Internet connectivity
     *
     * On failure, throws an exception or returns Y_WWWWATCHDOGDELAY_INVALID.
     */
    async get_wwwWatchdogDelay(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YNetwork.WWWWATCHDOGDELAY_INVALID;
            }
        }
        res = this._wwwWatchdogDelay;
        return res;
    }

    /**
     * Changes the allowed downtime of the WWW link (in seconds) before triggering an automated
     * reboot to try to recover Internet connectivity. A zero value disables automated reboot
     * in case of Internet connectivity loss. The smallest valid non-zero timeout is
     * 90 seconds. Remember to call the saveToFlash()
     * method of the module if the modification must be kept.
     *
     * @param newval : an integer corresponding to the allowed downtime of the WWW link (in seconds)
     * before triggering an automated
     *         reboot to try to recover Internet connectivity
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_wwwWatchdogDelay(newval: number): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('wwwWatchdogDelay',rest_val);
    }

    /**
     * Returns the callback URL to notify of significant state changes.
     *
     * @return a string corresponding to the callback URL to notify of significant state changes
     *
     * On failure, throws an exception or returns Y_CALLBACKURL_INVALID.
     */
    async get_callbackUrl(): Promise<string>
    {
        let res: string;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YNetwork.CALLBACKURL_INVALID;
            }
        }
        res = this._callbackUrl;
        return res;
    }

    /**
     * Changes the callback URL to notify significant state changes. Remember to call the
     * saveToFlash() method of the module if the modification must be kept.
     *
     * @param newval : a string corresponding to the callback URL to notify significant state changes
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_callbackUrl(newval: string): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('callbackUrl',rest_val);
    }

    /**
     * Returns the HTTP method used to notify callbacks for significant state changes.
     *
     * @return a value among Y_CALLBACKMETHOD_POST, Y_CALLBACKMETHOD_GET and Y_CALLBACKMETHOD_PUT
     * corresponding to the HTTP method used to notify callbacks for significant state changes
     *
     * On failure, throws an exception or returns Y_CALLBACKMETHOD_INVALID.
     */
    async get_callbackMethod(): Promise<Y_CallbackMethod>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YNetwork.CALLBACKMETHOD_INVALID;
            }
        }
        res = this._callbackMethod;
        return res;
    }

    /**
     * Changes the HTTP method used to notify callbacks for significant state changes.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : a value among Y_CALLBACKMETHOD_POST, Y_CALLBACKMETHOD_GET and Y_CALLBACKMETHOD_PUT
     * corresponding to the HTTP method used to notify callbacks for significant state changes
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_callbackMethod(newval: Y_CallbackMethod): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('callbackMethod',rest_val);
    }

    /**
     * Returns the encoding standard to use for representing notification values.
     *
     * @return a value among Y_CALLBACKENCODING_FORM, Y_CALLBACKENCODING_JSON,
     * Y_CALLBACKENCODING_JSON_ARRAY, Y_CALLBACKENCODING_CSV, Y_CALLBACKENCODING_YOCTO_API,
     * Y_CALLBACKENCODING_JSON_NUM, Y_CALLBACKENCODING_EMONCMS, Y_CALLBACKENCODING_AZURE,
     * Y_CALLBACKENCODING_INFLUXDB, Y_CALLBACKENCODING_MQTT, Y_CALLBACKENCODING_YOCTO_API_JZON,
     * Y_CALLBACKENCODING_PRTG and Y_CALLBACKENCODING_INFLUXDB_V2 corresponding to the encoding standard
     * to use for representing notification values
     *
     * On failure, throws an exception or returns Y_CALLBACKENCODING_INVALID.
     */
    async get_callbackEncoding(): Promise<Y_CallbackEncoding>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YNetwork.CALLBACKENCODING_INVALID;
            }
        }
        res = this._callbackEncoding;
        return res;
    }

    /**
     * Changes the encoding standard to use for representing notification values.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : a value among Y_CALLBACKENCODING_FORM, Y_CALLBACKENCODING_JSON,
     * Y_CALLBACKENCODING_JSON_ARRAY, Y_CALLBACKENCODING_CSV, Y_CALLBACKENCODING_YOCTO_API,
     * Y_CALLBACKENCODING_JSON_NUM, Y_CALLBACKENCODING_EMONCMS, Y_CALLBACKENCODING_AZURE,
     * Y_CALLBACKENCODING_INFLUXDB, Y_CALLBACKENCODING_MQTT, Y_CALLBACKENCODING_YOCTO_API_JZON,
     * Y_CALLBACKENCODING_PRTG and Y_CALLBACKENCODING_INFLUXDB_V2 corresponding to the encoding standard
     * to use for representing notification values
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_callbackEncoding(newval: Y_CallbackEncoding): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('callbackEncoding',rest_val);
    }

    /**
     * Returns a hashed version of the notification callback credentials if set,
     * or an empty string otherwise.
     *
     * @return a string corresponding to a hashed version of the notification callback credentials if set,
     *         or an empty string otherwise
     *
     * On failure, throws an exception or returns Y_CALLBACKCREDENTIALS_INVALID.
     */
    async get_callbackCredentials(): Promise<string>
    {
        let res: string;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YNetwork.CALLBACKCREDENTIALS_INVALID;
            }
        }
        res = this._callbackCredentials;
        return res;
    }

    /**
     * Changes the credentials required to connect to the callback address. The credentials
     * must be provided as returned by function get_callbackCredentials,
     * in the form username:hash. The method used to compute the hash varies according
     * to the the authentication scheme implemented by the callback, For Basic authentication,
     * the hash is the MD5 of the string username:password. For Digest authentication,
     * the hash is the MD5 of the string username:realm:password. For a simpler
     * way to configure callback credentials, use function callbackLogin instead.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : a string corresponding to the credentials required to connect to the callback address
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_callbackCredentials(newval: string): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('callbackCredentials',rest_val);
    }

    /**
     * Connects to the notification callback and saves the credentials required to
     * log into it. The password is not stored into the module, only a hashed
     * copy of the credentials are saved. Remember to call the
     * saveToFlash() method of the module if the modification must be kept.
     *
     * @param username : username required to log to the callback
     * @param password : password required to log to the callback
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async callbackLogin(username: string,password: string): Promise<number>
    {
        let rest_val: string;
        rest_val = username+':'+password;
        return await this._setAttr('callbackCredentials',rest_val);
    }

    /**
     * Returns the initial waiting time before first callback notifications, in seconds.
     *
     * @return an integer corresponding to the initial waiting time before first callback notifications, in seconds
     *
     * On failure, throws an exception or returns Y_CALLBACKINITIALDELAY_INVALID.
     */
    async get_callbackInitialDelay(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YNetwork.CALLBACKINITIALDELAY_INVALID;
            }
        }
        res = this._callbackInitialDelay;
        return res;
    }

    /**
     * Changes the initial waiting time before first callback notifications, in seconds.
     * Remember to call the saveToFlash() method of the module if the modification must be kept.
     *
     * @param newval : an integer corresponding to the initial waiting time before first callback
     * notifications, in seconds
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_callbackInitialDelay(newval: number): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('callbackInitialDelay',rest_val);
    }

    /**
     * Returns the HTTP callback schedule strategy, as a text string.
     *
     * @return a string corresponding to the HTTP callback schedule strategy, as a text string
     *
     * On failure, throws an exception or returns Y_CALLBACKSCHEDULE_INVALID.
     */
    async get_callbackSchedule(): Promise<string>
    {
        let res: string;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YNetwork.CALLBACKSCHEDULE_INVALID;
            }
        }
        res = this._callbackSchedule;
        return res;
    }

    /**
     * Changes the HTTP callback schedule strategy, as a text string.
     * Remember to call the saveToFlash()
     * method of the module if the modification must be kept.
     *
     * @param newval : a string corresponding to the HTTP callback schedule strategy, as a text string
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_callbackSchedule(newval: string): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('callbackSchedule',rest_val);
    }

    /**
     * Returns the minimum waiting time between two HTTP callbacks, in seconds.
     *
     * @return an integer corresponding to the minimum waiting time between two HTTP callbacks, in seconds
     *
     * On failure, throws an exception or returns Y_CALLBACKMINDELAY_INVALID.
     */
    async get_callbackMinDelay(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YNetwork.CALLBACKMINDELAY_INVALID;
            }
        }
        res = this._callbackMinDelay;
        return res;
    }

    /**
     * Changes the minimum waiting time between two HTTP callbacks, in seconds.
     * Remember to call the saveToFlash() method of the module if the modification must be kept.
     *
     * @param newval : an integer corresponding to the minimum waiting time between two HTTP callbacks, in seconds
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_callbackMinDelay(newval: number): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('callbackMinDelay',rest_val);
    }

    /**
     * Returns the waiting time between two HTTP callbacks when there is nothing new.
     *
     * @return an integer corresponding to the waiting time between two HTTP callbacks when there is nothing new
     *
     * On failure, throws an exception or returns Y_CALLBACKMAXDELAY_INVALID.
     */
    async get_callbackMaxDelay(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YNetwork.CALLBACKMAXDELAY_INVALID;
            }
        }
        res = this._callbackMaxDelay;
        return res;
    }

    /**
     * Changes the waiting time between two HTTP callbacks when there is nothing new.
     * Remember to call the saveToFlash() method of the module if the modification must be kept.
     *
     * @param newval : an integer corresponding to the waiting time between two HTTP callbacks when there
     * is nothing new
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_callbackMaxDelay(newval: number): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('callbackMaxDelay',rest_val);
    }

    /**
     * Returns the current consumed by the module from Power-over-Ethernet (PoE), in milliamps.
     * The current consumption is measured after converting PoE source to 5 Volt, and should
     * never exceed 1800 mA.
     *
     * @return an integer corresponding to the current consumed by the module from Power-over-Ethernet
     * (PoE), in milliamps
     *
     * On failure, throws an exception or returns Y_POECURRENT_INVALID.
     */
    async get_poeCurrent(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YNetwork.POECURRENT_INVALID;
            }
        }
        res = this._poeCurrent;
        return res;
    }

    /**
     * Retrieves $AFUNCTION$ for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that $THEFUNCTION$ is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YNetwork.isOnline() to test if $THEFUNCTION$ is
     * indeed online at a given time. In case of ambiguity when looking for
     * $AFUNCTION$ by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes $THEFUNCTION$, for instance
     *         $FULLHARDWAREID$.
     *
     * @return a YNetwork object allowing you to drive $THEFUNCTION$.
     */
    static FindNetwork(func: string): YNetwork
    {
        let obj: YNetwork;
        obj = <YNetwork> YFunction._FindFromCache('Network', func);
        if (obj == null) {
            obj = new YNetwork(YAPI, func);
            YFunction._AddToCache('Network',  func, obj);
        }
        return obj;
    }

    /**
     * Retrieves $AFUNCTION$ for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that $THEFUNCTION$ is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YNetwork.isOnline() to test if $THEFUNCTION$ is
     * indeed online at a given time. In case of ambiguity when looking for
     * $AFUNCTION$ by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx : a YAPI context
     * @param func : a string that uniquely characterizes $THEFUNCTION$, for instance
     *         $FULLHARDWAREID$.
     *
     * @return a YNetwork object allowing you to drive $THEFUNCTION$.
     */
    static FindNetworkInContext(yctx: YAPIContext, func: string): YNetwork
    {
        let obj: YNetwork;
        obj = <YNetwork> YFunction._FindFromCacheInContext(yctx,  'Network', func);
        if (obj == null) {
            obj = new YNetwork(yctx, func);
            YFunction._AddToCache('Network',  func, obj);
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
    async registerValueCallback(callback: YNetworkValueCallback | null): Promise<number>
    {
        let val: string;
        if (callback != null) {
            await YFunction._UpdateValueCallbackList(this, true);
        } else {
            await YFunction._UpdateValueCallbackList(this, false);
        }
        this._valueCallbackNetwork = callback;
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
        if (this._valueCallbackNetwork != null) {
            try {
                await this._valueCallbackNetwork(this, value);
            } catch (e) {
                this._yapi.imm_log('Exception in valueCallback:', e);
            }
        } else {
            super._invokeValueCallback(value);
        }
        return 0;
    }

    /**
     * Changes the configuration of the network interface to enable the use of an
     * IP address received from a DHCP server. Until an address is received from a DHCP
     * server, the module uses the IP parameters specified to this function.
     * Remember to call the saveToFlash() method and then to reboot the module to apply this setting.
     *
     * @param fallbackIpAddr : fallback IP address, to be used when no DHCP reply is received
     * @param fallbackSubnetMaskLen : fallback subnet mask length when no DHCP reply is received, as an
     *         integer (e.g. 24 means 255.255.255.0)
     * @param fallbackRouter : fallback router IP address, to be used when no DHCP reply is received
     *
     * @return YAPI_SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async useDHCP(fallbackIpAddr: string, fallbackSubnetMaskLen: number, fallbackRouter: string): Promise<number>
    {
        return await this.set_ipConfig('DHCP:'+fallbackIpAddr+'/'+String(Math.round(fallbackSubnetMaskLen))+'/'+fallbackRouter);
    }

    /**
     * Changes the configuration of the network interface to enable the use of an
     * IP address received from a DHCP server. Until an address is received from a DHCP
     * server, the module uses an IP of the network 169.254.0.0/16 (APIPA).
     * Remember to call the saveToFlash() method and then to reboot the module to apply this setting.
     *
     * @return YAPI_SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async useDHCPauto(): Promise<number>
    {
        return await this.set_ipConfig('DHCP:');
    }

    /**
     * Changes the configuration of the network interface to use a static IP address.
     * Remember to call the saveToFlash() method and then to reboot the module to apply this setting.
     *
     * @param ipAddress : device IP address
     * @param subnetMaskLen : subnet mask length, as an integer (e.g. 24 means 255.255.255.0)
     * @param router : router IP address (default gateway)
     *
     * @return YAPI_SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async useStaticIP(ipAddress: string, subnetMaskLen: number, router: string): Promise<number>
    {
        return await this.set_ipConfig('STATIC:'+ipAddress+'/'+String(Math.round(subnetMaskLen))+'/'+router);
    }

    /**
     * Pings host to test the network connectivity. Sends four ICMP ECHO_REQUEST requests from the
     * module to the target host. This method returns a string with the result of the
     * 4 ICMP ECHO_REQUEST requests.
     *
     * @param host : the hostname or the IP address of the target
     *
     * @return a string with the result of the ping.
     */
    async ping(host: string): Promise<string>
    {
        let content: Uint8Array;

        content = await this._download('ping.txt?host='+host);
        return this._yapi.imm_bin2str(content);
    }

    /**
     * Trigger an HTTP callback quickly. This function can even be called within
     * an HTTP callback, in which case the next callback will be triggered 5 seconds
     * after the end of the current callback, regardless if the minimum time between
     * callbacks configured in the device.
     *
     * @return YAPI_SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async triggerCallback(): Promise<number>
    {
        return await this.set_callbackMethod(await this.get_callbackMethod());
    }

    /**
     * Setup periodic HTTP callbacks (simplified function).
     *
     * @param interval : a string representing the callback periodicity, expressed in
     *         seconds, minutes or hours, eg. "60s", "5m", "1h", "48h".
     * @param offset : an integer representing the time offset relative to the period
     *         when the callback should occur. For instance, if the periodicity is
     *         24h, an offset of 7 will make the callback occur each day at 7AM.
     *
     * @return YAPI_SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_periodicCallbackSchedule(interval: string, offset: number): Promise<number>
    {
        return await this.set_callbackSchedule('every '+interval+'+'+String(Math.round(offset)));
    }

    /**
     * Returns the next Network
     *
     * @returns {YNetwork}
     */
    nextNetwork(): YNetwork | null
    {
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI.SUCCESS) return null;
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, <string> resolve.result);
        if(next_hwid == null) return null;
        return YNetwork.FindNetworkInContext(this._yapi, next_hwid);
    }

    /**
     * Retrieves the first Network in a YAPI context
     *
     * @returns {YNetwork}
     */
    static FirstNetwork(): YNetwork | null
    {
        let next_hwid = YAPI.imm_getFirstHardwareId('Network');
        if(next_hwid == null) return null;
        return YNetwork.FindNetwork(next_hwid);
    }

    /**
     * Retrieves the first Network in a given context
     *
     * @param yctx {YAPIContext}
     *
     * @returns {YNetwork}
     */
    static FirstNetworkInContext(yctx: YAPIContext): YNetwork | null
    {
        let next_hwid = yctx.imm_getFirstHardwareId('Network');
        if(next_hwid == null) return null;
        return YNetwork.FindNetworkInContext(yctx, next_hwid);
    }

    //--- (end of YNetwork implementation)
}

