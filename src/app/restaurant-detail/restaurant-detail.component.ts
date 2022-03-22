import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Restaurant } from "app/restaurants/restaurant/restaurant.model";
import { RestaurantService } from "app/shared/services/restaurant.service";

@Component({
  selector: "mt-restaurant-detail",
  templateUrl: "./restaurant-detail.component.html",
})
export class RestaurantDetailComponent implements OnInit {
  restaurant: Restaurant;

  constructor(
    private restService: RestaurantService,
    private router: ActivatedRoute
  ) {}

  ngOnInit() {
    this.restService
      .restaurantById(this.router.snapshot.params["id"])
      .subscribe((restaurant) => (this.restaurant = restaurant));
  }
}
