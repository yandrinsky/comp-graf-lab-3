import uniqueId from '../uniqueId';
import Store from '../Store';

// const config = {
//     x0: number,
//     y0: number,
//     id?: any,
//     className?: string,
//     uniqueId?: string,
//     isSticky?: boolean,
// }

class Standard {
    constructor(config) {
        this.id = config.uniqueId || uniqueId();
        this.type = config.type;

        if (config.className) {
            if (config.className instanceof Array) {
                this.classList = config.className;
            } else {
                this.classList = [config.className];
            }
        } else {
            this.classList = [];
        }

        this.style = {};

        this.start = {
            x: config.x0,
            y: config.y0
        };

        this.userId = config.id || undefined;

        //todo delete
        this.isSticky = config.isSticky ?? false;

        //todo delete
        this.events = {
            mouseenter: false
        };
    }

    getCSS() {
        return Store.state.styleEngine.getShapeStyles(this);
    }
}

export default Standard;
