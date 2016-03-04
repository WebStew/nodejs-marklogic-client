import debounce from 'lodash/debounce';
import map from 'lodash/map';

(function(appScope) {

    const db = appScope.db;

    const runApp = () => {
        const $app =$('.app');
        const $searchTermInput = $('.searchTermInput');
        const $results = $('.results');

        let mostRecentSearchTerm = '';

        $searchTermInput.on('keyup', debounce(() => {
            let searchTerm = $searchTermInput.val().trim();

            if (!searchTerm || searchTerm.length < 2 || searchTerm == mostRecentSearchTerm) {
                return;
            }

            mostRecentSearchTerm = searchTerm;

            console.log('searching for term ' + searchTerm);
            $app.addClass('isSearching');

            db.search(searchTerm)
            .then(function(searchResults) {
                $results.empty().append(_.map(searchResults, function(searchResult) {
                    return '<div class="result"><a target="_blank" href="http://onlinelibrary.wiley.com/enhanced/doi/' + searchResult.doi + '">' + searchResult.title + '</a></div>';
                }));
            })
            .fail(function(error) {
                console.log('An error occurred: ', error);
                $results.empty().append('<div class="result">' + error.status + ' : ' + error.responseText + '</div>');
            })
            .always(function(error) {
                $app.removeClass('isSearching');
            });

        }, 300));
    };

    appScope.app = { run: runApp };

}(window.__apiClient || (window.__apiClient = {})));
