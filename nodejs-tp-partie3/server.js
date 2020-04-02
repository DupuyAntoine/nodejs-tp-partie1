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
    // this middleware will call for each requested
    // and we checked for the requested query properties
    // if _method was existed
    // then we know, clients need to call DELETE request instead
    if ( req.query._method == 'DELETE' ) {
        // change the original METHOD
        // into DELETE method
        req.method = 'DELETE';
        // and set requested url to /user/12
        req.url = req.path;
    }
    if (req.query._method == 'PUT') {
        req.method = 'PUT'
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