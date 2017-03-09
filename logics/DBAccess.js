var mongoose   = require('mongoose');

var MemberDB = require("../models/member")
var RewardDB = require("../models/reward")
var MapDB = require("../models/map")


exports = module.exports = {
	member: {
		create: function(data, callback){
			//create member
			if (typeof data.name != "undefined"){
				
				var newMember = new MemberDB({
					name: data.name
				})
				newMember.save(function(err){
					if (err) { 
						console.log(err)
						return callback(err)
					}
					return callback(null, newMember)
				})
				
			} else 
				return callback(new Error("Missing member name"))
		},
		remove: function(data, callback){
			//remove member
			if (typeof data.memberID != "undefined"){	
				MemberDB.remove({_id: data.memberID}, function(err){
					if (err) { 
						console.log(err)
						return callback(err)
					}
					return callback(null)
				})
			} else 
				return callback(new Error("Missing member ID"))
		},
		getReward: function(data, callback){
			//get reward of member
			if (typeof data.memberID != "undefined"){	
				MapDB.find({
					memberID: data.memberID 
				}).lean().exec(function(err, result){
					if (err) {
						return callback(new Error("Access database fail"))
					}

					//retrieve reward information
					var rewardList = result.map(function(link){
						return mongoose.Types.ObjectId(link.rewardID)
					})

					
					RewardDB.find({ 
						'_id' : {
							$in : rewardList
						} 
					}).exec(function(err, result){
						if (err) {
							return callback(new Error("Access database fail"))
						}
						return callback(null, result)
					})
				})
			} else 
				return callback(new Error("Missing memberID"))
		},

		linkReward: function(data, callback){
			// link reward to member
			if (typeof data.memberID != "undefined" && typeof data.rewardID != "undefined"){	

				MapDB.find({
					memberID: data.memberID,
					rewardID: data.rewardID
				}).lean().exec(function(err, result){
					if (err){
						return callback(new Error("Access Database error "))
					}
					if (result) {
						return callback(new Error("All ready reward"))
					}

					var newLink = new MapDB({
						memberID: data.memberID,
						rewardID: data.rewardID
					})
					newLink.save(function(err){
						if (err) { 
							console.log(err)
							return callback(err)
						}
						return callback(null, newLink)
					})
					
				})
				
			}	else 
				return callback(new Error("Missing memberID or rewardID "))
		}
	},
	reward: {
		create: function(data, callback){
			//create member
			if (typeof data.name != "undefined"){
				
				var newReward = new RewardDB({
					name: data.name,
					description: data.description || ""
				})
				newReward.save(function(err){
					if (err) { 
						console.log(err)
						return callback(err)
					}
					return callback(null, newReward)
				})
				
			} else 
				return callback(new Error("Missing reward name"))
		},
		remove:  function(data, callback){
			//remove reward
			if (typeof data.rewardID != "undefined"){	
				RewardDB.remove({_id: data.rewardID},function(err){
					if (err) { 
						console.log(err)
						return callback(err)
					}

					MapDB.remove({
						rewardID: data.rewardID 
					}).exec(function(err, result){
						if (err) { 
							console.log(err)
							return callback(err)
						}
						return callback(null)
					})

					
				})
				
			} else 
				return callback(new Error("Missing reward ID"))
		}
	}
}