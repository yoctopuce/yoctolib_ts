/*********************************************************************
 *
 *  $Id: svn_id $
 *
 *  An example that show how to use a  Yocto-Color-V2
 *
 *  You can find more information on our web site:
 *   Yocto-Color-V2 documentation:
 *      https://www.yoctopuce.com/EN/products/yocto-color-v2/doc.html
 *   TypeScript API Reference:
 *      https://www.yoctopuce.com/EN/doc/reference/yoctolib-typescript-EN.html
 *
 *********************************************************************/

import { YAPI, YErrorMsg, YModule } from 'yoctolib-cjs/yocto_api_nodejs.js';
import { YColorLedCluster } from 'yoctolib-cjs/yocto_colorledcluster.js'

async function startDemo(args: string[]): Promise<void>
{
    await YAPI.LogUnhandledPromiseRejections();

    // Setup the API to use the VirtualHub on local machine
    let errmsg: YErrorMsg = new YErrorMsg();
    if(await YAPI.RegisterHub('127.0.0.1', errmsg) != YAPI.SUCCESS) {
        console.log('Cannot contact VirtualHub on 127.0.0.1: '+errmsg.msg);
        return;
    }

    // Select the relay to use
    let target: string;
    if(args[0] == "any") {
        let anyLed = YColorLedCluster.FirstColorLedCluster();
        if (anyLed == null) {
            console.log("No module connected (check USB cable)\n");
            process.exit(1);
        }
        let module: YModule = await anyLed.get_module();
        target = await module.get_serialNumber();
    } else {
        target = args[0];
    }

    let ledCluster: YColorLedCluster =
        YColorLedCluster.FindColorLedCluster(target+'.colorLedCluster');

    let color: number;
    if (args[1] == "red")
        color = 0xFF0000;
    else if (args[1] == "green")
        color = 0x00FF00;
    else if (args[1] == "blue")
        color = 0x0000FF;
    else
        color = parseInt(args[1],16);

    //configure led cluster
    let nb_leds: number = 62;
    await ledCluster.set_activeLedCount(nb_leds);
    await ledCluster.set_ledType(YColorLedCluster.LEDTYPE_RGB);
    if(await ledCluster.isOnline()) {
        // Change the color in two different ways
        // immediate transition for first half of leds
        await ledCluster.set_rgbColor(0, nb_leds / 2, color);
        // immediate transition for second half of leds
        await ledCluster.rgb_move(nb_leds / 2, nb_leds / 2, color, 2000);
    } else {
        console.log("Module not connected (check identification and USB cable)\n");
    }

    await YAPI.FreeAPI();
}

if(process.argv.length < 4) {
    console.log("usage: node demo.js <serial_number> [ color | rgb ]");
    console.log("       node demo.js <logical_name> [ color | rgb ]");
    console.log("       node demo.js any [ color | rgb ]");
    console.log("Eg.");
    console.log("   node demo.js any FF1493 ");
    console.log("   node demo.js YRGBLED1-123456 red");
} else {
    startDemo(process.argv.slice(process.argv.length - 2));
}

