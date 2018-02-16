import { Product } from './product';

export class ShoppingCartItem {
    key: string;
    title: string;
    imageUrl: string;
    price: number;
    quantity: number;    

    // Partial means init looks like a ShoppingCartItem object
    constructor(init?: Partial<ShoppingCartItem>) {
        // assign init's properties to this object's properties
        Object.assign(this, init);
    }

    get totalPrice() {
        return this.price * this.quantity;
    }
}
