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

import { YAPI, YErrorMsg, YModule } from '../../dist/esm/yocto_api_html.js';
import { YTemperature } from '../../dist/esm/yocto_temperature.js'
import { YAltitude } from '../../dist/esm/yocto_altitude.js'
import { YPressure } from '../../dist/esm/yocto_pressure.js'

let module: YModule;
let temp: YTemperature;
let alt: YAltitude;
let pres: YPressure;

function error(msg: string)
{
    document.body.innerHTML = "<h3>Error: "+msg+"</h3>";
}

async function startDemo(): Promise<void>
{
    document.body.innerHTML = 'Trying to contact VirtualHub on local machine...';
    let errmsg = new YErrorMsg();
    if(await YAPI.RegisterHub('127.0.0.1', errmsg) != YAPI.SUCCESS) {
        error('Cannot contact VirtualHub on 127.0.0.1: '+errmsg.msg);
        return;
    }

    // Use first available device
    let anysensor = YAltitude.FirstAltitude();
    if(anysensor) {
        module = await anysensor.module();
    } else {
        error('No matching sensor connected, check cable !');
        await YAPI.FreeAPI();
        return;
    }
    let serial = await module.get_serialNumber();
    temp = YTemperature.FindTemperature(serial+".temperature");
    alt  = YAltitude.FindAltitude(serial+".altitude");
    pres = YPressure.FindPressure(serial+".pressure");

    refresh();
}

async function refresh(): Promise<void>
{
    let html: string = '<h1>Yocto-Altimeter demo</h1>';
    if (await alt.isOnline()) {
        html += 'Using ' + (await module.get_serialNumber()) + ' (' + (await module.get_productName()) + ')<br>';
        html += '- Altitude    : ' + (await alt.get_currentValue()) + (await alt.get_unit()) + '<br>';
        html += '- Temperature : ' + (await temp.get_currentValue()) + (await temp.get_unit()) + '<br>';        
        html += '- Pressure    : ' + (await pres.get_currentValue()) + (await pres.get_unit()) + '<br>';
    } else {
        html += 'Module not connected';
    }
    document.body.innerHTML = html;
    setTimeout(refresh, 500);
}

startDemo();
