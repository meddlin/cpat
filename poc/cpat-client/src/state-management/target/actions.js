import { targetConstants } from './constants';
import { targetService } from './services';

export const targetActions = {
    getTarget,
    getTargetList,
    insertTarget,
    updateTarget,
    removeTarget
};

/**
 * 
 * @param {*} id 
 */
function getTarget(id) {
    return dispatch => {
        dispatch(request(id));

        targetService.getSingle(id)
            .then(
                result => {
                    dispatch(success(result));
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            );
    };

    function request(id) { return { type: targetConstants.GET_TARGET_REQUEST, id } }
    function success(result) { return { type: targetConstants.GET_TARGET_SUCCESS, result } }
    function failure(error) { return { type: targetConstants.GET_TARGET_FAILURE, error } }
}

/**
 * 
 * @param {*} idList 
 */
function getTargetList(idList) {
    return dispatch => {
        dispatch(request(idList));

        targetService.getList(idList)
            .then(
                result => {
                    dispatch(success(result));
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            );
    };

    function request(idList) { return { type: targetConstants.GET_TARGET_LIST_REQUEST, idList } }
    function success(result) { return { type: targetConstants.GET_TARGET_LIST_SUCCESS, result } }
    function failure(error) { return { type: targetConstants.GET_TARGET_LIST_FAILURE, error } }
}

/**
 * 
 * @param {*} targetDoc 
 */
function insertTarget(targetDoc) {
    return dispatch => {
        dispatch(request(targetDoc));

        targetService.insert(targetDoc)
            .then(
                result => {
                    dispatch(success(result));
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            );
    };

    function request(targetDoc) { return { type: targetConstants.INSERT_TARGET_REQUEST, targetDoc } }
    function success(result) { return { type: targetConstants.INSERT_TARGET_SUCCESS, result } }
    function failure(error) { return { type: targetConstants.INSERT_TARGET_FAILURE, error } }
}

/**
 * 
 * @param {*} targetDoc 
 */
function updateTarget(targetDoc) {
    return dispatch => {
        dispatch(request(targetDoc));

        targetService.update(targetDoc)
            .then(
                result => {
                    dispatch(success(result));
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            );
    };

    function request(targetDoc) { return { type: targetConstants.UPDATE_TARGET_REQUEST, targetDoc } }
    function success(result) { return { type: targetConstants.UPDATE_TARGET_SUCCESS, result } }
    function failure(error) { return { type: targetConstants.UPDATE_TARGET_FAILURE, error } }
}

/**
 * 
 * @param {*} id 
 */
function removeTarget(id) {
    return dispatch => {
        dispatch(request(id));

        targetService.remove(id)
            .then(
                result => {
                    dispatch(success(result));
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            );
    };

    function request(id) { return { type: targetConstants.REMOVE_TARGET_REQUEST, id } }
    function success(result) { return { type: targetConstants.REMOVE_TARGET_SUCCESS, result } }
    function failure(error) { return { type: targetConstants.REMOVE_TARGET_FAILURE, error } }
}