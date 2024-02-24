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
    var price = "";

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

    if (product.price_discount) {
      price = `<s>$ ${product.price}</s><strong class="ms-2 ${tagType}">$ ${product.price_discount}</strong>`;
    } else {
      price = `<strong class="ms-2 ${tagType}">$ ${product.price}</strong>`;
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
              ${price}
            </h6>
          </div>
        </div>
      </div>`;
  });
  var productsContainer = document.getElementById("productsContainer");
  productsContainer.innerHTML = html;
}

function showNoDataError(show) {
  const errorDiv = document.getElementById("errorbox");
  if (show) {
    errorDiv.classList.remove("d-none");
  } else {
    errorDiv.classList.add("d-none");
  }
}

function doBuscar() {
  //La búsqueda no puede utilizando Promesas y la API Fetch de JavaScript
  //porque el servidor que utilizamos (my-json-server.typicode.com)
  //no permite buscar por múltiples palabras
  //y solo permite búsqueda por coincidencia exacta
  searchText = document.getElementById("searchInput").value.trim();

  if (searchText && products.length > 0) {
    var searchResults = products.filter((p) =>
      p.title_normalized.includes(searchText)
    );
    showProductCards(searchResults);
    showNoDataError(searchResults.length === 0);
  }
}

document.addEventListener("DOMContentLoaded", () => loadProducts());

document
  .getElementById("searchInput")
  .addEventListener("keyup", function (event) {
    event.preventDefault();
    if (event.key === "Enter") {
      document.getElementById("searchButton").click();
    }
  });
