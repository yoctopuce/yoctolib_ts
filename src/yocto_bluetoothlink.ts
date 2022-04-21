/*********************************************************************
 *
 *  $Id: yocto_bluetoothlink.ts 48520 2022-02-03 10:51:20Z seb $
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

import { YAPI, YAPIContext, YErrorMsg, YFunction, YModule, YSensor, YDataLogger, YMeasure } from './yocto_api.js';

//--- (YBluetoothLink class start)
/**
 * YBluetoothLink Class: Bluetooth sound controller control interface
 *
 * BluetoothLink function provides control over Bluetooth link
 * and status for devices that are Bluetooth-enabled.
 */
//--- (end of YBluetoothLink class start)

export class YBluetoothLink extends YFunction
{
    //--- (YBluetoothLink attributes declaration)
    _className: string;
    _ownAddress: string = YBluetoothLink.OWNADDRESS_INVALID;
    _pairingPin: string = YBluetoothLink.PAIRINGPIN_INVALID;
    _remoteAddress: string = YBluetoothLink.REMOTEADDRESS_INVALID;
    _remoteName: string = YBluetoothLink.REMOTENAME_INVALID;
    _mute: YBluetoothLink.MUTE = YBluetoothLink.MUTE_INVALID;
    _preAmplifier: number = YBluetoothLink.PREAMPLIFIER_INVALID;
    _volume: number = YBluetoothLink.VOLUME_INVALID;
    _linkState: YBluetoothLink.LINKSTATE = YBluetoothLink.LINKSTATE_INVALID;
    _linkQuality: number = YBluetoothLink.LINKQUALITY_INVALID;
    _command: string = YBluetoothLink.COMMAND_INVALID;
    _valueCallbackBluetoothLink: YBluetoothLink.ValueCallback | null = null;

    // API symbols as object properties
    public readonly OWNADDRESS_INVALID: string = YAPI.INVALID_STRING;
    public readonly PAIRINGPIN_INVALID: string = YAPI.INVALID_STRING;
    public readonly REMOTEADDRESS_INVALID: string = YAPI.INVALID_STRING;
    public readonly REMOTENAME_INVALID: string = YAPI.INVALID_STRING;
    public readonly MUTE_FALSE: YBluetoothLink.MUTE = 0;
    public readonly MUTE_TRUE: YBluetoothLink.MUTE = 1;
    public readonly MUTE_INVALID: YBluetoothLink.MUTE = -1;
    public readonly PREAMPLIFIER_INVALID: number = YAPI.INVALID_UINT;
    public readonly VOLUME_INVALID: number = YAPI.INVALID_UINT;
    public readonly LINKSTATE_DOWN: YBluetoothLink.LINKSTATE = 0;
    public readonly LINKSTATE_FREE: YBluetoothLink.LINKSTATE = 1;
    public readonly LINKSTATE_SEARCH: YBluetoothLink.LINKSTATE = 2;
    public readonly LINKSTATE_EXISTS: YBluetoothLink.LINKSTATE = 3;
    public readonly LINKSTATE_LINKED: YBluetoothLink.LINKSTATE = 4;
    public readonly LINKSTATE_PLAY: YBluetoothLink.LINKSTATE = 5;
    public readonly LINKSTATE_INVALID: YBluetoothLink.LINKSTATE = -1;
    public readonly LINKQUALITY_INVALID: number = YAPI.INVALID_UINT;
    public readonly COMMAND_INVALID: string = YAPI.INVALID_STRING;

