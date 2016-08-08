var http = require('http');
var pointsController = require('../controllers/point.server.controller')

const PATIENTS_ROOM = "PATIENTS";

module.exports = function(app) {
	var server = http.createServer(app);
	var io = require('socket.io').listen(server);
	io.set("origins", "*:*");
	
	io.on('connection', function (socket) {
		
		socket.on('loadPointsByUser', function (data) {
			var result = pointsController.findById(data, socket);			
		});
		
		socket.on('loadPointsByCoords', function (xmin,xmax,ymin,ymax) {			
			pointsController.findByCoords(xmin,xmax,ymin,ymax, socket);
		});
			
		socket.on('addPoint', function (point, userId) {			
			pointsController.save(point,userId, socket, PATIENTS_ROOM);
		});
		
		socket.on('deletePoint', function (id, userId) {				
			pointsController.remove(id, socket, PATIENTS_ROOM);			
		});
		
		socket.on('registerPatient', function (id, userId) {			
			socket.join(PATIENTS_ROOM);
		});				
		
	});
	
	return server;
	
};

