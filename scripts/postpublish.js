var spawn = require('child_process').spawn;
var child =
    spawn(
        '(echo mkdir -p altonika-shop/frontend ' +
        '&& echo cd altonika-shop/frontend ' +
        '&& echo rm -r ./*' +
        '&& echo put -r C:/Git/GitHub/altonika-shop/dist/.)' +
        '>remote-script && ' +
        'psftp u2944939@185.26.114.186 -b remote-script -be && ' +
        'del remote-script', {
            windowsVerbatimArguments: true,
            shell: true,
            stdio: 'inherit'
        });