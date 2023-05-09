export const getEquationFrom2Points = (x1, y1, x2, y2) => {
    let xTop = -x1
    let xBottom = (x2 - x1);
    let yTop = -y1
    let yBottom = (y2 - y1);

    return {
        x1, y1, x2, y2,
        xTop,
        xBottom,
        yTop,
        yBottom,
        k: (y2 - y1) / (x2 - x1), //!== Infinity ? (y2 - y1) / (x2 - x1) : 1,
        b: -(x1 * (y2 - y1) / (x2 - x1) - y1), // !== Infinity ? (x1 * (y2 - y1) / (x2 - x1) - y1) : x2,
        toString: function () {
            let sign = "+";

            if(this.b < 0) {
                sign = "-"
            }

            return `${this.k}x ${sign} ${String(this.b).replace('-', '')}`
        }
    }
}