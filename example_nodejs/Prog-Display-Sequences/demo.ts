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
    let disp: YDisplay = YDisplay.FindDisplay(serial + ".display");

    // retrieve the display size
    let w: number = await disp.get_displayWidth();
    let h: number = await disp.get_displayHeight();

    // reteive the first layer
    let l0: YDisplayLayer = await disp.get_displayLayer(0);
    let count: number = 8;
    let coord: number[] = new Array(2*count);
    // precompute the "leds" position
    let ledwidth: number = (w / count);
    for (let i: number = 0; i < count; i++)
    {
        coord[i] = i *ledwidth;
        coord[2*count-i-2] = coord[i] ;
    }

    let framesCount: number = 2*count-2;

    // clean up
    await disp.resetAll();

    // start recording
    await disp.newSequence();

    // build one loop for recording
    for (let i: number = 0; i < framesCount; i++)
    {
        await l0.selectColorPen(0);
        await l0.drawBar(coord[(i+framesCount-1) % framesCount], h-1,coord[(i+framesCount-1) % framesCount]+ledwidth, h-4);
        await l0.selectColorPen(0xffffff);
        await l0.drawBar(coord[i], h-1, coord[i]+ledwidth, h-4);
        await disp.pauseSequence(50);  // records a 50ms pause.
    }
    // self-call : causes an endless looop
    await disp.playSequence("K2000.seq");

    // stop recording and save to device filesystem
    await disp.saveSequence("K2000.seq");

    // play the sequence
    await disp.playSequence("K2000.seq");

    console.log("This animation in running in background in the device.");
    console.log("It will continue even though this program ends here.")
    await YAPI.FreeAPI();
}

startDemo();
