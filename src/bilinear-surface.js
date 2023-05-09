export const bilinearSurface = ({ x: Px, y: Py, z: Pz }) => {
    // Координаты точки поверхности
    let x;
    let y;
    let z;

    // Параметрические переменные
    let u = 0;
    let w = 0;

    // Координаты предыдущей точки поверхности
    let prevPoint = [];
    const lines = [];

    while (u <= 1) {
        while (w <= 1) {
            prevPoint = [x, y, z];

            x =
                Px[0] * (1 - u) * (1 - w) +
                Px[1] * (1 - u) * w +
                Px[2] * (1 - w) * u +
                Px[3] * u * w;
            y =
                Py[0] * (1 - u) * (1 - w) +
                Py[1] * (1 - u) * w +
                Py[2] * (1 - w) * u +
                Py[3] * u * w;
            z =
                Pz[0] * (1 - u) * (1 - w) +
                Pz[1] * (1 - u) * w +
                Pz[2] * (1 - w) * u +
                Pz[3] * u * w;

            if (w !== 0) {
                lines.push({ start: [x, y, z], end: [...prevPoint] });
                // Построить линию по точкам [x,y,z] и prevPoint
            }

            w += 0.1; // шаг сетки поверхности
        }

        w = 0;
        u += 0.1; // шаг
    }

    while (w <= 1) {
        while (u <= 1) {
            prevPoint = [x, y, z];

            x =
                Px[0] * (1 - u) * (1 - w) +
                Px[1] * (1 - u) * w +
                Px[2] * (1 - w) * u +
                Px[3] * u * w;
            y =
                Py[0] * (1 - u) * (1 - w) +
                Py[1] * (1 - u) * w +
                Py[2] * (1 - w) * u +
                Py[3] * u * w;
            z =
                Pz[0] * (1 - u) * (1 - w) +
                Pz[1] * (1 - u) * w +
                Pz[2] * (1 - w) * u +
                Pz[3] * u * w;

            if (u !== 0) {
                lines.push({ start: [x, y, z], end: [...prevPoint] });
                // Построить линию по точкам [x,y,z] и prevPoint
            }

            u += 0.1; //шаг
        }

        u = 0;
        w += 0.1; // шаг
    }

    return lines;
};

// Считает координаты заданных точек при повороте на angle
export const rotationAroundX = ({ x: Px, y: Py, z: Pz, angle }) => {
    let newPx = new Array(4);
    let newPy = new Array(4);
    let newPz = new Array(4);

    for (let i = 0; i < 4; i++) {
        newPx[i] = Px[i];
        newPy[i] =
            Py[i] * Math.cos((angle * Math.PI) / 180) + Pz[i] * Math.sin((angle * Math.PI) / 180);
        newPz[i] =
            -Py[i] * Math.sin((angle * Math.PI) / 180) + Pz[i] * Math.cos((angle * Math.PI) / 180);
    }

    return {
        x: newPx,
        y: newPy,
        z: newPz
    };
};

export const rotationAroundY = ({ x: Px, y: Py, z: Pz, angle }) => {
    let newPx = new Array(4);
    let newPy = new Array(4);
    let newPz = new Array(4);

    for (let i = 0; i < 4; i++) {
        newPx[i] =
            Px[i] * Math.cos((angle * Math.PI) / 180) + Pz[i] * Math.sin((angle * Math.PI) / 180);
        newPy[i] = Py[i];
        newPz[i] =
            -Px[i] * Math.sin((angle * Math.PI) / 180) + Pz[i] * Math.cos((angle * Math.PI) / 180);
    }

    return {
        x: newPx,
        y: newPy,
        z: newPz
    };
};
