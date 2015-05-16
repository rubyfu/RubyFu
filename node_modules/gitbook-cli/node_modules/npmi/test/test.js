var npmi = require('./../npmi');

var options = {
	name: 'kevoree-group-websocket'
};
npmi(options, function (err) {
	if (err) throw err;

	// installed
	console.log(options.name+' installed successfully');
});