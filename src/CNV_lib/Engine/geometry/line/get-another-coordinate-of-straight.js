export const getAnotherCoordinateOfStraight = ({equation, x, y}) => {
    if(x !== undefined){
        return x * equation.k - equation.b;
    } else if(y !== undefined){
        return (y - equation.b) / equation.k
    }
}