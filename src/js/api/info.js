import ajax from "./ajax";

export const getItems = (path = [], params = {}) => {
    let url = "info";

    if (path.length > 0) {
        const urlSuffix = path.join("/");
        url = `${url}/${urlSuffix}`;
    }

    // TODO move params handling to ajax.js

    const pairs = [];
    for (const key in params) {
        for (const value of params[key]) {
            pairs.push(`${key}=${value}`);
        }
    }
    if (pairs) {
        url = `${url}?${pairs.join("&")}`;
    }

    return ajax.get(url);
};