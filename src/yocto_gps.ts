/*********************************************************************
 *
 *  $Id: yocto_gps.ts 59977 2024-03-18 15:02:32Z mvuilleu $
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

import { YAPI, YAPIContext, YErrorMsg, YFunction, YModule, YSensor, YDataLogger, YMeasure } from './yocto_api.js';

//--- (YGps class start)
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
//--- (end of YGps class start)

export class YGps extends YFunction
{
    //--- (YGps attributes declaration)
    _className: string;
    _isFixed: YGps.ISFIXED = YGps.ISFIXED_INVALID;
    _satCount: number = YGps.SATCOUNT_INVALID;
    _satPerConst: number = YGps.SATPERCONST_INVALID;
    _gpsRefreshRate: number = YGps.GPSREFRESHRATE_INVALID;
    _coordSystem: YGps.COORDSYSTEM = YGps.COORDSYSTEM_INVALID;
    _constellation: YGps.CONSTELLATION = YGps.CONSTELLATION_INVALID;
    _latitude: string = YGps.LATITUDE_INVALID;
    _longitude: string = YGps.LONGITUDE_INVALID;
    _dilution: number = YGps.DILUTION_INVALID;
    _altitude: number = YGps.ALTITUDE_INVALID;
    _groundSpeed: number = YGps.GROUNDSPEED_INVALID;
    _direction: number = YGps.DIRECTION_INVALID;
    _unixTime: number = YGps.UNIXTIME_INVALID;
    _dateTime: string = YGps.DATETIME_INVALID;
    _utcOffset: number = YGps.UTCOFFSET_INVALID;
    _command: string = YGps.COMMAND_INVALID;
    _valueCallbackGps: YGps.ValueCallback | null = null;

    // API symbols as object properties
    public readonly ISFIXED_FALSE: YGps.ISFIXED = 0;
    public readonly ISFIXED_TRUE: YGps.ISFIXED = 1;
    public readonly ISFIXED_INVALID: YGps.ISFIXED = -1;
    public readonly SATCOUNT_INVALID: number = YAPI.INVALID_LONG;
    public readonly SATPERCONST_INVALID: number = YAPI.INVALID_LONG;
    public readonly GPSREFRESHRATE_INVALID: number = YAPI.INVALID_DOUBLE;
    public readonly COORDSYSTEM_GPS_DMS: YGps.COORDSYSTEM = 0;
    public readonly COORDSYSTEM_GPS_DM: YGps.COORDSYSTEM = 1;
    public readonly COORDSYSTEM_GPS_D: YGps.COORDSYSTEM = 2;
    public readonly COORDSYSTEM_INVALID: YGps.COORDSYSTEM = -1;
    public readonly CONSTELLATION_GNSS: YGps.CONSTELLATION = 0;
    public readonly CONSTELLATION_GPS: YGps.CONSTELLATION = 1;
    public readonly CONSTELLATION_GLONASS: YGps.CONSTELLATION = 2;
    public readonly CONSTELLATION_GALILEO: YGps.CONSTELLATION = 3;
    public readonly CONSTELLATION_GPS_GLONASS: YGps.CONSTELLATION = 4;
    public readonly CONSTELLATION_GPS_GALILEO: YGps.CONSTELLATION = 5;
    public readonly CONSTELLATION_GLONASS_GALILEO: YGps.CONSTELLATION = 6;
    public readonly CONSTELLATION_INVALID: YGps.CONSTELLATION = -1;
    public readonly LATITUDE_INVALID: string = YAPI.INVALID_STRING;
    public readonly LONGITUDE_INVALID: string = YAPI.INVALID_STRING;
    public readonly DILUTION_INVALID: number = YAPI.INVALID_DOUBLE;
    public readonly ALTITUDE_INVALID: number = YAPI.INVALID_DOUBLE;
    public readonly GROUNDSPEED_INVALID: number = YAPI.INVALID_DOUBLE;
    public readonly DIRECTION_INVALID: number = YAPI.INVALID_DOUBLE;
    public readonly UNIXTIME_INVALID: number = YAPI.INVALID_LONG;
    public readonly DATETIME_INVALID: string = YAPI.INVALID_STRING;
    public readonly UTCOFFSET_INVALID: number = YAPI.INVALID_INT;
    public readonly COMMAND_INVALID: string = YAPI.INVALID_STRING;

    // API symbols as static members
    public static readonly ISFIXED_FALSE: YGps.ISFIXED = 0;
    public static readonly ISFIXED_TRUE: YGps.ISFIXED = 1;
    public static readonly ISFIXED_INVALID: YGps.ISFIXED = -1;
    public static readonly SATCOUNT_INVALID: number = YAPI.INVALID_LONG;
    public static readonly SATPERCONST_INVALID: number = YAPI.INVALID_LONG;
    public static readonly GPSREFRESHRATE_INVALID: number = YAPI.INVALID_DOUBLE;
    public static readonly COORDSYSTEM_GPS_DMS: YGps.COORDSYSTEM = 0;
    public static readonly COORDSYSTEM_GPS_DM: YGps.COORDSYSTEM = 1;
    public static readonly COORDSYSTEM_GPS_D: YGps.COORDSYSTEM = 2;
    public static readonly COORDSYSTEM_INVALID: YGps.COORDSYSTEM = -1;
    public static readonly CONSTELLATION_GNSS: YGps.CONSTELLATION = 0;
    public static readonly CONSTELLATION_GPS: YGps.CONSTELLATION = 1;
    public static readonly CONSTELLATION_GLONASS: YGps.CONSTELLATION = 2;
    public static readonly CONSTELLATION_GALILEO: YGps.CONSTELLATION = 3;
    public static readonly CONSTELLATION_GPS_GLONASS: YGps.CONSTELLATION = 4;
    public static readonly CONSTELLATION_GPS_GALILEO: YGps.CONSTELLATION = 5;
    public static readonly CONSTELLATION_GLONASS_GALILEO: YGps.CONSTELLATION = 6;
    public static readonly CONSTELLATION_INVALID: YGps.CONSTELLATION = -1;
    public static readonly LATITUDE_INVALID: string = YAPI.INVALID_STRING;
    public static readonly LONGITUDE_INVALID: string = YAPI.INVALID_STRING;
    public static readonly DILUTION_INVALID: number = YAPI.INVALID_DOUBLE;
    public static readonly ALTITUDE_INVALID: number = YAPI.INVALID_DOUBLE;
    public static readonly GROUNDSPEED_INVALID: number = YAPI.INVALID_DOUBLE;
    public static readonly DIRECTION_INVALID: number = YAPI.INVALID_DOUBLE;
    public static readonly UNIXTIME_INVALID: number = YAPI.INVALID_LONG;
    public static readonly DATETIME_INVALID: string = YAPI.INVALID_STRING;
    public static readonly UTCOFFSET_INVALID: number = YAPI.INVALID_INT;
    public static readonly COMMAND_INVALID: string = YAPI.INVALID_STRING;
    //--- (end of YGps attributes declaration)

    constructor(yapi: YAPIContext, func: string)
    {
        //--- (YGps constructor)
        super(yapi, func);
        this._className                  = 'Gps';
        //--- (end of YGps constructor)
    }

    //--- (YGps implementation)

    imm_parseAttr(name: string, val: any): number
    {
        switch (name) {
        case 'isFixed':
            this._isFixed = <YGps.ISFIXED> <number> val;
            return 1;
        case 'satCount':
            this._satCount = <number> <number> val;
            return 1;
        case 'satPerConst':
            this._satPerConst = <number> <number> val;
            return 1;
        case 'gpsRefreshRate':
            this._gpsRefreshRate = <number> Math.round(<number>val / 65.536) / 1000.0;
            return 1;
        case 'coordSystem':
            this._coordSystem = <YGps.COORDSYSTEM> <number> val;
            return 1;
        case 'constellation':
            this._constellation = <YGps.CONSTELLATION> <number> val;
            return 1;
        case 'latitude':
            this._latitude = <string> <string> val;
            return 1;
        case 'longitude':
            this._longitude = <string> <string> val;
            return 1;
        case 'dilution':
            this._dilution = <number> Math.round(<number>val / 65.536) / 1000.0;
            return 1;
        case 'altitude':
            this._altitude = <number> Math.round(<number>val / 65.536) / 1000.0;
            return 1;
        case 'groundSpeed':
            this._groundSpeed = <number> Math.round(<number>val / 65.536) / 1000.0;
            return 1;
        case 'direction':
            this._direction = <number> Math.round(<number>val / 65.536) / 1000.0;
            return 1;
        case 'unixTime':
            this._unixTime = <number> <number> val;
            return 1;
        case 'dateTime':
            this._dateTime = <string> <string> val;
            return 1;
        case 'utcOffset':
            this._utcOffset = <number> <number> val;
            return 1;
        case 'command':
            this._command = <string> <string> val;
            return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Returns TRUE if the receiver has found enough satellites to work.
     *
     * @return either YGps.ISFIXED_FALSE or YGps.ISFIXED_TRUE, according to TRUE if the receiver has found
     * enough satellites to work
     *
     * On failure, throws an exception or returns YGps.ISFIXED_INVALID.
     */
    async get_isFixed(): Promise<YGps.ISFIXED>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YGps.ISFIXED_INVALID;
            }
        }
        res = this._isFixed;
        return res;
    }

    /**
     * Returns the total count of satellites used to compute GPS position.
     *
     * @return an integer corresponding to the total count of satellites used to compute GPS position
     *
     * On failure, throws an exception or returns YGps.SATCOUNT_INVALID.
     */
    async get_satCount(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YGps.SATCOUNT_INVALID;
            }
        }
        res = this._satCount;
        return res;
    }

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
    async get_satPerConst(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YGps.SATPERCONST_INVALID;
            }
        }
        res = this._satPerConst;
        return res;
    }

    /**
     * Returns effective GPS data refresh frequency.
     * this value is refreshed every 5 seconds only.
     *
     * @return a floating point number corresponding to effective GPS data refresh frequency
     *
     * On failure, throws an exception or returns YGps.GPSREFRESHRATE_INVALID.
     */
    async get_gpsRefreshRate(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YGps.GPSREFRESHRATE_INVALID;
            }
        }
        res = this._gpsRefreshRate;
        return res;
    }

    /**
     * Returns the representation system used for positioning data.
     *
     * @return a value among YGps.COORDSYSTEM_GPS_DMS, YGps.COORDSYSTEM_GPS_DM and YGps.COORDSYSTEM_GPS_D
     * corresponding to the representation system used for positioning data
     *
     * On failure, throws an exception or returns YGps.COORDSYSTEM_INVALID.
     */
    async get_coordSystem(): Promise<YGps.COORDSYSTEM>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YGps.COORDSYSTEM_INVALID;
            }
        }
        res = this._coordSystem;
        return res;
    }

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
    async set_coordSystem(newval: YGps.COORDSYSTEM): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('coordSystem', rest_val);
    }

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
    async get_constellation(): Promise<YGps.CONSTELLATION>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YGps.CONSTELLATION_INVALID;
            }
        }
        res = this._constellation;
        return res;
    }

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
    async set_constellation(newval: YGps.CONSTELLATION): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('constellation', rest_val);
    }

    /**
     * Returns the current latitude.
     *
     * @return a string corresponding to the current latitude
     *
     * On failure, throws an exception or returns YGps.LATITUDE_INVALID.
     */
    async get_latitude(): Promise<string>
    {
        let res: string;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YGps.LATITUDE_INVALID;
            }
        }
        res = this._latitude;
        return res;
    }

    /**
     * Returns the current longitude.
     *
     * @return a string corresponding to the current longitude
     *
     * On failure, throws an exception or returns YGps.LONGITUDE_INVALID.
     */
    async get_longitude(): Promise<string>
    {
        let res: string;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YGps.LONGITUDE_INVALID;
            }
        }
        res = this._longitude;
        return res;
    }

    /**
     * Returns the current horizontal dilution of precision,
     * the smaller that number is, the better .
     *
     * @return a floating point number corresponding to the current horizontal dilution of precision,
     *         the smaller that number is, the better
     *
     * On failure, throws an exception or returns YGps.DILUTION_INVALID.
     */
    async get_dilution(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YGps.DILUTION_INVALID;
            }
        }
        res = this._dilution;
        return res;
    }

    /**
     * Returns the current altitude. Beware:  GPS technology
     * is very inaccurate regarding altitude.
     *
     * @return a floating point number corresponding to the current altitude
     *
     * On failure, throws an exception or returns YGps.ALTITUDE_INVALID.
     */
    async get_altitude(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YGps.ALTITUDE_INVALID;
            }
        }
        res = this._altitude;
        return res;
    }

    /**
     * Returns the current ground speed in Km/h.
     *
     * @return a floating point number corresponding to the current ground speed in Km/h
     *
     * On failure, throws an exception or returns YGps.GROUNDSPEED_INVALID.
     */
    async get_groundSpeed(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YGps.GROUNDSPEED_INVALID;
            }
        }
        res = this._groundSpeed;
        return res;
    }

    /**
     * Returns the current move bearing in degrees, zero
     * is the true (geographic) north.
     *
     * @return a floating point number corresponding to the current move bearing in degrees, zero
     *         is the true (geographic) north
     *
     * On failure, throws an exception or returns YGps.DIRECTION_INVALID.
     */
    async get_direction(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YGps.DIRECTION_INVALID;
            }
        }
        res = this._direction;
        return res;
    }

    /**
     * Returns the current time in Unix format (number of
     * seconds elapsed since Jan 1st, 1970).
     *
     * @return an integer corresponding to the current time in Unix format (number of
     *         seconds elapsed since Jan 1st, 1970)
     *
     * On failure, throws an exception or returns YGps.UNIXTIME_INVALID.
     */
    async get_unixTime(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YGps.UNIXTIME_INVALID;
            }
        }
        res = this._unixTime;
        return res;
    }

    /**
     * Returns the current time in the form "YYYY/MM/DD hh:mm:ss".
     *
     * @return a string corresponding to the current time in the form "YYYY/MM/DD hh:mm:ss"
     *
     * On failure, throws an exception or returns YGps.DATETIME_INVALID.
     */
    async get_dateTime(): Promise<string>
    {
        let res: string;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YGps.DATETIME_INVALID;
            }
        }
        res = this._dateTime;
        return res;
    }

    /**
     * Returns the number of seconds between current time and UTC time (time zone).
     *
     * @return an integer corresponding to the number of seconds between current time and UTC time (time zone)
     *
     * On failure, throws an exception or returns YGps.UTCOFFSET_INVALID.
     */
    async get_utcOffset(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YGps.UTCOFFSET_INVALID;
            }
        }
        res = this._utcOffset;
        return res;
    }

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
    async set_utcOffset(newval: number): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('utcOffset', rest_val);
    }

    async get_command(): Promise<string>
    {
        let res: string;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YGps.COMMAND_INVALID;
            }
        }
        res = this._command;
        return res;
    }

    async set_command(newval: string): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('command', rest_val);
    }

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
    static FindGps(func: string): YGps
    {
        let obj: YGps | null;
        obj = <YGps> YFunction._FindFromCache('Gps', func);
        if (obj == null) {
            obj = new YGps(YAPI, func);
            YFunction._AddToCache('Gps',  func, obj);
        }
        return obj;
    }

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
    static FindGpsInContext(yctx: YAPIContext, func: string): YGps
    {
        let obj: YGps | null;
        obj = <YGps> YFunction._FindFromCacheInContext(yctx,  'Gps', func);
        if (obj == null) {
            obj = new YGps(yctx, func);
            YFunction._AddToCache('Gps',  func, obj);
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
    async registerValueCallback(callback: YGps.ValueCallback | null): Promise<number>
    {
        let val: string;
        if (callback != null) {
            await YFunction._UpdateValueCallbackList(this, true);
        } else {
            await YFunction._UpdateValueCallbackList(this, false);
        }
        this._valueCallbackGps = callback;
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
        if (this._valueCallbackGps != null) {
            try {
                await this._valueCallbackGps(this, value);
            } catch (e) {
                this._yapi.imm_log('Exception in valueCallback:', e);
            }
        } else {
            await super._invokeValueCallback(value);
        }
        return 0;
    }

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
    nextGps(): YGps | null
    {
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != YAPI.SUCCESS) return null;
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, <string> resolve.result);
        if (next_hwid == null) return null;
        return YGps.FindGpsInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of geolocalization modules currently accessible.
     * Use the method YGps.nextGps() to iterate on
     * next geolocalization modules.
     *
     * @return a pointer to a YGps object, corresponding to
     *         the first geolocalization module currently online, or a null pointer
     *         if there are none.
     */
    static FirstGps(): YGps | null
    {
        let next_hwid = YAPI.imm_getFirstHardwareId('Gps');
        if (next_hwid == null) return null;
        return YGps.FindGps(next_hwid);
    }

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
    static FirstGpsInContext(yctx: YAPIContext): YGps | null
    {
        let next_hwid = yctx.imm_getFirstHardwareId('Gps');
        if (next_hwid == null) return null;
        return YGps.FindGpsInContext(yctx, next_hwid);
    }

    //--- (end of YGps implementation)
}

export namespace YGps {
    //--- (YGps definitions)
    export const enum ISFIXED
    {
        FALSE = 0,
        TRUE = 1,
        INVALID = -1
    }

    export const enum COORDSYSTEM
    {
        GPS_DMS = 0,
        GPS_DM = 1,
        GPS_D = 2,
        INVALID = -1
    }

    export const enum CONSTELLATION
    {
        GNSS = 0,
        GPS = 1,
        GLONASS = 2,
        GALILEO = 3,
        GPS_GLONASS = 4,
        GPS_GALILEO = 5,
        GLONASS_GALILEO = 6,
        INVALID = -1
    }

    export interface ValueCallback {(func: YGps, value: string): void}

    //--- (end of YGps definitions)
}

