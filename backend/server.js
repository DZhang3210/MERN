require('dotenv').config()

const punycode = require('punycode/');
const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')
const signupRoutes = require('./routes/user')

//express app
const app = express();
app.use(express.json());    //parses JSON

//Routes
app.use('/api/workouts',workoutRoutes)

app.use('/api/user', signupRoutes)


//connect to db
mongoose.connect(process.env.MONGO_URI)
.then(
    //Start up express app
    app.listen(process.env.PORT, () => {
        console.log('connected to db & listening on port '+ process.env.PORT)
    })
)
.catch(err => console.log(err))

//Developement function, checking requests
app.use((req, res, next)=>{
    console.log(req.path, req.method)
    next();
})

//Default Home app
app.get('/', (req, res) => {
    res.json({mssg: "Welcome to the app"})
})

//const URL =   "http://localhost:4000"



