import selfEvent from '../selfEvent';
import mousePosition from '../mousePosition';
import Store from '../../../Store';
import { render } from '../../render';
import { actionHandler } from './action-handler';

export function mouseClickEngine(e) {
    let needToRedraw = false;
    let [clientX, clientY] = mousePosition(e);

    const successCallback = (link, e) => {
        const selfE = selfEvent(e, Store.state.shapes[link.id]);

        if (Object.keys(Store.state.click[link.id] ?? {}).length && e.type === 'click') {
            for (let key in Store.state.click[link.id]) {
                Store.state.click[link.id][key](selfE);
            }
        }

        if (Object.keys(Store.state.mousedown[link.id] ?? {}).length && e.type === 'mousedown') {
            for (let key in Store.state.mousedown[link.id]) {
                Store.state.mousedown[link.id][key](selfE);
            }
        }

        if (Object.keys(Store.state.mouseup[link.id] ?? {}).length && e.type === 'mouseup') {
            for (let key in Store.state.mouseup[link.id]) {
                Store.state.mouseup[link.id][key](selfE);
            }
        }
    };

    //TODO не очень хорошее решение, так как mouseClickEngine вызывается триды на клик: up, down, click. И получается
    // цикл проходится трижды
    const elementsInIndexOrder = Store.state.styleEngine
        .sortShapesByIndex(Store.state.__shapes)
        .filter(({ id }) => Store.state.__mouseClickTargets.includes(id))
        .reverse();

    for (let i = 0; i < elementsInIndexOrder.length; i++) {
        const shapeId = elementsInIndexOrder[i].id;
        let link = elementsInIndexOrder[i];

        const needToHandle =
            (Object.keys(Store.state.mouseup[shapeId] ?? {}).length && e.type === 'mouseup') ||
            (Object.keys(Store.state.mousedown[shapeId] ?? {}).length && e.type === 'mousedown') ||
            (Object.keys(Store.state.click[shapeId] ?? {}).length && e.type === 'click');

        if (needToHandle) {
            const res = actionHandler({ clientX, clientY, e, link, successCallback });

            if (res) {
                break;
            }
        }
    }

    if (needToRedraw) {
        render();
    }
}
