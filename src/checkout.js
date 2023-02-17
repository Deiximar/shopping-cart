let infoCart = document.getElementById("info-cart");
let basket =   localStorage.getItem("data") ? JSON.parse(localStorage.getItem("data")) : [];

let generateCartItems = () => {
    if (basket.length !== 0) {
        return infoCart.innerHTML = basket.map((x) => {
            let {id, item} = x;
            let search = shopItemsData.find((x) => x.id == id) || [];
            let {img, name, price } = search;
            return `
            <div class="cart-item">
                <img  width="80px" src="${img}" alt=""/>
                <div class="details">
                    <div class="title-price-x">
                        <h4 class="title-price">
                            <p>${name}</p>
                            <p class="cart-item-price">$ ${price}</p>
                        </h4>
                        <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
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
    }};

    generateCartItems()