export const nearLine = (config, callbackSuccess = [], callbackFail = []) => {
    if(callbackSuccess){
        if(callbackSuccess instanceof Function){
            callbackSuccess = [callbackSuccess];
        }
    }

    if(callbackFail){
        if(callbackFail instanceof Function){
            callbackFail = [callbackFail];
        }
    }

    let res;
    const {userX, userY, x1, y1, y2, x2, x3, y3} = config;
    const x0 = userX;
    const y0 = userY;

    if(x1 === x3 && y1 === y3){
        res = isNearLineCalc({x0, y0, x1, y1, x2, y2, distance: config.distance ?? 5});
    } else {
        res = isNearCurveCalc(
            {
                start: {x: x1, y: y1},
                end: {x: x2, y: y2},
                check: {x: x3, y: y3},
            }, { x: x0, y: y0 }
        )
    }

    if (res) {
        callbackSuccess.forEach((callback)=>{
            callback(config.e);
        })
    } else {
        callbackFail.forEach((callback)=>{
            callback(config.e);
        })
    }

    return res;
}


function isNearLineCalc({x0, x1, x2, y0, y1, y2, distance = 5}){
    function dist (x1,y1,x2,y2){
        return Math.sqrt((x2-x1)**2 + (y2-y1)**2);
    }

    let r1 = dist(x0, y0, x1, y1);
    let r2 = dist(x0, y0, x2, y2);
    let r12 = dist(x1, y1, x2, y2);


    if(r1 < dist(r2, r12,0,0) && r2 < dist(r1,r12,0,0)){
        let a = y2 - y1;
        let b = x1 - x2;
        let c = -x1 * (y2 - y1) + y1 * (x2 - x1);
        let t = dist(a,b,0,0);

        if (c>0){
            a = -a;
            b = -b;
            c = -c;
        }

        let r0 =(a * x0 + b * y0 + c) / t;

        return r0 > -distance && r0 < distance;
    } else {
        return false;
    }

}

function isNearCurveCalc(line, mouse){
    let t = 0;
    let x = 0;
    let y = 0;
    let flag = false;

    while(t <= 1){
        x = Math.pow((1 - t), 2)*line.start.x + 2*(1 - t)*t*line.check.x + Math.pow(t, 2)*line.end.x;
        y = Math.pow((1 - t), 2)*line.start.y + 2*(1 - t)*t*line.check.y + Math.pow(t, 2)*line.end.y;
        x = Math.round(x)
        y = Math.round(y)

        for(let i = 0; i < 6; i++){
            if((x+i) === mouse.x && (y+i) === mouse.y) flag = true;
            if((x-i) === mouse.x && (y-i) === mouse.y) flag = true;
        }

        t += 0.001;
    }

    return flag;
}