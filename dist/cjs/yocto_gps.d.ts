/*********************************************************************
 *
 *  $Id: svn_id $
 *
 *  Implements the high-level API for Gps functions
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
 * YGps Class: Geolocalization control interface (GPS, GNSS, ...), available for instance in the Yocto-GPS-V2
 *
 * The YGps class allows you to retrieve positioning
 * data from a GPS/GNSS sensor. This class can provides
 * complete positioning information. However, if you
 * wish to define callbacks on position changes or record
 * the position in the datalogger, you
 * should use the YLatitude et YLongitude classes.
 */
export declare class YGps extends YFunction {
    _className: string;
    _isFixed: YGps.ISFIXED;
    _satCount: number;
    _satPerConst: number;
    _gpsRefreshRate: number;
    _coordSystem: YGps.COORDSYSTEM;
    _constellation: YGps.CONSTELLATION;
    _latitude: string;
    _longitude: string;
    _dilution: number;
    _altitude: number;
    _groundSpeed: number;
    _direction: number;
    _unixTime: number;
    _dateTime: string;
    _utcOffset: number;
    _command: string;
    _valueCallbackGps: YGps.ValueCallback | null;
    readonly ISFIXED_FALSE: YGps.ISFIXED;
    readonly ISFIXED_TRUE: YGps.ISFIXED;
    readonly ISFIXED_INVALID: YGps.ISFIXED;
    readonly SATCOUNT_INVALID: number;
    readonly SATPERCONST_INVALID: number;
    readonly GPSREFRESHRATE_INVALID: number;
    readonly COORDSYSTEM_GPS_DMS: YGps.COORDSYSTEM;
    readonly COORDSYSTEM_GPS_DM: YGps.COORDSYSTEM;
    readonly COORDSYSTEM_GPS_D: YGps.COORDSYSTEM;
    readonly COORDSYSTEM_INVALID: YGps.COORDSYSTEM;
    readonly CONSTELLATION_GNSS: YGps.CONSTELLATION;
    readonly CONSTELLATION_GPS: YGps.CONSTELLATION;
    readonly CONSTELLATION_GLONASS: YGps.CONSTELLATION;
    readonly CONSTELLATION_GALILEO: YGps.CONSTELLATION;
    readonly CONSTELLATION_GPS_GLONASS: YGps.CONSTELLATION;
    readonly CONSTELLATION_GPS_GALILEO: YGps.CONSTELLATION;
    readonly CONSTELLATION_GLONASS_GALILEO: YGps.CONSTELLATION;
    readonly CONSTELLATION_INVALID: YGps.CONSTELLATION;
    readonly LATITUDE_INVALID: string;
    readonly LONGITUDE_INVALID: string;
    readonly DILUTION_INVALID: number;
    readonly ALTITUDE_INVALID: number;
    readonly GROUNDSPEED_INVALID: number;
    readonly DIRECTION_INVALID: number;
    readonly UNIXTIME_INVALID: number;
    readonly DATETIME_INVALID: string;
    readonly UTCOFFSET_INVALID: number;
    readonly COMMAND_INVALID: string;
    static readonly ISFIXED_FALSE: YGps.ISFIXED;
    static readonly ISFIXED_TRUE: YGps.ISFIXED;
    static readonly ISFIXED_INVALID: YGps.ISFIXED;
    static readonly SATCOUNT_INVALID: number;
    static readonly SATPERCONST_INVALID: number;
    static readonly GPSREFRESHRATE_INVALID: number;
    static readonly COORDSYSTEM_GPS_DMS: YGps.COORDSYSTEM;
    static readonly COORDSYSTEM_GPS_DM: YGps.COORDSYSTEM;
    static readonly COORDSYSTEM_GPS_D: YGps.COORDSYSTEM;
    static readonly COORDSYSTEM_INVALID: YGps.COORDSYSTEM;
    static readonly CONSTELLATION_GNSS: YGps.CONSTELLATION;
    static readonly CONSTELLATION_GPS: YGps.CONSTELLATION;
    static readonly CONSTELLATION_GLONASS: YGps.CONSTELLATION;
    static readonly CONSTELLATION_GALILEO: YGps.CONSTELLATION;
    static readonly CONSTELLATION_GPS_GLONASS: YGps.CONSTELLATION;
    static readonly CONSTELLATION_GPS_GALILEO: YGps.CONSTELLATION;
    static readonly CONSTELLATION_GLONASS_GALILEO: YGps.CONSTELLATION;
    static readonly CONSTELLATION_INVALID: YGps.CONSTELLATION;
    static readonly LATITUDE_INVALID: string;
    static readonly LONGITUDE_INVALID: string;
    static readonly DILUTION_INVALID: number;
    static readonly ALTITUDE_INVALID: number;
    static readonly GROUNDSPEED_INVALID: number;
    static readonly DIRECTION_INVALID: number;
    static readonly UNIXTIME_INVALID: number;
    static readonly DATETIME_INVALID: string;
    static readonly UTCOFFSET_INVALID: number;
    static readonly COMMAND_INVALID: string;
    constructor(yapi: YAPIContext, func: string);
    imm_parseAttr(name: string, val: any): number;
    /**
     * Returns TRUE if the receiver has found enough satellites to work.
     *
     * @return either YGps.ISFIXED_FALSE or YGps.ISFIXED_TRUE, according to TRUE if the receiver has found
     * enough satellites to work
     *
     * On failure, throws an exception or returns YGps.ISFIXED_INVALID.
     */
    get_isFixed(): Promise<YGps.ISFIXED>;
    /**
     * Returns the total count of satellites used to compute GPS position.
     *
     * @return an integer corresponding to the total count of satellites used to compute GPS position
     *
     * On failure, throws an exception or returns YGps.SATCOUNT_INVALID.
     */
    get_satCount(): Promise<number>;
    /**
     * Returns the count of visible satellites per constellation encoded
     * on a 32 bit integer: bits 0..5: GPS satellites count,  bits 6..11 : Glonass, bits 12..17 : Galileo.
     * this value is refreshed every 5 seconds only.
     *
     * @return an integer corresponding to the count of visible satellites per constellation encoded
     *         on a 32 bit integer: bits 0.
     *
     * On failure, throws an exception or returns YGps.SATPERCONST_INVALID.
     */
    get_satPerConst(): Promise<number>;
    /**
     * Returns effective GPS data refresh frequency.
     * this value is refreshed every 5 seconds only.
     *
     * @return a floating point number corresponding to effective GPS data refresh frequency
     *
     * On failure, throws an exception or returns YGps.GPSREFRESHRATE_INVALID.
     */
    get_gpsRefreshRate(): Promise<number>;
    /**
     * Returns the representation system used for positioning data.
     *
     * @return a value among YGps.COORDSYSTEM_GPS_DMS, YGps.COORDSYSTEM_GPS_DM and YGps.COORDSYSTEM_GPS_D
     * corresponding to the representation system used for positioning data
     *
     * On failure, throws an exception or returns YGps.COORDSYSTEM_INVALID.
     */
    get_coordSystem(): Promise<YGps.COORDSYSTEM>;
    /**
     * Changes the representation system used for positioning data.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : a value among YGps.COORDSYSTEM_GPS_DMS, YGps.COORDSYSTEM_GPS_DM and
     * YGps.COORDSYSTEM_GPS_D corresponding to the representation system used for positioning data
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_coordSystem(newval: YGps.COORDSYSTEM): Promise<number>;
    /**
     * Returns the the satellites constellation used to compute
     * positioning data.
     *
     * @return a value among YGps.CONSTELLATION_GNSS, YGps.CONSTELLATION_GPS, YGps.CONSTELLATION_GLONASS,
     * YGps.CONSTELLATION_GALILEO, YGps.CONSTELLATION_GPS_GLONASS, YGps.CONSTELLATION_GPS_GALILEO and
     * YGps.CONSTELLATION_GLONASS_GALILEO corresponding to the the satellites constellation used to compute
     *         positioning data
     *
     * On failure, throws an exception or returns YGps.CONSTELLATION_INVALID.
     */
    get_constellation(): Promise<YGps.CONSTELLATION>;
    /**
     * Changes the satellites constellation used to compute
     * positioning data. Possible  constellations are GNSS ( = all supported constellations),
     * GPS, Glonass, Galileo , and the 3 possible pairs. This setting has  no effect on Yocto-GPS (V1).
     *
     * @param newval : a value among YGps.CONSTELLATION_GNSS, YGps.CONSTELLATION_GPS,
     * YGps.CONSTELLATION_GLONASS, YGps.CONSTELLATION_GALILEO, YGps.CONSTELLATION_GPS_GLONASS,
     * YGps.CONSTELLATION_GPS_GALILEO and YGps.CONSTELLATION_GLONASS_GALILEO corresponding to the
     * satellites constellation used to compute
     *         positioning data
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_constellation(newval: YGps.CONSTELLATION): Promise<number>;
    /**
     * Returns the current latitude.
     *
     * @return a string corresponding to the current latitude
     *
     * On failure, throws an exception or returns YGps.LATITUDE_INVALID.
     */
    get_latitude(): Promise<string>;
    /**
     * Returns the current longitude.
     *
     * @return a string corresponding to the current longitude
     *
     * On failure, throws an exception or returns YGps.LONGITUDE_INVALID.
     */
    get_longitude(): Promise<string>;
    /**
     * Returns the current horizontal dilution of precision,
     * the smaller that number is, the better .
     *
     * @return a floating point number corresponding to the current horizontal dilution of precision,
     *         the smaller that number is, the better
     *
     * On failure, throws an exception or returns YGps.DILUTION_INVALID.
     */
    get_dilution(): Promise<number>;
    /**
     * Returns the current altitude. Beware:  GPS technology
     * is very inaccurate regarding altitude.
     *
     * @return a floating point number corresponding to the current altitude
     *
     * On failure, throws an exception or returns YGps.ALTITUDE_INVALID.
     */
    get_altitude(): Promise<number>;
    /**
     * Returns the current ground speed in Km/h.
     *
     * @return a floating point number corresponding to the current ground speed in Km/h
     *
     * On failure, throws an exception or returns YGps.GROUNDSPEED_INVALID.
     */
    get_groundSpeed(): Promise<number>;
    /**
     * Returns the current move bearing in degrees, zero
     * is the true (geographic) north.
     *
     * @return a floating point number corresponding to the current move bearing in degrees, zero
     *         is the true (geographic) north
     *
     * On failure, throws an exception or returns YGps.DIRECTION_INVALID.
     */
    get_direction(): Promise<number>;
    /**
     * Returns the current time in Unix format (number of
     * seconds elapsed since Jan 1st, 1970).
     *
     * @return an integer corresponding to the current time in Unix format (number of
     *         seconds elapsed since Jan 1st, 1970)
     *
     * On failure, throws an exception or returns YGps.UNIXTIME_INVALID.
     */
    get_unixTime(): Promise<number>;
    /**
     * Returns the current time in the form "YYYY/MM/DD hh:mm:ss".
     *
     * @return a string corresponding to the current time in the form "YYYY/MM/DD hh:mm:ss"
     *
     * On failure, throws an exception or returns YGps.DATETIME_INVALID.
     */
    get_dateTime(): Promise<string>;
    /**
     * Returns the number of seconds between current time and UTC time (time zone).
     *
     * @return an integer corresponding to the number of seconds between current time and UTC time (time zone)
     *
     * On failure, throws an exception or returns YGps.UTCOFFSET_INVALID.
     */
    get_utcOffset(): Promise<number>;
    /**
     * Changes the number of seconds between current time and UTC time (time zone).
     * The timezone is automatically rounded to the nearest multiple of 15 minutes.
     * If current UTC time is known, the current time is automatically be updated according to the selected time zone.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : an integer corresponding to the number of seconds between current time and UTC time (time zone)
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_utcOffset(newval: number): Promise<number>;
    get_command(): Promise<string>;
    set_command(newval: string): Promise<number>;
    /**
     * Retrieves a geolocalization module for a given identifier.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the geolocalization module is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YGps.isOnline() to test if the geolocalization module is
     * indeed online at a given time. In case of ambiguity when looking for
     * a geolocalization module by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the geolocalization module, for instance
     *         YGNSSMK2.gps.
     *
     * @return a YGps object allowing you to drive the geolocalization module.
     */
    static FindGps(func: string): YGps;
    /**
     * Retrieves a geolocalization module for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the geolocalization module is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YGps.isOnline() to test if the geolocalization module is
     * indeed online at a given time. In case of ambiguity when looking for
     * a geolocalization module by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx : a YAPI context
     * @param func : a string that uniquely characterizes the geolocalization module, for instance
     *         YGNSSMK2.gps.
     *
     * @return a YGps object allowing you to drive the geolocalization module.
     */
    static FindGpsInContext(yctx: YAPIContext, func: string): YGps;
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
    registerValueCallback(callback: YGps.ValueCallback | null): Promise<number>;
    _invokeValueCallback(value: string): Promise<number>;
    /**
     * Continues the enumeration of geolocalization modules started using yFirstGps().
     * Caution: You can't make any assumption about the returned geolocalization modules order.
     * If you want to find a specific a geolocalization module, use Gps.findGps()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YGps object, corresponding to
     *         a geolocalization module currently online, or a null pointer
     *         if there are no more geolocalization modules to enumerate.
     */
    nextGps(): YGps | null;
    /**
     * Starts the enumeration of geolocalization modules currently accessible.
     * Use the method YGps.nextGps() to iterate on
     * next geolocalization modules.
     *
     * @return a pointer to a YGps object, corresponding to
     *         the first geolocalization module currently online, or a null pointer
     *         if there are none.
     */
    static FirstGps(): YGps | null;
    /**
     * Starts the enumeration of geolocalization modules currently accessible.
     * Use the method YGps.nextGps() to iterate on
     * next geolocalization modules.
     *
     * @param yctx : a YAPI context.
     *
     * @return a pointer to a YGps object, corresponding to
     *         the first geolocalization module currently online, or a null pointer
     *         if there are none.
     */
    static FirstGpsInContext(yctx: YAPIContext): YGps | null;
}
export declare namespace YGps {
    const enum ISFIXED {
        FALSE = 0,
        TRUE = 1,
        INVALID = -1
    }
    const enum COORDSYSTEM {
        GPS_DMS = 0,
        GPS_DM = 1,
        GPS_D = 2,
        INVALID = -1
    }
    const enum CONSTELLATION {
        GNSS = 0,
        GPS = 1,
        GLONASS = 2,
        GALILEO = 3,
        GPS_GLONASS = 4,
        GPS_GALILEO = 5,
        GLONASS_GALILEO = 6,
        INVALID = -1
    }
    interface ValueCallback {
        (func: YGps, value: string): void;
    }
}
