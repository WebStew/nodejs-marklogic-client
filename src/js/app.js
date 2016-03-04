(function(appScope) {

    var debounce = require('lodash/debounce');
    var map      = require('lodash/map');
    var db       = appScope.db;

    var runApp = function() {
        var $app =$('.app');
        var $searchTermInput = $('.searchTermInput');
        var $results = $('.results');

        var mostRecentSearchTerm = '';

        $searchTermInput.on('keyup', debounce(function() {
            var searchTerm = $searchTermInput.val().trim();

            if (!searchTerm || searchTerm.length < 2 || searchTerm == mostRecentSearchTerm) {
                return;
            }

            mostRecentSearchTerm = searchTerm;
            console.log('searching for term ' + searchTerm);
            $app.addClass('isSearching');

            db.search(searchTerm)
            .then(function(searchResults) {
                $results.empty().append(map(searchResults, function(searchResult) {
                    return '<div class="result"><a href="http://onlinelibrary.wiley.com/enhanced/doi/' + searchResult.doi + '">' + searchResult.title + '</a></div>';
                }));
            })
            .fail(function(error) {
                console.log('An error occurred: ', error);
                $results.empty();
            })
            .always(function(error) {
                $app.removeClass('isSearching');
            });

        }, 300));
    };

    appScope.app = {run: runApp};

}(window.__apiClient || (window.__apiClient = {})));
