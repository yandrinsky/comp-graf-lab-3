import { sortShapesByIndex } from './sortShapesByIndex';
import { CSSEngine } from '../cssEngine/cssEngine';
import { defaultStyles } from './defaultStyles';

export class StyleEngine {
    constructor({ css }) {
        this.CSSEngine = new CSSEngine({ css: css, defaultStyles: defaultStyles });
        this.css = css;
        this.cache = { combineStyles: {} };
        this.defaultStyles = defaultStyles;
    }

    getShapeStyles(shape) {
        //TODO нужно настроить сброс кэширования. Обновились внутренние стили Shape (style), а кэш тут не сбросился.
        // Но не хочется, чтобы объект Shape что-то знал о кэше и что-то сбрасывал там. Нужно видимо выдавать Proxy
        // Объект из CSSEngine в качестве ownStyle и при изменении сбрасывать кэш. И ког этот будет находиться в CSSEngine.

        // if (!this.cache.combineStyles[shape.id]) {
        this.cache.combineStyles[shape.id] = this.CSSEngine.getStyles({
            classes: shape.classList,
            type: shape.type,
            ownStyle: shape.style
        });
        // }

        return this.cache.combineStyles[shape.id];
    }

    sortShapesByIndex(shapes) {
        return sortShapesByIndex({ getShapeStyles: this.getShapeStyles.bind(this), shapes });
    }
}
