const express = require('express');
const api = process.env.apiKey
const router = express.Router();
const axios = require('axios')
let temp ={}



/* --------------------------------- search --------------------------------- */
router.get('/', (req, res) => {    
    res.render("./search/search.ejs")    
})


router.post('/', (req, res) => {
    let searchTerm = req.body.search
    const searchTitle = "https://www.omdbapi.com/?s="+searchTerm+"&apikey="+api
    axios.get(searchTitle)
    .then((data) => {
        temp = data.data.Search
        if (data.data.Response === 'False') {
            res.render("error.ejs", {error: data.data.Error})
        }
         else {
             res.redirect('/search/results')
            }
        
    })
})

// router.put('/error', (req, res) => {
//     res.render("./search/error.ejs")
//     res.redirect('/search/error')

// })

router.get('/results', (req, res) => { 
    res.render('./search/searchResults.ejs', { searchResults: temp }) 
    
})


module.exports = router


