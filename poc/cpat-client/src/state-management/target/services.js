import { handlers } from '../../state-management/helpers/http-response-handler';

export const targetService = {
    getSingle,
    getPage,
    getList,
    insert,
    update,
    partialUpdate,
    remove,
    setTarget
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

    return fetch(`${handlers.config.apiUrl}/target/get/${id}`, requestOptions).then(handlers.handleHttpResponse);
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

    return fetch(`${handlers.config.apiUrl}/target/page`, requestOptions).then(handlers.handleHttpResponse);
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

    return fetch(`${handlers.config.apiUrl}/target/${idList}`, requestOptions).then(handlers.handleHttpResponse);
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

    return fetch(`${handlers.config.apiUrl}/target/insert`, requestOptions).then(handlers.handleHttpResponse);
};

/**
 * 
 * @param {*} targetDoc 
 */
function update(docId, targetDoc) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(targetDoc)
    };

    return fetch(`${handlers.config.apiUrl}/target/update/${docId}`, requestOptions).then(handlers.handleHttpResponse);
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

    return fetch(`${handlers.config.apiUrl}/target/PartialUpdate/${docId}`, requestOptions).then(handlers.handleHttpResponse);
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

    return fetch(`${handlers.config.apiUrl}/target/remove`, requestOptions).then(handlers.handleHttpResponse);
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

    return fetch(`${handlers.config.apiUrl}/target/set/${target}`, requestOptions).then(handlers.handleHttpResponse);
};