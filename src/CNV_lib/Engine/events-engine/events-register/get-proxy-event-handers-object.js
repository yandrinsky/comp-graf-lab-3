export const getProxyEventHandlerObject = ({ onBecomeEmpty, onAdd, onRemove }) => {
    const onRemoveBehavior = ({ target, p }) => {
        delete target[p];
        onRemove?.();

        if (!Object.keys(target).length) {
            onBecomeEmpty?.();
        }
    };

    const onAddBehavior = ({ target, p, value }) => {
        target[p] = value;
        onAdd?.();
    };

    return new Proxy(
        {},
        {
            set(target, p, value, receiver) {
                if (value === undefined || value === null) {
                    onRemoveBehavior({ target, p });
                } else {
                    onAddBehavior({ target, p, value });
                }

                return true;
            },

            deleteProperty(target, p) {
                onRemoveBehavior({ target, p });

                return true;
            }
        }
    );
};
