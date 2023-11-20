/*----------------------invoice.js---------------------------*/ 
// Extract quantity parameters from the URL
let params = (new URL(document.location)).searchParams;
let quantity = [];

// Populate quantity array based on the URL parameters
for (let i = 0; i < products.length; i++) {
    let quantityParam = params.get(`quantity`);

    if (quantityParam) {
        // Parse the JSON string into an array
        let quantityArray = JSON.parse(quantityParam);

        // Check if the index is within the bounds of the array
        if (i < quantityArray.length) {
            quantity.push(quantityArray[i]);
            console.log(`Quantity Param for product ${i}:`, quantityArray[i]); // Debugging statement
        } else {
            // Handle the case where the index is out of bounds (e.g., default to 0)
            quantity.push(0);
            console.log(`Quantity Param for product ${i}:`, 0); // Debugging statement
        }
    } else {
        // Handle the case where quantityParam is not present
        quantity.push(0);
        console.log(`Quantity Param for product ${i}:`, 0); // Debugging statement
    }
}

// Initialize variables for receipt content
let receiptContent = document.getElementById('receiptContent');
let subtotal = 0;
let taxRate = 0.0575; // 5.75%
let taxAmount = 0;
let total = 0;
let shipping;

// Generate item rows in the receipt
generateItemRows();

// Calculate shipping based on sub-total
if (subtotal <= 2000) {
    shipping = 500;
} else if (subtotal <= 200000) {
    shipping = 5000;
} else {
    shipping = subtotal * 0.05; // 5% of subtotal
}

// Calculate total including shipping
taxAmount = subtotal * taxRate;
total = subtotal + taxAmount + shipping;

// Set total cell in bold
document.getElementById('total_cell').innerHTML = `$${total.toFixed(2)}`;

// Set subtotal, tax, and shipping
document.getElementById('subtotal_cell').innerHTML = '$' + subtotal.toFixed(2);
document.getElementById('tax_cell').innerHTML = '$' + taxAmount.toFixed(2);
document.getElementById('shipping').innerHTML = '$' + shipping.toFixed(2);

// Function to generate item rows in the receipt
function generateItemRows() {
    
    // Add background image to the body
    document.body.style.backgroundImage = 'url("./images/Table.jpeg")';

    // Get the table element to populate
    let table = document.getElementById('invoiceTable');

    // Clear the table content
    table.innerHTML = '';

    // Loop through the products and quantity arrays
    for (let i = 0; i < products.length; i++) {
        let item = products[i];
        let itemQuantity = quantity[i];

        // Validate the quantity
        let validationMessage = validateQuantity(itemQuantity);

        // If there are validation errors, handle them appropriately
        if (validationMessage !== "") {
            // Handle validation errors (e.g., display an alert, update UI, etc.)
            // You can customize this based on your application's needs
        } else if (itemQuantity > 0) {
        // Calculate the extended price if quantity is valid and positive
            let extendedPrice = item.price * itemQuantity;
            subtotal += extendedPrice;

            // Display the item with the calculated extended price
            let row = table.insertRow();
            row.insertCell(0).innerHTML = `<strong>${item.brand}</strong><br><img src="${products[i].image}" alt="${products[i].imageName}" style="border-radius: 5px; width: 100px; height: 100px;">`;
            row.insertCell(1).innerHTML = itemQuantity;
            row.insertCell(2).innerHTML = "$" + item.price.toFixed(2);
            row.insertCell(3).innerHTML = "$" + extendedPrice.toFixed(2);
        }
    }

    // If there are no errors, display the total
    document.getElementById('total_cell').innerHTML = '$' + total.toFixed(2);
}

// Function to validate quantity
function validateQuantity(quantity) {
    let errorMessage = "";

    switch (true) {
        case isNaN(quantity):
            errorMessage = "Not a number. Please enter a non-negative quantity to order.";
            break;
        case quantity == 0:
            errorMessage = "Zero is not enough. Please enter a larger quantity";
            break;
        case quantity < 0 && !Number.isInteger(quantity):
            errorMessage = "Negative inventory and not an Integer. Please enter a non-negative quantity to order.";
            break;
        case quantity < 0:
            errorMessage = "Negative inventory. please enter a non-negative quantity to order.";
            break;
        case !Number.isInteger(quantity):
            errorMessage = "Not an Integer. please enter a non-negative quantity to order.";
            break;
        default:
            errorMessage = ""; // No errors
            break;
    }

    return errorMessage;


}
