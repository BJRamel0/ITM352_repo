let express = require('express');
let app = express();

//part2a
app.get('/test', function (req, res) {
    res.send("<h2>you have reached the test page - Aloha</h2>");
    next();
});

app.all('*', function (request, response, next) {
    console.log(request.method + 'to path' + request.path);
});

app.listen (8080, () => console.log('listening on port 8080')); //note the use of an anonymous