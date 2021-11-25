const {Donor} = require('../models/Donor')
const request = require("request")
const _ = require("lodash")
const { initializePayment, verifyPayment } = require('../config/paystack')(request)
const express = require("express")


exports.payment = (req, res) => {
    const form = _.pick(req.body,['amount','email','full_name']);
    form.metadata = {
        full_name : form.full_name
    }
    form.amount *= 100;
    
    initializePayment(form, (error, body)=>{
        if(error){
            //handle errors
            console.log(error);
            return res.redirect('/checkout/error')
        }
        response = JSON.parse(body);
        console.log(response)
        res.redirect(response.data.authorization_url)
    });
}

exports.paystackCallback = (req, res) => {
    const ref = req.query.reference;
    verifyPayment(ref, (error,body)=>{
        if(error){
            //handle errors appropriately
            console.log(error)
            return res.redirect('/checkout/error');
        }
        response = JSON.parse(body);        

        const data = _.at(response.data, ['reference', 'amount','customer.email', 'metadata.full_name']);

        [reference, amount, email, full_name] =  data;
        
        newDonor = {reference, amount, email, full_name}

        const donor = new Donor(newDonor)

        donor.save().then((donor)=>{
            if(!donor){
                return res.redirect('/checkout/error');
            }
            res.redirect('/receipt/'+donor._id);
        }).catch((e)=>{
            res.redirect('/checkout/error');
        })
    })
}