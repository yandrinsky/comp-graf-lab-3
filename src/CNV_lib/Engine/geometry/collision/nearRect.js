export const nearRect = (
    { x, y, height, width, distance = 0, userY, userX, e },
    callbackSuccess = [],
    callbackFail = []
) => {
    if (callbackSuccess) {
        if (callbackSuccess instanceof Function) {
            callbackSuccess = [callbackSuccess];
        }
    }

    if (callbackFail) {
        if (callbackFail instanceof Function) {
            callbackFail = [callbackFail];
        }
    }

    const isYMatch = userY >= y - distance && userY <= y + height + distance;
    const isXMatch = userX >= x - distance && userX <= x + width + distance;

    if (isYMatch && isXMatch) {
        callbackSuccess.forEach(callback => {
            callback(e);
        });

        return true;
    }

    callbackFail.forEach(callback => {
        callback(e);
    });

    return false;
};