    // API symbols as static members
    public static readonly OWNADDRESS_INVALID: string = YAPI.INVALID_STRING;
    public static readonly PAIRINGPIN_INVALID: string = YAPI.INVALID_STRING;
    public static readonly REMOTEADDRESS_INVALID: string = YAPI.INVALID_STRING;
    public static readonly REMOTENAME_INVALID: string = YAPI.INVALID_STRING;
    public static readonly MUTE_FALSE: YBluetoothLink.MUTE = 0;
    public static readonly MUTE_TRUE: YBluetoothLink.MUTE = 1;
    public static readonly MUTE_INVALID: YBluetoothLink.MUTE = -1;
    public static readonly PREAMPLIFIER_INVALID: number = YAPI.INVALID_UINT;
    public static readonly VOLUME_INVALID: number = YAPI.INVALID_UINT;
    public static readonly LINKSTATE_DOWN: YBluetoothLink.LINKSTATE = 0;
    public static readonly LINKSTATE_FREE: YBluetoothLink.LINKSTATE = 1;
    public static readonly LINKSTATE_SEARCH: YBluetoothLink.LINKSTATE = 2;
    public static readonly LINKSTATE_EXISTS: YBluetoothLink.LINKSTATE = 3;
    public static readonly LINKSTATE_LINKED: YBluetoothLink.LINKSTATE = 4;
    public static readonly LINKSTATE_PLAY: YBluetoothLink.LINKSTATE = 5;
    public static readonly LINKSTATE_INVALID: YBluetoothLink.LINKSTATE = -1;
    public static readonly LINKQUALITY_INVALID: number = YAPI.INVALID_UINT;
    public static readonly COMMAND_INVALID: string = YAPI.INVALID_STRING;
    //--- (end of YBluetoothLink attributes declaration)

    constructor(yapi: YAPIContext, func: string)
    {
        //--- (YBluetoothLink constructor)
        super(yapi, func);
        this._className                  = 'BluetoothLink';
        //--- (end of YBluetoothLink constructor)
    }

    //--- (YBluetoothLink implementation)

