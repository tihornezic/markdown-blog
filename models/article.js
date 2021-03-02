const mongoose = require('mongoose')
// converts markdown to HTML
const marked = require('marked')
const slugify = require('slugify')
const createDomPurify = require('dompurify')
const {JSDOM} = require('jsdom')
// allows our dom purifier to create html and purify it by using JSDOM().window object
const dompurify = createDomPurify(new JSDOM().window)

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    markdown: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    sanitizedHtml: {
        type: String,
        required: true
    }
})

// run this function every time before validation - save, update, delete...
// it takes in a next parameter
articleSchema.pre('validate', function(next) {
    if(this.title) {

        this.slug = slugify(this.title, {lower: true, strict: true})
    }

    if(this.markdown) {
        // converts markdown to HTML and then purifies it to get rid of any malicious code that could be there
        this.sanitizedHtml = dompurify.sanitize(marked(this.markdown))
    }

    next()
})

module.exports = mongoose.model('Artile', articleSchema)