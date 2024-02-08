/*********************************************************************
 *
 *  $Id: svn_id $
 *
 *  An example that shows how to use a  Yocto-Knob
 *
 *  You can find more information on our web site:
 *   Yocto-Knob documentation:
 *      https://www.yoctopuce.com/EN/products/yocto-knob/doc.html
 *   TypeScript API Reference:
 *      https://www.yoctopuce.com/EN/doc/reference/yoctolib-typescript-EN.html
 *
 *********************************************************************/

import { YAPI, YErrorMsg, YModule } from 'yoctolib-cjs/yocto_api_nodejs.js';
import { YAnButton } from 'yoctolib-cjs/yocto_anbutton.js'

let input1: YAnButton;
let input5: YAnButton;

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
        let anyInput = YAnButton.FirstAnButton();
        if(anyInput) {
            let module: YModule = await anyInput.get_module();
            serial = await module.get_serialNumber();
        } else {
            console.log('No Yocto-Knob connected, check cable !');
            await YAPI.FreeAPI();
            return;
        }
    }
    console.log('Using device '+serial);
    input1 = YAnButton.FindAnButton(serial+'.anButton1');
    input5 = YAnButton.FindAnButton(serial+'.anButton5');

    refresh();
}

async function refresh(): Promise<void>
{
    if (await input1.isOnline()) {
        let line: string = 'Button 1: ';
        line += (await input1.get_isPressed() ? 'pressed' : 'released');
        line += ' ('+(await input1.get_calibratedValue())+')';
        console.log(line);
        line = 'Button 5: ';
        line += (await input5.get_isPressed() ? 'pressed' : 'released');
        line += ' ('+(await input5.get_calibratedValue())+')';
        console.log(line);
    } else {
        console.log('Module not connected');
    }
    setTimeout(refresh, 500);
}

startDemo();
