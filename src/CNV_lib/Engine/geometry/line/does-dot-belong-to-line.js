import {getCoordinates} from "../geometry";

export const doesDotBelongToLine = ({x, y, equation}) => {
    return getCoordinates(equation, x) === y;
}