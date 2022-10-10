/*********************************************************************
 *
 * $Id: yocto_api.ts 51266 2022-10-10 09:18:25Z seb $
 *
 * High-level programming interface, common to all modules
 *
 * - - - - - - - - - License information: - - - - - - - - -
 *
 *  Copyright (C) 2011 and beyond by Yoctopuce Sarl, Switzerland.
 *
 *  Yoctopuce Sarl (hereafter Licensor) grants to you a perpetual
 *  non-exclusive license to use, modify, copy and integrate http
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
 *  THE SOFTWARE AND DOCUMENTATION ARE PROVIDED "AS IS" WITHOUT
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
export declare const YAPI_SUCCESS: number;
export declare const YAPI_NOT_INITIALIZED: number;
export declare const YAPI_INVALID_ARGUMENT: number;
export declare const YAPI_NOT_SUPPORTED: number;
export declare const YAPI_DEVICE_NOT_FOUND: number;
export declare const YAPI_VERSION_MISMATCH: number;
export declare const YAPI_DEVICE_BUSY: number;
export declare const YAPI_TIMEOUT: number;
export declare const YAPI_IO_ERROR: number;
export declare const YAPI_NO_MORE_DATA: number;
export declare const YAPI_EXHAUSTED: number;
export declare const YAPI_DOUBLE_ACCES: number;
export declare const YAPI_UNAUTHORIZED: number;
export declare const YAPI_RTC_NOT_READY: number;
export declare const YAPI_FILE_NOT_FOUND: number;
export declare const YAPI_SSL_ERROR: number;
export declare const YAPI_INVALID_INT: number;
export declare const YAPI_INVALID_UINT: number;
export declare const YAPI_INVALID_LONG: number;
export declare const YAPI_INVALID_DOUBLE: number;
export declare const YAPI_INVALID_STRING: string;
export declare const YAPI_MIN_DOUBLE: number;
export declare const YAPI_MAX_DOUBLE: number;
export declare const Y_FUNCTIONDESCRIPTOR_INVALID: string;
export declare const Y_DETECT_NONE: number;
export declare const Y_DETECT_USB: number;
export declare const Y_DETECT_NET: number;
export declare const Y_DETECT_ALL: number;
export declare class YErrorMsg {
    msg: string;
    constructor(msg?: string);
}
export declare class YoctoError extends Error {
    errorType?: number;
    errorMsg?: string;
    constructor(...params: any[]);
}
export interface YLogCallback {
    (msg: string): void;
}
export interface YProgressCallback {
    (progress: number, msg: string): void;
}
export interface yCalibrationHandler {
    (rawValue: number, calibType: number, parameters: number[], rawValues: number[], refValues: number[]): number;
}
export interface YHubDiscoveryCallback {
    (serial: string, urlToRegister: string | null, urlToUnregister: string | null): void;
}
export interface YDeviceUpdateCallback {
    (module: YModule): void;
}
export interface YUnhandledPromiseRejectionCallback {
    (reason: object, promise: PromiseLike<any>): void;
}
export interface YConditionalResult {
    errorType: number;
    errorMsg: string;
    result?: string;
}
export interface WebSocketCredential {
    user: string;
    pass: string;
}
interface YStringDict {
    [ident: string]: string;
}
interface YBoolDict {
    [ident: string]: boolean;
}
interface YIntDict {
    [ident: string]: number;
}
interface YDeviceDict {
    [ident: string]: YDevice;
}
interface YFunctionTypeDict {
    [ident: string]: YFunctionType;
}
interface YDataStreamDict {
    [ident: string]: YDataStream;
}
interface YGenericHubDict {
    [ident: string]: YGenericHub;
}
declare class YFunctionType {
    private _yapi;
    private _className;
    private _connectedFns;
    private _requestedFns;
    private _hwIdByName;
    private _nameByHwId;
    private _valueByHwId;
    private _baseType;
    constructor(yapi: YAPIContext, classname: string);
    /** Index a single function given by HardwareId and logical name; store any advertised value
     *
     * @param {string} str_hwid
     * @param {string} str_name
     * @param {string|null} str_val
     * @param {number|null} int_basetype
     * @returns {boolean} true iff there was a logical name discrepancy
     */
    imm_reindexFunction(str_hwid: string, str_name: string, str_val: string | null, int_basetype: number | null): boolean;
    /** Forget a disconnected function given by HardwareId
     *
     * @param {string} str_hwid
     */
    imm_forgetFunction(str_hwid: string): void;
    /** Find the exact Hardware Id of the specified function, if currently connected
     * If device is not known as connected, return a clean error
     * This function will not cause any network access
     *
     * @param {string} str_func
     * @return {object}
     */
    imm_resolve(str_func: string): YConditionalResult;
    /** Find the friendly name (use logical name if available) of the specified function, if currently connected
     * If device is not known as connected, return a clean error
     * This function will not cause any network access
     *
     * @param {string} str_func
     * @return {object}
     */
    imm_getFriendlyName(str_func: string): YConditionalResult;
    /** Associates a given function object to a function id
     *
     * @param {string} str_func
     * @param {YFunction} obj_func
     */
    imm_setFunction(str_func: string, obj_func: YFunction): void;
    /** Retrieve a function object by hardware id, updating the indexes on the fly if needed
     *
     * @param {string} str_func
     * @return {YFunction}
     */
    imm_getFunction(str_func: string): YFunction;
    /** Stores a function advertised value by hardware id, and tell if an event should be queued for it
     *
     * @param {string} str_hwid
     * @param {string} str_pubval
     * @return {boolean}
     */
    imm_setFunctionValue(str_hwid: string, str_pubval: string): boolean;
    /** Retrieve a function advertised value by hardware id
     *
     * @param {string} str_hwid
     * @return {string}
     */
    imm_getFunctionValue(str_hwid: string): string;
    /** Return the basetype of this function class
     *
     * @return {number}
     */
    imm_getBaseType(): number;
    /** Test if function type is compatible with basetype
     *
     * @return {boolean}
     */
    imm_matchBaseType(baseclass: number): boolean;
    /** Find the hardwareId of the first instance of a given function class
     *
     * @return {string|null}
     */
    imm_getFirstHardwareId(): string | null;
    /** Find the hardwareId for the next instance of a given function class
     *
     * @param {string} str_hwid
     * @return {string|null}
     */
    imm_getNextHardwareId(str_hwid: string): string | null;
}
export interface YDownloadProgressCallback {
    (curr: number, total: number): void;
}
export declare class YHTTPBody {
    fname: string;
    data: Uint8Array;
    progressCb: YDownloadProgressCallback | null;
    /** Object storing a file to upload
     *
     * @param str_fname {string}
     * @param bin_data {Uint8Array}
     * @param fun_progressCb {YDownloadProgressCallback}
     */
    constructor(str_fname: string, bin_data: Uint8Array, fun_progressCb: YDownloadProgressCallback | null);
}
export declare class YHTTPRequest {
    devUrl: string | null;
    errorType: number;
    errorMsg: string;
    bin_result: Uint8Array | null;
    obj_result: any;
    asyncId: number;
    acceptor: Function | null;
    toBeSent: Uint8Array | null;
    sendPos: number;
    progressCb: YDownloadProgressCallback | null;
    timeoutId: any;
    sendTimeoutId: any;
    next: YHTTPRequest | null;
    _creat: string;
    _sent: string;
    /** Object storing the result of any HTTP Query, with status code and error message
     *
     * @param bin_res {Uint8Array}
     * @param int_errType {number}
     * @param str_errMsg {string}
     */
    constructor(bin_res: Uint8Array | null, int_errType?: number, str_errMsg?: string);
}
interface _YY_FuncCache {
    _expiration: number;
    [funcAttr: string]: object | number | string;
}
interface _YY_FuncReq extends _YY_FuncCache {
    device: YDevice;
    deviceid: string;
    functionid: string;
    hwid: string;
}
declare class YFuncRequest {
    obj_result: _YY_FuncReq | null;
    errorType: number;
    errorMsg: string;
    constructor(obj_res: _YY_FuncReq | null, int_errType?: number, str_errMsg?: string);
}
interface _YY_Module {
    serialNumber: string;
    logicalName: string;
    productName: string;
    productId: number;
    firmwareRelease: string;
    beacon: number;
}
interface _YY_WhitePage {
    serialNumber: string;
    logicalName: string;
    productName: string;
    productId: number;
    networkUrl: string;
    beacon: number;
    index: number;
}
interface _YY_YellowPage {
    baseType: number;
    hardwareId: string;
    logicalName: string;
    advertisedValue: string;
    index: number;
}
interface _YY_YellowPages {
    [classname: string]: _YY_YellowPage[];
}
interface _YY_Services {
    whitePages: _YY_WhitePage[];
    yellowPages: _YY_YellowPages;
}
interface _YY_HubApi {
    module: _YY_Module;
    services: _YY_Services;
}
export interface _YY_UrlInfo {
    proto: string;
    user: string;
    pass: string;
    host: string;
    port: string;
    domain: string;
    url: string;
}
/**
 * YDataStream Class: Unformatted data sequence
 *
 * DataStream objects represent bare recorded measure sequences,
 * exactly as found within the data logger present on Yoctopuce
 * sensors.
 *
 * In most cases, it is not necessary to use DataStream objects
 * directly, as the DataSet objects (returned by the
 * get_recordedData() method from sensors and the
 * get_dataSets() method from the data logger) provide
 * a more convenient interface.
 */
export declare class YDataStream {
    static DATA_INVALID: number;
    static DURATION_INVALID: number;
    DATA_INVALID: number;
    DURATION_INVALID: number;
    _yapi: YAPIContext;
    imm_calhdl: Function | null;
    _parent: YFunction;
    _runNo: number;
    _utcStamp: number;
    _nCols: number;
    _nRows: number;
    _startTime: number;
    _duration: number;
    _dataSamplesInterval: number;
    _firstMeasureDuration: number;
    _columnNames: string[];
    _functionId: string;
    _isClosed: boolean;
    _isAvg: boolean;
    _minVal: number;
    _avgVal: number;
    _maxVal: number;
    _caltyp: number;
    _calpar: number[];
    _calraw: number[];
    _calref: number[];
    _values: number[][];
    constructor(obj_parent: YFunction, obj_dataset: YDataSet, encoded: number[]);
    imm_initFromDataSet(dataset: YDataSet, encoded: number[]): number;
    imm_parseStream(sdata: Uint8Array): number;
    imm_get_url(): string;
    loadStream(): Promise<number>;
    imm_decodeVal(w: number): number;
    imm_decodeAvg(dw: number, count: number): number;
    isClosed(): Promise<boolean>;
    /**
     * Returns the run index of the data stream. A run can be made of
     * multiple datastreams, for different time intervals.
     *
     * @return an unsigned number corresponding to the run index.
     */
    get_runIndex(): Promise<number>;
    /**
     * Returns the relative start time of the data stream, measured in seconds.
     * For recent firmwares, the value is relative to the present time,
     * which means the value is always negative.
     * If the device uses a firmware older than version 13000, value is
     * relative to the start of the time the device was powered on, and
     * is always positive.
     * If you need an absolute UTC timestamp, use get_realStartTimeUTC().
     *
     * <b>DEPRECATED</b>: This method has been replaced by get_realStartTimeUTC().
     *
     * @return an unsigned number corresponding to the number of seconds
     *         between the start of the run and the beginning of this data
     *         stream.
     */
    get_startTime(): Promise<number>;
    /**
     * Returns the start time of the data stream, relative to the Jan 1, 1970.
     * If the UTC time was not set in the datalogger at the time of the recording
     * of this data stream, this method returns 0.
     *
     * <b>DEPRECATED</b>: This method has been replaced by get_realStartTimeUTC().
     *
     * @return an unsigned number corresponding to the number of seconds
     *         between the Jan 1, 1970 and the beginning of this data
     *         stream (i.e. Unix time representation of the absolute time).
     */
    get_startTimeUTC(): Promise<number>;
    /**
     * Returns the start time of the data stream, relative to the Jan 1, 1970.
     * If the UTC time was not set in the datalogger at the time of the recording
     * of this data stream, this method returns 0.
     *
     * @return a floating-point number  corresponding to the number of seconds
     *         between the Jan 1, 1970 and the beginning of this data
     *         stream (i.e. Unix time representation of the absolute time).
     */
    get_realStartTimeUTC(): Promise<number>;
    /**
     * Returns the number of milliseconds between two consecutive
     * rows of this data stream. By default, the data logger records one row
     * per second, but the recording frequency can be changed for
     * each device function
     *
     * @return an unsigned number corresponding to a number of milliseconds.
     */
    get_dataSamplesIntervalMs(): Promise<number>;
    get_dataSamplesInterval(): Promise<number>;
    get_firstDataSamplesInterval(): Promise<number>;
    /**
     * Returns the number of data rows present in this stream.
     *
     * If the device uses a firmware older than version 13000,
     * this method fetches the whole data stream from the device
     * if not yet done, which can cause a little delay.
     *
     * @return an unsigned number corresponding to the number of rows.
     *
     * On failure, throws an exception or returns zero.
     */
    get_rowCount(): Promise<number>;
    /**
     * Returns the number of data columns present in this stream.
     * The meaning of the values present in each column can be obtained
     * using the method get_columnNames().
     *
     * If the device uses a firmware older than version 13000,
     * this method fetches the whole data stream from the device
     * if not yet done, which can cause a little delay.
     *
     * @return an unsigned number corresponding to the number of columns.
     *
     * On failure, throws an exception or returns zero.
     */
    get_columnCount(): Promise<number>;
    /**
     * Returns the title (or meaning) of each data column present in this stream.
     * In most case, the title of the data column is the hardware identifier
     * of the sensor that produced the data. For streams recorded at a lower
     * recording rate, the dataLogger stores the min, average and max value
     * during each measure interval into three columns with suffixes _min,
     * _avg and _max respectively.
     *
     * If the device uses a firmware older than version 13000,
     * this method fetches the whole data stream from the device
     * if not yet done, which can cause a little delay.
     *
     * @return a list containing as many strings as there are columns in the
     *         data stream.
     *
     * On failure, throws an exception or returns an empty array.
     */
    get_columnNames(): Promise<string[]>;
    /**
     * Returns the smallest measure observed within this stream.
     * If the device uses a firmware older than version 13000,
     * this method will always return YDataStream.DATA_INVALID.
     *
     * @return a floating-point number corresponding to the smallest value,
     *         or YDataStream.DATA_INVALID if the stream is not yet complete (still recording).
     *
     * On failure, throws an exception or returns YDataStream.DATA_INVALID.
     */
    get_minValue(): Promise<number>;
    /**
     * Returns the average of all measures observed within this stream.
     * If the device uses a firmware older than version 13000,
     * this method will always return YDataStream.DATA_INVALID.
     *
     * @return a floating-point number corresponding to the average value,
     *         or YDataStream.DATA_INVALID if the stream is not yet complete (still recording).
     *
     * On failure, throws an exception or returns YDataStream.DATA_INVALID.
     */
    get_averageValue(): Promise<number>;
    /**
     * Returns the largest measure observed within this stream.
     * If the device uses a firmware older than version 13000,
     * this method will always return YDataStream.DATA_INVALID.
     *
     * @return a floating-point number corresponding to the largest value,
     *         or YDataStream.DATA_INVALID if the stream is not yet complete (still recording).
     *
     * On failure, throws an exception or returns YDataStream.DATA_INVALID.
     */
    get_maxValue(): Promise<number>;
    get_realDuration(): Promise<number>;
    /**
     * Returns the whole data set contained in the stream, as a bidimensional
     * table of numbers.
     * The meaning of the values present in each column can be obtained
     * using the method get_columnNames().
     *
     * This method fetches the whole data stream from the device,
     * if not yet done.
     *
     * @return a list containing as many elements as there are rows in the
     *         data stream. Each row itself is a list of floating-point
     *         numbers.
     *
     * On failure, throws an exception or returns an empty array.
     */
    get_dataRows(): Promise<number[][]>;
    /**
     * Returns a single measure from the data stream, specified by its
     * row and column index.
     * The meaning of the values present in each column can be obtained
     * using the method get_columnNames().
     *
     * This method fetches the whole data stream from the device,
     * if not yet done.
     *
     * @param row : row index
     * @param col : column index
     *
     * @return a floating-point number
     *
     * On failure, throws an exception or returns YDataStream.DATA_INVALID.
     */
    get_data(row: number, col: number): Promise<number>;
}
/**
 * YDataSet Class: Recorded data sequence, as returned by sensor.get_recordedData()
 *
 * YDataSet objects make it possible to retrieve a set of recorded measures
 * for a given sensor and a specified time interval. They can be used
 * to load data points with a progress report. When the YDataSet object is
 * instantiated by the sensor.get_recordedData()  function, no data is
 * yet loaded from the module. It is only when the loadMore()
 * method is called over and over than data will be effectively loaded
 * from the dataLogger.
 *
 * A preview of available measures is available using the function
 * get_preview() as soon as loadMore() has been called
 * once. Measures themselves are available using function get_measures()
 * when loaded by subsequent calls to loadMore().
 *
 * This class can only be used on devices that use a relatively recent firmware,
 * as YDataSet objects are not supported by firmwares older than version 13000.
 */
