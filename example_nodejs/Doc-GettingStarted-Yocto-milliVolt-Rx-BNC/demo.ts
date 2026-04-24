/*********************************************************************
 *
 *  $Id: demo.ts 72913 2026-04-22 09:37:39Z seb $
 *
 *  An example that shows how to use a  Yocto-milliVolt-Rx-BNC
 *
 *  You can find more information on our web site:
 *   Yocto-milliVolt-Rx-BNC documentation:
 *      https://www.yoctopuce.com/EN/products/yocto-millivolt-rx-bnc/doc.html
 *   TypeScript API Reference:
 *      https://www.yoctopuce.com/EN/doc/reference/yoctolib-typescript-EN.html
 *
 *********************************************************************/

import { YAPI, YErrorMsg, YModule } from 'yoctolib-cjs/yocto_api_nodejs.js';
import { YGenericSensor } from 'yoctolib-cjs/yocto_genericsensor.js'

let sensor: YGenericSensor;

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
        let anysensor = YGenericSensor.FirstGenericSensor();
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
    sensor = YGenericSensor.FindGenericSensor(serial+".genericSensor1");
    refresh();
}

async function refresh(): Promise<void>
{
    if (await sensor.isOnline()) {
        console.log('Input: '+(await sensor.get_currentValue())
            + (await sensor.get_unit()));
    } else {
        console.log('Module not connected');
    }
    setTimeout(refresh, 500);
}

startDemo();
