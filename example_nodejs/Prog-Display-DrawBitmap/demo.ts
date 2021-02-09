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
let lastSerial: string = '';
let h: number = 0;
let w: number = 0;
let l0: YDisplayLayer;
let max_iteration: number = 50;
let targetX: number = 0.834555980181972;
let targetY: number = 0.204552998862566;
let bytesPerLines: number = 0;
let zoom: number = 1;
let distance: number = 1;
let data: Uint8Array = new Uint8Array();

async function startDemo(): Promise<void>
{
    await YAPI.LogUnhandledPromiseRejections();

    // Setup the API to use the VirtualHub on local machine
    let errmsg: YErrorMsg = new YErrorMsg();
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

    // clean up
    await disp.resetAll();

    // retrieve the display size
    w = await disp.get_displayWidth();
    h = await disp.get_displayHeight();

    // retrieve the first layer
    l0 = await disp.get_displayLayer(0);
    bytesPerLines = (w / 8) >> 0;
    // display clean up
    await disp.resetAll();
    data = new Uint8Array(h*bytesPerLines);
    setTimeout(refresh, 20);
}

async function refresh(): Promise<void>
{
    data.fill(0);
    distance = distance *0.95;
    let centerX =  targetX * (1-distance);
    let centerY =  targetY * (1-distance);
    max_iteration = (0.5+max_iteration  + Math.sqrt(zoom)) >> 0;
    if (max_iteration>1500)  max_iteration = 1500;
    for (let j: number = 0;j < h; j++) {
        for(let i: number = 0 ;i < w; i++) {
            let x0: number = (((i - w/2.0) / (w/8))/zoom)-centerX;
            let y0: number = (((j - h/2.0) / (w/8))/zoom)-centerY;
            let x: number = 0;
            let y: number = 0;
            let iteration: number = 0;
            while ( (x*x + y*y < 4)  && (iteration < max_iteration ))
            {
                let xtemp: number = x*x - y*y + x0;
                y = 2*x*y + y0;
                x = xtemp;
                iteration += 1;
            }
            if (iteration>=max_iteration) {
                data[j * bytesPerLines + (i >> 3)] |= (128 >> (i & 7));
            }
        }
    }
    await l0.drawBitmap(0,0,w,data,0);
    zoom = zoom / 0.95;
    setTimeout(refresh, 5);
}

startDemo();
