import { Component, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { CartItem } from "app/restaurant-detail/shopping-cart/cart-item.model";
import { OrderService } from "app/shared/services/order.service";
import { RadioOption } from "app/shared/components/radio/radio-option.model";
import { Order, OrderItem } from "./order.model";
import { tap } from "rxjs/operators";

@Component({
  selector: "mt-order",
  templateUrl: "./order.component.html",
})
export class OrderComponent implements OnInit {
  delivery: number = 8;
  orderForm: FormGroup;
  errorMessageAddress = "Campo obrigatório e com 5 caracteres, no mínimo";
  errorMessageNumber = "Campo obrigatório e somente números";
  errorMessage = "Campo obrigatório.";
  emailPattern =
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  numberPattern = /^[0-9]*$/;
  orderId: string;
  order: Order;

  paymentOptions: RadioOption[] = [
    { label: "Dinheiro", value: "MON" },
    { label: "Cartão de débito", value: "DEB" },
    { label: "Cartão refeição", value: "REF" },
  ];

  constructor(
    private orderService: OrderService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm(): void {
    this.orderForm = this.fb.group(
      {
        name: ["", [Validators.required, Validators.minLength(5)]],
        email: [
          "",
          [Validators.required, Validators.pattern(this.emailPattern)],
        ],
        emailConfirmation: [
          "",
          [Validators.required, Validators.pattern(this.emailPattern)],
        ],
        address: ["", [Validators.required, Validators.minLength(5)]],
        number: [
          "",
          [Validators.required, Validators.pattern(this.numberPattern)],
        ],
        optionalAddress: [""],
        paymentOption: ["", Validators.required],
      },
      { validators: [OrderComponent.equalsTo], updateOn: "blur" }
    );
  }

  // método para validação dos emails: retorna um objeto que vai ter uma chave do tipo string e irá retornar um booleano
  // O static define que este método é estático, portanto ele se comporta como uma função no escopo da classe
  static equalsTo(group: AbstractControl): { [key: string]: boolean } {
    const email = group.get("email");
    const emailConfirmation = group.get("emailConfirmation");

    if (!email || !emailConfirmation) {
      return null;
    }

    if (email.value !== emailConfirmation.value) {
      return { emailsNotMatch: true };
    }

    return null;
  }

  getCartItems(): CartItem[] {
    return this.orderService.cartItems();
  }

  increaseQty(item: CartItem) {
    return this.orderService.increaseQty(item);
  }

  decreaseQty(item: CartItem) {
    return this.orderService.decreaseQty(item);
  }

  removeItem(item: CartItem) {
    return this.orderService.removeItem(item);
  }

  //total no carrinho de confirmação de valores
  totalItemsValue(): number {
    return this.orderService.totalItemsValue();
  }

  isOrderCompleted(): boolean {
    return this.orderId !== undefined;
  }

  // subscribe -> momento da inscrição do observable, momento onde faz a requisição
  checkOrder(order: Order) {
    order.orderItem = this.getCartItems().map(
      (item: CartItem) => new OrderItem(item.quantity, item.menuItem.id)
    );
    this.orderService
      .checkOrder(order)
      .pipe(
        tap((order: Order) => {
          this.orderId = order.id;
        })
      )
      .subscribe((order: Order) => {
        this.order = order;
        this.router.navigate(["/order-summary"]);
        this.orderService.clear();
      });
  }
}
