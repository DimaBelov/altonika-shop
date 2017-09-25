import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import * as StackTrace from 'stacktrace-js';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

    constructor(private _injector: Injector, private _http: HttpClient) { }

    handleError(error) {
        const location = this._injector.get(LocationStrategy);
        const message = error.message ? error.message : error.toString();
        const url = location instanceof PathLocationStrategy ? location.path() : '';
        StackTrace.fromError(error).then(stackframes => {
          let stackTrace = stackframes
            .splice(0, 20)
            .map(function(sf) {
              return sf.toString();
            }).join('\n');

            let log = { message, url, stackTrace: stackTrace };

            console.log('GlobalErrorHandler:');
            console.log(log);

            this._http.post(environment.apiUrl + 'log', log)
            .subscribe(
                r => {
                    console.log('GlobalErrorHandler send log to server successful');
                },
                err => {
                    console.log('GlobalErrorHandler send log to server error:');
                    console.log(err);
                }
            );
        });
        throw error;
      }
}
