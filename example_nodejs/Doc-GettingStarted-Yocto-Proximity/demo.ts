/*********************************************************************
 *
 *  $Id: svn_id $
 *
 *  An example that shows how to use a  Yocto-Proximity
 *
 *  You can find more information on our web site:
 *   Yocto-Proximity documentation:
 *      https://www.yoctopuce.com/EN/products/yocto-proximity/doc.html
 *   TypeScript API Reference:
 *      https://www.yoctopuce.com/EN/doc/reference/yoctolib-typescript-EN.html
 *
 *********************************************************************/

import { YAPI, YErrorMsg, YModule } from 'yoctolib-cjs/yocto_api_nodejs.js';
import { YProximity } from 'yoctolib-cjs/yocto_proximity.js'
import { YLightSensor } from 'yoctolib-cjs/yocto_lightsensor.js'

let proximity: YProximity;
let amb_light: YLightSensor;
let ir_light: YLightSensor;

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
        let anysensor = YProximity.FirstProximity();
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
    proximity = YProximity.FindProximity(serial + ".proximity1");
    amb_light = YLightSensor.FindLightSensor(serial + ".lightSensor1");
    ir_light = YLightSensor.FindLightSensor(serial + ".lightSensor2");

    refresh();
}

async function refresh(): Promise<void>
{
    if (await proximity.isOnline()) {
        console.log('Proximity: ' + (await proximity.get_currentValue()) +
            " Ambient: " + (await amb_light.get_currentValue()) +
            " IR: " + (await ir_light.get_currentValue())
        );
    } else {
        console.log('Module not connected');
    }
    setTimeout(refresh, 500);
}

startDemo();
