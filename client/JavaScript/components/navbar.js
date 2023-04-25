const hamburger = document.querySelector(".components-navbar-header .components-navbar-close-open .components-navbar-open");
const close = document.querySelector(".components-navbar-header .components-navbar-close-open .components-navbar-close");
const navMenu = document.querySelector(".components-navbar-header nav")
const xhr = new XMLHttpRequest()

hamburger.addEventListener("click", (e) => {
    console.log("Hi");
    navMenu.style.display = "flex";
    hamburger.style.display = "none";
    close.style.display = "block";
})

close.addEventListener("click", (e) => {
    navMenu.style.display = "none";
    hamburger.style.display = "block";
    close.style.display = "none";
})

let cartNames
let cartPrices
let cartsrc
if (document.querySelector('#cart-btn') != null) {
    document.querySelector('#cart-btn').addEventListener('click', () => {
        document.querySelector('.shopping-cart').classList.toggle('active');
    })
}

if (document.querySelector('#cart-btn') != null) {
    cartNames = document.querySelector('.cart-Names').innerText.split(',')
    cartPrices = document.querySelector('.cart-Prices').innerText.split(',')
    cartsrc = document.querySelector('.cart-src').innerText.split(',')
    cartType = document.querySelector('.cart-Type').innerText.split(',')
    console.log(cartType);
    addToCartFromDb()
}

function updateCartTotal() {
    let cartItemContainer = document.getElementsByClassName('shopping-cart')[0]
    let x = cartItemContainer.getElementsByClassName('box')
    let total = 0;
    for (let i = 0; i < x.length; i++) {
        let cartRows = x[i].getElementsByClassName('content');
        let priceElement = cartRows[0].getElementsByClassName('price')
        let quantityElement = cartRows[0].getElementsByClassName('qty')
        let price = parseFloat(priceElement[0].innerText.replace('Rs.', ''))
        console.log(price);
        let quantity = quantityElement[0].value
        total = total + price * quantity
    }
    let y = cartItemContainer.getElementsByClassName('total')
    let z = y[0].innerText = 'Total :' + total
}


function addToCartFromDb() {
    console.log("Adding data from db");
    let i = 0;
    cartNames.forEach(element => {
        if (element !== " ") {
            console.log(element);
            addToCartItems(element, cartPrices[i], cartsrc[i], cartType[i])
            i++
        }
    });
}


function addToCartItems(title, price, imagSource, item) {
    // alert(type)
    let cartRow = document.createElement('div')
    cartRow.classList.add('box')
    let cartItems = document.getElementsByClassName('shopping-cart')[0]
    let cartRowContents = `
      <img src="${imagSource}" style="width: 200px;">
        <div class="content">
            <h3 class="product-name">${title}</h3>
            <span class="price">Rs.${price}</span>
            <span class="quantity">qty : <input type="number" min="1" class="qty" value="1"></span>
            <input type="hidden" id="custId" name="custId" value="${price} ${title} ${imagSource}">
            <span class="remove" price="${price}" title="${title}" imagSource = "${imagSource}" type="${item}"><i class="fa-solid fa-xmark"></i></span>
        </div>
`
    console.log("Items Appened");
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    let x = cartRow.getElementsByClassName('remove')
    for (let i = 0; i < x.length; i++) {
        let y = x[i]
        y.addEventListener('click', function (event) {
            console.log("Button clicked");
            let buttonClicked = event.target
            let productDetails = {
                type: "remove",
                title: y.getAttribute('title').trim(),
                price: parseFloat(y.getAttribute('price')),
                imagSource: y.getAttribute('imagSource'),
            }
            buttonClicked.parentElement.parentElement.parentElement.remove()
            // buttonClicked.parentElement.parentElement.remove()
            // console.log(buttonClicked.parentElement.parentElement);
            let url
            item = item.trim()
            if (item.trim() === "pets") {
                url = "/dogs/product"
            }
            else if (item == "accessories") {
                url = "/products/product"
            }
            else if (item == "Food") {
                url = "/petsfoods/product"
            }
            alert(url)

            xhr.open("POST", url, true)
            xhr.setRequestHeader('Content-type', 'application/json')
            xhr.send(JSON.stringify(productDetails))
            console.log("Hello");

            updateCartTotal()
        })
    }
    let y = cartItems.getElementsByClassName('qty')
    for (let i = 0; i < y.length; i++) {
        let input = y[i]
        input.addEventListener('change', function (event) {
            updateCartTotal()
        })
    }
    updateCartTotal()
}
// 
function call() {
    let addToCartButtons = document.getElementsByClassName('product-cart')
    let cartItemNames = document.getElementsByClassName('product-name')
    for (let i = 0; i < addToCartButtons.length; i++) {
        let button = addToCartButtons[i]
        button.addEventListener('click', function (event) {
            let x = button.parentElement
            let title = x.querySelector('.name').innerHTML
            let imagSource = x.querySelector('.src').innerHTML
            let price = parseFloat(x.querySelector('.price').innerHTML)
            // alert(imagSource)
            let type = x.querySelector('.type').innerHTML
            let url
            if (type == "Pets") {
                url = "/dogs/product"
            }
            else if (type == "Accessory") {
                console.log("Type Accessory");
                url = "/products/product"
            }
            else if (type == "Food") {
                url = "/petsfoods/product"
            }

            let productDetails = {
                type: "add",
                title: title,
                price: parseFloat(price),
                imagSource: imagSource
            }
            let key = 0
            for (let i = 0; i < cartItemNames.length; i++) {
                console.log(cartItemNames[i].innerText + " " + title);
                if (cartItemNames[i].innerText.toUpperCase().trim() === title.toUpperCase().trim()) {
                    alert('This item is already added to cart')
                    key = 1
                    break
                }
            }
            if (key == 0) {

                fetch(url,
                    {
                        method: "POST",
                        headers: {
                            'Accept': 'application/json, text/plain, */*',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(productDetails)
                    })
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (result) {
                        // alert(result);
                    })
                alert(type)
                addToCartItems(title, price, imagSource, type)
            }
        })
    }
}

call()