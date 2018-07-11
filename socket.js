const net = require('net');

var clients = new Set

var server = net.createServer(function(socket) {
	 socket.name = socket.remoteAddress + ":" + socket.remotePort 
	 clients.add(socket);

	 console.log('New client connect: ' + socket.name + "\n")

	 socket.write(JSON.stringify({
	 	action: 'welcomeMsg',
	 	content: 'Welcome ' + socket.name
	 }))

	 socket.on('close', function (data) {
	 	console.log('socket close: ' + socket.name)
	 	clients.delete(socket)
	  });

	 socket.on('data', function (data) {
	 	console.log('get data', data)
	    broadcast(data, socket);
	  });

	 socket.on('error', function (error) {
	 	console.log({error})
	  });

	function broadcast(message, sender) {
	    clients.forEach(function (client) {
	      // Don't want to send it to sender
	      if (client === sender) return;
	      client.write(message);
	    });
	    // Log it to the server output too
	    process.stdout.write(message)
	  }
});

server.listen(8888, '127.0.0.1', function() {
	console.log('Bridge app listening on port 8888!')
}).on('error', function(error){
	console.log({error: error})
});