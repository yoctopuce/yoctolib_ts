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
import {  YSdi12Port } from '../../dist/esm/yocto_sdi12port.js'

let module: YModule;
let sdi12Port: YSdi12Port;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
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
    sdi12Port = <YSdi12Port>YSdi12Port.FirstSdi12Port();
    console.log(sdi12Port)
    if(sdi12Port)
    {   module = await sdi12Port.get_module();
    } else {
        error('No matching sensor connected, check cable !');
        await YAPI.FreeAPI();
        return;
    }

    refresh();
}

async function refresh(): Promise<void>
{
    let html: string = '<h1>Yocto-SDI12 demo</h1>';
    if (await sdi12Port.isOnline())
    {

       html += 'Using ' + (await module.get_serialNumber()) + ' (' + (await module.get_productName()) + ')<br><br>';

        sdi12Port.reset()

        let singleSensor = await sdi12Port.discoverSingleSensor();
        html += 'Sensor address : ' + await singleSensor.get_sensorAddress() + '<br>';
        html += 'Sensor SDI-12 compatibility : ' + await singleSensor.get_sensorProtocol()+ '<br>';
        html += 'Sensor company name : ' + await singleSensor.get_sensorVendor()+ '<br>';
        html += 'Sensor model number : ' + await singleSensor.get_sensorModel()+ '<br>';
        html += 'Sensor version : ' + await singleSensor.get_sensorVersion()+ '<br>';
        html += 'Sensor serial number : ' + await singleSensor.get_sensorSerial()+ '<br>';

        let valSensor = await sdi12Port.readSensor(await singleSensor.get_sensorAddress(),"M", 5000);
        for (let i = 0; i < valSensor.length; i++) {
            if (await singleSensor.get_measureCount() > 1) {

                html += (await singleSensor.get_measureSymbol(i)).toString() + ' ';
                html += valSensor[i] + ' ';
                html += (await singleSensor.get_measureUnit(i)).toString() + ' ';
                html += (await singleSensor.get_measureDescription(i)).toString() + '<br>';
            } else {
            html += valSensor[i]+ '<br>';
            }
        }
    }
    document.body.innerHTML = html;
    setTimeout(refresh, 500);
}

startDemo();
