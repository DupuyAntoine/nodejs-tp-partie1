const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const fs = require('fs')
const {v4: uuidv4} = require('uuid')

const app = express()

const port = 3001;

const jsonParser = bodyParser.json()

app.use((req, res, next) => {
    console.log('Request: ', req.path)
    next()
})

app.set('view engine', 'pug')

app.get('/', (req, res) => {
    res.render('index', { title: 'Hey', message: 'General Kenobi !!' })
})

app.get('/cities', (req, res) => {
    if (!fs.existsSync(path.join(__dirname, 'cities', 'cities.json'))) {
        res.sendStatus(404)
    } else {
        fs.readFile(path.join(__dirname, 'cities', 'cities.json'), 'utf-8', (err, data) => {
            if (err) {
                res.sendStatus(404)
            } else {
                res.send(data)
            }
        })
    }
})

app.post('/city', jsonParser, (req, res, next) => {
    const city = req.body
    if (fs.existsSync(path.join(__dirname, 'cities', 'cities.json'))) {
        fs.readFile(path.join(__dirname, 'cities', 'cities.json'), (err, data) => {
            if (err) {
                console.log(err)
            } else {
                const object = JSON.parse(data)
                if (object.cities.some(c => c.name === city.name)) {
                    res.sendStatus(403)
                } else {
                    object.cities.push({
                        id: uuidv4(),
                        name: city.name
                    })
                    const json = JSON.stringify(object)
                    fs.writeFileSync(path.join(__dirname, 'cities', 'cities.json'), json)
                    res.send(json)
                }
            }
        })
    } else {
        console.log('File do not exists')
        const object = {}
        object.cities = [{id: uuidv4(), name: city.name}]
        let json = JSON.stringify(object)
        fs.writeFileSync(path.join(__dirname, 'cities', 'cities.json'), json)
        res.send(json)
    }
})

app.put('/city/:id', jsonParser, (req, res) => {
    const city = req.body
    if (fs.existsSync(path.join(__dirname, 'cities', 'cities.json'))) {
        fs.readFile(path.join(__dirname, 'cities', 'cities.json'), (err, data) => {
            if (err) {
                console.log(err)
            } else {
                const object = JSON.parse(data)
                const index = object.cities.findIndex(c => c.id === city.id)
                if (index === -1) {
                    res.sendStatus(404)
                } else {
                    object.cities[index].name = city.name
                    const json = JSON.stringify(object)
                    fs.writeFileSync(path.join(__dirname, 'cities', 'cities.json'), json)
                    res.send(json)
                }
            }
        })
    } else {
        console.log('File do not exists')
        res.sendStatus(404)
    }
})

app.delete('/city/:id', jsonParser, (req, res) => {
    const id = req.params.id
    if (fs.existsSync(path.join(__dirname, 'cities', 'cities.json'))) {
        fs.readFile(path.join(__dirname, 'cities', 'cities.json'), (err, data) => {
            if (err) {
                console.log(err)
            } else {
                const object = JSON.parse(data)
                const index = object.cities.findIndex(c => c.id === id)
                if (index === -1) {
                    res.sendStatus(404)
                } else {
                    object.cities = object.cities.filter(c => c.id !== id)
                    const json = JSON.stringify(object)
                    fs.writeFileSync(path.join(__dirname, 'cities', 'cities.json'), json)
                    res.send(json)
                }
            }
        })
    } else {
        console.log('File do not exists')
        res.sendStatus(404)
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
})