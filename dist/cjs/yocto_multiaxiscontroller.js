"use strict";
/*********************************************************************
 *
 *  $Id: svn_id $
 *
 *  Implements the high-level API for MultiAxisController functions
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
exports.YMultiAxisController = void 0;
const yocto_api_js_1 = require("./yocto_api.js");
//--- (end of YMultiAxisController definitions)
//--- (YMultiAxisController class start)
/**
 * YMultiAxisController Class: MultiAxisController function interface
 *
 * The YMultiAxisController class allows you to drive multiple stepper motors
 * synchronously.
 */
//--- (end of YMultiAxisController class start)
class YMultiAxisController extends yocto_api_js_1.YFunction {
    //--- (end of YMultiAxisController attributes declaration)
    //--- (YMultiAxisController return codes)
    //--- (end of YMultiAxisController return codes)
    constructor(yapi, func) {
        //--- (YMultiAxisController constructor)
        super(yapi, func);
        this._nAxis = YMultiAxisController.NAXIS_INVALID;
        this._globalState = YMultiAxisController.GLOBALSTATE_INVALID;
        this._command = YMultiAxisController.COMMAND_INVALID;
        this._valueCallbackMultiAxisController = null;
        // API symbols as object properties
        this.NAXIS_INVALID = yocto_api_js_1.YAPI.INVALID_UINT;
        this.GLOBALSTATE_ABSENT = 0 /* ABSENT */;
        this.GLOBALSTATE_ALERT = 1 /* ALERT */;
        this.GLOBALSTATE_HI_Z = 2 /* HI_Z */;
        this.GLOBALSTATE_STOP = 3 /* STOP */;
        this.GLOBALSTATE_RUN = 4 /* RUN */;
        this.GLOBALSTATE_BATCH = 5 /* BATCH */;
        this.GLOBALSTATE_INVALID = -1 /* INVALID */;
        this.COMMAND_INVALID = yocto_api_js_1.YAPI.INVALID_STRING;
        this._className = 'MultiAxisController';
        //--- (end of YMultiAxisController constructor)
    }
    //--- (YMultiAxisController implementation)
    imm_parseAttr(name, val) {
        switch (name) {
            case 'nAxis':
                this._nAxis = val;
                return 1;
            case 'globalState':
                this._globalState = val;
                return 1;
            case 'command':
                this._command = val;
                return 1;
        }
        return super.imm_parseAttr(name, val);
    }
    /**
     * Returns the number of synchronized controllers.
     *
     * @return an integer corresponding to the number of synchronized controllers
     *
     * On failure, throws an exception or returns Y_NAXIS_INVALID.
     */
    async get_nAxis() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YMultiAxisController.NAXIS_INVALID;
            }
        }
        res = this._nAxis;
        return res;
    }
    /**
     * Changes the number of synchronized controllers.
     *
     * @param newval : an integer corresponding to the number of synchronized controllers
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_nAxis(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('nAxis', rest_val);
    }
    /**
     * Returns the stepper motor set overall state.
     *
     * @return a value among Y_GLOBALSTATE_ABSENT, Y_GLOBALSTATE_ALERT, Y_GLOBALSTATE_HI_Z,
     * Y_GLOBALSTATE_STOP, Y_GLOBALSTATE_RUN and Y_GLOBALSTATE_BATCH corresponding to the stepper motor
     * set overall state
     *
     * On failure, throws an exception or returns Y_GLOBALSTATE_INVALID.
     */
    async get_globalState() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YMultiAxisController.GLOBALSTATE_INVALID;
            }
        }
        res = this._globalState;
        return res;
    }
    async get_command() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YMultiAxisController.COMMAND_INVALID;
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
     * Retrieves $AFUNCTION$ for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that $THEFUNCTION$ is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YMultiAxisController.isOnline() to test if $THEFUNCTION$ is
     * indeed online at a given time. In case of ambiguity when looking for
     * $AFUNCTION$ by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes $THEFUNCTION$, for instance
     *         $FULLHARDWAREID$.
     *
     * @return a YMultiAxisController object allowing you to drive $THEFUNCTION$.
     */
    static FindMultiAxisController(func) {
        let obj;
        obj = yocto_api_js_1.YFunction._FindFromCache('MultiAxisController', func);
        if (obj == null) {
            obj = new YMultiAxisController(yocto_api_js_1.YAPI, func);
            yocto_api_js_1.YFunction._AddToCache('MultiAxisController', func, obj);
        }
        return obj;
    }
    /**
     * Retrieves $AFUNCTION$ for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that $THEFUNCTION$ is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YMultiAxisController.isOnline() to test if $THEFUNCTION$ is
     * indeed online at a given time. In case of ambiguity when looking for
     * $AFUNCTION$ by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx : a YAPI context
     * @param func : a string that uniquely characterizes $THEFUNCTION$, for instance
     *         $FULLHARDWAREID$.
     *
     * @return a YMultiAxisController object allowing you to drive $THEFUNCTION$.
     */
    static FindMultiAxisControllerInContext(yctx, func) {
        let obj;
        obj = yocto_api_js_1.YFunction._FindFromCacheInContext(yctx, 'MultiAxisController', func);
        if (obj == null) {
            obj = new YMultiAxisController(yctx, func);
            yocto_api_js_1.YFunction._AddToCache('MultiAxisController', func, obj);
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
        this._valueCallbackMultiAxisController = callback;
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
        if (this._valueCallbackMultiAxisController != null) {
            try {
                await this._valueCallbackMultiAxisController(this, value);
            }
            catch (e) {
                this._yapi.imm_log('Exception in valueCallback:', e);
            }
        }
        else {
            super._invokeValueCallback(value);
        }
        return 0;
    }
    async sendCommand(command) {
        let url;
        let retBin;
        let res;
        url = 'cmd.txt?X=' + command;
        //may throw an exception
        retBin = await this._download(url);
        res = retBin[0];
        if (res < 58) {
            if (!(res == 48)) {
                return this._throw(this._yapi.DEVICE_BUSY, 'Motor command pipeline is full, try again later', this._yapi.DEVICE_BUSY);
            }
        }
        else {
            if (!(res == 48)) {
                return this._throw(this._yapi.IO_ERROR, 'Motor command failed permanently', this._yapi.IO_ERROR);
            }
        }
        return this._yapi.SUCCESS;
    }
    /**
     * Reinitialize all controllers and clear all alert flags.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    async reset() {
        return await this.set_command('Z');
    }
    /**
     * Starts all motors backward at the specified speeds, to search for the motor home position.
     *
     * @param speed : desired speed for all axis, in steps per second.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    async findHomePosition(speed) {
        let cmd;
        let i;
        let ndim;
        ndim = speed.length;
        cmd = 'H' + String(Math.round(Math.round(1000 * speed[0])));
        i = 1;
        while (i < ndim) {
            cmd = cmd + ',' + String(Math.round(Math.round(1000 * speed[i])));
            i = i + 1;
        }
        return await this.sendCommand(cmd);
    }
    /**
     * Starts all motors synchronously to reach a given absolute position.
     * The time needed to reach the requested position will depend on the lowest
     * acceleration and max speed parameters configured for all motors.
     * The final position will be reached on all axis at the same time.
     *
     * @param absPos : absolute position, measured in steps from each origin.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    async moveTo(absPos) {
        let cmd;
        let i;
        let ndim;
        ndim = absPos.length;
        cmd = 'M' + String(Math.round(Math.round(16 * absPos[0])));
        i = 1;
        while (i < ndim) {
            cmd = cmd + ',' + String(Math.round(Math.round(16 * absPos[i])));
            i = i + 1;
        }
        return await this.sendCommand(cmd);
    }
    /**
     * Starts all motors synchronously to reach a given relative position.
     * The time needed to reach the requested position will depend on the lowest
     * acceleration and max speed parameters configured for all motors.
     * The final position will be reached on all axis at the same time.
     *
     * @param relPos : relative position, measured in steps from the current position.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    async moveRel(relPos) {
        let cmd;
        let i;
        let ndim;
        ndim = relPos.length;
        cmd = 'm' + String(Math.round(Math.round(16 * relPos[0])));
        i = 1;
        while (i < ndim) {
            cmd = cmd + ',' + String(Math.round(Math.round(16 * relPos[i])));
            i = i + 1;
        }
        return await this.sendCommand(cmd);
    }
    /**
     * Keep the motor in the same state for the specified amount of time, before processing next command.
     *
     * @param waitMs : wait time, specified in milliseconds.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    async pause(waitMs) {
        return await this.sendCommand('_' + String(Math.round(waitMs)));
    }
    /**
     * Stops the motor with an emergency alert, without taking any additional precaution.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    async emergencyStop() {
        return await this.set_command('!');
    }
    /**
     * Stops the motor smoothly as soon as possible, without waiting for ongoing move completion.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    async abortAndBrake() {
        return await this.set_command('B');
    }
    /**
     * Turn the controller into Hi-Z mode immediately, without waiting for ongoing move completion.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    async abortAndHiZ() {
        return await this.set_command('z');
    }
    /**
     * Returns the next MultiAxisController
     *
     * @returns {YMultiAxisController}
     */
    nextMultiAxisController() {
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != yocto_api_js_1.YAPI.SUCCESS)
            return null;
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if (next_hwid == null)
            return null;
        return YMultiAxisController.FindMultiAxisControllerInContext(this._yapi, next_hwid);
    }
    /**
     * Retrieves the first MultiAxisController in a YAPI context
     *
     * @returns {YMultiAxisController}
     */
    static FirstMultiAxisController() {
        let next_hwid = yocto_api_js_1.YAPI.imm_getFirstHardwareId('MultiAxisController');
        if (next_hwid == null)
            return null;
        return YMultiAxisController.FindMultiAxisController(next_hwid);
    }
    /**
     * Retrieves the first MultiAxisController in a given context
     *
     * @param yctx {YAPIContext}
     *
     * @returns {YMultiAxisController}
     */
    static FirstMultiAxisControllerInContext(yctx) {
        let next_hwid = yctx.imm_getFirstHardwareId('MultiAxisController');
        if (next_hwid == null)
            return null;
        return YMultiAxisController.FindMultiAxisControllerInContext(yctx, next_hwid);
    }
}
exports.YMultiAxisController = YMultiAxisController;
// API symbols as static members
YMultiAxisController.NAXIS_INVALID = yocto_api_js_1.YAPI.INVALID_UINT;
YMultiAxisController.GLOBALSTATE_ABSENT = 0 /* ABSENT */;
YMultiAxisController.GLOBALSTATE_ALERT = 1 /* ALERT */;
YMultiAxisController.GLOBALSTATE_HI_Z = 2 /* HI_Z */;
YMultiAxisController.GLOBALSTATE_STOP = 3 /* STOP */;
YMultiAxisController.GLOBALSTATE_RUN = 4 /* RUN */;
YMultiAxisController.GLOBALSTATE_BATCH = 5 /* BATCH */;
YMultiAxisController.GLOBALSTATE_INVALID = -1 /* INVALID */;
YMultiAxisController.COMMAND_INVALID = yocto_api_js_1.YAPI.INVALID_STRING;
//# sourceMappingURL=yocto_multiaxiscontroller.js.map