import Store from "../../Store";

function rectRender({link}){
    const style = Store.state.styleEngine.getShapeStyles(link);
    const context = Store.state.context;

    const coords = style.position === "sticky" ? link.getCoords() : link.getShiftCoords();

    context.beginPath();
    context.fillStyle = style.backgroundColor;
    context.fillRect(coords.start.x, coords.start.y, link.width, link.height);
}

export default rectRender;