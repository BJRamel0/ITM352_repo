/*
psudocode --
function NAME (monthly_sales, tax_rate) {
    const tax_owing = [array for one entry for every entry in monthly_sales. Tax owing for entry.]
    return tax_owing 
};


let monthly_sales = [list of montly sales amount];
const tax_rate = NUMBER;

console.log(NAME(parameters));
*/

//define variables
const monthly_sales = [10000, 9000, 11000, 12000, 13000];
const tax_rate = 0.0444; //Hawaii's average combined state and local sales tax rate

/*calculateTax loops to take the monthly_sales and tax_rate for each value in the array
and multiplies them to obtain and return a tax_owing array.*/
function calculateTax (monthly_sales, tax_rate) {
    const tax_owing = [];
    for (let i = 0; i < monthly_sales.length; i++) {
        const monthly_sale=monthly_sales[i];
        tax_owing.push((monthly_sales[i]*tax_rate).toFixed(2));
    }
    return tax_owing;
};

//print tax_owing onto console
console.log(calculateTax(monthly_sales, tax_rate));