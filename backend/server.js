require('dotenv').config()
const express = require('express')
const cors = require('cors');
const app=express()
const cookieParser = require('cookie-parser');
app.use(cors({
    origin: '*',
     credentials: true
}))
app.use(cookieParser())
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "http://localhost:3000");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
}
    app.use(allowCrossDomain);
const mongoose = require('mongoose')

mongoose.connect(process.env.DB_URL,{useNewUrlParser:true});
const db = mongoose.connection;
db.on('error', (error)=>console.log(error))
db.once('open',()=>console.log('Connected to db'))

app.use(express.json())

const userRoutes = require('./routes/user')
app.use('/user',userRoutes)
const searchRoutes = require('./routes/search')
app.use('/search', searchRoutes)
const commentsRoutes = require('./routes/comments')
app.use('/comment', commentsRoutes)
const bookmarksRoutes = require('./routes/bookmarks')
app.use('/bookmark', bookmarksRoutes)
app.listen(8080, () =>console.log("server started"))

const nodes = require('./routes/similar_nodes')
app.use('/similar_nodes', nodes)
