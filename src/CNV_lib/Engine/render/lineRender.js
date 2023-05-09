import { moveTo } from '../geometry/geometry';
import Store from '../../Store';

//props: link, css, context, shift
function lineRender({ link }) {
    const style = link.getCSS();
    const { context, shift } = Store.state;

    const coords = style.position === 'sticky' ? link.getCoords() : link.getShiftCoords();

    const {
        start: { x: x1, y: y1 },
        end: { x: x2, y: y2 },
        check: { x: xCheck, y: yCheck }
    } = coords;

    if (!(style.visibility === 'hidden')) {
        if (style.dash) {
            context.setLineDash([6, 10]);
        } else {
            context.setLineDash([]);
        }

        const isStraight = link.start.x === link.check.x && link.start.y === link.check.y;

        // if (!link.pointer && isStraight) {
        context.beginPath();
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);

        context.lineWidth = style.width;
        context.strokeStyle = style.color;
        context.stroke();
        // }

        //TODO переделать. внизу получается, что даже если у нас прямая, мы строим ее как кривую.

        // if (!link.pointer) {
        //     if (style.border) {
        //         context.beginPath();
        //         context.moveTo(x1, y1);
        //         context.quadraticCurveTo(xCheck, yCheck, x2, y2);
        //
        //         context.lineWidth = style.width + style.border.width;
        //         context.strokeStyle = style.border.color;
        //         context.stroke();
        //     }
        //
        //     context.beginPath();
        //     context.moveTo(x1, y1);
        //     context.quadraticCurveTo(xCheck, yCheck, x2, y2);
        // } else if (link.pointer && isStraight) {
        //     context.beginPath();
        //     context.moveTo(x1, y1);
        //
        //     const shape = Store.state.shapes[link.id];
        //     const equation = shape.system.equation;
        //     const endPosition = moveTo(equation, -5);
        //
        //     context.lineTo(
        //         endPosition.x + (style.position === 'sticky' ? 0 : shift.x),
        //         endPosition.y + (style.position === 'sticky' ? 0 : shift.y)
        //     );
        // } else {
        //     context.beginPath();
        //     context.moveTo(x1, y1);
        //
        //     context.quadraticCurveTo(
        //         link.check.x + shift.x,
        //         link.check.y + shift.y,
        //         link.end.x + shift.x,
        //         link.end.y + shift.y
        //     );
        // }
        //
        // context.lineWidth = style.width;
        // context.strokeStyle = style.color;
        // context.stroke();
    }
}

export default lineRender;
