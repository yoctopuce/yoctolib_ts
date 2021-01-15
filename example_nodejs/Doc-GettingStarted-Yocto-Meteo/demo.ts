/*********************************************************************
 *
 *  $Id: app.ts 32624 2018-10-10 13:23:29Z seb $
 *
 *  Yoctopuce TypeScript library example
 *
 *  You can find more information on our web site:
 *   EcmaScript API Reference:
 *      https://www.yoctopuce.com/EN/doc/reference/yoctolib-ecmascript-EN.html
 *
 *********************************************************************/

import { YAPI, YErrorMsg, YModule } from 'yoctolib-ts/dist/cjs/yocto_api_nodejs.js';
import { YTemperature } from 'yoctolib-ts/dist/cjs/yocto_temperature.js'
import { YHumidity } from 'yoctolib-ts/dist/cjs/yocto_humidity.js'
import { YPressure } from 'yoctolib-ts/dist/cjs/yocto_pressure.js'

let temp: YTemperature;
let hum: YHumidity;
let pres: YPressure;

async function startDemo(): Promise<void>
{
    await YAPI.LogUnhandledPromiseRejections();
    await YAPI.DisableExceptions();

    // Setup the API to use the VirtualHub on local machine
    let errmsg = new YErrorMsg();
    if(await YAPI.RegisterHub('127.0.0.1', errmsg) != YAPI.SUCCESS) {
        console.log('Cannot contact VirtualHub on 127.0.0.1: '+errmsg.msg);
        return;
    }

    // Select specified device, or use first available one
    let serial: string = process.argv[process.argv.length-1];
    if(serial[8] != '-') {
        // by default use any connected module suitable for the demo
        let anysensor = YHumidity.FirstHumidity();
        if(anysensor) {
            let module: YModule = await anysensor.module();
            serial = await module.get_serialNumber();
        } else {
            console.log('No matching sensor connected, check cable !');
            await YAPI.FreeAPI();
            return;
        }
    }
    console.log('Using device '+serial);
    temp = YTemperature.FindTemperature(serial+".temperature");
    hum  = YHumidity.FindHumidity(serial+".humidity");
    pres = YPressure.FindPressure(serial+".pressure");

    refresh();
}

async function refresh(): Promise<void>
{
    if (await hum.isOnline()) {
        console.log('Temperature : '+(await temp.get_currentValue()) + (await temp.get_unit()));
        console.log('Humidity    : '+(await hum.get_currentValue()) + (await hum.get_unit()));
        console.log('Pressure    : '+(await pres.get_currentValue()) + (await pres.get_unit()));
    } else {
        console.log('Module not connected');
    }
    setTimeout(refresh, 500);
}

startDemo();
