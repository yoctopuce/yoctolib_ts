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
import { YBuzzer } from "../../dist/esm/yocto_buzzer.js"
import { YLed } from "../../dist/esm/yocto_led.js"
import { YAnButton } from "../../dist/esm/yocto_anbutton.js"



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

    let buzoutput : YBuzzer  = <YBuzzer>YBuzzer.FirstBuzzer();
    if (buzoutput)
    {


      let html :string  = '<h1>Yocto-Buzzer Demo</h1>';
      let module : YModule = await buzoutput.get_module();
      let serial : string = await module.get_serialNumber();
      let product : string = await module.get_productName();
      html +=  '<p>Using '+serial+' ('+product+')</p>'
      html += '<table>'
      let buzOuputChooser : Chooser= new Chooser('buzoutput', { '1000Hz': 1000, '2000Hz': 2000, '3000Hz': 3000, 'ringtone' : "'C64 Bb C Bb C Bb C Bb C Bb C Bb C Bb C Bb C Bb" ,'May 4th': "120% G12 G G C2 \\'G4 F12 E D \\'C2 G4 F12 E D \\'C2 G4 F12 E F D2."  },
          (value ) => { if (typeof value === 'string' ) {buzoutput.playNotes(value)}
                                          else { buzoutput.pulse(value ,1000);}
        });
      html += '<tr><td style="vertical-align:top">buzzer:</td><td>'+buzOuputChooser.getHTML(await buzoutput.get_frequency() )+'</td></tr>';

      let led1: YLed = YLed.FindLed(serial+".led1")
      let led1chooser : Chooser= new Chooser('l1output', { 'OFF': YLed.POWER_OFF, 'ON': YLed.POWER_ON},
        (value ) => {  led1.set_power(value);  led1.set_blinking(YLed.BLINKING_STILL);});
      html += '<tr><td style="vertical-align:top">Led 1:</td><td>'+led1chooser.getHTML(await led1.get_power() )+'</td></tr>';

      let led2: YLed = YLed.FindLed(serial+".led2")
      let led2chooser : Chooser= new Chooser('l2output', { 'OFF': YLed.POWER_OFF, 'ON': YLed.POWER_ON},
        (value ) => {  led2.set_power(value);  led2.set_blinking(YLed.BLINKING_STILL);});
      html += '<tr><td style="vertical-align:top">Led 2:</td><td>'+led2chooser.getHTML(await led2.get_power() )+'</td></tr>';

      let button1: YAnButton = YAnButton.FindAnButton(serial+".anButton1")
      html += '<tr><td style="vertical-align:top">Button 1:</td><td>'+(await button1.get_calibratedValue()).toString()+'</td></tr>';

      let button2: YAnButton = YAnButton.FindAnButton(serial+".anButton2")
      html += '<tr><td style="vertical-align:top">Button 2:</td><td>'+(await button2.get_calibratedValue()).toString()+'</td></tr>';

      html += '</table>';
        document.body.innerHTML = html;
    } else document.body.innerHTML = "No matching device found";


    setTimeout(refresh, 500);
}

startDemo();
