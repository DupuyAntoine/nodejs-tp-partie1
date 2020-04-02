const CityController = require('./controller')

module.exports = (router) => {
    router.post('/city', CityController.create)
    router.get('/cities', CityController.get)
    router.put('/city/:id', CityController.update)
    router.delete('/city/:id', CityController.delete)
}