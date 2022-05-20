/*********************************************************************
 *
 *  $Id: yocto_files.ts 49755 2022-05-13 09:48:35Z mvuilleu $
 *
 *  Implements the high-level API for FileRecord functions
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

//--- (generated code: YFileRecord class start)
/**
 * YFileRecord Class: Description of a file on the device filesystem, returned by files.get_list
 *
 * YFileRecord objects are used to describe a file that is stored on a Yoctopuce device.
 * These objects are used in particular in conjunction with the YFiles class.
 */
//--- (end of generated code: YFileRecord class start)

export class YFileRecord
{
    //--- (generated code: YFileRecord attributes declaration)
    _name: string = '';
    _size: number = 0;
    _crc: number = 0;

    // API symbols as static members
    //--- (end of generated code: YFileRecord attributes declaration)

    constructor(str_json: string)
    {
        //--- (generated code: YFileRecord constructor)
        //--- (end of generated code: YFileRecord constructor)
        var loadval = JSON.parse(str_json);
        this._name = loadval.name;
        this._size = loadval.size;
        this._crc  = loadval.crc;
    }

    //--- (generated code: YFileRecord implementation)

    /**
     * Returns the name of the file.
     *
     * @return a string with the name of the file.
     */
    async get_name(): Promise<string>
    {
        return this._name;
    }

    /**
     * Returns the size of the file in bytes.
     *
     * @return the size of the file.
     */
    async get_size(): Promise<number>
    {
        return this._size;
    }

    /**
     * Returns the 32-bit CRC of the file content.
     *
     * @return the 32-bit CRC of the file content.
     */
    async get_crc(): Promise<number>
    {
        return this._crc;
    }

    //--- (end of generated code: YFileRecord implementation)
}

export namespace YFileRecord {
    //--- (generated code: YFileRecord definitions)
    //--- (end of generated code: YFileRecord definitions)
}

/**
 * YFiles Class: filesystem control interface, available for instance in the Yocto-Color-V2, the
 * Yocto-Serial, the YoctoHub-Ethernet or the YoctoHub-Wireless-n
 *
 * The YFiles class is used to access the filesystem embedded on
 * some Yoctopuce devices. This filesystem makes it
 * possible for instance to design a custom web UI
 * (for networked devices) or to add fonts (on display devices).
 */
//--- (end of generated code: YFiles class start)
/** @extends {YFunction} **/
export class YFiles extends YFunction
{
    //--- (generated code: YFiles attributes declaration)
    _className: string;
    _filesCount: number = YFiles.FILESCOUNT_INVALID;
    _freeSpace: number = YFiles.FREESPACE_INVALID;
    _valueCallbackFiles: YFiles.ValueCallback | null = null;

    // API symbols as object properties
    public readonly FILESCOUNT_INVALID: number = YAPI.INVALID_UINT;
    public readonly FREESPACE_INVALID: number = YAPI.INVALID_UINT;

    // API symbols as static members
    public static readonly FILESCOUNT_INVALID: number = YAPI.INVALID_UINT;
    public static readonly FREESPACE_INVALID: number = YAPI.INVALID_UINT;
    //--- (end of generated code: YFiles attributes declaration)

    constructor(yapi: YAPIContext, func: string)
    {
        //--- (generated code: YFiles constructor)
        super(yapi, func);
        this._className                  = 'Files';
        //--- (end of generated code: YFiles constructor)
    }

    //--- (generated code: YFiles implementation)

    imm_parseAttr(name: string, val: any)
    {
        switch(name) {
        case 'filesCount':
            this._filesCount = <number> <number> val;
            return 1;
        case 'freeSpace':
            this._freeSpace = <number> <number> val;
            return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Returns the number of files currently loaded in the filesystem.
     *
     * @return an integer corresponding to the number of files currently loaded in the filesystem
     *
     * On failure, throws an exception or returns YFiles.FILESCOUNT_INVALID.
     */
    async get_filesCount(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YFiles.FILESCOUNT_INVALID;
            }
        }
        res = this._filesCount;
        return res;
    }

