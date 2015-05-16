var npmi = require('../npmi');

npmi({path: 'submodule'}, function (err) {
    if (err) throw err;

    console.log('Test: ok');
});