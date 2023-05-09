import availableProperties from '../Engine/cssEngine/availableProperties';
import { render } from '../Engine/render';
import Store from '../Store';

export class Shape {
    constructor(link, id) {
        this.link = link;
        this.id = id;

        this.styleProp = {};

        availableProperties.forEach(property => {
            link = this.link;

            Object.defineProperty(this.styleProp, property, {
                get: function () {
                    return link.style[property];
                },

                set: function (arg) {
                    link.style[property] = arg;
                    render();
                }
            });
        });
    }

    get system() {
        const __this = this;

        return {
            getID() {
                return __this.id;
            }
        };
    }

    get coordinates() {
        return this.link.getShiftCoords();
    }

    get classList() {
        let link = this.link;

        return {
            add(className) {
                if (!link.classList.includes(className)) {
                    link.classList.push(className);
                    render();
                }
            },

            remove(className) {
                const index = link.classList.indexOf(className);
                if (index !== -1) {
                    link.classList.splice(index, 1);
                    render();
                }
            },

            toggle(className) {
                const index = link.classList.indexOf(className);
                if (index !== -1) {
                    link.classList.splice(index, 1);
                    render();
                } else {
                    link.classList.push(className);
                    render();
                }
            },

            contains(className) {
                return link.classList.includes(className);
            }
        };
    }

    get style() {
        return this.styleProp;
    }

    remove() {
        //удаляем информацию
        delete Store.state.__shapes[this.id];
        //удаляем инстанс класса
        delete Store.state.shapes[this.id];

        //удаляем слушатели событий
        delete Store.state.mouseenter[this.id];
        delete Store.state.mouseleave[this.id];
        delete Store.state.mouseup[this.id];
        delete Store.state.mousedown[this.id];
        delete Store.state.click[this.id];

        //Событие ondrag
        delete Store.state.mouseup[Store.state.layout.link.id][this.id];

        let MMT = Store.state.__mouseMoveTargets;
        let MCT = Store.state.__mouseClickTargets;

        if (MMT.indexOf(this.id) >= 0) {
            MMT.splice(MMT.indexOf(this.id), 1);
        }
        if (MCT.indexOf(this.id) >= 0) {
            MCT.splice(MCT.indexOf(this.id), 1);
        }
        render();
    }
}
