import { companyConstants } from './constants';
import { companyService } from './services';

export const companyActions = {
    getCompany,
    getCompanyList,
    insertCompany,
    updateCompany,
    removeCompany
};

/**
 * 
 * @param {*} id 
 */
function getCompany(id) {
    return dispatch => {
        dispatch(request(id));

        companyService.getSingle(id)
            .then(
                result => {
                    dispatch(success(result));
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            );
    };

    function request(id) { return { type: companyConstants.GET_COMPANY_REQUEST, id } }
    function success(result) { return { type: companyConstants.GET_COMPANY_SUCCESS, result } }
    function failure(error) { return { type: companyConstants.GET_COMPANY_FAILURE, error } }
}

/**
 * 
 * @param {*} idList 
 */
function getCompanyList(idList) {
    return dispatch => {
        dispatch(request(idList));

        companyService.getList(idList)
            .then(
                result => {
                    dispatch(success(result));
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            );
    };

    function request(idList) { return { type: companyConstants.GET_COMPANY_LIST_REQUEST, idList } }
    function success(result) { return { type: companyConstants.GET_COMPANY_LIST_SUCCESS, result } }
    function failure(error) { return { type: companyConstants.GET_COMPANY_LIST_FAILURE, error } }
}

/**
 * 
 * @param {*} companyDoc 
 */
function insertCompany(companyDoc) {
    return dispatch => {
        dispatch(request(companyDoc));

        companyService.insert(companyDoc)
            .then(
                result => {
                    dispatch(success(result));
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            );
    };

    function request(companyDoc) { return { type: companyConstants.INSERT_COMPANY_REQUEST, companyDoc } }
    function success(result) { return { type: companyConstants.INSERT_COMPANY_SUCCESS, result } }
    function failure(error) { return { type: companyConstants.INSERT_COMPANY_FAILURE, error } }
}

/**
 * 
 * @param {*} companyDoc 
 */
function updateCompany(companyDoc) {
    return dispatch => {
        dispatch(request(companyDoc));

        companyService.update(companyDoc)
            .then(
                result => {
                    dispatch(success(result));
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            );
    };

    function request(companyDoc) { return { type: companyConstants.UPDATE_COMPANY_REQUEST, companyDoc } }
    function success(result) { return { type: companyConstants.UPDATE_COMPANY_SUCCESS, result } }
    function failure(error) { return { type: companyConstants.UPDATE_COMPANY_FAILURE, error } }
}

/**
 * 
 * @param {*} id 
 */
function removeCompany(id) {
    return dispatch => {
        dispatch(request(id));

        companyService.remove(id)
            .then(
                result => {
                    dispatch(success(result));
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            );
    };

    function request(id) { return { type: companyConstants.REMOVE_COMPANY_REQUEST, id } }
    function success(result) { return { type: companyConstants.REMOVE_COMPANY_SUCCESS, result } }
    function failure(error) { return { type: companyConstants.REMOVE_COMPANY_FAILURE, error } }
}