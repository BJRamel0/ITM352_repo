// Importing required modules
const express = require('express');
const fs = require('fs');
const app = express();

// Middleware for parsing form data
app.use(express.urlencoded({ extended: true }));

// File path for user data
const filename = __dirname + '/user_data.json';

// Variables to store user data, order details, and active user count
let user_reg_data;
let quantityOrdered;
let orderData = [];
let email;
let activeUserCount = 0;

// Check if the user data file exists
if (fs.existsSync(filename)) {
    let data = fs.readFileSync(filename, 'utf-8');
    user_reg_data = JSON.parse(data);
    let user_stats = fs.statSync(filename);
    console.log(`The file name ${filename} has ${user_stats.size} characters.`);
} else {
    console.log(`The file name ${filename} does not exist.`);
}

// Middleware to serve static files from the "public" directory
app.use(express.static(__dirname + '/public'));

// Middleware to log all requests
app.all('*', function (request, response, next) {
    console.log(request.method + ' to ' + request.path);
    next();
});

// Import data from a JSON file containing information about products
const products = require(__dirname + '/products.json');

// Route for handling a GET request to "/products.js"
app.get('/products.js', function (request, response, next) {
    response.type('.js');
    const products_str = `let products = ${JSON.stringify(products)};`;
    response.send(products_str);
});

// Route for handling a POST request to "/process_purchase"
app.post('/process_purchase', (req, res) => {
    // Initialize variables
    const POST = req.body;
    let has_aty = false;
    const error = {};

    // Get the quantities ordered for the current products from POST
    quantityOrdered = POST['quantity_textbox'].map(Number);
    orderData = encodeURIComponent(JSON.stringify(quantityOrdered));

    // Function to validate quantity
    function validateQuantity(quantity, availableQuantity) {
        const errors = [];
        let quantitys = Number(quantity);
        errors.length = 0;

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
            default:
                break;
        }

        if (errors.length > 0) {
            return errors;
        } else {
            return null;
        }
    }

    if (user_reg_data && user_reg_data[email] && user_reg_data[email].status === 'active') {
        if (quantityOrdered.some(isNaN)) {
            res.redirect('/products.html?error=Invalid quantity values');
            return;
        }

        for (let i in quantityOrdered) {
            let validationErrors = validateQuantity(quantityOrdered[i], products[i]['qty_available']);

            if (validationErrors !== null) {
                const errorMessages = encodeURIComponent(JSON.stringify(validationErrors));
                res.redirect(`/products.html?error=${errorMessages}`);
                return;
            }

            if (quantityOrdered.some(qty => qty > 0)) {
                has_aty = true;
            }

            if (validationErrors !== '') {
                error[i] = validationErrors;
            }
        }

        if (!has_aty) {
            res.redirect('/products.html?error=No quantities selected');
        } else if (has_aty) {
            res.redirect(`/invoice.html?quantity=${orderData}&users=${activeUserCount}&email=${email}`);
        } else {
            const errorMessages = encodeURIComponent(JSON.stringify(error));
            res.redirect(`/products.html?error=${errorMessages}`);
        }
    } else {
        if (quantityOrdered.some(isNaN)) {
            res.redirect('/products.html?error=Invalid quantity values');
            return;
        }

        for (let i in quantityOrdered) {
            let validationErrors = validateQuantity(quantityOrdered[i], products[i]['qty_available']);

            if (validationErrors !== null) {
                const errorMessages = encodeURIComponent(JSON.stringify(validationErrors));
                res.redirect(`/products.html?error=${errorMessages}`);
                return;
            }

            if (quantityOrdered.some(qty => qty > 0)) {
                has_aty = true;
            }

            if (validationErrors !== '') {
                error[i] = validationErrors;
            }
        }

        if (!has_aty) {
            res.redirect('/products.html?error=No quantities selected');
        } else if (has_aty) {
            res.redirect('/login.html');
        } else {
            const errorMessages = encodeURIComponent(JSON.stringify(error));
            res.redirect(`/products.html?error=${errorMessages}`);
        }
    }
});

