import Store from '../../../Store';
import { getProxyEventHandlerObject } from './get-proxy-event-handers-object';

export const mouseupRegister = ({ id }) => {
    Store.state.mouseup[id] = getProxyEventHandlerObject({
        onAdd: () => {
            if (!Store.state.__mouseClickTargets.includes(id)) {
                Store.state.__mouseClickTargets.push(id);
            }
        },

        onBecomeEmpty: () => {
            if (Store.state.__mouseClickTargets.includes(id)) {
                Store.state.__mouseClickTargets.splice(
                    Store.state.__mouseClickTargets.indexOf(id),
                    1
                );
            }
        }
    });
};
