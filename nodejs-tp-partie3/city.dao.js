const mongoose = require('mongoose')
const citySchema = require('./model')

citySchema.statics = {

    create: function(data, callback) {
        const city = new this(data)
        city.save(callback)
    },
    get: function(query, callback) {
        this.find(query, callback)
    },
    update: function(query, updateData, callback) {
        this.findOneAndUpdate(query, {$set: updateData}, {new: true}, callback)
    },
    delete: function(query, callback) {
        this.findOneAndDelete(query, callback)
    }
}

const City = mongoose.model('City', citySchema)
module.exports = City