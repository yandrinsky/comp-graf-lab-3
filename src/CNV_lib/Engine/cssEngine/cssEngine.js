import {combineStyles} from "./combineStyles";

export class CSSEngine {
    constructor(props) {
        this.css = props.css;
        this.defaultStyles = props.defaultStyles ?? {};
    }

    getStyles({classes, type, ownStyle}) {
        return combineStyles({classes, type, ownStyle, css: this.css, defaultStyles: this.defaultStyles});
    }
}