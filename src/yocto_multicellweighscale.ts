/*********************************************************************
 *
 *  $Id: yocto_multicellweighscale.ts 43483 2021-01-21 15:47:50Z mvuilleu $
 *
 *  Implements the high-level API for MultiCellWeighScale functions
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

//--- (YMultiCellWeighScale definitions)
export const enum YMultiCellWeighScale_ExternalSense {
    FALSE = 0,
    TRUE = 1,
    INVALID = -1
}
export const enum YMultiCellWeighScale_Excitation {
    OFF = 0,
    DC = 1,
    AC = 2,
    INVALID = -1
}
export interface YMultiCellWeighScaleValueCallback { (func: YMultiCellWeighScale, value: string): void }
export interface YMultiCellWeighScaleTimedReportCallback { (func: YMultiCellWeighScale, measure: YMeasure): void }
//--- (end of YMultiCellWeighScale definitions)

//--- (YMultiCellWeighScale class start)
/**
 * YMultiCellWeighScale Class: multi-cell weighing scale sensor control interface, available for
 * instance in the Yocto-MaxiBridge
 *
 * The YMultiCellWeighScale class provides a weight measurement from a set of ratiometric
 * sensors. It can be used to control the bridge excitation parameters, in order to avoid
 * measure shifts caused by temperature variation in the electronics, and can also
 * automatically apply an additional correction factor based on temperature to
 * compensate for offsets in the load cells themselves.
 */
//--- (end of YMultiCellWeighScale class start)

export class YMultiCellWeighScale extends YSensor
{
    //--- (YMultiCellWeighScale attributes declaration)
    _className: string;
    _cellCount: number = YMultiCellWeighScale.CELLCOUNT_INVALID;
    _externalSense: YMultiCellWeighScale_ExternalSense = YMultiCellWeighScale.EXTERNALSENSE_INVALID;
    _excitation: YMultiCellWeighScale_Excitation = YMultiCellWeighScale.EXCITATION_INVALID;
    _tempAvgAdaptRatio: number = YMultiCellWeighScale.TEMPAVGADAPTRATIO_INVALID;
    _tempChgAdaptRatio: number = YMultiCellWeighScale.TEMPCHGADAPTRATIO_INVALID;
    _compTempAvg: number = YMultiCellWeighScale.COMPTEMPAVG_INVALID;
    _compTempChg: number = YMultiCellWeighScale.COMPTEMPCHG_INVALID;
    _compensation: number = YMultiCellWeighScale.COMPENSATION_INVALID;
    _zeroTracking: number = YMultiCellWeighScale.ZEROTRACKING_INVALID;
    _command: string = YMultiCellWeighScale.COMMAND_INVALID;
    _valueCallbackMultiCellWeighScale: YMultiCellWeighScaleValueCallback | null = null;
    _timedReportCallbackMultiCellWeighScale: YMultiCellWeighScaleTimedReportCallback | null = null;

    // API symbols as object properties
    public readonly CELLCOUNT_INVALID: number = YAPI.INVALID_UINT;
    public readonly EXTERNALSENSE_FALSE: YMultiCellWeighScale_ExternalSense = YMultiCellWeighScale_ExternalSense.FALSE;
    public readonly EXTERNALSENSE_TRUE: YMultiCellWeighScale_ExternalSense = YMultiCellWeighScale_ExternalSense.TRUE;
    public readonly EXTERNALSENSE_INVALID: YMultiCellWeighScale_ExternalSense = YMultiCellWeighScale_ExternalSense.INVALID;
    public readonly EXCITATION_OFF: YMultiCellWeighScale_Excitation = YMultiCellWeighScale_Excitation.OFF;
    public readonly EXCITATION_DC: YMultiCellWeighScale_Excitation = YMultiCellWeighScale_Excitation.DC;
    public readonly EXCITATION_AC: YMultiCellWeighScale_Excitation = YMultiCellWeighScale_Excitation.AC;
    public readonly EXCITATION_INVALID: YMultiCellWeighScale_Excitation = YMultiCellWeighScale_Excitation.INVALID;
    public readonly TEMPAVGADAPTRATIO_INVALID: number = YAPI.INVALID_DOUBLE;
    public readonly TEMPCHGADAPTRATIO_INVALID: number = YAPI.INVALID_DOUBLE;
    public readonly COMPTEMPAVG_INVALID: number = YAPI.INVALID_DOUBLE;
    public readonly COMPTEMPCHG_INVALID: number = YAPI.INVALID_DOUBLE;
    public readonly COMPENSATION_INVALID: number = YAPI.INVALID_DOUBLE;
    public readonly ZEROTRACKING_INVALID: number = YAPI.INVALID_DOUBLE;
    public readonly COMMAND_INVALID: string = YAPI.INVALID_STRING;

