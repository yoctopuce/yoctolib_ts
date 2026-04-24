/*********************************************************************
 *
 *  $Id: demo.ts 72964 2026-04-24 09:29:46Z seb $
 *
 *  An example that shows how to use a  Yocto-Spectral
 *
 *  You can find more information on our web site:
 *   Yocto-Spectral documentation:
 *      https://www.yoctopuce.com/EN/products/yocto-spectral/doc.html
 *   TypeScript API Reference:
 *      https://www.yoctopuce.com/EN/doc/reference/yoctolib-typescript-EN.html
 *
 *********************************************************************/

import { YAPI, YErrorMsg } from 'yoctolib-cjs/yocto_api_nodejs.js';
import {  YColorSensor } from 'yoctolib-cjs/yocto_colorsensor.js'

var colorSensor: YColorSensor;


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
        let anysensor = YColorSensor.FirstColorSensor();
        if(anysensor) {
            let module = await anysensor.get_module();
            serial = await module.get_serialNumber();
        } else {
            console.log('No matching sensor connected, check cable !');
            await YAPI.FreeAPI();
            return;
        }
    }
    console.log('Using device ' + serial);
    colorSensor = YColorSensor.FindColorSensor(serial + ".colorSensor");
    refresh();
}

async function refresh(): Promise<void>
{
    if (await colorSensor.isOnline()) {
        await colorSensor.set_workingMode(YColorSensor.WORKINGMODE_AUTO);
        await colorSensor.set_estimationModel(YColorSensor.ESTIMATIONMODEL_REFLECTION);
        let hex = await colorSensor.get_estimatedRGB();
        console.log("Near color : " + await colorSensor.get_nearSimpleColor());
        console.log("RGB Hex : " + hex.toString(16));
        console.log("--------------------------------------------");
    } else {
        console.log('Module not connected');
    }
    setTimeout(refresh, 500);
}

startDemo();
