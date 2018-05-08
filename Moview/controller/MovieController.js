class MovieController {
    
    constructor(moviewManager) {
        this.moviewManager = moviewManager;
    }

    getIndexMovies = () => {
        return [this.moviewManager.getInTheaterMovies(), this.moviewManager.getComingSoonMovies()];
    }

    getMovieInfo = movieId => {
        return this.moviewManager.getMovieById(movieId);
    }
}

module.exports = MovieController;