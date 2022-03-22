import { MenuItem } from "app/restaurant-detail/menu-item/menu-item.model";
import { CartItem } from "app/restaurant-detail/shopping-cart/cart-item.model";

export class shoppingCartService {
  
  items: CartItem[] = []

  clear() {
    this.items = [];
  }

  total(): number {
    return this.items
      .map((item) => item.value())
      .reduce((prev, value) => prev + value, 0);
  }

  addItem(item: MenuItem) {
    const foundedItem = this.items.find(
      (mitem) => mitem.menuItem.id === item.id
    );
    if (foundedItem) {
      this.increaseQty(foundedItem);
    } else {
      this.items.push(new CartItem(item));
    }
  }

  removeItem(item: CartItem) {
    this.items.splice(this.items.indexOf(item), 1);
  }

  increaseQty(item: CartItem) {
    item.quantity = item.quantity + 1;
  }

  decreaseQty(item: CartItem) {
    item.quantity = item.quantity - 1; 

    if(item.quantity === 0) {
      this.removeItem(item);
    }
  }
}