    /**
     * Returns the free space for uploading new files to the filesystem, in bytes.
     *
     * @return an integer corresponding to the free space for uploading new files to the filesystem, in bytes
     *
     * On failure, throws an exception or returns YFiles.FREESPACE_INVALID.
     */
    async get_freeSpace(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YFiles.FREESPACE_INVALID;
            }
        }
        res = this._freeSpace;
        return res;
    }

    /**
     * Retrieves a filesystem for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the filesystem is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YFiles.isOnline() to test if the filesystem is
     * indeed online at a given time. In case of ambiguity when looking for
     * a filesystem by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the filesystem, for instance
     *         YMAXBUZ1.files.
     *
     * @return a YFiles object allowing you to drive the filesystem.
     */
    static FindFiles(func: string): YFiles
    {
        let obj: YFiles | null;
        obj = <YFiles> YFunction._FindFromCache('Files', func);
        if (obj == null) {
            obj = new YFiles(YAPI, func);
            YFunction._AddToCache('Files',  func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a filesystem for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the filesystem is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YFiles.isOnline() to test if the filesystem is
     * indeed online at a given time. In case of ambiguity when looking for
     * a filesystem by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx : a YAPI context
     * @param func : a string that uniquely characterizes the filesystem, for instance
     *         YMAXBUZ1.files.
     *
     * @return a YFiles object allowing you to drive the filesystem.
     */
    static FindFilesInContext(yctx: YAPIContext, func: string): YFiles
    {
        let obj: YFiles | null;
        obj = <YFiles> YFunction._FindFromCacheInContext(yctx,  'Files', func);
        if (obj == null) {
            obj = new YFiles(yctx, func);
            YFunction._AddToCache('Files',  func, obj);
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
    async registerValueCallback(callback: YFiles.ValueCallback | null): Promise<number>
    {
        let val: string;
        if (callback != null) {
            await YFunction._UpdateValueCallbackList(this, true);
        } else {
            await YFunction._UpdateValueCallbackList(this, false);
        }
        this._valueCallbackFiles = callback;
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
        if (this._valueCallbackFiles != null) {
            try {
                await this._valueCallbackFiles(this, value);
            } catch (e) {
                this._yapi.imm_log('Exception in valueCallback:', e);
            }
        } else {
            super._invokeValueCallback(value);
        }
        return 0;
    }

    async sendCommand(command: string): Promise<Uint8Array>
    {
        let url: string;
        url = 'files.json?a='+command;

        return await this._download(url);
    }

    /**
     * Reinitialize the filesystem to its clean, unfragmented, empty state.
     * All files previously uploaded are permanently lost.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async format_fs(): Promise<number>
    {
        let json: Uint8Array;
        let res: string;
        json = await this.sendCommand('format');
        res = this.imm_json_get_key(json, 'res');
        if (!(res == 'ok')) {
            return this._throw(this._yapi.IO_ERROR,'format failed',this._yapi.IO_ERROR);
        }
        return this._yapi.SUCCESS;
    }

    /**
     * Returns a list of YFileRecord objects that describe files currently loaded
     * in the filesystem.
     *
     * @param pattern : an optional filter pattern, using star and question marks
     *         as wild cards. When an empty pattern is provided, all file records
     *         are returned.
     *
     * @return a list of YFileRecord objects, containing the file path
     *         and name, byte size and 32-bit CRC of the file content.
     *
     * On failure, throws an exception or returns an empty list.
     */
    async get_list(pattern: string): Promise<YFileRecord[]>
    {
        let json: Uint8Array;
        let filelist: string[] = [];
        let res: YFileRecord[] = [];
        json = await this.sendCommand('dir&f='+pattern);
        filelist = this.imm_json_get_array(json);
        res.length = 0;
        for (let ii in filelist) {
            res.push(new YFileRecord(filelist[ii]));
        }
        return res;
    }

    /**
     * Test if a file exist on the filesystem of the module.
     *
     * @param filename : the file name to test.
     *
     * @return a true if the file exist, false otherwise.
     *
     * On failure, throws an exception.
     */
    async fileExist(filename: string): Promise<boolean>
    {
        let json: Uint8Array;
        let filelist: string[] = [];
        if ((filename).length == 0) {
            return false;
        }
        json = await this.sendCommand('dir&f='+filename);
        filelist = this.imm_json_get_array(json);
        if (filelist.length > 0) {
            return true;
        }
        return false;
    }

    /**
     * Downloads the requested file and returns a binary buffer with its content.
     *
     * @param pathname : path and name of the file to download
     *
     * @return a binary buffer with the file content
     *
     * On failure, throws an exception or returns an empty content.
     */
    async download(pathname: string): Promise<Uint8Array>
    {
        return await this._download(pathname);
    }

    /**
     * Uploads a file to the filesystem, to the specified full path name.
     * If a file already exists with the same path name, its content is overwritten.
     *
     * @param pathname : path and name of the new file to create
     * @param content : binary buffer with the content to set
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async upload(pathname: string, content: Uint8Array): Promise<number>
    {
        return await this._upload(pathname, content);
    }

    /**
     * Deletes a file, given by its full path name, from the filesystem.
     * Because of filesystem fragmentation, deleting a file may not always
     * free up the whole space used by the file. However, rewriting a file
     * with the same path name will always reuse any space not freed previously.
     * If you need to ensure that no space is taken by previously deleted files,
     * you can use format_fs to fully reinitialize the filesystem.
     *
     * @param pathname : path and name of the file to remove.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async remove(pathname: string): Promise<number>
    {
        let json: Uint8Array;
        let res: string;
        json = await this.sendCommand('del&f='+pathname);
        res  = this.imm_json_get_key(json, 'res');
        if (!(res == 'ok')) {
            return this._throw(this._yapi.IO_ERROR,'unable to remove file',this._yapi.IO_ERROR);
        }
        return this._yapi.SUCCESS;
    }

    /**
     * Continues the enumeration of filesystems started using yFirstFiles().
     * Caution: You can't make any assumption about the returned filesystems order.
     * If you want to find a specific a filesystem, use Files.findFiles()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YFiles object, corresponding to
     *         a filesystem currently online, or a null pointer
     *         if there are no more filesystems to enumerate.
     */
    nextFiles(): YFiles | null
    {
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI.SUCCESS) return null;
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, <string> resolve.result);
        if(next_hwid == null) return null;
        return YFiles.FindFilesInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of filesystems currently accessible.
     * Use the method YFiles.nextFiles() to iterate on
     * next filesystems.
     *
     * @return a pointer to a YFiles object, corresponding to
     *         the first filesystem currently online, or a null pointer
     *         if there are none.
     */
    static FirstFiles(): YFiles | null
    {
        let next_hwid = YAPI.imm_getFirstHardwareId('Files');
        if(next_hwid == null) return null;
        return YFiles.FindFiles(next_hwid);
    }

    /**
     * Starts the enumeration of filesystems currently accessible.
     * Use the method YFiles.nextFiles() to iterate on
     * next filesystems.
     *
     * @param yctx : a YAPI context.
     *
     * @return a pointer to a YFiles object, corresponding to
     *         the first filesystem currently online, or a null pointer
     *         if there are none.
     */
    static FirstFilesInContext(yctx: YAPIContext): YFiles | null
    {
        let next_hwid = yctx.imm_getFirstHardwareId('Files');
        if(next_hwid == null) return null;
        return YFiles.FindFilesInContext(yctx, next_hwid);
    }

    //--- (end of generated code: YFiles implementation)
}

export namespace YFiles {
    //--- (generated code: YFiles definitions)
    export interface ValueCallback { (func: YFiles, value: string): void }
    //--- (end of generated code: YFiles definitions)
}

