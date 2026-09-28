/*********************************************************************
 *
 *  $Id: yocto_display.ts version 2.1.16087 (build 76087) $
 *
 *  Implements the high-level API for DisplayLayer functions
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

//--- (generated code: YDisplayLayer class start)
/**
 * YDisplayLayer Class: Interface for drawing into display layers, obtained by calling display.get_displayLayer.
 *
 * Each DisplayLayer represents an image layer containing objects
 * to display (bitmaps, text, etc.). The content is displayed only when
 * the layer is active on the screen (and not masked by other
 * overlapping layers).
 */
//--- (end of generated code: YDisplayLayer class start)

export class YDisplayLayer
{
    private _yapi: YAPIContext;
    private _display: YDisplay;
    private _id: number;
    //--- (generated code: YDisplayLayer attributes declaration)
    _cmdbuff: string = '';
    _hidden: boolean = false;
    _polyPrevX: number = 0;
    _polyPrevY: number = 0;

    // API symbols as object properties
    public readonly NO_INK: number = -1;
    public readonly BG_INK: number = -2;
    public readonly FG_INK: number = -3;
    public readonly ALIGN_TOP_LEFT: YDisplayLayer.ALIGN = 0;
    public readonly ALIGN_CENTER_LEFT: YDisplayLayer.ALIGN = 1;
    public readonly ALIGN_BASELINE_LEFT: YDisplayLayer.ALIGN = 2;
    public readonly ALIGN_BOTTOM_LEFT: YDisplayLayer.ALIGN = 3;
    public readonly ALIGN_TOP_CENTER: YDisplayLayer.ALIGN = 4;
    public readonly ALIGN_CENTER: YDisplayLayer.ALIGN = 5;
    public readonly ALIGN_BASELINE_CENTER: YDisplayLayer.ALIGN = 6;
    public readonly ALIGN_BOTTOM_CENTER: YDisplayLayer.ALIGN = 7;
    public readonly ALIGN_TOP_DECIMAL: YDisplayLayer.ALIGN = 8;
    public readonly ALIGN_CENTER_DECIMAL: YDisplayLayer.ALIGN = 9;
    public readonly ALIGN_BASELINE_DECIMAL: YDisplayLayer.ALIGN = 10;
    public readonly ALIGN_BOTTOM_DECIMAL: YDisplayLayer.ALIGN = 11;
    public readonly ALIGN_TOP_RIGHT: YDisplayLayer.ALIGN = 12;
    public readonly ALIGN_CENTER_RIGHT: YDisplayLayer.ALIGN = 13;
    public readonly ALIGN_BASELINE_RIGHT: YDisplayLayer.ALIGN = 14;
    public readonly ALIGN_BOTTOM_RIGHT: YDisplayLayer.ALIGN = 15;

    // API symbols as static members
    public static readonly NO_INK: number = -1;
    public static readonly BG_INK: number = -2;
    public static readonly FG_INK: number = -3;
    public static readonly ALIGN_TOP_LEFT: YDisplayLayer.ALIGN = 0;
    public static readonly ALIGN_CENTER_LEFT: YDisplayLayer.ALIGN = 1;
    public static readonly ALIGN_BASELINE_LEFT: YDisplayLayer.ALIGN = 2;
    public static readonly ALIGN_BOTTOM_LEFT: YDisplayLayer.ALIGN = 3;
    public static readonly ALIGN_TOP_CENTER: YDisplayLayer.ALIGN = 4;
    public static readonly ALIGN_CENTER: YDisplayLayer.ALIGN = 5;
    public static readonly ALIGN_BASELINE_CENTER: YDisplayLayer.ALIGN = 6;
    public static readonly ALIGN_BOTTOM_CENTER: YDisplayLayer.ALIGN = 7;
    public static readonly ALIGN_TOP_DECIMAL: YDisplayLayer.ALIGN = 8;
    public static readonly ALIGN_CENTER_DECIMAL: YDisplayLayer.ALIGN = 9;
    public static readonly ALIGN_BASELINE_DECIMAL: YDisplayLayer.ALIGN = 10;
    public static readonly ALIGN_BOTTOM_DECIMAL: YDisplayLayer.ALIGN = 11;
    public static readonly ALIGN_TOP_RIGHT: YDisplayLayer.ALIGN = 12;
    public static readonly ALIGN_CENTER_RIGHT: YDisplayLayer.ALIGN = 13;
    public static readonly ALIGN_BASELINE_RIGHT: YDisplayLayer.ALIGN = 14;
    public static readonly ALIGN_BOTTOM_RIGHT: YDisplayLayer.ALIGN = 15;
    //--- (end of generated code: YDisplayLayer attributes declaration)

    constructor(obj_parent: YDisplay, int_id: number)
    {
        this._yapi         = obj_parent._yapi;
        this._display      = obj_parent;
        this._id           = int_id >> 0;
        //--- (generated code: YDisplayLayer constructor)
        //--- (end of generated code: YDisplayLayer constructor)
    }

    //--- (generated code: YDisplayLayer implementation)

    must_be_flushed(): boolean
    {
        return (this._cmdbuff).length > 0;
    }

    resetHiddenFlag(): number
    {
        this._hidden = false;
        return YAPI.SUCCESS;
    }

    async flush_now(): Promise<number>
    {
        let res: number;
        res = YAPI.SUCCESS;
        if ((this._cmdbuff).length > 0) {
            res = await this._display.sendCommand(this._cmdbuff);
            this._cmdbuff = '';
        }
        return res;
    }

    async command_push(cmd: string): Promise<number>
    {
        let res: number;
        res = YAPI.SUCCESS;
        if ((this._cmdbuff).length + (cmd).length >= 64) {
            // force flush before, to prevent overflow
            await this.flush_now();
        }
        if ((this._cmdbuff).length == 0) {
            // always prepend layer ID first
            this._cmdbuff = (this._id).toString();
        }
        this._cmdbuff = this._cmdbuff + cmd;
        return res;
    }

    async command_flush(cmd: string): Promise<number>
    {
        let res: number;

        res = await this.command_push(cmd);
        if (this._hidden) {
            return res;
        }
        if (this._display.isFrozen()) {
            return res;
        }
        return await this.flush_now();
    }

