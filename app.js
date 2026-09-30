const url = "https://fakestoreapi.noksha.dev/api/products";

const productsBox = document.getElementById("products");
const loading = document.getElementById("loading");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const pageNumber = document.getElementById("pageNumber");

let currentPage = 1;
let totalPages = 1;

async function getProducts(page = 1) {
  try {
    loading.style.display = "block";
    productsBox.innerHTML = "";

    const response = await fetch(`${url}?page=${page}`);
    const result = await response.json();

    currentPage = result.currentPage;
    totalPages = result.totalPages;

    loading.style.display = "none";
    showProducts(result.data);

    pageNumber.innerText = `Page ${currentPage} of ${totalPages}`;
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
  } catch (error) {
    loading.innerText = "Failed to load products";
    console.log(error);
  }
}

function showProducts(products) {
  products.forEach(product => {
    productsBox.innerHTML += `
      <div class="card">
        <div class="image-box">
          <img src="${product.image}" alt="${product.title}">
          ${product.isNew ? `<span class="new">NEW</span>` : ""}
        </div>
        <div class="content">
          <div class="brand">${product.brand}</div>
          <h3>${product.title}</h3>
          <p class="category">${product.category} • ${product.type}</p>
          <p class="description">${product.description}</p>
          <div class="rating">⭐ ${product.rating} / 5</div>
          <div class="price-box">
            <span class="price">$${product.discountedPrice}</span>
            <span class="old-price">$${product.oldPrice}</span>
          </div>
          <button>Add to Cart</button>
        </div>
      </div>
    `;
  });
}

prevBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    getProducts(currentPage - 1);
  }
});

nextBtn.addEventListener("click", () => {
  if (currentPage < totalPages) {
    getProducts(currentPage + 1);
  }
});

getProducts();