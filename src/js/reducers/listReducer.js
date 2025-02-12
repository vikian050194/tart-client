import { types } from "actions";

const defaultState = {
    index: 0,
    path: [],
    dirs: [],
    files: []
};

export const listReducer = (previousState = defaultState, action) => {
    switch (action.type) {
        case types.FETCH_LIST_SUCCESS: {
            return {
                ...previousState,
                path: action.value.path,
                dirs: action.value.dirs,
                files: action.value.files
            };
        }
        case types.NEXT_IMAGE: {
            let nextIndex = previousState.index + 1;
            if (previousState.files.length === 0) {
                nextIndex = 0;
            }
            if (nextIndex === previousState.files.length) {
                nextIndex = 0;
            }
            return {
                ...previousState,
                index: nextIndex
            };
        }
        case types.PREVIOUS_IMAGE: {
            let nextIndex = previousState.index - 1;
            if (previousState.files.length === 0) {
                nextIndex = 0;
            }
            return {
                ...previousState,
                index: nextIndex
            };
        }
        default:
            return previousState;
    }
};