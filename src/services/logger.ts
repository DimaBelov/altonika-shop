export class Logger {

    static log(...logs: any[]) {
        logs.forEach(function (log) {
            console.log(log);
        });
    }


    static error(error: any) {
        let errorText = '';
        let stackTrace = {};

        if (error.error != null && error.error.exception != null) {
            errorText =
                Logger.getUrlInfo(error) + '\n' +
                'message: ' + error.error.exception.message + '\n';
            stackTrace = { stackTrace: error.error.exception.stackTrace };
        } else {
            errorText =
                Logger.getUrlInfo(error) + '\n' +
                error.name + ': ' + error.message;
        }

        Logger.log(errorText, stackTrace, error);
    }

    private static getUrlInfo(error: any) {
        return 'url: ' + error.url + ' ' + error.status + ' ' + error.statusText;
    }
}
