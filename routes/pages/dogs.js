const express = require("express");
const petSchema = require("../../models/productSchema");
const users = require("../../models/userSchema")

const router = express.Router();

const petDetails = [
    { productType: "pet", petType: "dogs", productDetails: { Name: "Labrador Retriever", price: "15000", src: "../../img/dogLandingPage/Dog_Breeds/labdrador_retriever.png" } },
    { productType: "pet", petType: "dogs", productDetails: { Name: "Golden Retriever", price: "25000", src: "../../img/dogLandingPage/Dog_Breeds/Golden_retriever.png" } },
    { productType: "pet", petType: "dogs", productDetails: { Name: "Beagle", price: "18000", src: "../../img/dogLandingPage/Dog_Breeds/beagle.png" } },
    { productType: "pet", petType: "dogs", productDetails: { Name: "German shepherd", price: "20000", src: "../../img/dogLandingPage/Dog_Breeds/german_shepard.png" } },
    { productType: "pet", petType: "dogs", productDetails: { Name: "German shepherd 1", price: "30000", src: "../../img/dogLandingPage/Dog_Breeds/german_shepard.png" } },
    { productType: "pet", petType: "dogs", productDetails: { Name: "German shepherd 2", price: "250000", src: "../../img/dogLandingPage/Dog_Breeds/german_shepard.png" } },
    { productType: "pet", petType: "dogs", productDetails: { Name: "German shepherd 3", price: "20000", src: "../../img/dogLandingPage/Dog_Breeds/german_shepard.png" } },
    { productType: "pet", petType: "dogs", productDetails: { Name: "German shepherd 4", price: "30000", src: "../../img/dogLandingPage/Dog_Breeds/german_shepard.png" } },
    { productType: "pet", petType: "dogs", productDetails: { Name: "German shepherd 5", price: "250000", src: "../../img/dogLandingPage/Dog_Breeds/german_shepard.png" } },
    { productType: "pet", petType: "dogs", productDetails: { Name: "German shepherd 6", price: "20000", src: "../../img/dogLandingPage/Dog_Breeds/german_shepard.png" } },
    { productType: "pet", petType: "dogs", productDetails: { Name: "German shepherd 7", price: "30000", src: "../../img/dogLandingPage/Dog_Breeds/german_shepard.png" } },
    { productType: "pet", petType: "dogs", productDetails: { Name: "German shepherd 8", price: "250000", src: "../../img/dogLandingPage/Dog_Breeds/german_shepard.png" } },
    { productType: "pet", petType: "dogs", productDetails: { Name: "German shepherd 9", price: "20000", src: "../../img/dogLandingPage/Dog_Breeds/german_shepard.png" } },
    { productType: "pet", petType: "dogs", productDetails: { Name: "German shepherd 10", price: "30000", src: "../../img/dogLandingPage/Dog_Breeds/german_shepard.png" } },
]

// petSchema.insertMany(petDetails)
router.get("/", async (req, res) => {
    let notlogin = true;
    if (req.session.userName) {
        notlogin = false
    }
    let admin = false
    if (req.session.admin) {
        admin = true
    }

    const pets = await petSchema.find({ "productType": "pet", "petType": "dogs" })
    console.log("in dogs page");
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
    // console.log(typeof (cartItems));
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
    res.render("./HTML/LandingPages/dogLandingPage.ejs", { notlogin, pricesData, productNamesData, imgsrcData, cartNames, cartPrices, cartSrc })
})

router.post("/product", async (req, res) => {
    console.log("request made");
    console.log(req.body);
    console.log("request session is:" + req.session.userMail);
    if (req.body.type === "add") {
        // const doc = await petSchema.findOne({ mailId: req.session.userMail })
        // console.log(doc);
        await users.updateOne({ mailId: req.session.userMail }, { $push: { userCart: { productType: "pets", productDetails: { title: req.body.title, price: req.body.price, src: req.body.imagSource, quantity: 0 } } } },)
    }
    else if (req.body.type === "remove") {
        console.log("remove request made");
        console.log(req.body);
        await users.updateOne({ mailId: req.session.userMail }, { $pop: { userCart: { productType: "pets", productDetails: { title: req.body.title, price: req.body.price, src: req.body.imagSource, quantity: 0 } } } },)
    }
})

module.exports = router;