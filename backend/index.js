require('dotenv').config()

const config  = require("./config.json")
const mongoose = require("mongoose")
const { User } = require("./models/usermodel")
const { Note } = require("./models/notemodel")
mongoose.connect("mongodb+srv://admin:admin%40123@cluster0.nim4yef.mongodb.net/notes-app")

const express = require('express')
const cors = require('cors')
const { authenticateToken } = require('./utilities')
const app = express()
const PORT = 3000
const zod = require('zod')

const { JWT_SECRET } = require('./config')
const jwt = require('jsonwebtoken')

const { accountSchema, loginSchema } = require('./zodSchema')

app.use(cors())
app.use(express.json())

app.post("/create-account", async (req,res) => {
    const body = req.body;
    const { fullName, email, password } = req.body 
    const bodyResponse = accountSchema.safeParse(body)

    if(!(bodyResponse.success)){
        return res.status(400).json({error: true,message: "Some fault in the input"})
    }

    const isUser = await User.findOne({ email })

    if(isUser){
        return res.json({
            error: true,
            message: "User Already exists"
        })
    }

    const user = new User({
        fullName,
        email,
        password
    })

    await user.save()

    const accessToken = jwt.sign({ user }, JWT_SECRET)

    return res.json({
        error: false,
        user,
        accessToken,
        message: "Registration Successful"
    })

})

app.post("/login", async (req,res) => {
    const body = req.body
    const { email , password } = body

    const loginResponse = loginSchema.safeParse(body)

    if(!(loginResponse.success)){
        return res.json({
            error: true,
            message: "Please enter valid details"
        })
    }

    const userInfo = await User.findOne({email})

    if(!(userInfo)){
        return res.json({
            error: true,
            message: "Account not found"
        })
    }

    if(userInfo.email == email && userInfo.password == password){
        const user = { user : userInfo }
        const accessToken = jwt.sign(user,JWT_SECRET)
        return res.json({
            error: false,
            email, 

            accessToken,
            message: "login successful"
        })
    }
    else{
        return res.status(400).json({
            error: true,
            message: "Login Unsuccessful"
        })
    }
})

app.post("/add-note", authenticateToken, async (req,res) => {
    const { title, content } = req.body
    const user = req.user
    if(!title){
        return res.json({
            error: true,
            message: "No Title found"
        })
    }

    if(!content){
        return res.json({
            error: true,
            message: "No Content found"
        })
    }

    try{
        const note = new Note({
            title,
            content,
            userId: user._id
        })

        await note.save()

        return res.json({
            error: false,
            note,
            message: "Note created successfully"
        })
    }
    catch(error){
        return res.json({
            error: true,
            message: "Internal server error"
        })
    }
})

app.put("/edit-note/:noteId", authenticateToken, async (req,res) => {
    const noteId = req.params.noteId
    const { title, content, isPinned } = req.body
    const user = req.user
    if(!title && !content){
        return res.status(400).json({
            error: true,
            message: "No Changes found"
        })
    }

    try{
        const note = await Note.findOne({
            _id: noteId,
            userId: user._id
        })

        if(!note) {
            return res.json({
                error: true,
                message: "note not found"
            })
        }

        if(title) note.title = title
        if(content) note.content = content
        if(isPinned) note.isPinned = isPinned
        
        await note.save()

        return res.json({
            error: false,
            note,
            message: "Note Updated successfully"
        })
    }
    catch(error){
        return res.status(500).json({
            error: true,
            message: "Internal server error"
        })
    }
})

app.get("/get-all-note", authenticateToken, async (req,res) => {
    const user = req.user
    console.log(user)

    try{
        console.log("user")
        const notes = await Note.find({
            userId: user._id
        }).sort({ isPinned : -1 })

        return res.json({
            error: false,
            notes,
            message: "All notes Retrieved"
        })
    }
    catch(error){
        return res.status(500).json({
            error: true,
            message: "Internal server error"
        })
    }
})

app.delete("/delete-note/:noteId", authenticateToken, async (req,res) => {
    const noteId = req.params.noteId
    const user = req.user

    try{
        const note = await Note.findOne({
            _id: noteId ,
            userId: user._id
        })

        if(!note){
            return res.status(404).json({
                error: true,
                message: "Note not found"
            })
        }

        await Note.deleteOne({
            _id: noteId ,
            userId: user._id
        })

        return res.json({
            error: false,
            note,
            message: "Note Deleted"
        })
    }   
    catch(error){
        return res.status(500).json({
            error: true,
            message: "Internal server error"
        })
    }
})


app.put("/update-note-pinned", authenticateToken, async (req,res) => {
    const noteId = req.params.noteId
    const { isPinned } = req.body
    const user = req.user

    try{
        const note = await Note.findOne({
            _id: noteId,
            userId: user._id
        })

        if(!note) {
            return res.json({
                error: true,
                message: "note not found"
            })
        }

        if(isPinned) note.isPinned = isPinned || false
        
        await note.save()

        return res.json({
            error: false,
            note,
            message: "Note Updated successfully"
        })
    }
    catch(error){
        return res.status(500).json({
            error: true,
            message: "Internal server error"
        })
    }
})

app.get("/get-user", authenticateToken, async (req,res) => {
    const user = req.user

    const isUser = await User.findOne({
        _id: user._id
    })

    if(!isUser){
        return res.status(404).json({
            error: true,
            message: "User not found"
        })
    }

    return res.json({
        user: isUser,
        message: ""
    })
})

app.listen(PORT,() => {
    console.log("Server Started")
})