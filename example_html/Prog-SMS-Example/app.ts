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
import { YMessageBox, YSms } from '../../dist/esm/yocto_messagebox.js'

let module: YModule;
let mbox: YMessageBox;

function error(msg: string): void
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
    mbox = <YMessageBox> YMessageBox.FirstMessageBox();
    if(mbox === null) {
        error('No matching sensor connected, check cable !');
        await YAPI.FreeAPI();
        return;
    }
    module = await mbox.module();
    let serial: string = await module.get_serialNumber();
    let html: string = '<h1>SMS support demo</h1>';
    html += 'Using ' + serial + ' (' + (await module.get_productName()) + ')<br>';

    // show existing messages on the SIM card
    html += "Messages found on the SIM Card:<br>";
    let messages: YSms[] = await mbox.get_messages()
    if(!messages.length) {
        html += "* No messages found<br>";
    } else {
        for(let sms of messages) {
            html += '- <table><tr><td>dated </td><td>' + await sms.get_timestamp() + '</td></tr>';
            html += '<tr><td>from </td><td>' + await sms.get_sender() + '</td></tr>';
            html += '<tr><td></td><td>"' + await sms.get_textData() + '"</td></tr></table>';
        }
    }

    // offer to send a new message
    html += '<br>You can send a new message:<br><table>';
    html += '<tr><td>Recipient:</td><td><input id="smsDest" placeholder="+xxxxxxxxxx"></td></tr>';
    html += '<tr><td>Message text:</td><td><input id="smsText" placeholder="say something"></td></tr>';
    html +=  '<tr><td><button id="sendButton">Send SMS</button></td></tr></table>';
    html +=  '<br>';
    html +=  'New messages received:<br>';
    html +=  '<div id="received"></div>';
    document.body.innerHTML = html;

    // register a callback to receive any new message
    mbox.registerSmsCallback(smsCallback);
    (<HTMLInputElement>document.getElementById("sendButton")).onclick = send;
}

async function send(): Promise<void>
{
    if (!await mbox.isOnline()) {
        document.body.innerHTML = "Device has been disconnected";
        return;
    }
    let dest: string = (<HTMLInputElement>document.getElementById('smsDest')).value;
    let text: string = (<HTMLInputElement>document.getElementById('smsText')).value;
    if (dest && text) {
        await mbox.sendTextMessage(dest, text);
        (<HTMLInputElement>document.getElementById('smsText')).value = '';
    }
}

async function smsCallback(mbox: YMessageBox, sms: YSms): Promise<void>
{
    let html: string = '- <table>';
    html += '<tr><td>dated </td><td>' + await sms.get_timestamp() + '</td></tr>';
    html += '<tr><td>from </td><td>' + await sms.get_sender() + '</td></tr>';
    html += '<tr><td></td><td>' + await sms.get_textData() + '</td></tr></table>';
    (<HTMLDivElement>document.getElementById('received')).innerHTML += html;
    await sms.deleteFromSIM();
}

startDemo();
