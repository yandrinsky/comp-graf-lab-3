import { nearLine } from '../geometry';
import selfEvent from './selfEvent';
import mousePosition from './mousePosition';
import Store from '../../Store';
import { nearDot } from '../geometry';
import { render } from '../render';

function mouseMoveEngine(e) {
    let needToRedraw = false;
    let [clientX, clientY] = mousePosition(e);

    const successCallback = (link, e) => {
        let selfE = selfEvent(e, Store.state.shapes[link.id]);

        if (Object.keys(Store.state.mouseover[link.id]).length) {
            for (let key in Store.state.mouseover[link.id]) {
                Store.state.mouseover[link.id][key](selfE);
            }

            needToRedraw = true;
        }

        if (Object.keys(Store.state.mouseenter[link.id]).length) {
            if (!link.events.mouseenter) {
                for (let key in Store.state.mouseenter[link.id]) {
                    Store.state.mouseenter[link.id][key](selfE);
                }

                needToRedraw = true;
                link.events.mouseenter = true;
            }
        }

        if (Object.keys(Store.state.mouseleave[link.id]).length) {
            link.events.mouseleave = true;
        }
    };

    const failCallback = (link, e) => {
        let selfE = selfEvent(e, Store.state.shapes[link.id]);

        if (Object.keys(Store.state.mouseleave[link.id]).length) {
            if (link.events.mouseenter) {
                for (let key in Store.state.mouseleave[link.id]) {
                    Store.state.mouseleave[link.id][key](selfE);
                }

                link.events.mouseenter = false;
                needToRedraw = true;
            }
        }

        if (Object.keys(Store.state.mouseenter[link.id]).length) {
            link.events.mouseenter = false;
        }
    };

    for (let i = 0; i < Store.state.__mouseMoveTargets.length; i++) {
        const shapeId = Store.state.__mouseMoveTargets[i];
        let link = Store.state.__shapes[shapeId];

        if (link.type === 'line') {
            const {
                start: { x: x1, y: y1 },
                end: { x: x2, y: y2 },
                check: { x: x3, y: y3 }
            } = link.getShiftCoords();

            nearLine(
                {
                    distance: link.getCSS().width / 2,
                    userX: clientX,
                    userY: clientY,
                    x1,
                    x2,
                    x3,
                    y1,
                    y2,
                    y3
                },
                successCallback.bind(this, link, e),
                failCallback.bind(this, link, e)
            );
        } else if (link.type === 'circle') {
            nearDot(
                {
                    distance: link.getCSS().radius,
                    userX: clientX,
                    userY: clientY,
                    circle: link
                },
                successCallback.bind(this, link, e),
                failCallback.bind(this, link, e)
            );
        }
    }

    if (needToRedraw) {
        render();
    }
}

export default mouseMoveEngine;