    // API symbols as static members
    public static readonly CELLCOUNT_INVALID: number = YAPI.INVALID_UINT;
    public static readonly EXTERNALSENSE_FALSE: YMultiCellWeighScale_ExternalSense = YMultiCellWeighScale_ExternalSense.FALSE;
    public static readonly EXTERNALSENSE_TRUE: YMultiCellWeighScale_ExternalSense = YMultiCellWeighScale_ExternalSense.TRUE;
    public static readonly EXTERNALSENSE_INVALID: YMultiCellWeighScale_ExternalSense = YMultiCellWeighScale_ExternalSense.INVALID;
    public static readonly EXCITATION_OFF: YMultiCellWeighScale_Excitation = YMultiCellWeighScale_Excitation.OFF;
    public static readonly EXCITATION_DC: YMultiCellWeighScale_Excitation = YMultiCellWeighScale_Excitation.DC;
    public static readonly EXCITATION_AC: YMultiCellWeighScale_Excitation = YMultiCellWeighScale_Excitation.AC;
    public static readonly EXCITATION_INVALID: YMultiCellWeighScale_Excitation = YMultiCellWeighScale_Excitation.INVALID;
    public static readonly TEMPAVGADAPTRATIO_INVALID: number = YAPI.INVALID_DOUBLE;
    public static readonly TEMPCHGADAPTRATIO_INVALID: number = YAPI.INVALID_DOUBLE;
    public static readonly COMPTEMPAVG_INVALID: number = YAPI.INVALID_DOUBLE;
    public static readonly COMPTEMPCHG_INVALID: number = YAPI.INVALID_DOUBLE;
    public static readonly COMPENSATION_INVALID: number = YAPI.INVALID_DOUBLE;
    public static readonly ZEROTRACKING_INVALID: number = YAPI.INVALID_DOUBLE;
    public static readonly COMMAND_INVALID: string = YAPI.INVALID_STRING;
    //--- (end of YMultiCellWeighScale attributes declaration)

//--- (YMultiCellWeighScale return codes)
//--- (end of YMultiCellWeighScale return codes)

    constructor(yapi: YAPIContext, func: string)
    {
        //--- (YMultiCellWeighScale constructor)
        super(yapi, func);
        this._className                  = 'MultiCellWeighScale';
        //--- (end of YMultiCellWeighScale constructor)
    }

    //--- (YMultiCellWeighScale implementation)

