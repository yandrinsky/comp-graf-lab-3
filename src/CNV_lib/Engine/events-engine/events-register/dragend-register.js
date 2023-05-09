import Store from '../../../Store';
import { getProxyEventHandlerObject } from './get-proxy-event-handers-object';

export const dragendRegister = ({ id }) => {
    Store.state.dragend[id] = getProxyEventHandlerObject({});
};
