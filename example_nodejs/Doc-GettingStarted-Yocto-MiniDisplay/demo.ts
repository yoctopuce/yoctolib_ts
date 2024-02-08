/*********************************************************************
 *
 *  $Id: svn_id $
 *
 *  An example that shows how to use a  Yocto-MaxiDisplay
 *
 *  You can find more information on our web site:
 *   Yocto-MaxiDisplay documentation:
 *      https://www.yoctopuce.com/EN/products/yocto-maxidisplay/doc.html
 *   TypeScript API Reference:
 *      https://www.yoctopuce.com/EN/doc/reference/yoctolib-typescript-EN.html
 *
 *********************************************************************/

import { YAPI, YErrorMsg, YModule } from 'yoctolib-cjs/yocto_api_nodejs.js';
import { YDisplay, YDisplayLayer } from 'yoctolib-cjs/yocto_display.js'

let disp: YDisplay;
let l1: YDisplayLayer;
let h: number;
let w: number;
let y: number;
let x: number;
let vx: number;
let vy: number;

async function startDemo(): Promise<void>
{
    await YAPI.LogUnhandledPromiseRejections();

    // Setup the API to use the VirtualHub on local machine
    let errmsg: YErrorMsg = new YErrorMsg();
    if(await YAPI.RegisterHub('127.0.0.1', errmsg) != YAPI.SUCCESS) {
        console.log('Cannot contact VirtualHub on 127.0.0.1: '+errmsg.msg);
        return;
    }

    // Select specified device, or use first available one
    let serial: string = process.argv[process.argv.length-1];
    if (serial[8] != '-') {
        // by default use any connected module suitable for the demo
        let anydisplay = YDisplay.FirstDisplay();
        if (anydisplay) {
            let module: YModule = await anydisplay.get_module();
            serial = await module.get_serialNumber();
        } else {
            console.log('No matching device connected, check cable !');
            await YAPI.FreeAPI();
            return;
        }
    }
    console.log('Using device ' + serial);
    disp = YDisplay.FindDisplay(serial + ".display");

    //clean up
    await disp.resetAll();

    // retreive the display size
    w = await disp.get_displayWidth();
    h = await disp.get_displayHeight();

    // reteive the first layer
    let l0 = await disp.get_displayLayer(0);
    // display a text in the middle of the screen
    await l0.drawText(w / 2, h / 2, YDisplayLayer.ALIGN_CENTER , "Hello world!");

    // visualize each corner
    await l0.moveTo(0, 5);
    await l0.lineTo(0, 0);
    await l0.lineTo(5, 0);
    await l0.moveTo(0, h - 6);
    await l0.lineTo(0, h - 1);
    await l0.lineTo(5, h - 1);
    await l0.moveTo(w - 1, h - 6);
    await l0.lineTo(w - 1, h - 1);
    await l0.lineTo(w - 6, h - 1);
    await l0.moveTo(w - 1, 5);
    await l0.lineTo(w - 1, 0);
    await l0.lineTo(w - 6, 0);

    // draw a circle in the top left corner of layer 1
    l1 = await disp.get_displayLayer(1);
    await l1.clear();
    await l1.drawCircle(h / 8, h / 8, h / 8);

    // and animate the layer
    console.log("Use Ctrl-C to stop");
    x = 0;
    y = 0;
    vx = 1;
    vy = 1;
    refresh();
}

async function refresh(): Promise<void>
{
    if (await disp.isOnline()) {
        x += vx;
        y += vy;
        if ((x < 0) || (x > w - (h / 4))) vx = -vx;
        if ((y < 0) || (y > h - (h / 4))) vy = -vy;
        await l1.setLayerPosition(x, y, 0);
    } else {
        console.log('Module not connected');
    }
    setTimeout(refresh, 5);
}

startDemo();
