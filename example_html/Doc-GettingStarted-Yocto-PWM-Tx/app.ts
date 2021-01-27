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

import { YAPI, YModule, YErrorMsg  } from "../../dist/esm/yocto_api_html.js"
import { YPwmOutput } from "../../dist/esm/yocto_pwmoutput.js"

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

let module :YModule;
let channel1 : YPwmOutput;
let channel2 : YPwmOutput;

async function setChannelValue( channel : YPwmOutput, freq:number, dutycycle:number)
{ await channel.set_frequency(freq)
  await channel.set_dutyCycle(dutycycle)
  await channel.set_enabled(YPwmOutput.ENABLED_TRUE);

}

async function refresh()
{
    let errmsg : YErrorMsg= new YErrorMsg();
    await YAPI.UpdateDeviceList(errmsg);
    let deviceChooser : Chooser = new Chooser('serial');
    let anyPWM = YPwmOutput.FirstPwmOutput();
    if(anyPWM) {
        module = await anyPWM.module();
    } else {
        error('No matching sensor connected, check cable !');
        await YAPI.FreeAPI();
        return;
    }
    let serial = await module.get_serialNumber();
    channel1  = YPwmOutput.FindPwmOutput(serial+".pwmOutput1");
    channel2  = YPwmOutput.FindPwmOutput(serial+".pwmOutput2");




    let html :string  = '<h1>Yocto-PWM-tx Demo</h1>';
    html += 'Using ' + (await module.get_serialNumber()) + ' (' + (await module.get_productName()) + ')<br>';
    if (await channel1.isOnline())
    {

        let ouputChooser1 : Chooser= new Chooser('output1', { '1Hz':1,'10Hz': 10,'100Hz':100, '1kHz':1000, '10kHz':10000},
          (value) => {  setChannelValue( channel1 ,value,50); });

        let ouputChooser2 : Chooser= new Chooser('output2', { '10%':10,'25%': 25,'50%':50, '75%':75},
          (value) => {  setChannelValue( channel2 ,1000,value); });

     html += '<table>'
     html += '<tr><td style="vertical-align:top">set Output 1 frequency:</td><td>'+ouputChooser1.getHTML(await channel1.get_frequency())+'</td></tr>';
     html += '<tr><td style="vertical-align:top">set Output 2 dutty cycle:</td><td>'+ouputChooser2.getHTML(await channel2.get_dutyCycle())+'</td></tr>';
     html += '</table>';
    } else html +=  "device is not connected"

    document.body.innerHTML = html;
    setTimeout(refresh, 500);
}

startDemo();
