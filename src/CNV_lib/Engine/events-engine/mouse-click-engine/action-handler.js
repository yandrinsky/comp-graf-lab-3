import { nearDot, nearLine, nearRect } from '../../geometry';

export const actionHandler = ({ clientX, clientY, successCallback, e, link }) => {
    if (link.type === 'line') {
        const {
            start: { x: x1, y: y1 },
            end: { x: x2, y: y2 },
            check: { x: x3, y: y3 }
        } = link.getShiftCoords();

        return nearLine(
            {
                distance: link.getCSS().width / 2,
                userX: clientX,
                userY: clientY,
                x1,
                x2,
                x3,
                y1,
                y2,
                y3,
                e: e
            },
            successCallback.bind(this, link, e)
        );
    } else if (link.type === 'circle') {
        return nearDot(
            {
                distance: link.getCSS().radius,
                userX: clientX,
                userY: clientY,
                circle: link,
                e
            },
            successCallback.bind(this, link, e)
        );
    } else if (link.type === 'rect') {
        const {
            start: { x, y },
            width,
            height
        } = link.getShiftCoords();

        return nearRect(
            {
                distance: 0,
                userX: clientX,
                userY: clientY,
                x,
                y,
                width,
                height,
                e
            },
            successCallback.bind(this, link, e)
        );
    } else if (link.type === 'text') {
        const {
            start: { x, y },
            width,
            height
        } = link.getShiftCoords();

        return nearRect(
            {
                distance: 0,
                userX: clientX,
                userY: clientY,
                x,
                y: y - height,
                width,
                height,
                e
            },
            successCallback.bind(this, link, e)
        );
    }
};
