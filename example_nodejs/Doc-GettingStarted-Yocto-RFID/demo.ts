/*********************************************************************
 *
 *  $Id: svn_id $
 *
 *  An example that shows how to use a  Yocto-RFID-xxxx
 *
 *  You can find more information on our web site:
 *   Yocto-RFID-15693 documentation:
 *      https://www.yoctopuce.com/EN/products/Yocto-rfid-15693
 *   TypeScript API Reference:
 *      https://www.yoctopuce.com/EN/doc/reference/yoctolib-typescript-EN.html
 *
 *********************************************************************/

import { YAPI, YErrorMsg } from 'yoctolib-cjs/yocto_api_nodejs.js';
import { YBuzzer } from "yoctolib-cjs/yocto_buzzer.js"
import { YColorLedCluster } from "yoctolib-cjs/yocto_colorledcluster.js"
import { YAnButton } from "yoctolib-cjs/yocto_anbutton.js"
import { YRfidReader,YRfidTagInfo,YRfidStatus,YRfidOptions } from "yoctolib-cjs/yocto_rfidreader.js"


var buz: YBuzzer;
var leds: YColorLedCluster;
var button: YAnButton;
var reader: YRfidReader;

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
    if(serial[8] != '-') {
        // by default use any connected module suitable for the demo
        let reader = YRfidReader.FirstRfidReader();
        if(reader) {
            let module = await reader.module();
            serial = await module.get_serialNumber();
        } else {
            console.log('No matching sensor connected, check cable !');
            return;
        }
    }
    console.log('Using device '+serial);
    buz = YBuzzer.FindBuzzer(serial + ".buzzer");
    leds = YColorLedCluster.FindColorLedCluster(serial + ".colorLedCluster");
    button = YAnButton.FindAnButton(serial + ".anButton1");
    reader = YRfidReader.FindRfidReader(serial + ".rfidReader");

    await buz.set_volume(75);
    await leds.set_rgbColor(0,10,0)

    console.log("Place a RFID tag near the antenna")

    let tagList : string[] = []
    while (tagList.length<=0)
    { tagList = await reader.get_tagIdList()
    }
    let tagId       = tagList[0]
    let opStatus : YRfidStatus   = new YRfidStatus()
    let options   :YRfidOptions  = new YRfidOptions()
    let taginfo   : YRfidTagInfo  = await reader.get_tagInfo(tagId,opStatus)
    let blocksize : number   = taginfo.get_tagBlockSize()
    let  firstBlock : number= taginfo.get_tagFirstBlock()
    console.log("Tag ID          = "+taginfo.get_tagId())
    console.log("Tag Memory size = "+taginfo.get_tagMemorySize().toString()+" bytes")
    console.log("Tag Block  size = "+taginfo.get_tagBlockSize().toString()+" bytes")

    let data : string = await reader.tagReadHex(tagId, firstBlock, 3*blocksize, options, opStatus)
    if (opStatus.get_errorCode()==YRfidStatus.SUCCESS)
    { console.log ("First 3 blocks  = "+data)
      await leds.set_rgbColor(0,1,0x00FF00)
      await buz.pulse(1000,100)
    }
    else
    { console.log("Cannot read tag contents ("+opStatus.get_errorMessage()+")")
        await leds.set_rgbColor(0, 1, 0xFF0000)
    }
    await leds.rgb_move(0, 1, 0x000000, 200)
    await YAPI.FreeAPI()

}



startDemo();
