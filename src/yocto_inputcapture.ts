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

import { YAPI, YAPIContext, YErrorMsg, YFunction, YModule, YSensor, YDataLogger, YMeasure } from './yocto_api.js';

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

export class YInputCaptureData
{
    _yapi: YAPIContext;
    //--- (generated code: YInputCaptureData attributes declaration)
    _fmt: number = 0;
    _var1size: number = 0;
    _var2size: number = 0;
    _var3size: number = 0;
    _nVars: number = 0;
    _recOfs: number = 0;
    _nRecs: number = 0;
    _samplesPerSec: number = 0;
    _trigType: number = 0;
    _trigVal: number = 0;
    _trigPos: number = 0;
    _trigUTC: number = 0;
    _var1unit: string = '';
    _var2unit: string = '';
    _var3unit: string = '';
    _var1samples: number[] = [];
    _var2samples: number[] = [];
    _var3samples: number[] = [];

    // API symbols as static members
    //--- (end of generated code: YInputCaptureData attributes declaration)

    constructor(yfunc: YFunction, sdata: Uint8Array)
    {
        this._yapi = yfunc._yapi;
        //--- (generated code: YInputCaptureData constructor)
        //--- (end of generated code: YInputCaptureData constructor)
        this.imm_decodeSnapBin(sdata);
    }

    _throw(int_errType: number, str_errMsg: string, obj_retVal?: any): any
    {
        return this._yapi._throw(int_errType, str_errMsg, obj_retVal);
    }

    //--- (generated code: YInputCaptureData implementation)

    imm_decodeU16(sdata: Uint8Array, ofs: number): number
    {
        let v: number;
        v = sdata[ofs];
        v = v + 256 * sdata[ofs+1];
        return v;
    }

    imm_decodeU32(sdata: Uint8Array, ofs: number): number
    {
        let v: number;
        v = this.imm_decodeU16(sdata, ofs);
        v = v + 65536.0 * this.imm_decodeU16(sdata, ofs+2);
        return v;
    }

    imm_decodeVal(sdata: Uint8Array, ofs: number, len: number): number
    {
        let v: number;
        let b: number;
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
        if (v > (b/2)) {
            // negative number
            v = v - b;
        }
        return v;
    }

