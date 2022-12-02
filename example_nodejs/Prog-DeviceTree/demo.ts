/*********************************************************************
 *
 *  $Id: svn_id $
 *
 *  Prog-DeviceTree example
 *
 *  You can find more information on our web site:
 *   TypeScript API Reference:
 *      https://www.yoctopuce.com/EN/doc/reference/yoctolib-typescript-EN.html
 *
 *********************************************************************/

import { YAPI, YErrorMsg, YModule } from 'yoctolib-cjs/yocto_api_nodejs.js';
import { YHubPort } from 'yoctolib-cjs/yocto_hubport.js';

class YoctoShield
{
    private _serial: string;
    private _subdevices: string[] = [];

    public constructor(serial: string)
    {
        this._serial = serial;
    }

    public getSerial(): string
    {
        return this._serial;
    }

    public async addSubdevice(serial: string): Promise<boolean>
    {
        for (let i: number = 1; i <= 4; i++) {
            let p: YHubPort = YHubPort.FindHubPort(this._serial + ".hubPort" + i.toString());
            if (await p.get_logicalName() == serial) {
                this._subdevices.push(serial);
                return true;
            }
        }
        return false;
    }

    public async removeSubDevice(serial: string): Promise<void>
    {
        let idx: number = this._subdevices.indexOf(serial);
        if(idx >= 0) {
            this._subdevices.splice(idx, 1);
        }
    }

    public describe(): void
    {
        console.log("  " + this._serial);
        for (let i: number = 0; i < this._subdevices.length; i++) {
            console.log("    " + this._subdevices[i]);
        }
    }
}

class RootDevice
{
    private _serial: string;
    private _url: string;
    private _shields: YoctoShield[] = [];
    private _subdevices: string[] = [];

    public constructor(serialnumber: string, url: string)
    {
        this._serial = serialnumber;
        this._url = url;
    }

    public getSerial(): string
    {
        return this._serial;
    }

    public async addSubDevice(serial: string): Promise<void>
    {
        if (serial.slice(0, 7) == "YHUBSHL") {
            this._shields.push(new YoctoShield(serial));
        } else {
            // Device to plug look if the device is plugged on a shield
            for(let shield of this._shields) {
                if(await shield.addSubdevice(serial))
                    return;
            }
            this._subdevices.push(serial);
        }
    }

    public async removeSubDevice(serial: string): Promise<void>
    {
        let idx: number = this._subdevices.indexOf(serial);
        if(idx >= 0) {
            this._subdevices.splice(idx, 1);
        }
        for(let i: number = this._shields.length - 1; i >= 0; i--) {
            if (this._shields[i].getSerial() == serial) {
                this._shields.splice(i, 1);
            } else {
                this._shields[i].removeSubDevice(serial);
            }
        }
    }

    public describe(): void
    {
        console.log(this._serial + " (" + this._url + ")");
        for(let serial of this._subdevices) {
            console.log("  " + serial);
        }
        for(let shield of this._shields) {
            shield.describe();
        }
    }
}


let __rootDevices: { [serial: string]: RootDevice } = {};

async function removalCallback(module: YModule): Promise<void>
{
    let serial: string = await module.get_serialNumber();
    for(let key in __rootDevices) {
        __rootDevices[key].removeSubDevice(serial);
    }
    if(__rootDevices[serial]) {
        delete __rootDevices[serial];
    }
}

async function arrivalCallback(module: YModule): Promise<void>
{
    let serial: string = await module.get_serialNumber();
    let parentHub: string = await module.get_parentHub();
    if (parentHub == "") {
        // root device
        let url: string = await module.get_url();
        if(!__rootDevices[serial]) {
            __rootDevices[serial] = new RootDevice(serial, url);
        }
    } else {
        let hub: RootDevice = __rootDevices[parentHub];
        if (parentHub != null) {
            hub.addSubDevice(serial);
        }
    }
}


async function startDemo(): Promise<void>
{
    await YAPI.LogUnhandledPromiseRejections();

    // Setup the API to use the VirtualHub on local machine
    let errmsg = new YErrorMsg();
    if (await YAPI.RegisterHub('127.0.0.1', errmsg) != YAPI.SUCCESS) {
        console.log('Cannot contact VirtualHub on 127.0.0.1');
        return;
    }

    // each time a new device is connected/discovered
    // arrivalCallback will be called.
    YAPI.RegisterDeviceArrivalCallback(arrivalCallback);
    // each time a device is disconnected/removed
    // removalCallback will be called.
    YAPI.RegisterDeviceRemovalCallback(removalCallback);

    refresh();
}

async function refresh(): Promise<void>
{
    try {
        let errmsg: YErrorMsg = new YErrorMsg();
        await YAPI.UpdateDeviceList(errmsg);
        console.log("**** device inventory *****");
        for(let hubSerial in __rootDevices) {
            __rootDevices[hubSerial].describe();
        }
        setTimeout(refresh, 5000);
    } catch(e) {
        console.log(e);
    }
}

startDemo();
