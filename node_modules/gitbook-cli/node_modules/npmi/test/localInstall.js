var npmi = require('../npmi');
var path = require('path');

var pathToModule = path.resolve(__dirname, 'submodule');

npmi({
	name: pathToModule,
	path: path.resolve(pathToModule, '.deploy_units'),
	localInstall: true,
    npmLoad: { loglevel: 'verbose' }
}, function (err) {
	if (err) {
        console.log('Test failed');
        throw err;
    }
});