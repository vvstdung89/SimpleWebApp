var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var connection = mongoose.createConnection();

var Member   = new Schema({
    name: {
        type: String,
        require: true
    }
});

Member.set('autoIndex', true);

exports = module.exports = mongoose.model('Member', Member);