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
import { YMultiCellWeighScale } from '../../dist/esm/yocto_multicellweighscale.js'

let module: YModule;
let scale: YMultiCellWeighScale ;


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
    scale = <YMultiCellWeighScale>YMultiCellWeighScale.FirstMultiCellWeighScale();
    if(scale) {
        module = await scale.module();
    } else {
        error('No matching sensor connected, check cable !');
        await YAPI.FreeAPI();
        return;
    }
    await scale.set_excitation(YMultiCellWeighScale.EXCITATION_AC);
    let html: string = '<h1>Yocto-MaxiBridge demo</h1>';
    html += 'Using ' + (await module.get_serialNumber()) + ' (' + (await module.get_productName()) + ')<br>';
    html += 'please wait..';
    document.body.innerHTML = html;
    setTimeout(tare, 3000); // wait until the sensor is properly excited

}

async function tare(): Promise<void>
{
    await (scale).tare();
    refresh();
}

async function refresh(): Promise<void>
{
    let html: string = '<h1>Yocto-MaxiBridge demo</h1>';
    if (await scale.isOnline()) {
        html += 'Using ' + (await module.get_serialNumber()) + ' (' + (await module.get_productName()) + ')<br>';
        html += '- weight : ' + (await scale.get_currentValue()) + (await scale.get_unit()) + '<br>';

    } else {
        html += 'Module not connected';
    }
    document.body.innerHTML = html;
    setTimeout(refresh, 500);
}

startDemo();
