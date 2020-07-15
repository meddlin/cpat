import { handlers } from '../../state-management/helpers/http-response-handler';

export const companyService = {
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

    return fetch(`${handlers.config.apiUrl}/company/get/${id}`, requestOptions).then(handlers.handleHttpResponse);
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

    return fetch(`${handlers.config.apiUrl}/company/page`, requestOptions).then(handlers.handleHttpResponse);
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

    return fetch(`${handlers.config.apiUrl}/company/${idList}`, requestOptions).then(handlers.handleHttpResponse);
};

/**
 * 
 * @param {*} companyDoc 
 */
function insert(companyDoc) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(companyDoc)
    };

    return fetch(`${handlers.config.apiUrl}/company/insert`, requestOptions).then(handlers.handleHttpResponse);
};

/**
 * 
 * @param {*} companyDoc 
 */
function update(companyDoc) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(companyDoc)
    };

    return fetch(`${handlers.config.apiUrl}/company/update`, requestOptions).then(handlers.handleHttpResponse);
};

/**
 * Used for partial document updates via JSON Merge Patch mechanism.
 * @param {*} docId 
 * @param {*} companyDoc 
 */
function partialUpdate(docId, companyDoc) {
    const requestOptions = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/merge-patch+json'},
        body: JSON.stringify(companyDoc)
    };

    return fetch(`${handlers.config.apiUrl}/company/PartialUpdate/${docId}`, requestOptions).then(handlers.handleHttpResponse);
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

    return fetch(`${handlers.config.apiUrl}/company/remove`, requestOptions).then(handlers.handleHttpResponse);
};