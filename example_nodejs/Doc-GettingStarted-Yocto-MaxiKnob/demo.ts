/*********************************************************************
 *
 *  $Id: svn_id $
 *
 *  An example that shows how to use a  Yocto-MaxiKnob
 *
 *  You can find more information on our web site:
 *   Yocto-MaxiKnob documentation:
 *      https://www.yoctopuce.com/EN/products/yocto-maxiknob/doc.html
 *   TypeScript API Reference:
 *      https://www.yoctopuce.com/EN/doc/reference/yoctolib-typescript-EN.html
 *
 *********************************************************************/

import { YAPI, YErrorMsg, YModule } from 'yoctolib-cjs/yocto_api_nodejs.js';
import { YBuzzer } from "yoctolib-cjs/yocto_buzzer.js"
import { YColorLedCluster } from "yoctolib-cjs/yocto_colorledcluster.js"
import { YAnButton } from "yoctolib-cjs/yocto_anbutton.js"
import { YQuadratureDecoder } from "yoctolib-cjs/yocto_quadraturedecoder.js"

var lastPos: number = 0;
var buz: YBuzzer;
var leds: YColorLedCluster;
var button: YAnButton;
var qd: YQuadratureDecoder;

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
            let module = await buzzer.module();
            serial = await module.get_serialNumber();
        } else {
            console.log('No matching sensor connected, check cable !');
            return;
        }
    }
    console.log('Using device '+serial);
    buz = YBuzzer.FindBuzzer(serial + ".buzzer");
    leds = YColorLedCluster.FindColorLedCluster(serial + ".colorLedCluster");
    button = YAnButton.FindAnButton(serial + ".anButton1");
    qd = YQuadratureDecoder.FindQuadratureDecoder(serial + ".quadratureDecoder1");
    lastPos = await qd.get_currentValue() >> 0;
    await buz.set_volume(75);
    if  (!await button.isOnline() || !await qd.isOnline()) {
        console.log("Make sure the Yocto-MaxiKnob is configured with at least on AnButton and  one QuadratureDecoder");
        return;
    }
    console.log("press button #1 or turn encoder #1 or hit Ctrl-C");

    refresh();
}

function notefreq(note: number)
{
    return 220.0 * Math.exp(note * Math.log(2) / 12);
}

async function refresh(): Promise<void>
{
    if (await button.get_isPressed() == YAnButton.ISPRESSED_TRUE) {
        lastPos = 0;
        await qd.set_currentValue(0);
        await buz.playNotes("'E32 C8");
        await leds.set_rgbColor(0, 1, 0x000000);
    } else {
        let p: number = await qd.get_currentValue() >> 0;
        if (lastPos != p) {
            lastPos = p;
            await buz.pulse(notefreq(p), 100);
            await leds.set_hslColor(0, 1, 0x00FF7f | (p % 255) << 16);
        }
    }
    setTimeout(refresh, 10);
}

startDemo();
