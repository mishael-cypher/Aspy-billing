const mongoose = require('mongoose')


const DonorSchema = mongoose.Schema({
    full_name: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    amount: {
        type: Number
    },
    reference: {
        type: String
    },
    address:{
        state: String,
        town: String
    },
    createAt: {
        type: Date,
        default: new Date()
    }
})

const Donor = mongoose.model('Donor', DonorSchema)

module.exports = {Donor}
