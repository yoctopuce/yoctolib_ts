/*********************************************************************
 *
 *  $Id: svn_id $
 *
 *  An example that shows how to use a  Yocto-PWM-Rx
 *
 *  You can find more information on our web site:
 *   Yocto-PWM-Rx documentation:
 *      https://www.yoctopuce.com/EN/products/yocto-pwm-rx/doc.html
 *   TypeScript API Reference:
 *      https://www.yoctopuce.com/EN/doc/reference/yoctolib-typescript-EN.html
 *
 *********************************************************************/

import { YAPI, YErrorMsg, YModule } from 'yoctolib-cjs/yocto_api_nodejs.js';
import { YPwmInput } from 'yoctolib-cjs/yocto_pwminput.js'

let pwm1: YPwmInput;
let pwm2: YPwmInput;

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
        let anyPwm = YPwmInput.FirstPwmInput();
        if(anyPwm) {
            let module: YModule = await anyPwm.get_module();
            serial = await module.get_serialNumber();
        } else {
            console.log('No matching sensor connected, check cable !');
            await YAPI.FreeAPI();
            return;
        }
    }
    console.log('Using device '+serial);
    pwm1 = YPwmInput.FindPwmInput(serial + ".pwmInput1");
    pwm2 = YPwmInput.FindPwmInput(serial + ".pwmInput2");

    refresh();
}

async function refresh(): Promise<void>
{
    if (await pwm1.isOnline()) {
        console.log("PWM1 : " + (await pwm1.get_frequency()) + "Hz "
                         + (await pwm1.get_dutyCycle()) + "% "
                         + (await pwm1.get_pulseCounter()) +" pulse edges ");
        console.log("PWM2 : " + (await pwm2.get_frequency()) + "Hz "
                         + (await pwm2.get_dutyCycle()) + "% "
                         + (await pwm2.get_pulseCounter()) + " pulse edges ");
    } else {
        console.log('Module not connected');
    }
    setTimeout(refresh, 500);
}

startDemo();