// Route for handling a POST request to "/process_login"
app.post('/process_login', (req, res) => {
    email = req.body.email;
    let { password, quantities } = req.body;
    const error = {};

    const user_data = JSON.parse(fs.readFileSync('user_data.json', 'utf8'));

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
        email = "";
    }

    if (!email || !password) {
        return res.redirect('/login.html?error=Email and password are required&email=' + encodeURIComponent(email));
    }

    if (user_data.hasOwnProperty(email)) {
        const user = user_data[email];

        if (user.password !== password) {
            return res.redirect('/login.html?error=Incorrect password&email=' + encodeURIComponent(email));
        }
    } else {
        return res.redirect('/login.html?error=Email not found&email=' + encodeURIComponent(email));
    }

    user_reg_data[email].status = "active";
    activeUserCount++;
    fs.writeFileSync(filename, JSON.stringify(user_reg_data), 'utf-8');
    res.redirect(`/invoice.html?quantity=${orderData}&users=${activeUserCount}&email=${email}`);
});

// Route for handling a POST request to "/purchase_logout"
app.post('/purchase_logout', (req, res) => {
    products.forEach((product, index) => {
        product.qty_sold += quantityOrdered[index];
        product.qty_available -= quantityOrdered[index];
    });
    user_reg_data[email].status = "inactive";
    activeUserCount--;
    fs.writeFileSync(filename, JSON.stringify(user_reg_data), 'utf-8');
    thankYou = encodeURIComponent("Thank you for shopping at BJ's Black Market");
    res.redirect(`/index.html?error=${thankYou}`);
});

// Route for handling a POST request to "/continue_shopping"
app.post('/continue_shopping', (req, res) => {
    res.redirect(`/products.html?quantity=${orderData}&users=${activeUserCount}&email=${email}`);
});

// Route for handling a POST request to "/process_register"
app.post('/process_register', (req, res) => {
    let new_user = req.body.username;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    email = req.body.email;
    const password = req.body.password;
    const repeat_password = req.body.repeat_password;

    let errors = false;
    let response_msg = "";

    const nameRegex = /^[a-zA-Z]{2,30}$/;
    const emailRegex = /\S+@\S+\.\S+/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,16}$/;

    switch (true) {
        case !nameRegex.test(firstName):
            response_msg = 'Invalid first name. Please enter a name between 2 and 30 characters containing only letters.';
            errors = true;
            break;

        case !emailRegex.test(email):
            response_msg = 'Invalid email format. Please enter a valid email address.';
            errors = true;
            break;

        case typeof user_reg_data[email] !== 'undefined':
            response_msg = 'Email (username) is already taken. Please enter a different email.';
            errors = true;
            break;

        case !passwordRegex.test(password):
            response_msg = 'Invalid password format. Password must be 10-16 characters, with at least one lowercase letter, one uppercase letter, one number, and one special character.';
            errors = true;
            break;

        case password !== repeat_password:
            response_msg = 'Repeat password does not match with the password.';
            errors = true;
            break;

        default:
            if (typeof user_reg_data[email] !== 'undefined') {
                response_msg = 'Email (username) is already taken. Please enter a different email.';
                errors = true;
            } else {
                user_reg_data[email] = {};
                user_reg_data[email].firstName = firstName;
                user_reg_data[email].password = password;
                user_reg_data[email].status = "active";
                user = "active";
                activeUserCount++;
                fs.writeFileSync(filename, JSON.stringify(user_reg_data), 'utf-8');
            }
            break;
    }

    if (errors) {
        const errorMessage = encodeURIComponent(response_msg);
        res.redirect(`./register.html?error=${response_msg}&firstName=${firstName}&lastName=${lastName}&email=${email}`);
    } else {
        res.redirect(`./invoice.html?quantity=${orderData}&users=${activeUserCount}&name=${firstName}&email=${email}`);
    }
});

// Start the server; listen on port 8080 for incoming HTTP requests
app.listen(8080, () => console.log(`Server is listening on port 8080`));