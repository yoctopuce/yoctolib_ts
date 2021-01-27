/*********************************************************************
 *
 *  $Id: yocto_files.ts 43483 2021-01-21 15:47:50Z mvuilleu $
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
import { YAPIContext, YFunction } from './yocto_api.js';
/**
 * YFileRecord Class: Description of a file on the device filesystem, returned by files.get_list
 *
 * YFileRecord objects are used to describe a file that is stored on a Yoctopuce device.
 * These objects are used in particular in conjunction with the YFiles class.
 */
export declare class YFileRecord {
    _name: string;
    _size: number;
    _crc: number;
    constructor(str_json: string);
    /**
     * Returns the name of the file.
     *
     * @return a string with the name of the file.
     */
    get_name(): Promise<string>;
    /**
     * Returns the size of the file in bytes.
     *
     * @return the size of the file.
     */
    get_size(): Promise<number>;
    /**
     * Returns the 32-bit CRC of the file content.
     *
     * @return the 32-bit CRC of the file content.
     */
    get_crc(): Promise<number>;
}
export interface YFilesValueCallback {
    (func: YFiles, value: string): void;
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
/** @extends {YFunction} **/
export declare class YFiles extends YFunction {
    _className: string;
    _filesCount: number;
    _freeSpace: number;
    _valueCallbackFiles: YFilesValueCallback | null;
    readonly FILESCOUNT_INVALID: number;
    readonly FREESPACE_INVALID: number;
    static readonly FILESCOUNT_INVALID: number;
    static readonly FREESPACE_INVALID: number;
    constructor(yapi: YAPIContext, func: string);
    imm_parseAttr(name: string, val: any): 0 | 1;
    /**
     * Returns the number of files currently loaded in the filesystem.
     *
     * @return an integer corresponding to the number of files currently loaded in the filesystem
     *
     * On failure, throws an exception or returns YFiles.FILESCOUNT_INVALID.
     */
    get_filesCount(): Promise<number>;
    /**
     * Returns the free space for uploading new files to the filesystem, in bytes.
     *
     * @return an integer corresponding to the free space for uploading new files to the filesystem, in bytes
     *
     * On failure, throws an exception or returns YFiles.FREESPACE_INVALID.
     */
    get_freeSpace(): Promise<number>;
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
     *         YRGBLED2.files.
     *
     * @return a YFiles object allowing you to drive the filesystem.
     */
    static FindFiles(func: string): YFiles;
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
     *         YRGBLED2.files.
     *
     * @return a YFiles object allowing you to drive the filesystem.
     */
    static FindFilesInContext(yctx: YAPIContext, func: string): YFiles;
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
    registerValueCallback(callback: YFilesValueCallback | null): Promise<number>;
    _invokeValueCallback(value: string): Promise<number>;
    sendCommand(command: string): Promise<Uint8Array>;
    /**
     * Reinitialize the filesystem to its clean, unfragmented, empty state.
     * All files previously uploaded are permanently lost.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    format_fs(): Promise<number>;
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
    get_list(pattern: string): Promise<YFileRecord[]>;
    /**
     * Test if a file exist on the filesystem of the module.
     *
     * @param filename : the file name to test.
     *
     * @return a true if the file exist, false otherwise.
     *
     * On failure, throws an exception.
     */
    fileExist(filename: string): Promise<boolean>;
    /**
     * Downloads the requested file and returns a binary buffer with its content.
     *
     * @param pathname : path and name of the file to download
     *
     * @return a binary buffer with the file content
     *
     * On failure, throws an exception or returns an empty content.
     */
    download(pathname: string): Promise<Uint8Array>;
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
    upload(pathname: string, content: Uint8Array): Promise<number>;
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
    remove(pathname: string): Promise<number>;
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
    nextFiles(): YFiles | null;
    /**
     * Starts the enumeration of filesystems currently accessible.
     * Use the method YFiles.nextFiles() to iterate on
     * next filesystems.
     *
     * @return a pointer to a YFiles object, corresponding to
     *         the first filesystem currently online, or a null pointer
     *         if there are none.
     */
    static FirstFiles(): YFiles | null;
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
    static FirstFilesInContext(yctx: YAPIContext): YFiles | null;
}
