// npm i express mongoose ejs
// npm i --save-dev nodemon

const express = require('express')
const app = express()
const articleRouter = require('./routes/articles')

// setting up ejs as view engine
app.set('view engine', 'ejs')

// every single route in articleRouter is going to be added at the end of /articles
app.use('/articles', articleRouter)

// index route
app.get('/', (req, res) => {
    const articles = [{
        title: 'Test Article',
        createdAt: new Date(),
        description: 'Test description'
    },
    {
        title: 'Test Article 2',
        createdAt: new Date(),
        description: 'Test description 2'
    }
]
    res.render('articles/index', {articles: articles})
})

app.listen(5001, () => console.log('Server listening on port 5001.'))