//let attributes = "BJ;20;MIS";
let attributes  =  "BJ;20;20 + 0.5;0.5 - 20"
const separator = ";";

//lab9 question 3
//separating attribute string values with split();
/*const parts = attributes.split(separator);
console.log(parts); //output: ['BJ', '20', 'MIS']*/

//lab9 question8
//loop print the data type of each value in pieces
const pieces = attributes.split(separator);
/*console.log(`pieces data type: ${typeof pieces}`)
for (i=0; i < pieces.length; i++) {
    console.log(`${pieces[i]} data type: ${typeof pieces[i]}`);
}*/

//lab9 question9
//invert pieces back into a string
let invertPieces = pieces.join(", ");
//console.log(invertPieces); //output: BJ, 20, 20 + 0.5, 0.5 - 20

//lab9 question10
//Defining objErrorBoo function
/*objErrorBoo function takes input (object) and returns a boolean response based on certain criteria. 
If any error messages were collected in the array, false is returned. While if the array is empty, it is true.*/ 
function objErrorBoo(object) {
    let errors = []; // assume no errors at first
    if(Number(object) != object) errors.push('Not a number!'); // Check if string is a number value
    if(object < 0) errors.push('Negative value!'); // Check if it is non-negative
    if(parseInt(object) != object) errors.push('Not an integer!'); // Check that it is an integer
    return errors.length == 0;
};

//looping to check each piece and displaying results in console
for (i=0; i < pieces.length; i++) {
    console.log(`${pieces[i]}: ${objErrorBoo(pieces[i])}`);
};