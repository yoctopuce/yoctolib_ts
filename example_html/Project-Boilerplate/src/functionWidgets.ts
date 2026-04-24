import { YSensor, YMeasure } from "./yoctolib/yocto_api_html.js";
import { YRelay } from "./yoctolib/yocto_relay.js";

export class FunctionWidget
{
    protected readonly div: HTMLElement;
    protected readonly hwId: string;
    protected readonly funcId: string;

    constructor(div: HTMLElement, serialNumber: string, functionId: string)
    {
        this.div = div;
        this.hwId = serialNumber + '.' + functionId;
        this.funcId = functionId;
    }
}

export class SensorWidget extends FunctionWidget
{
    public async render(): Promise<void>
    {
        let sensor = YSensor.FindSensor(this.hwId);
        let unit = await sensor.get_unit();
        this.div.innerHTML = this.funcId + ': <span id="' + this.hwId + '">_</span> ' + unit;
        this.div.style.marginLeft = '20px';
        await sensor.set_reportFrequency("1/s");
        await sensor.registerTimedReportCallback((sensor: YSensor, value: YMeasure) => this.sensorCallback(sensor, value))
    }

    private async sensorCallback(sensor: YSensor, value: YMeasure): Promise<void>
    {
        let funcHwId: string = await sensor.get_hardwareId();
        let wdg: HTMLElement|null = document.getElementById(funcHwId);
        if(wdg) wdg.innerText = value.get_averageValue().toString();
    }
}

export class RelayWidget extends FunctionWidget
{
    public async render(): Promise<void>
    {
        let relay = YRelay.FindRelay(this.hwId);
        let labelOff = document.createElement('label');
        let radioOff = document.createElement('input');
        let labelOn = document.createElement('label');
        let radioOn = document.createElement('input');
        radioOff.name = this.hwId;
        radioOff.type = "radio";
        radioOff.value = "A";
        radioOff.onclick = () => relay.set_state(YRelay.STATE_A);
        radioOn.name = this.hwId;
        radioOn.type = "radio";
        radioOn.value = "B";
        radioOn.onclick = () => relay.set_state(YRelay.STATE_B);
        labelOn.appendChild(radioOn);
        labelOn.appendChild(document.createTextNode('Turn On '));
        labelOff.appendChild(radioOff);
        labelOff.appendChild(document.createTextNode('Turn Off'));
        this.div.style.marginLeft = '20px';
        this.div.replaceChildren(labelOn, labelOff);
        await relay.registerValueCallback((relay: YRelay, value: string) => this.relayChangeCallback(relay, value))
    }

    private async relayChangeCallback(relay: YRelay, value: string): Promise<void>
    {
        let funcHwId: string = await relay.get_hardwareId();
        let wdgList: NodeListOf<HTMLElement> = document.getElementsByName(funcHwId);
        for(const wdg of wdgList) {
            const radio = wdg as HTMLInputElement;
            if(radio.value === value) {
                radio.checked = true;
            }
        }
    }
}