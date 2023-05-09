import { render } from '../Engine/render';
import { ShapeWithHandles } from './Shape-with-handles';

export class Circle extends ShapeWithHandles {
    constructor(config) {
        super(config);
    }

    get update() {
        const link = this.link;

        return {
            get start() {
                return {
                    set x(x) {
                        link.start.x = x;
                        render();
                    },

                    set y(y) {
                        link.start.y = y;
                        render();
                    }
                };
            },

            get startPosition() {
                return {
                    set x(x) {
                        link.start.x = x;
                        render();
                    },

                    set y(y) {
                        link.start.y = y;
                        render();
                    }
                };
            },

            set text(text) {
                link.text = text;
                render();
            }
        };
    }
}
