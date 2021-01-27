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
import { YMotor } from '../../dist/esm/yocto_motor.js'
import { YTemperature } from '../../dist/esm/yocto_temperature.js'
import { YCurrent } from '../../dist/esm/yocto_current.js'
import { YVoltage } from '../../dist/esm/yocto_voltage.js'

let module: YModule;
let motor: YMotor;
let temp: YTemperature;
let curr: YCurrent;
let volt: YVoltage;

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
    let anyMotor: YMotor = <YMotor>YMotor.FirstMotor();
    if(anyMotor) {
        module = await anyMotor.module();
    } else {
        error('No matching sensor connected, check cable !');
        await YAPI.FreeAPI();
        return;
    }
    let serial :string = await module.get_serialNumber();
    motor = YMotor.FindMotor(serial+".motor");

    temp  = YTemperature.FindTemperature(serial+".temperature");
    curr  = YCurrent.FindCurrent(serial+".current");
    volt  = YVoltage.FindVoltage(serial+".voltage");
    startMotor();
}

async function startMotor(): Promise<void>
{  // if the motor is in error state, reset it.
    if ((await motor.get_motorStatus()) >= YMotor.MOTORSTATUS_LOVOLT)  await motor.resetStatus()
    // ramp up to 50% in 2 seconds
    motor.drivingForceMove(50, 2000)
    refresh()
}

async function refresh(): Promise<void>
{
    let html: string = '<h1>Yocto-Motor-DC demo</h1>';
    if (await motor.isOnline()) {
        html += 'Using ' + (await module.get_serialNumber()) + ' (' + (await module.get_productName()) + ')<br>';
        html += '- Status : ' + (await motor.get_advertisedValue()) + '<br>';
        html += '- Current : ' + (await curr.get_currentValue())+ (await curr.get_unit())+'<br>';
        html += '- Voltage : ' + (await volt.get_currentValue()) + (await volt.get_unit()) + '<br>';
        html += '- Temperature : ' + (await volt.get_currentValue()) + (await temp.get_unit()) + '<br>';
    } else {
        html += 'Module not connected';
    }
    document.body.innerHTML = html;
    setTimeout(refresh, 500);
}

startDemo();
