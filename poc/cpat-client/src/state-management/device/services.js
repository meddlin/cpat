import { handlers } from '../../state-management/helpers/http-response-handler';

export const deviceService = {
    getSingle,
    getPage,
    getList,
    insert,
    update,
    partialUpdate,
    remove
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

    return fetch(`${handlers.config.apiUrl}/device/get/${id}`, requestOptions).then(handlers.handleHttpResponse);
};

/**
 * 
 */
function getPage() {
    const page = 1;
    const pageSize = 3;

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({page: 1, pageSize: 3})
    };

    return fetch(`${handlers.config.apiUrl}/device/page`, requestOptions).then(handlers.handleHttpResponse);
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

    return fetch(`${handlers.config.apiUrl}/device/getlist/${idList}`, requestOptions).then(handlers.handleHttpResponse);
};

/**
 * 
 * @param {*} deviceDoc 
 */
function insert(deviceDoc) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(deviceDoc)
    };

    return fetch(`${handlers.config.apiUrl}/device/insert`, requestOptions).then(handlers.handleHttpResponse);
};

/**
 * 
 * @param {*} deviceDoc 
 */
function update(deviceDoc) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(deviceDoc)
    };

    return fetch(`${handlers.config.apiUrl}/device/update`, requestOptions).then(handlers.handleHttpResponse);
};

/**
 * Used for partial document updates via JSON Merge Patch mechanism.
 * @param {*} docId 
 * @param {*} deviceDoc 
 */
function partialUpdate(docId, deviceDoc) {
    const requestOptions = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/merge-patch+json'},
        body: JSON.stringify(deviceDoc)
    };

    return fetch(`${handlers.config.apiUrl}/device/PartialUpdate/${docId}`, requestOptions).then(handlers.handleHttpResponse);
}

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

    return fetch(`${handlers.config.apiUrl}/device/remove`, requestOptions).then(handlers.handleHttpResponse);
};