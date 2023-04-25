const express = require("express");
const petSchema = require("../../models/productSchema");
const users = require("../../models/userSchema")

const router = express.Router();

const petproductDetails = [
    { productType: "pet", petType: "fishes", productDetails: { Name: "Gold Fish", price: "100", src: "../../img/fishLandingPage/Fish_Images/gold_fish.png" } },
    { productType: "pet", petType: "fishes", productDetails: { Name: "Koi Fish", price: "300", src: "../../img/fishLandingPage/Fish_Images/koi_fish.png" } },
    { productType: "pet", petType: "fishes", productDetails: { Name: "Tiger barb", price: "150", src: "../../img/fishLandingPage/Fish_Images/tiger_barb.png" } },
    { productType: "pet", petType: "fishes", productDetails: { Name: "Molly fish", price: "200", src: "../../img/fishLandingPage/Fish_Images/molly_fish.png" } },
    { productType: "pet", petType: "fishes", productDetails: { Name: "Molly fish 1", price: "300", src: "../../img/fishLandingPage/Fish_Images/molly_fish.png" } },
    { productType: "pet", petType: "fishes", productDetails: { Name: "Molly fish 2", price: "400", src: "../../img/fishLandingPage/Fish_Images/molly_fish.png" } },
    { productType: "pet", petType: "fishes", productDetails: { Name: "Molly fish 3", price: "200", src: "../../img/fishLandingPage/Fish_Images/molly_fish.png" } },
    { productType: "pet", petType: "fishes", productDetails: { Name: "Molly fish 4", price: "150", src: "../../img/fishLandingPage/Fish_Images/molly_fish.png" } },
    { productType: "pet", petType: "fishes", productDetails: { Name: "Molly fish 5", price: "120", src: "../../img/fishLandingPage/Fish_Images/molly_fish.png" } },
    { productType: "pet", petType: "fishes", productDetails: { Name: "Molly fish 6", price: "100", src: "../../img/fishLandingPage/Fish_Images/molly_fish.png" } },
    { productType: "pet", petType: "fishes", productDetails: { Name: "Molly fish 7", price: "200", src: "../../img/fishLandingPage/Fish_Images/molly_fish.png" } },
    { productType: "pet", petType: "fishes", productDetails: { Name: "Molly fish 8", price: "150", src: "../../img/fishLandingPage/Fish_Images/molly_fish.png" } },
    { productType: "pet", petType: "fishes", productDetails: { Name: "Molly fish 9", price: "250", src: "../../img/fishLandingPage/Fish_Images/molly_fish.png" } },
    { productType: "pet", petType: "fishes", productDetails: { Name: "Premium Gold Fish", price: "30000", src: "../../img/fishLandingPage/Fish_Images/molly_fish.png" } },
]

// petSchema.insertMany(petproductDetails)

router.get("/", async (req, res) => {
    let notlogin = true;
    if (req.session.userName) {
        notlogin = false
    }
    const pets = await petSchema.find({ "productType": "pet", "petType": "fishes" })
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
    res.render("./HTML/LandingPages/fishLandingPage.ejs", { notlogin, pricesData, productNamesData, imgsrcData, cartNames, cartPrices, cartSrc })
})

router.post("/product", async (req, res) => {
    console.log("request made");
    console.log(req.body);
    console.log("request session is:" + req.session.userMail);
    if (req.body.type === "add") {
        await users.updateOne({ mailId: req.session.userMail }, { $push: { userCart: { productType: "pets", productDetails: { title: req.body.title, price: req.body.price, src: req.body.imagSource, quantity: 0 } } } },)
    }
    else if (req.body.type === "remove") {
        console.log(req.body);
        await users.updateOne({ mailId: req.session.userMail }, { $pop: { userCart: { productType: "pets", productDetails: { title: req.body.title, price: req.body.price, src: req.body.imagSource, quantity: 0 } } } },)
    }
})

module.exports = router;