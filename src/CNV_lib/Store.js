export default {
    state: undefined,

    getState() {
        return this.state;
    },

    setState(newState) {
        this.state = newState;
    },

    initState() {
        this.state = this.createState();
    },
    createState() {
        return {
            __shapes: {}, //id: {type: "line", start: {x, y}, end: {x, y}, classList: [], id},
            shapes: {}, //"id: ShapeInstance"
            systemShapes: {}, //"id: ShapeInstance"
            mouseover: {},
            mouseleave: {},
            mouseenter: {}, //{ id1: {0: callback, 1: callback, ...}, id2: {0: callback} }
            dragstart: {}, //{ id1: {0: callback, 1: callback, ...}, id2: {0: callback} }
            dragend: {}, //{ id1: {0: callback, 1: callback, ...}, id2: {0: callback} }
            click: {},
            mousedown: {},
            mouseup: {},
            __mouseMoveTargets: [],
            __mouseClickTargets: [],
            shouldRenderUpdates: true,
            shift: { x: 0, y: 0 },
            draggableCanvas: false,
            zoom: 1
        };
    }
};
