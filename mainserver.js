/* Created by hemba on 12/23/2016.*/

var http = require('http').createServer(serverHandler);
var io   = require('socket.io')(http);
http.listen(process.env.PORT || 700);//defining port

function serverHandler(req,res){

    if(req.url == '/'){
        res.writeHead(200,{"Content-type":"text/plain"});
        res.write("Socket Server listening now : ");
        res.end();
    }
    if(req.url == '/helo'){
        res.writeHead(200,{"Content-type":"text/plain"});
        res.write("yoyo:how are you ");
        res.end();
    }
}

io.on('connection',function (socket) {
    socket.emit('hello',{name:'hemant',class:'btech'});
    socket.on('reply',function (data) {
        console.log(data);
        socket.emit("hellos",{data:'you r sending'});
    });
    socket.on('send',function (data) {
        socket.emit("rec",{msg:data});
    });
});
