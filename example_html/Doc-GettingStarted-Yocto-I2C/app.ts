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
import {  YI2cPort } from '../../dist/esm/yocto_i2cport.js'

let module: YModule;
let i2cPort: YI2cPort;

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
    i2cPort = <YI2cPort>YI2cPort.FirstI2cPort();
    console.log(i2cPort)
    if(i2cPort)
    {   module = await i2cPort.get_module();
    } else {
        error('No matching sensor connected, check cable !');
        await YAPI.FreeAPI();
        return;
    }

    refresh();
}

async function refresh(): Promise<void>
{
    let html: string = '<h1>Yocto-I2C demo</h1>';
    if (await i2cPort.isOnline())
    {


        html += 'sample code reading MCP9804 temperature sensor at I2C address 0x1F'
        html += 'Using ' + (await module.get_serialNumber()) + ' (' + (await module.get_productName()) + ')<br><br>';
        // sample code reading MCP9804 temperature sensor (I2C address 0x1F)
        i2cPort.set_i2cMode("100kbps,1000ms,NoRestart")
        i2cPort.set_i2cVoltageLevel(YI2cPort.I2CVOLTAGELEVEL_3V3)
        i2cPort.reset()
        // do not forget to configure the powerOutput and
        // of the Yocto-I2C as well if used
        let received : number[];
        let toSend : number[] = [0x05]
        try
        {    received = await i2cPort.i2cSendAndReceiveArray(0x1f, toSend, 2) }
        catch (e)
        { html += e.toString();
          document.body.innerHTML = html;
          return;
        }
        let tempReg = (received[0] << 8) | received[1]
        if (tempReg & 0x1000)
          tempReg -= 0x2000   // perform sign extension
        else
           tempReg &= 0x0fff  // clear status bits
        html += "Ambiant temperature: " +(tempReg / 16.0).toFixed(1)+"&deg;C";

    } else {
        html += 'Module not connected';
    }
    document.body.innerHTML = html;
    setTimeout(refresh, 500);
}

startDemo();
