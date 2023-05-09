import Store from '../../../Store';
import { getProxyEventHandlerObject } from './get-proxy-event-handers-object';

export const dragstartRegister = ({ id }) => {
    Store.state.dragstart[id] = getProxyEventHandlerObject({});
};
