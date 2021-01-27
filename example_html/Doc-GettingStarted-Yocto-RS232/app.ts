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
import { YSerialPort } from '../../dist/esm/yocto_serialport.js'

let module: YModule;
let port: YSerialPort;
let input: HTMLInputElement;
let received: HTMLSpanElement;

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
    port = <YSerialPort> YSerialPort.FirstSerialPort();
    if(port == null )
    {
        error('No matching sensor connected, check cable !');
        await YAPI.FreeAPI();
        return;
    }
    module = await port.module();
    let serial = await module.get_serialNumber();
    let html: string = '<h1>Yocto-RS232 demo</h1>';
    await port.set_serialMode("9600,8N1")
    await port.set_protocol("Line")
    await port.reset()
    html += 'Using ' + (await module.get_serialNumber()) + ' (' + (await module.get_productName()) + ')<br>';
    html += '<br>Type text  <input id="in" value=""> and press enter<br>';
    html +=  '<br>';
    html +=  'received:<br>';
    html +=  '<span id="reception"  style="font-family:courier"></span>';
    document.body.innerHTML = html;
    input = document.getElementById("in") as HTMLInputElement;
    received = document.getElementById("reception") as HTMLSpanElement;
    input.addEventListener("keydown",(e:KeyboardEvent) => { if (e.key== 'Enter')  send();})

}

async function send(): Promise<void>
{   if (! await port.isOnline())
     { document.body.innerHTML = "Device has been disconnected";
       return
     }
    let line :string =  input.value ;
    if  (line !="")
    {   input.value="";
        await port.writeLine(line);
        setTimeout(receive,500)
    }
}

async function receive(): Promise<void>
{   if (! await port.isOnline())
     { document.body.innerHTML = "Device has been disconnected";
       return
     }
    let line  :string = await port.readLine()
    if ( line != "") received.innerText+=line+"\n"

}


startDemo();
