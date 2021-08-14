/* -------------------------------------------------------------------------- */
/*                              Required modules                              */
/* -------------------------------------------------------------------------- */
const mongoose = require('mongoose');
/* ------------------------------ define schema ----------------------------- */
const movieSchema = new mongoose.Schema({

    Title: { type:String, default: 'N/A' }, //required
    Director: { type: String, default: 'N/A'},
    Writer: {type: String, default: 'N/A'},
    Plot: {type: String, default:'N/A'},
    Genre: { type: String, default: 'N/A'},
    Actors: [{type:String, default: 'N/A'}], 
    Released: {type: String, default: 'N/A'},
    Rated: {type: String, default: 'N/A'},
    Runtime: {type: String, default: 'N/A'},
    Language: {type: String, default: 'N/A'},
    Country: {type: String, default: 'N/A'},
    Awards: {type: String, default: 'N/A'},
    Poster: {type: String, default: 'N/A'},
    Ratings: [
        {
            Source: {type: String, default: 'N/A'},
            Value: {type: String, default: 'N/A'},
        }
    ],   // need to include sources and ratings, ie source:IMDB, Value: 8.1/10
    Metascore: {type: String, default: 'N/A'},
    imdbRating: {type: String, default: 'N/A'},
    imdbVotes: {type: String, default: 'N/A'},
    imdbID: {type:String, default: 'N/A'},
    Type: {type: String, default: 'N/A'},
    DVD: {type: String, default: 'N/A'},
    BoxOffice: {type: String, default: 'N/A'},
    Production: {type: String, default: 'N/A'},
    Website: {type: String, default: 'N/A'},
    Response: {type: String, default: 'N/A' }
   

})
/* ------------------------------ Create model ------------------------------ */
const Movies = mongoose.model('Movies',movieSchema)
/* ------------------------------ Export Model ------------------------------ */
module.exports = Movies
