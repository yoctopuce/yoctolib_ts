/*********************************************************************
 *
 *  $Id: svn_id $
 *
 *  An example that shows how to use a  Yocto-SPI
 *
 *  You can find more information on our web site:
 *   Yocto-SPI documentation:
 *      https://www.yoctopuce.com/EN/products/yocto-spi/doc.html
 *   TypeScript API Reference:
 *      https://www.yoctopuce.com/EN/doc/reference/yoctolib-typescript-EN.html
 *
 *********************************************************************/

import { YAPI, YErrorMsg, YModule } from 'yoctolib-cjs/yocto_api_nodejs.js';
import { YSpiPort } from 'yoctolib-cjs/yocto_spiport.js'

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
        let anySpi = YSpiPort.FirstSpiPort();
        if (anySpi == null) {
            console.log("No module connected (check USB cable)\n");
            await YAPI.FreeAPI();
            return;
        }
        let module: YModule = await anySpi.get_module();
        target = await module.get_serialNumber();
    } else {
        target = args[0];
    }
    let value = parseInt(args[1]);
    let spiPort = YSpiPort.FindSpiPort(target+'.spiPort');

    if(await spiPort.isOnline()) {
        // sample code driving MAX7219 7-segment display driver
        // such as SPI7SEGDISP8.56 from www.embedded-lab.com
        await spiPort.set_spiMode("250000,3,msb");
        await spiPort.set_ssPolarity(YSpiPort.SSPOLARITY_ACTIVE_LOW);
        await spiPort.set_protocol("Frame:5ms");
        await spiPort.reset();
        console.log("****************************");
        console.log("* make sure voltage levels *");
        console.log("* are properly configured  *");
        console.log("****************************");
        // initialize MAX7219
        await spiPort.writeHex('0c01'); // Exit from shutdown state
        await spiPort.writeHex('09ff'); // Enable BCD for all digits
        await spiPort.writeHex('0b07'); // Enable digits 0-7 (=8 in total)
        await spiPort.writeHex('0a0a'); // Set medium brightness
        for(let i = 1; i <= 8; i++) {
            let digit = value % 10;
            await spiPort.writeArray([i, digit]);
            value = (value / 10) >> 0;
        }
    } else {
        console.log("Module not connected (check identification and USB cable)\n");
    }

    await YAPI.FreeAPI();
}

if(process.argv.length < 4) {
    console.log("usage: node demo.js <serial_number> <value>");
    console.log("       node demo.js <logical_name>  <value>");
    console.log("       node demo.js any <value>    (use any discovered device)");
} else {
    startDemo(process.argv.slice(process.argv.length - 2));
}

