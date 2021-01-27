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
import { YTilt } from '../../dist/esm/yocto_tilt.js';
import { YCompass } from '../../dist/esm/yocto_compass.js';
import { YGyro } from '../../dist/esm/yocto_gyro.js';
import { YAccelerometer } from '../../dist/esm/yocto_accelerometer.js';

let module: YModule;
let tilt1: YTilt;
let tilt2: YTilt;
let compass: YCompass;
let gyro: YGyro;
let acc: YAccelerometer;

function error(msg: string)
{
    document.body.innerHTML = "<h3>Error: "+msg+"</h3>";
}

async function startDemo(): Promise<void>
{
    document.body.innerHTML = 'Trying to contact VirtualHub on local machine...';
    let errmsg : YErrorMsg = new YErrorMsg();
    if(await YAPI.RegisterHub('127.0.0.1', errmsg) != YAPI.SUCCESS) {
        error('Cannot contact VirtualHub on 127.0.0.1: '+errmsg.msg);
        return;
    }

    // Use first available device
    let anysensor = YCompass.FirstCompass();
    if(anysensor) {
        module = await anysensor.module();
    } else {
        error('No matching sensor connected, check cable !');
        await YAPI.FreeAPI();
        return;
    }
    let serial = await module.get_serialNumber();
    tilt1 = YTilt.FindTilt(serial+".tilt1");
    tilt2 = YTilt.FindTilt(serial+".tilt2");   
    compass  = YCompass.FindCompass(serial+".compass");
    gyro = YGyro.FindGyro(serial+".gyro");
    acc = YAccelerometer.FindAccelerometer(serial+".accelerometer");
    refresh();
}

async function refresh(): Promise<void>
{
    let html: string = '<h1>Yocto-3D demo</h1>';
    if (await tilt1.isOnline()) {
        html += 'Using ' + (await module.get_serialNumber()) + ' (' + (await module.get_productName()) + ')<br>';
        html += '- Tilt 1 : ' + (await tilt1.get_currentValue()) + (await tilt1.get_unit()) + '<br>';
        html += '- Tilt 2 : ' + (await tilt2.get_currentValue()) + (await tilt2.get_unit()) + '<br>';
        html += '- Compass : ' + (await compass.get_currentValue()) + (await compass.get_unit()) + '<br>';
        html += '- Gyro : ' + (await gyro.get_currentValue()) + (await gyro.get_unit()) + '<br>';
        html += '- Acceleration : ' + (await acc.get_currentValue()) + (await acc.get_unit()) + '<br>';
    } else {
        html += 'Module not connected';
    }
    document.body.innerHTML = html;
    setTimeout(refresh, 500);
}

startDemo();
