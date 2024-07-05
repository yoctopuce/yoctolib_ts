/*********************************************************************
 *
 *  $Id: svn_id $
 *
 *  Doc-Inventory example
 *
 *  You can find more information on our web site:
 *   TypeScript API Reference:
 *      https://www.yoctopuce.com/EN/doc/reference/yoctolib-typescript-EN.html
 *
 *********************************************************************/

import { YAPI, YErrorMsg, YModule } from 'yoctolib-cjs/yocto_api_nodejs.js';

async function startDemo(): Promise<void>
{
    await YAPI.LogUnhandledPromiseRejections();
    YAPI._logLevel = 4;

    // Setup the API to use the VirtualHub on local machine
    let errmsg = new YErrorMsg();
    console.log("pouet");
    if (await YAPI.RegisterHub('https://www.yoctopuce-demo.org:443/CloudHub/testsuite', errmsg) != YAPI.SUCCESS) {
        console.log('Cannot contact VirtualHub on 127.0.0.1');
        return;
    }
    await refresh();
    await YAPI.FreeAPI();
    console.log("c'est la fin");
}

async function refresh(): Promise<void>
{
    try {
        let errmsg: YErrorMsg = new YErrorMsg();
        await YAPI.UpdateDeviceList(errmsg);

        let module = YModule.FirstModule();
        while(module) {
            let line: string = await module.get_serialNumber();
            line += '(' + (await module.get_productName()) + ')';
            console.log(line);
            module = module.nextModule();
        }
        //setTimeout(refresh, 500);
    } catch(e) {
        console.log(e);
    }
}

startDemo();
