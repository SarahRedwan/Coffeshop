document.addEventListener("DOMContentLoaded", () => {
  const cart = document.getElementById("cart");
  const cartDetails = document.getElementById("cart-details");
  const cartList = document.getElementById("cart-list");

  // Clear any default content
  cartList.innerHTML = "";
  cartDetails.style.display = "none";

  // Create a total element
  const cartTotal = document.createElement("p");
  cartTotal.style.fontWeight = "bold";
  cartTotal.style.marginTop = "10px";
  cartDetails.appendChild(cartTotal);

  const addButtons = document.querySelectorAll(".product-card button");
  let cartCount = 0;
  let totalCost = 0;

  function updateCart() {
    if (cartCount > 0) {
      cart.setAttribute("data-count", cartCount);
      cartTotal.textContent = `Total: ${totalCost.toFixed(2)} ETB`;
      cartDetails.style.display = "block";
    } else {
      cart.removeAttribute("data-count");
      cartDetails.style.display = "none";
      cartList.innerHTML = ""; // ensure cart list is empty
      cartTotal.textContent = "";
    }
  }

  addButtons.forEach(button => {
    button.addEventListener("click", () => {
      const productCard = button.closest(".product-card");
      const productName = productCard.querySelector("h4").textContent;
      const productPrice = parseFloat(productCard.querySelector("p").textContent.replace('ETB','').trim()) || 0;

      const li = document.createElement("li");
      li.textContent = `${productName} - ${productPrice.toFixed(2)} ETB`;

      const removeBtn = document.createElement("button");
      removeBtn.textContent = "Remove";
      removeBtn.style.marginLeft = "10px";

      removeBtn.addEventListener("click", () => {
        cartList.removeChild(li);
        cartCount--;
        totalCost -= productPrice;
        updateCart();
      });

      li.appendChild(removeBtn);
      cartList.appendChild(li);

      cartCount++;
      totalCost += productPrice;
      updateCart();
    });
  });

  // Toggle cart details visibility on click
  cart.addEventListener("click", () => {
    if (cartCount > 0) {
      cartDetails.style.display = cartDetails.style.display === "none" ? "block" : "none";
    }
  });
});
