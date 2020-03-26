const express = require('express')
const path = require('path')

const app = express()

const port = 3000;

app.use((req, res, next) => {
    console.log('Request: ', req.path)
    next()
})

app.set('view engine', 'pug')

app.get('/', (req, res) => {
    res.render('index', { title: 'Hey', message: 'General Kenobi !!' })
})

app.use('/static', express.static(path.join(__dirname, 'public')))

app.get('/user/:id', (req, res) => {
    res.send('user' + req.params.id)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
})