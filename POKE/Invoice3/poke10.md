- Create/use a file called products_data.js that includes:
    - Five (or more) items saved as objects
    - Create an array called quantities that is represented in the item objects
    - Create an array of these objects that you can use to loop through for display on a webpage
- Import / use the data defined in products_data.js in the invoice3.js file
- Create a function to generate_item_rows on the html page with the following logic applied:
    - If the quantity of a product = 0, do not display the item on the webpage (aka... none for sale)
    - Validate that item quantities are proper (has to be a positive integer)
        - If proper, display the item
        - If not proper, display the item with an error message
    - Calculate the extended_price from the item price * item quantity
- Therefore, you need a separate validation function
    - If quantity not a number... "Not a number"
    - If quantity not a positive number... "Negative inventory"
    - If quantity not an integer... "Not an Integer"
    - Can be both a negative and non-integer error
    Return an error message (hmmmm.... what if there are no errors?)
- Building off invoice2, replace the hard-coded webpage and items with data from products_data.js and use the generate_item_rows function to generate the part of the invoice table related to the items