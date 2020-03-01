import { locationConstants } from './constants';

export function location(state = {}, action) {
    switch(action.type) {
        case locationConstants.GET_LOCATION_REQUEST:
            return Object.assign({}, ...state, {
                loading: true
            });
        case locationConstants.GET_LOCATION_SUCCESS:
            return Object.assign({}, ...state, {
                loading: false
            });
        case locationConstants.GET_LOCATION_FAILURE:
            return Object.assign({}, ...state, {
                loading: false
            });
        
        case locationConstants.GET_LOCATION_LIST_REQUEST:
            return Object.assign({}, ...state, {
                loading: true
            });
        case locationConstants.GET_LOCATION_LIST_SUCCESS:
            return Object.assign({}, ...state, {
                loading: false
            });
        case locationConstants.GET_LOCATION_LIST_FAILURE:
            return Object.assign({}, ...state, {
                loading: false
            });

        case locationConstants.INSERT_LOCATION_REQUEST:
            return Object.assign({}, ...state, {
                loading: true
            });
        case locationConstants.INSERT_LOCATION_SUCCESS:
            return Object.assign({}, ...state, {
                loading: false
            });
        case locationConstants.INSERT_LOCATION_FAILURE:
            return Object.assign({}, ...state, {
                loading: false
            });

        case locationConstants.UPDATE_LOCATION_REQUEST:
            return Object.assign({}, ...state, {
                loading: true
            });
        case locationConstants.UPDATE_LOCATION_SUCCESS:
            return Object.assign({}, ...state, {
                loading: false
            });
        case locationConstants.UPDATE_LOCATION_FAILURE:
            return Object.assign({}, ...state, {
                loading: false
            });

        case locationConstants.REMOVE_LOCATION_REQUEST:
            return Object.assign({}, ...state, {
                loading: true
            });
        case locationConstants.REMOVE_LOCATION_SUCCESS:
            return Object.assign({}, ...state, {
                loading: false
            });
        case locationConstants.REMOVE_LOCATION_FAILURE:
            return Object.assign({}, ...state, {
                loading: false
            });    

        default:
            return state;
    }
}