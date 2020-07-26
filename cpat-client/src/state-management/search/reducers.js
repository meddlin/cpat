import { searchConstants } from './constants';

export function search(state = {}, action) {
    switch(action.type) {
        case searchConstants.SEARCH_QUERY_REQUEST:
            return Object.assign({}, state, {
                loading: true
            });
        case searchConstants.SEARCH_QUERY_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                searchResult: action.result
            });
        case searchConstants.SEARCH_QUERY_FAILURE:
            return Object.assign({}, state, {
                loading: false
            });
        
        default:
            return state;
    }
}