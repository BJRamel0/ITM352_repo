//Define Variables
const store_name="BJ Ramel";
let hits=0;
let spins=0;
let wins;
let over_half=false;
hits_span.innerHTML = hits; 
spins_span.innerHTML = spins;

//HTML printing
top_title.innerHTML=(store_name+"'s Used Smart Phone Store");
bottom_title.innerHTML=("Your One Stop For Used Phones - "+store_name+"'s");

//Define Functions
function changeClassName(element) {
    if(element.className=='item rotate'){
        //Put something here
    } else {
        spins=spins+1;
    }
    element.className='item rotate';
    spins_span.innerHTML = spins++;
    if(spins<2*hits&&hits<spins){
        wins=true;
        over_half=true;
    } else{
        wins=false;
    }
    //wins_span.innerHTML=wins;
    wins_span.innerHTML=over_half;
}
function resetClassName(element) {
    element.className='item';
    hits_span.innerHTML = hits++;

    if(spins<2*hits&&hits<spins){
        wins= true;
        over_half=true;
    } else{
        wins= false;
    }
    //wins_span.innerHTML=wins;
    wins_span.innerHTML=over_half;
}
