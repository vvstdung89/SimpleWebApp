var express    = require('express');        
var app        = express();                 
var bodyParser = require('body-parser');

var mongoose   = require('mongoose');
mongoose.connect("mongodb://localhost/MemberReward");

var responseTime = require('response-time');
var errorHandler = require('errorhandler');


//configure app
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());	
app.use(express.static(process.cwd() + '/app/public'));
app.set('views', './app/templates');
app.set('view engine', 'jade');


app.use(responseTime(function (req, res, time) {
	console.log(Math.ceil(time) + " ms \t " + req.url)
}));

if (process.env.NODE_ENV !== "production"){
	app.use(errorHandler({ dumpExceptions: true, showStack: true }));
} else {
	app.use(errorHandler());
}

var router = express.Router(); 

app.use("/", router);

router.post("/api/member/create", require("./logics/member.js").create)
router.post("/api/member/remove", require("./logics/member.js").remove)


router.post("/api/reward/create", require("./logics/reward.js").create)
router.post("/api/reward/remove", require("./logics/reward.js").remove)


router.post("/api/member/get_reward", require("./logics/member.js").getReward)
router.post("/api/member/link_reward", require("./logics/member.js").linkReward)


// Create http server
function createServer(port){
	app.listen(port)
	.once('error', function (err) {
		if (err.code == 'EADDRINUSE') {
			console.log("Cannot use this port:" +port + ":"+ err.code)
			process.exit(-1)
		}
	})
	.once('listening', function() {
		console.log("Start listening " + port + " ... ");
	});
}

createServer(process.env.PORT);
