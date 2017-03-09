var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var connection = mongoose.createConnection();

var Reward   = new Schema({
    name: {
        type: String,
        require: true
    },
    description: {
        type: String
    }
});

Reward.set('autoIndex', true);

exports = module.exports = mongoose.model('Reward', Reward);