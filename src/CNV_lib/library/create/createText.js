import { createShape } from './createShape';
import Text from '../../link-templates/Text';

export const createText = config => {
    let link = new Text(config);
    return createShape(link);
};
