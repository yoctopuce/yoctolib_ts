/*********************************************************************
 *
 *  $Id: svn_id $
 *
 *  An example that show how to use a  Yocto-PowerColor
 *
 *  You can find more information on our web site:
 *   Yocto-PowerColor documentation:
 *      https://www.yoctopuce.com/EN/products/yocto-powercolor/doc.html
 *   TypeScript API Reference:
 *      https://www.yoctopuce.com/EN/doc/reference/yoctolib-typescript-EN.html
 *
 *********************************************************************/

import { YAPI, YErrorMsg, YModule } from 'yoctolib-cjs/yocto_api_nodejs.js';
import { YColorLed } from 'yoctolib-cjs/yocto_colorled.js'

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
        let anyLed = YColorLed.FirstColorLed();
        if (anyLed == null) {
            console.log("No module connected (check USB cable)\n");
            await YAPI.FreeAPI();
            return;
        }
        let module: YModule = await anyLed.get_module();
        target = await module.get_serialNumber();
    } else {
        target = args[0];
    }

    let led1: YColorLed = YColorLed.FindColorLed(target+'.colorLed1');
    let color: number;
    if (args[1] == "red")
        color = 0xFF0000;
    else if (args[1] == "green")
        color = 0x00FF00;
    else if (args[1] == "blue")
        color = 0x0000FF;
    else
        color = parseInt(args[1],16);

    if(await led1.isOnline()) {
        led1.rgbMove(color,1000);  // smooth transition
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

