import { crudConstants } from './constants';

export function crudOps(state = {}, action) {
    switch (action.type) {
        case crudConstants.TEST__REQUEST:
            return Object.assign({}, state, {
                loading: true
            });
        case crudConstants.TEST__SUCCESS:
            return Object.assign({}, state, {
                loading: false
            });
        case crudConstants.TEST__FAILURE:
            return Object.assign({}, state, {
                loading: false
            });


        case crudConstants.GET_ALL__REQUEST:
            return Object.assign({}, state, {
                loading: true
            });
        case crudConstants.GET_ALL__SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                accounts: action.docs
            });
        case crudConstants.GET_ALL__FAILURE:
            return Object.assign({}, state, {
                loading: false
            });

        case crudConstants.CRUD_GET_SINGLE__REQUEST:
            return Object.assign({}, state, {
                loading: true
            });
        case crudConstants.CRUD_GET_SINGLE__SUCCESS:
            return Object.assign({}, state, {
                loading: false
            });
        case crudConstants.CRUD_GET_SINGLE__FAILURE:
            return Object.assign({}, state, {
                loading: false
            });

        case crudConstants.CRUD_INSERT__REQUEST: 
            return Object.assign({}, state, {
                loading: true
            });
        case crudConstants.CRUD_INSERT__SUCCESS: 
            return Object.assign({}, state, {
                loading: false
            });
        case crudConstants.CRUD_INSERT__FAILURE: 
            return Object.assign({}, state, {
                laoding: false
            });

        case crudConstants.CRUD_UPDATE__REQUEST:
            return Object.assign({}, state, {
                loading: true
            });
        case crudConstants.CRUD_UPDATE__SUCCESS:
            return Object.assign({}, state, {
                loading: false
            });
        case crudConstants.CRUD_UPDATE__FAILURE:
            return Object.assign({}, state, {
                loading: false
            });
    
        case crudConstants.CRUD_UPSERT__REQUEST: 
            return Object.assign({}, state, {
                loading: true
            });
        case crudConstants.CRUD_UPSERT__SUCCESS: 
            return Object.assign({}, state, {
                loading: false
            });
        case crudConstants.CRUD_UPSERT__FAILURE: 
            return Object.assign({}, state, {
                loading: false
            });
    
        case crudConstants.CRUD_UPDATE_SNAPSHOT__REQUEST: 
            return Object.assign({}, state, {
                loading: true
            });
        case crudConstants.CRUD_UPDATE_SNAPSHOT__SUCCESS: 
            return Object.assign({}, state, {
                loading: false
            });
        case crudConstants.CRUD_UPDATE_SNAPSHOT__FAILURE: 
            return Object.assign({}, state, {
                loading: false
            });
    
        case crudConstants.CRUD_UPDATE_MANY__REQUEST: 
            return Object.assign({}, state, {
                loading: true
            });
        case crudConstants.CRUD_UPDATE_MANY__SUCCESS: 
            return Object.assign({}, state, {
                loading: false
            });
        case crudConstants.CRUD_UPDATE_MANY__FAILURE: 
            return Object.assign({}, state, {
                loading: false
            });
    
        case crudConstants.CRUD_REMOVE__REQUEST: 
            return Object.assign({}, state, {
                loading: true
            });
        case crudConstants.CRUD_REMOVE__SUCCESS: 
            return Object.assign({}, state, {
                loading: false
            });
        case crudConstants.CRUD_REMOVE__FAILURE: 
            return Object.assign({}, state, {
                loading: false
            });
    
        case crudConstants.CRUD_COMPLEX_QUERY__REQUEST:
            return Object.assign({}, state, {
                loading: false
            });
        case crudConstants.CRUD_COMPLEX_QUERY__SUCCESS:
            return Object.assign({}, state, {
                loading: true
            });
        case crudConstants.CRUD_COMPLEX_QUERY__FAILURE:
            return Object.assign({}, state, {
                loading: true
            });
        
        default:
            return state;
    }
}