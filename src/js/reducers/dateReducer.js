import { types } from "actions";

const defaultState = {
    possible: {
        years: [],
        months: [],
        days: []
    },
    available: {
        years: [],
        months: [],
        days: []
    }
};

export const dateReducer = (previousState = defaultState, action) => {
    switch (action.type) {
        case types.FETCH_LIST_SUCCESS: {
            return {...previousState, possible: {...previousState.possible, years: [...action.value.years]}};
        }
        default:
            return previousState;
    }
};