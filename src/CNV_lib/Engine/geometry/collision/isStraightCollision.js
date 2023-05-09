export const isStraightCollision = (equation1, equation2) => {
    console.log(equation1.k - equation2.k)
    return (equation1.k - equation2.k) !== 0
}