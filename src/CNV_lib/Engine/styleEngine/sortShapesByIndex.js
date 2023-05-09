export const sortShapesByIndex = ({ getShapeStyles, shapes }) => {
    const final = {};

    for (let id in shapes) {
        let shape = shapes[id];
        const { zIndex = 0 } = getShapeStyles(shape);

        if (final.hasOwnProperty(zIndex)) {
            final[zIndex].push(shape);
        } else {
            final[zIndex] = [shape];
        }
    }

    if (final.hasOwnProperty(10)) {
        final[10].push({ type: '__POINTERS_RENDER' });
    } else {
        final[10] = [{ type: '__POINTERS_RENDER' }];
    }

    const keys = Object.keys(final).sort((a, b) => a - b);

    return keys.map(key => final[key]).flat();
};
