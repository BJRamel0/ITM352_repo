//Define the product_quantities array
let product_quantities=[2,1,1,3,12];

// array of all products
// corresponds to product_quantities array
// product_quantities[i] is the quantity for products[i]
products = [
    { 'name': 'small gumball', 'price': 0.02 },
    { 'name': 'medium gumball', 'price': 0.05 },
    { 'name': 'large gumball', 'price': 0.07 },
    { 'name': 'small jawbreaker', 'price': 0.06 },
    { 'name': 'large jawbreaker', 'price': 0.10 }
];

//Iterate through product_quantities and print each element in a table
document.write("<table>");

//lab8 3.2
document.write("<tr><th>Product #</th><th>Name</th><th>Price</th><th>Quantity</th><th>Extended Cost</th></tr>");


for (let i=0; i < product_quantities.length; i++) {
    let table=document.querySelector('table');

    //lab8 3.2
    let quantity=product_quantities[i];
    let product=products[i];
    let extended_cost=quantity*product.price;

    //lab8 3.3 Create new row for each product
    let newRow=document.createElement('tr');
    newRow.innerHTML=`
        <td>${i+1}</td>
        <td>${product.name}</td>
        <td>${product.price.toFixed(2)}</td>
        <td>${quantity}</td>
        <td>${extended_cost.toFixed(2)}</td>
    `;

    //Append new row to table
    document.querySelector('table').appendChild(newRow);

    //Hover effect
    newRow.addEventListener('mouseover', function() {
        newRow.style.backgroundColor='Yellow';
    });
    newRow.addEventListener('mouseout', function() {
        newRow.style.backgroundColor='';
    });
    newRow.addEventListener('click', function() {
        table.deleteRow(newRow.rowIndex);
    });

}
//document.write("</table>");

//Lab8 4.3 addButton
let addButton=document.createElement('button');
addButton.textContent='Add Last Row';
addButton.addEventListener('click', addNewRow);
document.body.appendChild(addButton);

//Lab8 4.1
//addNewRow
function addNewRow () {
    let table=document.querySelector('table');

    let newRow=table.insertRow();
    newRow.innerHTML=`
        <td> blank </td>
        <td> blank </td>
        <td> blank </td>
        <td> blank </td>
        <td> blank </td>
    
    `;

    //Hover effect
    newRow.addEventListener('mouseover', function() {
        newRow.style.backgroundColor='Yellow';
    });
    newRow.addEventListener('mouseout', function() {
        newRow.style.backgroundColor='';
    });

    newRow.addEventListener('click', function() {
        table.deleteRow(newRow.rowIndex);
    });
}

/*
//Lab 8 4.3
//Function delete clicked row of table
function deleteClickedRow() {
    let table=document.querySelector('table');
    let rowCount=table.rows.length; //table row count

    if(rowCount>1) {
        table.deleteRow(rowCount-1);//deletes last row
    };
};
*/