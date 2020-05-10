import { deviceConstants } from './constants';

export function device(state = {}, action) {
    switch(action.type) {
        case deviceConstants.GET_DEVICE_REQUEST:
            return Object.assign({}, state, {
                loading: true
            });
        case deviceConstants.GET_DEVICE_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                device: action.result
            });
        case deviceConstants.GET_DEVICE_FAILURE:
            return Object.assign({}, state, {
                loading: false
            });


        
        case deviceConstants.GET_DEVICE_PAGE_REQUEST:
            return Object.assign({}, state, {
                loading: true
            });
        case deviceConstants.GET_DEVICE_PAGE_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                devices: action.result
            });
        case deviceConstants.GET_DEVICE_PAGE_FAILURE:
            return Object.assign({}, state, {
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
            return Object.assign({}, state, {
                loading: true
            });
        case deviceConstants.INSERT_DEVICE_SUCCESS:
            return Object.assign({}, state, {
                loading: false
            });
        case deviceConstants.INSERT_DEVICE_FAILURE:
            return Object.assign({}, state, {
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

        
        case deviceConstants.PARTIAL_UPDATE_TARGET_REQUEST:
            return Object.assign({}, state, {
                loading: true
            });
        case deviceConstants.PARTIAL_UPDATE_TARGET_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                partialUpdateResult: action.result
            });
        case deviceConstants.PARTIAL_UPDATE_TARGET_FAILURE:
            return Object.assign({}, state, {
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