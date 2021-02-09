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

import { YAPI, YErrorMsg, YModule } from './node_modules/yoctolib-esm/yocto_api_html.js'
import { YRelay } from './node_modules/yoctolib-esm/yocto_relay.js'

let UpRelay: YRelay | null = null;
let DownRelay: YRelay | null = null;

// Creates simple vector images for UP and down buttons
let upIcon: string = '<svg height="30ex" width="30ex" viewBox="0 0 16 16"><title>UP</title>'
    +'<polygon points="2,14 14,14 8,4" style="fill:#B0B0B0;stroke:#808080;'
    +'stroke-width:1;stroke-linecap:round;stroke-linejoin:round"/></svg>'
let downIcon: string = '<svg height="30ex" width="30ex" viewBox="0 0 16 16"><title>'
    +'UP</title><polygon points="2,2 14,2 8,12" style="fill:#B0B0B0;'
    +'stroke:#808080;stroke-width:1;stroke-linecap:round;stroke-linejoin:round"'
    +'/></svg>'

function shtml(elementId: string, innerHTML: string)
{
    let wdg = document.getElementById(elementId);
    if(wdg) wdg.innerHTML = innerHTML;
}

async function init()
{
    let addr = location.hostname;
    await YAPI.LogUnhandledPromiseRejections();
    await YAPI.DisableExceptions();

    // Sets up the API to use the hosting Yoctohub-Ethernet
    let errmsg = new YErrorMsg();
    if(await YAPI.RegisterHub(addr, errmsg) != YAPI.SUCCESS)
    {
        shtml('UP','<b>Cannot contact Hub on '+addr+': '+errmsg.msg+'</b>');
        return;
    }

    // finds the relays, we expect to find two relays
    // named "UP" and "DOWN"
    let anyRelay = YRelay.FirstRelay();
    if(anyRelay) {
        let module: YModule = await anyRelay.module();
        let serial: string = await module.get_serialNumber();
        UpRelay = YRelay.FindRelay(serial+".UP");
        DownRelay = YRelay.FindRelay(serial+".DOWN");
    } else {
        shtml('UP', '<b>No Relay available</b>');
        return;
    }
    // updates the UI with UP and DOWN arrow buttons
    let mainUI: HTMLElement = <HTMLElement>document.getElementById("mainUI");
    let scale = Math.min(window.innerWidth * 0.9,window.innerHeight * 0.45) / mainUI.offsetWidth;
    mainUI.style.transform = "translate(-50%,-50%) scale("+scale+","+scale+")";
    shtml("UP", "<a href='javascript:shutterUp();'>"+upIcon+"</a>");
    shtml("DOWN", "<a href='javascript:shutterDown();'>"+downIcon+"</a>");
}

// Up button call back
(window as any).shutterUp = async function()
{
    if(UpRelay && await UpRelay.isOnline()) {
        await UpRelay.pulse(250);
    } else {
        alert("UP Relay is offline");
    }
};

// DOWN button call back
(window as any).shutterDown = async function()
{
    if(DownRelay && await DownRelay.isOnline()) {
        await DownRelay.pulse(250);
    } else {
        alert("DOWN Relay is offline");
    }
};

init();