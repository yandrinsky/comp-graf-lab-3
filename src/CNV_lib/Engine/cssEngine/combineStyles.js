export function combineStyles({ css, classes, type, ownStyle, defaultStyles }) {
    let custom = { ...defaultStyles[type] };

    classes.forEach(className => {
        custom = { ...custom, ...css[className] };
    });

    //TODO wtf???
    if (custom['border']) {
        let borderInfo = custom['border'].split(' ');

        custom['border'] = {
            width: Number(borderInfo[0].split('px')[0]),
            type: borderInfo[1],
            color: borderInfo[2]
        };
    }

    custom = { ...custom, ...ownStyle };

    return custom;
}
