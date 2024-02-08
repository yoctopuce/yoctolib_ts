/*********************************************************************
 *
 *  $Id: svn_id $
 *
 *  An example that shows how to use a  Yocto-0-10V-Tx
 *
 *  You can find more information on our web site:
 *   Yocto-0-10V-Tx documentation:
 *      https://www.yoctopuce.com/EN/products/yocto-0-10v-tx/doc.html
 *   TypeScript API Reference:
 *      https://www.yoctopuce.com/EN/doc/reference/yoctolib-typescript-EN.html
 *
 *********************************************************************/

import { YAPI, YErrorMsg, YModule } from 'yoctolib-cjs/yocto_api_nodejs.js';
import { YVoltageOutput } from 'yoctolib-cjs/yocto_voltageoutput.js'

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
        let anyOut = YVoltageOutput.FirstVoltageOutput();
        if (anyOut == null) {
            console.log("No module connected (check USB cable)\n");
            process.exit(1);
        }
        let module: YModule = await anyOut.get_module();
        target = await module.get_serialNumber();
    } else {
        target = args[0];
    }
    let voltage: number = parseFloat(args[1]);
    let vout1: YVoltageOutput = YVoltageOutput.FindVoltageOutput(target+'.voltageOutput1');
    let vout2: YVoltageOutput = YVoltageOutput.FindVoltageOutput(target+'.voltageOutput2');

    if(await vout1.isOnline()) {
        // output 1 : immediate change
        await vout1.set_currentVoltage(voltage);
        // output 2 : smooth change
        await vout2.voltageMove(voltage,3000);
    } else {
        console.log("Module not connected (check identification and USB cable)\n");
    }

    await YAPI.FreeAPI();
}

if(process.argv.length < 4) {
    console.log("usage: node demo.js <serial_number> <voltage>");
    console.log("       node demo.js <logical_name>  <voltage>");
    console.log("       node demo.js any <voltage>    (use any discovered device)");
    console.log("       <voltage>: floating point number between 0.0 and 10.000");
} else {
    startDemo(process.argv.slice(process.argv.length - 2));
}