export declare class YDataSet {
    static DATA_INVALID: number;
    static DURATION_INVALID: number;
    static HARDWAREID_INVALID: string;
    static FUNCTIONID_INVALID: string;
    static UNIT_INVALID: string;
    DATA_INVALID: number;
    DURATION_INVALID: number;
    HARDWAREID_INVALID: string;
    FUNCTIONID_INVALID: string;
    UNIT_INVALID: string;
    _yapi: YAPIContext;
    _parent: YFunction;
    _hardwareId: string;
    _functionId: string;
    _unit: string;
    _startTimeMs: number;
    _endTimeMs: number;
    _progress: number;
    _calib: number[];
    _streams: YDataStream[];
    _summary: YMeasure;
    _preview: YMeasure[];
    _measures: YMeasure[];
    _summaryMinVal: number;
    _summaryMaxVal: number;
    _summaryTotalAvg: number;
    _summaryTotalTime: number;
    constructor(obj_parent: YFunction, str_functionId?: string, str_unit?: string, double_startTime?: number, double_endTime?: number);
    imm_get_functionId(): string;
    imm_get_calibration(): number[];
    loadSummary(data: Uint8Array): Promise<number>;
    processMore(progress: number, data: Uint8Array): Promise<number>;
    get_privateDataStreams(): Promise<YDataStream[]>;
    /**
     * Returns the unique hardware identifier of the function who performed the measures,
     * in the form SERIAL.FUNCTIONID. The unique hardware identifier is composed of the
     * device serial number and of the hardware identifier of the function
     * (for example THRMCPL1-123456.temperature1)
     *
     * @return a string that uniquely identifies the function (ex: THRMCPL1-123456.temperature1)
     *
     * On failure, throws an exception or returns  YDataSet.HARDWAREID_INVALID.
     */
    get_hardwareId(): Promise<string>;
    /**
     * Returns the hardware identifier of the function that performed the measure,
     * without reference to the module. For example temperature1.
     *
     * @return a string that identifies the function (ex: temperature1)
     */
    get_functionId(): Promise<string>;
    /**
     * Returns the measuring unit for the measured value.
     *
     * @return a string that represents a physical unit.
     *
     * On failure, throws an exception or returns  YDataSet.UNIT_INVALID.
     */
    get_unit(): Promise<string>;
    /**
     * Returns the start time of the dataset, relative to the Jan 1, 1970.
     * When the YDataSet object is created, the start time is the value passed
     * in parameter to the get_dataSet() function. After the
     * very first call to loadMore(), the start time is updated
     * to reflect the timestamp of the first measure actually found in the
     * dataLogger within the specified range.
     *
     * <b>DEPRECATED</b>: This method has been replaced by get_summary()
     * which contain more precise informations.
     *
     * @return an unsigned number corresponding to the number of seconds
     *         between the Jan 1, 1970 and the beginning of this data
     *         set (i.e. Unix time representation of the absolute time).
     */
    get_startTimeUTC(): Promise<number>;
    imm_get_startTimeUTC(): number;
    /**
     * Returns the end time of the dataset, relative to the Jan 1, 1970.
     * When the YDataSet object is created, the end time is the value passed
     * in parameter to the get_dataSet() function. After the
     * very first call to loadMore(), the end time is updated
     * to reflect the timestamp of the last measure actually found in the
     * dataLogger within the specified range.
     *
     * <b>DEPRECATED</b>: This method has been replaced by get_summary()
     * which contain more precise informations.
     *
     * @return an unsigned number corresponding to the number of seconds
     *         between the Jan 1, 1970 and the end of this data
     *         set (i.e. Unix time representation of the absolute time).
     */
    get_endTimeUTC(): Promise<number>;
    imm_get_endTimeUTC(): number;
    /**
     * Returns the progress of the downloads of the measures from the data logger,
     * on a scale from 0 to 100. When the object is instantiated by get_dataSet,
     * the progress is zero. Each time loadMore() is invoked, the progress
     * is updated, to reach the value 100 only once all measures have been loaded.
     *
     * @return an integer in the range 0 to 100 (percentage of completion).
     */
    get_progress(): Promise<number>;
    /**
     * Loads the the next block of measures from the dataLogger, and updates
     * the progress indicator.
     *
     * @return an integer in the range 0 to 100 (percentage of completion),
     *         or a negative error code in case of failure.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    loadMore(): Promise<number>;
    /**
     * Returns an YMeasure object which summarizes the whole
     * YDataSet. In includes the following information:
     * - the start of a time interval
     * - the end of a time interval
     * - the minimal value observed during the time interval
     * - the average value observed during the time interval
     * - the maximal value observed during the time interval
     *
     * This summary is available as soon as loadMore() has
     * been called for the first time.
     *
     * @return an YMeasure object
     */
    get_summary(): Promise<YMeasure>;
    /**
     * Returns a condensed version of the measures that can
     * retrieved in this YDataSet, as a list of YMeasure
     * objects. Each item includes:
     * - the start of a time interval
     * - the end of a time interval
     * - the minimal value observed during the time interval
     * - the average value observed during the time interval
     * - the maximal value observed during the time interval
     *
     * This preview is available as soon as loadMore() has
     * been called for the first time.
     *
     * @return a table of records, where each record depicts the
     *         measured values during a time interval
     *
     * On failure, throws an exception or returns an empty array.
     */
    get_preview(): Promise<YMeasure[]>;
    /**
     * Returns the detailed set of measures for the time interval corresponding
     * to a given condensed measures previously returned by get_preview().
     * The result is provided as a list of YMeasure objects.
     *
     * @param measure : condensed measure from the list previously returned by
     *         get_preview().
     *
     * @return a table of records, where each record depicts the
     *         measured values during a time interval
     *
     * On failure, throws an exception or returns an empty array.
     */
    get_measuresAt(measure: YMeasure): Promise<YMeasure[]>;
    /**
     * Returns all measured values currently available for this DataSet,
     * as a list of YMeasure objects. Each item includes:
     * - the start of the measure time interval
     * - the end of the measure time interval
     * - the minimal value observed during the time interval
     * - the average value observed during the time interval
     * - the maximal value observed during the time interval
     *
     * Before calling this method, you should call loadMore()
     * to load data from the device. You may have to call loadMore()
     * several time until all rows are loaded, but you can start
     * looking at available data rows before the load is complete.
     *
     * The oldest measures are always loaded first, and the most
     * recent measures will be loaded last. As a result, timestamps
     * are normally sorted in ascending order within the measure table,
     * unless there was an unexpected adjustment of the datalogger UTC
     * clock.
     *
     * @return a table of records, where each record depicts the
     *         measured value for a given time interval
     *
     * On failure, throws an exception or returns an empty array.
     */
    get_measures(): Promise<YMeasure[]>;
    _parse(str_json: string): Promise<number>;
}
/**
 * YConsolidatedDataSet Class: Cross-sensor consolidated data sequence.
 *
 * YConsolidatedDataSet objects make it possible to retrieve a set of
 * recorded measures from multiple sensors, for a specified time interval.
 * They can be used to load data points progressively, and to receive
 * data records by timestamp, one by one..
 */
export declare class YConsolidatedDataSet {
    _start: number;
    _end: number;
    _nsensors: number;
    _sensors: YSensor[];
    _datasets: YDataSet[];
    _progresss: number[];
    _nextidx: number[];
    _nexttim: number[];
    constructor(double_startTime: number, double_endTime: number, obj_sensorList: YSensor[]);
    imm_init(startt: number, endt: number, sensorList: YSensor[]): number;
    /**
     * Returns an object holding historical data for multiple
     * sensors, for a specified time interval.
     * The measures will be retrieved from the data logger, which must have been turned
     * on at the desired time. The resulting object makes it possible to load progressively
     * a large set of measures from multiple sensors, consolidating data on the fly
     * to align records based on measurement timestamps.
     *
     * @param sensorNames : array of logical names or hardware identifiers of the sensors
     *         for which data must be loaded from their data logger.
     * @param startTime : the start of the desired measure time interval,
     *         as a Unix timestamp, i.e. the number of seconds since
     *         January 1, 1970 UTC. The special value 0 can be used
     *         to include any measure, without initial limit.
     * @param endTime : the end of the desired measure time interval,
     *         as a Unix timestamp, i.e. the number of seconds since
     *         January 1, 1970 UTC. The special value 0 can be used
     *         to include any measure, without ending limit.
     *
     * @return an instance of YConsolidatedDataSet, providing access to
     *         consolidated historical data. Records can be loaded progressively
     *         using the YConsolidatedDataSet.nextRecord() method.
     */
    static Init(sensorNames: string[], startTime: number, endTime: number): YConsolidatedDataSet;
    /**
     * Extracts the next data record from the data logger of all sensors linked to this
     * object.
     *
     * @param datarec : array of floating point numbers, that will be filled by the
     *         function with the timestamp of the measure in first position,
     *         followed by the measured value in next positions.
     *
     * @return an integer in the range 0 to 100 (percentage of completion),
     *         or a negative error code in case of failure.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    nextRecord(datarec: number[]): Promise<number>;
}
declare class YDevice {
    _yapi: YAPIContext;
    _rootUrl: string;
    _serialNumber: string;
    _logicalName: string;
    _productName: string;
    _productId: number;
    _beacon: number;
    _devYdx: number;
    _lastErrorType: number;
    _lastErrorMsg: string;
    _pendingQueries: Promise<void>;
    private _cache;
    private _functions;
    private _busy;
    private _lastTimeRef;
    private _lastDuration;
    private _logCallback;
    private _logIsPulling;
    private _logpos;
    constructor(obj_yapi: YAPIContext, str_rooturl: string, obj_wpRec: _YY_WhitePage | null, obj_ypRecs: _YY_YellowPages | null);
    _throw(int_errType: number, str_errMsg: string, obj_retVal?: any): any;
    /** Return the root URL used to access a device (including the trailing slash)
     *
     * @returns {string}
     */
    imm_getRootUrl(): string;
    /** Return the serial number of the device, as found during discovery
     *
     * @returns {string}
     */
    imm_getSerialNumber(): string;
    /** Return the logical name of the device, as found during discovery
     *
     * @returns {string}
     */
    imm_getLogicalName(): string;
    getLogicalName(): Promise<string>;
    /** Return the product name of the device, as found during discovery
     *
     * @returns {string}
     */
    imm_getProductName(): string;
    /** Return the product Id of the device, as found during discovery
     *
     * @returns {number}
     */
    imm_getProductId(): number;
    /** Return the beacon state of the device, as found during discovery
     *
     * @returns {number}
     */
    imm_getBeacon(): number;
    /** Return the beacon state of the device, as found during discovery
     *
     * @returns {number}
     */
    getBeacon(): Promise<number>;
    imm_getLastTimeRef(): number;
    imm_getLastDuration(): number;
    imm_triggerLogPull(): void;
    imm_registerLogCallback(callback: YModule.LogCallback | null): void;
    /** Return the value of the last timestamp sent by the device, if any
     *
     * @param float_timestamp {number}
     * @param float_duration {number}
     */
    imm_setTimeRef(float_timestamp: number, float_duration: number): void;
    /** Return the hub-specific devYdx of the device, as found during discovery
     *
     * @returns {number}
     */
    imm_getDevYdx(): number;
    /** Return a string that describes the device (serial number, logical name or root URL)
     *
     * @returns {string}
     */
    imm_describe(): string;
    /** Update device cache and YAPI function lists from yp records
     *
     * @param obj_ypRecs {object}
     */
    imm_updateFromYP(obj_ypRecs: _YY_YellowPages): void;
    /** Update device cache and YAPI function lists accordingly
     *
     * @param yreq {YHTTPRequest}
     * @param loadval {object}
     */
    updateFromReq(yreq: YHTTPRequest, loadval: _YY_HubApi): Promise<void>;
    imm_dropCache(): void;
    /** Retrieve the number of functions (beside "module") in the device
     *
     * @returns {number}
     */
    imm_functionCount(): number;
    /** Retrieve the Id of the nth function (beside "module") in the device
     *
     * @param int_idx {number}
     * @returns {string}
     */
    imm_functionId(int_idx: number): string;
    /** Retrieve the base type of the nth function (beside "module") in the device
     *
     * @param int_idx {number}
     * @returns {string}
     */
    imm_functionBaseType(int_idx: number): string;
    /** Retrieve the type of the nth function (beside 'module') in the device
     *
     * @param int_idx {number}
     * @returns {string}
     */
    imm_functionType(int_idx: number): string;
    /** Retrieve the logical name of the nth function (beside "module") in the device
     *
     * @param int_idx {number}
     * @returns {string}
     */
    imm_functionName(int_idx: number): string;
    /** Retrieve the advertised value of the nth function (beside "module") in the device
     *
     * @param int_idx {number}
     * @returns {string}
     */
    imm_functionValue(int_idx: number): string;
    /** Retrieve the Id of a function given its funydx (internal function identifier index)
     *
     * @param int_funydx {number}
     * @returns {string}
     */
    imm_functionIdByFunYdx(int_funydx: number): string;
    /** Map an optimized JZON reply to a previously known JSON structure
     *
     * @param jzon {object}
     * @param json {object}
     * @returns {object}
     */
    imm_jzon2json(jzon: object, json: object): object;
    /** Get the whole REST API string for a device, from cache if possible
     *
     * @param int_msValidity {number}
     * @returns {YHTTPRequest}
     */
    requestAPI(int_msValidity: number): Promise<YHTTPRequest>;
    /** Reload a device API (store in cache), and update YAPI function lists accordingly
     *
     * @returns {number}
     */
    refresh(): Promise<number>;
}
/**
 * YFirmwareFile Class: Object describing a loaded firmware file
 */
export declare class YFirmwareFile {
    private _path;
    private _serial;
    private _pictype;
    private _product;
    private _firmware;
    private _prog_version;
    private _ROM_nb_zone;
    private _FLA_nb_zone;
    private _ROM_total_size;
    private _FLA_total_size;
    private _data;
    private _zone_ofs;
    constructor(path: string, serial: string, pictype: string, product: string, firmware: string, prog_version: string, ROM_nb_zone: number, FLA_nb_zone: number, ROM_total_size: number, FLA_total_size: number, data: Uint8Array, zone_ofs: number);
    /**
     * Parse the binary buffer provided as input and initialize a new object
     * returns null if the file is not a valid firmware
     *
     * @param path {string}
     * @param data {Uint8Array}
     * @param force {boolean}
     * @return {YFirmwareFile|null}
     */
    static imm_Parse(path: string, data: Uint8Array, force: boolean): YFirmwareFile | null;
    static imm_progCompatible(prog_version: string): boolean;
    imm_getSerial(): string;
    imm_getPictype(): string;
    imm_getProduct(): string;
    imm_getFirmwareRelease(): string;
    imm_getFirmwareReleaseAsInt(): number;
    imm_getProg_version(): string;
    imm_getROM_nb_zone(): number;
    imm_getFLA_nb_zone(): number;
    imm_getROM_total_size(): number;
    imm_getFLA_total_size(): number;
    imm_getData(): Uint8Array;
    imm_getPath(): string;
}
/**
 * YFirmwareUpdate Class: Firmware update process control interface, returned by module.updateFirmware method.
 *
 * The YFirmwareUpdate class let you control the firmware update of a Yoctopuce
 * module. This class should not be instantiate directly, but instances should be retrieved
 * using the YModule method module.updateFirmware.
 */
export declare class YFirmwareUpdate {
    _yapi: YAPIContext;
    _serial: string;
    _settings: Uint8Array;
    _firmwarepath: string;
    _progress_msg: string;
    _progress_c: number;
    _progress: number;
    _restore_step: number;
    _force: boolean;
    constructor(obj_yapi: YAPIContext, str_serial: string, str_path: string, bin_settings: Uint8Array, bool_force: boolean);
    imm_progress(progress: number, msg: string): void;
    _processMore_internal(newupdate: number): Promise<number>;
    static checkFirmware_r(file: string, serial_base: string, force: boolean): Promise<YFirmwareFile | null>;
    /**
     * Test if the byn file is valid for this module. It is possible to pass a directory instead of a file.
     * In that case, this method returns the path of the most recent appropriate byn file. This method will
     * ignore any firmware older than minrelease.
     *
     * @param serial {string} : the serial number of the module to update
     * @param path {string} : the path of a byn file or a directory that contains byn files
     * @param minrelease {number} : a positive integer
     * @param force {boolean} : true to force an update even if the API is below expected revision
     *
     * @return {string} : the path of the byn file to use, or an empty string if no byn files matches the requirement
     *
     * On failure, returns a string that starts with "error:".
     */
    static CheckFirmwareEx(serial: string, path: string, minrelease: number, force: boolean): Promise<string>;
    static CheckFirmware_internal(serial: string, path: string, minrelease: number): Promise<string>;
    static GetAllBootLoadersInContext_internal(yctx: YAPIContext): Promise<string[]>;
    static GetAllBootLoaders_internal(): Promise<string[]>;
    _processMore(newupdate: number): Promise<number>;
    /**
     * Returns a list of all the modules in "firmware update" mode.
     *
     * @return an array of strings containing the serial numbers of devices in "firmware update" mode.
     */
    static GetAllBootLoaders(): Promise<string[]>;
    /**
     * Returns a list of all the modules in "firmware update" mode.
     *
     * @param yctx : a YAPI context.
     *
     * @return an array of strings containing the serial numbers of devices in "firmware update" mode.
     */
    static GetAllBootLoadersInContext(yctx: YAPIContext): Promise<string[]>;
    /**
     * Test if the byn file is valid for this module. It is possible to pass a directory instead of a file.
     * In that case, this method returns the path of the most recent appropriate byn file. This method will
     * ignore any firmware older than minrelease.
     *
     * @param serial : the serial number of the module to update
     * @param path : the path of a byn file or a directory that contains byn files
     * @param minrelease : a positive integer
     *
     * @return : the path of the byn file to use, or an empty string if no byn files matches the requirement
     *
     * On failure, returns a string that starts with "error:".
     */
    static CheckFirmware(serial: string, path: string, minrelease: number): Promise<string>;
    /**
     * Returns the progress of the firmware update, on a scale from 0 to 100. When the object is
     * instantiated, the progress is zero. The value is updated during the firmware update process until
     * the value of 100 is reached. The 100 value means that the firmware update was completed
     * successfully. If an error occurs during the firmware update, a negative value is returned, and the
     * error message can be retrieved with get_progressMessage.
     *
     * @return an integer in the range 0 to 100 (percentage of completion)
     *         or a negative error code in case of failure.
     */
    get_progress(): Promise<number>;
    /**
     * Returns the last progress message of the firmware update process. If an error occurs during the
     * firmware update process, the error message is returned
     *
     * @return a string  with the latest progress message, or the error message.
     */
    get_progressMessage(): Promise<string>;
    /**
     * Starts the firmware update process. This method starts the firmware update process in background. This method
     * returns immediately. You can monitor the progress of the firmware update with the get_progress()
     * and get_progressMessage() methods.
     *
     * @return an integer in the range 0 to 100 (percentage of completion),
     *         or a negative error code in case of failure.
     *
     * On failure returns a negative error code.
     */
    startUpdate(): Promise<number>;
}
/**
 * YFunction Class: Common function interface
 *
 * This is the parent class for all public objects representing device functions documented in
 * the high-level programming API. This abstract class does all the real job, but without
 * knowledge of the specific function attributes.
 *
 * Instantiating a child class of YFunction does not cause any communication.
 * The instance simply keeps track of its function identifier, and will dynamically bind
 * to a matching device at the time it is really being used to read or set an attribute.
 * In order to allow true hot-plug replacement of one device by another, the binding stay
 * dynamic through the life of the object.
 *
 * The YFunction class implements a generic high-level cache for the attribute values of
 * the specified function, pre-parsed from the REST API string.
 */
