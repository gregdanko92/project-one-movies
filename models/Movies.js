/* -------------------------------------------------------------------------- */
/*                              Required modules                              */
/* -------------------------------------------------------------------------- */
const mongoose = require('mongoose');
/* ------------------------------ define schema ----------------------------- */
const movieSchema = new mongoose.Schema({
    title: { type:String, required: true}, //required
    director: { type: String},
    genre: { type: String},
    actors: [{type:String}], 
    releaseDate: {type: Number},     
})
/* ------------------------------ Create model ------------------------------ */
const Movies = mongoose.model('Movies',movieSchema)
/* ------------------------------ Export Model ------------------------------ */
module.exports = Movies
