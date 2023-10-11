//initialize variables
const first_name="BJ";
const last_name="Ramel";
const store_name="BJ";
let hits=0;
let spins=0;
let over_half=false;
hits_span.innerHTML = hits; 
spins_span.innerHTML = spins;

//declare and push to the DOM the store name at top and bottom
top_title.innerHTML=(store_name + "'s Used Smart Phone Store");

//POKE9 Array (brand, price, image)
products = [
    {'brand': 'HTC', 'price': 40.00, 'image': "http://dport96.github.io/ITM352/morea/080.flow-control-II/HTC.jpg" },

    {'brand': 'Apple', 'price': 75.00, 'image': "http://dport96.github.io/ITM352/morea/080.flow-control-II/iphone-3gs.jpg" },

    {'brand': 'Nokia', 'price': 35.00, 'image': "http://dport96.github.io/ITM352/morea/080.flow-control-II/Nokia.jpg" },

    {'brand': 'Samsung', 'price': 45.00, 'image': "http://dport96.github.io/ITM352/morea/080.flow-control-II/Samsung.jpg" },

    {'brand': 'Blackberry', 'price': 10.00, 'image': "http://dport96.github.io/ITM352/morea/080.flow-control-II/Blackberry.jpg" }
];

/*Loop <main> HTML
for (let i=1; eval("typeof name"+i)!= 'undefined'; i++) {
    document.querySelector('.main').innerHTML += `
    <section class="item" onmouseover="changeClassName(this);" onclick="resetClassName(this); ">
                <h2>${eval("name"+i)}</h2>
                <p>$${eval("price"+i)}</p>
                <img src="${eval("image"+i)}"/>
            </section>
    `;
}*/

//Loop <main> HTML -- NO evals()
for (i = 0; i < products.length; i++) {
    const product = products[i];

    document.querySelector('.main').innerHTML += `
    <section class="item" onmouseover="changeClassName(this);" onclick="resetClassName(this); ">
                <h2>${product.brand}</h2>
                <p>$${product.price}</p>
                <img src="${product.image}"/>
            </section>
    `;
};


const currentYear=new Date().getFullYear();
const currentTime=new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'});

//Footer table maker
const footerTable = `
    <table>
        <tr>
            <td></td>
            <td class="table-header">Your One Stop for Used Phones - ${first_name.charAt(0).toUpperCase()}.${last_name.charAt(0).toUpperCase()}'s</td>
        </tr>
        <tr>
            <td>1.</td>
            <td>Copyright @ ${first_name} ${last_name}</td>
        </tr>
        <tr>
            <td>2.</td>
            <td>${currentYear}</td>
        </tr>
        <tr>
            <td>3.</td>
            <td>${currentTime}</td>
        </tr>
    </table>
`;
bottom_title.innerHTML=footerTable;

//Declaring Functions---
//Spins Function
function changeClassName(element) {
    //Ensure no double counting for spins when user moves their cursor a lot
    if(element.className=='item'){
        element.className='item rotate';
        spins=spins+1;
    }
    //spins=spins+1; 

    //False, or else, True Win
    if(spins<2*hits&&hits<spins){
        //wins=true;
        over_half=true;
    } else {
        //wins=false;
    }
    //win_span.innerHTML=wins;
    win_span.innerHTML=over_half;
    spins_span.innerHTML = spins; 
    hit_spin_span.innerHTML=Number(hits/spins).toFixed(2)

    // -- Winning progress depends on hits/spins
    let progress;
    let hits_spins_ratio = hits/spins;
    if (hits_spins_ratio >= 0.5 && hits < spins) {
        progress = 'You win!';
    } else if (hits_spins_ratio >= 0.25) {
        progress = 'Almost there!';
    } else if (hits_spins_ratio > 0) {
        progress = 'On your way!';
    } else {
        progress = 'Get going!';
    }    win_span.innerHTML=progress;
}
//Hits Function
function resetClassName(element){
    /*Hits stop spin &
    if product has already stopped spinning, then product will spin again*/
    if(element.className=='item rotate'){
        element.className='item';
        hits=hits+2;
    } else{
        changeClassName(element);
    }
    if(spins<2*hits&&hits<spins){
        overhalf=true;
    }
    win_span.innerHTML=over_half;
    hits_span.innerHTML = hits; 
    hit_spin_span.innerHTML=Number(hits/spins).toFixed(2)

    // -- Winning progress depends on hits/spins
    let progress;
    let hits_spins_ratio = hits/spins;
    if (hits_spins_ratio >= 0.5 && hits < spins) {
        progress = 'You win!';
    } else if (hits_spins_ratio >= 0.25) {
        progress = 'Almost there!';
    } else if (hits_spins_ratio > 0) {
        progress = 'On your way!';
    } else {
        progress = 'Get going!';
    }
    win_span.innerHTML=progress;
}