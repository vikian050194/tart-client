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
            return {
                ...previousState,
                possible: {
                    ...previousState.possible,
                    years: [...action.value.years],
                    months: [...action.value.months]
                }
            };
        }
        case types.YEAR_ADD: {
            return { ...previousState, selected: { ...previousState.selected, years: [...previousState.selected.years, action.value] } };
        }
        case types.YEAR_REMOVE: {
            const years = previousState.selected.years.filter(y => y !== action.value);
            return { ...previousState, selected: { ...previousState.selected, years } };
        }
        case types.MONTH_ADD: {
            return { ...previousState, selected: { ...previousState.selected, months: [...previousState.selected.months, action.value] } };
        }
        case types.MONTH_REMOVE: {
            const months = previousState.selected.months.filter(y => y !== action.value);
            return { ...previousState, selected: { ...previousState.selected, months } };
        }
        default:
            return previousState;
    }
};