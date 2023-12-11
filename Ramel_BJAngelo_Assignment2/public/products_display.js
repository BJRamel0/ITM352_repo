/*----------------------products_display.js---------------------------*/ 
// Extract parameters from the URL
let params = new URL(document.location).searchParams;

// Function to dynamically populate the product form
function populateProductForm() {
    // Check the URL for any error parameters and quantity and display/use them
    let orderData = Number(params.get('orderData'));
    let error = params.get('error');
    
    // Add background image to the body
    document.body.style.backgroundImage = 'url("./images/ScaryRoom.jpeg")';

    // Define a variable that points to the form on the DOM to dynamically populate the form
    const form = document.getElementById('productForm');
    let formHTML = ''; // Blank content of the form to add to

    // Write a loop to print the product information AND then add a quantity text input box for every element of the product array
    for (let i in products) {
        formHTML += '<div class="product-container">';
        formHTML += `<h3>${products[i].brand} $${products[i].price}</h3>`;
        formHTML += `<p class="available-line">Available: ${products[i].qty_available}</p>`;
        formHTML += `<img src="${products[i].image}" style="width: 60%" class="img-thumbnail" alt="${products[i].imageName}"/>`;
        formHTML += `
            <label for="quantity_textbox_${i}">Quantity desired:</label>
            <div class="quantity-container">
                <input type="text" class="textbox" id="quantity${i}" name="quantity_textbox[]" onkeyup="checkQuantityTextbox(this, ${products[i].qty_available}, ${i})">
                <br>
                <span id="quantity_textbox${i}_message">Enter a valid quantity</span>
            </div>`;
        formHTML += '</div>';
    }

    // Ensure the submit button is part of the form
    formHTML += '<div class="button-container">';
    formHTML += '<input type="submit" value="Purchase" class="purchase-btn">';
    formHTML += '</div>';

    // Push the form content to the DOM
    form.innerHTML = formHTML;
}

// Window onload event to call the function when the page loads
window.onload = function () {
    populateProductForm();
}

// Function to check the quantity textbox
function checkQuantityTextbox(theTextbox, availableQuantity, index) {
    let inputValue = Number(theTextbox.value);

    // Validate the user input quantity using the updated validateQuantity function
    let errorMessages = validateQuantity(inputValue, availableQuantity);

    // Assuming theTextbox.name is in the format "quantityN"
    let errorSpan = document.getElementById(`quantity_textbox${index}_message`);

    // Check if there are any error messages and update the display
    if (errorMessages && errorMessages.length > 0) {
        errorSpan.innerHTML = errorMessages.join('<br>');
        errorSpan.style.color = "red";
        theTextbox.parentElement.style.borderColor = "red";
    } else {
        errorSpan.innerHTML = "Enter a valid quantity"; // Default message
        errorSpan.style.color = "#20C20E"; // Match the color in your CSS
        theTextbox.parentElement.style.borderColor = "#20C20E"; // Match the color in your CSS
    }
}

// Function to validate the quantity
function validateQuantity(quantity, availableQuantity) {
    // Initialize an empty array to store error messages
    const errors = [];

    // Use a switch statement to check various conditions
    switch (true) {
        case isNaN(quantity) || quantity === "":
            errors.push("Not a number");
            break;
        case quantity < 0 && !Number.isInteger(quantity):
            errors.push("Negative inventory and not an Integer");
            break;
        case quantity < 0:
            errors.push("Negative inventory");
            break;
        case !Number.isInteger(quantity):
            errors.push("Not an Integer");
            break;
        case quantity > availableQuantity:
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

// Add event listeners to the quantity textboxes
document.addEventListener("DOMContentLoaded", function () {
    // Assuming you have multiple quantity textboxes with the class "quantity-textbox"
    const quantityTextboxes = document.querySelectorAll(".quantity-textbox");

    quantityTextboxes.forEach(function (textbox, index) {
        textbox.addEventListener("input", function () {
            // Reset the styling and message when the user corrects the input
            checkQuantityTextbox(textbox, products[index].qty_available, index);
        });
    });
});