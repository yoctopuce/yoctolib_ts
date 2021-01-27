/*********************************************************************
 *
 *  $Id: svn_id $
 *
 *  An example that show how to use a  Yocto-VOC
 *
 *  You can find more information on our web site:
 *   Yocto-VOC documentation:
 *      https://www.yoctopuce.com/EN/products/yocto-voc/doc.html
 *   TypeScript API Reference:
 *      https://www.yoctopuce.com/EN/doc/reference/yoctolib-typescript-EN.html
 *
 *********************************************************************/

import { YAPI, YErrorMsg, YModule } from 'yoctolib-cjs/yocto_api_nodejs.js';
import { YVoc } from 'yoctolib-cjs/yocto_voc.js'

let voc: YVoc;

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
        let anysensor = YVoc.FirstVoc();
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
    voc = YVoc.FindVoc(serial+".voc");

    refresh();
}

async function refresh(): Promise<void>
{
    if (await voc.isOnline()) {
        console.log('Carbon Dioxide : '+(await voc.get_currentValue()) + ' ppm');
    } else {
        console.log('Module not connected');
    }
    setTimeout(refresh, 500);
}

startDemo();
