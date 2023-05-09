import {doesOneCoordinateBelongToLine} from "./line/does-one-coordinate-belong-to-line";
import {getAnotherCoordinateOfStraight} from "./line/get-another-coordinate-of-straight";

function length(equation){
    return Math.sqrt((equation.x2 - equation.x1) ** 2 + (equation.y2 - equation.y1) ** 2);
}



function getCoordinates(equation, x, y){
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

// функции для поиска пересечений
function realLess(a, b){
    const eps = 1e-4; //точность вычслений

    return (b - a) > eps;
}

function vectorMulti(ax,ay,bx,by){
// ax,ay - координаты a
//  bx,by - координаты b
    return ax*by-bx*ay;
}

function linesCross(x1,y1,x2,y2,x3,y3,x4,y4){
//Пересекаются ли отрезки?
    let v1, v2, v3, v4;
    v1 = vectorMulti(x4-x3,y4-y3,x1-x3,y1-y3);
    v2 = vectorMulti(x4-x3,y4-y3,x2-x3,y2-y3);
    v3 = vectorMulti(x2-x1,y2-y1,x3-x1,y3-y1);
    v4 = vectorMulti(x2-x1,y2-y1,x4-x1,y4-y1);

    return realLess(v1 * v2, 0) && realLess(v3 * v4, 0);
}



//На вход - куравнения двух линий - выход boolean.
function collision(equation1, equation2){
    //Пересекаются ли 2 отрезка?
    let t = 0, t1 = 0;
    let x1 = 0;
    let y1 = 0;
    let x2 = 0;
    let y2 = 0;
    let x3 = 0;
    let y3 = 0;
    let x4 = 0;
    let y4 = 0;
    let distance = 0.2;

    let obj_collision = {
        result: false,
        target: undefined,
    }

    if(equation1.x1 === equation1.x3 && equation2.x1 === equation2.x3){
        obj_collision.result = linesCross(equation1.x1, equation1.y1, equation1.x2, equation1.y2, equation2.x1, equation2.y1, equation2.x2, equation2.y2);
        if(obj_collision.result) obj_collision.target = equation2.target;
        return obj_collision;
    } else if(equation1.x1 === equation1.x3 && equation2.x1 !== equation2.x3){
        while(t <= 1){
            x1 = Math.pow((1 - t), 2)*equation2.x1 + 2*(1 - t)*t*equation2.x3 + Math.pow(t, 2)*equation2.x2;
            y1 = Math.pow((1 - t), 2)*equation2.y1 + 2*(1 - t)*t*equation2.y3 + Math.pow(t, 2)*equation2.y2;
            if(t !== 0.9999999999999999){
                x1 = Math.round(x1); 
                y1 = Math.round(y1);
            }
            if(t !== 0){
                x2 = Math.pow((1 - (t-0.1)), 2)*equation2.x1 + 2*(1 - (t-0.1))*(t-0.1)*equation2.x3 + Math.pow((t-0.1), 2)*equation2.x2;
                y2 = Math.pow((1 - (t-0.1)), 2)*equation2.y1 + 2*(1 - (t-0.1))*(t-0.1)*equation2.y3 + Math.pow((t-0.1), 2)*equation2.y2;
                x2 = Math.round(x2); 
                y2 = Math.round(y2);
            }
            else{
                x2 = Math.pow((1 - (t+0.1)), 2)*equation2.x1 + 2*(1 - (t+0.1))*(t+0.1)*equation2.x3 + Math.pow((t+0.1), 2)*equation2.x2;
                y2 = Math.pow((1 - (t+0.1)), 2)*equation2.y1 + 2*(1 - (t+0.1))*(t+0.1)*equation2.y3 + Math.pow((t+0.1), 2)*equation2.y2;
                x2 = Math.round(x2); 
                y2 = Math.round(y2);
            }
            if(linesCross(equation1.x1, equation1.y1, equation1.x2, equation1.y2, x2, y2, x1, y1)) {
                obj_collision.result = true;
                obj_collision.target = equation2.target;
            }
            t += distance;
        }
        return obj_collision;
    }
    else if(equation1.x1 !== equation1.x3 && equation2.x1 === equation2.x3){
        while(t <= 1){
            x1 = Math.pow((1 - t), 2)*equation1.x1 + 2*(1 - t)*t*equation1.x3 + Math.pow(t, 2)*equation1.x2;
            y1 = Math.pow((1 - t), 2)*equation1.y1 + 2*(1 - t)*t*equation1.y3 + Math.pow(t, 2)*equation1.y2;
            if(t !== 0.9999999999999999){
                x1 = Math.round(x1); 
                y1 = Math.round(y1);
            }
            if(t !== 0){
                x2 = Math.pow((1 - (t-0.1)), 2)*equation1.x1 + 2*(1 - (t-0.1))*(t-0.1)*equation1.x3 + Math.pow((t-0.1), 2)*equation1.x2;
                y2 = Math.pow((1 - (t-0.1)), 2)*equation1.y1 + 2*(1 - (t-0.1))*(t-0.1)*equation1.y3 + Math.pow((t-0.1), 2)*equation1.y2;
                x2 = Math.round(x2); 
                y2 = Math.round(y2);
            }
            else{
                x2 = Math.pow((1 - (t+0.1)), 2)*equation1.x1 + 2*(1 - (t+0.1))*(t+0.1)*equation1.x3 + Math.pow((t+0.1), 2)*equation1.x2;
                y2 = Math.pow((1 - (t+0.1)), 2)*equation1.y1 + 2*(1 - (t+0.1))*(t+0.1)*equation1.y3 + Math.pow((t+0.1), 2)*equation1.y2;
                x2 = Math.round(x2); 
                y2 = Math.round(y2); 
            }
            t += distance;
            if(linesCross(equation2.x1, equation2.y1, equation2.x2, equation2.y2, x2, y2, x1, y1)) {
                obj_collision.result = true;
                obj_collision.target = equation2.target;
            }
        }
        return obj_collision;
    }
    else{
        while(t <= 1){
            x1 = Math.pow((1 - t), 2)*equation1.x1 + 2*(1 - t)*t*equation1.x3 + Math.pow(t, 2)*equation1.x2;
            y1 = Math.pow((1 - t), 2)*equation1.y1 + 2*(1 - t)*t*equation1.y3 + Math.pow(t, 2)*equation1.y2;
            if(t !== 0.9){
                x1 = Math.round(x1); 
                y1 = Math.round(y1);
            }
            if(t !== 0){
                x2 = Math.pow((1 - (t-0.1)), 2)*equation1.x1 + 2*(1 - (t-0.1))*(t-0.1)*equation1.x3 + Math.pow((t-0.1), 2)*equation1.x2;
                y2 = Math.pow((1 - (t-0.1)), 2)*equation1.y1 + 2*(1 - (t-0.1))*(t-0.1)*equation1.y3 + Math.pow((t-0.1), 2)*equation1.y2;
                x2 = Math.round(x2); 
                y2 = Math.round(y2);
            }
            else{
                x2 = Math.pow((1 - (t+0.1)), 2)*equation1.x1 + 2*(1 - (t+0.1))*(t+0.1)*equation1.x3 + Math.pow((t+0.1), 2)*equation1.x2;
                y2 = Math.pow((1 - (t+0.1)), 2)*equation1.y1 + 2*(1 - (t+0.1))*(t+0.1)*equation1.y3 + Math.pow((t+0.1), 2)*equation1.y2;
                x2 = Math.round(x2); 
                y2 = Math.round(y2); 
            }
            t += distance;
            t1 = 0;
            while(t1 <= 1){
                x3 = Math.pow((1 - t1), 2)*equation2.x1 + 2*(1 - t1)*t1*equation2.x3 + Math.pow(t1, 2)*equation2.x2;
                y3 = Math.pow((1 - t1), 2)*equation2.y1 + 2*(1 - t1)*t1*equation2.y3 + Math.pow(t1, 2)*equation2.y2;
                if(t1 !== 0.9){
                    x3 = Math.round(x3); 
                    y3 = Math.round(y3);
                }
                if(t1 !== 0){
                    x4 = Math.pow((1 - (t1-0.1)), 2)*equation2.x1 + 2*(1 - (t1-0.1))*(t1-0.1)*equation2.x3 + Math.pow((t1-0.1), 2)*equation2.x2;
                    y4 = Math.pow((1 - (t1-0.1)), 2)*equation2.y1 + 2*(1 - (t1-0.1))*(t1-0.1)*equation2.y3 + Math.pow((t1-0.1), 2)*equation2.y2;
                    x4 = Math.round(x4); 
                    y4 = Math.round(y4);
                }
                else{
                    x4 = Math.pow((1 - (t1+0.1)), 2)*equation2.x1 + 2*(1 - (t1+0.1))*(t1+0.1)*equation2.x3 + Math.pow((t1+0.1), 2)*equation2.x2;
                    y4 = Math.pow((1 - (t1+0.1)), 2)*equation2.y1 + 2*(1 - (t1+0.1))*(t1+0.1)*equation2.y3 + Math.pow((t1+0.1), 2)*equation2.y2;
                    x4 = Math.round(x4); 
                    y4 = Math.round(y4);
                }
                t1 += distance;
                if(linesCross(x2, y2, x1, y1, x4, y4, x3, y3)) {
                    obj_collision.result = true;
                    obj_collision.target = equation2.target;
                }
            }
        }
        return obj_collision; 
    }
}

function getEquationForLine(x1, y1, equation){
    const k = -1 / equation.k;
    const a = Math.sqrt((equation.x1 - x1)**2 +  (equation.y1 - y1) ** 2);

    return  {
        xTop: -x1,
        xBottom: -(equation.xTop || 1) / equation.xBottom,
        yTop: -y1,
        yBottom: (equation.yTop  || 1) / equation.yBottom,
        k,
        b: (equation.y2 - equation.y1 >= 0 ? -1 : 1) * Math.sqrt((a * k) ** 2 + a**2) - (equation.y1 + equation.x1 / equation.k),
    };

}

function moveTo(equation, move, x){
    let lenA = Math.sqrt((equation.x2 - equation.x1) ** 2 + (equation.y2 - equation.y1) ** 2);


    //Чтобы узнать знак сдвига. То есть убывает или возрастает прямая, от этого всё зависит
    //move = move * (equation.x2 - equation.x1 < 0 ? -1 : 1);
    const alfa = (equation.x2 - equation.x1) < 0 ? -1 : 1;
    let lenA2;

    if(x === undefined){
        lenA2 = lenA + move;
    } else {
        lenA2 = Math.sqrt((x - equation.x1) ** 2 + (getCoordinates(equation, x) - equation.y1) ** 2) + move
    }

    let k = lenA2 / lenA;
    let newX;

    if(!Number.isNaN(k)){
        newX = Math.abs(k * Math.abs(equation.x2 - equation.x1) + alfa * equation.x1);
    } else {
        newX = x + move;
    }

    return {
        x: newX,
        y: getAnotherCoordinateOfStraight({equation, x: newX}),
    }
}



export {getCoordinates, getEquationForLine, moveTo, length, collision};