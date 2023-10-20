function updateQuantityMessage(textbox) {
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
    let errorMessage= "";

    switch (true) {
        case isNaN(quantity):
            errorMessage = "Not a number. Please enter a non-negative quantity to order.";
            break;
        case quantity = 0:
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

    return errorMessage;
}