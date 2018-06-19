import * as JsSearch from 'js-search';

class SearchController {

    constructor(movieManager) {
        this.search = new JsSearch.Search('_id');
        this.search.addIndex('name');
        this.search.addIndex(['movieDescription', 'casts']);
        this.search.addIndex(['movieDescription', 'categories']);
        this.search.addDocuments(movieManager.movieList);
    }

    searchWith = keyWord => {
        let movieResultList = this.search.search(keyWord);
        return movieResultList.map(movie => movie.getIndexDisplayInfo());
    }
}

module.exports = SearchController;