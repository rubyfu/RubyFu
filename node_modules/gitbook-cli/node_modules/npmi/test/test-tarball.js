var npmi = require('./../npmi');


var options = {
    name: 'https://github.com/maxleiko/test-kev-lib-github/tarball/v0.2.0',
    pkgName: 'kevoree-comp-mytopcomp',
    version: '0.2.0'
};
npmi(options, function (err) {
    if (err) {
        console.log(err);
        throw err;
    }

    // installed
    console.log(options.name+' ('+options.pkgName+'@'+options.version+') installed successfully');
});