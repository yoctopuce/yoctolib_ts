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
import { YVoltageOutput } from "../../dist/esm/yocto_voltageoutput.js"

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
    let output = YVoltageOutput.FirstVoltageOutput();
    while(output) {
        let hwid :String = await output.get_hardwareId();
        deviceChooser.addChoice( hwid + ' (' + await output.get_friendlyName() + ')', hwid);
        output = output.nextVoltageOutput();
    }
    let hwid :string  = deviceChooser.getValue(0);
    let html :string  = '<h1>Yocto-0-10V-tx control</h1>';
    html += '<table>'
    html += '<tr><td style="vertical-align:top">Channel:</td><td>'+deviceChooser.getHTML(hwid)+'</td></tr>';
    if(hwid) {
        let output : YVoltageOutput = await YVoltageOutput.FindVoltageOutput(hwid)
        let ouputChooser : Chooser= new Chooser('output', { '0V': 0,'0.1V': 0.1, '0.25V': 0.25, '0.5V': 0.5, '1V': 1,'2V': 2,'5V': 5,'7.5V': 7.5, "10V":10 },
            (value) => { output.set_currentVoltage(value); });
        html += '<tr><td style="vertical-align:top">Output:</td><td>'+ouputChooser.getHTML(await output.get_currentVoltage())+'</td></tr>';
        
    }
    html += '</table>';
    document.body.innerHTML = html;
    setTimeout(refresh, 500);
}

startDemo();
