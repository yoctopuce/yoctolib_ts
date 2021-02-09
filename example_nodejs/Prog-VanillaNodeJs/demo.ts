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

import { YAPI, YErrorMsg } from 'yoctolib-cjs/yocto_api_nodejs.js';
import { YAnButton } from 'yoctolib-cjs/yocto_anbutton.js';

let input1: YAnButton;
let input5: YAnButton;

function startDemo(): Promise<void>
{
    let errmsg: YErrorMsg = new YErrorMsg();

    return YAPI.LogUnhandledPromiseRejections()
    .then(() => {
        // Setup the API to use the VirtualHub on local machine
        return YAPI.RegisterHub('127.0.0.1', errmsg);
    }).then((res: number) => {
        if(res != YAPI.SUCCESS) {
            console.log('Cannot contact VirtualHub on 127.0.0.1: '+errmsg.msg);
            process.exit(1);
        }
        // Select specified device, or use first available one
        let serial = process.argv[process.argv.length-1];
        if(serial[8] != '-') {
            // by default use any connected module suitable for the demo
            let anyInput: YAnButton | null = YAnButton.FirstAnButton();
            if(anyInput) {
                return anyInput.module().then((module) => { return module.get_serialNumber(); });
            } else {
                console.log('No Yocto-Knob connected, check cable');
                process.exit(1);
            }
        }
        return serial;
    }).then((serial: string) => {
        console.log('Using device '+serial);
        input1 = YAnButton.FindAnButton(serial+'.anButton1');
        input5 = YAnButton.FindAnButton(serial+'.anButton5');

        refresh();
    });
}

function refresh()
{
    input1.isOnline().then((isOnline: boolean) => {
        if(isOnline) {
            let line: string = 'Button 1: ';
            input1.get_isPressed().then((isPressed: YAnButton.ISPRESSED) => {
                line += (isPressed ? 'pressed' : 'released');
                return input1.get_calibratedValue();
            }).then((value: number) => {
                line += ' ('+value+')';
                console.log(line);
                line = 'Button 2: ';
                return input5.get_isPressed();
            }).then((isPressed: YAnButton.ISPRESSED) => {
                line += (isPressed ? 'pressed' : 'released');
                return input5.get_calibratedValue();
            }).then((value: number) => {
                line += ' ('+value+')';
                console.log(line);
            });
        } else {
            console.log('Module not connected');
        }
    });
    setTimeout(refresh, 500);
}

startDemo();
