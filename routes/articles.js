const express = require('express')
// gives us a router that we can use to create views
const router = express.Router()

router.get('/new', (req, res) => {
    res.render('articles/new')
})

router.post('/', (req, res) => {
    
})

module.exports = router