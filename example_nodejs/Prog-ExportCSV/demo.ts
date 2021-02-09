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

import { YAPI, YErrorMsg, YSensor, YConsolidatedDataSet, YMeasure } from 'yoctolib-cjs/yocto_api_nodejs.js';

async function startDemo(): Promise<void>
{
    await YAPI.LogUnhandledPromiseRejections();

    // Setup the API to use the VirtualHub on local machine
    let errmsg: YErrorMsg = new YErrorMsg();
    if (await YAPI.RegisterHub('127.0.0.1', errmsg) != YAPI.SUCCESS) {
        console.log('Cannot contact VirtualHub on 127.0.0.1');
        return;
    }

    // Enumerate all connected sensors
    let sensorList: YSensor[] = [];
    let sensor: YSensor | null;
    sensor = YSensor.FirstSensor();
    while(sensor) {
        sensorList.push(sensor);
        sensor = sensor.nextSensor();
    }
    if (sensorList.length == 0) {
        console.log('No matching sensor connected, check cable !');
        return;
    }
    
    // Generate consolidated CSV output for all sensors
    let data: YConsolidatedDataSet = new YConsolidatedDataSet(0, 0, sensorList);
    let record: number[] = [];
    while(await data.nextRecord(record) < 100) {
        let line: string = new Date(1000*record[0]).toISOString();
        for(let idx = 1; idx < record.length; idx++) {
            line += ";" + record[idx];            
        }
        console.log(line);
    }
    await YAPI.FreeAPI();
}

startDemo();
