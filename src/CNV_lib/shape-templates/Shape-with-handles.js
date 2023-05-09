import Store from '../Store';
import { clickRegister } from '../Engine/events-engine/events-register/click-register';
import { mouseupRegister } from '../Engine/events-engine/events-register/mouseup-register';
import { mousedownRegister } from '../Engine/events-engine/events-register/mousedown-register';
import { mouseleaveRegister } from '../Engine/events-engine/events-register/mouseleave-register';
import { mouseoverRegister } from '../Engine/events-engine/events-register/mouseover-register';
import { mouseenterRegister } from '../Engine/events-engine/events-register/mouseenter-register';
import selfEvent from '../Engine/events-engine/selfEvent';
import { Shape } from './Shape';

export class ShapeWithHandles extends Shape {
    constructor(link, id) {
        super(link, id);

        mouseoverRegister({ id: this.id });
        mouseenterRegister({ id: this.id });
        mouseleaveRegister({ id: this.id });
        mouseupRegister({ id: this.id });
        mousedownRegister({ id: this.id });
        clickRegister({ id: this.id });
    }

    set onmouseover(callback) {
        Store.state.mouseover[this.id][0] = callback;
    }

    set onmouseenter(callback) {
        Store.state.mouseenter[this.id][0] = callback;
    }

    set onmouseleave(callback) {
        Store.state.mouseleave[this.id][0] = callback;
    }

    set onclick(callback) {
        Store.state.click[this.id][0] = callback;
    }

    set onmouseup(callback) {
        Store.state.mouseup[this.id][0] = callback;
    }

    set onmousedown(callback) {
        Store.state.mousedown[this.id][0] = callback;
    }

    set ondrag(callback) {
        const move = e => {
            callback(selfEvent(e, Store.state.shapes[this.id]));
        };

        Store.state.mousedown[this.id][1] = e => {
            Store.state.canvas.addEventListener('mousemove', move);
        };

        Store.state.mouseup[Store.state.layout.link.id][this.id] = e => {
            Store.state.canvas.removeEventListener('mousemove', move);
        };
    }
}
