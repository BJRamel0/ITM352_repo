/*----------------------products_display.js---------------------------*/
// Extract parameters from the URL
let params = new URL(document.location).searchParams;
let quantity = [];
let quantityParam = params.get('quantity') || "[]";
let quantityArray = JSON.parse(decodeURIComponent(quantityParam));

// Function to dynamically populate the product form
function populateProductForm() {
    // Check the URL for any error parameters and quantity and display/use them
    let orderData = Number(params.get('orderData'));
    let users = params.get('users');
    let error = params.get('error');
    let email = params.get('email') || "";

    if (email != "") {
        document.getElementById("welcomeText").innerHTML = `Welcome, ${decodeURIComponent(email)}!`;
        document.getElementById("activeUsers").innerHTML = `There is ${decodeURIComponent(users)} active user(s)`;
    } else {
        document.getElementById("welcomeText").innerHTML = `<a class="nav-link" href="./login.html">Login</a>`;
    }

    if (quantityParam.length > 0) {
        for (let i = 0; i < products.length; i++) {
            // Check if the index is within the bounds of the array
            if (i < quantityArray.length) {
                quantity.push(quantityArray[i]);
                console.log(`Quantity Param for product ${i}:`, quantityArray[i]); // Debugging statement
            } else {
                // Handle the case where the index is out of bounds (e.g., default to 0)
                quantity.push(0);
                console.log(`Quantity Param for product ${i}:`, 0); // Debugging statement
            }

            // Set the value of the quantity input field
        }
    }

    // Add background image to the body
    document.body.style.backgroundImage = 'url("./images/ScaryRoom.jpeg")';

    // Define a variable that points to the form on the DOM to dynamically populate the form
    const form = document.getElementById('productForm');
    let formHTML = ''; // Blank content of the form to add to

    let product_key = "BodyParts";
    let page = params.get('page');
    if (page !== null && page !== "") {
        product_key = page;
    }
    // Write a loop to print the product information AND then add a quantity text input box for every element of the product array
    for (let i in products[product_key]) {
        formHTML += '<div class="product-container">';
        formHTML += `<h3>${products[product_key][i].brand} $${products[product_key][i].price}</h3>`;
        formHTML += `<p class="available-line">Available: ${products[product_key][i].qty_available}   Sold: ${products[product_key][i].qty_sold}</p>`;
        formHTML += `<img src="${products[product_key][i].image}" style="width: 60%" class="img-thumbnail" alt="${products[product_key][i].imageName}"/>`;
        formHTML += `
            <label for="quantity_textbox_${i}">Quantity desired:</label>
            <div class="quantity-container">
                <input type="text" class="textbox" id="quantity${i}" name="quantity_textbox[]" onkeyup="checkQuantityTextbox(this, ${products[product_key][i].qty_available}, ${i})">
                <br>
                <span id="quantity_textbox${i}_message">Enter a valid quantity</span>
            </div>`;
        formHTML += '</div>';
    }

    // Ensure the submit button is part of the form
    formHTML += '<div class="button-container">';
    formHTML += '<input type="submit" value="Add to Cart" class="purchase-btn">';
    formHTML += '</div>';

    // Push the form content to the DOM
    form.innerHTML = formHTML;
}

// Window onload event to call the function when the page loads
window.onload = function () {
    populateProductForm();

    for (let i = 0; i < products.length; i++) {
        if (quantity[i] != 0) {
            document.getElementById(`quantity${i}`).value = `${quantity[i]}`;
        } 
    }
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
    // Assuming you have multiple quantity textboxes with the class "textbox"
    const quantityTextboxes = document.querySelectorAll(".textbox");

    quantityTextboxes.forEach(function (textbox, index) {
        textbox.addEventListener("input", function () {
            // Reset the styling and message when the user corrects the input
            checkQuantityTextbox(textbox, products[index].qty_available, index);
        });
    });
});