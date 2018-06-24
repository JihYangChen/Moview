class MovieController {
    
    constructor(moviewManager) {
        this.moviewManager = moviewManager;
    }

    getIndexMovies = () => {
        let inTheaterMoviesDisplayInfos = this.moviewManager.getInTheaterMovies().map(movie => {
            return movie.getIndexDisplayInfo();
        })
        let comingSoonMoviesDisplayInfos = this.moviewManager.getComingSoonMovies().map(movie => {
            return movie.getIndexDisplayInfo();
        })
        return [inTheaterMoviesDisplayInfos, comingSoonMoviesDisplayInfos];
    }

    getMovieInfo = movieId => {
        return this.moviewManager.getMovieById(movieId).getDetailMovieInfo();
    }

    /***********************************
     * 
     *  please be very careful !!!
     * 
     ***********************************/
    updateDatabaseMovies = () => {
        // this.moviewManager.updateDatabaseMovies();
        // this.moviewManager.removeAllOutOfDateMovies();
    }
}

module.exports = MovieController;