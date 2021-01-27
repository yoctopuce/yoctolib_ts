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

import { YLed } from "../../dist/esm/yocto_led.js"



import { Chooser } from "./chooser.js"

function error(msg: string)
{
    document.body.innerHTML = "<h3>Error: "+msg+"</h3>";
}

async function startDemo()
{
    document.body.innerHTML = 'Trying to contact VirtualHub on local machine...';
    let errmsg : YErrorMsg = new YErrorMsg();
    if(await YAPI.RegisterHub('127.0.0.1', errmsg) != YAPI.SUCCESS) {
        error('Cannot contact VirtualHub on 127.0.0.1: '+errmsg.msg);
    }
    refresh();
}

async function refresh()
{
    let errmsg : YErrorMsg= new YErrorMsg();
    await YAPI.UpdateDeviceList(errmsg);

    let led : YLed  = <YLed>YLed.FirstLed();
    if (YLed)
    {
      let html :string  = '<h1>Yocto-Demo</h1>';
      let module : YModule = await led.get_module();
      let serial : string = await module.get_serialNumber();
      let product : string = await module.get_productName();
      html +=  '<p>Using '+serial+' ('+product+')</p>'
      html += '<table>'

      let pwrchooser : Chooser= new Chooser('power', { 'OFF': YLed.POWER_OFF, 'ON': YLed.POWER_ON},
        (value ) => {  led.set_power(value);  ;});
      html += '<tr><td style="vertical-align:top">Power:</td><td>'+pwrchooser.getHTML(await led.get_power() )+'</td></tr>';

      let modechooser : Chooser= new Chooser('mode', { "Still":YLed.BLINKING_STILL,"Relay": YLed.BLINKING_RELAX, "Aware":YLed.BLINKING_AWARE,"Run" : YLed.BLINKING_RUN, "Call" : YLed.BLINKING_CALL ,"Panic" : YLed.BLINKING_PANIC},
        (value ) => {  led.set_blinking(value);  ;});
      html += '<tr><td style="vertical-align:top">Power:</td><td>'+modechooser.getHTML(await led.get_blinking() )+'</td></tr>';

      let lumchooser : Chooser= new Chooser('lum', { "25%":25,"50%":50, "75%":75,"100%":100 },
        (value ) => {  led.set_blinking(value);  ;});
      html += '<tr><td style="vertical-align:top">Power:</td><td>'+lumchooser.getHTML(await led.get_luminosity() )+'</td></tr>';

      html += '</table>';
        document.body.innerHTML = html;
    } else document.body.innerHTML = "No matching device found";


    setTimeout(refresh, 500);
}

startDemo();
