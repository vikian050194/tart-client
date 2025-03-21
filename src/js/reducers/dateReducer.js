import { types } from "actions";

const defaultState = {
    selected: {
        years: [],
        months: [],
        days: []
    },
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
        case types.YEAR_ADD: {
            return {...previousState, selected: {...previousState.selected, years: [...previousState.selected.years, action.value] }};
        }
        case types.YEAR_REMOVE: {
            const years = previousState.selected.years.filter(y => y !== action.value);
            return {...previousState, selected: {...previousState.selected, years }};
        }
        default:
            return previousState;
    }
};