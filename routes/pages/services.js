const express = require("express");
const appointmentSchema = require("../../models/appointment");
const userSchema = require('../../models/userSchema');

const router = express.Router();

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
    res.render("./HTML/LandingPages/servicesLandingPage.ejs", { notlogin, cartNames, cartPrices, cartSrc })
})

router.post("/", (req, res) => {

})

router.post("/appointment", async (req, res) => {
    let notlogin = true;
    if (req.session.userName) {
        notlogin = false
    }
    let pack = req.body.selpack;
    let num = req.body.selnum;
    let date = req.body.seldate;
    let time = req.body.seltime;
    let mail = req.session.userMail;
    let apptype = "salon";
    let status = "pending";
    let newapp = await appointmentSchema.create({ userName: req.session.userName, package: pack, number: num, date: date, time: time, appointmentType: apptype, status: status })
    await userSchema.findOneAndUpdate({ "mailId": req.session.userMail }, { "appointment": newapp })
    res.render("./HTML/PaymentPage/paymentPage.ejs", { notlogin })
})

module.exports = router;