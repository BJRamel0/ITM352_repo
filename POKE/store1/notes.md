1. Store1 directory
    - Include SmartPhoneProducts3 and Invoice 3
2. products_display.html
    - textbox for each product to input desired purchase quantity
    - Label "Quantity Desired" 
    -CSS for textbox
3. submit button in <footer> "Purchase"
4. <body> ./invoice.html & GET
5. invoice.html
    - params = (new URL(document.location)).searchParams
    - Loop = params.get() to generate the quantities array
6. Test!