export declare class YFunction {
    _yapi: YAPIContext;
    _className: string;
    _func: string;
    _lastErrorType: number;
    _lastErrorMsg: string;
    _userData: object | null;
    _cache: _YY_FuncCache;
    _dataStreams: YDataStreamDict;
    _logicalName: string;
    _advertisedValue: string;
    _valueCallbackFunction: YFunction.ValueCallback | null;
    _cacheExpiration: number;
    _serial: string;
    _funId: string;
    _hwId: string;
    readonly LOGICALNAME_INVALID: string;
    readonly ADVERTISEDVALUE_INVALID: string;
    static readonly LOGICALNAME_INVALID: string;
    static readonly ADVERTISEDVALUE_INVALID: string;
    constructor(obj_yapi: YAPIContext, str_func: string);
    _throw(int_errType: number, str_errMsg: string, obj_retVal?: any): any;
    isReadOnly_internal(): Promise<boolean>;
    imm_parseAttr(name: string, val: any): 0 | 1;
    /**
     * Returns the logical name of the function.
     *
     * @return a string corresponding to the logical name of the function
     *
     * On failure, throws an exception or returns YFunction.LOGICALNAME_INVALID.
     */
    get_logicalName(): Promise<string>;
    /**
     * Changes the logical name of the function. You can use yCheckLogicalName()
     * prior to this call to make sure that your parameter is valid.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : a string corresponding to the logical name of the function
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_logicalName(newval: string): Promise<number>;
    /**
     * Returns a short string representing the current state of the function.
     *
     * @return a string corresponding to a short string representing the current state of the function
     *
     * On failure, throws an exception or returns YFunction.ADVERTISEDVALUE_INVALID.
     */
    get_advertisedValue(): Promise<string>;
    set_advertisedValue(newval: string): Promise<number>;
    /**
     * Retrieves a function for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the function is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YFunction.isOnline() to test if the function is
     * indeed online at a given time. In case of ambiguity when looking for
     * a function by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the function, for instance
     *         MyDevice..
     *
     * @return a YFunction object allowing you to drive the function.
     */
    static FindFunction(func: string): YFunction;
    /**
     * Retrieves a function for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the function is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YFunction.isOnline() to test if the function is
     * indeed online at a given time. In case of ambiguity when looking for
     * a function by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx : a YAPI context
     * @param func : a string that uniquely characterizes the function, for instance
     *         MyDevice..
     *
     * @return a YFunction object allowing you to drive the function.
     */
    static FindFunctionInContext(yctx: YAPIContext, func: string): YFunction;
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
    registerValueCallback(callback: YFunction.ValueCallback | null): Promise<number>;
    _invokeValueCallback(value: string): Promise<number>;
    /**
     * Disables the propagation of every new advertised value to the parent hub.
     * You can use this function to save bandwidth and CPU on computers with limited
     * resources, or to prevent unwanted invocations of the HTTP callback.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    muteValueCallbacks(): Promise<number>;
    /**
     * Re-enables the propagation of every new advertised value to the parent hub.
     * This function reverts the effect of a previous call to muteValueCallbacks().
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    unmuteValueCallbacks(): Promise<number>;
    /**
     * Returns the current value of a single function attribute, as a text string, as quickly as
     * possible but without using the cached value.
     *
     * @param attrName : the name of the requested attribute
     *
     * @return a string with the value of the the attribute
     *
     * On failure, throws an exception or returns an empty string.
     */
    loadAttribute(attrName: string): Promise<string>;
    /**
     * Test if the function is readOnly. Return true if the function is write protected
     * or that the function is not available.
     *
     * @return true if the function is readOnly or not online.
     */
    isReadOnly(): Promise<boolean>;
    /**
     * Returns the serial number of the module, as set by the factory.
     *
     * @return a string corresponding to the serial number of the module, as set by the factory.
     *
     * On failure, throws an exception or returns YFunction.SERIALNUMBER_INVALID.
     */
    get_serialNumber(): Promise<string>;
    _parserHelper(): Promise<number>;
    /**
     * Returns the next Function
     *
     * @returns {YFunction}
     */
    nextFunction(): YFunction | null;
    /**
     * Retrieves the first Function in a YAPI context
     *
     * @returns {YFunction}
     */
    static FirstFunction(): YFunction | null;
    /**
     * Retrieves the first Function in a given context
     *
     * @param yctx {YAPIContext}
     *
     * @returns {YFunction}
     */
    static FirstFunctionInContext(yctx: YAPIContext): YFunction | null;
    /** Retrieve a function instance from cache
     *
     * @param yctx {YAPIContext}
     * @param className {string}
     * @param func {string}
     * @returns {YFunction}
     */
    static _FindFromCacheInContext(yctx: YAPIContext, className: string, func: string): YFunction;
    /** Retrieve a function instance from cache
     *
     * @param className {string}
     * @param func {string}
     * @returns {YFunction}
     */
    static _FindFromCache(className: string, func: string): YFunction;
    /** Add a function instance to cache
     *
     * @param className {string}
     * @param func {string}
     * @param obj {YFunction}
     */
    static _AddToCache(className: string, func: string, obj: YFunction): void;
    /** Clear the function instance cache
     *
     * @param obj_yapi {YAPIContext}
     */
    static _ClearCache(obj_yapi?: YAPIContext | null): void;
    /** Add or remove a value change callback
     *
     * @param obj_func {YFunction}
     * @param bool_add {Boolean}
     */
    static _UpdateValueCallbackList(obj_func: YFunction, bool_add: boolean): Promise<void>;
    /** Add or remove a timed report callback
     *
     * @param obj_func {YSensor}
     * @param bool_add {Boolean}
     */
    static _UpdateTimedReportCallbackList(obj_func: YFunction, bool_add: boolean): Promise<void>;
    /**
     * Returns a short text that describes unambiguously the instance of the function in the form
     * TYPE(NAME)=SERIAL&#46;FUNCTIONID.
     * More precisely,
     * TYPE       is the type of the function,
     * NAME       it the name used for the first access to the function,
     * SERIAL     is the serial number of the module if the module is connected or "unresolved", and
     * FUNCTIONID is  the hardware identifier of the function if the module is connected.
     * For example, this method returns Relay(MyCustomName.relay1)=RELAYLO1-123456.relay1 if the
     * module is already connected or Relay(BadCustomeName.relay1)=unresolved if the module has
     * not yet been connected. This method does not trigger any USB or TCP transaction and can therefore be used in
     * a debugger.
     *
     * @return a string that describes the function
     *         (ex: Relay(MyCustomName.relay1)=RELAYLO1-123456.relay1)
     */
    describe(): Promise<string>;
    /**
     * Returns the unique hardware identifier of the function in the form SERIAL.FUNCTIONID.
     * The unique hardware identifier is composed of the device serial
     * number and of the hardware identifier of the function (for example RELAYLO1-123456.relay1).
     *
     * @return a string that uniquely identifies the function (ex: RELAYLO1-123456.relay1)
     *
     * On failure, throws an exception or returns  YFunction.HARDWAREID_INVALID.
     */
    get_hardwareId(): Promise<string>;
    /**
     * Returns the hardware identifier of the function, without reference to the module. For example
     * relay1
     *
     * @return a string that identifies the function (ex: relay1)
     *
     * On failure, throws an exception or returns  YFunction.FUNCTIONID_INVALID.
     */
    get_functionId(): Promise<string>;
    imm_get_functionId(): string;
    /**
     * Returns a global identifier of the function in the format MODULE_NAME&#46;FUNCTION_NAME.
     * The returned string uses the logical names of the module and of the function if they are defined,
     * otherwise the serial number of the module and the hardware identifier of the function
     * (for example: MyCustomName.relay1)
     *
     * @return a string that uniquely identifies the function using logical names
     *         (ex: MyCustomName.relay1)
     *
     * On failure, throws an exception or returns  YFunction.FRIENDLYNAME_INVALID.
     */
    get_friendlyName(): Promise<string>;
    /** Store and parse a an API request for current function
     *
     * @param {YFuncRequest} yreq
     * @param {number} msValidity
     */
    _parse(yreq: YFuncRequest, msValidity: number): Promise<void>;
    /**
     ** Helpers for built-in classes
     **

    // Helper for initializing standard attributes (used in particular by built-in classes)
    async _i(): Promise<void>
    {
        let arr_attrNames: string[] = this.constructor._attrList;
        this._className = this.constructor.name.slice(1);
        for(let i = 0; i < arr_attrNames.length; i++) {
            this['_'+arr_attrNames[i]] = this.constructor[arr_attrNames[i].toUpperCase()+'_INVALID'];
        }
    }

    // Helper for simple accessors (used in particular by built-in classes)
    async _g(str_attr): Promise<object>
    {
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != YAPI_SUCCESS) {
                return this.constructor[str_attr.toLocaleUpperCase()+'_INVALID'];
            }
        }
        return this['_'+str_attr];
    }

    // Helper for simple accessors (used in particular by built-in classes)
    async _s(str_attr, obj_val): Promise<number>
    {
        return this._setAttr(str_attr, String(obj_val));
    }

    // Helper for completing and exporting the class; used by built-in classes
    static _E(arr_attrlist)
    {
        let className = this.name.slice(1);
        this._attrList = arr_attrlist;
        for(let i = 0; i < arr_attrlist.length; i++) {
            let attrname = arr_attrlist[i];
            let getMethod = 'get_'+attrname;
            this.prototype[getMethod] = async function(): Promise<object> { return this._g(attrname); };
        }
        this['Find'+className] = function(func) {
            let str_classname = this.name.slice(1);
            let obj: YFunction;
            obj = YFunction._FindFromCache(str_classname, func);
            if (obj == null) {
                obj = new this(YAPI, func);
                YFunction._AddToCache(str_classname, func, obj);
            }
            return obj;
        };
        this['First'+className] = function() {
            let str_classname = this.name.slice(1);
            let next_hwid = YAPI.imm_getFirstHardwareId(str_classname);
            if(next_hwid == null) return null;
            return this['Find'+className](next_hwid);
        };
        this.prototype['next'+className] = function() {
            let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
            if(resolve.errorType != YAPI.SUCCESS) return null;
            let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
            if(next_hwid == null) return null;
            return this.constructor['Find'+className](next_hwid);
        };
        this.imm_Init();
    }

    ********/
    isOnline_async(func: Function, ctx: object): void;
    load_async(ms_validiy: number, func: Function, ctx: object): void;
    /** Return the value of an attribute from function cache, after reloading it from device if needed
     * Note: the function cache is a typed (parsed) cache, contrarily to the agnostic device cache
     *
     * @param {string} str_attr
     * @return {string|null}
     */
    _getAttr(str_attr: string): Promise<string | null>;
    /** Return the value of an attribute from function cache, after reloading it from device if needed
     * Note: the function cache is a typed (parsed) cache, contrarily to the agnostic device cache
     *
     * @param {string} str_attr
     * @return {string|null}
     */
    _getFixedAttr(str_attr: string): Promise<string | null>;
    /** Escape a string for posting it as an URL
     *
     * @param {string} str_newval
     * @return {string}
     */
    imm_escapeAttr(str_newval: string): string;
    /** Change the value of an attribute on a device, and invalidate the cache
     *
     * @param {string} str_attr
     * @param {string} str_newval
     * @return {number}
     */
    _setAttr(str_attr: string, str_newval: string): Promise<number>;
    /** Execute an arbitrary HTTP GET request on the device and return the binary content
     *
     * @param {string} str_path
     * @return {Uint8Array}
     */
    _download(str_path: string): Promise<Uint8Array>;
    /** Execute an out-of-band HTTP GET request on the device and return the binary content.
     * The request may execute in parallel to regular requests currently in progress.
     *
     * @param {string} str_path
     * @return {Uint8Array}
     */
    _downloadOutOfBand(str_path: string): Promise<Uint8Array>;
    /** Upload a file to the filesystem, to the specified full path name.
     * If a file already exists with the same path name, its content is overwritten.
     * The progress callback function is called with two parameters: the number of
     * bytes uploaded so far and the total size to be uploaded.
     *
     * @param {string} str_path
     * @param {Uint8Array|string|number[]} bin_content
     * @param {YDownloadProgressCallback} fun_progressCb
     * @return {object}
     */
    _uploadWithProgress(str_path: string, bin_content: Uint8Array | string | number[], fun_progressCb: YDownloadProgressCallback | null): Promise<YHTTPRequest>;
    /** Upload a file to the filesystem, to the specified full path name.
     * If a file already exists with the same path name, its content is overwritten.
     * The progress callback function is called with two parameters: the number of
     * bytes uploaded so far and the total size to be uploaded.
     *
     * @param {string} str_path
     * @param {Uint8Array|string|number[]} bin_content
     * @return {object}
     */
    _uploadEx(str_path: string, bin_content: Uint8Array | string | number[]): Promise<Uint8Array>;
    /** Upload a file to the filesystem, to the specified full path name.
     * If a file already exists with the same path name, its content is overwritten.
     *
     * @param {string} str_path
     * @param {Uint8Array|string|number[]} bin_content
     * @return {object}
     */
    _upload(str_path: string, bin_content: Uint8Array | string | number[]): Promise<number>;
    /**
     * Waits for all pending asynchronous commands on the module to complete, and invoke
     * the user-provided callback function. The callback function can therefore freely
     * issue synchronous or asynchronous commands, without risking to block the
     * JavaScript VM.
     *
     * @param callback : callback function that is invoked when all pending commands on
     *         the module are completed.
     *         The callback function receives two arguments: the caller-specific
     *         context object and the receiving function object.
     * @param context : caller-specific object that is passed as-is to the callback function
     *
     * @return nothing.
     */
    wait_async(callback: Function, context: object): number;
    /** Get a value from a JSON buffer
     *
     * @param bin_jsonbuff {Uint8Array}
     * @param str_key {string}
     * @return {string}
     **/
    imm_json_get_key(bin_jsonbuff: Uint8Array, str_key: string): string;
    /** Get a string from a JSON buffer
     *
     * @param bin_jsonbuff {Uint8Array}
     * @return {string}
     **/
    imm_json_get_string(bin_jsonbuff: Uint8Array): string;
    /** Get an array of strings from a JSON buffer
     *
     * @param bin_jsonbuff {Uint8Array}
     * @return {string[]}
     **/
    imm_json_get_array(bin_jsonbuff: Uint8Array): string[];
    /** Get an array of strings from a JSON buffer
     *
     * @param str_json {string}
     * @param str_path {string}
     * @return {string}
     **/
    imm_get_json_path(str_json: string, str_path: string): string;
    /** Get a string from a JSON string
     *
     * @param str_json {string}
     * @return {string}
     **/
    imm_decode_json_string(str_json: string): string;
    /** Method used to cache DataStream objects (new DataLogger)
     *
     * @param obj_dataset {YDataSet}
     * @param str_def {string}
     * @return {YDataStream}
     **/
    imm_findDataStream(obj_dataset: YDataSet, str_def: string): YDataStream | null;
    clearDataStreamCache(): Promise<void>;
    /**
     * Checks if the function is currently reachable, without raising any error.
     * If there is a cached value for the function in cache, that has not yet
     * expired, the device is considered reachable.
     * No exception is raised if there is an error while trying to contact the
     * device hosting the function.
     *
     * @return true if the function can be reached, and false otherwise
     */
    isOnline(): Promise<boolean>;
    /**
     * Returns the numerical error code of the latest error with the function.
     * This method is mostly useful when using the Yoctopuce library with
     * exceptions disabled.
     *
     * @return a number corresponding to the code of the latest error that occurred while
     *         using the function object
     */
    get_errorType(): number;
    /**
     * Returns the error message of the latest error with the function.
     * This method is mostly useful when using the Yoctopuce library with
     * exceptions disabled.
     *
     * @return a string corresponding to the latest error message that occured while
     *         using the function object
     */
    get_errorMessage(): string;
    /**
     * Preloads the function cache with a specified validity duration.
     * By default, whenever accessing a device, all function attributes
     * are kept in cache for the standard duration (5 ms). This method can be
     * used to temporarily mark the cache as valid for a longer period, in order
     * to reduce network traffic for instance.
     *
     * @param msValidity : an integer corresponding to the validity attributed to the
     *         loaded function parameters, in milliseconds
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    load(msValidity: number): Promise<number>;
    /**
     * Invalidates the cache. Invalidates the cache of the function attributes. Forces the
     * next call to get_xxx() or loadxxx() to use values that come from the device.
     *
     * @noreturn
     */
    clearCache(): Promise<void>;
    /**
     * Gets the YModule object for the device on which the function is located.
     * If the function cannot be located on any module, the returned instance of
     * YModule is not shown as on-line.
     *
     * @return {YModule} an instance of YModule
     */
    module(): Promise<YModule>;
    /**
     * Gets the YModule object for the device on which the function is located.
     * If the function cannot be located on any module, the returned instance of
     * YModule is not shown as on-line.
     *
     * @return an instance of YModule
     */
    get_module(): Promise<YModule>;
    /**
     * Returns a unique identifier of type YFUN_DESCR corresponding to the function.
     * This identifier can be used to test if two instances of YFunction reference the same
     * physical function on the same physical device.
     *
     * @return an identifier of type YFUN_DESCR.
     *
     * If the function has never been contacted, the returned value is Y$CLASSNAME$.FUNCTIONDESCRIPTOR_INVALID.
     */
    get_functionDescriptor(): Promise<string>;
    /**
     * Returns the value of the userData attribute, as previously stored using method
     * set_userData.
     * This attribute is never touched directly by the API, and is at disposal of the caller to
     * store a context.
     *
     * @return the object stored previously by the caller.
     */
    get_userData(): Promise<object | null>;
    /**
     * Stores a user context provided as argument in the userData attribute of the function.
     * This attribute is never touched by the API, and is at disposal of the caller to store a context.
     *
     * @param data : any kind of object to be stored
     * @noreturn
     */
    set_userData(data: object | null): Promise<void>;
}
export declare namespace YFunction {
    const FUNCTIONDESCRIPTOR_INVALID: string;
    const HARDWAREID_INVALID: string;
    const FUNCTIONID_INVALID: string;
    const FRIENDLYNAME_INVALID: string;
    interface ValueCallback {
        (func: YFunction, value: string): void;
    }
}
/**
 * YModule Class: Global parameters control interface for all Yoctopuce devices
 *
 * The YModule class can be used with all Yoctopuce USB devices.
 * It can be used to control the module global parameters, and
 * to enumerate the functions provided by each module.
 */
