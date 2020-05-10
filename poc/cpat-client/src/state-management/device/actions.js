import { deviceConstants } from './constants';
import { deviceService } from './services';

export const deviceActions = {
    getDevice,
    getDeviceList,
    getDevicePage,
    insertDevice,
    updateDevice,
    partialUpdateDevice,
    removeDevice
};

/**
 * 
 * @param {*} id 
 */
function getDevice(id) {
    return dispatch => {
        dispatch(request(id));

        deviceService.getSingle(id)
            .then(
                result => {
                    dispatch(success(result));
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            );
    };

    function request(id) { return { type: deviceConstants.GET_DEVICE_REQUEST, id } }
    function success(result) { return { type: deviceConstants.GET_DEVICE_SUCCESS, result } }
    function failure(error) { return { type: deviceConstants.GET_DEVICE_FAILURE, error } }
}

/**
 * 
 */
function getDevicePage() {
    return dispatch => {
        dispatch(request());

        deviceService.getPage()
            .then(
                result => {
                    dispatch(success(result));
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            )
    }

    function request() { return { type: deviceConstants.GET_DEVICE_PAGE_REQUEST } }
    function success(result) { return { type: deviceConstants.GET_DEVICE_PAGE_SUCCESS, result } }
    function failure(error) { return { type: deviceConstants.GET_DEVICE_PAGE_FAILURE, error } }
}

/**
 * 
 * @param {*} idList 
 */
function getDeviceList(idList) {
    return dispatch => {
        dispatch(request(idList));

        deviceService.getList(idList)
            .then(
                result => {
                    dispatch(success(result));
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            );
    };

    function request(idList) { return { type: deviceConstants.GET_DEVICE_LIST_REQUEST, idList } }
    function success(result) { return { type: deviceConstants.GET_DEVICE_LIST_SUCCESS, result } }
    function failure(error) { return { type: deviceConstants.GET_DEVICE_LIST_FAILURE, error } }
}

/**
 * 
 * @param {*} deviceDoc 
 */
function insertDevice(deviceDoc) {
    return dispatch => {
        dispatch(request(deviceDoc));

        deviceService.insert(deviceDoc)
            .then(
                result => {
                    dispatch(success(result));
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            );
    };

    function request(deviceDoc) { return { type: deviceConstants.INSERT_DEVICE_REQUEST, deviceDoc } }
    function success(result) { return { type: deviceConstants.INSERT_DEVICE_SUCCESS, result } }
    function failure(error) { return { type: deviceConstants.INSERT_DEVICE_FAILURE, error } }
}

/**
 * 
 * @param {*} deviceDoc 
 */
function updateDevice(deviceDoc) {
    return dispatch => {
        dispatch(request(deviceDoc));

        deviceService.update(deviceDoc)
            .then(
                result => {
                    dispatch(success(result));
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            );
    };

    function request(deviceDoc) { return { type: deviceConstants.UPDATE_DEVICE_REQUEST, deviceDoc } }
    function success(result) { return { type: deviceConstants.UPDATE_DEVICE_SUCCESS, result } }
    function failure(error) { return { type: deviceConstants.UPDATE_DEVICE_FAILURE, error } }
}

/**
 * 
 * @param {*} deviceDoc 
 */
function partialUpdateDevice(docId, deviceDoc) {
    return dispatch => {
        dispatch(request(docId, deviceDoc));

        deviceService.partialUpdate(docId, deviceDoc)
            .then(
                result => {
                    dispatch(success(result));
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            );
    };

    function request(docId, deviceDoc) { return { type: deviceConstants.PARTIAL_UPDATE_TARGET_REQUEST, docId, deviceDoc } }
    function success(result) { return { type: deviceConstants.PARTIAL_UPDATE_TARGET_SUCCESS, result } }
    function failure(error) { return { type: deviceConstants.PARTIAL_UPDATE_TARGET_FAILURE, error } }
}

/**
 * 
 * @param {*} id 
 */
function removeDevice(id) {
    return dispatch => {
        dispatch(request(id));

        deviceService.remove(id)
            .then(
                result => {
                    dispatch(success(result));
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            );
    };

    function request(id) { return { type: deviceConstants.REMOVE_DEVICE_REQUEST, id } }
    function success(result) { return { type: deviceConstants.REMOVE_DEVICE_SUCCESS, result } }
    function failure(error) { return { type: deviceConstants.REMOVE_DEVICE_FAILURE, error } }
}