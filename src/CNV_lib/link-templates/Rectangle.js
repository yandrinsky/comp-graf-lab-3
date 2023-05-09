import Standard from "./Standard";
import Store from "../Store";

class Rectangle extends Standard{
    constructor(config) {
        super({...config, type: "rect"});
        this.width = config.width;
        this.height = config.height;
    }

    getCoords(){
        return{
            start: {
                x: this.start.x,
                y: this.start.y,
            },

            vertexes: {
                x1: this.start.x,
                y1: this.start.y,
                x2: this.start.x + this.width,
                y2: this.start.y,
                x3: this.start.x + this.width,
                y3: this.start.y + this.height,
                x4: this.start.x,
                y4: this.start.y + this.height,
            },

            width: this.width,
            height: this.height,
        }
    }

    getShiftCoords(){
        return{
            start: {
                x: this.start.x + Store.state.shift.x,
                y: this.start.y + Store.state.shift.y,
            },

            vertexes: {
                x1: this.start.x + Store.state.shift.x,
                y1: this.start.y + Store.state.shift.y,
                x2: this.start.x + this.width + Store.state.shift.x,
                y2: this.start.y + Store.state.shift.y,
                x3: this.start.x + this.width + Store.state.shift.x,
                y3: this.start.y + this.height + Store.state.shift.y,
                x4: this.start.x + Store.state.shift.x,
                y4: this.start.y + this.height + Store.state.shift.y,
            },

            width: this.width,
            height: this.height,
        }
    }
}

export default Rectangle;