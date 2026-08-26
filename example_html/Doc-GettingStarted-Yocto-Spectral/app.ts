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

import {YAPI, YErrorMsg, YModule} from '../../dist/esm/yocto_api_html.js';
import {YColorSensor} from '../../dist/esm/yocto_colorsensor.js';

let module: YModule;
let colorSensor: YColorSensor;

function error(msg: string)
{
    document.body.innerHTML = "<h3>Error: " + msg + "</h3>";
}

async function startDemo(): Promise<void>
{
    document.body.innerHTML = 'Trying to contact VirtualHub on local machine...';
    let errmsg = new YErrorMsg();
    if (await YAPI.RegisterHub('127.0.0.1', errmsg) != YAPI.SUCCESS) {
        error('Cannot contact VirtualHub on 127.0.0.1: ' + errmsg.msg);
        return;
    }

    // Use first available device
    colorSensor = <YColorSensor>YColorSensor.FirstColorSensor();
    console.log(colorSensor)
    if (colorSensor) {
        module = await colorSensor.get_module();
    } else {
        error('No matching sensor connected, check cable !');
        await YAPI.FreeAPI();
        return;
    }

    refresh();
}

async function refresh(): Promise<void>
{
    let html: string = '<h1>Yocto-Spectral demo</h1>';
    if (await colorSensor.isOnline()) {

        html += 'sample code yocto-spectral'
        html += 'Using ' + (await module.get_serialNumber()) + ' (' + (await module.get_productName()) + ')<br><br>';

        await colorSensor.set_workingMode(YColorSensor.WORKINGMODE_AUTO);
        await colorSensor.set_estimationModel(YColorSensor.ESTIMATIONMODEL_REFLECTION);
        let hex = await colorSensor.get_estimatedRGB();
        html += "Near color : " + await colorSensor.get_nearSimpleColor() + "<br>";
        html += "Color HEX : #" + hex.toString(16);

    } else {
        html += 'Module not connected';
    }
    document.body.innerHTML = html;
    setTimeout(refresh, 500);
}

startDemo();
