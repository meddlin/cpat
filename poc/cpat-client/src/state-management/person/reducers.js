import { personConstants } from './constants';

export function person(state = {}, action) {
    switch(action.type) {
        case personConstants.GET_PERSON_REQUEST:
            return Object.assign({}, state, {
                loading: true
            });
        case personConstants.GET_PERSON_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                persons: action.result
            });
        case personConstants.GET_PERSON_FAILURE:
            return Object.assign({}, state, {
                loading: false
            });

        
        case personConstants.GET_PERSON_PAGE_REQUEST:
            return Object.assign({}, state, {
                loading: true
            });
        case personConstants.GET_PERSON_PAGE_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                persons: action.result
            });
        case personConstants.GET_PERSON_PAGE_FAILURE:
            return Object.assign({}, state, {
                loading: false
            });


        
        case personConstants.GET_PERSON_LIST_REQUEST:
            return Object.assign({}, ...state, {
                loading: true
            });
        case personConstants.GET_PERSON_LIST_SUCCESS:
            return Object.assign({}, ...state, {
                loading: false
            });
        case personConstants.GET_PERSON_LIST_FAILURE:
            return Object.assign({}, ...state, {
                loading: false
            });

        case personConstants.INSERT_PERSON_REQUEST:
            return Object.assign({}, state, {
                loading: true
            });
        case personConstants.INSERT_PERSON_SUCCESS:
            return Object.assign({}, state, {
                loading: false
            });
        case personConstants.INSERT_PERSON_FAILURE:
            return Object.assign({}, state, {
                loading: false
            });

        case personConstants.UPDATE_PERSON_REQUEST:
            return Object.assign({}, ...state, {
                loading: true
            });
        case personConstants.UPDATE_PERSON_SUCCESS:
            return Object.assign({}, ...state, {
                loading: false
            });
        case personConstants.UPDATE_PERSON_FAILURE:
            return Object.assign({}, ...state, {
                loading: false
            });

        case personConstants.REMOVE_PERSON_REQUEST:
            return Object.assign({}, ...state, {
                loading: true
            });
        case personConstants.REMOVE_PERSON_SUCCESS:
            return Object.assign({}, ...state, {
                loading: false
            });
        case personConstants.REMOVE_PERSON_FAILURE:
            return Object.assign({}, ...state, {
                loading: false
            });    

        default:
            return state;
    }
}