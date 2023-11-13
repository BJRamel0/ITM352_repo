let params = (new URL(document.location)).searchParams;
let q = Number(params.get('quantity'));
let error = params.get('error');

if (error) {
    alert(error)
}

let productDetailsDiv = document.getElementById('')

productDetailsDiv.InnerHTML = `document.write(`<h3>${products[0]["brand"]} at \$${products[0]["price"]}</h3>`);`

let productListDiv=document.getElementById('productList');

for (i in products) {
    productListDiv.innerHTML +=`<h4>${products[i]["total_sold"]} ${products[i]["brand"]} have been sold!</h4>`);
}