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
import { YAPIContext, YFunction, YSensor } from './yocto_api.js';
/**
 * YInputCaptureData Class: Sampled data from a Yoctopuce electrical sensor
 *
 * InputCaptureData objects represent raw data
 * sampled by the analog/digital converter present in
 * a Yoctopuce electrical sensor. When several inputs
 * are samples simultaneously, their data are provided
 * as distinct series.
 */
export declare class YInputCaptureData {
    _yapi: YAPIContext;
    _fmt: number;
    _var1size: number;
    _var2size: number;
    _var3size: number;
    _nVars: number;
    _recOfs: number;
    _nRecs: number;
    _samplesPerSec: number;
    _trigType: number;
    _trigVal: number;
    _trigPos: number;
    _trigUTC: number;
    _var1unit: string;
    _var2unit: string;
    _var3unit: string;
    _var1samples: number[];
    _var2samples: number[];
    _var3samples: number[];
    constructor(yfunc: YFunction, sdata: Uint8Array);
    _throw(int_errType: number, str_errMsg: string, obj_retVal?: any): any;
    imm_decodeU16(sdata: Uint8Array, ofs: number): number;
    imm_decodeU32(sdata: Uint8Array, ofs: number): number;
    imm_decodeVal(sdata: Uint8Array, ofs: number, len: number): number;
    imm_decodeSnapBin(sdata: Uint8Array): number;
    /**
     * Returns the number of series available in the capture.
     *
     * @return an integer corresponding to the number of
     *         simultaneous data series available.
     */
    get_serieCount(): number;
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
    get_recordCount(): number;
    /**
     * Returns the effective sampling rate of the device.
     *
     * @return an integer corresponding to the number of
     *         samples taken each second.
     */
    get_samplingRate(): number;
    /**
     * Returns the type of automatic conditional capture
     * that triggered the capture of this data sequence.
     *
     * @return the type of conditional capture.
     */
    get_captureType(): YInputCaptureData.CAPTURETYPE;
    /**
     * Returns the threshold value that triggered
     * this automatic conditional capture, if it was
     * not an instant captured triggered manually.
     *
     * @return the conditional threshold value
     *         at the time of capture.
     */
    get_triggerValue(): number;
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
    get_triggerPosition(): number;
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
    get_triggerRealTimeUTC(): number;
    /**
     * Returns the unit of measurement for data points in
     * the first serie.
     *
     * @return a string containing to a physical unit of
     *         measurement.
     */
    get_serie1Unit(): string;
    /**
     * Returns the unit of measurement for data points in
     * the second serie.
     *
     * @return a string containing to a physical unit of
     *         measurement.
     */
    get_serie2Unit(): string;
    /**
     * Returns the unit of measurement for data points in
     * the third serie.
     *
     * @return a string containing to a physical unit of
     *         measurement.
     */
    get_serie3Unit(): string;
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
    get_serie1Values(): number[];
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
    get_serie2Values(): number[];
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
    get_serie3Values(): number[];
}
export declare namespace YInputCaptureData {
    const enum CAPTURETYPE {
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
    const enum CAPTURETYPEATSTARTUP {
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
    interface ValueCallback {
        (func: YInputCapture, value: string): void;
    }
}
/**
 * YInputCapture Class: instant snapshot trigger control interface
 *
 * The YInputCapture class allows you to access data samples
 * measured by a Yoctopuce electrical sensor. The data capture can be
 * triggered manually, or be configured to detect specific events.
 */
export declare class YInputCapture extends YSensor {
    _className: string;
    _lastCaptureTime: number;
    _nSamples: number;
    _samplingRate: number;
    _captureType: YInputCapture.CAPTURETYPE;
    _condValue: number;
    _condAlign: number;
    _captureTypeAtStartup: YInputCapture.CAPTURETYPEATSTARTUP;
    _condValueAtStartup: number;
    _valueCallbackInputCapture: YInputCapture.ValueCallback | null;
    readonly LASTCAPTURETIME_INVALID: number;
    readonly NSAMPLES_INVALID: number;
    readonly SAMPLINGRATE_INVALID: number;
    readonly CAPTURETYPE_NONE: YInputCapture.CAPTURETYPE;
    readonly CAPTURETYPE_TIMED: YInputCapture.CAPTURETYPE;
    readonly CAPTURETYPE_V_MAX: YInputCapture.CAPTURETYPE;
    readonly CAPTURETYPE_V_MIN: YInputCapture.CAPTURETYPE;
    readonly CAPTURETYPE_I_MAX: YInputCapture.CAPTURETYPE;
    readonly CAPTURETYPE_I_MIN: YInputCapture.CAPTURETYPE;
    readonly CAPTURETYPE_P_MAX: YInputCapture.CAPTURETYPE;
    readonly CAPTURETYPE_P_MIN: YInputCapture.CAPTURETYPE;
    readonly CAPTURETYPE_V_AVG_MAX: YInputCapture.CAPTURETYPE;
    readonly CAPTURETYPE_V_AVG_MIN: YInputCapture.CAPTURETYPE;
    readonly CAPTURETYPE_V_RMS_MAX: YInputCapture.CAPTURETYPE;
    readonly CAPTURETYPE_V_RMS_MIN: YInputCapture.CAPTURETYPE;
    readonly CAPTURETYPE_I_AVG_MAX: YInputCapture.CAPTURETYPE;
    readonly CAPTURETYPE_I_AVG_MIN: YInputCapture.CAPTURETYPE;
    readonly CAPTURETYPE_I_RMS_MAX: YInputCapture.CAPTURETYPE;
    readonly CAPTURETYPE_I_RMS_MIN: YInputCapture.CAPTURETYPE;
    readonly CAPTURETYPE_P_AVG_MAX: YInputCapture.CAPTURETYPE;
    readonly CAPTURETYPE_P_AVG_MIN: YInputCapture.CAPTURETYPE;
    readonly CAPTURETYPE_PF_MIN: YInputCapture.CAPTURETYPE;
    readonly CAPTURETYPE_DPF_MIN: YInputCapture.CAPTURETYPE;
    readonly CAPTURETYPE_INVALID: YInputCapture.CAPTURETYPE;
    readonly CONDVALUE_INVALID: number;
    readonly CONDALIGN_INVALID: number;
    readonly CAPTURETYPEATSTARTUP_NONE: YInputCapture.CAPTURETYPEATSTARTUP;
    readonly CAPTURETYPEATSTARTUP_TIMED: YInputCapture.CAPTURETYPEATSTARTUP;
    readonly CAPTURETYPEATSTARTUP_V_MAX: YInputCapture.CAPTURETYPEATSTARTUP;
    readonly CAPTURETYPEATSTARTUP_V_MIN: YInputCapture.CAPTURETYPEATSTARTUP;
    readonly CAPTURETYPEATSTARTUP_I_MAX: YInputCapture.CAPTURETYPEATSTARTUP;
    readonly CAPTURETYPEATSTARTUP_I_MIN: YInputCapture.CAPTURETYPEATSTARTUP;
    readonly CAPTURETYPEATSTARTUP_P_MAX: YInputCapture.CAPTURETYPEATSTARTUP;
    readonly CAPTURETYPEATSTARTUP_P_MIN: YInputCapture.CAPTURETYPEATSTARTUP;
    readonly CAPTURETYPEATSTARTUP_V_AVG_MAX: YInputCapture.CAPTURETYPEATSTARTUP;
    readonly CAPTURETYPEATSTARTUP_V_AVG_MIN: YInputCapture.CAPTURETYPEATSTARTUP;
    readonly CAPTURETYPEATSTARTUP_V_RMS_MAX: YInputCapture.CAPTURETYPEATSTARTUP;
    readonly CAPTURETYPEATSTARTUP_V_RMS_MIN: YInputCapture.CAPTURETYPEATSTARTUP;
    readonly CAPTURETYPEATSTARTUP_I_AVG_MAX: YInputCapture.CAPTURETYPEATSTARTUP;
    readonly CAPTURETYPEATSTARTUP_I_AVG_MIN: YInputCapture.CAPTURETYPEATSTARTUP;
    readonly CAPTURETYPEATSTARTUP_I_RMS_MAX: YInputCapture.CAPTURETYPEATSTARTUP;
    readonly CAPTURETYPEATSTARTUP_I_RMS_MIN: YInputCapture.CAPTURETYPEATSTARTUP;
    readonly CAPTURETYPEATSTARTUP_P_AVG_MAX: YInputCapture.CAPTURETYPEATSTARTUP;
    readonly CAPTURETYPEATSTARTUP_P_AVG_MIN: YInputCapture.CAPTURETYPEATSTARTUP;
    readonly CAPTURETYPEATSTARTUP_PF_MIN: YInputCapture.CAPTURETYPEATSTARTUP;
    readonly CAPTURETYPEATSTARTUP_DPF_MIN: YInputCapture.CAPTURETYPEATSTARTUP;
    readonly CAPTURETYPEATSTARTUP_INVALID: YInputCapture.CAPTURETYPEATSTARTUP;
    readonly CONDVALUEATSTARTUP_INVALID: number;
    static readonly LASTCAPTURETIME_INVALID: number;
    static readonly NSAMPLES_INVALID: number;
    static readonly SAMPLINGRATE_INVALID: number;
    static readonly CAPTURETYPE_NONE: YInputCapture.CAPTURETYPE;
    static readonly CAPTURETYPE_TIMED: YInputCapture.CAPTURETYPE;
    static readonly CAPTURETYPE_V_MAX: YInputCapture.CAPTURETYPE;
    static readonly CAPTURETYPE_V_MIN: YInputCapture.CAPTURETYPE;
    static readonly CAPTURETYPE_I_MAX: YInputCapture.CAPTURETYPE;
    static readonly CAPTURETYPE_I_MIN: YInputCapture.CAPTURETYPE;
    static readonly CAPTURETYPE_P_MAX: YInputCapture.CAPTURETYPE;
    static readonly CAPTURETYPE_P_MIN: YInputCapture.CAPTURETYPE;
    static readonly CAPTURETYPE_V_AVG_MAX: YInputCapture.CAPTURETYPE;
    static readonly CAPTURETYPE_V_AVG_MIN: YInputCapture.CAPTURETYPE;
    static readonly CAPTURETYPE_V_RMS_MAX: YInputCapture.CAPTURETYPE;
    static readonly CAPTURETYPE_V_RMS_MIN: YInputCapture.CAPTURETYPE;
    static readonly CAPTURETYPE_I_AVG_MAX: YInputCapture.CAPTURETYPE;
    static readonly CAPTURETYPE_I_AVG_MIN: YInputCapture.CAPTURETYPE;
    static readonly CAPTURETYPE_I_RMS_MAX: YInputCapture.CAPTURETYPE;
    static readonly CAPTURETYPE_I_RMS_MIN: YInputCapture.CAPTURETYPE;
    static readonly CAPTURETYPE_P_AVG_MAX: YInputCapture.CAPTURETYPE;
    static readonly CAPTURETYPE_P_AVG_MIN: YInputCapture.CAPTURETYPE;
    static readonly CAPTURETYPE_PF_MIN: YInputCapture.CAPTURETYPE;
    static readonly CAPTURETYPE_DPF_MIN: YInputCapture.CAPTURETYPE;
    static readonly CAPTURETYPE_INVALID: YInputCapture.CAPTURETYPE;
    static readonly CONDVALUE_INVALID: number;
    static readonly CONDALIGN_INVALID: number;
    static readonly CAPTURETYPEATSTARTUP_NONE: YInputCapture.CAPTURETYPEATSTARTUP;
    static readonly CAPTURETYPEATSTARTUP_TIMED: YInputCapture.CAPTURETYPEATSTARTUP;
    static readonly CAPTURETYPEATSTARTUP_V_MAX: YInputCapture.CAPTURETYPEATSTARTUP;
    static readonly CAPTURETYPEATSTARTUP_V_MIN: YInputCapture.CAPTURETYPEATSTARTUP;
    static readonly CAPTURETYPEATSTARTUP_I_MAX: YInputCapture.CAPTURETYPEATSTARTUP;
    static readonly CAPTURETYPEATSTARTUP_I_MIN: YInputCapture.CAPTURETYPEATSTARTUP;
    static readonly CAPTURETYPEATSTARTUP_P_MAX: YInputCapture.CAPTURETYPEATSTARTUP;
    static readonly CAPTURETYPEATSTARTUP_P_MIN: YInputCapture.CAPTURETYPEATSTARTUP;
    static readonly CAPTURETYPEATSTARTUP_V_AVG_MAX: YInputCapture.CAPTURETYPEATSTARTUP;
    static readonly CAPTURETYPEATSTARTUP_V_AVG_MIN: YInputCapture.CAPTURETYPEATSTARTUP;
    static readonly CAPTURETYPEATSTARTUP_V_RMS_MAX: YInputCapture.CAPTURETYPEATSTARTUP;
    static readonly CAPTURETYPEATSTARTUP_V_RMS_MIN: YInputCapture.CAPTURETYPEATSTARTUP;
    static readonly CAPTURETYPEATSTARTUP_I_AVG_MAX: YInputCapture.CAPTURETYPEATSTARTUP;
    static readonly CAPTURETYPEATSTARTUP_I_AVG_MIN: YInputCapture.CAPTURETYPEATSTARTUP;
    static readonly CAPTURETYPEATSTARTUP_I_RMS_MAX: YInputCapture.CAPTURETYPEATSTARTUP;
    static readonly CAPTURETYPEATSTARTUP_I_RMS_MIN: YInputCapture.CAPTURETYPEATSTARTUP;
    static readonly CAPTURETYPEATSTARTUP_P_AVG_MAX: YInputCapture.CAPTURETYPEATSTARTUP;
    static readonly CAPTURETYPEATSTARTUP_P_AVG_MIN: YInputCapture.CAPTURETYPEATSTARTUP;
    static readonly CAPTURETYPEATSTARTUP_PF_MIN: YInputCapture.CAPTURETYPEATSTARTUP;
    static readonly CAPTURETYPEATSTARTUP_DPF_MIN: YInputCapture.CAPTURETYPEATSTARTUP;
    static readonly CAPTURETYPEATSTARTUP_INVALID: YInputCapture.CAPTURETYPEATSTARTUP;
    static readonly CONDVALUEATSTARTUP_INVALID: number;
    constructor(yapi: YAPIContext, func: string);
    imm_parseAttr(name: string, val: any): number;
    /**
     * Returns the number of elapsed milliseconds between the module power on
     * and the last capture (time of trigger), or zero if no capture has been done.
     *
     * @return an integer corresponding to the number of elapsed milliseconds between the module power on
     *         and the last capture (time of trigger), or zero if no capture has been done
     *
     * On failure, throws an exception or returns YInputCapture.LASTCAPTURETIME_INVALID.
     */
    get_lastCaptureTime(): Promise<number>;
    /**
     * Returns the number of samples that will be captured.
     *
     * @return an integer corresponding to the number of samples that will be captured
     *
     * On failure, throws an exception or returns YInputCapture.NSAMPLES_INVALID.
     */
    get_nSamples(): Promise<number>;
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
    set_nSamples(newval: number): Promise<number>;
    /**
     * Returns the sampling frequency, in Hz.
     *
     * @return an integer corresponding to the sampling frequency, in Hz
     *
     * On failure, throws an exception or returns YInputCapture.SAMPLINGRATE_INVALID.
     */
    get_samplingRate(): Promise<number>;
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
    get_captureType(): Promise<YInputCapture.CAPTURETYPE>;
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
    set_captureType(newval: YInputCapture.CAPTURETYPE): Promise<number>;
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
    set_condValue(newval: number): Promise<number>;
    /**
     * Returns current threshold value for automatic conditional capture.
     *
     * @return a floating point number corresponding to current threshold value for automatic conditional capture
     *
     * On failure, throws an exception or returns YInputCapture.CONDVALUE_INVALID.
     */
    get_condValue(): Promise<number>;
    /**
     * Returns the relative position of the trigger event within the capture window.
     * When the value is 50%, the capture is centered on the event.
     *
     * @return an integer corresponding to the relative position of the trigger event within the capture window
     *
     * On failure, throws an exception or returns YInputCapture.CONDALIGN_INVALID.
     */
    get_condAlign(): Promise<number>;
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
    set_condAlign(newval: number): Promise<number>;
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
    get_captureTypeAtStartup(): Promise<YInputCapture.CAPTURETYPEATSTARTUP>;
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
    set_captureTypeAtStartup(newval: YInputCapture.CAPTURETYPEATSTARTUP): Promise<number>;
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
    set_condValueAtStartup(newval: number): Promise<number>;
    /**
     * Returns the threshold value for automatic conditional
     * capture applied at device power on.
     *
     * @return a floating point number corresponding to the threshold value for automatic conditional
     *         capture applied at device power on
     *
     * On failure, throws an exception or returns YInputCapture.CONDVALUEATSTARTUP_INVALID.
     */
    get_condValueAtStartup(): Promise<number>;
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
    static FindInputCapture(func: string): YInputCapture;
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
    static FindInputCaptureInContext(yctx: YAPIContext, func: string): YInputCapture;
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
    registerValueCallback(callback: YInputCapture.ValueCallback | null): Promise<number>;
    _invokeValueCallback(value: string): Promise<number>;
    /**
     * Returns all details about the last automatic input capture.
     *
     * @return an YInputCaptureData object including
     *         data series and all related meta-information.
     *         On failure, throws an exception or returns an capture object.
     */
    get_lastCapture(): Promise<YInputCaptureData>;
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
    get_immediateCapture(msDuration: number): Promise<YInputCaptureData>;
    /**
     * Returns the next InputCapture
     *
     * @returns {YInputCapture}
     */
    nextInputCapture(): YInputCapture | null;
    /**
     * Retrieves the first InputCapture in a YAPI context
     *
     * @returns {YInputCapture}
     */
    static FirstInputCapture(): YInputCapture | null;
    /**
     * Retrieves the first InputCapture in a given context
     *
     * @param yctx {YAPIContext}
     *
     * @returns {YInputCapture}
     */
    static FirstInputCaptureInContext(yctx: YAPIContext): YInputCapture | null;
}
export declare namespace YInputCapture {
    const enum CAPTURETYPE {
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
    const enum CAPTURETYPEATSTARTUP {
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
    interface ValueCallback {
        (func: YInputCapture, value: string): void;
    }
}
