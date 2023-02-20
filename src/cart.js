let label = document.getElementById('label');
let shoppingCart = document.getElementById('shopping-cart');

let basket = localStorage.getItem("data") ? JSON.parse(localStorage.getItem("data")) : [];

let calculation = () => {
    let cartIcon = document.getElementById('cartAmount');
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
}

calculation();

let generateCartItems = () => {
    if (basket.length !== 0) {
        return shoppingCart.innerHTML = basket.map((x) => {
            let { id, item } = x;
            let search = shopItemsData.find((x) => x.id == id) || [];
            let { img, name, price } = search;
            return `
            <div class="cart-item">
                <img  width="80px" src="${img}" alt=""/>
                <div class="details">
                    <div class="title-price-x">
                        <h4 class="title-price">
                            <p>${name}</p>
                            <p class="cart-item-price">$ ${price}</p>
                        </h4>
                        <i onclick="removeItem(${id})" class="bi bi-trash3"></i>
                    </div>

                    <div class="buttons">
                        <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                        <div id="${id}" class="quantity">${item}</div>
                        <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                    </div>

                    <h3>${item * price}</h3>
                </div>
            </div>
            `
        }).join('');
    } else {
        shoppingCart.innerHTML = ``;

        label.innerHTML = `
        <h2>Cart is Empty</h1>
        <a href="index.html">
            <button class="HomeBtn">Back to home</button>
        </a>
         
        `;
    }
}

generateCartItems();

let increment = (id) => {
    let search = basket.find((x) => x.id == id);

    if (search === undefined) {
        basket.push({
            id: id,
            item: 1
        });
    } else {
        search.item += 1;
    }
    update(id);
    generateCartItems();
    localStorage.setItem("data", JSON.stringify(basket));
}


let decrement = (id) => {
    let search = basket.find((x) => x.id == id);

    if (search === undefined || search.item === 0) {
        return;
    } else {
        search.item -= 1;
    }
    update(id);
    basket = basket.filter((x) => x.item !== 0);
    generateCartItems();
    localStorage.setItem("data", JSON.stringify(basket));
}

let update = (id) => {
    let search = basket.find((x) => x.id == id);
    document.getElementById(id).innerHTML = search.item;
    calculation();
    totalAmount();
}

let removeItem = (id) => {
    basket = basket.filter((x) => x.id !== id);
    localStorage.setItem("data", JSON.stringify(basket));
    generateCartItems();
    calculation();
    totalAmount();
}

let clearCart = () => {
    basket = basket = [];
    generateCartItems();
    calculation();
    localStorage.setItem("data", JSON.stringify(basket));
}

let totalAmount = () => {
    if (basket.length !== 0) {
        let amount = basket.map((x) => {
            let { id, item } = x;
            let search = shopItemsData.find((y) => y.id == id) || [];
            return search.price * item;
        }).reduce((x, y) => x + y, 0);

        label.innerHTML = `
            <h2>Total Bill: $ ${amount}</h2>
            <a href="checkout.html">
                <button class="checkout">Checkout</button>
            </a>
            <button onclick="clearCart()" class="removeAll">Clear Cart</button>
        `;
        return amount
    } else return
}

totalAmount();

