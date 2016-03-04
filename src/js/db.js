(function(appScope) {

    var apiBaseUrl = 'http://localhost:3000/v0.0.1/';

    var searchDb = function(term) {
        return $.ajax({
            method: 'GET',
            url: apiBaseUrl + 'search/' + term,
        });
    };

    appScope.db = {search: searchDb};

}(window.__apiClient || (window.__apiClient = {})));
