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

import { YAPI, YErrorMsg, YModule, YFunction, YSensor, YMeasure } from 'yoctolib-cjs/yocto_api_nodejs.js';

async function dumpSensor(sensor: YSensor): Promise<void>
{
    console.log("Using DataLogger of " + await sensor.get_friendlyName());
    let dataset = await sensor.get_recordedData(0, 0);
    console.log("loading summary... ");
    await dataset.loadMore();
    let summary: YMeasure = await dataset.get_summary();
    let line = "from " + summary.get_startTimeUTC_asDate() + " to " + summary.get_endTimeUTC_asDate() +
        " : min=" + summary.get_minValue() + " avg=" + summary.get_averageValue() +
        "  max=" + summary.get_maxValue();
    console.log(line);
    let progress: number = 0;
    do {
        progress = await dataset.loadMore();
        process.stdout.write("loading details " + progress + "%\r");
    } while (progress < 100);
    console.log("");
    let details: YMeasure[] = await dataset.get_measures();
    for (let i:number = 0; i < details.length; i++) {
        let measure: YMeasure = details[i];
        let line: string = "from " + measure.get_startTimeUTC_asDate() + " to " + measure.get_endTimeUTC_asDate() +
            " : min=" + measure.get_minValue() + " avg=" + measure.get_averageValue() +
            "  max=" + measure.get_maxValue();
        console.log(line);
    }
}
async function startDemo(): Promise<void>
{
    await YAPI.LogUnhandledPromiseRejections();

    // Setup the API to use the VirtualHub on local machine
    let errmsg: YErrorMsg = new YErrorMsg();
    if (await YAPI.RegisterHub('127.0.0.1', errmsg) != YAPI.SUCCESS) {
        console.log('Cannot contact VirtualHub on 127.0.0.1');
        return;
    }

    let sensor: YSensor | null;
    // Select specified device, or use first available one
    let serial: string = process.argv[process.argv.length - 1];
    if (serial[8] == '-') {
        sensor = YSensor.FindSensor(serial);
    } else {
        // by default use any connected module suitable for the demo
        sensor = YSensor.FirstSensor();
        if (!sensor) {
            console.log('No matching sensor connected, check cable !');
            await YAPI.FreeAPI();
            return;
        }
    }
    await dumpSensor(sensor);
    await YAPI.FreeAPI();
}

startDemo();
