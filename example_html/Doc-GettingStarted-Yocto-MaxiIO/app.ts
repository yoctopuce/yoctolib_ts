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

import { YAPI, YErrorMsg, YModule } from '../../dist/esm/yocto_api_html.js';
import {  YDigitalIO } from '../../dist/esm/yocto_digitalio.js'

let module: YModule;
let io: YDigitalIO;
let outputdata :number = 0

function error(msg: string)
{
    document.body.innerHTML = "<h3>Error: "+msg+"</h3>";
}

async function startDemo(): Promise<void>
{
    document.body.innerHTML = 'Trying to contact VirtualHub on local machine...';
    let errmsg = new YErrorMsg();
    if(await YAPI.RegisterHub('127.0.0.1', errmsg) != YAPI.SUCCESS) {
        error('Cannot contact VirtualHub on 127.0.0.1: '+errmsg.msg);
        return;
    }

    // Use first available device
    io = <YDigitalIO>YDigitalIO.FirstDigitalIO();
    if(io)
    {   module = await io.get_module();

        // # lets configure the channels direction
        // # bits 0..3 as output
        // # bits 4..7 as input
        await io.set_portDirection(0x0F)
        await io.set_portPolarity(0)   // polarity set to regular
        await io.set_portOpenDrain(0)  // No open drain


    } else {
        error('No matching device connected, check cable !');
        await YAPI.FreeAPI();
        return;
    }

    refresh();
}

async function refresh(): Promise<void>
{
    let html: string = '<h1>Yocto-MaxiIO demo</h1>';
    if (await io.isOnline()) {
        html += 'Using ' + (await module.get_serialNumber()) + ' (' + (await module.get_productName()) + ')<br><br>';
        html +="Channels 0..1 are configured as outputs and channels 2..3<br>"
        html +="are configured as inputs, you can connect some inputs to<br> "
        html +="ouputs and see what happens<br><br>"

        let inputdata :number = await io.get_portState()  // read port values
        let line :string  = ""  // display part state value as binary
        for (let i :number=0;i<8;i++)
          if ((inputdata & (128 >> i)) > 0) line += '1'; else  line += '0'
        html +=" port value = <tt>" + line+"</tt>";
        outputdata = (outputdata + 1) % 16;  // cycle ouput 0..15
        io.set_portState(outputdata)  // We could have used set_bitState as well

    } else {
        html += 'Module not connected';
    }
    document.body.innerHTML = html;
    setTimeout(refresh, 500);
}



startDemo();
