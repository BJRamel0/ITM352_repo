// invoice3.js

//import data from products.js into this file
import { itemData, quantity } from './products.js';

let subtotal=0;
let taxRate=0.0575; //5.75%
let taxAmount=0;
let total=0;
let shipping;

generateItemRows();

//Shipping based on sub-total
if (subtotal <= 50) {
    shipping=2;
} else if (subtotal <= 100) {
    shipping=5;
} else {
    shipping=subtotal*0.05; //5% of subtotal
}

//total including shipping
taxAmount=subtotal*taxRate;
total=subtotal+taxAmount+shipping;

// Set the subtotal, tax, and total cells
document.getElementById('subtotal_cell').innerHTML = '$' + subtotal.toFixed(2);
document.getElementById('tax_cell').innerHTML = '$' + taxAmount.toFixed(2);
document.getElementById('shipping_cell').innerHTML = '$' +shippingCharge.toFixed(2);

//there are many ways to code the validateQuantity function... here is one.
function validateQuantity(quantity) {
    if (isNaN(quantity)) {
      return "Not a number";
    } else if (quantity < 0 && !Number.isInteger(quantity)) {
      return "Negative inventory and not an Integer";
    } else if (quantity < 0) {
      return "Negative inventory";
    } else if (!Number.isInteger(quantity)) {
      return "Not an Integer";
    } else {
      return ""; // No errors
    }
  }
  

  // Function to generate item rows and apply quantity validation
function generateItemRows() {
    // Get the table element to populate
    let table = document.getElementById('invoiceTable');
  
    // Clear the table content
    table.innerHTML = '';
  
    // Initialize variable to keep track of errors
    let hasErrors = false;
  
    // Loop through the itemData and quantity arrays
    for (let i = 0; i < itemData.length; i++) {
      let item = itemData[i];
      let itemQuantity = quantity[item.quantityIndex];
  
      // Validate the quantity
      let validationMessage = validateQuantity(itemQuantity);
  
      // If there are validation errors, display the item with an error message
      if (validationMessage !== "") {
        hasErrors = true;
        let row = table.insertRow();
        row.insertCell(0).innerHTML = item.brand;
        row.insertCell(1).innerHTML = validationMessage;
      } else if (itemQuantity > 0) {
        // Calculate the extended price if quantity is valid and positive
        let extendedPrice = item.price * itemQuantity;
        subtotal += extendedPrice;
  
        // Display the item with the calculated extended price
        let row = table.insertRow();
        row.insertCell(0).innerHTML = item.brand;
        row.insertCell(1).innerHTML = itemQuantity;
        row.insertCell(2).innerHTML = '$' + item.price.toFixed(2);
        row.insertCell(3).innerHTML = '$' + extendedPrice.toFixed(2);
      }
    }
  
    // If there are no errors, display the total
    if (!hasErrors) {
      document.getElementById('total_cell').innerHTML = '$' + total.toFixed(2);
    }
  }