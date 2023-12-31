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
//document.write("<tr><th>Product #</th><th>Quantity</th></tr>");

//lab8 3.2
document.write("<tr><th>Product #</th><th>Name</th><th>Price</th><th>Quantity</th><th>Extended Cost</th></tr>");


for (let i=0; i < product_quantities.length; i++) {

    //lab8 3.2
    let quantity=product_quantities[i];
    let product=products[i];
    let extended_cost=quantity*product.price;

    document.write("<tr>");
    document.write("<td>"+(i+1)+"</td>"); //product #
    document.write("<td>"+product.name+"</td>"); //Name
    document.write("<td>"+product.price.toFixed(2)+"</td>"); //Price
    document.write("<td>"+product_quantities[i]+"</td>"); //Quantity
    document.write("<td>"+extended_cost.toFixed(2)+"</td>"); //Extended Cost
    document.write("</tr>");
}
document.write("</table>");

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
}

//add click event
document.addEventListener('DOMContentLoaded', function () {
    let table=document.querySelector('table');
    table.addEventListener('click', addNewRow);
});