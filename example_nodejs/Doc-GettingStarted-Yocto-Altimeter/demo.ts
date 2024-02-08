/*********************************************************************
 *
 *  $Id: svn_id $
 *
 *  An example that shows how to use a  Yocto-Altimeter
 *
 *  You can find more information on our web site:
 *   Yocto-Altimeter documentation:
 *      https://www.yoctopuce.com/EN/products/yocto-altimeter/doc.html
 *   TypeScript API Reference:
 *      https://www.yoctopuce.com/EN/doc/reference/yoctolib-typescript-EN.html
 *
 *********************************************************************/

import { YAPI, YErrorMsg, YModule } from 'yoctolib-cjs/yocto_api_nodejs.js';
import { YAltitude } from 'yoctolib-cjs/yocto_altitude.js'
import { YTemperature } from 'yoctolib-cjs/yocto_temperature.js'
import { YPressure } from 'yoctolib-cjs/yocto_pressure.js'

let alti: YAltitude;
let temp: YTemperature;
let pres: YPressure;

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
        let anysensor = YAltitude.FirstAltitude();
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
    alti = YAltitude.FindAltitude(serial+".altitude");
    temp = YTemperature.FindTemperature(serial+".temperature");
    pres = YPressure.FindPressure(serial+".pressure");
    refresh();
}

async function refresh(): Promise<void>
{
    if (await alti.isOnline()) {
        console.log('Altitude    : '+(await alti.get_currentValue()) + ' m ' +
                    '(QNH = '+(await alti.get_qnh())+' hPa)');
        console.log('Temperature : '+(await temp.get_currentValue()) + ' °C');
        console.log('Pressure    : '+(await pres.get_currentValue()) + ' hPa');
    } else {
        console.log('Module not connected');
    }
    setTimeout(refresh, 500);
}

startDemo();
