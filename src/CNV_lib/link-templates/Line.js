import Standard from './Standard';
import Store from '../Store';
import { getEquationFrom2Points } from '../Engine/geometry/line/get-equation-from-2-points';
import { getSign } from '../Engine/utils/get-sign';

class Line extends Standard {
    constructor(config) {
        super({ ...config, type: 'line' });

        this.isStraight = !!config.equation; //TODO плохое решение. Нужно разделить отрезок луч и прямую
        this.equation = config.equation; //TODO тоже плохое решение. СМ выше

        if (config.equation) {
            const { start, end, check } = this.getCanvasIntersectionCoordsFromEquation({
                isShift: true
            });
            this.start = start;

            this.end = end;

            this.check = check;
        } else {
            this.end = {
                x: config.x1,
                y: config.y1
            };

            this.check = {
                x: config.x2 || config.x0,
                y: config.y2 || config.y0
            };

            this.start = {
                x: config.x0,
                y: config.y0
            };
        }
    }

    getCanvasIntersectionCoordsFromEquation({ isShift = false }) {
        let equation = this.equation.replaceAll(' ', '').split('x');
        equation = equation.length === 1 ? ['0', ...equation] : equation;

        equation = equation
            .map((el, index) => {
                if (index === 0) {
                    if (el === '+') {
                        return 1;
                    } else if (el === '-') {
                        return -1;
                    } else if (el === '') {
                        return 1;
                    }
                }

                return el;
            })
            .map(el => Number(el));

        if (isShift) {
            equation[1] +=
                -1 * getSign(equation[0]) * Store.state.shift.x * Number(!!equation[0]) +
                Store.state.shift.y;
        }

        const topSideIntersection = -equation[1] / equation[0];
        const bottomSideIntersection = (Store.state.canvas.height - equation[1]) / equation[0];
        const leftSideIntersection = equation[1];
        const rightSideIntersection = equation[0] * Store.state.canvas.width + equation[1];

        let startX = 0;
        let endX = 0;

        if (leftSideIntersection > 0 && leftSideIntersection < Store.state.canvas.height) {
            startX = 0;
        } else if (topSideIntersection > 0 && topSideIntersection < Store.state.canvas.width) {
            startX = topSideIntersection;
        }

        if (rightSideIntersection > 0 && rightSideIntersection < Store.state.canvas.height) {
            endX = Store.state.canvas.width;
        } else if (
            bottomSideIntersection > 0 &&
            bottomSideIntersection < Store.state.canvas.width
        ) {
            endX = bottomSideIntersection;
        }

        const start = {
            x: startX,
            y: startX * equation[0] + equation[1]
        };

        const end = {
            x: endX,
            y: endX * equation[0] + equation[1]
        };

        // const start = {
        //     x: leftSideIntersection > 0 && leftSideIntersection < Store.state.canvas.height ? leftSideIntersection,
        //     y: equation[1],
        // }
        //
        // const end = {
        //     x: Store.state.canvas.width,
        //     y: Store.state.canvas.height * equation[0] + equation[1],
        // }

        const check = {
            x: 0,
            y: equation[1]
        };

        return {
            start,
            end,
            check
        };
    }

    getEquation() {
        const {
            start: { x: x1, y: y1 },
            end: { x: x2, y: y2 }
        } = this.getCoords();
        console.log({ ...this.getCoords() });
        return getEquationFrom2Points(x1, y1, x2, y2);
    }

    getShiftEquation() {
        const {
            start: { x: x1, y: y1 },
            end: { x: x2, y: y2 }
        } = this.getShiftCoords();
        return getEquationFrom2Points(x1, y1, x2, y2);
    }

    getCoords() {
        if (this.isStraight) {
            return this.getCanvasIntersectionCoordsFromEquation({ isShift: false });
        }

        return {
            start: {
                x: this.start.x,
                y: this.start.y
            },
            end: {
                x: this.end.x,
                y: this.end.y
            },
            check: {
                x: this.check.x,
                y: this.check.y
            }
        };
    }

    getShiftCoords() {
        if (this.isStraight) {
            return this.getCanvasIntersectionCoordsFromEquation({ isShift: true });
        }

        return {
            start: {
                x: this.start.x + Store.state.shift.x,
                y: this.start.y + Store.state.shift.y
            },
            end: {
                x: this.end.x + Store.state.shift.x,
                y: this.end.y + Store.state.shift.y
            },
            check: {
                x: this.check.x + Store.state.shift.x,
                y: this.check.y + +Store.state.shift.y
            }
        };
    }
}

export default Line;
