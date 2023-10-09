1. HTML, cut all sections from main. Leave main. Use CSS to format page
2. HTML generated loop under main
    - Use document.querySelector('.main'); slet and ref HTML main
        -   <main> element with class="main" attribute from HTML Doc
    - Target specific HTML element to add dynamically generated contact in a loop
    - document.querySelector('.main').innerHTML +=
        - Selects innerHTMl of main andallows you to execute string template
3. Replicate <section ...> information from orginal HTML in loop so onclick and on-mouseover stil work
4. Use string templates send name to DOM: ${eval("name"+i)}; same for price & image