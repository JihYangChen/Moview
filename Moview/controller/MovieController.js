class MovieController {
    
    constructor(moviewManager) {
        this.moviewManager = moviewManager;
    }

    getInTheaterMovies = () => {

    }

    getComingSoonMovies = () => {

    }

    showMovieInfo = movieId => {
        return this.moviewManager.getMovieById(movieId);
    }
}

module.exports = MovieController;