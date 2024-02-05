// Constructing the file path for user data JSON file
let filename = __dirname + '/user_data.json';

// Requiring the user data from the JSON file
let user_reg_data = require(filename);

// Accessing and printing the password and email for the user with username 'kazman'
console.log(user_reg_data['kazman'].password);
console.log(user_reg_data['kazman'].email);