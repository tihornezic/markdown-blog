// npm i express mongoose ejs
// npm i --save-dev nodemon
// npm i marked slugify
// npm i method-override

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const articleRouter = require('./routes/articles')
const Article = require('./models/article')
const methodOverride = require('method-override')

mongoose.connect('mongodb://localhost/blog', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })

// setting up ejs as view engine
app.set('view engine', 'ejs')

// to access all different parameters from article form inside of articles route - req.body ...
// needs to come before using routers
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'))

// index route
app.get('/', async (req, res) => {
    const articles = await Article.find().sort({createdAt: 'desc'})
    res.render('articles/index', {articles: articles})
})

// every single route in articleRouter is going to be added at the end of /articles
app.use('/articles', articleRouter)

app.listen(5001, () => console.log('Server listening on port 5001.'))