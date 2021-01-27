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
import { YRelay } from "../../dist/esm/yocto_relay.js"

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
    let deviceChooser : Chooser = new Chooser('serial');
    let relay = <YRelay>YRelay.FirstRelay();
   
    let html :string  = '<h1>Yocto-PowerRelay demo</h1>';
    if (relay!=null)
    { let module : YModule =  await relay.get_module();
      let serial : string  =  await module.get_serialNumber()
      let product : string =  await module.get_productName()
      html += '<table>'
      html += '<tr><td style="vertical-align:top">device :</td><td>'+serial +'('+product+')</td></tr>';
      let ouputChooser: Chooser = new Chooser('output', {
            'State A': YRelay.STATE_A,
            'State B': YRelay.STATE_B,
           },
          (value: number) => { relay.set_state(value); });
      html += '<tr><td style="vertical-align:top">Output:</td><td>' + ouputChooser.getHTML(await relay.get_state()) + '</td></tr>';
      html += '</table>';
    } else  html += '<p>No matching module found, check USB cable</p>';
    document.body.innerHTML = html;
    setTimeout(refresh, 500);
}

startDemo();
