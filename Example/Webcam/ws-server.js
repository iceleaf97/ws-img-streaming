var http = require('http');
var url = require('url');
var fs = require('fs');
var WebSocketServer = require('ws').Server;

var server = http.createServer(function(request, response){
  // 解析请求，包括文件名
  var pathname = url.parse(request.url).pathname;
      
  // 输出请求的文件名
  console.log("Request for " + pathname + " received.");

  // 从文件系统中读取请求的文件内容
  fs.readFile(pathname.substr(1), function (err, data) {
    if (err) {
        console.log(err);
        // HTTP 状态码: 404 : NOT FOUND
        // Content Type: text/html
        response.writeHead(404, {'Content-Type': 'text/html'});
        response.write("404 not found!!!!");
    }else{             
        // HTTP 状态码: 200 : OK
        // Content Type: text/html
        response.writeHead(200, {'Content-Type': 'text/html'});    
        
        // 响应文件内容
        response.write(data.toString());        
    }
    //  发送响应数据
    response.end();
  });
});

//const io = require('socket.io')(server);

wss = new WebSocketServer({server});
// 連線池
var clients = [];
wss.on('connection', function(ws) {
// 將該連線加入連線池
  clients.push(ws);
  console.log('Client count:'+clients.length);
  ws.on('message', function(message) {
    //console.log(message);
  // 廣播訊息
    clients.forEach(function(ws1){
      if(ws1 !== ws) {
        //console.log(message);
        ws1.send(message);
      }
      
    })
    
  });
  
  ws.on('close', function(message) {
    // 連線關閉時，將其移出連線池
    clients = clients.filter(function(ws1){
      return ws1 !== ws
    })
  });
});

server.listen(8080)


