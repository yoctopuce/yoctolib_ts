/*********************************************************************
 *
 *  $Id: chooser.ts 32624 2018-10-10 13:23:29Z seb $
 *
 *  Simple radio chooser widget used in some HTML examples
 *
 *********************************************************************/
export class Chooser {
    /**
     * Creates a chooser object usable in an HTML app from a Typescript module
     *
     * @param id {string} : a unique string identifying the parameter
     * @param choices {[desc:string]:any} : an associative array of values, by description
     * @param callback {(value: any):void} : an optional callback invoked when the value is elected
     */
    constructor(id, choices = {}, callback) {
        this.cbFunct = '';
        this.id = id;
        this.choices = choices;
        if (callback) {
            this.cbFunct = `Chooser_${this.id}_Callback`;
            window[this.cbFunct] = callback;
        }
    }
    /**
     * Adds a choice to the chooser, when constructed iteratively
     *
     * @param desc {string} : the human-readable description of the choice
     * @param value {object} : the value corresponding to this choice
     */
    addChoice(desc, value) {
        this.choices[desc] = value;
    }
    /**
     * Returns HTML code to build the radio chooser
     *
     * @param currentValue {object} : current value to select (optional)
     */
    getHTML(currentValue) {
        let html = '';
        for (let desc in this.choices) {
            let key = this.choices[desc];
            let val = key.toString();
            let extra = (currentValue === key ? 'checked' : '');
            if (this.cbFunct) {
                extra += ` oninput="${this.cbFunct}('${JSON.stringify(key)}')"`;
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
    getValue(dafaultIdx) {
        let elements = document.getElementsByName(this.id);
        for (let i = 0; i < elements.length; i++) {
            if ((elements[i]).checked)
                return elements[i].value;
        }
        return (dafaultIdx !== undefined && elements.length > 0 ? elements[0].value : '');
    }
}
//# sourceMappingURL=chooser.js.map