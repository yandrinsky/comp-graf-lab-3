import React, { useEffect } from 'react';
import './app.css';
import { useInitial } from './app.hook';
import { convertZtoXY, to2dConvertor, toBilinearConvertor } from './app.utils';
import { bilinearSurface, rotationAroundX, rotationAroundY } from './bilinear-surface';
import { getSign } from './CNV_lib/Engine/utils/get-sign';
import { getEquationFrom2Points } from './CNV_lib/Engine/geometry/line/get-equation-from-2-points';

export const App = () => {
    useEffect(() => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const { CNV } = useInitial();

        CNV.settings.draggableCanvasObserver = ({ preventDefault, xShift, yShift }) => {
            CNV.getState().xShift = (CNV.getState().xShift + xShift) % 360;
            CNV.getState().yShift = (CNV.getState().yShift + yShift) % 360;

            CNV.combineRender(() => {
                CNV.querySelector('#canvasShiftText')?.remove();

                CNV.querySelector('#xRotate').link.updateText(`x angle: ${CNV.getState().xShift}`);

                CNV.querySelector('#yRotate').link.updateText(`y angle: ${CNV.getState().yShift}`);
            });

            preventDefault();

            renderSurface();
        };

        const startPosition = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

        const dotCoords = [
            { x: 100, y: 400, z: 100 },
            { x: 400, y: 400, z: 100 },
            { x: 100, y: 100, z: 100 },
            { x: 400, y: 100, z: 100 }
        ];

        //x-rotate
        CNV.createText({
            x0: 10,
            y0: 25,
            text: 'x angle: 0',
            id: 'xRotate'
        });

        //y-rotate
        CNV.createText({
            x0: 10,
            y0: 45,
            text: 'y angle: 0',
            id: 'yRotate'
        });

        //dot-1
        CNV.createText({
            x0: 10,
            y0: window.innerHeight - 80,
            text: 'dot 1 - x: ; y: ',
            id: 'dot1Coords'
        });

        //dot-2
        CNV.createText({
            x0: 10,
            y0: window.innerHeight - 60,
            text: 'dot 2 - x: ; y: ',
            id: 'dot2Coords'
        });

        //dot-3
        CNV.createText({
            x0: 10,
            y0: window.innerHeight - 40,
            text: 'dot 3 - x: ; y: ',
            id: 'dot3Coords'
        });

        //dot-4
        CNV.createText({
            x0: 10,
            y0: window.innerHeight - 20,
            text: 'dot 4 - x: ; y: ',
            id: 'dot4Coords'
        });

        const updateDotCoordsText = ({ x, y, z, index }) => {
            CNV.querySelector(`#dot${index + 1}Coords`)?.link.updateText(
                `dot ${index + 1} - x: ${x.toFixed(2)} ; y: ${y.toFixed(2)}; z: ${z.toFixed(2)}`
            );
        };

        //xLine
        CNV.createLine({
            x0: window.innerWidth / 2,
            y0: window.innerHeight / 2,
            x1: window.innerWidth / 2 + 500,
            y1: window.innerHeight / 2
        });

        CNV.createText({
            x0: window.innerWidth / 2 + 510,
            y0: window.innerHeight / 2 + 3,
            text: 'x',
            className: 'lineText'
        });

        //yLine
        CNV.createLine({
            x0: window.innerWidth / 2,
            y0: window.innerHeight / 2,
            x1: window.innerWidth / 2,
            y1: window.innerHeight / 2 - 420
        });

        CNV.createText({
            x0: window.innerWidth / 2 - 30,
            y0: window.innerHeight / 2 - 410,
            text: 'y',
            className: 'lineText'
        });

        //zLine
        CNV.createLine({
            x0: window.innerWidth / 2,
            y0: window.innerHeight / 2,
            x1: window.innerWidth / 2 - 300,
            y1: window.innerHeight / 2 + 300
        });

        CNV.createText({
            x0: window.innerWidth / 2 - 320,
            y0: window.innerHeight / 2 + 320,
            text: 'z',
            className: 'lineText'
        });

        const circles = [];

        dotCoords.forEach(item => {
            let isFindingWay = true;
            let counterIsFindingWay = 0;
            let xWay = 0;
            let yWay = 0;
            let way = '';
            let isMoving = false;

            const coords2d = to2dConvertor({
                ...item,
                startPosition
            });

            circles.push(CNV.createCircle({ x0: coords2d.x, y0: coords2d.y, className: 'circle' }));

            circles[circles.length - 1].state = {
                coords: { ...item },
                converted2dCoords: { ...coords2d }
            };

            const circle = circles[circles.length - 1];

            circle.onmouseenter = e => {
                if (!isMoving) {
                    createCoordsCell({
                        startPosition,
                        dotCoords: e.target.state.coords
                    });
                }
            };

            circle.onmouseleave = () => {
                if (!isMoving) {
                    CNV.combineRender(() => {
                        CNV.querySelectorAll('.coordsCellLine').forEach(el => el.remove());
                    });
                }
            };

            circle.ondrag = e => {
                xWay += e.movementX;
                yWay += e.movementY;

                if (isFindingWay) {
                    counterIsFindingWay += 1;
                    if (Math.abs(xWay) > 50 || Math.abs(yWay) > 50 || counterIsFindingWay > 15) {
                        isFindingWay = false;

                        if (Math.abs(xWay) < 10) {
                            way = 'y';

                            CNV.createLine({
                                equation: getEquationFrom2Points(
                                    e.target.link.getCoords().start.x,
                                    e.target.link.getCoords().start.y,
                                    e.target.link.getCoords().start.x + 1,
                                    e.target.link.getCoords().start.y + 1000
                                ).toString(),
                                className: 'pathLine'
                            });
                        }
                        if (Math.abs(yWay) < 10) {
                            way = 'x';

                            CNV.createLine({
                                equation: getEquationFrom2Points(
                                    e.target.link.getCoords().start.x,
                                    e.target.link.getCoords().start.y,
                                    e.target.link.getCoords().start.x + 1,
                                    e.target.link.getCoords().start.y
                                ).toString(),
                                className: 'pathLine'
                            });
                        }
                        if (Math.abs(Math.abs(yWay) - Math.abs(xWay)) < 15) {
                            way = 'z';

                            CNV.createLine({
                                equation: getEquationFrom2Points(
                                    e.target.link.getCoords().start.x,
                                    e.target.link.getCoords().start.y,
                                    e.target.link.getCoords().start.x + 1,
                                    e.target.link.getCoords().start.y - 1
                                ).toString(),
                                className: 'pathLine'
                            });
                        }
                    }
                } else {
                    if (way === 'z') {
                        const zOffset =
                            Math.sqrt(Math.max(Math.abs(xWay), Math.abs(yWay)) ** 2 / 2) *
                            getSign(yWay);

                        e.target.state.coords.z += zOffset * 1.7;
                    } else if (way === 'x') {
                        e.target.state.coords.x += xWay;
                    } else if (way === 'y') {
                        e.target.state.coords.y -= yWay;
                    }

                    const coords = to2dConvertor({
                        ...e.target.state.coords,
                        startPosition
                    });

                    e.target.update.start.x = coords.x;
                    e.target.update.start.y = coords.y;

                    xWay = 0;
                    yWay = 0;

                    createCoordsCell({ startPosition, dotCoords: { ...e.target.state.coords } });
                    renderSurface();
                }
            };

            circle.ondragstart = () => {
                isFindingWay = true;
                xWay = 0;
                yWay = 0;
                way = '';
                counterIsFindingWay = 0;
                isMoving = true;
            };

            circle.ondragend = () => {
                isMoving = false;

                CNV.combineRender(() => {
                    CNV.querySelectorAll('.coordsCellLine').forEach(el => el.remove());
                    CNV.querySelectorAll('.pathLine').forEach(el => el.remove());
                });
            };
        });

        const createCoordsCell = ({ startPosition, dotCoords: dotCoordsWithoutAngle }) => {
            const updatedByXAngleCoords = rotationAroundX({
                x: [dotCoordsWithoutAngle.x],
                y: [dotCoordsWithoutAngle.y],
                z: [dotCoordsWithoutAngle.z],
                angle: CNV.getState().xShift
            });

            const updatedByYAngleCoords = rotationAroundY({
                x: updatedByXAngleCoords.x,
                y: updatedByXAngleCoords.y,
                z: updatedByXAngleCoords.z,
                angle: CNV.getState().yShift
            });

            const dotCoords = {
                x: updatedByYAngleCoords.x[0],
                y: updatedByYAngleCoords.y[0],
                z: updatedByYAngleCoords.z[0]
            };

            const zCoords = convertZtoXY({ z: dotCoords.z, startPosition: startPosition });

            CNV.combineRender(() => {
                CNV.querySelectorAll('.coordsCellLine').forEach(el => el.remove());
            });

            CNV.combineRender(() => {
                CNV.createLine({
                    x0: startPosition.x,
                    y0: startPosition.y - dotCoords.y,
                    x1: startPosition.x + dotCoords.x,
                    y1: startPosition.y - dotCoords.y,
                    className: 'coordsCellLine'
                });

                CNV.createLine({
                    x0: startPosition.x + dotCoords.x,
                    y0: startPosition.y - dotCoords.y,
                    x1: startPosition.x + dotCoords.x,
                    y1: startPosition.y,
                    className: 'coordsCellLine'
                });

                CNV.createLine({
                    x0: zCoords.x,
                    y0: zCoords.y,
                    x1: zCoords.x + dotCoords.x,
                    y1: zCoords.y,
                    className: 'coordsCellLine'
                });

                CNV.createLine({
                    x0: zCoords.x + dotCoords.x,
                    y0: zCoords.y,
                    x1: startPosition.x + dotCoords.x,
                    y1: startPosition.y,
                    className: 'coordsCellLine'
                });

                CNV.createLine({
                    x0: zCoords.x + dotCoords.x,
                    y0: zCoords.y,
                    x1: zCoords.x + dotCoords.x,
                    y1: zCoords.y - dotCoords.y,
                    className: 'coordsCellLine'
                });

                CNV.createLine({
                    x0: zCoords.x + dotCoords.x,
                    y0: zCoords.y - dotCoords.y,
                    x1: zCoords.x,
                    y1: zCoords.y - dotCoords.y,
                    className: 'coordsCellLine'
                });

                CNV.createLine({
                    x0: zCoords.x,
                    y0: zCoords.y - dotCoords.y,
                    x1: zCoords.x,
                    y1: zCoords.y,
                    className: 'coordsCellLine'
                });

                CNV.createLine({
                    x0: startPosition.x,
                    y0: startPosition.y,
                    x1: zCoords.x,
                    y1: zCoords.y,
                    className: 'coordsCellLine'
                });

                CNV.createLine({
                    x0: zCoords.x,
                    y0: zCoords.y - dotCoords.y,
                    x1: startPosition.x,
                    y1: startPosition.y - dotCoords.y,
                    className: ['coordsCellLine']
                });

                CNV.createLine({
                    x0: startPosition.x,
                    y0: startPosition.y,
                    x1: startPosition.x,
                    y1: startPosition.y - dotCoords.y,
                    className: ['coordsCellLine']
                });

                CNV.createLine({
                    x0: zCoords.x + dotCoords.x,
                    y0: zCoords.y - dotCoords.y,
                    x1: startPosition.x + dotCoords.x,
                    y1: startPosition.y - dotCoords.y,
                    className: 'coordsCellLine'
                });

                CNV.createLine({
                    x0: startPosition.x,
                    y0: startPosition.y,
                    x1: startPosition.x + dotCoords.x,
                    y1: startPosition.y,
                    className: 'coordsCellLine'
                });
            });
        };

        function renderSurface() {
            const xAngleRotationChange = rotationAroundX({
                ...toBilinearConvertor(
                    ...CNV.querySelectorAll('circle').map(circle => ({ ...circle.state.coords }))
                ),
                angle: CNV.getState().xShift
            });

            const yAngleRotationChange = rotationAroundY({
                ...xAngleRotationChange,
                angle: CNV.getState().yShift
            });

            CNV.combineRender(() => {
                CNV.querySelectorAll('circle').forEach((circle, index) => {
                    const updatedByXAngleCoords = rotationAroundX({
                        x: [circle.state.coords.x],
                        y: [circle.state.coords.y],
                        z: [circle.state.coords.z],
                        angle: CNV.getState().xShift
                    });

                    const {
                        x: [x],
                        y: [y],
                        z: [z]
                    } = rotationAroundY({
                        x: updatedByXAngleCoords.x,
                        y: updatedByXAngleCoords.y,
                        z: updatedByXAngleCoords.z,
                        angle: CNV.getState().yShift
                    });

                    const updated2dCoords = to2dConvertor({
                        x,
                        y,
                        z,
                        startPosition
                    });

                    circle.update.start.x = updated2dCoords.x;
                    circle.update.start.y = updated2dCoords.y;

                    updateDotCoordsText({ x, y, z, index });
                });
            });

            const res = bilinearSurface({ ...yAngleRotationChange }).map(
                ({ start: [x1, y1, z1], end: [x2, y2, z2] }) => ({
                    start: to2dConvertor({ x: x1, y: y1, z: z1, startPosition }),
                    end: to2dConvertor({ x: x2, y: y2, z: z2, startPosition })
                })
            );

            CNV.combineRender(() => {
                CNV.querySelectorAll('.planeLine').forEach(item => item.remove());

                res.forEach(line => {
                    CNV.createLine({
                        x0: line.start.x,
                        y0: line.start.y,
                        x1: line.end.x,
                        y1: line.end.y,
                        className: 'planeLine'
                    });
                });

                const circles = CNV.querySelectorAll('.circle');

                CNV.createLine({
                    x0: circles[0].link.getCoords().start.x,
                    y0: circles[0].link.getCoords().start.y,
                    x1: circles[2].link.getCoords().start.x,
                    y1: circles[2].link.getCoords().start.y,
                    className: 'planeLine'
                });
            });
        }

        renderSurface();
    }, []);

    return (
        <div>
            <canvas id="canvas" width={window.innerWidth} height={window.innerHeight} />
        </div>
    );
};
