import {doesOneCoordinateBelongToLine} from "./does-one-coordinate-belong-to-line";

export const getAnotherCoordinateOfLine = ({equation, x, y}) => {
    if(x !== undefined){
        if(!doesOneCoordinateBelongToLine({x, equation})) {
            return null;
        }

        return x * equation.k - equation.b;
    } else if(y !== undefined){
        if(!doesOneCoordinateBelongToLine({y, equation})) {
            return null;
        }

        return (y - equation.b) / equation.k
    }
}