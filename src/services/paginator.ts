import { PaggingOptions } from '@entities/pagging-options';
import { PaggingResult } from '@entities/pagging-result';

export class Paginator<T> {
    paggingOptions: PaggingOptions = {
        pageNumber: 1,
        pageSize: 12,
        searchText: ''
    };
    paggingResult: PaggingResult<T>;

    constructor(
        private onPaggingChanged: (paggingOptions: PaggingOptions) => PaggingResult<T>,

    ) {

    }

    prevPage() {
        this.paggingOptions.pageNumber -= 1;
        this.paggingResult = this.onPaggingChanged(this.paggingOptions);
    }

    nextPage() {
        this.paggingOptions.pageNumber += 1;
        this.paggingResult = this.onPaggingChanged(this.paggingOptions);
    }

    firstPage() {
        this.paggingOptions.pageNumber = 1;
        this.paggingResult = this.onPaggingChanged(this.paggingOptions);
    }

    lastPage() {
        this.paggingOptions.pageNumber =
            this.paggingResult.pageNumbers.slice(
                this.paggingResult.pageNumbers.length - 1,
                this.paggingResult.pageNumbers.length)
            [0];
        this.paggingResult = this.onPaggingChanged(this.paggingOptions);
    }
}
