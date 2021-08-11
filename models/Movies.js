/* -------------------------------------------------------------------------- */
/*                              Required modules                              */
/* -------------------------------------------------------------------------- */
const mongoose = require('mongoose');
/* ------------------------------ define schema ----------------------------- */
const movieSchema = new mongoose.Schema({

    Title: { type:String, required: true}, //required
    Director: { type: String},
    Writer: {type: String},
    Genre: { type: String},
    Actors: [{type:String}], 
    Released: {type: Number},
    Rated: {type: String},
    Runtime: {type: String},
    Language: {type: String},
    Country: {type: String},
    Awards: {type: String},
    Poster: {type: String},
    Ratings: [
        {
            Source: {type: String},
            Value: {type: String},
        }
    ],   // need to include sources and ratings, ie source:IMDB, Value: 8.1/10
    Metascore: {type: String},
    imdbRating: {type: String},
    imdbVotes: {type: String},
    imdbID: {type:String},
    Type: {type: String},
    DVD: {type: String},
    BoxOffice: {type: String},
    Production: {type: String},
    Website: {type: String},
    Response: {type: String}
   

})
/* ------------------------------ Create model ------------------------------ */
const Movies = mongoose.model('Movies',movieSchema)
/* ------------------------------ Export Model ------------------------------ */
module.exports = Movies
