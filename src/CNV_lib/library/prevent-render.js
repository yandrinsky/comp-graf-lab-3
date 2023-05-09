import Store from "../Store";

export const preventRender = (callback) => {
    Store.state.shouldRenderUpdates = false;
    callback();
    Store.state.shouldRenderUpdates = true;
}