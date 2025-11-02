function loadCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartContainer = document.getElementById("cart-items");
    const totalElement = document.getElementById("total");
    const buyButton = document.getElementById("buy-cart");

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty.</p>";
        totalElement.innerText = "";
        buyButton.style.display = "none";
        updateCartCount();
        return;
    }

    let total = 0;
    cartContainer.innerHTML = "";

    cart.forEach((item, index) => {
        total += item.price;

        const card = document.createElement("div");
        card.classList.add("cart-card");

        card.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-details">
                <h3>${item.name}</h3>
                <p class="price">₹${item.price}</p>
            </div>
            <button class="remove-btn" data-index="${index}">Remove</button>
        `;

        cartContainer.appendChild(card);
    });

    totalElement.innerText = "Total: ₹" + total;

    document.querySelectorAll(".remove-btn").forEach(button => {
        button.addEventListener("click", () => {
            removeItem(button.dataset.index);
        });
    });

    buyButton.style.display = "inline-block";
    updateCartCount();
}

function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

document.getElementById("clear-cart").addEventListener("click", () => {
    localStorage.removeItem("cart");
    loadCart();
});

document.getElementById("buy-cart").addEventListener("click", () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) return;

    const phoneNumber = "9022532011";
    let message = "Hello, I want to buy the following items:%0A%0A";

    let total = 0;
    cart.forEach(item => {
        total += item.price;
        message += `• ${item.name} - ₹${item.price}%0A`;
    });

    message += `%0ATotal Amount: ₹${total}%0A%0APlease confirm availability.`;

    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
});

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartCount = document.getElementById("cart-count");
    if (cartCount) cartCount.textContent = cart.length;
}

updateCartCount();
loadCart();
