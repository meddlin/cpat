import { deviceConstants } from './constants';

export function device(state = {}, action) {
    switch(action.type) {
        case deviceConstants.GET_DEVICE_REQUEST:
            return Object.assign({}, ...state, {
                loading: true
            });
        case deviceConstants.GET_DEVICE_SUCCESS:
            return Object.assign({}, ...state, {
                loading: false
            });
        case deviceConstants.GET_DEVICE_FAILURE:
            return Object.assign({}, ...state, {
                loading: false
            });
        
        case deviceConstants.GET_DEVICE_LIST_REQUEST:
            return Object.assign({}, ...state, {
                loading: true
            });
        case deviceConstants.GET_DEVICE_LIST_SUCCESS:
            return Object.assign({}, ...state, {
                loading: false
            });
        case deviceConstants.GET_DEVICE_LIST_FAILURE:
            return Object.assign({}, ...state, {
                loading: false
            });

        case deviceConstants.INSERT_DEVICE_REQUEST:
            return Object.assign({}, ...state, {
                loading: true
            });
        case deviceConstants.INSERT_DEVICE_SUCCESS:
            return Object.assign({}, ...state, {
                loading: false
            });
        case deviceConstants.INSERT_DEVICE_FAILURE:
            return Object.assign({}, ...state, {
                loading: false
            });

        case deviceConstants.UPDATE_DEVICE_REQUEST:
            return Object.assign({}, ...state, {
                loading: true
            });
        case deviceConstants.UPDATE_DEVICE_SUCCESS:
            return Object.assign({}, ...state, {
                loading: false
            });
        case deviceConstants.UPDATE_DEVICE_FAILURE:
            return Object.assign({}, ...state, {
                loading: false
            });

        case deviceConstants.REMOVE_DEVICE_REQUEST:
            return Object.assign({}, ...state, {
                loading: true
            });
        case deviceConstants.REMOVE_DEVICE_SUCCESS:
            return Object.assign({}, ...state, {
                loading: false
            });
        case deviceConstants.REMOVE_DEVICE_FAILURE:
            return Object.assign({}, ...state, {
                loading: false
            });    

        default:
            return state;
    }
}