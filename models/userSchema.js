const mongoose = require("mongoose");
const nameSchema = new mongoose.Schema({
    firstName: String,
    lastName: String
})

const userSchema = new mongoose.Schema({
    name: nameSchema,
    mailId: { type: String, trim: true },
    password: String,
    userCart: [{
        productType: String,
        productDetails: {
            title: String,
            price: Number,
            quantity: Number,
            src: { type: String }
        }
    }],
    appointment: [{
        userName: String,
        package: String,
        number: String,
        date: String,
        time: String,
        appointmentType: String,
        status: String,
    }],
})

module.exports = mongoose.model("userSchema", userSchema)

