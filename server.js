/* -------------------------------------------------------------------------- */
/*                               Require Modules                              */
/* -------------------------------------------------------------------------- */
const express = require('express')         
const methodOverride = require('method-override');
const rowdy = require('rowdy-logger')
const dotenv = require('dotenv').config()
const moviesController = require('./controllers/moviesController.js');
const searchController = require('./controllers/searchController');
const exampleMovies = require('./models/exampleMovies.js')

/* ------------------------------ Set Variables ----------------------------- */
const app = express() 
const port = 4000
const rowdyResults = rowdy.begin(app)
/* ------------------------------- Middleware ------------------------------- */
app.use(methodOverride('_method')); // allows usage of non-post/get methods
app.use(express.urlencoded({ extended: false }))  //allows req.body to draw form data
app.use('/movies', moviesController); // set the url controller will use
app.use('/search', searchController);
app.use(express.static(__dirname + '/public'));


/* ------------------------------ Configuration ----------------------------- */
app.set('view engine', 'ejs'); // changes express default view engine to ejs
/* ------------------------------- Set Routes ------------------------------- */
app.get('/', (req, res) => {
    
    res.render('homepage.ejs', {exampleMovies: exampleMovies});
})
app.get('/construction', (req, res) => {
    
    res.render('construction.ejs');
})
/* ------------------------------ Start Server ------------------------------ */
app.listen(process.env.PORT || 4000, () => {
    console.log(`Example app listening at http://localhost:${port}`);
    rowdyResults.print()
});