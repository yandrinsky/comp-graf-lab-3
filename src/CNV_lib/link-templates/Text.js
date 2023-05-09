import Standard from './Standard';
import Store from '../Store';

class Text extends Standard {
    constructor(config) {
        super({ ...config, type: 'text' });
        this.text = config.text;
    }

    getSize() {
        const { context } = Store.state;
        const lastFont = context.font;
        const styles = this.getCSS();

        context.font = `${styles.fontSize} ${styles.fontFamily}`;

        const metrics = context.measureText(this.text);
        let height = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
        let padding = Number(String(styles.padding).split('px')[0]);

        context.font = lastFont;

        return {
            width: metrics.width + padding * 2,
            height: height + padding * 2,
            padding
        };
    }

    getCoords() {
        const { width, height, padding } = this.getSize();

        return {
            start: {
                x: this.start.x,
                y: this.start.y
            },

            width,
            height,
            padding
        };
    }

    getShiftCoords() {
        const { width, height, padding } = this.getSize();

        return {
            start: {
                x: this.start.x - Store.state.shift.x,
                y: this.start.y + Store.state.shift.y
            },

            width,
            height,
            padding
        };
    }

    updateText(text) {
        this.text = text;
    }
}

export default Text;
