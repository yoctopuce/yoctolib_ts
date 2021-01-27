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

import { YAPI, YErrorMsg, YModule } from "../../dist/esm/yocto_api_html.js"

function error(msg: string)
{
    document.body.innerHTML = "<h3>Error: "+msg+"</h3>";
}

async function startDemo()
{
    document.body.innerHTML = 'Trying to contact VirtualHub on local machine...';
    let errmsg = new YErrorMsg();
    if(await YAPI.RegisterHub('127.0.0.1', errmsg) != YAPI.SUCCESS) {
        error('Cannot contact VirtualHub on 127.0.0.1: '+errmsg.msg);
    }
    refresh();
}

async function refresh()
{
    let errmsg = new YErrorMsg();
    await YAPI.UpdateDeviceList(errmsg);

    let html = '<h1>Module list</h1>';
    let module = YModule.FirstModule();
    while(module) {
        html += await module.get_serialNumber();
        html += '(' + (await module.get_productName()) + ')<br>';
        module = module.nextModule();
    }
    document.body.innerHTML = html;
    setTimeout(refresh, 500);
}

startDemo();
