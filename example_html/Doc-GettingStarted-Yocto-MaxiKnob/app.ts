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

import { YAPI, YErrorMsg , YModule } from "../../dist/esm/yocto_api_html.js"
import { YBuzzer } from "../../dist/esm/yocto_buzzer.js"
import { YColorLedCluster } from "../../dist/esm/yocto_colorledcluster.js"
import { YAnButton } from "../../dist/esm/yocto_anbutton.js"
import { YQuadratureDecoder } from "../../dist/esm/yocto_quadraturedecoder.js"

var first_run: boolean = true;
var lastPos: number = 0;

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
    refresh();
}

function notefreq(note: number)
{
    return 220.0 * Math.exp(note * Math.log(2) / 12);
}

async function refresh(): Promise<void>
{
    let errmsg : YErrorMsg= new YErrorMsg();
    await YAPI.UpdateDeviceList(errmsg);

    let buz : YBuzzer = <YBuzzer>YBuzzer.FirstBuzzer();
    if (buz) {
        let html: string = '<h1>Yocto-MaxiKnob Demo</h1>';
        let module: YModule = await buz.get_module();
        let serial: string = await module.get_serialNumber();
        let product: string = await module.get_productName();
        html += '<p>Using ' + serial + ' (' + product + ')</p>';
        let leds: YColorLedCluster = YColorLedCluster.FindColorLedCluster(serial + ".colorLedCluster");
        let button: YAnButton = YAnButton.FindAnButton(serial + ".anButton1");
        let qd: YQuadratureDecoder = YQuadratureDecoder.FindQuadratureDecoder(serial + ".quadratureDecoder1");
        if  (!await button.isOnline() || !await qd.isOnline()) {
            html += "<h3>Make sure the Yocto-MaxiKnob is configured with at least on AnButton and  one QuadratureDecoder !</h3>";
            document.body.innerHTML = html;
            return;
        }
        html += "press button #1 or turn encoder #1";
        if (first_run) {
            lastPos = await qd.get_currentValue() >> 0;
            await buz.set_volume(75);
            first_run = false;
        }
        if (await button.get_isPressed() == YAnButton.ISPRESSED_TRUE) {
            lastPos = 0;
            await qd.set_currentValue(0);
            await buz.playNotes("'E32 C8");
            await leds.set_rgbColor(0, 1, 0x000000);
        } else {
            let p: number = await qd.get_currentValue() >> 0;
            if (lastPos != p) {
                lastPos = p;
                await buz.pulse(notefreq(p), 100);
                await leds.set_hslColor(0, 1, 0x00FF7f | (p % 255) << 16);
            }
        }
        document.body.innerHTML = html;
    } else {
        error("No matching device found");
    }
    setTimeout(refresh, 10);
}

startDemo();
