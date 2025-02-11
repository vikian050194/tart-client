import * as types from "../actionTypes";
import { createAction } from "../createAction";
import * as api from "api";

const onSuccess = (items) => createAction(types.FETCH_LIST_SUCCESS)(items);
const onFail = (error) => createAction(types.FETCH_LIST_ERROR)(error);

export const fetchItemsAction = () => {
    return (dispatch, getState) => {
        const path = [...getState().items.path];
        api.getItems(path)
            .then((data) => {
                dispatch(onSuccess({
                    dirs: data.dirs,
                    files: data.files,
                    path
                }));
            })
            .catch(error => dispatch(onFail(error)));
    };
};

export const updatePathAndFetchItemsAction = (dir) => {
    return (dispatch, getState) => {
        const path = [...getState().items.path, dir];
        api.getItems(path)
            .then((data) => {
                dispatch(onSuccess({
                    dirs: data.dirs,
                    files: data.files,
                    path
                }));
            })
            .catch(error => dispatch(onFail(error)));
    };
};

export const undoPathAndFetchItemsAction = () => {
    return (dispatch, getState) => {
        const path = getState().items.path.slice(0, -1);
        api.getItems(path)
            .then((data) => {
                dispatch(onSuccess({
                    dirs: data.dirs,
                    files: data.files,
                    path
                }));
            })
            .catch(error => dispatch(onFail(error)));
    };
};

