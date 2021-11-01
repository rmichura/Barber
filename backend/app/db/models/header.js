const mongoose = require('mongoose')

const headerSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    }
})

const Header = mongoose.model('Header', headerSchema)

module.exports = Header