/*********************************************************************
 *
 *  $Id: app.ts 32624 2018-10-10 13:23:29Z seb $
 *
 *  Yoctopuce TypeScript library example
 *
 *  You can find more information on our web site:
 *   EcmaScript API Reference:
 *      https://www.yoctopuce.com/EN/doc/reference/yoctolib-ecmascript-EN.html
 *
 *********************************************************************/

import { YAPI, YErrorMsg, YModule, YFunction, YSensor, YMeasure } from 'yoctolib-cjs/yocto_api_nodejs.js';
import { YDisplay, YDisplayLayer } from 'yoctolib-cjs/yocto_display.js';

let disp: YDisplay | null = null;
let l1: YDisplayLayer;
let l2: YDisplayLayer;
let centerX: number;
let centerY: number;
let a: number;
let radius: number;

async function startDemo(): Promise<void>
{
    await YAPI.LogUnhandledPromiseRejections();

    // Setup the API to use the VirtualHub on local machine
    let errmsg = new YErrorMsg();
    if (await YAPI.RegisterHub('127.0.0.1', errmsg) !== YAPI.SUCCESS) {
        console.log('Cannot contact VirtualHub on 127.0.0.1: ' + errmsg.msg);
        return;
    }

    // Select specified device, or use first available one
    let serial: string = process.argv[process.argv.length - 1];
    if (serial[8] !== '-') {
        // by default use any connected module suitable for the demo
        let anydisplay: YDisplay | null = YDisplay.FirstDisplay();
        if (anydisplay) {
            let module = await anydisplay.module();
            serial = await module.get_serialNumber();
        } else {
            console.log('No display connected, check cable !');
            await YAPI.FreeAPI();
            return;
        }
    }
    console.log('Using device ' + serial);
    disp = YDisplay.FindDisplay(serial + ".display");

    //clean up
    await disp.resetAll();

    // retreive the display size
    l1 = await disp.get_displayLayer(1);
    l2 = await disp.get_displayLayer(2);
    centerX = await disp.get_displayWidth() / 2;
    centerY = await disp.get_displayHeight() / 2;
    radius  = await disp.get_displayHeight() / 2;
    a = 0.0;

    // display clean up
    await disp.resetAll();
    await l1.hide();    // L1 is hidden, l2 stay visible
    setTimeout(refresh, 20);
}

// this is the recusive function to draw 1/3nd of the Von Koch flake
async function recursiveLine(layer: YDisplayLayer, x0: number, y0: number, x1: number, y1: number, depth: number): Promise<void>
{
    if (depth<=0) {
        await layer.moveTo((x0+0.5) >> 0,(y0+0.5) >> 0);
        await layer.lineTo((x1+0.5) >> 0,(y1+0.5) >> 0);
    } else {
        let dx: number = (x1-x0) /3;
        let dy: number = (y1-y0) /3;
        let mx: number = ((x0+x1) / 2) + (0.87 *(y1-y0) / 3);
        let my: number = ((y0+y1) / 2) - (0.87 *(x1-x0) / 3);
        await recursiveLine(layer,x0,y0,x0+dx,y0+dy,depth-1);
        await recursiveLine(layer,x0+dx,y0+dy,mx,my,depth-1);
        await recursiveLine(layer,mx,my,x1-dx,y1-dy,depth-1);
        await recursiveLine(layer,x1-dx,y1-dy,x1,y1,depth-1);
    }
}

async function refresh(): Promise<void>
{
    // we draw in the hidden layer
    await l1.clear();
    for (let i: number = 0; i < 3; i++) {
        await recursiveLine(l1, centerX + radius * Math.cos(a + i * 2.094),
            centerY + radius * Math.sin(a + i * 2.094),
            centerX + radius * Math.cos(a + (i + 1) * 2.094),
            centerY + radius * Math.sin(a + (i + 1) * 2.094), 2);
    }
    // then we swap contents with the visible layer
    await (<YDisplay>disp).swapLayerContent(1,2);
    // change the flake angle
    a += 0.1257;
    setTimeout(refresh, 5);
}

startDemo();
