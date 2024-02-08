/*********************************************************************
 *
 *  $Id: yocto_gps.ts 55359 2023-06-28 09:25:04Z seb $
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
import { YAPI, YFunction } from './yocto_api.js';
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
export class YGps extends YFunction {
    //--- (end of YGps attributes declaration)
    constructor(yapi, func) {
        //--- (YGps constructor)
        super(yapi, func);
        this._isFixed = YGps.ISFIXED_INVALID;
        this._satCount = YGps.SATCOUNT_INVALID;
        this._satPerConst = YGps.SATPERCONST_INVALID;
        this._gpsRefreshRate = YGps.GPSREFRESHRATE_INVALID;
        this._coordSystem = YGps.COORDSYSTEM_INVALID;
        this._constellation = YGps.CONSTELLATION_INVALID;
        this._latitude = YGps.LATITUDE_INVALID;
        this._longitude = YGps.LONGITUDE_INVALID;
        this._dilution = YGps.DILUTION_INVALID;
        this._altitude = YGps.ALTITUDE_INVALID;
        this._groundSpeed = YGps.GROUNDSPEED_INVALID;
        this._direction = YGps.DIRECTION_INVALID;
        this._unixTime = YGps.UNIXTIME_INVALID;
        this._dateTime = YGps.DATETIME_INVALID;
        this._utcOffset = YGps.UTCOFFSET_INVALID;
        this._command = YGps.COMMAND_INVALID;
        this._valueCallbackGps = null;
        // API symbols as object properties
        this.ISFIXED_FALSE = 0;
        this.ISFIXED_TRUE = 1;
        this.ISFIXED_INVALID = -1;
        this.SATCOUNT_INVALID = YAPI.INVALID_LONG;
        this.SATPERCONST_INVALID = YAPI.INVALID_LONG;
        this.GPSREFRESHRATE_INVALID = YAPI.INVALID_DOUBLE;
        this.COORDSYSTEM_GPS_DMS = 0;
        this.COORDSYSTEM_GPS_DM = 1;
        this.COORDSYSTEM_GPS_D = 2;
        this.COORDSYSTEM_INVALID = -1;
        this.CONSTELLATION_GNSS = 0;
        this.CONSTELLATION_GPS = 1;
        this.CONSTELLATION_GLONASS = 2;
        this.CONSTELLATION_GALILEO = 3;
        this.CONSTELLATION_GPS_GLONASS = 4;
        this.CONSTELLATION_GPS_GALILEO = 5;
        this.CONSTELLATION_GLONASS_GALILEO = 6;
        this.CONSTELLATION_INVALID = -1;
        this.LATITUDE_INVALID = YAPI.INVALID_STRING;
        this.LONGITUDE_INVALID = YAPI.INVALID_STRING;
        this.DILUTION_INVALID = YAPI.INVALID_DOUBLE;
        this.ALTITUDE_INVALID = YAPI.INVALID_DOUBLE;
        this.GROUNDSPEED_INVALID = YAPI.INVALID_DOUBLE;
        this.DIRECTION_INVALID = YAPI.INVALID_DOUBLE;
        this.UNIXTIME_INVALID = YAPI.INVALID_LONG;
        this.DATETIME_INVALID = YAPI.INVALID_STRING;
        this.UTCOFFSET_INVALID = YAPI.INVALID_INT;
        this.COMMAND_INVALID = YAPI.INVALID_STRING;
        this._className = 'Gps';
        //--- (end of YGps constructor)
    }
    //--- (YGps implementation)
    imm_parseAttr(name, val) {
        switch (name) {
            case 'isFixed':
                this._isFixed = val;
                return 1;
            case 'satCount':
                this._satCount = val;
                return 1;
            case 'satPerConst':
                this._satPerConst = val;
                return 1;
            case 'gpsRefreshRate':
                this._gpsRefreshRate = Math.round(val / 65.536) / 1000.0;
                return 1;
            case 'coordSystem':
                this._coordSystem = val;
                return 1;
            case 'constellation':
                this._constellation = val;
                return 1;
            case 'latitude':
                this._latitude = val;
                return 1;
            case 'longitude':
                this._longitude = val;
                return 1;
            case 'dilution':
                this._dilution = Math.round(val / 65.536) / 1000.0;
                return 1;
            case 'altitude':
                this._altitude = Math.round(val / 65.536) / 1000.0;
                return 1;
            case 'groundSpeed':
                this._groundSpeed = Math.round(val / 65.536) / 1000.0;
                return 1;
            case 'direction':
                this._direction = Math.round(val / 65.536) / 1000.0;
                return 1;
            case 'unixTime':
                this._unixTime = val;
                return 1;
            case 'dateTime':
                this._dateTime = val;
                return 1;
            case 'utcOffset':
                this._utcOffset = val;
                return 1;
            case 'command':
                this._command = val;
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
    async get_isFixed() {
        let res;
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
    async get_satCount() {
        let res;
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
    async get_satPerConst() {
        let res;
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
    async get_gpsRefreshRate() {
        let res;
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
    async get_coordSystem() {
        let res;
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
    async set_coordSystem(newval) {
        let rest_val;
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
    async get_constellation() {
        let res;
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
    async set_constellation(newval) {
        let rest_val;
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
    async get_latitude() {
        let res;
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
    async get_longitude() {
        let res;
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
    async get_dilution() {
        let res;
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
    async get_altitude() {
        let res;
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
    async get_groundSpeed() {
        let res;
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
    async get_direction() {
        let res;
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
    async get_unixTime() {
        let res;
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
    async get_dateTime() {
        let res;
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
    async get_utcOffset() {
        let res;
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
    async set_utcOffset(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('utcOffset', rest_val);
    }
    async get_command() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YGps.COMMAND_INVALID;
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
     * Retrieves a geolocalization module for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
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
    static FindGps(func) {
        let obj;
        obj = YFunction._FindFromCache('Gps', func);
        if (obj == null) {
            obj = new YGps(YAPI, func);
            YFunction._AddToCache('Gps', func, obj);
        }
        return obj;
    }
    /**
     * Retrieves a geolocalization module for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
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
    static FindGpsInContext(yctx, func) {
        let obj;
        obj = YFunction._FindFromCacheInContext(yctx, 'Gps', func);
        if (obj == null) {
            obj = new YGps(yctx, func);
            YFunction._AddToCache('Gps', func, obj);
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
    async _invokeValueCallback(value) {
        if (this._valueCallbackGps != null) {
            try {
                await this._valueCallbackGps(this, value);
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
     * Continues the enumeration of geolocalization modules started using yFirstGps().
     * Caution: You can't make any assumption about the returned geolocalization modules order.
     * If you want to find a specific a geolocalization module, use Gps.findGps()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YGps object, corresponding to
     *         a geolocalization module currently online, or a null pointer
     *         if there are no more geolocalization modules to enumerate.
     */
    nextGps() {
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != YAPI.SUCCESS)
            return null;
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if (next_hwid == null)
            return null;
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
    static FirstGps() {
        let next_hwid = YAPI.imm_getFirstHardwareId('Gps');
        if (next_hwid == null)
            return null;
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
    static FirstGpsInContext(yctx) {
        let next_hwid = yctx.imm_getFirstHardwareId('Gps');
        if (next_hwid == null)
            return null;
        return YGps.FindGpsInContext(yctx, next_hwid);
    }
}
// API symbols as static members
YGps.ISFIXED_FALSE = 0;
YGps.ISFIXED_TRUE = 1;
YGps.ISFIXED_INVALID = -1;
YGps.SATCOUNT_INVALID = YAPI.INVALID_LONG;
YGps.SATPERCONST_INVALID = YAPI.INVALID_LONG;
YGps.GPSREFRESHRATE_INVALID = YAPI.INVALID_DOUBLE;
YGps.COORDSYSTEM_GPS_DMS = 0;
YGps.COORDSYSTEM_GPS_DM = 1;
YGps.COORDSYSTEM_GPS_D = 2;
YGps.COORDSYSTEM_INVALID = -1;
YGps.CONSTELLATION_GNSS = 0;
YGps.CONSTELLATION_GPS = 1;
YGps.CONSTELLATION_GLONASS = 2;
YGps.CONSTELLATION_GALILEO = 3;
YGps.CONSTELLATION_GPS_GLONASS = 4;
YGps.CONSTELLATION_GPS_GALILEO = 5;
YGps.CONSTELLATION_GLONASS_GALILEO = 6;
YGps.CONSTELLATION_INVALID = -1;
YGps.LATITUDE_INVALID = YAPI.INVALID_STRING;
YGps.LONGITUDE_INVALID = YAPI.INVALID_STRING;
YGps.DILUTION_INVALID = YAPI.INVALID_DOUBLE;
YGps.ALTITUDE_INVALID = YAPI.INVALID_DOUBLE;
YGps.GROUNDSPEED_INVALID = YAPI.INVALID_DOUBLE;
YGps.DIRECTION_INVALID = YAPI.INVALID_DOUBLE;
YGps.UNIXTIME_INVALID = YAPI.INVALID_LONG;
YGps.DATETIME_INVALID = YAPI.INVALID_STRING;
YGps.UTCOFFSET_INVALID = YAPI.INVALID_INT;
YGps.COMMAND_INVALID = YAPI.INVALID_STRING;
//# sourceMappingURL=yocto_gps.js.map