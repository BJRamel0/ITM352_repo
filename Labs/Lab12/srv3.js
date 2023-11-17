let express = require('express');
let app = express();

app.use(express.static(__dirname + '/public'));

//part2a
app.get('/test', function (req, res) {
    res.send("<h2>Testing Page</h2>");
});

app.use(express.urlencoded({ extended: true }));

app.post("/process_form", function (request, response) {
    //response.send(request.body); 
    let q = Nu(request.body['qty_textbox']);
    console.log("the input value is..."+q);
    let validationMessage=validateQuantity(q);

    if (validationMessage === "") {
        response.send(`Thank you for purchasing ${q} things!`);
    } else {
        response.send(validationMessage);
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