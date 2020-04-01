export const targetService = {
    getSingle,
    getPage,
    getList,
    insert,
    update,
    remove,
    setTarget
};

/**
 * Holds configuration info for interacting with any attached APIs.
 */
const config = {
    apiUrl: process.env.REACT_APP_API_URL || 'https://localhost:5001/api'
};

/**
 * 
 * @param {*} id 
 */
function getSingle(id) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };

    return fetch(`${config.apiUrl}/target/${id}`, requestOptions).then(handleResponse);
};

/**
 * 
 */
function getPage() {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    };

    return fetch(`${config.apiUrl}/target/page`, requestOptions).then(handleResponse);
}

/**
 * 
 * @param {*} idList 
 */
function getList(idList) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };

    return fetch(`${config.apiUrl}/target/${idList}`, requestOptions).then(handleResponse);
};

/**
 * 
 * @param {*} targetDoc 
 */
function insert(targetDoc) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(targetDoc)
    };

    return fetch(`${config.apiUrl}/target/insert`, requestOptions).then(handleResponse);
};

/**
 * 
 * @param {*} targetDoc 
 */
function update(targetDoc) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(targetDoc)
    };

    return fetch(`${config.apiUrl}/target/update`, requestOptions).then(handleResponse);
};

/**
 * 
 * @param {*} id 
 */
function remove(id) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(id)
    };

    return fetch(`${config.apiUrl}/target/remove`, requestOptions).then(handleResponse);
};

/**
 * 
 */
function setTarget(target) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(target)
    };

    return fetch(`${config.apiUrl}/target/set/${target}`, requestOptions).then(handleResponse);
};


/**
 * 
 * @param {*} response 
 */
function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                // authenticationService.logout();
                Location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}