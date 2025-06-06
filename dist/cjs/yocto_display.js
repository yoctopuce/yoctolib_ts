"use strict";
/*********************************************************************
 *
 *  $Id: yocto_display.ts 64510 2025-01-31 08:36:57Z seb $
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.YDisplay = exports.YDisplayLayer = void 0;
const yocto_api_js_1 = require("./yocto_api.js");
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
class YDisplayLayer {
    //--- (end of generated code: YDisplayLayer attributes declaration)
    constructor(obj_parent, int_id) {
        this._cmdbuff = '';
        this._hidden = false;
        //--- (generated code: YDisplayLayer attributes declaration)
        // API symbols as object properties
        this.ALIGN_TOP_LEFT = 0;
        this.ALIGN_CENTER_LEFT = 1;
        this.ALIGN_BASELINE_LEFT = 2;
        this.ALIGN_BOTTOM_LEFT = 3;
        this.ALIGN_TOP_CENTER = 4;
        this.ALIGN_CENTER = 5;
        this.ALIGN_BASELINE_CENTER = 6;
        this.ALIGN_BOTTOM_CENTER = 7;
        this.ALIGN_TOP_DECIMAL = 8;
        this.ALIGN_CENTER_DECIMAL = 9;
        this.ALIGN_BASELINE_DECIMAL = 10;
        this.ALIGN_BOTTOM_DECIMAL = 11;
        this.ALIGN_TOP_RIGHT = 12;
        this.ALIGN_CENTER_RIGHT = 13;
        this.ALIGN_BASELINE_RIGHT = 14;
        this.ALIGN_BOTTOM_RIGHT = 15;
        this._yapi = obj_parent._yapi;
        this._display = obj_parent;
        this._id = int_id >> 0;
        //--- (generated code: YDisplayLayer constructor)
        //--- (end of generated code: YDisplayLayer constructor)
    }
    // internal function to flush any pending command for this layer
    imm_must_be_flushed() {
        return (this._cmdbuff != '');
    }
    imm_resetHiddenFlag() {
        this._hidden = false;
        return this._yapi.SUCCESS;
    }
    // internal function to flush any pending command for this layer
    async flush_now() {
        let res = yocto_api_js_1.YAPI.SUCCESS;
        if (this._cmdbuff != '') {
            res = await this._display.sendCommand(this._cmdbuff);
            this._cmdbuff = '';
        }
        return res;
    }
    // internal function to buffer a command for this layer
    async command_push(str_cmd) {
        let res = yocto_api_js_1.YAPI.SUCCESS;
        if (this._cmdbuff.length + str_cmd.length >= 100) {
            // force flush before, to prevent overflow
            res = await this.flush_now();
        }
        if (this._cmdbuff == '') {
            // always prepend layer ID first
            this._cmdbuff = this._id.toString();
        }
        this._cmdbuff += str_cmd;
        return res;
    }
    // internal function to send a command for this layer
    async command_flush(str_cmd) {
        const res = await this.command_push(str_cmd);
        if (this._hidden) {
            return res;
        }
        return await this.flush_now();
    }
    //--- (generated code: YDisplayLayer implementation)
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
    async reset() {
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
    async clear() {
        return await this.command_flush('x');
    }
    /**
     * Selects the pen color for all subsequent drawing functions,
     * including text drawing. The pen color is provided as an RGB value.
     * For grayscale or monochrome displays, the value is
     * automatically converted to the proper range.
     *
     * @param color : the desired pen color, as a 24-bit RGB value
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async selectColorPen(color) {
        return await this.command_push('c' + ('000000' + (color).toString(16)).slice(-6).toLowerCase());
    }
    /**
     * Selects the pen gray level for all subsequent drawing functions,
     * including text drawing. The gray level is provided as a number between
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
    async selectGrayPen(graylevel) {
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
    async selectEraser() {
        return await this.command_push('e');
    }
    /**
     * Enables or disables anti-aliasing for drawing oblique lines and circles.
     * Anti-aliasing provides a smoother aspect when looked from far enough,
     * but it can add fuzziness when the display is looked from very close.
     * At the end of the day, it is your personal choice.
     * Anti-aliasing is enabled by default on grayscale and color displays,
     * but you can disable it if you prefer. This setting has no effect
     * on monochrome displays.
     *
     * @param mode : true to enable anti-aliasing, false to
     *         disable it.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async setAntialiasingMode(mode) {
        return await this.command_push('a' + (mode ? "1" : "0"));
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
    async drawPixel(x, y) {
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
    async drawRect(x1, y1, x2, y2) {
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
    async drawBar(x1, y1, x2, y2) {
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
    async drawCircle(x, y, r) {
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
    async drawDisc(x, y, r) {
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
    async selectFont(fontname) {
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
    async drawText(x, y, anchor, text) {
        return await this.command_flush('T' + String(Math.round(x)) + ',' + String(Math.round(y)) + ',' + String(anchor) + ',' + text + '' + String.fromCharCode(27));
    }
    /**
     * Draws a GIF image at the specified position. The GIF image must have been previously
     * uploaded to the device built-in memory. If you experience problems using an image
     * file, check the device logs for any error message such as missing image file or bad
     * image file format.
     *
     * @param x : the distance from left of layer to the left of the image, in pixels
     * @param y : the distance from top of layer to the top of the image, in pixels
     * @param imagename : the GIF file name
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async drawImage(x, y, imagename) {
        return await this.command_flush('*' + String(Math.round(x)) + ',' + String(Math.round(y)) + ',' + imagename + '' + String.fromCharCode(27));
    }
    /**
     * Draws a bitmap at the specified position. The bitmap is provided as a binary object,
     * where each pixel maps to a bit, from left to right and from top to bottom.
     * The most significant bit of each byte maps to the leftmost pixel, and the least
     * significant bit maps to the rightmost pixel. Bits set to 1 are drawn using the
     * layer selected pen color. Bits set to 0 are drawn using the specified background
     * gray level, unless -1 is specified, in which case they are not drawn at all
     * (as if transparent).
     *
     * @param x : the distance from left of layer to the left of the bitmap, in pixels
     * @param y : the distance from top of layer to the top of the bitmap, in pixels
     * @param w : the width of the bitmap, in pixels
     * @param bitmap : a binary object
     * @param bgcol : the background gray level to use for zero bits (0 = black,
     *         255 = white), or -1 to leave the pixels unchanged
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async drawBitmap(x, y, w, bitmap, bgcol) {
        let destname;
        destname = 'layer' + String(Math.round(this._id)) + ':' + String(Math.round(w)) + ',' + String(Math.round(bgcol)) + '@' + String(Math.round(x)) + ',' + String(Math.round(y));
        return await this._display.upload(destname, bitmap);
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
    async moveTo(x, y) {
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
    async lineTo(x, y) {
        return await this.command_flush('-' + String(Math.round(x)) + ',' + String(Math.round(y)));
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
    async consoleOut(text) {
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
    async setConsoleMargins(x1, y1, x2, y2) {
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
    async setConsoleBackground(bgcol) {
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
    async setConsoleWordWrap(wordwrap) {
        return await this.command_push('w' + (wordwrap ? "1" : "0"));
    }
    /**
     * Blanks the console area within console margins, and resets the console pointer
     * to the upper left corner of the console.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async clearConsole() {
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
    async setLayerPosition(x, y, scrollTime) {
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
    async hide() {
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
    async unhide() {
        this._hidden = false;
        return await this.command_flush('s');
    }
    /**
     * Gets parent YDisplay. Returns the parent YDisplay object of the current YDisplayLayer.
     *
     * @return an YDisplay object
     */
    async get_display() {
        return this._display;
    }
    /**
     * Returns the display width, in pixels.
     *
     * @return an integer corresponding to the display width, in pixels
     *
     * On failure, throws an exception or returns YDisplayLayer.DISPLAYWIDTH_INVALID.
     */
    async get_displayWidth() {
        return await this._display.get_displayWidth();
    }
    /**
     * Returns the display height, in pixels.
     *
     * @return an integer corresponding to the display height, in pixels
     *
     * On failure, throws an exception or returns YDisplayLayer.DISPLAYHEIGHT_INVALID.
     */
    async get_displayHeight() {
        return await this._display.get_displayHeight();
    }
    /**
     * Returns the width of the layers to draw on, in pixels.
     *
     * @return an integer corresponding to the width of the layers to draw on, in pixels
     *
     * On failure, throws an exception or returns YDisplayLayer.LAYERWIDTH_INVALID.
     */
    async get_layerWidth() {
        return await this._display.get_layerWidth();
    }
    /**
     * Returns the height of the layers to draw on, in pixels.
     *
     * @return an integer corresponding to the height of the layers to draw on, in pixels
     *
     * On failure, throws an exception or returns YDisplayLayer.LAYERHEIGHT_INVALID.
     */
    async get_layerHeight() {
        return await this._display.get_layerHeight();
    }
    async resetHiddenFlag() {
        this._hidden = false;
        return yocto_api_js_1.YAPI.SUCCESS;
    }
}
exports.YDisplayLayer = YDisplayLayer;
// API symbols as static members
YDisplayLayer.ALIGN_TOP_LEFT = 0;
YDisplayLayer.ALIGN_CENTER_LEFT = 1;
YDisplayLayer.ALIGN_BASELINE_LEFT = 2;
YDisplayLayer.ALIGN_BOTTOM_LEFT = 3;
YDisplayLayer.ALIGN_TOP_CENTER = 4;
YDisplayLayer.ALIGN_CENTER = 5;
YDisplayLayer.ALIGN_BASELINE_CENTER = 6;
YDisplayLayer.ALIGN_BOTTOM_CENTER = 7;
YDisplayLayer.ALIGN_TOP_DECIMAL = 8;
YDisplayLayer.ALIGN_CENTER_DECIMAL = 9;
YDisplayLayer.ALIGN_BASELINE_DECIMAL = 10;
YDisplayLayer.ALIGN_BOTTOM_DECIMAL = 11;
YDisplayLayer.ALIGN_TOP_RIGHT = 12;
YDisplayLayer.ALIGN_CENTER_RIGHT = 13;
YDisplayLayer.ALIGN_BASELINE_RIGHT = 14;
YDisplayLayer.ALIGN_BOTTOM_RIGHT = 15;
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
class YDisplay extends yocto_api_js_1.YFunction {
    //--- (end of generated code: YDisplay attributes declaration)
    constructor(yapi, func) {
        //--- (generated code: YDisplay constructor)
        super(yapi, func);
        this._sequence = '';
        this._recording = false;
        this._enabled = YDisplay.ENABLED_INVALID;
        this._startupSeq = YDisplay.STARTUPSEQ_INVALID;
        this._brightness = YDisplay.BRIGHTNESS_INVALID;
        this._orientation = YDisplay.ORIENTATION_INVALID;
        this._displayWidth = YDisplay.DISPLAYWIDTH_INVALID;
        this._displayHeight = YDisplay.DISPLAYHEIGHT_INVALID;
        this._displayType = YDisplay.DISPLAYTYPE_INVALID;
        this._layerWidth = YDisplay.LAYERWIDTH_INVALID;
        this._layerHeight = YDisplay.LAYERHEIGHT_INVALID;
        this._layerCount = YDisplay.LAYERCOUNT_INVALID;
        this._command = YDisplay.COMMAND_INVALID;
        this._valueCallbackDisplay = null;
        this._allDisplayLayers = [];
        // API symbols as object properties
        this.ENABLED_FALSE = 0;
        this.ENABLED_TRUE = 1;
        this.ENABLED_INVALID = -1;
        this.STARTUPSEQ_INVALID = yocto_api_js_1.YAPI.INVALID_STRING;
        this.BRIGHTNESS_INVALID = yocto_api_js_1.YAPI.INVALID_UINT;
        this.ORIENTATION_LEFT = 0;
        this.ORIENTATION_UP = 1;
        this.ORIENTATION_RIGHT = 2;
        this.ORIENTATION_DOWN = 3;
        this.ORIENTATION_INVALID = -1;
        this.DISPLAYWIDTH_INVALID = yocto_api_js_1.YAPI.INVALID_UINT;
        this.DISPLAYHEIGHT_INVALID = yocto_api_js_1.YAPI.INVALID_UINT;
        this.DISPLAYTYPE_MONO = 0;
        this.DISPLAYTYPE_GRAY = 1;
        this.DISPLAYTYPE_RGB = 2;
        this.DISPLAYTYPE_INVALID = -1;
        this.LAYERWIDTH_INVALID = yocto_api_js_1.YAPI.INVALID_UINT;
        this.LAYERHEIGHT_INVALID = yocto_api_js_1.YAPI.INVALID_UINT;
        this.LAYERCOUNT_INVALID = yocto_api_js_1.YAPI.INVALID_UINT;
        this.COMMAND_INVALID = yocto_api_js_1.YAPI.INVALID_STRING;
        this._className = 'Display';
        //--- (end of generated code: YDisplay constructor)
    }
    //--- (generated code: YDisplay implementation)
    imm_parseAttr(name, val) {
        switch (name) {
            case 'enabled':
                this._enabled = val;
                return 1;
            case 'startupSeq':
                this._startupSeq = val;
                return 1;
            case 'brightness':
                this._brightness = val;
                return 1;
            case 'orientation':
                this._orientation = val;
                return 1;
            case 'displayWidth':
                this._displayWidth = val;
                return 1;
            case 'displayHeight':
                this._displayHeight = val;
                return 1;
            case 'displayType':
                this._displayType = val;
                return 1;
            case 'layerWidth':
                this._layerWidth = val;
                return 1;
            case 'layerHeight':
                this._layerHeight = val;
                return 1;
            case 'layerCount':
                this._layerCount = val;
                return 1;
            case 'command':
                this._command = val;
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
    async get_enabled() {
        let res;
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
    async set_enabled(newval) {
        let rest_val;
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
    async get_startupSeq() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YDisplay.STARTUPSEQ_INVALID;
            }
        }
        res = this._startupSeq;
        return res;
    }
    /**
     * Changes the name of the sequence to play when the displayed is powered on.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : a string corresponding to the name of the sequence to play when the displayed is powered on
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_startupSeq(newval) {
        let rest_val;
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
    async get_brightness() {
        let res;
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
    async set_brightness(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('brightness', rest_val);
    }
    /**
     * Returns the currently selected display orientation.
     *
     * @return a value among YDisplay.ORIENTATION_LEFT, YDisplay.ORIENTATION_UP,
     * YDisplay.ORIENTATION_RIGHT and YDisplay.ORIENTATION_DOWN corresponding to the currently selected
     * display orientation
     *
     * On failure, throws an exception or returns YDisplay.ORIENTATION_INVALID.
     */
    async get_orientation() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YDisplay.ORIENTATION_INVALID;
            }
        }
        res = this._orientation;
        return res;
    }
    /**
     * Changes the display orientation. Remember to call the saveToFlash()
     * method of the module if the modification must be kept.
     *
     * @param newval : a value among YDisplay.ORIENTATION_LEFT, YDisplay.ORIENTATION_UP,
     * YDisplay.ORIENTATION_RIGHT and YDisplay.ORIENTATION_DOWN corresponding to the display orientation
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_orientation(newval) {
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('orientation', rest_val);
    }
    /**
     * Returns the display width, in pixels.
     *
     * @return an integer corresponding to the display width, in pixels
     *
     * On failure, throws an exception or returns YDisplay.DISPLAYWIDTH_INVALID.
     */
    async get_displayWidth() {
        let res;
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
    async get_displayHeight() {
        let res;
        if (this._cacheExpiration == 0) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YDisplay.DISPLAYHEIGHT_INVALID;
            }
        }
        res = this._displayHeight;
        return res;
    }
    /**
     * Returns the display type: monochrome, gray levels or full color.
     *
     * @return a value among YDisplay.DISPLAYTYPE_MONO, YDisplay.DISPLAYTYPE_GRAY and
     * YDisplay.DISPLAYTYPE_RGB corresponding to the display type: monochrome, gray levels or full color
     *
     * On failure, throws an exception or returns YDisplay.DISPLAYTYPE_INVALID.
     */
    async get_displayType() {
        let res;
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
    async get_layerWidth() {
        let res;
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
    async get_layerHeight() {
        let res;
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
    async get_layerCount() {
        let res;
        if (this._cacheExpiration == 0) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YDisplay.LAYERCOUNT_INVALID;
            }
        }
        res = this._layerCount;
        return res;
    }
    async get_command() {
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return YDisplay.COMMAND_INVALID;
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
    static FindDisplay(func) {
        let obj;
        obj = yocto_api_js_1.YFunction._FindFromCache('Display', func);
        if (obj == null) {
            obj = new YDisplay(yocto_api_js_1.YAPI, func);
            yocto_api_js_1.YFunction._AddToCache('Display', func, obj);
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
    static FindDisplayInContext(yctx, func) {
        let obj;
        obj = yocto_api_js_1.YFunction._FindFromCacheInContext(yctx, 'Display', func);
        if (obj == null) {
            obj = new YDisplay(yctx, func);
            yocto_api_js_1.YFunction._AddToCache('Display', func, obj);
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
    async _invokeValueCallback(value) {
        if (this._valueCallbackDisplay != null) {
            try {
                await this._valueCallbackDisplay(this, value);
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
     * Clears the display screen and resets all display layers to their default state.
     * Using this function in a sequence will kill the sequence play-back. Don't use that
     * function to reset the display at sequence start-up.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async resetAll() {
        await this.flushLayers();
        this.imm_resetHiddenLayerFlags();
        return await this.sendCommand('Z');
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
    async fade(brightness, duration) {
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
    async newSequence() {
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
    async saveSequence(sequenceName) {
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
    async playSequence(sequenceName) {
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
    async pauseSequence(delay_ms) {
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
    async stopSequence() {
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
    async upload(pathname, content) {
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
    async copyLayerContent(srcLayerId, dstLayerId) {
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
    async swapLayerContent(layerIdA, layerIdB) {
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
    async get_displayLayer(layerId) {
        let layercount;
        let idx;
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
     * Continues the enumeration of displays started using yFirstDisplay().
     * Caution: You can't make any assumption about the returned displays order.
     * If you want to find a specific a display, use Display.findDisplay()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YDisplay object, corresponding to
     *         a display currently online, or a null pointer
     *         if there are no more displays to enumerate.
     */
    nextDisplay() {
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != yocto_api_js_1.YAPI.SUCCESS)
            return null;
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if (next_hwid == null)
            return null;
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
    static FirstDisplay() {
        let next_hwid = yocto_api_js_1.YAPI.imm_getFirstHardwareId('Display');
        if (next_hwid == null)
            return null;
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
    static FirstDisplayInContext(yctx) {
        let next_hwid = yctx.imm_getFirstHardwareId('Display');
        if (next_hwid == null)
            return null;
        return YDisplay.FindDisplayInContext(yctx, next_hwid);
    }
    //--- (end of generated code: YDisplay implementation)
    async flushLayers() {
        if (this._allDisplayLayers) {
            for (let i = 0; i < this._allDisplayLayers.length; i++) {
                if (this._allDisplayLayers[i].imm_must_be_flushed()) {
                    await this._allDisplayLayers[i].flush_now();
                }
            }
        }
        return yocto_api_js_1.YAPI.SUCCESS;
    }
    async resetHiddenLayerFlags() {
        if (this._allDisplayLayers) {
            for (let i = 0; i < this._allDisplayLayers.length; i++) {
                await this._allDisplayLayers[i].resetHiddenFlag();
            }
        }
    }
    imm_resetHiddenLayerFlags() {
        if (this._allDisplayLayers) {
            for (let i = 0; i < this._allDisplayLayers.length; i++) {
                this._allDisplayLayers[i].imm_resetHiddenFlag();
            }
        }
    }
    async sendCommand(cmd) {
        if (!this._recording) {
            // ignore call when there is no ongoing sequence
            return await this.set_command(cmd);
        }
        this._sequence += cmd + '\n';
        return yocto_api_js_1.YAPI.SUCCESS;
    }
}
exports.YDisplay = YDisplay;
// API symbols as static members
YDisplay.ENABLED_FALSE = 0;
YDisplay.ENABLED_TRUE = 1;
YDisplay.ENABLED_INVALID = -1;
YDisplay.STARTUPSEQ_INVALID = yocto_api_js_1.YAPI.INVALID_STRING;
YDisplay.BRIGHTNESS_INVALID = yocto_api_js_1.YAPI.INVALID_UINT;
YDisplay.ORIENTATION_LEFT = 0;
YDisplay.ORIENTATION_UP = 1;
YDisplay.ORIENTATION_RIGHT = 2;
YDisplay.ORIENTATION_DOWN = 3;
YDisplay.ORIENTATION_INVALID = -1;
YDisplay.DISPLAYWIDTH_INVALID = yocto_api_js_1.YAPI.INVALID_UINT;
YDisplay.DISPLAYHEIGHT_INVALID = yocto_api_js_1.YAPI.INVALID_UINT;
YDisplay.DISPLAYTYPE_MONO = 0;
YDisplay.DISPLAYTYPE_GRAY = 1;
YDisplay.DISPLAYTYPE_RGB = 2;
YDisplay.DISPLAYTYPE_INVALID = -1;
YDisplay.LAYERWIDTH_INVALID = yocto_api_js_1.YAPI.INVALID_UINT;
YDisplay.LAYERHEIGHT_INVALID = yocto_api_js_1.YAPI.INVALID_UINT;
YDisplay.LAYERCOUNT_INVALID = yocto_api_js_1.YAPI.INVALID_UINT;
YDisplay.COMMAND_INVALID = yocto_api_js_1.YAPI.INVALID_STRING;
//# sourceMappingURL=yocto_display.js.map