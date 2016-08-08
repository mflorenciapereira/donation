var Point = require('mongoose').model('Point');
var User = require('mongoose').model('User');

exports.findById = function(userId, socket){		

	User.findOne({userId: userId}).lean().populate('points').exec(function(err, user){
		if(err){			
			console.log("Error loading user: "+getErrorMessage(err));
			return;
		}else{
			socket.emit("userPointsLoaded", user);
		}
	});		
};

exports.findByCoords = function(xmin,xmax,ymin,ymax, socket){	

	Point.find({ "longitude": {$gt : xmin, $lt : xmax},"latitude": {$gt : ymin, $lt : ymax}} ).lean().populate('points').exec(function(err, points){
		if(err){			
			console.log("Error loading points: "+err);			
		}else{		 
			socket.emit("pointsLoaded", points);
		}
	});
		
};

exports.save = function(point, userId, socket, PATIENTS_ROOM){
	
	var pointAdd = new Point(point);
	
	var address = socket.request.connection.remoteAddress;

	pointAdd.ip = address;
	
	var query = {'_id':pointAdd._id};
	delete pointAdd._id;
		
	Point.findOneAndUpdate(query, pointAdd, {upsert:true,runValidators: true}, function(error){
		
    
		var result = {};
		if(error){
			var message = getErrorMessage(error);								
			result.error = message;
			socket.emit("pointAddedResult", result);
			return;
		}			
				
		associatePointUser(pointAdd, userId, socket, PATIENTS_ROOM);			
				
	});
		
};

var associatePointUser = function(pointAdded, userId, socket, PATIENTS_ROOM){
	var result = {};
	
	User.findOne({userId: userId}).exec(function(err, user){		
		
		if(err){					
			result.error = getErrorMessage(err);
			socket.emit("pointAddedResult", result);
			return;
		}
		
		var returnedUser = user;
		
		if(!user){
			returnedUser = new User;
			returnedUser.userId = userId;
			returnedUser.points = [];
		}		
				
		if(returnedUser.points.indexOf(pointAdded._id) > -1){
			result.message = "OK";						
			socket.emit("pointAddedResult", result);
			socket.emit("pointAdded", pointAdded);
			socket.broadcast.to(PATIENTS_ROOM).emit("pointAdded", pointAdded);
			return;
		}
		
		returnedUser.points.push(pointAdded._id);
		returnedUser.save(function(error){
			
			if(error){			
				result.error = getErrorMessage(error);
				socket.emit("pointAddedResult", result);
				return;			
			}	

			result.message = "OK";
				
			socket.emit("pointAddedResult", result);
			socket.emit("pointAdded", pointAdded);			
			socket.broadcast.to(PATIENTS_ROOM).emit("pointAdded", pointAdded);
			return;			
		})				
	});	
}


exports.remove = function(id, socket, PATIENTS_ROOM){	

	var result = {};
	
	Point.remove({ _id: id }, function(err) {
		if (!err) {
			result.id =id;         
		} else {
			result.error =getErrorMessage(err);        
		}			
		socket.emit("pointDeleted", result);  
		socket.broadcast.to(PATIENTS_ROOM).emit("pointRemoved", id);	
	});		
	
};


var getErrorMessage = function(err) {
	var message = '';	
	for (var errName in err.errors) {
		if (err.errors[errName].message) message = err.errors[errName].message;	
	}
	return message;
};

var createReturn = function(error, result) {
	var returnResult = {};
	returnResult.error = error;
	returnResult.result = result;
	return returnResult;
};