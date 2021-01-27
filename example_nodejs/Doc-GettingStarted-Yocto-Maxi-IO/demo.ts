/*********************************************************************
 *
 *  $Id: svn_id $
 *
 *  An example that show how to use a  Yocto-Maxi-IO
 *
 *  You can find more information on our web site:
 *   Yocto-Maxi-IO documentation:
 *      https://www.yoctopuce.com/EN/products/yocto-maxi-io/doc.html
 *   TypeScript API Reference:
 *      https://www.yoctopuce.com/EN/doc/reference/yoctolib-typescript-EN.html
 *
 *********************************************************************/

import { YAPI, YErrorMsg, YModule } from 'yoctolib-cjs/yocto_api_nodejs.js';
import { YDigitalIO } from 'yoctolib-cjs/yocto_digitalio.js'

let io: YDigitalIO;
let outputdata: number;

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
        let anysensor = YDigitalIO.FirstDigitalIO();
        if (anysensor) {
            let module: YModule = await anysensor.get_module();
            serial = await module.get_serialNumber();
        } else {
            console.log('No matching sensor connected, check cable !');
            await YAPI.FreeAPI();
            return;
        }
    }
    console.log('Using device ' + serial);

    io = YDigitalIO.FindDigitalIO(serial + '.digitalIO');
    // lets configure the channels direction
    // bits 0..1 as output
    // bits 2..3 as input
    await io.set_portDirection(0x03);
    await io.set_portPolarity(0); // polarity set to regular
    await io.set_portOpenDrain(0); // No open drain
    console.log("Channels 0..1 are configured as outputs and channels 2..3");
    console.log("are configred as inputs, you can connect some inputs to");
    console.log("ouputs and see what happens");
    outputdata = 0;
    refresh();
}

async function refresh(): Promise<void>
{
    if (await io.isOnline()) {
        // cycle ouput 0..3
        outputdata = (outputdata + 1) % 4;
        // We could have used set_bitState as well
        await io.set_portState(outputdata);
        // read port values
        let inputdata: number = await io.get_portState();
        console.log("port value = " + inputdata.toString(2));
    } else {
        console.log('Module not connected');
    }
    setTimeout(refresh, 1000);
}

startDemo();
