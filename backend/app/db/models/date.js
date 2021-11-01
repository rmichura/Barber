const mongoose = require('mongoose')

const dateSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    date: {
        type: String,
        required: true
    },
    hour: {
        type: String,
        required: true
    },
    service: {
        type: String,
        required: true,
    },
    employee: {
        type: String,
        required: true,
    }
})

const Date = mongoose.model('Date', dateSchema)

module.exports = Date