/*********************************************************************
 *
 *  $Id: chooser.ts 32624 2018-10-10 13:23:29Z seb $
 *
 *  Simple radio chooser widget used in some HTML examples
 *
 *********************************************************************/

export class Chooser
{
    private id: string;
    private choices: {[desc:string]:any};
    private cbFunct: string = '';

    /**
     * Creates a chooser object usable in an HTML app from a Typescript module
     *
     * @param id {string} : a unique string identifying the parameter
     * @param choices {[desc:string]:any} : an associative array of values, by description
     * @param callback {(value: any):void} : an optional callback invoked when the value is elected
     */
    constructor(id: string, choices: {[desc:string]:any} = {}, callback?: { (value: any): void })
    {
        this.id = id;
        this.choices = choices;
        if(callback) {
            this.cbFunct = `Chooser_${this.id}_Callback`;
            (window as any)[this.cbFunct] = callback;
        }
    }

    /**
     * Adds a choice to the chooser, when constructed iteratively
     *
     * @param desc {string} : the human-readable description of the choice
     * @param value {object} : the value corresponding to this choice
     */
    addChoice(desc: string, value: any)
    {
        this.choices[desc] = value;
    }

    /**
     * Returns HTML code to build the radio chooser
     *
     * @param currentValue {object} : current value to select (optional)
     */
    getHTML(currentValue?: any): string
    {
        let html = '';
        for(let desc in this.choices) {
            let key: any = this.choices[desc];
            let val: string = key.toString();
            let extra: string = (currentValue === key ? 'checked' : '');
            if(this.cbFunct) {
                let handler = JSON.stringify(key).replace(/"/g,'&#34;');
                extra += ` oninput="${this.cbFunct}(${handler})"`;
            }
            html += `<input type="radio" name="${this.id}" value="${val}" ${extra}>&nbsp;${desc}<br> `;
        }
        return html;
    }

    /**
     * Returns the value of the chooser as currently displayed on document
     *
     * @param dafaultIdx {number} : default value to return if none is selected (optional)
     */
    getValue(dafaultIdx?: number): string
    {
        let elements: NodeListOf<HTMLInputElement> = <NodeListOf<HTMLInputElement>>document.getElementsByName(this.id);
        for(let i = 0; i < elements.length; i++) {
            if((elements[i]).checked) return elements[i].value;
        }
        return (dafaultIdx !== undefined && elements.length > 0 ? elements[0].value : '');
    }
}