import * as JsSearch from 'js-search';

class SearchController {

    constructor(movieManager) {
        this.search = new JsSearch.Search('_id');
        this.search.addIndex('name');
        this.search.addDocuments(movieManager.movieList);
    }

    searchWith = keyWord => {
        let result = this.search.search(keyWord);
        return result;
    }
}

module.exports = SearchController;