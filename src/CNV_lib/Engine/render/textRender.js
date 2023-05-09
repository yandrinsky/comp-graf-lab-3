import Store from '../../Store';

export const textRender = ({ link }) => {
    const style = Store.state.styleEngine.getShapeStyles(link);
    const { context } = Store.state;

    const coords = style.position === 'sticky' ? link.getCoords() : link.getShiftCoords();
    const {
        start: { x, y },
        padding
    } = coords;

    context.font = `${style.fontSize} ${style.fontFamily}`;

    if (style.backgroundColor) {
        context.beginPath();
        context.fillStyle = style.backgroundColor;
        context.fillRect(x, y, link.getSize().width, -link.getSize().height);
    }

    context.fillStyle = style.color;
    context.fillText(link.text, x + padding, y - padding);
};
