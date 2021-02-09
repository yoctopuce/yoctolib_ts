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

import { YAPI, YErrorMsg, YModule, YFirmwareUpdate } from 'yoctolib-cjs/yocto_api_nodejs.js';

async function upgradeSerialList(allserials: string[]): Promise<void>
{
    for(let i = 0; i < allserials.length; i++) {
        let serial: string = allserials[i];
        let module: YModule = YModule.FindModule(serial);
        let product: string = await module.get_productName();
        let current: string = await module.get_firmwareRelease();

        // check if a new firmware is available on yoctopuce.com
        let newfirm: string = await module.checkFirmware("www.yoctopuce.com", true);
        if (newfirm == '') {
            console.log(product + ' ' + serial + '(rev=' + current + ') is up to date');
        } else {
            console.log(product + ' ' + serial + '(rev=' + current + ') need be updated with firmware : ');
            console.log('    ' + newfirm);
            // execute the firmware upgrade
            let update: YFirmwareUpdate = await module.updateFirmware(newfirm);
            let status: number = await update.startUpdate();
            do {
                let newstatus = await update.get_progress();
                if (newstatus != status)
                    console.log(newstatus + '% ' + await update.get_progressMessage());
                await YAPI.Sleep(500);
                status = newstatus;
            } while (status < 100 && status >= 0);
            if (status < 0) {
                console.log('Firmware Update failed: ' + await update.get_progressMessage());
                process.exit(1);
            } else {
                if (await module.isOnline()) {
                    console.log(status + '% Firmware Updated Successfully!');
                } else {
                    console.log(status + ' Firmware Update failed: module ' + serial + ' is not online');
                    process.exit(1);
                }
            }
        }
    }
}

async function startDemo(): Promise<void>
{
    let errmsg: YErrorMsg = new YErrorMsg();

    await YAPI.LogUnhandledPromiseRejections();

    // check if last argument is a valid hub IP address
    let lastWord: string = process.argv[process.argv.length-1];
    if(await YAPI.TestHub(lastWord, 5000, errmsg) == YAPI.SUCCESS) {
        console.log('Using hub '+lastWord);
        await YAPI.RegisterHub(lastWord, errmsg);
    } else if(await YAPI.RegisterHub('127.0.0.1', errmsg) != YAPI.SUCCESS) {
        console.log('Cannot contact VirtualHub on 127.0.0.1: '+errmsg.msg);
        return;
    }

    let hubs: string[] = [];
    let shields: string[] = [];
    let devices: string[] = [];
    // first step: construct the list of all hub /shield and devices connected
    let module: YModule | null = YModule.FirstModule();
    while (module != null) {
        let product: string = await module.get_productName();
        let serial: string = await module.get_serialNumber();
        if (product.substr(0, 15) == 'YoctoHub-Shield') {
            shields.push(serial);
        } else if (product.substr(0, 8) == 'YoctoHub') {
            hubs.push(serial);
        } else if (product.substr(0, 10) != 'VirtualHub') {
            devices.push(serial);
        }
        module = module.nextModule();
    }
    // first upgrades all Hubs...
    await upgradeSerialList(hubs);
    // ... then all shield..
    await upgradeSerialList(shields);
    // ... and finaly all devices
    await upgradeSerialList(devices);
    console.log('All devices are now up to date');

    await YAPI.FreeAPI();
}

startDemo();
