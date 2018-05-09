class MovieController {
    
    constructor(moviewManager) {
        this.moviewManager = moviewManager;
    }

    getIndexMovies = () => {
        return [this.moviewManager.getInTheaterMovies().map(movie => movie.getIndexDisplayInfo()), this.moviewManager.getComingSoonMovies().map(movie => movie.getIndexDisplayInfo())];
    }

    getMovieInfo = movieId => {
        return this.moviewManager.getMovieById(movieId).getDetailMovieInfo();
    }
}

module.exports = MovieController;