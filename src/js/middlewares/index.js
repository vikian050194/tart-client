export { thunk } from "./thunk";
export { logger } from "./logger";

import { compose } from "utils";

export const applyMiddleware = (...middlewares) => {
    return (createStore) => (reducer, preloadedState, enhancer) => {
        const store = createStore(reducer, preloadedState, enhancer);

        const middlewareAPI = {
            getState: store.getState,
            dispatch: (action) => store.dispatch(action)
        };

        const chain = middlewares.map(middleware => middleware(middlewareAPI));
        const dispatch = compose(...chain)(store.dispatch);

        return {
            ...store,
            dispatch
        };
    };
};