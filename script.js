const foodItems = [
    { name: "Veg Biryani", description: "Spiced rice and vegetables with curd.", price: 100, image: "https://images.pexels.com/photos/15059056/pexels-photo-15059056/free-photo-of-a-bowl-of-rice-with-vegetables-and-sauce.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { name: "Masala Dosa", description: "Crispy dosa with chutney and sambar.", price: 80, image: "https://images.pexels.com/photos/20422133/pexels-photo-20422133/free-photo-of-triangular-bread-on-plate.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { name: "Chole Bhature", description: "Spicy chickpeas, salad and fresh bhature.", price: 120, image: "https://media.istockphoto.com/id/979914742/photo/chole-bhature-or-chick-pea-curry-and-fried-puri-served-in-terracotta-crockery-over-white.jpg?s=2048x2048&w=is&k=20&c=zhmGombUCMWWkdI2COP1vh1bDma-3wS_FOv4GmHE41s=" }, 
    { name: "Veg Pizza", description: "Cheese and fresh veggies loaded pizza.", price: 160, image: "https://images.pexels.com/photos/5175513/pexels-photo-5175513.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { name: "Idli Sambar", description: "Soft idli with hot sambar and chutney.", price: 60, image: "https://images.pexels.com/photos/31199041/pexels-photo-31199041/free-photo-of-traditional-south-indian-idli-with-sambar-and-chutney.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { name: "Rajma Chawal", description: "Kidney beans curry with rice and salad.", price: 100, image: "https://images.pexels.com/photos/12737912/pexels-photo-12737912.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { name: "Spring Rolls", description: "Crispy vegetable spring rolls with ketchup.", price: 60, image: "https://images.pexels.com/photos/3569706/pexels-photo-3569706.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { name: "Pakoda", description: "Crispy and crunchy vegetable pakodas with chutney.", price: 70, image: "https://media.istockphoto.com/id/540851506/photo/onion-bhaji-or-pakora-served-with-tomato-ketchup-and-tea.jpg?s=2048x2048&w=is&k=20&c=E2KpeTzYxgrJ27WvxZHPHNn6PQ0v_XuIjPt_7gS2TiY=" }, 
    { name: "Veg Burger", description: "Fresh lettuce and veggie patty burger with ketchup. ", price: 90, image: "https://images.pexels.com/photos/19737930/pexels-photo-19737930/free-photo-of-close-up-of-burgers-standing-on-boxes.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { name: "Momos", description: "Steamed dumplings filled with vegetables with chutney.", price: 85, image: "https://cdn.pixabay.com/photo/2020/09/21/12/40/meal-5589923_1280.jpg" },
    { name: "Aloo Tikki", description: "Crispy potato patties served with chutneys.", price: 60, image: "https://media.istockphoto.com/id/1355508124/photo/aloo-tikki-chole-chaat.jpg?s=1024x1024&w=is&k=20&c=g1UC72mHTPqhkAKZqkknzRA-pxgZat-n3y-Nb7u5x-Q=" }, 
    { name: "Cold Drink", description: "Chilled refreshing soft drink.(Coca Cola)", price: 30, image: "https://images.pexels.com/photos/50593/coca-cola-cold-drink-soft-drink-coke-50593.jpeg?auto=compress&cs=tinysrgb&w=600" }
  ];
  

const cart = [];
const deliveryCharge = 30;
const gstPercentage = 18.0;

const container = document.getElementById("food-list");
const cartContainer = document.getElementById("cart-container");
const cartItemsDiv = document.getElementById("cart-items");
const totalBillDiv = document.getElementById("total-bill");

foodItems.forEach(item => {
    const card = document.createElement("div");
    card.className = "food-card";
    card.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <div class="details">
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <div class="price">₹${item.price}</div>
            <div class="quantity">
                <label for="quantity-${item.name}">Qty:</label>
                <input type="number" id="quantity-${item.name}" value="1" min="1">
            </div>
            <button onclick="addToCart('${item.name}', ${item.price})">Add to Cart</button>
        </div>
    `;
    container.appendChild(card);
});

function addToCart(name, price) {
    const quantity = document.getElementById(`quantity-${name}`).value;
    const totalPrice = price * quantity;
    const itemInCart = cart.find(item => item.name === name);

    if (itemInCart) {
        itemInCart.quantity += parseInt(quantity);
        itemInCart.totalPrice += totalPrice;
    } else {
        cart.push({
            name,
            quantity: parseInt(quantity),
            totalPrice
        });
    }

    renderCart();
}

function removeFromCart(name) {
    const index = cart.findIndex(item => item.name === name);
    if (index > -1) {
        cart.splice(index, 1);
    }
    renderCart();
}

function renderCart() {
    cartItemsDiv.innerHTML = "";
    let totalBill = 0;

    cart.forEach(item => {
        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";
        cartItem.innerHTML = `
            <span>${item.name} - ₹${item.totalPrice} (Qty: ${item.quantity})</span>
            <button onclick="removeFromCart('${item.name}')">Remove</button>
        `;
        cartItemsDiv.appendChild(cartItem);
        totalBill += item.totalPrice;
    });

    const gstAmount = (totalBill * gstPercentage) / 100;
    const finalAmount = totalBill + gstAmount + deliveryCharge;

    totalBillDiv.innerHTML = `
        Total: ₹${totalBill}<br>
        GST (18%): ₹${gstAmount.toFixed(2)}<br>
        Delivery Charge: ₹${deliveryCharge}<br>
        <strong>Total Amount: ₹${finalAmount.toFixed(2)}</strong>
    `;
}

function placeOrder() {
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const address = document.getElementById("address").value;
    const paymentMode = document.getElementById("payment-mode").value;

    if (!paymentMode) {
        alert("Please select a payment method before placing the order.");
        return;
    }

    if (name && phone && address) {
        alert("Order Placed! We will deliver to your address soon.");
    } else {
        alert("Please fill in all details.");
    }
}

function makePayment() {
    const paymentMode = document.getElementById("payment-mode").value;

    if (!paymentMode) {
        alert("Please select a payment method before proceeding.");
        return;
    }

    const totalAmount = calculateTotalAmount();

    switch (paymentMode) {
        case "UPI":
            alert(`Redirecting you to UPI payment gateway. Total: ₹${totalAmount}`);
            break;
        case "Card":
            alert(`Redirecting you to card payment gateway. Total: ₹${totalAmount}`);
            break;
        case "Cash on Delivery":
            alert(`Your order will be delivered, and you will pay ₹${totalAmount} in cash on delivery.`);
            return;
    }

    alert("Payment Successful! Your order is being processed.");
}

function calculateTotalAmount() {
    let totalBill = 0;
    cart.forEach(item => {
        totalBill += item.totalPrice;
    });

    const gstAmount = (totalBill * gstPercentage) / 100;
    return (totalBill + gstAmount + deliveryCharge).toFixed(2);
}
