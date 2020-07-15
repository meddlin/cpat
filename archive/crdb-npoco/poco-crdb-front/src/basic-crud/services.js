export const crudService = {
    testGet,
    getAll,
    getSingle,
    insert,
    update,
    upsert,
    updateSnapshot,
    updateMany,
    remove,
    complexQuery
};

const config = {
    apiUrl: process.env.REACT_APP_API_URL || 'https://localhost:5001'
};

function testGet() {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    return fetch(`${config.apiUrl}/api/test/get`, requestOptions).then(handleResponse);
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    return fetch(`${config.apiUrl}/api/poco/getall`, requestOptions).then(handleResponse);
}

function getSingle(id) {
    id = '4a4824e2-7284-4b33-b0f8-ce2ab25435de';
    
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(id)
    };

    return fetch(`${config.apiUrl}/api/poco/getsingle`, requestOptions).then(handleResponse);
};

function insert(account) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(account)
    };

    return fetch(`${config.apiUrl}/api/poco/insert`, requestOptions).then(handleResponse);
}

function update(id, doc) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(doc)
    };

    return fetch(`${config.apiUrl}/api/poco/update/${id}`, requestOptions).then(handleResponse);
}

function upsert(id, doc) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(doc)
    };

    return fetch(`${config.apiUrl}/api/poco/upsert/${id}`, requestOptions).then(handleResponse);
}

function updateSnapshot(id, doc) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(doc)
    };

    return fetch(`${config.apiUrl}/api/poco/updateSnapshot/${id}`, requestOptions).then(handleResponse);
}

function updateMany(id, doc) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(doc)
    };

    return fetch(`${config.apiUrl}/api/poco/updateMany/${id}`, requestOptions).then(handleResponse);
}

function remove(account) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(account)
    };

    //return fetch(`${config.apiUrl}/api/poco/remove/${docId}`, requestOptions).then(handleResponse);
    return fetch(`${config.apiUrl}/api/poco/remove`, requestOptions).then(handleResponse);
}

function complexQuery() {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    return fetch(`${config.apiUrl}/api/poco/complexQuery`, requestOptions).then(handleResponse);
};


function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) Location.reload(true);

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}