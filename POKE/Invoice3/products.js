// products.js

// Define the quantities array
let quantity = [2, 2, 2, 2, 2];
//let quantity = [2, 1, 1, 2, 1];

// Define the item objects (minus image data) with brand and quantity attributes
let itemData = [
  {
    brand: 'Apple Watch Ultra screen protector',
    price: 6.23,
    quantityIndex: 0, // Use index position to reference the quantity
  },
  {
    brand: 'Apple Watch Ultra extra band',
    price: 22.64,
    quantityIndex: 1, // Use index position to reference the quantity
  },
  {
    brand: 'iPhone 15 Pro case',
    price: 25.99,
    quantityIndex: 2, // Use index position to reference the quantity
  },
  {
    brand: 'Apple Watch charging cable',
    price: 33.95,
    quantityIndex: 3, // Use index position to reference the quantity
  },
  {
    brand: 'Apple USB-C cable',
    price: 35.00,
    quantityIndex: 4, // Use index position to reference the quantity
  },
];

export { itemData, quantity };



