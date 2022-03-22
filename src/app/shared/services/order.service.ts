import { Injectable } from "@angular/core";
import { Order } from "app/order/order.model";
import { CartItem } from "app/restaurant-detail/shopping-cart/cart-item.model";
import { shoppingCartService } from "app/shared/services/shopping-cart.service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { MEAT_API } from "app/app.api";

@Injectable()
export class OrderService {
  constructor(
    private cartService: shoppingCartService,
    private http: HttpClient
  ) {}

  // expor os itens do carrinho => ja contém no shoppingCartService
  cartItems(): CartItem[] {
    return this.cartService.items;
  }

  increaseQty(item: CartItem) {
    this.cartService.increaseQty(item);
  }

  decreaseQty(item: CartItem) {
    this.cartService.decreaseQty(item);
  }

  removeItem(item: CartItem) {
    this.cartService.removeItem(item);
  }

  totalItemsValue(): number {
    return this.cartService.total();
  }

  // chamada HTTP POST-> precisamos usar observable -> inscrição e resposta do meu componente e retorno do meu observable
  checkOrder(order: Order): Observable<Order> { 
    return this.http
      .post<Order>(`${MEAT_API}/orders`, order)
      .pipe(
        map((order) => order)
      )     
  }

  // limpeza dos itens
  clear() {
    this.cartService.clear();
  }
}
