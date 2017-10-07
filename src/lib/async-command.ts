import { Observable } from 'rxjs/Observable';

import { WaitSpinner } from '@services/wait-spinner';
import { Logger } from '@services/logger';

export class AsyncCommand<T> {
    isBusy: boolean;

    constructor(
        private _execute: () => Observable<T>,
        private _complete: (result: T, error: any) => void,
        private needSpinner?: boolean,
        private _context?: any) {
            if (this.needSpinner == null) {
                this.needSpinner = true;
            }
         }

    execute() {
        if (this.isBusy) {
            return;
        }

        this.setBusy();
        (this._execute.call(this._context) as Observable<T>)
            .subscribe(
                data => this.handle(data),
                error => this.handle(null, error)
            );
    }

    private setBusy() {
        this.isBusy = true;
        if (this.needSpinner) {
            WaitSpinner.show();
        }
    }

    private unsetBusy() {
        this.isBusy = false;
        if (this.needSpinner) {
            WaitSpinner.hide();
        }
    }

    private handle(data: T, error?: any) {
        this.unsetBusy();
        this._complete.call(this._context, data, error);
        if (error != null) {
            Logger.error(error);
        }
    }
}
