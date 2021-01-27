/*********************************************************************
 *
 *  $Id: svn_id $
 *
 *  An example that show how to use a  Yocto-Amp
 *
 *  You can find more information on our web site:
 *   Yocto-Amp documentation:
 *      https://www.yoctopuce.com/EN/products/yocto-amp/doc.html
 *   TypeScript API Reference:
 *      https://www.yoctopuce.com/EN/doc/reference/yoctolib-typescript-EN.html
 *
 *********************************************************************/

import { YAPI, YErrorMsg, YModule } from 'yoctolib-cjs/yocto_api_nodejs.js';
import { YCurrent } from 'yoctolib-cjs/yocto_current.js'

let dcAmp: YCurrent;
let acAmp: YCurrent;

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
        let anysensor = YCurrent.FirstCurrent();
        if(anysensor) {
            let module = await anysensor.get_module();
            serial = await module.get_serialNumber();
        } else {
            console.log('No matching sensor connected, check cable !');
            await YAPI.FreeAPI();
            return;
        }
    }
    console.log('Using device '+serial);
    dcAmp = YCurrent.FindCurrent(serial+".current1");
    acAmp = YCurrent.FindCurrent(serial+".current2");

    refresh();
}

async function refresh(): Promise<void>
{
    if (await dcAmp.isOnline()) {
        console.log('DC current : '+(await dcAmp.get_currentValue())
            + (await dcAmp.get_unit()));
        console.log('AC current : '+(await acAmp.get_currentValue())
            + (await acAmp.get_unit()));
    } else {
        console.log('Module not connected');
    }
    setTimeout(refresh, 500);
}

startDemo();