    /**
     * Reverts the layer to its initial state (fully transparent, default settings).
     * Reinitializes the drawing pointer to the upper left position,
     * and selects the most visible pen color. If you only want to erase the layer
     * content, use the method clear() instead.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async reset(): Promise<number>
    {
        this._hidden = false;
        return await this.command_flush('X');
    }

    /**
     * Erases the whole content of the layer (makes it fully transparent).
     * This method does not change any other attribute of the layer.
     * To reinitialize the layer attributes to defaults settings, use the method
     * reset() instead.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async clear(): Promise<number>
    {
        return await this.command_flush('x');
    }

    /**
     * Selects the color to be used for all subsequent drawing functions,
     * for filling as well as for line and text drawing.
     * To select a different fill and outline color, use
     * selectFillColor and selectLineColor.
     * The pen color is provided as an RGB value.
     * For grayscale or monochrome displays, the value is
     * automatically converted to the proper range.
     *
     * @param color : the desired pen color, as a 24-bit RGB value
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async selectColorPen(color: number): Promise<number>
    {
        return await this.command_push('c' + ('000000'+(color).toString(16)).slice(-6).toLowerCase());
    }

    /**
     * Selects the pen gray level for all subsequent drawing functions,
     * for filling as well as for line and text drawing.
     * To select a different fill and outline color, use
     * selectFillColor and selectLineColor.
     * The gray level is provided as a number between
     * 0 (black) and 255 (white, or whichever the lightest color is).
     * For monochrome displays (without gray levels), any value
     * lower than 128 is rendered as black, and any value equal
     * or above to 128 is non-black.
     *
     * @param graylevel : the desired gray level, from 0 to 255
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async selectGrayPen(graylevel: number): Promise<number>
    {
        return await this.command_push('g' + String(Math.round(graylevel)));
    }

    /**
     * Selects an eraser instead of a pen for all subsequent drawing functions,
     * except for bitmap copy functions. Any point drawn using the eraser
     * becomes transparent (as when the layer is empty), showing the other
     * layers beneath it.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async selectEraser(): Promise<number>
    {
        return await this.command_push('e');
    }

    /**
     * Selects the color to be used for filling rectangular bars,
     * discs and polygons. The color is provided as an RGB value.
     * For grayscale or monochrome displays, the value is
     * automatically converted to the proper range.
     * You can also use the constants FG_INK to use the
     * default drawing colour, BG_INK to use the default
     * background colour, and NO_INK to disable filling.
     *
     * @param color : the desired drawing color, as a 24-bit RGB value,
     *         or one of the constants NO_INK, FG_INK
     *         or BG_INK
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async selectFillColor(color: number): Promise<number>
    {
        let r: number;
        let g: number;
        let b: number;
        if (color==-1) {
            return await this.command_push('f_');
        }
        if (color==-2) {
            return await this.command_push('f-');
        }
        if (color==-3) {
            return await this.command_push('f.');
        }
        r = ((color >> 20) & 15);
        g = ((color >> 12) & 15);
        b = ((color >> 4) & 15);
        return await this.command_push('f' + (r).toString(16).toLowerCase() + '' + (g).toString(16).toLowerCase() + '' + (b).toString(16).toLowerCase());
    }

    /**
     * Selects the color to be used for drawing the outline of rectangular
     * bars, discs and polygons, as well as for drawing lines and text.
     * The color is provided as an RGB value.
     * For grayscale or monochrome displays, the value is
     * automatically converted to the proper range.
     * You can also use the constants FG_INK to use the
     * default drawing colour, BG_INK to use the default
     * background colour, and NO_INK to disable outline drawing.
     *
     * @param color : the desired drawing color, as a 24-bit RGB value,
     *         or one of the constants NO_INK, FG_INK
     *         or BG_INK
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async selectLineColor(color: number): Promise<number>
    {
        let r: number;
        let g: number;
        let b: number;
        if (color==-1) {
            return await this.command_push('l_');
        }
        if (color==-2) {
            return await this.command_push('l-');
        }
        if (color==-3) {
            return await this.command_push('l*');
        }
        r = ((color >> 20) & 15);
        g = ((color >> 12) & 15);
        b = ((color >> 4) & 15);
        return await this.command_push('l' + (r).toString(16).toLowerCase() + '' + (g).toString(16).toLowerCase() + '' + (b).toString(16).toLowerCase());
    }

    /**
     * Selects the line width for drawing the outline of rectangular
     * bars, discs and polygons, as well as for drawing lines.
     *
     * @param width : the desired line width, in pixels
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async selectLineWidth(width: number): Promise<number>
    {
        return await this.command_push('t' + String(Math.round(width)));
    }

    async setAntialiasingMode(mode: boolean): Promise<number>
    {
        return await this.command_push('a' + (mode?"1":"0"));
    }

    /**
     * Draws a single pixel at the specified position.
     *
     * @param x : the distance from left of layer, in pixels
     * @param y : the distance from top of layer, in pixels
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async drawPixel(x: number, y: number): Promise<number>
    {
        return await this.command_flush('P' + String(Math.round(x)) + ',' + String(Math.round(y)));
    }

    /**
     * Draws an empty rectangle at a specified position.
     *
     * @param x1 : the distance from left of layer to the left border of the rectangle, in pixels
     * @param y1 : the distance from top of layer to the top border of the rectangle, in pixels
     * @param x2 : the distance from left of layer to the right border of the rectangle, in pixels
     * @param y2 : the distance from top of layer to the bottom border of the rectangle, in pixels
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async drawRect(x1: number, y1: number, x2: number, y2: number): Promise<number>
    {
        return await this.command_flush('R' + String(Math.round(x1)) + ',' + String(Math.round(y1)) + ',' + String(Math.round(x2)) + ',' + String(Math.round(y2)));
    }

    /**
     * Draws a filled rectangular bar at a specified position.
     *
     * @param x1 : the distance from left of layer to the left border of the rectangle, in pixels
     * @param y1 : the distance from top of layer to the top border of the rectangle, in pixels
     * @param x2 : the distance from left of layer to the right border of the rectangle, in pixels
     * @param y2 : the distance from top of layer to the bottom border of the rectangle, in pixels
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async drawBar(x1: number, y1: number, x2: number, y2: number): Promise<number>
    {
        return await this.command_flush('B' + String(Math.round(x1)) + ',' + String(Math.round(y1)) + ',' + String(Math.round(x2)) + ',' + String(Math.round(y2)));
    }

    /**
     * Draws an empty circle at a specified position.
     *
     * @param x : the distance from left of layer to the center of the circle, in pixels
     * @param y : the distance from top of layer to the center of the circle, in pixels
     * @param r : the radius of the circle, in pixels
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async drawCircle(x: number, y: number, r: number): Promise<number>
    {
        return await this.command_flush('C' + String(Math.round(x)) + ',' + String(Math.round(y)) + ',' + String(Math.round(r)));
    }

    /**
     * Draws a filled disc at a given position.
     *
     * @param x : the distance from left of layer to the center of the disc, in pixels
     * @param y : the distance from top of layer to the center of the disc, in pixels
     * @param r : the radius of the disc, in pixels
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async drawDisc(x: number, y: number, r: number): Promise<number>
    {
        return await this.command_flush('D' + String(Math.round(x)) + ',' + String(Math.round(y)) + ',' + String(Math.round(r)));
    }

    /**
     * Selects a font to use for the next text drawing functions, by providing the name of the
     * font file. You can use a built-in font as well as a font file that you have previously
     * uploaded to the device built-in memory. If you experience problems selecting a font
     * file, check the device logs for any error message such as missing font file or bad font
     * file format.
     *
     * @param fontname : the font file name, embedded fonts are 8x8.yfm, Small.yfm, Medium.yfm, Large.yfm
     * (not available on Yocto-MiniDisplay).
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async selectFont(fontname: string): Promise<number>
    {
        return await this.command_push('&' + fontname + '' + String.fromCharCode(27));
    }

    /**
     * Draws a text string at the specified position. The point of the text that is aligned
     * to the specified pixel position is called the anchor point, and can be chosen among
     * several options. Text is rendered from left to right, without implicit wrapping.
     *
     * @param x : the distance from left of layer to the text anchor point, in pixels
     * @param y : the distance from top of layer to the text anchor point, in pixels
     * @param anchor : the text anchor point, chosen among the YDisplayLayer.ALIGN enumeration:
     *         YDisplayLayer.ALIGN_TOP_LEFT,         YDisplayLayer.ALIGN_CENTER_LEFT,
     *         YDisplayLayer.ALIGN_BASELINE_LEFT,    YDisplayLayer.ALIGN_BOTTOM_LEFT,
     *         YDisplayLayer.ALIGN_TOP_CENTER,       YDisplayLayer.ALIGN_CENTER,
     *         YDisplayLayer.ALIGN_BASELINE_CENTER,  YDisplayLayer.ALIGN_BOTTOM_CENTER,
     *         YDisplayLayer.ALIGN_TOP_DECIMAL,      YDisplayLayer.ALIGN_CENTER_DECIMAL,
     *         YDisplayLayer.ALIGN_BASELINE_DECIMAL, YDisplayLayer.ALIGN_BOTTOM_DECIMAL,
     *         YDisplayLayer.ALIGN_TOP_RIGHT,        YDisplayLayer.ALIGN_CENTER_RIGHT,
     *         YDisplayLayer.ALIGN_BASELINE_RIGHT,   YDisplayLayer.ALIGN_BOTTOM_RIGHT.
     * @param text : the text string to draw
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async drawText(x: number, y: number, anchor: YDisplayLayer.ALIGN, text: string): Promise<number>
    {
        let textlen: number;
        let destname: string;
        textlen = (text).length;
        if (textlen > 60) {
            if (textlen > 1000) {
                this._display._throw(YAPI.INVALID_ARGUMENT, 'text too large (max 1000 characters)');
                return YAPI.INVALID_ARGUMENT;
            }
            await this._display.flushLayers();
            destname = 'layer' + String(Math.round(this._id)) + ':T' + String(Math.round(x)) + ',' + String(Math.round(y)) + ',' + String(anchor) + ',';
            return await this._display.upload(destname, this._yapi.imm_str2bin(text));
        }
        return await this.command_flush('T' + String(Math.round(x)) + ',' + String(Math.round(y)) + ',' + String(anchor) + ',' + text + '' + String.fromCharCode(27));
    }

    /**
     * Draws an image previously uploaded to the device filesystem, at the specified position.
     * At present time, GIF images are the only supported image format. If you experience
     * problems using an image file, check the device logs for any error message such as
     * missing image file or bad image file format.
     *
     * @param x : the distance from left of layer to the left of the image, in pixels
     * @param y : the distance from top of layer to the top of the image, in pixels
     * @param imagename : the GIF file name
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async drawImage(x: number, y: number, imagename: string): Promise<number>
    {
        return await this.command_flush('*' + String(Math.round(x)) + ',' + String(Math.round(y)) + ',' + imagename + '' + String.fromCharCode(27));
    }

    /**
     * Draws a GIF image provided as a binary buffer at the specified position.
     * If the image drawing must be included in an animation sequence, save it
     * in the device filesystem first and use drawImage instead.
     *
     * @param x : the distance from left of layer to the left of the image, in pixels
     * @param y : the distance from top of layer to the top of the image, in pixels
     * @param gifimage : a binary object with the content of a GIF file
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async drawGIF(x: number, y: number, gifimage: Uint8Array): Promise<number>
    {
        let destname: string;
        await this._display.flushLayers();
        destname = 'layer' + String(Math.round(this._id)) + ':G,-1@' + String(Math.round(x)) + ',' + String(Math.round(y));
        return await this._display.upload(destname, gifimage);
    }

    /**
     * Draws a bitmap at the specified position. The bitmap is provided as a binary object,
     * where each pixel maps to a bit, from left to right and from top to bottom.
     * The most significant bit of each byte maps to the leftmost pixel, and the least
     * significant bit maps to the rightmost pixel. Bits set to 1 are drawn using the
     * layer selected pen color. Bits set to 0 are drawn using the specified background
     * color, unless NO_INK (-1) is specified, in which case they are not
     * drawn at all (as if transparent).
     *
     * @param x : the distance from left of layer to the left of the bitmap, in pixels
     * @param y : the distance from top of layer to the top of the bitmap, in pixels
     * @param w : the width of the bitmap, in pixels
     * @param bitmap : a binary object
     * @param bgcol : the RGB background color to use for zero bits, as a 24-bit RGB value,
     *         or one of the constants NO_INK, FG_INK or BG_INK
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async drawBitmap(x: number, y: number, w: number, bitmap: Uint8Array, bgcol: number): Promise<number>
    {
        let destname: string;
        let r: number;
        let g: number;
        let b: number;
        let rgbcol: string;
        if ((w < 0) || (w > 512)) {
            this._display._throw(YAPI.INVALID_ARGUMENT, 'bitmap width must be in range 1..512');
            return YAPI.INVALID_ARGUMENT;
        }
        await this._display.flushLayers();
        if (bgcol <= 255) {
            if (bgcol >= -1) {
                // backward-compatible behaviour (gray level)
                rgbcol = String(Math.round(bgcol));
            } else {
                // background color or foreground color
                if (bgcol <= -3) {
                    rgbcol = '#.';
                } else {
                    rgbcol = '#-';
                }
            }
        } else {
            // RGB color
            r = ((bgcol >> 20) & 15);
            g = ((bgcol >> 12) & 15);
            b = ((bgcol >> 4) & 15);
            rgbcol = '#' + (r).toString(16).toLowerCase() + '' + (g).toString(16).toLowerCase() + '' + (b).toString(16).toLowerCase();
        }
        destname = 'layer' + String(Math.round(this._id)) + ':' + String(Math.round(w)) + ',' + rgbcol + '@' + String(Math.round(x)) + ',' + String(Math.round(y));
        return await this._display.upload(destname, bitmap);
    }

    /**
     * Draws a color pixmap at the specified position. The pixmap is provided as a binary
     * object, where each byte maps to one pixel. The 24 bit RGB value corresponding to each
     * byte value is defined in the palette provided as extra argument.
     * The palette maximal size is 8, and it is recommended to use the smallest possible
     * palette size to optimize the size of data to be sent to the display.
     * The height of the pixmap is implicitely given by the pixmap buffer size.
     *
     * @param x : the distance from left of layer to the left of the pixmap, in pixels
     * @param y : the distance from top of layer to the top of the pixmap, in pixels
     * @param w : the width of the pixmap, in pixels
     * @param pixmap : a binary buffer where each byte maps to one pixel
     * @param palette : an array of 24-bit RGB values, defining the color for each byte value in pixmap
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async drawPixmap(x: number, y: number, w: number, pixmap: Uint8Array, palette: number[]): Promise<number>
    {
        let gifimage: Uint8Array;
        gifimage = await this._display.gifEncode(pixmap, palette, w, false);
        return await this.drawGIF(x, y, gifimage);
    }

    /**
     * Moves the drawing pointer of this layer to the specified position.
     *
     * @param x : the distance from left of layer, in pixels
     * @param y : the distance from top of layer, in pixels
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async moveTo(x: number, y: number): Promise<number>
    {
        return await this.command_push('@' + String(Math.round(x)) + ',' + String(Math.round(y)));
    }

    /**
     * Draws a line from current drawing pointer position to the specified position.
     * The specified destination pixel is included in the line. The pointer position
     * is then moved to the end point of the line.
     *
     * @param x : the distance from left of layer to the end point of the line, in pixels
     * @param y : the distance from top of layer to the end point of the line, in pixels
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async lineTo(x: number, y: number): Promise<number>
    {
        return await this.command_flush('-' + String(Math.round(x)) + ',' + String(Math.round(y)));
    }

    /**
     * Starts drawing a polygon with the first corner at the specified position.
     *
     * @param x : the distance from left of layer, in pixels
     * @param y : the distance from top of layer, in pixels
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async polygonStart(x: number, y: number): Promise<number>
    {
        this._polyPrevX = x;
        this._polyPrevY = y;
        return await this.command_push('[' + String(Math.round(x)) + ',' + String(Math.round(y)));
    }

    /**
     * Adds a point to the currently open polygon, previously opened using
     * polygonStart.
     *
     * @param x : the distance from left of layer to the new point, in pixels
     * @param y : the distance from top of layer to the new point, in pixels
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async polygonAdd(x: number, y: number): Promise<number>
    {
        let dx: number;
        let dy: number;
        dx = x - this._polyPrevX;
        dy = y - this._polyPrevY;
        this._polyPrevX = x;
        this._polyPrevY = y;
        return await this.command_flush(';' + String(Math.round(dx)) + ',' + String(Math.round(dy)));
    }

    /**
     * Closes the currently open polygon, fill its content the fill color currently
     * selected for the layer, and draw its outline using the selected line color.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async polygonEnd(): Promise<number>
    {
        return await this.command_flush(']');
    }

    /**
     * Outputs a message in the console area, and advances the console pointer accordingly.
     * The console pointer position is automatically moved to the beginning
     * of the next line when a newline character is met, or when the right margin
     * is hit. When the new text to display extends below the lower margin, the
     * console area is automatically scrolled up.
     *
     * @param text : the message to display
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async consoleOut(text: string): Promise<number>
    {
        let textlen: number;
        let destname: string;
        textlen = (text).length;
        if (textlen > 60) {
            if (textlen > 1000) {
                this._display._throw(YAPI.INVALID_ARGUMENT, 'text too large (max 1000 characters)');
                return YAPI.INVALID_ARGUMENT;
            }
            await this._display.flushLayers();
            destname = 'layer' + String(Math.round(this._id)) + ':!';
            return await this._display.upload(destname, this._yapi.imm_str2bin(text));
        }
        return await this.command_flush('!' + text + '' + String.fromCharCode(27));
    }

    /**
     * Sets up display margins for the consoleOut function.
     *
     * @param x1 : the distance from left of layer to the left margin, in pixels
     * @param y1 : the distance from top of layer to the top margin, in pixels
     * @param x2 : the distance from left of layer to the right margin, in pixels
     * @param y2 : the distance from top of layer to the bottom margin, in pixels
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async setConsoleMargins(x1: number, y1: number, x2: number, y2: number): Promise<number>
    {
        return await this.command_push('m' + String(Math.round(x1)) + ',' + String(Math.round(y1)) + ',' + String(Math.round(x2)) + ',' + String(Math.round(y2)));
    }

    /**
     * Sets up the background color used by the clearConsole function and by
     * the console scrolling feature.
     *
     * @param bgcol : the background gray level to use when scrolling (0 = black,
     *         255 = white), or -1 for transparent
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async setConsoleBackground(bgcol: number): Promise<number>
    {
        return await this.command_push('b' + String(Math.round(bgcol)));
    }

    /**
     * Sets up the wrapping behavior used by the consoleOut function.
     *
     * @param wordwrap : true to wrap only between words,
     *         false to wrap on the last column anyway.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async setConsoleWordWrap(wordwrap: boolean): Promise<number>
    {
        return await this.command_push('w' + (wordwrap?"1":"0"));
    }

    /**
     * Blanks the console area within console margins, and resets the console pointer
     * to the upper left corner of the console.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async clearConsole(): Promise<number>
    {
        return await this.command_flush('^');
    }

    /**
     * Sets the position of the layer relative to the display upper left corner.
     * When smooth scrolling is used, the display offset of the layer is
     * automatically updated during the next milliseconds to animate the move of the layer.
     *
     * @param x : the distance from left of display to the upper left corner of the layer
     * @param y : the distance from top of display to the upper left corner of the layer
     * @param scrollTime : number of milliseconds to use for smooth scrolling, or
     *         0 if the scrolling should be immediate.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async setLayerPosition(x: number, y: number, scrollTime: number): Promise<number>
    {
        return await this.command_flush('#' + String(Math.round(x)) + ',' + String(Math.round(y)) + ',' + String(Math.round(scrollTime)));
    }

    /**
     * Hides the layer. The state of the layer is preserved but the layer is not displayed
     * on the screen until the next call to unhide(). Hiding the layer can positively
     * affect the drawing speed, since it postpones the rendering until all operations are
     * completed (double-buffering).
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async hide(): Promise<number>
    {
        await this.command_push('h');
        this._hidden = true;
        return await this.flush_now();
    }

    /**
     * Shows the layer. Shows the layer again after a hide command.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async unhide(): Promise<number>
    {
        this._hidden = false;
        return await this.command_flush('s');
    }

    /**
     * Gets parent YDisplay. Returns the parent YDisplay object of the current YDisplayLayer.
     *
     * @return an YDisplay object
     */
    async get_display(): Promise<YDisplay>
    {
        return this._display;
    }

