/* product slider below tablet and mobile screen widths*/
let slideIndex = 2;
let tabletWidth = window.matchMedia("(min-width:450px) and  (max-width: 600px)");
let mobileWidth = window.matchMedia("(max-width: 450px)")

// document.querySelector('#cart-btn').onclick = () => {
//     document.querySelector('.shopping-cart').classList.toggle('active');
//     if (document.querySelector('.shopping-cart').classList.contains('active') && temp == 0) {
//         temp = 1
//     }
// }

// if (document.querySelector('#cart-btn') != null) {
//     cartNames = document.querySelector('.cart-Names').innerText.split(',')
//     cartPrices = document.querySelector('.cart-Prices').innerText.split(',')
//     cartsrc = document.querySelector('.cart-src').innerText.split(',')

//     addToCartFromDb()
// }

let Productprice = document.querySelector(".prices-data").innerText.split(",")
let productName = document.querySelector(".names-data").innerText.split(",")
let imgSrc = document.querySelector(".src-data").innerText.split(",")
// setTimeout(() => {
let originalProductprice = [].concat(Productprice)
let originalproductName = [].concat(productName)
let originalimgSrc = [].concat(imgSrc)
document.querySelector(".prices-data").remove()
document.querySelector(".names-data").remove()
document.querySelector(".src-data").remove()
// alert("ad is:" + result);
let a = []
Productprice.forEach(p =>
    a.push(parseInt(p)))

Productprice = a

console.log(Productprice);
console.log(productName);
console.log(imgSrc);
sortList = []
function sortArrays(arrays, comparator = (a, b) => (a < b) ? -1 : (a > b) ? 1 : 0) {
    let arrayKeys = Object.keys(arrays);
    let sortableArray = Object.values(arrays)[0];
    let indexes = Object.keys(sortableArray);
    let sortedIndexes = indexes.sort((a, b) => comparator(sortableArray[a], sortableArray[b]));

    let sortByIndexes = (array, sortedIndexes) => sortedIndexes.map(sortedIndex => array[sortedIndex]);

    if (Array.isArray(arrays)) {
        return arrayKeys.map(arrayIndex => sortByIndexes(arrays[arrayIndex], sortedIndexes));
    } else {
        let sortedArrays = {};
        arrayKeys.forEach((arrayKey) => {
            sortedArrays[arrayKey] = sortByIndexes(arrays[arrayKey], sortedIndexes);
        });
        return sortedArrays;
    }
}


let fullScreenSlider = 0
let products = document.querySelector(".products")
console.log("function called here");
slides(fullScreenSlider * 4)


function searchItems() {
    let searchitem = document.querySelector('.search-item')
    if (!searchitem.classList.contains('active')) {
        searchitem.classList.add('active')
        fullScreenSlider = 0;
        let tempProductName = []
        let tempProductPrice = []
        let tempImgSrc = []
        let str = document.querySelector(".searchTerm").value
        console.log("hello" + str);
        for (i = 0; i < productName.length; i++) {
            if (productName[i].toLowerCase().includes(str.toLowerCase())) {
                tempProductName.push(productName[i])
                tempProductPrice.push(Productprice[i])
                tempImgSrc.push(imgSrc[i])
            }
        }
        productName = tempProductName
        Productprice = tempProductPrice
        imgSrc = tempImgSrc
        console.log();
        slides(fullScreenSlider)
    }
    else {
        searchitem.classList.remove('active')
        productName = originalproductName
        Productprice = originalProductprice
        imgSrc = originalimgSrc
        slides(fullScreenSlider)
    }
}

function expandFilter() {
    console.log("expand filter is called");
    let filterOptions = document.getElementById("filter-options")
    if (filterOptions.classList.contains("active")) {
        filterOptions.classList.remove("active")
    }
    else {
        filterOptions.classList.add("active")
    }
}
let SelectedFilters = document.querySelector(".search-bar .search")

