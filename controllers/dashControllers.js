const User = require("../models/User")


exports.getCustomer = async (req, res) => {
    const customers = await User.find({})
    res.render('customers', {
        customers
    })
}