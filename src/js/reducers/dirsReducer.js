import { types } from "actions";

const defaultState = [];

export const dirsReducer = (previousState = defaultState, action) => {
    switch (action.type) {
        case types.FETCH_LIST_SUCCESS: {
            return [...action.value.dirs];
        }
        default:
            return previousState;
    }
};