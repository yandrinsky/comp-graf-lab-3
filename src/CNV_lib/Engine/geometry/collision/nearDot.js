export const nearDot = (config, callbackSuccess = [], callbackFail = []) => {
    let distance = config.distance ?? 5;

    const {start: {x, y}} = config.circle.getShiftCoords();
    const {userX, userY} = config;

    if(callbackSuccess){
        if(callbackSuccess instanceof Function){
            callbackSuccess = [callbackSuccess];
        } else {
            callbackSuccess = [()=>{}]
        }
    }

    if(callbackFail){
        if(callbackFail instanceof Function){
            callbackFail = [callbackFail];
        } else {
            callbackFail = [()=> {}];
        }
    }


    if((userX < x + distance && userX > x - distance) && (userY < y + distance && userY > y - distance)) {
        callbackSuccess.forEach((callback)=>{
            callback(config.e);
        })

        return true;
    } else {
        callbackFail.forEach((callback)=>{
            callback(config.e);
        })

        return false
    }
}