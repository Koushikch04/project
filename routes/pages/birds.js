const express = require("express");
const users = require("../../models/userSchema")

const petSchema = require("../../models/productSchema");

const router = express.Router();

const petproductDetails = [
    { productType: "pet", petType: "birds", productDetails: { Name: " Budgerigar", price: "1500", src: "../../img/birdLandingPage/Bird_breeds/Budgerigar.png" } },
    { productType: "pet", petType: "birds", productDetails: { Name: "Cockatiel", price: "5000", src: "../../img/birdLandingPage/Bird_breeds/Cocktail.png" } },
    { productType: "pet", petType: "birds", productDetails: { Name: "Dove", price: "7500", src: "../../img/birdLandingPage/Bird_breeds/dove.jpg" } },
    { productType: "pet", petType: "birds", productDetails: { Name: "Finch", price: "2000", src: "../../img/birdLandingPage/Bird_breeds/Finch.png" } },
    { productType: "pet", petType: "birds", productDetails: { Name: "Finch 1", price: "3000", src: "../../img/birdLandingPage/Bird_breeds/Finch.png" } },
    { productType: "pet", petType: "birds", productDetails: { Name: "Finch 2", price: "25000", src: "../../img/birdLandingPage/Bird_breeds/Finch.png" } },
    { productType: "pet", petType: "birds", productDetails: { Name: "Finch 3", price: "2000", src: "../../img/birdLandingPage/Bird_breeds/Finch.png" } },
    { productType: "pet", petType: "birds", productDetails: { Name: "Finch 4", price: "3000", src: "../../img/birdLandingPage/Bird_breeds/Finch.png" } },
    { productType: "pet", petType: "birds", productDetails: { Name: "Premium Finch", price: "50000", src: "../../img/birdLandingPage/Bird_breeds/Finch.png" } },
    { productType: "pet", petType: "birds", productDetails: { Name: "Finch 6", price: "2000", src: "../../img/birdLandingPage/Bird_breeds/Finch.png" } },
    { productType: "pet", petType: "birds", productDetails: { Name: "Finch 7", price: "3000", src: "../../img/birdLandingPage/Bird_breeds/Finch.png" } },
    { productType: "pet", petType: "birds", productDetails: { Name: "Finch 8", price: "1800", src: "../../img/birdLandingPage/Bird_breeds/Finch.png" } },
    { productType: "pet", petType: "birds", productDetails: { Name: "Finch 9", price: "2000", src: "../../img/birdLandingPage/Bird_breeds/Finch.png" } },
    { productType: "pet", petType: "birds", productDetails: { Name: "Finch 10", price: "3000", src: "../../img/birdLandingPage/Bird_breeds/Finch.png" } },
]

// petSchema.insertMany(petproductDetails)
router.get("/", async (req, res) => {
    let notlogin = true;
    if (req.session.userName) {
        notlogin = false
    }
    const pets = await petSchema.find({ "productType": "pet", petType: "birds" })
    console.log("in birds page");
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
            console.log(element.productDetails);
            cartNames.push(element.productDetails.title)
            cartPrices.push(element.productDetails.price)
            cartSrc.push(element.productDetails.src)

        })
    }
    res.render("./HTML/LandingPages/birdLandingPage.ejs", { notlogin, pricesData, productNamesData, imgsrcData, cartNames, cartPrices, cartSrc })
})

router.post("/", (req, res) => {

})

module.exports = router;