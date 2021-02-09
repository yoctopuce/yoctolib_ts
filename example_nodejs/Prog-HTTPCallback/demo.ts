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

import { YAPI, YAPIContext, YErrorMsg, YModule } from 'yoctolib-cjs/yocto_api_nodejs.js';
import * as http from 'http';

async function HttpCallbackHandler(message: http.IncomingMessage, response: http.ServerResponse)
{
    // Here you can filter the requests by URL if you want
    console.log('Received ' + message.method + ' request for ' + message.url);

    // The part below starts the Yoctopuce library in HTTP Callback mode and interacts
    // with modules connected on the VirtualHub or YoctoHub that made the HTTP request
    let errmsg: YErrorMsg = new YErrorMsg();
    let yctx: YAPIContext = new YAPIContext();
    if(await yctx.RegisterHubHttpCallback(message, response, errmsg) != YAPI.SUCCESS) {
        console.log('HTTP callback error: '+errmsg);
        response.write('Error: '+errmsg);
        response.end();
        yctx.FreeAPI();
        return;
    }
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write('HTTP callback start<br>\n');

    // Display a list of modules on incoming hub to the Node.js console
    await yctx.UpdateDeviceList(errmsg);
    let module: YModule | null = YModule.FirstModuleInContext(yctx);
    while(module) {
        let msg: string = (await module.get_serialNumber()) + ' (' + (await module.get_productName()) + ')';
        console.log(msg);
        response.write(msg+'<br>\n');
        module = module.nextModule();
    }
    yctx.FreeAPI();

    response.write('HTTP callback completed<br>\n');
    response.end();
}

YAPI.LogUnhandledPromiseRejections();

// Instantiate a simple HTTP server
http.createServer(HttpCallbackHandler).listen(8044);

console.log('Node.js HTTP Callback server running at http://...:8044/');
