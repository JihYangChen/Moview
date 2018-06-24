var fetch = require('node-fetch');

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

    updateDatabaseMovies = async () => {
        await this.fetchData('http://de735d56.ngrok.io/MovieInfosIntheater', async (err, result) => {
            console.log('info ->>> ', result[0]);
        })        
    }

    fetchData = async (url, callback) => {
        await fetch(url)
                .then(response => response.json())
                .then(json => callback(null, json))
                .catch(error => callback(error, null))
    }
}

module.exports = MovieController;