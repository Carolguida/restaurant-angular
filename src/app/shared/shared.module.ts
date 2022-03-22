import { CommonModule } from "@angular/common";
import { ModuleWithProviders, NgModule } from "@angular/core";

import { InputComponent } from "./components/input/input.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RadioComponent } from "./components/radio/radio.component";
import { RatingComponent } from "./components/rating/rating.component";
import { shoppingCartService } from "./services/shopping-cart.service";
import { OrderService } from "./services/order.service";
import { RestaurantService } from "./services/restaurant.service";
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoginService } from "./services/login.service";
import { SnackbarComponent } from "./components/messages/snackbar/snackbar.component";
import { NotificationService } from "./services/notification.service";
import { LoggedInGuard } from "app/security/loggedIn.guard";
import { LeaveOrderGuard } from "app/order/leave-order.guard";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptor } from "app/security/auth.interceptor";

const baseModules = [CommonModule];

const sharedModules = [InputComponent, RadioComponent, RatingComponent, NotFoundComponent, SnackbarComponent];

const otherModules = [FormsModule, ReactiveFormsModule];

@NgModule({
  imports: [...baseModules, ...otherModules],
  exports: [...baseModules, ...otherModules, ...sharedModules],
  declarations: [...sharedModules],
  providers: [],
})

export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
        shoppingCartService, 
        OrderService, 
        RestaurantService, 
        LoginService, 
        NotificationService, 
        LoggedInGuard, 
        LeaveOrderGuard,
      ],
    };
  }
}
