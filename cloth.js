let items = [];

/* ✅ Products Database */
const products = {

    mens: [
        { name: "Shirt", price: 800 },
        { name: "T-Shirt", price: 500 },
        { name: "Jeans", price: 1200 }
    ],

    womens: [
        { name: "Kurti", price: 900 },
        { name: "Top", price: 600 },
        { name: "Saree", price: 2000 }
    ],

    kids: [
        { name: "Kids Shirt", price: 400 },
        { name: "Kids Dress", price: 700 }
    ]
};

/* ✅ Invoice + Date */
window.onload = () => {

    let invoice = localStorage.getItem("invoiceNo") || 1;
    document.getElementById("invoiceNo").innerText = invoice;

    const today = new Date().toLocaleDateString();
    document.getElementById("billDate").innerText = today;
};

/* ✅ Load Products */
function loadProducts() {

    const category = document.getElementById("category").value;
    const productDropdown = document.getElementById("product");

    productDropdown.innerHTML = `<option value="">Product</option>`;

    if (!category) return;

    products[category].forEach(item => {
        productDropdown.innerHTML += 
            `<option value="${item.name}" data-price="${item.price}">
                ${item.name}
            </option>`;
    });
}

/* ✅ Auto Price */
function setPrice() {

    const dropdown = document.getElementById("product");
    const priceField = document.getElementById("price");

    const selected = dropdown.options[dropdown.selectedIndex];
    const price = selected.getAttribute("data-price");

    if (price) priceField.value = price;
}

/* ✅ Add Item */
function addItem() {

    const name = document.getElementById("product").value;
    const size = document.getElementById("size").value;
    const qty = parseFloat(document.getElementById("qty").value);
    const price = parseFloat(document.getElementById("price").value);

    if (!name || !qty || !price) {
        alert("Fill all fields");
        return;
    }

    const total = qty * price;

    items.push({ name, size, qty, price, total });

    renderBill();
}

/* ✅ Render Bill */
function renderBill() {

    const body = document.getElementById("billBody");
    const grandTotalField = document.getElementById("grandTotal");
    const discount = parseFloat(document.getElementById("discount").value) || 0;

    body.innerHTML = "";
    let grandTotal = 0;

    items.forEach((item, index) => {

        grandTotal += item.total;

        body.innerHTML += `
            <tr>
                <td>${item.name}</td>
                <td>${item.size}</td>
                <td>${item.qty}</td>
                <td>₹ ${item.price}</td>
                <td>₹ ${item.total}</td>
                <td>
                    <button onclick="deleteItem(${index})">❌</button>
                </td>
            </tr>
        `;
    });

    let finalTotal = grandTotal - (grandTotal * discount / 100);

    grandTotalField.innerText = finalTotal.toFixed(2);
}

/* ✅ Delete */
function deleteItem(index) {
    items.splice(index, 1);
    renderBill();
}

/* ✅ Clear */
function clearBill() {
    items = [];
    renderBill();
}

/* ✅ Print */
function printBill() {

    let invoice = parseInt(document.getElementById("invoiceNo").innerText);
    localStorage.setItem("invoiceNo", invoice + 1);

    window.print();
}
