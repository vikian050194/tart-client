import { types } from "actions";

const defaultState = [];

export const pathReducer = (previousState = defaultState, action) => {
    switch (action.type) {
        case types.FETCH_LIST_SUCCESS: {
            return [...action.value.path];
        }
        default:
            return previousState;
    }
};