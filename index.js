const express = require("express")
const mongoose = require("mongoose")
const { engine } = require("express-edge")
const bodyParser = require("body-parser")
const userControllers = require('./controllers/userControllers')
const path = require("path")
const multer = require("multer")
const expressSession = require('express-session')
const dashControllers = require("./controllers/dashControllers")
const paystackControllers = require("./controllers/paystackControllers")



// Init express
const app = express()

// Init multer
const form = multer()

const MONGO_URL = 'mongodb://localhost:27017/aspy-billing'

app.use(express.static('public'))
app.use(engine)
app.set('views', `${__dirname}/views`)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


// For Parsing multipart/form-data
app.use(form.array())





mongoose.connect(MONGO_URL, { useNewUrlParser: true })
    .then(() => console.log("You are now connected to the server"))
    .catch(err => console.log(err, err.message))    

app.listen(3000, () => console.log('App listening at port 3000'))


app.get('/', (req, res) => {
    res.render('index')
})

app.get('/pricing', (req, res) => {
    res.render('pricing')
})

app.get('/dashboard', (req, res) => {
    res.render('home')
})

app.get('/customers', dashControllers.getCustomer)

app.get('/auth/register' , (req, res) => {
    res.render('register')
})

// User routes
app.get('/auth/login' , (req, res) => {
    res.render('login')
})

app.post('/users/register', userControllers.storeUser)

app.post('/users/login', userControllers.loginUser)

// payment routes
app.get('/checkout', (req, res) => {
    res.render('testcheckout')
})

app.post('/paystack/pay', paystackControllers.payment)

app.get('/paystack/callback', paystackControllers.paystackCallback)

app.get('/receipt/:id', (req, res) => {
    const id = req.params.id;
    Donor.findById(id).then((donor)=>{
        if(!donor){
            //handle error when the donor is not found
            res.redirect('/checkout/error')
        }
        res.render('success',{donor});
    }).catch((e)=>{
        console.log(e)
        res.redirect('/checkout/error')
    })
})

app.get('/checkout/error', (req, res) => {
    res.render('error')
})