    imm_parseAttr(name: string, val: any)
    {
        switch(name) {
        case 'ownAddress':
            this._ownAddress = <string> <string> val;
            return 1;
        case 'pairingPin':
            this._pairingPin = <string> <string> val;
            return 1;
        case 'remoteAddress':
            this._remoteAddress = <string> <string> val;
            return 1;
        case 'remoteName':
            this._remoteName = <string> <string> val;
            return 1;
        case 'mute':
            this._mute = <YBluetoothLink.MUTE> <number> val;
            return 1;
        case 'preAmplifier':
            this._preAmplifier = <number> <number> val;
            return 1;
        case 'volume':
            this._volume = <number> <number> val;
            return 1;
        case 'linkState':
            this._linkState = <YBluetoothLink.LINKSTATE> <number> val;
            return 1;
        case 'linkQuality':
            this._linkQuality = <number> <number> val;
            return 1;
        case 'command':
            this._command = <string> <string> val;
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
    async get_ownAddress(): Promise<string>
    {
        let res: string;
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
    async get_pairingPin(): Promise<string>
    {
        let res: string;
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
    async set_pairingPin(newval: string): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('pairingPin',rest_val);
    }

    /**
     * Returns the MAC-48 address of the remote device to connect to.
     *
     * @return a string corresponding to the MAC-48 address of the remote device to connect to
     *
     * On failure, throws an exception or returns YBluetoothLink.REMOTEADDRESS_INVALID.
     */
    async get_remoteAddress(): Promise<string>
    {
        let res: string;
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
    async set_remoteAddress(newval: string): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('remoteAddress',rest_val);
    }

    /**
     * Returns the bluetooth name the remote device, if found on the bluetooth network.
     *
     * @return a string corresponding to the bluetooth name the remote device, if found on the bluetooth network
     *
     * On failure, throws an exception or returns YBluetoothLink.REMOTENAME_INVALID.
     */
    async get_remoteName(): Promise<string>
    {
        let res: string;
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
    async get_mute(): Promise<YBluetoothLink.MUTE>
    {
        let res: number;
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
    async set_mute(newval: YBluetoothLink.MUTE): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('mute',rest_val);
    }

    /**
     * Returns the audio pre-amplifier volume, in per cents.
     *
     * @return an integer corresponding to the audio pre-amplifier volume, in per cents
     *
     * On failure, throws an exception or returns YBluetoothLink.PREAMPLIFIER_INVALID.
     */
    async get_preAmplifier(): Promise<number>
    {
        let res: number;
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
    async set_preAmplifier(newval: number): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('preAmplifier',rest_val);
    }

    /**
     * Returns the connected headset volume, in per cents.
     *
     * @return an integer corresponding to the connected headset volume, in per cents
     *
     * On failure, throws an exception or returns YBluetoothLink.VOLUME_INVALID.
     */
    async get_volume(): Promise<number>
    {
        let res: number;
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
    async set_volume(newval: number): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('volume',rest_val);
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
    async get_linkState(): Promise<YBluetoothLink.LINKSTATE>
    {
        let res: number;
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
    async get_linkQuality(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YBluetoothLink.LINKQUALITY_INVALID;
            }
        }
        res = this._linkQuality;
        return res;
    }

    async get_command(): Promise<string>
    {
        let res: string;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YBluetoothLink.COMMAND_INVALID;
            }
        }
        res = this._command;
        return res;
    }

    async set_command(newval: string): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('command',rest_val);
    }

    /**
     * Retrieves a Bluetooth sound controller for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
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
    static FindBluetoothLink(func: string): YBluetoothLink
    {
        let obj: YBluetoothLink | null;
        obj = <YBluetoothLink> YFunction._FindFromCache('BluetoothLink', func);
        if (obj == null) {
            obj = new YBluetoothLink(YAPI, func);
            YFunction._AddToCache('BluetoothLink',  func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a Bluetooth sound controller for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
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
    static FindBluetoothLinkInContext(yctx: YAPIContext, func: string): YBluetoothLink
    {
        let obj: YBluetoothLink | null;
        obj = <YBluetoothLink> YFunction._FindFromCacheInContext(yctx,  'BluetoothLink', func);
        if (obj == null) {
            obj = new YBluetoothLink(yctx, func);
            YFunction._AddToCache('BluetoothLink',  func, obj);
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
    async registerValueCallback(callback: YBluetoothLink.ValueCallback | null): Promise<number>
    {
        let val: string;
        if (callback != null) {
            await YFunction._UpdateValueCallbackList(this, true);
        } else {
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

    async _invokeValueCallback(value: string): Promise<number>
    {
        if (this._valueCallbackBluetoothLink != null) {
            try {
                await this._valueCallbackBluetoothLink(this, value);
            } catch (e) {
                this._yapi.imm_log('Exception in valueCallback:', e);
            }
        } else {
            super._invokeValueCallback(value);
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
    async connect(): Promise<number>
    {
        return await this.set_command('C');
    }

    /**
     * Disconnect from the previously selected remote device.
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async disconnect(): Promise<number>
    {
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
    nextBluetoothLink(): YBluetoothLink | null
    {
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI.SUCCESS) return null;
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, <string> resolve.result);
        if(next_hwid == null) return null;
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
    static FirstBluetoothLink(): YBluetoothLink | null
    {
        let next_hwid = YAPI.imm_getFirstHardwareId('BluetoothLink');
        if(next_hwid == null) return null;
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
    static FirstBluetoothLinkInContext(yctx: YAPIContext): YBluetoothLink | null
    {
        let next_hwid = yctx.imm_getFirstHardwareId('BluetoothLink');
        if(next_hwid == null) return null;
        return YBluetoothLink.FindBluetoothLinkInContext(yctx, next_hwid);
    }

    //--- (end of YBluetoothLink implementation)
}

export namespace YBluetoothLink {
    //--- (YBluetoothLink definitions)
    export const enum MUTE {
        FALSE = 0,
        TRUE = 1,
        INVALID = -1
    }
    export const enum LINKSTATE {
        DOWN = 0,
        FREE = 1,
        SEARCH = 2,
        EXISTS = 3,
        LINKED = 4,
        PLAY = 5,
        INVALID = -1
    }
    export interface ValueCallback { (func: YBluetoothLink, value: string): void }
    //--- (end of YBluetoothLink definitions)
}

