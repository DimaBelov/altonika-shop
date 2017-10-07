import { Observable } from 'rxjs/Rx';

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
        private onPaggingChanged: (paggingOptions: PaggingOptions) => Observable<PaggingResult<T>>,
        private onPaggingComplete: (result: PaggingResult<T>, error: any) => void,
    ) {
        this.pageCommand = new AsyncCommand<PaggingResult<T>>(
            () => this.onPaggingChanged(this.paggingOptions),
            (r, e) => this.pageComplete(r, e)
        );
    }

    page() {
        this.pageCommand.execute();
    }

    pageComplete(result: PaggingResult<T>, error: any) {
        this.paggingResult = result;
        this.onPaggingComplete.call(null, result, error);
    }

    prevPage() {
        this.paggingOptions.pageNumber -= 1;
        this.page();
    }

    nextPage() {
        this.paggingOptions.pageNumber += 1;
        this.page();
    }

    firstPage() {
        this.paggingOptions.pageNumber = 1;
        this.page();
    }

    lastPage() {
        this.paggingOptions.pageNumber =
            this.paggingResult.pageNumbers.slice(
                this.paggingResult.pageNumbers.length - 1,
                this.paggingResult.pageNumbers.length)
            [0];
        this.page();
    }

    pageSizeChange() {
        this.paggingOptions.pageNumber = 1;
        this.page();
    }

    selectPage(n: number) {
        this.paggingOptions.pageNumber = n;
        this.page();
    }
}
