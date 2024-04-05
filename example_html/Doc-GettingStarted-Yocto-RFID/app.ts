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
import { YColorLedCluster } from "../../dist/esm/yocto_colorledcluster.js"
import { YAnButton } from "../../dist/esm/yocto_anbutton.js"
import { YRfidReader, YRfidStatus , YRfidOptions, YRfidTagInfo } from "../../dist/esm/yocto_rfidreader.js"


function writeln(str:string)
{   let para : HTMLParagraphElement= document.createElement("p") as HTMLParagraphElement;
    para.innerText = str;
    document.body.appendChild(para);
}


async function startDemo(): Promise<void>
{
    document.body.innerHTML = 'Trying to contact VirtualHub on local machine...';
    let errmsg = new YErrorMsg();
    if(await YAPI.RegisterHub('127.0.0.1', errmsg) != YAPI.SUCCESS) {
        writeln('Cannot contact VirtualHub on 127.0.0.1: '+errmsg.msg);
        return;
    }
    refresh(true);
}


async function refresh(firstCall: boolean): Promise<void>
{
    let errmsg : YErrorMsg= new YErrorMsg();
    await YAPI.UpdateDeviceList(errmsg);

    let reader : YRfidReader = <YRfidReader>YRfidReader.FirstRfidReader();
    if (reader) {

        let module: YModule = await reader.get_module();
        let serial: string  = await module.get_serialNumber();
        let product: string = await module.get_productName();

        let leds: YColorLedCluster = YColorLedCluster.FindColorLedCluster(serial + ".colorLedCluster");
        let button: YAnButton = YAnButton.FindAnButton(serial + ".anButton1");
        let buzzer: YBuzzer = YBuzzer.FindBuzzer(serial + ".buzzer");

        await buzzer.set_volume(75)
        await leds.set_rgbColor(0,1,0);
        if (firstCall)
        { let html: string    = '<h1>Yocto-Rfid Demo</h1>';
          html += '<p>Using ' + serial + ' (' + product + ')</p>';
          document.write(html);
          document.write("Place a RFID tag near the antenna");
        }

        let tagList: string[]  = await reader.get_tagIdList();
        if (tagList.length<=0)
        { setTimeout(()=>{refresh(false);},250)
          return
        }

        let tagId       : string       = tagList[0]
        let opStatus    : YRfidStatus  = new YRfidStatus()
        let options     : YRfidOptions = new YRfidOptions()
        let taginfo     : YRfidTagInfo = await reader.get_tagInfo(tagId,opStatus)
        let blocksize   : number       = taginfo.get_tagBlockSize()
        let  firstBlock : number       = taginfo.get_tagFirstBlock()
        writeln("Tag ID          = "+taginfo.get_tagId())
        writeln("Tag Memory size = "+taginfo.get_tagMemorySize().toString()+" bytes")
        writeln("Tag Block  size = "+taginfo.get_tagBlockSize().toString()+" bytes")

        let data = await reader.tagReadHex(tagId, firstBlock, 3*blocksize, options, opStatus)
        if (opStatus.get_errorCode()==YRfidStatus.SUCCESS)
        {  writeln ("First 3 blocks  = "+data)
           await leds.set_rgbColor(0,1,0x00FF00)
           await buzzer.pulse(1000,100)
        }
        else
        {  writeln("Cannot read tag contents ("+opStatus.get_errorMessage()+")")
            await leds.set_rgbColor(0, 1, 0xFF0000)
        }
        await leds.rgb_move(0, 1, 0x000000, 200)
        await YAPI.FreeAPI()
        writeln("Reload the page to try again");

    } else {
        writeln("No matching device found");
    }

}

startDemo();
