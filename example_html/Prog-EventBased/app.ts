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

import { YAPI, YErrorMsg, YFunction, YModule, YSensor, YMeasure } from "../../dist/esm/yocto_api_html.js"
import { YAnButton } from "../../dist/esm/yocto_anbutton.js"

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

function error(msg: string)
{
    document.body.innerHTML = "<h3>Error: "+msg+"</h3>";
}

function wdg(id: string): HTMLElement | null
{
    return document.getElementById(id);
}

function shtml(id: string, html: string)
{
    let widget = wdg(id);
    if(widget) widget.innerHTML = html;
}

async function valueChangeCallBack(obj_fct: YFunction, str_value: string): Promise<void>
{
    // the field to update is stored in the function userData
    let info = <DeviceInfo>await obj_fct.get_userData();
    shtml(info.name, str_value+' '+info.unit+' (new value)');
}

async function timedReportCallBack(obj_fct: YSensor, obj_measure: YMeasure): Promise<void>
{
    // the field to update is stored in the function userData
    let info = <DeviceInfo>await obj_fct.get_userData();
    shtml(info.name, obj_measure.get_averageValue()+' '+info.unit+' (timed report)');
}

async function configChangeCallBack(module: YModule): Promise<void>
{
    // the field to update is stored in the function userData
    let serial: string = await module.get_serialNumber();
    let time: Date = new Date();
    shtml(serial+'confChg',
        ('0'+time.getHours()).slice(-2) + ":" + ('0'+time.getMinutes()).slice(-2) + ":" + ('0'+time.getSeconds()).slice(-2));
}

async function beaconCallBack(module: YModule, beacon: number): Promise<void>
{
    let serial: string = await module.get_serialNumber();
    shtml(serial+'beacon', 'beacon is ' + (beacon ? 'ON' : 'OFF'));
}

async function deviceArrival(module: YModule): Promise<void>
{
    let serial = await module.get_serialNumber();
    let div = document.getElementById(serial);
    if(div) {
        div.style.display = "block";
        return;
    }
    (<HTMLElement>wdg('modules')).innerHTML += "<div id='"+serial+"'>Module "+serial+"<br></div>";

    // First solution: look for a specific type of function (eg. anButton)
    let fctcount: number = await module.functionCount();
    for (let i: number = 0; i < fctcount; i++)
    {
        let hardwareId: string = serial + "." + await module.functionId(i);
        if (hardwareId.indexOf(".anButton") > 0) {
            (<HTMLElement>wdg(serial)).innerHTML += "- "+hardwareId+' : <span id="'+hardwareId+'"></span><br>';
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
            (<HTMLElement>wdg(serial)).innerHTML += "- "+hardwareId+' : <span id="'+hardwareId+'"></span><br>';
            await sensor.set_userData(new DeviceInfo(hardwareId, await sensor.get_unit()));
            await sensor.registerValueCallback(valueChangeCallBack);
            await sensor.registerTimedReportCallback(timedReportCallBack);
        }
        sensor = sensor.nextSensor();
    }
    (<HTMLElement>wdg(serial)).innerHTML +=
        '- last beacon state: <span id="'+serial+'beacon"></span><br>'+
        '- last config change: <span id="'+serial+'confChg"></span><br>';
    await module.registerConfigChangeCallback(configChangeCallBack);
    await module.registerBeaconCallback(beaconCallBack);
}

async function deviceRemoval(module: YModule): Promise<void>
{
    let serial = await module.get_serialNumber();
    (<HTMLElement>wdg(serial)).style.display = "none";
}

function handleHotPlug()
{
    YAPI.SetTimeout(handleHotPlug,1000);
}

async function startDemo()
{
    document.body.innerHTML = 'Trying to contact VirtualHub on local machine...';
    let errmsg = new YErrorMsg();
    if(await YAPI.PreregisterHub('127.0.0.1', errmsg) != YAPI.SUCCESS) {
        error('Cannot contact VirtualHub on 127.0.0.1: '+errmsg.msg);
    }
    document.body.innerHTML = '<div id="modules"></div>';

    await YAPI.RegisterDeviceArrivalCallback(deviceArrival);
    await YAPI.RegisterDeviceRemovalCallback(deviceRemoval);
    handleHotPlug()
}

startDemo();
