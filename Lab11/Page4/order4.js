function formSubmission() {
    //get the value from the form textbox, convert itto a number and assign it to something easy to type 
    let quantity=Number(document.querySelector('input[name="qty_textbox"]').value);

    let validationMessage=validateQuantity(quantity);

    if (validationMessage !=="") {
        document.getElementById("invalidQuantity").innerHTML=validationMessage;
        window.stop();
    } else {
        //redirect to the display_purchase.html page
        let message = `Thank you for ordering ${quantity} things!`;
        document.body.innerHTML = message;
    }
    return false; //prevent form submission
}

function validateQuantity(quantity) {
    let errorMessage= "";

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
            errorMessage = ""; //no errors
            break;
    }

    return errorMessage;
}
