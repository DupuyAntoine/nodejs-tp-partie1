const mongoose = require('mongoose')
const {v4: uuidv4} = require('uuid')
const Schema = mongoose.Schema

const citySchema = new Schema({
    id: { type: String, unique: true, default: uuidv4() },
    name: { type: String, unique: false }
})

module.exports = citySchema