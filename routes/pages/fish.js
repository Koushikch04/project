const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
    let notlogin = true;
    if (req.session.userName) {
        notlogin = false
    }
    res.render("./HTML/LandingPages/fishLandingPage.ejs", { notlogin })
})

router.post("/", (req, res) => {

})

module.exports = router;