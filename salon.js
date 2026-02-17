let items = [];

const services = {

    hair: [
        { name: "Textured Crop (French Crop)", price: 350 },
        { name: "Modern Mullet", price: 500 },
        { name: "Low Taper Fade", price: 300 },
        { name: "Bro Flow (Mid-length)", price: 400 },
        { name: "Overgrown Buzz Cut", price: 250 },
        { name: "Burst Fade", price: 450 },
        { name: "Edgar Cut", price: 400 },
        { name: "Modern Pompadour", price: 500 },
        { name: "Wolf Cut", price: 700 },
        { name: "Side Part with Volume", price: 350 }
    ],
    beard: [   // ✅ NEW SECTION 🔥
        { name: "Stubble (3-Day Shadow)", price: 150 },
        { name: "Faded Beard", price: 250 },
        { name: "Corporate Beard", price: 200 },
        { name: "Heavy Stubble", price: 150 },
        { name: "Boxed Beard", price: 250 },
        { name: "Van Dyke", price: 200 },
        { name: "Verdi", price: 300 },
        { name: "Hollywoodian", price: 300 },
        { name: "Garibaldi", price: 350 },
        { name: "Long Hipster Beard", price: 400 }
    ],
    face: [
    { name: "Salicylic Acid Face Wash", price: 250 },
    { name: "Activated Charcoal Face Wash", price: 200 },
    { name: "Vitamin C Face Wash", price: 250 },
    { name: "Hydrating Hyaluronic Acid", price: 300 },
    { name: "Niacinamide Face Wash", price: 350 },
    { name: "Coffee Face Wash", price: 200 },
    { name: "Tea Tree Face Wash", price: 250 },
    { name: "Exfoliating Scrub Wash", price: 200 },
    { name: "Aloe Vera Gentle Wash", price: 150 },
    { name: "Anti-Aging Retinol Wash", price: 450 }
],

};


function loadServices() {
    const category = document.getElementById("category").value;
    const serviceDropdown = document.getElementById("service");

    serviceDropdown.innerHTML = `<option value="">Select Service</option>`;

    if (!category) return;

    services[category].forEach(service => {
        serviceDropdown.innerHTML += 
            `<option value="${service.name}" data-price="${service.price}">
                ${service.name}
            </option>`;
    });
}

function setPrice() {
    const serviceDropdown = document.getElementById("service");
    const priceField = document.getElementById("price");

    const selectedOption = serviceDropdown.options[serviceDropdown.selectedIndex];
    const price = selectedOption.getAttribute("data-price");

    if (price) {
        priceField.value = price;
    }
}

function addItem() {
    const service = document.getElementById("service").value;
    const qty = parseFloat(document.getElementById("qty").value);
    const price = parseFloat(document.getElementById("price").value);

    if (!service || !qty || !price) {
        alert("Fill all fields");
        return;
    }

    const total = qty * price;

    items.push({ service, qty, price, total });

    renderBill();
}

function renderBill() {
    const body = document.getElementById("billBody");
    const grandTotalField = document.getElementById("grandTotal");

    body.innerHTML = "";
    let grandTotal = 0;

    items.forEach((item, index) => {
        grandTotal += item.total;

        body.innerHTML += `
            <tr>
                <td>${item.service}</td>
                <td>${item.qty}</td>
                <td>₹ ${item.price}</td>
                <td>₹ ${item.total}</td>
                <td>
                    <button onclick="deleteItem(${index})">Delete</button>
                </td>
            </tr>
        `;
    });

    grandTotalField.innerText = grandTotal;
}

function deleteItem(index) {
    items.splice(index, 1);
    renderBill();
}

function clearBill() {
    items = [];
    renderBill();
}
function printBill() {

    const billContent = document.getElementById("billSection").innerHTML;

    const printWindow = window.open('', '', 'width=900,height=650');

    printWindow.document.write(`
        <html>
        <head>
            <title>Salon Bill</title>
            <style>
                body { font-family: Arial; padding: 20px; }
                h2 { text-align: center; }
                table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                th, td { border: 1px solid black; padding: 10px; text-align: center; }
                h2 { margin-top: 20px; text-align: right; }
            </style>
        </head>
        <body>
            ${billContent}
        </body>
        </html>
    `);

    printWindow.document.close();
    printWindow.print();
}
