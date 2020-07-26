import { handlers } from '../../state-management/helpers/http-response-handler';

export const searchService = {
    searchQuery
};

function searchQuery() {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    };

    return fetch(`${handlers.config.apiCoreUrl}/search/query`, requestOptions).then(handlers.handleHttpResponse);
}