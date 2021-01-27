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

let module: YModule;
let t1 : YTemperature;
let t2 : YTemperature;
let t3 : YTemperature;
let t4 : YTemperature;
let t5 : YTemperature;
let t6 : YTemperature;



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
    let anysensor = YTemperature.FirstTemperature();
    if(anysensor) {
        module = await anysensor.module();
    } else {
        error('No matching sensor connected, check cable !');
        await YAPI.FreeAPI();
        return;
    }
    let serial = await module.get_serialNumber();

    t1  = YTemperature.FindTemperature(serial+".temperature1");
    // by default the Yocto-MaxiThermistor reports resistance
    // lets configure channel 1 to report temperature
    t1.set_sensorType(YTemperature.SENSORTYPE_RES_NTC);
    t1.set_ntcParameters(10000, 3380) // parameter for suplied  NCFT15X103

    t2  = YTemperature.FindTemperature(serial+".temperature2");
    t3  = YTemperature.FindTemperature(serial+".temperature3");
    t4  = YTemperature.FindTemperature(serial+".temperature4");
    t5  = YTemperature.FindTemperature(serial+".temperature5");
    t6  = YTemperature.FindTemperature(serial+".temperature6");

    refresh();
}

async function refresh(): Promise<void>
{
    let html: string = '<h1>Yocto-MaxiThermistor demo</h1>';
    if (await t1.isOnline()) {
        html += 'Using ' + (await module.get_serialNumber()) + ' (' + (await module.get_productName()) + ')<br>';
        html += '- Temp 1 : ' + (await t1.get_currentValue()) + (await t1.get_unit()) + '<br>';
        html += '- Temp 2 : ' + (await t2.get_currentValue()) + (await t2.get_unit()) + '<br>';
        html += '- Temp 3 : ' + (await t3.get_currentValue()) + (await t3.get_unit()) + '<br>';
        html += '- Temp 4 : ' + (await t4.get_currentValue()) + (await t4.get_unit()) + '<br>';
        html += '- Temp 5 : ' + (await t5.get_currentValue()) + (await t5.get_unit()) + '<br>';
        html += '- Temp 6 : ' + (await t6.get_currentValue()) + (await t6.get_unit()) + '<br>';

    } else {
        html += 'Module not connected';
    }
    document.body.innerHTML = html;
    setTimeout(refresh, 500);
}

startDemo();
