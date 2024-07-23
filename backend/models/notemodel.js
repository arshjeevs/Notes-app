const { config } = require('dotenv')
const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://admin:admin%40123@cluster0.nim4yef.mongodb.net/notes-app")

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true,
    },
    isPinned: {
        type: Boolean,
        default: false
    },
    userId: {
        type: String,
        require: true,
    },
    createdOn: {
        type: Date,
        default: new Date().getTime()
    }
})

const Note = mongoose.model("Note", noteSchema)
module.exports = {
    Note
}