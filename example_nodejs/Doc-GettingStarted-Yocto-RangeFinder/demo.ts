/*********************************************************************
 *
 *  $Id: svn_id $
 *
 *  An example that shows how to use a  Yocto-RangeFinder
 *
 *  You can find more information on our web site:
 *   Yocto-RangeFinder documentation:
 *      https://www.yoctopuce.com/EN/products/yocto-rangefinder/doc.html
 *   TypeScript API Reference:
 *      https://www.yoctopuce.com/EN/doc/reference/yoctolib-typescript-EN.html
 *
 *********************************************************************/

import { YAPI, YErrorMsg, YModule } from 'yoctolib-cjs/yocto_api_nodejs.js';
import { YRangeFinder } from 'yoctolib-cjs/yocto_rangefinder.js'
import { YLightSensor } from 'yoctolib-cjs/yocto_lightsensor.js'
import { YTemperature } from 'yoctolib-cjs/yocto_temperature.js'

let rf: YRangeFinder;
let ir: YLightSensor;
let tmp: YTemperature;

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
    if (serial[8] != '-') {
        // by default use any connected module suitable for the demo
        let anysensor = YRangeFinder.FirstRangeFinder();
        if (anysensor) {
            let module: YModule = await anysensor.get_module();
            serial = await module.get_serialNumber();
        } else {
            console.log('No matching sensor connected, check cable !');
            await YAPI.FreeAPI();
            return;
        }
    }
    console.log('Using device ' + serial + " " + await YAPI.GetAPIVersion());
    rf = YRangeFinder.FindRangeFinder(serial + ".rangeFinder1");
    ir = YLightSensor.FindLightSensor(serial + ".lightSensor1");
    tmp = YTemperature.FindTemperature(serial + ".temperature1");

    refresh();
}

async function refresh(): Promise<void>
{
    if (await rf.isOnline()) {
        console.log(" Distance    : " + (await rf.get_currentValue()) +
            " Ambient IR  : " + (await ir.get_currentValue()) +
            " Temperature : " + (await tmp.get_currentValue())
        );
    } else {
        console.log('Module not connected');
    }
    setTimeout(refresh, 500);
}

startDemo();
