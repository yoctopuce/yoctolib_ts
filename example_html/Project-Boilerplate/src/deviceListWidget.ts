import { SensorWidget, RelayWidget } from "./functionWidgets.js";
import { YModule } from "./yoctolib/yocto_api_html.js";
import { v4 as uuidv4 } from 'uuid';

export class DeviceListWidget
{
    private readonly listDiv: HTMLElement;

    constructor(div: HTMLElement)
    {
        this.listDiv = div;
    }

    public async addDevice(module: YModule): Promise<void>
    {
        const devDiv = document.createElement('div');
        const devWdg = new DeviceWidget(devDiv, module);
        devDiv.id = await module.get_serialNumber();;
        this.listDiv.appendChild(devDiv);
        await devWdg.render();
    }

    public async delDevice(module: YModule): Promise<void>
    {
        const serialNumber: string = await module.get_serialNumber();
        const devDiv: HTMLElement|null = document.getElementById(serialNumber);
        if(devDiv) {
            this.listDiv.removeChild(devDiv);
        }
    }
}

export class DeviceWidget
{
    protected readonly div: HTMLElement;
    protected readonly device: YModule;
    protected readonly uuid: string;

    constructor(div: HTMLElement, module: YModule)
    {
        this.div = div;
        this.device = module;
        // the code below has no other purpose than demonstrating the
        // use of a third-party package import via npm (package.json)
        this.uuid = uuidv4();
    }

    public async render(): Promise<void>
    {
        let module = this.device;
        let serialNumber = await module.get_serialNumber();
        let productName = await module.get_productName();
        const functionCount: number = await module.functionCount();
        this.div.innerText = productName + ' (' + serialNumber + ')';
        this.div.style.width = '400px';
        this.div.style.textAlign = 'left';
        this.div.style.padding = '5px';
        this.div.style.marginTop = '10px';
        this.div.style.border = '1px solid #101010';
        this.div.style.borderRadius = '3px';
        for(let i = 0; i < functionCount; i++) {
            const baseType: string = await module.functionBaseType(i);
            const funcType: string = await module.functionType(i)
            const funcId: string = await module.functionId(i);
            if(baseType === 'Sensor') {
                const subDiv = document.createElement('div');
                const wdg = new SensorWidget(subDiv, serialNumber, funcId);
                this.div.appendChild(subDiv);
                await wdg.render();
            } else if(funcType === 'Relay') {
                const subDiv = document.createElement('div');
                const wdg = new RelayWidget(subDiv, serialNumber, funcId);
                this.div.appendChild(subDiv);
                await wdg.render();
            }
        }
    }
}