(function(appScope) {

    var db = appScope.db;

    var runApp = function() {
        var $app =$('.app');
        var $searchTermInput = $('.searchTermInput');
        var $results = $('.results');

        $searchTermInput.on('keyup', _.debounce(function() {
            var searchTerm = $searchTermInput.val();

            if (!searchTerm || searchTerm.length < 2) {
                return;
            }

            console.log('searching for term ' + searchTerm);
            $app.addClass('isSearching');

            db.search(searchTerm)
            .then(function(searchResults) {
                $results.empty().append(_.map(searchResults, function(searchResult) {
                    return $('<div>').text(searchResult.title);
                }));
            })
            .fail(function(error) {
                console.log('An error occurred: ', error);
            })
            .always(function(error) {
                $app.removeClass('isSearching');
            });

        }, 300));
    };

    appScope.app = {run: runApp};

}(window.__apiClient || (window.__apiClient = {})));