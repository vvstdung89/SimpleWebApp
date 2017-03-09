var DBAccess = require("./DBAccess")

exports = module.exports = {
	create : function(req, res){
		if (typeof req.body.name != "undefined"){
			DBAccess.reward.create({name: req.body.name, description: req.body.description}, function(err, result){
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
		if (typeof req.body.rewardID != "undefined"){
			DBAccess.reward.remove({rewardID: req.body.rewardID}, function(err, result){
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
	
}