/*----------------------server.js---------------------------*/ 
// Importing the Express.js framework 
const express = require('express');

// Create an instance of the Express application called "app"
// app will be used to define routes, handle requests, etc
const app = express();

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Middleware to serve static files from a directory named "public"
app.use(express.static(__dirname + '/public'));

// Middleware to log all requests regardless of their method (GET, POST, PUT, etc) and their path (URL)
app.all('*', function (request, response, next) {
    console.log(request.method + ' to ' + request.path);
    next();
});

// Import data from a JSON file containing information about products
// __dirname represents the directory of the current module (where server.js is located)
// __dirname + ".products.json" specifies the location of products.json
const products = require(__dirname + '/products.json');

// Define a route for handling a GET request to a path that matches "./products.js"
app.get('/products.js', function (request, response, next) {
    // Send the response as JS
    response.type('.js');

    // Create a JS string (products_str) that contains data loaded from the products.json file
    // Convert the JS string into a JSON string and embed it within variable products
    const products_str = `let products = ${JSON.stringify(products)};`;

    // Send the string in response to the GET request
    response.send(products_str);
});

// Define a route for handling a POST request to the "/process_purchase" path
app.post('/process_purchase', (req, res) => {
    // Initialize variables
    const POST = req.body;
    let has_aty = false;
    const error = {};

    // Get the quantities ordered for the current products from POST
    let quantityOrdered = POST['quantity_textbox'].map(Number);

    // Check if all values in quantityOrdered are valid numbers
    if (quantityOrdered.some(isNaN)) {
        // At least one value is not a valid number, redirect to products.html with an error message
        res.redirect('/products.html?error=Invalid quantity values');
        return; // Stop further execution
    }

    // Iterate through each product
    for (let i in quantityOrdered) {
        // The code validates user-entered quantities for purchase against available stock. It updates data structures and flags based on the validation results
        let validationErrors = validateQuantity(quantityOrdered[i], products[i]['qty_available']);

        // If there are validation errors, redirect to products.html with an error message
        if (validationErrors !== null) {
            const errorMessages = encodeURIComponent(JSON.stringify(validationErrors));
            res.redirect(`/products.html?error=${errorMessages}`);
            return; // Stop further execution
        }

        // Update has_aty to true if any quantity is greater than zero
        if (quantityOrdered.some(qty => qty > 0)) {
            has_aty = true;
        }

        // Store any error messages in error if there are validation errors
        if (validationErrors !== '') {
            error[i] = validationErrors;
        }
    }

    // Check conditions and redirect accordingly
    if (!has_aty) {
        // No quantities are selected and there are no errors
        // Redirect to products page with an error query parameter
        res.redirect('/products.html?error=No quantities selected');
    } else if (has_aty) {
        // Quantities are selected
        // Update product quantities and redirect to invoice page
        products.forEach((product, index) => {
            product.qty_sold += quantityOrdered[index];
            product.qty_available -= quantityOrdered[index];
        });
        // Redirect to invoice page with valid order data in the query string
        const orderData = encodeURIComponent(JSON.stringify(quantityOrdered));
        res.redirect('/invoice.html?quantity=' + orderData);
    } else {
        // There are validation errors or the order is invalid
        // Redirect to products page with error messages in the query string
        const errorMessages = encodeURIComponent(JSON.stringify(error));
        res.redirect(`/products.html?error=${errorMessages}`);
    }
});

// Function to validate the quantity
function validateQuantity(quantity, availableQuantity) {
    // Initialize an empty array to store error messages
    const errors = [];

    // Convert quantity to a number
    let quantitys = Number(quantity);

    // Reset the errors array
    errors.length = 0;

    // Use a switch statement to check various conditions
    switch (true) {
        case isNaN(quantitys) || quantitys === "":
            errors.push("Not a number");
            break;
        case quantitys < 0 && !Number.isInteger(quantitys):
            errors.push("Negative inventory and not an Integer");
            break;
        case quantitys < 0:
            errors.push("Negative inventory");
            break;
        case !Number.isInteger(quantitys):
            errors.push("Not an Integer");
            break;
        case quantitys > availableQuantity:
            errors.push("Insufficient stock");
            break;

        // Default case (no validation error)
        default:
            break;
    }

    // Return the errors array if there are any validation errors
    if (errors.length > 0) {
        return errors;
    } else {
        return null; // Return null if no validation errors
    }
}

const fs = require('fs'); // Import the file system module

app.post('/process_login', (req, res) => {
    const { email, password, quantities } = req.body; // Assuming you're using body-parser or a similar middleware for parsing request body
    const error = {};

    // Check for empty email or password
    if (!email || !password) {
        // Redirect back to login with error message and sticky email
        return res.redirect('/login.html?error=Email and password are required&email=' + encodeURIComponent(email));
    }

    // Read user_data.json file
    const user_data = JSON.parse(fs.readFileSync('user_data.json', 'utf8'));

    // Check if email exists in user_data
    if (user_data.hasOwnProperty(email)) {
        // If email exists, check password
        const user = user_data[email];

        if (user.password !== password) {
            // Password doesn't match, redirect back to login with error message and sticky email
            return res.redirect('/login.html?error=Incorrect password&email=' + encodeURIComponent(email));
        }
    } else {
        // If email doesn't exist in user_data, redirect back to login with an appropriate error message and sticky email
        return res.redirect('/login.html?error=Email not found&email=' + encodeURIComponent(email));
    }

    // No input errors, proceed to invoice
    const queryParams = quantities ? `quantities=${encodeURIComponent(quantities)}` : '';
    res.redirect('/invoice.html?' + queryParams);
});


app.post('/purchase_logout', (req, res) => {
    
});

app.post('/continue_shopping', (req, res) => {
    
});

app.post('/process_register', (req, res) => {
    // Retrieve request body and server-side validation
    const new_user = req.body.username;
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const repeat_password = req.body.repeat_password;

    // Initialize variables for error handling and response messages
    let errors = false;
    let response_msg = "";

    // Input validation
    // Name validation: input between 2-30 and only letters
    const nameRegex = /^[a-zA-Z]{2,30}$/;
    if (!nameRegex.test(name)) {
        response_msg = 'Invalid name. Please enter a name between 2 and 30 characters containing only letters.';
        errors = true;
    }

    // Email validation: Email not blank and in email format
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
        response_msg = 'Invalid email format. Please enter a valid email address.';
        errors = true;
    }

    // Password validation: Password 10-16, 1 lowercase, 1 uppercase, 1 number, 1 special character
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,16}$/;
    if (!passwordRegex.test(password)) {
        response_msg = 'Invalid password format. Password must be 10-16 characters, with at least one lowercase letter, one uppercase letter, one number, and one special character.';
        errors = true;
    }

    // Confirm password validation: Confirm password matches
    if (password !== repeat_password) {
        response_msg = 'Repeat password does not match with the password.';
        errors = true;
    }

    // Input errors, redirect back to register with error message and sticky data
    if (errors) {
        res.redirect(`./register.html?error=${response_msg}&name=${name}&email=${email}`);
    } else {
        // No input errors, redirect to invoice with selected quantities
        res.redirect(`./invoice.html?username=${new_user}&name=${name}&email=${email}`);
    }
});


// Start the server; listen on port 8080 for incoming HTTP requests
app.listen(8080, () => console.log(`Server is listening on port 8080`));