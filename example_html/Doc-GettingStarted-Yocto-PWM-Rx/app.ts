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
import { YPwmInput } from '../../dist/esm/yocto_pwminput.js'

let module: YModule;
let channel1: YPwmInput;
let channel2: YPwmInput;


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
    let anysensor = YPwmInput.FirstPwmInput();
    if(anysensor) {
        module = await anysensor.module();
    } else {
        error('No matching sensor connected, check cable !');
        await YAPI.FreeAPI();
        return;
    }
    let serial = await module.get_serialNumber();
    channel1  = YPwmInput.FindPwmInput(serial+".pwmInput1");
    channel2  = YPwmInput.FindPwmInput(serial+".pwmInput2");
   

    refresh();
}

async function refresh(): Promise<void>
{
    let html: string = '<h1>Yocto-PWM-rx demo</h1>';
    if (await channel1.isOnline()) {
        html += 'Using ' + (await module.get_serialNumber()) + ' (' + (await module.get_productName()) + ')<br>';
        html += '- channel1 : ' + (await channel1.get_currentValue()) + (await channel1.get_unit()) + '<br>';
        html += '- channel2 : ' + (await channel2.get_currentValue()) + (await channel2.get_unit()) + '<br>';
       
    } else {
        html += 'Module not connected';
    }
    document.body.innerHTML = html;
    setTimeout(refresh, 500);
}

startDemo();
