//import data from products.js into this js file
import { itemData, quantity } from './products.js';


generateItemRows();

//Calculate extended prices for each item using a loop and increment subtotal
let extendedPrices=[];
let subtotal=0;
for (let i=0; i<itemData.length; i++) {
    let item=itemData[i];
    let itemQuantity=quantity[item.quantityIndex];
    let extendedPrice=item.price*itemQuantity;
    subtotal+=extendedPrice;
    extendedPrices.push(extendedPrice);
}

//Sales Tax
let taxRate=0.0575; //5.75%
let taxAmount=subtotal*taxRate;

//Total
let total=subtotal+taxAmount;

//Populate table rows using DOM manipulation
let table=document.getElementById('invoiceTable');

//Shipping based on sub-total
let shippingCharge = 0;

if (subtotal <= 50) {
    shippingCharge=2;
} else if (subtotal <= 100) {
    shippingCharge=5;
} else {
    shippingCharge=subtotal*0.05; //5% of subtotal
}

//Total + Shipping
total = subtotal+taxAmount+shippingCharge;

//Populate rows
/*
for (let i=0; i<itemData.length; i++) {
    let row=table.insertRow();
    row.insertCell(0).innerHTML=itemData[i].brand;
    row.insertCell(1).innerHTML=quantity[itemData[i].quantityIndex];
    row.insertCell(2).innerHTML="$"+itemData[i].price.toFixed(2);
    row.insertCell(3).innerHTML="$"+extendedPrices[i].toFixed(2);
}*/

//Set total cell in bold
document.getElementById('total_cell').innerHTML=`$${total.toFixed(2)}`;

//Set subtotal, tax, and shipping
document.getElementById('subtotal_cell').innerHTML= '$'+subtotal.toFixed(2);
document.getElementById('tax_cell').innerHTML= '$'+salesTax.toFixed(2);
document.getElementById('shipping_cell').innerHTML= '$'+shipping.toFixed(2);

//ValidateQuantity function
function validateQuantity(quantity) {
    function validateQuantity(quantity) {
        switch (true) {
            case isNaN(quantity):
                return "Not a number. Please enter a non-negative quantity to order.";
                break;
            case quantity < 0 && !Number.isInteger(quantity):
                return "Negative inventory and not an Integer. Please enter a non-negative quantity to order.";
                break;
            case quantity < 0:
                return "Negative inventory. please enter a non-negative quantity to order.";
                break;
            case !Number.isInteger(quantity):
                return "Not an Integer. please enter a non0egative quantity to order.";
                break;
            default:
                return ""; //no errors
                break;
        }
    } 
}

function generateItemRows() {
    //Populate with table elements
    let table=document.getElementById('invoiceTable');

    //clear table content
    table.innerHTML="";

    //intialize variable to keep track of errors
    let hasErrors=false;

    //Loop through itemData and quantity arrays
    for (let i=0; i<itemData.length; i++) {
        let item=itemData[i];
        let itemQuantity=quantity[item.quantityIndex];
    }

    //Validate Quantity
    let validationMessage=validateQuantity(itemQuantity);

    //If validation errors occur, display item with error message
    if (validationMessage !== "") {
        hasErrors=true;
        let row=table.insertRow();
        row.insertCell(0).innerHTML=item.brand;
        row.insertCell(1).innerHTML=validationMessage;
    } else if (itemQuantity > 0) {
        //Calculate extended price if uantity is valid and positive
        let extendedPrice=item.price*itemQuantity;
        subtotal+=extendedPrice;

        //Display item with calculated extended price
        let row=table.insertRow();
        row.insertCell(0).innerHTML=itemData[i].brand;
        row.insertCell(1).innerHTML=quantity[itemData[i].quantityIndex];
        row.insertCell(2).innerHTML="$"+itemData[i].price.toFixed(2);
        row.insertCell(3).innerHTML="$"+extendedPrices[i].toFixed(2);
    }

    //If no errors, display total
    if (!hasErrors) {
        document.getElementById('total_cell').innerHTML="$"+total.toFixed(2);
    }
}
