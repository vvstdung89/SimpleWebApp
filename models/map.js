var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var connection = mongoose.createConnection();

var Map   = new Schema({
    memberID: {
        type: String,
        require: true,
        index: true
    },
    rewardID: {
        type: String,
        require: true,
        index: true
    }
});

Map.set('autoIndex', true);

Map.index({memberID: 1, rewardID: 1},{index: true, unique: true});

exports = module.exports = mongoose.model('Map', Map);