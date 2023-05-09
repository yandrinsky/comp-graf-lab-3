import Store from "../../Store";
import {querySelectorAllEngine} from "../cssEngine/selecting";
import {getEquationFrom2Points} from "../geometry/line/get-equation-from-2-points";
const {moveTo, getEquationForLine, getCoordinates} = require("../geometry/geometry");

function pointer(link, {context, shift, ...props}){
    console.log("pointer", props);
    console.log("context", context);
    console.log("shift", shift);

    const style = link.getCSS();

    const config = {
        x0: link.start.x + shift.x,
        y0: link.start.y + shift.y,
        x1: link.end.x + shift.x,
        y1: link.end.y + shift.y,
        x2: link.check.x + shift.x,
        y2: link.check.y + shift.y,
    }

    //Чтобы срелочки после выхода за границы экрана не творили дичь
    if(config.x1 < 3){
        return;
    }

    let triangleRadius = 3;
    let eqInit = getEquationFrom2Points(config.x2, config.y2, config.x1, config.y1);

    let linePosition = moveTo(eqInit, -triangleRadius * 2);
    let equation = getEquationForLine(linePosition.x, linePosition.y, eqInit);

    let len = 50;

    equation.x1 = linePosition.x - len;
    equation.y1 = getCoordinates(equation, linePosition.x - len);
    equation.x2 = linePosition.x + len;
    equation.y2 = getCoordinates(equation, linePosition.x + len);

    let startPoint = moveTo(equation, -triangleRadius, linePosition.x);
    let endPoint = moveTo(equation, triangleRadius, linePosition.x);

    context.fillStyle = style.color;

    context.beginPath();
    context.moveTo(startPoint.x, startPoint.y);
    context.lineTo(endPoint.x, endPoint.y);
    context.lineTo(config.x1,config.y1);
    context.fill();
}

//props: context, shift
function pointersRender(props){
    querySelectorAllEngine("line").forEach(shape => {
        if(shape.isPointer){
            pointer(shape.link, props);
        }
    })
}

export default pointersRender;