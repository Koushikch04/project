const express = require("express");
const productSchema = require("../../models/productSchema")
const users = require("../../models/userSchema")
const router = express.Router();


// // router.use(bdparser.json());
// router.use(bdparser.urlencoded({ extended: true }));
// router.use(express.urlencoded({ extended: true }))
router.get("/", async (req, res) => {
    let notlogin = true;
    if (req.session.userName) {
        notlogin = false
    }
    let admin = false
    if (req.session.admin) {
        admin = true
    }
    // add to cart start

    const cartItems = await users.findOne({ mailId: req.session.userMail }, { userCart: 1 })
    let cartNames = []
    let cartSrc = []
    let cartPrices = []
    let cartType = []

    if (!notlogin) {
        cartItems.userCart.forEach(element => {
            console.log(element.productDetails);
            cartNames.push(element.productDetails.title)
            cartPrices.push(element.productDetails.price)
            cartSrc.push(element.productDetails.src)
            cartType.push(element.productType)
        })
    }
    // cart end
    // accessories
    let accessories = await productSchema.find({ "productType": "accessories" }, { productType: 0, "productDetails._id": 0, _id: 0, __v: 0 })
    // console.log(accessories)
    console.log(cartNames);
    accessories = JSON.stringify(accessories)
    res.render("./HTML/LandingPages/productLandingPage.ejs", { notlogin, admin, cartNames, cartPrices, cartSrc, cartType, accessories })
})

const productDetails = [
    { productType: "accessories", petType: "dogs", productDetails: { Name: "Bow Tie", price: "1999.00", src: "../../img/productLandingPage/ac1.avif" } },
    { productType: "accessories", petType: "dogs", productDetails: { Name: "Dog non-slip Socks", price: "199.00", src: "../../img/productLandingPage/ac17.jpg" } },
    { productType: "accessories", petType: "cats", productDetails: { Name: "Cat scratching Ball Toy", price: "1999.00", src: "../../img/productLandingPage/ac19.jpg" } },
    { productType: "accessories", petType: "dogs", productDetails: { Name: "Pawstop Dog Belt", price: "1499.00", src: "../../img/productLandingPage/ac2.jpg" } },
    { productType: "accessories", petType: "cats", productDetails: { Name: "Buraq Cat Harness Full Body with Leash Set - for Walking", price: "199.00", src: "../../img/productLandingPage/ac3.jpg" } },
    { productType: "accessories", petType: "cats", productDetails: { Name: "Jingle Bell for Cat Collar", price: "500", src: "../../img/productLandingPage/ac4.jpg" } },
    { productType: "accessories", petType: "birds", productDetails: { Name: "Bath Box Bird Cage", price: "250", src: "../../img/productLandingPage/ac5.jpg" } },
    { productType: "accessories", petType: "birds", productDetails: { Name: "Bird Parrot Feeder Cage Fruit Vegetable Holder", price: "150", src: "../../img/productLandingPage/ac6.jpg" } },
    { productType: "accessories", petType: "fishes", productDetails: { Name: "Aquarium", price: "1050", src: "../../img/productLandingPage/ac7.jpg" } },
    { productType: "accessories", petType: "fishes", productDetails: { Name: "mall Fish Hideout Betta Cave Aquarium Decorations", price: "300", src: "../../img/productLandingPage/ac8.jpg" } },
    { productType: "accessories", petType: "dogs", productDetails: { Name: "Glitter Gold Bone Dog Name ID Tag", price: "1999", src: "../../img/productLandingPage/ac9.jpg" } },
    { productType: "accessories", petType: "dogs", productDetails: { Name: "Personalized Dog Bone Pet Charm", price: "425", src: "../../img/productLandingPage/ac18.jpg" } },
    { productType: "accessories", petType: "fishes", productDetails: { Name: "Hunar Quick Fish Catching Nets with Long Handle Aquarium Accessories for Fish Tank Water Tank(Set of 2)", price: "350", src: "../../img/productLandingPage/ac20.jpg" } },
    { productType: "accessories", petType: "birds", productDetails: { Name: "NATLIS Bird Cage, House for Parrot, Rabbit and Small Pets", price: "900", src: "../../img/productLandingPage/ac10.jpg" } },
    { productType: "accessories", petType: "cats", productDetails: { Name: "Soft Plush Donut Cuddler Cushion", price: "2149", src: "../../img/productLandingPage/ac11.jpg" } },
    { productType: "accessories", petType: "cats", productDetails: { Name: "Cute and Funny Pet Sunglasses", price: "1499", src: "../../img/productLandingPage/ac12.avif" } },
    { productType: "accessories", petType: "birds", productDetails: { Name: "Bird Perch Bird Stand Platform Toy", price: "2623", src: "../../img/productLandingPage/ac13.jpg" } },
    { productType: "accessories", petType: "birds", productDetails: { Name: "Hanging Ring Plastic Swing Toy (Pack of 3)", price: "169", src: "../../img/productLandingPage/ac14.jpg" } },
    { productType: "accessories", petType: "fishes", productDetails: { Name: "Colourful - High Glass Submersible Automatic On/Off", price: "1299", src: "../../img/productLandingPage/ac15.jpg" } },
    { productType: "accessories", petType: "fishes", productDetails: { Name: "Decorative Ornaments for Fish Tank Decoration", price: "659", src: "../../img/productLandingPage/ac16.jpg" } },
]

productSchema.insertMany(productDetails)
// productSchema.deleteMany({productType: "accessories"})

router.post("/product", async (req, res) => {
    console.log("request made");
    console.log(req.body);
    if (req.session.userName) {
        if (req.body.type === "add") {
            await users.updateOne({ mailId: req.session.userMail }, { $push: { userCart: { productType: "accessories", productDetails: { title: req.body.title, price: req.body.price, src: req.body.imagSource, quantity: 0 } } } },)
        }
        else if (req.body.type === "remove") {
            console.log(req.body);
            await users.updateOne({ mailId: req.session.userMail }, { $pop: { userCart: { productType: "accessories", productDetails: { title: req.body.title, price: req.body.price, src: req.body.imagSource, quantity: 0 } } } },)
        }
    }
    res.send([1, 2, 3])
})

module.exports = router;