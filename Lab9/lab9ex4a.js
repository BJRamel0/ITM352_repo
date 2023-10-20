//let attributes = "BJ;20;MIS";
let attributes  =  "BJ;20;20 + 0.5;0.5 - 20"
const separator = ";";
const pieces = attributes.split(separator);

//lab9 question10
//Defining validateNumber function
/*validateNumber function takes input (inputValue) and returns a boolean response that validates the value. 
If any error messages were collected in the array, false is returned. While if the array is empty, it is true.*/ 
function validateNumber(inputValue) {
    let errors = []; // assume no errors at first
    if(Number(inputValue) != inputValue) errors.push('Not a number!'); // Check if string is a number value
    if(inputValue < 0) errors.push('Negative value!'); // Check if it is non-negative
    if(parseInt(inputValue) != inputValue) errors.push('Not an integer!'); // Check that it is an integer
    return errors.length == 0;
};

//looping to check each piece and displaying results in console
for (i=0; i < pieces.length; i++) {
    console.log(`${pieces[i]}: ${validateNumber(pieces[i])}`);
};