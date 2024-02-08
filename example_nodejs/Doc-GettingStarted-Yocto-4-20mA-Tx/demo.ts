/*********************************************************************
 *
 *  $Id: svn_id $
 *
 *  An example that shows how to use a  Yocto-4-20mA-Tx
 *
 *  You can find more information on our web site:
 *   Yocto-4-20mA-Tx documentation:
 *      https://www.yoctopuce.com/EN/products/yocto-4-20ma-tx/doc.html
 *   TypeScript API Reference:
 *      https://www.yoctopuce.com/EN/doc/reference/yoctolib-typescript-EN.html
 *
 *********************************************************************/

import { YAPI, YErrorMsg, YModule } from 'yoctolib-cjs/yocto_api_nodejs.js';
import { YCurrentLoopOutput } from 'yoctolib-cjs/yocto_currentloopoutput.js'

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
    if(args[0] == 'any') {
        // by default use any connected module suitable for the demo
        let anysensor = YCurrentLoopOutput.FirstCurrentLoopOutput();
        if(anysensor) {
            let module: YModule = await anysensor.get_module();
            target = await module.get_serialNumber();
        } else {
            console.log('No matching sensor connected, check cable !');
            return;
        }
    } else {
        target = args[0];
    }
    console.log('Using device '+target);
    let value: number = parseFloat(args[1]);
    let loop: YCurrentLoopOutput =
        YCurrentLoopOutput.FindCurrentLoopOutput(target + ".currentLoopOutput");
    if (await loop.isOnline()) {
        await loop.set_current(value);
        switch (await loop.get_loopPower()) {
            case YCurrentLoopOutput.LOOPPOWER_POWEROK:
                console.log('Loop is powered');
                break;
            case YCurrentLoopOutput.LOOPPOWER_LOWPWR:
                console.log('Insufficient loop Voltage');
                break;
            default:
                console.log('Loop is not powered');
                break;
        }
    } else {
        console.log("Module not connected (check identification and USB cable)\n");
    }
    await YAPI.FreeAPI();
}

if(process.argv.length < 4) {
    console.log("usage: node demo.js <serial_number> <current>");
    console.log("       node demo.js <logical_name>  <current>");
    console.log("       node demo.js any <current>");
} else {
    startDemo(process.argv.slice(process.argv.length - 2));
}
