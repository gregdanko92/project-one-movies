/* -------------------------------------------------------------------------- */
/*                              Required Modules                              */
/* -------------------------------------------------------------------------- */
const express = require('express');
const db = require('../models/index.js')
const wmServices = require('../models/watchmodeServices.js')
const router = express.Router();
const ytApi = process.env.apiYT
const wmAPI = process.env.WATCHMODEAPI
const tdAPI = process.env.TASTEDIVEAPI
const api = process.env.apiKey
const axios = require('axios')



/* ---------------------------------- index --------------------------------- */
router.get('/', (req, res) => {
  db.Movies.find({}, (err, allMovies) => {
    if (err) { return console.log(err) }
    else {
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
  let searchTerm = req.body.Title
  const searchTitle = "https://www.omdbapi.com/?t=" + searchTerm + "&apikey=" + api
  axios.get(searchTitle)
    .then((data) => {
      let temp = data.data
      db.Movies.findOne({ imdbID: temp.imdbID }, (err, foundMovie) => {
        if (err) return console.log(err)
        if (foundMovie) {
          let Error = "This movie is already in your list!"
          res.render("error.ejs", {error: Error})
        } else {
          db.Movies.create(temp, (err, createdMovie) => {
            if (err) return console.log(err)
            // res.send('created movie')
            res.redirect('/movies')
          })
        }
      })
    }).catch((err) => {
      console.log("this is error")
      console.log(err)
    })
})
/* ---------------------------------- show ---------------------------------- */
router.get('/:dataId', (req, res) => { // grab id from url
  db.Movies.findById(req.params.dataId, async (err, foundMovie) => { //find obj with unique Id from database
    if (err) { console.log('db error'); console.log(err) }
    else {

      const wmURL = "https://api.watchmode.com/v1/search/?apiKey=" + wmAPI + "&search_field=imdb_id&search_value=" + foundMovie.imdbID
      const tastediveURL = "https://tastedive.com/api/similar?q=" + foundMovie.Title + "&verbose=1&type=movie&apikey=" + tdAPI
      const youtubeURL = "https://www.googleapis.com/youtube/v3/search?q=" + foundMovie.Title + "+trailer&key=" + ytApi

      const wmTitleSearch = await axios.get(wmURL).catch(e => console.log('Error: ', e.message));

      //returns object with id
      const wmIDURL = 'https://api.watchmode.com/v1/title/' + wmTitleSearch.data.title_results[0].id + "/sources/?apiKey=" + wmAPI

      const wmIDSearch = await axios.get(wmIDURL).catch(e => console.log('Error: ', e.message));
      //returns object with stream id and url
      console.log(wmIDSearch)


      let streamService = []
      let streamLinks = []
      let index = null

     /*  for (let i = 0; i < wmIDSearch.data.length; i++) {
        if (wmServices.some(stream => stream.id === wmIDSearch.data[i].source_id)) {
          index = wmServices.findIndex(stream => stream.id === wmIDSearch.data[i].source_id)
          streamService.push(wmServices[index])
          streamLinks.push(wmIDSearch.data[i])
        }
      }
 */
      for (let i = 0; i < 10; i++) {
        if (wmIDSearch.data.some(stream => stream.source_id === wmServices[i].id)) {
          index = wmIDSearch.data.findIndex(stream => stream.source_id === wmServices[i].id)
          streamService.push(wmServices[i])
          streamLinks.push(wmIDSearch.data[index])
        }
      }
      streamService = streamService.filter((elem, index, self) => self.findIndex(
        (t) => {return (t.id === elem.id)}) === index)
        streamLinks = streamLinks.filter((elem, index, self) => self.findIndex(
          (t) => {return (t.source_id === elem.source_id)}) === index)
        

      console.log(streamService)
      const tdSearch = await axios.get(tastediveURL).catch(e => console.log('Error: ', e.message));

      const tdResults = []
      for (let i = 0; i < tdSearch.data.Similar.Results.length; i++) {
        tdResults.push(tdSearch.data.Similar.Results[i])
      }
      let tdSplit = [[],[]]
      for(let i = 0; i < tdResults.length;i++){
        tdSplit[0].push(tdResults[i].wTeaser.substr(0,tdResults[i].wTeaser.indexOf('.')+1) ) 
        tdSplit[1].push(tdResults[i].wTeaser.substr(tdResults[i].wTeaser.indexOf('.')+2) ) 
      }
      
      const ytSearch = await axios.get(youtubeURL).catch(e => console.log('Error: ', e.message));

      const ytLink = ytSearch.data.items[0].id.videoId
      let apiData = {
        streamService: streamService,
        streamLinks: streamLinks,
        ytLink: ytLink,
        tdResults: tdResults,
        tdSplit:tdSplit
      }




      /* axios.get(youtubeURL).then((data)=>{
        let ytID = data.data.items[0].id.videoId   */
      res.render('./movies/show.ejs', { oneMovie: foundMovie, apiData: apiData })
      /*  }).catch((err)=>{
         console.log(err.response.data.error)
         res.redirect('/')
       }) */
      //pass that obj to our show.ejs page and render it
    }
  })
})

/* ---------------------------------- edit ---------------------------------- */
// Serves a form to get info to update with
router.get('/:dataId/edit', (req, res) => { //get id from url
  db.Movies.findById(req.params.dataId, (err, foundMovie) => { //find item in DB with id
    if (err) return console.log(err);
    res.render('./movies/edit.ejs', { oneMovie: foundMovie }); //render our edit page and pass the found item to it.
  })
});

/* --------------------------------- update --------------------------------- */
// Update the data for a particular item
router.put('/:dataId', (req, res) => {
  db.Movies.findByIdAndUpdate(req.params.dataId, req.body, (err, updatedMovie) => {
    if (err) return console.log(err);
    res.redirect(`/movies/${req.params.dataId}`)
  })
})
/* --------------------------------- destroy -------------------------------- */
router.delete('/:dataId', (req, res) => { //grab id from url
  db.Movies.findByIdAndDelete(req.params.dataId, (err) => { //delete item from database with specified id
    if (err) return console.log(err);
    res.redirect('/movies'); //redirect to index page
  })
})

/* --------------------------------- Export --------------------------------- */
module.exports = router;
