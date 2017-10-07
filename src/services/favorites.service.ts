import { Product } from '@entities/product';
import { Logger } from '@services/logger';

export class FavoritesService {
    private favoritesKey = 'favorites';

    init() {
        if (localStorage.getItem(this.favoritesKey) !== null) {
            return;
        }

        this.set([]);
    }

    get() {
        return JSON.parse(localStorage.getItem(this.favoritesKey)) as Array<Product>;
    }

    add(product: Product) {
        Logger.log('FavoritesService add');
        if (this.contains(product)) {
            return;
        }

        let favorites = this.get();
        favorites.push(product);
        this.set(favorites);
        product.isFavorite = true;
    }

    delete(product: Product) {
        Logger.log('FavoritesService delete');
        if (!this.contains(product)) {
            return;
        }

        let index = -1;
        let favorites = this.get();
        favorites.forEach(p => {
            if (p.id === product.id) {
                index = favorites.indexOf(p);
            }
        });
        
        favorites.splice(index, 1);
        this.set(favorites);
        product.isFavorite = false;
    }

    private set(favorites: Array<Product>) {
        localStorage.setItem(this.favoritesKey, JSON.stringify(favorites));
    }

    contains(product: Product) {
        let result = false;
        this.get().forEach(i => {
            if (i.id === product.id) {
                result = true;
            }
        });
        return result;
    }
}
