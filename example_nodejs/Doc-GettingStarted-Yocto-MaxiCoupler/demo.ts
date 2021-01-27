/*********************************************************************
 *
 *  $Id: svn_id $
 *
 *  An example that show how to use a  Yocto-MaxiCoupler
 *
 *  You can find more information on our web site:
 *   Yocto-MaxiCoupler documentation:
 *      https://www.yoctopuce.com/EN/products/yocto-maxicoupler/doc.html
 *   TypeScript API Reference:
 *      https://www.yoctopuce.com/EN/doc/reference/yoctolib-typescript-EN.html
 *
 *********************************************************************/

import { YAPI, YErrorMsg, YModule } from 'yoctolib-cjs/yocto_api_nodejs.js';
import { YRelay } from 'yoctolib-cjs/yocto_relay.js'

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
        let anyrelay = YRelay.FirstRelay();
        if (anyrelay == null) {
            console.log("No module connected (check USB cable)\n");
            process.exit(1);
        }
        let module: YModule = await anyrelay.get_module();
        target = await module.get_serialNumber();
    } else {
        target = args[0];
    }

    // Switch relay as requested
    console.log("Set ouput " + args[1] + " of " + target + " to " + args[2]);
    let relay: YRelay = YRelay.FindRelay(target + ".relay" + args[1]);
    if(await relay.isOnline()) {
        await relay.set_output(args[2] == "ON" ? YRelay.OUTPUT_ON : YRelay.OUTPUT_OFF);
    } else {
        console.log("Module not connected (check identification and USB cable)\n");
    }

    await YAPI.FreeAPI();
}

if(process.argv.length < 5) {
    console.log("usage: node demo.js <serial_number> <channel> [ ON | OFF ]");
    console.log("       node demo.js <logical_name> <channel> [ ON | OFF ]");
    console.log("       node demo.js any <channel> [ ON | OFF ]");
} else {
    startDemo(process.argv.slice(process.argv.length - 3));
}

