(function(appScope) {

    const apiBaseUrl = 'http://localhost:3000/v0.0.1/';

    const searchDb = function(term) {
        return $.ajax({
            method: 'GET',
            url: apiBaseUrl + 'search/' + term,
        });
    };

    appScope.db = { search: searchDb};

}(window.__apiClient || (window.__apiClient = {})));