export declare class YModule extends YFunction {
    _className: string;
    _productName: string;
    _serialNumber: string;
    _productId: number;
    _productRelease: number;
    _firmwareRelease: string;
    _persistentSettings: YModule.PERSISTENTSETTINGS;
    _luminosity: number;
    _beacon: YModule.BEACON;
    _upTime: number;
    _usbCurrent: number;
    _rebootCountdown: number;
    _userVar: number;
    _valueCallbackModule: YModule.ValueCallback | null;
    _logCallback: YModule.LogCallback | null;
    _confChangeCallback: YModule.ConfigChangeCallback | null;
    _beaconCallback: YModule.BeaconCallback | null;
    readonly PRODUCTNAME_INVALID: string;
    readonly SERIALNUMBER_INVALID: string;
    readonly PRODUCTID_INVALID: number;
    readonly PRODUCTRELEASE_INVALID: number;
    readonly FIRMWARERELEASE_INVALID: string;
    readonly PERSISTENTSETTINGS_LOADED: YModule.PERSISTENTSETTINGS;
    readonly PERSISTENTSETTINGS_SAVED: YModule.PERSISTENTSETTINGS;
    readonly PERSISTENTSETTINGS_MODIFIED: YModule.PERSISTENTSETTINGS;
    readonly PERSISTENTSETTINGS_INVALID: YModule.PERSISTENTSETTINGS;
    readonly LUMINOSITY_INVALID: number;
    readonly BEACON_OFF: YModule.BEACON;
    readonly BEACON_ON: YModule.BEACON;
    readonly BEACON_INVALID: YModule.BEACON;
    readonly UPTIME_INVALID: number;
    readonly USBCURRENT_INVALID: number;
    readonly REBOOTCOUNTDOWN_INVALID: number;
    readonly USERVAR_INVALID: number;
    static readonly PRODUCTNAME_INVALID: string;
    static readonly SERIALNUMBER_INVALID: string;
    static readonly PRODUCTID_INVALID: number;
    static readonly PRODUCTRELEASE_INVALID: number;
    static readonly FIRMWARERELEASE_INVALID: string;
    static readonly PERSISTENTSETTINGS_LOADED: YModule.PERSISTENTSETTINGS;
    static readonly PERSISTENTSETTINGS_SAVED: YModule.PERSISTENTSETTINGS;
    static readonly PERSISTENTSETTINGS_MODIFIED: YModule.PERSISTENTSETTINGS;
    static readonly PERSISTENTSETTINGS_INVALID: YModule.PERSISTENTSETTINGS;
    static readonly LUMINOSITY_INVALID: number;
    static readonly BEACON_OFF: YModule.BEACON;
    static readonly BEACON_ON: YModule.BEACON;
    static readonly BEACON_INVALID: YModule.BEACON;
    static readonly UPTIME_INVALID: number;
    static readonly USBCURRENT_INVALID: number;
    static readonly REBOOTCOUNTDOWN_INVALID: number;
    static readonly USERVAR_INVALID: number;
    constructor(yapi: YAPIContext, func: string);
    _throw(int_errType: number, str_errMsg: string, obj_retVal?: any): any;
    static _updateModuleCallbackList(YModule_module: YModule, bool_add: boolean): Promise<void>;
    /** Return the internal device object hosting the function
     *
     * @return {YDevice}
     *
     * Raise an error if not found
     */
    imm_getDev(): YDevice;
    /**
     * Forces a full redetection of the device, in case the functions changed
     *
     * @noreturn
     */
    forceDeviceRefresh(): Promise<void>;
    /**
     * Returns the number of functions (beside the "module" interface) available on the module.
     *
     * @return the number of functions on the module
     *
     * On failure, throws an exception or returns a negative error code.
     */
    functionCount(): Promise<number>;
    /**
     * Retrieves the hardware identifier of the <i>n</i>th function on the module.
     *
     * @param functionIndex : the index of the function for which the information is desired, starting at
     * 0 for the first function.
     *
     * @return a string corresponding to the unambiguous hardware identifier of the requested module function
     *
     * On failure, throws an exception or returns an empty string.
     */
    functionId(functionIndex: number): Promise<string>;
    /**
     * Retrieves the type of the <i>n</i>th function on the module.
     *
     * @param functionIndex : the index of the function for which the information is desired, starting at
     * 0 for the first function.
     *
     * @return a string corresponding to the type of the function
     *
     * On failure, throws an exception or returns an empty string.
     */
    functionType(functionIndex: number): Promise<string>;
    /**
     * Retrieves the base type of the <i>n</i>th function on the module.
     * For instance, the base type of all measuring functions is "Sensor".
     *
     * @param functionIndex : the index of the function for which the information is desired, starting at
     * 0 for the first function.
     *
     * @return a string corresponding to the base type of the function
     *
     * On failure, throws an exception or returns an empty string.
     */
    functionBaseType(functionIndex: number): Promise<string>;
    /**
     * Retrieves the logical name of the <i>n</i>th function on the module.
     *
     * @param functionIndex : the index of the function for which the information is desired, starting at
     * 0 for the first function.
     *
     * @return a string corresponding to the logical name of the requested module function
     *
     * On failure, throws an exception or returns an empty string.
     */
    functionName(functionIndex: number): Promise<string>;
    /**
     * Retrieves the advertised value of the <i>n</i>th function on the module.
     *
     * @param functionIndex : the index of the function for which the information is desired, starting at
     * 0 for the first function.
     *
     * @return a short string (up to 6 characters) corresponding to the advertised value of the requested
     * module function
     *
     * On failure, throws an exception or returns an empty string.
     */
    functionValue(functionIndex: number): Promise<string>;
    /**
     * Returns the logical name of the module.
     *
     * @return a string corresponding to the logical name of the module
     *
     * On failure, throws an exception or returns YModule.LOGICALNAME_INVALID.
     */
    get_logicalName(): Promise<string>;
    set_logicalName(newval: string): Promise<number>;
    imm_flattenJsonStruct_internal(jsoncomplex: Uint8Array): Uint8Array;
    get_subDevices_internal(): Promise<string[]>;
    get_parentHub_internal(): Promise<string>;
    get_url_internal(): Promise<string>;
    _startStopDevLog_internal(str_serial: string, bool_start: boolean): Promise<void>;
    imm_parseAttr(name: string, val: any): 0 | 1;
    /**
     * Returns the commercial name of the module, as set by the factory.
     *
     * @return a string corresponding to the commercial name of the module, as set by the factory
     *
     * On failure, throws an exception or returns YModule.PRODUCTNAME_INVALID.
     */
    get_productName(): Promise<string>;
    /**
     * Returns the serial number of the module, as set by the factory.
     *
     * @return a string corresponding to the serial number of the module, as set by the factory
     *
     * On failure, throws an exception or returns YModule.SERIALNUMBER_INVALID.
     */
    get_serialNumber(): Promise<string>;
    /**
     * Returns the USB device identifier of the module.
     *
     * @return an integer corresponding to the USB device identifier of the module
     *
     * On failure, throws an exception or returns YModule.PRODUCTID_INVALID.
     */
    get_productId(): Promise<number>;
    /**
     * Returns the release number of the module hardware, preprogrammed at the factory.
     * The original hardware release returns value 1, revision B returns value 2, etc.
     *
     * @return an integer corresponding to the release number of the module hardware, preprogrammed at the factory
     *
     * On failure, throws an exception or returns YModule.PRODUCTRELEASE_INVALID.
     */
    get_productRelease(): Promise<number>;
    /**
     * Returns the version of the firmware embedded in the module.
     *
     * @return a string corresponding to the version of the firmware embedded in the module
     *
     * On failure, throws an exception or returns YModule.FIRMWARERELEASE_INVALID.
     */
    get_firmwareRelease(): Promise<string>;
    /**
     * Returns the current state of persistent module settings.
     *
     * @return a value among YModule.PERSISTENTSETTINGS_LOADED, YModule.PERSISTENTSETTINGS_SAVED and
     * YModule.PERSISTENTSETTINGS_MODIFIED corresponding to the current state of persistent module settings
     *
     * On failure, throws an exception or returns YModule.PERSISTENTSETTINGS_INVALID.
     */
    get_persistentSettings(): Promise<YModule.PERSISTENTSETTINGS>;
    set_persistentSettings(newval: YModule.PERSISTENTSETTINGS): Promise<number>;
    /**
     * Returns the luminosity of the  module informative LEDs (from 0 to 100).
     *
     * @return an integer corresponding to the luminosity of the  module informative LEDs (from 0 to 100)
     *
     * On failure, throws an exception or returns YModule.LUMINOSITY_INVALID.
     */
    get_luminosity(): Promise<number>;
    /**
     * Changes the luminosity of the module informative leds. The parameter is a
     * value between 0 and 100.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : an integer corresponding to the luminosity of the module informative leds
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_luminosity(newval: number): Promise<number>;
    /**
     * Returns the state of the localization beacon.
     *
     * @return either YModule.BEACON_OFF or YModule.BEACON_ON, according to the state of the localization beacon
     *
     * On failure, throws an exception or returns YModule.BEACON_INVALID.
     */
    get_beacon(): Promise<YModule.BEACON>;
    /**
     * Turns on or off the module localization beacon.
     *
     * @param newval : either YModule.BEACON_OFF or YModule.BEACON_ON
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_beacon(newval: YModule.BEACON): Promise<number>;
    /**
     * Returns the number of milliseconds spent since the module was powered on.
     *
     * @return an integer corresponding to the number of milliseconds spent since the module was powered on
     *
     * On failure, throws an exception or returns YModule.UPTIME_INVALID.
     */
    get_upTime(): Promise<number>;
    /**
     * Returns the current consumed by the module on the USB bus, in milli-amps.
     *
     * @return an integer corresponding to the current consumed by the module on the USB bus, in milli-amps
     *
     * On failure, throws an exception or returns YModule.USBCURRENT_INVALID.
     */
    get_usbCurrent(): Promise<number>;
    /**
     * Returns the remaining number of seconds before the module restarts, or zero when no
     * reboot has been scheduled.
     *
     * @return an integer corresponding to the remaining number of seconds before the module restarts, or zero when no
     *         reboot has been scheduled
     *
     * On failure, throws an exception or returns YModule.REBOOTCOUNTDOWN_INVALID.
     */
    get_rebootCountdown(): Promise<number>;
    set_rebootCountdown(newval: number): Promise<number>;
    /**
     * Returns the value previously stored in this attribute.
     * On startup and after a device reboot, the value is always reset to zero.
     *
     * @return an integer corresponding to the value previously stored in this attribute
     *
     * On failure, throws an exception or returns YModule.USERVAR_INVALID.
     */
    get_userVar(): Promise<number>;
    /**
     * Stores a 32 bit value in the device RAM. This attribute is at programmer disposal,
     * should he need to store a state variable.
     * On startup and after a device reboot, the value is always reset to zero.
     *
     * @param newval : an integer
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_userVar(newval: number): Promise<number>;
    /**
     * Allows you to find a module from its serial number or from its logical name.
     *
     * This function does not require that the module is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YModule.isOnline() to test if the module is
     * indeed online at a given time. In case of ambiguity when looking for
     * a module by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string containing either the serial number or
     *         the logical name of the desired module
     *
     * @return a YModule object allowing you to drive the module
     *         or get additional information on the module.
     */
    static FindModule(func: string): YModule;
    /**
     * Retrieves a module for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the module is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YModule.isOnline() to test if the module is
     * indeed online at a given time. In case of ambiguity when looking for
     * a module by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx : a YAPI context
     * @param func : a string that uniquely characterizes the module, for instance
     *         MyDevice.module.
     *
     * @return a YModule object allowing you to drive the module.
     */
    static FindModuleInContext(yctx: YAPIContext, func: string): YModule;
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
    registerValueCallback(callback: YModule.ValueCallback | null): Promise<number>;
    _invokeValueCallback(value: string): Promise<number>;
    get_productNameAndRevision(): Promise<string>;
    /**
     * Saves current settings in the nonvolatile memory of the module.
     * Warning: the number of allowed save operations during a module life is
     * limited (about 100000 cycles). Do not call this function within a loop.
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    saveToFlash(): Promise<number>;
    /**
     * Reloads the settings stored in the nonvolatile memory, as
     * when the module is powered on.
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    revertFromFlash(): Promise<number>;
    /**
     * Schedules a simple module reboot after the given number of seconds.
     *
     * @param secBeforeReboot : number of seconds before rebooting
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    reboot(secBeforeReboot: number): Promise<number>;
    /**
     * Schedules a module reboot into special firmware update mode.
     *
     * @param secBeforeReboot : number of seconds before rebooting
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    triggerFirmwareUpdate(secBeforeReboot: number): Promise<number>;
    _startStopDevLog(serial: string, start: boolean): Promise<void>;
    /**
     * Registers a device log callback function. This callback will be called each time
     * that a module sends a new log message. Mostly useful to debug a Yoctopuce module.
     *
     * @param callback : the callback function to call, or a null pointer. The callback function should take two
     *         arguments: the module object that emitted the log message, and the character string containing the log.
     *         On failure, throws an exception or returns a negative error code.
     */
    registerLogCallback(callback: YModule.LogCallback | null): Promise<number>;
    get_logCallback(): Promise<YModule.LogCallback | null>;
    /**
     * Register a callback function, to be called when a persistent settings in
     * a device configuration has been changed (e.g. change of unit, etc).
     *
     * @param callback : a procedure taking a YModule parameter, or null
     *         to unregister a previously registered  callback.
     */
    registerConfigChangeCallback(callback: YModule.ConfigChangeCallback | null): Promise<number>;
    _invokeConfigChangeCallback(): Promise<number>;
    /**
     * Register a callback function, to be called when the localization beacon of the module
     * has been changed. The callback function should take two arguments: the YModule object of
     * which the beacon has changed, and an integer describing the new beacon state.
     *
     * @param callback : The callback function to call, or null to unregister a
     *         previously registered callback.
     */
    registerBeaconCallback(callback: YModule.BeaconCallback | null): Promise<number>;
    _invokeBeaconCallback(beaconState: number): Promise<number>;
    /**
     * Triggers a configuration change callback, to check if they are supported or not.
     */
    triggerConfigChangeCallback(): Promise<number>;
    /**
     * Tests whether the byn file is valid for this module. This method is useful to test if the module
     * needs to be updated.
     * It is possible to pass a directory as argument instead of a file. In this case, this method returns
     * the path of the most recent
     * appropriate .byn file. If the parameter onlynew is true, the function discards firmwares that are older or
     * equal to the installed firmware.
     *
     * @param path : the path of a byn file or a directory that contains byn files
     * @param onlynew : returns only files that are strictly newer
     *
     * @return the path of the byn file to use or a empty string if no byn files matches the requirement
     *
     * On failure, throws an exception or returns a string that start with "error:".
     */
    checkFirmware(path: string, onlynew: boolean): Promise<string>;
    /**
     * Prepares a firmware update of the module. This method returns a YFirmwareUpdate object which
     * handles the firmware update process.
     *
     * @param path : the path of the .byn file to use.
     * @param force : true to force the firmware update even if some prerequisites appear not to be met
     *
     * @return a YFirmwareUpdate object or NULL on error.
     */
    updateFirmwareEx(path: string, force: boolean): Promise<YFirmwareUpdate>;
    /**
     * Prepares a firmware update of the module. This method returns a YFirmwareUpdate object which
     * handles the firmware update process.
     *
     * @param path : the path of the .byn file to use.
     *
     * @return a YFirmwareUpdate object or NULL on error.
     */
    updateFirmware(path: string): Promise<YFirmwareUpdate>;
    /**
     * Returns all the settings and uploaded files of the module. Useful to backup all the
     * logical names, calibrations parameters, and uploaded files of a device.
     *
     * @return a binary buffer with all the settings.
     *
     * On failure, throws an exception or returns an binary object of size 0.
     */
    get_allSettings(): Promise<Uint8Array>;
    loadThermistorExtra(funcId: string, jsonExtra: string): Promise<number>;
    set_extraSettings(jsonExtra: string): Promise<number>;
    /**
     * Restores all the settings and uploaded files to the module.
     * This method is useful to restore all the logical names and calibrations parameters,
     * uploaded files etc. of a device from a backup.
     * Remember to call the saveToFlash() method of the module if the
     * modifications must be kept.
     *
     * @param settings : a binary buffer with all the settings.
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_allSettingsAndFiles(settings: Uint8Array): Promise<number>;
    /**
     * Tests if the device includes a specific function. This method takes a function identifier
     * and returns a boolean.
     *
     * @param funcId : the requested function identifier
     *
     * @return true if the device has the function identifier
     */
    hasFunction(funcId: string): Promise<boolean>;
    /**
     * Retrieve all hardware identifier that match the type passed in argument.
     *
     * @param funType : The type of function (Relay, LightSensor, Voltage,...)
     *
     * @return an array of strings.
     */
    get_functionIds(funType: string): Promise<string[]>;
    imm_flattenJsonStruct(jsoncomplex: Uint8Array): Uint8Array;
    calibVersion(cparams: string): Promise<number>;
    calibScale(unit_name: string, sensorType: string): Promise<number>;
    calibOffset(unit_name: string): Promise<number>;
    calibConvert(param: string, currentFuncValue: string, unit_name: string, sensorType: string): Promise<string>;
    _tryExec(url: string): Promise<number>;
    /**
     * Restores all the settings of the device. Useful to restore all the logical names and calibrations parameters
     * of a module from a backup.Remember to call the saveToFlash() method of the module if the
     * modifications must be kept.
     *
     * @param settings : a binary buffer with all the settings.
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_allSettings(settings: Uint8Array): Promise<number>;
    /**
     * Adds a file to the uploaded data at the next HTTP callback.
     * This function only affects the next HTTP callback and only works in
     * HTTP callback mode.
     *
     * @param filename : the name of the file to upload at the next HTTP callback
     *
     * @return nothing.
     */
    addFileToHTTPCallback(filename: string): Promise<number>;
    /**
     * Returns the unique hardware identifier of the module.
     * The unique hardware identifier is made of the device serial
     * number followed by string ".module".
     *
     * @return a string that uniquely identifies the module
     */
    get_hardwareId(): Promise<string>;
    /**
     * Downloads the specified built-in file and returns a binary buffer with its content.
     *
     * @param pathname : name of the new file to load
     *
     * @return a binary buffer with the file content
     *
     * On failure, throws an exception or returns  YAPI.INVALID_STRING.
     */
    download(pathname: string): Promise<Uint8Array>;
    /**
     * Returns the icon of the module. The icon is a PNG image and does not
     * exceeds 1536 bytes.
     *
     * @return a binary buffer with module icon, in png format.
     *         On failure, throws an exception or returns  YAPI.INVALID_STRING.
     */
    get_icon2d(): Promise<Uint8Array>;
    /**
     * Returns a string with last logs of the module. This method return only
     * logs that are still in the module.
     *
     * @return a string with last logs of the module.
     *         On failure, throws an exception or returns  YAPI.INVALID_STRING.
     */
    get_lastLogs(): Promise<string>;
    /**
     * Adds a text message to the device logs. This function is useful in
     * particular to trace the execution of HTTP callbacks. If a newline
     * is desired after the message, it must be included in the string.
     *
     * @param text : the string to append to the logs.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    log(text: string): Promise<number>;
    /**
     * Returns a list of all the modules that are plugged into the current module.
     * This method only makes sense when called for a YoctoHub/VirtualHub.
     * Otherwise, an empty array will be returned.
     *
     * @return an array of strings containing the sub modules.
     */
    get_subDevices(): Promise<string[]>;
    /**
     * Returns the serial number of the YoctoHub on which this module is connected.
     * If the module is connected by USB, or if the module is the root YoctoHub, an
     * empty string is returned.
     *
     * @return a string with the serial number of the YoctoHub or an empty string
     */
    get_parentHub(): Promise<string>;
    /**
     * Returns the URL used to access the module. If the module is connected by USB, the
     * string 'usb' is returned.
     *
     * @return a string with the URL of the module.
     */
    get_url(): Promise<string>;
    /**
     * Continues the module enumeration started using yFirstModule().
     * Caution: You can't make any assumption about the returned modules order.
     * If you want to find a specific module, use Module.findModule()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YModule object, corresponding to
     *         the next module found, or a null pointer
     *         if there are no more modules to enumerate.
     */
    nextModule(): YModule | null;
    /**
     * Starts the enumeration of modules currently accessible.
     * Use the method YModule.nextModule() to iterate on the
     * next modules.
     *
     * @return a pointer to a YModule object, corresponding to
     *         the first module currently online, or a null pointer
     *         if there are none.
     */
    static FirstModule(): YModule | null;
    /**
     * Retrieves the first Module in a given context
     *
     * @param yctx {YAPIContext}
     *
     * @returns {YModule}
     */
    static FirstModuleInContext(yctx: YAPIContext): YModule | null;
}
export declare namespace YModule {
    interface LogCallback {
        (module: YModule, msg: string): void;
    }
    interface ConfigChangeCallback {
        (module: YModule): void;
    }
    interface BeaconCallback {
        (module: YModule, beacon: number): void;
    }
    const enum PERSISTENTSETTINGS {
        LOADED = 0,
        SAVED = 1,
        MODIFIED = 2,
        INVALID = -1
    }
    const enum BEACON {
        OFF = 0,
        ON = 1,
        INVALID = -1
    }
    interface ValueCallback {
        (func: YModule, value: string): void;
    }
}
/**
 * YSensor Class: Sensor function interface.
 *
 * The YSensor class is the parent class for all Yoctopuce sensor types. It can be
 * used to read the current value and unit of any sensor, read the min/max
 * value, configure autonomous recording frequency and access recorded data.
 * It also provide a function to register a callback invoked each time the
 * observed value changes, or at a predefined interval. Using this class rather
 * than a specific subclass makes it possible to create generic applications
 * that work with any Yoctopuce sensor, even those that do not yet exist.
 * Note: The YAnButton class is the only analog input which does not inherit
 * from YSensor.
 */
