/*********************************************************************
 *
 *  $Id: svn_id $
 *
 *  An example that shows how to use a  Yocto-PWM-Tx
 *
 *  You can find more information on our web site:
 *   Yocto-PWM-Tx documentation:
 *      https://www.yoctopuce.com/EN/products/yocto-pwm-tx/doc.html
 *   TypeScript API Reference:
 *      https://www.yoctopuce.com/EN/doc/reference/yoctolib-typescript-EN.html
 *
 *********************************************************************/

import { YAPI, YErrorMsg, YModule } from 'yoctolib-cjs/yocto_api_nodejs.js';
import { YPwmOutput } from 'yoctolib-cjs/yocto_pwmoutput.js'

async function startDemo(args: string[]): Promise<void>
{
    await YAPI.LogUnhandledPromiseRejections();

    // Setup the API to use the VirtualHub on local machine
    let errmsg: YErrorMsg = new YErrorMsg();
    if(await YAPI.RegisterHub('127.0.0.1', errmsg) != YAPI.SUCCESS) {
        console.log('Cannot contact VirtualHub on 127.0.0.1: '+errmsg.msg);
        return;
    }

    // Select the module to use
    let target: string;
    if(args[0] == "any") {
        let anyPwm = YPwmOutput.FirstPwmOutput();
        if (anyPwm == null) {
            console.log("No module connected (check USB cable)\n");
            await YAPI.FreeAPI();
            return;
        }
        let module: YModule = await anyPwm.get_module();
        target = await module.get_serialNumber();
    } else {
        target = args[0];
    }
    let frequency: number = parseFloat(args[1]);
    let dutyCycle: number = parseFloat(args[2]);

    let pwmoutput1 = YPwmOutput.FindPwmOutput(target+'.pwmOutput1');
    let pwmoutput2 = YPwmOutput.FindPwmOutput(target+'.pwmOutput2');

    if(await pwmoutput1.isOnline()) {
        // output 1 : immediate change
        await pwmoutput1.set_frequency(frequency);
        await pwmoutput1.set_enabled(YPwmOutput.ENABLED_TRUE);
        await pwmoutput1.set_dutyCycle(dutyCycle);
        // output 2 : smooth change
        await pwmoutput2.set_frequency(frequency);
        await pwmoutput2.set_enabled(YPwmOutput.ENABLED_TRUE);
        await pwmoutput2.dutyCycleMove(dutyCycle,3000);
    } else {
        console.log("Module not connected (check identification and USB cable)\n");
    }

    await YAPI.FreeAPI();
}

if(process.argv.length < 5) {
    console.log("usage: node demo.js <serial_number> <frequency> <dutyCycle>");
    console.log("       node demo.js <logical_name> <frequency> <dutyCycle>");
    console.log("       node demo.js any <frequency> <dutyCycle>   (use any discovered device)");
    console.log("       <frequency>: integer between 1Hz and 1000000Hz");
    console.log("       <dutyCycle>: floating point number between 0.0 and 100.0");
} else {
    startDemo(process.argv.slice(process.argv.length - 3));
}

