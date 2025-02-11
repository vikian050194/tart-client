import {
    combineReducers,
    listReducer
} from "reducers";
import {
    applyMiddleware,
    logger,
    thunk
} from "middlewares";
// import { compose } from "utils";
import { createAction, types } from "actions";
import { createStore } from "./createStore";

// TODO remove default state?
const defaultState = {
};

export const configureStore = (initialState = {}) => {
    const reducer = combineReducers({
        items: listReducer
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