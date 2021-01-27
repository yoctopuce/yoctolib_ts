/*********************************************************************
 *
 *  $Id: svn_id $
 *
 *  An example that show how to use a  Yocto-MaxiBuzzer
 *
 *  You can find more information on our web site:
 *   Yocto-MaxiBuzzer documentation:
 *      https://www.yoctopuce.com/EN/products/yocto-maxibuzzer/doc.html
 *   TypeScript API Reference:
 *      https://www.yoctopuce.com/EN/doc/reference/yoctolib-typescript-EN.html
 *
 *********************************************************************/

import { YAPI, YErrorMsg, YModule } from 'yoctolib-cjs/yocto_api_nodejs.js';
import { YAnButton } from 'yoctolib-cjs/yocto_anbutton.js'
import { YBuzzer } from 'yoctolib-cjs/yocto_buzzer.js'
import { YColorLed } from 'yoctolib-cjs/yocto_colorled.js'

let buz: YBuzzer;
let led: YColorLed;
let button1: YAnButton;
let button2: YAnButton;

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
    if(serial[8] != '-') {
        // by default use any connected module suitable for the demo
        let buzzer = YBuzzer.FirstBuzzer();
        if(buzzer) {
            let module: YModule = await buzzer.get_module();
            serial = await module.get_serialNumber();
        } else {
            console.log('No matching sensor connected, check cable !');
            await YAPI.FreeAPI();
            return;
        }
    }
    console.log('Using device '+serial);
    buz = YBuzzer.FindBuzzer(serial + ".buzzer");
    led = YColorLed.FindColorLed(serial + ".colorLed");
    button1 = YAnButton.FindAnButton(serial + ".anButton1");
    button2 = YAnButton.FindAnButton(serial + ".anButton2");

    refresh();
}

async function refresh(): Promise<void>
{
    if (await buz.isOnline()) {
        let volume: number;
        let frequency: number;
        let color: number;
        let b1: boolean = (await button1.get_isPressed() == YAnButton.ISPRESSED_TRUE);
        let b2: boolean = (await button2.get_isPressed() == YAnButton.ISPRESSED_TRUE);
        if (b1 || b2) {
            if (b1) {
                volume = 60;
                frequency = 1500;
                color = 0xff0000;
            } else {
                volume = 30;
                color = 0x00ff00;
                frequency = 750;
            }
            await led.resetBlinkSeq();
            await led.addRgbMoveToBlinkSeq(color, 100);
            await led.addRgbMoveToBlinkSeq(0, 100);
            await led.startBlinkSeq();
            await buz.set_volume(volume);
            for (let i: number = 0; i < 5; i++) { // this can be done using sequence as well
                buz.set_frequency(frequency);
                buz.freqMove(2 * frequency, 250);
                await YAPI.Sleep(250);
            }
            await buz.set_frequency(0);
            await led.stopBlinkSeq();
            await led.set_rgbColor(0);
        }
    } else {
        console.log('Module not connected');
    }
    setTimeout(refresh, 250);
}

startDemo();
