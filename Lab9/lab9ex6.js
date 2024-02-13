//let attributes = "BJ;20;MIS";
let attributes  =  "BJ;20;20 + 0.5;0.5 - 20"
const separator = ";";
const pieces = attributes.split(separator);

//lab9 question10: Defining isNonNegInt function
//lab9 question11: new parameter - returnErrors
function isNonNegInt(q, returnErrors) {
    let errors = []; // assume no errors at first
    if(Number(q) != q) errors.push('Not a number!'); // Check if string is a number value
    if(q < 0) errors.push(' Negative value!'); // Check if it is non-negative
    if(parseInt(q) != q) errors.push(' Not an integer!'); // Check that it is an integer
    return returnErrors ? errors : errors.length == 0;
};

//lab9 question 17 
/*function checkIt (item, index) {
    console.log(`part ${index} is ${(isNonNegInt(item)?'a':'not a')} quantity`);
}
pieces.forEach(checkIt);*/

//lab9 question 17 
/*pieces.forEach((item,index) => {
    console.log(`part ${index} is ${(isNonNegInt(item)?'a':'not a')} quantity`);
});*/

//lab9 question 19
function download(url, callback) {
    setTimeout(() => {
        // script to download the picture here
        console.log(`Downloading ${url} ...`);
        picture_data = "image data:XOXOXO";
        //return picture_data;
        callback(picture_data);
    }, 3* 1000);
    
}

function process(picture) {
    console.log(`Processing ${picture}`);
}

let url = 'https://www.example.com/big_pic.jpg';
//process( download(url) );
download(url, process);