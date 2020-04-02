const express = require('express')
const bodyParser = require('body-parser')
const db = require('./connect')
const routes = require('./routes')

const app = express()

const port = 3000;

// config bodyparser
const jsonParser = bodyParser.json()
const urlEncoded = bodyParser.urlencoded({ extended: true })

// initialize express router
const router = express.Router()

// db connection function
db()


// config app use
app.use((req, res, next) => {
    console.log('Request: ', req.path)
    next()
})
app.use(jsonParser)
app.use(urlEncoded)

router.use( function( req, res, next ) {
    if ( req.query._method == 'DELETE' ) {
        req.method = 'DELETE';
        req.url = req.path;
    }
    if (req.query._method == 'PUT') {
        console.log(req.query)
        req.method = 'PUT'
        req.body = req.query.city
        req.url = req.path
    }
    next(); 
});


app.use(router)

// call city routes
routes(router)

// pug view
app.set('view engine', 'pug')

app.get('/', (req, res) => {
    res.render('index', { title: 'Enregistrer une ville' })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
})