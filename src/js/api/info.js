import ajax from "./ajax";

export const getItems = (path = []) => {
    let url = "info";

    if (path.length > 0) {
        const urlSuffix = path.join("/");
        url = `${url}/${urlSuffix}`;
    }

    return ajax.get(url);
};