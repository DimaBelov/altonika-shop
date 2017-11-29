var spawn = require('child_process').spawn;
var fileExists = require('file-exists');

var bashScript = 'bash -c "echo Delete old files && ssh 185.26.114.186 -l u2944939 \'rm -rf altonika-shop/frontend/* && exit\' && echo Push new files && scp -r /mnt/c/GitHub/altonika-shop/dist/. u2944939@185.26.114.186:/home/u2944939/altonika-shop/frontend"';
var puttyScript = 'psftp u2944939@185.26.114.186 -b putty-remote-script -be';

fileExists('C:/Windows/System32/bash.exe').then(exists => {
    if (exists) {
        console.log('Run bash script');
        runBashScript();
    } else {
        console.log('Run putty script');
        runPuttyScript();
    }
});

runBashScript = function () {
    var child =
        spawn(
            bashScript, {
                shell: true,
                stdio: 'inherit'
            });
}

runPuttyScript = function () {
    var child =
        spawn(
            puttyScript, {
                windowsVerbatimArguments: true,
                shell: true,
                stdio: 'inherit'
            });
}