import { Observable } from 'rxjs/Observable';

export class AsyncCommand<T> {
    isBusy: boolean;

    constructor(
        private _execute: () => Observable<T>,
        private _complete: (result: T, error: any) => void,
        private _context?: any) { }

    execute() {
        if (this.isBusy) {
            return;
        }

        this.isBusy = true;
        (this._execute.call(this._context) as Observable<T>)
            .subscribe(
                data => {
                    this.isBusy = false;
                    this._complete.call(this._context, data);
                },
                error => {
                    this.isBusy = false;
                    this._complete.call(this._context, null, error);
                }
            );
    }
}
