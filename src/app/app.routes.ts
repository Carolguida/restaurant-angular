import { Routes } from "@angular/router";
import { AboutComponent } from "./about/about.component";
import { HomeComponent } from "./home/home.component";
import { OrderSummaryComponent } from "./order-summary/order-summary.component";
import { OrderComponent } from "./order/order.component";
import { MenuComponent } from "./restaurant-detail/menu/menu.component";
import { RestaurantDetailComponent } from "./restaurant-detail/restaurant-detail.component";
import { ReviewsComponent } from "./restaurant-detail/reviews/reviews.component";
import { RestaurantsComponent } from "./restaurants/restaurants.component";
import { LoggedInGuard } from "./security/loggedIn.guard";
import { LoginComponent } from "./security/login/login.component";
import { NotFoundComponent } from "./shared/components/not-found/not-found.component";

export const ROUTES: Routes = [
  { path: "", component: HomeComponent },
  // recebe a pag que quer ir apos ser autenticado
  { path: "login/:to", component: LoginComponent },
  { path: "login", component: LoginComponent },
  { path: "about", loadChildren: './about/about.module#AboutModule' },  
  { path: "order", loadChildren: './order/order.module#OrderModule', canLoad: [LoggedInGuard], canActivate: [LoggedInGuard] },
  { path: "order-summary", component: OrderSummaryComponent },  
  { path: "restaurants", component: RestaurantsComponent },
  {
    path: "restaurants/:id",
    component: RestaurantDetailComponent,
    children: [
      { path: "", redirectTo: 'menu', pathMatch: 'full' },
      { path: "menu", component: MenuComponent },
      { path: "reviews", component: ReviewsComponent },
    ],
  },
  { path: "**", component: NotFoundComponent },
  
];