function removeFromSearch(element) {
    filter(element.classList[0])
    element.remove()
    console.log(sortList);
}
function addFilterToSearchBar(type) {
    let filterOpt = document.querySelector(`.filter-option.${type}`)
    if (filterOpt.classList.contains('active')) {
        SelectedFilters.innerHTML += `<button class='${type} search-option' onclick='removeFromSearch(this)'>${type}</button>`
    } else {
        console.log("remove is called");
        document.querySelector(`.search-option.${type}`).remove()
    }
}
function sortListUpdate() {
    console.log("In sortlist update");
    console.log(sortList);
    sortList.forEach((ele) => {
        if (ele == "name") {
            let sorted = sortArrays([productName, Productprice, imgSrc])
            Productprice = sorted[1]
            productName = sorted[0]
            imgSrc = sorted[2]
            console.log(sorted[0]);
        }
        else if (ele == "price") {
            let sorted = sortArrays([Productprice, productName, imgSrc])
            Productprice = sorted[0]
            productName = sorted[1]
            imgSrc = sorted[2]
            console.log("sorting by prices");
            console.log(Productprice);
            console.log(typeof (Productprice[0]));
        }
    })

}
function filter(type) {
    console.log("filter of type," + type + " is called");
    let filterOpt = document.querySelector(`.filter-option.${type}`)
    console.log(filterOpt);
    fullScreenSlider = 0
    if (filterOpt.classList.contains("active")) {
        filterOpt.classList.remove("active")
        productName = originalproductName
        Productprice = originalProductprice
        imgSrc = originalimgSrc
        sortList = sortList.filter(function (item) {
            return item !== type
        })
        console.log("sortlist:" + sortList);
    }
    else {
        filterOpt.classList.add("active")
        original = []
        sortList.push(type)
    }
    addFilterToSearchBar(type)
    sortListUpdate()
    slides(fullScreenSlider)
}

function Append(name, imgSrc, price) {
    products.innerHTML += `
        <div class="product">
            <h3>${name}</h3>
            <div class="card">
            <div class="front">
                <img class="imgsrc" src="${imgSrc}" alt = "" />
            </div >
                <div class="des back" >
                    <p class="info">Male|Female</p>
                    <p class="info">8 Weeks Old</p>
                    <p class="info cost">Rs.${price} <span>Rs.${price * 1.25}</span></p>
                    <button class=" product-cart pet"><span>Shop Now</span></button>
                    <p class="name" style="display: none;">${name}</p>
                    <p class="price" style="display: none;">${price}</p>
                    <p class="src" style="display: none;">${imgSrc}</p>
                    <p class="type" style="display: none;">Pets</p>
                </div>
            </div >
        </div>
        `
    console.log("Successfully Appended");
    console.log(products);
}


function plusSlides(n) {
    if (mobileWidth.matches || tabletWidth.matches) {
        showSlides(slideIndex += n)
    }
    if ((fullScreenSlider != 0 || n > 0) && (fullScreenSlider + n) * 4 < productName.length) {
        console.log("Slides function is called");
        slides((fullScreenSlider += n) * 4)
    }
    console.log("slideIndex: " + fullScreenSlider + " n: " + n);
}

