import { handlers } from '../../state-management/helpers/http-response-handler';

export const locationService = {
    getSingle,
    getList,
    insert,
    update,
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
 * @param {*} idList 
 */
function getList(idList) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };

    return fetch(`${handlers.config.apiUrl}/table/${idList}`, requestOptions).then(handlers.handleHttpResponse);
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

    return fetch(`${handlers.config.apiUrl}/table`, requestOptions).then(handlers.handleHttpResponse);
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