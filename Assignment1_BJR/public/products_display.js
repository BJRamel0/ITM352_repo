/*----------------------products_display.js---------------------------*/ 
// Extract parameters from the URL
let params = (new URL(document.location)).searchParams;

// Function to dynamically populate the product form
function populateProductForm() {
    // Check the URL for any error parameters and quantity and display/use them
    let params = (new URL(document.location)).searchParams;
    let orderData = Number(params.get('orderData'));
    let error = params.get('error');

    // If there is an error, alert the user
    if (error) {
        alert(error);
    }

    // Define a variable that points to the form on the DOM to dynamically populate the form
    const form = document.getElementById('productForm');
    let formHTML = ''; // Blank content of the form to add to

    // Write a loop to print the product information AND then add a quantity text input box for every element of the product array
    for (let i in products) {
        formHTML += `<h3>${products[i]["brand"]} at \$${products[i]["price"]} (${products[i]["qty_available"]} Available)</h3>`;
        formHTML += `
            <label for="quantity_textbox_${i}">Quantity desired:</label>
            <input type="text" id="quantity${i}" name="quantity_textbox[]" oninput="checkQuantityTextbox(this)">
            <span id="quantity_textbox${i}_message">Enter a quantity</span><br>`;
    }

    // Ensure the submit button is part of the form 
    formHTML += `<br> <input type="submit" value="Purchase" class="purchase-btn">`;

    // Push the form content to the DOM
    form.innerHTML = formHTML;
}

// Window onload event to call the function when the page loads
window.onload = function () {
    populateProductForm();
}

// Function to check the quantity textbox
function checkQuantityTextbox(theTextbox) {
    let inputValue = Number(theTextbox.value)
    let errs = validateQuantity(inputValue, true);
    document.getElementById(theTextbox.name + '_message').innerHTML = errs;
}

// Function to validate the quantity
function validateQuantity(quantity, availableQuantity) {
    // Initialize an empty array to store error messages
    const errors = [];

    // Convert quantity to a number
    let quantitys = Number(quantity);

    // Reset the errors array
    errors.length = 0;

    // Use a switch statement to check various conditions
    switch (true) {
        case isNaN(quantitys) || quantitys === "":
            errors.push("Not a number");
            break;
        case quantitys < 0 && !Number.isInteger(quantitys):
            errors.push("Negative inventory and not an Integer");
            break;
        case quantitys < 0:
            errors.push("Negative inventory");
            break;
        case !Number.isInteger(quantitys):
            errors.push("Not an Integer");
            break;
        case quantitys > availableQuantity:
            errors.push("Insufficient stock");
            break;

        // Default case (no validation error)
        default:
            break;
    }

    // Return the errors array if there are any validation errors
    if (errors.length > 0) {
        return errors;
    } else {
        return null; // Return null if no validation errors
    }
}