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
import { YGenericSensor } from '../../dist/esm/yocto_genericSensor.js'

let module: YModule;
let sens1: YGenericSensor;
let sens2: YGenericSensor;
let sens3: YGenericSensor;
let sens4: YGenericSensor;

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
    let anySensor = YGenericSensor.FirstGenericSensor();
    if(anySensor) {
        module = await anySensor.module();
    } else {
        error('No matching sensor connected, check cable !');
        await YAPI.FreeAPI();
        return;
    }
    let serial = await module.get_serialNumber();

    sens1  = YGenericSensor.FindGenericSensor(serial+".genericSensor1");
    sens2  = YGenericSensor.FindGenericSensor(serial+".genericSensor2");
    sens3  = YGenericSensor.FindGenericSensor(serial+".genericSensor3");
    sens4  = YGenericSensor.FindGenericSensor(serial+".genericSensor4");

    refresh();
}

async function refresh(): Promise<void>
{
    let html: string = '<h1>Yocto-MaxiMicroVolt-Rx demo</h1>';
    if (await sens1.isOnline())
    {   html += 'Using ' + (await module.get_serialNumber()) + ' (' + (await module.get_productName()) + ')<br>';
        html += '- input 1  : ' + (await sens1.get_currentValue()) +  (await sens1.get_unit()) + '<br>'
        html += '- input 2  : ' + (await sens2.get_currentValue()) +  (await sens2.get_unit()) + '<br>'
        html += '- input 3  : ' + (await sens3.get_currentValue()) +  (await sens3.get_unit()) + '<br>'
        html += '- input 4  : ' + (await sens4.get_currentValue()) +  (await sens4.get_unit()) + '<br>'

    } else {
        html += 'Module not connected';
    }
    document.body.innerHTML = html;
    setTimeout(refresh, 500);
}

startDemo();
