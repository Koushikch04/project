const express = require("express");
const users = require("../../models/userSchema")
const productSchema = require("../../models/productSchema");
const reviewSchema = require("../../models/review");
// const { nextTick } = require("process");

const router = express.Router();

const foodDetails = [
    { productType: "food", petType: "dogs", productDetails: { Name: "Pedigree for adult dog", price: "449", src: "../../img/foodservicesLandingPage/dogFood1.jpg" } },
    { productType: "food", petType: "fishes", productDetails: { Name: "Omega One pellets for fish", price: "349", src: "../../img/foodservicesLandingPage/fishFood1.jpg" } },
    { productType: "food", petType: "cats", productDetails: { Name: "Whiskas food for cats", price: "649", src: "../../img/foodservicesLandingPage/catFood1.jpg" } },
    { productType: "food", petType: "birds", productDetails: { Name: "IuPreem food for parrots", price: "349", src: "./../img/foodservicesLandingPage/birdFood1.jpg" } },
    { productType: "food", petType: "dogs", productDetails: { Name: "Barking Dogs food for dogs", price: "349", src: "../../img/foodservicesLandingPage/dogFood2.jpg" } },
    { productType: "food", petType: "fishes", productDetails: { Name: "Tetra Min flakes for fish", price: "349", src: "../../img/foodservicesLandingPage/fishFood2.jpg" } },
    { productType: "food", petType: "cats", productDetails: { Name: "IAMS food for cats", price: "349", src: "../../img/foodservicesLandingPage/catFood2.jpg" } },
    { productType: "food", petType: "birds", productDetails: { Name: "Wagner's food for birds", price: "349", src: "../../img/foodservicesLandingPage/birdFood2.jpg" } },
    { productType: "food", petType: "dogs", productDetails: { Name: "Crunch Bites for dogs", price: "349", src: "../../img/foodservicesLandingPage/dogFood3.jpg" } },
    { productType: "food", petType: "fishes", productDetails: { Name: "Discus food mix for fish", price: "449", src: "../../img/foodservicesLandingPage/fishFood3.jpg" } },
    { productType: "food", petType: "cats", productDetails: { Name: "Perfect Bistro for cats", price: "349", src: "../../img/foodservicesLandingPage/catFood3.jpg" } },
    { productType: "food", petType: "birds", productDetails: { Name: "Wild Harvest for parrots", price: "349", src: "../../img/foodservicesLandingPage/birdFood3.jpg" } },
    { productType: "food", petType: "dogs", productDetails: { Name: "IAMS food for dogs", price: "349", src: "../../img/foodservicesLandingPage/dogFood4.jpg" } },
    { productType: "food", petType: "fishes", productDetails: { Name: "Discovery food for fish", price: "349", src: "../../img/foodservicesLandingPage/fishFood4.jpg" } },
    { productType: "food", petType: "cats", productDetails: { Name: "Kit Cat food for cat", price: "649", src: "../../img/foodservicesLandingPage/catFood4.jpg" } },
    { productType: "food", petType: "birds", productDetails: { Name: "Meal Worms for birds", price: "549", src: "../../img/foodservicesLandingPage/birdFood4.jpg" } },
    { productType: "food", petType: "dogs", productDetails: { Name: "Wild Earth food for dogs", price: "449", src: "../../img/foodservicesLandingPage/dogFood5.jpg" } },
    { productType: "food", petType: "cats", productDetails: { Name: "Top Cat food for cats", price: "399", src: "../../img/foodservicesLandingPage/catFood5.jpg" } },
    { productType: "food", petType: "fishes", productDetails: { Name: "Dried worms for fishes", price: "549", src: "../../img/foodservicesLandingPage/fishFood6.jpg" } },
    { productType: "food", petType: "birds", productDetails: { Name: "Peckish food for birds", price: "599", src: "../../img/foodservicesLandingPage/birdFood6.jpg" } },
]

// productSchema.insertMany(foodDetails);

