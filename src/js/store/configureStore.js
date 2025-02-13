import {
    combineReducers,
    dirsReducer,
    filesReducer,
    pathReducer
} from "reducers";
import {
    applyMiddleware,
    logger,
    thunk
} from "middlewares";
import { createAction, types } from "actions";
import { createStore } from "./createStore";

// TODO remove default state?
const defaultState = {
};

export const configureStore = (initialState = {}) => {
    const reducer = combineReducers({
        dirs: dirsReducer,
        files: filesReducer,
        path: pathReducer
    });
    const state = { ...defaultState, ...initialState };
    const middlewares = [
        thunk,
        logger
    ];

    const enhancer = applyMiddleware(...middlewares);
    const store = createStore(reducer, state, enhancer);

    store.dispatch(createAction(types.APP_INIT)());

    return store;
};