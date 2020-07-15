import { handlers } from '../../state-management/helpers/http-response-handler';

export const personService = {
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

    return fetch(`${handlers.config.apiUrl}/person/get/${id}`, requestOptions).then(handlers.handleHttpResponse);
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

    return fetch(`${handlers.config.apiUrl}/person/page`, requestOptions).then(handlers.handleHttpResponse);
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

    return fetch(`${handlers.config.apiUrl}/person/${idList}`, requestOptions).then(handlers.handleHttpResponse);
};

/**
 * 
 * @param {*} personDoc 
 */
function insert(personDoc) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(personDoc)
    };

    return fetch(`${handlers.config.apiUrl}/person/insert`, requestOptions).then(handlers.handleHttpResponse);
};

/**
 * 
 * @param {*} personDoc 
 */
function update(personDoc) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(personDoc)
    };

    return fetch(`${handlers.config.apiUrl}/table`, requestOptions).then(handlers.handleHttpResponse);
};

/**
 * Used for partial document updates via JSON Merge Patch mechanism.
 * @param {*} docId 
 * @param {*} targetDoc 
 */
function partialUpdate(docId, targetDoc) {
    const requestOptions = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/merge-patch+json'},
        body: JSON.stringify(targetDoc)
    };

    return fetch(`${handlers.config.apiUrl}/person/PartialUpdate/${docId}`, requestOptions).then(handlers.handleHttpResponse);
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

    return fetch(`${handlers.config.apiUrl}/person/remove`, requestOptions).then(handlers.handleHttpResponse);
};