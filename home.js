var products = [];

function loadProducts() {
  const isResponseOk = (response) => {
    if (!response.ok) throw new Error(response.status);
    return response.text();
  };

  fetch("https://my-json-server.typicode.com/leandroordo/Desafio-19/products", {
    method: "GET",
    headers: new Headers({ "Content-type": "application/json" }),
  })
    .then((response) => isResponseOk(response))
    .then((data) => {
      products = JSON.parse(data);
      showProductCards(products);
    })
    .catch((err) => {
      //Mostrar error
      showError();
      console.error("ERROR: ", err.message);
    });
}

function showProductCards(productList) {
  var html = "";

  productList.forEach((product) => {
    var discount = "";

    if (product.price_discount) {
      discount = `<s>$ ${product.price_discount}</s>`;
    }

    var tag = "";
    var tagType = product.tag_type ?? "";

    if (product.tag_type) {
      tag = `<div class="mask">
      <div
        class="d-flex justify-content-start align-items-end h-100"
      >
        <h5>
          <span class="badge ${product.tag_type}-badge ms-2">${product.tag}</span>
        </h5>
      </div>
    </div>`;
    }

    html += `<div class="col-lg-3 col-md-6 mb-4">
        <div class="card">
          <div class="bg-image hover-zoom">
            <img src="./img/${product.img}.webp" class="w-100" />
            ${tag}
          </div>
          <div class="card-body">
            <h5 class="card-title mb-2">
              ${product.title}
            </h5>
            <h6 class="mb-3 price">
              ${discount}<strong class="ms-2 ${tagType}">$ ${product.price}</strong>
            </h6>
          </div>
        </div>
      </div>`;

    var productsContainer = document.getElementById("productsContainer");
    productsContainer.innerHTML = html;
  });
}

document.addEventListener("DOMContentLoaded", () => loadProducts());
