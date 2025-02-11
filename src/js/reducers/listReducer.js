import { types } from "actions";

const defaultState = {
    path: [],
    dirs: [],
    files: []
};

export const listReducer = (previousState = defaultState, action) => {
    switch (action.type) {
        case types.FETCH_LIST_SUCCESS: {
            return {
                path: action.value.path,
                dirs: action.value.dirs,
                files: action.value.files
            };
        }
        default:
            return previousState;
    }
};