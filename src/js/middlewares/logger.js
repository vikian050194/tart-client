export const logger = store => next => action => {
    if (typeof (action) === "object") {
        console.log("dispatching", action);
    } else if (typeof (action) === "function") {
        console.log("dispatching", "function");
    } else {
        throw Error("action should be a function or an object");
    }

    const result = next(action);

    console.log("next state", store.getState());

    return result;
};
