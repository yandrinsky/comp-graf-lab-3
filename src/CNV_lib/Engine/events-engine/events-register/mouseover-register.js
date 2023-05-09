import Store from '../../../Store';
import { getProxyEventHandlerObject } from './get-proxy-event-handers-object';

export const mouseoverRegister = ({ id }) => {
    Store.state.mouseover[id] = getProxyEventHandlerObject({
        onAdd: () => {
            if (!Store.state.__mouseMoveTargets.includes(id)) {
                Store.state.__mouseMoveTargets.push(id);
            }
        },

        //TODO неверно. Если опустеет объект с over это не значит, что ничего нет в enter, leave и т.д, а тут произойдет удаление
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