    imm_parseAttr(name: string, val: any)
    {
        switch(name) {
        case 'cellCount':
            this._cellCount = <number> <number> val;
            return 1;
        case 'externalSense':
            this._externalSense = <YMultiCellWeighScale_ExternalSense> <number> val;
            return 1;
        case 'excitation':
            this._excitation = <YMultiCellWeighScale_Excitation> <number> val;
            return 1;
        case 'tempAvgAdaptRatio':
            this._tempAvgAdaptRatio = <number> Math.round(<number>val * 1000.0 / 65536.0) / 1000.0;
            return 1;
        case 'tempChgAdaptRatio':
            this._tempChgAdaptRatio = <number> Math.round(<number>val * 1000.0 / 65536.0) / 1000.0;
            return 1;
        case 'compTempAvg':
            this._compTempAvg = <number> Math.round(<number>val * 1000.0 / 65536.0) / 1000.0;
            return 1;
        case 'compTempChg':
            this._compTempChg = <number> Math.round(<number>val * 1000.0 / 65536.0) / 1000.0;
            return 1;
        case 'compensation':
            this._compensation = <number> Math.round(<number>val * 1000.0 / 65536.0) / 1000.0;
            return 1;
        case 'zeroTracking':
            this._zeroTracking = <number> Math.round(<number>val * 1000.0 / 65536.0) / 1000.0;
            return 1;
        case 'command':
            this._command = <string> <string> val;
            return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Changes the measuring unit for the weight.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : a string corresponding to the measuring unit for the weight
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_unit(newval: string): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('unit',rest_val);
    }

    /**
     * Returns the number of load cells in use.
     *
     * @return an integer corresponding to the number of load cells in use
     *
     * On failure, throws an exception or returns YMultiCellWeighScale.CELLCOUNT_INVALID.
     */
    async get_cellCount(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YMultiCellWeighScale.CELLCOUNT_INVALID;
            }
        }
        res = this._cellCount;
        return res;
    }

    /**
     * Changes the number of load cells in use. Remember to call the saveToFlash()
     * method of the module if the modification must be kept.
     *
     * @param newval : an integer corresponding to the number of load cells in use
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_cellCount(newval: number): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('cellCount',rest_val);
    }

    /**
     * Returns true if entry 4 is used as external sense for 6-wires load cells.
     *
     * @return either YMultiCellWeighScale.EXTERNALSENSE_FALSE or YMultiCellWeighScale.EXTERNALSENSE_TRUE,
     * according to true if entry 4 is used as external sense for 6-wires load cells
     *
     * On failure, throws an exception or returns YMultiCellWeighScale.EXTERNALSENSE_INVALID.
     */
    async get_externalSense(): Promise<YMultiCellWeighScale_ExternalSense>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YMultiCellWeighScale.EXTERNALSENSE_INVALID;
            }
        }
        res = this._externalSense;
        return res;
    }

    /**
     * Changes the configuration to tell if entry 4 is used as external sense for
     * 6-wires load cells. Remember to call the saveToFlash() method of the
     * module if the modification must be kept.
     *
     * @param newval : either YMultiCellWeighScale.EXTERNALSENSE_FALSE or
     * YMultiCellWeighScale.EXTERNALSENSE_TRUE, according to the configuration to tell if entry 4 is used
     * as external sense for
     *         6-wires load cells
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_externalSense(newval: YMultiCellWeighScale_ExternalSense): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('externalSense',rest_val);
    }

    /**
     * Returns the current load cell bridge excitation method.
     *
     * @return a value among YMultiCellWeighScale.EXCITATION_OFF, YMultiCellWeighScale.EXCITATION_DC and
     * YMultiCellWeighScale.EXCITATION_AC corresponding to the current load cell bridge excitation method
     *
     * On failure, throws an exception or returns YMultiCellWeighScale.EXCITATION_INVALID.
     */
    async get_excitation(): Promise<YMultiCellWeighScale_Excitation>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YMultiCellWeighScale.EXCITATION_INVALID;
            }
        }
        res = this._excitation;
        return res;
    }

    /**
     * Changes the current load cell bridge excitation method.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : a value among YMultiCellWeighScale.EXCITATION_OFF,
     * YMultiCellWeighScale.EXCITATION_DC and YMultiCellWeighScale.EXCITATION_AC corresponding to the
     * current load cell bridge excitation method
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_excitation(newval: YMultiCellWeighScale_Excitation): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('excitation',rest_val);
    }

    /**
     * Changes the averaged temperature update rate, in per mille.
     * The purpose of this adaptation ratio is to model the thermal inertia of the load cell.
     * The averaged temperature is updated every 10 seconds, by applying this adaptation rate
     * to the difference between the measures ambient temperature and the current compensation
     * temperature. The standard rate is 0.2 per mille, and the maximal rate is 65 per mille.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : a floating point number corresponding to the averaged temperature update rate, in per mille
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_tempAvgAdaptRatio(newval: number): Promise<number>
    {
        let rest_val: string;
        rest_val = String(Math.round(newval * 65536.0));
        return await this._setAttr('tempAvgAdaptRatio',rest_val);
    }

    /**
     * Returns the averaged temperature update rate, in per mille.
     * The purpose of this adaptation ratio is to model the thermal inertia of the load cell.
     * The averaged temperature is updated every 10 seconds, by applying this adaptation rate
     * to the difference between the measures ambient temperature and the current compensation
     * temperature. The standard rate is 0.2 per mille, and the maximal rate is 65 per mille.
     *
     * @return a floating point number corresponding to the averaged temperature update rate, in per mille
     *
     * On failure, throws an exception or returns YMultiCellWeighScale.TEMPAVGADAPTRATIO_INVALID.
     */
    async get_tempAvgAdaptRatio(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YMultiCellWeighScale.TEMPAVGADAPTRATIO_INVALID;
            }
        }
        res = this._tempAvgAdaptRatio;
        return res;
    }

    /**
     * Changes the temperature change update rate, in per mille.
     * The temperature change is updated every 10 seconds, by applying this adaptation rate
     * to the difference between the measures ambient temperature and the current temperature used for
     * change compensation. The standard rate is 0.6 per mille, and the maximal rate is 65 per mille.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : a floating point number corresponding to the temperature change update rate, in per mille
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_tempChgAdaptRatio(newval: number): Promise<number>
    {
        let rest_val: string;
        rest_val = String(Math.round(newval * 65536.0));
        return await this._setAttr('tempChgAdaptRatio',rest_val);
    }

    /**
     * Returns the temperature change update rate, in per mille.
     * The temperature change is updated every 10 seconds, by applying this adaptation rate
     * to the difference between the measures ambient temperature and the current temperature used for
     * change compensation. The standard rate is 0.6 per mille, and the maximal rate is 65 per mille.
     *
     * @return a floating point number corresponding to the temperature change update rate, in per mille
     *
     * On failure, throws an exception or returns YMultiCellWeighScale.TEMPCHGADAPTRATIO_INVALID.
     */
    async get_tempChgAdaptRatio(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YMultiCellWeighScale.TEMPCHGADAPTRATIO_INVALID;
            }
        }
        res = this._tempChgAdaptRatio;
        return res;
    }

    /**
     * Returns the current averaged temperature, used for thermal compensation.
     *
     * @return a floating point number corresponding to the current averaged temperature, used for thermal compensation
     *
     * On failure, throws an exception or returns YMultiCellWeighScale.COMPTEMPAVG_INVALID.
     */
    async get_compTempAvg(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YMultiCellWeighScale.COMPTEMPAVG_INVALID;
            }
        }
        res = this._compTempAvg;
        return res;
    }

    /**
     * Returns the current temperature variation, used for thermal compensation.
     *
     * @return a floating point number corresponding to the current temperature variation, used for
     * thermal compensation
     *
     * On failure, throws an exception or returns YMultiCellWeighScale.COMPTEMPCHG_INVALID.
     */
    async get_compTempChg(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YMultiCellWeighScale.COMPTEMPCHG_INVALID;
            }
        }
        res = this._compTempChg;
        return res;
    }

    /**
     * Returns the current current thermal compensation value.
     *
     * @return a floating point number corresponding to the current current thermal compensation value
     *
     * On failure, throws an exception or returns YMultiCellWeighScale.COMPENSATION_INVALID.
     */
    async get_compensation(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YMultiCellWeighScale.COMPENSATION_INVALID;
            }
        }
        res = this._compensation;
        return res;
    }

    /**
     * Changes the zero tracking threshold value. When this threshold is larger than
     * zero, any measure under the threshold will automatically be ignored and the
     * zero compensation will be updated.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : a floating point number corresponding to the zero tracking threshold value
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_zeroTracking(newval: number): Promise<number>
    {
        let rest_val: string;
        rest_val = String(Math.round(newval * 65536.0));
        return await this._setAttr('zeroTracking',rest_val);
    }

    /**
     * Returns the zero tracking threshold value. When this threshold is larger than
     * zero, any measure under the threshold will automatically be ignored and the
     * zero compensation will be updated.
     *
     * @return a floating point number corresponding to the zero tracking threshold value
     *
     * On failure, throws an exception or returns YMultiCellWeighScale.ZEROTRACKING_INVALID.
     */
    async get_zeroTracking(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YMultiCellWeighScale.ZEROTRACKING_INVALID;
            }
        }
        res = this._zeroTracking;
        return res;
    }

    async get_command(): Promise<string>
    {
        let res: string;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YMultiCellWeighScale.COMMAND_INVALID;
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
     * Retrieves a multi-cell weighing scale sensor for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the multi-cell weighing scale sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YMultiCellWeighScale.isOnline() to test if the multi-cell weighing scale sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a multi-cell weighing scale sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the multi-cell weighing scale sensor, for instance
     *         YWMBRDG1.multiCellWeighScale.
     *
     * @return a YMultiCellWeighScale object allowing you to drive the multi-cell weighing scale sensor.
     */
    static FindMultiCellWeighScale(func: string): YMultiCellWeighScale
    {
        let obj: YMultiCellWeighScale;
        obj = <YMultiCellWeighScale> YFunction._FindFromCache('MultiCellWeighScale', func);
        if (obj == null) {
            obj = new YMultiCellWeighScale(YAPI, func);
            YFunction._AddToCache('MultiCellWeighScale',  func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a multi-cell weighing scale sensor for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the multi-cell weighing scale sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YMultiCellWeighScale.isOnline() to test if the multi-cell weighing scale sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a multi-cell weighing scale sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx : a YAPI context
     * @param func : a string that uniquely characterizes the multi-cell weighing scale sensor, for instance
     *         YWMBRDG1.multiCellWeighScale.
     *
     * @return a YMultiCellWeighScale object allowing you to drive the multi-cell weighing scale sensor.
     */
    static FindMultiCellWeighScaleInContext(yctx: YAPIContext, func: string): YMultiCellWeighScale
    {
        let obj: YMultiCellWeighScale;
        obj = <YMultiCellWeighScale> YFunction._FindFromCacheInContext(yctx,  'MultiCellWeighScale', func);
        if (obj == null) {
            obj = new YMultiCellWeighScale(yctx, func);
            YFunction._AddToCache('MultiCellWeighScale',  func, obj);
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
    async registerValueCallback(callback: YMultiCellWeighScaleValueCallback | null): Promise<number>
    {
        let val: string;
        if (callback != null) {
            await YFunction._UpdateValueCallbackList(this, true);
        } else {
            await YFunction._UpdateValueCallbackList(this, false);
        }
        this._valueCallbackMultiCellWeighScale = callback;
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
        if (this._valueCallbackMultiCellWeighScale != null) {
            try {
                await this._valueCallbackMultiCellWeighScale(this, value);
            } catch (e) {
                this._yapi.imm_log('Exception in valueCallback:', e);
            }
        } else {
            super._invokeValueCallback(value);
        }
        return 0;
    }

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
    async registerTimedReportCallback(callback: YMultiCellWeighScaleTimedReportCallback | null): Promise<number>
    {
        let sensor: YSensor;
        sensor = this;
        if (callback != null) {
            await YFunction._UpdateTimedReportCallbackList(sensor, true);
        } else {
            await YFunction._UpdateTimedReportCallbackList(sensor, false);
        }
        this._timedReportCallbackMultiCellWeighScale = callback;
        return 0;
    }

    async _invokeTimedReportCallback(value: YMeasure): Promise<number>
    {
        if (this._timedReportCallbackMultiCellWeighScale != null) {
            try {
                await this._timedReportCallbackMultiCellWeighScale(this, value);
            } catch (e) {
                this._yapi.imm_log('Exception in timedReportCallback:', e);
            }
        } else {
            super._invokeTimedReportCallback(value);
        }
        return 0;
    }

    /**
     * Adapts the load cell signal bias (stored in the corresponding genericSensor)
     * so that the current signal corresponds to a zero weight. Remember to call the
     * saveToFlash() method of the module if the modification must be kept.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async tare(): Promise<number>
    {
        return await this.set_command('T');
    }

    /**
     * Configures the load cells span parameters (stored in the corresponding genericSensors)
     * so that the current signal corresponds to the specified reference weight.
     *
     * @param currWeight : reference weight presently on the load cell.
     * @param maxWeight : maximum weight to be expected on the load cell.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async setupSpan(currWeight: number, maxWeight: number): Promise<number>
    {
        return await this.set_command('S'+String(Math.round(<number> Math.round(1000*currWeight)))+':'+String(Math.round(<number> Math.round(1000*maxWeight))));
    }

    /**
     * Continues the enumeration of multi-cell weighing scale sensors started using yFirstMultiCellWeighScale().
     * Caution: You can't make any assumption about the returned multi-cell weighing scale sensors order.
     * If you want to find a specific a multi-cell weighing scale sensor, use
     * MultiCellWeighScale.findMultiCellWeighScale()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YMultiCellWeighScale object, corresponding to
     *         a multi-cell weighing scale sensor currently online, or a null pointer
     *         if there are no more multi-cell weighing scale sensors to enumerate.
     */
    nextMultiCellWeighScale(): YMultiCellWeighScale | null
    {
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI.SUCCESS) return null;
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, <string> resolve.result);
        if(next_hwid == null) return null;
        return YMultiCellWeighScale.FindMultiCellWeighScaleInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of multi-cell weighing scale sensors currently accessible.
     * Use the method YMultiCellWeighScale.nextMultiCellWeighScale() to iterate on
     * next multi-cell weighing scale sensors.
     *
     * @return a pointer to a YMultiCellWeighScale object, corresponding to
     *         the first multi-cell weighing scale sensor currently online, or a null pointer
     *         if there are none.
     */
    static FirstMultiCellWeighScale(): YMultiCellWeighScale | null
    {
        let next_hwid = YAPI.imm_getFirstHardwareId('MultiCellWeighScale');
        if(next_hwid == null) return null;
        return YMultiCellWeighScale.FindMultiCellWeighScale(next_hwid);
    }

    /**
     * Starts the enumeration of multi-cell weighing scale sensors currently accessible.
     * Use the method YMultiCellWeighScale.nextMultiCellWeighScale() to iterate on
     * next multi-cell weighing scale sensors.
     *
     * @param yctx : a YAPI context.
     *
     * @return a pointer to a YMultiCellWeighScale object, corresponding to
     *         the first multi-cell weighing scale sensor currently online, or a null pointer
     *         if there are none.
     */
    static FirstMultiCellWeighScaleInContext(yctx: YAPIContext): YMultiCellWeighScale | null
    {
        let next_hwid = yctx.imm_getFirstHardwareId('MultiCellWeighScale');
        if(next_hwid == null) return null;
        return YMultiCellWeighScale.FindMultiCellWeighScaleInContext(yctx, next_hwid);
    }

    //--- (end of YMultiCellWeighScale implementation)
}