const reviewDetails = [
    { Name: "Trisha", review: "I was a little worried to try this website since they have started very recently. But it turned out to be good and cost effective.. My dog, 55kg Rottweiler, ate less when I introduced this food to him, but eventually got used to it.I will recommend this product." },
    { Name: "Harry", review: "My doggo just loves it. She has always been a pedigree lover. This chicken n vegetable flavor has made her even skip the home food.It does have fillers but lesser than the other brands. She prefers having pedigree.I will recommend this product." },
    { Name: "Karthik", review: "I've fed my Labrador puppy on this from the age of 3 months up to now 10 months and he loves it and is now almost fully grown. Despite what it says on the packet I've been advised by my vet that I should now consider changing to an adult version." },
    { Name: "Xian-wu", review: "My cat is quiet selective when it comes to food. Sheeba premium wet foods are exception and turns out that this is his favourite among the wet meals that we have tried so far.This wet cat food is very good for my cat's complete and balanced diet." },
    { Name: "Zendaya", review: "The pellet size is mini and floats on water and ideal for small fish. My platy and swordtail love it and eat with gusto, no leftovers ever. It doesn't cloud the water. After using it for 2 months, I think this is a good brand of fish food." },
    { Name: "Maguire", review: "The Whisker's chicken loaf meal also contains essential vitamins and minerals, so this premium palate for your cat delivers a mouth-watering feast, without compromising on the goodness. It gives my cat the satisfying taste of premium cat food." },
]

// reviewSchema.insertMany(reviewDetails);

router.post("/product", async (req, res) => {
    console.log("request made");
    console.log(req.body);
    if (req.body.type === "add") {
        await users.updateOne({ mailId: req.session.userMail }, { $push: { userCart: { productType: "Food", productDetails: { title: req.body.title, price: req.body.price, src: req.body.imagSource, quantity: 0 } } } },)
    }
    else if (req.body.type === "remove") {
        console.log(req.body);
        await users.updateOne({ mailId: req.session.userMail }, { $pop: { userCart: { productType: "Food", productDetails: { title: req.body.title, price: req.body.price, src: req.body.imagSource, quantity: 0 } } } },)
    }
    res.send([1, 2, 3])
})


const regex = /^[a-zA-Z\s]*$/;

router.get("/", async (req, res) => {
    let notlogin = true;
    if (req.session.userName) {
        notlogin = false
    }
    let cartNames = []
    let cartSrc = []
    let cartPrices = []
    let cartType = []
    const cartItems = await users.findOne({ mailId: req.session.userMail }, { userCart: 1 })
    let pets = await productSchema.find({ "productType": "food" }, { productType: 0, "productDetails._id": 0, _id: 0, __v: 0 })
    sort = { 'timestamp': 1 }
    let rev = await reviewSchema.find({}).sort({ createdAt: "descending" }).limit(6);
    pets = JSON.stringify(pets)
    rev = JSON.stringify(rev)
    if (!notlogin) {
        cartItems.userCart.forEach(element => {
            console.log(element.productDetails);
            cartNames.push(element.productDetails.title)
            cartPrices.push(element.productDetails.price)
            cartSrc.push(element.productDetails.src)
            cartType.push(element.productType)
        })
    }
    console.log(cartNames);
    res.render("./HTML/LandingPages/petfoodLandingPage.ejs", { notlogin, pets, rev, cartNames, cartPrices, cartSrc, cartType })
})

router.post("/reviewform", async (req, res) => {
    let name = req.session.userName;
    let rev = req.body.revtext;
    // console.log(req.body);
    try {
        if (regex.test(name)) {
            await reviewSchema.create({ Name: name, review: rev });
        }
    }
    catch (e) {
        console.log(e.message);
    }

    let notlogin = true;
    if (req.session.userName) {
        notlogin = false
    }
    let pets = await productSchema.find({ "productType": "food" }, { productType: 0, "productDetails._id": 0, _id: 0, __v: 0 })
    rev = await reviewSchema.find({}).sort({ createdAt: "descending" }).limit(6);
    pets = JSON.stringify(pets)
    rev = JSON.stringify(rev)
    res.render("./HTML/LandingPages/petfoodLandingPage.ejs", { notlogin, pets, rev })
})




module.exports = router;