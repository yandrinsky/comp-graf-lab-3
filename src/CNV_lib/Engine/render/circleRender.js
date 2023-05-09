import Store from "../../Store";

function circleRender({link}){
    const style = Store.state.styleEngine.getShapeStyles(link);
    const {context, shift} = Store.state;
    
    if(!(style.visibility === "hidden")){
        if(style.border){
            context.beginPath();
            context.fillStyle = style.border.color;
            context.arc(
                link.start.x + shift.x,
                link.start.y + shift.y,
                style.radius + style.border.width,
                style.startAngle,
                style.endAngle
            );
            context.fill();
        }

        context.beginPath();
        context.fillStyle = style.color;

        context.arc(
            link.start.x + shift.x,
            link.start.y + shift.y,
            style.radius,
            style.startAngle,
            style.endAngle
        );

        context.fill();
    }
}

export default circleRender;