/*********************************************************************
 *
 *  $Id: svn_id $
 *
 *  An example that shows how to use a  Yocto-Servo
 *
 *  You can find more information on our web site:
 *   Yocto-Servo documentation:
 *      https://www.yoctopuce.com/EN/products/yocto-servo/doc.html
 *   TypeScript API Reference:
 *      https://www.yoctopuce.com/EN/doc/reference/yoctolib-typescript-EN.html
 *
 *********************************************************************/

import { YAPI, YErrorMsg, YModule } from 'yoctolib-cjs/yocto_api_nodejs.js';
import { YServo } from 'yoctolib-cjs/yocto_servo.js'

async function startDemo(args: string[]): Promise<void>
{
    await YAPI.LogUnhandledPromiseRejections();

    // Setup the API to use the VirtualHub on local machine
    let errmsg: YErrorMsg = new YErrorMsg();
    if(await YAPI.RegisterHub('127.0.0.1', errmsg) != YAPI.SUCCESS) {
        console.log('Cannot contact VirtualHub on 127.0.0.1: '+errmsg.msg);
        return;
    }

    // Select the module to use
    let target: string;
    if(args[0] == "any") {
        let anyServo = YServo.FirstServo();
        if (anyServo == null) {
            console.log("No module connected (check USB cable)\n");
            await YAPI.FreeAPI();
            return;
        }
        let module: YModule = await anyServo.get_module();
        target = await module.get_serialNumber();
    } else {
        target = args[0];
    }

    let servo1 = YServo.FindServo(target+'.servo1');
    let servo5 = YServo.FindServo(target+'.servo5');

    if(await servo1.isOnline()) {
        // Change the position in two different ways
        let position: number = parseInt(args[1]);
        servo1.set_position(position);   // immediate switch
        servo5.move(position,1000);      // smooth transition
    } else {
        console.log("Module not connected (check identification and USB cable)\n");
    }

    await YAPI.FreeAPI();
}

if(process.argv.length < 4) {
    console.log("usage: node demo.js <serial_number> [ -1000 | ... | 1000 ]");
    console.log("       node demo.js <logical_name> [ -1000 | ... | 1000 ]");
    console.log("       node demo.js any [ -1000 | ... | 1000 ]   (use any discovered device)");
} else {
    startDemo(process.argv.slice(process.argv.length - 2));
}

