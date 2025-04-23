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
import { YAPI, YErrorMsg } from '../../src/yocto_api_html.js';
import { YSpectralSensor } from '../../src/yocto_spectralsensor.js';
let module;
let spectralSensor;
function error(msg) {
    document.body.innerHTML = "<h3>Error: " + msg + "</h3>";
}
async function startDemo() {
    document.body.innerHTML = 'Trying to contact VirtualHub on local machine...';
    let errmsg = new YErrorMsg();
    if (await YAPI.RegisterHub('127.0.0.1', errmsg) != YAPI.SUCCESS) {
        error('Cannot contact VirtualHub on 127.0.0.1: ' + errmsg.msg);
        return;
    }
    // Use first available device
    spectralSensor = YSpectralSensor.FirstSpectralSensor();
    console.log(spectralSensor);
    if (spectralSensor) {
        module = await spectralSensor.get_module();
    }
    else {
        error('No matching sensor connected, check cable !');
        await YAPI.FreeAPI();
        return;
    }
    refresh();
}
async function refresh() {
    let html = '<h1>Yocto-Spectral demo</h1>';
    if (await spectralSensor.isOnline()) {
        html += 'sample code yocto-spectral';
        html += 'Using ' + (await module.get_serialNumber()) + ' (' + (await module.get_productName()) + ')<br><br>';
        await spectralSensor.set_workingMode(YColorSensor.WORKINGMODE_AUTO);
        await spectralSensor.set_estimatedModel(YColorSensor.ESTIMATIONMODEL_REFLECTION);
        let hex = await spectralSensor.get_estimatedRGB();
        html += "Near color : " + await spectralSensor.get_nearSimpleColor() + "<br>";
        html += "Color HEX : #" + hex.toString(16);
    }
    else {
        html += 'Module not connected';
    }
    document.body.innerHTML = html;
    setTimeout(refresh, 500);
}
startDemo();
//# sourceMappingURL=app.js.map