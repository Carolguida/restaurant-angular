import { Component, OnInit } from '@angular/core';
import { shoppingCartService } from 'app/shared/services/shopping-cart.service';

@Component({
  selector: 'mt-shopping-cart',
  templateUrl: './shopping-cart.component.html'
})
export class ShoppingCartComponent implements OnInit {

  constructor(private shoppingService: shoppingCartService) { }

  ngOnInit() {
  }

  items(): any[] {
    return this.shoppingService.items;
  }

  total(): number {
    return this.shoppingService.total();
  }

  clear() {
    this.shoppingService.clear();
  }

  removeItem(item: any) {
    this.shoppingService.removeItem(item);
  }

  addItem(item: any) {
    this.shoppingService.addItem(item);
  }

}
