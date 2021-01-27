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

let l0: YDisplayLayer
let l1: YDisplayLayer
let w: number;
let h: number;
let x: number;
let y: number;
let vx: number;
let vy: number;

async function refresh()
{
  x += vx
  y += vy
  if ((x < 0) || (x > w - (h / 4))) vx = -vx
  if ((y < 0) || (y > h - (h / 4))) vy = -vy
  await l1.setLayerPosition(x, y, 0)

}

async function run()
{   let colorlist = {'Off': 0x000000,  'Red': 0xFF0000, 'Yellow': 0xFFFF00, 'Green': 0x00FF00, 'Cyan': 0x00FFFF, 'Blue': 0x0000FF, 'magenta': 0xFF00FF}
    let errmsg : YErrorMsg= new YErrorMsg();
    await YAPI.UpdateDeviceList(errmsg);

    let disp : YDisplay  = <YDisplay>YDisplay.FirstDisplay();
    if (disp)
    { let module :YModule  = await disp.get_module();
      let serial:string    = await module.get_serialNumber()
      let product : string = await module.get_productName();
      let html :string  = '<h1>Yocto-MaxiDisplay Demo</h1>';
      html +=  '<p>Using '+serial+' ('+product+')</p>'

      // display clean up
      await disp.resetAll()

      // retreive the display size
      w = await disp.get_displayWidth()
      h = await disp.get_displayHeight()

      // retreive the first layer
      l0 = await disp.get_displayLayer(0)

      // draw a circle in the top left corner of layer 1
      l1 = await disp.get_displayLayer(1)
      await l1.clear()
      await l1.drawCircle(h / 8, h / 8, h / 8)

      //display a text in the middle of the screen
      await l0.drawText(w / 2, h / 2, YDisplayLayer.ALIGN_CENTER, "Hello world!")

      //visualize each corner
      await l0.moveTo(0, 5)
      await l0.lineTo(0, 0)
      await l0.lineTo(5, 0)
      await l0.moveTo(0, h - 6)
      await l0.lineTo(0, h - 1)
      await l0.lineTo(5, h - 1)
      await l0.moveTo(w - 1, h - 6)
      await l0.lineTo(w - 1, h - 1)
      await l0.lineTo(w - 6, h - 1)
      await l0.moveTo(w - 1, 5)
      await l0.lineTo(w - 1, 0)
      await l0.lineTo(w - 6, 0)

      x = w>>1 ; y= h>>1; vx=1; vy=1;

      l1 = await  disp.get_displayLayer(1);

      setInterval(refresh,50);

      document.body.innerHTML = html;
    } else document.body.innerHTML = "No matching device found, check usb cable";


}

startDemo();
