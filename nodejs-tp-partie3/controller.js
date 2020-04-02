const {v4: uuidv4} = require('uuid')
const pug = require('pug')
const City = require('./city.dao')

exports.create = (req, res, next) => {
    const city = {
        id: uuidv4(),
        name: req.body.name,
    }

    City.create(city, (err, city) => {
        if (err) {
            res.json({
                error: err
            })
        }
        res.json({
            message: city.name + ' created successfully'
        })
    })
}

exports.get = (req, res, next) => {
    City.get({}, (err, cities) => {
        if (err) {
            res.json({
                error: err
            })
        }
        const compileLine = pug.compileFile('./views/row.pug')
        let content = '<table>'
        content += '<thead>';
        content += '<tr><th>Identifiant</th><th>Ville</th></tr>';
        content += '</thead>';
        content += '<tbody>';            
        for (let city of cities) {
            content += compileLine({
                id: city.id,
                city: city.name
            });         
        }
        content += '</tbody>';
        content += '<style type="text/css">';
        content += 'table { border: 1px solid #ddd; width: 100%; }';
        content += 'th { background-color: cyan; }';
        content += '</style>';            
        content += '</table>'
        res.send(content)
    })
}

exports.update = (req, res, next) => {
    const city = {
        name: req.body.name,
    }

    City.update({ id: req.params.id }, city, (err, city) => {
        if (err) {
            res.json({
                error: err
            })
        }
        res.json({
            message: city.name + ' updated successfully'
        })
    })
}

exports.delete = (req, res, next) => {
    City.delete({ id: req.params.id }, (err, city) => {
        if (err) {
            res.json({
                error: err
            })
        }
        res.json({
            message: city.name + ' deleted successfully'
        })
    })
}