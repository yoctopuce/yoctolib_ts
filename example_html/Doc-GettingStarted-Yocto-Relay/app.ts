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

import { YAPI, YErrorMsg  } from "../../dist/esm/yocto_api_html.js"
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
    let channelChooser : Chooser = new Chooser('serial');
    let relay = <YRelay> YRelay.FirstRelay();

    while(relay) {
        let hwid :String = await relay.get_hardwareId();
        channelChooser.addChoice( hwid + ' (' + await relay.get_friendlyName() + ')', hwid);
        relay = <YRelay>relay.nextRelay();
    }

    let hwid :string  = channelChooser.getValue(0);
    let html :string  = '<h1>Yocto-Relay demo</h1>';
    html += '<table>'
    html += '<tr><td style="vertical-align:top">Channel:</td><td>'+channelChooser.getHTML(hwid)+'</td></tr>';
    if(hwid) {
        let output : YRelay = await YRelay.FindRelay(hwid)
        let ouputChooser : Chooser= new Chooser('output', { "state A" : YRelay.STATE_A, "state B" : YRelay.STATE_B,  },
            (value) => { output.set_state(value); });
        html += '<tr><td style="vertical-align:top">Output:</td><td>'+ouputChooser.getHTML(await output.get_state())+'</td></tr>';
        
    }
    html += '</table>';
    document.body.innerHTML = html;
    setTimeout(refresh, 500);
}

startDemo();
