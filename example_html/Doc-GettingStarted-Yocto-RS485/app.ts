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
let addrInput: HTMLInputElement;
let regInput: HTMLInputElement;
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
    let html: string = '<h1>Yocto-RS485 demo</h1>';
    html += 'Using ' + (await module.get_serialNumber()) + ' (' + (await module.get_productName()) + ')<br>';
    html +=  "Please enter the MODBUS slave address (1...255)"
    html += '<br>Adress:  <input id="addr" value=""> <br>';
    html += "then Enter a Coil No (>=1), Input Bit No (>=10001+),<br>";
    html += "Input Register No (>=30001) or Register No (>=40001)<br>";
    html += '<br>  <input id="reg" value=""> and press enter<br>';
    html +=  '<br>';
    html +=  'received:<br>';
    html +=  '<span id="reception"  style="font-family:courier"></span>';
    document.body.innerHTML = html;
    addrInput = document.getElementById("addr") as HTMLInputElement;
    regInput = document.getElementById("reg") as HTMLInputElement;
    received = document.getElementById("reception") as HTMLSpanElement;
    regInput.addEventListener("keydown",(e:KeyboardEvent) => { if (e.key== 'Enter')  send();})

}

async function send(): Promise<void>
{   if (! await port.isOnline())
     { document.body.innerHTML = "Device has been disconnected";
       return
     }

     let addr : number =  parseInt(addrInput.value) ;
     if (!(addr >= 1) &&  (addr <= 255))
      { alert("slave addr bus must be in [1..255]");
       return;
      }

    let reg : number =  parseInt(regInput.value) ;
     if ((reg < 1) || (reg >= 50000) || ((reg % 10000)==0))
      { alert("invalid coil/ input bit /input register / register");
        return;
      }

     let val:number
    if (reg >= 40001)  val = (await port.modbusReadRegisters(addr, reg - 40001, 1))[0]
    else if (reg >= 30001)  val = (await port.modbusReadInputRegisters(addr, reg - 30001, 1))[0]
    else if (reg >= 10001)  val = (await  port.modbusReadInputBits(addr, reg - 10001, 1))[0]
    else  val = (await port.modbusReadBits(addr, reg - 1, 1))[0]

    received.innerText+="received "+val.toString()+"\n";

}


startDemo();
