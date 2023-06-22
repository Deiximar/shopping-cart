import ShopItem from "./ShopItem";
import shopItemsData from "../../../Data";

function Shop() {
  let basket = localStorage.getItem("data")
    ? JSON.parse(localStorage.getItem("data"))
    : [];

  function update(id) {
    let search = basket.find((x) => x.id == id);
    document.getElementById(id).innerHTML = search.item;
    //calculation();
  }

  function handleIncrement(id) {
    let search = basket.find((item) => item.id == id);

    if (search === undefined) {
      basket.push({
        id: id,
        item: 1,
      });
    } else {
      search.item += 1;
    }
    update(id);
    localStorage.setItem("data", JSON.stringify(basket));
  }

  function handleDecrement(id) {
    let search = basket.find((x) => x.id == id);

    if (search === undefined || search.item === 0) {
      return;
    } else {
      search.item -= 1;
    }
    update(id);
    basket = basket.filter((x) => x.item !== 0);
    localStorage.setItem("data", JSON.stringify(basket));
  }

  return (
    <div className="shop" id="shop">
      {shopItemsData.map((x) => (
        <ShopItem
          key={x.id}
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
          item={x}
        />
      ))}
    </div>
  );
}

export default Shop;
