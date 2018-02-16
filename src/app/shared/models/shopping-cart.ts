import { Product } from './product';
import { ShoppingCartItem } from './shopping-cart-item';

export class ShoppingCart {

    // Items in the shopping cart
    items: ShoppingCartItem[] = [];

    constructor(private itemsMap: { [productId: string]: ShoppingCartItem }) {
        this.itemsMap = itemsMap || {};

        for (let productId in itemsMap) {
            let item = itemsMap[productId];
            this.items.push(
                new ShoppingCartItem({
                    // spread operator
                    ...item,
                    key: productId
                }));
        }
    }

    /**
     * Gets the quantity of
     * an item in the shopping cart
     */
    getQuantity(product: Product) {           
        let item = this.itemsMap[product.key];
        return item ? item.quantity : 0;
    }

    /**
     * Gets the total price of
     * all the items in the cart
     */
    get totalPrice() {
        let sum = 0;
        for (let productId in this.items)
            sum += this.items[productId].totalPrice;
        return sum;
    }

    /**
     * Gets the total number of
     * items in the client's shopping cart
     */
    get totalItemsCount() {
        let count = 0;
        for (let productId in this.itemsMap)
          count += this.itemsMap[productId].quantity;
        return count;
    }
}
