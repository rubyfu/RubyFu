var npmi = require('../npmi');

npmi({
	name: 'kevoree-node-javascript',
	path: 'tmp/foo/bar/potato'

}, function (err) {
	if (err) throw err;
});

npmi({
	name: 'kevoree-chan-websocket',
	path: 'tmp/foo/bar/potato'

}, function (err) {
	if (err) throw err;
});