    imm_decodeSnapBin(sdata: Uint8Array): number
    {
        let buffSize: number;
        let recOfs: number;
        let ms: number;
        let recSize: number;
        let count: number;
        let v: number;

        buffSize = (sdata).length;
        if (!(buffSize >= 24)) {
            return this._throw(this._yapi.INVALID_ARGUMENT, 'Invalid snapshot data (too short)', this._yapi.INVALID_ARGUMENT);
        }
        this._fmt = sdata[0];
        this._var1size = sdata[1] - 48;
        this._var2size = sdata[2] - 48;
        this._var3size = sdata[3] - 48;
        if (!(this._fmt == 83)) {
            return this._throw(this._yapi.INVALID_ARGUMENT, 'Unsupported snapshot format', this._yapi.INVALID_ARGUMENT);
        }
        if (!((this._var1size >= 2) && (this._var1size <= 4))) {
            return this._throw(this._yapi.INVALID_ARGUMENT, 'Invalid sample size', this._yapi.INVALID_ARGUMENT);
        }
        if (!((this._var2size >= 0) && (this._var1size <= 4))) {
            return this._throw(this._yapi.INVALID_ARGUMENT, 'Invalid sample size', this._yapi.INVALID_ARGUMENT);
        }
        if (!((this._var3size >= 0) && (this._var1size <= 4))) {
            return this._throw(this._yapi.INVALID_ARGUMENT, 'Invalid sample size', this._yapi.INVALID_ARGUMENT);
        }
        if (this._var2size == 0) {
            this._nVars = 1;
        } else {
            if (this._var3size == 0) {
                this._nVars = 2;
            } else {
                this._nVars = 3;
            }
        }
        recSize = this._var1size + this._var2size + this._var3size;
        this._recOfs = this.imm_decodeU16(sdata, 4);
        this._nRecs = this.imm_decodeU16(sdata, 6);
        this._samplesPerSec = this.imm_decodeU16(sdata, 8);
        this._trigType = this.imm_decodeU16(sdata, 10);
        this._trigVal = this.imm_decodeVal(sdata,  12, 4) / 1000;
        this._trigPos = this.imm_decodeU16(sdata, 16);
        ms = this.imm_decodeU16(sdata, 18);
        this._trigUTC = this.imm_decodeVal(sdata,  20, 4);
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
        recOfs = this._recOfs;
        count = this._nRecs;
        while ((count > 0) && (recOfs + this._var1size <= buffSize)) {
            v = this.imm_decodeVal(sdata,  recOfs, this._var1size) / 1000.0;
            this._var1samples.push(v);
            recOfs = recOfs + recSize;
        }
        if (this._var2size > 0) {
            recOfs = this._recOfs + this._var1size;
            count = this._nRecs;
            while ((count > 0) && (recOfs + this._var2size <= buffSize)) {
                v = this.imm_decodeVal(sdata,  recOfs, this._var2size) / 1000.0;
                this._var2samples.push(v);
                recOfs = recOfs + recSize;
            }
        }
        if (this._var3size > 0) {
            recOfs = this._recOfs + this._var1size + this._var2size;
            count = this._nRecs;
            while ((count > 0) && (recOfs + this._var3size <= buffSize)) {
                v = this.imm_decodeVal(sdata,  recOfs, this._var3size) / 1000.0;
                this._var3samples.push(v);
                recOfs = recOfs + recSize;
            }
        }
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the number of series available in the capture.
     *
     * @return an integer corresponding to the number of
     *         simultaneous data series available.
     */
    get_serieCount(): number
    {
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
    get_recordCount(): number
    {
        return this._nRecs;
    }

    /**
     * Returns the effective sampling rate of the device.
     *
     * @return an integer corresponding to the number of
     *         samples taken each second.
     */
    get_samplingRate(): number
    {
        return this._samplesPerSec;
    }

    /**
     * Returns the type of automatic conditional capture
     * that triggered the capture of this data sequence.
     *
     * @return the type of conditional capture.
     */
    get_captureType(): YInputCaptureData.CAPTURETYPE
    {
        return <number> this._trigType;
    }

    /**
     * Returns the threshold value that triggered
     * this automatic conditional capture, if it was
     * not an instant captured triggered manually.
     *
     * @return the conditional threshold value
     *         at the time of capture.
     */
    get_triggerValue(): number
    {
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
    get_triggerPosition(): number
    {
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
    get_triggerRealTimeUTC(): number
    {
        return this._trigUTC;
    }

    /**
     * Returns the unit of measurement for data points in
     * the first serie.
     *
     * @return a string containing to a physical unit of
     *         measurement.
     */
    get_serie1Unit(): string
    {
        return this._var1unit;
    }

    /**
     * Returns the unit of measurement for data points in
     * the second serie.
     *
     * @return a string containing to a physical unit of
     *         measurement.
     */
    get_serie2Unit(): string
    {
        if (!(this._nVars >= 2)) {
            return this._throw(this._yapi.INVALID_ARGUMENT, 'There is no serie 2 in this capture data', '');
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
    get_serie3Unit(): string
    {
        if (!(this._nVars >= 3)) {
            return this._throw(this._yapi.INVALID_ARGUMENT, 'There is no serie 3 in this capture data', '');
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
    get_serie1Values(): number[]
    {
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
    get_serie2Values(): number[]
    {
        if (!(this._nVars >= 2)) {
            return this._throw(this._yapi.INVALID_ARGUMENT, 'There is no serie 2 in this capture data', this._var2samples);
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
    get_serie3Values(): number[]
    {
        if (!(this._nVars >= 3)) {
            return this._throw(this._yapi.INVALID_ARGUMENT, 'There is no serie 3 in this capture data', this._var3samples);
        }
        return this._var3samples;
    }

    //--- (end of generated code: YInputCaptureData implementation)
}

export namespace YInputCaptureData {
    //--- (generated code: YInputCapture definitions)
    export const enum CAPTURETYPE
    {
        NONE = 0,
        TIMED = 1,
        V_MAX = 2,
        V_MIN = 3,
        I_MAX = 4,
        I_MIN = 5,
        P_MAX = 6,
        P_MIN = 7,
        V_AVG_MAX = 8,
        V_AVG_MIN = 9,
        V_RMS_MAX = 10,
        V_RMS_MIN = 11,
        I_AVG_MAX = 12,
        I_AVG_MIN = 13,
        I_RMS_MAX = 14,
        I_RMS_MIN = 15,
        P_AVG_MAX = 16,
        P_AVG_MIN = 17,
        PF_MIN = 18,
        DPF_MIN = 19,
        INVALID = -1
    }

    export const enum CAPTURETYPEATSTARTUP
    {
        NONE = 0,
        TIMED = 1,
        V_MAX = 2,
        V_MIN = 3,
        I_MAX = 4,
        I_MIN = 5,
        P_MAX = 6,
        P_MIN = 7,
        V_AVG_MAX = 8,
        V_AVG_MIN = 9,
        V_RMS_MAX = 10,
        V_RMS_MIN = 11,
        I_AVG_MAX = 12,
        I_AVG_MIN = 13,
        I_RMS_MAX = 14,
        I_RMS_MIN = 15,
        P_AVG_MAX = 16,
        P_AVG_MIN = 17,
        PF_MIN = 18,
        DPF_MIN = 19,
        INVALID = -1
    }

    export interface ValueCallback {(func: YInputCapture, value: string): void}

    //--- (end of generated code: YInputCapture definitions)
}

//--- (generated code: YInputCapture class start)
/**
 * YInputCapture Class: instant snapshot trigger control interface
 *
 * The YInputCapture class allows you to access data samples
 * measured by a Yoctopuce electrical sensor. The data capture can be
 * triggered manually, or be configured to detect specific events.
 */
//--- (end of generated code: YInputCapture class start)

export class YInputCapture extends YSensor
{
    //--- (generated code: YInputCapture attributes declaration)
    _className: string;
    _lastCaptureTime: number = YInputCapture.LASTCAPTURETIME_INVALID;
    _nSamples: number = YInputCapture.NSAMPLES_INVALID;
    _samplingRate: number = YInputCapture.SAMPLINGRATE_INVALID;
    _captureType: YInputCapture.CAPTURETYPE = YInputCapture.CAPTURETYPE_INVALID;
    _condValue: number = YInputCapture.CONDVALUE_INVALID;
    _condAlign: number = YInputCapture.CONDALIGN_INVALID;
    _captureTypeAtStartup: YInputCapture.CAPTURETYPEATSTARTUP = YInputCapture.CAPTURETYPEATSTARTUP_INVALID;
    _condValueAtStartup: number = YInputCapture.CONDVALUEATSTARTUP_INVALID;
    _valueCallbackInputCapture: YInputCapture.ValueCallback | null = null;

    // API symbols as object properties
    public readonly LASTCAPTURETIME_INVALID: number = YAPI.INVALID_LONG;
    public readonly NSAMPLES_INVALID: number = YAPI.INVALID_UINT;
    public readonly SAMPLINGRATE_INVALID: number = YAPI.INVALID_UINT;
    public readonly CAPTURETYPE_NONE: YInputCapture.CAPTURETYPE = 0;
    public readonly CAPTURETYPE_TIMED: YInputCapture.CAPTURETYPE = 1;
    public readonly CAPTURETYPE_V_MAX: YInputCapture.CAPTURETYPE = 2;
    public readonly CAPTURETYPE_V_MIN: YInputCapture.CAPTURETYPE = 3;
    public readonly CAPTURETYPE_I_MAX: YInputCapture.CAPTURETYPE = 4;
    public readonly CAPTURETYPE_I_MIN: YInputCapture.CAPTURETYPE = 5;
    public readonly CAPTURETYPE_P_MAX: YInputCapture.CAPTURETYPE = 6;
    public readonly CAPTURETYPE_P_MIN: YInputCapture.CAPTURETYPE = 7;
    public readonly CAPTURETYPE_V_AVG_MAX: YInputCapture.CAPTURETYPE = 8;
    public readonly CAPTURETYPE_V_AVG_MIN: YInputCapture.CAPTURETYPE = 9;
    public readonly CAPTURETYPE_V_RMS_MAX: YInputCapture.CAPTURETYPE = 10;
    public readonly CAPTURETYPE_V_RMS_MIN: YInputCapture.CAPTURETYPE = 11;
    public readonly CAPTURETYPE_I_AVG_MAX: YInputCapture.CAPTURETYPE = 12;
    public readonly CAPTURETYPE_I_AVG_MIN: YInputCapture.CAPTURETYPE = 13;
    public readonly CAPTURETYPE_I_RMS_MAX: YInputCapture.CAPTURETYPE = 14;
    public readonly CAPTURETYPE_I_RMS_MIN: YInputCapture.CAPTURETYPE = 15;
    public readonly CAPTURETYPE_P_AVG_MAX: YInputCapture.CAPTURETYPE = 16;
    public readonly CAPTURETYPE_P_AVG_MIN: YInputCapture.CAPTURETYPE = 17;
    public readonly CAPTURETYPE_PF_MIN: YInputCapture.CAPTURETYPE = 18;
    public readonly CAPTURETYPE_DPF_MIN: YInputCapture.CAPTURETYPE = 19;
    public readonly CAPTURETYPE_INVALID: YInputCapture.CAPTURETYPE = -1;
    public readonly CONDVALUE_INVALID: number = YAPI.INVALID_DOUBLE;
    public readonly CONDALIGN_INVALID: number = YAPI.INVALID_UINT;
    public readonly CAPTURETYPEATSTARTUP_NONE: YInputCapture.CAPTURETYPEATSTARTUP = 0;
    public readonly CAPTURETYPEATSTARTUP_TIMED: YInputCapture.CAPTURETYPEATSTARTUP = 1;
    public readonly CAPTURETYPEATSTARTUP_V_MAX: YInputCapture.CAPTURETYPEATSTARTUP = 2;
    public readonly CAPTURETYPEATSTARTUP_V_MIN: YInputCapture.CAPTURETYPEATSTARTUP = 3;
    public readonly CAPTURETYPEATSTARTUP_I_MAX: YInputCapture.CAPTURETYPEATSTARTUP = 4;
    public readonly CAPTURETYPEATSTARTUP_I_MIN: YInputCapture.CAPTURETYPEATSTARTUP = 5;
    public readonly CAPTURETYPEATSTARTUP_P_MAX: YInputCapture.CAPTURETYPEATSTARTUP = 6;
    public readonly CAPTURETYPEATSTARTUP_P_MIN: YInputCapture.CAPTURETYPEATSTARTUP = 7;
    public readonly CAPTURETYPEATSTARTUP_V_AVG_MAX: YInputCapture.CAPTURETYPEATSTARTUP = 8;
    public readonly CAPTURETYPEATSTARTUP_V_AVG_MIN: YInputCapture.CAPTURETYPEATSTARTUP = 9;
    public readonly CAPTURETYPEATSTARTUP_V_RMS_MAX: YInputCapture.CAPTURETYPEATSTARTUP = 10;
    public readonly CAPTURETYPEATSTARTUP_V_RMS_MIN: YInputCapture.CAPTURETYPEATSTARTUP = 11;
    public readonly CAPTURETYPEATSTARTUP_I_AVG_MAX: YInputCapture.CAPTURETYPEATSTARTUP = 12;
    public readonly CAPTURETYPEATSTARTUP_I_AVG_MIN: YInputCapture.CAPTURETYPEATSTARTUP = 13;
    public readonly CAPTURETYPEATSTARTUP_I_RMS_MAX: YInputCapture.CAPTURETYPEATSTARTUP = 14;
    public readonly CAPTURETYPEATSTARTUP_I_RMS_MIN: YInputCapture.CAPTURETYPEATSTARTUP = 15;
    public readonly CAPTURETYPEATSTARTUP_P_AVG_MAX: YInputCapture.CAPTURETYPEATSTARTUP = 16;
    public readonly CAPTURETYPEATSTARTUP_P_AVG_MIN: YInputCapture.CAPTURETYPEATSTARTUP = 17;
    public readonly CAPTURETYPEATSTARTUP_PF_MIN: YInputCapture.CAPTURETYPEATSTARTUP = 18;
    public readonly CAPTURETYPEATSTARTUP_DPF_MIN: YInputCapture.CAPTURETYPEATSTARTUP = 19;
    public readonly CAPTURETYPEATSTARTUP_INVALID: YInputCapture.CAPTURETYPEATSTARTUP = -1;
    public readonly CONDVALUEATSTARTUP_INVALID: number = YAPI.INVALID_DOUBLE;

    // API symbols as static members
    public static readonly LASTCAPTURETIME_INVALID: number = YAPI.INVALID_LONG;
    public static readonly NSAMPLES_INVALID: number = YAPI.INVALID_UINT;
    public static readonly SAMPLINGRATE_INVALID: number = YAPI.INVALID_UINT;
    public static readonly CAPTURETYPE_NONE: YInputCapture.CAPTURETYPE = 0;
    public static readonly CAPTURETYPE_TIMED: YInputCapture.CAPTURETYPE = 1;
    public static readonly CAPTURETYPE_V_MAX: YInputCapture.CAPTURETYPE = 2;
    public static readonly CAPTURETYPE_V_MIN: YInputCapture.CAPTURETYPE = 3;
    public static readonly CAPTURETYPE_I_MAX: YInputCapture.CAPTURETYPE = 4;
    public static readonly CAPTURETYPE_I_MIN: YInputCapture.CAPTURETYPE = 5;
    public static readonly CAPTURETYPE_P_MAX: YInputCapture.CAPTURETYPE = 6;
    public static readonly CAPTURETYPE_P_MIN: YInputCapture.CAPTURETYPE = 7;
    public static readonly CAPTURETYPE_V_AVG_MAX: YInputCapture.CAPTURETYPE = 8;
    public static readonly CAPTURETYPE_V_AVG_MIN: YInputCapture.CAPTURETYPE = 9;
    public static readonly CAPTURETYPE_V_RMS_MAX: YInputCapture.CAPTURETYPE = 10;
    public static readonly CAPTURETYPE_V_RMS_MIN: YInputCapture.CAPTURETYPE = 11;
    public static readonly CAPTURETYPE_I_AVG_MAX: YInputCapture.CAPTURETYPE = 12;
    public static readonly CAPTURETYPE_I_AVG_MIN: YInputCapture.CAPTURETYPE = 13;
    public static readonly CAPTURETYPE_I_RMS_MAX: YInputCapture.CAPTURETYPE = 14;
    public static readonly CAPTURETYPE_I_RMS_MIN: YInputCapture.CAPTURETYPE = 15;
    public static readonly CAPTURETYPE_P_AVG_MAX: YInputCapture.CAPTURETYPE = 16;
    public static readonly CAPTURETYPE_P_AVG_MIN: YInputCapture.CAPTURETYPE = 17;
    public static readonly CAPTURETYPE_PF_MIN: YInputCapture.CAPTURETYPE = 18;
    public static readonly CAPTURETYPE_DPF_MIN: YInputCapture.CAPTURETYPE = 19;
    public static readonly CAPTURETYPE_INVALID: YInputCapture.CAPTURETYPE = -1;
    public static readonly CONDVALUE_INVALID: number = YAPI.INVALID_DOUBLE;
    public static readonly CONDALIGN_INVALID: number = YAPI.INVALID_UINT;
    public static readonly CAPTURETYPEATSTARTUP_NONE: YInputCapture.CAPTURETYPEATSTARTUP = 0;
    public static readonly CAPTURETYPEATSTARTUP_TIMED: YInputCapture.CAPTURETYPEATSTARTUP = 1;
    public static readonly CAPTURETYPEATSTARTUP_V_MAX: YInputCapture.CAPTURETYPEATSTARTUP = 2;
    public static readonly CAPTURETYPEATSTARTUP_V_MIN: YInputCapture.CAPTURETYPEATSTARTUP = 3;
    public static readonly CAPTURETYPEATSTARTUP_I_MAX: YInputCapture.CAPTURETYPEATSTARTUP = 4;
    public static readonly CAPTURETYPEATSTARTUP_I_MIN: YInputCapture.CAPTURETYPEATSTARTUP = 5;
    public static readonly CAPTURETYPEATSTARTUP_P_MAX: YInputCapture.CAPTURETYPEATSTARTUP = 6;
    public static readonly CAPTURETYPEATSTARTUP_P_MIN: YInputCapture.CAPTURETYPEATSTARTUP = 7;
    public static readonly CAPTURETYPEATSTARTUP_V_AVG_MAX: YInputCapture.CAPTURETYPEATSTARTUP = 8;
    public static readonly CAPTURETYPEATSTARTUP_V_AVG_MIN: YInputCapture.CAPTURETYPEATSTARTUP = 9;
    public static readonly CAPTURETYPEATSTARTUP_V_RMS_MAX: YInputCapture.CAPTURETYPEATSTARTUP = 10;
    public static readonly CAPTURETYPEATSTARTUP_V_RMS_MIN: YInputCapture.CAPTURETYPEATSTARTUP = 11;
    public static readonly CAPTURETYPEATSTARTUP_I_AVG_MAX: YInputCapture.CAPTURETYPEATSTARTUP = 12;
    public static readonly CAPTURETYPEATSTARTUP_I_AVG_MIN: YInputCapture.CAPTURETYPEATSTARTUP = 13;
    public static readonly CAPTURETYPEATSTARTUP_I_RMS_MAX: YInputCapture.CAPTURETYPEATSTARTUP = 14;
    public static readonly CAPTURETYPEATSTARTUP_I_RMS_MIN: YInputCapture.CAPTURETYPEATSTARTUP = 15;
    public static readonly CAPTURETYPEATSTARTUP_P_AVG_MAX: YInputCapture.CAPTURETYPEATSTARTUP = 16;
    public static readonly CAPTURETYPEATSTARTUP_P_AVG_MIN: YInputCapture.CAPTURETYPEATSTARTUP = 17;
    public static readonly CAPTURETYPEATSTARTUP_PF_MIN: YInputCapture.CAPTURETYPEATSTARTUP = 18;
    public static readonly CAPTURETYPEATSTARTUP_DPF_MIN: YInputCapture.CAPTURETYPEATSTARTUP = 19;
    public static readonly CAPTURETYPEATSTARTUP_INVALID: YInputCapture.CAPTURETYPEATSTARTUP = -1;
    public static readonly CONDVALUEATSTARTUP_INVALID: number = YAPI.INVALID_DOUBLE;
    //--- (end of generated code: YInputCapture attributes declaration)

    constructor(yapi: YAPIContext, func: string)
    {
        //--- (generated code: YInputCapture constructor)
        super(yapi, func);
        this._className                  = 'InputCapture';
        //--- (end of generated code: YInputCapture constructor)
    }

    //--- (generated code: YInputCapture implementation)

    imm_parseAttr(name: string, val: any)
    {
        switch (name) {
        case 'lastCaptureTime':
            this._lastCaptureTime = <number> <number> val;
            return 1;
        case 'nSamples':
            this._nSamples = <number> <number> val;
            return 1;
        case 'samplingRate':
            this._samplingRate = <number> <number> val;
            return 1;
        case 'captureType':
            this._captureType = <YInputCapture.CAPTURETYPE> <number> val;
            return 1;
        case 'condValue':
            this._condValue = <number> Math.round(<number>val / 65.536) / 1000.0;
            return 1;
        case 'condAlign':
            this._condAlign = <number> <number> val;
            return 1;
        case 'captureTypeAtStartup':
            this._captureTypeAtStartup = <YInputCapture.CAPTURETYPEATSTARTUP> <number> val;
            return 1;
        case 'condValueAtStartup':
            this._condValueAtStartup = <number> Math.round(<number>val / 65.536) / 1000.0;
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
    async get_lastCaptureTime(): Promise<number>
    {
        let res: number;
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
    async get_nSamples(): Promise<number>
    {
        let res: number;
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
    async set_nSamples(newval: number): Promise<number>
    {
        let rest_val: string;
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
    async get_samplingRate(): Promise<number>
    {
        let res: number;
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
    async get_captureType(): Promise<YInputCapture.CAPTURETYPE>
    {
        let res: number;
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
    async set_captureType(newval: YInputCapture.CAPTURETYPE): Promise<number>
    {
        let rest_val: string;
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
    async set_condValue(newval: number): Promise<number>
    {
        let rest_val: string;
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
    async get_condValue(): Promise<number>
    {
        let res: number;
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
    async get_condAlign(): Promise<number>
    {
        let res: number;
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
    async set_condAlign(newval: number): Promise<number>
    {
        let rest_val: string;
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
    async get_captureTypeAtStartup(): Promise<YInputCapture.CAPTURETYPEATSTARTUP>
    {
        let res: number;
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
    async set_captureTypeAtStartup(newval: YInputCapture.CAPTURETYPEATSTARTUP): Promise<number>
    {
        let rest_val: string;
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
    async set_condValueAtStartup(newval: number): Promise<number>
    {
        let rest_val: string;
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
    async get_condValueAtStartup(): Promise<number>
    {
        let res: number;
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
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
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
    static FindInputCapture(func: string): YInputCapture
    {
        let obj: YInputCapture | null;
        obj = <YInputCapture> YFunction._FindFromCache('InputCapture', func);
        if (obj == null) {
            obj = new YInputCapture(YAPI, func);
            YFunction._AddToCache('InputCapture',  func, obj);
        }
        return obj;
    }

    /**
     * Retrieves an instant snapshot trigger for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
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
    static FindInputCaptureInContext(yctx: YAPIContext, func: string): YInputCapture
    {
        let obj: YInputCapture | null;
        obj = <YInputCapture> YFunction._FindFromCacheInContext(yctx,  'InputCapture', func);
        if (obj == null) {
            obj = new YInputCapture(yctx, func);
            YFunction._AddToCache('InputCapture',  func, obj);
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
    async registerValueCallback(callback: YInputCapture.ValueCallback | null): Promise<number>
    {
        let val: string;
        if (callback != null) {
            await YFunction._UpdateValueCallbackList(this, true);
        } else {
            await YFunction._UpdateValueCallbackList(this, false);
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

    async _invokeValueCallback(value: string): Promise<number>
    {
        if (this._valueCallbackInputCapture != null) {
            try {
                await this._valueCallbackInputCapture(this, value);
            } catch (e) {
                this._yapi.imm_log('Exception in valueCallback:', e);
            }
        } else {
            super._invokeValueCallback(value);
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
    async get_lastCapture(): Promise<YInputCaptureData>
    {
        let snapData: Uint8Array;

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
    async get_immediateCapture(msDuration: number): Promise<YInputCaptureData>
    {
        let snapUrl: string;
        let snapData: Uint8Array;
        let snapStart: number;
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
     * Returns the next InputCapture
     *
     * @returns {YInputCapture}
     */
    nextInputCapture(): YInputCapture | null
    {
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != YAPI.SUCCESS) return null;
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, <string> resolve.result);
        if (next_hwid == null) return null;
        return YInputCapture.FindInputCaptureInContext(this._yapi, next_hwid);
    }

    /**
     * Retrieves the first InputCapture in a YAPI context
     *
     * @returns {YInputCapture}
     */
    static FirstInputCapture(): YInputCapture | null
    {
        let next_hwid = YAPI.imm_getFirstHardwareId('InputCapture');
        if (next_hwid == null) return null;
        return YInputCapture.FindInputCapture(next_hwid);
    }

    /**
     * Retrieves the first InputCapture in a given context
     *
     * @param yctx {YAPIContext}
     *
     * @returns {YInputCapture}
     */
    static FirstInputCaptureInContext(yctx: YAPIContext): YInputCapture | null
    {
        let next_hwid = yctx.imm_getFirstHardwareId('InputCapture');
        if (next_hwid == null) return null;
        return YInputCapture.FindInputCaptureInContext(yctx, next_hwid);
    }

    //--- (end of generated code: YInputCapture implementation)
}

export namespace YInputCapture {
    //--- (generated code: YInputCapture definitions)
    export const enum CAPTURETYPE
    {
        NONE = 0,
        TIMED = 1,
        V_MAX = 2,
        V_MIN = 3,
        I_MAX = 4,
        I_MIN = 5,
        P_MAX = 6,
        P_MIN = 7,
        V_AVG_MAX = 8,
        V_AVG_MIN = 9,
        V_RMS_MAX = 10,
        V_RMS_MIN = 11,
        I_AVG_MAX = 12,
        I_AVG_MIN = 13,
        I_RMS_MAX = 14,
        I_RMS_MIN = 15,
        P_AVG_MAX = 16,
        P_AVG_MIN = 17,
        PF_MIN = 18,
        DPF_MIN = 19,
        INVALID = -1
    }

    export const enum CAPTURETYPEATSTARTUP
    {
        NONE = 0,
        TIMED = 1,
        V_MAX = 2,
        V_MIN = 3,
        I_MAX = 4,
        I_MIN = 5,
        P_MAX = 6,
        P_MIN = 7,
        V_AVG_MAX = 8,
        V_AVG_MIN = 9,
        V_RMS_MAX = 10,
        V_RMS_MIN = 11,
        I_AVG_MAX = 12,
        I_AVG_MIN = 13,
        I_RMS_MAX = 14,
        I_RMS_MIN = 15,
        P_AVG_MAX = 16,
        P_AVG_MIN = 17,
        PF_MIN = 18,
        DPF_MIN = 19,
        INVALID = -1
    }

    export interface ValueCallback {(func: YInputCapture, value: string): void}

    //--- (end of generated code: YInputCapture definitions)
}

