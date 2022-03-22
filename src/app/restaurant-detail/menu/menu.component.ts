import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RestaurantService } from "app/shared/services/restaurant.service";
import { Observable } from "rxjs";
import { MenuItem } from "../menu-item/menu-item.model";

@Component({
  selector: "mt-menu",
  templateUrl: "./menu.component.html",
})
export class MenuComponent implements OnInit {
  menu: Observable<MenuItem[]>;

  constructor(
    private service: RestaurantService,
    private router: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getMenu();
  }

  getMenu() {
    this.menu = this.service.restaurantMenu(
      this.router.parent.snapshot.params["id"]
    );
  }
  
}
