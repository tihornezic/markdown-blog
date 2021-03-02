const express = require('express')
// gives us a router that we can use to create views
const router = express.Router()
const Article = require('../models/article')

router.get('/new', (req, res) => {
    res.render('articles/new', {article: new Article()})
})

router.get('/:id', async (req, res) => {
    // findById is asynchronus function
    const article = await Article.findById(req.params.id)
    // if we cannot find an article, redirect user back to the home page
    if( article == null) res.redirect('/')
    res.render('articles/show', {article: article})
})

router.post('/', async (req, res) => {
    let article = new Article({
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown
    })
    try {
        // asynchronus function
        article = await article.save()
        res.redirect(`/articles/${article.id}`)
    } catch (e) {
        console.log(e)
        res.render('articles/new', {article: article})
    }
})

module.exports = router