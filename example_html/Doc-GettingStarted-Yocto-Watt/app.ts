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
import { YVoltage } from '../../dist/esm/yocto_voltage.js'
import { YCurrent } from '../../dist/esm/yocto_current.js'
import { YPower } from '../../dist/esm/yocto_power.js'

let module: YModule;
let DC_voltage: YVoltage;
let AC_voltage: YVoltage;
let DC_current: YCurrent;
let AC_current: YCurrent;
let power: YPower;

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
    let anysensor = YVoltage.FirstVoltage();
    if(anysensor) {
        module = await anysensor.module();
    } else {
        error('No matching sensor connected, check cable !');
        await YAPI.FreeAPI();
        return;
    }
    let serial = await module.get_serialNumber();

    DC_voltage  = YVoltage.FindVoltage(serial+".voltage1");
    AC_voltage  = YVoltage.FindVoltage(serial+".voltage2");
    DC_current  = YCurrent.FindCurrent(serial+".current1");
    AC_current  = YCurrent.FindCurrent(serial+".current2");
    power  = YPower.FindPower(serial+".power");
    refresh();
}

async function refresh(): Promise<void>
{
    let html: string = '<h1>Yocto-Watt demo</h1>';
    if (await DC_voltage.isOnline()) {
        html += 'Using ' + (await module.get_serialNumber()) + ' (' + (await module.get_productName()) + ')<br>';
        html += '- DC voltage: ' + (await DC_voltage.get_currentValue()) + (await DC_voltage.get_unit()) + '<br>';
        html += '- AC voltage   : ' + (await AC_voltage.get_currentValue()) + (await AC_voltage.get_unit()) + '<br>';
        html += '- DC current: ' + (await DC_current.get_currentValue()) + (await DC_current.get_unit()) + '<br>';
        html += '- AC current   : ' + (await AC_current.get_currentValue()) + (await AC_current.get_unit()) + '<br>';
        html += '- Power   : ' + (await power.get_currentValue()) + (await power.get_unit()) + '<br>';
    } else {
        html += 'Module not connected';
    }
    document.body.innerHTML = html;
    setTimeout(refresh, 500);
}

startDemo();
