export const createStore = (reducer, preloadedState, enhancer) => {
    if (typeof preloadedState === "function" && typeof enhancer === "undefined") {
        enhancer = preloadedState;
        preloadedState = undefined;
    }

    if (typeof enhancer !== "undefined") {
        if (typeof enhancer !== "function") {
            throw new Error("Expected the enhancer to be a function.");
        }

        return enhancer(createStore)(reducer, preloadedState);
    }

    let currentState = preloadedState;
    const listeners = [];

    const getState = () => currentState;

    const subscribe = (callback) => {
        const removeListener = () => {
            const index = listeners.indexOf(callback);
            listeners.splice(index, 1);
        };
        listeners.push(callback);
        return { removeListener };
    };

    const dispatch = (action) => {
        const state = getState();
        currentState = reducer(state, action);
        listeners.forEach((callback) => {
            callback(currentState);
        });
    };

    return {
        dispatch,
        subscribe,
        getState
    };
};