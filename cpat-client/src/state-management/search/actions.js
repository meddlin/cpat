import { searchConstants } from './constants';
import { searchService } from './services';

export const searchActions = {
    searchQuery
};

function searchQuery() {
    return dispatch => {
        dispatch(request());

        searchService.searchQuery()
            .then(
                result => {
                    dispatch(success(result));
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            )
    };

    function request() { return { type: searchConstants.SEARCH_QUERY_REQUEST } }
    function success(result) { return { type: searchConstants.SEARCH_QUERY_SUCCESS, result } }
    function failure(error) { return { type: searchConstants.SEARCH_QUERY_FAILURE, error } }
}