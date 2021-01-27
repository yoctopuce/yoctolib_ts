/*********************************************************************
 *
 *  $Id: svn_id $
 *
 *  An example that show how to use a  Yocto-Demo
 *
 *  You can find more information on our web site:
 *   Yocto-Demo documentation:
 *      https://www.yoctopuce.com/EN/products/yocto-demo/doc.html
 *   TypeScript API Reference:
 *      https://www.yoctopuce.com/EN/doc/reference/yoctolib-typescript-EN.html
 *
 *********************************************************************/

import { YAPI, YErrorMsg, YModule } from 'yoctolib-cjs/yocto_api_nodejs.js';
import { YLed } from 'yoctolib-cjs/yocto_led.js'

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
        let anyLed = YLed.FirstLed();
        if (anyLed == null) {
            console.log("No module connected (check USB cable)\n");
            process.exit(1);
        }
        let module: YModule = await anyLed.get_module();
        target = await module.get_serialNumber();
    } else {
        target = args[0];
    }

    // Switch relay as requested
    console.log("Turn LED " + args[1]);
    let led: YLed = YLed.FindLed(target + ".led");
    if(await led.isOnline()) {
        await led.set_power(args[1] == "ON" ? YLed.POWER_ON : YLed.POWER_OFF);
    } else {
        console.log("Module not connected (check identification and USB cable)\n");
    }

    await YAPI.FreeAPI();
}

if(process.argv.length < 4) {
    console.log("usage: node demo.js <serial_number> [ ON | OFF ]");
    console.log("       node demo.js <logical_name> [ ON | OFF ]");
    console.log("       node demo.js any [ ON | OFF ]");
} else {
    startDemo(process.argv.slice(process.argv.length - 2));
}

