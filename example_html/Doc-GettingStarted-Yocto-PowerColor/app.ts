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
import { YColorLed } from "../../dist/esm/yocto_colorLed.js"



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
{   let colorlist = {'Off': 0x000000,  'Red': 0xFF0000, 'Yellow': 0xFFFF00, 'Green': 0x00FF00, 'Cyan': 0x00FFFF, 'Blue': 0x0000FF, 'magenta': 0xFF00FF}
    let errmsg : YErrorMsg= new YErrorMsg();
    await YAPI.UpdateDeviceList(errmsg);

    let anyLed : YColorLed  = <YColorLed>YColorLed.FirstColorLed();
    if (anyLed)
    { let module :YModule  = await anyLed.get_module();
      let serial:string    = await module.get_serialNumber()
      let product : string = await module.get_productName();
      let led :  YColorLed  = <YColorLed>YColorLed.FindColorLed(serial+".colorLed1");

      let html :string  = '<h1>Yocto-PowerColor Demo</h1>';
      html +=  '<p>Using '+serial+' ('+product+')</p>'
      html += '<table>';
      let ledchooser : Chooser= new Chooser('output', colorlist,(value ) => {  led.rgbMove(value,500); });
      html += '<tr><td style="vertical-align:top">Led :</td><td>'+ledchooser.getHTML(await led.get_rgbColor() )+'</td></tr>';
      html += '</table>';
        document.body.innerHTML = html;
    } else document.body.innerHTML = "No matching device found";

    setTimeout(refresh, 500);
}

startDemo();
