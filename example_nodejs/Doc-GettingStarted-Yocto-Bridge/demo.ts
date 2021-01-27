/*********************************************************************
 *
 *  $Id: svn_id $
 *
 *  An example that show how to use a  Yocto-Bridge
 *
 *  You can find more information on our web site:
 *   Yocto-Bridge documentation:
 *      https://www.yoctopuce.com/EN/products/yocto-bridge/doc.html
 *   TypeScript API Reference:
 *      https://www.yoctopuce.com/EN/doc/reference/yoctolib-typescript-EN.html
 *
 *********************************************************************/

import { YAPI, YErrorMsg, YModule } from 'yoctolib-cjs/yocto_api_nodejs.js';
import { YWeighScale } from 'yoctolib-cjs/yocto_weighscale.js'

let sensor: YWeighScale;

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
        let anysensor = YWeighScale.FirstWeighScale();
        if(anysensor) {
            let module = await anysensor.get_module();
            serial = await module.get_serialNumber();
        } else {
            console.log('No matching sensor connected, check cable !');
            await YAPI.FreeAPI();
            return;
        }
    }
    console.log('Using device '+serial);
    sensor = YWeighScale.FindWeighScale(serial+".weighScale1");

    if (await sensor.isOnline()) {
        // On startup, enable excitation and tare weigh scale
        console.log('Resetting tare weight...');
        await sensor.set_excitation(YWeighScale.EXCITATION_AC);
        await YAPI.Sleep(3000);
        await sensor.tare();
    }

    refresh();
}

async function refresh(): Promise<void>
{
    if (await sensor.isOnline()) {
        console.log('Weight : '+(await sensor.get_currentValue())
            + (await sensor.get_unit()));
    } else {
        console.log('Module not connected');
    }
    setTimeout(refresh, 500);
}

startDemo();
