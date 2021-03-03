const express = require('express')
// gives us a router that we can use to create views
const router = express.Router()
const Article = require('../models/article')

// since a link only does GET, and form POST/GET,
// methodoverride was used to use/override DELETE method in form;
// allows us to use DELETE/PATCH/PUT...

router.get('/new', (req, res) => {
    res.render('articles/new', {article: new Article()})
})

router.get('/edit/:id', async (req, res) => {
    const article = await Article.findById(req.params.id)
    res.render('articles/edit', {article: article})
})

router.get('/:slug', async (req, res) => {
    // findById is asynchronus function
    const article = await Article.findOne({slug: req.params.slug})
    // if we cannot find an article, redirect user back to the home page
    if (article == null) res.redirect('/')
    res.render('articles/show', {article: article})
})

router.post('/', async (req, res, next) => {
    req.article = new Article()
    // go onto the next function in our list, which is saveArticleAndRedirect()
    next()
}, saveArticleAndRedirect('new'))

router.put('/:id', async (req, res, next) => {
    req.article = await Article.findById(req.params.id)
    next()
}, saveArticleAndRedirect('edit'))

router.delete('/:id', async (req, res) => {
    await Article.findByIdAndDelete(req.params.id)
    res.redirect('/')
})

// returns a set of middleware
function saveArticleAndRedirect(path) {
    return async (req, res) => {
        let article = req.article
        article.title = req.body.title
        article.description = req.body.description
        article.markdown = req.body.markdown
        try {
            // asynchronus function
            article = await article.save()
            res.redirect(`/articles/${article.slug}`)
        } catch (e) {
            console.log(e)
            // path will be either new or edit
            res.render(`articles/${path}`, {article: article})
        }
    }
}

module.exports = router