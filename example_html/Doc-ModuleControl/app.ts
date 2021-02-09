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

import { YAPI, YErrorMsg, YModule } from "../../dist/esm/yocto_api_html.js"
import { Chooser } from "./chooser.js"

function error(msg: string)
{
    document.body.innerHTML = "<h3>Error: "+msg+"</h3>";
}

async function startDemo()
{
    document.body.innerHTML = 'Trying to contact VirtualHub on local machine...';
    let errmsg = new YErrorMsg();
    if(await YAPI.RegisterHub('127.0.0.1', errmsg) != YAPI.SUCCESS) {
        error('Cannot contact VirtualHub on 127.0.0.1: '+errmsg.msg);
    }
    refresh();
}

async function refresh()
{
    let errmsg = new YErrorMsg();
    await YAPI.UpdateDeviceList(errmsg);
    let deviceChooser = new Chooser('serial');
    let module = YModule.FirstModule();
    while(module) {
        let serial = await module.get_serialNumber();
        deviceChooser.addChoice(serial + ' (' + await module.get_productName() + ')', serial);
        module = module.nextModule();
    }
    let serial = deviceChooser.getValue(0);
    let html = '<h1>Module control</h1>';
    html += '<table>'
    html += '<tr><td>Serial:</td><td>'+deviceChooser.getHTML(serial)+'</td></tr>';
    if(serial) {
        let module = YModule.FindModule(serial);
        let beaconChooser = new Chooser('beacon', { 'OFF': YModule.BEACON.OFF, 'ON': YModule.BEACON.ON },
            (value) => { module.set_beacon(value); });
        html += '<tr><td>Logical name: </td><td>'+await module.get_logicalName()+'</td></tr>';
        html += '<tr><td>Luminosity:   </td><td>'+await module.get_luminosity()+'%</td></tr>';
        html += '<tr><td>Beacon:       </td><td>'+beaconChooser.getHTML(await module.get_beacon())+'</td></tr>';
        html += '<tr><td>UpTime:       </td><td>'+((await module.get_upTime()/1000)>>0)+' sec</td></tr>';
        html += '<tr><td>USB current:  </td><td>'+await module.get_usbCurrent()+' mA</td></tr>';
        html += '<tr><td>Device logs:</td><td>';
        html += '<textarea cols="80" rows="15">' + await module.get_lastLogs() + '</textarea></td></tr>';
    }
    html += '</table>';
    document.body.innerHTML = html;
    setTimeout(refresh, 500);
}

startDemo();
