import { Logger } from '@services/logger';

export class SearchHistoryService {
    private searchHistorytKey = 'searchHistory';

    constructor() {
    }

    init() {
        if (localStorage.getItem(this.searchHistorytKey) !== null) {
            return;
        }

        this.set([]);
    }

    get() {
        return JSON.parse(localStorage.getItem(this.searchHistorytKey)) as Array<string>;
    }

    getN(n: number) {
        let history = this.get();
        let nHistory: Array<string>;

        if (history.length <= n) {
            nHistory = history;
        } else {
            nHistory = history.slice(history.length - n, history.length);
        }

        return nHistory.reverse();
    }

    add(search: string) {
        if (search == null || search.length === 0) {
            return;
        }

        let history = this.get();
        history.forEach(i => {
            if (i === search) {
                history.splice(history.indexOf(i), 1);
            }
        });
        history.push(search);
        this.set(history);
    }

    private set(history: Array<string>) {
        localStorage.setItem(this.searchHistorytKey, JSON.stringify(history));
    }
}
