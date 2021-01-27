/*********************************************************************
 *
 *  $Id: svn_id $
 *
 *  An example that show how to use a  Yocto-Thermocouple
 *
 *  You can find more information on our web site:
 *   Yocto-Thermocouple documentation:
 *      https://www.yoctopuce.com/EN/products/yocto-thermocouple/doc.html
 *   TypeScript API Reference:
 *      https://www.yoctopuce.com/EN/doc/reference/yoctolib-typescript-EN.html
 *
 *********************************************************************/

import { YAPI, YErrorMsg, YModule } from 'yoctolib-cjs/yocto_api_nodejs.js';
import { YTemperature } from 'yoctolib-cjs/yocto_temperature.js'

let temp1: YTemperature;
let temp2: YTemperature;

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
        let anysensor = YTemperature.FirstTemperature();
        if(anysensor) {
            let module: YModule = await anysensor.get_module();
            serial = await module.get_serialNumber();
        } else {
            console.log('No matching sensor connected, check cable !');
            await YAPI.FreeAPI();
            return;
        }
    }
    console.log('Using device '+serial);
    temp1 = YTemperature.FindTemperature(serial+".temperature1");
    temp2 = YTemperature.FindTemperature(serial+".temperature2");

    refresh();
}

async function refresh(): Promise<void>
{
    if (await temp1.isOnline()) {
        console.log('Temperature 1 : '+(await temp1.get_currentValue())
            + (await temp1.get_unit()));
        console.log('Temperature 2 : '+(await temp2.get_currentValue())
            + (await temp2.get_unit()));
    } else {
        console.log('Module not connected');
    }
    setTimeout(refresh, 500);
}

startDemo();
