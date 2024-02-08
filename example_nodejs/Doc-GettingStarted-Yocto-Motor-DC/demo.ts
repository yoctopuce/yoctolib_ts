/*********************************************************************
 *
 *  $Id: svn_id $
 *
 *  An example that shows how to use a  Yocto-Motor-DC
 *
 *  You can find more information on our web site:
 *   Yocto-Motor-DC documentation:
 *      https://www.yoctopuce.com/EN/products/yocto-motor-dc/doc.html
 *   TypeScript API Reference:
 *      https://www.yoctopuce.com/EN/doc/reference/yoctolib-typescript-EN.html
 *
 *********************************************************************/

import { YAPI, YErrorMsg, YModule } from 'yoctolib-cjs/yocto_api_nodejs.js';
import { YMotor } from 'yoctolib-cjs/yocto_motor.js'
import { YCurrent } from 'yoctolib-cjs/yocto_current.js'
import { YVoltage } from 'yoctolib-cjs/yocto_voltage.js'
import { YTemperature } from 'yoctolib-cjs/yocto_temperature.js'

let motor: YMotor;
let current: YCurrent;
let voltage: YVoltage;
let temperature: YTemperature;

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
    if (serial[8] != '-') {
        // by default use any connected module suitable for the demo
        let anysensor = YMotor.FirstMotor();
        if (anysensor) {
            let module: YModule = await anysensor.get_module();
            serial = await module.get_serialNumber();
        } else {
            console.log('No matching Yocto-Motor-DC connected, check cable !');
            await YAPI.FreeAPI();
            return;
        }
    }
    console.log('Using device ' + serial);

    motor = YMotor.FindMotor(serial + ".motor");
    current = YCurrent.FindCurrent(serial + ".current");
    voltage = YVoltage.FindVoltage(serial + ".voltage");
    temperature = YTemperature.FindTemperature(serial + ".temperature");
    //power is a integer between -100 and 100%
    let power: number = 50;

    // if motor is in error state, reset it.
    if (await motor.get_motorStatus() >= YMotor.MOTORSTATUS_LOVOLT) {
        await motor.resetStatus();
    }
    await motor.drivingForceMove(power, 2000);  // ramp up to power in 2 seconds
    refresh();
}

async function refresh(): Promise<void>
{
    if (await motor.isOnline()) {
        // display motor status
        console.log("Status=" + await motor.get_advertisedValue() + "  " +
            "Voltage=" + await voltage.get_currentValue() + "V  " +
            "Current=" + await current.get_currentValue() / 1000 + "A  " +
            "Temp=" + await temperature.get_currentValue() + "deg C");
    } else {
        console.log('Module not connected');
    }
    setTimeout(refresh, 500);
}

startDemo();
