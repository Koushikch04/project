const bar = document.getElementById('bar');
const nav = document.getElementById('navbar');
const clo = document.getElementById('close');
// const xhr = new XMLHttpRequest()
let Names = document.querySelector('.Names-data').innerText.split(',')
let prices = document.querySelector('.prices-data').innerText.split(',')
let src = document.querySelector('.src-data').innerText.split(',')

// alert(Names)
// alert(prices)
// alert(src)

let a = []
prices.forEach(p =>
    a.push(parseFloat(p)))

prices = a


if (bar) {
    bar.addEventListener("click", () => {
        nav.classList.add('active');
    })
}
if (clo) {
    clo.addEventListener('click', () => {
        nav.classList.add('change');
    })
}

// addToCartFromDb()
let qunatityInputs = document.getElementsByClassName('qty');
for (let i = 0; i < qunatityInputs.length; i++) {
    let input = qunatityInputs[i]
    input.addEventListener('change', function (event) {
        updateCartTotal()
    })
}

function updateCartTotal() {
    let cartItemContainer = document.getElementsByClassName('shopping-cart')[0]
    // console.log(cartItemContainer)
    let x = cartItemContainer.getElementsByClassName('box')
    // console.log(x[0])
    let total = 0;
    for (let i = 0; i < x.length; i++) {
        let cartRows = x[i].getElementsByClassName('content');
        let priceElement = cartRows[0].getElementsByClassName('price')
        // console.log(priceElement[0])
        let quantityElement = cartRows[0].getElementsByClassName('qty')
        let price = parseFloat(priceElement[0].innerText.replace('Rs.', ''))
        // console.log(price);
        let quantity = quantityElement[0].value
        total = total + price * quantity
    }
    let y = cartItemContainer.getElementsByClassName('total')
    let z = y[0].innerText = 'Total :' + total
}


// function addToCartFromDb() {
//     console.log("Adding data from db");
//     let i = 0;
//     Names.forEach(element => {
//         if (element !== " ") {
//             addToCartItems(element, prices[i], src[i])
//             i++
//         }
//     });
// }

// function addToCartItems(title, price, imagSource) {
//     let cartRow = document.createElement('div')
//     cartRow.classList.add('box')
//     let cartItems = document.getElementsByClassName('shopping-cart')[0]
//     let cartItemNames = document.getElementsByClassName('name')
//     let cartRowContents = `
//       <img src="${imagSource}" style="width: 200px;">
//         <div class="content">
//             <h3 class="name">${title}</h3>
//             <span class="price">Rs.${price}</span>
//             <span class="quantity">qty : <input type="number" min="1" class="qty" name="qty" value="1"></span>
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
//             console.log("button clicked");
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
//             updateCartTotal()
//         })
//     }
//     let y = cartItems.getElementsByClassName('qty')
//     for (let i = 0; i < y.length; i++) {
//         let input = y[i]
//         input.addEventListener('change', function (event) {
//             updateCartTotal()
//         })
//     }
//     updateCartTotal()
// }

let acc = document.querySelector('.data')
// console.log(acc)

let data = {
    products: [
        JSON.parse(document.querySelector('.data').innerHTML)
    ]
}

let card = document.getElementsByClassName('pro-container');
let xyz = card[0];

console.log(xyz)
// console.log(data.products[0][2].petType);

for (let i = 0; i < 20; i++) {
    xyz.innerHTML += `<div class="pro ${data.products[0][i].petType}">
                <img class="imgsrc" src="${data.products[0][i].productDetails.src}" alt="">
                <div class="des">
                    <span>adidas</span>
                    <h5 class="title">${data.products[0][i].productDetails.Name}</h5>
                    <div class="star">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                    </div>
                    <h4 class="rate"><i class="fa-solid fa-indian-rupee-sign"></i>${data.products[0][i].productDetails.price}</h4>
                </div>
                <p class="name" style="display: none;">${data.products[0][i].productDetails.Name}</p>
                <p class="price" style="display: none;">${data.products[0][i].productDetails.price}</p>
                <p class="src" style="display: none;">${data.products[0][i].productDetails.src}</p>
                <p class="type" style="display: none;">Accessory</p>
                <button class="product-cart"><i class="fa-solid fa-cart-shopping" id="shop"></i></button>
            </div>`;
}

let dog = document.getElementsByClassName('dogs');
let cat = document.getElementsByClassName('cats');
let bird = document.getElementsByClassName('birds');
let fish = document.getElementsByClassName('fishes');
// console.log(cat[0].);
function refresh() {

    // filterProduct('all');

    let elements = document.querySelectorAll(".pro");
    elements.forEach((ele) => {
        ele.classList.remove('inactive');
    })




    const ex = document.getElementsByClassName('button-value');


    for (let i = 0; i < ex.length; i++) {
        let check = ex[i];
        check.addEventListener('click', () => {
            switch (check.innerHTML) {
                case "All":
                    for (let i = 0; i < 5; i++) {
                        let c1 = cat[i];
                        let c2 = bird[i];
                        let c3 = fish[i];
                        let c4 = dog[i];


                        c1.classList.remove('inactive');
                        c2.classList.remove('inactive');
                        c3.classList.remove('inactive');
                        c4.classList.remove('inactive')

                    }
                    check.classList.add("active");
                    break;
                case "Dog":
                    for (let i = 0; i < 5; i++) {
                        let c1 = cat[i];
                        let c2 = bird[i];
                        let c3 = fish[i];
                        console.log(c1)
                        c1.classList.add('inactive');
                        c2.classList.add('inactive');
                        c3.classList.add('inactive');

                    }
                    check.classList.add("active");
                    break;
                case "Cat":
                    for (let i = 0; i < 5; i++) {
                        let c1 = dog[i];
                        let c2 = bird[i];
                        let c3 = fish[i];

                        c1.classList.add('inactive');
                        c2.classList.add('inactive');
                        c3.classList.add('inactive');

                    }
                    check.classList.add("active");
                    break;
                case "Bird":
                    for (let i = 0; i < 5; i++) {
                        let c1 = dog[i];
                        let c2 = cat[i];
                        let c3 = fish[i];

                        c1.classList.add('inactive');
                        c2.classList.add('inactive');
                        c3.classList.add('inactive');

                    }
                    check.classList.add("active");
                    break;
                case "Fish":
                    for (let i = 0; i < 5; i++) {
                        let c1 = dog[i];
                        let c2 = bird[i];
                        let c3 = cat[i];

                        c1.classList.add('inactive');
                        c2.classList.add('inactive');
                        c3.classList.add('inactive');

                    }
                    check.classList.add("active");
                    break;
            }
        })
        check.classList.remove('active');

    }
}

function convertFirstToUpper(value) {
    let v = value[0].toUpperCase();
    value = v + value.substr(1);
    console.log(value);
    return value;
}

// search
document.getElementById("search").addEventListener("click", () => {
    let searchInput = document.getElementById("search-input").value;
    let elements = document.querySelectorAll(".title");
    let cards = document.querySelectorAll(".pro");
    elements.forEach((element, index) => {
        if (element.innerHTML.includes(searchInput)) {
            cards[index].classList.remove("inactive");
        } else {
            cards[index].classList.add("inactive");
        }
    });
});

