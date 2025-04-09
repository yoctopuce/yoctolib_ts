"use strict";
/*********************************************************************
 *
 *  $Id: svn_id $
 *
 *  Implements the high-level API for InputCaptureData functions
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
exports.YInputCapture = exports.YInputCaptureData = void 0;
const yocto_api_js_1 = require("./yocto_api.js");
//--- (generated code: YInputCaptureData class start)
/**
 * YInputCaptureData Class: Sampled data from a Yoctopuce electrical sensor
 *
 * InputCaptureData objects represent raw data
 * sampled by the analog/digital converter present in
 * a Yoctopuce electrical sensor. When several inputs
 * are samples simultaneously, their data are provided
 * as distinct series.
 */
//--- (end of generated code: YInputCaptureData class start)
class YInputCaptureData {
    // API symbols as static members
    //--- (end of generated code: YInputCaptureData attributes declaration)
    constructor(yfunc, sdata) {
        //--- (generated code: YInputCaptureData attributes declaration)
        this._fmt = 0;
        this._var1size = 0;
        this._var2size = 0;
        this._var3size = 0;
        this._nVars = 0;
        this._recOfs = 0;
        this._nRecs = 0;
        this._samplesPerSec = 0;
        this._trigType = 0;
        this._trigVal = 0;
        this._trigPos = 0;
        this._trigUTC = 0;
        this._var1unit = '';
        this._var2unit = '';
        this._var3unit = '';
        this._var1samples = [];
        this._var2samples = [];
        this._var3samples = [];
        this._yapi = yfunc._yapi;
        //--- (generated code: YInputCaptureData constructor)
        //--- (end of generated code: YInputCaptureData constructor)
        this.imm_decodeSnapBin(sdata);
    }
    _throw(int_errType, str_errMsg, obj_retVal) {
        return this._yapi._throw(int_errType, str_errMsg, obj_retVal);
    }
    //--- (generated code: YInputCaptureData implementation)
    imm_decodeU16(sdata, ofs) {
        let v;
        v = sdata[ofs];
        v = v + 256 * sdata[ofs + 1];
        return v;
    }
    imm_decodeU32(sdata, ofs) {
        let v;
        v = this.imm_decodeU16(sdata, ofs);
        v = v + 65536.0 * this.imm_decodeU16(sdata, ofs + 2);
        return v;
    }
    imm_decodeVal(sdata, ofs, len) {
        let v;
        let b;
        v = this.imm_decodeU16(sdata, ofs);
        b = 65536.0;
        ofs = ofs + 2;
        len = len - 2;
        while (len > 0) {
            v = v + b * sdata[ofs];
            b = b * 256;
            ofs = ofs + 1;
            len = len - 1;
        }
        if (v > (b / 2)) {
            // negative number
            v = v - b;
        }
        return v;
    }
    imm_decodeSnapBin(sdata) {
        let buffSize;
        let recOfs;
        let ms;
        let recSize;
        let count;
        let mult1;
        let mult2;
        let mult3;
        let v;
        buffSize = (sdata).length;
        if (!(buffSize >= 24)) {
            return this._throw(yocto_api_js_1.YAPI.INVALID_ARGUMENT, 'Invalid snapshot data (too short)', yocto_api_js_1.YAPI.INVALID_ARGUMENT);
        }
        this._fmt = sdata[0];
        this._var1size = sdata[1] - 48;
        this._var2size = sdata[2] - 48;
        this._var3size = sdata[3] - 48;
        if (!(this._fmt == 83)) {
            return this._throw(yocto_api_js_1.YAPI.INVALID_ARGUMENT, 'Unsupported snapshot format', yocto_api_js_1.YAPI.INVALID_ARGUMENT);
        }
        if (!((this._var1size >= 2) && (this._var1size <= 4))) {
            return this._throw(yocto_api_js_1.YAPI.INVALID_ARGUMENT, 'Invalid sample size', yocto_api_js_1.YAPI.INVALID_ARGUMENT);
        }
        if (!((this._var2size >= 0) && (this._var1size <= 4))) {
            return this._throw(yocto_api_js_1.YAPI.INVALID_ARGUMENT, 'Invalid sample size', yocto_api_js_1.YAPI.INVALID_ARGUMENT);
        }
        if (!((this._var3size >= 0) && (this._var1size <= 4))) {
            return this._throw(yocto_api_js_1.YAPI.INVALID_ARGUMENT, 'Invalid sample size', yocto_api_js_1.YAPI.INVALID_ARGUMENT);
        }
        if (this._var2size == 0) {
            this._nVars = 1;
        }
        else {
            if (this._var3size == 0) {
                this._nVars = 2;
            }
            else {
                this._nVars = 3;
            }
        }
        recSize = this._var1size + this._var2size + this._var3size;
        this._recOfs = this.imm_decodeU16(sdata, 4);
        this._nRecs = this.imm_decodeU16(sdata, 6);
        this._samplesPerSec = this.imm_decodeU16(sdata, 8);
        this._trigType = this.imm_decodeU16(sdata, 10);
        this._trigVal = this.imm_decodeVal(sdata, 12, 4) / 1000;
        this._trigPos = this.imm_decodeU16(sdata, 16);
        ms = this.imm_decodeU16(sdata, 18);
        this._trigUTC = this.imm_decodeVal(sdata, 20, 4);
        this._trigUTC = this._trigUTC + (ms / 1000.0);
        recOfs = 24;
        while (sdata[recOfs] >= 32) {
            this._var1unit = this._var1unit + '' + String.fromCharCode(sdata[recOfs]);
            recOfs = recOfs + 1;
        }
        if (this._var2size > 0) {
            recOfs = recOfs + 1;
            while (sdata[recOfs] >= 32) {
                this._var2unit = this._var2unit + '' + String.fromCharCode(sdata[recOfs]);
                recOfs = recOfs + 1;
            }
        }
        if (this._var3size > 0) {
            recOfs = recOfs + 1;
            while (sdata[recOfs] >= 32) {
                this._var3unit = this._var3unit + '' + String.fromCharCode(sdata[recOfs]);
                recOfs = recOfs + 1;
            }
        }
        if ((recOfs & 1) == 1) {
            // align to next word
            recOfs = recOfs + 1;
        }
        mult1 = 1;
        mult2 = 1;
        mult3 = 1;
        if (recOfs < this._recOfs) {
            // load optional value multiplier
            mult1 = this.imm_decodeU16(sdata, recOfs);
            recOfs = recOfs + 2;
            if (this._var2size > 0) {
                mult2 = this.imm_decodeU16(sdata, recOfs);
                recOfs = recOfs + 2;
            }
            if (this._var3size > 0) {
                mult3 = this.imm_decodeU16(sdata, recOfs);
                recOfs = recOfs + 2;
            }
        }
        recOfs = this._recOfs;
        count = this._nRecs;
        while ((count > 0) && (recOfs + this._var1size <= buffSize)) {
            v = this.imm_decodeVal(sdata, recOfs, this._var1size) / 1000.0;
            this._var1samples.push(v * mult1);
            recOfs = recOfs + recSize;
        }
        if (this._var2size > 0) {
            recOfs = this._recOfs + this._var1size;
            count = this._nRecs;
            while ((count > 0) && (recOfs + this._var2size <= buffSize)) {
                v = this.imm_decodeVal(sdata, recOfs, this._var2size) / 1000.0;
                this._var2samples.push(v * mult2);
                recOfs = recOfs + recSize;
            }
        }
        if (this._var3size > 0) {
            recOfs = this._recOfs + this._var1size + this._var2size;
            count = this._nRecs;
            while ((count > 0) && (recOfs + this._var3size <= buffSize)) {
                v = this.imm_decodeVal(sdata, recOfs, this._var3size) / 1000.0;
                this._var3samples.push(v * mult3);
                recOfs = recOfs + recSize;
            }
        }
        return yocto_api_js_1.YAPI.SUCCESS;
    }
    /**
     * Returns the number of series available in the capture.
     *
     * @return an integer corresponding to the number of
     *         simultaneous data series available.
     */
    get_serieCount() {
        return this._nVars;
    }
    /**
     * Returns the number of records captured (in a serie).
     * In the exceptional case where it was not possible
     * to transfer all data in time, the number of records
     * actually present in the series might be lower than
     * the number of records captured
     *
     * @return an integer corresponding to the number of
     *         records expected in each serie.
     */
    get_recordCount() {
        return this._nRecs;
    }
    /**
     * Returns the effective sampling rate of the device.
     *
     * @return an integer corresponding to the number of
     *         samples taken each second.
     */
    get_samplingRate() {
        return this._samplesPerSec;
    }
    /**
     * Returns the type of automatic conditional capture
     * that triggered the capture of this data sequence.
     *
     * @return the type of conditional capture.
     */
    get_captureType() {
        return this._trigType;
    }
    /**
     * Returns the threshold value that triggered
     * this automatic conditional capture, if it was
     * not an instant captured triggered manually.
     *
     * @return the conditional threshold value
     *         at the time of capture.
     */
    get_triggerValue() {
        return this._trigVal;
    }
    /**
     * Returns the index in the series of the sample
     * corresponding to the exact time when the capture
     * was triggered. In case of trigger based on average
     * or RMS value, the trigger index corresponds to
     * the end of the averaging period.
     *
     * @return an integer corresponding to a position
     *         in the data serie.
     */
    get_triggerPosition() {
        return this._trigPos;
    }
    /**
     * Returns the absolute time when the capture was
     * triggered, as a Unix timestamp. Milliseconds are
     * included in this timestamp (floating-point number).
     *
     * @return a floating-point number corresponding to
     *         the number of seconds between the Jan 1,
     *         1970 and the moment where the capture
     *         was triggered.
     */
    get_triggerRealTimeUTC() {
        return this._trigUTC;
    }
    /**
     * Returns the unit of measurement for data points in
     * the first serie.
     *
     * @return a string containing to a physical unit of
     *         measurement.
     */
    get_serie1Unit() {
        return this._var1unit;
    }
    /**
     * Returns the unit of measurement for data points in
     * the second serie.
     *
     * @return a string containing to a physical unit of
     *         measurement.
     */
    get_serie2Unit() {
        if (!(this._nVars >= 2)) {
            return this._throw(yocto_api_js_1.YAPI.INVALID_ARGUMENT, 'There is no serie 2 in this capture data', '');
        }
        return this._var2unit;
    }
    /**
     * Returns the unit of measurement for data points in
     * the third serie.
     *
     * @return a string containing to a physical unit of
     *         measurement.
     */
    get_serie3Unit() {
        if (!(this._nVars >= 3)) {
            return this._throw(yocto_api_js_1.YAPI.INVALID_ARGUMENT, 'There is no serie 3 in this capture data', '');
        }
        return this._var3unit;
    }
    /**
     * Returns the sampled data corresponding to the first serie.
     * The corresponding physical unit can be obtained
     * using the method get_serie1Unit().
     *
     * @return a list of real numbers corresponding to all
     *         samples received for serie 1.
     *
     * On failure, throws an exception or returns an empty array.
     */
    get_serie1Values() {
        return this._var1samples;
    }
    /**
     * Returns the sampled data corresponding to the second serie.
     * The corresponding physical unit can be obtained
     * using the method get_serie2Unit().
     *
     * @return a list of real numbers corresponding to all
     *         samples received for serie 2.
     *
     * On failure, throws an exception or returns an empty array.
     */
    get_serie2Values() {
        if (!(this._nVars >= 2)) {
            return this._throw(yocto_api_js_1.YAPI.INVALID_ARGUMENT, 'There is no serie 2 in this capture data', this._var2samples);
        }
        return this._var2samples;
    }
    /**
     * Returns the sampled data corresponding to the third serie.
     * The corresponding physical unit can be obtained
     * using the method get_serie3Unit().
     *
     * @return a list of real numbers corresponding to all
     *         samples received for serie 3.
     *
     * On failure, throws an exception or returns an empty array.
     */
    get_serie3Values() {
        if (!(this._nVars >= 3)) {
            return this._throw(yocto_api_js_1.YAPI.INVALID_ARGUMENT, 'There is no serie 3 in this capture data', this._var3samples);
        }
        return this._var3samples;
    }
}
exports.YInputCaptureData = YInputCaptureData;
//--- (generated code: YInputCapture class start)
/**
 * YInputCapture Class: instant snapshot trigger control interface
 *
 * The YInputCapture class allows you to access data samples
 * measured by a Yoctopuce electrical sensor. The data capture can be
 * triggered manually, or be configured to detect specific events.
 */
