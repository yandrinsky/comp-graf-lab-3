import { createShape } from './createShape';
import Rectangle from '../../link-templates/Rectangle';

export const createRect = config => {
    let link = new Rectangle(config);
    return createShape(link);
};
