async function products() {
    let products = ''
  let data = await fetch("https://alisasa1379.github.io/jsonServerRes/db.json");
  let res = await data.json();
  products = res.products?.map((item) => {
    return `<div class="product">
            <div class="title">${item.title}</div>
            <div class="image">
                <img src=${item.image} alt="product">
            </div>
            <div class="description">${item.description}</div>
            <div class="price">
            ${item.price}
            </div>
            <div class="category">${item.category}</div>
            <div class="rating">
                <div class="rate">rate: ${item.rating.rate}</div>
                <div class="count">count: ${item.rating.count}</div>
            </div>
            <button class="buyBtn">add to cart</button>
        </div>`;
  });
  document.querySelector("#products").insertAdjacentHTML("beforeend",products.join(" "))
}

export default products;
