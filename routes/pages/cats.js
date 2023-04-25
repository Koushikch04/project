const express = require("express");
const mongoose = require("mongoose")

const petSchema = require("../../models/productSchema");
const users = require("../../models/userSchema")


const router = express.Router();

const petproductDetails = [
    { productType: "pet", petType: "cats", productDetails: { Name: "Persian Cat", price: "20000", src: "../../img/catLandingPage/Cat_Breeds/persian.png" } },
    { productType: "pet", petType: "cats", productDetails: { Name: "Ragdoll", price: "25000", src: "../../img/catLandingPage/Cat_Breeds/Ragdoll.png" } },
    { productType: "pet", petType: "cats", productDetails: { Name: "British Shorthair", price: "40000", src: "../../img/catLandingPage/Cat_Breeds/british shorthair.png" } },
    { productType: "pet", petType: "cats", productDetails: { Name: "Scottish Fold", price: "15000", src: "../../img/catLandingPage/Cat_Breeds/scottish-fold.png" } },
    { productType: "pet", petType: "cats", productDetails: { Name: "Scottish Fold 1", price: "30000", src: "../../img/catLandingPage/Cat_Breeds/scottish-fold.png" } },
    { productType: "pet", petType: "cats", productDetails: { Name: "Premium Scottish Fold", price: "250000", src: "../../img/catLandingPage/Cat_Breeds/scottish-fold.png" } },
    { productType: "pet", petType: "cats", productDetails: { Name: "Scottish Fold 3", price: "20000", src: "../../img/catLandingPage/Cat_Breeds/scottish-fold.png" } },
    { productType: "pet", petType: "cats", productDetails: { Name: "Scottish Fold 4", price: "30000", src: "../../img/catLandingPage/Cat_Breeds/scottish-fold.png" } },
    { productType: "pet", petType: "cats", productDetails: { Name: "Scottish Fold 5", price: "50000", src: "../../img/catLandingPage/Cat_Breeds/scottish-fold.png" } },
    { productType: "pet", petType: "cats", productDetails: { Name: "Scottish Fold 6", price: "20000", src: "../../img/catLandingPage/Cat_Breeds/scottish-fold.png" } },
    { productType: "pet", petType: "cats", productDetails: { Name: "Scottish Fold 7", price: "30000", src: "../../img/catLandingPage/Cat_Breeds/scottish-fold.png" } },
    { productType: "pet", petType: "cats", productDetails: { Name: "Scottish Fold 8", price: "25000", src: "../../img/catLandingPage/Cat_Breeds/scottish-fold.png" } },
    { productType: "pet", petType: "cats", productDetails: { Name: "Scottish Fold 9", price: "20000", src: "../../img/catLandingPage/Cat_Breeds/scottish-fold.png" } },
    { productType: "pet", petType: "cats", productDetails: { Name: "Scottish Fold 10", price: "30000", src: "../../img/catLandingPage/Cat_Breeds/scottish-fold.png" } },
]

// petSchema.insertMany(petproductDetails)


router.get("/", async (req, res) => {
    let notlogin = true;
    if (req.session.userName) {
        notlogin = false
    }
    const pets = await petSchema.find({ "productType": "pet", petType: "cats" })
    console.log("in cats page");
    const cartItems = await users.findOne({ mailId: req.session.userMail }, { userCart: 1 })
    let pricesData = []
    let imgsrcData = []
    let productNamesData = []
    let cartNames = []
    let cartSrc = []
    let cartPrices = []
    pets.forEach(element => {
        pricesData.push(element.productDetails.price);
        imgsrcData.push(element.productDetails.src)
        productNamesData.push(element.productDetails.Name)
    });
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
    res.render("./HTML/LandingPages/catLandingPage.ejs", { notlogin, pricesData, productNamesData, imgsrcData, cartNames, cartPrices, cartSrc })
})

router.post("/", (req, res) => {

})

module.exports = router;