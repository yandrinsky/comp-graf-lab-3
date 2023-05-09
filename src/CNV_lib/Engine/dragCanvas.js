import Store from '../Store';
import mousePosition from './events-engine/mousePosition';
import { nearDot } from './geometry';
import { render } from './render';
import { createText } from '../library/create/createText';
import { preventRender } from '../library/prevent-render';

function onMouseDown(e) {
    if (Store.state.draggableCanvas) {
        for (let i = 0; i < Store.state.__mouseClickTargets.length; i++) {
            let link = Store.state.__shapes[Store.state.__mouseClickTargets[i]];
            let [clientX, clientY] = mousePosition(e);

            let res = nearDot({
                distance: 5,
                userX: clientX,
                userY: clientY,
                circle: link,
                e: e
            });

            if (res) {
                return;
            }
        }

        Store.state.canvas.style.cursor = 'grab';
        Store.state.canvas.addEventListener('mousemove', onMouseMove);
    }
}

function onMouseUp() {
    if (Store.state.draggableCanvas) {
        Store.state.canvas.style.cursor = 'default';
        Store.state.canvas.removeEventListener('mousemove', onMouseMove);
    }
}

function onMouseMove(e) {
    Store.state.canvas.style.cursor = 'grabbing';

    if (Store.state.draggableCanvas) {
        if (Store.state.draggableCanvasObserver) {
            let isPrevented = false;

            console.log('e.movementX, e.movementX', e.movementX, e.movementY);
            Store.state.draggableCanvasObserver({
                xShift: Store.state.shift.x + e.movementX,
                yShift: Store.state.shift.y + e.movementY,
                preventDefault: () => (isPrevented = true)
            });

            if (isPrevented) {
                return;
            }
        }

        Store.state.shift.x += e.movementX;
        Store.state.shift.y += e.movementY;

        preventRender(() => {
            Store.state.__shapes[
                Store.state.systemShapes['shiftIndicator'].system.getID()
            ]?.updateText(`${Store.state.shift.x} ${Store.state.shift.y}`);
        });

        render();
    }
}

export const dragCanvas = () => {
    if (Store.state.draggableCanvas) {
        Store.state.systemShapes['shiftIndicator'] = createText({
            x0: Store.state.canvas.width - 50,
            y0: Store.state.canvas.height - 10,
            text: '0 0',
            className: '__text',
            id: 'canvasShiftText'
        });
    }

    Store.state.canvas.addEventListener('mousedown', onMouseDown);
    Store.state.canvas.addEventListener('mouseup', onMouseUp);
};
