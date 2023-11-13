let express = require('express');
let app = express();

app.use(express.static(__dirname + '/public'));

//part2a 
app.get('/test', function (req, res) {
    res.send("<h2>Testing Page</h2>");
});

let products = require(__dirname + '/products.json');
products.forEach( (prod,i) => {prod.total_sold = 0});

app.get("/products.js", function (request, response, next) {
   response.type('.js');
   let products_str = `let products = ${JSON.stringify(products)};`;
   response.send(products_str);
});

app.use(express.urlencoded({ extended: true }));

app.post("/process_form", function (request, response) {
    let brand = products[0]['brand'];
    let brand_price = products[0]['price'];

    //response.send(request.body); 
    let q = Number(request.body['qty_textbox']);
    console.log("the input value is..."+q);

    //increments the number of items sold for the first item in products
    products[0].total_sold +=q;

    
    let validationMessage=validateQuantity(q);

    if (validationMessage === "") {
        //response.send(`<h2>Thank you for purchasing ${q} ${brand}. Your total is \$${q * brand_price}!</h2>`);
        response.redirect('receipt.html?quantity='+q);
    } else {
        response.redirect(`order.html?error=${validationMessage}&qty_textbox=${q}`);
    }
});

app.all('*', function (request, response, next) {
    console.log(request.method + 'to path' + request.path);
    next();
});

app.listen (8080, () => console.log('listening on port 8080')); //note the use of an anonymous function here to do a callback

function validateQuantity(quantity) {
    switch (true) {
        case isNaN(quantity):
            return "\nNot a number!";
            break;
        case quantity < 0:
            return "\nNegative value!";
            break;
        case !Number.isInteger(quantity):
            return "\nNot an integer";
            break;
        default:
            return ""; //no errors
            break;
    }
} 