//--- (end of generated code: YInputCapture class start)
class YInputCapture extends yocto_api_js_1.YSensor {
    //--- (end of generated code: YInputCapture attributes declaration)
    constructor(yapi, func) {
        //--- (generated code: YInputCapture constructor)
        super(yapi, func);
        this._lastCaptureTime = YInputCapture.LASTCAPTURETIME_INVALID;
        this._nSamples = YInputCapture.NSAMPLES_INVALID;
        this._samplingRate = YInputCapture.SAMPLINGRATE_INVALID;
        this._captureType = YInputCapture.CAPTURETYPE_INVALID;
        this._condValue = YInputCapture.CONDVALUE_INVALID;
        this._condAlign = YInputCapture.CONDALIGN_INVALID;
        this._captureTypeAtStartup = YInputCapture.CAPTURETYPEATSTARTUP_INVALID;
        this._condValueAtStartup = YInputCapture.CONDVALUEATSTARTUP_INVALID;
        this._valueCallbackInputCapture = null;
        // API symbols as object properties
        this.LASTCAPTURETIME_INVALID = yocto_api_js_1.YAPI.INVALID_LONG;
        this.NSAMPLES_INVALID = yocto_api_js_1.YAPI.INVALID_UINT;
        this.SAMPLINGRATE_INVALID = yocto_api_js_1.YAPI.INVALID_UINT;
        this.CAPTURETYPE_NONE = 0;
        this.CAPTURETYPE_TIMED = 1;
        this.CAPTURETYPE_V_MAX = 2;
        this.CAPTURETYPE_V_MIN = 3;
        this.CAPTURETYPE_I_MAX = 4;
        this.CAPTURETYPE_I_MIN = 5;
        this.CAPTURETYPE_P_MAX = 6;
        this.CAPTURETYPE_P_MIN = 7;
        this.CAPTURETYPE_V_AVG_MAX = 8;
        this.CAPTURETYPE_V_AVG_MIN = 9;
        this.CAPTURETYPE_V_RMS_MAX = 10;
        this.CAPTURETYPE_V_RMS_MIN = 11;
        this.CAPTURETYPE_I_AVG_MAX = 12;
        this.CAPTURETYPE_I_AVG_MIN = 13;
        this.CAPTURETYPE_I_RMS_MAX = 14;
        this.CAPTURETYPE_I_RMS_MIN = 15;
        this.CAPTURETYPE_P_AVG_MAX = 16;
        this.CAPTURETYPE_P_AVG_MIN = 17;
        this.CAPTURETYPE_PF_MIN = 18;
        this.CAPTURETYPE_DPF_MIN = 19;
        this.CAPTURETYPE_INVALID = -1;
        this.CONDVALUE_INVALID = yocto_api_js_1.YAPI.INVALID_DOUBLE;
        this.CONDALIGN_INVALID = yocto_api_js_1.YAPI.INVALID_UINT;
        this.CAPTURETYPEATSTARTUP_NONE = 0;
        this.CAPTURETYPEATSTARTUP_TIMED = 1;
        this.CAPTURETYPEATSTARTUP_V_MAX = 2;
        this.CAPTURETYPEATSTARTUP_V_MIN = 3;
        this.CAPTURETYPEATSTARTUP_I_MAX = 4;
        this.CAPTURETYPEATSTARTUP_I_MIN = 5;
        this.CAPTURETYPEATSTARTUP_P_MAX = 6;
        this.CAPTURETYPEATSTARTUP_P_MIN = 7;
        this.CAPTURETYPEATSTARTUP_V_AVG_MAX = 8;
        this.CAPTURETYPEATSTARTUP_V_AVG_MIN = 9;
        this.CAPTURETYPEATSTARTUP_V_RMS_MAX = 10;
        this.CAPTURETYPEATSTARTUP_V_RMS_MIN = 11;
        this.CAPTURETYPEATSTARTUP_I_AVG_MAX = 12;
        this.CAPTURETYPEATSTARTUP_I_AVG_MIN = 13;
        this.CAPTURETYPEATSTARTUP_I_RMS_MAX = 14;
        this.CAPTURETYPEATSTARTUP_I_RMS_MIN = 15;
        this.CAPTURETYPEATSTARTUP_P_AVG_MAX = 16;
        this.CAPTURETYPEATSTARTUP_P_AVG_MIN = 17;
        this.CAPTURETYPEATSTARTUP_PF_MIN = 18;
        this.CAPTURETYPEATSTARTUP_DPF_MIN = 19;
        this.CAPTURETYPEATSTARTUP_INVALID = -1;
        this.CONDVALUEATSTARTUP_INVALID = yocto_api_js_1.YAPI.INVALID_DOUBLE;
        this._className = 'InputCapture';
        //--- (end of generated code: YInputCapture constructor)
    }
    //--- (generated code: YInputCapture implementation)
    imm_parseAttr(name, val) {
        switch (name) {
            case 'lastCaptureTime':
                this._lastCaptureTime = val;
                return 1;
            case 'nSamples':
                this._nSamples = val;
                return 1;
            case 'samplingRate':
                this._samplingRate = val;
                return 1;
            case 'captureType':
                this._captureType = val;
                return 1;
            case 'condValue':
                this._condValue = Math.round(val / 65.536) / 1000.0;
                return 1;
            case 'condAlign':
                this._condAlign = val;
                return 1;
            case 'captureTypeAtStartup':
                this._captureTypeAtStartup = val;
                return 1;
            case 'condValueAtStartup':
                this._condValueAtStartup = Math.round(val / 65.536) / 1000.0;
                return 1;
        }
        return super.imm_parseAttr(name, val);
    }
    /**
     * Returns the number of elapsed milliseconds between the module power on
     * and the last capture (time of trigger), or zero if no capture has been done.
     *
     * @return an integer corresponding to the number of elapsed milliseconds between the module power on
     *         and the last capture (time of trigger), or zero if no capture has been done
     *
     * On failure, throws an exception or returns YInputCapture.LASTCAPTURETIME_INVALID.
     */
    async get_lastCaptureTime() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YInputCapture.LASTCAPTURETIME_INVALID;
            }
        }
        res = this._lastCaptureTime;
        return res;
    }
    /**
     * Returns the number of samples that will be captured.
     *
     * @return an integer corresponding to the number of samples that will be captured
     *
     * On failure, throws an exception or returns YInputCapture.NSAMPLES_INVALID.
     */
    async get_nSamples() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YInputCapture.NSAMPLES_INVALID;
            }
        }
        res = this._nSamples;
        return res;
    }
    /**
     * Changes the type of automatic conditional capture.
     * The maximum number of samples depends on the device memory.
     *
     * If you want the change to be kept after a device reboot,
     * make sure  to call the matching module saveToFlash().
     *
     * @param newval : an integer corresponding to the type of automatic conditional capture
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_nSamples(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('nSamples', rest_val);
    }
    /**
     * Returns the sampling frequency, in Hz.
     *
     * @return an integer corresponding to the sampling frequency, in Hz
     *
     * On failure, throws an exception or returns YInputCapture.SAMPLINGRATE_INVALID.
     */
    async get_samplingRate() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YInputCapture.SAMPLINGRATE_INVALID;
            }
        }
        res = this._samplingRate;
        return res;
    }
    /**
     * Returns the type of automatic conditional capture.
     *
     * @return a value among YInputCapture.CAPTURETYPE_NONE, YInputCapture.CAPTURETYPE_TIMED,
     * YInputCapture.CAPTURETYPE_V_MAX, YInputCapture.CAPTURETYPE_V_MIN, YInputCapture.CAPTURETYPE_I_MAX,
     * YInputCapture.CAPTURETYPE_I_MIN, YInputCapture.CAPTURETYPE_P_MAX, YInputCapture.CAPTURETYPE_P_MIN,
     * YInputCapture.CAPTURETYPE_V_AVG_MAX, YInputCapture.CAPTURETYPE_V_AVG_MIN,
     * YInputCapture.CAPTURETYPE_V_RMS_MAX, YInputCapture.CAPTURETYPE_V_RMS_MIN,
     * YInputCapture.CAPTURETYPE_I_AVG_MAX, YInputCapture.CAPTURETYPE_I_AVG_MIN,
     * YInputCapture.CAPTURETYPE_I_RMS_MAX, YInputCapture.CAPTURETYPE_I_RMS_MIN,
     * YInputCapture.CAPTURETYPE_P_AVG_MAX, YInputCapture.CAPTURETYPE_P_AVG_MIN,
     * YInputCapture.CAPTURETYPE_PF_MIN and YInputCapture.CAPTURETYPE_DPF_MIN corresponding to the type of
     * automatic conditional capture
     *
     * On failure, throws an exception or returns YInputCapture.CAPTURETYPE_INVALID.
     */
    async get_captureType() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YInputCapture.CAPTURETYPE_INVALID;
            }
        }
        res = this._captureType;
        return res;
    }
    /**
     * Changes the type of automatic conditional capture.
     *
     * @param newval : a value among YInputCapture.CAPTURETYPE_NONE, YInputCapture.CAPTURETYPE_TIMED,
     * YInputCapture.CAPTURETYPE_V_MAX, YInputCapture.CAPTURETYPE_V_MIN, YInputCapture.CAPTURETYPE_I_MAX,
     * YInputCapture.CAPTURETYPE_I_MIN, YInputCapture.CAPTURETYPE_P_MAX, YInputCapture.CAPTURETYPE_P_MIN,
     * YInputCapture.CAPTURETYPE_V_AVG_MAX, YInputCapture.CAPTURETYPE_V_AVG_MIN,
     * YInputCapture.CAPTURETYPE_V_RMS_MAX, YInputCapture.CAPTURETYPE_V_RMS_MIN,
     * YInputCapture.CAPTURETYPE_I_AVG_MAX, YInputCapture.CAPTURETYPE_I_AVG_MIN,
     * YInputCapture.CAPTURETYPE_I_RMS_MAX, YInputCapture.CAPTURETYPE_I_RMS_MIN,
     * YInputCapture.CAPTURETYPE_P_AVG_MAX, YInputCapture.CAPTURETYPE_P_AVG_MIN,
     * YInputCapture.CAPTURETYPE_PF_MIN and YInputCapture.CAPTURETYPE_DPF_MIN corresponding to the type of
     * automatic conditional capture
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_captureType(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('captureType', rest_val);
    }
    /**
     * Changes current threshold value for automatic conditional capture.
     *
     * @param newval : a floating point number corresponding to current threshold value for automatic
     * conditional capture
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_condValue(newval) {
        let rest_val;
        rest_val = String(Math.round(newval * 65536.0));
        return await this._setAttr('condValue', rest_val);
    }
    /**
     * Returns current threshold value for automatic conditional capture.
     *
     * @return a floating point number corresponding to current threshold value for automatic conditional capture
     *
     * On failure, throws an exception or returns YInputCapture.CONDVALUE_INVALID.
     */
    async get_condValue() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YInputCapture.CONDVALUE_INVALID;
            }
        }
        res = this._condValue;
        return res;
    }
    /**
     * Returns the relative position of the trigger event within the capture window.
     * When the value is 50%, the capture is centered on the event.
     *
     * @return an integer corresponding to the relative position of the trigger event within the capture window
     *
     * On failure, throws an exception or returns YInputCapture.CONDALIGN_INVALID.
     */
    async get_condAlign() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YInputCapture.CONDALIGN_INVALID;
            }
        }
        res = this._condAlign;
        return res;
    }
    /**
     * Changes the relative position of the trigger event within the capture window.
     * The new value must be between 10% (on the left) and 90% (on the right).
     * When the value is 50%, the capture is centered on the event.
     *
     * If you want the change to be kept after a device reboot,
     * make sure  to call the matching module saveToFlash().
     *
     * @param newval : an integer corresponding to the relative position of the trigger event within the capture window
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_condAlign(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('condAlign', rest_val);
    }
    /**
     * Returns the type of automatic conditional capture
     * applied at device power on.
     *
     * @return a value among YInputCapture.CAPTURETYPEATSTARTUP_NONE,
     * YInputCapture.CAPTURETYPEATSTARTUP_TIMED, YInputCapture.CAPTURETYPEATSTARTUP_V_MAX,
     * YInputCapture.CAPTURETYPEATSTARTUP_V_MIN, YInputCapture.CAPTURETYPEATSTARTUP_I_MAX,
     * YInputCapture.CAPTURETYPEATSTARTUP_I_MIN, YInputCapture.CAPTURETYPEATSTARTUP_P_MAX,
     * YInputCapture.CAPTURETYPEATSTARTUP_P_MIN, YInputCapture.CAPTURETYPEATSTARTUP_V_AVG_MAX,
     * YInputCapture.CAPTURETYPEATSTARTUP_V_AVG_MIN, YInputCapture.CAPTURETYPEATSTARTUP_V_RMS_MAX,
     * YInputCapture.CAPTURETYPEATSTARTUP_V_RMS_MIN, YInputCapture.CAPTURETYPEATSTARTUP_I_AVG_MAX,
     * YInputCapture.CAPTURETYPEATSTARTUP_I_AVG_MIN, YInputCapture.CAPTURETYPEATSTARTUP_I_RMS_MAX,
     * YInputCapture.CAPTURETYPEATSTARTUP_I_RMS_MIN, YInputCapture.CAPTURETYPEATSTARTUP_P_AVG_MAX,
     * YInputCapture.CAPTURETYPEATSTARTUP_P_AVG_MIN, YInputCapture.CAPTURETYPEATSTARTUP_PF_MIN and
     * YInputCapture.CAPTURETYPEATSTARTUP_DPF_MIN corresponding to the type of automatic conditional capture
     *         applied at device power on
     *
     * On failure, throws an exception or returns YInputCapture.CAPTURETYPEATSTARTUP_INVALID.
     */
    async get_captureTypeAtStartup() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YInputCapture.CAPTURETYPEATSTARTUP_INVALID;
            }
        }
        res = this._captureTypeAtStartup;
        return res;
    }
    /**
     * Changes the type of automatic conditional capture
     * applied at device power on.
     *
     * If you want the change to be kept after a device reboot,
     * make sure  to call the matching module saveToFlash().
     *
     * @param newval : a value among YInputCapture.CAPTURETYPEATSTARTUP_NONE,
     * YInputCapture.CAPTURETYPEATSTARTUP_TIMED, YInputCapture.CAPTURETYPEATSTARTUP_V_MAX,
     * YInputCapture.CAPTURETYPEATSTARTUP_V_MIN, YInputCapture.CAPTURETYPEATSTARTUP_I_MAX,
     * YInputCapture.CAPTURETYPEATSTARTUP_I_MIN, YInputCapture.CAPTURETYPEATSTARTUP_P_MAX,
     * YInputCapture.CAPTURETYPEATSTARTUP_P_MIN, YInputCapture.CAPTURETYPEATSTARTUP_V_AVG_MAX,
     * YInputCapture.CAPTURETYPEATSTARTUP_V_AVG_MIN, YInputCapture.CAPTURETYPEATSTARTUP_V_RMS_MAX,
     * YInputCapture.CAPTURETYPEATSTARTUP_V_RMS_MIN, YInputCapture.CAPTURETYPEATSTARTUP_I_AVG_MAX,
     * YInputCapture.CAPTURETYPEATSTARTUP_I_AVG_MIN, YInputCapture.CAPTURETYPEATSTARTUP_I_RMS_MAX,
     * YInputCapture.CAPTURETYPEATSTARTUP_I_RMS_MIN, YInputCapture.CAPTURETYPEATSTARTUP_P_AVG_MAX,
     * YInputCapture.CAPTURETYPEATSTARTUP_P_AVG_MIN, YInputCapture.CAPTURETYPEATSTARTUP_PF_MIN and
     * YInputCapture.CAPTURETYPEATSTARTUP_DPF_MIN corresponding to the type of automatic conditional capture
     *         applied at device power on
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_captureTypeAtStartup(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('captureTypeAtStartup', rest_val);
    }
    /**
     * Changes current threshold value for automatic conditional
     * capture applied at device power on.
     *
     * If you want the change to be kept after a device reboot,
     * make sure  to call the matching module saveToFlash().
     *
     * @param newval : a floating point number corresponding to current threshold value for automatic conditional
     *         capture applied at device power on
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_condValueAtStartup(newval) {
        let rest_val;
        rest_val = String(Math.round(newval * 65536.0));
        return await this._setAttr('condValueAtStartup', rest_val);
    }
    /**
     * Returns the threshold value for automatic conditional
     * capture applied at device power on.
     *
     * @return a floating point number corresponding to the threshold value for automatic conditional
     *         capture applied at device power on
     *
     * On failure, throws an exception or returns YInputCapture.CONDVALUEATSTARTUP_INVALID.
     */
    async get_condValueAtStartup() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YInputCapture.CONDVALUEATSTARTUP_INVALID;
            }
        }
        res = this._condValueAtStartup;
        return res;
    }
    /**
     * Retrieves an instant snapshot trigger for a given identifier.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the instant snapshot trigger is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YInputCapture.isOnline() to test if the instant snapshot trigger is
     * indeed online at a given time. In case of ambiguity when looking for
     * an instant snapshot trigger by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the instant snapshot trigger, for instance
     *         MyDevice.inputCapture.
     *
     * @return a YInputCapture object allowing you to drive the instant snapshot trigger.
     */
    static FindInputCapture(func) {
        let obj;
        obj = yocto_api_js_1.YFunction._FindFromCache('InputCapture', func);
        if (obj == null) {
            obj = new YInputCapture(yocto_api_js_1.YAPI, func);
            yocto_api_js_1.YFunction._AddToCache('InputCapture', func, obj);
        }
        return obj;
    }
    /**
     * Retrieves an instant snapshot trigger for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the instant snapshot trigger is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YInputCapture.isOnline() to test if the instant snapshot trigger is
     * indeed online at a given time. In case of ambiguity when looking for
     * an instant snapshot trigger by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx : a YAPI context
     * @param func : a string that uniquely characterizes the instant snapshot trigger, for instance
     *         MyDevice.inputCapture.
     *
     * @return a YInputCapture object allowing you to drive the instant snapshot trigger.
     */
    static FindInputCaptureInContext(yctx, func) {
        let obj;
        obj = yocto_api_js_1.YFunction._FindFromCacheInContext(yctx, 'InputCapture', func);
        if (obj == null) {
            obj = new YInputCapture(yctx, func);
            yocto_api_js_1.YFunction._AddToCache('InputCapture', func, obj);
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
        this._valueCallbackInputCapture = callback;
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
        if (this._valueCallbackInputCapture != null) {
            try {
                await this._valueCallbackInputCapture(this, value);
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
     * Returns all details about the last automatic input capture.
     *
     * @return an YInputCaptureData object including
     *         data series and all related meta-information.
     *         On failure, throws an exception or returns an capture object.
     */
    async get_lastCapture() {
        let snapData;
        snapData = await this._download('snap.bin');
        return new YInputCaptureData(this, snapData);
    }
    /**
     * Returns a new immediate capture of the device inputs.
     *
     * @param msDuration : duration of the capture window,
     *         in milliseconds (eg. between 20 and 1000).
     *
     * @return an YInputCaptureData object including
     *         data series for the specified duration.
     *         On failure, throws an exception or returns an capture object.
     */
    async get_immediateCapture(msDuration) {
        let snapUrl;
        let snapData;
        let snapStart;
        if (msDuration < 1) {
            msDuration = 20;
        }
        if (msDuration > 1000) {
            msDuration = 1000;
        }
        snapStart = (((-msDuration) / (2)) >> 0);
        snapUrl = 'snap.bin?t=' + String(Math.round(snapStart)) + '&d=' + String(Math.round(msDuration));
        snapData = await this._download(snapUrl);
        return new YInputCaptureData(this, snapData);
    }
    /**
     * Continues the enumeration of instant snapshot triggers started using yFirstInputCapture().
     * Caution: You can't make any assumption about the returned instant snapshot triggers order.
     * If you want to find a specific an instant snapshot trigger, use InputCapture.findInputCapture()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YInputCapture object, corresponding to
     *         an instant snapshot trigger currently online, or a null pointer
     *         if there are no more instant snapshot triggers to enumerate.
     */
    nextInputCapture() {
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != yocto_api_js_1.YAPI.SUCCESS)
            return null;
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if (next_hwid == null)
            return null;
        return YInputCapture.FindInputCaptureInContext(this._yapi, next_hwid);
    }
    /**
     * Starts the enumeration of instant snapshot triggers currently accessible.
     * Use the method YInputCapture.nextInputCapture() to iterate on
     * next instant snapshot triggers.
     *
     * @return a pointer to a YInputCapture object, corresponding to
     *         the first instant snapshot trigger currently online, or a null pointer
     *         if there are none.
     */
    static FirstInputCapture() {
        let next_hwid = yocto_api_js_1.YAPI.imm_getFirstHardwareId('InputCapture');
        if (next_hwid == null)
            return null;
        return YInputCapture.FindInputCapture(next_hwid);
    }
    /**
     * Starts the enumeration of instant snapshot triggers currently accessible.
     * Use the method YInputCapture.nextInputCapture() to iterate on
     * next instant snapshot triggers.
     *
     * @param yctx : a YAPI context.
     *
     * @return a pointer to a YInputCapture object, corresponding to
     *         the first instant snapshot trigger currently online, or a null pointer
     *         if there are none.
     */
    static FirstInputCaptureInContext(yctx) {
        let next_hwid = yctx.imm_getFirstHardwareId('InputCapture');
        if (next_hwid == null)
            return null;
        return YInputCapture.FindInputCaptureInContext(yctx, next_hwid);
    }
}
exports.YInputCapture = YInputCapture;
// API symbols as static members
YInputCapture.LASTCAPTURETIME_INVALID = yocto_api_js_1.YAPI.INVALID_LONG;
YInputCapture.NSAMPLES_INVALID = yocto_api_js_1.YAPI.INVALID_UINT;
YInputCapture.SAMPLINGRATE_INVALID = yocto_api_js_1.YAPI.INVALID_UINT;
YInputCapture.CAPTURETYPE_NONE = 0;
YInputCapture.CAPTURETYPE_TIMED = 1;
YInputCapture.CAPTURETYPE_V_MAX = 2;
YInputCapture.CAPTURETYPE_V_MIN = 3;
YInputCapture.CAPTURETYPE_I_MAX = 4;
YInputCapture.CAPTURETYPE_I_MIN = 5;
YInputCapture.CAPTURETYPE_P_MAX = 6;
YInputCapture.CAPTURETYPE_P_MIN = 7;
YInputCapture.CAPTURETYPE_V_AVG_MAX = 8;
YInputCapture.CAPTURETYPE_V_AVG_MIN = 9;
YInputCapture.CAPTURETYPE_V_RMS_MAX = 10;
YInputCapture.CAPTURETYPE_V_RMS_MIN = 11;
YInputCapture.CAPTURETYPE_I_AVG_MAX = 12;
YInputCapture.CAPTURETYPE_I_AVG_MIN = 13;
YInputCapture.CAPTURETYPE_I_RMS_MAX = 14;
YInputCapture.CAPTURETYPE_I_RMS_MIN = 15;
YInputCapture.CAPTURETYPE_P_AVG_MAX = 16;
YInputCapture.CAPTURETYPE_P_AVG_MIN = 17;
YInputCapture.CAPTURETYPE_PF_MIN = 18;
YInputCapture.CAPTURETYPE_DPF_MIN = 19;
YInputCapture.CAPTURETYPE_INVALID = -1;
YInputCapture.CONDVALUE_INVALID = yocto_api_js_1.YAPI.INVALID_DOUBLE;
YInputCapture.CONDALIGN_INVALID = yocto_api_js_1.YAPI.INVALID_UINT;
YInputCapture.CAPTURETYPEATSTARTUP_NONE = 0;
YInputCapture.CAPTURETYPEATSTARTUP_TIMED = 1;
YInputCapture.CAPTURETYPEATSTARTUP_V_MAX = 2;
YInputCapture.CAPTURETYPEATSTARTUP_V_MIN = 3;
YInputCapture.CAPTURETYPEATSTARTUP_I_MAX = 4;
YInputCapture.CAPTURETYPEATSTARTUP_I_MIN = 5;
YInputCapture.CAPTURETYPEATSTARTUP_P_MAX = 6;
YInputCapture.CAPTURETYPEATSTARTUP_P_MIN = 7;
YInputCapture.CAPTURETYPEATSTARTUP_V_AVG_MAX = 8;
YInputCapture.CAPTURETYPEATSTARTUP_V_AVG_MIN = 9;
YInputCapture.CAPTURETYPEATSTARTUP_V_RMS_MAX = 10;
YInputCapture.CAPTURETYPEATSTARTUP_V_RMS_MIN = 11;
YInputCapture.CAPTURETYPEATSTARTUP_I_AVG_MAX = 12;
YInputCapture.CAPTURETYPEATSTARTUP_I_AVG_MIN = 13;
YInputCapture.CAPTURETYPEATSTARTUP_I_RMS_MAX = 14;
YInputCapture.CAPTURETYPEATSTARTUP_I_RMS_MIN = 15;
YInputCapture.CAPTURETYPEATSTARTUP_P_AVG_MAX = 16;
YInputCapture.CAPTURETYPEATSTARTUP_P_AVG_MIN = 17;
YInputCapture.CAPTURETYPEATSTARTUP_PF_MIN = 18;
YInputCapture.CAPTURETYPEATSTARTUP_DPF_MIN = 19;
YInputCapture.CAPTURETYPEATSTARTUP_INVALID = -1;
YInputCapture.CONDVALUEATSTARTUP_INVALID = yocto_api_js_1.YAPI.INVALID_DOUBLE;
//# sourceMappingURL=yocto_inputcapture.js.map