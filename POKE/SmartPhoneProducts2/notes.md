2. HTML, cut all sections from <main>
    - document.querySelector('.main'); 
    - document.querySelector('.main').innerHTML += `(String Template)`
3. Replicate <section...> info from Original HTML in loop for onclick and on-mouseover

 <section class="item" onmouseover="changeClassName(this);" onclick="resetClassName(this); ">
                <h2>HTC</h2>
                <p>&dollar;40</p>
                <img src="http://dport96.github.io/ITM352/morea/080.flow-control-II/HTC.jpg"/>
            </section>
            
4. String Templates send name to DOM: ${eval("name"+i)}
5. loop --> eval("typeof name"+i) != 'undefined'
