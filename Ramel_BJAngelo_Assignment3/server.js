// Importing required modules
const express = require('express');
const fs = require('fs');
const app = express();

const session = require('express-session');
app.use(session({secret: "BackKey", resave: true, saveUninitialized: true}));

const cookieParser = require('cookie-parser');
const {request} = require('http');
app.use(cookieParser());

const qs = require('querystring');

// Middleware for parsing form data
app.use(express.urlencoded({ extended: true }));

// File path for user data
const filename = __dirname + '/user_data.json';

// Variables to store user data, order details, and active user count
let user_reg_data;
let quantityOrdered;
let orderData = [];
let activeUserCount = 0;
let status = {};

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

// Start the server; listen on port 8080 for incoming HTTP requests
app.listen(8080, () => console.log(`Server is listening on port 8080`));


// Middleware to log all requests
app.all('*', function (request, response, next) {
    console.log(request.method + ' to ' + request.path);

    //From sample code in module 19
    if (typeof request.session.cart == 'undefined') {
        request.session.cart = {};
    }

    if (typeof request.session.users == 'undefined') {
        request.session.users = Object.keys(status).length;
    }
    
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

/*
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

    if (user_reg_data[email] && user_reg_data[email].status === 'active') {
        if (quantityOrdered.some(isNaN)) {
            res.redirect('/products.html?error=Invalid quantity values');
            return;
        }

        for (let i in quantityOrdered) {
            let validationErrors = validateQuantity(quantityOrdered[i], products[i]['qty_available']);

            if (validationErrors !== null) {
                const errorMessages = encodeURIComponent(JSON.stringify(validationErrors));
                res.redirect(`/products.html?error=${errorMessages}&email=${email}`);
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
            res.redirect(`/products.html?error=${"No quantities selected"}&email=${email}`);
        } else if (has_aty) {
            res.redirect(`/invoice.html?quantity=${orderData}&users=${activeUserCount}&email=${email}`);
        } else {
            const errorMessages = encodeURIComponent(JSON.stringify(error));
            res.redirect(`/products.html?error=${errorMessages}&email=${email}`);
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
*/

app.post('/cart_add', (req, res) => {
    let POST = req.body;
    let products_key = POST['products_key'];
    let errorObject = {};

    for (let i in products[products_key]) {
        let qty = POST['quantity_textbox'].map(Number);

        let errorMessages = validateQuantity(qty, products[products_key][i].qty_avaliable);
        if (errorMessages.length > 0) {
            errorObject[`qty${[i]}_error`] = errorMessages.join(', ');
        }
        console.log('error messages are:' + errorMessages);
    }

    console.log("errorObject = " + Object.keys(errorObject)+ " " + Object.keys(errorObject).length);
    
    if (Object.keys(errorObject).length == 0) {
        if (!req.session.cart) {
            req.session.cart = {};
        }

        if (typeof req.session.cart[products_key] == 'undefined') {
            req.session.cart[products_key] = [];
        }

        let user_qty;

        for (let i in products[products_key]) {
            user_qty.push(POST['quantity_textbox'].map(Number)); 
        }

        // Set user_qty in the session 
		req.session.cart[products_key] = user_qty;
    
		// Redirect the user to the appropriate page
		res.redirect(`/products.html?products_key=${POST['products_key']}`);
    } else {
		// Redirect the user to the appropriate page
		res.redirect(`/products.html?${qs.stringify(POST)}&inputErr`);
	}

});

// Route for handling a POST request to "/process_login"
app.post('/process_login', (req, res) => {
    let { password, quantities, email } = req.body;
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

    //Store the user's email and name in the cookie
    let user_cookie = {"email": email, "name": user_data[email]['name']};

    //Response with the user's cookie as a JSON string and set expiration
    res.cookie('user_cookie', JSONstringify(user_cookie), {maxage: 900 * 1000});
    console.log(user_cookie);

    // Update the number of active users;
    req.session.users = Object,keys(status).length;
    console.log(`Current users: ${Object.keys(status).length} - ${Object.keys(status)}`);


    fs.writeFile(__dirname + filename, JSON.stringify(user_data), 'utf-8', (err) => {
        if (err) throw err;
        console.log('User data has been updated');
    })

    res.redirect(`/invoice.html?quantity=${orderData}&users=${activeUserCount}&email=${email}`);
});

// Route for handling a POST request to "/process_register"
app.post('/process_register', (req, res) => {
    let new_user = req.body.username;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    let email = req.body.email;
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

app.post('/update_shopping_cart', function (req, res) {
    let POST = req.body;

    let products_key = POST['products_key'];

    for (products_key in request.session.cart) {
        for (let i in request.session.cart[products_key]) {
            request.session.cart[products_key][i] = Number(request.body[`cartInput_${products_key}${i}`]);
        }
    }

    response.redirect('/cart.html');
});

app.post('/get_cart', function (req, res) {
    response.json(request.session.cart);
});

app.post('/continues', function (req, res) {
    res.redirect('/products.html?');
});

app.post('/checkouts', function (req, res) {
    if (typeof request.cookies['user_cookie'] == 'undefined') {
        response.redirect('/login.html?')
    } else {
        response.redirect('/invoice.html?valid')
    }
});

app.post('/complete_purchase', function (req, res) {
    let cookie = JSON.parse(request.cookies['user_cookie']);
    let email = cookie['email'];

    let subtotal = 0;
    let total = 0;

    // Create start of the invoice table
    let invoice_str =  `
        Thank you for your order!
            <table>
            <!-- Table header -->
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Extended Price</th>
                    </tr>
                </thead>
                <tbody>
    `;      

    let shopping_cart = request.session.cart;

    for (let products_key in products) {
        for (let i in products[products_key]) {
            if (typeof shopping_cart[products_key] == 'undefined') continue;

            let qty = shopping_cart[products_key][i];

            products[products_key][i].qty_sold += Number(qty);
            products[products_key][i].qty_avaliable -= Number(qty) || 0;
        }
    }

    fs.writeFile(__dirname + '/products.json', JSON.stringify(products), 'utf-8', (err) => {
        if (err) {
            console.error('Error updating products data:', err);
        } else {
            console.log('Products data has been updated');
        }
    });

    for (let products_key in products) {
        for (let i in products[products_key]) {
            if (typeof shopping_cart[products_key] == 'undefined') continue;

            let qty = shopping_cart[products_key][i];
            if (qty > 0) {
                let extended_price = qty * products[products_key][i].price;
                subtotal += extended_price;
                invoice_str += `
                    <tr>
                        <td>${products[products_key][i].name}</td>
                        <td>${qty}</td>
                        <td>${products[products_key] [i]-qty_available - qty}</td>
                        <td>$${products[products_key][i]-price.toFixed(2)}</td>
                        <td>$${extended_price}</td>
                    </tr>
                `;
            }

            products[products_key][i].qty_sold += Number(qty);
            products[products_key][i].qty_avaliable -= Number(qty) || 0;
        }
    }

    let taxRate = 0.0575; // 5.75%
    taxAmount = subtotal * taxRate;

    // Calculate shipping based on sub-total
    if (subtotal == 0) {
        shipping = 0;
    } else if (subtotal <= 2000) {
        shipping = 500;
    } else if (subtotal <= 200000) {
        shipping = 5000;
    } else {
        shipping = subtotal * 0.05; // 5% of subtotal
    }
    total = Number(taxAmount + subtotal + shipping);

    invoice_str += `
        <tr style="border-top: 2px solid black;">
            <td colspan="4" style="text-align: center;">Sub-total</td>
            <td>$${subtotal.toFixed(2)}</td>
        </tr>
        <tr>
            <td colspan="4" style="text-align: center;">Tax @ ${Number(taxRate) * 100}%</td>
            < d>$${taxAmount.toFixed(2)}</td>
        </tr>
        <tr>
            <td colspan="4" style="text-align: center;">Shipping</td> <td>${shipping}</td>
        </tr>
        <tr>
            <td colspan="4" style="text-align:center;"><b>Total</td>
            <td><b>55${total.toFixed(2)}</td>
        </tr>
        </tbody>
        </table>
    `;

    request.session.destroy(); //clear cart 
    response.send (invoice_str);
});

app.post('/process_logout', function (req, res) {
    let cookie = JSON.parse(request.cookies['user_cookie']);
    let email = cookie['email'];

    if (user_data[email] && user_data[email].status == "active") {
        delete staus[email];
        user_data[email].status = "inactive";
        response.clearCookie("user_cookie");

        request.session.users = Objectkeys(status).length;

        fs.writeFile(filename, JSON.stringify(user_data), 'utf-8', (err) =>{
            if (err) {
                console.error('Error updating user data:', err);
            } else {
                console.log('User data has been updated!');
                console.log(user_data);
                console.log(`User with email ${email} was sucessfully logged out`);
                redirect('index.html?');
            }
        });

    } else {
        console.log(user_data);
        console.log(status);
        console.error(`User with email ${email} not found or is already logged out.`);
        response.redirect('index.html?')
    }

});