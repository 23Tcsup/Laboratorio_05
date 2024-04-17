const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));
app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    console.log('Usuario conectado');

    socket.on('chat message 1', function(data){
        console.log('Mensaje del chat 1: ' + data.mensaje);
        io.emit('chat message 1', data);
    });

    socket.on('chat message 2', function(msg){
        console.log('Mensaje del chat 2: ' + msg);
        io.emit('chat message 2', msg);
    });

    socket.on('disconnect', function(){
        console.log('Usuario desconectado');
    });
});

http.listen(3000, function(){
    console.log('Servidor escuchando en http://localhost:3000')
});