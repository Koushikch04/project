const express = require("express");
const vcApp = require("../../models/appointment")
const userSchema = require('../../models/userSchema');
const router = express.Router();
const mongoose = require("mongoose")
const fs = require("fs")
const path = require("path")
const connectionString = "mongodb+srv://petparadise:Petparadise@cluster0.zuw8xzo.mongodb.net/test"

router.get("/", async (req, res) => {
    let notlogin = true;
    if (req.session.userName) {
        notlogin = false
    }
    let cartNames = []
    let cartSrc = []
    let cartPrices = []
    const cartItems = await userSchema.findOne({ mailId: req.session.userMail }, { userCart: 1 })
    if (!notlogin) {
        cartItems.userCart.forEach(element => {
            // if (element.productType === 'pets') {
            console.log(element.productDetails);
            cartNames.push(element.productDetails.title)
            cartPrices.push(element.productDetails.price)
            cartSrc.push(element.productDetails.src)
            // }
        })
    }
    res.render("./HTML/LandingPages/vetcareLandingPage.ejs", { notlogin, cartNames, cartPrices, cartSrc })
})

// router.post("/appointment", (req, res) => {
//     //    console.log("hi")
//     console.log(req.body);
// })

router.post("/appointment", async (req, res) => {
    let pack = req.body.selpack;
    let num = req.body.selnum;
    let date = req.body.seldate;
    let time = req.body.seltime;
    let apptype = "doctor";
    let status = "pending"
    await vcApp.create({ userName: req.session.userName, package: pack, number: num, date: date, time: time, appointmentType: apptype, status: status })
    res.render("./HTML/LandingPages/vetcareLandingPage.ejs")
})

module.exports = router;