import {isStraightCollision} from "./isStraightCollision";
import {getAnotherCoordinateOfStraight} from "../line/get-another-coordinate-of-straight";

export const getStraightCollisionCoordinates = (equation1, equation2) => {
    if(!isStraightCollision(equation1, equation2)) {
        return null;
    }


    const x = (equation2.b - equation1.b) / (equation1.k - equation2.k);
    const y = getAnotherCoordinateOfStraight({equation: equation1, x});

    return {x, y};
}