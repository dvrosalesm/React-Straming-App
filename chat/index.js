var fs = require("fs");
var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var credentials = {
    key: fs.readFileSync('/etc/letsencrypt/live/admin.imcloser.live/privkey.pem'), 
    cert: fs.readFileSync('/etc/letsencrypt/live/admin.imcloser.live/fullchain.pem')
};
var https = require('https').Server(credentials, app);
var io = require('socket.io')(https);
var mongoose = require('mongoose');
var cors = require('cors')

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(cors())

var Message = mongoose.model('Message', {
    name: String,
    message: String,
    room: String,
    email: String
})

var dbUrl = "mongodb://localhost:27017/closerchat_dev"

app.get('/messages', (req, res) => {
    Message.find({room: req.params.room}, (err, messages) => {
        res.send(messages);
    })
})


app.get('/messages/:id', (req, res) => {
    var room = req.params.id
    Message.find({
        room: room
    }, (err, messages) => {
        res.send(messages);
    })
})


app.post('/messages', async (req, res) => {
    try {
        var message = new Message(req.body);

        var savedMessage = await message.save()
        console.log('saved');

        io.emit('message', req.body);
        res.sendStatus(200);
    } catch (error) {
        res.sendStatus(500);
        return console.log('error', error);
    } finally {
        console.log('Message Posted')
    }

})



io.on('connection', () => {
    console.log('a user is connected')
})

mongoose.connect(dbUrl, {}, (err) => {
    console.log('mongodb connected', err);
})

var server = https.listen(4040, () => {
    console.log('server is running on port', server.address().port);
});