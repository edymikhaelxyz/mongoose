const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String,
    },
    is_completed: {
        required: false,
        type: Boolean,
        default:false
    }
},{ versionKey: false })

module.exports = mongoose.model('todo', dataSchema)