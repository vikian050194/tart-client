const makeRequest = (method = "GET", url, data) => {
    if (!url) {
        throw new Error("url could not be empty");
    }

    return fetch(`/api/${url}`, {
        method,
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json"
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: data ? JSON.stringify(data) : null
    }).then(response => {
        if (response.status === 200) {
            return response.json();
        }

        return {};
    })
        .then(response => {
            return response;
        }).catch(error => {
            throw new Error(error);
        });

};

const get = (url) => {
    return makeRequest("GET", url);
};

const post = (url, data) => {
    return makeRequest("POST", url, data);
};

const patch = (url, data) => {
    return makeRequest("PATCH", url, data);
};

const put = (url, data) => {
    return makeRequest("PUT", url, data);
};

const del = (url) => {
    return makeRequest("DELETE", url);
};

export default {
    get,
    post,
    patch,
    put,
    delete: del
};