export declare class YSensor extends YFunction {
    _className: string;
    _unit: string;
    _currentValue: number;
    _lowestValue: number;
    _highestValue: number;
    _currentRawValue: number;
    _logFrequency: string;
    _reportFrequency: string;
    _advMode: YSensor.ADVMODE;
    _calibrationParam: string;
    _resolution: number;
    _sensorState: number;
    _valueCallbackSensor: YSensor.ValueCallback | null;
    _timedReportCallbackSensor: YSensor.TimedReportCallback | null;
    _prevTimedReport: number;
    _iresol: number;
    _offset: number;
    _scale: number;
    _decexp: number;
    _caltyp: number;
    _calpar: number[];
    _calraw: number[];
    _calref: number[];
    imm_calhdl: yCalibrationHandler | null;
    readonly UNIT_INVALID: string;
    readonly CURRENTVALUE_INVALID: number;
    readonly LOWESTVALUE_INVALID: number;
    readonly HIGHESTVALUE_INVALID: number;
    readonly CURRENTRAWVALUE_INVALID: number;
    readonly LOGFREQUENCY_INVALID: string;
    readonly REPORTFREQUENCY_INVALID: string;
    readonly ADVMODE_IMMEDIATE: YSensor.ADVMODE;
    readonly ADVMODE_PERIOD_AVG: YSensor.ADVMODE;
    readonly ADVMODE_PERIOD_MIN: YSensor.ADVMODE;
    readonly ADVMODE_PERIOD_MAX: YSensor.ADVMODE;
    readonly ADVMODE_INVALID: YSensor.ADVMODE;
    readonly CALIBRATIONPARAM_INVALID: string;
    readonly RESOLUTION_INVALID: number;
    readonly SENSORSTATE_INVALID: number;
    static readonly UNIT_INVALID: string;
    static readonly CURRENTVALUE_INVALID: number;
    static readonly LOWESTVALUE_INVALID: number;
    static readonly HIGHESTVALUE_INVALID: number;
    static readonly CURRENTRAWVALUE_INVALID: number;
    static readonly LOGFREQUENCY_INVALID: string;
    static readonly REPORTFREQUENCY_INVALID: string;
    static readonly ADVMODE_IMMEDIATE: YSensor.ADVMODE;
    static readonly ADVMODE_PERIOD_AVG: YSensor.ADVMODE;
    static readonly ADVMODE_PERIOD_MIN: YSensor.ADVMODE;
    static readonly ADVMODE_PERIOD_MAX: YSensor.ADVMODE;
    static readonly ADVMODE_INVALID: YSensor.ADVMODE;
    static readonly CALIBRATIONPARAM_INVALID: string;
    static readonly RESOLUTION_INVALID: number;
    static readonly SENSORSTATE_INVALID: number;
    constructor(yapi: YAPIContext, func: string);
    imm_parseAttr(name: string, val: any): 0 | 1;
    /**
     * Returns the measuring unit for the measure.
     *
     * @return a string corresponding to the measuring unit for the measure
     *
     * On failure, throws an exception or returns YSensor.UNIT_INVALID.
     */
    get_unit(): Promise<string>;
    /**
     * Returns the current value of the measure, in the specified unit, as a floating point number.
     * Note that a get_currentValue() call will *not* start a measure in the device, it
     * will just return the last measure that occurred in the device. Indeed, internally, each Yoctopuce
     * devices is continuously making measurements at a hardware specific frequency.
     *
     * If continuously calling  get_currentValue() leads you to performances issues, then
     * you might consider to switch to callback programming model. Check the "advanced
     * programming" chapter in in your device user manual for more information.
     *
     * @return a floating point number corresponding to the current value of the measure, in the specified
     * unit, as a floating point number
     *
     * On failure, throws an exception or returns YSensor.CURRENTVALUE_INVALID.
     */
    get_currentValue(): Promise<number>;
    /**
     * Changes the recorded minimal value observed. Can be used to reset the value returned
     * by get_lowestValue().
     *
     * @param newval : a floating point number corresponding to the recorded minimal value observed
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_lowestValue(newval: number): Promise<number>;
    /**
     * Returns the minimal value observed for the measure since the device was started.
     * Can be reset to an arbitrary value thanks to set_lowestValue().
     *
     * @return a floating point number corresponding to the minimal value observed for the measure since
     * the device was started
     *
     * On failure, throws an exception or returns YSensor.LOWESTVALUE_INVALID.
     */
    get_lowestValue(): Promise<number>;
    /**
     * Changes the recorded maximal value observed. Can be used to reset the value returned
     * by get_lowestValue().
     *
     * @param newval : a floating point number corresponding to the recorded maximal value observed
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_highestValue(newval: number): Promise<number>;
    /**
     * Returns the maximal value observed for the measure since the device was started.
     * Can be reset to an arbitrary value thanks to set_highestValue().
     *
     * @return a floating point number corresponding to the maximal value observed for the measure since
     * the device was started
     *
     * On failure, throws an exception or returns YSensor.HIGHESTVALUE_INVALID.
     */
    get_highestValue(): Promise<number>;
    /**
     * Returns the uncalibrated, unrounded raw value returned by the
     * sensor, in the specified unit, as a floating point number.
     *
     * @return a floating point number corresponding to the uncalibrated, unrounded raw value returned by the
     *         sensor, in the specified unit, as a floating point number
     *
     * On failure, throws an exception or returns YSensor.CURRENTRAWVALUE_INVALID.
     */
    get_currentRawValue(): Promise<number>;
    /**
     * Returns the datalogger recording frequency for this function, or "OFF"
     * when measures are not stored in the data logger flash memory.
     *
     * @return a string corresponding to the datalogger recording frequency for this function, or "OFF"
     *         when measures are not stored in the data logger flash memory
     *
     * On failure, throws an exception or returns YSensor.LOGFREQUENCY_INVALID.
     */
    get_logFrequency(): Promise<string>;
    /**
     * Changes the datalogger recording frequency for this function.
     * The frequency can be specified as samples per second,
     * as sample per minute (for instance "15/m") or in samples per
     * hour (eg. "4/h"). To disable recording for this function, use
     * the value "OFF". Note that setting the  datalogger recording frequency
     * to a greater value than the sensor native sampling frequency is useless,
     * and even counterproductive: those two frequencies are not related.
     * Remember to call the saveToFlash() method of the module if the modification must be kept.
     *
     * @param newval : a string corresponding to the datalogger recording frequency for this function
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_logFrequency(newval: string): Promise<number>;
    /**
     * Returns the timed value notification frequency, or "OFF" if timed
     * value notifications are disabled for this function.
     *
     * @return a string corresponding to the timed value notification frequency, or "OFF" if timed
     *         value notifications are disabled for this function
     *
     * On failure, throws an exception or returns YSensor.REPORTFREQUENCY_INVALID.
     */
    get_reportFrequency(): Promise<string>;
    /**
     * Changes the timed value notification frequency for this function.
     * The frequency can be specified as samples per second,
     * as sample per minute (for instance "15/m") or in samples per
     * hour (e.g. "4/h"). To disable timed value notifications for this
     * function, use the value "OFF". Note that setting the  timed value
     * notification frequency to a greater value than the sensor native
     * sampling frequency is unless, and even counterproductive: those two
     * frequencies are not related.
     * Remember to call the saveToFlash() method of the module if the modification must be kept.
     *
     * @param newval : a string corresponding to the timed value notification frequency for this function
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_reportFrequency(newval: string): Promise<number>;
    /**
     * Returns the measuring mode used for the advertised value pushed to the parent hub.
     *
     * @return a value among YSensor.ADVMODE_IMMEDIATE, YSensor.ADVMODE_PERIOD_AVG,
     * YSensor.ADVMODE_PERIOD_MIN and YSensor.ADVMODE_PERIOD_MAX corresponding to the measuring mode used
     * for the advertised value pushed to the parent hub
     *
     * On failure, throws an exception or returns YSensor.ADVMODE_INVALID.
     */
    get_advMode(): Promise<YSensor.ADVMODE>;
    /**
     * Changes the measuring mode used for the advertised value pushed to the parent hub.
     * Remember to call the saveToFlash() method of the module if the modification must be kept.
     *
     * @param newval : a value among YSensor.ADVMODE_IMMEDIATE, YSensor.ADVMODE_PERIOD_AVG,
     * YSensor.ADVMODE_PERIOD_MIN and YSensor.ADVMODE_PERIOD_MAX corresponding to the measuring mode used
     * for the advertised value pushed to the parent hub
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_advMode(newval: YSensor.ADVMODE): Promise<number>;
    get_calibrationParam(): Promise<string>;
    set_calibrationParam(newval: string): Promise<number>;
    /**
     * Changes the resolution of the measured physical values. The resolution corresponds to the numerical precision
     * when displaying value. It does not change the precision of the measure itself.
     * Remember to call the saveToFlash() method of the module if the modification must be kept.
     *
     * @param newval : a floating point number corresponding to the resolution of the measured physical values
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_resolution(newval: number): Promise<number>;
    /**
     * Returns the resolution of the measured values. The resolution corresponds to the numerical precision
     * of the measures, which is not always the same as the actual precision of the sensor.
     * Remember to call the saveToFlash() method of the module if the modification must be kept.
     *
     * @return a floating point number corresponding to the resolution of the measured values
     *
     * On failure, throws an exception or returns YSensor.RESOLUTION_INVALID.
     */
    get_resolution(): Promise<number>;
    /**
     * Returns the sensor health state code, which is zero when there is an up-to-date measure
     * available or a positive code if the sensor is not able to provide a measure right now.
     *
     * @return an integer corresponding to the sensor health state code, which is zero when there is an
     * up-to-date measure
     *         available or a positive code if the sensor is not able to provide a measure right now
     *
     * On failure, throws an exception or returns YSensor.SENSORSTATE_INVALID.
     */
    get_sensorState(): Promise<number>;
    /**
     * Retrieves a sensor for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YSensor.isOnline() to test if the sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the sensor, for instance
     *         MyDevice..
     *
     * @return a YSensor object allowing you to drive the sensor.
     */
    static FindSensor(func: string): YSensor;
    /**
     * Retrieves a sensor for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YSensor.isOnline() to test if the sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx : a YAPI context
     * @param func : a string that uniquely characterizes the sensor, for instance
     *         MyDevice..
     *
     * @return a YSensor object allowing you to drive the sensor.
     */
    static FindSensorInContext(yctx: YAPIContext, func: string): YSensor;
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
    registerValueCallback(callback: YSensor.ValueCallback | null): Promise<number>;
    _invokeValueCallback(value: string): Promise<number>;
    _parserHelper(): Promise<number>;
    /**
     * Checks if the sensor is currently able to provide an up-to-date measure.
     * Returns false if the device is unreachable, or if the sensor does not have
     * a current measure to transmit. No exception is raised if there is an error
     * while trying to contact the device hosting $THEFUNCTION$.
     *
     * @return true if the sensor can provide an up-to-date measure, and false otherwise
     */
    isSensorReady(): Promise<boolean>;
    /**
     * Returns the YDatalogger object of the device hosting the sensor. This method returns an object
     * that can control global parameters of the data logger. The returned object
     * should not be freed.
     *
     * @return an YDatalogger object, or null on error.
     */
    get_dataLogger(): Promise<YDataLogger | null>;
    /**
     * Starts the data logger on the device. Note that the data logger
     * will only save the measures on this sensor if the logFrequency
     * is not set to "OFF".
     *
     * @return YAPI.SUCCESS if the call succeeds.
     */
    startDataLogger(): Promise<number>;
    /**
     * Stops the datalogger on the device.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     */
    stopDataLogger(): Promise<number>;
    /**
     * Retrieves a YDataSet object holding historical data for this
     * sensor, for a specified time interval. The measures will be
     * retrieved from the data logger, which must have been turned
     * on at the desired time. See the documentation of the YDataSet
     * class for information on how to get an overview of the
     * recorded data, and how to load progressively a large set
     * of measures from the data logger.
     *
     * This function only works if the device uses a recent firmware,
     * as YDataSet objects are not supported by firmwares older than
     * version 13000.
     *
     * @param startTime : the start of the desired measure time interval,
     *         as a Unix timestamp, i.e. the number of seconds since
     *         January 1, 1970 UTC. The special value 0 can be used
     *         to include any measure, without initial limit.
     * @param endTime : the end of the desired measure time interval,
     *         as a Unix timestamp, i.e. the number of seconds since
     *         January 1, 1970 UTC. The special value 0 can be used
     *         to include any measure, without ending limit.
     *
     * @return an instance of YDataSet, providing access to historical
     *         data. Past measures can be loaded progressively
     *         using methods from the YDataSet object.
     */
    get_recordedData(startTime: number, endTime: number): Promise<YDataSet>;
    /**
     * Registers the callback function that is invoked on every periodic timed notification.
     * The callback is invoked only during the execution of ySleep or yHandleEvents.
     * This provides control over the time when the callback is triggered. For good responsiveness, remember to call
     * one of these two functions periodically. To unregister a callback, pass a null pointer as argument.
     *
     * @param callback : the callback function to call, or a null pointer. The callback function should take two
     *         arguments: the function object of which the value has changed, and an YMeasure object describing
     *         the new advertised value.
     * @noreturn
     */
    registerTimedReportCallback(callback: YSensor.TimedReportCallback | null): Promise<number>;
    _invokeTimedReportCallback(value: YMeasure): Promise<number>;
    /**
     * Configures error correction data points, in particular to compensate for
     * a possible perturbation of the measure caused by an enclosure. It is possible
     * to configure up to five correction points. Correction points must be provided
     * in ascending order, and be in the range of the sensor. The device will automatically
     * perform a linear interpolation of the error correction between specified
     * points. Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * For more information on advanced capabilities to refine the calibration of
     * sensors, please contact support@yoctopuce.com.
     *
     * @param rawValues : array of floating point numbers, corresponding to the raw
     *         values returned by the sensor for the correction points.
     * @param refValues : array of floating point numbers, corresponding to the corrected
     *         values for the correction points.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    calibrateFromPoints(rawValues: number[], refValues: number[]): Promise<number>;
    /**
     * Retrieves error correction data points previously entered using the method
     * calibrateFromPoints.
     *
     * @param rawValues : array of floating point numbers, that will be filled by the
     *         function with the raw sensor values for the correction points.
     * @param refValues : array of floating point numbers, that will be filled by the
     *         function with the desired values for the correction points.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    loadCalibrationPoints(rawValues: number[], refValues: number[]): Promise<number>;
    _encodeCalibrationPoints(rawValues: number[], refValues: number[]): Promise<string>;
    _applyCalibration(rawValue: number): Promise<number>;
    _decodeTimedReport(timestamp: number, duration: number, report: number[]): Promise<YMeasure>;
    imm_decodeVal(w: number): number;
    imm_decodeAvg(dw: number): number;
    /**
     * Continues the enumeration of sensors started using yFirstSensor().
     * Caution: You can't make any assumption about the returned sensors order.
     * If you want to find a specific a sensor, use Sensor.findSensor()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YSensor object, corresponding to
     *         a sensor currently online, or a null pointer
     *         if there are no more sensors to enumerate.
     */
    nextSensor(): YSensor | null;
    /**
     * Starts the enumeration of sensors currently accessible.
     * Use the method YSensor.nextSensor() to iterate on
     * next sensors.
     *
     * @return a pointer to a YSensor object, corresponding to
     *         the first sensor currently online, or a null pointer
     *         if there are none.
     */
    static FirstSensor(): YSensor | null;
    /**
     * Starts the enumeration of sensors currently accessible.
     * Use the method YSensor.nextSensor() to iterate on
     * next sensors.
     *
     * @param yctx : a YAPI context.
     *
     * @return a pointer to a YSensor object, corresponding to
     *         the first sensor currently online, or a null pointer
     *         if there are none.
     */
    static FirstSensorInContext(yctx: YAPIContext): YSensor | null;
}
export declare namespace YSensor {
    const enum ADVMODE {
        IMMEDIATE = 0,
        PERIOD_AVG = 1,
        PERIOD_MIN = 2,
        PERIOD_MAX = 3,
        INVALID = -1
    }
    interface ValueCallback {
        (func: YSensor, value: string): void;
    }
    interface TimedReportCallback {
        (func: YSensor, measure: YMeasure): void;
    }
}
/**
 * YMeasure Class: Measured value, returned in particular by the methods of the YDataSet class.
 *
 * YMeasure objects are used within the API to represent
 * a value measured at a specified time. These objects are
 * used in particular in conjunction with the YDataSet class,
 * but also for sensors periodic timed reports
 * (see sensor.registerTimedReportCallback).
 */
