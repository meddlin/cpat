import { targetConstants } from './constants';

export function target(state = {}, action) {
    switch(action.type) {
        case targetConstants.SET_TARGET_REQUEST: 
            return Object.assign({}, ...state, {
                loading: true
            });
        case targetConstants.SET_TARGET_SUCCESS: 
            return Object.assign({}, ...state, {
                loading: false
            });
        case targetConstants.SET_TARGET_FAILURE: 
            return Object.assign({}, ...state, {
                loading: false
            });

        case targetConstants.GET_TARGET_PAGE_REQUEST:
            return Object.assign({}, state, {
                loading: true
            });
        case targetConstants.GET_TARGET_PAGE_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                targets: action.result
            });
        case targetConstants.GET_TARGET_PAGE_FAILURE:
            return Object.assign({}, state, {
                loading: false
            });

        case targetConstants.GET_TARGET_REQUEST:
            return Object.assign({}, ...state, {
                loading: true
            });
        case targetConstants.GET_TARGET_SUCCESS:
            return Object.assign({}, ...state, {
                loading: false
            });
        case targetConstants.GET_TARGET_FAILURE:
            return Object.assign({}, ...state, {
                loading: false
            });
        
        case targetConstants.GET_TARGET_LIST_REQUEST:
            return Object.assign({}, ...state, {
                loading: true
            });
        case targetConstants.GET_TARGET_LIST_SUCCESS:
            return Object.assign({}, ...state, {
                loading: false
            });
        case targetConstants.GET_TARGET_LIST_FAILURE:
            return Object.assign({}, ...state, {
                loading: false
            });

        case targetConstants.INSERT_TARGET_REQUEST:
            return Object.assign({}, state, {
                loading: true
            });
        case targetConstants.INSERT_TARGET_SUCCESS:
            return Object.assign({}, state, {
                loading: false
            });
        case targetConstants.INSERT_TARGET_FAILURE:
            return Object.assign({}, state, {
                loading: false
            });

        case targetConstants.UPDATE_TARGET_REQUEST:
            return Object.assign({}, ...state, {
                loading: true
            });
        case targetConstants.UPDATE_TARGET_SUCCESS:
            return Object.assign({}, state, {
                loading: false
            });
        case targetConstants.UPDATE_TARGET_FAILURE:
            return Object.assign({}, state, {
                loading: false
            });

        case targetConstants.REMOVE_TARGET_REQUEST:
            return Object.assign({}, ...state, {
                loading: true
            });
        case targetConstants.REMOVE_TARGET_SUCCESS:
            return Object.assign({}, ...state, {
                loading: false
            });
        case targetConstants.REMOVE_TARGET_FAILURE:
            return Object.assign({}, ...state, {
                loading: false
            });    

        default:
            return state;
    }
}