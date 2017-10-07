import {Observable} from 'rxjs/Rx';

import { PaggingOptions } from '@entities/pagging-options';
import { PaggingResult } from '@entities/pagging-result';
import { AsyncCommand } from '@lib/async-command';

export class Paginator<T> {
    pageSizeOptions = [12, 24, 36, 48];
    paggingOptions: PaggingOptions = {
        pageNumber: 1,
        pageSize: 12,
        searchText: ''
    };
    paggingResult: PaggingResult<T>;
    pageCommand: AsyncCommand<PaggingResult<T>>;

    constructor(
        private onPaggingChanged: (paggingOptions: PaggingOptions) => Observable<PaggingResult<T>>
    ) {
        this.pageCommand = new AsyncCommand<PaggingResult<T>>(
            () => this.onPaggingChanged(this.paggingOptions),
            (r, e) => this.pageComplete(r, e)
        );
    }

    pageComplete(result: PaggingResult<T>, error: any) {
        if (error != null) {
            return;
        }

        this.paggingResult = result;
    }

    prevPage() {
        this.paggingOptions.pageNumber -= 1;
        this.pageCommand.execute();
    }

    nextPage() {
        this.paggingOptions.pageNumber += 1;
        this.pageCommand.execute();
    }

    firstPage() {
        this.paggingOptions.pageNumber = 1;
        this.pageCommand.execute();
    }

    lastPage() {
        this.paggingOptions.pageNumber =
            this.paggingResult.pageNumbers.slice(
                this.paggingResult.pageNumbers.length - 1,
                this.paggingResult.pageNumbers.length)
            [0];
        this.pageCommand.execute();
    }
}
