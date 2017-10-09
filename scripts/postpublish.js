var spawn = require('child_process').spawn;
var child =
    spawn(
        'psftp u2944939@185.26.114.186 -b remote-script -be', {
            windowsVerbatimArguments: true,
            shell: true,
            stdio: 'inherit'
        });