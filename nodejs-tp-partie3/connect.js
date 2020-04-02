const mongoose = require('mongoose')

module.exports = () => {
    mongoose.connect("mongodb://localhost/TP_Web", { useNewUrlParser: true })
    db = mongoose.connection
    db.on("error", err => console.error.bind(console, "connection error:"))
    db.once("open", () => {
        console.log("connection to db succeeded")
    })
}
