var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/src'));

app.get('/', function (req, res) {
    res.sendFile('index.html');
});

app.listen(port, function (err) {
    if (err) {
        return console.log(err);
    }
    console.log('Listening on port ' + port)
});