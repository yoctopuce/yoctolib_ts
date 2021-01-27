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
import { YAPI, YErrorMsg } from '../../dist/esm/yocto_api_html.js';
import { YVoc } from '../../dist/esm/yocto_voc.js';
let module;
let voc;
function error(msg) {
    document.body.innerHTML = "<h3>Error: " + msg + "</h3>";
}
async function startDemo() {
    document.body.innerHTML = 'Trying to contact VirtualHub on local machine...';
    let errmsg = new YErrorMsg();
    if (await YAPI.RegisterHub('127.0.0.1', errmsg) != YAPI.SUCCESS) {
        error('Cannot contact VirtualHub on 127.0.0.1: ' + errmsg.msg);
        return;
    }
    // Use first available device
    voc = YVoc.FirstVoc();
    if (voc == null) {
        error('No matching sensor connected, check cable !');
        await YAPI.FreeAPI();
        return;
    }
    module = await voc.module();
    refresh();
}
async function refresh() {
    let html = '<h1>Yocto-VOC demo</h1>';
    if (await voc.isOnline()) {
        html += 'Using ' + (await module.get_serialNumber()) + ' (' + (await module.get_productName()) + ')<br>';
        html += '- voc : ' + (await voc.get_currentValue()) + (await voc.get_unit()) + '<br>';
    }
    else {
        html += 'Module not connected';
    }
    document.body.innerHTML = html;
    setTimeout(refresh, 500);
}
startDemo();
//# sourceMappingURL=app.js.map