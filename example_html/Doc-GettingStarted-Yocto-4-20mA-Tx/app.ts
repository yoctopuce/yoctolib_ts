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
import { YCurrentLoopOutput } from "../../dist/esm/yocto_currentloopoutput.js"

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
    let output = YCurrentLoopOutput.FirstCurrentLoopOutput();
   
    let html :string  = '<h1>Yocto-4-20-tx demo</h1>';
    if (output!=null)
    { let module : YModule =  await output.get_module();
      let serial : string  =  await module.get_serialNumber()
      let product : string =  await module.get_productName()
      html += '<table>'
      html += '<tr><td style="vertical-align:top">device :</td><td>'+serial +'('+product+')</td></tr>';
      if (await output.get_loopPower() == YCurrentLoopOutput.LOOPPOWER_POWEROK)
      {
        let ouputChooser: Chooser = new Chooser('output', {
            '4mA': 4,
            '4.1mA': 4.1,
            '4.25mA': 4.25,
            '4.5mA': 4.5,
            '5mA': 5,
            '7.5mA': 7.5,
            "10mA": 10,
            "15mA": 15,
            "20mA": 20
          },
          (value: number) => { (<YCurrentLoopOutput>output).set_current(value); });
        html += '<tr><td style="vertical-align:top">Output:</td><td>' + ouputChooser.getHTML(await output.get_current()) + '</td></tr>';
      } else  html += '<tr><td colspan="2"> Current loop is not properly powered </td></tr>';

         html += '</table>';
    } else  html += '<p>No matching module found, check USB cable</p>';

    document.body.innerHTML = html;
    setTimeout(refresh, 500);
}

startDemo();
