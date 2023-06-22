function ShopItem({ item, onDecrement, onIncrement }) {
  let basket = localStorage.getItem("data")
    ? JSON.parse(localStorage.getItem("data"))
    : [];

  let { id, name, desc, price, img } = item;
  let search = basket.find((item) => item.id == id);

  return (
    <div id={`product-id-${id}`} className="item">
      <img width="220px" src={img} alt="" />
      <div className="details">
        <h3>{name}</h3>
        <p>{desc}</p>
        <div className="price-quantity">
          <h2>{price}</h2>
          <div className="buttons">
            <i onClick={() => onDecrement(id)} className="bi bi-dash-lg"></i>
            <div id={id} className="quantity">
              {search === undefined ? 0 : search.item}
            </div>
            <i onClick={() => onIncrement(id)} className="bi bi-plus-lg"></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShopItem;
