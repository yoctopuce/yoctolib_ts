/*********************************************************************
 *
 *  $Id: svn_id $
 *
 *  An example that shows how to use a  Yocto-MaxiMicroVolt-Rx
 *
 *  You can find more information on our web site:
 *   Yocto-MaxiMicroVolt-Rx documentation:
 *      https://www.yoctopuce.com/EN/products/yocto-maximicrovolt-rx/doc.html
 *   TypeScript API Reference:
 *      https://www.yoctopuce.com/EN/doc/reference/yoctolib-typescript-EN.html
 *
 *********************************************************************/

import { YAPI, YErrorMsg, YModule } from 'yoctolib-cjs/yocto_api_nodejs.js';
import { YGenericSensor } from 'yoctolib-cjs/yocto_genericsensor.js'

let sensor1: YGenericSensor;
let sensor2: YGenericSensor;

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
    if(serial[8] != '-') {
        // by default use any connected module suitable for the demo
        let anysensor = YGenericSensor.FirstGenericSensor();
        if(anysensor) {
            let module: YModule = await anysensor.get_module();
            serial = await module.get_serialNumber();
        } else {
            console.log('No matching sensor connected, check cable !');
            await YAPI.FreeAPI();
            return;
        }
    }
    console.log('Using device '+serial);
    sensor1 = YGenericSensor.FindGenericSensor(serial+".genericSensor1");
    sensor2 = YGenericSensor.FindGenericSensor(serial+".genericSensor2");

    refresh();
}

async function refresh(): Promise<void>
{
    if (await sensor1.isOnline()) {
        console.log('Input 1: '+(await sensor1.get_currentValue())
            + (await sensor1.get_unit()));
        console.log('Input 2: '+(await sensor2.get_currentValue())
            + (await sensor2.get_unit()));
    } else {
        console.log('Module not connected');
    }
    setTimeout(refresh, 500);
}

startDemo();
