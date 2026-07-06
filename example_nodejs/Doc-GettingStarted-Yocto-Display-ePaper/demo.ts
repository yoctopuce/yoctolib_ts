/*********************************************************************
 *
 *  $Id: demo.ts 75107 2026-07-03 17:05:23Z mvuilleu $
 *
 *  An example that shows how to use a  Yocto-Display-ePaper
 *
 *  You can find more information on our web site:
 *   Yocto-Display-ePaper documentation:
 *      https://www.yoctopuce.com/EN/products/yocto-display-epaper/doc.html
 *   TypeScript API Reference:
 *      https://www.yoctopuce.com/EN/doc/reference/yoctolib-typescript-EN.html
 *
 *********************************************************************/

import { YAPI, YErrorMsg, YModule } from 'yoctolib-cjs/yocto_api_nodejs.js';
import { YDisplay, YDisplayLayer } from 'yoctolib-cjs/yocto_display.js'

let disp: YDisplay;
let l0: YDisplayLayer;
let h: number;
let w: number;
let middleX: number;
let middleY: number;
let paneltype :string

async function startDemo(): Promise<void>
{
    await YAPI.LogUnhandledPromiseRejections();

    // Setup the API to use the VirtualHub on local machine
    let errmsg: YErrorMsg = new YErrorMsg();
    if(await YAPI.RegisterHub('127.0.0.1', errmsg) != YAPI.SUCCESS) {
        console.log('Cannot contact VirtualHub on 127.0.0.1: '+errmsg.msg);
        return;
    }

    // Select specified device, or use first available one
    let serial: string = process.argv[process.argv.length-1];
    if (serial[8] != '-') {
        let anydisplay = YDisplay.FirstDisplay();
        if (anydisplay) {
            let module: YModule = await anydisplay.get_module();
            serial = await module.get_serialNumber();
        } else {
            console.log('No matching device connected, check cable !');
            await YAPI.FreeAPI();
            return;
        }
    }

    disp = YDisplay.FindDisplay(serial + ".display");

    //clean up
    await disp.resetAll();

    // Makes sure the Panel type is set
    paneltype = await disp.get_displayPanel();
    if (paneltype== "NOT_SET")
    {  console.log( "Use the virtual hub application to configure the panel first");
        return;
    }

    // retrieve the display size
    w = await disp.get_displayWidth();
    h = await disp.get_displayHeight();
    middleX = Math.floor(w / 2);
    middleY = Math.floor(h / 2);
    console.log("Using:"+await disp.get_serialNumber() +"(Panel: " + paneltype + " " + w + "x" + h+ "pixels)");

    //clean up
    await disp.resetAll();
    await disp.regenerateDisplay();  // makes sure the next refresh will be a full one

    // retrieve the first layer
    l0 = await disp.get_displayLayer(0) as YDisplayLayer;
    await  l0.selectFont("medium.yfm");


    refresh();

}

async function refresh(): Promise<void>
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

startDemo();
