/*********************************************************************
 *
 *  $Id: svn_id $
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
import { YAPIContext, YFunction } from './yocto_api.js';
/**
 * YBluetoothLink Class: Bluetooth sound controller control interface
 *
 * BluetoothLink function provides control over Bluetooth link
 * and status for devices that are Bluetooth-enabled.
 */
export declare class YBluetoothLink extends YFunction {
    _className: string;
    _ownAddress: string;
    _pairingPin: string;
    _remoteAddress: string;
    _remoteName: string;
    _mute: YBluetoothLink.MUTE;
    _preAmplifier: number;
    _volume: number;
    _linkState: YBluetoothLink.LINKSTATE;
    _linkQuality: number;
    _command: string;
    _valueCallbackBluetoothLink: YBluetoothLink.ValueCallback | null;
    readonly OWNADDRESS_INVALID: string;
    readonly PAIRINGPIN_INVALID: string;
    readonly REMOTEADDRESS_INVALID: string;
    readonly REMOTENAME_INVALID: string;
    readonly MUTE_FALSE: YBluetoothLink.MUTE;
    readonly MUTE_TRUE: YBluetoothLink.MUTE;
    readonly MUTE_INVALID: YBluetoothLink.MUTE;
    readonly PREAMPLIFIER_INVALID: number;
    readonly VOLUME_INVALID: number;
    readonly LINKSTATE_DOWN: YBluetoothLink.LINKSTATE;
    readonly LINKSTATE_FREE: YBluetoothLink.LINKSTATE;
    readonly LINKSTATE_SEARCH: YBluetoothLink.LINKSTATE;
    readonly LINKSTATE_EXISTS: YBluetoothLink.LINKSTATE;
    readonly LINKSTATE_LINKED: YBluetoothLink.LINKSTATE;
    readonly LINKSTATE_PLAY: YBluetoothLink.LINKSTATE;
    readonly LINKSTATE_INVALID: YBluetoothLink.LINKSTATE;
    readonly LINKQUALITY_INVALID: number;
    readonly COMMAND_INVALID: string;
    static readonly OWNADDRESS_INVALID: string;
    static readonly PAIRINGPIN_INVALID: string;
    static readonly REMOTEADDRESS_INVALID: string;
    static readonly REMOTENAME_INVALID: string;
    static readonly MUTE_FALSE: YBluetoothLink.MUTE;
    static readonly MUTE_TRUE: YBluetoothLink.MUTE;
    static readonly MUTE_INVALID: YBluetoothLink.MUTE;
    static readonly PREAMPLIFIER_INVALID: number;
    static readonly VOLUME_INVALID: number;
    static readonly LINKSTATE_DOWN: YBluetoothLink.LINKSTATE;
    static readonly LINKSTATE_FREE: YBluetoothLink.LINKSTATE;
    static readonly LINKSTATE_SEARCH: YBluetoothLink.LINKSTATE;
    static readonly LINKSTATE_EXISTS: YBluetoothLink.LINKSTATE;
    static readonly LINKSTATE_LINKED: YBluetoothLink.LINKSTATE;
    static readonly LINKSTATE_PLAY: YBluetoothLink.LINKSTATE;
    static readonly LINKSTATE_INVALID: YBluetoothLink.LINKSTATE;
    static readonly LINKQUALITY_INVALID: number;
    static readonly COMMAND_INVALID: string;
    constructor(yapi: YAPIContext, func: string);
    imm_parseAttr(name: string, val: any): number;
    /**
     * Returns the MAC-48 address of the bluetooth interface, which is unique on the bluetooth network.
     *
     * @return a string corresponding to the MAC-48 address of the bluetooth interface, which is unique on
     * the bluetooth network
     *
     * On failure, throws an exception or returns YBluetoothLink.OWNADDRESS_INVALID.
     */
    get_ownAddress(): Promise<string>;
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
    get_pairingPin(): Promise<string>;
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
    set_pairingPin(newval: string): Promise<number>;
    /**
     * Returns the MAC-48 address of the remote device to connect to.
     *
     * @return a string corresponding to the MAC-48 address of the remote device to connect to
     *
     * On failure, throws an exception or returns YBluetoothLink.REMOTEADDRESS_INVALID.
     */
    get_remoteAddress(): Promise<string>;
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
    set_remoteAddress(newval: string): Promise<number>;
    /**
     * Returns the bluetooth name the remote device, if found on the bluetooth network.
     *
     * @return a string corresponding to the bluetooth name the remote device, if found on the bluetooth network
     *
     * On failure, throws an exception or returns YBluetoothLink.REMOTENAME_INVALID.
     */
    get_remoteName(): Promise<string>;
    /**
     * Returns the state of the mute function.
     *
     * @return either YBluetoothLink.MUTE_FALSE or YBluetoothLink.MUTE_TRUE, according to the state of the
     * mute function
     *
     * On failure, throws an exception or returns YBluetoothLink.MUTE_INVALID.
     */
    get_mute(): Promise<YBluetoothLink.MUTE>;
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
    set_mute(newval: YBluetoothLink.MUTE): Promise<number>;
    /**
     * Returns the audio pre-amplifier volume, in per cents.
     *
     * @return an integer corresponding to the audio pre-amplifier volume, in per cents
     *
     * On failure, throws an exception or returns YBluetoothLink.PREAMPLIFIER_INVALID.
     */
    get_preAmplifier(): Promise<number>;
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
    set_preAmplifier(newval: number): Promise<number>;
    /**
     * Returns the connected headset volume, in per cents.
     *
     * @return an integer corresponding to the connected headset volume, in per cents
     *
     * On failure, throws an exception or returns YBluetoothLink.VOLUME_INVALID.
     */
    get_volume(): Promise<number>;
    /**
     * Changes the connected headset volume, in per cents.
     *
     * @param newval : an integer corresponding to the connected headset volume, in per cents
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_volume(newval: number): Promise<number>;
    /**
     * Returns the bluetooth link state.
     *
     * @return a value among YBluetoothLink.LINKSTATE_DOWN, YBluetoothLink.LINKSTATE_FREE,
     * YBluetoothLink.LINKSTATE_SEARCH, YBluetoothLink.LINKSTATE_EXISTS, YBluetoothLink.LINKSTATE_LINKED
     * and YBluetoothLink.LINKSTATE_PLAY corresponding to the bluetooth link state
     *
     * On failure, throws an exception or returns YBluetoothLink.LINKSTATE_INVALID.
     */
    get_linkState(): Promise<YBluetoothLink.LINKSTATE>;
    /**
     * Returns the bluetooth receiver signal strength, in pourcents, or 0 if no connection is established.
     *
     * @return an integer corresponding to the bluetooth receiver signal strength, in pourcents, or 0 if
     * no connection is established
     *
     * On failure, throws an exception or returns YBluetoothLink.LINKQUALITY_INVALID.
     */
    get_linkQuality(): Promise<number>;
    get_command(): Promise<string>;
    set_command(newval: string): Promise<number>;
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
    static FindBluetoothLink(func: string): YBluetoothLink;
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
    static FindBluetoothLinkInContext(yctx: YAPIContext, func: string): YBluetoothLink;
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
    registerValueCallback(callback: YBluetoothLink.ValueCallback | null): Promise<number>;
    _invokeValueCallback(value: string): Promise<number>;
    /**
     * Attempt to connect to the previously selected remote device.
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    connect(): Promise<number>;
    /**
     * Disconnect from the previously selected remote device.
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    disconnect(): Promise<number>;
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
    nextBluetoothLink(): YBluetoothLink | null;
    /**
     * Starts the enumeration of Bluetooth sound controllers currently accessible.
     * Use the method YBluetoothLink.nextBluetoothLink() to iterate on
     * next Bluetooth sound controllers.
     *
     * @return a pointer to a YBluetoothLink object, corresponding to
     *         the first Bluetooth sound controller currently online, or a null pointer
     *         if there are none.
     */
    static FirstBluetoothLink(): YBluetoothLink | null;
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
    static FirstBluetoothLinkInContext(yctx: YAPIContext): YBluetoothLink | null;
}
export declare namespace YBluetoothLink {
    const enum MUTE {
        FALSE = 0,
        TRUE = 1,
        INVALID = -1
    }
    const enum LINKSTATE {
        DOWN = 0,
        FREE = 1,
        SEARCH = 2,
        EXISTS = 3,
        LINKED = 4,
        PLAY = 5,
        INVALID = -1
    }
    interface ValueCallback {
        (func: YBluetoothLink, value: string): void;
    }
}