    /**
     * Returns the display width, in pixels.
     *
     * @return an integer corresponding to the display width, in pixels
     *
     * On failure, throws an exception or returns YDisplayLayer.DISPLAYWIDTH_INVALID.
     */
    async get_displayWidth(): Promise<number>
    {
        return await this._display.get_displayWidth();
    }

    /**
     * Returns the display height, in pixels.
     *
     * @return an integer corresponding to the display height, in pixels
     *
     * On failure, throws an exception or returns YDisplayLayer.DISPLAYHEIGHT_INVALID.
     */
    async get_displayHeight(): Promise<number>
    {
        return await this._display.get_displayHeight();
    }

    /**
     * Returns the width of the layers to draw on, in pixels.
     *
     * @return an integer corresponding to the width of the layers to draw on, in pixels
     *
     * On failure, throws an exception or returns YDisplayLayer.LAYERWIDTH_INVALID.
     */
    async get_layerWidth(): Promise<number>
    {
        return await this._display.get_layerWidth();
    }

    /**
     * Returns the height of the layers to draw on, in pixels.
     *
     * @return an integer corresponding to the height of the layers to draw on, in pixels
     *
     * On failure, throws an exception or returns YDisplayLayer.LAYERHEIGHT_INVALID.
     */
    async get_layerHeight(): Promise<number>
    {
        return await this._display.get_layerHeight();
    }

    //--- (end of generated code: YDisplayLayer implementation)
}

export namespace YDisplayLayer
{
    //--- (generated code: YDisplayLayer definitions)
    export const enum ALIGN
    {
        TOP_LEFT = 0,
        CENTER_LEFT = 1,
        BASELINE_LEFT = 2,
        BOTTOM_LEFT = 3,
        TOP_CENTER = 4,
        CENTER = 5,
        BASELINE_CENTER = 6,
        BOTTOM_CENTER = 7,
        TOP_DECIMAL = 8,
        CENTER_DECIMAL = 9,
        BASELINE_DECIMAL = 10,
        BOTTOM_DECIMAL = 11,
        TOP_RIGHT = 12,
        CENTER_RIGHT = 13,
        BASELINE_RIGHT = 14,
        BOTTOM_RIGHT = 15
    }

    //--- (end of generated code: YDisplayLayer definitions)
}

//--- (generated code: YDisplay class start)
/**
 * YDisplay Class: display control interface, available for instance in the Yocto-Display, the
 * Yocto-MaxiDisplay, the Yocto-MaxiDisplay-G or the Yocto-MiniDisplay
 *
 * The YDisplay class allows to drive Yoctopuce displays.
 * Yoctopuce display interface has been designed to easily
 * show information and images. The device provides built-in
 * multi-layer rendering. Layers can be drawn offline, individually,
 * and freely moved on the display. It can also replay recorded
 * sequences (animations).
 *
 * In order to draw on the screen, you should use the
 * display.get_displayLayer method to retrieve the layer(s) on
 * which you want to draw, and then use methods defined in
 * YDisplayLayer to draw on the layers.
 */
//--- (end of generated code: YDisplay class start)
/** @extends {YFunction} **/
export class YDisplay extends YFunction
{
    //--- (generated code: YDisplay attributes declaration)
    _className: string;
    _enabled: YDisplay.ENABLED = YDisplay.ENABLED_INVALID;
    _startupSeq: string = YDisplay.STARTUPSEQ_INVALID;
    _brightness: number = YDisplay.BRIGHTNESS_INVALID;
    _autoInvertDelay: number = YDisplay.AUTOINVERTDELAY_INVALID;
    _orientation: YDisplay.ORIENTATION = YDisplay.ORIENTATION_INVALID;
    _displayPanel: string = YDisplay.DISPLAYPANEL_INVALID;
    _displayWidth: number = YDisplay.DISPLAYWIDTH_INVALID;
    _displayHeight: number = YDisplay.DISPLAYHEIGHT_INVALID;
    _displayType: YDisplay.DISPLAYTYPE = YDisplay.DISPLAYTYPE_INVALID;
    _layerWidth: number = YDisplay.LAYERWIDTH_INVALID;
    _layerHeight: number = YDisplay.LAYERHEIGHT_INVALID;
    _layerCount: number = YDisplay.LAYERCOUNT_INVALID;
    _command: string = YDisplay.COMMAND_INVALID;
    _valueCallbackDisplay: YDisplay.ValueCallback | null = null;
    _allDisplayLayers: YDisplayLayer[] = [];
    _frozenUntil: number = 0;
    _recording: boolean = false;
    _sequence: string = '';

