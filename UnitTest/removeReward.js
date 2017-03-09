var mongoose   = require('mongoose');
mongoose.connect("mongodb://localhost/MemberReward");

var DBAccess = require("../logics/DBAccess")
var async = require("async")

async.auto({
	createUser1: createUser1,
	createUser2: createUser2,
	createReward1: createReward1,
	createReward2: createReward2,
	linkReward1User1: ["createReward1", "createUser1", linkReward1User1],
	linkReward2User1: ["createReward2", "createUser1", linkReward2User1],
	linkReward2User2: ["createReward2", "createUser1", linkReward2User2],
	removeReward2: ["linkReward2User1", "linkReward2User2", removeReward2],
	getRewardUser1: ["removeReward2", getRewardUser1],
	getRewardUser2: ["removeReward2", getRewardUser2],
	

},function(err, results){
	console.log(results)
	if (err) {
		console.log("test fail!")
	} else {
		var result1 = results.getRewardUser1
		var result2 = results.getRewardUser2
		if (result1.length!=1)
			console.log("test fail")
		if (result2.length!=0)
			console.log("test fail")
		console.log("test pass")
	}
	mongoose.disconnect()
})


function createUser1(callback){
	DBAccess.member.create({name: "User 1"}, function(err, result){
		console.log("Create User 1 ....")
		if (err){
			console.log("Fail")
			return callback(err)
		}
		callback(null, result)
	})	
}


function createUser2(callback){
	DBAccess.member.create({name: "User 2"}, function(err, result){
		console.log("Create User 2 ....")
		if (err){
			console.log("Fail")
			return callback(err)
		}
		callback(null, result)
	})
}

function createReward1(callback){
	DBAccess.reward.create({name: "Reward 1", description: "1000$"}, function(err, result){
		console.log("Create Reward 1 ....")
		if (err){
			console.log("Fail")
			return callback(err)
		}
		callback(null, result)
	})	
}


function createReward2(callback){
	DBAccess.reward.create({name: "Reward 2"}, function(err, result){
		console.log("Create Reward 2 ....")
		if (err){
			console.log("Fail")
			return callback(err)
		}
		callback(null, result)
	})
}

function linkReward1User1(prevData, callback){
	var user1 = prevData.createUser1
	var reward1 = prevData.createReward1

	DBAccess.member.linkReward({memberID: user1._id, rewardID: reward1._id}, function(err, result){
		console.log("Link reward 1 to user 1 ....")
		if (err){
			console.log("Fail")
			return callback(err)
		}
		callback(null, result)
	})
}	

function linkReward2User1(prevData, callback){
	var user1 = prevData.createUser1
	var reward2 = prevData.createReward2

	DBAccess.member.linkReward({memberID: user1._id, rewardID: reward2._id}, function(err, result){
		console.log("Link reward 2 to user 1 ....")
		if (err){
			console.log("Fail")
			return callback(err)
		}
		callback(null, result)
	})
}

function linkReward2User2(prevData, callback){
	var user2 = prevData.createUser2
	var reward2 = prevData.createReward2

	DBAccess.member.linkReward({memberID: user2._id, rewardID: reward2._id}, function(err, result){
		console.log("Link reward 2 to user 2 ....")
		if (err){
			console.log("Fail")
			return callback(err)
		}
		callback(null, result)
	})
}

function getRewardUser1(prevData, callback){
	var user1 = prevData.createUser1
	DBAccess.member.getReward({memberID: user1._id}, function(err, result){
		console.log("Get reward from user 1 ....")
		if (err){
			console.log("Fail")
			return callback(err)
		}
		callback(null, result)
	})
}

function getRewardUser2(prevData, callback){
	var user2 = prevData.createUser2
	DBAccess.member.getReward({memberID: user2._id}, function(err, result){
		console.log("Get reward from user 2 ....")
		if (err){
			console.log("Fail")
			return callback(err)
		}
		callback(null, result)
	})
}

function removeReward2(prevData, callback){
	var reward2 = prevData.createReward2

	DBAccess.reward.remove({rewardID: reward2._id}, function(err){
		console.log("Remove reward 2 ....")
		if (err){
			console.log("Fail")
			return callback(err)
		}
		callback(null)
	})
}