const express = require("express")
const employeeLogin = require("./employee/login");
const userLogin = require("./user/login");
const userSignup = require("./user/signup");
const router = express.Router();


router.use("/employee/login", employeeLogin); 
router.use("/user/login", userLogin);
router.use("/user/signup", userSignup);


module.exports = router;