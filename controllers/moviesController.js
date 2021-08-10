/* -------------------------------------------------------------------------- */
/*                              Required Modules                              */
/* -------------------------------------------------------------------------- */
const express = require('express');
const db = require('../models/index.js')
const router = express.Router();


/* ---------------------------------- index --------------------------------- */
router.get('/', (req, res) => { 
    db.Movies.find({}, (err, allMovies) => { 
        if(err){return console.log(err)}
        else{
            res.render('./movies/index.ejs', { allMovies: allMovies }) 
        }    
    })
})
/* ----------------------------------- new ---------------------------------- */
router.get('/new', (req, res) => { //get url path
    res.render('./movies/new.ejs') //render our new page
  }) 
/* --------------------------------- create --------------------------------- */
router.post('/', (req, res) => { 
    db.Movies.create(req.body, (err, createMovie) => { //create new obj in our database with form data
      if (err) {return console.log(err)}
      else{
          res.redirect('/movies') //redirect on success back to index page
      }  
    });
  })
  
/* ---------------------------------- show ---------------------------------- */
router.get('/:dataId', (req, res) => { // grab id from url
    db.Movies.findById(req.params.dataId, (err, foundMovie) => { //find obj with unique Id from database
      if(err) return console.log(err);
      res.render('./movies/show.ejs', { oneMovie: foundMovie }) //pass that obj to our show.ejs page and render it
    })  
  })
  
/* ---------------------------------- edit ---------------------------------- */
// Serves a form to get info to update with
router.get('/:dataId/edit', (req, res) => { //get id from url
    db.Movies.findById(req.params.dataId, (err, foundMovie) => { //find item in DB with id
      if(err) return console.log(err);
      res.render('./movies/edit.ejs', { oneMovie: foundMovie }); //render our edit page and pass the found item to it.
    })
  });
  
/* --------------------------------- update --------------------------------- */
// Update the data for a particular item
router.put('/:dataId', (req, res) => {
    db.Movies.findByIdAndUpdate(req.params.dataId, req.body, (err, updatedMovie) => {
    if(err) return console.log(err);
    res.redirect(`/movies/${req.params.dataId}`)
  })
})
/* --------------------------------- destroy -------------------------------- */
router.delete('/:dataId', (req, res) => { //grab id from url
    db.Movies.findByIdAndDelete(req.params.dataId, (err) => { //delete item from database with specified id
      if(err) return console.log(err);
      res.redirect('/movies'); //redirect to index page
    })
  })
  

/* --------------------------------- Export --------------------------------- */
module.exports = router;
