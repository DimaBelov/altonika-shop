export class PaggingResult<T> {
    items: Array<T>;
    totalCount: number;
    canNext: boolean;
    canPrev: boolean;
}
