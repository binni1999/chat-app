const express = require('express')
const dotenv = require('dotenv')
const path = require('path')
dotenv.config();
const cookieParser = require('cookie-parser')

const authRoutes = require('./routes/authRoutes');
const connectToMongoDB = require('./db/connectToMongoDB');
const messageRoutes = require('./routes/messageRoutes')
const userRoutes = require('./routes/userRoutes')
const conversationRoutes = require('./routes/conversationRoutes');
const { app, server } = require('./socket/socket');

app.use(express.json());
app.use(cookieParser());




app.use('/api/auth', authRoutes)
app.use('/api/messages', messageRoutes)
app.use('/api/users', userRoutes)




app.use(express.static(path.join(__dirname, "../frontend/dist")))

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
})

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server is running on port ${PORT}`)
})