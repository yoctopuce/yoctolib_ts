/*
 * Entry point for a simple TypeScript HTML application
 */

import { Const } from "./constants.js";
import { DeviceListWidget } from './deviceListWidget.js';
import { YAPI, YErrorMsg, YModule } from "./yoctolib/yocto_api_html.js";

export class WebApp
{
    private readonly origin: string;
    private readonly deviceList: DeviceListWidget;
    private readonly hintDiv: HTMLDivElement;
    private readonly devListDiv: HTMLDivElement;

    constructor(hostname: string)
    {
        this.origin = hostname;
        this.hintDiv = document.createElement('div');
        this.devListDiv = document.createElement('div');;
        this.deviceList = new DeviceListWidget(this.devListDiv);
    }

    private async initDisplay(): Promise<void>
    {
        const body = document.getElementById('body') as HTMLElement;
        const root: HTMLElement = document.createElement('div');
        const title: HTMLElement = document.createElement('h2');
        title.innerText = Const.appTitle;
        document.title = Const.appTitle;
        body.style.textAlign = 'center';
        body.style.background = 'linear-gradient(to bottom, #d0f0ff, #e0f8ff)';
        body.replaceChildren(title, root);
        root.style.display = 'inline-block';
        root.style.width = '410px';
        root.replaceChildren(this.hintDiv, this.devListDiv);
    }

    public async run(): Promise<void>
    {
        let errorMsg: YErrorMsg = new YErrorMsg()

        await this.initDisplay();
        await YAPI.RegisterDeviceArrivalCallback((module: YModule) => this.deviceList.addDevice(module));
        await YAPI.RegisterDeviceRemovalCallback((module: YModule) => this.deviceList.delDevice(module));
        await YAPI.PreregisterHub(this.origin, errorMsg);
        while(true) {
            await YAPI.UpdateDeviceList();
            if(YModule.FirstModule() !== null) {
                this.hintDiv.innerHTML = "This is the list of Yoctopuce devices found:";
            } else if(['127.0.0.1','localhost','::1'].includes(this.origin)) {
                this.hintDiv.innerHTML = "Trying to connect to VirtualHub on local machine...";
            } else {
                this.hintDiv.innerHTML = "Trying to connect to "+this.origin+"...";
            }
            await YAPI.Sleep(500);
        }
    }
}
