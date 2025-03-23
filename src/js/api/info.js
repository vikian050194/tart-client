import ajax from "./ajax";

export const getItems = (path = [], params = {}) => {
    let url = "info";

    if (path.length > 0) {
        const urlSuffix = path.join("/");
        url = `${url}/${urlSuffix}`;
    }

    // TODO move params handling to ajax.js
    if (params) {
        url = `${url}?`;
    }

    for (const key in params) {
        const values = params[key].map(v => `${key}=${v}`).join("&");
        url = `${url}${values}`;
    }

    return ajax.get(url);
};