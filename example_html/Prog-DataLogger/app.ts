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

import { YAPI, YErrorMsg,YModule, YDataSet,YMeasure, YSensor } from '../../dist/esm/yocto_api_html.js';

let sensor: YSensor;


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
    sensor = <YSensor> YSensor.FirstSensor();
    if(sensor == null )
    {
        error('No  sensor connected, check cable !');
        await YAPI.FreeAPI();
        return;
    }

    let module :YModule = await sensor.get_module();
    let serial :string= await module.get_serialNumber();
    let logicalname  :string = await module.get_logicalName();
    let html: string = '<h1>Datalogger demo </h1>';
    html += 'Using ' + (await sensor.get_friendlyName()) + ' (' + await module.get_productName()  + ')<br>';


    html += "<pre id='ouput'>Loading...</pre>"
    document.body.innerHTML = html;
    dumpSensor(sensor)
}

function UnixTimeStampToString(timestamp:number):string
{
    return new Date(1000*timestamp).toISOString()
}

async function dumpSensor(sensor:YSensor): Promise<void>
{
    let ouputDiv: HTMLPreElement = <HTMLPreElement> document.getElementById("ouput") ;
    let dataset: YDataSet  = await sensor.get_recordedData(0, 0)
    let unit: string  =  await sensor.get_unit();
    let output: string = "Using DataLogger of " +  (await sensor.get_friendlyName())+"\n";
    output += "loading summary... \n";
    await dataset.loadMore();
    let summary: YMeasure = await dataset.get_summary()
    output += " from "+ UnixTimeStampToString(await (summary.get_startTimeUTC()))
          + " to "+ UnixTimeStampToString(await (summary.get_endTimeUTC()))
          + " min: "+ await (summary.get_minValue()).toString() + unit
          + " avg: "+ await (summary.get_averageValue()).toString() + unit
          + " max: "+ await (summary.get_maxValue()).toString() + unit + "\n";
    output += "loading details... "
    let progress : number = 0
    while (progress < 100) {
        progress = await dataset.loadMore()
        ouputDiv.innerText = output + progress + ' %';
    }
    output += 'done !\n';
    ouputDiv.innerText = output + "Preparing to display...";
    let details: YMeasure[] = await dataset.get_measures()
    for (let i: number = 0; i < details.length; i++)
    {
        output += " from "+ UnixTimeStampToString(await (details[i].get_startTimeUTC()))
          + " to " + UnixTimeStampToString(await (details[i].get_endTimeUTC()))
          + " min: " + await (details[i].get_minValue()).toString() + unit
          + " avg: " + await (details[i].get_averageValue()).toString() + unit
          + " max: " + await (details[i].get_maxValue()).toString() + unit + "\n"
    }
    ouputDiv.innerText = output;
}

startDemo()
