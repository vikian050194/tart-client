import { types } from "actions";

const defaultState = {
    index: 0,
    items: []
};

export const filesReducer = (previousState = defaultState, action) => {
    switch (action.type) {
        case types.FETCH_LIST_SUCCESS: {
            return {
                items: action.value.files,
                index: 0
            };
        }
        case types.NEXT_IMAGE: {
            let nextIndex = previousState.index + 1;
            if (previousState.items.length === 0) {
                nextIndex = 0;
            }
            if (nextIndex === previousState.items.length) {
                nextIndex = 0;
            }
            return {
                ...previousState,
                index: nextIndex
            };
        }
        case types.PREVIOUS_IMAGE: {
            let nextIndex = previousState.index - 1;
            if (previousState.items.length === 0) {
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