export declare class YMeasure {
    _start: number;
    _end: number;
    _minVal: number;
    _avgVal: number;
    _maxVal: number;
    constructor(float_start: number, float_end: number, float_minVal: number, float_avgVal: number, float_maxVal: number);
    /**
     * Returns the start time of the measure, relative to the Jan 1, 1970 UTC
     * (Unix timestamp). When the recording rate is higher then 1 sample
     * per second, the timestamp may have a fractional part.
     *
     * @return a floating point number corresponding to the number of seconds
     *         between the Jan 1, 1970 UTC and the beginning of this measure.
     */
    get_startTimeUTC(): number;
    /**
     * Returns the end time of the measure, relative to the Jan 1, 1970 UTC
     * (Unix timestamp). When the recording rate is higher than 1 sample
     * per second, the timestamp may have a fractional part.
     *
     * @return a floating point number corresponding to the number of seconds
     *         between the Jan 1, 1970 UTC and the end of this measure.
     */
    get_endTimeUTC(): number;
    /**
     * Returns the smallest value observed during the time interval
     * covered by this measure.
     *
     * @return a floating-point number corresponding to the smallest value observed.
     */
    get_minValue(): number;
    /**
     * Returns the average value observed during the time interval
     * covered by this measure.
     *
     * @return a floating-point number corresponding to the average value observed.
     */
    get_averageValue(): number;
    /**
     * Returns the largest value observed during the time interval
     * covered by this measure.
     *
     * @return a floating-point number corresponding to the largest value observed.
     */
    get_maxValue(): number;
    /**
     * Returns the start date of the measure.
     *
     * @return {Date} a Date object corresponding to the beginning of this measure
     */
    get_startTimeUTC_asDate(): Date;
    /**
     * Returns the start date of the measure.
     *
     * @return {Date} a Date object corresponding to the end of this measure
     */
    get_endTimeUTC_asDate(): Date;
}
export declare namespace YMeasure {
}
/**
 * YDataLogger Class: DataLogger control interface, available on most Yoctopuce sensors.
 *
 * A non-volatile memory for storing ongoing measured data is available on most Yoctopuce
 * sensors. Recording can happen automatically, without requiring a permanent
 * connection to a computer.
 * The YDataLogger class controls the global parameters of the internal data
 * logger. Recording control (start/stop) as well as data retreival is done at
 * sensor objects level.
 */
export declare class YDataLogger extends YFunction {
    _className: string;
    _currentRunIndex: number;
    _timeUTC: number;
    _recording: YDataLogger.RECORDING;
    _autoStart: YDataLogger.AUTOSTART;
    _beaconDriven: YDataLogger.BEACONDRIVEN;
    _usage: number;
    _clearHistory: YDataLogger.CLEARHISTORY;
    _valueCallbackDataLogger: YDataLogger.ValueCallback | null;
    readonly CURRENTRUNINDEX_INVALID: number;
    readonly TIMEUTC_INVALID: number;
    readonly RECORDING_OFF: YDataLogger.RECORDING;
    readonly RECORDING_ON: YDataLogger.RECORDING;
    readonly RECORDING_PENDING: YDataLogger.RECORDING;
    readonly RECORDING_INVALID: YDataLogger.RECORDING;
    readonly AUTOSTART_OFF: YDataLogger.AUTOSTART;
    readonly AUTOSTART_ON: YDataLogger.AUTOSTART;
    readonly AUTOSTART_INVALID: YDataLogger.AUTOSTART;
    readonly BEACONDRIVEN_OFF: YDataLogger.BEACONDRIVEN;
    readonly BEACONDRIVEN_ON: YDataLogger.BEACONDRIVEN;
    readonly BEACONDRIVEN_INVALID: YDataLogger.BEACONDRIVEN;
    readonly USAGE_INVALID: number;
    readonly CLEARHISTORY_FALSE: YDataLogger.CLEARHISTORY;
    readonly CLEARHISTORY_TRUE: YDataLogger.CLEARHISTORY;
    readonly CLEARHISTORY_INVALID: YDataLogger.CLEARHISTORY;
    static readonly CURRENTRUNINDEX_INVALID: number;
    static readonly TIMEUTC_INVALID: number;
    static readonly RECORDING_OFF: YDataLogger.RECORDING;
    static readonly RECORDING_ON: YDataLogger.RECORDING;
    static readonly RECORDING_PENDING: YDataLogger.RECORDING;
    static readonly RECORDING_INVALID: YDataLogger.RECORDING;
    static readonly AUTOSTART_OFF: YDataLogger.AUTOSTART;
    static readonly AUTOSTART_ON: YDataLogger.AUTOSTART;
    static readonly AUTOSTART_INVALID: YDataLogger.AUTOSTART;
    static readonly BEACONDRIVEN_OFF: YDataLogger.BEACONDRIVEN;
    static readonly BEACONDRIVEN_ON: YDataLogger.BEACONDRIVEN;
    static readonly BEACONDRIVEN_INVALID: YDataLogger.BEACONDRIVEN;
    static readonly USAGE_INVALID: number;
    static readonly CLEARHISTORY_FALSE: YDataLogger.CLEARHISTORY;
    static readonly CLEARHISTORY_TRUE: YDataLogger.CLEARHISTORY;
    static readonly CLEARHISTORY_INVALID: YDataLogger.CLEARHISTORY;
    constructor(yapi: YAPIContext, func: string);
    imm_parseAttr(name: string, val: any): 0 | 1;
    /**
     * Returns the current run number, corresponding to the number of times the module was
     * powered on with the dataLogger enabled at some point.
     *
     * @return an integer corresponding to the current run number, corresponding to the number of times the module was
     *         powered on with the dataLogger enabled at some point
     *
     * On failure, throws an exception or returns YDataLogger.CURRENTRUNINDEX_INVALID.
     */
    get_currentRunIndex(): Promise<number>;
    /**
     * Returns the Unix timestamp for current UTC time, if known.
     *
     * @return an integer corresponding to the Unix timestamp for current UTC time, if known
     *
     * On failure, throws an exception or returns YDataLogger.TIMEUTC_INVALID.
     */
    get_timeUTC(): Promise<number>;
    /**
     * Changes the current UTC time reference used for recorded data.
     *
     * @param newval : an integer corresponding to the current UTC time reference used for recorded data
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_timeUTC(newval: number): Promise<number>;
    /**
     * Returns the current activation state of the data logger.
     *
     * @return a value among YDataLogger.RECORDING_OFF, YDataLogger.RECORDING_ON and
     * YDataLogger.RECORDING_PENDING corresponding to the current activation state of the data logger
     *
     * On failure, throws an exception or returns YDataLogger.RECORDING_INVALID.
     */
    get_recording(): Promise<YDataLogger.RECORDING>;
    /**
     * Changes the activation state of the data logger to start/stop recording data.
     *
     * @param newval : a value among YDataLogger.RECORDING_OFF, YDataLogger.RECORDING_ON and
     * YDataLogger.RECORDING_PENDING corresponding to the activation state of the data logger to
     * start/stop recording data
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_recording(newval: YDataLogger.RECORDING): Promise<number>;
    /**
     * Returns the default activation state of the data logger on power up.
     *
     * @return either YDataLogger.AUTOSTART_OFF or YDataLogger.AUTOSTART_ON, according to the default
     * activation state of the data logger on power up
     *
     * On failure, throws an exception or returns YDataLogger.AUTOSTART_INVALID.
     */
    get_autoStart(): Promise<YDataLogger.AUTOSTART>;
    /**
     * Changes the default activation state of the data logger on power up.
     * Do not forget to call the saveToFlash() method of the module to save the
     * configuration change.  Note: if the device doesn't have any time source at his disposal when
     * starting up, it will wait for ~8 seconds before automatically starting to record  with
     * an arbitrary timestamp
     *
     * @param newval : either YDataLogger.AUTOSTART_OFF or YDataLogger.AUTOSTART_ON, according to the
     * default activation state of the data logger on power up
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_autoStart(newval: YDataLogger.AUTOSTART): Promise<number>;
    /**
     * Returns true if the data logger is synchronised with the localization beacon.
     *
     * @return either YDataLogger.BEACONDRIVEN_OFF or YDataLogger.BEACONDRIVEN_ON, according to true if
     * the data logger is synchronised with the localization beacon
     *
     * On failure, throws an exception or returns YDataLogger.BEACONDRIVEN_INVALID.
     */
    get_beaconDriven(): Promise<YDataLogger.BEACONDRIVEN>;
    /**
     * Changes the type of synchronisation of the data logger.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : either YDataLogger.BEACONDRIVEN_OFF or YDataLogger.BEACONDRIVEN_ON, according to
     * the type of synchronisation of the data logger
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_beaconDriven(newval: YDataLogger.BEACONDRIVEN): Promise<number>;
    /**
     * Returns the percentage of datalogger memory in use.
     *
     * @return an integer corresponding to the percentage of datalogger memory in use
     *
     * On failure, throws an exception or returns YDataLogger.USAGE_INVALID.
     */
    get_usage(): Promise<number>;
    get_clearHistory(): Promise<YDataLogger.CLEARHISTORY>;
    set_clearHistory(newval: YDataLogger.CLEARHISTORY): Promise<number>;
    /**
     * Retrieves a data logger for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the data logger is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YDataLogger.isOnline() to test if the data logger is
     * indeed online at a given time. In case of ambiguity when looking for
     * a data logger by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the data logger, for instance
     *         LIGHTMK4.dataLogger.
     *
     * @return a YDataLogger object allowing you to drive the data logger.
     */
    static FindDataLogger(func: string): YDataLogger;
    /**
     * Retrieves a data logger for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the data logger is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YDataLogger.isOnline() to test if the data logger is
     * indeed online at a given time. In case of ambiguity when looking for
     * a data logger by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx : a YAPI context
     * @param func : a string that uniquely characterizes the data logger, for instance
     *         LIGHTMK4.dataLogger.
     *
     * @return a YDataLogger object allowing you to drive the data logger.
     */
    static FindDataLoggerInContext(yctx: YAPIContext, func: string): YDataLogger;
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
    registerValueCallback(callback: YDataLogger.ValueCallback | null): Promise<number>;
    _invokeValueCallback(value: string): Promise<number>;
    /**
     * Clears the data logger memory and discards all recorded data streams.
     * This method also resets the current run index to zero.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    forgetAllDataStreams(): Promise<number>;
    /**
     * Returns a list of YDataSet objects that can be used to retrieve
     * all measures stored by the data logger.
     *
     * This function only works if the device uses a recent firmware,
     * as YDataSet objects are not supported by firmwares older than
     * version 13000.
     *
     * @return a list of YDataSet object.
     *
     * On failure, throws an exception or returns an empty list.
     */
    get_dataSets(): Promise<YDataSet[]>;
    parse_dataSets(json: Uint8Array): Promise<YDataSet[]>;
    /**
     * Continues the enumeration of data loggers started using yFirstDataLogger().
     * Caution: You can't make any assumption about the returned data loggers order.
     * If you want to find a specific a data logger, use DataLogger.findDataLogger()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YDataLogger object, corresponding to
     *         a data logger currently online, or a null pointer
     *         if there are no more data loggers to enumerate.
     */
    nextDataLogger(): YDataLogger | null;
    /**
     * Starts the enumeration of data loggers currently accessible.
     * Use the method YDataLogger.nextDataLogger() to iterate on
     * next data loggers.
     *
     * @return a pointer to a YDataLogger object, corresponding to
     *         the first data logger currently online, or a null pointer
     *         if there are none.
     */
    static FirstDataLogger(): YDataLogger | null;
    /**
     * Starts the enumeration of data loggers currently accessible.
     * Use the method YDataLogger.nextDataLogger() to iterate on
     * next data loggers.
     *
     * @param yctx : a YAPI context.
     *
     * @return a pointer to a YDataLogger object, corresponding to
     *         the first data logger currently online, or a null pointer
     *         if there are none.
     */
    static FirstDataLoggerInContext(yctx: YAPIContext): YDataLogger | null;
}
export declare namespace YDataLogger {
    const enum RECORDING {
        OFF = 0,
        ON = 1,
        PENDING = 2,
        INVALID = -1
    }
    const enum AUTOSTART {
        OFF = 0,
        ON = 1,
        INVALID = -1
    }
    const enum BEACONDRIVEN {
        OFF = 0,
        ON = 1,
        INVALID = -1
    }
    const enum CLEARHISTORY {
        FALSE = 0,
        TRUE = 1,
        INVALID = -1
    }
    interface ValueCallback {
        (func: YDataLogger, value: string): void;
    }
}
export declare class YSystemEnv {
    isNodeJS: boolean;
    hasSSDP: boolean;
    unknownSystemEnvError(): YoctoError;
    hookUnhandledRejection(handler: YUnhandledPromiseRejectionCallback): void;
    getWebSocketHub(obj_yapi: YAPIContext, urlInfo: _YY_UrlInfo): YGenericHub | null;
    getHttpHub(obj_yapi: YAPIContext, urlInfo: _YY_UrlInfo): YGenericHub | null;
    getWebSocketCallbackHub(obj_yapi: YAPIContext, urlInfo: _YY_UrlInfo, ws: _YY_WebSocket): YGenericHub | null;
    getHttpCallbackHub(yapi: YAPIContext, urlInfo: _YY_UrlInfo, incomingMessage: any, serverResponse: any): YGenericHub | null;
    getSSDPManager(obj_yapi: YAPIContext): YGenericSSDPManager | null;
    loadfile(file: string | Blob): Promise<Uint8Array>;
    downloadfile(url: string): Promise<Uint8Array>;
}
export declare const enum Y_YHubType {
    HUB_REGISTERED = 0,
    HUB_PREREGISTERED = 1,
    HUB_TESTONLY = 2
}
export declare abstract class YGenericHub {
    /** @member {YAPIContext} **/
    _yapi: YAPIContext;
    _lastErrorType: number;
    _lastErrorMsg: string;
    urlInfo: _YY_UrlInfo;
    notiflen: number;
    lastPingStamp: number;
    timeoutId: any;
    isNotifWorking: boolean;
    devListExpires: number;
    serialByYdx: string[];
    retryDelay: number;
    notifPos: number;
    notifCarryOver: string;
    currPos: number;
    missing: object;
    disconnecting: boolean;
    notbynOpenTimeout: number | null;
    notbynTryOpen: {
        (): void;
    } | null;
    _reconnectionTimer: any;
    _firstArrivalCallback: boolean;
    _missing: YBoolDict;
    _hubAdded: boolean;
    _connectionType: Y_YHubType;
    constructor(yapi: YAPIContext, urlInfo: _YY_UrlInfo);
    _throw(int_errType: number, str_errMsg: string, obj_retVal?: any): any;
    imm_setConnectionType(hubtype: Y_YHubType): void;
    imm_forceUpdate(): void;
    imm_logrequest(method: string, devUrl: string, obj_body: YHTTPBody | null): void;
    /** Make sure the hub can work properly
     *
     * @param mstimeout {number}
     * @param errmsg {YErrorMsg}
     * @returns {number}
     */
    testHub(mstimeout: number, errmsg: YErrorMsg): Promise<number>;
    /** Handle successful hub connection (including preregisterhub handling)
     */
    signalHubConnected(): Promise<void>;
    imm_testHubAgainLater(): boolean;
    hubUpdateDeviceList(): Promise<number>;
    imm_hasRwAccess(): boolean;
    /** Perform an HTTP query on the hub
     *
     * @param method {string}
     * @param devUrl {string}
     * @param obj_body {YHTTPBody|null}
     * @param tcpchan {number}
     * @returns {YHTTPRequest}
     */
    request(method: string, devUrl: string, obj_body: YHTTPBody | null, tcpchan: number): Promise<YHTTPRequest>;
    /** Create a new random boundary for form-encoding
     *
     * @returns {string}
     */
    imm_getBoundary(): string;
    /** Form-encode a body object into an raw Uint8Array to send
     *
     * @param obj_body {YHTTPBody}
     * @param str_boundary {string}
     * @returns {Uint8Array}
     */
    imm_formEncodeBody(obj_body: YHTTPBody, str_boundary: string): Uint8Array;
    /** Return an array of serial numbers
     *
     * @returns {string[]}
     */
    getBootloaders(): Promise<string[]>;
    /** Perform a firmware update
     *
     * @param serial {string}
     * @param firmware {YFirmwareFile}
     * @param settings {Uint8Array}
     * @param progress {YProgressCallback}
     * @returns {string[] | null}
     */
    firmwareUpdate(serial: string, firmware: YFirmwareFile, settings: Uint8Array, progress: YProgressCallback): Promise<string[] | null>;
    imm_commonDisconnect(): void;
    reportFailure(message: string): Promise<void>;
    disconnect(): Promise<void>;
    imm_isForwarded(): boolean;
    imm_disconnectNow(): void;
    imm_isOnline(): boolean;
}
export interface _YY_WebSocketSendOptions {
    binary: boolean;
    mask: boolean;
}
interface _YY_WebSocketErrorEvent extends Event {
    error: any;
    message: string;
    type: string;
    target: any;
}
interface _YY_WebSocketCloseEvent extends Event {
    wasClean: boolean;
    code: number;
    reason: string;
    target: any;
}
interface _YY_WebSocketMessageEvent extends Event {
    data: Uint8Array;
    origin: any;
    lastEventId: any;
    source: any;
    ports: any;
    type: string;
    target: any;
}
export interface _YY_WebSocket {
    binaryType: string;
    protocol: string;
    readyState: number;
    url: string;
    onerror: ((event: _YY_WebSocketErrorEvent) => any) | null;
    onclose: ((event: _YY_WebSocketCloseEvent) => any) | null;
    onmessage: ((event: _YY_WebSocketMessageEvent) => any) | null;
    close(code?: number, data?: string): void;
    send(data: any, cb?: (err?: Error) => void): void;
    send(data: any, options: {
        mask?: boolean;
        binary?: boolean;
        compress?: boolean;
        fin?: boolean;
    }, cb?: (err?: Error) => void): void;
    ping?: (data?: any, mask?: boolean, cb?: (err: Error) => void) => void;
    pong?: (data?: any, mask?: boolean, cb?: (err: Error) => void) => void;
    terminate?: () => void;
}
declare const enum WSConnState {
    DEAD = 0,
    DISCONNECTED = 1,
    CONNECTING = 2,
    AUTHENTICATING = 3,
    READY = 4,
    CONNECTED = 5
}
export declare abstract class YWebSocketHub extends YGenericHub {
    _DEFAULT_TCP_ROUND_TRIP_TIME: number;
    _DEFAULT_TCP_MAX_WINDOW_SIZE: number;
    _YIO_DEFAULT_TCP_TIMEOUT: number;
    _YIO_1_MINUTE_TCP_TIMEOUT: number;
    _YIO_10_MINUTES_TCP_TIMEOUT: number;
    _USB_META_UTCTIME_SIZE: number;
    _USB_META_DLFLUSH_SIZE: number;
    _USB_META_ACK_D2H_PACKET_SIZE: number;
    _USB_META_WS_ANNOUNCE_SIZE: number;
    _USB_META_WS_AUTHENTICATION_SIZE: number;
    _USB_META_WS_ERROR_SIZE: number;
    _USB_META_ACK_UPLOAD_SIZE: number;
    _USB_META_WS_VALID_SHA1: number;
    _USB_META_WS_RW: number;
    websocket: _YY_WebSocket | null;
    notbynOpenPromise: Promise<YConditionalResult> | null;
    notbynOpenTimeoutObj: any;
    tcpChan: (YHTTPRequest | null)[];
    nextAsyncId: number;
    _reconnectionTimer: null;
    _connectionTime: number;
    _connectionState: WSConnState;
    _remoteVersion: number;
    _remoteSerial: string;
    _remoteNonce: number;
    _nonce: number;
    _session_error: string | null;
    _session_errno: number | null;
    _rwAccess: boolean;
    _tcpRoundTripTime: number;
    _tcpMaxWindowSize: number;
    _lastUploadAckBytes: number[];
    _lastUploadAckTime: number[];
    _lastUploadRateBytes: number[];
    _lastUploadRateTime: number[];
    _uploadRate: number[];
    fwd_nonce: number;
    fwd_websocket: _YY_WebSocket | null;
    fwd_credentials: WebSocketCredential[];
    fwd_connectionState: number;
    fwd_closeCallback: Function | null;
    constructor(yapi: YAPIContext, urlInfo: _YY_UrlInfo);
    /** Open an outgoing websocket
     *
     * @param str_url {string}
     **/
    abstract imm_webSocketOpen(str_url: string): void;
    /** Fills a buffer with random numbers
     *
     * @param arr {Uint8Array}
     **/
    abstract imm_getRandomValues(arr: Uint8Array): Uint8Array;
    /** Report a low-level asynchronous websocket error
     *
     * @param errorType {number}
     * @param message {string}
     **/
    imm_asyncWebSocketError(errorType: number, message: string): void;
    /** Handle websocket-based event-monitoring work on a registered hub
     *
     * @param mstimeout {number}
     * @param errmsg {YErrorMsg}
     * @returns {number}
     */
    testHub(mstimeout: number, errmsg: YErrorMsg): Promise<number>;
    /** Compute websocket authentication sha1 key
     *
     * @param user {string}
     * @param pass {string}
     * @param serial {string}
     * @param nonce
     * @return {Uint8Array}
     */
    imm_computeAuth(user: string, pass: string, serial: string, nonce: number): Uint8Array;
    /** Tell if a websocket hub is currently forwarded and handled remotely
     *
     * @return {boolean}
     */
    imm_isForwarded(): boolean;
    /** Handle an incoming packet
     *
     * @param arr_bytes {Uint8Array}
     **/
    _webSocketMsg(arr_bytes: Uint8Array): Promise<void>;
    /** Send an outgoing packet
     *
     * @param arr_bytes {Uint8Array}
     **/
    imm_webSocketSend(arr_bytes: Uint8Array): void;
    imm_hasRwAccess(): boolean;
    /** Perform an HTTP query on the hub
     *
     * @param method {string}
     * @param devUrl {string}
     * @param obj_body {YHTTPBody|null}
     * @param tcpchan {number}
     * @returns {YHTTPRequest}
     */
    request(method: string, devUrl: string, obj_body: YHTTPBody | null, tcpchan: number): Promise<YHTTPRequest>;
    /** Send all possible pending requests on specified tcpchan
     *
     * @param tcpchan {number}
     */
    imm_sendPendingRequest(tcpchan: number): void;
    imm_abortRequest(tcpchan: number, yreq: YHTTPRequest): void;
    imm_forgetRequest(tcpchan: number, yreq: YHTTPRequest): void;
    imm_dropAllPendingConnection(): void;
    websocketJoin(ws: _YY_WebSocket, arr_credentials: WebSocketCredential[], close_callback: Function): Promise<boolean>;
    imm_sendAPIAnnouncePkt(): boolean;
    imm_handleAPIAuthPkt(msg: Uint8Array): void;
    disconnect(): Promise<void>;
    imm_disconnectNow(): void;
    imm_isOnline(): boolean;
}
interface _YY_SSDPCacheEntry {
    serial: string;
    url: string;
    detectedTime: number;
    maxAge: number;
}
interface _YY_SSDPCache {
    [uuid: string]: _YY_SSDPCacheEntry;
}
export declare abstract class YGenericSSDPManager {
    _yapi: YAPIContext;
    _started: boolean;
    _callback: Function | null;
    _SSDPCache: _YY_SSDPCache;
    _thread: any;
    YSSDP_PORT: number;
    YSSDP_MCAST_ADDR_STR: string;
    YSSDP_URN_YOCTOPUCE: string;
    YSSDP_DISCOVERY_MSG: string;
    constructor(obj_yapi: YAPIContext);
    abstract ySSDPOpenSockets(): Promise<void>;
    abstract ySSDPCloseSockets(): Promise<void>;
    abstract ySSDPSendPacket(msg: string, port: number, ipaddr: string): Promise<void>;
    _invokeCallback(str_serial: string, str_addUrl: string | null, str_removeUrl: string | null): Promise<void>;
    imm_uuidToSerial(str_uuid: string): string | null;
    ySSDPUpdateCache(str_uuid: string, str_url: string, int_cacheValidity: number): Promise<void>;
    ySSDPParseMessage(str_msg: string): Promise<void>;
    ySSDPCheckExpiration(): Promise<void>;
    ySSDPStart(func_callback: Function): Promise<number | undefined>;
    ySSDPStop(): Promise<void>;
    ySSDPDiscover(): Promise<void>;
}
interface DeviceUpdateEvent {
    event: string;
    serial: string;
    module: YModule;
}
/**
 * YAPIContext Class: Yoctopuce I/O context configuration.
 *
 *
 */
