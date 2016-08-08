process.env.NODE_ENV = 'test';

var mongoose = require('../server/config/mongoose');
var db = mongoose();

var Point = require('mongoose').model('Point');
var User = require('mongoose').model('User');
var pointsController = require('../server/controllers/point.server.controller')


var sinon = require('sinon')
  , should = require('should')
, net = require('net');
var chai = require('chai');
var expect = chai.expect;


describe("Point tests", function(){  
  
  currentPoint = null;  
  currentUser = null;
  
  beforeEach(function(done){
	
	var point = new Point();
	point.firstName = "Florencia";
	point.lastName = "Pereira";
	point.address = "Av. San Martín 2132";
	point.phone = "00123422322342";
	point.email = "mflorenciapereira@gmail.com";
	point.bloodGroup = "A";
	point.ip = "::1";	
	point.latitude = -34.596205;
	point.longitude = -58.514644;
    point.save(function(error){  
		
		currentPoint = point; 
		var user = new User();			
		user.userId = "testUser";	
		user.points = [];
		user.points.push(currentPoint);
		user.save(function(error){      
			currentUser = user;     
			done();
		});  
    });  	
	
  });    
  
  afterEach(function(done){   
      
    Point.remove({}, function() {      
		User.remove({}, function() {      
			 done();
		});    
    });  
  });  
  
     
  it("Adds a point successfully, new user", function(done){    
	 
	var socket = require('net').Socket();
	socket.request = {connection: {remoteAddress: "::1"}};
	
    var point = new Point();
	point.firstName = "Florencia";
	point.lastName = "Pereira";
	point.address = "Av. San Martín 2132";
	point.phone = "00123422322342";
	point.email = "mflorenciapereira@gmail.com";
	point.bloodGroup = "A";
	point.ip = "::1";	
	point.latitude = -34.596205;
	point.longitude = -58.514644;
    pointsController.save(point, "flor", socket,"patient_room");
	
	socket.on("pointAddedResult", function(result){		
		result.message.should.eql("OK");		
	})
	
	socket.on("pointAdded", function(pointAdded){		
		point.firstName.should.eql(pointAdded.firstName);
		point.lastName.should.eql(pointAdded.lastName);
		point.address.should.eql(pointAdded.address);
		point.phone.should.eql(pointAdded.phone);
		point.email.should.eql(pointAdded.email);
		point.bloodGroup.should.eql(pointAdded.bloodGroup);
		point.ip.should.eql(pointAdded.ip);
		point.latitude.should.eql(pointAdded.latitude);
		point.longitude.should.eql(pointAdded.longitude);
		done();
	})
	
  });   
  
  it("Adds a point successfully, existing user", function(done){    
	 
	var socket = require('net').Socket();
	socket.request = {connection: {remoteAddress: "::1"}};
	socket.broadcast = {to: function(string){ return require('net').Socket() }};
    var point = new Point();
	point.firstName = "Florencia";
	point.lastName = "Pereira";
	point.address = "Av. San Martín 2132";
	point.phone = "00123422322342";
	point.email = "mflorenciapereira@gmail.com";
	point.bloodGroup = "A";
	point.ip = "::1";	
	point.latitude = -34.596205;
	point.longitude = -58.514644;
    pointsController.save(point, "testUser", socket,"patient_room");
	
	socket.on("pointAddedResult", function(result){			
		result.message.should.eql("OK");		
	})
	
	socket.on("pointAdded", function(pointAdded){		
		point.firstName.should.eql(pointAdded.firstName);
		point.lastName.should.eql(pointAdded.lastName);
		point.address.should.eql(pointAdded.address);
		point.phone.should.eql(pointAdded.phone);
		point.email.should.eql(pointAdded.email);
		point.bloodGroup.should.eql(pointAdded.bloodGroup);
		point.ip.should.eql(pointAdded.ip);
		point.latitude.should.eql(pointAdded.latitude);
		point.longitude.should.eql(pointAdded.longitude);
		User.findOne({userId: currentUser.userId}, function(err, user){				
			(2).should.eql(user.points.length);
			done();
		});
		
	});
	
  });   

  
  it("Adds a point required firstName", function(done){    
	 
	var socket = require('net').Socket();
	socket.request = {connection: {remoteAddress: "::1"}};
    var point = new Point();
	point.firstName = "";
	point.lastName = "Pereira";
	point.address = "Av. San Martín 2132";
	point.phone = "00123422322342";
	point.email = "mflorenciapereira@gmail.com";
	point.bloodGroup = "A";
	point.ip = "::1";	
	point.latitude = -34.596205;
	point.longitude = -58.514644;
    pointsController.save(point, "flor", socket,"patient_room");
	
	socket.on("pointAddedResult", function(result){		
		"First name is required".should.eql(result.error);
		done();		
	});
	
  });  
  
  
  it("Adds a point required last name", function(done){    
	 
	var socket = require('net').Socket();
	socket.request = {connection: {remoteAddress: "::1"}};
    var point = new Point();
	point.firstName = "Florencia";
	point.lastName = "";
	point.address = "Av. San Martín 2132";
	point.phone = "00123422322342";
	point.email = "mflorenciapereira@gmail.com";
	point.bloodGroup = "A";
	point.ip = "::1";	
	point.latitude = -34.596205;
	point.longitude = -58.514644;
    pointsController.save(point, "flor", socket,"patient_room");
	
	socket.on("pointAddedResult", function(result){		
		"Last name is required".should.eql(result.error);	
		done();
	})	
  }); 
  
  it("Adds a point required address", function(done){    
	 
	var socket = require('net').Socket();
	socket.request = {connection: {remoteAddress: "::1"}};
    var point = new Point();
	point.firstName = "Florencia";
	point.lastName = "Pereira";
	point.address = "";
	point.phone = "00123422322342";
	point.email = "mflorenciapereira@gmail.com";
	point.bloodGroup = "A";
	point.ip = "::1";	
	point.latitude = -34.596205;
	point.longitude = -58.514644;
    pointsController.save(point, "flor", socket,"patient_room");
	
	socket.on("pointAddedResult", function(result){		
		"Address is required".should.eql(result.error);	
		done();
	});
	
  });
  it("Adds a point required phone", function(done){    
	 
	var socket = require('net').Socket();
	socket.request = {connection: {remoteAddress: "::1"}};
    var point = new Point();
	point.firstName = "Florencia";
	point.lastName = "Pereira";
	point.address = "Av. San Martín 2132";
	point.phone = "";
	point.email = "mflorenciapereira@gmail.com";
	point.bloodGroup = "A";
	point.ip = "::1";	
	point.latitude = -34.596205;
	point.longitude = -58.514644;
    pointsController.save(point, "flor", socket,"patient_room");
	
	socket.on("pointAddedResult", function(result){		
		"Phone is required".should.eql(result.error);	
		done();
	});
	
  });
  it("Adds a point required email", function(done){    
	 
	var socket = require('net').Socket();
	socket.request = {connection: {remoteAddress: "::1"}};
    var point = new Point();
	point.firstName = "Florencia";
	point.lastName = "Pereira";
	point.address = "Av. San Martín 2132";
	point.phone = "00123422322342";
	point.email = "";
	point.bloodGroup = "A";
	point.ip = "::1";	
	point.latitude = -34.596205;
	point.longitude = -58.514644;
    pointsController.save(point, "flor", socket,"patient_room");
	
	socket.on("pointAddedResult", function(result){		
		"Email is required".should.eql(result.error);	
		done();
	});
	
  });
  it("Adds a point invalid email", function(done){    
	 
	var socket = require('net').Socket();
	socket.request = {connection: {remoteAddress: "::1"}};
    var point = new Point();
	point.firstName = "Florencia";
	point.lastName = "Pereira";
	point.address = "Av. San Martín 2132";
	point.phone = "00123422322342";
	point.email = "mflor";
	point.bloodGroup = "A";
	point.ip = "::1";	
	point.latitude = -34.596205;
	point.longitude = -58.514644;
    pointsController.save(point, "flor", socket,"patient_room");
	
	socket.on("pointAddedResult", function(result){		
		"Invalid email".should.eql(result.error);	
		done();
	});
	
  });
  it("Adds a point invalid phone", function(done){    
	 
	var socket = require('net').Socket();
	socket.request = {connection: {remoteAddress: "::1"}};
    var point = new Point();
	point.firstName = "Florencia";
	point.lastName = "Pereira";
	point.address = "Av. San Martín 2132";
	point.phone = "42";
	point.email = "mflorenciapereira@gmail.com";
	point.bloodGroup = "A";
	point.ip = "::1";	
	point.latitude = -34.596205;
	point.longitude = -58.514644;
    pointsController.save(point, "flor", socket,"patient_room");
	
	socket.on("pointAddedResult", function(result){		
		"Invalid phone".should.eql(result.error);	
		done();
	});
	
  });
  it("Adds a point required blood group", function(done){    
	 
	var socket = require('net').Socket();
	socket.request = {connection: {remoteAddress: "::1"}};
    var point = new Point();
	point.firstName = "Florencia";
	point.lastName = "Pereira";
	point.address = "Av. San Martín 2132";
	point.phone = "00123422322342";
	point.email = "mflorenciapereira@gmail.com";
	point.bloodGroup = "";
	point.ip = "::1";	
	point.latitude = -34.596205;
	point.longitude = -58.514644;
    pointsController.save(point, "flor", socket,"patient_room");
	
	socket.on("pointAddedResult", function(result){		
		"Blood group is required".should.eql(result.error);	
		done();
	});
	
  });
  
  it("Adds a point required IP", function(done){    
	 
	var socket = require('net').Socket();
	
	socket.request = {connection: {remoteAddress: null}};
    var point = new Point();
	point.firstName = "Florencia";
	point.lastName = "Pereira";
	point.address = "Av. San Martín 2132";
	point.phone = "00123422322342";
	point.email = "mflorenciapereira@gmail.com";
	point.bloodGroup = "A";	
	point.latitude = -34.596205;
	point.longitude = -58.514644;
    pointsController.save(point, "flor", socket,"patient_room");
	
	socket.on("pointAddedResult", function(result){			
		"IP is required".should.eql(result.error);	
		done();
	});
	
  }
  );
  it("Adds a point required latitude", function(done){    
	 
	var socket = require('net').Socket();
	socket.request = {connection: {remoteAddress: "::1"}};
    var point = new Point();
	point.firstName = "Florencia";
	point.lastName = "Pereira";
	point.address = "Av. San Martín 2132";
	point.phone = "00123422322342";
	point.email = "mflorenciapereira@gmail.com";
	point.bloodGroup = "A";
	point.ip = "::1";	
	point.latitude = null;
	point.longitude = -58.514644;
    pointsController.save(point, "flor", socket,"patient_room");
	
	socket.on("pointAddedResult", function(result){		
		"Latitude is required".should.eql(result.error);	
		done();
	});
	
  });
  
  it("Adds a point required longitude", function(done){    
	 
	var socket = require('net').Socket();
	socket.request = {connection: {remoteAddress: "::1"}};
    var point = new Point();
	point.firstName = "Florencia";
	point.lastName = "Pereira";
	point.address = "Av. San Martín 2132";
	point.phone = "00123422322342";
	point.email = "mflorenciapereira@gmail.com";
	point.bloodGroup = "A";
	point.ip = "::1";	
	point.latitude = -34.596205;
	point.longitude = null;
    pointsController.save(point, "flor", socket,"patient_room");
	
	socket.on("pointAddedResult", function(result){		
		"Longitude is required".should.eql(result.error);	
		done();
	});
	
  });
  
  it("Edit a point successfully", function(done){    
	 
	var socket = require('net').Socket();
	socket.request = {connection: {remoteAddress: "::1"}};
    var point = new Point();
	point._id = currentPoint._id
	point.firstName = "Florencia";
	point.lastName = "Pereira García";
	point.address = "Av. San Martín 2132";
	point.phone = "00123422322342";
	point.email = "mflorenciapereira@gmail.com";
	point.bloodGroup = "A";
	point.ip = "::1";	
	point.latitude = -34.596205;
	point.longitude = -58.514644;
    pointsController.save(point, "flor", socket,"patient_room");
	
	socket.on("pointAddedResult", function(result){		
		"OK".should.eql(result.message);		
	})
	
	socket.on("pointAdded", function(pointAdded){		
		point._id.should.eql(point._id);
		point.firstName.should.eql(pointAdded.firstName);
		point.lastName.should.eql(pointAdded.lastName);
		point.address.should.eql(pointAdded.address);
		point.phone.should.eql(pointAdded.phone);
		point.email.should.eql(pointAdded.email);
		point.bloodGroup.should.eql(pointAdded.bloodGroup);
		point.ip.should.eql(pointAdded.ip);
		point.latitude.should.eql(pointAdded.latitude);
		point.longitude.should.eql(pointAdded.longitude);
		done();
	})
  });
  
  it("Remove a point successfully", function(done){    
	
	var socket = require('net').Socket();
	socket.request = {connection: {remoteAddress: "::1"}};
	socket.broadcast = {to: function(string){ return require('net').Socket() }};
	
	pointsController.remove(currentPoint._id, socket, socket,"patient_room");
	
	socket.on("pointDeleted", function(result){		
		currentPoint._id.should.eql(result.id);		
		done();
	});
	
  });     
  
  it("Find by userId", function(done){    
	
	var socket = require('net').Socket();
	socket.request = {connection: {remoteAddress: "::1"}};
	socket.broadcast = {to: function(string){ return require('net').Socket() }};
	
	pointsController.findById(currentUser.userId, socket);
	
	socket.on("userPointsLoaded", function(user){		
		user._id.should.eql(currentUser._id);		
		user.userId.should.eql(currentUser.userId);
		(1).should.eql(user.points.length);		
		done();
	});
	
  });   
  
  it("Find by userId, user not found", function(done){    
	
	var socket = require('net').Socket();
	socket.request = {connection: {remoteAddress: "::1"}};
	socket.broadcast = {to: function(string){ return require('net').Socket() }};
	
	pointsController.findById("inexistent", socket);
	
	socket.on("userPointsLoaded", function(user){		
		expect(user).to.be.null;				
		done();
	});
	
  });     
  
  it("Find by coords", function(done){    
	
	
	var socket = require('net').Socket();
	socket.request = {connection: {remoteAddress: "::1"}};
	socket.broadcast = {to: function(string){ return require('net').Socket() }};
	var xmin = -59;
	var xmax = -57;
	var ymin = -35;
	var ymax = -33;	
	
	pointsController.findByCoords(xmin,xmax,ymin,ymax,socket);	
	
	
	socket.on("pointsLoaded", function(points){		
		(1).should.eql(points.length);
		done();
	});
	
  });   
  
  it("Find by coords, none found", function(done){    
	
	
	var socket = require('net').Socket();
	socket.request = {connection: {remoteAddress: "::1"}};
	socket.broadcast = {to: function(string){ return require('net').Socket() }};
	var xmin = -57;
	var xmax = -56;
	var ymin = -36;
	var ymax = -35;	
	
	pointsController.findByCoords(xmin,xmax,ymin,ymax,socket);	
	
	
	socket.on("pointsLoaded", function(points){		
		(0).should.eql(points.length);
		done();
	});
	
  });   
	
	
  
});
