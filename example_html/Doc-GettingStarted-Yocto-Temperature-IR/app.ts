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
let IR: YTemperature;
let Amb: YTemperature;

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

    Amb = YTemperature.FindTemperature(serial+".temperature1");
    IR  = YTemperature.FindTemperature(serial+".temperature2");

    refresh();
}

async function refresh(): Promise<void>
{
    let html: string = '<h1>Yocto-Temperature-IR demo</h1>';
    if (await IR.isOnline()) {
        html += 'Using ' + (await module.get_serialNumber()) + ' (' + (await module.get_productName()) + ')<br>';
        html += '- IR : ' + (await IR.get_currentValue()) + (await IR.get_unit()) + '<br>';
        html += '- Ambiant    : ' + (await Amb.get_currentValue()) + (await Amb.get_unit()) + '<br>';
    } else {
        html += 'Module not connected';
    }
    document.body.innerHTML = html;
    setTimeout(refresh, 500);
}

startDemo();
