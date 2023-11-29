// Including the 'fs' module for file system operations
const fs = require('fs');

// Constructing the file path for the user_data JSON file
let filename = __dirname + '/user_data.json';

let user_reg_data;

// Checking if the file exists before attempting to read it
if (fs.existsSync(filename)) {
    // Reading the content of the JSON file synchronously and storing it as a string
    let data = fs.readFileSync(filename, 'utf-8');

    // Parsing the JSON data string into a JavaScript object
    user_reg_data = JSON.parse(data);

    // Retrieving file statistics, such as size
    let user_stats = fs.statSync(filename);

    // Logging the size of the file in characters
    console.log(`The file name ${filename} has ${user_stats.size} characters.`);
} else {
    // Logging a message if the file does not exist
    console.log(`The file name ${filename} does not exist.`);
}

//part 4 Lab 12
username = 'newuser';
user_reg_data[username] = {};
user_reg_data[username].password = 'newpass';
user_reg_data[username].email = 'newuser@user.com';

// Writing the updated user_reg_data to the user_data JSON file
fs.writeFileSync(filename, JSON.stringify(user_reg_data), 'utf-8');

// Including the 'express' module for creating a web server
let express = require('express');
let app = express();

// Configuring Express to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Handling GET requests for the login route
app.get("/login", function (request, response) {
    // Give a simple login form
    str = `
        <body>
        <form action="" method="POST">
        <input type="text" name="username" size="40" placeholder="enter username" ><br />
        <input type="password" name="password" size="40" placeholder="enter password"><br />
        <input type="submit" value="Submit" id="submit">
        </form>
        </body>
    `;
    response.send(str);
 });

// Handling GET requests for the register route
app.get("/register", function (request, response) {
    // Provide a simple registration form
    str = `
        <body>
        <form action="" method="POST">
        <input type="text" name="username" size="40" placeholder="enter username" ><br />
        <input type="password" name="password" size="40" placeholder="enter password"><br />
        <input type="password" name="repeat_password" size="40" placeholder="enter password again"><br />
        <input type="email" name="email" size="40" placeholder="enter email"><br />
        <input type="submit" value="Submit" id="submit">
        </form>
        </body>
    `;
    response.send(str);
});

// Handling POST requests for the register route
app.post("/register", function (request, response) {
    // Process a simple registration form
    let new_user = request.body.username;

    // Initialize variables for error handling and response messages
    let errors = false;
    let response_msg = "";

    // Check if the username is already taken
    if (typeof user_reg_data[new_user] !== 'undefined') {
        response_msg = 'Username unavailable. Please enter a different username.';
        errors = true;
    } else if (request.body.password === request.body.repeat_password) {
        // If passwords match, create a new user object in user_reg_data
        user_reg_data[new_user] = {};

        // Assign values to the new user's properties
        user_reg_data[new_user].name = request.body.name;
        user_reg_data[new_user].password = request.body.password;
        user_reg_data[new_user].email = request.body.email;

        // Write the updated user_reg_data to the user_data JSON file
        fs.writeFileSync(filename, JSON.stringify(user_reg_data), 'utf-8');

        // Redirect to the login page after successful registration
        response.redirect(`./login`);
    } else {
        response_msg = 'Repeat password does not match with the password.';
        errors = true;
    }

    // Send response or redirect based on validation results
    if (errors) {
        response.send(response_msg);
        // Alternatively, redirect with an error message
        // response.redirect(`./register?error=${response_msg}`);
    }
});


// Handling POST requests for the login route
app.post("/login", function (request, response) {
    // Process login form POST and redirect to logged in page if ok, back to login page if not
    // Retrieve username and password from the form data
    const submittedUsername = request.body.username;
    const submittedPassword = request.body.password;
    
    let response_msg = "";
    let errors = false;

    // Check if the username exists in user_reg_data
    if (typeof user_reg_data[submittedUsername] != 'undefined') {
        // Check if the password matches with the username
        if (submittedPassword == user_reg_data[submittedUsername].password) {
            response_msg = `${submittedUsername} is logged in.`;
        } else {
            response_msg = `Incorrect Password.`;
            errors = true;
        }
    } else {
        response_msg = `${submittedUsername} does not exist.`;
        errors = true;
    }

    // Send response or redirect based on validation results
    if (!errors) {
        response.send(response_msg);
    } else {
        response.redirect(`./login?error=${response_msg}`);
    }
});

// Start the Express server and listen on port 8080
app.listen(8080, () => console.log(`listening on port 8080`));
