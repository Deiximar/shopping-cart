let infoCart = document.getElementById("info-cart");
let total = document.getElementById('checkout-total');

let basket = localStorage.getItem("data") ? JSON.parse(localStorage.getItem("data")) : [];

let calculation = () => {
    let cartIcon = document.getElementById('cartAmount');
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
}

let generateCartItems = () => {
    if (basket.length !== 0) {
        return infoCart.innerHTML = basket.map((x) => {
            let { id, item } = x;
            let search = shopItemsData.find((x) => x.id == id) || [];
            let { img, name, price } = search;
            return `
            <div class="cart-item">
                <img  width="40px" src="${img}" alt=""/>
                <div class="details">
                    <div class="title-price-x">
                        <h4 class="title-price">${name} (${item})</h4>
                        <p class="cart-item-price">$ ${item * price}</p>
                    </div>
                </div>
            </div>
            `
        }).join('');
    }
};

let totalAmount = () => {
    if (basket.length !== 0) {
        let amount = basket.map((x) => {
            let { id, item } = x;
            let search = shopItemsData.find((y) => y.id == id) || [];
            return search.price * item;
        }).reduce((x, y) => x + y, 0);

        total.innerHTML = `
            <h2>Total Bill: $ ${amount}</h2>
        `;
        return amount
    } else return
}

totalAmount();


generateCartItems();
calculation();