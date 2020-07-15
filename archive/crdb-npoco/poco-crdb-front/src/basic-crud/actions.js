import { crudConstants } from './constants';
import { crudService } from './services';

export const crudActions = {
    testGet,
    getAll,
    getSingle,
    insert,
    update,
    upsert,
    updateSnapshot,
    updateMany,
    remove,
    complexQuery
};

function testGet() {
    return dispatch => {
        dispatch(request());

        crudService.testGet()
            .then(
                req => {
                    dispatch(success());
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            )
    };

    function request() { return { type: crudConstants.TEST__REQUEST } }
    function success() { return { type: crudConstants.TEST__SUCCESS } }
    function failure(error) { return { type: crudConstants.TEST__FAILURE, error } }
}


function getAll() {
    return dispatch => {
        dispatch(request());

        crudService.getAll()
            .then(
                docs => {
                    dispatch(success(docs));
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            )
    };

    function request() { return { type: crudConstants.GET_ALL__REQUEST } }
    function success(docs) { return { type: crudConstants.GET_ALL__SUCCESS, docs } }
    function failure(error) { return { type: crudConstants.GET_ALL__FAILURE, error } }
}

function getSingle(docId) {
    return dispatch => {
        dispatch(request(docId));

        crudService.getSingle(docId)
            .then(
                doc => {
                    dispatch(success(doc));
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            )
    };

    function request(docId) { return { type: crudConstants.CRUD_GET_SINGLE__REQUEST, docId } }
    function success(doc) { return { type: crudConstants.CRUD_GET_SINGLE__SUCCESS, doc } }
    function failure(error) { return { type: crudConstants.CRUD_GET_SINGLE__FAILURE, error } }
}

function insert(account) {
    return dispatch => {
        dispatch(request(account));

        crudService.insert(account)
            .then(
                response => {
                    dispatch(success(response));
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            )
    }

    function request(account) { return { type: crudConstants.CRUD_INSERT__REQUEST, account } }
    function success(response) { return { type: crudConstants.CRUD_INSERT__SUCCESS, response } }
    function failure(error) { return { type: crudConstants.CRUD_INSERT__FAILURE, error } }
}

function update(id, account) {
    let req = {
        id: id,
        account: account
    };

    req.account.accountOwner = "Test User - Update";

    return dispatch => {
        dispatch(request(req));

        crudService.update(id, account)
            .then(
                response => {
                    dispatch(success(response));
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            )
    }

    function request(req) { return { type: crudConstants.CRUD_UPDATE__REQUEST, req } }
    function success(response) { return { type: crudConstants.CRUD_UPDATE__SUCCESS, response } }
    function failure(error) { return { type: crudConstants.CRUD_UPDATE__FAILURE, error } }
}

function upsert(id, account) {
    let req = {
        id: id,
        account: account
    };

    req.account.accountOwner = "Test User - Upsert";

    return dispatch => {
        dispatch(request(req));

        crudService.upsert(id, account)
            .then(
                response => {
                    dispatch(success(response));
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            )
    }

    function request(req) { return { type: crudConstants.CRUD_UPSERT__REQUEST, req } }
    function success(response) { return { type: crudConstants.CRUD_UPSERT__SUCCESS, response } }
    function failure(error) { return { type: crudConstants.CRUD_UPSERT__FAILURE, error } }
}

function updateSnapshot(id, account) {
    let req = {
        id: id,
        account: account
    };

    req.account.accountOwner = "Test User - Snapshot";

    return dispatch => {
        dispatch(request(req));

        crudService.updateSnapshot(id, account)
            .then(
                response => {
                    dispatch(success(response));
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            )
    }

    function request(req) { return { type: crudConstants.CRUD_UPDATE_SNAPSHOT__REQUEST, req } }
    function success(response) { return { type: crudConstants.CRUD_UPDATE_SNAPSHOT__SUCCESS, response } }
    function failure(error) { return { type: crudConstants.CRUD_UPDATE_SNAPSHOT__FAILURE, error } }
}

function updateMany(id, account) {
    let req = {
        id: id,
        account: account
    };

    req.account.accountOwner = "Test User";

    return dispatch => {
        dispatch(request(req));

        crudService.updateMany(id, account)
            .then(
                response => {
                    dispatch(success(response));
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            )
    }

    function request(req) { return { type: crudConstants.CRUD_UPDATE_MANY__REQUEST, req } }
    function success(response) { return { type: crudConstants.CRUD_UPDATE_MANY__SUCCESS, response } }
    function failure(error) { return { type: crudConstants.CRUD_UPDATE_MANY__FAILURE, error } }
}

function remove(account) {
    return dispatch => {
        dispatch(request(account));

        crudService.remove(account)
            .then(
                res => {
                    dispatch(success(res));
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            )
    };

    function request(account) { return { type: crudConstants.CRUD_REMOVE__REQUEST, account } }
    function success(res) { return { type: crudConstants.CRUD_REMOVE__SUCCESS, res } }
    function failure(error) { return { type: crudConstants.CRUD_REMOVE__FAILURE, error } }
}

function complexQuery() {
    return dispatch => {
        dispatch(request());

        crudService.remove()
            .then(
                response => {
                    dispatch(success(response));
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            )
    };

    function request() { return { type: crudConstants.CRUD_COMPLEX_QUERY__REQUEST } }
    function success(response) { return { type: crudConstants.CRUD_COMPLEX_QUERY__SUCCESS, response } }
    function failure(error) { return { type: crudConstants.CRUD_COMPLEX_QUERY__FAILURE, error } }
}