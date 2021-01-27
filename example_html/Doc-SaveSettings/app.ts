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

import { YAPI, YErrorMsg, YModule } from '../../dist/esm/yocto_api_html.js';

let module: YModule;
let input : HTMLInputElement;

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
    module = <YModule> YModule.FirstModule();
    if(module == null )
    {
        error('No matching sensor connected, check cable !');
        await YAPI.FreeAPI();
        return;
    }

    let serial = await module.get_serialNumber();
    let logicalname  = await module.get_logicalName();
    let html: string = '<h1>save settings demo </h1>';

    html += 'Using ' + (await module.get_serialNumber()) + ' (' +logicalname  + ')<br>';
    html += '<br>Enter  new logical name :  <input id="in" value=""> and press enter<br>';
    document.body.innerHTML = html;
    input = document.getElementById("in") as HTMLInputElement;
    input.addEventListener("keydown",(e:KeyboardEvent) => { if (e.key== 'Enter')  setName();})
}

async function setName(): Promise<void>
{
    let name :string =  input.value ;
    if (await YAPI.CheckLogicalName(name))
    {  await module.set_logicalName(name);
       await module.saveToFlash(); //  do not forget this
       startDemo() // force a refresh
       return
    }
    alert("invalid logical name")
}

startDemo();
