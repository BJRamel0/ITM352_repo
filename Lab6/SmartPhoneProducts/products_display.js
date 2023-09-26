//initialize variables
const store_name="BJ";
let hits=0;
let spins=0;
//let wins;
let over_half=false;
hits_span.innerHTML = hits; 
spins_span.innerHTML = spins;

//declare and push to the DOM the store name at top and bottom
top_title.innerHTML=(store_name + "'s Used Smart Phone Store");
bottom_title.innerHTML=(store_name + "'s Used Smart Phone Store");

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
    if ( hits_spins_ratio > 0 ) {
        progress = 'On your way!';
        if ( hits_spins_ratio >= 0.25 ) {
            progress = 'Almost there!';
            if ( hits_spins_ratio >= 0.5 ) {
                if( hits < spins) { 
                    progress = 'You win!';
                }
            }
        }
    }
    else {
        progress = 'Get going!' ;
    }
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
    //hits=hits+=2;
    if(spins<2*hits&&hits<spins){
        //wins=true;
        overhalf=true;
    } else {
        //wins=false;
    }
    //win_span.innerHTML=wins;
    win_span.innerHTML=over_half;
    hits_span.innerHTML = hits; 
    hit_spin_span.innerHTML=Number(hits/spins).toFixed(2)

    // -- Winning progress depends on hits/spins
    let progress;
    let hits_spins_ratio = hits/spins;
    /*if ( hits_spins_ratio > 0 ) {
        progress = 'On your way!';
        if ( hits_spins_ratio >= 0.25 ) {
            progress = 'Almost there!';
            if ( hits_spins_ratio >= 0.5 ) {
                if( hits < spins) { 
                    progress = 'You win!';
                }
            }
        }
    }
    else {
        progress = 'Get going!' ;
    }*/

    if ( hits_spins_ratio >= 0.5 ) {
        if(hits<spins) {
            progress='You win!';
        } //
    } else if( hits_spins_ratio >= 0.25 ) {
        progress = 'Almost there!';
    } else if( hits_spins_ratio > 0) {
        progress='Pn your way!';
    } else {
        progress = 'Get going!' ;
    }
    win_span.innerHTML=progress;
}