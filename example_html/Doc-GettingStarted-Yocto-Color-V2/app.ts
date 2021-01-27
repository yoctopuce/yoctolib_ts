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
import { YColorLedCluster } from "../../dist/esm/yocto_colorledcluster.js"



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

    let ledcluster : YColorLedCluster  = <YColorLedCluster>YColorLedCluster.FirstColorLedCluster();
    if (ledcluster)
    { let module :YModule  = await ledcluster.get_module();
      let serial:string    = await module.get_serialNumber()
      let product : string = await module.get_productName();

      let html :string  = '<h1>Yocto-Color-V2 Demo</h1>';
      html +=  '<p>Using '+serial+' ('+product+')</p>'
      html += '<table>';
      let led1chooser : Chooser= new Chooser('l1output',  colorlist,(value ) => {  ledcluster.set_rgbColor(0,1,value); });
      html += '<tr><td style="vertical-align:top">Led 1:</td><td>'+led1chooser.getHTML((await ledcluster.get_rgbColorArray(0, 1) )[0] )+'</td></tr>';

      let led2chooser : Chooser= new Chooser('l2output', colorlist,(value ) => {  ledcluster.rgb_move(1,1,value,500); });
      html += '<tr><td style="vertical-align:top">Led 2:</td><td>'+led2chooser.getHTML((await ledcluster.get_rgbColorArray(1, 1) )[0] )+'</td></tr>';

      let Allledchooser : Chooser= new Chooser('Alloutput', colorlist,(value ) => {  ledcluster.set_rgbColor(0,2,value); });
      html += '<tr><td style="vertical-align:top">Both leds:</td><td>'+Allledchooser.getHTML(-1 )+'</td></tr>';


      html += '</table>';
        document.body.innerHTML = html;
    } else document.body.innerHTML = "No matching device found";

    setTimeout(refresh, 500);
}

startDemo();