export declare class YAPIContext {
    system_env: YSystemEnv;
    _uniqueID: string;
    _detectType: number;
    _hubs: YGenericHub[];
    _ssdpManager: YGenericSSDPManager | null;
    _pendingHubs: YGenericHubDict;
    _devs: YDeviceDict;
    _snByUrl: YStringDict;
    _snByName: YStringDict;
    _fnByType: YFunctionTypeDict;
    _lastErrorType: number;
    _lastErrorMsg: string;
    _updateDevListStarted: number;
    _pendingCallbacks: DeviceUpdateEvent[];
    _logLevel: number;
    _logCallback: YLogCallback | null;
    _arrivalCallback: YDeviceUpdateCallback | null;
    _namechgCallback: YDeviceUpdateCallback | null;
    _removalCallback: YDeviceUpdateCallback | null;
    _hubDiscoveryCallback: YHubDiscoveryCallback | null;
    _forwardValues: number;
    _calibHandlers: yCalibrationHandler[];
    _ValueCallbackList: YFunction[];
    _TimedReportCallbackList: YFunction[];
    _beacons: YIntDict;
    _isNodeJS: boolean;
    _networkTimeoutMs: number;
    _deviceListValidityMs: number;
    defaultEncoding: string;
    exceptionsDisabled: boolean;
    readonly SUCCESS: number;
    readonly NOT_INITIALIZED: number;
    readonly INVALID_ARGUMENT: number;
    readonly NOT_SUPPORTED: number;
    readonly DEVICE_NOT_FOUND: number;
    readonly VERSION_MISMATCH: number;
    readonly DEVICE_BUSY: number;
    readonly TIMEOUT: number;
    readonly IO_ERROR: number;
    readonly NO_MORE_DATA: number;
    readonly EXHAUSTED: number;
    readonly DOUBLE_ACCES: number;
    readonly UNAUTHORIZED: number;
    readonly RTC_NOT_READY: number;
    readonly FILE_NOT_FOUND: number;
    readonly SSL_ERROR: number;
    defaultCacheValidity: number;
    static readonly SUCCESS: number;
    static readonly NOT_INITIALIZED: number;
    static readonly INVALID_ARGUMENT: number;
    static readonly NOT_SUPPORTED: number;
    static readonly DEVICE_NOT_FOUND: number;
    static readonly VERSION_MISMATCH: number;
    static readonly DEVICE_BUSY: number;
    static readonly TIMEOUT: number;
    static readonly IO_ERROR: number;
    static readonly NO_MORE_DATA: number;
    static readonly EXHAUSTED: number;
    static readonly DOUBLE_ACCES: number;
    static readonly UNAUTHORIZED: number;
    static readonly RTC_NOT_READY: number;
    static readonly FILE_NOT_FOUND: number;
    static readonly SSL_ERROR: number;
    readonly INVALID_INT: number;
    readonly INVALID_UINT: number;
    readonly INVALID_LONG: number;
    readonly INVALID_DOUBLE: number;
    readonly MIN_DOUBLE: number;
    readonly MAX_DOUBLE: number;
    readonly INVALID_STRING: string;
    readonly HASH_BUF_SIZE: number;
    readonly DETECT_NONE: number;
    readonly DETECT_USB: number;
    readonly DETECT_NET: number;
    readonly DETECT_ALL: number;
    constructor(system_env?: YSystemEnv);
    imm_ResetToDefaults(): void;
    _throw(int_errType: number, str_errMsg: string, obj_retVal?: any): any;
    imm_setSystemEnv(env: YSystemEnv): void;
    imm_log(msg: string, ...moreArgs: any[]): void;
    /**
     * Registers a log callback function. This callback will be called each time
     * the API have something to say. Quite useful to debug the API.
     *
     * @param logfun : a procedure taking a string parameter, or null
     *         to unregister a previously registered  callback.
     */
    RegisterLogFunction(logfun: YLogCallback): Promise<number>;
    _addHub(newhub: YGenericHub): Promise<void>;
    imm_getHub(obj_urlInfo: _YY_UrlInfo): YGenericHub | null;
    ensureUpdateDeviceListNotRunning(): Promise<void>;
    _updateDeviceList_internal(bool_forceupdate: boolean, bool_invokecallbacks: boolean): Promise<YConditionalResult>;
    updateDeviceList_process(hub: YGenericHub, hubDev: YDevice, whitePages: _YY_WhitePage[], yellowPages: _YY_YellowPages): Promise<number>;
    /** process event data produced by a hub
     *
     * @param hub {YGenericHub}
     * @param str_lines {string}
     */
    parseEvents(hub: YGenericHub, str_lines: string): Promise<void>;
    /** Network notification format: 7x7bit (mapped to 7 chars in range 32..159)
     *                               used to represent 1 flag (RAW6BYTES) + 6 bytes
     * INPUT:  [R765432][1076543][2107654][3210765][4321076][5432107][6543210]
     * OUTPUT: 7 bytes array (1 byte for the funcint_TypeV2 and 6 bytes of USB like data
     *                     funcTypeV2 + [R][-byte 0][-byte 1-][-byte 2-][-byte 3-][-byte 4-][-byte 5-]
     *
     * @return {number[]}
     */
    imm_decodeNetFuncValV2(p: string): number[] | null;
    /** Decode an enhanced notification (V2) buffer
     *
     * @param int_typeV2 {number}
     * @param arr_funcval {number[]}
     * @param int_ofs {number}
     * @param int_funcvalen {number}
     * @returns {string}
     */
    imm_decodePubVal(int_typeV2: number, arr_funcval: number[], int_ofs: number, int_funcvalen: number): string;
    imm_decExp(int_pow: number): number;
    imm_decimalToDouble(val: number): number;
    imm_doubleToDecimal(val: number): number;
    imm_getCalibrationHandler(calibType: number): yCalibrationHandler;
    imm_decodeWords(data: string): number[];
    imm_decodeFloats(data: string): number[];
    /** Convert a numeric string to an integer
     *
     * @param str_data {string}
     * @return {number}
     */
    imm_atoi(str_data: string): number;
    /** Convert a binary object to string
     *
     * @param bin_data {Uint8Array}
     * @return {string}
     */
    imm_bin2str(bin_data: Uint8Array): string;
    /** Convert a string to binary object
     *
     * @param str_data {string}
     * @return {Uint8Array}
     */
    imm_str2bin(str_data: string): Uint8Array;
    /** Convert a binary object to hex string
     *
     * @param bin_data {Uint8Array}
     * @return {string}
     */
    imm_bin2hexstr(bin_data: Uint8Array): string;
    /** Convert a hex string to binary object
     *
     * @param str_data {string}
     * @return {Uint8Array}
     */
    imm_hexstr2bin(str_data: string): Uint8Array;
    /** Return a Device object for a specified URL, serial number or logical device name
     *
     * @param str_device {string}
     * @return {YDevice}
     *
     * This function will not cause any network access (not async !)
     */
    imm_getDevice(str_device: string): YDevice | null;
    /** Add or remove a value change callback
     *
     * @param obj_func {YFunction}
     * @param bool_add {Boolean}
     */
    _UpdateValueCallbackList(obj_func: YFunction, bool_add: boolean): Promise<void>;
    /** Add or remove a timed report callback
     *
     * @param obj_func {YFunction}
     * @param bool_add {Boolean}
     */
    _UpdateTimedReportCallbackList(obj_func: YFunction, bool_add: boolean): Promise<void>;
    imm_functionClass(str_funcid: string): string;
    imm_reindexDevice(obj_dev: YDevice): void;
    imm_forgetDevice(obj_dev: YDevice): void;
    imm_resolveFunction(str_className: string, str_func: string): YConditionalResult;
    imm_getFriendlyNameFunction(str_className: string, str_func: string): YConditionalResult;
    imm_setFunction(str_className: string, str_func: string, obj_func: YFunction): void;
    imm_getFunction(str_className: string, str_func: string): YFunction;
    setFunctionValue(str_hwid: string, str_pubval: string): Promise<void>;
    setTimedReport(str_hwid: string, float_timestamp: number, float_duration: number, arr_report: number[]): Promise<void>;
    setConfChange(str_serial: string): Promise<void>;
    setBeaconChange(str_serial: string, int_beacon: number): Promise<void>;
    imm_getFunctionValue(str_hwid: string): string;
    imm_getFunctionBaseType(str_hwid: string): number;
    imm_getFirstHardwareId(str_className: string): string | null;
    imm_getNextHardwareId(str_className: string, str_hwid: string): string | null;
    /** Perform an HTTP request on a device, by URL or identifier.
     * When loading the REST API from a device by identifier, the device cache will be used.
     *
     * @param str_device {string}
     * @param str_request {string}
     * @param obj_body {YHTTPBody|null}
     * @param int_tcpchan {number}
     * @returns {YHTTPRequest}
     */
    devRequest(str_device: string, str_request: string, obj_body?: YHTTPBody | null, int_tcpchan?: number): Promise<YHTTPRequest>;
    isReadOnly(str_device: string): Promise<boolean>;
    /** Locate the device to access a specified function, without causing any I/O
     *
     * @param str_className {string}
     * @param str_func {string}
     * @returns {YFuncRequest}
     */
    imm_funcDev_internal(str_className: string, str_func: string): YFuncRequest;
    /** Locate the device to access a specified function. May cause device list update if needed
     *
     * @param str_className {string}
     * @param str_func {string}
     * @returns {YFuncRequest}
     */
    _funcDev(str_className: string, str_func: string): Promise<YFuncRequest>;
    /** Load and parse the REST API for a function given by class name and identifier, possibly applying changes
     * Device cache will be preloaded when loading function 'module' and leveraged for other modules
     *
     * @param str_className {string}
     * @param str_func {string}
     * @param str_extra {string}
     * @param int_msValidity {number}
     * @returns {YFuncRequest}
     */
    funcRequest(str_className: string, str_func: string, str_extra: string, int_msValidity?: number): Promise<YFuncRequest>;
    /** Perform an HTTP request on a device and return the result string
     *
     * @param str_device {string}
     * @param str_request {string}
     * @returns {Promise<Uint8Array|null>}
     */
    HTTPRequest(str_device: string, str_request: string): Promise<Uint8Array | null>;
    ForceDeviceRefresh(str_device: string): Promise<number>;
    SetDeviceListValidity_internal(deviceListValidity: number): Promise<void>;
    GetDeviceListValidity_internal(): Promise<number>;
    SetNetworkTimeout_internal(networkMsTimeout: number): Promise<void>;
    GetNetworkTimeout_internal(): Promise<number>;
    AddUdevRule_internal(force: boolean): Promise<string>;
    /**
     * Modifies the delay between each forced enumeration of the used YoctoHubs.
     * By default, the library performs a full enumeration every 10 seconds.
     * To reduce network traffic, you can increase this delay.
     * It's particularly useful when a YoctoHub is connected to the GSM network
     * where traffic is billed. This parameter doesn't impact modules connected by USB,
     * nor the working of module arrival/removal callbacks.
     * Note: you must call this function after yInitAPI.
     *
     * @param deviceListValidity : nubmer of seconds between each enumeration.
     * @noreturn
     */
    SetDeviceListValidity(deviceListValidity: number): Promise<void>;
    /**
     * Returns the delay between each forced enumeration of the used YoctoHubs.
     * Note: you must call this function after yInitAPI.
     *
     * @return the number of seconds between each enumeration.
     */
    GetDeviceListValidity(): Promise<number>;
    /**
     * Adds a UDEV rule which authorizes all users to access Yoctopuce modules
     * connected to the USB ports. This function works only under Linux. The process that
     * calls this method must have root privileges because this method changes the Linux configuration.
     *
     * @param force : if true, overwrites any existing rule.
     *
     * @return an empty string if the rule has been added.
     *
     * On failure, returns a string that starts with "error:".
     */
    AddUdevRule(force: boolean): Promise<string>;
    /**
     * Modifies the network connection delay for yRegisterHub() and yUpdateDeviceList().
     * This delay impacts only the YoctoHubs and VirtualHub
     * which are accessible through the network. By default, this delay is of 20000 milliseconds,
     * but depending or you network you may want to change this delay,
     * gor example if your network infrastructure is based on a GSM connection.
     *
     * @param networkMsTimeout : the network connection delay in milliseconds.
     * @noreturn
     */
    SetNetworkTimeout(networkMsTimeout: number): Promise<void>;
    /**
     * Returns the network connection delay for yRegisterHub() and yUpdateDeviceList().
     * This delay impacts only the YoctoHubs and VirtualHub
     * which are accessible through the network. By default, this delay is of 20000 milliseconds,
     * but depending or you network you may want to change this delay,
     * for example if your network infrastructure is based on a GSM connection.
     *
     * @return the network connection delay in milliseconds.
     */
    GetNetworkTimeout(): Promise<number>;
    /**
     * Change the validity period of the data loaded by the library.
     * By default, when accessing a module, all the attributes of the
     * module functions are automatically kept in cache for the standard
     * duration (5 ms). This method can be used to change this standard duration,
     * for example in order to reduce network or USB traffic. This parameter
     * does not affect value change callbacks
     * Note: This function must be called after yInitAPI.
     *
     * @param cacheValidityMs : an integer corresponding to the validity attributed to the
     *         loaded function parameters, in milliseconds.
     * @noreturn
     */
    SetCacheValidity(cacheValidityMs: number): Promise<void>;
    /**
     * Returns the validity period of the data loaded by the library.
     * This method returns the cache validity of all attributes
     * module functions.
     * Note: This function must be called after yInitAPI .
     *
     * @return an integer corresponding to the validity attributed to the
     *         loaded function parameters, in milliseconds
     */
    GetCacheValidity(): Promise<number>;
    /**
     * Returns the version identifier for the Yoctopuce library in use.
     * The version is a string in the form "Major.Minor.Build",
     * for instance "1.01.5535". For languages using an external
     * DLL (for instance C#, VisualBasic or Delphi), the character string
     * includes as well the DLL version, for instance
     * "1.01.5535 (1.01.5439)".
     *
     * If you want to verify in your code that the library version is
     * compatible with the version that you have used during development,
     * verify that the major number is strictly equal and that the minor
     * number is greater or equal. The build number is not relevant
     * with respect to the library compatibility.
     *
     * @return a character string describing the library version.
     */
    GetAPIVersion(): Promise<string>;
    imm_GetAPIVersion(): string;
    /**
     * Initializes the Yoctopuce programming library explicitly.
     * It is not strictly needed to call yInitAPI(), as the library is
     * automatically  initialized when calling yRegisterHub() for the
     * first time.
     *
     * When YAPI.DETECT_NONE is used as detection mode,
     * you must explicitly use yRegisterHub() to point the API to the
     * VirtualHub on which your devices are connected before trying to access them.
     *
     * @param mode : an integer corresponding to the type of automatic
     *         device detection to use. Possible values are
     *         YAPI.DETECT_NONE, YAPI.DETECT_USB, YAPI.DETECT_NET,
     *         and YAPI.DETECT_ALL.
     * @param errmsg : a string passed by reference to receive any error message.
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    InitAPI(mode: number, errmsg: YErrorMsg): Promise<number>;
    /**
     * Waits for all pending communications with Yoctopuce devices to be
     * completed then frees dynamically allocated resources used by
     * the Yoctopuce library.
     *
     * From an operating system standpoint, it is generally not required to call
     * this function since the OS will automatically free allocated resources
     * once your program is completed. However there are two situations when
     * you may really want to use that function:
     *
     * - Free all dynamically allocated memory blocks in order to
     * track a memory leak.
     *
     * - Send commands to devices right before the end
     * of the program. Since commands are sent in an asynchronous way
     * the program could exit before all commands are effectively sent.
     *
     * You should not call any other library function after calling
     * yFreeAPI(), or your program will crash.
     */
    FreeAPI(): Promise<void>;
    /**
     * Abort any ongoing API activity immediately by closing all open hubs. Then
     * frees dynamically allocated memory blocks used by the Yoctopuce library.
     * You should not call any other library function after calling
     * yDropAPI(), or your program will crash.
     */
    KillAPI(): Promise<void>;
    /**
     * Disables the use of exceptions to report runtime errors.
     * When exceptions are disabled, every function returns a specific
     * error value which depends on its type and which is documented in
     * this reference manual.
     */
    DisableExceptions(): Promise<void>;
    /**
     * Re-enables the use of exceptions for runtime error handling.
     * Be aware than when exceptions are enabled, every function that fails
     * triggers an exception. If the exception is not caught by the user code,
     * it  either fires the debugger or aborts (i.e. crash) the program.
     * On failure, throws an exception or returns a negative error code.
     */
    EnableExceptions(): Promise<void>;
    /**
     * Enable logging to the console for unhandled promise rejections,
     * such as exceptions in async functions without a try/catch.
     * This is not really a Yoctopuce thing, but since it is not obvious
     * to find out and since the code differs depending on the environment,
     * we provide it here for convenience.
     */
    LogUnhandledPromiseRejections(): Promise<void>;
    imm_parseRegisteredUrl(str_url: string): _YY_UrlInfo;
    imm_registerHub_internal(urlInfo: _YY_UrlInfo): YGenericHub | null;
    imm_forgetHub(hub: YGenericHub): void;
    /**
     * Setup the Yoctopuce library to use modules connected on a given machine. Idealy this
     * call will be made once at the begining of your application.  The
     * parameter will determine how the API will work. Use the following values:
     *
     * <b>usb</b>: When the usb keyword is used, the API will work with
     * devices connected directly to the USB bus. Some programming languages such a JavaScript,
     * PHP, and Java don't provide direct access to USB hardware, so usb will
     * not work with these. In this case, use a VirtualHub or a networked YoctoHub (see below).
     *
     * <b><i>x.x.x.x</i></b> or <b><i>hostname</i></b>: The API will use the devices connected to the
     * host with the given IP address or hostname. That host can be a regular computer
     * running a VirtualHub, or a networked YoctoHub such as YoctoHub-Ethernet or
     * YoctoHub-Wireless. If you want to use the VirtualHub running on you local
     * computer, use the IP address 127.0.0.1.
     *
     * <b>callback</b>: that keyword make the API run in "<i>HTTP Callback</i>" mode.
     * This a special mode allowing to take control of Yoctopuce devices
     * through a NAT filter when using a VirtualHub or a networked YoctoHub. You only
     * need to configure your hub to call your server script on a regular basis.
     * This mode is currently available for PHP and Node.JS only.
     *
     * Be aware that only one application can use direct USB access at a
     * given time on a machine. Multiple access would cause conflicts
     * while trying to access the USB modules. In particular, this means
     * that you must stop the VirtualHub software before starting
     * an application that uses direct USB access. The workaround
     * for this limitation is to setup the library to use the VirtualHub
     * rather than direct USB access.
     *
     * If access control has been activated on the hub, virtual or not, you want to
     * reach, the URL parameter should look like:
     *
     * http://username:password@address:port
     *
     * You can call <i>RegisterHub</i> several times to connect to several machines. On
     * the other hand, it is useless and even counterproductive to call <i>RegisterHub</i>
     * with to same address multiple times during the life of the application.
     *
     * @param url : a string containing either "usb","callback" or the
     *         root URL of the hub to monitor
     * @param errmsg : a string passed by reference to receive any error message.
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    RegisterHub(url: string, errmsg: YErrorMsg): Promise<number>;
    /**
     * Fault-tolerant alternative to yRegisterHub(). This function has the same
     * purpose and same arguments as yRegisterHub(), but does not trigger
     * an error when the selected hub is not available at the time of the function call.
     * This makes it possible to register a network hub independently of the current
     * connectivity, and to try to contact it only when a device is actively needed.
     *
     * @param url : a string containing either "usb","callback" or the
     *         root URL of the hub to monitor
     * @param errmsg : a string passed by reference to receive any error message.
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    PreregisterHub(url: string, errmsg: YErrorMsg): Promise<number>;
    /**
     * Setup the Yoctopuce library to use modules connected on a remote hub
     * performing an incoming connection to an HTTP server.
     *
     * @param incomingMessage {IncomingMessage} : node http incomingMessage object.
     * @param serverResponse  {ServerResponse} : node http serverResponse object.
     * @param errmsg {YErrorMsg} : a string passed by reference to receive any error message.
     *
     * @return {number} YAPI_SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    RegisterHubHttpCallback(incomingMessage: any, serverResponse: any, errmsg: YErrorMsg): Promise<number>;
    /**
     * Setup the Yoctopuce library to use modules connected on a remote hub
     * performing an incoming connection to a websocket server.
     *
     * @param ws {WebSocket} : node WebSocket object for the incoming websocket callback connection.
     * @param errmsg {YErrorMsg} : a string passed by reference to receive any error message.
     * @param authpwd {string} : an optional authentication password
     *
     * @return {number} YAPI_SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    RegisterHubWebSocketCallback(ws: _YY_WebSocket, errmsg: YErrorMsg, authpwd: string): Promise<number>;
    WebSocketJoin(ws: _YY_WebSocket, arr_credentials: WebSocketCredential[], closeCallback: Function): Promise<boolean>;
    /**
     * Setup the Yoctopuce library to no more use modules connected on a previously
     * registered machine with RegisterHub.
     *
     * @param url : a string containing either "usb" or the
     *         root URL of the hub to monitor
     */
    UnregisterHub(url: string): Promise<void>;
    /**
     * Test if the hub is reachable. This method do not register the hub, it only test if the
     * hub is usable. The url parameter follow the same convention as the yRegisterHub
     * method. This method is useful to verify the authentication parameters for a hub. It
     * is possible to force this method to return after mstimeout milliseconds.
     *
     * @param url : a string containing either "usb","callback" or the
     *         root URL of the hub to monitor
     * @param mstimeout : the number of millisecond available to test the connection.
     * @param errmsg : a string passed by reference to receive any error message.
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure returns a negative error code.
     */
    TestHub(url: string, mstimeout: number, errmsg: YErrorMsg): Promise<number>;
    /**
     * Triggers a (re)detection of connected Yoctopuce modules.
     * The library searches the machines or USB ports previously registered using
     * yRegisterHub(), and invokes any user-defined callback function
     * in case a change in the list of connected devices is detected.
     *
     * This function can be called as frequently as desired to refresh the device list
     * and to make the application aware of hot-plug events. However, since device
     * detection is quite a heavy process, UpdateDeviceList shouldn't be called more
     * than once every two seconds.
     *
     * @param errmsg : a string passed by reference to receive any error message.
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    UpdateDeviceList(errmsg?: YErrorMsg | null): Promise<number>;
    _hubDiscoveryCallback_internal(serial: string, urlToRegister: string | null, urlToUnregister: string | null): Promise<void>;
    /**
     * Force a hub discovery, if a callback as been registered with yRegisterHubDiscoveryCallback it
     * will be called for each net work hub that will respond to the discovery.
     *
     * @param errmsg : a string passed by reference to receive any error message.
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    TriggerHubDiscovery(errmsg?: YErrorMsg | null): Promise<number>;
    /**
     * Maintains the device-to-library communication channel.
     * If your program includes significant loops, you may want to include
     * a call to this function to make sure that the library takes care of
     * the information pushed by the modules on the communication channels.
     * This is not strictly necessary, but it may improve the reactivity
     * of the library for the following commands.
     *
     * This function may signal an error in case there is a communication problem
     * while contacting a module.
     *
     * @param errmsg : a string passed by reference to receive any error message.
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    HandleEvents(errmsg?: YErrorMsg | null): Promise<number>;
    /**
     * Pauses the execution flow for a specified duration.
     * This function implements a passive waiting loop, meaning that it does not
     * consume CPU cycles significantly. The processor is left available for
     * other threads and processes. During the pause, the library nevertheless
     * reads from time to time information from the Yoctopuce modules by
     * calling yHandleEvents(), in order to stay up-to-date.
     *
     * This function may signal an error in case there is a communication problem
     * while contacting a module.
     *
     * @param ms_duration : an integer corresponding to the duration of the pause,
     *         in milliseconds.
     * @param errmsg : a string passed by reference to receive any error message.
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    Sleep(ms_duration: number, errmsg?: YErrorMsg | null): Promise<number>;
    _microSleep_internal(): Promise<void>;
    /**
     * Invoke the specified callback function after a given timeout.
     * This function behaves more or less like Javascript setTimeout,
     * but during the waiting time, it will call yHandleEvents
     * and yUpdateDeviceList periodically, in order to
     * keep the API up-to-date with current devices.
     *
     * @param callback : the function to call after the timeout occurs.
     *         On Microsoft Internet Explorer, the callback must
     *         be provided as a string to be evaluated.
     * @param ms_timeout : an integer corresponding to the duration of the
     *         timeout, in milliseconds.
     * @param args : additional arguments to be passed to the
     *         callback function can be provided, if needed
     *         (not supported on Microsoft Internet Explorer).
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    SetTimeout(callback: Function, ms_timeout: number, args?: any): number;
    _setTimeout_internal(callback: Function, endtime: number, args: any): void;
    /**
     * Returns the current value of a monotone millisecond-based time counter.
     * This counter can be used to compute delays in relation with
     * Yoctopuce devices, which also uses the millisecond as timebase.
     *
     * @return a long integer corresponding to the millisecond counter.
     */
    GetTickCount(): number;
    imm_CheckLogicalName(name: string): boolean;
    /**
     * Checks if a given string is valid as logical name for a module or a function.
     * A valid logical name has a maximum of 19 characters, all among
     * A..Z, a..z, 0..9, _, and -.
     * If you try to configure a logical name with an incorrect string,
     * the invalid characters are ignored.
     *
     * @param name : a string containing the name to check.
     *
     * @return true if the name is valid, false otherwise.
     */
    CheckLogicalName(name: string): Promise<boolean>;
    /**
     * Register a callback function, to be called each time
     * a device is plugged. This callback will be invoked while yUpdateDeviceList
     * is running. You will have to call this function on a regular basis.
     *
     * @param arrivalCallback : a procedure taking a YModule parameter, or null
     *         to unregister a previously registered  callback.
     */
    RegisterDeviceArrivalCallback(arrivalCallback: YDeviceUpdateCallback | null): Promise<void>;
    RegisterDeviceChangeCallback(changeCallback: YDeviceUpdateCallback | null): Promise<void>;
    /**
     * Register a callback function, to be called each time
     * a device is unplugged. This callback will be invoked while yUpdateDeviceList
     * is running. You will have to call this function on a regular basis.
     *
     * @param removalCallback : a procedure taking a YModule parameter, or null
     *         to unregister a previously registered  callback.
     */
    RegisterDeviceRemovalCallback(removalCallback: YDeviceUpdateCallback | null): Promise<void>;
    /**
     * Register a callback function, to be called each time an Network Hub send
     * an SSDP message. The callback has two string parameter, the first one
     * contain the serial number of the hub and the second contain the URL of the
     * network hub (this URL can be passed to RegisterHub). This callback will be invoked
     * while yUpdateDeviceList is running. You will have to call this function on a regular basis.
     *
     * @param hubDiscoveryCallback : a procedure taking two string parameter, the serial
     *         number and the hub URL. Use null to unregister a previously registered  callback.
     */
    RegisterHubDiscoveryCallback(hubDiscoveryCallback: YHubDiscoveryCallback): Promise<number>;
    RegisterCalibrationHandler(calibrationType: number, calibrationHandler: yCalibrationHandler): Promise<void>;
    LinearCalibrationHandler(float_rawValue: number, int_calibType: number, arr_calibParams: number[], arr_calibRawValues: number[], arr_calibRefValues: number[]): number;
    /**
     * Compute the MD5 digest for a given ASCII string
     *
     * @param text {string} : the ASCII string to hash
     *
     * @return {Uint8Array} the 16-bytes MD5 hash key
     */
    imm_yMD5(text: string): Uint8Array;
    imm_initshaw(str_s: string, int_ofs: number, int_pad: number, int_xinit: number, _shaw: Uint32Array): void;
    imm_itershaw(s: number[], _shaw: Uint32Array): void;
    /**
     * Compute the SHA1 digest for a given ASCII string
     *
     * @param text {string} : the ASCII string to hash
     *
     * @return {Uint8Array} the 20-bytes SHA1 hash key
     */
    imm_ySHA1(text: string): Uint8Array;
    /**
     * Compute the WPA Preshared key for a given SSID and passphrase
     *
     * @param ssid {string} : the access point SSID
     * @param pass {string} : the access point WPA/WPA2 passphrase
     *
     * @return {string} an hexadecimal string for the preshared key
     */
    ComputePSK(ssid: string, pass: string): Promise<string>;
}
export declare var YAPI: YAPIContext;
export {};
