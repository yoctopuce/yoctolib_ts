/*********************************************************************
 *
 *  $Id: svn_id $
 *
 *  An example that shows how to use a  Yocto-SDI12
 *
 *  You can find more information on our web site:
 *   Yocto-SDI12 documentation:
 *      https://www.yoctopuce.com/EN/products/yocto-sdi12/doc.html
 *   TypeScript API Reference:
 *      https://www.yoctopuce.com/EN/doc/reference/yoctolib-typescript-EN.html
 *
 *********************************************************************/

import { YAPI, YErrorMsg, YModule } from 'yoctolib-cjs/yocto_api_nodejs.js';
import { YSdi12Port } from 'yoctolib-cjs/yocto_sdi12port.js';


let singleSensor;
async function startDemo(args: string[]): Promise<void>
{
    await YAPI.LogUnhandledPromiseRejections();

    // Setup the API to use the VirtualHub on local machine
    let errmsg: YErrorMsg = new YErrorMsg();
    if(await YAPI.RegisterHub('127.0.0.1', errmsg) != YAPI.SUCCESS) {
        console.log('Cannot contact VirtualHub on 127.0.0.1: '+errmsg.msg);
        return;
    }

    // Select the I2C interface to use
    let target: string;
    if(args[1] == "any") {
        let anySdi12 = YSdi12Port.FirstSdi12Port();
        if (anySdi12 == null) {
            console.log("No module connected (check USB cable)\n");
            process.exit(1);
        }
        let module: YModule = await anySdi12.get_module();
        target = await module.get_serialNumber();
    } else {
        target = args[1];
    }

    let sdi12Port = YSdi12Port.FindSdi12Port(target+'.sdi12Port');

    if(await sdi12Port.isOnline()) {
        console.log(target);
        singleSensor = await sdi12Port.discoverSingleSensor();
        console.log('Sensor address : ' + await singleSensor.get_sensorAddress());
        console.log('sensor SDI-12 compatibility : ' + await singleSensor.get_sensorProtocol());
        console.log('Sensor compagny name : ' + await singleSensor.get_sensorVendor());
        console.log('Sensor model number : ' + await singleSensor.get_sensorModel());
        console.log('Sensor version : ' + await singleSensor.get_sensorVersion());
        console.log('Sensor serial number : '+ await singleSensor.get_sensorSerial());
        await YAPI.Sleep(5000 , errmsg);
        while (await sdi12Port.isOnline())
        {
            let sensorVal = await sdi12Port.readSensor(await singleSensor.get_sensorAddress(), 'M', 5000)
            console.clear();
            console.log('Sensor address : ' + await singleSensor.get_sensorAddress());
            for (let i = 0; i < sensorVal.length; i ++)
            {
                if (await singleSensor.get_measureCount() > 1)
                {
                    console.log(await singleSensor.get_measureSymbol(i) + ' ' + sensorVal[i] + ' ' +
                        await singleSensor.get_measureUnit(i) + ' ' + await singleSensor.get_measureDescription(i));
                }
                else
                {
                    console.log(sensorVal[i]);
                }
            }
            await YAPI.Sleep(5000, errmsg);
        }
    } else {
        console.log("Module not connected (check identification and USB cable)\n");
    }

    await YAPI.FreeAPI();
}

if(process.argv.length < 3) {
    console.log("usage: node demo.js <serial_number>");
    console.log("       node demo.js <logical_name>");
    console.log("       node demo.js any            (use any discovered device)");
} else {
    startDemo(process.argv.slice(process.argv.length - 2));
}

