export const getPerpendicularLineEquationThrough = ({ equation, dot: { x, y } }) => {
    const k = -1 / equation.k;
    const b = y - k * x;

    return { ...equation, k, b };
};