    // API symbols as object properties
    public readonly ENABLED_FALSE: YDisplay.ENABLED = 0;
    public readonly ENABLED_TRUE: YDisplay.ENABLED = 1;
    public readonly ENABLED_INVALID: YDisplay.ENABLED = -1;
    public readonly STARTUPSEQ_INVALID: string = YAPI.INVALID_STRING;
    public readonly BRIGHTNESS_INVALID: number = YAPI.INVALID_UINT;
    public readonly AUTOINVERTDELAY_INVALID: number = YAPI.INVALID_UINT;
    public readonly ORIENTATION_LEFT: YDisplay.ORIENTATION = 0;
    public readonly ORIENTATION_UP: YDisplay.ORIENTATION = 1;
    public readonly ORIENTATION_RIGHT: YDisplay.ORIENTATION = 2;
    public readonly ORIENTATION_DOWN: YDisplay.ORIENTATION = 3;
    public readonly ORIENTATION_INVALID: YDisplay.ORIENTATION = -1;
    public readonly DISPLAYPANEL_INVALID: string = YAPI.INVALID_STRING;
    public readonly DISPLAYWIDTH_INVALID: number = YAPI.INVALID_UINT;
    public readonly DISPLAYHEIGHT_INVALID: number = YAPI.INVALID_UINT;
    public readonly DISPLAYTYPE_MONO: YDisplay.DISPLAYTYPE = 0;
    public readonly DISPLAYTYPE_EPAPER_BW: YDisplay.DISPLAYTYPE = 1;
    public readonly DISPLAYTYPE_EPAPER_BWR: YDisplay.DISPLAYTYPE = 2;
    public readonly DISPLAYTYPE_EPAPER_BWRY: YDisplay.DISPLAYTYPE = 3;
    public readonly DISPLAYTYPE_INVALID: YDisplay.DISPLAYTYPE = -1;
    public readonly LAYERWIDTH_INVALID: number = YAPI.INVALID_UINT;
    public readonly LAYERHEIGHT_INVALID: number = YAPI.INVALID_UINT;
    public readonly LAYERCOUNT_INVALID: number = YAPI.INVALID_UINT;
    public readonly COMMAND_INVALID: string = YAPI.INVALID_STRING;
    public readonly FASTREFRESH_WHENEVER_POSSIBLE: YDisplay.FASTREFRESH = 0;
    public readonly FASTREFRESH_WHENEVER_SUPPORTED: YDisplay.FASTREFRESH = 1;
    public readonly FASTREFRESH_NEVER: YDisplay.FASTREFRESH = 2;
    public readonly FASTREFRESH_INVALID: YDisplay.FASTREFRESH = 3;
    public readonly REGENERATE_ON_REQUEST_ONLY: YDisplay.REGENERATE = 0;
    public readonly REGENERATE_EVERY_DAY: YDisplay.REGENERATE = 1;
    public readonly REGENERATE_EVERY_12H: YDisplay.REGENERATE = 2;
    public readonly REGENERATE_EVERY_6H: YDisplay.REGENERATE = 3;
    public readonly REGENERATE_EVERY_3H: YDisplay.REGENERATE = 4;
    public readonly REGENERATE_EVERY_2H: YDisplay.REGENERATE = 5;
    public readonly REGENERATE_EVERY_HOUR: YDisplay.REGENERATE = 6;
    public readonly REGENERATE_EVERY_30MIN: YDisplay.REGENERATE = 7;
    public readonly REGENERATE_EVERY_15MIN: YDisplay.REGENERATE = 8;
    public readonly REGENERATE_EVERY_480: YDisplay.REGENERATE = 9;
    public readonly REGENERATE_EVERY_432: YDisplay.REGENERATE = 10;
    public readonly REGENERATE_EVERY_360: YDisplay.REGENERATE = 11;
    public readonly REGENERATE_EVERY_288: YDisplay.REGENERATE = 12;
    public readonly REGENERATE_EVERY_240: YDisplay.REGENERATE = 13;
    public readonly REGENERATE_EVERY_192: YDisplay.REGENERATE = 14;
    public readonly REGENERATE_EVERY_144: YDisplay.REGENERATE = 15;
    public readonly REGENERATE_EVERY_96: YDisplay.REGENERATE = 16;
    public readonly REGENERATE_EVERY_48: YDisplay.REGENERATE = 17;
    public readonly REGENERATE_EVERY_36: YDisplay.REGENERATE = 18;
    public readonly REGENERATE_EVERY_24: YDisplay.REGENERATE = 19;
    public readonly REGENERATE_EVERY_12: YDisplay.REGENERATE = 20;
    public readonly REGENERATE_EVERY_10: YDisplay.REGENERATE = 21;
    public readonly REGENERATE_EVERY_8: YDisplay.REGENERATE = 22;
    public readonly REGENERATE_EVERY_6: YDisplay.REGENERATE = 23;
    public readonly REGENERATE_EVERY_4: YDisplay.REGENERATE = 24;
    public readonly REGENERATE_ALWAYS: YDisplay.REGENERATE = 25;
    public readonly REGENERATE_INVALID: YDisplay.REGENERATE = 26;
    public readonly DISPLAYSTATE_FAILURE: YDisplay.DISPLAYSTATE = 0;
    public readonly DISPLAYSTATE_OFF: YDisplay.DISPLAYSTATE = 1;
    public readonly DISPLAYSTATE_POWERING: YDisplay.DISPLAYSTATE = 2;
    public readonly DISPLAYSTATE_IDLE: YDisplay.DISPLAYSTATE = 3;
    public readonly DISPLAYSTATE_REFRESHING: YDisplay.DISPLAYSTATE = 4;
    public readonly DISPLAYSTATE_INVALID: YDisplay.DISPLAYSTATE = 5;

    // API symbols as static members
    public static readonly ENABLED_FALSE: YDisplay.ENABLED = 0;
    public static readonly ENABLED_TRUE: YDisplay.ENABLED = 1;
    public static readonly ENABLED_INVALID: YDisplay.ENABLED = -1;
    public static readonly STARTUPSEQ_INVALID: string = YAPI.INVALID_STRING;
    public static readonly BRIGHTNESS_INVALID: number = YAPI.INVALID_UINT;
    public static readonly AUTOINVERTDELAY_INVALID: number = YAPI.INVALID_UINT;
    public static readonly ORIENTATION_LEFT: YDisplay.ORIENTATION = 0;
    public static readonly ORIENTATION_UP: YDisplay.ORIENTATION = 1;
    public static readonly ORIENTATION_RIGHT: YDisplay.ORIENTATION = 2;
    public static readonly ORIENTATION_DOWN: YDisplay.ORIENTATION = 3;
    public static readonly ORIENTATION_INVALID: YDisplay.ORIENTATION = -1;
    public static readonly DISPLAYPANEL_INVALID: string = YAPI.INVALID_STRING;
    public static readonly DISPLAYWIDTH_INVALID: number = YAPI.INVALID_UINT;
    public static readonly DISPLAYHEIGHT_INVALID: number = YAPI.INVALID_UINT;
    public static readonly DISPLAYTYPE_MONO: YDisplay.DISPLAYTYPE = 0;
    public static readonly DISPLAYTYPE_EPAPER_BW: YDisplay.DISPLAYTYPE = 1;
    public static readonly DISPLAYTYPE_EPAPER_BWR: YDisplay.DISPLAYTYPE = 2;
    public static readonly DISPLAYTYPE_EPAPER_BWRY: YDisplay.DISPLAYTYPE = 3;
    public static readonly DISPLAYTYPE_INVALID: YDisplay.DISPLAYTYPE = -1;
    public static readonly LAYERWIDTH_INVALID: number = YAPI.INVALID_UINT;
    public static readonly LAYERHEIGHT_INVALID: number = YAPI.INVALID_UINT;
    public static readonly LAYERCOUNT_INVALID: number = YAPI.INVALID_UINT;
    public static readonly COMMAND_INVALID: string = YAPI.INVALID_STRING;
    public static readonly FASTREFRESH_WHENEVER_POSSIBLE: YDisplay.FASTREFRESH = 0;
    public static readonly FASTREFRESH_WHENEVER_SUPPORTED: YDisplay.FASTREFRESH = 1;
    public static readonly FASTREFRESH_NEVER: YDisplay.FASTREFRESH = 2;
    public static readonly FASTREFRESH_INVALID: YDisplay.FASTREFRESH = 3;
    public static readonly REGENERATE_ON_REQUEST_ONLY: YDisplay.REGENERATE = 0;
    public static readonly REGENERATE_EVERY_DAY: YDisplay.REGENERATE = 1;
    public static readonly REGENERATE_EVERY_12H: YDisplay.REGENERATE = 2;
    public static readonly REGENERATE_EVERY_6H: YDisplay.REGENERATE = 3;
    public static readonly REGENERATE_EVERY_3H: YDisplay.REGENERATE = 4;
    public static readonly REGENERATE_EVERY_2H: YDisplay.REGENERATE = 5;
    public static readonly REGENERATE_EVERY_HOUR: YDisplay.REGENERATE = 6;
    public static readonly REGENERATE_EVERY_30MIN: YDisplay.REGENERATE = 7;
    public static readonly REGENERATE_EVERY_15MIN: YDisplay.REGENERATE = 8;
    public static readonly REGENERATE_EVERY_480: YDisplay.REGENERATE = 9;
    public static readonly REGENERATE_EVERY_432: YDisplay.REGENERATE = 10;
    public static readonly REGENERATE_EVERY_360: YDisplay.REGENERATE = 11;
    public static readonly REGENERATE_EVERY_288: YDisplay.REGENERATE = 12;
    public static readonly REGENERATE_EVERY_240: YDisplay.REGENERATE = 13;
    public static readonly REGENERATE_EVERY_192: YDisplay.REGENERATE = 14;
    public static readonly REGENERATE_EVERY_144: YDisplay.REGENERATE = 15;
    public static readonly REGENERATE_EVERY_96: YDisplay.REGENERATE = 16;
    public static readonly REGENERATE_EVERY_48: YDisplay.REGENERATE = 17;
    public static readonly REGENERATE_EVERY_36: YDisplay.REGENERATE = 18;
    public static readonly REGENERATE_EVERY_24: YDisplay.REGENERATE = 19;
    public static readonly REGENERATE_EVERY_12: YDisplay.REGENERATE = 20;
    public static readonly REGENERATE_EVERY_10: YDisplay.REGENERATE = 21;
    public static readonly REGENERATE_EVERY_8: YDisplay.REGENERATE = 22;
    public static readonly REGENERATE_EVERY_6: YDisplay.REGENERATE = 23;
    public static readonly REGENERATE_EVERY_4: YDisplay.REGENERATE = 24;
    public static readonly REGENERATE_ALWAYS: YDisplay.REGENERATE = 25;
    public static readonly REGENERATE_INVALID: YDisplay.REGENERATE = 26;
    public static readonly DISPLAYSTATE_FAILURE: YDisplay.DISPLAYSTATE = 0;
    public static readonly DISPLAYSTATE_OFF: YDisplay.DISPLAYSTATE = 1;
    public static readonly DISPLAYSTATE_POWERING: YDisplay.DISPLAYSTATE = 2;
    public static readonly DISPLAYSTATE_IDLE: YDisplay.DISPLAYSTATE = 3;
    public static readonly DISPLAYSTATE_REFRESHING: YDisplay.DISPLAYSTATE = 4;
    public static readonly DISPLAYSTATE_INVALID: YDisplay.DISPLAYSTATE = 5;
    //--- (end of generated code: YDisplay attributes declaration)

    constructor(yapi: YAPIContext, func: string)
    {
        //--- (generated code: YDisplay constructor)
        super(yapi, func);
        this._className                  = 'Display';
        //--- (end of generated code: YDisplay constructor)
    }

    //--- (generated code: YDisplay implementation)

