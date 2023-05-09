import Standard from "./Standard";
import Store from "../Store";

class Circle extends Standard{
    constructor(config) {
        super({...config, type: "circle"});
    }

    getCoords(){
        return{
            start: {
                x: this.start.x,
                y: this.start.y,
            }
        }
    }

    getShiftCoords(){
        return{
            start: {
                x: this.start.x + Store.state.shift.x,
                y: this.start.y + Store.state.shift.y,
            }
        }
    }
}

export default Circle;