const express = require('express')
// gives us a router that we can use to create views
const router = express.Router()

router.get('/', (req, res) => {
    res.send('In articles')
})

module.exports = router