const express = require('express');
const bodyParser = require('body-parser');

const path = require('path');
const app = express();
const fs = require('fs');
let json = require('./events.json');

app.use(express.static(path.join('..', 'src')));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/data', function (req, res) {
    return res.send(json);
});

app.post('/data', function (req, res) {
    let date = req.body.date;
    let desc = req.body.desc;
    let tag = req.body.tag;
    console.log(json);
    json.events.push({"date":date,"description":desc,"tag":tag});
    console.log(json);
    fs.writeFile("server/events.json",JSON.stringify(json),function(){
        console.log("Saved")
    });
    console.log(date+" "+desc);
    return res.send(json);
});



app.listen(process.env.PORT || 8080);