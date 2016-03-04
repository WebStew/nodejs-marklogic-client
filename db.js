(function(appScope) {

    var resultIndex = 0;

    var searchDb = function(term) {
        // TODO: Ajax call to shiny API: return $.ajax(...)
    };

    appScope.db = {search: searchDb};

}(window.__apiClient || (window.__apiClient = {})));
