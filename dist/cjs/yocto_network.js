"use strict";
/*********************************************************************
 *
 *  $Id: yocto_network.ts 53420 2023-03-06 10:38:51Z mvuilleu $
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.YNetwork = void 0;
const yocto_api_js_1 = require("./yocto_api.js");
//--- (YNetwork class start)
/**
 * YNetwork Class: network interface control interface, available for instance in the
 * YoctoHub-Ethernet, the YoctoHub-GSM-4G, the YoctoHub-Wireless-SR or the YoctoHub-Wireless-n
 *
 * YNetwork objects provide access to TCP/IP parameters of Yoctopuce
 * devices that include a built-in network interface.
 */
//--- (end of YNetwork class start)
class YNetwork extends yocto_api_js_1.YFunction {
    //--- (end of YNetwork attributes declaration)
    constructor(yapi, func) {
        //--- (YNetwork constructor)
        super(yapi, func);
        this._readiness = YNetwork.READINESS_INVALID;
        this._macAddress = YNetwork.MACADDRESS_INVALID;
        this._ipAddress = YNetwork.IPADDRESS_INVALID;
        this._subnetMask = YNetwork.SUBNETMASK_INVALID;
        this._router = YNetwork.ROUTER_INVALID;
        this._currentDNS = YNetwork.CURRENTDNS_INVALID;
        this._ipConfig = YNetwork.IPCONFIG_INVALID;
        this._primaryDNS = YNetwork.PRIMARYDNS_INVALID;
        this._secondaryDNS = YNetwork.SECONDARYDNS_INVALID;
        this._ntpServer = YNetwork.NTPSERVER_INVALID;
        this._userPassword = YNetwork.USERPASSWORD_INVALID;
        this._adminPassword = YNetwork.ADMINPASSWORD_INVALID;
        this._httpPort = YNetwork.HTTPPORT_INVALID;
        this._defaultPage = YNetwork.DEFAULTPAGE_INVALID;
        this._discoverable = YNetwork.DISCOVERABLE_INVALID;
        this._wwwWatchdogDelay = YNetwork.WWWWATCHDOGDELAY_INVALID;
        this._callbackUrl = YNetwork.CALLBACKURL_INVALID;
        this._callbackMethod = YNetwork.CALLBACKMETHOD_INVALID;
        this._callbackEncoding = YNetwork.CALLBACKENCODING_INVALID;
        this._callbackTemplate = YNetwork.CALLBACKTEMPLATE_INVALID;
        this._callbackCredentials = YNetwork.CALLBACKCREDENTIALS_INVALID;
        this._callbackInitialDelay = YNetwork.CALLBACKINITIALDELAY_INVALID;
        this._callbackSchedule = YNetwork.CALLBACKSCHEDULE_INVALID;
        this._callbackMinDelay = YNetwork.CALLBACKMINDELAY_INVALID;
        this._callbackMaxDelay = YNetwork.CALLBACKMAXDELAY_INVALID;
        this._poeCurrent = YNetwork.POECURRENT_INVALID;
        this._valueCallbackNetwork = null;
        // API symbols as object properties
        this.READINESS_DOWN = 0;
        this.READINESS_EXISTS = 1;
        this.READINESS_LINKED = 2;
        this.READINESS_LAN_OK = 3;
        this.READINESS_WWW_OK = 4;
        this.READINESS_INVALID = -1;
        this.MACADDRESS_INVALID = yocto_api_js_1.YAPI.INVALID_STRING;
        this.IPADDRESS_INVALID = yocto_api_js_1.YAPI.INVALID_STRING;
        this.SUBNETMASK_INVALID = yocto_api_js_1.YAPI.INVALID_STRING;
        this.ROUTER_INVALID = yocto_api_js_1.YAPI.INVALID_STRING;
        this.CURRENTDNS_INVALID = yocto_api_js_1.YAPI.INVALID_STRING;
        this.IPCONFIG_INVALID = yocto_api_js_1.YAPI.INVALID_STRING;
        this.PRIMARYDNS_INVALID = yocto_api_js_1.YAPI.INVALID_STRING;
        this.SECONDARYDNS_INVALID = yocto_api_js_1.YAPI.INVALID_STRING;
        this.NTPSERVER_INVALID = yocto_api_js_1.YAPI.INVALID_STRING;
        this.USERPASSWORD_INVALID = yocto_api_js_1.YAPI.INVALID_STRING;
        this.ADMINPASSWORD_INVALID = yocto_api_js_1.YAPI.INVALID_STRING;
        this.HTTPPORT_INVALID = yocto_api_js_1.YAPI.INVALID_UINT;
        this.DEFAULTPAGE_INVALID = yocto_api_js_1.YAPI.INVALID_STRING;
        this.DISCOVERABLE_FALSE = 0;
        this.DISCOVERABLE_TRUE = 1;
        this.DISCOVERABLE_INVALID = -1;
        this.WWWWATCHDOGDELAY_INVALID = yocto_api_js_1.YAPI.INVALID_UINT;
        this.CALLBACKURL_INVALID = yocto_api_js_1.YAPI.INVALID_STRING;
        this.CALLBACKMETHOD_POST = 0;
        this.CALLBACKMETHOD_GET = 1;
        this.CALLBACKMETHOD_PUT = 2;
        this.CALLBACKMETHOD_INVALID = -1;
        this.CALLBACKENCODING_FORM = 0;
        this.CALLBACKENCODING_JSON = 1;
        this.CALLBACKENCODING_JSON_ARRAY = 2;
        this.CALLBACKENCODING_CSV = 3;
        this.CALLBACKENCODING_YOCTO_API = 4;
        this.CALLBACKENCODING_JSON_NUM = 5;
        this.CALLBACKENCODING_EMONCMS = 6;
        this.CALLBACKENCODING_AZURE = 7;
        this.CALLBACKENCODING_INFLUXDB = 8;
        this.CALLBACKENCODING_MQTT = 9;
        this.CALLBACKENCODING_YOCTO_API_JZON = 10;
        this.CALLBACKENCODING_PRTG = 11;
        this.CALLBACKENCODING_INFLUXDB_V2 = 12;
        this.CALLBACKENCODING_INVALID = -1;
        this.CALLBACKTEMPLATE_OFF = 0;
        this.CALLBACKTEMPLATE_ON = 1;
        this.CALLBACKTEMPLATE_INVALID = -1;
        this.CALLBACKCREDENTIALS_INVALID = yocto_api_js_1.YAPI.INVALID_STRING;
        this.CALLBACKINITIALDELAY_INVALID = yocto_api_js_1.YAPI.INVALID_UINT;
        this.CALLBACKSCHEDULE_INVALID = yocto_api_js_1.YAPI.INVALID_STRING;
        this.CALLBACKMINDELAY_INVALID = yocto_api_js_1.YAPI.INVALID_UINT;
        this.CALLBACKMAXDELAY_INVALID = yocto_api_js_1.YAPI.INVALID_UINT;
        this.POECURRENT_INVALID = yocto_api_js_1.YAPI.INVALID_UINT;
        this._className = 'Network';
        //--- (end of YNetwork constructor)
    }
    //--- (YNetwork implementation)
    imm_parseAttr(name, val) {
        switch (name) {
            case 'readiness':
                this._readiness = val;
                return 1;
            case 'macAddress':
                this._macAddress = val;
                return 1;
            case 'ipAddress':
                this._ipAddress = val;
                return 1;
            case 'subnetMask':
                this._subnetMask = val;
                return 1;
            case 'router':
                this._router = val;
                return 1;
            case 'currentDNS':
                this._currentDNS = val;
                return 1;
            case 'ipConfig':
                this._ipConfig = val;
                return 1;
            case 'primaryDNS':
                this._primaryDNS = val;
                return 1;
            case 'secondaryDNS':
                this._secondaryDNS = val;
                return 1;
            case 'ntpServer':
                this._ntpServer = val;
                return 1;
            case 'userPassword':
                this._userPassword = val;
                return 1;
            case 'adminPassword':
                this._adminPassword = val;
                return 1;
            case 'httpPort':
                this._httpPort = val;
                return 1;
            case 'defaultPage':
                this._defaultPage = val;
                return 1;
            case 'discoverable':
                this._discoverable = val;
                return 1;
            case 'wwwWatchdogDelay':
                this._wwwWatchdogDelay = val;
                return 1;
            case 'callbackUrl':
                this._callbackUrl = val;
                return 1;
            case 'callbackMethod':
                this._callbackMethod = val;
                return 1;
            case 'callbackEncoding':
                this._callbackEncoding = val;
                return 1;
            case 'callbackTemplate':
                this._callbackTemplate = val;
                return 1;
            case 'callbackCredentials':
                this._callbackCredentials = val;
                return 1;
            case 'callbackInitialDelay':
                this._callbackInitialDelay = val;
                return 1;
            case 'callbackSchedule':
                this._callbackSchedule = val;
                return 1;
            case 'callbackMinDelay':
                this._callbackMinDelay = val;
                return 1;
            case 'callbackMaxDelay':
                this._callbackMaxDelay = val;
                return 1;
            case 'poeCurrent':
                this._poeCurrent = val;
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
     * @return a value among YNetwork.READINESS_DOWN, YNetwork.READINESS_EXISTS,
     * YNetwork.READINESS_LINKED, YNetwork.READINESS_LAN_OK and YNetwork.READINESS_WWW_OK corresponding to
     * the current established working mode of the network interface
     *
     * On failure, throws an exception or returns YNetwork.READINESS_INVALID.
     */
    async get_readiness() {
        let res;
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
     * On failure, throws an exception or returns YNetwork.MACADDRESS_INVALID.
     */
    async get_macAddress() {
        let res;
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
     * On failure, throws an exception or returns YNetwork.IPADDRESS_INVALID.
     */
    async get_ipAddress() {
        let res;
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
     * On failure, throws an exception or returns YNetwork.SUBNETMASK_INVALID.
     */
    async get_subnetMask() {
        let res;
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
     * On failure, throws an exception or returns YNetwork.ROUTER_INVALID.
     */
    async get_router() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YNetwork.ROUTER_INVALID;
            }
        }
        res = this._router;
        return res;
    }
    /**
     * Returns the IP address of the DNS server currently used by the device.
     *
     * @return a string corresponding to the IP address of the DNS server currently used by the device
     *
     * On failure, throws an exception or returns YNetwork.CURRENTDNS_INVALID.
     */
    async get_currentDNS() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YNetwork.CURRENTDNS_INVALID;
            }
        }
        res = this._currentDNS;
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
     * On failure, throws an exception or returns YNetwork.IPCONFIG_INVALID.
     */
    async get_ipConfig() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YNetwork.IPCONFIG_INVALID;
            }
        }
        res = this._ipConfig;
        return res;
    }
    async set_ipConfig(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('ipConfig', rest_val);
    }
    /**
     * Returns the IP address of the primary name server to be used by the module.
     *
     * @return a string corresponding to the IP address of the primary name server to be used by the module
     *
     * On failure, throws an exception or returns YNetwork.PRIMARYDNS_INVALID.
     */
    async get_primaryDNS() {
        let res;
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
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_primaryDNS(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('primaryDNS', rest_val);
    }
    /**
     * Returns the IP address of the secondary name server to be used by the module.
     *
     * @return a string corresponding to the IP address of the secondary name server to be used by the module
     *
     * On failure, throws an exception or returns YNetwork.SECONDARYDNS_INVALID.
     */
    async get_secondaryDNS() {
        let res;
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
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_secondaryDNS(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('secondaryDNS', rest_val);
    }
    /**
     * Returns the IP address of the NTP server to be used by the device.
     *
     * @return a string corresponding to the IP address of the NTP server to be used by the device
     *
     * On failure, throws an exception or returns YNetwork.NTPSERVER_INVALID.
     */
    async get_ntpServer() {
        let res;
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
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_ntpServer(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('ntpServer', rest_val);
    }
    /**
     * Returns a hash string if a password has been set for "user" user,
     * or an empty string otherwise.
     *
     * @return a string corresponding to a hash string if a password has been set for "user" user,
     *         or an empty string otherwise
     *
     * On failure, throws an exception or returns YNetwork.USERPASSWORD_INVALID.
     */
    async get_userPassword() {
        let res;
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
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_userPassword(newval) {
        let rest_val;
        if (newval.length > yocto_api_js_1.YAPI.HASH_BUF_SIZE) {
            return this._throw(yocto_api_js_1.YAPI.INVALID_ARGUMENT, 'Password too long :' + newval, yocto_api_js_1.YAPI.INVALID_ARGUMENT);
        }
        rest_val = String(newval);
        return await this._setAttr('userPassword', rest_val);
    }
    /**
     * Returns a hash string if a password has been set for user "admin",
     * or an empty string otherwise.
     *
     * @return a string corresponding to a hash string if a password has been set for user "admin",
     *         or an empty string otherwise
     *
     * On failure, throws an exception or returns YNetwork.ADMINPASSWORD_INVALID.
     */
    async get_adminPassword() {
        let res;
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
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_adminPassword(newval) {
        let rest_val;
        if (newval.length > yocto_api_js_1.YAPI.HASH_BUF_SIZE) {
            return this._throw(yocto_api_js_1.YAPI.INVALID_ARGUMENT, 'Password too long :' + newval, yocto_api_js_1.YAPI.INVALID_ARGUMENT);
        }
        rest_val = String(newval);
        return await this._setAttr('adminPassword', rest_val);
    }
    /**
     * Returns the TCP port used to serve the hub web UI.
     *
     * @return an integer corresponding to the TCP port used to serve the hub web UI
     *
     * On failure, throws an exception or returns YNetwork.HTTPPORT_INVALID.
     */
    async get_httpPort() {
        let res;
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
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_httpPort(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('httpPort', rest_val);
    }
    /**
     * Returns the HTML page to serve for the URL "/"" of the hub.
     *
     * @return a string corresponding to the HTML page to serve for the URL "/"" of the hub
     *
     * On failure, throws an exception or returns YNetwork.DEFAULTPAGE_INVALID.
     */
    async get_defaultPage() {
        let res;
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
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_defaultPage(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('defaultPage', rest_val);
    }
    /**
     * Returns the activation state of the multicast announce protocols to allow easy
     * discovery of the module in the network neighborhood (uPnP/Bonjour protocol).
     *
     * @return either YNetwork.DISCOVERABLE_FALSE or YNetwork.DISCOVERABLE_TRUE, according to the
     * activation state of the multicast announce protocols to allow easy
     *         discovery of the module in the network neighborhood (uPnP/Bonjour protocol)
     *
     * On failure, throws an exception or returns YNetwork.DISCOVERABLE_INVALID.
     */
    async get_discoverable() {
        let res;
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
     * @param newval : either YNetwork.DISCOVERABLE_FALSE or YNetwork.DISCOVERABLE_TRUE, according to the
     * activation state of the multicast announce protocols to allow easy
     *         discovery of the module in the network neighborhood (uPnP/Bonjour protocol)
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_discoverable(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('discoverable', rest_val);
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
     * On failure, throws an exception or returns YNetwork.WWWWATCHDOGDELAY_INVALID.
     */
    async get_wwwWatchdogDelay() {
        let res;
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
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_wwwWatchdogDelay(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('wwwWatchdogDelay', rest_val);
    }
    /**
     * Returns the callback URL to notify of significant state changes.
     *
     * @return a string corresponding to the callback URL to notify of significant state changes
     *
     * On failure, throws an exception or returns YNetwork.CALLBACKURL_INVALID.
     */
    async get_callbackUrl() {
        let res;
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
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_callbackUrl(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('callbackUrl', rest_val);
    }
    /**
     * Returns the HTTP method used to notify callbacks for significant state changes.
     *
     * @return a value among YNetwork.CALLBACKMETHOD_POST, YNetwork.CALLBACKMETHOD_GET and
     * YNetwork.CALLBACKMETHOD_PUT corresponding to the HTTP method used to notify callbacks for
     * significant state changes
     *
     * On failure, throws an exception or returns YNetwork.CALLBACKMETHOD_INVALID.
     */
    async get_callbackMethod() {
        let res;
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
     * @param newval : a value among YNetwork.CALLBACKMETHOD_POST, YNetwork.CALLBACKMETHOD_GET and
     * YNetwork.CALLBACKMETHOD_PUT corresponding to the HTTP method used to notify callbacks for
     * significant state changes
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_callbackMethod(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('callbackMethod', rest_val);
    }
    /**
     * Returns the encoding standard to use for representing notification values.
     *
     * @return a value among YNetwork.CALLBACKENCODING_FORM, YNetwork.CALLBACKENCODING_JSON,
     * YNetwork.CALLBACKENCODING_JSON_ARRAY, YNetwork.CALLBACKENCODING_CSV,
     * YNetwork.CALLBACKENCODING_YOCTO_API, YNetwork.CALLBACKENCODING_JSON_NUM,
     * YNetwork.CALLBACKENCODING_EMONCMS, YNetwork.CALLBACKENCODING_AZURE,
     * YNetwork.CALLBACKENCODING_INFLUXDB, YNetwork.CALLBACKENCODING_MQTT,
     * YNetwork.CALLBACKENCODING_YOCTO_API_JZON, YNetwork.CALLBACKENCODING_PRTG and
     * YNetwork.CALLBACKENCODING_INFLUXDB_V2 corresponding to the encoding standard to use for
     * representing notification values
     *
     * On failure, throws an exception or returns YNetwork.CALLBACKENCODING_INVALID.
     */
    async get_callbackEncoding() {
        let res;
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
     * @param newval : a value among YNetwork.CALLBACKENCODING_FORM, YNetwork.CALLBACKENCODING_JSON,
     * YNetwork.CALLBACKENCODING_JSON_ARRAY, YNetwork.CALLBACKENCODING_CSV,
     * YNetwork.CALLBACKENCODING_YOCTO_API, YNetwork.CALLBACKENCODING_JSON_NUM,
     * YNetwork.CALLBACKENCODING_EMONCMS, YNetwork.CALLBACKENCODING_AZURE,
     * YNetwork.CALLBACKENCODING_INFLUXDB, YNetwork.CALLBACKENCODING_MQTT,
     * YNetwork.CALLBACKENCODING_YOCTO_API_JZON, YNetwork.CALLBACKENCODING_PRTG and
     * YNetwork.CALLBACKENCODING_INFLUXDB_V2 corresponding to the encoding standard to use for
     * representing notification values
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_callbackEncoding(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('callbackEncoding', rest_val);
    }
    /**
     * Returns the activation state of the custom template file to customize callback
     * format. If the custom callback template is disabled, it will be ignored even
     * if present on the YoctoHub.
     *
     * @return either YNetwork.CALLBACKTEMPLATE_OFF or YNetwork.CALLBACKTEMPLATE_ON, according to the
     * activation state of the custom template file to customize callback
     *         format
     *
     * On failure, throws an exception or returns YNetwork.CALLBACKTEMPLATE_INVALID.
     */
    async get_callbackTemplate() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YNetwork.CALLBACKTEMPLATE_INVALID;
            }
        }
        res = this._callbackTemplate;
        return res;
    }
    /**
     * Enable the use of a template file to customize callbacks format.
     * When the custom callback template file is enabled, the template file
     * will be loaded for each callback in order to build the data to post to the
     * server. If template file does not exist on the YoctoHub, the callback will
     * fail with an error message indicating the name of the expected template file.
     *
     * @param newval : either YNetwork.CALLBACKTEMPLATE_OFF or YNetwork.CALLBACKTEMPLATE_ON
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_callbackTemplate(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('callbackTemplate', rest_val);
    }
    /**
     * Returns a hashed version of the notification callback credentials if set,
     * or an empty string otherwise.
     *
     * @return a string corresponding to a hashed version of the notification callback credentials if set,
     *         or an empty string otherwise
     *
     * On failure, throws an exception or returns YNetwork.CALLBACKCREDENTIALS_INVALID.
     */
    async get_callbackCredentials() {
        let res;
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
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_callbackCredentials(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('callbackCredentials', rest_val);
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
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async callbackLogin(username, password) {
        let rest_val;
        rest_val = username + ':' + password;
        return await this._setAttr('callbackCredentials', rest_val);
    }
    /**
     * Returns the initial waiting time before first callback notifications, in seconds.
     *
     * @return an integer corresponding to the initial waiting time before first callback notifications, in seconds
     *
     * On failure, throws an exception or returns YNetwork.CALLBACKINITIALDELAY_INVALID.
     */
    async get_callbackInitialDelay() {
        let res;
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
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_callbackInitialDelay(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('callbackInitialDelay', rest_val);
    }
    /**
     * Returns the HTTP callback schedule strategy, as a text string.
     *
     * @return a string corresponding to the HTTP callback schedule strategy, as a text string
     *
     * On failure, throws an exception or returns YNetwork.CALLBACKSCHEDULE_INVALID.
     */
    async get_callbackSchedule() {
        let res;
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
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_callbackSchedule(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('callbackSchedule', rest_val);
    }
    /**
     * Returns the minimum waiting time between two HTTP callbacks, in seconds.
     *
     * @return an integer corresponding to the minimum waiting time between two HTTP callbacks, in seconds
     *
     * On failure, throws an exception or returns YNetwork.CALLBACKMINDELAY_INVALID.
     */
    async get_callbackMinDelay() {
        let res;
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
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_callbackMinDelay(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('callbackMinDelay', rest_val);
    }
    /**
     * Returns the waiting time between two HTTP callbacks when there is nothing new.
     *
     * @return an integer corresponding to the waiting time between two HTTP callbacks when there is nothing new
     *
     * On failure, throws an exception or returns YNetwork.CALLBACKMAXDELAY_INVALID.
     */
    async get_callbackMaxDelay() {
        let res;
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
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_callbackMaxDelay(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('callbackMaxDelay', rest_val);
    }
    /**
     * Returns the current consumed by the module from Power-over-Ethernet (PoE), in milliamps.
     * The current consumption is measured after converting PoE source to 5 Volt, and should
     * never exceed 1800 mA.
     *
     * @return an integer corresponding to the current consumed by the module from Power-over-Ethernet
     * (PoE), in milliamps
     *
     * On failure, throws an exception or returns YNetwork.POECURRENT_INVALID.
     */
    async get_poeCurrent() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YNetwork.POECURRENT_INVALID;
            }
        }
        res = this._poeCurrent;
        return res;
    }
    /**
     * Retrieves a network interface for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the network interface is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YNetwork.isOnline() to test if the network interface is
     * indeed online at a given time. In case of ambiguity when looking for
     * a network interface by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the network interface, for instance
     *         YHUBETH1.network.
     *
     * @return a YNetwork object allowing you to drive the network interface.
     */
    static FindNetwork(func) {
        let obj;
        obj = yocto_api_js_1.YFunction._FindFromCache('Network', func);
        if (obj == null) {
            obj = new YNetwork(yocto_api_js_1.YAPI, func);
            yocto_api_js_1.YFunction._AddToCache('Network', func, obj);
        }
        return obj;
    }
    /**
     * Retrieves a network interface for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the network interface is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YNetwork.isOnline() to test if the network interface is
     * indeed online at a given time. In case of ambiguity when looking for
     * a network interface by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx : a YAPI context
     * @param func : a string that uniquely characterizes the network interface, for instance
     *         YHUBETH1.network.
     *
     * @return a YNetwork object allowing you to drive the network interface.
     */
    static FindNetworkInContext(yctx, func) {
        let obj;
        obj = yocto_api_js_1.YFunction._FindFromCacheInContext(yctx, 'Network', func);
        if (obj == null) {
            obj = new YNetwork(yctx, func);
            yocto_api_js_1.YFunction._AddToCache('Network', func, obj);
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
    async _invokeValueCallback(value) {
        if (this._valueCallbackNetwork != null) {
            try {
                await this._valueCallbackNetwork(this, value);
            }
            catch (e) {
                this._yapi.imm_log('Exception in valueCallback:', e);
            }
        }
        else {
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
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async useDHCP(fallbackIpAddr, fallbackSubnetMaskLen, fallbackRouter) {
        return await this.set_ipConfig('DHCP:' + fallbackIpAddr + '/' + String(Math.round(fallbackSubnetMaskLen)) + '/' + fallbackRouter);
    }
    /**
     * Changes the configuration of the network interface to enable the use of an
     * IP address received from a DHCP server. Until an address is received from a DHCP
     * server, the module uses an IP of the network 169.254.0.0/16 (APIPA).
     * Remember to call the saveToFlash() method and then to reboot the module to apply this setting.
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async useDHCPauto() {
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
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async useStaticIP(ipAddress, subnetMaskLen, router) {
        return await this.set_ipConfig('STATIC:' + ipAddress + '/' + String(Math.round(subnetMaskLen)) + '/' + router);
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
    async ping(host) {
        let content;
        content = await this._download('ping.txt?host=' + host);
        return this._yapi.imm_bin2str(content);
    }
    /**
     * Trigger an HTTP callback quickly. This function can even be called within
     * an HTTP callback, in which case the next callback will be triggered 5 seconds
     * after the end of the current callback, regardless if the minimum time between
     * callbacks configured in the device.
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async triggerCallback() {
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
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_periodicCallbackSchedule(interval, offset) {
        return await this.set_callbackSchedule('every ' + interval + '+' + String(Math.round(offset)));
    }
    /**
     * Continues the enumeration of network interfaces started using yFirstNetwork().
     * Caution: You can't make any assumption about the returned network interfaces order.
     * If you want to find a specific a network interface, use Network.findNetwork()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YNetwork object, corresponding to
     *         a network interface currently online, or a null pointer
     *         if there are no more network interfaces to enumerate.
     */
    nextNetwork() {
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != yocto_api_js_1.YAPI.SUCCESS)
            return null;
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if (next_hwid == null)
            return null;
        return YNetwork.FindNetworkInContext(this._yapi, next_hwid);
    }
    /**
     * Starts the enumeration of network interfaces currently accessible.
     * Use the method YNetwork.nextNetwork() to iterate on
     * next network interfaces.
     *
     * @return a pointer to a YNetwork object, corresponding to
     *         the first network interface currently online, or a null pointer
     *         if there are none.
     */
    static FirstNetwork() {
        let next_hwid = yocto_api_js_1.YAPI.imm_getFirstHardwareId('Network');
        if (next_hwid == null)
            return null;
        return YNetwork.FindNetwork(next_hwid);
    }
    /**
     * Starts the enumeration of network interfaces currently accessible.
     * Use the method YNetwork.nextNetwork() to iterate on
     * next network interfaces.
     *
     * @param yctx : a YAPI context.
     *
     * @return a pointer to a YNetwork object, corresponding to
     *         the first network interface currently online, or a null pointer
     *         if there are none.
     */
    static FirstNetworkInContext(yctx) {
        let next_hwid = yctx.imm_getFirstHardwareId('Network');
        if (next_hwid == null)
            return null;
        return YNetwork.FindNetworkInContext(yctx, next_hwid);
    }
}
exports.YNetwork = YNetwork;
// API symbols as static members
YNetwork.READINESS_DOWN = 0;
YNetwork.READINESS_EXISTS = 1;
YNetwork.READINESS_LINKED = 2;
YNetwork.READINESS_LAN_OK = 3;
YNetwork.READINESS_WWW_OK = 4;
YNetwork.READINESS_INVALID = -1;
YNetwork.MACADDRESS_INVALID = yocto_api_js_1.YAPI.INVALID_STRING;
YNetwork.IPADDRESS_INVALID = yocto_api_js_1.YAPI.INVALID_STRING;
YNetwork.SUBNETMASK_INVALID = yocto_api_js_1.YAPI.INVALID_STRING;
YNetwork.ROUTER_INVALID = yocto_api_js_1.YAPI.INVALID_STRING;
YNetwork.CURRENTDNS_INVALID = yocto_api_js_1.YAPI.INVALID_STRING;
YNetwork.IPCONFIG_INVALID = yocto_api_js_1.YAPI.INVALID_STRING;
YNetwork.PRIMARYDNS_INVALID = yocto_api_js_1.YAPI.INVALID_STRING;
YNetwork.SECONDARYDNS_INVALID = yocto_api_js_1.YAPI.INVALID_STRING;
YNetwork.NTPSERVER_INVALID = yocto_api_js_1.YAPI.INVALID_STRING;
YNetwork.USERPASSWORD_INVALID = yocto_api_js_1.YAPI.INVALID_STRING;
YNetwork.ADMINPASSWORD_INVALID = yocto_api_js_1.YAPI.INVALID_STRING;
YNetwork.HTTPPORT_INVALID = yocto_api_js_1.YAPI.INVALID_UINT;
YNetwork.DEFAULTPAGE_INVALID = yocto_api_js_1.YAPI.INVALID_STRING;
YNetwork.DISCOVERABLE_FALSE = 0;
YNetwork.DISCOVERABLE_TRUE = 1;
YNetwork.DISCOVERABLE_INVALID = -1;
YNetwork.WWWWATCHDOGDELAY_INVALID = yocto_api_js_1.YAPI.INVALID_UINT;
YNetwork.CALLBACKURL_INVALID = yocto_api_js_1.YAPI.INVALID_STRING;
YNetwork.CALLBACKMETHOD_POST = 0;
YNetwork.CALLBACKMETHOD_GET = 1;
YNetwork.CALLBACKMETHOD_PUT = 2;
YNetwork.CALLBACKMETHOD_INVALID = -1;
YNetwork.CALLBACKENCODING_FORM = 0;
YNetwork.CALLBACKENCODING_JSON = 1;
YNetwork.CALLBACKENCODING_JSON_ARRAY = 2;
YNetwork.CALLBACKENCODING_CSV = 3;
YNetwork.CALLBACKENCODING_YOCTO_API = 4;
YNetwork.CALLBACKENCODING_JSON_NUM = 5;
YNetwork.CALLBACKENCODING_EMONCMS = 6;
YNetwork.CALLBACKENCODING_AZURE = 7;
YNetwork.CALLBACKENCODING_INFLUXDB = 8;
YNetwork.CALLBACKENCODING_MQTT = 9;
YNetwork.CALLBACKENCODING_YOCTO_API_JZON = 10;
YNetwork.CALLBACKENCODING_PRTG = 11;
YNetwork.CALLBACKENCODING_INFLUXDB_V2 = 12;
YNetwork.CALLBACKENCODING_INVALID = -1;
YNetwork.CALLBACKTEMPLATE_OFF = 0;
YNetwork.CALLBACKTEMPLATE_ON = 1;
YNetwork.CALLBACKTEMPLATE_INVALID = -1;
YNetwork.CALLBACKCREDENTIALS_INVALID = yocto_api_js_1.YAPI.INVALID_STRING;
YNetwork.CALLBACKINITIALDELAY_INVALID = yocto_api_js_1.YAPI.INVALID_UINT;
YNetwork.CALLBACKSCHEDULE_INVALID = yocto_api_js_1.YAPI.INVALID_STRING;
YNetwork.CALLBACKMINDELAY_INVALID = yocto_api_js_1.YAPI.INVALID_UINT;
YNetwork.CALLBACKMAXDELAY_INVALID = yocto_api_js_1.YAPI.INVALID_UINT;
YNetwork.POECURRENT_INVALID = yocto_api_js_1.YAPI.INVALID_UINT;
//# sourceMappingURL=yocto_network.js.map