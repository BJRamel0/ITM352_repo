name1 = "HTC";
 price1 = 40.00;
 image1 = "http://dport96.github.io/ITM352/morea/080.flow-control-II/HTC.jpg";

 name2 = "Apple";
 price2 = 75.00;
 image2 = "http://dport96.github.io/ITM352/morea/080.flow-control-II/iphone-3gs.jpg";

 name3 = "Nokia";
 price3 = 35.00;
 image3 = "http://dport96.github.io/ITM352/morea/080.flow-control-II/Nokia.jpg";

 name4 = "Samsung";
 price4 = 45.00;
 image4 = "http://dport96.github.io/ITM352/morea/080.flow-control-II/Samsung.jpg";

 name5 = "Blackberry";
 price5 = 10.00;
 image5 = "http://dport96.github.io/ITM352/morea/080.flow-control-II/Blackberry.jpg";

console.log("Product variables loaded...");

//exercise 1.1
console.log ("exercise 1.1");
let num_products=5;
let productCount=1;
while (productCount <=num_products){
    console.log(productCount);
    productCount++;
}

//exercise 1.2
console.log ();
console.log ("exercise 1.2");
productCount=1;
while(productCount <=num_products) {
    console.log(productCount+'. '+eval('name'+productCount));
    productCount++;
}

//exercise 1.3
console.log ();
console.log ("exercise 1.3");
productCount=1;
while (productCount <=num_products/2) {
    console.log(productCount+'. '+eval('name'+productCount));
    productCount++;
}

//exercise 2.1
console.log ();
console.log ("exercise 2.1");
productCount=1;
while (productCount <=num_products){
    console.log(productCount);
    if (productCount > num_products/2){
        console.log ("That’s enough!");
        break;
    }
    productCount++;
}

//exercise 2.2
console.log ();
console.log ("exercise 2.2");
productCount=1;
let lowerBound=num_products*.25;
let upperBound=num_products*.75;
while(productCount <=num_products) {
    if (productCount >= lowerBound && productCount <= upperBound) {
        console.log(eval('name'+productCount) + ' is sold out');
    } else {
        console.log(productCount+'. '+eval('name'+productCount));
    }
    productCount++;
}

//exercise 2.3
console.log ();
console.log ("exercise 2.3");
productCount=1;
while(productCount<=num_products) {
    if (productCount >= num_products/2) {
        console.log("That’s all we have!");
        //process.exit();
    }
    if (productCount>=lowerBound && productCount<=upperBound) {
        console.log(eval('name'+productCount) + ' is sold out');
    } else {
        console.log(productCount+'. '+eval('name'+productCount));
    }
    productCount++;
}

//exercise 3.1a
console.log ();
console.log ("exercise 3.1a");
for (let i=1; i<=num_products; i++) {
    if (i >= lowerBound && i <= upperBound) {
        console.log(eval('name'+i) + ' is sold out');
    } else {
        console.log(i+'. '+eval('name'+i));
    }
}

//exercise 3.1b
console.log ();
console.log ("exercise 3.1b");
for (let i=1; eval("typeof name"+i)!='undefined'; i++) {
    if (i >= lowerBound && i <= upperBound) {
        console.log(eval('name'+i) + ' is sold out');
    } else {
        console.log(i+'. '+eval('name'+i));
    }
}

//excercise 4.2 || table header ||
document.write('<table border="1"');
document.write('<tr><th>Number</th><th>Item</th></tr>');

//Loop to output oaws
for (let i=1; i <- num_products; i++) {
    document.write('<tr><th>${i}</th><th></th>${eval('name' +i)</tr>')
}

//Close the table
document.write('</tables>');