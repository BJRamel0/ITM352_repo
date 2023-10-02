1. Directory named Invoice 1

2. Tow files in directory
    - Invoice.hmtl (HMTL Structure)
    - invoice.js (Javascript logic)

3. Invoice.html:
    - Create HTML structure for invoice table
    - Include placeholders: product rows (tbody)
    - Include placeholders: Subtotal, tax, and total cells
    - Link invoice.js script

4. Invoice.js:
    - Define variables each product (item1, quantity1, price1, etc.)
    - Calc extended prices each product (extended_price1, extended_price2, etc.)
    - Calc the subtotal adding extended prices
    - Calc ta amount using tax rate
    - Calc total adding subtotal and tax amount
    - Use DOM manipulation to add product rows dynamically to table
    - Set values of subtotal, tax, and total cells in table

5. Save both invoice.html and invoice.js in same directory (Invoice1)

6. Open invoice.html in web browser view generated sales receipt

7. Ugly, probably. Create css file make table nicer
    - Link css file in html file
