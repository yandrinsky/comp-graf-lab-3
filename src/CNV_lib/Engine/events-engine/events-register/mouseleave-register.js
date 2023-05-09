import Store from '../../../Store';
import { getProxyEventHandlerObject } from './get-proxy-event-handers-object';

export const mouseleaveRegister = ({ id }) => {
    Store.state.mouseleave[id] = getProxyEventHandlerObject({
        onAdd: () => {
            if (!Store.state.__mouseMoveTargets.includes(id)) {
                Store.state.__mouseMoveTargets.push(id);
            }
        },

        onBecomeEmpty: () => {
            if (Store.state.__mouseMoveTargets.includes(id)) {
                Store.state.__mouseMoveTargets.splice(
                    Store.state.__mouseMoveTargets.indexOf(id),
                    1
                );
            }
        }
    });
};
