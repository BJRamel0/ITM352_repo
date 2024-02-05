// Including the 'fs' module for file system operations
const fs = require('fs');

// Constructing the file path for the user_data JSON file
let filename = __dirname + '/user_data.json';

// Reading the content of the JSON file synchronously and storing it as a string
let data = fs.readFileSync(filename, 'utf-8');

// Parsing the JSON data string into a JavaScript object
let user_reg_data = JSON.parse(data);

// Logging the parsed user registration data to the console
console.log(user_reg_data);