function slides(n) {
    console.log("Slides function called");
    let slides = document.getElementsByClassName("product")
    slideNumber = n
    for (i = 0; i < slides.length && productName.length > slideNumber; i++) {
        console.log("none");
        slides[i].style.display = "none";
    }
    // if (slideNumber == 0) {
    //     slideNumber++;
    // }
    if (productName[0] === "") {
        products.innerHTML += "<h1 style='color:red'>No products are currently Available Please try again after some time</h1>"
    }
    else {
        // products.innerHTML = ""
    }
    for (i = 0; i < 4; i++) {
        if (productName.length <= slideNumber + i || productName[0] === "") {
            break;
        }
        console.log("slideIndex" + slideNumber, "i:" + i);
        // slides[slideNumber + i].style.display = "block";
        console.log(imgSrc[slideNumber + i]);
        Append(productName[slideNumber + i], imgSrc[slideNumber + i], Productprice[slideNumber + i])
        // slides[slideNumber + i - 1].style.display = "block";
    }
    call()
    // let addToCartButtons = document.getElementsByClassName('pet')
    // let cartItemNames = document.getElementsByClassName('product-name')
    // for (let i = 0; i < addToCartButtons.length; i++) {
    //     let button = addToCartButtons[i]
    //     button.addEventListener('click', function (event) {
    //         let x = button.parentElement
    //         let y = x.getElementsByClassName('cost')[0]
    //         let price = parseFloat(y.innerHTML.match(/^\d+|\d+\b|\d+(?=\w)/g)[0]);
    //         let title = (x.parentElement.parentElement.querySelector("h3").innerHTML)
    //         let imagSource = x.parentElement.parentElement.querySelector('.front').querySelector("img").src
    //         let productDetails = {
    //             type: "add",
    //             title: title,
    //             price: parseFloat(price),
    //             imagSource: imagSource
    //         }
    //         let key = 0
    //         // alert(cartItemNames.length)
    //         for (let i = 0; i < cartItemNames.length; i++) {
    //             // console.log(cartItemNames[i].innerText + " " + title);
    //             if (cartItemNames[i].innerText.toUpperCase().trim() === title.toUpperCase().trim()) {
    //                 alert('This item is already added to cart')
    //                 key = 1
    //                 break
    //             }
    //         }
    //         if (key == 0) {
    //             alert("making database request")
    //             fetch("/dogs/product",
    //                 {
    //                     method: "POST",
    //                     headers: {
    //                         'Accept': 'application/json, text/plain, */*',
    //                         'Content-Type': 'application/json'
    //                     },
    //                     body: JSON.stringify(productDetails)
    //                 })
    //                 .then(function (response) {
    //                     return response.json();
    //                 })
    //                 .then(function (result) {
    //                     alert(result);
    //                 })
    //             addToCartItems(title, price, imagSource)
    //         }
    //     })
    // }
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("product");
    if (n > slides.length) {
        slideIndex = slides.length;
    }

    if (n <= 1) {
        if (tabletWidth.matches) {
            slideIndex = 2;
        }
        else if (mobileWidth.matches) {
            slideIndex = 1;
        }
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    if (tabletWidth.matches) {
        console.log("tablet screen matched  and slideIndex is:" + slideIndex);
        slides[slideIndex - 1].style.display = "block";
        slides[slideIndex - 2].style.display = "block";
    }
    else if (mobileWidth.matches) {
        console.log("mobile screen matched and slideIndex is:" + slideIndex);
        slides[slideIndex - 1].style.display = "block";
    }
}

(function () {
    window.onresize = displayWindowSize;
    function displayWindowSize() {
        if (tabletWidth.matches || mobileWidth.matches) {
            console.log("Tablet size Matches");
            slideIndex = 2
            showSlides(slideIndex)
            document.getElementsByClassName("explore")[1].style.display = "none"
            // document.getElementById("exploreMore").style.display = "none"
        }
        else if (mobileWidth.matches) {
            console.log("Mobile size Matches");
            slideIndex = 1;
            showSlides(slideIndex)
        }
        else {
            // document.getElementsByClassName("explore")[1].style.display = "block"
            console.log("explore more button is turned on");
        }
        let myWidth = window.innerWidth;
        let myHeight = window.innerHeight;
        if (myWidth > 600) {
            let slides = document.getElementsByClassName("product")
            for (i = 0; i < slides.length; i++) {
                slides[i].style.display = "block"
            }
            console.log("Width size" + slides.length);
            //For the find out more button(It is displayed with only the product slider i.e with width more than 600px)
            slides[slides.length - 1].style.display = "none"
        }
    };
})();



// function addToCartFromDb() {
//     console.log("Adding data from db");
//     let i = 0;
//     cartNames.forEach(element => {
//         if (element !== " ") {
//             addToCartItems(element, cartPrices[i], cartsrc[i])
//             i++
//         }
//     });
// }




// let addToCartButtons = document.getElementsByClassName('pet')
// let cartItemNames = document.getElementsByClassName('pet-name')
// for (let i = 0; i < addToCartButtons.length; i++) {
//     let button = addToCartButtons[i]
//     button.addEventListener('click', function (event) {
//         alert("button clicked");
//         let x = button.parentElement
//         let y = x.getElementsByClassName('cost')[0]
//         let price = parseFloat(y.innerHTML.match(/^\d+|\d+\b|\d+(?=\w)/g)[0]);
//         let title = (x.parentElement.parentElement.querySelector("h3").innerHTML)
//         let imagSource = x.parentElement.parentElement.querySelector('.front').querySelector("img").src
//         let productDetails = {
//             type: "add",
//             title: title,
//             price: parseFloat(price),
//             imagSource: imagSource
//         }
//         let key = 0
//         for (let i = 0; i < cartItemNames.length; i++) {
//             if (cartItemNames[i].innerText === title) {
//                 alert('This item is already added to cart')
//                 key = 1
//             }
//         }
//         if (key == 0) {
//             //         fetch("/products/product",
//             //             {
//             //                 method: "POST",
//             //                 headers: {
//             //                     'Accept': 'application/json, text/plain, */*',
//             //                     'Content-Type': 'application/json'
//             //                 },
//             //                 body: JSON.stringify(productDetails)
//             //             })
//             //             .then(function (response) {
//             //                 return response.json();
//             //             })
//             //             .then(function (result) {
//             //                 alert(result);
//             //             })
//             addToCartItems(title, price, imagSource)
//         }



//     })
// }

// function addToCartItems(title, price, imagSource) {
//     let cartRow = document.createElement('div')
//     cartRow.classList.add('box')
//     let cartItems = document.getElementsByClassName('shopping-cart')[0]
//     let cartRowContents = `
//       <img src="${imagSource}" style="width: 200px;">
//         <div class="content">
//             <h3 class="pet-name">${title}</h3>
//             <span class="price">Rs.${price}</span>
//             <input type="hidden" id="custId" name="custId" value="${price} ${title} ${imagSource}">
//             <span class="remove" price="${price}" title="${title}" imagSource = "${imagSource}"><i class="fa-solid fa-xmark"></i></span>
//         </div>
// `
//     cartRow.innerHTML = cartRowContents
//     cartItems.append(cartRow)
//     let x = cartRow.getElementsByClassName('remove')
//     for (let i = 0; i < x.length; i++) {
//         let y = x[i]
//         y.addEventListener('click', function (event) {
//             let buttonClicked = event.target
//             console.log(y);
//             let productDetails = {
//                 type: "remove",
//                 title: y.getAttribute('title').trim(),
//                 price: parseFloat(y.getAttribute('price')),
//                 imagSource: y.getAttribute('imagSource')
//             }
//             buttonClicked.parentElement.parentElement.parentElement.remove()
//             console.log("price is:" + productDetails.price);
//             xhr.onreadystatechange = () => {
//                 if (xhr.readyState === 4) {
//                     alert(xhr.response);
//                 }
//             }

//             xhr.open("POST", '/products/product', true)
//             xhr.setRequestHeader('Content-type', 'application/json')
//             xhr.send(JSON.stringify(productDetails))
//             // updateCartTotal()
//         })
//     }
//     let y = cartItems.getElementsByClassName('qty')
//     for (let i = 0; i < y.length; i++) {
//         let input = y[i]
//         input.addEventListener('change', function (event) {
//             // updateCartTotal()
//         })
//     }
//     // updateCartTotal()
// }
