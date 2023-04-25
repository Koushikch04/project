const express = require("express");
const bcrypt = require('bcryptjs')
const router = express.Router();
const User = require("../../../models/userSchema");
// var session = require('express-session')
var flush = require('connect-flash')

router.get("/", (req, res) => {
    res.render("./HTML/Authentication/login.ejs", { error: false })
})

// router.use(session({
//     secret: 'secret',
//     cookie: { maxAge: 60000 },
//     resave: false,
//     saveUninitialized: false
// }))

router.use(flush())

const checkPassword = (Password, hashedPassword) => {
    return bcrypt.compareSync(Password, hashedPassword)
}

router.post("/", async function (req, res) {
    let mail = req.body.Email
    let password = req.body.Password
    let matched;
    req.session.admin = false
    if (mail === "admin123" && password === "Admin@123") {
        req.session.admin = true
        admin = req.session.admin
        let notlogin = false
        res.render("./HTML/LandingPages/mainLandingPage", { error: true, message: "Login Successfull!", notlogin, admin })
    }
    const users = await User.find({ mailId: mail })
    if (users.length != 0) {
        matched = checkPassword(password, users[0].password)
        if (matched == true) {
            req.session.userMail = mail
            let name = users[0].name.firstName.concat(" ", users[0].name.lastName)
            req.session.userName = name
            let notlogin = false
            console.log(notlogin);
            admin = req.session.admin
            const cartItems = await User.findOne({ mailId: req.session.userMail }, { userCart: 1 })
            let cartNames = []
            let cartSrc = []
            let cartPrices = []
            let cartType = []
            cartItems.userCart.forEach(element => {
                // if (element.productType === 'pets') {
                console.log(element.productDetails);
                cartNames.push(element.productDetails.title)
                cartPrices.push(element.productDetails.price)
                cartSrc.push(element.productDetails.src)
                cartType.push(element.productType)
                // }
            })
            res.render("./HTML/LandingPages/mainLandingPage", { error: true, message: "Login Successfull!", notlogin, admin, cartSrc, cartNames, cartPrices, cartType })
        }
        else {
            res.render("./HTML/Authentication/login", { error: true, message: "Incorrect Password!Please try again" })
        }
    }

    else {
        res.render("./HTML/Authentication/login", { error: true, message: "Invalid Mail!Please try again" })
    }
})
module.exports = router;