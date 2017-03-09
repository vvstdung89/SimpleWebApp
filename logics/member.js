var DBAccess = require("./DBAccess")

exports = module.exports = {
	create : function(req, res){
		if (typeof req.body.name != "undefined"){
			DBAccess.member.create({name:req.body.name}, function(err, result){
				if (err) {
					res.status(500)
					return res.end(err.message)
				}
				return res.end(JSON.stringify(result))
			})
		} else {
			res.status(500)
			return res.end()	
		}
	},
	remove: function(req, res){
		if (typeof req.body.memberID != "undefined"){
			DBAccess.member.remove({memberID: req.body.memberID}, function(err, result){
				if (err) {
					res.status(500)
					return res.end(err.message)
				}
				return res.end(JSON.stringify(result))
			})
		} else {
			res.status(500)
			return res.end()	
		}	}, 
	linkReward: function(req, res){
		if (typeof req.body.memberID != "undefined" && typeof req.body.rewardID != "undefined" ){
			DBAccess.member.linkReward({memberID: req.body.memberID, rewardID: req.body.rewardID}, function(err, result){
				if (err) {
					res.status(500)
					return res.end(err.message)
				}
				return res.end(JSON.stringify(result))
			})
		} else {
			res.status(500)
			return res.end()	
		}
	}, 
	getReward: function(req, res){
		if (typeof req.body.memberID != "undefined" ){
			DBAccess.member.getReward({memberID: req.body.memberID}, function(err, result){
				if (err) {
					res.status(500)
					return res.end(err.message)
				}
				return res.end(JSON.stringify(result))
			})
		} else {
			res.status(500)
			return res.end()	
		}
	}

}