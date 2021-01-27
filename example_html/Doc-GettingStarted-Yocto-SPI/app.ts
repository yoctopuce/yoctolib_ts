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
import { YSpiPort } from '../../dist/esm/yocto_spiport.js'

let module: YModule;
let port: YSpiPort;


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
    port = <YSpiPort> YSpiPort.FirstSpiPort();
    if(port == null )
    {
        error('No matching device connected, check cable !');
        await YAPI.FreeAPI();
        return;
    }
    module = await port.module();
    let serial = await module.get_serialNumber();
    let html: string = '<h1>Yocto-SPI demo (MAX7219 7-segment display driver)</h1>';
    html+="<pre>****************************\n"
    html+="* make sure voltage levels *\n"
    html+="* are properly configured  *\n"
    html+="****************************\n</pre>"
    html+="<br><br>Displaying <span id='value'></span>"

    document.body.innerHTML = html;
    // sample code driving MAX7219 7-segment display driver
    //such as SPI7SEGDISP8.56 from www.embedded-lab.com
    await port.set_spiMode("250000,3,msb")
    await port.set_ssPolarity(YSpiPort.SSPOLARITY_ACTIVE_LOW)
    await port.set_protocol("Frame:5ms")
    await port.reset()

    // initialize MAX7219
    await port.writeHex('0c01')  // Exit from shutdown state
    await port.writeHex('09ff')  // Enable BCD for all digits
    await port.writeHex('0b07')  // Enable digits 0-7 (=8 in total)
    await port.writeHex('0a0a')  // Set medium brightness

    display(0)

}

async function display(value:number): Promise<void>
{   if (! await port.isOnline())
     { error( "Device has been disconnected");
       return
     }

    (<HTMLSpanElement>document.getElementById('value')).innerText=value.toString()
     let n :number= value
    for ( let i :number =1; i<9;i++ )
    { let digit :number = n % 10
      await port.writeArray([i, digit])
      n = (n / 10) >>0
    }
    setTimeout(()=>{display(value+1)},1000)
}



startDemo();
