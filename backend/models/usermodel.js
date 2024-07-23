const { config } = require('dotenv')
const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://admin:admin%40123@cluster0.nim4yef.mongodb.net/notes-app")

const UserSchema = new mongoose.Schema({
    fullName: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    createdOn: {
        type: Date,
        default: new Date().getTime()
    }
})

const User = mongoose.model("User", UserSchema)
module.exports = {
    User
}