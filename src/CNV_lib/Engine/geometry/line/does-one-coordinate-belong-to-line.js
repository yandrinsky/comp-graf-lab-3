export const doesOneCoordinateBelongToLine = ({x,y, equation}) => {
    if(x !== undefined) {
        return !(x > Math.max(equation.x1, equation.x2) || x < Math.min(equation.x1, equation.x2));
    } else if(y !== undefined) {
        return !(y > Math.max(equation.y1, equation.y2) || y < Math.min(equation.y1, equation.y2));
    }

    return false;
}