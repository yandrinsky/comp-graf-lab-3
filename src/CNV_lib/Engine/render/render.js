import clearCanvas from './clearCanvas';
import lineRender from './lineRender';
import circleRender from './circleRender';
import pointersRender from './pointersRender';
import { textRender } from './textRender';
import rectRender from './rectRender';
import Store from '../../Store';

export const render = () => {
    if (!Store.state.shouldRenderUpdates) {
        return;
    }

    clearCanvas({
        backgroundColor: 'white',
        context: Store.state.context,
        canvas: Store.state.canvas
    });

    // console.log('render');

    const shapesInIndexOrder = Store.state.styleEngine.sortShapesByIndex(Store.state.__shapes);

    shapesInIndexOrder.forEach(shape => {
        let config = {
            link: shape,
            zoom: Store.state.zoom
        };

        if (shape.type === 'line') lineRender(config);
        else if (shape.type === 'circle') circleRender(config);
        else if (shape.type === 'text') textRender(config);
        else if (shape.type === 'rect') rectRender(config);
        else if (shape.type === '__POINTERS_RENDER') pointersRender(config);
    });
};
