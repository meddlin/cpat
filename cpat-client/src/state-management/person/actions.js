import { personConstants } from './constants';
import { personService } from './services';

export const personActions = {
    getPerson,
    getPersonPage,
    getPersonList,
    insertPerson,
    updatePerson,
    partialUpdatePerson,
    removePerson
};

/**
 * 
 * @param {*} id 
 */
function getPerson(id) {
    return dispatch => {
        dispatch(request(id));

        personService.getSingle(id)
            .then(
                result => {
                    dispatch(success(result));
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            );
    };

    function request(id) { return { type: personConstants.GET_PERSON_REQUEST, id } }
    function success(result) { return { type: personConstants.GET_PERSON_SUCCESS, result } }
    function failure(error) { return { type: personConstants.GET_PERSON_FAILURE, error } }
}

/**
 * 
 */
function getPersonPage() {
    return dispatch => {
        dispatch(request());

        personService.getPage()
            .then(
                result => {
                    dispatch(success(result));
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            )
    }

    function request() { return { type: personConstants.GET_PERSON_PAGE_REQUEST } }
    function success(result) { return { type: personConstants.GET_PERSON_PAGE_SUCCESS, result } }
    function failure(error) { return { type: personConstants.GET_PERSON_PAGE_FAILURE, error } }
}

/**
 * 
 * @param {*} idList 
 */
function getPersonList(idList) {
    return dispatch => {
        dispatch(request(idList));

        personService.getList(idList)
            .then(
                result => {
                    dispatch(success(result));
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            );
    };

    function request(idList) { return { type: personConstants.GET_PERSON_LIST_REQUEST, idList } }
    function success(result) { return { type: personConstants.GET_PERSON_LIST_SUCCESS, result } }
    function failure(error) { return { type: personConstants.GET_PERSON_LIST_FAILURE, error } }
}

/**
 * 
 * @param {*} personDoc 
 */
function insertPerson(personDoc) {
    return dispatch => {
        dispatch(request(personDoc));

        personService.insert(personDoc)
            .then(
                result => {
                    dispatch(success(result));
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            );
    };

    function request(personDoc) { return { type: personConstants.INSERT_PERSON_REQUEST, personDoc } }
    function success(result) { return { type: personConstants.INSERT_PERSON_SUCCESS, result } }
    function failure(error) { return { type: personConstants.INSERT_PERSON_FAILURE, error } }
}

/**
 * 
 * @param {*} personDoc 
 */
function updatePerson(personDoc) {
    return dispatch => {
        dispatch(request(personDoc));

        personService.update(personDoc)
            .then(
                result => {
                    dispatch(success(result));
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            );
    };

    function request(personDoc) { return { type: personConstants.UPDATE_PERSON_REQUEST, personDoc } }
    function success(result) { return { type: personConstants.UPDATE_PERSON_SUCCESS, result } }
    function failure(error) { return { type: personConstants.UPDATE_PERSON_FAILURE, error } }
}

/**
 * 
 * @param {*} personDoc 
 */
function partialUpdatePerson(docId, personDoc) {
    return dispatch => {
        dispatch(request(docId, personDoc));

        personService.partialUpdate(docId, personDoc)
            .then(
                result => {
                    dispatch(success(result));
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            );
    };

    function request(docId, personDoc) { return { type: personConstants.PARTIAL_UPDATE_PERSON_REQUEST, docId, personDoc } }
    function success(result) { return { type: personConstants.PARTIAL_UPDATE_PERSON_SUCCESS, result } }
    function failure(error) { return { type: personConstants.PARTIAL_UPDATE_PERSON_FAILURE, error } }
}

/**
 * 
 * @param {*} id 
 */
function removePerson(id) {
    return dispatch => {
        dispatch(request(id));

        personService.remove(id)
            .then(
                result => {
                    dispatch(success(result));
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            );
    };

    function request(id) { return { type: personConstants.REMOVE_PERSON_REQUEST, id } }
    function success(result) { return { type: personConstants.REMOVE_PERSON_SUCCESS, result } }
    function failure(error) { return { type: personConstants.REMOVE_PERSON_FAILURE, error } }
}