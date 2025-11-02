function addToCart(itemName, itemPrice, itemImage) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.push({
        name: itemName,
        price: Number(itemPrice),
        image: itemImage
    });

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount(true); // true means animate
}

document.querySelectorAll(".add-to-cart").forEach(btn => {
    btn.addEventListener("click", () => {
        addToCart(
            btn.dataset.name,
            btn.dataset.price,
            btn.dataset.image
        );

        alert(`${btn.dataset.name} added to cart`);
    });
});

function updateCartCount(animate = false) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartCount = document.getElementById("cart-count");

    if (cartCount) {
        cartCount.textContent = cart.length;

        if (animate) {
            cartCount.classList.add("animate");
            setTimeout(() => {
                cartCount.classList.remove("animate");
            }, 300);
        }
    }
}

// Load existing value when page opens
updateCartCount();
