/**
 * Holds configuration info for interacting with any attached APIs.
 */
const config = {
    /* TESTING INFORMATION
     * Make sure all 3 of these points are accounted for when troubleshooting connection issues.
     * 
     * - HTTPS is disabled
     *   - For testing/development purposes among React/JS, .NET Core, and Python (Flask)
     * - /api/mongo
     *   - Be watchful of /mongo route. This is how we're determining data is to be routed to MongDB
     * - Watch the ports
     *   - 5001: HTTPS-enabled .NET Core (cpat-core)
     *   - 5000: HTTP .NET Core (cpat-core)
     *   - 3000: HTTP React (cpat-client)
     *   - 4000: HTTP Python Flask (python-osint)
     */

    apiUrl: process.env.REACT_APP_API_URL || 'http://localhost:5000/api/mongo',
    apiCoreUrl: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
    // osintApiUrl: process.env.OSINT_APP_API_URL || 'http://192.168.1.44:5000'
    osintApiUrl: process.env.OSINT_APP_API_URL || 'http://localhost:4000'
};

/**
 * 
 * @param {*} response 
 */
function handleHttpResponse(response) {
    return response.text().then(text => {
        if (response.status === 500) {
            console.error('HTTP 500: A server error was encountered.');
            console.error(text);
        }

        const data = text && JSON.parse(text);
        if (!response.ok) {

            if (response.status === 400) {
                if (data && data.errors) {
                    console.error('HTTP 400 Response: Validation error');
                    // iterate over data validation error(s) found in 'data'
                    Object.keys(data.errors).forEach(k => {
                        console.error(data.errors[k])
                    });
                }
            }

            if (response.status === 401) {
                // auto logout if 401 response returned from api
                // authenticationService.logout();
                Location.reload(true);
            }

            if (response.status === 415) {
                console.error(`HTTP 415: ${response.statusText}`);
                console.error(`URL: ${response.url}`);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}

export const handlers = {
    config,
    handleHttpResponse
};