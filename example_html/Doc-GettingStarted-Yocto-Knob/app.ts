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
import { YAnButton } from '../../dist/esm/yocto_anbutton.js'

let module: YModule;
let bt1: YAnButton;
let bt2: YAnButton;
let bt3: YAnButton;
let bt4: YAnButton;
let bt5: YAnButton;


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
    let anybutton = YAnButton.FirstAnButton();
    if(anybutton) {
        module = await anybutton.module();
    } else {
        error('No matching sensor connected, check cable !');
        await YAPI.FreeAPI();
        return;
    }
    let serial = await module.get_serialNumber();

    bt1  = YAnButton.FindAnButton(serial+".anButton1");
    bt2  = YAnButton.FindAnButton(serial+".anButton2");
    bt3  = YAnButton.FindAnButton(serial+".anButton3");
    bt4  = YAnButton.FindAnButton(serial+".anButton4");
    bt5  = YAnButton.FindAnButton(serial+".anButton5");

    refresh();
}

async function refresh(): Promise<void>
{
    let html: string = '<h1>Yocto-Knob demo</h1>';
    if (await bt1.isOnline())
    {   html += 'Using ' + (await module.get_serialNumber()) + ' (' + (await module.get_productName()) + ')<br>';
        html += '- Button 1  : ' + (await bt1.get_calibratedValue())  + '<br>'
        html += '- Button 2  : ' + (await bt2.get_calibratedValue())  + '<br>'
        html += '- Button 3  : ' + (await bt3.get_calibratedValue())  + '<br>'
        html += '- Button 2  : ' + (await bt4.get_calibratedValue())  + '<br>'
        html += '- Button 4  : ' + (await bt5.get_calibratedValue())  + '<br>'
    } else {
        html += 'Module not connected';
    }
    document.body.innerHTML = html;
    setTimeout(refresh, 500);
}

startDemo();
