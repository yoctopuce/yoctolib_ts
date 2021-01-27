/*********************************************************************
 *
 *  $Id: svn_id $
 *
 *  An example that show how to use a  Yocto-Serial
 *
 *  You can find more information on our web site:
 *   Yocto-Serial documentation:
 *      https://www.yoctopuce.com/EN/products/yocto-serial/doc.html
 *   TypeScript API Reference:
 *      https://www.yoctopuce.com/EN/doc/reference/yoctolib-typescript-EN.html
 *
 *********************************************************************/

import { YAPI, YErrorMsg, YModule } from 'yoctolib-cjs/yocto_api_nodejs.js';
import { YSerialPort } from 'yoctolib-cjs/yocto_serialport.js'
import * as readline from 'readline';

let serialPort: YSerialPort;

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
    if (serial[8] != '-') {
        // by default use any connected module suitable for the demo
        let anysensor = YSerialPort.FirstSerialPort();
        if (anysensor) {
            let module: YModule = await anysensor.get_module();
            serial = await module.get_serialNumber();
        } else {
            console.log('No matching module connected, check cable !');
            await YAPI.FreeAPI();
            return;
        }
    }
    console.log('Using device ' + serial);
    serialPort = YSerialPort.FindSerialPort(serial + ".serialPort");

    console.log("****************************");
    console.log("* make sure voltage levels *");
    console.log("* are properly configured  *");
    console.log("****************************");

    await serialPort.set_serialMode("9600,8N1");
    await serialPort.set_protocol("Line");
    await serialPort.reset();

    const rl: readline.Interface = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    console.log('Type line to send, or Ctrl-C to exit:');
    rl.on('line', (input) => {
        serialPort.writeLine(input);
    });

    refresh();
}

async function refresh(): Promise<void>
{
    var line;
    if (await serialPort.isOnline()) {
        do {
            line = await serialPort.readLine();
            if (line != "") {
                console.log("Received: " + line);
            }
        } while (line != "");
    } else {
        console.log('Module not connected');
    }
    setTimeout(refresh, 500);
}

startDemo();

