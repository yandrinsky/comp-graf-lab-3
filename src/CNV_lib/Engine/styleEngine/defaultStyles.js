const common = {
    position: "static",
    zIndex: 0,
}

export const defaultStyles = {
    line: {
        ...common,
        width: 5,
        color: "black"
    },
    circle: {
        ...common,
        startAngle: 0,
        endAngle: 2 * Math.PI,
        radius: 10,
        color: "black",
    },
    text: {
        ...common,
        fontSize: "14px",
        fontFamily: "serif",
        color: "black",
        padding: 0,
    },
    rect: {
        ...common,
        backgroundColor: "black",
        padding: 0,
    }
}