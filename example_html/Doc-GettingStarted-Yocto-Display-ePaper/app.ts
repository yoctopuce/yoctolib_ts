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
import { YDisplay, YDisplayLayer } from "../../dist/esm/yocto_display.js"


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
    run();
}
let disp : YDisplay|null
let l0: YDisplayLayer|null
let w: number;
let h: number;
let middleX: number;
let middleY: number;
let paneltype :string

const colors :number[] =  [0xFFFFFF, 0x000000, 0xFF0000, 0xFFFF00 ];

async function refresh()
  {
    let errmsg = new YErrorMsg();
    const colors =  [0xFFFFFF, 0x000000, 0xFF0000, 0xFFFF00 ];
    if (disp && l0 && await disp.isOnline())
    { // prevent refreshing for max 2 sec
      await disp.postponeRefresh(2000);
      await l0.clear();
      // draw a few circles
      for (var i = 0; i < 15; i++)
      {
        let  cx = Math.floor(Math.random()* w);
        let  cy = Math.floor(Math.random() *h)
        let   r = Math.floor((h / 20) + Math.random() *(h / 10));
        await l0.selectFillColor(colors[Math.floor(Math.random()* 4)]);
        await l0.drawDisc(cx, cy, r);
        await l0.drawCircle(cx, cy, r);
      }
      // draw a rectangle with panel type in it
      await l0.selectFillColor(0xffffff);
      await l0.drawBar(middleX - 75, middleY - 10, middleX + 75, middleY + 12);
      await l0.drawRect(middleX - 75, middleY - 10, middleX + 75, middleY + 12);
      await l0.drawText(middleX, middleY, YDisplayLayer.ALIGN_CENTER, paneltype);
      // forces a full refresh only the 1rst time

      await disp.triggerRefresh(); // display is allowed to refresh  again
      await YAPI.Sleep(1000, errmsg);
      // if no fast refresh available, don't even try to run animations
      if (paneltype.indexOf("KS") >=  0)  setTimeout(refresh, 5);

  }

}

async function run()
{
    let errmsg : YErrorMsg= new YErrorMsg();
    await YAPI.UpdateDeviceList(errmsg);

    disp   =YDisplay.FirstDisplay();
    if (disp)
    { let module :YModule  = await disp.get_module();
      let serial:string    = await module.get_serialNumber()
      let product : string = await module.get_productName();
      let html :string  = '<h1>Yocto-Display-ePaper Demo</h1>';

      //clean up
      await disp.resetAll();

      // Makes sure the Panel type is set
      paneltype = await disp.get_displayPanel();
      if (paneltype== "NOT_SET")
      { alert( "Use the virtual to configure the panel first");
        return;
      }

      // retrieve the display size
      w = await disp.get_displayWidth();
      h = await disp.get_displayHeight();
      middleX = Math.floor(w / 2);
      middleY = Math.floor(h / 2);
      html += ("Using:"+await disp.get_serialNumber() +"(Panel: " + paneltype + " " + w + "x" + h+ "pixels)");

      //clean up
      await disp.resetAll();
      await disp.regenerateDisplay();  // makes sure the next refresh will be a full one

      // retrieve the first layer
      l0 = await disp.get_displayLayer(0) as YDisplayLayer;
      await  l0.selectFont("medium.yfm");

      document.body.innerHTML = html;
      refresh();


    } else document.body.innerHTML = "No matching device found, check usb cable";


}

startDemo();
