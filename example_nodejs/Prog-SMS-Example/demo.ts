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

import { YAPI, YErrorMsg, YModule, YFunction, YSensor, YMeasure } from 'yoctolib-cjs/yocto_api_nodejs.js';
import { YMessageBox, YSms } from 'yoctolib-cjs/yocto_messagebox.js'
import * as readline from 'readline';

let module: YModule;
let mbox: YMessageBox;

async function startDemo(): Promise<void>
{
    await YAPI.LogUnhandledPromiseRejections();

    // Setup the API to use the VirtualHub on local machine
    console.log('Trying to contact VirtualHub on local machine...');
    let errmsg: YErrorMsg = new YErrorMsg();
    if(await YAPI.RegisterHub('127.0.0.1', errmsg) != YAPI.SUCCESS) {
        console.log('Cannot contact VirtualHub on 127.0.0.1: '+errmsg.msg);
        return;
    }

    // Select specified device, or use first available one
    let serial: string = process.argv[process.argv.length-1];
    if (serial[8] != '-') {
        // by default use any connected module suitable for the demo
        mbox = <YMessageBox> YMessageBox.FirstMessageBox();
        if(mbox === null) {
            console.log('No matching module connected, check cable !');
            await YAPI.FreeAPI();
            return;
        }
        serial = await mbox.get_serialNumber();
    }

    // Use first available device
    module = await mbox.module();
    console.log('Using ' + serial + ' (' + (await module.get_productName()) + ')');
    console.log('Messages found on the SIM Card:');

    // show existing messages on the SIM card
    let messages: YSms[] = await mbox.get_messages()
    if(!messages.length) {
        console.log('* No messages found');
    } else {
        for(let sms of messages) {
            console.log('- dated ' + await sms.get_timestamp());
            console.log('  from ' + await sms.get_sender());
            console.log('  "' + await sms.get_textData() + '"');
        }
    }

    // offer to send a new message
    const rl: readline.Interface = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    console.log("To test sending SMS, provide message recipient.");
    console.log("To skip sending, leave empty and press Enter.");
    rl.on('line', (number: string):void => {
        if(number) {
            // if that call fails, make sure that your SIM operator
            // allows you to send SMS given your current contract
            mbox.sendTextMessage(number, "Hello from YoctoHub-GSM !")
        }
    });

    console.log('Waiting to receive SMS, press Ctrl-C to quit');
    mbox.registerSmsCallback(smsCallback);
    while(true) {
        await YAPI.Sleep(5000);
    }
}

async function smsCallback(mbox: YMessageBox, sms: YSms): Promise<void>
{
    console.log('New message dated ' + await sms.get_timestamp());
    console.log('  from ' + await sms.get_sender());
    console.log('  "' + await sms.get_textData() + '"');
    await sms.deleteFromSIM();
}

startDemo();
