//let attributes = "BJ;20;MIS";
let attributes  =  "BJ;20;20 + 0.5;0.5 - 20"
const separator = ";";

//lab9 question3: separating attribute string values with split();
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
console.log(invertPieces); //output: BJ, 20, 20 + 0.5, 0.5 - 20
