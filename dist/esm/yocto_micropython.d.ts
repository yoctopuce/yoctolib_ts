/*********************************************************************
 *
 *  $Id: svn_id $
 *
 *  Implements the high-level API for MicroPython functions
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
 * YMicroPython Class: MicroPython interpreter control interface
 *
 * The YMicroPython class provides control of the MicroPython interpreter
 * that can be found on some Yoctopuce devices.
 */
export declare class YMicroPython extends YFunction {
    _className: string;
    _lastMsg: string;
    _heapUsage: number;
    _xheapUsage: number;
    _currentScript: string;
    _startupScript: string;
    _debugMode: YMicroPython.DEBUGMODE;
    _command: string;
    _valueCallbackMicroPython: YMicroPython.ValueCallback | null;
    _logCallback: YMicroPython.LogCallback | null;
    _isFirstCb: boolean;
    _prevCbPos: number;
    _logPos: number;
    _prevPartialLog: string;
    readonly LASTMSG_INVALID: string;
    readonly HEAPUSAGE_INVALID: number;
    readonly XHEAPUSAGE_INVALID: number;
    readonly CURRENTSCRIPT_INVALID: string;
    readonly STARTUPSCRIPT_INVALID: string;
    readonly DEBUGMODE_OFF: YMicroPython.DEBUGMODE;
    readonly DEBUGMODE_ON: YMicroPython.DEBUGMODE;
    readonly DEBUGMODE_INVALID: YMicroPython.DEBUGMODE;
    readonly COMMAND_INVALID: string;
    static readonly LASTMSG_INVALID: string;
    static readonly HEAPUSAGE_INVALID: number;
    static readonly XHEAPUSAGE_INVALID: number;
    static readonly CURRENTSCRIPT_INVALID: string;
    static readonly STARTUPSCRIPT_INVALID: string;
    static readonly DEBUGMODE_OFF: YMicroPython.DEBUGMODE;
    static readonly DEBUGMODE_ON: YMicroPython.DEBUGMODE;
    static readonly DEBUGMODE_INVALID: YMicroPython.DEBUGMODE;
    static readonly COMMAND_INVALID: string;
    constructor(yapi: YAPIContext, func: string);
    imm_parseAttr(name: string, val: any): number;
    _internalEventCallback(YMicroPython_obj: YMicroPython, str_value: string): Promise<void>;
    /**
     * Returns the last message produced by a python script.
     *
     * @return a string corresponding to the last message produced by a python script
     *
     * On failure, throws an exception or returns YMicroPython.LASTMSG_INVALID.
     */
    get_lastMsg(): Promise<string>;
    /**
     * Returns the percentage of micropython main memory in use,
     * as observed at the end of the last garbage collection.
     *
     * @return an integer corresponding to the percentage of micropython main memory in use,
     *         as observed at the end of the last garbage collection
     *
     * On failure, throws an exception or returns YMicroPython.HEAPUSAGE_INVALID.
     */
    get_heapUsage(): Promise<number>;
    /**
     * Returns the percentage of micropython external memory in use,
     * as observed at the end of the last garbage collection.
     *
     * @return an integer corresponding to the percentage of micropython external memory in use,
     *         as observed at the end of the last garbage collection
     *
     * On failure, throws an exception or returns YMicroPython.XHEAPUSAGE_INVALID.
     */
    get_xheapUsage(): Promise<number>;
    /**
     * Returns the name of currently active script, if any.
     *
     * @return a string corresponding to the name of currently active script, if any
     *
     * On failure, throws an exception or returns YMicroPython.CURRENTSCRIPT_INVALID.
     */
    get_currentScript(): Promise<string>;
    /**
     * Stops current running script, and/or selects a script to run immediately in a
     * fresh new environment. If the MicroPython interpreter is busy running a script,
     * this function will abort it immediately and reset the execution environment.
     * If a non-empty string is given as argument, the new script will be started.
     *
     * @param newval : a string
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_currentScript(newval: string): Promise<number>;
    /**
     * Returns the name of the script to run when the device is powered on.
     *
     * @return a string corresponding to the name of the script to run when the device is powered on
     *
     * On failure, throws an exception or returns YMicroPython.STARTUPSCRIPT_INVALID.
     */
    get_startupScript(): Promise<string>;
    /**
     * Changes the script to run when the device is powered on.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : a string corresponding to the script to run when the device is powered on
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_startupScript(newval: string): Promise<number>;
    /**
     * Returns the activation state of micropython debugging interface.
     *
     * @return either YMicroPython.DEBUGMODE_OFF or YMicroPython.DEBUGMODE_ON, according to the activation
     * state of micropython debugging interface
     *
     * On failure, throws an exception or returns YMicroPython.DEBUGMODE_INVALID.
     */
    get_debugMode(): Promise<YMicroPython.DEBUGMODE>;
    /**
     * Changes the activation state of micropython debugging interface.
     *
     * @param newval : either YMicroPython.DEBUGMODE_OFF or YMicroPython.DEBUGMODE_ON, according to the
     * activation state of micropython debugging interface
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_debugMode(newval: YMicroPython.DEBUGMODE): Promise<number>;
    get_command(): Promise<string>;
    set_command(newval: string): Promise<number>;
    /**
     * Retrieves a MicroPython interpreter for a given identifier.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the MicroPython interpreter is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YMicroPython.isOnline() to test if the MicroPython interpreter is
     * indeed online at a given time. In case of ambiguity when looking for
     * a MicroPython interpreter by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the MicroPython interpreter, for instance
     *         MyDevice.microPython.
     *
     * @return a YMicroPython object allowing you to drive the MicroPython interpreter.
     */
    static FindMicroPython(func: string): YMicroPython;
    /**
     * Retrieves a MicroPython interpreter for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the MicroPython interpreter is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YMicroPython.isOnline() to test if the MicroPython interpreter is
     * indeed online at a given time. In case of ambiguity when looking for
     * a MicroPython interpreter by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx : a YAPI context
     * @param func : a string that uniquely characterizes the MicroPython interpreter, for instance
     *         MyDevice.microPython.
     *
     * @return a YMicroPython object allowing you to drive the MicroPython interpreter.
     */
    static FindMicroPythonInContext(yctx: YAPIContext, func: string): YMicroPython;
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
    registerValueCallback(callback: YMicroPython.ValueCallback | null): Promise<number>;
    _invokeValueCallback(value: string): Promise<number>;
    /**
     * Submit MicroPython code for execution in the interpreter.
     * If the MicroPython interpreter is busy, this function will
     * block until it becomes available. The code is then uploaded,
     * compiled and executed on the fly, without beeing stored on the device filesystem.
     *
     * There is no implicit reset of the MicroPython interpreter with
     * this function. Use method reset() if you need to start
     * from a fresh environment to run your code.
     *
     * Note that although MicroPython is mostly compatible with recent Python 3.x
     * interpreters, the limited ressources on the device impose some restrictions,
     * in particular regarding the libraries that can be used. Please refer to
     * the documentation for more details.
     *
     * @param codeName : name of the code file (used for error reporting only)
     * @param mpyCode : MicroPython code to compile and execute
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    eval(codeName: string, mpyCode: string): Promise<number>;
    /**
     * Stops current execution, and reset the MicroPython interpreter to initial state.
     * All global variables are cleared, and all imports are forgotten.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    reset(): Promise<number>;
    /**
     * Returns a string with last logs of the MicroPython interpreter.
     * This method return only logs that are still in the module.
     *
     * @return a string with last MicroPython logs.
     *         On failure, throws an exception or returns  YAPI.INVALID_STRING.
     */
    get_lastLogs(): Promise<string>;
    /**
     * Registers a device log callback function. This callback will be called each time
     * microPython sends a new log message.
     *
     * @param callback : the callback function to invoke, or a null pointer.
     *         The callback function should take two arguments:
     *         the module object that emitted the log message,
     *         and the character string containing the log.
     *         On failure, throws an exception or returns a negative error code.
     */
    registerLogCallback(callback: YMicroPython.LogCallback | null): Promise<number>;
    get_logCallback(): Promise<YMicroPython.LogCallback | null>;
    _internalEventHandler(cbVal: string): Promise<number>;
    /**
     * Continues the enumeration of MicroPython interpreters started using yFirstMicroPython().
     * Caution: You can't make any assumption about the returned MicroPython interpreters order.
     * If you want to find a specific a MicroPython interpreter, use MicroPython.findMicroPython()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YMicroPython object, corresponding to
     *         a MicroPython interpreter currently online, or a null pointer
     *         if there are no more MicroPython interpreters to enumerate.
     */
    nextMicroPython(): YMicroPython | null;
    /**
     * Starts the enumeration of MicroPython interpreters currently accessible.
     * Use the method YMicroPython.nextMicroPython() to iterate on
     * next MicroPython interpreters.
     *
     * @return a pointer to a YMicroPython object, corresponding to
     *         the first MicroPython interpreter currently online, or a null pointer
     *         if there are none.
     */
    static FirstMicroPython(): YMicroPython | null;
    /**
     * Starts the enumeration of MicroPython interpreters currently accessible.
     * Use the method YMicroPython.nextMicroPython() to iterate on
     * next MicroPython interpreters.
     *
     * @param yctx : a YAPI context.
     *
     * @return a pointer to a YMicroPython object, corresponding to
     *         the first MicroPython interpreter currently online, or a null pointer
     *         if there are none.
     */
    static FirstMicroPythonInContext(yctx: YAPIContext): YMicroPython | null;
}
export declare namespace YMicroPython {
    const enum DEBUGMODE {
        OFF = 0,
        ON = 1,
        INVALID = -1
    }
    interface ValueCallback {
        (func: YMicroPython, value: string): void;
    }
    interface LogCallback {
        (func: YMicroPython, logline: string): void;
    }
}
