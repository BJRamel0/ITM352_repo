let express = require('express');
let app = express();

app.use(express.static(__dirname + '/public'));

//part2a
app.get('/test', function (req, res) {
    res.send("<h2>Testing Page</h2>");
});

app.use(express.urlencoded({ extended: true }));

app.post("/process_form", function (request, response) {
    response.send(request.body); 
});

app.all('*', function (request, response, next) {
    //response.send(request.method + 'to path' + request.path);
    console.log(request.method + 'to path' + request.path);
    next();
});

app.listen (8080, () => console.log('listening on port 8080')); //note the use of an anonymous function here to do a callback