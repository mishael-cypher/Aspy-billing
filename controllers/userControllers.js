const User = require("../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require('dotenv').config()
const { SECRET } = process.env

exports.loginUser = async (req, res) => {
    const email = req.body.email
    const password = req.body.password
    try {
        // Try to find the user
        const user = await User.findOne({ email: req.body.email })
        console.log(password)
        if(user){
            console.log(user)
            const isMatch = await bcrypt.compare(password, user.password)
            if(isMatch){
                console.log("login successful")
                // store user session
                const payload = {
                    user: {
                        id: user.id
                    }
                }

                jwt.sign(
                    payload,
                    SECRET,
                    {
                        expiresin: 36000,
                    },
                    (err, token) => {
                        if(err) throw err
                        res.json({
                            statusCode: 200,
                            message: 'Logged in successfully',
                            user: {
                                name: user.lastName,
                                email: user.email,
                            }
                        })
                    }
                )
        
                res.redirect('/')
            } else{
                console.log(error)
                res.redirect('/auth/login')
            }   
        } else{
            return res.redirect('/auth/register')
        }
    } catch (error) {
        console.log(error, error.message)
    }
}  

exports.storeUser = (req, res) => {

    User.create(req.body, (error, user) => {
        if(error) return res.status(401).json({ errorMessage: error.message, fullError: error })

        res.redirect('/')
    })
}