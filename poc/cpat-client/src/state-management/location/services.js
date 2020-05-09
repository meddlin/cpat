import { handlers } from '../../state-management/helpers/http-response-handler';

export const locationService = {
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

    return fetch(`${handlers.config.apiUrl}/table/${id}`, requestOptions).then(handlers.handleHttpResponse);
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

    return fetch(`${handlers.config.apiUrl}/location/page`, requestOptions).then(handlers.handleHttpResponse);
}

/**
 * 
 * @param {*} idList 
 */
function getList(idList) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(idList)
    };

    return fetch(`${handlers.config.apiUrl}/location/getList`, requestOptions).then(handlers.handleHttpResponse);
};

/**
 * 
 * @param {*} locationDoc 
 */
function insert(locationDoc) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(locationDoc)
    };

    return fetch(`${handlers.config.apiUrl}/location/insert`, requestOptions).then(handlers.handleHttpResponse);
};

/**
 * 
 * @param {*} locationDoc 
 */
function update(locationDoc) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(locationDoc)
    };

    return fetch(`${handlers.config.apiUrl}/table`, requestOptions).then(handlers.handleHttpResponse);
};

/**
 * Used for partial document updates via JSON Merge Patch mechanism.
 * @param {*} docId 
 * @param {*} locationDoc 
 */
function partialUpdate(docId, locationDoc) {
    const requestOptions = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/merge-patch+json'},
        body: JSON.stringify(locationDoc)
    };

    return fetch(`${handlers.config.apiUrl}/location/PartialUpdate/${docId}`, requestOptions).then(handlers.handleHttpResponse);
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

    return fetch(`${handlers.config.apiUrl}/table`, requestOptions).then(handlers.handleHttpResponse);
};