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

import { YAPI, YErrorMsg, YModule, YFunction, YSensor, YMeasure } from 'yoctolib-ts/dist/cjs/yocto_api_nodejs.js';
import { YAnButton } from 'yoctolib-ts/dist/cjs/yocto_anbutton.js';

class DeviceInfo
{
    name: string;
    unit: string;

    constructor(identifier: string, unit: string)
    {
        this.name = identifier;
        this.unit = unit;
    }
}

async function valueChangeCallBack(obj_fct: YFunction, str_value: string): Promise<void>
{
    let info = <DeviceInfo>await obj_fct.get_userData();
    console.log(info.name + ': ' + str_value+' '+info.unit+' (new value)');
}

async function timedReportCallBack(obj_fct: YSensor, obj_measure: YMeasure): Promise<void>
{
    let info = <DeviceInfo>await obj_fct.get_userData();
    console.log(info.name + ': ' + obj_measure.get_averageValue()+' '+info.unit+' (timed report)');
}

async function configChangeCallBack(module: YModule): Promise<void>
{
    let serial = await module.get_serialNumber();
    console.log(serial+': configuration change');
}

async function beaconCallBack(module: YModule, beacon: number): Promise<void>
{
    let serial: string = await module.get_serialNumber();
    console.log(serial+': beacon changed to '+ beacon);
}

async function deviceArrival(module: YModule): Promise<void>
{
    let serial: string = await module.get_serialNumber();
    console.log('Device arrival: '+serial);
    await module.registerConfigChangeCallback(configChangeCallBack);
    await module.registerBeaconCallback(beaconCallBack);

    // First solution: look for a specific type of function (eg. anButton)
    let fctcount: number = await module.functionCount();
    for (let i: number = 0; i < fctcount; i++)
    {
        let hardwareId: string = serial + "." + await module.functionId(i);
        if (hardwareId.indexOf(".anButton") > 0) {
            let anButton = YAnButton.FindAnButton(hardwareId);
            await anButton.set_userData(new DeviceInfo(hardwareId, ''));
            await anButton.registerValueCallback(valueChangeCallBack);
        }
    }

    // Alternate solution: register any kind of sensor on the device
    let sensor = YSensor.FirstSensor();
    while(sensor) {
        let module: YModule = await sensor.get_module();
        if(await module.get_serialNumber() === serial) {
            let hardwareId = await sensor.get_hardwareId();
            await sensor.set_userData(new DeviceInfo(hardwareId, await sensor.get_unit()));
            await sensor.registerValueCallback(valueChangeCallBack);
            await sensor.registerTimedReportCallback(timedReportCallBack);
        }
        sensor = sensor.nextSensor();
    }
}

async function deviceRemoval(module: YModule): Promise<void>
{
    let serial: string = await module.get_serialNumber();
    console.log('Device removal : '+serial);
}

function handleHotPlug()
{
    YAPI.SetTimeout(handleHotPlug, 1000);
}

function logfun(line: string)
{
    console.log('LOG : ' + line);
}

async function startDemo(): Promise<void>
{
    await YAPI.LogUnhandledPromiseRejections();
    await YAPI.DisableExceptions();
    await YAPI.RegisterLogFunction(logfun)

    // Setup the API to use the VirtualHub on local machine
    let errmsg = new YErrorMsg();
    if (await YAPI.PreregisterHub('127.0.0.1', errmsg) !== YAPI.SUCCESS) {
        console.log('Cannot contact VirtualHub on 127.0.0.1: ' + errmsg.msg);
        return;
    }

    await YAPI.RegisterDeviceArrivalCallback(deviceArrival);
    await YAPI.RegisterDeviceRemovalCallback(deviceRemoval);
    handleHotPlug()
}

startDemo();
