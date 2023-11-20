//Order2.js
function updateQuantityMessage(textbox) {
    let inputValue = Number(textbox.value);
    let errorMessages = validateQuantity(inputValue);

    let quantityMessage=document.getElementById('qty_textbox_message');

    //validate the quantity entered
    let validationMessage=validateQuantity(Number(textbox.value));

    //if there are validation errors, display error message
    if (validationMessage !=="") {
        quantityMessage.innerHTML = validationMessage;
    } else {
        quantityMessage.innerHTML = textbox.value;
    }
} 

function validateQuantity(quantity) {
    let errorMessage= [];

    let quantityValue = Number(quantity);

    errorMessage.length = 0;

    switch (true) {
        case isNaN(quantityValue):
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
            errorMessage = "Not an Integer. please enter a non0egative quantity to order.";
            break;
        default:
            errorMessage = ""; //no errors
            break;
    }

        // Return the errors array if there are any validation errors
        if (errorMessage.length > 0) {
            return errorMessage;
        } else {
            return null; // Return null if no validation errors
        }
}

function displayPurchase() {
    let quantity = Number(document.getElementById('qty_textbox').value);

    let validationMessage = validateQuantity(quantity);

    if (validationMessage == "") {
        let message = `Thank you for ordering ${quantity} things!`;
        document.body.innerHTML = message;
    } else {
        alert(validationMessage + " Please enter a positive integer for quantity.")
        document.getElementById('qty_textbox').value="";
    }
}