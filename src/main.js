let shop = document.getElementById('shop');

let basket = localStorage.getItem("data") ? JSON.parse(localStorage.getItem("data")) : [];




let calculation = () => {
    let cartIcon = document.getElementById('cartAmount');
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
}

calculation();