    imm_parseAttr(name: string, val: any): number
    {
        switch (name) {
        case 'enabled':
            this._enabled = <YDisplay.ENABLED> <number> val;
            return 1;
        case 'startupSeq':
            this._startupSeq = <string> <string> val;
            return 1;
        case 'brightness':
            this._brightness = <number> <number> val;
            return 1;
        case 'autoInvertDelay':
            this._autoInvertDelay = <number> <number> val;
            return 1;
        case 'orientation':
            this._orientation = <YDisplay.ORIENTATION> <number> val;
            return 1;
        case 'displayPanel':
            this._displayPanel = <string> <string> val;
            return 1;
        case 'displayWidth':
            this._displayWidth = <number> <number> val;
            return 1;
        case 'displayHeight':
            this._displayHeight = <number> <number> val;
            return 1;
        case 'displayType':
            this._displayType = <YDisplay.DISPLAYTYPE> <number> val;
            return 1;
        case 'layerWidth':
            this._layerWidth = <number> <number> val;
            return 1;
        case 'layerHeight':
            this._layerHeight = <number> <number> val;
            return 1;
        case 'layerCount':
            this._layerCount = <number> <number> val;
            return 1;
        case 'command':
            this._command = <string> <string> val;
            return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Returns true if the screen is powered, false otherwise.
     *
     * @return either YDisplay.ENABLED_FALSE or YDisplay.ENABLED_TRUE, according to true if the screen is
     * powered, false otherwise
     *
     * On failure, throws an exception or returns YDisplay.ENABLED_INVALID.
     */
    async get_enabled(): Promise<YDisplay.ENABLED>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YDisplay.ENABLED_INVALID;
            }
        }
        res = this._enabled;
        return res;
    }

    /**
     * Changes the power state of the display.
     *
     * @param newval : either YDisplay.ENABLED_FALSE or YDisplay.ENABLED_TRUE, according to the power
     * state of the display
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_enabled(newval: YDisplay.ENABLED): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('enabled', rest_val);
    }

    /**
     * Returns the name of the sequence to play when the displayed is powered on.
     *
     * @return a string corresponding to the name of the sequence to play when the displayed is powered on
     *
     * On failure, throws an exception or returns YDisplay.STARTUPSEQ_INVALID.
     */
    async get_startupSeq(): Promise<string>
    {
        let res: string;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YDisplay.STARTUPSEQ_INVALID;
            }
        }
        res = this._startupSeq;
        return res;
    }

    /**
     * Changes the name of the sequence to play when the display is powered on.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : a string corresponding to the name of the sequence to play when the display is powered on
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_startupSeq(newval: string): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('startupSeq', rest_val);
    }

    /**
     * Returns the luminosity of the  module informative LEDs (from 0 to 100).
     *
     * @return an integer corresponding to the luminosity of the  module informative LEDs (from 0 to 100)
     *
     * On failure, throws an exception or returns YDisplay.BRIGHTNESS_INVALID.
     */
    async get_brightness(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YDisplay.BRIGHTNESS_INVALID;
            }
        }
        res = this._brightness;
        return res;
    }

    /**
     * Changes the brightness of the display. The parameter is a value between 0 and
     * 100. Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : an integer corresponding to the brightness of the display
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_brightness(newval: number): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('brightness', rest_val);
    }

    /**
     * Returns the interval between automatic display inversions, or 0 if automatic
     * inversion is disabled. Using the automatic inversion mechanism reduces the
     * burn-in that occurs on OLED screens over long periods when the same content
     * remains displayed on the screen.
     *
     * @return an integer corresponding to the interval between automatic display inversions, or 0 if automatic
     *         inversion is disabled
     *
     * On failure, throws an exception or returns YDisplay.AUTOINVERTDELAY_INVALID.
     */
    async get_autoInvertDelay(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YDisplay.AUTOINVERTDELAY_INVALID;
            }
        }
        res = this._autoInvertDelay;
        return res;
    }

    /**
     * Changes the interval between automatic display inversions.
     * The parameter is the number of seconds, or 0 to disable automatic inversion.
     * Using the automatic inversion mechanism reduces the burn-in that occurs on OLED
     * screens over long periods when the same content remains displayed on the screen.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : an integer corresponding to the interval between automatic display inversions
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_autoInvertDelay(newval: number): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('autoInvertDelay', rest_val);
    }

    /**
     * Returns the currently selected display orientation. The orientation is defined as the side of the
     * screen where the
     * USB connector (for OLED displays) or the ribbon cable (for ePaper panels) is located when the
     * display is up straight.
     *
     * @return a value among YDisplay.ORIENTATION_LEFT, YDisplay.ORIENTATION_UP,
     * YDisplay.ORIENTATION_RIGHT and YDisplay.ORIENTATION_DOWN corresponding to the currently selected
     * display orientation
     *
     * On failure, throws an exception or returns YDisplay.ORIENTATION_INVALID.
     */
    async get_orientation(): Promise<YDisplay.ORIENTATION>
    {
        let res: number;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YDisplay.ORIENTATION_INVALID;
            }
        }
        res = this._orientation;
        return res;
    }

    /**
     * Changes the display orientation. he orientation is defined as the side of the screen where the
     * USB connector (for OLED displays) or the ribbon cable (for ePaper panels) is located when the
     * display is up straight. Remember to call the saveToFlash()
     * method of the module if the modification must be kept.
     *
     * @param newval : a value among YDisplay.ORIENTATION_LEFT, YDisplay.ORIENTATION_UP,
     * YDisplay.ORIENTATION_RIGHT and YDisplay.ORIENTATION_DOWN corresponding to the display orientation
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_orientation(newval: YDisplay.ORIENTATION): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        let res = await this._setAttr('orientation', rest_val);
        await this._clearLazyCache();
        return res;
    }

    /**
     * Returns the exact model of the display panel.
     *
     * @return a string corresponding to the exact model of the display panel
     *
     * On failure, throws an exception or returns YDisplay.DISPLAYPANEL_INVALID.
     */
    async get_displayPanel(): Promise<string>
    {
        let res: string;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YDisplay.DISPLAYPANEL_INVALID;
            }
        }
        res = this._displayPanel;
        return res;
    }

    /**
     * Changes the model of display to match the connected display panel.
     * This function has no effect if the module does not support the selected
     * display panel. Remember to call the saveToFlash()
     * method of the module if the modification must be kept.
     *
     * @param newval : a string corresponding to the model of display to match the connected display panel
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_displayPanel(newval: string): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        let res = await this._setAttr('displayPanel', rest_val);
        await this._clearLazyCache();
        return res;
    }

    /**
     * Returns the display width, in pixels.
     *
     * @return an integer corresponding to the display width, in pixels
     *
     * On failure, throws an exception or returns YDisplay.DISPLAYWIDTH_INVALID.
     */
    async get_displayWidth(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration == 0) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YDisplay.DISPLAYWIDTH_INVALID;
            }
        }
        res = this._displayWidth;
        return res;
    }

    /**
     * Returns the display height, in pixels.
     *
     * @return an integer corresponding to the display height, in pixels
     *
     * On failure, throws an exception or returns YDisplay.DISPLAYHEIGHT_INVALID.
     */
    async get_displayHeight(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration == 0) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YDisplay.DISPLAYHEIGHT_INVALID;
            }
        }
        res = this._displayHeight;
        return res;
    }

    /**
     * Returns the display type: monochrome OLED, black and white ePaper, color ePaper, and so on.
     *
     * @return a value among YDisplay.DISPLAYTYPE_MONO, YDisplay.DISPLAYTYPE_EPAPER_BW,
     * YDisplay.DISPLAYTYPE_EPAPER_BWR and YDisplay.DISPLAYTYPE_EPAPER_BWRY corresponding to the display
     * type: monochrome OLED, black and white ePaper, color ePaper, and so on
     *
     * On failure, throws an exception or returns YDisplay.DISPLAYTYPE_INVALID.
     */
    async get_displayType(): Promise<YDisplay.DISPLAYTYPE>
    {
        let res: number;
        if (this._cacheExpiration == 0) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YDisplay.DISPLAYTYPE_INVALID;
            }
        }
        res = this._displayType;
        return res;
    }

    /**
     * Returns the width of the layers to draw on, in pixels.
     *
     * @return an integer corresponding to the width of the layers to draw on, in pixels
     *
     * On failure, throws an exception or returns YDisplay.LAYERWIDTH_INVALID.
     */
    async get_layerWidth(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration == 0) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YDisplay.LAYERWIDTH_INVALID;
            }
        }
        res = this._layerWidth;
        return res;
    }

    /**
     * Returns the height of the layers to draw on, in pixels.
     *
     * @return an integer corresponding to the height of the layers to draw on, in pixels
     *
     * On failure, throws an exception or returns YDisplay.LAYERHEIGHT_INVALID.
     */
    async get_layerHeight(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration == 0) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YDisplay.LAYERHEIGHT_INVALID;
            }
        }
        res = this._layerHeight;
        return res;
    }

    /**
     * Returns the number of available layers to draw on.
     *
     * @return an integer corresponding to the number of available layers to draw on
     *
     * On failure, throws an exception or returns YDisplay.LAYERCOUNT_INVALID.
     */
    async get_layerCount(): Promise<number>
    {
        let res: number;
        if (this._cacheExpiration == 0) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YDisplay.LAYERCOUNT_INVALID;
            }
        }
        res = this._layerCount;
        return res;
    }

    async get_command(): Promise<string>
    {
        let res: string;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YDisplay.COMMAND_INVALID;
            }
        }
        res = this._command;
        return res;
    }

    async set_command(newval: string): Promise<number>
    {
        let rest_val: string;
        rest_val = String(newval);
        return await this._setAttr('command', rest_val);
    }

    /**
     * Retrieves a display for a given identifier.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the display is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YDisplay.isOnline() to test if the display is
     * indeed online at a given time. In case of ambiguity when looking for
     * a display by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the display, for instance
     *         YD128X32.display.
     *
     * @return a YDisplay object allowing you to drive the display.
     */
    static FindDisplay(func: string): YDisplay
    {
        let obj: YDisplay | null;
        obj = <YDisplay> YFunction._FindFromCache('Display', func);
        if (obj == null) {
            obj = new YDisplay(YAPI, func);
            YFunction._AddToCache('Display', func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a display for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the display is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YDisplay.isOnline() to test if the display is
     * indeed online at a given time. In case of ambiguity when looking for
     * a display by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx : a YAPI context
     * @param func : a string that uniquely characterizes the display, for instance
     *         YD128X32.display.
     *
     * @return a YDisplay object allowing you to drive the display.
     */
    static FindDisplayInContext(yctx: YAPIContext, func: string): YDisplay
    {
        let obj: YDisplay | null;
        obj = <YDisplay> YFunction._FindFromCacheInContext(yctx, 'Display', func);
        if (obj == null) {
            obj = new YDisplay(yctx, func);
            YFunction._AddToCache('Display', func, obj);
        }
        return obj;
    }

    /**
     * Registers the callback function that is invoked on every change of advertised value.
     * The callback is then invoked only during the execution of ySleep or yHandleEvents.
     * This provides control over the time when the callback is triggered. For good responsiveness,
     * remember to call one of these two functions periodically. The callback is called once juste after beeing
     * registered, passing the current advertised value  of the function, provided that it is not an empty string.
     * To unregister a callback, pass a null pointer as argument.
     *
     * @param callback : the callback function to call, or a null pointer. The callback function should take two
     *         arguments: the function object of which the value has changed, and the character string describing
     *         the new advertised value.
     * @noreturn
     */
    async registerValueCallback(callback: YDisplay.ValueCallback | null): Promise<number>
    {
        let val: string;
        if (callback != null) {
            await YFunction._UpdateValueCallbackList(this, true);
        } else {
            await YFunction._UpdateValueCallbackList(this, false);
        }
        this._valueCallbackDisplay = callback;
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
        if (this._valueCallbackDisplay != null) {
            try {
                await this._valueCallbackDisplay(this, value);
            } catch (e) {
                this._yapi.imm_log('Exception in valueCallback:', e);
            }
        } else {
            await super._invokeValueCallback(value);
        }
        return 0;
    }

    async sendCommand(cmd: string): Promise<number>
    {
        if (!(this._recording)) {
            return await this.set_command(cmd);
        }
        this._sequence = this._sequence + '' + cmd + '\n';
        return this._yapi.SUCCESS;
    }

    async flushLayers(): Promise<number>
    {
        for (let ii_0 of this._allDisplayLayers) {
            if (ii_0.must_be_flushed()) {
                await ii_0.flush_now();
            }
        }
        return this._yapi.SUCCESS;
    }

    resetHiddenLayerFlags(): number
    {
        for (let ii_0 of this._allDisplayLayers) {
            ii_0.resetHiddenFlag();
        }
        return this._yapi.SUCCESS;
    }

    isFrozen(): boolean
    {
        if (this._frozenUntil == 0) {
            return false;
        }
        if (this._frozenUntil <= this._yapi.GetTickCount()) {
            this._frozenUntil = 0;
            return false;
        }
        return true;
    }

    /**
     * Returns the fast refresh usage policy in use (ePaper displays only).
     * This setting is combined with the regenerate policy to determine when the screen
     * should be updated using a fast update versus or regenerated using a slower,
     * flickering full refresh.
     *
     * @return a value among the YDisplay.FASTREFRESH enumeration
     *         (YDisplay.FASTREFRESH_WHENEVER_POSSIBLE,
     *         YDisplay.FASTREFRESH_WHENEVER_SUPPORTED,
     *         YDisplay.FASTREFRESH_NEVER).
     *
     * On failure, throws an exception or returns YDisplay.FASTREFRESH_INVALID.
     */
    async get_fastRefreshPolicy(): Promise<YDisplay.FASTREFRESH>
    {
        let combined: number;
        let fmod: number;
        combined = await this.get_brightness();
        if (combined < 0) {
            return YDisplay.FASTREFRESH_INVALID;
        }
        fmod = ((combined / 25) >> 0);
        if (fmod >= 2) {
            fmod = fmod - 2;
        }
        return <YDisplay.FASTREFRESH> fmod;
    }

    /**
     * Returns the display regeneration minimal frequency (ePaper displays only).
     * This setting is combined with the fast refresh usage policy to determine
     * when the screen should be updated using a fast update versus or regenerated
     * using a slower, flickering full refresh. To change the display regeneration minimal
     * frequency, use methode set_fastRefreshPolicy().
     *
     * @return a value among the YDisplay.REGENERATE enumeration
     *         (YDisplay.REGENERATE_ON_REQUEST_ONLY,
     *         YDisplay.REGENERATE_EVERY_DAY, YDisplay.REGENERATE_EVERY_12H,
     *         YDisplay.REGENERATE_EVERY_6H, YDisplay.REGENERATE_EVERY_3H,
     *         YDisplay.REGENERATE_EVERY_2H, YDisplay.REGENERATE_EVERY_HOUR,
     *         YDisplay.REGENERATE_EVERY_30MIN, YDisplay.REGENERATE_EVERY_15MIN,
     *         YDisplay.REGENERATE_EVERY_480, YDisplay.REGENERATE_EVERY_432,
     *         YDisplay.REGENERATE_EVERY_360, YDisplay.REGENERATE_EVERY_288,
     *         YDisplay.REGENERATE_EVERY_240, YDisplay.REGENERATE_EVERY_192,
     *         YDisplay.REGENERATE_EVERY_144, YDisplay.REGENERATE_EVERY_96,
     *         YDisplay.REGENERATE_EVERY_48, YDisplay.REGENERATE_EVERY_36,
     *         YDisplay.REGENERATE_EVERY_24, YDisplay.REGENERATE_EVERY_12,
     *         YDisplay.REGENERATE_EVERY_10, YDisplay.REGENERATE_EVERY_8,
     *         YDisplay.REGENERATE_EVERY_6, YDisplay.REGENERATE_EVERY_4,
     *         YDisplay.REGENERATE_ALWAYS).
     *
     * On failure, throws an exception or returns YDisplay.REGENERATE_INVALID.
     */
    async get_regeneratePolicy(): Promise<YDisplay.REGENERATE>
    {
        let combined: number;
        let fval: number;
        combined= await this.get_brightness();
        if (combined < 0) {
            return YDisplay.REGENERATE_INVALID;
        }
        if (combined >= 100) {
            fval = 25;
        } else {
            fval = (combined % 25);
        }
        return <YDisplay.REGENERATE> fval;
    }

    /**
     * Changes the fast refresh usage policy and display regeneration minimal frequency
     * (ePaper displays only). These settings jointly determine when the screen should be
     * updated using a fast update versus or regenerated using a slower, flickering full
     * refresh.
     *
     * @param fastRefresh : a value among the YDisplay.FASTREFRESH enumeration
     *         (YDisplay.FASTREFRESH_WHENEVER_POSSIBLE,
     *         YDisplay.FASTREFRESH_WHENEVER_SUPPORTED,
     *         YDisplay.FASTREFRESH_NEVER),
     *         corresponding to the policy for using fast refresh.
     * @param regenerate : a value among the enumeration YRefFrame.REGENERATE
     *         (YDisplay.REGENERATE_ON_REQUEST_ONLY,
     *         YDisplay.REGENERATE_EVERY_DAY, YDisplay.REGENERATE_EVERY_12H,
     *         YDisplay.REGENERATE_EVERY_6H, YDisplay.REGENERATE_EVERY_3H,
     *         YDisplay.REGENERATE_EVERY_2H, YDisplay.REGENERATE_EVERY_HOUR,
     *         YDisplay.REGENERATE_EVERY_30MIN, YDisplay.REGENERATE_EVERY_15MIN,
     *         YDisplay.REGENERATE_EVERY_480, YDisplay.REGENERATE_EVERY_432,
     *         YDisplay.REGENERATE_EVERY_360, YDisplay.REGENERATE_EVERY_288,
     *         YDisplay.REGENERATE_EVERY_240, YDisplay.REGENERATE_EVERY_192,
     *         YDisplay.REGENERATE_EVERY_144, YDisplay.REGENERATE_EVERY_96,
     *         YDisplay.REGENERATE_EVERY_48, YDisplay.REGENERATE_EVERY_36,
     *         YDisplay.REGENERATE_EVERY_24, YDisplay.REGENERATE_EVERY_12,
     *         YDisplay.REGENERATE_EVERY_10, YDisplay.REGENERATE_EVERY_8,
     *         YDisplay.REGENERATE_EVERY_6, YDisplay.REGENERATE_EVERY_4,
     *         YDisplay.REGENERATE_ALWAYS),
     *         corresponding to the display minimal regeneration frequency.
     *
     * Remember to call the saveToFlash()
     * method of the module if the modification must be kept.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_fastRefreshPolicy(fastRefresh: YDisplay.FASTREFRESH, regenerate: YDisplay.REGENERATE): Promise<number>
    {
        let combined: number;
        let fmod: number;
        let fval: number;
        fmod = fastRefresh;
        fval = regenerate;
        if ((fval == 25) || (fmod == 2)) {
            combined = 100;
        } else {
            combined = 50 + fmod * 25 + fval;
        }
        return await this.set_brightness(combined);
    }

    /**
     * Clears the display screen and resets all display layers to their default state.
     * Using this function in a sequence will kill the sequence play-back. Do not use that
     * function to reset the display at sequence start-up.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async resetAll(): Promise<number>
    {
        await this.flushLayers();
        this.resetHiddenLayerFlags();
        return await this.sendCommand('Z');
    }

    /**
     * Forces an ePaper screen to perform a regenerative update using the slow
     * update method. Periodic use of the slow method (total panel update with
     * multiple inversions) prevents ghosting effects and improves contrast.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async regenerateDisplay(): Promise<number>
    {
        return await this.sendCommand('z');
    }

    /**
     * Returns the current state of an ePaper display, specifically to
     * determine whether an update is in progress or whether a
     * configuration issue has been detected. If a display configuration
     * error has been detected, the error message can be retrieved.
     *
     * @param errmsg : a string passed by reference to receive the error message.
     *
     * @return a value among the enumeration YDisplay.DISPLAYSTATE
     *         (YDisplay.DISPLAYSTATE_FAILURE, YDisplay.DISPLAYSTATE_OFF,
     *         YDisplay.DISPLAYSTATE_POWERING, YDisplay.DISPLAYSTATE_IDLE,
     *         YDisplay.DISPLAYSTATE_REFRESHING)
     *         corresponding to the current display state.
     */
    async get_ePaperState(errmsg: YErrorMsg): Promise<YDisplay.DISPLAYSTATE>
    {
        let json: Uint8Array;
        let dispError: string;
        let dispState: number;

        if (await this.get_displayType() == YDisplay.DISPLAYTYPE_MONO) {
            errmsg.msg = 'Not an ePaper display';
            return <YDisplay.DISPLAYSTATE> 0;
        }
        json = await this._download('disp.json');
        if ((json).length == 0) {
            errmsg.msg = await this.get_errorMessage();
            return <YDisplay.DISPLAYSTATE> 0;
        } else {
            dispError = this.imm_json_get_string(this.imm_get_json_path(json, 'err'));
            errmsg.msg = dispError;
            if ((dispError).length > 0) {
                return <YDisplay.DISPLAYSTATE> 0;
            }
            dispState = YAPIContext.imm_atoi(this.imm_json_get_key(json, 'state'));
            if (dispState > 10) {
                return <YDisplay.DISPLAYSTATE> 4;
            }
            if (dispState == 10) {
                return <YDisplay.DISPLAYSTATE> 3;
            }
            if (dispState > 0) {
                return <YDisplay.DISPLAYSTATE> 2;
            }
        }
        return <YDisplay.DISPLAYSTATE> 1;
    }

    /**
     * Disables screen refresh for a short period of time. The combination of
     * postponeRefresh and triggerRefresh can be used as an
     * alternative to double-buffering to avoid flickering during display updates.
     *
     * @param duration : duration of deactivation in milliseconds (max. 30 seconds)
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async postponeRefresh(duration: number): Promise<number>
    {
        this._frozenUntil = this._yapi.GetTickCount() + duration;
        return await this.sendCommand('H' + String(Math.round(duration)));
    }

    /**
     * Triggers an immediate screen refresh. The combination of
     * postponeRefresh and triggerRefresh can be used as an
     * alternative to double-buffering to avoid flickering during display updates.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async triggerRefresh(): Promise<number>
    {
        this._frozenUntil = 0;
        await this.flushLayers();
        return await this.sendCommand('H0');
    }

    /**
     * Smoothly changes the brightness of the screen to produce a fade-in or fade-out
     * effect.
     *
     * @param brightness : the new screen brightness
     * @param duration : duration of the brightness transition, in milliseconds.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async fade(brightness: number, duration: number): Promise<number>
    {
        await this.flushLayers();
        return await this.sendCommand('+' + String(Math.round(brightness)) + ',' + String(Math.round(duration)));
    }

    /**
     * Starts to record all display commands into a sequence, for later replay.
     * The name used to store the sequence is specified when calling
     * saveSequence(), once the recording is complete.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async newSequence(): Promise<number>
    {
        await this.flushLayers();
        this._sequence = '';
        this._recording = true;
        return this._yapi.SUCCESS;
    }

    /**
     * Stops recording display commands and saves the sequence into the specified
     * file on the display internal memory. The sequence can be later replayed
     * using playSequence().
     *
     * @param sequenceName : the name of the newly created sequence
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async saveSequence(sequenceName: string): Promise<number>
    {
        await this.flushLayers();
        this._recording = false;
        await this._upload(sequenceName, this._yapi.imm_str2bin(this._sequence));
        //We need to use YPRINTF("") for Objective-C
        this._sequence = '';
        return this._yapi.SUCCESS;
    }

    /**
     * Replays a display sequence previously recorded using
     * newSequence() and saveSequence().
     *
     * @param sequenceName : the name of the newly created sequence
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async playSequence(sequenceName: string): Promise<number>
    {
        await this.flushLayers();
        return await this.sendCommand('S' + sequenceName);
    }

    /**
     * Waits for a specified delay (in milliseconds) before playing next
     * commands in current sequence. This method can be used while
     * recording a display sequence, to insert a timed wait in the sequence
     * (without any immediate effect). It can also be used dynamically while
     * playing a pre-recorded sequence, to suspend or resume the execution of
     * the sequence. To cancel a delay, call the same method with a zero delay.
     *
     * @param delay_ms : the duration to wait, in milliseconds
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async pauseSequence(delay_ms: number): Promise<number>
    {
        await this.flushLayers();
        return await this.sendCommand('W' + String(Math.round(delay_ms)));
    }

    /**
     * Stops immediately any ongoing sequence replay.
     * The display is left as is.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async stopSequence(): Promise<number>
    {
        await this.flushLayers();
        return await this.sendCommand('S');
    }

    /**
     * Uploads an arbitrary file (for instance a GIF file) to the display, to the
     * specified full path name. If a file already exists with the same path name,
     * its content is overwritten.
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
        await this.flushLayers();
        return await this._upload(pathname, content);
    }

    /**
     * Copies the whole content of a layer to another layer. The color and transparency
     * of all the pixels from the destination layer are set to match the source pixels.
     * This method only affects the displayed content, but does not change any
     * property of the layer object.
     * Note that layer 0 has no transparency support (it is always completely opaque).
     *
     * @param srcLayerId : the identifier of the source layer (a number in range 0..layerCount-1)
     * @param dstLayerId : the identifier of the destination layer (a number in range 0..layerCount-1)
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async copyLayerContent(srcLayerId: number, dstLayerId: number): Promise<number>
    {
        await this.flushLayers();
        return await this.sendCommand('o' + String(Math.round(srcLayerId)) + ',' + String(Math.round(dstLayerId)));
    }

    /**
     * Swaps the whole content of two layers. The color and transparency of all the pixels from
     * the two layers are swapped. This method only affects the displayed content, but does
     * not change any property of the layer objects. In particular, the visibility of each
     * layer stays unchanged. When used between one hidden layer and a visible layer,
     * this method makes it possible to easily implement double-buffering.
     * Note that layer 0 has no transparency support (it is always completely opaque).
     *
     * @param layerIdA : the first layer (a number in range 0..layerCount-1)
     * @param layerIdB : the second layer (a number in range 0..layerCount-1)
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async swapLayerContent(layerIdA: number, layerIdB: number): Promise<number>
    {
        await this.flushLayers();
        return await this.sendCommand('E' + String(Math.round(layerIdA)) + ',' + String(Math.round(layerIdB)));
    }

    /**
     * Returns a YDisplayLayer object that can be used to draw on the specified
     * layer. The content is displayed only when the layer is active on the
     * screen (and not masked by other overlapping layers).
     *
     * @param layerId : the identifier of the layer (a number in range 0..layerCount-1)
     *
     * @return an YDisplayLayer object
     *
     * On failure, throws an exception or returns null.
     */
    async get_displayLayer(layerId: number): Promise<YDisplayLayer | null>
    {
        let layercount: number;
        let idx: number;
        layercount = await this.get_layerCount();
        if (!((layerId >= 0) && (layerId < layercount))) {
            return this._throw(this._yapi.INVALID_ARGUMENT, 'invalid DisplayLayer index', null);
        }
        if (this._allDisplayLayers.length == 0) {
            idx = 0;
            while (idx < layercount) {
                this._allDisplayLayers.push(new YDisplayLayer(this, idx));
                idx = idx + 1;
            }
        }
        return this._allDisplayLayers[layerId];
    }

    /**
     * Returns a color image with the current content of the display.
     * The image is returned as a binary object, where each byte represents a pixel,
     * from left to right and from top to bottom. The palette used to map byte
     * values to RGB colors is filled into the list provided as argument.
     * In all cases, the first palette entry (value 0) corresponds to the
     * screen default background color.
     * The image dimensions are given by the display width and height.
     *
     * @param palette : a list to be filled with the image palette
     *
     * @return a binary object if the call succeeds.
     *
     * On failure, throws an exception or returns an empty binary object.
     */
    async readDisplay(palette: number[]): Promise<Uint8Array>
    {
        let zipmap: Uint8Array;
        let zipsize: number;
        let zipwidth: number;
        let zipheight: number;
        let ziprotate: number;
        let zipcolors: number;
        let zipcol: number;
        let zipbits: number;
        let zipmask: number;
        let srcpos: number;
        let endrun: number;
        let srcpat: number;
        let srcbit: number;
        let srcval: number;
        let srcx: number;
        let srcy: number;
        let srci: number;
        let pixmap: Uint8Array;
        let pixcount: number;
        let pixval: number;
        let pixpos: number;
        let rotmap: Uint8Array;
        pixmap = new Uint8Array(0);
        // Check if the display firmware has autoInvertDelay and pixels.bin support

        if (await this.get_autoInvertDelay() < 0) {
            // Old firmware, use uncompressed GIF output to rebuild pixmap
            zipmap = await this._download('display.gif');
            zipsize = (zipmap).length;
            if (zipsize == 0) {
                return pixmap;
            }
            if (!(zipsize >= 32)) {
                return this._throw(this._yapi.IO_ERROR, 'not a GIF image', pixmap);
            }
            if (!((zipmap[0] == 71) && (zipmap[2] == 70))) {
                return this._throw(this._yapi.INVALID_ARGUMENT, 'not a GIF image', pixmap);
            }
            zipwidth = zipmap[6] + 256 * zipmap[7];
            zipheight = zipmap[8] + 256 * zipmap[9];
            palette.length = 0;
            zipcol = zipmap[13] * 65536 + zipmap[14] * 256 + zipmap[15];
            palette.push(zipcol);
            zipcol = zipmap[16] * 65536 + zipmap[17] * 256 + zipmap[18];
            palette.push(zipcol);
            pixcount = zipwidth * zipheight;
            pixmap = new Uint8Array(pixcount);
            pixpos = 0;
            srcpos = 30;
            zipsize = zipsize - 2;
            while (srcpos < zipsize) {
                // load next run size
                endrun = srcpos + 1 + zipmap[srcpos];
                srcpos = srcpos + 1;
                while (srcpos < endrun) {
                    srcval = zipmap[srcpos];
                    srcpos = srcpos + 1;
                    srcbit = 8;
                    while (srcbit != 0) {
                        if (srcbit < 3) {
                            srcval = srcval + (zipmap[srcpos] << srcbit);
                            srcpos = srcpos + 1;
                        }
                        pixval = (srcval & 7);
                        srcval = (srcval >> 3);
                        if (!((pixval > 1) && (pixval != 4))) {
                            return this._throw(this._yapi.INVALID_ARGUMENT, 'unexpected encoding', pixmap);
                        }
                        pixmap.set([pixval], pixpos);
                        pixpos = pixpos + 1;
                        srcbit = srcbit - 3;
                    }
                }
            }
            return pixmap;
        }
        // New firmware, use compressed pixels.bin
        zipmap = await this._download('pixels.bin');
        zipsize = (zipmap).length;
        if (zipsize == 0) {
            return pixmap;
        }
        if (!(zipsize >= 16)) {
            return this._throw(this._yapi.IO_ERROR, 'not a pixmap', pixmap);
        }
        if (!((zipmap[0] == 80) && (zipmap[2] == 88))) {
            return this._throw(this._yapi.INVALID_ARGUMENT, 'not a pixmap', pixmap);
        }
        zipwidth = zipmap[4] + 256 * zipmap[5];
        zipheight = zipmap[6] + 256 * zipmap[7];
        ziprotate = zipmap[8];
        zipcolors = zipmap[9];
        palette.length = 0;
        srcpos = 10;
        srci = 0;
        while (srci < zipcolors) {
            zipcol = zipmap[srcpos] * 65536 + zipmap[srcpos+1] * 256 + zipmap[srcpos+2];
            palette.push(zipcol);
            srcpos = srcpos + 3;
            srci = srci + 1;
        }
        zipbits = 1;
        while ((1 << zipbits) < zipcolors) {
            zipbits = zipbits + 1;
        }
        zipmask = (1 << zipbits) - 1;
        pixcount = zipwidth * zipheight;
        pixmap = new Uint8Array(pixcount);
        srcx = 0;
        srcy = 0;
        srcval = 0;
        while (srcpos < zipsize) {
            // load next compression pattern byte
            srcpat = zipmap[srcpos];
            srcpos = srcpos + 1;
            srcbit = 7;
            while (srcbit >= 0) {
                // get next bitmap byte
                if ((srcpat & 128) != 0) {
                    srcval = zipmap[srcpos];
                    srcpos = srcpos + 1;
                    if (zipbits > 1) {
                        srcval = (srcval << 8) + zipmap[srcpos];
                        srcpos = srcpos + 1;
                    }
                }
                srcpat = (srcpat << 1);
                pixpos = srcy * zipwidth + srcx;
                // produce 8 pixels
                srci = 7 * zipbits;
                while (srci >= 0) {
                    pixval = ((srcval >> srci) & zipmask);
                    pixmap.set([pixval], pixpos);
                    pixpos = pixpos + 1;
                    srci = srci - zipbits;
                }
                srcy = srcy + 1;
                if (srcy >= zipheight) {
                    srcy = 0;
                    srcx = srcx + 8;
                    // drop last bytes if image is not a multiple of 8
                    if (srcx >= zipwidth) {
                        srcbit = 0;
                    }
                }
                srcbit = srcbit - 1;
            }
        }
        // rotate pixmap to match display orientation
        if (ziprotate == 0) {
            return pixmap;
        }
        if ((ziprotate & 2) != 0) {
            // rotate buffer 180 degrees by swapping pixels
            srcpos = 0;
            pixpos = pixcount - 1;
            while (srcpos < pixpos) {
                pixval = pixmap[srcpos];
                pixmap.set([pixmap[pixpos]], srcpos);
                pixmap.set([pixval], pixpos);
                srcpos = srcpos + 1;
                pixpos = pixpos - 1;
            }
        }
        if ((ziprotate & 1) == 0) {
            return pixmap;
        }
        // rotate 90 ccw: first pixel is bottom left
        rotmap = new Uint8Array(pixcount);
        srcx = 0;
        srcy = zipwidth - 1;
        srcpos = 0;
        while (srcpos < pixcount) {
            pixval = pixmap[srcpos];
            pixpos = srcy * zipheight + srcx;
            rotmap.set([pixval], pixpos);
            srcy = srcy - 1;
            if (srcy < 0) {
                srcx = srcx + 1;
                srcy = zipwidth - 1;
            }
            srcpos = srcpos + 1;
        }
        return rotmap;
    }

    async gifEncode(pixmap: Uint8Array, palette: number[], w: number, shortHdr: boolean): Promise<Uint8Array>
    {
        let minCodeSize: number;
        let LZW_CLRCODE: number;
        let LZW_ENDCODE: number;
        let LZW_1STCODE: number;
        let codeSize: number;
        let maxCode: number;
        let codes: number[] = [];
        let nCodes: number;
        let pixmapSize: number;
        let dataStream: Uint8Array;
        let blockStart: number;
        let blockEnd: number;
        let prevCode: number;
        let pixPos: number;
        let wrBits: number;
        let wrBitCnt: number;
        let outPos: number;
        let nextVal: number;
        let i: number;
        let hdrSize: number;
        let res: Uint8Array;
        let h: number;

        if (palette.length > 8) {
            this._throw(this._yapi.INVALID_ARGUMENT, 'Palette should have no more than 8 colors');
            res = new Uint8Array(0);
            return res;
        }
        if (palette.length <= 4) {
            minCodeSize = 2;
        } else {
            minCodeSize = 3;
        }
        LZW_CLRCODE = (1 << minCodeSize);
        LZW_ENDCODE = LZW_CLRCODE + 1;
        LZW_1STCODE = LZW_ENDCODE + 1;
        codeSize = minCodeSize + 1;
        maxCode = (1 << codeSize) - 1 - LZW_1STCODE;
        codes.length = 0;
        nCodes = 0;
        pixmapSize = (pixmap).length;
        dataStream = new Uint8Array((((2 * pixmapSize) / 3) >> 0) + 8);
        outPos = 0;
        wrBits = LZW_CLRCODE;
        wrBitCnt = 3;
        // prefetch first byte
        prevCode = pixmap[0];
        pixPos = 1;
        while (pixPos < pixmapSize + 3) {
            blockStart = outPos;
            outPos = blockStart + 1;
            blockEnd = blockStart + 256;
            // flush any carry-over output byte from previous data sub-block
            while (wrBitCnt >= 8) {
                dataStream.set([(wrBits & 0xff)], outPos);
                outPos = outPos + 1;
                wrBits = (wrBits >> 8);
                wrBitCnt = wrBitCnt - 8;
            }
            while ((outPos < blockEnd) && (pixPos < pixmapSize)) {
                // search for an existing code matching the running input segment
                // printf("[%d] ", rdBits >> 12);
                nextVal = (prevCode | (pixmap[pixPos] << 12));
                pixPos = pixPos + 1;
                if (prevCode < LZW_1STCODE) {
                    i = 0;
                } else {
                    i = prevCode - LZW_ENDCODE;
                }
                while ((i < nCodes) && (codes[i] != nextVal)) {
                    i = i + 1;
                }
                if (i >= nCodes) {
                    // not found, emit prevCode and create new code
                    wrBits = (wrBits | (prevCode << wrBitCnt));
                    wrBitCnt = wrBitCnt + codeSize;
                    if (nCodes <= maxCode) {
                        //fprintf(stderr, "#%d: #%d + %d\n", nextCode, nextVal & 63, nextVal >> 6);
                        codes.push(nextVal);
                        nCodes = nCodes + 1;
                    } else {
                        codeSize = codeSize + 1;
                        if (codeSize <= 12) {
                            //fprintf(stderr, "#%d: #%d + %d\n", nextCode, nextVal & 63, nextVal >> 6);
                            codes.push(nextVal);
                            nCodes = nCodes + 1;
                        } else {
                            wrBits = (wrBits | (LZW_CLRCODE << wrBitCnt));
                            wrBitCnt = wrBitCnt + codeSize;
                            codes.length = 0;
                            nCodes = 0;
                            codeSize = minCodeSize + 1;
                        }
                        maxCode = (1 << codeSize) - 1 - LZW_1STCODE;
                    }
                    // flush one (or two) codes to output stream
                    while ((wrBitCnt >= 8) && (outPos < blockEnd)) {
                        dataStream.set([(wrBits & 0xff)], outPos);
                        outPos = outPos + 1;
                        wrBits = (wrBits >> 8);
                        wrBitCnt = wrBitCnt - 8;
                    }
                    prevCode = (nextVal >> 12);
                } else {
                    prevCode = i + LZW_1STCODE;
                }
            }
            if (pixPos >= pixmapSize) {
                if ((outPos < blockEnd) && (pixPos == pixmapSize)) {
                    // append code for last run
                    wrBits = (wrBits | (prevCode << wrBitCnt));
                    wrBitCnt = wrBitCnt + codeSize;
                    while ((wrBitCnt >= 8) && (outPos < blockEnd)) {
                        dataStream.set([(wrBits & 0xff)], outPos);
                        outPos = outPos + 1;
                        wrBits = (wrBits >> 8);
                        wrBitCnt = wrBitCnt - 8;
                    }
                    pixPos = pixPos + 1;
                }
                if ((outPos < blockEnd) && (pixPos == pixmapSize + 1)) {
                    // append end code
                    wrBits = (wrBits | (LZW_ENDCODE << wrBitCnt));
                    wrBitCnt = wrBitCnt + codeSize;
                    while ((wrBitCnt >= 8) && (outPos < blockEnd)) {
                        dataStream.set([(wrBits & 0xff)], outPos);
                        outPos = outPos + 1;
                        wrBits = (wrBits >> 8);
                        wrBitCnt = wrBitCnt - 8;
                    }
                    pixPos = pixPos + 1;
                }
                if ((outPos < blockEnd) && (pixPos == pixmapSize + 2)) {
                    // flush last 0-7 bits
                    if (wrBitCnt > 0) {
                        dataStream.set([(wrBits & 0xff)], outPos);
                        outPos = outPos + 1;
                        wrBitCnt = 0;
                    }
                    pixPos = pixPos + 1;
                }
            }
            dataStream.set([outPos - (blockStart + 1)], blockStart);
        }
        blockEnd = outPos;
        // Now write final buffer
        hdrSize = 24 + LZW_CLRCODE * 3;
        res = new Uint8Array(hdrSize + outPos + 2);
        // GIF89a header
        res.set([0x47], 0x00);
        res.set([0x49], 0x01);
        res.set([0x46], 0x02);
        res.set([0x38], 0x03);
        res.set([0x39], 0x04);
        res.set([0x61], 0x05);
        // Logical screen descriptor
        h = ((((pixmap).length) / w) >> 0);
        res.set([(w & 0xff)], 0x06);
        res.set([(w >> 8)], 0x07);
        res.set([(h & 0xff)], 0x08);
        res.set([(h >> 8)], 0x09);
        res.set([0xf0 + minCodeSize - 1], 0x0a);
        res.set([0], 0x0b);
        res.set([0], 0x0c);
        // Palette
        outPos = 0x0d;
        i = 0;
        while (i < LZW_CLRCODE) {
            if (i < palette.length) {
                wrBits = palette[i];
                res.set([((wrBits >> 16) & 0xff)], outPos);
                res.set([((wrBits >> 8) & 0xff)], outPos + 1);
                res.set([(wrBits & 0xff)], outPos + 2);
            }
            outPos = outPos + 3;
            i = i + 1;
        }
        // Image descriptor
        res.set([0x2c], outPos);
        res.set([(w & 0xff)], outPos + 5);
        res.set([(w >> 8)], outPos + 6);
        res.set([(h & 0xff)], outPos + 7);
        res.set([(h >> 8)], outPos + 8);
        outPos = outPos + 10;
        // Prepare to append Image data
        res.set([minCodeSize], outPos);
        i = 0;
        while (i < blockEnd) {
            outPos = outPos + 1;
            res.set([dataStream[i]], outPos);
            i = i + 1;
        }
        // Append zero-block and trailer
        outPos = outPos + 1;
        res.set([0], outPos);
        outPos = outPos + 1;
        res.set([0x3b], outPos);
        return res;
    }

    /**
     * Continues the enumeration of displays started using yFirstDisplay().
     * Caution: You can't make any assumption about the returned displays order.
     * If you want to find a specific a display, use Display.findDisplay()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YDisplay object, corresponding to
     *         a display currently online, or a null pointer
     *         if there are no more displays to enumerate.
     */
    nextDisplay(): YDisplay | null
    {
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != YAPI.SUCCESS) return null;
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, <string> resolve.result);
        if (next_hwid == null) return null;
        return YDisplay.FindDisplayInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of displays currently accessible.
     * Use the method YDisplay.nextDisplay() to iterate on
     * next displays.
     *
     * @return a pointer to a YDisplay object, corresponding to
     *         the first display currently online, or a null pointer
     *         if there are none.
     */
    static FirstDisplay(): YDisplay | null
    {
        let next_hwid = YAPI.imm_getFirstHardwareId('Display');
        if (next_hwid == null) return null;
        return YDisplay.FindDisplay(next_hwid);
    }

    /**
     * Starts the enumeration of displays currently accessible.
     * Use the method YDisplay.nextDisplay() to iterate on
     * next displays.
     *
     * @param yctx : a YAPI context.
     *
     * @return a pointer to a YDisplay object, corresponding to
     *         the first display currently online, or a null pointer
     *         if there are none.
     */
    static FirstDisplayInContext(yctx: YAPIContext): YDisplay | null
    {
        let next_hwid = yctx.imm_getFirstHardwareId('Display');
        if (next_hwid == null) return null;
        return YDisplay.FindDisplayInContext(yctx, next_hwid);
    }

    //--- (end of generated code: YDisplay implementation)

}

export namespace YDisplay
{
    //--- (generated code: YDisplay definitions)
    export const enum ENABLED
    {
        FALSE = 0,
        TRUE = 1,
        INVALID = -1
    }

    export const enum ORIENTATION
    {
        LEFT = 0,
        UP = 1,
        RIGHT = 2,
        DOWN = 3,
        INVALID = -1
    }

    export const enum DISPLAYTYPE
    {
        MONO = 0,
        EPAPER_BW = 1,
        EPAPER_BWR = 2,
        EPAPER_BWRY = 3,
        INVALID = -1
    }

    export const enum FASTREFRESH
    {
        WHENEVER_POSSIBLE = 0,
        WHENEVER_SUPPORTED = 1,
        NEVER = 2,
        INVALID = 3
    }
    export const enum REGENERATE
    {
        ON_REQUEST_ONLY = 0,
        EVERY_DAY = 1,
        EVERY_12H = 2,
        EVERY_6H = 3,
        EVERY_3H = 4,
        EVERY_2H = 5,
        EVERY_HOUR = 6,
        EVERY_30MIN = 7,
        EVERY_15MIN = 8,
        EVERY_480 = 9,
        EVERY_432 = 10,
        EVERY_360 = 11,
        EVERY_288 = 12,
        EVERY_240 = 13,
        EVERY_192 = 14,
        EVERY_144 = 15,
        EVERY_96 = 16,
        EVERY_48 = 17,
        EVERY_36 = 18,
        EVERY_24 = 19,
        EVERY_12 = 20,
        EVERY_10 = 21,
        EVERY_8 = 22,
        EVERY_6 = 23,
        EVERY_4 = 24,
        ALWAYS = 25,
        INVALID = 26
    }
    export const enum DISPLAYSTATE
    {
        FAILURE = 0,
        OFF = 1,
        POWERING = 2,
        IDLE = 3,
        REFRESHING = 4,
        INVALID = 5
    }
    export interface ValueCallback {(func: YDisplay, value: string): void}

    //--- (end of generated code: YDisplay definitions)
}
