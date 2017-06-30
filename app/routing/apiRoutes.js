
var friendsData= require("../data/friends.js")

module.exports= function(app){

	app.get('/api/friends', function(req, res){
		res.json(friendsData)
	});


	app.post('/api/friends', function(req, res){

		//CONVERT STRING SCORES TO INTEGERS
	// -------------------------------------------------------------------------------------
		//this console.log will show that the answers are stored as strings
		//we want them as actual numbers
		console.log(req.body);

		//convert strings holding nums into nubmers
		for(var i=0; i<10; i++){
			req.body.scores[i]= parseInt(req.body.scores[i]);
		}
		console.log(req.body);

		
		//what does this do?
		// res.json(true)


		// HANDLING THE MATCHING HERE
	// -----------------------------------------------------------------------------------------
		//represents index of closest match
		//see if you can uses friendsData[i] for this
		var match = 0;
		//store req.body.scores
		var userScores= req.body.scores;
		//tracking the index of friends array
		var index=0;
		//initialize lowest sum
		var lowestSum=9999;

		console.log("\n");
		console.log("This is the req.body")
		console.log(req.body);

		console.log(userScores);

		for(var i=0; i< friendsData.length; i++){
			var sum=0;
			for(var m=0; m<10; m++){
				sum += (Math.abs(userScores[m] - friendsData[i].scores[m]));
			}

			if(sum<lowestSum){
				match = index;
				lowestSum = sum;
			}

			index++
		}

		console.log(friendsData[match]);

		friendsData.push(req.body);

		res.json(friendsData[match]);

	});
}

//so express handles requests from the client(get and post) in relation to the url, and gives back a response
//ajax is used to communicate with the server/database (we want to do something with the server(get/post))