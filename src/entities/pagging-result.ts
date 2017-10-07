export class PaggingResult<T> {
    items: Array<T>;
    current: number;
    total: number;
    canNext: boolean;
    canPrev: boolean;
    pageNumbers: Int32Array;
}
