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
import {  YCarbonDioxide } from '../../dist/esm/yocto_carbondioxide.js'

let module: YModule;
let co2: YCarbonDioxide;

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
    co2 = <YCarbonDioxide>YCarbonDioxide.FirstCarbonDioxide();
    if(co2)
    {   module = await co2.get_module();
    } else {
        error('No matching sensor connected, check cable !');
        await YAPI.FreeAPI();
        return;
    }

    refresh();
}

async function refresh(): Promise<void>
{
    let html: string = '<h1>Yocto-CO2 demo</h1>';
    if (await co2.isOnline()) {
        html += 'Using ' + (await module.get_serialNumber()) + ' (' + (await module.get_productName()) + ')<br>';
        html += '- CO2 : ' + (await co2.get_currentValue()) + (await co2.get_unit()) + '<br>';
    } else {
        html += 'Module not connected';
    }
    document.body.innerHTML = html;
    setTimeout(refresh, 500);
}

startDemo();
