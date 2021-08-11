const express = require('express');
const api = process.env.apiKey
const router = express.Router();
const axios = require('axios')



/* --------------------------------- search --------------------------------- */
router.get('/', (req, res) => {    
    res.render("./search/search.ejs")    
})


router.post('/', (req, res) => {
    let searchTerm = req.body.title
    const searchTitle = "https://www.omdbapi.com/?s="+searchTerm+"&apikey="+api
    axios.get(searchTitle)
    .then((data) => {
        console.log(data.data.Search)
    })
})

module.exports = router