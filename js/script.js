// document.addEventListener("DOMContentLoaded", () => {
//   const products = [
//     { id: 1, name: "Gold Necklace", category: "Jewelry", price: "$250", image: "https://via.placeholder.com/200" },
//     { id: 2, name: "Designer Shirt", category: "Clothing", price: "$45", image: "https://via.placeholder.com/200" },
//     { id: 3, name: "Silver Earrings", category: "Jewelry", price: "$80", image: "https://via.placeholder.com/200" },
//     { id: 4, name: "Denim Jacket", category: "Clothing", price: "$120", image: "https://via.placeholder.com/200" }
//   ];

//   const productList = document.getElementById("product-list");
//   products.forEach(product => {
//     productList.innerHTML += `
//       <div class="col-md-3 mb-4">
//         <div class="card h-100">
//           <img src="${product.image}" class="card-img-top" alt="${product.name}">
//           <div class="card-body">
//             <h5 class="card-title">${product.name}</h5>
//             <p class="card-text">${product.category}</p>
//             <p class="card-text fw-bold">${product.price}</p>
//             <a href="#" class="btn btn-primary">Buy Now</a>
//           </div>
//         </div>
//       </div>`;
//   });
// });


// let allProducts = JSON.parse(localStorage.getItem("adminProducts")) || [];

// function displayProducts(products) {
//   const container = document.getElementById("product-list");
//   container.innerHTML = "";

//   if (products.length === 0) {
//     container.innerHTML = "<p class='text-center'>No products found.</p>";
//     return;
//   }

//   products.forEach((p) => {
//     container.innerHTML += `
//       <div class="col-md-4 mb-4">
//         <div class="card h-100">
//           <img src="${p.image}" class="card-img-top" alt="${p.name}">
//           <div class="card-body">
//             <h5 class="card-title">${p.name}</h5>
//             <p class="card-text">${p.category}</p>
//             <p class="card-text fw-bold">${p.price}</p>
//             <a href="#" class="btn btn-warning">Buy Now</a>
//           </div>
//         </div>
//       </div>`;
//   });
// }

// function filterProducts(category) {
//   if (category === "all") {
//     displayProducts(allProducts);
//   } else {
//     const filtered = allProducts.filter((p) => p.category.toLowerCase() === category.toLowerCase());
//     displayProducts(filtered);
//   }
// }

// window.addEventListener("DOMContentLoaded", () => {
//   displayProducts(allProducts);
// });
   


const sheetURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vT7GEKaqHGSMO9mD9RZTkuNzCojEbETn1MSHwZ7xSB1lBjq3l0EbfSyok-rDMppUwotPBU4_y_gJaNn/pub?output=csv";
let allProducts = [];

function loadProductsFromSheet() {
  Papa.parse(sheetURL, {
    download: true,
    header: true,
    complete: function (results) {
      allProducts = results.data.filter(p => p.name && p.category && p.price && p.image);
      displayProducts(allProducts);
    },
    error: function (err) {
      console.error("Failed to load products:", err);
    }
  });
}

function displayProducts(products) {
  const container = document.getElementById("product-list");
  container.innerHTML = "";

  if (products.length === 0) {
    container.innerHTML = "<p class='text-center'>No products found.</p>";
    return;
  }

  products.forEach((p) => {
    container.innerHTML += `
      <div class="col-md-4 mb-4">
        <div class="card h-100 shadow-sm">
          <img src="${p.image}" class="img-fluid product-image" alt="${p.name}">
          <div class="card-body">
            <h5 class="card-title">${p.name}</h5>
            <p class="card-text">${p.category}</p>
            <p class="card-text fw-bold">${p.price}</p>
            <a href="product.html?id=${p.id}" class="btn btn-outline-primary">Book Now</a>
          </div>
        </div>
      </div>
    `;
  });
}

function filterProducts(category) {
  if (category === "all") {
    displayProducts(allProducts);
  } else {
    const filtered = allProducts.filter(p =>
      p.category.toLowerCase() === category.toLowerCase()
    );
    displayProducts(filtered);
  }
}

window.addEventListener("DOMContentLoaded", loadProductsFromSheet);
