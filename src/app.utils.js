import { getSign } from './CNV_lib/Engine/utils/get-sign';

export const to2dConvertor = ({ x, y, z, startPosition = { x: 0, y: 0 } }) => {
    const zCoord = Math.sqrt(z ** 2 / 2) * getSign(z);
    const baseX = -zCoord;
    const baseY = zCoord;

    const xCoord = baseX + x;
    const yCoord = baseY - y;

    return { x: xCoord + startPosition.x, y: yCoord + startPosition.y };
};

export const convertZtoXY = ({ z, startPosition = { x: 0, y: 0 } }) => {
    const zCoord = Math.sqrt(z ** 2 / 2) * getSign(z);
    return { x: -zCoord + startPosition.x, y: zCoord + startPosition.y };
};

export const toBilinearConvertor = (...coords) => {
    const xCoords = [];
    const yCoords = [];
    const zCoords = [];

    coords.forEach(({ x, y, z }) => {
        xCoords.push(x);
        yCoords.push(y);
        zCoords.push(z);
    });

    return { x: xCoords, y: yCoords, z: zCoords };
};
