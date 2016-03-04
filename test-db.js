(function(appScope) {

    var resultIndex = 0;

    var searchDb = function(term) {
        ++resultIndex;
        var searchResults = [{title: 'some thing ' + resultIndex}, {title: 'some other thing ' + resultIndex}];

        var dfr = $.Deferred();
        _.delay(function() {
            dfr.resolve(searchResults);
        }, Math.random() * 1000);
        return dfr.promise();
    };

    appScope.db = {search: searchDb};

}(window.__apiClient || (window.__apiClient = {})));
