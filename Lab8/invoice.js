// Product 1
let item1 = 'Gillette Sensor 3 Razor';
let quantity1 = 2;
let price1 = 1.23;
//let extendedPrice1 = quantity1 * price1;

// Product 2
let item2 = 'Barbasol Shaving Cream';
let quantity2 = 1;
let price2 = 2.64;
let extendedPrice2 = quantity2 * price2;

// Product 3
let item3 = 'Nautica Cologne';
let quantity3 = 1;
let price3 = 6.17;
let extendedPrice3 = quantity3 * price3;

// Product 4
let item4 = 'Rubbing Alcohol';
let quantity4 = 3;
let price4 = 0.98;
let extendedPrice4 = quantity4 * price4;

// Product 5
let item5 = 'Colgate Classic Toothbrush';
let quantity5 = 12;
let price5 = 1.89;
let extendedPrice5 = quantity5 * price5;

//lab8 1.1
let product1 = {
    itemName: 'Gillette Sensor 3 Razor',
    quantity: 2,
    price: 1.23
};
//lab8 1.3: setting object to 0
product1.quantity = 0;

//lab8 1.2: ExtendedPrice from item1 to product 1
let extendedPrice1 = product1.quantity * product1.price;

//Subtotal
let subtotal = extendedPrice1 + extendedPrice2 + extendedPrice3 + extendedPrice4 + extendedPrice5;

//Sales Tax, Tax Rate = 5.75%
let salesTax = subtotal * 0.0575;

let total = salesTax + subtotal;

//DOM
let table = document.getElementById('invoiceTable');

// item row 1... Lab8 1.2 changed item1 to product1
let row = table.insertRow();
row.insertCell(0).innerHTML = product1.itemName; 
row.insertCell(1).innerHTML = product1.quantity;
row.insertCell(2).innerHTML = '$' + product1.price.toFixed(2);
row.insertCell(3).innerHTML = '$'+ extendedPrice1;

row = table.insertRow();
row.insertCell(0).innerHTML = item2; 
row.insertCell(1).innerHTML = quantity2;
row.insertCell(2).innerHTML = '$' + price2.toFixed(2);
row.insertCell(3).innerHTML = '$'+ extendedPrice2;

row = table.insertRow();
row.insertCell(0).innerHTML = item3; 
row.insertCell(1).innerHTML = quantity3;
row.insertCell(2).innerHTML = '$' + price3.toFixed(2);
row.insertCell(3).innerHTML = '$'+ extendedPrice3;

row = table.insertRow();
row.insertCell(0).innerHTML = item4; 
row.insertCell(1).innerHTML = quantity4;
row.insertCell(2).innerHTML = '$' + price4.toFixed(2);
row.insertCell(3).innerHTML = '$'+ extendedPrice4;

row = table.insertRow();
row.insertCell(0).innerHTML = item5; 
row.insertCell(1).innerHTML = quantity5;
row.insertCell(2).innerHTML = '$' + price5.toFixed(2);
row.insertCell(3).innerHTML = '$'+ extendedPrice5;

//Set 
document.getElementById('subtotal_cell').innerHTML= '$'+subtotal.toFixed(2);
document.getElementById('tax_cell').innerHTML= '$'+salesTax.toFixed(2);
document.getElementById('total_cell').innerHTML= '$'+total.toFixed(2);

